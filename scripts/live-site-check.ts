import fs from "fs";
import path from "path";
import { getAllPosts } from "../lib/blog";

const defaultBase = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-jiedan-lab.vercel.app";
const fetchBase = normalizeBase(readArg("url") || readArg("fetchBase") || defaultBase);
const canonicalBase = normalizeBase(readArg("canonical") || readArg("base") || defaultBase);
const jsonOutput = readArg("json") || readArg("jsonOutput");
const markdownOutput = readArg("markdown") || readArg("markdownOutput");
const articleConcurrency = Math.max(1, Number(readArg("article-concurrency") || 12));
const fetchRetries = Math.max(1, Number(readArg("fetch-retries") || 3));
const fetchTimeoutMs = Math.max(1000, Number(readArg("fetch-timeout-ms") || 15000));

const checks = [
  ["/", "AI 工具指南"],
  ["/blog", "新手教程"],
  ["/tools", "AI 工具导航"],
  ["/tools/proposal-generator", "Upwork Proposal 生成器"],
  ["/tools/error-explainer", "Codex 报错解释器"],
  ["/tools/pricing-calculator", "项目报价助手"],
  ["/templates", "模板下载"],
  ["/roadmap", "AI 工具学习 30 天路线图"],
  ["/sitemap.xml", "<sitemapindex"],
  ["/sitemap-blog.xml", "<urlset"],
  ["/sitemap-q.xml", "<urlset"],
  ["/sitemap-cluster.xml", "<urlset"],
  ["/robots.txt", "Sitemap"],
  ["/llms.txt", "Draft and noindex articles are intentionally excluded"],
] as const;

async function main() {
  const pageResults = [];
  const publicPosts = getAllPosts(false);
  const excludedPosts = getAllPosts(true).filter((post) => !(post.status === "published" && post.noindex === false));
  const llmsPostLimit = 30;
  const llmsExpectedPosts = publicPosts.slice(0, llmsPostLimit);

  for (const [path, expected] of checks) {
    const url = `${fetchBase}${path}`;
    const response = await fetchWithRetry(url);
    const text = response.text;
    pageResults.push({
      path,
      status: response.status,
      ok: response.ok && text.includes(expected),
      expected,
    });
  }

  const sitemap = await fetchText("/sitemap.xml");
  const sitemapBlog = await fetchText("/sitemap-blog.xml");
  const sitemapQ = await fetchText("/sitemap-q.xml");
  const sitemapCluster = await fetchText("/sitemap-cluster.xml");
  const robots = await fetchText("/robots.txt");
  const llms = await fetchText("/llms.txt");
  const home = await fetchText("/");
  const missingPublishedPosts = publicPosts.filter((post) => !sitemapBlog.includes(`${canonicalBase}/blog/${post.slug}`));

  const articleResults = await mapWithConcurrency(publicPosts, articleConcurrency, async (post) => {
    const path = `/blog/${post.slug}`;
    const url = `${fetchBase}${path}`;
    const response = await fetchWithRetry(url);
    const text = response.text;
    return {
      path,
      status: response.status,
      ok: response.ok && text.includes(post.title) && text.includes(`${canonicalBase}${path}`),
      title: post.title,
    };
  });

  const combinedSitemaps = [sitemap, sitemapBlog, sitemapQ, sitemapCluster].join("\n");
  const leakedExcludedPosts = excludedPosts.filter((post) => combinedSitemaps.includes(`${canonicalBase}/blog/${post.slug}`));
  const draftLeak = leakedExcludedPosts.length > 0;
  const llmsDraftLeak = getAllPosts(true)
    .filter((post) => !(post.status === "published" && post.noindex === false))
    .some((post) => llms.includes(`](${canonicalBase}/blog/${post.slug})`));
  const failedChecks = [
    ...pageResults.filter((item) => !item.ok).map((item) => `page:${item.path}`),
    ...articleResults.filter((item) => !item.ok).map((item) => `article:${item.path}`),
    ...missingPublishedPosts.map((post) => `missing-from-sitemap:${post.slug}`),
  ];
  if (draftLeak) failedChecks.push("sitemap-leaks-drafts");
  if (!combinedSitemaps.includes(canonicalBase)) failedChecks.push("sitemap-base-mismatch");
  if (!robots.includes(`${canonicalBase}/sitemap.xml`)) failedChecks.push("robots-sitemap-mismatch");
  if (!robots.includes(`${canonicalBase}/sitemap-q.xml`)) failedChecks.push("robots-sitemap-q-mismatch");
  if (!sitemap.includes(`${canonicalBase}/sitemap-blog.xml`)) failedChecks.push("sitemap-index-missing-blog");
  if (!sitemap.includes(`${canonicalBase}/sitemap-q.xml`)) failedChecks.push("sitemap-index-missing-q");
  if (!sitemap.includes(`${canonicalBase}/sitemap-cluster.xml`)) failedChecks.push("sitemap-index-missing-cluster");
  if (!llms.includes(`${canonicalBase}/`)) failedChecks.push("llms-base-mismatch");
  if (!llmsExpectedPosts.every((post) => llms.includes(`](${canonicalBase}/blog/${post.slug})`))) failedChecks.push("llms-missing-recent-published-posts");
  if (llmsDraftLeak) failedChecks.push("llms-leaks-drafts");
  if (!articleResults.every((item) => item.ok)) failedChecks.push("article-canonical-mismatch");

  const result = {
    generatedAt: new Date().toISOString(),
    ok: failedChecks.length === 0,
    base: canonicalBase,
    fetchBase,
    failedChecks,
    pages: pageResults,
    articles: {
      publicCount: publicPosts.length,
      checked: articleResults.length,
      failed: articleResults.filter((item) => !item.ok),
      missingFromSitemap: missingPublishedPosts.map((post) => post.slug),
    },
    sitemap: {
      blogUrlCount: [...sitemapBlog.matchAll(/<url>/g)].length,
      clusterUrlCount: [...sitemapCluster.matchAll(/<url>/g)].length,
      leaksDrafts: draftLeak,
      qUrlCount: [...sitemapQ.matchAll(/<url>/g)].length,
      sitemapIndexCount: [...sitemap.matchAll(/<sitemap>/g)].length,
      usesBase: combinedSitemaps.includes(canonicalBase),
    },
    robots: {
      allowsAll: robots.includes("Allow: /"),
      pointsToSitemap: robots.includes(`${canonicalBase}/sitemap.xml`),
    },
    llms: {
      usesBase: llms.includes(`${canonicalBase}/`),
      includesPublished: llmsExpectedPosts.every((post) => llms.includes(`](${canonicalBase}/blog/${post.slug})`)),
      recentPostLimit: llmsPostLimit,
      leaksDrafts: llmsDraftLeak,
    },
    canonical: {
      home: home.includes('rel="canonical"') && home.includes(canonicalBase),
      article: articleResults.every((item) => item.ok),
    },
  };

  writeReport(jsonOutput, `${JSON.stringify(result, null, 2)}\n`);
  writeReport(markdownOutput, toMarkdown(result));
  console.log(JSON.stringify(result, null, 2));

  if (!result.ok) {
    process.exitCode = 1;
  }
}

async function fetchText(path: string) {
  const response = await fetchWithRetry(`${fetchBase}${path}`);
  return response.text;
}

function normalizeBase(value: string) {
  return value.replace(/\/+$/, "");
}

function readArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match?.slice(prefix.length);
}

function writeReport(target: string | undefined, content: string) {
  if (!target) return;
  const absoluteTarget = path.isAbsolute(target) ? target : path.join(process.cwd(), target);
  fs.mkdirSync(path.dirname(absoluteTarget), { recursive: true });
  fs.writeFileSync(absoluteTarget, content, "utf8");
}

async function fetchWithRetry(url: string) {
  let lastError = "";

  for (let attempt = 1; attempt <= fetchRetries; attempt += 1) {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    try {
      const controller = new AbortController();
      timeout = setTimeout(() => controller.abort(), fetchTimeoutMs);
      const response = await fetch(url, { signal: controller.signal });
      return { ok: response.ok, status: response.status, text: await response.text() };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      if (attempt < fetchRetries) await delay(750 * attempt);
    } finally {
      if (timeout) clearTimeout(timeout);
    }
  }

  throw new Error(`Failed to fetch ${url} after ${fetchRetries} attempts: ${lastError}`);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function mapWithConcurrency<T, R>(items: T[], concurrency: number, mapper: (item: T) => Promise<R>) {
  const results = new Array<R>(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current]);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

function toMarkdown(result: {
  articles: { checked: number; failed: Array<{ path: string; status: number; title: string }>; missingFromSitemap: string[]; publicCount: number };
  base: string;
  canonical: { article: boolean; home: boolean };
  failedChecks: string[];
  fetchBase: string;
  generatedAt: string;
  llms: { includesPublished: boolean; leaksDrafts: boolean; recentPostLimit: number; usesBase: boolean };
  ok: boolean;
  pages: Array<{ expected: string; ok: boolean; path: string; status: number }>;
  robots: { allowsAll: boolean; pointsToSitemap: boolean };
  sitemap: {
    blogUrlCount: number;
    clusterUrlCount: number;
    leaksDrafts: boolean;
    qUrlCount: number;
    sitemapIndexCount: number;
    usesBase: boolean;
  };
}) {
  const lines = [
    "# Live Search Surface Check",
    "",
    `Generated at: ${result.generatedAt}`,
    "",
    "This report checks the live production search surfaces. It does not use Search Console traffic, impressions, or ranking data.",
    "",
    `Overall: ${result.ok ? "PASS" : "FAIL"}`,
    "",
    "## Scope",
    "",
    `- Canonical base: ${result.base}`,
    `- Fetch base: ${result.fetchBase}`,
    `- Public articles: ${result.articles.publicCount}`,
    `- Articles checked: ${result.articles.checked}`,
    "",
    "## Search Surfaces",
    "",
    `- Sitemap index count: ${result.sitemap.sitemapIndexCount}`,
    `- Blog sitemap URL count: ${result.sitemap.blogUrlCount}`,
    `- Q sitemap URL count: ${result.sitemap.qUrlCount}`,
    `- Cluster sitemap URL count: ${result.sitemap.clusterUrlCount}`,
    `- Sitemap uses canonical base: ${result.sitemap.usesBase}`,
    `- Sitemap leaks drafts: ${result.sitemap.leaksDrafts}`,
    `- Robots allows crawling: ${result.robots.allowsAll}`,
    `- Robots points to sitemap: ${result.robots.pointsToSitemap}`,
    `- llms.txt uses canonical base: ${result.llms.usesBase}`,
    `- llms.txt includes recent published posts: ${result.llms.includesPublished}`,
    `- llms.txt recent post limit: ${result.llms.recentPostLimit}`,
    `- llms.txt leaks drafts: ${result.llms.leaksDrafts}`,
    `- Home canonical present: ${result.canonical.home}`,
    `- Article canonicals present: ${result.canonical.article}`,
    "",
    "## Failed Checks",
    "",
    ...(result.failedChecks.length ? result.failedChecks.map((item) => `- ${item}`) : ["- none"]),
    "",
    "## Page Checks",
    "",
    "| Path | Status | Result | Expected text |",
    "| --- | --- | --- | --- |",
    ...result.pages.map((item) => `| ${item.path} | ${item.status} | ${item.ok ? "PASS" : "FAIL"} | ${item.expected} |`),
    "",
    "## Article Failures",
    "",
    "| Path | Status | Title |",
    "| --- | --- | --- |",
    ...result.articles.failed.map((item) => `| ${item.path} | ${item.status} | ${item.title} |`),
    "",
    "## Missing From Sitemap",
    "",
    ...(result.articles.missingFromSitemap.length ? result.articles.missingFromSitemap.map((slug) => `- ${slug}`) : ["- none"]),
    "",
  ];

  return lines.join("\n");
}

void main();

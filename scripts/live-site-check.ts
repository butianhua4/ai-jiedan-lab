import fs from "fs";
import path from "path";
import { getAllPosts } from "../lib/blog";

const defaultBase = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-jiedan-lab.vercel.app";
const fetchBase = normalizeBase(readArg("url") || readArg("fetchBase") || defaultBase);
const canonicalBase = normalizeBase(readArg("canonical") || readArg("base") || defaultBase);
const jsonOutput = readArg("json") || readArg("jsonOutput");
const markdownOutput = readArg("markdown") || readArg("markdownOutput");

const checks = [
  ["/", "AI 工具指南"],
  ["/blog", "新手教程"],
  ["/tools", "AI 工具导航"],
  ["/tools/proposal-generator", "Upwork Proposal 生成器"],
  ["/tools/error-explainer", "Codex 报错解释器"],
  ["/tools/pricing-calculator", "项目报价助手"],
  ["/templates", "模板下载"],
  ["/roadmap", "AI 工具学习 30 天路线图"],
  ["/sitemap.xml", "<urlset"],
  ["/robots.txt", "Sitemap"],
  ["/llms.txt", "Draft and noindex articles are intentionally excluded"],
] as const;

async function main() {
  const pageResults = [];
  const publicPosts = getAllPosts(false);

  for (const [path, expected] of checks) {
    const url = `${fetchBase}${path}`;
    const response = await fetch(url);
    const text = await response.text();
    pageResults.push({
      path,
      status: response.status,
      ok: response.ok && text.includes(expected),
      expected,
    });
  }

  const sitemap = await fetchText("/sitemap.xml");
  const robots = await fetchText("/robots.txt");
  const llms = await fetchText("/llms.txt");
  const home = await fetchText("/");
  const articleResults = [];
  const missingPublishedPosts = publicPosts.filter((post) => !sitemap.includes(`${canonicalBase}/blog/${post.slug}`));

  for (const post of publicPosts) {
    const path = `/blog/${post.slug}`;
    const url = `${fetchBase}${path}`;
    const response = await fetch(url);
    const text = await response.text();
    articleResults.push({
      path,
      status: response.status,
      ok: response.ok && text.includes(post.title) && text.includes(`${canonicalBase}${path}`),
      title: post.title,
    });
  }

  const draftLeak = sitemap.includes("codex-codex-4-31") || sitemap.includes("codex-codex-github-4-36");
  const llmsDraftLeak = getAllPosts(true)
    .filter((post) => !(post.status === "published" && post.noindex === false))
    .some((post) => llms.includes(`](${canonicalBase}/blog/${post.slug})`));
  const failedChecks = [
    ...pageResults.filter((item) => !item.ok).map((item) => `page:${item.path}`),
    ...articleResults.filter((item) => !item.ok).map((item) => `article:${item.path}`),
    ...missingPublishedPosts.map((post) => `missing-from-sitemap:${post.slug}`),
  ];
  if (draftLeak) failedChecks.push("sitemap-leaks-drafts");
  if (!sitemap.includes(canonicalBase)) failedChecks.push("sitemap-base-mismatch");
  if (!robots.includes(`${canonicalBase}/sitemap.xml`)) failedChecks.push("robots-sitemap-mismatch");
  if (!llms.includes(`${canonicalBase}/`)) failedChecks.push("llms-base-mismatch");
  if (!publicPosts.every((post) => llms.includes(`](${canonicalBase}/blog/${post.slug})`))) failedChecks.push("llms-missing-published-posts");
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
      urlCount: [...sitemap.matchAll(/<loc>/g)].length,
      usesBase: sitemap.includes(canonicalBase),
      leaksDrafts: draftLeak,
    },
    robots: {
      allowsAll: robots.includes("Allow: /"),
      pointsToSitemap: robots.includes(`${canonicalBase}/sitemap.xml`),
    },
    llms: {
      usesBase: llms.includes(`${canonicalBase}/`),
      includesPublished: publicPosts.every((post) => llms.includes(`](${canonicalBase}/blog/${post.slug})`)),
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
  const response = await fetch(`${fetchBase}${path}`);
  return response.text();
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

function toMarkdown(result: {
  articles: { checked: number; failed: Array<{ path: string; status: number; title: string }>; missingFromSitemap: string[]; publicCount: number };
  base: string;
  canonical: { article: boolean; home: boolean };
  failedChecks: string[];
  fetchBase: string;
  generatedAt: string;
  llms: { includesPublished: boolean; leaksDrafts: boolean; usesBase: boolean };
  ok: boolean;
  pages: Array<{ expected: string; ok: boolean; path: string; status: number }>;
  robots: { allowsAll: boolean; pointsToSitemap: boolean };
  sitemap: { leaksDrafts: boolean; urlCount: number; usesBase: boolean };
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
    `- Sitemap URL count: ${result.sitemap.urlCount}`,
    `- Sitemap uses canonical base: ${result.sitemap.usesBase}`,
    `- Sitemap leaks drafts: ${result.sitemap.leaksDrafts}`,
    `- Robots allows crawling: ${result.robots.allowsAll}`,
    `- Robots points to sitemap: ${result.robots.pointsToSitemap}`,
    `- llms.txt uses canonical base: ${result.llms.usesBase}`,
    `- llms.txt includes published posts: ${result.llms.includesPublished}`,
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

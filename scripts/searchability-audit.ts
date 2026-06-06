import { getAllPosts, getCategorySlugs, getTagSlugs } from "../lib/blog";
import { site } from "../data/site";
import { tools } from "../data/tools";
import { GET as getLlmsTxt } from "../app/llms.txt/route";

type Check = {
  name: string;
  ok: boolean;
  detail?: string;
};

const fetchBase = normalizeBase(readArg("url") || readArg("fetchBase") || site.url);
const canonicalBase = normalizeBase(readArg("canonical") || readArg("base") || site.url);

async function main() {
  const checks: Check[] = [];
  const publicPosts = getAllPosts(false);
  const allPosts = getAllPosts(true);
  const categorySlugs = getCategorySlugs();
  const tagSlugs = getTagSlugs();
  const llmsText = await renderLlmsTxt();
  const draftSlugs = allPosts
    .filter((post) => !(post.status === "published" && post.noindex === false))
    .map((post) => post.slug);

  checks.push({
    name: "published posts are available",
    ok: publicPosts.length > 0,
    detail: `${publicPosts.length} published posts`,
  });
  checks.push({
    name: "article slugs are english/ascii",
    ok: publicPosts.every((post) => isAsciiSlug(post.slug)),
    detail: failedValues(publicPosts.map((post) => post.slug).filter((slug) => !isAsciiSlug(slug))),
  });
  checks.push({
    name: "category slugs are english/ascii",
    ok: categorySlugs.every(isAsciiSlug),
    detail: failedValues(categorySlugs.filter((slug) => !isAsciiSlug(slug))),
  });
  checks.push({
    name: "tag slugs are english/ascii",
    ok: tagSlugs.every(isAsciiSlug),
    detail: failedValues(tagSlugs.filter((slug) => !isAsciiSlug(slug))),
  });
  checks.push({
    name: "published posts are indexable",
    ok: publicPosts.every((post) => post.status === "published" && post.noindex === false),
  });
  checks.push({
    name: "published posts have canonical URL",
    ok: publicPosts.every((post) => post.canonical === `${canonicalBase}/blog/${post.slug}`),
    detail: failedValues(publicPosts.filter((post) => post.canonical !== `${canonicalBase}/blog/${post.slug}`).map((post) => post.slug)),
  });
  checks.push({
    name: "published posts have metadata basics",
    ok: publicPosts.every((post) => post.title && post.description && post.tags.length >= 3 && post.updatedAt),
  });
  checks.push({
    name: "published posts have enough content",
    ok: publicPosts.every((post) => chineseLength(post.content) >= 1000),
    detail: failedValues(publicPosts.filter((post) => chineseLength(post.content) < 1000).map((post) => post.slug)),
  });
  checks.push({
    name: "tool detail pages exist in data",
    ok: tools.length >= 20,
    detail: `${tools.length} tools`,
  });
  checks.push({
    name: "llms.txt route renders",
    ok: llmsText.includes("AI 接单实验室") && llmsText.includes("Draft and noindex articles are intentionally excluded"),
  });
  checks.push({
    name: "llms.txt route uses canonical base",
    ok: llmsText.includes(`${canonicalBase}/`),
  });
  checks.push({
    name: "llms.txt route excludes draft slugs",
    ok: draftSlugs.every((slug) => !hasMarkdownUrl(llmsText, `${canonicalBase}/blog/${slug}`)),
    detail: failedValues(draftSlugs.filter((slug) => hasMarkdownUrl(llmsText, `${canonicalBase}/blog/${slug}`)).slice(0, 10)),
  });
  checks.push({
    name: "llms.txt route includes public article links",
    ok: publicPosts.slice(0, 5).every((post) => hasMarkdownUrl(llmsText, `${canonicalBase}/blog/${post.slug}`)),
    detail: failedValues(publicPosts.slice(0, 5).filter((post) => !hasMarkdownUrl(llmsText, `${canonicalBase}/blog/${post.slug}`)).map((post) => post.slug)),
  });

  if (readArg("url") || readArg("fetchBase") || readArg("base")) {
    await addLiveChecks(checks, publicPosts.map((post) => post.slug));
  }

  const failed = checks.filter((check) => !check.ok);
  const score = Math.max(0, Math.round(((checks.length - failed.length) / checks.length) * 100));
  const result = {
    base: canonicalBase,
    fetchBase,
    score,
    summary: {
      checks: checks.length,
      passed: checks.length - failed.length,
      failed: failed.length,
      publishedPosts: publicPosts.length,
      categorySlugs: categorySlugs.length,
      tagSlugs: tagSlugs.length,
    },
    failedItems: failed,
    checks,
    nextActions: buildNextActions(failed),
  };

  console.log(JSON.stringify(result, null, 2));
  if (failed.length) process.exitCode = 1;
}

async function addLiveChecks(checks: Check[], publicSlugs: string[]) {
  const allPosts = getAllPosts(true);
  const draftSlugs = allPosts
    .filter((post) => !(post.status === "published" && post.noindex === false))
    .map((post) => post.slug);
  const [home, blog, robots, sitemap, llms] = await Promise.all([
    fetchPage("/"),
    fetchPage("/blog"),
    fetchPage("/robots.txt"),
    fetchPage("/sitemap.xml"),
    fetchPage("/llms.txt"),
  ]);

  checks.push({ name: "homepage returns 200", ok: home.status === 200, detail: `${home.status}` });
  checks.push({ name: "blog index returns 200", ok: blog.status === 200, detail: `${blog.status}` });
  checks.push({ name: "robots.txt returns 200", ok: robots.status === 200, detail: `${robots.status}` });
  checks.push({ name: "sitemap.xml returns 200", ok: sitemap.status === 200, detail: `${sitemap.status}` });
  checks.push({ name: "llms.txt returns 200", ok: llms.status === 200, detail: `${llms.status}` });
  checks.push({ name: "robots points to sitemap", ok: robots.text.includes(`${canonicalBase}/sitemap.xml`) });
  checks.push({ name: "robots allows public crawl", ok: robots.text.includes("Allow: /") && !robots.text.includes("Disallow: /") });
  checks.push({ name: "sitemap has loc entries", ok: (sitemap.text.match(/<loc>/g) || []).length >= publicSlugs.length });
  checks.push({ name: "sitemap uses canonical base", ok: sitemap.text.includes(`${canonicalBase}/`) });
  checks.push({ name: "llms.txt uses canonical base", ok: llms.text.includes(`${canonicalBase}/`) });
  checks.push({
    name: "llms.txt excludes draft slugs",
    ok: draftSlugs.every((slug) => !hasMarkdownUrl(llms.text, `${canonicalBase}/blog/${slug}`)),
    detail: failedValues(draftSlugs.filter((slug) => hasMarkdownUrl(llms.text, `${canonicalBase}/blog/${slug}`)).slice(0, 10)),
  });
  checks.push({
    name: "llms.txt includes public article links",
    ok: publicSlugs.slice(0, 5).every((slug) => hasMarkdownUrl(llms.text, `${canonicalBase}/blog/${slug}`)),
    detail: failedValues(publicSlugs.slice(0, 5).filter((slug) => !hasMarkdownUrl(llms.text, `${canonicalBase}/blog/${slug}`))),
  });
  checks.push({ name: "homepage has canonical", ok: hasCanonical(home.text, canonicalBase) });
  checks.push({ name: "homepage has meta description", ok: hasMetaDescription(home.text) });
  checks.push({ name: "homepage has Open Graph", ok: hasOpenGraph(home.text) });
  checks.push({ name: "homepage has JSON-LD", ok: home.text.includes("application/ld+json") });

  const missingFromSitemap = publicSlugs.filter((slug) => !sitemap.text.includes(`${canonicalBase}/blog/${slug}`));
  checks.push({
    name: "all published posts are in sitemap",
    ok: missingFromSitemap.length === 0,
    detail: failedValues(missingFromSitemap),
  });

  const sampleSlugs = publicSlugs.slice(0, 5);
  const samplePages = await Promise.all(sampleSlugs.map((slug) => fetchPage(`/blog/${slug}`)));
  checks.push({
    name: "sample articles return 200",
    ok: samplePages.every((page) => page.status === 200),
    detail: samplePages.map((page, index) => `${sampleSlugs[index]}:${page.status}`).join(", "),
  });
  checks.push({
    name: "sample articles have canonical and BlogPosting JSON-LD",
    ok: samplePages.every((page, index) => hasCanonical(page.text, `${canonicalBase}/blog/${sampleSlugs[index]}`) && page.text.includes("BlogPosting")),
  });
}

async function fetchPage(path: string) {
  const response = await fetch(`${fetchBase}${path}`);
  return { status: response.status, text: await response.text() };
}

async function renderLlmsTxt() {
  const response = getLlmsTxt();
  return response.text();
}

function isAsciiSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function chineseLength(value: string) {
  return (value.match(/[\u4e00-\u9fff]/g) || []).length;
}

function hasCanonical(html: string, expected: string) {
  return html.includes('rel="canonical"') && html.includes(expected);
}

function hasMetaDescription(html: string) {
  const match = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  return Boolean(match && match[1].trim().length >= 12);
}

function hasOpenGraph(html: string) {
  return html.includes('property="og:title"') && html.includes('property="og:description"');
}

function hasMarkdownUrl(text: string, url: string) {
  return text.includes(`](${url})`);
}

function failedValues(values: string[]) {
  return values.length ? values.join(", ") : undefined;
}

function buildNextActions(failed: Check[]) {
  if (!failed.length) return ["当前基础可搜索度检查通过。下一步提交 Google Search Console 并观察真实收录。"];
  return failed.map((item) => `Fix: ${item.name}${item.detail ? ` (${item.detail})` : ""}`);
}

function normalizeBase(value: string) {
  return value.replace(/\/+$/, "");
}

function readArg(name: string) {
  const prefix = `--${name}=`;
  const match = process.argv.slice(2).find((arg) => arg.startsWith(prefix));
  return match?.slice(prefix.length);
}

void main();

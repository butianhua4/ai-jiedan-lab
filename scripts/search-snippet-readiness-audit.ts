import fs from "fs";
import path from "path";
import { articleFiles, chineseCount, readArticle, rel } from "./content-utils";

type SnippetScope = "expansion" | "public" | "recommended" | "wave-1";

type SnippetItem = {
  description: string;
  descriptionLength: number;
  file: string;
  issues: string[];
  primaryKeyword: string;
  scope: SnippetScope[];
  slug: string;
  status: string;
  title: string;
  titleLength: number;
  warnings: string[];
};

type PublicExpansionQueue = {
  items: Array<{ file: string }>;
};

type ReviewCandidates = {
  recommendedToday: Array<{ file: string }>;
};

type WaveApprovalPacket = {
  files: string[];
};

async function main() {
  const publicExpansion = readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json");
  const reviewCandidates = readJson<ReviewCandidates>("content/automation/review-candidates.json");
  const waveApprovalPacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const expansionFiles = new Set(publicExpansion.items.map((item) => normalizeFile(item.file)));
  const recommendedFiles = new Set(reviewCandidates.recommendedToday.map((item) => normalizeFile(item.file)));
  const waveFiles = new Set(waveApprovalPacket.files.map(normalizeFile));
  const articles = (await articleFiles()).map((file) => toSnippetItem(file, expansionFiles, recommendedFiles, waveFiles));
  const scopedItems = articles.filter((item) => item.scope.length > 0);
  const publicItems = scopedItems.filter((item) => item.scope.includes("public"));
  const expansionItems = scopedItems.filter((item) => item.scope.includes("expansion"));
  const recommendedItems = scopedItems.filter((item) => item.scope.includes("recommended"));
  const waveItems = scopedItems.filter((item) => item.scope.includes("wave-1"));
  const blockingItems = scopedItems.filter((item) => item.issues.length > 0);
  const warningItems = scopedItems.filter((item) => item.warnings.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only search snippet readiness audit. It does not edit title, description, slug, status, or noindex.",
    },
    summary: {
      blockingItems: blockingItems.length,
      expansionItems: expansionItems.length,
      publicItems: publicItems.length,
      recommendedItems: recommendedItems.length,
      scopedItems: scopedItems.length,
      warningItems: warningItems.length,
      waveItems: waveItems.length,
      waveItemsWithBlockingIssues: waveItems.filter((item) => item.issues.length > 0).length,
    },
    blockingItems,
    warningItems,
    publicItems,
    recommendedItems,
    waveItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-snippet-readiness-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-snippet-readiness-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length) process.exitCode = 1;
}

function toSnippetItem(file: string, expansionFiles: Set<string>, recommendedFiles: Set<string>, waveFiles: Set<string>): SnippetItem {
  const article = readArticle(file);
  const relativeFile = rel(article.file);
  const title = String(article.data.title || "").trim();
  const description = String(article.data.description || "").trim();
  const slug = String(article.data.slug || "").trim();
  const status = String(article.data.status || "").trim();
  const primaryKeyword = String(article.data.primaryKeyword || "").trim();
  const scope = [
    status === "published" ? "public" : null,
    expansionFiles.has(relativeFile) ? "expansion" : null,
    recommendedFiles.has(relativeFile) ? "recommended" : null,
    waveFiles.has(relativeFile) ? "wave-1" : null,
  ].filter(Boolean) as SnippetScope[];
  const issues = [
    title.length >= 8 ? "" : "title is shorter than 8 characters",
    title.length <= 72 ? "" : "title is longer than 72 characters",
    chineseCount(title) >= 2 || /[a-z0-9]{4,}/i.test(title) ? "" : "title has too little readable keyword text",
    description.length >= 35 ? "" : "description is shorter than 35 characters",
    description.length <= 180 ? "" : "description is longer than 180 characters",
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? "" : "slug should be lowercase kebab-case ASCII",
    status === "published" && article.data.noindex !== false ? "published article must have noindex=false" : "",
    status !== "published" && article.data.noindex === false ? "non-published article must not be indexable" : "",
  ].filter(Boolean);
  const warnings = [
    title.length > 60 ? "title may truncate in search results" : "",
    description.length < 50 ? "description may be thin for search snippets" : "",
    primaryKeyword && !hasKeywordCoverage(title, primaryKeyword) ? "primary keyword coverage is weak in title" : "",
    /^(how-to|guide|article|draft)-/i.test(slug) ? "slug is generic" : "",
  ].filter(Boolean);

  return {
    description,
    descriptionLength: description.length,
    file: relativeFile,
    issues,
    primaryKeyword,
    scope,
    slug,
    status,
    title,
    titleLength: title.length,
    warnings,
  };
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function hasKeywordCoverage(title: string, primaryKeyword: string) {
  const normalizedTitle = normalizeText(title);
  const normalizedKeyword = normalizeText(primaryKeyword);
  if (!normalizedKeyword) return true;
  if (normalizedTitle.includes(normalizedKeyword)) return true;

  const latinTokens = primaryKeyword.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  if (latinTokens.some((token) => !normalizedTitle.includes(token))) return false;

  const keywordChars = [...normalizedKeyword].filter((char) => /[\u4e00-\u9fa5]/.test(char));
  if (keywordChars.length === 0) return latinTokens.length > 0;

  const titleChars = [...normalizedTitle].filter((char) => /[\u4e00-\u9fa5]/.test(char));
  let matched = 0;
  let searchFrom = 0;
  for (const char of keywordChars) {
    const index = titleChars.indexOf(char, searchFrom);
    if (index === -1) continue;
    matched += 1;
    searchFrom = index + 1;
  }

  return matched / keywordChars.length >= 0.68;
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  blockingItems: SnippetItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string };
  publicItems: SnippetItem[];
  recommendedItems: SnippetItem[];
  summary: Record<string, number>;
  warningItems: SnippetItem[];
  waveItems: SnippetItem[];
}) {
  const lines = [
    "# Search Snippet Readiness Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks titles, descriptions, slugs, and indexing boundaries for public and publish-candidate snippets.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Blocking Items",
    "",
    ...table(payload.blockingItems),
    "",
    "## Wave 1 Items",
    "",
    ...table(payload.waveItems),
    "",
    "## Recommended Items",
    "",
    ...table(payload.recommendedItems),
    "",
    "## Public Items",
    "",
    ...table(payload.publicItems),
    "",
    "## Warning Items",
    "",
    ...table(payload.warningItems.slice(0, 50)),
    "",
  ];

  return lines.join("\n");
}

function table(items: SnippetItem[]) {
  if (!items.length) return ["- none"];

  return [
    "| Scope | Title chars | Description chars | Issues | Warnings | Slug | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => (
      `| ${item.scope.join(", ")} | ${item.titleLength} | ${item.descriptionLength} | ${item.issues.length ? item.issues.join("<br>") : "none"} | ${item.warnings.length ? item.warnings.join("<br>") : "none"} | ${item.slug} | ${item.title} | ${item.file} |`
    )),
  ];
}

void main();

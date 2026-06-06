import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type SchemaScope = "expansion" | "public" | "recommended" | "wave-1";

type SchemaPreview = {
  "@context": "https://schema.org";
  "@type": "Article";
  author: { "@type": "Organization"; name: string };
  dateModified: string;
  datePublished: string;
  description: string;
  headline: string;
  inLanguage: "zh-CN";
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
};

type SchemaItem = {
  author: string;
  canonical: string;
  category: string;
  contentType: string;
  date: string;
  difficulty: string;
  file: string;
  issues: string[];
  jsonLdPreview: SchemaPreview;
  scope: SchemaScope[];
  slug: string;
  status: string;
  tags: string[];
  title: string;
  updatedAt: string;
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

const siteUrl = "https://ai-jiedan-lab.vercel.app";

async function main() {
  const publicExpansion = readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json");
  const reviewCandidates = readJson<ReviewCandidates>("content/automation/review-candidates.json");
  const waveApprovalPacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const expansionFiles = new Set(publicExpansion.items.map((item) => normalizeFile(item.file)));
  const recommendedFiles = new Set(reviewCandidates.recommendedToday.map((item) => normalizeFile(item.file)));
  const waveFiles = new Set(waveApprovalPacket.files.map(normalizeFile));
  const articles = (await articleFiles()).map((file) => toSchemaItem(file, expansionFiles, recommendedFiles, waveFiles));
  const scopedItems = articles.filter((item) => item.scope.length > 0);
  const publicItems = scopedItems.filter((item) => item.scope.includes("public"));
  const expansionItems = scopedItems.filter((item) => item.scope.includes("expansion"));
  const recommendedItems = scopedItems.filter((item) => item.scope.includes("recommended"));
  const waveItems = scopedItems.filter((item) => item.scope.includes("wave-1"));
  const blockingItems = scopedItems.filter((item) => item.issues.length > 0);
  const warningItems = scopedItems.filter((item) => item.warnings.length > 0);
  const jsonLdPreviewItems = scopedItems.filter((item) => item.jsonLdPreview.headline && item.jsonLdPreview.mainEntityOfPage["@id"]);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only structured data readiness audit. It creates JSON-LD previews but does not edit metadata, status, noindex, or canonical URLs.",
    },
    summary: {
      blockingItems: blockingItems.length,
      expansionItems: expansionItems.length,
      jsonLdPreviewItems: jsonLdPreviewItems.length,
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

  const jsonTarget = path.join(process.cwd(), "content", "automation", "structured-data-readiness-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "structured-data-readiness-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length) process.exitCode = 1;
}

function toSchemaItem(file: string, expansionFiles: Set<string>, recommendedFiles: Set<string>, waveFiles: Set<string>): SchemaItem {
  const article = readArticle(file);
  const relativeFile = rel(article.file);
  const title = stringValue(article.data.title);
  const description = stringValue(article.data.description);
  const slug = stringValue(article.data.slug);
  const date = stringValue(article.data.date);
  const updatedAt = stringValue(article.data.updatedAt);
  const author = stringValue(article.data.author);
  const category = stringValue(article.data.category);
  const canonical = stringValue(article.data.canonical);
  const contentType = stringValue(article.data.contentType);
  const difficulty = stringValue(article.data.difficulty);
  const status = stringValue(article.data.status);
  const tags = getStringArray(article.data.tags);
  const expectedCanonical = `${siteUrl}/blog/${slug}`;
  const scope = [
    status === "published" ? "public" : null,
    expansionFiles.has(relativeFile) ? "expansion" : null,
    recommendedFiles.has(relativeFile) ? "recommended" : null,
    waveFiles.has(relativeFile) ? "wave-1" : null,
  ].filter(Boolean) as SchemaScope[];
  const issues = [
    title ? "" : "title is required for Article.headline",
    description ? "" : "description is required for Article.description",
    slug ? "" : "slug is required for Article.mainEntityOfPage",
    isKebabSlug(slug) ? "" : "slug should be lowercase kebab-case ASCII",
    isIsoDate(date) ? "" : "date should use YYYY-MM-DD",
    isIsoDate(updatedAt) ? "" : "updatedAt should use YYYY-MM-DD",
    isIsoDate(date) && isIsoDate(updatedAt) && updatedAt < date ? "updatedAt should not be earlier than date" : "",
    author ? "" : "author is required for Article.author",
    category ? "" : "category is required for content grouping",
    tags.length > 0 ? "" : "at least one tag is required",
    contentType ? "" : "contentType is required",
    difficulty ? "" : "difficulty is required",
    canonical ? "" : "canonical is required",
    canonical && canonical !== expectedCanonical ? `canonical should match ${expectedCanonical}` : "",
    status === "published" && article.data.noindex !== false ? "published article must have noindex=false" : "",
    status !== "published" && article.data.noindex === false ? "non-published article must not be indexable" : "",
  ].filter(Boolean);
  const warnings = [
    tags.length > 0 && tags.length < 2 ? "consider adding at least two tags for topical context" : "",
    description.length > 180 ? "description may be too long for reuse in structured data and snippets" : "",
    title.length > 110 ? "headline is long for structured data consumers" : "",
    contentType && !["case-study", "checklist", "guide", "tutorial"].includes(contentType) ? `contentType is uncommon: ${contentType}` : "",
    difficulty && !["beginner", "intermediate", "advanced"].includes(difficulty) ? `difficulty is uncommon: ${difficulty}` : "",
  ].filter(Boolean);

  return {
    author,
    canonical,
    category,
    contentType,
    date,
    difficulty,
    file: relativeFile,
    issues,
    jsonLdPreview: {
      "@context": "https://schema.org",
      "@type": "Article",
      author: {
        "@type": "Organization",
        name: author,
      },
      dateModified: updatedAt,
      datePublished: date,
      description,
      headline: title,
      inLanguage: "zh-CN",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical || expectedCanonical,
      },
    },
    scope,
    slug,
    status,
    tags,
    title,
    updatedAt,
    warnings,
  };
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim()) : [];
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isKebabSlug(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  blockingItems: SchemaItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string };
  publicItems: SchemaItem[];
  recommendedItems: SchemaItem[];
  summary: Record<string, number>;
  warningItems: SchemaItem[];
  waveItems: SchemaItem[];
}) {
  const lines = [
    "# Structured Data Readiness Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks whether public and publish-candidate articles have the metadata needed to render Article JSON-LD safely later.",
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
    "## Wave 1 JSON-LD Preview",
    "",
    "```json",
    JSON.stringify(payload.waveItems.map((item) => ({ file: item.file, jsonLd: item.jsonLdPreview })), null, 2),
    "```",
    "",
  ];

  return lines.join("\n");
}

function table(items: SchemaItem[]) {
  if (!items.length) return ["- none"];

  return [
    "| Scope | Issues | Warnings | Date | Updated | Tags | Content type | Difficulty | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => (
      `| ${item.scope.join(", ")} | ${item.issues.length ? item.issues.join("<br>") : "none"} | ${item.warnings.length ? item.warnings.join("<br>") : "none"} | ${item.date} | ${item.updatedAt} | ${item.tags.join(", ")} | ${item.contentType} | ${item.difficulty} | ${item.title} | ${item.file} |`
    )),
  ];
}

void main();

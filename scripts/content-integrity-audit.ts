import fs from "fs";
import path from "path";
import { articleFiles, chineseCount, readArticle, rel } from "./content-utils";

type AuditItem = {
  descriptionLength: number;
  file: string;
  issues: string[];
  scope: string[];
  status: string;
  title: string;
  titleLength: number;
  warnings: string[];
};

type ReviewCandidates = {
  recommendedToday: Array<{ file: string }>;
};

type WaveApprovalPacket = {
  files: string[];
};

type PublicExpansionQueue = {
  items: Array<{ file: string }>;
};

const mojibakePatterns = [
  /\uFFFD/,
  /锟斤拷/,
  /(?:Ã.|Â.|â[€�])/,
  /(?:鎬庝箞|鐨勭|鍋氾|绋嬶|妫€|锛氬|銆|浠庡|庝箞|叿|楠岃|||||)/,
];

async function main() {
  const reviewCandidates = readJson<ReviewCandidates>("content/automation/review-candidates.json");
  const waveApprovalPacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const publicExpansion = readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json");
  const recommended = new Set(reviewCandidates.recommendedToday.map((item) => normalizeFile(item.file)));
  const waveFiles = new Set(waveApprovalPacket.files.map(normalizeFile));
  const expansionFiles = new Set(publicExpansion.items.map((item) => normalizeFile(item.file)));
  const files = await articleFiles();
  const items = files.map((file) => auditFile(file, recommended, waveFiles, expansionFiles));
  const publicItems = items.filter((item) => item.scope.includes("public"));
  const recommendedItems = items.filter((item) => item.scope.includes("recommended"));
  const waveItems = items.filter((item) => item.scope.includes("wave-1"));
  const blockingItems = items.filter((item) => item.issues.length > 0 && item.scope.some((scope) => ["public", "recommended", "wave-1"].includes(scope)));
  const allIssueItems = items.filter((item) => item.issues.length > 0);
  const warningItems = items.filter((item) => item.warnings.length > 0);
  const mojibakeWarningItems = warningItems.filter((item) => item.warnings.includes("possible mojibake or replacement character"));
  const publicMojibakeWarningItems = mojibakeWarningItems.filter((item) => item.scope.includes("public"));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only content integrity audit. It does not edit articles, mark review, or publish.",
    },
    summary: {
      allIssueItems: allIssueItems.length,
      blockingItems: blockingItems.length,
      expansionItems: expansionFiles.size,
      filesScanned: items.length,
      mojibakeWarningItems: mojibakeWarningItems.length,
      publicItems: publicItems.length,
      publicMojibakeWarningItems: publicMojibakeWarningItems.length,
      recommendedItems: recommendedItems.length,
      waveItems: waveItems.length,
      warningItems: warningItems.length,
    },
    blockingItems,
    issueItems: allIssueItems.slice(0, 50),
    publicItems,
    recommendedItems,
    warningItems: warningItems.slice(0, 80),
    waveItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "content-integrity-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "content-integrity-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length) process.exitCode = 1;
}

function auditFile(file: string, recommended: Set<string>, waveFiles: Set<string>, expansionFiles: Set<string>): AuditItem {
  const article = readArticle(file);
  const relativeFile = rel(article.file);
  const title = String(article.data.title || "");
  const description = String(article.data.description || "");
  const status = String(article.data.status || "");
  const scope = [
    status === "published" ? "public" : "",
    recommended.has(relativeFile) ? "recommended" : "",
    waveFiles.has(relativeFile) ? "wave-1" : "",
    expansionFiles.has(relativeFile) ? "expansion" : "",
  ].filter(Boolean);
  const inspectedText = [
    title,
    description,
    String(article.data.category || ""),
    stringifyValue(article.data.tags),
    String(article.data.author || ""),
    String(article.data.targetReader || ""),
    String(article.data.primaryKeyword || ""),
    stringifyValue(article.data.secondaryKeywords),
    String(article.data.sourceNotes || ""),
    article.content,
  ].join("\n");
  const issues = [
    title.trim().length >= 8 ? "" : "title shorter than 8 characters",
    description.trim().length >= 20 ? "" : "description shorter than 20 characters",
    chineseCount(title) >= 2 ? "" : "title has fewer than 2 Chinese characters",
    chineseCount(description) >= 8 ? "" : "description has fewer than 8 Chinese characters",
    status === "published" && article.data.noindex !== false ? "published article must have noindex=false" : "",
    status !== "published" && article.data.noindex === false ? "non-published article must not be indexable" : "",
  ].filter(Boolean);
  const warnings = [
    mojibakePatterns.some((pattern) => pattern.test(inspectedText)) ? "possible mojibake or replacement character" : "",
  ].filter(Boolean);

  return {
    descriptionLength: description.length,
    file: relativeFile,
    issues,
    scope,
    status,
    title,
    titleLength: title.length,
    warnings,
  };
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function stringifyValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(stringifyValue).join(" ");
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).map(stringifyValue).join(" ");
  return String(value || "");
}

function toMarkdown(payload: {
  blockingItems: AuditItem[];
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string };
  issueItems: AuditItem[];
  publicItems: AuditItem[];
  recommendedItems: AuditItem[];
  summary: Record<string, number>;
  warningItems: AuditItem[];
  waveItems: AuditItem[];
}) {
  const lines = [
    "# Content Integrity Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks article metadata, encoding integrity, and indexing boundaries before review or publishing.",
    "",
    "## Guardrails",
    "",
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
    "## Other Issue Items",
    "",
    ...table(payload.issueItems.filter((item) => !payload.blockingItems.some((blocking) => blocking.file === item.file))),
    "",
    "## Warning Items",
    "",
    ...table(payload.warningItems),
    "",
  ];

  return lines.join("\n");
}

function table(items: AuditItem[]) {
  if (!items.length) return ["- none"];

  return [
    "| Status | Scope | Title chars | Description chars | Issues | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => (
      `| ${item.status} | ${item.scope.join(", ") || "all"} | ${item.titleLength} | ${item.descriptionLength} | ${item.issues.length ? item.issues.join("<br>") : "none"} | ${item.warnings.length ? item.warnings.join("<br>") : "none"} | ${item.title} | ${item.file} |`
    )),
  ];
}

void main();


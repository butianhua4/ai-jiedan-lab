import fs from "fs";
import path from "path";
import { chineseCount, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type PackItem = {
  file: string;
  title: string;
};

type PreflightItem = {
  file: string;
  issues: string[];
  markReviewDryRunCommand: string;
  contentIntegrityWarnings: string[];
  ok: boolean;
  qualityScore: number;
  status: string;
  title: string;
  wordCountChinese: number;
};

type ContentIntegrity = {
  warningItems?: Array<{ file: string; warnings?: string[] }>;
};

async function main() {
  const pack = readJson<{ items: PackItem[] }>("content/automation/publish-readiness-pack.json");
  const contentIntegrity = readJson<ContentIntegrity>("content/automation/content-integrity-audit.json");
  const warningsByFile = new Map(
    (contentIntegrity.warningItems || []).map((item) => [normalizeFile(item.file), item.warnings || []]),
  );
  const items = pack.items.map((item) => toPreflightItem(item, warningsByFile));
  const failed = items.filter((item) => !item.ok);
  const warningItems = items.filter((item) => item.contentIntegrityWarnings.length > 0);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      note: "This preflight only checks whether recommended drafts are ready for human review. It does not change article status.",
    },
    ok: failed.length === 0,
    summary: {
      checked: items.length,
      failed: failed.length,
      mojibakeWarningItems: warningItems.filter((item) => item.contentIntegrityWarnings.includes("possible mojibake or replacement character")).length,
      passed: items.length - failed.length,
      warningItems: warningItems.length,
    },
    failed,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-preflight.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-preflight.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: payload.ok, checked: items.length, failed: failed.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
  if (failed.length) process.exitCode = 1;
}

function toPreflightItem(packItem: PackItem, warningsByFile: Map<string, string[]>): PreflightItem {
  const article = readArticle(packItem.file);
  const result = checkFile(article.file);
  const file = rel(article.file);
  const contentIntegrityWarnings = warningsByFile.get(file) || [];
  const issues = [
    article.data.status === "draft" ? "" : `status is ${article.data.status}, expected draft`,
    article.data.noindex === true ? "" : "draft must be noindex=true",
    article.data.sourceNotes ? "" : "sourceNotes is empty",
    result.failedItems.length ? `quality failed: ${result.failedItems.join("; ")}` : "",
    result.qualityScore >= 100 ? "" : `qualityScore ${result.qualityScore} below 100`,
  ].filter(Boolean);

  return {
    file,
    issues,
    markReviewDryRunCommand: `npm run mark:review -- --file=${file}`,
    contentIntegrityWarnings,
    ok: issues.length === 0,
    qualityScore: result.qualityScore,
    status: String(article.data.status || "unknown"),
    title: String(article.data.title || packItem.title || ""),
    wordCountChinese: chineseCount(article.content),
  };
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; note: string };
  ok: boolean;
  summary: { checked: number; failed: number; mojibakeWarningItems: number; passed: number; warningItems: number };
  items: PreflightItem[];
}) {
  const lines = [
    "# Review Candidate Preflight",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    `Overall: ${payload.ok ? "PASS" : "FAIL"}`,
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    `- Checked: ${payload.summary.checked}`,
    `- Passed: ${payload.summary.passed}`,
    `- Failed: ${payload.summary.failed}`,
    `- Warning items: ${payload.summary.warningItems}`,
    `- Mojibake warning items: ${payload.summary.mojibakeWarningItems}`,
    "",
    "## Items",
    "",
    "| Status | Score | Chinese chars | Title | File | Issues | Warnings |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.map((item) => `| ${item.ok ? "PASS" : "FAIL"} | ${item.qualityScore} | ${item.wordCountChinese} | ${item.title} | ${item.file} | ${item.issues.join("; ")} | ${item.contentIntegrityWarnings.join("; ")} |`),
    "",
    "## Dry-run Commands",
    "",
    "```bash",
    ...payload.items.map((item) => item.markReviewDryRunCommand),
    "```",
    "",
  ];

  return lines.join("\n");
}

void main();

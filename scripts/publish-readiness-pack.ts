import fs from "fs";
import path from "path";
import { chineseCount, parseArgs, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type Candidate = {
  file: string;
  publishBatch: number | null;
  qualityScore: number;
  title: string;
};

type PackItem = {
  category: string;
  description: string;
  file: string;
  internalLinks: number;
  markReviewCommand: string;
  primaryKeyword: string;
  publishConfirmCommand: string;
  publishDryRunCommand: string;
  qualityScore: number;
  reviewFocus: string[];
  searchIntent: string;
  slug: string;
  title: string;
  wordCountChinese: number;
};

async function main() {
  const args = parseArgs();
  const limit = Math.min(Number(args.limit || 3), 10);
  const candidates = loadCandidates().slice(0, limit);
  const items = candidates.map(toPackItem);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoPublish: false,
      requiredHumanAction: "Read the article, verify factual claims and risk language, then mark review manually.",
      publishRule: "Only publish status=review articles, 1-3 per batch, after a second dry-run.",
    },
    counts: {
      requested: limit,
      included: items.length,
    },
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "publish-readiness-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "publish-readiness-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, included: items.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function loadCandidates() {
  const reviewQueuePath = path.join(process.cwd(), "content", "automation", "review-candidates.json");
  if (!fs.existsSync(reviewQueuePath)) {
    throw new Error("Missing review-candidates.json. Run npm run automation:review first.");
  }

  const payload = JSON.parse(fs.readFileSync(reviewQueuePath, "utf8")) as { recommendedToday?: Candidate[]; candidates?: Candidate[] };
  return payload.recommendedToday?.length ? payload.recommendedToday : payload.candidates || [];
}

function toPackItem(candidate: Candidate): PackItem {
  const article = readArticle(candidate.file);
  const result = checkFile(article.file);
  const content = article.content;
  const data = article.data;
  const file = rel(article.file);

  return {
    category: String(data.category || ""),
    description: String(data.description || ""),
    file,
    internalLinks: (content.match(/\]\(\//g) || []).length,
    markReviewCommand: `npm run mark:review -- --file=${file} --confirm-human`,
    primaryKeyword: String(data.primaryKeyword || ""),
    publishConfirmCommand: `npm run publish:articles -- --file=${file} --confirm`,
    publishDryRunCommand: `npm run publish:articles -- --file=${file}`,
    qualityScore: result.qualityScore,
    reviewFocus: buildReviewFocus(result.warnings),
    searchIntent: String(data.searchIntent || ""),
    slug: String(data.slug || ""),
    title: String(data.title || candidate.title || ""),
    wordCountChinese: chineseCount(content),
  };
}

function buildReviewFocus(warnings: string[]) {
  return [
    "Verify the opening answer matches the title and search intent.",
    "Check facts, tool names, limits, and platform policy wording.",
    "Confirm risk reminders are cautionary and do not imply guaranteed outcomes.",
    "Confirm internal links and CTA point to relevant site pages.",
    ...warnings.map((warning) => `Quality warning: ${warning}`),
  ];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoPublish: boolean; requiredHumanAction: string; publishRule: string };
  counts: { requested: number; included: number };
  items: PackItem[];
}) {
  const lines = [
    "# Publish Readiness Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This pack organizes manual review work. It does not publish articles or change article status.",
    "",
    "## Guardrails",
    "",
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Required human action: ${payload.guardrails.requiredHumanAction}`,
    `- Publish rule: ${payload.guardrails.publishRule}`,
    "",
    "## Summary",
    "",
    `- Requested: ${payload.counts.requested}`,
    `- Included: ${payload.counts.included}`,
    "",
  ];

  for (const [index, item] of payload.items.entries()) {
    lines.push(
      `## ${index + 1}. ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Category: ${item.category}`,
      `- Primary keyword: ${item.primaryKeyword}`,
      `- Search intent: ${item.searchIntent}`,
      `- Quality score: ${item.qualityScore}`,
      `- Chinese chars: ${item.wordCountChinese}`,
      `- Internal links: ${item.internalLinks}`,
      `- Description: ${item.description}`,
      "",
      "Review focus:",
      "",
      ...item.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "Commands:",
      "",
      "```bash",
      item.markReviewCommand,
      item.publishDryRunCommand,
      item.publishConfirmCommand,
      "npm run live:check -- --url=https://ai-jiedan-lab.vercel.app",
      "```",
      "",
    );
  }

  return lines.join("\n");
}

void main();

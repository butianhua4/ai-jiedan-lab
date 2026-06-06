import fs from "fs";
import path from "path";
import { chineseCount, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type QueueItem = {
  approvalWave: number;
  file: string;
  humanReviewCommand: string;
  priorityScore: number;
  publishDryRunCommand: string;
  sourcePackReady: boolean;
};

type SourcePackItem = {
  approvalChecklist: string[];
  factCheckQueries: string[];
  file: string;
  lane: string;
  officialSourceTargets: string[];
  riskReviewChecklist: string[];
  safeDraft: boolean;
  title: string;
  workflowAngles: string[];
};

type PacketItem = {
  approvalChecklist: string[];
  description: string;
  factCheckQueries: string[];
  file: string;
  humanReviewCommand: string;
  internalLinks: number;
  lane: string;
  officialSourceTargets: string[];
  priorityScore: number;
  publishBatch: number | null;
  publishDryRunCommand: string;
  qualityIssues: string[];
  qualityScore: number;
  readyForHumanReview: boolean;
  riskReviewChecklist: string[];
  safeDraft: boolean;
  searchIntent: string;
  sourcePackReady: boolean;
  sourceNotes: string;
  title: string;
  wordCountChinese: number;
  workflowAngles: string[];
};

function main() {
  const queue = readJson<{
    approvalWaves: Array<{ files: string[]; wave: number }>;
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    items: QueueItem[];
  }>("content/automation/public-expansion-queue.json");
  const sourcePack = readJson<{ items: SourcePackItem[] }>("content/automation/next-review-source-pack.json");
  const wave = Number(process.argv.find((arg) => arg.startsWith("--wave="))?.split("=")[1] || 1);
  const sourceItems = new Map(sourcePack.items.map((item) => [item.file, item]));
  const waveItems = queue.items.filter((item) => item.approvalWave === wave);
  const items = waveItems.map((item) => toPacketItem(item, sourceItems.get(item.file)));
  const unsafeItems = items.filter((item) => !item.readyForHumanReview);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This packet prepares the next human approval wave only. It does not change article status, noindex, or publishing state.",
      stopBefore: "Run the listed mark:review commands only after explicit human approval for each file.",
    },
    summary: {
      items: items.length,
      readyForHumanReview: items.filter((item) => item.readyForHumanReview).length,
      unsafeItems: unsafeItems.length,
      wave,
    },
    wave,
    files: items.map((item) => item.file),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "wave-approval-packet.json");
  const mdTarget = path.join(process.cwd(), "docs", "wave-approval-packet.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, items: items.length, wave, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function toPacketItem(queueItem: QueueItem, sourceItem: SourcePackItem | undefined): PacketItem {
  const article = readArticle(queueItem.file);
  const quality = checkFile(article.file);
  const data = article.data;
  const content = article.content;
  const safeDraft = data.status === "draft" && data.noindex === true && data.humanReviewRequired === true;
  const internalLinks = (content.match(/\]\(\//g) || []).length;
  const readyForHumanReview = Boolean(
    sourceItem &&
      queueItem.sourcePackReady &&
      sourceItem.safeDraft &&
      safeDraft &&
      quality.failedItems.length === 0 &&
      sourceItem.officialSourceTargets.length > 0 &&
      sourceItem.factCheckQueries.length > 0 &&
      sourceItem.riskReviewChecklist.length > 0,
  );

  return {
    approvalChecklist: sourceItem?.approvalChecklist || [],
    description: String(data.description || ""),
    factCheckQueries: sourceItem?.factCheckQueries || [],
    file: rel(article.file),
    humanReviewCommand: queueItem.humanReviewCommand,
    internalLinks,
    lane: sourceItem?.lane || "",
    officialSourceTargets: sourceItem?.officialSourceTargets || [],
    priorityScore: queueItem.priorityScore,
    publishBatch: typeof data.publishBatch === "number" ? data.publishBatch : null,
    publishDryRunCommand: queueItem.publishDryRunCommand,
    qualityIssues: quality.failedItems,
    qualityScore: quality.qualityScore,
    readyForHumanReview,
    riskReviewChecklist: sourceItem?.riskReviewChecklist || [],
    safeDraft,
    searchIntent: String(data.searchIntent || ""),
    sourcePackReady: queueItem.sourcePackReady && Boolean(sourceItem),
    sourceNotes: String(data.sourceNotes || ""),
    title: String(data.title || sourceItem?.title || ""),
    wordCountChinese: chineseCount(content),
    workflowAngles: sourceItem?.workflowAngles || [],
  };
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  files: string[];
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: PacketItem[];
  summary: Record<string, number>;
  wave: number;
}) {
  const lines = [
    "# Wave Approval Packet",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    `Approval wave: ${payload.wave}`,
    "",
    "This packet is read-only. It consolidates the queue and source-pack checks for the next human review wave.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Files",
    "",
    ...payload.files.map((file) => `- ${file}`),
    "",
    "## Decision Table",
    "",
    "| Ready | Score | Quality | Sources | Queries | Risk | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.priorityScore} | ${item.qualityScore} | ${item.officialSourceTargets.length} | ${item.factCheckQueries.length} | ${item.riskReviewChecklist.length} | ${item.title} | ${item.file} |`,
    ),
    "",
  ];

  for (const [index, item] of payload.items.entries()) {
    lines.push(
      `## ${index + 1}. ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Lane: ${item.lane}`,
      `- Search intent: ${item.searchIntent}`,
      `- Publish batch: ${item.publishBatch ?? ""}`,
      `- Priority score: ${item.priorityScore}`,
      `- Quality score: ${item.qualityScore}`,
      `- Ready for human review: ${item.readyForHumanReview}`,
      `- Safe draft: ${item.safeDraft}`,
      `- Source pack ready: ${item.sourcePackReady}`,
      `- Chinese chars: ${item.wordCountChinese}`,
      `- Internal links: ${item.internalLinks}`,
      `- Description: ${item.description}`,
      `- Source notes: ${item.sourceNotes}`,
      "",
      "Approval checklist:",
      "",
      ...item.approvalChecklist.map((check) => `- ${check}`),
      "",
      "Official source targets:",
      "",
      ...item.officialSourceTargets.map((target) => `- ${target}`),
      "",
      "Fact-check queries:",
      "",
      ...item.factCheckQueries.map((query) => `- ${query}`),
      "",
      "Risk review checklist:",
      "",
      ...item.riskReviewChecklist.map((check) => `- ${check}`),
      "",
      "Workflow angles:",
      "",
      ...item.workflowAngles.map((angle) => `- ${angle}`),
      "",
      "Quality issues:",
      "",
      ...(item.qualityIssues.length ? item.qualityIssues.map((issue) => `- ${issue}`) : ["- none"]),
      "",
      "Commands after explicit human approval:",
      "",
      "```bash",
      item.humanReviewCommand,
      item.publishDryRunCommand,
      "```",
      "",
    );
  }

  return lines.join("\n");
}

main();

import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type ArticleQueueSignals = {
  executivePriority?: number;
  inExecutiveTop: boolean;
  inHumanApprovalImmediate: boolean;
  inReviewPortfolio: boolean;
  lanes: string[];
};

type MojibakeFieldHit = {
  field: string;
  markers: string[];
  sample: string;
};

type RemediationItem = {
  file: string;
  humanReviewRequired: boolean;
  manualActions: string[];
  metadataHits: MojibakeFieldHit[];
  noindex: boolean | null;
  preserveStatus: true;
  priorityScore: number;
  publishConfirm: "not-included";
  queueSignals: ArticleQueueSignals;
  status: string;
  title: string;
  bodyHit: MojibakeFieldHit | null;
};

type FileRef = {
  file?: string;
};

type HumanApprovalQueue = {
  immediateItems?: Array<FileRef & { priorityScore?: number }>;
};

type ExecutiveBrief = {
  topApprovalActions?: Array<FileRef & { priority?: number }>;
};

const metadataFields = [
  "title",
  "description",
  "category",
  "tags",
  "author",
  "targetReader",
  "primaryKeyword",
  "secondaryKeywords",
  "sourceNotes",
];

const markerPattern =
  /[\uFFFD]|鈥|閫|鎺|鏂|绋|銆|锛|閮|鎬|涓|鐢|妫|瀹|璇|悊|噴|拰|杩|鍏|鍦|鍨|Ã|Â|â€|æ|ç|è|é|å|脙|脗|芒|莽|猫|茅|氓|盲|枚|冒|脨|脩/;
const markerTokens = [
  "�",
  "鈥",
  "閫",
  "鎺",
  "鏂",
  "绋",
  "銆",
  "锛",
  "閮",
  "鎬",
  "涓",
  "鐢",
  "妫",
  "瀹",
  "璇",
  "悊",
  "噴",
  "拰",
  "杩",
  "鍏",
  "鍦",
  "鍨",
  "Ã",
  "Â",
  "â€",
  "æ",
  "ç",
  "è",
  "é",
  "å",
  "脙",
  "脗",
  "芒",
  "莽",
  "猫",
  "茅",
  "氓",
  "盲",
  "枚",
  "冒",
  "脨",
  "脩",
];

async function main() {
  const humanApproval = readOptionalJson<HumanApprovalQueue>("content/automation/human-approval-execution-queue.json");
  const executive = readOptionalJson<ExecutiveBrief>("content/automation/autopilot-executive-brief.json");
  const portfolio = readOptionalJson<unknown>("content/automation/review-portfolio-board.json");
  const laneSources = [
    laneSource("ai-deployment-sprint", "content/automation/ai-deployment-sprint-board.json"),
    laneSource("memory-rag-sprint", "content/automation/memory-rag-sprint-board.json"),
    laneSource("popular-prompt-sprint", "content/automation/popular-prompt-sprint-board.json"),
    laneSource("internal-link-sprint", "content/automation/internal-link-sprint-board.json"),
    laneSource("public-gap", "content/automation/public-coverage-gap-decision-pack.json"),
  ];

  const executivePriorities = new Map(
    (executive?.topApprovalActions || [])
      .filter((item) => item.file)
      .map((item) => [normalizeFile(item.file || ""), Number(item.priority || 0)]),
  );
  const immediatePriorities = new Map(
    (humanApproval?.immediateItems || [])
      .filter((item) => item.file)
      .map((item) => [normalizeFile(item.file || ""), Number(item.priorityScore || 0)]),
  );
  const portfolioFiles = collectFiles(portfolio);

  const files = await articleFiles();
  const items = files
    .map((file) => inspectArticle(file, { executivePriorities, immediatePriorities, laneSources, portfolioFiles }))
    .filter((item): item is RemediationItem => Boolean(item))
    .sort((a, b) => b.priorityScore - a.priorityScore || a.file.localeCompare(b.file));

  const affectedPublicFiles = items.filter((item) => item.status === "published");
  const affectedDraftFiles = items.filter((item) => item.status !== "published");
  const metadataHitCounts = countMetadataHits(items);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only mojibake remediation queue. It identifies likely garbled Chinese metadata/body excerpts for human repair before approval.",
      stopBefore: "Do not change status, noindex, humanReviewRequired, mark:review, or publish inside this automation.",
      trafficClaim: "not-included",
    },
    summary: {
      affectedDraftFiles: affectedDraftFiles.length,
      affectedFiles: items.length,
      affectedMetadataFields: Object.keys(metadataHitCounts).length,
      affectedPublicFiles: affectedPublicFiles.length,
      bodyExcerptHits: items.filter((item) => item.bodyHit).length,
      executiveTopAffected: items.filter((item) => item.queueSignals.inExecutiveTop).length,
      filesScanned: files.length,
      immediateApprovalAffected: items.filter((item) => item.queueSignals.inHumanApprovalImmediate).length,
      metadataFieldHits: Object.values(metadataHitCounts).reduce((total, count) => total + count, 0),
      publishConfirmCommandsIncluded: 0,
      scannedMetadataFields: metadataFields.length,
      trafficDataAvailable: false,
      unsafeItems: 0,
    },
    metadataHitCounts,
    items: items.slice(0, 80),
    manualRemediationRules: [
      "Repair readable Chinese title and description first, then body excerpts, using human source review.",
      "Preserve status, noindex, humanReviewRequired, slug, publishBatch, and qualityScore unless a human explicitly approves a separate change.",
      "Do not run mark:review or publish commands from this report.",
      "After repairs, rerun npm run content:integrity, npm run content:check, npm run automation:gate, and npm run automation:digest.",
      "If a title cannot be recovered confidently, leave the article in draft and add it to manual copy review.",
    ],
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "mojibake-remediation-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "mojibake-remediation-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
}

function inspectArticle(
  file: string,
  context: {
    executivePriorities: Map<string, number>;
    immediatePriorities: Map<string, number>;
    laneSources: Array<{ files: Set<string>; lane: string }>;
    portfolioFiles: Set<string>;
  },
): RemediationItem | null {
  const article = readArticle(file);
  const relativeFile = rel(article.file);
  const data = article.data;
  const metadataHits = metadataFields
    .map((field) => inspectValue(field, data[field]))
    .filter((hit): hit is MojibakeFieldHit => Boolean(hit));
  const bodyHit = inspectBody(article.content);
  if (metadataHits.length === 0 && !bodyHit) return null;

  const lanes = context.laneSources.filter((source) => source.files.has(relativeFile)).map((source) => source.lane);
  const queueSignals: ArticleQueueSignals = {
    executivePriority: context.executivePriorities.get(relativeFile),
    inExecutiveTop: context.executivePriorities.has(relativeFile),
    inHumanApprovalImmediate: context.immediatePriorities.has(relativeFile),
    inReviewPortfolio: context.portfolioFiles.has(relativeFile),
    lanes,
  };

  return {
    bodyHit,
    file: relativeFile,
    humanReviewRequired: Boolean(data.humanReviewRequired),
    manualActions: [
      "Repair title and description into readable Chinese without changing slug or publish status.",
      "Compare body excerpt against intended topic and rewrite only the garbled copy after human source review.",
      "Verify sourceNotes and official source targets still match the repaired claim wording.",
      "Keep draft/review/published status and noindex unchanged during remediation.",
      "Rerun integrity, content quality, automation gate, and digest checks before any approval action.",
    ],
    metadataHits,
    noindex: typeof data.noindex === "boolean" ? data.noindex : null,
    preserveStatus: true,
    priorityScore: priorityScore(queueSignals, data.qualityScore),
    publishConfirm: "not-included",
    queueSignals,
    status: String(data.status || "draft"),
    title: String(data.title || path.basename(relativeFile)),
  };
}

function inspectValue(field: string, value: unknown): MojibakeFieldHit | null {
  const text = stringifyValue(value);
  if (!markerPattern.test(text)) return null;
  return {
    field,
    markers: markerTokens.filter((marker) => text.includes(marker)).slice(0, 8),
    sample: sampleText(text),
  };
}

function inspectBody(content: string): MojibakeFieldHit | null {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
  const hit = paragraphs.find((part) => markerPattern.test(part));
  if (!hit) return null;
  return {
    field: "bodyExcerpt",
    markers: markerTokens.filter((marker) => hit.includes(marker)).slice(0, 8),
    sample: sampleText(hit),
  };
}

function priorityScore(signals: ArticleQueueSignals, qualityScore: unknown) {
  const baseQuality = typeof qualityScore === "number" ? qualityScore : 0;
  return (
    baseQuality +
    (signals.executivePriority || 0) +
    (signals.inHumanApprovalImmediate ? 300 : 0) +
    (signals.inReviewPortfolio ? 120 : 0) +
    signals.lanes.length * 40
  );
}

function countMetadataHits(items: RemediationItem[]) {
  const counts: Record<string, number> = {};
  for (const item of items) {
    for (const hit of item.metadataHits) counts[hit.field] = (counts[hit.field] || 0) + 1;
    if (item.bodyHit) counts.bodyExcerpt = (counts.bodyExcerpt || 0) + 1;
  }
  return counts;
}

function laneSource(lane: string, relativePath: string) {
  return { files: collectFiles(readOptionalJson<unknown>(relativePath)), lane };
}

function collectFiles(value: unknown) {
  const files = new Set<string>();
  walk(value, (item) => {
    if (typeof item === "string" && item.startsWith("content/blog/")) files.add(normalizeFile(item));
  });
  return files;
}

function walk(value: unknown, visitor: (value: unknown) => void) {
  visitor(value);
  if (Array.isArray(value)) {
    for (const item of value) walk(item, visitor);
    return;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value as Record<string, unknown>)) walk(item, visitor);
  }
}

function stringifyValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(stringifyValue).join(" ");
  if (value && typeof value === "object") return Object.values(value as Record<string, unknown>).map(stringifyValue).join(" ");
  return String(value || "");
}

function sampleText(text: string) {
  return text.replace(/\s+/g, " ").trim().slice(0, 180);
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readOptionalJson<T>(relativePath: string): T | null {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return null;
  return JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: Record<string, boolean | string>;
  items: RemediationItem[];
  manualRemediationRules: string[];
  metadataHitCounts: Record<string, number>;
  summary: Record<string, boolean | number>;
}) {
  const lines = [
    "# Mojibake Remediation Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "Read-only queue for likely garbled Chinese article metadata and body excerpts. It does not edit articles, mark review, publish, or claim traffic.",
    "",
    "## Summary",
    "",
    `- Files scanned: ${payload.summary.filesScanned}`,
    `- Affected files: ${payload.summary.affectedFiles}`,
    `- Affected draft files: ${payload.summary.affectedDraftFiles}`,
    `- Affected public files: ${payload.summary.affectedPublicFiles}`,
    `- Immediate approval affected: ${payload.summary.immediateApprovalAffected}`,
    `- Executive top affected: ${payload.summary.executiveTopAffected}`,
    `- Body excerpt hits: ${payload.summary.bodyExcerptHits}`,
    `- Publish confirm commands included: ${payload.summary.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${payload.summary.trafficDataAvailable}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    "",
    "## Field Counts",
    "",
    ...Object.entries(payload.metadataHitCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([field, count]) => `- ${field}: ${count}`),
    "",
    "## Manual Rules",
    "",
    ...payload.manualRemediationRules.map((rule) => `- ${rule}`),
    "",
    "## Top Remediation Queue",
    "",
    "| Priority | Status | Noindex | Immediate | Executive | Lanes | Fields | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.slice(0, 25).map((item) =>
      [
        item.priorityScore,
        item.status,
        item.noindex,
        item.queueSignals.inHumanApprovalImmediate,
        item.queueSignals.inExecutiveTop,
        item.queueSignals.lanes.join(", ") || "none",
        item.metadataHits.map((hit) => hit.field).concat(item.bodyHit ? ["bodyExcerpt"] : []).join(", "),
        item.file,
      ].join(" | "),
    ).map((row) => `| ${row} |`),
    "",
    "## Top Samples",
    "",
    ...payload.items.slice(0, 10).flatMap((item) => [
      `### ${item.file}`,
      "",
      `- Status/noindex: ${item.status}/${item.noindex}`,
      `- Preserve status: ${item.preserveStatus}`,
      `- Publish confirm: ${item.publishConfirm}`,
      `- Fields: ${item.metadataHits.map((hit) => hit.field).concat(item.bodyHit ? ["bodyExcerpt"] : []).join(", ")}`,
      `- Sample: ${[...item.metadataHits, ...(item.bodyHit ? [item.bodyHit] : [])][0]?.sample || ""}`,
      "",
    ]),
  ];

  return `${lines.join("\n")}\n`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

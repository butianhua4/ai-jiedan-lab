import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type PopularPromptLane = {
  audience: string;
  candidateFiles: string[];
  demandReason: string;
  laneId: string;
  matchTerms?: string[];
  promptTemplates: Array<{ title?: string; useCase?: string }>;
  publicMatches: number;
  readyForHumanReviewPrep: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  trafficClaim: string;
  unsafeReasons: string[];
};

type PopularPromptPlaybook = {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: PopularPromptLane[];
  summary: {
    items: number;
    itemsReadyForHumanReviewPrep: number;
    promptTemplates: number;
    publishConfirmCommandsIncluded: number;
    searchQueries: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type BridgeLane = {
  alreadyInApprovalQueue: string[];
  laneId: string;
  nextCandidates: Array<{ file: string; readyForHumanReviewPrep: boolean; unsafeReasons: string[] }>;
  readyNextCandidates: number;
};

type PopularPromptApprovalBridge = {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  lanes: BridgeLane[];
  summary: {
    bridgeItems: number;
    bridgeItemsReadyForHumanReviewPrep: number;
    lanes: number;
    lanesWithNextCandidates: number;
    lanesWithReadyNextCandidates: number;
    playbookItems: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    uniqueFiles: number;
  };
};

type SprintItem = {
  actionCount: number;
  alreadyQueuedFiles: string[];
  audience: string;
  candidateFiles: string[];
  demandReason: string;
  industryBucket: string;
  laneId: string;
  nextCandidateFiles: string[];
  promptTemplateSamples: string[];
  publicMatches: number;
  publishConfirm: "not-included";
  readyForPromptSprint: boolean;
  reviewActions: string[];
  searchQueries: string[];
  sourceTargets: string[];
  sprintPriorityScore: number;
  sprintWave: number;
  title: string;
  unsafeReasons: string[];
};

type SprintWave = {
  actionItems: number;
  candidateFiles: string[];
  highPriorityItems: number;
  industryBuckets: string[];
  items: number;
  readyItems: number;
  searchQueries: string[];
  unsafeItems: number;
  wave: number;
};

const ITEMS_PER_WAVE = 2;
const HIGH_PRIORITY_SCORE = 80;

function main() {
  const playbook = readJson<PopularPromptPlaybook>("content/automation/popular-ai-prompt-playbook.json");
  const bridge = readJson<PopularPromptApprovalBridge>("content/automation/popular-prompt-approval-bridge.json");
  const bridgeByLane = new Map(bridge.lanes.map((lane) => [lane.laneId, lane]));
  const items = playbook.items
    .map((lane) => toSprintItem(lane, bridgeByLane.get(lane.laneId)))
    .sort((a, b) => b.sprintPriorityScore - a.sprintPriorityScore || a.laneId.localeCompare(b.laneId))
    .map((item, index) => ({ ...item, sprintWave: Math.floor(index / ITEMS_PER_WAVE) + 1 }));
  const waves = buildWaves(items);
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only popular prompt sprint board. It groups broad industry AI prompt lanes into manual review waves without creating, editing, reviewing, or publishing articles.",
      stopBefore: "Stop before article creation, article edits, mark:review, and publish until a human approves the exact files and changes.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      approvalBridgeGeneratedAt: bridge.generatedAt,
      approvalBridgeSummary: bridge.summary,
      playbookGeneratedAt: playbook.generatedAt,
      playbookGuardrails: playbook.guardrails,
      playbookSummary: playbook.summary,
      trafficNote: "No keyword volume, ranking, impression, click, traffic, conversion, or revenue claim is made.",
    },
    summary: {
      actionItems: items.reduce((sum, item) => sum + item.actionCount, 0),
      bridgeItems: bridge.summary.bridgeItems,
      candidateFiles: new Set(items.flatMap((item) => item.candidateFiles)).size,
      highPriorityItems: items.filter((item) => item.sprintPriorityScore >= HIGH_PRIORITY_SCORE).length,
      industryBuckets: new Set(items.map((item) => item.industryBucket)).size,
      items: items.length,
      itemsPerWave: ITEMS_PER_WAVE,
      lanesReadyForPromptSprint: items.filter((item) => item.readyForPromptSprint).length,
      nextCandidateFiles: new Set(items.flatMap((item) => item.nextCandidateFiles)).size,
      playbookItems: playbook.summary.items,
      promptTemplateSamples: items.reduce((sum, item) => sum + item.promptTemplateSamples.length, 0),
      promptTemplates: playbook.summary.promptTemplates,
      publishConfirmCommandsIncluded: 0,
      searchQueries: new Set(items.flatMap((item) => item.searchQueries)).size,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
      waves: waves.length,
    },
    unsafeItems,
    waves,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "popular-prompt-sprint-board.json");
  const mdTarget = path.join(process.cwd(), "docs", "popular-prompt-sprint-board.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toSprintItem(lane: PopularPromptLane, bridgeLane?: BridgeLane): SprintItem {
  const alreadyQueuedFiles = bridgeLane?.alreadyInApprovalQueue || [];
  const nextCandidateFiles = bridgeLane?.nextCandidates.map((candidate) => candidate.file) || [];
  const promptTemplateSamples = lane.promptTemplates.map((template) => template.title || template.useCase || "").filter(Boolean).slice(0, 5);
  const unsafeReasons = unsafeReasonsFor(lane, bridgeLane);
  const reviewActions = reviewActionsFor(lane, bridgeLane);

  return {
    actionCount: reviewActions.length,
    alreadyQueuedFiles,
    audience: lane.audience,
    candidateFiles: lane.candidateFiles,
    demandReason: lane.demandReason,
    industryBucket: industryBucketFor(lane),
    laneId: lane.laneId,
    nextCandidateFiles,
    promptTemplateSamples,
    publicMatches: lane.publicMatches,
    publishConfirm: "not-included",
    readyForPromptSprint: unsafeReasons.length === 0,
    reviewActions,
    searchQueries: lane.searchQueries.slice(0, 14),
    sourceTargets: lane.sourceTargets.slice(0, 8),
    sprintPriorityScore: priorityScoreFor(lane, bridgeLane),
    sprintWave: 0,
    title: lane.title,
    unsafeReasons,
  };
}

function unsafeReasonsFor(lane: PopularPromptLane, bridgeLane?: BridgeLane) {
  const reasons = [...(lane.unsafeReasons || [])];
  if (!lane.readyForHumanReviewPrep) reasons.push("popular prompt lane is not ready for human review prep");
  if (lane.trafficClaim !== "not-included") reasons.push("popular prompt lane includes a traffic claim");
  if (!bridgeLane) reasons.push("popular prompt lane is missing approval bridge data");
  if (bridgeLane && bridgeLane.readyNextCandidates < 1 && bridgeLane.alreadyInApprovalQueue.length < 1) reasons.push("popular prompt lane has no queued or next candidate files");
  if (bridgeLane?.nextCandidates.some((candidate) => !candidate.readyForHumanReviewPrep || candidate.unsafeReasons.length > 0)) reasons.push("popular prompt lane has unsafe next candidates");
  if (lane.searchQueries.length < 5) reasons.push("popular prompt lane has too few search queries");
  if (lane.promptTemplates.length < 5) reasons.push("popular prompt lane has too few prompt templates");
  if (lane.sourceTargets.length < 3) reasons.push("popular prompt lane has too few source targets");
  return dedupe(reasons);
}

function reviewActionsFor(lane: PopularPromptLane, bridgeLane?: BridgeLane) {
  return dedupe([
    "Keep this as a manual review sprint; do not create or edit articles automatically.",
    "Use broad, common search phrasing from the lane queries before narrowing to tool-specific keywords.",
    "Map one article to one dominant user job so prompt examples do not cannibalize adjacent lanes.",
    "Verify every fast-changing model, product, platform, policy, pricing, API, and agent/memory claim against official sources.",
    "Add practical prompt inputs, output format, failure checks, and human-review boundaries.",
    "Do not claim traffic, ranking, conversion, revenue, or guaranteed productivity gains.",
    "Keep candidate drafts as draft/noindex/humanReviewRequired until explicit approval.",
    `Review next candidate files: ${(bridgeLane?.nextCandidates.map((candidate) => candidate.file) || []).slice(0, 3).join(", ") || "none"}.`,
    `Check source targets: ${lane.sourceTargets.slice(0, 3).join(", ") || "none"}.`,
  ]);
}

function priorityScoreFor(lane: PopularPromptLane, bridgeLane?: BridgeLane) {
  return (
    lane.searchQueries.length * 3 +
    lane.promptTemplates.length * 5 +
    lane.candidateFiles.length * 2 +
    (bridgeLane?.readyNextCandidates || 0) * 15 +
    (bridgeLane?.alreadyInApprovalQueue.length || 0) * 10 +
    (lane.publicMatches === 0 ? 20 : 0)
  );
}

function industryBucketFor(lane: PopularPromptLane) {
  const haystack = [lane.laneId, lane.title, ...(lane.matchTerms || []), ...lane.searchQueries].join(" ").toLowerCase();
  if (matches(haystack, ["office", "excel", "word", "ppt", "meeting", "email", "data"])) return "office-data";
  if (matches(haystack, ["video", "content", "copy", "marketing", "live", "social"])) return "content-marketing";
  if (matches(haystack, ["ecommerce", "customer", "sales", "faq", "service"])) return "commerce-service";
  if (matches(haystack, ["education", "student", "teacher", "learning"])) return "education";
  if (matches(haystack, ["agent", "memory", "rag", "deployment", "workflow"])) return "agent-deployment";
  return "general-work-prompts";
}

function buildWaves(items: SprintItem[]) {
  const waves: SprintWave[] = [];
  for (let index = 0; index < items.length; index += ITEMS_PER_WAVE) {
    const waveItems = items.slice(index, index + ITEMS_PER_WAVE);
    waves.push({
      actionItems: waveItems.reduce((sum, item) => sum + item.actionCount, 0),
      candidateFiles: dedupe(waveItems.flatMap((item) => [...item.nextCandidateFiles, ...item.alreadyQueuedFiles])).slice(0, 10),
      highPriorityItems: waveItems.filter((item) => item.sprintPriorityScore >= HIGH_PRIORITY_SCORE).length,
      industryBuckets: dedupe(waveItems.map((item) => item.industryBucket)),
      items: waveItems.length,
      readyItems: waveItems.filter((item) => item.readyForPromptSprint).length,
      searchQueries: dedupe(waveItems.flatMap((item) => item.searchQueries)).slice(0, 16),
      unsafeItems: waveItems.filter((item) => item.unsafeReasons.length > 0).length,
      wave: waves.length + 1,
    });
  }
  return waves;
}

function matches(value: string, terms: string[]) {
  return terms.some((term) => value.includes(term));
}

function dedupe(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: SprintItem[];
  summary: Record<string, boolean | number>;
  unsafeItems: SprintItem[];
  waves: SprintWave[];
}) {
  const lines = [
    "# Popular Prompt Sprint Board",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It groups broad industry AI prompt lanes into manual review waves without creating, editing, reviewing, or publishing articles.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.laneId}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Waves",
    "",
    "| Wave | Ready | High priority | Actions | Buckets | Candidate files | Search queries |",
    "| ---: | ---: | ---: | ---: | --- | --- | --- |",
    ...payload.waves.map(
      (wave) =>
        `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.highPriorityItems} | ${wave.actionItems} | ${wave.industryBuckets.join(", ")} | ${wave.candidateFiles.join("<br>") || "none"} | ${wave.searchQueries.slice(0, 6).join("<br>") || "none"} |`,
    ),
    "",
    "## Sprint Items",
    "",
    "| Wave | Ready | Score | Bucket | Public matches | Actions | Search queries | Next files | Title |",
    "| ---: | --- | ---: | --- | ---: | ---: | ---: | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForPromptSprint} | ${item.sprintPriorityScore} | ${item.industryBucket} | ${item.publicMatches} | ${item.actionCount} | ${item.searchQueries.length} | ${item.nextCandidateFiles.slice(0, 3).join("<br>") || item.alreadyQueuedFiles.slice(0, 3).join("<br>") || "none"} | ${item.title} |`,
    ),
    "",
    "## Lane Actions",
    "",
  ];

  for (const item of payload.items) {
    lines.push(`### ${item.title}`);
    lines.push("");
    lines.push(`- Lane: ${item.laneId}`);
    lines.push(`- Wave: ${item.sprintWave}`);
    lines.push(`- Industry bucket: ${item.industryBucket}`);
    lines.push(`- Ready for prompt sprint: ${item.readyForPromptSprint}`);
    lines.push(`- Publish confirm: ${item.publishConfirm}`);
    lines.push(`- Audience: ${item.audience}`);
    lines.push(`- Demand reason: ${item.demandReason}`);
    lines.push("");
    lines.push("Review actions:");
    lines.push(...item.reviewActions.map((action) => `- ${action}`));
    lines.push("");
    lines.push("Search queries:");
    lines.push(...item.searchQueries.slice(0, 12).map((query) => `- ${query}`));
    lines.push("");
    lines.push("Prompt template samples:");
    lines.push(...(item.promptTemplateSamples.length ? item.promptTemplateSamples.map((sample) => `- ${sample}`) : ["- none"]));
    lines.push("");
    lines.push("Source targets:");
    lines.push(...item.sourceTargets.map((source) => `- ${source}`));
    lines.push("");
  }

  while (lines[lines.length - 1] === "") lines.pop();
  return `${lines.join("\n")}\n`;
}

main();

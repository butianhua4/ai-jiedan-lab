import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type ApprovalItem = {
  file: string;
  laneId: string;
  lanePriorityScore: number;
  laneTitle: string;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  readyForHumanReview: boolean;
  riskChecks: string[];
  safeDraft: boolean;
  sourceTargets: string[];
  title: string;
};

type SearchIntentApproval = {
  currentWaveItems: ApprovalItem[];
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  nextGapItems: ApprovalItem[];
  summary: {
    currentWaveItems: number;
    currentWaveReady: number;
    nextGapItems: number;
    nextGapLanes: number;
    unsafeItems: number;
    wave: number;
  };
};

type LaneCandidate = {
  currentPack: boolean;
  expansionQueue: boolean;
  file: string;
  noindex: boolean | null;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  safeDraft: boolean;
  status: string;
  title: string;
  wave1: boolean;
};

type Lane = {
  id: string;
  intentSeeds: string[];
  matchedCandidates: LaneCandidate[];
  priorityScore: number;
  publicCount: number;
  readyDraftCount: number;
  reviewFocus: string[];
  sourceTargets: string[];
  title: string;
  workflowAngles: string[];
};

type SearchIntentLaneMap = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  lanes: Lane[];
  summary: {
    lanes: number;
    lanesWithReadyDrafts: number;
    totalReadyDraftMatches: number;
  };
};

type WaveItem = ApprovalItem & {
  intentSeeds: string[];
  reviewFocus: string[];
  wave: number;
  workflowAngles: string[];
};

type Wave = {
  files: string[];
  focus: string;
  items: WaveItem[];
  laneCount: number;
  lanes: string[];
  readyItems: number;
  riskChecks: string[];
  sourceTargetCount: number;
  wave: number;
};

const maxWaves = 4;
const itemsPerWave = 3;

function main() {
  const approval = readJson<SearchIntentApproval>("content/automation/search-intent-approval-packet.json");
  const laneMap = readJson<SearchIntentLaneMap>("content/automation/search-intent-lane-map.json");
  const selected = new Set<string>();
  const selectedLaneIds = new Set<string>();
  const waves: Wave[] = [];

  waves.push(buildWave(approval.summary.wave, "Current human approval packet", approval.currentWaveItems, laneMap));
  for (const item of approval.currentWaveItems) {
    selected.add(normalizeFile(item.file));
    selectedLaneIds.add(item.laneId);
  }

  const nextItems = approval.nextGapItems.filter((item) => !selected.has(normalizeFile(item.file)));
  for (const item of nextItems) {
    selected.add(normalizeFile(item.file));
    selectedLaneIds.add(item.laneId);
  }

  for (let wave = approval.summary.wave + 1; wave <= maxWaves; wave += 1) {
    const carry = nextItems.splice(0, itemsPerWave);
    const fill = collectLaneFill(laneMap, selected, selectedLaneIds, itemsPerWave - carry.length);
    const items = [...carry, ...fill];
    for (const item of fill) {
      selected.add(normalizeFile(item.file));
      selectedLaneIds.add(item.laneId);
    }
    waves.push(buildWave(wave, focusForWave(items), items, laneMap));
  }

  const unsafeItems = waves.flatMap((wave) => wave.items).filter((item) => !item.readyForHumanReview || !item.safeDraft);
  const uniqueFiles = new Set(waves.flatMap((wave) => wave.files.map(normalizeFile)));
  const uniqueLanes = new Set(waves.flatMap((wave) => wave.items.map((item) => item.laneId)));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only continuous wave planner for human review. It does not modify article status, noindex, review, or publishing state.",
      stopBefore: "Each wave still requires explicit human approval before mark:review --confirm-human or publish:articles --confirm.",
    },
    summary: {
      plannedWaves: waves.length,
      itemsPerWave,
      plannedItems: waves.reduce((total, wave) => total + wave.items.length, 0),
      readyItems: waves.reduce((total, wave) => total + wave.readyItems, 0),
      uniqueFiles: uniqueFiles.size,
      uniqueLanes: uniqueLanes.size,
      unsafeItems: unsafeItems.length,
      sourceLaneMapItems: laneMap.summary.totalReadyDraftMatches,
      sourceApprovalNextGapItems: approval.summary.nextGapItems,
    },
    sourceEvidence: {
      laneMapGuardrails: laneMap.guardrails,
      approvalGuardrails: approval.guardrails,
      note: "The planner uses editorial lane priorities and safe draft evidence only. It does not claim measured keyword volume, impressions, clicks, or traffic.",
    },
    waves,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-intent-wave-planner.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-intent-wave-planner.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && waves.length >= 4 && uniqueLanes.size >= 4, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || waves.length < 4 || uniqueLanes.size < 4) process.exitCode = 1;
}

function collectLaneFill(laneMap: SearchIntentLaneMap, selected: Set<string>, selectedLaneIds: Set<string>, limit: number) {
  if (limit <= 0) return [];
  const items: ApprovalItem[] = [];
  const lanes = [...laneMap.lanes]
    .filter((lane) => lane.readyDraftCount > 0)
    .sort((a, b) => (
      Number(selectedLaneIds.has(a.id)) - Number(selectedLaneIds.has(b.id)) ||
      Number(a.publicCount > 0) - Number(b.publicCount > 0) ||
      b.priorityScore - a.priorityScore
    ));

  for (const lane of lanes) {
    const candidate = lane.matchedCandidates.find((item) => item.safeDraft && !selected.has(normalizeFile(item.file)));
    if (!candidate) continue;
    items.push(toApprovalItem(candidate, lane));
    selected.add(normalizeFile(candidate.file));
    if (items.length >= limit) break;
  }

  return items;
}

function buildWave(waveNumber: number, focus: string, rawItems: ApprovalItem[], laneMap: SearchIntentLaneMap): Wave {
  const items = rawItems.slice(0, itemsPerWave).map((item) => {
    const lane = laneMap.lanes.find((candidate) => candidate.id === item.laneId);
    return {
      ...item,
      intentSeeds: lane?.intentSeeds || [],
      reviewFocus: lane?.reviewFocus || [],
      wave: waveNumber,
      workflowAngles: lane?.workflowAngles || [],
    };
  });
  const lanes = [...new Set(items.map((item) => item.laneTitle))];
  const riskChecks = [...new Set(items.flatMap((item) => item.riskChecks))];
  const sourceTargetCount = new Set(items.flatMap((item) => item.sourceTargets)).size;

  return {
    files: items.map((item) => item.file),
    focus,
    items,
    laneCount: lanes.length,
    lanes,
    readyItems: items.filter((item) => item.readyForHumanReview).length,
    riskChecks,
    sourceTargetCount,
    wave: waveNumber,
  };
}

function toApprovalItem(candidate: LaneCandidate, lane: Lane): ApprovalItem {
  return {
    file: candidate.file,
    laneId: lane.id,
    lanePriorityScore: lane.priorityScore,
    laneTitle: lane.title,
    primaryKeyword: candidate.primaryKeyword,
    publishBatch: candidate.publishBatch,
    qualityScore: candidate.qualityScore,
    readyForHumanReview: candidate.safeDraft && lane.sourceTargets.length >= 2 && lane.reviewFocus.length >= 3,
    riskChecks: riskChecksForLane(lane.id),
    safeDraft: candidate.safeDraft && candidate.status === "draft" && candidate.noindex === true,
    sourceTargets: lane.sourceTargets,
    title: candidate.title,
  };
}

function focusForWave(items: ApprovalItem[]) {
  const lanes = [...new Set(items.map((item) => item.laneTitle))];
  return lanes.length === 1 ? lanes[0] : lanes.slice(0, 3).join(" + ");
}

function riskChecksForLane(laneId: string) {
  const common = [
    "No measured traffic, ranking, income, approval, or client acquisition claim is made without evidence.",
    "No API key, private customer data, credential, or bypass instruction is included.",
    "Fast-changing model names, quotas, pricing, limits, and platform features are checked against official docs.",
  ];
  const laneSpecific: Record<string, string[]> = {
    "agent-deployment-tools": ["Agent permissions, tool allowlists, human approval, logs, and rollback boundaries are explicit."],
    "rag-knowledge-memory": ["Retrieval quality, citations, memory retention, privacy, and hallucination risks are explicit."],
    "llm-deployment-serving": ["GPU, memory, serving, concurrency, cold-start, and cost tradeoffs are framed as checks, not guarantees."],
    "local-open-models": ["Local deployment privacy and cost claims are qualified and hardware assumptions are visible."],
    "nocode-ai-automation": ["Webhook auth, connector permissions, retries, manual fallback, and platform policy boundaries are explicit."],
    "industry-prompt-library": ["Prompt templates include input context, output criteria, human review rules, and adaptation notes."],
    "business-ai-workflows": ["Department workflows identify approval owner, sensitive decisions, and human handoff points."],
  };

  return [...common, ...(laneSpecific[laneId] || ["Article-specific operational and safety boundaries are explicit."])];
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
  waves: Wave[];
}) {
  const lines = [
    "# Search Intent Wave Planner",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It expands the current approval packet into a continuous human-review wave queue across broad AI search-intent lanes.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    `- Note: ${payload.sourceEvidence.note}`,
    `- Lane map guardrails: ${JSON.stringify(payload.sourceEvidence.laneMapGuardrails)}`,
    `- Approval guardrails: ${JSON.stringify(payload.sourceEvidence.approvalGuardrails)}`,
    "",
  ];

  for (const wave of payload.waves) {
    lines.push(
      `## Wave ${wave.wave}: ${wave.focus}`,
      "",
      `- Items: ${wave.items.length}`,
      `- Ready items: ${wave.readyItems}`,
      `- Lanes: ${wave.laneCount}`,
      `- Unique source targets: ${wave.sourceTargetCount}`,
      "",
      "| Ready | Safe draft | Lane score | Quality | Batch | Lane | Primary keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
      ...wave.items.map((item) => (
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.lanePriorityScore} | ${item.qualityScore} | ${item.publishBatch ?? ""} | ${item.laneTitle} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
      )),
      "",
      "Review focus:",
      "",
      ...[...new Set(wave.items.flatMap((item) => item.reviewFocus))].map((item) => `- ${item}`),
      "",
      "Source targets:",
      "",
      ...[...new Set(wave.items.flatMap((item) => item.sourceTargets))].map((item) => `- ${item}`),
      "",
      "Risk checks:",
      "",
      ...wave.riskChecks.map((item) => `- ${item}`),
      "",
    );
  }

  return lines.join("\n");
}

main();

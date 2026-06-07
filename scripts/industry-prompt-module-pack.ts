import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type ReviewCandidate = {
  file: string;
  readyForHumanReview?: boolean;
  safeDraft?: boolean;
  title: string;
};

type OpportunityItem = {
  audience: string;
  deliverable: string;
  existingReviewCandidates: ReviewCandidate[];
  humanBoundary: string;
  lane: string;
  outputBlocks: string[];
  primaryQuery: string;
  priorityScore: number;
  promptModules: string[];
  publicMatches: number;
  recommendedAction: string;
  riskControls: string[];
  searchQueryFamilies: number;
  sourceTargets: string[];
  supportingQueries: string[];
  unsafeReasons: string[];
  userInputFields: string[];
};

type OpportunityBoard = {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  items: OpportunityItem[];
  sourceEvidence: {
    marketSignalSources: Array<{ note: string; source: string }>;
    officialPromptSources: string[];
    searchDate: string;
    searchNote: string;
  };
  summary: {
    opportunities: number;
    promptModules: number;
    unsafeItems: number;
  };
};

type PromptReviewPack = {
  items: ReviewCandidate[];
  summary: {
    items: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
};

type PromptBlueprint = {
  copyPrompt: string;
  inputFields: string[];
  module: string;
  outputBlocks: string[];
  qualityChecklist: string[];
  riskControls: string[];
  title: string;
};

type ModulePackItem = OpportunityItem & {
  manualReviewActions: string[];
  promptBlueprints: PromptBlueprint[];
  readyForHumanReviewPrep: boolean;
  reviewCandidateFiles: string[];
  safeReviewPackBridge: boolean;
};

function main() {
  const board = readJson<OpportunityBoard>("content/automation/industry-prompt-opportunity-board.json");
  const reviewPack = readJson<PromptReviewPack>("content/automation/industry-prompt-review-pack.json");
  const safeReviewFiles = new Set(reviewPack.items.filter((item) => item.safeDraft && item.readyForHumanReview).map((item) => item.file));
  const items = board.items
    .map((item) => toModulePackItem(item, safeReviewFiles))
    .sort((a, b) => b.priorityScore - a.priorityScore || a.lane.localeCompare(b.lane));
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const moduleBlueprints = items.reduce((sum, item) => sum + item.promptBlueprints.length, 0);
  const modulesPerOpportunity = items.map((item) => item.promptBlueprints.length);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only prompt module pack. It deepens cross-industry AI prompt opportunities into reusable prompt blueprints without editing, reviewing, or publishing articles.",
      stopBefore: "Stop before mark:review and stop before publish. Human approval is required for every article.",
      trafficClaim: "No measured traffic, impressions, rankings, clicks, revenue, or conversion outcomes are claimed.",
    },
    sourceEvidence: {
      marketSignalSources: board.sourceEvidence.marketSignalSources,
      officialPromptSources: board.sourceEvidence.officialPromptSources,
      opportunityBoardGeneratedAt: board.generatedAt,
      reviewPackItems: reviewPack.summary.items,
      reviewPackSafeDraftItems: reviewPack.summary.safeDraftItems,
      searchDate: board.sourceEvidence.searchDate,
      searchNote: board.sourceEvidence.searchNote,
    },
    summary: {
      humanGatedItems: items.length,
      items: items.length,
      itemsWithCopyPrompts: items.filter((item) => item.promptBlueprints.every((prompt) => prompt.copyPrompt.length > 300)).length,
      itemsWithInputOutputStructure: items.filter((item) => item.promptBlueprints.every((prompt) => prompt.inputFields.length >= 5 && prompt.outputBlocks.length >= 5)).length,
      itemsWithReviewPackCandidate: items.filter((item) => item.safeReviewPackBridge).length,
      itemsWithRiskControls: items.filter((item) => item.promptBlueprints.every((prompt) => prompt.riskControls.length >= 4)).length,
      itemsWithSourceTargets: items.filter((item) => item.sourceTargets.length >= 5).length,
      modulesPerOpportunityMax: Math.max(...modulesPerOpportunity),
      modulesPerOpportunityMin: Math.min(...modulesPerOpportunity),
      promptBlueprints: moduleBlueprints,
      sourceOpportunityModules: board.summary.promptModules,
      sourceOpportunityUnsafeItems: board.summary.unsafeItems,
      sourceReviewPackUnsafeItems: reviewPack.summary.unsafeItems,
      unsafeItems: unsafeItems.length,
      zeroPublicCoverageItems: items.filter((item) => item.publicMatches === 0).length,
    },
    unsafeItems,
    topItems: items.slice(0, 8),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "industry-prompt-module-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "industry-prompt-module-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toModulePackItem(item: OpportunityItem, safeReviewFiles: Set<string>): ModulePackItem {
  const reviewCandidateFiles = item.existingReviewCandidates.map((candidate) => candidate.file);
  const safeReviewPackBridge = reviewCandidateFiles.some((file) => safeReviewFiles.has(file));
  const promptBlueprints = item.promptModules.map((moduleName, index) => toPromptBlueprint(item, moduleName, index));
  const unsafeReasons = [
    ...item.unsafeReasons,
    ...(item.sourceTargets.length < 5 ? ["Missing enough official prompt source targets."] : []),
    ...(item.supportingQueries.length < 4 ? ["Missing enough broad supporting search queries."] : []),
    ...(promptBlueprints.length < 5 ? ["Missing five prompt blueprints for this lane."] : []),
  ];

  return {
    ...item,
    manualReviewActions: [
      "Use the prompt blueprints as article expansion material only during human review.",
      "If no review candidate exists, keep this as a future draft idea and do not create an article automatically.",
      "Confirm every example requires user-provided facts and marks unknowns instead of inventing data.",
      "Keep the article draft/noindex/humanReviewRequired until explicit approval.",
      "Stop before mark:review; publishing requires a separate explicit approval.",
    ],
    promptBlueprints,
    readyForHumanReviewPrep: unsafeReasons.length === 0,
    reviewCandidateFiles,
    safeReviewPackBridge,
    unsafeReasons,
  };
}

function toPromptBlueprint(item: OpportunityItem, moduleName: string, index: number): PromptBlueprint {
  const title = `${item.primaryQuery} - ${moduleName}`;
  const outputBlocks = item.outputBlocks.slice(0, 5);
  const inputFields = item.userInputFields.slice(0, 6);
  const riskControls = item.riskControls.slice(0, 5);
  const qualityChecklist = [
    "Uses only the provided input facts and labels missing information.",
    "Returns the requested output blocks in a scannable structure.",
    "Includes assumptions, risks, and human escalation points.",
    "Avoids guaranteed revenue, ranking, legal, medical, hiring, or conversion claims.",
    "Can be copied into an article as an example only after human review.",
  ];

  return {
    copyPrompt: [
      `You are assisting with ${moduleName} for ${item.audience}.`,
      "Use only the facts supplied below. If a fact is missing, write UNKNOWN and ask a follow-up question.",
      `Primary search intent: ${item.primaryQuery}.`,
      `Business context: {{${inputFields.join("}}, {{")}}}.`,
      `Return these sections: ${outputBlocks.join(", ")}.`,
      `Quality rules: ${qualityChecklist.slice(0, 4).join(" ")}`,
      `Human boundary: ${riskControls.join(" ")}`,
      `Module order: ${index + 1} of ${item.promptModules.length}.`,
    ].join("\n"),
    inputFields,
    module: moduleName,
    outputBlocks,
    qualityChecklist,
    riskControls,
    title,
  };
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
    stopBefore: string;
    trafficClaim: string;
  };
  items: ModulePackItem[];
  sourceEvidence: {
    marketSignalSources: Array<{ note: string; source: string }>;
    officialPromptSources: string[];
    searchDate: string;
    searchNote: string;
  };
  summary: Record<string, number>;
  topItems: ModulePackItem[];
  unsafeItems: ModulePackItem[];
}) {
  const lines = [
    "# Industry Prompt Module Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns cross-industry AI prompt opportunities into reusable prompt blueprints for human article review.",
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
    "## Source Evidence",
    "",
    `- Search date: ${payload.sourceEvidence.searchDate}`,
    `- Search note: ${payload.sourceEvidence.searchNote}`,
    "",
    "Official prompt sources:",
    "",
    ...payload.sourceEvidence.officialPromptSources.map((source) => `- ${source}`),
    "",
    "Market signal sources:",
    "",
    ...payload.sourceEvidence.marketSignalSources.map((source) => `- ${source.source}: ${source.note}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Top Items",
    "",
    ...itemTable(payload.topItems),
    "",
    "## Prompt Blueprint Samples",
    "",
    ...payload.topItems.flatMap((item) => itemSection(item)),
    "",
  ];

  return lines.join("\n");
}

function itemTable(items: ModulePackItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe bridge | Score | Public | Modules | Queries | Lane | Primary query | Candidate files |",
    "| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReviewPrep} | ${item.safeReviewPackBridge} | ${item.priorityScore} | ${item.publicMatches} | ${item.promptBlueprints.length} | ${item.supportingQueries.length} | ${item.lane} | ${item.primaryQuery} | ${item.reviewCandidateFiles.join("<br>")} |`,
    ),
  ];
}

function itemSection(item: ModulePackItem) {
  return [
    `### ${item.primaryQuery}`,
    "",
    `- Lane: ${item.lane}`,
    `- Audience: ${item.audience}`,
    `- Deliverable: ${item.deliverable}`,
    `- Review candidates: ${item.reviewCandidateFiles.join(", ") || "none"}`,
    `- Human boundary: ${item.humanBoundary}`,
    "",
    "Manual review actions:",
    "",
    ...item.manualReviewActions.map((action) => `- ${action}`),
    "",
    ...item.promptBlueprints.slice(0, 2).flatMap((prompt) => promptSection(prompt)),
  ];
}

function promptSection(prompt: PromptBlueprint) {
  return [
    `#### ${prompt.title}`,
    "",
    "Input fields:",
    "",
    ...prompt.inputFields.map((field) => `- ${field}`),
    "",
    "Output blocks:",
    "",
    ...prompt.outputBlocks.map((block) => `- ${block}`),
    "",
    "Copy prompt:",
    "",
    "```text",
    prompt.copyPrompt,
    "```",
    "",
  ];
}

main();

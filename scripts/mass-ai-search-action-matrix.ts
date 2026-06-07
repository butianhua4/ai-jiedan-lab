import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type BroadThemeCandidate = {
  file: string;
  primaryKeyword?: string;
  publishBatch?: number;
  qualityScore?: number;
  searchIntent?: string;
  title: string;
};

type BroadTheme = {
  candidateDrafts?: BroadThemeCandidate[];
  gapScore: number;
  id: string;
  missingSubtopics?: string[];
  plannedWaveMatches?: number;
  publicMatches: number;
  readyDrafts: number;
  reviewFocus: string[];
  reviewPackMatches?: number;
  searchSeeds: string[];
  sourceTargets: string[];
  title: string;
};

type BroadSearchDemand = {
  generatedAt: string;
  guardrails: {
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
  };
  sourceEvidence: {
    officialSources: string[];
  };
  summary: {
    themes: number;
    themesWithReadyDrafts: number;
    themesWithoutPublicCoverage: number;
    totalReadyDraftMatches: number;
    uniqueCandidateFiles: number;
  };
  topThemes: BroadTheme[];
};

type DeploymentReviewItem = {
  category: string;
  commandBoundary: CommandBoundary;
  file: string;
  priorityScore: number;
  publicMatches: number;
  readyForHumanReview: boolean;
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  topic: string;
};

type DeploymentReviewPack = {
  generatedAt: string;
  nextItems: DeploymentReviewItem[];
  summary: {
    items: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
};

type PromptBlueprint = {
  copyPrompt?: string;
  inputFields?: string[];
  module: string;
  outputBlocks?: string[];
  qualityChecklist?: string[];
  riskControls?: string[];
  title: string;
};

type PromptModuleItem = {
  deliverable: string;
  lane: string;
  primaryQuery: string;
  priorityScore: number;
  promptBlueprints: PromptBlueprint[];
  publicMatches: number;
  readyForHumanReviewPrep: boolean;
  reviewCandidateFiles: string[];
  safeReviewPackBridge: boolean;
  sourceTargets: string[];
  supportingQueries: string[];
  unsafeReasons: string[];
};

type IndustryPromptModulePack = {
  generatedAt: string;
  items: PromptModuleItem[];
  summary: {
    items: number;
    promptBlueprints: number;
    unsafeItems: number;
    zeroPublicCoverageItems: number;
  };
};

type MatrixItem = {
  articleSignals: Array<{
    file: string;
    humanReviewRequired: boolean;
    noindex: boolean;
    qualityScore: number;
    sourceNotes: boolean;
    status: string;
  }>;
  bridgeSources: string[];
  candidateFiles: string[];
  commandBoundaries: CommandBoundary[];
  deploymentMatches: number;
  editorialWave: number;
  humanReviewActions: string[];
  lane: string;
  massSearchIntent: string;
  missingSubtopics: string[];
  promptBlueprintSamples: Array<{
    module: string;
    title: string;
  }>;
  promptModuleMatches: number;
  publicMatches: number;
  readyCandidateFiles: number;
  readyForHumanReviewPrep: boolean;
  reviewFocus: string[];
  searchSeeds: string[];
  sourceTargets: string[];
  themeId: string;
  themeTitle: string;
  trafficClaim: "not-included";
  unsafeReasons: string[];
};

function main() {
  const broad = readJson<BroadSearchDemand>("content/automation/broad-search-demand-map.json");
  const deployment = readJson<DeploymentReviewPack>("content/automation/ai-deployment-review-pack.json");
  const promptModules = readJson<IndustryPromptModulePack>("content/automation/industry-prompt-module-pack.json");

  const deploymentByFile = new Map(deployment.nextItems.map((item) => [item.file, item]));
  const promptModulesByCandidateFile = buildPromptModuleIndex(promptModules.items);

  const items = broad.topThemes.map((theme, index) =>
    toMatrixItem(theme, index, deploymentByFile, promptModulesByCandidateFile),
  );
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const uniqueCandidateFiles = new Set(items.flatMap((item) => item.candidateFiles));
  const totalCommandBoundaries = items.reduce((sum, item) => sum + item.commandBoundaries.length, 0);
  const totalPromptBlueprintSamples = items.reduce((sum, item) => sum + item.promptBlueprintSamples.length, 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only mass AI search action matrix. It turns broad AI search themes into human-review waves, candidate files, source checks, and prompt/deployment bridges without editing articles.",
      stopBefore: "Stop before mark:review and publish. Human approval is required for every file.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      broadSearchDemandGeneratedAt: broad.generatedAt,
      broadSearchDemandGuardrails: broad.guardrails,
      broadSearchDemandSummary: broad.summary,
      deploymentReviewGeneratedAt: deployment.generatedAt,
      deploymentReviewSummary: deployment.summary,
      industryPromptModuleGeneratedAt: promptModules.generatedAt,
      industryPromptModuleSummary: promptModules.summary,
      officialSourceSignals: broad.sourceEvidence.officialSources,
      trafficNote:
        "Search seeds and gap scores are editorial planning signals only; this matrix does not claim keyword volume, rankings, impressions, clicks, traffic, or revenue.",
    },
    summary: {
      commandBoundaries: totalCommandBoundaries,
      deploymentBridgedThemes: items.filter((item) => item.deploymentMatches > 0).length,
      humanGatedItems: items.length,
      items: items.length,
      itemsReadyForHumanReviewPrep: items.filter((item) => item.readyForHumanReviewPrep).length,
      itemsWithCandidateFiles: items.filter((item) => item.candidateFiles.length > 0).length,
      itemsWithHumanReviewActions: items.filter((item) => item.humanReviewActions.length >= 6).length,
      itemsWithSearchSeeds: items.filter((item) => item.searchSeeds.length >= 4).length,
      itemsWithSourceTargets: items.filter((item) => item.sourceTargets.length > 0).length,
      promptBlueprintSamples: totalPromptBlueprintSamples,
      promptBridgedThemes: items.filter((item) => item.promptModuleMatches > 0).length,
      sourceBroadThemes: broad.summary.themes,
      sourceTopThemes: broad.topThemes.length,
      themesWithoutPublicCoverage: items.filter((item) => item.publicMatches === 0).length,
      trafficDataAvailable: false,
      uniqueCandidateFiles: uniqueCandidateFiles.size,
      unsafeItems: unsafeItems.length,
      waves: new Set(items.map((item) => item.editorialWave)).size,
    },
    unsafeItems,
    topItems: items.slice(0, 8),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "mass-ai-search-action-matrix.json");
  const mdTarget = path.join(process.cwd(), "docs", "mass-ai-search-action-matrix.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function buildPromptModuleIndex(items: PromptModuleItem[]) {
  const index = new Map<string, PromptModuleItem[]>();
  for (const item of items) {
    for (const file of item.reviewCandidateFiles || []) {
      const current = index.get(file) || [];
      current.push(item);
      index.set(file, current);
    }
  }
  return index;
}

function toMatrixItem(
  theme: BroadTheme,
  index: number,
  deploymentByFile: Map<string, DeploymentReviewItem>,
  promptModulesByCandidateFile: Map<string, PromptModuleItem[]>,
): MatrixItem {
  const candidates = (theme.candidateDrafts || []).slice(0, 8);
  const candidateFiles = dedupe(candidates.map((candidate) => candidate.file));
  const deploymentItems = candidateFiles.map((file) => deploymentByFile.get(file)).filter((item): item is DeploymentReviewItem => Boolean(item));
  const promptItems = dedupeObjects(candidateFiles.flatMap((file) => promptModulesByCandidateFile.get(file) || []), (item) => item.lane);
  const articleSignals = candidateFiles.slice(0, 6).map(toArticleSignal);
  const commandBoundaries = dedupeCommandBoundaries(deploymentItems.map((item) => item.commandBoundary));
  const promptBlueprintSamples = promptItems
    .flatMap((item) => item.promptBlueprints.slice(0, 2))
    .slice(0, 6)
    .map((blueprint) => ({ module: blueprint.module, title: blueprint.title }));
  const sourceTargets = dedupe([
    ...theme.sourceTargets,
    ...deploymentItems.flatMap((item) => item.sourceTargets || []),
    ...promptItems.flatMap((item) => item.sourceTargets || []),
  ]);
  const searchSeeds = dedupe([
    ...theme.searchSeeds,
    ...deploymentItems.flatMap((item) => item.searchQueries || []),
    ...promptItems.flatMap((item) => item.supportingQueries || []),
    ...promptItems.map((item) => item.primaryQuery),
  ]).slice(0, 14);
  const reviewFocus = dedupe([
    ...theme.reviewFocus,
    ...deploymentItems.map((item) => `Deployment review: ${item.topic}.`),
    ...promptItems.map((item) => `Prompt module review: ${item.deliverable}.`),
  ]).slice(0, 12);
  const humanReviewActions = buildHumanReviewActions(theme, deploymentItems, promptItems, sourceTargets, searchSeeds);
  const unsafeReasons = unsafeReasonsFor({
    articleSignals,
    candidateFiles,
    commandBoundaries,
    humanReviewActions,
    reviewFocus,
    searchSeeds,
    sourceTargets,
  });

  return {
    articleSignals,
    bridgeSources: [
      "content/automation/broad-search-demand-map.json",
      ...(deploymentItems.length ? ["content/automation/ai-deployment-review-pack.json"] : []),
      ...(promptItems.length ? ["content/automation/industry-prompt-module-pack.json"] : []),
    ],
    candidateFiles,
    commandBoundaries,
    deploymentMatches: deploymentItems.length,
    editorialWave: Math.floor(index / 3) + 1,
    humanReviewActions,
    lane: classifyLane(theme),
    massSearchIntent: intentFor(theme),
    missingSubtopics: theme.missingSubtopics || [],
    promptBlueprintSamples,
    promptModuleMatches: promptItems.length,
    publicMatches: theme.publicMatches,
    readyCandidateFiles: candidateFiles.length,
    readyForHumanReviewPrep: unsafeReasons.length === 0,
    reviewFocus,
    searchSeeds,
    sourceTargets,
    themeId: theme.id,
    themeTitle: theme.title,
    trafficClaim: "not-included",
    unsafeReasons,
  };
}

function toArticleSignal(file: string) {
  const article = readArticle(file);
  const result = checkFile(file);
  return {
    file,
    humanReviewRequired: article.data.humanReviewRequired === true,
    noindex: article.data.noindex === true,
    qualityScore: result.qualityScore,
    sourceNotes: Boolean(article.data.sourceNotes),
    status: String(article.data.status || ""),
  };
}

function buildHumanReviewActions(theme: BroadTheme, deploymentItems: DeploymentReviewItem[], promptItems: PromptModuleItem[], sourceTargets: string[], searchSeeds: string[]) {
  return dedupe([
    "Confirm every candidate is still draft, noindex, and humanReviewRequired before any approval action.",
    "Verify current official docs before approving model names, APIs, SDKs, deployment commands, memory/RAG behavior, and tool permissions.",
    "Check the article answers a broad search intent directly, not only a narrow implementation note.",
    "Remove or rewrite unsupported claims about traffic, ranking, revenue, benchmark, latency, cost, reliability, legal outcomes, medical outcomes, hiring outcomes, or conversion.",
    "Confirm human approval, audit logs, rollback, privacy, and escalation boundaries are explicit where the topic touches agents, tools, customer data, or business operations.",
    "Only after explicit human approval, run mark:review manually for a specific file. Publishing remains a separate explicit approval step.",
    ...theme.reviewFocus.map((item) => `Apply theme review focus: ${item}.`),
    ...deploymentItems.slice(0, 3).map((item) => `Use deployment review candidate: ${item.file}.`),
    ...promptItems.slice(0, 3).map((item) => `Use prompt module lane as expansion material: ${item.lane}.`),
    ...sourceTargets.slice(0, 5).map((target) => `Open source target for manual fact review: ${target}.`),
    ...searchSeeds.slice(0, 5).map((query) => `Confirm the draft answers search seed: ${query}.`),
  ]);
}

function unsafeReasonsFor(item: {
  articleSignals: Array<{ humanReviewRequired: boolean; noindex: boolean; qualityScore: number; sourceNotes: boolean; status: string }>;
  candidateFiles: string[];
  commandBoundaries: CommandBoundary[];
  humanReviewActions: string[];
  reviewFocus: string[];
  searchSeeds: string[];
  sourceTargets: string[];
}) {
  const reasons: string[] = [];
  if (item.candidateFiles.length === 0) reasons.push("no candidate files attached");
  if (item.searchSeeds.length < 4) reasons.push("not enough broad search seeds");
  if (item.sourceTargets.length === 0) reasons.push("missing source targets");
  if (item.reviewFocus.length < 3) reasons.push("missing review focus");
  if (item.humanReviewActions.length < 6) reasons.push("missing human review actions");
  if (!item.articleSignals.every((signal) => signal.status === "draft" && signal.noindex && signal.humanReviewRequired && signal.sourceNotes && signal.qualityScore >= 100)) {
    reasons.push("one or more candidate article signals are not safe draft/noindex/humanReviewRequired/source-backed/quality>=100");
  }
  if (!item.commandBoundaries.every(isSafeCommandBoundary)) reasons.push("unsafe command boundary");
  return reasons;
}

function isSafeCommandBoundary(command: CommandBoundary) {
  return command.markReviewAfterHumanApproval.includes("--confirm-human") && !command.publishDryRunAfterReview.includes("--confirm") && command.publishConfirm === "not-included";
}

function dedupeCommandBoundaries(commands: CommandBoundary[]) {
  return dedupeObjects(commands.filter(isSafeCommandBoundary), (command) => command.markReviewAfterHumanApproval);
}

function classifyLane(theme: BroadTheme) {
  const haystack = `${theme.id} ${theme.title} ${theme.searchSeeds.join(" ")}`.toLowerCase();
  if (haystack.includes("prompt")) return "prompt-library";
  if (haystack.includes("agent") && haystack.includes("memory")) return "agent-memory-rag";
  if (haystack.includes("rag") || haystack.includes("memory")) return "rag-memory";
  if (haystack.includes("agent")) return "agent-deployment";
  if (haystack.includes("ollama") || haystack.includes("vllm") || haystack.includes("model")) return "model-deployment";
  if (haystack.includes("dify") || haystack.includes("n8n") || haystack.includes("mcp")) return "no-code-agent-automation";
  if (haystack.includes("api")) return "ai-api-ops";
  return "broad-ai-operations";
}

function intentFor(theme: BroadTheme) {
  if (theme.publicMatches === 0) return "first public coverage for a broad AI search theme";
  if ((theme.missingSubtopics || []).length > 0) return "expand public coverage around missing long-tail subtopics";
  return "strengthen existing public coverage with review-ready drafts";
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function dedupe(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function dedupeObjects<T>(items: T[], keyFor: (item: T) => string) {
  const seen = new Set<string>();
  const result: T[] = [];
  for (const item of items) {
    const key = keyFor(item);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }
  return result;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: MatrixItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, boolean | number>;
  topItems: MatrixItem[];
  unsafeItems: MatrixItem[];
}) {
  return [
    "# Mass AI Search Action Matrix",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns broad AI search demand into human-review waves across AI deployment, Agent deployment, RAG, memory, no-code automation, AI API operations, observability, and cross-industry prompt libraries.",
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
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.themeTitle}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Top Action Themes",
    "",
    "| Wave | Ready | Public | Candidates | Sources | Seeds | Deploy bridges | Prompt bridges | Lane | Theme |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.topItems.map(
      (item) =>
        `| ${item.editorialWave} | ${item.readyForHumanReviewPrep} | ${item.publicMatches} | ${item.readyCandidateFiles} | ${item.sourceTargets.length} | ${item.searchSeeds.length} | ${item.deploymentMatches} | ${item.promptModuleMatches} | ${item.lane} | ${item.themeTitle} |`,
    ),
    "",
    "## Wave Details",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ].join("\n");
}

function itemSection(item: MatrixItem) {
  return [
    `### Wave ${item.editorialWave}: ${item.themeTitle}`,
    "",
    `- Lane: ${item.lane}`,
    `- Intent: ${item.massSearchIntent}`,
    `- Traffic claim: ${item.trafficClaim}`,
    `- Public matches: ${item.publicMatches}`,
    `- Candidate files: ${item.candidateFiles.join(", ")}`,
    `- Bridge sources: ${item.bridgeSources.join(", ")}`,
    "",
    "Search seeds:",
    "",
    ...item.searchSeeds.map((seed) => `- ${seed}`),
    "",
    "Source targets:",
    "",
    ...item.sourceTargets.map((target) => `- ${target}`),
    "",
    "Human review actions:",
    "",
    ...item.humanReviewActions.map((action) => `- ${action}`),
    "",
    "Prompt blueprint samples:",
    "",
    ...(item.promptBlueprintSamples.length ? item.promptBlueprintSamples.map((sample) => `- ${sample.module}: ${sample.title}`) : ["- none"]),
    "",
  ];
}

main();

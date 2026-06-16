import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore?: string;
};

type WaveApprovalItem = {
  alreadyPublished?: boolean;
  approvalChecklist: string[];
  factCheckQueries: string[];
  file: string;
  humanReviewCommand: string;
  officialSourceTargets: string[];
  priorityScore: number;
  publishDryRunCommand: string;
  readyForHumanReview: boolean;
  riskReviewChecklist: string[];
  safeDraft: boolean;
  title: string;
};

type WaveApprovalPacket = {
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; stopBefore: string };
  items: WaveApprovalItem[];
  summary: { alreadyPublished?: number; completedOrReady?: number; items: number; readyForHumanReview: number; unsafeItems: number; wave: number };
  wave: number;
};

type WavePublishSimulation = {
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; stopBeforeHumanApproval: boolean };
  items: Array<{
    alreadyPublished?: boolean;
    blockers: string[];
    commands: {
      markReviewAfterHumanApproval: string;
      markReviewDryRun: string;
      publishConfirmAfterReviewApproval: string;
      publishDryRunAfterReviewApproval: string;
    };
    currentStatus: string;
    file: string;
    projectedPublishableAfterHumanApproval: boolean;
    readyForHumanApproval: boolean;
  }>;
  summary: {
    currentlyPublishable: number;
    items: number;
    projectedPublicPublishedAfterWave: number;
    projectedPublishableAfterHumanApproval: number;
    publicPublishedBeforeWave: number;
    readyForHumanApproval: number;
    unsafeItems: number;
    wave: number;
  };
};

type FirstCoverageReadiness = {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  summary: {
    blockingItems: number;
    firstCoverageItems: number;
    sourceReadyItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    warningItems: number;
    zeroPublicClusters: number;
  };
  warningItems: Array<{
    cluster: string;
    commandBoundary: CommandBoundary;
    file: string;
    launchReady: boolean;
    readinessScore: number;
    reviewActions: string[];
    title: string;
    warningIssues: string[];
  }>;
};

type SourceReplacementDecisionPack = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: Array<{
    file: string;
    kind: "failed-url" | "redirected-url";
    originalUrl: string;
    recommendedCandidate?: { sourceType: string; title: string; url: string } | null;
    unsafeReasons: string[];
  }>;
  summary: {
    failedDecisionItems: number;
    humanGatedItems: number;
    items: number;
    itemsWithRecommendedCandidate: number;
    redirectedDecisionItems: number;
    unsafeItems: number;
  };
};

type SeoWarningRemediation = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: Array<{
    file: string;
    manualActions: string[];
    manualFixReady: boolean;
    schemaWarnings: string[];
    snippetWarnings: string[];
    status: string;
    unsafeReasons: string[];
  }>;
  summary: {
    blockingItems: number;
    humanGatedItems: number;
    items: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type MassAiSearchMatrix = {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: Array<{
    candidateFiles: string[];
    editorialWave: number;
    lane: string;
    readyForHumanReviewPrep: boolean;
    themeTitle: string;
    trafficClaim: string;
    unsafeReasons: string[];
  }>;
  summary: {
    items: number;
    itemsReadyForHumanReviewPrep: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type PopularAiPromptPlaybook = {
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  items: Array<{
    candidateFiles: string[];
    laneId: string;
    promptTemplates: unknown[];
    readyForHumanReviewPrep: boolean;
    searchQueries: string[];
    title: string;
    trafficClaim: string;
    unsafeReasons: string[];
  }>;
  summary: {
    items: number;
    itemsReadyForHumanReviewPrep: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type ApprovalQueueItem = {
  articleState: {
    humanReviewRequired: boolean;
    noindex: boolean;
    qualityScore: number;
    sourceNotes: boolean;
    status: string;
  };
  alreadyPublished: boolean;
  blockers: string[];
  commandBoundary: CommandBoundary;
  currentStage: "draft-needs-human-approval" | "first-coverage-backlog";
  file: string;
  humanChecklist: string[];
  massSearchThemes: Array<{ lane: string; themeTitle: string; wave: number }>;
  popularPromptLanes: Array<{ laneId: string; queries: number; templates: number; title: string }>;
  priorityScore: number;
  projectedPublishableAfterHumanApproval: boolean;
  publicImpact: string;
  readyForHumanApproval: boolean;
  seoWarnings: Array<{ actions: string[]; schemaWarnings: string[]; snippetWarnings: string[] }>;
  sourceReplacementDecisions: Array<{
    kind: "failed-url" | "redirected-url";
    originalUrl: string;
    recommendedCandidate: string | null;
  }>;
  title: string;
  unsafeReasons: string[];
};

function main() {
  const wavePacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const publishSimulation = readJson<WavePublishSimulation>("content/automation/wave-publish-simulation.json");
  const firstCoverage = readJson<FirstCoverageReadiness>("content/automation/broad-first-coverage-readiness-matrix.json");
  const sourceDecisions = readJson<SourceReplacementDecisionPack>("content/automation/source-replacement-decision-pack.json");
  const seoWarnings = readJson<SeoWarningRemediation>("content/automation/seo-warning-remediation-pack.json");
  const massMatrix = readJson<MassAiSearchMatrix>("content/automation/mass-ai-search-action-matrix.json");
  const popularPromptPlaybook = readJson<PopularAiPromptPlaybook>("content/automation/popular-ai-prompt-playbook.json");

  const simulationByFile = new Map(publishSimulation.items.map((item) => [item.file, item]));
  const sourceDecisionsByFile = groupBy(sourceDecisions.items, (item) => item.file);
  const seoWarningsByFile = groupBy(seoWarnings.items, (item) => item.file);
  const massThemesByFile = buildMassThemeIndex(massMatrix.items);
  const popularPromptLanesByFile = buildPopularPromptLaneIndex(popularPromptPlaybook.items);

  const immediateItems = wavePacket.items.map((item) =>
    toApprovalQueueItem({
      commandBoundary: {
        markReviewAfterHumanApproval: item.humanReviewCommand,
        publishConfirm: "not-included",
        publishDryRunAfterReview: item.publishDryRunCommand,
        stopBefore: "Run mark:review only after explicit human approval. Publish dry-run only after review. Publish confirm is not included.",
      },
      currentStage: "draft-needs-human-approval",
      file: item.file,
      humanChecklist: [
        ...item.approvalChecklist,
        ...item.riskReviewChecklist,
        ...item.factCheckQueries.slice(0, 6).map((query) => `Fact-check query before approval: ${query}.`),
        ...item.officialSourceTargets.slice(0, 6).map((target) => `Verify official source before approval: ${target}.`),
      ],
      priorityScore: item.priorityScore,
      projectedPublishableAfterHumanApproval: item.alreadyPublished ? false : simulationByFile.get(item.file)?.projectedPublishableAfterHumanApproval === true,
      publicImpact: `Immediate Wave ${wavePacket.wave}; projected public count after human approval is ${publishSimulation.summary.projectedPublicPublishedAfterWave}.`,
      readyForHumanApproval: Boolean(item.alreadyPublished) || (item.readyForHumanReview && item.safeDraft && (simulationByFile.get(item.file)?.readyForHumanApproval ?? false)),
      simulationBlockers: simulationByFile.get(item.file)?.blockers || [],
      sourceDecisions: sourceDecisionsByFile.get(item.file) || [],
      seoWarnings: seoWarningsByFile.get(item.file) || [],
      massThemes: massThemesByFile.get(item.file) || [],
      popularPromptLanes: popularPromptLanesByFile.get(item.file) || [],
      title: item.title,
    }),
  );

  const immediateFiles = new Set(immediateItems.map((item) => item.file));
  const backlogItems = firstCoverage.warningItems
    .filter((item) => !immediateFiles.has(item.file))
    .slice(0, 8)
    .map((item) =>
      toApprovalQueueItem({
        commandBoundary: item.commandBoundary,
        currentStage: "first-coverage-backlog",
        file: item.file,
        humanChecklist: item.reviewActions,
        priorityScore: item.readinessScore,
        projectedPublishableAfterHumanApproval: item.launchReady,
        publicImpact: `First-coverage backlog for zero-public cluster: ${item.cluster}.`,
        readyForHumanApproval: item.launchReady,
        simulationBlockers: [],
        sourceDecisions: sourceDecisionsByFile.get(item.file) || [],
        seoWarnings: seoWarningsByFile.get(item.file) || [],
        massThemes: massThemesByFile.get(item.file) || [],
        popularPromptLanes: popularPromptLanesByFile.get(item.file) || [],
        title: item.title,
      }),
    );

  const items = [...immediateItems, ...backlogItems].sort((a, b) => stageScore(b) - stageScore(a) || b.priorityScore - a.priorityScore || a.file.localeCompare(b.file));
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const itemsWithFailedSourceDecision = items.filter((item) => item.sourceReplacementDecisions.some((decision) => decision.kind === "failed-url"));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only human approval execution queue. It consolidates the next manual review actions but never edits articles, marks review, publishes, or includes publish --confirm commands.",
      stopBefore: "Stop before mark:review until a human approves each file. Stop before publish --confirm; this queue includes publish dry-runs only.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      firstCoverageGeneratedAt: firstCoverage.generatedAt,
      firstCoverageSummary: firstCoverage.summary,
      massAiSearchMatrixGeneratedAt: massMatrix.generatedAt,
      massAiSearchMatrixSummary: massMatrix.summary,
      popularAiPromptPlaybookGeneratedAt: popularPromptPlaybook.generatedAt,
      popularAiPromptPlaybookSummary: popularPromptPlaybook.summary,
      seoWarningGeneratedAt: seoWarnings.generatedAt,
      seoWarningSummary: seoWarnings.summary,
      sourceReplacementGeneratedAt: sourceDecisions.generatedAt,
      sourceReplacementSummary: sourceDecisions.summary,
      waveApprovalGeneratedAt: wavePacket.generatedAt,
      waveApprovalSummary: wavePacket.summary,
      wavePublishSimulationGeneratedAt: publishSimulation.generatedAt,
      wavePublishSimulationSummary: publishSimulation.summary,
      trafficNote: "No measured traffic, rankings, impressions, clicks, or revenue data is available or claimed.",
    },
    publishingBoundary: {
      currentPublicPublished: publishSimulation.summary.publicPublishedBeforeWave,
      currentPublishableNow: publishSimulation.summary.currentlyPublishable,
      projectedPublicPublishedAfterImmediateHumanApproval: publishSimulation.summary.projectedPublicPublishedAfterWave,
      publishConfirmCommandsIncluded: 0,
    },
    summary: {
      backlogItems: backlogItems.length,
      commandBoundaries: items.filter((item) => hasSafeCommandBoundary(item.commandBoundary)).length,
      humanGatedItems: items.length,
      immediateApprovalItems: immediateItems.length,
      immediateApprovalReadyItems: immediateItems.filter((item) => item.readyForHumanApproval).length,
      items: items.length,
      itemsReadyForHumanApproval: items.filter((item) => item.readyForHumanApproval).length,
      itemsWithFailedSourceDecision: itemsWithFailedSourceDecision.length,
      itemsWithMassSearchTheme: items.filter((item) => item.massSearchThemes.length > 0).length,
      itemsWithPopularPromptLane: items.filter((item) => item.popularPromptLanes.length > 0).length,
      itemsWithSeoWarnings: items.filter((item) => item.seoWarnings.length > 0).length,
      itemsWithSourceReplacementDecisions: items.filter((item) => item.sourceReplacementDecisions.length > 0).length,
      publishConfirmCommandsIncluded: 0,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    immediateItems,
    backlogItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "human-approval-execution-queue.json");
  const mdTarget = path.join(process.cwd(), "docs", "human-approval-execution-queue.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toApprovalQueueItem(input: {
  commandBoundary: CommandBoundary;
  currentStage: ApprovalQueueItem["currentStage"];
  file: string;
  humanChecklist: string[];
  massThemes: ApprovalQueueItem["massSearchThemes"];
  popularPromptLanes: ApprovalQueueItem["popularPromptLanes"];
  priorityScore: number;
  projectedPublishableAfterHumanApproval: boolean;
  publicImpact: string;
  readyForHumanApproval: boolean;
  seoWarnings: SeoWarningRemediation["items"];
  simulationBlockers: string[];
  sourceDecisions: SourceReplacementDecisionPack["items"];
  title: string;
}): ApprovalQueueItem {
  const article = readArticle(input.file);
  const quality = checkFile(input.file);
  const articleState = {
    humanReviewRequired: article.data.humanReviewRequired === true,
    noindex: article.data.noindex === true,
    qualityScore: quality.qualityScore,
    sourceNotes: Boolean(article.data.sourceNotes),
    status: String(article.data.status || ""),
  };
  const alreadyPublished = articleState.status === "published" && articleState.noindex === false;
  const commandBoundary = {
    ...input.commandBoundary,
    publishConfirm: "not-included" as const,
  };
  const sourceReplacementDecisions = input.sourceDecisions.map((decision) => ({
    kind: decision.kind,
    originalUrl: decision.originalUrl,
    recommendedCandidate: decision.recommendedCandidate ? `${decision.recommendedCandidate.title}: ${decision.recommendedCandidate.url}` : null,
  }));
  const seoWarnings = input.seoWarnings.map((warning) => ({
    actions: warning.manualActions,
    schemaWarnings: warning.schemaWarnings,
    snippetWarnings: warning.snippetWarnings,
  }));
  const blockers = [...input.simulationBlockers];
  const unsafeReasons = unsafeReasonsFor({
    articleState,
    alreadyPublished,
    blockers,
    commandBoundary,
    humanChecklist: input.humanChecklist,
    readyForHumanApproval: input.readyForHumanApproval,
    sourceDecisions: input.sourceDecisions,
  });

  return {
    articleState,
    alreadyPublished,
    blockers,
    commandBoundary,
    currentStage: input.currentStage,
    file: input.file,
    humanChecklist: dedupe(input.humanChecklist).slice(0, 28),
    massSearchThemes: input.massThemes,
    popularPromptLanes: input.popularPromptLanes,
    priorityScore: input.priorityScore,
    projectedPublishableAfterHumanApproval: input.projectedPublishableAfterHumanApproval,
    publicImpact: input.publicImpact,
    readyForHumanApproval: (input.readyForHumanApproval || alreadyPublished) && unsafeReasons.length === 0,
    seoWarnings,
    sourceReplacementDecisions,
    title: input.title,
    unsafeReasons,
  };
}

function unsafeReasonsFor(input: {
  alreadyPublished: boolean;
  articleState: ApprovalQueueItem["articleState"];
  blockers: string[];
  commandBoundary: CommandBoundary;
  humanChecklist: string[];
  readyForHumanApproval: boolean;
  sourceDecisions: SourceReplacementDecisionPack["items"];
}) {
  const reasons: string[] = [];
  if (!input.readyForHumanApproval && !input.alreadyPublished) reasons.push("upstream report does not mark item ready for human approval");
  if (input.blockers.length > 0) reasons.push(`simulation blockers present: ${input.blockers.join("; ")}`);
  if (!input.alreadyPublished && input.articleState.status !== "draft") reasons.push(`article status is ${input.articleState.status}, expected draft before mark:review`);
  if (!input.alreadyPublished && input.articleState.noindex !== true) reasons.push("article must remain noindex=true before review");
  if (input.articleState.humanReviewRequired !== true) reasons.push("article must keep humanReviewRequired=true before review");
  if (!input.articleState.sourceNotes) reasons.push("article is missing sourceNotes");
  if (input.articleState.qualityScore < 100) reasons.push(`qualityScore ${input.articleState.qualityScore} below 100`);
  if (input.humanChecklist.length < 6) reasons.push("not enough human checklist items");
  if (!hasSafeCommandBoundary(input.commandBoundary)) reasons.push("unsafe command boundary");
  if (input.sourceDecisions.some((decision) => decision.unsafeReasons.length > 0)) reasons.push("source replacement decision has unsafe reasons");
  return reasons;
}

function hasSafeCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included"
  );
}

function buildMassThemeIndex(items: MassAiSearchMatrix["items"]) {
  const index = new Map<string, ApprovalQueueItem["massSearchThemes"]>();
  for (const item of items) {
    if (!item.readyForHumanReviewPrep || item.trafficClaim !== "not-included" || item.unsafeReasons.length > 0) continue;
    for (const file of item.candidateFiles) {
      const current = index.get(file) || [];
      current.push({ lane: item.lane, themeTitle: item.themeTitle, wave: item.editorialWave });
      index.set(file, current);
    }
  }
  return index;
}

function buildPopularPromptLaneIndex(items: PopularAiPromptPlaybook["items"]) {
  const index = new Map<string, ApprovalQueueItem["popularPromptLanes"]>();
  for (const item of items) {
    if (!item.readyForHumanReviewPrep || item.trafficClaim !== "not-included" || item.unsafeReasons.length > 0) continue;
    for (const file of item.candidateFiles) {
      const current = index.get(file) || [];
      current.push({
        laneId: item.laneId,
        queries: item.searchQueries.length,
        templates: item.promptTemplates.length,
        title: item.title,
      });
      index.set(file, current);
    }
  }
  return index;
}

function stageScore(item: ApprovalQueueItem) {
  return item.currentStage === "draft-needs-human-approval" ? 10000 : 0;
}

function groupBy<T>(items: T[], keyFor: (item: T) => string) {
  const groups = new Map<string, T[]>();
  for (const item of items) {
    const key = keyFor(item);
    const current = groups.get(key) || [];
    current.push(item);
    groups.set(key, current);
  }
  return groups;
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function dedupe(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { note: string; stopBefore: string; trafficClaim: string };
  items: ApprovalQueueItem[];
  publishingBoundary: Record<string, number>;
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, boolean | number>;
  unsafeItems: ApprovalQueueItem[];
}) {
  return [
    "# Human Approval Execution Queue",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This queue is read-only. It consolidates the next manual approval actions that can increase public article count, while stopping before article edits, mark-review execution, and publish confirmation.",
    "",
    "## Guardrails",
    "",
    `- ${payload.guardrails.note}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    "",
    "## Publishing Boundary",
    "",
    ...Object.entries(payload.publishingBoundary).map(([key, value]) => `- ${key}: ${value}`),
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
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Queue",
    "",
    "| Stage | Ready | Priority | SEO | Source decisions | Mass themes | Prompt lanes | Status | Title | File |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.currentStage} | ${item.readyForHumanApproval} | ${item.priorityScore} | ${item.seoWarnings.length} | ${item.sourceReplacementDecisions.length} | ${item.massSearchThemes.length} | ${item.popularPromptLanes.length} | ${item.articleState.status} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Command Boundaries",
    "",
    "| File | Mark review after human approval | Publish dry-run after review | Publish confirm |",
    "| --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.file} | \`${item.commandBoundary.markReviewAfterHumanApproval}\` | \`${item.commandBoundary.publishDryRunAfterReview}\` | ${item.commandBoundary.publishConfirm} |`,
    ),
    "",
    "## Human Review Packets",
    "",
    ...payload.items.flatMap(itemSection),
  ].join("\n");
}

function itemSection(item: ApprovalQueueItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Stage: ${item.currentStage}`,
    `- Public impact: ${item.publicImpact}`,
    `- Projected publishable after human approval: ${item.projectedPublishableAfterHumanApproval}`,
    `- Article state: status=${item.articleState.status}, noindex=${item.articleState.noindex}, humanReviewRequired=${item.articleState.humanReviewRequired}, qualityScore=${item.articleState.qualityScore}`,
    "",
    "Mass search themes:",
    "",
    ...(item.massSearchThemes.length ? item.massSearchThemes.map((theme) => `- Wave ${theme.wave}: ${theme.lane} - ${theme.themeTitle}`) : ["- none"]),
    "",
    "Popular prompt lanes:",
    "",
    ...(item.popularPromptLanes.length
      ? item.popularPromptLanes.map((lane) => `- ${lane.laneId}: ${lane.title} (${lane.templates} templates, ${lane.queries} queries)`)
      : ["- none"]),
    "",
    "Source replacement decisions:",
    "",
    ...(item.sourceReplacementDecisions.length
      ? item.sourceReplacementDecisions.map((decision) => `- ${decision.kind}: ${decision.originalUrl} -> ${decision.recommendedCandidate || "review manually"}`)
      : ["- none"]),
    "",
    "SEO warnings:",
    "",
    ...(item.seoWarnings.length
      ? item.seoWarnings.flatMap((warning) => [...warning.snippetWarnings.map((entry) => `- Snippet: ${entry}`), ...warning.schemaWarnings.map((entry) => `- Schema: ${entry}`)])
      : ["- none"]),
    "",
    "Human checklist:",
    "",
    ...item.humanChecklist.map((entry) => `- ${entry}`),
    "",
  ];
}

main();

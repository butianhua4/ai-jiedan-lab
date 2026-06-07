import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore?: string;
};

type SprintItem = {
  commandBoundary: CommandBoundary;
  file: string;
  lane: string;
  playbookStage: string;
  readyForSprint: boolean;
  reviewChecklist: string[];
  safeDraft: boolean;
  searchQueries: number;
  sourceTargets: number;
  sourceTypes: string[];
  sprintOrder: number;
  title: string;
};

type SprintBoard = {
  queuedForPlaybook: SprintItem[];
  summary: { queuedForPlaybook: number; unsafeItems: number };
};

type SourcePackItem = {
  approvalChecklist?: string[];
  factCheckQueries?: string[];
  file: string;
  humanDecisionChecklist?: string[];
  officialSourceTargets?: string[];
  primaryKeyword?: string;
  riskChecks?: string[];
  riskReviewChecklist?: string[];
  safeDraft?: boolean;
  workflowAngles?: string[];
};

type SearchCoverageItem = {
  file: string;
  primaryKeyword: string;
  queryFamilies: Record<string, string[]>;
  readyForManualReview: boolean;
};

type PortfolioItem = {
  file: string;
  humanActionPlan?: string[];
  readyForHumanReview?: boolean;
  safeDraft?: boolean;
  searchQueries?: string[];
  sourceTargets?: string[];
};

type ActionTask = {
  actionItems?: string[];
  blockers?: string[];
  file: string;
  ready?: boolean;
  warnings?: string[];
};

type OptimizationItem = {
  file: string;
  internalLink?: { title: string; url: string } | null;
  proposedDescription?: string;
  proposedOpeningAdditions?: string[];
  proposedTitle?: string;
  ready?: boolean;
  warningRemediation?: string[];
};

type FreshnessItem = {
  file: string;
  freshnessRisk?: string;
  humanReviewChecklist?: string[];
  officialSourceTargets?: string[];
  readyForFreshnessReview?: boolean;
  staleSensitiveChecks?: string[];
};

type CannibalizationItem = {
  candidate?: { file: string; primaryKeyword?: string };
  decision?: string;
  humanReviewChecklist?: string[];
  recommendation?: string;
  riskLevel?: string;
};

type InternalLinkItem = {
  file: string;
  linksToPublicArticles?: number;
  suggestions?: Array<{ title: string; url: string }>;
};

type SearchQueryGapItem = {
  file: string;
  readyForManualSearchQueryReview?: boolean;
  recommendedSearchQueries?: string[];
};

type QueuedPlaybookItem = {
  actionItems: string[];
  cannibalization: { decision: string; recommendation: string; riskLevel: string };
  commandBoundary: CommandBoundary;
  factCheckQueries: string[];
  file: string;
  freshness: { risk: string; staleSensitiveChecks: string[] };
  internalLinkSuggestions: Array<{ title: string; url: string }>;
  manualOnlyCommands: CommandBoundary;
  optimizationActions: string[];
  primaryKeyword: string;
  readyForHumanReview: boolean;
  riskReviewChecklist: string[];
  safeDraft: boolean;
  searchActions: string[];
  searchQueries: string[];
  sourceActions: string[];
  sourceEvidence: string[];
  sourceTargets: string[];
  sprintOrder: number;
  title: string;
  warnings: string[];
};

function main() {
  const sprintBoard = readJson<SprintBoard>("content/automation/autopilot-review-sprint-board.json");
  const sourcePack = readJson<{ items: SourcePackItem[] }>("content/automation/next-review-source-pack.json");
  const searchCoverage = readJson<{ items: SearchCoverageItem[] }>("content/automation/search-query-coverage.json");
  const portfolio = readJson<{ items: PortfolioItem[]; nextItems: PortfolioItem[]; multiSourceItems: PortfolioItem[] }>("content/automation/review-portfolio-board.json");
  const actionBoard = readJson<{ tasks: ActionTask[] }>("content/automation/review-action-board.json");
  const optimizationBrief = readJson<{ briefs: OptimizationItem[]; nextBriefs: OptimizationItem[] }>("content/automation/review-optimization-brief.json");
  const freshnessBrief = readJson<{ highRiskItems: FreshnessItem[]; items: FreshnessItem[] }>("content/automation/review-freshness-brief.json");
  const cannibalizationBrief = readJson<{ items: CannibalizationItem[]; nextItems: CannibalizationItem[] }>("content/automation/review-cannibalization-brief.json");
  const internalLinks = readJson<{ candidateItems: InternalLinkItem[] }>("content/automation/internal-link-opportunity-audit.json");
  const queryGap = readJson<{ items: SearchQueryGapItem[] }>("content/automation/autopilot-search-query-gap-brief.json");
  const deploymentPack = readJson<{ items: SourcePackItem[]; nextItems: SourcePackItem[] }>("content/automation/ai-deployment-review-pack.json");
  const promptPack = readJson<{ items: SourcePackItem[]; nextItems: SourcePackItem[] }>("content/automation/industry-prompt-review-pack.json");

  const sourcePackByFile = byFile(sourcePack.items);
  const searchCoverageByFile = byFile(searchCoverage.items);
  const portfolioByFile = byFile([...portfolio.items, ...portfolio.nextItems, ...portfolio.multiSourceItems]);
  const actionByFile = byFile(actionBoard.tasks);
  const optimizationByFile = byFile([...optimizationBrief.nextBriefs, ...optimizationBrief.briefs]);
  const freshnessByFile = byFile([...freshnessBrief.highRiskItems, ...freshnessBrief.items]);
  const cannibalizationByFile = new Map(
    [...cannibalizationBrief.nextItems, ...cannibalizationBrief.items]
      .filter((item) => item.candidate?.file)
      .map((item) => [item.candidate?.file as string, item]),
  );
  const internalLinksByFile = byFile(internalLinks.candidateItems);
  const queryGapByFile = byFile(queryGap.items);
  const deploymentByFile = byFile([...deploymentPack.nextItems, ...deploymentPack.items]);
  const promptByFile = byFile([...promptPack.nextItems, ...promptPack.items]);

  const items = sprintBoard.queuedForPlaybook.map((sprintItem) => {
    const source = sourcePackByFile.get(sprintItem.file);
    const coverage = searchCoverageByFile.get(sprintItem.file);
    const portfolioItem = portfolioByFile.get(sprintItem.file);
    const action = actionByFile.get(sprintItem.file);
    const optimization = optimizationByFile.get(sprintItem.file);
    const freshness = freshnessByFile.get(sprintItem.file);
    const cannibalization = cannibalizationByFile.get(sprintItem.file);
    const link = internalLinksByFile.get(sprintItem.file);
    const gap = queryGapByFile.get(sprintItem.file);
    const deployment = deploymentByFile.get(sprintItem.file);
    const prompt = promptByFile.get(sprintItem.file);

    const searchQueries = dedupe([
      ...(gap?.recommendedSearchQueries || []),
      ...(portfolioItem?.searchQueries || []),
      ...queryExamples(coverage),
    ]).slice(0, 12);
    const sourceTargets = dedupe([
      ...(source?.officialSourceTargets || []),
      ...(portfolioItem?.sourceTargets || []),
      ...(deployment?.officialSourceTargets || []),
      ...(prompt?.officialSourceTargets || []),
    ]);
    const factCheckQueries = dedupe([...(source?.factCheckQueries || []), ...searchQueries.map((query) => `${query} official docs latest`)]).slice(0, 10);
    const riskReviewChecklist = dedupe([
      ...(source?.riskReviewChecklist || []),
      ...(deployment?.riskReviewChecklist || []),
      ...(deployment?.riskChecks || []),
      ...(deployment?.humanDecisionChecklist || []),
      ...(prompt?.riskReviewChecklist || []),
      ...(prompt?.riskChecks || []),
      ...(prompt?.humanDecisionChecklist || []),
      "No traffic, ranking, revenue, benchmark, cost, latency, or stability claim is approved without measured evidence.",
      "No API key, private customer data, credential, or client account detail is exposed.",
    ]);
    const actionItems = dedupe([...(action?.actionItems || []), ...(portfolioItem?.humanActionPlan || []), ...sprintItem.reviewChecklist]);
    const optimizationActions = dedupe([
      ...(optimization?.proposedOpeningAdditions || []),
      ...(optimization?.warningRemediation || []),
      optimization?.proposedTitle ? `Consider reviewed title: ${optimization.proposedTitle}` : "",
      optimization?.proposedDescription ? `Consider reviewed description: ${optimization.proposedDescription}` : "",
    ]);
    const sourceActions = dedupe([
      ...sourceTargets.map((target) => `Verify official source: ${target}`),
      ...factCheckQueries.slice(0, 4).map((query) => `Run or manually check fact-check query: ${query}`),
    ]);
    const searchActions = dedupe([
      ...searchQueries.slice(0, 8).map((query) => `Confirm article answers search query: ${query}`),
      gap?.readyForManualSearchQueryReview ? "Use autopilot search query gap brief evidence for this item." : "",
    ]);
    const internalLinkSuggestions = dedupeLinks([...(optimization?.internalLink ? [optimization.internalLink] : []), ...(link?.suggestions || [])]).slice(0, 3);
    const warnings = dedupe([...(action?.warnings || []), ...(freshness?.staleSensitiveChecks || []), ...(optimization?.warningRemediation || [])]);
    const sourceEvidence = [
      source ? "next-review-source-pack" : "",
      coverage ? "search-query-coverage" : "",
      portfolioItem ? "review-portfolio-board" : "",
      action ? "review-action-board" : "",
      optimization ? "review-optimization-brief" : "",
      freshness ? "review-freshness-brief" : "",
      cannibalization ? "review-cannibalization-brief" : "",
      link ? "internal-link-opportunity-audit" : "",
      gap ? "autopilot-search-query-gap-brief" : "",
      deployment ? "ai-deployment-review-pack" : "",
      prompt ? "industry-prompt-review-pack" : "",
    ].filter(Boolean);

    const item: QueuedPlaybookItem = {
      actionItems,
      cannibalization: {
        decision: cannibalization?.decision || "monitor-only",
        recommendation: cannibalization?.recommendation || "No cannibalization brief found; human reviewer should compare with public articles.",
        riskLevel: cannibalization?.riskLevel || "unknown",
      },
      commandBoundary: sprintItem.commandBoundary,
      factCheckQueries,
      file: sprintItem.file,
      freshness: {
        risk: freshness?.freshnessRisk || "unknown",
        staleSensitiveChecks: freshness?.staleSensitiveChecks || [],
      },
      internalLinkSuggestions,
      manualOnlyCommands: sprintItem.commandBoundary,
      optimizationActions,
      primaryKeyword: source?.primaryKeyword || coverage?.primaryKeyword || deployment?.primaryKeyword || prompt?.primaryKeyword || "",
      readyForHumanReview:
        sprintItem.readyForSprint &&
        sprintItem.safeDraft &&
        hasCommandBoundary(sprintItem.commandBoundary) &&
        sourceTargets.length > 0 &&
        searchQueries.length > 0 &&
        sourceActions.length > 0 &&
        searchActions.length > 0 &&
        riskReviewChecklist.length >= 4 &&
        actionItems.length >= 5,
      riskReviewChecklist,
      safeDraft: sprintItem.safeDraft,
      searchActions,
      searchQueries,
      sourceActions,
      sourceEvidence,
      sourceTargets,
      sprintOrder: sprintItem.sprintOrder,
      title: sprintItem.title,
      warnings,
    };
    return item;
  });

  const unsafeItems = items.filter((item) => !item.readyForHumanReview);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only merged playbook for next-10 queued-for-playbook sprint items. It prepares human review without changing article status.",
      stopBefore: "Use this report for manual review only. mark:review requires explicit human approval per file; publish --confirm is not included.",
    },
    sourceEvidence: {
      queuedForPlaybook: sprintBoard.summary.queuedForPlaybook,
      sprintBoardUnsafeItems: sprintBoard.summary.unsafeItems,
    },
    summary: {
      items: items.length,
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      itemsWithFactCheckQueries: items.filter((item) => item.factCheckQueries.length > 0).length,
      itemsWithInternalLinkSuggestions: items.filter((item) => item.internalLinkSuggestions.length > 0).length,
      itemsWithOptimizationActions: items.filter((item) => item.optimizationActions.length > 0).length,
      itemsWithRiskChecklist: items.filter((item) => item.riskReviewChecklist.length >= 4).length,
      itemsWithSearchActions: items.filter((item) => item.searchActions.length > 0).length,
      itemsWithSearchQueries: items.filter((item) => item.searchQueries.length > 0).length,
      itemsWithSourceActions: items.filter((item) => item.sourceActions.length > 0).length,
      itemsWithSourceEvidence: items.filter((item) => item.sourceEvidence.length >= 3).length,
      itemsWithSourceTargets: items.filter((item) => item.sourceTargets.length > 0).length,
      readyItems: items.filter((item) => item.readyForHumanReview).length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-queued-playbook-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-queued-playbook-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function queryExamples(coverage: SearchCoverageItem | undefined) {
  if (!coverage) return [];
  return ["howTo", "comparison", "template", "risk", "costOps", "deployment"].flatMap((family) => coverage.queryFamilies[family] || []);
}

function byFile<T extends { file: string }>(items: T[]) {
  const map = new Map<string, T>();
  for (const item of items) {
    if (!map.has(item.file)) map.set(item.file, item);
  }
  return map;
}

function hasCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included"
  );
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function dedupeLinks(items: Array<{ title: string; url: string }>) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.url || item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: QueuedPlaybookItem[];
  sourceEvidence: Record<string, number>;
  summary: Record<string, number>;
  unsafeItems: QueuedPlaybookItem[];
}) {
  const lines = [
    "# Autopilot Queued Playbook Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It prepares the queued-for-playbook sprint items for manual review and keeps all status changes human-gated.",
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
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Queued Playbook Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Manual Review Playbooks",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: QueuedPlaybookItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Order | Ready | Sources | Queries | Actions | Links | Freshness | Cannibalization | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.readyForHumanReview} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.actionItems.length} | ${item.internalLinkSuggestions.length} | ${item.freshness.risk} | ${item.cannibalization.riskLevel} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: QueuedPlaybookItem) {
  return [
    `### ${item.sprintOrder}. ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Primary keyword: ${item.primaryKeyword || "missing"}`,
    `- Source evidence: ${item.sourceEvidence.join(", ") || "missing"}`,
    `- Manual mark-review command after approval: ${item.manualOnlyCommands.markReviewAfterHumanApproval}`,
    `- Publish dry-run only after review: ${item.manualOnlyCommands.publishDryRunAfterReview}`,
    `- Publish confirm: ${item.manualOnlyCommands.publishConfirm}`,
    "",
    "Search actions:",
    "",
    ...item.searchActions.slice(0, 8).map((step) => `- ${step}`),
    "",
    "Source actions:",
    "",
    ...item.sourceActions.slice(0, 8).map((step) => `- ${step}`),
    "",
    "Optimization actions:",
    "",
    ...(item.optimizationActions.length ? item.optimizationActions.slice(0, 6).map((step) => `- ${step}`) : ["- none"]),
    "",
    "Internal link suggestions:",
    "",
    ...(item.internalLinkSuggestions.length ? item.internalLinkSuggestions.map((link) => `- ${link.title}: ${link.url}`) : ["- none"]),
    "",
    "Risk checklist:",
    "",
    ...item.riskReviewChecklist.slice(0, 8).map((step) => `- ${step}`),
    "",
  ];
}

main();

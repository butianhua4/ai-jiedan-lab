import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type PortfolioItem = {
  commandBoundary: CommandBoundary;
  file: string;
  humanActionPlan: string[];
  priorityScore: number;
  readyForHumanReview: boolean;
  reviewChecklistCount: number;
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  sourceTypes: string[];
  status: string;
  title: string;
};

type PortfolioBoard = {
  items: PortfolioItem[];
  publishingBoundary: { publicPublished: number; publishableNow: number; statusCounts: Record<string, number> };
  summary: { unsafeItems: number };
  trafficBoundary: { canClaimTraffic: boolean; trafficDataAvailable: boolean };
};

type BriefByFile = {
  file?: string;
  humanReviewChecklist?: unknown[];
  priority?: number;
  ready?: boolean;
  warningRemediation?: string[];
};

type AutopilotQueueItem = {
  assignmentLane: string;
  autopilotScore: number;
  blockers: string[];
  commandBoundary: CommandBoundary;
  file: string;
  humanActionPlan: string[];
  readyForAssignment: boolean;
  reviewFocus: string[];
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  sourceTypes: string[];
  title: string;
};

function main() {
  const portfolio = readJson<PortfolioBoard>("content/automation/review-portfolio-board.json");
  const freshness = readOptional<{ items?: BriefByFile[] }>("content/automation/review-freshness-brief.json");
  const cannibalization = readOptional<{ highRiskItems?: Array<{ candidate?: { file?: string } }>; items?: BriefByFile[] }>(
    "content/automation/review-cannibalization-brief.json",
  );
  const optimization = readOptional<{ briefs?: BriefByFile[] }>("content/automation/review-optimization-brief.json");

  const highRiskCannibalization = new Set((cannibalization?.highRiskItems || []).flatMap((item) => (item.candidate?.file ? [item.candidate.file] : [])));
  const freshnessByFile = toFileMap(freshness?.items || []);
  const cannibalizationByFile = toFileMap(cannibalization?.items || []);
  const optimizationByFile = toFileMap(optimization?.briefs || []);

  const items = portfolio.items
    .map((item) => {
      const blockers = buildBlockers(item, highRiskCannibalization);
      const focus = buildReviewFocus(item, optimizationByFile.get(item.file), freshnessByFile.get(item.file), cannibalizationByFile.get(item.file));
      const queueItem: AutopilotQueueItem = {
        assignmentLane: laneFor(item),
        autopilotScore: scoreItem(item, focus, blockers),
        blockers,
        commandBoundary: item.commandBoundary,
        file: item.file,
        humanActionPlan: item.humanActionPlan,
        readyForAssignment: blockers.length === 0 && item.readyForHumanReview && item.safeDraft && hasCommandBoundary(item.commandBoundary),
        reviewFocus: focus,
        safeDraft: item.safeDraft,
        searchQueries: item.searchQueries,
        sourceTargets: item.sourceTargets,
        sourceTypes: item.sourceTypes,
        title: item.title,
      };
      return queueItem;
    })
    .sort((a, b) => b.autopilotScore - a.autopilotScore || a.file.localeCompare(b.file));

  const nextAssignments = items.filter((item) => item.readyForAssignment).slice(0, 10);
  const blockedItems = items.filter((item) => !item.readyForAssignment && isSafeBlockedItem(item));
  const unsafeItems = items.filter((item) => !isSafeQueueItem(item) && !isSafeBlockedItem(item));
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only autopilot queue. It orders manual review work but never changes article status or publishes.",
      stopBefore: "Stop at human assignment. mark:review still requires --confirm-human and publishing still requires a separate explicit approval.",
    },
    boundaries: {
      canClaimTraffic: portfolio.trafficBoundary.canClaimTraffic,
      publicPublished: portfolio.publishingBoundary.publicPublished,
      publishableNow: portfolio.publishingBoundary.publishableNow,
      trafficDataAvailable: portfolio.trafficBoundary.trafficDataAvailable,
    },
    summary: {
      blockedItems: blockedItems.length,
      items: items.length,
      nextAssignments: nextAssignments.length,
      readyItems: items.filter((item) => item.readyForAssignment).length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
      withSearchQueries: items.filter((item) => item.searchQueries.length > 0).length,
      withSourceTargets: items.filter((item) => item.sourceTargets.length > 0).length,
    },
    nextAssignments,
    blockedItems,
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-review-queue.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-review-queue.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function buildBlockers(item: PortfolioItem, highRiskCannibalization: Set<string>) {
  const blockers: string[] = [];
  if (!item.safeDraft) blockers.push("not a safe draft");
  if (!item.readyForHumanReview) blockers.push("portfolio item is not ready for human review");
  if (!hasCommandBoundary(item.commandBoundary)) blockers.push("missing safe command boundary");
  if (!item.sourceTargets.length) blockers.push("missing official source targets");
  if (highRiskCannibalization.has(item.file)) blockers.push("high cannibalization risk needs differentiation first");
  return blockers;
}

function buildReviewFocus(item: PortfolioItem, optimization?: BriefByFile, freshness?: BriefByFile, cannibalization?: BriefByFile) {
  const focus = [
    `Verify ${item.sourceTargets.length} official source target(s).`,
    item.searchQueries.length ? `Check ${Math.min(item.searchQueries.length, 8)} search query seed(s).` : "Confirm search intent from the source packet.",
    `Review ${item.reviewChecklistCount} combined checklist signal(s).`,
  ];
  if (optimization?.warningRemediation?.length) focus.push(`Apply copydesk remediation: ${optimization.warningRemediation.slice(0, 2).join("; ")}.`);
  if ((freshness?.humanReviewChecklist?.length || 0) > 0) focus.push("Complete freshness checklist for fast-changing AI/tool guidance.");
  if ((cannibalization?.humanReviewChecklist?.length || 0) > 0) focus.push("Confirm differentiation against similar public or review drafts.");
  focus.push("Do not approve traffic, ranking, revenue, benchmark, or stability claims without measured evidence.");
  return focus;
}

function laneFor(item: PortfolioItem) {
  if (item.sourceTypes.includes("prompt")) return "industry-prompt";
  if (item.sourceTypes.includes("deployment")) return "ai-deployment";
  if (item.sourceTypes.includes("public-gap")) return "public-coverage-gap";
  return "wave-review";
}

function scoreItem(item: PortfolioItem, focus: string[], blockers: string[]) {
  return (
    item.priorityScore +
    item.sourceTypes.length * 50 +
    Math.min(item.searchQueries.length, 10) * 10 +
    Math.min(item.sourceTargets.length, 10) * 15 +
    focus.length * 8 -
    blockers.length * 500
  );
}

function isSafeQueueItem(item: AutopilotQueueItem) {
  return (
    item.readyForAssignment &&
    item.safeDraft &&
    item.blockers.length === 0 &&
    item.sourceTargets.length > 0 &&
    hasCommandBoundary(item.commandBoundary) &&
    item.commandBoundary.publishConfirm === "not-included"
  );
}

function isSafeBlockedItem(item: AutopilotQueueItem) {
  return (
    item.safeDraft &&
    item.blockers.length > 0 &&
    item.sourceTargets.length > 0 &&
    hasCommandBoundary(item.commandBoundary) &&
    item.commandBoundary.publishConfirm === "not-included"
  );
}

function hasCommandBoundary(command: Partial<CommandBoundary>) {
  return (
    command.markReviewAfterHumanApproval?.includes("--confirm-human") === true &&
    command.publishDryRunAfterReview?.includes("--confirm") !== true &&
    command.publishConfirm === "not-included" &&
    command.stopBefore?.includes("explicit") === true
  );
}

function toFileMap(items: BriefByFile[]) {
  return new Map(items.filter((item) => item.file).map((item) => [item.file as string, item]));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function readOptional<T>(relativePath: string): T | null {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return null;
  return readJson<T>(relativePath);
}

function toMarkdown(payload: {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; stopBefore: string };
  blockedItems: AutopilotQueueItem[];
  items: AutopilotQueueItem[];
  nextAssignments: AutopilotQueueItem[];
  summary: Record<string, number>;
  unsafeItems: AutopilotQueueItem[];
}) {
  const lines = [
    "# Autopilot Review Queue",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It ranks the next manual review assignments and stops before article status changes.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    "",
    "## Boundaries",
    "",
    `- Public published: ${payload.boundaries.publicPublished}`,
    `- Publishable now: ${payload.boundaries.publishableNow}`,
    `- Traffic data available: ${payload.boundaries.trafficDataAvailable}`,
    `- Can claim traffic: ${payload.boundaries.canClaimTraffic}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Blocked Items",
    "",
    ...itemTable(payload.blockedItems),
    "",
    "## Next Assignments",
    "",
    ...itemTable(payload.nextAssignments),
    "",
    "## Review Focus",
    "",
    ...payload.nextAssignments.flatMap(focusSection),
    "",
    "## All Queue Items",
    "",
    ...itemTable(payload.items),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: AutopilotQueueItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForAssignment} | ${item.autopilotScore} | ${item.assignmentLane} | ${item.sourceTypes.join(", ")} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.blockers.length} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function focusSection(item: AutopilotQueueItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Lane: ${item.assignmentLane}`,
    `- Mark review command after human approval: \`${item.commandBoundary.markReviewAfterHumanApproval}\``,
    `- Publish dry-run after review: \`${item.commandBoundary.publishDryRunAfterReview}\``,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
    "Focus:",
    "",
    ...item.reviewFocus.map((focus) => `- ${focus}`),
    "",
  ];
}

main();

import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval?: string;
  publishConfirm?: string;
  publishDryRunAfterReview?: string;
};

type ApprovalItem = {
  alreadyPublished?: boolean;
  articleState?: { humanReviewRequired?: boolean; noindex?: boolean; qualityScore?: number; sourceNotes?: boolean; status?: string };
  blockers?: unknown[];
  commandBoundary?: CommandBoundary;
  currentStage?: string;
  file: string;
  humanChecklist?: string[];
  massSearchThemes?: unknown[];
  popularPromptLanes?: unknown[];
  priorityScore?: number;
  readyForHumanApproval?: boolean;
  seoWarnings?: unknown[];
  sourceReplacementDecisions?: unknown[];
  title: string;
  unsafeReasons?: unknown[];
};

type HumanApprovalQueue = {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  immediateItems?: ApprovalItem[];
  backlogItems?: ApprovalItem[];
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    projectedPublicPublishedAfterImmediateHumanApproval: number;
    publishConfirmCommandsIncluded: number;
  };
  summary: {
    backlogItems: number;
    immediateApprovalItems: number;
    items: number;
    itemsReadyForHumanApproval: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type SourceDecision = {
  alternatives?: Array<{ sourceType?: string; title?: string; url?: string }>;
  decisionOptions?: string[];
  file: string;
  finalUrl?: string;
  kind: string;
  manualChecklist?: string[];
  originalUrl?: string;
  recommendedCandidate?: { sourceType?: string; title?: string; url?: string } | null;
  unsafeReasons?: string[];
};

type SourceReplacementPack = {
  generatedAt: string;
  summary: { failedDecisionItems: number; items: number; unsafeItems: number };
  topItems?: SourceDecision[];
};

type SeoWarning = {
  file: string;
  manualActions?: string[];
  manualFixReady?: boolean;
  primaryKeyword?: string;
  schemaWarnings?: string[];
  snippetWarnings?: string[];
  status?: string;
  unsafeReasons?: string[];
};

type SeoWarningPack = {
  generatedAt: string;
  items?: SeoWarning[];
  summary: { blockingItems: number; items: number; trafficDataAvailable: boolean; unsafeItems: number };
};

type CopydeskBrief = {
  file: string;
  internalLink?: { currentPublicLinks?: number; title?: string; url?: string } | null;
  kind?: string;
  proposedDescription?: string;
  proposedOpeningAdditions?: string[];
  proposedTitle?: string;
  ready?: boolean;
  sourceWarnings?: string[];
  warningRemediation?: string[];
};

type ReviewOptimizationBrief = {
  generatedAt: string;
  nextBriefs?: CopydeskBrief[];
  summary: { briefs: number; readyBriefs: number; unsafeCommands: number };
};

type ClearanceItem = {
  alreadyPublished: boolean;
  articleState: ApprovalItem["articleState"];
  blockers: string[];
  clearanceActions: string[];
  commandBoundary: CommandBoundary | undefined;
  copydeskBrief: CopydeskBrief | null;
  file: string;
  hasFailedSourceDecision: boolean;
  immediate: boolean;
  massSearchThemes: number;
  popularPromptLanes: number;
  priorityScore: number;
  readyForHumanApproval: boolean;
  readyForClearanceReview: boolean;
  seoWarning: SeoWarning | null;
  sourceDecisions: SourceDecision[];
  title: string;
  unsafeReasons: string[];
};

function main() {
  const approvalQueue = readJson<HumanApprovalQueue>("content/automation/human-approval-execution-queue.json");
  const sourceReplacement = readJson<SourceReplacementPack>("content/automation/source-replacement-decision-pack.json");
  const seoWarning = readJson<SeoWarningPack>("content/automation/seo-warning-remediation-pack.json");
  const copydesk = readJson<ReviewOptimizationBrief>("content/automation/review-optimization-brief.json");

  const sourceByFile = groupByFile(sourceReplacement.topItems || []);
  const seoByFile = new Map((seoWarning.items || []).map((item) => [item.file, item]));
  const copydeskByFile = new Map((copydesk.nextBriefs || []).map((item) => [item.file, item]));
  const approvalItems = [
    ...(approvalQueue.immediateItems || []).map((item) => ({ item, immediate: true })),
    ...(approvalQueue.backlogItems || []).map((item) => ({ item, immediate: false })),
  ];
  const clearanceItems = approvalItems.map(({ item, immediate }) =>
    toClearanceItem(item, immediate, sourceByFile.get(item.file) || [], seoByFile.get(item.file) || null, copydeskByFile.get(item.file) || null),
  );
  const unsafeItems = clearanceItems.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only human approval clearance pack. It consolidates source, SEO, copydesk, and link issues before a human reviewer decides whether to run mark:review.",
      stopBefore: "Stop before source edits, metadata edits, mark:review, and publish. Every change requires human approval.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      approvalQueueGeneratedAt: approvalQueue.generatedAt,
      approvalQueueSummary: approvalQueue.summary,
      copydeskGeneratedAt: copydesk.generatedAt,
      copydeskSummary: copydesk.summary,
      sourceReplacementGeneratedAt: sourceReplacement.generatedAt,
      sourceReplacementSummary: sourceReplacement.summary,
      seoWarningGeneratedAt: seoWarning.generatedAt,
      seoWarningSummary: seoWarning.summary,
      trafficNote: "No measured traffic, ranking, impression, click, conversion, or revenue claim is made.",
    },
    publishingBoundary: approvalQueue.publishingBoundary,
    summary: {
      approvalItems: clearanceItems.length,
      backlogItems: clearanceItems.filter((item) => !item.immediate).length,
      clearanceActions: clearanceItems.reduce((sum, item) => sum + item.clearanceActions.length, 0),
      copydeskBriefItems: clearanceItems.filter((item) => item.copydeskBrief).length,
      failedSourceDecisionItems: clearanceItems.filter((item) => item.hasFailedSourceDecision).length,
      immediateItems: clearanceItems.filter((item) => item.immediate).length,
      itemsReadyForClearanceReview: clearanceItems.filter((item) => item.readyForClearanceReview).length,
      massSearchThemeItems: clearanceItems.filter((item) => item.massSearchThemes > 0).length,
      popularPromptLaneItems: clearanceItems.filter((item) => item.popularPromptLanes > 0).length,
      publishConfirmCommandsIncluded: countPublishConfirmCommands(clearanceItems),
      seoWarningItems: clearanceItems.filter((item) => item.seoWarning).length,
      sourceDecisionItems: clearanceItems.filter((item) => item.sourceDecisions.length > 0).length,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items: clearanceItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "human-approval-clearance-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "human-approval-clearance-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toClearanceItem(
  item: ApprovalItem,
  immediate: boolean,
  sourceDecisions: SourceDecision[],
  seoWarning: SeoWarning | null,
  copydeskBrief: CopydeskBrief | null,
): ClearanceItem {
  const blockers = [
    ...(item.blockers || []).map((blocker) => String(blocker)),
    ...(item.unsafeReasons || []).map((reason) => String(reason)),
  ];
  const hasFailedSourceDecision = sourceDecisions.some((decision) => decision.kind === "failed-url");
  const unsafeReasons = unsafeReasonsFor(item, sourceDecisions, seoWarning, copydeskBrief);
  return {
    alreadyPublished: item.alreadyPublished === true,
    articleState: item.articleState,
    blockers,
    clearanceActions: clearanceActionsFor(item, sourceDecisions, seoWarning, copydeskBrief),
    commandBoundary: item.commandBoundary,
    copydeskBrief,
    file: item.file,
    hasFailedSourceDecision,
    immediate,
    massSearchThemes: item.massSearchThemes?.length || 0,
    popularPromptLanes: item.popularPromptLanes?.length || 0,
    priorityScore: item.priorityScore || 0,
    readyForHumanApproval: item.readyForHumanApproval === true,
    readyForClearanceReview: unsafeReasons.length === 0 && item.readyForHumanApproval === true,
    seoWarning,
    sourceDecisions,
    title: item.title,
    unsafeReasons,
  };
}

function clearanceActionsFor(item: ApprovalItem, sourceDecisions: SourceDecision[], seoWarning: SeoWarning | null, copydeskBrief: CopydeskBrief | null) {
  const actions = [
    item.alreadyPublished === true ? "Confirm the public page still answers one clear search intent." : "Confirm the draft still answers one clear search intent.",
    "Verify source-backed claims before any status change.",
    item.alreadyPublished === true
      ? "Keep the published page indexable while applying only human-approved source, SEO, copydesk, or link improvements."
      : "Keep status=draft, noindex=true, and humanReviewRequired=true until approval.",
  ];
  for (const decision of sourceDecisions.slice(0, 3)) {
    if (decision.kind === "failed-url") {
      const recommended = decision.recommendedCandidate ? `${decision.recommendedCandidate.title}: ${decision.recommendedCandidate.url}` : "no recommended candidate";
      actions.push(`Resolve failed source URL ${decision.originalUrl || "unknown"}; recommended candidate: ${recommended}.`);
    } else if (decision.finalUrl) {
      actions.push(`Review redirect ${decision.originalUrl || "unknown"} -> ${decision.finalUrl} and approve or replace during human review.`);
    }
  }
  if (seoWarning) {
    for (const action of (seoWarning.manualActions || []).slice(0, 3)) actions.push(`SEO: ${action}`);
  }
  if (copydeskBrief?.internalLink?.url) {
    actions.push(`Review public internal link suggestion: ${copydeskBrief.internalLink.title || copydeskBrief.internalLink.url} (${copydeskBrief.internalLink.url}).`);
  }
  if (copydeskBrief?.proposedDescription) actions.push("Review proposed meta description from copydesk brief before approval.");
  if ((item.popularPromptLanes?.length || 0) > 0) actions.push("Check that popular prompt lane framing stays broad enough for real search demand.");
  if ((item.massSearchThemes?.length || 0) > 0) actions.push("Check that mass-search theme framing is covered without stuffing keywords.");
  actions.push("Run mark:review only after explicit human approval; publish confirm remains excluded.");
  return dedupe(actions);
}

function unsafeReasonsFor(item: ApprovalItem, sourceDecisions: SourceDecision[], seoWarning: SeoWarning | null, copydeskBrief: CopydeskBrief | null) {
  const reasons: string[] = [];
  const alreadyPublished = item.alreadyPublished === true && item.articleState?.status === "published" && item.articleState.noindex === false;
  if (!alreadyPublished && item.articleState?.status !== "draft") reasons.push(`article status is ${item.articleState?.status}, expected draft`);
  if (!alreadyPublished && item.articleState?.noindex !== true) reasons.push("article must remain noindex=true before approval");
  if (item.articleState?.humanReviewRequired !== true) reasons.push("article must keep humanReviewRequired=true before approval");
  if (item.articleState?.sourceNotes !== true) reasons.push("article must keep sourceNotes before approval");
  if ((item.articleState?.qualityScore || 0) < 100) reasons.push(`qualityScore ${item.articleState?.qualityScore || 0} below 100`);
  if (item.readyForHumanApproval !== true) reasons.push("approval queue item is not ready for human approval");
  if ((item.blockers?.length || 0) > 0) reasons.push("approval queue blockers are present");
  if ((item.unsafeReasons?.length || 0) > 0) reasons.push("approval queue unsafe reasons are present");
  if (!item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human")) reasons.push("mark:review command is missing --confirm-human boundary");
  if (item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm")) reasons.push("publish dry-run command includes --confirm");
  if (item.commandBoundary?.publishConfirm !== "not-included") reasons.push("publish confirm command is included");
  if (sourceDecisions.some((decision) => (decision.unsafeReasons?.length || 0) > 0)) reasons.push("source replacement decision has unsafe reasons");
  if (seoWarning && (seoWarning.unsafeReasons?.length || 0) > 0) reasons.push("SEO warning remediation has unsafe reasons");
  if (copydeskBrief && copydeskBrief.ready !== true) reasons.push("copydesk brief is not ready");
  return reasons;
}

function countPublishConfirmCommands(items: ClearanceItem[]) {
  return items.filter((item) => item.commandBoundary?.publishConfirm !== "not-included").length;
}

function groupByFile<T extends { file: string }>(items: T[]) {
  const grouped = new Map<string, T[]>();
  for (const item of items) grouped.set(item.file, [...(grouped.get(item.file) || []), item]);
  return grouped;
}

function dedupe(items: string[]) {
  return Array.from(new Set(items));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: ClearanceItem[];
  publishingBoundary: HumanApprovalQueue["publishingBoundary"];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, boolean | number>;
  unsafeItems: ClearanceItem[];
}) {
  const lines = [
    "# Human Approval Clearance Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It consolidates the source, SEO, copydesk, and link checks needed before a human reviewer approves any mark:review action.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Publishing Boundary",
    "",
    `- Current public published: ${payload.publishingBoundary.currentPublicPublished}`,
    `- Current publishable now: ${payload.publishingBoundary.currentPublishableNow}`,
    `- Projected public after immediate human approval: ${payload.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval}`,
    `- Publish confirm commands included: ${payload.publishingBoundary.publishConfirmCommandsIncluded}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.unsafeReasons.join("; ")}`) : ["- none"]),
    "",
    "## Clearance Items",
    "",
    "| Already published | Immediate | Ready | Priority | Source decisions | Failed source | SEO | Copydesk | Popular lanes | Mass themes | Title | File |",
    "| --- | --- | --- | ---: | ---: | --- | --- | --- | ---: | ---: | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.alreadyPublished} | ${item.immediate} | ${item.readyForClearanceReview} | ${item.priorityScore} | ${item.sourceDecisions.length} | ${item.hasFailedSourceDecision} | ${Boolean(item.seoWarning)} | ${Boolean(item.copydeskBrief)} | ${item.popularPromptLanes} | ${item.massSearchThemes} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Item Actions",
    "",
    ...payload.items.flatMap((item) => [
      `### ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Already published: ${item.alreadyPublished}`,
      `- Immediate: ${item.immediate}`,
      `- Ready for clearance review: ${item.readyForClearanceReview}`,
      `- Source decisions: ${item.sourceDecisions.length}`,
      `- Failed source decision: ${item.hasFailedSourceDecision}`,
      `- SEO warning: ${Boolean(item.seoWarning)}`,
      `- Copydesk brief: ${Boolean(item.copydeskBrief)}`,
      `- Popular prompt lanes: ${item.popularPromptLanes}`,
      `- Mass search themes: ${item.massSearchThemes}`,
      "",
      ...item.clearanceActions.map((action) => `- ${action}`),
      "",
    ]),
  ];
  return `${lines.join("\n").trimEnd()}\n`;
}

main();

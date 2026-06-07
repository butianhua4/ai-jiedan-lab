import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type Status = "blocked" | "open" | "evidence-ready" | "resolved" | "manual-only";

type DecisionMatrix = {
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
  };
  rows: Array<{
    approveAfterHumanReviewCommand: string;
    currentState: string;
    file: string;
    lane: string;
    nextDecision: string;
    primaryQuery: string;
    publishConfirm: "not-included";
    readyForHumanApproval: boolean;
    repairBeforeApproval: string[];
    title: string;
  }>;
  summary: { decisionRows: number; repairBeforeReviewItems: number; unsafeItems: number };
};

type RepairQueue = {
  summary: {
    minimumPathFiles: number;
    minimumPathTasks: number;
    publishConfirmCommandsIncluded: number;
    repairBeforeReviewItems: number;
    tasks: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type RouteItem = {
  file: string;
  fullTaskCount: number;
  highRiskTasks: number;
  lane: string;
  manualOnlyCommands: { markReviewAfterExplicitApproval: string; rerunAfterRepair: string[] };
  minimumPathCategories: string[];
  minimumPathTasks: Array<{ action: string; category: string; proofRequired: string; severity: string; taskId: string }>;
  nextDecision: string;
  primaryQuery: string;
  publishConfirm: "not-included";
  repairSessions: Array<{ categories: string[]; name: string; proofRequired: string[] }>;
  routeRank: number;
  title: string;
  unsafeReasons: string[];
};

type RepairRoute = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  publishingBoundary: DecisionMatrix["publishingBoundary"];
  routeItems: RouteItem[];
  summary: {
    filesRouted: number;
    minimumPathTasks: number;
    publishConfirmCommandsIncluded: number;
    repairBeforeReviewItems: number;
    routeSessions: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type SearchIntentBrief = {
  items: Array<{
    file: string;
    readyForHumanReview: boolean;
    searchWeaknesses: string[];
    titleQueryHits: string[];
    descriptionQueryHits: string[];
    bodyQueryHits: string[];
    headingQueryHits: string[];
  }>;
  summary: { items: number; searchWeakItems: number; unsafeItems: number };
};

type InternalLinkBrief = {
  items: Array<{
    file: string;
    linksToPublicArticles: number;
    readyForHumanReview: boolean;
    safeDraft: boolean;
    suggestions: unknown[];
  }>;
  summary: { items: number; itemsMissingCurrentPublicLink: number; itemsWithSuggestions: number; publicArticles: number; unsafeItems: number };
};

type SourceVerificationBrief = {
  items: Array<{
    approvalChecklist: string[];
    factCheckQueries: string[];
    file: string;
    readyForHumanReview: boolean;
    reachableSources: number;
    riskReviewChecklist: string[];
  }>;
  summary: { items: number; itemsWithFactCheckQueries: number; itemsWithReachableSources: number; unsafeItems: number };
};

type ApprovalRemediationPack = {
  items: Array<{
    file: string;
    humanChecklist: string[];
    internalLinkFixes: string[];
    manualFixReady: boolean;
    remediationReasons: string[];
    searchFixes: string[];
    sourceChecks: string[];
    sourceUrlFixes: string[];
    title: string;
    unsafeReasons: string[];
  }>;
  summary: { items: number; sourceUrlFixActions: number; unsafeItems: number };
};

type ProgressCategory = {
  category: string;
  detail: string;
  evidence: Record<string, unknown>;
  nextAction: string;
  proofRequired: string;
  status: Status;
};

type ProgressItem = {
  categories: ProgressCategory[];
  file: string;
  highRiskTasks: number;
  lane: string;
  manualOnlyCommand: string;
  nextManualSession: { categories: string[]; name: string; proofRequired: string[] } | null;
  openCategories: string[];
  primaryQuery: string;
  publishConfirm: "not-included";
  readyForHumanApprovalAfterRepair: boolean;
  routeRank: number;
  title: string;
  unsafeReasons: string[];
};

function main() {
  const matrix = readJson<DecisionMatrix>("content/automation/human-approval-decision-matrix.json");
  const queue = readJson<RepairQueue>("content/automation/human-approval-repair-queue.json");
  const route = readJson<RepairRoute>("content/automation/human-approval-repair-route.json");
  const search = readJson<SearchIntentBrief>("content/automation/autopilot-search-intent-brief.json");
  const internalLinks = readJson<InternalLinkBrief>("content/automation/autopilot-internal-link-brief.json");
  const sources = readJson<SourceVerificationBrief>("content/automation/autopilot-source-verification-brief.json");
  const remediation = readJson<ApprovalRemediationPack>("content/automation/autopilot-approval-remediation-pack.json");

  const matrixByFile = byFile(matrix.rows);
  const searchByFile = byFile(search.items);
  const internalByFile = byFile(internalLinks.items);
  const sourceByFile = byFile(sources.items);
  const remediationByFile = byFile(remediation.items);

  const items = route.routeItems.map((item) =>
    buildProgressItem(item, matrixByFile.get(item.file), searchByFile.get(item.file), internalByFile.get(item.file), sourceByFile.get(item.file), remediationByFile.get(item.file)),
  );
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const allCategories = items.flatMap((item) => item.categories);
  const counts = countStatuses(allCategories);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only repair progress tracker. It compares the manual repair route with current evidence and stops before article edits, mark:review, or publish.",
      stopBefore: "Use this report to decide the next manual repair session. It does not make or approve article changes.",
      trafficClaim: "not-included",
    },
    publishingBoundary: route.publishingBoundary,
    sourceEvidence: {
      decisionMatrixItems: matrix.summary.decisionRows,
      decisionMatrixRepairItems: matrix.summary.repairBeforeReviewItems,
      decisionMatrixUnsafeItems: matrix.summary.unsafeItems,
      internalLinkItems: internalLinks.summary.items,
      internalLinkUnsafeItems: internalLinks.summary.unsafeItems,
      repairQueueMinimumPathFiles: queue.summary.minimumPathFiles,
      repairQueueMinimumPathTasks: queue.summary.minimumPathTasks,
      repairQueueUnsafeItems: queue.summary.unsafeItems,
      routeFiles: route.summary.filesRouted,
      routeSessions: route.summary.routeSessions,
      routeUnsafeItems: route.summary.unsafeItems,
      searchIntentItems: search.summary.items,
      searchIntentUnsafeItems: search.summary.unsafeItems,
      sourceVerificationItems: sources.summary.items,
      sourceVerificationUnsafeItems: sources.summary.unsafeItems,
      sourceUrlFixActions: remediation.summary.sourceUrlFixActions,
      remediationUnsafeItems: remediation.summary.unsafeItems,
    },
    summary: {
      blockedCategories: counts.blocked,
      categoriesTracked: allCategories.length,
      evidenceReadyCategories: counts["evidence-ready"],
      filesReadyForHumanApprovalAfterRepair: items.filter((item) => item.readyForHumanApprovalAfterRepair).length,
      filesTracked: items.length,
      manualOnlyCategories: counts["manual-only"],
      nextRepairFile: items.find((item) => item.openCategories.length > 0)?.file || null,
      nextRepairTitle: items.find((item) => item.openCategories.length > 0)?.title || null,
      openCategories: counts.open,
      publishConfirmCommandsIncluded: 0,
      resolvedCategories: counts.resolved,
      routeSessions: route.summary.routeSessions,
      trafficDataAvailable: route.summary.trafficDataAvailable,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "human-approval-repair-progress.json");
  const mdTarget = path.join(process.cwd(), "docs", "human-approval-repair-progress.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function buildProgressItem(
  route: RouteItem,
  matrix: DecisionMatrix["rows"][number] | undefined,
  search: SearchIntentBrief["items"][number] | undefined,
  internalLinks: InternalLinkBrief["items"][number] | undefined,
  source: SourceVerificationBrief["items"][number] | undefined,
  remediation: ApprovalRemediationPack["items"][number] | undefined,
): ProgressItem {
  const categories = [
    sourceUrlProgress(remediation),
    sourceReviewProgress(source),
    searchIntentProgress(search),
    internalLinkProgress(internalLinks),
    copydeskProgress(remediation),
    approvalBoundaryProgress(route, matrix),
  ];
  const openCategories = categories.filter((item) => item.status === "open" || item.status === "blocked").map((item) => item.category);
  const unsafeReasons = [
    route.publishConfirm === "not-included" ? "" : "route includes publish confirmation",
    route.manualOnlyCommands.markReviewAfterExplicitApproval.includes("--confirm-human") ? "" : "manual review command lacks explicit human confirmation",
    matrix?.publishConfirm === "not-included" ? "" : "decision matrix publish confirmation is not blocked",
    route.unsafeReasons.length === 0 ? "" : `route unsafe reasons remain: ${route.unsafeReasons.join("; ")}`,
  ].filter(Boolean);

  return {
    categories,
    file: route.file,
    highRiskTasks: route.highRiskTasks,
    lane: route.lane,
    manualOnlyCommand: route.manualOnlyCommands.markReviewAfterExplicitApproval,
    nextManualSession: nextSession(route, openCategories),
    openCategories,
    primaryQuery: route.primaryQuery,
    publishConfirm: "not-included",
    readyForHumanApprovalAfterRepair: unsafeReasons.length === 0 && openCategories.length === 0,
    routeRank: route.routeRank,
    title: route.title,
    unsafeReasons,
  };
}

function sourceUrlProgress(remediation: ApprovalRemediationPack["items"][number] | undefined): ProgressCategory {
  const openFixes = remediation?.sourceUrlFixes.length || 0;
  return {
    category: "source-url",
    detail: openFixes > 0 ? `${openFixes} source URL remediation action(s) still need human confirmation.` : "No source URL remediation actions remain.",
    evidence: { sourceUrlFixes: openFixes },
    nextAction: openFixes > 0 ? "Open each failed source URL manually, replace dead URLs with accessible canonical sources, then rerun automation." : "Keep source URL evidence attached for human review.",
    proofRequired: "Reviewer confirms final source URLs are canonical or replaced with accessible equivalents.",
    status: openFixes > 0 ? "open" : "resolved",
  };
}

function sourceReviewProgress(source: SourceVerificationBrief["items"][number] | undefined): ProgressCategory {
  const factCheckQueries = source?.factCheckQueries.length || 0;
  const reachableSources = source?.reachableSources || 0;
  const riskChecks = source?.riskReviewChecklist.length || 0;
  const approvalChecks = source?.approvalChecklist.length || 0;
  const evidenceReady = source?.readyForHumanReview === true && factCheckQueries > 0 && reachableSources > 0 && riskChecks > 0 && approvalChecks > 0;
  return {
    category: "source-review",
    detail: evidenceReady ? "Source review evidence is ready, but human confirmation is still required before mark:review." : "Source review evidence is incomplete.",
    evidence: { approvalChecks, factCheckQueries, reachableSources, readyForHumanReview: source?.readyForHumanReview === true, riskChecks },
    nextAction: evidenceReady ? "Human reviewer verifies fast-changing claims against the listed sources." : "Regenerate source verification or add source/fact-check evidence before review.",
    proofRequired: "Reviewer records source/fact-check confirmation and removes unsupported claims.",
    status: evidenceReady ? "evidence-ready" : "blocked",
  };
}

function searchIntentProgress(search: SearchIntentBrief["items"][number] | undefined): ProgressCategory {
  const weaknesses = search?.searchWeaknesses.length ?? null;
  return {
    category: "search-intent",
    detail: weaknesses === null ? "Search intent evidence is missing." : weaknesses > 0 ? `${weaknesses} search-intent weakness(es) remain.` : "Search intent weaknesses are resolved.",
    evidence: {
      bodyHits: search?.bodyQueryHits.length || 0,
      descriptionHits: search?.descriptionQueryHits.length || 0,
      headingHits: search?.headingQueryHits.length || 0,
      readyForHumanReview: search?.readyForHumanReview === true,
      titleHits: search?.titleQueryHits.length || 0,
      weaknesses,
    },
    nextAction:
      weaknesses === null
        ? "Rerun search intent brief."
        : weaknesses > 0
          ? "Adjust title, description, opening, heading, or body so the accepted query appears naturally."
          : "Keep query alignment unchanged for human review.",
    proofRequired: "Primary query or accepted equivalent appears naturally in title, description, opening, and headings/body.",
    status: weaknesses === null ? "blocked" : weaknesses > 0 ? "open" : "resolved",
  };
}

function internalLinkProgress(internalLinks: InternalLinkBrief["items"][number] | undefined): ProgressCategory {
  const linksToPublic = internalLinks?.linksToPublicArticles ?? null;
  const suggestions = internalLinks?.suggestions.length || 0;
  return {
    category: "internal-link",
    detail: linksToPublic === null ? "Internal-link evidence is missing." : linksToPublic > 0 ? "At least one contextual public article link is present." : "No current link to a published article.",
    evidence: { linksToPublicArticles: linksToPublic, readyForHumanReview: internalLinks?.readyForHumanReview === true, safeDraft: internalLinks?.safeDraft === true, suggestions },
    nextAction:
      linksToPublic === null
        ? "Rerun internal link brief."
        : linksToPublic > 0
          ? "Keep the contextual public link if it helps the reader."
          : "Add one useful contextual link to a currently published relevant article.",
    proofRequired: "Draft contains at least one contextual link to a currently published relevant article.",
    status: linksToPublic === null ? "blocked" : linksToPublic > 0 ? "resolved" : suggestions > 0 ? "open" : "blocked",
  };
}

function copydeskProgress(remediation: ApprovalRemediationPack["items"][number] | undefined): ProgressCategory {
  const evidenceText = [...(remediation?.remediationReasons || []), ...(remediation?.humanChecklist || [])].join("\n").toLowerCase();
  const hasWarning = evidenceText.includes("copydesk") || evidenceText.includes("warning");
  return {
    category: "copydesk",
    detail: hasWarning ? "Copydesk warning remediation still needs human acceptance or cleanup." : "No copydesk warning is listed in the remediation pack.",
    evidence: { humanChecklistItems: remediation?.humanChecklist.length || 0, remediationReasons: remediation?.remediationReasons.length || 0, warningDetected: hasWarning },
    nextAction: hasWarning ? "Resolve or explicitly accept the copydesk warning without weakening guardrails." : "No copydesk action required.",
    proofRequired: "Reviewer resolves or explicitly accepts copydesk warning without weakening guardrails.",
    status: hasWarning ? "open" : "resolved",
  };
}

function approvalBoundaryProgress(route: RouteItem, matrix: DecisionMatrix["rows"][number] | undefined): ProgressCategory {
  const commandSafe = route.manualOnlyCommands.markReviewAfterExplicitApproval.includes("--confirm-human");
  const stateSafe = Boolean(matrix?.currentState.includes("draft") && matrix.currentState.includes("noindex=true") && matrix.currentState.includes("humanReview=true"));
  const publishSafe = route.publishConfirm === "not-included" && matrix?.publishConfirm === "not-included";
  const decisionSafe = route.nextDecision === "repair-before-review" && matrix?.nextDecision === "repair-before-review";
  const safe = commandSafe && stateSafe && publishSafe && decisionSafe;
  return {
    category: "approval-boundary",
    detail: safe ? "Manual approval boundary is intact and publish confirmation is not included." : "Manual approval boundary has a blocking mismatch.",
    evidence: { commandSafe, currentState: matrix?.currentState || "missing", decisionSafe, publishSafe },
    nextAction: safe ? "Do not run mark:review until explicit human approval per file." : "Fix command/status boundary before any review action.",
    proofRequired: "Draft remains status=draft, noindex=true, humanReviewRequired=true until explicit approval.",
    status: safe ? "manual-only" : "blocked",
  };
}

function nextSession(route: RouteItem, openCategories: string[]) {
  if (!openCategories.length) return null;
  return (
    route.repairSessions.find((session) => session.categories.some((category) => openCategories.includes(category))) || {
      categories: openCategories,
      name: "manual repair follow-up",
      proofRequired: [],
    }
  );
}

function countStatuses(categories: ProgressCategory[]) {
  const initial: Record<Status, number> = { blocked: 0, open: 0, "evidence-ready": 0, resolved: 0, "manual-only": 0 };
  for (const category of categories) initial[category.status] += 1;
  return initial;
}

function byFile<T extends { file: string }>(items: T[]) {
  return new Map(items.map((item) => [item.file, item]));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: ProgressItem[];
  publishingBoundary: DecisionMatrix["publishingBoundary"];
  sourceEvidence: Record<string, number>;
  summary: {
    blockedCategories: number;
    categoriesTracked: number;
    evidenceReadyCategories: number;
    filesReadyForHumanApprovalAfterRepair: number;
    filesTracked: number;
    manualOnlyCategories: number;
    nextRepairFile: string | null;
    nextRepairTitle: string | null;
    openCategories: number;
    publishConfirmCommandsIncluded: number;
    resolvedCategories: number;
    routeSessions: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  unsafeItems: ProgressItem[];
}) {
  return [
    "# Human Approval Repair Progress",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It tracks whether repair-route categories are still open, blocked, evidence-ready, resolved, or manual-only.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Publishing Boundary",
    "",
    `- Current public published: ${payload.publishingBoundary.currentPublicPublished}`,
    `- Current publishable now: ${payload.publishingBoundary.currentPublishableNow}`,
    `- Publish confirm commands included: ${payload.publishingBoundary.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${payload.publishingBoundary.trafficDataAvailable}`,
    "",
    "## Summary",
    "",
    `- Files tracked: ${payload.summary.filesTracked}`,
    `- Categories tracked: ${payload.summary.categoriesTracked}`,
    `- Open categories: ${payload.summary.openCategories}`,
    `- Blocked categories: ${payload.summary.blockedCategories}`,
    `- Evidence-ready categories: ${payload.summary.evidenceReadyCategories}`,
    `- Resolved categories: ${payload.summary.resolvedCategories}`,
    `- Manual-only categories: ${payload.summary.manualOnlyCategories}`,
    `- Files ready for human approval after repair: ${payload.summary.filesReadyForHumanApprovalAfterRepair}`,
    `- Next repair title: ${payload.summary.nextRepairTitle || "none"}`,
    `- Next repair file: ${payload.summary.nextRepairFile || "none"}`,
    `- Route sessions: ${payload.summary.routeSessions}`,
    `- Publish confirm commands included: ${payload.summary.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${payload.summary.trafficDataAvailable}`,
    `- Unsafe items: ${payload.summary.unsafeItems}`,
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...progressTable(payload.unsafeItems),
    "",
    "## Progress By File",
    "",
    ...payload.items.flatMap(progressSection),
    "",
  ].join("\n");
}

function progressTable(items: ProgressItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Rank | Open categories | Ready after repair | Title | File |",
    "| ---: | --- | --- | --- | --- |",
    ...items.map((item) => `| ${item.routeRank} | ${item.openCategories.join(", ") || "none"} | ${item.readyForHumanApprovalAfterRepair} | ${escapeMd(item.title)} | ${item.file} |`),
  ];
}

function progressSection(item: ProgressItem) {
  return [
    `### ${escapeMd(item.title)}`,
    "",
    `- File: ${item.file}`,
    `- Lane: ${item.lane}`,
    `- Primary query: ${item.primaryQuery}`,
    `- Open categories: ${item.openCategories.join(", ") || "none"}`,
    `- Ready for human approval after repair: ${item.readyForHumanApprovalAfterRepair}`,
    `- Next manual session: ${item.nextManualSession ? item.nextManualSession.name : "none"}`,
    `- Manual mark-review command after explicit approval: \`${item.manualOnlyCommand}\``,
    "",
    "| Category | Status | Detail | Next action | Proof required |",
    "| --- | --- | --- | --- | --- |",
    ...item.categories.map((category) => `| ${category.category} | ${category.status} | ${escapeMd(category.detail)} | ${escapeMd(category.nextAction)} | ${escapeMd(category.proofRequired)} |`),
    "",
  ];
}

function escapeMd(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

main();

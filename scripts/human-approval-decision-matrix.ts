import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type ApprovalPacket = {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  items: Array<{
    articleMeta: { humanReviewRequired: boolean; noindex: boolean; qualityScore?: number; status: string };
    assignmentLane: string;
    autopilotScore: number;
    commandBoundary: CommandBoundary;
    file: string;
    readyForHumanApproval: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
  }>;
  summary: { items: number; queueUnsafeItems: number; readyForHumanApproval: number; unsafeItems: number };
};

type ProjectStatus = {
  articles: {
    publicPublished: number;
    publishableNow: unknown[];
  };
};

type HumanReviewPlaybook = {
  items: Array<{
    file: string;
    internalLinkActions: string[];
    readyForHumanReview: boolean;
    safeDraft: boolean;
    searchActions: string[];
    sourceActions: string[];
  }>;
  summary: { unsafeItems: number };
};

type SearchIntentBrief = {
  items: Array<{
    file: string;
    primaryQuery: string;
    searchWeaknesses: string[];
  }>;
  summary: { unsafeItems: number };
};

type InternalLinkBrief = {
  items: Array<{
    file: string;
    linksToPublicArticles: number;
    suggestions: Array<{ title: string; url: string }>;
  }>;
  summary: { unsafeItems: number };
};

type SourceVerificationBrief = {
  items: Array<{
    file: string;
    factCheckQueries: string[];
    readyForHumanReview: boolean;
    reachableSources: number;
    riskReviewChecklist: string[];
  }>;
  summary: { unsafeItems: number };
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
    unsafeReasons: string[];
  }>;
  summary: { unsafeItems: number };
};

type DecisionRow = {
  approveAfterHumanReviewCommand: string;
  autopilotScore: number;
  currentState: string;
  deferIf: string[];
  file: string;
  humanDecisionBranches: string[];
  internalLinkReady: boolean;
  lane: string;
  manualFixReady: boolean;
  nextDecision: "approve-after-review" | "repair-before-review" | "defer";
  primaryQuery: string;
  publishConfirm: "not-included";
  readyForHumanApproval: boolean;
  remediationReasons: string[];
  repairBeforeApproval: string[];
  riskChecks: number;
  searchReady: boolean;
  searchWeaknesses: string[];
  sourceReady: boolean;
  title: string;
};

function main() {
  const approval = readJson<ApprovalPacket>("content/automation/autopilot-approval-packet.json");
  const projectStatus = readJson<ProjectStatus>("content/automation/project-status.json");
  const playbook = readJson<HumanReviewPlaybook>("content/automation/autopilot-human-review-playbook.json");
  const search = readJson<SearchIntentBrief>("content/automation/autopilot-search-intent-brief.json");
  const links = readJson<InternalLinkBrief>("content/automation/autopilot-internal-link-brief.json");
  const sources = readJson<SourceVerificationBrief>("content/automation/autopilot-source-verification-brief.json");
  const remediation = readJson<ApprovalRemediationPack>("content/automation/autopilot-approval-remediation-pack.json");

  const playbookByFile = byFile(playbook.items);
  const searchByFile = byFile(search.items);
  const linksByFile = byFile(links.items);
  const sourcesByFile = byFile(sources.items);
  const remediationByFile = byFile(remediation.items);

  const rows = approval.items.map((item) =>
    toRow(item, {
      link: linksByFile.get(item.file),
      playbook: playbookByFile.get(item.file),
      remediation: remediationByFile.get(item.file),
      search: searchByFile.get(item.file),
      source: sourcesByFile.get(item.file),
    }),
  );
  const unsafeRows = rows.filter((row) => row.publishConfirm !== "not-included" || !row.approveAfterHumanReviewCommand.includes("--confirm-human"));
  const repairRows = rows.filter((row) => row.nextDecision === "repair-before-review");
  const approveRows = rows.filter((row) => row.nextDecision === "approve-after-review");

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only human approval decision matrix. It compresses review evidence into approve, repair, or defer decisions and stops before status changes.",
      stopBefore: "Run mark:review only after explicit human approval per file. Publish confirm is not included.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      approvalPacketItems: approval.summary.items,
      approvalPacketUnsafeItems: approval.summary.unsafeItems + approval.summary.queueUnsafeItems,
      internalLinkUnsafeItems: links.summary.unsafeItems,
      playbookUnsafeItems: playbook.summary.unsafeItems,
      remediationUnsafeItems: remediation.summary.unsafeItems,
      searchIntentUnsafeItems: search.summary.unsafeItems,
      sourceVerificationUnsafeItems: sources.summary.unsafeItems,
    },
    publishingBoundary: {
      currentPublicPublished: projectStatus.articles.publicPublished,
      currentPublishableNow: projectStatus.articles.publishableNow.length,
      publishConfirmCommandsIncluded: 0,
      trafficDataAvailable: approval.boundaries.trafficDataAvailable,
    },
    summary: {
      approvalItems: approval.items.length,
      approveAfterReviewItems: approveRows.length,
      decisionRows: rows.length,
      deferItems: rows.filter((row) => row.nextDecision === "defer").length,
      humanDecisionBranches: rows.reduce((total, row) => total + row.humanDecisionBranches.length, 0),
      repairBeforeReviewItems: repairRows.length,
      rowsWithCommandBoundary: rows.filter((row) => row.approveAfterHumanReviewCommand.includes("--confirm-human") && row.publishConfirm === "not-included").length,
      rowsWithDeferCriteria: rows.filter((row) => row.deferIf.length > 0).length,
      rowsWithRepairActions: rows.filter((row) => row.repairBeforeApproval.length > 0).length,
      sourceReadyRows: rows.filter((row) => row.sourceReady).length,
      trafficDataAvailable: approval.boundaries.trafficDataAvailable,
      unsafeItems: unsafeRows.length,
    },
    unsafeRows,
    rows,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "human-approval-decision-matrix.json");
  const mdTarget = path.join(process.cwd(), "docs", "human-approval-decision-matrix.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeRows.length === 0 && rows.length === approval.items.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeRows.length || rows.length !== approval.items.length) process.exitCode = 1;
}

function toRow(
  item: ApprovalPacket["items"][number],
  context: {
    link?: InternalLinkBrief["items"][number];
    playbook?: HumanReviewPlaybook["items"][number];
    remediation?: ApprovalRemediationPack["items"][number];
    search?: SearchIntentBrief["items"][number];
    source?: SourceVerificationBrief["items"][number];
  },
): DecisionRow {
  const safeDraft = item.articleMeta.status === "draft" && item.articleMeta.noindex === true && item.articleMeta.humanReviewRequired === true;
  const sourceReady = Boolean(context.source?.readyForHumanReview && (context.source.reachableSources || 0) > 0 && (context.source.factCheckQueries?.length || 0) > 0);
  const internalLinkReady = Boolean((context.link?.suggestions?.length || 0) > 0 || (context.link?.linksToPublicArticles || 0) > 0);
  const searchWeaknesses = context.search?.searchWeaknesses || [];
  const searchReady = searchWeaknesses.length === 0;
  const remediationReasons = context.remediation?.remediationReasons || [];
  const manualFixReady = Boolean(context.remediation?.manualFixReady && (context.remediation.unsafeReasons?.length || 0) === 0);
  const repairBeforeApproval = dedupe([
    ...searchWeaknesses.map((item) => `Resolve or explicitly accept search weakness: ${item}.`),
    ...(context.remediation?.internalLinkFixes || []).slice(0, 2),
    ...(context.remediation?.searchFixes || []).slice(0, 2),
    ...(context.remediation?.sourceUrlFixes || []).slice(0, 2),
  ]);
  const deferIf = [
    sourceReady ? "" : "official source verification is incomplete",
    safeDraft ? "" : "article is not a safe draft",
    item.readyForHumanApproval ? "" : "approval packet does not mark this item ready",
    manualFixReady ? "" : "manual remediation pack is not ready",
  ].filter(Boolean);
  const nextDecision = deferIf.length ? "defer" : repairBeforeApproval.length ? "repair-before-review" : "approve-after-review";

  return {
    approveAfterHumanReviewCommand: item.commandBoundary.markReviewAfterHumanApproval,
    autopilotScore: item.autopilotScore,
    currentState: `${item.articleMeta.status}/noindex=${item.articleMeta.noindex}/humanReview=${item.articleMeta.humanReviewRequired}`,
    deferIf,
    file: item.file,
    humanDecisionBranches: [
      "Approve: reviewer confirms sources, search intent, internal link, risk language, and no unsupported traffic or outcome claims.",
      "Repair: reviewer applies the listed copy/search/source/link fixes, then reruns automation before approval.",
      "Defer: reviewer cannot verify sources, search intent, or safety boundary confidently.",
    ],
    internalLinkReady,
    lane: item.assignmentLane,
    manualFixReady,
    nextDecision,
    primaryQuery: context.search?.primaryQuery || item.searchQueries[0] || "",
    publishConfirm: item.commandBoundary.publishConfirm,
    readyForHumanApproval: item.readyForHumanApproval && Boolean(context.playbook?.readyForHumanReview) && safeDraft,
    remediationReasons,
    repairBeforeApproval,
    riskChecks: context.source?.riskReviewChecklist.length || 0,
    searchReady,
    searchWeaknesses,
    sourceReady,
    title: item.title,
  };
}

function byFile<T extends { file: string }>(items: T[]) {
  return new Map(items.map((item) => [item.file, item]));
}

function dedupe(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  publishingBoundary: { currentPublicPublished: number; currentPublishableNow: number; publishConfirmCommandsIncluded: number; trafficDataAvailable: boolean };
  rows: DecisionRow[];
  sourceEvidence: Record<string, number>;
  summary: Record<string, number | boolean>;
  unsafeRows: DecisionRow[];
}) {
  const lines = [
    "# Human Approval Decision Matrix",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It gives reviewers one decision row per approval candidate and stops before mark:review or publish.",
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
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Decision Rows",
    "",
    "| Decision | Score | Source | Search | Link | Fix ready | Risk checks | Primary query | Title | File |",
    "| --- | ---: | --- | --- | --- | --- | ---: | --- | --- | --- |",
    ...payload.rows.map(
      (row) =>
        `| ${row.nextDecision} | ${row.autopilotScore} | ${row.sourceReady} | ${row.searchReady ? "ready" : `${row.searchWeaknesses.length} weakness(es)`} | ${row.internalLinkReady} | ${row.manualFixReady} | ${row.riskChecks} | ${row.primaryQuery} | ${row.title} | ${row.file} |`,
    ),
    "",
    "## Repair Before Approval",
    "",
    ...payload.rows.flatMap((row) => [
      `### ${row.title}`,
      "",
      `- File: ${row.file}`,
      `- Current state: ${row.currentState}`,
      `- Mark review after approval: ${row.approveAfterHumanReviewCommand}`,
      `- Publish confirm: ${row.publishConfirm}`,
      `- Defer if: ${row.deferIf.join("; ") || "none"}`,
      `- Remediation reasons: ${row.remediationReasons.join("; ") || "none"}`,
      "",
      ...(row.repairBeforeApproval.length ? row.repairBeforeApproval.map((item) => `- ${item}`) : ["- No repair actions required before approval."]),
      "",
    ]),
  ];

  return lines.join("\n");
}

main();

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
    commandBoundary: CommandBoundary;
    file: string;
    readyForHumanApproval: boolean;
    reviewFocus: string[];
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
  }>;
  summary: { items: number; unsafeItems: number };
};

type SearchIntentBrief = {
  items: Array<{
    file: string;
    primaryQuery: string;
    reviewSuggestions: string[];
    searchWeaknesses: string[];
  }>;
  summary: { searchWeakItems: number; unsafeItems: number };
};

type InternalLinkBrief = {
  items: Array<{
    file: string;
    linksToPublicArticles: number;
    suggestions: Array<{ reason: string; title: string; url: string }>;
  }>;
  summary: { itemsMissingCurrentPublicLink: number; unsafeItems: number };
};

type SourceVerificationBrief = {
  items: Array<{
    factCheckQueries: string[];
    file: string;
    reachableSources: number;
    riskReviewChecklist: string[];
    uniqueReachableUrls: string[];
  }>;
  summary: { unsafeItems: number };
};

type SourceTargetRemediationPack = {
  items: Array<{
    affectedFiles: string[];
    finalUrl?: string;
    kind: string;
    manualActions: string[];
    manualFixReady: boolean;
    replacementPlan: string[];
    unsafeReasons: string[];
    url: string;
  }>;
  summary: {
    items: number;
    manualFixReadyItems: number;
    unsafeItems: number;
  };
};

type HumanReviewPlaybook = {
  items: Array<{
    file: string;
    internalLinkActions: string[];
    readyForHumanReview: boolean;
    searchActions: string[];
    sourceActions: string[];
  }>;
  summary: { unsafeItems: number };
};

type OptimizationBrief = {
  briefs: Array<{
    file: string;
    internalLink: { title: string; url: string } | null;
    proposedDescription: string;
    proposedOpeningAdditions: string[];
    proposedTitle: string;
    warningRemediation: string[];
  }>;
  summary: { unsafeCommands: number };
};

type RemediationItem = {
  commandBoundary: CommandBoundary;
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
};

function main() {
  const approval = readJson<ApprovalPacket>("content/automation/autopilot-approval-packet.json");
  const search = readJson<SearchIntentBrief>("content/automation/autopilot-search-intent-brief.json");
  const links = readJson<InternalLinkBrief>("content/automation/autopilot-internal-link-brief.json");
  const source = readJson<SourceVerificationBrief>("content/automation/autopilot-source-verification-brief.json");
  const sourceTargetRemediation = readJson<SourceTargetRemediationPack>("content/automation/source-target-remediation-pack.json");
  const playbook = readJson<HumanReviewPlaybook>("content/automation/autopilot-human-review-playbook.json");
  const optimization = readJson<OptimizationBrief>("content/automation/review-optimization-brief.json");

  const searchByFile = new Map(search.items.map((item) => [item.file, item]));
  const linksByFile = new Map(links.items.map((item) => [item.file, item]));
  const sourceByFile = new Map(source.items.map((item) => [item.file, item]));
  const sourceTargetRemediationByFile = new Map<string, SourceTargetRemediationPack["items"]>();
  for (const item of sourceTargetRemediation.items) {
    for (const file of item.affectedFiles) {
      const current = sourceTargetRemediationByFile.get(file) || [];
      current.push(item);
      sourceTargetRemediationByFile.set(file, current);
    }
  }
  const playbookByFile = new Map(playbook.items.map((item) => [item.file, item]));
  const optimizationByFile = new Map(optimization.briefs.map((item) => [item.file, item]));

  const items = approval.items.map((item) =>
    toRemediationItem(
      item,
      searchByFile.get(item.file),
      linksByFile.get(item.file),
      sourceByFile.get(item.file),
      sourceTargetRemediationByFile.get(item.file) || [],
      playbookByFile.get(item.file),
      optimizationByFile.get(item.file),
    ),
  );
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      trafficClaim: "not-included",
      note: "Read-only approval remediation pack. It consolidates search, internal-link, source, and copydesk fixes for the current approval packet without editing drafts.",
      stopBefore: "Use these fixes during human review only. mark:review requires explicit human approval per file; publish --confirm is not included.",
    },
    boundaries: approval.boundaries,
    sourceEvidence: {
      approvalPacketItems: approval.summary.items,
      approvalPacketUnsafeItems: approval.summary.unsafeItems,
      internalLinkUnsafeItems: links.summary.unsafeItems,
      itemsMissingCurrentPublicLink: links.summary.itemsMissingCurrentPublicLink,
      optimizationUnsafeCommands: optimization.summary.unsafeCommands,
      searchIntentUnsafeItems: search.summary.unsafeItems,
      searchWeakItems: search.summary.searchWeakItems,
      sourceVerificationUnsafeItems: source.summary.unsafeItems,
      sourceTargetRemediationItems: sourceTargetRemediation.summary.items,
      sourceTargetRemediationUnsafeItems: sourceTargetRemediation.summary.unsafeItems,
      sourceTargetRemediationManualFixReadyItems: sourceTargetRemediation.summary.manualFixReadyItems,
      approvalItemsWithSourceUrlRemediation: items.filter((item) => item.sourceUrlFixes.length > 0).length,
      humanReviewPlaybookUnsafeItems: playbook.summary.unsafeItems,
    },
    summary: {
      approvalItems: approval.items.length,
      items: items.length,
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      itemsWithInternalLinkFixes: items.filter((item) => item.internalLinkFixes.length > 0).length,
      itemsWithRemediationReasons: items.filter((item) => item.remediationReasons.length > 0).length,
      itemsWithSearchFixes: items.filter((item) => item.searchFixes.length > 0).length,
      itemsWithSourceChecks: items.filter((item) => item.sourceChecks.length > 0).length,
      itemsWithSourceUrlFixes: items.filter((item) => item.sourceUrlFixes.length > 0).length,
      manualFixReadyItems: items.filter((item) => item.manualFixReady).length,
      sourceUrlFixActions: items.reduce((sum, item) => sum + item.sourceUrlFixes.length, 0),
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-approval-remediation-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-approval-remediation-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toRemediationItem(
  approvalItem: ApprovalPacket["items"][number],
  searchItem: SearchIntentBrief["items"][number] | undefined,
  linkItem: InternalLinkBrief["items"][number] | undefined,
  sourceItem: SourceVerificationBrief["items"][number] | undefined,
  sourceTargetItems: SourceTargetRemediationPack["items"],
  playbookItem: HumanReviewPlaybook["items"][number] | undefined,
  optimizationItem: OptimizationBrief["briefs"][number] | undefined,
): RemediationItem {
  const commandBoundary = approvalItem.commandBoundary;
  const internalLinkFixes = dedupe([
    ...(linkItem?.linksToPublicArticles === 0 ? ["Add at least one contextual link to a currently published article before approval."] : []),
    ...(linkItem?.suggestions || []).slice(0, 3).map((suggestion) => `Suggested public link: ${suggestion.title} (${suggestion.url}) - ${suggestion.reason}.`),
    optimizationItem?.internalLink ? `Copydesk public link: ${optimizationItem.internalLink.title} (${optimizationItem.internalLink.url}).` : "",
    ...(playbookItem?.internalLinkActions || []).slice(0, 4),
  ]);
  const searchFixes = dedupe([
    ...(searchItem?.searchWeaknesses || []).map((weakness) => `Resolve search weakness: ${weakness}.`),
    searchItem?.primaryQuery ? `Make the opening answer this query naturally: ${searchItem.primaryQuery}.` : "",
    ...(searchItem?.reviewSuggestions || []).slice(0, 5),
    optimizationItem?.proposedTitle ? `Review title option: ${optimizationItem.proposedTitle}.` : "",
    optimizationItem?.proposedDescription ? `Review description option: ${optimizationItem.proposedDescription}.` : "",
    ...(optimizationItem?.proposedOpeningAdditions || []).slice(0, 4),
    ...(playbookItem?.searchActions || []).slice(0, 6),
  ]);
  const sourceUrlFixes = dedupe(
    sourceTargetItems.flatMap((item) => [
      item.kind === "failed-url"
        ? `Resolve failed source URL before approval: ${item.url}.`
        : `Confirm source redirect before approval: ${item.url} -> ${item.finalUrl || "missing final URL"}.`,
      ...item.manualActions.slice(0, 2).map((action) => `Source URL action: ${action}`),
      ...item.replacementPlan.slice(0, 2).map((step) => `Source replacement plan: ${step}`),
    ]),
  );
  const sourceChecks = dedupe([
    ...sourceUrlFixes,
    ...(sourceItem?.uniqueReachableUrls || []).slice(0, 5).map((url) => `Open source URL: ${url}.`),
    ...(sourceItem?.factCheckQueries || []).slice(0, 5).map((query) => `Fact-check query: ${query}.`),
    ...(sourceItem?.riskReviewChecklist || []).slice(0, 5),
    ...(playbookItem?.sourceActions || []).slice(0, 6),
  ]);
  const remediationReasons = dedupe([
    linkItem?.linksToPublicArticles === 0 ? "approval candidate has no current link to a published article" : "",
    (searchItem?.searchWeaknesses || []).length > 0 ? `${searchItem?.searchWeaknesses.length} search-intent weakness(es) need human copy review` : "",
    sourceUrlFixes.length > 0 ? `${sourceUrlFixes.length} source URL remediation action(s) need human confirmation` : "",
    optimizationItem?.warningRemediation?.length ? "copydesk warning remediation exists" : "",
  ]);
  const unsafeReasons = [
    approvalItem.readyForHumanApproval ? "" : "approval packet item is not ready for human approval",
    hasCommandBoundary(commandBoundary) ? "" : "manual command boundary is missing or unsafe",
    playbookItem?.readyForHumanReview === true ? "" : "human review playbook item is not ready",
    sourceItem && sourceItem.reachableSources > 0 ? "" : "no reachable source evidence attached",
    sourceTargetItems.every((item) => item.manualFixReady && item.unsafeReasons.length === 0) ? "" : "source URL remediation item is unsafe",
    internalLinkFixes.length > 0 ? "" : "no internal-link remediation action attached",
    searchFixes.length > 0 ? "" : "no search remediation action attached",
    sourceChecks.length > 0 ? "" : "no source verification action attached",
  ].filter(Boolean);

  return {
    commandBoundary,
    file: approvalItem.file,
    humanChecklist: dedupe([
      ...remediationReasons.map((reason) => `Review reason: ${reason}.`),
      "Apply or explicitly reject the internal-link suggestion before mark:review.",
      "Resolve or explicitly accept search-intent weaknesses before mark:review.",
      ...(sourceUrlFixes.length ? ["Resolve or explicitly accept source URL remediation actions before mark:review."] : []),
      "Verify source URLs and fact-check queries before mark:review.",
      "Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.",
      `Only after explicit human approval, run: ${commandBoundary.markReviewAfterHumanApproval}`,
      "Publishing remains a separate explicit approval step.",
    ]),
    internalLinkFixes,
    manualFixReady: unsafeReasons.length === 0,
    remediationReasons,
    searchFixes,
    sourceChecks,
    sourceUrlFixes,
    title: approvalItem.title,
    unsafeReasons,
  };
}

function hasCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included" &&
    command.stopBefore.includes("explicit")
  );
}

function dedupe(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: RemediationItem[];
  sourceEvidence: Record<string, number>;
  summary: Record<string, number>;
  unsafeItems: RemediationItem[];
}) {
  const lines = [
    "# Autopilot Approval Remediation Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It consolidates approval-packet search, internal-link, source, and copydesk fixes before human review.",
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
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Remediation Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Per-Item Checklist",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: RemediationItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Reasons | Search fixes | Link fixes | Source checks | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.manualFixReady} | ${item.remediationReasons.length} | ${item.searchFixes.length} | ${item.internalLinkFixes.length} | ${item.sourceChecks.length} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: RemediationItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Manual mark-review command: \`${item.commandBoundary.markReviewAfterHumanApproval}\``,
    `- Publish dry-run command after review: \`${item.commandBoundary.publishDryRunAfterReview}\``,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
    "Reasons:",
    "",
    ...(item.remediationReasons.length ? item.remediationReasons.map((action) => `- ${action}`) : ["- none"]),
    "",
    "Internal-link fixes:",
    "",
    ...item.internalLinkFixes.map((action) => `- ${action}`),
    "",
    "Search fixes:",
    "",
    ...item.searchFixes.map((action) => `- ${action}`),
    "",
    "Source checks:",
    "",
    ...item.sourceChecks.map((action) => `- ${action}`),
    "",
    "Source URL fixes:",
    "",
    ...(item.sourceUrlFixes.length ? item.sourceUrlFixes.map((action) => `- ${action}`) : ["- none"]),
    "",
    "Human checklist:",
    "",
    ...item.humanChecklist.map((action) => `- ${action}`),
    "",
  ];
}

main();

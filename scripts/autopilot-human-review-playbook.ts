import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type ApprovalItem = {
  articleMeta: { humanReviewRequired: boolean; noindex: boolean; status: string };
  assignmentLane: string;
  commandBoundary: CommandBoundary;
  file: string;
  readyForHumanApproval: boolean;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
};

type ApprovalPacket = {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  items: ApprovalItem[];
  summary: { unsafeItems: number };
};

type SearchIntentBrief = {
  items: Array<{
    file: string;
    primaryQuery: string;
    readyForHumanReview: boolean;
    reviewSuggestions: string[];
    searchWeaknesses: string[];
  }>;
  summary: { unsafeItems: number };
};

type InternalLinkBrief = {
  items: Array<{
    file: string;
    linkFocus: string[];
    readyForHumanReview: boolean;
    suggestions: Array<{ title: string; url: string }>;
  }>;
  summary: { unsafeItems: number };
};

type SourceVerificationBrief = {
  items: Array<{
    approvalChecklist: string[];
    factCheckQueries: string[];
    file: string;
    readyForHumanReview: boolean;
    reachableSources: number;
    riskReviewChecklist: string[];
    uniqueReachableUrls: string[];
    verificationFocus: string[];
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
    ready: boolean;
    warningRemediation: string[];
  }>;
  summary: { unsafeCommands: number };
};

type PlaybookItem = {
  commandBoundary: CommandBoundary;
  file: string;
  internalLinkActions: string[];
  manualOnlyCommands: {
    markReviewAfterHumanApproval: string;
    publishDryRunAfterReview: string;
    publishConfirm: "not-included";
  };
  readyForHumanReview: boolean;
  safeDraft: boolean;
  searchActions: string[];
  sourceActions: string[];
  stopBefore: string[];
  title: string;
};

function main() {
  const packet = readJson<ApprovalPacket>("content/automation/autopilot-approval-packet.json");
  const searchIntent = readJson<SearchIntentBrief>("content/automation/autopilot-search-intent-brief.json");
  const internalLinks = readJson<InternalLinkBrief>("content/automation/autopilot-internal-link-brief.json");
  const sourceVerification = readJson<SourceVerificationBrief>("content/automation/autopilot-source-verification-brief.json");
  const optimization = readJson<OptimizationBrief>("content/automation/review-optimization-brief.json");

  const searchByFile = new Map(searchIntent.items.map((item) => [item.file, item]));
  const linkByFile = new Map(internalLinks.items.map((item) => [item.file, item]));
  const sourceByFile = new Map(sourceVerification.items.map((item) => [item.file, item]));
  const optimizationByFile = new Map(optimization.briefs.map((item) => [item.file, item]));

  const items = packet.items.map((item) => toPlaybookItem(item, searchByFile.get(item.file), linkByFile.get(item.file), sourceByFile.get(item.file), optimizationByFile.get(item.file)));
  const unsafeItems = items.filter((item) => !isSafeItem(item));
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only human review playbook for the autopilot approval packet. It merges search, source, internal-link, and copydesk tasks without changing article state.",
      stopBefore: "This playbook stops before mark:review and never includes publish --confirm. Human approval is required for every status change.",
    },
    boundaries: packet.boundaries,
    sourceEvidence: {
      approvalPacketUnsafeItems: packet.summary.unsafeItems,
      internalLinkUnsafeItems: internalLinks.summary.unsafeItems,
      optimizationUnsafeCommands: optimization.summary.unsafeCommands,
      searchIntentUnsafeItems: searchIntent.summary.unsafeItems,
      sourceVerificationUnsafeItems: sourceVerification.summary.unsafeItems,
    },
    summary: {
      approvalItems: packet.items.length,
      items: items.length,
      itemsWithCommandBoundary: items.filter((item) => hasCommandBoundary(item.commandBoundary)).length,
      itemsWithInternalLinkActions: items.filter((item) => item.internalLinkActions.length > 0).length,
      itemsWithSearchActions: items.filter((item) => item.searchActions.length > 0).length,
      itemsWithSourceActions: items.filter((item) => item.sourceActions.length > 0).length,
      readyItems: items.filter((item) => item.readyForHumanReview).length,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-human-review-playbook.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-human-review-playbook.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && items.length === packet.items.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || items.length !== packet.items.length) process.exitCode = 1;
}

function toPlaybookItem(
  item: ApprovalItem,
  searchItem: SearchIntentBrief["items"][number] | undefined,
  linkItem: InternalLinkBrief["items"][number] | undefined,
  sourceItem: SourceVerificationBrief["items"][number] | undefined,
  optimizationItem: OptimizationBrief["briefs"][number] | undefined,
): PlaybookItem {
  const safeDraft = item.articleMeta.status === "draft" && item.articleMeta.noindex === true && item.articleMeta.humanReviewRequired === true;
  const internalLinkActions = dedupe([
    ...(linkItem?.linkFocus || []),
    linkItem?.suggestions[0] ? `If helpful, add one contextual public link: ${linkItem.suggestions[0].title} (${linkItem.suggestions[0].url}).` : "",
    optimizationItem?.internalLink ? `Copydesk suggested public link: ${optimizationItem.internalLink.title} (${optimizationItem.internalLink.url}).` : "",
  ]);
  const searchActions = dedupe([
    searchItem?.primaryQuery ? `Confirm the opening directly answers primary query: ${searchItem.primaryQuery}.` : "",
    ...(searchItem?.reviewSuggestions || []),
    ...(searchItem?.searchWeaknesses || []).map((weakness) => `Resolve search-intent weakness: ${weakness}.`),
    optimizationItem?.proposedTitle ? `Review proposed title option: ${optimizationItem.proposedTitle}.` : "",
    optimizationItem?.proposedDescription ? `Review proposed meta description option: ${optimizationItem.proposedDescription}.` : "",
    ...(optimizationItem?.proposedOpeningAdditions || []),
    ...(optimizationItem?.warningRemediation || []),
  ]);
  const sourceActions = dedupe([
    ...(sourceItem?.verificationFocus || []),
    ...(sourceItem?.uniqueReachableUrls || []).slice(0, 8).map((url) => `Open reachable source URL: ${url}.`),
    ...(sourceItem?.factCheckQueries || []).slice(0, 8).map((query) => `Fact-check query: ${query}.`),
    ...(sourceItem?.riskReviewChecklist || []).slice(0, 8),
    ...(sourceItem?.approvalChecklist || []).slice(0, 8),
  ]);
  const readyForHumanReview =
    item.readyForHumanApproval &&
    safeDraft &&
    hasCommandBoundary(item.commandBoundary) &&
    searchItem?.readyForHumanReview === true &&
    linkItem?.readyForHumanReview === true &&
    sourceItem?.readyForHumanReview === true &&
    optimizationItem?.ready === true &&
    searchActions.length > 0 &&
    sourceActions.length > 0 &&
    internalLinkActions.length > 0;

  return {
    commandBoundary: item.commandBoundary,
    file: item.file,
    internalLinkActions,
    manualOnlyCommands: {
      markReviewAfterHumanApproval: item.commandBoundary.markReviewAfterHumanApproval,
      publishDryRunAfterReview: item.commandBoundary.publishDryRunAfterReview,
      publishConfirm: "not-included",
    },
    readyForHumanReview,
    safeDraft,
    searchActions,
    sourceActions,
    stopBefore: [
      item.commandBoundary.stopBefore,
      "Do not run mark:review until explicit human approval for this file.",
      "Do not run publish:articles --confirm from this playbook.",
      "Do not claim traffic, ranking, revenue, or conversion lift without measured evidence.",
    ],
    title: item.title,
  };
}

function isSafeItem(item: PlaybookItem) {
  return (
    item.readyForHumanReview &&
    item.safeDraft &&
    hasCommandBoundary(item.commandBoundary) &&
    item.searchActions.length > 0 &&
    item.sourceActions.length > 0 &&
    item.internalLinkActions.length > 0 &&
    item.manualOnlyCommands.publishConfirm === "not-included" &&
    !item.manualOnlyCommands.publishDryRunAfterReview.includes("--confirm")
  );
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
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: PlaybookItem[];
  sourceEvidence: Record<string, number>;
  summary: Record<string, number>;
  unsafeItems: PlaybookItem[];
}) {
  const lines = [
    "# Autopilot Human Review Playbook",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It merges the top autopilot approval packet with search, source, internal-link, and copydesk tasks for human review.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
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
    "## Review Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Per-Item Human Review Steps",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: PlaybookItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe | Search actions | Source actions | Link actions | Mark-review command gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.searchActions.length} | ${item.sourceActions.length} | ${item.internalLinkActions.length} | ${item.manualOnlyCommands.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.manualOnlyCommands.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: PlaybookItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Mark review only after human approval: ${item.manualOnlyCommands.markReviewAfterHumanApproval}`,
    `- Publish dry run after review: ${item.manualOnlyCommands.publishDryRunAfterReview}`,
    `- Publish confirm: ${item.manualOnlyCommands.publishConfirm}`,
    "",
    "Stop before:",
    "",
    ...item.stopBefore.map((step) => `- ${step}`),
    "",
    "Search and copydesk actions:",
    "",
    ...item.searchActions.slice(0, 14).map((step) => `- ${step}`),
    "",
    "Source verification actions:",
    "",
    ...item.sourceActions.slice(0, 18).map((step) => `- ${step}`),
    "",
    "Internal link actions:",
    "",
    ...item.internalLinkActions.map((step) => `- ${step}`),
    "",
  ];
}

main();

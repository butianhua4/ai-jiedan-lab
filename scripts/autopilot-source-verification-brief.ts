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
  articleMeta: {
    humanReviewRequired: boolean;
    noindex: boolean;
    status: string;
  };
  commandBoundary: CommandBoundary;
  file: string;
  readyForHumanApproval: boolean;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  sourceTypes: string[];
  title: string;
};

type ApprovalPacket = {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  items: ApprovalItem[];
  summary: { unsafeItems: number };
};

type SourceHealth = {
  checks: Array<{ finalUrl?: string; ok: boolean; status?: number; url: string }>;
  files: Array<{ file: string; reachableSources: number; scopes: string[]; sourceTargets: number; urls: string[] }>;
  summary: { failedUrls: number; filesWithoutReachableSource: number; missingUrlTargets: number; okUrls: number; uniqueUrls: number };
};

type PublishPack = {
  items: Array<{
    factCheckQueries: string[];
    file: string;
    humanDecisionChecklist: string[];
    officialSourceTargets: string[];
    riskReviewChecklist: string[];
  }>;
};

type NextReviewSourcePack = {
  items: Array<{
    approvalChecklist: string[];
    factCheckQueries: string[];
    file: string;
    officialSourceTargets: string[];
    riskReviewChecklist: string[];
  }>;
};

type BriefItem = {
  approvalChecklist: string[];
  factCheckQueries: string[];
  file: string;
  officialSourceTargets: string[];
  readyForHumanReview: boolean;
  reachableSources: number;
  riskReviewChecklist: string[];
  safeDraft: boolean;
  sourceHealthScopes: string[];
  sourceTargets: number;
  sourceTypes: string[];
  title: string;
  uniqueReachableUrls: string[];
  verificationFocus: string[];
};

function main() {
  const packet = readJson<ApprovalPacket>("content/automation/autopilot-approval-packet.json");
  const health = readJson<SourceHealth>("content/automation/source-target-health-audit.json");
  const publishPack = readJson<PublishPack>("content/automation/publish-readiness-pack.json");
  const nextSourcePack = readJson<NextReviewSourcePack>("content/automation/next-review-source-pack.json");

  const healthByFile = new Map(health.files.map((item) => [item.file, item]));
  const publishByFile = new Map(publishPack.items.map((item) => [item.file, item]));
  const nextSourceByFile = new Map(nextSourcePack.items.map((item) => [item.file, item]));
  const okUrls = new Set(health.checks.filter((check) => check.ok).map((check) => check.url));

  const items = packet.items.map((item) => toBriefItem(item, healthByFile.get(item.file), publishByFile.get(item.file), nextSourceByFile.get(item.file), okUrls));
  const unsafeItems = items.filter((item) => !isSafeItem(item));
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only source verification brief for the autopilot approval packet. It packages source evidence and human fact-check tasks without editing articles.",
      stopBefore: "Open and verify sources during human review only. Do not mark review or publish without explicit approval.",
    },
    boundaries: packet.boundaries,
    sourceEvidence: {
      healthSummary: health.summary,
      packetUnsafeItems: packet.summary.unsafeItems,
    },
    summary: {
      approvalItems: packet.items.length,
      items: items.length,
      itemsWithApprovalChecklist: items.filter((item) => item.approvalChecklist.length > 0).length,
      itemsWithFactCheckQueries: items.filter((item) => item.factCheckQueries.length > 0).length,
      itemsWithOfficialSources: items.filter((item) => item.officialSourceTargets.length > 0).length,
      itemsWithReachableSources: items.filter((item) => item.reachableSources > 0).length,
      packetUnsafeItems: packet.summary.unsafeItems,
      totalReachableSources: items.reduce((sum, item) => sum + item.reachableSources, 0),
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-source-verification-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-source-verification-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && items.length === packet.items.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || items.length !== packet.items.length) process.exitCode = 1;
}

function toBriefItem(
  item: ApprovalItem,
  healthItem: SourceHealth["files"][number] | undefined,
  publishItem: PublishPack["items"][number] | undefined,
  nextSourceItem: NextReviewSourcePack["items"][number] | undefined,
  okUrls: Set<string>,
): BriefItem {
  const safeDraft =
    item.articleMeta.status === "draft" &&
    item.articleMeta.noindex === true &&
    item.articleMeta.humanReviewRequired === true &&
    item.readyForHumanApproval === true &&
    item.commandBoundary.publishConfirm === "not-included";
  const officialSourceTargets = dedupe([...(item.sourceTargets || []), ...(publishItem?.officialSourceTargets || []), ...(nextSourceItem?.officialSourceTargets || [])]);
  const factCheckQueries = dedupe([...(publishItem?.factCheckQueries || []), ...(nextSourceItem?.factCheckQueries || []), ...(item.searchQueries || []).map((query) => `${query} official docs fact check`)]);
  const approvalChecklist = dedupe([...(publishItem?.humanDecisionChecklist || []), ...(nextSourceItem?.approvalChecklist || []), "Human confirms every fast-changing AI, API, deployment, prompt, pricing, and security claim against the listed official sources."]);
  const riskReviewChecklist = dedupe([...(publishItem?.riskReviewChecklist || []), ...(nextSourceItem?.riskReviewChecklist || [])]);
  const uniqueReachableUrls = dedupe((healthItem?.urls || []).filter((url) => okUrls.has(url)));
  const reachableSources = uniqueReachableUrls.length;

  return {
    approvalChecklist,
    factCheckQueries,
    file: item.file,
    officialSourceTargets,
    readyForHumanReview: safeDraft && reachableSources > 0 && officialSourceTargets.length > 0 && factCheckQueries.length > 0 && approvalChecklist.length > 0 && riskReviewChecklist.length > 0,
    reachableSources,
    riskReviewChecklist,
    safeDraft,
    sourceHealthScopes: healthItem?.scopes || [],
    sourceTargets: healthItem?.sourceTargets || officialSourceTargets.length,
    sourceTypes: item.sourceTypes,
    title: item.title,
    uniqueReachableUrls,
    verificationFocus: dedupe([
      ...item.reviewFocus,
      ...officialSourceTargets.slice(0, 5).map((target) => `Open official source and verify current wording: ${target}`),
      "Reject or rewrite unsupported claims before any mark:review command.",
      "Keep the article draft/noindex until explicit approval.",
    ]).slice(0, 14),
  };
}

function isSafeItem(item: BriefItem) {
  return (
    item.readyForHumanReview &&
    item.safeDraft &&
    item.reachableSources > 0 &&
    item.officialSourceTargets.length > 0 &&
    item.factCheckQueries.length > 0 &&
    item.approvalChecklist.length > 0 &&
    item.riskReviewChecklist.length > 0
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
  items: BriefItem[];
  sourceEvidence: { healthSummary: SourceHealth["summary"]; packetUnsafeItems: number };
  summary: Record<string, number>;
  unsafeItems: BriefItem[];
}) {
  const lines = [
    "# Autopilot Source Verification Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It packages source verification work for the top autopilot approval packet items.",
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
    `- Source health summary: ${JSON.stringify(payload.sourceEvidence.healthSummary)}`,
    `- Packet unsafe items: ${payload.sourceEvidence.packetUnsafeItems}`,
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Approval Packet Source Verification",
    "",
    ...itemTable(payload.items),
    "",
    "## Per-Item Verification Tasks",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: BriefItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe | Reachable sources | Official sources | Fact checks | Approval checks | Risk checks | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.reachableSources} | ${item.officialSourceTargets.length} | ${item.factCheckQueries.length} | ${item.approvalChecklist.length} | ${item.riskReviewChecklist.length} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: BriefItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Source types: ${item.sourceTypes.join(", ") || "none"}`,
    `- Source health scopes: ${item.sourceHealthScopes.join(", ") || "none"}`,
    `- Reachable source URLs: ${item.reachableSources}`,
    "",
    "Verification focus:",
    "",
    ...item.verificationFocus.map((focus) => `- ${focus}`),
    "",
    "Reachable URLs:",
    "",
    ...item.uniqueReachableUrls.map((url) => `- ${url}`),
    "",
    "Fact-check queries:",
    "",
    ...item.factCheckQueries.slice(0, 10).map((query) => `- ${query}`),
    "",
    "Approval checklist:",
    "",
    ...item.approvalChecklist.map((check) => `- ${check}`),
    "",
  ];
}

main();

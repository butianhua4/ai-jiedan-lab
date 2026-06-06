import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type LinkSuggestion = {
  file: string;
  reason: string;
  score: number;
  slug: string;
  title: string;
  url: string;
};

type LinkAuditItem = {
  currentInternalLinks: number;
  file: string;
  linksToPublicArticles: number;
  missingPublicLinkSuggestion: boolean;
  suggestions: LinkSuggestion[];
  title: string;
};

type InternalLinkAudit = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  candidateItems: LinkAuditItem[];
  summary: { candidateItemsMissingPublicLinkSuggestion: number; publicArticles: number };
};

type ApprovalItem = {
  articleMeta: {
    humanReviewRequired: boolean;
    noindex: boolean;
    status: string;
  };
  file: string;
  readyForHumanApproval: boolean;
  sourceTargets: string[];
  title: string;
};

type ApprovalPacket = {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  items: ApprovalItem[];
  summary: { unsafeItems: number };
};

type BriefItem = {
  currentInternalLinks: number;
  file: string;
  linkFocus: string[];
  linksToPublicArticles: number;
  readyForHumanReview: boolean;
  safeDraft: boolean;
  suggestions: LinkSuggestion[];
  title: string;
};

function main() {
  const packet = readJson<ApprovalPacket>("content/automation/autopilot-approval-packet.json");
  const audit = readJson<InternalLinkAudit>("content/automation/internal-link-opportunity-audit.json");
  const auditByFile = new Map(audit.candidateItems.map((item) => [item.file, item]));
  const items = packet.items.map((item) => toBriefItem(item, auditByFile.get(item.file)));
  const unsafeItems = items.filter((item) => !isSafeItem(item));
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only internal-link brief for the autopilot approval packet. It suggests public internal links but does not edit article bodies.",
      stopBefore: "Use suggested links during human review only. Do not change status, mark review, or publish without explicit approval.",
    },
    boundaries: packet.boundaries,
    summary: {
      approvalItems: packet.items.length,
      items: items.length,
      itemsAlreadyLinkedToPublic: items.filter((item) => item.linksToPublicArticles > 0).length,
      itemsMissingCurrentPublicLink: items.filter((item) => item.linksToPublicArticles === 0).length,
      itemsWithSuggestions: items.filter((item) => item.suggestions.length > 0).length,
      packetUnsafeItems: packet.summary.unsafeItems,
      publicArticles: audit.summary.publicArticles,
      unsafeItems: unsafeItems.length,
    },
    sourceEvidence: {
      internalLinkAuditGuardrails: audit.guardrails,
      internalLinkAuditMissingSuggestions: audit.summary.candidateItemsMissingPublicLinkSuggestion,
      note: "Suggestions are crawl-path and reader-context candidates. They do not make a draft publishable.",
    },
    unsafeItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-internal-link-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-internal-link-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && items.length === packet.items.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || items.length !== packet.items.length) process.exitCode = 1;
}

function toBriefItem(item: ApprovalItem, auditItem: LinkAuditItem | undefined): BriefItem {
  const suggestions = auditItem?.suggestions.slice(0, 5) || [];
  const linksToPublicArticles = auditItem?.linksToPublicArticles || 0;
  const safeDraft =
    item.articleMeta.status === "draft" &&
    item.articleMeta.noindex === true &&
    item.articleMeta.humanReviewRequired === true &&
    item.readyForHumanApproval === true;
  return {
    currentInternalLinks: auditItem?.currentInternalLinks || 0,
    file: item.file,
    linkFocus: [
      linksToPublicArticles > 0 ? "Already links to at least one public article." : "Add one contextual public article link during human review.",
      suggestions.length ? `Review ${suggestions.length} suggested public link target(s).` : "No public link suggestion is available; inspect related published articles manually.",
      "Use one link only if it helps the reader continue the task; avoid stuffing links.",
      "Keep the article draft/noindex until explicit approval.",
    ],
    linksToPublicArticles,
    readyForHumanReview: item.readyForHumanApproval && safeDraft && suggestions.length > 0,
    safeDraft,
    suggestions,
    title: item.title,
  };
}

function isSafeItem(item: BriefItem) {
  return item.safeDraft && item.readyForHumanReview && item.suggestions.length > 0;
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: BriefItem[];
  sourceEvidence: { internalLinkAuditMissingSuggestions: number; note: string };
  summary: Record<string, number>;
  unsafeItems: BriefItem[];
}) {
  const lines = [
    "# Autopilot Internal Link Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It packages public internal-link suggestions for the top autopilot approval packet items.",
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
    `- Internal-link audit missing suggestions: ${payload.sourceEvidence.internalLinkAuditMissingSuggestions}`,
    `- ${payload.sourceEvidence.note}`,
    "",
    "## Unsafe Items",
    "",
    ...itemTable(payload.unsafeItems),
    "",
    "## Approval Packet Link Suggestions",
    "",
    ...itemTable(payload.items),
    "",
    "## Per-Item Link Targets",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: BriefItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Safe | Current links | Public links | Suggestions | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.currentInternalLinks} | ${item.linksToPublicArticles} | ${item.suggestions.length} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: BriefItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Existing public article links: ${item.linksToPublicArticles}`,
    "",
    "Human review focus:",
    "",
    ...item.linkFocus.map((focus) => `- ${focus}`),
    "",
    "Suggested public links:",
    "",
    ...item.suggestions.map((suggestion) => `- ${suggestion.title} (${suggestion.url}) - ${suggestion.reason}`),
    "",
  ];
}

main();

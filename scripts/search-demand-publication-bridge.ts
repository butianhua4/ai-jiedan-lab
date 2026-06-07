import fs from "fs";
import path from "path";
import { chineseCount, readArticle, rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type ReviewPackItem = {
  commandBoundary: CommandBoundary;
  factCheckQueries: string[];
  file: string;
  humanReviewChecklist: string[];
  lane: string;
  officialSourceTargets: string[];
  publicInternalLinkSuggestion: { title: string; url: string } | null;
  readyForHumanReview: boolean;
  safeDraft: boolean;
  searchQueries: string[];
  title: string;
  warningIssues: string[];
};

type SearchDemandReviewPack = {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    trafficClaim: string;
  };
  items: ReviewPackItem[];
  summary: { items: number; unsafeItems: number };
};

type SourceHealth = {
  filesWithoutReachableSource?: Array<{ file: string }>;
  summary: { filesWithoutReachableSource: number; missingUrlTargets: number };
};

type BridgeItem = {
  blockingIssues: string[];
  commandBoundary: CommandBoundary;
  file: string;
  frontMatter: {
    canonical: string;
    date: string;
    description: string;
    noindex: boolean;
    slug: string;
    status: string;
    title: string;
    updatedAt: string;
  };
  humanApprovalReady: boolean;
  indexingSafe: boolean;
  internalLinkReady: boolean;
  lane: string;
  manualNextActions: string[];
  reviewPackReady: boolean;
  schemaReady: boolean;
  searchSnippetReady: boolean;
  sourceReady: boolean;
  title: string;
  warningIssues: string[];
};

const siteUrl = "https://ai-jiedan-lab.vercel.app";

function main() {
  const reviewPack = readJson<SearchDemandReviewPack>("content/automation/search-demand-review-pack.json");
  const sourceHealth = readOptional<SourceHealth>("content/automation/source-target-health-audit.json");
  const sourceMissingFiles = new Set((sourceHealth?.filesWithoutReachableSource || []).map((item) => item.file));
  const items = reviewPack.items.map((item) => toBridgeItem(item, sourceMissingFiles));
  const blockingItems = items.filter((item) => item.blockingIssues.length > 0);
  const warningItems = items.filter((item) => item.warningIssues.length > 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      trafficClaim: "not-included",
      note: "Read-only bridge from search-demand review candidates to SEO/source/publication readiness. It does not edit front matter, mark review, or publish.",
      stopBefore: "Stop before mark:review and stop before publish. Both require explicit human approval.",
    },
    sourceEvidence: {
      reviewPackGeneratedAt: reviewPack.generatedAt,
      reviewPackGuardrails: reviewPack.guardrails,
      reviewPackSummary: reviewPack.summary,
      sourceHealthFilesWithoutReachableSource: sourceHealth?.summary.filesWithoutReachableSource ?? null,
      sourceHealthMissingUrlTargets: sourceHealth?.summary.missingUrlTargets ?? null,
      trafficNote: "This report evaluates readiness only; it does not claim keyword volume, rankings, impressions, clicks, traffic, or revenue.",
    },
    summary: {
      blockingItems: blockingItems.length,
      humanApprovalReadyItems: items.filter((item) => item.humanApprovalReady).length,
      indexingSafeItems: items.filter((item) => item.indexingSafe).length,
      internalLinkReadyItems: items.filter((item) => item.internalLinkReady).length,
      items: items.length,
      reviewPackItems: reviewPack.summary.items,
      reviewPackReadyItems: items.filter((item) => item.reviewPackReady).length,
      schemaReadyItems: items.filter((item) => item.schemaReady).length,
      searchSnippetReadyItems: items.filter((item) => item.searchSnippetReady).length,
      sourceReadyItems: items.filter((item) => item.sourceReady).length,
      warningItems: warningItems.length,
    },
    blockingItems,
    warningItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-demand-publication-bridge.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-demand-publication-bridge.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length) process.exitCode = 1;
}

function toBridgeItem(item: ReviewPackItem, sourceMissingFiles: Set<string>): BridgeItem {
  const article = readArticle(item.file);
  const title = stringValue(article.data.title);
  const description = stringValue(article.data.description);
  const slug = stringValue(article.data.slug);
  const status = stringValue(article.data.status);
  const date = stringValue(article.data.date);
  const updatedAt = stringValue(article.data.updatedAt);
  const canonical = stringValue(article.data.canonical);
  const noindex = article.data.noindex === true;
  const expectedCanonical = `${siteUrl}/blog/${slug}`;
  const indexingSafe = status === "draft" && noindex === true && article.data.humanReviewRequired === true;
  const searchSnippetReady =
    title.length >= 8 &&
    title.length <= 72 &&
    description.length >= 35 &&
    description.length <= 180 &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) &&
    (chineseCount(title) >= 2 || /[a-z0-9]{4,}/i.test(title));
  const schemaReady =
    Boolean(title) &&
    Boolean(description) &&
    Boolean(slug) &&
    Boolean(canonical) &&
    canonical === expectedCanonical &&
    isIsoDate(date) &&
    isIsoDate(updatedAt) &&
    updatedAt >= date &&
    Boolean(article.data.author) &&
    Boolean(article.data.category) &&
    Boolean(article.data.contentType) &&
    Boolean(article.data.difficulty) &&
    Array.isArray(article.data.tags) &&
    article.data.tags.length > 0;
  const sourceReady = item.officialSourceTargets.length >= 3 && !sourceMissingFiles.has(item.file);
  const internalLinkReady = Boolean(item.publicInternalLinkSuggestion);
  const reviewPackReady = item.readyForHumanReview && item.safeDraft && hasCommandBoundary(item.commandBoundary) && item.factCheckQueries.length > 0;
  const blockingIssues = [
    indexingSafe ? "" : "candidate is not safely draft/noindex/humanReviewRequired",
    searchSnippetReady ? "" : "search snippet front matter is not ready",
    schemaReady ? "" : "structured data front matter is not ready",
    sourceReady ? "" : "source targets or source health are not ready",
    reviewPackReady ? "" : "review pack command boundary or checklist is not ready",
  ].filter(Boolean);
  const warningIssues = [
    internalLinkReady ? "" : "no public internal-link suggestion is attached yet",
    item.warningIssues.length ? `review pack warnings: ${item.warningIssues.join("; ")}` : "",
    title.length > 60 ? "title may truncate in search results" : "",
    description.length < 55 ? "description may be thin for search snippets" : "",
  ].filter(Boolean);
  const humanApprovalReady = blockingIssues.length === 0;

  return {
    blockingIssues,
    commandBoundary: item.commandBoundary,
    file: item.file,
    frontMatter: {
      canonical,
      date,
      description,
      noindex,
      slug,
      status,
      title,
      updatedAt,
    },
    humanApprovalReady,
    indexingSafe,
    internalLinkReady,
    lane: item.lane,
    manualNextActions: manualNextActionsFor(item, blockingIssues, warningIssues),
    reviewPackReady,
    schemaReady,
    searchSnippetReady,
    sourceReady,
    title: item.title,
    warningIssues,
  };
}

function manualNextActionsFor(item: ReviewPackItem, blockingIssues: string[], warningIssues: string[]) {
  const actions = [
    ...blockingIssues.map((issue) => `Resolve blocker before human approval: ${issue}.`),
    ...warningIssues.slice(0, 3).map((issue) => `Review warning before publish: ${issue}.`),
    "Verify official sources and fact-check queries manually.",
    "Confirm no traffic, ranking, revenue, benchmark, cost, latency, or stability claim is unsupported.",
    `Only after explicit human approval, run: ${item.commandBoundary.markReviewAfterHumanApproval}`,
    "Publishing remains a separate explicit approval step.",
  ];
  return [...new Set(actions)];
}

function hasCommandBoundary(command: CommandBoundary) {
  return (
    command.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !command.publishDryRunAfterReview.includes("--confirm") &&
    command.publishConfirm === "not-included" &&
    command.stopBefore.includes("explicit")
  );
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
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
  blockingItems: BridgeItem[];
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string; trafficClaim: string };
  items: BridgeItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
  warningItems: BridgeItem[];
}) {
  const lines = [
    "# Search Demand Publication Bridge",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It maps search-demand review candidates to SEO, source, internal-link, and manual publication readiness while stopping before review or publish commands.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    ...Object.entries(payload.sourceEvidence).map(([key, value]) => `- ${key}: ${JSON.stringify(value)}`),
    "",
    "## Blocking Items",
    "",
    ...itemTable(payload.blockingItems),
    "",
    "## Warning Items",
    "",
    ...itemTable(payload.warningItems),
    "",
    "## All Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Manual Next Actions",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: BridgeItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Snippet | Schema | Source | Link | Draft safe | Blockers | Warnings | Lane | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.humanApprovalReady} | ${item.searchSnippetReady} | ${item.schemaReady} | ${item.sourceReady} | ${item.internalLinkReady} | ${item.indexingSafe} | ${item.blockingIssues.length} | ${item.warningIssues.length} | ${item.lane} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: BridgeItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Lane: ${item.lane}`,
    `- Manual mark-review command: \`${item.commandBoundary.markReviewAfterHumanApproval}\``,
    `- Publish dry-run command after review: \`${item.commandBoundary.publishDryRunAfterReview}\``,
    `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
    "",
    ...item.manualNextActions.map((action) => `- ${action}`),
    "",
  ];
}

main();

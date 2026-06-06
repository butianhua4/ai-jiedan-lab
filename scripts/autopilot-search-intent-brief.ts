import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

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
  assignmentLane: string;
  autopilotScore: number;
  commandBoundary: CommandBoundary;
  file: string;
  headings: string[];
  readyForHumanApproval: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
};

type ApprovalPacket = {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  items: ApprovalItem[];
  summary: { unsafeItems: number };
};

type SearchIntentItem = {
  bodyQueryHits: string[];
  descriptionQueryHits: string[];
  file: string;
  headingQueryHits: string[];
  primaryQuery: string;
  queryTokenHits: number;
  readyForHumanReview: boolean;
  reviewSuggestions: string[];
  searchQueries: string[];
  searchWeaknesses: string[];
  title: string;
  titleQueryHits: string[];
};

function main() {
  const packet = readJson<ApprovalPacket>("content/automation/autopilot-approval-packet.json");
  const items = packet.items.map(toSearchIntentItem);
  const unsafeItems = packet.items.filter((item) => !isSafeApprovalItem(item));
  const searchWeakItems = items.filter((item) => item.searchWeaknesses.length > 0);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only search intent brief for the autopilot approval packet. Weaknesses are human review suggestions, not automatic edits.",
      stopBefore: "Use this brief during human review only. Do not mark review or publish without explicit approval.",
    },
    boundaries: packet.boundaries,
    summary: {
      approvalItems: packet.items.length,
      bodyCoveredItems: items.filter((item) => item.bodyQueryHits.length > 0).length,
      descriptionCoveredItems: items.filter((item) => item.descriptionQueryHits.length > 0).length,
      headingCoveredItems: items.filter((item) => item.headingQueryHits.length > 0).length,
      items: items.length,
      packetUnsafeItems: packet.summary.unsafeItems,
      searchWeakItems: searchWeakItems.length,
      titleCoveredItems: items.filter((item) => item.titleQueryHits.length > 0).length,
      unsafeItems: unsafeItems.length,
    },
    sourceEvidence: {
      note: "Exact query hits and token hits are local text checks. They do not claim search volume, ranking, impressions, clicks, or traffic.",
    },
    unsafeItems,
    searchWeakItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-search-intent-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-search-intent-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0 && items.length === packet.items.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length || items.length !== packet.items.length) process.exitCode = 1;
}

function toSearchIntentItem(item: ApprovalItem): SearchIntentItem {
  const article = readArticle(item.file);
  const title = stringValue(article.data.title) || item.title;
  const description = stringValue(article.data.description);
  const headings = extractHeadings(article.content);
  const body = article.content;
  const primaryQuery = item.searchQueries[0] || "";
  const titleQueryHits = queryHits(item.searchQueries, title);
  const descriptionQueryHits = queryHits(item.searchQueries, description);
  const headingQueryHits = queryHits(item.searchQueries, headings.join(" "));
  const bodyQueryHits = queryHits(item.searchQueries, body);
  const tokenHits = queryTokens(item.searchQueries.join(" ")).filter((token) => normalize([title, description, headings.join(" "), body].join(" ")).includes(normalize(token)));
  const searchWeaknesses = [
    titleQueryHits.length ? "" : "no exact search query appears in title",
    descriptionQueryHits.length ? "" : "no exact search query appears in description",
    headingQueryHits.length || bodyQueryHits.length ? "" : "no exact search query appears in headings or body",
    tokenHits.length >= 4 ? "" : "few query tokens appear in searchable text",
  ].filter(Boolean);

  return {
    bodyQueryHits,
    descriptionQueryHits,
    file: item.file,
    headingQueryHits,
    primaryQuery,
    queryTokenHits: tokenHits.length,
    readyForHumanReview: item.readyForHumanApproval && isSafeApprovalItem(item),
    reviewSuggestions: buildSuggestions(item, searchWeaknesses),
    searchQueries: item.searchQueries,
    searchWeaknesses,
    title,
    titleQueryHits,
  };
}

function buildSuggestions(item: ApprovalItem, weaknesses: string[]) {
  const suggestions = [
    weaknesses.includes("no exact search query appears in title") ? `During human review, consider whether the title can naturally include: ${item.searchQueries[0]}.` : "",
    weaknesses.includes("no exact search query appears in description") ? `During human review, tune the meta description around: ${item.searchQueries[0]}.` : "",
    weaknesses.includes("no exact search query appears in headings or body") ? `During human review, add one natural H2/H3 or paragraph that answers: ${item.searchQueries.slice(0, 2).join(" / ")}.` : "",
    weaknesses.includes("few query tokens appear in searchable text") ? "During human review, add user-language phrasing without keyword stuffing." : "",
  ].filter(Boolean);
  suggestions.push("Keep status=draft, noindex=true, and humanReviewRequired=true until explicit approval.");
  return suggestions;
}

function queryHits(queries: string[], value: string) {
  const normalizedValue = normalize(value);
  return queries.filter((query) => {
    const normalizedQuery = normalize(query);
    return normalizedQuery.length >= 3 && normalizedValue.includes(normalizedQuery);
  });
}

function queryTokens(value: string) {
  const ascii = value.match(/[A-Za-z0-9][A-Za-z0-9-]{1,}/g) || [];
  const cjk = value.match(/[\u4e00-\u9fa5]{2,}/g) || [];
  return [...new Set([...ascii, ...cjk])];
}

function isSafeApprovalItem(item: ApprovalItem) {
  return (
    item.readyForHumanApproval &&
    item.articleMeta.status === "draft" &&
    item.articleMeta.noindex === true &&
    item.articleMeta.humanReviewRequired === true &&
    item.sourceTargets.length > 0 &&
    item.searchQueries.length > 0 &&
    item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human") &&
    !item.commandBoundary.publishDryRunAfterReview.includes("--confirm") &&
    item.commandBoundary.publishConfirm === "not-included"
  );
}

function extractHeadings(content: string) {
  return [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1].trim());
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  boundaries: { canClaimTraffic: boolean; publicPublished: number; publishableNow: number; trafficDataAvailable: boolean };
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: SearchIntentItem[];
  searchWeakItems: SearchIntentItem[];
  sourceEvidence: { note: string };
  summary: Record<string, number>;
  unsafeItems: ApprovalItem[];
}) {
  const lines = [
    "# Autopilot Search Intent Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks search-intent coverage for the top autopilot approval packet items.",
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
    `- ${payload.sourceEvidence.note}`,
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}`) : ["- none"]),
    "",
    "## Search Weak Items",
    "",
    ...itemTable(payload.searchWeakItems),
    "",
    "## All Items",
    "",
    ...itemTable(payload.items),
    "",
    "## Review Suggestions",
    "",
    ...payload.items.flatMap(itemSection),
    "",
  ];
  return lines.join("\n");
}

function itemTable(items: SearchIntentItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Ready | Title hits | Description hits | Heading hits | Body hits | Token hits | Weaknesses | Primary query | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.titleQueryHits.length} | ${item.descriptionQueryHits.length} | ${item.headingQueryHits.length} | ${item.bodyQueryHits.length} | ${item.queryTokenHits} | ${item.searchWeaknesses.length} | ${item.primaryQuery} | ${item.title} | ${item.file} |`,
    ),
  ];
}

function itemSection(item: SearchIntentItem) {
  return [
    `### ${item.title}`,
    "",
    `- File: ${item.file}`,
    `- Primary query: ${item.primaryQuery}`,
    `- Search weaknesses: ${item.searchWeaknesses.length ? item.searchWeaknesses.join("; ") : "none"}`,
    "",
    "Review suggestions:",
    "",
    ...item.reviewSuggestions.map((suggestion) => `- ${suggestion}`),
    "",
  ];
}

main();

import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type QueryCoverageItem = {
  file: string;
  laneId: string;
  laneTitle: string;
  primaryKeyword: string;
  queryCount: number;
  queryFamilies: Record<string, string[]>;
  readyForManualReview: boolean;
  title: string;
  wave: number;
};

type SearchQueryCoverage = {
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
  items: QueryCoverageItem[];
  summary: {
    items: number;
    uniqueQueries: number;
  };
};

type MatchItem = {
  blockingIssues: string[];
  bodyFamilyMatches: Record<string, boolean>;
  descriptionHit: boolean;
  exactQueryMatches: number;
  file: string;
  headingFamilyMatches: Record<string, boolean>;
  matchedFamilies: number;
  primaryKeyword: string;
  queryCount: number;
  readyForManualReview: boolean;
  reviewSuggestions: string[];
  title: string;
  titleHit: boolean;
  warningIssues: string[];
  wave: number;
};

const familyTerms: Record<string, string[]> = {
  comparison: ["对比", "区别", "怎么选", "vs", "选择"],
  costOps: ["成本", "报价", "维护", "上线", "检查", "验收"],
  deployment: ["部署", "工作流", "生产环境", "上线", "工具调用", "agent", "rag", "llm", "dify", "n8n", "webhook"],
  howTo: ["怎么做", "教程", "步骤", "新手", "落地"],
  intentSeeds: [],
  risk: ["避坑", "风险", "安全", "人工审核", "权限", "回滚", "隐私"],
  template: ["模板", "清单", "sop", "方案", "表格"],
};

function main() {
  const queryCoverage = readJson<SearchQueryCoverage>("content/automation/search-query-coverage.json");
  const items = queryCoverage.items.map(toMatchItem);
  const blockingItems = items.filter((item) => item.blockingIssues.length > 0);
  const warningItems = items.filter((item) => item.warningIssues.length > 0);
  const averageExactMatches = items.length ? round(items.reduce((total, item) => total + item.exactQueryMatches, 0) / items.length) : 0;
  const averageMatchedFamilies = items.length ? round(items.reduce((total, item) => total + item.matchedFamilies, 0) / items.length) : 0;

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only search-query match audit. It checks whether planned query variants are reflected in title, description, headings, and body. It does not edit articles.",
      stopBefore: "Use review suggestions during human review. Do not change status or publish without explicit human approval.",
    },
    summary: {
      averageExactMatches,
      averageMatchedFamilies,
      blockingItems: blockingItems.length,
      items: items.length,
      queryCoverageItems: queryCoverage.summary.items,
      queryCoverageUniqueQueries: queryCoverage.summary.uniqueQueries,
      readyItems: items.filter((item) => item.readyForManualReview).length,
      warningItems: warningItems.length,
    },
    sourceEvidence: {
      queryCoverageGuardrails: queryCoverage.guardrails,
      note: "Blocking issues cover basic search alignment only. Warnings are review-time expansion suggestions and do not make a safe draft publishable.",
    },
    blockingItems,
    warningItems,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-query-match-audit.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-query-match-audit.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: blockingItems.length === 0 && items.length === queryCoverage.summary.items, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (blockingItems.length || items.length !== queryCoverage.summary.items) process.exitCode = 1;
}

function toMatchItem(item: QueryCoverageItem): MatchItem {
  const article = readArticle(item.file);
  const data = article.data;
  const title = stringValue(data.title);
  const description = stringValue(data.description);
  const headings = extractHeadings(article.content);
  const normalizedTitle = normalize(title);
  const normalizedDescription = normalize(description);
  const normalizedHeadings = normalize(headings.join(" "));
  const normalizedBody = normalize(article.content);
  const normalizedSearchable = normalize([title, description, headings.join(" "), article.content].join(" "));
  const normalizedPrimary = normalize(item.primaryKeyword);
  const normalizedTitleFromCoverage = normalize(item.title);
  const allQueries = Object.values(item.queryFamilies).flat();
  const exactQueryMatches = allQueries.filter((query) => normalizedSearchable.includes(normalize(query))).length;
  const bodyFamilyMatches = Object.fromEntries(Object.keys(item.queryFamilies).map((family) => [family, familyHit(family, normalizedBody, item)]));
  const headingFamilyMatches = Object.fromEntries(Object.keys(item.queryFamilies).map((family) => [family, familyHit(family, normalizedHeadings, item)]));
  const matchedFamilies = Object.keys(item.queryFamilies).filter((family) => bodyFamilyMatches[family] || headingFamilyMatches[family]).length;
  const titleHit = Boolean(normalizedPrimary && normalizedTitle.includes(normalizedPrimary)) || Boolean(normalizedTitleFromCoverage && normalizedTitle.includes(normalizedTitleFromCoverage.slice(0, 12)));
  const descriptionHit = Boolean(normalizedPrimary && normalizedDescription.includes(normalizedPrimary.slice(0, Math.min(8, normalizedPrimary.length)))) || keywordOverlap(item.primaryKeyword, description) >= 2;
  const safeDraft = data.status === "draft" && data.noindex === true && data.humanReviewRequired === true;
  const safePublishedPage = data.status === "published" && data.noindex === false && data.humanReviewRequired === true;
  const safeReviewTarget = safeDraft || safePublishedPage;
  const blockingIssues = [
    safeReviewTarget ? "" : "item is neither a safe noindex draft nor a reviewed published page",
    item.readyForManualReview ? "" : "query coverage item is not ready",
    titleHit ? "" : "title does not clearly include the primary keyword",
    descriptionHit ? "" : "description does not clearly include the primary keyword",
    matchedFamilies >= 3 ? "" : "fewer than 3 query families are represented in headings/body",
  ].filter(Boolean);
  const missingFamilies = Object.keys(item.queryFamilies).filter((family) => !bodyFamilyMatches[family] && !headingFamilyMatches[family]);
  const warningIssues = [
    exactQueryMatches >= 2 ? "" : "few exact query variant matches in article text",
    missingFamilies.length ? `missing query-family signals: ${missingFamilies.join(", ")}` : "",
  ].filter(Boolean);
  const reviewSuggestions = missingFamilies.map((family) => suggestionForFamily(family, item.primaryKeyword));

  return {
    blockingIssues,
    bodyFamilyMatches,
    descriptionHit,
    exactQueryMatches,
    file: rel(article.file),
    headingFamilyMatches,
    matchedFamilies,
    primaryKeyword: item.primaryKeyword,
    queryCount: item.queryCount,
    readyForManualReview: blockingIssues.length === 0,
    reviewSuggestions,
    title,
    titleHit,
    warningIssues,
    wave: item.wave,
  };
}

function familyHit(family: string, normalizedText: string, item: QueryCoverageItem) {
  const terms = [...(familyTerms[family] || []), ...item.queryFamilies[family].slice(0, 4)];
  return terms.some((term) => {
    const normalizedTerm = normalize(term);
    if (!normalizedTerm) return false;
    if (normalizedText.includes(normalizedTerm)) return true;
    return keywordOverlap(term, normalizedText) >= 2;
  });
}

function keywordOverlap(query: string, text: string) {
  const normalizedText = normalize(text);
  const tokens = queryTokens(query);
  return tokens.filter((token) => normalizedText.includes(normalize(token))).length;
}

function queryTokens(value: string) {
  const common = ["怎么", "如何", "教程", "新手", "模板", "清单", "方案", "部署", "工作流", "对比", "风险", "安全", "成本", "报价", "上线", "检查", "AI", "Agent", "RAG", "LLM"];
  const asciiTokens = value.match(/[A-Za-z0-9][A-Za-z0-9-]{1,}/g) || [];
  const chineseTokens = common.filter((token) => value.includes(token));
  const longChineseRuns = value.match(/[\u4e00-\u9fa5]{2,}/g) || [];
  return [...new Set([...asciiTokens, ...chineseTokens, ...longChineseRuns])];
}

function suggestionForFamily(family: string, primaryKeyword: string) {
  const prefix = primaryKeyword || "该主题";
  const suggestions: Record<string, string> = {
    comparison: `人工审核时补一句“${prefix}怎么选/和相近方案有什么区别”。`,
    costOps: `人工审核时补充“${prefix}成本、维护、上线检查或验收边界”。`,
    deployment: `人工审核时确认正文有“${prefix}部署/工作流/生产环境”落地描述。`,
    howTo: `人工审核时确认开头或 H2 明确回答“${prefix}怎么做”。`,
    intentSeeds: `人工审核时检查是否自然覆盖核心搜索种子词，不要硬塞关键词。`,
    risk: `人工审核时补充“${prefix}风险、安全、权限或人工审核边界”。`,
    template: `人工审核时补充“${prefix}模板、清单、SOP 或可复制结构”。`,
  };

  return suggestions[family] || `人工审核时补充 ${family} 相关搜索意图。`;
}

function extractHeadings(content: string) {
  return [...content.matchAll(/^#{2,3}\s+(.+)$/gm)].map((match) => match[1].trim());
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  blockingItems: MatchItem[];
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: MatchItem[];
  sourceEvidence: Record<string, unknown>;
  summary: Record<string, number>;
  warningItems: MatchItem[];
}) {
  const lines = [
    "# Search Query Match Audit",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It checks whether planned query variants are visible in article metadata, headings, and body copy before human review.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Source Evidence",
    "",
    `- Note: ${payload.sourceEvidence.note}`,
    `- Query coverage guardrails: ${JSON.stringify(payload.sourceEvidence.queryCoverageGuardrails)}`,
    "",
    "## Blocking Items",
    "",
    ...table(payload.blockingItems),
    "",
    "## Warning Items",
    "",
    ...table(payload.warningItems),
    "",
    "## All Items",
    "",
    ...table(payload.items),
    "",
  ];

  for (const item of payload.warningItems) {
    lines.push(
      `### ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Wave: ${item.wave}`,
      `- Primary keyword: ${item.primaryKeyword}`,
      `- Warning issues: ${item.warningIssues.join("; ")}`,
      "",
      "Review suggestions:",
      "",
      ...item.reviewSuggestions.map((suggestion) => `- ${suggestion}`),
      "",
    );
  }

  return lines.join("\n");
}

function table(items: MatchItem[]) {
  if (!items.length) return ["- none"];

  return [
    "| Ready | Wave | Title hit | Description hit | Exact queries | Families | Blocking | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => (
      `| ${item.readyForManualReview} | ${item.wave} | ${item.titleHit} | ${item.descriptionHit} | ${item.exactQueryMatches}/${item.queryCount} | ${item.matchedFamilies} | ${item.blockingIssues.length ? item.blockingIssues.join("<br>") : "none"} | ${item.warningIssues.length ? item.warningIssues.join("<br>") : "none"} | ${item.title} | ${item.file} |`
    )),
  ];
}

main();

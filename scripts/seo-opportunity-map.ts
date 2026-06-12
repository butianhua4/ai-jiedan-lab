import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type ArticleSummary = {
  category: string;
  file: string;
  noindex: boolean;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  slug: string;
  sourceNotes: boolean;
  status: string;
  title: string;
};

type CategorySummary = {
  category: string;
  drafts: number;
  published: number;
  reviewReadyDrafts: number;
  total: number;
};

type ClusterSummary = {
  cluster: string;
  drafts: number;
  examples: string[];
  published: number;
  reviewReadyDrafts: number;
  total: number;
};

type ReviewBatchCandidate = {
  category: string;
  file: string;
  primaryKeyword: string;
  publishBatch: number | null;
  searchIntent: string;
  title: string;
};

type ReviewBatch = {
  candidates: ReviewBatchCandidate[];
  cluster: string;
  published: number;
  reason: string;
  reviewReadyDrafts: number;
  suggestedBatchSize: number;
};

const clusters = [
  { name: "AI deployment", terms: ["部署", "API", "Key", "rate limit", "限流", "Vercel", "Claude", "OpenAI", "Gemini", "vLLM", "Ollama", "Dify", "n8n", "MCP"] },
  { name: "Agent and memory", terms: ["Agent", "记忆", "memory", "工具调用", "workflow", "Webhook", "RAG"] },
  { name: "RAG and knowledge base", terms: ["RAG", "知识库", "向量", "vector", "Chroma", "检索", "引用"] },
  { name: "Industry AI prompts", terms: ["提示词", "prompt", "客服", "数据分析", "销售", "运营", "HR", "财务", "行业"] },
  { name: "Troubleshooting", terms: ["报错", "错误", "failed", "Error", "404", "invalid", "missing", "npm", "install", "debug"] },
  { name: "Freelance monetization", terms: ["Upwork", "Fiverr", "Proposal", "报价", "项目", "客户", "收款", "Payoneer", "Wise", "PayPal"] },
] as const;

async function main() {
  const files = await articleFiles();
  const articles = files.map(toArticleSummary);
  const reviewReady = articles.filter((article) => isReviewReady(article));
  const categorySummaries = summarizeCategories(articles).sort(compareOpportunity);
  const clusterSummaries = summarizeClusters(articles).sort(compareClusterOpportunity);
  const intentSummaries = summarizeBy(articles, (article) => article.searchIntent || "unknown");
  const reviewBatches = buildReviewBatches(articles, clusterSummaries);
  const nextReviewTargets = categorySummaries
    .filter((item) => item.reviewReadyDrafts > 0)
    .slice(0, 8)
    .map((item) => ({
      category: item.category,
      reason: buildCategoryReason(item),
      reviewReadyDrafts: item.reviewReadyDrafts,
      published: item.published,
    }));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoPublish: false,
      note: "This report uses local content metadata only. It does not claim real traffic or Search Console impressions.",
    },
    totals: {
      files: articles.length,
      published: articles.filter((article) => article.status === "published").length,
      draft: articles.filter((article) => article.status === "draft").length,
      archived: articles.filter((article) => article.status === "archived").length,
      reviewReadyDrafts: reviewReady.length,
    },
    nextReviewTargets,
    reviewBatches,
    clusters: clusterSummaries,
    categories: categorySummaries,
    searchIntents: intentSummaries,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "seo-opportunity-map.json");
  const mdTarget = path.join(process.cwd(), "docs", "seo-opportunity-map.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, json: rel(jsonTarget), markdown: rel(mdTarget), reviewReadyDrafts: reviewReady.length }, null, 2));
}

function toArticleSummary(file: string): ArticleSummary {
  const article = readArticle(file);
  const result = checkFile(file);
  return {
    category: String(article.data.category || "uncategorized"),
    file: rel(file),
    noindex: article.data.noindex === true,
    primaryKeyword: String(article.data.primaryKeyword || ""),
    publishBatch: typeof article.data.publishBatch === "number" ? article.data.publishBatch : null,
    qualityScore: result.qualityScore,
    searchIntent: String(article.data.searchIntent || "unknown"),
    slug: String(article.data.slug || ""),
    sourceNotes: Boolean(article.data.sourceNotes),
    status: String(article.data.status || "unknown"),
    title: String(article.data.title || ""),
  };
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex === true && article.sourceNotes && article.qualityScore >= 100;
}

function summarizeCategories(articles: ArticleSummary[]): CategorySummary[] {
  const groups = new Map<string, ArticleSummary[]>();
  for (const article of articles) {
    const items = groups.get(article.category) || [];
    items.push(article);
    groups.set(article.category, items);
  }

  return [...groups.entries()].map(([category, items]) => ({
    category,
    drafts: items.filter((item) => item.status === "draft").length,
    published: items.filter((item) => item.status === "published").length,
    reviewReadyDrafts: items.filter(isReviewReady).length,
    total: items.length,
  }));
}

function summarizeClusters(articles: ArticleSummary[]): ClusterSummary[] {
  return clusters.map((cluster) => {
    const items = articles.filter((article) => cluster.terms.some((term) => searchableText(article).includes(term.toLowerCase())));
    const ready = items.filter(isReviewReady);
    return {
      cluster: cluster.name,
      drafts: items.filter((item) => item.status === "draft").length,
      examples: ready.slice(0, 5).map((item) => item.title),
      published: items.filter((item) => item.status === "published").length,
      reviewReadyDrafts: ready.length,
      total: items.length,
    };
  });
}

function buildReviewBatches(articles: ArticleSummary[], clusterSummaries: ClusterSummary[]): ReviewBatch[] {
  return clusterSummaries
    .filter((cluster) => cluster.reviewReadyDrafts > 0)
    .slice(0, 6)
    .map((cluster) => {
      const candidates = articles
        .filter((article) => isReviewReady(article) && getClusterName(article) === cluster.cluster)
        .sort(compareReviewCandidate)
        .slice(0, 3)
        .map((article) => ({
          category: article.category,
          file: article.file,
          primaryKeyword: article.primaryKeyword,
          publishBatch: article.publishBatch,
          searchIntent: article.searchIntent,
          title: article.title,
        }));

      return {
        candidates,
        cluster: cluster.cluster,
        published: cluster.published,
        reason: buildClusterReason(cluster),
        reviewReadyDrafts: cluster.reviewReadyDrafts,
        suggestedBatchSize: Math.min(3, candidates.length),
      };
    });
}

function compareReviewCandidate(a: ArticleSummary, b: ArticleSummary) {
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  if (a.searchIntent !== b.searchIntent) return a.searchIntent.localeCompare(b.searchIntent);
  return a.slug.localeCompare(b.slug);
}

function getClusterName(article: ArticleSummary) {
  const text = searchableText(article);
  return clusters.find((cluster) => cluster.terms.some((term) => text.includes(term.toLowerCase())))?.name || "Other";
}

function searchableText(article: ArticleSummary) {
  return `${article.title} ${article.category} ${article.primaryKeyword} ${article.slug}`.toLowerCase();
}

function summarizeBy(articles: ArticleSummary[], getKey: (article: ArticleSummary) => string) {
  const groups = new Map<string, ArticleSummary[]>();
  for (const article of articles) {
    const key = getKey(article);
    const items = groups.get(key) || [];
    items.push(article);
    groups.set(key, items);
  }

  return [...groups.entries()]
    .map(([name, items]) => ({
      name,
      drafts: items.filter((item) => item.status === "draft").length,
      published: items.filter((item) => item.status === "published").length,
      reviewReadyDrafts: items.filter(isReviewReady).length,
      total: items.length,
    }))
    .sort((a, b) => b.reviewReadyDrafts - a.reviewReadyDrafts || b.drafts - a.drafts || a.name.localeCompare(b.name));
}

function compareOpportunity(a: CategorySummary, b: CategorySummary) {
  return opportunityScore(b) - opportunityScore(a) || b.reviewReadyDrafts - a.reviewReadyDrafts || a.category.localeCompare(b.category);
}

function compareClusterOpportunity(a: ClusterSummary, b: ClusterSummary) {
  return clusterOpportunityScore(b) - clusterOpportunityScore(a) || b.reviewReadyDrafts - a.reviewReadyDrafts || a.cluster.localeCompare(b.cluster);
}

function opportunityScore(item: CategorySummary) {
  const noPublishedBoost = item.published === 0 ? 20 : 0;
  return item.reviewReadyDrafts * 3 + item.drafts + noPublishedBoost - item.published * 2;
}

function clusterOpportunityScore(item: ClusterSummary) {
  const noPublishedBoost = item.published === 0 ? 20 : 0;
  return item.reviewReadyDrafts * 3 + item.drafts + noPublishedBoost - item.published;
}

function buildCategoryReason(item: CategorySummary) {
  if (item.published === 0) return "has review-ready drafts but no public article yet";
  if (item.reviewReadyDrafts >= 10) return "has enough review-ready drafts for a small manual publishing batch";
  return "has review-ready drafts and can expand existing public coverage";
}

function buildClusterReason(item: ClusterSummary) {
  if (item.published === 0) return "cluster has review-ready drafts but no public article yet";
  if (item.reviewReadyDrafts >= 10) return "cluster has enough review-ready drafts for a small manual batch";
  return "cluster can expand existing public coverage";
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoPublish: boolean; note: string };
  totals: { files: number; published: number; draft: number; archived: number; reviewReadyDrafts: number };
  nextReviewTargets: Array<{ category: string; reason: string; reviewReadyDrafts: number; published: number }>;
  reviewBatches: ReviewBatch[];
  clusters: ClusterSummary[];
  categories: CategorySummary[];
  searchIntents: Array<{ name: string; drafts: number; published: number; reviewReadyDrafts: number; total: number }>;
}) {
  const lines = [
    "# SEO Opportunity Map",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report ranks local content opportunities. It does not use or claim real traffic, impressions, or keyword volume.",
    "",
    "## Guardrails",
    "",
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Totals",
    "",
    `- Files: ${payload.totals.files}`,
    `- Published: ${payload.totals.published}`,
    `- Draft: ${payload.totals.draft}`,
    `- Archived: ${payload.totals.archived}`,
    `- Review-ready drafts: ${payload.totals.reviewReadyDrafts}`,
    "",
    "## Next Review Targets",
    "",
    "| Category | Published | Review-ready drafts | Reason |",
    "| --- | --- | --- | --- |",
    ...payload.nextReviewTargets.map((item) => `| ${item.category} | ${item.published} | ${item.reviewReadyDrafts} | ${item.reason} |`),
    "",
    "## Suggested Review Batches",
    "",
    "These are manual-review batches only. They do not change status or publish anything.",
    "",
    ...payload.reviewBatches.flatMap((batch) => [
      `### ${batch.cluster}`,
      "",
      `- Published: ${batch.published}`,
      `- Review-ready drafts: ${batch.reviewReadyDrafts}`,
      `- Suggested batch size: ${batch.suggestedBatchSize}`,
      `- Reason: ${batch.reason}`,
      "",
      "| Category | Intent | Batch | Primary keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- |",
      ...batch.candidates.map((item) => (
        `| ${item.category} | ${item.searchIntent} | ${item.publishBatch ?? ""} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
      )),
      "",
    ]),
    "## Topic Clusters",
    "",
    "| Cluster | Published | Drafts | Review-ready drafts | Example candidates |",
    "| --- | --- | --- | --- | --- |",
    ...payload.clusters.map((item) => `| ${item.cluster} | ${item.published} | ${item.drafts} | ${item.reviewReadyDrafts} | ${item.examples.join("<br>")} |`),
    "",
    "## Search Intents",
    "",
    "| Intent | Published | Drafts | Review-ready drafts | Total |",
    "| --- | --- | --- | --- | --- |",
    ...payload.searchIntents.map((item) => `| ${item.name} | ${item.published} | ${item.drafts} | ${item.reviewReadyDrafts} | ${item.total} |`),
    "",
    "## Category Detail",
    "",
    "| Category | Published | Drafts | Review-ready drafts | Total |",
    "| --- | --- | --- | --- | --- |",
    ...payload.categories.map((item) => `| ${item.category} | ${item.published} | ${item.drafts} | ${item.reviewReadyDrafts} | ${item.total} |`),
    "",
  ];

  return lines.join("\n");
}

void main();

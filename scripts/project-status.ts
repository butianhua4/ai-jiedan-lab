import { contentPlan500 } from "../content/content-plan-500";
import { articleFiles, readArticle } from "./content-utils";

async function main() {
  const files = await articleFiles();
  const articles = files.map((file) => readArticle(file).data);
  const statusCounts = countBy(articles.map((article) => String(article.status || "unknown")));
  const generatedSlugs = new Set(articles.map((article) => article.slug));
  const planned = contentPlan500.filter((item) => !generatedSlugs.has(item.slug));
  const nextBatch = planned[0]?.batch ?? null;
  const publishable = articles.filter((article) => article.status === "review" && Number(article.qualityScore || 0) >= 80);
  const published = articles.filter((article) => article.status === "published" && article.noindex === false);

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    contentPlan: {
      total: contentPlan500.length,
      uniqueSlugs: new Set(contentPlan500.map((item) => item.slug)).size,
      batches: new Set(contentPlan500.map((item) => item.batch)).size,
      nextBatchToGenerate: nextBatch,
    },
    articles: {
      files: articles.length,
      statusCounts,
      publicPublished: published.length,
      publishableNow: publishable.map((article) => article.slug),
    },
    recommendedNextActions: [
      "继续打磨 3 个核心工具页的移动端和转化文案。",
      "人工抽查 batch 1 中 2-3 篇 draft，再 mark:review。",
      "每天最多发布 1-3 篇 review 文章，不要批量发布。",
      "等有真实下载或咨询后，再接 Gumroad/Lemon Squeezy 或 Payoneer/Wise。",
    ],
  }, null, 2));
}

function countBy(items: string[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

void main();

import { contentPlan500 } from "../content/content-plan-500";
import { articleFiles, readArticle } from "./content-utils";

async function main() {
  const files = await articleFiles();
  const articles = files.map((file) => readArticle(file).data);
  const statusCounts = countBy(articles.map((article) => String(article.status || "unknown")));
  const generatedSlugs = new Set<string>(articles.map((article) => String(article.slug)));
  const plannedMissing = contentPlan500.filter((item) => !generatedSlugs.has(item.slug));
  const nextBatch = plannedMissing[0]?.batch ?? null;
  const planSlugs = new Set<string>(contentPlan500.map((item) => item.slug));
  const plannedArticles = articles.filter((article) => planSlugs.has(String(article.slug)));
  const plannedStatusCounts = countBy(plannedArticles.map((article) => String(article.status || "unknown")));
  const publishable = articles.filter((article) => article.status === "review" && Number(article.qualityScore || 0) >= 80);
  const published = articles.filter((article) => article.status === "published" && article.noindex === false);
  const archived = articles.filter((article) => article.status === "archived");

  console.log(JSON.stringify({
    generatedAt: new Date().toISOString(),
    contentPlan: {
      total: contentPlan500.length,
      uniqueSlugs: new Set(contentPlan500.map((item) => item.slug)).size,
      batches: new Set(contentPlan500.map((item) => item.batch)).size,
      plannedFilesReady: contentPlan500.length - plannedMissing.length,
      missingPlannedFiles: plannedMissing.length,
      nextBatchToGenerate: nextBatch,
      plannedStatusCounts,
    },
    articles: {
      files: articles.length,
      statusCounts,
      publicPublished: published.length,
      draftOrReview: articles.filter((article) => article.status === "draft" || article.status === "review").length,
      archived: archived.length,
      publishableNow: publishable.map((article) => article.slug),
    },
    searchSetup: {
      googleSearchConsole: "已完成验证并提交 sitemap.xml",
      sitemapRule: "只收录 published 且 noindex=false 的文章",
    },
    recommendedNextActions: [
      plannedMissing.length
        ? "继续补齐未生成的正式选题草稿，保持每次最多 5 篇。"
        : "500 篇正式选题已补齐；下一步不要继续盲目生成，先进入人工抽查和小批量审核。",
      "人工抽查每个主题中 2-3 篇 draft，再用 mark:review 进入 review。",
      "每次最多发布 1-3 篇 review 文章，不要批量发布。",
      "继续打磨 3 个核心工具页的移动端和转化文案。",
      "等有真实下载或咨询后，再接 Gumroad、Lemon Squeezy、Payoneer、Wise 或 PayPal。",
    ],
    registrationRoadmap: {
      now: "当前不需要注册新平台；GitHub、Vercel、Google Search Console 已经足够继续推进。",
      later: [
        "有稳定访问后再开启 Vercel Web Analytics 或 Google Analytics。",
        "有模板下载反馈后再注册 Gumroad 或 Lemon Squeezy。",
        "有人工服务咨询后再准备 Payoneer、Wise 或 PayPal。",
        "工具有稳定使用后再考虑 OpenAI、Anthropic 或 Vercel AI Gateway。",
      ],
    },
  }, null, 2));
}

function countBy(items: string[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

void main();

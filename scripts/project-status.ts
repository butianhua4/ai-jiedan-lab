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

  console.log(
    JSON.stringify(
      {
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
          googleSearchConsole:
            "Traffic data is not proven by project-status. Use content/automation/traffic-evidence-audit.json for evidence.",
          sitemapRule: "Only status=published and noindex=false articles are eligible for public indexing.",
        },
        recommendedNextActions: [
          plannedMissing.length
            ? "Continue filling missing planned drafts in small batches."
            : "All planned topics have draft files; focus on manual review, source checks, and small publish batches.",
          "Review 2-3 drafts per topic before marking anything as review.",
          "Publish only 1-3 approved review articles per batch.",
          "Keep improving the core tool pages and conversion copy.",
          "Do not claim traffic until Search Console, Analytics, or another measured data source is connected and audited.",
        ],
        registrationRoadmap: {
          now: "Keep using GitHub, Vercel, and local automation. Add measured traffic tooling only after privacy and ownership are confirmed.",
          later: [
            "Add Search Console verification or measured exports before reporting impressions/clicks.",
            "Add Vercel Web Analytics or GA only after the tracking purpose and privacy notice are confirmed.",
            "Register Gumroad or Lemon Squeezy after template download demand is visible.",
            "Prepare Payoneer, Wise, or PayPal after manual service inquiries appear.",
          ],
        },
      },
      null,
      2,
    ),
  );
}

function countBy(items: string[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

void main();

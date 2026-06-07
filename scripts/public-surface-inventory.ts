import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type BroadDemandBrief = {
  clusters: Array<{
    cluster: string;
    gapScore: number;
    publicMatches: number;
    readyCandidates: Array<{ file: string; primaryKeyword?: string; title: string }>;
    searchQueries: string[];
  }>;
  generatedAt: string;
  guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
  summary: {
    clusters: number;
    clustersWithoutPublicCoverage: number;
    readyCandidateFiles: number;
    reviewReadyDrafts: number;
    unsafeClusters: number;
  };
};

type LiveSearchSurface = {
  articles: { checked: number; failed: unknown[]; missingFromSitemap: unknown[]; publicCount: number };
  generatedAt: string;
  llms: { leaksDrafts: boolean };
  ok: boolean;
  sitemap: { leaksDrafts: boolean; urlCount: number };
};

type ProjectStatus = {
  articles: {
    files: number;
    publicPublished: number;
    statusCounts: Record<string, number>;
  };
};

type PublicItem = {
  category: string;
  descriptionLength: number;
  file: string;
  slug: string;
  tags: string[];
  title: string;
  updatedAt: string;
};

async function main() {
  const broadDemand = readJson<BroadDemandBrief>("content/automation/autopilot-broad-ai-demand-brief.json");
  const projectStatus = readJson<ProjectStatus>("content/automation/project-status.json");
  const liveSearch = readOptionalJson<LiveSearchSurface>("content/automation/live-search-surface.json");
  const files = await articleFiles();
  const articleEntries = files.map((file) => {
    const article = readArticle(file);
    return { article, file: rel(file) };
  });

  const publicItems = articleEntries
    .filter(({ article }) => article.data.status === "published" && article.data.noindex === false)
    .map(({ article, file }) => toPublicItem(file, article.data))
    .sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug));
  const publishedButNoindexed = articleEntries.filter(({ article }) => article.data.status === "published" && article.data.noindex !== false).map(({ file }) => file);
  const nonPublishedIndexable = articleEntries.filter(({ article }) => article.data.status !== "published" && article.data.noindex === false).map(({ file }) => file);
  const publicCategoryCounts = countBy(publicItems.map((item) => item.category || "uncategorized"));
  const publicTagCounts = countBy(publicItems.flatMap((item) => item.tags));
  const broadCoverage = broadDemand.clusters.map((cluster) => ({
    cluster: cluster.cluster,
    gapScore: cluster.gapScore,
    publicMatches: cluster.publicMatches,
    readyCandidates: cluster.readyCandidates.length,
    searchQueries: cluster.searchQueries.slice(0, 5),
    suggestedFiles: cluster.readyCandidates.slice(0, 3).map((candidate) => candidate.file),
  }));
  const uncoveredBroadClusters = broadCoverage.filter((cluster) => cluster.publicMatches === 0);
  const unsafeItems = [
    ...publishedButNoindexed.map((file) => ({ file, reason: "published article is not indexable" })),
    ...nonPublishedIndexable.map((file) => ({ file, reason: "non-published article is indexable" })),
    ...(liveSearch?.sitemap.leaksDrafts ? [{ file: "sitemap.xml", reason: "live sitemap leaks drafts" }] : []),
    ...(liveSearch?.llms.leaksDrafts ? [{ file: "llms.txt", reason: "live llms.txt leaks drafts" }] : []),
  ];

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only public surface inventory. It lists currently public content and broad AI demand gaps without editing articles or claiming traffic.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      broadDemandGeneratedAt: broadDemand.generatedAt,
      broadDemandGuardrails: broadDemand.guardrails,
      broadDemandSummary: broadDemand.summary,
      liveSearchGeneratedAt: liveSearch?.generatedAt || null,
      liveSearchOk: liveSearch?.ok ?? null,
      projectStatusPublicPublished: projectStatus.articles.publicPublished,
      projectStatusTotalFiles: projectStatus.articles.files,
      reportsUsed: ["project-status", "autopilot-broad-ai-demand-brief", "live-search-surface when available", "article front matter"],
    },
    summary: {
      broadClusters: broadDemand.summary.clusters,
      broadClustersWithoutPublicCoverage: uncoveredBroadClusters.length,
      broadReadyCandidateFiles: broadDemand.summary.readyCandidateFiles,
      liveArticlesChecked: liveSearch?.articles.checked ?? null,
      liveMissingFromSitemap: liveSearch?.articles.missingFromSitemap.length ?? null,
      livePublicCount: liveSearch?.articles.publicCount ?? null,
      liveSitemapUrls: liveSearch?.sitemap.urlCount ?? null,
      projectPublicPublished: projectStatus.articles.publicPublished,
      publicArticles: publicItems.length,
      publicCategories: Object.keys(publicCategoryCounts).length,
      publicTags: Object.keys(publicTagCounts).length,
      publishedButNoindexed: publishedButNoindexed.length,
      nonPublishedIndexable: nonPublishedIndexable.length,
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    publicItems,
    publicCategoryCounts,
    publicTagCounts,
    broadCoverage,
    uncoveredBroadClusters,
    nextActions: [
      "Use this inventory to answer what is public now before choosing the next human review batch.",
      "Prioritize broad clusters with zero public matches and ready candidates, but do not claim measured demand or traffic from this report.",
      "Keep publishing in 1-3 article batches after human approval and dry-run checks.",
    ],
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "public-surface-inventory.json");
  const mdTarget = path.join(process.cwd(), "docs", "public-surface-inventory.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toPublicItem(file: string, data: Record<string, unknown>): PublicItem {
  return {
    category: String(data.category || "uncategorized"),
    descriptionLength: String(data.description || "").length,
    file,
    slug: String(data.slug || path.basename(file, path.extname(file))),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    title: String(data.title || ""),
    updatedAt: String(data.updatedAt || ""),
  };
}

function countBy(items: string[]) {
  return items.filter(Boolean).reduce<Record<string, number>>((acc, item) => {
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {});
}

function readJson<T>(relativePath: string): T {
  const absolutePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function readOptionalJson<T>(relativePath: string): T | null {
  const absolutePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(absolutePath)) return null;
  return JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { note: string; trafficClaim: string };
  summary: Record<string, unknown>;
  unsafeItems: Array<{ file: string; reason: string }>;
  publicItems: PublicItem[];
  publicCategoryCounts: Record<string, number>;
  publicTagCounts: Record<string, number>;
  broadCoverage: Array<{ cluster: string; gapScore: number; publicMatches: number; readyCandidates: number; searchQueries: string[]; suggestedFiles: string[] }>;
  uncoveredBroadClusters: Array<{ cluster: string; gapScore: number; publicMatches: number; readyCandidates: number; searchQueries: string[]; suggestedFiles: string[] }>;
  nextActions: string[];
}) {
  const topTags = Object.entries(payload.publicTagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12);
  const lines = [
    "# Public Surface Inventory",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "## Guardrails",
    "",
    `- ${payload.guardrails.note}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...(payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.file}: ${item.reason}`) : ["- none"]),
    "",
    "## Public Categories",
    "",
    "| Category | Public articles |",
    "| --- | --- |",
    ...Object.entries(payload.publicCategoryCounts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([category, count]) => `| ${escapeCell(category)} | ${count} |`),
    "",
    "## Top Public Tags",
    "",
    "| Tag | Public articles |",
    "| --- | --- |",
    ...topTags.map(([tag, count]) => `| ${escapeCell(tag)} | ${count} |`),
    "",
    "## Public Articles",
    "",
    "| Category | Updated | Description | Tags | Title | URL |",
    "| --- | --- | --- | --- | --- | --- |",
    ...payload.publicItems.map((item) => `| ${escapeCell(item.category)} | ${item.updatedAt} | ${item.descriptionLength} | ${item.tags.length} | ${escapeCell(item.title)} | /blog/${item.slug} |`),
    "",
    "## Broad AI Demand Gaps",
    "",
    "| Gap score | Public | Ready candidates | Cluster | Search examples | Suggested files |",
    "| --- | --- | --- | --- | --- | --- |",
    ...payload.broadCoverage.map(
      (cluster) =>
        `| ${cluster.gapScore} | ${cluster.publicMatches} | ${cluster.readyCandidates} | ${escapeCell(cluster.cluster)} | ${cluster.searchQueries.join("<br>")} | ${cluster.suggestedFiles.join("<br>")} |`,
    ),
    "",
    "## Zero-Public Broad Clusters",
    "",
    ...payload.uncoveredBroadClusters.map((cluster) => `- ${cluster.cluster}: ${cluster.readyCandidates} ready candidates`),
    "",
    "## Next Actions",
    "",
    ...payload.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return `${lines.join("\n")}\n`;
}

function escapeCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

void main();

import fs from "fs";
import path from "path";
import { site } from "../data/site";
import {
  getBlogPath,
  getClusterPath,
  getHighAuthorityPosts,
  getHighPotentialQuestionPosts,
  getQuestionPath,
  getSeoGraph,
  getSeoGraphSummary,
  seoClusters,
  type SeoClusterSlug,
} from "../lib/seo-graph";
import { getSeoGrowthReport } from "../lib/seo-growth-monitor";
import type { BlogPost } from "../lib/types";

type PriorityItem = {
  cluster: SeoClusterSlug;
  path: string;
  reason: string;
  score: number;
  title: string;
  type: "cluster" | "q" | "blog";
  url: string;
};

const outputJson = path.join(process.cwd(), "content", "automation", "gsc-indexing-priority.json");
const outputMarkdown = path.join(process.cwd(), "docs", "gsc-indexing-priority.md");
const base = site.url.replace(/\/+$/, "");

function main() {
  const graph = getSeoGraph();
  const graphSummary = getSeoGraphSummary();
  const growth = getSeoGrowthReport(graph);
  const clusters = buildClusterItems();
  const qPages = buildQuestionItems(500);
  const blogPages = buildBlogItems(qPages, 500);
  const allItems = [...clusters, ...qPages, ...blogPages].sort((a, b) => b.score - a.score || a.path.localeCompare(b.path));
  const firstManualBatch = allItems.slice(0, 500);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      dataSource: "local published content, SEO graph, sitemap rules",
      manualSubmissionOnly: true,
      note: "This report does not use Search Console impressions, clicks, ranking, or indexing API data.",
    },
    summary: {
      growthStage: growth.growthStage,
      totalPages: growth.totalPages,
      qPages: growth.qPages,
      clusterPages: growth.clusterPages,
      blogPages: growth.blogPages,
      orphanPages: growth.orphanPages,
      weakPages: growth.weakPages,
      internalLinkHealth: growth.internalLinkHealth,
      growthReadinessScore: growth.growthReadinessScore,
      graphNodes: graphSummary.nodeCount,
      graphEdges: graphSummary.edgeCount,
    },
    recommendedManualBatchSize: {
      firstDay: 500,
      dailyAfterFirstDay: 50,
      note: "Accelerated mode: prepare the top 500 URL Inspection queue. Stop early if GSC rate-limits requests and continue from the next URL.",
    },
    firstManualBatch,
    sections: {
      clusters,
      qPages,
      blogPages,
    },
    allItems,
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMarkdown), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMarkdown, toMarkdown(payload), "utf8");

  console.log(
    JSON.stringify(
      {
        ok: true,
        json: rel(outputJson),
        markdown: rel(outputMarkdown),
        firstDayUrls: firstManualBatch.length,
        qPages: qPages.length,
        clusterPages: clusters.length,
        blogPages: blogPages.length,
      },
      null,
      2,
    ),
  );
}

function buildClusterItems(): PriorityItem[] {
  return seoClusters.map((cluster) => ({
    cluster: cluster.slug,
    path: getClusterPath(cluster.slug),
    reason: "Topic hub; submit first because it links to q pages and deep blog pages.",
    score: 100,
    title: cluster.shortTitle,
    type: "cluster",
    url: absoluteUrl(getClusterPath(cluster.slug)),
  }));
}

function buildQuestionItems(limit: number): PriorityItem[] {
  return getHighPotentialQuestionPosts(limit).map((post, index) => {
    const path = getQuestionPath(post);
    return {
      cluster: pathCluster(path),
      path,
      reason: buildQuestionReason(post, index),
      score: 90 - index,
      title: post.title,
      type: "q",
      url: absoluteUrl(path),
    };
  });
}

function buildBlogItems(qItems: PriorityItem[], limit: number): PriorityItem[] {
  const selected = new Map<string, BlogPost>();
  const qSlugs = new Set(qItems.map((item) => lastSegment(item.path)));

  for (const cluster of seoClusters) {
    for (const post of getHighAuthorityPosts(cluster.slug, 5)) selected.set(post.slug, post);
  }
  for (const post of getHighPotentialQuestionPosts(Math.max(limit, qItems.length))) {
    if (qSlugs.has(post.slug)) selected.set(post.slug, post);
  }

  return Array.from(selected.values())
    .slice(0, limit)
    .map((post, index) => {
      const path = getBlogPath(post);
      return {
        cluster: pathCluster(getQuestionPath(post)),
        path,
        reason: "Deep article paired with high-priority q page; submit after the q page is discoverable.",
        score: 70 - index,
        title: post.title,
        type: "blog",
        url: absoluteUrl(path),
      };
    });
}

function buildQuestionReason(post: BlogPost, index: number) {
  const reasons = ["High-potential q entry based on local title, intent, tags, and quality score."];
  if (index < seoClusters.length) reasons.push("Early batch candidate with cross-cluster coverage.");
  if (/error|failed|fix|deploy|agent|rag|prompt|codex|upwork/i.test(`${post.slug} ${post.title}`)) {
    reasons.push("Matches common search-intent terms.");
  }
  return reasons.join(" ");
}

function absoluteUrl(pathname: string) {
  return `${base}${pathname}`;
}

function pathCluster(pathname: string): SeoClusterSlug {
  const slug = pathname.split("/").filter(Boolean)[1] as SeoClusterSlug | undefined;
  const cluster = seoClusters.find((item) => item.slug === slug);
  return cluster?.slug ?? "ai-tools";
}

function lastSegment(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "";
}

function rel(file: string) {
  return path.relative(process.cwd(), file).replace(/\\/g, "/");
}

function toMarkdown(payload: {
  allItems: PriorityItem[];
  firstManualBatch: PriorityItem[];
  generatedAt: string;
  guardrails: { dataSource: string; manualSubmissionOnly: boolean; note: string };
  recommendedManualBatchSize: { dailyAfterFirstDay: number; firstDay: number; note: string };
  sections: {
    blogPages: PriorityItem[];
    clusters: PriorityItem[];
    qPages: PriorityItem[];
  };
  summary: {
    blogPages: number;
    clusterPages: number;
    graphEdges: number;
    graphNodes: number;
    growthReadinessScore: number;
    growthStage: string;
    internalLinkHealth: number;
    orphanPages: number;
    qPages: number;
    totalPages: number;
    weakPages: number;
  };
}) {
  const firstDay = payload.firstManualBatch;
  return [
    "# GSC Indexing Priority",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "Use this list for manual URL Inspection and indexing requests in Google Search Console. Do not submit hundreds of URLs manually.",
    "",
    "## Guardrails",
    "",
    `- Data source: ${payload.guardrails.dataSource}`,
    `- Manual submission only: ${payload.guardrails.manualSubmissionOnly}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Current SEO Structure",
    "",
    `- Growth stage: ${payload.summary.growthStage}`,
    `- Total SEO pages: ${payload.summary.totalPages}`,
    `- Q pages: ${payload.summary.qPages}`,
    `- Blog pages: ${payload.summary.blogPages}`,
    `- Cluster pages: ${payload.summary.clusterPages}`,
    `- Orphan pages: ${payload.summary.orphanPages}`,
    `- Weak pages: ${payload.summary.weakPages}`,
    `- Internal link health: ${payload.summary.internalLinkHealth}`,
    `- Growth readiness score: ${payload.summary.growthReadinessScore}`,
    `- SEO graph nodes: ${payload.summary.graphNodes}`,
    `- SEO graph edges: ${payload.summary.graphEdges}`,
    "",
    "## First Manual Batch",
    "",
    `Submit these ${firstDay.length} URLs if GSC allows it. Stop at the current GSC limit and continue from the next URL later.`,
    "",
    ...firstDay.map((item, index) => `${index + 1}. ${item.url} - ${item.reason}`),
    "",
    "## Cluster Hubs",
    "",
    ...toList(payload.sections.clusters),
    "",
    "## High-Potential Q Pages",
    "",
    ...toList(payload.sections.qPages),
    "",
    "## Matching Blog Pages",
    "",
    ...toList(payload.sections.blogPages),
    "",
    "## Operating Rule",
    "",
    `- Top queue target: prepare ${payload.recommendedManualBatchSize.firstDay} URLs.`,
    `- After the top queue is processed: continue about ${payload.recommendedManualBatchSize.dailyAfterFirstDay} URLs/day if needed.`,
    `- ${payload.recommendedManualBatchSize.note}`,
    "",
  ].join("\n");
}

function toList(items: PriorityItem[]) {
  return items.map((item, index) => `${index + 1}. ${item.url} (${item.type}, ${item.cluster}, score ${item.score})`);
}

main();

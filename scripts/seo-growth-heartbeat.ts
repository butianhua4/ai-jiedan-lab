import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { site } from "../data/site";
import { getSeoGraph, getSeoGraphSummary } from "../lib/seo-graph";
import { getSeoGrowthReport } from "../lib/seo-growth-monitor";
import { rel } from "./content-utils";

type Probe = {
  ok: boolean;
  status: number | string;
  url: string;
  cache?: string | null;
  age?: string | null;
  contains?: Record<string, boolean>;
  locCount?: number;
  error?: string;
};

type Severity = "green" | "yellow" | "red";

const base = site.url.replace(/\/+$/, "");
const indexNowKey = "4d7b5e9c9f2a4c7c8e7d2a6b3c1f0a9e";
const outputJson = path.join(process.cwd(), "content", "automation", "seo-growth-heartbeat.json");
const outputMarkdown = path.join(process.cwd(), "docs", "seo-growth-heartbeat.md");

async function main() {
  const graph = getSeoGraph();
  const graphSummary = getSeoGraphSummary();
  const growth = getSeoGrowthReport(graph);
  const probes = await getLiveProbes();
  const vercel = await getVercelStatus();
  const problems = detectProblems(probes, growth, vercel);
  const severity = getSeverity(problems);
  const healthScore = getHealthScore(probes, growth, vercel, problems);
  const nextActions = getNextActions(severity, probes, growth, vercel);
  const report = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      fakeTrafficClaims: false,
      fakeRevenueClaims: false,
      dataSources: ["local SEO graph", "live HTTP probes", "GitHub commit status", "existing automation reports"],
      note: "GSC clicks, impressions, rankings, and indexed page counts are not invented. They remain external until manually checked or API-connected.",
    },
    status: {
      severity,
      healthScore,
      growthStage: growth.growthStage,
      canContinueScaling: growth.orphanPages === 0 && growth.internalLinkHealth >= 90 && healthScore >= 80,
    },
    growth: {
      totalPages: growth.totalPages,
      qPages: growth.qPages,
      blogPages: growth.blogPages,
      clusterPages: growth.clusterPages,
      orphanPages: growth.orphanPages,
      weakPages: growth.weakPages,
      internalLinkHealth: growth.internalLinkHealth,
      growthReadinessScore: growth.growthReadinessScore,
      seoScore: growth.seoScore,
      graphNodes: graphSummary.nodeCount,
      graphEdges: graphSummary.edgeCount,
    },
    live: probes,
    vercel,
    problems,
    nextActions,
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMarkdown), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMarkdown, toMarkdown(report), "utf8");

  console.log(
    JSON.stringify(
      {
        ok: severity !== "red",
        severity,
        healthScore,
        growthStage: growth.growthStage,
        qPages: growth.qPages,
        blogPages: growth.blogPages,
        clusterPages: growth.clusterPages,
        orphanPages: growth.orphanPages,
        json: rel(outputJson),
        markdown: rel(outputMarkdown),
      },
      null,
      2,
    ),
  );
}

async function getLiveProbes() {
  const probes = {
    home: await probe(`${base}/`, ["AI 工具指南", "SEO", "500"]),
    blog: await probe(`${base}/blog`, ["新手教程", "500", "/blog/"]),
    q: await probe(`${base}/q`, ["Question Layer", "/q/codex"]),
    sitemapIndex: await probe(`${base}/sitemap.xml`, ["<sitemapindex"]),
    sitemapBlog: await probe(`${base}/sitemap-blog.xml`, ["<urlset"], true),
    sitemapQ: await probe(`${base}/sitemap-q.xml`, ["<urlset"], true),
    sitemapCluster: await probe(`${base}/sitemap-cluster.xml`, ["<urlset"], true),
    robots: await probe(`${base}/robots.txt`, ["Sitemap", "Allow"]),
    growthApi: await probe(`${base}/api/seo/growth-report`, ["growthStage", "qPages"]),
    indexNowKey: await probe(`${base}/indexnow-${indexNowKey}.txt`, [indexNowKey]),
  };

  return probes;
}

async function probe(url: string, needles: string[] = [], countLoc = false): Promise<Probe> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "ai-tools-guide-seo-heartbeat/1.0" },
      cache: "no-store",
    });
    const text = await response.text();
    const contains = Object.fromEntries(needles.map((needle) => [needle, text.includes(needle)]));

    return {
      ok: response.ok && Object.values(contains).every(Boolean),
      status: response.status,
      url,
      cache: response.headers.get("x-vercel-cache"),
      age: response.headers.get("age"),
      contains,
      locCount: countLoc ? (text.match(/<loc>/g) || []).length : undefined,
    };
  } catch (error) {
    return {
      ok: false,
      status: "fetch-error",
      url,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function getVercelStatus() {
  const repository = process.env.GITHUB_REPOSITORY || "butianhua4/ai-jiedan-lab";
  const sha = process.env.GITHUB_SHA || getLocalSha();
  const result = {
    repository,
    sha,
    state: "unknown" as string,
    description: "No GitHub status response yet.",
    targetUrl: "",
  };

  if (!sha) return result;

  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "User-Agent": "ai-tools-guide-seo-heartbeat/1.0",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await fetch(`https://api.github.com/repos/${repository}/commits/${sha}/status`, { headers });
    const payload = (await response.json()) as {
      statuses?: Array<{ context: string; description?: string; state: string; target_url?: string }>;
    };
    const vercel = payload.statuses?.find((status) => status.context.toLowerCase() === "vercel");
    if (vercel) {
      result.state = vercel.state;
      result.description = vercel.description || "";
      result.targetUrl = vercel.target_url || "";
    }
  } catch (error) {
    result.state = "fetch-error";
    result.description = error instanceof Error ? error.message : String(error);
  }

  return result;
}

function getLocalSha() {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function detectProblems(probes: Awaited<ReturnType<typeof getLiveProbes>>, growth: ReturnType<typeof getSeoGrowthReport>, vercel: Awaited<ReturnType<typeof getVercelStatus>>) {
  const problems: Array<{ severity: Severity; area: string; message: string }> = [];
  const required = [
    ["home", probes.home],
    ["blog", probes.blog],
    ["q", probes.q],
    ["sitemap.xml", probes.sitemapIndex],
    ["sitemap-blog.xml", probes.sitemapBlog],
    ["sitemap-q.xml", probes.sitemapQ],
    ["sitemap-cluster.xml", probes.sitemapCluster],
    ["robots.txt", probes.robots],
    ["growth API", probes.growthApi],
    ["IndexNow key", probes.indexNowKey],
  ] as const;

  for (const [area, item] of required) {
    if (!item.ok) problems.push({ severity: "red", area, message: `${area} probe failed or missed expected content.` });
  }

  if ((probes.sitemapBlog.locCount || 0) < 450) problems.push({ severity: "red", area: "sitemap-blog.xml", message: "Blog sitemap has fewer than 450 URLs." });
  if ((probes.sitemapQ.locCount || 0) < 450) problems.push({ severity: "red", area: "sitemap-q.xml", message: "Q sitemap has fewer than 450 URLs." });
  if ((probes.sitemapCluster.locCount || 0) < 6) problems.push({ severity: "red", area: "sitemap-cluster.xml", message: "Cluster sitemap has fewer than 6 URLs." });
  if (growth.orphanPages > 0) problems.push({ severity: "red", area: "internal links", message: `${growth.orphanPages} orphan pages found.` });
  if (growth.weakPages > 0) problems.push({ severity: "yellow", area: "internal links", message: `${growth.weakPages} weak pages found.` });
  if (growth.growthStage === "cold_start") problems.push({ severity: "yellow", area: "growth", message: "Growth stage is still cold_start." });
  if (vercel.state === "pending") problems.push({ severity: "yellow", area: "vercel", message: "Latest Vercel deployment is still pending." });
  if (vercel.state === "failure" || vercel.state === "error") problems.push({ severity: "red", area: "vercel", message: `Latest Vercel deployment status is ${vercel.state}.` });

  return problems;
}

function getSeverity(problems: Array<{ severity: Severity }>): Severity {
  if (problems.some((problem) => problem.severity === "red")) return "red";
  if (problems.some((problem) => problem.severity === "yellow")) return "yellow";
  return "green";
}

function getHealthScore(
  probes: Awaited<ReturnType<typeof getLiveProbes>>,
  growth: ReturnType<typeof getSeoGrowthReport>,
  vercel: Awaited<ReturnType<typeof getVercelStatus>>,
  problems: Array<{ severity: Severity }>,
) {
  let score = 0;
  if (vercel.state === "success" || vercel.state === "unknown") score += 15;
  if (probes.sitemapIndex.ok && probes.sitemapBlog.ok && probes.sitemapQ.ok && probes.sitemapCluster.ok) score += 20;
  if (probes.home.ok && probes.blog.ok && probes.q.ok) score += 20;
  if (growth.qPages >= 300 && growth.blogPages >= 300 && growth.clusterPages >= 6) score += 20;
  if (growth.orphanPages === 0 && growth.weakPages === 0 && growth.internalLinkHealth >= 90) score += 15;
  if (probes.indexNowKey.ok) score += 10;

  return Math.max(0, score - problems.filter((problem) => problem.severity === "red").length * 20 - problems.filter((problem) => problem.severity === "yellow").length * 5);
}

function getNextActions(
  severity: Severity,
  probes: Awaited<ReturnType<typeof getLiveProbes>>,
  growth: ReturnType<typeof getSeoGrowthReport>,
  vercel: Awaited<ReturnType<typeof getVercelStatus>>,
) {
  const actions: string[] = [];
  if (vercel.state === "pending") actions.push("Check the Vercel deployment URL if it stays pending for more than 20 minutes.");
  if (!probes.home.ok) actions.push("Fix the homepage because it is the highest-authority public entry.");
  if (!probes.sitemapQ.ok || (probes.sitemapQ.locCount || 0) < 450) actions.push("Fix q sitemap before requesting more indexing.");
  if (!probes.indexNowKey.ok) actions.push("Fix IndexNow key route before submitting Bing batches.");
  if (growth.orphanPages > 0 || growth.weakPages > 0) actions.push("Run internal link repair before scaling more pages.");
  actions.push("In GSC, resubmit /sitemap.xml when a deployment changes q, cluster, or sitemap structure.");
  actions.push("Manually request indexing for 15-30 priority URLs from docs/gsc-indexing-priority.md when GSC allows it; do not submit all 500 pages.");
  actions.push("Prioritize exact problem-entry pages: Codex errors, Vercel failures, GitHub Actions failures, Agent deployment, RAG memory, API key and rate limits.");
  if (severity === "green") actions.push("Keep the current growth phase running; wait for Search Console to move discovered q/cluster pages into indexed pages.");
  return actions;
}

function toMarkdown(report: {
  generatedAt: string;
  guardrails: { fakeRevenueClaims: boolean; fakeTrafficClaims: boolean; note: string };
  growth: Record<string, number>;
  live: Record<string, Probe>;
  nextActions: string[];
  problems: Array<{ area: string; message: string; severity: Severity }>;
  status: { canContinueScaling: boolean; growthStage: string; healthScore: number; severity: Severity };
  vercel: { description: string; repository: string; sha: string; state: string; targetUrl: string };
}) {
  return [
    "# SEO Growth Heartbeat",
    "",
    `Generated at: ${report.generatedAt}`,
    "",
    "## Status",
    "",
    `- Severity: ${report.status.severity}`,
    `- Health score: ${report.status.healthScore}`,
    `- Growth stage: ${report.status.growthStage}`,
    `- Can continue scaling: ${report.status.canContinueScaling}`,
    "",
    "## Guardrails",
    "",
    `- Fake traffic claims: ${report.guardrails.fakeTrafficClaims}`,
    `- Fake revenue claims: ${report.guardrails.fakeRevenueClaims}`,
    `- Note: ${report.guardrails.note}`,
    "",
    "## Growth",
    "",
    ...Object.entries(report.growth).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Live Probes",
    "",
    ...Object.entries(report.live).map(([key, value]) => `- ${key}: ${value.ok ? "ok" : "fail"} (${value.status})${typeof value.locCount === "number" ? `, loc=${value.locCount}` : ""}`),
    "",
    "## Vercel",
    "",
    `- Repository: ${report.vercel.repository}`,
    `- SHA: ${report.vercel.sha}`,
    `- State: ${report.vercel.state}`,
    `- Description: ${report.vercel.description}`,
    `- Target: ${report.vercel.targetUrl || "n/a"}`,
    "",
    "## Problems",
    "",
    ...(report.problems.length ? report.problems.map((problem) => `- [${problem.severity}] ${problem.area}: ${problem.message}`) : ["- None"]),
    "",
    "## Next Actions",
    "",
    ...report.nextActions.map((action, index) => `${index + 1}. ${action}`),
    "",
  ].join("\n");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

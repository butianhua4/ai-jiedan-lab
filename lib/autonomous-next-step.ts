import fs from "fs";
import path from "path";
import { autonomousTaskPool, type AutonomousTask } from "@/data/autonomous-task-pool";
import { tools } from "@/data/tools";
import { getSeoGraphSummary } from "@/lib/seo-graph";
import { getSeoGrowthReport } from "@/lib/seo-growth-monitor";
import { getSystemStatus } from "@/lib/system-status";

export type AutonomousStage = "cold_start" | "warming" | "growth" | "monetization" | "scale";
export type AutonomousMode = "report-only" | "plan-only" | "execute-low-risk";
export type AutonomousRunStatus = "success" | "failed" | "skipped" | "report-only";

export type AutonomousDecision = {
  currentStage: AutonomousStage;
  mainBottleneck: string;
  recommendedTask: AutonomousTask;
  nextThreeCandidates: AutonomousTask[];
  observed: AutonomousObservedState;
};

export type AutonomousObservedState = {
  generatedAt: string;
  system: {
    healthScore: number;
    buildSuccess: boolean;
    sitemapNormal: boolean;
    noErrors: boolean;
    mode: string;
  };
  seo: {
    totalPages: number;
    qPages: number;
    blogPages: number;
    clusterPages: number;
    orphanPages: number;
    weakPages: number;
    internalLinkHealth: number;
    growthReadinessScore: number;
    seoScore: number;
    indexedPages: number | null;
    impressions: number | null;
    clicks: number | null;
  };
  graph: {
    nodeCount: number;
    edgeCount: number;
    internalLinksComplete: boolean;
  };
  sitemap: {
    urlCount: number;
    ok: boolean;
  };
  content: {
    published: number;
    draft: number;
    noindex: number;
  };
  tools: {
    count: number;
    staticToolPages: number;
  };
  conversion: {
    hasServicesPage: boolean;
    hasHireMePage: boolean;
    hasContactPage: boolean;
    hasTemplatePage: boolean;
    hasMonetizationPage: boolean;
  };
  monitoring: {
    hasSearchPlatformStatusLib: boolean;
    hasPlatformStatusApi: boolean;
    hasBehaviorAnalyticsConfigured: boolean;
    hasManualIndexingList: boolean;
    hasTop50QuestionOptimizationList: boolean;
    hasEnglishExpansionPlan: boolean;
    hasEnglishQDraftFramework: boolean;
    hasHighPotentialKeywordList: boolean;
    hasDeadPageImprovementReport: boolean;
    hasFreshBingIndexNowPlan: boolean;
    hasFreshDomesticSearchAdaptationPlan: boolean;
    hasFreshQSnippetTemplateReport: boolean;
    hasQFaqJsonLd: boolean;
    hasClusterBreadcrumbJsonLd: boolean;
  };
  latestReports: Array<{ path: string; updatedAt: string }>;
  latestCommit: string | null;
};

export type AutonomousLoopStatus = {
  enabled: boolean;
  mode: AutonomousMode;
  currentStage: AutonomousStage;
  lastRunAt: string | null;
  lastTask: string | null;
  lastStatus: AutonomousRunStatus | null;
  lastReport: string | null;
  nextRecommendedTask: string;
  autoExecuteAllowed: boolean;
  blockedReasons: string[];
  guardrails: {
    maxFilesChanged: number;
    maxFilesAdded: number;
    maxFilesDeleted: number;
    forbidsSensitiveConfig: boolean;
    requiresVerification: string[];
  };
};

const statusFile = projectPath("content", "automation", "autonomous-loop-status.json");
const reportDir = projectPath("reports", "autonomous-loop");

export function decideAutonomousNextStep(): AutonomousDecision {
  const observed = getAutonomousObservedState();
  const candidates = rankCandidates(observed);
  const recommendedTask = candidates[0] || autonomousTaskPool[0];

  return {
    currentStage: detectAutonomousStage(observed),
    mainBottleneck: detectBottleneck(observed),
    recommendedTask,
    nextThreeCandidates: candidates.slice(1, 4),
    observed,
  };
}

export function getAutonomousObservedState(): AutonomousObservedState {
  const system = getSystemStatus();
  const growth = getSeoGrowthReport();
  const graph = getSeoGraphSummary();

  return {
    generatedAt: new Date().toISOString(),
    system: {
      healthScore: system.health.score,
      buildSuccess: system.health.checks.buildSuccess,
      sitemapNormal: system.health.checks.sitemapNormal,
      noErrors: system.health.checks.noErrors,
      mode: system.system.mode,
    },
    seo: {
      totalPages: growth.totalPages,
      qPages: growth.qPages,
      blogPages: growth.blogPages,
      clusterPages: growth.clusterPages,
      orphanPages: growth.orphanPages,
      weakPages: growth.weakPages,
      internalLinkHealth: growth.internalLinkHealth,
      growthReadinessScore: growth.growthReadinessScore,
      seoScore: growth.seoScore,
      indexedPages: growth.indexedPages,
      impressions: growth.impressions,
      clicks: growth.clicks,
    },
    graph: {
      nodeCount: graph.nodeCount,
      edgeCount: graph.edgeCount,
      internalLinksComplete: graph.internalLinksComplete,
    },
    sitemap: {
      urlCount: system.seo.sitemap.urlCount,
      ok: system.seo.sitemap.ok,
    },
    content: {
      published: system.content.published,
      draft: system.content.draft,
      noindex: system.content.noindex,
    },
    tools: {
      count: tools.length,
      staticToolPages: system.pages.toolPages,
    },
    conversion: {
      hasServicesPage: fs.existsSync(projectPath("app", "services", "page.tsx")),
      hasHireMePage: fs.existsSync(projectPath("app", "hire-me", "page.tsx")),
      hasContactPage: fs.existsSync(projectPath("app", "contact", "page.tsx")),
      hasTemplatePage: fs.existsSync(projectPath("app", "templates", "page.tsx")),
      hasMonetizationPage: fs.existsSync(projectPath("app", "monetization", "page.tsx")),
    },
    monitoring: {
      hasSearchPlatformStatusLib: fs.existsSync(projectPath("lib", "search-platform-status.ts")),
      hasPlatformStatusApi: fs.existsSync(projectPath("app", "api", "seo", "platform-status", "route.ts")),
      hasBehaviorAnalyticsConfigured:
        system.searchPlatforms.analytics.googleAnalytics.configured && system.searchPlatforms.analytics.microsoftClarity.configured,
      hasManualIndexingList: fs.existsSync(projectPath("content", "automation", "manual-indexing-priority.json")),
      hasTop50QuestionOptimizationList: fs.existsSync(projectPath("content", "automation", "top-50-q-optimization.json")),
      hasEnglishExpansionPlan: fs.existsSync(projectPath("content", "automation", "english-expansion-plan.json")),
      hasEnglishQDraftFramework: fs.existsSync(projectPath("content", "automation", "english-q-draft-framework.json")),
      hasHighPotentialKeywordList: fs.existsSync(projectPath("content", "automation", "high-potential-keywords.json")),
      hasDeadPageImprovementReport: fs.existsSync(projectPath("content", "automation", "dead-page-improvements.json")),
      hasFreshBingIndexNowPlan: fileGeneratedToday(projectPath("content", "automation", "indexnow-readiness.json")),
      hasFreshDomesticSearchAdaptationPlan: fileGeneratedToday(projectPath("content", "automation", "domestic-search-adaptation-plan.json")),
      hasFreshQSnippetTemplateReport: fileGeneratedToday(projectPath("content", "automation", "q-snippet-template-optimization.json")),
      hasQFaqJsonLd: fileContains(projectPath("app", "q", "[category]", "[slug]", "page.tsx"), '"@type": "FAQPage"'),
      hasClusterBreadcrumbJsonLd: fileContains(projectPath("app", "cluster", "[slug]", "page.tsx"), '"@type": "BreadcrumbList"'),
    },
    latestReports: getLatestReports(),
    latestCommit: getLatestCommit(),
  };
}

export function getAutonomousLoopStatus(defaultMode: AutonomousMode = "report-only"): AutonomousLoopStatus {
  const saved = readJson<Partial<AutonomousLoopStatus>>(statusFile);
  const decision = decideAutonomousNextStep();
  const blockedReasons = getBlockedReasons(decision.recommendedTask);

  return {
    enabled: true,
    mode: saved?.mode || defaultMode,
    currentStage: saved?.currentStage || decision.currentStage,
    lastRunAt: saved?.lastRunAt || null,
    lastTask: saved?.lastTask || null,
    lastStatus: saved?.lastStatus || null,
    lastReport: saved?.lastReport || null,
    nextRecommendedTask: decision.recommendedTask.title,
    autoExecuteAllowed: decision.recommendedTask.allowedToAutoExecute && decision.recommendedTask.riskLevel === "low" && blockedReasons.length === 0,
    blockedReasons,
    guardrails: getAutonomousGuardrails(),
  };
}

export function getAutonomousGuardrails() {
  return {
    maxFilesChanged: 20,
    maxFilesAdded: 8,
    maxFilesDeleted: 3,
    forbidsSensitiveConfig: true,
    requiresVerification: ["npm run lint", "npm run seo:check", "npm run build"],
  };
}

export function writeAutonomousLoopStatus(status: AutonomousLoopStatus) {
  fs.mkdirSync(path.dirname(statusFile), { recursive: true });
  fs.writeFileSync(statusFile, `${JSON.stringify(status, null, 2)}\n`, "utf8");
}

export function getLatestAutonomousReportPath() {
  if (!fs.existsSync(reportDir)) return null;
  const reports = fs
    .readdirSync(reportDir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => path.join(reportDir, name))
    .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return reports[0] ? path.relative(process.cwd(), reports[0]).replace(/\\/g, "/") : null;
}

function rankCandidates(observed: AutonomousObservedState) {
  const byId = new Map(autonomousTaskPool.map((task) => [task.id, task]));
  const chosen: AutonomousTask[] = [];
  const push = (id: string) => {
    const task = byId.get(id);
    if (task && !chosen.some((item) => item.id === task.id)) chosen.push(task);
  };

  if (!observed.system.buildSuccess || !observed.sitemap.ok || !observed.system.noErrors) {
    push("seo-indexability-report");
    push("seo-robots-check");
    push("seo-canonical-check");
  }

  if (observed.seo.orphanPages > 0 || observed.seo.weakPages > 0 || !observed.graph.internalLinksComplete) {
    push("seo-related-q-links");
    push("seo-blog-to-q-links");
    push("seo-indexability-report");
  }

  if (observed.seo.qPages > 300 && observed.tools.count < 12) {
    push("tool-error-explainer-upgrade");
    push("tool-sitemap-url-checker");
    push("tool-title-generator");
  }

  if ((observed.seo.impressions || 0) > 0 && (observed.seo.clicks || 0) === 0 && !observed.monitoring.hasFreshQSnippetTemplateReport) {
    push("seo-q-title-template");
    push("seo-q-description-template");
    push("conversion-fix-this-error-cta");
  }

  if (!observed.conversion.hasServicesPage) push("conversion-services-page");
  if (!observed.conversion.hasHireMePage) push("conversion-hire-me-page");

  if (observed.seo.growthReadinessScore >= 100 && observed.seo.clicks === null) {
    if (!observed.monitoring.hasBehaviorAnalyticsConfigured) push("monitoring-ga-clarity-status");
    if (!observed.monitoring.hasSearchPlatformStatusLib || !observed.monitoring.hasPlatformStatusApi) push("monitoring-gsc-bing-placeholders");
  }

  if (observed.seo.growthReadinessScore >= 100 && observed.monitoring.hasBehaviorAnalyticsConfigured && observed.monitoring.hasSearchPlatformStatusLib) {
    if (!observed.monitoring.hasManualIndexingList) push("content-gsc-manual-indexing-list");
    if (!observed.monitoring.hasTop50QuestionOptimizationList) push("content-top-50-q-optimization");
    if (!observed.monitoring.hasEnglishExpansionPlan) push("content-cn-to-en-expansion-plan");
    if (!observed.monitoring.hasEnglishQDraftFramework) push("content-english-q-draft-plan");
    if (!observed.monitoring.hasHighPotentialKeywordList) push("content-high-potential-keywords");
    if (!observed.monitoring.hasDeadPageImprovementReport) push("content-dead-page-improvements");
    if (!observed.monitoring.hasFreshBingIndexNowPlan) push("content-bing-indexnow-plan");
    if (!observed.monitoring.hasFreshDomesticSearchAdaptationPlan) push("content-cn-search-adaptation-plan");
    if (!observed.monitoring.hasFreshQSnippetTemplateReport) push("seo-q-title-template");
  } else {
    push("monitoring-ga-clarity-status");
    push("monitoring-gsc-bing-placeholders");
  }

  if (observed.seo.qPages >= 500 && !observed.conversion.hasServicesPage) {
    push("conversion-services-page");
  }

  return [
    ...chosen,
    ...autonomousTaskPool.filter((task) => !chosen.some((item) => item.id === task.id) && !isFreshlyCompletedTask(task.id, observed)),
  ];
}

function isFreshlyCompletedTask(taskId: string, observed: AutonomousObservedState) {
  if ((taskId === "seo-q-title-template" || taskId === "seo-q-description-template") && observed.monitoring.hasFreshQSnippetTemplateReport) return true;
  if (taskId === "seo-q-faq-jsonld" && observed.monitoring.hasQFaqJsonLd) return true;
  if (taskId === "seo-cluster-breadcrumb-jsonld" && observed.monitoring.hasClusterBreadcrumbJsonLd) return true;
  if (taskId === "content-bing-indexnow-plan" && observed.monitoring.hasFreshBingIndexNowPlan) return true;
  if (taskId === "content-cn-search-adaptation-plan" && observed.monitoring.hasFreshDomesticSearchAdaptationPlan) return true;
  return false;
}

function detectBottleneck(observed: AutonomousObservedState) {
  if (!observed.system.buildSuccess) return "Build output is not healthy.";
  if (!observed.sitemap.ok) return "Sitemap/indexability surface is not healthy.";
  if (observed.seo.orphanPages > 0) return "Orphan pages still exist.";
  if (observed.seo.weakPages > 0) return "Weak internal-link pages still exist.";
  if (!observed.conversion.hasServicesPage || !observed.conversion.hasHireMePage) return "SEO structure is healthy, but monetization entry points are incomplete.";
  if (observed.seo.indexedPages === null) return "Search Console data is not imported yet, so indexing progress is still manually monitored.";
  if ((observed.seo.impressions || 0) > 0 && (observed.seo.clicks || 0) === 0) return "Impressions exist but clicks are not proven yet.";
  return "No blocking technical issue; continue low-risk growth improvements.";
}

function detectAutonomousStage(observed: AutonomousObservedState): AutonomousStage {
  if (!observed.system.buildSuccess || !observed.sitemap.ok || observed.system.healthScore < 60) return "cold_start";
  if (observed.seo.totalPages >= 5000 && observed.graph.internalLinksComplete) return "scale";
  if (observed.conversion.hasServicesPage && observed.conversion.hasHireMePage) return "monetization";
  if ((observed.seo.impressions || 0) > 0 || (observed.seo.clicks || 0) > 0) return "growth";
  return "warming";
}

function getBlockedReasons(task: AutonomousTask) {
  const reasons: string[] = [];
  if (task.riskLevel === "high") reasons.push("Task risk level is high.");
  if (!task.allowedToAutoExecute) reasons.push("Task is marked manual-only.");
  if (task.id.includes("dns") || task.title.toLowerCase().includes("dns")) reasons.push("DNS/domain changes require human confirmation.");
  if (task.title.toLowerCase().includes("payment") || task.title.toLowerCase().includes("ads")) reasons.push("Payment or ad account work requires human confirmation.");
  return reasons;
}

function getLatestReports() {
  const dirs = [projectPath("docs"), reportDir].filter((dir) => fs.existsSync(dir));
  return dirs
    .flatMap((dir) =>
      fs
        .readdirSync(dir)
        .filter((name) => name.endsWith(".md"))
        .map((name) => {
          const fullPath = path.join(dir, name);
          return {
            path: path.relative(process.cwd(), fullPath).replace(/\\/g, "/"),
            updatedAt: fs.statSync(fullPath).mtime.toISOString(),
          };
        }),
    )
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 10);
}

function getLatestCommit() {
  const headFile = projectPath(".git", "HEAD");
  if (!fs.existsSync(headFile)) return null;
  const head = fs.readFileSync(headFile, "utf8").trim();
  if (!head.startsWith("ref:")) return head.slice(0, 12);
  const refPath = projectPath(".git", head.replace("ref: ", ""));
  return fs.existsSync(refPath) ? fs.readFileSync(refPath, "utf8").trim().slice(0, 12) : null;
}

function readJson<T>(file: string): T | null {
  try {
    return fs.existsSync(file) ? (JSON.parse(fs.readFileSync(file, "utf8")) as T) : null;
  } catch {
    return null;
  }
}

function fileGeneratedToday(file: string) {
  const data = readJson<{ generatedAt?: string }>(file);
  return Boolean(data?.generatedAt && data.generatedAt.slice(0, 10) === new Date().toISOString().slice(0, 10));
}

function fileContains(file: string, pattern: string) {
  try {
    return fs.existsSync(file) && fs.readFileSync(file, "utf8").includes(pattern);
  } catch {
    return false;
  }
}

function projectPath(...parts: string[]) {
  return path.join(/*turbopackIgnore: true*/ process.cwd(), ...parts);
}

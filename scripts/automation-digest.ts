import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type Report<T> = {
  data: T | null;
  missing: boolean;
  path: string;
};

type ReviewCandidate = {
  cluster: string;
  file: string;
  opportunityReason: string;
  opportunityScore: number;
  title: string;
};

type PreflightItem = {
  file: string;
  issues: string[];
  ok: boolean;
  qualityScore: number;
  title: string;
};

type OpportunityTarget = {
  category: string;
  published: number;
  reason: string;
  reviewReadyDrafts: number;
};

type ContentOpportunity = {
  gapScore: number;
  publicMatches: number;
  readyCandidates: unknown[];
  topic: string;
  why: string;
};

type ReviewCoverage = {
  summary: {
    currentPackCovered: number;
    itemsMissingFactCheckQueries: number;
    itemsMissingOfficialSources: number;
    itemsMissingRiskChecks: number;
    missingCoverage: number;
    plannedCandidates: number;
    unsafeIndexingItems: number;
  };
};

type PromptCoverage = {
  coverage: Array<{
    candidates: unknown[];
    gapScore: number;
    industry: string;
    publicMatches: number;
    searchQueries: string[];
  }>;
  summary: {
    industries: number;
    industriesWithReadyCandidates: number;
    promptPublicArticles: number;
    reviewReadyPromptDrafts: number;
    uniqueCandidateFiles: number;
  };
};

type DeploymentCoverage = {
  coverage: Array<{
    candidates: unknown[];
    gapScore: number;
    publicMatches: number;
    searchQueries: string[];
    topic: string;
  }>;
  summary: {
    deploymentPublicArticles: number;
    reviewReadyDeploymentDrafts: number;
    topics: number;
    topicsWithReadyCandidates: number;
    uniqueCandidateFiles: number;
  };
};

type ReviewRoadmap = {
  lanes: Array<{
    candidates: unknown[];
    lane: string;
    priorityScore: number;
    publicMatches: number;
  }>;
  nextReviewFiles: string[];
  summary: {
    lanes: number;
    topicsWithoutPublicCoverage: number;
    uniqueNextReviewFiles: number;
    unsafeCandidates: number;
  };
};

type NextReviewSourcePack = {
  items: Array<{
    currentPack: boolean;
    factCheckQueries: string[];
    file: string;
    officialSourceTargets: string[];
    plannedBatch: boolean;
    qualityScore: number;
    riskReviewChecklist: string[];
    safeDraft: boolean;
    title: string;
  }>;
  summary: {
    items: number;
    missingApprovalChecks: number;
    missingFactCheckQueries: number;
    missingOfficialSources: number;
    missingRiskChecks: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
};

type PublicExpansionQueue = {
  approvalWaves: Array<{
    files: string[];
    wave: number;
  }>;
  summary: {
    approvalWaves: number;
    duplicateFiles: number;
    items: number;
    sourcePackReadyItems: number;
    unsafeItems: number;
  };
  items: Array<{
    approvalWave: number;
    currentPack: boolean;
    file: string;
    plannedBatch: boolean;
    priorityScore: number;
    sourcePackReady: boolean;
    title: string;
  }>;
};

type WaveApprovalPacket = {
  files: string[];
  items: Array<{
    file: string;
    officialSourceTargets: string[];
    readyForHumanReview: boolean;
    riskReviewChecklist: string[];
    title: string;
  }>;
  summary: {
    items: number;
    readyForHumanReview: number;
    unsafeItems: number;
    wave: number;
  };
};

type WavePublishSimulation = {
  items: Array<{
    blockers: string[];
    currentStatus: string;
    file: string;
    readyForHumanApproval: boolean;
    title: string;
  }>;
  summary: {
    currentlyPublishable: number;
    items: number;
    projectedPublicPublishedAfterWave: number;
    projectedPublishableAfterHumanApproval: number;
    publicPublishedBeforeWave: number;
    readyForHumanApproval: number;
    unsafeItems: number;
    wave: number;
  };
};

type TrafficEvidence = {
  liveEvidence: {
    googleAnalyticsSnippet: boolean;
    googleSiteVerificationMeta: boolean;
    status: number;
    vercelAnalyticsSnippet: boolean;
  };
  measuredTrafficSources: string[];
  summary: {
    canClaimTraffic: boolean;
    claimableMetrics: number;
    failedChecks: number;
    measuredTrafficSources: number;
    searchConsoleVerificationEvidence: boolean;
    trafficDataAvailable: boolean;
  };
};

type TrafficClaimGuard = {
  summary: {
    filesScanned: number;
    measuredTrafficUnavailable: boolean;
    unsafeClaims: number;
    watchMentions: number;
  };
};

type ContentIntegrity = {
  summary: {
    allIssueItems: number;
    blockingItems: number;
    expansionItems: number;
    filesScanned: number;
    publicItems: number;
    recommendedItems: number;
    waveItems: number;
  };
};

type InternalLinks = {
  summary: {
    candidateItems: number;
    candidateItemsMissingPublicLinkSuggestion: number;
    candidateItemsWithPublicSuggestions: number;
    expansionItems: number;
    publicArticles: number;
    recommendedItems: number;
    waveItems: number;
    waveItemsMissingPublicLinkSuggestion: number;
  };
};

type SearchSnippets = {
  summary: {
    blockingItems: number;
    expansionItems: number;
    publicItems: number;
    recommendedItems: number;
    scopedItems: number;
    warningItems: number;
    waveItems: number;
    waveItemsWithBlockingIssues: number;
  };
};

type StructuredData = {
  summary: {
    blockingItems: number;
    expansionItems: number;
    jsonLdPreviewItems: number;
    publicItems: number;
    recommendedItems: number;
    scopedItems: number;
    warningItems: number;
    waveItems: number;
    waveItemsWithBlockingIssues: number;
  };
};

type SearchIntentLanes = {
  summary: {
    highPriorityLanes: number;
    lanes: number;
    lanesWithReadyDrafts: number;
    lanesWithoutPublicCoverage: number;
    maxPriorityScore: number;
    notReadyMatchedDrafts: number;
    totalReadyDraftMatches: number;
  };
  topLanes: Array<{
    demandScore: number;
    id: string;
    intentSeeds: string[];
    matchedCandidates: unknown[];
    priorityReason: string;
    priorityScore: number;
    publicCount: number;
    readyDraftCount: number;
    title: string;
  }>;
};

type SearchIntentApproval = {
  nextGapItems: Array<{
    file: string;
    lanePriorityScore: number;
    laneTitle: string;
    primaryKeyword: string;
    readyForHumanReview: boolean;
    title: string;
  }>;
  summary: {
    currentWaveItems: number;
    currentWaveReady: number;
    nextGapItems: number;
    nextGapLanes: number;
    unsafeItems: number;
    wave: number;
  };
};

type SearchIntentWaves = {
  summary: {
    plannedItems: number;
    plannedWaves: number;
    readyItems: number;
    uniqueFiles: number;
    uniqueLanes: number;
    unsafeItems: number;
  };
  waves: Array<{
    files: string[];
    focus: string;
    laneCount: number;
    readyItems: number;
    wave: number;
  }>;
};

type SearchQueryCoverage = {
  items: Array<{
    file: string;
    laneTitle: string;
    primaryKeyword: string;
    queryCount: number;
    readyForManualReview: boolean;
    title: string;
    wave: number;
  }>;
  summary: {
    items: number;
    readyItems: number;
    unsafeItems: number;
    uniqueFiles: number;
    uniqueLanes: number;
    uniqueQueries: number;
  };
};

const reports = {
  cannibalization: readJson<{ summary: { conflicts: number; reviewBatchConflicts: number } }>("content/automation/content-cannibalization.json"),
  freshness: readJson<{ summary: { currentReviewItems: number; highRisk: number; mediumRisk: number; plannedReviewItems: number } }>(
    "content/automation/content-freshness.json",
  ),
  contentBacklog: readJson<{ opportunities: ContentOpportunity[]; totals: { topics: number; topicsWithReadyCandidates: number } }>(
    "content/automation/content-opportunity-backlog.json",
  ),
  deploymentCoverage: readJson<DeploymentCoverage>("content/automation/ai-deployment-coverage.json"),
  promptCoverage: readJson<PromptCoverage>("content/automation/industry-prompt-coverage.json"),
  gate: readJson<{ ok: boolean; summary: { checks: number; failed: number; passed: number } }>("content/automation/automation-gate.json"),
  liveSearch: readJson<{
    articles: { checked: number; failed: unknown[]; missingFromSitemap: string[]; publicCount: number };
    failedChecks: string[];
    generatedAt: string;
    ok: boolean;
    sitemap: { urlCount: number };
  }>("content/automation/live-search-surface.json"),
  workbench: readJson<{
    publishReadiness: { currentItemsCovered: number };
    reviewPlan: { nextBatch: { batch: number; topic: string } | null };
  }>("content/automation/manual-review-workbench.json"),
  preflight: readJson<{ ok: boolean; summary: { checked: number; failed: number; passed: number }; items: PreflightItem[] }>(
    "content/automation/review-preflight.json",
  ),
  project: readJson<{ articles: { publicPublished: number; publishableNow: unknown[]; statusCounts: Record<string, number> } }>(
    "content/automation/project-status.json",
  ),
  reviewPlan: readJson<{ batches: Array<{ batch: number; candidates: unknown[]; topic: string }>; totals: { plannedBatches: number; plannedCandidates: number } }>(
    "content/automation/review-batch-plan.json",
  ),
  reviewCoverage: readJson<ReviewCoverage>("content/automation/review-coverage-report.json"),
  reviewRoadmap: readJson<ReviewRoadmap>("content/automation/review-priority-roadmap.json"),
  nextReviewSourcePack: readJson<NextReviewSourcePack>("content/automation/next-review-source-pack.json"),
  publicExpansion: readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json"),
  waveApprovalPacket: readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json"),
  wavePublishSimulation: readJson<WavePublishSimulation>("content/automation/wave-publish-simulation.json"),
  trafficEvidence: readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json"),
  trafficClaimGuard: readJson<TrafficClaimGuard>("content/automation/traffic-claim-guard.json"),
  contentIntegrity: readJson<ContentIntegrity>("content/automation/content-integrity-audit.json"),
  internalLinks: readJson<InternalLinks>("content/automation/internal-link-opportunity-audit.json"),
  searchSnippets: readJson<SearchSnippets>("content/automation/search-snippet-readiness-audit.json"),
  structuredData: readJson<StructuredData>("content/automation/structured-data-readiness-audit.json"),
  searchIntentLanes: readJson<SearchIntentLanes>("content/automation/search-intent-lane-map.json"),
  searchIntentApproval: readJson<SearchIntentApproval>("content/automation/search-intent-approval-packet.json"),
  searchIntentWaves: readJson<SearchIntentWaves>("content/automation/search-intent-wave-planner.json"),
  searchQueryCoverage: readJson<SearchQueryCoverage>("content/automation/search-query-coverage.json"),
  review: readJson<{ counts: { candidates: number; returned: number; rejected: Record<string, number> }; recommendedToday: ReviewCandidate[] }>(
    "content/automation/review-candidates.json",
  ),
  run: readJson<{ failures: string[]; ok: boolean; tasks: string[] }>("content/automation/automation-run-summary.json"),
  searchability: readJson<{ failedItems: unknown[]; score: number }>("content/automation/searchability-check.json"),
  seo: readJson<{ ok: boolean; publicPosts: number }>("content/automation/seo-check.json"),
  seoOpportunity: readJson<{ nextReviewTargets: OpportunityTarget[]; totals: { reviewReadyDrafts: number } }>(
    "content/automation/seo-opportunity-map.json",
  ),
};

const missingReports = Object.values(reports)
  .filter((report) => report.missing)
  .map((report) => report.path);

const payload = {
  generatedAt: new Date().toISOString(),
  guardrails: {
    autoPublish: false,
    note: "Digest is read-only. It summarizes local automation reports and does not use traffic, impressions, or Search Console performance data.",
  },
  health: {
    gateOk: reports.gate.data?.ok ?? false,
    missingReports,
    preflightOk: reports.preflight.data?.ok ?? false,
    runOk: reports.run.data?.ok ?? false,
    searchabilityScore: reports.searchability.data?.score ?? null,
    seoOk: reports.seo.data?.ok ?? false,
    trafficDataAvailable: reports.trafficEvidence.data?.summary.trafficDataAvailable ?? false,
  },
  contentIntegrity: reports.contentIntegrity.data?.summary ?? null,
  internalLinks: reports.internalLinks.data?.summary ?? null,
  searchSnippets: reports.searchSnippets.data?.summary ?? null,
  structuredData: reports.structuredData.data?.summary ?? null,
  publishingBoundary: {
    publicPublished: reports.project.data?.articles.publicPublished ?? null,
    publishableNow: reports.project.data?.articles.publishableNow.length ?? null,
    statusCounts: reports.project.data?.articles.statusCounts ?? {},
  },
  reviewQueue: {
    candidates: reports.review.data?.counts.candidates ?? null,
    returned: reports.review.data?.counts.returned ?? null,
    recommendedToday: reports.review.data?.recommendedToday ?? [],
  },
  reviewPlan: {
    batches: reports.reviewPlan.data?.batches.slice(0, 3) ?? [],
    plannedBatches: reports.reviewPlan.data?.totals.plannedBatches ?? null,
    plannedCandidates: reports.reviewPlan.data?.totals.plannedCandidates ?? null,
  },
  reviewCoverage: reports.reviewCoverage.data?.summary ?? null,
  reviewRoadmap: {
    lanes: reports.reviewRoadmap.data?.summary.lanes ?? null,
    nextReviewFiles: reports.reviewRoadmap.data?.nextReviewFiles.slice(0, 12) ?? [],
    topicsWithoutPublicCoverage: reports.reviewRoadmap.data?.summary.topicsWithoutPublicCoverage ?? null,
    top: reports.reviewRoadmap.data?.lanes.slice(0, 6) ?? [],
    uniqueNextReviewFiles: reports.reviewRoadmap.data?.summary.uniqueNextReviewFiles ?? null,
    unsafeCandidates: reports.reviewRoadmap.data?.summary.unsafeCandidates ?? null,
  },
  nextReviewSourcePack: {
    items: reports.nextReviewSourcePack.data?.summary.items ?? null,
    missingApprovalChecks: reports.nextReviewSourcePack.data?.summary.missingApprovalChecks ?? null,
    missingFactCheckQueries: reports.nextReviewSourcePack.data?.summary.missingFactCheckQueries ?? null,
    missingOfficialSources: reports.nextReviewSourcePack.data?.summary.missingOfficialSources ?? null,
    missingRiskChecks: reports.nextReviewSourcePack.data?.summary.missingRiskChecks ?? null,
    safeDraftItems: reports.nextReviewSourcePack.data?.summary.safeDraftItems ?? null,
    top: reports.nextReviewSourcePack.data?.items.slice(0, 6) ?? [],
    unsafeItems: reports.nextReviewSourcePack.data?.summary.unsafeItems ?? null,
  },
  publicExpansion: {
    approvalWaves: reports.publicExpansion.data?.summary.approvalWaves ?? null,
    duplicateFiles: reports.publicExpansion.data?.summary.duplicateFiles ?? null,
    items: reports.publicExpansion.data?.summary.items ?? null,
    sourcePackReadyItems: reports.publicExpansion.data?.summary.sourcePackReadyItems ?? null,
    top: reports.publicExpansion.data?.items.slice(0, 9) ?? [],
    unsafeItems: reports.publicExpansion.data?.summary.unsafeItems ?? null,
    waves: reports.publicExpansion.data?.approvalWaves.slice(0, 3) ?? [],
  },
  waveApprovalPacket: {
    files: reports.waveApprovalPacket.data?.files ?? [],
    items: reports.waveApprovalPacket.data?.summary.items ?? null,
    readyForHumanReview: reports.waveApprovalPacket.data?.summary.readyForHumanReview ?? null,
    top: reports.waveApprovalPacket.data?.items ?? [],
    unsafeItems: reports.waveApprovalPacket.data?.summary.unsafeItems ?? null,
    wave: reports.waveApprovalPacket.data?.summary.wave ?? null,
  },
  wavePublishSimulation: {
    currentlyPublishable: reports.wavePublishSimulation.data?.summary.currentlyPublishable ?? null,
    items: reports.wavePublishSimulation.data?.summary.items ?? null,
    projectedPublicPublishedAfterWave: reports.wavePublishSimulation.data?.summary.projectedPublicPublishedAfterWave ?? null,
    projectedPublishableAfterHumanApproval: reports.wavePublishSimulation.data?.summary.projectedPublishableAfterHumanApproval ?? null,
    publicPublishedBeforeWave: reports.wavePublishSimulation.data?.summary.publicPublishedBeforeWave ?? null,
    readyForHumanApproval: reports.wavePublishSimulation.data?.summary.readyForHumanApproval ?? null,
    top: reports.wavePublishSimulation.data?.items ?? [],
    unsafeItems: reports.wavePublishSimulation.data?.summary.unsafeItems ?? null,
    wave: reports.wavePublishSimulation.data?.summary.wave ?? null,
  },
  trafficEvidence: {
    canClaimTraffic: reports.trafficEvidence.data?.summary.canClaimTraffic ?? false,
    claimableMetrics: reports.trafficEvidence.data?.summary.claimableMetrics ?? null,
    failedChecks: reports.trafficEvidence.data?.summary.failedChecks ?? null,
    liveStatus: reports.trafficEvidence.data?.liveEvidence.status ?? null,
    measuredTrafficSources: reports.trafficEvidence.data?.measuredTrafficSources ?? [],
    searchConsoleVerificationEvidence: reports.trafficEvidence.data?.summary.searchConsoleVerificationEvidence ?? false,
    trafficDataAvailable: reports.trafficEvidence.data?.summary.trafficDataAvailable ?? false,
  },
  trafficClaimGuard: {
    filesScanned: reports.trafficClaimGuard.data?.summary.filesScanned ?? null,
    measuredTrafficUnavailable: reports.trafficClaimGuard.data?.summary.measuredTrafficUnavailable ?? null,
    unsafeClaims: reports.trafficClaimGuard.data?.summary.unsafeClaims ?? null,
    watchMentions: reports.trafficClaimGuard.data?.summary.watchMentions ?? null,
  },
  preflight: {
    checked: reports.preflight.data?.summary.checked ?? null,
    failed: reports.preflight.data?.summary.failed ?? null,
    items: reports.preflight.data?.items ?? [],
  },
  seoOpportunities: {
    reviewReadyDrafts: reports.seoOpportunity.data?.totals.reviewReadyDrafts ?? null,
    nextReviewTargets: reports.seoOpportunity.data?.nextReviewTargets.slice(0, 5) ?? [],
  },
  contentOpportunities: {
    topics: reports.contentBacklog.data?.totals.topics ?? null,
    topicsWithReadyCandidates: reports.contentBacklog.data?.totals.topicsWithReadyCandidates ?? null,
    top: reports.contentBacklog.data?.opportunities.slice(0, 5) ?? [],
  },
  deploymentCoverage: {
    publicArticles: reports.deploymentCoverage.data?.summary.deploymentPublicArticles ?? null,
    reviewReadyDrafts: reports.deploymentCoverage.data?.summary.reviewReadyDeploymentDrafts ?? null,
    top: reports.deploymentCoverage.data?.coverage.slice(0, 6) ?? [],
    topics: reports.deploymentCoverage.data?.summary.topics ?? null,
    topicsWithReadyCandidates: reports.deploymentCoverage.data?.summary.topicsWithReadyCandidates ?? null,
    uniqueCandidateFiles: reports.deploymentCoverage.data?.summary.uniqueCandidateFiles ?? null,
  },
  searchIntentLanes: {
    highPriorityLanes: reports.searchIntentLanes.data?.summary.highPriorityLanes ?? null,
    lanes: reports.searchIntentLanes.data?.summary.lanes ?? null,
    lanesWithReadyDrafts: reports.searchIntentLanes.data?.summary.lanesWithReadyDrafts ?? null,
    lanesWithoutPublicCoverage: reports.searchIntentLanes.data?.summary.lanesWithoutPublicCoverage ?? null,
    maxPriorityScore: reports.searchIntentLanes.data?.summary.maxPriorityScore ?? null,
    notReadyMatchedDrafts: reports.searchIntentLanes.data?.summary.notReadyMatchedDrafts ?? null,
    top: reports.searchIntentLanes.data?.topLanes.slice(0, 8) ?? [],
    totalReadyDraftMatches: reports.searchIntentLanes.data?.summary.totalReadyDraftMatches ?? null,
  },
  searchIntentApproval: {
    currentWaveItems: reports.searchIntentApproval.data?.summary.currentWaveItems ?? null,
    currentWaveReady: reports.searchIntentApproval.data?.summary.currentWaveReady ?? null,
    nextGapItems: reports.searchIntentApproval.data?.summary.nextGapItems ?? null,
    nextGapLanes: reports.searchIntentApproval.data?.summary.nextGapLanes ?? null,
    top: reports.searchIntentApproval.data?.nextGapItems.slice(0, 6) ?? [],
    unsafeItems: reports.searchIntentApproval.data?.summary.unsafeItems ?? null,
    wave: reports.searchIntentApproval.data?.summary.wave ?? null,
  },
  searchIntentWaves: {
    plannedItems: reports.searchIntentWaves.data?.summary.plannedItems ?? null,
    plannedWaves: reports.searchIntentWaves.data?.summary.plannedWaves ?? null,
    readyItems: reports.searchIntentWaves.data?.summary.readyItems ?? null,
    uniqueFiles: reports.searchIntentWaves.data?.summary.uniqueFiles ?? null,
    uniqueLanes: reports.searchIntentWaves.data?.summary.uniqueLanes ?? null,
    unsafeItems: reports.searchIntentWaves.data?.summary.unsafeItems ?? null,
    waves: reports.searchIntentWaves.data?.waves.slice(0, 4) ?? [],
  },
  searchQueryCoverage: {
    items: reports.searchQueryCoverage.data?.summary.items ?? null,
    readyItems: reports.searchQueryCoverage.data?.summary.readyItems ?? null,
    top: reports.searchQueryCoverage.data?.items.slice(0, 12) ?? [],
    unsafeItems: reports.searchQueryCoverage.data?.summary.unsafeItems ?? null,
    uniqueFiles: reports.searchQueryCoverage.data?.summary.uniqueFiles ?? null,
    uniqueLanes: reports.searchQueryCoverage.data?.summary.uniqueLanes ?? null,
    uniqueQueries: reports.searchQueryCoverage.data?.summary.uniqueQueries ?? null,
  },
  promptCoverage: {
    industries: reports.promptCoverage.data?.summary.industries ?? null,
    industriesWithReadyCandidates: reports.promptCoverage.data?.summary.industriesWithReadyCandidates ?? null,
    promptPublicArticles: reports.promptCoverage.data?.summary.promptPublicArticles ?? null,
    reviewReadyPromptDrafts: reports.promptCoverage.data?.summary.reviewReadyPromptDrafts ?? null,
    top: reports.promptCoverage.data?.coverage.slice(0, 6) ?? [],
    uniqueCandidateFiles: reports.promptCoverage.data?.summary.uniqueCandidateFiles ?? null,
  },
  cannibalization: {
    conflicts: reports.cannibalization.data?.summary.conflicts ?? null,
    reviewBatchConflicts: reports.cannibalization.data?.summary.reviewBatchConflicts ?? null,
  },
  freshness: {
    currentReviewItems: reports.freshness.data?.summary.currentReviewItems ?? null,
    highRisk: reports.freshness.data?.summary.highRisk ?? null,
    mediumRisk: reports.freshness.data?.summary.mediumRisk ?? null,
    plannedReviewItems: reports.freshness.data?.summary.plannedReviewItems ?? null,
  },
  liveSearch: reports.liveSearch.data
    ? {
        checkedArticles: reports.liveSearch.data.articles.checked,
        failedChecks: reports.liveSearch.data.failedChecks,
        generatedAt: reports.liveSearch.data.generatedAt,
        missingFromSitemap: reports.liveSearch.data.articles.missingFromSitemap,
        ok: reports.liveSearch.data.ok,
        publicArticles: reports.liveSearch.data.articles.publicCount,
        sitemapUrlCount: reports.liveSearch.data.sitemap.urlCount,
      }
    : null,
  workbench: {
    currentItemsCovered: reports.workbench.data?.publishReadiness.currentItemsCovered ?? null,
    nextBatch: reports.workbench.data?.reviewPlan.nextBatch ?? null,
  },
  nextActions: buildNextActions(),
};

const jsonTarget = path.join(process.cwd(), "content", "automation", "automation-digest.json");
const mdTarget = path.join(process.cwd(), "docs", "automation-digest.md");
fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
console.log(JSON.stringify({ ok: missingReports.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), missingReports }, null, 2));

function readJson<T>(relativePath: string): Report<T> {
  const absolutePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(absolutePath)) return { data: null, missing: true, path: relativePath };

  try {
    const data = JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
    return { data, missing: false, path: relativePath };
  } catch {
    return { data: null, missing: true, path: relativePath };
  }
}

function buildNextActions() {
  if (missingReports.length) return [`Fix missing reports: ${missingReports.join(", ")}`];
  if (!reports.gate.data?.ok) return ["Open docs/automation-gate.md and fix failed checks before any review or publish action."];
  if (!reports.preflight.data?.ok) return ["Open docs/review-preflight.md and resolve candidate issues before marking review."];
  if (!reports.nextReviewSourcePack.data || reports.nextReviewSourcePack.data.summary.unsafeItems > 0) {
    return ["Open docs/next-review-source-pack.md and resolve source-pack guardrail issues before manual review."];
  }
  if (!reports.publicExpansion.data || reports.publicExpansion.data.summary.unsafeItems > 0) {
    return ["Open docs/public-expansion-queue.md and resolve expansion queue guardrail issues before manual review."];
  }
  if (!reports.waveApprovalPacket.data || reports.waveApprovalPacket.data.summary.unsafeItems > 0) {
    return ["Open docs/wave-approval-packet.md and resolve Wave 1 approval issues before manual review."];
  }
  if (!reports.wavePublishSimulation.data || reports.wavePublishSimulation.data.summary.unsafeItems > 0) {
    return ["Open docs/wave-publish-simulation.md and resolve Wave 1 publish simulation blockers before manual review."];
  }
  if (!reports.trafficEvidence.data || reports.trafficEvidence.data.summary.failedChecks > 0) {
    return ["Open docs/traffic-evidence-audit.md and resolve traffic evidence audit failures."];
  }
  if (!reports.trafficClaimGuard.data || reports.trafficClaimGuard.data.summary.unsafeClaims > 0) {
    return ["Open docs/traffic-claim-guard.md and remove unsupported traffic claims."];
  }
  if (!reports.contentIntegrity.data || reports.contentIntegrity.data.summary.blockingItems > 0) {
    return ["Open docs/content-integrity-audit.md and fix content integrity blockers before any review or publish action."];
  }
  if (!reports.internalLinks.data || reports.internalLinks.data.summary.waveItemsMissingPublicLinkSuggestion > 0) {
    return ["Open docs/internal-link-opportunity-audit.md and add or approve internal link suggestions for Wave 1 before publishing."];
  }
  if (!reports.searchSnippets.data || reports.searchSnippets.data.summary.waveItemsWithBlockingIssues > 0) {
    return ["Open docs/search-snippet-readiness-audit.md and fix Wave 1 title, description, slug, or indexing blockers."];
  }
  if (!reports.structuredData.data || reports.structuredData.data.summary.waveItemsWithBlockingIssues > 0) {
    return ["Open docs/structured-data-readiness-audit.md and fix Wave 1 metadata or JSON-LD readiness blockers."];
  }
  if (!reports.searchIntentLanes.data || reports.searchIntentLanes.data.summary.lanesWithReadyDrafts !== reports.searchIntentLanes.data.summary.lanes) {
    return ["Open docs/search-intent-lane-map.md and ensure every high-search-intent lane has ready draft candidates."];
  }
  if (!reports.searchIntentApproval.data || reports.searchIntentApproval.data.summary.unsafeItems > 0) {
    return ["Open docs/search-intent-approval-packet.md and resolve approval packet safety issues before manual review."];
  }
  if (!reports.searchIntentWaves.data || reports.searchIntentWaves.data.summary.unsafeItems > 0) {
    return ["Open docs/search-intent-wave-planner.md and resolve continuous wave safety issues before manual review."];
  }
  if (!reports.searchQueryCoverage.data || reports.searchQueryCoverage.data.summary.unsafeItems > 0) {
    return ["Open docs/search-query-coverage.md and resolve search-query coverage gaps before manual review."];
  }
  if (!reports.reviewCoverage.data || reports.reviewCoverage.data.summary.missingCoverage > 0) {
    return ["Open docs/review-coverage-report.md and regenerate coverage for all planned review candidates."];
  }
  return [
    "Manually review the three recommended drafts in docs/review-preflight.md.",
    "Use docs/wave-approval-packet.md as the focused Wave 1 approval packet.",
    "Use docs/wave-publish-simulation.md to see the exact post-approval mark-review and publish dry-run path.",
    "Use docs/public-expansion-queue.md as the approval-wave order for expanding public coverage.",
    "Use docs/next-review-source-pack.md to fact-check official sources for the roadmap's next review files.",
    "Use docs/review-coverage-report.md to inspect source, freshness, risk, and approval checks for all planned batches.",
    "If approved by a human, run mark:review with --confirm-human for approved files only.",
    "Publish only status=review articles in a 1-3 article batch after a dry-run.",
  ];
}

function toMarkdown(data: typeof payload) {
  const lines = [
    "# Automation Digest",
    "",
    `Generated at: ${data.generatedAt}`,
    "",
    "This digest is read-only. It summarizes automation reports and does not publish or mark articles for review.",
    "",
    "## Health",
    "",
    `- Run ok: ${data.health.runOk}`,
    `- Gate ok: ${data.health.gateOk}`,
    `- Preflight ok: ${data.health.preflightOk}`,
    `- SEO ok: ${data.health.seoOk}`,
    `- Searchability score: ${data.health.searchabilityScore}`,
    `- Traffic data available: ${data.health.trafficDataAvailable}`,
    `- Missing reports: ${data.health.missingReports.length ? data.health.missingReports.join(", ") : "none"}`,
    "",
    "## Content Integrity",
    "",
    data.contentIntegrity
      ? `- Files scanned: ${data.contentIntegrity.filesScanned}`
      : "- Files scanned: missing",
    data.contentIntegrity
      ? `- Blocking items: ${data.contentIntegrity.blockingItems}`
      : "- Blocking items: missing",
    data.contentIntegrity
      ? `- Public items: ${data.contentIntegrity.publicItems}`
      : "- Public items: missing",
    data.contentIntegrity
      ? `- Recommended items: ${data.contentIntegrity.recommendedItems}`
      : "- Recommended items: missing",
    data.contentIntegrity
      ? `- Wave items: ${data.contentIntegrity.waveItems}`
      : "- Wave items: missing",
    "",
    "## Internal Link Opportunities",
    "",
    data.internalLinks
      ? `- Candidate items: ${data.internalLinks.candidateItems}`
      : "- Candidate items: missing",
    data.internalLinks
      ? `- Candidates with public suggestions: ${data.internalLinks.candidateItemsWithPublicSuggestions}`
      : "- Candidates with public suggestions: missing",
    data.internalLinks
      ? `- Candidate items missing suggestions: ${data.internalLinks.candidateItemsMissingPublicLinkSuggestion}`
      : "- Candidate items missing suggestions: missing",
    data.internalLinks
      ? `- Wave items: ${data.internalLinks.waveItems}`
      : "- Wave items: missing",
    data.internalLinks
      ? `- Wave items missing suggestions: ${data.internalLinks.waveItemsMissingPublicLinkSuggestion}`
      : "- Wave items missing suggestions: missing",
    "",
    "## Search Snippet Readiness",
    "",
    data.searchSnippets
      ? `- Scoped items: ${data.searchSnippets.scopedItems}`
      : "- Scoped items: missing",
    data.searchSnippets
      ? `- Blocking items: ${data.searchSnippets.blockingItems}`
      : "- Blocking items: missing",
    data.searchSnippets
      ? `- Warning items: ${data.searchSnippets.warningItems}`
      : "- Warning items: missing",
    data.searchSnippets
      ? `- Wave items: ${data.searchSnippets.waveItems}`
      : "- Wave items: missing",
    data.searchSnippets
      ? `- Wave items with blocking issues: ${data.searchSnippets.waveItemsWithBlockingIssues}`
      : "- Wave items with blocking issues: missing",
    "",
    "## Structured Data Readiness",
    "",
    data.structuredData
      ? `- Scoped items: ${data.structuredData.scopedItems}`
      : "- Scoped items: missing",
    data.structuredData
      ? `- JSON-LD preview items: ${data.structuredData.jsonLdPreviewItems}`
      : "- JSON-LD preview items: missing",
    data.structuredData
      ? `- Blocking items: ${data.structuredData.blockingItems}`
      : "- Blocking items: missing",
    data.structuredData
      ? `- Warning items: ${data.structuredData.warningItems}`
      : "- Warning items: missing",
    data.structuredData
      ? `- Wave items: ${data.structuredData.waveItems}`
      : "- Wave items: missing",
    data.structuredData
      ? `- Wave items with blocking issues: ${data.structuredData.waveItemsWithBlockingIssues}`
      : "- Wave items with blocking issues: missing",
    "",
    "## Publishing Boundary",
    "",
    `- Public published: ${data.publishingBoundary.publicPublished}`,
    `- Publishable now: ${data.publishingBoundary.publishableNow}`,
    `- Status counts: ${JSON.stringify(data.publishingBoundary.statusCounts)}`,
    "",
    "## Recommended Today",
    "",
    "| Cluster | Opportunity | Title | File |",
    "| --- | --- | --- | --- |",
    ...data.reviewQueue.recommendedToday.map((item) => `| ${item.cluster} | ${item.opportunityScore} | ${item.title} | ${item.file} |`),
    "",
    "## Review Batch Plan",
    "",
    `- Planned batches: ${data.reviewPlan.plannedBatches}`,
    `- Planned candidates: ${data.reviewPlan.plannedCandidates}`,
    "",
    "| Batch | Topic | Candidates |",
    "| --- | --- | --- |",
    ...data.reviewPlan.batches.map((item) => `| ${item.batch} | ${item.topic} | ${item.candidates.length} |`),
    "",
    "## Review Coverage",
    "",
    data.reviewCoverage
      ? `- Planned candidates: ${data.reviewCoverage.plannedCandidates}`
      : "- Planned candidates: missing",
    data.reviewCoverage
      ? `- Current pack covered: ${data.reviewCoverage.currentPackCovered}`
      : "- Current pack covered: missing",
    data.reviewCoverage
      ? `- Missing coverage: ${data.reviewCoverage.missingCoverage}`
      : "- Missing coverage: missing",
    data.reviewCoverage
      ? `- Missing official sources: ${data.reviewCoverage.itemsMissingOfficialSources}`
      : "- Missing official sources: missing",
    data.reviewCoverage
      ? `- Missing fact-check queries: ${data.reviewCoverage.itemsMissingFactCheckQueries}`
      : "- Missing fact-check queries: missing",
    data.reviewCoverage
      ? `- Missing risk checks: ${data.reviewCoverage.itemsMissingRiskChecks}`
      : "- Missing risk checks: missing",
    data.reviewCoverage
      ? `- Unsafe indexing items: ${data.reviewCoverage.unsafeIndexingItems}`
      : "- Unsafe indexing items: missing",
    "",
    "## Review Priority Roadmap",
    "",
    `- Lanes: ${data.reviewRoadmap.lanes}`,
    `- Unique next review files: ${data.reviewRoadmap.uniqueNextReviewFiles}`,
    `- Topics without public coverage: ${data.reviewRoadmap.topicsWithoutPublicCoverage}`,
    `- Unsafe candidates: ${data.reviewRoadmap.unsafeCandidates}`,
    "",
    "| Lane | Score | Public | Candidates |",
    "| --- | --- | --- | --- |",
    ...data.reviewRoadmap.top.map((item) => `| ${item.lane} | ${item.priorityScore} | ${item.publicMatches} | ${item.candidates.length} |`),
    "",
    "Next review files:",
    "",
    ...data.reviewRoadmap.nextReviewFiles.map((file) => `- ${file}`),
    "",
    "## Next Review Source Pack",
    "",
    `- Items: ${data.nextReviewSourcePack.items}`,
    `- Safe draft items: ${data.nextReviewSourcePack.safeDraftItems}`,
    `- Unsafe items: ${data.nextReviewSourcePack.unsafeItems}`,
    `- Missing official sources: ${data.nextReviewSourcePack.missingOfficialSources}`,
    `- Missing fact-check queries: ${data.nextReviewSourcePack.missingFactCheckQueries}`,
    `- Missing approval checks: ${data.nextReviewSourcePack.missingApprovalChecks}`,
    `- Missing risk checks: ${data.nextReviewSourcePack.missingRiskChecks}`,
    "",
    "| Safe | Current | Planned | Score | Sources | Queries | Risk checks | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.nextReviewSourcePack.top.map((item) => (
      `| ${item.safeDraft} | ${item.currentPack} | ${item.plannedBatch} | ${item.qualityScore} | ${item.officialSourceTargets.length} | ${item.factCheckQueries.length} | ${item.riskReviewChecklist.length} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Public Expansion Queue",
    "",
    `- Items: ${data.publicExpansion.items}`,
    `- Approval waves: ${data.publicExpansion.approvalWaves}`,
    `- Source-pack-ready items: ${data.publicExpansion.sourcePackReadyItems}`,
    `- Unsafe items: ${data.publicExpansion.unsafeItems}`,
    `- Duplicate files: ${data.publicExpansion.duplicateFiles}`,
    "",
    "| Wave | Score | Source pack | Current | Planned | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...data.publicExpansion.top.map((item) => (
      `| ${item.approvalWave} | ${item.priorityScore} | ${item.sourcePackReady} | ${item.currentPack} | ${item.plannedBatch} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Wave Approval Packet",
    "",
    `- Wave: ${data.waveApprovalPacket.wave}`,
    `- Items: ${data.waveApprovalPacket.items}`,
    `- Ready for human review: ${data.waveApprovalPacket.readyForHumanReview}`,
    `- Unsafe items: ${data.waveApprovalPacket.unsafeItems}`,
    "",
    "| Ready | Sources | Risk checks | Title | File |",
    "| --- | --- | --- | --- | --- |",
    ...data.waveApprovalPacket.top.map((item) => (
      `| ${item.readyForHumanReview} | ${item.officialSourceTargets.length} | ${item.riskReviewChecklist.length} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Wave Publish Simulation",
    "",
    `- Wave: ${data.wavePublishSimulation.wave}`,
    `- Items: ${data.wavePublishSimulation.items}`,
    `- Ready for human approval: ${data.wavePublishSimulation.readyForHumanApproval}`,
    `- Unsafe items: ${data.wavePublishSimulation.unsafeItems}`,
    `- Currently publishable: ${data.wavePublishSimulation.currentlyPublishable}`,
    `- Public published before wave: ${data.wavePublishSimulation.publicPublishedBeforeWave}`,
    `- Projected publishable after human approval: ${data.wavePublishSimulation.projectedPublishableAfterHumanApproval}`,
    `- Projected public published after wave: ${data.wavePublishSimulation.projectedPublicPublishedAfterWave}`,
    "",
    "| Ready | Status | Blockers | Title | File |",
    "| --- | --- | --- | --- | --- |",
    ...data.wavePublishSimulation.top.map((item) => (
      `| ${item.readyForHumanApproval} | ${item.currentStatus} | ${item.blockers.length ? item.blockers.join("<br>") : "none"} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Traffic Evidence",
    "",
    `- Traffic data available: ${data.trafficEvidence.trafficDataAvailable}`,
    `- Can claim traffic: ${data.trafficEvidence.canClaimTraffic}`,
    `- Claimable metrics: ${data.trafficEvidence.claimableMetrics}`,
    `- Measured traffic sources: ${data.trafficEvidence.measuredTrafficSources.length ? data.trafficEvidence.measuredTrafficSources.join(", ") : "none"}`,
    `- Search Console verification evidence: ${data.trafficEvidence.searchConsoleVerificationEvidence}`,
    `- Live status: ${data.trafficEvidence.liveStatus}`,
    `- Failed checks: ${data.trafficEvidence.failedChecks}`,
    `- Unsupported traffic claims: ${data.trafficClaimGuard.unsafeClaims}`,
    `- Traffic claim files scanned: ${data.trafficClaimGuard.filesScanned}`,
    `- Traffic claim watch mentions: ${data.trafficClaimGuard.watchMentions}`,
    "",
    "## Preflight",
    "",
    `- Checked: ${data.preflight.checked}`,
    `- Failed: ${data.preflight.failed}`,
    "",
    "| Status | Score | Title | Issues |",
    "| --- | --- | --- | --- |",
    ...data.preflight.items.map((item) => `| ${item.ok ? "PASS" : "FAIL"} | ${item.qualityScore} | ${item.title} | ${item.issues.join("; ")} |`),
    "",
    "## SEO Opportunities",
    "",
    `- Review-ready drafts: ${data.seoOpportunities.reviewReadyDrafts}`,
    "",
    "| Category | Published | Review-ready drafts | Reason |",
    "| --- | --- | --- | --- |",
    ...data.seoOpportunities.nextReviewTargets.map((item) => `| ${item.category} | ${item.published} | ${item.reviewReadyDrafts} | ${item.reason} |`),
    "",
    "## Content Opportunities",
    "",
    `- Topics: ${data.contentOpportunities.topics}`,
    `- Topics with ready candidates: ${data.contentOpportunities.topicsWithReadyCandidates}`,
    "",
    "| Topic | Score | Public matches | Ready candidates | Why |",
    "| --- | --- | --- | --- | --- |",
    ...data.contentOpportunities.top.map((item) => (
      `| ${item.topic} | ${item.gapScore} | ${item.publicMatches} | ${item.readyCandidates.length} | ${item.why} |`
    )),
    "",
    "## AI Deployment Coverage",
    "",
    `- Topics: ${data.deploymentCoverage.topics}`,
    `- Topics with ready candidates: ${data.deploymentCoverage.topicsWithReadyCandidates}`,
    `- Review-ready deployment drafts: ${data.deploymentCoverage.reviewReadyDrafts}`,
    `- Unique candidate files: ${data.deploymentCoverage.uniqueCandidateFiles}`,
    `- Public deployment articles: ${data.deploymentCoverage.publicArticles}`,
    "",
    "| Topic | Score | Public | Ready candidates | Search query examples |",
    "| --- | --- | --- | --- | --- |",
    ...data.deploymentCoverage.top.map((item) => (
      `| ${item.topic} | ${item.gapScore} | ${item.publicMatches} | ${item.candidates.length} | ${item.searchQueries.slice(0, 2).join("<br>")} |`
    )),
    "",
    "## Search Intent Lane Map",
    "",
    `- Lanes: ${data.searchIntentLanes.lanes}`,
    `- High-priority lanes: ${data.searchIntentLanes.highPriorityLanes}`,
    `- Lanes with ready drafts: ${data.searchIntentLanes.lanesWithReadyDrafts}`,
    `- Lanes without public coverage: ${data.searchIntentLanes.lanesWithoutPublicCoverage}`,
    `- Total ready draft matches: ${data.searchIntentLanes.totalReadyDraftMatches}`,
    `- Not-ready matched drafts: ${data.searchIntentLanes.notReadyMatchedDrafts}`,
    "",
    "| Score | Demand | Public | Ready drafts | Candidates shown | Lane | Intent seeds | Reason |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.searchIntentLanes.top.map((item) => (
      `| ${item.priorityScore} | ${item.demandScore} | ${item.publicCount} | ${item.readyDraftCount} | ${item.matchedCandidates.length} | ${item.title} | ${item.intentSeeds.slice(0, 3).join("<br>")} | ${item.priorityReason} |`
    )),
    "",
    "## Search Intent Approval Packet",
    "",
    `- Wave: ${data.searchIntentApproval.wave}`,
    `- Current wave items: ${data.searchIntentApproval.currentWaveItems}`,
    `- Current wave ready: ${data.searchIntentApproval.currentWaveReady}`,
    `- Next gap items: ${data.searchIntentApproval.nextGapItems}`,
    `- Next gap lanes: ${data.searchIntentApproval.nextGapLanes}`,
    `- Unsafe items: ${data.searchIntentApproval.unsafeItems}`,
    "",
    "| Ready | Lane score | Lane | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...data.searchIntentApproval.top.map((item) => (
      `| ${item.readyForHumanReview} | ${item.lanePriorityScore} | ${item.laneTitle} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Search Intent Wave Planner",
    "",
    `- Planned waves: ${data.searchIntentWaves.plannedWaves}`,
    `- Planned items: ${data.searchIntentWaves.plannedItems}`,
    `- Ready items: ${data.searchIntentWaves.readyItems}`,
    `- Unique files: ${data.searchIntentWaves.uniqueFiles}`,
    `- Unique lanes: ${data.searchIntentWaves.uniqueLanes}`,
    `- Unsafe items: ${data.searchIntentWaves.unsafeItems}`,
    "",
    "| Wave | Ready | Lanes | Focus | Files |",
    "| --- | --- | --- | --- | --- |",
    ...data.searchIntentWaves.waves.map((item) => (
      `| ${item.wave} | ${item.readyItems} | ${item.laneCount} | ${item.focus} | ${item.files.join("<br>")} |`
    )),
    "",
    "## Search Query Coverage",
    "",
    `- Items: ${data.searchQueryCoverage.items}`,
    `- Ready items: ${data.searchQueryCoverage.readyItems}`,
    `- Unique files: ${data.searchQueryCoverage.uniqueFiles}`,
    `- Unique lanes: ${data.searchQueryCoverage.uniqueLanes}`,
    `- Unique queries: ${data.searchQueryCoverage.uniqueQueries}`,
    `- Unsafe items: ${data.searchQueryCoverage.unsafeItems}`,
    "",
    "| Wave | Ready | Queries | Lane | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...data.searchQueryCoverage.top.map((item) => (
      `| ${item.wave} | ${item.readyForManualReview} | ${item.queryCount} | ${item.laneTitle} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Industry Prompt Coverage",
    "",
    `- Industries: ${data.promptCoverage.industries}`,
    `- Industries with ready candidates: ${data.promptCoverage.industriesWithReadyCandidates}`,
    `- Review-ready prompt drafts: ${data.promptCoverage.reviewReadyPromptDrafts}`,
    `- Unique candidate files: ${data.promptCoverage.uniqueCandidateFiles}`,
    `- Public prompt articles: ${data.promptCoverage.promptPublicArticles}`,
    "",
    "| Industry | Score | Public | Ready candidates | Search query examples |",
    "| --- | --- | --- | --- | --- |",
    ...data.promptCoverage.top.map((item) => (
      `| ${item.industry} | ${item.gapScore} | ${item.publicMatches} | ${item.candidates.length} | ${item.searchQueries.slice(0, 2).join("<br>")} |`
    )),
    "",
    "## Cannibalization Warnings",
    "",
    `- Conflicts: ${data.cannibalization.conflicts}`,
    `- Review batch conflicts: ${data.cannibalization.reviewBatchConflicts}`,
    "",
    "## Freshness Warnings",
    "",
    `- High risk: ${data.freshness.highRisk}`,
    `- Medium risk: ${data.freshness.mediumRisk}`,
    `- Current review items: ${data.freshness.currentReviewItems}`,
    `- Planned review items: ${data.freshness.plannedReviewItems}`,
    "",
    "## Live Search Surface",
    "",
    data.liveSearch
      ? `- Latest check: ${data.liveSearch.generatedAt}`
      : "- Latest check: missing",
    data.liveSearch
      ? `- Ok: ${data.liveSearch.ok}`
      : "- Ok: false",
    data.liveSearch
      ? `- Public articles checked: ${data.liveSearch.checkedArticles}`
      : "- Public articles checked: 0",
    data.liveSearch
      ? `- Sitemap URLs: ${data.liveSearch.sitemapUrlCount}`
      : "- Sitemap URLs: 0",
    data.liveSearch
      ? `- Failed checks: ${data.liveSearch.failedChecks.length ? data.liveSearch.failedChecks.join(", ") : "none"}`
      : "- Failed checks: live-search-surface report missing",
    "",
    "## Manual Review Workbench",
    "",
    `- Next batch: ${data.workbench.nextBatch ? `${data.workbench.nextBatch.batch} - ${data.workbench.nextBatch.topic}` : "missing"}`,
    `- Current publish readiness items: ${data.workbench.currentItemsCovered}`,
    "",
    "## Next Actions",
    "",
    ...data.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type ReviewPlan = {
  batches: Array<{
    batch: number;
    candidates: Array<{ file: string; opportunityScore: number; qualityScore: number; title: string }>;
    topic: string;
  }>;
  totals: { plannedBatches: number; plannedCandidates: number };
};

type PublishPack = {
  items: Array<{
    factCheckQueries: string[];
    file: string;
    humanDecisionChecklist: string[];
    matchedContentOpportunity: { topic: string } | null;
    officialSourceTargets: string[];
    riskReviewChecklist: string[];
    title: string;
  }>;
};

type Cannibalization = {
  reviewBatchConflicts: Array<{ files: string[]; groupKey: string; reason: string; reviewBatchOverlap: string[] }>;
  summary: { conflicts: number; reviewBatchConflicts: number };
};

type ReviewCoverage = {
  summary: {
    currentPackCovered: number;
    itemsMissingApprovalChecks: number;
    itemsMissingFactCheckQueries: number;
    itemsMissingOfficialSources: number;
    itemsMissingRiskChecks: number;
    missingCoverage: number;
    nonDraftItems: number;
    plannedCandidates: number;
    reviewBatchConflictItems: number;
    unsafeIndexingItems: number;
  };
};

type PromptCoverage = {
  coverage: Array<{ candidates: unknown[]; gapScore: number; industry: string; publicMatches: number }>;
  summary: {
    industries: number;
    industriesWithReadyCandidates: number;
    promptPublicArticles: number;
    reviewReadyPromptDrafts: number;
    unsafeCandidateItems: number;
    uniqueCandidateFiles: number;
  };
};

type DeploymentCoverage = {
  coverage: Array<{ candidates: unknown[]; gapScore: number; publicMatches: number; topic: string }>;
  summary: {
    deploymentPublicArticles: number;
    reviewReadyDeploymentDrafts: number;
    topics: number;
    topicsWithReadyCandidates: number;
    unsafeCandidateItems: number;
    uniqueCandidateFiles: number;
  };
};

type ReviewRoadmap = {
  lanes: Array<{ candidates: unknown[]; lane: string; priorityScore: number; publicMatches: number }>;
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
  measuredTrafficSources: string[];
  summary: {
    canClaimTraffic: boolean;
    claimableMetrics: number;
    failedChecks: number;
    searchConsoleVerificationEvidence: boolean;
    trafficDataAvailable: boolean;
  };
};

type TrafficClaimGuard = {
  summary: {
    filesScanned: number;
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
  waveItems: Array<{
    currentInternalLinks: number;
    file: string;
    linksToPublicArticles: number;
    suggestions: Array<{ title: string; url: string }>;
    title: string;
  }>;
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
  waveItems: Array<{
    descriptionLength: number;
    file: string;
    issues: string[];
    slug: string;
    title: string;
    titleLength: number;
    warnings: string[];
  }>;
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
  waveItems: Array<{
    contentType: string;
    date: string;
    difficulty: string;
    file: string;
    issues: string[];
    tags: string[];
    title: string;
    updatedAt: string;
    warnings: string[];
  }>;
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

type ProjectStatus = {
  articles: { publicPublished: number; publishableNow: unknown[]; statusCounts: Record<string, number> };
};

type LiveSearch = {
  articles: { publicCount: number };
  failedChecks: string[];
  ok: boolean;
  sitemap: { urlCount: number };
};

function main() {
  const reviewPlan = readJson<ReviewPlan>("content/automation/review-batch-plan.json");
  const publishPack = readJson<PublishPack>("content/automation/publish-readiness-pack.json");
  const cannibalization = readJson<Cannibalization>("content/automation/content-cannibalization.json");
  const reviewCoverage = readJson<ReviewCoverage>("content/automation/review-coverage-report.json");
  const reviewRoadmap = readJson<ReviewRoadmap>("content/automation/review-priority-roadmap.json");
  const nextReviewSourcePack = readJson<NextReviewSourcePack>("content/automation/next-review-source-pack.json");
  const publicExpansion = readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json");
  const waveApprovalPacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const wavePublishSimulation = readJson<WavePublishSimulation>("content/automation/wave-publish-simulation.json");
  const trafficEvidence = readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json");
  const trafficClaimGuard = readJson<TrafficClaimGuard>("content/automation/traffic-claim-guard.json");
  const contentIntegrity = readJson<ContentIntegrity>("content/automation/content-integrity-audit.json");
  const internalLinks = readJson<InternalLinks>("content/automation/internal-link-opportunity-audit.json");
  const searchSnippets = readJson<SearchSnippets>("content/automation/search-snippet-readiness-audit.json");
  const structuredData = readJson<StructuredData>("content/automation/structured-data-readiness-audit.json");
  const searchIntentLanes = readJson<SearchIntentLanes>("content/automation/search-intent-lane-map.json");
  const searchIntentApproval = readJson<SearchIntentApproval>("content/automation/search-intent-approval-packet.json");
  const searchIntentWaves = readJson<SearchIntentWaves>("content/automation/search-intent-wave-planner.json");
  const searchQueryCoverage = readJson<SearchQueryCoverage>("content/automation/search-query-coverage.json");
  const deploymentCoverage = readJson<DeploymentCoverage>("content/automation/ai-deployment-coverage.json");
  const promptCoverage = readJson<PromptCoverage>("content/automation/industry-prompt-coverage.json");
  const projectStatus = readJson<ProjectStatus>("content/automation/project-status.json");
  const liveSearch = readJson<LiveSearch>("content/automation/live-search-surface.json");
  const firstBatch = reviewPlan.batches[0];

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This workbench summarizes manual review inputs only. It does not change article status, noindex, or publishing state.",
      stopBefore: "Explicit human approval is required before mark:review --confirm-human or publish:articles --confirm.",
    },
    publishingBoundary: {
      publicPublished: projectStatus.articles.publicPublished,
      publishableNow: projectStatus.articles.publishableNow.length,
      statusCounts: projectStatus.articles.statusCounts,
    },
    liveSearch: {
      failedChecks: liveSearch.failedChecks,
      ok: liveSearch.ok,
      publicCount: liveSearch.articles.publicCount,
      sitemapUrlCount: liveSearch.sitemap.urlCount,
    },
    reviewPlan: {
      plannedBatches: reviewPlan.totals.plannedBatches,
      plannedCandidates: reviewPlan.totals.plannedCandidates,
      nextBatch: firstBatch
        ? {
            batch: firstBatch.batch,
            candidates: firstBatch.candidates,
            topic: firstBatch.topic,
          }
        : null,
    },
    publishReadiness: {
      currentItemsCovered: publishPack.items.length,
      items: publishPack.items.map((item) => ({
        factCheckQueries: item.factCheckQueries,
        file: item.file,
        humanDecisionChecklist: item.humanDecisionChecklist,
        matchedContentOpportunity: item.matchedContentOpportunity,
        officialSourceTargets: item.officialSourceTargets,
        riskReviewChecklist: item.riskReviewChecklist,
        title: item.title,
      })),
    },
    cannibalization: {
      conflicts: cannibalization.summary.conflicts,
      reviewBatchConflicts: cannibalization.summary.reviewBatchConflicts,
      reviewBatchConflictItems: cannibalization.reviewBatchConflicts,
    },
    reviewCoverage: reviewCoverage.summary,
    reviewRoadmap: {
      nextReviewFiles: reviewRoadmap.nextReviewFiles.slice(0, 12),
      summary: reviewRoadmap.summary,
      topLanes: reviewRoadmap.lanes.slice(0, 6).map((item) => ({
        candidates: item.candidates.length,
        lane: item.lane,
        priorityScore: item.priorityScore,
        publicMatches: item.publicMatches,
      })),
    },
    nextReviewSourcePack: {
      summary: nextReviewSourcePack.summary,
      topItems: nextReviewSourcePack.items.slice(0, 6).map((item) => ({
        currentPack: item.currentPack,
        factCheckQueries: item.factCheckQueries.length,
        file: item.file,
        officialSourceTargets: item.officialSourceTargets.length,
        plannedBatch: item.plannedBatch,
        qualityScore: item.qualityScore,
        riskReviewChecklist: item.riskReviewChecklist.length,
        safeDraft: item.safeDraft,
        title: item.title,
      })),
    },
    publicExpansion: {
      summary: publicExpansion.summary,
      firstWaves: publicExpansion.approvalWaves.slice(0, 3),
      topItems: publicExpansion.items.slice(0, 9).map((item) => ({
        approvalWave: item.approvalWave,
        currentPack: item.currentPack,
        file: item.file,
        plannedBatch: item.plannedBatch,
        priorityScore: item.priorityScore,
        sourcePackReady: item.sourcePackReady,
        title: item.title,
      })),
    },
    waveApprovalPacket: {
      files: waveApprovalPacket.files,
      summary: waveApprovalPacket.summary,
      items: waveApprovalPacket.items.map((item) => ({
        file: item.file,
        readyForHumanReview: item.readyForHumanReview,
        riskChecks: item.riskReviewChecklist.length,
        sources: item.officialSourceTargets.length,
        title: item.title,
      })),
    },
    wavePublishSimulation: {
      summary: wavePublishSimulation.summary,
      items: wavePublishSimulation.items.map((item) => ({
        blockers: item.blockers,
        currentStatus: item.currentStatus,
        file: item.file,
        readyForHumanApproval: item.readyForHumanApproval,
        title: item.title,
      })),
    },
    trafficEvidence: {
      canClaimTraffic: trafficEvidence.summary.canClaimTraffic,
      claimableMetrics: trafficEvidence.summary.claimableMetrics,
      failedChecks: trafficEvidence.summary.failedChecks,
      measuredTrafficSources: trafficEvidence.measuredTrafficSources,
      searchConsoleVerificationEvidence: trafficEvidence.summary.searchConsoleVerificationEvidence,
      trafficDataAvailable: trafficEvidence.summary.trafficDataAvailable,
    },
    trafficClaimGuard: trafficClaimGuard.summary,
    contentIntegrity: contentIntegrity.summary,
    internalLinks: {
      summary: internalLinks.summary,
      waveItems: internalLinks.waveItems.map((item) => ({
        currentInternalLinks: item.currentInternalLinks,
        file: item.file,
        linksToPublicArticles: item.linksToPublicArticles,
        suggestions: item.suggestions.slice(0, 3).map((suggestion) => ({
          title: suggestion.title,
          url: suggestion.url,
        })),
        title: item.title,
      })),
    },
    searchSnippets: {
      summary: searchSnippets.summary,
      waveItems: searchSnippets.waveItems.map((item) => ({
        descriptionLength: item.descriptionLength,
        file: item.file,
        issues: item.issues,
        slug: item.slug,
        title: item.title,
        titleLength: item.titleLength,
        warnings: item.warnings,
      })),
    },
    structuredData: {
      summary: structuredData.summary,
      waveItems: structuredData.waveItems.map((item) => ({
        contentType: item.contentType,
        date: item.date,
        difficulty: item.difficulty,
        file: item.file,
        issues: item.issues,
        tags: item.tags,
        title: item.title,
        updatedAt: item.updatedAt,
        warnings: item.warnings,
      })),
    },
    deploymentCoverage: {
      summary: deploymentCoverage.summary,
      topTopics: deploymentCoverage.coverage.slice(0, 6).map((item) => ({
        candidates: item.candidates.length,
        gapScore: item.gapScore,
        publicMatches: item.publicMatches,
        topic: item.topic,
      })),
    },
    searchIntentLanes: {
      summary: searchIntentLanes.summary,
      topLanes: searchIntentLanes.topLanes.slice(0, 8).map((item) => ({
        demandScore: item.demandScore,
        id: item.id,
        intentSeeds: item.intentSeeds,
        matchedCandidates: item.matchedCandidates.length,
        priorityReason: item.priorityReason,
        priorityScore: item.priorityScore,
        publicCount: item.publicCount,
        readyDraftCount: item.readyDraftCount,
        title: item.title,
      })),
    },
    searchIntentApproval: {
      summary: searchIntentApproval.summary,
      nextGapItems: searchIntentApproval.nextGapItems.slice(0, 6).map((item) => ({
        file: item.file,
        lanePriorityScore: item.lanePriorityScore,
        laneTitle: item.laneTitle,
        primaryKeyword: item.primaryKeyword,
        readyForHumanReview: item.readyForHumanReview,
        title: item.title,
      })),
    },
    searchIntentWaves: {
      summary: searchIntentWaves.summary,
      waves: searchIntentWaves.waves.slice(0, 4).map((item) => ({
        files: item.files,
        focus: item.focus,
        laneCount: item.laneCount,
        readyItems: item.readyItems,
        wave: item.wave,
      })),
    },
    searchQueryCoverage: {
      summary: searchQueryCoverage.summary,
      topItems: searchQueryCoverage.items.slice(0, 12).map((item) => ({
        file: item.file,
        laneTitle: item.laneTitle,
        primaryKeyword: item.primaryKeyword,
        queryCount: item.queryCount,
        readyForManualReview: item.readyForManualReview,
        title: item.title,
        wave: item.wave,
      })),
    },
    promptCoverage: {
      summary: promptCoverage.summary,
      topIndustries: promptCoverage.coverage.slice(0, 6).map((item) => ({
        candidates: item.candidates.length,
        gapScore: item.gapScore,
        industry: item.industry,
        publicMatches: item.publicMatches,
      })),
    },
    nextActions: buildNextActions(
      projectStatus,
      liveSearch,
      cannibalization,
      publishPack.items.length,
      reviewCoverage,
      nextReviewSourcePack,
      publicExpansion,
      waveApprovalPacket,
      wavePublishSimulation,
      trafficEvidence,
      trafficClaimGuard,
      contentIntegrity,
      internalLinks,
      searchSnippets,
      structuredData,
      searchIntentLanes,
      searchIntentApproval,
      searchIntentWaves,
      searchQueryCoverage,
    ),
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "manual-review-workbench.json");
  const mdTarget = path.join(process.cwd(), "docs", "manual-review-workbench.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, json: rel(jsonTarget), markdown: rel(mdTarget), nextBatch: payload.reviewPlan.nextBatch?.topic || null }, null, 2));
}

function buildNextActions(
  projectStatus: ProjectStatus,
  liveSearch: LiveSearch,
  cannibalization: Cannibalization,
  currentItemsCovered: number,
  reviewCoverage: ReviewCoverage,
  nextReviewSourcePack: NextReviewSourcePack,
  publicExpansion: PublicExpansionQueue,
  waveApprovalPacket: WaveApprovalPacket,
  wavePublishSimulation: WavePublishSimulation,
  trafficEvidence: TrafficEvidence,
  trafficClaimGuard: TrafficClaimGuard,
  contentIntegrity: ContentIntegrity,
  internalLinks: InternalLinks,
  searchSnippets: SearchSnippets,
  structuredData: StructuredData,
  searchIntentLanes: SearchIntentLanes,
  searchIntentApproval: SearchIntentApproval,
  searchIntentWaves: SearchIntentWaves,
  searchQueryCoverage: SearchQueryCoverage,
) {
  if (projectStatus.articles.publishableNow.length > 0) return ["Stop and inspect publishableNow before adding more review candidates."];
  if (!liveSearch.ok || liveSearch.failedChecks.length > 0) return ["Fix live search surface failures before any publishing action."];
  if (cannibalization.summary.reviewBatchConflicts > 0) return ["Resolve review batch cannibalization conflicts before marking review."];
  if (currentItemsCovered === 0) return ["Regenerate publish readiness pack before human review."];
  if (reviewCoverage.summary.missingCoverage > 0) return ["Regenerate review coverage report before human review."];
  if (nextReviewSourcePack.summary.unsafeItems > 0) return ["Resolve next review source pack safety issues before human review."];
  if (
    nextReviewSourcePack.summary.missingOfficialSources > 0 ||
    nextReviewSourcePack.summary.missingFactCheckQueries > 0 ||
    nextReviewSourcePack.summary.missingRiskChecks > 0
  ) {
    return ["Fill next review source pack source, fact-check, and risk tasks before any mark:review action."];
  }
  if (publicExpansion.summary.unsafeItems > 0 || publicExpansion.summary.duplicateFiles > 0) {
    return ["Resolve public expansion queue safety or duplicate issues before any mark:review action."];
  }
  if (waveApprovalPacket.summary.unsafeItems > 0 || waveApprovalPacket.summary.readyForHumanReview !== waveApprovalPacket.summary.items) {
    return ["Resolve Wave 1 approval packet issues before any mark:review action."];
  }
  if (wavePublishSimulation.summary.unsafeItems > 0 || wavePublishSimulation.summary.readyForHumanApproval !== wavePublishSimulation.summary.items) {
    return ["Resolve Wave 1 publish simulation blockers before any mark:review action."];
  }
  if (trafficEvidence.summary.failedChecks > 0) return ["Resolve traffic evidence audit failures before reporting traffic status."];
  if (trafficClaimGuard.summary.unsafeClaims > 0) return ["Remove unsupported traffic claims before reporting traffic status."];
  if (contentIntegrity.summary.blockingItems > 0) return ["Fix content integrity blockers before any mark:review action."];
  if (internalLinks.summary.waveItemsMissingPublicLinkSuggestion > 0) return ["Resolve Wave 1 internal link suggestion gaps before publishing."];
  if (searchSnippets.summary.waveItemsWithBlockingIssues > 0) return ["Fix Wave 1 search snippet blockers before publishing."];
  if (structuredData.summary.waveItemsWithBlockingIssues > 0) return ["Fix Wave 1 structured data readiness blockers before publishing."];
  if (searchIntentLanes.summary.lanesWithReadyDrafts !== searchIntentLanes.summary.lanes) return ["Regenerate search intent lane map and ensure every broad lane has ready draft candidates."];
  if (searchIntentApproval.summary.unsafeItems > 0) return ["Resolve search intent approval packet safety issues before manual review."];
  if (searchIntentWaves.summary.unsafeItems > 0) return ["Resolve search intent wave planner safety issues before manual review."];
  if (searchQueryCoverage.summary.unsafeItems > 0) return ["Resolve search query coverage gaps before manual review."];
  if (
    reviewCoverage.summary.itemsMissingOfficialSources > 0 ||
    reviewCoverage.summary.itemsMissingFactCheckQueries > 0 ||
    reviewCoverage.summary.itemsMissingRiskChecks > 0
  ) {
    return ["Fill review coverage source, fact-check, and risk checks before any mark:review action."];
  }
  return [
    "Review the current publish readiness items in docs/publish-readiness-pack.md.",
    "Use docs/wave-approval-packet.md as the focused Wave 1 approval packet.",
    "Use docs/wave-publish-simulation.md for the exact post-approval mark-review and publish dry-run path.",
    "Use docs/content-integrity-audit.md to confirm encoding, metadata, and indexing boundaries before approval.",
    "Use docs/internal-link-opportunity-audit.md to add public internal links during manual review.",
    "Use docs/search-snippet-readiness-audit.md to review title, description, and slug snippet quality.",
    "Use docs/structured-data-readiness-audit.md to review metadata and JSON-LD readiness.",
    "Use docs/search-intent-lane-map.md to choose broad, high-search-intent lanes beyond basic web deployment.",
    "Use docs/search-intent-approval-packet.md as the concrete current-wave and next-gap approval queue.",
    "Use docs/search-intent-wave-planner.md as the continuous multi-wave review queue across prompt, Agent, RAG, and model deployment lanes.",
    "Use docs/search-query-coverage.md to review likely user-search query variants for each planned wave item.",
    "Use docs/public-expansion-queue.md as the approval-wave order for expanding public articles.",
    "Use docs/traffic-evidence-audit.md before making any traffic or Search Console performance claim.",
    "Use docs/review-priority-roadmap.md as the merged priority list before deciding the next manual review batch.",
    "Use docs/next-review-source-pack.md to verify official sources for the roadmap's next review files.",
    "Use docs/review-coverage-report.md to inspect all planned review candidates, not only today's pack.",
    "Use docs/ai-deployment-coverage.md to prioritize deployment, Agent, RAG, and model infrastructure drafts.",
    "Use docs/industry-prompt-coverage.md to prioritize broad industry AI prompt drafts for future review batches.",
    "Use docs/review-batch-plan.md to see the next topical batches after the current pack.",
    "Run dry-run mark:review commands only; add --confirm-human only after explicit human approval.",
  ];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  cannibalization: { conflicts: number; reviewBatchConflictItems: Array<{ files: string[]; groupKey: string; reason: string; reviewBatchOverlap: string[] }>; reviewBatchConflicts: number };
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  liveSearch: { failedChecks: string[]; ok: boolean; publicCount: number; sitemapUrlCount: number };
  nextActions: string[];
  publishReadiness: {
    currentItemsCovered: number;
    items: Array<{
      factCheckQueries: string[];
      file: string;
      humanDecisionChecklist: string[];
      matchedContentOpportunity: { topic: string } | null;
      officialSourceTargets: string[];
      riskReviewChecklist: string[];
      title: string;
    }>;
  };
  publishingBoundary: { publicPublished: number; publishableNow: number; statusCounts: Record<string, number> };
  reviewRoadmap: {
    nextReviewFiles: string[];
    summary: ReviewRoadmap["summary"];
    topLanes: Array<{ candidates: number; lane: string; priorityScore: number; publicMatches: number }>;
  };
  nextReviewSourcePack: {
    summary: NextReviewSourcePack["summary"];
    topItems: Array<{
      currentPack: boolean;
      factCheckQueries: number;
      file: string;
      officialSourceTargets: number;
      plannedBatch: boolean;
      qualityScore: number;
      riskReviewChecklist: number;
      safeDraft: boolean;
      title: string;
    }>;
  };
  publicExpansion: {
    firstWaves: Array<{ files: string[]; wave: number }>;
    summary: PublicExpansionQueue["summary"];
    topItems: Array<{
      approvalWave: number;
      currentPack: boolean;
      file: string;
      plannedBatch: boolean;
      priorityScore: number;
      sourcePackReady: boolean;
      title: string;
    }>;
  };
  waveApprovalPacket: {
    files: string[];
    items: Array<{ file: string; readyForHumanReview: boolean; riskChecks: number; sources: number; title: string }>;
    summary: WaveApprovalPacket["summary"];
  };
  wavePublishSimulation: {
    items: Array<{ blockers: string[]; currentStatus: string; file: string; readyForHumanApproval: boolean; title: string }>;
    summary: WavePublishSimulation["summary"];
  };
  trafficEvidence: {
    canClaimTraffic: boolean;
    claimableMetrics: number;
    failedChecks: number;
    measuredTrafficSources: string[];
    searchConsoleVerificationEvidence: boolean;
    trafficDataAvailable: boolean;
  };
  trafficClaimGuard: { filesScanned: number; unsafeClaims: number; watchMentions: number };
  contentIntegrity: ContentIntegrity["summary"];
  internalLinks: {
    summary: InternalLinks["summary"];
    waveItems: Array<{
      currentInternalLinks: number;
      file: string;
      linksToPublicArticles: number;
      suggestions: Array<{ title: string; url: string }>;
      title: string;
    }>;
  };
  searchSnippets: {
    summary: SearchSnippets["summary"];
    waveItems: Array<{
      descriptionLength: number;
      file: string;
      issues: string[];
      slug: string;
      title: string;
      titleLength: number;
      warnings: string[];
    }>;
  };
  structuredData: {
    summary: StructuredData["summary"];
    waveItems: Array<{
      contentType: string;
      date: string;
      difficulty: string;
      file: string;
      issues: string[];
      tags: string[];
      title: string;
      updatedAt: string;
      warnings: string[];
    }>;
  };
  deploymentCoverage: {
    summary: DeploymentCoverage["summary"];
    topTopics: Array<{ candidates: number; gapScore: number; publicMatches: number; topic: string }>;
  };
  searchIntentLanes: {
    summary: SearchIntentLanes["summary"];
    topLanes: Array<{
      demandScore: number;
      id: string;
      intentSeeds: string[];
      matchedCandidates: number;
      priorityReason: string;
      priorityScore: number;
      publicCount: number;
      readyDraftCount: number;
      title: string;
    }>;
  };
  searchIntentApproval: {
    nextGapItems: Array<{
      file: string;
      lanePriorityScore: number;
      laneTitle: string;
      primaryKeyword: string;
      readyForHumanReview: boolean;
      title: string;
    }>;
    summary: SearchIntentApproval["summary"];
  };
  searchIntentWaves: {
    summary: SearchIntentWaves["summary"];
    waves: Array<{
      files: string[];
      focus: string;
      laneCount: number;
      readyItems: number;
      wave: number;
    }>;
  };
  searchQueryCoverage: {
    summary: SearchQueryCoverage["summary"];
    topItems: Array<{
      file: string;
      laneTitle: string;
      primaryKeyword: string;
      queryCount: number;
      readyForManualReview: boolean;
      title: string;
      wave: number;
    }>;
  };
  promptCoverage: {
    summary: PromptCoverage["summary"];
    topIndustries: Array<{ candidates: number; gapScore: number; industry: string; publicMatches: number }>;
  };
  reviewCoverage: ReviewCoverage["summary"];
  reviewPlan: {
    nextBatch: { batch: number; candidates: Array<{ file: string; opportunityScore: number; qualityScore: number; title: string }>; topic: string } | null;
    plannedBatches: number;
    plannedCandidates: number;
  };
}) {
  const lines = [
    "# Manual Review Workbench",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This workbench is read-only. It does not publish articles or mark drafts for review.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Publishing Boundary",
    "",
    `- Public published: ${payload.publishingBoundary.publicPublished}`,
    `- Publishable now: ${payload.publishingBoundary.publishableNow}`,
    `- Status counts: ${JSON.stringify(payload.publishingBoundary.statusCounts)}`,
    "",
    "## Live Search",
    "",
    `- Ok: ${payload.liveSearch.ok}`,
    `- Public articles: ${payload.liveSearch.publicCount}`,
    `- Sitemap URLs: ${payload.liveSearch.sitemapUrlCount}`,
    `- Failed checks: ${payload.liveSearch.failedChecks.length ? payload.liveSearch.failedChecks.join(", ") : "none"}`,
    "",
    "## Next Batch",
    "",
    `- Planned batches: ${payload.reviewPlan.plannedBatches}`,
    `- Planned candidates: ${payload.reviewPlan.plannedCandidates}`,
    `- First batch: ${payload.reviewPlan.nextBatch ? `${payload.reviewPlan.nextBatch.batch} - ${payload.reviewPlan.nextBatch.topic}` : "none"}`,
    "",
    "| # | Opportunity | Score | Title | File |",
    "| --- | --- | --- | --- | --- |",
    ...(payload.reviewPlan.nextBatch?.candidates.map((candidate, index) => (
      `| ${index + 1} | ${candidate.opportunityScore} | ${candidate.qualityScore} | ${candidate.title} | ${candidate.file} |`
    )) || []),
    "",
    "## Current Publish Readiness Items",
    "",
    `- Covered items: ${payload.publishReadiness.currentItemsCovered}`,
    "",
  ];

  for (const item of payload.publishReadiness.items) {
    lines.push(
      `### ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Matched opportunity: ${item.matchedContentOpportunity?.topic || "none"}`,
      `- Official source targets: ${item.officialSourceTargets.length}`,
      `- Fact-check queries: ${item.factCheckQueries.length}`,
      `- Human decision checks: ${item.humanDecisionChecklist.length}`,
      `- Risk checks: ${item.riskReviewChecklist.length}`,
      "",
    );
  }

  lines.push(
    "## Cannibalization",
    "",
    `- Conflicts: ${payload.cannibalization.conflicts}`,
    `- Review batch conflicts: ${payload.cannibalization.reviewBatchConflicts}`,
    "",
    "## Review Coverage",
    "",
    `- Planned candidates: ${payload.reviewCoverage.plannedCandidates}`,
    `- Current pack covered: ${payload.reviewCoverage.currentPackCovered}`,
    `- Missing coverage: ${payload.reviewCoverage.missingCoverage}`,
    `- Missing official sources: ${payload.reviewCoverage.itemsMissingOfficialSources}`,
    `- Missing fact-check queries: ${payload.reviewCoverage.itemsMissingFactCheckQueries}`,
    `- Missing risk checks: ${payload.reviewCoverage.itemsMissingRiskChecks}`,
    `- Unsafe indexing items: ${payload.reviewCoverage.unsafeIndexingItems}`,
    `- Non-draft items: ${payload.reviewCoverage.nonDraftItems}`,
    "",
    "## Review Priority Roadmap",
    "",
    `- Lanes: ${payload.reviewRoadmap.summary.lanes}`,
    `- Unique next review files: ${payload.reviewRoadmap.summary.uniqueNextReviewFiles}`,
    `- Topics without public coverage: ${payload.reviewRoadmap.summary.topicsWithoutPublicCoverage}`,
    `- Unsafe candidates: ${payload.reviewRoadmap.summary.unsafeCandidates}`,
    "",
    "| Lane | Score | Public | Candidates |",
    "| --- | --- | --- | --- |",
    ...payload.reviewRoadmap.topLanes.map((item) => `| ${item.lane} | ${item.priorityScore} | ${item.publicMatches} | ${item.candidates} |`),
    "",
    "Next review files:",
    "",
    ...payload.reviewRoadmap.nextReviewFiles.map((file) => `- ${file}`),
    "",
    "## Next Review Source Pack",
    "",
    `- Items: ${payload.nextReviewSourcePack.summary.items}`,
    `- Safe draft items: ${payload.nextReviewSourcePack.summary.safeDraftItems}`,
    `- Unsafe items: ${payload.nextReviewSourcePack.summary.unsafeItems}`,
    `- Missing official sources: ${payload.nextReviewSourcePack.summary.missingOfficialSources}`,
    `- Missing fact-check queries: ${payload.nextReviewSourcePack.summary.missingFactCheckQueries}`,
    `- Missing approval checks: ${payload.nextReviewSourcePack.summary.missingApprovalChecks}`,
    `- Missing risk checks: ${payload.nextReviewSourcePack.summary.missingRiskChecks}`,
    "",
    "| Safe | Current | Planned | Score | Sources | Queries | Risk checks | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.nextReviewSourcePack.topItems.map((item) => (
      `| ${item.safeDraft} | ${item.currentPack} | ${item.plannedBatch} | ${item.qualityScore} | ${item.officialSourceTargets} | ${item.factCheckQueries} | ${item.riskReviewChecklist} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Public Expansion Queue",
    "",
    `- Items: ${payload.publicExpansion.summary.items}`,
    `- Approval waves: ${payload.publicExpansion.summary.approvalWaves}`,
    `- Source-pack-ready items: ${payload.publicExpansion.summary.sourcePackReadyItems}`,
    `- Unsafe items: ${payload.publicExpansion.summary.unsafeItems}`,
    `- Duplicate files: ${payload.publicExpansion.summary.duplicateFiles}`,
    "",
    "| Wave | Score | Source pack | Current | Planned | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.publicExpansion.topItems.map((item) => (
      `| ${item.approvalWave} | ${item.priorityScore} | ${item.sourcePackReady} | ${item.currentPack} | ${item.plannedBatch} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Wave Approval Packet",
    "",
    `- Wave: ${payload.waveApprovalPacket.summary.wave}`,
    `- Items: ${payload.waveApprovalPacket.summary.items}`,
    `- Ready for human review: ${payload.waveApprovalPacket.summary.readyForHumanReview}`,
    `- Unsafe items: ${payload.waveApprovalPacket.summary.unsafeItems}`,
    "",
    "| Ready | Sources | Risk checks | Title | File |",
    "| --- | --- | --- | --- | --- |",
    ...payload.waveApprovalPacket.items.map((item) => (
      `| ${item.readyForHumanReview} | ${item.sources} | ${item.riskChecks} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Wave Publish Simulation",
    "",
    `- Wave: ${payload.wavePublishSimulation.summary.wave}`,
    `- Items: ${payload.wavePublishSimulation.summary.items}`,
    `- Ready for human approval: ${payload.wavePublishSimulation.summary.readyForHumanApproval}`,
    `- Unsafe items: ${payload.wavePublishSimulation.summary.unsafeItems}`,
    `- Currently publishable: ${payload.wavePublishSimulation.summary.currentlyPublishable}`,
    `- Public published before wave: ${payload.wavePublishSimulation.summary.publicPublishedBeforeWave}`,
    `- Projected publishable after human approval: ${payload.wavePublishSimulation.summary.projectedPublishableAfterHumanApproval}`,
    `- Projected public published after wave: ${payload.wavePublishSimulation.summary.projectedPublicPublishedAfterWave}`,
    "",
    "| Ready | Status | Blockers | Title | File |",
    "| --- | --- | --- | --- | --- |",
    ...payload.wavePublishSimulation.items.map((item) => (
      `| ${item.readyForHumanApproval} | ${item.currentStatus} | ${item.blockers.length ? item.blockers.join("<br>") : "none"} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Traffic Evidence",
    "",
    `- Traffic data available: ${payload.trafficEvidence.trafficDataAvailable}`,
    `- Can claim traffic: ${payload.trafficEvidence.canClaimTraffic}`,
    `- Claimable metrics: ${payload.trafficEvidence.claimableMetrics}`,
    `- Measured traffic sources: ${payload.trafficEvidence.measuredTrafficSources.length ? payload.trafficEvidence.measuredTrafficSources.join(", ") : "none"}`,
    `- Search Console verification evidence: ${payload.trafficEvidence.searchConsoleVerificationEvidence}`,
    `- Failed checks: ${payload.trafficEvidence.failedChecks}`,
    `- Unsupported traffic claims: ${payload.trafficClaimGuard.unsafeClaims}`,
    `- Traffic claim files scanned: ${payload.trafficClaimGuard.filesScanned}`,
    `- Traffic claim watch mentions: ${payload.trafficClaimGuard.watchMentions}`,
    "",
    "## Content Integrity",
    "",
    `- Files scanned: ${payload.contentIntegrity.filesScanned}`,
    `- Blocking items: ${payload.contentIntegrity.blockingItems}`,
    `- All issue items: ${payload.contentIntegrity.allIssueItems}`,
    `- Public items: ${payload.contentIntegrity.publicItems}`,
    `- Recommended items: ${payload.contentIntegrity.recommendedItems}`,
    `- Wave items: ${payload.contentIntegrity.waveItems}`,
    `- Expansion items: ${payload.contentIntegrity.expansionItems}`,
    "",
    "## Internal Link Opportunities",
    "",
    `- Candidate items: ${payload.internalLinks.summary.candidateItems}`,
    `- Candidates with public suggestions: ${payload.internalLinks.summary.candidateItemsWithPublicSuggestions}`,
    `- Candidate items missing suggestions: ${payload.internalLinks.summary.candidateItemsMissingPublicLinkSuggestion}`,
    `- Wave items: ${payload.internalLinks.summary.waveItems}`,
    `- Wave items missing suggestions: ${payload.internalLinks.summary.waveItemsMissingPublicLinkSuggestion}`,
    "",
    "| Public links now | Suggestions | Title | File |",
    "| --- | --- | --- | --- |",
    ...payload.internalLinks.waveItems.map((item) => (
      `| ${item.linksToPublicArticles}/${item.currentInternalLinks} | ${item.suggestions.map((suggestion) => `${suggestion.title} (${suggestion.url})`).join("<br>")} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Search Snippet Readiness",
    "",
    `- Scoped items: ${payload.searchSnippets.summary.scopedItems}`,
    `- Blocking items: ${payload.searchSnippets.summary.blockingItems}`,
    `- Warning items: ${payload.searchSnippets.summary.warningItems}`,
    `- Wave items: ${payload.searchSnippets.summary.waveItems}`,
    `- Wave items with blocking issues: ${payload.searchSnippets.summary.waveItemsWithBlockingIssues}`,
    "",
    "| Title chars | Description chars | Issues | Warnings | Slug | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.searchSnippets.waveItems.map((item) => (
      `| ${item.titleLength} | ${item.descriptionLength} | ${item.issues.length ? item.issues.join("<br>") : "none"} | ${item.warnings.length ? item.warnings.join("<br>") : "none"} | ${item.slug} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Structured Data Readiness",
    "",
    `- Scoped items: ${payload.structuredData.summary.scopedItems}`,
    `- JSON-LD preview items: ${payload.structuredData.summary.jsonLdPreviewItems}`,
    `- Blocking items: ${payload.structuredData.summary.blockingItems}`,
    `- Warning items: ${payload.structuredData.summary.warningItems}`,
    `- Wave items: ${payload.structuredData.summary.waveItems}`,
    `- Wave items with blocking issues: ${payload.structuredData.summary.waveItemsWithBlockingIssues}`,
    "",
    "| Date | Updated | Tags | Type | Difficulty | Issues | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.structuredData.waveItems.map((item) => (
      `| ${item.date} | ${item.updatedAt} | ${item.tags.join(", ")} | ${item.contentType} | ${item.difficulty} | ${item.issues.length ? item.issues.join("<br>") : "none"} | ${item.warnings.length ? item.warnings.join("<br>") : "none"} | ${item.title} | ${item.file} |`
    )),
    "",
    "## AI Deployment Coverage",
    "",
    `- Topics: ${payload.deploymentCoverage.summary.topics}`,
    `- Topics with ready candidates: ${payload.deploymentCoverage.summary.topicsWithReadyCandidates}`,
    `- Review-ready deployment drafts: ${payload.deploymentCoverage.summary.reviewReadyDeploymentDrafts}`,
    `- Unique candidate files: ${payload.deploymentCoverage.summary.uniqueCandidateFiles}`,
    `- Public deployment articles: ${payload.deploymentCoverage.summary.deploymentPublicArticles}`,
    `- Unsafe candidate items: ${payload.deploymentCoverage.summary.unsafeCandidateItems}`,
    "",
    "| Topic | Score | Public | Ready candidates |",
    "| --- | --- | --- | --- |",
    ...payload.deploymentCoverage.topTopics.map((item) => `| ${item.topic} | ${item.gapScore} | ${item.publicMatches} | ${item.candidates} |`),
    "",
    "## Search Intent Lane Map",
    "",
    `- Lanes: ${payload.searchIntentLanes.summary.lanes}`,
    `- High-priority lanes: ${payload.searchIntentLanes.summary.highPriorityLanes}`,
    `- Lanes with ready drafts: ${payload.searchIntentLanes.summary.lanesWithReadyDrafts}`,
    `- Lanes without public coverage: ${payload.searchIntentLanes.summary.lanesWithoutPublicCoverage}`,
    `- Total ready draft matches: ${payload.searchIntentLanes.summary.totalReadyDraftMatches}`,
    `- Not-ready matched drafts: ${payload.searchIntentLanes.summary.notReadyMatchedDrafts}`,
    "",
    "| Score | Demand | Public | Ready drafts | Candidates shown | Lane | Intent seeds | Reason |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.searchIntentLanes.topLanes.map((item) => (
      `| ${item.priorityScore} | ${item.demandScore} | ${item.publicCount} | ${item.readyDraftCount} | ${item.matchedCandidates} | ${item.title} | ${item.intentSeeds.slice(0, 3).join("<br>")} | ${item.priorityReason} |`
    )),
    "",
    "## Search Intent Approval Packet",
    "",
    `- Wave: ${payload.searchIntentApproval.summary.wave}`,
    `- Current wave items: ${payload.searchIntentApproval.summary.currentWaveItems}`,
    `- Current wave ready: ${payload.searchIntentApproval.summary.currentWaveReady}`,
    `- Next gap items: ${payload.searchIntentApproval.summary.nextGapItems}`,
    `- Next gap lanes: ${payload.searchIntentApproval.summary.nextGapLanes}`,
    `- Unsafe items: ${payload.searchIntentApproval.summary.unsafeItems}`,
    "",
    "| Ready | Lane score | Lane | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...payload.searchIntentApproval.nextGapItems.map((item) => (
      `| ${item.readyForHumanReview} | ${item.lanePriorityScore} | ${item.laneTitle} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Search Intent Wave Planner",
    "",
    `- Planned waves: ${payload.searchIntentWaves.summary.plannedWaves}`,
    `- Planned items: ${payload.searchIntentWaves.summary.plannedItems}`,
    `- Ready items: ${payload.searchIntentWaves.summary.readyItems}`,
    `- Unique files: ${payload.searchIntentWaves.summary.uniqueFiles}`,
    `- Unique lanes: ${payload.searchIntentWaves.summary.uniqueLanes}`,
    `- Unsafe items: ${payload.searchIntentWaves.summary.unsafeItems}`,
    "",
    "| Wave | Ready | Lanes | Focus | Files |",
    "| --- | --- | --- | --- | --- |",
    ...payload.searchIntentWaves.waves.map((item) => (
      `| ${item.wave} | ${item.readyItems} | ${item.laneCount} | ${item.focus} | ${item.files.join("<br>")} |`
    )),
    "",
    "## Search Query Coverage",
    "",
    `- Items: ${payload.searchQueryCoverage.summary.items}`,
    `- Ready items: ${payload.searchQueryCoverage.summary.readyItems}`,
    `- Unique files: ${payload.searchQueryCoverage.summary.uniqueFiles}`,
    `- Unique lanes: ${payload.searchQueryCoverage.summary.uniqueLanes}`,
    `- Unique queries: ${payload.searchQueryCoverage.summary.uniqueQueries}`,
    `- Unsafe items: ${payload.searchQueryCoverage.summary.unsafeItems}`,
    "",
    "| Wave | Ready | Queries | Lane | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.searchQueryCoverage.topItems.map((item) => (
      `| ${item.wave} | ${item.readyForManualReview} | ${item.queryCount} | ${item.laneTitle} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Industry Prompt Coverage",
    "",
    `- Industries: ${payload.promptCoverage.summary.industries}`,
    `- Industries with ready candidates: ${payload.promptCoverage.summary.industriesWithReadyCandidates}`,
    `- Review-ready prompt drafts: ${payload.promptCoverage.summary.reviewReadyPromptDrafts}`,
    `- Unique candidate files: ${payload.promptCoverage.summary.uniqueCandidateFiles}`,
    `- Public prompt articles: ${payload.promptCoverage.summary.promptPublicArticles}`,
    `- Unsafe candidate items: ${payload.promptCoverage.summary.unsafeCandidateItems}`,
    "",
    "| Industry | Score | Public | Ready candidates |",
    "| --- | --- | --- | --- |",
    ...payload.promptCoverage.topIndustries.map((item) => `| ${item.industry} | ${item.gapScore} | ${item.publicMatches} | ${item.candidates} |`),
    "",
    "| Reason | Group | Overlap | Files |",
    "| --- | --- | --- | --- |",
    ...payload.cannibalization.reviewBatchConflictItems.map((item) => `| ${item.reason} | ${item.groupKey} | ${item.reviewBatchOverlap.length} | ${item.reviewBatchOverlap.join("<br>")} |`),
    "",
    "## Next Actions",
    "",
    ...payload.nextActions.map((action) => `- ${action}`),
    "",
  );

  return lines.join("\n");
}

main();

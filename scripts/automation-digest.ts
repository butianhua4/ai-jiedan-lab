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

type PromptReviewPack = {
  nextItems: Array<{
    file: string;
    industry: string;
    priorityScore: number;
    publicMatches: number;
    readyForHumanReview: boolean;
    safeDraft: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
  }>;
  summary: {
    duplicateFiles: number;
    industriesCovered: number;
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithOfficialSources: number;
    itemsWithSearchQueries: number;
    promptPublicArticles: number;
    safeDraftItems: number;
    unsafeItems: number;
    uniqueFiles: number;
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

type DeploymentReviewPack = {
  nextItems: Array<{
    category: string;
    file: string;
    priorityScore: number;
    publicMatches: number;
    readyForHumanReview: boolean;
    safeDraft: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
    topic: string;
  }>;
  summary: {
    deploymentPublicArticles: number;
    duplicateFiles: number;
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithOfficialSources: number;
    itemsWithSearchQueries: number;
    safeDraftItems: number;
    topicsCovered: number;
    unsafeItems: number;
    uniqueFiles: number;
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

type SourceHealth = {
  failedChecks: Array<{ error?: string; finalUrl?: string; ok: boolean; references: unknown[]; status?: number; url: string }>;
  filesWithoutReachableSource: Array<{ file: string; reachableSources: number; sourceTargets: number; title: string }>;
  redirectedChecks: Array<{ finalUrl?: string; references: unknown[]; status?: number; url: string }>;
  summary: {
    checkedUrls: number;
    currentReviewFiles: number;
    failedUrls: number;
    filesCovered: number;
    filesWithReachableSource: number;
    filesWithoutReachableSource: number;
    missingUrlTargets: number;
    nextSourcePackFiles: number;
    okUrls: number;
    publicGapDecisionFiles: number;
    redirectedUrls: number;
    sourceReferences: number;
    uniqueUrls: number;
  };
};

type ReviewActionBoard = {
  nextTasks: Array<{
    file: string;
    kind: string;
    priority: number;
    ready: boolean;
    scope: string;
    sourceTargets: number;
    title: string;
    warnings: unknown[];
  }>;
  summary: {
    publicGapReadyTasks: number;
    publicGapTasks: number;
    readyTasks: number;
    tasks: number;
    unsafeTasks: number;
    waveReadyTasks: number;
    waveTasks: number;
  };
  unsafeTasks: unknown[];
};

type ReviewPortfolioBoard = {
  multiSourceItems: Array<{
    file: string;
    priorityScore: number;
    readyForHumanReview: boolean;
    safeDraft: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    sourceTypes: string[];
    title: string;
  }>;
  nextItems: Array<{
    file: string;
    priorityScore: number;
    readyForHumanReview: boolean;
    safeDraft: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    sourceTypes: string[];
    title: string;
  }>;
  sourceCounts: { deployment: number; prompt: number; publicGap: number; wave: number };
  summary: {
    duplicateMentions: number;
    items: number;
    itemsWithMultipleSources: number;
    readyItems: number;
    safeDraftItems: number;
    sourceCandidates: number;
    unsafeItems: number;
  };
};

type AutopilotReviewQueue = {
  nextAssignments: Array<{
    assignmentLane: string;
    autopilotScore: number;
    blockers: unknown[];
    file: string;
    readyForAssignment: boolean;
    reviewFocus: string[];
    safeDraft: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    sourceTypes: string[];
    title: string;
  }>;
  summary: {
    items: number;
    nextAssignments: number;
    readyItems: number;
    safeDraftItems: number;
    unsafeItems: number;
    withSearchQueries: number;
    withSourceTargets: number;
  };
  unsafeItems: unknown[];
};

type AutopilotApprovalPacket = {
  items: Array<{
    articleMeta: {
      noindex: boolean;
      status: string;
    };
    assignmentLane: string;
    autopilotScore: number;
    file: string;
    headings: string[];
    readyForHumanApproval: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    sourceTypes: string[];
    title: string;
  }>;
  summary: {
    items: number;
    queueUnsafeItems: number;
    readyForHumanApproval: number;
    unsafeItems: number;
    withHeadings: number;
    withSearchQueries: number;
    withSourceTargets: number;
  };
  unsafeItems: unknown[];
};

type AutopilotSearchIntentBrief = {
  items: Array<{
    bodyQueryHits: string[];
    descriptionQueryHits: string[];
    file: string;
    headingQueryHits: string[];
    primaryQuery: string;
    queryTokenHits: number;
    readyForHumanReview: boolean;
    reviewSuggestions: string[];
    searchWeaknesses: string[];
    title: string;
    titleQueryHits: string[];
  }>;
  searchWeakItems: unknown[];
  summary: {
    approvalItems: number;
    bodyCoveredItems: number;
    descriptionCoveredItems: number;
    headingCoveredItems: number;
    items: number;
    packetUnsafeItems: number;
    searchWeakItems: number;
    titleCoveredItems: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotInternalLinkBrief = {
  items: Array<{
    currentInternalLinks: number;
    file: string;
    linksToPublicArticles: number;
    readyForHumanReview: boolean;
    safeDraft: boolean;
    suggestions: Array<{ title: string; url: string }>;
    title: string;
  }>;
  summary: {
    approvalItems: number;
    items: number;
    itemsAlreadyLinkedToPublic: number;
    itemsMissingCurrentPublicLink: number;
    itemsWithSuggestions: number;
    packetUnsafeItems: number;
    publicArticles: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotSourceVerificationBrief = {
  items: Array<{
    approvalChecklist: unknown[];
    factCheckQueries: unknown[];
    file: string;
    officialSourceTargets: unknown[];
    readyForHumanReview: boolean;
    reachableSources: number;
    riskReviewChecklist: unknown[];
    safeDraft: boolean;
    title: string;
    uniqueReachableUrls: string[];
  }>;
  summary: {
    approvalItems: number;
    items: number;
    itemsWithApprovalChecklist: number;
    itemsWithFactCheckQueries: number;
    itemsWithOfficialSources: number;
    itemsWithReachableSources: number;
    packetUnsafeItems: number;
    totalReachableSources: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotHumanReviewPlaybook = {
  items: Array<{
    file: string;
    internalLinkActions: unknown[];
    manualOnlyCommands: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    readyForHumanReview: boolean;
    safeDraft: boolean;
    searchActions: unknown[];
    sourceActions: unknown[];
    title: string;
  }>;
  summary: {
    approvalItems: number;
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithInternalLinkActions: number;
    itemsWithSearchActions: number;
    itemsWithSourceActions: number;
    readyItems: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotReviewSprintBoard = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    file: string;
    lane: string;
    playbookStage: string;
    readyForSprint: boolean;
    reviewChecklist: unknown[];
    safeDraft: boolean;
    searchQueries: number;
    sourceTargets: number;
    sprintOrder: number;
    title: string;
  }>;
  queuedForPlaybook: unknown[];
  readyWithPlaybook: unknown[];
  summary: {
    items: number;
    itemsNeedingSearchQuery: number;
    itemsWithCommandBoundary: number;
    queuedForPlaybook: number;
    readyForSprint: number;
    readyWithPlaybook: number;
    safeDraftItems: number;
    unsafeItems: number;
    withSearchQueries: number;
    withSourceTargets: number;
  };
  unsafeItems: unknown[];
};

type ReviewOptimizationBrief = {
  nextBriefs: Array<{
    file: string;
    internalLink: { title: string; url: string } | null;
    priority: number;
    proposedDescription: string;
    proposedOpeningAdditions: string[];
    proposedTitle: string;
    scope: string;
    searchEvidence: { exactQueryMatches: number | null; matchedFamilies: number | null };
    title: string;
    warningRemediation: string[];
  }>;
  summary: {
    briefs: number;
    briefsWithAction: number;
    exactQueryWeakItems: number;
    missingPublicLinkItems: number;
    readyBriefs: number;
    unsafeCommands: number;
  };
};

type ReviewCannibalizationBrief = {
  nextItems: Array<{
    candidate: { file: string; primaryKeyword: string; title: string };
    decision: string;
    highestPublishedScore: number;
    highestReviewScore: number;
    recommendation: string;
    riskLevel: string;
  }>;
  summary: {
    candidateFiles: number;
    highRiskItems: number;
    items: number;
    itemsWithPublishedComparison: number;
    itemsWithReviewComparison: number;
    mediumRiskItems: number;
    unsafeCommands: number;
  };
};

type ReviewFreshnessBrief = {
  highRiskItems: Array<{
    articleUpdatedAt: string;
    file: string;
    freshnessRisk: string;
    readyForFreshnessReview: boolean;
    reachableSources: number;
    sourceTargets: number;
    staleSensitiveChecks: unknown[];
    title: string;
  }>;
  summary: {
    blockedItems: number;
    highRiskItems: number;
    items: number;
    itemsWithOfficialSources: number;
    itemsWithReachableSources: number;
    readyItems: number;
    unsafeCommands: number;
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

type SearchQueryMatch = {
  items: Array<{
    descriptionHit: boolean;
    exactQueryMatches: number;
    file: string;
    matchedFamilies: number;
    readyForManualReview: boolean;
    title: string;
    titleHit: boolean;
    warningIssues: string[];
    wave: number;
  }>;
  summary: {
    averageExactMatches: number;
    averageMatchedFamilies: number;
    blockingItems: number;
    items: number;
    readyItems: number;
    warningItems: number;
  };
};

type BroadSearchDemand = {
  summary: {
    maxGapScore: number;
    missingSubtopics: number;
    plannedWaveThemeMatches: number;
    reviewPackThemeMatches: number;
    themes: number;
    themesWithReadyDrafts: number;
    themesWithoutPublicCoverage: number;
    totalReadyDraftMatches: number;
    uniqueCandidateFiles: number;
  };
  topThemes: Array<{
    candidateDrafts: unknown[];
    gapScore: number;
    missingSubtopics: string[];
    plannedWaveMatches: number;
    publicMatches: number;
    readyDrafts: number;
    reviewPackMatches: number;
    searchSeeds: string[];
    title: string;
  }>;
};

type PublicCoverageGapPlan = {
  items: Array<{
    file: string;
    gapScore: number;
    missingSubtopics: string[];
    primaryKeyword: string;
    readyForManualReview: boolean;
    themeTitle: string;
    title: string;
  }>;
  summary: {
    duplicateFiles: number;
    gapThemes: number;
    items: number;
    plannedWaves: number;
    readyItems: number;
    unsafeItems: number;
    uniqueFiles: number;
  };
  waves: Array<{
    files: string[];
    focus: string;
    readyItems: number;
    themes: string[];
    wave: number;
  }>;
};

type PublicCoverageGapPreflight = {
  items: Array<{
    approvalWave: number;
    blockingIssues: unknown[];
    exactSeedMatches: number;
    file: string;
    linksToPublicArticles: number;
    publicLinkSuggestions: unknown[];
    readyForManualReview: boolean;
    seedFamilyMatches: number;
    structuredDataReady: boolean;
    themeTitle: string;
    title: string;
    warningIssues: unknown[];
  }>;
  summary: {
    blockingItems: number;
    items: number;
    planItems: number;
    readyItems: number;
    structuredDataReadyItems: number;
    uniqueFiles: number;
    warningItems: number;
    withPublicLinkSuggestions: number;
    withSeedMatches: number;
  };
  waveSummaries: Array<{
    blockingItems: number;
    files: string[];
    readyItems: number;
    themes: string[];
    warningItems: number;
    wave: number;
  }>;
};

type PublicCoverageGapDecisionPack = {
  items: Array<{
    approvalWave: number;
    decision: string;
    file: string;
    publicLinkSuggestion: { title: string; url: string } | null;
    readyForManualReview: boolean;
    reviewPacket: { sourceTargets: unknown[]; warningIssues: unknown[] };
    riskLevel: string;
    suggestedOptimizations: unknown[];
    themeTitle: string;
    title: string;
  }>;
  summary: {
    blockingItems: number;
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithHumanChecklist: number;
    itemsWithPublicLinkSuggestion: number;
    itemsWithSourceTargets: number;
    itemsWithWarningRemediation: number;
    optimizationActions: number;
    readyItems: number;
    reviewReadyWithOptimizations: number;
    unsafeItems: number;
    waves: number;
  };
  waveSummaries: Array<{
    blockingItems: number;
    files: string[];
    optimizationActions: number;
    readyItems: number;
    themes: string[];
    wave: number;
  }>;
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
  deploymentReviewPack: readJson<DeploymentReviewPack>("content/automation/ai-deployment-review-pack.json"),
  broadSearchDemand: readJson<BroadSearchDemand>("content/automation/broad-search-demand-map.json"),
  publicCoverageGapPlan: readJson<PublicCoverageGapPlan>("content/automation/public-coverage-gap-plan.json"),
  publicCoverageGapPreflight: readJson<PublicCoverageGapPreflight>("content/automation/public-coverage-gap-preflight.json"),
  publicCoverageGapDecisionPack: readJson<PublicCoverageGapDecisionPack>("content/automation/public-coverage-gap-decision-pack.json"),
  promptCoverage: readJson<PromptCoverage>("content/automation/industry-prompt-coverage.json"),
  promptReviewPack: readJson<PromptReviewPack>("content/automation/industry-prompt-review-pack.json"),
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
  sourceHealth: readJson<SourceHealth>("content/automation/source-target-health-audit.json"),
  reviewActionBoard: readJson<ReviewActionBoard>("content/automation/review-action-board.json"),
  reviewPortfolioBoard: readJson<ReviewPortfolioBoard>("content/automation/review-portfolio-board.json"),
  autopilotReviewQueue: readJson<AutopilotReviewQueue>("content/automation/autopilot-review-queue.json"),
  autopilotApprovalPacket: readJson<AutopilotApprovalPacket>("content/automation/autopilot-approval-packet.json"),
  autopilotSearchIntentBrief: readJson<AutopilotSearchIntentBrief>("content/automation/autopilot-search-intent-brief.json"),
  autopilotInternalLinkBrief: readJson<AutopilotInternalLinkBrief>("content/automation/autopilot-internal-link-brief.json"),
  autopilotSourceVerificationBrief: readJson<AutopilotSourceVerificationBrief>("content/automation/autopilot-source-verification-brief.json"),
  autopilotHumanReviewPlaybook: readJson<AutopilotHumanReviewPlaybook>("content/automation/autopilot-human-review-playbook.json"),
  autopilotReviewSprintBoard: readJson<AutopilotReviewSprintBoard>("content/automation/autopilot-review-sprint-board.json"),
  reviewOptimizationBrief: readJson<ReviewOptimizationBrief>("content/automation/review-optimization-brief.json"),
  reviewCannibalizationBrief: readJson<ReviewCannibalizationBrief>("content/automation/review-cannibalization-brief.json"),
  reviewFreshnessBrief: readJson<ReviewFreshnessBrief>("content/automation/review-freshness-brief.json"),
  searchSnippets: readJson<SearchSnippets>("content/automation/search-snippet-readiness-audit.json"),
  structuredData: readJson<StructuredData>("content/automation/structured-data-readiness-audit.json"),
  searchIntentLanes: readJson<SearchIntentLanes>("content/automation/search-intent-lane-map.json"),
  searchIntentApproval: readJson<SearchIntentApproval>("content/automation/search-intent-approval-packet.json"),
  searchIntentWaves: readJson<SearchIntentWaves>("content/automation/search-intent-wave-planner.json"),
  searchQueryCoverage: readJson<SearchQueryCoverage>("content/automation/search-query-coverage.json"),
  searchQueryMatch: readJson<SearchQueryMatch>("content/automation/search-query-match-audit.json"),
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
  sourceHealth: {
    checkedUrls: reports.sourceHealth.data?.summary.checkedUrls ?? null,
    currentReviewFiles: reports.sourceHealth.data?.summary.currentReviewFiles ?? null,
    failedChecks: reports.sourceHealth.data?.failedChecks.slice(0, 8) ?? [],
    failedUrls: reports.sourceHealth.data?.summary.failedUrls ?? null,
    filesCovered: reports.sourceHealth.data?.summary.filesCovered ?? null,
    filesWithReachableSource: reports.sourceHealth.data?.summary.filesWithReachableSource ?? null,
    filesWithoutReachableSource: reports.sourceHealth.data?.summary.filesWithoutReachableSource ?? null,
    filesWithoutReachableSourceList: reports.sourceHealth.data?.filesWithoutReachableSource.slice(0, 8) ?? [],
    missingUrlTargets: reports.sourceHealth.data?.summary.missingUrlTargets ?? null,
    nextSourcePackFiles: reports.sourceHealth.data?.summary.nextSourcePackFiles ?? null,
    okUrls: reports.sourceHealth.data?.summary.okUrls ?? null,
    publicGapDecisionFiles: reports.sourceHealth.data?.summary.publicGapDecisionFiles ?? null,
    redirectedChecks: reports.sourceHealth.data?.redirectedChecks.slice(0, 8) ?? [],
    redirectedUrls: reports.sourceHealth.data?.summary.redirectedUrls ?? null,
    sourceReferences: reports.sourceHealth.data?.summary.sourceReferences ?? null,
    uniqueUrls: reports.sourceHealth.data?.summary.uniqueUrls ?? null,
  },
  reviewActionBoard: {
    nextTasks: reports.reviewActionBoard.data?.nextTasks.slice(0, 6) ?? [],
    publicGapReadyTasks: reports.reviewActionBoard.data?.summary.publicGapReadyTasks ?? null,
    publicGapTasks: reports.reviewActionBoard.data?.summary.publicGapTasks ?? null,
    readyTasks: reports.reviewActionBoard.data?.summary.readyTasks ?? null,
    tasks: reports.reviewActionBoard.data?.summary.tasks ?? null,
    unsafeTasks: reports.reviewActionBoard.data?.summary.unsafeTasks ?? null,
    unsafeTaskList: reports.reviewActionBoard.data?.unsafeTasks.slice(0, 6) ?? [],
    waveReadyTasks: reports.reviewActionBoard.data?.summary.waveReadyTasks ?? null,
    waveTasks: reports.reviewActionBoard.data?.summary.waveTasks ?? null,
  },
  reviewPortfolioBoard: {
    duplicateMentions: reports.reviewPortfolioBoard.data?.summary.duplicateMentions ?? null,
    items: reports.reviewPortfolioBoard.data?.summary.items ?? null,
    itemsWithMultipleSources: reports.reviewPortfolioBoard.data?.summary.itemsWithMultipleSources ?? null,
    multiSourceItems: reports.reviewPortfolioBoard.data?.multiSourceItems.slice(0, 8) ?? [],
    nextItems: reports.reviewPortfolioBoard.data?.nextItems.slice(0, 8) ?? [],
    readyItems: reports.reviewPortfolioBoard.data?.summary.readyItems ?? null,
    safeDraftItems: reports.reviewPortfolioBoard.data?.summary.safeDraftItems ?? null,
    sourceCandidates: reports.reviewPortfolioBoard.data?.summary.sourceCandidates ?? null,
    sourceCounts: reports.reviewPortfolioBoard.data?.sourceCounts ?? null,
    unsafeItems: reports.reviewPortfolioBoard.data?.summary.unsafeItems ?? null,
  },
  autopilotReviewQueue: {
    items: reports.autopilotReviewQueue.data?.summary.items ?? null,
    nextAssignments: reports.autopilotReviewQueue.data?.summary.nextAssignments ?? null,
    nextAssignmentItems: reports.autopilotReviewQueue.data?.nextAssignments.slice(0, 10) ?? [],
    readyItems: reports.autopilotReviewQueue.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotReviewQueue.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.autopilotReviewQueue.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotReviewQueue.data?.unsafeItems.slice(0, 8) ?? [],
    withSearchQueries: reports.autopilotReviewQueue.data?.summary.withSearchQueries ?? null,
    withSourceTargets: reports.autopilotReviewQueue.data?.summary.withSourceTargets ?? null,
  },
  autopilotApprovalPacket: {
    items: reports.autopilotApprovalPacket.data?.summary.items ?? null,
    packetItems: reports.autopilotApprovalPacket.data?.items.slice(0, 3) ?? [],
    queueUnsafeItems: reports.autopilotApprovalPacket.data?.summary.queueUnsafeItems ?? null,
    readyForHumanApproval: reports.autopilotApprovalPacket.data?.summary.readyForHumanApproval ?? null,
    unsafeItems: reports.autopilotApprovalPacket.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotApprovalPacket.data?.unsafeItems.slice(0, 8) ?? [],
    withHeadings: reports.autopilotApprovalPacket.data?.summary.withHeadings ?? null,
    withSearchQueries: reports.autopilotApprovalPacket.data?.summary.withSearchQueries ?? null,
    withSourceTargets: reports.autopilotApprovalPacket.data?.summary.withSourceTargets ?? null,
  },
  autopilotSearchIntentBrief: {
    bodyCoveredItems: reports.autopilotSearchIntentBrief.data?.summary.bodyCoveredItems ?? null,
    descriptionCoveredItems: reports.autopilotSearchIntentBrief.data?.summary.descriptionCoveredItems ?? null,
    headingCoveredItems: reports.autopilotSearchIntentBrief.data?.summary.headingCoveredItems ?? null,
    items: reports.autopilotSearchIntentBrief.data?.summary.items ?? null,
    packetUnsafeItems: reports.autopilotSearchIntentBrief.data?.summary.packetUnsafeItems ?? null,
    searchWeakItems: reports.autopilotSearchIntentBrief.data?.summary.searchWeakItems ?? null,
    searchWeakItemList: reports.autopilotSearchIntentBrief.data?.searchWeakItems.slice(0, 8) ?? [],
    titleCoveredItems: reports.autopilotSearchIntentBrief.data?.summary.titleCoveredItems ?? null,
    unsafeItems: reports.autopilotSearchIntentBrief.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotSearchIntentBrief.data?.unsafeItems.slice(0, 8) ?? [],
    itemsList: reports.autopilotSearchIntentBrief.data?.items.slice(0, 3) ?? [],
  },
  autopilotInternalLinkBrief: {
    items: reports.autopilotInternalLinkBrief.data?.summary.items ?? null,
    itemsAlreadyLinkedToPublic: reports.autopilotInternalLinkBrief.data?.summary.itemsAlreadyLinkedToPublic ?? null,
    itemsList: reports.autopilotInternalLinkBrief.data?.items.slice(0, 3) ?? [],
    itemsMissingCurrentPublicLink: reports.autopilotInternalLinkBrief.data?.summary.itemsMissingCurrentPublicLink ?? null,
    itemsWithSuggestions: reports.autopilotInternalLinkBrief.data?.summary.itemsWithSuggestions ?? null,
    packetUnsafeItems: reports.autopilotInternalLinkBrief.data?.summary.packetUnsafeItems ?? null,
    publicArticles: reports.autopilotInternalLinkBrief.data?.summary.publicArticles ?? null,
    unsafeItems: reports.autopilotInternalLinkBrief.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotInternalLinkBrief.data?.unsafeItems.slice(0, 8) ?? [],
  },
  autopilotSourceVerificationBrief: {
    items: reports.autopilotSourceVerificationBrief.data?.summary.items ?? null,
    itemsList: reports.autopilotSourceVerificationBrief.data?.items.slice(0, 3) ?? [],
    itemsWithApprovalChecklist: reports.autopilotSourceVerificationBrief.data?.summary.itemsWithApprovalChecklist ?? null,
    itemsWithFactCheckQueries: reports.autopilotSourceVerificationBrief.data?.summary.itemsWithFactCheckQueries ?? null,
    itemsWithOfficialSources: reports.autopilotSourceVerificationBrief.data?.summary.itemsWithOfficialSources ?? null,
    itemsWithReachableSources: reports.autopilotSourceVerificationBrief.data?.summary.itemsWithReachableSources ?? null,
    packetUnsafeItems: reports.autopilotSourceVerificationBrief.data?.summary.packetUnsafeItems ?? null,
    totalReachableSources: reports.autopilotSourceVerificationBrief.data?.summary.totalReachableSources ?? null,
    unsafeItems: reports.autopilotSourceVerificationBrief.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotSourceVerificationBrief.data?.unsafeItems.slice(0, 8) ?? [],
  },
  autopilotHumanReviewPlaybook: {
    items: reports.autopilotHumanReviewPlaybook.data?.summary.items ?? null,
    itemsList: reports.autopilotHumanReviewPlaybook.data?.items.slice(0, 3) ?? [],
    itemsWithCommandBoundary: reports.autopilotHumanReviewPlaybook.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithInternalLinkActions: reports.autopilotHumanReviewPlaybook.data?.summary.itemsWithInternalLinkActions ?? null,
    itemsWithSearchActions: reports.autopilotHumanReviewPlaybook.data?.summary.itemsWithSearchActions ?? null,
    itemsWithSourceActions: reports.autopilotHumanReviewPlaybook.data?.summary.itemsWithSourceActions ?? null,
    readyItems: reports.autopilotHumanReviewPlaybook.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotHumanReviewPlaybook.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.autopilotHumanReviewPlaybook.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotHumanReviewPlaybook.data?.unsafeItems.slice(0, 8) ?? [],
  },
  autopilotReviewSprintBoard: {
    items: reports.autopilotReviewSprintBoard.data?.summary.items ?? null,
    itemsList: reports.autopilotReviewSprintBoard.data?.items.slice(0, 10) ?? [],
    itemsNeedingSearchQuery: reports.autopilotReviewSprintBoard.data?.summary.itemsNeedingSearchQuery ?? null,
    itemsWithCommandBoundary: reports.autopilotReviewSprintBoard.data?.summary.itemsWithCommandBoundary ?? null,
    queuedForPlaybook: reports.autopilotReviewSprintBoard.data?.summary.queuedForPlaybook ?? null,
    readyForSprint: reports.autopilotReviewSprintBoard.data?.summary.readyForSprint ?? null,
    readyWithPlaybook: reports.autopilotReviewSprintBoard.data?.summary.readyWithPlaybook ?? null,
    safeDraftItems: reports.autopilotReviewSprintBoard.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.autopilotReviewSprintBoard.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotReviewSprintBoard.data?.unsafeItems.slice(0, 8) ?? [],
    withSearchQueries: reports.autopilotReviewSprintBoard.data?.summary.withSearchQueries ?? null,
    withSourceTargets: reports.autopilotReviewSprintBoard.data?.summary.withSourceTargets ?? null,
  },
  reviewOptimizationBrief: {
    briefs: reports.reviewOptimizationBrief.data?.summary.briefs ?? null,
    briefsWithAction: reports.reviewOptimizationBrief.data?.summary.briefsWithAction ?? null,
    exactQueryWeakItems: reports.reviewOptimizationBrief.data?.summary.exactQueryWeakItems ?? null,
    missingPublicLinkItems: reports.reviewOptimizationBrief.data?.summary.missingPublicLinkItems ?? null,
    nextBriefs: reports.reviewOptimizationBrief.data?.nextBriefs.slice(0, 8) ?? [],
    readyBriefs: reports.reviewOptimizationBrief.data?.summary.readyBriefs ?? null,
    unsafeCommands: reports.reviewOptimizationBrief.data?.summary.unsafeCommands ?? null,
  },
  reviewCannibalizationBrief: {
    candidateFiles: reports.reviewCannibalizationBrief.data?.summary.candidateFiles ?? null,
    highRiskItems: reports.reviewCannibalizationBrief.data?.summary.highRiskItems ?? null,
    items: reports.reviewCannibalizationBrief.data?.summary.items ?? null,
    itemsWithPublishedComparison: reports.reviewCannibalizationBrief.data?.summary.itemsWithPublishedComparison ?? null,
    itemsWithReviewComparison: reports.reviewCannibalizationBrief.data?.summary.itemsWithReviewComparison ?? null,
    mediumRiskItems: reports.reviewCannibalizationBrief.data?.summary.mediumRiskItems ?? null,
    nextItems: reports.reviewCannibalizationBrief.data?.nextItems.slice(0, 8) ?? [],
    unsafeCommands: reports.reviewCannibalizationBrief.data?.summary.unsafeCommands ?? null,
  },
  reviewFreshnessBrief: {
    blockedItems: reports.reviewFreshnessBrief.data?.summary.blockedItems ?? null,
    highRiskItems: reports.reviewFreshnessBrief.data?.summary.highRiskItems ?? null,
    items: reports.reviewFreshnessBrief.data?.summary.items ?? null,
    itemsWithOfficialSources: reports.reviewFreshnessBrief.data?.summary.itemsWithOfficialSources ?? null,
    itemsWithReachableSources: reports.reviewFreshnessBrief.data?.summary.itemsWithReachableSources ?? null,
    readyItems: reports.reviewFreshnessBrief.data?.summary.readyItems ?? null,
    top: reports.reviewFreshnessBrief.data?.highRiskItems.slice(0, 8) ?? [],
    unsafeCommands: reports.reviewFreshnessBrief.data?.summary.unsafeCommands ?? null,
  },
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
  deploymentReviewPack: {
    deploymentPublicArticles: reports.deploymentReviewPack.data?.summary.deploymentPublicArticles ?? null,
    duplicateFiles: reports.deploymentReviewPack.data?.summary.duplicateFiles ?? null,
    items: reports.deploymentReviewPack.data?.summary.items ?? null,
    itemsWithCommandBoundary: reports.deploymentReviewPack.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithOfficialSources: reports.deploymentReviewPack.data?.summary.itemsWithOfficialSources ?? null,
    itemsWithSearchQueries: reports.deploymentReviewPack.data?.summary.itemsWithSearchQueries ?? null,
    safeDraftItems: reports.deploymentReviewPack.data?.summary.safeDraftItems ?? null,
    top: reports.deploymentReviewPack.data?.nextItems ?? [],
    topicsCovered: reports.deploymentReviewPack.data?.summary.topicsCovered ?? null,
    unsafeItems: reports.deploymentReviewPack.data?.summary.unsafeItems ?? null,
    uniqueFiles: reports.deploymentReviewPack.data?.summary.uniqueFiles ?? null,
  },
  broadSearchDemand: {
    maxGapScore: reports.broadSearchDemand.data?.summary.maxGapScore ?? null,
    missingSubtopics: reports.broadSearchDemand.data?.summary.missingSubtopics ?? null,
    plannedWaveThemeMatches: reports.broadSearchDemand.data?.summary.plannedWaveThemeMatches ?? null,
    reviewPackThemeMatches: reports.broadSearchDemand.data?.summary.reviewPackThemeMatches ?? null,
    themes: reports.broadSearchDemand.data?.summary.themes ?? null,
    themesWithReadyDrafts: reports.broadSearchDemand.data?.summary.themesWithReadyDrafts ?? null,
    themesWithoutPublicCoverage: reports.broadSearchDemand.data?.summary.themesWithoutPublicCoverage ?? null,
    top: reports.broadSearchDemand.data?.topThemes.slice(0, 8) ?? [],
    totalReadyDraftMatches: reports.broadSearchDemand.data?.summary.totalReadyDraftMatches ?? null,
    uniqueCandidateFiles: reports.broadSearchDemand.data?.summary.uniqueCandidateFiles ?? null,
  },
  publicCoverageGapPlan: {
    duplicateFiles: reports.publicCoverageGapPlan.data?.summary.duplicateFiles ?? null,
    gapThemes: reports.publicCoverageGapPlan.data?.summary.gapThemes ?? null,
    items: reports.publicCoverageGapPlan.data?.summary.items ?? null,
    plannedWaves: reports.publicCoverageGapPlan.data?.summary.plannedWaves ?? null,
    readyItems: reports.publicCoverageGapPlan.data?.summary.readyItems ?? null,
    top: reports.publicCoverageGapPlan.data?.items.slice(0, 8) ?? [],
    unsafeItems: reports.publicCoverageGapPlan.data?.summary.unsafeItems ?? null,
    uniqueFiles: reports.publicCoverageGapPlan.data?.summary.uniqueFiles ?? null,
    waves: reports.publicCoverageGapPlan.data?.waves.slice(0, 4) ?? [],
  },
  publicCoverageGapPreflight: {
    blockingItems: reports.publicCoverageGapPreflight.data?.summary.blockingItems ?? null,
    items: reports.publicCoverageGapPreflight.data?.summary.items ?? null,
    planItems: reports.publicCoverageGapPreflight.data?.summary.planItems ?? null,
    readyItems: reports.publicCoverageGapPreflight.data?.summary.readyItems ?? null,
    structuredDataReadyItems: reports.publicCoverageGapPreflight.data?.summary.structuredDataReadyItems ?? null,
    top: reports.publicCoverageGapPreflight.data?.items.slice(0, 8) ?? [],
    uniqueFiles: reports.publicCoverageGapPreflight.data?.summary.uniqueFiles ?? null,
    warningItems: reports.publicCoverageGapPreflight.data?.summary.warningItems ?? null,
    waveSummaries: reports.publicCoverageGapPreflight.data?.waveSummaries.slice(0, 4) ?? [],
    withPublicLinkSuggestions: reports.publicCoverageGapPreflight.data?.summary.withPublicLinkSuggestions ?? null,
    withSeedMatches: reports.publicCoverageGapPreflight.data?.summary.withSeedMatches ?? null,
  },
  publicCoverageGapDecisionPack: {
    blockingItems: reports.publicCoverageGapDecisionPack.data?.summary.blockingItems ?? null,
    items: reports.publicCoverageGapDecisionPack.data?.summary.items ?? null,
    itemsWithCommandBoundary: reports.publicCoverageGapDecisionPack.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithHumanChecklist: reports.publicCoverageGapDecisionPack.data?.summary.itemsWithHumanChecklist ?? null,
    itemsWithPublicLinkSuggestion: reports.publicCoverageGapDecisionPack.data?.summary.itemsWithPublicLinkSuggestion ?? null,
    itemsWithSourceTargets: reports.publicCoverageGapDecisionPack.data?.summary.itemsWithSourceTargets ?? null,
    itemsWithWarningRemediation: reports.publicCoverageGapDecisionPack.data?.summary.itemsWithWarningRemediation ?? null,
    optimizationActions: reports.publicCoverageGapDecisionPack.data?.summary.optimizationActions ?? null,
    readyItems: reports.publicCoverageGapDecisionPack.data?.summary.readyItems ?? null,
    reviewReadyWithOptimizations: reports.publicCoverageGapDecisionPack.data?.summary.reviewReadyWithOptimizations ?? null,
    top: reports.publicCoverageGapDecisionPack.data?.items.slice(0, 8) ?? [],
    unsafeItems: reports.publicCoverageGapDecisionPack.data?.summary.unsafeItems ?? null,
    waveSummaries: reports.publicCoverageGapDecisionPack.data?.waveSummaries.slice(0, 4) ?? [],
    waves: reports.publicCoverageGapDecisionPack.data?.summary.waves ?? null,
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
  searchQueryMatch: {
    averageExactMatches: reports.searchQueryMatch.data?.summary.averageExactMatches ?? null,
    averageMatchedFamilies: reports.searchQueryMatch.data?.summary.averageMatchedFamilies ?? null,
    blockingItems: reports.searchQueryMatch.data?.summary.blockingItems ?? null,
    items: reports.searchQueryMatch.data?.summary.items ?? null,
    readyItems: reports.searchQueryMatch.data?.summary.readyItems ?? null,
    top: reports.searchQueryMatch.data?.items.slice(0, 12) ?? [],
    warningItems: reports.searchQueryMatch.data?.summary.warningItems ?? null,
  },
  promptCoverage: {
    industries: reports.promptCoverage.data?.summary.industries ?? null,
    industriesWithReadyCandidates: reports.promptCoverage.data?.summary.industriesWithReadyCandidates ?? null,
    promptPublicArticles: reports.promptCoverage.data?.summary.promptPublicArticles ?? null,
    reviewReadyPromptDrafts: reports.promptCoverage.data?.summary.reviewReadyPromptDrafts ?? null,
    top: reports.promptCoverage.data?.coverage.slice(0, 6) ?? [],
    uniqueCandidateFiles: reports.promptCoverage.data?.summary.uniqueCandidateFiles ?? null,
  },
  promptReviewPack: {
    duplicateFiles: reports.promptReviewPack.data?.summary.duplicateFiles ?? null,
    industriesCovered: reports.promptReviewPack.data?.summary.industriesCovered ?? null,
    items: reports.promptReviewPack.data?.summary.items ?? null,
    itemsWithCommandBoundary: reports.promptReviewPack.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithOfficialSources: reports.promptReviewPack.data?.summary.itemsWithOfficialSources ?? null,
    itemsWithSearchQueries: reports.promptReviewPack.data?.summary.itemsWithSearchQueries ?? null,
    promptPublicArticles: reports.promptReviewPack.data?.summary.promptPublicArticles ?? null,
    safeDraftItems: reports.promptReviewPack.data?.summary.safeDraftItems ?? null,
    top: reports.promptReviewPack.data?.nextItems ?? [],
    unsafeItems: reports.promptReviewPack.data?.summary.unsafeItems ?? null,
    uniqueFiles: reports.promptReviewPack.data?.summary.uniqueFiles ?? null,
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
  if (!reports.sourceHealth.data || reports.sourceHealth.data.summary.filesWithoutReachableSource > 0 || reports.sourceHealth.data.summary.missingUrlTargets > 0) {
    return ["Open docs/source-target-health-audit.md and replace missing or unreachable official source targets before manual review."];
  }
  if (!reports.reviewActionBoard.data || reports.reviewActionBoard.data.summary.unsafeTasks > 0) {
    return ["Open docs/review-action-board.md and resolve unsafe review tasks before any mark:review command."];
  }
  if (!reports.reviewPortfolioBoard.data || reports.reviewPortfolioBoard.data.summary.unsafeItems > 0) {
    return ["Open docs/review-portfolio-board.md and resolve unsafe deduplicated review candidates before any mark:review command."];
  }
  if (!reports.autopilotReviewQueue.data || reports.autopilotReviewQueue.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-review-queue.md and resolve unsafe review assignments before any mark:review command."];
  }
  if (!reports.autopilotApprovalPacket.data || reports.autopilotApprovalPacket.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-approval-packet.md and resolve unsafe approval packet items before any mark:review command."];
  }
  if (!reports.autopilotSearchIntentBrief.data || reports.autopilotSearchIntentBrief.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-search-intent-brief.md and resolve unsafe search-intent packet items before any mark:review command."];
  }
  if (!reports.autopilotInternalLinkBrief.data || reports.autopilotInternalLinkBrief.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-internal-link-brief.md and resolve unsafe internal-link packet items before any mark:review command."];
  }
  if (!reports.autopilotSourceVerificationBrief.data || reports.autopilotSourceVerificationBrief.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-source-verification-brief.md and resolve unsafe source-verification packet items before any mark:review command."];
  }
  if (!reports.autopilotHumanReviewPlaybook.data || reports.autopilotHumanReviewPlaybook.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-human-review-playbook.md and resolve unsafe human-review playbook items before any mark:review command."];
  }
  if (!reports.autopilotReviewSprintBoard.data || reports.autopilotReviewSprintBoard.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-review-sprint-board.md and resolve unsafe sprint items before assigning manual review work."];
  }
  if (!reports.reviewOptimizationBrief.data || reports.reviewOptimizationBrief.data.summary.unsafeCommands > 0) {
    return ["Open docs/review-optimization-brief.md and resolve unsafe or missing copydesk guidance before manual review."];
  }
  if (!reports.reviewCannibalizationBrief.data || reports.reviewCannibalizationBrief.data.summary.highRiskItems > 0) {
    return ["Open docs/review-cannibalization-brief.md and differentiate high-risk candidate overlaps before manual review."];
  }
  if (!reports.reviewFreshnessBrief.data || reports.reviewFreshnessBrief.data.summary.blockedItems > 0) {
    return ["Open docs/review-freshness-brief.md and complete source-backed freshness checks before manual review."];
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
  if (!reports.searchQueryMatch.data || reports.searchQueryMatch.data.summary.blockingItems > 0) {
    return ["Open docs/search-query-match-audit.md and resolve blocking query-match issues before manual review."];
  }
  if (!reports.deploymentReviewPack.data || reports.deploymentReviewPack.data.summary.unsafeItems > 0 || reports.deploymentReviewPack.data.summary.duplicateFiles > 0) {
    return ["Open docs/ai-deployment-review-pack.md and resolve deployment review pack safety or duplicate-file issues before manual review."];
  }
  if (!reports.promptReviewPack.data || reports.promptReviewPack.data.summary.unsafeItems > 0 || reports.promptReviewPack.data.summary.duplicateFiles > 0) {
    return ["Open docs/industry-prompt-review-pack.md and resolve prompt review pack safety or duplicate-file issues before manual review."];
  }
  if (!reports.broadSearchDemand.data || reports.broadSearchDemand.data.summary.themesWithReadyDrafts !== reports.broadSearchDemand.data.summary.themes) {
    return ["Open docs/broad-search-demand-map.md and ensure every broad demand theme has ready draft candidates."];
  }
  if (!reports.publicCoverageGapPlan.data || reports.publicCoverageGapPlan.data.summary.unsafeItems > 0) {
    return ["Open docs/public-coverage-gap-plan.md and resolve public coverage gap plan safety issues before manual review."];
  }
  if (!reports.publicCoverageGapPreflight.data || reports.publicCoverageGapPreflight.data.summary.blockingItems > 0) {
    return ["Open docs/public-coverage-gap-preflight.md and resolve public coverage gap preflight blockers before manual review."];
  }
  if (!reports.publicCoverageGapDecisionPack.data || reports.publicCoverageGapDecisionPack.data.summary.blockingItems > 0) {
    return ["Open docs/public-coverage-gap-decision-pack.md and resolve public coverage gap decision blockers before manual review."];
  }
  if (!reports.reviewCoverage.data || reports.reviewCoverage.data.summary.missingCoverage > 0) {
    return ["Open docs/review-coverage-report.md and regenerate coverage for all planned review candidates."];
  }
  return [
    "Manually review the three recommended drafts in docs/review-preflight.md.",
    "Use docs/wave-approval-packet.md as the focused Wave 1 approval packet.",
    "Use docs/wave-publish-simulation.md to see the exact post-approval mark-review and publish dry-run path.",
    "Use docs/public-expansion-queue.md as the approval-wave order for expanding public coverage.",
    "Use docs/public-coverage-gap-decision-pack.md to review the 8 broad-demand public gap candidates and their optimization actions.",
    "Use docs/ai-deployment-review-pack.md to review the 10 deployment, Agent, RAG, memory, API, and infrastructure candidates.",
    "Use docs/industry-prompt-review-pack.md to review the 12 deduplicated high-demand industry prompt candidates.",
    "Use docs/next-review-source-pack.md to fact-check official sources for the roadmap's next review files.",
    "Use docs/source-target-health-audit.md to confirm official source links are reachable before approving fast-changing AI guidance.",
    "Use docs/review-action-board.md as the prioritized task board for Wave 1 and public-gap manual review.",
    "Use docs/review-portfolio-board.md to deduplicate Wave, public-gap, deployment, and prompt review candidates before assigning manual review.",
    "Use docs/autopilot-review-queue.md as the ordered next-10 manual review assignment queue.",
    "Use docs/autopilot-approval-packet.md as the top-3 packet for human approval.",
    "Use docs/autopilot-search-intent-brief.md to tune top-3 search-intent wording during human review.",
    "Use docs/autopilot-internal-link-brief.md to add one contextual public internal link during human review.",
    "Use docs/autopilot-source-verification-brief.md to verify top-3 official sources and fast-changing claims during human review.",
    "Use docs/autopilot-human-review-playbook.md as the merged top-3 checklist before any mark:review command.",
    "Use docs/autopilot-review-sprint-board.md as the next-10 manual review sprint order.",
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
    "## Source Target Health",
    "",
    `- Files covered: ${data.sourceHealth.filesCovered}`,
    `- Files with reachable source: ${data.sourceHealth.filesWithReachableSource}`,
    `- Files without reachable source: ${data.sourceHealth.filesWithoutReachableSource}`,
    `- Current review files: ${data.sourceHealth.currentReviewFiles}`,
    `- Public gap decision files: ${data.sourceHealth.publicGapDecisionFiles}`,
    `- Next source-pack files: ${data.sourceHealth.nextSourcePackFiles}`,
    `- Source references: ${data.sourceHealth.sourceReferences}`,
    `- Unique URLs: ${data.sourceHealth.uniqueUrls}`,
    `- Checked URLs: ${data.sourceHealth.checkedUrls}`,
    `- OK URLs: ${data.sourceHealth.okUrls}`,
    `- Failed URLs: ${data.sourceHealth.failedUrls}`,
    `- Missing URL targets: ${data.sourceHealth.missingUrlTargets}`,
    `- Redirected URLs: ${data.sourceHealth.redirectedUrls}`,
    "",
    "Failed checks:",
    "",
    ...(data.sourceHealth.failedChecks.length
      ? data.sourceHealth.failedChecks.map((item) => `- ${item.url} (${item.status || item.error || "unknown"})`)
      : ["- none"]),
    "",
    "Redirect samples:",
    "",
    ...(data.sourceHealth.redirectedChecks.length
      ? data.sourceHealth.redirectedChecks.map((item) => `- ${item.url} -> ${item.finalUrl || ""}`)
      : ["- none"]),
    "",
    "## Review Action Board",
    "",
    `- Tasks: ${data.reviewActionBoard.tasks}`,
    `- Ready tasks: ${data.reviewActionBoard.readyTasks}`,
    `- Unsafe tasks: ${data.reviewActionBoard.unsafeTasks}`,
    `- Wave tasks: ${data.reviewActionBoard.waveReadyTasks}/${data.reviewActionBoard.waveTasks}`,
    `- Public gap tasks: ${data.reviewActionBoard.publicGapReadyTasks}/${data.reviewActionBoard.publicGapTasks}`,
    "",
    "Unsafe tasks:",
    "",
    ...(data.reviewActionBoard.unsafeTaskList.length ? data.reviewActionBoard.unsafeTaskList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Priority | Kind | Scope | Sources | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.reviewActionBoard.nextTasks.map(
      (item) => `| ${item.ready} | ${item.priority} | ${item.kind} | ${item.scope} | ${item.sourceTargets} | ${item.warnings.length} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Review Portfolio Board",
    "",
    `- Source candidates: ${data.reviewPortfolioBoard.sourceCandidates}`,
    `- Unique items: ${data.reviewPortfolioBoard.items}`,
    `- Duplicate mentions: ${data.reviewPortfolioBoard.duplicateMentions}`,
    `- Multi-source items: ${data.reviewPortfolioBoard.itemsWithMultipleSources}`,
    `- Ready items: ${data.reviewPortfolioBoard.readyItems}`,
    `- Safe draft items: ${data.reviewPortfolioBoard.safeDraftItems}`,
    `- Unsafe items: ${data.reviewPortfolioBoard.unsafeItems}`,
    `- Source counts: ${data.reviewPortfolioBoard.sourceCounts ? JSON.stringify(data.reviewPortfolioBoard.sourceCounts) : "missing"}`,
    "",
    "Multi-source items:",
    "",
    "| Ready | Safe | Score | Sources | Official refs | Queries | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.reviewPortfolioBoard.multiSourceItems.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.priorityScore} | ${item.sourceTypes.join(", ")} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.title} | ${item.file} |`,
    ),
    "",
    "Next unique review items:",
    "",
    "| Ready | Safe | Score | Sources | Official refs | Queries | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.reviewPortfolioBoard.nextItems.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.priorityScore} | ${item.sourceTypes.join(", ")} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Review Queue",
    "",
    `- Items: ${data.autopilotReviewQueue.items}`,
    `- Ready items: ${data.autopilotReviewQueue.readyItems}`,
    `- Safe draft items: ${data.autopilotReviewQueue.safeDraftItems}`,
    `- Next assignments: ${data.autopilotReviewQueue.nextAssignments}`,
    `- With source targets: ${data.autopilotReviewQueue.withSourceTargets}`,
    `- With search queries: ${data.autopilotReviewQueue.withSearchQueries}`,
    `- Unsafe items: ${data.autopilotReviewQueue.unsafeItems}`,
    "",
    "Unsafe assignment items:",
    "",
    ...(data.autopilotReviewQueue.unsafeItemList.length ? data.autopilotReviewQueue.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Score | Lane | Sources | Refs | Queries | Blockers | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotReviewQueue.nextAssignmentItems.map(
      (item) =>
        `| ${item.readyForAssignment} | ${item.autopilotScore} | ${item.assignmentLane} | ${item.sourceTypes.join(", ")} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.blockers.length} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Approval Packet",
    "",
    `- Items: ${data.autopilotApprovalPacket.items}`,
    `- Ready for human approval: ${data.autopilotApprovalPacket.readyForHumanApproval}`,
    `- With source targets: ${data.autopilotApprovalPacket.withSourceTargets}`,
    `- With search queries: ${data.autopilotApprovalPacket.withSearchQueries}`,
    `- With headings: ${data.autopilotApprovalPacket.withHeadings}`,
    `- Queue unsafe items: ${data.autopilotApprovalPacket.queueUnsafeItems}`,
    `- Unsafe items: ${data.autopilotApprovalPacket.unsafeItems}`,
    "",
    "Unsafe packet items:",
    "",
    ...(data.autopilotApprovalPacket.unsafeItemList.length ? data.autopilotApprovalPacket.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Score | Lane | Status | noindex | Sources | Queries | Headings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotApprovalPacket.packetItems.map(
      (item) =>
        `| ${item.readyForHumanApproval} | ${item.autopilotScore} | ${item.assignmentLane} | ${item.articleMeta.status} | ${item.articleMeta.noindex} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.headings.length} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Search Intent Brief",
    "",
    `- Items: ${data.autopilotSearchIntentBrief.items}`,
    `- Title covered items: ${data.autopilotSearchIntentBrief.titleCoveredItems}`,
    `- Description covered items: ${data.autopilotSearchIntentBrief.descriptionCoveredItems}`,
    `- Heading covered items: ${data.autopilotSearchIntentBrief.headingCoveredItems}`,
    `- Body covered items: ${data.autopilotSearchIntentBrief.bodyCoveredItems}`,
    `- Search weak items: ${data.autopilotSearchIntentBrief.searchWeakItems}`,
    `- Packet unsafe items: ${data.autopilotSearchIntentBrief.packetUnsafeItems}`,
    `- Unsafe items: ${data.autopilotSearchIntentBrief.unsafeItems}`,
    "",
    "Unsafe search-intent items:",
    "",
    ...(data.autopilotSearchIntentBrief.unsafeItemList.length ? data.autopilotSearchIntentBrief.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Title hits | Description hits | Heading hits | Body hits | Token hits | Weaknesses | Primary query | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotSearchIntentBrief.itemsList.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.titleQueryHits.length} | ${item.descriptionQueryHits.length} | ${item.headingQueryHits.length} | ${item.bodyQueryHits.length} | ${item.queryTokenHits} | ${item.searchWeaknesses.length} | ${item.primaryQuery} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Internal Link Brief",
    "",
    `- Items: ${data.autopilotInternalLinkBrief.items}`,
    `- Public articles: ${data.autopilotInternalLinkBrief.publicArticles}`,
    `- Items with suggestions: ${data.autopilotInternalLinkBrief.itemsWithSuggestions}`,
    `- Already linked to public: ${data.autopilotInternalLinkBrief.itemsAlreadyLinkedToPublic}`,
    `- Missing current public link: ${data.autopilotInternalLinkBrief.itemsMissingCurrentPublicLink}`,
    `- Packet unsafe items: ${data.autopilotInternalLinkBrief.packetUnsafeItems}`,
    `- Unsafe items: ${data.autopilotInternalLinkBrief.unsafeItems}`,
    "",
    "Unsafe internal-link items:",
    "",
    ...(data.autopilotInternalLinkBrief.unsafeItemList.length ? data.autopilotInternalLinkBrief.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Safe | Current links | Public links | Suggestions | First suggestion | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotInternalLinkBrief.itemsList.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.currentInternalLinks} | ${item.linksToPublicArticles} | ${item.suggestions.length} | ${item.suggestions[0]?.url || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Source Verification Brief",
    "",
    `- Items: ${data.autopilotSourceVerificationBrief.items}`,
    `- Items with reachable sources: ${data.autopilotSourceVerificationBrief.itemsWithReachableSources}`,
    `- Items with official sources: ${data.autopilotSourceVerificationBrief.itemsWithOfficialSources}`,
    `- Items with fact-check queries: ${data.autopilotSourceVerificationBrief.itemsWithFactCheckQueries}`,
    `- Items with approval checklist: ${data.autopilotSourceVerificationBrief.itemsWithApprovalChecklist}`,
    `- Total reachable sources: ${data.autopilotSourceVerificationBrief.totalReachableSources}`,
    `- Packet unsafe items: ${data.autopilotSourceVerificationBrief.packetUnsafeItems}`,
    `- Unsafe items: ${data.autopilotSourceVerificationBrief.unsafeItems}`,
    "",
    "Unsafe source-verification items:",
    "",
    ...(data.autopilotSourceVerificationBrief.unsafeItemList.length ? data.autopilotSourceVerificationBrief.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Safe | Reachable sources | Official sources | Fact checks | Approval checks | Risk checks | First reachable URL | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotSourceVerificationBrief.itemsList.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.reachableSources} | ${item.officialSourceTargets.length} | ${item.factCheckQueries.length} | ${item.approvalChecklist.length} | ${item.riskReviewChecklist.length} | ${item.uniqueReachableUrls[0] || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Human Review Playbook",
    "",
    `- Items: ${data.autopilotHumanReviewPlaybook.items}`,
    `- Ready items: ${data.autopilotHumanReviewPlaybook.readyItems}`,
    `- Safe draft items: ${data.autopilotHumanReviewPlaybook.safeDraftItems}`,
    `- Items with command boundary: ${data.autopilotHumanReviewPlaybook.itemsWithCommandBoundary}`,
    `- Items with search actions: ${data.autopilotHumanReviewPlaybook.itemsWithSearchActions}`,
    `- Items with source actions: ${data.autopilotHumanReviewPlaybook.itemsWithSourceActions}`,
    `- Items with internal-link actions: ${data.autopilotHumanReviewPlaybook.itemsWithInternalLinkActions}`,
    `- Unsafe items: ${data.autopilotHumanReviewPlaybook.unsafeItems}`,
    "",
    "Unsafe human-review playbook items:",
    "",
    ...(data.autopilotHumanReviewPlaybook.unsafeItemList.length ? data.autopilotHumanReviewPlaybook.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Safe | Search actions | Source actions | Link actions | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotHumanReviewPlaybook.itemsList.map(
      (item) =>
        `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.searchActions.length} | ${item.sourceActions.length} | ${item.internalLinkActions.length} | ${item.manualOnlyCommands.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.manualOnlyCommands.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Review Sprint Board",
    "",
    `- Items: ${data.autopilotReviewSprintBoard.items}`,
    `- Ready for sprint: ${data.autopilotReviewSprintBoard.readyForSprint}`,
    `- Safe draft items: ${data.autopilotReviewSprintBoard.safeDraftItems}`,
    `- Ready with playbook: ${data.autopilotReviewSprintBoard.readyWithPlaybook}`,
    `- Queued for playbook: ${data.autopilotReviewSprintBoard.queuedForPlaybook}`,
    `- Items needing search query: ${data.autopilotReviewSprintBoard.itemsNeedingSearchQuery}`,
    `- Items with command boundary: ${data.autopilotReviewSprintBoard.itemsWithCommandBoundary}`,
    `- With search queries: ${data.autopilotReviewSprintBoard.withSearchQueries}`,
    `- With source targets: ${data.autopilotReviewSprintBoard.withSourceTargets}`,
    `- Unsafe items: ${data.autopilotReviewSprintBoard.unsafeItems}`,
    "",
    "Unsafe sprint items:",
    "",
    ...(data.autopilotReviewSprintBoard.unsafeItemList.length ? data.autopilotReviewSprintBoard.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Order | Ready | Stage | Lane | Sources | Queries | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotReviewSprintBoard.itemsList.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.readyForSprint} | ${item.playbookStage} | ${item.lane} | ${item.sourceTargets} | ${item.searchQueries} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Review Optimization Brief",
    "",
    `- Briefs: ${data.reviewOptimizationBrief.briefs}`,
    `- Ready briefs: ${data.reviewOptimizationBrief.readyBriefs}`,
    `- Briefs with action: ${data.reviewOptimizationBrief.briefsWithAction}`,
    `- Exact-query weak items: ${data.reviewOptimizationBrief.exactQueryWeakItems}`,
    `- Missing public-link items: ${data.reviewOptimizationBrief.missingPublicLinkItems}`,
    `- Unsafe commands: ${data.reviewOptimizationBrief.unsafeCommands}`,
    "",
    "| Priority | Scope | Exact queries | Link | Proposed title | File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...data.reviewOptimizationBrief.nextBriefs.map(
      (item) =>
        `| ${item.priority} | ${item.scope} | ${item.searchEvidence.exactQueryMatches ?? "n/a"} | ${item.internalLink ? item.internalLink.url : "none"} | ${item.proposedTitle} | ${item.file} |`,
    ),
    "",
    "## Review Cannibalization Brief",
    "",
    `- Items: ${data.reviewCannibalizationBrief.items}`,
    `- Candidate files: ${data.reviewCannibalizationBrief.candidateFiles}`,
    `- High-risk items: ${data.reviewCannibalizationBrief.highRiskItems}`,
    `- Medium-risk items: ${data.reviewCannibalizationBrief.mediumRiskItems}`,
    `- With published comparison: ${data.reviewCannibalizationBrief.itemsWithPublishedComparison}`,
    `- With review comparison: ${data.reviewCannibalizationBrief.itemsWithReviewComparison}`,
    `- Unsafe commands: ${data.reviewCannibalizationBrief.unsafeCommands}`,
    "",
    "| Risk | Published score | Review score | Decision | Recommendation | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...data.reviewCannibalizationBrief.nextItems.map(
      (item) =>
        `| ${item.riskLevel} | ${item.highestPublishedScore} | ${item.highestReviewScore} | ${item.decision} | ${item.recommendation} | ${item.candidate.title} | ${item.candidate.file} |`,
    ),
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
    "## AI Deployment Review Pack",
    "",
    `- Items: ${data.deploymentReviewPack.items}`,
    `- Topics covered: ${data.deploymentReviewPack.topicsCovered}`,
    `- Unique files: ${data.deploymentReviewPack.uniqueFiles}`,
    `- Duplicate files: ${data.deploymentReviewPack.duplicateFiles}`,
    `- Safe draft items: ${data.deploymentReviewPack.safeDraftItems}`,
    `- Unsafe items: ${data.deploymentReviewPack.unsafeItems}`,
    `- With official sources: ${data.deploymentReviewPack.itemsWithOfficialSources}`,
    `- With search queries: ${data.deploymentReviewPack.itemsWithSearchQueries}`,
    `- With command boundary: ${data.deploymentReviewPack.itemsWithCommandBoundary}`,
    `- Public deployment articles: ${data.deploymentReviewPack.deploymentPublicArticles}`,
    "",
    "| Ready | Safe | Score | Public | Sources | Queries | Topic | Category | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.deploymentReviewPack.top.map((item) => (
      `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.priorityScore} | ${item.publicMatches} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.topic} | ${item.category} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Broad Search Demand Map",
    "",
    `- Themes: ${data.broadSearchDemand.themes}`,
    `- Themes with ready drafts: ${data.broadSearchDemand.themesWithReadyDrafts}`,
    `- Themes without public coverage: ${data.broadSearchDemand.themesWithoutPublicCoverage}`,
    `- Unique candidate files: ${data.broadSearchDemand.uniqueCandidateFiles}`,
    `- Total ready draft matches: ${data.broadSearchDemand.totalReadyDraftMatches}`,
    `- Review pack theme matches: ${data.broadSearchDemand.reviewPackThemeMatches}`,
    `- Planned wave theme matches: ${data.broadSearchDemand.plannedWaveThemeMatches}`,
    `- Missing subtopics: ${data.broadSearchDemand.missingSubtopics}`,
    "",
    "| Theme | Score | Public | Ready | Review pack | Planned wave | Missing subtopics | Search seeds |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.broadSearchDemand.top.map((item) => (
      `| ${item.title} | ${item.gapScore} | ${item.publicMatches} | ${item.readyDrafts} | ${item.reviewPackMatches} | ${item.plannedWaveMatches} | ${item.missingSubtopics.join(", ") || "none"} | ${item.searchSeeds.slice(0, 2).join("<br>")} |`
    )),
    "",
    "## Public Coverage Gap Plan",
    "",
    `- Gap themes: ${data.publicCoverageGapPlan.gapThemes}`,
    `- Items: ${data.publicCoverageGapPlan.items}`,
    `- Ready items: ${data.publicCoverageGapPlan.readyItems}`,
    `- Unsafe items: ${data.publicCoverageGapPlan.unsafeItems}`,
    `- Unique files: ${data.publicCoverageGapPlan.uniqueFiles}`,
    `- Duplicate files: ${data.publicCoverageGapPlan.duplicateFiles}`,
    `- Planned waves: ${data.publicCoverageGapPlan.plannedWaves}`,
    "",
    "| Wave | Ready | Focus | Files |",
    "| --- | --- | --- | --- |",
    ...data.publicCoverageGapPlan.waves.map((item) => `| ${item.wave} | ${item.readyItems}/${item.files.length} | ${item.focus} | ${item.files.join("<br>")} |`),
    "",
    "| Score | Ready | Theme | Missing subtopics | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...data.publicCoverageGapPlan.top.map((item) => (
      `| ${item.gapScore} | ${item.readyForManualReview} | ${item.themeTitle} | ${item.missingSubtopics.join(", ") || "none"} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Public Coverage Gap Preflight",
    "",
    `- Items: ${data.publicCoverageGapPreflight.items}`,
    `- Ready items: ${data.publicCoverageGapPreflight.readyItems}`,
    `- Blocking items: ${data.publicCoverageGapPreflight.blockingItems}`,
    `- Warning items: ${data.publicCoverageGapPreflight.warningItems}`,
    `- Structured data ready items: ${data.publicCoverageGapPreflight.structuredDataReadyItems}`,
    `- With public link suggestions: ${data.publicCoverageGapPreflight.withPublicLinkSuggestions}`,
    `- With search seed matches: ${data.publicCoverageGapPreflight.withSeedMatches}`,
    "",
    "| Wave | Ready | Blocking | Warning | Themes | Files |",
    "| --- | --- | --- | --- | --- | --- |",
    ...data.publicCoverageGapPreflight.waveSummaries.map(
      (item) => `| ${item.wave} | ${item.readyItems}/${item.files.length} | ${item.blockingItems} | ${item.warningItems} | ${item.themes.join("<br>")} | ${item.files.join("<br>")} |`,
    ),
    "",
    "| Wave | Ready | Structured | Links | Seeds | Warnings | Theme | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.publicCoverageGapPreflight.top.map(
      (item) =>
        `| ${item.approvalWave} | ${item.readyForManualReview} | ${item.structuredDataReady} | ${item.linksToPublicArticles}+${item.publicLinkSuggestions.length} | ${item.exactSeedMatches}/${item.seedFamilyMatches} | ${item.warningIssues.length} | ${item.themeTitle} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Public Coverage Gap Decision Pack",
    "",
    `- Items: ${data.publicCoverageGapDecisionPack.items}`,
    `- Ready items: ${data.publicCoverageGapDecisionPack.readyItems}`,
    `- Review ready with optimizations: ${data.publicCoverageGapDecisionPack.reviewReadyWithOptimizations}`,
    `- Blocking items: ${data.publicCoverageGapDecisionPack.blockingItems}`,
    `- Unsafe items: ${data.publicCoverageGapDecisionPack.unsafeItems}`,
    `- Optimization actions: ${data.publicCoverageGapDecisionPack.optimizationActions}`,
    `- With source targets: ${data.publicCoverageGapDecisionPack.itemsWithSourceTargets}`,
    `- With public link suggestions: ${data.publicCoverageGapDecisionPack.itemsWithPublicLinkSuggestion}`,
    `- With warning remediation: ${data.publicCoverageGapDecisionPack.itemsWithWarningRemediation}`,
    `- With command boundary: ${data.publicCoverageGapDecisionPack.itemsWithCommandBoundary}`,
    "",
    "| Wave | Ready | Blocking | Optimization actions | Themes | Files |",
    "| --- | --- | --- | --- | --- | --- |",
    ...data.publicCoverageGapDecisionPack.waveSummaries.map(
      (item) => `| ${item.wave} | ${item.readyItems}/${item.files.length} | ${item.blockingItems} | ${item.optimizationActions} | ${item.themes.join("<br>")} | ${item.files.join("<br>")} |`,
    ),
    "",
    "| Wave | Decision | Risk | Sources | Warnings | Actions | Link suggestion | Theme | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.publicCoverageGapDecisionPack.top.map(
      (item) =>
        `| ${item.approvalWave} | ${item.decision} | ${item.riskLevel} | ${item.reviewPacket.sourceTargets.length} | ${item.reviewPacket.warningIssues.length} | ${item.suggestedOptimizations.length} | ${item.publicLinkSuggestion ? item.publicLinkSuggestion.url : "missing"} | ${item.themeTitle} | ${item.title} | ${item.file} |`,
    ),
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
    "## Search Query Match Audit",
    "",
    `- Items: ${data.searchQueryMatch.items}`,
    `- Ready items: ${data.searchQueryMatch.readyItems}`,
    `- Blocking items: ${data.searchQueryMatch.blockingItems}`,
    `- Warning items: ${data.searchQueryMatch.warningItems}`,
    `- Average exact matches: ${data.searchQueryMatch.averageExactMatches}`,
    `- Average matched families: ${data.searchQueryMatch.averageMatchedFamilies}`,
    "",
    "| Wave | Ready | Title hit | Description hit | Exact queries | Families | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.searchQueryMatch.top.map((item) => (
      `| ${item.wave} | ${item.readyForManualReview} | ${item.titleHit} | ${item.descriptionHit} | ${item.exactQueryMatches} | ${item.matchedFamilies} | ${item.warningIssues.length ? item.warningIssues.join("<br>") : "none"} | ${item.title} | ${item.file} |`
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
    "## Industry Prompt Review Pack",
    "",
    `- Items: ${data.promptReviewPack.items}`,
    `- Industries covered: ${data.promptReviewPack.industriesCovered}`,
    `- Unique files: ${data.promptReviewPack.uniqueFiles}`,
    `- Duplicate files: ${data.promptReviewPack.duplicateFiles}`,
    `- Safe draft items: ${data.promptReviewPack.safeDraftItems}`,
    `- Unsafe items: ${data.promptReviewPack.unsafeItems}`,
    `- With official sources: ${data.promptReviewPack.itemsWithOfficialSources}`,
    `- With search queries: ${data.promptReviewPack.itemsWithSearchQueries}`,
    `- With command boundary: ${data.promptReviewPack.itemsWithCommandBoundary}`,
    `- Public prompt articles: ${data.promptReviewPack.promptPublicArticles}`,
    "",
    "| Ready | Safe | Score | Public | Sources | Queries | Industry | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.promptReviewPack.top.map((item) => (
      `| ${item.readyForHumanReview} | ${item.safeDraft} | ${item.priorityScore} | ${item.publicMatches} | ${item.sourceTargets.length} | ${item.searchQueries.length} | ${item.industry} | ${item.title} | ${item.file} |`
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
    "## Review Freshness Brief",
    "",
    `- Items: ${data.reviewFreshnessBrief.items}`,
    `- Ready items: ${data.reviewFreshnessBrief.readyItems}`,
    `- Blocked items: ${data.reviewFreshnessBrief.blockedItems}`,
    `- High-risk items: ${data.reviewFreshnessBrief.highRiskItems}`,
    `- With official sources: ${data.reviewFreshnessBrief.itemsWithOfficialSources}`,
    `- With reachable sources: ${data.reviewFreshnessBrief.itemsWithReachableSources}`,
    `- Unsafe commands: ${data.reviewFreshnessBrief.unsafeCommands}`,
    "",
    "| Ready | Risk | Updated | Sources | Checks | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...data.reviewFreshnessBrief.top.map(
      (item) =>
        `| ${item.readyForFreshnessReview} | ${item.freshnessRisk} | ${item.articleUpdatedAt} | ${item.reachableSources}/${item.sourceTargets} | ${item.staleSensitiveChecks.length} | ${item.title} | ${item.file} |`,
    ),
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

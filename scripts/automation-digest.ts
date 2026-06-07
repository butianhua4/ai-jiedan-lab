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

type IndustryPromptOpportunityBoard = {
  items: Array<{
    deliverable: string;
    existingReviewCandidates: unknown[];
    lane: string;
    primaryQuery: string;
    priorityScore: number;
    publicMatches: number;
    searchQueryFamilies: number;
  }>;
  summary: {
    departmentLanes: number;
    itemsWithHumanBoundary: number;
    itemsWithInputOutputStructure: number;
    itemsWithReviewPackCandidate: number;
    itemsWithSourceTargets: number;
    opportunities: number;
    promptModules: number;
    searchQueryFamilies: number;
    unsafeItems: number;
    zeroPublicCoverageItems: number;
  };
  topOpportunities: Array<{
    deliverable: string;
    existingReviewCandidates: unknown[];
    lane: string;
    primaryQuery: string;
    priorityScore: number;
    publicMatches: number;
    searchQueryFamilies: number;
  }>;
};

type IndustryPromptModulePack = {
  summary: {
    humanGatedItems: number;
    items: number;
    itemsWithCopyPrompts: number;
    itemsWithInputOutputStructure: number;
    itemsWithReviewPackCandidate: number;
    itemsWithRiskControls: number;
    itemsWithSourceTargets: number;
    modulesPerOpportunityMin: number;
    promptBlueprints: number;
    unsafeItems: number;
    zeroPublicCoverageItems: number;
  };
  topItems: Array<{
    lane: string;
    primaryQuery: string;
    priorityScore: number;
    promptBlueprints: unknown[];
    publicMatches: number;
    readyForHumanReviewPrep: boolean;
    reviewCandidateFiles: string[];
    safeReviewPackBridge: boolean;
  }>;
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

type DeploymentSprintBoard = {
  items: Array<{
    actionCount: number;
    deploymentLane: string;
    file: string;
    implementationMode: string;
    priorityScore: number;
    publicMatches: number;
    publishConfirm: string;
    readyForDeploymentSprint: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    sprintWave: number;
    title: string;
    topic: string;
    unsafeReasons: string[];
  }>;
  summary: {
    actionItems: number;
    agentItems: number;
    apiIntegrationItems: number;
    automationPlatformItems: number;
    deploymentPublicArticles: number;
    highPriorityItems: number;
    implementationModes: number;
    items: number;
    itemsPerWave: number;
    lanes: number;
    localModelItems: number;
    memoryItems: number;
    modelServingItems: number;
    publishConfirmCommandsIncluded: number;
    readyForDeploymentSprint: number;
    reviewPackItems: number;
    searchQueries: number;
    sourceTargets: number;
    topicsWithoutPublicCoverage: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    waves: number;
  };
  waves: Array<{
    actionItems: number;
    deploymentLanes: string[];
    files: string[];
    highPriorityItems: number;
    implementationModes: string[];
    items: number;
    readyItems: number;
    searchQueries: string[];
    sourceTargets: string[];
    unsafeItems: number;
    wave: number;
  }>;
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

type PublicSurfaceInventory = {
  broadCoverage: Array<{
    cluster: string;
    gapScore: number;
    publicMatches: number;
    readyCandidates: number;
    searchQueries: string[];
    suggestedFiles: string[];
  }>;
  publicCategoryCounts: Record<string, number>;
  publicItems: Array<{
    category: string;
    descriptionLength: number;
    file: string;
    slug: string;
    tags: string[];
    title: string;
    updatedAt: string;
  }>;
  publicTagCounts: Record<string, number>;
  summary: {
    broadClusters: number;
    broadClustersWithoutPublicCoverage: number;
    liveMissingFromSitemap: number | null;
    livePublicCount: number | null;
    liveSitemapUrls: number | null;
    projectPublicPublished: number;
    publicArticles: number;
    publicCategories: number;
    publicTags: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  uncoveredBroadClusters: Array<{
    cluster: string;
    gapScore: number;
    publicMatches: number;
    readyCandidates: number;
    searchQueries: string[];
    suggestedFiles: string[];
  }>;
};

type PublicSearchRefreshPack = {
  summary: {
    actionItems: number;
    cannibalizationItems: number;
    highPriorityItems: number;
    items: number;
    itemsReadyForHumanRefreshReview: number;
    liveMissingFromSitemap: number | null;
    measuredTrafficSources: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    publishedButNoindexed: number;
    seoWarningItems: number;
    shortDescriptionItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
  topItems: Array<{
    actionCount: number;
    cannibalizationConflicts: unknown[];
    category: string;
    commandBoundary: { editAfterHumanApproval: string; markReview: string; publishConfirm: string };
    descriptionLength: number;
    file: string;
    freshnessRisk: { riskLevel?: string } | null;
    priorityScore: number;
    readyForHumanRefreshReview: boolean;
    seoWarning: unknown | null;
    title: string;
    trafficClaim: string;
    unsafeReasons: unknown[];
  }>;
};

type PublicRefreshSprintBoard = {
  items: Array<{
    actionCount: number;
    category: string;
    descriptionLength: number;
    file: string;
    priorityScore: number;
    publishConfirm: string;
    readyForPublicRefreshSprint: boolean;
    refreshReasons: string[];
    sprintWave: number;
    title: string;
    unsafeReasons: string[];
  }>;
  summary: {
    actionItems: number;
    cannibalizationItems: number;
    highPriorityItems: number;
    items: number;
    itemsPerWave: number;
    itemsReadyForPublicRefreshSprint: number;
    liveMissingFromSitemap: number | null;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    publishedButNoindexed: number;
    seoWarningItems: number;
    shortDescriptionItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    waves: number;
  };
  waves: Array<{
    actionItems: number;
    files: string[];
    highPriorityItems: number;
    items: number;
    readyItems: number;
    refreshReasons: string[];
    unsafeItems: number;
    wave: number;
  }>;
};

type BroadFirstCoverageLaunchPack = {
  items: Array<{
    category: string;
    cluster: string;
    commandBoundary: {
      markReviewAfterHumanApproval: string;
      publishConfirm: string;
      publishDryRunAfterReview: string;
    };
    file: string;
    gapScore: number;
    humanFactCheckChecklist: unknown[];
    readyForFirstCoverageReview: boolean;
    safeDraft: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
    triageFreshnessRisk: string | null;
    unsafeReasons: unknown[];
  }>;
  summary: {
    clustersSelected: number;
    commandBoundaries: number;
    firstCoverageTarget: number;
    itemsWithFactCheckChecklist: number;
    itemsWithSearchQueries: number;
    itemsWithSourceTargets: number;
    publicArticlesBeforeLaunch: number;
    safeDraftItems: number;
    trafficDataAvailable: boolean;
    uniqueFiles: number;
    unsafeItems: number;
    zeroPublicClusters: number;
  };
  unsafeItems: unknown[];
};

type BroadFirstCoverageReadinessMatrix = {
  items: Array<{
    blockingIssues: unknown[];
    cluster: string;
    file: string;
    readiness: {
      freshnessReady: boolean | null;
      hasPublicLinkPath: boolean;
      integrityReady: boolean;
      preflightReady: boolean;
      queryReady: boolean | null;
      schemaReady: boolean;
      snippetReady: boolean;
      sourceReady: boolean;
    };
    readinessScore: number;
    reviewActions: unknown[];
    searchSignals: {
      exactQueryMatches: number | null;
      exactSeedMatches: number | null;
      matchedFamilies: number | null;
      searchQueries: number;
      seedFamilyMatches: number | null;
    };
    sourceSignals: {
      launchSourceTargets: number;
      reachableSources: number | null;
      sourceTargets: number | null;
    };
    title: string;
    warningIssues: unknown[];
  }>;
  summary: {
    blockingItems: number;
    commandBoundaries: number;
    firstCoverageItems: number;
    itemsWithPublicLinkPath: number;
    launchPackItems: number;
    preflightReadyItems: number;
    queryReadyItems: number;
    schemaReadyItems: number;
    snippetReadyItems: number;
    sourceReadyItems: number;
    trafficDataAvailable: boolean;
    uniqueFiles: number;
    unsafeItems: number;
    warningItems: number;
    zeroPublicClusters: number;
  };
};

type HumanApprovalQueue = {
  items: Array<{
    articleState: { humanReviewRequired: boolean; noindex: boolean; qualityScore: number; sourceNotes: boolean; status: string };
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    currentStage: string;
    file: string;
    humanChecklist: unknown[];
    massSearchThemes: unknown[];
    popularPromptLanes: unknown[];
    priorityScore: number;
    projectedPublishableAfterHumanApproval: boolean;
    readyForHumanApproval: boolean;
    seoWarnings: unknown[];
    sourceReplacementDecisions: unknown[];
    title: string;
    unsafeReasons: unknown[];
  }>;
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    projectedPublicPublishedAfterImmediateHumanApproval: number;
    publishConfirmCommandsIncluded: number;
  };
  summary: {
    backlogItems: number;
    commandBoundaries: number;
    humanGatedItems: number;
    immediateApprovalItems: number;
    immediateApprovalReadyItems: number;
    items: number;
    itemsReadyForHumanApproval: number;
    itemsWithFailedSourceDecision: number;
    itemsWithMassSearchTheme: number;
    itemsWithPopularPromptLane: number;
    itemsWithSeoWarnings: number;
    itemsWithSourceReplacementDecisions: number;
    publishConfirmCommandsIncluded: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type HumanApprovalClearancePack = {
  items: Array<{
    clearanceActions: string[];
    copydeskBrief: unknown | null;
    file: string;
    hasFailedSourceDecision: boolean;
    immediate: boolean;
    massSearchThemes: number;
    popularPromptLanes: number;
    priorityScore: number;
    readyForClearanceReview: boolean;
    seoWarning: unknown | null;
    sourceDecisions: unknown[];
    title: string;
    unsafeReasons: string[];
  }>;
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    projectedPublicPublishedAfterImmediateHumanApproval: number;
    publishConfirmCommandsIncluded: number;
  };
  summary: {
    approvalItems: number;
    backlogItems: number;
    clearanceActions: number;
    copydeskBriefItems: number;
    failedSourceDecisionItems: number;
    immediateItems: number;
    itemsReadyForClearanceReview: number;
    massSearchThemeItems: number;
    popularPromptLaneItems: number;
    publishConfirmCommandsIncluded: number;
    seoWarningItems: number;
    sourceDecisionItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type NextBatchApprovalRoute = {
  items: Array<{
    actions: string[];
    commandBoundary: {
      dryRunMarkReview: string;
      markReviewAfterHumanApproval: string;
      publishConfirm: string;
      publishDryRun: string;
    };
    file: string;
    priorityScore: number;
    queryCoverage: { queryCount?: number } | null;
    readyForHumanRouteReview: boolean;
    routeWarnings: string[];
    seoWarning: unknown | null;
    sourcePack: { officialSourceTargets?: unknown[] } | null;
    title: string;
    unsafeReasons: string[];
  }>;
  nextBatch: { batch: number; candidates: number; plannedBatchTopic: string | null; topic: string } | null;
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    publishConfirmCommandsIncluded: number;
  };
  summary: {
    actionItems: number;
    batchItems: number;
    clearanceMatchedItems: number;
    commandBoundaries: number;
    copydeskMatchedItems: number;
    currentPublicPublished: number;
    currentPublishableNow: number;
    freshnessMatchedItems: number;
    itemsReadyForHumanRouteReview: number;
    plannedBatchCandidates: number;
    publishConfirmCommandsIncluded: number;
    queryCoverageMatchedItems: number;
    queryMatchWarningItems: number;
    routeWarnings: number;
    seoWarningItems: number;
    sourcePackMatchedItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type NextBatchRouteRemediationPack = {
  items: Array<{
    actionCount: number;
    file: string;
    manualRemediationActions: string[];
    priorityScore: number;
    publishConfirm: string;
    readyForRemediationReview: boolean;
    remediationKinds: string[];
    routeWarnings: string[];
    title: string;
    unsafeReasons: string[];
  }>;
  nextBatch: { batch: number; candidates: number; topic: string } | null;
  publishingBoundary: {
    currentPublicPublished: number;
    currentPublishableNow: number;
    publishConfirmCommandsIncluded: number;
  };
  summary: {
    actionItems: number;
    batchItems: number;
    clearanceGapItems: number;
    copydeskGapItems: number;
    freshnessWarningItems: number;
    itemsReadyForRemediationReview: number;
    publishConfirmCommandsIncluded: number;
    queryWarningItems: number;
    routeWarnings: number;
    seoWarningItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    warningItems: number;
  };
  warningItems: Array<{
    actionCount: number;
    file: string;
    priorityScore: number;
    publishConfirm: string;
    readyForRemediationReview: boolean;
    remediationKinds: string[];
    routeWarnings: string[];
    title: string;
  }>;
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
    broadFirstCoverageItems: number;
    broadFirstCoverageItemsMissingPublicLinkSuggestion: number;
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

type InternalLinkSprintBoard = {
  items: Array<{
    currentInternalLinks: number;
    file: string;
    linksToPublicArticles: number;
    priorityScore: number;
    publishConfirm: string;
    readyForInternalLinkSprint: boolean;
    scopes: string[];
    sprintWave: number;
    suggestedLinks: Array<{ title: string; url: string }>;
    title: string;
    unsafeReasons: string[];
  }>;
  summary: {
    actionItems: number;
    broadFirstCoverageItems: number;
    candidateItems: number;
    candidateItemsMissingPublicLinkSuggestion: number;
    candidateItemsWithPublicSuggestions: number;
    candidatesWithoutCurrentPublicLinks: number;
    expansionItems: number;
    items: number;
    itemsPerWave: number;
    publicArticles: number;
    publishConfirmCommandsIncluded: number;
    readyForInternalLinkSprint: number;
    recommendedItems: number;
    suggestedPublicLinks: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    waveItems: number;
    waves: number;
  };
  waves: Array<{
    actionItems: number;
    files: string[];
    items: number;
    readyItems: number;
    scopes: string[];
    suggestedPublicLinks: number;
    unsafeItems: number;
    wave: number;
  }>;
};

type SourceHealth = {
  failedChecks: Array<{ error?: string; finalUrl?: string; ok: boolean; references: unknown[]; status?: number; url: string }>;
  filesWithoutReachableSource: Array<{ file: string; reachableSources: number; sourceTargets: number; title: string }>;
  redirectedChecks: Array<{ finalUrl?: string; references: unknown[]; status?: number; url: string }>;
  summary: {
    broadFirstCoverageFiles: number;
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

type SourceTargetRemediationPack = {
  items: Array<{
    affectedFiles: string[];
    error?: string;
    finalUrl?: string;
    kind: string;
    manualActions: string[];
    manualFixReady: boolean;
    referenceCount: number;
    replacementCandidates: Array<{ sourceType: string; title: string; url: string }>;
    replacementPlan: string[];
    stopBefore: string;
    unsafeReasons: string[];
    url: string;
  }>;
  summary: {
    failedUrlItems: number;
    failedUrls: number;
    humanGatedItems: number;
    items: number;
    itemsWithAffectedFiles: number;
    itemsWithHumanChecklist: number;
    itemsWithManualActions: number;
    itemsWithReplacementCandidates: number;
    itemsWithReferences: number;
    itemsWithReplacementPlan: number;
    manualFixReadyItems: number;
    failedItemsWithReplacementCandidates: number;
    replacementCandidateOptions: number;
    redirectedUrlItems: number;
    redirectedUrls: number;
    sourceHealthCheckedUrls: number;
    sourceHealthFailedUrls: number;
    sourceHealthRedirectedUrls: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type SourceReplacementDecisionPack = {
  items: Array<{
    alternatives: unknown[];
    file: string;
    finalUrl?: string;
    kind: string;
    originalUrl: string;
    recommendedCandidate: { sourceType: string; title: string; url: string } | null;
    scopes: string[];
    title: string;
    unsafeReasons: string[];
  }>;
  summary: {
    affectedFiles: number;
    failedDecisionItems: number;
    humanGatedItems: number;
    items: number;
    itemsWithDecisionOptions: number;
    itemsWithManualChecklist: number;
    itemsWithRecommendedCandidate: number;
    officialRecommendedCandidates: number;
    redirectedDecisionItems: number;
    replacementCandidateOptions: number;
    sourceRemediationItems: number;
    sourceRemediationUnsafeItems: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
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

type AutopilotApprovalRemediationPack = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    file: string;
    internalLinkFixes: unknown[];
    manualFixReady: boolean;
    remediationReasons: unknown[];
    searchFixes: unknown[];
    sourceChecks: unknown[];
    sourceUrlFixes: unknown[];
    title: string;
  }>;
  summary: {
    approvalItems: number;
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithInternalLinkFixes: number;
    itemsWithRemediationReasons: number;
    itemsWithSearchFixes: number;
    itemsWithSourceChecks: number;
    itemsWithSourceUrlFixes: number;
    manualFixReadyItems: number;
    sourceUrlFixActions: number;
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

type AutopilotSearchQueryGapBrief = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    coverageLane: string;
    factCheckQueries: unknown[];
    file: string;
    officialSourceTargets: unknown[];
    primaryKeyword: string;
    readyForManualSearchQueryReview: boolean;
    recommendedSearchQueries: string[];
    safeDraft: boolean;
    sourceEvidence: unknown[];
    sprintOrder: number;
    title: string;
  }>;
  summary: {
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithCoverageEvidence: number;
    itemsWithFactCheckQueries: number;
    itemsWithOfficialSources: number;
    itemsWithRecommendedQueries: number;
    readyItems: number;
    safeDraftItems: number;
    totalRecommendedQueries: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotQueuedPlaybookBrief = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    file: string;
    internalLinkSuggestions: unknown[];
    manualOnlyCommands: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    readyForHumanReview: boolean;
    riskReviewChecklist: unknown[];
    safeDraft: boolean;
    searchActions: unknown[];
    searchQueries: unknown[];
    sourceActions: unknown[];
    sourceEvidence: unknown[];
    sourceTargets: unknown[];
    sprintOrder: number;
    title: string;
  }>;
  summary: {
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithFactCheckQueries: number;
    itemsWithInternalLinkSuggestions: number;
    itemsWithOptimizationActions: number;
    itemsWithRiskChecklist: number;
    itemsWithSearchActions: number;
    itemsWithSearchQueries: number;
    itemsWithSourceActions: number;
    itemsWithSourceEvidence: number;
    itemsWithSourceTargets: number;
    readyItems: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotQueuedRemediationPack = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    file: string;
    humanChecklist: unknown[];
    internalLinkFixes: unknown[];
    manualFixReady: boolean;
    remediationReasons: unknown[];
    riskChecks: unknown[];
    searchFixes: unknown[];
    sourceChecks: unknown[];
    sourceEvidence: unknown[];
    sprintOrder: number;
    title: string;
  }>;
  summary: {
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithInternalLinkFixes: number;
    itemsWithRemediationReasons: number;
    itemsWithRiskChecks: number;
    itemsWithSearchFixes: number;
    itemsWithSourceChecks: number;
    manualFixReadyItems: number;
    queuedItems: number;
    unsafeItems: number;
  };
  unsafeItems: unknown[];
};

type AutopilotBroadAiDemandBrief = {
  clusters: Array<{
    audience: string;
    cluster: string;
    contentAngles: unknown[];
    draftMatches: number;
    gapScore: number;
    publicMatches: number;
    readyCandidates: unknown[];
    reviewFocus: unknown[];
    searchQueries: unknown[];
    sourceSignals: unknown[];
    why: string;
  }>;
  summary: {
    clusters: number;
    clustersWithReadyCandidates: number;
    clustersWithoutPublicCoverage: number;
    externalSourceSignals: number;
    publicArticles: number;
    readyCandidateFiles: number;
    reviewReadyDrafts: number;
    unsafeClusters: number;
  };
  unsafeClusters: unknown[];
};

type SearchDemandIntake = {
  lanes: Array<{
    contentFormats: unknown[];
    draftMatches: number;
    intakeScore: number;
    lane: string;
    manualReviewFocus: unknown[];
    officialSourceTargets: unknown[];
    publicMatches: number;
    readyCandidates: unknown[];
    reviewQueueMatches: number;
    searchQueries: unknown[];
    userProblem: string;
  }>;
  summary: {
    contentFormats: number;
    lanes: number;
    lanesWithPublicCoverage: number;
    lanesWithoutPublicCoverage: number;
    lanesWithReadyCandidates: number;
    officialSourceTargets: number;
    readyCandidateFiles: number;
    reviewQueueMatches: number;
    searchQueries: number;
    unsafeLanes: number;
  };
  unsafeLanes: unknown[];
};

type SearchDemandReviewPack = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    factCheckQueries: unknown[];
    file: string;
    humanReviewChecklist: unknown[];
    lane: string;
    officialSourceTargets: unknown[];
    priorityScore: number;
    publicInternalLinkSuggestion: unknown | null;
    publicMatches: number;
    readyForHumanReview: boolean;
    reviewQueueMatched: boolean;
    safeDraft: boolean;
    searchQueries: unknown[];
    title: string;
    warningIssues: unknown[];
  }>;
  laneSummaries: Array<{ items: number; lane: string; publicMatches: number; readyCandidates: number; reviewQueueMatches: number; unsafeItems: number }>;
  summary: {
    factCheckQueries: number;
    items: number;
    itemsPerLaneMax: number;
    itemsWithCommandBoundary: number;
    itemsWithHumanChecklist: number;
    itemsWithInternalLinkSuggestion: number;
    itemsWithManualReviewFocus: number;
    itemsWithOfficialSources: number;
    itemsWithSearchQueries: number;
    lanes: number;
    readyItems: number;
    reviewQueueMatchedItems: number;
    safeDraftItems: number;
    unsafeItems: number;
    zeroPublicLaneItems: number;
  };
  unsafeItems: unknown[];
};

type SearchDemandPublicationBridge = {
  blockingItems: unknown[];
  items: Array<{
    blockingIssues: unknown[];
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string; stopBefore: string };
    file: string;
    humanApprovalReady: boolean;
    indexingSafe: boolean;
    internalLinkReady: boolean;
    lane: string;
    reviewPackReady: boolean;
    schemaReady: boolean;
    searchSnippetReady: boolean;
    sourceReady: boolean;
    title: string;
    warningIssues: unknown[];
  }>;
  summary: {
    blockingItems: number;
    humanApprovalReadyItems: number;
    indexingSafeItems: number;
    internalLinkReadyItems: number;
    items: number;
    reviewPackItems: number;
    reviewPackReadyItems: number;
    schemaReadyItems: number;
    searchSnippetReadyItems: number;
    sourceReadyItems: number;
    warningItems: number;
  };
  warningItems: unknown[];
};

type AutopilotBroadFreshnessTriage = {
  items: Array<{
    cluster: string;
    file: string;
    freshnessPriority: number;
    freshnessRisk: string;
    humanFactCheckChecklist: unknown[];
    publicMatches: number;
    readyForHumanFreshnessReview: boolean;
    safeDraft: boolean;
    searchQueries: unknown[];
    sourceSignals: unknown[];
    sourceTargets: unknown[];
    title: string;
  }>;
  nextItems: AutopilotBroadFreshnessTriage["items"];
  summary: {
    clustersCovered: number;
    highRiskItems: number;
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithExternalSignals: number;
    itemsWithHumanFactChecks: number;
    itemsWithSearchQueries: number;
    itemsWithSourceTargets: number;
    readyItems: number;
    safeDraftItems: number;
    sourceClusters: number;
    sourceReadyCandidateFiles: number;
    unsafeItems: number;
    uniqueFiles: number;
  };
  unsafeItems: unknown[];
};

type AutopilotBroadPublishWaves = {
  nextWave: {
    clusters: string[];
    files: string[];
    projectedPublicPublishedAfterApproval: number;
    readyItems: number;
    theme: string;
    unsafeItems: number;
    wave: number;
  } | null;
  summary: {
    clustersCovered: number;
    currentPublicPublished: number;
    items: number;
    itemsPerWaveMax: number;
    readyItems: number;
    safeDraftItems: number;
    unsafeItems: number;
    unsafeWaves: number;
    uniqueFiles: number;
    waves: number;
    wavesReadyForHumanApproval: number;
  };
  unsafeWaves: unknown[];
  waves: Array<{
    clusters: string[];
    files: string[];
    projectedPublicPublishedAfterApproval: number;
    readyItems: number;
    theme: string;
    unsafeItems: number;
    wave: number;
  }>;
};

type AutopilotBroadWaveOptimization = {
  nextItems: Array<{
    actionChecklist: unknown[];
    articleSignals: { descriptionLength: number; h2Count: number; titleLength: number };
    file: string;
    publicLinkSuggestion: { title: string; url: string } | null;
    readyForHumanOptimizationReview: boolean;
    title: string;
    unsafeReasons: unknown[];
    warningRemediation: unknown[];
    wave: number;
  }>;
  summary: {
    items: number;
    itemsWithActionChecklist: number;
    itemsWithPublicLinkSuggestion: number;
    itemsWithSearchQueries: number;
    itemsWithSourceTargets: number;
    readyItems: number;
    safeDraftItems: number;
    unsafeItems: number;
    waveItems: number;
    waves: number;
    wavesReady: number;
  };
  unsafeItems: unknown[];
  waveSummaries: Array<{ files: string[]; items: number; readyItems: number; theme: string; unsafeItems: number; wave: number }>;
};

type AutopilotBroadWaveRemediationPack = {
  items: Array<{
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    file: string;
    internalLinkFixes: unknown[];
    manualFixReady: boolean;
    publicLinkPlan: unknown[];
    remediationReasons: unknown[];
    riskChecks: unknown[];
    searchFixes: unknown[];
    sourceChecks: unknown[];
    title: string;
    warningFixes: unknown[];
    wave: number;
  }>;
  summary: {
    items: number;
    itemsWithCommandBoundary: number;
    itemsWithInternalLinkFixes: number;
    itemsWithPublicLinkPlan: number;
    itemsWithRemediationReasons: number;
    itemsWithRiskChecks: number;
    itemsWithSearchFixes: number;
    itemsWithSourceChecks: number;
    itemsWithWarningFixes: number;
    manualFixReadyItems: number;
    missingSpecificLinkSuggestionItems: number;
    unsafeItems: number;
    waveItems: number;
    waves: number;
    wavesReady: number;
  };
  unsafeItems: unknown[];
  waveSummaries: Array<{ items: number; manualFixReadyItems: number; missingSpecificLinkSuggestionItems: number; unsafeItems: number; wave: number }>;
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

type ReviewCollisionDecisionPack = {
  items: Array<{
    candidate: { file: string; role: string; title: string };
    closest: Array<{ file: string; role: string; title: string }>;
    collisionType: string;
    commandBoundary: { markReviewAfterHumanApproval: string; publishConfirm: string; publishDryRunAfterReview: string };
    decisionOptions: string[];
    humanDecisionReady: boolean;
    queueBlockers: unknown[];
    requiredDecision: string;
    warningIssues: unknown[];
  }>;
  summary: {
    blockedQueueMatchedItems: number;
    blockingItems: number;
    decisionItems: number;
    highRiskItems: number;
    humanDecisionReadyItems: number;
    itemsWithCommandBoundary: number;
    publishedCollisionItems: number;
    reviewOnlyCollisionItems: number;
    unsafeItems: number;
    warningItems: number;
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

type SeoWarningRemediationPack = {
  items: Array<{
    file: string;
    humanChecklist: unknown[];
    manualActions: unknown[];
    manualFixReady: boolean;
    priority: number;
    schemaWarnings: unknown[];
    scope: string[];
    snippetWarnings: unknown[];
    status: string;
    title: string;
  }>;
  summary: {
    blockingItems: number;
    draftItems: number;
    humanGatedItems: number;
    items: number;
    itemsWithHumanChecklist: number;
    itemsWithManualActions: number;
    publicItems: number;
    recommendedItems: number;
    schemaWarningItems: number;
    snippetWarningItems: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    warningItems: number;
    waveItems: number;
  };
  unsafeItems: unknown[];
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

type MassAiSearchMatrix = {
  summary: {
    deploymentBridgedThemes: number;
    humanGatedItems: number;
    items: number;
    itemsReadyForHumanReviewPrep: number;
    itemsWithHumanReviewActions: number;
    itemsWithSearchSeeds: number;
    itemsWithSourceTargets: number;
    promptBlueprintSamples: number;
    promptBridgedThemes: number;
    sourceBroadThemes: number;
    sourceTopThemes: number;
    themesWithoutPublicCoverage: number;
    trafficDataAvailable: boolean;
    uniqueCandidateFiles: number;
    unsafeItems: number;
    waves: number;
  };
  topItems: Array<{
    candidateFiles: string[];
    deploymentMatches: number;
    editorialWave: number;
    lane: string;
    promptBlueprintSamples: unknown[];
    promptModuleMatches: number;
    publicMatches: number;
    readyForHumanReviewPrep: boolean;
    searchSeeds: string[];
    sourceTargets: string[];
    themeTitle: string;
    trafficClaim: string;
  }>;
};

type PopularAiPromptPlaybook = {
  summary: {
    agentDeploymentLanes: number;
    broadWorkPromptLanes: number;
    deploymentBridgeItems: number;
    humanGatedItems: number;
    items: number;
    itemsReadyForHumanReviewPrep: number;
    itemsWithCandidateFiles: number;
    memoryLanes: number;
    officialSources: number;
    promptModuleBridgeItems: number;
    promptTemplates: number;
    publishConfirmCommandsIncluded: number;
    searchQueries: number;
    trafficDataAvailable: boolean;
    uniqueCandidateFiles: number;
    unsafeItems: number;
  };
  topItems: Array<{
    audience: string;
    candidateFiles: string[];
    deploymentBridgeFiles: string[];
    laneId: string;
    promptModuleBridgeFiles: string[];
    promptTemplates: unknown[];
    publicMatches: number;
    readyForHumanReviewPrep: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
  }>;
};

type PopularPromptApprovalBridge = {
  summary: {
    approvalQueueItems: number;
    approvalQueueReadyItems: number;
    bridgeItems: number;
    bridgeItemsReadyForHumanReviewPrep: number;
    commandBoundaries: number;
    lanes: number;
    lanesAlreadyInApprovalQueue: number;
    lanesWithNextCandidates: number;
    lanesWithReadyNextCandidates: number;
    playbookItems: number;
    playbookReadyItems: number;
    promptTemplatesReferenced: number;
    publishConfirmCommandsIncluded: number;
    reviewCandidatePool: number;
    searchQueriesReferenced: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    uniqueFiles: number;
  };
  topItems: Array<{
    articleState: { humanReviewRequired: boolean; noindex: boolean; qualityScore: number; sourceNotes: boolean; status: string };
    file: string;
    laneTitle: string;
    opportunityScore: number;
    promptTemplates: number;
    readyForHumanReviewPrep: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    title: string;
    unsafeReasons: string[];
  }>;
};

type PopularPromptSprintBoard = {
  items: Array<{
    actionCount: number;
    industryBucket: string;
    laneId: string;
    nextCandidateFiles: string[];
    promptTemplateSamples: string[];
    publicMatches: number;
    publishConfirm: string;
    readyForPromptSprint: boolean;
    searchQueries: string[];
    sourceTargets: string[];
    sprintPriorityScore: number;
    sprintWave: number;
    title: string;
    unsafeReasons: string[];
  }>;
  summary: {
    actionItems: number;
    bridgeItems: number;
    candidateFiles: number;
    highPriorityItems: number;
    industryBuckets: number;
    items: number;
    itemsPerWave: number;
    lanesReadyForPromptSprint: number;
    nextCandidateFiles: number;
    playbookItems: number;
    promptTemplateSamples: number;
    promptTemplates: number;
    publishConfirmCommandsIncluded: number;
    searchQueries: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
    waves: number;
  };
  waves: Array<{
    actionItems: number;
    candidateFiles: string[];
    highPriorityItems: number;
    industryBuckets: string[];
    items: number;
    readyItems: number;
    searchQueries: string[];
    unsafeItems: number;
    wave: number;
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
    broadFirstCoverageItems: number;
    broadFirstCoveragePreflightItems: number;
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
  deploymentSprintBoard: readJson<DeploymentSprintBoard>("content/automation/ai-deployment-sprint-board.json"),
  searchDemandIntake: readJson<SearchDemandIntake>("content/automation/search-demand-intake.json"),
  broadSearchDemand: readJson<BroadSearchDemand>("content/automation/broad-search-demand-map.json"),
  massAiSearchMatrix: readJson<MassAiSearchMatrix>("content/automation/mass-ai-search-action-matrix.json"),
  popularAiPromptPlaybook: readJson<PopularAiPromptPlaybook>("content/automation/popular-ai-prompt-playbook.json"),
  popularPromptApprovalBridge: readJson<PopularPromptApprovalBridge>("content/automation/popular-prompt-approval-bridge.json"),
  popularPromptSprintBoard: readJson<PopularPromptSprintBoard>("content/automation/popular-prompt-sprint-board.json"),
  publicCoverageGapPlan: readJson<PublicCoverageGapPlan>("content/automation/public-coverage-gap-plan.json"),
  publicCoverageGapPreflight: readJson<PublicCoverageGapPreflight>("content/automation/public-coverage-gap-preflight.json"),
  publicCoverageGapDecisionPack: readJson<PublicCoverageGapDecisionPack>("content/automation/public-coverage-gap-decision-pack.json"),
  promptCoverage: readJson<PromptCoverage>("content/automation/industry-prompt-coverage.json"),
  promptReviewPack: readJson<PromptReviewPack>("content/automation/industry-prompt-review-pack.json"),
  industryPromptOpportunityBoard: readJson<IndustryPromptOpportunityBoard>("content/automation/industry-prompt-opportunity-board.json"),
  industryPromptModulePack: readJson<IndustryPromptModulePack>("content/automation/industry-prompt-module-pack.json"),
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
    seoWarningRemediation?: {
      summary?: { draftItems: number; humanGatedItems: number; items: number; publicItems: number; unsafeItems: number };
      topItems?: unknown[];
    };
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
  publicSurfaceInventory: readJson<PublicSurfaceInventory>("content/automation/public-surface-inventory.json"),
  publicSearchRefreshPack: readJson<PublicSearchRefreshPack>("content/automation/public-search-refresh-pack.json"),
  publicRefreshSprintBoard: readJson<PublicRefreshSprintBoard>("content/automation/public-refresh-sprint-board.json"),
  contentIntegrity: readJson<ContentIntegrity>("content/automation/content-integrity-audit.json"),
  internalLinks: readJson<InternalLinks>("content/automation/internal-link-opportunity-audit.json"),
  internalLinkSprintBoard: readJson<InternalLinkSprintBoard>("content/automation/internal-link-sprint-board.json"),
  sourceHealth: readJson<SourceHealth>("content/automation/source-target-health-audit.json"),
  sourceTargetRemediation: readJson<SourceTargetRemediationPack>("content/automation/source-target-remediation-pack.json"),
  sourceReplacementDecisions: readJson<SourceReplacementDecisionPack>("content/automation/source-replacement-decision-pack.json"),
  reviewActionBoard: readJson<ReviewActionBoard>("content/automation/review-action-board.json"),
  reviewPortfolioBoard: readJson<ReviewPortfolioBoard>("content/automation/review-portfolio-board.json"),
  autopilotReviewQueue: readJson<AutopilotReviewQueue>("content/automation/autopilot-review-queue.json"),
  autopilotApprovalPacket: readJson<AutopilotApprovalPacket>("content/automation/autopilot-approval-packet.json"),
  autopilotSearchIntentBrief: readJson<AutopilotSearchIntentBrief>("content/automation/autopilot-search-intent-brief.json"),
  autopilotInternalLinkBrief: readJson<AutopilotInternalLinkBrief>("content/automation/autopilot-internal-link-brief.json"),
  autopilotSourceVerificationBrief: readJson<AutopilotSourceVerificationBrief>("content/automation/autopilot-source-verification-brief.json"),
  autopilotHumanReviewPlaybook: readJson<AutopilotHumanReviewPlaybook>("content/automation/autopilot-human-review-playbook.json"),
  autopilotApprovalRemediation: readJson<AutopilotApprovalRemediationPack>("content/automation/autopilot-approval-remediation-pack.json"),
  autopilotReviewSprintBoard: readJson<AutopilotReviewSprintBoard>("content/automation/autopilot-review-sprint-board.json"),
  autopilotSearchQueryGapBrief: readJson<AutopilotSearchQueryGapBrief>("content/automation/autopilot-search-query-gap-brief.json"),
  autopilotQueuedPlaybookBrief: readJson<AutopilotQueuedPlaybookBrief>("content/automation/autopilot-queued-playbook-brief.json"),
  autopilotQueuedRemediation: readJson<AutopilotQueuedRemediationPack>("content/automation/autopilot-queued-remediation-pack.json"),
  autopilotBroadAiDemandBrief: readJson<AutopilotBroadAiDemandBrief>("content/automation/autopilot-broad-ai-demand-brief.json"),
  searchDemandReviewPack: readJson<SearchDemandReviewPack>("content/automation/search-demand-review-pack.json"),
  searchDemandPublicationBridge: readJson<SearchDemandPublicationBridge>("content/automation/search-demand-publication-bridge.json"),
  autopilotBroadFreshnessTriage: readJson<AutopilotBroadFreshnessTriage>("content/automation/autopilot-broad-freshness-triage.json"),
  autopilotBroadPublishWaves: readJson<AutopilotBroadPublishWaves>("content/automation/autopilot-broad-publish-waves.json"),
  autopilotBroadWaveOptimization: readJson<AutopilotBroadWaveOptimization>("content/automation/autopilot-broad-wave-optimization.json"),
  autopilotBroadWaveRemediation: readJson<AutopilotBroadWaveRemediationPack>("content/automation/autopilot-broad-wave-remediation-pack.json"),
  broadFirstCoverageLaunchPack: readJson<BroadFirstCoverageLaunchPack>("content/automation/broad-first-coverage-launch-pack.json"),
  broadFirstCoverageReadinessMatrix: readJson<BroadFirstCoverageReadinessMatrix>("content/automation/broad-first-coverage-readiness-matrix.json"),
  humanApprovalQueue: readJson<HumanApprovalQueue>("content/automation/human-approval-execution-queue.json"),
  humanApprovalClearancePack: readJson<HumanApprovalClearancePack>("content/automation/human-approval-clearance-pack.json"),
  nextBatchApprovalRoute: readJson<NextBatchApprovalRoute>("content/automation/next-batch-approval-route.json"),
  nextBatchRouteRemediationPack: readJson<NextBatchRouteRemediationPack>("content/automation/next-batch-route-remediation-pack.json"),
  reviewOptimizationBrief: readJson<ReviewOptimizationBrief>("content/automation/review-optimization-brief.json"),
  reviewCannibalizationBrief: readJson<ReviewCannibalizationBrief>("content/automation/review-cannibalization-brief.json"),
  reviewCollisionDecisionPack: readJson<ReviewCollisionDecisionPack>("content/automation/review-collision-decision-pack.json"),
  reviewFreshnessBrief: readJson<ReviewFreshnessBrief>("content/automation/review-freshness-brief.json"),
  searchSnippets: readJson<SearchSnippets>("content/automation/search-snippet-readiness-audit.json"),
  structuredData: readJson<StructuredData>("content/automation/structured-data-readiness-audit.json"),
  seoWarningRemediation: readJson<SeoWarningRemediationPack>("content/automation/seo-warning-remediation-pack.json"),
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
  internalLinkSprintBoard: {
    actionItems: reports.internalLinkSprintBoard.data?.summary.actionItems ?? null,
    candidateItems: reports.internalLinkSprintBoard.data?.summary.candidateItems ?? null,
    candidatesWithoutCurrentPublicLinks: reports.internalLinkSprintBoard.data?.summary.candidatesWithoutCurrentPublicLinks ?? null,
    items: reports.internalLinkSprintBoard.data?.summary.items ?? null,
    itemsPerWave: reports.internalLinkSprintBoard.data?.summary.itemsPerWave ?? null,
    publicArticles: reports.internalLinkSprintBoard.data?.summary.publicArticles ?? null,
    publishConfirmCommandsIncluded: reports.internalLinkSprintBoard.data?.summary.publishConfirmCommandsIncluded ?? null,
    readyForInternalLinkSprint: reports.internalLinkSprintBoard.data?.summary.readyForInternalLinkSprint ?? null,
    suggestedPublicLinks: reports.internalLinkSprintBoard.data?.summary.suggestedPublicLinks ?? null,
    top: reports.internalLinkSprintBoard.data?.items.slice(0, 12) ?? [],
    trafficDataAvailable: reports.internalLinkSprintBoard.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.internalLinkSprintBoard.data?.summary.unsafeItems ?? null,
    waveItems: reports.internalLinkSprintBoard.data?.summary.waveItems ?? null,
    waves: reports.internalLinkSprintBoard.data?.waves ?? [],
  },
  sourceHealth: {
    broadFirstCoverageFiles: reports.sourceHealth.data?.summary.broadFirstCoverageFiles ?? null,
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
  sourceTargetRemediation: {
    failedUrlItems: reports.sourceTargetRemediation.data?.summary.failedUrlItems ?? null,
    failedUrls: reports.sourceTargetRemediation.data?.summary.failedUrls ?? null,
    humanGatedItems: reports.sourceTargetRemediation.data?.summary.humanGatedItems ?? null,
    failedItemsWithReplacementCandidates: reports.sourceTargetRemediation.data?.summary.failedItemsWithReplacementCandidates ?? null,
    items: reports.sourceTargetRemediation.data?.summary.items ?? null,
    itemsWithReplacementCandidates: reports.sourceTargetRemediation.data?.summary.itemsWithReplacementCandidates ?? null,
    itemsList: reports.sourceTargetRemediation.data?.items.slice(0, 8) ?? [],
    manualFixReadyItems: reports.sourceTargetRemediation.data?.summary.manualFixReadyItems ?? null,
    replacementCandidateOptions: reports.sourceTargetRemediation.data?.summary.replacementCandidateOptions ?? null,
    redirectedUrlItems: reports.sourceTargetRemediation.data?.summary.redirectedUrlItems ?? null,
    redirectedUrls: reports.sourceTargetRemediation.data?.summary.redirectedUrls ?? null,
    sourceHealthCheckedUrls: reports.sourceTargetRemediation.data?.summary.sourceHealthCheckedUrls ?? null,
    unsafeItems: reports.sourceTargetRemediation.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.sourceTargetRemediation.data?.unsafeItems.slice(0, 8) ?? [],
  },
  sourceReplacementDecisions: {
    affectedFiles: reports.sourceReplacementDecisions.data?.summary.affectedFiles ?? null,
    failedDecisionItems: reports.sourceReplacementDecisions.data?.summary.failedDecisionItems ?? null,
    humanGatedItems: reports.sourceReplacementDecisions.data?.summary.humanGatedItems ?? null,
    items: reports.sourceReplacementDecisions.data?.summary.items ?? null,
    itemsWithDecisionOptions: reports.sourceReplacementDecisions.data?.summary.itemsWithDecisionOptions ?? null,
    itemsWithManualChecklist: reports.sourceReplacementDecisions.data?.summary.itemsWithManualChecklist ?? null,
    itemsWithRecommendedCandidate: reports.sourceReplacementDecisions.data?.summary.itemsWithRecommendedCandidate ?? null,
    officialRecommendedCandidates: reports.sourceReplacementDecisions.data?.summary.officialRecommendedCandidates ?? null,
    redirectedDecisionItems: reports.sourceReplacementDecisions.data?.summary.redirectedDecisionItems ?? null,
    replacementCandidateOptions: reports.sourceReplacementDecisions.data?.summary.replacementCandidateOptions ?? null,
    sourceRemediationItems: reports.sourceReplacementDecisions.data?.summary.sourceRemediationItems ?? null,
    sourceRemediationUnsafeItems: reports.sourceReplacementDecisions.data?.summary.sourceRemediationUnsafeItems ?? null,
    top: reports.sourceReplacementDecisions.data?.items.slice(0, 8) ?? [],
    unsafeItems: reports.sourceReplacementDecisions.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.sourceReplacementDecisions.data?.unsafeItems.slice(0, 8) ?? [],
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
  autopilotApprovalRemediation: {
    approvalItems: reports.autopilotApprovalRemediation.data?.summary.approvalItems ?? null,
    items: reports.autopilotApprovalRemediation.data?.summary.items ?? null,
    itemsList: reports.autopilotApprovalRemediation.data?.items.slice(0, 3) ?? [],
    itemsWithCommandBoundary: reports.autopilotApprovalRemediation.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithInternalLinkFixes: reports.autopilotApprovalRemediation.data?.summary.itemsWithInternalLinkFixes ?? null,
    itemsWithRemediationReasons: reports.autopilotApprovalRemediation.data?.summary.itemsWithRemediationReasons ?? null,
    itemsWithSearchFixes: reports.autopilotApprovalRemediation.data?.summary.itemsWithSearchFixes ?? null,
    itemsWithSourceChecks: reports.autopilotApprovalRemediation.data?.summary.itemsWithSourceChecks ?? null,
    itemsWithSourceUrlFixes: reports.autopilotApprovalRemediation.data?.summary.itemsWithSourceUrlFixes ?? null,
    manualFixReadyItems: reports.autopilotApprovalRemediation.data?.summary.manualFixReadyItems ?? null,
    sourceUrlFixActions: reports.autopilotApprovalRemediation.data?.summary.sourceUrlFixActions ?? null,
    unsafeItems: reports.autopilotApprovalRemediation.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotApprovalRemediation.data?.unsafeItems.slice(0, 8) ?? [],
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
  autopilotSearchQueryGapBrief: {
    items: reports.autopilotSearchQueryGapBrief.data?.summary.items ?? null,
    itemsList: reports.autopilotSearchQueryGapBrief.data?.items.slice(0, 5) ?? [],
    itemsWithCommandBoundary: reports.autopilotSearchQueryGapBrief.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithCoverageEvidence: reports.autopilotSearchQueryGapBrief.data?.summary.itemsWithCoverageEvidence ?? null,
    itemsWithFactCheckQueries: reports.autopilotSearchQueryGapBrief.data?.summary.itemsWithFactCheckQueries ?? null,
    itemsWithOfficialSources: reports.autopilotSearchQueryGapBrief.data?.summary.itemsWithOfficialSources ?? null,
    itemsWithRecommendedQueries: reports.autopilotSearchQueryGapBrief.data?.summary.itemsWithRecommendedQueries ?? null,
    readyItems: reports.autopilotSearchQueryGapBrief.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotSearchQueryGapBrief.data?.summary.safeDraftItems ?? null,
    totalRecommendedQueries: reports.autopilotSearchQueryGapBrief.data?.summary.totalRecommendedQueries ?? null,
    unsafeItems: reports.autopilotSearchQueryGapBrief.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotSearchQueryGapBrief.data?.unsafeItems.slice(0, 8) ?? [],
  },
  autopilotQueuedPlaybookBrief: {
    items: reports.autopilotQueuedPlaybookBrief.data?.summary.items ?? null,
    itemsList: reports.autopilotQueuedPlaybookBrief.data?.items.slice(0, 7) ?? [],
    itemsWithCommandBoundary: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithFactCheckQueries: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithFactCheckQueries ?? null,
    itemsWithInternalLinkSuggestions: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithInternalLinkSuggestions ?? null,
    itemsWithOptimizationActions: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithOptimizationActions ?? null,
    itemsWithRiskChecklist: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithRiskChecklist ?? null,
    itemsWithSearchActions: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithSearchActions ?? null,
    itemsWithSearchQueries: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithSearchQueries ?? null,
    itemsWithSourceActions: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithSourceActions ?? null,
    itemsWithSourceEvidence: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithSourceEvidence ?? null,
    itemsWithSourceTargets: reports.autopilotQueuedPlaybookBrief.data?.summary.itemsWithSourceTargets ?? null,
    readyItems: reports.autopilotQueuedPlaybookBrief.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotQueuedPlaybookBrief.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.autopilotQueuedPlaybookBrief.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotQueuedPlaybookBrief.data?.unsafeItems.slice(0, 8) ?? [],
  },
  autopilotQueuedRemediation: {
    items: reports.autopilotQueuedRemediation.data?.summary.items ?? null,
    itemsList: reports.autopilotQueuedRemediation.data?.items.slice(0, 7) ?? [],
    itemsWithCommandBoundary: reports.autopilotQueuedRemediation.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithInternalLinkFixes: reports.autopilotQueuedRemediation.data?.summary.itemsWithInternalLinkFixes ?? null,
    itemsWithRemediationReasons: reports.autopilotQueuedRemediation.data?.summary.itemsWithRemediationReasons ?? null,
    itemsWithRiskChecks: reports.autopilotQueuedRemediation.data?.summary.itemsWithRiskChecks ?? null,
    itemsWithSearchFixes: reports.autopilotQueuedRemediation.data?.summary.itemsWithSearchFixes ?? null,
    itemsWithSourceChecks: reports.autopilotQueuedRemediation.data?.summary.itemsWithSourceChecks ?? null,
    manualFixReadyItems: reports.autopilotQueuedRemediation.data?.summary.manualFixReadyItems ?? null,
    queuedItems: reports.autopilotQueuedRemediation.data?.summary.queuedItems ?? null,
    unsafeItems: reports.autopilotQueuedRemediation.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotQueuedRemediation.data?.unsafeItems.slice(0, 8) ?? [],
  },
  searchDemandIntake: {
    contentFormats: reports.searchDemandIntake.data?.summary.contentFormats ?? null,
    lanes: reports.searchDemandIntake.data?.summary.lanes ?? null,
    lanesList: reports.searchDemandIntake.data?.lanes.slice(0, 8) ?? [],
    lanesWithPublicCoverage: reports.searchDemandIntake.data?.summary.lanesWithPublicCoverage ?? null,
    lanesWithoutPublicCoverage: reports.searchDemandIntake.data?.summary.lanesWithoutPublicCoverage ?? null,
    lanesWithReadyCandidates: reports.searchDemandIntake.data?.summary.lanesWithReadyCandidates ?? null,
    officialSourceTargets: reports.searchDemandIntake.data?.summary.officialSourceTargets ?? null,
    readyCandidateFiles: reports.searchDemandIntake.data?.summary.readyCandidateFiles ?? null,
    reviewQueueMatches: reports.searchDemandIntake.data?.summary.reviewQueueMatches ?? null,
    searchQueries: reports.searchDemandIntake.data?.summary.searchQueries ?? null,
    unsafeLanes: reports.searchDemandIntake.data?.summary.unsafeLanes ?? null,
    unsafeLaneList: reports.searchDemandIntake.data?.unsafeLanes.slice(0, 8) ?? [],
  },
  searchDemandReviewPack: {
    factCheckQueries: reports.searchDemandReviewPack.data?.summary.factCheckQueries ?? null,
    items: reports.searchDemandReviewPack.data?.summary.items ?? null,
    itemsList: reports.searchDemandReviewPack.data?.items.slice(0, 16) ?? [],
    itemsPerLaneMax: reports.searchDemandReviewPack.data?.summary.itemsPerLaneMax ?? null,
    itemsWithCommandBoundary: reports.searchDemandReviewPack.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithHumanChecklist: reports.searchDemandReviewPack.data?.summary.itemsWithHumanChecklist ?? null,
    itemsWithInternalLinkSuggestion: reports.searchDemandReviewPack.data?.summary.itemsWithInternalLinkSuggestion ?? null,
    itemsWithManualReviewFocus: reports.searchDemandReviewPack.data?.summary.itemsWithManualReviewFocus ?? null,
    itemsWithOfficialSources: reports.searchDemandReviewPack.data?.summary.itemsWithOfficialSources ?? null,
    itemsWithSearchQueries: reports.searchDemandReviewPack.data?.summary.itemsWithSearchQueries ?? null,
    laneSummaries: reports.searchDemandReviewPack.data?.laneSummaries ?? [],
    lanes: reports.searchDemandReviewPack.data?.summary.lanes ?? null,
    readyItems: reports.searchDemandReviewPack.data?.summary.readyItems ?? null,
    reviewQueueMatchedItems: reports.searchDemandReviewPack.data?.summary.reviewQueueMatchedItems ?? null,
    safeDraftItems: reports.searchDemandReviewPack.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.searchDemandReviewPack.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.searchDemandReviewPack.data?.unsafeItems.slice(0, 8) ?? [],
    zeroPublicLaneItems: reports.searchDemandReviewPack.data?.summary.zeroPublicLaneItems ?? null,
  },
  searchDemandPublicationBridge: {
    blockingItems: reports.searchDemandPublicationBridge.data?.summary.blockingItems ?? null,
    blockingItemList: reports.searchDemandPublicationBridge.data?.blockingItems.slice(0, 8) ?? [],
    humanApprovalReadyItems: reports.searchDemandPublicationBridge.data?.summary.humanApprovalReadyItems ?? null,
    indexingSafeItems: reports.searchDemandPublicationBridge.data?.summary.indexingSafeItems ?? null,
    internalLinkReadyItems: reports.searchDemandPublicationBridge.data?.summary.internalLinkReadyItems ?? null,
    items: reports.searchDemandPublicationBridge.data?.summary.items ?? null,
    itemsList: reports.searchDemandPublicationBridge.data?.items.slice(0, 16) ?? [],
    reviewPackItems: reports.searchDemandPublicationBridge.data?.summary.reviewPackItems ?? null,
    reviewPackReadyItems: reports.searchDemandPublicationBridge.data?.summary.reviewPackReadyItems ?? null,
    schemaReadyItems: reports.searchDemandPublicationBridge.data?.summary.schemaReadyItems ?? null,
    searchSnippetReadyItems: reports.searchDemandPublicationBridge.data?.summary.searchSnippetReadyItems ?? null,
    sourceReadyItems: reports.searchDemandPublicationBridge.data?.summary.sourceReadyItems ?? null,
    warningItems: reports.searchDemandPublicationBridge.data?.summary.warningItems ?? null,
    warningItemList: reports.searchDemandPublicationBridge.data?.warningItems.slice(0, 8) ?? [],
  },
  autopilotBroadAiDemandBrief: {
    clusters: reports.autopilotBroadAiDemandBrief.data?.summary.clusters ?? null,
    clustersList: reports.autopilotBroadAiDemandBrief.data?.clusters.slice(0, 8) ?? [],
    clustersWithReadyCandidates: reports.autopilotBroadAiDemandBrief.data?.summary.clustersWithReadyCandidates ?? null,
    clustersWithoutPublicCoverage: reports.autopilotBroadAiDemandBrief.data?.summary.clustersWithoutPublicCoverage ?? null,
    externalSourceSignals: reports.autopilotBroadAiDemandBrief.data?.summary.externalSourceSignals ?? null,
    publicArticles: reports.autopilotBroadAiDemandBrief.data?.summary.publicArticles ?? null,
    readyCandidateFiles: reports.autopilotBroadAiDemandBrief.data?.summary.readyCandidateFiles ?? null,
    reviewReadyDrafts: reports.autopilotBroadAiDemandBrief.data?.summary.reviewReadyDrafts ?? null,
    unsafeClusters: reports.autopilotBroadAiDemandBrief.data?.summary.unsafeClusters ?? null,
    unsafeClusterList: reports.autopilotBroadAiDemandBrief.data?.unsafeClusters.slice(0, 8) ?? [],
  },
  autopilotBroadFreshnessTriage: {
    clustersCovered: reports.autopilotBroadFreshnessTriage.data?.summary.clustersCovered ?? null,
    highRiskItems: reports.autopilotBroadFreshnessTriage.data?.summary.highRiskItems ?? null,
    items: reports.autopilotBroadFreshnessTriage.data?.summary.items ?? null,
    itemsList: reports.autopilotBroadFreshnessTriage.data?.nextItems.slice(0, 8) ?? [],
    itemsWithCommandBoundary: reports.autopilotBroadFreshnessTriage.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithExternalSignals: reports.autopilotBroadFreshnessTriage.data?.summary.itemsWithExternalSignals ?? null,
    itemsWithHumanFactChecks: reports.autopilotBroadFreshnessTriage.data?.summary.itemsWithHumanFactChecks ?? null,
    itemsWithSearchQueries: reports.autopilotBroadFreshnessTriage.data?.summary.itemsWithSearchQueries ?? null,
    itemsWithSourceTargets: reports.autopilotBroadFreshnessTriage.data?.summary.itemsWithSourceTargets ?? null,
    readyItems: reports.autopilotBroadFreshnessTriage.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotBroadFreshnessTriage.data?.summary.safeDraftItems ?? null,
    sourceClusters: reports.autopilotBroadFreshnessTriage.data?.summary.sourceClusters ?? null,
    sourceReadyCandidateFiles: reports.autopilotBroadFreshnessTriage.data?.summary.sourceReadyCandidateFiles ?? null,
    unsafeItems: reports.autopilotBroadFreshnessTriage.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotBroadFreshnessTriage.data?.unsafeItems.slice(0, 8) ?? [],
    uniqueFiles: reports.autopilotBroadFreshnessTriage.data?.summary.uniqueFiles ?? null,
  },
  autopilotBroadPublishWaves: {
    clustersCovered: reports.autopilotBroadPublishWaves.data?.summary.clustersCovered ?? null,
    currentPublicPublished: reports.autopilotBroadPublishWaves.data?.summary.currentPublicPublished ?? null,
    items: reports.autopilotBroadPublishWaves.data?.summary.items ?? null,
    itemsPerWaveMax: reports.autopilotBroadPublishWaves.data?.summary.itemsPerWaveMax ?? null,
    nextWave: reports.autopilotBroadPublishWaves.data?.nextWave ?? null,
    readyItems: reports.autopilotBroadPublishWaves.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotBroadPublishWaves.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.autopilotBroadPublishWaves.data?.summary.unsafeItems ?? null,
    unsafeWaves: reports.autopilotBroadPublishWaves.data?.summary.unsafeWaves ?? null,
    unsafeWaveList: reports.autopilotBroadPublishWaves.data?.unsafeWaves.slice(0, 8) ?? [],
    uniqueFiles: reports.autopilotBroadPublishWaves.data?.summary.uniqueFiles ?? null,
    waves: reports.autopilotBroadPublishWaves.data?.summary.waves ?? null,
    wavesList: reports.autopilotBroadPublishWaves.data?.waves.slice(0, 8) ?? [],
    wavesReadyForHumanApproval: reports.autopilotBroadPublishWaves.data?.summary.wavesReadyForHumanApproval ?? null,
  },
  autopilotBroadWaveOptimization: {
    items: reports.autopilotBroadWaveOptimization.data?.summary.items ?? null,
    itemsList: reports.autopilotBroadWaveOptimization.data?.nextItems.slice(0, 8) ?? [],
    itemsWithActionChecklist: reports.autopilotBroadWaveOptimization.data?.summary.itemsWithActionChecklist ?? null,
    itemsWithPublicLinkSuggestion: reports.autopilotBroadWaveOptimization.data?.summary.itemsWithPublicLinkSuggestion ?? null,
    itemsWithSearchQueries: reports.autopilotBroadWaveOptimization.data?.summary.itemsWithSearchQueries ?? null,
    itemsWithSourceTargets: reports.autopilotBroadWaveOptimization.data?.summary.itemsWithSourceTargets ?? null,
    readyItems: reports.autopilotBroadWaveOptimization.data?.summary.readyItems ?? null,
    safeDraftItems: reports.autopilotBroadWaveOptimization.data?.summary.safeDraftItems ?? null,
    unsafeItems: reports.autopilotBroadWaveOptimization.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotBroadWaveOptimization.data?.unsafeItems.slice(0, 8) ?? [],
    waveItems: reports.autopilotBroadWaveOptimization.data?.summary.waveItems ?? null,
    waveSummaries: reports.autopilotBroadWaveOptimization.data?.waveSummaries.slice(0, 8) ?? [],
    waves: reports.autopilotBroadWaveOptimization.data?.summary.waves ?? null,
    wavesReady: reports.autopilotBroadWaveOptimization.data?.summary.wavesReady ?? null,
  },
  autopilotBroadWaveRemediation: {
    items: reports.autopilotBroadWaveRemediation.data?.summary.items ?? null,
    itemsList: reports.autopilotBroadWaveRemediation.data?.items.slice(0, 8) ?? [],
    itemsWithCommandBoundary: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithCommandBoundary ?? null,
    itemsWithInternalLinkFixes: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithInternalLinkFixes ?? null,
    itemsWithPublicLinkPlan: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithPublicLinkPlan ?? null,
    itemsWithRemediationReasons: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithRemediationReasons ?? null,
    itemsWithRiskChecks: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithRiskChecks ?? null,
    itemsWithSearchFixes: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithSearchFixes ?? null,
    itemsWithSourceChecks: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithSourceChecks ?? null,
    itemsWithWarningFixes: reports.autopilotBroadWaveRemediation.data?.summary.itemsWithWarningFixes ?? null,
    manualFixReadyItems: reports.autopilotBroadWaveRemediation.data?.summary.manualFixReadyItems ?? null,
    missingSpecificLinkSuggestionItems: reports.autopilotBroadWaveRemediation.data?.summary.missingSpecificLinkSuggestionItems ?? null,
    unsafeItems: reports.autopilotBroadWaveRemediation.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.autopilotBroadWaveRemediation.data?.unsafeItems.slice(0, 8) ?? [],
    waveItems: reports.autopilotBroadWaveRemediation.data?.summary.waveItems ?? null,
    waveSummaries: reports.autopilotBroadWaveRemediation.data?.waveSummaries.slice(0, 8) ?? [],
    waves: reports.autopilotBroadWaveRemediation.data?.summary.waves ?? null,
    wavesReady: reports.autopilotBroadWaveRemediation.data?.summary.wavesReady ?? null,
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
  reviewCollisionDecisionPack: {
    blockedQueueMatchedItems: reports.reviewCollisionDecisionPack.data?.summary.blockedQueueMatchedItems ?? null,
    blockingItems: reports.reviewCollisionDecisionPack.data?.summary.blockingItems ?? null,
    decisionItems: reports.reviewCollisionDecisionPack.data?.summary.decisionItems ?? null,
    highRiskItems: reports.reviewCollisionDecisionPack.data?.summary.highRiskItems ?? null,
    humanDecisionReadyItems: reports.reviewCollisionDecisionPack.data?.summary.humanDecisionReadyItems ?? null,
    itemsList: reports.reviewCollisionDecisionPack.data?.items.slice(0, 8) ?? [],
    itemsWithCommandBoundary: reports.reviewCollisionDecisionPack.data?.summary.itemsWithCommandBoundary ?? null,
    publishedCollisionItems: reports.reviewCollisionDecisionPack.data?.summary.publishedCollisionItems ?? null,
    reviewOnlyCollisionItems: reports.reviewCollisionDecisionPack.data?.summary.reviewOnlyCollisionItems ?? null,
    unsafeItems: reports.reviewCollisionDecisionPack.data?.summary.unsafeItems ?? null,
    warningItems: reports.reviewCollisionDecisionPack.data?.summary.warningItems ?? null,
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
  seoWarningRemediation: {
    blockingItems: reports.seoWarningRemediation.data?.summary.blockingItems ?? null,
    draftItems: reports.seoWarningRemediation.data?.summary.draftItems ?? null,
    humanGatedItems: reports.seoWarningRemediation.data?.summary.humanGatedItems ?? null,
    items: reports.seoWarningRemediation.data?.summary.items ?? null,
    itemsList: reports.seoWarningRemediation.data?.items.slice(0, 8) ?? [],
    manualFixReadyItems: reports.seoWarningRemediation.data?.items.filter((item) => item.manualFixReady).length ?? null,
    publicItems: reports.seoWarningRemediation.data?.summary.publicItems ?? null,
    recommendedItems: reports.seoWarningRemediation.data?.summary.recommendedItems ?? null,
    schemaWarningItems: reports.seoWarningRemediation.data?.summary.schemaWarningItems ?? null,
    snippetWarningItems: reports.seoWarningRemediation.data?.summary.snippetWarningItems ?? null,
    trafficDataAvailable: reports.seoWarningRemediation.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.seoWarningRemediation.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.seoWarningRemediation.data?.unsafeItems.slice(0, 8) ?? [],
    warningItems: reports.seoWarningRemediation.data?.summary.warningItems ?? null,
    waveItems: reports.seoWarningRemediation.data?.summary.waveItems ?? null,
  },
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
  publicSurfaceInventory: {
    broadCoverage: reports.publicSurfaceInventory.data?.broadCoverage.slice(0, 8) ?? [],
    broadClusters: reports.publicSurfaceInventory.data?.summary.broadClusters ?? null,
    broadClustersWithoutPublicCoverage: reports.publicSurfaceInventory.data?.summary.broadClustersWithoutPublicCoverage ?? null,
    liveMissingFromSitemap: reports.publicSurfaceInventory.data?.summary.liveMissingFromSitemap ?? null,
    livePublicCount: reports.publicSurfaceInventory.data?.summary.livePublicCount ?? null,
    liveSitemapUrls: reports.publicSurfaceInventory.data?.summary.liveSitemapUrls ?? null,
    projectPublicPublished: reports.publicSurfaceInventory.data?.summary.projectPublicPublished ?? null,
    publicArticles: reports.publicSurfaceInventory.data?.summary.publicArticles ?? null,
    publicCategories: reports.publicSurfaceInventory.data?.summary.publicCategories ?? null,
    publicCategoryCounts: reports.publicSurfaceInventory.data?.publicCategoryCounts ?? {},
    publicItems: reports.publicSurfaceInventory.data?.publicItems ?? [],
    publicTags: reports.publicSurfaceInventory.data?.summary.publicTags ?? null,
    publicTagCounts: reports.publicSurfaceInventory.data?.publicTagCounts ?? {},
    trafficDataAvailable: reports.publicSurfaceInventory.data?.summary.trafficDataAvailable ?? false,
    uncoveredBroadClusters: reports.publicSurfaceInventory.data?.uncoveredBroadClusters.slice(0, 8) ?? [],
    unsafeItems: reports.publicSurfaceInventory.data?.summary.unsafeItems ?? null,
  },
  publicSearchRefreshPack: {
    actionItems: reports.publicSearchRefreshPack.data?.summary.actionItems ?? null,
    cannibalizationItems: reports.publicSearchRefreshPack.data?.summary.cannibalizationItems ?? null,
    highPriorityItems: reports.publicSearchRefreshPack.data?.summary.highPriorityItems ?? null,
    items: reports.publicSearchRefreshPack.data?.summary.items ?? null,
    itemsReadyForHumanRefreshReview: reports.publicSearchRefreshPack.data?.summary.itemsReadyForHumanRefreshReview ?? null,
    liveMissingFromSitemap: reports.publicSearchRefreshPack.data?.summary.liveMissingFromSitemap ?? null,
    measuredTrafficSources: reports.publicSearchRefreshPack.data?.summary.measuredTrafficSources ?? null,
    publicArticles: reports.publicSearchRefreshPack.data?.summary.publicArticles ?? null,
    publishConfirmCommandsIncluded: reports.publicSearchRefreshPack.data?.summary.publishConfirmCommandsIncluded ?? null,
    publishedButNoindexed: reports.publicSearchRefreshPack.data?.summary.publishedButNoindexed ?? null,
    seoWarningItems: reports.publicSearchRefreshPack.data?.summary.seoWarningItems ?? null,
    shortDescriptionItems: reports.publicSearchRefreshPack.data?.summary.shortDescriptionItems ?? null,
    top: reports.publicSearchRefreshPack.data?.topItems ?? [],
    trafficDataAvailable: reports.publicSearchRefreshPack.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.publicSearchRefreshPack.data?.summary.unsafeItems ?? null,
  },
  publicRefreshSprintBoard: {
    actionItems: reports.publicRefreshSprintBoard.data?.summary.actionItems ?? null,
    cannibalizationItems: reports.publicRefreshSprintBoard.data?.summary.cannibalizationItems ?? null,
    highPriorityItems: reports.publicRefreshSprintBoard.data?.summary.highPriorityItems ?? null,
    items: reports.publicRefreshSprintBoard.data?.summary.items ?? null,
    itemsPerWave: reports.publicRefreshSprintBoard.data?.summary.itemsPerWave ?? null,
    itemsReadyForPublicRefreshSprint: reports.publicRefreshSprintBoard.data?.summary.itemsReadyForPublicRefreshSprint ?? null,
    liveMissingFromSitemap: reports.publicRefreshSprintBoard.data?.summary.liveMissingFromSitemap ?? null,
    publicArticles: reports.publicRefreshSprintBoard.data?.summary.publicArticles ?? null,
    publishConfirmCommandsIncluded: reports.publicRefreshSprintBoard.data?.summary.publishConfirmCommandsIncluded ?? null,
    publishedButNoindexed: reports.publicRefreshSprintBoard.data?.summary.publishedButNoindexed ?? null,
    seoWarningItems: reports.publicRefreshSprintBoard.data?.summary.seoWarningItems ?? null,
    shortDescriptionItems: reports.publicRefreshSprintBoard.data?.summary.shortDescriptionItems ?? null,
    top: reports.publicRefreshSprintBoard.data?.items.slice(0, 15) ?? [],
    trafficDataAvailable: reports.publicRefreshSprintBoard.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.publicRefreshSprintBoard.data?.summary.unsafeItems ?? null,
    waves: reports.publicRefreshSprintBoard.data?.waves ?? [],
  },
  broadFirstCoverageLaunchPack: {
    clustersSelected: reports.broadFirstCoverageLaunchPack.data?.summary.clustersSelected ?? null,
    commandBoundaries: reports.broadFirstCoverageLaunchPack.data?.summary.commandBoundaries ?? null,
    firstCoverageTarget: reports.broadFirstCoverageLaunchPack.data?.summary.firstCoverageTarget ?? null,
    items: reports.broadFirstCoverageLaunchPack.data?.items ?? [],
    itemsWithFactCheckChecklist: reports.broadFirstCoverageLaunchPack.data?.summary.itemsWithFactCheckChecklist ?? null,
    itemsWithSearchQueries: reports.broadFirstCoverageLaunchPack.data?.summary.itemsWithSearchQueries ?? null,
    itemsWithSourceTargets: reports.broadFirstCoverageLaunchPack.data?.summary.itemsWithSourceTargets ?? null,
    publicArticlesBeforeLaunch: reports.broadFirstCoverageLaunchPack.data?.summary.publicArticlesBeforeLaunch ?? null,
    safeDraftItems: reports.broadFirstCoverageLaunchPack.data?.summary.safeDraftItems ?? null,
    trafficDataAvailable: reports.broadFirstCoverageLaunchPack.data?.summary.trafficDataAvailable ?? false,
    uniqueFiles: reports.broadFirstCoverageLaunchPack.data?.summary.uniqueFiles ?? null,
    unsafeItems: reports.broadFirstCoverageLaunchPack.data?.summary.unsafeItems ?? null,
    unsafeItemList: reports.broadFirstCoverageLaunchPack.data?.unsafeItems ?? [],
    zeroPublicClusters: reports.broadFirstCoverageLaunchPack.data?.summary.zeroPublicClusters ?? null,
  },
  broadFirstCoverageReadinessMatrix: {
    blockingItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.blockingItems ?? null,
    commandBoundaries: reports.broadFirstCoverageReadinessMatrix.data?.summary.commandBoundaries ?? null,
    firstCoverageItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.firstCoverageItems ?? null,
    items: reports.broadFirstCoverageReadinessMatrix.data?.items ?? [],
    itemsWithPublicLinkPath: reports.broadFirstCoverageReadinessMatrix.data?.summary.itemsWithPublicLinkPath ?? null,
    launchPackItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.launchPackItems ?? null,
    preflightReadyItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.preflightReadyItems ?? null,
    queryReadyItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.queryReadyItems ?? null,
    schemaReadyItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.schemaReadyItems ?? null,
    snippetReadyItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.snippetReadyItems ?? null,
    sourceReadyItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.sourceReadyItems ?? null,
    trafficDataAvailable: reports.broadFirstCoverageReadinessMatrix.data?.summary.trafficDataAvailable ?? false,
    uniqueFiles: reports.broadFirstCoverageReadinessMatrix.data?.summary.uniqueFiles ?? null,
    unsafeItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.unsafeItems ?? null,
    warningItems: reports.broadFirstCoverageReadinessMatrix.data?.summary.warningItems ?? null,
    zeroPublicClusters: reports.broadFirstCoverageReadinessMatrix.data?.summary.zeroPublicClusters ?? null,
  },
  humanApprovalQueue: {
    backlogItems: reports.humanApprovalQueue.data?.summary.backlogItems ?? null,
    commandBoundaries: reports.humanApprovalQueue.data?.summary.commandBoundaries ?? null,
    currentPublicPublished: reports.humanApprovalQueue.data?.publishingBoundary.currentPublicPublished ?? null,
    currentPublishableNow: reports.humanApprovalQueue.data?.publishingBoundary.currentPublishableNow ?? null,
    humanGatedItems: reports.humanApprovalQueue.data?.summary.humanGatedItems ?? null,
    immediateApprovalItems: reports.humanApprovalQueue.data?.summary.immediateApprovalItems ?? null,
    immediateApprovalReadyItems: reports.humanApprovalQueue.data?.summary.immediateApprovalReadyItems ?? null,
    items: reports.humanApprovalQueue.data?.summary.items ?? null,
    itemsReadyForHumanApproval: reports.humanApprovalQueue.data?.summary.itemsReadyForHumanApproval ?? null,
    itemsWithFailedSourceDecision: reports.humanApprovalQueue.data?.summary.itemsWithFailedSourceDecision ?? null,
    itemsWithMassSearchTheme: reports.humanApprovalQueue.data?.summary.itemsWithMassSearchTheme ?? null,
    itemsWithPopularPromptLane: reports.humanApprovalQueue.data?.summary.itemsWithPopularPromptLane ?? null,
    itemsWithSeoWarnings: reports.humanApprovalQueue.data?.summary.itemsWithSeoWarnings ?? null,
    itemsWithSourceReplacementDecisions: reports.humanApprovalQueue.data?.summary.itemsWithSourceReplacementDecisions ?? null,
    projectedPublicPublishedAfterImmediateHumanApproval:
      reports.humanApprovalQueue.data?.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval ?? null,
    publishConfirmCommandsIncluded: reports.humanApprovalQueue.data?.summary.publishConfirmCommandsIncluded ?? null,
    top: reports.humanApprovalQueue.data?.items ?? [],
    trafficDataAvailable: reports.humanApprovalQueue.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.humanApprovalQueue.data?.summary.unsafeItems ?? null,
  },
  humanApprovalClearancePack: {
    approvalItems: reports.humanApprovalClearancePack.data?.summary.approvalItems ?? null,
    backlogItems: reports.humanApprovalClearancePack.data?.summary.backlogItems ?? null,
    clearanceActions: reports.humanApprovalClearancePack.data?.summary.clearanceActions ?? null,
    copydeskBriefItems: reports.humanApprovalClearancePack.data?.summary.copydeskBriefItems ?? null,
    currentPublicPublished: reports.humanApprovalClearancePack.data?.publishingBoundary.currentPublicPublished ?? null,
    failedSourceDecisionItems: reports.humanApprovalClearancePack.data?.summary.failedSourceDecisionItems ?? null,
    immediateItems: reports.humanApprovalClearancePack.data?.summary.immediateItems ?? null,
    itemsReadyForClearanceReview: reports.humanApprovalClearancePack.data?.summary.itemsReadyForClearanceReview ?? null,
    massSearchThemeItems: reports.humanApprovalClearancePack.data?.summary.massSearchThemeItems ?? null,
    popularPromptLaneItems: reports.humanApprovalClearancePack.data?.summary.popularPromptLaneItems ?? null,
    projectedPublicPublishedAfterImmediateHumanApproval:
      reports.humanApprovalClearancePack.data?.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval ?? null,
    publishConfirmCommandsIncluded: reports.humanApprovalClearancePack.data?.summary.publishConfirmCommandsIncluded ?? null,
    seoWarningItems: reports.humanApprovalClearancePack.data?.summary.seoWarningItems ?? null,
    sourceDecisionItems: reports.humanApprovalClearancePack.data?.summary.sourceDecisionItems ?? null,
    top: reports.humanApprovalClearancePack.data?.items ?? [],
    trafficDataAvailable: reports.humanApprovalClearancePack.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.humanApprovalClearancePack.data?.summary.unsafeItems ?? null,
  },
  nextBatchApprovalRoute: {
    actionItems: reports.nextBatchApprovalRoute.data?.summary.actionItems ?? null,
    batchItems: reports.nextBatchApprovalRoute.data?.summary.batchItems ?? null,
    clearanceMatchedItems: reports.nextBatchApprovalRoute.data?.summary.clearanceMatchedItems ?? null,
    commandBoundaries: reports.nextBatchApprovalRoute.data?.summary.commandBoundaries ?? null,
    copydeskMatchedItems: reports.nextBatchApprovalRoute.data?.summary.copydeskMatchedItems ?? null,
    currentPublicPublished: reports.nextBatchApprovalRoute.data?.summary.currentPublicPublished ?? null,
    currentPublishableNow: reports.nextBatchApprovalRoute.data?.summary.currentPublishableNow ?? null,
    freshnessMatchedItems: reports.nextBatchApprovalRoute.data?.summary.freshnessMatchedItems ?? null,
    itemsReadyForHumanRouteReview: reports.nextBatchApprovalRoute.data?.summary.itemsReadyForHumanRouteReview ?? null,
    nextBatch: reports.nextBatchApprovalRoute.data?.nextBatch ?? null,
    plannedBatchCandidates: reports.nextBatchApprovalRoute.data?.summary.plannedBatchCandidates ?? null,
    publishConfirmCommandsIncluded: reports.nextBatchApprovalRoute.data?.summary.publishConfirmCommandsIncluded ?? null,
    queryCoverageMatchedItems: reports.nextBatchApprovalRoute.data?.summary.queryCoverageMatchedItems ?? null,
    queryMatchWarningItems: reports.nextBatchApprovalRoute.data?.summary.queryMatchWarningItems ?? null,
    routeWarnings: reports.nextBatchApprovalRoute.data?.summary.routeWarnings ?? null,
    seoWarningItems: reports.nextBatchApprovalRoute.data?.summary.seoWarningItems ?? null,
    sourcePackMatchedItems: reports.nextBatchApprovalRoute.data?.summary.sourcePackMatchedItems ?? null,
    top: reports.nextBatchApprovalRoute.data?.items ?? [],
    trafficDataAvailable: reports.nextBatchApprovalRoute.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.nextBatchApprovalRoute.data?.summary.unsafeItems ?? null,
  },
  nextBatchRouteRemediationPack: {
    actionItems: reports.nextBatchRouteRemediationPack.data?.summary.actionItems ?? null,
    batchItems: reports.nextBatchRouteRemediationPack.data?.summary.batchItems ?? null,
    clearanceGapItems: reports.nextBatchRouteRemediationPack.data?.summary.clearanceGapItems ?? null,
    copydeskGapItems: reports.nextBatchRouteRemediationPack.data?.summary.copydeskGapItems ?? null,
    currentPublicPublished: reports.nextBatchRouteRemediationPack.data?.publishingBoundary.currentPublicPublished ?? null,
    currentPublishableNow: reports.nextBatchRouteRemediationPack.data?.publishingBoundary.currentPublishableNow ?? null,
    freshnessWarningItems: reports.nextBatchRouteRemediationPack.data?.summary.freshnessWarningItems ?? null,
    itemsReadyForRemediationReview: reports.nextBatchRouteRemediationPack.data?.summary.itemsReadyForRemediationReview ?? null,
    nextBatch: reports.nextBatchRouteRemediationPack.data?.nextBatch ?? null,
    publishConfirmCommandsIncluded: reports.nextBatchRouteRemediationPack.data?.summary.publishConfirmCommandsIncluded ?? null,
    queryWarningItems: reports.nextBatchRouteRemediationPack.data?.summary.queryWarningItems ?? null,
    routeWarnings: reports.nextBatchRouteRemediationPack.data?.summary.routeWarnings ?? null,
    seoWarningItems: reports.nextBatchRouteRemediationPack.data?.summary.seoWarningItems ?? null,
    top: reports.nextBatchRouteRemediationPack.data?.warningItems ?? [],
    trafficDataAvailable: reports.nextBatchRouteRemediationPack.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.nextBatchRouteRemediationPack.data?.summary.unsafeItems ?? null,
    warningItems: reports.nextBatchRouteRemediationPack.data?.summary.warningItems ?? null,
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
  deploymentSprintBoard: {
    actionItems: reports.deploymentSprintBoard.data?.summary.actionItems ?? null,
    agentItems: reports.deploymentSprintBoard.data?.summary.agentItems ?? null,
    apiIntegrationItems: reports.deploymentSprintBoard.data?.summary.apiIntegrationItems ?? null,
    automationPlatformItems: reports.deploymentSprintBoard.data?.summary.automationPlatformItems ?? null,
    deploymentPublicArticles: reports.deploymentSprintBoard.data?.summary.deploymentPublicArticles ?? null,
    highPriorityItems: reports.deploymentSprintBoard.data?.summary.highPriorityItems ?? null,
    implementationModes: reports.deploymentSprintBoard.data?.summary.implementationModes ?? null,
    items: reports.deploymentSprintBoard.data?.summary.items ?? null,
    itemsPerWave: reports.deploymentSprintBoard.data?.summary.itemsPerWave ?? null,
    lanes: reports.deploymentSprintBoard.data?.summary.lanes ?? null,
    localModelItems: reports.deploymentSprintBoard.data?.summary.localModelItems ?? null,
    memoryItems: reports.deploymentSprintBoard.data?.summary.memoryItems ?? null,
    modelServingItems: reports.deploymentSprintBoard.data?.summary.modelServingItems ?? null,
    publishConfirmCommandsIncluded: reports.deploymentSprintBoard.data?.summary.publishConfirmCommandsIncluded ?? null,
    readyForDeploymentSprint: reports.deploymentSprintBoard.data?.summary.readyForDeploymentSprint ?? null,
    reviewPackItems: reports.deploymentSprintBoard.data?.summary.reviewPackItems ?? null,
    searchQueries: reports.deploymentSprintBoard.data?.summary.searchQueries ?? null,
    sourceTargets: reports.deploymentSprintBoard.data?.summary.sourceTargets ?? null,
    top: reports.deploymentSprintBoard.data?.items.slice(0, 10) ?? [],
    topicsWithoutPublicCoverage: reports.deploymentSprintBoard.data?.summary.topicsWithoutPublicCoverage ?? null,
    trafficDataAvailable: reports.deploymentSprintBoard.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.deploymentSprintBoard.data?.summary.unsafeItems ?? null,
    waves: reports.deploymentSprintBoard.data?.waves ?? [],
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
  massAiSearchMatrix: {
    deploymentBridgedThemes: reports.massAiSearchMatrix.data?.summary.deploymentBridgedThemes ?? null,
    humanGatedItems: reports.massAiSearchMatrix.data?.summary.humanGatedItems ?? null,
    items: reports.massAiSearchMatrix.data?.summary.items ?? null,
    itemsReadyForHumanReviewPrep: reports.massAiSearchMatrix.data?.summary.itemsReadyForHumanReviewPrep ?? null,
    itemsWithHumanReviewActions: reports.massAiSearchMatrix.data?.summary.itemsWithHumanReviewActions ?? null,
    itemsWithSearchSeeds: reports.massAiSearchMatrix.data?.summary.itemsWithSearchSeeds ?? null,
    itemsWithSourceTargets: reports.massAiSearchMatrix.data?.summary.itemsWithSourceTargets ?? null,
    promptBlueprintSamples: reports.massAiSearchMatrix.data?.summary.promptBlueprintSamples ?? null,
    promptBridgedThemes: reports.massAiSearchMatrix.data?.summary.promptBridgedThemes ?? null,
    sourceBroadThemes: reports.massAiSearchMatrix.data?.summary.sourceBroadThemes ?? null,
    sourceTopThemes: reports.massAiSearchMatrix.data?.summary.sourceTopThemes ?? null,
    themesWithoutPublicCoverage: reports.massAiSearchMatrix.data?.summary.themesWithoutPublicCoverage ?? null,
    top: reports.massAiSearchMatrix.data?.topItems ?? [],
    trafficDataAvailable: reports.massAiSearchMatrix.data?.summary.trafficDataAvailable ?? null,
    uniqueCandidateFiles: reports.massAiSearchMatrix.data?.summary.uniqueCandidateFiles ?? null,
    unsafeItems: reports.massAiSearchMatrix.data?.summary.unsafeItems ?? null,
    waves: reports.massAiSearchMatrix.data?.summary.waves ?? null,
  },
  popularAiPromptPlaybook: {
    agentDeploymentLanes: reports.popularAiPromptPlaybook.data?.summary.agentDeploymentLanes ?? null,
    broadWorkPromptLanes: reports.popularAiPromptPlaybook.data?.summary.broadWorkPromptLanes ?? null,
    deploymentBridgeItems: reports.popularAiPromptPlaybook.data?.summary.deploymentBridgeItems ?? null,
    humanGatedItems: reports.popularAiPromptPlaybook.data?.summary.humanGatedItems ?? null,
    items: reports.popularAiPromptPlaybook.data?.summary.items ?? null,
    itemsReadyForHumanReviewPrep: reports.popularAiPromptPlaybook.data?.summary.itemsReadyForHumanReviewPrep ?? null,
    itemsWithCandidateFiles: reports.popularAiPromptPlaybook.data?.summary.itemsWithCandidateFiles ?? null,
    memoryLanes: reports.popularAiPromptPlaybook.data?.summary.memoryLanes ?? null,
    officialSources: reports.popularAiPromptPlaybook.data?.summary.officialSources ?? null,
    promptModuleBridgeItems: reports.popularAiPromptPlaybook.data?.summary.promptModuleBridgeItems ?? null,
    promptTemplates: reports.popularAiPromptPlaybook.data?.summary.promptTemplates ?? null,
    publishConfirmCommandsIncluded: reports.popularAiPromptPlaybook.data?.summary.publishConfirmCommandsIncluded ?? null,
    searchQueries: reports.popularAiPromptPlaybook.data?.summary.searchQueries ?? null,
    top: reports.popularAiPromptPlaybook.data?.topItems ?? [],
    trafficDataAvailable: reports.popularAiPromptPlaybook.data?.summary.trafficDataAvailable ?? null,
    uniqueCandidateFiles: reports.popularAiPromptPlaybook.data?.summary.uniqueCandidateFiles ?? null,
    unsafeItems: reports.popularAiPromptPlaybook.data?.summary.unsafeItems ?? null,
  },
  popularPromptApprovalBridge: {
    approvalQueueItems: reports.popularPromptApprovalBridge.data?.summary.approvalQueueItems ?? null,
    approvalQueueReadyItems: reports.popularPromptApprovalBridge.data?.summary.approvalQueueReadyItems ?? null,
    bridgeItems: reports.popularPromptApprovalBridge.data?.summary.bridgeItems ?? null,
    bridgeItemsReadyForHumanReviewPrep: reports.popularPromptApprovalBridge.data?.summary.bridgeItemsReadyForHumanReviewPrep ?? null,
    commandBoundaries: reports.popularPromptApprovalBridge.data?.summary.commandBoundaries ?? null,
    lanes: reports.popularPromptApprovalBridge.data?.summary.lanes ?? null,
    lanesAlreadyInApprovalQueue: reports.popularPromptApprovalBridge.data?.summary.lanesAlreadyInApprovalQueue ?? null,
    lanesWithNextCandidates: reports.popularPromptApprovalBridge.data?.summary.lanesWithNextCandidates ?? null,
    lanesWithReadyNextCandidates: reports.popularPromptApprovalBridge.data?.summary.lanesWithReadyNextCandidates ?? null,
    playbookItems: reports.popularPromptApprovalBridge.data?.summary.playbookItems ?? null,
    playbookReadyItems: reports.popularPromptApprovalBridge.data?.summary.playbookReadyItems ?? null,
    promptTemplatesReferenced: reports.popularPromptApprovalBridge.data?.summary.promptTemplatesReferenced ?? null,
    publishConfirmCommandsIncluded: reports.popularPromptApprovalBridge.data?.summary.publishConfirmCommandsIncluded ?? null,
    reviewCandidatePool: reports.popularPromptApprovalBridge.data?.summary.reviewCandidatePool ?? null,
    searchQueriesReferenced: reports.popularPromptApprovalBridge.data?.summary.searchQueriesReferenced ?? null,
    top: reports.popularPromptApprovalBridge.data?.topItems ?? [],
    trafficDataAvailable: reports.popularPromptApprovalBridge.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.popularPromptApprovalBridge.data?.summary.unsafeItems ?? null,
    uniqueFiles: reports.popularPromptApprovalBridge.data?.summary.uniqueFiles ?? null,
  },
  popularPromptSprintBoard: {
    actionItems: reports.popularPromptSprintBoard.data?.summary.actionItems ?? null,
    bridgeItems: reports.popularPromptSprintBoard.data?.summary.bridgeItems ?? null,
    candidateFiles: reports.popularPromptSprintBoard.data?.summary.candidateFiles ?? null,
    highPriorityItems: reports.popularPromptSprintBoard.data?.summary.highPriorityItems ?? null,
    industryBuckets: reports.popularPromptSprintBoard.data?.summary.industryBuckets ?? null,
    items: reports.popularPromptSprintBoard.data?.summary.items ?? null,
    itemsPerWave: reports.popularPromptSprintBoard.data?.summary.itemsPerWave ?? null,
    lanesReadyForPromptSprint: reports.popularPromptSprintBoard.data?.summary.lanesReadyForPromptSprint ?? null,
    nextCandidateFiles: reports.popularPromptSprintBoard.data?.summary.nextCandidateFiles ?? null,
    playbookItems: reports.popularPromptSprintBoard.data?.summary.playbookItems ?? null,
    promptTemplateSamples: reports.popularPromptSprintBoard.data?.summary.promptTemplateSamples ?? null,
    promptTemplates: reports.popularPromptSprintBoard.data?.summary.promptTemplates ?? null,
    publishConfirmCommandsIncluded: reports.popularPromptSprintBoard.data?.summary.publishConfirmCommandsIncluded ?? null,
    searchQueries: reports.popularPromptSprintBoard.data?.summary.searchQueries ?? null,
    top: reports.popularPromptSprintBoard.data?.items.slice(0, 10) ?? [],
    trafficDataAvailable: reports.popularPromptSprintBoard.data?.summary.trafficDataAvailable ?? null,
    unsafeItems: reports.popularPromptSprintBoard.data?.summary.unsafeItems ?? null,
    waves: reports.popularPromptSprintBoard.data?.waves ?? [],
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
    broadFirstCoverageItems: reports.publicCoverageGapPreflight.data?.summary.broadFirstCoverageItems ?? null,
    broadFirstCoveragePreflightItems: reports.publicCoverageGapPreflight.data?.summary.broadFirstCoveragePreflightItems ?? null,
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
  industryPromptOpportunityBoard: {
    departmentLanes: reports.industryPromptOpportunityBoard.data?.summary.departmentLanes ?? null,
    itemsWithHumanBoundary: reports.industryPromptOpportunityBoard.data?.summary.itemsWithHumanBoundary ?? null,
    itemsWithInputOutputStructure: reports.industryPromptOpportunityBoard.data?.summary.itemsWithInputOutputStructure ?? null,
    itemsWithReviewPackCandidate: reports.industryPromptOpportunityBoard.data?.summary.itemsWithReviewPackCandidate ?? null,
    itemsWithSourceTargets: reports.industryPromptOpportunityBoard.data?.summary.itemsWithSourceTargets ?? null,
    opportunities: reports.industryPromptOpportunityBoard.data?.summary.opportunities ?? null,
    promptModules: reports.industryPromptOpportunityBoard.data?.summary.promptModules ?? null,
    searchQueryFamilies: reports.industryPromptOpportunityBoard.data?.summary.searchQueryFamilies ?? null,
    top: reports.industryPromptOpportunityBoard.data?.topOpportunities ?? [],
    unsafeItems: reports.industryPromptOpportunityBoard.data?.summary.unsafeItems ?? null,
    zeroPublicCoverageItems: reports.industryPromptOpportunityBoard.data?.summary.zeroPublicCoverageItems ?? null,
  },
  industryPromptModulePack: {
    humanGatedItems: reports.industryPromptModulePack.data?.summary.humanGatedItems ?? null,
    items: reports.industryPromptModulePack.data?.summary.items ?? null,
    itemsWithCopyPrompts: reports.industryPromptModulePack.data?.summary.itemsWithCopyPrompts ?? null,
    itemsWithInputOutputStructure: reports.industryPromptModulePack.data?.summary.itemsWithInputOutputStructure ?? null,
    itemsWithReviewPackCandidate: reports.industryPromptModulePack.data?.summary.itemsWithReviewPackCandidate ?? null,
    itemsWithRiskControls: reports.industryPromptModulePack.data?.summary.itemsWithRiskControls ?? null,
    itemsWithSourceTargets: reports.industryPromptModulePack.data?.summary.itemsWithSourceTargets ?? null,
    modulesPerOpportunityMin: reports.industryPromptModulePack.data?.summary.modulesPerOpportunityMin ?? null,
    promptBlueprints: reports.industryPromptModulePack.data?.summary.promptBlueprints ?? null,
    top: reports.industryPromptModulePack.data?.topItems ?? [],
    unsafeItems: reports.industryPromptModulePack.data?.summary.unsafeItems ?? null,
    zeroPublicCoverageItems: reports.industryPromptModulePack.data?.summary.zeroPublicCoverageItems ?? null,
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
    seoWarningDraftItems: reports.workbench.data?.seoWarningRemediation?.summary?.draftItems ?? null,
    seoWarningHumanGatedItems: reports.workbench.data?.seoWarningRemediation?.summary?.humanGatedItems ?? null,
    seoWarningItems: reports.workbench.data?.seoWarningRemediation?.summary?.items ?? null,
    seoWarningPublicItems: reports.workbench.data?.seoWarningRemediation?.summary?.publicItems ?? null,
    seoWarningTopItems: reports.workbench.data?.seoWarningRemediation?.topItems?.length ?? null,
    seoWarningUnsafeItems: reports.workbench.data?.seoWarningRemediation?.summary?.unsafeItems ?? null,
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
  if (!reports.publicSurfaceInventory.data || reports.publicSurfaceInventory.data.summary.unsafeItems > 0) {
    return ["Open docs/public-surface-inventory.md and resolve public surface inventory issues before choosing the next review batch."];
  }
  if (
    !reports.publicSearchRefreshPack.data ||
    reports.publicSearchRefreshPack.data.summary.unsafeItems > 0 ||
    reports.publicSearchRefreshPack.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/public-search-refresh-pack.md and resolve public search refresh issues before editing public pages."];
  }
  if (
    !reports.publicRefreshSprintBoard.data ||
    reports.publicRefreshSprintBoard.data.summary.unsafeItems > 0 ||
    reports.publicRefreshSprintBoard.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/public-refresh-sprint-board.md and resolve public refresh sprint issues before editing public pages."];
  }
  if (!reports.contentIntegrity.data || reports.contentIntegrity.data.summary.blockingItems > 0) {
    return ["Open docs/content-integrity-audit.md and fix content integrity blockers before any review or publish action."];
  }
  if (!reports.internalLinks.data || reports.internalLinks.data.summary.waveItemsMissingPublicLinkSuggestion > 0) {
    return ["Open docs/internal-link-opportunity-audit.md and add or approve internal link suggestions for Wave 1 before publishing."];
  }
  if (
    !reports.internalLinkSprintBoard.data ||
    reports.internalLinkSprintBoard.data.summary.unsafeItems > 0 ||
    reports.internalLinkSprintBoard.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/internal-link-sprint-board.md and resolve internal link sprint issues before editing article bodies."];
  }
  if (!reports.sourceHealth.data || reports.sourceHealth.data.summary.filesWithoutReachableSource > 0 || reports.sourceHealth.data.summary.missingUrlTargets > 0) {
    return ["Open docs/source-target-health-audit.md and replace missing or unreachable official source targets before manual review."];
  }
  if (!reports.sourceTargetRemediation.data || reports.sourceTargetRemediation.data.summary.unsafeItems > 0) {
    return ["Open docs/source-target-remediation-pack.md and resolve unsafe source URL remediation items before manual review."];
  }
  if (!reports.sourceReplacementDecisions.data || reports.sourceReplacementDecisions.data.summary.unsafeItems > 0) {
    return ["Open docs/source-replacement-decision-pack.md and resolve unsafe file-level source replacement decisions before manual review."];
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
  if (!reports.autopilotApprovalRemediation.data || reports.autopilotApprovalRemediation.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-approval-remediation-pack.md and resolve unsafe approval remediation items before any mark:review command."];
  }
  if (!reports.autopilotReviewSprintBoard.data || reports.autopilotReviewSprintBoard.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-review-sprint-board.md and resolve unsafe sprint items before assigning manual review work."];
  }
  if (!reports.autopilotSearchQueryGapBrief.data || reports.autopilotSearchQueryGapBrief.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-search-query-gap-brief.md and resolve unsafe search-query gap items before manual review."];
  }
  if (!reports.autopilotQueuedPlaybookBrief.data || reports.autopilotQueuedPlaybookBrief.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-queued-playbook-brief.md and resolve unsafe queued playbook items before manual review."];
  }
  if (!reports.autopilotQueuedRemediation.data || reports.autopilotQueuedRemediation.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-queued-remediation-pack.md and resolve unsafe queued remediation items before any mark:review command."];
  }
  if (!reports.searchDemandIntake.data || reports.searchDemandIntake.data.summary.unsafeLanes > 0) {
    return ["Open docs/search-demand-intake.md and resolve unsafe search-demand lanes before expanding review work."];
  }
  if (!reports.searchDemandReviewPack.data || reports.searchDemandReviewPack.data.summary.unsafeItems > 0) {
    return ["Open docs/search-demand-review-pack.md and resolve unsafe search-demand review items before any mark:review command."];
  }
  if (!reports.searchDemandPublicationBridge.data || reports.searchDemandPublicationBridge.data.summary.blockingItems > 0) {
    return ["Open docs/search-demand-publication-bridge.md and resolve search-demand publication blockers before any mark:review command."];
  }
  if (!reports.autopilotBroadAiDemandBrief.data || reports.autopilotBroadAiDemandBrief.data.summary.unsafeClusters > 0) {
    return ["Open docs/autopilot-broad-ai-demand-brief.md and resolve unsafe broad AI demand clusters before expanding review work."];
  }
  if (!reports.autopilotBroadFreshnessTriage.data || reports.autopilotBroadFreshnessTriage.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-broad-freshness-triage.md and resolve unsafe broad freshness triage items before expanding review work."];
  }
  if (!reports.autopilotBroadPublishWaves.data || reports.autopilotBroadPublishWaves.data.summary.unsafeItems > 0 || reports.autopilotBroadPublishWaves.data.summary.unsafeWaves > 0) {
    return ["Open docs/autopilot-broad-publish-waves.md and resolve unsafe broad publish waves before any approval action."];
  }
  if (!reports.autopilotBroadWaveOptimization.data || reports.autopilotBroadWaveOptimization.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-broad-wave-optimization.md and resolve unsafe broad wave optimization items before any approval action."];
  }
  if (!reports.autopilotBroadWaveRemediation.data || reports.autopilotBroadWaveRemediation.data.summary.unsafeItems > 0) {
    return ["Open docs/autopilot-broad-wave-remediation-pack.md and resolve unsafe broad wave remediation items before any approval action."];
  }
  if (!reports.massAiSearchMatrix.data || reports.massAiSearchMatrix.data.summary.unsafeItems > 0) {
    return ["Open docs/mass-ai-search-action-matrix.md and resolve unsafe broad AI search action items before manual review."];
  }
  if (
    !reports.popularAiPromptPlaybook.data ||
    reports.popularAiPromptPlaybook.data.summary.unsafeItems > 0 ||
    reports.popularAiPromptPlaybook.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/popular-ai-prompt-playbook.md and resolve popular AI prompt playbook guardrail issues before manual review."];
  }
  if (
    !reports.popularPromptApprovalBridge.data ||
    reports.popularPromptApprovalBridge.data.summary.unsafeItems > 0 ||
    reports.popularPromptApprovalBridge.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/popular-prompt-approval-bridge.md and resolve popular prompt approval bridge guardrail issues before manual review."];
  }
  if (
    !reports.popularPromptSprintBoard.data ||
    reports.popularPromptSprintBoard.data.summary.unsafeItems > 0 ||
    reports.popularPromptSprintBoard.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/popular-prompt-sprint-board.md and resolve popular prompt sprint issues before manual review."];
  }
  if (!reports.broadFirstCoverageLaunchPack.data || reports.broadFirstCoverageLaunchPack.data.summary.unsafeItems > 0) {
    return ["Open docs/broad-first-coverage-launch-pack.md and resolve unsafe first-coverage launch candidates before any approval action."];
  }
  if (!reports.broadFirstCoverageReadinessMatrix.data || reports.broadFirstCoverageReadinessMatrix.data.summary.unsafeItems > 0) {
    return ["Open docs/broad-first-coverage-readiness-matrix.md and resolve first-coverage readiness blockers before any approval action."];
  }
  if (!reports.humanApprovalQueue.data || reports.humanApprovalQueue.data.summary.unsafeItems > 0 || reports.humanApprovalQueue.data.summary.publishConfirmCommandsIncluded > 0) {
    return ["Open docs/human-approval-execution-queue.md and resolve approval queue guardrail issues before any approval action."];
  }
  if (
    !reports.humanApprovalClearancePack.data ||
    reports.humanApprovalClearancePack.data.summary.unsafeItems > 0 ||
    reports.humanApprovalClearancePack.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/human-approval-clearance-pack.md and resolve approval clearance issues before any mark:review action."];
  }
  if (
    !reports.nextBatchApprovalRoute.data ||
    reports.nextBatchApprovalRoute.data.summary.unsafeItems > 0 ||
    reports.nextBatchApprovalRoute.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/next-batch-approval-route.md and resolve next-batch route issues before any mark:review action."];
  }
  if (
    !reports.nextBatchRouteRemediationPack.data ||
    reports.nextBatchRouteRemediationPack.data.summary.unsafeItems > 0 ||
    reports.nextBatchRouteRemediationPack.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/next-batch-route-remediation-pack.md and resolve next-batch remediation issues before any mark:review action."];
  }
  if (!reports.reviewOptimizationBrief.data || reports.reviewOptimizationBrief.data.summary.unsafeCommands > 0) {
    return ["Open docs/review-optimization-brief.md and resolve unsafe or missing copydesk guidance before manual review."];
  }
  if (
    !reports.reviewCannibalizationBrief.data ||
    !reports.reviewCollisionDecisionPack.data ||
    reports.reviewCollisionDecisionPack.data.summary.decisionItems !== reports.reviewCannibalizationBrief.data.summary.highRiskItems ||
    reports.reviewCollisionDecisionPack.data.summary.blockingItems > 0
  ) {
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
  if (
    !reports.deploymentSprintBoard.data ||
    reports.deploymentSprintBoard.data.summary.unsafeItems > 0 ||
    reports.deploymentSprintBoard.data.summary.publishConfirmCommandsIncluded > 0
  ) {
    return ["Open docs/ai-deployment-sprint-board.md and resolve deployment sprint issues before manual review."];
  }
  if (!reports.promptReviewPack.data || reports.promptReviewPack.data.summary.unsafeItems > 0 || reports.promptReviewPack.data.summary.duplicateFiles > 0) {
    return ["Open docs/industry-prompt-review-pack.md and resolve prompt review pack safety or duplicate-file issues before manual review."];
  }
  if (!reports.industryPromptOpportunityBoard.data || reports.industryPromptOpportunityBoard.data.summary.unsafeItems > 0) {
    return ["Open docs/industry-prompt-opportunity-board.md and resolve prompt opportunity board safety issues before manual review."];
  }
  if (!reports.industryPromptModulePack.data || reports.industryPromptModulePack.data.summary.unsafeItems > 0) {
    return ["Open docs/industry-prompt-module-pack.md and resolve prompt blueprint safety issues before using them in article review."];
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
    "Use docs/public-surface-inventory.md to confirm what is public now and which broad AI clusters still have zero public coverage.",
    "Use docs/public-coverage-gap-decision-pack.md to review the 8 broad-demand public gap candidates and their optimization actions.",
    "Use docs/ai-deployment-review-pack.md to review the 10 deployment, Agent, RAG, memory, API, and infrastructure candidates.",
    "Use docs/industry-prompt-review-pack.md to review the 12 deduplicated high-demand industry prompt candidates.",
    "Use docs/industry-prompt-opportunity-board.md to turn broad department prompt searches into specific prompt-pack page ideas.",
    "Use docs/industry-prompt-module-pack.md to deepen each department prompt page with reusable input/output prompt blueprints.",
    "Use docs/next-review-source-pack.md to fact-check official sources for the roadmap's next review files.",
    "Use docs/source-target-health-audit.md to confirm official source links are reachable before approving fast-changing AI guidance.",
    "Use docs/source-target-remediation-pack.md to replace failed source URLs and confirm canonical redirected source URLs during human review.",
    "Use docs/review-action-board.md as the prioritized task board for Wave 1 and public-gap manual review.",
    "Use docs/review-portfolio-board.md to deduplicate Wave, public-gap, deployment, and prompt review candidates before assigning manual review.",
    "Use docs/autopilot-review-queue.md as the ordered next-10 manual review assignment queue.",
    "Use docs/autopilot-approval-packet.md as the top-3 packet for human approval.",
    "Use docs/autopilot-search-intent-brief.md to tune top-3 search-intent wording during human review.",
    "Use docs/internal-link-sprint-board.md to add one contextual public internal link per candidate during manual review.",
    "Use docs/autopilot-internal-link-brief.md to add one contextual public internal link during human review.",
    "Use docs/autopilot-source-verification-brief.md to verify top-3 official sources and fast-changing claims during human review.",
    "Use docs/autopilot-human-review-playbook.md as the merged top-3 checklist before any mark:review command.",
    "Use docs/autopilot-review-sprint-board.md as the next-10 manual review sprint order.",
    "Use docs/autopilot-search-query-gap-brief.md to fill next-10 search-query gaps during manual review.",
    "Use docs/autopilot-queued-playbook-brief.md to review the 7 queued sprint items with merged search, source, freshness, and link actions.",
    "Use docs/autopilot-broad-ai-demand-brief.md to prioritize broad AI deployment, Agent, memory, RAG, and industry prompt themes.",
    "Use docs/autopilot-broad-freshness-triage.md to fact-check high-demand AI drafts before any approval action.",
    "Use docs/autopilot-broad-publish-waves.md to review 1-3 high-demand AI drafts per human-approved batch.",
    "Use docs/autopilot-broad-wave-optimization.md to apply SEO snippet, opening, internal-link, and risk-language improvements during human review.",
    "Use docs/broad-first-coverage-launch-pack.md to review one first-coverage candidate for each broad AI cluster with zero public coverage.",
    "Use docs/broad-first-coverage-readiness-matrix.md to resolve source, snippet, schema, link, query, and freshness warnings for the first-coverage candidates.",
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
    "## Internal Link Sprint Board",
    "",
    `- Items: ${data.internalLinkSprintBoard.items}`,
    `- Candidate items: ${data.internalLinkSprintBoard.candidateItems}`,
    `- Public articles: ${data.internalLinkSprintBoard.publicArticles}`,
    `- Waves: ${data.internalLinkSprintBoard.waves.length}`,
    `- Items per wave: ${data.internalLinkSprintBoard.itemsPerWave}`,
    `- Ready for internal link sprint: ${data.internalLinkSprintBoard.readyForInternalLinkSprint}`,
    `- Candidates without current public links: ${data.internalLinkSprintBoard.candidatesWithoutCurrentPublicLinks}`,
    `- Suggested public links: ${data.internalLinkSprintBoard.suggestedPublicLinks}`,
    `- Action items: ${data.internalLinkSprintBoard.actionItems}`,
    `- Publish confirm commands included: ${data.internalLinkSprintBoard.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.internalLinkSprintBoard.trafficDataAvailable}`,
    `- Unsafe items: ${data.internalLinkSprintBoard.unsafeItems}`,
    "",
    "| Wave | Ready | Actions | Suggestions | Scopes | Files |",
    "| ---: | ---: | ---: | ---: | --- | --- |",
    ...data.internalLinkSprintBoard.waves.map(
      (wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.actionItems} | ${wave.suggestedPublicLinks} | ${wave.scopes.join(", ")} | ${wave.files.join("<br>")} |`,
    ),
    "",
    "| Wave | Ready | Score | Public links | Suggestions | Scopes | Top target | Title | File |",
    "| ---: | --- | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...data.internalLinkSprintBoard.top.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForInternalLinkSprint} | ${item.priorityScore} | ${item.linksToPublicArticles} | ${item.suggestedLinks.length} | ${item.scopes.join(", ")} | ${item.suggestedLinks[0]?.url || "none"} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Source Target Health",
    "",
    `- Files covered: ${data.sourceHealth.filesCovered}`,
    `- Files with reachable source: ${data.sourceHealth.filesWithReachableSource}`,
    `- Files without reachable source: ${data.sourceHealth.filesWithoutReachableSource}`,
    `- Broad first coverage files: ${data.sourceHealth.broadFirstCoverageFiles}`,
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
    "## Source Target Remediation",
    "",
    `- Items: ${data.sourceTargetRemediation.items}`,
    `- Failed URL items: ${data.sourceTargetRemediation.failedUrlItems}`,
    `- Failed URL items with replacement candidates: ${data.sourceTargetRemediation.failedItemsWithReplacementCandidates}`,
    `- Replacement candidate options: ${data.sourceTargetRemediation.replacementCandidateOptions}`,
    `- Redirected URL items: ${data.sourceTargetRemediation.redirectedUrlItems}`,
    `- Manual-fix-ready items: ${data.sourceTargetRemediation.manualFixReadyItems}`,
    `- Human-gated items: ${data.sourceTargetRemediation.humanGatedItems}`,
    `- Unsafe items: ${data.sourceTargetRemediation.unsafeItems}`,
    `- Source health checked URLs: ${data.sourceTargetRemediation.sourceHealthCheckedUrls}`,
    "",
    "Unsafe source remediation items:",
    "",
    ...(data.sourceTargetRemediation.unsafeItemList.length
      ? data.sourceTargetRemediation.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`)
      : ["- none"]),
    "",
    "| Ready | Kind | References | Replacement candidates | Files | URL | Final URL / Issue |",
    "| --- | --- | ---: | ---: | --- | --- | --- |",
    ...data.sourceTargetRemediation.itemsList.map(
      (item) =>
        `| ${item.manualFixReady} | ${item.kind} | ${item.referenceCount} | ${item.replacementCandidates?.length || 0} | ${item.affectedFiles.join("<br>")} | ${item.url} | ${item.finalUrl || item.error || "review manually"} |`,
    ),
    "",
    "## Source Replacement Decisions",
    "",
    `- Items: ${data.sourceReplacementDecisions.items}`,
    `- Affected files: ${data.sourceReplacementDecisions.affectedFiles}`,
    `- Failed decision items: ${data.sourceReplacementDecisions.failedDecisionItems}`,
    `- Redirected decision items: ${data.sourceReplacementDecisions.redirectedDecisionItems}`,
    `- Items with recommended candidate: ${data.sourceReplacementDecisions.itemsWithRecommendedCandidate}`,
    `- Official recommended candidates: ${data.sourceReplacementDecisions.officialRecommendedCandidates}`,
    `- Replacement candidate options: ${data.sourceReplacementDecisions.replacementCandidateOptions}`,
    `- Human-gated items: ${data.sourceReplacementDecisions.humanGatedItems}`,
    `- Unsafe items: ${data.sourceReplacementDecisions.unsafeItems}`,
    "",
    "Unsafe source replacement decisions:",
    "",
    ...(data.sourceReplacementDecisions.unsafeItemList.length
      ? data.sourceReplacementDecisions.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`)
      : ["- none"]),
    "",
    "| Kind | Recommended | Alternatives | Scopes | Title | File | URL |",
    "| --- | --- | ---: | --- | --- | --- | --- |",
    ...data.sourceReplacementDecisions.top.map(
      (item) =>
        `| ${item.kind} | ${item.recommendedCandidate ? `${item.recommendedCandidate.title} (${item.recommendedCandidate.sourceType})` : "review redirect"} | ${item.alternatives.length} | ${item.scopes.join(", ") || "unknown"} | ${item.title} | ${item.file} | ${item.originalUrl} |`,
    ),
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
    "## Autopilot Approval Remediation Pack",
    "",
    `- Items: ${data.autopilotApprovalRemediation.items}`,
    `- Approval items: ${data.autopilotApprovalRemediation.approvalItems}`,
    `- Manual fix ready items: ${data.autopilotApprovalRemediation.manualFixReadyItems}`,
    `- Items with remediation reasons: ${data.autopilotApprovalRemediation.itemsWithRemediationReasons}`,
    `- Items with command boundary: ${data.autopilotApprovalRemediation.itemsWithCommandBoundary}`,
    `- Items with internal-link fixes: ${data.autopilotApprovalRemediation.itemsWithInternalLinkFixes}`,
    `- Items with search fixes: ${data.autopilotApprovalRemediation.itemsWithSearchFixes}`,
    `- Items with source checks: ${data.autopilotApprovalRemediation.itemsWithSourceChecks}`,
    `- Items with source URL fixes: ${data.autopilotApprovalRemediation.itemsWithSourceUrlFixes}`,
    `- Source URL fix actions: ${data.autopilotApprovalRemediation.sourceUrlFixActions}`,
    `- Unsafe items: ${data.autopilotApprovalRemediation.unsafeItems}`,
    "",
    "Unsafe approval remediation items:",
    "",
    ...(data.autopilotApprovalRemediation.unsafeItemList.length ? data.autopilotApprovalRemediation.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Reasons | Search fixes | Link fixes | Source checks | URL fixes | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotApprovalRemediation.itemsList.map(
      (item) =>
        `| ${item.manualFixReady} | ${item.remediationReasons.length} | ${item.searchFixes.length} | ${item.internalLinkFixes.length} | ${item.sourceChecks.length} | ${item.sourceUrlFixes.length} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
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
    "## Autopilot Search Query Gap Brief",
    "",
    `- Items: ${data.autopilotSearchQueryGapBrief.items}`,
    `- Ready items: ${data.autopilotSearchQueryGapBrief.readyItems}`,
    `- Safe draft items: ${data.autopilotSearchQueryGapBrief.safeDraftItems}`,
    `- Items with command boundary: ${data.autopilotSearchQueryGapBrief.itemsWithCommandBoundary}`,
    `- Items with coverage evidence: ${data.autopilotSearchQueryGapBrief.itemsWithCoverageEvidence}`,
    `- Items with fact-check queries: ${data.autopilotSearchQueryGapBrief.itemsWithFactCheckQueries}`,
    `- Items with official sources: ${data.autopilotSearchQueryGapBrief.itemsWithOfficialSources}`,
    `- Items with recommended queries: ${data.autopilotSearchQueryGapBrief.itemsWithRecommendedQueries}`,
    `- Total recommended queries: ${data.autopilotSearchQueryGapBrief.totalRecommendedQueries}`,
    `- Unsafe items: ${data.autopilotSearchQueryGapBrief.unsafeItems}`,
    "",
    "Unsafe search-query gap items:",
    "",
    ...(data.autopilotSearchQueryGapBrief.unsafeItemList.length ? data.autopilotSearchQueryGapBrief.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Order | Ready | Sources | Queries | Primary keyword | Coverage lane | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotSearchQueryGapBrief.itemsList.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.readyForManualSearchQueryReview} | ${item.officialSourceTargets.length} | ${item.recommendedSearchQueries.length} | ${item.primaryKeyword} | ${item.coverageLane} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Queued Playbook Brief",
    "",
    `- Items: ${data.autopilotQueuedPlaybookBrief.items}`,
    `- Ready items: ${data.autopilotQueuedPlaybookBrief.readyItems}`,
    `- Safe draft items: ${data.autopilotQueuedPlaybookBrief.safeDraftItems}`,
    `- Items with command boundary: ${data.autopilotQueuedPlaybookBrief.itemsWithCommandBoundary}`,
    `- Items with search actions: ${data.autopilotQueuedPlaybookBrief.itemsWithSearchActions}`,
    `- Items with search queries: ${data.autopilotQueuedPlaybookBrief.itemsWithSearchQueries}`,
    `- Items with source actions: ${data.autopilotQueuedPlaybookBrief.itemsWithSourceActions}`,
    `- Items with source targets: ${data.autopilotQueuedPlaybookBrief.itemsWithSourceTargets}`,
    `- Items with source evidence: ${data.autopilotQueuedPlaybookBrief.itemsWithSourceEvidence}`,
    `- Items with fact-check queries: ${data.autopilotQueuedPlaybookBrief.itemsWithFactCheckQueries}`,
    `- Items with risk checklist: ${data.autopilotQueuedPlaybookBrief.itemsWithRiskChecklist}`,
    `- Items with internal-link suggestions: ${data.autopilotQueuedPlaybookBrief.itemsWithInternalLinkSuggestions}`,
    `- Items with optimization actions: ${data.autopilotQueuedPlaybookBrief.itemsWithOptimizationActions}`,
    `- Unsafe items: ${data.autopilotQueuedPlaybookBrief.unsafeItems}`,
    "",
    "Unsafe queued playbook items:",
    "",
    ...(data.autopilotQueuedPlaybookBrief.unsafeItemList.length ? data.autopilotQueuedPlaybookBrief.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Order | Ready | Safe | Search | Sources | Links | Risk checks | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotQueuedPlaybookBrief.itemsList.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.readyForHumanReview} | ${item.safeDraft} | ${item.searchQueries.length}/${item.searchActions.length} | ${item.sourceTargets.length}/${item.sourceActions.length} | ${item.internalLinkSuggestions.length} | ${item.riskReviewChecklist.length} | ${item.manualOnlyCommands.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.manualOnlyCommands.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Queued Remediation Pack",
    "",
    `- Items: ${data.autopilotQueuedRemediation.items}`,
    `- Queued items: ${data.autopilotQueuedRemediation.queuedItems}`,
    `- Manual fix ready items: ${data.autopilotQueuedRemediation.manualFixReadyItems}`,
    `- Items with remediation reasons: ${data.autopilotQueuedRemediation.itemsWithRemediationReasons}`,
    `- Items with command boundary: ${data.autopilotQueuedRemediation.itemsWithCommandBoundary}`,
    `- Items with internal-link fixes: ${data.autopilotQueuedRemediation.itemsWithInternalLinkFixes}`,
    `- Items with search fixes: ${data.autopilotQueuedRemediation.itemsWithSearchFixes}`,
    `- Items with source checks: ${data.autopilotQueuedRemediation.itemsWithSourceChecks}`,
    `- Items with risk checks: ${data.autopilotQueuedRemediation.itemsWithRiskChecks}`,
    `- Unsafe items: ${data.autopilotQueuedRemediation.unsafeItems}`,
    "",
    "Unsafe queued remediation items:",
    "",
    ...(data.autopilotQueuedRemediation.unsafeItemList.length ? data.autopilotQueuedRemediation.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Order | Ready | Reasons | Search fixes | Source checks | Link fixes | Risk checks | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotQueuedRemediation.itemsList.map(
      (item) =>
        `| ${item.sprintOrder} | ${item.manualFixReady} | ${item.remediationReasons.length} | ${item.searchFixes.length} | ${item.sourceChecks.length} | ${item.internalLinkFixes.length} | ${item.riskChecks.length} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Search Demand Intake",
    "",
    `- Lanes: ${data.searchDemandIntake.lanes}`,
    `- Lanes with ready candidates: ${data.searchDemandIntake.lanesWithReadyCandidates}`,
    `- Lanes without public coverage: ${data.searchDemandIntake.lanesWithoutPublicCoverage}`,
    `- Search queries: ${data.searchDemandIntake.searchQueries}`,
    `- Official source targets: ${data.searchDemandIntake.officialSourceTargets}`,
    `- Content formats: ${data.searchDemandIntake.contentFormats}`,
    `- Ready candidate files: ${data.searchDemandIntake.readyCandidateFiles}`,
    `- Review queue matches: ${data.searchDemandIntake.reviewQueueMatches}`,
    `- Unsafe lanes: ${data.searchDemandIntake.unsafeLanes}`,
    "",
    "Unsafe search-demand lanes:",
    "",
    ...(data.searchDemandIntake.unsafeLaneList.length ? data.searchDemandIntake.unsafeLaneList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Score | Public | Drafts | Ready | Queue | Queries | Sources | Lane | User problem |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.searchDemandIntake.lanesList.map(
      (lane) =>
        `| ${lane.intakeScore} | ${lane.publicMatches} | ${lane.draftMatches} | ${lane.readyCandidates.length} | ${lane.reviewQueueMatches} | ${lane.searchQueries.length} | ${lane.officialSourceTargets.length} | ${lane.lane} | ${lane.userProblem} |`,
    ),
    "",
    "## Search Demand Review Pack",
    "",
    `- Items: ${data.searchDemandReviewPack.items}`,
    `- Lanes: ${data.searchDemandReviewPack.lanes}`,
    `- Ready items: ${data.searchDemandReviewPack.readyItems}`,
    `- Safe draft items: ${data.searchDemandReviewPack.safeDraftItems}`,
    `- Review queue matched items: ${data.searchDemandReviewPack.reviewQueueMatchedItems}`,
    `- Zero-public lane items: ${data.searchDemandReviewPack.zeroPublicLaneItems}`,
    `- Items per lane max: ${data.searchDemandReviewPack.itemsPerLaneMax}`,
    `- Items with command boundary: ${data.searchDemandReviewPack.itemsWithCommandBoundary}`,
    `- Items with official sources: ${data.searchDemandReviewPack.itemsWithOfficialSources}`,
    `- Items with search queries: ${data.searchDemandReviewPack.itemsWithSearchQueries}`,
    `- Items with human checklist: ${data.searchDemandReviewPack.itemsWithHumanChecklist}`,
    `- Items with internal-link suggestion: ${data.searchDemandReviewPack.itemsWithInternalLinkSuggestion}`,
    `- Fact-check queries: ${data.searchDemandReviewPack.factCheckQueries}`,
    `- Unsafe items: ${data.searchDemandReviewPack.unsafeItems}`,
    "",
    "Unsafe search-demand review items:",
    "",
    ...(data.searchDemandReviewPack.unsafeItemList.length ? data.searchDemandReviewPack.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Score | Ready | Safe | Lane | Public | Queue | Sources | Queries | Link | Warnings | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.searchDemandReviewPack.itemsList.map(
      (item) =>
        `| ${item.priorityScore} | ${item.readyForHumanReview} | ${item.safeDraft} | ${item.lane} | ${item.publicMatches} | ${item.reviewQueueMatched} | ${item.officialSourceTargets.length} | ${item.searchQueries.length} | ${Boolean(item.publicInternalLinkSuggestion)} | ${item.warningIssues.length} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Search Demand Publication Bridge",
    "",
    `- Items: ${data.searchDemandPublicationBridge.items}`,
    `- Review pack items: ${data.searchDemandPublicationBridge.reviewPackItems}`,
    `- Human approval ready items: ${data.searchDemandPublicationBridge.humanApprovalReadyItems}`,
    `- Indexing-safe items: ${data.searchDemandPublicationBridge.indexingSafeItems}`,
    `- Search snippet ready items: ${data.searchDemandPublicationBridge.searchSnippetReadyItems}`,
    `- Schema ready items: ${data.searchDemandPublicationBridge.schemaReadyItems}`,
    `- Source ready items: ${data.searchDemandPublicationBridge.sourceReadyItems}`,
    `- Review-pack ready items: ${data.searchDemandPublicationBridge.reviewPackReadyItems}`,
    `- Internal-link ready items: ${data.searchDemandPublicationBridge.internalLinkReadyItems}`,
    `- Blocking items: ${data.searchDemandPublicationBridge.blockingItems}`,
    `- Warning items: ${data.searchDemandPublicationBridge.warningItems}`,
    "",
    "Blocking search-demand bridge items:",
    "",
    ...(data.searchDemandPublicationBridge.blockingItemList.length ? data.searchDemandPublicationBridge.blockingItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Snippet | Schema | Source | Link | Draft safe | Review pack | Warnings | Publish confirm | Lane | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.searchDemandPublicationBridge.itemsList.map(
      (item) =>
        `| ${item.humanApprovalReady} | ${item.searchSnippetReady} | ${item.schemaReady} | ${item.sourceReady} | ${item.internalLinkReady} | ${item.indexingSafe} | ${item.reviewPackReady} | ${item.warningIssues.length} | ${item.commandBoundary.publishConfirm} | ${item.lane} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Broad AI Demand Brief",
    "",
    `- Clusters: ${data.autopilotBroadAiDemandBrief.clusters}`,
    `- Clusters with ready candidates: ${data.autopilotBroadAiDemandBrief.clustersWithReadyCandidates}`,
    `- Clusters without public coverage: ${data.autopilotBroadAiDemandBrief.clustersWithoutPublicCoverage}`,
    `- External source signals: ${data.autopilotBroadAiDemandBrief.externalSourceSignals}`,
    `- Ready candidate files: ${data.autopilotBroadAiDemandBrief.readyCandidateFiles}`,
    `- Review-ready drafts: ${data.autopilotBroadAiDemandBrief.reviewReadyDrafts}`,
    `- Public articles: ${data.autopilotBroadAiDemandBrief.publicArticles}`,
    `- Unsafe clusters: ${data.autopilotBroadAiDemandBrief.unsafeClusters}`,
    "",
    "Unsafe broad AI demand clusters:",
    "",
    ...(data.autopilotBroadAiDemandBrief.unsafeClusterList.length ? data.autopilotBroadAiDemandBrief.unsafeClusterList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Score | Public | Drafts | Ready | Sources | Queries | Cluster | Why |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotBroadAiDemandBrief.clustersList.map(
      (cluster) =>
        `| ${cluster.gapScore} | ${cluster.publicMatches} | ${cluster.draftMatches} | ${cluster.readyCandidates.length} | ${cluster.sourceSignals.length} | ${cluster.searchQueries.length} | ${cluster.cluster} | ${cluster.why} |`,
    ),
    "",
    "## Autopilot Broad Freshness Triage",
    "",
    `- Items: ${data.autopilotBroadFreshnessTriage.items}`,
    `- High risk items: ${data.autopilotBroadFreshnessTriage.highRiskItems}`,
    `- Clusters covered: ${data.autopilotBroadFreshnessTriage.clustersCovered}`,
    `- Source clusters: ${data.autopilotBroadFreshnessTriage.sourceClusters}`,
    `- Source ready candidate files: ${data.autopilotBroadFreshnessTriage.sourceReadyCandidateFiles}`,
    `- Ready items: ${data.autopilotBroadFreshnessTriage.readyItems}`,
    `- Safe draft items: ${data.autopilotBroadFreshnessTriage.safeDraftItems}`,
    `- Unique files: ${data.autopilotBroadFreshnessTriage.uniqueFiles}`,
    `- Items with command boundary: ${data.autopilotBroadFreshnessTriage.itemsWithCommandBoundary}`,
    `- Items with external signals: ${data.autopilotBroadFreshnessTriage.itemsWithExternalSignals}`,
    `- Items with human fact-checks: ${data.autopilotBroadFreshnessTriage.itemsWithHumanFactChecks}`,
    `- Items with search queries: ${data.autopilotBroadFreshnessTriage.itemsWithSearchQueries}`,
    `- Items with source targets: ${data.autopilotBroadFreshnessTriage.itemsWithSourceTargets}`,
    `- Unsafe items: ${data.autopilotBroadFreshnessTriage.unsafeItems}`,
    "",
    "Unsafe broad freshness triage items:",
    "",
    ...(data.autopilotBroadFreshnessTriage.unsafeItemList.length ? data.autopilotBroadFreshnessTriage.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Ready | Safe | Priority | Risk | Public | Queries | Sources | Checks | Cluster | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotBroadFreshnessTriage.itemsList.map(
      (item) =>
        `| ${item.readyForHumanFreshnessReview} | ${item.safeDraft} | ${item.freshnessPriority} | ${item.freshnessRisk} | ${item.publicMatches} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.humanFactCheckChecklist.length} | ${item.cluster} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Broad Publish Waves",
    "",
    `- Current public published: ${data.autopilotBroadPublishWaves.currentPublicPublished}`,
    `- Waves: ${data.autopilotBroadPublishWaves.waves}`,
    `- Waves ready for human approval: ${data.autopilotBroadPublishWaves.wavesReadyForHumanApproval}`,
    `- Items: ${data.autopilotBroadPublishWaves.items}`,
    `- Ready items: ${data.autopilotBroadPublishWaves.readyItems}`,
    `- Safe draft items: ${data.autopilotBroadPublishWaves.safeDraftItems}`,
    `- Unique files: ${data.autopilotBroadPublishWaves.uniqueFiles}`,
    `- Clusters covered: ${data.autopilotBroadPublishWaves.clustersCovered}`,
    `- Max items per wave: ${data.autopilotBroadPublishWaves.itemsPerWaveMax}`,
    `- Unsafe items: ${data.autopilotBroadPublishWaves.unsafeItems}`,
    `- Unsafe waves: ${data.autopilotBroadPublishWaves.unsafeWaves}`,
    "",
    "Unsafe broad publish waves:",
    "",
    ...(data.autopilotBroadPublishWaves.unsafeWaveList.length ? data.autopilotBroadPublishWaves.unsafeWaveList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    data.autopilotBroadPublishWaves.nextWave
      ? `Next wave: ${data.autopilotBroadPublishWaves.nextWave.wave} - ${data.autopilotBroadPublishWaves.nextWave.theme}`
      : "Next wave: missing",
    "",
    "| Wave | Ready | Unsafe | Projected public | Theme | Files |",
    "| --- | --- | --- | --- | --- | --- |",
    ...data.autopilotBroadPublishWaves.wavesList.map(
      (wave) =>
        `| ${wave.wave} | ${wave.readyItems}/${wave.files.length} | ${wave.unsafeItems} | ${wave.projectedPublicPublishedAfterApproval} | ${wave.theme} | ${wave.files.join("<br>")} |`,
    ),
    "",
    "## Autopilot Broad Wave Optimization",
    "",
    `- Waves: ${data.autopilotBroadWaveOptimization.waves}`,
    `- Waves ready: ${data.autopilotBroadWaveOptimization.wavesReady}`,
    `- Items: ${data.autopilotBroadWaveOptimization.items}`,
    `- Wave items: ${data.autopilotBroadWaveOptimization.waveItems}`,
    `- Ready items: ${data.autopilotBroadWaveOptimization.readyItems}`,
    `- Safe draft items: ${data.autopilotBroadWaveOptimization.safeDraftItems}`,
    `- Items with action checklist: ${data.autopilotBroadWaveOptimization.itemsWithActionChecklist}`,
    `- Items with public link suggestion: ${data.autopilotBroadWaveOptimization.itemsWithPublicLinkSuggestion}`,
    `- Items with search queries: ${data.autopilotBroadWaveOptimization.itemsWithSearchQueries}`,
    `- Items with source targets: ${data.autopilotBroadWaveOptimization.itemsWithSourceTargets}`,
    `- Unsafe items: ${data.autopilotBroadWaveOptimization.unsafeItems}`,
    "",
    "Unsafe broad wave optimization items:",
    "",
    ...(data.autopilotBroadWaveOptimization.unsafeItemList.length ? data.autopilotBroadWaveOptimization.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Wave | Ready | Unsafe | Theme | Files |",
    "| --- | --- | --- | --- | --- |",
    ...data.autopilotBroadWaveOptimization.waveSummaries.map(
      (wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.unsafeItems} | ${wave.theme} | ${wave.files.join("<br>")} |`,
    ),
    "",
    "| Wave | Ready | Link | H2 | Description | Actions | Warnings | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotBroadWaveOptimization.itemsList.map(
      (item) =>
        `| ${item.wave} | ${item.readyForHumanOptimizationReview} | ${item.publicLinkSuggestion ? item.publicLinkSuggestion.url : "missing"} | ${item.articleSignals.h2Count} | ${item.articleSignals.descriptionLength} | ${item.actionChecklist.length} | ${item.warningRemediation.length} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Autopilot Broad Wave Remediation Pack",
    "",
    `- Waves: ${data.autopilotBroadWaveRemediation.waves}`,
    `- Waves ready: ${data.autopilotBroadWaveRemediation.wavesReady}`,
    `- Items: ${data.autopilotBroadWaveRemediation.items}`,
    `- Wave items: ${data.autopilotBroadWaveRemediation.waveItems}`,
    `- Manual fix ready items: ${data.autopilotBroadWaveRemediation.manualFixReadyItems}`,
    `- Items with command boundary: ${data.autopilotBroadWaveRemediation.itemsWithCommandBoundary}`,
    `- Items with internal-link fixes: ${data.autopilotBroadWaveRemediation.itemsWithInternalLinkFixes}`,
    `- Items with public-link plan: ${data.autopilotBroadWaveRemediation.itemsWithPublicLinkPlan}`,
    `- Missing specific link suggestion items: ${data.autopilotBroadWaveRemediation.missingSpecificLinkSuggestionItems}`,
    `- Items with search fixes: ${data.autopilotBroadWaveRemediation.itemsWithSearchFixes}`,
    `- Items with source checks: ${data.autopilotBroadWaveRemediation.itemsWithSourceChecks}`,
    `- Items with warning fixes: ${data.autopilotBroadWaveRemediation.itemsWithWarningFixes}`,
    `- Items with risk checks: ${data.autopilotBroadWaveRemediation.itemsWithRiskChecks}`,
    `- Unsafe items: ${data.autopilotBroadWaveRemediation.unsafeItems}`,
    "",
    "Unsafe broad wave remediation items:",
    "",
    ...(data.autopilotBroadWaveRemediation.unsafeItemList.length ? data.autopilotBroadWaveRemediation.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Wave | Ready | Missing specific link suggestion | Unsafe | Items |",
    "| --- | --- | --- | --- | --- |",
    ...data.autopilotBroadWaveRemediation.waveSummaries.map(
      (wave) => `| ${wave.wave} | ${wave.manualFixReadyItems}/${wave.items} | ${wave.missingSpecificLinkSuggestionItems} | ${wave.unsafeItems} | ${wave.items} |`,
    ),
    "",
    "| Wave | Ready | Reasons | Search fixes | Source checks | Link fixes | Link plan | Warnings | Risk checks | Mark-review gated | Publish confirm | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.autopilotBroadWaveRemediation.itemsList.map(
      (item) =>
        `| ${item.wave} | ${item.manualFixReady} | ${item.remediationReasons.length} | ${item.searchFixes.length} | ${item.sourceChecks.length} | ${item.internalLinkFixes.length} | ${item.publicLinkPlan.length} | ${item.warningFixes.length} | ${item.riskChecks.length} | ${item.commandBoundary.markReviewAfterHumanApproval.includes("--confirm-human")} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Broad First Coverage Launch Pack",
    "",
    `- Zero-public clusters: ${data.broadFirstCoverageLaunchPack.zeroPublicClusters}`,
    `- First coverage target: ${data.broadFirstCoverageLaunchPack.firstCoverageTarget}`,
    `- Clusters selected: ${data.broadFirstCoverageLaunchPack.clustersSelected}`,
    `- Unique files: ${data.broadFirstCoverageLaunchPack.uniqueFiles}`,
    `- Safe draft items: ${data.broadFirstCoverageLaunchPack.safeDraftItems}`,
    `- Items with search queries: ${data.broadFirstCoverageLaunchPack.itemsWithSearchQueries}`,
    `- Items with source targets: ${data.broadFirstCoverageLaunchPack.itemsWithSourceTargets}`,
    `- Items with fact-check checklist: ${data.broadFirstCoverageLaunchPack.itemsWithFactCheckChecklist}`,
    `- Command boundaries: ${data.broadFirstCoverageLaunchPack.commandBoundaries}`,
    `- Traffic data available: ${data.broadFirstCoverageLaunchPack.trafficDataAvailable}`,
    `- Unsafe items: ${data.broadFirstCoverageLaunchPack.unsafeItems}`,
    "",
    "Unsafe first coverage launch items:",
    "",
    ...(data.broadFirstCoverageLaunchPack.unsafeItemList.length
      ? data.broadFirstCoverageLaunchPack.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`)
      : ["- none"]),
    "",
    "| Ready | Safe | Gap | Queries | Sources | Checks | Risk | Cluster | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.broadFirstCoverageLaunchPack.items.map(
      (item) =>
        `| ${item.readyForFirstCoverageReview} | ${item.safeDraft} | ${item.gapScore} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.humanFactCheckChecklist.length} | ${item.triageFreshnessRisk || "n/a"} | ${item.cluster} | ${item.title} | ${item.file} |`,
    ),
    "",
    "| Cluster | Mark review after human approval | Publish dry-run after review | Publish confirm |",
    "| --- | --- | --- | --- |",
    ...data.broadFirstCoverageLaunchPack.items.map(
      (item) =>
        `| ${item.cluster} | \`${item.commandBoundary.markReviewAfterHumanApproval}\` | \`${item.commandBoundary.publishDryRunAfterReview}\` | ${item.commandBoundary.publishConfirm} |`,
    ),
    "",
    "## Broad First Coverage Readiness Matrix",
    "",
    `- First coverage items: ${data.broadFirstCoverageReadinessMatrix.firstCoverageItems}`,
    `- Launch pack items: ${data.broadFirstCoverageReadinessMatrix.launchPackItems}`,
    `- Unique files: ${data.broadFirstCoverageReadinessMatrix.uniqueFiles}`,
    `- Preflight ready items: ${data.broadFirstCoverageReadinessMatrix.preflightReadyItems}`,
    `- Source ready items: ${data.broadFirstCoverageReadinessMatrix.sourceReadyItems}`,
    `- Snippet ready items: ${data.broadFirstCoverageReadinessMatrix.snippetReadyItems}`,
    `- Schema ready items: ${data.broadFirstCoverageReadinessMatrix.schemaReadyItems}`,
    `- Items with public link path: ${data.broadFirstCoverageReadinessMatrix.itemsWithPublicLinkPath}`,
    `- Query ready items: ${data.broadFirstCoverageReadinessMatrix.queryReadyItems}`,
    `- Command boundaries: ${data.broadFirstCoverageReadinessMatrix.commandBoundaries}`,
    `- Blocking items: ${data.broadFirstCoverageReadinessMatrix.blockingItems}`,
    `- Warning items: ${data.broadFirstCoverageReadinessMatrix.warningItems}`,
    `- Unsafe items: ${data.broadFirstCoverageReadinessMatrix.unsafeItems}`,
    "",
    "| Score | Preflight | Source | Snippet | Schema | Link | Query | Freshness | Warnings | Cluster | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.broadFirstCoverageReadinessMatrix.items.map(
      (item) =>
        `| ${item.readinessScore} | ${item.readiness.preflightReady} | ${item.readiness.sourceReady} | ${item.readiness.snippetReady} | ${item.readiness.schemaReady} | ${item.readiness.hasPublicLinkPath} | ${item.readiness.queryReady ?? "n/a"} | ${item.readiness.freshnessReady ?? "n/a"} | ${item.warningIssues.length} | ${item.cluster} | ${item.title} | ${item.file} |`,
    ),
    "",
    "| Cluster | Exact seeds | Exact queries | Source targets | Reachable sources | Review actions |",
    "| --- | --- | --- | --- | --- | --- |",
    ...data.broadFirstCoverageReadinessMatrix.items.map(
      (item) =>
        `| ${item.cluster} | ${item.searchSignals.exactSeedMatches ?? "n/a"} | ${item.searchSignals.exactQueryMatches ?? "n/a"} | ${item.sourceSignals.sourceTargets ?? item.sourceSignals.launchSourceTargets} | ${item.sourceSignals.reachableSources ?? "n/a"} | ${item.reviewActions.length} |`,
    ),
    "",
    "## Human Approval Execution Queue",
    "",
    `- Current public published: ${data.humanApprovalQueue.currentPublicPublished}`,
    `- Current publishable now: ${data.humanApprovalQueue.currentPublishableNow}`,
    `- Projected public after immediate human approval: ${data.humanApprovalQueue.projectedPublicPublishedAfterImmediateHumanApproval}`,
    `- Immediate approval items: ${data.humanApprovalQueue.immediateApprovalItems}`,
    `- Immediate approval ready items: ${data.humanApprovalQueue.immediateApprovalReadyItems}`,
    `- Backlog items: ${data.humanApprovalQueue.backlogItems}`,
    `- Items ready for human approval: ${data.humanApprovalQueue.itemsReadyForHumanApproval}`,
    `- Items with source replacement decisions: ${data.humanApprovalQueue.itemsWithSourceReplacementDecisions}`,
    `- Items with failed source decision: ${data.humanApprovalQueue.itemsWithFailedSourceDecision}`,
    `- Items with SEO warnings: ${data.humanApprovalQueue.itemsWithSeoWarnings}`,
    `- Items with mass search theme: ${data.humanApprovalQueue.itemsWithMassSearchTheme}`,
    `- Items with popular prompt lane: ${data.humanApprovalQueue.itemsWithPopularPromptLane}`,
    `- Publish confirm commands included: ${data.humanApprovalQueue.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.humanApprovalQueue.trafficDataAvailable}`,
    `- Unsafe items: ${data.humanApprovalQueue.unsafeItems}`,
    "",
    "| Stage | Ready | Priority | SEO | Source decisions | Mass themes | Prompt lanes | Status | Title | File |",
    "| --- | --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- |",
    ...data.humanApprovalQueue.top.map(
      (item) =>
        `| ${item.currentStage} | ${item.readyForHumanApproval} | ${item.priorityScore} | ${item.seoWarnings.length} | ${item.sourceReplacementDecisions.length} | ${item.massSearchThemes.length} | ${item.popularPromptLanes.length} | ${item.articleState.status} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Human Approval Clearance Pack",
    "",
    `- Current public published: ${data.humanApprovalClearancePack.currentPublicPublished}`,
    `- Projected public after immediate human approval: ${data.humanApprovalClearancePack.projectedPublicPublishedAfterImmediateHumanApproval}`,
    `- Approval items: ${data.humanApprovalClearancePack.approvalItems}`,
    `- Immediate items: ${data.humanApprovalClearancePack.immediateItems}`,
    `- Backlog items: ${data.humanApprovalClearancePack.backlogItems}`,
    `- Ready for clearance review: ${data.humanApprovalClearancePack.itemsReadyForClearanceReview}`,
    `- Clearance actions: ${data.humanApprovalClearancePack.clearanceActions}`,
    `- Source decision items: ${data.humanApprovalClearancePack.sourceDecisionItems}`,
    `- Failed source decision items: ${data.humanApprovalClearancePack.failedSourceDecisionItems}`,
    `- SEO warning items: ${data.humanApprovalClearancePack.seoWarningItems}`,
    `- Copydesk brief items: ${data.humanApprovalClearancePack.copydeskBriefItems}`,
    `- Popular prompt lane items: ${data.humanApprovalClearancePack.popularPromptLaneItems}`,
    `- Mass search theme items: ${data.humanApprovalClearancePack.massSearchThemeItems}`,
    `- Publish confirm commands included: ${data.humanApprovalClearancePack.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.humanApprovalClearancePack.trafficDataAvailable}`,
    `- Unsafe items: ${data.humanApprovalClearancePack.unsafeItems}`,
    "",
    "| Immediate | Ready | Priority | Actions | Source decisions | Failed source | SEO | Copydesk | Prompt lanes | Mass themes | Title | File |",
    "| --- | --- | ---: | ---: | ---: | --- | --- | --- | ---: | ---: | --- | --- |",
    ...data.humanApprovalClearancePack.top.map(
      (item) =>
        `| ${item.immediate} | ${item.readyForClearanceReview} | ${item.priorityScore} | ${item.clearanceActions.length} | ${item.sourceDecisions.length} | ${item.hasFailedSourceDecision} | ${Boolean(item.seoWarning)} | ${Boolean(item.copydeskBrief)} | ${item.popularPromptLanes} | ${item.massSearchThemes} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Next Batch Approval Route",
    "",
    `- Next batch: ${data.nextBatchApprovalRoute.nextBatch ? `${data.nextBatchApprovalRoute.nextBatch.batch} - ${data.nextBatchApprovalRoute.nextBatch.topic}` : "missing"}`,
    `- Batch items: ${data.nextBatchApprovalRoute.batchItems}`,
    `- Ready for human route review: ${data.nextBatchApprovalRoute.itemsReadyForHumanRouteReview}`,
    `- Action items: ${data.nextBatchApprovalRoute.actionItems}`,
    `- Source-pack matched items: ${data.nextBatchApprovalRoute.sourcePackMatchedItems}`,
    `- Query coverage matched items: ${data.nextBatchApprovalRoute.queryCoverageMatchedItems}`,
    `- Clearance matched items: ${data.nextBatchApprovalRoute.clearanceMatchedItems}`,
    `- Copydesk matched items: ${data.nextBatchApprovalRoute.copydeskMatchedItems}`,
    `- Freshness matched items: ${data.nextBatchApprovalRoute.freshnessMatchedItems}`,
    `- SEO warning items: ${data.nextBatchApprovalRoute.seoWarningItems}`,
    `- Query match warning items: ${data.nextBatchApprovalRoute.queryMatchWarningItems}`,
    `- Route warnings: ${data.nextBatchApprovalRoute.routeWarnings}`,
    `- Current public published: ${data.nextBatchApprovalRoute.currentPublicPublished}`,
    `- Current publishable now: ${data.nextBatchApprovalRoute.currentPublishableNow}`,
    `- Publish confirm commands included: ${data.nextBatchApprovalRoute.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.nextBatchApprovalRoute.trafficDataAvailable}`,
    `- Unsafe items: ${data.nextBatchApprovalRoute.unsafeItems}`,
    "",
    "| Ready | Score | Actions | Warnings | Sources | Queries | SEO | Publish confirm | Title | File |",
    "| --- | ---: | ---: | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...data.nextBatchApprovalRoute.top.map(
      (item) =>
        `| ${item.readyForHumanRouteReview} | ${item.priorityScore} | ${item.actions.length} | ${item.routeWarnings.length} | ${item.sourcePack?.officialSourceTargets?.length || 0} | ${item.queryCoverage?.queryCount || 0} | ${Boolean(item.seoWarning)} | ${item.commandBoundary.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Next Batch Route Remediation Pack",
    "",
    `- Next batch: ${data.nextBatchRouteRemediationPack.nextBatch ? `${data.nextBatchRouteRemediationPack.nextBatch.batch} - ${data.nextBatchRouteRemediationPack.nextBatch.topic}` : "missing"}`,
    `- Batch items: ${data.nextBatchRouteRemediationPack.batchItems}`,
    `- Warning items: ${data.nextBatchRouteRemediationPack.warningItems}`,
    `- Ready for remediation review: ${data.nextBatchRouteRemediationPack.itemsReadyForRemediationReview}`,
    `- Action items: ${data.nextBatchRouteRemediationPack.actionItems}`,
    `- Clearance gap items: ${data.nextBatchRouteRemediationPack.clearanceGapItems}`,
    `- Copydesk gap items: ${data.nextBatchRouteRemediationPack.copydeskGapItems}`,
    `- Query warning items: ${data.nextBatchRouteRemediationPack.queryWarningItems}`,
    `- SEO warning items: ${data.nextBatchRouteRemediationPack.seoWarningItems}`,
    `- Freshness warning items: ${data.nextBatchRouteRemediationPack.freshnessWarningItems}`,
    `- Route warnings: ${data.nextBatchRouteRemediationPack.routeWarnings}`,
    `- Current public published: ${data.nextBatchRouteRemediationPack.currentPublicPublished}`,
    `- Current publishable now: ${data.nextBatchRouteRemediationPack.currentPublishableNow}`,
    `- Publish confirm commands included: ${data.nextBatchRouteRemediationPack.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.nextBatchRouteRemediationPack.trafficDataAvailable}`,
    `- Unsafe items: ${data.nextBatchRouteRemediationPack.unsafeItems}`,
    "",
    "| Ready | Score | Actions | Kinds | Warnings | Publish confirm | Title | File |",
    "| --- | ---: | ---: | --- | ---: | --- | --- | --- |",
    ...data.nextBatchRouteRemediationPack.top.map(
      (item) =>
        `| ${item.readyForRemediationReview} | ${item.priorityScore} | ${item.actionCount} | ${item.remediationKinds.join(", ") || "none"} | ${item.routeWarnings.length} | ${item.publishConfirm} | ${item.title} | ${item.file} |`,
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
    "## Review Collision Decision Pack",
    "",
    `- Decision items: ${data.reviewCollisionDecisionPack.decisionItems}`,
    `- High-risk items: ${data.reviewCollisionDecisionPack.highRiskItems}`,
    `- Human decision ready items: ${data.reviewCollisionDecisionPack.humanDecisionReadyItems}`,
    `- Blocked queue matched items: ${data.reviewCollisionDecisionPack.blockedQueueMatchedItems}`,
    `- Review-only collision items: ${data.reviewCollisionDecisionPack.reviewOnlyCollisionItems}`,
    `- Published collision items: ${data.reviewCollisionDecisionPack.publishedCollisionItems}`,
    `- Items with command boundary: ${data.reviewCollisionDecisionPack.itemsWithCommandBoundary}`,
    `- Blocking items: ${data.reviewCollisionDecisionPack.blockingItems}`,
    `- Warning items: ${data.reviewCollisionDecisionPack.warningItems}`,
    `- Unsafe items: ${data.reviewCollisionDecisionPack.unsafeItems}`,
    "",
    "| Ready | Type | Queue blockers | Publish confirm | Required decision | Candidate role | Closest role | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.reviewCollisionDecisionPack.itemsList.map(
      (item) =>
        `| ${item.humanDecisionReady} | ${item.collisionType} | ${item.queueBlockers.length} | ${item.commandBoundary.publishConfirm} | ${item.requiredDecision} | ${item.candidate.role} | ${item.closest.map((entry) => entry.role).join("<br>")} | ${item.candidate.title} | ${item.candidate.file} |`,
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
    "## SEO Warning Remediation",
    "",
    `- Items: ${data.seoWarningRemediation.items}`,
    `- Public items: ${data.seoWarningRemediation.publicItems}`,
    `- Draft items: ${data.seoWarningRemediation.draftItems}`,
    `- Recommended items: ${data.seoWarningRemediation.recommendedItems}`,
    `- Wave items: ${data.seoWarningRemediation.waveItems}`,
    `- Snippet warning items: ${data.seoWarningRemediation.snippetWarningItems}`,
    `- Schema warning items: ${data.seoWarningRemediation.schemaWarningItems}`,
    `- Manual-fix-ready items: ${data.seoWarningRemediation.manualFixReadyItems}`,
    `- Human-gated items: ${data.seoWarningRemediation.humanGatedItems}`,
    `- Unsafe items: ${data.seoWarningRemediation.unsafeItems}`,
    `- Traffic data available: ${data.seoWarningRemediation.trafficDataAvailable}`,
    "",
    "Unsafe SEO warning remediation items:",
    "",
    ...(data.seoWarningRemediation.unsafeItemList.length ? data.seoWarningRemediation.unsafeItemList.map((item) => `- ${JSON.stringify(item)}`) : ["- none"]),
    "",
    "| Priority | Ready | Status | Scope | Snippet warnings | Schema warnings | Title | File |",
    "| ---: | --- | --- | --- | ---: | ---: | --- | --- |",
    ...data.seoWarningRemediation.itemsList.map(
      (item) => `| ${item.priority} | ${item.manualFixReady} | ${item.status} | ${item.scope.join(", ")} | ${item.snippetWarnings.length} | ${item.schemaWarnings.length} | ${item.title} | ${item.file} |`,
    ),
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
    "## Public Surface Inventory",
    "",
    `- Public articles: ${data.publicSurfaceInventory.publicArticles}`,
    `- Project public published: ${data.publicSurfaceInventory.projectPublicPublished}`,
    `- Live public count: ${data.publicSurfaceInventory.livePublicCount}`,
    `- Live sitemap URLs: ${data.publicSurfaceInventory.liveSitemapUrls}`,
    `- Live missing from sitemap: ${data.publicSurfaceInventory.liveMissingFromSitemap}`,
    `- Public categories: ${data.publicSurfaceInventory.publicCategories}`,
    `- Public tags: ${data.publicSurfaceInventory.publicTags}`,
    `- Broad clusters: ${data.publicSurfaceInventory.broadClusters}`,
    `- Broad clusters without public coverage: ${data.publicSurfaceInventory.broadClustersWithoutPublicCoverage}`,
    `- Traffic data available: ${data.publicSurfaceInventory.trafficDataAvailable}`,
    `- Unsafe items: ${data.publicSurfaceInventory.unsafeItems}`,
    "",
    "Public categories:",
    "",
    ...Object.entries(data.publicSurfaceInventory.publicCategoryCounts)
      .sort((a, b) => Number(b[1]) - Number(a[1]) || a[0].localeCompare(b[0]))
      .map(([category, count]) => `- ${category}: ${count}`),
    "",
    "| Category | Updated | Tags | Title | URL |",
    "| --- | --- | --- | --- | --- |",
    ...data.publicSurfaceInventory.publicItems.map((item) => `| ${item.category} | ${item.updatedAt} | ${item.tags.length} | ${item.title} | /blog/${item.slug} |`),
    "",
    "| Gap score | Public | Ready candidates | Cluster | Suggested files |",
    "| --- | --- | --- | --- | --- |",
    ...data.publicSurfaceInventory.broadCoverage.map(
      (cluster) => `| ${cluster.gapScore} | ${cluster.publicMatches} | ${cluster.readyCandidates} | ${cluster.cluster} | ${cluster.suggestedFiles.join("<br>")} |`,
    ),
    "",
    "## Public Search Refresh Pack",
    "",
    `- Public articles: ${data.publicSearchRefreshPack.publicArticles}`,
    `- Items: ${data.publicSearchRefreshPack.items}`,
    `- Ready for human refresh review: ${data.publicSearchRefreshPack.itemsReadyForHumanRefreshReview}`,
    `- High-priority items: ${data.publicSearchRefreshPack.highPriorityItems}`,
    `- SEO warning items: ${data.publicSearchRefreshPack.seoWarningItems}`,
    `- Short-description items: ${data.publicSearchRefreshPack.shortDescriptionItems}`,
    `- Cannibalization items: ${data.publicSearchRefreshPack.cannibalizationItems}`,
    `- Action items: ${data.publicSearchRefreshPack.actionItems}`,
    `- Live missing from sitemap: ${data.publicSearchRefreshPack.liveMissingFromSitemap}`,
    `- Published but noindexed: ${data.publicSearchRefreshPack.publishedButNoindexed}`,
    `- Measured traffic sources: ${data.publicSearchRefreshPack.measuredTrafficSources}`,
    `- Publish confirm commands included: ${data.publicSearchRefreshPack.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.publicSearchRefreshPack.trafficDataAvailable}`,
    `- Unsafe items: ${data.publicSearchRefreshPack.unsafeItems}`,
    "",
    "| Ready | Score | Actions | SEO | Freshness | Conflicts | Desc | Category | Title | File |",
    "| --- | ---: | ---: | --- | --- | ---: | ---: | --- | --- | --- |",
    ...data.publicSearchRefreshPack.top.map(
      (item) =>
        `| ${item.readyForHumanRefreshReview} | ${item.priorityScore} | ${item.actionCount} | ${Boolean(item.seoWarning)} | ${item.freshnessRisk?.riskLevel || "none"} | ${item.cannibalizationConflicts.length} | ${item.descriptionLength} | ${item.category} | ${item.title} | ${item.file} |`,
    ),
    "",
    "## Public Refresh Sprint Board",
    "",
    `- Public articles: ${data.publicRefreshSprintBoard.publicArticles}`,
    `- Items: ${data.publicRefreshSprintBoard.items}`,
    `- Waves: ${data.publicRefreshSprintBoard.waves.length}`,
    `- Items per wave: ${data.publicRefreshSprintBoard.itemsPerWave}`,
    `- Ready for public refresh sprint: ${data.publicRefreshSprintBoard.itemsReadyForPublicRefreshSprint}`,
    `- High-priority items: ${data.publicRefreshSprintBoard.highPriorityItems}`,
    `- SEO warning items: ${data.publicRefreshSprintBoard.seoWarningItems}`,
    `- Short-description items: ${data.publicRefreshSprintBoard.shortDescriptionItems}`,
    `- Cannibalization items: ${data.publicRefreshSprintBoard.cannibalizationItems}`,
    `- Action items: ${data.publicRefreshSprintBoard.actionItems}`,
    `- Live missing from sitemap: ${data.publicRefreshSprintBoard.liveMissingFromSitemap}`,
    `- Published but noindexed: ${data.publicRefreshSprintBoard.publishedButNoindexed}`,
    `- Publish confirm commands included: ${data.publicRefreshSprintBoard.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.publicRefreshSprintBoard.trafficDataAvailable}`,
    `- Unsafe items: ${data.publicRefreshSprintBoard.unsafeItems}`,
    "",
    "| Wave | Ready | High priority | Actions | Reasons | Files |",
    "| ---: | ---: | ---: | ---: | --- | --- |",
    ...data.publicRefreshSprintBoard.waves.map(
      (wave) => `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.highPriorityItems} | ${wave.actionItems} | ${wave.refreshReasons.join(", ") || "none"} | ${wave.files.join("<br>")} |`,
    ),
    "",
    "| Wave | Ready | Score | Actions | Desc | Reasons | Publish confirm | Title | File |",
    "| ---: | --- | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...data.publicRefreshSprintBoard.top.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForPublicRefreshSprint} | ${item.priorityScore} | ${item.actionCount} | ${item.descriptionLength} | ${item.refreshReasons.join(", ") || "none"} | ${item.publishConfirm} | ${item.title} | ${item.file} |`,
    ),
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
    "## AI Deployment Sprint Board",
    "",
    `- Items: ${data.deploymentSprintBoard.items}`,
    `- Review pack items: ${data.deploymentSprintBoard.reviewPackItems}`,
    `- Waves: ${data.deploymentSprintBoard.waves.length}`,
    `- Items per wave: ${data.deploymentSprintBoard.itemsPerWave}`,
    `- Ready for deployment sprint: ${data.deploymentSprintBoard.readyForDeploymentSprint}`,
    `- High-priority items: ${data.deploymentSprintBoard.highPriorityItems}`,
    `- Deployment lanes: ${data.deploymentSprintBoard.lanes}`,
    `- Implementation modes: ${data.deploymentSprintBoard.implementationModes}`,
    `- Agent items: ${data.deploymentSprintBoard.agentItems}`,
    `- Memory/RAG items: ${data.deploymentSprintBoard.memoryItems}`,
    `- Model serving items: ${data.deploymentSprintBoard.modelServingItems}`,
    `- Local model items: ${data.deploymentSprintBoard.localModelItems}`,
    `- Automation platform items: ${data.deploymentSprintBoard.automationPlatformItems}`,
    `- API integration items: ${data.deploymentSprintBoard.apiIntegrationItems}`,
    `- Search queries: ${data.deploymentSprintBoard.searchQueries}`,
    `- Source targets: ${data.deploymentSprintBoard.sourceTargets}`,
    `- Action items: ${data.deploymentSprintBoard.actionItems}`,
    `- Publish confirm commands included: ${data.deploymentSprintBoard.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.deploymentSprintBoard.trafficDataAvailable}`,
    `- Unsafe items: ${data.deploymentSprintBoard.unsafeItems}`,
    "",
    "| Wave | Ready | High priority | Actions | Lanes | Modes | Files | Search queries |",
    "| ---: | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...data.deploymentSprintBoard.waves.map(
      (wave) =>
        `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.highPriorityItems} | ${wave.actionItems} | ${wave.deploymentLanes.join(", ")} | ${wave.implementationModes.join(", ")} | ${wave.files.join("<br>")} | ${wave.searchQueries.slice(0, 4).join("<br>") || "none"} |`,
    ),
    "",
    "| Wave | Ready | Score | Lane | Mode | Public | Actions | Queries | Sources | Title | File |",
    "| ---: | --- | ---: | --- | --- | ---: | ---: | ---: | ---: | --- | --- |",
    ...data.deploymentSprintBoard.top.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForDeploymentSprint} | ${item.priorityScore} | ${item.deploymentLane} | ${item.implementationMode} | ${item.publicMatches} | ${item.actionCount} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.title} | ${item.file} |`,
    ),
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
    "## Mass AI Search Action Matrix",
    "",
    `- Items: ${data.massAiSearchMatrix.items}`,
    `- Waves: ${data.massAiSearchMatrix.waves}`,
    `- Source broad themes: ${data.massAiSearchMatrix.sourceBroadThemes}`,
    `- Source top themes: ${data.massAiSearchMatrix.sourceTopThemes}`,
    `- Ready for human review prep: ${data.massAiSearchMatrix.itemsReadyForHumanReviewPrep}`,
    `- Human-gated items: ${data.massAiSearchMatrix.humanGatedItems}`,
    `- Unique candidate files: ${data.massAiSearchMatrix.uniqueCandidateFiles}`,
    `- Themes without public coverage: ${data.massAiSearchMatrix.themesWithoutPublicCoverage}`,
    `- Deployment bridged themes: ${data.massAiSearchMatrix.deploymentBridgedThemes}`,
    `- Prompt bridged themes: ${data.massAiSearchMatrix.promptBridgedThemes}`,
    `- Prompt blueprint samples: ${data.massAiSearchMatrix.promptBlueprintSamples}`,
    `- Traffic data available: ${data.massAiSearchMatrix.trafficDataAvailable}`,
    `- Unsafe items: ${data.massAiSearchMatrix.unsafeItems}`,
    "",
    "| Wave | Ready | Public | Candidates | Sources | Seeds | Deploy | Prompt | Lane | Theme |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.massAiSearchMatrix.top.map((item) => (
      `| ${item.editorialWave} | ${item.readyForHumanReviewPrep} | ${item.publicMatches} | ${item.candidateFiles.length} | ${item.sourceTargets.length} | ${item.searchSeeds.length} | ${item.deploymentMatches} | ${item.promptModuleMatches} | ${item.lane} | ${item.themeTitle} |`
    )),
    "",
    "## Popular AI Prompt Playbook",
    "",
    `- Items: ${data.popularAiPromptPlaybook.items}`,
    `- Ready for human review prep: ${data.popularAiPromptPlaybook.itemsReadyForHumanReviewPrep}`,
    `- Human-gated items: ${data.popularAiPromptPlaybook.humanGatedItems}`,
    `- Prompt templates: ${data.popularAiPromptPlaybook.promptTemplates}`,
    `- Search queries: ${data.popularAiPromptPlaybook.searchQueries}`,
    `- Official sources: ${data.popularAiPromptPlaybook.officialSources}`,
    `- Unique candidate files: ${data.popularAiPromptPlaybook.uniqueCandidateFiles}`,
    `- Broad work prompt lanes: ${data.popularAiPromptPlaybook.broadWorkPromptLanes}`,
    `- Agent/deployment lanes: ${data.popularAiPromptPlaybook.agentDeploymentLanes}`,
    `- Memory lanes: ${data.popularAiPromptPlaybook.memoryLanes}`,
    `- Deployment bridge items: ${data.popularAiPromptPlaybook.deploymentBridgeItems}`,
    `- Prompt module bridge items: ${data.popularAiPromptPlaybook.promptModuleBridgeItems}`,
    `- Publish confirm commands included: ${data.popularAiPromptPlaybook.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.popularAiPromptPlaybook.trafficDataAvailable}`,
    `- Unsafe items: ${data.popularAiPromptPlaybook.unsafeItems}`,
    "",
    "| Ready | Candidates | Templates | Queries | Sources | Public | Lane | Audience |",
    "| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |",
    ...data.popularAiPromptPlaybook.top.map((item) => (
      `| ${item.readyForHumanReviewPrep} | ${item.candidateFiles.length} | ${item.promptTemplates.length} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.publicMatches} | ${item.title} | ${item.audience} |`
    )),
    "",
    "## Popular Prompt Approval Bridge",
    "",
    `- Playbook items: ${data.popularPromptApprovalBridge.playbookItems}`,
    `- Playbook ready items: ${data.popularPromptApprovalBridge.playbookReadyItems}`,
    `- Lanes: ${data.popularPromptApprovalBridge.lanes}`,
    `- Lanes with next candidates: ${data.popularPromptApprovalBridge.lanesWithNextCandidates}`,
    `- Lanes with ready next candidates: ${data.popularPromptApprovalBridge.lanesWithReadyNextCandidates}`,
    `- Lanes already in approval queue: ${data.popularPromptApprovalBridge.lanesAlreadyInApprovalQueue}`,
    `- Bridge items: ${data.popularPromptApprovalBridge.bridgeItems}`,
    `- Ready bridge items: ${data.popularPromptApprovalBridge.bridgeItemsReadyForHumanReviewPrep}`,
    `- Unique files: ${data.popularPromptApprovalBridge.uniqueFiles}`,
    `- Prompt templates referenced: ${data.popularPromptApprovalBridge.promptTemplatesReferenced}`,
    `- Search queries referenced: ${data.popularPromptApprovalBridge.searchQueriesReferenced}`,
    `- Review candidate pool: ${data.popularPromptApprovalBridge.reviewCandidatePool}`,
    `- Approval queue items: ${data.popularPromptApprovalBridge.approvalQueueItems}`,
    `- Approval queue ready items: ${data.popularPromptApprovalBridge.approvalQueueReadyItems}`,
    `- Publish confirm commands included: ${data.popularPromptApprovalBridge.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.popularPromptApprovalBridge.trafficDataAvailable}`,
    `- Unsafe items: ${data.popularPromptApprovalBridge.unsafeItems}`,
    "",
    "| Ready | Score | Templates | Queries | Sources | State | Lane | Title | File |",
    "| --- | ---: | ---: | ---: | ---: | --- | --- | --- | --- |",
    ...data.popularPromptApprovalBridge.top.map((item) => (
      `| ${item.readyForHumanReviewPrep} | ${item.opportunityScore} | ${item.promptTemplates} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.articleState.status}/${item.articleState.noindex ? "noindex" : "index"} | ${item.laneTitle} | ${item.title} | ${item.file} |`
    )),
    "",
    "## Popular Prompt Sprint Board",
    "",
    `- Items: ${data.popularPromptSprintBoard.items}`,
    `- Playbook items: ${data.popularPromptSprintBoard.playbookItems}`,
    `- Waves: ${data.popularPromptSprintBoard.waves.length}`,
    `- Items per wave: ${data.popularPromptSprintBoard.itemsPerWave}`,
    `- Ready for prompt sprint: ${data.popularPromptSprintBoard.lanesReadyForPromptSprint}`,
    `- High-priority items: ${data.popularPromptSprintBoard.highPriorityItems}`,
    `- Industry buckets: ${data.popularPromptSprintBoard.industryBuckets}`,
    `- Candidate files: ${data.popularPromptSprintBoard.candidateFiles}`,
    `- Next candidate files: ${data.popularPromptSprintBoard.nextCandidateFiles}`,
    `- Bridge items: ${data.popularPromptSprintBoard.bridgeItems}`,
    `- Prompt templates: ${data.popularPromptSprintBoard.promptTemplates}`,
    `- Prompt template samples: ${data.popularPromptSprintBoard.promptTemplateSamples}`,
    `- Search queries: ${data.popularPromptSprintBoard.searchQueries}`,
    `- Action items: ${data.popularPromptSprintBoard.actionItems}`,
    `- Publish confirm commands included: ${data.popularPromptSprintBoard.publishConfirmCommandsIncluded}`,
    `- Traffic data available: ${data.popularPromptSprintBoard.trafficDataAvailable}`,
    `- Unsafe items: ${data.popularPromptSprintBoard.unsafeItems}`,
    "",
    "| Wave | Ready | High priority | Actions | Buckets | Candidate files | Search queries |",
    "| ---: | ---: | ---: | ---: | --- | --- | --- |",
    ...data.popularPromptSprintBoard.waves.map(
      (wave) =>
        `| ${wave.wave} | ${wave.readyItems}/${wave.items} | ${wave.highPriorityItems} | ${wave.actionItems} | ${wave.industryBuckets.join(", ")} | ${wave.candidateFiles.slice(0, 4).join("<br>") || "none"} | ${wave.searchQueries.slice(0, 4).join("<br>") || "none"} |`,
    ),
    "",
    "| Wave | Ready | Score | Bucket | Public | Actions | Queries | Sources | Next files | Title |",
    "| ---: | --- | ---: | --- | ---: | ---: | ---: | ---: | --- | --- |",
    ...data.popularPromptSprintBoard.top.map(
      (item) =>
        `| ${item.sprintWave} | ${item.readyForPromptSprint} | ${item.sprintPriorityScore} | ${item.industryBucket} | ${item.publicMatches} | ${item.actionCount} | ${item.searchQueries.length} | ${item.sourceTargets.length} | ${item.nextCandidateFiles.slice(0, 3).join("<br>") || "none"} | ${item.title} |`,
    ),
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
    `- Public gap plan items: ${data.publicCoverageGapPreflight.planItems}`,
    `- Broad first coverage items: ${data.publicCoverageGapPreflight.broadFirstCoverageItems}`,
    `- Broad first coverage preflight items: ${data.publicCoverageGapPreflight.broadFirstCoveragePreflightItems}`,
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
    "## Industry Prompt Opportunity Board",
    "",
    `- Opportunities: ${data.industryPromptOpportunityBoard.opportunities}`,
    `- Department lanes: ${data.industryPromptOpportunityBoard.departmentLanes}`,
    `- Search query families: ${data.industryPromptOpportunityBoard.searchQueryFamilies}`,
    `- Prompt modules: ${data.industryPromptOpportunityBoard.promptModules}`,
    `- Items with source targets: ${data.industryPromptOpportunityBoard.itemsWithSourceTargets}`,
    `- Items with human boundary: ${data.industryPromptOpportunityBoard.itemsWithHumanBoundary}`,
    `- Items with input/output structure: ${data.industryPromptOpportunityBoard.itemsWithInputOutputStructure}`,
    `- Items with review-pack candidate: ${data.industryPromptOpportunityBoard.itemsWithReviewPackCandidate}`,
    `- Zero-public-coverage items: ${data.industryPromptOpportunityBoard.zeroPublicCoverageItems}`,
    `- Unsafe items: ${data.industryPromptOpportunityBoard.unsafeItems}`,
    "",
    "| Score | Public | Review candidates | Query families | Lane | Primary query | Deliverable |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...data.industryPromptOpportunityBoard.top.map((item) => (
      `| ${item.priorityScore} | ${item.publicMatches} | ${item.existingReviewCandidates.length} | ${item.searchQueryFamilies} | ${item.lane} | ${item.primaryQuery} | ${item.deliverable} |`
    )),
    "",
    "## Industry Prompt Module Pack",
    "",
    `- Items: ${data.industryPromptModulePack.items}`,
    `- Prompt blueprints: ${data.industryPromptModulePack.promptBlueprints}`,
    `- Min modules per opportunity: ${data.industryPromptModulePack.modulesPerOpportunityMin}`,
    `- Human-gated items: ${data.industryPromptModulePack.humanGatedItems}`,
    `- Items with copy prompts: ${data.industryPromptModulePack.itemsWithCopyPrompts}`,
    `- Items with input/output structure: ${data.industryPromptModulePack.itemsWithInputOutputStructure}`,
    `- Items with source targets: ${data.industryPromptModulePack.itemsWithSourceTargets}`,
    `- Items with risk controls: ${data.industryPromptModulePack.itemsWithRiskControls}`,
    `- Items with review-pack candidate: ${data.industryPromptModulePack.itemsWithReviewPackCandidate}`,
    `- Zero-public-coverage items: ${data.industryPromptModulePack.zeroPublicCoverageItems}`,
    `- Unsafe items: ${data.industryPromptModulePack.unsafeItems}`,
    "",
    "| Ready | Bridge | Score | Public | Blueprints | Candidates | Lane | Primary query |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...data.industryPromptModulePack.top.map((item) => (
      `| ${item.readyForHumanReviewPrep} | ${item.safeReviewPackBridge} | ${item.priorityScore} | ${item.publicMatches} | ${item.promptBlueprints.length} | ${item.reviewCandidateFiles.length} | ${item.lane} | ${item.primaryQuery} |`
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
    `- SEO warning remediation items: ${data.workbench.seoWarningItems}`,
    `- SEO warning public/draft items: ${data.workbench.seoWarningPublicItems}/${data.workbench.seoWarningDraftItems}`,
    `- SEO warning human-gated items: ${data.workbench.seoWarningHumanGatedItems}`,
    `- SEO warning unsafe items: ${data.workbench.seoWarningUnsafeItems}`,
    `- SEO warning top items shown: ${data.workbench.seoWarningTopItems}`,
    "",
    "## Next Actions",
    "",
    ...data.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

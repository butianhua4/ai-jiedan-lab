import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type GateCheck = {
  detail?: string;
  name: string;
  ok: boolean;
};

async function main() {
  const reviewQueue = readJson<{ guardrails: { autoPublish: boolean }; recommendedToday: Array<{ cluster: string; file: string }> }>(
    "content/automation/review-candidates.json",
  );
  const reviewPlan = readJson<{
    batches?: Array<{ candidates?: unknown[] }>;
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    totals: { plannedBatches: number; plannedCandidates: number };
  }>("content/automation/review-batch-plan.json");
  const publishPack = readJson<{
    guardrails: { autoPublish: boolean };
    items: Array<{
      factCheckQueries?: unknown[];
      file: string;
      humanDecisionChecklist?: unknown[];
      matchedContentOpportunity?: unknown;
      officialSourceTargets?: unknown[];
      riskReviewChecklist?: unknown[];
    }>;
  }>(
    "content/automation/publish-readiness-pack.json",
  );
  const seo = readJson<{ ok: boolean; leakedDraftOrReview: string[]; nonPublishedWithNoindexFalse: string[]; publishedButNoindexed: string[] }>(
    "content/automation/seo-check.json",
  );
  const searchability = readJson<{ failedItems: unknown[]; score: number; summary?: { checks: number } }>("content/automation/searchability-check.json");
  const reviewPreflight = readJson<{ ok: boolean; summary: { failed: number } }>("content/automation/review-preflight.json");
  const sanitize = readJson<{ changedFiles: number; totalReplacements: number }>("content/automation/draft-guardrail-sanitize.json");
  const opportunityMap = readJson<{ reviewBatches?: Array<{ candidates?: unknown[] }>; totals: { reviewReadyDrafts: number } }>(
    "content/automation/seo-opportunity-map.json",
  );
  const contentBacklog = readJson<{
    opportunities?: Array<{ readyCandidates?: unknown[]; searchDemandNote?: string }>;
    totals: { topics: number; topicsWithReadyCandidates: number };
  }>("content/automation/content-opportunity-backlog.json");
  const deploymentCoverage = readJson<{
    coverage?: Array<{ candidates?: unknown[]; searchQueries?: unknown[]; sourceTargets?: unknown[] }>;
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    sourceEvidence?: { officialSources?: unknown[] };
    summary: {
      reviewReadyDeploymentDrafts: number;
      topics: number;
      topicsWithReadyCandidates: number;
      unsafeCandidateItems: number;
      uniqueCandidateFiles: number;
    };
  }>("content/automation/ai-deployment-coverage.json");
  const deploymentReviewPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      humanDecisionChecklist?: unknown[];
      readyForHumanReview?: boolean;
      riskChecks?: unknown[];
      safeDraft?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
    }>;
    summary: {
      duplicateFiles: number;
      items: number;
      itemsWithChecklists: number;
      itemsWithCommandBoundary: number;
      itemsWithOfficialSources: number;
      itemsWithSearchQueries: number;
      safeDraftItems: number;
      topicsCovered: number;
      unsafeItems: number;
      uniqueFiles: number;
    };
  }>("content/automation/ai-deployment-review-pack.json");
  const promptCoverage = readJson<{
    coverage?: Array<{ candidates?: unknown[]; searchQueries?: unknown[]; sourceTargets?: unknown[] }>;
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    sourceEvidence?: { officialPromptSources?: unknown[] };
    summary: {
      industries: number;
      industriesWithReadyCandidates: number;
      reviewReadyPromptDrafts: number;
      unsafeCandidateItems: number;
      uniqueCandidateFiles: number;
    };
  }>("content/automation/industry-prompt-coverage.json");
  const promptReviewPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      humanDecisionChecklist?: unknown[];
      readyForHumanReview?: boolean;
      riskChecks?: unknown[];
      safeDraft?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
    }>;
    summary: {
      duplicateFiles: number;
      industriesCovered: number;
      items: number;
      itemsWithChecklists: number;
      itemsWithCommandBoundary: number;
      itemsWithOfficialSources: number;
      itemsWithSearchQueries: number;
      promptPublicArticles: number;
      safeDraftItems: number;
      unsafeItems: number;
      uniqueFiles: number;
    };
  }>("content/automation/industry-prompt-review-pack.json");
  const searchIntentLanes = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    lanes?: Array<{ intentSeeds?: unknown[]; matchedCandidates?: unknown[]; reviewFocus?: unknown[]; sourceTargets?: unknown[]; workflowAngles?: unknown[] }>;
    summary: {
      highPriorityLanes: number;
      lanes: number;
      lanesWithReadyDrafts: number;
      lanesWithoutPublicCoverage: number;
      maxPriorityScore: number;
      notReadyMatchedDrafts: number;
      totalReadyDraftMatches: number;
    };
    topLanes?: Array<{ matchedCandidates?: unknown[] }>;
  }>("content/automation/search-intent-lane-map.json");
  const searchIntentApproval = readJson<{
    currentWaveItems?: Array<{ readyForHumanReview?: boolean }>;
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    nextGapItems?: Array<{ readyForHumanReview?: boolean; sourceTargets?: unknown[]; riskChecks?: unknown[] }>;
    summary: {
      currentWaveItems: number;
      currentWaveReady: number;
      nextGapItems: number;
      nextGapLanes: number;
      unsafeItems: number;
      wave: number;
    };
  }>("content/automation/search-intent-approval-packet.json");
  const searchIntentWaves = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    summary: {
      plannedItems: number;
      plannedWaves: number;
      readyItems: number;
      uniqueFiles: number;
      uniqueLanes: number;
      unsafeItems: number;
    };
    waves?: Array<{ items?: Array<{ readyForHumanReview?: boolean; safeDraft?: boolean; sourceTargets?: unknown[]; riskChecks?: unknown[] }> }>;
  }>("content/automation/search-intent-wave-planner.json");
  const searchQueryCoverage = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{ queryCount?: number; queryFamilies?: Record<string, unknown[]>; readyForManualReview?: boolean }>;
    summary: {
      items: number;
      minFamiliesPerItem: number;
      minQueriesPerItem: number;
      plannerItems: number;
      plannerWaves: number;
      readyItems: number;
      unsafeItems: number;
      uniqueFiles: number;
      uniqueLanes: number;
      uniqueQueries: number;
    };
  }>("content/automation/search-query-coverage.json");
  const searchQueryMatch = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{ descriptionHit?: boolean; readyForManualReview?: boolean; titleHit?: boolean }>;
    summary: {
      averageMatchedFamilies: number;
      blockingItems: number;
      items: number;
      queryCoverageItems: number;
      readyItems: number;
      warningItems: number;
    };
  }>("content/automation/search-query-match-audit.json");
  const broadSearchDemand = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    sourceEvidence?: { officialSources?: unknown[] };
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
    themes?: Array<{ candidateDrafts?: unknown[]; reviewFocus?: unknown[]; searchSeeds?: unknown[]; sourceTargets?: unknown[]; subtopics?: unknown[] }>;
  }>("content/automation/broad-search-demand-map.json");
  const publicCoverageGapPlan = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{ noindex?: boolean; readyForManualReview?: boolean; safeDraft?: boolean; searchSeeds?: unknown[]; sourceTargets?: unknown[] }>;
    summary: {
      duplicateFiles: number;
      gapThemes: number;
      items: number;
      plannedWaves: number;
      readyItems: number;
      sourceThemesWithoutPublicCoverage: number;
      uniqueFiles: number;
      unsafeItems: number;
    };
    waves?: Array<{ items?: unknown[]; readyItems?: number }>;
  }>("content/automation/public-coverage-gap-plan.json");
  const publicCoverageGapPreflight = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      blockingIssues?: unknown[];
      publicLinkSuggestions?: unknown[];
      readyForManualReview?: boolean;
      safeDraft?: boolean;
      structuredDataReady?: boolean;
    }>;
    summary: {
      blockingItems: number;
      items: number;
      planItems: number;
      planReadyItems: number;
      planUnsafeItems: number;
      readyItems: number;
      structuredDataReadyItems: number;
      uniqueFiles: number;
      warningItems: number;
      withPublicLinkSuggestions: number;
      withSeedMatches: number;
    };
    waveSummaries?: Array<{ blockingItems?: number; files?: unknown[]; readyItems?: number }>;
  }>("content/automation/public-coverage-gap-preflight.json");
  const publicCoverageGapDecisionPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      blockingIssues?: unknown[];
      commandsAfterExplicitApproval?: { markReview?: string; publishDryRun?: string };
      humanDecisionChecklist?: unknown[];
      publicLinkSuggestion?: unknown;
      readyForManualReview?: boolean;
      reviewPacket?: { sourceTargets?: unknown[]; warningIssues?: unknown[] };
      stopBefore?: string;
      suggestedOptimizations?: unknown[];
    }>;
    summary: {
      blockingItems: number;
      items: number;
      itemsWithCommandBoundary: number;
      itemsWithHumanChecklist: number;
      itemsWithPublicLinkSuggestion: number;
      itemsWithSourceTargets: number;
      itemsWithWarningRemediation: number;
      readyItems: number;
      unsafeItems: number;
      waves: number;
    };
    waveSummaries?: Array<{ blockingItems?: number; files?: unknown[]; readyItems?: number }>;
  }>("content/automation/public-coverage-gap-decision-pack.json");
  const cannibalization = readJson<{
    guardrails: { autoPublish: boolean };
    summary: { articleCount: number; conflicts: number; reviewBatchConflicts: number };
  }>("content/automation/content-cannibalization.json");
  const freshness = readJson<{
    guardrails: { autoPublish: boolean };
    summary: { articlesChecked: number; currentReviewItems: number; highRisk: number; plannedReviewItems: number };
  }>("content/automation/content-freshness.json");
  const reviewCoverage = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    items: Array<{ file: string }>;
    summary: {
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
  }>("content/automation/review-coverage-report.json");
  const reviewRoadmap = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    lanes: Array<{ candidates?: unknown[]; reviewFocus?: unknown[]; searchQueries?: unknown[]; sourceTargets?: unknown[] }>;
    nextReviewFiles?: unknown[];
    summary: {
      lanes: number;
      uniqueNextReviewFiles: number;
      unsafeCandidates: number;
    };
  }>("content/automation/review-priority-roadmap.json");
  const nextReviewSourcePack = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    items: Array<{ file: string }>;
    summary: {
      items: number;
      missingApprovalChecks: number;
      missingFactCheckQueries: number;
      missingOfficialSources: number;
      missingRiskChecks: number;
      roadmapNextReviewFiles: number;
      safeDraftItems: number;
      unsafeItems: number;
    };
  }>("content/automation/next-review-source-pack.json");
  const publicExpansion = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    publishingBoundary: { publishableNow: number };
    summary: {
      approvalWaves: number;
      duplicateFiles: number;
      items: number;
      roadmapNextReviewFiles: number;
      sourcePackReadyItems: number;
      unsafeItems: number;
    };
  }>("content/automation/public-expansion-queue.json");
  const waveApprovalPacket = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    summary: {
      items: number;
      readyForHumanReview: number;
      unsafeItems: number;
      wave: number;
    };
  }>("content/automation/wave-approval-packet.json");
  const wavePublishSimulation = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean; stopBeforeHumanApproval: boolean };
    summary: {
      currentlyPublishable: number;
      items: number;
      projectedPublicPublishedAfterWave: number;
      projectedPublishableAfterHumanApproval: number;
      readyForHumanApproval: number;
      unsafeItems: number;
      wave: number;
    };
  }>("content/automation/wave-publish-simulation.json");
  const liveSearch = readJson<{ articles: { publicCount: number }; failedChecks: string[]; ok: boolean }>("content/automation/live-search-surface.json");
  const workbench = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    publishReadiness: { currentItemsCovered: number };
    publishingBoundary: { publishableNow: number };
    reviewPlan: { nextBatch: unknown };
  }>("content/automation/manual-review-workbench.json");
  const projectStatus = readJson<{ articles: { publicPublished: number; publishableNow: unknown[] } }>("content/automation/project-status.json");
  const trafficEvidence = readJson<{
    guardrails: { autoPublish: boolean };
    summary: {
      canClaimTraffic: boolean;
      claimableMetrics: number;
      failedChecks: number;
      measuredTrafficSources: number;
      trafficDataAvailable: boolean;
    };
  }>("content/automation/traffic-evidence-audit.json");
  const trafficClaimGuard = readJson<{
    guardrails: { autoPublish: boolean };
    summary: {
      filesScanned: number;
      measuredTrafficUnavailable: boolean;
      unsafeClaims: number;
      watchMentions: number;
    };
  }>("content/automation/traffic-claim-guard.json");
  const contentIntegrity = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    summary: {
      blockingItems: number;
      filesScanned: number;
      publicItems: number;
      recommendedItems: number;
      waveItems: number;
    };
  }>("content/automation/content-integrity-audit.json");
  const internalLinks = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
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
  }>("content/automation/internal-link-opportunity-audit.json");
  const sourceHealth = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
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
      sourceReferences: number;
      uniqueUrls: number;
    };
  }>("content/automation/source-target-health-audit.json");
  const reviewActionBoard = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    summary: {
      publicGapReadyTasks: number;
      publicGapTasks: number;
      readyTasks: number;
      tasks: number;
      unsafeTasks: number;
      waveReadyTasks: number;
      waveTasks: number;
    };
    tasks?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      ready?: boolean;
      sourceTargets?: number;
    }>;
    unsafeTasks?: unknown[];
  }>("content/automation/review-action-board.json");
  const reviewPortfolioBoard = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      readyForHumanReview?: boolean;
      safeDraft?: boolean;
      sourceTargets?: unknown[];
      sourceTypes?: unknown[];
    }>;
    sourceCounts: { deployment: number; prompt: number; publicGap: number; wave: number };
    summary: {
      duplicateMentions: number;
      items: number;
      itemsWithCommandBoundary: number;
      itemsWithMultipleSources: number;
      itemsWithSourceTargets: number;
      readyItems: number;
      safeDraftItems: number;
      sourceCandidates: number;
      unsafeItems: number;
    };
  }>("content/automation/review-portfolio-board.json");
  const autopilotReviewQueue = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      blockers?: unknown[];
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      readyForAssignment?: boolean;
      safeDraft?: boolean;
      sourceTargets?: unknown[];
    }>;
    nextAssignments?: Array<{
      blockers?: unknown[];
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      readyForAssignment?: boolean;
      safeDraft?: boolean;
      sourceTargets?: unknown[];
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
  }>("content/automation/autopilot-review-queue.json");
  const autopilotApprovalPacket = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      articleMeta?: {
        humanReviewRequired?: boolean;
        noindex?: boolean;
        status?: string;
      };
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      readyForHumanApproval?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
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
  }>("content/automation/autopilot-approval-packet.json");
  const autopilotSearchIntentBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      readyForHumanReview?: boolean;
      reviewSuggestions?: unknown[];
      searchQueries?: unknown[];
    }>;
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
  }>("content/automation/autopilot-search-intent-brief.json");
  const autopilotInternalLinkBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      readyForHumanReview?: boolean;
      safeDraft?: boolean;
      suggestions?: unknown[];
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
  }>("content/automation/autopilot-internal-link-brief.json");
  const autopilotSourceVerificationBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      approvalChecklist?: unknown[];
      factCheckQueries?: unknown[];
      officialSourceTargets?: unknown[];
      readyForHumanReview?: boolean;
      reachableSources?: number;
      riskReviewChecklist?: unknown[];
      safeDraft?: boolean;
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
  }>("content/automation/autopilot-source-verification-brief.json");
  const autopilotHumanReviewPlaybook = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      internalLinkActions?: unknown[];
      manualOnlyCommands?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      readyForHumanReview?: boolean;
      safeDraft?: boolean;
      searchActions?: unknown[];
      sourceActions?: unknown[];
    }>;
    sourceEvidence: {
      approvalPacketUnsafeItems: number;
      internalLinkUnsafeItems: number;
      optimizationUnsafeCommands: number;
      searchIntentUnsafeItems: number;
      sourceVerificationUnsafeItems: number;
    };
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
  }>("content/automation/autopilot-human-review-playbook.json");
  const autopilotReviewSprintBoard = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      playbookStage?: string;
      readyForSprint?: boolean;
      reviewChecklist?: unknown[];
      safeDraft?: boolean;
      searchQueries?: number;
      sourceTargets?: number;
    }>;
    sourceEvidence: {
      autopilotQueueUnsafeItems: number;
      humanReviewPlaybookUnsafeItems: number;
      queueNextAssignments: number;
    };
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
  }>("content/automation/autopilot-review-sprint-board.json");
  const autopilotSearchQueryGapBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      factCheckQueries?: unknown[];
      officialSourceTargets?: unknown[];
      readyForManualSearchQueryReview?: boolean;
      recommendedSearchQueries?: unknown[];
      reviewChecklist?: unknown[];
      safeDraft?: boolean;
      sourceEvidence?: unknown[];
    }>;
    sourceEvidence: {
      nextReviewSourcePackItems: number;
      searchQueryCoverageItems: number;
      sprintBoardItemsNeedingSearchQuery: number;
      sprintBoardUnsafeItems: number;
      waveApprovalPacketItems: number;
    };
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
    unsafeItems?: unknown[];
  }>("content/automation/autopilot-search-query-gap-brief.json");
  const reviewOptimizationBrief = readJson<{
    briefs?: Array<{
      file: string;
      internalLink?: unknown;
      proposedDescription?: string;
      proposedOpeningAdditions?: unknown[];
      proposedTitle?: string;
      ready?: boolean;
      warningRemediation?: unknown[];
    }>;
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    nextBriefs?: unknown[];
    summary: {
      briefs: number;
      briefsWithAction: number;
      exactQueryWeakItems: number;
      missingPublicLinkItems: number;
      readyBriefs: number;
      unsafeCommands: number;
    };
  }>("content/automation/review-optimization-brief.json");
  const reviewCannibalizationBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    highRiskItems?: unknown[];
    items?: Array<{
      candidate?: { file?: string };
      humanReviewChecklist?: unknown[];
      publishedSimilar?: unknown[];
      recommendation?: string;
      reviewSimilar?: unknown[];
      riskLevel?: string;
    }>;
    sourceEvidence: { uniqueActionFiles: number };
    summary: {
      candidateFiles: number;
      highRiskItems: number;
      items: number;
      itemsWithPublishedComparison: number;
      itemsWithReviewComparison: number;
      mediumRiskItems: number;
      unsafeCommands: number;
    };
  }>("content/automation/review-cannibalization-brief.json");
  const reviewFreshnessBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      humanReviewChecklist?: unknown[];
      officialSourceTargets?: unknown[];
      readyForFreshnessReview?: boolean;
      reachableSources?: number;
      staleSensitiveChecks?: unknown[];
      sourceTargets?: number;
    }>;
    sourceEvidence: { uniqueActionFiles: number };
    summary: {
      blockedItems: number;
      highRiskItems: number;
      items: number;
      itemsWithOfficialSources: number;
      itemsWithReachableSources: number;
      readyItems: number;
      unsafeCommands: number;
    };
  }>("content/automation/review-freshness-brief.json");
  const searchSnippets = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
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
  }>("content/automation/search-snippet-readiness-audit.json");
  const structuredData = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
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
  }>("content/automation/structured-data-readiness-audit.json");
  const articles = (await articleFiles()).map(readArticle);

  const reviewFiles = reviewQueue.recommendedToday.map((item) => item.file);
  const packFiles = publishPack.items.map((item) => item.file);
  const reviewBatches = opportunityMap.reviewBatches || [];
  const packItemsMissingSourceReview = publishPack.items
    .filter((item) => !item.officialSourceTargets?.length || !item.factCheckQueries?.length)
    .map((item) => item.file);
  const packItemsMissingReviewContext = publishPack.items
    .filter((item) => !item.humanDecisionChecklist?.length || !item.riskReviewChecklist?.length || !item.matchedContentOpportunity)
    .map((item) => item.file);
  const clusters = reviewQueue.recommendedToday.map((item) => item.cluster);
  const repeatedClusters = clusters.filter((cluster, index) => clusters.indexOf(cluster) !== index);
  const nonPublishedIndexed = articles
    .filter((article) => article.data.status !== "published" && article.data.noindex === false)
    .map((article) => rel(article.file));
  const publishedNoindexed = articles
    .filter((article) => article.data.status === "published" && article.data.noindex !== false)
    .map((article) => rel(article.file));

  const checks: GateCheck[] = [
    {
      name: "review automation never auto-publishes",
      ok: reviewQueue.guardrails.autoPublish === false && publishPack.guardrails.autoPublish === false,
    },
    {
      name: "publish pack matches recommended review files",
      ok: sameList(packFiles, reviewFiles),
      detail: `review=${reviewFiles.join(", ")} pack=${packFiles.join(", ")}`,
    },
    {
      name: "review batch plan stays manual and has candidates",
      ok:
        reviewPlan.guardrails.autoMarkReview === false &&
        reviewPlan.guardrails.autoPublish === false &&
        reviewPlan.totals.plannedBatches >= 3 &&
        reviewPlan.totals.plannedCandidates >= 3 &&
        Boolean(reviewPlan.batches?.every((batch) => (batch.candidates?.length || 0) > 0)),
      detail: `batches=${reviewPlan.totals.plannedBatches}, candidates=${reviewPlan.totals.plannedCandidates}`,
    },
    {
      name: "publish pack includes source verification tasks",
      ok: packItemsMissingSourceReview.length === 0,
      detail: packItemsMissingSourceReview.length ? packItemsMissingSourceReview.join(", ") : `${publishPack.items.length} item(s) covered`,
    },
    {
      name: "publish pack includes human decision and risk context",
      ok: packItemsMissingReviewContext.length === 0,
      detail: packItemsMissingReviewContext.length ? packItemsMissingReviewContext.join(", ") : `${publishPack.items.length} item(s) covered`,
    },
    {
      name: "recommended review candidates pass preflight",
      ok: reviewPreflight.ok === true && reviewPreflight.summary.failed === 0,
      detail: `failed=${reviewPreflight.summary.failed}`,
    },
    {
      name: "recommended review clusters are diverse",
      ok: repeatedClusters.length === 0,
      detail: repeatedClusters.length ? repeatedClusters.join(", ") : clusters.join(", "),
    },
    {
      name: "SEO safety check passed",
      ok: seo.ok === true,
      detail: JSON.stringify({
        leakedDraftOrReview: seo.leakedDraftOrReview,
        nonPublishedWithNoindexFalse: seo.nonPublishedWithNoindexFalse,
        publishedButNoindexed: seo.publishedButNoindexed,
      }),
    },
    {
      name: "searchability check passed",
      ok: searchability.failedItems.length === 0 && searchability.score >= 100,
      detail: `score=${searchability.score}, failed=${searchability.failedItems.length}`,
    },
    {
      name: "searchability check covers llms.txt",
      ok: Number(searchability.summary?.checks || 0) >= 13,
      detail: `checks=${searchability.summary?.checks || 0}`,
    },
    {
      name: "draft guardrail sanitizer is clean",
      ok: sanitize.changedFiles === 0 && sanitize.totalReplacements === 0,
      detail: `changedFiles=${sanitize.changedFiles}, totalReplacements=${sanitize.totalReplacements}`,
    },
    {
      name: "no non-published article is indexable",
      ok: nonPublishedIndexed.length === 0,
      detail: nonPublishedIndexed.join(", "),
    },
    {
      name: "all published articles are indexable",
      ok: publishedNoindexed.length === 0,
      detail: publishedNoindexed.join(", "),
    },
    {
      name: "project status still stops before publishing",
      ok: projectStatus.articles.publishableNow.length === 0,
      detail: `publicPublished=${projectStatus.articles.publicPublished}, publishableNow=${projectStatus.articles.publishableNow.length}`,
    },
    {
      name: "traffic evidence audit passed and is read-only",
      ok: trafficEvidence.guardrails.autoPublish === false && trafficEvidence.summary.failedChecks === 0,
      detail: `failedChecks=${trafficEvidence.summary.failedChecks}, measuredTrafficSources=${trafficEvidence.summary.measuredTrafficSources}`,
    },
    {
      name: "traffic is not claimed without measured metrics",
      ok:
        trafficEvidence.summary.trafficDataAvailable === false &&
        trafficEvidence.summary.canClaimTraffic === false &&
        trafficEvidence.summary.claimableMetrics === 0,
      detail: `trafficDataAvailable=${trafficEvidence.summary.trafficDataAvailable}, canClaimTraffic=${trafficEvidence.summary.canClaimTraffic}, claimableMetrics=${trafficEvidence.summary.claimableMetrics}`,
    },
    {
      name: "traffic claim guard found no unsupported claims",
      ok:
        trafficClaimGuard.guardrails.autoPublish === false &&
        trafficClaimGuard.summary.filesScanned > 0 &&
        trafficClaimGuard.summary.unsafeClaims === 0,
      detail: `filesScanned=${trafficClaimGuard.summary.filesScanned}, unsafeClaims=${trafficClaimGuard.summary.unsafeClaims}, watchMentions=${trafficClaimGuard.summary.watchMentions}`,
    },
    {
      name: "content integrity audit is read-only and clean",
      ok:
        contentIntegrity.guardrails.autoMarkReview === false &&
        contentIntegrity.guardrails.autoPublish === false &&
        contentIntegrity.summary.filesScanned === articles.length &&
        contentIntegrity.summary.blockingItems === 0,
      detail: `filesScanned=${contentIntegrity.summary.filesScanned}, blockingItems=${contentIntegrity.summary.blockingItems}`,
    },
    {
      name: "content integrity audit covers public, recommended, and Wave 1 items",
      ok:
        contentIntegrity.summary.publicItems === projectStatus.articles.publicPublished &&
        contentIntegrity.summary.recommendedItems === reviewQueue.recommendedToday.length &&
        contentIntegrity.summary.waveItems === waveApprovalPacket.summary.items,
      detail: `public=${contentIntegrity.summary.publicItems}, recommended=${contentIntegrity.summary.recommendedItems}, wave=${contentIntegrity.summary.waveItems}`,
    },
    {
      name: "internal link opportunity audit is read-only and covers expansion candidates",
      ok:
        internalLinks.guardrails.autoEditArticles === false &&
        internalLinks.guardrails.autoMarkReview === false &&
        internalLinks.guardrails.autoPublish === false &&
        internalLinks.summary.publicArticles === projectStatus.articles.publicPublished &&
        internalLinks.summary.expansionItems === publicExpansion.summary.items &&
        internalLinks.summary.candidateItems === publicExpansion.summary.items,
      detail: `public=${internalLinks.summary.publicArticles}, expansion=${internalLinks.summary.expansionItems}, candidates=${internalLinks.summary.candidateItems}`,
    },
    {
      name: "internal link opportunity audit has public suggestions for Wave 1",
      ok:
        internalLinks.summary.waveItems === waveApprovalPacket.summary.items &&
        internalLinks.summary.recommendedItems === reviewQueue.recommendedToday.length &&
        internalLinks.summary.waveItemsMissingPublicLinkSuggestion === 0 &&
        internalLinks.summary.candidateItemsMissingPublicLinkSuggestion === 0,
      detail: `wave=${internalLinks.summary.waveItems}, waveMissing=${internalLinks.summary.waveItemsMissingPublicLinkSuggestion}, candidateMissing=${internalLinks.summary.candidateItemsMissingPublicLinkSuggestion}`,
    },
    {
      name: "source target health audit is read-only and covers review source scopes",
      ok:
        sourceHealth.guardrails.autoEditArticles === false &&
        sourceHealth.guardrails.autoMarkReview === false &&
        sourceHealth.guardrails.autoPublish === false &&
        sourceHealth.summary.currentReviewFiles === publishPack.items.length &&
        sourceHealth.summary.publicGapDecisionFiles === publicCoverageGapDecisionPack.summary.items &&
        sourceHealth.summary.nextSourcePackFiles === nextReviewSourcePack.summary.items &&
        sourceHealth.summary.filesCovered >= nextReviewSourcePack.summary.items,
      detail: `current=${sourceHealth.summary.currentReviewFiles}, publicGap=${sourceHealth.summary.publicGapDecisionFiles}, next=${sourceHealth.summary.nextSourcePackFiles}, files=${sourceHealth.summary.filesCovered}`,
    },
    {
      name: "source target health audit has reachable URLs for every covered review file",
      ok:
        sourceHealth.summary.missingUrlTargets === 0 &&
        sourceHealth.summary.filesWithoutReachableSource === 0 &&
        sourceHealth.summary.filesWithReachableSource === sourceHealth.summary.filesCovered &&
        sourceHealth.summary.checkedUrls === sourceHealth.summary.uniqueUrls &&
        sourceHealth.summary.okUrls > 0 &&
        sourceHealth.summary.sourceReferences >= sourceHealth.summary.filesCovered,
      detail: `checked=${sourceHealth.summary.checkedUrls}, ok=${sourceHealth.summary.okUrls}, failed=${sourceHealth.summary.failedUrls}, missingTargets=${sourceHealth.summary.missingUrlTargets}, filesWithoutReachable=${sourceHealth.summary.filesWithoutReachableSource}`,
    },
    {
      name: "review action board is read-only and covers active review queues",
      ok:
        reviewActionBoard.guardrails.autoEditArticles === false &&
        reviewActionBoard.guardrails.autoMarkReview === false &&
        reviewActionBoard.guardrails.autoPublish === false &&
        reviewActionBoard.summary.waveTasks === waveApprovalPacket.summary.items &&
        reviewActionBoard.summary.publicGapTasks === publicCoverageGapDecisionPack.summary.items &&
        reviewActionBoard.summary.tasks === reviewActionBoard.summary.waveTasks + reviewActionBoard.summary.publicGapTasks,
      detail: `tasks=${reviewActionBoard.summary.tasks}, wave=${reviewActionBoard.summary.waveTasks}, publicGap=${reviewActionBoard.summary.publicGapTasks}`,
    },
    {
      name: "review action board tasks are ready and preserve command boundaries",
      ok:
        reviewActionBoard.summary.unsafeTasks === 0 &&
        reviewActionBoard.summary.readyTasks === reviewActionBoard.summary.tasks &&
        reviewActionBoard.summary.waveReadyTasks === reviewActionBoard.summary.waveTasks &&
        reviewActionBoard.summary.publicGapReadyTasks === reviewActionBoard.summary.publicGapTasks &&
        (reviewActionBoard.unsafeTasks?.length || 0) === 0 &&
        Boolean(
          reviewActionBoard.tasks?.every(
            (task) =>
              task.ready === true &&
              (task.sourceTargets || 0) > 0 &&
              task.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              task.commandBoundary?.publishDryRunAfterReview &&
              task.commandBoundary.publishConfirm === "not-included" &&
              !task.commandBoundary.publishDryRunAfterReview.includes("--confirm"),
          ),
      ),
      detail: `ready=${reviewActionBoard.summary.readyTasks}, unsafe=${reviewActionBoard.summary.unsafeTasks}`,
    },
    {
      name: "review portfolio board deduplicates all review packs",
      ok:
        reviewPortfolioBoard.guardrails.autoEditArticles === false &&
        reviewPortfolioBoard.guardrails.autoMarkReview === false &&
        reviewPortfolioBoard.guardrails.autoPublish === false &&
        reviewPortfolioBoard.summary.sourceCandidates ===
          reviewPortfolioBoard.sourceCounts.wave +
            reviewPortfolioBoard.sourceCounts.publicGap +
            reviewPortfolioBoard.sourceCounts.deployment +
            reviewPortfolioBoard.sourceCounts.prompt &&
        reviewPortfolioBoard.summary.items < reviewPortfolioBoard.summary.sourceCandidates &&
        reviewPortfolioBoard.summary.duplicateMentions === reviewPortfolioBoard.summary.sourceCandidates - reviewPortfolioBoard.summary.items &&
        reviewPortfolioBoard.summary.itemsWithMultipleSources > 0,
      detail: `sourceCandidates=${reviewPortfolioBoard.summary.sourceCandidates}, uniqueItems=${reviewPortfolioBoard.summary.items}, duplicates=${reviewPortfolioBoard.summary.duplicateMentions}, multiSource=${reviewPortfolioBoard.summary.itemsWithMultipleSources}`,
    },
    {
      name: "review portfolio board keeps unique candidates safe and human-gated",
      ok:
        reviewPortfolioBoard.summary.unsafeItems === 0 &&
        reviewPortfolioBoard.summary.readyItems === reviewPortfolioBoard.summary.items &&
        reviewPortfolioBoard.summary.safeDraftItems === reviewPortfolioBoard.summary.items &&
        reviewPortfolioBoard.summary.itemsWithSourceTargets === reviewPortfolioBoard.summary.items &&
        reviewPortfolioBoard.summary.itemsWithCommandBoundary === reviewPortfolioBoard.summary.items &&
        Boolean(
          reviewPortfolioBoard.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.sourceTargets?.length || 0) > 0 &&
              (item.sourceTypes?.length || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit human approval"),
          ),
        ),
      detail: `ready=${reviewPortfolioBoard.summary.readyItems}, safe=${reviewPortfolioBoard.summary.safeDraftItems}, sources=${reviewPortfolioBoard.summary.itemsWithSourceTargets}, commands=${reviewPortfolioBoard.summary.itemsWithCommandBoundary}`,
    },
    {
      name: "autopilot review queue is read-only and covers portfolio candidates",
      ok:
        autopilotReviewQueue.guardrails.autoEditArticles === false &&
        autopilotReviewQueue.guardrails.autoMarkReview === false &&
        autopilotReviewQueue.guardrails.autoPublish === false &&
        autopilotReviewQueue.summary.items === reviewPortfolioBoard.summary.items &&
        autopilotReviewQueue.summary.nextAssignments > 0 &&
        autopilotReviewQueue.summary.nextAssignments <= 10 &&
        autopilotReviewQueue.summary.withSourceTargets === autopilotReviewQueue.summary.items,
      detail: `items=${autopilotReviewQueue.summary.items}, next=${autopilotReviewQueue.summary.nextAssignments}, sources=${autopilotReviewQueue.summary.withSourceTargets}`,
    },
    {
      name: "autopilot review queue keeps assignments safe and human-gated",
      ok:
        autopilotReviewQueue.summary.unsafeItems === 0 &&
        autopilotReviewQueue.summary.readyItems === autopilotReviewQueue.summary.items &&
        autopilotReviewQueue.summary.safeDraftItems === autopilotReviewQueue.summary.items &&
        Boolean(
          autopilotReviewQueue.nextAssignments?.every(
            (item) =>
              item.readyForAssignment === true &&
              item.safeDraft === true &&
              (item.blockers?.length || 0) === 0 &&
              (item.sourceTargets?.length || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit"),
          ),
        ),
      detail: `ready=${autopilotReviewQueue.summary.readyItems}, safe=${autopilotReviewQueue.summary.safeDraftItems}, unsafe=${autopilotReviewQueue.summary.unsafeItems}`,
    },
    {
      name: "autopilot approval packet packages the top safe assignments",
      ok:
        autopilotApprovalPacket.guardrails.autoEditArticles === false &&
        autopilotApprovalPacket.guardrails.autoMarkReview === false &&
        autopilotApprovalPacket.guardrails.autoPublish === false &&
        autopilotApprovalPacket.summary.items === 3 &&
        autopilotApprovalPacket.summary.queueUnsafeItems === 0 &&
        autopilotApprovalPacket.summary.readyForHumanApproval === autopilotApprovalPacket.summary.items &&
        autopilotApprovalPacket.summary.withSourceTargets === autopilotApprovalPacket.summary.items &&
        autopilotApprovalPacket.summary.withSearchQueries === autopilotApprovalPacket.summary.items,
      detail: `items=${autopilotApprovalPacket.summary.items}, ready=${autopilotApprovalPacket.summary.readyForHumanApproval}, sources=${autopilotApprovalPacket.summary.withSourceTargets}, queries=${autopilotApprovalPacket.summary.withSearchQueries}`,
    },
    {
      name: "autopilot approval packet keeps publish and review commands human-gated",
      ok:
        autopilotApprovalPacket.summary.unsafeItems === 0 &&
        Boolean(
          autopilotApprovalPacket.items?.every(
            (item) =>
              item.readyForHumanApproval === true &&
              item.articleMeta?.status === "draft" &&
              item.articleMeta?.noindex === true &&
              item.articleMeta?.humanReviewRequired === true &&
              (item.sourceTargets?.length || 0) > 0 &&
              (item.searchQueries?.length || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit"),
          ),
        ),
      detail: `unsafe=${autopilotApprovalPacket.summary.unsafeItems}, headings=${autopilotApprovalPacket.summary.withHeadings}`,
    },
    {
      name: "autopilot search intent brief covers approval packet",
      ok:
        autopilotSearchIntentBrief.guardrails.autoEditArticles === false &&
        autopilotSearchIntentBrief.guardrails.autoMarkReview === false &&
        autopilotSearchIntentBrief.guardrails.autoPublish === false &&
        autopilotSearchIntentBrief.summary.approvalItems === autopilotApprovalPacket.summary.items &&
        autopilotSearchIntentBrief.summary.items === autopilotApprovalPacket.summary.items &&
        autopilotSearchIntentBrief.summary.packetUnsafeItems === 0 &&
        autopilotSearchIntentBrief.summary.unsafeItems === 0,
      detail: `items=${autopilotSearchIntentBrief.summary.items}, weak=${autopilotSearchIntentBrief.summary.searchWeakItems}, unsafe=${autopilotSearchIntentBrief.summary.unsafeItems}`,
    },
    {
      name: "autopilot search intent brief produces human review suggestions",
      ok:
        autopilotSearchIntentBrief.summary.titleCoveredItems +
          autopilotSearchIntentBrief.summary.descriptionCoveredItems +
          autopilotSearchIntentBrief.summary.headingCoveredItems +
          autopilotSearchIntentBrief.summary.bodyCoveredItems >
          0 &&
        Boolean(
          autopilotSearchIntentBrief.items?.every(
            (item) => item.readyForHumanReview === true && (item.searchQueries?.length || 0) > 0 && (item.reviewSuggestions?.length || 0) > 0,
          ),
        ),
      detail: `title=${autopilotSearchIntentBrief.summary.titleCoveredItems}, description=${autopilotSearchIntentBrief.summary.descriptionCoveredItems}, heading=${autopilotSearchIntentBrief.summary.headingCoveredItems}, body=${autopilotSearchIntentBrief.summary.bodyCoveredItems}`,
    },
    {
      name: "autopilot internal link brief covers approval packet",
      ok:
        autopilotInternalLinkBrief.guardrails.autoEditArticles === false &&
        autopilotInternalLinkBrief.guardrails.autoMarkReview === false &&
        autopilotInternalLinkBrief.guardrails.autoPublish === false &&
        autopilotInternalLinkBrief.summary.approvalItems === autopilotApprovalPacket.summary.items &&
        autopilotInternalLinkBrief.summary.items === autopilotApprovalPacket.summary.items &&
        autopilotInternalLinkBrief.summary.packetUnsafeItems === 0 &&
        autopilotInternalLinkBrief.summary.unsafeItems === 0 &&
        autopilotInternalLinkBrief.summary.publicArticles > 0,
      detail: `items=${autopilotInternalLinkBrief.summary.items}, public=${autopilotInternalLinkBrief.summary.publicArticles}, unsafe=${autopilotInternalLinkBrief.summary.unsafeItems}`,
    },
    {
      name: "autopilot internal link brief provides public link suggestions",
      ok:
        autopilotInternalLinkBrief.summary.itemsWithSuggestions === autopilotInternalLinkBrief.summary.items &&
        Boolean(
          autopilotInternalLinkBrief.items?.every(
            (item) => item.readyForHumanReview === true && item.safeDraft === true && (item.suggestions?.length || 0) > 0,
          ),
        ),
      detail: `suggestions=${autopilotInternalLinkBrief.summary.itemsWithSuggestions}, missingCurrentPublicLink=${autopilotInternalLinkBrief.summary.itemsMissingCurrentPublicLink}, alreadyLinked=${autopilotInternalLinkBrief.summary.itemsAlreadyLinkedToPublic}`,
    },
    {
      name: "autopilot source verification brief covers approval packet",
      ok:
        autopilotSourceVerificationBrief.guardrails.autoEditArticles === false &&
        autopilotSourceVerificationBrief.guardrails.autoMarkReview === false &&
        autopilotSourceVerificationBrief.guardrails.autoPublish === false &&
        autopilotSourceVerificationBrief.summary.approvalItems === autopilotApprovalPacket.summary.items &&
        autopilotSourceVerificationBrief.summary.items === autopilotApprovalPacket.summary.items &&
        autopilotSourceVerificationBrief.summary.packetUnsafeItems === 0 &&
        autopilotSourceVerificationBrief.summary.unsafeItems === 0 &&
        autopilotSourceVerificationBrief.summary.totalReachableSources > 0,
      detail: `items=${autopilotSourceVerificationBrief.summary.items}, reachable=${autopilotSourceVerificationBrief.summary.totalReachableSources}, unsafe=${autopilotSourceVerificationBrief.summary.unsafeItems}`,
    },
    {
      name: "autopilot source verification brief provides source-backed review tasks",
      ok:
        autopilotSourceVerificationBrief.summary.itemsWithReachableSources === autopilotSourceVerificationBrief.summary.items &&
        autopilotSourceVerificationBrief.summary.itemsWithOfficialSources === autopilotSourceVerificationBrief.summary.items &&
        autopilotSourceVerificationBrief.summary.itemsWithFactCheckQueries === autopilotSourceVerificationBrief.summary.items &&
        autopilotSourceVerificationBrief.summary.itemsWithApprovalChecklist === autopilotSourceVerificationBrief.summary.items &&
        Boolean(
          autopilotSourceVerificationBrief.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.reachableSources || 0) > 0 &&
              (item.officialSourceTargets?.length || 0) > 0 &&
              (item.factCheckQueries?.length || 0) > 0 &&
              (item.approvalChecklist?.length || 0) > 0 &&
              (item.riskReviewChecklist?.length || 0) > 0,
          ),
        ),
      detail: `reachableItems=${autopilotSourceVerificationBrief.summary.itemsWithReachableSources}, official=${autopilotSourceVerificationBrief.summary.itemsWithOfficialSources}, factChecks=${autopilotSourceVerificationBrief.summary.itemsWithFactCheckQueries}, approvalChecks=${autopilotSourceVerificationBrief.summary.itemsWithApprovalChecklist}`,
    },
    {
      name: "autopilot human review playbook covers approval packet",
      ok:
        autopilotHumanReviewPlaybook.guardrails.autoEditArticles === false &&
        autopilotHumanReviewPlaybook.guardrails.autoMarkReview === false &&
        autopilotHumanReviewPlaybook.guardrails.autoPublish === false &&
        autopilotHumanReviewPlaybook.summary.approvalItems === autopilotApprovalPacket.summary.items &&
        autopilotHumanReviewPlaybook.summary.items === autopilotApprovalPacket.summary.items &&
        autopilotHumanReviewPlaybook.sourceEvidence.approvalPacketUnsafeItems === 0 &&
        autopilotHumanReviewPlaybook.sourceEvidence.searchIntentUnsafeItems === 0 &&
        autopilotHumanReviewPlaybook.sourceEvidence.internalLinkUnsafeItems === 0 &&
        autopilotHumanReviewPlaybook.sourceEvidence.sourceVerificationUnsafeItems === 0 &&
        autopilotHumanReviewPlaybook.sourceEvidence.optimizationUnsafeCommands === 0 &&
        autopilotHumanReviewPlaybook.summary.unsafeItems === 0,
      detail: `items=${autopilotHumanReviewPlaybook.summary.items}, ready=${autopilotHumanReviewPlaybook.summary.readyItems}, unsafe=${autopilotHumanReviewPlaybook.summary.unsafeItems}`,
    },
    {
      name: "autopilot human review playbook keeps actions human-gated",
      ok:
        autopilotHumanReviewPlaybook.summary.readyItems === autopilotHumanReviewPlaybook.summary.items &&
        autopilotHumanReviewPlaybook.summary.safeDraftItems === autopilotHumanReviewPlaybook.summary.items &&
        autopilotHumanReviewPlaybook.summary.itemsWithCommandBoundary === autopilotHumanReviewPlaybook.summary.items &&
        autopilotHumanReviewPlaybook.summary.itemsWithSearchActions === autopilotHumanReviewPlaybook.summary.items &&
        autopilotHumanReviewPlaybook.summary.itemsWithSourceActions === autopilotHumanReviewPlaybook.summary.items &&
        autopilotHumanReviewPlaybook.summary.itemsWithInternalLinkActions === autopilotHumanReviewPlaybook.summary.items &&
        Boolean(
          autopilotHumanReviewPlaybook.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.searchActions?.length || 0) > 0 &&
              (item.sourceActions?.length || 0) > 0 &&
              (item.internalLinkActions?.length || 0) > 0 &&
              item.manualOnlyCommands?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.manualOnlyCommands?.publishDryRunAfterReview?.includes("--confirm") &&
              item.manualOnlyCommands?.publishConfirm === "not-included",
          ),
        ),
      detail: `commands=${autopilotHumanReviewPlaybook.summary.itemsWithCommandBoundary}, search=${autopilotHumanReviewPlaybook.summary.itemsWithSearchActions}, source=${autopilotHumanReviewPlaybook.summary.itemsWithSourceActions}, links=${autopilotHumanReviewPlaybook.summary.itemsWithInternalLinkActions}`,
    },
    {
      name: "autopilot review sprint board covers next assignments",
      ok:
        autopilotReviewSprintBoard.guardrails.autoEditArticles === false &&
        autopilotReviewSprintBoard.guardrails.autoMarkReview === false &&
        autopilotReviewSprintBoard.guardrails.autoPublish === false &&
        autopilotReviewSprintBoard.sourceEvidence.autopilotQueueUnsafeItems === 0 &&
        autopilotReviewSprintBoard.sourceEvidence.humanReviewPlaybookUnsafeItems === 0 &&
        autopilotReviewSprintBoard.sourceEvidence.queueNextAssignments === autopilotReviewQueue.summary.nextAssignments &&
        autopilotReviewSprintBoard.summary.items === autopilotReviewQueue.summary.nextAssignments &&
        autopilotReviewSprintBoard.summary.readyWithPlaybook === autopilotHumanReviewPlaybook.summary.items &&
        autopilotReviewSprintBoard.summary.queuedForPlaybook === autopilotReviewSprintBoard.summary.items - autopilotReviewSprintBoard.summary.readyWithPlaybook &&
        autopilotReviewSprintBoard.summary.itemsNeedingSearchQuery === autopilotReviewSprintBoard.summary.items - autopilotReviewSprintBoard.summary.withSearchQueries &&
        autopilotReviewSprintBoard.summary.unsafeItems === 0,
      detail: `items=${autopilotReviewSprintBoard.summary.items}, readyWithPlaybook=${autopilotReviewSprintBoard.summary.readyWithPlaybook}, queued=${autopilotReviewSprintBoard.summary.queuedForPlaybook}, needsQuery=${autopilotReviewSprintBoard.summary.itemsNeedingSearchQuery}, unsafe=${autopilotReviewSprintBoard.summary.unsafeItems}`,
    },
    {
      name: "autopilot review sprint board keeps sprint actions human-gated",
      ok:
        autopilotReviewSprintBoard.summary.readyForSprint === autopilotReviewSprintBoard.summary.items &&
        autopilotReviewSprintBoard.summary.safeDraftItems === autopilotReviewSprintBoard.summary.items &&
        autopilotReviewSprintBoard.summary.itemsWithCommandBoundary === autopilotReviewSprintBoard.summary.items &&
        autopilotReviewSprintBoard.summary.withSearchQueries > 0 &&
        autopilotReviewSprintBoard.summary.withSourceTargets === autopilotReviewSprintBoard.summary.items &&
        Boolean(
          autopilotReviewSprintBoard.items?.every(
            (item) =>
              item.readyForSprint === true &&
              item.safeDraft === true &&
              (item.reviewChecklist?.length || 0) > 0 &&
              (item.sourceTargets || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              (item.playbookStage === "ready-with-playbook" || item.playbookStage === "queued-for-playbook"),
          ),
        ),
      detail: `ready=${autopilotReviewSprintBoard.summary.readyForSprint}, commands=${autopilotReviewSprintBoard.summary.itemsWithCommandBoundary}, queries=${autopilotReviewSprintBoard.summary.withSearchQueries}, sources=${autopilotReviewSprintBoard.summary.withSourceTargets}`,
    },
    {
      name: "autopilot search query gap brief covers sprint query gaps",
      ok:
        autopilotSearchQueryGapBrief.guardrails.autoEditArticles === false &&
        autopilotSearchQueryGapBrief.guardrails.autoMarkReview === false &&
        autopilotSearchQueryGapBrief.guardrails.autoPublish === false &&
        autopilotSearchQueryGapBrief.sourceEvidence.sprintBoardUnsafeItems === 0 &&
        autopilotSearchQueryGapBrief.sourceEvidence.sprintBoardItemsNeedingSearchQuery === autopilotReviewSprintBoard.summary.itemsNeedingSearchQuery &&
        autopilotSearchQueryGapBrief.summary.items === autopilotReviewSprintBoard.summary.itemsNeedingSearchQuery &&
        autopilotSearchQueryGapBrief.summary.unsafeItems === 0,
      detail: `items=${autopilotSearchQueryGapBrief.summary.items}, sprintNeedsQuery=${autopilotReviewSprintBoard.summary.itemsNeedingSearchQuery}, unsafe=${autopilotSearchQueryGapBrief.summary.unsafeItems}`,
    },
    {
      name: "autopilot search query gap brief has source-backed manual query suggestions",
      ok:
        autopilotSearchQueryGapBrief.summary.readyItems === autopilotSearchQueryGapBrief.summary.items &&
        autopilotSearchQueryGapBrief.summary.safeDraftItems === autopilotSearchQueryGapBrief.summary.items &&
        autopilotSearchQueryGapBrief.summary.itemsWithCommandBoundary === autopilotSearchQueryGapBrief.summary.items &&
        autopilotSearchQueryGapBrief.summary.itemsWithCoverageEvidence === autopilotSearchQueryGapBrief.summary.items &&
        autopilotSearchQueryGapBrief.summary.itemsWithFactCheckQueries === autopilotSearchQueryGapBrief.summary.items &&
        autopilotSearchQueryGapBrief.summary.itemsWithOfficialSources === autopilotSearchQueryGapBrief.summary.items &&
        autopilotSearchQueryGapBrief.summary.itemsWithRecommendedQueries === autopilotSearchQueryGapBrief.summary.items &&
        Boolean(
          autopilotSearchQueryGapBrief.items?.every(
            (item) =>
              item.readyForManualSearchQueryReview === true &&
              item.safeDraft === true &&
              (item.sourceEvidence?.length || 0) > 0 &&
              (item.recommendedSearchQueries?.length || 0) >= 6 &&
              (item.factCheckQueries?.length || 0) > 0 &&
              (item.officialSourceTargets?.length || 0) > 0 &&
              (item.reviewChecklist?.length || 0) >= 5 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${autopilotSearchQueryGapBrief.summary.readyItems}, coverage=${autopilotSearchQueryGapBrief.summary.itemsWithCoverageEvidence}, recommended=${autopilotSearchQueryGapBrief.summary.totalRecommendedQueries}, sources=${autopilotSearchQueryGapBrief.summary.itemsWithOfficialSources}`,
    },
    {
      name: "review optimization brief is read-only and covers ready action-board tasks",
      ok:
        reviewOptimizationBrief.guardrails.autoEditArticles === false &&
        reviewOptimizationBrief.guardrails.autoMarkReview === false &&
        reviewOptimizationBrief.guardrails.autoPublish === false &&
        reviewOptimizationBrief.summary.briefs === reviewActionBoard.summary.readyTasks &&
        reviewOptimizationBrief.summary.readyBriefs === reviewOptimizationBrief.summary.briefs &&
        reviewOptimizationBrief.summary.unsafeCommands === 0,
      detail: `briefs=${reviewOptimizationBrief.summary.briefs}, ready=${reviewOptimizationBrief.summary.readyBriefs}, unsafeCommands=${reviewOptimizationBrief.summary.unsafeCommands}`,
    },
    {
      name: "review optimization brief has actionable copydesk guidance",
      ok:
        reviewOptimizationBrief.summary.briefsWithAction >= reviewOptimizationBrief.summary.briefs - 1 &&
        reviewOptimizationBrief.summary.missingPublicLinkItems >= reviewActionBoard.summary.publicGapTasks &&
        Boolean(
          reviewOptimizationBrief.briefs?.every(
            (item) =>
              item.ready === true &&
              Boolean(item.proposedTitle) &&
              Boolean(item.proposedDescription) &&
              (item.proposedOpeningAdditions?.length || 0) > 0 &&
              ((item.warningRemediation?.length || 0) > 0 || Boolean(item.internalLink)),
          ),
        ),
      detail: `withAction=${reviewOptimizationBrief.summary.briefsWithAction}, missingPublicLinkItems=${reviewOptimizationBrief.summary.missingPublicLinkItems}, exactQueryWeak=${reviewOptimizationBrief.summary.exactQueryWeakItems}`,
    },
    {
      name: "search snippet readiness audit is read-only and covers public plus expansion items",
      ok:
        searchSnippets.guardrails.autoEditArticles === false &&
        searchSnippets.guardrails.autoMarkReview === false &&
        searchSnippets.guardrails.autoPublish === false &&
        searchSnippets.summary.publicItems === projectStatus.articles.publicPublished &&
        searchSnippets.summary.expansionItems === publicExpansion.summary.items &&
        searchSnippets.summary.scopedItems >= projectStatus.articles.publicPublished + publicExpansion.summary.items,
      detail: `public=${searchSnippets.summary.publicItems}, expansion=${searchSnippets.summary.expansionItems}, scoped=${searchSnippets.summary.scopedItems}`,
    },
    {
      name: "search snippet readiness audit has no blocking Wave 1 issues",
      ok:
        searchSnippets.summary.blockingItems === 0 &&
        searchSnippets.summary.waveItems === waveApprovalPacket.summary.items &&
        searchSnippets.summary.recommendedItems === reviewQueue.recommendedToday.length &&
        searchSnippets.summary.waveItemsWithBlockingIssues === 0,
      detail: `blocking=${searchSnippets.summary.blockingItems}, wave=${searchSnippets.summary.waveItems}, waveBlocking=${searchSnippets.summary.waveItemsWithBlockingIssues}, warnings=${searchSnippets.summary.warningItems}`,
    },
    {
      name: "structured data readiness audit is read-only and covers public plus expansion items",
      ok:
        structuredData.guardrails.autoEditArticles === false &&
        structuredData.guardrails.autoMarkReview === false &&
        structuredData.guardrails.autoPublish === false &&
        structuredData.summary.publicItems === projectStatus.articles.publicPublished &&
        structuredData.summary.expansionItems === publicExpansion.summary.items &&
        structuredData.summary.scopedItems >= projectStatus.articles.publicPublished + publicExpansion.summary.items,
      detail: `public=${structuredData.summary.publicItems}, expansion=${structuredData.summary.expansionItems}, scoped=${structuredData.summary.scopedItems}`,
    },
    {
      name: "structured data readiness audit has JSON-LD previews and no blocking Wave 1 issues",
      ok:
        structuredData.summary.blockingItems === 0 &&
        structuredData.summary.jsonLdPreviewItems === structuredData.summary.scopedItems &&
        structuredData.summary.waveItems === waveApprovalPacket.summary.items &&
        structuredData.summary.recommendedItems === reviewQueue.recommendedToday.length &&
        structuredData.summary.waveItemsWithBlockingIssues === 0,
      detail: `blocking=${structuredData.summary.blockingItems}, previews=${structuredData.summary.jsonLdPreviewItems}, wave=${structuredData.summary.waveItems}, waveBlocking=${structuredData.summary.waveItemsWithBlockingIssues}, warnings=${structuredData.summary.warningItems}`,
    },
    {
      name: "SEO opportunity map has review-ready drafts",
      ok: opportunityMap.totals.reviewReadyDrafts > 0,
      detail: `reviewReadyDrafts=${opportunityMap.totals.reviewReadyDrafts}`,
    },
    {
      name: "SEO opportunity map includes manual review batches",
      ok: reviewBatches.length > 0 && reviewBatches.every((batch) => (batch.candidates?.length || 0) > 0),
      detail: `batches=${reviewBatches.length}`,
    },
    {
      name: "content opportunity backlog has reviewable topics",
      ok:
        contentBacklog.totals.topics >= 6 &&
        contentBacklog.totals.topicsWithReadyCandidates > 0 &&
        Boolean(contentBacklog.opportunities?.every((item) => item.searchDemandNote && item.readyCandidates)),
      detail: `topics=${contentBacklog.totals.topics}, topicsWithReadyCandidates=${contentBacklog.totals.topicsWithReadyCandidates}`,
    },
    {
      name: "AI deployment coverage has broad reviewable coverage",
      ok:
        deploymentCoverage.guardrails.autoMarkReview === false &&
        deploymentCoverage.guardrails.autoPublish === false &&
        deploymentCoverage.summary.topics >= 8 &&
        deploymentCoverage.summary.topicsWithReadyCandidates >= 8 &&
        deploymentCoverage.summary.reviewReadyDeploymentDrafts >= 30 &&
        deploymentCoverage.summary.uniqueCandidateFiles >= 20,
      detail: `topics=${deploymentCoverage.summary.topics}, withCandidates=${deploymentCoverage.summary.topicsWithReadyCandidates}, reviewReady=${deploymentCoverage.summary.reviewReadyDeploymentDrafts}, unique=${deploymentCoverage.summary.uniqueCandidateFiles}`,
    },
    {
      name: "AI deployment coverage includes source and search review tasks",
      ok:
        (deploymentCoverage.sourceEvidence?.officialSources?.length || 0) >= 8 &&
        Boolean(deploymentCoverage.coverage?.every((item) => (item.searchQueries?.length || 0) > 0 && (item.sourceTargets?.length || 0) > 0)),
      detail: `officialSources=${deploymentCoverage.sourceEvidence?.officialSources?.length || 0}, topics=${deploymentCoverage.coverage?.length || 0}`,
    },
    {
      name: "AI deployment candidates stay draft and non-indexable",
      ok: deploymentCoverage.summary.unsafeCandidateItems === 0,
      detail: `unsafeCandidateItems=${deploymentCoverage.summary.unsafeCandidateItems}`,
    },
    {
      name: "AI deployment review pack is read-only and covers deployment topics",
      ok:
        deploymentReviewPack.guardrails.autoEditArticles === false &&
        deploymentReviewPack.guardrails.autoMarkReview === false &&
        deploymentReviewPack.guardrails.autoPublish === false &&
        deploymentReviewPack.summary.items >= 10 &&
        deploymentReviewPack.summary.topicsCovered >= deploymentCoverage.summary.topics &&
        deploymentReviewPack.summary.uniqueFiles === deploymentReviewPack.summary.items &&
        deploymentReviewPack.summary.duplicateFiles === 0,
      detail: `items=${deploymentReviewPack.summary.items}, topics=${deploymentReviewPack.summary.topicsCovered}/${deploymentCoverage.summary.topics}, unique=${deploymentReviewPack.summary.uniqueFiles}, duplicates=${deploymentReviewPack.summary.duplicateFiles}`,
    },
    {
      name: "AI deployment review pack has source-backed human review boundaries",
      ok:
        deploymentReviewPack.summary.unsafeItems === 0 &&
        deploymentReviewPack.summary.safeDraftItems === deploymentReviewPack.summary.items &&
        deploymentReviewPack.summary.itemsWithOfficialSources === deploymentReviewPack.summary.items &&
        deploymentReviewPack.summary.itemsWithSearchQueries === deploymentReviewPack.summary.items &&
        deploymentReviewPack.summary.itemsWithChecklists === deploymentReviewPack.summary.items &&
        deploymentReviewPack.summary.itemsWithCommandBoundary === deploymentReviewPack.summary.items &&
        Boolean(
          deploymentReviewPack.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.sourceTargets?.length || 0) >= 2 &&
              (item.searchQueries?.length || 0) >= 3 &&
              (item.humanDecisionChecklist?.length || 0) >= 7 &&
              (item.riskChecks?.length || 0) >= 6 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit human approval"),
          ),
        ),
      detail: `safe=${deploymentReviewPack.summary.safeDraftItems}, sources=${deploymentReviewPack.summary.itemsWithOfficialSources}, commands=${deploymentReviewPack.summary.itemsWithCommandBoundary}`,
    },
    {
      name: "industry prompt coverage has broad reviewable coverage",
      ok:
        promptCoverage.guardrails.autoMarkReview === false &&
        promptCoverage.guardrails.autoPublish === false &&
        promptCoverage.summary.industries >= 12 &&
        promptCoverage.summary.industriesWithReadyCandidates >= 10 &&
        promptCoverage.summary.reviewReadyPromptDrafts >= 10 &&
        promptCoverage.summary.uniqueCandidateFiles >= 10,
      detail: `industries=${promptCoverage.summary.industries}, withCandidates=${promptCoverage.summary.industriesWithReadyCandidates}, reviewReady=${promptCoverage.summary.reviewReadyPromptDrafts}, unique=${promptCoverage.summary.uniqueCandidateFiles}`,
    },
    {
      name: "industry prompt coverage includes source and search review tasks",
      ok:
        (promptCoverage.sourceEvidence?.officialPromptSources?.length || 0) >= 4 &&
        Boolean(promptCoverage.coverage?.every((item) => (item.searchQueries?.length || 0) > 0 && (item.sourceTargets?.length || 0) > 0)),
      detail: `officialSources=${promptCoverage.sourceEvidence?.officialPromptSources?.length || 0}, industries=${promptCoverage.coverage?.length || 0}`,
    },
    {
      name: "industry prompt candidates stay draft and non-indexable",
      ok: promptCoverage.summary.unsafeCandidateItems === 0,
      detail: `unsafeCandidateItems=${promptCoverage.summary.unsafeCandidateItems}`,
    },
    {
      name: "industry prompt review pack is read-only and deduplicated",
      ok:
        promptReviewPack.guardrails.autoEditArticles === false &&
        promptReviewPack.guardrails.autoMarkReview === false &&
        promptReviewPack.guardrails.autoPublish === false &&
        promptReviewPack.summary.items >= 10 &&
        promptReviewPack.summary.uniqueFiles === promptReviewPack.summary.items &&
        promptReviewPack.summary.duplicateFiles === 0,
      detail: `items=${promptReviewPack.summary.items}, unique=${promptReviewPack.summary.uniqueFiles}, duplicates=${promptReviewPack.summary.duplicateFiles}`,
    },
    {
      name: "industry prompt review pack has source-backed human review boundaries",
      ok:
        promptReviewPack.summary.unsafeItems === 0 &&
        promptReviewPack.summary.safeDraftItems === promptReviewPack.summary.items &&
        promptReviewPack.summary.itemsWithOfficialSources === promptReviewPack.summary.items &&
        promptReviewPack.summary.itemsWithSearchQueries === promptReviewPack.summary.items &&
        promptReviewPack.summary.itemsWithChecklists === promptReviewPack.summary.items &&
        promptReviewPack.summary.itemsWithCommandBoundary === promptReviewPack.summary.items &&
        Boolean(
          promptReviewPack.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.sourceTargets?.length || 0) >= 4 &&
              (item.searchQueries?.length || 0) >= 3 &&
              (item.humanDecisionChecklist?.length || 0) >= 6 &&
              (item.riskChecks?.length || 0) >= 4 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit human approval"),
          ),
        ),
      detail: `safe=${promptReviewPack.summary.safeDraftItems}, sources=${promptReviewPack.summary.itemsWithOfficialSources}, commands=${promptReviewPack.summary.itemsWithCommandBoundary}, publicPrompt=${promptReviewPack.summary.promptPublicArticles}`,
    },
    {
      name: "search intent lane map is read-only and broad",
      ok:
        searchIntentLanes.guardrails.autoEditArticles === false &&
        searchIntentLanes.guardrails.autoMarkReview === false &&
        searchIntentLanes.guardrails.autoPublish === false &&
        searchIntentLanes.summary.lanes >= 12 &&
        searchIntentLanes.summary.highPriorityLanes >= 8 &&
        searchIntentLanes.summary.lanesWithReadyDrafts === searchIntentLanes.summary.lanes,
      detail: `lanes=${searchIntentLanes.summary.lanes}, highPriority=${searchIntentLanes.summary.highPriorityLanes}, withReadyDrafts=${searchIntentLanes.summary.lanesWithReadyDrafts}`,
    },
    {
      name: "search intent lane map includes sources, review focus, and safe candidates",
      ok:
        searchIntentLanes.summary.totalReadyDraftMatches >= 50 &&
        searchIntentLanes.summary.lanesWithoutPublicCoverage >= 6 &&
        Boolean(
          searchIntentLanes.lanes?.every(
            (lane) =>
              (lane.intentSeeds?.length || 0) >= 3 &&
              (lane.sourceTargets?.length || 0) >= 2 &&
              (lane.reviewFocus?.length || 0) >= 3 &&
              (lane.workflowAngles?.length || 0) >= 3 &&
              (lane.matchedCandidates?.length || 0) > 0,
          ),
        ),
      detail: `readyDraftMatches=${searchIntentLanes.summary.totalReadyDraftMatches}, noPublicCoverage=${searchIntentLanes.summary.lanesWithoutPublicCoverage}, notReadyMatched=${searchIntentLanes.summary.notReadyMatchedDrafts}`,
    },
    {
      name: "search intent approval packet is read-only and covers current wave plus next gaps",
      ok:
        searchIntentApproval.guardrails.autoEditArticles === false &&
        searchIntentApproval.guardrails.autoMarkReview === false &&
        searchIntentApproval.guardrails.autoPublish === false &&
        searchIntentApproval.summary.currentWaveItems === waveApprovalPacket.summary.items &&
        searchIntentApproval.summary.currentWaveReady === waveApprovalPacket.summary.readyForHumanReview &&
        searchIntentApproval.summary.nextGapItems >= 6 &&
        searchIntentApproval.summary.nextGapLanes >= 3,
      detail: `currentWave=${searchIntentApproval.summary.currentWaveItems}, nextGap=${searchIntentApproval.summary.nextGapItems}, nextGapLanes=${searchIntentApproval.summary.nextGapLanes}`,
    },
    {
      name: "search intent approval packet has no unsafe items and includes review context",
      ok:
        searchIntentApproval.summary.unsafeItems === 0 &&
        Boolean(searchIntentApproval.currentWaveItems?.every((item) => item.readyForHumanReview === true)) &&
        Boolean(
          searchIntentApproval.nextGapItems?.every(
            (item) => item.readyForHumanReview === true && (item.sourceTargets?.length || 0) >= 2 && (item.riskChecks?.length || 0) >= 4,
          ),
        ),
      detail: `unsafe=${searchIntentApproval.summary.unsafeItems}, currentReady=${searchIntentApproval.summary.currentWaveReady}, nextGap=${searchIntentApproval.summary.nextGapItems}`,
    },
    {
      name: "search intent wave planner is read-only and continuous",
      ok:
        searchIntentWaves.guardrails.autoEditArticles === false &&
        searchIntentWaves.guardrails.autoMarkReview === false &&
        searchIntentWaves.guardrails.autoPublish === false &&
        searchIntentWaves.summary.plannedWaves >= 4 &&
        searchIntentWaves.summary.plannedItems >= 12 &&
        searchIntentWaves.summary.uniqueFiles === searchIntentWaves.summary.plannedItems &&
        searchIntentWaves.summary.uniqueLanes >= 4,
      detail: `waves=${searchIntentWaves.summary.plannedWaves}, items=${searchIntentWaves.summary.plannedItems}, files=${searchIntentWaves.summary.uniqueFiles}, lanes=${searchIntentWaves.summary.uniqueLanes}`,
    },
    {
      name: "search intent wave planner keeps all items safe for manual review",
      ok:
        searchIntentWaves.summary.unsafeItems === 0 &&
        searchIntentWaves.summary.readyItems === searchIntentWaves.summary.plannedItems &&
        Boolean(
          searchIntentWaves.waves?.every((wave) =>
            wave.items?.every(
              (item) => item.readyForHumanReview === true && item.safeDraft === true && (item.sourceTargets?.length || 0) >= 2 && (item.riskChecks?.length || 0) >= 4,
            ),
          ),
        ),
      detail: `unsafe=${searchIntentWaves.summary.unsafeItems}, ready=${searchIntentWaves.summary.readyItems}, planned=${searchIntentWaves.summary.plannedItems}`,
    },
    {
      name: "search query coverage is read-only and matches planned waves",
      ok:
        searchQueryCoverage.guardrails.autoEditArticles === false &&
        searchQueryCoverage.guardrails.autoMarkReview === false &&
        searchQueryCoverage.guardrails.autoPublish === false &&
        searchQueryCoverage.summary.items === searchIntentWaves.summary.plannedItems &&
        searchQueryCoverage.summary.plannerItems === searchIntentWaves.summary.plannedItems &&
        searchQueryCoverage.summary.plannerWaves === searchIntentWaves.summary.plannedWaves &&
        searchQueryCoverage.summary.uniqueFiles === searchQueryCoverage.summary.items &&
        searchQueryCoverage.summary.uniqueLanes >= searchIntentWaves.summary.uniqueLanes,
      detail: `items=${searchQueryCoverage.summary.items}, waves=${searchQueryCoverage.summary.plannerWaves}, files=${searchQueryCoverage.summary.uniqueFiles}, lanes=${searchQueryCoverage.summary.uniqueLanes}`,
    },
    {
      name: "search query coverage has broad user-search variants",
      ok:
        searchQueryCoverage.summary.unsafeItems === 0 &&
        searchQueryCoverage.summary.readyItems === searchQueryCoverage.summary.items &&
        searchQueryCoverage.summary.uniqueQueries >= searchQueryCoverage.summary.items * searchQueryCoverage.summary.minQueriesPerItem &&
        Boolean(
          searchQueryCoverage.items?.every(
            (item) =>
              item.readyForManualReview === true &&
              (item.queryCount || 0) >= searchQueryCoverage.summary.minQueriesPerItem &&
              Object.values(item.queryFamilies || {}).filter((queries) => queries.length > 0).length >= searchQueryCoverage.summary.minFamiliesPerItem,
          ),
        ),
      detail: `uniqueQueries=${searchQueryCoverage.summary.uniqueQueries}, ready=${searchQueryCoverage.summary.readyItems}, unsafe=${searchQueryCoverage.summary.unsafeItems}`,
    },
    {
      name: "search query match audit is read-only and covers query plan",
      ok:
        searchQueryMatch.guardrails.autoEditArticles === false &&
        searchQueryMatch.guardrails.autoMarkReview === false &&
        searchQueryMatch.guardrails.autoPublish === false &&
        searchQueryMatch.summary.items === searchQueryCoverage.summary.items &&
        searchQueryMatch.summary.queryCoverageItems === searchQueryCoverage.summary.items &&
        searchQueryMatch.summary.readyItems === searchQueryMatch.summary.items,
      detail: `items=${searchQueryMatch.summary.items}, ready=${searchQueryMatch.summary.readyItems}, warnings=${searchQueryMatch.summary.warningItems}`,
    },
    {
      name: "search query match audit has no blocking search-alignment issues",
      ok:
        searchQueryMatch.summary.blockingItems === 0 &&
        searchQueryMatch.summary.averageMatchedFamilies >= 3 &&
        Boolean(searchQueryMatch.items?.every((item) => item.readyForManualReview === true && item.titleHit === true && item.descriptionHit === true)),
      detail: `blocking=${searchQueryMatch.summary.blockingItems}, averageFamilies=${searchQueryMatch.summary.averageMatchedFamilies}`,
    },
    {
      name: "broad search demand map is read-only and covers major demand themes",
      ok:
        broadSearchDemand.guardrails.autoEditArticles === false &&
        broadSearchDemand.guardrails.autoMarkReview === false &&
        broadSearchDemand.guardrails.autoPublish === false &&
        broadSearchDemand.summary.themes >= 10 &&
        broadSearchDemand.summary.themesWithReadyDrafts === broadSearchDemand.summary.themes &&
        broadSearchDemand.summary.uniqueCandidateFiles >= 40,
      detail: `themes=${broadSearchDemand.summary.themes}, readyThemes=${broadSearchDemand.summary.themesWithReadyDrafts}, uniqueCandidates=${broadSearchDemand.summary.uniqueCandidateFiles}`,
    },
    {
      name: "broad search demand map links demand, sources, and planned review waves",
      ok:
        (broadSearchDemand.sourceEvidence?.officialSources?.length || 0) >= 10 &&
        broadSearchDemand.summary.reviewPackThemeMatches >= 3 &&
        broadSearchDemand.summary.plannedWaveThemeMatches >= searchIntentWaves.summary.plannedItems &&
        broadSearchDemand.summary.totalReadyDraftMatches >= 100 &&
        Boolean(
          broadSearchDemand.themes?.every(
            (theme) =>
              (theme.searchSeeds?.length || 0) >= 4 &&
              (theme.sourceTargets?.length || 0) >= 2 &&
              (theme.reviewFocus?.length || 0) >= 3 &&
              (theme.subtopics?.length || 0) >= 6 &&
              (theme.candidateDrafts?.length || 0) > 0,
          ),
        ),
      detail: `officialSources=${broadSearchDemand.sourceEvidence?.officialSources?.length || 0}, reviewPackMatches=${broadSearchDemand.summary.reviewPackThemeMatches}, waveMatches=${broadSearchDemand.summary.plannedWaveThemeMatches}, readyMatches=${broadSearchDemand.summary.totalReadyDraftMatches}`,
    },
    {
      name: "public coverage gap plan is read-only and covers every no-public broad theme",
      ok:
        publicCoverageGapPlan.guardrails.autoEditArticles === false &&
        publicCoverageGapPlan.guardrails.autoMarkReview === false &&
        publicCoverageGapPlan.guardrails.autoPublish === false &&
        publicCoverageGapPlan.summary.gapThemes === broadSearchDemand.summary.themesWithoutPublicCoverage &&
        publicCoverageGapPlan.summary.sourceThemesWithoutPublicCoverage === broadSearchDemand.summary.themesWithoutPublicCoverage &&
        publicCoverageGapPlan.summary.items === publicCoverageGapPlan.summary.gapThemes &&
        publicCoverageGapPlan.summary.uniqueFiles === publicCoverageGapPlan.summary.items &&
        publicCoverageGapPlan.summary.duplicateFiles === 0,
      detail: `gapThemes=${publicCoverageGapPlan.summary.gapThemes}, items=${publicCoverageGapPlan.summary.items}, uniqueFiles=${publicCoverageGapPlan.summary.uniqueFiles}, duplicateFiles=${publicCoverageGapPlan.summary.duplicateFiles}`,
    },
    {
      name: "public coverage gap plan keeps candidates safe for manual review",
      ok:
        publicCoverageGapPlan.summary.unsafeItems === 0 &&
        publicCoverageGapPlan.summary.readyItems === publicCoverageGapPlan.summary.items &&
        publicCoverageGapPlan.summary.plannedWaves >= 4 &&
        Boolean(
          publicCoverageGapPlan.items?.every(
            (item) =>
              item.readyForManualReview === true &&
              item.safeDraft === true &&
              item.noindex === true &&
              (item.searchSeeds?.length || 0) >= 4 &&
              (item.sourceTargets?.length || 0) >= 2,
          ),
        ) &&
        Boolean(publicCoverageGapPlan.waves?.every((wave) => (wave.readyItems || 0) === (wave.items?.length || 0))),
      detail: `ready=${publicCoverageGapPlan.summary.readyItems}, unsafe=${publicCoverageGapPlan.summary.unsafeItems}, waves=${publicCoverageGapPlan.summary.plannedWaves}`,
    },
    {
      name: "public coverage gap preflight is read-only and covers gap plan items",
      ok:
        publicCoverageGapPreflight.guardrails.autoEditArticles === false &&
        publicCoverageGapPreflight.guardrails.autoMarkReview === false &&
        publicCoverageGapPreflight.guardrails.autoPublish === false &&
        publicCoverageGapPreflight.summary.items === publicCoverageGapPlan.summary.items &&
        publicCoverageGapPreflight.summary.planItems === publicCoverageGapPlan.summary.items &&
        publicCoverageGapPreflight.summary.uniqueFiles === publicCoverageGapPreflight.summary.items,
      detail: `items=${publicCoverageGapPreflight.summary.items}, planItems=${publicCoverageGapPreflight.summary.planItems}, uniqueFiles=${publicCoverageGapPreflight.summary.uniqueFiles}`,
    },
    {
      name: "public coverage gap preflight has no blocking publish-readiness issues",
      ok:
        publicCoverageGapPreflight.summary.blockingItems === 0 &&
        publicCoverageGapPreflight.summary.readyItems === publicCoverageGapPreflight.summary.items &&
        publicCoverageGapPreflight.summary.planUnsafeItems === 0 &&
        publicCoverageGapPreflight.summary.structuredDataReadyItems === publicCoverageGapPreflight.summary.items &&
        publicCoverageGapPreflight.summary.withPublicLinkSuggestions === publicCoverageGapPreflight.summary.items &&
        publicCoverageGapPreflight.summary.withSeedMatches >= publicCoverageGapPreflight.summary.items - 1 &&
        Boolean(
          publicCoverageGapPreflight.items?.every(
            (item) =>
              item.readyForManualReview === true &&
              item.safeDraft === true &&
              item.structuredDataReady === true &&
              (item.blockingIssues?.length || 0) === 0 &&
              (item.publicLinkSuggestions?.length || 0) > 0,
          ),
        ) &&
        Boolean(publicCoverageGapPreflight.waveSummaries?.every((wave) => (wave.blockingItems || 0) === 0 && (wave.readyItems || 0) === (wave.files?.length || 0))),
      detail: `blocking=${publicCoverageGapPreflight.summary.blockingItems}, ready=${publicCoverageGapPreflight.summary.readyItems}, structured=${publicCoverageGapPreflight.summary.structuredDataReadyItems}, seedMatches=${publicCoverageGapPreflight.summary.withSeedMatches}, warnings=${publicCoverageGapPreflight.summary.warningItems}`,
    },
    {
      name: "public coverage gap decision pack is read-only and covers preflight items",
      ok:
        publicCoverageGapDecisionPack.guardrails.autoEditArticles === false &&
        publicCoverageGapDecisionPack.guardrails.autoMarkReview === false &&
        publicCoverageGapDecisionPack.guardrails.autoPublish === false &&
        publicCoverageGapDecisionPack.summary.items === publicCoverageGapPreflight.summary.items &&
        publicCoverageGapDecisionPack.summary.readyItems === publicCoverageGapPreflight.summary.readyItems &&
        publicCoverageGapDecisionPack.summary.waves === publicCoverageGapPlan.summary.plannedWaves,
      detail: `items=${publicCoverageGapDecisionPack.summary.items}, ready=${publicCoverageGapDecisionPack.summary.readyItems}, waves=${publicCoverageGapDecisionPack.summary.waves}`,
    },
    {
      name: "public coverage gap decision pack has human review actions and command boundaries",
      ok:
        publicCoverageGapDecisionPack.summary.blockingItems === 0 &&
        publicCoverageGapDecisionPack.summary.unsafeItems === 0 &&
        publicCoverageGapDecisionPack.summary.itemsWithSourceTargets === publicCoverageGapDecisionPack.summary.items &&
        publicCoverageGapDecisionPack.summary.itemsWithHumanChecklist === publicCoverageGapDecisionPack.summary.items &&
        publicCoverageGapDecisionPack.summary.itemsWithPublicLinkSuggestion === publicCoverageGapDecisionPack.summary.items &&
        publicCoverageGapDecisionPack.summary.itemsWithWarningRemediation === publicCoverageGapDecisionPack.summary.items &&
        publicCoverageGapDecisionPack.summary.itemsWithCommandBoundary === publicCoverageGapDecisionPack.summary.items &&
        Boolean(
          publicCoverageGapDecisionPack.items?.every(
            (item) =>
              item.readyForManualReview === true &&
              (item.blockingIssues?.length || 0) === 0 &&
              (item.reviewPacket?.sourceTargets?.length || 0) >= 2 &&
              (item.humanDecisionChecklist?.length || 0) >= 5 &&
              Boolean(item.publicLinkSuggestion) &&
              (item.suggestedOptimizations?.length || 0) > 0 &&
              item.stopBefore?.includes("explicit human approval") &&
              item.commandsAfterExplicitApproval?.markReview?.includes("--confirm-human") &&
              !item.commandsAfterExplicitApproval?.publishDryRun?.includes("--confirm"),
          ),
        ) &&
        Boolean(publicCoverageGapDecisionPack.waveSummaries?.every((wave) => (wave.blockingItems || 0) === 0 && (wave.readyItems || 0) === (wave.files?.length || 0))),
      detail: `blocking=${publicCoverageGapDecisionPack.summary.blockingItems}, unsafe=${publicCoverageGapDecisionPack.summary.unsafeItems}, commandBoundary=${publicCoverageGapDecisionPack.summary.itemsWithCommandBoundary}, optimizations=${publicCoverageGapDecisionPack.summary.itemsWithWarningRemediation}`,
    },
    {
      name: "content cannibalization check generated warning report",
      ok: cannibalization.guardrails.autoPublish === false && cannibalization.summary.articleCount > 0,
      detail: `conflicts=${cannibalization.summary.conflicts}, reviewBatchConflicts=${cannibalization.summary.reviewBatchConflicts}`,
    },
    {
      name: "review cannibalization brief is read-only and covers unique action-board files",
      ok:
        reviewCannibalizationBrief.guardrails.autoEditArticles === false &&
        reviewCannibalizationBrief.guardrails.autoMarkReview === false &&
        reviewCannibalizationBrief.guardrails.autoPublish === false &&
        reviewCannibalizationBrief.summary.items === reviewCannibalizationBrief.summary.candidateFiles &&
        reviewCannibalizationBrief.summary.candidateFiles === reviewCannibalizationBrief.sourceEvidence.uniqueActionFiles &&
        reviewCannibalizationBrief.summary.unsafeCommands === 0,
      detail: `items=${reviewCannibalizationBrief.summary.items}, uniqueActionFiles=${reviewCannibalizationBrief.sourceEvidence.uniqueActionFiles}, unsafeCommands=${reviewCannibalizationBrief.summary.unsafeCommands}`,
    },
    {
      name: "review cannibalization brief keeps publish candidates differentiated",
      ok:
        reviewCannibalizationBrief.summary.highRiskItems === 0 &&
        (reviewCannibalizationBrief.highRiskItems?.length || 0) === 0 &&
        Boolean(
          reviewCannibalizationBrief.items?.every(
            (item) =>
              Boolean(item.candidate?.file) &&
              Boolean(item.recommendation) &&
              (item.humanReviewChecklist?.length || 0) >= 5 &&
              (item.publishedSimilar?.length || 0) <= 5 &&
              (item.reviewSimilar?.length || 0) <= 5 &&
              item.riskLevel !== "high",
          ),
        ),
      detail: `highRisk=${reviewCannibalizationBrief.summary.highRiskItems}, mediumRisk=${reviewCannibalizationBrief.summary.mediumRiskItems}, publishedComparisons=${reviewCannibalizationBrief.summary.itemsWithPublishedComparison}, reviewComparisons=${reviewCannibalizationBrief.summary.itemsWithReviewComparison}`,
    },
    {
      name: "content freshness check covers review items",
      ok: freshness.guardrails.autoPublish === false && freshness.summary.articlesChecked > 0 && freshness.summary.currentReviewItems > 0,
      detail: `highRisk=${freshness.summary.highRisk}, currentReviewItems=${freshness.summary.currentReviewItems}, plannedReviewItems=${freshness.summary.plannedReviewItems}`,
    },
    {
      name: "review freshness brief is read-only and covers unique action-board files",
      ok:
        reviewFreshnessBrief.guardrails.autoEditArticles === false &&
        reviewFreshnessBrief.guardrails.autoMarkReview === false &&
        reviewFreshnessBrief.guardrails.autoPublish === false &&
        reviewFreshnessBrief.summary.items === reviewFreshnessBrief.sourceEvidence.uniqueActionFiles &&
        reviewFreshnessBrief.summary.unsafeCommands === 0,
      detail: `items=${reviewFreshnessBrief.summary.items}, uniqueActionFiles=${reviewFreshnessBrief.sourceEvidence.uniqueActionFiles}, unsafeCommands=${reviewFreshnessBrief.summary.unsafeCommands}`,
    },
    {
      name: "review freshness brief has source-backed human fact-check tasks",
      ok:
        reviewFreshnessBrief.summary.blockedItems === 0 &&
        reviewFreshnessBrief.summary.readyItems === reviewFreshnessBrief.summary.items &&
        reviewFreshnessBrief.summary.itemsWithOfficialSources === reviewFreshnessBrief.summary.items &&
        reviewFreshnessBrief.summary.itemsWithReachableSources === reviewFreshnessBrief.summary.items &&
        Boolean(
          reviewFreshnessBrief.items?.every(
            (item) =>
              item.readyForFreshnessReview === true &&
              (item.reachableSources || 0) > 0 &&
              (item.sourceTargets || 0) > 0 &&
              (item.officialSourceTargets?.length || 0) > 0 &&
              (item.staleSensitiveChecks?.length || 0) >= 3 &&
              (item.humanReviewChecklist?.length || 0) >= 5,
          ),
        ),
      detail: `ready=${reviewFreshnessBrief.summary.readyItems}, blocked=${reviewFreshnessBrief.summary.blockedItems}, highRisk=${reviewFreshnessBrief.summary.highRiskItems}, withSources=${reviewFreshnessBrief.summary.itemsWithOfficialSources}`,
    },
    {
      name: "review coverage report covers planned candidates",
      ok:
        reviewCoverage.guardrails.autoMarkReview === false &&
        reviewCoverage.guardrails.autoPublish === false &&
        reviewCoverage.summary.plannedCandidates === reviewPlan.totals.plannedCandidates &&
        reviewCoverage.items.length === reviewPlan.totals.plannedCandidates &&
        reviewCoverage.summary.missingCoverage === 0,
      detail: `planned=${reviewCoverage.summary.plannedCandidates}, items=${reviewCoverage.items.length}, missingCoverage=${reviewCoverage.summary.missingCoverage}`,
    },
    {
      name: "review coverage includes source, fact-check, approval, and risk tasks",
      ok:
        reviewCoverage.summary.itemsMissingOfficialSources === 0 &&
        reviewCoverage.summary.itemsMissingFactCheckQueries === 0 &&
        reviewCoverage.summary.itemsMissingApprovalChecks === 0 &&
        reviewCoverage.summary.itemsMissingRiskChecks === 0,
      detail: JSON.stringify({
        approval: reviewCoverage.summary.itemsMissingApprovalChecks,
        factCheck: reviewCoverage.summary.itemsMissingFactCheckQueries,
        risk: reviewCoverage.summary.itemsMissingRiskChecks,
        sources: reviewCoverage.summary.itemsMissingOfficialSources,
      }),
    },
    {
      name: "review coverage keeps planned candidates unpublished and non-indexable",
      ok:
        reviewCoverage.summary.nonDraftItems === 0 &&
        reviewCoverage.summary.unsafeIndexingItems === 0 &&
        reviewCoverage.summary.reviewBatchConflictItems === 0,
      detail: JSON.stringify({
        nonDraftItems: reviewCoverage.summary.nonDraftItems,
        reviewBatchConflictItems: reviewCoverage.summary.reviewBatchConflictItems,
        unsafeIndexingItems: reviewCoverage.summary.unsafeIndexingItems,
      }),
    },
    {
      name: "review priority roadmap has enough actionable lanes",
      ok:
        reviewRoadmap.guardrails.autoMarkReview === false &&
        reviewRoadmap.guardrails.autoPublish === false &&
        reviewRoadmap.summary.lanes >= 8 &&
        reviewRoadmap.summary.uniqueNextReviewFiles >= 15,
      detail: `lanes=${reviewRoadmap.summary.lanes}, uniqueNextReviewFiles=${reviewRoadmap.summary.uniqueNextReviewFiles}`,
    },
    {
      name: "review priority roadmap includes review context",
      ok:
        Boolean(reviewRoadmap.lanes?.every((lane) => (lane.candidates?.length || 0) > 0 && (lane.searchQueries?.length || 0) > 0 && (lane.reviewFocus?.length || 0) > 0 && (lane.sourceTargets?.length || 0) > 0)) &&
        Boolean(reviewRoadmap.nextReviewFiles?.length),
      detail: `lanes=${reviewRoadmap.lanes?.length || 0}, nextReviewFiles=${reviewRoadmap.nextReviewFiles?.length || 0}`,
    },
    {
      name: "review priority roadmap candidates stay safe",
      ok: reviewRoadmap.summary.unsafeCandidates === 0,
      detail: `unsafeCandidates=${reviewRoadmap.summary.unsafeCandidates}`,
    },
    {
      name: "next review source pack covers roadmap files",
      ok:
        nextReviewSourcePack.guardrails.autoMarkReview === false &&
        nextReviewSourcePack.guardrails.autoPublish === false &&
        nextReviewSourcePack.summary.items === reviewRoadmap.summary.uniqueNextReviewFiles &&
        nextReviewSourcePack.summary.roadmapNextReviewFiles === reviewRoadmap.summary.uniqueNextReviewFiles &&
        nextReviewSourcePack.items.length === reviewRoadmap.summary.uniqueNextReviewFiles,
      detail: `items=${nextReviewSourcePack.summary.items}, roadmap=${reviewRoadmap.summary.uniqueNextReviewFiles}`,
    },
    {
      name: "next review source pack includes source, fact-check, approval, and risk tasks",
      ok:
        nextReviewSourcePack.summary.missingOfficialSources === 0 &&
        nextReviewSourcePack.summary.missingFactCheckQueries === 0 &&
        nextReviewSourcePack.summary.missingApprovalChecks === 0 &&
        nextReviewSourcePack.summary.missingRiskChecks === 0,
      detail: JSON.stringify({
        approval: nextReviewSourcePack.summary.missingApprovalChecks,
        factCheck: nextReviewSourcePack.summary.missingFactCheckQueries,
        risk: nextReviewSourcePack.summary.missingRiskChecks,
        sources: nextReviewSourcePack.summary.missingOfficialSources,
      }),
    },
    {
      name: "next review source pack keeps candidates draft and non-indexable",
      ok:
        nextReviewSourcePack.summary.unsafeItems === 0 &&
        nextReviewSourcePack.summary.safeDraftItems === nextReviewSourcePack.summary.items,
      detail: `unsafeItems=${nextReviewSourcePack.summary.unsafeItems}, safeDraftItems=${nextReviewSourcePack.summary.safeDraftItems}`,
    },
    {
      name: "public expansion queue is manual and covers roadmap files",
      ok:
        publicExpansion.guardrails.autoMarkReview === false &&
        publicExpansion.guardrails.autoPublish === false &&
        publicExpansion.summary.items >= reviewRoadmap.summary.uniqueNextReviewFiles &&
        publicExpansion.summary.roadmapNextReviewFiles === reviewRoadmap.summary.uniqueNextReviewFiles &&
        publicExpansion.summary.approvalWaves >= 4,
      detail: `items=${publicExpansion.summary.items}, waves=${publicExpansion.summary.approvalWaves}, roadmap=${reviewRoadmap.summary.uniqueNextReviewFiles}`,
    },
    {
      name: "public expansion queue only contains source-pack-ready safe drafts",
      ok:
        publicExpansion.summary.unsafeItems === 0 &&
        publicExpansion.summary.duplicateFiles === 0 &&
        publicExpansion.summary.sourcePackReadyItems === publicExpansion.summary.items,
      detail: `unsafeItems=${publicExpansion.summary.unsafeItems}, duplicateFiles=${publicExpansion.summary.duplicateFiles}, sourcePackReadyItems=${publicExpansion.summary.sourcePackReadyItems}`,
    },
    {
      name: "public expansion queue stops before publishing",
      ok: publicExpansion.publishingBoundary.publishableNow === 0,
      detail: `publishableNow=${publicExpansion.publishingBoundary.publishableNow}`,
    },
    {
      name: "wave approval packet is manual and ready",
      ok:
        waveApprovalPacket.guardrails.autoMarkReview === false &&
        waveApprovalPacket.guardrails.autoPublish === false &&
        waveApprovalPacket.summary.wave === 1 &&
        waveApprovalPacket.summary.items === 3 &&
        waveApprovalPacket.summary.readyForHumanReview === waveApprovalPacket.summary.items,
      detail: `wave=${waveApprovalPacket.summary.wave}, items=${waveApprovalPacket.summary.items}, ready=${waveApprovalPacket.summary.readyForHumanReview}`,
    },
    {
      name: "wave approval packet has no unsafe items",
      ok: waveApprovalPacket.summary.unsafeItems === 0,
      detail: `unsafeItems=${waveApprovalPacket.summary.unsafeItems}`,
    },
    {
      name: "wave publish simulation is read-only and human-gated",
      ok:
        wavePublishSimulation.guardrails.autoMarkReview === false &&
        wavePublishSimulation.guardrails.autoPublish === false &&
        wavePublishSimulation.guardrails.stopBeforeHumanApproval === true,
      detail: JSON.stringify(wavePublishSimulation.guardrails),
    },
    {
      name: "wave publish simulation projects only approved Wave 1 items",
      ok:
        wavePublishSimulation.summary.wave === waveApprovalPacket.summary.wave &&
        wavePublishSimulation.summary.items === waveApprovalPacket.summary.items &&
        wavePublishSimulation.summary.readyForHumanApproval === waveApprovalPacket.summary.readyForHumanReview &&
        wavePublishSimulation.summary.unsafeItems === 0 &&
        wavePublishSimulation.summary.currentlyPublishable === 0 &&
        wavePublishSimulation.summary.projectedPublishableAfterHumanApproval === waveApprovalPacket.summary.items,
      detail: `wave=${wavePublishSimulation.summary.wave}, items=${wavePublishSimulation.summary.items}, ready=${wavePublishSimulation.summary.readyForHumanApproval}, projected=${wavePublishSimulation.summary.projectedPublishableAfterHumanApproval}`,
    },
    {
      name: "wave publish simulation public total matches project status",
      ok:
        wavePublishSimulation.summary.projectedPublicPublishedAfterWave ===
        projectStatus.articles.publicPublished + wavePublishSimulation.summary.projectedPublishableAfterHumanApproval,
      detail: `current=${projectStatus.articles.publicPublished}, projectedAfterApproval=${wavePublishSimulation.summary.projectedPublishableAfterHumanApproval}, projectedPublic=${wavePublishSimulation.summary.projectedPublicPublishedAfterWave}`,
    },
    {
      name: "live search surface check passed",
      ok: liveSearch.ok === true && liveSearch.failedChecks.length === 0,
      detail: `publicArticles=${liveSearch.articles.publicCount}, failed=${liveSearch.failedChecks.length}`,
    },
    {
      name: "manual review workbench is ready and stops before publishing",
      ok:
        workbench.guardrails.autoMarkReview === false &&
        workbench.guardrails.autoPublish === false &&
        workbench.publishingBoundary.publishableNow === 0 &&
        Boolean(workbench.reviewPlan.nextBatch) &&
        workbench.publishReadiness.currentItemsCovered > 0,
      detail: `currentItemsCovered=${workbench.publishReadiness.currentItemsCovered}, publishableNow=${workbench.publishingBoundary.publishableNow}`,
    },
  ];

  const failed = checks.filter((check) => !check.ok);
  const payload = {
    generatedAt: new Date().toISOString(),
    ok: failed.length === 0,
    summary: {
      checks: checks.length,
      failed: failed.length,
      passed: checks.length - failed.length,
    },
    failed,
    checks,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "automation-gate.json");
  const mdTarget = path.join(process.cwd(), "docs", "automation-gate.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: payload.ok, failed: failed.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
  if (failed.length) process.exitCode = 1;
}

function readJson<T>(relativePath: string): T {
  const absolutePath = path.join(process.cwd(), relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function sameList(a: string[], b: string[]) {
  return a.length === b.length && a.every((item, index) => item === b[index]);
}

function toMarkdown(payload: { generatedAt: string; ok: boolean; summary: { checks: number; failed: number; passed: number }; checks: GateCheck[] }) {
  const lines = [
    "# Automation Gate",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    `Overall: ${payload.ok ? "PASS" : "FAIL"}`,
    "",
    "## Summary",
    "",
    `- Checks: ${payload.summary.checks}`,
    `- Passed: ${payload.summary.passed}`,
    `- Failed: ${payload.summary.failed}`,
    "",
    "## Checks",
    "",
    "| Check | Status | Detail |",
    "| --- | --- | --- |",
    ...payload.checks.map((check) => `| ${check.name} | ${check.ok ? "PASS" : "FAIL"} | ${check.detail || ""} |`),
    "",
  ];

  return lines.join("\n");
}

void main();

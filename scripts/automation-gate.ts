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
  const reviewPreflight = readJson<{
    items?: Array<{ contentIntegrityWarnings?: string[]; file: string }>;
    ok: boolean;
    summary: { failed: number; mojibakeWarningItems: number; warningItems: number };
  }>("content/automation/review-preflight.json");
  const sanitize = readJson<{ changedFiles: number; totalReplacements: number }>("content/automation/draft-guardrail-sanitize.json");
  const workflowAudit = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    summary: {
      automationWorkflowPresent: boolean;
      checks: number;
      contentCheckWorkflowPresent: boolean;
      failed: number;
      forbiddenWorkflowCommands: number;
      manualDispatchEnabled: boolean;
      passed: number;
      pushMainEnabled: boolean;
      reportArtifactEnabled: boolean;
      scheduledReportCommitGated: boolean;
      scheduleCount: number;
      trafficDataAvailable: boolean;
    };
  }>("content/automation/project-automation-workflow-audit.json");
  const executiveBrief = readJson<{
    boardActions?: Array<{ publishConfirm?: string; summary?: Record<string, unknown> }>;
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    summary: {
      automationRunsPerDay: number;
      boardActionItems: number;
      currentPublishableNow: number;
      forbiddenWorkflowCommands: number;
      immediateApprovalItems: number;
      immediateApprovalReadyItems: number;
      publicArticles: number;
      publishConfirmCommandsIncluded: number;
      routeWarningItems: number;
      trafficDataAvailable: boolean;
      unsafeItems: number;
    };
    topApprovalActions?: Array<{ humanGate?: string; priority?: number }>;
    unsafeReasons?: unknown[];
  }>("content/automation/autopilot-executive-brief.json");
  const mojibakeRemediation = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      manualActions?: unknown[];
      preserveStatus?: boolean;
      publishConfirm?: string;
    }>;
    manualRemediationRules?: unknown[];
    summary: {
      affectedFiles: number;
      affectedPublicFiles: number;
      filesScanned: number;
      publishConfirmCommandsIncluded: number;
      scannedMetadataFields: number;
      trafficDataAvailable: boolean;
      unsafeItems: number;
    };
  }>("content/automation/mojibake-remediation-brief.json");
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
      deploymentPublicArticles: number;
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
  const deploymentSprintBoard = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      actionCount?: number;
      deploymentChecks?: unknown[];
      deploymentLane?: string;
      humanReviewActions?: unknown[];
      publishConfirm?: string;
      readyForDeploymentSprint?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      unsafeReasons?: unknown[];
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
    unsafeItems?: unknown[];
    waves?: Array<{ actionItems?: number; items?: number; readyItems?: number; unsafeItems?: number }>;
  }>("content/automation/ai-deployment-sprint-board.json");
  const memoryRagSprintBoard = readJson<{
    candidates?: Array<{
      publishConfirm?: string;
      readyForMemorySprint?: boolean;
      reviewActions?: unknown[];
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      unsafeReasons?: unknown[];
    }>;
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    lanes?: Array<{
      candidateFiles?: unknown[];
      decisionChecks?: unknown[];
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      unsafeReasons?: unknown[];
    }>;
    summary: {
      candidateItems: number;
      decisionChecks: number;
      deploymentPublicArticles: number;
      howToLanes: number;
      itemsPerWave: number;
      lanes: number;
      lanesWithCandidateFiles: number;
      privacyLanes: number;
      publishConfirmCommandsIncluded: number;
      readyCandidates: number;
      readyLanes: number;
      searchQueries: number;
      sourceTargets: number;
      trafficDataAvailable: boolean;
      unsafeItems: number;
      vectorLanes: number;
      waves: number;
    };
    unsafeItems?: unknown[];
    waves?: Array<{ items?: number; readyItems?: number; unsafeItems?: number }>;
  }>("content/automation/memory-rag-sprint-board.json");
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
  const industryPromptOpportunityBoard = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      existingReviewCandidates?: unknown[];
      humanBoundary?: string;
      outputBlocks?: unknown[];
      promptModules?: unknown[];
      riskControls?: unknown[];
      sourceTargets?: unknown[];
      supportingQueries?: unknown[];
      unsafeReasons?: unknown[];
      userInputFields?: unknown[];
    }>;
    sourceEvidence?: {
      marketSignalSources?: unknown[];
      officialPromptSources?: unknown[];
    };
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
  }>("content/automation/industry-prompt-opportunity-board.json");
  const industryPromptModulePack = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      manualReviewActions?: unknown[];
      promptBlueprints?: Array<{
        copyPrompt?: string;
        inputFields?: unknown[];
        outputBlocks?: unknown[];
        qualityChecklist?: unknown[];
        riskControls?: unknown[];
      }>;
      readyForHumanReviewPrep?: boolean;
      reviewCandidateFiles?: unknown[];
      safeReviewPackBridge?: boolean;
      sourceTargets?: unknown[];
      supportingQueries?: unknown[];
      unsafeReasons?: unknown[];
    }>;
    sourceEvidence?: { marketSignalSources?: unknown[]; officialPromptSources?: unknown[] };
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
      sourceOpportunityModules: number;
      sourceOpportunityUnsafeItems: number;
      sourceReviewPackUnsafeItems: number;
      unsafeItems: number;
      zeroPublicCoverageItems: number;
    };
  }>("content/automation/industry-prompt-module-pack.json");
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
  const searchDemandIntake = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    lanes?: Array<{
      contentFormats?: unknown[];
      manualReviewFocus?: unknown[];
      officialSourceTargets?: unknown[];
      readyCandidates?: unknown[];
      searchQueries?: unknown[];
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
    unsafeLanes?: unknown[];
  }>("content/automation/search-demand-intake.json");
  const searchDemandReviewPack = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      factCheckQueries?: unknown[];
      humanReviewChecklist?: unknown[];
      manualReviewFocus?: unknown[];
      officialSourceTargets?: unknown[];
      publicInternalLinkSuggestion?: unknown;
      readyForHumanReview?: boolean;
      safeDraft?: boolean;
      searchQueries?: unknown[];
      stopBefore?: string;
    }>;
    laneSummaries?: Array<{ items?: number; lane?: string; unsafeItems?: number }>;
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
    unsafeItems?: unknown[];
  }>("content/automation/search-demand-review-pack.json");
  const searchDemandPublicationBridge = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      blockingIssues?: unknown[];
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      humanApprovalReady?: boolean;
      indexingSafe?: boolean;
      reviewPackReady?: boolean;
      schemaReady?: boolean;
      searchSnippetReady?: boolean;
      sourceReady?: boolean;
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
  }>("content/automation/search-demand-publication-bridge.json");
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
  const massAiSearchMatrix = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      articleSignals?: Array<{ humanReviewRequired?: boolean; noindex?: boolean; qualityScore?: number; sourceNotes?: boolean; status?: string }>;
      candidateFiles?: unknown[];
      commandBoundaries?: Array<{ markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string }>;
      humanReviewActions?: unknown[];
      readyForHumanReviewPrep?: boolean;
      searchSeeds?: unknown[];
      sourceTargets?: unknown[];
      trafficClaim?: string;
      unsafeReasons?: unknown[];
    }>;
    summary: {
      commandBoundaries: number;
      deploymentBridgedThemes: number;
      humanGatedItems: number;
      items: number;
      itemsReadyForHumanReviewPrep: number;
      itemsWithCandidateFiles: number;
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
  }>("content/automation/mass-ai-search-action-matrix.json");
  const popularAiPromptPlaybook = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      candidateFiles?: unknown[];
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string; stopBefore?: string };
      deploymentBridgeFiles?: unknown[];
      promptModuleBridgeFiles?: unknown[];
      promptTemplates?: Array<{ copyPrompt?: string; inputFields?: unknown[]; outputBlocks?: unknown[]; qualityChecklist?: unknown[]; riskControls?: unknown[] }>;
      readyForHumanReviewPrep?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      trafficClaim?: string;
      unsafeReasons?: unknown[];
    }>;
    sourceEvidence?: { officialSources?: unknown[] };
    summary: {
      agentDeploymentLanes: number;
      broadWorkPromptLanes: number;
      commandBoundaries: number;
      deploymentBridgeItems: number;
      humanGatedItems: number;
      items: number;
      itemsReadyForHumanReviewPrep: number;
      itemsWithCandidateFiles: number;
      itemsWithOfficialSources: number;
      memoryLanes: number;
      officialSources: number;
      promptModuleBridgeItems: number;
      promptTemplates: number;
      publishConfirmCommandsIncluded: number;
      searchQueries: number;
      sourceTargets: number;
      trafficDataAvailable: boolean;
      uniqueCandidateFiles: number;
      unsafeItems: number;
    };
  }>("content/automation/popular-ai-prompt-playbook.json");
  const popularPromptApprovalBridge = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    lanes?: Array<{
      alreadyInApprovalQueue?: unknown[];
      nextCandidates?: unknown[];
      readyNextCandidates?: number;
      searchQueries?: unknown[];
    }>;
    summary: {
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
    topItems?: Array<{
      articleState?: { humanReviewRequired?: boolean; noindex?: boolean; qualityScore?: number; sourceNotes?: boolean; status?: string };
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string; stopBefore?: string };
      promptTemplates?: number;
      readyForHumanReviewPrep?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      unsafeReasons?: unknown[];
    }>;
  }>("content/automation/popular-prompt-approval-bridge.json");
  const popularPromptSprintBoard = readJson<{
    guardrails: { autoCreateArticles: boolean; autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      actionCount?: number;
      alreadyQueuedFiles?: unknown[];
      nextCandidateFiles?: unknown[];
      promptTemplateSamples?: unknown[];
      publishConfirm?: string;
      readyForPromptSprint?: boolean;
      reviewActions?: unknown[];
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      sprintPriorityScore?: number;
      unsafeReasons?: unknown[];
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
    unsafeItems?: unknown[];
    waves?: Array<{ actionItems?: number; items?: number; readyItems?: number; searchQueries?: unknown[]; unsafeItems?: number }>;
  }>("content/automation/popular-prompt-sprint-board.json");
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
      broadFirstCoverageItems: number;
      broadFirstCoveragePreflightItems: number;
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
      publicPublishedBeforeWave: number;
      readyForHumanApproval: number;
      unsafeItems: number;
      wave: number;
    };
  }>("content/automation/wave-publish-simulation.json");
  const liveSearch = readJson<{ articles: { publicCount: number }; failedChecks: string[]; ok: boolean }>("content/automation/live-search-surface.json");
  const workbench = readJson<{
    guardrails: { autoMarkReview: boolean; autoPublish: boolean };
    publishReadiness: { currentItemsCovered: number };
    publishingBoundary: { publicPublished: number; publishableNow: number };
    reviewPlan: { nextBatch: { batch: number; candidates: unknown[]; topic: string } | null };
    seoWarningRemediation?: {
      summary?: {
        humanGatedItems?: number;
        items?: number;
        publicItems?: number;
        draftItems?: number;
        unsafeItems?: number;
      };
      topItems?: unknown[];
    };
  }>("content/automation/manual-review-workbench.json");
  const projectStatus = readJson<{ articles: { publicPublished: number; publishableNow: unknown[] } }>("content/automation/project-status.json");
  const publicSurfaceInventory = readJson<{
    broadCoverage?: Array<{ publicMatches?: number; readyCandidates?: number; searchQueries?: unknown[]; suggestedFiles?: unknown[] }>;
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    publicItems?: Array<{ file?: string; slug?: string; title?: string }>;
    summary: {
      broadClusters: number;
      broadClustersWithoutPublicCoverage: number;
      liveMissingFromSitemap: number | null;
      livePublicCount: number | null;
      nonPublishedIndexable: number;
      projectPublicPublished: number;
      publicArticles: number;
      publishedButNoindexed: number;
      trafficDataAvailable: boolean;
      unsafeItems: number;
    };
    uncoveredBroadClusters?: unknown[];
    unsafeItems?: unknown[];
  }>("content/automation/public-surface-inventory.json");
  const publicSearchRefreshPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
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
    topItems?: Array<{
      actionCount?: number;
      cannibalizationConflicts?: unknown[];
      commandBoundary?: { editAfterHumanApproval?: string; markReview?: string; publishConfirm?: string; stopBefore?: string };
      freshnessRisk?: unknown;
      readyForHumanRefreshReview?: boolean;
      seoWarning?: unknown;
      trafficClaim?: string;
      unsafeReasons?: unknown[];
    }>;
    unsafeItems?: unknown[];
  }>("content/automation/public-search-refresh-pack.json");
  const publicRefreshSprintBoard = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      actionCount?: number;
      publishConfirm?: string;
      readyForPublicRefreshSprint?: boolean;
      refreshActions?: unknown[];
      refreshReasons?: unknown[];
      unsafeReasons?: unknown[];
    }>;
    summary: {
      actionItems: number;
      cannibalizationItems: number;
      highPriorityItems: number;
      items: number;
      itemsPerWave: number;
      itemsReadyForPublicRefreshSprint: number;
      liveMissingFromSitemap: number | null;
      mojibakePublicItems: number;
      publicArticles: number;
      publishConfirmCommandsIncluded: number;
      publishedButNoindexed: number;
      seoWarningItems: number;
      shortDescriptionItems: number;
      trafficDataAvailable: boolean;
      unsafeItems: number;
      waves: number;
    };
    unsafeItems?: unknown[];
    waves?: Array<{ actionItems?: number; items?: number; readyItems?: number; unsafeItems?: number }>;
  }>("content/automation/public-refresh-sprint-board.json");
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
      mojibakeWarningItems: number;
      publicItems: number;
      publicMojibakeWarningItems: number;
      recommendedItems: number;
      waveItems: number;
      warningItems: number;
    };
    warningItems?: Array<{ file: string; warnings?: string[] }>;
  }>("content/automation/content-integrity-audit.json");
  const internalLinks = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
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
  }>("content/automation/internal-link-opportunity-audit.json");
  const internalLinkSprintBoard = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      linkActions?: unknown[];
      publishConfirm?: string;
      readyForInternalLinkSprint?: boolean;
      scopes?: unknown[];
      suggestedLinks?: unknown[];
      unsafeReasons?: unknown[];
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
    unsafeItems?: unknown[];
    waves?: Array<{ actionItems?: number; items?: number; readyItems?: number; suggestedPublicLinks?: number; unsafeItems?: number }>;
  }>("content/automation/internal-link-sprint-board.json");
  const sourceHealth = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    summary: {
      checkedUrls: number;
      broadFirstCoverageFiles: number;
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
  }>("content/automation/source-target-health-audit.json");
  const sourceTargetRemediationPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; stopBefore?: string; trafficClaim: string };
    items?: Array<{
      affectedFiles?: unknown[];
      humanChecklist?: unknown[];
      kind?: string;
      manualActions?: unknown[];
      manualFixReady?: boolean;
      referenceCount?: number;
      replacementCandidates?: unknown[];
      replacementPlan?: unknown[];
      stopBefore?: string;
      unsafeReasons?: unknown[];
    }>;
    sourceEvidence?: {
      sourceHealthSummary?: {
        checkedUrls: number;
        failedUrls: number;
        redirectedUrls: number;
      };
    };
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
    unsafeItems?: unknown[];
  }>("content/automation/source-target-remediation-pack.json");
  const sourceReplacementDecisionPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      alternatives?: unknown[];
      decisionOptions?: unknown[];
      file?: string;
      kind?: string;
      manualChecklist?: unknown[];
      recommendedCandidate?: { sourceType?: string; url?: string } | null;
      stopBefore?: string;
      unsafeReasons?: unknown[];
    }>;
    sourceEvidence?: {
      remediationSummary?: {
        failedUrlItems: number;
        items: number;
        redirectedUrlItems: number;
        unsafeItems: number;
      };
    };
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
    unsafeItems?: unknown[];
  }>("content/automation/source-replacement-decision-pack.json");
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
      blockedItems: number;
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
  const autopilotApprovalRemediation = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      humanChecklist?: unknown[];
      internalLinkFixes?: unknown[];
      manualFixReady?: boolean;
      remediationReasons?: unknown[];
      searchFixes?: unknown[];
      sourceChecks?: unknown[];
      sourceUrlFixes?: unknown[];
      unsafeReasons?: unknown[];
    }>;
    sourceEvidence: {
      approvalItemsWithSourceUrlRemediation: number;
      approvalPacketUnsafeItems: number;
      humanReviewPlaybookUnsafeItems: number;
      internalLinkUnsafeItems: number;
      optimizationUnsafeCommands: number;
      searchIntentUnsafeItems: number;
      sourceVerificationUnsafeItems: number;
      sourceTargetRemediationItems: number;
      sourceTargetRemediationManualFixReadyItems: number;
      sourceTargetRemediationUnsafeItems: number;
    };
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
  }>("content/automation/autopilot-approval-remediation-pack.json");
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
  const autopilotQueuedPlaybookBrief = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean };
    items?: Array<{
      actionItems?: unknown[];
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      factCheckQueries?: unknown[];
      internalLinkSuggestions?: unknown[];
      manualOnlyCommands?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      readyForHumanReview?: boolean;
      riskReviewChecklist?: unknown[];
      safeDraft?: boolean;
      searchActions?: unknown[];
      searchQueries?: unknown[];
      sourceActions?: unknown[];
      sourceEvidence?: unknown[];
      sourceTargets?: unknown[];
    }>;
    sourceEvidence: {
      queuedForPlaybook: number;
      sprintBoardUnsafeItems: number;
    };
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
    unsafeItems?: unknown[];
  }>("content/automation/autopilot-queued-playbook-brief.json");
  const autopilotQueuedRemediation = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      humanChecklist?: unknown[];
      internalLinkFixes?: unknown[];
      manualFixReady?: boolean;
      remediationReasons?: unknown[];
      riskChecks?: unknown[];
      searchFixes?: unknown[];
      sourceChecks?: unknown[];
      sourceEvidence?: unknown[];
      unsafeReasons?: unknown[];
    }>;
    sourceEvidence: {
      queuedPlaybookUnsafeItems: number;
      queuedForPlaybook: number;
      sprintBoardUnsafeItems: number;
    };
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
    unsafeItems?: unknown[];
  }>("content/automation/autopilot-queued-remediation-pack.json");
  const autopilotBroadAiDemandBrief = readJson<{
    clusters?: Array<{
      contentAngles?: unknown[];
      readyCandidates?: unknown[];
      reviewFocus?: unknown[];
      searchQueries?: unknown[];
      sourceSignals?: unknown[];
    }>;
    guardrails: {
      autoCreateArticles: boolean;
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
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
    unsafeClusters?: unknown[];
  }>("content/automation/autopilot-broad-ai-demand-brief.json");
  const autopilotBroadFreshnessTriage = readJson<{
    guardrails: {
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      humanFactCheckChecklist?: unknown[];
      readyForHumanFreshnessReview?: boolean;
      safeDraft?: boolean;
      searchQueries?: unknown[];
      sourceSignals?: unknown[];
      sourceTargets?: unknown[];
    }>;
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
    unsafeItems?: unknown[];
  }>("content/automation/autopilot-broad-freshness-triage.json");
  const autopilotBroadPublishWaves = readJson<{
    guardrails: {
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
    summary: {
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
    waves?: Array<{
      commandBoundary?: {
        markReviewCommandsAfterHumanApproval?: string[];
        publishConfirm?: string;
        publishDryRunAfterReview?: string[];
      };
      humanApprovalRequired?: boolean;
      items?: Array<{ readyForHumanFreshnessReview?: boolean; safeDraft?: boolean }>;
      readyItems?: number;
      unsafeItems?: number;
    }>;
  }>("content/automation/autopilot-broad-publish-waves.json");
  const autopilotBroadWaveOptimization = readJson<{
    guardrails: {
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
    items?: Array<{
      actionChecklist?: unknown[];
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      publicLinkSuggestion?: unknown;
      readyForHumanOptimizationReview?: boolean;
      safeDraft?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      unsafeReasons?: unknown[];
      warningRemediation?: unknown[];
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
    waveSummaries?: Array<{ items?: number; readyItems?: number; unsafeItems?: number }>;
  }>("content/automation/autopilot-broad-wave-optimization.json");
  const autopilotBroadWaveRemediation = readJson<{
    guardrails: {
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      humanChecklist?: unknown[];
      internalLinkFixes?: unknown[];
      manualFixReady?: boolean;
      publicLinkPlan?: unknown[];
      remediationReasons?: unknown[];
      riskChecks?: unknown[];
      searchFixes?: unknown[];
      sourceChecks?: unknown[];
      unsafeReasons?: unknown[];
      warningFixes?: unknown[];
    }>;
    sourceEvidence: {
      broadWaveOptimizationUnsafeItems: number;
      trafficDataAvailable: boolean;
    };
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
    unsafeItems?: unknown[];
    waveSummaries?: Array<{ items?: number; manualFixReadyItems?: number; unsafeItems?: number }>;
  }>("content/automation/autopilot-broad-wave-remediation-pack.json");
  const broadFirstCoverageLaunchPack = readJson<{
    guardrails: {
      autoCreateArticles: boolean;
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      contentAngles?: unknown[];
      humanFactCheckChecklist?: unknown[];
      humanReviewRequired?: boolean;
      noindex?: boolean;
      readyForFirstCoverageReview?: boolean;
      reviewFocus?: unknown[];
      safeDraft?: boolean;
      searchQueries?: unknown[];
      sourceTargets?: unknown[];
      status?: string;
      unsafeReasons?: unknown[];
    }>;
    summary: {
      clustersSelected: number;
      commandBoundaries: number;
      firstCoverageTarget: number;
      humanReviewRequiredItems: number;
      itemsWithContentAngles: number;
      itemsWithFactCheckChecklist: number;
      itemsWithReviewFocus: number;
      itemsWithSearchQueries: number;
      itemsWithSourceTargets: number;
      safeDraftItems: number;
      trafficDataAvailable: boolean;
      uniqueFiles: number;
      unsafeItems: number;
      zeroPublicClusters: number;
    };
  }>("content/automation/broad-first-coverage-launch-pack.json");
  const broadFirstCoverageReadinessMatrix = readJson<{
    guardrails: {
      autoCreateArticles: boolean;
      autoEditArticles: boolean;
      autoMarkReview: boolean;
      autoPublish: boolean;
      trafficClaim: string;
    };
    items?: Array<{
      blockingIssues?: unknown[];
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      launchReady?: boolean;
      readiness?: {
        hasPublicLinkPath?: boolean;
        integrityReady?: boolean;
        preflightReady?: boolean;
        schemaReady?: boolean;
        snippetReady?: boolean;
        sourceReady?: boolean;
      };
      reviewActions?: unknown[];
      warningIssues?: unknown[];
    }>;
    summary: {
      blockingItems: number;
      commandBoundaries: number;
      firstCoverageItems: number;
      integrityReadyItems: number;
      itemsWithPublicLinkPath: number;
      launchPackItems: number;
      preflightReadyItems: number;
      schemaReadyItems: number;
      snippetReadyItems: number;
      sourceReadyItems: number;
      trafficDataAvailable: boolean;
      uniqueFiles: number;
      unsafeItems: number;
      warningItems: number;
      zeroPublicClusters: number;
    };
  }>("content/automation/broad-first-coverage-readiness-matrix.json");
  const humanApprovalQueue = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      articleState?: { humanReviewRequired?: boolean; noindex?: boolean; qualityScore?: number; sourceNotes?: boolean; status?: string };
      blockers?: unknown[];
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      humanChecklist?: unknown[];
      popularPromptLanes?: unknown[];
      readyForHumanApproval?: boolean;
      unsafeReasons?: unknown[];
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
  }>("content/automation/human-approval-execution-queue.json");
  const humanApprovalClearancePack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      articleState?: { humanReviewRequired?: boolean; noindex?: boolean; qualityScore?: number; sourceNotes?: boolean; status?: string };
      blockers?: unknown[];
      clearanceActions?: unknown[];
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      copydeskBrief?: unknown;
      immediate?: boolean;
      popularPromptLanes?: number;
      readyForClearanceReview?: boolean;
      readyForHumanApproval?: boolean;
      seoWarning?: unknown;
      sourceDecisions?: unknown[];
      unsafeReasons?: unknown[];
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
  }>("content/automation/human-approval-clearance-pack.json");
  const nextBatchApprovalRoute = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      actions?: unknown[];
      commandBoundary?: {
        dryRunMarkReview?: string;
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRun?: string;
      };
      clearance?: unknown | null;
      queryCoverage?: unknown | null;
      readyForHumanRouteReview?: boolean;
      routeWarnings?: unknown[];
      sourcePack?: { officialSourceTargets?: unknown[] } | null;
      unsafeReasons?: unknown[];
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
      routeWarnings: number;
      seoWarningItems: number;
      sourcePackMatchedItems: number;
      trafficDataAvailable: boolean;
      unsafeItems: number;
    };
    unsafeItems?: unknown[];
  }>("content/automation/next-batch-approval-route.json");
  const nextBatchRouteRemediationPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      actionCount?: number;
      manualRemediationActions?: unknown[];
      publishConfirm?: string;
      readyForRemediationReview?: boolean;
      remediationKinds?: unknown[];
      routeWarnings?: unknown[];
      unsafeReasons?: unknown[];
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
    unsafeItems?: unknown[];
    warningItems?: unknown[];
  }>("content/automation/next-batch-route-remediation-pack.json");
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
      highRiskPublishedItems?: number;
      highRiskReviewOnlyItems?: number;
      items: number;
      itemsWithPublishedComparison: number;
      itemsWithReviewComparison: number;
      mediumRiskItems: number;
      unsafeCommands: number;
    };
  }>("content/automation/review-cannibalization-brief.json");
  const reviewCollisionDecisionPack = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      blockingIssues?: unknown[];
      closest?: unknown[];
      collisionType?: string;
      commandBoundary?: {
        markReviewAfterHumanApproval?: string;
        publishConfirm?: string;
        publishDryRunAfterReview?: string;
        stopBefore?: string;
      };
      decisionOptions?: unknown[];
      humanDecisionReady?: boolean;
      manualNextActions?: unknown[];
      queueBlockers?: unknown[];
      warningIssues?: unknown[];
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
  }>("content/automation/review-collision-decision-pack.json");
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
  const seoWarningRemediation = readJson<{
    guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; trafficClaim: string };
    items?: Array<{
      commandBoundary?: { markReviewAfterHumanApproval?: string; publishConfirm?: string; publishDryRunAfterReview?: string };
      humanChecklist?: unknown[];
      manualActions?: unknown[];
      manualFixReady?: boolean;
      schemaWarnings?: unknown[];
      snippetWarnings?: unknown[];
      status?: string;
      stopBefore?: string;
      unsafeReasons?: unknown[];
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
    unsafeItems?: unknown[];
  }>("content/automation/seo-warning-remediation-pack.json");
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
  const contentIntegrityWarningFiles = new Set((contentIntegrity.warningItems || []).map((item) => item.file));
  const recommendedWarningFiles = reviewFiles.filter((file) => contentIntegrityWarningFiles.has(file));
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
      name: "review preflight surfaces content integrity warnings",
      ok:
        reviewPreflight.summary.warningItems === recommendedWarningFiles.length &&
        reviewPreflight.summary.mojibakeWarningItems === recommendedWarningFiles.length &&
        Boolean(
          reviewPreflight.items?.every(
            (item) =>
              !contentIntegrityWarningFiles.has(item.file) ||
              item.contentIntegrityWarnings?.includes("possible mojibake or replacement character"),
          ),
        ),
      detail: `preflightWarnings=${reviewPreflight.summary.warningItems}, preflightMojibake=${reviewPreflight.summary.mojibakeWarningItems}, recommendedWarningFiles=${recommendedWarningFiles.join(", ") || "none"}`,
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
      name: "project automation workflow is scheduled and report-visible",
      ok:
        workflowAudit.guardrails.autoMarkReview === false &&
        workflowAudit.guardrails.autoPublish === false &&
        workflowAudit.guardrails.trafficClaim === "not-included" &&
        workflowAudit.summary.failed === 0 &&
        workflowAudit.summary.automationWorkflowPresent === true &&
        workflowAudit.summary.contentCheckWorkflowPresent === true &&
        workflowAudit.summary.pushMainEnabled === true &&
        workflowAudit.summary.manualDispatchEnabled === true &&
        workflowAudit.summary.scheduleCount >= 4 &&
        workflowAudit.summary.reportArtifactEnabled === true &&
        workflowAudit.summary.scheduledReportCommitGated === true,
      detail: `scheduleCount=${workflowAudit.summary.scheduleCount}, artifact=${workflowAudit.summary.reportArtifactEnabled}, reportCommitGated=${workflowAudit.summary.scheduledReportCommitGated}`,
    },
    {
      name: "project automation workflow excludes review and publish commands",
      ok:
        workflowAudit.summary.forbiddenWorkflowCommands === 0 &&
        workflowAudit.summary.trafficDataAvailable === false &&
        workflowAudit.summary.passed === workflowAudit.summary.checks,
      detail: `forbiddenWorkflowCommands=${workflowAudit.summary.forbiddenWorkflowCommands}, checks=${workflowAudit.summary.passed}/${workflowAudit.summary.checks}`,
    },
    {
      name: "autopilot executive brief summarizes immediate execution priorities",
      ok:
        executiveBrief.guardrails.autoEditArticles === false &&
        executiveBrief.guardrails.autoMarkReview === false &&
        executiveBrief.guardrails.autoPublish === false &&
        executiveBrief.guardrails.trafficClaim === "not-included" &&
        executiveBrief.summary.publicArticles === projectStatus.articles.publicPublished &&
        executiveBrief.summary.automationRunsPerDay >= 4 &&
        executiveBrief.summary.immediateApprovalItems >= 3 &&
        executiveBrief.summary.immediateApprovalReadyItems === executiveBrief.summary.immediateApprovalItems &&
        executiveBrief.summary.boardActionItems >= 5 &&
        Boolean(executiveBrief.topApprovalActions?.length && executiveBrief.topApprovalActions.length >= 3),
      detail: `public=${executiveBrief.summary.publicArticles}, immediate=${executiveBrief.summary.immediateApprovalReadyItems}/${executiveBrief.summary.immediateApprovalItems}, boards=${executiveBrief.summary.boardActionItems}`,
    },
    {
      name: "autopilot executive brief stays human-gated and publish-safe",
      ok:
        executiveBrief.summary.unsafeItems === 0 &&
        (executiveBrief.unsafeReasons?.length || 0) === 0 &&
        executiveBrief.summary.publishConfirmCommandsIncluded === 0 &&
        executiveBrief.summary.currentPublishableNow === 0 &&
        executiveBrief.summary.forbiddenWorkflowCommands === 0 &&
        executiveBrief.summary.trafficDataAvailable === false &&
        Boolean(executiveBrief.topApprovalActions?.every((item) => item.humanGate === "explicit human approval required" && typeof item.priority === "number")) &&
        Boolean(executiveBrief.boardActions?.every((item) => item.publishConfirm === "not-included")),
      detail: `unsafe=${executiveBrief.summary.unsafeItems}, publishConfirm=${executiveBrief.summary.publishConfirmCommandsIncluded}, publishableNow=${executiveBrief.summary.currentPublishableNow}, routeWarnings=${executiveBrief.summary.routeWarningItems}`,
    },
    {
      name: "mojibake remediation brief is read-only and article-safe",
      ok:
        mojibakeRemediation.guardrails.autoEditArticles === false &&
        mojibakeRemediation.guardrails.autoMarkReview === false &&
        mojibakeRemediation.guardrails.autoPublish === false &&
        mojibakeRemediation.guardrails.trafficClaim === "not-included" &&
        mojibakeRemediation.summary.filesScanned === articles.length &&
        mojibakeRemediation.summary.scannedMetadataFields >= 8,
      detail: `filesScanned=${mojibakeRemediation.summary.filesScanned}, affected=${mojibakeRemediation.summary.affectedFiles}, metadataFields=${mojibakeRemediation.summary.scannedMetadataFields}`,
    },
    {
      name: "mojibake remediation brief stays human-gated and publish-safe",
      ok:
        mojibakeRemediation.summary.unsafeItems === 0 &&
        mojibakeRemediation.summary.publishConfirmCommandsIncluded === 0 &&
        mojibakeRemediation.summary.trafficDataAvailable === false &&
        Boolean(mojibakeRemediation.manualRemediationRules?.length && mojibakeRemediation.manualRemediationRules.length >= 5) &&
        Boolean(
          (mojibakeRemediation.items || []).every(
            (item) =>
              item.preserveStatus === true &&
              item.publishConfirm === "not-included" &&
              Boolean(item.manualActions?.length && item.manualActions.length >= 5),
          ),
        ),
      detail: `unsafe=${mojibakeRemediation.summary.unsafeItems}, publishConfirm=${mojibakeRemediation.summary.publishConfirmCommandsIncluded}, traffic=${mojibakeRemediation.summary.trafficDataAvailable}`,
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
      name: "content integrity audit mirrors mojibake warnings without blocking",
      ok:
        contentIntegrity.summary.warningItems === mojibakeRemediation.summary.affectedFiles &&
        contentIntegrity.summary.mojibakeWarningItems === mojibakeRemediation.summary.affectedFiles &&
        contentIntegrity.summary.publicMojibakeWarningItems === mojibakeRemediation.summary.affectedPublicFiles &&
        contentIntegrity.summary.blockingItems === 0,
      detail: `warnings=${contentIntegrity.summary.warningItems}, mojibake=${contentIntegrity.summary.mojibakeWarningItems}, publicMojibake=${contentIntegrity.summary.publicMojibakeWarningItems}, remediationAffected=${mojibakeRemediation.summary.affectedFiles}/${mojibakeRemediation.summary.affectedPublicFiles}`,
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
        internalLinks.summary.broadFirstCoverageItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        internalLinks.summary.candidateItems >= publicExpansion.summary.items,
      detail: `public=${internalLinks.summary.publicArticles}, expansion=${internalLinks.summary.expansionItems}, broadFirst=${internalLinks.summary.broadFirstCoverageItems}, candidates=${internalLinks.summary.candidateItems}`,
    },
    {
      name: "internal link opportunity audit has public suggestions for Wave 1",
      ok:
        internalLinks.summary.waveItems === waveApprovalPacket.summary.items &&
        internalLinks.summary.recommendedItems === reviewQueue.recommendedToday.length &&
        internalLinks.summary.broadFirstCoverageItemsMissingPublicLinkSuggestion === 0 &&
        internalLinks.summary.waveItemsMissingPublicLinkSuggestion === 0 &&
        internalLinks.summary.candidateItemsMissingPublicLinkSuggestion === 0,
      detail: `wave=${internalLinks.summary.waveItems}, broadFirstMissing=${internalLinks.summary.broadFirstCoverageItemsMissingPublicLinkSuggestion}, waveMissing=${internalLinks.summary.waveItemsMissingPublicLinkSuggestion}, candidateMissing=${internalLinks.summary.candidateItemsMissingPublicLinkSuggestion}`,
    },
    {
      name: "internal link sprint board covers all linkable candidates",
      ok:
        internalLinkSprintBoard.guardrails.autoEditArticles === false &&
        internalLinkSprintBoard.guardrails.autoMarkReview === false &&
        internalLinkSprintBoard.guardrails.autoPublish === false &&
        internalLinkSprintBoard.guardrails.trafficClaim === "not-included" &&
        internalLinkSprintBoard.summary.items === internalLinks.summary.candidateItems &&
        internalLinkSprintBoard.summary.candidateItems === internalLinks.summary.candidateItems &&
        internalLinkSprintBoard.summary.candidateItemsWithPublicSuggestions === internalLinks.summary.candidateItemsWithPublicSuggestions &&
        internalLinkSprintBoard.summary.candidateItemsMissingPublicLinkSuggestion === internalLinks.summary.candidateItemsMissingPublicLinkSuggestion &&
        internalLinkSprintBoard.summary.publicArticles === internalLinks.summary.publicArticles &&
        internalLinkSprintBoard.summary.waveItems === internalLinks.summary.waveItems &&
        internalLinkSprintBoard.summary.waves >= 5 &&
        internalLinkSprintBoard.summary.trafficDataAvailable === false,
      detail: `items=${internalLinkSprintBoard.summary.items}, waves=${internalLinkSprintBoard.summary.waves}, public=${internalLinkSprintBoard.summary.publicArticles}, suggestions=${internalLinkSprintBoard.summary.suggestedPublicLinks}`,
    },
    {
      name: "internal link sprint board keeps link edits manual and publish-safe",
      ok:
        internalLinkSprintBoard.summary.unsafeItems === 0 &&
        (internalLinkSprintBoard.unsafeItems?.length || 0) === 0 &&
        internalLinkSprintBoard.summary.publishConfirmCommandsIncluded === 0 &&
        internalLinkSprintBoard.summary.readyForInternalLinkSprint === internalLinkSprintBoard.summary.items &&
        internalLinkSprintBoard.summary.suggestedPublicLinks >= internalLinkSprintBoard.summary.items &&
        internalLinkSprintBoard.summary.actionItems >= internalLinkSprintBoard.summary.items * 6 &&
        Boolean(
          internalLinkSprintBoard.items?.every(
            (item) =>
              item.readyForInternalLinkSprint === true &&
              item.publishConfirm === "not-included" &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.linkActions?.length || 0) >= 6 &&
              (item.suggestedLinks?.length || 0) > 0 &&
              (item.scopes?.length || 0) > 0,
          ),
        ) &&
        Boolean(internalLinkSprintBoard.waves?.every((wave) => wave.readyItems === wave.items && (wave.unsafeItems || 0) === 0 && (wave.actionItems || 0) >= (wave.items || 0) * 6)),
      detail: `ready=${internalLinkSprintBoard.summary.readyForInternalLinkSprint}, actions=${internalLinkSprintBoard.summary.actionItems}, unsafe=${internalLinkSprintBoard.summary.unsafeItems}, publishConfirm=${internalLinkSprintBoard.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "source target health audit is read-only and covers review source scopes",
      ok:
        sourceHealth.guardrails.autoEditArticles === false &&
        sourceHealth.guardrails.autoMarkReview === false &&
        sourceHealth.guardrails.autoPublish === false &&
        sourceHealth.summary.broadFirstCoverageFiles === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        sourceHealth.summary.currentReviewFiles === publishPack.items.length &&
        sourceHealth.summary.publicGapDecisionFiles === publicCoverageGapDecisionPack.summary.items &&
        sourceHealth.summary.nextSourcePackFiles === nextReviewSourcePack.summary.items &&
        sourceHealth.summary.filesCovered >= nextReviewSourcePack.summary.items,
      detail: `broadFirst=${sourceHealth.summary.broadFirstCoverageFiles}, current=${sourceHealth.summary.currentReviewFiles}, publicGap=${sourceHealth.summary.publicGapDecisionFiles}, next=${sourceHealth.summary.nextSourcePackFiles}, files=${sourceHealth.summary.filesCovered}`,
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
      name: "source target remediation pack is read-only and mirrors source health counts",
      ok:
        sourceTargetRemediationPack.guardrails.autoEditArticles === false &&
        sourceTargetRemediationPack.guardrails.autoMarkReview === false &&
        sourceTargetRemediationPack.guardrails.autoPublish === false &&
        sourceTargetRemediationPack.guardrails.trafficClaim === "not-included" &&
        sourceTargetRemediationPack.summary.failedUrls === sourceHealth.summary.failedUrls &&
        sourceTargetRemediationPack.summary.redirectedUrls === sourceHealth.summary.redirectedUrls &&
        sourceTargetRemediationPack.summary.failedUrlItems === sourceHealth.summary.failedUrls &&
        sourceTargetRemediationPack.summary.redirectedUrlItems === sourceHealth.summary.redirectedUrls &&
        sourceTargetRemediationPack.summary.items === sourceHealth.summary.failedUrls + sourceHealth.summary.redirectedUrls &&
        sourceTargetRemediationPack.summary.sourceHealthCheckedUrls === sourceHealth.summary.checkedUrls &&
        sourceTargetRemediationPack.summary.sourceHealthFailedUrls === sourceHealth.summary.failedUrls &&
        sourceTargetRemediationPack.summary.sourceHealthRedirectedUrls === sourceHealth.summary.redirectedUrls &&
        sourceTargetRemediationPack.sourceEvidence?.sourceHealthSummary?.failedUrls === sourceHealth.summary.failedUrls &&
        sourceTargetRemediationPack.sourceEvidence?.sourceHealthSummary?.redirectedUrls === sourceHealth.summary.redirectedUrls,
      detail: `items=${sourceTargetRemediationPack.summary.items}, failed=${sourceTargetRemediationPack.summary.failedUrlItems}/${sourceHealth.summary.failedUrls}, redirected=${sourceTargetRemediationPack.summary.redirectedUrlItems}/${sourceHealth.summary.redirectedUrls}`,
    },
    {
      name: "source target remediation pack keeps every source fix human-gated",
      ok:
        sourceTargetRemediationPack.summary.unsafeItems === 0 &&
        sourceTargetRemediationPack.summary.manualFixReadyItems === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.itemsWithReferences === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.itemsWithAffectedFiles === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.itemsWithManualActions === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.itemsWithReplacementPlan === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.itemsWithHumanChecklist === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.humanGatedItems === sourceTargetRemediationPack.summary.items &&
        sourceTargetRemediationPack.summary.failedItemsWithReplacementCandidates === sourceTargetRemediationPack.summary.failedUrlItems &&
        sourceTargetRemediationPack.summary.replacementCandidateOptions >= sourceTargetRemediationPack.summary.failedUrlItems &&
        (sourceTargetRemediationPack.unsafeItems?.length || 0) === 0 &&
        Boolean(
          sourceTargetRemediationPack.items?.every(
            (item) =>
              item.manualFixReady === true &&
              (item.referenceCount || 0) > 0 &&
              (item.affectedFiles?.length || 0) > 0 &&
              (item.manualActions?.length || 0) >= 3 &&
              (item.replacementPlan?.length || 0) > 0 &&
              (item.kind !== "failed-url" || (item.replacementCandidates?.length || 0) > 0) &&
              (item.humanChecklist?.length || 0) >= 5 &&
              (item.unsafeReasons?.length || 0) === 0 &&
              item.stopBefore?.toLowerCase().includes("human"),
          ),
        ),
      detail: `ready=${sourceTargetRemediationPack.summary.manualFixReadyItems}, unsafe=${sourceTargetRemediationPack.summary.unsafeItems}, gated=${sourceTargetRemediationPack.summary.humanGatedItems}, replacementCandidates=${sourceTargetRemediationPack.summary.replacementCandidateOptions}`,
    },
    {
      name: "source replacement decision pack is read-only and mirrors remediation counts",
      ok:
        sourceReplacementDecisionPack.guardrails.autoEditArticles === false &&
        sourceReplacementDecisionPack.guardrails.autoMarkReview === false &&
        sourceReplacementDecisionPack.guardrails.autoPublish === false &&
        sourceReplacementDecisionPack.guardrails.trafficClaim.includes("No measured traffic") &&
        sourceReplacementDecisionPack.summary.sourceRemediationItems === sourceTargetRemediationPack.summary.items &&
        sourceReplacementDecisionPack.summary.sourceRemediationUnsafeItems === sourceTargetRemediationPack.summary.unsafeItems &&
        sourceReplacementDecisionPack.summary.failedDecisionItems >= sourceTargetRemediationPack.summary.failedUrlItems &&
        sourceReplacementDecisionPack.summary.redirectedDecisionItems >= sourceTargetRemediationPack.summary.redirectedUrlItems &&
        sourceReplacementDecisionPack.sourceEvidence?.remediationSummary?.items === sourceTargetRemediationPack.summary.items &&
        sourceReplacementDecisionPack.sourceEvidence?.remediationSummary?.failedUrlItems === sourceTargetRemediationPack.summary.failedUrlItems &&
        sourceReplacementDecisionPack.sourceEvidence?.remediationSummary?.redirectedUrlItems === sourceTargetRemediationPack.summary.redirectedUrlItems,
      detail: `decisions=${sourceReplacementDecisionPack.summary.items}, remediation=${sourceTargetRemediationPack.summary.items}, failed=${sourceReplacementDecisionPack.summary.failedDecisionItems}/${sourceTargetRemediationPack.summary.failedUrlItems}, redirected=${sourceReplacementDecisionPack.summary.redirectedDecisionItems}/${sourceTargetRemediationPack.summary.redirectedUrlItems}`,
    },
    {
      name: "source replacement decision pack keeps file-level decisions human-gated",
      ok:
        sourceReplacementDecisionPack.summary.unsafeItems === 0 &&
        sourceReplacementDecisionPack.summary.humanGatedItems === sourceReplacementDecisionPack.summary.items &&
        sourceReplacementDecisionPack.summary.itemsWithDecisionOptions === sourceReplacementDecisionPack.summary.items &&
        sourceReplacementDecisionPack.summary.itemsWithManualChecklist === sourceReplacementDecisionPack.summary.items &&
        sourceReplacementDecisionPack.summary.itemsWithRecommendedCandidate >= sourceReplacementDecisionPack.summary.failedDecisionItems &&
        sourceReplacementDecisionPack.summary.officialRecommendedCandidates >= sourceReplacementDecisionPack.summary.failedDecisionItems &&
        (sourceReplacementDecisionPack.unsafeItems?.length || 0) === 0 &&
        Boolean(
          sourceReplacementDecisionPack.items?.every(
            (item) =>
              Boolean(item.file) &&
              (item.decisionOptions?.length || 0) >= 3 &&
              (item.manualChecklist?.length || 0) >= 5 &&
              (item.kind !== "failed-url" || item.recommendedCandidate?.sourceType === "official-doc") &&
              (item.kind !== "redirected-url" || item.recommendedCandidate === null) &&
              (item.unsafeReasons?.length || 0) === 0 &&
              item.stopBefore?.toLowerCase().includes("human"),
          ),
        ),
      detail: `unsafe=${sourceReplacementDecisionPack.summary.unsafeItems}, gated=${sourceReplacementDecisionPack.summary.humanGatedItems}, recommended=${sourceReplacementDecisionPack.summary.itemsWithRecommendedCandidate}, official=${sourceReplacementDecisionPack.summary.officialRecommendedCandidates}`,
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
        autopilotReviewQueue.summary.readyItems + autopilotReviewQueue.summary.blockedItems === autopilotReviewQueue.summary.items &&
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
      detail: `ready=${autopilotReviewQueue.summary.readyItems}, blocked=${autopilotReviewQueue.summary.blockedItems}, safe=${autopilotReviewQueue.summary.safeDraftItems}, unsafe=${autopilotReviewQueue.summary.unsafeItems}`,
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
      name: "autopilot approval remediation pack covers approval packet",
      ok:
        autopilotApprovalRemediation.guardrails.autoEditArticles === false &&
        autopilotApprovalRemediation.guardrails.autoMarkReview === false &&
        autopilotApprovalRemediation.guardrails.autoPublish === false &&
        autopilotApprovalRemediation.guardrails.trafficClaim === "not-included" &&
        autopilotApprovalRemediation.summary.approvalItems === autopilotApprovalPacket.summary.items &&
        autopilotApprovalRemediation.summary.items === autopilotApprovalPacket.summary.items &&
        autopilotApprovalRemediation.sourceEvidence.approvalPacketUnsafeItems === 0 &&
        autopilotApprovalRemediation.sourceEvidence.searchIntentUnsafeItems === 0 &&
        autopilotApprovalRemediation.sourceEvidence.internalLinkUnsafeItems === 0 &&
        autopilotApprovalRemediation.sourceEvidence.sourceVerificationUnsafeItems === 0 &&
        autopilotApprovalRemediation.sourceEvidence.sourceTargetRemediationItems === sourceTargetRemediationPack.summary.items &&
        autopilotApprovalRemediation.sourceEvidence.sourceTargetRemediationUnsafeItems === 0 &&
        autopilotApprovalRemediation.sourceEvidence.sourceTargetRemediationManualFixReadyItems === sourceTargetRemediationPack.summary.manualFixReadyItems &&
        autopilotApprovalRemediation.sourceEvidence.approvalItemsWithSourceUrlRemediation === autopilotApprovalRemediation.summary.itemsWithSourceUrlFixes &&
        autopilotApprovalRemediation.sourceEvidence.humanReviewPlaybookUnsafeItems === 0 &&
        autopilotApprovalRemediation.sourceEvidence.optimizationUnsafeCommands === 0 &&
        autopilotApprovalRemediation.summary.unsafeItems === 0,
      detail: `items=${autopilotApprovalRemediation.summary.items}, ready=${autopilotApprovalRemediation.summary.manualFixReadyItems}, unsafe=${autopilotApprovalRemediation.summary.unsafeItems}`,
    },
    {
      name: "autopilot approval remediation pack has actionable human fixes",
      ok:
        autopilotApprovalRemediation.summary.manualFixReadyItems === autopilotApprovalRemediation.summary.items &&
        autopilotApprovalRemediation.summary.itemsWithCommandBoundary === autopilotApprovalRemediation.summary.items &&
        autopilotApprovalRemediation.summary.itemsWithInternalLinkFixes === autopilotApprovalRemediation.summary.items &&
        autopilotApprovalRemediation.summary.itemsWithSearchFixes === autopilotApprovalRemediation.summary.items &&
        autopilotApprovalRemediation.summary.itemsWithSourceChecks === autopilotApprovalRemediation.summary.items &&
        (sourceTargetRemediationPack.summary.items === 0 || autopilotApprovalRemediation.summary.itemsWithSourceUrlFixes > 0) &&
        (sourceTargetRemediationPack.summary.items === 0 || autopilotApprovalRemediation.summary.sourceUrlFixActions > 0) &&
        autopilotApprovalRemediation.summary.itemsWithRemediationReasons === autopilotApprovalRemediation.summary.items &&
        Boolean(
          autopilotApprovalRemediation.items?.every(
            (item) =>
              item.manualFixReady === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.humanChecklist?.length || 0) >= 5 &&
              (item.internalLinkFixes?.length || 0) > 0 &&
              (item.searchFixes?.length || 0) > 0 &&
              (item.sourceChecks?.length || 0) > 0 &&
              ((item.sourceUrlFixes?.length || 0) === 0 || item.humanChecklist?.some((check) => String(check).includes("source URL remediation"))) &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit"),
          ),
        ),
      detail: `commands=${autopilotApprovalRemediation.summary.itemsWithCommandBoundary}, links=${autopilotApprovalRemediation.summary.itemsWithInternalLinkFixes}, search=${autopilotApprovalRemediation.summary.itemsWithSearchFixes}, source=${autopilotApprovalRemediation.summary.itemsWithSourceChecks}, sourceUrlFixes=${autopilotApprovalRemediation.summary.itemsWithSourceUrlFixes}/${autopilotApprovalRemediation.summary.sourceUrlFixActions}`,
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
      name: "autopilot queued playbook brief covers queued sprint items",
      ok:
        autopilotQueuedPlaybookBrief.guardrails.autoEditArticles === false &&
        autopilotQueuedPlaybookBrief.guardrails.autoMarkReview === false &&
        autopilotQueuedPlaybookBrief.guardrails.autoPublish === false &&
        autopilotQueuedPlaybookBrief.sourceEvidence.sprintBoardUnsafeItems === 0 &&
        autopilotQueuedPlaybookBrief.sourceEvidence.queuedForPlaybook === autopilotReviewSprintBoard.summary.queuedForPlaybook &&
        autopilotQueuedPlaybookBrief.summary.items === autopilotReviewSprintBoard.summary.queuedForPlaybook &&
        autopilotQueuedPlaybookBrief.summary.unsafeItems === 0,
      detail: `items=${autopilotQueuedPlaybookBrief.summary.items}, queued=${autopilotReviewSprintBoard.summary.queuedForPlaybook}, unsafe=${autopilotQueuedPlaybookBrief.summary.unsafeItems}`,
    },
    {
      name: "autopilot queued playbook brief has complete human-gated actions",
      ok:
        autopilotQueuedPlaybookBrief.summary.readyItems === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.safeDraftItems === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithCommandBoundary === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithSearchActions === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithSearchQueries === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithSourceActions === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithSourceTargets === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithSourceEvidence === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithRiskChecklist === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedPlaybookBrief.summary.itemsWithInternalLinkSuggestions === autopilotQueuedPlaybookBrief.summary.items &&
        Boolean(
          autopilotQueuedPlaybookBrief.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.actionItems?.length || 0) >= 5 &&
              (item.searchActions?.length || 0) > 0 &&
              (item.searchQueries?.length || 0) > 0 &&
              (item.sourceActions?.length || 0) > 0 &&
              (item.sourceTargets?.length || 0) > 0 &&
              (item.sourceEvidence?.length || 0) >= 3 &&
              (item.factCheckQueries?.length || 0) > 0 &&
              (item.riskReviewChecklist?.length || 0) >= 4 &&
              (item.internalLinkSuggestions?.length || 0) > 0 &&
              item.manualOnlyCommands?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.manualOnlyCommands?.publishDryRunAfterReview?.includes("--confirm") &&
              item.manualOnlyCommands?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${autopilotQueuedPlaybookBrief.summary.readyItems}, search=${autopilotQueuedPlaybookBrief.summary.itemsWithSearchActions}, source=${autopilotQueuedPlaybookBrief.summary.itemsWithSourceActions}, links=${autopilotQueuedPlaybookBrief.summary.itemsWithInternalLinkSuggestions}`,
    },
    {
      name: "autopilot queued remediation pack covers queued playbook items",
      ok:
        autopilotQueuedRemediation.guardrails.autoEditArticles === false &&
        autopilotQueuedRemediation.guardrails.autoMarkReview === false &&
        autopilotQueuedRemediation.guardrails.autoPublish === false &&
        autopilotQueuedRemediation.guardrails.trafficClaim === "not-included" &&
        autopilotQueuedRemediation.sourceEvidence.queuedPlaybookUnsafeItems === 0 &&
        autopilotQueuedRemediation.sourceEvidence.sprintBoardUnsafeItems === 0 &&
        autopilotQueuedRemediation.sourceEvidence.queuedForPlaybook === autopilotQueuedPlaybookBrief.sourceEvidence.queuedForPlaybook &&
        autopilotQueuedRemediation.summary.queuedItems === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedRemediation.summary.items === autopilotQueuedPlaybookBrief.summary.items &&
        autopilotQueuedRemediation.summary.unsafeItems === 0,
      detail: `items=${autopilotQueuedRemediation.summary.items}, queued=${autopilotQueuedPlaybookBrief.summary.items}, unsafe=${autopilotQueuedRemediation.summary.unsafeItems}`,
    },
    {
      name: "autopilot queued remediation pack has actionable human fixes",
      ok:
        autopilotQueuedRemediation.summary.manualFixReadyItems === autopilotQueuedRemediation.summary.items &&
        autopilotQueuedRemediation.summary.itemsWithCommandBoundary === autopilotQueuedRemediation.summary.items &&
        autopilotQueuedRemediation.summary.itemsWithInternalLinkFixes === autopilotQueuedRemediation.summary.items &&
        autopilotQueuedRemediation.summary.itemsWithRemediationReasons === autopilotQueuedRemediation.summary.items &&
        autopilotQueuedRemediation.summary.itemsWithRiskChecks === autopilotQueuedRemediation.summary.items &&
        autopilotQueuedRemediation.summary.itemsWithSearchFixes === autopilotQueuedRemediation.summary.items &&
        autopilotQueuedRemediation.summary.itemsWithSourceChecks === autopilotQueuedRemediation.summary.items &&
        Boolean(
          autopilotQueuedRemediation.items?.every(
            (item) =>
              item.manualFixReady === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.humanChecklist?.length || 0) >= 5 &&
              (item.internalLinkFixes?.length || 0) > 0 &&
              (item.remediationReasons?.length || 0) > 0 &&
              (item.riskChecks?.length || 0) >= 4 &&
              (item.searchFixes?.length || 0) > 0 &&
              (item.sourceChecks?.length || 0) > 0 &&
              (item.sourceEvidence?.length || 0) >= 3 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${autopilotQueuedRemediation.summary.manualFixReadyItems}, search=${autopilotQueuedRemediation.summary.itemsWithSearchFixes}, source=${autopilotQueuedRemediation.summary.itemsWithSourceChecks}, links=${autopilotQueuedRemediation.summary.itemsWithInternalLinkFixes}`,
    },
    {
      name: "autopilot broad AI demand brief is read-only and source-backed",
      ok:
        autopilotBroadAiDemandBrief.guardrails.autoCreateArticles === false &&
        autopilotBroadAiDemandBrief.guardrails.autoEditArticles === false &&
        autopilotBroadAiDemandBrief.guardrails.autoMarkReview === false &&
        autopilotBroadAiDemandBrief.guardrails.autoPublish === false &&
        autopilotBroadAiDemandBrief.guardrails.trafficClaim === "not-included" &&
        autopilotBroadAiDemandBrief.summary.clusters >= 8 &&
        autopilotBroadAiDemandBrief.summary.externalSourceSignals >= autopilotBroadAiDemandBrief.summary.clusters * 2 &&
        autopilotBroadAiDemandBrief.summary.readyCandidateFiles >= autopilotBroadAiDemandBrief.summary.clusters &&
        autopilotBroadAiDemandBrief.summary.unsafeClusters === 0,
      detail: `clusters=${autopilotBroadAiDemandBrief.summary.clusters}, sources=${autopilotBroadAiDemandBrief.summary.externalSourceSignals}, readyFiles=${autopilotBroadAiDemandBrief.summary.readyCandidateFiles}, unsafe=${autopilotBroadAiDemandBrief.summary.unsafeClusters}`,
    },
    {
      name: "autopilot broad AI demand brief covers broad search lanes",
      ok: Boolean(
        autopilotBroadAiDemandBrief.clusters?.every(
          (cluster) =>
            (cluster.searchQueries?.length || 0) >= 4 &&
            (cluster.sourceSignals?.length || 0) >= 2 &&
            (cluster.contentAngles?.length || 0) >= 3 &&
            (cluster.reviewFocus?.length || 0) >= 3 &&
            (cluster.readyCandidates?.length || 0) > 0,
        ),
      ),
      detail: `clusters=${autopilotBroadAiDemandBrief.summary.clusters}, withoutPublic=${autopilotBroadAiDemandBrief.summary.clustersWithoutPublicCoverage}, withReady=${autopilotBroadAiDemandBrief.summary.clustersWithReadyCandidates}`,
    },
    {
      name: "autopilot broad freshness triage is read-only and prioritizes high-risk demand candidates",
      ok:
        autopilotBroadFreshnessTriage.guardrails.autoEditArticles === false &&
        autopilotBroadFreshnessTriage.guardrails.autoMarkReview === false &&
        autopilotBroadFreshnessTriage.guardrails.autoPublish === false &&
        autopilotBroadFreshnessTriage.guardrails.trafficClaim === "not-included" &&
        autopilotBroadFreshnessTriage.summary.items >= 16 &&
        autopilotBroadFreshnessTriage.summary.highRiskItems === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.clustersCovered >= Math.min(6, autopilotBroadAiDemandBrief.summary.clusters) &&
        autopilotBroadFreshnessTriage.summary.unsafeItems === 0,
      detail: `items=${autopilotBroadFreshnessTriage.summary.items}, highRisk=${autopilotBroadFreshnessTriage.summary.highRiskItems}, clusters=${autopilotBroadFreshnessTriage.summary.clustersCovered}, unsafe=${autopilotBroadFreshnessTriage.summary.unsafeItems}`,
    },
    {
      name: "autopilot broad freshness triage has complete human fact-check packets",
      ok:
        autopilotBroadFreshnessTriage.summary.readyItems === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.safeDraftItems === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.uniqueFiles === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.itemsWithCommandBoundary === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.itemsWithExternalSignals === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.itemsWithHumanFactChecks === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.itemsWithSearchQueries === autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadFreshnessTriage.summary.itemsWithSourceTargets === autopilotBroadFreshnessTriage.summary.items &&
        Boolean(
          autopilotBroadFreshnessTriage.items?.every(
            (item) =>
              item.readyForHumanFreshnessReview === true &&
              item.safeDraft === true &&
              (item.humanFactCheckChecklist?.length || 0) >= 6 &&
              (item.searchQueries?.length || 0) >= 4 &&
              (item.sourceSignals?.length || 0) > 0 &&
              (item.sourceTargets?.length || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${autopilotBroadFreshnessTriage.summary.readyItems}, factChecks=${autopilotBroadFreshnessTriage.summary.itemsWithHumanFactChecks}, sources=${autopilotBroadFreshnessTriage.summary.itemsWithSourceTargets}`,
    },
    {
      name: "autopilot broad publish waves are read-only and small-batch",
      ok:
        autopilotBroadPublishWaves.guardrails.autoEditArticles === false &&
        autopilotBroadPublishWaves.guardrails.autoMarkReview === false &&
        autopilotBroadPublishWaves.guardrails.autoPublish === false &&
        autopilotBroadPublishWaves.guardrails.trafficClaim === "not-included" &&
        autopilotBroadPublishWaves.summary.items >= Math.min(12, autopilotBroadFreshnessTriage.summary.items) &&
        autopilotBroadPublishWaves.summary.items <= autopilotBroadFreshnessTriage.summary.items &&
        autopilotBroadPublishWaves.summary.itemsPerWaveMax <= 3 &&
        autopilotBroadPublishWaves.summary.waves >= 4 &&
        autopilotBroadPublishWaves.summary.unsafeItems === 0 &&
        autopilotBroadPublishWaves.summary.unsafeWaves === 0,
      detail: `waves=${autopilotBroadPublishWaves.summary.waves}, items=${autopilotBroadPublishWaves.summary.items}, maxPerWave=${autopilotBroadPublishWaves.summary.itemsPerWaveMax}, unsafe=${autopilotBroadPublishWaves.summary.unsafeItems}`,
    },
    {
      name: "autopilot broad publish waves preserve human approval command boundaries",
      ok:
        autopilotBroadPublishWaves.summary.readyItems === autopilotBroadPublishWaves.summary.items &&
        autopilotBroadPublishWaves.summary.safeDraftItems === autopilotBroadPublishWaves.summary.items &&
        autopilotBroadPublishWaves.summary.uniqueFiles === autopilotBroadPublishWaves.summary.items &&
        autopilotBroadPublishWaves.summary.wavesReadyForHumanApproval === autopilotBroadPublishWaves.summary.waves &&
        Boolean(
          autopilotBroadPublishWaves.waves?.every(
            (wave) =>
              wave.humanApprovalRequired === true &&
              wave.readyItems === wave.items?.length &&
              wave.unsafeItems === 0 &&
              (wave.items?.length || 0) <= 3 &&
              (wave.commandBoundary?.markReviewCommandsAfterHumanApproval?.length || 0) === (wave.items?.length || 0) &&
              (wave.commandBoundary?.publishDryRunAfterReview?.length || 0) === (wave.items?.length || 0) &&
              wave.commandBoundary?.markReviewCommandsAfterHumanApproval?.every((command) => command.includes("--confirm-human")) &&
              wave.commandBoundary?.publishDryRunAfterReview?.every((command) => !command.includes("--confirm")) &&
              wave.commandBoundary?.publishConfirm === "not-included" &&
              wave.items?.every((item) => item.readyForHumanFreshnessReview === true && item.safeDraft === true),
          ),
      ),
      detail: `ready=${autopilotBroadPublishWaves.summary.readyItems}, safe=${autopilotBroadPublishWaves.summary.safeDraftItems}, approvalWaves=${autopilotBroadPublishWaves.summary.wavesReadyForHumanApproval}`,
    },
    {
      name: "autopilot broad wave optimization is read-only and covers publish waves",
      ok:
        autopilotBroadWaveOptimization.guardrails.autoEditArticles === false &&
        autopilotBroadWaveOptimization.guardrails.autoMarkReview === false &&
        autopilotBroadWaveOptimization.guardrails.autoPublish === false &&
        autopilotBroadWaveOptimization.guardrails.trafficClaim === "not-included" &&
        autopilotBroadWaveOptimization.summary.items === autopilotBroadPublishWaves.summary.items &&
        autopilotBroadWaveOptimization.summary.waveItems === autopilotBroadPublishWaves.summary.items &&
        autopilotBroadWaveOptimization.summary.waves === autopilotBroadPublishWaves.summary.waves &&
        autopilotBroadWaveOptimization.summary.wavesReady === autopilotBroadWaveOptimization.summary.waves &&
        autopilotBroadWaveOptimization.summary.unsafeItems === 0,
      detail: `items=${autopilotBroadWaveOptimization.summary.items}, waves=${autopilotBroadWaveOptimization.summary.waves}, readyWaves=${autopilotBroadWaveOptimization.summary.wavesReady}, unsafe=${autopilotBroadWaveOptimization.summary.unsafeItems}`,
    },
    {
      name: "autopilot broad wave optimization has actionable SEO and approval guidance",
      ok:
        autopilotBroadWaveOptimization.summary.readyItems === autopilotBroadWaveOptimization.summary.items &&
        autopilotBroadWaveOptimization.summary.safeDraftItems === autopilotBroadWaveOptimization.summary.items &&
        autopilotBroadWaveOptimization.summary.itemsWithActionChecklist === autopilotBroadWaveOptimization.summary.items &&
        autopilotBroadWaveOptimization.summary.itemsWithSearchQueries === autopilotBroadWaveOptimization.summary.items &&
        autopilotBroadWaveOptimization.summary.itemsWithSourceTargets === autopilotBroadWaveOptimization.summary.items &&
        Boolean(
          autopilotBroadWaveOptimization.items?.every(
            (item) =>
              item.readyForHumanOptimizationReview === true &&
              item.safeDraft === true &&
              (item.actionChecklist?.length || 0) >= 8 &&
              (item.searchQueries?.length || 0) >= 4 &&
              (item.sourceTargets?.length || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              (item.unsafeReasons?.length || 0) === 0,
          ),
      ),
      detail: `ready=${autopilotBroadWaveOptimization.summary.readyItems}, checklists=${autopilotBroadWaveOptimization.summary.itemsWithActionChecklist}, links=${autopilotBroadWaveOptimization.summary.itemsWithPublicLinkSuggestion}`,
    },
    {
      name: "autopilot broad wave remediation pack covers optimization items",
      ok:
        autopilotBroadWaveRemediation.guardrails.autoEditArticles === false &&
        autopilotBroadWaveRemediation.guardrails.autoMarkReview === false &&
        autopilotBroadWaveRemediation.guardrails.autoPublish === false &&
        autopilotBroadWaveRemediation.guardrails.trafficClaim === "not-included" &&
        autopilotBroadWaveRemediation.sourceEvidence.broadWaveOptimizationUnsafeItems === 0 &&
        autopilotBroadWaveRemediation.sourceEvidence.trafficDataAvailable === false &&
        autopilotBroadWaveRemediation.summary.items === autopilotBroadWaveOptimization.summary.items &&
        autopilotBroadWaveRemediation.summary.waveItems === autopilotBroadWaveOptimization.summary.waveItems &&
        autopilotBroadWaveRemediation.summary.waves === autopilotBroadWaveOptimization.summary.waves &&
        autopilotBroadWaveRemediation.summary.wavesReady === autopilotBroadWaveRemediation.summary.waves &&
        autopilotBroadWaveRemediation.summary.unsafeItems === 0,
      detail: `items=${autopilotBroadWaveRemediation.summary.items}, waves=${autopilotBroadWaveRemediation.summary.waves}, readyWaves=${autopilotBroadWaveRemediation.summary.wavesReady}, unsafe=${autopilotBroadWaveRemediation.summary.unsafeItems}`,
    },
    {
      name: "autopilot broad wave remediation pack has human-gated fixes",
      ok:
        autopilotBroadWaveRemediation.summary.manualFixReadyItems === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithCommandBoundary === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithInternalLinkFixes === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithPublicLinkPlan === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithRemediationReasons === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithRiskChecks === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithSearchFixes === autopilotBroadWaveRemediation.summary.items &&
        autopilotBroadWaveRemediation.summary.itemsWithSourceChecks === autopilotBroadWaveRemediation.summary.items &&
        Boolean(
          autopilotBroadWaveRemediation.items?.every(
            (item) =>
              item.manualFixReady === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.humanChecklist?.length || 0) >= 5 &&
              (item.internalLinkFixes?.length || 0) > 0 &&
              (item.publicLinkPlan?.length || 0) > 0 &&
              (item.remediationReasons?.length || 0) > 0 &&
              (item.riskChecks?.length || 0) >= 4 &&
              (item.searchFixes?.length || 0) > 0 &&
              (item.sourceChecks?.length || 0) > 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${autopilotBroadWaveRemediation.summary.manualFixReadyItems}, search=${autopilotBroadWaveRemediation.summary.itemsWithSearchFixes}, source=${autopilotBroadWaveRemediation.summary.itemsWithSourceChecks}, linkPlan=${autopilotBroadWaveRemediation.summary.itemsWithPublicLinkPlan}, missingSpecificLinks=${autopilotBroadWaveRemediation.summary.missingSpecificLinkSuggestionItems}`,
    },
    {
      name: "broad first coverage launch pack is read-only and covers zero-public clusters",
      ok:
        broadFirstCoverageLaunchPack.guardrails.autoCreateArticles === false &&
        broadFirstCoverageLaunchPack.guardrails.autoEditArticles === false &&
        broadFirstCoverageLaunchPack.guardrails.autoMarkReview === false &&
        broadFirstCoverageLaunchPack.guardrails.autoPublish === false &&
        broadFirstCoverageLaunchPack.guardrails.trafficClaim === "not-included" &&
        broadFirstCoverageLaunchPack.summary.zeroPublicClusters === autopilotBroadAiDemandBrief.summary.clustersWithoutPublicCoverage &&
        broadFirstCoverageLaunchPack.summary.firstCoverageTarget === publicSurfaceInventory.summary.broadClustersWithoutPublicCoverage &&
        broadFirstCoverageLaunchPack.summary.clustersSelected === broadFirstCoverageLaunchPack.summary.zeroPublicClusters &&
        broadFirstCoverageLaunchPack.summary.uniqueFiles === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.unsafeItems === 0 &&
        broadFirstCoverageLaunchPack.summary.trafficDataAvailable === false,
      detail: `selected=${broadFirstCoverageLaunchPack.summary.clustersSelected}, zeroPublic=${broadFirstCoverageLaunchPack.summary.zeroPublicClusters}, unique=${broadFirstCoverageLaunchPack.summary.uniqueFiles}, unsafe=${broadFirstCoverageLaunchPack.summary.unsafeItems}`,
    },
    {
      name: "broad first coverage launch pack preserves human review boundaries",
      ok:
        broadFirstCoverageLaunchPack.summary.safeDraftItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.humanReviewRequiredItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.commandBoundaries === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.itemsWithSearchQueries === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.itemsWithSourceTargets === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.itemsWithReviewFocus === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.itemsWithFactCheckChecklist === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageLaunchPack.summary.itemsWithContentAngles === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        Boolean(
          broadFirstCoverageLaunchPack.items?.every(
            (item) =>
              item.readyForFirstCoverageReview === true &&
              item.safeDraft === true &&
              item.status === "draft" &&
              item.noindex === true &&
              item.humanReviewRequired === true &&
              (item.searchQueries?.length || 0) >= 4 &&
              (item.sourceTargets?.length || 0) > 0 &&
              (item.reviewFocus?.length || 0) >= 3 &&
              (item.contentAngles?.length || 0) >= 3 &&
              (item.humanFactCheckChecklist?.length || 0) >= 6 &&
              (item.unsafeReasons?.length || 0) === 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `safe=${broadFirstCoverageLaunchPack.summary.safeDraftItems}, commands=${broadFirstCoverageLaunchPack.summary.commandBoundaries}, sources=${broadFirstCoverageLaunchPack.summary.itemsWithSourceTargets}, checks=${broadFirstCoverageLaunchPack.summary.itemsWithFactCheckChecklist}`,
    },
    {
      name: "broad first coverage readiness matrix is read-only and covers launch pack",
      ok:
        broadFirstCoverageReadinessMatrix.guardrails.autoCreateArticles === false &&
        broadFirstCoverageReadinessMatrix.guardrails.autoEditArticles === false &&
        broadFirstCoverageReadinessMatrix.guardrails.autoMarkReview === false &&
        broadFirstCoverageReadinessMatrix.guardrails.autoPublish === false &&
        broadFirstCoverageReadinessMatrix.guardrails.trafficClaim === "not-included" &&
        broadFirstCoverageReadinessMatrix.summary.launchPackItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageReadinessMatrix.summary.firstCoverageItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        broadFirstCoverageReadinessMatrix.summary.zeroPublicClusters === broadFirstCoverageLaunchPack.summary.zeroPublicClusters &&
        broadFirstCoverageReadinessMatrix.summary.uniqueFiles === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.unsafeItems === 0 &&
        broadFirstCoverageReadinessMatrix.summary.trafficDataAvailable === false,
      detail: `items=${broadFirstCoverageReadinessMatrix.summary.firstCoverageItems}, unique=${broadFirstCoverageReadinessMatrix.summary.uniqueFiles}, blocking=${broadFirstCoverageReadinessMatrix.summary.blockingItems}, unsafe=${broadFirstCoverageReadinessMatrix.summary.unsafeItems}`,
    },
    {
      name: "broad first coverage readiness matrix has review evidence and command boundaries",
      ok:
        broadFirstCoverageReadinessMatrix.summary.commandBoundaries === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.preflightReadyItems === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.sourceReadyItems === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.snippetReadyItems === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.schemaReadyItems === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.integrityReadyItems === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        broadFirstCoverageReadinessMatrix.summary.itemsWithPublicLinkPath === broadFirstCoverageReadinessMatrix.summary.firstCoverageItems &&
        Boolean(
          broadFirstCoverageReadinessMatrix.items?.every(
            (item) =>
              item.launchReady === true &&
              (item.reviewActions?.length || 0) >= 6 &&
              item.readiness?.preflightReady === true &&
              item.readiness?.sourceReady === true &&
              item.readiness?.snippetReady === true &&
              item.readiness?.schemaReady === true &&
              item.readiness?.integrityReady === true &&
              item.readiness?.hasPublicLinkPath === true &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `commands=${broadFirstCoverageReadinessMatrix.summary.commandBoundaries}, preflight=${broadFirstCoverageReadinessMatrix.summary.preflightReadyItems}, source=${broadFirstCoverageReadinessMatrix.summary.sourceReadyItems}, links=${broadFirstCoverageReadinessMatrix.summary.itemsWithPublicLinkPath}`,
    },
    {
      name: "human approval execution queue is read-only and covers approval wave",
      ok:
        humanApprovalQueue.guardrails.autoEditArticles === false &&
        humanApprovalQueue.guardrails.autoMarkReview === false &&
        humanApprovalQueue.guardrails.autoPublish === false &&
        humanApprovalQueue.guardrails.trafficClaim === "not-included" &&
        humanApprovalQueue.summary.immediateApprovalItems === waveApprovalPacket.summary.items &&
        humanApprovalQueue.summary.immediateApprovalReadyItems === waveApprovalPacket.summary.readyForHumanReview &&
        humanApprovalQueue.summary.backlogItems > 0 &&
        humanApprovalQueue.summary.items === humanApprovalQueue.summary.immediateApprovalItems + humanApprovalQueue.summary.backlogItems &&
        humanApprovalQueue.summary.itemsWithPopularPromptLane >= humanApprovalQueue.summary.immediateApprovalItems &&
        humanApprovalQueue.publishingBoundary.currentPublicPublished === wavePublishSimulation.summary.publicPublishedBeforeWave &&
        humanApprovalQueue.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval === wavePublishSimulation.summary.projectedPublicPublishedAfterWave,
      detail: `items=${humanApprovalQueue.summary.items}, immediate=${humanApprovalQueue.summary.immediateApprovalItems}, backlog=${humanApprovalQueue.summary.backlogItems}, promptLanes=${humanApprovalQueue.summary.itemsWithPopularPromptLane}, projected=${humanApprovalQueue.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval}`,
    },
    {
      name: "human approval execution queue stays human-gated and excludes publish confirm",
      ok:
        humanApprovalQueue.summary.unsafeItems === 0 &&
        humanApprovalQueue.summary.humanGatedItems === humanApprovalQueue.summary.items &&
        humanApprovalQueue.summary.itemsReadyForHumanApproval === humanApprovalQueue.summary.items &&
        humanApprovalQueue.summary.commandBoundaries === humanApprovalQueue.summary.items &&
        humanApprovalQueue.summary.publishConfirmCommandsIncluded === 0 &&
        humanApprovalQueue.publishingBoundary.publishConfirmCommandsIncluded === 0 &&
        humanApprovalQueue.summary.trafficDataAvailable === false &&
        Boolean(
          humanApprovalQueue.items?.every(
            (item) =>
              item.readyForHumanApproval === true &&
              (item.blockers?.length || 0) === 0 &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.humanChecklist?.length || 0) >= 6 &&
              (item.popularPromptLanes?.length || 0) <= popularAiPromptPlaybook.summary.items &&
              item.articleState?.status === "draft" &&
              item.articleState.noindex === true &&
              item.articleState.humanReviewRequired === true &&
              item.articleState.sourceNotes === true &&
              (item.articleState.qualityScore || 0) >= 100 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${humanApprovalQueue.summary.itemsReadyForHumanApproval}, sourceDecisions=${humanApprovalQueue.summary.itemsWithSourceReplacementDecisions}, seoWarnings=${humanApprovalQueue.summary.itemsWithSeoWarnings}, promptLanes=${humanApprovalQueue.summary.itemsWithPopularPromptLane}, publishConfirm=${humanApprovalQueue.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "human approval clearance pack is read-only and covers the full approval queue",
      ok:
        humanApprovalClearancePack.guardrails.autoEditArticles === false &&
        humanApprovalClearancePack.guardrails.autoMarkReview === false &&
        humanApprovalClearancePack.guardrails.autoPublish === false &&
        humanApprovalClearancePack.guardrails.trafficClaim === "not-included" &&
        humanApprovalClearancePack.summary.approvalItems === humanApprovalQueue.summary.items &&
        humanApprovalClearancePack.summary.immediateItems === humanApprovalQueue.summary.immediateApprovalItems &&
        humanApprovalClearancePack.summary.backlogItems === humanApprovalQueue.summary.backlogItems &&
        humanApprovalClearancePack.summary.sourceDecisionItems <= humanApprovalQueue.summary.itemsWithSourceReplacementDecisions &&
        humanApprovalClearancePack.summary.failedSourceDecisionItems === humanApprovalQueue.summary.itemsWithFailedSourceDecision &&
        humanApprovalClearancePack.summary.seoWarningItems === humanApprovalQueue.summary.itemsWithSeoWarnings &&
        humanApprovalClearancePack.summary.popularPromptLaneItems === humanApprovalQueue.summary.itemsWithPopularPromptLane &&
        humanApprovalClearancePack.publishingBoundary.currentPublicPublished === humanApprovalQueue.publishingBoundary.currentPublicPublished &&
        humanApprovalClearancePack.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval ===
          humanApprovalQueue.publishingBoundary.projectedPublicPublishedAfterImmediateHumanApproval,
      detail: `items=${humanApprovalClearancePack.summary.approvalItems}, immediate=${humanApprovalClearancePack.summary.immediateItems}, backlog=${humanApprovalClearancePack.summary.backlogItems}, failedSources=${humanApprovalClearancePack.summary.failedSourceDecisionItems}, seo=${humanApprovalClearancePack.summary.seoWarningItems}`,
    },
    {
      name: "human approval clearance pack keeps all work human-gated and action-ready",
      ok:
        humanApprovalClearancePack.summary.unsafeItems === 0 &&
        humanApprovalClearancePack.summary.itemsReadyForClearanceReview === humanApprovalClearancePack.summary.approvalItems &&
        humanApprovalClearancePack.summary.clearanceActions >= humanApprovalClearancePack.summary.approvalItems * 5 &&
        humanApprovalClearancePack.summary.publishConfirmCommandsIncluded === 0 &&
        humanApprovalClearancePack.publishingBoundary.publishConfirmCommandsIncluded === 0 &&
        humanApprovalClearancePack.summary.trafficDataAvailable === false &&
        Boolean(
          humanApprovalClearancePack.items?.every(
            (item) =>
              item.readyForClearanceReview === true &&
              item.readyForHumanApproval === true &&
              (item.blockers?.length || 0) === 0 &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.clearanceActions?.length || 0) >= 5 &&
              item.articleState?.status === "draft" &&
              item.articleState?.noindex === true &&
              item.articleState?.humanReviewRequired === true &&
              item.articleState?.sourceNotes === true &&
              (item.articleState?.qualityScore || 0) >= 100 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${humanApprovalClearancePack.summary.itemsReadyForClearanceReview}, actions=${humanApprovalClearancePack.summary.clearanceActions}, sourceDecisions=${humanApprovalClearancePack.summary.sourceDecisionItems}, copydesk=${humanApprovalClearancePack.summary.copydeskBriefItems}, publishConfirm=${humanApprovalClearancePack.summary.publishConfirmCommandsIncluded}`,
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
      name: "SEO warning remediation pack is read-only and mirrors snippet/schema warnings",
      ok:
        seoWarningRemediation.guardrails.autoEditArticles === false &&
        seoWarningRemediation.guardrails.autoMarkReview === false &&
        seoWarningRemediation.guardrails.autoPublish === false &&
        seoWarningRemediation.guardrails.trafficClaim === "not-included" &&
        seoWarningRemediation.summary.snippetWarningItems === searchSnippets.summary.warningItems &&
        seoWarningRemediation.summary.schemaWarningItems === structuredData.summary.warningItems &&
        seoWarningRemediation.summary.blockingItems === searchSnippets.summary.blockingItems + structuredData.summary.blockingItems &&
        seoWarningRemediation.summary.warningItems <= seoWarningRemediation.summary.snippetWarningItems + seoWarningRemediation.summary.schemaWarningItems &&
        seoWarningRemediation.summary.items === seoWarningRemediation.summary.warningItems,
      detail: `items=${seoWarningRemediation.summary.items}, snippet=${seoWarningRemediation.summary.snippetWarningItems}/${searchSnippets.summary.warningItems}, schema=${seoWarningRemediation.summary.schemaWarningItems}/${structuredData.summary.warningItems}`,
    },
    {
      name: "SEO warning remediation pack keeps every SEO fix human-gated",
      ok:
        seoWarningRemediation.summary.unsafeItems === 0 &&
        seoWarningRemediation.summary.itemsWithManualActions === seoWarningRemediation.summary.items &&
        seoWarningRemediation.summary.itemsWithHumanChecklist === seoWarningRemediation.summary.items &&
        seoWarningRemediation.summary.humanGatedItems === seoWarningRemediation.summary.items &&
        seoWarningRemediation.summary.trafficDataAvailable === false &&
        (seoWarningRemediation.unsafeItems?.length || 0) === 0 &&
        Boolean(
          seoWarningRemediation.items?.every(
            (item) =>
              item.manualFixReady === true &&
              (item.manualActions?.length || 0) >= 3 &&
              (item.humanChecklist?.length || 0) >= 5 &&
              (item.snippetWarnings?.length || 0) + (item.schemaWarnings?.length || 0) > 0 &&
              (item.unsafeReasons?.length || 0) === 0 &&
              item.stopBefore?.toLowerCase().includes("human") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              !String(item.commandBoundary?.publishDryRunAfterReview || "").includes("--confirm"),
          ),
        ),
      detail: `ready=${seoWarningRemediation.summary.items - seoWarningRemediation.summary.unsafeItems}, public=${seoWarningRemediation.summary.publicItems}, draft=${seoWarningRemediation.summary.draftItems}, gated=${seoWarningRemediation.summary.humanGatedItems}`,
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
      name: "AI deployment sprint board covers deployment tutorials across lanes",
      ok:
        deploymentSprintBoard.guardrails.autoCreateArticles === false &&
        deploymentSprintBoard.guardrails.autoEditArticles === false &&
        deploymentSprintBoard.guardrails.autoMarkReview === false &&
        deploymentSprintBoard.guardrails.autoPublish === false &&
        deploymentSprintBoard.guardrails.trafficClaim === "not-included" &&
        deploymentSprintBoard.summary.items === deploymentReviewPack.summary.items &&
        deploymentSprintBoard.summary.reviewPackItems === deploymentReviewPack.summary.items &&
        deploymentSprintBoard.summary.deploymentPublicArticles === deploymentReviewPack.summary.deploymentPublicArticles &&
        deploymentSprintBoard.summary.readyForDeploymentSprint === deploymentSprintBoard.summary.items &&
        deploymentSprintBoard.summary.lanes >= 5 &&
        deploymentSprintBoard.summary.implementationModes >= 5 &&
        deploymentSprintBoard.summary.searchQueries >= 30 &&
        deploymentSprintBoard.summary.sourceTargets >= 10 &&
        deploymentSprintBoard.summary.waves >= 5 &&
        deploymentSprintBoard.summary.trafficDataAvailable === false,
      detail: `items=${deploymentSprintBoard.summary.items}, lanes=${deploymentSprintBoard.summary.lanes}, modes=${deploymentSprintBoard.summary.implementationModes}, queries=${deploymentSprintBoard.summary.searchQueries}, sources=${deploymentSprintBoard.summary.sourceTargets}`,
    },
    {
      name: "AI deployment sprint board keeps deployment work human-gated and publish-safe",
      ok:
        deploymentSprintBoard.summary.unsafeItems === 0 &&
        (deploymentSprintBoard.unsafeItems?.length || 0) === 0 &&
        deploymentSprintBoard.summary.publishConfirmCommandsIncluded === 0 &&
        deploymentSprintBoard.summary.actionItems >= deploymentSprintBoard.summary.items * 10 &&
        deploymentSprintBoard.summary.agentItems > 0 &&
        deploymentSprintBoard.summary.memoryItems > 0 &&
        deploymentSprintBoard.summary.modelServingItems > 0 &&
        deploymentSprintBoard.summary.localModelItems > 0 &&
        deploymentSprintBoard.summary.automationPlatformItems > 0 &&
        Boolean(
          deploymentSprintBoard.items?.every(
            (item) =>
              item.readyForDeploymentSprint === true &&
              item.publishConfirm === "not-included" &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.actionCount || 0) >= 10 &&
              (item.deploymentChecks?.length || 0) >= 6 &&
              (item.humanReviewActions?.length || 0) >= 6 &&
              (item.searchQueries?.length || 0) >= 3 &&
              (item.sourceTargets?.length || 0) >= 2,
          ),
        ) &&
        Boolean(deploymentSprintBoard.waves?.every((wave) => wave.readyItems === wave.items && (wave.unsafeItems || 0) === 0 && (wave.actionItems || 0) >= (wave.items || 0) * 10)),
      detail: `ready=${deploymentSprintBoard.summary.readyForDeploymentSprint}, actions=${deploymentSprintBoard.summary.actionItems}, unsafe=${deploymentSprintBoard.summary.unsafeItems}, publishConfirm=${deploymentSprintBoard.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "memory RAG sprint board covers broad searchable memory demand",
      ok:
        memoryRagSprintBoard.guardrails.autoCreateArticles === false &&
        memoryRagSprintBoard.guardrails.autoEditArticles === false &&
        memoryRagSprintBoard.guardrails.autoMarkReview === false &&
        memoryRagSprintBoard.guardrails.autoPublish === false &&
        memoryRagSprintBoard.guardrails.trafficClaim === "not-included" &&
        memoryRagSprintBoard.summary.lanes >= 6 &&
        memoryRagSprintBoard.summary.readyLanes === memoryRagSprintBoard.summary.lanes &&
        memoryRagSprintBoard.summary.howToLanes >= 2 &&
        memoryRagSprintBoard.summary.vectorLanes >= 1 &&
        memoryRagSprintBoard.summary.privacyLanes >= 1 &&
        memoryRagSprintBoard.summary.searchQueries >= 24 &&
        memoryRagSprintBoard.summary.sourceTargets >= 2 &&
        memoryRagSprintBoard.summary.waves >= 2 &&
        memoryRagSprintBoard.summary.trafficDataAvailable === false,
      detail: `lanes=${memoryRagSprintBoard.summary.lanes}, queries=${memoryRagSprintBoard.summary.searchQueries}, sources=${memoryRagSprintBoard.summary.sourceTargets}, waves=${memoryRagSprintBoard.summary.waves}`,
    },
    {
      name: "memory RAG sprint board keeps memory work human-gated and publish-safe",
      ok:
        memoryRagSprintBoard.summary.unsafeItems === 0 &&
        (memoryRagSprintBoard.unsafeItems?.length || 0) === 0 &&
        memoryRagSprintBoard.summary.publishConfirmCommandsIncluded === 0 &&
        memoryRagSprintBoard.summary.readyCandidates === memoryRagSprintBoard.summary.candidateItems &&
        memoryRagSprintBoard.summary.decisionChecks >= memoryRagSprintBoard.summary.lanes * 6 &&
        Boolean(
          memoryRagSprintBoard.lanes?.every(
            (lane) =>
              (lane.unsafeReasons?.length || 0) === 0 &&
              (lane.decisionChecks?.length || 0) >= 6 &&
              (lane.searchQueries?.length || 0) >= 4 &&
              (lane.sourceTargets?.length || 0) >= 2,
          ),
        ) &&
        Boolean(
          memoryRagSprintBoard.candidates?.every(
            (item) =>
              item.readyForMemorySprint === true &&
              item.publishConfirm === "not-included" &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.reviewActions?.length || 0) >= 6 &&
              (item.searchQueries?.length || 0) >= 3 &&
              (item.sourceTargets?.length || 0) >= 2,
          ),
        ) &&
        Boolean(memoryRagSprintBoard.waves?.every((wave) => wave.readyItems === wave.items && (wave.unsafeItems || 0) === 0)),
      detail: `candidates=${memoryRagSprintBoard.summary.candidateItems}, ready=${memoryRagSprintBoard.summary.readyCandidates}, checks=${memoryRagSprintBoard.summary.decisionChecks}, unsafe=${memoryRagSprintBoard.summary.unsafeItems}`,
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
      name: "industry prompt opportunity board is broad and read-only",
      ok:
        industryPromptOpportunityBoard.guardrails.autoCreateArticles === false &&
        industryPromptOpportunityBoard.guardrails.autoEditArticles === false &&
        industryPromptOpportunityBoard.guardrails.autoMarkReview === false &&
        industryPromptOpportunityBoard.guardrails.autoPublish === false &&
        industryPromptOpportunityBoard.guardrails.trafficClaim.includes("No measured traffic") &&
        industryPromptOpportunityBoard.summary.opportunities >= 10 &&
        industryPromptOpportunityBoard.summary.departmentLanes >= 10 &&
        industryPromptOpportunityBoard.summary.searchQueryFamilies >= 40,
      detail: `opportunities=${industryPromptOpportunityBoard.summary.opportunities}, lanes=${industryPromptOpportunityBoard.summary.departmentLanes}, queries=${industryPromptOpportunityBoard.summary.searchQueryFamilies}`,
    },
    {
      name: "industry prompt opportunity board has sources, structure, and human boundaries",
      ok:
        industryPromptOpportunityBoard.summary.unsafeItems === 0 &&
        industryPromptOpportunityBoard.summary.itemsWithSourceTargets === industryPromptOpportunityBoard.summary.opportunities &&
        industryPromptOpportunityBoard.summary.itemsWithHumanBoundary === industryPromptOpportunityBoard.summary.opportunities &&
        industryPromptOpportunityBoard.summary.itemsWithInputOutputStructure === industryPromptOpportunityBoard.summary.opportunities &&
        industryPromptOpportunityBoard.summary.promptModules >= 50 &&
        (industryPromptOpportunityBoard.sourceEvidence?.officialPromptSources?.length || 0) >= 5 &&
        (industryPromptOpportunityBoard.sourceEvidence?.marketSignalSources?.length || 0) >= 4 &&
        Boolean(
          industryPromptOpportunityBoard.items?.every(
            (item) =>
              (item.sourceTargets?.length || 0) >= 5 &&
              (item.supportingQueries?.length || 0) >= 4 &&
              (item.promptModules?.length || 0) >= 4 &&
              (item.userInputFields?.length || 0) >= 5 &&
              (item.outputBlocks?.length || 0) >= 4 &&
              (item.riskControls?.length || 0) >= 5 &&
              item.humanBoundary?.includes("Stop before mark:review") &&
              (item.unsafeReasons?.length || 0) === 0,
          ),
        ),
      detail: `safe=${industryPromptOpportunityBoard.summary.unsafeItems === 0}, sources=${industryPromptOpportunityBoard.summary.itemsWithSourceTargets}, structure=${industryPromptOpportunityBoard.summary.itemsWithInputOutputStructure}, modules=${industryPromptOpportunityBoard.summary.promptModules}`,
    },
    {
      name: "industry prompt opportunity board connects to reviewable content",
      ok:
        industryPromptOpportunityBoard.summary.itemsWithReviewPackCandidate >= 1 &&
        industryPromptOpportunityBoard.summary.zeroPublicCoverageItems >= 8,
      detail: `withReviewCandidate=${industryPromptOpportunityBoard.summary.itemsWithReviewPackCandidate}, zeroPublic=${industryPromptOpportunityBoard.summary.zeroPublicCoverageItems}`,
    },
    {
      name: "industry prompt module pack is read-only and mirrors opportunity modules",
      ok:
        industryPromptModulePack.guardrails.autoCreateArticles === false &&
        industryPromptModulePack.guardrails.autoEditArticles === false &&
        industryPromptModulePack.guardrails.autoMarkReview === false &&
        industryPromptModulePack.guardrails.autoPublish === false &&
        industryPromptModulePack.guardrails.trafficClaim.includes("No measured traffic") &&
        industryPromptModulePack.summary.items === industryPromptOpportunityBoard.summary.opportunities &&
        industryPromptModulePack.summary.promptBlueprints === industryPromptOpportunityBoard.summary.promptModules &&
        industryPromptModulePack.summary.sourceOpportunityModules === industryPromptOpportunityBoard.summary.promptModules,
      detail: `items=${industryPromptModulePack.summary.items}/${industryPromptOpportunityBoard.summary.opportunities}, blueprints=${industryPromptModulePack.summary.promptBlueprints}/${industryPromptOpportunityBoard.summary.promptModules}`,
    },
    {
      name: "industry prompt module pack has reusable prompt blueprints and human gates",
      ok:
        industryPromptModulePack.summary.unsafeItems === 0 &&
        industryPromptModulePack.summary.sourceOpportunityUnsafeItems === 0 &&
        industryPromptModulePack.summary.sourceReviewPackUnsafeItems === 0 &&
        industryPromptModulePack.summary.humanGatedItems === industryPromptModulePack.summary.items &&
        industryPromptModulePack.summary.itemsWithCopyPrompts === industryPromptModulePack.summary.items &&
        industryPromptModulePack.summary.itemsWithInputOutputStructure === industryPromptModulePack.summary.items &&
        industryPromptModulePack.summary.itemsWithRiskControls === industryPromptModulePack.summary.items &&
        industryPromptModulePack.summary.itemsWithSourceTargets === industryPromptModulePack.summary.items &&
        industryPromptModulePack.summary.itemsWithReviewPackCandidate >= 10 &&
        industryPromptModulePack.summary.modulesPerOpportunityMin >= 5 &&
        (industryPromptModulePack.sourceEvidence?.officialPromptSources?.length || 0) >= 5 &&
        (industryPromptModulePack.sourceEvidence?.marketSignalSources?.length || 0) >= 4 &&
        Boolean(
          industryPromptModulePack.items?.every(
            (item) =>
              item.readyForHumanReviewPrep === true &&
              (item.safeReviewPackBridge === true || (item.reviewCandidateFiles?.length || 0) === 0) &&
              (item.sourceTargets?.length || 0) >= 5 &&
              (item.supportingQueries?.length || 0) >= 4 &&
              (item.manualReviewActions?.length || 0) >= 4 &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.promptBlueprints?.length || 0) >= 5 &&
              item.promptBlueprints?.every(
                (prompt) =>
                  (prompt.copyPrompt?.length || 0) > 300 &&
                  (prompt.inputFields?.length || 0) >= 5 &&
                  (prompt.outputBlocks?.length || 0) >= 5 &&
                  (prompt.qualityChecklist?.length || 0) >= 5 &&
                  (prompt.riskControls?.length || 0) >= 4,
              ),
          ),
        ),
      detail: `safe=${industryPromptModulePack.summary.unsafeItems === 0}, gated=${industryPromptModulePack.summary.humanGatedItems}, copyPrompts=${industryPromptModulePack.summary.itemsWithCopyPrompts}, reviewBridge=${industryPromptModulePack.summary.itemsWithReviewPackCandidate}`,
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
      name: "search demand intake is read-only and covers broad user-search lanes",
      ok:
        searchDemandIntake.guardrails.autoCreateArticles === false &&
        searchDemandIntake.guardrails.autoEditArticles === false &&
        searchDemandIntake.guardrails.autoMarkReview === false &&
        searchDemandIntake.guardrails.autoPublish === false &&
        searchDemandIntake.guardrails.trafficClaim === "not-included" &&
        searchDemandIntake.summary.lanes >= 8 &&
        searchDemandIntake.summary.lanesWithReadyCandidates === searchDemandIntake.summary.lanes &&
        searchDemandIntake.summary.readyCandidateFiles >= 40 &&
        searchDemandIntake.summary.unsafeLanes === 0,
      detail: `lanes=${searchDemandIntake.summary.lanes}, readyLanes=${searchDemandIntake.summary.lanesWithReadyCandidates}, readyFiles=${searchDemandIntake.summary.readyCandidateFiles}, unsafe=${searchDemandIntake.summary.unsafeLanes}`,
    },
    {
      name: "search demand intake packages sources, formats, and manual review boundaries",
      ok:
        searchDemandIntake.summary.searchQueries >= 70 &&
        searchDemandIntake.summary.officialSourceTargets >= 20 &&
        searchDemandIntake.summary.contentFormats >= 24 &&
        searchDemandIntake.summary.reviewQueueMatches >= 20 &&
        Boolean(
          searchDemandIntake.lanes?.every(
            (lane) =>
              (lane.searchQueries?.length || 0) >= 8 &&
              (lane.officialSourceTargets?.length || 0) >= 3 &&
              (lane.contentFormats?.length || 0) >= 3 &&
              (lane.manualReviewFocus?.length || 0) >= 4 &&
              (lane.readyCandidates?.length || 0) > 0,
          ),
        ),
      detail: `queries=${searchDemandIntake.summary.searchQueries}, sources=${searchDemandIntake.summary.officialSourceTargets}, formats=${searchDemandIntake.summary.contentFormats}, queueMatches=${searchDemandIntake.summary.reviewQueueMatches}`,
    },
    {
      name: "search demand review pack is read-only and covers intake lanes",
      ok:
        searchDemandReviewPack.guardrails.autoCreateArticles === false &&
        searchDemandReviewPack.guardrails.autoEditArticles === false &&
        searchDemandReviewPack.guardrails.autoMarkReview === false &&
        searchDemandReviewPack.guardrails.autoPublish === false &&
        searchDemandReviewPack.guardrails.trafficClaim === "not-included" &&
        searchDemandReviewPack.summary.lanes === searchDemandIntake.summary.lanes &&
        searchDemandReviewPack.summary.items >= searchDemandIntake.summary.lanes * 2 &&
        searchDemandReviewPack.summary.itemsPerLaneMax <= 2 &&
        searchDemandReviewPack.summary.unsafeItems === 0,
      detail: `lanes=${searchDemandReviewPack.summary.lanes}, items=${searchDemandReviewPack.summary.items}, maxPerLane=${searchDemandReviewPack.summary.itemsPerLaneMax}, unsafe=${searchDemandReviewPack.summary.unsafeItems}`,
    },
    {
      name: "search demand review pack keeps review actions human-gated",
      ok:
        searchDemandReviewPack.summary.readyItems === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.safeDraftItems === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.itemsWithCommandBoundary === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.itemsWithHumanChecklist === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.itemsWithManualReviewFocus === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.itemsWithOfficialSources === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.itemsWithSearchQueries === searchDemandReviewPack.summary.items &&
        searchDemandReviewPack.summary.factCheckQueries >= searchDemandReviewPack.summary.items * 4 &&
        searchDemandReviewPack.summary.zeroPublicLaneItems >= searchDemandIntake.summary.lanesWithoutPublicCoverage &&
        Boolean(
          searchDemandReviewPack.items?.every(
            (item) =>
              item.readyForHumanReview === true &&
              item.safeDraft === true &&
              (item.searchQueries?.length || 0) >= 8 &&
              (item.officialSourceTargets?.length || 0) >= 3 &&
              (item.factCheckQueries?.length || 0) > 0 &&
              (item.humanReviewChecklist?.length || 0) >= 6 &&
              (item.manualReviewFocus?.length || 0) >= 4 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.stopBefore?.includes("explicit human approval"),
          ),
        ),
      detail: `ready=${searchDemandReviewPack.summary.readyItems}, commands=${searchDemandReviewPack.summary.itemsWithCommandBoundary}, sources=${searchDemandReviewPack.summary.itemsWithOfficialSources}, queries=${searchDemandReviewPack.summary.itemsWithSearchQueries}, factChecks=${searchDemandReviewPack.summary.factCheckQueries}`,
    },
    {
      name: "search demand publication bridge is read-only and matches review pack",
      ok:
        searchDemandPublicationBridge.guardrails.autoCreateArticles === false &&
        searchDemandPublicationBridge.guardrails.autoEditArticles === false &&
        searchDemandPublicationBridge.guardrails.autoMarkReview === false &&
        searchDemandPublicationBridge.guardrails.autoPublish === false &&
        searchDemandPublicationBridge.guardrails.trafficClaim === "not-included" &&
        searchDemandPublicationBridge.summary.items === searchDemandReviewPack.summary.items &&
        searchDemandPublicationBridge.summary.reviewPackItems === searchDemandReviewPack.summary.items &&
        searchDemandPublicationBridge.summary.blockingItems === 0 &&
        searchDemandPublicationBridge.summary.warningItems >= 0,
      detail: `items=${searchDemandPublicationBridge.summary.items}, reviewPackItems=${searchDemandPublicationBridge.summary.reviewPackItems}, blocking=${searchDemandPublicationBridge.summary.blockingItems}, warnings=${searchDemandPublicationBridge.summary.warningItems}`,
    },
    {
      name: "search demand publication bridge confirms manual approval readiness",
      ok:
        searchDemandPublicationBridge.summary.humanApprovalReadyItems === searchDemandPublicationBridge.summary.items &&
        searchDemandPublicationBridge.summary.indexingSafeItems === searchDemandPublicationBridge.summary.items &&
        searchDemandPublicationBridge.summary.searchSnippetReadyItems === searchDemandPublicationBridge.summary.items &&
        searchDemandPublicationBridge.summary.schemaReadyItems === searchDemandPublicationBridge.summary.items &&
        searchDemandPublicationBridge.summary.sourceReadyItems === searchDemandPublicationBridge.summary.items &&
        searchDemandPublicationBridge.summary.reviewPackReadyItems === searchDemandPublicationBridge.summary.items &&
        Boolean(
          searchDemandPublicationBridge.items?.every(
            (item) =>
              item.humanApprovalReady === true &&
              item.indexingSafe === true &&
              item.searchSnippetReady === true &&
              item.schemaReady === true &&
              item.sourceReady === true &&
              item.reviewPackReady === true &&
              (item.blockingIssues?.length || 0) === 0 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit"),
          ),
        ),
      detail: `approvalReady=${searchDemandPublicationBridge.summary.humanApprovalReadyItems}, snippet=${searchDemandPublicationBridge.summary.searchSnippetReadyItems}, schema=${searchDemandPublicationBridge.summary.schemaReadyItems}, source=${searchDemandPublicationBridge.summary.sourceReadyItems}, links=${searchDemandPublicationBridge.summary.internalLinkReadyItems}`,
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
      name: "mass AI search action matrix is read-only and covers broad themes",
      ok:
        massAiSearchMatrix.guardrails.autoCreateArticles === false &&
        massAiSearchMatrix.guardrails.autoEditArticles === false &&
        massAiSearchMatrix.guardrails.autoMarkReview === false &&
        massAiSearchMatrix.guardrails.autoPublish === false &&
        massAiSearchMatrix.guardrails.trafficClaim === "not-included" &&
        massAiSearchMatrix.summary.sourceBroadThemes === broadSearchDemand.summary.themes &&
        massAiSearchMatrix.summary.items === massAiSearchMatrix.summary.sourceTopThemes &&
        massAiSearchMatrix.summary.items >= 8 &&
        massAiSearchMatrix.summary.itemsWithCandidateFiles === massAiSearchMatrix.summary.items &&
        massAiSearchMatrix.summary.uniqueCandidateFiles >= broadSearchDemand.summary.uniqueCandidateFiles / 2 &&
        massAiSearchMatrix.summary.trafficDataAvailable === false,
      detail: `items=${massAiSearchMatrix.summary.items}/${massAiSearchMatrix.summary.sourceTopThemes}, broad=${massAiSearchMatrix.summary.sourceBroadThemes}, unique=${massAiSearchMatrix.summary.uniqueCandidateFiles}, traffic=${massAiSearchMatrix.summary.trafficDataAvailable}`,
    },
    {
      name: "mass AI search action matrix keeps prompt and deployment work human-gated",
      ok:
        massAiSearchMatrix.summary.unsafeItems === 0 &&
        massAiSearchMatrix.summary.humanGatedItems === massAiSearchMatrix.summary.items &&
        massAiSearchMatrix.summary.itemsReadyForHumanReviewPrep === massAiSearchMatrix.summary.items &&
        massAiSearchMatrix.summary.itemsWithHumanReviewActions === massAiSearchMatrix.summary.items &&
        massAiSearchMatrix.summary.itemsWithSearchSeeds === massAiSearchMatrix.summary.items &&
        massAiSearchMatrix.summary.itemsWithSourceTargets === massAiSearchMatrix.summary.items &&
        massAiSearchMatrix.summary.deploymentBridgedThemes >= 3 &&
        massAiSearchMatrix.summary.promptBridgedThemes >= 1 &&
        massAiSearchMatrix.summary.promptBlueprintSamples >= 2 &&
        Boolean(
          massAiSearchMatrix.items?.every(
            (item) =>
              item.readyForHumanReviewPrep === true &&
              item.trafficClaim === "not-included" &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.humanReviewActions?.length || 0) >= 6 &&
              (item.searchSeeds?.length || 0) >= 4 &&
              (item.sourceTargets?.length || 0) > 0 &&
              (item.articleSignals || []).every(
                (signal) =>
                  signal.status === "draft" &&
                  signal.noindex === true &&
                  signal.humanReviewRequired === true &&
                  signal.sourceNotes === true &&
                  (signal.qualityScore || 0) >= 100,
              ) &&
              (item.commandBoundaries || []).every(
                (command) =>
                  command.markReviewAfterHumanApproval?.includes("--confirm-human") &&
                  !command.publishDryRunAfterReview?.includes("--confirm") &&
                  command.publishConfirm === "not-included",
              ),
          ),
        ),
      detail: `ready=${massAiSearchMatrix.summary.itemsReadyForHumanReviewPrep}, deploy=${massAiSearchMatrix.summary.deploymentBridgedThemes}, prompt=${massAiSearchMatrix.summary.promptBridgedThemes}, unsafe=${massAiSearchMatrix.summary.unsafeItems}`,
    },
    {
      name: "popular AI prompt playbook is read-only and covers broad prompt demand",
      ok:
        popularAiPromptPlaybook.guardrails.autoCreateArticles === false &&
        popularAiPromptPlaybook.guardrails.autoEditArticles === false &&
        popularAiPromptPlaybook.guardrails.autoMarkReview === false &&
        popularAiPromptPlaybook.guardrails.autoPublish === false &&
        popularAiPromptPlaybook.guardrails.trafficClaim === "not-included" &&
        popularAiPromptPlaybook.summary.items >= 10 &&
        popularAiPromptPlaybook.summary.broadWorkPromptLanes >= 3 &&
        popularAiPromptPlaybook.summary.agentDeploymentLanes >= 3 &&
        popularAiPromptPlaybook.summary.memoryLanes >= 1 &&
        popularAiPromptPlaybook.summary.officialSources >= 10 &&
        (popularAiPromptPlaybook.sourceEvidence?.officialSources?.length || 0) >= 10 &&
        popularAiPromptPlaybook.summary.trafficDataAvailable === false,
      detail: `items=${popularAiPromptPlaybook.summary.items}, work=${popularAiPromptPlaybook.summary.broadWorkPromptLanes}, agent=${popularAiPromptPlaybook.summary.agentDeploymentLanes}, memory=${popularAiPromptPlaybook.summary.memoryLanes}, sources=${popularAiPromptPlaybook.summary.officialSources}`,
    },
    {
      name: "popular AI prompt playbook keeps templates human-gated and publish-safe",
      ok:
        popularAiPromptPlaybook.summary.unsafeItems === 0 &&
        popularAiPromptPlaybook.summary.humanGatedItems === popularAiPromptPlaybook.summary.items &&
        popularAiPromptPlaybook.summary.itemsReadyForHumanReviewPrep === popularAiPromptPlaybook.summary.items &&
        popularAiPromptPlaybook.summary.itemsWithCandidateFiles === popularAiPromptPlaybook.summary.items &&
        popularAiPromptPlaybook.summary.itemsWithOfficialSources === popularAiPromptPlaybook.summary.items &&
        popularAiPromptPlaybook.summary.commandBoundaries === popularAiPromptPlaybook.summary.items &&
        popularAiPromptPlaybook.summary.publishConfirmCommandsIncluded === 0 &&
        popularAiPromptPlaybook.summary.promptTemplates >= popularAiPromptPlaybook.summary.items * 5 &&
        popularAiPromptPlaybook.summary.searchQueries >= 100 &&
        popularAiPromptPlaybook.summary.uniqueCandidateFiles >= 20 &&
        popularAiPromptPlaybook.summary.deploymentBridgeItems >= 5 &&
        popularAiPromptPlaybook.summary.promptModuleBridgeItems >= 5 &&
        Boolean(
          popularAiPromptPlaybook.items?.every(
            (item) =>
              item.readyForHumanReviewPrep === true &&
              item.trafficClaim === "not-included" &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.candidateFiles?.length || 0) > 0 &&
              (item.searchQueries?.length || 0) >= 10 &&
              (item.sourceTargets?.length || 0) >= 5 &&
              (item.promptTemplates?.length || 0) >= 5 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit human approval") &&
              (item.promptTemplates || []).every(
                (template) =>
                  (template.copyPrompt?.length || 0) >= 300 &&
                  (template.inputFields?.length || 0) >= 5 &&
                  (template.outputBlocks?.length || 0) >= 5 &&
                  (template.qualityChecklist?.length || 0) >= 5 &&
                  (template.riskControls?.length || 0) >= 4,
              ),
          ),
        ),
      detail: `ready=${popularAiPromptPlaybook.summary.itemsReadyForHumanReviewPrep}, templates=${popularAiPromptPlaybook.summary.promptTemplates}, queries=${popularAiPromptPlaybook.summary.searchQueries}, uniqueFiles=${popularAiPromptPlaybook.summary.uniqueCandidateFiles}, publishConfirm=${popularAiPromptPlaybook.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "popular prompt approval bridge is read-only and covers every popular prompt lane",
      ok:
        popularPromptApprovalBridge.guardrails.autoCreateArticles === false &&
        popularPromptApprovalBridge.guardrails.autoEditArticles === false &&
        popularPromptApprovalBridge.guardrails.autoMarkReview === false &&
        popularPromptApprovalBridge.guardrails.autoPublish === false &&
        popularPromptApprovalBridge.guardrails.trafficClaim === "not-included" &&
        popularPromptApprovalBridge.summary.lanes === popularAiPromptPlaybook.summary.items &&
        popularPromptApprovalBridge.summary.playbookItems === popularAiPromptPlaybook.summary.items &&
        popularPromptApprovalBridge.summary.playbookReadyItems === popularAiPromptPlaybook.summary.itemsReadyForHumanReviewPrep &&
        popularPromptApprovalBridge.summary.lanesWithNextCandidates === popularPromptApprovalBridge.summary.lanes &&
        popularPromptApprovalBridge.summary.lanesWithReadyNextCandidates === popularPromptApprovalBridge.summary.lanes &&
        popularPromptApprovalBridge.summary.trafficDataAvailable === false,
      detail: `lanes=${popularPromptApprovalBridge.summary.lanes}, next=${popularPromptApprovalBridge.summary.lanesWithNextCandidates}, readyNext=${popularPromptApprovalBridge.summary.lanesWithReadyNextCandidates}, alreadyQueued=${popularPromptApprovalBridge.summary.lanesAlreadyInApprovalQueue}`,
    },
    {
      name: "popular prompt approval bridge keeps next candidates human-gated and publish-safe",
      ok:
        popularPromptApprovalBridge.summary.unsafeItems === 0 &&
        popularPromptApprovalBridge.summary.bridgeItems > 0 &&
        popularPromptApprovalBridge.summary.bridgeItemsReadyForHumanReviewPrep === popularPromptApprovalBridge.summary.bridgeItems &&
        popularPromptApprovalBridge.summary.commandBoundaries === popularPromptApprovalBridge.summary.bridgeItems &&
        popularPromptApprovalBridge.summary.publishConfirmCommandsIncluded === 0 &&
        popularPromptApprovalBridge.summary.uniqueFiles > 0 &&
        popularPromptApprovalBridge.summary.promptTemplatesReferenced >= popularPromptApprovalBridge.summary.bridgeItems * 5 &&
        popularPromptApprovalBridge.summary.searchQueriesReferenced >= 50 &&
        Boolean(
          popularPromptApprovalBridge.topItems?.every(
            (item) =>
              item.readyForHumanReviewPrep === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              item.articleState?.status === "draft" &&
              item.articleState?.noindex === true &&
              item.articleState?.humanReviewRequired === true &&
              item.articleState?.sourceNotes === true &&
              (item.articleState?.qualityScore || 0) >= 100 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              (item.sourceTargets?.length || 0) > 0 &&
              (item.searchQueries?.length || 0) >= 5 &&
              (item.promptTemplates || 0) >= 5,
          ),
        ),
      detail: `items=${popularPromptApprovalBridge.summary.bridgeItems}, ready=${popularPromptApprovalBridge.summary.bridgeItemsReadyForHumanReviewPrep}, templates=${popularPromptApprovalBridge.summary.promptTemplatesReferenced}, uniqueFiles=${popularPromptApprovalBridge.summary.uniqueFiles}, publishConfirm=${popularPromptApprovalBridge.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "popular prompt sprint board covers every broad prompt lane",
      ok:
        popularPromptSprintBoard.guardrails.autoCreateArticles === false &&
        popularPromptSprintBoard.guardrails.autoEditArticles === false &&
        popularPromptSprintBoard.guardrails.autoMarkReview === false &&
        popularPromptSprintBoard.guardrails.autoPublish === false &&
        popularPromptSprintBoard.guardrails.trafficClaim === "not-included" &&
        popularPromptSprintBoard.summary.items === popularAiPromptPlaybook.summary.items &&
        popularPromptSprintBoard.summary.playbookItems === popularAiPromptPlaybook.summary.items &&
        popularPromptSprintBoard.summary.promptTemplates === popularAiPromptPlaybook.summary.promptTemplates &&
        popularPromptSprintBoard.summary.bridgeItems === popularPromptApprovalBridge.summary.bridgeItems &&
        popularPromptSprintBoard.summary.searchQueries >= 100 &&
        popularPromptSprintBoard.summary.industryBuckets >= 3 &&
        popularPromptSprintBoard.summary.waves >= 5 &&
        popularPromptSprintBoard.summary.trafficDataAvailable === false,
      detail: `items=${popularPromptSprintBoard.summary.items}, queries=${popularPromptSprintBoard.summary.searchQueries}, buckets=${popularPromptSprintBoard.summary.industryBuckets}, waves=${popularPromptSprintBoard.summary.waves}`,
    },
    {
      name: "popular prompt sprint board keeps prompt expansion manual and publish-safe",
      ok:
        popularPromptSprintBoard.summary.unsafeItems === 0 &&
        (popularPromptSprintBoard.unsafeItems?.length || 0) === 0 &&
        popularPromptSprintBoard.summary.publishConfirmCommandsIncluded === 0 &&
        popularPromptSprintBoard.summary.lanesReadyForPromptSprint === popularPromptSprintBoard.summary.items &&
        popularPromptSprintBoard.summary.actionItems >= popularPromptSprintBoard.summary.items * 7 &&
        popularPromptSprintBoard.summary.nextCandidateFiles > 0 &&
        popularPromptSprintBoard.summary.promptTemplateSamples >= popularPromptSprintBoard.summary.items * 5 &&
        Boolean(
          popularPromptSprintBoard.items?.every(
            (item) =>
              item.readyForPromptSprint === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.reviewActions?.length || item.actionCount || 0) >= 7 &&
              (item.searchQueries?.length || 0) >= 5 &&
              (item.sourceTargets?.length || 0) >= 3 &&
              (item.promptTemplateSamples?.length || 0) >= 5 &&
              ((item.nextCandidateFiles?.length || 0) > 0 || (item.alreadyQueuedFiles?.length || 0) > 0) &&
              item.publishConfirm === "not-included",
          ),
        ) &&
        Boolean(popularPromptSprintBoard.waves?.every((wave) => wave.readyItems === wave.items && (wave.unsafeItems || 0) === 0 && (wave.actionItems || 0) >= (wave.items || 0) * 7)),
      detail: `ready=${popularPromptSprintBoard.summary.lanesReadyForPromptSprint}, actions=${popularPromptSprintBoard.summary.actionItems}, nextFiles=${popularPromptSprintBoard.summary.nextCandidateFiles}, publishConfirm=${popularPromptSprintBoard.summary.publishConfirmCommandsIncluded}`,
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
        publicCoverageGapPreflight.summary.items >= publicCoverageGapPlan.summary.items &&
        publicCoverageGapPreflight.summary.planItems === publicCoverageGapPlan.summary.items &&
        publicCoverageGapPreflight.summary.broadFirstCoverageItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        publicCoverageGapPreflight.summary.broadFirstCoveragePreflightItems === broadFirstCoverageLaunchPack.summary.clustersSelected &&
        publicCoverageGapPreflight.summary.uniqueFiles === publicCoverageGapPreflight.summary.items,
      detail: `items=${publicCoverageGapPreflight.summary.items}, planItems=${publicCoverageGapPreflight.summary.planItems}, broadFirst=${publicCoverageGapPreflight.summary.broadFirstCoveragePreflightItems}, uniqueFiles=${publicCoverageGapPreflight.summary.uniqueFiles}`,
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
        (reviewCannibalizationBrief.summary.highRiskPublishedItems || 0) === 0 &&
        Boolean(
          reviewCannibalizationBrief.items?.every(
            (item) =>
              Boolean(item.candidate?.file) &&
              Boolean(item.recommendation) &&
              (item.humanReviewChecklist?.length || 0) >= 5 &&
              (item.publishedSimilar?.length || 0) <= 5 &&
              (item.reviewSimilar?.length || 0) <= 5 &&
              (item.riskLevel !== "high" || (item.publishedSimilar?.length || 0) === 0),
          ),
        ),
      detail: `highRisk=${reviewCannibalizationBrief.summary.highRiskItems}, highPublished=${reviewCannibalizationBrief.summary.highRiskPublishedItems || 0}, highReviewOnly=${reviewCannibalizationBrief.summary.highRiskReviewOnlyItems || 0}, mediumRisk=${reviewCannibalizationBrief.summary.mediumRiskItems}, publishedComparisons=${reviewCannibalizationBrief.summary.itemsWithPublishedComparison}, reviewComparisons=${reviewCannibalizationBrief.summary.itemsWithReviewComparison}`,
    },
    {
      name: "review collision decision pack is read-only and covers high-risk overlaps",
      ok:
        reviewCollisionDecisionPack.guardrails.autoEditArticles === false &&
        reviewCollisionDecisionPack.guardrails.autoMarkReview === false &&
        reviewCollisionDecisionPack.guardrails.autoPublish === false &&
        reviewCollisionDecisionPack.guardrails.trafficClaim === "not-included" &&
        reviewCollisionDecisionPack.summary.decisionItems === reviewCannibalizationBrief.summary.highRiskItems &&
        reviewCollisionDecisionPack.summary.highRiskItems === reviewCannibalizationBrief.summary.highRiskItems &&
        reviewCollisionDecisionPack.summary.blockingItems === 0 &&
        reviewCollisionDecisionPack.summary.unsafeItems === 0,
      detail: `decisionItems=${reviewCollisionDecisionPack.summary.decisionItems}, highRisk=${reviewCollisionDecisionPack.summary.highRiskItems}, blocking=${reviewCollisionDecisionPack.summary.blockingItems}, unsafe=${reviewCollisionDecisionPack.summary.unsafeItems}`,
    },
    {
      name: "review collision decision pack keeps collision approvals human-gated",
      ok:
        reviewCollisionDecisionPack.summary.humanDecisionReadyItems === reviewCollisionDecisionPack.summary.decisionItems &&
        reviewCollisionDecisionPack.summary.itemsWithCommandBoundary === reviewCollisionDecisionPack.summary.decisionItems &&
        reviewCollisionDecisionPack.summary.publishedCollisionItems === 0 &&
        reviewCollisionDecisionPack.summary.reviewOnlyCollisionItems === reviewCollisionDecisionPack.summary.decisionItems &&
        reviewCollisionDecisionPack.summary.blockedQueueMatchedItems >= reviewCollisionDecisionPack.summary.decisionItems &&
        Boolean(
          reviewCollisionDecisionPack.items?.every(
            (item) =>
              item.humanDecisionReady === true &&
              (item.blockingIssues?.length || 0) === 0 &&
              (item.closest?.length || 0) > 0 &&
              (item.decisionOptions?.length || 0) >= 4 &&
              (item.manualNextActions?.length || 0) >= 5 &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              !item.commandBoundary?.publishDryRunAfterReview?.includes("--confirm") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.commandBoundary?.stopBefore?.includes("explicit"),
          ),
        ),
      detail: `ready=${reviewCollisionDecisionPack.summary.humanDecisionReadyItems}, commandBoundary=${reviewCollisionDecisionPack.summary.itemsWithCommandBoundary}, reviewOnly=${reviewCollisionDecisionPack.summary.reviewOnlyCollisionItems}, published=${reviewCollisionDecisionPack.summary.publishedCollisionItems}, blockedMatched=${reviewCollisionDecisionPack.summary.blockedQueueMatchedItems}`,
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
      name: "public surface inventory is read-only and matches public counts",
      ok:
        publicSurfaceInventory.guardrails.autoEditArticles === false &&
        publicSurfaceInventory.guardrails.autoMarkReview === false &&
        publicSurfaceInventory.guardrails.autoPublish === false &&
        publicSurfaceInventory.guardrails.trafficClaim === "not-included" &&
        publicSurfaceInventory.summary.publicArticles === projectStatus.articles.publicPublished &&
        publicSurfaceInventory.summary.projectPublicPublished === projectStatus.articles.publicPublished &&
        (publicSurfaceInventory.summary.livePublicCount === null || publicSurfaceInventory.summary.livePublicCount === liveSearch.articles.publicCount) &&
        (publicSurfaceInventory.summary.liveMissingFromSitemap === null || publicSurfaceInventory.summary.liveMissingFromSitemap === 0) &&
        publicSurfaceInventory.summary.publishedButNoindexed === 0 &&
        publicSurfaceInventory.summary.nonPublishedIndexable === 0 &&
        publicSurfaceInventory.summary.trafficDataAvailable === false &&
        publicSurfaceInventory.summary.unsafeItems === 0,
      detail: `public=${publicSurfaceInventory.summary.publicArticles}, live=${publicSurfaceInventory.summary.livePublicCount}, unsafe=${publicSurfaceInventory.summary.unsafeItems}`,
    },
    {
      name: "public surface inventory identifies broad AI public gaps with candidates",
      ok:
        publicSurfaceInventory.summary.broadClusters >= autopilotBroadAiDemandBrief.summary.clusters &&
        publicSurfaceInventory.summary.broadClustersWithoutPublicCoverage === autopilotBroadAiDemandBrief.summary.clustersWithoutPublicCoverage &&
        Boolean(
          publicSurfaceInventory.broadCoverage?.every(
            (cluster) =>
              (cluster.searchQueries?.length || 0) > 0 &&
              (cluster.publicMatches || 0) >= 0 &&
              ((cluster.publicMatches || 0) > 0 || ((cluster.readyCandidates || 0) > 0 && (cluster.suggestedFiles?.length || 0) > 0)),
          ),
        ),
      detail: `clusters=${publicSurfaceInventory.summary.broadClusters}, zeroPublic=${publicSurfaceInventory.summary.broadClustersWithoutPublicCoverage}`,
    },
    {
      name: "public search refresh pack is read-only and covers all public pages",
      ok:
        publicSearchRefreshPack.guardrails.autoEditArticles === false &&
        publicSearchRefreshPack.guardrails.autoMarkReview === false &&
        publicSearchRefreshPack.guardrails.autoPublish === false &&
        publicSearchRefreshPack.guardrails.trafficClaim === "not-included" &&
        publicSearchRefreshPack.summary.items === publicSurfaceInventory.summary.publicArticles &&
        publicSearchRefreshPack.summary.publicArticles === publicSurfaceInventory.summary.publicArticles &&
        publicSearchRefreshPack.summary.liveMissingFromSitemap === publicSurfaceInventory.summary.liveMissingFromSitemap &&
        publicSearchRefreshPack.summary.publishedButNoindexed === publicSurfaceInventory.summary.publishedButNoindexed &&
        publicSearchRefreshPack.summary.seoWarningItems === seoWarningRemediation.summary.publicItems &&
        publicSearchRefreshPack.summary.measuredTrafficSources === trafficEvidence.summary.measuredTrafficSources &&
        publicSearchRefreshPack.summary.trafficDataAvailable === false,
      detail: `items=${publicSearchRefreshPack.summary.items}, public=${publicSearchRefreshPack.summary.publicArticles}, seo=${publicSearchRefreshPack.summary.seoWarningItems}, measuredTraffic=${publicSearchRefreshPack.summary.measuredTrafficSources}`,
    },
    {
      name: "public search refresh pack keeps public edits human-gated and action-ready",
      ok:
        publicSearchRefreshPack.summary.unsafeItems === 0 &&
        (publicSearchRefreshPack.unsafeItems?.length || 0) === 0 &&
        publicSearchRefreshPack.summary.itemsReadyForHumanRefreshReview === publicSearchRefreshPack.summary.items &&
        publicSearchRefreshPack.summary.actionItems >= publicSearchRefreshPack.summary.items * 5 &&
        publicSearchRefreshPack.summary.publishConfirmCommandsIncluded === 0 &&
        publicSearchRefreshPack.summary.highPriorityItems > 0 &&
        publicSearchRefreshPack.summary.shortDescriptionItems > 0 &&
        Boolean(
          publicSearchRefreshPack.topItems?.every(
            (item) =>
              item.readyForHumanRefreshReview === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.actionCount || 0) >= 5 &&
              item.commandBoundary?.editAfterHumanApproval === "manual-only" &&
              item.commandBoundary?.markReview === "not-applicable-public-page" &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              item.trafficClaim === "not-included",
          ),
        ),
      detail: `ready=${publicSearchRefreshPack.summary.itemsReadyForHumanRefreshReview}, actions=${publicSearchRefreshPack.summary.actionItems}, highPriority=${publicSearchRefreshPack.summary.highPriorityItems}, shortDescriptions=${publicSearchRefreshPack.summary.shortDescriptionItems}, publishConfirm=${publicSearchRefreshPack.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "public refresh sprint board covers public refresh pack",
      ok:
        publicRefreshSprintBoard.guardrails.autoEditArticles === false &&
        publicRefreshSprintBoard.guardrails.autoMarkReview === false &&
        publicRefreshSprintBoard.guardrails.autoPublish === false &&
        publicRefreshSprintBoard.guardrails.trafficClaim === "not-included" &&
        publicRefreshSprintBoard.summary.items === publicSearchRefreshPack.summary.items &&
        publicRefreshSprintBoard.summary.publicArticles === publicSearchRefreshPack.summary.publicArticles &&
        publicRefreshSprintBoard.summary.itemsReadyForPublicRefreshSprint === publicSearchRefreshPack.summary.itemsReadyForHumanRefreshReview &&
        publicRefreshSprintBoard.summary.mojibakePublicItems === mojibakeRemediation.summary.affectedPublicFiles &&
        publicRefreshSprintBoard.summary.seoWarningItems === publicSearchRefreshPack.summary.seoWarningItems &&
        publicRefreshSprintBoard.summary.shortDescriptionItems === publicSearchRefreshPack.summary.shortDescriptionItems &&
        publicRefreshSprintBoard.summary.cannibalizationItems === publicSearchRefreshPack.summary.cannibalizationItems &&
        publicRefreshSprintBoard.summary.liveMissingFromSitemap === publicSearchRefreshPack.summary.liveMissingFromSitemap &&
        publicRefreshSprintBoard.summary.publishedButNoindexed === publicSearchRefreshPack.summary.publishedButNoindexed &&
        publicRefreshSprintBoard.summary.trafficDataAvailable === false &&
        publicRefreshSprintBoard.summary.waves >= 5,
      detail: `items=${publicRefreshSprintBoard.summary.items}, public=${publicRefreshSprintBoard.summary.publicArticles}, waves=${publicRefreshSprintBoard.summary.waves}, mojibakePublic=${publicRefreshSprintBoard.summary.mojibakePublicItems}, seo=${publicRefreshSprintBoard.summary.seoWarningItems}, shortDescriptions=${publicRefreshSprintBoard.summary.shortDescriptionItems}`,
    },
    {
      name: "public refresh sprint board keeps public edits manual and publish-confirm-free",
      ok:
        publicRefreshSprintBoard.summary.unsafeItems === 0 &&
        (publicRefreshSprintBoard.unsafeItems?.length || 0) === 0 &&
        publicRefreshSprintBoard.summary.publishConfirmCommandsIncluded === 0 &&
        publicRefreshSprintBoard.summary.actionItems >= publicRefreshSprintBoard.summary.items * 5 &&
        Boolean(
          publicRefreshSprintBoard.items?.every(
            (item) =>
              item.readyForPublicRefreshSprint === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.refreshActions?.length || item.actionCount || 0) >= 5 &&
              item.publishConfirm === "not-included" &&
              (!item.refreshReasons?.includes("mojibake-public") ||
                Boolean(item.refreshActions?.some((action) => typeof action === "string" && action.includes("garbled public copy")))),
          ),
        ) &&
        Boolean(publicRefreshSprintBoard.waves?.every((wave) => wave.readyItems === wave.items && (wave.unsafeItems || 0) === 0 && (wave.actionItems || 0) >= (wave.items || 0) * 5)),
      detail: `ready=${publicRefreshSprintBoard.summary.itemsReadyForPublicRefreshSprint}, actions=${publicRefreshSprintBoard.summary.actionItems}, unsafe=${publicRefreshSprintBoard.summary.unsafeItems}, publishConfirm=${publicRefreshSprintBoard.summary.publishConfirmCommandsIncluded}`,
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
    {
      name: "manual review workbench includes SEO warning remediation",
      ok:
        workbench.seoWarningRemediation?.summary?.items === seoWarningRemediation.summary.items &&
        workbench.seoWarningRemediation.summary.humanGatedItems === seoWarningRemediation.summary.humanGatedItems &&
        workbench.seoWarningRemediation.summary.publicItems === seoWarningRemediation.summary.publicItems &&
        workbench.seoWarningRemediation.summary.draftItems === seoWarningRemediation.summary.draftItems &&
        workbench.seoWarningRemediation.summary.unsafeItems === 0 &&
        (workbench.seoWarningRemediation.topItems?.length || 0) > 0,
      detail: `workbenchSeo=${workbench.seoWarningRemediation?.summary?.items ?? "missing"}, remediation=${seoWarningRemediation.summary.items}, unsafe=${workbench.seoWarningRemediation?.summary?.unsafeItems ?? "missing"}`,
    },
    {
      name: "next batch approval route matches manual review workbench",
      ok:
        nextBatchApprovalRoute.guardrails.autoEditArticles === false &&
        nextBatchApprovalRoute.guardrails.autoMarkReview === false &&
        nextBatchApprovalRoute.guardrails.autoPublish === false &&
        nextBatchApprovalRoute.guardrails.trafficClaim === "not-included" &&
        nextBatchApprovalRoute.nextBatch?.batch === workbench.reviewPlan.nextBatch?.batch &&
        nextBatchApprovalRoute.nextBatch?.candidates === (workbench.reviewPlan.nextBatch?.candidates.length || 0) &&
        nextBatchApprovalRoute.summary.batchItems === (workbench.reviewPlan.nextBatch?.candidates.length || 0) &&
        nextBatchApprovalRoute.summary.plannedBatchCandidates === nextBatchApprovalRoute.summary.batchItems &&
        nextBatchApprovalRoute.summary.currentPublicPublished === workbench.publishingBoundary.publicPublished &&
        nextBatchApprovalRoute.summary.currentPublishableNow === workbench.publishingBoundary.publishableNow &&
        nextBatchApprovalRoute.publishingBoundary.currentPublicPublished === projectStatus.articles.publicPublished &&
        nextBatchApprovalRoute.publishingBoundary.currentPublishableNow === 0 &&
        nextBatchApprovalRoute.summary.trafficDataAvailable === false,
      detail: `batch=${nextBatchApprovalRoute.nextBatch?.batch ?? "missing"}, items=${nextBatchApprovalRoute.summary.batchItems}, workbenchItems=${workbench.reviewPlan.nextBatch?.candidates.length || 0}, public=${nextBatchApprovalRoute.summary.currentPublicPublished}, publishable=${nextBatchApprovalRoute.summary.currentPublishableNow}`,
    },
    {
      name: "next batch approval route is human-gated and action-ready",
      ok:
        nextBatchApprovalRoute.summary.unsafeItems === 0 &&
        (nextBatchApprovalRoute.unsafeItems?.length || 0) === 0 &&
        nextBatchApprovalRoute.summary.itemsReadyForHumanRouteReview === nextBatchApprovalRoute.summary.batchItems &&
        nextBatchApprovalRoute.summary.commandBoundaries === nextBatchApprovalRoute.summary.batchItems &&
        nextBatchApprovalRoute.summary.sourcePackMatchedItems === nextBatchApprovalRoute.summary.batchItems &&
        nextBatchApprovalRoute.summary.queryCoverageMatchedItems === nextBatchApprovalRoute.summary.batchItems &&
        nextBatchApprovalRoute.summary.actionItems >= nextBatchApprovalRoute.summary.batchItems * 8 &&
        nextBatchApprovalRoute.summary.publishConfirmCommandsIncluded === 0 &&
        nextBatchApprovalRoute.publishingBoundary.publishConfirmCommandsIncluded === 0 &&
        Boolean(
          nextBatchApprovalRoute.items?.every(
            (item) =>
              item.readyForHumanRouteReview === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.actions?.length || 0) >= 8 &&
              item.commandBoundary?.dryRunMarkReview?.includes("mark:review") &&
              !item.commandBoundary?.dryRunMarkReview?.includes("--confirm-human") &&
              item.commandBoundary?.markReviewAfterHumanApproval?.includes("--confirm-human") &&
              item.commandBoundary?.publishConfirm === "not-included" &&
              !item.commandBoundary?.publishDryRun?.includes("--confirm") &&
              Boolean(item.sourcePack) &&
              Boolean(item.queryCoverage),
          ),
        ),
      detail: `ready=${nextBatchApprovalRoute.summary.itemsReadyForHumanRouteReview}, actions=${nextBatchApprovalRoute.summary.actionItems}, sourcePack=${nextBatchApprovalRoute.summary.sourcePackMatchedItems}, queryCoverage=${nextBatchApprovalRoute.summary.queryCoverageMatchedItems}, warnings=${nextBatchApprovalRoute.summary.routeWarnings}, publishConfirm=${nextBatchApprovalRoute.summary.publishConfirmCommandsIncluded}`,
    },
    {
      name: "next batch route remediation pack covers route warnings",
      ok:
        nextBatchRouteRemediationPack.guardrails.autoEditArticles === false &&
        nextBatchRouteRemediationPack.guardrails.autoMarkReview === false &&
        nextBatchRouteRemediationPack.guardrails.autoPublish === false &&
        nextBatchRouteRemediationPack.guardrails.trafficClaim === "not-included" &&
        nextBatchRouteRemediationPack.nextBatch?.batch === nextBatchApprovalRoute.nextBatch?.batch &&
        nextBatchRouteRemediationPack.summary.batchItems === nextBatchApprovalRoute.summary.batchItems &&
        nextBatchRouteRemediationPack.summary.routeWarnings === nextBatchApprovalRoute.summary.routeWarnings &&
        nextBatchRouteRemediationPack.summary.warningItems > 0 &&
        nextBatchRouteRemediationPack.summary.actionItems >= nextBatchRouteRemediationPack.summary.warningItems * 8 &&
        nextBatchRouteRemediationPack.publishingBoundary.currentPublicPublished === nextBatchApprovalRoute.publishingBoundary.currentPublicPublished &&
        nextBatchRouteRemediationPack.publishingBoundary.currentPublishableNow === nextBatchApprovalRoute.publishingBoundary.currentPublishableNow &&
        nextBatchRouteRemediationPack.summary.trafficDataAvailable === false,
      detail: `batch=${nextBatchRouteRemediationPack.nextBatch?.batch ?? "missing"}, items=${nextBatchRouteRemediationPack.summary.batchItems}, warningItems=${nextBatchRouteRemediationPack.summary.warningItems}, routeWarnings=${nextBatchRouteRemediationPack.summary.routeWarnings}, actions=${nextBatchRouteRemediationPack.summary.actionItems}`,
    },
    {
      name: "next batch route remediation pack stays safe and publish-confirm-free",
      ok:
        nextBatchRouteRemediationPack.summary.unsafeItems === 0 &&
        (nextBatchRouteRemediationPack.unsafeItems?.length || 0) === 0 &&
        nextBatchRouteRemediationPack.summary.itemsReadyForRemediationReview === nextBatchRouteRemediationPack.summary.batchItems &&
        nextBatchRouteRemediationPack.summary.publishConfirmCommandsIncluded === 0 &&
        nextBatchRouteRemediationPack.publishingBoundary.publishConfirmCommandsIncluded === 0 &&
        Boolean(
          nextBatchRouteRemediationPack.items?.every(
            (item) =>
              item.readyForRemediationReview === true &&
              (item.unsafeReasons?.length || 0) === 0 &&
              (item.manualRemediationActions?.length || item.actionCount || 0) >= 8 &&
              item.publishConfirm === "not-included",
          ),
        ),
      detail: `ready=${nextBatchRouteRemediationPack.summary.itemsReadyForRemediationReview}, unsafe=${nextBatchRouteRemediationPack.summary.unsafeItems}, publishConfirm=${nextBatchRouteRemediationPack.summary.publishConfirmCommandsIncluded}, clearanceGaps=${nextBatchRouteRemediationPack.summary.clearanceGapItems}, copydeskGaps=${nextBatchRouteRemediationPack.summary.copydeskGapItems}, queryWarnings=${nextBatchRouteRemediationPack.summary.queryWarningItems}, seoWarnings=${nextBatchRouteRemediationPack.summary.seoWarningItems}`,
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

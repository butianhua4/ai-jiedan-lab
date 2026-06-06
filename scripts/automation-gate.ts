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
      name: "content cannibalization check generated warning report",
      ok: cannibalization.guardrails.autoPublish === false && cannibalization.summary.articleCount > 0,
      detail: `conflicts=${cannibalization.summary.conflicts}, reviewBatchConflicts=${cannibalization.summary.reviewBatchConflicts}`,
    },
    {
      name: "content freshness check covers review items",
      ok: freshness.guardrails.autoPublish === false && freshness.summary.articlesChecked > 0 && freshness.summary.currentReviewItems > 0,
      detail: `highRisk=${freshness.summary.highRisk}, currentReviewItems=${freshness.summary.currentReviewItems}, plannedReviewItems=${freshness.summary.plannedReviewItems}`,
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

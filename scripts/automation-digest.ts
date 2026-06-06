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
  if (!reports.reviewCoverage.data || reports.reviewCoverage.data.summary.missingCoverage > 0) {
    return ["Open docs/review-coverage-report.md and regenerate coverage for all planned review candidates."];
  }
  return [
    "Manually review the three recommended drafts in docs/review-preflight.md.",
    "Use docs/wave-approval-packet.md as the focused Wave 1 approval packet.",
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
    `- Missing reports: ${data.health.missingReports.length ? data.health.missingReports.join(", ") : "none"}`,
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

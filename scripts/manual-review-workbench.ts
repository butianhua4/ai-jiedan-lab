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
    nextActions: buildNextActions(projectStatus, liveSearch, cannibalization, publishPack.items.length),
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "manual-review-workbench.json");
  const mdTarget = path.join(process.cwd(), "docs", "manual-review-workbench.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, json: rel(jsonTarget), markdown: rel(mdTarget), nextBatch: payload.reviewPlan.nextBatch?.topic || null }, null, 2));
}

function buildNextActions(projectStatus: ProjectStatus, liveSearch: LiveSearch, cannibalization: Cannibalization, currentItemsCovered: number) {
  if (projectStatus.articles.publishableNow.length > 0) return ["Stop and inspect publishableNow before adding more review candidates."];
  if (!liveSearch.ok || liveSearch.failedChecks.length > 0) return ["Fix live search surface failures before any publishing action."];
  if (cannibalization.summary.reviewBatchConflicts > 0) return ["Resolve review batch cannibalization conflicts before marking review."];
  if (currentItemsCovered === 0) return ["Regenerate publish readiness pack before human review."];
  return [
    "Review the current publish readiness items in docs/publish-readiness-pack.md.",
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

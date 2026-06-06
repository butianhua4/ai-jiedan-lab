import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type ReviewCandidate = {
  category: string;
  cluster: string;
  dryRunCommand: string;
  file: string;
  opportunityReason: string;
  opportunityScore: number;
  publishBatch: number | null;
  qualityScore: number;
  reviewCommand: string;
  title: string;
};

type ContentOpportunity = {
  gapScore: number;
  readyCandidates: Array<{ file: string; title: string }>;
  reviewFocus: string[];
  searchQueries: string[];
  topic: string;
  why: string;
};

type PlannedCandidate = {
  category: string;
  cluster: string;
  dryRunCommand: string;
  file: string;
  opportunityReason: string;
  opportunityScore: number;
  publishBatch: number | null;
  qualityScore: number;
  reviewCommandAfterHumanApproval: string;
  title: string;
};

type PlannedBatch = {
  batch: number;
  candidates: PlannedCandidate[];
  decisionRule: string;
  reviewFocus: string[];
  searchQueries: string[];
  topic: string;
  why: string;
};

const maxBatches = 3;
const maxCandidatesPerBatch = 3;

function main() {
  const review = readJson<{ candidates: ReviewCandidate[]; recommendedToday: ReviewCandidate[] }>("content/automation/review-candidates.json");
  const backlog = readJson<{ opportunities: ContentOpportunity[] }>("content/automation/content-opportunity-backlog.json");
  const usedFiles = new Set<string>();
  const batches = backlog.opportunities.slice(0, maxBatches).map((opportunity, index) => {
    const candidates = pickCandidates(opportunity, review.candidates, usedFiles);
    return {
      batch: index + 1,
      candidates,
      decisionRule: "A human reviewer must approve facts, risk language, source freshness, and search-intent fit before any mark:review command is run.",
      reviewFocus: opportunity.reviewFocus,
      searchQueries: opportunity.searchQueries,
      topic: opportunity.topic,
      why: opportunity.why,
    };
  });

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This plan only organizes manual review work. It does not change article status, noindex, or publishing state.",
      stopBefore: "Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.",
    },
    totals: {
      plannedBatches: batches.length,
      plannedCandidates: batches.reduce((total, batch) => total + batch.candidates.length, 0),
      sourceReviewCandidates: review.candidates.length,
      sourceOpportunities: backlog.opportunities.length,
    },
    batches,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-batch-plan.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-batch-plan.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, batches: batches.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function pickCandidates(opportunity: ContentOpportunity, candidates: ReviewCandidate[], usedFiles: Set<string>) {
  const opportunityFiles = new Set(opportunity.readyCandidates.map((candidate) => candidate.file));
  const direct = candidates.filter((candidate) => opportunityFiles.has(candidate.file));
  const topicTerms = searchableTerms(opportunity);
  const fallback = candidates.filter((candidate) => topicTerms.some((term) => searchableText(candidate).includes(term)));
  const selected = [...direct, ...fallback]
    .filter((candidate, index, items) => items.findIndex((item) => item.file === candidate.file) === index)
    .filter((candidate) => !usedFiles.has(candidate.file))
    .sort(compareCandidate)
    .slice(0, maxCandidatesPerBatch)
    .map((candidate) => {
      usedFiles.add(candidate.file);
      return {
        category: candidate.category,
        cluster: candidate.cluster,
        dryRunCommand: candidate.dryRunCommand,
        file: candidate.file,
        opportunityReason: candidate.opportunityReason,
        opportunityScore: candidate.opportunityScore,
        publishBatch: candidate.publishBatch,
        qualityScore: candidate.qualityScore,
        reviewCommandAfterHumanApproval: candidate.reviewCommand,
        title: candidate.title,
      };
    });

  return selected;
}

function compareCandidate(a: ReviewCandidate, b: ReviewCandidate) {
  if (b.opportunityScore !== a.opportunityScore) return b.opportunityScore - a.opportunityScore;
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  return a.file.localeCompare(b.file);
}

function searchableText(candidate: ReviewCandidate) {
  return `${candidate.title} ${candidate.category} ${candidate.cluster} ${candidate.file}`.toLowerCase();
}

function searchableTerms(opportunity: ContentOpportunity) {
  return [opportunity.topic, ...opportunity.searchQueries]
    .join(" ")
    .toLowerCase()
    .split(/[\s,，、:：/]+/)
    .filter((term) => term.length >= 3);
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  totals: { plannedBatches: number; plannedCandidates: number; sourceOpportunities: number; sourceReviewCandidates: number };
  batches: PlannedBatch[];
}) {
  const lines = [
    "# Review Batch Plan",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This is a manual review plan. It does not publish articles or change article status.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    "",
    "## Totals",
    "",
    `- Planned batches: ${payload.totals.plannedBatches}`,
    `- Planned candidates: ${payload.totals.plannedCandidates}`,
    `- Source review candidates: ${payload.totals.sourceReviewCandidates}`,
    `- Source opportunities: ${payload.totals.sourceOpportunities}`,
    "",
  ];

  for (const batch of payload.batches) {
    lines.push(
      `## Batch ${batch.batch}: ${batch.topic}`,
      "",
      `- Why: ${batch.why}`,
      `- Decision rule: ${batch.decisionRule}`,
      "",
      "Search queries to verify:",
      "",
      ...batch.searchQueries.map((query) => `- ${query}`),
      "",
      "Review focus:",
      "",
      ...batch.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "| # | Opportunity | Score | Batch | Cluster | Category | Title | File |",
      "| --- | --- | --- | --- | --- | --- | --- | --- |",
      ...batch.candidates.map((candidate, index) => (
        `| ${index + 1} | ${candidate.opportunityScore} | ${candidate.qualityScore} | ${candidate.publishBatch ?? ""} | ${candidate.cluster} | ${candidate.category} | ${candidate.title} | ${candidate.file} |`
      )),
      "",
      "Dry-run commands:",
      "",
      "```bash",
      ...batch.candidates.map((candidate) => candidate.dryRunCommand),
      "```",
      "",
      "After explicit human approval only:",
      "",
      "```bash",
      ...batch.candidates.map((candidate) => candidate.reviewCommandAfterHumanApproval),
      "```",
      "",
    );
  }

  return lines.join("\n");
}

main();

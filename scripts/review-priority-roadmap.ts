import fs from "fs";
import path from "path";
import { readArticle, rel } from "./content-utils";

type Candidate = {
  category?: string;
  file: string;
  primaryKeyword?: string;
  publishBatch?: number | null;
  qualityScore?: number;
  searchIntent?: string;
  title: string;
};

type CoverageTopic = {
  candidates: Candidate[];
  draftMatches: number;
  gapScore: number;
  publicMatches: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  topic?: string;
  industry?: string;
  workflowAngles: string[];
};

type ContentOpportunity = {
  gapScore: number;
  readyCandidates: Candidate[];
  reviewFocus: string[];
  searchQueries: string[];
  topic: string;
  why: string;
};

type LaneCandidate = Candidate & {
  currentPack: boolean;
  plannedBatch: boolean;
  safeDraft: boolean;
};

type RoadmapLane = {
  candidates: LaneCandidate[];
  currentPackCandidates: number;
  draftMatches: number;
  lane: string;
  missingPublicCoverage: boolean;
  plannedBatchCandidates: number;
  priorityScore: number;
  publicMatches: number;
  rationale: string;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  workflowAngles: string[];
};

function main() {
  const deployment = readJson<{ coverage: CoverageTopic[] }>("content/automation/ai-deployment-coverage.json");
  const prompts = readJson<{ coverage: CoverageTopic[] }>("content/automation/industry-prompt-coverage.json");
  const backlog = readJson<{ opportunities: ContentOpportunity[] }>("content/automation/content-opportunity-backlog.json");
  const currentPackFiles = loadFileSet("content/automation/publish-readiness-pack.json", (payload) => asArray(payload.items));
  const plannedFiles = loadFileSet("content/automation/review-batch-plan.json", (payload) =>
    asArray(payload.batches).flatMap((batch) => (hasCandidates(batch) ? asArray(batch.candidates) : [])),
  );

  const lanes = [
    ...deployment.coverage.map((item) => toLane("deployment", item, currentPackFiles, plannedFiles)),
    ...prompts.coverage.map((item) => toLane("industry-prompt", item, currentPackFiles, plannedFiles)),
    ...backlog.opportunities.map((item) => opportunityToLane(item, currentPackFiles, plannedFiles)),
  ]
    .filter((lane) => lane.candidates.length > 0)
    .sort(compareLane);

  const selected = selectDiverseLanes(lanes, 12);
  const nextReviewFiles = [...new Set(selected.flatMap((lane) => lane.candidates.slice(0, 3).map((candidate) => candidate.file)))];
  const unsafeCandidates = selected.flatMap((lane) => lane.candidates.filter((candidate) => !candidate.safeDraft));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This roadmap prioritizes manual review work only. It does not change article status, noindex, or publishing state.",
      stopBefore: "Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.",
    },
    summary: {
      currentPackCandidates: selected.reduce((total, lane) => total + lane.currentPackCandidates, 0),
      lanes: selected.length,
      plannedBatchCandidates: selected.reduce((total, lane) => total + lane.plannedBatchCandidates, 0),
      sourceLanes: lanes.length,
      topicsWithoutPublicCoverage: selected.filter((lane) => lane.missingPublicCoverage).length,
      uniqueNextReviewFiles: nextReviewFiles.length,
      unsafeCandidates: unsafeCandidates.length,
    },
    nextReviewFiles,
    lanes: selected,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-priority-roadmap.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-priority-roadmap.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, lanes: selected.length, nextReviewFiles: nextReviewFiles.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function toLane(source: string, item: CoverageTopic, currentPackFiles: Set<string>, plannedFiles: Set<string>): RoadmapLane {
  const laneName = item.topic || item.industry || "Untitled lane";
  const candidates = item.candidates.slice(0, 5).map((candidate) => enrichCandidate(candidate, currentPackFiles, plannedFiles));
  const missingPublicCoverage = item.publicMatches === 0;
  const currentPackCandidates = candidates.filter((candidate) => candidate.currentPack).length;
  const plannedBatchCandidates = candidates.filter((candidate) => candidate.plannedBatch).length;
  const priorityScore =
    item.gapScore +
    (missingPublicCoverage ? 40 : 0) +
    candidates.length * 8 +
    plannedBatchCandidates * 6 +
    currentPackCandidates * 10;

  return {
    candidates,
    currentPackCandidates,
    draftMatches: item.draftMatches,
    lane: `${source}: ${laneName}`,
    missingPublicCoverage,
    plannedBatchCandidates,
    priorityScore,
    publicMatches: item.publicMatches,
    rationale: missingPublicCoverage
      ? "High search-intent lane with ready drafts but no public coverage yet."
      : "High search-intent lane that can expand existing public coverage.",
    reviewFocus: item.reviewFocus,
    searchQueries: item.searchQueries,
    sourceTargets: item.sourceTargets,
    workflowAngles: item.workflowAngles,
  };
}

function opportunityToLane(item: ContentOpportunity, currentPackFiles: Set<string>, plannedFiles: Set<string>): RoadmapLane {
  const candidates = item.readyCandidates.slice(0, 5).map((candidate) => enrichCandidate(candidate, currentPackFiles, plannedFiles));
  const priorityScore = item.gapScore + candidates.length * 8 + candidates.filter((candidate) => candidate.plannedBatch).length * 6;

  return {
    candidates,
    currentPackCandidates: candidates.filter((candidate) => candidate.currentPack).length,
    draftMatches: item.readyCandidates.length,
    lane: `content-backlog: ${item.topic}`,
    missingPublicCoverage: false,
    plannedBatchCandidates: candidates.filter((candidate) => candidate.plannedBatch).length,
    priorityScore,
    publicMatches: 0,
    rationale: item.why,
    reviewFocus: item.reviewFocus,
    searchQueries: item.searchQueries,
    sourceTargets: [
      "OpenAI API docs: https://platform.openai.com/docs",
      "OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering",
      "Vercel AI SDK docs: https://ai-sdk.dev/docs",
    ],
    workflowAngles: ["search intent", "fact review", "risk language", "internal links"],
  };
}

function enrichCandidate(candidate: Candidate, currentPackFiles: Set<string>, plannedFiles: Set<string>): LaneCandidate {
  const article = readArticle(candidate.file);
  return {
    category: String(article.data.category || candidate.category || ""),
    currentPack: currentPackFiles.has(candidate.file),
    file: candidate.file,
    plannedBatch: plannedFiles.has(candidate.file),
    primaryKeyword: String(article.data.primaryKeyword || candidate.primaryKeyword || ""),
    publishBatch: typeof article.data.publishBatch === "number" ? article.data.publishBatch : candidate.publishBatch ?? null,
    qualityScore: candidate.qualityScore || 0,
    safeDraft: article.data.status === "draft" && article.data.noindex === true && article.data.humanReviewRequired === true,
    searchIntent: String(article.data.searchIntent || candidate.searchIntent || ""),
    title: String(article.data.title || candidate.title || ""),
  };
}

function selectDiverseLanes(lanes: RoadmapLane[], limit: number) {
  const selected: RoadmapLane[] = [];
  const seenPrefix = new Map<string, number>();

  for (const lane of lanes) {
    const prefix = lane.lane.split(":")[0];
    const count = seenPrefix.get(prefix) || 0;
    if (count >= 5) continue;
    selected.push(lane);
    seenPrefix.set(prefix, count + 1);
    if (selected.length >= limit) break;
  }

  return selected;
}

function compareLane(a: RoadmapLane, b: RoadmapLane) {
  if (b.priorityScore !== a.priorityScore) return b.priorityScore - a.priorityScore;
  if (b.candidates.length !== a.candidates.length) return b.candidates.length - a.candidates.length;
  return a.lane.localeCompare(b.lane);
}

function loadFileSet(relativePath: string, pickItems: (payload: Record<string, unknown>) => unknown[]) {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return new Set<string>();
  const payload = JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "")) as Record<string, unknown>;
  return new Set(
    pickItems(payload)
      .map((item) => (hasFile(item) ? item.file : ""))
      .filter((file): file is string => Boolean(file)),
  );
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function hasCandidates(value: unknown): value is { candidates?: unknown[] } {
  return typeof value === "object" && value !== null && "candidates" in value;
}

function hasFile(value: unknown): value is { file: string } {
  return typeof value === "object" && value !== null && "file" in value && typeof (value as { file?: unknown }).file === "string";
}

function asArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  lanes: RoadmapLane[];
  nextReviewFiles: string[];
  summary: Record<string, number>;
}) {
  const lines = [
    "# Review Priority Roadmap",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This roadmap is read-only. It prioritizes manual review work and does not publish or mark articles for review.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Next Review Files",
    "",
    ...payload.nextReviewFiles.map((file) => `- ${file}`),
    "",
    "## Priority Lanes",
    "",
    "| Lane | Score | Public | Drafts | Candidates | Current pack | Planned | Why |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.lanes.map((lane) => (
      `| ${lane.lane} | ${lane.priorityScore} | ${lane.publicMatches} | ${lane.draftMatches} | ${lane.candidates.length} | ${lane.currentPackCandidates} | ${lane.plannedBatchCandidates} | ${lane.rationale} |`
    )),
    "",
  ];

  for (const lane of payload.lanes) {
    lines.push(
      `## ${lane.lane}`,
      "",
      `- Priority score: ${lane.priorityScore}`,
      `- Public matches: ${lane.publicMatches}`,
      `- Missing public coverage: ${lane.missingPublicCoverage}`,
      `- Rationale: ${lane.rationale}`,
      "",
      "Search queries:",
      "",
      ...lane.searchQueries.map((query) => `- ${query}`),
      "",
      "Review focus:",
      "",
      ...lane.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "Source targets:",
      "",
      ...lane.sourceTargets.map((target) => `- ${target}`),
      "",
      "Workflow angles:",
      "",
      ...lane.workflowAngles.map((angle) => `- ${angle}`),
      "",
      "Candidates:",
      "",
      "| Batch | Safe draft | Current pack | Planned | Score | Category | Keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
      ...lane.candidates.map((candidate) => (
        `| ${candidate.publishBatch ?? ""} | ${candidate.safeDraft} | ${candidate.currentPack} | ${candidate.plannedBatch} | ${candidate.qualityScore ?? ""} | ${candidate.category ?? ""} | ${candidate.primaryKeyword ?? ""} | ${candidate.title} | ${candidate.file} |`
      )),
      "",
    );
  }

  return lines.join("\n");
}

main();

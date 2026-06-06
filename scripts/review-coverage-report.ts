import fs from "fs";
import path from "path";
import { chineseCount, readArticle, rel } from "./content-utils";

type PlannedCandidate = {
  category: string;
  cluster: string;
  file: string;
  opportunityReason: string;
  opportunityScore: number;
  publishBatch: number | null;
  qualityScore: number;
  title: string;
};

type PlannedBatch = {
  batch: number;
  candidates: PlannedCandidate[];
  reviewFocus: string[];
  searchQueries: string[];
  topic: string;
  why: string;
};

type ReviewBatchPlan = {
  batches: PlannedBatch[];
  guardrails: { autoMarkReview: boolean; autoPublish: boolean };
  totals: { plannedCandidates: number };
};

type PublishPack = {
  items: Array<{
    factCheckQueries?: string[];
    file: string;
    officialSourceTargets?: string[];
    riskReviewChecklist?: string[];
  }>;
};

type FreshnessReport = {
  plannedReviewItems?: Array<{ file: string; riskLevel: string; riskReasons: string[] }>;
};

type CannibalizationReport = {
  reviewBatchConflicts?: Array<{ files: string[]; groupKey: string; reason: string; reviewBatchOverlap: string[] }>;
};

type CoverageItem = {
  approvalChecklist: string[];
  batch: number;
  category: string;
  cluster: string;
  currentPackCovered: boolean;
  factCheckQueries: string[];
  file: string;
  freshnessRiskLevel: string;
  freshnessRiskReasons: string[];
  humanReviewRequired: boolean;
  internalLinks: number;
  noindex: boolean;
  officialSourceTargets: string[];
  opportunityReason: string;
  opportunityScore: number;
  primaryKeyword: string;
  qualityScore: number;
  reviewFocus: string[];
  riskReviewChecklist: string[];
  searchIntent: string;
  sourceNotesPresent: boolean;
  status: string;
  title: string;
  topic: string;
  wordCountChinese: number;
};

function main() {
  const reviewPlan = readJson<ReviewBatchPlan>("content/automation/review-batch-plan.json");
  const publishPack = readJson<PublishPack>("content/automation/publish-readiness-pack.json");
  const freshness = readOptionalJson<FreshnessReport>("content/automation/content-freshness.json");
  const cannibalization = readOptionalJson<CannibalizationReport>("content/automation/content-cannibalization.json");

  const packByFile = new Map((publishPack.items || []).map((item) => [item.file, item]));
  const freshnessByFile = new Map((freshness?.plannedReviewItems || []).map((item) => [item.file, item]));
  const conflictFiles = new Set((cannibalization?.reviewBatchConflicts || []).flatMap((item) => item.reviewBatchOverlap || item.files || []));
  const plannedItems = reviewPlan.batches.flatMap((batch) => batch.candidates.map((candidate) => toCoverageItem(batch, candidate, packByFile, freshnessByFile)));
  const plannedFiles = new Set(plannedItems.map((item) => item.file));
  const missingCoverage = reviewPlan.totals.plannedCandidates - plannedFiles.size;

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This report expands manual review coverage for planned candidates. It does not change article status, noindex, or publishing state.",
    },
    summary: {
      currentPackCovered: plannedItems.filter((item) => item.currentPackCovered).length,
      itemsMissingApprovalChecks: plannedItems.filter((item) => item.approvalChecklist.length === 0).length,
      itemsMissingFactCheckQueries: plannedItems.filter((item) => item.factCheckQueries.length === 0).length,
      itemsMissingOfficialSources: plannedItems.filter((item) => item.officialSourceTargets.length === 0).length,
      itemsMissingRiskChecks: plannedItems.filter((item) => item.riskReviewChecklist.length === 0).length,
      missingCoverage,
      nonDraftItems: plannedItems.filter((item) => item.status !== "draft").length,
      plannedCandidates: reviewPlan.totals.plannedCandidates,
      reviewBatchConflictItems: plannedItems.filter((item) => conflictFiles.has(item.file)).length,
      unsafeIndexingItems: plannedItems.filter((item) => item.noindex !== true || item.humanReviewRequired !== true).length,
    },
    batches: reviewPlan.batches.map((batch) => ({
      batch: batch.batch,
      candidateCount: batch.candidates.length,
      topic: batch.topic,
    })),
    items: plannedItems,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "review-coverage-report.json");
  const mdTarget = path.join(process.cwd(), "docs", "review-coverage-report.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, items: plannedItems.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function toCoverageItem(
  batch: PlannedBatch,
  candidate: PlannedCandidate,
  packByFile: Map<string, PublishPack["items"][number]>,
  freshnessByFile: Map<string, { file: string; riskLevel: string; riskReasons: string[] }>,
): CoverageItem {
  const article = readArticle(candidate.file);
  const data = article.data;
  const content = article.content;
  const packItem = packByFile.get(candidate.file);
  const freshnessItem = freshnessByFile.get(candidate.file);
  const officialSourceTargets = packItem?.officialSourceTargets?.length ? packItem.officialSourceTargets : buildOfficialSourceTargets(data, content);
  const factCheckQueries = packItem?.factCheckQueries?.length ? packItem.factCheckQueries : buildFactCheckQueries(data, batch);
  const riskReviewChecklist = packItem?.riskReviewChecklist?.length ? packItem.riskReviewChecklist : buildRiskReviewChecklist(data, content);

  return {
    approvalChecklist: buildApprovalChecklist(data, content),
    batch: batch.batch,
    category: String(data.category || candidate.category || ""),
    cluster: candidate.cluster,
    currentPackCovered: Boolean(packItem),
    factCheckQueries,
    file: rel(article.file),
    freshnessRiskLevel: freshnessItem?.riskLevel || inferFreshnessRisk(data, content),
    freshnessRiskReasons: freshnessItem?.riskReasons || [],
    humanReviewRequired: data.humanReviewRequired === true,
    internalLinks: (content.match(/\]\(\//g) || []).length,
    noindex: data.noindex === true,
    officialSourceTargets,
    opportunityReason: candidate.opportunityReason,
    opportunityScore: candidate.opportunityScore,
    primaryKeyword: String(data.primaryKeyword || ""),
    qualityScore: candidate.qualityScore,
    reviewFocus: [...new Set([...batch.reviewFocus, "Verify current official docs before approval.", "Confirm the article has one clear search intent."])],
    riskReviewChecklist,
    searchIntent: String(data.searchIntent || ""),
    sourceNotesPresent: Boolean(data.sourceNotes),
    status: String(data.status || ""),
    title: String(data.title || candidate.title || ""),
    topic: batch.topic,
    wordCountChinese: chineseCount(content),
  };
}

function buildApprovalChecklist(data: Record<string, unknown>, content: string) {
  return [
    `Article is still draft: ${data.status === "draft"}`,
    `Article is still noindex: ${data.noindex === true}`,
    `Human review flag is present: ${data.humanReviewRequired === true}`,
    `Source notes are present: ${Boolean(data.sourceNotes)}`,
    `Article has internal links: ${(content.match(/\]\(\//g) || []).length > 0}`,
    "Reviewer confirms the opening answer matches the main query.",
    "Reviewer confirms the article should enter review before any status change command runs.",
  ];
}

function buildRiskReviewChecklist(data: Record<string, unknown>, content: string) {
  const text = textFor(data, content);
  const checks = [
    "No income, traffic, approval, ranking, or client-acquisition guarantee.",
    "No instruction to bypass platform, payment, messaging, or account rules.",
    "No API key, credential, customer data, or private account detail.",
    "Fast-changing tool limits, model names, pricing, deployment steps, and API behavior are checked against official docs.",
  ];

  if (hasAny(text, ["agent", "workflow", "webhook", "tool calling"])) {
    checks.push("Agent or workflow claims include permissions, logging, human approval, rollback, and failure handling.");
  }
  if (hasAny(text, ["rag", "vector", "embedding", "knowledge", "retrieval"])) {
    checks.push("RAG or memory claims explain retrieval limits, citation checks, privacy boundaries, and hallucination risk.");
  }
  if (hasAny(text, ["deploy", "deployment", "vercel", "docker", "gpu", "serverless"])) {
    checks.push("Deployment guidance includes environment variables, smoke checks, rate limits, logs, and rollback steps.");
  }
  if (hasAny(text, ["prompt", "prompts"])) {
    checks.push("Prompt examples include input context, output criteria, review rules, and adaptation notes.");
  }

  return [...new Set(checks)];
}

function buildFactCheckQueries(data: Record<string, unknown>, batch: PlannedBatch) {
  const title = String(data.title || "").trim();
  const primaryKeyword = String(data.primaryKeyword || "").trim();
  const queries = [
    primaryKeyword ? `${primaryKeyword} official docs latest` : "",
    primaryKeyword ? `${primaryKeyword} official changelog` : "",
    title ? `${title} fact check official docs` : "",
    ...batch.searchQueries,
  ].filter(Boolean);

  return [...new Set(queries)].slice(0, 8);
}

function buildOfficialSourceTargets(data: Record<string, unknown>, content: string) {
  const text = textFor(data, content);
  const targets = [
    matchTarget(text, ["openai", "chatgpt", "agents sdk", "responses api"], "OpenAI docs", "https://platform.openai.com/docs"),
    matchTarget(text, ["vercel ai sdk", "ai sdk", "vercel"], "Vercel AI SDK docs", "https://ai-sdk.dev/docs"),
    matchTarget(text, ["hugging face", "inference endpoints", "vllm", "tgi"], "Hugging Face docs", "https://huggingface.co/docs"),
    matchTarget(text, ["dify"], "Dify docs", "https://docs.dify.ai"),
    matchTarget(text, ["n8n"], "n8n docs", "https://docs.n8n.io"),
    matchTarget(text, ["ollama"], "Ollama docs", "https://ollama.com/docs"),
    matchTarget(text, ["anthropic", "claude"], "Anthropic docs", "https://docs.anthropic.com"),
    matchTarget(text, ["gemini", "google ai"], "Google AI docs", "https://ai.google.dev/docs"),
    matchTarget(text, ["rag", "retrieval", "vector", "embedding"], "OpenAI retrieval docs", "https://platform.openai.com/docs/guides/retrieval"),
    matchTarget(text, ["langchain"], "LangChain docs", "https://docs.langchain.com"),
    matchTarget(text, ["llamaindex"], "LlamaIndex docs", "https://docs.llamaindex.ai"),
    matchTarget(text, ["github"], "GitHub docs", "https://docs.github.com"),
  ].filter((target): target is string => Boolean(target));

  if (!targets.length) {
    targets.push("General official docs search: verify the primary keyword against current vendor documentation before approval.");
  }

  return [...new Set(targets)].slice(0, 6);
}

function inferFreshnessRisk(data: Record<string, unknown>, content: string) {
  const text = textFor(data, content);
  if (hasAny(text, ["api", "agent", "model", "openai", "rag", "rate limit", "vercel", "vllm", "webhook", "deployment"])) return "high";
  if (hasAny(text, ["prompt", "tool", "workflow", "automation", "pricing"])) return "medium";
  return "low";
}

function textFor(data: Record<string, unknown>, content: string) {
  return `${data.title || ""} ${data.category || ""} ${data.primaryKeyword || ""} ${data.sourceNotes || ""} ${content}`.toLowerCase();
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term.toLowerCase()));
}

function matchTarget(text: string, terms: string[], label: string, url: string) {
  return hasAny(text, terms) ? `${label}: ${url}` : "";
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function readOptionalJson<T>(relativePath: string) {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return null;
  return readJson<T>(relativePath);
}

function toMarkdown(payload: {
  batches: Array<{ batch: number; candidateCount: number; topic: string }>;
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string };
  items: CoverageItem[];
  summary: Record<string, number>;
}) {
  const lines = [
    "# Review Coverage Report",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report expands manual review coverage across the planned candidate batches. It is read-only and does not publish or mark review.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Batches",
    "",
    "| Batch | Topic | Candidates |",
    "| --- | --- | --- |",
    ...payload.batches.map((batch) => `| ${batch.batch} | ${batch.topic} | ${batch.candidateCount} |`),
    "",
    "## Candidate Coverage",
    "",
    "| Batch | Pack | Risk | Quality | Status | Noindex | Human Review | Sources | Queries | Checks | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.map((item) => (
      `| ${item.batch} | ${item.currentPackCovered ? "current" : "planned"} | ${item.freshnessRiskLevel} | ${item.qualityScore} | ${item.status} | ${item.noindex} | ${item.humanReviewRequired} | ${item.officialSourceTargets.length} | ${item.factCheckQueries.length} | ${item.riskReviewChecklist.length} | ${item.title} | ${item.file} |`
    )),
    "",
  ];

  for (const item of payload.items) {
    lines.push(
      `## ${item.batch}. ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Topic: ${item.topic}`,
      `- Category: ${item.category}`,
      `- Cluster: ${item.cluster}`,
      `- Primary keyword: ${item.primaryKeyword}`,
      `- Search intent: ${item.searchIntent}`,
      `- Opportunity score: ${item.opportunityScore}`,
      `- Opportunity reason: ${item.opportunityReason}`,
      `- Chinese chars: ${item.wordCountChinese}`,
      `- Internal links: ${item.internalLinks}`,
      `- Freshness risk: ${item.freshnessRiskLevel}`,
      "",
      "Official source targets:",
      "",
      ...item.officialSourceTargets.map((target) => `- ${target}`),
      "",
      "Fact-check queries:",
      "",
      ...item.factCheckQueries.map((query) => `- ${query}`),
      "",
      "Approval checklist:",
      "",
      ...item.approvalChecklist.map((check) => `- ${check}`),
      "",
      "Risk review checklist:",
      "",
      ...item.riskReviewChecklist.map((check) => `- ${check}`),
      "",
      "Review focus:",
      "",
      ...item.reviewFocus.map((focus) => `- ${focus}`),
      "",
    );
  }

  return lines.join("\n");
}

main();

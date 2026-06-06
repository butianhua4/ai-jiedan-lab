import fs from "fs";
import path from "path";
import { chineseCount, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type RoadmapCandidate = {
  category?: string;
  currentPack?: boolean;
  file: string;
  plannedBatch?: boolean;
  primaryKeyword?: string;
  publishBatch?: number | null;
  qualityScore?: number;
  safeDraft?: boolean;
  searchIntent?: string;
  title: string;
};

type RoadmapLane = {
  candidates: RoadmapCandidate[];
  lane: string;
  priorityScore: number;
  publicMatches: number;
  rationale: string;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  workflowAngles: string[];
};

type SourcePackItem = {
  approvalChecklist: string[];
  category: string;
  currentPack: boolean;
  factCheckQueries: string[];
  file: string;
  internalLinks: number;
  lane: string;
  lanePriorityScore: number;
  officialSourceTargets: string[];
  plannedBatch: boolean;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  riskReviewChecklist: string[];
  safeDraft: boolean;
  searchIntent: string;
  sourceNotesPresent: boolean;
  status: string;
  title: string;
  wordCountChinese: number;
  workflowAngles: string[];
};

function main() {
  const roadmap = readJson<{
    lanes: RoadmapLane[];
    nextReviewFiles: string[];
    summary: { uniqueNextReviewFiles: number };
  }>("content/automation/review-priority-roadmap.json");
  const items = roadmap.nextReviewFiles.map((file) => toPackItem(file, roadmap.lanes));
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This pack prepares source review work for the roadmap's next review files. It does not change article status, noindex, or publishing state.",
      stopBefore: "Run mark:review --confirm-human or publish:articles --confirm only after explicit human approval.",
    },
    summary: {
      items: items.length,
      missingApprovalChecks: items.filter((item) => item.approvalChecklist.length === 0).length,
      missingFactCheckQueries: items.filter((item) => item.factCheckQueries.length === 0).length,
      missingOfficialSources: items.filter((item) => item.officialSourceTargets.length === 0).length,
      missingRiskChecks: items.filter((item) => item.riskReviewChecklist.length === 0).length,
      roadmapNextReviewFiles: roadmap.summary.uniqueNextReviewFiles,
      safeDraftItems: items.filter((item) => item.safeDraft).length,
      unsafeItems: items.filter((item) => !item.safeDraft).length,
    },
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "next-review-source-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "next-review-source-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, items: items.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function toPackItem(file: string, lanes: RoadmapLane[]): SourcePackItem {
  const lane = findBestLane(file, lanes);
  const candidate = lane?.candidates.find((item) => item.file === file);
  const article = readArticle(file);
  const result = checkFile(article.file);
  const data = article.data;
  const content = article.content;
  const text = searchableText(data, content);
  const safeDraft = data.status === "draft" && data.noindex === true && data.humanReviewRequired === true;
  const officialSourceTargets = [...new Set([...(lane?.sourceTargets || []), ...sourceTargetsFor(text)])].slice(0, 10);

  return {
    approvalChecklist: buildApprovalChecklist(data, content, result.qualityScore),
    category: String(data.category || candidate?.category || ""),
    currentPack: candidate?.currentPack === true,
    factCheckQueries: buildFactCheckQueries(data, lane),
    file: rel(article.file),
    internalLinks: (content.match(/\]\(\//g) || []).length,
    lane: lane?.lane || "unmatched",
    lanePriorityScore: lane?.priorityScore || 0,
    officialSourceTargets,
    plannedBatch: candidate?.plannedBatch === true,
    primaryKeyword: String(data.primaryKeyword || candidate?.primaryKeyword || ""),
    publishBatch: typeof data.publishBatch === "number" ? data.publishBatch : candidate?.publishBatch ?? null,
    qualityScore: result.qualityScore,
    riskReviewChecklist: buildRiskReviewChecklist(text),
    safeDraft,
    searchIntent: String(data.searchIntent || candidate?.searchIntent || ""),
    sourceNotesPresent: Boolean(data.sourceNotes),
    status: String(data.status || ""),
    title: String(data.title || candidate?.title || ""),
    wordCountChinese: chineseCount(content),
    workflowAngles: lane?.workflowAngles || [],
  };
}

function findBestLane(file: string, lanes: RoadmapLane[]) {
  return lanes
    .filter((lane) => lane.candidates.some((candidate) => candidate.file === file))
    .sort((a, b) => b.priorityScore - a.priorityScore)[0];
}

function buildApprovalChecklist(data: Record<string, unknown>, content: string, qualityScore: number) {
  return [
    `Article remains draft: ${data.status === "draft"}`,
    `Article remains noindex: ${data.noindex === true}`,
    `Human review flag is present: ${data.humanReviewRequired === true}`,
    `Quality score is at least 100: ${qualityScore >= 100}`,
    `Source notes are present: ${Boolean(data.sourceNotes)}`,
    `Article has internal links: ${(content.match(/\]\(\//g) || []).length > 0}`,
    "Reviewer confirms the article answers one clear search intent.",
    "Reviewer confirms factual claims against official docs before any status change.",
  ];
}

function buildFactCheckQueries(data: Record<string, unknown>, lane: RoadmapLane | undefined) {
  const title = String(data.title || "").trim();
  const keyword = String(data.primaryKeyword || "").trim();
  const category = String(data.category || "").trim();
  const queries = [
    keyword ? `${keyword} official docs latest` : "",
    keyword ? `${keyword} official documentation current limits` : "",
    title ? `${title} fact check official docs` : "",
    category ? `${category} official docs limits pricing changelog` : "",
    ...(lane?.searchQueries || []),
  ].filter(Boolean);

  return [...new Set(queries)].slice(0, 10);
}

function buildRiskReviewChecklist(text: string) {
  const checks = [
    "No income, ranking, approval, or client acquisition guarantee.",
    "No instruction to bypass platform, payment, messaging, account, or review rules.",
    "No API key, credential, private customer data, or account detail is included.",
    "Fast-changing model names, pricing, quotas, rate limits, and deployment steps are checked against current official docs.",
  ];

  if (hasAny(text, ["agent", "workflow", "webhook", "tool calling", "mcp"])) {
    checks.push("Agent or workflow claims include permissions, human approval, logging, failure handling, and rollback boundaries.");
  }
  if (hasAny(text, ["rag", "retrieval", "vector", "embedding", "knowledge"])) {
    checks.push("RAG or knowledge-base claims distinguish retrieval quality, citation checks, privacy boundaries, and hallucination risk.");
  }
  if (hasAny(text, ["deploy", "deployment", "vercel", "docker", "gpu", "serverless", "vllm", "ollama"])) {
    checks.push("Deployment guidance includes environment variables, smoke checks, rate limits, logs, resource limits, and rollback steps.");
  }
  if (hasAny(text, ["prompt", "prompting", "prompt engineering"])) {
    checks.push("Prompt examples include input context, output criteria, review rules, and adaptation notes.");
  }

  return [...new Set(checks)];
}

function sourceTargetsFor(text: string) {
  const targets = [
    matchTarget(text, ["openai", "chatgpt", "responses api", "batch api", "大模型", "模型"], "OpenAI API docs", "https://platform.openai.com/docs"),
    matchTarget(text, ["agent", "agents sdk", "tool calling", "handoff", "智能体", "工具调用"], "OpenAI Agents docs", "https://platform.openai.com/docs/guides/agents"),
    matchTarget(text, ["vercel ai sdk", "ai sdk", "vercel", "部署", "上线"], "Vercel AI SDK docs", "https://ai-sdk.dev/docs"),
    matchTarget(text, ["anthropic", "claude"], "Anthropic docs", "https://docs.anthropic.com"),
    matchTarget(text, ["gemini", "google ai"], "Google AI docs", "https://ai.google.dev/docs"),
    matchTarget(text, ["dify"], "Dify docs", "https://docs.dify.ai"),
    matchTarget(text, ["n8n"], "n8n docs", "https://docs.n8n.io"),
    matchTarget(text, ["ollama"], "Ollama docs", "https://docs.ollama.com"),
    matchTarget(text, ["vllm"], "vLLM docs", "https://docs.vllm.ai"),
    matchTarget(text, ["hugging face", "tgi", "inference endpoints"], "Hugging Face docs", "https://huggingface.co/docs"),
    matchTarget(text, ["rag", "retrieval", "vector", "embedding", "知识库", "向量", "检索", "客服"], "OpenAI retrieval docs", "https://platform.openai.com/docs/guides/retrieval"),
    matchTarget(text, ["langchain"], "LangChain docs", "https://docs.langchain.com"),
    matchTarget(text, ["llamaindex"], "LlamaIndex docs", "https://docs.llamaindex.ai"),
    matchTarget(text, ["prompt", "prompting", "prompt engineering", "提示词", "模板"], "OpenAI prompt engineering guide", "https://platform.openai.com/docs/guides/prompt-engineering"),
  ].filter((target): target is string => Boolean(target));

  if (!targets.length) {
    targets.push("OpenAI API docs: https://platform.openai.com/docs");
  }

  return targets;
}

function searchableText(data: Record<string, unknown>, content: string) {
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

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string; stopBefore: string };
  items: SourcePackItem[];
  summary: Record<string, number>;
}) {
  const lines = [
    "# Next Review Source Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This pack is read-only. It prepares official-source, fact-check, approval, and risk-review work for the roadmap's next review files.",
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
    "## Items",
    "",
    "| Safe | Current | Planned | Score | Sources | Queries | Risk checks | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.items.map(
      (item) =>
        `| ${item.safeDraft} | ${item.currentPack} | ${item.plannedBatch} | ${item.qualityScore} | ${item.officialSourceTargets.length} | ${item.factCheckQueries.length} | ${item.riskReviewChecklist.length} | ${item.title} | ${item.file} |`,
    ),
    "",
  ];

  for (const item of payload.items) {
    lines.push(
      `## ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Lane: ${item.lane}`,
      `- Lane priority score: ${item.lanePriorityScore}`,
      `- Category: ${item.category}`,
      `- Primary keyword: ${item.primaryKeyword}`,
      `- Search intent: ${item.searchIntent}`,
      `- Publish batch: ${item.publishBatch ?? ""}`,
      `- Status: ${item.status}`,
      `- Safe draft: ${item.safeDraft}`,
      `- Source notes present: ${item.sourceNotesPresent}`,
      `- Chinese chars: ${item.wordCountChinese}`,
      `- Internal links: ${item.internalLinks}`,
      "",
      "Approval checklist:",
      "",
      ...item.approvalChecklist.map((check) => `- ${check}`),
      "",
      "Official source targets:",
      "",
      ...item.officialSourceTargets.map((target) => `- ${target}`),
      "",
      "Fact-check queries:",
      "",
      ...item.factCheckQueries.map((query) => `- ${query}`),
      "",
      "Risk review checklist:",
      "",
      ...item.riskReviewChecklist.map((check) => `- ${check}`),
      "",
      "Workflow angles:",
      "",
      ...item.workflowAngles.map((angle) => `- ${angle}`),
      "",
    );
  }

  return lines.join("\n");
}

main();

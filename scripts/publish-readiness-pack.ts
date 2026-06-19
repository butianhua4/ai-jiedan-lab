import fs from "fs";
import path from "path";
import { chineseCount, parseArgs, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type Candidate = {
  cluster?: string;
  file: string;
  opportunityReason?: string;
  opportunityScore?: number;
  publishBatch: number | null;
  qualityScore: number;
  title: string;
};

type ContentOpportunity = {
  readyCandidates: Array<{ file: string }>;
  reviewFocus: string[];
  searchQueries: string[];
  topic: string;
  why: string;
};

type PackItem = {
  category: string;
  cluster: string;
  description: string;
  file: string;
  factCheckQueries: string[];
  humanDecisionChecklist: string[];
  matchedContentOpportunity: {
    reviewFocus: string[];
    searchQueries: string[];
    topic: string;
    why: string;
  } | null;
  officialSourceTargets: string[];
  internalLinks: number;
  markReviewCommand: string;
  opportunityReason: string;
  opportunityScore: number;
  primaryKeyword: string;
  publishConfirmCommand: string;
  publishDryRunCommand: string;
  qualityScore: number;
  riskReviewChecklist: string[];
  reviewFocus: string[];
  searchIntent: string;
  slug: string;
  sourceNotes: string;
  title: string;
  wordCountChinese: number;
};

async function main() {
  const args = parseArgs();
  const limit = Math.min(Number(args.limit || 3), 10);
  const candidates = loadCandidates().slice(0, limit);
  const items = candidates.map(toPackItem);
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoPublish: false,
      requiredHumanAction: "Read the article, verify factual claims and risk language, then mark review manually.",
      publishRule: "Only publish status=review articles, 1-3 per batch, after a second dry-run.",
    },
    counts: {
      requested: limit,
      included: items.length,
    },
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "publish-readiness-pack.json");
  const mdTarget = path.join(process.cwd(), "docs", "publish-readiness-pack.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, included: items.length, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
}

function loadCandidates() {
  const reviewQueuePath = path.join(process.cwd(), "content", "automation", "review-candidates.json");
  if (!fs.existsSync(reviewQueuePath)) {
    throw new Error("Missing review-candidates.json. Run npm run automation:review first.");
  }

  const payload = JSON.parse(fs.readFileSync(reviewQueuePath, "utf8")) as { recommendedToday?: Candidate[]; candidates?: Candidate[] };
  return payload.recommendedToday?.length ? payload.recommendedToday : payload.candidates || [];
}

function toPackItem(candidate: Candidate): PackItem {
  const article = readArticle(candidate.file);
  const result = checkFile(article.file);
  const content = article.content;
  const data = article.data;
  const file = rel(article.file);
  const matchedContentOpportunity = findContentOpportunity(file);
  const reviewFocus = [...new Set([...buildReviewFocus(result.warnings), ...(matchedContentOpportunity?.reviewFocus || [])])];

  return {
    category: String(data.category || ""),
    cluster: candidate.cluster || "",
    description: String(data.description || ""),
    factCheckQueries: buildFactCheckQueries(data, matchedContentOpportunity),
    file,
    humanDecisionChecklist: buildHumanDecisionChecklist(data, result.qualityScore, content),
    matchedContentOpportunity,
    officialSourceTargets: buildOfficialSourceTargets(data, content),
    internalLinks: (content.match(/\]\(\//g) || []).length,
    markReviewCommand: `npm run mark:review -- --file=${file} --confirm-human`,
    opportunityReason: candidate.opportunityReason || "",
    opportunityScore: candidate.opportunityScore || 0,
    primaryKeyword: String(data.primaryKeyword || ""),
    publishConfirmCommand: `npm run publish:articles -- --file=${file} --confirm`,
    publishDryRunCommand: `npm run publish:articles -- --file=${file}`,
    qualityScore: result.qualityScore,
    riskReviewChecklist: buildRiskReviewChecklist(data, content),
    reviewFocus,
    searchIntent: String(data.searchIntent || ""),
    slug: String(data.slug || ""),
    sourceNotes: String(data.sourceNotes || ""),
    title: String(data.title || candidate.title || ""),
    wordCountChinese: chineseCount(content),
  };
}

function buildReviewFocus(warnings: string[]) {
  return [
    "Verify the opening answer matches the title and search intent.",
    "Check facts, tool names, limits, and platform policy wording.",
    "Confirm risk reminders are cautionary and do not imply guaranteed outcomes.",
    "Confirm internal links and CTA point to relevant site pages.",
    "Open the official source targets below before approving fast-changing AI, deployment, pricing, or API claims.",
    ...warnings.map((warning) => `Quality warning: ${warning}`),
  ];
}

function findContentOpportunity(file: string) {
  const target = path.join(process.cwd(), "content", "automation", "content-opportunity-backlog.json");
  if (!fs.existsSync(target)) return null;

  const payload = JSON.parse(fs.readFileSync(target, "utf8")) as { opportunities?: ContentOpportunity[] };
  const matched = payload.opportunities?.find((item) => item.readyCandidates.some((candidate) => candidate.file === file));
  if (!matched) return null;

  return {
    reviewFocus: matched.reviewFocus,
    searchQueries: matched.searchQueries,
    topic: matched.topic,
    why: matched.why,
  };
}

function buildHumanDecisionChecklist(data: Record<string, unknown>, qualityScore: number, content: string) {
  return [
    `Article remains draft before approval: ${data.status === "draft"}`,
    `Article remains noindex before approval: ${data.noindex === true}`,
    `Human review is required: ${data.humanReviewRequired === true}`,
    `Quality score is at least 100: ${qualityScore >= 100}`,
    `Source notes are present: ${Boolean(data.sourceNotes)}`,
    `Article has at least one internal link: ${(content.match(/\]\(\//g) || []).length > 0}`,
    "Opening section directly answers the search query.",
    "Reviewer can explain why this article should be public now instead of staying draft.",
  ];
}

function buildRiskReviewChecklist(data: Record<string, unknown>, content: string) {
  const text = `${data.title || ""} ${data.description || ""} ${data.primaryKeyword || ""} ${content}`.toLowerCase();
  const checks = [
    "No income, ranking, approval, or client acquisition guarantee.",
    "No instruction to bypass platform rules, payments, messaging, or review systems.",
    "No API key, credential, private customer data, or account detail is included.",
    "Fast-changing tool limits, pricing, model names, and deployment steps are verified against official docs.",
  ];

  if (text.includes("upwork") || text.includes("fiverr")) checks.push("Platform policy wording is cautionary and does not encourage off-platform transactions.");
  if (text.includes("agent") || text.includes("workflow") || text.includes("webhook")) checks.push("Automation claims include human approval, permissions, logging, and rollback boundaries.");
  if (text.includes("rag") || text.includes("vector") || text.includes("knowledge")) checks.push("Knowledge base claims distinguish retrieval quality, citations, and hallucination risk.");
  if (text.includes("prompt") || text.includes("提示词")) checks.push("Prompt examples include inputs, output criteria, and review steps instead of vague universal prompts.");
  if (text.includes("deploy") || text.includes("部署") || text.includes("api")) checks.push("Deployment guidance includes environment variables, rate limits, smoke checks, and failure handling.");

  return [...new Set(checks)];
}

function buildFactCheckQueries(data: Record<string, unknown>, opportunity: ReturnType<typeof findContentOpportunity>) {
  const title = String(data.title || "").trim();
  const primaryKeyword = String(data.primaryKeyword || "").trim();
  const category = String(data.category || "").trim();
  const queries = [
    primaryKeyword ? `${primaryKeyword} 官方文档 最新` : "",
    primaryKeyword ? `${primaryKeyword} official docs latest` : "",
    title ? `${title} 事实核对` : "",
    category ? `${category} 平台限制 官方文档` : "",
    ...(opportunity?.searchQueries || []),
  ].filter(Boolean);

  return [...new Set(queries)].slice(0, 8);
}

function buildOfficialSourceTargets(data: Record<string, unknown>, content: string) {
  const text = `${data.title || ""} ${data.category || ""} ${data.primaryKeyword || ""} ${data.sourceNotes || ""} ${content}`.toLowerCase();
  const targets = [
    matchTarget(text, ["openai", "chatgpt", "agents sdk", "responses api"], "OpenAI docs", "https://platform.openai.com/docs"),
    matchTarget(text, ["vercel ai sdk", "ai sdk", "vercel"], "Vercel AI SDK docs", "https://ai-sdk.dev/docs"),
    matchTarget(text, ["hugging face", "inference endpoints", "vllm", "tgi", "sglang"], "Hugging Face docs", "https://huggingface.co/docs"),
    matchTarget(text, ["dify"], "Dify docs", "https://docs.dify.ai"),
    matchTarget(text, ["n8n"], "n8n docs", "https://docs.n8n.io"),
    matchTarget(text, ["ollama"], "Ollama docs", "https://ollama.com/docs"),
    matchTarget(text, ["anthropic", "claude"], "Anthropic docs", "https://docs.anthropic.com"),
    matchTarget(text, ["gemini", "google ai"], "Google AI docs", "https://ai.google.dev/docs"),
    matchTarget(text, ["rag", "retrieval", "vector", "embedding"], "OpenAI retrieval docs", "https://platform.openai.com/docs/guides/retrieval"),
    matchTarget(text, ["prompt", "提示词"], "OpenAI prompt engineering guide", "https://platform.openai.com/docs/guides/prompt-engineering"),
    matchTarget(text, ["langchain"], "LangChain docs", "https://docs.langchain.com"),
    matchTarget(text, ["llamaindex"], "LlamaIndex docs", "https://docs.llamaindex.ai"),
    matchTarget(text, ["github"], "GitHub docs", "https://docs.github.com"),
    matchTarget(text, ["google search console", "search console"], "Google Search Central docs", "https://developers.google.com/search/docs"),
  ].filter((target): target is string => Boolean(target));

  if (!targets.length) {
    targets.push("General official docs search: verify the primary keyword against current vendor documentation before approval.");
  }

  return [...new Set(targets)].slice(0, 6);
}

function matchTarget(text: string, terms: string[], label: string, url: string) {
  return terms.some((term) => text.includes(term.toLowerCase())) ? `${label}: ${url}` : "";
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoPublish: boolean; requiredHumanAction: string; publishRule: string };
  counts: { requested: number; included: number };
  items: PackItem[];
}) {
  const lines = [
    "# Publish Readiness Pack",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This pack organizes manual review work. It does not publish articles or change article status.",
    "",
    "## Guardrails",
    "",
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Required human action: ${payload.guardrails.requiredHumanAction}`,
    `- Publish rule: ${payload.guardrails.publishRule}`,
    "",
    "## Summary",
    "",
    `- Requested: ${payload.counts.requested}`,
    `- Included: ${payload.counts.included}`,
    "",
  ];

  for (const [index, item] of payload.items.entries()) {
    lines.push(
      `## ${index + 1}. ${item.title}`,
      "",
      `- File: ${item.file}`,
      `- Cluster: ${item.cluster}`,
      `- Category: ${item.category}`,
      `- Primary keyword: ${item.primaryKeyword}`,
      `- Search intent: ${item.searchIntent}`,
      `- Quality score: ${item.qualityScore}`,
      `- Opportunity score: ${item.opportunityScore}`,
      `- Opportunity reason: ${item.opportunityReason}`,
      `- Matched content opportunity: ${item.matchedContentOpportunity?.topic || "none"}`,
      `- Opportunity why: ${item.matchedContentOpportunity?.why || ""}`,
      `- Chinese chars: ${item.wordCountChinese}`,
      `- Internal links: ${item.internalLinks}`,
      `- Description: ${item.description}`,
      `- Source notes: ${item.sourceNotes}`,
      "",
      "Human decision checklist:",
      "",
      ...item.humanDecisionChecklist.map((check) => `- ${check}`),
      "",
      "Risk review checklist:",
      "",
      ...item.riskReviewChecklist.map((check) => `- ${check}`),
      "",
      "Review focus:",
      "",
      ...item.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "Official source targets:",
      "",
      ...item.officialSourceTargets.map((target) => `- ${target}`),
      "",
      "Fact-check queries:",
      "",
      ...item.factCheckQueries.map((query) => `- ${query}`),
      "",
      "Commands:",
      "",
      "```bash",
      item.markReviewCommand,
      item.publishDryRunCommand,
      item.publishConfirmCommand,
      "npm run live:check -- --url=https://ai.aporet.com",
      "```",
      "",
    );
  }

  return lines.join("\n");
}

void main();

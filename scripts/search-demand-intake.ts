import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type ArticleSummary = {
  category: string;
  file: string;
  humanReviewRequired: boolean;
  noindex: boolean;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  slug: string;
  sourceNotes: boolean;
  status: string;
  title: string;
};

type DemandLaneSeed = {
  audience: string;
  contentFormats: string[];
  demandWeight: number;
  lane: string;
  manualReviewFocus: string[];
  officialSourceTargets: string[];
  searchQueries: string[];
  terms: string[];
  userProblem: string;
};

type DemandLane = DemandLaneSeed & {
  draftMatches: number;
  intakeScore: number;
  publicMatches: number;
  readyCandidates: ArticleSummary[];
  reviewQueueMatches: number;
};

const demandLanes: DemandLaneSeed[] = [
  {
    audience: "Business operators, sales, support, HR, finance, education, product, and founders using AI at work.",
    contentFormats: ["prompt library", "department workflow pack", "copy-and-paste template", "quality checklist"],
    demandWeight: 100,
    lane: "cross-industry-ai-prompts",
    manualReviewFocus: [
      "Every prompt needs input fields, output format, and quality criteria.",
      "High-risk domains need a human review boundary.",
      "Do not claim revenue, conversion, legal, medical, or employment outcomes.",
      "Prefer practical workflow prompts over generic one-line prompts.",
    ],
    officialSourceTargets: [
      "OpenAI prompt engineering guide: https://platform.openai.com/docs/guides/prompt-engineering",
      "OpenAI prompt generation guide: https://platform.openai.com/docs/guides/prompt-generation",
      "Anthropic prompt engineering docs: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
      "Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
    ],
    searchQueries: [
      "AI prompt templates for business",
      "ChatGPT prompts for work",
      "industry AI prompts",
      "sales AI prompts",
      "customer service AI prompts",
      "HR AI prompts",
      "finance AI prompts",
      "marketing AI prompt templates",
      "全行业 AI 提示词",
      "ChatGPT 提示词大全",
      "销售 AI 提示词",
      "客服 AI 提示词",
    ],
    terms: ["prompt", "prompts", "提示词", "sales", "customer", "hr", "finance", "marketing", "template", "工作流"],
    userProblem: "People search for ready-to-use AI prompts by role, but useful articles need workflow context and review boundaries.",
  },
  {
    audience: "Developers and small teams trying to deploy large models locally, on GPUs, or behind an API.",
    contentFormats: ["deployment tutorial", "provider comparison", "cost checklist", "troubleshooting playbook"],
    demandWeight: 98,
    lane: "llm-deployment-and-serving",
    manualReviewFocus: [
      "Verify current model serving commands, endpoints, and version names.",
      "Separate local testing from production serving.",
      "Cover GPU memory, latency, concurrency, logs, rollback, and cost limits.",
      "Avoid claiming that self-hosting is always cheaper or more stable.",
    ],
    officialSourceTargets: [
      "vLLM docs: https://docs.vllm.ai/",
      "Hugging Face docs: https://huggingface.co/docs",
      "RunPod serverless vLLM docs: https://docs.runpod.io/serverless/vllm/get-started",
      "Ollama docs: https://docs.ollama.com/",
    ],
    searchQueries: [
      "large language model deployment tutorial",
      "vLLM deployment tutorial",
      "Hugging Face TGI deployment",
      "RunPod vLLM serverless",
      "Ollama local model tutorial",
      "local LLM deployment",
      "大模型部署教程",
      "本地大模型部署",
      "vLLM 部署教程",
      "Ollama 本地部署教程",
    ],
    terms: ["大模型", "llm", "vllm", "ollama", "hugging", "runpod", "gpu", "tgi", "local model", "deployment"],
    userProblem: "Searchers want a model running, then need API access, cost control, and failure handling.",
  },
  {
    audience: "Builders moving from chatbot demos to agents that call tools, hand off work, and run in production.",
    contentFormats: ["agent deployment guide", "tool permission checklist", "MCP server checklist", "human approval workflow"],
    demandWeight: 96,
    lane: "agent-deployment-tools-mcp",
    manualReviewFocus: [
      "Confirm tool permissions, allowlists, audit logs, and human approval steps.",
      "Treat MCP and tool calling as security-sensitive.",
      "Include fallback and incident handling before any production claim.",
      "Verify framework names and current docs before approval.",
    ],
    officialSourceTargets: [
      "OpenAI Agents SDK docs: https://openai.github.io/openai-agents-python/",
      "OpenAI Agents guide: https://platform.openai.com/docs/guides/agents",
      "Vercel AI SDK agents docs: https://ai-sdk.dev/docs/agents",
      "Model Context Protocol security best practices: https://modelcontextprotocol.io/specification/draft/basic/security_best_practices",
    ],
    searchQueries: [
      "AI Agent deployment tutorial",
      "agent tool calling tutorial",
      "OpenAI Agents SDK guide",
      "Vercel AI SDK agent",
      "MCP server deployment",
      "agent tool permission checklist",
      "AI Agent 部署教程",
      "Agent 工具调用教程",
      "MCP 服务器部署",
      "Agent 权限控制",
    ],
    terms: ["agent", "agents", "tool calling", "mcp", "permission", "权限", "工具调用", "handoff", "workflow"],
    userProblem: "People want agents to act, but production content must start with permissions, tools, logs, and human gates.",
  },
  {
    audience: "Teams building support bots, internal assistants, project memory, and document Q&A systems.",
    contentFormats: ["RAG architecture guide", "memory schema checklist", "pgvector tutorial", "privacy and deletion checklist"],
    demandWeight: 94,
    lane: "rag-knowledge-base-agent-memory",
    manualReviewFocus: [
      "Separate knowledge-base RAG from user memory.",
      "Require citations, deletion, dedupe, retention, and privacy boundaries.",
      "Do not present vector search as durable memory by itself.",
      "Add evaluation steps for retrieval misses and hallucinated citations.",
    ],
    officialSourceTargets: [
      "OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval",
      "LangChain retrieval docs: https://python.langchain.com/docs/concepts/retrieval/",
      "LlamaIndex docs: https://docs.llamaindex.ai/",
      "Supabase pgvector docs: https://supabase.com/docs/guides/database/extensions/pgvector",
    ],
    searchQueries: [
      "RAG knowledge base tutorial",
      "AI agent memory",
      "agent long term memory",
      "pgvector agent memory",
      "vector database RAG",
      "RAG evaluation tutorial",
      "AI Agent 记忆怎么做",
      "RAG 知识库搭建教程",
      "向量数据库 教程",
      "智能体 长期记忆",
    ],
    terms: ["rag", "memory", "记忆", "知识库", "pgvector", "vector", "embedding", "retrieval", "citation"],
    userProblem: "Searchers mix RAG, vector databases, and memory, so content needs clear boundaries and safety controls.",
  },
  {
    audience: "No-code builders, automation freelancers, and internal ops teams using Dify, n8n, Coze, Flowise, and webhooks.",
    contentFormats: ["no-code deployment guide", "self-hosting checklist", "webhook security guide", "client delivery SOP"],
    demandWeight: 88,
    lane: "nocode-ai-automation-deployment",
    manualReviewFocus: [
      "Verify connector, credential, webhook, and self-hosting limits.",
      "Avoid unsafe scraping, spam, or bypassing platform rules.",
      "Include client acceptance criteria and manual fallback.",
      "Keep credentials and customer data out of logs and prompts.",
    ],
    officialSourceTargets: [
      "Dify docs: https://docs.dify.ai/",
      "n8n docs: https://docs.n8n.io/",
      "Flowise docs: https://docs.flowiseai.com/",
      "Model Context Protocol docs: https://modelcontextprotocol.io/docs",
    ],
    searchQueries: [
      "Dify deployment tutorial",
      "n8n AI agent tutorial",
      "Flowise local deployment",
      "Coze bot publish tutorial",
      "MCP tutorial",
      "AI automation workflow",
      "Dify 部署教程",
      "n8n AI 自动化教程",
      "Flowise 本地部署",
      "MCP 使用教程",
    ],
    terms: ["dify", "n8n", "flowise", "coze", "webhook", "automation", "自动化", "低代码", "mcp"],
    userProblem: "This lane connects search traffic to services people can buy: automation setup, deployment, acceptance, and maintenance.",
  },
  {
    audience: "Developers wiring OpenAI, Claude, Gemini, OpenRouter, or multi-model routing into apps.",
    contentFormats: ["API integration guide", "rate-limit troubleshooting", "key security checklist", "multi-provider routing checklist"],
    demandWeight: 84,
    lane: "ai-api-keys-limits-routing",
    manualReviewFocus: [
      "Verify current API docs, SDK names, endpoint behavior, and rate-limit language.",
      "Never expose client keys; use server-side proxies and environment variables.",
      "Add retries, backoff, queues, cost caps, and log redaction.",
      "Do not invent pricing, limits, or model capabilities.",
    ],
    officialSourceTargets: [
      "OpenAI API docs: https://platform.openai.com/docs",
      "Anthropic docs: https://docs.anthropic.com/",
      "Google Gemini API docs: https://ai.google.dev/gemini-api/docs",
      "Vercel AI Gateway docs: https://vercel.com/docs/ai-gateway",
    ],
    searchQueries: [
      "OpenAI API integration tutorial",
      "Claude API rate limit",
      "Gemini API tutorial",
      "OpenRouter API tutorial",
      "AI API key security",
      "multi model AI routing",
      "OpenAI API 接入教程",
      "Claude API 限流",
      "Gemini API 教程",
      "AI API Key 安全",
    ],
    terms: ["api", "api key", "rate limit", "限流", "openai", "claude", "gemini", "openrouter", "gateway", "router"],
    userProblem: "API integration is a beginner search lane and a production risk lane at the same time.",
  },
  {
    audience: "Teams shipping AI apps and needing to know whether outputs are reliable, safe, and affordable.",
    contentFormats: ["observability guide", "evaluation checklist", "RAG test plan", "incident review template"],
    demandWeight: 80,
    lane: "llm-evals-observability-security",
    manualReviewFocus: [
      "Separate evaluation scores from guarantees.",
      "Include test datasets, traces, logs, cost, latency, and privacy limits.",
      "Cover prompt injection and retrieval failures for RAG/agent systems.",
      "Add human sampling and rollback criteria.",
    ],
    officialSourceTargets: [
      "OpenAI evals guide: https://platform.openai.com/docs/guides/evals",
      "promptfoo docs: https://www.promptfoo.dev/docs/intro/",
      "Ragas docs: https://docs.ragas.io/",
      "LangSmith docs: https://docs.smith.langchain.com/",
    ],
    searchQueries: [
      "LLM observability tutorial",
      "RAG evaluation tutorial",
      "AI agent logs",
      "prompt injection defense",
      "promptfoo tutorial",
      "LangSmith tutorial",
      "LLM 评测教程",
      "RAG 评估教程",
      "AI 应用日志监控",
      "提示词注入防护",
    ],
    terms: ["observability", "eval", "evaluation", "评测", "日志", "prompt injection", "ragas", "promptfoo", "langsmith"],
    userProblem: "As content moves past deployment, searchers need quality, logs, evals, and security operations.",
  },
  {
    audience: "Freelancers and service sellers packaging AI deployment, agents, RAG, and automation for clients.",
    contentFormats: ["pricing checklist", "proposal template", "acceptance criteria", "maintenance scope"],
    demandWeight: 78,
    lane: "ai-service-pricing-delivery",
    manualReviewFocus: [
      "Define scope, deliverables, acceptance, maintenance, and handoff.",
      "Do not promise traffic, revenue, ranking, or model accuracy.",
      "Tie packages to low-risk implementation work.",
      "Add client-side approvals for account access, data, and production changes.",
    ],
    officialSourceTargets: [
      "OpenAI API docs: https://platform.openai.com/docs",
      "Vercel AI SDK docs: https://ai-sdk.dev/docs",
      "Dify docs: https://docs.dify.ai/",
      "n8n docs: https://docs.n8n.io/",
    ],
    searchQueries: [
      "AI automation project pricing",
      "AI agent project scope",
      "RAG project quote",
      "Dify n8n project pricing",
      "AI deployment proposal template",
      "AI service delivery checklist",
      "AI 自动化项目报价",
      "AI Agent 项目报价",
      "RAG 项目 报价",
      "AI 项目验收清单",
    ],
    terms: ["pricing", "报价", "proposal", "quote", "scope", "验收", "交付", "freelance", "项目", "maintenance"],
    userProblem: "This lane turns search demand into services without pretending the site already has traffic or revenue proof.",
  },
];

async function main() {
  const articles = (await articleFiles()).map(toArticleSummary);
  const reviewQueueFiles = readFileSet("content/automation/autopilot-review-queue.json", ["items", "nextAssignments"]);
  const lanes = demandLanes.map((lane) => toDemandLane(lane, articles, reviewQueueFiles)).sort((a, b) => b.intakeScore - a.intakeScore);
  const unsafeLanes = lanes.filter(
    (lane) =>
      lane.searchQueries.length < 8 ||
      lane.officialSourceTargets.length < 3 ||
      lane.contentFormats.length < 3 ||
      lane.manualReviewFocus.length < 4 ||
      lane.readyCandidates.length === 0,
  );
  const readyFiles = new Set(lanes.flatMap((lane) => lane.readyCandidates.map((item) => item.file)));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      trafficClaim: "not-included",
      note: "Read-only search-demand intake. Search queries are editorial seeds, not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.",
    },
    summary: {
      contentFormats: new Set(lanes.flatMap((lane) => lane.contentFormats)).size,
      lanes: lanes.length,
      lanesWithPublicCoverage: lanes.filter((lane) => lane.publicMatches > 0).length,
      lanesWithoutPublicCoverage: lanes.filter((lane) => lane.publicMatches === 0).length,
      lanesWithReadyCandidates: lanes.filter((lane) => lane.readyCandidates.length > 0).length,
      officialSourceTargets: new Set(lanes.flatMap((lane) => lane.officialSourceTargets)).size,
      readyCandidateFiles: readyFiles.size,
      reviewQueueMatches: lanes.reduce((sum, lane) => sum + lane.reviewQueueMatches, 0),
      searchQueries: new Set(lanes.flatMap((lane) => lane.searchQueries)).size,
      unsafeLanes: unsafeLanes.length,
    },
    nextHumanActions: [
      "Use the top lanes to choose manual review focus; do not publish or mark review from this report.",
      "For each lane, verify official docs before approving any article.",
      "Prioritize lanes with zero public coverage and ready candidates.",
      "Keep traffic language factual until Search Console or analytics evidence exists.",
    ],
    unsafeLanes,
    lanes,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-demand-intake.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-demand-intake.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeLanes.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeLanes.length) process.exitCode = 1;
}

function toDemandLane(seed: DemandLaneSeed, articles: ArticleSummary[], reviewQueueFiles: Set<string>): DemandLane {
  const matches = articles.filter((article) => matchesLane(article, seed));
  const readyCandidates = matches.filter(isReviewReady).sort(compareCandidate).slice(0, 8);
  const publicMatches = matches.filter((article) => article.status === "published").length;
  const draftMatches = matches.filter((article) => article.status === "draft").length;
  const reviewQueueMatches = readyCandidates.filter((article) => reviewQueueFiles.has(article.file)).length;
  const intakeScore =
    seed.demandWeight * 2 +
    (publicMatches === 0 ? 80 : Math.max(0, 30 - publicMatches * 5)) +
    Math.min(readyCandidates.length, 8) * 10 +
    reviewQueueMatches * 8 +
    Math.min(seed.searchQueries.length, 12) * 2 +
    seed.officialSourceTargets.length * 4;

  return {
    ...seed,
    draftMatches,
    intakeScore,
    publicMatches,
    readyCandidates,
    reviewQueueMatches,
  };
}

function toArticleSummary(file: string): ArticleSummary {
  const article = readArticle(file);
  const result = checkFile(file);
  return {
    category: String(article.data.category || ""),
    file: rel(article.file),
    humanReviewRequired: article.data.humanReviewRequired === true,
    noindex: article.data.noindex === true,
    primaryKeyword: String(article.data.primaryKeyword || ""),
    publishBatch: typeof article.data.publishBatch === "number" ? article.data.publishBatch : null,
    qualityScore: result.qualityScore,
    searchIntent: String(article.data.searchIntent || ""),
    slug: String(article.data.slug || ""),
    sourceNotes: Boolean(article.data.sourceNotes),
    status: String(article.data.status || ""),
    title: String(article.data.title || ""),
  };
}

function matchesLane(article: ArticleSummary, seed: DemandLaneSeed) {
  const text = normalize(`${article.title} ${article.category} ${article.primaryKeyword} ${article.searchIntent} ${article.slug} ${article.file}`);
  return seed.terms.some((term) => text.includes(normalize(term)));
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex && article.humanReviewRequired && article.sourceNotes && article.qualityScore >= 100;
}

function compareCandidate(a: ArticleSummary, b: ArticleSummary) {
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  return a.file.localeCompare(b.file);
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ");
}

function readFileSet(relativePath: string, collectionKeys: string[]) {
  const target = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(target)) return new Set<string>();
  const payload = JSON.parse(fs.readFileSync(target, "utf8").replace(/^\uFEFF/, "")) as Record<string, unknown>;
  const files = collectionKeys.flatMap((key) => {
    const collection = payload[key];
    return Array.isArray(collection) ? collection.map((item) => (hasFile(item) ? item.file : "")) : [];
  });
  return new Set(files.filter(Boolean));
}

function hasFile(value: unknown): value is { file: string } {
  return typeof value === "object" && value !== null && "file" in value && typeof (value as { file?: unknown }).file === "string";
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
    trafficClaim: string;
  };
  lanes: DemandLane[];
  nextHumanActions: string[];
  summary: Record<string, number>;
  unsafeLanes: DemandLane[];
}) {
  const lines = [
    "# Search Demand Intake",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns broad user search behavior into review lanes for AI prompts, LLM deployment, Agent deployment, memory, RAG, no-code automation, API operations, observability, and AI service packaging.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Next Human Actions",
    "",
    ...payload.nextHumanActions.map((item) => `- ${item}`),
    "",
    "## Unsafe Lanes",
    "",
    ...(payload.unsafeLanes.length ? payload.unsafeLanes.map((lane) => `- ${lane.lane}`) : ["- none"]),
    "",
    "## Lane Priority Table",
    "",
    "| Score | Public | Drafts | Ready | Queue | Queries | Sources | Lane | User problem |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.lanes.map(
      (lane) =>
        `| ${lane.intakeScore} | ${lane.publicMatches} | ${lane.draftMatches} | ${lane.readyCandidates.length} | ${lane.reviewQueueMatches} | ${lane.searchQueries.length} | ${lane.officialSourceTargets.length} | ${lane.lane} | ${lane.userProblem} |`,
    ),
    "",
  ];

  for (const lane of payload.lanes) {
    lines.push(
      `## ${lane.lane}`,
      "",
      `- Audience: ${lane.audience}`,
      `- User problem: ${lane.userProblem}`,
      `- Intake score: ${lane.intakeScore}`,
      `- Public matches: ${lane.publicMatches}`,
      `- Draft matches: ${lane.draftMatches}`,
      `- Review queue matches: ${lane.reviewQueueMatches}`,
      "",
      "Search queries:",
      "",
      ...lane.searchQueries.map((query) => `- ${query}`),
      "",
      "Content formats:",
      "",
      ...lane.contentFormats.map((format) => `- ${format}`),
      "",
      "Manual review focus:",
      "",
      ...lane.manualReviewFocus.map((focus) => `- ${focus}`),
      "",
      "Official source targets:",
      "",
      ...lane.officialSourceTargets.map((source) => `- ${source}`),
      "",
      "Ready candidates:",
      "",
      ...candidateTable(lane.readyCandidates),
      "",
    );
  }

  return lines.join("\n");
}

function candidateTable(items: ArticleSummary[]) {
  if (!items.length) return ["- none"];
  return [
    "| Batch | Score | Intent | Keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => `| ${item.publishBatch ?? ""} | ${item.qualityScore} | ${item.searchIntent} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`),
  ];
}

void main();

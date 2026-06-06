import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type Lane = {
  audience: string;
  demandScore: number;
  id: string;
  intentSeeds: string[];
  matchTerms: string[];
  reviewFocus: string[];
  sourceTargets: string[];
  title: string;
  workflowAngles: string[];
};

type Candidate = {
  category: string;
  currentPack: boolean;
  expansionQueue: boolean;
  file: string;
  noindex: boolean | null;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  safeDraft: boolean;
  searchIntent: string;
  status: string;
  title: string;
  wave1: boolean;
};

type LaneReport = Lane & {
  candidateCount: number;
  currentPackCandidates: number;
  expansionCandidates: number;
  matchedCandidates: Candidate[];
  publicCount: number;
  priorityReason: string;
  priorityScore: number;
  readyDraftCount: number;
  notReadyMatchedDrafts: number;
  wave1Candidates: number;
};

type PublicExpansionQueue = {
  items: Array<{ file: string }>;
};

type ReviewCandidates = {
  recommendedToday: Array<{ file: string }>;
};

type WaveApprovalPacket = {
  files: string[];
};

const lanes: Lane[] = [
  {
    audience: "Developers and teams trying to move beyond chatbots into production agents.",
    demandScore: 10,
    id: "agent-deployment-tools",
    intentSeeds: ["AI Agent 部署", "AI Agent 工具调用", "Vercel AI SDK Agent", "OpenAI Agents SDK"],
    matchTerms: ["agent", "agents sdk", "工具调用", "多步", "workflow", "vercel ai sdk", "企业微信", "slack ai agent"],
    reviewFocus: ["tool permission boundaries", "loop control and stop conditions", "human handoff", "logs and fallback paths"],
    sourceTargets: [
      "OpenAI Agents: https://platform.openai.com/docs/guides/agents",
      "OpenAI Agents SDK: https://platform.openai.com/docs/guides/agents-sdk",
      "Vercel AI SDK Agents: https://ai-sdk.dev/docs/agents",
      "n8n AI Agent node: https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/",
    ],
    title: "AI Agent deployment, tool calling, and production workflow",
    workflowAngles: ["tool calling", "multi-step execution", "human approval", "observability", "permissions"],
  },
  {
    audience: "Teams building customer support bots, internal knowledge assistants, and document Q&A.",
    demandScore: 10,
    id: "rag-knowledge-memory",
    intentSeeds: ["RAG 知识库搭建", "AI Agent 记忆", "向量数据库教程", "企业知识库 AI"],
    matchTerms: ["rag", "知识库", "记忆", "memory", "embedding", "向量", "检索", "客服 ai"],
    reviewFocus: ["chunking and metadata", "citation and source boundaries", "privacy and retention", "evaluation set"],
    sourceTargets: [
      "OpenAI retrieval: https://platform.openai.com/docs/guides/retrieval",
      "OpenAI Agents knowledge and memory: https://platform.openai.com/docs/guides/agents",
      "LangChain docs: https://python.langchain.com/docs",
      "LlamaIndex docs: https://docs.llamaindex.ai",
    ],
    title: "RAG, knowledge base, and Agent memory",
    workflowAngles: ["document cleanup", "chunking", "embedding", "source citation", "memory policy"],
  },
  {
    audience: "Developers, solo builders, and companies deciding where and how to run models.",
    demandScore: 10,
    id: "llm-deployment-serving",
    intentSeeds: ["大模型部署教程", "LLM deployment", "vLLM 部署", "Hugging Face TGI 部署"],
    matchTerms: ["大模型", "llm", "vllm", "tgi", "gpu", "serverless", "runpod", "modal", "bentoml", "ray serve", "hugging face"],
    reviewFocus: ["GPU and memory requirements", "serving framework versions", "cold start and concurrency", "cost boundaries"],
    sourceTargets: [
      "Hugging Face docs: https://huggingface.co/docs",
      "vLLM docs: https://docs.vllm.ai",
      "OpenAI API docs: https://platform.openai.com/docs",
      "Modal docs: https://modal.com/docs",
    ],
    title: "Large model deployment, LLM serving, and GPU infrastructure",
    workflowAngles: ["GPU sizing", "serving API", "quantization", "autoscaling", "cost control"],
  },
  {
    audience: "Builders deploying open-source models locally or behind a private interface.",
    demandScore: 9,
    id: "local-open-models",
    intentSeeds: ["本地部署大模型", "Ollama 本地部署", "Open WebUI 部署", "显存不够怎么办"],
    matchTerms: ["本地", "ollama", "open webui", "lm studio", "显存", "量化", "functions", "pipelines"],
    reviewFocus: ["hardware estimation", "model size and quantization", "local API exposure", "security and privacy caveats"],
    sourceTargets: ["Ollama docs: https://docs.ollama.com", "Open WebUI docs: https://docs.openwebui.com", "Hugging Face docs: https://huggingface.co/docs"],
    title: "Local and open-source model deployment",
    workflowAngles: ["hardware check", "model download", "quantization", "local web UI", "private API"],
  },
  {
    audience: "No-code and low-code automation builders using Dify, n8n, Flowise, Coze, and webhooks.",
    demandScore: 9,
    id: "nocode-ai-automation",
    intentSeeds: ["Dify 部署教程", "n8n AI Agent", "AI 自动化工作流", "Webhook AI Agent"],
    matchTerms: ["dify", "n8n", "flowise", "coze", "webhook", "工作流", "workflow", "自动化"],
    reviewFocus: ["self-hosting vs cloud boundaries", "webhook auth", "error handling", "manual fallback"],
    sourceTargets: ["Dify Agent docs: https://docs.dify.ai/en/use-dify/build/agent", "Dify Agent node: https://docs.dify.ai/en/guides/workflow/node/agent", "n8n docs: https://docs.n8n.io"],
    title: "Dify, n8n, no-code AI automation, and workflow deployment",
    workflowAngles: ["self-hosting", "webhook", "auth", "retry", "human fallback"],
  },
  {
    audience: "Teams trying to build reusable prompt libraries instead of one-off prompts.",
    demandScore: 10,
    id: "industry-prompt-library",
    intentSeeds: ["AI 提示词大全", "ChatGPT 提示词模板", "全行业 AI 提示词", "AI prompt library"],
    matchTerms: ["提示词", "prompt", "模板库", "销售", "客服", "运营", "hr", "财务", "教育", "法务", "电商", "产品经理"],
    reviewFocus: ["input fields", "output format", "quality checks", "risk disclaimers", "versioning"],
    sourceTargets: [
      "OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering",
      "OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation",
      "Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
      "Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
    ],
    title: "Cross-industry AI prompt templates and reusable prompt libraries",
    workflowAngles: ["industry taxonomy", "input schema", "output format", "review checklist", "reuse rules"],
  },
  {
    audience: "Developers integrating OpenAI, Claude, Gemini, OpenRouter, and multi-model routing.",
    demandScore: 9,
    id: "model-api-integration",
    intentSeeds: ["OpenAI API 接入", "Claude API 限流", "Gemini API 限流", "多模型 Router 降级"],
    matchTerms: ["api", "key", "rate limit", "限流", "router", "fallback", "claude api", "gemini api", "batch api", "多模型"],
    reviewFocus: ["current model names", "rate limits", "retry behavior", "key rotation", "fallback quality"],
    sourceTargets: ["OpenAI API docs: https://platform.openai.com/docs", "Anthropic docs: https://docs.anthropic.com", "Vercel AI SDK providers: https://ai-sdk.dev/docs/foundations/providers-and-models"],
    title: "Model API integration, rate limits, and multi-model fallback",
    workflowAngles: ["server-side calls", "rate limit retry", "fallback routing", "key rotation", "cost control"],
  },
  {
    audience: "Teams putting agents and RAG into production and needing proof that they work.",
    demandScore: 8,
    id: "llm-observability-evals",
    intentSeeds: ["LLM observability", "RAG 评测", "Agent 可观测性", "promptfoo LLM 评测"],
    matchTerms: ["observability", "tracing", "评测", "eval", "promptfoo", "langsmith", "helicone", "phoenix", "日志"],
    reviewFocus: ["trace fields", "evaluation datasets", "cost logs", "failure review", "quality drift"],
    sourceTargets: ["OpenAI Evals: https://platform.openai.com/docs/guides/evals", "LangSmith docs: https://docs.smith.langchain.com", "promptfoo docs: https://www.promptfoo.dev/docs/intro/"],
    title: "LLM observability, evaluation, and production quality",
    workflowAngles: ["tracing", "eval sets", "cost tracking", "failure review", "quality scorecards"],
  },
  {
    audience: "Teams deploying MCP servers, remote tools, and enterprise chat integrations.",
    demandScore: 8,
    id: "mcp-tool-security",
    intentSeeds: ["MCP Server 部署安全", "Agent 工具权限控制", "企业微信 AI Agent", "Slack AI Agent 接入"],
    matchTerms: ["mcp", "权限", "安全", "白名单", "沙箱", "企业微信", "飞书", "slack", "tool permission"],
    reviewFocus: ["tool allowlists", "approval boundaries", "audit logs", "sandboxing", "secrets"],
    sourceTargets: ["OpenAI Agents tools: https://platform.openai.com/docs/guides/agents", "n8n credentials docs: https://docs.n8n.io/credentials/"],
    title: "MCP, tool permissions, and enterprise integration safety",
    workflowAngles: ["permissions", "approval", "sandbox", "audit logs", "enterprise IM"],
  },
  {
    audience: "Beginners searching deployment errors, API failures, and environment variable mistakes.",
    demandScore: 8,
    id: "deployment-troubleshooting",
    intentSeeds: ["Vercel build failed", "API Key 无效", "环境变量缺失", "npm command not found"],
    matchTerms: ["error", "failed", "报错", "debug", "troubleshooting", "command not found", "环境变量", "api key", "build failed", "404"],
    reviewFocus: ["reproduction", "logs", "fix order", "verification command", "avoid overgeneralized fixes"],
    sourceTargets: ["Vercel docs: https://vercel.com/docs", "OpenAI API docs: https://platform.openai.com/docs"],
    title: "AI app deployment errors and beginner troubleshooting",
    workflowAngles: ["error log", "reproduction", "fix sequence", "verification", "handoff boundary"],
  },
  {
    audience: "Business teams deciding how to use AI across departments.",
    demandScore: 9,
    id: "business-ai-workflows",
    intentSeeds: ["企业 AI 应用场景", "AI 工作流模板", "销售 AI 提示词", "客服 AI 提示词", "运营 AI 提示词"],
    matchTerms: ["销售", "客服", "运营", "hr", "财务", "法务", "电商", "教育", "产品经理", "工作流", "sop"],
    reviewFocus: ["role-specific input fields", "approval owner", "risk boundaries", "measurable output format"],
    sourceTargets: ["OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering", "Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/"],
    title: "Business department AI workflows across sales, support, ops, HR, finance, legal, and education",
    workflowAngles: ["department workflows", "SOP", "review owner", "handoff", "template library"],
  },
  {
    audience: "Freelancers and service sellers packaging AI automation work for clients.",
    demandScore: 8,
    id: "ai-service-pricing-scope",
    intentSeeds: ["AI 自动化项目报价", "AI Agent 接单", "RAG 项目报价", "Dify n8n 报价"],
    matchTerms: ["报价", "接单", "scope", "pricing", "服务", "项目", "维护", "验收", "自动化"],
    reviewFocus: ["scope boundaries", "acceptance criteria", "maintenance fee", "risk disclaimers", "no income guarantees"],
    sourceTargets: ["OpenAI API docs: https://platform.openai.com/docs", "Vercel AI SDK docs: https://ai-sdk.dev/docs", "Dify docs: https://docs.dify.ai"],
    title: "AI automation service pricing, scope, and delivery checklist",
    workflowAngles: ["scope", "pricing", "acceptance", "maintenance", "risk language"],
  },
];

async function main() {
  const publicExpansion = readJson<PublicExpansionQueue>("content/automation/public-expansion-queue.json");
  const reviewCandidates = readJson<ReviewCandidates>("content/automation/review-candidates.json");
  const waveApprovalPacket = readJson<WaveApprovalPacket>("content/automation/wave-approval-packet.json");
  const expansionFiles = new Set(publicExpansion.items.map((item) => normalizeFile(item.file)));
  const currentPackFiles = new Set(reviewCandidates.recommendedToday.map((item) => normalizeFile(item.file)));
  const waveFiles = new Set(waveApprovalPacket.files.map(normalizeFile));
  const articles = (await articleFiles()).map((file) => toCandidate(file, currentPackFiles, expansionFiles, waveFiles));
  const laneReports = lanes.map((lane) => toLaneReport(lane, articles)).sort((a, b) => b.priorityScore - a.priorityScore);
  const highPriority = laneReports.filter((lane) => lane.priorityScore >= 160);
  const lanesWithoutPublicCoverage = laneReports.filter((lane) => lane.publicCount === 0);
  const lanesWithReadyDrafts = laneReports.filter((lane) => lane.readyDraftCount > 0);
  const notReadyMatchedDrafts = laneReports.reduce((total, lane) => total + lane.notReadyMatchedDrafts, 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only search-intent lane map. Demand scores are editorial prioritization signals from broad query patterns and source review needs, not keyword-volume or traffic data.",
    },
    sourceEvidence: {
      note: "Source targets are official documentation pages for human fact review. This report does not claim measured search volume.",
      checkedCurrentSources: [
        "OpenAI Agents and Agents SDK documentation",
        "Vercel AI SDK Agents documentation",
        "Dify Agent documentation",
        "n8n AI Agent documentation",
      ],
    },
    summary: {
      highPriorityLanes: highPriority.length,
      lanes: laneReports.length,
      lanesWithReadyDrafts: lanesWithReadyDrafts.length,
      lanesWithoutPublicCoverage: lanesWithoutPublicCoverage.length,
      maxPriorityScore: laneReports[0]?.priorityScore || 0,
      notReadyMatchedDrafts,
      totalReadyDraftMatches: laneReports.reduce((total, lane) => total + lane.readyDraftCount, 0),
    },
    topLanes: laneReports.slice(0, 8),
    lanes: laneReports,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "search-intent-lane-map.json");
  const mdTarget = path.join(process.cwd(), "docs", "search-intent-lane-map.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: highPriority.length > 0 && lanesWithReadyDrafts.length === laneReports.length, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (!highPriority.length || lanesWithReadyDrafts.length !== laneReports.length) process.exitCode = 1;
}

function toCandidate(file: string, currentPackFiles: Set<string>, expansionFiles: Set<string>, waveFiles: Set<string>): Candidate {
  const article = readArticle(file);
  const relativeFile = rel(article.file);
  const status = stringValue(article.data.status);
  const noindex = typeof article.data.noindex === "boolean" ? article.data.noindex : null;
  const qualityScore = typeof article.data.qualityScore === "number" ? article.data.qualityScore : 0;
  const sourceNotes = stringValue(article.data.sourceNotes);
  const safeDraft = status === "draft" && noindex === true && article.data.humanReviewRequired === true && qualityScore >= 80 && sourceNotes.length > 0;

  return {
    category: stringValue(article.data.category),
    currentPack: currentPackFiles.has(relativeFile),
    expansionQueue: expansionFiles.has(relativeFile),
    file: relativeFile,
    noindex,
    primaryKeyword: stringValue(article.data.primaryKeyword),
    publishBatch: typeof article.data.publishBatch === "number" ? article.data.publishBatch : null,
    qualityScore,
    safeDraft,
    searchIntent: stringValue(article.data.searchIntent),
    status,
    title: stringValue(article.data.title),
    wave1: waveFiles.has(relativeFile),
  };
}

function toLaneReport(lane: Lane, articles: Candidate[]): LaneReport {
  const matched = articles.filter((article) => matchesLane(lane, article));
  const publicMatches = matched.filter((article) => article.status === "published");
  const readyDrafts = matched.filter((article) => article.safeDraft);
  const notReadyMatchedDrafts = matched.filter((article) => article.status === "draft" && !article.safeDraft);
  const currentPackCandidates = readyDrafts.filter((article) => article.currentPack);
  const expansionCandidates = readyDrafts.filter((article) => article.expansionQueue);
  const wave1Candidates = readyDrafts.filter((article) => article.wave1);
  const priorityScore =
    lane.demandScore * 20 +
    (publicMatches.length === 0 ? 70 : 0) +
    Math.min(readyDrafts.length, 8) * 6 +
    currentPackCandidates.length * 12 +
    expansionCandidates.length * 4 +
    wave1Candidates.length * 8 -
    Math.min(publicMatches.length, 5) * 8;

  return {
    ...lane,
    candidateCount: matched.length,
    currentPackCandidates: currentPackCandidates.length,
    expansionCandidates: expansionCandidates.length,
    matchedCandidates: readyDrafts.sort((a, b) => sortCandidate(a, b)).slice(0, 8),
    publicCount: publicMatches.length,
    priorityReason: buildPriorityReason(lane, publicMatches.length, readyDrafts.length, currentPackCandidates.length, wave1Candidates.length),
    priorityScore,
    readyDraftCount: readyDrafts.length,
    notReadyMatchedDrafts: notReadyMatchedDrafts.length,
    wave1Candidates: wave1Candidates.length,
  };
}

function matchesLane(lane: Lane, article: Candidate) {
  const haystack = normalizeText(
    [
      article.category,
      article.file,
      article.primaryKeyword,
      article.searchIntent,
      article.title,
    ].join(" "),
  );

  return lane.matchTerms.some((term) => haystack.includes(normalizeText(term)));
}

function sortCandidate(a: Candidate, b: Candidate) {
  return Number(b.wave1) - Number(a.wave1) ||
    Number(b.currentPack) - Number(a.currentPack) ||
    Number(b.expansionQueue) - Number(a.expansionQueue) ||
    b.qualityScore - a.qualityScore ||
    (b.publishBatch || 0) - (a.publishBatch || 0);
}

function buildPriorityReason(lane: Lane, publicCount: number, readyDraftCount: number, currentPackCount: number, wave1Count: number) {
  const reasons = [
    `demandScore=${lane.demandScore}`,
    publicCount === 0 ? "no public coverage" : `public coverage=${publicCount}`,
    `readyDrafts=${readyDraftCount}`,
    currentPackCount ? `currentPack=${currentPackCount}` : "",
    wave1Count ? `wave1=${wave1Count}` : "",
  ].filter(Boolean);

  return reasons.join("; ");
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeFile(file: string) {
  return file.replace(/\\/g, "/");
}

function normalizeText(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoEditArticles: boolean; autoMarkReview: boolean; autoPublish: boolean; note: string };
  lanes: LaneReport[];
  sourceEvidence: { checkedCurrentSources: string[]; note: string };
  summary: Record<string, number>;
  topLanes: LaneReport[];
}) {
  const lines = [
    "# Search Intent Lane Map",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It maps broad AI search-intent lanes to existing public articles and safe draft candidates. It does not claim keyword volume, impressions, clicks, or traffic.",
    "",
    "## Guardrails",
    "",
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Source Evidence",
    "",
    `- Note: ${payload.sourceEvidence.note}`,
    ...payload.sourceEvidence.checkedCurrentSources.map((source) => `- Checked: ${source}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Top Lanes",
    "",
    ...laneTable(payload.topLanes),
    "",
  ];

  for (const lane of payload.topLanes) {
    lines.push(
      `## ${lane.title}`,
      "",
      `- ID: ${lane.id}`,
      `- Audience: ${lane.audience}`,
      `- Priority score: ${lane.priorityScore}`,
      `- Priority reason: ${lane.priorityReason}`,
      `- Intent seeds: ${lane.intentSeeds.join(", ")}`,
      `- Workflow angles: ${lane.workflowAngles.join(", ")}`,
      "",
      "Review focus:",
      "",
      ...lane.reviewFocus.map((item) => `- ${item}`),
      "",
      "Source targets:",
      "",
      ...lane.sourceTargets.map((item) => `- ${item}`),
      "",
      "Matched safe draft candidates:",
      "",
      ...candidateTable(lane.matchedCandidates),
      "",
    );
  }

  lines.push("## All Lanes", "", ...laneTable(payload.lanes), "");
  return lines.join("\n");
}

function laneTable(items: LaneReport[]) {
  if (!items.length) return ["- none"];

  return [
    "| Score | Demand | Public | Ready drafts | Current pack | Wave 1 | Expansion | Not ready matched drafts | Lane | Reason |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => (
      `| ${item.priorityScore} | ${item.demandScore} | ${item.publicCount} | ${item.readyDraftCount} | ${item.currentPackCandidates} | ${item.wave1Candidates} | ${item.expansionCandidates} | ${item.notReadyMatchedDrafts} | ${item.title} | ${item.priorityReason} |`
    )),
  ];
}

function candidateTable(items: Candidate[]) {
  if (!items.length) return ["- none"];

  return [
    "| Current | Wave 1 | Expansion | Score | Batch | Category | Primary keyword | Title | File |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...items.map((item) => (
      `| ${item.currentPack} | ${item.wave1} | ${item.expansionQueue} | ${item.qualityScore} | ${item.publishBatch ?? ""} | ${item.category} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`
    )),
  ];
}

void main();

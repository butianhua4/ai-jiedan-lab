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

type TopicSeed = {
  audience: string;
  priority: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  terms: string[];
  topic: string;
  workflowAngles: string[];
};

type Candidate = {
  category: string;
  file: string;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  title: string;
};

type TopicCoverage = {
  audience: string;
  candidates: Candidate[];
  draftMatches: number;
  gapScore: number;
  nextAction: string;
  publicMatches: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  topic: string;
  workflowAngles: string[];
};

const officialSources = {
  anthropic: "Anthropic docs: https://docs.anthropic.com",
  dify: "Dify docs: https://docs.dify.ai",
  huggingFace: "Hugging Face docs: https://huggingface.co/docs",
  langChain: "LangChain docs: https://python.langchain.com/docs",
  llamaIndex: "LlamaIndex docs: https://docs.llamaindex.ai",
  n8n: "n8n docs: https://docs.n8n.io",
  ollama: "Ollama docs: https://docs.ollama.com",
  openaiAgents: "OpenAI Agents docs: https://platform.openai.com/docs/guides/agents",
  openaiApi: "OpenAI API docs: https://platform.openai.com/docs",
  openaiRetrieval: "OpenAI retrieval docs: https://platform.openai.com/docs/guides/retrieval",
  vercelAiSdk: "Vercel AI SDK docs: https://ai-sdk.dev/docs",
  vllm: "vLLM docs: https://docs.vllm.ai",
};

const topics: TopicSeed[] = [
  {
    audience: "想把 AI 应用上线的新手开发者、独立站站长、AI 服务提供者",
    priority: 100,
    reviewFocus: ["核对当前官方部署文档", "检查环境变量、API Key、限流、日志、回滚和 smoke check", "避免承诺一次部署就稳定运行"],
    searchQueries: ["大模型部署教程", "AI 应用部署教程", "OpenAI API 部署教程", "Vercel AI SDK 部署"],
    sourceTargets: [officialSources.openaiApi, officialSources.vercelAiSdk, officialSources.anthropic],
    terms: ["大模型部署", "AI 部署", "AI 应用部署", "OpenAI API", "Claude API", "Gemini API", "Vercel AI SDK", "部署"],
    topic: "大模型和 AI 应用部署",
    workflowAngles: ["环境变量", "API Key", "限流重试", "上线检查", "回滚"],
  },
  {
    audience: "正在把聊天助手升级成工作流或内部工具的人",
    priority: 98,
    reviewFocus: ["区分 Agent、Workflow、普通聊天机器人", "核对工具调用、状态、人工接管和日志边界", "避免承诺全自动完成业务结果"],
    searchQueries: ["AI Agent 部署教程", "Agent 工具调用教程", "AI 工作流部署", "Agent 人工审核流程"],
    sourceTargets: [officialSources.openaiAgents, officialSources.vercelAiSdk, officialSources.langChain],
    terms: ["Agent", "AI Agent", "工具调用", "tool calling", "workflow", "Webhook", "人工审核", "生产上线"],
    topic: "Agent 部署、工具调用和工作流",
    workflowAngles: ["工具白名单", "多步执行", "人工确认", "失败重试", "日志追踪"],
  },
  {
    audience: "客服知识库、企业内部问答、文档检索项目负责人",
    priority: 96,
    reviewFocus: ["区分 RAG、微调和普通提示词", "核对切分、embedding、召回、引用和评测说法", "说明隐私、幻觉和人工复核边界"],
    searchQueries: ["RAG 知识库搭建教程", "企业知识库 AI 部署", "向量数据库 RAG 教程", "RAG 评测怎么做"],
    sourceTargets: [officialSources.openaiRetrieval, officialSources.langChain, officialSources.llamaIndex, officialSources.huggingFace],
    terms: ["RAG", "知识库", "向量", "vector", "embedding", "检索", "引用", "召回", "pgvector", "Qdrant", "Pinecone", "Chroma"],
    topic: "RAG、知识库和向量检索",
    workflowAngles: ["文档清洗", "chunk", "embedding", "metadata", "引用来源", "测试集"],
  },
  {
    audience: "想低成本或本地运行模型的开发者、团队和爱好者",
    priority: 92,
    reviewFocus: ["核对显存、量化、模型大小和上下文要求", "区分 Ollama、LM Studio、Open WebUI、vLLM 和 TGI", "不要暗示本地部署一定更省钱或更安全"],
    searchQueries: ["本地部署大模型教程", "Ollama 本地部署", "Open WebUI Ollama 部署", "本地大模型显存不够"],
    sourceTargets: [officialSources.ollama, officialSources.vllm, officialSources.huggingFace],
    terms: ["本地部署", "Ollama", "LM Studio", "Open WebUI", "显存", "量化", "GPU", "本地模型"],
    topic: "本地模型和开源模型部署",
    workflowAngles: ["硬件估算", "模型下载", "本地 API", "量化", "网页聊天"],
  },
  {
    audience: "需要自部署或托管 LLM 服务的工程团队",
    priority: 90,
    reviewFocus: ["核对 serving 框架版本和部署方式", "说明冷启动、并发、成本、GPU、扩缩容和监控", "避免把 benchmark 写成项目保证"],
    searchQueries: ["vLLM 部署教程", "TGI 部署教程", "RunPod Serverless 大模型部署", "Modal Serverless GPU LLM"],
    sourceTargets: [officialSources.vllm, officialSources.huggingFace],
    terms: ["vLLM", "TGI", "Text Generation Inference", "RunPod", "Modal", "Ray Serve", "BentoML", "TensorRT-LLM", "Serverless GPU"],
    topic: "LLM Serving、GPU 和托管推理",
    workflowAngles: ["在线 serving", "并发", "GPU", "冷启动", "成本延迟"],
  },
  {
    audience: "用 Dify、n8n、Flowise、Coze 做自动化和知识库的人",
    priority: 88,
    reviewFocus: ["核对自部署和云端功能边界", "检查 Webhook、权限、连接器、错误处理和人工兜底", "避免引导群发、绕规则或站外交易"],
    searchQueries: ["Dify 部署教程", "n8n AI Agent 自托管", "Flowise 本地部署", "Dify 工作流错误处理"],
    sourceTargets: [officialSources.dify, officialSources.n8n],
    terms: ["Dify", "n8n", "Flowise", "Coze", "Webhook", "连接器", "工作流", "自托管"],
    topic: "Dify、n8n、Flowise 和无代码 AI 自动化",
    workflowAngles: ["自部署", "Webhook", "鉴权", "错误处理", "人工兜底"],
  },
  {
    audience: "正在接入 OpenAI、Claude、Gemini、OpenRouter 等 API 的开发者",
    priority: 86,
    reviewFocus: ["核对 API 端点、模型名、限流、费用和降级方式", "检查 key 安全和重试逻辑", "避免把过期模型名或价格写死为结论"],
    searchQueries: ["OpenAI API Next.js", "Claude API 接入", "Gemini API Next.js", "API rate limit 怎么办"],
    sourceTargets: [officialSources.openaiApi, officialSources.anthropic],
    terms: ["OpenAI API", "Claude API", "Gemini API", "OpenRouter", "API Key", "rate limit", "限流", "Batch API", "多模型"],
    topic: "模型 API 接入、限流和多模型降级",
    workflowAngles: ["服务端调用", "限流重试", "降级模型", "成本控制", "Key 轮换"],
  },
  {
    audience: "把 Agent 或 RAG 做进生产环境的团队",
    priority: 84,
    reviewFocus: ["核对日志、tracing、评测和成本字段", "区分观测、评测、监控和人工复盘", "不要把单次评测结果当成长期质量保证"],
    searchQueries: ["LLM observability 教程", "Agent 可观测性", "RAG 评测", "promptfoo LLM 评测"],
    sourceTargets: [officialSources.openaiAgents, officialSources.langChain, officialSources.llamaIndex],
    terms: ["observability", "可观测性", "日志", "Tracing", "评测", "Ragas", "promptfoo", "Helicone", "Phoenix", "LangSmith"],
    topic: "LLM 观测、评测和上线质量",
    workflowAngles: ["日志", "tracing", "评测集", "成本", "失败复盘"],
  },
  {
    audience: "部署 MCP Server、Agent 工具、企业 IM 接入的人",
    priority: 82,
    reviewFocus: ["核对工具权限、沙箱、审批、审计日志和密钥边界", "提醒读写执行要分级", "避免给出绕过权限或自动执行敏感操作的建议"],
    searchQueries: ["MCP Server 部署安全", "Agent 工具权限控制", "企业微信 AI Agent", "Slack AI Agent 接入"],
    sourceTargets: [officialSources.openaiAgents, officialSources.n8n],
    terms: ["MCP", "MCP Server", "权限", "沙箱", "白名单", "企业微信", "飞书", "Slack", "工具权限"],
    topic: "MCP、工具权限和企业集成安全",
    workflowAngles: ["工具权限", "审批", "沙箱", "审计日志", "IM 接入"],
  },
  {
    audience: "部署失败、API 报错、环境变量缺失的新手",
    priority: 78,
    reviewFocus: ["保留错误现象、原因、修复步骤和验证命令", "不要把偶然修复写成通用结论", "补齐官方文档或日志来源"],
    searchQueries: ["Vercel build failed", "Vercel 部署后 404", "API Key 无效或缺失", "环境变量缺失怎么办"],
    sourceTargets: [officialSources.vercelAiSdk, officialSources.openaiApi],
    terms: ["build failed", "404", "invalid", "missing", "API Key 无效", "环境变量", "部署失败", "报错"],
    topic: "AI 应用部署报错和排查",
    workflowAngles: ["错误日志", "复现", "修复顺序", "验证命令", "项目边界"],
  },
];

async function main() {
  const articles = (await articleFiles()).map(toArticleSummary);
  const currentPackFiles = loadFileSet("content/automation/publish-readiness-pack.json", (payload) => asArray(payload.items));
  const plannedReviewFiles = loadFileSet("content/automation/review-batch-plan.json", (payload) =>
    asArray(payload.batches).flatMap((batch) => (hasCandidates(batch) ? asArray(batch.candidates) : [])),
  );
  const deploymentArticles = articles.filter(isDeploymentArticle);
  const coverage = topics.map((topic) => buildCoverage(topic, deploymentArticles)).sort((a, b) => b.gapScore - a.gapScore || a.topic.localeCompare(b.topic));
  const allCandidateFiles = coverage.flatMap((item) => item.candidates.map((candidate) => candidate.file));
  const unsafeCandidates = coverage.flatMap((item) => item.candidates.filter((candidate) => !isSafeCandidate(articles.find((article) => article.file === candidate.file))));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This coverage matrix is read-only. It organizes deployment, Agent, RAG, and model infrastructure drafts for manual review and does not claim measured traffic.",
    },
    sourceEvidence: {
      note: "Official docs are source targets for human fact review. Search queries are broad intent seeds, not keyword-volume data.",
      officialSources: [...new Set(Object.values(officialSources))],
    },
    summary: {
      currentPackDeploymentItems: [...currentPackFiles].filter((file) => deploymentArticles.some((article) => article.file === file)).length,
      deploymentDrafts: deploymentArticles.filter((article) => article.status === "draft").length,
      deploymentPublicArticles: deploymentArticles.filter((article) => article.status === "published").length,
      plannedDeploymentItems: [...plannedReviewFiles].filter((file) => deploymentArticles.some((article) => article.file === file)).length,
      reviewReadyDeploymentDrafts: deploymentArticles.filter(isReviewReady).length,
      topics: topics.length,
      topicsWithoutPublicCoverage: coverage.filter((item) => item.publicMatches === 0).length,
      topicsWithReadyCandidates: coverage.filter((item) => item.candidates.length > 0).length,
      totalCandidateMentions: allCandidateFiles.length,
      uniqueCandidateFiles: new Set(allCandidateFiles).size,
      unsafeCandidateItems: unsafeCandidates.length,
    },
    coverage,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "ai-deployment-coverage.json");
  const mdTarget = path.join(process.cwd(), "docs", "ai-deployment-coverage.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, reviewReadyDeploymentDrafts: payload.summary.reviewReadyDeploymentDrafts, topics: payload.summary.topics, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
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

function buildCoverage(topic: TopicSeed, articles: ArticleSummary[]): TopicCoverage {
  const matches = articles.filter((article) => matchesTopic(article, topic));
  const publicMatches = matches.filter((article) => article.status === "published").length;
  const draftMatches = matches.filter((article) => article.status === "draft").length;
  const candidates = matches.filter(isReviewReady).sort(compareCandidate).slice(0, 5).map(toCandidate);
  const gapScore = topic.priority + (publicMatches === 0 ? 70 : Math.max(0, 20 - publicMatches * 4)) + candidates.length * 10 + Math.min(draftMatches, 12);

  return {
    audience: topic.audience,
    candidates,
    draftMatches,
    gapScore,
    nextAction: candidates.length
      ? "Use these draft candidates in manual review; keep status=draft/noindex until explicit approval."
      : "Create or expand draft coverage before adding this topic to a review batch.",
    publicMatches,
    reviewFocus: topic.reviewFocus,
    searchQueries: topic.searchQueries,
    sourceTargets: topic.sourceTargets,
    topic: topic.topic,
    workflowAngles: topic.workflowAngles,
  };
}

function isDeploymentArticle(article: ArticleSummary) {
  const text = searchableText(article);
  return topics.some((topic) => topic.terms.some((term) => text.includes(term.toLowerCase())));
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex === true && article.sourceNotes && article.humanReviewRequired === true && article.qualityScore >= 100;
}

function isSafeCandidate(article: ArticleSummary | undefined) {
  return Boolean(article && article.status === "draft" && article.noindex === true && article.humanReviewRequired === true);
}

function matchesTopic(article: ArticleSummary, topic: TopicSeed) {
  const text = searchableText(article);
  return topic.terms.some((term) => text.includes(term.toLowerCase()));
}

function compareCandidate(a: ArticleSummary, b: ArticleSummary) {
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  return a.slug.localeCompare(b.slug);
}

function toCandidate(article: ArticleSummary): Candidate {
  return {
    category: article.category,
    file: article.file,
    primaryKeyword: article.primaryKeyword,
    publishBatch: article.publishBatch,
    qualityScore: article.qualityScore,
    searchIntent: article.searchIntent,
    title: article.title,
  };
}

function searchableText(article: ArticleSummary) {
  return `${article.title} ${article.category} ${article.primaryKeyword} ${article.slug}`.toLowerCase();
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
  coverage: TopicCoverage[];
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string };
  sourceEvidence: { note: string; officialSources: string[] };
  summary: Record<string, number>;
}) {
  const lines = [
    "# AI Deployment Coverage",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It organizes deployment, Agent, RAG, and model infrastructure drafts for manual review and does not publish anything.",
    "",
    "## Guardrails",
    "",
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Source Evidence",
    "",
    `- Note: ${payload.sourceEvidence.note}`,
    "",
    ...payload.sourceEvidence.officialSources.map((source) => `- ${source}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Coverage Matrix",
    "",
    "| Topic | Score | Public | Drafts | Ready candidates | Search queries | Top candidate |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.coverage.map((item) => (
      `| ${item.topic} | ${item.gapScore} | ${item.publicMatches} | ${item.draftMatches} | ${item.candidates.length} | ${item.searchQueries.slice(0, 2).join("<br>")} | ${item.candidates[0]?.title || ""} |`
    )),
    "",
  ];

  for (const item of payload.coverage) {
    lines.push(
      `## ${item.topic}`,
      "",
      `- Audience: ${item.audience}`,
      `- Next action: ${item.nextAction}`,
      "",
      "Workflow angles:",
      "",
      ...item.workflowAngles.map((angle) => `- ${angle}`),
      "",
      "Search queries to cover:",
      "",
      ...item.searchQueries.map((query) => `- ${query}`),
      "",
      "Review focus:",
      "",
      ...item.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "Source targets:",
      "",
      ...item.sourceTargets.map((target) => `- ${target}`),
      "",
      "Ready candidates:",
      "",
      "| Batch | Score | Category | Intent | Keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- | --- |",
      ...item.candidates.map((candidate) => (
        `| ${candidate.publishBatch ?? ""} | ${candidate.qualityScore} | ${candidate.category} | ${candidate.searchIntent} | ${candidate.primaryKeyword} | ${candidate.title} | ${candidate.file} |`
      )),
      "",
    );
  }

  return lines.join("\n");
}

void main();

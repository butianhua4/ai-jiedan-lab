import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";
import { checkFile } from "./quality-core";

type ArticleSummary = {
  category: string;
  file: string;
  noindex: boolean;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  slug: string;
  sourceNotes: boolean;
  status: string;
  title: string;
  humanReviewRequired: boolean;
};

type SourceSignal = {
  note: string;
  title: string;
  type: "official-doc" | "vendor-guide" | "search-result" | "research" | "community";
  url: string;
};

type DemandClusterSeed = {
  audience: string;
  cluster: string;
  contentAngles: string[];
  priority: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceSignals: SourceSignal[];
  terms: string[];
  why: string;
};

type DemandCluster = {
  audience: string;
  cluster: string;
  contentAngles: string[];
  draftMatches: number;
  gapScore: number;
  publicMatches: number;
  readyCandidates: ArticleSummary[];
  reviewFocus: string[];
  searchDemandNote: string;
  searchQueries: string[];
  sourceSignals: SourceSignal[];
  why: string;
};

const demandClusters: DemandClusterSeed[] = [
  {
    audience: "想把开源大模型真正跑起来的人：开发者、独立站站长、AI 工具创业者",
    cluster: "开源大模型部署：Ollama、vLLM、TGI、RunPod",
    contentAngles: [
      "本地先跑通：Ollama、LM Studio、llama.cpp 的入门边界",
      "生产推理服务：vLLM、TGI、RunPod Serverless 的选择",
      "成本和延迟：GPU、并发、量化、上下文长度的检查表",
      "OpenAI-compatible API：如何接入现有前端或 Agent",
    ],
    priority: 100,
    reviewFocus: [
      "核对部署命令、模型名称、GPU/显存要求、API 路径和版本差异",
      "不要承诺本地部署一定更省钱或更稳定",
      "必须包含 smoke check、回滚、日志、限流和成本边界",
    ],
    searchQueries: ["大模型部署教程", "Ollama 本地部署教程", "vLLM 部署教程", "RunPod vLLM serverless", "Hugging Face TGI 部署"],
    sourceSignals: [
      {
        note: "RunPod 文档把 vLLM Serverless 当成独立部署路径，适合做一篇从 endpoint 到 API 调用的教程。",
        title: "Deploy vLLM on Runpod Serverless",
        type: "official-doc",
        url: "https://docs.runpod.io/serverless/vllm/get-started",
      },
      {
        note: "RunPod 2026 指南覆盖 vLLM Docker、模型加载和生产调优，适合补充 GPU/容器部署角度。",
        title: "Deploy vLLM with Docker on Runpod",
        type: "vendor-guide",
        url: "https://www.runpod.io/articles/guides/deploy-vllm-runpod-docker",
      },
      {
        note: "LLM 部署类搜索结果集中出现 Ollama、vLLM、TGI、GPU cloud、MLOps 等组合词。",
        title: "From Prototype to Production: A Complete LLM Deployment Guide",
        type: "search-result",
        url: "https://www.spheron.network/blog/llm-deployment-guide/",
      },
    ],
    terms: ["大模型部署", "模型部署", "Ollama", "vLLM", "TGI", "RunPod", "GPU", "本地部署", "LLM"],
    why: "这是比网页部署更宽的入口词，搜索者通常已经有明确问题：跑不起来、太慢、太贵、API 接不上。",
  },
  {
    audience: "正在把聊天机器人升级成业务 Agent、工作流或内部工具的人",
    cluster: "Agent 部署、工具调用和生产安全",
    contentAngles: [
      "Agent 和普通 Chatbot 的区别",
      "工具调用 allowlist、权限、审计日志和人审",
      "Vercel AI SDK、LangGraph、CrewAI、AutoGen 的入门对比",
      "Agent 上线后的观测、失败回退和人工接管",
    ],
    priority: 96,
    reviewFocus: [
      "不要写成全自动替人完成高风险业务",
      "明确工具权限、人工确认、日志和失败处理",
      "核对 SDK/API 的当前名称和部署方式",
    ],
    searchQueries: ["AI Agent 部署教程", "Agent 工具调用教程", "AI Agent 生产环境", "LangGraph Agent 入门", "CrewAI 部署教程"],
    sourceSignals: [
      {
        note: "Agent 和工具调用正在从 demo 走向生产，部署文章需要强调权限和人工审批。",
        title: "Vercel AI SDK documentation",
        type: "official-doc",
        url: "https://ai-sdk.dev/docs",
      },
      {
        note: "OpenAI Agents SDK 是 Agent 主题的官方信号源，适合核对工具、handoff、guardrail 等概念。",
        title: "OpenAI Agents SDK",
        type: "official-doc",
        url: "https://openai.github.io/openai-agents-python/",
      },
      {
        note: "LangGraph 是 Agent 工作流搜索中的高频框架，适合做工程化和状态图解释。",
        title: "LangGraph documentation",
        type: "official-doc",
        url: "https://langchain-ai.github.io/langgraph/",
      },
    ],
    terms: ["Agent", "工具调用", "tool calling", "LangGraph", "CrewAI", "AutoGen", "人审", "workflow"],
    why: "Agent 是当前 AI 应用搜索里的大词，但文章必须从权限、状态和人工接管切入，才能比泛泛介绍更有用。",
  },
  {
    audience: "想让 Agent 记住用户、项目、偏好和流程的开发者与团队",
    cluster: "Agent 记忆：短期记忆、长期记忆、RAG、Postgres",
    contentAngles: [
      "记忆不是简单向量库：facts、events、procedures 的拆分",
      "Postgres/pgvector 记忆表结构",
      "RAG 知识库和用户记忆的边界",
      "记忆清理、去重、过期、隐私和撤回",
    ],
    priority: 94,
    reviewFocus: [
      "区分知识库 RAG 和用户记忆",
      "必须有隐私、删除、去重、引用和人工纠错边界",
      "避免宣称记忆层能自动解决幻觉",
    ],
    searchQueries: ["AI Agent 记忆怎么做", "Agent memory RAG", "AI Agent 长期记忆", "pgvector Agent memory", "RAG 和记忆区别"],
    sourceSignals: [
      {
        note: "2026 RAG/Agent 讨论明显关注 structured memory、temporal/confidence/relationship 等维度。",
        title: "Self-Aware Vector Embeddings for Retrieval-Augmented Generation",
        type: "research",
        url: "https://arxiv.org/abs/2604.20598",
      },
      {
        note: "社区讨论集中在“vector DB 不是 memory”，适合做反常识型解释文章。",
        title: "Vector dbs aren't memory",
        type: "community",
        url: "https://www.reddit.com/r/Rag/comments/1qjvqd4/vector_dbs_arent_memory_learned_this_the_hard_way/",
      },
      {
        note: "RAG 记忆教程开始把 pgvector、agent orchestration 和 retrieval strategy 放在一起讲。",
        title: "Memory and RAG Tutorial",
        type: "official-doc",
        url: "https://docs.agenticgokit.com/tutorials/getting-started/memory-and-rag",
      },
    ],
    terms: ["记忆", "memory", "RAG", "pgvector", "Postgres", "长期记忆", "短期记忆", "向量"],
    why: "用户明确点名“记忆板块”，这个方向能从技术教程、架构设计、隐私合规三个层面持续扩展。",
  },
  {
    audience: "企业知识库、客服机器人、内部搜索、文档问答负责人",
    cluster: "RAG、知识库、向量数据库和引用溯源",
    contentAngles: [
      "RAG 知识库搭建流程：清洗、切分、嵌入、召回、引用",
      "Chroma、Qdrant、Pinecone、Supabase pgvector 的选择",
      "检索不到内容、引用错误、上下文太贵的排查",
      "RAG 评测：测试集、Ragas、promptfoo、人工抽检",
    ],
    priority: 92,
    reviewFocus: [
      "把 RAG、微调、提示词模板区分清楚",
      "必须写明引用、来源、权限和失败兜底",
      "不要把 demo 成功写成生产质量保证",
    ],
    searchQueries: ["RAG 知识库搭建教程", "向量数据库教程", "企业知识库 AI 部署", "RAG 检索不到内容", "RAG 评测教程"],
    sourceSignals: [
      {
        note: "RAG 生产讨论关注 deterministic ingestion、structured storage 和 retrieval 失败问题。",
        title: "Is anyone still running pure vector RAG in production in 2026",
        type: "community",
        url: "https://www.reddit.com/r/Rag/comments/1t9v93f/is_anyone_still_running_pure_vector_rag_in/",
      },
      {
        note: "结构化 linked data 作为 agent retrieval memory layer，是 RAG 内容升级的研究信号。",
        title: "Structured Linked Data as a Memory Layer for Agent-Orchestrated Retrieval",
        type: "research",
        url: "https://arxiv.org/abs/2603.10700",
      },
      {
        note: "RAG 工程主题天然能和 vector database、knowledge base、agent memory 相互内链。",
        title: "Pinecone RAG learning center",
        type: "official-doc",
        url: "https://www.pinecone.io/learn/retrieval-augmented-generation/",
      },
    ],
    terms: ["RAG", "知识库", "向量数据库", "vector", "检索", "引用", "embedding", "Chroma", "Qdrant", "Pinecone"],
    why: "RAG 是搜索面很宽的稳定主题，适合承接企业知识库、客服、内部文档问答和 Agent 记忆流量。",
  },
  {
    audience: "运营、销售、客服、HR、教育、财务、法务、产品等非技术岗位",
    cluster: "全行业 AI 提示词和工作流模板",
    contentAngles: [
      "按岗位给可复制提示词：销售、客服、运营、HR、财务、教育",
      "从提示词升级到工作流：输入字段、输出格式、质检、反例",
      "提示词库版本管理、团队知识库和审批",
      "行业提示词包如何变成可售模板或服务入口",
    ],
    priority: 90,
    reviewFocus: [
      "避免空泛万能提示词，必须给输入字段、输出结构和质检标准",
      "高风险行业必须保留专业判断和人工复核",
      "不要承诺转化率、收入或法律/医疗结果",
    ],
    searchQueries: ["AI 提示词大全", "销售 AI 提示词", "客服 AI 提示词", "HR AI 提示词", "运营 AI 提示词", "企业 AI 提示词模板"],
    sourceSignals: [
      {
        note: "2026 商业提示词搜索结果集中覆盖 sales、marketing、support、HR、operations 等岗位。",
        title: "AI Prompt Templates for Business",
        type: "search-result",
        url: "https://ai-prompts-pro.com/blog/ai-prompt-templates-business",
      },
      {
        note: "提示词库类页面通常按业务职能分类，说明“全行业/全岗位”入口值得做集合页。",
        title: "Business Prompt Templates",
        type: "search-result",
        url: "https://sensara.io/prompts/",
      },
      {
        note: "销售提示词结果强调 discovery call brief、客户痛点和 follow-up，适合做可交付工作流。",
        title: "AI Prompts for Sales",
        type: "search-result",
        url: "https://www.mrprompts.ai/learn/ai-prompts-for-sales",
      },
    ],
    terms: ["提示词", "prompt", "销售", "客服", "运营", "HR", "财务", "教育", "行业"],
    why: "这是用户特别要求的“全行业使用 AI 的提示词”，搜索面宽，适合先做总入口，再拆岗位长尾。",
  },
  {
    audience: "低代码/无代码自动化接单者、内部工具负责人、小团队运营",
    cluster: "Dify、n8n、Coze、Flowise、MCP 自动化部署",
    contentAngles: [
      "Dify workflow 和 Agent 怎么选",
      "n8n AI Agent webhook、知识库和记忆",
      "MCP server 部署安全和工具白名单",
      "无代码自动化项目怎么报价、验收和运维",
    ],
    priority: 86,
    reviewFocus: [
      "核对平台连接器、webhook、权限和部署限制",
      "避免鼓励群发、绕过平台规则或抓取隐私数据",
      "写清楚人工审批和客户验收边界",
    ],
    searchQueries: ["Dify 部署教程", "n8n AI 自动化教程", "MCP 使用教程", "Flowise 本地部署", "Coze Bot 发布"],
    sourceSignals: [
      {
        note: "Dify 官方文档可用于核对 workflow、knowledge、model provider 等术语。",
        title: "Dify documentation",
        type: "official-doc",
        url: "https://docs.dify.ai/",
      },
      {
        note: "n8n 官方文档覆盖 AI Agent、webhook、credentials，适合核对安全边界。",
        title: "n8n documentation",
        type: "official-doc",
        url: "https://docs.n8n.io/",
      },
      {
        note: "MCP 官方文档是工具协议和 server/client 概念的事实来源。",
        title: "Model Context Protocol documentation",
        type: "official-doc",
        url: "https://modelcontextprotocol.io/docs",
      },
    ],
    terms: ["Dify", "n8n", "Coze", "Flowise", "MCP", "Webhook", "自动化", "工作流"],
    why: "这类词同时覆盖搜索流量和可售服务，适合从教程、报价、验收、风控四个角度铺内容。",
  },
  {
    audience: "需要把 AI API 接进产品、网站、SaaS 原型的人",
    cluster: "AI API 接入、限流、成本和多模型路由",
    contentAngles: [
      "OpenAI/Claude/Gemini/OpenRouter API 接入",
      "rate limit、重试、降级、队列和缓存",
      "多模型 fallback、router、AI Gateway",
      "API key 安全、环境变量、日志脱敏",
    ],
    priority: 82,
    reviewFocus: [
      "核对 SDK 名称、API endpoint、限流概念和错误码",
      "必须强调密钥安全、服务端代理和日志脱敏",
      "不要虚构价格或模型能力",
    ],
    searchQueries: ["OpenAI API 接入教程", "Claude API rate limit", "Gemini API 限流", "OpenRouter API 教程", "AI API key 安全"],
    sourceSignals: [
      {
        note: "OpenAI API 文档是模型、responses、tool calling 和 key 管理的事实源。",
        title: "OpenAI API documentation",
        type: "official-doc",
        url: "https://platform.openai.com/docs",
      },
      {
        note: "Anthropic 文档可核对 Claude API、rate limit 和 SDK 细节。",
        title: "Anthropic Claude API documentation",
        type: "official-doc",
        url: "https://docs.anthropic.com/",
      },
      {
        note: "Vercel AI Gateway 和多 provider 路由适合做成本、fallback、可观测性专题。",
        title: "Vercel AI Gateway",
        type: "official-doc",
        url: "https://vercel.com/docs/ai-gateway",
      },
    ],
    terms: ["OpenAI API", "Claude API", "Gemini API", "OpenRouter", "限流", "rate limit", "API Key", "fallback", "router"],
    why: "API 接入和报错是明确搜索意图，能和工具页、报价页、部署教程形成内链闭环。",
  },
  {
    audience: "准备把 AI 应用交付给客户或团队使用的人",
    cluster: "LLM 观测、评测、日志和上线后质量",
    contentAngles: [
      "Promptfoo、Ragas、LangSmith、Helicone、Phoenix 的用途",
      "上线前测试集和人工抽检",
      "日志、成本、延迟、错误率和用户反馈",
      "RAG/Agent 失败案例复盘模板",
    ],
    priority: 78,
    reviewFocus: [
      "不要把评测分数写成绝对质量保证",
      "明确日志隐私、数据脱敏和留存边界",
      "给出人工抽检和回滚流程",
    ],
    searchQueries: ["LLM observability 教程", "RAG 评测教程", "promptfoo 入门", "LangSmith 教程", "AI 应用日志监控"],
    sourceSignals: [
      {
        note: "Promptfoo 是 LLM eval 搜索中的常见工具，适合做上线前测试专题。",
        title: "promptfoo documentation",
        type: "official-doc",
        url: "https://www.promptfoo.dev/docs/intro/",
      },
      {
        note: "Ragas 是 RAG 评测主题的事实源之一。",
        title: "Ragas documentation",
        type: "official-doc",
        url: "https://docs.ragas.io/",
      },
      {
        note: "Helicone 覆盖 LLM observability、cost、latency、logs，适合做运维类内容。",
        title: "Helicone documentation",
        type: "official-doc",
        url: "https://docs.helicone.ai/",
      },
    ],
    terms: ["observability", "评测", "evaluation", "Ragas", "promptfoo", "LangSmith", "Helicone", "Phoenix", "日志"],
    why: "部署之后的质量和成本问题会持续出现，适合承接更成熟的搜索需求，也能提高文章可信度。",
  },
];

async function main() {
  const articles = (await articleFiles()).map(toArticleSummary);
  const clusters = demandClusters
    .map((cluster) => buildCluster(cluster, articles))
    .sort((a, b) => b.gapScore - a.gapScore || a.cluster.localeCompare(b.cluster));
  const clustersWithoutPublicCoverage = clusters.filter((cluster) => cluster.publicMatches === 0).length;
  const readyCandidateFiles = new Set(clusters.flatMap((cluster) => cluster.readyCandidates.map((item) => item.file)));
  const externalSourceSignals = clusters.reduce((sum, cluster) => sum + cluster.sourceSignals.length, 0);
  const unsafeClusters = clusters.filter(
    (cluster) =>
      cluster.searchQueries.length < 4 ||
      cluster.sourceSignals.length < 2 ||
      cluster.reviewFocus.length < 3 ||
      cluster.contentAngles.length < 3,
  );

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      trafficClaim: "not-included",
      note: "Read-only broad AI demand brief. It prioritizes likely search-demand themes from local inventory plus external source signals, but does not claim measured traffic or keyword volume.",
    },
    summary: {
      clusters: clusters.length,
      clustersWithoutPublicCoverage,
      clustersWithReadyCandidates: clusters.filter((cluster) => cluster.readyCandidates.length > 0).length,
      externalSourceSignals,
      publicArticles: articles.filter((article) => article.status === "published").length,
      readyCandidateFiles: readyCandidateFiles.size,
      reviewReadyDrafts: articles.filter(isReviewReady).length,
      unsafeClusters: unsafeClusters.length,
    },
    nextActions: [
      "Use this brief to prioritize human review of high-intent AI deployment, Agent, memory, RAG, prompt, and automation drafts.",
      "Do not create traffic claims from this report; connect Search Console or Analytics before reporting impressions or clicks.",
      "Do not run mark:review or publish commands until a human approves specific files.",
      "If expanding content, create draft/noindex/humanReviewRequired articles only, then run the normal review automation.",
    ],
    unsafeClusters,
    clusters,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "autopilot-broad-ai-demand-brief.json");
  const mdTarget = path.join(process.cwd(), "docs", "autopilot-broad-ai-demand-brief.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");

  console.log(JSON.stringify({ ok: unsafeClusters.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeClusters.length) process.exitCode = 1;
}

function toArticleSummary(file: string): ArticleSummary {
  const article = readArticle(file);
  const result = checkFile(file);
  return {
    category: String(article.data.category || ""),
    file: rel(file),
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

function buildCluster(seed: DemandClusterSeed, articles: ArticleSummary[]): DemandCluster {
  const matches = articles.filter((article) => matchesCluster(article, seed));
  const publicMatches = matches.filter((article) => article.status === "published").length;
  const draftMatches = matches.filter((article) => article.status === "draft").length;
  const readyCandidates = matches.filter(isReviewReady).sort(compareCandidate).slice(0, 6);
  const publicGapBoost = publicMatches === 0 ? 100 : Math.max(0, 35 - publicMatches * 5);
  const readyBoost = Math.min(readyCandidates.length, 6) * 12;
  const externalSignalBoost = Math.min(seed.sourceSignals.length, 3) * 8;
  const inventoryBoost = Math.min(draftMatches, 25);

  return {
    audience: seed.audience,
    cluster: seed.cluster,
    contentAngles: seed.contentAngles,
    draftMatches,
    gapScore: seed.priority + publicGapBoost + readyBoost + externalSignalBoost + inventoryBoost,
    publicMatches,
    readyCandidates,
    reviewFocus: seed.reviewFocus,
    searchDemandNote: "External signals are source/research/search-result cues only; they are not measured keyword volume, rankings, impressions, clicks, traffic, or revenue.",
    searchQueries: seed.searchQueries,
    sourceSignals: seed.sourceSignals,
    why: seed.why,
  };
}

function matchesCluster(article: ArticleSummary, seed: DemandClusterSeed) {
  const text = `${article.title} ${article.category} ${article.primaryKeyword} ${article.slug}`.toLowerCase();
  return seed.terms.some((term) => text.includes(term.toLowerCase()));
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex && article.humanReviewRequired && article.sourceNotes && article.qualityScore >= 100;
}

function compareCandidate(a: ArticleSummary, b: ArticleSummary) {
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  return a.file.localeCompare(b.file);
}

function toMarkdown(payload: {
  clusters: DemandCluster[];
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
    trafficClaim: string;
  };
  nextActions: string[];
  summary: Record<string, number>;
  unsafeClusters: DemandCluster[];
}) {
  const lines = [
    "# Autopilot Broad AI Demand Brief",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It widens content planning beyond website deployment into LLM deployment, Agent deployment, memory, RAG, no-code automation, AI API operations, observability, and industry prompt packs.",
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
    "## Next Actions",
    "",
    ...payload.nextActions.map((item) => `- ${item}`),
    "",
    "## Unsafe Clusters",
    "",
    ...(payload.unsafeClusters.length ? payload.unsafeClusters.map((item) => `- ${item.cluster}`) : ["- none"]),
    "",
    "## Cluster Priority Table",
    "",
    "| Score | Public | Drafts | Ready | Sources | Queries | Cluster | Audience | Why |",
    "| --- | --- | --- | --- | --- | --- | --- | --- | --- |",
    ...payload.clusters.map(
      (cluster) =>
        `| ${cluster.gapScore} | ${cluster.publicMatches} | ${cluster.draftMatches} | ${cluster.readyCandidates.length} | ${cluster.sourceSignals.length} | ${cluster.searchQueries.length} | ${cluster.cluster} | ${cluster.audience} | ${cluster.why} |`,
    ),
    "",
  ];

  for (const cluster of payload.clusters) {
    lines.push(
      `## ${cluster.cluster}`,
      "",
      `- Audience: ${cluster.audience}`,
      `- Gap score: ${cluster.gapScore}`,
      `- Public matches: ${cluster.publicMatches}`,
      `- Draft matches: ${cluster.draftMatches}`,
      `- Search demand note: ${cluster.searchDemandNote}`,
      "",
      "Search queries to cover:",
      "",
      ...cluster.searchQueries.map((query) => `- ${query}`),
      "",
      "Content angles:",
      "",
      ...cluster.contentAngles.map((angle) => `- ${angle}`),
      "",
      "Review focus:",
      "",
      ...cluster.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "External source signals:",
      "",
      ...cluster.sourceSignals.map((source) => `- ${source.type}: [${source.title}](${source.url}) - ${source.note}`),
      "",
      "Ready draft candidates:",
      "",
      "| Batch | Score | Intent | Keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- |",
      ...cluster.readyCandidates.map(
        (item) => `| ${item.publishBatch ?? ""} | ${item.qualityScore} | ${item.searchIntent} | ${item.primaryKeyword} | ${item.title} | ${item.file} |`,
      ),
      "",
    );
  }

  return lines.join("\n");
}

void main();

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
};

type TopicSeed = {
  audience: string;
  cluster: string;
  intent: string;
  priority: number;
  reviewFocus: string[];
  searchQueries: string[];
  terms: string[];
  topic: string;
  why: string;
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

type Opportunity = {
  audience: string;
  cluster: string;
  draftMatches: number;
  gapScore: number;
  intent: string;
  nextAction: string;
  publicMatches: number;
  readyCandidates: Candidate[];
  reviewFocus: string[];
  searchDemandNote: string;
  searchQueries: string[];
  topic: string;
  why: string;
};

const topics: TopicSeed[] = [
  {
    audience: "开发者、独立站站长、AI 工具创业者",
    cluster: "AI deployment",
    intent: "informational",
    priority: 100,
    reviewFocus: ["核对官方部署文档", "检查 API Key、限流、环境变量和费用说法", "补足上线后的 smoke check 和回滚步骤"],
    searchQueries: ["大模型部署教程", "AI 应用部署 Vercel 教程", "OpenAI API 部署教程", "Claude API 部署教程"],
    terms: ["大模型部署", "模型部署", "AI 部署", "OpenAI API", "Claude API", "Gemini API", "Vercel", "API Key", "限流"],
    topic: "大模型和 AI 应用部署教程",
    why: "部署、API、限流、环境变量是新人最容易搜索也最容易踩坑的入口。",
  },
  {
    audience: "想把聊天机器人升级成工作流的人",
    cluster: "Agent and memory",
    intent: "informational",
    priority: 96,
    reviewFocus: ["解释工具调用和多步执行边界", "明确记忆、状态和人工确认的安全边界", "避免承诺全自动完成业务结果"],
    searchQueries: ["AI Agent 部署教程", "Agent 记忆怎么做", "AI Agent 工具调用教程", "AI 工作流部署"],
    terms: ["Agent", "工具调用", "多步执行", "workflow", "Webhook", "记忆", "memory", "状态"],
    topic: "Agent 部署、工具调用和记忆",
    why: "Agent、记忆和工作流是高频 AI 应用词，但需要清楚解释边界和落地步骤。",
  },
  {
    audience: "客服、知识库、企业内部工具负责人",
    cluster: "RAG and knowledge base",
    intent: "informational",
    priority: 92,
    reviewFocus: ["区分 RAG、微调和普通提示词", "核对向量库、引用、召回和质检说法", "说明失败案例和人工兜底"],
    searchQueries: ["RAG 知识库搭建教程", "企业知识库 AI 部署", "向量数据库教程", "客服知识库 AI"],
    terms: ["RAG", "知识库", "向量", "vector", "检索", "引用", "Chroma", "embedding", "召回"],
    topic: "RAG、知识库和向量检索",
    why: "很多团队会搜索知识库 AI，但真正需要的是可审核、可引用、可质检的方案。",
  },
  {
    audience: "运营、销售、客服、HR、财务、教育等非技术岗位",
    cluster: "Industry AI prompts",
    intent: "informational",
    priority: 90,
    reviewFocus: ["按行业给可复制结构", "避免空泛万能提示词", "补充输入字段、质检标准和反例"],
    searchQueries: ["AI 提示词大全", "销售 AI 提示词", "客服 AI 提示词", "运营 AI 提示词", "HR AI 提示词"],
    terms: ["提示词", "prompt", "销售", "客服", "运营", "HR", "财务", "教育", "行业"],
    topic: "全行业 AI 提示词和工作流模板",
    why: "提示词类内容搜索面宽，但需要从模板升级成行业流程，才更适合长期收录。",
  },
  {
    audience: "本地部署爱好者、开发者、低成本工具团队",
    cluster: "Local model deployment",
    intent: "informational",
    priority: 84,
    reviewFocus: ["核对显卡、内存、模型尺寸和量化要求", "区分 Ollama、vLLM、TGI 等使用场景", "不要暗示本地部署一定更省钱"],
    searchQueries: ["Ollama 本地部署教程", "vLLM 部署教程", "本地大模型部署", "开源大模型部署教程"],
    terms: ["Ollama", "vLLM", "TGI", "Hugging Face", "本地部署", "开源大模型", "GPU", "量化"],
    topic: "Ollama、vLLM 和开源模型本地部署",
    why: "本地模型部署搜索需求强，但信息变化快，必须保留人工事实核对。",
  },
  {
    audience: "正在做自动化项目、内部工具和 SaaS 原型的人",
    cluster: "No-code AI automation",
    intent: "informational",
    priority: 78,
    reviewFocus: ["明确 Dify、n8n、MCP 的适用范围", "核对连接器、Webhook 和权限风险", "避免鼓励群发、绕规则或站外交易"],
    searchQueries: ["Dify 部署教程", "n8n AI 自动化教程", "MCP 使用教程", "AI 自动化工作流教程"],
    terms: ["Dify", "n8n", "MCP", "Webhook", "自动化工作流", "连接器", "workflow"],
    topic: "Dify、n8n、MCP 和无代码 AI 自动化",
    why: "无代码 AI 自动化容易吸引搜索流量，也最需要平台规则和权限边界提醒。",
  },
  {
    audience: "遇到构建、部署、API 报错的新手",
    cluster: "Troubleshooting",
    intent: "troubleshooting",
    priority: 72,
    reviewFocus: ["保留错误现象、原因、修复步骤和验证命令", "补足版本差异和官方链接", "避免把偶然修复写成通用结论"],
    searchQueries: ["OpenAI API 报错解决", "Vercel 部署失败", "npm install 报错", "AI 应用部署 404"],
    terms: ["报错", "错误", "failed", "Error", "404", "invalid", "missing", "npm", "install", "debug"],
    topic: "AI 工具和部署报错解决",
    why: "报错类文章通常搜索意图明确，适合作为稳定长尾入口。",
  },
];

async function main() {
  const files = await articleFiles();
  const articles = files.map(toArticleSummary);
  const opportunities = topics.map((topic) => buildOpportunity(topic, articles)).sort((a, b) => b.gapScore - a.gapScore || a.topic.localeCompare(b.topic));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoPublish: false,
      note: "This backlog is based on local content inventory and broad search intent themes only. It does not claim traffic, impressions, keyword volume, or ranking data.",
    },
    totals: {
      topics: opportunities.length,
      publicArticles: articles.filter((article) => article.status === "published").length,
      reviewReadyDrafts: articles.filter(isReviewReady).length,
      topicsWithoutPublicCoverage: opportunities.filter((item) => item.publicMatches === 0).length,
      topicsWithReadyCandidates: opportunities.filter((item) => item.readyCandidates.length > 0).length,
    },
    opportunities,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "content-opportunity-backlog.json");
  const mdTarget = path.join(process.cwd(), "docs", "content-opportunity-backlog.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, json: rel(jsonTarget), markdown: rel(mdTarget), topics: opportunities.length }, null, 2));
}

function toArticleSummary(file: string): ArticleSummary {
  const article = readArticle(file);
  const result = checkFile(file);
  return {
    category: String(article.data.category || ""),
    file: rel(file),
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

function buildOpportunity(topic: TopicSeed, articles: ArticleSummary[]): Opportunity {
  const matches = articles.filter((article) => matchesTopic(article, topic));
  const publicMatches = matches.filter((article) => article.status === "published").length;
  const readyCandidates = matches.filter(isReviewReady).sort(compareCandidate).slice(0, 5).map(toCandidate);
  const draftMatches = matches.filter((article) => article.status === "draft").length;
  const missingCoverageBoost = publicMatches === 0 ? 100 : Math.max(0, 30 - publicMatches * 5);
  const candidateBoost = Math.min(readyCandidates.length, 5) * 12;
  const inventoryBoost = Math.min(draftMatches, 20);
  const gapScore = topic.priority + missingCoverageBoost + candidateBoost + inventoryBoost;

  return {
    audience: topic.audience,
    cluster: topic.cluster,
    draftMatches,
    gapScore,
    intent: topic.intent,
    nextAction: readyCandidates.length
      ? "Review the listed candidates first; keep them draft/noindex until a human approves."
      : "Create or expand draft coverage, then run the normal review automation before any publish action.",
    publicMatches,
    readyCandidates,
    reviewFocus: topic.reviewFocus,
    searchDemandNote: "Broad search-intent theme, not measured traffic or keyword volume.",
    searchQueries: topic.searchQueries,
    topic: topic.topic,
    why: topic.why,
  };
}

function matchesTopic(article: ArticleSummary, topic: TopicSeed) {
  const text = `${article.title} ${article.category} ${article.primaryKeyword} ${article.slug}`.toLowerCase();
  return topic.terms.some((term) => text.includes(term.toLowerCase()));
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex === true && article.sourceNotes && article.qualityScore >= 100;
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

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: { autoPublish: boolean; note: string };
  totals: { publicArticles: number; reviewReadyDrafts: number; topics: number; topicsWithReadyCandidates: number; topicsWithoutPublicCoverage: number };
  opportunities: Opportunity[];
}) {
  const lines = [
    "# Content Opportunity Backlog",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This backlog is read-only. It does not publish articles, mark review, or claim measured traffic.",
    "",
    "## Guardrails",
    "",
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Totals",
    "",
    `- Topics: ${payload.totals.topics}`,
    `- Public articles: ${payload.totals.publicArticles}`,
    `- Review-ready drafts: ${payload.totals.reviewReadyDrafts}`,
    `- Topics without public coverage: ${payload.totals.topicsWithoutPublicCoverage}`,
    `- Topics with ready candidates: ${payload.totals.topicsWithReadyCandidates}`,
    "",
    "## Opportunities",
    "",
    "| Topic | Score | Public | Drafts | Ready candidates | Intent | Why |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.opportunities.map((item) => (
      `| ${item.topic} | ${item.gapScore} | ${item.publicMatches} | ${item.draftMatches} | ${item.readyCandidates.length} | ${item.intent} | ${item.why} |`
    )),
    "",
  ];

  for (const item of payload.opportunities) {
    lines.push(
      `## ${item.topic}`,
      "",
      `- Cluster: ${item.cluster}`,
      `- Audience: ${item.audience}`,
      `- Search demand note: ${item.searchDemandNote}`,
      `- Next action: ${item.nextAction}`,
      "",
      "Search queries to cover:",
      "",
      ...item.searchQueries.map((query) => `- ${query}`),
      "",
      "Review focus:",
      "",
      ...item.reviewFocus.map((focus) => `- ${focus}`),
      "",
      "Ready candidates:",
      "",
      "| Batch | Score | Category | Keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- |",
      ...item.readyCandidates.map((candidate) => (
        `| ${candidate.publishBatch ?? ""} | ${candidate.qualityScore} | ${candidate.category} | ${candidate.primaryKeyword} | ${candidate.title} | ${candidate.file} |`
      )),
      "",
    );
  }

  return lines.join("\n");
}

void main();

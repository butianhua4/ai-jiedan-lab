import fs from "fs";
import path from "path";
import { articleFiles, readArticle, rel } from "./content-utils";

type PublicSurfaceInventory = {
  publicItems?: Array<{ file: string; slug: string; title: string }>;
  summary: {
    liveMissingFromSitemap: number | null;
    publicArticles: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type TrafficEvidence = {
  summary: {
    measuredTrafficSources: number;
    trafficDataAvailable: boolean;
  };
};

type ArticleIndexItem = {
  file: string;
  noindex: boolean | null;
  slug: string;
  status: string;
  title: string;
};

type ToolOpportunitySeed = {
  audience: string;
  cnQueries: string[];
  enQueries: string[];
  existingToolTerms: string[];
  id: string;
  marketTrack: "cn-first" | "global-first" | "dual-track";
  mvp: string[];
  searchTerms: string[];
  title: string;
  whyNow: string;
};

const outputJson = path.join(process.cwd(), "content", "automation", "tool-market-opportunity-map.json");
const outputMd = path.join(process.cwd(), "docs", "tool-market-opportunity-map.md");

const opportunities: ToolOpportunitySeed[] = [
  {
    id: "ppt-planner-layout-generator",
    title: "PPT 策划与美观排版助手",
    audience: "学生、运营、销售、创业者、接单交付者",
    marketTrack: "dual-track",
    whyNow: "搜索结果里 PPT 用户反复强调一键生成、自动排版、美化、PPTX 导出和可编辑性；单纯给大纲不够，要给页面级版式方案。",
    searchTerms: ["ppt", "presentation", "slides", "deck"],
    existingToolTerms: ["ppt", "presentation", "slides"],
    cnQueries: ["AI PPT 生成器", "AI PPT 一键生成", "PPT 自动排版", "PPT 美化工具", "PPT 策划模板"],
    enQueries: ["AI presentation maker", "AI PPT generator", "presentation layout generator", "pitch deck AI", "PowerPoint AI generator"],
    mvp: [
      "输入主题、受众、页数、风格，生成逐页标题、叙事目的、版式、配图建议和讲稿备注。",
      "输出可复制到 Gamma、Canva、PowerPoint Copilot、PptxGenJS 的结构化提示词。",
      "先做高质量网页工具，再做 PPTX 导出；美观度通过版式模板、配色约束和字数上限控制。",
    ],
  },
  {
    id: "spreadsheet-cleanup-assistant",
    title: "表格一键整理与清洗助手",
    audience: "运营、财务、HR、跨境卖家、客服主管、接单数据整理场景",
    marketTrack: "dual-track",
    whyNow: "Excel、Google Sheets 和 Copilot/Gemini 都在强调表格生成、公式、透视表、数据分析，说明表格整理是高频办公需求。",
    searchTerms: ["excel", "spreadsheet", "sheet", "csv", "table", "formula"],
    existingToolTerms: ["excel", "spreadsheet", "sheet", "csv", "table"],
    cnQueries: ["AI 表格整理", "Excel 数据清洗", "AI 一键整理 Excel", "CSV 数据清洗工具", "表格去重 分类 汇总"],
    enQueries: ["AI spreadsheet assistant", "Excel data cleaning AI", "CSV cleanup tool", "spreadsheet formula fixer", "AI table organizer"],
    mvp: [
      "支持粘贴 CSV/表格文本，识别列名、空值、重复、异常格式和可汇总字段。",
      "输出清洗步骤、公式建议、透视表方案、可下载 CSV。",
      "所有计算类结果标注需要人工复核，避免把 AI 输出当财务/法务事实。",
    ],
  },
  {
    id: "industry-ai-prompt-builder",
    title: "全行业 AI 提示词工作流生成器",
    audience: "销售、客服、HR、运营、行政、教育、财务等泛办公人群",
    marketTrack: "cn-first",
    whyNow: "项目内已有行业提示词自动化板块，且用户明确要求全行业提示词；这类词更适合国内搜索和社媒分发。",
    searchTerms: ["prompt", "prompts", "提示词", "行业"],
    existingToolTerms: ["prompt", "prompts"],
    cnQueries: ["AI 提示词大全", "销售 AI 提示词", "客服 AI 提示词", "HR AI 提示词", "运营 AI 提示词"],
    enQueries: ["AI prompt templates", "sales AI prompts", "customer support AI prompts", "HR AI prompts", "marketing AI prompts"],
    mvp: [
      "按行业、岗位、任务、输入资料、输出格式生成可复制提示词。",
      "每个提示词附带适用场景、禁用场景和人工校对清单。",
      "和文章库互链，形成提示词模板页、教程页、工具页三层入口。",
    ],
  },
  {
    id: "agent-deployment-planner",
    title: "Agent 部署与工具权限规划器",
    audience: "AI 应用开发者、自动化接单者、企业内部工具负责人",
    marketTrack: "dual-track",
    whyNow: "项目公开面仍缺 Agent 部署覆盖，搜索需求包含工具调用、权限、生产安全和平台部署。",
    searchTerms: ["agent", "langgraph", "crewai", "tool calling", "mcp", "部署"],
    existingToolTerms: ["agent", "mcp", "langgraph", "crewai"],
    cnQueries: ["AI Agent 部署教程", "Agent 工具调用教程", "MCP 使用教程", "LangGraph Agent 入门", "CrewAI 部署教程"],
    enQueries: ["AI agent deployment", "agent tool calling tutorial", "MCP server deployment", "LangGraph agent tutorial", "CrewAI deployment"],
    mvp: [
      "输入 Agent 目标、工具、数据权限和部署平台，输出权限矩阵、风险清单和上线步骤。",
      "内置 Vercel、Docker、本地、n8n/Dify 等常见路径。",
      "默认不建议把高权限密钥交给 Agent，输出最小权限方案。",
    ],
  },
  {
    id: "llm-deployment-cost-planner",
    title: "大模型部署成本与路径选择器",
    audience: "准备部署 Ollama、vLLM、TGI、RunPod、Hugging Face 的开发者和团队",
    marketTrack: "global-first",
    whyNow: "大模型部署是项目当前高优先级内容缺口，英文搜索可带来更高商业意图，中文教程可做入门入口。",
    searchTerms: ["llm", "ollama", "vllm", "tgi", "runpod", "huggingface", "gpu"],
    existingToolTerms: ["llm", "gpu", "vllm", "ollama", "runpod", "huggingface"],
    cnQueries: ["大模型部署教程", "Ollama 本地部署教程", "vLLM 部署教程", "RunPod vLLM serverless", "Hugging Face TGI 部署"],
    enQueries: ["LLM deployment tutorial", "Ollama local deployment", "vLLM deployment", "RunPod vLLM serverless", "Hugging Face TGI deploy"],
    mvp: [
      "输入模型大小、并发、延迟目标、预算，输出本地/GPU 云/API 的选择建议。",
      "给出部署前检查清单、成本提醒、监控指标和回滚方案。",
      "不声称实时价格，价格字段作为用户输入或人工更新。",
    ],
  },
  {
    id: "memory-rag-architecture-planner",
    title: "Agent 记忆与 RAG 架构规划器",
    audience: "做知识库、客服机器人、企业 Agent 的开发者和运营负责人",
    marketTrack: "dual-track",
    whyNow: "用户明确要求记忆板块；项目已有 Memory/RAG 自动化，但公开文章覆盖不足。",
    searchTerms: ["memory", "rag", "vector", "pgvector", "knowledge base", "记忆"],
    existingToolTerms: ["memory", "rag", "vector"],
    cnQueries: ["AI Agent 记忆怎么做", "Agent memory RAG", "AI Agent 长期记忆", "pgvector Agent memory", "RAG 和记忆区别"],
    enQueries: ["AI agent memory", "agent memory RAG", "long term memory agent", "pgvector agent memory", "RAG memory architecture"],
    mvp: [
      "输入资料类型、更新频率、隐私等级、检索目标，输出短期记忆/长期记忆/RAG 的架构选择。",
      "生成数据分层、向量库、权限、评测和删除策略。",
      "对隐私、客户数据和不可逆上传给出明显警示。",
    ],
  },
  {
    id: "ai-api-routing-cost-checker",
    title: "AI API 接入、限流与成本路由检查器",
    audience: "SaaS、内部工具、接单项目开发者",
    marketTrack: "global-first",
    whyNow: "API 接入、限流、密钥安全、多模型路由和成本控制是搜索高意图问题，容易转化为咨询或模板。",
    searchTerms: ["api", "rate limit", "openrouter", "cost", "routing", "key"],
    existingToolTerms: ["api", "openrouter", "rate-limit", "key", "route"],
    cnQueries: ["OpenAI API 接入教程", "Claude API 限流", "Gemini API 限流", "OpenRouter API 教程", "AI API key 安全"],
    enQueries: ["OpenAI API integration", "Claude API rate limit", "Gemini API rate limit", "OpenRouter API tutorial", "AI API key security"],
    mvp: [
      "输入模型、调用量、失败重试、预算，输出路由、缓存、降级和告警建议。",
      "生成环境变量、密钥轮换、速率限制和日志脱敏清单。",
      "不自动读取用户密钥，不在报告里保存密钥。",
    ],
  },
  {
    id: "public-seo-refresh-assistant",
    title: "公开文章标题、描述与内链刷新助手",
    audience: "站长、内容运营、独立开发者",
    marketTrack: "cn-first",
    whyNow: "当前公开文章只有 15 篇，且已有公开刷新报告显示描述、乱码、内链和搜索片段还有动作空间。",
    searchTerms: ["seo", "description", "sitemap", "public", "title"],
    existingToolTerms: ["seo", "content"],
    cnQueries: ["SEO 标题生成器", "文章描述优化", "站点地图提交", "文章内链优化", "AI SEO 工具"],
    enQueries: ["SEO title generator", "meta description optimizer", "sitemap submission checklist", "internal link tool", "AI SEO assistant"],
    mvp: [
      "输入文章标题、摘要、目标关键词，输出标题候选、描述候选和内链建议。",
      "先服务本站人工刷新，不自动改公开文章。",
      "与 Search Console/Bing/Baidu 注册清单联动。",
    ],
  },
];

async function main() {
  const [articles, publicSurface, trafficEvidence] = await Promise.all([
    loadArticleIndex(),
    readJson<PublicSurfaceInventory>("content/automation/public-surface-inventory.json"),
    readJson<TrafficEvidence>("content/automation/traffic-evidence-audit.json"),
  ]);
  const existingTools = listExistingTools();
  const publicItems = publicSurface.publicItems || [];

  const mappedOpportunities = opportunities.map((opportunity, index) => {
    const contentMatches = articles
      .filter((article) => matchesTerms([article.file, article.slug, article.title], opportunity.searchTerms))
      .slice(0, 8);
    const publicMatches = publicItems.filter((item) => matchesTerms([item.file, item.slug, item.title], opportunity.searchTerms));
    const toolMatches = existingTools.filter((tool) => matchesTerms([tool], opportunity.existingToolTerms));
    const priorityScore =
      80 +
      opportunity.cnQueries.length * 4 +
      opportunity.enQueries.length * 4 +
      (opportunity.marketTrack === "dual-track" ? 10 : 6) +
      (publicMatches.length === 0 ? 14 : 0) +
      (toolMatches.length === 0 ? 10 : 0) -
      index;

    return {
      ...opportunity,
      contentBridgeCandidates: contentMatches,
      existingToolMatches: toolMatches,
      publicMatches,
      priorityScore,
      recommendedNextAsset:
        toolMatches.length === 0
          ? "Build a lightweight interactive tool page before expanding another generic article."
          : "Refresh the existing tool page and add article-to-tool internal links.",
      safetyBoundary: {
        autoCreateArticles: false,
        autoEditPublicArticles: false,
        autoPublish: false,
        humanReviewRequired: true,
        publishConfirm: "not-included",
        trafficClaim: "not-included",
      },
    };
  });

  const platformRegistrationChecklist = [
    {
      id: "google-search-console",
      market: "global",
      needsHumanAccount: true,
      officialUrl: "https://support.google.com/webmasters/answer/9008080",
      sitemapUrl: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap",
      nextAction: "Verify site ownership, then submit sitemap in Search Console.",
    },
    {
      id: "bing-webmaster-tools",
      market: "global-and-cn-edge",
      needsHumanAccount: true,
      officialUrl: "https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed",
      sitemapUrl: "https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed",
      nextAction: "Add verified site, submit sitemap, and use URL submission for high-priority pages.",
    },
    {
      id: "baidu-search-resource-platform",
      market: "cn",
      needsHumanAccount: true,
      officialUrl: "https://ziyuan.baidu.com/dailysubmit/index",
      sitemapUrl: "https://ziyuan.baidu.com/dailysubmit/index",
      nextAction: "Register/login, verify site, then submit priority URLs where the platform allows it.",
    },
    {
      id: "wechat-zhihu-xiaohongshu-bilibili",
      market: "cn-distribution",
      needsHumanAccount: true,
      officialUrl: "manual-platform-registration",
      sitemapUrl: "not-applicable",
      nextAction: "Reserve brand accounts and repost tool-led tutorials; treat them as distribution, not canonical SEO.",
    },
    {
      id: "product-hunt-github-reddit-hacker-news",
      market: "global-distribution",
      needsHumanAccount: true,
      officialUrl: "manual-platform-registration",
      sitemapUrl: "not-applicable",
      nextAction: "Use only after tool pages are usable; launch one tool at a time with English examples.",
    },
  ];

  const sourceEvidence = {
    reportsUsed: ["public-surface-inventory", "traffic-evidence-audit", "article front matter", "app/tools route inventory"],
    marketSignalSources: [
      {
        source: "Microsoft Copilot in PowerPoint",
        url: "https://powerpoint.cloud.microsoft/create/en/copilot-in-powerpoint/",
        note: "Presentation tools emphasize AI-assisted slide creation and design, validating PPT generation demand.",
      },
      {
        source: "Canva AI Presentation Maker",
        url: "https://www.canva.com/create/ai-presentations/",
        note: "Canva positions AI presentation generation around prompt-to-deck and cohesive narrative, validating design-led output.",
      },
      {
        source: "Microsoft Copilot in Excel",
        url: "https://support.microsoft.com/en-us/office/agent-mode-in-excel-a2fd6fe4-97ac-416b-b89a-22f4d1357c7a",
        note: "Excel AI workflows include tables, charts, PivotTables and formulas, validating spreadsheet assistant demand.",
      },
      {
        source: "Gemini in Google Sheets",
        url: "https://workspace.google.com/intl/en/resources/spreadsheet-ai/",
        note: "Google positions Gemini in Sheets around creating tables and organizing data, validating table cleanup demand.",
      },
    ],
  };

  const guardrails = {
    autoCreateArticles: false,
    autoEditArticles: false,
    autoMarkReview: false,
    autoPublish: false,
    note: "Read-only tool market opportunity map. It turns searched market signals into tool/content priorities without registering accounts, publishing, or claiming traffic.",
    trafficClaim: "not-included",
  };
  const unsafeItems = mappedOpportunities.filter((item) => item.safetyBoundary.publishConfirm !== "not-included");
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails,
    sourceEvidence,
    currentSurface: {
      existingTools,
      liveMissingFromSitemap: publicSurface.summary.liveMissingFromSitemap,
      publicArticles: publicSurface.summary.publicArticles,
      trafficDataAvailable: publicSurface.summary.trafficDataAvailable || trafficEvidence.summary.trafficDataAvailable,
      measuredTrafficSources: trafficEvidence.summary.measuredTrafficSources,
      unsafeItems: publicSurface.summary.unsafeItems,
    },
    marketRecommendation: {
      primaryStrategy: "dual-track-with-cn-first-content",
      reasoning: [
        "Domestic Chinese content should move first because the current site, article inventory, and user language are Chinese, and Baidu/WeChat/Zhihu-style distribution needs localized phrasing.",
        "Global English tool pages should be built in parallel for high-intent tool searches such as AI presentation maker, AI spreadsheet assistant, LLM deployment and agent deployment.",
        "Do not wait for a large article backlog before tools: each tool page can become a search target, lead magnet, and internal-link hub.",
      ],
    },
    summary: {
      cnFirstOpportunities: mappedOpportunities.filter((item) => item.marketTrack === "cn-first").length,
      dualTrackOpportunities: mappedOpportunities.filter((item) => item.marketTrack === "dual-track").length,
      existingTools: existingTools.length,
      globalFirstOpportunities: mappedOpportunities.filter((item) => item.marketTrack === "global-first").length,
      opportunities: mappedOpportunities.length,
      platformRegistrationsNeedingHuman: platformRegistrationChecklist.filter((item) => item.needsHumanAccount).length,
      publicArticles: publicSurface.summary.publicArticles,
      publishConfirmCommandsIncluded: 0,
      searchedKeywordFamilies: sum(mappedOpportunities.map((item) => item.cnQueries.length + item.enQueries.length)),
      topToolCandidates: mappedOpportunities.slice(0, 3).map((item) => item.id),
      trafficDataAvailable: false,
      unsafeItems: unsafeItems.length,
    },
    opportunities: mappedOpportunities,
    platformRegistrationChecklist,
    nextActions: [
      "Build PPT planning/layout helper first because it has broad search demand and a clear visual-quality wedge.",
      "Build spreadsheet cleanup helper second because it matches daily office pain and can produce downloadable output.",
      "Register/verify Google Search Console, Bing Webmaster Tools, and Baidu Search Resource Platform manually before claiming any search performance data.",
      "Keep publishing broad AI deployment, Agent deployment, Memory/RAG and industry prompt articles through the existing human review gate.",
    ],
    unsafeItems,
  };

  fs.mkdirSync(path.dirname(outputJson), { recursive: true });
  fs.mkdirSync(path.dirname(outputMd), { recursive: true });
  fs.writeFileSync(outputJson, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(outputMd, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: payload.summary.unsafeItems === 0, json: rel(outputJson), markdown: rel(outputMd) }, null, 2));
}

async function loadArticleIndex(): Promise<ArticleIndexItem[]> {
  const files = await articleFiles();
  return files.map((file) => {
    const article = readArticle(file);
    const slug = String(article.data.slug || path.basename(file).replace(/\.mdx?$/, ""));
    return {
      file: rel(file),
      noindex: typeof article.data.noindex === "boolean" ? article.data.noindex : null,
      slug,
      status: String(article.data.status || "draft"),
      title: String(article.data.title || slug),
    };
  });
}

function listExistingTools() {
  const toolsDir = path.join(process.cwd(), "app", "tools");
  if (!fs.existsSync(toolsDir)) return [];
  return fs
    .readdirSync(toolsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("["))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function matchesTerms(values: string[], terms: string[]) {
  const haystack = values.join(" ").toLowerCase();
  return terms.some((term) => haystack.includes(term.toLowerCase()));
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function sum(values: number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function toMarkdown(payload: {
  currentSurface: { existingTools: string[]; liveMissingFromSitemap: number | null; measuredTrafficSources: number; publicArticles: number; trafficDataAvailable: boolean; unsafeItems: number };
  generatedAt: string;
  guardrails: Record<string, boolean | string>;
  marketRecommendation: { primaryStrategy: string; reasoning: string[] };
  nextActions: string[];
  opportunities: Array<ToolOpportunitySeed & {
    contentBridgeCandidates: ArticleIndexItem[];
    existingToolMatches: string[];
    priorityScore: number;
    publicMatches: Array<{ file: string; slug: string; title: string }>;
    recommendedNextAsset: string;
  }>;
  platformRegistrationChecklist: Array<{ id: string; market: string; needsHumanAccount: boolean; nextAction: string; officialUrl: string; sitemapUrl: string }>;
  sourceEvidence: { marketSignalSources: Array<{ note: string; source: string; url: string }>; reportsUsed: string[] };
  summary: Record<string, boolean | number | string[]>;
}) {
  const lines = [
    "# Tool Market Opportunity Map",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "## Guardrails",
    "",
    ...Object.entries(payload.guardrails).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Current Surface",
    "",
    `- Public articles: ${payload.currentSurface.publicArticles}`,
    `- Existing tools: ${payload.currentSurface.existingTools.join(", ") || "none"}`,
    `- Live missing from sitemap: ${payload.currentSurface.liveMissingFromSitemap}`,
    `- Measured traffic sources: ${payload.currentSurface.measuredTrafficSources}`,
    `- Traffic data available: ${payload.currentSurface.trafficDataAvailable}`,
    `- Unsafe items: ${payload.currentSurface.unsafeItems}`,
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${Array.isArray(value) ? value.join(", ") : value}`),
    "",
    "## Market Recommendation",
    "",
    `- Strategy: ${payload.marketRecommendation.primaryStrategy}`,
    ...payload.marketRecommendation.reasoning.map((reason) => `- ${reason}`),
    "",
    "## Source Evidence",
    "",
    ...payload.sourceEvidence.marketSignalSources.map((source) => `- ${source.source}: ${source.note} (${source.url})`),
    "",
    "## Tool Opportunities",
    "",
    "| Score | Track | Public | Tool | Content candidates | Title | Next asset |",
    "| ---: | --- | ---: | ---: | ---: | --- | --- |",
    ...payload.opportunities.map(
      (item) =>
        `| ${item.priorityScore} | ${item.marketTrack} | ${item.publicMatches.length} | ${item.existingToolMatches.length} | ${item.contentBridgeCandidates.length} | ${item.title} | ${item.recommendedNextAsset} |`,
    ),
    "",
    "## Platform Registration",
    "",
    "| Platform | Market | Human account | Official URL | Next action |",
    "| --- | --- | --- | --- | --- |",
    ...payload.platformRegistrationChecklist.map(
      (item) => `| ${item.id} | ${item.market} | ${item.needsHumanAccount} | ${item.officialUrl} | ${item.nextAction} |`,
    ),
    "",
    "## Next Actions",
    "",
    ...payload.nextActions.map((action) => `- ${action}`),
    "",
  ];

  return lines.join("\n");
}

void main();

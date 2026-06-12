import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type CommandBoundary = {
  markReviewAfterHumanApproval: string;
  publishConfirm: "not-included";
  publishDryRunAfterReview: string;
  stopBefore: string;
};

type MassMatrixItem = {
  candidateFiles: string[];
  lane: string;
  massSearchIntent: string;
  publicMatches: number;
  readyForHumanReviewPrep: boolean;
  searchSeeds: string[];
  sourceTargets: string[];
  themeTitle: string;
  unsafeReasons: string[];
};

type MassMatrix = {
  generatedAt: string;
  items: MassMatrixItem[];
  summary: {
    items: number;
    promptBlueprintSamples: number;
    trafficDataAvailable: boolean;
    unsafeItems: number;
  };
};

type PromptModuleItem = {
  deliverable: string;
  lane: string;
  primaryQuery: string;
  promptBlueprints: Array<{ module: string; title: string }>;
  publicMatches: number;
  readyForHumanReviewPrep: boolean;
  reviewCandidateFiles: string[];
  sourceTargets: string[];
  supportingQueries: string[];
  unsafeReasons: string[];
};

type PromptModulePack = {
  generatedAt: string;
  items: PromptModuleItem[];
  summary: {
    items: number;
    promptBlueprints: number;
    unsafeItems: number;
  };
};

type DeploymentItem = {
  category: string;
  file: string;
  readyForHumanReview: boolean;
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
  topic: string;
};

type DeploymentPack = {
  generatedAt: string;
  nextItems: DeploymentItem[];
  summary: {
    items: number;
    safeDraftItems: number;
    unsafeItems: number;
  };
};

type PromptTemplate = {
  copyPrompt: string;
  inputFields: string[];
  outputBlocks: string[];
  qualityChecklist: string[];
  riskControls: string[];
  title: string;
  useCase: string;
};

type PlaybookLane = {
  articleAngles: string[];
  audience: string;
  commandBoundary: CommandBoundary;
  candidateFiles: string[];
  demandReason: string;
  deploymentBridgeFiles: string[];
  laneId: string;
  matchTerms: string[];
  promptModuleBridgeFiles: string[];
  promptTemplates: PromptTemplate[];
  publicMatches: number;
  readyForHumanReviewPrep: boolean;
  riskControls: string[];
  searchQueries: string[];
  sourceTargets: string[];
  sourceThemeMatches: string[];
  title: string;
  trafficClaim: "not-included";
  unsafeReasons: string[];
};

type LaneSeed = {
  articleAngles: string[];
  audience: string;
  demandReason: string;
  id: string;
  matchTerms: string[];
  modules: string[];
  queries: string[];
  sourceTargets: string[];
  title: string;
};

const officialSources = [
  "https://platform.openai.com/docs/guides/prompt-engineering",
  "https://platform.openai.com/docs/guides/prompting",
  "https://platform.openai.com/docs/guides/prompt-generation",
  "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5",
  "https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
  "https://cloud.google.com/resources/agentspace/prompt-guide",
  "https://ai.google.dev/gemini-api/docs/models/generative-models",
  "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
  "https://vercel.com/docs/agents",
  "https://platform.openai.com/docs/guides/agents-sdk",
  "https://openai.github.io/openai-agents-js/guides/sandbox-agents/memory/",
  "https://docs.langchain.com/oss/python/deepagents/long-term-memory",
];

const laneSeeds: LaneSeed[] = [
  {
    id: "chatgpt-prompt-daquan",
    title: "ChatGPT 提示词大全和万能公式",
    audience: "刚开始用 AI 的普通用户、学生、职场新人和小团队老板",
    demandReason: "大多数人会先搜索提示词大全、ChatGPT 怎么提问、AI 指令模板，而不是先搜索框架名。",
    matchTerms: ["prompt", "提示词", "chatgpt", "copilot", "gemini"],
    modules: ["万能提示词结构", "角色目标约束", "输入变量设计", "输出格式控制", "追问和改写"],
    queries: [
      "ChatGPT 提示词大全",
      "ChatGPT 怎么提问效果最好",
      "AI 提示词万能公式",
      "提示词模板 免费",
      "Copilot prompt examples",
      "Gemini prompt guide",
      "prompt engineering guide",
      "AI prompt examples for work",
      "ChatGPT 指令怎么写",
      "AI 提示词生成器怎么用",
    ],
    articleAngles: [
      "从普通搜索词切入，给出可复制的提示词结构。",
      "把提示词拆成目标、背景、资料、格式、限制、检查六块。",
      "用同一套公式覆盖写作、表格、邮件、方案和学习场景。",
      "提醒用户不要让 AI 编造事实，缺失信息必须标 UNKNOWN。",
    ],
    sourceTargets: officialSources.slice(0, 8),
  },
  {
    id: "office-copilot-prompts",
    title: "AI 办公提示词：Word、Excel、PPT、邮件和会议",
    audience: "办公室职员、行政、运营、项目经理、创业团队",
    demandReason: "AI 办公、Copilot 提示词、PPT 自动生成、会议纪要是非技术用户更常搜的入口。",
    matchTerms: ["office", "办公", "copilot", "excel", "ppt", "word", "会议", "邮件"],
    modules: ["邮件改写", "会议纪要", "PPT 大纲", "Excel 分析", "周报总结"],
    queries: [
      "AI 办公提示词",
      "Copilot 提示词大全",
      "ChatGPT 写邮件提示词",
      "AI 生成 PPT 提示词",
      "Excel AI 数据分析提示词",
      "会议纪要 AI 提示词",
      "Word Copilot prompt",
      "AI 周报提示词",
      "AI 总结文档提示词",
      "AI 办公自动化教程",
    ],
    articleAngles: [
      "按 Word、Excel、PPT、Outlook、Teams 拆成办公场景。",
      "每个模板要求用户提供原文、目标读者和最终用途。",
      "把输出固定成摘要、待办、风险、下一步，方便直接工作流使用。",
      "保留人工复核边界，避免代签、代审批和虚构数据。",
    ],
    sourceTargets: [officialSources[3], officialSources[4], officialSources[0], officialSources[1], officialSources[5]],
  },
  {
    id: "excel-data-analysis-prompts",
    title: "Excel 和数据分析 AI 提示词",
    audience: "运营、财务助理、电商数据、销售管理和数据分析初学者",
    demandReason: "表格分析、数据透视、销售报表、异常值解释属于高频刚需，适合用模板承接搜索。",
    matchTerms: ["excel", "表格", "数据", "分析", "财务", "报表"],
    modules: ["字段解释", "异常值排查", "销售复盘", "财务摘要", "可视化建议"],
    queries: [
      "Excel AI 提示词",
      "ChatGPT 分析表格数据",
      "AI 数据分析提示词",
      "销售数据分析 prompt",
      "财务报表 AI 分析提示词",
      "Excel 透视表 AI 教程",
      "用 AI 找异常数据",
      "ChatGPT 做数据分析怎么提问",
      "AI 生成图表建议",
      "运营数据复盘提示词",
    ],
    articleAngles: [
      "要求用户粘贴字段说明和样例行，不让 AI 猜口径。",
      "输出先给数据质量检查，再给结论和下一步验证。",
      "把财务相关结果标为分析草稿，不做投资、税务或审计结论。",
      "给出 Excel、CSV、BI 看板三类后续动作。",
    ],
    sourceTargets: [officialSources[0], officialSources[1], officialSources[3], officialSources[4], officialSources[6]],
  },
  {
    id: "xiaohongshu-short-video-prompts",
    title: "小红书、短视频和直播脚本 AI 提示词",
    audience: "自媒体、短视频运营、电商主播、本地生活商家",
    demandReason: "小红书文案、短视频脚本、直播话术比技术词更大众，是内容获客的重要入口。",
    matchTerms: ["小红书", "短视频", "直播", "文案", "内容", "营销"],
    modules: ["选题生成", "爆款标题", "脚本分镜", "直播话术", "评论区回复"],
    queries: [
      "小红书 AI 提示词",
      "ChatGPT 小红书文案",
      "短视频脚本 AI 提示词",
      "直播带货话术 AI",
      "AI 爆款标题提示词",
      "抖音脚本 prompt",
      "AI 内容运营提示词",
      "自媒体 AI 提示词大全",
      "AI 改写文案提示词",
      "小红书选题生成器",
    ],
    articleAngles: [
      "围绕标题、开头、正文、互动和复盘五个模块展开。",
      "强调必须输入真实产品信息、禁用虚假体验和夸大功效。",
      "给出不同平台口吻，但不承诺爆款、涨粉或转化。",
      "把内容安全和平台规范放进人工审核清单。",
    ],
    sourceTargets: [officialSources[0], officialSources[1], officialSources[2], officialSources[5], officialSources[7]],
  },
  {
    id: "ecommerce-customer-service-prompts",
    title: "电商客服、售后和直播卖货 AI 提示词",
    audience: "淘宝、拼多多、抖店、独立站商家和客服团队",
    demandReason: "客服回复、差评处理、售后解释、直播话术是可直接落地的 AI 使用场景。",
    matchTerms: ["电商", "客服", "售后", "直播", "销售", "客户"],
    modules: ["售前咨询", "差评安抚", "退款解释", "直播卖点", "FAQ 生成"],
    queries: [
      "电商客服 AI 提示词",
      "ChatGPT 客服回复模板",
      "AI 售后话术",
      "差评回复 AI 提示词",
      "直播带货 AI 话术",
      "电商 FAQ 生成 prompt",
      "AI 客服知识库提示词",
      "客户投诉回复提示词",
      "独立站客服 AI 模板",
      "AI 生成商品卖点",
    ],
    articleAngles: [
      "按售前、售中、售后拆模板，要求输入订单事实和政策条款。",
      "输出包含回复草稿、内部备注、升级条件和禁止承诺。",
      "对退款、赔付、保修等内容设置人工确认。",
      "适合后续扩展到客服 Agent 和知识库文章。",
    ],
    sourceTargets: [officialSources[0], officialSources[1], officialSources[2], officialSources[8], officialSources[11]],
  },
  {
    id: "sales-proposal-prompts",
    title: "销售话术、报价和方案书 AI 提示词",
    audience: "销售、BD、自由职业者和咨询顾问",
    demandReason: "写报价、写方案、写跟进邮件直接对应项目转化，是项目商业目标里的强入口。",
    matchTerms: ["销售", "报价", "方案", "项目", "proposal", "邮件", "客户"],
    modules: ["需求澄清", "报价解释", "方案大纲", "跟进邮件", "异议处理"],
    queries: [
      "AI 销售话术提示词",
      "ChatGPT 写报价单",
      "AI 方案书提示词",
      "客户跟进邮件 prompt",
      "自由职业项目报价提示词",
      "AI 写商业 proposal",
      "销售异议处理提示词",
      "AI 客户需求分析",
      "ChatGPT 写项目方案",
      "AI 写投标方案提示词",
    ],
    articleAngles: [
      "把客户输入拆成目标、预算、交付物、时间、风险。",
      "输出不直接替用户承诺成交，只生成可复核草稿。",
      "将报价依据、范围边界、增项条件写清楚。",
      "可以和现有项目报价、Proposal 工具形成内链。",
    ],
    sourceTargets: [officialSources[0], officialSources[1], officialSources[3], officialSources[4], officialSources[5]],
  },
  {
    id: "hr-resume-recruiting-prompts",
    title: "简历优化、招聘和 HR AI 提示词",
    audience: "求职者、HR、招聘负责人和团队管理者",
    demandReason: "简历修改、面试题、岗位 JD 和绩效反馈是高搜索、强复用的提示词内容。",
    matchTerms: ["简历", "招聘", "hr", "面试", "岗位", "jd"],
    modules: ["简历改写", "岗位 JD", "面试题", "候选人对比", "绩效反馈"],
    queries: [
      "ChatGPT 修改简历提示词",
      "AI 简历优化 prompt",
      "招聘 JD AI 提示词",
      "面试问题 AI 生成",
      "HR Copilot prompts",
      "候选人筛选 AI 提示词",
      "绩效评语 AI 提示词",
      "AI 写岗位说明书",
      "AI 求职信提示词",
      "AI 面试准备提示词",
    ],
    articleAngles: [
      "候选人相关内容必须要求事实输入，不生成虚假经历。",
      "招聘筛选只能作为辅助草稿，不能替代公平性和合规复核。",
      "输出结构包含亮点、风险、追问和人工判断点。",
      "面向求职者和 HR 分别给模板，避免混淆用途。",
    ],
    sourceTargets: [officialSources[0], officialSources[1], officialSources[3], officialSources[4], officialSources[7]],
  },
  {
    id: "ai-agent-deploy-prompts",
    title: "AI Agent 部署、工具调用和上线排错提示词",
    audience: "想部署 Agent 的独立开发者、创业团队和技术运营",
    demandReason: "Agent 部署、工具调用、MCP、Vercel AI SDK 是技术增长入口，比单纯网页部署更贴近当前 AI 搜索。",
    matchTerms: ["agent", "部署", "工具调用", "mcp", "vercel", "ai sdk"],
    modules: ["需求转 Agent 规格", "工具调用设计", "部署检查", "日志排错", "人工审批边界"],
    queries: [
      "AI Agent 部署教程",
      "Vercel AI SDK agent deploy",
      "OpenAI Agents SDK 教程",
      "AI Agent 工具调用提示词",
      "MCP Agent 部署",
      "Agent 上线排错 prompt",
      "AI Agent human in the loop",
      "AI Agent API route deploy",
      "Agent 生产环境检查清单",
      "AI Agent 怎么上线",
    ],
    articleAngles: [
      "把 Agent 需求写成目标、工具、权限、停止条件和日志检查。",
      "每个提示词都要求人工审批高风险工具动作。",
      "结合 Vercel、OpenAI Agents SDK 和现有部署候选稿做内链。",
      "不声称性能或稳定性，只给部署前检查和排错流程。",
    ],
    sourceTargets: [officialSources[8], officialSources[9], officialSources[2], officialSources[0], officialSources[11]],
  },
  {
    id: "llm-deployment-troubleshooting-prompts",
    title: "大模型部署、本地模型和 API 排错提示词",
    audience: "部署大模型 API、本地模型、推理服务和 AI 应用的开发者",
    demandReason: "大模型部署、API 报错、推理延迟、环境变量和日志排错会带来技术流量，且能和工具服务转化相连。",
    matchTerms: ["大模型", "llm", "api", "部署", "推理", "报错", "环境变量"],
    modules: ["环境变量检查", "API 报错解释", "推理延迟排查", "日志摘要", "上线回滚"],
    queries: [
      "大模型部署教程",
      "LLM API 报错排查",
      "OpenAI API error prompt",
      "AI 应用部署失败怎么办",
      "大模型推理服务排错",
      "AI 环境变量配置教程",
      "Vercel AI 应用部署错误",
      "LLM 延迟优化检查清单",
      "模型 API 日志分析提示词",
      "AI 项目上线 smoke test",
    ],
    articleAngles: [
      "把错误信息、环境、复现步骤和最近变更作为必填输入。",
      "输出先分级风险，再给排查顺序和可回滚动作。",
      "将生产环境操作标为人工确认，不自动执行命令。",
      "可以扩展到错误解释器和部署教程内容。",
    ],
    sourceTargets: [officialSources[0], officialSources[8], officialSources[9], officialSources[10], officialSources[11]],
  },
  {
    id: "agent-memory-knowledge-base-prompts",
    title: "Agent 记忆、知识库和 RAG 提示词",
    audience: "做客服 Agent、个人助理、知识库问答和长期任务 Agent 的团队",
    demandReason: "记忆、知识库、RAG、长期上下文是用户已经明确要求扩展的板块，且 2026 年 Agent 资料持续更新。",
    matchTerms: ["记忆", "memory", "rag", "知识库", "长期", "agent"],
    modules: ["记忆写入规则", "知识库检索", "事实冲突处理", "长期偏好总结", "隐私和保留策略"],
    queries: [
      "AI Agent 记忆怎么做",
      "Agent memory prompt",
      "RAG 知识库提示词",
      "LangChain long term memory",
      "OpenAI Agents SDK memory",
      "AI 客服知识库 prompt",
      "AI 助理长期记忆教程",
      "知识库问答提示词",
      "Agent 记忆安全检查",
      "AI memory retention policy",
    ],
    articleAngles: [
      "区分会话历史、长期记忆、知识库检索和用户偏好。",
      "要求敏感信息、过期信息和冲突事实必须人工复核。",
      "提示词输出包含可写入记忆、不可写入记忆和待确认问题。",
      "和 Agent 部署、客服知识库、RAG 教程形成板块联动。",
    ],
    sourceTargets: [officialSources[10], officialSources[11], officialSources[9], officialSources[0], officialSources[2]],
  },
];

function main() {
  const massMatrix = readJson<MassMatrix>("content/automation/mass-ai-search-action-matrix.json");
  const promptModules = readJson<PromptModulePack>("content/automation/industry-prompt-module-pack.json");
  const deployment = readJson<DeploymentPack>("content/automation/ai-deployment-review-pack.json");

  const items = laneSeeds.map((seed) => toPlaybookLane(seed, massMatrix, promptModules, deployment));
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const uniqueCandidateFiles = new Set(items.flatMap((item) => item.candidateFiles));
  const promptTemplates = items.reduce((sum, item) => sum + item.promptTemplates.length, 0);
  const searchQueries = new Set(items.flatMap((item) => item.searchQueries));
  const sourceTargets = new Set(items.flatMap((item) => item.sourceTargets));

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note:
        "Read-only popular AI prompt playbook. It maps broad, commonly searched AI prompt topics to existing candidate drafts, official sources, and human-review prompt templates.",
      stopBefore: "Stop before mark:review and publish. Every article change still requires explicit human approval.",
      trafficClaim: "not-included",
    },
    sourceEvidence: {
      browsedAt: "2026-06-08",
      sourceNote:
        "Sources are used as editorial planning evidence only. This report does not claim keyword volume, ranking, traffic, clicks, revenue, or conversion outcomes.",
      officialSources,
      massMatrixGeneratedAt: massMatrix.generatedAt,
      massMatrixSummary: massMatrix.summary,
      promptModuleGeneratedAt: promptModules.generatedAt,
      promptModuleSummary: promptModules.summary,
      deploymentReviewGeneratedAt: deployment.generatedAt,
      deploymentReviewSummary: deployment.summary,
    },
    summary: {
      agentDeploymentLanes: items.filter((item) => item.laneId.includes("agent") || item.laneId.includes("deployment")).length,
      broadWorkPromptLanes: items.filter((item) => item.laneId.includes("office") || item.laneId.includes("excel") || item.laneId.includes("chatgpt")).length,
      commandBoundaries: items.length,
      deploymentBridgeItems: items.filter((item) => item.deploymentBridgeFiles.length > 0).length,
      humanGatedItems: items.length,
      items: items.length,
      itemsReadyForHumanReviewPrep: items.filter((item) => item.readyForHumanReviewPrep).length,
      itemsWithCandidateFiles: items.filter((item) => item.candidateFiles.length > 0).length,
      itemsWithOfficialSources: items.filter((item) => item.sourceTargets.some((source) => officialSources.includes(source))).length,
      memoryLanes: items.filter((item) => item.laneId.includes("memory")).length,
      officialSources: officialSources.length,
      promptModuleBridgeItems: items.filter((item) => item.promptModuleBridgeFiles.length > 0).length,
      promptTemplates,
      publishConfirmCommandsIncluded: items.filter((item) => item.commandBoundary.publishConfirm !== "not-included").length,
      searchQueries: searchQueries.size,
      sourceTargets: sourceTargets.size,
      trafficDataAvailable: false,
      uniqueCandidateFiles: uniqueCandidateFiles.size,
      unsafeItems: unsafeItems.length,
    },
    unsafeItems,
    topItems: items,
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "popular-ai-prompt-playbook.json");
  const mdTarget = path.join(process.cwd(), "docs", "popular-ai-prompt-playbook.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function toPlaybookLane(seed: LaneSeed, massMatrix: MassMatrix, promptModules: PromptModulePack, deployment: DeploymentPack): PlaybookLane {
  const massMatches = massMatrix.items.filter((item) => matchesSeed(seed, [item.lane, item.massSearchIntent, item.themeTitle, ...item.searchSeeds]));
  const promptMatches = promptModules.items.filter((item) =>
    matchesSeed(seed, [item.lane, item.primaryQuery, item.deliverable, ...item.supportingQueries]),
  );
  const deploymentMatches = deployment.nextItems.filter((item) =>
    matchesSeed(seed, [item.category, item.topic, item.title, ...item.searchQueries]),
  );

  const candidateFiles = dedupe([
    ...massMatches.flatMap((item) => item.candidateFiles),
    ...promptMatches.flatMap((item) => item.reviewCandidateFiles),
    ...deploymentMatches.map((item) => item.file),
  ]).slice(0, 10);
  const sourceTargets = dedupe([
    ...seed.sourceTargets,
    ...massMatches.flatMap((item) => item.sourceTargets),
    ...promptMatches.flatMap((item) => item.sourceTargets),
    ...deploymentMatches.flatMap((item) => item.sourceTargets),
  ]).slice(0, 12);
  const promptTemplates = seed.modules.map((moduleName, index) => toPromptTemplate(seed, moduleName, index));
  const commandBoundary: CommandBoundary = {
    markReviewAfterHumanApproval: "npm run mark:review -- --confirm-human <file>",
    publishConfirm: "not-included",
    publishDryRunAfterReview: "npm run publish:articles -- --dry-run",
    stopBefore: "Stop before mark:review and before publish until explicit human approval.",
  };
  const unsafeReasons = [
    ...(candidateFiles.length === 0 ? ["No existing candidate draft bridge for this broad prompt lane."] : []),
    ...(sourceTargets.length < 5 ? ["Fewer than five source targets are attached."] : []),
    ...(promptTemplates.length < 5 ? ["Fewer than five reusable prompt templates are generated."] : []),
    ...(commandBoundary.publishConfirm !== "not-included" ? ["Publish confirm command must not be included."] : []),
    ...massMatches.flatMap((item) => item.unsafeReasons || []),
    ...promptMatches.flatMap((item) => item.unsafeReasons || []),
  ];

  return {
    articleAngles: seed.articleAngles,
    audience: seed.audience,
    commandBoundary,
    candidateFiles,
    demandReason: seed.demandReason,
    deploymentBridgeFiles: dedupe(deploymentMatches.map((item) => item.file)),
    laneId: seed.id,
    matchTerms: seed.matchTerms,
    promptModuleBridgeFiles: dedupe(promptMatches.flatMap((item) => item.reviewCandidateFiles)),
    promptTemplates,
    publicMatches: Math.max(0, ...massMatches.map((item) => item.publicMatches), ...promptMatches.map((item) => item.publicMatches)),
    readyForHumanReviewPrep: unsafeReasons.length === 0,
    riskControls: baseRiskControls(seed),
    searchQueries: dedupe([...seed.queries, ...massMatches.flatMap((item) => item.searchSeeds), ...promptMatches.flatMap((item) => item.supportingQueries)]).slice(0, 18),
    sourceTargets,
    sourceThemeMatches: dedupe([...massMatches.map((item) => item.themeTitle), ...promptMatches.map((item) => item.primaryQuery)]),
    title: seed.title,
    trafficClaim: "not-included",
    unsafeReasons,
  };
}

function toPromptTemplate(seed: LaneSeed, moduleName: string, index: number): PromptTemplate {
  const inputFields = ["目标", "背景资料", "受众", "已有内容或数据", "限制条件", "期望格式"];
  const outputBlocks = ["结论草稿", "执行步骤", "风险和缺失信息", "人工复核点", "下一步追问"];
  const riskControls = baseRiskControls(seed);
  const qualityChecklist = [
    "只使用用户输入的事实，不补编数据、案例、报价、排名、法律或医学结论。",
    "缺少信息时写 UNKNOWN，并列出需要补充的问题。",
    "输出必须可扫描，包含标题、列表、风险、下一步。",
    "涉及客户承诺、财务、法务、招聘筛选、医疗健康或生产部署时必须标记人工复核。",
    "文章使用前必须由人工确认来源、事实和适用场景。",
  ];

  return {
    copyPrompt: [
      `你是一个面向「${seed.audience}」的 AI 工作流助手，现在要处理「${seed.title}」中的「${moduleName}」场景。`,
      "请只使用我提供的事实，不要编造案例、数字、客户承诺、搜索量、排名、收入或转化结果；缺失信息统一写 UNKNOWN。",
      `输入变量：{{${inputFields.join("}}、{{")}}}。`,
      `请输出这些模块：${outputBlocks.join("、")}。`,
      `搜索意图参考：${seed.queries.slice(0, 4).join("；")}。`,
      `质量要求：${qualityChecklist.slice(0, 4).join(" ")}`,
      `风险边界：${riskControls.join(" ")}`,
      `这是第 ${index + 1} 个模板，最终内容只能作为人工审核文章素材，不能自动发布。`,
    ].join("\n"),
    inputFields,
    outputBlocks,
    qualityChecklist,
    riskControls,
    title: `${seed.title} - ${moduleName}`,
    useCase: moduleName,
  };
}

function baseRiskControls(seed: LaneSeed) {
  const controls = [
    "Do not claim measured traffic, rankings, revenue, conversion lift, or guaranteed outcomes.",
    "Ask for missing facts instead of inventing them.",
    "Keep every article candidate draft/noindex/humanReviewRequired until explicit approval.",
    "Stop before mark:review and stop before publish.",
  ];
  if (seed.id.includes("agent") || seed.id.includes("deployment")) {
    controls.push("Do not execute deployment, shell, API, or tool actions; provide a checklist for human operators.");
  }
  if (seed.id.includes("memory")) {
    controls.push("Do not store sensitive memory automatically; require retention and privacy review.");
  }
  if (seed.id.includes("hr")) {
    controls.push("Do not make hiring decisions or protected-class inferences.");
  }
  return controls;
}

function matchesSeed(seed: LaneSeed, values: string[]) {
  const haystack = values.join(" ").toLowerCase();
  return seed.matchTerms.some((term) => haystack.includes(term.toLowerCase()));
}

function dedupe(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(process.cwd(), relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function toMarkdown(payload: {
  generatedAt: string;
  guardrails: {
    autoCreateArticles: boolean;
    autoEditArticles: boolean;
    autoMarkReview: boolean;
    autoPublish: boolean;
    note: string;
    stopBefore: string;
    trafficClaim: string;
  };
  items: PlaybookLane[];
  sourceEvidence: {
    browsedAt: string;
    officialSources: string[];
    sourceNote: string;
  };
  summary: Record<string, number | boolean>;
  topItems: PlaybookLane[];
  unsafeItems: PlaybookLane[];
}) {
  const lines = [
    "# Popular AI Prompt Playbook",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It maps broad, commonly searched AI prompt topics to existing candidate drafts, official sources, and human-review prompt templates.",
    "",
    "## Guardrails",
    "",
    `- Auto create articles: ${payload.guardrails.autoCreateArticles}`,
    `- Auto edit articles: ${payload.guardrails.autoEditArticles}`,
    `- Auto mark review: ${payload.guardrails.autoMarkReview}`,
    `- Auto publish: ${payload.guardrails.autoPublish}`,
    `- Stop before: ${payload.guardrails.stopBefore}`,
    `- Traffic claim: ${payload.guardrails.trafficClaim}`,
    `- Note: ${payload.guardrails.note}`,
    "",
    "## Source Evidence",
    "",
    `- Browsed at: ${payload.sourceEvidence.browsedAt}`,
    `- Source note: ${payload.sourceEvidence.sourceNote}`,
    "",
    ...payload.sourceEvidence.officialSources.map((source) => `- ${source}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Top Lanes",
    "",
    "| Ready | Candidates | Templates | Sources | Public | Lane | Audience |",
    "| --- | ---: | ---: | ---: | ---: | --- | --- |",
    ...payload.topItems.map(
      (item) =>
        `| ${item.readyForHumanReviewPrep} | ${item.candidateFiles.length} | ${item.promptTemplates.length} | ${item.sourceTargets.length} | ${item.publicMatches} | ${item.title} | ${item.audience} |`,
    ),
    "",
    "## Lane Details",
    "",
    ...payload.items.flatMap((item) => [
      `### ${item.title}`,
      "",
      `- Lane: ${item.laneId}`,
      `- Ready for human review prep: ${item.readyForHumanReviewPrep}`,
      `- Demand reason: ${item.demandReason}`,
      `- Search queries: ${item.searchQueries.join("; ")}`,
      `- Candidate files: ${item.candidateFiles.length ? item.candidateFiles.join("; ") : "none"}`,
      `- Deployment bridge files: ${item.deploymentBridgeFiles.length ? item.deploymentBridgeFiles.join("; ") : "none"}`,
      `- Prompt module bridge files: ${item.promptModuleBridgeFiles.length ? item.promptModuleBridgeFiles.join("; ") : "none"}`,
      `- Source targets: ${item.sourceTargets.join("; ")}`,
      `- Publish confirm: ${item.commandBoundary.publishConfirm}`,
      `- Stop before: ${item.commandBoundary.stopBefore}`,
      `- Unsafe reasons: ${item.unsafeReasons.length ? item.unsafeReasons.join("; ") : "none"}`,
      "",
      "Article angles:",
      "",
      ...item.articleAngles.map((angle) => `- ${angle}`),
      "",
      "Prompt templates:",
      "",
      ...item.promptTemplates.map((template) => `- ${template.title}: ${template.outputBlocks.join(", ")}`),
      "",
    ]),
    "## Unsafe Items",
    "",
    payload.unsafeItems.length ? payload.unsafeItems.map((item) => `- ${item.title}: ${item.unsafeReasons.join("; ")}`).join("\n") : "None",
    "",
  ];
  return `${lines.join("\n")}\n`;
}

main();

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

type IndustrySeed = {
  audience: string;
  industry: string;
  priority: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  terms: string[];
  workflowAngles: string[];
};

type Candidate = {
  file: string;
  primaryKeyword: string;
  publishBatch: number | null;
  qualityScore: number;
  searchIntent: string;
  title: string;
};

type IndustryCoverage = {
  audience: string;
  candidates: Candidate[];
  draftMatches: number;
  gapScore: number;
  industry: string;
  nextAction: string;
  publicMatches: number;
  reviewFocus: string[];
  searchQueries: string[];
  sourceTargets: string[];
  workflowAngles: string[];
};

const officialPromptSources = [
  "OpenAI prompt engineering: https://platform.openai.com/docs/guides/prompt-engineering",
  "OpenAI prompt generation: https://platform.openai.com/docs/guides/prompt-generation",
  "Anthropic prompt engineering: https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
  "Google Gemini Workspace prompting: https://support.google.com/docs/answer/15013615",
  "Microsoft Copilot prompt gallery: https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
];

const industries: IndustrySeed[] = [
  {
    audience: "跨行业新手、团队负责人、内容运营",
    industry: "全行业提示词模板库",
    priority: 100,
    reviewFocus: ["必须说明提示词不是万能答案", "补齐输入字段、输出格式、质检标准和反例", "避免承诺直接带来成交、排名或收益"],
    searchQueries: ["AI 提示词大全", "ChatGPT 提示词模板", "全行业 AI 提示词", "AI prompt library"],
    sourceTargets: officialPromptSources,
    terms: ["全行业", "提示词模板库", "AI 提示词模板", "prompt library"],
    workflowAngles: ["行业分类", "提示词版本管理", "审核标准", "复用规则"],
  },
  {
    audience: "营销、品牌、投放、内容团队",
    industry: "营销",
    priority: 96,
    reviewFocus: ["区分选题、广告文案、SEO 和复盘场景", "保留事实核查和品牌语气确认", "避免暗示稳定排名或转化"],
    searchQueries: ["营销 AI 提示词", "广告文案 AI prompt", "SEO AI 提示词", "活动复盘 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["营销", "广告", "SEO", "活动复盘"],
    workflowAngles: ["选题", "广告文案", "SEO 大纲", "活动复盘"],
  },
  {
    audience: "销售、BD、客户成功",
    industry: "销售",
    priority: 94,
    reviewFocus: ["提示词要要求输入客户背景和真实约束", "异议处理不能变成夸大承诺", "会议纪要要保留待确认事项"],
    searchQueries: ["销售 AI 提示词", "客户跟进 AI 话术", "销售会议纪要 prompt", "异议处理 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["销售", "客户画像", "跟进话术", "异议处理"],
    workflowAngles: ["客户画像", "跟进话术", "异议处理", "会议纪要"],
  },
  {
    audience: "客服、售后、工单运营",
    industry: "客服",
    priority: 93,
    reviewFocus: ["强调人工升级边界", "敏感投诉和退款不能自动定性", "输出必须包含情绪安抚和事实确认"],
    searchQueries: ["客服 AI 提示词", "客服回复 AI 模板", "工单分类 AI prompt", "售后回复 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["客服", "工单", "售后", "情绪安抚"],
    workflowAngles: ["回复草稿", "工单分类", "情绪安抚", "升级判断"],
  },
  {
    audience: "电商运营、店铺客服、商品编辑",
    industry: "电商",
    priority: 90,
    reviewFocus: ["商品事实必须由人工补充", "评价分析要避免泄露用户隐私", "售后回复要保留平台规则边界"],
    searchQueries: ["电商 AI 提示词", "商品标题 AI prompt", "详情页 AI 文案", "评价分析 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["电商", "商品标题", "详情页", "评价分析"],
    workflowAngles: ["商品标题", "详情页", "评价分析", "售后回复"],
  },
  {
    audience: "运营、项目管理、内部流程负责人",
    industry: "运营",
    priority: 88,
    reviewFocus: ["SOP 和复盘要保留负责人、时间线和验收标准", "周报不能凭空编造数据", "活动计划要保留风险清单"],
    searchQueries: ["运营 AI 提示词", "周报 AI prompt", "SOP AI 提示词", "活动计划 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["运营", "周报", "SOP", "活动计划"],
    workflowAngles: ["周报", "SOP", "活动计划", "数据解释"],
  },
  {
    audience: "HR、招聘、培训负责人",
    industry: "HR 招聘",
    priority: 86,
    reviewFocus: ["简历初筛要避免歧视性标准", "面试题要与岗位能力相关", "培训材料要保留人工确认"],
    searchQueries: ["HR AI 提示词", "招聘 AI prompt", "简历初筛 AI 提示词", "面试题 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["HR", "招聘", "简历初筛", "面试题"],
    workflowAngles: ["JD", "简历初筛", "面试题", "培训材料"],
  },
  {
    audience: "财务、行政、经营分析人员",
    industry: "财务",
    priority: 84,
    reviewFocus: ["不能替代会计或税务判断", "报表摘要必须引用输入数据", "风险清单要标记需要人工核对"],
    searchQueries: ["财务 AI 提示词", "报表摘要 AI prompt", "预算复盘 AI 提示词", "费用分类 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["财务", "报表", "预算", "费用分类"],
    workflowAngles: ["报表摘要", "费用分类", "预算复盘", "风险清单"],
  },
  {
    audience: "法务、合同管理、业务负责人",
    industry: "法务合同",
    priority: 82,
    reviewFocus: ["必须声明不能替代律师意见", "条款风险要基于输入合同文本", "输出要区分事实摘要和待咨询问题"],
    searchQueries: ["合同 AI 提示词", "法务 AI prompt", "合同风险 AI 提示词", "条款摘要 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["法务", "合同", "条款", "风险清单"],
    workflowAngles: ["条款摘要", "风险清单", "修改问题", "谈判准备"],
  },
  {
    audience: "教师、教培、学习产品团队",
    industry: "教育",
    priority: 80,
    reviewFocus: ["不能替代教师判断", "测验题要保留难度和答案核对", "学习计划要按学生情况调整"],
    searchQueries: ["教育 AI 提示词", "教案 AI prompt", "备课 AI 提示词", "测验 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["教育", "教案", "备课", "测验"],
    workflowAngles: ["备课", "教案", "测验", "学习计划"],
  },
  {
    audience: "医疗行政、健康机构运营、客服团队",
    industry: "医疗行政",
    priority: 78,
    reviewFocus: ["不能输出诊断或治疗建议", "病历摘要和宣教材料必须人工审核", "隐私数据必须脱敏"],
    searchQueries: ["医疗 AI 提示词", "病历摘要 AI prompt", "随访问卷 AI 提示词", "健康宣教 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["医疗", "病历", "随访", "宣教"],
    workflowAngles: ["病历摘要", "随访问卷", "宣教材料", "行政回复"],
  },
  {
    audience: "制造业运营、质量、设备管理人员",
    industry: "制造业",
    priority: 76,
    reviewFocus: ["设备故障不能替代现场安全判断", "SOP 要保留责任人和验收标准", "质检记录要避免编造数据"],
    searchQueries: ["制造业 AI 提示词", "SOP AI prompt", "质检记录 AI 提示词", "设备故障 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["制造业", "质检", "设备故障", "生产复盘"],
    workflowAngles: ["SOP", "质检记录", "设备故障", "生产复盘"],
  },
  {
    audience: "房产经纪、门店运营、置业顾问",
    industry: "房产",
    priority: 74,
    reviewFocus: ["不得编造房源事实", "客户需求分析要保留人工确认", "风险提醒不能替代法律或交易建议"],
    searchQueries: ["房产 AI 提示词", "房源文案 AI prompt", "带看记录 AI 提示词", "客户需求分析 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["房产", "房源", "带看", "客户需求"],
    workflowAngles: ["房源文案", "客户需求分析", "带看记录", "风险提醒"],
  },
  {
    audience: "产品经理、创业团队、需求分析人员",
    industry: "产品经理",
    priority: 72,
    reviewFocus: ["PRD 和用户故事必须连接真实业务目标", "竞品分析要保留来源和不确定性", "验收标准要可测试"],
    searchQueries: ["产品经理 AI 提示词", "PRD AI prompt", "需求分析 AI 提示词", "用户故事 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["产品经理", "PRD", "需求分析", "用户故事"],
    workflowAngles: ["需求分析", "PRD", "竞品", "验收标准"],
  },
  {
    audience: "开发者、测试、技术负责人",
    industry: "软件开发",
    priority: 70,
    reviewFocus: ["代码建议必须经过测试", "Bug 排查要保留复现步骤", "不要把 AI 输出当成最终安全审计"],
    searchQueries: ["软件开发 AI 提示词", "代码审查 AI prompt", "Bug 排查 AI 提示词", "测试用例 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["软件开发", "代码审查", "Bug", "测试用例"],
    workflowAngles: ["需求拆解", "代码审查", "Bug 排查", "测试用例"],
  },
  {
    audience: "数据分析师、运营分析、业务负责人",
    industry: "数据分析",
    priority: 68,
    reviewFocus: ["SQL 思路必须人工执行验证", "异常解释不能凭空下结论", "报告摘要要引用输入指标"],
    searchQueries: ["数据分析 AI 提示词", "SQL AI prompt", "指标解释 AI 提示词", "数据报告 AI 提示词"],
    sourceTargets: officialPromptSources,
    terms: ["数据分析", "SQL", "指标", "报告摘要"],
    workflowAngles: ["指标解释", "SQL 思路", "异常排查", "报告摘要"],
  },
];

async function main() {
  const articles = (await articleFiles()).map(toArticleSummary);
  const currentPackFiles = loadFileSet("content/automation/publish-readiness-pack.json", (payload) => asArray(payload.items));
  const plannedReviewFiles = loadFileSet("content/automation/review-batch-plan.json", (payload) =>
    asArray(payload.batches).flatMap((batch) => (hasCandidates(batch) ? asArray(batch.candidates) : [])),
  );
  const promptArticles = articles.filter((article) => isPromptArticle(article));
  const coverage = industries.map((industry) => buildCoverage(industry, promptArticles)).sort((a, b) => b.gapScore - a.gapScore || a.industry.localeCompare(b.industry));
  const allCandidates = coverage.flatMap((item) => item.candidates.map((candidate) => candidate.file));
  const unsafeCandidates = coverage.flatMap((item) => item.candidates.filter((candidate) => !isSafeCandidate(articles.find((article) => article.file === candidate.file))));
  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoMarkReview: false,
      autoPublish: false,
      note: "This coverage matrix is read-only. It organizes broad industry prompt drafts for manual review and does not claim measured traffic.",
    },
    sourceEvidence: {
      note: "Official prompt references used for manual fact review targets; search queries are broad intent seeds, not keyword-volume data.",
      officialPromptSources,
    },
    summary: {
      currentPackPromptItems: [...currentPackFiles].filter((file) => promptArticles.some((article) => article.file === file)).length,
      industries: industries.length,
      industriesWithoutPublicCoverage: coverage.filter((item) => item.publicMatches === 0).length,
      industriesWithReadyCandidates: coverage.filter((item) => item.candidates.length > 0).length,
      plannedPromptItems: [...plannedReviewFiles].filter((file) => promptArticles.some((article) => article.file === file)).length,
      promptDrafts: promptArticles.filter((article) => article.status === "draft").length,
      promptPublicArticles: promptArticles.filter((article) => article.status === "published").length,
      reviewReadyPromptDrafts: promptArticles.filter(isReviewReady).length,
      totalCandidateMentions: allCandidates.length,
      uniqueCandidateFiles: new Set(allCandidates).size,
      unsafeCandidateItems: unsafeCandidates.length,
    },
    coverage,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "industry-prompt-coverage.json");
  const mdTarget = path.join(process.cwd(), "docs", "industry-prompt-coverage.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: true, industries: payload.summary.industries, reviewReadyPromptDrafts: payload.summary.reviewReadyPromptDrafts, json: rel(jsonTarget), markdown: rel(mdTarget) }, null, 2));
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

function buildCoverage(industry: IndustrySeed, articles: ArticleSummary[]): IndustryCoverage {
  const matches = articles.filter((article) => matchesIndustry(article, industry));
  const publicMatches = matches.filter((article) => article.status === "published").length;
  const draftMatches = matches.filter((article) => article.status === "draft").length;
  const candidates = matches.filter(isReviewReady).sort(compareCandidate).slice(0, 4).map(toCandidate);
  const gapScore = industry.priority + (publicMatches === 0 ? 80 : 20 - publicMatches * 4) + candidates.length * 10 + Math.min(draftMatches, 10);

  return {
    audience: industry.audience,
    candidates,
    draftMatches,
    gapScore,
    industry: industry.industry,
    nextAction: candidates.length
      ? "Use these draft candidates in manual review; keep status=draft/noindex until explicit approval."
      : "Create or expand a draft before adding this industry to review batches.",
    publicMatches,
    reviewFocus: industry.reviewFocus,
    searchQueries: industry.searchQueries,
    sourceTargets: industry.sourceTargets,
    workflowAngles: industry.workflowAngles,
  };
}

function isPromptArticle(article: ArticleSummary) {
  const text = searchableText(article);
  return text.includes("提示词") || text.includes("prompt");
}

function isReviewReady(article: ArticleSummary) {
  return article.status === "draft" && article.noindex === true && article.sourceNotes && article.humanReviewRequired === true && article.qualityScore >= 100;
}

function isSafeCandidate(article: ArticleSummary | undefined) {
  return Boolean(article && article.status === "draft" && article.noindex === true && article.humanReviewRequired === true);
}

function matchesIndustry(article: ArticleSummary, industry: IndustrySeed) {
  const text = searchableText(article);
  return industry.terms.some((term) => text.includes(term.toLowerCase()));
}

function compareCandidate(a: ArticleSummary, b: ArticleSummary) {
  if ((b.publishBatch || 0) !== (a.publishBatch || 0)) return (b.publishBatch || 0) - (a.publishBatch || 0);
  if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
  return a.slug.localeCompare(b.slug);
}

function toCandidate(article: ArticleSummary): Candidate {
  return {
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
  coverage: IndustryCoverage[];
  generatedAt: string;
  guardrails: { autoMarkReview: boolean; autoPublish: boolean; note: string };
  sourceEvidence: { note: string; officialPromptSources: string[] };
  summary: Record<string, number>;
}) {
  const lines = [
    "# Industry Prompt Coverage",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It organizes broad industry AI prompt drafts for manual review and does not publish anything.",
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
    ...payload.sourceEvidence.officialPromptSources.map((source) => `- ${source}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Coverage Matrix",
    "",
    "| Industry | Score | Public | Drafts | Ready candidates | Search queries | Top candidate |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...payload.coverage.map((item) => (
      `| ${item.industry} | ${item.gapScore} | ${item.publicMatches} | ${item.draftMatches} | ${item.candidates.length} | ${item.searchQueries.slice(0, 2).join("<br>")} | ${item.candidates[0]?.title || ""} |`
    )),
    "",
  ];

  for (const item of payload.coverage) {
    lines.push(
      `## ${item.industry}`,
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
      "| Batch | Score | Intent | Keyword | Title | File |",
      "| --- | --- | --- | --- | --- | --- |",
      ...item.candidates.map((candidate) => (
        `| ${candidate.publishBatch ?? ""} | ${candidate.qualityScore} | ${candidate.searchIntent} | ${candidate.primaryKeyword} | ${candidate.title} | ${candidate.file} |`
      )),
      "",
    );
  }

  return lines.join("\n");
}

void main();

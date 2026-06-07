import fs from "fs";
import path from "path";
import { rel } from "./content-utils";

type PromptReviewItem = {
  file: string;
  industry: string;
  priorityScore: number;
  readyForHumanReview: boolean;
  safeDraft: boolean;
  searchQueries: string[];
  sourceTargets: string[];
  title: string;
};

type PromptReviewPack = {
  items: PromptReviewItem[];
  summary: {
    promptPublicArticles: number;
  };
};

type PromptCoverage = {
  coverage: Array<{
    candidates: unknown[];
    industry: string;
    publicMatches: number;
  }>;
};

type OpportunitySeed = {
  audience: string;
  deliverable: string;
  lane: string;
  matchTerms: string[];
  outputBlocks: string[];
  pageType: string;
  primaryQuery: string;
  priority: number;
  promptModules: string[];
  riskControls: string[];
  sourceTargets: string[];
  supportingQueries: string[];
  userInputFields: string[];
};

type OpportunityItem = OpportunitySeed & {
  existingReviewCandidates: PromptReviewItem[];
  humanBoundary: string;
  priorityScore: number;
  publicMatches: number;
  recommendedAction: string;
  searchQueryFamilies: number;
  unsafeReasons: string[];
};

const officialPromptSources = [
  "https://platform.openai.com/docs/guides/prompt-engineering",
  "https://platform.openai.com/docs/guides/prompt-generation",
  "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
  "https://support.google.com/docs/answer/15013615",
  "https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
];

const marketSignalSources = [
  {
    note: "Prompt libraries commonly split business prompts by marketing, sales, finance, HR, customer support, operations, legal, project management, development, and data analytics.",
    source: "https://pmtly.com/",
  },
  {
    note: "Recent prompt-template pages emphasize reusable templates with role context, variables, output format, and model-agnostic usage.",
    source: "https://www.fwdslash.ai/prompt-template",
  },
  {
    note: "Business prompt libraries are organized around client communication, marketing, operations, hiring, reports, customer service, sales, and content creation.",
    source: "https://sensara.io/prompts/",
  },
  {
    note: "Microsoft Copilot's prompt gallery exposes role and task filters such as communication, finance, HR, IT, operations, content creation, reporting, and summarization.",
    source: "https://adoption.microsoft.com/en-us/copilot/prompt-gallery/",
  },
  {
    note: "Enterprise prompt-library examples stress role-specific prompt governance for sales, HR, finance, operations, legal, customer service, and software development.",
    source: "https://www.promptfluent.com/browse",
  },
];

const sharedRiskControls = [
  "Require user-provided facts and mark unknowns instead of inventing business data.",
  "Include output format, review criteria, and escalation boundary in every prompt.",
  "Keep human approval for customer, employee, financial, legal, medical, or operational decisions.",
  "Do not claim guaranteed traffic, ranking, revenue, hiring, legal, medical, or conversion outcomes.",
];

const seeds: OpportunitySeed[] = [
  {
    audience: "sales teams, founders, account managers",
    deliverable: "Sales prompt pack with prospect research, discovery questions, objection handling, follow-up, and CRM summary.",
    lane: "sales-ai-prompts",
    matchTerms: ["sales", "销售", "客户", "objection", "follow"],
    outputBlocks: ["prospect brief", "discovery questions", "objection responses", "follow-up email", "CRM update"],
    pageType: "department prompt library",
    primaryQuery: "销售 AI 提示词",
    priority: 100,
    promptModules: ["prospect research brief", "discovery call planner", "objection handler", "follow-up sequence", "win/loss recap"],
    riskControls: [...sharedRiskControls, "Do not present persuasive scripts as guaranteed conversion tactics."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["ChatGPT prompts for sales", "销售话术 AI prompt", "客户跟进 AI 提示词", "sales objection handling prompt"],
    userInputFields: ["target customer", "offer", "deal stage", "known objections", "tone", "next step"],
  },
  {
    audience: "support teams, after-sales teams, customer success teams",
    deliverable: "Customer support prompt pack with ticket triage, empathy reply, escalation, refund boundary, and knowledge-base update.",
    lane: "customer-service-ai-prompts",
    matchTerms: ["support", "客服", "customer", "ticket", "售后"],
    outputBlocks: ["ticket category", "draft reply", "escalation reason", "policy check", "knowledge-base note"],
    pageType: "department prompt library",
    primaryQuery: "客服 AI 回复模板",
    priority: 98,
    promptModules: ["complaint response", "support ticket classifier", "refund escalation checker", "customer success plan", "FAQ updater"],
    riskControls: [...sharedRiskControls, "Refund, privacy, abuse, and safety issues must route to a human owner."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["客服 AI 提示词", "customer support AI prompts", "售后回复 AI prompt", "support ticket classification prompt"],
    userInputFields: ["customer message", "policy excerpt", "order context", "support channel", "severity", "allowed next actions"],
  },
  {
    audience: "HR teams, recruiters, people operations",
    deliverable: "HR prompt pack with JD draft, interview rubric, onboarding plan, performance review, and policy summary.",
    lane: "hr-ai-prompts",
    matchTerms: ["hr", "招聘", "面试", "onboarding", "people"],
    outputBlocks: ["job description", "screening criteria", "interview questions", "onboarding checklist", "review notes"],
    pageType: "department prompt library",
    primaryQuery: "HR AI 提示词",
    priority: 96,
    promptModules: ["JD writer", "interview rubric builder", "onboarding checklist", "performance review assistant", "policy explainer"],
    riskControls: [...sharedRiskControls, "Avoid discriminatory criteria and require HR/legal review for people decisions."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["招聘 AI prompt", "面试题 AI 提示词", "HR Copilot prompts", "employee review prompt"],
    userInputFields: ["role", "seniority", "must-have skills", "company context", "evaluation rubric", "legal constraints"],
  },
  {
    audience: "marketing teams, content teams, SEO operators",
    deliverable: "Marketing prompt pack with campaign brief, SEO outline, ad copy, content calendar, and post-campaign review.",
    lane: "marketing-ai-prompts",
    matchTerms: ["marketing", "营销", "seo", "广告", "内容"],
    outputBlocks: ["campaign brief", "SEO outline", "ad variants", "content calendar", "review checklist"],
    pageType: "department prompt library",
    primaryQuery: "营销 AI 提示词",
    priority: 94,
    promptModules: ["campaign planner", "SEO outline builder", "ad copy generator", "social content calendar", "campaign retrospective"],
    riskControls: [...sharedRiskControls, "Claims, metrics, and customer proof must be backed by provided evidence."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["SEO AI 提示词", "广告文案 AI prompt", "marketing AI prompts", "内容运营 AI 提示词"],
    userInputFields: ["audience", "offer", "brand voice", "proof points", "channels", "constraints"],
  },
  {
    audience: "operations managers, project owners, internal workflow teams",
    deliverable: "Operations prompt pack with SOP, weekly report, meeting summary, project risk list, and retrospective.",
    lane: "operations-ai-prompts",
    matchTerms: ["operations", "运营", "sop", "周报", "meeting"],
    outputBlocks: ["SOP steps", "weekly summary", "owners and dates", "risk list", "retrospective actions"],
    pageType: "department prompt library",
    primaryQuery: "运营 AI 提示词",
    priority: 92,
    promptModules: ["SOP builder", "weekly report drafter", "meeting summary to action items", "risk register", "process retrospective"],
    riskControls: [...sharedRiskControls, "Operational actions must keep owners, deadlines, and acceptance criteria explicit."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["SOP AI prompt", "周报 AI 提示词", "meeting summary prompt", "operations AI prompts"],
    userInputFields: ["process goal", "current notes", "owners", "timeline", "constraints", "acceptance criteria"],
  },
  {
    audience: "finance teams, founders, business analysts",
    deliverable: "Finance prompt pack with variance narrative, budget review, cost driver summary, forecast assumptions, and board memo.",
    lane: "finance-ai-prompts",
    matchTerms: ["finance", "财务", "预算", "报表", "forecast"],
    outputBlocks: ["variance summary", "cost drivers", "assumptions", "risk flags", "board-ready narrative"],
    pageType: "department prompt library",
    primaryQuery: "财务 AI 提示词",
    priority: 90,
    promptModules: ["variance analysis explainer", "budget review memo", "cost anomaly triage", "forecast assumption checker", "board finance summary"],
    riskControls: [...sharedRiskControls, "AI output must not replace accounting, tax, audit, or investment judgment."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["finance AI prompts", "报表摘要 AI prompt", "预算复盘 AI 提示词", "financial analysis prompt"],
    userInputFields: ["source numbers", "period", "comparison baseline", "known anomalies", "audience", "decision needed"],
  },
  {
    audience: "teachers, trainers, course creators",
    deliverable: "Education prompt pack with lesson plan, quiz, student feedback, learning plan, and teaching-material rewrite.",
    lane: "education-ai-prompts",
    matchTerms: ["education", "教育", "教师", "备课", "lesson"],
    outputBlocks: ["lesson objective", "activity plan", "quiz items", "feedback notes", "adaptation plan"],
    pageType: "department prompt library",
    primaryQuery: "教师 AI 提示词",
    priority: 88,
    promptModules: ["lesson planner", "quiz generator", "rubric builder", "student feedback assistant", "learning plan adjuster"],
    riskControls: [...sharedRiskControls, "Teachers must verify difficulty, answers, accessibility, and student suitability."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["教育 AI 提示词", "备课 AI prompt", "lesson plan AI prompt", "quiz generator prompt"],
    userInputFields: ["grade level", "topic", "learning objective", "student context", "timebox", "assessment method"],
  },
  {
    audience: "product managers, founders, business analysts",
    deliverable: "Product prompt pack with PRD, user stories, competitor notes, acceptance criteria, and launch checklist.",
    lane: "product-manager-ai-prompts",
    matchTerms: ["product", "产品", "prd", "需求", "user story"],
    outputBlocks: ["problem statement", "user stories", "acceptance criteria", "tradeoffs", "launch checklist"],
    pageType: "department prompt library",
    primaryQuery: "产品经理 AI 提示词",
    priority: 86,
    promptModules: ["PRD drafter", "user story generator", "acceptance criteria builder", "competitor analysis", "launch checklist"],
    riskControls: [...sharedRiskControls, "Product requirements must stay traceable to real user evidence and measurable acceptance criteria."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["PRD AI prompt", "需求分析 AI 提示词", "user story prompt", "产品文档 AI prompt"],
    userInputFields: ["user segment", "problem", "business goal", "constraints", "evidence", "success metric"],
  },
  {
    audience: "developers, QA engineers, engineering leads",
    deliverable: "Software prompt pack with bug reproduction, code review, test cases, refactor plan, and release note.",
    lane: "software-development-ai-prompts",
    matchTerms: ["development", "软件", "代码", "bug", "测试"],
    outputBlocks: ["bug hypothesis", "test cases", "review findings", "risk notes", "release summary"],
    pageType: "department prompt library",
    primaryQuery: "编程 AI 提示词",
    priority: 84,
    promptModules: ["bug triage", "code review checklist", "test-case generator", "refactor plan", "release-note writer"],
    riskControls: [...sharedRiskControls, "Code suggestions require tests, security review, and repository-specific validation."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["代码审查 AI prompt", "Bug 排查 AI 提示词", "测试用例 AI prompt", "developer AI prompts"],
    userInputFields: ["repo context", "error", "expected behavior", "constraints", "test framework", "security assumptions"],
  },
  {
    audience: "e-commerce operators, marketplace sellers, product-content teams",
    deliverable: "E-commerce prompt pack with product title, detail page, review mining, FAQ, and after-sales response.",
    lane: "ecommerce-ai-prompts",
    matchTerms: ["ecommerce", "电商", "商品", "详情页", "评价"],
    outputBlocks: ["product title", "detail copy", "review themes", "FAQ entries", "after-sales reply"],
    pageType: "department prompt library",
    primaryQuery: "电商 AI 提示词",
    priority: 82,
    promptModules: ["product-title optimizer", "detail-page copywriter", "review miner", "FAQ builder", "after-sales reply drafter"],
    riskControls: [...sharedRiskControls, "Product facts, claims, policies, and platform rules must be manually verified."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["商品标题 AI prompt", "详情页 AI 文案", "评价分析 AI 提示词", "ecommerce AI prompts"],
    userInputFields: ["product facts", "target buyer", "platform rules", "reviews", "brand tone", "forbidden claims"],
  },
  {
    audience: "legal operations, contract managers, business owners",
    deliverable: "Legal operations prompt pack with clause summary, risk questions, negotiation prep, and contract handoff memo.",
    lane: "legal-contract-ai-prompts",
    matchTerms: ["legal", "法务", "合同", "clause", "risk"],
    outputBlocks: ["clause summary", "risk questions", "missing info", "negotiation notes", "lawyer handoff"],
    pageType: "department prompt library",
    primaryQuery: "合同 AI 提示词",
    priority: 80,
    promptModules: ["clause summarizer", "contract risk question list", "redline prep", "negotiation brief", "lawyer handoff memo"],
    riskControls: [...sharedRiskControls, "Contract output must not be framed as legal advice and must route to qualified review."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["法务 AI prompt", "合同风险 AI 提示词", "条款摘要 AI prompt", "legal AI prompts"],
    userInputFields: ["contract excerpt", "jurisdiction context", "business objective", "risk tolerance", "counterparty", "questions for counsel"],
  },
  {
    audience: "data analysts, operations analysts, business teams",
    deliverable: "Data analysis prompt pack with metric explanation, SQL thinking, anomaly review, dashboard narrative, and executive summary.",
    lane: "data-analysis-ai-prompts",
    matchTerms: ["data", "数据", "sql", "指标", "analytics"],
    outputBlocks: ["metric definition", "analysis plan", "SQL outline", "anomaly hypotheses", "executive summary"],
    pageType: "department prompt library",
    primaryQuery: "数据分析 AI 提示词",
    priority: 78,
    promptModules: ["metric explainer", "SQL plan assistant", "anomaly triage", "dashboard narrative", "executive data summary"],
    riskControls: [...sharedRiskControls, "SQL and conclusions must be executed and verified by a human against the real data source."],
    sourceTargets: officialPromptSources,
    supportingQueries: ["SQL AI prompt", "指标分析 AI 提示词", "数据报告 AI prompt", "data analytics AI prompts"],
    userInputFields: ["metric", "dataset description", "time range", "known caveats", "business question", "desired chart or summary"],
  },
];

function main() {
  const promptCoverage = readJson<PromptCoverage>("content/automation/industry-prompt-coverage.json");
  const promptReviewPack = readJson<PromptReviewPack>("content/automation/industry-prompt-review-pack.json");
  const items = seeds.map((seed) => buildItem(seed, promptCoverage, promptReviewPack)).sort((a, b) => b.priorityScore - a.priorityScore);
  const unsafeItems = items.filter((item) => item.unsafeReasons.length > 0);
  const uniqueQueries = new Set(items.flatMap((item) => [item.primaryQuery, ...item.supportingQueries]));
  const promptModules = items.reduce((sum, item) => sum + item.promptModules.length, 0);

  const payload = {
    generatedAt: new Date().toISOString(),
    guardrails: {
      autoCreateArticles: false,
      autoEditArticles: false,
      autoMarkReview: false,
      autoPublish: false,
      note: "Read-only opportunity board. It turns broad prompt demand into specific page and prompt-pack ideas without editing or publishing articles.",
      trafficClaim: "No measured traffic, impressions, rankings, clicks, or revenue are claimed.",
    },
    sourceEvidence: {
      officialPromptSources,
      marketSignalSources,
      searchDate: "2026-06-07",
      searchNote: "External sources were used as current category signals only; they are not traffic-volume evidence.",
    },
    summary: {
      departmentLanes: new Set(items.map((item) => item.lane)).size,
      itemsWithHumanBoundary: items.filter((item) => item.humanBoundary.includes("human")).length,
      itemsWithInputOutputStructure: items.filter((item) => item.userInputFields.length >= 5 && item.outputBlocks.length >= 4).length,
      itemsWithReviewPackCandidate: items.filter((item) => item.existingReviewCandidates.length > 0).length,
      itemsWithSourceTargets: items.filter((item) => item.sourceTargets.length >= 5).length,
      opportunities: items.length,
      promptModules,
      promptPublicArticles: promptReviewPack.summary.promptPublicArticles,
      searchQueryFamilies: uniqueQueries.size,
      unsafeItems: unsafeItems.length,
      zeroPublicCoverageItems: items.filter((item) => item.publicMatches === 0).length,
    },
    unsafeItems,
    topOpportunities: items.slice(0, 8),
    items,
  };

  const jsonTarget = path.join(process.cwd(), "content", "automation", "industry-prompt-opportunity-board.json");
  const mdTarget = path.join(process.cwd(), "docs", "industry-prompt-opportunity-board.md");
  fs.mkdirSync(path.dirname(jsonTarget), { recursive: true });
  fs.mkdirSync(path.dirname(mdTarget), { recursive: true });
  fs.writeFileSync(jsonTarget, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  fs.writeFileSync(mdTarget, toMarkdown(payload), "utf8");
  console.log(JSON.stringify({ ok: unsafeItems.length === 0, json: rel(jsonTarget), markdown: rel(mdTarget), summary: payload.summary }, null, 2));
  if (unsafeItems.length) process.exitCode = 1;
}

function buildItem(seed: OpportunitySeed, promptCoverage: PromptCoverage, promptReviewPack: PromptReviewPack): OpportunityItem {
  const existingReviewCandidates = promptReviewPack.items
    .filter((item) => matchesSeed(`${item.industry} ${item.title} ${item.searchQueries.join(" ")} ${item.file}`, seed))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);
  const publicMatches = promptCoverage.coverage
    .filter((item) => matchesSeed(item.industry, seed))
    .reduce((sum, item) => sum + item.publicMatches, 0);
  const unsafeReasons = [
    seed.sourceTargets.length < 5 ? "missing official prompt source targets" : "",
    seed.supportingQueries.length < 4 ? "missing broad supporting queries" : "",
    seed.userInputFields.length < 5 || seed.outputBlocks.length < 4 ? "missing input/output structure" : "",
    seed.riskControls.length < 5 ? "missing risk controls" : "",
  ].filter(Boolean);
  const priorityScore = seed.priority + (publicMatches === 0 ? 60 : 20) + seed.supportingQueries.length * 3 + seed.promptModules.length * 4 + existingReviewCandidates.length * 12;

  return {
    ...seed,
    existingReviewCandidates,
    humanBoundary: "Create or review only as draft/noindex/humanReviewRequired. Stop before mark:review and stop before publish until explicit human approval.",
    priorityScore,
    publicMatches,
    recommendedAction: existingReviewCandidates.length
      ? "Use the matched draft candidates as the first review targets; expand the page into a role-specific prompt pack during human review."
      : "Create a new draft candidate for this department lane, then run the normal draft guardrails and human review workflow.",
    searchQueryFamilies: seed.supportingQueries.length + 1,
    unsafeReasons,
  };
}

function matchesSeed(text: string, seed: OpportunitySeed) {
  const normalized = text.toLowerCase();
  return seed.matchTerms.some((term) => normalized.includes(term.toLowerCase())) || normalized.includes(seed.primaryQuery.toLowerCase());
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
    trafficClaim: string;
  };
  items: OpportunityItem[];
  sourceEvidence: { marketSignalSources: Array<{ note: string; source: string }>; officialPromptSources: string[]; searchDate: string; searchNote: string };
  summary: Record<string, number>;
  topOpportunities: OpportunityItem[];
  unsafeItems: OpportunityItem[];
}) {
  const lines = [
    "# Industry Prompt Opportunity Board",
    "",
    `Generated at: ${payload.generatedAt}`,
    "",
    "This report is read-only. It turns broad business prompt demand into specific page ideas and prompt-pack review targets.",
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
    "## Source Evidence",
    "",
    `- Search date: ${payload.sourceEvidence.searchDate}`,
    `- Search note: ${payload.sourceEvidence.searchNote}`,
    "",
    "Official prompt sources:",
    "",
    ...payload.sourceEvidence.officialPromptSources.map((source) => `- ${source}`),
    "",
    "Market signal sources:",
    "",
    ...payload.sourceEvidence.marketSignalSources.map((source) => `- ${source.source}: ${source.note}`),
    "",
    "## Summary",
    "",
    ...Object.entries(payload.summary).map(([key, value]) => `- ${key}: ${value}`),
    "",
    "## Unsafe Items",
    "",
    ...opportunityTable(payload.unsafeItems),
    "",
    "## Top Opportunities",
    "",
    ...opportunityTable(payload.topOpportunities),
    "",
    "## All Opportunities",
    "",
    ...opportunityTable(payload.items),
    "",
    "## Opportunity Packets",
    "",
    ...payload.items.flatMap((item) => itemSection(item)),
    "",
  ];

  return lines.join("\n");
}

function opportunityTable(items: OpportunityItem[]) {
  if (!items.length) return ["- none"];
  return [
    "| Score | Public | Review candidates | Query families | Lane | Primary query | Deliverable |",
    "| --- | --- | --- | --- | --- | --- | --- |",
    ...items.map(
      (item) =>
        `| ${item.priorityScore} | ${item.publicMatches} | ${item.existingReviewCandidates.length} | ${item.searchQueryFamilies} | ${item.lane} | ${item.primaryQuery} | ${item.deliverable} |`,
    ),
  ];
}

function itemSection(item: OpportunityItem) {
  return [
    `### ${item.primaryQuery}`,
    "",
    `- Lane: ${item.lane}`,
    `- Audience: ${item.audience}`,
    `- Page type: ${item.pageType}`,
    `- Priority score: ${item.priorityScore}`,
    `- Public matches: ${item.publicMatches}`,
    `- Recommended action: ${item.recommendedAction}`,
    `- Human boundary: ${item.humanBoundary}`,
    "",
    "Search queries:",
    "",
    `- ${item.primaryQuery}`,
    ...item.supportingQueries.map((query) => `- ${query}`),
    "",
    "Prompt modules:",
    "",
    ...item.promptModules.map((module) => `- ${module}`),
    "",
    "User input fields:",
    "",
    ...item.userInputFields.map((field) => `- ${field}`),
    "",
    "Output blocks:",
    "",
    ...item.outputBlocks.map((block) => `- ${block}`),
    "",
    "Risk controls:",
    "",
    ...item.riskControls.map((control) => `- ${control}`),
    "",
    "Matched review candidates:",
    "",
    ...matchedCandidateLines(item.existingReviewCandidates),
    "",
  ];
}

function matchedCandidateLines(items: PromptReviewItem[]) {
  if (!items.length) return ["- none"];
  return items.map((item) => `- ${item.title} (${item.file})`);
}

main();

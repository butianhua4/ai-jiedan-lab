"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Intent = "howto" | "checklist" | "comparison" | "troubleshoot" | "tool";
type Audience = "beginner" | "freelancer" | "developer" | "operator" | "founder";
type Market = "cn" | "global" | "dual";

const intents: Array<[Intent, string]> = [
  ["howto", "教程/怎么做"],
  ["checklist", "检查清单"],
  ["comparison", "对比选择"],
  ["troubleshoot", "报错排查"],
  ["tool", "工具型入口"],
];

const audiences: Array<[Audience, string]> = [
  ["beginner", "新手"],
  ["freelancer", "自由职业者"],
  ["developer", "开发者"],
  ["operator", "运营/助理"],
  ["founder", "创业者/负责人"],
];

const markets: Array<[Market, string]> = [
  ["cn", "中文搜索优先"],
  ["global", "英文搜索优先"],
  ["dual", "中英文双线"],
];

const intentRules: Record<Intent, { title: string; section: string; cta: string }> = {
  howto: {
    title: "把核心动作放进标题，例如“怎么做”“从 0 到上线”“新手流程”。",
    section: "正文先给适用场景，再给步骤、常见坑、交付检查。",
    cta: "导向相关工具页，让读者把步骤变成可执行结果。",
  },
  checklist: {
    title: "标题要承诺检查结果，例如“上线前检查表”“交付前清单”。",
    section: "正文要按风险级别排序，避免只是堆项目符号。",
    cta: "导向下载模板、表格整理或报价工具。",
  },
  comparison: {
    title: "标题要包含两个或多个选择项，例如 API vs 自部署。",
    section: "正文要给判断条件、适合/不适合和最终建议。",
    cta: "导向成本计算器或路径选择工具。",
  },
  troubleshoot: {
    title: "标题要贴近报错原文和动作，例如“环境变量缺失怎么办”。",
    section: "正文先给最快排查路径，再解释原因。",
    cta: "导向报错解释器或部署检查工具。",
  },
  tool: {
    title: "标题要说明输入和输出，例如“输入 X 生成 Y”。",
    section: "正文要展示工具适用场景、限制和人工复核边界。",
    cta: "导向具体工具页并提供下一步模板。",
  },
};

const linkTargets = [
  { href: "/tools/ppt-planner", keywords: ["ppt", "presentation", "slides", "汇报", "路演"], label: "AI PPT 策划与排版助手" },
  { href: "/tools/spreadsheet-cleaner", keywords: ["excel", "csv", "表格", "数据清洗", "去重"], label: "AI 表格整理与清洗助手" },
  { href: "/tools/industry-prompt-builder", keywords: ["prompt", "提示词", "销售", "客服", "hr", "运营"], label: "全行业 AI 提示词生成器" },
  { href: "/tools/agent-deployment-planner", keywords: ["agent", "mcp", "权限", "工具调用", "部署"], label: "Agent 部署与权限规划器" },
  { href: "/tools/llm-deployment-cost-planner", keywords: ["llm", "大模型", "ollama", "vllm", "gpu", "成本"], label: "大模型部署成本选择器" },
  { href: "/tools/memory-rag-architecture-planner", keywords: ["rag", "向量", "记忆", "知识库", "检索"], label: "Agent 记忆与 RAG 架构规划器" },
  { href: "/tools/api-routing-cost-checker", keywords: ["api", "限流", "rate limit", "key", "成本", "路由"], label: "AI API 限流与成本路由检查器" },
  { href: "/tools/error-explainer", keywords: ["报错", "error", "npm", "vercel", "typescript"], label: "Codex 报错解释器" },
  { href: "/tools/pricing-calculator", keywords: ["报价", "价格", "项目", "预算", "工时"], label: "项目报价助手" },
  { href: "/templates", keywords: ["模板", "下载", "proposal", "清单"], label: "新手模板包" },
];

export function PublicSeoRefreshAssistantClient() {
  const [title, setTitle] = useState("Agent 记忆怎么设计：短期记忆、长期记忆和 RAG 怎么分工");
  const [summary, setSummary] = useState("面向准备上线 Agent 的开发者和自由职业者，解释短期记忆、长期记忆、RAG 知识库、向量检索、隐私删除和人工复核边界。");
  const [keywords, setKeywords] = useState("Agent 记忆, RAG, 向量数据库, 长期记忆, AI Agent 部署");
  const [intent, setIntent] = useState<Intent>("howto");
  const [audience, setAudience] = useState<Audience>("developer");
  const [market, setMarket] = useState<Market>("cn");

  const plan = useMemo(() => buildPlan({ audience, intent, keywords, market, summary, title }), [audience, intent, keywords, market, summary, title]);

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <Select label="搜索意图" onChange={(value) => setIntent(value as Intent)} options={intents} value={intent} />
            <Select label="读者人群" onChange={(value) => setAudience(value as Audience)} options={audiences} value={audience} />
            <Select label="市场方向" onChange={(value) => setMarket(value as Market)} options={markets} value={market} />
          </div>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-medium text-gray-800">
              当前标题或主题
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              文章摘要
              <textarea
                className="mt-2 h-28 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setSummary(event.target.value)}
                value={summary}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              目标关键词
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setKeywords(event.target.value)}
                value={keywords}
              />
            </label>
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">刷新建议</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">只生成候选项，不直接改公开文章。标题、描述和内链都需要人工确认后再发布。</p>
            </div>
            <CopyButton label="复制方案" text={plan.fullText} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="主标题候选" value={plan.titles[0]} />
            <Info label="Meta 描述" value={plan.descriptions[0]} />
            <Info label="推荐内链" value={plan.internalLinks.map((link) => link.label).join("、") || "暂无强匹配"} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PlanPanel title="标题候选" items={plan.titles} copyText={plan.titles.join("\n")} />
        <PlanPanel title="描述候选" items={plan.descriptions} copyText={plan.descriptions.join("\n")} />
        <PlanPanel title="内链建议" items={plan.internalLinks.map((link) => `${link.label} -> ${link.href}：${link.reason}`)} copyText={plan.internalLinks.map((link) => `${link.label}: ${link.href}`).join("\n")} />
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">可复制 SEO 刷新方案</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">适合放进人工审核单，不会自动修改公开页面。</p>
          </div>
          <CopyButton label="复制全部" text={plan.fullText} />
        </div>
        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-gray-800">{plan.fullText}</pre>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">人工发布前检查清单</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {[
            "标题不要只追热点，要和正文实际内容完全一致。",
            "Meta 描述控制在可读长度内，先说明对象、问题和结果，不要堆关键词。",
            "每篇文章至少连接 2-3 个相关工具/模板/教程，但不要硬塞无关链接。",
            "内链锚文本要自然，避免所有链接都叫“点击这里”或重复同一关键词。",
            "涉及价格、平台规则、API 限额和部署步骤时，发布前重新查官方资料。",
            "搜索结果没有数据前，不要写“最高”“最全”“必上首页”等无法证明的承诺。",
          ].map((item) => (
            <li className="rounded-md bg-gray-50 p-3" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function buildPlan({
  audience,
  intent,
  keywords,
  market,
  summary,
  title,
}: {
  audience: Audience;
  intent: Intent;
  keywords: string;
  market: Market;
  summary: string;
  title: string;
}) {
  const keywordList = keywords
    .split(/[，,、\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const primary = keywordList[0] || title;
  const audienceLabel = labelFor(audiences, audience);
  const rule = intentRules[intent];
  const marketSuffix = market === "global" ? "English query version also needed" : market === "dual" ? "中英文双线都要保留" : "中文长尾优先";

  const titles = [
    `${primary}怎么做：${audienceLabel}从判断到上线的流程`,
    `${primary}新手指南：适用场景、步骤、风险和检查清单`,
    `${title.replace(/[：:，,。.!！?？]/g, " ").replace(/\s+/g, " ").trim()}：交付前怎么检查`,
    `${primary}常见错误：什么时候不能直接交给 AI 自动处理`,
    `${primary}工具化流程：输入资料、生成结果和人工复核点`,
  ].map((item) => trimTitle(item));

  const descriptions = [
    `${summary} 本文整理适用场景、操作步骤、风险边界和人工复核清单，适合${audienceLabel}在发布或交付前使用。`,
    `围绕${primary}，拆解搜索意图、执行步骤、常见错误、内链工具和发布前检查，避免只写概念不落地。`,
    `给${audienceLabel}的${primary}实操说明：先判断场景，再选择工具和流程，最后按清单复核事实、隐私和交付边界。`,
  ].map((item) => trimDescription(item));

  const haystack = `${title} ${summary} ${keywords}`.toLowerCase();
  const internalLinks = linkTargets
    .map((target) => {
      const score = target.keywords.filter((keyword) => haystack.includes(keyword.toLowerCase())).length;
      return {
        ...target,
        reason: score > 0 ? `匹配关键词：${target.keywords.filter((keyword) => haystack.includes(keyword.toLowerCase())).join("、")}` : "",
        score,
      };
    })
    .filter((target) => target.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const sections = [
    `标题规则：${rule.title}`,
    `正文结构：${rule.section}`,
    `转化入口：${rule.cta}`,
    `市场方向：${marketSuffix}`,
    "首屏要先回答“这篇文章帮谁解决什么问题”，不要上来堆工具名。",
    "结尾要给下一步工具或模板，形成文章到工具页的路径。",
  ];

  const fullText = [
    "# 公开文章 SEO 刷新方案",
    "",
    "## 输入",
    `- 当前标题：${title}`,
    `- 目标关键词：${keywordList.join("、") || "未填写"}`,
    `- 搜索意图：${labelFor(intents, intent)}`,
    `- 读者：${audienceLabel}`,
    `- 市场方向：${labelFor(markets, market)}`,
    "",
    "## 标题候选",
    ...titles.map((item) => `- ${item}`),
    "",
    "## Meta 描述候选",
    ...descriptions.map((item) => `- ${item}`),
    "",
    "## 内链建议",
    ...(internalLinks.length ? internalLinks.map((item) => `- [${item.label}](${item.href})：${item.reason}`) : ["- 暂无强匹配，建议先补一个相关工具页或模板页。"]),
    "",
    "## 刷新检查",
    ...sections.map((item) => `- ${item}`),
  ].join("\n");

  return { descriptions, fullText, internalLinks, sections, titles };
}

function trimTitle(value: string) {
  return value.length > 42 ? `${value.slice(0, 41)}…` : value;
}

function trimDescription(value: string) {
  return value.length > 118 ? `${value.slice(0, 117)}…` : value;
}

function PlanPanel({ copyText, items, title }: { copyText: string; items: string[]; title: string }) {
  return (
    <article className="min-w-0 rounded-lg border border-blue-100 bg-blue-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <CopyButton label="复制" text={copyText} />
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
        {items.length ? (
          items.map((item) => (
            <li className="rounded-md bg-white p-3" key={item}>
              {item}
            </li>
          ))
        ) : (
          <li className="rounded-md bg-white p-3">暂无强匹配，建议人工选择最相关工具页。</li>
        )}
      </ul>
    </article>
  );
}

function Select({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  value: string;
}) {
  return (
    <label className="block text-sm font-medium text-gray-800">
      {label}
      <select
        className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 break-words text-sm leading-6 text-gray-900">{value}</dd>
    </div>
  );
}

function labelFor<T extends string>(options: Array<[T, string]>, value: T) {
  return options.find(([optionValue]) => optionValue === value)?.[1] || value;
}

"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type UseCase = "support" | "sales" | "personal" | "enterprise" | "research";
type DataSource = "docs" | "tickets" | "crm" | "chat" | "mixed";
type Freshness = "static" | "weekly" | "daily" | "realtime";
type Privacy = "public" | "internal" | "customer" | "sensitive";
type Retrieval = "keyword" | "vector" | "hybrid" | "memory";

const useCases: Array<[UseCase, string]> = [
  ["support", "客服知识库"],
  ["sales", "销售/客户记忆"],
  ["personal", "个人助理记忆"],
  ["enterprise", "企业内部 Agent"],
  ["research", "研究资料库"],
];

const dataSources: Array<[DataSource, string]> = [
  ["docs", "文档/网页"],
  ["tickets", "工单/FAQ"],
  ["crm", "CRM/客户记录"],
  ["chat", "聊天记录"],
  ["mixed", "混合资料"],
];

const freshnessOptions: Array<[Freshness, string]> = [
  ["static", "基本不变"],
  ["weekly", "每周更新"],
  ["daily", "每天更新"],
  ["realtime", "实时变化"],
];

const privacyOptions: Array<[Privacy, string]> = [
  ["public", "公开资料"],
  ["internal", "内部资料"],
  ["customer", "客户资料"],
  ["sensitive", "隐私/合同/财务敏感"],
];

const retrievalOptions: Array<[Retrieval, string]> = [
  ["keyword", "关键词检索"],
  ["vector", "向量检索"],
  ["hybrid", "混合检索"],
  ["memory", "长期记忆优先"],
];

const useCaseAdvice: Record<UseCase, { goal: string; memory: string[]; risks: string[] }> = {
  support: {
    goal: "让 Agent 基于知识库和历史工单回答问题，同时识别需要人工升级的情况。",
    memory: ["用户问题摘要", "产品规则版本", "已解决工单模式", "升级原因"],
    risks: ["过期规则误答", "赔付承诺越权", "客户隐私泄露"],
  },
  sales: {
    goal: "记录客户偏好、预算、异议和下一步动作，帮助销售持续跟进。",
    memory: ["客户画像", "沟通历史摘要", "预算/决策链", "未解决异议"],
    risks: ["自动承诺价格", "误用客户隐私", "把猜测当事实"],
  },
  personal: {
    goal: "记录用户偏好、项目事实和长期目标，让个人助理减少重复提问。",
    memory: ["用户偏好", "项目事实", "常用格式", "长期目标"],
    risks: ["记错偏好", "长期保存不该保存的信息", "无法删除旧记忆"],
  },
  enterprise: {
    goal: "连接内部制度、项目文档和任务记录，给员工提供可追溯回答。",
    memory: ["部门规则", "项目状态", "权限角色", "审批记录"],
    risks: ["越权读取", "部门隔离失败", "引用来源缺失"],
  },
  research: {
    goal: "沉淀资料来源、研究结论和证据链，生成可追踪摘要和对比。",
    memory: ["资料来源", "关键结论", "反例证据", "更新时间"],
    risks: ["来源失效", "摘要丢失上下文", "引用不完整"],
  },
};

const retrievalAdvice: Record<Retrieval, string[]> = {
  keyword: ["适合结构化标题、编号、产品规则和短 FAQ。", "优点是可解释，缺点是同义表达召回弱。"],
  vector: ["适合语义相似、长文档和自然语言问题。", "需要 chunk、embedding、阈值和重排策略。"],
  hybrid: ["适合生产场景，先关键词/过滤，再向量召回和重排。", "更稳，但要多维护元数据和评测集。"],
  memory: ["适合用户偏好、项目事实和跨会话连续任务。", "必须有写入审批、过期规则和删除机制。"],
};

export function MemoryRagArchitecturePlannerClient() {
  const [useCase, setUseCase] = useState<UseCase>("support");
  const [dataSource, setDataSource] = useState<DataSource>("mixed");
  const [freshness, setFreshness] = useState<Freshness>("daily");
  const [privacy, setPrivacy] = useState<Privacy>("customer");
  const [retrieval, setRetrieval] = useState<Retrieval>("hybrid");
  const [docCount, setDocCount] = useState(1200);
  const [avgDocTokens, setAvgDocTokens] = useState(1800);
  const [users, setUsers] = useState(50);
  const [retentionDays, setRetentionDays] = useState(180);
  const [goal, setGoal] = useState("让客服 Agent 能回答产品问题、引用来源、记住客户上下文，并在敏感问题上转人工");

  const plan = useMemo(
    () => buildPlan({ avgDocTokens, dataSource, docCount, freshness, goal, privacy, retentionDays, retrieval, useCase, users }),
    [avgDocTokens, dataSource, docCount, freshness, goal, privacy, retentionDays, retrieval, useCase, users],
  );

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="应用场景" onChange={(value) => setUseCase(value as UseCase)} options={useCases} value={useCase} />
            <Select label="资料来源" onChange={(value) => setDataSource(value as DataSource)} options={dataSources} value={dataSource} />
            <Select label="更新频率" onChange={(value) => setFreshness(value as Freshness)} options={freshnessOptions} value={freshness} />
            <Select label="隐私等级" onChange={(value) => setPrivacy(value as Privacy)} options={privacyOptions} value={privacy} />
            <Select label="检索策略" onChange={(value) => setRetrieval(value as Retrieval)} options={retrievalOptions} value={retrieval} />
            <NumberInput label="保留天数" min={1} onChange={setRetentionDays} value={retentionDays} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <NumberInput label="资料数量" min={1} onChange={setDocCount} step={100} value={docCount} />
            <NumberInput label="平均 tokens/资料" min={100} onChange={setAvgDocTokens} step={100} value={avgDocTokens} />
            <NumberInput label="预计用户数" min={1} onChange={setUsers} step={10} value={users} />
          </div>

          <label className="mt-5 block text-sm font-medium text-gray-800">
            Agent 记忆目标
            <textarea
              className="mt-2 h-24 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
              onChange={(event) => setGoal(event.target.value)}
              value={goal}
            />
          </label>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">架构建议</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">先区分“记住用户偏好”和“检索知识库”。这两个混在一起，Agent 很容易越权、过期或胡乱补全。</p>
            </div>
            <CopyButton label="复制方案" text={plan.fullText} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="推荐架构" value={plan.primaryArchitecture} />
            <Info label="资料规模" value={`${plan.estimatedChunks.toLocaleString()} chunks 级别`} />
            <Info label="隐私结论" value={plan.privacyConclusion} />
            <Info label="更新策略" value={plan.refreshPlan} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PlanPanel title="记忆分层" items={plan.memoryLayers} copyText={plan.memoryLayers.join("\n")} />
        <PlanPanel title="RAG 管线" items={plan.ragPipeline} copyText={plan.ragPipeline.join("\n")} />
        <PlanPanel title="隐私与删除" items={plan.governance} copyText={plan.governance.join("\n")} />
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">可复制架构说明</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">适合放进 PRD、技术方案、客户 Proposal、内部评审或开发任务拆解。</p>
          </div>
          <CopyButton label="复制全部" text={plan.fullText} />
        </div>
        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-gray-800">{plan.fullText}</pre>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">架构组件对比</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["短期记忆", "只保留当前会话、任务步骤和临时上下文，任务结束后可清理。"],
            ["长期记忆", "保存用户偏好、项目事实和稳定信息，必须有写入审批和过期机制。"],
            ["RAG 知识库", "保存文档 chunks、元数据、向量和引用来源，用于可追溯回答。"],
            ["评测集", "保存真实问题、期望来源、错误样本和回归测试，防止越改越差。"],
          ].map(([title, description]) => (
            <article className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm" key={title}>
              <h3 className="font-semibold text-ink">{title}</h3>
              <p className="mt-1 leading-6 text-gray-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">上线前检查清单</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {[
            "不要把所有历史对话都当长期记忆；先抽取稳定事实，再人工确认。",
            "RAG 回答必须带来源、更新时间和置信边界，不允许无来源硬答。",
            "客户资料、合同、财务和隐私数据必须支持删除、脱敏和访问留痕。",
            "每次知识库更新后跑评测集，检查召回率、错误引用和过期规则。",
            "向量库不是数据库替代品；元数据、权限、版本和审计记录要结构化保存。",
            "记忆写入要有白名单字段，不要让 Agent 自己决定保存任何敏感信息。",
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
  avgDocTokens,
  dataSource,
  docCount,
  freshness,
  goal,
  privacy,
  retentionDays,
  retrieval,
  useCase,
  users,
}: {
  avgDocTokens: number;
  dataSource: DataSource;
  docCount: number;
  freshness: Freshness;
  goal: string;
  privacy: Privacy;
  retentionDays: number;
  retrieval: Retrieval;
  useCase: UseCase;
  users: number;
}) {
  const chunksPerDoc = Math.max(1, Math.ceil(avgDocTokens / 600));
  const estimatedChunks = docCount * chunksPerDoc;
  const advice = useCaseAdvice[useCase];
  const highPrivacy = privacy === "customer" || privacy === "sensitive";
  const frequentUpdates = freshness === "daily" || freshness === "realtime";
  const largeKnowledgeBase = estimatedChunks > 5000;

  const primaryArchitecture = highPrivacy
    ? "Postgres 元数据 + 向量库 + 人工审核记忆写入"
    : largeKnowledgeBase
      ? "混合检索 + 向量库 + 重排 + 引用来源"
      : retrieval === "memory"
        ? "短期会话记忆 + 长期偏好记忆 + 小型知识库"
        : "轻量 RAG + 元数据过滤 + 评测集";

  const privacyConclusion = highPrivacy
    ? "高敏感：默认脱敏、最小权限、可删除、可审计，长期记忆写入必须人工确认。"
    : "中低敏感：仍需来源、版本和删除机制，但可以先做轻量化试点。";

  const refreshPlan = frequentUpdates
    ? "增量同步：按资料更新时间重建 chunks，并保留版本号和失效标记。"
    : "批量同步：定期重建索引，更新后跑评测集再上线。";

  const memoryLayers = [
    `短期记忆：保存当前任务、用户问题、工具调用结果和未完成步骤；任务结束后清理或归档摘要。`,
    `长期记忆：只保存经过确认的稳定事实，例如 ${advice.memory.join("、")}。`,
    `知识库记忆：把 ${labelFor(dataSources, dataSource)} 切成约 ${estimatedChunks.toLocaleString()} 个 chunks，并保留来源、版本、权限和更新时间。`,
    `评测记忆：保存真实问题、期望引用、失败样本和人工判定，用于每次更新后回归。`,
    `保留策略：默认保留 ${retentionDays} 天，到期复核、删除或重新确认。`,
  ];

  const ragPipeline = [
    `检索策略：${labelFor(retrievalOptions, retrieval)}。${retrievalAdvice[retrieval].join(" ")}`,
    "入库前：清洗文本、去重、切 chunk、抽取标题/来源/权限/时间等元数据。",
    "召回时：先按权限和元数据过滤，再做关键词/向量召回，必要时加入 rerank。",
    "生成时：只允许基于召回片段回答，必须输出引用来源和不确定性。",
    "失败时：无来源、低置信、敏感问题和越权请求必须转人工。",
  ];

  const governance = [
    highPrivacy ? "敏感数据默认不进入长期记忆；必须保存时只存摘要、哈希或脱敏字段。" : "公开或内部资料也要保留来源和版本，避免过期内容继续被引用。",
    "每条长期记忆都要记录来源、写入原因、写入时间、最后使用时间和删除状态。",
    "用户应能请求删除个人记忆；删除后要同步清理向量索引、缓存和摘要。",
    "权限模型至少包含用户、团队、资料来源、工具调用和审核角色。",
    "审计日志记录检索 query、命中文档、生成回答、人工审核和错误反馈。",
  ];

  const fullText = [
    "# Agent 记忆与 RAG 架构规划",
    "",
    "## 目标",
    goal,
    "",
    "## 基本判断",
    `- 应用场景：${labelFor(useCases, useCase)}。${advice.goal}`,
    `- 资料来源：${labelFor(dataSources, dataSource)}`,
    `- 更新频率：${labelFor(freshnessOptions, freshness)}`,
    `- 隐私等级：${labelFor(privacyOptions, privacy)}`,
    `- 资料规模：${docCount} 份资料，约 ${estimatedChunks.toLocaleString()} 个 chunks，预计 ${users} 个用户。`,
    `- 推荐架构：${primaryArchitecture}`,
    "",
    "## 记忆分层",
    ...memoryLayers.map((item) => `- ${item}`),
    "",
    "## RAG 管线",
    ...ragPipeline.map((item) => `- ${item}`),
    "",
    "## 隐私、权限与删除",
    ...governance.map((item) => `- ${item}`),
    "",
    "## 高风险提醒",
    ...advice.risks.map((item) => `- ${item}`),
  ].join("\n");

  return { estimatedChunks, fullText, governance, memoryLayers, primaryArchitecture, privacyConclusion, ragPipeline, refreshPlan };
}

function PlanPanel({ copyText, items, title }: { copyText: string; items: string[]; title: string }) {
  return (
    <article className="min-w-0 rounded-lg border border-blue-100 bg-blue-50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <CopyButton label="复制" text={copyText} />
      </div>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
        {items.map((item) => (
          <li className="rounded-md bg-white p-3" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function NumberInput({
  label,
  min,
  onChange,
  step = 1,
  value,
}: {
  label: string;
  min: number;
  onChange: (value: number) => void;
  step?: number;
  value: number;
}) {
  return (
    <label className="block text-sm font-medium text-gray-800">
      {label}
      <input
        className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
        min={min}
        onChange={(event) => onChange(Number(event.target.value))}
        step={step}
        type="number"
        value={value}
      />
    </label>
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

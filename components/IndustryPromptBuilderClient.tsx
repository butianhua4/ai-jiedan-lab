"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Industry = "sales" | "marketing" | "support" | "hr" | "ops" | "finance" | "education" | "dev";
type OutputMode = "checklist" | "table" | "email" | "sop" | "analysis";
type Depth = "quick" | "standard" | "expert";

const industries: Array<[Industry, string]> = [
  ["sales", "销售 / BD"],
  ["marketing", "营销 / SEO"],
  ["support", "客服 / 客成"],
  ["hr", "HR / 招聘"],
  ["ops", "运营 / 行政"],
  ["finance", "财务 / 数据"],
  ["education", "教育 / 培训"],
  ["dev", "开发 / 产品"],
];

const outputModes: Array<[OutputMode, string]> = [
  ["checklist", "检查清单"],
  ["table", "对比表格"],
  ["email", "邮件/话术"],
  ["sop", "SOP 流程"],
  ["analysis", "分析报告"],
];

const depths: Array<[Depth, string]> = [
  ["quick", "快速草稿"],
  ["standard", "可交付版本"],
  ["expert", "专家复核版本"],
];

const industryDefaults: Record<Industry, { task: string; role: string; inputs: string; guardrails: string[]; examples: string[] }> = {
  sales: {
    task: "把客户需求整理成跟进方案、异议处理和下一步行动",
    role: "B2B 销售顾问，擅长发现真实预算、决策链和成交阻力",
    inputs: "客户行业、公司规模、当前痛点、已有沟通记录、报价范围、竞争对手信息",
    guardrails: ["不要编造成交承诺", "不要夸大产品效果", "把不确定信息列为追问问题"],
    examples: ["冷邮件重写", "销售电话提纲", "异议处理清单", "Proposal 前置问题"],
  },
  marketing: {
    task: "把产品卖点转成选题、SEO 大纲、广告文案和复盘指标",
    role: "增长营销负责人，擅长用户痛点、内容漏斗和转化路径",
    inputs: "目标关键词、目标用户、产品功能、竞品页面、已有内容、转化目标",
    guardrails: ["不要承诺排名", "不要伪造案例数据", "区分事实、假设和待验证观点"],
    examples: ["SEO 文章大纲", "小红书标题", "广告 A/B 文案", "内容日历"],
  },
  support: {
    task: "把客户问题整理成回复草稿、工单分类、情绪安抚和升级判断",
    role: "客服质检主管，擅长清晰回复、降级冲突和沉淀知识库",
    inputs: "客户原话、订单状态、产品规则、历史沟通、可承诺范围、升级条件",
    guardrails: ["不要替公司承诺赔付", "敏感投诉必须标记人工处理", "保留客户原始诉求"],
    examples: ["投诉回复", "FAQ 归类", "工单优先级", "知识库条目"],
  },
  hr: {
    task: "把岗位需求转成 JD、面试题、候选人评估和入职计划",
    role: "招聘 HRBP，擅长岗位画像、胜任力模型和结构化面试",
    inputs: "岗位名称、团队阶段、核心职责、必须技能、薪资范围、面试反馈",
    guardrails: ["不要涉及歧视性筛选", "不要伪造候选人经历", "敏感薪资信息需人工确认"],
    examples: ["JD 优化", "面试题库", "候选人打分表", "入职 30 天计划"],
  },
  ops: {
    task: "把杂乱需求整理成流程、责任人、检查点和自动化机会",
    role: "运营流程负责人，擅长拆解重复工作、协作节点和交付风险",
    inputs: "当前流程、参与角色、表格字段、交付周期、常见错误、工具限制",
    guardrails: ["不要跳过人工审批节点", "涉及客户数据要标注隐私边界", "输出必须可追踪"],
    examples: ["流程 SOP", "周报模板", "自动化清单", "项目复盘"],
  },
  finance: {
    task: "把数据和票据需求整理成核对清单、异常项和汇总口径",
    role: "财务数据助理，擅长口径统一、异常检查和复核留痕",
    inputs: "表格字段、金额口径、日期范围、发票信息、合同规则、历史数据",
    guardrails: ["不替代会计或法务判断", "金额结论必须人工复核", "保留原始数据版本"],
    examples: ["报销审核清单", "收入汇总口径", "异常金额检查", "对账说明"],
  },
  education: {
    task: "把知识点整理成课程大纲、练习题、讲稿和学习反馈",
    role: "课程设计师，擅长学习目标、分层讲解和练习闭环",
    inputs: "学习对象、基础水平、知识点、课时长度、作业要求、考核方式",
    guardrails: ["不要编造权威出处", "区分入门和进阶内容", "练习题需给出评分标准"],
    examples: ["课程大纲", "练习题", "课堂讲稿", "学习反馈"],
  },
  dev: {
    task: "把产品/技术需求转成实现方案、边界条件、测试清单和交付说明",
    role: "产品技术顾问，擅长需求澄清、架构取舍和上线风险控制",
    inputs: "目标功能、技术栈、接口限制、数据结构、上线环境、错误日志",
    guardrails: ["不要保存密钥", "高权限操作必须人工确认", "不确定 API 要标注待查文档"],
    examples: ["PRD 拆解", "Bug 复现步骤", "技术方案", "验收清单"],
  },
};

const depthRules: Record<Depth, string[]> = {
  quick: ["先给一个可用草稿", "只保留最关键的 5-7 个动作", "把缺失信息放到最后追问"],
  standard: ["输出可直接交付的结构", "包含执行步骤、检查点和风险提醒", "给出可复制模板"],
  expert: ["先列假设和不确定性", "给出反例、失败风险和人工复核清单", "输出一版主方案和一版保守方案"],
};

export function IndustryPromptBuilderClient() {
  const [industry, setIndustry] = useState<Industry>("marketing");
  const [outputMode, setOutputMode] = useState<OutputMode>("sop");
  const [depth, setDepth] = useState<Depth>("standard");
  const [task, setTask] = useState(industryDefaults.marketing.task);
  const [inputs, setInputs] = useState(industryDefaults.marketing.inputs);
  const [audience, setAudience] = useState("小团队负责人、自由职业者或一线执行同事");
  const [tone, setTone] = useState("清晰、具体、不过度承诺，适合直接交付给同事继续改");

  const selected = industryDefaults[industry];
  const outputLabel = labelFor(outputModes, outputMode);
  const depthLabel = labelFor(depths, depth);

  const generated = useMemo(() => {
    const corePrompt = [
      `你现在是${selected.role}。`,
      "",
      `任务：${task}`,
      `使用对象：${audience}`,
      `已有输入资料：${inputs}`,
      `输出格式：${outputLabel}`,
      `输出深度：${depthLabel}`,
      `语气要求：${tone}`,
      "",
      "请按以下结构输出：",
      "1. 先复述你理解的目标，列出 3 个关键假设。",
      "2. 给出可执行结果，不要只讲原则。",
      "3. 单独列出缺失信息和需要追问的问题。",
      "4. 标注哪些内容必须人工复核。",
      "5. 最后给出下一步行动清单。",
      "",
      "约束：",
      ...selected.guardrails.map((item) => `- ${item}`),
      ...depthRules[depth].map((item) => `- ${item}`),
    ].join("\n");

    const reviewPrompt = [
      "请扮演严格的交付质检人，检查下面这份 AI 输出。",
      "",
      "检查维度：",
      "- 是否有编造事实、过度承诺或缺少证据的表述",
      "- 是否真正可执行，而不是泛泛建议",
      "- 是否遗漏关键输入资料、责任人、时间、边界或风险",
      "- 是否适合交付给客户/同事继续使用",
      "",
      "请输出：问题清单、修改建议、可直接替换的最终版本。",
    ].join("\n");

    const sopPrompt = [
      "请把上面的高质量提示词沉淀成团队可复用 SOP。",
      "",
      "输出字段：",
      "- 使用场景",
      "- 必填输入",
      "- 可选输入",
      "- 禁用场景",
      "- 执行步骤",
      "- 人工复核点",
      "- 示例输入",
      "- 示例输出结构",
    ].join("\n");

    return { corePrompt, reviewPrompt, sopPrompt };
  }, [audience, depth, depthLabel, inputs, outputLabel, selected.guardrails, selected.role, task, tone]);

  const allPrompts = [generated.corePrompt, generated.reviewPrompt, generated.sopPrompt].join("\n\n---\n\n");

  function loadIndustry(nextIndustry: Industry) {
    const preset = industryDefaults[nextIndustry];
    setIndustry(nextIndustry);
    setTask(preset.task);
    setInputs(preset.inputs);
  }

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <Select label="行业 / 岗位" onChange={(value) => loadIndustry(value as Industry)} options={industries} value={industry} />
            <Select label="输出格式" onChange={(value) => setOutputMode(value as OutputMode)} options={outputModes} value={outputMode} />
            <Select label="输出深度" onChange={(value) => setDepth(value as Depth)} options={depths} value={depth} />
          </div>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-medium text-gray-800">
              要完成的真实任务
              <textarea
                className="mt-2 h-24 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setTask(event.target.value)}
                value={task}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              已有输入资料
              <textarea
                className="mt-2 h-28 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setInputs(event.target.value)}
                value={inputs}
              />
            </label>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-800">
                使用对象
                <input
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                  onChange={(event) => setAudience(event.target.value)}
                  value={audience}
                />
              </label>
              <label className="text-sm font-medium text-gray-800">
                语气和边界
                <input
                  className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                  onChange={(event) => setTone(event.target.value)}
                  value={tone}
                />
              </label>
            </div>
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">生成结果</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">一套提示词包含执行、质检和沉淀 SOP 三段，更适合团队复用和项目交付。</p>
            </div>
            <CopyButton label="复制全部" text={allPrompts} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="适用场景" value={selected.examples.join("、")} />
            <Info label="人工边界" value={selected.guardrails.join("；")} />
            <Info label="深度规则" value={depthRules[depth].join("；")} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PromptPanel title="核心执行提示词" description="复制给 ChatGPT、Claude、Gemini 或企业内部 AI 助手，先产出可用草稿。" text={generated.corePrompt} />
        <PromptPanel title="质量校对提示词" description="让 AI 反过来挑错，重点查泛化、夸大、遗漏和不可交付内容。" text={generated.reviewPrompt} />
        <PromptPanel title="SOP 沉淀提示词" description="把一次性提示词整理成团队模板，后续可以放进知识库或流程文档。" text={generated.sopPrompt} />
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">高频行业模板</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {industries.map(([value, label]) => (
            <button
              className={`rounded-md border p-3 text-left text-sm transition ${
                industry === value ? "border-brand bg-blue-50 text-ink" : "border-gray-200 bg-gray-50 text-gray-700 hover:border-brand/50"
              }`}
              key={value}
              onClick={() => loadIndustry(value)}
              type="button"
            >
              <span className="font-semibold">{label}</span>
              <span className="mt-1 block leading-6">{industryDefaults[value].examples.slice(0, 2).join("、")}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">交付前检查清单</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {[
            "先把客户资料、产品规则、报价、时间和禁用承诺补齐，再把提示词交给 AI。",
            "所有金额、法律、医疗、合同、隐私和客户承诺内容必须人工复核。",
            "输出要能直接执行：有步骤、负责人、输入资料、交付格式和下一步动作。",
            "不要把提示词写成万能口号；每个模板都要绑定行业、岗位和任务。",
            "同一套提示词至少保留执行版、质检版和 SOP 版，方便团队复用。",
            "如果要发到公开平台，先删除客户隐私、内部价格和不可公开截图。",
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

function PromptPanel({ description, text, title }: { description: string; text: string; title: string }) {
  return (
    <article className="min-w-0 rounded-lg border border-blue-100 bg-blue-50 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-700">{description}</p>
        </div>
        <CopyButton label="复制" text={text} />
      </div>
      <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-gray-800">{text}</pre>
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

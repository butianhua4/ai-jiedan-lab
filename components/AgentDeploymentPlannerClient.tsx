"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type Platform = "vercel" | "docker" | "local" | "dify" | "n8n";
type AgentMode = "support" | "research" | "ops" | "coding" | "sales";
type DataLevel = "public" | "internal" | "customer" | "regulated";
type WriteLevel = "read" | "draft" | "write_review" | "write_auto";

const platforms: Array<[Platform, string]> = [
  ["vercel", "Vercel / Web App"],
  ["docker", "Docker / 云服务器"],
  ["local", "本地 / 内网"],
  ["dify", "Dify / 工作流平台"],
  ["n8n", "n8n / 自动化平台"],
];

const agentModes: Array<[AgentMode, string]> = [
  ["support", "客服问答 Agent"],
  ["research", "资料研究 Agent"],
  ["ops", "运营自动化 Agent"],
  ["coding", "代码辅助 Agent"],
  ["sales", "销售跟进 Agent"],
];

const dataLevels: Array<[DataLevel, string]> = [
  ["public", "公开资料"],
  ["internal", "内部资料"],
  ["customer", "客户资料"],
  ["regulated", "财务/合同/隐私敏感"],
];

const writeLevels: Array<[WriteLevel, string]> = [
  ["read", "只读查询"],
  ["draft", "只生成草稿"],
  ["write_review", "写入前人工确认"],
  ["write_auto", "允许自动写入"],
];

const platformAdvice: Record<Platform, { runtime: string; storage: string; deploy: string[]; checks: string[] }> = {
  vercel: {
    runtime: "适合做网站、API 路由、轻量 Agent、Webhook 和前端工具；长任务要拆成队列或后台流程。",
    storage: "环境变量放密钥；用户偏好、任务记录和审核状态放数据库；敏感文件不要放公开静态目录。",
    deploy: ["先做只读 API 和日志", "再接入工具调用", "最后打开写入权限", "用预览部署做测试"],
    checks: ["确认环境变量齐全", "确认函数超时和重试策略", "确认日志不打印密钥", "确认回滚路径"],
  },
  docker: {
    runtime: "适合需要常驻进程、私有模型、队列 worker、浏览器自动化或企业内网调用的 Agent。",
    storage: "用独立数据库记录任务、工具调用、审批和失败；容器镜像不要写入真实密钥。",
    deploy: ["构建镜像", "配置 secrets", "启动健康检查", "接入反向代理", "压测并发和重试"],
    checks: ["确认镜像可复现", "确认容器权限最小化", "确认磁盘和内存限制", "确认日志轮转"],
  },
  local: {
    runtime: "适合内部试点、本地模型、敏感文档和还没准备公开上线的 Agent。",
    storage: "优先本地数据库或内网存储；外发到模型 API 前要确认脱敏和授权。",
    deploy: ["先跑本地样例", "再接入真实文档", "设定白名单工具", "只在内网开放"],
    checks: ["确认端口不公网暴露", "确认本地文件权限", "确认脱敏策略", "确认备份和删除规则"],
  },
  dify: {
    runtime: "适合快速搭建知识库问答、表单输入、LLM 节点和人工可控工作流。",
    storage: "知识库、变量和会话记录要分层管理；敏感资料先做权限和引用来源检查。",
    deploy: ["整理知识库", "配置模型供应商", "设置工作流节点", "测试异常分支", "发布前人工验收"],
    checks: ["确认知识库引用准确", "确认变量没有密钥泄露", "确认失败分支", "确认人工兜底"],
  },
  n8n: {
    runtime: "适合把 Agent 接到邮件、表格、CRM、Webhook 和定时任务。",
    storage: "凭据放 n8n credentials；任务结果写入可审计表格或数据库。",
    deploy: ["先用手动触发", "再改定时/Webhook", "增加错误分支", "打开通知和审批"],
    checks: ["确认凭据权限", "确认幂等处理", "确认失败重试", "确认误触发保护"],
  },
};

const modeAdvice: Record<AgentMode, { goal: string; tools: string[]; review: string[] }> = {
  support: {
    goal: "回答客户问题、生成回复草稿、分类工单并识别需要人工升级的情况。",
    tools: ["知识库检索", "订单状态查询", "FAQ 匹配", "工单草稿生成"],
    review: ["投诉、退款、赔付、隐私和法律风险必须人工确认", "只允许发送经过审核的回复"],
  },
  research: {
    goal: "从网页、文档或数据库中整理资料，输出带来源的摘要、对比和行动建议。",
    tools: ["网页检索", "文档读取", "引用来源整理", "表格汇总"],
    review: ["来源不完整时不得下结论", "外部资料需要标注日期和链接"],
  },
  ops: {
    goal: "把重复运营任务拆成可追踪流程，例如日报、线索整理、表格同步和提醒。",
    tools: ["表格读取", "CRM 查询", "消息通知", "任务创建"],
    review: ["写入 CRM、群发消息、客户承诺前必须确认", "失败重试要避免重复创建"],
  },
  coding: {
    goal: "辅助排错、生成实现方案、读取仓库上下文并给出可验证的修改建议。",
    tools: ["代码搜索", "日志读取", "测试运行", "PR 草稿"],
    review: ["删除、部署、密钥、权限变更必须人工确认", "提交前必须跑测试"],
  },
  sales: {
    goal: "整理客户背景、生成跟进话术、识别异议、准备 Proposal 和下一步行动。",
    tools: ["客户资料读取", "邮件草稿", "CRM 记录", "会议纪要整理"],
    review: ["报价、折扣、合同承诺和客户敏感信息必须人工确认", "不要自动群发冷邮件"],
  },
};

const dataRisk: Record<DataLevel, { label: string; rules: string[] }> = {
  public: {
    label: "低风险，但仍要记录来源和更新时间。",
    rules: ["允许检索和摘要", "输出要标注来源", "不要伪造未读过的资料"],
  },
  internal: {
    label: "中风险，需要限制访问范围和日志内容。",
    rules: ["只给 Agent 读取必要目录", "日志不要包含完整内部文档", "离职/外包账号要及时撤权"],
  },
  customer: {
    label: "高风险，需要脱敏、审批和访问留痕。",
    rules: ["默认不把客户隐私发给不必要的外部模型", "输出前删除身份证、电话、地址等敏感字段", "保留审批记录"],
  },
  regulated: {
    label: "最高风险，不能让 Agent 单独做最终判断。",
    rules: ["财务、合同、医疗、法务结论必须人工复核", "不要自动写入或发送", "保留原始数据、变更记录和审核人"],
  },
};

export function AgentDeploymentPlannerClient() {
  const [platform, setPlatform] = useState<Platform>("vercel");
  const [mode, setMode] = useState<AgentMode>("ops");
  const [dataLevel, setDataLevel] = useState<DataLevel>("customer");
  const [writeLevel, setWriteLevel] = useState<WriteLevel>("write_review");
  const [goal, setGoal] = useState("把客户表格、邮件和聊天记录整理成可审核的跟进任务，并提醒负责人处理");
  const [tools, setTools] = useState("读取 Google Sheets、读取 Gmail 草稿、创建 CRM 任务、发送 Slack/飞书提醒");
  const [model, setModel] = useState("优先使用 API 模型；涉及隐私资料时先脱敏，必要时改成本地模型或内网部署");

  const plan = useMemo(() => buildPlan({ dataLevel, goal, mode, model, platform, tools, writeLevel }), [dataLevel, goal, mode, model, platform, tools, writeLevel]);

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="部署平台" onChange={(value) => setPlatform(value as Platform)} options={platforms} value={platform} />
            <Select label="Agent 类型" onChange={(value) => setMode(value as AgentMode)} options={agentModes} value={mode} />
            <Select label="数据敏感度" onChange={(value) => setDataLevel(value as DataLevel)} options={dataLevels} value={dataLevel} />
            <Select label="写入权限" onChange={(value) => setWriteLevel(value as WriteLevel)} options={writeLevels} value={writeLevel} />
          </div>
          <div className="mt-5 grid gap-4">
            <label className="text-sm font-medium text-gray-800">
              Agent 要完成的目标
              <textarea
                className="mt-2 h-24 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setGoal(event.target.value)}
                value={goal}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              计划接入的工具
              <textarea
                className="mt-2 h-24 w-full rounded-md border border-gray-300 p-3 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setTools(event.target.value)}
                value={tools}
              />
            </label>
            <label className="text-sm font-medium text-gray-800">
              模型与数据策略
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setModel(event.target.value)}
                value={model}
              />
            </label>
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">部署方案</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">先规划权限和验收，再写代码或买工具。Agent 最危险的不是不会跑，而是跑错了还自动写入。</p>
            </div>
            <CopyButton label="复制方案" text={plan.fullText} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="推荐运行方式" value={plan.platform.runtime} />
            <Info label="数据风险" value={plan.risk.label} />
            <Info label="权限结论" value={plan.permissionConclusion} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PlanPanel title="上线架构" items={plan.architecture} copyText={plan.architecture.join("\n")} />
        <PlanPanel title="工具权限矩阵" items={plan.permissionMatrix} copyText={plan.permissionMatrix.join("\n")} />
        <PlanPanel title="验收与回滚" items={plan.launchChecklist} copyText={plan.launchChecklist.join("\n")} />
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">可复制部署说明</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">适合放进 PRD、外包需求、客户 Proposal 或内部上线评审。</p>
          </div>
          <CopyButton label="复制全部" text={plan.fullText} />
        </div>
        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-gray-800">{plan.fullText}</pre>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">常见部署路径</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          {platforms.map(([value, label]) => (
            <button
              className={`rounded-md border p-3 text-left text-sm transition ${
                platform === value ? "border-brand bg-blue-50 text-ink" : "border-gray-200 bg-gray-50 text-gray-700 hover:border-brand/50"
              }`}
              key={value}
              onClick={() => setPlatform(value)}
              type="button"
            >
              <span className="font-semibold">{label}</span>
              <span className="mt-1 block leading-6">{platformAdvice[value].deploy.slice(0, 2).join("、")}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">Agent 上线前检查清单</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {[
            "先把工具分成只读、草稿、写入、执行四类，不要一开始就给全权限。",
            "所有写入 CRM、发消息、扣费、删数据、部署和密钥变更都要有人审节点。",
            "日志必须记录任务 ID、工具名、输入摘要、输出摘要、审批人和失败原因。",
            "每个工具都要有超时、重试、幂等和失败通知，避免重复写入或无限循环。",
            "涉及客户资料、合同、财务和隐私时，先脱敏，再检索，再人工复核。",
            "上线前准备回滚：关闭开关、撤销密钥、恢复数据、通知负责人。",
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
  dataLevel,
  goal,
  mode,
  model,
  platform,
  tools,
  writeLevel,
}: {
  dataLevel: DataLevel;
  goal: string;
  mode: AgentMode;
  model: string;
  platform: Platform;
  tools: string;
  writeLevel: WriteLevel;
}) {
  const platformPlan = platformAdvice[platform];
  const modePlan = modeAdvice[mode];
  const risk = dataRisk[dataLevel];
  const permissionConclusion =
    writeLevel === "write_auto"
      ? "风险偏高：建议只在低风险、可回滚、幂等任务里开启自动写入。"
      : writeLevel === "write_review"
        ? "推荐：允许 Agent 准备写入内容，但执行前必须人工确认。"
        : writeLevel === "draft"
          ? "保守：Agent 只产出草稿，不直接改外部系统。"
          : "最低风险：Agent 只读查询，适合第一阶段试点。";

  const architecture = [
    `目标：${goal}`,
    `Agent 定位：${modePlan.goal}`,
    `部署平台：${labelFor(platforms, platform)}。${platformPlan.runtime}`,
    `模型策略：${model}`,
    `数据策略：${platformPlan.storage}`,
  ];

  const parsedTools = tools
    .split(/[，,、\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
  const permissionMatrix = (parsedTools.length ? parsedTools : modePlan.tools).map((tool) => {
    const action =
      writeLevel === "read"
        ? "只读"
        : writeLevel === "draft"
          ? "生成草稿"
          : writeLevel === "write_review"
            ? "写入前人工确认"
            : "仅低风险任务可自动写入";
    return `${tool}：${action}；记录输入摘要、输出摘要、调用时间和失败原因。`;
  });

  const launchChecklist = [
    ...platformPlan.deploy.map((item) => `部署：${item}`),
    ...platformPlan.checks.map((item) => `平台检查：${item}`),
    ...risk.rules.map((item) => `数据检查：${item}`),
    ...modePlan.review.map((item) => `人工复核：${item}`),
  ];

  const fullText = [
    "# Agent 部署与权限规划",
    "",
    "## 目标",
    goal,
    "",
    "## 上线架构",
    ...architecture.map((item) => `- ${item}`),
    "",
    "## 工具权限矩阵",
    ...permissionMatrix.map((item) => `- ${item}`),
    "",
    "## 数据与安全边界",
    `- ${risk.label}`,
    ...risk.rules.map((item) => `- ${item}`),
    `- ${permissionConclusion}`,
    "",
    "## 上线检查",
    ...launchChecklist.map((item) => `- ${item}`),
    "",
    "## 回滚方案",
    "- 准备总开关，必要时立即关闭 Agent 写入能力。",
    "- 撤销或轮换工具密钥。",
    "- 根据任务日志恢复或撤销错误写入。",
    "- 把失败样本加入测试集，再重新上线。",
  ].join("\n");

  return { architecture, fullText, launchChecklist, permissionConclusion, permissionMatrix, platform: platformPlan, risk };
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

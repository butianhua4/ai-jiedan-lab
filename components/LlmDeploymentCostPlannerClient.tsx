"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type ModelSize = "3" | "7" | "14" | "32" | "70";
type Quantization = "fp16" | "int8" | "int4";
type Privacy = "public" | "internal" | "customer" | "regulated";
type Traffic = "steady" | "spiky" | "batch";

const modelSizes: Array<[ModelSize, string]> = [
  ["3", "3B / 小模型"],
  ["7", "7B / 入门生产"],
  ["14", "14B / 中等质量"],
  ["32", "32B / 高质量"],
  ["70", "70B / 大模型"],
];

const quantizations: Array<[Quantization, string]> = [
  ["fp16", "FP16 / BF16"],
  ["int8", "INT8"],
  ["int4", "INT4 / Q4"],
];

const privacyOptions: Array<[Privacy, string]> = [
  ["public", "公开资料"],
  ["internal", "内部资料"],
  ["customer", "客户资料"],
  ["regulated", "合同/财务/隐私敏感"],
];

const trafficOptions: Array<[Traffic, string]> = [
  ["steady", "稳定在线服务"],
  ["spiky", "突发请求"],
  ["batch", "批处理/离线任务"],
];

const quantBytes: Record<Quantization, number> = {
  fp16: 2,
  int8: 1,
  int4: 0.55,
};

export function LlmDeploymentCostPlannerClient() {
  const [modelSize, setModelSize] = useState<ModelSize>("7");
  const [quantization, setQuantization] = useState<Quantization>("int4");
  const [privacy, setPrivacy] = useState<Privacy>("customer");
  const [traffic, setTraffic] = useState<Traffic>("spiky");
  const [concurrency, setConcurrency] = useState(8);
  const [contextTokens, setContextTokens] = useState(8000);
  const [requestsPerDay, setRequestsPerDay] = useState(1200);
  const [avgInputTokens, setAvgInputTokens] = useState(900);
  const [avgOutputTokens, setAvgOutputTokens] = useState(450);
  const [apiInputUsd, setApiInputUsd] = useState(0.5);
  const [apiOutputUsd, setApiOutputUsd] = useState(1.5);
  const [gpuHourlyUsd, setGpuHourlyUsd] = useState(1.2);
  const [gpuHoursPerDay, setGpuHoursPerDay] = useState(10);

  const plan = useMemo(
    () =>
      buildPlan({
        apiInputUsd,
        apiOutputUsd,
        avgInputTokens,
        avgOutputTokens,
        concurrency,
        contextTokens,
        gpuHourlyUsd,
        gpuHoursPerDay,
        modelSize,
        privacy,
        quantization,
        requestsPerDay,
        traffic,
      }),
    [
      apiInputUsd,
      apiOutputUsd,
      avgInputTokens,
      avgOutputTokens,
      concurrency,
      contextTokens,
      gpuHourlyUsd,
      gpuHoursPerDay,
      modelSize,
      privacy,
      quantization,
      requestsPerDay,
      traffic,
    ],
  );

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="模型规模" onChange={(value) => setModelSize(value as ModelSize)} options={modelSizes} value={modelSize} />
            <Select label="量化方式" onChange={(value) => setQuantization(value as Quantization)} options={quantizations} value={quantization} />
            <Select label="数据敏感度" onChange={(value) => setPrivacy(value as Privacy)} options={privacyOptions} value={privacy} />
            <Select label="流量形态" onChange={(value) => setTraffic(value as Traffic)} options={trafficOptions} value={traffic} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <NumberInput label="并发请求" min={1} onChange={setConcurrency} value={concurrency} />
            <NumberInput label="上下文长度 tokens" min={1000} onChange={setContextTokens} step={1000} value={contextTokens} />
            <NumberInput label="每日请求数" min={1} onChange={setRequestsPerDay} step={100} value={requestsPerDay} />
            <NumberInput label="平均输入 tokens" min={1} onChange={setAvgInputTokens} step={100} value={avgInputTokens} />
            <NumberInput label="平均输出 tokens" min={1} onChange={setAvgOutputTokens} step={50} value={avgOutputTokens} />
            <NumberInput label="GPU 每天运行小时" min={1} onChange={setGpuHoursPerDay} value={gpuHoursPerDay} />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <NumberInput label="API 输入 $/百万 tokens" min={0} onChange={setApiInputUsd} step={0.1} value={apiInputUsd} />
            <NumberInput label="API 输出 $/百万 tokens" min={0} onChange={setApiOutputUsd} step={0.1} value={apiOutputUsd} />
            <NumberInput label="GPU $/小时" min={0} onChange={setGpuHourlyUsd} step={0.1} value={gpuHourlyUsd} />
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">路径建议</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">价格字段由你输入，本工具只做粗估和路径判断，不声称实时价格。</p>
            </div>
            <CopyButton label="复制方案" text={plan.fullText} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="推荐路径" value={plan.primaryPath} />
            <Info label="估算显存" value={`${plan.estimatedVramGb.toFixed(1)} GB`} />
            <Info label="API 月成本粗估" value={`$${plan.apiMonthlyUsd.toFixed(2)}`} />
            <Info label="GPU 月成本粗估" value={`$${plan.gpuMonthlyUsd.toFixed(2)}`} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PlanPanel title="推荐路径" items={plan.pathReasons} copyText={plan.pathReasons.join("\n")} />
        <PlanPanel title="部署检查" items={plan.deploymentChecklist} copyText={plan.deploymentChecklist.join("\n")} />
        <PlanPanel title="成本控制" items={plan.costControls} copyText={plan.costControls.join("\n")} />
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-ink">可复制部署评估</h2>
            <p className="mt-1 text-sm leading-6 text-gray-700">适合放进技术方案、客户报价说明、上线评审或采购对比表。</p>
          </div>
          <CopyButton label="复制全部" text={plan.fullText} />
        </div>
        <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 text-sm leading-6 text-gray-800">{plan.fullText}</pre>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">路径对比</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["API 模型", "最快上线，适合早期验证；数据和成本依赖供应商。"],
            ["Ollama 本地", "适合小模型、本机试验、隐私优先和低并发。"],
            ["vLLM / GPU", "适合稳定高并发、OpenAI-compatible 接口和吞吐优化。"],
            ["Serverless GPU", "适合突发流量，但要关注冷启动、镜像体积和队列。"],
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
            "价格、GPU 型号、上下文长度和并发都必须按当日供应商页面复核。",
            "不要只看模型权重显存，还要预留 KV cache、框架开销、并发和峰值请求。",
            "先做 50-100 条真实样本压测，再决定 API、Ollama、vLLM 或 serverless GPU。",
            "敏感数据默认先脱敏；合同、财务、医疗和客户隐私不能让模型独立判断。",
            "上线前准备限流、缓存、降级、日志、告警和回滚，不要直接裸跑生产流量。",
            "如果输出会影响客户承诺、报价或法律判断，必须保留人工审核节点。",
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
  apiInputUsd,
  apiOutputUsd,
  avgInputTokens,
  avgOutputTokens,
  concurrency,
  contextTokens,
  gpuHourlyUsd,
  gpuHoursPerDay,
  modelSize,
  privacy,
  quantization,
  requestsPerDay,
  traffic,
}: {
  apiInputUsd: number;
  apiOutputUsd: number;
  avgInputTokens: number;
  avgOutputTokens: number;
  concurrency: number;
  contextTokens: number;
  gpuHourlyUsd: number;
  gpuHoursPerDay: number;
  modelSize: ModelSize;
  privacy: Privacy;
  quantization: Quantization;
  requestsPerDay: number;
  traffic: Traffic;
}) {
  const paramsB = Number(modelSize);
  const weightGb = paramsB * quantBytes[quantization];
  const kvCacheGb = Math.max(1, (paramsB / 7) * (contextTokens / 4000) * concurrency * 0.35);
  const estimatedVramGb = (weightGb + kvCacheGb) * 1.25;
  const dailyInputMillion = (requestsPerDay * avgInputTokens) / 1_000_000;
  const dailyOutputMillion = (requestsPerDay * avgOutputTokens) / 1_000_000;
  const apiMonthlyUsd = (dailyInputMillion * apiInputUsd + dailyOutputMillion * apiOutputUsd) * 30;
  const gpuMonthlyUsd = gpuHourlyUsd * gpuHoursPerDay * 30;

  const sensitive = privacy === "customer" || privacy === "regulated";
  const largeModel = paramsB >= 32;
  const highConcurrency = concurrency >= 12 || traffic === "steady";
  const spiky = traffic === "spiky";
  const localCandidate = paramsB <= 14 && concurrency <= 4;
  const primaryPath = sensitive
    ? localCandidate
      ? "Ollama 本地/内网优先，必要时再上私有 GPU"
      : "私有 GPU + vLLM 优先，避免敏感数据直接外发"
    : largeModel || highConcurrency
      ? "vLLM / GPU 在线服务优先"
      : spiky
        ? "API 或 Serverless GPU 优先"
        : "先 API 验证，再按成本迁移自托管";

  const pathReasons = [
    `模型规模：${paramsB}B，${labelFor(quantizations, quantization)}，估算显存约 ${estimatedVramGb.toFixed(1)} GB。`,
    `流量：每日 ${requestsPerDay} 次请求，并发 ${concurrency}，上下文 ${contextTokens} tokens。`,
    `API 月成本粗估：$${apiMonthlyUsd.toFixed(2)}；GPU 月成本粗估：$${gpuMonthlyUsd.toFixed(2)}。`,
    `推荐：${primaryPath}。`,
    sensitive ? "数据敏感：优先考虑脱敏、内网、私有部署或人工审核。" : "数据风险较低：可以先用 API 快速验证，再根据成本迁移。",
  ];

  const deploymentChecklist = [
    "准备真实样本集，覆盖短输入、长上下文、异常输入和高并发。",
    "压测 TTFT、tokens/s、错误率、超时率、P95/P99 延迟和显存峰值。",
    "配置限流、缓存、重试、熔断、降级模型和人工兜底。",
    "记录 prompt、模型版本、参数、输入摘要、输出摘要和审核状态。",
    "上线前做回滚预案：切回 API、切小模型、关闭长上下文或暂停写入。",
  ];

  const costControls = [
    "先减少平均输出 tokens，再考虑换模型；输出长度通常直接影响账单。",
    "用缓存处理 FAQ、固定模板和重复上下文，避免每次重算。",
    "长文档先做检索/RAG，不要把整份资料塞进上下文。",
    "高峰值低均值流量适合 API/serverless；稳定高并发才认真评估自托管 GPU。",
    "定期复核供应商价格、GPU 租用价格、模型量化效果和实际使用率。",
  ];

  const fullText = [
    "# 大模型部署成本与路径评估",
    "",
    "## 输入参数",
    `- 模型规模：${paramsB}B`,
    `- 量化方式：${labelFor(quantizations, quantization)}`,
    `- 数据敏感度：${labelFor(privacyOptions, privacy)}`,
    `- 流量形态：${labelFor(trafficOptions, traffic)}`,
    `- 每日请求：${requestsPerDay}`,
    `- 并发：${concurrency}`,
    `- 平均输入/输出 tokens：${avgInputTokens}/${avgOutputTokens}`,
    "",
    "## 成本粗估",
    `- 估算显存：${estimatedVramGb.toFixed(1)} GB`,
    `- API 月成本：$${apiMonthlyUsd.toFixed(2)}`,
    `- GPU 月成本：$${gpuMonthlyUsd.toFixed(2)}`,
    "- 注意：以上价格依赖你输入的单价，不代表实时供应商价格。",
    "",
    "## 推荐路径",
    ...pathReasons.map((item) => `- ${item}`),
    "",
    "## 部署检查",
    ...deploymentChecklist.map((item) => `- ${item}`),
    "",
    "## 成本控制",
    ...costControls.map((item) => `- ${item}`),
  ].join("\n");

  return { apiMonthlyUsd, costControls, deploymentChecklist, estimatedVramGb, fullText, gpuMonthlyUsd, pathReasons, primaryPath };
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

"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { calculatePricing, suggestedHours, type PricingInput } from "@/lib/pricing";

const projectTypes = ["网站开发", "Bug 修复", "自动化脚本", "数据整理", "AI 工具配置", "其他"];

export function PricingCalculatorClient() {
  const [projectType, setProjectType] = useState("网站开发");
  const [hours, setHours] = useState(5);
  const [difficulty, setDifficulty] = useState<PricingInput["difficulty"]>("beginner");
  const [urgent, setUrgent] = useState(false);
  const [communicationHeavy, setCommunicationHeavy] = useState(true);
  const [maintenance, setMaintenance] = useState(false);
  const [platformFeeRate, setPlatformFeeRate] = useState(10);

  const result = useMemo(
    () => calculatePricing({ projectType, hours, difficulty, urgent, communicationHeavy, maintenance, platformFeeRate }),
    [communicationHeavy, difficulty, hours, maintenance, platformFeeRate, projectType, urgent],
  );

  const quoteText = `参考报价：
最低报价：$${result.minimum}
正常报价：$${result.normal}
高价值报价：$${result.high}
不建议低于：$${result.floor}

说明：${result.explanation}
${result.note}`;

  const scopeChecklist = [
    `项目类型：${projectType}`,
    `预计工时：${hours} 小时`,
    `难度：${difficulty}`,
    `是否加急：${urgent ? "是" : "否"}`,
    `沟通复杂度：${communicationHeavy ? "较高" : "正常"}`,
    `是否包含维护：${maintenance ? "包含" : "不包含"}`,
    `平台抽成：${platformFeeRate}%`,
    "",
    "报价边界：",
    "- 报价只包含当前确认范围。",
    "- 范围变化需要重新确认。",
    "- 不承诺收入结果或一定成交。",
    "- 交付前需要测试和交付说明。",
  ].join("\n");

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">
              项目类型
              <select
                className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => {
                  setProjectType(event.target.value);
                  setHours(suggestedHours(event.target.value));
                }}
                value={projectType}
              >
                {projectTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium">
              预计工时
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                max={200}
                min={1}
                onChange={(event) => setHours(Number(event.target.value))}
                type="number"
                value={hours}
              />
            </label>
            <label className="text-sm font-medium">
              难度
              <select
                className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setDifficulty(event.target.value as PricingInput["difficulty"])}
                value={difficulty}
              >
                <option value="beginner">简单</option>
                <option value="intermediate">中等</option>
                <option value="advanced">复杂</option>
              </select>
            </label>
            <label className="text-sm font-medium">
              平台抽成比例 %
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                max={40}
                min={0}
                onChange={(event) => setPlatformFeeRate(Number(event.target.value))}
                type="number"
                value={platformFeeRate}
              />
            </label>
          </div>
          <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
            已按“{projectType}”预填建议工时，你可以根据真实范围手动调整。
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Check checked={urgent} label="需要加急" onChange={setUrgent} />
            <Check checked={communicationHeavy} label="沟通很多" onChange={setCommunicationHeavy} />
            <Check checked={maintenance} label="后期维护" onChange={setMaintenance} />
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">报价建议</h2>
            <CopyButton text={quoteText} />
          </div>
          <div className="mt-5 grid gap-3">
            <Price label="建议最低报价" value={result.minimum} />
            <Price highlight label="建议正常报价" value={result.normal} />
            <Price label="建议高价值报价" value={result.high} />
            <Price label="不建议低于" value={result.floor} />
          </div>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">新手报价提醒</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">{result.beginnerReminder}</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">报价解释文案</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">{result.explanation}</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">可发给客户的报价说明</h2>
        <p className="mt-3 text-sm leading-6 text-gray-700">
          I can review the current scope first and confirm the final estimate after checking the details. The quote
          includes implementation, basic testing, and a short delivery note. If the scope changes, I will confirm before
          doing extra work.
        </p>
        <div className="mt-4">
          <CopyButton text="I can review the current scope first and confirm the final estimate after checking the details. The quote includes implementation, basic testing, and a short delivery note. If the scope changes, I will confirm before doing extra work." />
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">报价前边界清单</h2>
            <p className="mt-1 text-sm text-gray-700">
              报价不是承诺结果，先把范围、修改次数和不包含内容讲清楚。
            </p>
          </div>
          <CopyButton text={scopeChecklist} />
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
          <li className="rounded-md bg-white p-3">明确包含：实现、基础测试、交付说明。</li>
          <li className="rounded-md bg-white p-3">明确不包含：无限修改、额外页面、长期维护。</li>
          <li className="rounded-md bg-white p-3">客户需求不清时，先做 paid discovery 或小范围评估。</li>
          <li className="rounded-md bg-white p-3">平台抽成、沟通成本和加急成本都要算进去。</li>
        </ul>
      </section>

      <p className="mt-8 rounded-lg border bg-white p-4 text-sm text-gray-600">{result.note}</p>
    </>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-gray-200 bg-white p-3 text-sm transition hover:border-brand/50">
      <input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      {label}
    </label>
  );
}

function Price({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-md border p-4 ${highlight ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink">${value}</p>
    </div>
  );
}

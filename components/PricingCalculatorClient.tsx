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
  const result = useMemo(() => calculatePricing({ projectType, hours, difficulty, urgent, communicationHeavy, maintenance, platformFeeRate }), [projectType, hours, difficulty, urgent, communicationHeavy, maintenance, platformFeeRate]);
  const quoteText = `参考报价：\n最低报价：$${result.minimum}\n正常报价：$${result.normal}\n高价值报价：$${result.high}\n不建议低于：$${result.floor}\n\n说明：${result.explanation}\n${result.note}`;

  return (
    <>
      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium">项目类型<select className="mt-2 w-full rounded-md border p-2" value={projectType} onChange={(event) => { setProjectType(event.target.value); setHours(suggestedHours(event.target.value)); }}>{projectTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="text-sm font-medium">预计工时<input className="mt-2 w-full rounded-md border p-2" type="number" min={1} max={200} value={hours} onChange={(event) => setHours(Number(event.target.value))} /></label>
            <label className="text-sm font-medium">难度<select className="mt-2 w-full rounded-md border p-2" value={difficulty} onChange={(event) => setDifficulty(event.target.value as PricingInput["difficulty"])}><option value="beginner">简单</option><option value="intermediate">中等</option><option value="advanced">复杂</option></select></label>
            <label className="text-sm font-medium">平台抽成比例 %<input className="mt-2 w-full rounded-md border p-2" type="number" min={0} max={40} value={platformFeeRate} onChange={(event) => setPlatformFeeRate(Number(event.target.value))} /></label>
          </div>
          <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
            已按“{projectType}”预填建议工时，你可以根据真实范围手动调整。
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Check label="需要加急" checked={urgent} onChange={setUrgent} />
            <Check label="沟通很多" checked={communicationHeavy} onChange={setCommunicationHeavy} />
            <Check label="后期维护" checked={maintenance} onChange={setMaintenance} />
          </div>
        </div>

        <aside className="rounded-lg border bg-gray-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">报价建议</h2>
            <CopyButton text={quoteText} />
          </div>
          <div className="mt-5 grid gap-3">
            <Price label="建议最低报价" value={result.minimum} />
            <Price label="建议正常报价" value={result.normal} highlight />
            <Price label="建议高价值报价" value={result.high} />
            <Price label="不建议低于" value={result.floor} />
          </div>
        </aside>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="text-lg font-semibold">新手报价提醒</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">{result.beginnerReminder}</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <h2 className="text-lg font-semibold">报价解释文案</h2>
          <p className="mt-3 text-sm leading-6 text-gray-700">{result.explanation}</p>
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <h2 className="text-lg font-semibold">可发给客户的报价说明</h2>
        <p className="mt-3 text-sm leading-6 text-gray-700">
          I can review the current scope first and confirm the final estimate after checking the details. The quote includes implementation, basic testing, and a short delivery note. If the scope changes, I will confirm before doing extra work.
        </p>
        <div className="mt-4">
          <CopyButton text="I can review the current scope first and confirm the final estimate after checking the details. The quote includes implementation, basic testing, and a short delivery note. If the scope changes, I will confirm before doing extra work." />
        </div>
      </section>

      <p className="mt-8 rounded-lg border bg-white p-4 text-sm text-gray-600">{result.note}</p>
    </>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex items-center gap-2 rounded-md border p-3 text-sm"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />{label}</label>;
}

function Price({ label, value, highlight = false }: { label: string; value: number; highlight?: boolean }) {
  return <div className={`rounded-md border p-4 ${highlight ? "border-blue-200 bg-blue-50" : "bg-white"}`}><p className="text-sm text-gray-500">{label}</p><p className="mt-1 text-2xl font-bold">${value}</p></div>;
}

"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { generateProposal, type DeliveryTime, type ExperienceLevel, type PricingStrategy, type ProjectType } from "@/lib/proposal";

const levels: Array<[ExperienceLevel, string]> = [["newbie", "完全新手"], ["some", "有一点经验"], ["skilled", "熟练"]];
const projectTypes: Array<[ProjectType, string]> = [["website", "网站开发"], ["bugfix", "Bug 修复"], ["automation", "自动化脚本"], ["data", "数据整理"], ["ai-setup", "AI 工具配置"], ["other", "其他"]];
const pricingStrategies: Array<[PricingStrategy, string]> = [["starter", "低价起步"], ["normal", "正常报价"], ["premium", "高价值报价"]];
const deliveryTimes: Array<[DeliveryTime, string]> = [["24h", "24 小时内"], ["2-3d", "2-3 天"], ["1w", "1 周内"], ["unknown", "不确定"]];
const sampleJob = "We need a simple landing page update for a small business website. The current page is built with WordPress. Please fix CSS spacing, update the hero text, and make sure the page looks good on mobile. We can provide admin access and screenshots.";

export function ProposalGeneratorClient() {
  const [job, setJob] = useState("");
  const [level, setLevel] = useState<ExperienceLevel>("newbie");
  const [projectType, setProjectType] = useState<ProjectType>("website");
  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy>("starter");
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>("2-3d");
  const result = useMemo(() => generateProposal({ job, level, projectType, pricingStrategy, deliveryTime }), [job, level, projectType, pricingStrategy, deliveryTime]);

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-md border px-4 py-2 text-sm" onClick={() => setJob(sampleJob)}>填入新手友好示例</button>
        <button className="rounded-md border px-4 py-2 text-sm" onClick={() => setJob("")}>清空</button>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold">Upwork Job Posting 原文</label>
          <textarea className="mt-2 h-72 w-full rounded-lg border p-4 text-sm leading-6" value={job} onChange={(event) => setJob(event.target.value)} placeholder="粘贴客户原始需求，越完整越好。" />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Select label="我的水平" value={level} onChange={(value) => setLevel(value as ExperienceLevel)} options={levels} />
            <Select label="项目类型" value={projectType} onChange={(value) => setProjectType(value as ProjectType)} options={projectTypes} />
            <Select label="报价策略" value={pricingStrategy} onChange={(value) => setPricingStrategy(value as PricingStrategy)} options={pricingStrategies} />
            <Select label="交付时间" value={deliveryTime} onChange={(value) => setDeliveryTime(value as DeliveryTime)} options={deliveryTimes} />
          </div>
        </div>

        <aside className="space-y-4 rounded-lg border bg-gray-50 p-5">
          <h2 className="text-xl font-semibold">项目判断</h2>
          <Info label="可行性" value={result.feasible ? "可以继续评估" : "需要谨慎或不建议投"} />
          <Info label="难度" value={result.difficulty} />
          <Info label="新手建议" value={result.beginnerAdvice} />
          <Info label="预计工时" value={result.hours} />
          <Info label="报价建议" value={result.price} />
        </aside>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <ResultBlock title="风险提示" items={result.risks} />
        <ResultBlock title="需要问客户的问题" items={result.questions} />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <ProposalCard title="英文 Proposal" text={result.proposal} />
        <ProposalCard title="简短版本" text={result.shortProposal} />
        <ProposalCard title="更稳妥版本" text={result.safeProposal} />
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">投标前检查清单</h2>
            <p className="mt-1 text-sm text-gray-600">复制 Proposal 前，先确认这些边界，避免承诺无法完成的内容。</p>
          </div>
          <CopyButton text={["需求是否完整", "是否存在站外付款或免费测试风险", "是否能在本地或测试环境验证", "是否写清交付范围和不包含内容", "是否保留客户确认记录"].join("\n")} />
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
          {["需求是否完整", "是否存在站外付款或免费测试风险", "是否能在本地或测试环境验证", "是否写清交付范围和不包含内容", "是否保留客户确认记录"].map((item) => (
            <li key={item} className="rounded-md bg-gray-50 p-3">{item}</li>
          ))}
        </ul>
      </section>

      {result.notRecommendedReason ? (
        <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-lg font-semibold">不建议投标时的原因</h2>
          <p className="mt-2 text-sm leading-6 text-amber-900">{result.notRecommendedReason}</p>
        </section>
      ) : null}
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<[string, string]> }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <select className="mt-2 w-full rounded-md border bg-white p-2" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map(([optionValue, text]) => <option key={optionValue} value={optionValue}>{text}</option>)}
      </select>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="text-xs text-gray-500">{label}</p><p className="mt-1 font-medium text-gray-900">{value}</p></div>;
}

function ResultBlock({ title, items }: { title: string; items: string[] }) {
  return <section className="rounded-lg border bg-white p-5"><h2 className="text-lg font-semibold">{title}</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>;
}

function ProposalCard({ title, text }: { title: string; text: string }) {
  return <section className="rounded-lg border bg-white p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-semibold">{title}</h2><CopyButton text={text} /></div><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-gray-700">{text}</p></section>;
}

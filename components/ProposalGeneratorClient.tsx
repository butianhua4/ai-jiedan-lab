"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import {
  generateProposal,
  type DeliveryTime,
  type ExperienceLevel,
  type PricingStrategy,
  type ProjectType,
} from "@/lib/proposal";

const levels: Array<[ExperienceLevel, string]> = [
  ["newbie", "完全新手"],
  ["some", "有一点经验"],
  ["skilled", "熟练"],
];

const projectTypes: Array<[ProjectType, string]> = [
  ["website", "网站开发"],
  ["bugfix", "Bug 修复"],
  ["automation", "自动化脚本"],
  ["data", "数据整理"],
  ["ai-setup", "AI 工具配置"],
  ["other", "其他"],
];

const pricingStrategies: Array<[PricingStrategy, string]> = [
  ["starter", "低价起步"],
  ["normal", "正常报价"],
  ["premium", "高价值报价"],
];

const deliveryTimes: Array<[DeliveryTime, string]> = [
  ["24h", "24 小时内"],
  ["2-3d", "2-3 天"],
  ["1w", "1 周内"],
  ["unknown", "不确定"],
];

const sampleJob =
  "We need a simple landing page update for a small business website. The current page is built with WordPress. Please fix CSS spacing, update the hero text, and make sure the page looks good on mobile. We can provide admin access and screenshots.";

const preflightItems = [
  "需求是否足够完整",
  "是否存在站外付款、站外沟通或免费测试风险",
  "是否能在本地或测试环境验证",
  "是否写清交付范围和不包含内容",
  "是否保留客户确认记录",
];

export function ProposalGeneratorClient() {
  const [job, setJob] = useState("");
  const [level, setLevel] = useState<ExperienceLevel>("newbie");
  const [projectType, setProjectType] = useState<ProjectType>("website");
  const [pricingStrategy, setPricingStrategy] = useState<PricingStrategy>("starter");
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>("2-3d");

  const result = useMemo(
    () => generateProposal({ job, level, projectType, pricingStrategy, deliveryTime }),
    [job, level, projectType, pricingStrategy, deliveryTime],
  );

  const fullReport = useMemo(
    () =>
      [
        "Upwork Proposal 生成器结果",
        `可行性：${result.feasible ? "可以继续评估" : "需要谨慎或不建议投"}`,
        `难度：${result.difficulty}`,
        `新手建议：${result.beginnerAdvice}`,
        `预计工时：${result.hours}`,
        `报价建议：${result.price}`,
        "",
        "风险提示：",
        ...result.risks.map((item) => `- ${item}`),
        "",
        "需要问客户的问题：",
        ...result.questions.map((item) => `- ${item}`),
        "",
        "英文 Proposal：",
        result.proposal,
        "",
        "投标前提醒：请按真实能力修改，不要承诺无法完成的内容，也不要规避平台规则。",
      ].join("\n"),
    [result],
  );

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand/50"
          onClick={() => setJob(sampleJob)}
          type="button"
        >
          填入新手友好示例
        </button>
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand/50"
          onClick={() => setJob("")}
          type="button"
        >
          清空
        </button>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold" htmlFor="job-posting">
            Upwork Job Posting 原文
          </label>
          <textarea
            className="mt-2 h-72 w-full rounded-lg border border-gray-300 p-4 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            id="job-posting"
            onChange={(event) => setJob(event.target.value)}
            placeholder="粘贴客户原始需求，越完整越好。"
            value={job}
          />
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Select label="我的水平" onChange={(value) => setLevel(value as ExperienceLevel)} options={levels} value={level} />
            <Select label="项目类型" onChange={(value) => setProjectType(value as ProjectType)} options={projectTypes} value={projectType} />
            <Select label="报价策略" onChange={(value) => setPricingStrategy(value as PricingStrategy)} options={pricingStrategies} value={pricingStrategy} />
            <Select label="交付时间" onChange={(value) => setDeliveryTime(value as DeliveryTime)} options={deliveryTimes} value={deliveryTime} />
          </div>
        </div>

        <aside className="min-w-0 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">项目判断</h2>
          <Info label="可行性" value={result.feasible ? "可以继续评估" : "需要谨慎或不建议投"} />
          <Info label="难度" value={result.difficulty} />
          <Info label="新手建议" value={result.beginnerAdvice} />
          <Info label="预计工时" value={result.hours} />
          <Info label="报价建议" value={result.price} />
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ResultBlock items={result.risks} title="风险提示" />
        <ResultBlock items={result.questions} title="需要问客户的问题" />
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">建议下一步</h2>
            <p className="mt-1 text-sm text-gray-700">
              先复制完整评估给自己复核，再只把合适的 Proposal 内容发给客户。
            </p>
          </div>
          <CopyButton text={fullReport} />
        </div>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-md bg-white p-3">1. 先补齐客户需求、截图、仓库或现有链接。</div>
          <div className="rounded-md bg-white p-3">2. 删除你做不到的承诺，保留可验证的小范围。</div>
          <div className="rounded-md bg-white p-3">3. 投标后保留沟通记录，不接受站外付款或违规测试。</div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProposalCard text={result.proposal} title="英文 Proposal" />
        <ProposalCard text={result.shortProposal} title="简短版本" />
        <ProposalCard text={result.safeProposal} title="更稳妥版本" />
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">投标前检查清单</h2>
            <p className="mt-1 text-sm text-gray-600">
              复制 Proposal 前，先确认这些边界，避免承诺无法完成的内容。
            </p>
          </div>
          <CopyButton text={preflightItems.join("\n")} />
        </div>
        <ul className="mt-4 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
          {preflightItems.map((item) => (
            <li className="rounded-md bg-gray-50 p-3" key={item}>
              {item}
            </li>
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

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <select
        className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map(([optionValue, text]) => (
          <option key={optionValue} value={optionValue}>
            {text}
          </option>
        ))}
      </select>
    </label>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 font-medium leading-6 text-gray-900">{value}</p>
    </div>
  );
}

function ResultBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function ProposalCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
        <CopyButton text={text} />
      </div>
      <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-gray-700">{text}</p>
    </section>
  );
}

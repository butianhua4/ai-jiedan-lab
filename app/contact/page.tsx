import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "联系我",
  description: "联系 AI 工具指南，咨询 Codex、Claude Code、GitHub、Vercel 配置、报错排查、提示词、Proposal 检查和项目判断。",
  alternates: { canonical: "/contact" },
};

const fitItems = [
  "Codex / Claude Code / GitHub / Vercel 配置",
  "npm、Git、Vercel、TypeScript 等报错排查",
  "Upwork Proposal 草稿检查和风险提醒",
  "客户需求是否适合新手的初步判断",
  "小网站部署、交付清单和作品集页面建议",
];

const notFitItems = [
  "承诺成交成功或承诺固定收入",
  "代写虚假经历、虚假案例或虚假评价",
  "引导 Upwork / Fiverr 客户站外付款",
  "批量群发未经审核的 Proposal",
  "涉及生产数据库、支付、安全漏洞的高风险交付承诺",
];

const prepItems = [
  "完整报错文本，不要只截最后一行",
  "操作系统、Node 版本、npm 版本、项目框架",
  "GitHub 仓库、Vercel 项目或页面截图",
  "你已经尝试过的命令和步骤",
  "你希望最终交付什么结果",
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">人工协助预留</p>
        <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">联系我</h1>
        <p className="mt-4 max-w-3xl text-gray-600">
          第一版不接在线支付，也不承诺成交结果。联系页主要用于少量人工协助：帮你判断问题、整理下一步、检查配置和风险。长期目标仍然是用工具、模板和内容降低重复人工。
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href="/tools/error-explainer">
            先解释报错
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools/proposal-generator">
            先生成 Proposal
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/templates">
            先下载清单
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <InfoCard title="适合联系" items={fitItems} tone="blue" />
        <InfoCard title="暂不适合" items={notFitItems} tone="red" />
        <InfoCard title="先准备材料" items={prepItems} tone="green" />
      </section>

      <ContactForm />

      <section className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-5 text-sm leading-7 text-gray-700">
        <h2 className="text-lg font-semibold text-ink">收款说明预留</h2>
        <p className="mt-2">
          当前不接在线支付。后期如果提供数字模板，优先使用 Gumroad 或 Lemon Squeezy 自动交付；如果是少量人工协助，再按具体情况考虑 PayPal、Wise 或 Payoneer。Upwork / Fiverr 平台客户必须走平台内收款。
        </p>
        <Link className="mt-4 inline-flex rounded-md border border-gray-300 bg-white px-4 py-2 font-semibold text-ink" href="/monetization">
          查看完整变现路线
        </Link>
      </section>
    </main>
  );
}

function InfoCard({ title, items, tone }: { title: string; items: string[]; tone: "blue" | "red" | "green" }) {
  const toneClass = {
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-50 text-red-700",
    green: "bg-green-50 text-green-700",
  }[tone];

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-600">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${toneClass}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

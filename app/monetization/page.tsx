import Link from "next/link";
import { paymentOptions } from "@/data/payment-options";

export const metadata = {
  title: "变现路线",
  description: "AI 接单实验室的收款、流量收益、模板销售、联盟链接和少量服务引流规划。先做工具和内容，再按阶段接入平台。",
  alternates: { canonical: "/monetization" },
};

const phases = [
  {
    title: "现在：先做工具和内容",
    description: "继续完善 Proposal 生成器、报错解释器、报价助手、模板下载和高质量文章。这个阶段先不急着注册一堆平台。",
  },
  {
    title: "有访问后：接数据工具",
    description: "先接 Google Search Console 和 Analytics，知道用户搜什么、点什么、在哪些页面停留。",
  },
  {
    title: "有下载后：卖模板包",
    description: "免费模板有人下载后，再用 Gumroad 或 Lemon Squeezy 上架付费模板，网站只负责介绍和跳转。",
  },
  {
    title: "有稳定流量后：接广告和联盟",
    description: "等 SEO 页面稳定获得访问，再申请 AdSense 和工具联盟计划，避免早期把页面做得太像广告站。",
  },
];

export default function MonetizationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">收款与流量收益规划</p>
        <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">变现路线</h1>
        <p className="mt-4 max-w-3xl text-gray-600">
          当前策略不是马上注册很多平台，也不是逼自己每天服务客户。先把工具、模板和文章做好，让网站具备被搜索、被使用、被信任的基础；后期再按真实需求接入收款和流量收益。
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href="/templates">
            查看模板
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools">
            查看工具导航
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/contact">
            服务咨询预留
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {phases.map((phase, index) => (
          <article key={phase.title} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-brand">阶段 {index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{phase.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{phase.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-ink">后期到底要注册哪些平台</h2>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            不需要一次性全部注册。当前只需要 GitHub 和 Vercel 跑通网站。后面根据真实使用情况，按下面顺序逐个接入。
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {paymentOptions.map((option) => (
            <article key={option.name} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-brand">{option.stage}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{option.name}</h3>
              <div className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                <p><strong className="text-ink">适合：</strong>{option.bestFor}</p>
                <p><strong className="text-ink">什么时候接：</strong>{option.setupWhen}</p>
                <p><strong className="text-ink">是否要注册：</strong>{option.registrationNeed}</p>
                <p>{option.notes}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-xl font-semibold text-ink">被动收入和人工服务怎么平衡</h2>
        <div className="mt-4 grid gap-4 text-sm leading-6 text-gray-700 md:grid-cols-2">
          <p>
            被动收入主要来自 SEO 流量、广告、联盟链接和模板包。它需要内容积累和时间，不是上线第一天就自动进账。
          </p>
          <p>
            人工服务不是必须长期做，但早期可以少量保留，用来验证真实需求、收集常见问题、反向优化工具和文章。
          </p>
          <p>
            如果以后服务太占时间，就把高频问题做成模板、SOP、工具页面或付费小产品，逐步减少重复人工。
          </p>
          <p>
            所有收益建议都只能作为规划参考，不承诺保证收入，也不鼓励违反平台规则获取客户。
          </p>
        </div>
      </section>
    </main>
  );
}

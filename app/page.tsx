import Link from "next/link";
import type { Metadata } from "next";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Card } from "@/components/Card";
import { ServiceCTA } from "@/components/ServiceCTA";
import { site } from "@/data/site";
import { templates } from "@/data/templates";
import { tools } from "@/data/tools";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
};

const trustItems = ["不承诺暴富", "不鼓励违规操作", "不做搬运洗稿", "只做真实交付"];
const workflow = [
  ["01", "粘贴客户需求", "先判断项目范围、风险和需要追问的问题。"],
  ["02", "生成谨慎草稿", "Proposal、报价和交付说明都要人工修改。"],
  ["03", "排查报错交付", "用检查清单确认构建、部署、移动端和规则边界。"],
];

export default function Home() {
  const posts = getAllPosts(false).slice(0, 6);
  const featuredTools = tools.slice(0, 8);
  const featuredTemplates = templates.slice(0, 5);

  return (
    <main className="w-full max-w-full overflow-hidden">
      <section className="w-full max-w-full border-b bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
          <div className="min-w-0 max-w-full">
            <h1 className="break-words text-4xl font-bold tracking-tight text-ink md:text-6xl">AI 接单实验室</h1>
            <p className="mt-5 max-w-3xl break-words text-xl leading-8 text-gray-800 [overflow-wrap:anywhere]">
              用 Codex、Claude Code 和 ChatGPT，从第一个小单开始建立自由职业收入。
            </p>
            <p className="mt-4 max-w-2xl break-words text-base leading-7 text-gray-600 [overflow-wrap:anywhere]">
              专为不会编程的新手准备，拆解工具配置、Upwork 投标、项目报价、报错解决和交付流程。所有建议都强调真实能力、人工审核和平台规则。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link className="rounded-md bg-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700" href="/tools/proposal-generator">
                免费生成 Proposal
              </Link>
              <Link className="rounded-md border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-brand/50" href="/tools/error-explainer">
                解释报错
              </Link>
              <Link className="rounded-md border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-brand/50" href="/templates">
                下载模板包
              </Link>
            </div>
          </div>

          <div className="min-w-0 max-w-full rounded-lg border border-gray-200 bg-white p-5 shadow-xl shadow-blue-100/60">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm font-semibold text-ink">新手接单工作台</p>
                <p className="mt-1 text-xs text-gray-500">先判断，再生成，再交付</p>
              </div>
              <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">人工审核</span>
            </div>
            <div className="mt-5 space-y-3">
              {workflow.map(([step, title, description]) => (
                <div key={step} className="grid min-w-0 max-w-full grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-md border bg-gray-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-sm font-semibold text-brand shadow-sm">{step}</div>
                  <div className="min-w-0">
                    <h2 className="break-words text-sm font-semibold text-ink">{title}</h2>
                    <p className="mt-1 break-words text-sm leading-6 text-gray-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 min-w-0 break-all rounded-md bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-200">
              <p>risk: check_before_bid</p>
              <p>draft: human_review_required</p>
              <p>publish: small_batch_only</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 py-8 md:grid-cols-4">
        {trustItems.map((item) => (
          <div key={item} className="rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-semibold text-ink shadow-sm">{item}</div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">先用工具解决具体问题</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">工具先解决“能不能投、怎么报价、报错怎么查”三个最常见问题，再决定要不要继续接触客户。</p>
          </div>
          <Link href="/tools" className="text-sm font-medium text-brand">查看全部工具</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card title="Upwork Proposal 生成器" description="生成谨慎可修改的英文投标草稿，自动提示风险和客户问题。" href="/tools/proposal-generator" />
          <Card title="Codex 报错解释器" description="把常见 npm、Git、Vercel、TypeScript 报错翻译成新手步骤。" href="/tools/error-explainer" />
          <Card title="项目报价助手" description="按工时、难度、加急、沟通和平台抽成估算报价范围。" href="/tools/pricing-calculator" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-ink">新手路线</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["配置 AI 开发工具", "找小项目", "判断项目是否能做", "生成 Proposal", "用 AI 辅助交付", "积累评价和案例"].map((step, index) => (
            <div key={step} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-brand">Step {index + 1}</p>
              <h3 className="mt-2 font-semibold text-ink">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-ink">最新文章</h2>
          <Link href="/blog" className="text-sm font-medium text-brand">查看全部</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} title={post.title} description={post.description} href={`/blog/${post.slug}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-ink">推荐工具</h2>
          <Link href="/tools" className="text-sm font-medium text-brand">查看全部</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {featuredTools.map((tool) => (
            <Card key={tool.slug} title={tool.name} description={tool.description} href={`/tools/${tool.slug}`} />
          ))}
        </div>
        <div className="mt-5"><AffiliateDisclosure /></div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold text-ink">模板下载</h2>
          <Link href="/templates" className="text-sm font-medium text-brand">查看全部</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {featuredTemplates.map((template) => (
            <Card key={template.slug} title={template.title} description={template.description} href="/templates" />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <ServiceCTA />
      </div>
    </main>
  );
}

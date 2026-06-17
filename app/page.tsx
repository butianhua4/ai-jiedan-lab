import Link from "next/link";
import type { Metadata } from "next";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Card } from "@/components/Card";
import { ServiceCTA } from "@/components/ServiceCTA";
import { site } from "@/data/site";
import { templates } from "@/data/templates";
import { tools } from "@/data/tools";
import { getAllPosts } from "@/lib/blog";
import { getClusterPath, getHighPotentialQuestionPosts, getQuestionPath, seoClusters } from "@/lib/seo-graph";

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

const trustItems = ["面向搜索", "人工审核", "工具优先", "不夸大收益"];
const searchEntrances = [
  ["提示词模板", "客服、销售、HR、营销、财务和软件开发场景。", "/prompts"],
  ["AI 部署教程", "网页部署、大模型部署、Agent、API 和 RAG。", "/deployments"],
  ["办公自动化", "PPT 策划、表格整理、简历、文案和资料处理。", "/office-ai"],
  ["实用工具", "报价、Proposal、报错解释、成本估算和 SEO 刷新。", "/tools"],
];

export default function Home() {
  const posts = getAllPosts(false).slice(0, 6);
  const featuredTools = tools.slice(0, 8);
  const featuredTemplates = templates.slice(0, 5);
  const priorityQuestions = getHighPotentialQuestionPosts(12);

  return (
    <main className="w-full max-w-full overflow-hidden">
      <section className="w-full max-w-full border-b bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
          <div className="min-w-0 max-w-full">
            <h1 className="break-words text-4xl font-bold tracking-tight text-ink md:text-6xl">AI 工具指南</h1>
            <p className="mt-5 max-w-3xl break-words text-xl leading-8 text-gray-800 [overflow-wrap:anywhere]">
              面向 AI 搜索和普通用户的工具教程库，覆盖办公自动化、提示词、网页部署、大模型、Agent 和记忆/RAG。
            </p>
            <p className="mt-4 max-w-2xl break-words text-base leading-7 text-gray-600 [overflow-wrap:anywhere]">
              先解决真实搜索问题，再顺带把工具、模板和服务入口做好。所有内容都强调人工审核、可复查步骤和风险边界，不承诺自动收入。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link className="rounded-md bg-brand px-5 py-3 text-center text-sm font-semibold text-white shadow-sm shadow-blue-200 transition hover:bg-blue-700" href="/office-ai">
                AI 办公自动化
              </Link>
              <Link className="rounded-md border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-brand/50" href="/deployments">
                AI 部署教程
              </Link>
              <Link className="rounded-md border border-gray-300 bg-white px-5 py-3 text-center text-sm font-semibold text-ink transition hover:border-brand/50" href="/prompts">
                提示词库
              </Link>
            </div>
          </div>

          <div className="min-w-0 max-w-full rounded-lg border border-gray-200 bg-white p-5 shadow-xl shadow-blue-100/60">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm font-semibold text-ink">热门搜索入口</p>
                <p className="mt-1 text-xs text-gray-500">先找教程，再用工具和模板</p>
              </div>
              <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">持续更新</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {searchEntrances.map(([title, description, href]) => (
                <Link key={href} href={href} className="grid min-w-0 max-w-full grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-md border bg-gray-50 p-4 transition hover:border-brand/40 hover:bg-white hover:shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-sm font-semibold text-brand shadow-sm">AI</div>
                  <div className="min-w-0">
                    <h2 className="break-words text-sm font-semibold text-ink">{title}</h2>
                    <p className="mt-1 break-words text-sm leading-6 text-gray-600">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-5 min-w-0 break-all rounded-md bg-slate-950 p-4 font-mono text-xs leading-6 text-slate-200">
              <p>content: search_first</p>
              <p>draft: human_review_required</p>
              <p>tools: solve_real_problem</p>
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
            <h2 className="text-2xl font-bold text-ink">核心主题入口</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              从主题中心进入具体问题，再跳转到深度文章，方便用户按问题路径阅读，也让搜索引擎更容易理解站内结构。
            </p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-brand">查看全部教程</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {seoClusters.map((cluster) => (
            <Link key={cluster.slug} href={getClusterPath(cluster.slug)} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50 hover:shadow-md">
              <p className="text-sm font-medium text-brand">Topic Cluster</p>
              <h3 className="mt-2 break-words text-lg font-semibold text-ink">{cluster.shortTitle}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{cluster.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">热门问题入口</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              优先展示 Agent、RAG、提示词、Codex 和部署相关问题页，这些页面负责承接搜索流量，再导向深度教程。
            </p>
          </div>
          <Link href="/deployments" className="text-sm font-medium text-brand">进入部署教程</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {priorityQuestions.map((post) => (
            <Link key={post.slug} href={getQuestionPath(post)} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand/50 hover:shadow-md">
              <h3 className="break-words text-base font-semibold leading-6 text-ink">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
            </Link>
          ))}
        </div>
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

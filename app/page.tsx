import Link from "next/link";
import type { Metadata } from "next";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Card } from "@/components/Card";
import { ServiceCTA } from "@/components/ServiceCTA";
import { site } from "@/data/site";
import { seoDescription } from "@/lib/seo-metadata";
import { templates } from "@/data/templates";
import { tools } from "@/data/tools";
import { getAllPosts } from "@/lib/blog";
import { getClusterPath, getHighPotentialQuestionPosts, getQuestionName, getQuestionPath, getSeoClusters, seoClusters } from "@/lib/seo-graph";

export const metadata: Metadata = {
  title: site.name,
  description: seoDescription(site.description),
  alternates: { canonical: "/", languages: { "zh-CN": "/", "en-US": "/en" } },
  openGraph: {
    title: site.name,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
  },
};

const trustItems = ["面向搜索", "人工审核", "工具优先", "不夸大收入"];

const searchEntrances = [
  ["提示词模板", "客服、销售、HR、营销、财务和软件开发场景。", "/prompts"],
  ["高频问题入口", "Codex、部署、Agent、RAG、报错和提示词搜索问题。", "/q"],
  ["AI 部署教程", "网页部署、大模型部署、Agent、API 和 RAG。", "/deployments"],
  ["办公自动化", "PPT 策划、表格整理、简历、文案和资料处理。", "/office-ai"],
  ["实用工具", "报价、Proposal、报错解释、成本估算和 SEO 刷新。", "/tools"],
];

const usSearchProblems = [
  {
    title: "Vercel env variable missing",
    description: "Fix missing production variables, preview settings, and deployment environment drift.",
    href: "/q/vercel/env-variable-missing-fix",
  },
  {
    title: "GitHub Actions build failed",
    description: "Read workflow logs, isolate the failing step, and decide whether code or permissions are the issue.",
    href: "/q/github/github-actions-build-log-debug",
  },
  {
    title: "Claude API rate limit reached",
    description: "Plan retries, queues, fallback models, and safe logging before promising production stability.",
    href: "/q/ai-tools/claude-api-rate-limit-debug-guide",
  },
  {
    title: "RAG retrieval returns no context",
    description: "Check source data, chunking, embeddings, retrieval filters, and answer grounding.",
    href: "/q/ai-tools/rag-retrieval-no-context-debug-guide",
  },
  {
    title: "AI agent production deployment checklist",
    description: "Review tool permissions, memory, logs, costs, human approval, monitoring, and rollback.",
    href: "/q/vercel/agent-production-deployment-checklist",
  },
  {
    title: "Agent tool permission safety",
    description: "Design allowlists, parameter validation, sandbox execution, audit logs, and approval gates.",
    href: "/q/ai-tools/agent-tool-permission-safety-guide",
  },
];

const toolCards = [
  {
    title: "Upwork Proposal 生成器",
    description: "生成谨慎可修改的英文投标草稿，自动提示风险和客户问题。",
    href: "/tools/proposal-generator",
  },
  {
    title: "Codex 报错解释器",
    description: "把常见 npm、Git、Vercel、TypeScript 报错翻译成新手步骤。",
    href: "/tools/error-explainer",
  },
  {
    title: "项目报价助手",
    description: "按工时、难度、加急、沟通和平台抽成估算报价范围。",
    href: "/tools/pricing-calculator",
  },
];

const newbieSteps = ["配置 AI 开发工具", "找小项目", "判断项目是否能做", "生成 Proposal", "用 AI 辅助交付", "积累评价和案例"];

export default function Home() {
  const allPosts = getAllPosts(false);
  const posts = allPosts.slice(0, 12);
  const featuredTools = tools.slice(0, 8);
  const featuredTemplates = templates.slice(0, 5);
  const priorityQuestions = getHighPotentialQuestionPosts(18);
  const networkStats = [
    { label: "公开教程文章", value: allPosts.length, href: "/blog" },
    { label: "问题入口页面", value: allPosts.length, href: "/q" },
    { label: "主题中心", value: seoClusters.length, href: "/q" },
    { label: "工具与模板入口", value: tools.length + templates.length, href: "/tools" },
  ];

  return (
    <main className="w-full max-w-full overflow-hidden">
      <section className="w-full max-w-full border-b bg-gradient-to-b from-sky-50 via-white to-white">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-20">
          <div className="min-w-0 max-w-full">
            <h1 className="break-words text-4xl font-bold tracking-tight text-ink md:text-6xl">AI 工具指南</h1>
            <p className="mt-5 max-w-3xl break-words text-xl leading-8 text-gray-800 [overflow-wrap:anywhere]">
              面向搜索与真实问题的 AI 工具教程库，覆盖办公自动化、提示词、网页部署、大模型部署、Agent 和 RAG 记忆。
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
            <p className="text-sm font-medium text-brand">US search entry points</p>
            <h2 className="mt-1 text-2xl font-bold text-ink">High-intent AI troubleshooting topics</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              These English problem pages target concrete searches around Vercel, GitHub Actions, Claude API,
              RAG retrieval, agent deployment, and tool permissions. They route readers into deeper guides and
              topic clusters instead of stopping at a generic article list.
            </p>
          </div>
          <Link href="/en" className="text-sm font-medium text-brand">Open English entry</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {usSearchProblems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50 hover:shadow-md">
              <h3 className="break-words text-base font-semibold leading-6 text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">SEO 内容网络状态</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
              站点不是只靠首页几篇文章，而是由教程文章、问题入口、主题中心和工具页面一起给搜索引擎提供抓取路径。
            </p>
          </div>
          <Link href="/blog" className="text-sm font-medium text-brand">查看 500 篇教程</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {networkStats.map((item) => (
            <Link key={item.label} href={item.href} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50 hover:shadow-md">
              <p className="text-sm font-medium text-gray-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-ink">{item.value}</p>
            </Link>
          ))}
        </div>
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
          {getSeoClusters().map((cluster) => (
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
              优先展示 Agent、RAG、提示词、Codex 和部署相关问题页。这些页面负责承接搜索流量，再导向深度教程。
            </p>
          </div>
          <Link href="/deployments" className="text-sm font-medium text-brand">进入部署教程</Link>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {priorityQuestions.map((post) => (
            <Link key={post.slug} href={getQuestionPath(post)} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand/50 hover:shadow-md">
              <h3 className="break-words text-base font-semibold leading-6 text-ink">{getQuestionName(post)}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">先用工具解决具体问题</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">工具先解决“能不能投、怎么报价、报错怎么查”这三个最常见问题，再决定要不要继续接触客户。</p>
          </div>
          <Link href="/tools" className="text-sm font-medium text-brand">查看全部工具</Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {toolCards.map((tool) => (
            <Card key={tool.href} title={tool.title} description={tool.description} href={tool.href} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-ink">新手路线</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {newbieSteps.map((step, index) => (
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

import Link from "next/link";
import type { Metadata } from "next";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Card } from "@/components/Card";
import { ServiceCTA } from "@/components/ServiceCTA";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/data/site";
import { templates } from "@/data/templates";
import { tools } from "@/data/tools";

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

export default function Home() {
  const posts = getAllPosts(false).slice(0, 6);
  const featuredTools = tools.slice(0, 8);
  const featuredTemplates = templates.slice(0, 5);

  return (
    <main>
      <section className="bg-gradient-to-b from-blue-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">AI 接单实验室</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-700">
            用 Codex、Claude Code 和 ChatGPT，从第一个小单开始建立自由职业收入。
          </p>
          <p className="mt-3 max-w-3xl text-gray-600">
            专为不会编程的新手准备，拆解工具配置、Upwork 投标、项目报价、报错解决和交付流程。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-md bg-brand px-5 py-3 text-white" href="/tools/proposal-generator">免费生成 Proposal</Link>
            <Link className="rounded-md border px-5 py-3" href="/tools/error-explainer">解释报错</Link>
            <Link className="rounded-md border px-5 py-3" href="/templates">下载模板包</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-10 md:grid-cols-4">
        {["不承诺暴富", "不鼓励自动刷单", "不做搬运洗稿", "只做真实交付"].map((item) => (
          <div key={item} className="rounded-lg border bg-white p-4 text-center font-medium shadow-sm">{item}</div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold">先用工具解决具体问题</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card title="Upwork Proposal 生成器" description="生成谨慎可修改的英文投标草稿，自动提示风险和客户问题。" href="/tools/proposal-generator" />
          <Card title="Codex 报错解释器" description="把常见 npm、Git、Vercel、TypeScript 报错翻译成新手步骤。" href="/tools/error-explainer" />
          <Card title="项目报价助手" description="按工时、难度、加急、沟通和平台抽成估算报价范围。" href="/tools/pricing-calculator" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold">新手路线</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["配置 AI 开发工具", "找小项目", "判断项目是否能做", "生成 Proposal", "用 AI 辅助交付", "积累评价和案例"].map((step, index) => (
            <div key={step} className="rounded-lg border bg-white p-5 shadow-sm">
              <p className="text-sm text-brand">Step {index + 1}</p>
              <h3 className="mt-2 font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold">最新文章</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.slug} title={post.title} description={post.description} href={`/blog/${post.slug}`} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">推荐工具</h2>
          <Link href="/tools" className="text-sm text-brand">查看全部</Link>
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
          <h2 className="text-2xl font-bold">模板下载</h2>
          <Link href="/templates" className="text-sm text-brand">查看全部</Link>
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

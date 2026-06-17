import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCTA } from "@/components/ToolCTA";
import { getAllPosts, slugify } from "@/lib/blog";
import { getClusterPath, getHighAuthorityPosts, getQuestionPath, seoClusters } from "@/lib/seo-graph";

export const metadata = {
  title: "新手教程",
  description: "AI 工具、部署、提示词、办公自动化、Codex、报价、收款和项目交付教程。这里只展示已经人工审核发布的文章。",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts(false);
  const priorityQuestions = Array.from(
    new Map(
      seoClusters
        .flatMap((cluster) => getHighAuthorityPosts(cluster.slug, 3))
        .map((post) => [post.slug, post]),
    ).values(),
  ).slice(0, 12);
  const categories = Array.from(
    posts.reduce((map, post) => {
      map.set(post.category, (map.get(post.category) || 0) + 1);
      return map;
    }, new Map<string, number>()),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">内容库</p>
        <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">新手教程</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          这里只展示已经人工审核发布的文章。内容重点是 AI 工具配置、办公自动化、部署、提示词、项目判断、报价、收款和交付风险，不承诺收入结果，也不鼓励平台违规。
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href="/tools/proposal-generator">
            生成 Proposal 草稿
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools/pricing-calculator">
            计算报价范围
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/templates">
            下载模板包
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">按主题中心阅读</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              主题中心负责串联问题页和深度文章。先选主题，再进入具体问题，比直接翻 500 篇文章更快。
            </p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {seoClusters.map((cluster) => (
            <Link
              key={cluster.slug}
              href={getClusterPath(cluster.slug)}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50 hover:shadow-md"
            >
              <p className="text-sm font-medium text-brand">Topic Cluster</p>
              <h3 className="mt-2 text-lg font-semibold text-ink">{cluster.shortTitle}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{cluster.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">先看高频问题</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              这些问题页用于承接搜索意图，再链接到对应深度教程，适合从具体问题开始阅读。
            </p>
          </div>
          <Link href="/deployments" className="text-sm font-medium text-brand">进入部署教程</Link>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {priorityQuestions.map((post) => (
            <Link
              key={post.slug}
              href={getQuestionPath(post)}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand/50 hover:shadow-md"
            >
              <h3 className="break-words text-base font-semibold leading-6 text-ink">{post.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">按分类阅读</h2>
            <p className="mt-2 text-sm text-gray-600">先从你当前遇到的问题开始，不需要一次读完全部内容。</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map(([category, count]) => (
            <Link
              key={category}
              href={`/category/${slugify(category)}`}
              className="shrink-0 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-brand/50"
            >
              {category} <span className="text-gray-400">{count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">最新发布</h2>
            <p className="mt-2 text-sm text-gray-600">每篇文章都默认强调人工审核、真实能力和平台规则。</p>
          </div>
          <p className="text-sm text-gray-500">共 {posts.length} 篇公开文章</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <ToolCTA title="读完教程后可以直接用工具练习" />
      </div>
    </main>
  );
}

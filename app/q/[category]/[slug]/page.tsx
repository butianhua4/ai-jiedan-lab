import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getBlogPath, getClusterForPost, getClusterPath, getPublishedSeoPosts, getQuestionPath, getRelatedQuestions } from "@/lib/seo-graph";

export function generateStaticParams() {
  return getPublishedSeoPosts().map((post) => ({
    category: getClusterForPost(post).slug,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const post = findQuestionPost(category, slug);
  if (!post) return {};

  const title = `${post.title}: 快速解决方案`;
  const description = `围绕“${post.title}”整理快速解决方案、详细步骤、风险提示和深度文章入口。`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}${getQuestionPath(post)}` },
    openGraph: {
      title,
      description,
      url: `${site.url}${getQuestionPath(post)}`,
      type: "article",
    },
    robots: { index: true, follow: true },
  };
}

export default async function QuestionPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = findQuestionPost(category, slug);
  if (!post) notFound();

  const cluster = getClusterForPost(post);
  const relatedQuestions = getRelatedQuestions(post, 8);
  const code = extractFirstCodeFence(post.content);
  const steps = extractSteps(post.content);

  return (
    <main className="mx-auto w-full max-w-5xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Link className="font-medium text-brand" href={getClusterPath(cluster.slug)}>
            {cluster.shortTitle}
          </Link>
          <span>/</span>
          <Link className="font-medium text-brand" href={getBlogPath(post)}>
            深度文章
          </Link>
        </div>
        <h1 className="mt-4 break-words text-3xl font-bold leading-tight text-ink md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-gray-700">{post.description}</p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-ink">问题是什么</h2>
            <p className="mt-3 leading-8 text-gray-700">{post.description}</p>
          </section>

          <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <h2 className="text-xl font-semibold text-ink">快速解决方案</h2>
            <p className="mt-3 leading-8 text-gray-700">
              先确认这是 {cluster.shortTitle} 主题下的 {post.contentType} 问题，再按深度文章逐项检查环境、输入、权限和交付边界。需要完整背景时，继续阅读对应深度文章。
            </p>
            <Link className="mt-4 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white" href={getBlogPath(post)}>
              阅读深度文章
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">详细步骤</h2>
            <ol className="mt-4 space-y-3">
              {steps.map((step) => (
                <li className="rounded-md border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700" key={step}>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">命令 / 代码</h2>
            {code ? (
              <pre className="mt-4 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-slate-100">
                <code>{code}</code>
              </pre>
            ) : (
              <p className="mt-3 rounded-md border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700">原始文章没有提供可复制的命令块，因此这里不编造命令；请按深度文章里的检查步骤执行。</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">风险提示</h2>
            <p className="mt-3 leading-8 text-gray-700">
              这个问题需要人工确认真实项目环境、账号权限、平台规则和输出结果。不要把 AI 生成内容直接交付给客户，也不要承诺未经验证的收入或部署结果。
            </p>
          </section>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">相关问题</h2>
            <div className="mt-3 space-y-3">
              {relatedQuestions.slice(0, 8).map((question) => (
                <Link className="block text-sm leading-6 text-brand hover:underline" href={question.path} key={question.path}>
                  {question.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">权重回流</h2>
            <div className="mt-3 space-y-3 text-sm">
              <Link className="block text-brand hover:underline" href={getBlogPath(post)}>
                Blog 深度内容
              </Link>
              <Link className="block text-brand hover:underline" href={getClusterPath(cluster.slug)}>
                Cluster 主题中心
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function findQuestionPost(category: string, slug: string) {
  return getPublishedSeoPosts().find((post) => post.slug === slug && getClusterForPost(post).slug === category);
}

function extractFirstCodeFence(content: string) {
  const match = content.match(/```(?:\w+)?\r?\n([\s\S]*?)```/);
  return match?.[1]?.trim() || "";
}

function extractSteps(content: string) {
  const listItems = Array.from(content.matchAll(/^(?:\d+\.\s+|[-*]\s+)(.+)$/gm))
    .map((match) => match[1].trim())
    .filter(Boolean)
    .slice(0, 6);

  if (listItems.length >= 3) return listItems;

  return [
    "先确认问题所属场景、工具版本、账号权限和输入材料是否完整。",
    "再根据深度文章逐项检查配置、日志、命令输出和人工审核边界。",
    "最后记录修改前后的结果，确认没有引入新的平台违规、隐私或交付风险。",
  ];
}

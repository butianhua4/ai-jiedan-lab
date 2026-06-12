import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCTA } from "@/components/ServiceCTA";
import { TagBadge } from "@/components/Badges";
import { ToolCTA } from "@/components/ToolCTA";
import { ArticleToolLinks } from "@/components/ArticleToolLinks";
import { getAllPosts, getPostBySlug, renderMarkdown, slugify } from "@/lib/blog";
import { site } from "@/data/site";

export function generateStaticParams() {
  return getAllPosts(false).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    robots: { index: !post.noindex },
    alternates: { canonical: post.canonical },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  if (process.env.NODE_ENV === "production" && post.status !== "published") notFound();

  const headings = extractHeadings(post.content);
  const related = getAllPosts(false)
    .filter((item) => item.slug !== post.slug && (item.category === post.category || item.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updatedAt,
          author: { "@type": "Organization", name: post.author },
        }}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0">
          <div className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <Link className="font-medium text-brand" href="/blog">
                新手教程
              </Link>
              <span>/</span>
              <Link className="font-medium text-brand" href={`/category/${slugify(post.category)}`}>
                {post.category}
              </Link>
              <span>/</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-4 break-words text-3xl font-bold leading-tight text-ink md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-8 text-gray-700">{post.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <TagBadge key={tag} label={tag} />
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500">
              发布：{post.date} · 更新：{post.updatedAt}
            </p>
          </div>

          <div
            className="prose prose-lg mt-8 max-w-none prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-pre:rounded-lg prose-pre:bg-slate-950 prose-pre:text-slate-100"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(stripTopHeading(post.content)) }}
          />

          <ArticleToolLinks post={post} />

          <div className="mt-10">
            <ToolCTA title="读完这篇后可以直接使用工具" />
          </div>

          {related.length ? (
            <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">相关文章</h2>
              <div className="mt-4 space-y-3">
                {related.map((item) => (
                  <Link key={item.slug} className="block rounded-md border border-gray-200 p-3 text-sm transition hover:border-brand/50" href={`/blog/${item.slug}`}>
                    {item.title}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-10">
            <ServiceCTA />
          </div>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-base font-semibold text-ink">文章目录</h2>
            <div className="mt-3 space-y-2 text-sm">
              {headings.slice(0, 10).map((heading) => (
                <a key={heading} className="block leading-6 text-gray-600 hover:text-brand" href={`#${slugify(heading)}`}>
                  {heading}
                </a>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <h2 className="text-base font-semibold text-ink">先用工具练一下</h2>
            <div className="mt-3 grid gap-2 text-sm">
              <Link className="rounded-md bg-brand px-3 py-2 text-center font-medium text-white" href="/tools/proposal-generator">
                Proposal 生成器
              </Link>
              <Link className="rounded-md border border-gray-200 bg-white px-3 py-2 text-center font-medium text-ink" href="/tools/pricing-calculator">
                报价助手
              </Link>
              <Link className="rounded-md border border-gray-200 bg-white px-3 py-2 text-center font-medium text-ink" href="/templates">
                模板下载
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

function extractHeadings(content: string) {
  return Array.from(content.matchAll(/^##\s+(.+)$/gm)).map((match) => match[1].trim());
}

function stripTopHeading(content: string) {
  return content.replace(/^#\s+.+\r?\n+/, "");
}

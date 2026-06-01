import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ServiceCTA } from "@/components/ServiceCTA";
import { ToolCTA } from "@/components/ToolCTA";
import { getAllPosts, getPostBySlug, renderMarkdown } from "@/lib/blog";
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

  const related = getAllPosts(false)
    .filter((item) => item.slug !== post.slug && (item.category === post.category || item.tags.some((tag) => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.updatedAt, author: { "@type": "Organization", name: post.author } }} />
      <p className="text-sm text-brand">{post.category} · {post.readingTime}</p>
      <h1 className="mt-3 text-4xl font-bold">{post.title}</h1>
      <p className="mt-4 text-lg leading-8 text-gray-700">{post.description}</p>
      <article className="prose prose-lg mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

      <div className="mt-10">
        <ToolCTA title="读完这篇后可以直接使用工具" />
      </div>

      {related.length ? (
        <section className="mt-10 rounded-lg border bg-white p-5">
          <h2 className="text-xl font-semibold">相关文章</h2>
          <div className="mt-4 space-y-3">
            {related.map((item) => (
              <a key={item.slug} className="block rounded-md border p-3 text-sm hover:border-brand" href={`/blog/${item.slug}`}>
                {item.title}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-10"><ServiceCTA /></div>
    </main>
  );
}

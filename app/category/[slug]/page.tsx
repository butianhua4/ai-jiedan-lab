import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/Card";
import { getCategorySlugs, getPostsByCategory } from "@/lib/blog";

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `分类：${slug}`,
    description: `AI 接单实验室 ${slug} 分类下的已发布文章。`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  if (!posts.length) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">分类：{posts[0].category}</h1>
      <p className="mt-3 text-gray-600">这里只展示已发布且允许收录的文章。</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.slug} title={post.title} description={post.description} href={`/blog/${post.slug}`} />
        ))}
      </div>
    </main>
  );
}

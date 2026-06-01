import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCTA } from "@/components/ToolCTA";
import { getCategorySlugs, getPostsByCategory } from "@/lib/blog";

export function generateStaticParams() {
  return getCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  const category = posts[0]?.category || slug;
  return {
    title: `分类：${category}`,
    description: `AI 接单实验室 ${category} 分类下的已发布文章，包含新手步骤、风险提醒和工具入口。`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPostsByCategory(slug);
  if (!posts.length) notFound();
  const category = posts[0].category;

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <Link className="text-sm font-medium text-brand" href="/blog">
          返回新手教程
        </Link>
        <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">分类：{category}</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          这里仅展示已发布且允许收录的文章。阅读时建议先判断自己的真实能力和项目风险，再使用工具生成草稿或报价参考。
        </p>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">相关文章</h2>
            <p className="mt-2 text-sm text-gray-600">共 {posts.length} 篇，按发布时间排序。</p>
          </div>
          <Link href="/tools" className="text-sm font-medium text-brand">
            查看工具导航
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <ToolCTA title="继续用工具做下一步判断" />
      </div>
    </main>
  );
}

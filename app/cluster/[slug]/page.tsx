import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { getBlogPath, getClusterBySlug, getClusterPath, getHighAuthorityPosts, getPostsForCluster, getQuestionPath, seoClusters } from "@/lib/seo-graph";

export function generateStaticParams() {
  return seoClusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) return {};

  return {
    title: cluster.title,
    description: cluster.description,
    alternates: { canonical: `${site.url}${getClusterPath(cluster.slug)}` },
    openGraph: {
      title: cluster.title,
      description: cluster.description,
      url: `${site.url}${getClusterPath(cluster.slug)}`,
      type: "website",
    },
  };
}

export default async function ClusterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) notFound();

  const posts = getPostsForCluster(cluster.slug);
  const highAuthorityPosts = getHighAuthorityPosts(cluster.slug, 12);
  const questions = posts.slice(0, 120);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Topic Cluster</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink md:text-4xl">{cluster.title}</h1>
        <p className="mt-3 max-w-3xl text-gray-700">{cluster.description}</p>
        <p className="mt-4 text-sm text-gray-500">该主题已连接 {posts.length} 篇公开文章和 {posts.length} 个问题入口。</p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-ink">子问题列表</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {questions.map((post) => (
              <Link className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand/50" href={getQuestionPath(post)} key={post.slug}>
                <h3 className="break-words text-base font-semibold leading-6 text-ink">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-500">进入问题页，再跳转到深度文章。</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">高权重文章</h2>
            <div className="mt-3 space-y-3">
              {highAuthorityPosts.map((post) => (
                <Link className="block text-sm leading-6 text-brand hover:underline" href={getBlogPath(post)} key={post.slug}>
                  {post.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">内链结构图</h2>
            <pre className="mt-3 overflow-auto rounded-md bg-slate-950 p-4 text-xs leading-6 text-slate-100">
{`${getClusterPath(cluster.slug)}
  -> /q/${cluster.slug}/[question]
  -> /blog/[slug]
  -> ${getClusterPath(cluster.slug)}
  -> related /q/${cluster.slug}/[...]`}
            </pre>
          </section>
        </aside>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import {
  getBlogPath,
  getClusterBySlug,
  getClusterPath,
  getHighPotentialQuestionPosts,
  getPostsForCluster,
  getQuestionName,
  getQuestionPath,
  type SeoClusterSlug,
  seoClusters,
} from "@/lib/seo-graph";

export function generateStaticParams() {
  return seoClusters.map((cluster) => ({ category: cluster.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cluster = getClusterBySlug(category);
  if (!cluster) return {};

  const title = `${cluster.shortTitle} troubleshooting questions`;
  const description = `Browse high-intent ${cluster.shortTitle} questions with q pages, cluster hubs, and deep tutorials for practical SEO entry traffic.`;

  return {
    title,
    description,
    alternates: { canonical: `${site.url}/q/${cluster.slug}` },
    openGraph: {
      title,
      description,
      url: `${site.url}/q/${cluster.slug}`,
      type: "website",
    },
  };
}

export default async function QuestionCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cluster = getClusterBySlug(category);
  if (!cluster) notFound();

  const allPosts = getPostsForCluster(cluster.slug as SeoClusterSlug);
  const priorityPosts = getHighPotentialQuestionPosts(160).filter((post) => getQuestionPath(post).startsWith(`/q/${cluster.slug}/`));
  const remainingPosts = allPosts.filter((post) => !priorityPosts.some((item) => item.slug === post.slug)).sort((a, b) => a.slug.localeCompare(b.slug));
  const posts = [...priorityPosts, ...remainingPosts];
  const pageUrl = `${site.url}/q/${cluster.slug}`;

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${pageUrl}#page`,
              url: pageUrl,
              name: `${cluster.shortTitle} troubleshooting questions`,
              description: cluster.description,
              isPartOf: { "@type": "WebSite", name: site.englishName, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Questions", item: `${site.url}/q` },
                { "@type": "ListItem", position: 3, name: `${cluster.shortTitle} questions`, item: pageUrl },
              ],
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#questions`,
              itemListElement: posts.slice(0, 120).map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: getQuestionName(post),
                url: `${site.url}${getQuestionPath(post)}`,
              })),
            },
          ],
        }}
      />
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Link className="font-medium text-brand" href="/q">
            AI problem entrances
          </Link>
          <span>/</span>
          <Link className="font-medium text-brand" href={getClusterPath(cluster.slug)}>
            {cluster.shortTitle} cluster hub
          </Link>
        </div>
        <h1 className="mt-4 break-words text-3xl font-bold leading-tight text-ink md:text-5xl">{cluster.shortTitle} troubleshooting questions</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-gray-700">{cluster.description}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href={getClusterPath(cluster.slug)}>
            View cluster hub
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/blog">
            View deep guides
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools">
            View tools
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">All questions in this topic</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              High-potential questions are shown first. Every q page links back to a deep article and this cluster
              hub, so crawlers and readers can move through the full topic network.
            </p>
          </div>
          <p className="text-sm text-gray-500">{posts.length} questions</p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand/50 hover:shadow-md"
              href={getQuestionPath(post)}
              key={post.slug}
            >
              <h3 className="break-words text-base font-semibold leading-6 text-ink">{getQuestionName(post)}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-ink">Deep guide entry points</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Use the q page for the fast answer, then continue to the matching blog article for the full checklist.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {posts.slice(0, 12).map((post) => (
            <Link className="rounded-md border border-gray-100 bg-gray-50 p-3 transition hover:border-brand/50 hover:bg-white" href={getBlogPath(post)} key={post.slug}>
              <span className="block text-sm font-semibold leading-6 text-ink">{getQuestionName(post)}</span>
              <span className="mt-1 block text-xs leading-5 text-gray-500">{post.category}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

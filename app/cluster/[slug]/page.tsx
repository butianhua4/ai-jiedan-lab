import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { getBlogPath, getClusterBySlug, getClusterPath, getHighAuthorityPosts, getPostsForCluster, getQuestionName, getQuestionPath, seoClusters } from "@/lib/seo-graph";
import { defaultOgImages, seoDescription } from "@/lib/seo-metadata";

export function generateStaticParams() {
  return seoClusters.map((cluster) => ({ slug: cluster.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getClusterBySlug(slug);
  if (!cluster) return {};
  const description = seoDescription(
    cluster.description,
    "This topic hub links high-potential q pages, high-authority blog tutorials, and related AI troubleshooting paths for search engines and readers.",
  );

  return {
    title: cluster.title,
    description,
    alternates: { canonical: `${site.url}${getClusterPath(cluster.slug)}` },
    openGraph: {
      title: cluster.title,
      description,
      url: `${site.url}${getClusterPath(cluster.slug)}`,
      type: "website",
      siteName: site.englishName,
      images: defaultOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: cluster.title,
      description,
      images: [site.ogImage],
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
  const pageUrl = `${site.url}${getClusterPath(cluster.slug)}`;

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
              name: cluster.title,
              description: cluster.description,
              isPartOf: { "@type": "WebSite", name: site.englishName, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Topic clusters", item: `${site.url}/cluster/${cluster.slug}` },
                { "@type": "ListItem", position: 3, name: cluster.shortTitle, item: pageUrl },
              ],
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#questions`,
              itemListElement: questions.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: getQuestionName(post),
                url: `${site.url}${getQuestionPath(post)}`,
              })),
            },
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#high-authority-articles`,
              name: "High-authority articles",
              itemListElement: highAuthorityPosts.map((post, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: post.title,
                url: `${site.url}${getBlogPath(post)}`,
              })),
            },
          ],
        }}
      />
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Topic Cluster</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink md:text-4xl">{cluster.title}</h1>
        <p className="mt-3 max-w-3xl text-gray-700">{cluster.description}</p>
        <p className="mt-4 text-sm text-gray-500">
          This hub connects {posts.length} public articles and {posts.length} question entrances for this topic.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-ink">Question list</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {questions.map((post) => (
              <Link className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:border-brand/50" href={getQuestionPath(post)} key={post.slug}>
                <h3 className="break-words text-base font-semibold leading-6 text-ink">{getQuestionName(post)}</h3>
                <p className="mt-2 text-sm text-gray-500">Open the q page first, then continue to the deep article.</p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">High-authority articles</h2>
            <div className="mt-3 space-y-3">
              {highAuthorityPosts.map((post) => (
                <Link className="block text-sm leading-6 text-brand hover:underline" href={getBlogPath(post)} key={post.slug}>
                  {post.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Internal link map</h2>
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

import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import {
  getBlogPath,
  getClusterPath,
  getHighPotentialQuestionPosts,
  getPostsForCluster,
  getQuestionPath,
  seoClusters,
} from "@/lib/seo-graph";

const pageTitle = "AI problem entry pages: Codex, deployment, Agent, RAG, prompts, and automation";
const pageDescription =
  "Browse high-intent AI troubleshooting questions covering Codex, Upwork, Vercel, GitHub, Node.js errors, AI tools, Agent, RAG, prompts, and office automation.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/q" },
  openGraph: {
    title: "AI problem entry pages",
    description: "Start from a concrete AI problem, then move into the matching tutorial, cluster hub, and tool.",
    url: "/q",
  },
};

export default function QuestionsIndexPage() {
  const priorityQuestions = getHighPotentialQuestionPosts(36);
  const highPotentialQuestions = getHighPotentialQuestionPosts(80);
  const clusterCards = seoClusters.map((cluster) => ({
    cluster,
    count: getPostsForCluster(cluster.slug).length,
    topQuestions: highPotentialQuestions.filter((post) => getQuestionPath(post).startsWith(`/q/${cluster.slug}/`)).slice(0, 4),
  }));

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${site.url}/q#page`,
              url: `${site.url}/q`,
              name: "AI problem entry pages",
              description: pageDescription,
              isPartOf: { "@type": "WebSite", name: site.englishName, url: site.url },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${site.url}/q#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Questions", item: `${site.url}/q` },
              ],
            },
            {
              "@type": "ItemList",
              "@id": `${site.url}/q#clusters`,
              itemListElement: clusterCards.map(({ cluster }, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${cluster.shortTitle} questions`,
                url: `${site.url}/q/${cluster.slug}`,
              })),
            },
          ],
        }}
      />

      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Question Layer / SEO entry layer</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink md:text-5xl">AI problem entry pages for real troubleshooting searches</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-gray-700">
          This layer groups high-intent AI questions by topic so readers and search engines can start from concrete
          tasks like fixing an error, deploying an agent, configuring RAG memory, or choosing the right automation tool.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href="/tools">
            View tools
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/blog">
            View tutorials
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/templates">
            Download templates
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">Browse questions by topic</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              Each topic connects q pages, cluster hubs, and deep tutorials into a crawlable internal link loop.
            </p>
          </div>
          <Link className="text-sm font-medium text-brand hover:underline" href="/sitemap-q.xml">
            View q sitemap
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clusterCards.map(({ cluster, count, topQuestions }) => (
            <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={cluster.slug}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{cluster.shortTitle}</h3>
                  <p className="mt-1 text-sm text-gray-500">{count} question entrances</p>
                </div>
                <Link className="shrink-0 text-sm font-medium text-brand hover:underline" href={`/q/${cluster.slug}`}>
                  Open
                </Link>
              </div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{cluster.description}</p>
              <div className="mt-4 grid gap-2">
                {topQuestions.map((post) => (
                  <Link className="rounded-md bg-gray-50 px-3 py-2 text-sm leading-6 text-ink hover:text-brand" href={getQuestionPath(post)} key={post.slug}>
                    {post.title}
                  </Link>
                ))}
              </div>
              <Link className="mt-4 inline-flex text-sm font-medium text-brand hover:underline" href={getClusterPath(cluster.slug)}>
                View cluster hub
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">Priority crawl questions</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            These questions are ranked from real published articles and prioritize errors, deployment, agents,
            prompts, office automation, and delivery workflows.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {priorityQuestions.map((post) => (
              <Link className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium leading-6 text-ink transition hover:border-brand/50 hover:bg-white" href={getQuestionPath(post)} key={post.slug}>
                {post.title}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-ink">Deep tutorial loop</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Q pages capture the search intent. Deep tutorials carry the full explanation, checklist, and risk
            boundaries.
          </p>
          <div className="mt-4 grid gap-3">
            {priorityQuestions.slice(0, 10).map((post) => (
              <Link className="rounded-md border border-gray-100 p-3 transition hover:border-brand/50" href={getBlogPath(post)} key={post.slug}>
                <span className="block text-sm font-semibold leading-6 text-ink">{post.title}</span>
                <span className="mt-1 block text-xs leading-5 text-gray-500">{post.category}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

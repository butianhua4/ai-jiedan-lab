import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/data/site";
import { getBlogPath, getClusterForPost, getClusterPath, getPublishedSeoPosts, getQuestionName, getQuestionPath, getRelatedQuestions } from "@/lib/seo-graph";

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

  const questionName = getQuestionName(post);
  const title = `${questionName}: quick fix, steps, and deep guide`;
  const description = `Troubleshoot ${questionName.toLowerCase()} with a short answer, practical steps, commands when available, risk notes, and a deeper guide.`;

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
  const questionName = getQuestionName(post);
  const relatedQuestions = getRelatedQuestions(post, 8);
  const code = extractFirstCodeFence(post.content);
  const steps = extractSteps(post.content);
  const pageUrl = `${site.url}${getQuestionPath(post)}`;
  const clusterUrl = `${site.url}${getClusterPath(cluster.slug)}`;
  const blogUrl = `${site.url}${getBlogPath(post)}`;

  return (
    <main className="mx-auto w-full max-w-5xl overflow-hidden px-4 py-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              url: pageUrl,
              name: questionName,
              description: `Troubleshoot ${questionName.toLowerCase()} with a short answer, practical steps, commands when available, risk notes, and a deeper guide.`,
              mainEntity: [
                {
                  "@type": "Question",
                  name: questionName,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Treat this as a ${cluster.shortTitle} ${post.contentType} issue. Confirm the environment, inputs, permissions, logs, and delivery boundary, then use the linked deep guide for the full checklist.`,
                    url: blogUrl,
                  },
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${pageUrl}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Questions", item: `${site.url}/q` },
                { "@type": "ListItem", position: 3, name: `${cluster.shortTitle} questions`, item: `${site.url}/q/${cluster.slug}` },
                { "@type": "ListItem", position: 4, name: questionName, item: pageUrl },
              ],
            },
            {
              "@type": "WebPage",
              "@id": `${pageUrl}#webpage`,
              url: pageUrl,
              name: questionName,
              description: `Troubleshoot ${questionName.toLowerCase()} with a short answer, practical steps, commands when available, risk notes, and a deeper guide.`,
              isPartOf: { "@type": "WebSite", name: site.englishName, url: site.url },
              about: { "@type": "Thing", name: cluster.shortTitle, url: clusterUrl },
              primaryImageOfPage: undefined,
              relatedLink: [blogUrl, clusterUrl, ...relatedQuestions.slice(0, 5).map((question) => `${site.url}${question.path}`)],
            },
          ],
        }}
      />
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Link className="font-medium text-brand" href={getClusterPath(cluster.slug)}>
            {cluster.shortTitle}
          </Link>
          <span>/</span>
          <Link className="font-medium text-brand" href={getBlogPath(post)}>
            Deep guide
          </Link>
        </div>
        <h1 className="mt-4 break-words text-3xl font-bold leading-tight text-ink md:text-4xl">{questionName}</h1>
        <p className="mt-4 text-lg leading-8 text-gray-700">{post.description}</p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-ink">What is the problem?</h2>
            <p className="mt-3 leading-8 text-gray-700">{post.description}</p>
          </section>

          <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
            <h2 className="text-xl font-semibold text-ink">Quick solution</h2>
            <p className="mt-3 leading-8 text-gray-700">
              Treat this as a {cluster.shortTitle} {post.contentType} issue. First confirm the environment,
              inputs, permissions, logs, and delivery boundary. Then use the linked deep guide for the full
              checklist before changing production code or promising a result.
            </p>
            <Link className="mt-4 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white" href={getBlogPath(post)}>
              Read the deep guide
            </Link>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">Detailed steps</h2>
            <ol className="mt-4 space-y-3">
              {steps.map((step) => (
                <li className="rounded-md border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700" key={step}>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">Commands or code</h2>
            {code ? (
              <pre className="mt-4 overflow-auto rounded-lg bg-slate-950 p-4 text-sm leading-7 text-slate-100">
                <code>{code}</code>
              </pre>
            ) : (
              <p className="mt-3 rounded-md border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700">
                The source article does not include a copyable command block. Do not invent commands here; follow
                the diagnostic steps in the deep guide and validate changes in the real project environment.
              </p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-ink">Risk notes</h2>
            <p className="mt-3 leading-8 text-gray-700">
              Confirm the real project environment, account permissions, platform rules, and output quality before
              delivery. Do not ship AI-generated changes without human review, and do not claim indexing, income,
              deployment success, or ranking improvements without measured evidence.
            </p>
          </section>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Related questions</h2>
            <div className="mt-3 space-y-3">
              {relatedQuestions.slice(0, 8).map((question) => (
                <Link className="block text-sm leading-6 text-brand hover:underline" href={question.path} key={question.path}>
                  {question.title}
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-ink">Link flow</h2>
            <div className="mt-3 space-y-3 text-sm">
              <Link className="block text-brand hover:underline" href={getBlogPath(post)}>
                Blog deep content
              </Link>
              <Link className="block text-brand hover:underline" href={getClusterPath(cluster.slug)}>
                Cluster hub
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
    "Confirm the scenario, tool version, account permissions, inputs, and expected output before changing anything.",
    "Check configuration, logs, command output, and human review boundaries against the linked deep guide.",
    "Record the before and after result, then verify that the fix did not introduce platform, privacy, or delivery risk.",
  ];
}

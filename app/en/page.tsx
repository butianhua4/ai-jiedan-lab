import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "AI Tools Guide for Deployment, Agents, RAG, and Automation",
  description: site.englishDescription,
  alternates: {
    canonical: "/en",
    languages: {
      "en-US": "/en",
      "zh-CN": "/",
    },
  },
  openGraph: {
    title: "AI Tools Guide for Deployment, Agents, RAG, and Automation",
    description: site.englishDescription,
    url: "/en",
    siteName: site.englishName,
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    type: "website",
  },
};

const problemEntrances = [
  {
    title: "Codex and AI coding errors",
    description: "Debug install failures, project setup issues, build errors, and delivery checklists.",
    href: "/q/codex",
  },
  {
    title: "Vercel deployment failures",
    description: "Fix environment variables, build logs, routing, static generation, and deployment checks.",
    href: "/q/vercel",
  },
  {
    title: "GitHub Actions failures",
    description: "Read CI logs, isolate failing steps, and define freelance repair scope before changing code.",
    href: "/q/github",
  },
  {
    title: "Agent deployment and RAG memory",
    description: "Plan tool calling, retrieval, memory, approval gates, and production risk controls.",
    href: "/q/ai-tools",
  },
];

const highIntentGuides = [
  {
    title: "Vercel env variables missing: beginner checklist",
    href: "/blog/vercel-env-variable-missing-beginner-guide",
  },
  {
    title: "Claude API rate limit reached: retries and fallback",
    href: "/blog/claude-api-rate-limit-debug-guide",
  },
  {
    title: "GitHub Actions build failed: how to read logs",
    href: "/blog/github-actions-build-log-debug",
  },
  {
    title: "RAG retrieval returns no context: debug guide",
    href: "/blog/rag-retrieval-no-context-debug-guide",
  },
  {
    title: "AI Agent deployment with Vercel AI SDK",
    href: "/blog/ai-agent-deployment-vercel-ai-sdk-guide",
  },
  {
    title: "LLM API rate limit retry strategy",
    href: "/blog/llm-api-rate-limit-retry-guide",
  },
];

const tools = [
  { title: "LLM deployment cost planner", href: "/tools/llm-deployment-cost-planner" },
  { title: "Memory and RAG architecture planner", href: "/tools/memory-rag-architecture-planner" },
  { title: "API routing cost checker", href: "/tools/api-routing-cost-checker" },
  { title: "Error explainer", href: "/tools/error-explainer" },
];

export default function EnglishEntryPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">AI Tools Guide / US search entry</p>
        <h1 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-ink md:text-5xl">
          Practical AI deployment, agent, RAG, and automation guides
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-gray-700">
          This site organizes real troubleshooting questions for builders working with Vercel, GitHub Actions,
          AI agents, RAG memory, API keys, rate limits, prompts, and office automation. Start from a specific
          problem, then move into a deeper guide or a small planning tool.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href="/q">
            Browse problem pages
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/deployments">
            Deployment guides
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools">
            Practical tools
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-ink">Start with a searchable problem</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {problemEntrances.map((item) => (
            <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50 hover:shadow-md" href={item.href} key={item.href}>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">High-intent guides</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {highIntentGuides.map((item) => (
              <Link className="rounded-md bg-gray-50 p-4 text-sm font-semibold leading-6 text-ink transition hover:bg-white hover:text-brand hover:shadow-sm" href={item.href} key={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-ink">Tools worth using</h2>
          <div className="mt-4 grid gap-3">
            {tools.map((item) => (
              <Link className="rounded-md border border-gray-100 p-3 text-sm font-semibold text-ink transition hover:border-brand/50 hover:text-brand" href={item.href} key={item.href}>
                {item.title}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

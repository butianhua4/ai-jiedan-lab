import Link from "next/link";

const services = [
  {
    title: "AI deployment troubleshooting",
    description: "Debug Vercel, GitHub Actions, environment variables, API keys, and production launch blockers.",
    href: "/cluster/vercel",
  },
  {
    title: "Agent and RAG implementation review",
    description: "Review agent tool-calling, memory design, retrieval flows, logs, and safety checkpoints.",
    href: "/cluster/ai-tools",
  },
  {
    title: "SEO tool site buildout",
    description: "Plan and build q pages, topic clusters, sitemap structure, monitoring, and conversion entry points.",
    href: "/admin/seo-growth",
  },
];

export const metadata = {
  title: "AI Implementation Services | AI Tools Guide",
  description: "Practical AI deployment, agent, RAG, and SEO tool site services for teams that need real implementation help.",
};

export default function ServicesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Services</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink">AI deployment and SEO growth help for real projects</h1>
        <p className="max-w-3xl text-lg text-gray-600">
          Use the free guides and tools first. When a production issue, agent workflow, or SEO growth system needs hands-on implementation, these are the focused service lanes.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white" href="/contact">
            Contact us
          </Link>
          <Link className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-ink" href="/tools">
            Use free tools
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={service.title}>
            <h2 className="text-xl font-semibold text-ink">{service.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
            <Link className="mt-5 inline-block text-sm font-semibold text-brand" href={service.href}>
              View related guides
            </Link>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-2xl font-semibold text-ink">Before paid work starts</h2>
        <p className="mt-3 text-sm leading-6 text-gray-600">
          We avoid income guarantees and platform-risk shortcuts. A useful engagement starts with the current error, deployment target, repo state, desired outcome, and what has already been tried.
        </p>
      </section>
    </main>
  );
}

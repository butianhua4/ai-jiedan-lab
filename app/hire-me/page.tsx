import Link from "next/link";

export const metadata = {
  title: "Hire AI Implementation Help | AI Tools Guide",
  description: "Request focused help with AI deployment, agents, RAG memory, GitHub Actions, Vercel, and SEO growth systems.",
};

export default function HireMePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">Hire help</p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-ink">Bring a stuck AI project to a clear next step</h1>
        <p className="max-w-3xl text-lg text-gray-600">
          Share the current error, repo or deployment context, target outcome, and what you already tried. The first goal is diagnosis and a safe implementation path, not vague promises.
        </p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          "Deployment or build failure",
          "Agent or RAG workflow review",
          "SEO growth system implementation",
        ].map((item) => (
          <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={item}>
            <h2 className="text-lg font-semibold text-ink">{item}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Best fit when there is a concrete project, error, workflow, or growth target that can be inspected and verified.
            </p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <h2 className="text-2xl font-semibold text-ink">What to include</h2>
        <ul className="mt-4 grid gap-2 text-sm text-gray-700">
          <li>Project URL or repository context when available.</li>
          <li>The exact error, failing command, or deployment log.</li>
          <li>The desired result and deadline.</li>
          <li>Any platform limits, API costs, or security constraints.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white" href="/contact">
            Send project details
          </Link>
          <Link className="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-ink" href="/services">
            View services
          </Link>
        </div>
      </section>
    </main>
  );
}

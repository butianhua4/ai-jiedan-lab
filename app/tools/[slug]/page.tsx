import { notFound } from "next/navigation";
import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { JsonLd } from "@/components/JsonLd";
import { tools } from "@/data/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  return tool ? {
    title: tool.name,
    description: tool.description,
    alternates: { canonical: `/tools/${tool.slug}` },
  } : {};
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();
  const alternatives = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.name, applicationCategory: tool.category, description: tool.description, url: tool.officialUrl }} />
      <p className="text-sm text-brand">{tool.category}</p>
      <h1 className="mt-2 text-4xl font-bold">{tool.name}</h1>
      <p className="mt-4 text-lg leading-8 text-gray-700">{tool.description}</p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-5">
          <h2 className="text-xl font-semibold">适合谁</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">{tool.bestFor}</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <h2 className="text-xl font-semibold">不适合谁</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">不适合想绕过平台规则、未经审核直接交付或用工具承诺保证收入的人。</p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <List title="优点" items={tool.pros} />
        <List title="缺点" items={tool.cons} />
      </section>

      <section className="mt-8 rounded-lg border bg-gray-50 p-5">
        <h2 className="text-xl font-semibold">新手建议</h2>
        <p className="mt-2 text-sm leading-6 text-gray-700">先用免费或低成本方式熟悉基础流程，不要在真实客户项目里直接尝试高风险功能。价格说明：{tool.pricingNote}。</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="rounded-md bg-brand px-4 py-2 text-sm text-white" href={tool.officialUrl}>官方链接</a>
          <span className="rounded-md border px-4 py-2 text-sm text-gray-500">联盟链接占位</span>
        </div>
      </section>

      {alternatives.length ? (
        <section className="mt-8">
          <h2 className="text-xl font-semibold">替代工具</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {alternatives.map((item) => (
              <a key={item.slug} className="rounded-lg border p-4 text-sm hover:border-brand" href={`/tools/${item.slug}`}>{item.name}</a>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-8"><AffiliateDisclosure /></div>
    </main>
  );
}

function List({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <section className="rounded-lg border bg-white p-5">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-gray-600">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

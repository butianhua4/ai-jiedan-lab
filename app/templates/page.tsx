import { EmailCapture } from "@/components/EmailCapture";
import { ServiceCTA } from "@/components/ServiceCTA";
import { templates } from "@/data/templates";

export const metadata = {
  title: "模板下载",
  description: "AI 接单新手可下载的 Proposal、报价、客户沟通、交付检查和部署模板。",
};

export default function TemplatesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">模板下载</h1>
      <p className="mt-3 max-w-3xl text-gray-600">
        第一版先提供免费模板和付费模板占位。所有模板都强调真实沟通、谨慎报价和人工审核，不用于自动群发或虚假包装。
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <article key={template.slug} className="rounded-lg border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-brand">{template.category} · {template.format}</p>
                <h2 className="mt-2 text-xl font-semibold">{template.title}</h2>
              </div>
              {template.isPaid ? <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">即将上线</span> : <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">免费</span>}
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">{template.description}</p>
            {template.isPaid ? (
              <div className="mt-5 space-y-2">
                <button className="rounded-md border px-4 py-2 text-sm text-gray-500" disabled>付费模板即将上线</button>
                <p className="text-xs text-gray-500">预留收款平台：{template.paymentProvider || "Gumroad / Lemon Squeezy"}</p>
              </div>
            ) : (
              <a className="mt-5 inline-block rounded-md bg-brand px-4 py-2 text-sm text-white" href={template.downloadUrl}>免费下载</a>
            )}
          </article>
        ))}
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <EmailCapture />
        <ServiceCTA />
      </div>
    </main>
  );
}

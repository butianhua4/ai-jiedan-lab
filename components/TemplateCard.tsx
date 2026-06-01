import { templates } from "@/data/templates";

type Template = typeof templates[number];

export function TemplateCard({ template }: { template: Template }) {
  const tagText = template.tags.join(" / ");

  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-brand">{template.category} · {template.format}</p>
          <h3 className="mt-2 text-lg font-semibold">{template.title}</h3>
        </div>
        {template.isPaid ? (
          <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">即将上线</span>
        ) : (
          <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">免费</span>
        )}
      </div>
      <p className="mt-2 text-sm leading-6 text-gray-600">{template.description}</p>
      <p className="mt-3 text-xs text-gray-500">适用标签：{tagText}</p>
      {template.isPaid ? (
        <div className="mt-4 space-y-2">
          <span className="inline-block rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-500">付费模板即将上线</span>
          <p className="text-xs text-gray-500">预留平台：{template.paymentProvider || "Gumroad / Lemon Squeezy"}</p>
        </div>
      ) : (
        <a className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm text-white" href={template.downloadUrl}>免费下载</a>
      )}
    </article>
  );
}

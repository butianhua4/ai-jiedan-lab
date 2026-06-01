import { templates } from "@/data/templates";

type Template = typeof templates[number];

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="rounded-lg border bg-white p-5 shadow-sm">
      <p className="text-xs text-brand">{template.category}</p>
      <h3 className="mt-2 text-lg font-semibold">{template.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{template.description}</p>
      {template.isPaid ? (
        <span className="mt-4 inline-block rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-500">即将上线</span>
      ) : (
        <a className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm text-white" href={template.downloadUrl}>免费下载</a>
      )}
    </article>
  );
}

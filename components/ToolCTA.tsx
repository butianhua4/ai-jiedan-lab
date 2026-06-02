import Link from "next/link";

const actions = [
  {
    href: "/templates",
    title: "下载新手模板包",
    description: "把 Proposal、报价、需求沟通和交付检查先标准化。",
  },
  {
    href: "/tools",
    title: "查看 AI 工具导航",
    description: "按编程、部署、收款、自动化和 SEO 场景挑工具。",
  },
  {
    href: "/roadmap",
    title: "查看 30 天路线图",
    description: "按天推进工具配置、作品集、小单筛选和复盘。",
  },
];

export function ToolCTA({ title = "下一步可以这样做" }: { title?: string }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-lg font-semibold text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            先用工具做判断，再用模板整理交付。生成内容只能作为草稿，不要不审核就直接发给客户。
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            className="rounded-md border border-gray-200 bg-gray-50 p-4 text-sm transition hover:border-brand/50 hover:bg-white"
            href={action.href}
          >
            <span className="font-semibold text-ink">{action.title}</span>
            <span className="mt-1 block leading-6 text-gray-600">{action.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

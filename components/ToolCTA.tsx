import Link from "next/link";

export function ToolCTA({ title = "下一步可以这样做" }: { title?: string }) {
  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <Link className="rounded-md border p-3 text-sm hover:border-brand" href="/templates">
          下载新手模板包
        </Link>
        <Link className="rounded-md border p-3 text-sm hover:border-brand" href="/tools">
          查看 AI 工具导航
        </Link>
        <Link className="rounded-md border p-3 text-sm hover:border-brand" href="/roadmap">
          查看 30 天路线图
        </Link>
      </div>
    </section>
  );
}

import Link from "next/link";

export function ServiceCTA() {
  return (
    <section className="rounded-lg border bg-blue-50 p-6">
      <h2 className="text-xl font-semibold">需要人工协助配置或排错？</h2>
      <p className="mt-2 leading-7 text-gray-700">
        你可以先用本站工具和模板自助排查。若确实卡在 Codex、Claude Code、GitHub、Vercel 配置或客户需求判断上，可以通过联系页咨询。服务不是主业入口，只作为少量高价值人工协助保留。
      </p>
      <Link href="/contact" className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-white">联系我</Link>
    </section>
  );
}

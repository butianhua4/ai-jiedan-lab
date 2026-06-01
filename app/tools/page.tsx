import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ToolsDirectoryClient } from "@/components/ToolsDirectoryClient";

export const metadata = {
  title: "AI 工具导航",
  description: "适合 AI 接单新手的工具导航、用途说明、风险提醒和官方链接。",
};

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="min-w-0 max-w-full overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <h1 className="break-words text-3xl font-bold text-ink">AI 工具导航</h1>
        <p className="mt-3 max-w-3xl break-words text-gray-600 [overflow-wrap:anywhere]">
          按用途筛选 Codex、Claude Code、ChatGPT、Upwork、Vercel、收款和 SEO 工具。工具推荐只用于建立工作流，不代表一定适合你，也不保证收入结果。
        </p>
        <div className="mt-6"><AffiliateDisclosure /></div>
      </section>
      <ToolsDirectoryClient />
    </main>
  );
}

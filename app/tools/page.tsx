import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ToolsDirectoryClient } from "@/components/ToolsDirectoryClient";

export const metadata = {
  title: "AI 工具导航",
  description: "适合 AI 接单新手的工具导航、用途说明、风险提醒和官方链接。",
};

export default function ToolsPage() {
  const internalTools = [
    {
      title: "AI PPT 策划与排版助手",
      description: "输入主题、受众和页数，生成逐页大纲、版式、视觉建议和可复制给 PPT 工具的提示词。",
      href: "/tools/ppt-planner",
    },
    {
      title: "AI 表格一键整理与清洗助手",
      description: "粘贴 CSV、Excel 或表格文本，整理空格、空值、重复行、字段类型，并生成可复制 CSV。",
      href: "/tools/spreadsheet-cleaner",
    },
    {
      title: "Upwork Proposal 生成器",
      description: "根据客户需求生成谨慎可改的英文投标草稿，并提示风险、追问问题和报价方向。",
      href: "/tools/proposal-generator",
    },
    {
      title: "项目报价助手",
      description: "按工时、难度、加急、沟通和平台抽成估算自由职业报价范围。",
      href: "/tools/pricing-calculator",
    },
    {
      title: "Codex 报错解释器",
      description: "把 npm、Git、Vercel、TypeScript 等常见报错翻译成新手可执行步骤。",
      href: "/tools/error-explainer",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="min-w-0 max-w-full overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <h1 className="break-words text-3xl font-bold text-ink">AI 工具导航</h1>
        <p className="mt-3 max-w-3xl break-words text-gray-600 [overflow-wrap:anywhere]">
          按用途筛选 Codex、Claude Code、ChatGPT、Upwork、Vercel、收款和 SEO 工具。工具推荐只用于建立工作流，不代表一定适合你，也不保证收入结果。
        </p>
        <div className="mt-6"><AffiliateDisclosure /></div>
      </section>
      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">站内实用工具</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">先用这些工具解决具体任务，再决定要不要购买外部 AI 产品或继续读教程。</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {internalTools.map((tool) => (
            <a className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href={tool.href} key={tool.href}>
              <h3 className="text-lg font-semibold text-ink">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>
      <ToolsDirectoryClient />
    </main>
  );
}

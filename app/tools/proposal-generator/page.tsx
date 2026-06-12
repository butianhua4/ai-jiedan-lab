import type { Metadata } from "next";
import { ProposalGeneratorClient } from "@/components/ProposalGeneratorClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "Upwork Proposal 生成器",
  description:
    "根据客户需求生成谨慎可修改的 Upwork 英文 Proposal 草稿，并提示风险、追问问题和报价建议。",
  alternates: { canonical: "/tools/proposal-generator" },
  openGraph: {
    title: "Upwork Proposal 生成器",
    description: "生成谨慎可修改的英文投标草稿，适合 AI 工具新手练习。",
    url: "/tools/proposal-generator",
  },
};

export default function ProposalPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Upwork 投标辅助工具</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Upwork Proposal 生成器</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          第一版使用规则模板，不调用真实 AI API。它会先判断风险、难度和需要追问的问题，再生成可修改的英文草稿。
          投标前必须按真实能力人工改写，不要承诺无法完成的内容。
        </p>
      </section>
      <ProposalGeneratorClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm text-gray-600">
        免责声明：生成内容仅供参考，投标前请根据真实能力修改，不要承诺无法完成的内容，也不要规避平台规则。
      </p>
      <div className="mt-8">
        <ToolCTA />
      </div>
    </main>
  );
}

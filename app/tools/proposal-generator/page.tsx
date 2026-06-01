import type { Metadata } from "next";
import { ToolCTA } from "@/components/ToolCTA";
import { ProposalGeneratorClient } from "@/components/ProposalGeneratorClient";

export const metadata: Metadata = {
  title: "Upwork Proposal 生成器",
  description: "根据客户需求生成谨慎可修改的 Upwork 英文 Proposal 草稿，并提示风险、问题和报价建议。",
  alternates: { canonical: "/tools/proposal-generator" },
  openGraph: {
    title: "Upwork Proposal 生成器",
    description: "生成谨慎可修改的英文投标草稿，适合 AI 接单新手练习。",
    url: "/tools/proposal-generator",
  },
};

export default function ProposalPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Upwork Proposal 生成器</h1>
      <p className="mt-3 max-w-3xl text-gray-600">第一版使用规则模板，不调用真实 AI API。生成内容只适合做草稿，投标前必须按真实能力修改。</p>
      <ProposalGeneratorClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm text-gray-600">免责声明：生成内容仅供参考，投标前请根据真实能力修改，不要承诺无法完成的内容，不要绕过平台规则。</p>
      <div className="mt-8"><ToolCTA /></div>
    </main>
  );
}

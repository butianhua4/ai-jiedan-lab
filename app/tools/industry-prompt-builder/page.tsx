import type { Metadata } from "next";
import { IndustryPromptBuilderClient } from "@/components/IndustryPromptBuilderClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "全行业 AI 提示词工作流生成器",
  description: "按行业、岗位、任务、输入资料和输出格式生成可复制 AI 提示词，覆盖销售、营销、客服、HR、运营、财务、教育和开发场景。",
  alternates: { canonical: "/tools/industry-prompt-builder" },
  openGraph: {
    title: "全行业 AI 提示词工作流生成器",
    description: "生成执行版、质检版和 SOP 版提示词，适合团队复用、项目交付和行业工作流沉淀。",
    url: "/tools/industry-prompt-builder",
  },
};

export default function IndustryPromptBuilderPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-violet-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">提示词 / 行业工作流 / 团队 SOP</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">全行业 AI 提示词工作流生成器</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          不只是给一句万能 Prompt，而是按行业、岗位、真实任务、输入资料、输出格式和复核边界生成一套可复制提示词。适合销售、营销、客服、HR、运营、财务、教育、开发和项目交付场景。
        </p>
      </section>
      <IndustryPromptBuilderClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只帮助你组织提示词和工作流，不保证 AI 输出事实正确，也不替代财务、法律、医疗、合同或客户承诺判断。正式交付前，请人工复核原始资料、客户隐私、数据来源和输出边界。
      </p>
      <div className="mt-8">
        <ToolCTA title="提示词生成后下一步" />
      </div>
    </main>
  );
}

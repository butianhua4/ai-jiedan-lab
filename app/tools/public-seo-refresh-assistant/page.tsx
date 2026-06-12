import type { Metadata } from "next";
import { PublicSeoRefreshAssistantClient } from "@/components/PublicSeoRefreshAssistantClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "公开文章标题、描述与内链刷新助手",
  description: "输入文章标题、摘要、关键词、搜索意图和读者人群，生成 SEO 标题候选、Meta 描述、内链建议和人工发布前检查清单。",
  alternates: { canonical: "/tools/public-seo-refresh-assistant" },
  openGraph: {
    title: "公开文章标题、描述与内链刷新助手",
    description: "为公开文章生成可人工审核的 SEO 标题、描述和内链建议，不自动修改文章、不自动发布。",
    url: "/tools/public-seo-refresh-assistant",
  },
};

export default function PublicSeoRefreshAssistantPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-lime-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">SEO 标题 / Meta 描述 / 内链 / 人工审核</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">公开文章标题、描述与内链刷新助手</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          输入文章主题、摘要、关键词、搜索意图和目标读者，生成 SEO 标题候选、Meta 描述、内链建议和发布前检查清单。只做人工审核材料，不自动改公开文章，也不自动发布。
        </p>
      </section>
      <PublicSeoRefreshAssistantClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只生成候选方案，不代表真实搜索量、排名或流量承诺。正式修改公开文章前，请人工复核正文事实、来源、标题一致性和平台规则。
      </p>
      <div className="mt-8">
        <ToolCTA title="SEO 刷新后下一步" />
      </div>
    </main>
  );
}

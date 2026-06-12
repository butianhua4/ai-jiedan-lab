import type { Metadata } from "next";
import { MemoryRagArchitecturePlannerClient } from "@/components/MemoryRagArchitecturePlannerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "Agent 记忆与 RAG 架构规划器",
  description: "输入 Agent 场景、资料来源、更新频率、隐私等级和检索策略，生成短期记忆、长期记忆、RAG 管线、权限和删除方案。",
  alternates: { canonical: "/tools/memory-rag-architecture-planner" },
  openGraph: {
    title: "Agent 记忆与 RAG 架构规划器",
    description: "规划 Agent 短期记忆、长期记忆、RAG 知识库、向量检索、隐私删除和评测回归，适合客服、销售、企业内部 Agent 和研究资料库。",
    url: "/tools/memory-rag-architecture-planner",
  },
};

export default function MemoryRagArchitecturePlannerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Agent 记忆 / RAG / 向量库 / 隐私删除</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">Agent 记忆与 RAG 架构规划器</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          输入应用场景、资料来源、更新频率、隐私等级和检索策略，生成短期记忆、长期记忆、RAG 管线、权限审计、删除机制和上线检查清单。适合客服 Agent、销售跟进、个人助理、企业内部知识库和研究资料库。
        </p>
      </section>
      <MemoryRagArchitecturePlannerClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只做架构规划，不会替你读取真实客户资料或保存记忆。正式上线前，请人工复核资料授权、隐私合规、删除机制、引用来源和评测结果。
      </p>
      <div className="mt-8">
        <ToolCTA title="记忆与 RAG 规划后下一步" />
      </div>
    </main>
  );
}

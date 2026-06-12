import type { Metadata } from "next";
import { LlmDeploymentCostPlannerClient } from "@/components/LlmDeploymentCostPlannerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "大模型部署成本与路径选择器",
  description: "输入模型规模、量化方式、并发、上下文、每日请求、API 单价和 GPU 单价，粗估 LLM 部署成本并选择 API、Ollama、vLLM 或 Serverless GPU 路径。",
  alternates: { canonical: "/tools/llm-deployment-cost-planner" },
  openGraph: {
    title: "大模型部署成本与路径选择器",
    description: "比较 API、本地 Ollama、vLLM GPU、Serverless GPU 等大模型部署路径，生成成本粗估、显存估算和上线检查清单。",
    url: "/tools/llm-deployment-cost-planner",
  },
};

export default function LlmDeploymentCostPlannerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-indigo-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">LLM 部署 / GPU 成本 / vLLM / Ollama</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">大模型部署成本与路径选择器</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          输入模型规模、量化方式、并发、上下文、每日请求和价格参数，粗略比较 API、本地 Ollama、vLLM GPU、Serverless GPU 等路线。适合做技术方案、客户报价、上线评审和部署前预算判断。
        </p>
      </section>
      <LlmDeploymentCostPlannerClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只做粗略估算，不提供实时价格，不保证模型质量或硬件兼容性。正式采购或上线前，请以供应商当日价格、官方文档、真实压测和人工安全复核为准。
      </p>
      <div className="mt-8">
        <ToolCTA title="大模型部署规划后下一步" />
      </div>
    </main>
  );
}

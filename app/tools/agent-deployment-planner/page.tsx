import type { Metadata } from "next";
import { AgentDeploymentPlannerClient } from "@/components/AgentDeploymentPlannerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "Agent 部署与工具权限规划器",
  description: "输入 Agent 目标、部署平台、工具调用、数据敏感度和写入权限，生成上线架构、权限矩阵、人工审核点和回滚检查清单。",
  alternates: { canonical: "/tools/agent-deployment-planner" },
  openGraph: {
    title: "Agent 部署与工具权限规划器",
    description: "规划 Vercel、Docker、本地、Dify、n8n 等 Agent 部署路径，先把工具权限、人审节点和上线风险讲清楚。",
    url: "/tools/agent-deployment-planner",
  },
};

export default function AgentDeploymentPlannerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-cyan-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Agent 部署 / 工具调用 / 权限控制</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">Agent 部署与工具权限规划器</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          输入 Agent 目标、平台、工具、数据敏感度和写入权限，先生成上线架构、权限矩阵、人工审核点和回滚清单。适合做客服 Agent、运营自动化、研究助手、代码辅助和销售跟进工作流。
        </p>
      </section>
      <AgentDeploymentPlannerClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只做部署规划和风险检查，不会替你连接真实系统、读取密钥或执行写入。正式上线前，请人工复核工具权限、数据合规、日志策略、错误回滚和客户承诺边界。
      </p>
      <div className="mt-8">
        <ToolCTA title="Agent 规划后下一步" />
      </div>
    </main>
  );
}

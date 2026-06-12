import type { Metadata } from "next";
import Link from "next/link";

const deploymentLanes = [
  {
    title: "网页和应用部署",
    keywords: "Vercel、Next.js、环境变量、域名、构建失败",
    summary: "适合把作品集、工具站、客户小项目上线。先确认构建命令、环境变量、域名解析和回滚方式。",
    checks: ["npm run build 本地通过", "生产环境变量已配置", "域名和 canonical URL 一致", "失败时能回滚到上一个部署"],
    href: "/blog/codex-npm-install-error-beginner-fix",
  },
  {
    title: "大模型部署",
    keywords: "Ollama、vLLM、GPU、Serverless GPU、API 成本",
    summary: "适合本地模型、私有化问答、推理服务和成本对比。重点是并发、上下文、显存和运维边界。",
    checks: ["明确模型规模和上下文长度", "估算 GPU/API 单次成本", "设置限流和队列", "准备降级到 API 或小模型"],
    href: "/tools/llm-deployment-cost-planner",
  },
  {
    title: "Agent 部署",
    keywords: "LangGraph、CrewAI、MCP、tool calling、权限控制",
    summary: "适合自动处理资料、生成报告、调用工具或跑工作流。核心不是能不能调用工具，而是权限、日志和人工审核。",
    checks: ["区分只读和写入工具", "敏感操作需要人工确认", "每次工具调用有日志", "失败时有停止和回滚路径"],
    href: "/tools/agent-deployment-planner",
  },
  {
    title: "记忆和 RAG 部署",
    keywords: "向量数据库、pgvector、知识库、长期记忆、召回评测",
    summary: "适合客服知识库、团队文档问答、长期项目记忆。重点是资料更新、删除机制、召回质量和隐私边界。",
    checks: ["资料来源和更新时间明确", "切分、嵌入、召回可复现", "隐私数据可删除", "准备人工评测问题集"],
    href: "/tools/memory-rag-architecture-planner",
  },
  {
    title: "AI API 路由",
    keywords: "OpenAI、Claude、Gemini、OpenRouter、限流、预算",
    summary: "适合多个模型供应商、成本控制和可用性兜底。先做 key 安全、限流、缓存、重试和日志脱敏。",
    checks: ["key 不进前端和日志", "RPM/TPM 限制可见", "预算超限有降级策略", "错误码和重试策略明确"],
    href: "/tools/api-routing-cost-checker",
  },
  {
    title: "客户交付部署",
    keywords: "交付清单、验收、报价、维护、SLA",
    summary: "适合客户项目上线交付。除了部署成功，还要写清楚验收范围、维护边界、账号归属和后续收费。",
    checks: ["验收项可截图或录屏证明", "账号和密钥归属明确", "维护时间和响应边界明确", "报价包含部署和排错成本"],
    href: "/tools/pricing-calculator",
  },
];

const searchTasks = [
  "Next.js 部署 Vercel 教程",
  "大模型本地部署教程",
  "Ollama 部署 API 服务",
  "vLLM 部署显存要求",
  "Agent 部署到服务器",
  "MCP 工具权限配置",
  "RAG 知识库部署",
  "向量数据库怎么选",
  "AI API 限流怎么做",
  "OpenRouter 成本路由",
  "AI 应用上线检查清单",
  "客户项目部署交付清单",
];

export const metadata: Metadata = {
  title: "AI 部署教程：网页、大模型、Agent、RAG 和 API 路由上线清单",
  description:
    "整理 AI 项目部署常见路径，覆盖网页部署、大模型部署、Agent 部署、记忆/RAG、API 路由、限流、成本和客户交付检查清单。",
  alternates: { canonical: "/deployments" },
  openGraph: {
    title: "AI 部署教程：大模型、Agent、RAG 和 API 路由",
    description: "用一页梳理 AI 项目上线前需要确认的路径、工具、成本、权限和回滚清单。",
    url: "/deployments",
  },
};

export default function DeploymentsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-cyan-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">AI 部署教程 / 大模型部署 / Agent 上线 / RAG 记忆</p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <h1 className="break-words text-3xl font-bold leading-tight text-ink md:text-5xl">AI 部署教程：从网页上线到 Agent 和大模型部署</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-700">
              不只做网页部署，也覆盖大模型推理、Agent 工具权限、RAG 知识库、API 成本路由和客户项目交付。先用这页判断自己属于哪条部署路径，再进入对应工具做成本、权限和上线清单。
            </p>
          </div>
          <div className="rounded-lg border border-cyan-100 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-ink">最容易漏掉的事</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">部署成功不等于可以交付。还要确认密钥安全、日志脱敏、限流、人工审核、回滚和客户验收边界。</p>
            <Link className="mt-4 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-medium text-white" href="/tools/agent-deployment-planner">
              生成部署清单
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">按部署类型选择路径</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">每条路径都附带常见搜索词、上线前检查项和可直接使用的站内工具。</p>
          </div>
          <Link className="text-sm font-medium text-brand hover:underline" href="/tools">
            查看全部工具
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {deploymentLanes.map((lane) => (
            <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={lane.title}>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-ink">{lane.title}</h3>
                <p className="text-xs leading-5 text-gray-500">{lane.keywords}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-700">{lane.summary}</p>
              <ul className="mt-4 grid gap-2 text-sm text-gray-600">
                {lane.checks.map((check) => (
                  <li className="rounded-md bg-gray-50 px-3 py-2" key={check}>
                    {check}
                  </li>
                ))}
              </ul>
              <Link className="mt-4 inline-flex text-sm font-medium text-brand hover:underline" href={lane.href}>
                进入对应工具或教程
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-ink">后续优先扩展的搜索主题</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">这些词会作为后续公开教程、工具说明和内链页面的扩展方向。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {searchTasks.map((task) => (
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700" key={task}>
              {task}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href="/tools/llm-deployment-cost-planner">
          <h2 className="text-lg font-semibold text-ink">大模型部署成本</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">粗估 API、Ollama、vLLM 和 Serverless GPU 的成本差异。</p>
        </Link>
        <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href="/tools/memory-rag-architecture-planner">
          <h2 className="text-lg font-semibold text-ink">RAG 和记忆架构</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">规划短期记忆、长期记忆、知识库更新和删除机制。</p>
        </Link>
        <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href="/tools/api-routing-cost-checker">
          <h2 className="text-lg font-semibold text-ink">API 限流和路由</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">检查预算、限流、缓存、降级、密钥安全和日志脱敏。</p>
        </Link>
      </section>
    </main>
  );
}

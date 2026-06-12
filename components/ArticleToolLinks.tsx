import Link from "next/link";
import type { BlogPost } from "@/lib/types";

const toolTargets = [
  {
    href: "/tools/error-explainer",
    label: "Codex 报错解释器",
    description: "把 npm、Git、Vercel、TypeScript 等报错拆成可执行步骤。",
    terms: ["error", "报错", "npm", "git", "vercel", "typescript", "install", "failed", "troubleshooting"],
  },
  {
    href: "/tools/pricing-calculator",
    label: "项目报价助手",
    description: "按工时、难度、沟通成本和平台抽成估算项目报价。",
    terms: ["报价", "pricing", "price", "预算", "proposal", "upwork", "fiverr", "项目"],
  },
  {
    href: "/tools/proposal-generator",
    label: "Upwork Proposal 生成器",
    description: "根据客户需求生成投标草稿、追问问题和风险提醒。",
    terms: ["proposal", "upwork", "客户", "投标", "需求", "freelance", "client"],
  },
  {
    href: "/tools/ppt-planner",
    label: "AI PPT 策划与排版助手",
    description: "生成逐页大纲、版式建议、视觉方向和可复制 PPT 提示词。",
    terms: ["ppt", "slides", "presentation", "汇报", "路演", "deck"],
  },
  {
    href: "/tools/spreadsheet-cleaner",
    label: "AI 表格整理与清洗助手",
    description: "清洗 CSV/Excel 文本，检查空值、重复行和字段类型。",
    terms: ["excel", "csv", "sheet", "spreadsheet", "表格", "数据", "清洗"],
  },
  {
    href: "/tools/industry-prompt-builder",
    label: "全行业 AI 提示词生成器",
    description: "按行业、岗位、任务和输出格式生成执行版、质检版和 SOP 提示词。",
    terms: ["prompt", "提示词", "chatgpt", "claude", "gemini", "销售", "客服", "hr", "运营"],
  },
  {
    href: "/tools/agent-deployment-planner",
    label: "Agent 部署与权限规划器",
    description: "规划 Agent 平台、工具权限、人工审核和回滚清单。",
    terms: ["agent", "mcp", "tool calling", "部署", "权限", "langgraph", "crewai"],
  },
  {
    href: "/tools/llm-deployment-cost-planner",
    label: "大模型部署成本选择器",
    description: "粗估 API/GPU 成本和显存，选择 Ollama、vLLM 或 Serverless GPU 路径。",
    terms: ["llm", "大模型", "ollama", "vllm", "gpu", "runpod", "huggingface"],
  },
  {
    href: "/tools/memory-rag-architecture-planner",
    label: "Agent 记忆与 RAG 架构规划器",
    description: "规划短期记忆、长期记忆、RAG 管线、隐私删除和评测回归。",
    terms: ["rag", "memory", "记忆", "向量", "知识库", "vector", "pgvector"],
  },
  {
    href: "/tools/api-routing-cost-checker",
    label: "AI API 限流与成本路由检查器",
    description: "检查 RPM、TPM、预算、缓存、降级、key 安全和日志脱敏。",
    terms: ["api", "rate limit", "限流", "key", "openrouter", "tokens", "成本"],
  },
  {
    href: "/tools/public-seo-refresh-assistant",
    label: "公开文章 SEO 刷新助手",
    description: "生成标题候选、Meta 描述、内链建议和人工发布前检查清单。",
    terms: ["seo", "标题", "description", "meta", "sitemap", "内链", "搜索"],
  },
];

export function ArticleToolLinks({ post }: { post: BlogPost }) {
  const text = [
    post.title,
    post.description,
    post.category,
    post.primaryKeyword,
    post.searchIntent,
    ...post.tags,
    ...post.secondaryKeywords,
  ]
    .join(" ")
    .toLowerCase();

  const matches = toolTargets
    .map((target) => ({
      ...target,
      score: target.terms.filter((term) => text.includes(term.toLowerCase())).length,
    }))
    .filter((target) => target.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const tools = matches.length ? matches : toolTargets.slice(0, 3);

  return (
    <section className="mt-10 rounded-lg border border-blue-100 bg-blue-50 p-5 shadow-sm">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div>
          <h2 className="text-xl font-semibold text-ink">读完后可以直接用的工具</h2>
          <p className="mt-1 text-sm leading-6 text-gray-700">根据这篇文章的主题自动匹配，先用工具做判断，再人工复核交付。</p>
        </div>
        <Link className="text-sm font-medium text-brand hover:underline" href="/tools">
          查看全部工具
        </Link>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {tools.map((tool) => (
          <Link className="rounded-md border border-gray-200 bg-white p-4 transition hover:border-brand/50" href={tool.href} key={tool.href}>
            <h3 className="text-sm font-semibold text-ink">{tool.label}</h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

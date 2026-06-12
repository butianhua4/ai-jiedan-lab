import Link from "next/link";

const nav = [
  ["/", "首页"],
  ["/blog", "新手教程"],
  ["/tools/ppt-planner", "PPT 策划"],
  ["/tools/spreadsheet-cleaner", "表格整理"],
  ["/prompts", "提示词库"],
  ["/tools/agent-deployment-planner", "Agent 部署"],
  ["/tools/llm-deployment-cost-planner", "大模型部署"],
  ["/tools/memory-rag-architecture-planner", "记忆/RAG"],
  ["/tools/api-routing-cost-checker", "API 路由"],
  ["/tools/public-seo-refresh-assistant", "SEO 刷新"],
  ["/tools/proposal-generator", "Proposal 生成器"],
  ["/tools/error-explainer", "报错解释器"],
  ["/tools/pricing-calculator", "报价助手"],
  ["/tools", "工具导航"],
  ["/templates", "模板下载"],
  ["/about", "关于我们"],
  ["/contact", "联系我们"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full max-w-full overflow-hidden border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-bold text-ink">
          AI 接单实验室
        </Link>
        <nav className="flex min-w-0 flex-wrap gap-3 text-sm text-gray-600">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

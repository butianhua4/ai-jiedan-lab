import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { ToolsDirectoryClient } from "@/components/ToolsDirectoryClient";
import Link from "next/link";
import {
  getBlogPath,
  getClusterPath,
  getPublishedSeoPosts,
  getQuestionPath,
  type SeoClusterSlug,
  seoClusters,
} from "@/lib/seo-graph";

const toolSeoClusters = ["ai-tools", "codex", "vercel", "upwork", "github", "node-js-errors"] satisfies SeoClusterSlug[];
const toolKeywordPattern =
  /tool|tools|工具|chatgpt|codex|claude|cursor|github|vercel|upwork|fiverr|proposal|pricing|prompt|提示词|ppt|excel|spreadsheet|agent|rag|llm|seo|search console|analytics|automation|自动化/i;

function toolRelevanceScore(post: ReturnType<typeof getPublishedSeoPosts>[number]) {
  const text = [post.slug, post.title, post.description, post.category, post.primaryKeyword, ...post.tags].join(" ");
  const exactToolMatch = toolKeywordPattern.test(text) ? 40 : 0;
  const tutorialBoost = post.contentType === "tutorial" ? 12 : 0;
  const qualityBoost = Math.round((post.qualityScore || 0) / 10);
  const tagBoost = post.tags.filter((tag) => toolKeywordPattern.test(tag)).length * 6;
  return exactToolMatch + tutorialBoost + qualityBoost + tagBoost;
}

export const metadata = {
  title: "AI 工具导航",
  description: "适合 AI 工具新手的工具导航、用途说明、风险提醒和官方链接。",
};

export default function ToolsPage() {
  const internalTools = [
    {
      title: "AI PPT 策划与排版助手",
      description: "输入主题、受众和页数，生成逐页大纲、版式、视觉建议和可复制给 PPT 工具的提示词。",
      href: "/tools/ppt-planner",
    },
    {
      title: "AI 表格一键整理与清洗助手",
      description: "粘贴 CSV、Excel 或表格文本，整理空格、空值、重复行、字段类型，并生成可复制 CSV。",
      href: "/tools/spreadsheet-cleaner",
    },
    {
      title: "全行业 AI 提示词工作流生成器",
      description: "按行业、岗位、任务、资料和输出格式，生成执行版、质检版和 SOP 版提示词。",
      href: "/tools/industry-prompt-builder",
    },
    {
      title: "Agent 部署与工具权限规划器",
      description: "输入目标、平台、工具、数据敏感度和写入权限，生成上线架构、权限矩阵和回滚清单。",
      href: "/tools/agent-deployment-planner",
    },
    {
      title: "大模型部署成本与路径选择器",
      description: "按模型规模、并发、上下文、API 单价和 GPU 单价，粗估部署成本并选择 API、Ollama、vLLM 或 Serverless GPU。",
      href: "/tools/llm-deployment-cost-planner",
    },
    {
      title: "Agent 记忆与 RAG 架构规划器",
      description: "按场景、资料来源、更新频率和隐私等级，生成短期记忆、长期记忆、RAG 管线和删除机制。",
      href: "/tools/memory-rag-architecture-planner",
    },
    {
      title: "AI API 接入、限流与成本路由检查器",
      description: "按供应商、请求量、tokens、预算和限额，生成 API 路由、限流、降级、密钥和日志方案。",
      href: "/tools/api-routing-cost-checker",
    },
    {
      title: "公开文章标题、描述与内链刷新助手",
      description: "输入标题、摘要、关键词和搜索意图，生成 SEO 标题候选、Meta 描述、内链建议和人工检查清单。",
      href: "/tools/public-seo-refresh-assistant",
    },
    {
      title: "Upwork Proposal 生成器",
      description: "根据客户需求生成谨慎可改的英文投标草稿，并提示风险、追问问题和报价方向。",
      href: "/tools/proposal-generator",
    },
    {
      title: "项目报价助手",
      description: "按工时、难度、加急、沟通和平台抽成估算自由职业报价范围。",
      href: "/tools/pricing-calculator",
    },
    {
      title: "Codex 报错解释器",
      description: "把 npm、Git、Vercel、TypeScript 等常见报错翻译成新手可执行步骤。",
      href: "/tools/error-explainer",
    },
  ];

  const clusterEntries = toolSeoClusters
    .map((slug) => seoClusters.find((cluster) => cluster.slug === slug))
    .filter((cluster): cluster is (typeof seoClusters)[number] => Boolean(cluster));
  const toolPosts = getPublishedSeoPosts()
    .filter((post) => toolKeywordPattern.test([post.slug, post.title, post.description, post.category, post.primaryKeyword, ...post.tags].join(" ")))
    .sort((a, b) => toolRelevanceScore(b) - toolRelevanceScore(a) || a.slug.localeCompare(b.slug));
  const toolQuestions = toolPosts.slice(0, 18);
  const toolGuides = toolPosts
    .filter((post) => post.contentType === "tutorial" || /tool|tools|工具|prompt|deploy|agent|seo|proposal|pricing/i.test([post.title, post.slug, post.category].join(" ")))
    .slice(0, 12);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="min-w-0 max-w-full overflow-hidden rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <h1 className="break-words text-3xl font-bold text-ink">AI 工具导航</h1>
        <p className="mt-3 max-w-3xl break-words text-gray-600 [overflow-wrap:anywhere]">
          按用途筛选 Codex、Claude Code、ChatGPT、Upwork、Vercel、收款和 SEO 工具。工具推荐只用于建立工作流，不代表一定适合你，也不保证收入结果。
        </p>
        <div className="mt-6"><AffiliateDisclosure /></div>
      </section>
      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">AI 工具主题中心</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              工具页负责承接泛搜索词，再把用户和搜索引擎分流到 Codex、部署、接单、GitHub、报错和 AI 工具这些主题中心。
            </p>
          </div>
          <Link className="text-sm font-medium text-brand hover:underline" href="/office-ai">
            看办公 AI 场景
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {clusterEntries.map((cluster) => (
            <Link
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 transition hover:border-brand/50 hover:bg-white"
              href={getClusterPath(cluster.slug)}
              key={cluster.slug}
            >
              <h3 className="text-base font-semibold text-ink">{cluster.shortTitle}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{cluster.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold text-ink">高频工具问题入口</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">这些 /q 页面更适合抢长尾搜索，用户先解决具体问题，再进入工具和教程。</p>
            </div>
            <Link className="text-sm font-medium text-brand hover:underline" href="/prompts">
              查看提示词入口
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {toolQuestions.map((post) => (
              <Link
                className="rounded-lg border border-gray-100 bg-gray-50 p-4 text-sm font-medium leading-6 text-ink transition hover:border-brand/50 hover:bg-white"
                href={getQuestionPath(post)}
                key={post.slug}
              >
                {post.title}
              </Link>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-ink">工具使用深度教程</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">这里链接到完整文章，补足工具选择、配置、风险和交付边界。</p>
          <div className="mt-4 grid gap-3">
            {toolGuides.map((post) => (
              <Link className="rounded-md border border-gray-100 p-3 transition hover:border-brand/50" href={getBlogPath(post)} key={post.slug}>
                <span className="block text-sm font-semibold leading-6 text-ink">{post.title}</span>
                <span className="mt-1 block text-xs leading-5 text-gray-500">{post.category}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">站内实用工具</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">先用这些工具解决具体任务，再决定要不要购买外部 AI 产品或继续读教程。</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {internalTools.map((tool) => (
            <a className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href={tool.href} key={tool.href}>
              <h3 className="text-lg font-semibold text-ink">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>
      <ToolsDirectoryClient />
    </main>
  );
}

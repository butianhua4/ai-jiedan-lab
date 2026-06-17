import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { ServiceCTA } from "@/components/ServiceCTA";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";
import {
  getBlogPath,
  getClusterPath,
  getPublishedSeoPosts,
  getQuestionPath,
  type SeoClusterSlug,
  seoClusters,
} from "@/lib/seo-graph";

export const metadata = {
  title: "模板下载",
  description: "AI 工具指南提供 Proposal、报价、客户沟通、交付检查、办公自动化和部署模板。",
  alternates: { canonical: "/templates" },
};

const steps = [
  {
    title: "先整理客户需求",
    description: "用客户问题清单和需求沟通表，把范围、素材、权限和验收标准问清楚。",
  },
  {
    title: "再报价和投标",
    description: "用报价单和 Proposal 模板，只写自己能交付的内容，不承诺确定成交。",
  },
  {
    title: "最后检查交付",
    description: "用交付清单、部署检查表和 GitHub 命令表，保留过程记录和交付说明。",
  },
];

const templateSeoClusters = ["upwork", "ai-tools", "codex", "vercel"] satisfies SeoClusterSlug[];
const templateKeywordPattern =
  /template|templates|模板|清单|checklist|proposal|报价|pricing|交付|验收|客户|沟通|合同|sop|办公|ppt|excel|spreadsheet|部署|deploy|upwork|freelance/i;

function templateRelevanceScore(post: ReturnType<typeof getPublishedSeoPosts>[number]) {
  const text = [post.slug, post.title, post.description, post.category, post.primaryKeyword, ...post.tags].join(" ");
  const exactTemplateMatch = templateKeywordPattern.test(text) ? 40 : 0;
  const checklistBoost = /checklist|清单|模板|template|sop/i.test(text) ? 18 : 0;
  const qualityBoost = Math.round((post.qualityScore || 0) / 10);
  const tagBoost = post.tags.filter((tag) => templateKeywordPattern.test(tag)).length * 6;
  return exactTemplateMatch + checklistBoost + qualityBoost + tagBoost;
}

export default function TemplatesPage() {
  const freeTemplates = templates.filter((template) => !template.isPaid);
  const paidTemplates = templates.filter((template) => template.isPaid);
  const categories = Array.from(
    templates.reduce((map, template) => {
      map.set(template.category, (map.get(template.category) || 0) + 1);
      return map;
    }, new Map<string, number>()),
  );
  const clusterEntries = templateSeoClusters
    .map((slug) => seoClusters.find((cluster) => cluster.slug === slug))
    .filter((cluster): cluster is (typeof seoClusters)[number] => Boolean(cluster));
  const templatePosts = getPublishedSeoPosts()
    .filter((post) => templateKeywordPattern.test([post.slug, post.title, post.description, post.category, post.primaryKeyword, ...post.tags].join(" ")))
    .sort((a, b) => templateRelevanceScore(b) - templateRelevanceScore(a) || a.slug.localeCompare(b.slug));
  const templateQuestions = templatePosts.slice(0, 16);
  const templateGuides = templatePosts
    .filter((post) => post.contentType === "tutorial" || /template|checklist|模板|清单|proposal|pricing|交付|验收/i.test([post.title, post.slug, post.category].join(" ")))
    .slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">模板包中心</p>
        <h1 className="mt-2 text-3xl font-bold text-ink md:text-4xl">模板下载</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          第一版先提供免费模板和付费模板占位。所有模板都强调真实沟通、谨慎报价和人工审核，不用于批量发送未经审核的 Proposal 或虚假包装。
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Link className="rounded-md bg-brand px-4 py-3 text-center text-sm font-semibold text-white" href="#free-templates">
            查看免费模板
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools/proposal-generator">
            先生成 Proposal
          </Link>
          <Link className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center text-sm font-semibold text-ink" href="/tools/pricing-calculator">
            先算报价范围
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className={`rounded-lg border border-gray-200 p-5 shadow-sm ${index === 0 ? "bg-blue-50" : "bg-white"}`}>
            <p className="text-sm font-medium text-brand">Step {index + 1}</p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-700">{step.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">模板主题中心</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              模板页承接 Proposal、报价、交付、办公自动化和部署清单搜索，再分流到主题中心、问题页和深度教程。
            </p>
          </div>
          <Link className="text-sm font-medium text-brand hover:underline" href="/tools">
            结合工具使用
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
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
              <h2 className="text-2xl font-bold text-ink">高频模板问题入口</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">这些 /q 页面覆盖“模板怎么写、清单怎么做、交付怎么验收、报价怎么拆”这类长尾搜索。</p>
            </div>
            <Link className="text-sm font-medium text-brand hover:underline" href="/q/upwork/upwork-proposal-beginner-guide">
              查看示例 q 页
            </Link>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {templateQuestions.map((post) => (
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
          <h2 className="text-xl font-bold text-ink">模板使用深度教程</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">模板解决格式，教程解释边界、流程、风险和人工审核点。</p>
          <div className="mt-4 grid gap-3">
            {templateGuides.map((post) => (
              <Link className="rounded-md border border-gray-100 p-3 transition hover:border-brand/50" href={getBlogPath(post)} key={post.slug}>
                <span className="block text-sm font-semibold leading-6 text-ink">{post.title}</span>
                <span className="mt-1 block text-xs leading-5 text-gray-500">{post.category}</span>
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold text-ink">模板分类</h2>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map(([category, count]) => (
            <span key={category} className="shrink-0 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700">
              {category} <span className="text-gray-400">{count}</span>
            </span>
          ))}
        </div>
      </section>

      <section id="free-templates" className="mt-10 scroll-mt-24">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">免费模板</h2>
            <p className="mt-2 text-sm text-gray-600">适合先练习和自助排查，后续会根据真实反馈扩展。</p>
          </div>
          <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">{freeTemplates.length} 个免费</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {freeTemplates.map((template) => <TemplateCard key={template.slug} template={template} />)}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-ink">付费模板预留</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              现在不接支付。只有当免费模板有人下载、有人反馈需要完整 SOP 时，才会接 Gumroad 或 Lemon Squeezy。
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">{paidTemplates.length} 个规划中</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {paidTemplates.map((template) => <TemplateCard key={template.slug} template={template} />)}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-semibold text-ink">使用提醒</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-gray-700 md:grid-cols-2">
          <li className="rounded-md bg-gray-50 p-3">模板只能帮你整理结构，不能替你判断项目是否真的能做。</li>
          <li className="rounded-md bg-gray-50 p-3">不要把模板用于批量发送未经审核的 Proposal，也不要包装虚假经历。</li>
          <li className="rounded-md bg-gray-50 p-3">客户需求不清时，先追问，不要急着报价和承诺截止时间。</li>
          <li className="rounded-md bg-gray-50 p-3">涉及支付、数据库、安全权限的项目，新手不要独立硬接。</li>
        </ul>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <EmailCapture />
        <ServiceCTA />
      </div>
    </main>
  );
}

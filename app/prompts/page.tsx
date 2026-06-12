import type { Metadata } from "next";
import Link from "next/link";

const industries = [
  {
    name: "销售",
    intent: "销售话术、客户跟进、异议处理、CRM 记录",
    prompt:
      "你是 B2B 销售教练。请根据客户行业、预算、当前顾虑和历史沟通记录，生成 3 套跟进话术：短消息版、电话开场版、邮件版。每套都要包含客户痛点、下一步行动和不夸大承诺的风险提醒。",
  },
  {
    name: "客服",
    intent: "售后回复、工单分类、投诉安抚、知识库总结",
    prompt:
      "你是客服质检主管。请把以下客户消息分类为咨询、投诉、退款、技术问题或升级处理，并生成一版礼貌回复。回复必须承认问题、说明下一步、避免承诺无法确认的结果。",
  },
  {
    name: "运营",
    intent: "活动策划、社群内容、复盘报告、增长实验",
    prompt:
      "你是增长运营负责人。请围绕目标用户、活动目标、预算和渠道限制，输出一份 7 天运营计划，包含每日动作、素材需求、数据指标、风险点和复盘问题。",
  },
  {
    name: "HR",
    intent: "招聘 JD、面试题、候选人评估、入职 SOP",
    prompt:
      "你是招聘负责人。请根据岗位职责、必备技能和团队阶段，生成岗位 JD、5 个结构化面试题、评分标准和候选人风险提示。不要使用歧视性筛选条件。",
  },
  {
    name: "电商",
    intent: "商品标题、详情页卖点、评价分析、直播脚本",
    prompt:
      "你是电商内容策划。请根据商品参数、目标人群、竞品差异和平台规则，生成商品标题、五点卖点、详情页结构和直播讲解脚本，避免虚假功效和绝对化用语。",
  },
  {
    name: "教育",
    intent: "课程大纲、练习题、学习计划、作业反馈",
    prompt:
      "你是课程设计师。请根据学习者基础、学习目标和课时限制，生成课程大纲、每节课练习题、评价标准和课后复习任务。输出要适合初学者逐步执行。",
  },
  {
    name: "财务",
    intent: "报表解释、预算拆解、费用归类、经营分析",
    prompt:
      "你是财务分析助理。请根据收入、成本、现金流和异常项，生成一份经营分析摘要，列出关键变化、可能原因、需要人工核对的数据和不能直接下结论的地方。",
  },
  {
    name: "开发",
    intent: "需求拆解、代码解释、报错排查、测试用例",
    prompt:
      "你是资深工程师。请根据需求背景、技术栈、错误日志和约束条件，拆解排查步骤、可能原因、最小复现方式和测试用例。不要跳过环境版本和依赖冲突检查。",
  },
];

const tasks = [
  "ChatGPT 写周报提示词",
  "AI 写小红书文案提示词",
  "AI 写短视频脚本提示词",
  "AI 做 PPT 大纲提示词",
  "AI 分析 Excel 表格提示词",
  "AI 客服自动回复提示词",
  "AI 招聘面试题提示词",
  "AI 销售跟进话术提示词",
  "AI 论文总结提示词",
  "AI 代码报错分析提示词",
  "AI 公众号选题提示词",
  "AI 制作 SOP 提示词",
];

export const metadata: Metadata = {
  title: "AI 提示词库：销售、客服、运营、HR、电商、教育常用 Prompt",
  description: "整理全行业常用 AI 提示词模板，覆盖销售、客服、运营、HR、电商、教育、财务、开发和项目交付场景，并提供可复制 Prompt 结构。",
  alternates: { canonical: "/prompts" },
  openGraph: {
    title: "AI 提示词库：全行业常用 Prompt 模板",
    description: "按行业和任务整理高频 AI 提示词，先复制模板，再用生成器扩展为执行版、质检版和 SOP 版。",
    url: "/prompts",
  },
};

export default function PromptsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">AI 提示词库 / 行业 Prompt / 工作流模板</p>
        <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <h1 className="break-words text-3xl font-bold leading-tight text-ink md:text-5xl">AI 提示词库：全行业常用 Prompt 模板</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-700">
              面向真正会被搜索的日常工作场景：销售跟进、客服回复、运营策划、HR 招聘、电商卖点、教育课程、财务分析和开发排错。这里先给可复制的基础模板，再引导你用生成器改成自己的行业版本。
            </p>
          </div>
          <div className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-ink">下一步</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">选一个行业模板，填入目标、资料、输出格式，再用工具生成执行版和质检版。</p>
            <Link className="mt-4 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-medium text-white" href="/tools/industry-prompt-builder">
              打开提示词生成器
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-2xl font-bold text-ink">按行业直接复制</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">这些模板故意保留变量位，方便换成你的客户、团队或项目背景。</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {industries.map((item) => (
            <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm" key={item.name}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-ink">{item.name} AI 提示词</h3>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">{item.intent}</span>
              </div>
              <p className="mt-4 rounded-md border border-gray-100 bg-gray-50 p-4 text-sm leading-7 text-gray-700">{item.prompt}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-2xl font-bold text-ink">常见搜索任务</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">后续文章和工具会优先围绕这些高频搜索需求继续扩展。</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tasks.map((task) => (
            <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700" key={task}>
              {task}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href="/tools/ppt-planner">
          <h2 className="text-lg font-semibold text-ink">PPT 提示词</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">把提示词直接转成逐页大纲、版式建议和演示结构。</p>
        </Link>
        <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href="/tools/spreadsheet-cleaner">
          <h2 className="text-lg font-semibold text-ink">表格整理提示词</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">把 Excel、CSV、字段清洗和数据质检变成可执行步骤。</p>
        </Link>
        <Link className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-brand/50" href="/blog">
          <h2 className="text-lg font-semibold text-ink">继续看教程</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">从公开文章里找部署、项目、报价和排错流程。</p>
        </Link>
      </section>
    </main>
  );
}

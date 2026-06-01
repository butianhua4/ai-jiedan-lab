export const metadata = {
  title: "AI 接单 30 天路线图",
  description: "适合新手的 AI 接单 30 天路线图，强调工具配置、平台规则、作品集和交付练习。",
};

const stages = [
  ["第 1-3 天：工具配置", "安装并熟悉 Codex、Claude Code、GitHub、Vercel，记录每一步报错。"],
  ["第 4-7 天：学习平台规则", "理解 Upwork、Fiverr 的沟通、付款、评价和禁止行为。"],
  ["第 8-10 天：作品集准备", "做 1-2 个真实小作品，不使用虚假案例。"],
  ["第 11-15 天：找小项目", "筛选落地页、CSS 修复、简单部署、模板修改等低风险任务。"],
  ["第 16-20 天：投标和沟通", "用 Proposal 生成器写草稿，再人工修改和确认边界。"],
  ["第 21-25 天：交付练习", "模拟客户需求，完成修改、测试、截图和交付说明。"],
  ["第 26-30 天：复盘和升级", "整理案例、模板、常见问题和下一批学习计划。"],
];

export default function RoadmapPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">AI 接单 30 天路线图</h1>
      <p className="mt-3 text-gray-600">这不是保证接单计划，而是帮助新手建立工具、规则、作品集和交付基础的练习路线。</p>
      <div className="mt-8 space-y-4">
        {stages.map(([title, description]) => (
          <section key={title} className="rounded-lg border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-2 leading-7 text-gray-600">{description}</p>
          </section>
        ))}
      </div>
    </main>
  );
}

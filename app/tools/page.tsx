import { AffiliateDisclosure } from "@/components/AffiliateDisclosure";
import { Card } from "@/components/Card";
import { tools } from "@/data/tools";

export const metadata = {
  title: "AI 工具导航",
  description: "适合 AI 接单新手的工具导航、用途说明、风险提醒和官方链接。",
};

export default function ToolsPage() {
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">AI 工具导航</h1>
      <p className="mt-3 max-w-3xl text-gray-600">工具推荐用于帮助新手建立工作流，不代表一定适合你，也不保证收入结果。</p>
      <div className="mt-6"><AffiliateDisclosure /></div>
      <div className="mt-8 space-y-10">
        {categories.map((category) => (
          <section key={category}>
            <h2 className="text-2xl font-bold">{category}</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {tools.filter((tool) => tool.category === category).map((tool) => (
                <Card key={tool.slug} title={tool.name} description={tool.description} href={`/tools/${tool.slug}`} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

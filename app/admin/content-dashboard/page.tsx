import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { contentPlan500 } from "@/content/content-plan-500";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";

function readJsonLog(fileName: string) {
  const file = path.join(process.cwd(), "content", fileName);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as unknown[];
  } catch {
    return [];
  }
}

export default function Dashboard() {
  if (process.env.NODE_ENV !== "development") notFound();

  const posts = getAllPosts(true);
  const generatedSlugs = new Set(posts.map((post) => post.slug));
  const counts = {
    planned: contentPlan500.filter((item) => !generatedSlugs.has(item.slug)).length,
    drafted: posts.filter((post) => post.status === "draft").length,
    review: posts.filter((post) => post.status === "review").length,
    published: posts.filter((post) => post.status === "published").length,
    archived: posts.filter((post) => post.status === "archived").length,
  };
  const byBatch = Array.from({ length: 20 }, (_, index) => {
    const batch = index + 1;
    return {
      batch,
      total: contentPlan500.filter((item) => item.batch === batch).length,
      generated: posts.filter((post) => post.publishBatch === batch).length,
      published: posts.filter((post) => post.publishBatch === batch && post.status === "published").length,
    };
  });
  const byCategory = contentPlan500.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const lowQuality = posts.filter((post) => (post.qualityScore || 0) < 80);
  const publishable = posts.filter((post) => post.status === "review" && (post.qualityScore || 0) >= 80);
  const publishLog = readJsonLog("publish-log.json").slice(-10);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">内容仪表盘</h1>
      <p className="mt-3 text-gray-600">仅开发环境可访问，用于查看选题、草稿、审核和发布状态。</p>

      <section className="mt-6 grid gap-4 md:grid-cols-5">
        {Object.entries({ total: contentPlan500.length, ...counts }).map(([key, value]) => (
          <div key={key} className="rounded-lg border bg-white p-4 shadow-sm">
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Batch 进度</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {byBatch.map((item) => (
            <div key={item.batch} className="rounded border p-3 text-sm">
              <strong>Batch {item.batch}</strong>
              <p>{item.generated}/{item.total} generated</p>
              <p>{item.published} published</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">分类选题数</h2>
          <ul className="mt-3 space-y-2">
            {Object.entries(byCategory).map(([category, count]) => (
              <li key={category} className="rounded border px-3 py-2 text-sm">
                {category}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">可发布文章</h2>
          <ul className="mt-3 space-y-2">
            {publishable.length ? publishable.map((post) => (
              <li key={post.slug} className="rounded border px-3 py-2 text-sm">
                {post.title} · score {post.qualityScore}
              </li>
            )) : <li className="text-sm text-gray-500">暂无可发布文章</li>}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">低质量文章</h2>
          <ul className="mt-3 space-y-2">
            {lowQuality.length ? lowQuality.slice(0, 20).map((post) => (
              <li key={post.slug} className="rounded border px-3 py-2 text-sm">
                {post.title} · score {post.qualityScore}
              </li>
            )) : <li className="text-sm text-gray-500">暂无低质量文章</li>}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">最近发布记录</h2>
          <pre className="mt-3 overflow-auto rounded bg-gray-100 p-4 text-xs">
            {JSON.stringify(publishLog, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}

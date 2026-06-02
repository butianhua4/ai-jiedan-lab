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
  const postsBySlug = new Map<string, (typeof posts)[number]>(posts.map((post) => [post.slug, post]));
  const planSlugs = new Set<string>(contentPlan500.map((item) => item.slug));
  const plannedPosts = posts.filter((post) => planSlugs.has(post.slug));
  const plannedGenerated = contentPlan500.filter((item) => postsBySlug.has(item.slug)).length;
  const counts = {
    plannedMissing: contentPlan500.length - plannedGenerated,
    drafted: plannedPosts.filter((post) => post.status === "draft").length,
    review: plannedPosts.filter((post) => post.status === "review").length,
    published: plannedPosts.filter((post) => post.status === "published").length,
    archived: posts.filter((post) => post.status === "archived").length,
  };
  const byBatch = Array.from({ length: 20 }, (_, index) => {
    const batch = index + 1;
    const batchPlan = contentPlan500.filter((item) => item.batch === batch);
    const generated = batchPlan.filter((item) => postsBySlug.has(item.slug));
    return {
      batch,
      generated: generated.length,
      draft: generated.filter((item) => postsBySlug.get(item.slug)?.status === "draft").length,
      published: generated.filter((item) => postsBySlug.get(item.slug)?.status === "published").length,
      total: batchPlan.length,
    };
  });
  const byCategory = contentPlan500.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});
  const lowQuality = plannedPosts.filter((post) => (post.qualityScore || 0) < 80);
  const publishable = plannedPosts.filter((post) => post.status === "review" && (post.qualityScore || 0) >= 80);
  const publishLog = readJsonLog("publish-log.json").slice(-10);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">内容仪表盘</h1>
      <p className="mt-3 text-gray-600">
        仅开发环境可访问，用于查看正式 500 篇选题、草稿、审核和发布状态。生产环境会返回 404，避免草稿入口暴露。
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-6">
        {Object.entries({ totalPlan: contentPlan500.length, plannedGenerated, ...counts }).map(([key, value]) => (
          <div className="rounded-lg border bg-white p-4 shadow-sm" key={key}>
            <p className="text-sm text-gray-500">{key}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">Batch 进度</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {byBatch.map((item) => (
            <div className="rounded border bg-white p-3 text-sm shadow-sm" key={item.batch}>
              <strong>Batch {item.batch}</strong>
              <p>{item.generated}/{item.total} generated</p>
              <p>{item.draft} draft</p>
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
              <li className="rounded border bg-white px-3 py-2 text-sm" key={category}>
                {category}: {count}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold">可发布文章</h2>
          <ul className="mt-3 space-y-2">
            {publishable.length ? (
              publishable.map((post) => (
                <li className="rounded border bg-white px-3 py-2 text-sm" key={post.slug}>
                  {post.title} - score {post.qualityScore}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">暂无可发布文章。draft 需要先通过人工审核进入 review。</li>
            )}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold">低质量文章</h2>
          <ul className="mt-3 space-y-2">
            {lowQuality.length ? (
              lowQuality.slice(0, 20).map((post) => (
                <li className="rounded border bg-white px-3 py-2 text-sm" key={post.slug}>
                  {post.title} - score {post.qualityScore}
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-500">暂无低质量文章。</li>
            )}
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

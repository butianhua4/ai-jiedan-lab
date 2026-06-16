import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { getBlogPath, getClusterForPost, getClusterPath, getQuestionPath, getRelatedPosts, getRelatedQuestions } from "@/lib/seo-graph";

export function SeoInternalLinks({ post }: { post: BlogPost }) {
  const cluster = getClusterForPost(post);
  const relatedPosts = getRelatedPosts(post, 4);
  const relatedQuestions = getRelatedQuestions(post, 4);

  return (
    <section className="mt-10 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-brand">SEO 路径</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">继续沿着同一主题解决问题</h2>
        </div>
        <Link className="text-sm font-medium text-brand hover:underline" href={getClusterPath(cluster.slug)}>
          进入 {cluster.shortTitle} 主题中心
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-ink">问题入口</h3>
          <div className="mt-3 space-y-2 text-sm">
            <Link className="block rounded-md border border-gray-200 p-3 hover:border-brand/50" href={getQuestionPath(post)}>
              {post.title}
            </Link>
            {relatedQuestions.slice(0, 3).map((question) => (
              <Link className="block rounded-md border border-gray-200 p-3 hover:border-brand/50" href={question.path} key={question.path}>
                {question.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">深度文章</h3>
          <div className="mt-3 space-y-2 text-sm">
            {relatedPosts.map((related) => (
              <Link className="block rounded-md border border-gray-200 p-3 hover:border-brand/50" href={getBlogPath(related)} key={related.slug}>
                {related.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

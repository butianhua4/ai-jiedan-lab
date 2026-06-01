import Link from "next/link";
import type { BlogPost } from "@/lib/types";

export function RelatedArticles({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null;
  return (
    <section className="rounded-lg border bg-white p-5">
      <h2 className="text-xl font-semibold">相关文章</h2>
      <div className="mt-4 space-y-3">
        {posts.map((post) => (
          <Link key={post.slug} className="block rounded-md border p-3 text-sm hover:border-brand" href={`/blog/${post.slug}`}>
            {post.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

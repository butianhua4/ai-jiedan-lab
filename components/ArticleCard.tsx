import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { CategoryBadge } from "./Badges";

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge label={post.category} />
        <span className="text-xs text-gray-500">{post.readingTime}</span>
      </div>
      <h3 className="mt-3 break-words text-lg font-semibold leading-7 text-ink group-hover:text-brand">{post.title}</h3>
      <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-gray-600">{post.description}</p>
      <div className="mt-4 text-sm font-medium text-brand">阅读全文</div>
    </Link>
  );
}

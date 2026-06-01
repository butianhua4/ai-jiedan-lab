import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { CategoryBadge } from "./Badges";

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="rounded-lg border bg-white p-5 shadow-sm hover:border-brand">
      <CategoryBadge label={post.category} />
      <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{post.description}</p>
    </Link>
  );
}

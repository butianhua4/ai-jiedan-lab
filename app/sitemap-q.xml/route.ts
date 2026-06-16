import { getPublishedSeoPosts, getQuestionPath } from "@/lib/seo-graph";
import { getSitemapPriority } from "@/lib/sitemap-priority";
import { sitemapUrlSet } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const priority = getSitemapPriority("q");
  return sitemapUrlSet(
    getPublishedSeoPosts().map((post) => ({
      path: getQuestionPath(post),
      lastModified: post.updatedAt,
      changeFrequency: priority.changeFrequency,
      priority: priority.priority,
    })),
  );
}

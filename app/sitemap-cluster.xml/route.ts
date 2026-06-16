import { getClusterPath, seoClusters } from "@/lib/seo-graph";
import { getSitemapPriority } from "@/lib/sitemap-priority";
import { sitemapUrlSet } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const priority = getSitemapPriority("cluster");
  return sitemapUrlSet(
    seoClusters.map((cluster) => ({
      path: getClusterPath(cluster.slug),
      lastModified: new Date(),
      changeFrequency: priority.changeFrequency,
      priority: priority.priority,
    })),
  );
}

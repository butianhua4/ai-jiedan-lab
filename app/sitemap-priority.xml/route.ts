import { getBlogPath, getClusterPath, getHighAuthorityPosts, getHighPotentialQuestionPosts, getQuestionPath, seoClusters } from "@/lib/seo-graph";
import { getSitemapPriority } from "@/lib/sitemap-priority";
import { sitemapUrlSet, type SitemapUrl } from "@/lib/sitemap-xml";
import type { BlogPost } from "@/lib/types";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const qPriority = getSitemapPriority("q");
  const clusterPriority = getSitemapPriority("cluster");
  const blogPriority = getSitemapPriority("blog");
  const seen = new Set<string>();

  const add = (items: SitemapUrl[], item: SitemapUrl) => {
    if (seen.has(item.path)) return;
    seen.add(item.path);
    items.push(item);
  };

  const entries: SitemapUrl[] = [];
  const priorityPosts = getHighPotentialQuestionPosts(150);
  const priorityBlogPosts = uniquePosts(seoClusters.flatMap((cluster) => getHighAuthorityPosts(cluster.slug, 5)));

  for (const path of ["", "/blog", "/deployments", "/office-ai", "/prompts", "/templates", "/tools"]) {
    add(entries, { path, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 });
  }

  for (const cluster of seoClusters) {
    add(entries, {
      path: getClusterPath(cluster.slug),
      lastModified: new Date(),
      changeFrequency: clusterPriority.changeFrequency,
      priority: clusterPriority.priority,
    });
  }

  for (const post of priorityPosts) {
    add(entries, {
      path: getQuestionPath(post),
      lastModified: post.updatedAt,
      changeFrequency: qPriority.changeFrequency,
      priority: qPriority.priority,
    });
  }

  for (const post of priorityBlogPosts) {
    add(entries, {
      path: getBlogPath(post),
      lastModified: post.updatedAt,
      changeFrequency: blogPriority.changeFrequency,
      priority: blogPriority.priority,
    });
  }

  return sitemapUrlSet(entries);
}

function uniquePosts(posts: BlogPost[]) {
  const seen = new Set<string>();
  return posts.filter((post) => {
    if (seen.has(post.slug)) return false;
    seen.add(post.slug);
    return true;
  });
}

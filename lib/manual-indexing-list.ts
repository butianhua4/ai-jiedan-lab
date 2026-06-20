import { site } from "@/data/site";
import {
  getBlogPath,
  getClusterPath,
  getHighAuthorityPosts,
  getHighPotentialQuestionPosts,
  getQuestionPath,
  seoClusters,
} from "@/lib/seo-graph";

export type ManualIndexingItem = {
  url: string;
  path: string;
  type: "q" | "cluster" | "blog";
  title: string;
  reason: string;
  priority: number;
};

export type ManualIndexingList = {
  generatedAt: string;
  dailyRequestLimit: {
    recommendedMin: number;
    recommendedMax: number;
    note: string;
  };
  items: ManualIndexingItem[];
};

export function getManualIndexingList(limit = 100): ManualIndexingList {
  const items = uniqueItems([
    ...getHighPotentialQuestionPosts(60).map((post, index) => ({
      url: absoluteUrl(getQuestionPath(post)),
      path: getQuestionPath(post),
      type: "q" as const,
      title: post.title,
      reason: "High-potential question entry page. Prioritize these for manual URL inspection requests.",
      priority: 1000 - index,
    })),
    ...seoClusters.map((cluster, index) => ({
      url: absoluteUrl(getClusterPath(cluster.slug)),
      path: getClusterPath(cluster.slug),
      type: "cluster" as const,
      title: cluster.title,
      reason: "Topic cluster hub page. Helps pass authority to related q and blog pages.",
      priority: 900 - index,
    })),
    ...seoClusters.flatMap((cluster, clusterIndex) =>
      getHighAuthorityPosts(cluster.slug, 5).map((post, index) => ({
        url: absoluteUrl(getBlogPath(post)),
        path: getBlogPath(post),
        type: "blog" as const,
        title: post.title,
        reason: "Deep article linked from a cluster and useful as a supporting authority page.",
        priority: 700 - clusterIndex * 10 - index,
      })),
    ),
  ])
    .sort((a, b) => b.priority - a.priority || a.path.localeCompare(b.path))
    .slice(0, limit);

  return {
    generatedAt: new Date().toISOString(),
    dailyRequestLimit: {
      recommendedMin: 5,
      recommendedMax: 15,
      note: "Use these URLs for manual GSC URL Inspection and Bing URL Submission. Do not submit hundreds at once.",
    },
    items,
  };
}

function uniqueItems(items: ManualIndexingItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.path)) return false;
    seen.add(item.path);
    return true;
  });
}

function absoluteUrl(path: string) {
  return `${site.url}${path}`;
}

import { site } from "@/data/site";
import { getClusterForPost, getHighPotentialQuestionPosts, getQuestionPath } from "@/lib/seo-graph";

export type QuestionOptimizationItem = {
  url: string;
  path: string;
  title: string;
  category: string;
  cluster: string;
  primaryKeyword: string;
  searchIntent: string;
  actions: string[];
};

export type QuestionOptimizationList = {
  generatedAt: string;
  total: number;
  items: QuestionOptimizationItem[];
};

export function getQuestionOptimizationList(limit = 50): QuestionOptimizationList {
  const items = getHighPotentialQuestionPosts(limit).map((post) => {
    const path = getQuestionPath(post);
    const cluster = getClusterForPost(post);

    return {
      url: `${site.url}${path}`,
      path,
      title: post.title,
      category: post.category,
      cluster: cluster.title,
      primaryKeyword: post.primaryKeyword,
      searchIntent: post.searchIntent,
      actions: [
        "Confirm the H1 directly answers the exact problem in one sentence.",
        "Keep the first screen focused on quick fix, commands, and risk warning.",
        "Check that the page links to one cluster hub and one deep blog article.",
        "Use GSC/Bing submission only after sitemap and live URL checks pass.",
      ],
    };
  });

  return {
    generatedAt: new Date().toISOString(),
    total: items.length,
    items,
  };
}

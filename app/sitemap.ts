import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getAllPosts, getCategorySlugs, getTagSlugs } from "@/lib/blog";
import { tools } from "@/data/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/blog",
    "/tools",
    "/tools/proposal-generator",
    "/tools/ppt-planner",
    "/tools/spreadsheet-cleaner",
    "/tools/industry-prompt-builder",
    "/tools/agent-deployment-planner",
    "/tools/llm-deployment-cost-planner",
    "/tools/memory-rag-architecture-planner",
    "/tools/api-routing-cost-checker",
    "/tools/public-seo-refresh-assistant",
    "/tools/error-explainer",
    "/tools/pricing-calculator",
    "/templates",
    "/roadmap",
    "/about",
    "/contact",
    "/privacy",
    "/disclaimer",
    "/monetization",
  ].map((url) => ({ url: base + url, lastModified: new Date() }));
  const postRoutes = getAllPosts(false).map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
  }));
  const toolRoutes = tools.map((tool) => ({ url: `${base}/tools/${tool.slug}`, lastModified: new Date() }));
  const categoryRoutes = getCategorySlugs().map((slug) => ({ url: `${base}/category/${slug}`, lastModified: new Date() }));
  const tagRoutes = getTagSlugs().map((slug) => ({ url: `${base}/tag/${slug}`, lastModified: new Date() }));

  return [...staticRoutes, ...postRoutes, ...toolRoutes, ...categoryRoutes, ...tagRoutes];
}

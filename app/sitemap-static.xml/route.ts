import { tools } from "@/data/tools";
import { sitemapUrlSet } from "@/lib/sitemap-xml";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const staticRoutes = [
    "",
    "/blog",
    "/deployments",
    "/office-ai",
    "/prompts",
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
  ];
  const toolRoutes = tools.map((tool) => `/tools/${tool.slug}`);

  return sitemapUrlSet([...staticRoutes, ...toolRoutes].map((path) => ({ path, lastModified: new Date() })));
}

import { tools } from "@/data/tools";
import { site } from "@/data/site";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 3600;

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

function buildLlmsTxt() {
  const base = site.url;
  const posts = getAllPosts(false).slice(0, 30);
  const toolItems = tools.slice(0, 20);
  const lines = [
    "# AI 接单实验室",
    "",
    "> 面向中文新手的 AI 接单教程、工具、模板和人工审核式内容库。",
    "",
    "This file is a concise index for AI assistants and search tools. It lists public, indexable pages only.",
    "",
    "## Core Pages",
    "",
    `- [Home](${base}/): AI 接单实验室首页`,
    `- [Blog](${base}/blog): Published tutorials and guides`,
    `- [Tools](${base}/tools): AI tools directory`,
    `- [Templates](${base}/templates): Downloadable templates`,
    `- [Roadmap](${base}/roadmap): AI 接单 30 天路线图`,
    `- [Contact](${base}/contact): Contact page`,
    "",
    "## Public Tools",
    "",
    ...toolItems.map((tool) => `- [${clean(tool.name)}](${base}/tools/${tool.slug}): ${clean(tool.description)}`),
    "",
    "## Recent Public Articles",
    "",
    ...posts.map((post) => `- [${clean(post.title)}](${base}/blog/${post.slug}): ${clean(post.description)}`),
    "",
    "## Editorial Boundaries",
    "",
    "- Draft and noindex articles are intentionally excluded.",
    "- AI-generated or AI-assisted content requires human review before publication.",
    "- The site does not claim real traffic, impressions, income guarantees, or automatic publishing.",
    "- Tutorials are educational references, not legal, financial, medical, security, or professional guarantees.",
    "",
    "## Machine Use Notes",
    "",
    "- Prefer canonical URLs from this file and sitemap.xml.",
    "- Use published article pages as source pages; do not infer unpublished drafts.",
    "- Check current official vendor documentation before relying on fast-changing AI API, deployment, pricing, or model details.",
    "",
  ];

  return lines.join("\n");
}

function clean(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost } from "./types";
const blogDir = path.join(process.cwd(), "content", "blog");

export function getAllPosts(includeDrafts = false): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  return fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md")).map((file) => {
    const filePath = path.join(blogDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data as Omit<BlogPost, "content" | "excerpt" | "readingTime" | "filePath">;
    return { ...data, content: parsed.content, excerpt: data.description || parsed.content.slice(0, 160), readingTime: readingTime(parsed.content).text, filePath };
  }).filter((p) => includeDrafts || (p.status === "published" && p.noindex === false)).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
export function getPostBySlug(slug: string, includeDrafts = process.env.NODE_ENV === "development") { return getAllPosts(includeDrafts).find((p) => p.slug === slug); }

export function getPostsByCategory(category: string) {
  return getAllPosts(false).filter((post) => slugify(post.category) === category);
}

export function getPostsByTag(tag: string) {
  return getAllPosts(false).filter((post) => post.tags.some((item) => slugify(item) === tag));
}

export function getCategorySlugs() {
  return Array.from(new Set(getAllPosts(false).map((post) => slugify(post.category))));
}

export function getTagSlugs() {
  return Array.from(new Set(getAllPosts(false).flatMap((post) => post.tags.map((tag) => slugify(tag)))));
}

export function slugify(value: string) {
  const normalized = value.trim().toLowerCase();
  const mapped = slugMap[normalized];
  if (mapped) return mapped;

  const asciiSlug = normalized
    .replace(/node\.js/g, "node-js")
    .replace(/next\.js/g, "next-js")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return asciiSlug || `topic-${hashSlug(normalized)}`;
}

const slugMap: Record<string, string> = {
  "upwork 新手": "upwork-beginner",
  "codex 新手教程": "codex-beginner",
  "codex 教程": "codex-tutorial",
  "ai 工具": "ai-tools",
  "自由职业": "freelancing",
  "报价指南": "pricing-guide",
  "收款工具": "payment-tools",
  "部署教程": "deployment-guide",
  "开发基础": "dev-basics",
  "项目交付": "project-delivery",
  "作品集": "portfolio",
  "报错解决": "troubleshooting",
  "ai 项目": "ai-freelancing",
  "新手项目练习": "beginner-freelancing",
  "新手教程": "beginner-guide",
  "客户沟通": "client-communication",
  "报价": "pricing",
  "环境变量": "environment-variables",
  "跨境收款": "cross-border-payment",
  "部署失败": "deployment-failure",
  "需求分析": "requirements-analysis",
  "codex 是什么新手怎么开始": "what-is-codex-beginner",
  "codex 安装失败怎么办": "codex-install-error",
  "codex 怎么做第一个网页": "codex-first-webpage",
  "codex 和 claude code 怎么选：新手对比清单": "codex-vs-claude-code-beginner",
  "codex 生成代码后怎么审核": "codex-code-review",
  "codex 生成代码后怎么审核：交付前检查清单": "codex-code-review-checklist",
  "codex 接 upwork 小单怎么判断：风险检查清单": "codex-upwork-risk-checklist",
  "codex 部署 vercel 前检查什么：上线前清单": "codex-vercel-deploy-checklist",
  "codex 和 github 怎么配合：提交代码前检查": "codex-github-workflow-checklist",
  "适合谁": "suitable-readers",
  "不适合谁": "not-suitable",
  "这个问题是什么": "problem",
  "为什么新手会遇到": "why-beginners-face-it",
  "先判断你属于哪种情况": "diagnose-situation",
  "具体步骤": "steps",
  "可以复制的命令或模板": "copyable-commands-or-template",
  "可以复制的客户沟通模板": "copyable-client-message",
  "可以复制的追问模板": "copyable-follow-up-questions",
  "常见错误": "common-mistakes",
  "风险提醒": "risk-warning",
  "适合继续看的相关文章": "related-articles",
  "推荐工具或模板": "recommended-tools-and-templates",
  "总结": "summary",
};

function hashSlug(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

export function renderMarkdown(content: string) {
  const blocks: string[] = [];
  const lines = content.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^```(\w+)?/);
    if (fence) {
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      const id = slugify(text);
      blocks.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
        items.push(`<li>${renderInline(lines[index].replace(/^[-*]\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    const paragraph: string[] = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^```/.test(lines[index]) &&
      !/^(#{1,3})\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !/^[-*]\s+/.test(lines[index])
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
  }

  return blocks.join("\n");
}

function renderInline(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

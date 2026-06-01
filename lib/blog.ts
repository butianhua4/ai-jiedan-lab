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
  return value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-").replace(/^-|-$/g, "");
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

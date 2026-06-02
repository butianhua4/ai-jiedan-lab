import fs from "fs";
import path from "path";
import fg from "fast-glob";
import matter from "gray-matter";

export type ArticleData = Record<string, unknown> & {
  noindex?: boolean;
  publishBatch?: number;
  qualityScore?: number;
  slug?: string;
  sourceNotes?: string;
  status?: string;
  updatedAt?: string;
};

export function parseArgs() {
  const args: Record<string, string | boolean> = {};

  for (const rawArg of process.argv.slice(2)) {
    const normalized = rawArg
      .trim()
      .replace(/^[\u2013\u2014]{1,2}/, "--")
      .replace(/^-\s*-/, "--");

    if (!normalized.startsWith("--") || normalized === "--") continue;

    const [key, ...valueParts] = normalized.slice(2).split("=");
    const value = valueParts.join("=");
    args[key] = value === "" ? true : stripWrappingQuotes(value || "true");
  }

  return args;
}

export async function articleFiles() {
  return fg(["content/blog/*.{md,mdx}"], {
    absolute: true,
    cwd: process.cwd(),
  });
}

export function readArticle(file: string) {
  const absoluteFile = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  const raw = fs.readFileSync(absoluteFile, "utf8");
  const parsed = matter(raw);

  return {
    content: parsed.content,
    data: parsed.data as ArticleData,
    file: absoluteFile,
    raw,
  };
}

export function writeArticle(file: string, data: ArticleData, content: string) {
  fs.writeFileSync(file, matter.stringify(`${content.trim()}\n`, data), "utf8");
}

export function rel(file: string) {
  return path.relative(process.cwd(), file).replace(/\\/g, "/");
}

export function chineseCount(text: string) {
  return (text.match(/[\u4e00-\u9fa5]/g) || []).length;
}

function stripWrappingQuotes(value: string) {
  return value.replace(/^["'“”‘’](.*)["'“”‘’]$/, "$1");
}

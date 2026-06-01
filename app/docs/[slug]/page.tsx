import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/blog";

const docs = {
  "publishing-workflow": "publishing-workflow.md",
  "automation-plan": "automation-plan.md",
  "monetization-and-payment-plan": "monetization-and-payment-plan.md",
} as const;

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slugToTitle(slug),
    description: `${slugToTitle(slug)} 文档。`,
    robots: { index: false, follow: true },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fileName = docs[slug as keyof typeof docs];
  if (!fileName) notFound();
  const file = path.join(process.cwd(), "docs", fileName);
  if (!fs.existsSync(file)) notFound();
  const content = fs.readFileSync(file, "utf8");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
    </main>
  );
}

function slugToTitle(slug: string) {
  if (slug === "publishing-workflow") return "内容发布工作流";
  if (slug === "automation-plan") return "安全自动化计划";
  if (slug === "monetization-and-payment-plan") return "收款与变现路线";
  return "项目文档";
}

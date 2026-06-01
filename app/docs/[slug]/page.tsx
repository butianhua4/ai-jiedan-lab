import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/blog";

const docs = {
  "publishing-workflow": {
    file: "publishing-workflow.md",
    title: "内容发布工作流",
    description: "AI 接单实验室的内容发布、审核和部署流程。",
  },
  "automation-plan": {
    file: "automation-plan.md",
    title: "安全自动化计划",
    description: "OpenClaw / Codex 后期自动维护网站的安全边界。",
  },
  "monetization-and-payment-plan": {
    file: "monetization-and-payment-plan.md",
    title: "收款与变现路线",
    description: "AI 接单实验室的服务、模板、联盟和广告变现顺序。",
  },
  "platform-registration-roadmap": {
    file: "platform-registration-roadmap.md",
    title: "平台注册路线图",
    description: "说明什么时候才需要注册流量、支付、收款和 AI API 平台。",
  },
  "post-deploy-checklist": {
    file: "post-deploy-checklist.md",
    title: "上线后检查清单",
    description: "每次 Vercel 部署后的线上 SEO 和页面检查流程。",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = docs[slug as keyof typeof docs];
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    robots: { index: false, follow: true },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = docs[slug as keyof typeof docs];
  if (!doc) notFound();

  const file = path.join(process.cwd(), "docs", doc.file);
  if (!fs.existsSync(file)) notFound();

  const content = fs.readFileSync(file, "utf8");

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
    </main>
  );
}

import fs from "fs";
import path from "path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/blog";

const docs = {
  "publishing-workflow": {
    file: "publishing-workflow.md",
    title: "内容发布工作流",
    description: "AI 工具指南的内容发布、审核和部署流程。",
  },
  "seo-searchability-audit": {
    file: "seo-searchability-audit.md",
    title: "SEO 可搜索度体检报告",
    description: "当前可搜索度检查结果和 Search Console 下一步。",
  },
  "automation-plan": {
    file: "automation-plan.md",
    title: "安全自动化计划",
    description: "OpenClaw / Codex 后期自动维护网站的安全边界。",
  },
  "monetization-and-payment-plan": {
    file: "monetization-and-payment-plan.md",
    title: "收款与变现路线",
    description: "服务、模板、联盟和广告变现顺序。",
  },
  "platform-registration-roadmap": {
    file: "platform-registration-roadmap.md",
    title: "平台注册路线图",
    description: "什么时候注册统计、支付、收款和 AI API 平台。",
  },
  "manual-review-checklist": {
    file: "manual-review-checklist.md",
    title: "人工审核清单",
    description: "文章发布前必须检查的内容质量和合规项目。",
  },
  "next-public-content-expansion-plan-2026-06-12": {
    file: "next-public-content-expansion-plan-2026-06-12.md",
    title: "下一批公开内容扩展计划",
    description: "部署、Agent、RAG、办公 AI 和行业提示词的下一批人工复核候选。",
  },
  "post-deploy-checklist": {
    file: "post-deploy-checklist.md",
    title: "上线后检查清单",
    description: "每次 Vercel 部署后的线上 SEO 和页面检查流程。",
  },
  "search-console-setup": {
    file: "search-console-setup.md",
    title: "Google Search Console 提交流程",
    description: "如何验证站点并提交 sitemap。",
  },
  "search-console-status-2026-06-16": {
    file: "search-console-status-2026-06-16.md",
    title: "Search Console 状态 2026-06-16",
    description: "记录 q 页面公开可见信号、SEO warming 阶段和下一步流量检测动作。",
  },
  "tomorrow-registration-tasks": {
    file: "tomorrow-registration-tasks.md",
    title: "明日注册待办",
    description: "需要用户明天手动确认或注册的平台事项。",
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
    description: doc.description,
    robots: { follow: true, index: false },
    title: doc.title,
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

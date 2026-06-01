import Link from "next/link";

export const metadata = {
  title: "项目文档",
  description: "AI 接单实验室的内容自动化、发布流程和变现路线文档。",
};

const docs = [
  {
    title: "内容发布工作流",
    description: "说明 draft、quality check、review、confirm publish、GitHub 和 Vercel 部署流程。",
    href: "/docs/publishing-workflow",
  },
  {
    title: "安全自动化计划",
    description: "说明 OpenClaw / Codex 可以自动化什么，以及禁止自动化什么。",
    href: "/docs/automation-plan",
  },
  {
    title: "收款与变现路线",
    description: "说明先工具再文章、服务兜底、模板包、联盟链接和广告收益的顺序。",
    href: "/docs/monetization-and-payment-plan",
  },
  {
    title: "平台注册路线图",
    description: "说明什么时候才需要注册 Search Console、统计、支付、收款和 AI API 平台。",
    href: "/docs/platform-registration-roadmap",
  },
  {
    title: "人工审核清单",
    description: "说明 review 文章发布前必须人工检查的事实、原创、平台规则和风险项目。",
    href: "/docs/manual-review-checklist",
  },
  {
    title: "上线后检查清单",
    description: "说明每次 Vercel 部署后如何检查页面、sitemap、robots、canonical 和草稿泄露。",
    href: "/docs/post-deploy-checklist",
  },
  {
    title: "变现路线页面",
    description: "面向站内维护的收款平台选择表，说明不同阶段什么时候接什么平台。",
    href: "/monetization",
  },
];

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">项目文档</h1>
      <p className="mt-3 text-gray-600">这些文档用于后期维护，不是给用户承诺收益的销售页面。</p>
      <div className="mt-8 grid gap-4">
        {docs.map((doc) => (
          <Link key={doc.href} href={doc.href} className="rounded-lg border bg-white p-5 shadow-sm hover:border-brand">
            <h2 className="text-xl font-semibold">{doc.title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">{doc.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ai-jiedan-lab.vercel.app" }],
        destination: "https://ai.aporet.com/:path*",
        permanent: true,
      },
      { source: "/category/报错解决", destination: "/category/troubleshooting", permanent: true },
      { source: "/category/报价指南", destination: "/category/pricing-guide", permanent: true },
      { source: "/category/收款工具", destination: "/category/payment-tools", permanent: true },
      { source: "/category/Upwork-新手", destination: "/category/upwork-beginner", permanent: true },
      { source: "/category/部署教程", destination: "/category/deployment-guide", permanent: true },
      { source: "/category/Codex-新手教程", destination: "/category/codex-beginner", permanent: true },
      { source: "/tag/AI-接单", destination: "/tag/ai-freelancing", permanent: true },
      { source: "/tag/客户沟通", destination: "/tag/client-communication", permanent: true },
      { source: "/tag/报价", destination: "/tag/pricing", permanent: true },
      { source: "/tag/报错解决", destination: "/tag/troubleshooting", permanent: true },
      { source: "/tag/新手接单", destination: "/tag/beginner-freelancing", permanent: true },
      { source: "/tag/新手教程", destination: "/tag/beginner-guide", permanent: true },
      { source: "/tag/环境变量", destination: "/tag/environment-variables", permanent: true },
      { source: "/tag/自由职业", destination: "/tag/freelancing", permanent: true },
      { source: "/tag/跨境收款", destination: "/tag/cross-border-payment", permanent: true },
      { source: "/tag/部署失败", destination: "/tag/deployment-failure", permanent: true },
      { source: "/tag/需求分析", destination: "/tag/requirements-analysis", permanent: true },
      { source: "/blog/codex-codex-1-1", destination: "/blog/what-is-codex-beginner-start", permanent: true },
      { source: "/blog/codex-codex-1-2", destination: "/blog/codex-install-failed-beginner-fix", permanent: true },
      { source: "/blog/codex-codex-1-4", destination: "/blog/build-first-webpage-with-codex", permanent: true },
      { source: "/blog/codex-codex-1-8", destination: "/blog/codex-generated-code-review-guide", permanent: true },
      { source: "/blog/codex-codex-3-28", destination: "/blog/codex-code-review-delivery-checklist", permanent: true },
      {
        source: "/blog/codex-codex-claude-code-3-30",
        destination: "/blog/codex-vs-claude-code-beginner-checklist",
        permanent: true,
      },
      {
        source: "/blog/codex-codex-github-3-26",
        destination: "/blog/codex-github-before-commit-checklist",
        permanent: true,
      },
      {
        source: "/blog/codex-codex-upwork-3-29",
        destination: "/blog/codex-upwork-small-job-risk-checklist",
        permanent: true,
      },
      {
        source: "/blog/codex-codex-vercel-3-27",
        destination: "/blog/codex-vercel-deploy-preflight-checklist",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;

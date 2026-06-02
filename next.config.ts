import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
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
    ];
  },
};
export default nextConfig;

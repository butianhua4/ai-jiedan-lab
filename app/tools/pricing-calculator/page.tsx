import type { Metadata } from "next";
import { PricingCalculatorClient } from "@/components/PricingCalculatorClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "项目报价助手",
  description: "根据项目类型、工时、难度、加急、沟通、维护和平台抽成估算自由职业报价范围。",
  alternates: { canonical: "/tools/pricing-calculator" },
  openGraph: {
    title: "项目报价助手",
    description: "给 AI 接单新手一个谨慎的报价参考范围。",
    url: "/tools/pricing-calculator",
  },
};

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">自由职业报价参考工具</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">项目报价助手</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          用于估算 Upwork/Fiverr 小项目报价范围。结果只做参考，不保证成交，也不建议低价承诺复杂交付。
          真实报价还要结合客户预算、范围、验收标准和你的真实能力。
        </p>
      </section>
      <PricingCalculatorClient />
      <div className="mt-8">
        <ToolCTA title="报价后下一步" />
      </div>
    </main>
  );
}

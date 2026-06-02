import type { Metadata } from "next";
import { ErrorExplainerClient } from "@/components/ErrorExplainerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "Codex 报错解释器",
  description: "解释 npm、Git、Vercel、TypeScript、ESLint 等常见报错，并给出新手可执行排查步骤。",
  alternates: { canonical: "/tools/error-explainer" },
  openGraph: {
    title: "Codex 报错解释器",
    description: "把常见开发报错翻译成新手能执行的排查步骤。",
    url: "/tools/error-explainer",
  },
};

export default function ErrorPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Codex / Vercel / GitHub 排错工具</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Codex 报错解释器</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          把常见 npm、Git、Vercel、TypeScript、ESLint 报错翻译成新手能执行的排查步骤。
          第一版不调用真实 AI API，适合先整理报错和判断是否需要找人协助。
        </p>
      </section>
      <ErrorExplainerClient />
      <div className="mt-8">
        <ToolCTA title="排错后下一步" />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { ErrorExplainerClient } from "@/components/ErrorExplainerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "Codex 报错解释器",
  description: "解释 npm、Git、Vercel、TypeScript、ESLint 等常见报错，并给出新手可执行排查步骤。",
  alternates: { canonical: "/tools/error-explainer" },
  openGraph: {
    title: "Codex 报错解释器",
    description: "把常见开发报错翻译成新手能执行的步骤。",
    url: "/tools/error-explainer",
  },
};

export default function ErrorPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Codex 报错解释器</h1>
      <p className="mt-3 max-w-3xl text-gray-600">把常见 npm、Git、Vercel、TypeScript、ESLint 报错翻译成新手能执行的排查步骤。第一版不调用真实 AI API。</p>
      <ErrorExplainerClient />
      <div className="mt-8"><ToolCTA title="排错后下一步" /></div>
    </main>
  );
}

import type { Metadata } from "next";
import { PptPlannerClient } from "@/components/PptPlannerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "AI PPT 策划与排版助手",
  description: "输入主题、受众、用途和页数，生成逐页 PPT 大纲、版式建议、视觉方向、讲稿备注和可复制给 PPT 工具的完整提示词。",
  alternates: { canonical: "/tools/ppt-planner" },
  openGraph: {
    title: "AI PPT 策划与排版助手",
    description: "把 PPT 从大纲、页面结构、视觉风格到讲稿备注一次规划清楚。",
    url: "/tools/ppt-planner",
  },
};

export default function PptPlannerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-sky-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">PPT 策划 / 页面排版 / AI 提示词</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">AI PPT 策划与排版助手</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          先把主题、受众、用途和页数整理成可讲的页面结构，再生成版式、视觉建议和讲稿备注。适合拿去给 Gamma、Canva、PowerPoint Copilot
          或其他 PPT 工具继续生成，可编辑后再交付。
        </p>
      </section>
      <PptPlannerClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只做结构和版式策划，不验证事实、不保证生成工具输出的图片和数据准确。正式提交前，请人工检查数据来源、品牌规范、版权和客户要求。
      </p>
      <div className="mt-8">
        <ToolCTA title="PPT 策划后下一步" />
      </div>
    </main>
  );
}

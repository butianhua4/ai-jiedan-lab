import type { Metadata } from "next";
import { SpreadsheetCleanerClient } from "@/components/SpreadsheetCleanerClient";
import { ToolCTA } from "@/components/ToolCTA";

export const metadata: Metadata = {
  title: "AI 表格一键整理与清洗助手",
  description: "粘贴 CSV、Excel 或表格文本，自动整理空格、空值、重复行、字段类型和清洗建议，并生成可复制 CSV。",
  alternates: { canonical: "/tools/spreadsheet-cleaner" },
  openGraph: {
    title: "AI 表格一键整理与清洗助手",
    description: "把杂乱表格变成可复制、可复核、可导入的清洗 CSV 和整理建议。",
    url: "/tools/spreadsheet-cleaner",
  },
};

export default function SpreadsheetCleanerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-12">
      <section className="rounded-lg border border-gray-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-sm md:p-8">
        <p className="text-sm font-medium text-brand">Excel / CSV / 表格清洗</p>
        <h1 className="mt-2 break-words text-3xl font-bold text-ink">AI 表格一键整理与清洗助手</h1>
        <p className="mt-3 max-w-3xl text-gray-600">
          粘贴 CSV、Excel 复制内容或普通表格文本，先做空格整理、空值标记、重复行检查、字段类型判断和 CSV 输出。适合运营、销售、客服、财务助理和接单数据整理场景。
        </p>
      </section>
      <SpreadsheetCleanerClient />
      <p className="mt-8 rounded-lg border bg-white p-4 text-sm leading-6 text-gray-600">
        提醒：本工具只做格式清洗和整理建议，不替你判断财务、法律、合同或客户隐私数据是否准确。正式交付前，请人工复核原始数据、清洗规则和导出结果。
      </p>
      <div className="mt-8">
        <ToolCTA title="表格整理后下一步" />
      </div>
    </main>
  );
}

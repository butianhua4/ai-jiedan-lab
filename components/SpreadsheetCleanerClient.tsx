"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

type ParsedTable = {
  delimiter: string;
  headers: string[];
  rows: string[][];
};

const sampleTable = `客户,邮箱,订单金额,状态,负责人
 张三 , zhang@example.com , 1200 , 已付款 , 小李
李四,li@example.com,,待跟进,小王
王五, wang@example.com , 880,已付款,小李
张三,zhang@example.com,1200,已付款,小李
赵六,,320,待确认, 小王`;

export function SpreadsheetCleanerClient() {
  const [raw, setRaw] = useState(sampleTable);
  const [dedupe, setDedupe] = useState(true);
  const [fillEmpty, setFillEmpty] = useState("待补充");
  const [sortColumn, setSortColumn] = useState("");

  const result = useMemo(() => cleanTable(raw, { dedupe, fillEmpty, sortColumn }), [dedupe, fillEmpty, raw, sortColumn]);

  return (
    <>
      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="text-sm font-semibold text-ink" htmlFor="spreadsheet-input">
              粘贴 CSV、Excel 复制内容或表格文本
            </label>
            <button
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium transition hover:border-brand/50"
              onClick={() => setRaw(sampleTable)}
              type="button"
            >
              填入示例
            </button>
          </div>
          <textarea
            className="mt-3 h-80 w-full rounded-lg border border-gray-300 p-4 font-mono text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            id="spreadsheet-input"
            onChange={(event) => setRaw(event.target.value)}
            value={raw}
          />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-3 text-sm">
              <input checked={dedupe} onChange={(event) => setDedupe(event.target.checked)} type="checkbox" />
              去除完全重复行
            </label>
            <label className="block text-sm font-medium text-gray-800">
              空值填充
              <input
                className="mt-2 w-full rounded-md border border-gray-300 p-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setFillEmpty(event.target.value)}
                value={fillEmpty}
              />
            </label>
            <label className="block text-sm font-medium text-gray-800">
              按列排序
              <select
                className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
                onChange={(event) => setSortColumn(event.target.value)}
                value={sortColumn}
              >
                <option value="">不排序</option>
                {result.table.headers.map((header) => (
                  <option key={header} value={header}>
                    {header}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <aside className="min-w-0 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-ink">整理结果</h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">先用它做清洗方案和 CSV 初稿，涉及财务、法务、客户资料时必须人工复核。</p>
            </div>
            <CopyButton label="复制 CSV" text={result.cleanedCsv} />
          </div>
          <dl className="mt-5 grid gap-3 text-sm">
            <Info label="识别分隔符" value={result.table.delimiter === "\t" ? "Tab 制表符" : result.table.delimiter || "逗号"} />
            <Info label="列数 / 行数" value={`${result.table.headers.length} 列 / ${result.cleanedRows.length} 行`} />
            <Info label="空值单元格" value={`${result.emptyCells} 个`} />
            <Info label="重复行" value={`${result.duplicateRows} 行`} />
          </dl>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-ink">清洗后 CSV</h2>
              <p className="mt-1 text-sm leading-6 text-gray-700">可复制到 Excel、Google Sheets、Notion 或自动化流程。</p>
            </div>
            <CopyButton label="复制全部" text={result.cleanedCsv} />
          </div>
          <pre className="mt-4 max-h-96 overflow-auto whitespace-pre-wrap rounded-md bg-white p-4 font-mono text-sm leading-6 text-gray-800">{result.cleanedCsv}</pre>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">整理建议</h2>
            <CopyButton label="复制建议" text={result.advice.join("\n")} />
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-gray-700">
            {result.advice.map((item) => (
              <li className="rounded-md bg-gray-50 p-3" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">字段概览</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600">
                <th className="p-3">字段</th>
                <th className="p-3">空值</th>
                <th className="p-3">唯一值</th>
                <th className="p-3">类型判断</th>
                <th className="p-3">建议</th>
              </tr>
            </thead>
            <tbody>
              {result.columnStats.map((column) => (
                <tr className="border-b last:border-0" key={column.header}>
                  <td className="p-3 font-medium text-ink">{column.header}</td>
                  <td className="p-3">{column.empty}</td>
                  <td className="p-3">{column.unique}</td>
                  <td className="p-3">{column.type}</td>
                  <td className="p-3 text-gray-600">{column.suggestion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-ink">表格整理检查清单</h2>
        <ul className="mt-4 grid gap-2 text-sm leading-6 text-gray-700 md:grid-cols-2">
          {[
            "先确认列名是否表达真实业务含义，不要让同一列混合多个含义。",
            "金额、日期、邮箱、手机号等字段要单独检查格式。",
            "重复行删除前先确认是否真重复，不要误删多次购买或多次沟通记录。",
            "空值不要全部盲目填 0，未知、未填写、无结果是不同含义。",
            "导入自动化或 CRM 前，先用 5-10 行样本测试。",
            "客户隐私、财务数字和合同数据必须人工复核后再交付。",
          ].map((item) => (
            <li className="rounded-md bg-gray-50 p-3" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

function cleanTable(raw: string, options: { dedupe: boolean; fillEmpty: string; sortColumn: string }) {
  const table = parseTable(raw);
  const seen = new Set<string>();
  let duplicateRows = 0;
  let cleanedRows = table.rows
    .map((row) => normalizeRow(row, table.headers.length, options.fillEmpty))
    .filter((row) => {
      const key = row.join("\u0001").toLowerCase();
      if (!options.dedupe) return true;
      if (seen.has(key)) {
        duplicateRows += 1;
        return false;
      }
      seen.add(key);
      return true;
    });

  const sortIndex = table.headers.indexOf(options.sortColumn);
  if (sortIndex >= 0) {
    cleanedRows = [...cleanedRows].sort((a, b) => a[sortIndex].localeCompare(b[sortIndex], "zh-Hans-CN", { numeric: true }));
  }

  const emptyCells = table.rows.reduce((total, row) => total + normalizeRow(row, table.headers.length, "").filter((cell) => !cell).length, 0);
  const columnStats = table.headers.map((header, index) => {
    const values = cleanedRows.map((row) => row[index] || "");
    const empty = values.filter((value) => !value || value === options.fillEmpty).length;
    const unique = new Set(values.filter(Boolean)).size;
    const numericValues = values.filter((value) => /^-?\d+(\.\d+)?$/.test(value));
    const emailValues = values.filter((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    const type = numericValues.length >= Math.max(2, values.length / 2) ? "数字" : emailValues.length >= 1 ? "邮箱" : "文本";
    return {
      empty,
      header,
      suggestion: suggestionForColumn(header, type, empty, unique),
      type,
      unique,
    };
  });

  const cleanedCsv = toCsv([table.headers, ...cleanedRows]);
  const advice = buildAdvice(table, { cleanedRows, columnStats, duplicateRows, emptyCells });

  return { advice, cleanedCsv, cleanedRows, columnStats, duplicateRows, emptyCells, table };
}

function parseTable(raw: string): ParsedTable {
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return { delimiter: ",", headers: [], rows: [] };

  const delimiter = detectDelimiter(lines[0]);
  const rows = lines.map((line) => splitLine(line, delimiter).map((cell) => cell.trim()));
  const headers = rows[0]?.map((header, index) => header || `字段${index + 1}`) || [];
  return { delimiter, headers, rows: rows.slice(1) };
}

function detectDelimiter(line: string) {
  const candidates = ["\t", ",", ";", "|"];
  return candidates.sort((a, b) => line.split(b).length - line.split(a).length)[0] || ",";
}

function splitLine(line: string, delimiter: string) {
  if (delimiter !== ",") return line.split(delimiter);
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (const char of line) {
    if (char === '"') {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      cells.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells;
}

function normalizeRow(row: string[], length: number, fillEmpty: string) {
  return Array.from({ length }, (_, index) => {
    const value = (row[index] || "").replace(/\s+/g, " ").trim();
    return value || fillEmpty;
  });
}

function toCsv(rows: string[][]) {
  return rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
}

function escapeCsv(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

function suggestionForColumn(header: string, type: string, empty: number, unique: number) {
  if (empty > 0) return "先补齐或标注空值原因，再进入汇总。";
  if (/金额|价格|费用|收入|成本/.test(header)) return "建议转成数字格式，并检查币种与小数位。";
  if (/邮箱|email/i.test(header) || type === "邮箱") return "建议校验邮箱格式，避免导入 CRM 失败。";
  if (unique <= 3) return "适合作为筛选、分组或透视表维度。";
  return "可保留为文本字段，必要时再拆分或分类。";
}

function buildAdvice(
  table: ParsedTable,
  result: {
    cleanedRows: string[][];
    columnStats: Array<{ empty: number; header: string; type: string; unique: number }>;
    duplicateRows: number;
    emptyCells: number;
  },
) {
  const numericColumns = result.columnStats.filter((column) => column.type === "数字").map((column) => column.header);
  const dimensionColumns = result.columnStats.filter((column) => column.unique <= Math.max(5, result.cleanedRows.length / 2)).map((column) => column.header);
  return [
    `已识别 ${table.headers.length} 个字段、${result.cleanedRows.length} 行清洗后数据。`,
    result.duplicateRows ? `发现并移除 ${result.duplicateRows} 行完全重复数据；正式删除前请确认不是多次交易记录。` : "未发现完全重复行，仍建议按业务主键再复核一次。",
    result.emptyCells ? `原始表格有 ${result.emptyCells} 个空值，建议区分未知、未填写、不适用和待确认。` : "未发现明显空值，可以继续做分类或汇总。",
    numericColumns.length ? `可汇总字段：${numericColumns.join("、")}。建议生成合计、平均值、最大值和异常值检查。` : "暂未识别明显数字列，如有金额或数量字段，请统一格式后再汇总。",
    dimensionColumns.length ? `适合做筛选/透视表的维度：${dimensionColumns.slice(0, 4).join("、")}。` : "字段唯一值较多，建议先做分类映射再汇总。",
    "交付前建议导出一版原始数据、一版清洗数据、一版变更说明，方便客户复核。",
  ];
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-white p-3">
      <dt className="text-xs font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 break-words text-sm leading-6 text-gray-900">{value}</dd>
    </div>
  );
}

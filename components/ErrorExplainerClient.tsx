"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { explainError } from "@/lib/errorRules";

const environments = ["Windows", "macOS", "Linux", "Vercel", "GitHub", "Node.js", "Python"];
const actions = ["npm install", "npm run dev", "npm run build", "git push", "vercel deploy", "codex run", "其他"];
const sampleError =
  "Module not found: Can't resolve '@/components/Button'\n\n> npm run build\nType error: Cannot find module";

export function ErrorExplainerClient() {
  const [errorText, setErrorText] = useState("");
  const [environment, setEnvironment] = useState("Windows");
  const [action, setAction] = useState("npm run build");

  const result = useMemo(() => explainError({ errorText, environment, action }), [errorText, environment, action]);

  const helpPacket = useMemo(
    () =>
      [
        "报错排查记录",
        `环境：${environment}`,
        `当前操作：${action}`,
        "",
        "这个报错大概是什么意思：",
        result.meaning,
        "",
        "可能原因：",
        ...result.causes.map((item) => `- ${item}`),
        "",
        "解决步骤：",
        ...result.steps.map((item, index) => `${index + 1}. ${item}`),
        "",
        "可以复制的命令：",
        ...result.commands,
        "",
        "完整报错：",
        errorText || "请粘贴完整报错",
      ].join("\n"),
    [action, environment, errorText, result],
  );

  return (
    <>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand/50"
          onClick={() => setErrorText(sampleError)}
          type="button"
        >
          填入示例报错
        </button>
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-brand/50"
          onClick={() => setErrorText("")}
          type="button"
        >
          清空
        </button>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
        <div className="min-w-0 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold" htmlFor="error-text">
            报错内容
          </label>
          <textarea
            className="mt-2 h-72 w-full rounded-lg border border-gray-300 p-4 text-sm leading-6 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            id="error-text"
            onChange={(event) => setErrorText(event.target.value)}
            placeholder="粘贴完整报错，不要只贴最后一行。"
            value={errorText}
          />
        </div>
        <aside className="min-w-0 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-5 shadow-sm">
          <Select label="使用环境" onChange={setEnvironment} options={environments} value={environment} />
          <Select label="当前操作" onChange={setAction} options={actions} value={action} />
          <p className="rounded-md bg-white p-3 text-sm text-gray-600">
            涉及生产数据库、支付、安全权限时，不建议新手直接修改。先保存日志，再找人复核。
          </p>
        </aside>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="这个报错大概是什么意思">
          <p>{result.meaning}</p>
        </Panel>
        <Panel title="是否适合新手自己修">
          <p>{result.beginnerFit}</p>
        </Panel>
        <Panel title="可能原因">
          <List items={result.causes} />
        </Panel>
        <Panel title="解决步骤">
          <List items={result.steps} ordered />
        </Panel>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">可以复制的命令</h2>
          <CopyButton text={result.commands.join("\n")} />
        </div>
        <pre className="mt-4 overflow-auto rounded-md bg-slate-950 p-4 text-sm leading-6 text-slate-100">
          {result.commands.join("\n")}
        </pre>
      </section>

      <section className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold">仍然不行时怎么办</h2>
        <p className="mt-2 text-sm leading-6 text-gray-700">{result.whenToAskHelp}</p>
      </section>

      <section className="mt-8 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">发给别人求助前，先复制这段信息</h2>
            <p className="mt-1 text-sm text-gray-600">这样别人更容易判断，不需要来回追问。</p>
          </div>
          <CopyButton text={helpPacket} />
        </div>
        <div className="mt-4 grid gap-3 text-sm text-gray-700 md:grid-cols-3">
          <div className="rounded-md bg-gray-50 p-3">先不要删除文件或重装系统，保留完整日志。</div>
          <div className="rounded-md bg-gray-50 p-3">先在本地复现，再考虑修改线上配置。</div>
          <div className="rounded-md bg-gray-50 p-3">涉及密钥、支付、数据库时，先找人复核。</div>
        </div>
      </section>
    </>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <select
        className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-gray-700">{children}</div>
    </section>
  );
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Tag>
  );
}

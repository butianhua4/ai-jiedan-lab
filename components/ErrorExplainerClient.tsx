"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/CopyButton";
import { explainError } from "@/lib/errorRules";

const environments = ["Windows", "macOS", "Linux", "Vercel", "GitHub", "Node.js", "Python"];
const actions = ["npm install", "npm run dev", "npm run build", "git push", "vercel deploy", "codex run", "其他"];
const sampleError = "Module not found: Can't resolve '@/components/Button'\n\n> npm run build\nType error: Cannot find module";

export function ErrorExplainerClient() {
  const [errorText, setErrorText] = useState("");
  const [environment, setEnvironment] = useState("Windows");
  const [action, setAction] = useState("npm run build");
  const result = useMemo(() => explainError({ errorText, environment, action }), [errorText, environment, action]);

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-md border px-4 py-2 text-sm" onClick={() => setErrorText(sampleError)}>填入示例报错</button>
        <button className="rounded-md border px-4 py-2 text-sm" onClick={() => setErrorText("")}>清空</button>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border bg-white p-5 shadow-sm">
          <label className="text-sm font-semibold">报错内容</label>
          <textarea className="mt-2 h-72 w-full rounded-lg border p-4 text-sm leading-6" value={errorText} onChange={(event) => setErrorText(event.target.value)} placeholder="粘贴完整报错，不要只贴最后一行。" />
        </div>
        <aside className="space-y-4 rounded-lg border bg-gray-50 p-5">
          <Select label="使用环境" value={environment} onChange={setEnvironment} options={environments} />
          <Select label="当前操作" value={action} onChange={setAction} options={actions} />
          <p className="rounded-md bg-white p-3 text-sm text-gray-600">涉及生产数据库、支付、安全权限时，不建议新手直接修改。</p>
        </aside>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <Panel title="这个报错大概是什么意思"><p>{result.meaning}</p></Panel>
        <Panel title="是否适合新手自己修"><p>{result.beginnerFit}</p></Panel>
        <Panel title="可能原因"><List items={result.causes} /></Panel>
        <Panel title="解决步骤"><List items={result.steps} ordered /></Panel>
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">可以复制的命令</h2>
          <CopyButton text={result.commands.join("\n")} />
        </div>
        <pre className="mt-4 overflow-auto rounded bg-gray-100 p-4 text-sm">{result.commands.join("\n")}</pre>
      </section>

      <section className="mt-8 rounded-lg border bg-blue-50 p-5">
        <h2 className="text-lg font-semibold">仍然不行时怎么办</h2>
        <p className="mt-2 text-sm leading-6 text-gray-700">{result.whenToAskHelp}</p>
      </section>

      <section className="mt-8 rounded-lg border bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">发给别人求助前，先复制这段信息</h2>
            <p className="mt-1 text-sm text-gray-600">这样别人更容易判断，不需要来回追问。</p>
          </div>
          <CopyButton text={`环境：${environment}\n当前操作：${action}\n完整报错：\n${errorText || "请粘贴完整报错"}`} />
        </div>
      </section>
    </>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return (
    <label className="block text-sm font-medium text-gray-700">
      {label}
      <select className="mt-2 w-full rounded-md border bg-white p-2" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-lg border bg-white p-5"><h2 className="text-lg font-semibold">{title}</h2><div className="mt-3 text-sm leading-6 text-gray-700">{children}</div></section>;
}

function List({ items, ordered = false }: { items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return <Tag className={`${ordered ? "list-decimal" : "list-disc"} space-y-2 pl-5`}>{items.map((item) => <li key={item}>{item}</li>)}</Tag>;
}

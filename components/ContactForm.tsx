"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [problem, setProblem] = useState("");
  const [goal, setGoal] = useState("");
  const summary = [
    "咨询信息草稿",
    `你遇到的问题：${problem || "待填写"}`,
    `你想做什么：${goal || "待填写"}`,
    "",
    "请补充：操作系统、工具名称、完整报错、项目链接或截图、你已经尝试过的步骤。",
  ].join("\n");

  return (
    <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
      <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <label className="text-sm font-medium">姓名<input className="mt-2 w-full rounded-md border p-2" required /></label>
        <label className="text-sm font-medium">邮箱<input className="mt-2 w-full rounded-md border p-2" type="email" required /></label>
        <label className="text-sm font-medium">你遇到的问题<textarea className="mt-2 h-28 w-full rounded-md border p-2" value={problem} onChange={(event) => setProblem(event.target.value)} required /></label>
        <label className="text-sm font-medium">你想做什么<textarea className="mt-2 h-28 w-full rounded-md border p-2" value={goal} onChange={(event) => setGoal(event.target.value)} required /></label>
        <button className="w-fit rounded-md bg-brand px-5 py-2 text-white" type="submit">提交</button>
      </form>
      {submitted ? (
        <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm leading-6 text-blue-900">
          <p>表单功能即将上线，请先通过邮箱联系：hello@example.com</p>
          <pre className="mt-3 whitespace-pre-wrap rounded bg-white p-3 text-xs text-gray-700">{summary}</pre>
        </div>
      ) : null}
    </section>
  );
}

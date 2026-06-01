"use client";

import { useMemo, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [problem, setProblem] = useState("");
  const [goal, setGoal] = useState("");

  const summary = useMemo(
    () =>
      [
        "咨询信息草稿",
        `姓名：${name || "待填写"}`,
        `邮箱：${email || "待填写"}`,
        `遇到的问题：${problem || "待填写"}`,
        `想做什么：${goal || "待填写"}`,
        "",
        "建议补充：操作系统、工具名称、完整报错、项目链接或截图、已经尝试过的步骤、希望交付的结果。",
      ].join("\n"),
    [email, goal, name, problem],
  );

  return (
    <section className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium text-brand">联系表单预留</p>
        <h2 className="mt-2 text-xl font-semibold text-ink">描述你的问题</h2>
        <p className="mt-2 text-sm leading-6 text-gray-600">
          第一版不接后端提交。你可以先填写生成一份咨询草稿，再通过邮箱或后续接入的 Formspree / Resend / Supabase 发送。
        </p>
      </div>

      <form
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm font-medium text-ink">
            姓名
            <input
              className="mt-2 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="怎么称呼你"
            />
          </label>
          <label className="text-sm font-medium text-ink">
            邮箱
            <input
              className="mt-2 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="用于后续联系"
            />
          </label>
        </div>
        <label className="text-sm font-medium text-ink">
          你遇到的问题
          <textarea
            className="mt-2 h-28 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            value={problem}
            onChange={(event) => setProblem(event.target.value)}
            required
            placeholder="例如：Vercel 部署失败、GitHub 推送失败、Upwork 客户需求看不懂"
          />
        </label>
        <label className="text-sm font-medium text-ink">
          你想做什么
          <textarea
            className="mt-2 h-28 w-full rounded-md border border-gray-300 p-2 outline-none transition focus:border-brand focus:ring-2 focus:ring-blue-100"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            required
            placeholder="例如：想部署一个小网站、想检查 Proposal、想判断一个项目是否适合新手"
          />
        </label>
        <button className="w-fit rounded-md bg-brand px-5 py-2 font-semibold text-white transition hover:bg-blue-700" type="submit">
          生成咨询草稿
        </button>
      </form>

      {submitted ? (
        <div className="mt-5 rounded-md bg-blue-50 p-4 text-sm leading-6 text-blue-950">
          <p className="font-semibold">表单后端即将上线。当前请先把下面草稿保存，用联系邮箱发送。</p>
          <pre className="mt-3 whitespace-pre-wrap rounded-md bg-white p-3 text-xs leading-5 text-gray-700">{summary}</pre>
        </div>
      ) : null}
    </section>
  );
}

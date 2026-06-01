"use client";

import { useState } from "react";

export function EmailCapture() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="rounded-lg border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold">获取模板更新提醒</h2>
      <p className="mt-2 text-sm leading-6 text-gray-600">第一版不接后端，只预留邮箱订阅入口。后期可接 Resend、Formspree 或 Supabase。</p>
      <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <input className="min-w-0 flex-1 rounded-md border p-2" type="email" placeholder="你的邮箱" required />
        <button className="rounded-md bg-ink px-4 py-2 text-white" type="submit">订阅</button>
      </form>
      {submitted ? <p className="mt-3 text-sm text-green-700">表单功能即将上线，请先通过联系页邮箱获取模板。</p> : null}
    </section>
  );
}

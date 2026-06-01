"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="mt-8 rounded-lg border bg-white p-6 shadow-sm">
      <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <label className="text-sm font-medium">姓名<input className="mt-2 w-full rounded-md border p-2" required /></label>
        <label className="text-sm font-medium">邮箱<input className="mt-2 w-full rounded-md border p-2" type="email" required /></label>
        <label className="text-sm font-medium">你遇到的问题<textarea className="mt-2 h-28 w-full rounded-md border p-2" required /></label>
        <label className="text-sm font-medium">你想做什么<textarea className="mt-2 h-28 w-full rounded-md border p-2" required /></label>
        <button className="w-fit rounded-md bg-brand px-5 py-2 text-white" type="submit">提交</button>
      </form>
      {submitted ? (
        <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-900">
          表单功能即将上线，请先通过邮箱联系：hello@example.com
        </p>
      ) : null}
    </section>
  );
}

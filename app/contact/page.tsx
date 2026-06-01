import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "联系我",
  description: "联系 AI 接单实验室，咨询 Codex、Claude Code、GitHub、Vercel 配置和报错排查。",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold">联系我</h1>
      <p className="mt-4 leading-8 text-gray-700">
        第一版不接后端表单。后期如果有人需要 Codex、Claude Code、GitHub、Vercel 配置或报错排查，可以通过这里留下信息，再人工确认是否适合协助。长期目标仍是工具、模板和内容带来的被动收入，不依赖大量人工服务。
      </p>
      <ContactForm />
      <section className="mt-8 rounded-lg border bg-gray-50 p-5 text-sm leading-7 text-gray-700">
        <h2 className="text-lg font-semibold text-gray-900">收款说明预留</h2>
        <p className="mt-2">当前不接在线支付。后期若提供数字模板，优先使用 Gumroad 或 Lemon Squeezy；若是少量人工协助，可按具体情况使用 PayPal、Wise 或 Payoneer。Upwork / Fiverr 平台客户必须走平台内收款。</p>
      </section>
    </main>
  );
}

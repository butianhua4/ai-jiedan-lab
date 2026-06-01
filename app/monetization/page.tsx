import { paymentOptions } from "@/data/payment-options";

export const metadata = {
  title: "变现路线",
  description: "AI 接单实验室的被动收入路线：工具、模板、联盟链接、广告和少量人工服务。",
  robots: { index: false, follow: true },
};

export default function MonetizationPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">变现路线</h1>
      <p className="mt-3 max-w-3xl text-gray-600">
        当前不需要一次注册很多平台。先把工具和模板做出真实使用，再按阶段接入收款和流量收益。
      </p>
      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {paymentOptions.map((option) => (
          <article key={option.name} className="rounded-lg border bg-white p-5 shadow-sm">
            <p className="text-sm text-brand">{option.stage}</p>
            <h2 className="mt-2 text-xl font-semibold">{option.name}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600"><strong>适合：</strong>{option.bestFor}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600"><strong>什么时候接：</strong>{option.setupWhen}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">{option.notes}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

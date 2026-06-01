import { EmailCapture } from "@/components/EmailCapture";
import { ServiceCTA } from "@/components/ServiceCTA";
import { TemplateCard } from "@/components/TemplateCard";
import { templates } from "@/data/templates";

export const metadata = {
  title: "模板下载",
  description: "AI 接单新手可下载的 Proposal、报价、客户沟通、交付检查和部署模板。",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  const freeTemplates = templates.filter((template) => !template.isPaid);
  const paidTemplates = templates.filter((template) => template.isPaid);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">模板下载</h1>
      <p className="mt-3 max-w-3xl text-gray-600">
        第一版先提供免费模板和付费模板占位。所有模板都强调真实沟通、谨慎报价和人工审核，不用于自动群发或虚假包装。
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-blue-50 p-5">
          <p className="text-sm text-brand">Step 1</p>
          <h2 className="mt-2 text-lg font-semibold">先整理客户需求</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">用客户问题清单和需求沟通表，先把范围、素材、权限和验收标准问清楚。</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-brand">Step 2</p>
          <h2 className="mt-2 text-lg font-semibold">再报价和投标</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">用报价单和 Proposal 模板，只写自己能交付的内容，不承诺保证成交。</p>
        </div>
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-brand">Step 3</p>
          <h2 className="mt-2 text-lg font-semibold">最后检查交付</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">用交付清单、部署检查表和 GitHub 命令表，保留过程记录和交付说明。</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">免费模板</h2>
            <p className="mt-2 text-sm text-gray-600">适合先练习和自助排查，后期会根据真实反馈扩展。</p>
          </div>
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">{freeTemplates.length} 个免费</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {freeTemplates.map((template) => <TemplateCard key={template.slug} template={template} />)}
        </div>
      </section>

      <section className="mt-10 rounded-lg border bg-gray-50 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">付费模板预留</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
              现在不接支付。只有当免费模板有人下载、有人反馈需要完整 SOP 时，才会接 Gumroad 或 Lemon Squeezy。
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">{paidTemplates.length} 个规划中</span>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {paidTemplates.map((template) => <TemplateCard key={template.slug} template={template} />)}
        </div>
      </section>

      <section className="mt-10 rounded-lg border bg-white p-5">
        <h2 className="text-xl font-semibold">使用提醒</h2>
        <ul className="mt-4 grid gap-3 text-sm leading-6 text-gray-700 md:grid-cols-2">
          <li className="rounded-md bg-gray-50 p-3">模板只能帮你整理结构，不能替你判断项目是否真的能做。</li>
          <li className="rounded-md bg-gray-50 p-3">不要把模板用于自动群发 Proposal，也不要包装虚假经历。</li>
          <li className="rounded-md bg-gray-50 p-3">客户需求不清时，先追问，不要急着报价和承诺截止时间。</li>
          <li className="rounded-md bg-gray-50 p-3">涉及支付、数据库、安全权限的项目，新手不要独立硬接。</li>
        </ul>
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <EmailCapture />
        <ServiceCTA />
      </div>
    </main>
  );
}

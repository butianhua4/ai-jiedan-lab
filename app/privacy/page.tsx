import { site } from "@/data/site";

export const metadata = {
  title: "隐私政策",
  description: "AI 工具指南基础隐私政策。",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">隐私政策</h1>
      <div className="mt-6 space-y-4 leading-8 text-gray-700">
        <p>本站可能收集用户主动提交的表单信息，例如姓名、邮箱和问题描述。</p>
        <p>本站后期可能使用 Google Analytics、Google Search Console 等分析工具，用于理解页面访问和搜索表现。</p>
        <p>本站后期可能使用 Google AdSense 等第三方广告服务，相关服务可能通过 Cookie 投放个性化广告；你可以在 Google 广告设置中关闭个性化广告。</p>
        <p>本站后期可能包含 affiliate 链接。点击这些链接可能让本站获得佣金，但不会增加你的购买价格。</p>
        <p>本站不会出售用户个人信息。</p>
        <p>
          如需删除已提交的信息或就隐私问题联系我们，可发送邮件至{" "}
          <a className="font-medium text-brand hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          （备用 {site.backupEmail}），或通过{" "}
          <a className="font-medium text-brand hover:underline" href="/contact">联系页</a>
          {" "}提交请求。
        </p>
      </div>
    </main>
  );
}

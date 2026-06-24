export const metadata = {
  title: "服务条款",
  description: "AI 工具指南服务条款与使用须知。",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">服务条款</h1>
      <div className="mt-6 space-y-4 leading-8 text-gray-700">
        <p>欢迎使用 AI 工具指南。访问或使用本站，即表示你已阅读并同意以下条款。</p>
        <p>本站内容（教程、工具说明、提示词、报价与流程参考等）仅供学习和参考，不构成专业、法律或投资建议。是否采用以及如何采用，由你自行判断并承担相应风险。</p>
        <p>本站可能包含 affiliate 推广链接以及第三方广告（例如 Google AdSense）。点击这些链接或广告可能让本站获得佣金或收益，但不会增加你的购买成本。第三方广告内容由广告商负责，本站不对其作背书。</p>
        <p>本站的工具与内容按“现状”提供，不保证完全准确、及时或不中断。对于因使用本站内容或工具而造成的任何直接或间接损失，本站在法律允许范围内不承担责任。</p>
        <p>本站尊重知识产权。若你认为本站内容侵犯了你的合法权益，请通过联系页与我们沟通，我们会及时核实处理。</p>
        <p>本站保留随时更新本服务条款的权利。条款更新后，你继续访问或使用本站即视为接受更新后的条款。</p>
      </div>
    </main>
  );
}

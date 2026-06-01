export const metadata = {
  title: "免责声明",
  description: "AI 接单实验室内容仅供学习参考，不构成财务、法律或职业保证。",
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">免责声明</h1>
      <div className="mt-6 space-y-4 leading-8 text-gray-700">
        <p>本站内容仅供学习参考，不构成财务、法律、职业或平台运营保证。</p>
        <p>本站不保证任何收入结果，不承诺一定接到单，也不鼓励夸大能力、虚假案例或违反平台规则。</p>
        <p>AI 生成内容必须经过人工审核。用户需要自行判断 Upwork、Fiverr、GitHub、Vercel、Google 等平台规则。</p>
        <p>本站后期可能包含联盟链接，并可能因此获得佣金。推荐工具不代表适合所有人。</p>
      </div>
    </main>
  );
}

import Link from "next/link";

const nav = [
  ["/", "首页"],
  ["/blog", "新手教程"],
  ["/tools/proposal-generator", "Proposal 生成器"],
  ["/tools/error-explainer", "报错解释器"],
  ["/tools/pricing-calculator", "报价助手"],
  ["/tools", "工具导航"],
  ["/templates", "模板下载"],
  ["/about", "关于我"],
  ["/contact", "联系我"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-bold text-ink">AI 接单实验室</Link>
        <nav className="flex flex-wrap gap-3 text-sm text-gray-600">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-brand">{label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

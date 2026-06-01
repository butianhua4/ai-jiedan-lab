import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm text-gray-600 md:grid-cols-2">
        <p>© 2026 AI 接单实验室。内容仅供学习参考，不保证收入，不鼓励平台违规。</p>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link href="/privacy">隐私政策</Link>
          <Link href="/disclaimer">免责声明</Link>
          <Link href="/docs">文档</Link>
          <Link href="/monetization">变现路线</Link>
          <Link href="/sitemap.xml">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

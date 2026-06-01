import Link from "next/link";

export function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="flex flex-wrap gap-2 text-sm text-gray-500">
      <Link href="/">首页</Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href || ""}`} className="flex gap-2">
          <span>/</span>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

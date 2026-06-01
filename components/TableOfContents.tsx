export function TableOfContents({ headings }: { headings: string[] }) {
  if (!headings.length) return null;
  return (
    <nav className="rounded-lg border bg-gray-50 p-4 text-sm">
      <p className="font-semibold">目录</p>
      <ul className="mt-3 space-y-2">
        {headings.map((heading) => (
          <li key={heading} className="text-gray-600">{heading}</li>
        ))}
      </ul>
    </nav>
  );
}

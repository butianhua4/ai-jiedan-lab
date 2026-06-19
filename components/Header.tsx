import Link from "next/link";

const nav = [
  ["/", "Home"],
  ["/en", "English"],
  ["/q", "Questions"],
  ["/cluster/ai-tools", "AI Tools"],
  ["/cluster/vercel", "Vercel"],
  ["/cluster/github", "GitHub"],
  ["/cluster/codex", "Codex"],
  ["/deployments", "Deploy"],
  ["/prompts", "Prompts"],
  ["/tools", "Tools"],
  ["/blog", "Articles"],
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 w-full max-w-full overflow-hidden border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="shrink-0 text-lg font-bold text-ink">
          AI Tools Guide
        </Link>
        <nav className="flex w-full min-w-0 gap-x-4 overflow-x-auto whitespace-nowrap pb-1 text-sm text-gray-600 md:w-auto md:flex-wrap md:justify-end md:overflow-visible md:pb-0">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className="whitespace-nowrap hover:text-brand">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

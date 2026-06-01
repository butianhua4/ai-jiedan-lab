import Link from "next/link";

export function Card({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <Link
      href={href}
      className="group block min-w-0 max-w-full rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <h3 className="break-words text-lg font-semibold leading-7 text-ink group-hover:text-brand">{title}</h3>
      <p className="mt-2 break-words text-sm leading-6 text-gray-600">{description}</p>
    </Link>
  );
}

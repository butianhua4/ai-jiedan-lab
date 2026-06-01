import Link from "next/link";
import { tools } from "@/data/tools";

type Tool = typeof tools[number];

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/tools/${tool.slug}`} className="rounded-lg border bg-white p-5 shadow-sm hover:border-brand">
      <p className="text-xs text-brand">{tool.category}</p>
      <h3 className="mt-2 text-lg font-semibold">{tool.name}</h3>
      <p className="mt-2 text-sm leading-6 text-gray-600">{tool.description}</p>
    </Link>
  );
}

export function CategoryBadge({ label }: { label: string }) {
  return <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{label}</span>;
}

export function TagBadge({ label }: { label: string }) {
  return <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{label}</span>;
}

export function RiskBadge({ level }: { level: "low" | "medium" | "high" | string }) {
  const style = level === "high" ? "bg-red-50 text-red-700" : level === "medium" ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700";
  const text = level === "high" ? "高风险" : level === "medium" ? "中风险" : "低风险";
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${style}`}>{text}</span>;
}

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const text = difficulty === "advanced" ? "进阶" : difficulty === "intermediate" ? "中等" : "新手";
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">{text}</span>;
}

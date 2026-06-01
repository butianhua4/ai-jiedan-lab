export function AdSlot({ label = "广告位预留" }: { label?: string }) {
  return (
    <aside className="rounded-lg border border-dashed bg-gray-50 p-4 text-center text-sm text-gray-500">
      {label}：后期可接 Google AdSense 或相关工具广告。
    </aside>
  );
}

export function PricingCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-lg border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      {note ? <p className="mt-2 text-sm text-gray-600">{note}</p> : null}
    </div>
  );
}

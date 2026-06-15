import { notFound } from "next/navigation";
import { SystemLiveReport } from "@/components/SystemLiveReport";
import { getSystemStatus } from "@/lib/system-status";

export const dynamic = "force-dynamic";

export default function SystemLivePage() {
  if (process.env.NODE_ENV !== "development") notFound();

  const status = getSystemStatus();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <SystemLiveReport initialStatus={status} />
    </main>
  );
}

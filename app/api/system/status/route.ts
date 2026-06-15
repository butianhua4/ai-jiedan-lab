import { NextResponse } from "next/server";
import { getSystemStatus } from "@/lib/system-status";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "System live status is only available in development." }, { status: 404 });
  }

  return NextResponse.json(getSystemStatus());
}

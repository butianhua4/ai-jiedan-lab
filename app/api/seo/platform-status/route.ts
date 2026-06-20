import { NextResponse } from "next/server";
import { getSearchPlatformStatus } from "@/lib/search-platform-status";

export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.NODE_ENV === "production" && process.env.SYSTEM_STATUS_PUBLIC !== "1") {
    return NextResponse.json({ error: "SEO platform status is only available in development." }, { status: 404 });
  }

  return NextResponse.json(getSearchPlatformStatus());
}

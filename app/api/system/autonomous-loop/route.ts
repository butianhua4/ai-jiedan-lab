import { NextResponse } from "next/server";
import { decideAutonomousNextStep, getAutonomousLoopStatus } from "@/lib/autonomous-next-step";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Autonomous loop status is only available in development." }, { status: 404 });
  }

  const status = getAutonomousLoopStatus();
  const decision = decideAutonomousNextStep();

  return NextResponse.json({
    ...status,
    decision: {
      currentStage: decision.currentStage,
      mainBottleneck: decision.mainBottleneck,
      recommendedTask: decision.recommendedTask,
      nextThreeCandidates: decision.nextThreeCandidates,
    },
  });
}

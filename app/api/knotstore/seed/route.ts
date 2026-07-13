import { NextResponse } from "next/server";
import { seedPreviewStore } from "@/lib/knotstore/seed-store";

export const runtime = "nodejs";

/** POST /api/knotstore/seed — full-stack only (removed for static Pages export). */
export async function POST() {
  try {
    const result = seedPreviewStore();
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

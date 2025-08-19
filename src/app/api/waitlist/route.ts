import { NextRequest, NextResponse } from "next/server";
import { saveWaitlistSignup } from "@/lib/db";

function isValidEmail(email: string): boolean {
  // Simple but effective pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").trim();
    const consent = Boolean(body?.consent);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const saved = await saveWaitlistSignup(email, consent);
    return NextResponse.json({ ok: true, signup: saved }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}



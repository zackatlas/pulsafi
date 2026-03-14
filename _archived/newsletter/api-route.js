import { supabase } from "../../../lib/supabase";
import { NextResponse } from "next/server";

// POST /api/newsletter
// Body: { email }
export async function POST(request) {
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  try {
    const body = await request.json();
    const { email } = body;

    // Basic email validation
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const { error } = await supabase
      .from("newsletter_signups")
      .insert({ email: cleanEmail });

    if (error) {
      // Duplicate email
      if (error.code === "23505") {
        return NextResponse.json({ success: true, message: "You're already subscribed!" });
      }
      throw error;
    }

    return NextResponse.json({ success: true, message: "Welcome aboard!" });
  } catch (err) {
    console.error("Newsletter POST error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

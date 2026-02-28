import { supabase } from "../../../lib/supabase";
import { NextResponse } from "next/server";

// GET /api/leaderboard?type=daily&date=2026-02-28
// GET /api/leaderboard?type=alltime&limit=50
// GET /api/leaderboard?type=player&name=JohnDoe
export async function GET(request) {
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "daily";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

  try {
    if (type === "daily") {
      // Today's scores (or specific date)
      const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
      const { data, error } = await supabase
        .from("leaderboard")
        .select("display_name, score, emoji_grid, elo_rating, created_at")
        .eq("played_date", date)
        .order("score", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return NextResponse.json({ scores: data, date });
    }

    if (type === "alltime") {
      // All-time ELO rankings
      const { data, error } = await supabase
        .from("leaderboard")
        .select("display_name, elo_rating")
        .order("elo_rating", { ascending: false })
        .limit(limit);
      if (error) throw error;

      // Deduplicate — keep highest ELO per player
      const seen = new Map();
      data.forEach(row => {
        if (!seen.has(row.display_name) || row.elo_rating > seen.get(row.display_name).elo_rating) {
          seen.set(row.display_name, row);
        }
      });
      return NextResponse.json({ rankings: Array.from(seen.values()) });
    }

    if (type === "player") {
      // Single player's history
      const name = searchParams.get("name");
      if (!name) return NextResponse.json({ error: "name parameter required" }, { status: 400 });
      const { data, error } = await supabase
        .from("leaderboard")
        .select("score, played_date, elo_rating, emoji_grid")
        .eq("display_name", name)
        .order("played_date", { ascending: false })
        .limit(30);
      if (error) throw error;
      return NextResponse.json({ history: data });
    }

    return NextResponse.json({ error: "Invalid type. Use: daily, alltime, player" }, { status: 400 });
  } catch (err) {
    console.error("Leaderboard GET error:", err);
    return NextResponse.json({ error: "Failed to fetch scores" }, { status: 500 });
  }
}

// POST /api/leaderboard
// Body: { display_name, score, emoji_grid }
export async function POST(request) {
  if (!supabase) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  try {
    const body = await request.json();
    const { display_name, score, emoji_grid } = body;

    // Validation
    if (!display_name || typeof display_name !== "string" || display_name.trim().length < 1 || display_name.trim().length > 30) {
      return NextResponse.json({ error: "display_name must be 1-30 characters" }, { status: 400 });
    }
    if (typeof score !== "number" || score < 0 || score > 1000 || !Number.isInteger(score)) {
      return NextResponse.json({ error: "score must be an integer 0-1000" }, { status: 400 });
    }

    const cleanName = display_name.trim();
    const today = new Date().toISOString().split("T")[0];

    // Calculate ELO: fetch player's current rating
    const { data: existing } = await supabase
      .from("leaderboard")
      .select("elo_rating")
      .eq("display_name", cleanName)
      .order("played_date", { ascending: false })
      .limit(1);

    const currentElo = existing?.[0]?.elo_rating || 1200;

    // Simple ELO adjustment: compare score to 500 (average)
    // Good scores (>500) increase ELO, bad scores (<500) decrease
    const expected = 1 / (1 + Math.pow(10, (500 - currentElo) / 400));
    const actual = score / 1000;
    const kFactor = 32;
    const newElo = Math.round(currentElo + kFactor * (actual - expected));

    // Upsert — if they already played today, update their score (if higher)
    const { data, error } = await supabase
      .from("leaderboard")
      .upsert(
        {
          display_name: cleanName,
          score,
          played_date: today,
          elo_rating: newElo,
          emoji_grid: emoji_grid || null,
        },
        { onConflict: "display_name,played_date" }
      )
      .select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      elo: newElo,
      elo_change: newElo - currentElo,
      entry: data?.[0],
    });
  } catch (err) {
    console.error("Leaderboard POST error:", err);
    // Handle duplicate gracefully
    if (err.code === "23505") {
      return NextResponse.json({ error: "Already submitted score for today" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to submit score" }, { status: 500 });
  }
}

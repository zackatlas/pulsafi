import { supabase } from "../../../lib/supabase";

// Supabase table:
//   create table email_subscribers (
//     id bigserial primary key,
//     email text not null,
//     source text,
//     path text,
//     referrer text,
//     created_at timestamptz default now(),
//     unique(email)
//   );

export const runtime = "nodejs";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const email = (body?.email || "").toString().trim().toLowerCase();
  const source = (body?.source || "").toString().slice(0, 80) || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!supabase) {
    // Configuration not present yet — accept silently so the UX still works in dev.
    return Response.json({ ok: true });
  }

  const { error } = await supabase.from("email_subscribers").insert({
    email,
    source,
    path: body?.path || null,
    referrer: req.headers.get("referer") || null,
  });

  // Duplicate email = already subscribed; treat as success.
  if (error && error.code !== "23505") {
    return Response.json({ error: "store_failed" }, { status: 500 });
  }
  return Response.json({ ok: true });
}

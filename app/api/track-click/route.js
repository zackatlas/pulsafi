import { supabase } from "../../../lib/supabase";

// Supabase table:
//   create table affiliate_clicks (
//     id bigserial primary key,
//     offer_id text, partner text, category text, placement text,
//     path text, referrer text, user_agent text, ip_hash text,
//     created_at timestamptz default now()
//   );

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { offerId, partner, category, placement, path } = body || {};
    if (!offerId || !category) return new Response(null, { status: 204 });

    if (supabase) {
      const ip = req.headers.get("x-forwarded-for") || "";
      // Hash IP so we don't store raw addresses (privacy + GDPR-friendlier).
      const ipHash = ip ? await sha256(ip.split(",")[0].trim()) : null;
      await supabase.from("affiliate_clicks").insert({
        offer_id: offerId,
        partner: partner || null,
        category,
        placement: placement || null,
        path: path || null,
        referrer: req.headers.get("referer") || null,
        user_agent: req.headers.get("user-agent") || null,
        ip_hash: ipHash,
      });
    }
  } catch {}
  return new Response(null, { status: 204 });
}

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

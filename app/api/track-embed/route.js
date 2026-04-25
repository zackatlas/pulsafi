import { supabase } from "../../../lib/supabase";

// Supabase table:
//   create table widget_embeds (
//     id bigserial primary key,
//     host text, tool text, theme text,
//     created_at timestamptz default now()
//   );
//
// Rolled up by host so we can build a "seen-on-the-web" backlink list
// for the embed widget — every host is a candidate domain to nurture
// into a real backlink to a Pulsafi commercial page.

export const runtime = "nodejs";

function parseHost(referer) {
  if (!referer) return null;
  try { return new URL(referer).hostname; } catch { return null; }
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const host = parseHost(req.headers.get("referer")) || body?.host || null;
    if (!host) return new Response(null, { status: 204 });

    if (supabase) {
      await supabase.from("widget_embeds").insert({
        host,
        tool: (body?.tool || "").toString().slice(0, 40) || null,
        theme: (body?.theme || "").toString().slice(0, 16) || null,
      });
    }
  } catch {}
  return new Response(null, { status: 204 });
}

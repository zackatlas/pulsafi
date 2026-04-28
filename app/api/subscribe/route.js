import { supabase } from "../../../lib/supabase";
import { sendWelcomeEmail } from "../../../lib/email";

// Supabase table:
//   create table email_subscribers (
//     id bigserial primary key,
//     email text not null,
//     source text,
//     path text,
//     referrer text,
//     welcome_sent_at timestamptz,
//     welcome_email_id text,
//     created_at timestamptz default now(),
//     unique(email)
//   );
//
// Resend env vars (optional but required for the welcome email automation):
//   RESEND_API_KEY        — https://resend.com/api-keys
//   RESEND_FROM_EMAIL     — e.g. "The Pulse <hello@pulsafi.com>"
//                           (the sending domain must be verified in Resend)

export const runtime = "nodejs";

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const email = (body?.email || "").toString().trim().toLowerCase();
  const source = (body?.source || "").toString().slice(0, 80) || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  let isNewSubscriber = false;

  // 1. Persist to Supabase if available
  if (supabase) {
    const { error } = await supabase.from("email_subscribers").insert({
      email,
      source,
      path: body?.path || null,
      referrer: req.headers.get("referer") || null,
    });

    if (error) {
      // Duplicate (already subscribed) — surface success but skip welcome email.
      if (error.code === "23505") {
        return Response.json({ ok: true, alreadySubscribed: true });
      }
      // Other DB errors — fail hard so the UI can show a retry message.
      return Response.json({ error: "store_failed" }, { status: 500 });
    }
    isNewSubscriber = true;
  } else {
    // No Supabase configured — accept silently in dev so the UX still works.
    isNewSubscriber = true;
  }

  // 2. Trigger the welcome email asynchronously. We don't await it for the
  //    response, but we do wait for it to start before returning so the
  //    serverless function doesn't terminate mid-flight in production.
  let emailResult = { skipped: true, reason: "no_resend_config" };
  if (isNewSubscriber) {
    emailResult = await sendWelcomeEmail({ to: email, source });

    // Best-effort: stamp the subscriber row when the welcome email actually sends.
    if (supabase && emailResult?.ok) {
      await supabase
        .from("email_subscribers")
        .update({
          welcome_sent_at: new Date().toISOString(),
          welcome_email_id: emailResult.id || null,
        })
        .eq("email", email)
        .then(() => {}, () => {});
    }
  }

  return Response.json({
    ok: true,
    alreadySubscribed: false,
    welcomeEmail: {
      sent: emailResult?.ok === true,
      skipped: emailResult?.skipped === true,
    },
  });
}

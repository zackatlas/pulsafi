// Resend email integration. Gracefully degrades when env vars are missing
// so the subscribe flow keeps working in dev without an API key.
//
// To activate in production, set:
//   RESEND_API_KEY        — get from https://resend.com/api-keys
//   RESEND_FROM_EMAIL     — e.g. "The Pulse <hello@pulsafi.com>" (domain must be verified)

const RESEND_API = "https://api.resend.com/emails";

function isConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL);
}

export async function sendWelcomeEmail({ to, source }) {
  if (!isConfigured()) {
    return { skipped: true, reason: "no_resend_config" };
  }
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return { skipped: true, reason: "invalid_email" };
  }

  const html = welcomeEmailHtml({ source });
  const text = welcomeEmailText({ source });

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [to],
        subject: "Welcome to The Pulse — your first money brief drops Friday",
        html,
        text,
        // Tag with source so we can segment later
        tags: source ? [{ name: "source", value: source.replace(/[^\w-]/g, "_").slice(0, 50) }] : undefined,
      }),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { skipped: false, ok: false, status: res.status, error: body };
    }

    const data = await res.json().catch(() => ({}));
    return { skipped: false, ok: true, id: data.id || null };
  } catch (e) {
    return { skipped: false, ok: false, error: e.message || "fetch_failed" };
  }
}

function welcomeEmailHtml({ source }) {
  const sourceContext = source ? ` from ${source.replace(/[^a-zA-Z0-9 /-]/g, "")}` : "";
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Welcome to The Pulse</title></head>
<body style="margin:0;padding:0;background:#f7f6f3;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f7f6f3;">
    <tr><td align="center" style="padding:40px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:14px;border:1px solid #dddbd5;overflow:hidden;">

        <tr><td style="padding:36px 36px 24px 36px;border-bottom:1px solid #eeeee9;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="vertical-align:middle;padding-right:12px;">
                <div style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,#c9a227,#a37e1b);text-align:center;line-height:36px;font-family:'Playfair Display',Georgia,serif;font-weight:900;color:#0d0f13;font-size:20px;">P</div>
              </td>
              <td style="vertical-align:middle;">
                <div style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:700;color:#1a1d24;letter-spacing:-0.02em;">Pulsafi</div>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:36px 36px 12px 36px;">
          <h1 style="margin:0 0 16px 0;font-family:'Playfair Display',Georgia,serif;font-size:32px;font-weight:800;line-height:1.15;color:#1a1d24;letter-spacing:-0.02em;">
            Welcome to The Pulse.
          </h1>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#5a5f68;">
            You're in. Every Friday, you'll get a short brief from Pulsafi covering what moved in personal finance that week — mortgage rates, savings APYs, top stories, and any new tools we shipped.
          </p>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#5a5f68;">
            We don't send filler. Each issue takes about 3 minutes to read and gives you the data and a take.
          </p>
        </td></tr>

        <tr><td style="padding:0 36px 28px 36px;">
          <div style="background:rgba(163,126,27,0.08);border:1px solid rgba(163,126,27,0.2);border-left:4px solid #a37e1b;border-radius:10px;padding:18px 22px;">
            <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#a37e1b;font-weight:700;margin-bottom:6px;">While you wait</div>
            <div style="font-size:14px;line-height:1.6;color:#1a1d24;">
              Try the most-shared tools on the site:
              <br /><br />
              → <a href="https://www.pulsafi.com/tools/mortgage-calculator" style="color:#a37e1b;text-decoration:none;font-weight:600;">Mortgage Calculator</a> — share your scenario via permalink<br />
              → <a href="https://www.pulsafi.com/tools/fire-calculator" style="color:#a37e1b;text-decoration:none;font-weight:600;">FIRE Calculator</a> — see your years to financial independence<br />
              → <a href="https://www.pulsafi.com/answers" style="color:#a37e1b;text-decoration:none;font-weight:600;">Money Answers</a> — quick takes on common questions
            </div>
          </div>
        </td></tr>

        <tr><td style="padding:0 36px 32px 36px;">
          <p style="margin:0;font-size:14px;line-height:1.6;color:#7a7f88;">
            Questions, feedback, or a topic you'd like covered? Just reply to this email — it goes straight to me.
          </p>
        </td></tr>

        <tr><td style="padding:24px 36px;background:#f7f6f3;border-top:1px solid #eeeee9;">
          <p style="margin:0 0 8px 0;font-size:12px;line-height:1.5;color:#9a9fa8;text-align:center;">
            You're receiving this because you subscribed${sourceContext}.<br />
            <a href="https://www.pulsafi.com/unsubscribe" style="color:#7a7f88;text-decoration:underline;">Unsubscribe</a> · <a href="https://www.pulsafi.com" style="color:#7a7f88;text-decoration:underline;">Pulsafi.com</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

function welcomeEmailText({ source }) {
  return `Welcome to The Pulse.

You're in. Every Friday, you'll get a short brief from Pulsafi covering what moved in personal finance that week — mortgage rates, savings APYs, top stories, and any new tools we shipped.

We don't send filler. Each issue takes about 3 minutes to read and gives you the data and a take.

While you wait, try the most-shared tools on the site:
- Mortgage Calculator: https://www.pulsafi.com/tools/mortgage-calculator
- FIRE Calculator: https://www.pulsafi.com/tools/fire-calculator
- Money Answers: https://www.pulsafi.com/answers

Questions, feedback, or a topic you'd like covered? Just reply.

—
You're receiving this because you subscribed${source ? ` from ${source}` : ""}.
Unsubscribe: https://www.pulsafi.com/unsubscribe
`;
}

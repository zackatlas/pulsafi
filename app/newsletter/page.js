"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PAST_ISSUES = [
  { title: "Why Your Savings Account Is Secretly Losing Money", date: "Coming soon", issue: "Preview" },
  { title: "3 Tax Moves to Make Before April (Most People Miss #2)", date: "Coming soon", issue: "Preview" },
  { title: "The One Ratio That Predicts Financial Success", date: "Coming soon", issue: "Preview" },
];

const TESTIMONIALS = [
  { quote: "Every issue breaks down one financial concept you can actually act on — no fluff, no sales pitches.", name: "What to expect", role: "Actionable insights" },
  { quote: "Real numbers, real math, real strategies. The kind of financial content that respects your intelligence.", name: "Our promise", role: "Evidence-based advice" },
  { quote: "Written for people who want to build wealth, not people who already have it. Beginner-friendly, expert-approved.", name: "Our philosophy", role: "Finance for everyone" },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Header />

      {/* Hero */}
      <section style={{
        padding: "80px 24px 60px", textAlign: "center",
        background: "var(--hero-gradient)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Free Weekly Newsletter
        </div>
        <h1 style={{
          fontSize: "clamp(30px, 5vw, 48px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 600, marginLeft: "auto", marginRight: "auto",
        }}>
          Smart Money Moves,<br />Every <span style={{ color: "var(--accent)" }}>Sunday</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, margin: "18px auto 0", maxWidth: 480, lineHeight: 1.7 }}>
          Get actionable finance tips, market analysis, and wealth-building strategies delivered to your inbox every week. Free forever.
        </p>

        {/* Email Signup */}
        <div style={{ maxWidth: 460, margin: "32px auto 0" }}>
          {!submitted ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email" placeholder="your@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 220, background: "var(--bg-card)", border: "1px solid var(--border-input)", borderRadius: 10,
                  padding: "14px 18px", color: "var(--text-primary)", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none",
                }}
              />
              <button onClick={() => { if (email) { window.open(`https://magic.beehiiv.com/v1/af6bb24a-372c-43f4-af26-f7968d10bc1e?email=${encodeURIComponent(email)}`, '_blank'); setSubmitted(true); }}} style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", border: "none", borderRadius: 10,
                padding: "14px 32px", color: "var(--bg-main)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 15, cursor: "pointer", whiteSpace: "nowrap",
              }}>Subscribe Free</button>
            </div>
          ) : (
            <div style={{
              background: "var(--accent-bg)", border: "1px solid var(--accent-border)",
              borderRadius: 12, padding: "20px 24px",
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>✓</div>
              <div style={{ color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600 }}>You're in!</div>
              <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>Check your inbox for a confirmation email.</div>
            </div>
          )}
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 12 }}>No spam. Unsubscribe anytime. We respect your privacy.</div>
        </div>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* What You Get */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 700, textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>
            What You Get Every Sunday
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: "📊", title: "Market Pulse", desc: "A 2-minute summary of what happened in markets this week and what it means for your money." },
              { icon: "🧠", title: "Deep Dive", desc: "One in-depth breakdown of a financial concept, strategy, or tool — explained simply." },
              { icon: "⚡", title: "Action Step", desc: "One concrete thing you can do this week to improve your financial position. No theory, just action." },
              { icon: "🔧", title: "Tool of the Week", desc: "A Pulsafi calculator walkthrough or external resource to help you make better decisions." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "24px 22px",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 700, textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>
            What Readers Say
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "24px 22px",
              }}>
                <div style={{ fontSize: 20, color: "var(--accent)", marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>{t.quote}</p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Issues */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 700, textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>
            Upcoming Topics
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PAST_ISSUES.map((issue, i) => (
              <a key={i} href="#" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border-card)", padding: "18px 22px",
                textDecoration: "none", color: "inherit", transition: "border-color 0.2s",
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = "rgba(201,162,39,0.3)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 12, color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontWeight: 500, minWidth: 32 }}>{issue.issue}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{issue.title}</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-faint)", whiteSpace: "nowrap", marginLeft: 12 }}>{issue.date}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 48,
          padding: "32px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
        }}>
          {[
            { num: "Weekly", label: "Frequency" },
            { num: "Free", label: "Forever" },
            { num: "1-Click", label: "Unsubscribe" },
            { num: "0", label: "Spam" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

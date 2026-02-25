"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PAST_ISSUES = [
  { title: "Why Your Savings Account Is Secretly Losing Money", date: "Feb 18, 2026", issue: "#47" },
  { title: "3 Tax Moves to Make Before April (Most People Miss #2)", date: "Feb 11, 2026", issue: "#46" },
  { title: "The One Ratio That Predicts Financial Success", date: "Feb 4, 2026", issue: "#45" },
  { title: "How I'd Invest $10K Today If I Were Starting Over", date: "Jan 28, 2026", issue: "#44" },
  { title: "The Hidden Cost of Renting vs. Buying in 2026", date: "Jan 21, 2026", issue: "#43" },
  { title: "Recession-Proof Your Finances in 5 Steps", date: "Jan 14, 2026", issue: "#42" },
];

const TESTIMONIALS = [
  { quote: "The only finance newsletter I actually open every week. Zero fluff, all signal.", name: "Sarah K.", role: "Software Engineer" },
  { quote: "Helped me build a real investment strategy instead of just guessing. My portfolio is up 23% since I started following along.", name: "Marcus T.", role: "Small Business Owner" },
  { quote: "I went from knowing nothing about FIRE to having a real retirement plan in about 3 months of reading.", name: "Jamie L.", role: "Teacher" },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f13", color: "#e8e9eb", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Header />

      {/* Hero */}
      <section style={{
        padding: "80px 24px 60px", textAlign: "center",
        background: "radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.08) 0%, transparent 60%)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#c9a227", marginBottom: 14, fontWeight: 600 }}>
          Free Weekly Newsletter
        </div>
        <h1 style={{
          fontSize: "clamp(30px, 5vw, 48px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 600, marginLeft: "auto", marginRight: "auto",
        }}>
          Smart Money Moves,<br />Every <span style={{ color: "#c9a227" }}>Sunday</span>
        </h1>
        <p style={{ color: "#6a6f78", fontSize: 16, margin: "18px auto 0", maxWidth: 480, lineHeight: 1.7 }}>
          Join 12,000+ readers getting actionable finance tips, market analysis, and wealth-building strategies delivered to their inbox. Free forever.
        </p>

        {/* Email Signup */}
        <div style={{ maxWidth: 460, margin: "32px auto 0" }}>
          {!submitted ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email" placeholder="your@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 220, background: "#14161c", border: "1px solid #2a2d35", borderRadius: 10,
                  padding: "14px 18px", color: "#e8e9eb", fontSize: 15, fontFamily: "'DM Sans', sans-serif", outline: "none",
                }}
              />
              <button onClick={() => email && setSubmitted(true)} style={{
                background: "linear-gradient(135deg, #c9a227, #a37e1b)", border: "none", borderRadius: 10,
                padding: "14px 32px", color: "#0d0f13", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 15, cursor: "pointer", whiteSpace: "nowrap",
              }}>Subscribe Free</button>
            </div>
          ) : (
            <div style={{
              background: "rgba(201,162,39,0.1)", border: "1px solid rgba(201,162,39,0.3)",
              borderRadius: 12, padding: "20px 24px",
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>✓</div>
              <div style={{ color: "#c9a227", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600 }}>You're in!</div>
              <div style={{ color: "#8a8f98", fontSize: 13, marginTop: 4 }}>Check your inbox for a confirmation email.</div>
            </div>
          )}
          <div style={{ fontSize: 12, color: "#4a4f58", marginTop: 12 }}>No spam. Unsubscribe anytime. We respect your privacy.</div>
        </div>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* What You Get */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 700, textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>
            What You Get Every Week
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { icon: "📊", title: "Market Pulse", desc: "A 2-minute summary of what happened in markets this week and what it means for your money." },
              { icon: "🧠", title: "Deep Dive", desc: "One in-depth breakdown of a financial concept, strategy, or tool — explained simply." },
              { icon: "⚡", title: "Action Step", desc: "One concrete thing you can do this week to improve your financial position. No theory, just action." },
              { icon: "🔧", title: "Tool of the Week", desc: "A Pulsafi calculator walkthrough or external resource to help you make better decisions." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#14161c", borderRadius: 14, border: "1px solid #1e2028", padding: "24px 22px",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: "#e8e9eb", margin: "0 0 8px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "#6a6f78", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
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
                background: "#14161c", borderRadius: 14, border: "1px solid #1e2028", padding: "24px 22px",
              }}>
                <div style={{ fontSize: 20, color: "#c9a227", marginBottom: 12 }}>"</div>
                <p style={{ fontSize: 14, color: "#b8bcc4", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>{t.quote}</p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e9eb" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#6a6f78" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Past Issues */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 700, textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>
            Recent Issues
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PAST_ISSUES.map((issue, i) => (
              <a key={i} href="#" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#14161c", borderRadius: 12, border: "1px solid #1e2028", padding: "18px 22px",
                textDecoration: "none", color: "inherit", transition: "border-color 0.2s",
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = "rgba(201,162,39,0.3)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "#1e2028"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 12, color: "#c9a227", fontFamily: "'DM Mono', monospace", fontWeight: 500, minWidth: 32 }}>{issue.issue}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#e8e9eb" }}>{issue.title}</span>
                </div>
                <span style={{ fontSize: 12, color: "#4a4f58", whiteSpace: "nowrap", marginLeft: 12 }}>{issue.date}</span>
              </a>
            ))}
          </div>
        </section>

        {/* Stats */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap", marginBottom: 48,
          padding: "32px 0", borderTop: "1px solid #1a1d24", borderBottom: "1px solid #1a1d24",
        }}>
          {[
            { num: "12,000+", label: "Subscribers" },
            { num: "47", label: "Issues Sent" },
            { num: "62%", label: "Open Rate" },
            { num: "4.9★", label: "Reader Rating" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#c9a227", fontFamily: "'DM Mono', monospace" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "#6a6f78", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

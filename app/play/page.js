"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PlayPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <section style={{ padding: "80px 24px 60px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Games & Quizzes</div>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Learn Money by Playing
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Shareable games that make you smarter about money. Play daily, challenge friends, climb the ranks.
        </p>
      </section>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Daily Pulse — Primary Game */}
        <a href="/pulse" style={{
          display: "block", textDecoration: "none", color: "inherit",
          background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
          padding: "32px 28px", marginBottom: 16, position: "relative", overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)", transition: "border-color 0.2s, transform 0.2s",
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          {/* Glow */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, var(--accent)15, transparent 70%)" }} />

          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{
                  display: "inline-block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em",
                  fontWeight: 700, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: "#0d0f13", padding: "4px 10px", borderRadius: 6, marginBottom: 12,
                }}>Daily Game</div>
                <h2 style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px" }}>
                  The Daily Pulse
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 380 }}>
                  Guess 5 financial numbers — prices, rates, salaries, stats. Score out of 1,000 and share your results. New questions every day.
                </p>
              </div>
              <div style={{ fontSize: 56, lineHeight: 1 }}>📊</div>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-faint)" }}>
                <span>⏱️</span> 2 min
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-faint)" }}>
                <span>🔄</span> Resets daily
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-faint)" }}>
                <span>🏆</span> Shareable score
              </div>
            </div>

            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: 20,
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, color: "#0d0f13",
            }}>
              Play Today's Pulse →
            </div>
          </div>
        </a>

        {/* Money Personality Quiz */}
        <a href="/quiz" style={{
          display: "block", textDecoration: "none", color: "inherit",
          background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
          padding: "28px 28px", marginBottom: 16, transition: "border-color 0.2s, transform 0.2s",
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{
                display: "inline-block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em",
                fontWeight: 700, color: "var(--accent)", background: "var(--accent-bg)",
                padding: "4px 10px", borderRadius: 6, marginBottom: 12, border: "1px solid var(--accent-border)",
              }}>Quiz</div>
              <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 8px" }}>
                Money Personality Quiz
              </h2>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, margin: 0, maxWidth: 380 }}>
                Are you a Builder, Guardian, Explorer, or Strategist? 7 questions to discover your financial personality type.
              </p>
            </div>
            <div style={{ fontSize: 48, lineHeight: 1 }}>💰</div>
          </div>

          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-faint)" }}>
              <span>⏱️</span> 2 min
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-faint)" }}>
              <span>🧠</span> 4 personality types
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-faint)" }}>
              <span>📤</span> Shareable
            </div>
          </div>
        </a>

        {/* Coming Soon teaser */}
        <div style={{
          background: "var(--bg-card)", borderRadius: 20, border: "1px dashed var(--border-card)",
          padding: "24px 28px", textAlign: "center", opacity: 0.6,
        }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>🎮</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>More games coming soon</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>
            Budget Battle, Savings Streak, and group money challenges. Subscribe to get notified.
          </p>
          <a href="/newsletter" style={{
            display: "inline-block", marginTop: 14, padding: "8px 20px", borderRadius: 8,
            background: "var(--accent-bg)", border: "1px solid var(--accent-border)",
            color: "var(--accent)", fontSize: 12, fontWeight: 600, textDecoration: "none",
          }}>Get Notified →</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

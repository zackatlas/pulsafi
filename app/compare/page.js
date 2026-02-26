"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const GUIDES = [
  {
    title: "Best High-Yield Savings Accounts",
    desc: "Compare APYs, fees, and features across Marcus, Ally, Wealthfront, SoFi, and Discover. Find the best place to park your cash.",
    href: "/compare/best-savings-accounts",
    icon: "🏦",
    tag: "Savings",
    updated: "Feb 2026",
  },
  {
    title: "Best Online Brokerages",
    desc: "Compare Fidelity, Schwab, Robinhood, Webull, and Vanguard. All $0 commissions — the real differences are in tools, account types, and experience.",
    href: "/compare/best-brokerages",
    icon: "📊",
    tag: "Investing",
    updated: "Feb 2026",
  },
];

export default function ComparePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <section style={{ padding: "80px 24px 60px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Comparison Guides</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Find the Best Financial Products
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Side-by-side comparisons of savings accounts, brokerages, and more. Honest reviews, no bias — updated monthly.
        </p>
      </section>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {GUIDES.map((g, i) => (
            <a key={i} href={g.href} style={{
              display: "flex", gap: 20, alignItems: "flex-start",
              background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
              padding: "28px 24px", textDecoration: "none", color: "inherit", transition: "border-color 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ fontSize: 36, lineHeight: 1 }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <h2 style={{ fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{g.title}</h2>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, color: "var(--accent)", background: "var(--accent-bg)", padding: "3px 8px", borderRadius: 6 }}>{g.tag}</span>
                  <span style={{ fontSize: 10, color: "var(--text-faint)" }}>Updated {g.updated}</span>
                </div>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{g.desc}</p>
              </div>
              <div style={{ color: "var(--accent)", fontSize: 18, alignSelf: "center" }}>→</div>
            </a>
          ))}
        </div>

        {/* Coming Soon */}
        <div style={{ marginTop: 32, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>More comparisons coming soon</div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
            Best credit cards, best robo-advisors, best crypto exchanges, and more. Subscribe to our newsletter to get notified.
          </p>
          <a href="/newsletter" style={{
            display: "inline-block", marginTop: 16, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            borderRadius: 10, padding: "10px 24px", color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: 13, textDecoration: "none",
          }}>Subscribe to The Pulse →</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

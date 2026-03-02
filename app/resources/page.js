"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const KIT_SUBSCRIBE_URL = "https://the-pulse-5.kit.com/37d1c84aa2";

const CATEGORIES = ["All", "Investing", "Budgeting", "Retirement", "Debt", "Real Estate"];

const ARTICLES = [
  { id: 1, title: "The Power of Compound Interest: Why Starting Early Changes Everything", excerpt: "A 25-year-old investing $300/month will have more at 65 than a 35-year-old investing $600/month.", category: "Investing", readTime: "6 min", date: "Feb 20, 2026", featured: true, slug: "compound-interest-power-starting-early" },
  { id: 2, title: "The 50/30/20 Budget Rule Is Wrong — Here's What Actually Works", excerpt: "The most popular budgeting rule oversimplifies your finances. We break down a framework that adapts.", category: "Budgeting", readTime: "8 min", date: "Feb 17, 2026", featured: true, slug: "50-30-20-budget-rule-wrong" },
  { id: 3, title: "FIRE Movement 2026: What's Changed and What Still Works", excerpt: "With higher rates and shifting markets, the FIRE playbook needs an update. Here's the modern approach.", category: "Retirement", readTime: "10 min", date: "Feb 14, 2026", featured: false, slug: "fire-movement-2026" },
  { id: 4, title: "Debt Avalanche vs. Debt Snowball: Which Saves More?", excerpt: "We ran the numbers on both strategies across 50 different debt scenarios. The winner isn't always what you'd expect.", category: "Debt", readTime: "7 min", date: "Feb 10, 2026", featured: false, slug: "debt-avalanche-vs-snowball" },
  { id: 5, title: "How Much House Can You Actually Afford?", excerpt: "Lenders will approve far more than you should spend. Here's a realistic framework based on your full picture.", category: "Real Estate", readTime: "9 min", date: "Feb 7, 2026", featured: false, slug: "how-much-house-can-you-afford" },
  { id: 6, title: "Index Funds vs. ETFs in 2026: The Differences That Matter", excerpt: "Tax efficiency, expense ratios, and trading flexibility — we cut through the noise.", category: "Investing", readTime: "5 min", date: "Feb 3, 2026", featured: false, slug: "index-funds-vs-etfs-2026" },
  { id: 7, title: "The Real Cost of Waiting: How One Year Costs You $100K+", excerpt: "Procrastination is the most expensive habit in personal finance. Here's exactly how much each year costs.", category: "Investing", readTime: "6 min", date: "Jan 30, 2026", featured: false, slug: "real-cost-of-waiting" },
  { id: 8, title: "Emergency Fund on a Paycheck-to-Paycheck Budget", excerpt: "Saving feels impossible when every dollar is spoken for. 7 concrete strategies real people have used.", category: "Budgeting", readTime: "7 min", date: "Jan 27, 2026", featured: false, slug: "emergency-fund-paycheck-to-paycheck" },
  { id: 9, title: "401(k) vs. Roth IRA vs. Taxable Brokerage", excerpt: "The order you fund your accounts matters more than which stocks you pick. Here's the optimal sequence.", category: "Retirement", readTime: "8 min", date: "Jan 23, 2026", featured: false, slug: "401k-roth-ira-taxable-brokerage" },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory);
  const featured = ARTICLES.filter(a => a.featured);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      {/* Hero */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Articles · Newsletter</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Resources to Build <span style={{ color: "var(--accent)" }}>Real Wealth</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, margin: "0 auto", maxWidth: 520, lineHeight: 1.7 }}>
          In-depth articles and a weekly newsletter. Everything you need, nothing you don't.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ═══ NEWSLETTER — Kit CTA ═══ */}
        <div style={{
          marginBottom: 44, borderRadius: 22, overflow: "hidden", position: "relative",
          background: "linear-gradient(135deg, var(--bg-card) 0%, var(--bg-input) 100%)",
          border: "1px solid var(--border-card)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}>
          <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "var(--accent)", opacity: 0.03 }} />
          <div style={{ position: "absolute", bottom: -40, left: -30, width: 140, height: 140, borderRadius: "50%", background: "var(--accent)", opacity: 0.03 }} />

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32, padding: "36px 32px", position: "relative" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 24 }}>📬</span>
                <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700 }}>Weekly Newsletter</span>
              </div>
              <h3 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px", lineHeight: 1.2 }}>The Pulse Report</h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
                One email per week. The best financial insights, new tool releases, and market context. No spam, unsubscribe anytime.
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                {["Free forever", "Weekly delivery", "Unsubscribe anytime"].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-faint)" }}>
                    <span style={{ color: "#2ecc71", fontWeight: 700 }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: "1 1 260px" }}>
              <div style={{
                background: "var(--bg-main)", borderRadius: 14, padding: "24px 20px",
                border: "1px solid var(--border-input)", textAlign: "center",
              }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>✉️</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>Join The Pulse</div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5, margin: "0 0 16px" }}>
                  Subscribe on Kit — takes 10 seconds.
                </p>
                <a href={KIT_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer" style={{
                  display: "block", width: "100%", padding: "12px", borderRadius: 10, border: "none",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: "#0d0f13", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none", textAlign: "center", transition: "opacity 0.2s", boxSizing: "border-box",
                }}>Subscribe Free →</a>
                <div style={{ fontSize: 10, color: "var(--text-faint)", textAlign: "center", marginTop: 10 }}>Free forever · No spam · Unsubscribe anytime</div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ ARTICLES ═══ */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>📚</div>
            <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>Articles</h2>
            <div style={{ height: 1, flex: 1, background: "var(--border-card)" }} />
          </div>

          {/* Featured */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14, marginBottom: 24 }}>
            {featured.map(a => (
              <a key={a.id} href={`/resources/${a.slug}`} style={{
                display: "block", textDecoration: "none", color: "inherit",
                background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
                padding: "28px 24px", transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, color: "var(--accent)", background: "var(--accent-bg)", padding: "3px 8px", borderRadius: 5 }}>{a.category}</span>
                  <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{a.readTime}</span>
                  <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700, color: "#2ecc71", background: "rgba(46,204,113,0.1)", padding: "3px 8px", borderRadius: 5 }}>Featured</span>
                </div>
                <h3 style={{ fontSize: 19, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 14px" }}>{a.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{a.date}</span>
                  <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600 }}>Read →</span>
                </div>
              </a>
            ))}
          </div>

          {/* Filter */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                background: activeCategory === cat ? "var(--accent-bg)" : "var(--bg-card)",
                border: activeCategory === cat ? "1px solid var(--accent-border)" : "1px solid var(--border-card)",
                borderRadius: 8, padding: "7px 14px", cursor: "pointer",
                color: activeCategory === cat ? "var(--accent)" : "var(--text-secondary)",
                fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.2s",
              }}>{cat}</button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {filtered.map(a => (
              <a key={a.id} href={`/resources/${a.slug}`} style={{
                display: "block", textDecoration: "none", color: "inherit",
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "20px 18px", transition: "all 0.2s",
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, color: "var(--accent)", background: "var(--accent-bg)", padding: "3px 8px", borderRadius: 5 }}>{a.category}</span>
                  <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{a.readTime}</span>
                </div>
                <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", lineHeight: 1.35 }}>{a.title}</h3>
                <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55, margin: "0 0 10px" }}>{a.excerpt}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{a.date}</span>
                  <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>Read →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

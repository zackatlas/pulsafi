"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ACCOUNTS = [
  {
    name: "Marcus by Goldman Sachs",
    apy: "4.40",
    minDeposit: "$0",
    monthlyFee: "$0",
    fdic: true,
    highlight: "No minimums, backed by Goldman Sachs",
    pros: ["No minimum deposit or balance", "No monthly fees", "Strong brand reputation", "Easy-to-use app"],
    cons: ["No checking account integration", "No ATM card", "Rates can change"],
    bestFor: "Beginners who want a simple, no-fee savings account from a trusted institution.",
    color: "#3498db",
  },
  {
    name: "Ally Bank",
    apy: "4.20",
    minDeposit: "$0",
    monthlyFee: "$0",
    fdic: true,
    highlight: "Full online banking ecosystem with checking, savings, and investing",
    pros: ["Complete banking ecosystem", "Checking + savings + investing", "No minimum balance", "24/7 customer support"],
    cons: ["No physical branches", "Slightly lower APY than competitors", "No cash deposits"],
    bestFor: "People who want an all-in-one online bank for checking, savings, and investing.",
    color: "#9b59b6",
  },
  {
    name: "Wealthfront Cash Account",
    apy: "4.50",
    minDeposit: "$0",
    monthlyFee: "$0",
    fdic: true,
    highlight: "Highest APY with automatic portfolio management available",
    pros: ["Among the highest APYs", "FDIC insured up to $8M via partner banks", "Autopilot investing features", "No fees whatsoever"],
    cons: ["Not a traditional bank", "Limited banking features", "Must link external checking account"],
    bestFor: "Tech-savvy savers who also want automated investing on the same platform.",
    color: "#9b59b6",
  },
  {
    name: "SoFi Checking & Savings",
    apy: "4.00",
    minDeposit: "$0",
    monthlyFee: "$0",
    fdic: true,
    highlight: "High APY requires direct deposit — great if you use it as your main bank",
    pros: ["Combined checking + savings", "No account fees", "Up to $2M FDIC insurance", "Fee-free ATM network"],
    cons: ["Best APY requires direct deposit", "Customer service can be slow", "Newer bank"],
    bestFor: "People willing to set up direct deposit for a competitive APY with checking included.",
    color: "#2ecc71",
  },
  {
    name: "Discover Online Savings",
    apy: "4.10",
    minDeposit: "$0",
    monthlyFee: "$0",
    fdic: true,
    highlight: "Trusted brand with no fees and strong customer service",
    pros: ["No minimum balance", "No fees", "Excellent customer service", "Established brand"],
    cons: ["APY not the highest", "No physical branches", "Limited account types"],
    bestFor: "People who value strong customer service and brand trust over maximizing APY.",
    color: "#e67e22",
  },
];

export default function BestSavingsPage() {
  const [expandedIdx, setExpandedIdx] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Best High-Yield Savings Accounts in 2026",
        "description": "Compare the best high-yield savings accounts with the highest APYs, no fees, and FDIC insurance.",
        "url": "https://pulsafi.com/resources/best-savings-accounts",
        "publisher": { "@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Comparison Guide</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Best High-Yield Savings Accounts (2026)
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          We compared APYs, fees, minimums, and features across the top online savings accounts. Here are our picks — updated monthly.
        </p>
        <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--bg-card)", borderRadius: 8, padding: "8px 14px", border: "1px solid var(--border-card)" }}>
          <span style={{ fontSize: 12, color: "var(--text-faint)" }}>Last updated: February 2026</span>
        </div>
      </section>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Quick Comparison Table */}
        <div style={{ background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)", overflow: "hidden", marginBottom: 32 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--bg-input)" }}>
                  {["Account", "APY", "Min. Deposit", "Monthly Fee", "FDIC"].map(h => (
                    <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ACCOUNTS.map((a, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--border-input)", cursor: "pointer", transition: "background 0.15s" }}
                    onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                    onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                    onMouseOut={e => e.currentTarget.style.background = "transparent"}
                  >
                    <td style={{ padding: "14px 18px", fontWeight: 600 }}>{a.name}</td>
                    <td style={{ padding: "14px 18px", color: "var(--accent)", fontFamily: "'Inter', monospace", fontWeight: 700 }}>{a.apy}%</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>{a.minDeposit}</td>
                    <td style={{ padding: "14px 18px", color: "#2ecc71", fontWeight: 600 }}>{a.monthlyFee}</td>
                    <td style={{ padding: "14px 18px" }}>{a.fdic ? "✓" : "✗"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {ACCOUNTS.map((a, i) => (
            <div key={i} style={{
              background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)",
              padding: "28px 26px", position: "relative", overflow: "hidden",
            }}>
              {i === 0 && (
                <div style={{
                  position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  borderRadius: 20, padding: "4px 12px", fontSize: 10, fontWeight: 700, color: "#0d0f13",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                }}>Editor's Pick</div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>#{i + 1}</div>
                  <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{a.name}</h2>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "6px 0 0", lineHeight: 1.5 }}>{a.highlight}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>{a.apy}%</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase" }}>APY</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                {[
                  { label: "Min. Deposit", value: a.minDeposit },
                  { label: "Monthly Fee", value: a.monthlyFee },
                  { label: "FDIC Insured", value: a.fdic ? "Yes" : "No" },
                ].map((s, j) => (
                  <div key={j} style={{ background: "var(--bg-input)", borderRadius: 8, padding: "8px 14px", border: "1px solid var(--border-input)" }}>
                    <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{s.label}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Pros & Cons */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#2ecc71", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Pros</div>
                  {a.pros.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", marginBottom: 6, lineHeight: 1.4 }}>
                      <span style={{ color: "#2ecc71", flexShrink: 0 }}>✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e74c3c", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Cons</div>
                  {a.cons.map((c, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", marginBottom: 6, lineHeight: 1.4 }}>
                      <span style={{ color: "#e74c3c", flexShrink: 0 }}>✗</span> {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Best For */}
              <div style={{
                background: "var(--bg-input)", borderRadius: 10, padding: "14px 18px", borderLeft: `3px solid ${a.color}`,
                fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6,
              }}>
                <strong style={{ color: "var(--text-primary)" }}>Best for:</strong> {a.bestFor}
              </div>

              {/* CTA - placeholder for affiliate link */}
              <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{
                  display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  borderRadius: 10, padding: "12px 24px", color: "#0d0f13", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>Visit {a.name} →</span>
                <span style={{ fontSize: 11, color: "var(--text-faint)" }}>Affiliate link — see disclosure below</span>
              </div>
            </div>
          ))}
        </div>

        {/* How We Pick */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            How We Evaluate Savings Accounts
          </h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              We evaluate high-yield savings accounts based on five factors: APY (the interest rate you earn), fees (monthly maintenance fees, minimum balance fees), accessibility (how easy it is to deposit and withdraw), FDIC insurance coverage, and the overall user experience including app quality and customer service.
            </p>
            <p style={{ marginBottom: 16 }}>
              APY matters, but it's not the only factor. A savings account with a slightly lower APY but zero fees, no minimums, and excellent app design is often a better choice than one with the highest rate but hidden requirements. We also prioritize accounts that don't require jumping through hoops — like maintaining a specific balance or setting up direct deposit — unless the benefit clearly justifies it.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>What is a high-yield savings account?</h3>
            <p style={{ marginBottom: 16 }}>
              A high-yield savings account is a savings account that pays significantly more interest than a traditional bank account. While the national average savings rate hovers around 0.45% APY, high-yield accounts at online banks typically offer 4-5% APY — roughly 10x more. The tradeoff is that most high-yield accounts are at online-only banks without physical branches.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>How much can you earn?</h3>
            <p style={{ marginBottom: 16 }}>
              On a $10,000 balance at 4.40% APY, you'd earn approximately $440 per year in interest — compared to just $45 at a traditional bank paying 0.45%. Over 5 years, that's over $2,000 in extra interest. Use our compound interest calculator to see exactly how your savings would grow at different rates.
            </p>
          </div>

          {/* Disclosure */}
          <div style={{
            marginTop: 32, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "20px 22px", fontSize: 12, color: "var(--text-faint)", lineHeight: 1.7,
          }}>
            <strong style={{ color: "var(--text-muted)" }}>Affiliate Disclosure:</strong> Some links on this page are affiliate links. If you open an account through our links, Pulsafi may earn a commission at no extra cost to you. This does not affect our rankings or reviews — our editorial team evaluates each account independently. All APYs are accurate as of the date listed and are subject to change. FDIC insurance is subject to limits and conditions.
          </div>

          {/* Related */}
          <div style={{ marginTop: 20, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/tools/compound-interest-calculator" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>📈 Compound Interest Calculator — See how your savings grow →</a>
              <a href="/resources/best-brokerages" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>📊 Best Online Brokerages for Beginners →</a>
              <a href="/learn/emergency-fund-how-much" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>📚 How Much Should You Have in an Emergency Fund? →</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

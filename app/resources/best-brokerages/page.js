"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const BROKERAGES = [
  {
    name: "Fidelity",
    commissions: "$0",
    minDeposit: "$0",
    accountTypes: "Individual, Roth IRA, Traditional IRA, 401(k), HSA, 529",
    highlight: "The best all-around brokerage. Zero-fee index funds, excellent research, and every account type.",
    pros: ["Zero-expense-ratio index funds (FZROX, FZILX)", "No account minimums", "Excellent research and tools", "Fractional shares starting at $1", "Strong retirement account options"],
    cons: ["Trading platform less intuitive than some competitors", "Mutual fund selection can be overwhelming", "No crypto trading"],
    bestFor: "Long-term investors who want the broadest range of account types and the lowest possible costs.",
    color: "#2ecc71",
  },
  {
    name: "Charles Schwab",
    commissions: "$0",
    minDeposit: "$0",
    accountTypes: "Individual, Roth IRA, Traditional IRA, 401(k), Trust",
    highlight: "Physical branches + online banking + brokerage. Best for people who want everything in one place.",
    pros: ["300+ physical branches for in-person help", "Excellent checking account with ATM fee rebates", "Strong research and education", "24/7 customer service", "Schwab Intelligent Portfolios (robo-advisor)"],
    cons: ["No fractional shares for all stocks", "Platform can feel dated", "No crypto"],
    bestFor: "Investors who value in-person support and want banking + investing under one roof.",
    color: "#3498db",
  },
  {
    name: "Robinhood",
    commissions: "$0",
    minDeposit: "$0",
    accountTypes: "Individual, Roth IRA, Traditional IRA",
    highlight: "Sleekest app, crypto trading included, 1% IRA match on transfers.",
    pros: ["Best mobile app experience", "Crypto trading built in", "1% match on IRA contributions", "Fractional shares", "Cash card with round-ups"],
    cons: ["Limited research tools", "No mutual funds", "Controversial past (2021 GME halt)", "Limited account types"],
    bestFor: "Beginners and mobile-first investors who want stocks + crypto in one simple app.",
    color: "#2ecc71",
  },
  {
    name: "Webull",
    commissions: "$0",
    minDeposit: "$0",
    accountTypes: "Individual, Roth IRA, Traditional IRA",
    highlight: "Advanced charting and technical analysis tools for free. Paper trading to practice.",
    pros: ["Advanced charting for free", "Paper trading simulator", "Extended trading hours (4am-8pm)", "No minimum deposit", "Good for active traders"],
    cons: ["Limited educational content", "No mutual funds or bonds", "Customer service can be slow", "Newer platform"],
    bestFor: "Active traders who want advanced charts and extended-hours trading without paying for a premium platform.",
    color: "#e67e22",
  },
  {
    name: "Vanguard",
    commissions: "$0",
    minDeposit: "$0",
    accountTypes: "Individual, Roth IRA, Traditional IRA, 401(k), 529, Trust",
    highlight: "The gold standard for index fund investing. Owned by its fund shareholders — lowest costs in the industry.",
    pros: ["Pioneered index fund investing", "Owned by fund shareholders (unique structure)", "Lowest expense ratios on many funds", "Strong retirement account options", "Trusted name in long-term investing"],
    cons: ["Dated user interface", "Slow to add features", "No fractional shares on most stocks", "$1,000-$3,000 minimums on some funds"],
    bestFor: "Buy-and-hold index fund investors who prioritize the lowest possible fund costs above all else.",
    color: "#e74c3c",
  },
];

export default function BestBrokeragesPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        "headline": "Best Online Brokerages for Beginners in 2026",
        "description": "Compare the best online brokerages with $0 commissions, no minimums, and powerful tools for new investors.",
        "url": "https://pulsafi.com/resources/best-brokerages",
        "publisher": { "@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Comparison Guide</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Best Online Brokerages (2026)
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          We compared commissions, account types, tools, and ease of use across the top online brokerages. All picks have $0 stock trading commissions.
        </p>
        <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "var(--bg-card)", borderRadius: 8, padding: "8px 14px", border: "1px solid var(--border-card)" }}>
          <span style={{ fontSize: 12, color: "var(--text-faint)" }}>Last updated: February 2026</span>
        </div>
      </section>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Quick Table */}
        <div style={{ background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)", overflow: "hidden", marginBottom: 32 }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--bg-input)" }}>
                  {["Brokerage", "Commissions", "Min. Deposit", "Best For"].map(h => (
                    <th key={h} style={{ padding: "14px 18px", textAlign: "left", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BROKERAGES.map((b, i) => (
                  <tr key={i} style={{ borderTop: "1px solid var(--border-input)" }}>
                    <td style={{ padding: "14px 18px", fontWeight: 600 }}>{b.name}</td>
                    <td style={{ padding: "14px 18px", color: "#2ecc71", fontWeight: 600 }}>{b.commissions}</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-secondary)" }}>{b.minDeposit}</td>
                    <td style={{ padding: "14px 18px", color: "var(--text-muted)", fontSize: 13 }}>{b.bestFor.split('.')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {BROKERAGES.map((b, i) => (
            <div key={i} style={{
              background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)",
              padding: "28px 26px", position: "relative",
            }}>
              {i === 0 && (
                <div style={{
                  position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  borderRadius: 20, padding: "4px 12px", fontSize: 10, fontWeight: 700, color: "#0d0f13",
                  textTransform: "uppercase", letterSpacing: "0.06em",
                }}>Top Pick</div>
              )}

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>#{i + 1}</div>
                <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px" }}>{b.name}</h2>
                <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>{b.highlight}</p>
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ background: "var(--bg-input)", borderRadius: 8, padding: "8px 14px", border: "1px solid var(--border-input)" }}>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase" }}>Commissions</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#2ecc71", marginTop: 2 }}>{b.commissions}</div>
                </div>
                <div style={{ background: "var(--bg-input)", borderRadius: 8, padding: "8px 14px", border: "1px solid var(--border-input)" }}>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase" }}>Minimum</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>{b.minDeposit}</div>
                </div>
                <div style={{ background: "var(--bg-input)", borderRadius: 8, padding: "8px 14px", border: "1px solid var(--border-input)", flex: 1 }}>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase" }}>Account Types</div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{b.accountTypes}</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#2ecc71", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Pros</div>
                  {b.pros.map((p, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", marginBottom: 6, lineHeight: 1.4 }}>
                      <span style={{ color: "#2ecc71", flexShrink: 0 }}>✓</span> {p}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e74c3c", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Cons</div>
                  {b.cons.map((c, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "var(--text-secondary)", marginBottom: 6, lineHeight: 1.4 }}>
                      <span style={{ color: "#e74c3c", flexShrink: 0 }}>✗</span> {c}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                background: "var(--bg-input)", borderRadius: 10, padding: "14px 18px", borderLeft: `3px solid ${b.color}`,
                fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6,
              }}>
                <strong style={{ color: "var(--text-primary)" }}>Best for:</strong> {b.bestFor}
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{
                  display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  borderRadius: 10, padding: "12px 24px", color: "#0d0f13", fontWeight: 700, fontSize: 14,
                  cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>Open {b.name} Account →</span>
                <span style={{ fontSize: 11, color: "var(--text-faint)" }}>Affiliate link</span>
              </div>
            </div>
          ))}
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            How to Choose an Online Brokerage
          </h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              In 2026, all major online brokerages offer $0 stock and ETF commissions — so price alone isn't a differentiator. The real differences are in account types, investment selection, tools, and user experience. Here's what to consider when choosing.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>What do you want to invest in?</h3>
            <p style={{ marginBottom: 16 }}>
              If you want index funds and ETFs, any of these brokerages will work. If you want crypto, you'll need Robinhood or a separate crypto exchange. If you want access to mutual funds, skip Robinhood and Webull. If you want zero-expense-ratio index funds, Fidelity is the only option.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>What account types do you need?</h3>
            <p style={{ marginBottom: 16 }}>
              If you just need a taxable brokerage and an IRA, any platform works. But if you need a 401(k), HSA, 529, or trust account, your options narrow to Fidelity, Schwab, and Vanguard. Think about where you want to be in 5-10 years, not just today.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Do you value simplicity or power?</h3>
            <p style={{ marginBottom: 16 }}>
              Robinhood has the best beginner experience — clean, simple, and mobile-first. Webull offers powerful charting for active traders. Fidelity and Schwab are feature-rich but can feel overwhelming at first. Vanguard is deliberately minimal because they want you to buy and hold, not day-trade.
            </p>
          </div>

          {/* Disclosure */}
          <div style={{
            marginTop: 32, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "20px 22px", fontSize: 12, color: "var(--text-faint)", lineHeight: 1.7,
          }}>
            <strong style={{ color: "var(--text-muted)" }}>Affiliate Disclosure:</strong> Some links on this page are affiliate links. If you open an account through our links, Pulsafi may earn a commission at no extra cost to you. This does not affect our rankings — our editorial team evaluates each brokerage independently. All information is accurate as of the date listed and subject to change.
          </div>

          <div style={{ marginTop: 20, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a href="/tools/compound-interest-calculator" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>📈 Compound Interest Calculator →</a>
              <a href="/resources/best-savings-accounts" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>🏦 Best High-Yield Savings Accounts →</a>
              <a href="/learn/sp500-index-investing-beginners" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>📚 S&P 500 Index Investing for Beginners →</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

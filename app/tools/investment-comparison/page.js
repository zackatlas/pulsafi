"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const pct = (n) => `${n.toFixed(1)}%`;

function Input({ label, value, onChange, prefix, suffix, sublabel }) {
  const [display, setDisplay] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const shown = focused ? display : String(value);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}{sublabel && <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.6, marginLeft: 6, fontSize: 11 }}>{sublabel}</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)", padding: "10px 14px", gap: 6 }}>
        {prefix && <span style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 500 }}>{prefix}</span>}
        <input type="text" inputMode="decimal" value={shown}
          onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
          onChange={(e) => { const raw = e.target.value; if (raw === "" || raw === "-" || raw === ".") { setDisplay(raw); onChange(0); return; } const num = Number(raw); if (!isNaN(num)) { setDisplay(raw); onChange(num); } }}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 16, fontFamily: "'DM Mono', monospace", fontWeight: 500, width: "100%" }}
        />
        {suffix && <span style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{suffix}</span>}
      </div>
    </div>
  );
}

function ResultCard({ label, value, accent, sub }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
      borderRadius: 14, padding: "20px 22px", flex: 1, minWidth: 160,
      border: accent ? "none" : "1px solid var(--border-input)",
    }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

const DEFAULT_SCENARIOS = [
  { name: "High-Yield Savings", rate: 4.5, color: "var(--text-muted)", desc: "FDIC insured, no risk" },
  { name: "Bond Index Fund", rate: 5.5, color: "#3498db", desc: "Low risk, steady income" },
  { name: "S&P 500 Index", rate: 10, color: "var(--accent)", desc: "Historical avg since 1926" },
  { name: "Growth Stocks", rate: 13, color: "#2ecc71", desc: "Higher risk, higher reward" },
  { name: "Real Estate (REITs)", rate: 8, color: "#e67e22", desc: "Diversified real estate" },
];

export default function InvestmentComparisonPage() {
  const [amount, setAmount] = useState(50000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(3);
  const [showReal, setShowReal] = useState(false);

  const results = DEFAULT_SCENARIOS.map(s => {
    const effectiveRate = showReal ? s.rate - inflation : s.rate;
    const r = effectiveRate / 100 / 12;
    const n = years * 12;
    const fv = amount * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
    const totalContributed = amount + monthly * 12 * years;
    return { ...s, value: fv, totalContributed, gain: fv - totalContributed, effectiveRate };
  });

  const maxVal = Math.max(...results.map(r => r.value));
  const best = results.reduce((a, b) => a.value > b.value ? a : b);

  // Year by year for best scenario
  const yearData = [];
  const bestR = (showReal ? best.rate - inflation : best.rate) / 100 / 12;
  for (let y = 0; y <= years; y++) {
    const m = y * 12;
    const fv = amount * Math.pow(1 + bestR, m) + monthly * ((Math.pow(1 + bestR, m) - 1) / bestR);
    const contributed = amount + monthly * 12 * y;
    yearData.push({ year: y, value: fv, contributed });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Investment Comparison Tool",
        "url": "https://pulsafi.com/tools/investment-comparison",
        "description": "Compare investment returns across asset classes. See how savings, bonds, stocks, and real estate grow over time with monthly contributions.",
        "applicationCategory": "FinanceApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Investment Comparison Tool</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Compare how the same money grows across different asset classes — from savings accounts to index funds to growth stocks. Add monthly contributions and adjust for inflation.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Starting Amount" value={amount} onChange={setAmount} prefix="$" />
            <Input label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" />
            <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" />
            <Input label="Inflation Rate" value={inflation} onChange={setInflation} suffix="%" sublabel="for real returns" />
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[{ id: false, label: "Nominal Returns" }, { id: true, label: "Real Returns (inflation-adjusted)" }].map(f => (
              <button key={String(f.id)} onClick={() => setShowReal(f.id)} style={{
                flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 600, textAlign: "center",
                background: showReal === f.id ? "var(--accent-bg)" : "var(--bg-input)",
                border: showReal === f.id ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                color: showReal === f.id ? "var(--accent)" : "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
              }}>{f.label}</button>
            ))}
          </div>

          {/* Comparison Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {results.map((r, i) => (
              <div key={i} style={{ background: "var(--bg-input)", borderRadius: 14, padding: "18px 20px", border: "1px solid var(--border-input)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 15, color: "var(--text-primary)", fontWeight: 600 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.desc} — {r.effectiveRate.toFixed(1)}%{showReal ? " real" : ""} annual</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: r.color, fontFamily: "'DM Mono', monospace" }}>{fmt(r.value)}</div>
                    <div style={{ fontSize: 11, color: r.gain >= 0 ? "#2ecc71" : "#e74c3c" }}>+{fmt(r.gain)} gain</div>
                  </div>
                </div>
                <div style={{ height: 8, background: "var(--bg-main)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(r.value / maxVal) * 100}%`, background: r.color, borderRadius: 4, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Difference Highlight */}
          <div style={{ marginTop: 20, background: "var(--accent-bg)", borderRadius: 14, border: "1px solid var(--accent-border)", padding: "18px 22px", textAlign: "center" }}>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>Difference between best and worst</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>
              {fmt(Math.max(...results.map(r => r.value)) - Math.min(...results.map(r => r.value)))}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>on the same {fmt(results[0].totalContributed)} invested</div>
          </div>

          {/* Growth Chart for best scenario */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>{best.name} Growth Over Time</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
              {yearData.map((d, i) => {
                const contribH = (d.contributed / best.value) * 100;
                const gainH = ((d.value - d.contributed) / best.value) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ width: "100%", maxWidth: 22, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 100 }}>
                      <div style={{ height: `${gainH}%`, background: "var(--accent)", borderRadius: "3px 3px 0 0", minHeight: d.value - d.contributed > 0 ? 1 : 0 }} />
                      <div style={{ height: `${contribH}%`, background: "var(--accent-dark)", minHeight: 1 }} />
                    </div>
                    {i % Math.max(1, Math.ceil(yearData.length / 12)) === 0 && <div style={{ fontSize: 8, color: "var(--text-faint)" }}>Y{d.year}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Why Asset Allocation Matters</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>The difference between a savings account and an index fund over 20+ years is staggering. $50,000 at 4.5% becomes $120,000. The same amount at 10% becomes $336,000. That's not a small difference — it's the difference between a comfortable retirement and struggling.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Risk and return are linked</h3>
            <p style={{ marginBottom: 16 }}>Higher returns come with higher volatility. The S&P 500 averages 10% annually, but individual years range from -37% (2008) to +31% (2019). The key is time horizon — over 20+ years, the stock market has never lost money. But over 1-2 years, it can lose significantly.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Don't forget inflation</h3>
            <p style={{ marginBottom: 16 }}>Toggle "Real Returns" above to see the inflation-adjusted picture. A 4.5% savings account with 3% inflation gives you just 1.5% real growth. That's why keeping all your money in savings — while safe — means you're barely keeping up with the rising cost of living.</p>
          </div>
          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: "📈" },
                { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
                { name: "Crypto Planner", href: "/tools/crypto-planner", icon: "₿" },
              ].map((t, i) => (
                <a key={i} href={t.href} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)", textDecoration: "none", color: "var(--text-secondary)", fontSize: 13 }}>{t.icon} {t.name}</a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

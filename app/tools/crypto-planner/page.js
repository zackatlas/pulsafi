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

export default function CryptoPlannerPage() {
  const [investment, setInvestment] = useState(5000);
  const [monthlyDCA, setMonthlyDCA] = useState(200);
  const [years, setYears] = useState(5);
  const [scenario, setScenario] = useState("moderate");
  const [allocation, setAllocation] = useState({ btc: 60, eth: 30, alt: 10 });

  const scenarios = {
    conservative: { label: "Conservative", annual: 15, color: "#3498db", desc: "Slow adoption, heavy regulation, steady institutional interest" },
    moderate: { label: "Moderate", annual: 30, color: "var(--accent)", desc: "Continued mainstream adoption, ETF inflows, growing utility" },
    aggressive: { label: "Aggressive", annual: 55, color: "#2ecc71", desc: "Mass adoption, nation-state reserves, DeFi explosion" },
    bear: { label: "Bear Case", annual: -5, color: "#e74c3c", desc: "Regulatory crackdowns, exchange failures, declining interest" },
  };

  const results = Object.entries(scenarios).map(([key, s]) => {
    const r = s.annual / 100 / 12;
    const n = years * 12;
    let value = Math.abs(r) < 0.0001 ? investment + monthlyDCA * n : investment * Math.pow(1 + r, n) + monthlyDCA * ((Math.pow(1 + r, n) - 1) / r);
    const totalInvested = investment + monthlyDCA * n;
    return { key, ...s, value: Math.max(0, value), totalInvested, gain: Math.max(-totalInvested, value - totalInvested) };
  });

  const active = results.find(r => r.key === scenario);
  const maxVal = Math.max(...results.map(r => r.value));

  // DCA comparison vs lump sum
  const lumpR = scenarios[scenario].annual / 100 / 12;
  const lumpN = years * 12;
  const totalDCA = investment + monthlyDCA * lumpN;
  const lumpValue = totalDCA * Math.pow(1 + lumpR, lumpN);

  // Year-by-year
  const yearData = [];
  for (let y = 0; y <= years; y++) {
    const m = y * 12;
    const r = scenarios[scenario].annual / 100 / 12;
    let fv = Math.abs(r) < 0.0001 ? investment + monthlyDCA * m : investment * Math.pow(1 + r, m) + monthlyDCA * ((Math.pow(1 + r, m) - 1) / r);
    yearData.push({ year: y, value: Math.max(0, fv), invested: investment + monthlyDCA * 12 * y });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Crypto Investment Planner",
        "url": "https://pulsafi.com/tools/crypto-planner",
        "description": "Free crypto investment planner. Model DCA outcomes across bull and bear scenarios for Bitcoin, Ethereum, and altcoins.",
        "applicationCategory": "FinanceApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Crypto Investment Planner</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Model cryptocurrency investment outcomes with dollar-cost averaging. Compare conservative, moderate, aggressive, and bear case scenarios.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Initial Investment" value={investment} onChange={setInvestment} prefix="$" />
            <Input label="Monthly DCA Amount" value={monthlyDCA} onChange={setMonthlyDCA} prefix="$" sublabel="Dollar-cost average" />
            <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" />
          </div>

          {/* Scenario Selector */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Market Scenario</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {results.map(s => (
                <button key={s.key} onClick={() => setScenario(s.key)} style={{
                  padding: "14px 12px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                  background: scenario === s.key ? "var(--accent-bg)" : "var(--bg-input)",
                  border: scenario === s.key ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: scenario === s.key ? s.color : "var(--text-primary)" }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace", margin: "4px 0" }}>
                    {s.annual > 0 ? "+" : ""}{s.annual}%
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>per year</div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ResultCard label="Portfolio Value" value={fmt(active.value)} accent sub={`${scenarios[scenario].label} scenario`} />
            <ResultCard label="Total Invested" value={fmt(active.totalInvested)} />
            <ResultCard label={active.gain >= 0 ? "Total Gain" : "Total Loss"} value={fmt(Math.abs(active.gain))}
              sub={(active.gain >= 0 ? "+" : "-") + pct(Math.abs(active.gain / active.totalInvested) * 100) + " return"} />
          </div>

          {/* All Scenarios */}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {results.map((r, i) => (
              <div key={i} style={{
                background: "var(--bg-input)", borderRadius: 12, padding: "16px 18px",
                border: scenario === r.key ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: r.color }}>{r.label}</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 10 }}>{r.desc}</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: r.color, fontFamily: "'DM Mono', monospace" }}>{fmt(r.value)}</div>
                    <div style={{ fontSize: 11, color: r.gain >= 0 ? "#2ecc71" : "#e74c3c" }}>
                      {r.gain >= 0 ? "+" : ""}{fmt(r.gain)}
                    </div>
                  </div>
                </div>
                <div style={{ height: 6, background: "var(--bg-main)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(r.value / maxVal) * 100}%`, background: r.color, borderRadius: 3, transition: "width 0.6s" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Allocation Breakdown */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Suggested Portfolio Allocation</div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "Bitcoin (BTC)", pct: allocation.btc, color: "#f7931a" },
                { label: "Ethereum (ETH)", pct: allocation.eth, color: "#627eea" },
                { label: "Altcoins", pct: allocation.alt, color: "#2ecc71" },
              ].map((a, i) => (
                <div key={i} style={{ flex: a.pct, background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)", padding: "14px 16px", borderTop: `3px solid ${a.color}` }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: a.color, fontFamily: "'DM Mono', monospace" }}>{a.pct}%</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{a.label}</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace", marginTop: 6 }}>{fmt(active.value * a.pct / 100)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Chart */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Portfolio Growth ({scenarios[scenario].label})</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 120 }}>
              {yearData.map((d, i) => {
                const maxH = Math.max(...yearData.map(y => y.value));
                const investH = (d.invested / maxH) * 100;
                const gainH = Math.max(0, ((d.value - d.invested) / maxH) * 100);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ width: "100%", maxWidth: 24, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 100 }}>
                      <div style={{ height: `${gainH}%`, background: scenarios[scenario].color, borderRadius: "3px 3px 0 0", minHeight: gainH > 0 ? 1 : 0 }} />
                      <div style={{ height: `${investH}%`, background: "var(--text-faint)", opacity: 0.3, minHeight: 1 }} />
                    </div>
                    <div style={{ fontSize: 9, color: "var(--text-faint)" }}>Y{d.year}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Warning */}
          <div style={{
            marginTop: 24, padding: "18px 22px", background: "var(--bg-input)", borderRadius: 14,
            borderLeft: "4px solid #e74c3c", fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7,
          }}>
            <strong style={{ color: "#e74c3c" }}>⚠️ Risk Warning:</strong> Cryptocurrency is extremely volatile and speculative. These projections are illustrative only — actual returns could be dramatically different. Bitcoin has historically experienced 80%+ drawdowns during bear markets. Never invest more than you can afford to lose entirely. This is not financial advice.
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Crypto Investing: What You Need to Know</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>Cryptocurrency offers the potential for outsized returns, but comes with extreme volatility and risk. This calculator helps you model different scenarios so you can make informed decisions about how much to allocate and what outcomes to expect.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Why dollar-cost averaging matters for crypto</h3>
            <p style={{ marginBottom: 16 }}>DCA means investing a fixed amount at regular intervals regardless of price. In crypto, this is especially important because the volatility is extreme. Buying $200/month means you automatically buy more when prices are low and less when prices are high. Over time, this typically results in a lower average cost per coin than trying to time the market.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>How much crypto should you own?</h3>
            <p style={{ marginBottom: 16 }}>Most financial advisors suggest limiting crypto to 1-5% of your total portfolio. More aggressive investors might go up to 10-20%. The right amount depends on your risk tolerance, time horizon, and whether you can emotionally handle watching your investment drop 50-80% without panic selling — because that will happen at some point.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Bitcoin vs Ethereum vs altcoins</h3>
            <p style={{ marginBottom: 16 }}>Bitcoin is the most established cryptocurrency with the largest market cap and most institutional adoption. Ethereum powers smart contracts and DeFi. Altcoins offer higher potential upside but also much higher risk — many go to zero. A common allocation is 60% BTC, 30% ETH, 10% altcoins, which is what we show above.</p>
          </div>
          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Investment Comparison", href: "/tools/investment-comparison", icon: "📊" },
                { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: "📈" },
                { name: "Best Brokerages", href: "/resources/best-brokerages", icon: "🏦" },
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

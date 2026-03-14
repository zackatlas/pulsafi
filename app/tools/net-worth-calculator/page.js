"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const fmt = (n) => {
  const abs = Math.abs(n);
  if (abs >= 1e6) return `${n < 0 ? "-" : ""}$${(abs / 1e6).toFixed(1)}M`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
};

// Median net worth by age bracket (Fed Survey of Consumer Finances 2022, inflation-adjusted estimates)
const BENCHMARKS = [
  { age: 22, p25: -5000, p50: 9000, p75: 45000, p90: 120000 },
  { age: 25, p25: 2000, p50: 20000, p75: 75000, p90: 180000 },
  { age: 30, p25: 10000, p50: 49000, p75: 170000, p90: 380000 },
  { age: 35, p25: 18000, p50: 85000, p75: 290000, p90: 600000 },
  { age: 40, p25: 25000, p50: 135000, p75: 450000, p90: 900000 },
  { age: 45, p25: 30000, p50: 185000, p75: 580000, p90: 1200000 },
  { age: 50, p25: 38000, p50: 250000, p75: 750000, p90: 1600000 },
  { age: 55, p25: 45000, p50: 310000, p75: 900000, p90: 2000000 },
  { age: 60, p25: 50000, p50: 364000, p75: 1050000, p90: 2500000 },
  { age: 65, p25: 52000, p50: 410000, p75: 1200000, p90: 2800000 },
  { age: 70, p25: 48000, p50: 380000, p75: 1100000, p90: 2600000 },
];

function getBenchmark(age) {
  if (age <= 22) return BENCHMARKS[0];
  if (age >= 70) return BENCHMARKS[BENCHMARKS.length - 1];
  for (let i = 0; i < BENCHMARKS.length - 1; i++) {
    if (age >= BENCHMARKS[i].age && age < BENCHMARKS[i + 1].age) {
      const t = (age - BENCHMARKS[i].age) / (BENCHMARKS[i + 1].age - BENCHMARKS[i].age);
      return {
        age,
        p25: Math.round(BENCHMARKS[i].p25 + t * (BENCHMARKS[i + 1].p25 - BENCHMARKS[i].p25)),
        p50: Math.round(BENCHMARKS[i].p50 + t * (BENCHMARKS[i + 1].p50 - BENCHMARKS[i].p50)),
        p75: Math.round(BENCHMARKS[i].p75 + t * (BENCHMARKS[i + 1].p75 - BENCHMARKS[i].p75)),
        p90: Math.round(BENCHMARKS[i].p90 + t * (BENCHMARKS[i + 1].p90 - BENCHMARKS[i].p90)),
      };
    }
  }
  return BENCHMARKS[5];
}

function getPercentile(netWorth, bench) {
  if (netWorth >= bench.p90) return Math.min(99, 90 + ((netWorth - bench.p90) / (bench.p90 * 0.5)) * 9);
  if (netWorth >= bench.p75) return 75 + ((netWorth - bench.p75) / (bench.p90 - bench.p75)) * 15;
  if (netWorth >= bench.p50) return 50 + ((netWorth - bench.p50) / (bench.p75 - bench.p50)) * 25;
  if (netWorth >= bench.p25) return 25 + ((netWorth - bench.p25) / (bench.p50 - bench.p25)) * 25;
  if (netWorth >= 0) return Math.max(1, (netWorth / Math.max(1, bench.p25)) * 25);
  return Math.max(1, 10 + (netWorth / 50000) * 5);
}

function NumberInput({ label, value, onChange, sublabel }) {
  const [display, setDisplay] = useState(String(value));
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border-input)" }}>
      <div>
        <div style={{ fontSize: 14, color: "var(--text-primary)" }}>{label}</div>
        {sublabel && <div style={{ fontSize: 11, color: "var(--text-faint)" }}>{sublabel}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)", padding: "6px 12px" }}>
        <span style={{ color: "var(--accent)", fontSize: 14, fontFamily: "'Inter', monospace" }}>$</span>
        <input type="text" inputMode="decimal" value={focused ? display : value.toLocaleString()}
          onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
          onChange={e => { const r = e.target.value.replace(/,/g, ""); setDisplay(r); const n = Number(r); if (r === "" || r === "-") { onChange(0); } else if (!isNaN(n)) onChange(n); }}
          onBlur={() => setFocused(false)}
          style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 15, fontFamily: "'Inter', monospace", fontWeight: 600, width: 110, textAlign: "right" }}
        />
      </div>
    </div>
  );
}

export default function NetWorthPage() {
  const [age, setAge] = useState(30);
  const [assets, setAssets] = useState({
    checking: 5000, savings: 15000, investments: 40000,
    retirement: 35000, home: 0, car: 18000, other: 5000,
  });
  const [debts, setDebts] = useState({
    mortgage: 0, studentLoans: 25000, autoLoan: 12000,
    creditCards: 3000, other: 0,
  });
  const [showResult, setShowResult] = useState(false);

  const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
  const totalDebts = Object.values(debts).reduce((a, b) => a + b, 0);
  const netWorth = totalAssets - totalDebts;
  const bench = getBenchmark(age);
  const percentile = Math.round(getPercentile(netWorth, bench));
  const topPct = Math.max(1, 100 - percentile);

  const shareText = `My net worth puts me in the top ${topPct}% for age ${age}. 💰 Check yours free at pulsafi.com/tools/net-worth-calculator`;

  const assetItems = [
    { key: "checking", label: "Checking Accounts" },
    { key: "savings", label: "Savings / CDs", sub: "High-yield savings, CDs, money market" },
    { key: "investments", label: "Taxable Investments", sub: "Brokerage accounts, stocks, crypto" },
    { key: "retirement", label: "Retirement Accounts", sub: "401(k), IRA, Roth IRA, pension" },
    { key: "home", label: "Home Value", sub: "Current market value, not purchase price" },
    { key: "car", label: "Vehicles", sub: "Current resale value" },
    { key: "other", label: "Other Assets", sub: "Business equity, collectibles, etc" },
  ];

  const debtItems = [
    { key: "mortgage", label: "Mortgage Balance" },
    { key: "studentLoans", label: "Student Loans" },
    { key: "autoLoan", label: "Auto Loans" },
    { key: "creditCards", label: "Credit Card Debt" },
    { key: "other", label: "Other Debts", sub: "Personal loans, medical debt" },
  ];

  const pieData = [
    ...Object.entries(assets).filter(([_, v]) => v > 0).map(([k, v]) => ({
      label: assetItems.find(a => a.key === k)?.label || k, value: v, type: "asset",
    })),
  ];
  const totalPie = pieData.reduce((s, d) => s + d.value, 0);

  const COLORS_ASSET = ["#2ecc71", "#27ae60", "#1abc9c", "#16a085", "#3498db", "#2980b9", "#9b59b6"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <section style={{ padding: "50px 24px 30px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 12, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(26px, 4.5vw, 40px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.02em" }}>
          Net Worth Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Add up your assets and debts. See your net worth and how you compare to others your age.
        </p>
      </section>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "20px 24px 80px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

          {/* Age */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Your Age</label>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
              <input type="range" min={18} max={75} value={age} onChange={e => setAge(Number(e.target.value))}
                style={{ flex: 1, accentColor: "var(--accent)" }} />
              <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--accent)", minWidth: 40 }}>{age}</span>
            </div>
          </div>

          {/* Assets */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#2ecc71" }}>📈 Assets</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#2ecc71", fontFamily: "'Inter', monospace" }}>{fmt(totalAssets)}</div>
            </div>
            {assetItems.map(a => (
              <NumberInput key={a.key} label={a.label} sublabel={a.sub} value={assets[a.key]}
                onChange={v => setAssets({ ...assets, [a.key]: v })} />
            ))}
          </div>

          {/* Debts */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#e74c3c" }}>📉 Debts</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#e74c3c", fontFamily: "'Inter', monospace" }}>{fmt(totalDebts)}</div>
            </div>
            {debtItems.map(d => (
              <NumberInput key={d.key} label={d.label} sublabel={d.sub} value={debts[d.key]}
                onChange={v => setDebts({ ...debts, [d.key]: v })} />
            ))}
          </div>

          {/* Net Worth Result */}
          <div style={{
            background: netWorth >= 0
              ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)"
              : "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
            borderRadius: 18, padding: "28px", textAlign: "center", marginBottom: 20,
          }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)", marginBottom: 6 }}>Your Net Worth</div>
            <div style={{ fontSize: "clamp(36px, 7vw, 52px)", fontWeight: 900, fontFamily: "'Inter', monospace", color: "#0d0f13", letterSpacing: "-0.03em" }}>
              {fmt(netWorth)}
            </div>
          </div>

          {/* Percentile */}
          <div style={{
            background: "var(--bg-input)", borderRadius: 16, padding: "24px", border: "1px solid var(--border-input)",
            textAlign: "center", marginBottom: 20,
          }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>Compared to other {age}-year-olds</div>
            <div style={{ fontSize: 40, fontWeight: 900, fontFamily: "'Inter', monospace", color: percentile >= 75 ? "#2ecc71" : percentile >= 50 ? "var(--accent)" : percentile >= 25 ? "#e67e22" : "#e74c3c" }}>
              Top {topPct}%
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
              {percentile >= 75 ? "You're well ahead of your peers." : percentile >= 50 ? "You're above the median — keep building." : percentile >= 25 ? "You're in the middle — there's room to grow." : "You're behind the curve, but that can change fast."}
            </div>

            {/* Percentile bar */}
            <div style={{ marginTop: 16, position: "relative" }}>
              <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", background: "var(--bg-main)" }}>
                <div style={{ width: "25%", background: "#e74c3c55" }} />
                <div style={{ width: "25%", background: "#e67e2255" }} />
                <div style={{ width: "25%", background: "#f0c04055" }} />
                <div style={{ width: "25%", background: "#2ecc7155" }} />
              </div>
              {/* Marker */}
              <div style={{
                position: "absolute", top: -6, left: `${Math.min(97, Math.max(2, percentile))}%`,
                transform: "translateX(-50%)", transition: "left 0.6s cubic-bezier(0.4,0,0.2,1)",
              }}>
                <div style={{ width: 4, height: 24, background: "var(--text-primary)", borderRadius: 2 }} />
                <div style={{ fontSize: 10, color: "var(--text-primary)", fontWeight: 700, marginTop: 2, fontFamily: "'Inter', monospace" }}>{percentile}th</div>
              </div>
            </div>

            {/* Benchmark comparison */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginTop: 28 }}>
              {[
                { label: "25th %ile", value: bench.p25 },
                { label: "Median", value: bench.p50 },
                { label: "75th %ile", value: bench.p75 },
                { label: "90th %ile", value: bench.p90 },
              ].map((b, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Inter', monospace", color: netWorth >= b.value ? "#2ecc71" : "var(--text-secondary)" }}>{fmt(b.value)}</div>
                  <div style={{ fontSize: 10, color: "var(--text-faint)" }}>{b.label}</div>
                  {netWorth >= b.value && <div style={{ fontSize: 10, color: "#2ecc71" }}>✓</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Asset Breakdown Visual */}
          {totalAssets > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>Asset Allocation</div>
              <div style={{ display: "flex", height: 16, borderRadius: 8, overflow: "hidden" }}>
                {pieData.map((d, i) => (
                  <div key={i} style={{ width: `${(d.value / totalPie) * 100}%`, background: COLORS_ASSET[i % COLORS_ASSET.length], minWidth: d.value > 0 ? 3 : 0, transition: "width 0.4s" }}
                    title={`${d.label}: ${fmt(d.value)}`} />
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 }}>
                {pieData.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: COLORS_ASSET[i % COLORS_ASSET.length] }} />
                    {d.label} ({Math.round((d.value / totalPie) * 100)}%)
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Share */}
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => navigator.clipboard?.writeText(shareText)} style={{
              padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border-card)",
              background: "var(--bg-input)", cursor: "pointer", fontSize: 13, fontWeight: 600,
              color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
            }}>📋 Copy Result</button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", padding: "12px 24px", borderRadius: 10, textDecoration: "none",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              fontSize: 13, fontWeight: 700, color: "#0d0f13",
            }}>Share on X →</a>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>What Is Net Worth and Why It Matters</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 14 }}>Net worth is the single best measure of your financial health. It's simple: everything you own minus everything you owe. Unlike income, which measures flow, net worth measures what you've actually accumulated. Someone earning $200K but spending $195K has a lower net worth trajectory than someone earning $70K and saving 30%.</p>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "24px 0 8px" }}>How to increase your net worth</h3>
            <p style={{ marginBottom: 14 }}>There are only three levers: earn more, spend less, or invest better. The fastest path for most people is attacking high-interest debt first, since every dollar of credit card debt eliminated is a guaranteed 20%+ return. Then automate savings into index funds, and let compound interest do the rest.</p>
          </div>
          <div style={{ marginTop: 32, padding: "20px", background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Related</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
                { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: "📈" },
                { name: "Debt Payoff", href: "/tools/debt-payoff-calculator", icon: "💳" },
                { name: "Financial Health Score", href: "/tools/financial-health-score", icon: "🩺" },
              ].map((t, i) => (
                <a key={i} href={t.href} style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 12px", background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)", textDecoration: "none", color: "var(--text-secondary)", fontSize: 12 }}>{t.icon} {t.name}</a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

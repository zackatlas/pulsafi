"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
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

function calcPayoff(balance, apr, payment) {
  const r = apr / 100 / 12;
  if (payment <= balance * r) return { months: Infinity, totalPaid: Infinity, totalInterest: Infinity, schedule: [] };
  let months = 0, totalPaid = 0, remaining = balance;
  const schedule = [{ month: 0, balance: remaining, interest: 0, principal: 0 }];
  while (remaining > 0.01 && months < 600) {
    const interest = remaining * r;
    const princ = Math.min(payment - interest, remaining);
    remaining -= princ;
    totalPaid += payment;
    months++;
    if (months % 3 === 0 || remaining <= 0.01) {
      schedule.push({ month: months, balance: Math.max(0, remaining), interest, principal: princ });
    }
  }
  return { months, totalPaid, totalInterest: totalPaid - balance, schedule };
}

export default function DebtPayoffPage() {
  const [debts, setDebts] = useState([
    { name: "Credit Card", balance: 8000, apr: 22, minPayment: 200 },
    { name: "Car Loan", balance: 15000, apr: 6.5, minPayment: 350 },
    { name: "Student Loan", balance: 25000, apr: 5, minPayment: 280 },
  ]);
  const [extraPayment, setExtraPayment] = useState(300);
  const [strategy, setStrategy] = useState("avalanche");

  const updateDebt = (idx, field, val) => {
    const updated = [...debts];
    updated[idx] = { ...updated[idx], [field]: val };
    setDebts(updated);
  };

  const addDebt = () => setDebts([...debts, { name: `Debt ${debts.length + 1}`, balance: 5000, apr: 15, minPayment: 150 }]);
  const removeDebt = (idx) => { if (debts.length > 1) setDebts(debts.filter((_, i) => i !== idx)); };

  // Calculate minimum-only scenario
  const totalMinPayments = debts.reduce((s, d) => s + d.minPayment, 0);
  const totalBalance = debts.reduce((s, d) => s + d.balance, 0);

  // Simple single-debt calc for comparison
  const weightedAPR = debts.reduce((s, d) => s + d.apr * (d.balance / totalBalance), 0);
  const minResult = calcPayoff(totalBalance, weightedAPR, totalMinPayments);
  const extraResult = calcPayoff(totalBalance, weightedAPR, totalMinPayments + extraPayment);

  // Strategy ordering
  const sorted = [...debts].sort((a, b) =>
    strategy === "avalanche" ? b.apr - a.apr : a.balance - b.balance
  );

  const interestSaved = minResult.totalInterest - extraResult.totalInterest;
  const monthsSaved = minResult.months - extraResult.months;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Debt Payoff Calculator",
        "url": "https://pulsafi.com/tools/debt-payoff-calculator",
        "description": "Free debt payoff calculator. Compare avalanche vs snowball strategies, see your payoff timeline, and calculate how extra payments save you money.",
        "applicationCategory": "FinanceApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Debt Payoff Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Add all your debts, set your extra payment budget, and compare avalanche vs snowball strategies. See exactly when you'll be debt-free.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

          {/* Debt Entries */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Your Debts</div>
              <button onClick={addDebt} style={{
                background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: 8,
                padding: "6px 14px", color: "var(--accent)", fontWeight: 600, fontSize: 12, cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}>+ Add Debt</button>
            </div>

            {debts.map((d, i) => (
              <div key={i} style={{
                background: "var(--bg-input)", borderRadius: 14, border: "1px solid var(--border-input)",
                padding: "18px 20px", marginBottom: 10, position: "relative",
              }}>
                {debts.length > 1 && (
                  <button onClick={() => removeDebt(i)} style={{
                    position: "absolute", top: 10, right: 12, background: "transparent", border: "none",
                    color: "var(--text-faint)", cursor: "pointer", fontSize: 16, padding: "2px 6px",
                  }}>×</button>
                )}
                <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 12, alignItems: "end" }}>
                  <div>
                    <label style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.04em" }}>Name</label>
                    <input type="text" value={d.name} onChange={e => updateDebt(i, "name", e.target.value)}
                      style={{ width: "100%", background: "var(--bg-main)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Balance</label>
                    <input type="text" inputMode="decimal" value={d.balance} onChange={e => { const n = Number(e.target.value); if (!isNaN(n)) updateDebt(i, "balance", n); }}
                      style={{ width: "100%", background: "var(--bg-main)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Mono', monospace", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>APR %</label>
                    <input type="text" inputMode="decimal" value={d.apr} onChange={e => { const n = Number(e.target.value); if (!isNaN(n)) updateDebt(i, "apr", n); }}
                      style={{ width: "100%", background: "var(--bg-main)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Mono', monospace", outline: "none" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, color: "var(--text-muted)", marginBottom: 4, textTransform: "uppercase" }}>Min. Payment</label>
                    <input type="text" inputMode="decimal" value={d.minPayment} onChange={e => { const n = Number(e.target.value); if (!isNaN(n)) updateDebt(i, "minPayment", n); }}
                      style={{ width: "100%", background: "var(--bg-main)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Mono', monospace", outline: "none" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Extra Payment & Strategy */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <Input label="Extra Monthly Payment" value={extraPayment} onChange={setExtraPayment} prefix="$" sublabel="above minimums" />
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>Strategy</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[
                  { id: "avalanche", label: "Avalanche", desc: "Highest APR first" },
                  { id: "snowball", label: "Snowball", desc: "Smallest balance first" },
                ].map(s => (
                  <button key={s.id} onClick={() => setStrategy(s.id)} style={{
                    flex: 1, padding: "12px 14px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                    background: strategy === s.id ? "var(--accent-bg)" : "var(--bg-input)",
                    border: strategy === s.id ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: strategy === s.id ? "var(--accent)" : "var(--text-primary)" }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{s.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ResultCard label="Debt-Free In" value={extraResult.months >= 600 ? "Increase payment" : `${Math.floor(extraResult.months / 12)}y ${extraResult.months % 12}m`} accent sub={`With ${fmt(totalMinPayments + extraPayment)}/mo total`} />
            <ResultCard label="Total Interest" value={extraResult.totalInterest < Infinity ? fmt(extraResult.totalInterest) : "—"} />
            <ResultCard label="Interest Saved" value={interestSaved > 0 && interestSaved < Infinity ? fmt(interestSaved) : "—"} sub={monthsSaved > 0 && monthsSaved < Infinity ? `${monthsSaved} months sooner` : ""} />
          </div>

          {/* Minimum-Only Comparison */}
          <div style={{
            marginTop: 20, background: "var(--bg-input)", borderRadius: 14, padding: "18px 22px",
            border: "1px solid var(--border-input)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>Minimums only ({fmt(totalMinPayments)}/mo)</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>
                {minResult.months < 600 ? `${Math.floor(minResult.months / 12)}y ${minResult.months % 12}m` : "50+ years"} — {minResult.totalInterest < Infinity ? fmt(minResult.totalInterest) : "∞"} in interest
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>With extra {fmt(extraPayment)}/mo</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>
                {extraResult.months < 600 ? `${Math.floor(extraResult.months / 12)}y ${extraResult.months % 12}m` : "Increase payment"} — {extraResult.totalInterest < Infinity ? fmt(extraResult.totalInterest) : "—"} in interest
              </div>
            </div>
          </div>

          {/* Payoff Order */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
              {strategy === "avalanche" ? "🏔️ Avalanche Order" : "⛄ Snowball Order"} — Pay These First
            </div>
            {sorted.map((d, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
                background: i === 0 ? "var(--accent-bg)" : "transparent",
                borderRadius: 10, border: i === 0 ? "1px solid var(--accent-border)" : "1px solid transparent",
                marginBottom: 4,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 0 ? "var(--accent)" : "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: i === 0 ? "#0d0f13" : "var(--text-muted)" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{d.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{fmt(d.balance)} at {d.apr}% APR</div>
                </div>
                {i === 0 && <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>← Focus extra payments here</div>}
              </div>
            ))}
          </div>

          {/* Balance Chart */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Total Balance Over Time</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 100 }}>
              {extraResult.schedule.map((s, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <div style={{
                    width: "100%", maxWidth: 20,
                    height: `${(s.balance / totalBalance) * 100}%`,
                    background: s.balance > 0 ? "linear-gradient(180deg, #e74c3c, #c0392b)" : "#2ecc71",
                    borderRadius: "3px 3px 0 0", minHeight: s.balance > 0 ? 2 : 4,
                  }} />
                  {i % Math.max(1, Math.floor(extraResult.schedule.length / 10)) === 0 && (
                    <div style={{ fontSize: 8, color: "var(--text-faint)" }}>M{s.month}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Avalanche vs Snowball: Which Is Better?</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>The avalanche method targets debts with the highest interest rate first, minimizing total interest paid. The snowball method targets the smallest balance first, giving you quick wins that build momentum. Mathematically, avalanche always saves you more money. Psychologically, snowball keeps you motivated. Both are dramatically better than paying minimums only.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Why extra payments matter so much</h3>
            <p style={{ marginBottom: 16 }}>Credit card minimum payments are designed to keep you in debt as long as possible. On an $8,000 balance at 22% APR, paying only the minimum ($200/month) means you'll pay over $5,000 in interest and take nearly 6 years to pay it off. Adding just $100/month cuts that to under 3 years and saves you thousands.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Should you pay off debt or invest?</h3>
            <p style={{ marginBottom: 16 }}>If your debt has a higher interest rate than your expected investment returns, pay off the debt first. Credit card debt at 20%+ should always be prioritized. Student loans at 5% are debatable — some people prefer to invest while making minimum payments, since the S&P 500 historically returns ~10%. There's no single right answer, but eliminating high-interest debt is almost always the best first move.</p>
          </div>

          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
                { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: "📈" },
                { name: "Salary Breakdown", href: "/tools/salary-breakdown-calculator", icon: "💰" },
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

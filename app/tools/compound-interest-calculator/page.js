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

export default function CompoundInterestPage() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [compounding, setCompounding] = useState(12); // monthly

  const totalContributed = principal + monthly * 12 * years;
  const r = rate / 100 / compounding;
  const n = years * compounding;
  const contributionPerPeriod = monthly * (12 / compounding);
  const futureValue = principal * Math.pow(1 + r, n) + contributionPerPeriod * ((Math.pow(1 + r, n) - 1) / r);
  const interestEarned = futureValue - totalContributed;

  // Year-by-year data
  const yearData = [];
  for (let y = 0; y <= years; y++) {
    const m = y * compounding;
    const fv = principal * Math.pow(1 + r, m) + contributionPerPeriod * ((Math.pow(1 + r, m) - 1) / (r || 1));
    const contributed = principal + monthly * 12 * y;
    yearData.push({ year: y, value: fv, contributed, interest: fv - contributed });
  }

  // Milestones
  const milestones = [100000, 250000, 500000, 1000000];
  const hitMilestones = milestones.map(m => {
    const hit = yearData.find(d => d.value >= m);
    return { target: m, year: hit ? hit.year : null };
  }).filter(m => m.year !== null && m.year <= years);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Compound Interest Calculator",
        "url": "https://pulsafi.com/tools/compound-interest-calculator",
        "description": "Free compound interest calculator. See how your money grows with regular contributions, different return rates, and compounding frequencies.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Compound Interest Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          See how your money grows over time. Adjust your starting balance, monthly contributions, interest rate, and compounding frequency to visualize your wealth-building journey.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Starting Amount" value={principal} onChange={setPrincipal} prefix="$" />
            <Input label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" />
            <Input label="Annual Interest Rate" value={rate} onChange={setRate} suffix="%" />
            <Input label="Time Period" value={years} onChange={setYears} suffix="years" />
          </div>

          {/* Compounding Frequency */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Compounding Frequency</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "Daily", value: 365 },
                { label: "Monthly", value: 12 },
                { label: "Quarterly", value: 4 },
                { label: "Annually", value: 1 },
              ].map(f => (
                <button key={f.value} onClick={() => setCompounding(f.value)} style={{
                  flex: 1, padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
                  background: compounding === f.value ? "var(--accent-bg)" : "var(--bg-input)",
                  border: compounding === f.value ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                  color: compounding === f.value ? "var(--accent)" : "var(--text-secondary)",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                }}>{f.label}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <ResultCard label="Future Value" value={fmt(futureValue)} accent />
            <ResultCard label="Total Contributed" value={fmt(totalContributed)} />
            <ResultCard label="Interest Earned" value={fmt(interestEarned)} sub={pct((interestEarned / totalContributed) * 100) + " return on contributions"} />
          </div>

          {/* Growth Chart */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Growth Over Time</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
              {yearData.filter((_, i) => i % Math.max(1, Math.ceil(years / 25)) === 0 || i === yearData.length - 1).map((d, i) => {
                const maxVal = futureValue;
                const contribH = (d.contributed / maxVal) * 100;
                const interestH = (d.interest / maxVal) * 100;
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ width: "100%", maxWidth: 20, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 100 }}>
                      <div style={{ height: `${interestH}%`, background: "var(--accent)", borderRadius: "3px 3px 0 0", minHeight: d.interest > 0 ? 1 : 0 }} />
                      <div style={{ height: `${contribH}%`, background: "var(--accent-dark)", minHeight: d.contributed > 0 ? 1 : 0 }} />
                    </div>
                    <div style={{ fontSize: 8, color: "var(--text-faint)" }}>Y{d.year}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent-dark)" }} /> Contributions
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent)" }} /> Interest
              </div>
            </div>
          </div>

          {/* Milestones */}
          {hitMilestones.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>🎯 Milestones</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {hitMilestones.map((m, i) => (
                  <div key={i} style={{
                    background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)",
                    padding: "12px 16px", flex: 1, minWidth: 120, textAlign: "center",
                  }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{fmt(m.target)}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>in {m.year} year{m.year !== 1 ? "s" : ""}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Year-by-Year Table */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Year-by-Year Breakdown</div>
            <div style={{ maxHeight: 300, overflowY: "auto", borderRadius: 10, border: "1px solid var(--border-input)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
                <thead>
                  <tr style={{ background: "var(--bg-input)", position: "sticky", top: 0 }}>
                    {["Year", "Balance", "Contributed", "Interest"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {yearData.filter(d => d.year > 0).map(d => (
                    <tr key={d.year} style={{ borderTop: "1px solid var(--border-input)" }}>
                      <td style={{ padding: "8px 14px", color: "var(--text-muted)" }}>{d.year}</td>
                      <td style={{ padding: "8px 14px", color: "var(--accent)", fontWeight: 600 }}>{fmt(d.value)}</td>
                      <td style={{ padding: "8px 14px", color: "var(--text-secondary)" }}>{fmt(d.contributed)}</td>
                      <td style={{ padding: "8px 14px", color: "var(--text-secondary)" }}>{fmt(d.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            Understanding Compound Interest
          </h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              Compound interest is what happens when your investment earns returns, and those returns start earning returns of their own. It's the single most powerful force in wealth building, and it's why starting early matters more than investing large amounts later.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>The compound interest formula</h3>
            <p style={{ marginBottom: 16 }}>
              The formula is A = P(1 + r/n)^(nt), where A is the final amount, P is your initial principal, r is the annual interest rate, n is the number of times interest compounds per year, and t is the number of years. Our calculator handles this automatically and adds the effect of regular monthly contributions.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Why starting early beats investing more</h3>
            <p style={{ marginBottom: 16 }}>
              Someone who invests $300/month from age 25 to 35 (10 years, $36,000 total) and then stops will have more at age 65 than someone who invests $300/month from age 35 to 65 (30 years, $108,000 total), assuming the same return rate. That's the power of compound interest — time is more valuable than money.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Monthly vs. daily compounding</h3>
            <p style={{ marginBottom: 16 }}>
              The difference between monthly and daily compounding is smaller than most people think. On a $10,000 investment at 8% for 20 years, daily compounding gives you about $200 more than monthly. The real game-changer is your contribution amount and consistency, not compounding frequency.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>The Rule of 72</h3>
            <p style={{ marginBottom: 16 }}>
              Want a quick shortcut? Divide 72 by your annual return rate to estimate how many years it takes to double your money. At 8% returns, your money doubles roughly every 9 years. At 10%, every 7.2 years.
            </p>
          </div>

          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related Calculators</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
                { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
                { name: "Investment Comparison", href: "/", icon: "📊" },
              ].map((tool, i) => (
                <a key={i} href={tool.href} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                  background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)",
                  textDecoration: "none", color: "var(--text-secondary)", fontSize: 13, transition: "border-color 0.2s",
                }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-input)"}
                >{tool.icon} {tool.name}</a>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, padding: "20px 24px", background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>📚 Related Reading</div>
            <a href="/learn/compound-interest-power-starting-early" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              The Power of Starting Early: Why Time Beats Timing →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

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
        {prefix && <span style={{ color: "var(--accent)", fontFamily: "'Inter', monospace", fontSize: 15, fontWeight: 500 }}>{prefix}</span>}
        <input type="text" inputMode="decimal" value={shown}
          onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
          onChange={(e) => { const raw = e.target.value; if (raw === "" || raw === "-" || raw === ".") { setDisplay(raw); onChange(0); return; } const num = Number(raw); if (!isNaN(num)) { setDisplay(raw); onChange(num); } }}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 16, fontFamily: "'Inter', monospace", fontWeight: 500, width: "100%" }}
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
      <div style={{ fontSize: 24, fontWeight: 700, color: accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

export default function FireCalcPage() {
  const [age, setAge] = useState(30);
  const [savings, setSavings] = useState(50000);
  const [monthlySave, setMonthlySave] = useState(2000);
  const [expenses, setExpenses] = useState(40000);
  const [returnRate, setReturnRate] = useState(7);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [income, setIncome] = useState(80000);

  const fireNumber = expenses / (withdrawalRate / 100);
  const r = returnRate / 100 / 12;

  // Calculate months to FIRE
  let current = savings, months = 0;
  const yearlyData = [{ year: 0, balance: savings, contributed: savings }];
  let totalContributed = savings;
  while (current < fireNumber && months < 720) {
    current = current * (1 + r) + monthlySave;
    months++;
    if (months % 12 === 0) {
      totalContributed = savings + monthlySave * months;
      yearlyData.push({ year: months / 12, balance: current, contributed: totalContributed });
    }
  }
  const yearsToFire = months / 12;
  const fireAge = age + yearsToFire;

  // Savings rate
  const annualSavings = monthlySave * 12;
  const savingsRate = income > 0 ? (annualSavings / income) * 100 : 0;

  // Post-FIRE runway — how long does the money last?
  const monthlyWithdrawal = expenses / 12;
  let postBalance = fireNumber;
  let runwayMonths = 0;
  const postReturnRate = 0.04 / 12; // assume 4% returns in retirement
  while (postBalance > 0 && runwayMonths < 1200) {
    postBalance = postBalance * (1 + postReturnRate) - monthlyWithdrawal;
    runwayMonths++;
  }
  const runwayYears = runwayMonths / 12;
  const moneyLastsUntil = Math.round(fireAge + runwayYears);

  // Coast FIRE — how much do you need now to never save again?
  const yearsUntilTraditional = 65 - age;
  const coastFireNumber = fireNumber / Math.pow(1 + returnRate / 100, yearsUntilTraditional);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi FIRE Calculator",
        "url": "https://www.pulsafi.com/tools/fire-calculator",
        "description": "Free FIRE calculator. Find out when you can achieve financial independence and retire early based on your savings, expenses, and investment returns.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          FIRE Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Calculate when you can achieve Financial Independence and Retire Early. See your FIRE number, savings rate, timeline, and how long your money lasts in retirement.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Current Age" value={age} onChange={setAge} suffix="years" />
            <Input label="Annual Income" value={income} onChange={setIncome} prefix="$" sublabel="gross" />
            <Input label="Current Savings" value={savings} onChange={setSavings} prefix="$" sublabel="invested assets" />
            <Input label="Monthly Savings" value={monthlySave} onChange={setMonthlySave} prefix="$" />
            <Input label="Annual Expenses" value={expenses} onChange={setExpenses} prefix="$" sublabel="in retirement" />
            <Input label="Expected Return" value={returnRate} onChange={setReturnRate} suffix="%" />
            <Input label="Withdrawal Rate" value={withdrawalRate} onChange={setWithdrawalRate} suffix="%" sublabel="safe withdrawal" />
          </div>

          {/* Primary Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <ResultCard label="FIRE Number" value={fmt(fireNumber)} accent sub={`${withdrawalRate}% withdrawal rate`} />
            <ResultCard label="Years to FIRE" value={yearsToFire >= 60 ? "60+" : yearsToFire.toFixed(1)} sub={fireAge < 100 ? `Retire at age ${Math.round(fireAge)}` : "Increase savings"} />
            <ResultCard label="Savings Rate" value={pct(savingsRate)} sub={savingsRate >= 50 ? "🔥 Excellent!" : savingsRate >= 25 ? "Good pace" : "Try to increase"} />
          </div>

          {/* Secondary Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <ResultCard label="Money Lasts Until" value={moneyLastsUntil >= 150 ? "Forever" : `Age ${moneyLastsUntil}`} sub="assuming 4% post-FIRE returns" />
            <ResultCard label="Coast FIRE Number" value={fmt(Math.max(0, coastFireNumber))} sub={savings >= coastFireNumber ? "✓ Already reached!" : `Save ${fmt(coastFireNumber - savings)} more`} />
            <ResultCard label="Monthly in Retirement" value={fmt(expenses / 12)} sub="from your portfolio" />
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Progress to FIRE</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>{pct(Math.min(100, (savings / fireNumber) * 100))}</div>
            </div>
            <div style={{ height: 12, background: "var(--bg-input)", borderRadius: 6, overflow: "hidden", border: "1px solid var(--border-input)" }}>
              <div style={{
                height: "100%", width: `${Math.min(100, (savings / fireNumber) * 100)}%`,
                background: "linear-gradient(90deg, var(--accent-dark), var(--accent))",
                borderRadius: 6, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{fmt(savings)} saved</span>
              <span style={{ fontSize: 11, color: "var(--text-faint)" }}>{fmt(fireNumber)} goal</span>
            </div>
          </div>

          {/* Growth Chart */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Savings Growth to FIRE</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120, position: "relative" }}>
              {/* FIRE line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                borderTop: "2px dashed var(--accent)", opacity: 0.4,
              }} />
              <div style={{ position: "absolute", top: -18, right: 0, fontSize: 10, color: "var(--accent)" }}>{fmt(fireNumber)}</div>

              {yearlyData.filter((_, i) => i % Math.max(1, Math.ceil(yearlyData.length / 25)) === 0 || i === yearlyData.length - 1).map((d, i) => {
                const h = Math.min(100, (d.balance / fireNumber) * 100);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{
                      width: "100%", maxWidth: 20,
                      height: `${h}%`,
                      background: d.balance >= fireNumber ? "#2ecc71" : "linear-gradient(180deg, var(--accent), var(--accent-dark))",
                      borderRadius: "3px 3px 0 0", minHeight: 2,
                    }} />
                    <div style={{ fontSize: 8, color: "var(--text-faint)" }}>Y{d.year}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Savings Rate Impact Table */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>How Savings Rate Affects Your Timeline</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[10, 20, 30, 40, 50, 60, 70].map(sr => {
                const mSave = (income * (sr / 100)) / 12;
                let bal = savings, m = 0;
                while (bal < fireNumber && m < 720) { bal = bal * (1 + r) + mSave; m++; }
                const yrs = m / 12;
                return (
                  <div key={sr} style={{
                    flex: 1, minWidth: 80, padding: "10px 12px", borderRadius: 10, textAlign: "center",
                    background: Math.round(sr) === Math.round(savingsRate) ? "var(--accent-bg)" : "var(--bg-input)",
                    border: Math.round(sr) === Math.round(savingsRate) ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>{sr}%</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{yrs >= 60 ? "60+ yrs" : `${yrs.toFixed(1)} yrs`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            What Is FIRE?
          </h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              FIRE stands for Financial Independence, Retire Early. It's a movement built around a simple idea: save and invest aggressively so you accumulate enough wealth that the returns from your portfolio cover your living expenses — making work optional.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>How your FIRE number is calculated</h3>
            <p style={{ marginBottom: 16 }}>
              Your FIRE number is your annual expenses divided by your safe withdrawal rate. The default 4% rate comes from the Trinity Study, which found that a retiree withdrawing 4% of their portfolio annually (adjusted for inflation) has a very high probability of their money lasting 30+ years. If you spend $40,000 per year, your FIRE number is $40,000 / 0.04 = $1,000,000.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Types of FIRE</h3>
            <p style={{ marginBottom: 16 }}>
              There are several approaches to FIRE. Lean FIRE means retiring on a minimal budget (typically under $40,000/year). Fat FIRE targets a more comfortable lifestyle ($100,000+/year). Coast FIRE means you've saved enough that compound interest alone will grow your portfolio to your FIRE number by traditional retirement age — so you only need to earn enough to cover current expenses. Barista FIRE means you work a low-stress part-time job for benefits while your portfolio grows.
            </p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Why savings rate matters more than income</h3>
            <p style={{ marginBottom: 16 }}>
              Someone earning $60,000 with a 50% savings rate will reach FIRE faster than someone earning $200,000 with a 10% savings rate. This is because a high savings rate does two things simultaneously: it increases the amount you invest AND decreases the amount you need in retirement. The chart above shows how dramatically your timeline shrinks as your savings rate increases.
            </p>
          </div>

          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related Calculators</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: "📈" },
                { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
                { name: "Salary Breakdown", href: "/", icon: "💰" },
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
            <a href="/learn/fire-movement-2026" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              FIRE Movement 2026: What's Changed →
            </a>
          </div>

          <div style={{ marginTop: 20, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>Related Resources</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>📚 Articles</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  <li><a href="/learn/fire-movement-2026" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>FIRE Movement 2026 →</a></li>
                  <li><a href="/learn/compound-interest-power-starting-early" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Power of Compound Interest →</a></li>
                  <li><a href="/learn/how-to-build-wealth-in-your-20s" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Build Wealth in Your 20s →</a></li>
                </ul>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>🛠️ Tools</div>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  <li><a href="/tools/investment-comparison" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Investment Comparison →</a></li>
                  <li><a href="/tools/compound-interest-calculator" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Compound Interest →</a></li>
                  <li><a href="/tools/salary-breakdown-calculator" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontWeight: 500 }}>Salary Breakdown →</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

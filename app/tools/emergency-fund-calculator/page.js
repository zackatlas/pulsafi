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

function CircularProgress({ percentage }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 140, height: 140 }}>
        <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={70} cy={70} r={radius} fill="none" stroke="var(--border-input)" strokeWidth={8} />
          <circle
            cx={70} cy={70} r={radius} fill="none" stroke="var(--accent)" strokeWidth={8}
            strokeDasharray={circumference} strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.6s ease", strokeLinecap: "round" }}
          />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>{percentage.toFixed(0)}%</div>
          <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Complete</div>
        </div>
      </div>
    </div>
  );
}

export default function EmergencyFundPage() {
  const [rent, setRent] = useState(1500);
  const [utilities, setUtilities] = useState(200);
  const [groceries, setGroceries] = useState(400);
  const [insurance, setInsurance] = useState(300);
  const [transport, setTransport] = useState(250);
  const [debt, setDebt] = useState(200);
  const [other, setOther] = useState(150);
  const [currentSavings, setCurrentSavings] = useState(5000);
  const [monthlySave, setMonthlySave] = useState(500);
  const [targetMonths, setTargetMonths] = useState(6);
  const [jobStability, setJobStability] = useState("stable");
  const [dependents, setDependents] = useState(0);
  const [incomeVolatility, setIncomeVolatility] = useState("fixed");

  // Calculate monthly expenses
  const monthlyExpenses = rent + utilities + groceries + insurance + transport + debt + other;

  // Calculate target emergency fund
  const targetAmount = monthlyExpenses * targetMonths;

  // Calculate progress
  const progressPercent = Math.min((currentSavings / targetAmount) * 100, 100);
  const gap = Math.max(0, targetAmount - currentSavings);

  // Calculate months to reach goal
  const monthsToGoal = monthlySave > 0 ? Math.ceil(gap / monthlySave) : Infinity;

  // Determine recommendation
  let recommendedMonths = 6;
  if (jobStability === "unstable" || incomeVolatility === "variable" || dependents > 0) {
    recommendedMonths = 9;
  }
  if (jobStability === "very-unstable" || incomeVolatility === "highly-variable") {
    recommendedMonths = 12;
  }

  const expenseItems = [
    { label: "Rent/Mortgage", value: rent },
    { label: "Utilities", value: utilities },
    { label: "Groceries", value: groceries },
    { label: "Insurance", value: insurance },
    { label: "Transport", value: transport },
    { label: "Debt Payments", value: debt },
    { label: "Other", value: other },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Emergency Fund Calculator",
        "url": "https://pulsafi.com/tools/emergency-fund-calculator",
        "description": "Free emergency fund calculator. Calculate how much emergency savings you need based on your monthly expenses and target months. See your progress toward your goal.",
        "applicationCategory": "FinanceApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Emergency Fund Calculator</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Calculate how much emergency savings you need and track your progress toward your goal.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          {/* Monthly Expenses Section */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Monthly Expenses</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Rent/Mortgage" value={rent} onChange={setRent} prefix="$" />
              <Input label="Utilities" value={utilities} onChange={setUtilities} prefix="$" />
              <Input label="Groceries" value={groceries} onChange={setGroceries} prefix="$" />
              <Input label="Insurance" value={insurance} onChange={setInsurance} prefix="$" />
              <Input label="Transport" value={transport} onChange={setTransport} prefix="$" />
              <Input label="Debt Payments" value={debt} onChange={setDebt} prefix="$" />
              <Input label="Other" value={other} onChange={setOther} prefix="$" />
            </div>
          </div>

          {/* Current Savings Section */}
          <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--border-input)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Savings</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Current Savings" value={currentSavings} onChange={setCurrentSavings} prefix="$" sublabel="accessible now" />
              <Input label="Monthly Savings" value={monthlySave} onChange={setMonthlySave} prefix="$" sublabel="can you save?" />
            </div>
          </div>

          {/* Target Months Selection */}
          <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--border-input)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Emergency Fund Target</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[
                { id: 3, label: "3 Months", desc: "Minimum" },
                { id: 6, label: "6 Months", desc: "Recommended" },
                { id: 9, label: "9 Months", desc: "Conservative" },
                { id: 12, label: "12 Months", desc: "Extra Safe" },
              ].map(m => (
                <button key={m.id} onClick={() => setTargetMonths(m.id)} style={{
                  flex: 1, minWidth: 120, padding: "12px 14px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, textAlign: "center",
                  background: targetMonths === m.id ? "var(--accent-bg)" : "var(--bg-input)",
                  border: targetMonths === m.id ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                  color: targetMonths === m.id ? "var(--accent)" : "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif",
                }}>
                  <div style={{ fontWeight: 700 }}>{m.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{m.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid var(--border-input)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Your Situation</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Job Stability</label>
                <select value={jobStability} onChange={(e) => setJobStability(e.target.value)} style={{ width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "10px 14px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                  <option value="stable">Very Stable</option>
                  <option value="moderate">Moderate</option>
                  <option value="unstable">Unstable</option>
                  <option value="very-unstable">Very Unstable</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Income Volatility</label>
                <select value={incomeVolatility} onChange={(e) => setIncomeVolatility(e.target.value)} style={{ width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "10px 14px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                  <option value="fixed">Fixed Income</option>
                  <option value="variable">Variable Income</option>
                  <option value="highly-variable">Highly Variable (Freelance/Commission)</option>
                </select>
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Number of Dependents</label>
                <select value={dependents} onChange={(e) => setDependents(Number(e.target.value))} style={{ width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "10px 14px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>
                  {[0, 1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n === 0 ? "None" : n}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <ResultCard label="Monthly Expenses" value={fmt(monthlyExpenses)} accent />
            <ResultCard label="Target Emergency Fund" value={fmt(targetAmount)} sub={`${targetMonths} months of expenses`} />
            <ResultCard label="Amount Remaining" value={fmt(gap)} sub={monthsToGoal === Infinity ? "Increase monthly savings" : `${monthsToGoal} months away`} />
          </div>

          {/* Progress Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32, padding: "24px", background: "var(--bg-input)", borderRadius: 16 }}>
            <CircularProgress percentage={progressPercent} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Current Savings</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{fmt(currentSavings)}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Target Amount</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>{fmt(targetAmount)}</div>
              </div>
              {monthlySave > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Timeline to Goal</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>
                    {monthsToGoal === Infinity ? "∞" : `${monthsToGoal} months`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Personalized Recommendation */}
          <div style={{ padding: "20px", background: "var(--accent-bg)", borderRadius: 16, border: "1px solid var(--accent-border)", marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>Personalized Recommendation</div>
            <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
              Based on your {jobStability === "stable" ? "stable job" : jobStability === "moderate" ? "moderate job stability" : jobStability === "unstable" ? "unstable job" : "very unstable income"},
              {incomeVolatility === "fixed" ? " fixed income" : incomeVolatility === "variable" ? " variable income" : " highly variable income"},
              {dependents > 0 ? ` and ${dependents} dependent${dependents > 1 ? "s" : ""}, ` : ", "}
              we recommend <strong>{recommendedMonths} months</strong> of expenses as your emergency fund target. This gives you flexibility during unexpected job transitions or major emergencies.
            </p>
          </div>

          {/* Monthly Expense Breakdown */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Monthly Expense Breakdown</div>
            {expenseItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--accent)", flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'Inter', monospace", minWidth: 80, textAlign: "right" }}>{fmt(item.value)}</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", width: 50, textAlign: "right" }}>{pct((item.value / monthlyExpenses) * 100)}</div>
              </div>
            ))}
            <div style={{ height: 1, background: "var(--border-input)", margin: "12px 0" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: "var(--accent)", flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Total Monthly</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace", minWidth: 80, textAlign: "right" }}>{fmt(monthlyExpenses)}</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", width: 50, textAlign: "right" }}>100%</div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Emergency Fund Tips</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Where to Keep Your Emergency Fund</h3>
            <p style={{ marginBottom: 16 }}>Your emergency fund should be accessible but separate from your regular checking account. High-yield savings accounts (HYSA) are ideal — they currently offer 4-5% APY while keeping your money liquid. Money market accounts and short-term CDs are also good options. Avoid keeping it in the stock market or locked-up investments.</p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>What Counts as an Emergency</h3>
            <p style={{ marginBottom: 16 }}>True emergencies include job loss, medical expenses not covered by insurance, major home or car repairs, and unexpected family emergencies. Your emergency fund should cover these situations where you need cash quickly. It's not meant for vacations, holiday shopping, or planned expenses.</p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>How Much is Enough?</h3>
            <p style={{ marginBottom: 16 }}>The "standard" recommendation is 3-6 months of expenses, but this varies. Freelancers and people in unstable industries should aim for 9-12 months. Dual-income households with stable jobs might be comfortable with 3 months. Single parents or people with health issues should lean toward the higher end.</p>

            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Building Your Emergency Fund</h3>
            <p style={{ marginBottom: 16 }}>Start by setting a realistic monthly savings goal — even $100-200/month adds up. Automate transfers to your emergency fund account so you don't have to think about it. Once you've hit your target, maintain it by replenishing any withdrawals. The time to build an emergency fund is when you don't need it.</p>
          </div>

          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related Tools</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Debt Payoff", href: "/tools/debt-payoff-calculator", icon: "💳" },
                { name: "Budget Planner", href: "/tools/salary-breakdown-calculator", icon: "📊" },
                { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
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

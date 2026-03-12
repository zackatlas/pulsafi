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

const BRACKETS_2025 = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: Infinity, rate: 37 },
];

export default function SalaryPage() {
  const [salary, setSalary] = useState(85000);
  const [stateTax, setStateTax] = useState(5);
  const [retirement, setRetirement] = useState(6);
  const [deductions, setDeductions] = useState(200);
  const [filingStatus, setFilingStatus] = useState("single");
  const [payFrequency, setPayFrequency] = useState(26); // biweekly

  const standardDeduction = filingStatus === "married" ? 30000 : 15000;
  const taxableIncome = Math.max(0, salary - standardDeduction);

  // Federal tax by bracket
  const bracketBreakdown = [];
  let remaining = taxableIncome;
  let federal = 0;
  for (const b of BRACKETS_2025) {
    const bracketSize = b.max - b.min;
    const taxable = Math.min(remaining, bracketSize);
    const tax = taxable * (b.rate / 100);
    if (taxable > 0) {
      bracketBreakdown.push({ rate: b.rate, taxable, tax, min: b.min, max: Math.min(b.max, b.min + taxable) });
    }
    federal += tax;
    remaining -= taxable;
    if (remaining <= 0) break;
  }

  const ssWage = Math.min(salary, 168600);
  const socialSecurity = ssWage * 0.062;
  const medicare = salary * 0.0145;
  const additionalMedicare = salary > 200000 ? (salary - 200000) * 0.009 : 0;
  const fica = socialSecurity + medicare + additionalMedicare;
  const stateTaxAmt = salary * (stateTax / 100);
  const retirementAmt = salary * (retirement / 100);
  const monthlyDeductions = deductions * 12;

  const totalTax = federal + fica + stateTaxAmt;
  const takeHome = salary - totalTax - retirementAmt - monthlyDeductions;
  const monthlyTakeHome = takeHome / 12;
  const perPaycheck = takeHome / payFrequency;
  const effectiveRate = (totalTax / salary) * 100;
  const marginalRate = bracketBreakdown.length > 0 ? bracketBreakdown[bracketBreakdown.length - 1].rate : 0;

  const items = [
    { label: "Federal Tax", value: federal, color: "#e74c3c" },
    { label: "Social Security", value: socialSecurity, color: "#e67e22" },
    { label: "Medicare", value: medicare + additionalMedicare, color: "#f39c12" },
    { label: "State Tax", value: stateTaxAmt, color: "#3498db" },
    { label: "401(k) / Retirement", value: retirementAmt, color: "#2ecc71" },
    { label: "Other Deductions", value: monthlyDeductions, color: "#9b59b6" },
    { label: "Take-Home Pay", value: takeHome, color: "var(--accent)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Salary Breakdown Calculator",
        "url": "https://pulsafi.com/tools/salary-breakdown-calculator",
        "description": "Free salary calculator. See your real take-home pay after federal tax, state tax, FICA, 401(k), and deductions. Per paycheck and annual breakdown.",
        "applicationCategory": "FinanceApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Salary Breakdown Calculator</h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          Enter your gross salary and see exactly what you take home after federal tax, state tax, FICA, retirement contributions, and deductions.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Annual Salary" value={salary} onChange={setSalary} prefix="$" sublabel="gross" />
            <Input label="State Tax Rate" value={stateTax} onChange={setStateTax} suffix="%" />
            <Input label="401(k) Contribution" value={retirement} onChange={setRetirement} suffix="%" />
            <Input label="Monthly Deductions" value={deductions} onChange={setDeductions} prefix="$" sublabel="insurance, etc" />
          </div>

          {/* Filing Status */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            {[{ id: "single", label: "Single" }, { id: "married", label: "Married Filing Jointly" }].map(f => (
              <button key={f.id} onClick={() => setFilingStatus(f.id)} style={{
                flex: 1, padding: "10px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, textAlign: "center",
                background: filingStatus === f.id ? "var(--accent-bg)" : "var(--bg-input)",
                border: filingStatus === f.id ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                color: filingStatus === f.id ? "var(--accent)" : "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif",
              }}>{f.label}</button>
            ))}
          </div>

          {/* Pay Frequency */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
            {[{ id: 52, label: "Weekly" }, { id: 26, label: "Biweekly" }, { id: 24, label: "Semi-Monthly" }, { id: 12, label: "Monthly" }].map(f => (
              <button key={f.id} onClick={() => setPayFrequency(f.id)} style={{
                flex: 1, padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600, textAlign: "center",
                background: payFrequency === f.id ? "var(--accent-bg)" : "var(--bg-input)",
                border: payFrequency === f.id ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                color: payFrequency === f.id ? "var(--accent)" : "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
              }}>{f.label}</button>
            ))}
          </div>

          {/* Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ResultCard label="Per Paycheck" value={fmtD(perPaycheck)} accent sub={`${payFrequency}x per year`} />
            <ResultCard label="Monthly Take-Home" value={fmtD(monthlyTakeHome)} />
            <ResultCard label="Annual Take-Home" value={fmt(takeHome)} />
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <ResultCard label="Effective Tax Rate" value={pct(effectiveRate)} sub={fmt(totalTax) + " total tax"} />
            <ResultCard label="Marginal Tax Rate" value={`${marginalRate}%`} sub="top federal bracket" />
          </div>

          {/* Breakdown Bars */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Where Your Money Goes</div>
            {items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'DM Mono', monospace", minWidth: 80, textAlign: "right" }}>{fmt(item.value)}</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", width: 50, textAlign: "right" }}>{pct((item.value / salary) * 100)}</div>
              </div>
            ))}
            {/* Visual bar */}
            <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginTop: 12 }}>
              {items.map((item, i) => (
                <div key={i} style={{ width: `${(item.value / salary) * 100}%`, background: item.color, minWidth: item.value > 0 ? 2 : 0 }} />
              ))}
            </div>
          </div>

          {/* Federal Tax Bracket Detail */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Federal Tax Bracket Breakdown</div>
            <div style={{ borderRadius: 10, border: "1px solid var(--border-input)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
                <thead>
                  <tr style={{ background: "var(--bg-input)" }}>
                    {["Bracket", "Taxable Income", "Tax Rate", "Tax Owed"].map(h => (
                      <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bracketBreakdown.map((b, i) => (
                    <tr key={i} style={{ borderTop: "1px solid var(--border-input)" }}>
                      <td style={{ padding: "8px 14px", color: "var(--text-muted)" }}>{fmt(b.min)} – {b.max >= 609350 ? "∞" : fmt(b.max)}</td>
                      <td style={{ padding: "8px 14px", color: "var(--text-secondary)" }}>{fmt(b.taxable)}</td>
                      <td style={{ padding: "8px 14px", color: "var(--accent)" }}>{b.rate}%</td>
                      <td style={{ padding: "8px 14px", color: "var(--text-primary)", fontWeight: 600 }}>{fmt(b.tax)}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "2px solid var(--accent)", background: "var(--accent-bg)" }}>
                    <td colSpan={3} style={{ padding: "10px 14px", fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>Total Federal Tax</td>
                    <td style={{ padding: "10px 14px", fontWeight: 700, color: "var(--accent)" }}>{fmt(federal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Understanding Your Paycheck</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>If you've ever looked at your paycheck and wondered where 30-40% of your salary went, this calculator breaks it down. The gap between your gross salary and your take-home pay is filled by federal income tax, Social Security, Medicare, state income tax, and any pre-tax deductions like 401(k) contributions and health insurance.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Marginal vs effective tax rate</h3>
            <p style={{ marginBottom: 16 }}>Your marginal tax rate is the rate on your last dollar of income — the highest bracket you fall into. Your effective tax rate is what you actually pay overall. Someone in the "22% bracket" doesn't pay 22% on all their income. They pay 10% on the first $11,600, 12% on the next $35,550, and only 22% on income above $47,150. This is why the effective rate is always lower than the marginal rate.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>How 401(k) contributions reduce your taxes</h3>
            <p style={{ marginBottom: 16 }}>Traditional 401(k) contributions are pre-tax — they reduce your taxable income. If you earn $85,000 and contribute 6% ($5,100) to your 401(k), you're only taxed on $79,900. At a 22% marginal rate, that $5,100 contribution saves you roughly $1,122 in federal taxes this year while building your retirement fund.</p>
          </div>
          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
                { name: "Debt Payoff", href: "/tools/debt-payoff-calculator", icon: "💳" },
                { name: "Compound Interest", href: "/tools/compound-interest-calculator", icon: "📈" },
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

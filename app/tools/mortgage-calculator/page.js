"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ─── Formatters ───
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
        {label}
        {sublabel && <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.6, marginLeft: 6, fontSize: 11 }}>{sublabel}</span>}
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

export default function MortgagePage() {
  const [price, setPrice] = useState(400000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const [tax, setTax] = useState(3600);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);

  const loanAmount = price * (1 - down / 100);
  const downPayment = price * (down / 100);
  const r = rate / 100 / 12;
  const n = term * 12;
  const monthlyPI = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const monthlyTax = tax / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + hoa;
  const totalPaid = monthlyPI * n;
  const totalInterest = totalPaid - loanAmount;

  // Amortization schedule for chart
  const schedule = [];
  let balance = loanAmount;
  for (let year = 1; year <= term; year++) {
    let yearInterest = 0, yearPrincipal = 0;
    for (let m = 0; m < 12; m++) {
      const intPayment = balance * r;
      const prinPayment = monthlyPI - intPayment;
      yearInterest += intPayment;
      yearPrincipal += prinPayment;
      balance -= prinPayment;
    }
    schedule.push({ year, balance: Math.max(0, balance), interest: yearInterest, principal: yearPrincipal });
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Pulsafi Mortgage Calculator",
        "url": "https://pulsafi.com/tools/mortgage-calculator",
        "description": "Free mortgage calculator. Estimate monthly payments, total interest, and amortization schedule. Includes taxes, insurance, and HOA.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />

      <Header />

      {/* Hero */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Mortgage Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Calculate your monthly mortgage payment including principal, interest, taxes, insurance, and HOA fees. See exactly what you'll pay over the life of your loan.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Calculator Card */}
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px 28px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Home Price" value={price} onChange={setPrice} prefix="$" />
            <Input label="Down Payment" value={down} onChange={setDown} suffix="%" />
            <Input label="Interest Rate" value={rate} onChange={setRate} suffix="%" />
            <Input label="Loan Term" value={term} onChange={setTerm} suffix="years" />
            <Input label="Annual Property Tax" value={tax} onChange={setTax} prefix="$" />
            <Input label="Annual Insurance" value={insurance} onChange={setInsurance} prefix="$" />
            <Input label="Monthly HOA" value={hoa} onChange={setHoa} prefix="$" />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <ResultCard label="Total Monthly Payment" value={fmtD(totalMonthly)} accent />
            <ResultCard label="Principal & Interest" value={fmtD(monthlyPI)} />
            <ResultCard label="Down Payment" value={fmt(downPayment)} sub={pct(down) + " of home price"} />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <ResultCard label="Loan Amount" value={fmt(loanAmount)} />
            <ResultCard label="Total Interest" value={fmt(totalInterest)} sub={pct((totalInterest / loanAmount) * 100) + " of loan"} />
            <ResultCard label="Total Cost" value={fmt(totalPaid + downPayment)} sub="over life of loan" />
          </div>

          {/* Payment Breakdown */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Monthly Payment Breakdown</div>
            {[
              { label: "Principal & Interest", value: monthlyPI, color: "var(--accent)" },
              { label: "Property Tax", value: monthlyTax, color: "#3498db" },
              { label: "Homeowner's Insurance", value: monthlyInsurance, color: "#2ecc71" },
              ...(hoa > 0 ? [{ label: "HOA Fees", value: hoa, color: "#e67e22" }] : []),
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'DM Mono', monospace" }}>{fmtD(item.value)}</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)", width: 50, textAlign: "right" }}>{pct((item.value / totalMonthly) * 100)}</div>
              </div>
            ))}
            {/* Visual bar */}
            <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginTop: 12 }}>
              <div style={{ width: `${(monthlyPI / totalMonthly) * 100}%`, background: "var(--accent)" }} />
              <div style={{ width: `${(monthlyTax / totalMonthly) * 100}%`, background: "#3498db" }} />
              <div style={{ width: `${(monthlyInsurance / totalMonthly) * 100}%`, background: "#2ecc71" }} />
              {hoa > 0 && <div style={{ width: `${(hoa / totalMonthly) * 100}%`, background: "#e67e22" }} />}
            </div>
          </div>

          {/* Amortization Mini Chart */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Remaining Balance Over Time</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 100 }}>
              {schedule.filter((_, i) => i % Math.max(1, Math.floor(term / 20)) === 0 || i === schedule.length - 1).map((s, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: "100%", maxWidth: 24,
                    height: `${(s.balance / loanAmount) * 100}%`,
                    background: `linear-gradient(180deg, var(--accent), var(--accent-dark))`,
                    borderRadius: "3px 3px 0 0", minHeight: 2,
                  }} />
                  <div style={{ fontSize: 9, color: "var(--text-faint)" }}>Y{s.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            How to Use This Mortgage Calculator
          </h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              This mortgage calculator gives you a complete picture of your monthly housing costs — not just principal and interest. Enter your home price, down payment percentage, interest rate, and loan term to see your base payment. Then add property taxes, homeowner's insurance, and HOA fees for the full monthly cost.
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>What's included in a mortgage payment?</h3>
            <p style={{ marginBottom: 16 }}>
              Your mortgage payment consists of four parts, often called PITI: Principal (the loan amount you're paying down), Interest (what the lender charges for the loan), Taxes (property taxes collected by your local government), and Insurance (homeowner's insurance that protects against damage). Many homeowners also pay HOA fees if they live in a community with shared amenities.
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>How much house can I afford?</h3>
            <p style={{ marginBottom: 16 }}>
              A common guideline is to keep your total housing payment below 28% of your gross monthly income, or 25% of your net take-home pay for a more conservative approach. Use this calculator to find the home price that fits your budget — adjust the price until the monthly payment aligns with what you can comfortably spend.
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>15-year vs 30-year mortgage</h3>
            <p style={{ marginBottom: 16 }}>
              A 15-year mortgage has higher monthly payments but saves you significantly on total interest. Try changing the loan term between 15 and 30 years to see the difference. On a $320,000 loan at 6.5%, switching from 30 to 15 years saves over $200,000 in interest — but increases your monthly payment by roughly $800.
            </p>
          </div>

          {/* Related Tools */}
          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related Calculators</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Compound Interest", href: "/", icon: "📈" },
                { name: "FIRE Calculator", href: "/", icon: "🔥" },
                { name: "Debt Payoff", href: "/", icon: "💳" },
                { name: "Salary Breakdown", href: "/", icon: "💰" },
              ].map((tool, i) => (
                <a key={i} href={tool.href} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                  background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)",
                  textDecoration: "none", color: "var(--text-secondary)", fontSize: 13, transition: "border-color 0.2s",
                }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-input)"}
                >
                  <span>{tool.icon}</span> {tool.name}
                </a>
              ))}
            </div>
          </div>

          {/* Read More */}
          <div style={{ marginTop: 20, padding: "20px 24px", background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>📚 Related Reading</div>
            <a href="/learn/how-much-house-can-you-afford" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              How Much House Can You Actually Afford? (Not What the Bank Says) →
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

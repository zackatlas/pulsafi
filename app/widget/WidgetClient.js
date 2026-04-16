"use client";
import { useState, useEffect } from "react";

// ─── Formatters ───
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const pct = (n) => `${n.toFixed(1)}%`;

// ─── Input ───
function Input({ label, value, onChange, prefix, suffix, sublabel }) {
  const [display, setDisplay] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const shown = focused ? display : String(value);

  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
        {sublabel && <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.6, marginLeft: 6, fontSize: 10 }}>{sublabel}</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)", padding: "8px 12px", gap: 6 }}>
        {prefix && <span style={{ color: "var(--accent)", fontFamily: "'Inter', monospace", fontSize: 14, fontWeight: 500 }}>{prefix}</span>}
        <input
          type="text" inputMode="decimal" value={shown}
          onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "" || raw === "-" || raw === ".") { setDisplay(raw); onChange(0); return; }
            const num = Number(raw);
            if (!isNaN(num)) { setDisplay(raw); onChange(num); }
          }}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 15, fontFamily: "'Inter', monospace", fontWeight: 500, width: "100%" }}
        />
        {suffix && <span style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}>{suffix}</span>}
      </div>
    </div>
  );
}

function ResultCard({ label, value, accent, sub }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
      borderRadius: 12, padding: "16px 18px", flex: 1, minWidth: 140,
      border: accent ? "none" : "1px solid var(--border-input)",
    }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: accent ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 3, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

// ─── CALCULATORS ───
function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const totalContributed = principal + monthly * 12 * years;
  const r = rate / 100 / 12;
  const n = years * 12;
  const futureValue = principal * Math.pow(1 + r, n) + monthly * ((Math.pow(1 + r, n) - 1) / r);
  const interestEarned = futureValue - totalContributed;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Starting Amount" value={principal} onChange={setPrincipal} prefix="$" />
        <Input label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" />
        <Input label="Annual Return" value={rate} onChange={setRate} suffix="%" />
        <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <ResultCard label="Future Value" value={fmt(futureValue)} accent />
        <ResultCard label="Total Contributed" value={fmt(totalContributed)} />
        <ResultCard label="Interest Earned" value={fmt(interestEarned)} sub={pct((interestEarned / totalContributed) * 100) + " return"} />
      </div>
    </div>
  );
}

function MortgageCalc() {
  const [price, setPrice] = useState(400000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const loanAmount = price * (1 - down / 100);
  const r = rate / 100 / 12;
  const n = term * 12;
  const monthlyPayment = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPaid = monthlyPayment * n;
  const totalInterest = totalPaid - loanAmount;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Home Price" value={price} onChange={setPrice} prefix="$" />
        <Input label="Down Payment" value={down} onChange={setDown} suffix="%" />
        <Input label="Interest Rate" value={rate} onChange={setRate} suffix="%" />
        <Input label="Loan Term" value={term} onChange={setTerm} suffix="years" />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <ResultCard label="Monthly Payment" value={fmtD(monthlyPayment)} accent />
        <ResultCard label="Loan Amount" value={fmt(loanAmount)} />
        <ResultCard label="Total Interest" value={fmt(totalInterest)} sub={pct((totalInterest / loanAmount) * 100) + " of loan"} />
      </div>
    </div>
  );
}

function FireCalc() {
  const [age, setAge] = useState(30);
  const [savings, setSavings] = useState(50000);
  const [monthlySave, setMonthlySave] = useState(2000);
  const [expenses, setExpenses] = useState(40000);
  const [returnRate, setReturnRate] = useState(7);
  const fireNumber = expenses * 25;
  const r = returnRate / 100 / 12;
  let current = savings, months = 0;
  while (current < fireNumber && months < 600) { current = current * (1 + r) + monthlySave; months++; }
  const yearsToFire = months / 12;
  const fireAge = age + yearsToFire;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Current Age" value={age} onChange={setAge} suffix="years" />
        <Input label="Current Savings" value={savings} onChange={setSavings} prefix="$" />
        <Input label="Monthly Savings" value={monthlySave} onChange={setMonthlySave} prefix="$" />
        <Input label="Annual Expenses" value={expenses} onChange={setExpenses} prefix="$" />
        <Input label="Expected Return" value={returnRate} onChange={setReturnRate} suffix="%" />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <ResultCard label="FIRE Number" value={fmt(fireNumber)} accent />
        <ResultCard label="Years to FIRE" value={yearsToFire >= 50 ? "50+" : yearsToFire.toFixed(1)} sub={fireAge < 100 ? `At age ${Math.round(fireAge)}` : ""} />
        <ResultCard label="Monthly Savings Rate" value={pct((monthlySave * 12 / (expenses + monthlySave * 12)) * 100)} />
      </div>
    </div>
  );
}

function DebtPayoff() {
  const [balance, setBalance] = useState(8000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(300);
  const r = apr / 100 / 12;
  const minPayment = balance * r + 1;
  let months = 0, totalPaid = 0, remaining = balance;
  if (payment > balance * r) {
    while (remaining > 0 && months < 600) {
      const interest = remaining * r;
      const principal = Math.min(payment - interest, remaining);
      remaining -= principal; totalPaid += payment; months++;
    }
  }
  const totalInterest = totalPaid - balance;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Total Balance" value={balance} onChange={setBalance} prefix="$" />
        <Input label="Interest Rate (APR)" value={apr} onChange={setApr} suffix="%" />
        <Input label="Monthly Payment" value={payment} onChange={setPayment} prefix="$" />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <ResultCard label="Debt Free In" value={payment <= balance * r ? "∞" : `${Math.ceil(months / 12)}y ${months % 12}m`} accent />
        <ResultCard label="Total Interest" value={payment <= balance * r ? "Increase payment" : fmt(totalInterest)} />
        <ResultCard label="Total Paid" value={payment <= balance * r ? "—" : fmt(totalPaid)} sub={payment <= balance * r ? "" : pct((totalInterest / balance) * 100) + " interest cost"} />
      </div>
    </div>
  );
}

function SalaryBreakdown() {
  const [salary, setSalary] = useState(85000);
  const [state, setState] = useState(5);
  const [retirement, setRetirement] = useState(6);
  const [deductions, setDeductions] = useState(200);
  const standardDeduction = 15000;
  const taxableIncome = Math.max(0, salary - standardDeduction);
  const brackets = [[11600, 0.10], [47150 - 11600, 0.12], [100525 - 47150, 0.22], [191950 - 100525, 0.24], [243725 - 191950, 0.32], [609350 - 243725, 0.35], [Infinity, 0.37]];
  let federal = 0, remaining = taxableIncome;
  for (const [size, rate] of brackets) { const t = Math.min(remaining, size); federal += t * rate; remaining -= t; if (remaining <= 0) break; }
  const fica = salary * 0.0765;
  const stateTax = salary * (state / 100);
  const retirementAmt = salary * (retirement / 100);
  const totalTax = federal + fica + stateTax;
  const takeHome = (salary - totalTax - retirementAmt - deductions * 12);
  const monthlyTakeHome = takeHome / 12;
  const effectiveRate = (totalTax / salary) * 100;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Annual Salary" value={salary} onChange={setSalary} prefix="$" />
        <Input label="State Tax Rate" value={state} onChange={setState} suffix="%" />
        <Input label="401(k) Contribution" value={retirement} onChange={setRetirement} suffix="%" />
        <Input label="Monthly Deductions" value={deductions} onChange={setDeductions} prefix="$" sublabel="insurance, etc" />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <ResultCard label="Monthly Take-Home" value={fmtD(monthlyTakeHome)} accent />
        <ResultCard label="Annual Take-Home" value={fmt(takeHome)} />
        <ResultCard label="Effective Tax Rate" value={pct(effectiveRate)} sub={fmt(totalTax) + " total tax"} />
      </div>
    </div>
  );
}

function InvestComparison() {
  const [amount, setAmount] = useState(50000);
  const [years, setYears] = useState(10);
  const scenarios = [
    { name: "Savings Account", rate: 4.5, color: "var(--text-muted)" },
    { name: "Bond Index", rate: 5.5, color: "#3498db" },
    { name: "S&P 500 (avg)", rate: 10, color: "var(--accent)" },
    { name: "Growth Stocks", rate: 13, color: "#2ecc71" },
  ];
  const results = scenarios.map(s => ({
    ...s, value: amount * Math.pow(1 + s.rate / 100, years), gain: amount * Math.pow(1 + s.rate / 100, years) - amount,
  }));
  const maxVal = Math.max(...results.map(x => x.value));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Investment Amount" value={amount} onChange={setAmount} prefix="$" />
        <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" />
      </div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {results.map((r, i) => (
          <div key={i} style={{ background: "var(--bg-input)", borderRadius: 10, padding: "14px 16px", border: "1px solid var(--border-input)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>{r.name}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{r.rate}% annual</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: r.color, fontFamily: "'Inter', monospace" }}>{fmt(r.value)}</div>
                <div style={{ fontSize: 10, color: "var(--text-faint)" }}>+{fmt(r.gain)}</div>
              </div>
            </div>
            <div style={{ height: 5, background: "var(--bg-main)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(r.value / maxVal) * 100}%`, background: r.color, borderRadius: 3, transition: "width 0.5s" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CryptoPlanner() {
  const [investment, setInvestment] = useState(5000);
  const [monthlyDCA, setMonthlyDCA] = useState(200);
  const [years, setYears] = useState(5);
  const [scenario, setScenario] = useState("moderate");
  const scenarios = {
    conservative: { label: "Conservative", annual: 15, color: "#3498db", desc: "Slow adoption" },
    moderate: { label: "Moderate", annual: 30, color: "var(--accent)", desc: "Steady growth" },
    aggressive: { label: "Aggressive", annual: 55, color: "#2ecc71", desc: "Mass adoption" },
    bear: { label: "Bear Case", annual: -5, color: "#e74c3c", desc: "Decline" },
  };
  const results = Object.entries(scenarios).map(([key, s]) => {
    const r = s.annual / 100 / 12; const n = years * 12;
    let value = Math.abs(r) < 0.0001 ? investment + monthlyDCA * n : investment * Math.pow(1 + r, n) + monthlyDCA * ((Math.pow(1 + r, n) - 1) / r);
    const totalInvested = investment + monthlyDCA * n;
    return { key, ...s, value: Math.max(0, value), totalInvested, gain: Math.max(-totalInvested, value - totalInvested) };
  });
  const active = results.find(r => r.key === scenario);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Input label="Initial Investment" value={investment} onChange={setInvestment} prefix="$" />
        <Input label="Monthly DCA" value={monthlyDCA} onChange={setMonthlyDCA} prefix="$" />
        <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" />
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
        {results.map(s => (
          <button key={s.key} onClick={() => setScenario(s.key)} style={{
            flex: 1, minWidth: 70, padding: "8px 6px", borderRadius: 8, cursor: "pointer", fontSize: 11, textAlign: "center",
            background: scenario === s.key ? "var(--accent-bg)" : "var(--bg-input)",
            border: scenario === s.key ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
            color: scenario === s.key ? s.color : "var(--text-secondary)", fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
          }}>{s.label}</button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
        <ResultCard label="Portfolio Value" value={fmt(active.value)} accent />
        <ResultCard label="Total Invested" value={fmt(active.totalInvested)} />
        <ResultCard label={active.gain >= 0 ? "Total Gain" : "Total Loss"} value={fmt(Math.abs(active.gain))} />
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--bg-input)", borderRadius: 8, borderLeft: "3px solid #e74c3c", fontSize: 11, color: "var(--text-muted)", lineHeight: 1.5 }}>
        <strong style={{ color: "var(--text-secondary)" }}>⚠️</strong> Crypto is extremely volatile. These scenarios are illustrative only.
      </div>
    </div>
  );
}

const TOOLS_MAP = {
  compound: { name: "Compound Interest Calculator", component: CompoundInterest },
  mortgage: { name: "Mortgage Calculator", component: MortgageCalc },
  fire: { name: "FIRE Calculator", component: FireCalc },
  debt: { name: "Debt Payoff Calculator", component: DebtPayoff },
  salary: { name: "Salary Breakdown", component: SalaryBreakdown },
  invest: { name: "Investment Comparison", component: InvestComparison },
  crypto: { name: "Crypto Investment Planner", component: CryptoPlanner },
};

export default function WidgetPage({ tool = "mortgage", theme: themeProp }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Apply theme - force override even if ThemeProvider tries to set it
    const applyTheme = () => {
      const params = new URLSearchParams(window.location.search);
      const t = themeProp || params.get("theme") || "dark";
      document.documentElement.setAttribute("data-theme", t);
    };
    applyTheme();

    // Keep enforcing in case ThemeProvider overrides
    const observer = new MutationObserver(() => {
      const params = new URLSearchParams(window.location.search);
      const expected = themeProp || params.get("theme") || "dark";
      if (document.documentElement.getAttribute("data-theme") !== expected) {
        document.documentElement.setAttribute("data-theme", expected);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Send height to parent for auto-resizing iframe
    const sendHeight = () => {
      const h = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "pulsafi-resize", height: h }, "*");
    };
    const resizeObserver = new ResizeObserver(sendHeight);
    resizeObserver.observe(document.body);
    setMounted(true);
    return () => { observer.disconnect(); resizeObserver.disconnect(); };
  }, [themeProp]);

  const toolData = TOOLS_MAP[tool] || TOOLS_MAP.mortgage;
  const ToolComponent = toolData.component;

  if (!mounted) return null;

  return (
    <div style={{
      minHeight: "fit-content", background: "var(--bg-main)", color: "var(--text-primary)",
      fontFamily: "'DM Sans', sans-serif", padding: "20px",
    }}>

      <div style={{
        background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
        padding: "24px 22px 20px",
      }}>
        <h2 style={{ margin: "0 0 18px", fontSize: 17, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)" }}>
          {toolData.name}
        </h2>
        <ToolComponent />
      </div>

      {/* Powered by Pulsafi */}
      <a href="https://www.pulsafi.com?ref=widget" target="_blank" rel="noopener noreferrer" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        marginTop: 14, textDecoration: "none", opacity: 0.6, transition: "opacity 0.2s",
      }}
        onMouseOver={e => e.currentTarget.style.opacity = "1"}
        onMouseOut={e => e.currentTarget.style.opacity = "0.6"}
      >
        <div style={{
          width: 16, height: 16, borderRadius: 4,
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, fontWeight: 900, color: "#0d0f13", fontFamily: "'Playfair Display', serif",
        }}>P</div>
        <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif" }}>
          Powered by <strong style={{ color: "var(--text-muted)" }}>Pulsafi</strong>
        </span>
      </a>
    </div>
  );
}

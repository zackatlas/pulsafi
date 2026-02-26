"use client";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const TOOLS = [
  { id: "compound", name: "Compound Interest", icon: "📈", desc: "See your money grow over time" },
  { id: "mortgage", name: "Mortgage Calculator", icon: "🏠", desc: "Estimate monthly payments" },
  { id: "fire", name: "FIRE Calculator", icon: "🔥", desc: "When can you retire early?" },
  { id: "debt", name: "Debt Payoff", icon: "💳", desc: "Snowball vs avalanche strategy" },
  { id: "salary", name: "Salary Breakdown", icon: "💰", desc: "After-tax take-home pay" },
  { id: "invest", name: "Investment Returns", icon: "📊", desc: "Compare investment scenarios" },
  { id: "crypto", name: "Crypto Planner", icon: "₿", desc: "Model crypto investment outcomes" },
];

// ─── Formatters ───
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const pct = (n) => `${n.toFixed(1)}%`;

// ─── Reusable Input ───
function Input({ label, value, onChange, prefix, suffix, min, max, step = 1, sublabel }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
        {sublabel && <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.6, marginLeft: 6, fontSize: 11 }}>{sublabel}</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)", padding: "10px 14px", gap: 6, transition: "border-color 0.2s" }}>
        {prefix && <span style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 500 }}>{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min} max={max} step={step}
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

// ─── Mini Bar Chart ───
function MiniChart({ data, height = 140 }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height, padding: "16px 0" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{
            width: "100%", borderRadius: "4px 4px 0 0",
            height: `${(d.value / max) * (height - 36)}px`,
            background: d.highlight ? "linear-gradient(180deg, var(--accent), var(--accent-dark))" : "var(--bar-bg)",
            transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
            minHeight: 2,
          }} />
          <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── COMPOUND INTEREST ───
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
  const chartData = [];
  for (let y = 0; y <= years; y += Math.max(1, Math.floor(years / 12))) {
    const m = y * 12;
    const v = principal * Math.pow(1 + r, m) + monthly * ((Math.pow(1 + r, m) - 1) / (r || 1));
    chartData.push({ label: `Y${y}`, value: v, highlight: y === years });
  }
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Starting Amount" value={principal} onChange={setPrincipal} prefix="$" min={0} step={1000} />
        <Input label="Monthly Contribution" value={monthly} onChange={setMonthly} prefix="$" min={0} step={100} />
        <Input label="Annual Return" value={rate} onChange={setRate} suffix="%" min={0} max={30} step={0.5} />
        <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" min={1} max={50} />
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <ResultCard label="Future Value" value={fmt(futureValue)} accent />
        <ResultCard label="Total Contributed" value={fmt(totalContributed)} />
        <ResultCard label="Interest Earned" value={fmt(interestEarned)} sub={pct((interestEarned / totalContributed) * 100) + " return"} />
      </div>
      <MiniChart data={chartData} />
      <AdSpace />
    </div>
  );
}

// ─── MORTGAGE CALCULATOR ───
function MortgageCalc() {
  const [home, setHome] = useState(400000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);
  const loanAmt = home * (1 - down / 100);
  const r = rate / 100 / 12;
  const n = term * 12;
  const payment = r > 0 ? loanAmt * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : loanAmt / n;
  const totalPaid = payment * n;
  const totalInterest = totalPaid - loanAmt;
  const chartData = [];
  for (let y = 0; y <= term; y += Math.max(1, Math.floor(term / 10))) {
    const m = y * 12;
    const remaining = r > 0 ? loanAmt * (Math.pow(1 + r, n) - Math.pow(1 + r, m)) / (Math.pow(1 + r, n) - 1) : loanAmt * (1 - m / n);
    chartData.push({ label: `Y${y}`, value: Math.max(0, remaining), highlight: false });
  }
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Home Price" value={home} onChange={setHome} prefix="$" min={0} step={10000} />
        <Input label="Down Payment" value={down} onChange={setDown} suffix="%" min={0} max={100} step={1} />
        <Input label="Interest Rate" value={rate} onChange={setRate} suffix="%" min={0} max={15} step={0.125} />
        <Input label="Loan Term" value={term} onChange={setTerm} suffix="years" min={1} max={30} />
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <ResultCard label="Monthly Payment" value={fmtD(payment)} accent />
        <ResultCard label="Loan Amount" value={fmt(loanAmt)} />
        <ResultCard label="Total Interest" value={fmt(totalInterest)} sub={pct((totalInterest / loanAmt) * 100) + " of loan"} />
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
        <strong style={{ color: "var(--text-secondary)" }}>Balance Over Time</strong> — watch principal decrease
      </div>
      <MiniChart data={chartData} />
      <AdSpace />
    </div>
  );
}

// ─── FIRE CALCULATOR ───
function FireCalc() {
  const [age, setAge] = useState(30);
  const [savings, setSavings] = useState(50000);
  const [monthlySave, setMonthlySave] = useState(2000);
  const [annualExpense, setAnnualExpense] = useState(48000);
  const [returnRate, setReturnRate] = useState(7);
  const fireNumber = annualExpense * 25;
  const r = returnRate / 100 / 12;
  let balance = savings;
  let months = 0;
  while (balance < fireNumber && months < 600) {
    balance = balance * (1 + r) + monthlySave;
    months++;
  }
  const yearsToFire = months / 12;
  const fireAge = age + yearsToFire;
  const chartData = [];
  let b = savings;
  for (let m = 0; m <= months; m += Math.max(1, Math.floor(months / 12))) {
    let tempB = savings;
    for (let i = 0; i < m; i++) tempB = tempB * (1 + r) + monthlySave;
    chartData.push({ label: `${Math.round(age + m / 12)}`, value: tempB, highlight: m >= months - Math.floor(months / 12) });
  }
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Current Age" value={age} onChange={setAge} suffix="yrs" min={18} max={70} />
        <Input label="Current Savings" value={savings} onChange={setSavings} prefix="$" min={0} step={5000} />
        <Input label="Monthly Savings" value={monthlySave} onChange={setMonthlySave} prefix="$" min={0} step={100} />
        <Input label="Annual Expenses" value={annualExpense} onChange={setAnnualExpense} prefix="$" min={0} step={1000} />
        <Input label="Expected Return" value={returnRate} onChange={setReturnRate} suffix="%" min={0} max={15} step={0.5} />
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <ResultCard label="FIRE Number" value={fmt(fireNumber)} accent />
        <ResultCard label="Years to FIRE" value={yearsToFire >= 50 ? "50+" : yearsToFire.toFixed(1)} sub={yearsToFire < 50 ? `Retire at age ${Math.round(fireAge)}` : "Adjust your inputs"} />
        <ResultCard label="Monthly Savings Rate" value={pct((monthlySave * 12 / (annualExpense + monthlySave * 12)) * 100)} />
      </div>
      <MiniChart data={chartData} />
    </div>
  );
}

// ─── DEBT PAYOFF ───
function DebtPayoff() {
  const [balance, setBalance] = useState(15000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(500);
  const r = apr / 100 / 12;
  let bal = balance;
  let months = 0;
  let totalInterest = 0;
  while (bal > 0 && months < 600) {
    const interest = bal * r;
    totalInterest += interest;
    bal = bal + interest - payment;
    months++;
    if (payment <= bal * r) { months = Infinity; break; }
  }
  const totalPaid = months < 600 ? payment * months : Infinity;
  const chartData = [];
  bal = balance;
  for (let m = 0; m <= Math.min(months, 360); m += Math.max(1, Math.floor(Math.min(months, 360) / 12))) {
    let tempB = balance;
    for (let i = 0; i < m; i++) { tempB = tempB + tempB * r - payment; if (tempB < 0) tempB = 0; }
    chartData.push({ label: `M${m}`, value: tempB, highlight: false });
  }
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Total Balance" value={balance} onChange={setBalance} prefix="$" min={0} step={1000} />
        <Input label="APR" value={apr} onChange={setApr} suffix="%" min={0} max={40} step={0.5} />
        <Input label="Monthly Payment" value={payment} onChange={setPayment} prefix="$" min={1} step={50} />
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <ResultCard label="Debt Free In" value={months < 600 ? `${Math.ceil(months / 12)} yrs ${months % 12} mo` : "Never"} accent />
        <ResultCard label="Total Interest" value={months < 600 ? fmt(totalInterest) : "∞"} sub={months < 600 ? pct((totalInterest / balance) * 100) + " of balance" : "Payment too low"} />
        <ResultCard label="Total Paid" value={months < 600 ? fmt(totalPaid) : "∞"} />
      </div>
      <MiniChart data={chartData} />
      <AdSpace />
    </div>
  );
}

// ─── SALARY BREAKDOWN ───
function SalaryBreakdown() {
  const [salary, setSalary] = useState(85000);
  const [state, setState] = useState(5);
  const [retirement, setRetirement] = useState(6);
  const [deductions, setDeductions] = useState(200);
  const federal = salary <= 11600 ? salary * 0.10 :
    salary <= 47150 ? 1160 + (salary - 11600) * 0.12 :
    salary <= 100525 ? 5426 + (salary - 47150) * 0.22 :
    salary <= 191950 ? 17169 + (salary - 100525) * 0.24 :
    salary <= 243725 ? 39110 + (salary - 191950) * 0.32 : 55679 + (salary - 243725) * 0.35;
  const fica = salary * 0.0765;
  const stateTax = salary * (state / 100);
  const retirementAmt = salary * (retirement / 100);
  const annualDeductions = deductions * 12;
  const totalTax = federal + fica + stateTax;
  const takeHome = salary - totalTax - retirementAmt - annualDeductions;
  const monthlyTakeHome = takeHome / 12;
  const biweekly = takeHome / 26;
  const effectiveRate = (totalTax / salary) * 100;
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Annual Salary" value={salary} onChange={setSalary} prefix="$" min={0} step={5000} />
        <Input label="State Tax Rate" value={state} onChange={setState} suffix="%" min={0} max={13} step={0.5} />
        <Input label="401k Contribution" value={retirement} onChange={setRetirement} suffix="%" min={0} max={25} step={1} />
        <Input label="Other Deductions" value={deductions} onChange={setDeductions} prefix="$" suffix="/mo" min={0} step={50} />
      </div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <ResultCard label="Monthly Take-Home" value={fmtD(monthlyTakeHome)} accent />
        <ResultCard label="Biweekly Pay" value={fmtD(biweekly)} />
        <ResultCard label="Effective Tax Rate" value={pct(effectiveRate)} sub={fmt(totalTax) + " total tax"} />
      </div>
      <div style={{ marginTop: 20, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { label: "Federal Tax", value: federal, color: "#e74c3c" },
          { label: "FICA", value: fica, color: "#e67e22" },
          { label: "State Tax", value: stateTax, color: "#f1c40f" },
          { label: "401k", value: retirementAmt, color: "#2ecc71" },
          { label: "Take-Home", value: takeHome, color: "var(--accent)" },
        ].map((item, i) => (
          <div key={i} style={{ flex: 1, minWidth: 100, background: "var(--bg-input)", borderRadius: 10, padding: "12px 14px", borderLeft: `3px solid ${item.color}` }}>
            <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
            <div style={{ fontSize: 15, color: "var(--text-primary)", fontFamily: "'DM Mono', monospace", fontWeight: 600, marginTop: 4 }}>{fmt(item.value)}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", marginTop: 2 }}>{pct((item.value / salary) * 100)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── INVESTMENT COMPARISON ───
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
    ...s,
    value: amount * Math.pow(1 + s.rate / 100, years),
    gain: amount * Math.pow(1 + s.rate / 100, years) - amount,
  }));
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Investment Amount" value={amount} onChange={setAmount} prefix="$" min={0} step={5000} />
        <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" min={1} max={40} />
      </div>
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
        {results.map((r, i) => {
          const maxVal = Math.max(...results.map(x => x.value));
          return (
            <div key={i} style={{ background: "var(--bg-input)", borderRadius: 12, padding: "16px 18px", border: "1px solid var(--border-input)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 14, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{r.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>{r.rate}% annual return</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: r.color, fontFamily: "'DM Mono', monospace" }}>{fmt(r.value)}</div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif" }}>+{fmt(r.gain)}</div>
                </div>
              </div>
              <div style={{ height: 6, background: "var(--bg-main)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(r.value / maxVal) * 100}%`, background: r.color, borderRadius: 3, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
              </div>
            </div>
          );
        })}
      </div>
      <AdSpace />
    </div>
  );
}

// ─── CRYPTO INVESTMENT PLANNER ───
function CryptoPlanner() {
  const [investment, setInvestment] = useState(5000);
  const [monthlyDCA, setMonthlyDCA] = useState(200);
  const [years, setYears] = useState(5);
  const [scenario, setScenario] = useState("moderate");

  const scenarios = {
    conservative: { label: "Conservative", annual: 15, color: "#3498db", desc: "Slow adoption, heavy regulation" },
    moderate: { label: "Moderate", annual: 30, color: "var(--accent)", desc: "Steady growth, mainstream adoption" },
    aggressive: { label: "Aggressive", annual: 55, color: "#2ecc71", desc: "Mass adoption, institutional inflows" },
    bear: { label: "Bear Case", annual: -5, color: "#e74c3c", desc: "Regulatory crackdowns, declining interest" },
  };

  const results = Object.entries(scenarios).map(([key, s]) => {
    const r = s.annual / 100 / 12;
    const n = years * 12;
    let value;
    if (Math.abs(r) < 0.0001) {
      value = investment + monthlyDCA * n;
    } else {
      value = investment * Math.pow(1 + r, n) + monthlyDCA * ((Math.pow(1 + r, n) - 1) / r);
    }
    const totalInvested = investment + monthlyDCA * n;
    return { key, ...s, value: Math.max(0, value), totalInvested, gain: Math.max(-totalInvested, value - totalInvested) };
  });

  const active = results.find(r => r.key === scenario);
  const maxVal = Math.max(...results.map(r => r.value));

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Initial Investment" value={investment} onChange={setInvestment} prefix="$" min={0} step={1000} />
        <Input label="Monthly DCA" value={monthlyDCA} onChange={setMonthlyDCA} prefix="$" min={0} step={50} sublabel="Dollar-cost avg" />
        <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" min={1} max={20} />
      </div>

      {/* Scenario Selector */}
      <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
        {results.map(s => (
          <button key={s.key} onClick={() => setScenario(s.key)} style={{
            flex: 1, minWidth: 100, padding: "10px 12px", borderRadius: 10, cursor: "pointer",
            background: scenario === s.key ? "var(--accent-bg)" : "var(--bg-input)",
            border: scenario === s.key ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
            textAlign: "center", transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: scenario === s.key ? s.color : "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>{s.annual > 0 ? "+" : ""}{s.annual}%/yr</div>
          </button>
        ))}
      </div>

      {/* Results */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
        <ResultCard label="Portfolio Value" value={fmt(active.value)} accent />
        <ResultCard label="Total Invested" value={fmt(active.totalInvested)} />
        <ResultCard label={active.gain >= 0 ? "Total Gain" : "Total Loss"} value={fmt(Math.abs(active.gain))} sub={(active.gain >= 0 ? "+" : "-") + pct(Math.abs(active.gain / active.totalInvested) * 100)} />
      </div>

      {/* All Scenarios Comparison */}
      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
        {results.map((r, i) => (
          <div key={i} style={{ background: "var(--bg-input)", borderRadius: 10, padding: "14px 16px", border: scenario === r.key ? "1px solid var(--accent-border)" : "1px solid var(--border-input)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: r.color }}>{r.label}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>{r.desc}</span>
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: r.color, fontFamily: "'DM Mono', monospace" }}>{fmt(r.value)}</div>
            </div>
            <div style={{ height: 5, background: "var(--bg-main)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(r.value / maxVal) * 100}%`, background: r.color, borderRadius: 3, transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 16, padding: "12px 16px", background: "var(--bg-input)", borderRadius: 10,
        borderLeft: "3px solid #e74c3c", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6,
      }}>
        <strong style={{ color: "var(--text-secondary)" }}>⚠️ Important:</strong> Crypto is extremely volatile. Past returns don't predict future performance. These scenarios are illustrative only — actual returns could be significantly better or worse. Never invest more than you can afford to lose.
      </div>

      <AdSpace />
    </div>
  );
}

// ─── AD SPACE (Monetization Hooks) ───
function AdSpace() {
  return (
    <a href="/advertise" style={{
      display: "block", marginTop: 24, background: "var(--bg-input)",
      border: "1px dashed var(--border-input)", borderRadius: 14, padding: "16px 22px",
      textAlign: "center", textDecoration: "none", transition: "border-color 0.2s",
    }}>
      <div style={{ fontSize: 12, color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif" }}>
        📣 Want to reach our audience? <span style={{ color: "var(--accent)", fontWeight: 600 }}>Advertise with Pulsafi →</span>
      </div>
    </a>
  );
}

// ─── EMAIL CAPTURE ───
function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div style={{
      background: "linear-gradient(135deg, var(--bg-input) 0%, var(--bg-card) 100%)",
      border: "1px solid var(--border-input)", borderRadius: 18, padding: "36px 32px", textAlign: "center",
      marginTop: 40,
    }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>Free Weekly Newsletter</div>
      <h3 style={{ fontSize: 24, color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
        Smart Money Moves<br />Delivered Every Sunday
      </h3>
      <p style={{ color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", fontSize: 14, margin: "12px auto 24px", maxWidth: 420, lineHeight: 1.6 }}>
        Join readers getting actionable finance tips, market analysis, and wealth-building strategies. Free forever.
      </p>
      {!submitted ? (
        <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
          <input
            type="email" placeholder="your@email.com" value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1, minWidth: 200, background: "var(--bg-main)", border: "1px solid var(--border-input)", borderRadius: 10,
              padding: "12px 16px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
            }}
          />
          <button onClick={() => { if (email) { window.open(`https://magic.beehiiv.com/v1/af6bb24a-372c-43f4-af26-f7968d10bc1e?email=${encodeURIComponent(email)}`, '_blank'); setSubmitted(true); }}} style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", border: "none", borderRadius: 10,
            padding: "12px 28px", color: "var(--bg-main)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: 14, cursor: "pointer", whiteSpace: "nowrap",
          }}>Subscribe</button>
        </div>
      ) : (
        <div style={{ color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600 }}>
          ✓ You're in! Check your inbox.
        </div>
      )}
      <div style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif", marginTop: 14 }}>No spam. Unsubscribe anytime. We respect your privacy.</div>
    </div>
  );
}

// ─── MAIN APP ───
export default function Pulsafi() {
  const [activeTool, setActiveTool] = useState("compound");
  const [menuOpen, setMenuOpen] = useState(false);

  const tools = {
    compound: CompoundInterest,
    mortgage: MortgageCalc,
    fire: FireCalc,
    debt: DebtPayoff,
    salary: SalaryBreakdown,
    invest: InvestComparison,
    crypto: CryptoPlanner,
  };
  const ActiveComponent = tools[activeTool];
  const activeInfo = TOOLS.find(t => t.id === activeTool);

  return (
    <div style={{
      minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* ─── HEADER ─── */}
      <Header />

      {/* ─── HERO ─── */}
      <section style={{
        padding: "60px 24px 40px", textAlign: "center",
        background: "var(--hero-gradient)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Free Financial Tools
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 52px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 680, marginLeft: "auto", marginRight: "auto",
        }}>
          Make Smarter Money<br />Decisions, <span style={{ color: "var(--accent)" }}>Faster</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, margin: "16px auto 0", maxWidth: 500, lineHeight: 1.6 }}>
          Professional-grade calculators to plan mortgages, retirement, investments, and more. 100% free, no signup required.
        </p>
      </section>

      {/* ─── TOOL SELECTOR ─── */}
      <div style={{ padding: "0 24px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8,
          scrollbarWidth: "none",
        }}>
          {TOOLS.map(tool => (
            <button key={tool.id} onClick={() => setActiveTool(tool.id)} style={{
              background: activeTool === tool.id ? "var(--accent-bg)" : "var(--bg-card)",
              border: activeTool === tool.id ? "1px solid var(--accent-border)" : "1px solid var(--border-card)",
              borderRadius: 12, padding: "14px 18px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              minWidth: "fit-content",
            }}>
              <span style={{ fontSize: 18 }}>{tool.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: activeTool === tool.id ? "var(--accent)" : "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>{tool.name}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>{tool.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ─── ACTIVE TOOL ─── */}
      <main style={{ padding: "28px 24px 60px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{
          background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
          padding: "28px 28px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <span style={{ fontSize: 24 }}>{activeInfo.icon}</span>
            <div>
              <h2 style={{ margin: 0, fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, letterSpacing: "-0.01em" }}>{activeInfo.name}</h2>
              <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>{activeInfo.desc}</p>
            </div>
          </div>
          <ActiveComponent />
        </div>

        {/* ─── TRUST SIGNALS ─── */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 40, marginTop: 40, flexWrap: "wrap",
        }}>
          {[
            { num: "7", label: "Free Tools" },
            { num: "0", label: "Paywalls" },
            { num: "100%", label: "Free Forever" },
            { num: "0", label: "Data Sold" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{s.num}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ─── EMAIL CAPTURE ─── */}
        <EmailCapture />

        {/* ─── SEO CONTENT SECTION ─── */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "var(--text-primary)", fontWeight: 700, marginBottom: 16, textAlign: "center" }}>
            Why Pulsafi?
          </h3>
          <div style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.8 }}>
            <p>Financial decisions shouldn't require a finance degree. Pulsafi puts professional-grade tools in your hands — completely free. Whether you're calculating mortgage payments, planning early retirement with our FIRE calculator, or comparing investment strategies, we give you the numbers that matter.</p>
            <p>Unlike spreadsheets that take hours to set up, our calculators give you instant, accurate results with beautiful visualizations. No sign-up required, no hidden fees, no data sold.</p>
          </div>
        </div>

        {/* ─── FOOTER ─── */}
      </main>
      <Footer />
    </div>
  );
}

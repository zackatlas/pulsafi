"use client";
import { useState, useMemo } from "react";

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

function calcMonthlyPI(loan, ratePct, years) {
  if (loan <= 0 || years <= 0) return 0;
  const r = ratePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return loan / n;
  return loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function Input({ label, value, onChange, prefix, suffix }) {
  const [display, setDisplay] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const shown = focused ? display : String(value);
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 11, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 5, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-input)", borderRadius: 9, border: "1px solid var(--border-input)", padding: "9px 13px", gap: 6 }}>
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

function ResultCard({ label, value, sub, accent, warn }) {
  const bg = warn ? "linear-gradient(135deg, #c0392b, #8e2a1e)" : accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)";
  const valueColor = (warn || accent) ? "#fff" : "var(--text-primary)";
  const labelColor = (warn || accent) ? "rgba(255,255,255,0.75)" : "var(--text-secondary)";
  const subColor = (warn || accent) ? "rgba(255,255,255,0.65)" : "var(--text-muted)";
  return (
    <div style={{
      background: bg, borderRadius: 12, padding: "16px 18px", flex: 1, minWidth: 150,
      border: (warn || accent) ? "none" : "1px solid var(--border-input)",
    }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: labelColor, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: valueColor, fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: subColor, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function RefiClient({ stateSlug, stateName, stateClosingCosts, newRateDefault }) {
  const [currentBalance, setCurrentBalance] = useState(280000);
  const [currentRate, setCurrentRate] = useState(7.25);
  const [yearsLeft, setYearsLeft] = useState(27);
  const [newRate, setNewRate] = useState(Number(newRateDefault.toFixed(3)));
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(stateClosingCosts);
  const [rollIntoLoan, setRollIntoLoan] = useState(false);

  const result = useMemo(() => {
    const currentMonthly = calcMonthlyPI(currentBalance, currentRate, yearsLeft);
    const newLoanAmount = rollIntoLoan ? currentBalance + closingCosts : currentBalance;
    const newMonthly = calcMonthlyPI(newLoanAmount, newRate, newTerm);
    const monthlySavings = currentMonthly - newMonthly;
    const upfrontCost = rollIntoLoan ? 0 : closingCosts;
    const breakEvenMonths = monthlySavings > 0 && upfrontCost > 0
      ? Math.ceil(upfrontCost / monthlySavings)
      : (monthlySavings > 0 ? 0 : Infinity);
    const totalCurrentInterest = currentMonthly * yearsLeft * 12 - currentBalance;
    const totalNewInterest = newMonthly * newTerm * 12 - newLoanAmount;
    const lifetimeSavings = totalCurrentInterest - totalNewInterest - (rollIntoLoan ? 0 : closingCosts);
    return { currentMonthly, newMonthly, monthlySavings, breakEvenMonths, lifetimeSavings, totalCurrentInterest, totalNewInterest };
  }, [currentBalance, currentRate, yearsLeft, newRate, newTerm, closingCosts, rollIntoLoan]);

  const breakEvenLabel = result.breakEvenMonths === 0 ? "Immediate"
    : !isFinite(result.breakEvenMonths) ? "Never (no savings)"
    : result.breakEvenMonths < 12 ? `${result.breakEvenMonths} months`
    : `${(result.breakEvenMonths / 12).toFixed(1)} years`;

  const verdict = !isFinite(result.breakEvenMonths) ? { label: "Don't refinance", warn: true, sub: "New loan costs more per month" }
    : result.breakEvenMonths > 60 ? { label: "Probably not worth it", warn: true, sub: `${(result.breakEvenMonths / 12).toFixed(1)}-year break-even is too long` }
    : result.breakEvenMonths > 36 ? { label: "Marginal", sub: "Only refi if you're staying 5+ more years" }
    : result.breakEvenMonths > 24 ? { label: "Likely worth it", accent: true, sub: "Reasonable break-even period" }
    : { label: "Strong refi candidate", accent: true, sub: "Quick payback on closing costs" };

  return (
    <div style={{ background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)", padding: "26px 26px 22px", marginTop: 24, boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
        {stateName} Refinance Break-Even Calculator
      </h2>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 0, marginBottom: 18 }}>
        Compare your current mortgage to a new one. Closing costs default to the {stateName} average.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Input label="Current Loan Balance" value={currentBalance} onChange={setCurrentBalance} prefix="$" />
        <Input label="Current Interest Rate" value={currentRate} onChange={setCurrentRate} suffix="%" />
        <Input label="Years Remaining on Loan" value={yearsLeft} onChange={setYearsLeft} suffix="years" />
        <Input label="New Interest Rate" value={newRate} onChange={setNewRate} suffix="%" />
        <Input label="New Loan Term" value={newTerm} onChange={setNewTerm} suffix="years" />
        <Input label={`Closing Costs (${stateName} avg)`} value={closingCosts} onChange={setClosingCosts} prefix="$" />
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, marginBottom: 14, cursor: "pointer", fontSize: 13, color: "var(--text-secondary)" }}>
        <input type="checkbox" checked={rollIntoLoan} onChange={(e) => setRollIntoLoan(e.target.checked)} style={{ accentColor: "var(--accent)", width: 16, height: 16 }} />
        Roll closing costs into the new loan (no out-of-pocket)
      </label>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}>
        <ResultCard label="Verdict" value={verdict.label} sub={verdict.sub} accent={verdict.accent} warn={verdict.warn} />
        <ResultCard label="Break-Even" value={breakEvenLabel} sub={!isFinite(result.breakEvenMonths) ? "" : "to recoup closing costs"} />
        <ResultCard label="Monthly Savings" value={result.monthlySavings >= 0 ? fmtD(result.monthlySavings) : `-${fmtD(Math.abs(result.monthlySavings))}`} sub={result.monthlySavings >= 0 ? "lower payment" : "higher payment"} />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
        <ResultCard label="Current P&I" value={fmtD(result.currentMonthly)} sub={`${currentRate.toFixed(3)}% over ${yearsLeft}y`} />
        <ResultCard label="New P&I" value={fmtD(result.newMonthly)} sub={`${newRate.toFixed(3)}% over ${newTerm}y`} />
        <ResultCard label="Lifetime Savings" value={result.lifetimeSavings >= 0 ? fmt(result.lifetimeSavings) : `-${fmt(Math.abs(result.lifetimeSavings))}`} sub="net of closing costs" />
      </div>
    </div>
  );
}

// Server component. Renders a state-specific housing and tax snapshot so each
// state rate page carries data that is genuinely different from every other
// state's: Zillow median home value + 12-month change, the monthly payment and
// income needed at TODAY'S 30-year rate, property tax and insurance, the
// state's first-time-buyer program, state income tax on interest, and the
// state's largest metros.
import { HOME_AFFORDABILITY } from "../data/homeAffordability";
import { STATE_FTHB_PROGRAMS } from "../data/firstTimeHomebuyerData";
import stateTaxData from "../data/stateTaxData";
import { formatRateDate } from "../../lib/fredRates";

const HOME_PRICES = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000];

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const pct = (n, d = 1) => `${n > 0 ? "+" : ""}${n.toFixed(d)}%`;

function monthlyPI(loan, ratePct, years = 30) {
  const r = ratePct / 100 / 12, n = years * 12;
  return loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function Stat({ label, value, sub, accent }) {
  return (
    <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "14px 16px" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace", color: accent ? "var(--accent)" : "var(--text-primary)", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function StateSnapshot({ stateSlug, stateName, rates, variant = "mortgage" }) {
  const st = HOME_AFFORDABILITY.states.find(s => s.slug === stateSlug);
  if (!st) return null;

  const rate30 = rates.mortgage30.value;
  const rateDate = formatRateDate(rates.mortgage30.date);
  const price = st.medianHomeValue;
  const loan = price * 0.8;
  const pi = monthlyPI(loan, rate30);
  const tax = price * st.propertyTaxRate / 100 / 12;
  const ins = st.annualInsurance / 12;
  const piti = pi + tax + ins;
  const incomeNeeded = Math.round(piti * 12 / 0.28 / 100) * 100;
  const national = HOME_AFFORDABILITY.national;
  const vsNational = (price / national.medianHomeValue - 1) * 100;
  const fthb = STATE_FTHB_PROGRAMS[stateSlug];
  const taxInfo = stateTaxData[stateSlug === "district-of-columbia" ? "dc" : stateSlug.replace(/-/g, "")]; // stateTaxData keys are unhyphenated
  const stateIncomeTax = taxInfo ? taxInfo.rate : 0;
  const nearestPrice = HOME_PRICES.reduce((a, b) => Math.abs(b - price) < Math.abs(a - price) ? b : a);
  const zhviMonth = new Date(HOME_AFFORDABILITY.zhviMonth + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  // Interest-taxation math for the savings / CD variants
  const topSavings = 4.20, topCd = 4.40;
  const t1y = rates.t1y.value;
  const afterTax = (apy, stateTaxed) => apy * (1 - 0.24 - (stateTaxed ? stateIncomeTax / 100 : 0));

  const isMoney = variant === "cd" || variant === "savings";

  return (
    <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--accent-border)", borderRadius: 16, padding: "24px 26px" }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent)", fontWeight: 700, marginBottom: 6 }}>
        {stateName} snapshot
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
        {isMoney ? `What ${stateName} does to your interest — and what a home here costs` : `What a median ${stateName} home costs at today's rate`}
      </h2>
      <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
        Zillow Home Value Index for {stateName}, {zhviMonth}, combined with the Freddie Mac 30-year rate of {rate30.toFixed(2)}% ({rateDate}), {stateName}'s {st.propertyTaxRate.toFixed(2)}% effective property tax rate, and a {fmt(st.annualInsurance)}/yr average insurance premium.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
        <Stat label="Median home value" value={fmt(price)} sub={`${pct(st.yoyChangePct)} vs. a year ago · ${vsNational >= 0 ? "+" : ""}${vsNational.toFixed(0)}% vs. US`} accent />
        {isMoney ? (
          <>
            <Stat label="State tax on interest" value={stateIncomeTax === 0 ? "0%" : `up to ${stateIncomeTax}%`} sub={stateIncomeTax === 0 ? "No state income tax" : "Top marginal rate"} />
            <Stat label={`${topSavings.toFixed(2)}% HYSA, after tax`} value={`${afterTax(topSavings, true).toFixed(2)}%`} sub="24% federal + state" />
            <Stat label={`${t1y.toFixed(2)}% 1-yr Treasury, after tax`} value={`${afterTax(t1y, false).toFixed(2)}%`} sub="State-tax exempt" />
            <Stat label="20% down on a median home" value={fmt(price * 0.2)} sub="What a down-payment fund needs to reach" />
          </>
        ) : (
          <>
            <Stat label="Monthly payment (20% down)" value={fmt(piti)} sub={`P&I ${fmt(pi)} · tax ${fmt(tax)} · ins. ${fmt(ins)}`} />
            <Stat label="Income needed" value={fmt(incomeNeeded)} sub="Payment ≤ 28% of gross income" />
            <Stat label="Annual property tax" value={fmt(price * st.propertyTaxRate / 100)} sub={`${st.propertyTaxRate.toFixed(2)}% effective rate`} />
            {variant === "heloc" ? (
              <Stat label="Tappable equity (80% CLTV)" value={fmt(price * 0.8 - price * 0.6)} sub="If you owe 60% of value" />
            ) : (
              <Stat label="Down payment (20%)" value={fmt(price * 0.2)} sub={`Loan amount ${fmt(loan)}`} />
            )}
          </>
        )}
      </div>

      {st.topMetros.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>Largest {stateName} metros (Zillow median · income needed at 20% down)</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {st.topMetros.map(m => (
              <a key={m.slug} href={m.citySlug ? `/cost-of-living/${m.citySlug}` : "/research/salary-needed-to-buy-a-home-2026"} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text-primary)", textDecoration: "none" }}>
                <strong>{m.metro}</strong> · {fmt(m.medianHomeValue)} · needs {fmt(m.incomeNeeded)}
              </a>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 8 }}>
        {fthb && !isMoney && (
          <a href={`/first-time-homebuyer/${stateSlug}`} style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text-primary)", textDecoration: "none" }}>
            🏠 {fthb.program}: up to {fthb.dpaPct}% down-payment help ({fthb.dpaForm}) →
          </a>
        )}
        <a href={`/mortgage/${stateSlug}-${nearestPrice}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text-primary)", textDecoration: "none" }}>
          Full payment breakdown on a {fmt(nearestPrice)} {stateName} home →
        </a>
        <a href="/research/salary-needed-to-buy-a-home-2026" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 12px", fontSize: 13, color: "var(--text-primary)", textDecoration: "none" }}>
          Compare all 50 states and 100 metros →
        </a>
      </div>
    </section>
  );
}

import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AffiliateOffer from "../../../components/AffiliateOffer";
import EmailCapture from "../../../components/EmailCapture";
import HeaderPulseStrip from "../../../components/v3/HeaderPulseStrip";
import LiveTickerPill from "../../../components/v3/LiveTickerPill";
import LivingValue from "../../../components/v3/LivingValue";
import PulseDivider from "../../../components/designv2/PulseDivider";
import {
  STATE_PROPERTY_TAX_RATES,
  STATE_INSURANCE_RATES,
  MORTGAGE_RATES,
} from "../../../data/mortgageData";
import { trailFromHistory, SAMPLE_30YR_RATE_30D, SAMPLE_CA_30YR_30D } from "../../../../lib/pulseSignatures";

const STATE_NAMES = {
  "alabama": "Alabama", "alaska": "Alaska", "arizona": "Arizona", "arkansas": "Arkansas",
  "california": "California", "colorado": "Colorado", "connecticut": "Connecticut",
  "delaware": "Delaware", "district-of-columbia": "District of Columbia", "florida": "Florida",
  "georgia": "Georgia", "hawaii": "Hawaii", "idaho": "Idaho", "illinois": "Illinois",
  "indiana": "Indiana", "iowa": "Iowa", "kansas": "Kansas", "kentucky": "Kentucky",
  "louisiana": "Louisiana", "maine": "Maine", "maryland": "Maryland", "massachusetts": "Massachusetts",
  "michigan": "Michigan", "minnesota": "Minnesota", "mississippi": "Mississippi",
  "missouri": "Missouri", "montana": "Montana", "nebraska": "Nebraska", "nevada": "Nevada",
  "new-hampshire": "New Hampshire", "new-jersey": "New Jersey", "new-mexico": "New Mexico",
  "new-york": "New York", "north-carolina": "North Carolina", "north-dakota": "North Dakota",
  "ohio": "Ohio", "oklahoma": "Oklahoma", "oregon": "Oregon", "pennsylvania": "Pennsylvania",
  "rhode-island": "Rhode Island", "south-carolina": "South Carolina", "south-dakota": "South Dakota",
  "tennessee": "Tennessee", "texas": "Texas", "utah": "Utah", "vermont": "Vermont",
  "virginia": "Virginia", "washington": "Washington", "west-virginia": "West Virginia",
  "wisconsin": "Wisconsin", "wyoming": "Wyoming",
};

export const dynamicParams = false;
export function generateStaticParams() {
  return [{ state: "california" }, { state: "texas" }, { state: "florida" }];
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

function calcMonthlyPI(loan, ratePct, years) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  return loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export async function generateMetadata({ params }) {
  const { state } = await params;
  const name = STATE_NAMES[state];
  if (!name) return {};
  return {
    title: `${name} Mortgage Rates · Pulsafi v3 preview`,
    description: `v3 preview — futuristic refinement of the existing ${name} mortgage rates page.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/v3/best-mortgage-rates/${state}` },
  };
}

export default async function MortgageRatesV3({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const propertyTaxRate = STATE_PROPERTY_TAX_RATES[state];
  const insuranceAnnual = STATE_INSURANCE_RATES[state];
  const samplePrice = 400000;
  const sampleDownPct = 20;
  const sampleLoan = samplePrice * (1 - sampleDownPct / 100);
  const baseRate30 = state === "california" ? 6.755 : MORTGAGE_RATES["30yr_fixed"];
  const baseRate15 = state === "california" ? 6.005 : MORTGAGE_RATES["15yr_fixed"];
  const monthlyPI30 = calcMonthlyPI(sampleLoan, baseRate30, 30);
  const monthlyPI15 = calcMonthlyPI(sampleLoan, baseRate15, 15);
  const monthlyTax = (samplePrice * propertyTaxRate / 100) / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const totalMonthly30 = monthlyPI30 + monthlyTax + monthlyInsurance;
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const headerSig = trailFromHistory(state === "california" ? SAMPLE_CA_30YR_30D : SAMPLE_30YR_RATE_30D, { points: 60 });
  const trendVsNational = baseRate30 - MORTGAGE_RATES["30yr_fixed"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* Subtle pulse strip below the header — works in light + dark */}
      <HeaderPulseStrip signature={headerSig} />

      {/* Hero */}
      <section style={{ padding: "60px 24px 32px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <LiveTickerPill
            label={`${stateName} 30yr fixed`}
            value={`${baseRate30.toFixed(3)}%`}
            trend={`${Math.abs(trendVsNational).toFixed(3)}% vs natl`}
            trendDirection={trendVsNational < 0 ? "down" : "up"}
            showTime
          />
        </div>

        <h1 style={{
          fontSize: "clamp(36px, 5.5vw, 56px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 300,
          margin: "0 0 16px",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
        }}>
          Best Mortgage Rates in <em style={{ fontStyle: "italic", color: "var(--accent)", fontWeight: 400 }}>{stateName}</em>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Live rates updated through {updated}. Compare current 30-year, 15-year, and ARM mortgage offers, with state-specific property tax and insurance built in.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Affiliate slot — same as production */}
        <AffiliateOffer category="mortgage" placement={`v3-best-rates-${state}-top`} variant="card" />

        {/* Pulse divider between sections — subtle, brand identity */}
        <div style={{ margin: "28px 0 20px" }}>
          <PulseDivider height={36} />
        </div>

        {/* Rate snapshot — with one big living number */}
        <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "28px 28px 24px" }}>
          <div style={{ textAlign: "center", paddingBottom: 24, borderBottom: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)", fontWeight: 600, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
              30-year fixed · {stateName}
            </div>
            <div style={{
              fontSize: "clamp(60px, 9vw, 104px)",
              fontFamily: "'Inter', monospace",
              fontWeight: 200,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              background: "linear-gradient(180deg, var(--accent), var(--accent-dark))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              <LivingValue value={baseRate30} format="percent3" flutterAmount={0.003} />
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 12, letterSpacing: "0.04em" }}>
              National avg: {MORTGAGE_RATES["30yr_fixed"].toFixed(3)}% · {trendVsNational < 0 ? "↓" : "↑"} {Math.abs(trendVsNational).toFixed(3)}% {trendVsNational < 0 ? "below" : "above"}
            </div>
          </div>

          {/* Secondary terms — micro-living too */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, marginTop: 16 }}>
            {[
              { label: "15-year fixed", value: baseRate15, flutter: 0.003 },
              { label: "5/1 ARM", value: MORTGAGE_RATES["5yr_arm"], flutter: 0.004 },
            ].map((row, i) => (
              <div key={i} style={{
                padding: "16px 22px",
                borderRight: i === 0 ? "1px solid var(--border-card)" : "none",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 6 }}>{row.label}</div>
                <div style={{ fontSize: 28, fontFamily: "'Inter', monospace", fontWeight: 300, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                  <LivingValue value={row.value} format="percent3" flutterAmount={row.flutter} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pulse divider */}
        <div style={{ margin: "32px 0 20px" }}>
          <PulseDivider height={36} />
        </div>

        {/* Sample monthly payment — keeps existing structure */}
        <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, margin: "0 0 14px", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Sample Monthly Payment in {stateName}
          </h2>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18, lineHeight: 1.6 }}>
            On a {fmt(samplePrice)} home with {sampleDownPct}% down ({fmt(sampleLoan)} loan), 30-year fixed.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { label: "Principal & Interest", value: fmtD(monthlyPI30) },
              { label: `Property Tax (${propertyTaxRate.toFixed(2)}%)`, value: fmtD(monthlyTax) },
              { label: "Homeowners Insurance", value: fmtD(monthlyInsurance) },
              { label: "Total Monthly Payment", value: fmtD(totalMonthly30), accent: true },
            ].map((row, i) => (
              <div key={i} style={{
                background: row.accent ? "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" : "var(--bg-input)",
                border: row.accent ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                borderRadius: 10, padding: "14px 16px",
                transition: "transform 0.2s ease",
              }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: row.accent ? "var(--accent)" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.01em" }}>{row.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pulse divider */}
        <div style={{ margin: "32px 0 20px" }}>
          <PulseDivider height={36} />
        </div>

        {/* 15 vs 30 — same idea, refined typography */}
        <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 500, margin: "0 0 14px", color: "var(--text-primary)" }}>
            15-Year vs 30-Year in {stateName}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[
              { term: "30-year", monthly: monthlyPI30, totalInterest: monthlyPI30 * 360 - sampleLoan, primary: false },
              { term: "15-year", monthly: monthlyPI15, totalInterest: monthlyPI15 * 180 - sampleLoan, primary: true },
            ].map((opt, i) => (
              <div key={i} style={{
                background: "var(--bg-input)",
                border: opt.primary ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                borderRadius: 10, padding: "16px 18px",
              }}>
                <div style={{ fontSize: 11, color: opt.primary ? "var(--accent)" : "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4, fontWeight: 700 }}>{opt.term} P&I</div>
                <div style={{ fontSize: 26, fontWeight: 300, fontFamily: "'Inter', monospace", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>{fmtD(opt.monthly)}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>Total interest: {fmt(opt.totalInterest)}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pulse divider */}
        <div style={{ margin: "32px 0 20px" }}>
          <PulseDivider height={36} />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 16, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 500, color: "var(--text-primary)", marginBottom: 12 }}>
            How to Get the Best Mortgage Rate in {stateName}
          </h2>
          <p style={{ marginBottom: 16 }}>
            Mortgage rates in {stateName} closely track national averages, but the total monthly cost varies sharply because of state-specific property taxes ({propertyTaxRate.toFixed(2)}%) and insurance premiums (averaging {fmt(insuranceAnnual)}/year). To get the lowest rate available to you, compare offers from at least three lenders — small differences in APR add up to tens of thousands over a 30-year term.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>What rate can I qualify for?</h3>
          <p style={{ marginBottom: 16 }}>
            Lenders price your rate primarily on credit score, debt-to-income ratio, and loan-to-value ratio. A FICO score above 760 with 20% down typically qualifies for the best advertised rates. Below 680, expect a rate at least 0.5–1.0 percentage points higher than the headline average.
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`v3-best-mortgage-rates/${state}`}
            headline={`Track ${stateName} mortgage rates`}
            subhead="Weekly rate updates, lender comparisons, and home-buying tools delivered to your inbox."
          />
        </div>

      </main>
      <Footer />
    </div>
  );
}

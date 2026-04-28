import { notFound } from "next/navigation";
import PageShell from "../../../components/v2/PageShell";
import HeaderV2 from "../../../components/v2/HeaderV2";
import FooterV2 from "../../../components/v2/FooterV2";
import DataPulse from "../../../components/v2/DataPulse";
import HeroNumber from "../../../components/v2/HeroNumber";
import SectionHeading from "../../../components/v2/SectionHeading";
import MetricRow from "../../../components/v2/MetricRow";
import LenderCompare from "../../../components/v2/LenderCompare";
import {
  trailFromHistory,
  SAMPLE_30YR_RATE_30D,
  SAMPLE_CA_30YR_30D,
} from "../../../../lib/pulseSignatures";
import { STATE_PROPERTY_TAX_RATES, MORTGAGE_RATES } from "../../../data/mortgageData";

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
  // Only pre-render California for v2 preview; rest of states still served by /best-mortgage-rates/[state]
  return [{ state: "california" }];
}

export async function generateMetadata({ params }) {
  const { state } = await params;
  const name = STATE_NAMES[state];
  if (!name) return {};
  return {
    title: `${name} Mortgage Rates — Pulsafi`,
    description: `Live ${name} mortgage rates with 30-day pulse. State-aware property tax, lender comparison, and break-even tools.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/v2/best-mortgage-rates/${state}` },
  };
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const SECTION = { padding: "0 32px", maxWidth: 980, margin: "0 auto" };

export default async function StateRatesV2({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const stateRate = state === "california" ? 6.755 : MORTGAGE_RATES["30yr_fixed"];
  const nationalRate = MORTGAGE_RATES["30yr_fixed"];
  const divergence = stateRate - nationalRate;
  const propertyTax = STATE_PROPERTY_TAX_RATES[state];

  const headerSig = trailFromHistory(SAMPLE_CA_30YR_30D, { points: 60 });
  const stateSig = trailFromHistory(SAMPLE_CA_30YR_30D, { points: 80 });
  const nationalSig = trailFromHistory(SAMPLE_30YR_RATE_30D, { points: 80 });

  return (
    <PageShell>
      <HeaderV2
        signature={headerSig}
        liveLabel={`${stateName} 30yr`}
        liveValue={`${stateRate.toFixed(3)}%`}
        liveTrend={`${divergence >= 0 ? "+" : ""}${divergence.toFixed(3)}% vs natl`}
        trendDirection={divergence < 0 ? "down" : "up"}
      />

      {/* Hero — text only, big and clear */}
      <section style={{ ...SECTION, padding: "80px 32px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 22, fontFamily: "'DM Sans', sans-serif" }}>
          {stateName} · Live mortgage rates
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(38px, 6vw, 64px)",
          fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.03em",
          margin: "0 0 32px", color: "#e8e8eb",
        }}>
          Today's mortgage rates<br />
          <em style={{ fontStyle: "italic", color: "#f0c14a", fontWeight: 300 }}>in {stateName}</em>
        </h1>

        <HeroNumber
          eyebrow={`30-year fixed · ${stateName}`}
          primary={`${stateRate.toFixed(3)}%`}
          helper={`National avg: ${nationalRate.toFixed(3)}%`}
          trend={`${Math.abs(divergence).toFixed(3)}% ${divergence < 0 ? "below" : "above"} national`}
          trendDirection={divergence < 0 ? "down" : "up"}
          size="lg"
        />
      </section>

      {/* Dual pulse — state vs national */}
      <section style={{ ...SECTION, padding: "32px 32px 60px" }}>
        <div style={{ position: "relative", height: 180, marginBottom: 24 }}>
          {/* National in dim white, state in gold — overlaid on same axis */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.5 }}>
            <DataPulse signature={nationalSig} variant="trail" height={180} glow={false} color="#a8aab0" />
          </div>
          <div style={{ position: "absolute", inset: 0 }}>
            <DataPulse signature={stateSig} variant="trail" height={180} color="#f0c14a" />
          </div>
        </div>
        <div style={{
          display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap",
          fontSize: 12, color: "rgba(232,232,235,0.6)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 2, background: "linear-gradient(90deg, #d4a829, #f0c14a)", boxShadow: "0 0 4px rgba(240,193,74,0.5)" }} />
            <span>{stateName} · {stateRate.toFixed(3)}%</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 18, height: 1, background: "rgba(168,170,176,0.5)" }} />
            <span>National avg · {nationalRate.toFixed(3)}%</span>
          </div>
        </div>
      </section>

      {/* Lender comparison */}
      <section style={{ ...SECTION, padding: "20px 32px" }}>
        <LenderCompare title={`Top mortgage lenders for ${stateName} buyers`} />
      </section>

      {/* State-specific metrics */}
      <section style={{ ...SECTION, padding: "60px 32px" }}>
        <SectionHeading
          eyebrow="The numbers behind the rate"
          title={`What it actually costs in ${stateName}`}
          subtitle={`Property tax, sample monthly payment, and 30-year cost on a typical ${stateName} home.`}
        />
        <MetricRow
          items={[
            { label: "Property tax", value: `${propertyTax.toFixed(2)}%`, sub: "annual · home value", accent: true },
            { label: "Sample home", value: fmt(550000), sub: "median listed" },
            { label: "20% down", value: fmt(110000), sub: "avg in metro" },
            { label: "Monthly P&I", value: fmt(2856), sub: "30-year @ rate" },
          ]}
        />
      </section>

      {/* 15 vs 30 */}
      <section style={{ ...SECTION, padding: "60px 32px" }}>
        <SectionHeading
          eyebrow="15 vs 30"
          title={`Two terms. Two pulses. One choice.`}
          subtitle="Compare lifetime cost and monthly burden side by side."
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { term: "30-year", monthly: 2856, totalInterest: 588160, primary: false },
            { term: "15-year", monthly: 4084, totalInterest: 295120, primary: true },
          ].map((opt, i) => (
            <div key={i} style={{
              padding: "26px 26px",
              border: opt.primary ? "1px solid rgba(240,193,74,0.4)" : "1px solid rgba(212,168,41,0.1)",
              borderRadius: 14,
              background: "rgba(8,9,12,0.4)",
            }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: opt.primary ? "#f0c14a" : "rgba(232,232,235,0.5)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 700 }}>
                {opt.term} fixed
              </div>
              <div style={{ fontSize: 36, fontFamily: "'Inter', monospace", fontWeight: 300, color: "#e8e8eb", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {fmt(opt.monthly)}<span style={{ fontSize: 14, color: "rgba(232,232,235,0.5)", marginLeft: 4 }}>/mo</span>
              </div>
              <div style={{ fontSize: 12, color: "rgba(232,232,235,0.55)", marginTop: 12, lineHeight: 1.6 }}>
                Total interest: <span style={{ fontFamily: "'Inter', monospace", color: "#e8e8eb" }}>{fmt(opt.totalInterest)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article */}
      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <SectionHeading
          eyebrow="The context"
          title={`Getting the best mortgage rate in ${stateName}`}
          align="left"
        />
        <div style={{ fontSize: 16, color: "rgba(232,232,235,0.78)", lineHeight: 1.85 }}>
          <p style={{ margin: "0 0 18px" }}>
            Mortgage rates in {stateName} closely track national averages, but the total monthly cost varies sharply because of state-specific property taxes ({propertyTax.toFixed(2)}%) and insurance premiums. To get the lowest rate available to you, compare offers from at least three lenders — small differences in APR add up to tens of thousands over a 30-year term.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Lenders price your rate primarily on credit score, debt-to-income ratio, and loan-to-value ratio. A FICO score above 760 with 20% down typically qualifies for the best advertised rates. Below 680, expect a rate at least 0.5–1.0 percentage points higher than the headline average.
          </p>
          <p style={{ margin: 0 }}>
            One discount point typically costs 1% of your loan and reduces your rate by ~0.25%. The breakeven is usually 5–7 years; if you'll stay in the {stateName} home longer than that, points often save money.
          </p>
        </div>
      </section>

      <FooterV2 />
    </PageShell>
  );
}

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffiliateOffer from "../../components/AffiliateOffer";
import EmailCapture from "../../components/EmailCapture";
import {
  STATE_PROPERTY_TAX_RATES,
  STATE_INSURANCE_RATES,
  MORTGAGE_RATES,
} from "../../data/mortgageData";

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
  return Object.keys(STATE_NAMES).map(state => ({ state }));
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
  const rate30 = MORTGAGE_RATES["30yr_fixed"];
  return {
    title: `Best Mortgage Rates in ${name} (${new Date().getFullYear()}) — Compare Lenders`,
    description: `Today's best mortgage rates in ${name}. 30-year fixed at ${rate30.toFixed(3)}% (avg). Compare offers from top lenders, see ${name} property taxes, insurance, and monthly payment estimates.`,
    alternates: { canonical: `/best-mortgage-rates/${state}` },
    openGraph: {
      title: `Best Mortgage Rates in ${name} — ${new Date().getFullYear()}`,
      description: `Compare ${name} mortgage rates, property taxes, insurance, and lender offers.`,
      url: `https://www.pulsafi.com/best-mortgage-rates/${state}`,
    },
  };
}

export default async function BestMortgageRatesPage({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const propertyTaxRate = STATE_PROPERTY_TAX_RATES[state];
  const insuranceAnnual = STATE_INSURANCE_RATES[state];
  const samplePrice = 400000;
  const sampleDownPct = 20;
  const sampleLoan = samplePrice * (1 - sampleDownPct / 100);
  const monthlyPI30 = calcMonthlyPI(sampleLoan, MORTGAGE_RATES["30yr_fixed"], 30);
  const monthlyPI15 = calcMonthlyPI(sampleLoan, MORTGAGE_RATES["15yr_fixed"], 15);
  const monthlyTax = (samplePrice * propertyTaxRate / 100) / 12;
  const monthlyInsurance = insuranceAnnual / 12;
  const totalMonthly30 = monthlyPI30 + monthlyTax + monthlyInsurance;
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the average mortgage rate in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `As of ${updated}, the average 30-year fixed mortgage rate in ${stateName} is approximately ${MORTGAGE_RATES["30yr_fixed"].toFixed(3)}%, with 15-year fixed rates around ${MORTGAGE_RATES["15yr_fixed"].toFixed(3)}%. Actual rates depend on credit score, down payment, and lender.`,
        },
      },
      {
        "@type": "Question",
        "name": `What are property taxes in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${stateName} has an average effective property tax rate of ${propertyTaxRate.toFixed(2)}% of home value annually. On a ${fmt(samplePrice)} home, that's about ${fmt(samplePrice * propertyTaxRate / 100)}/year.`,
        },
      },
      {
        "@type": "Question",
        "name": `How much does homeowners insurance cost in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The average annual homeowners insurance premium in ${stateName} is approximately ${fmt(insuranceAnnual)}, or ${fmt(monthlyInsurance)}/month.`,
        },
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: "60px 24px 32px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Updated {updated}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Best Mortgage Rates in {stateName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Compare current 30-year, 15-year, and ARM mortgage rates in {stateName}. See property taxes, insurance estimates, and monthly payment scenarios.
        </p>
      </section>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Lender comparison — affiliate placement */}
        <AffiliateOffer category="mortgage" placement={`best-rates-${state}-top`} variant="card" />

        {/* Rate table */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            Today's Average Rates — {stateName}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
            National averages for {stateName} residents. Your rate depends on credit, down payment, and lender.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
            {[
              { label: "30-Year Fixed", rate: MORTGAGE_RATES["30yr_fixed"], accent: true },
              { label: "15-Year Fixed", rate: MORTGAGE_RATES["15yr_fixed"] },
              { label: "5/1 ARM", rate: MORTGAGE_RATES["5yr_arm"] },
            ].map((row, i) => (
              <div key={i} style={{
                background: row.accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
                border: row.accent ? "none" : "1px solid var(--border-input)",
                borderRadius: 12, padding: "16px 18px",
              }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: row.accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: row.accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{row.rate.toFixed(3)}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample monthly payment */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>
            Sample Monthly Payment in {stateName}
          </h2>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
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
              }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{row.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 15 vs 30 comparison */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>
            15-Year vs 30-Year in {stateName}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>30-year P&amp;I</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace" }}>{fmtD(monthlyPI30)}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>Total interest: {fmt(monthlyPI30 * 360 - sampleLoan)}</div>
            </div>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>15-year P&amp;I</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace" }}>{fmtD(monthlyPI15)}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>Total interest: {fmt(monthlyPI15 * 180 - sampleLoan)}</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 14, lineHeight: 1.6 }}>
            Choosing a 15-year mortgage in {stateName} saves roughly {fmt((monthlyPI30 * 360 - sampleLoan) - (monthlyPI15 * 180 - sampleLoan))} in interest over the life of the loan, but requires {fmtD(monthlyPI15 - monthlyPI30)} more per month.
          </div>
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="mortgage" placement={`best-rates-${state}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            How to Get the Best Mortgage Rate in {stateName}
          </h2>
          <p style={{ marginBottom: 16 }}>
            Mortgage rates in {stateName} closely track national averages, but the total monthly cost varies sharply because of state-specific property taxes ({propertyTaxRate.toFixed(2)}%) and insurance premiums (averaging {fmt(insuranceAnnual)}/year). To get the lowest rate available to you, compare offers from at least three lenders — small differences in APR add up to tens of thousands over a 30-year term.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>What rate can I qualify for?</h3>
          <p style={{ marginBottom: 16 }}>
            Lenders price your rate primarily on credit score, debt-to-income ratio, and loan-to-value ratio. A FICO score above 760 with 20% down typically qualifies for the best advertised rates. Below 680, expect a rate at least 0.5–1.0 percentage points higher than the headline average.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Should I buy mortgage points?</h3>
          <p style={{ marginBottom: 16 }}>
            One discount point typically costs 1% of your loan and reduces your rate by ~0.25%. The breakeven is usually 5–7 years; if you'll stay in the {stateName} home longer than that, points often save money.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Compare lenders before locking</h3>
          <p style={{ marginBottom: 16 }}>
            Even within {stateName}, lender rates can vary by 0.25–0.5 percentage points on the same credit profile. Online marketplaces like LendingTree and Credible let you see prequalified rates from multiple lenders without affecting your credit score.
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`best-mortgage-rates/${state}`}
            headline={`Track ${stateName} mortgage rates`}
            subhead="Weekly rate updates, lender comparisons, and home-buying tools delivered to your inbox."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>More mortgage tools</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href="/tools/mortgage-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Mortgage Calculator →
            </a>
            <a href="/tools/rent-vs-buy-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Rent vs Buy →
            </a>
            <a href={`/mortgage/${state}-400000`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              {stateName} $400k Mortgage →
            </a>
            <a href="/learn/how-much-house-can-you-afford" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              How Much House Can You Afford →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

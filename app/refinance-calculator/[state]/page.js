import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffiliateOffer from "../../components/AffiliateOffer";
import EmailCapture from "../../components/EmailCapture";
import RefiClient from "./RefiClient";
import { MORTGAGE_RATES, STATE_PROPERTY_TAX_RATES } from "../../data/mortgageData";
import { STATE_REFI_CLOSING_COSTS, STATE_REFI_NOTES } from "../../data/refinanceData";

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

export async function generateMetadata({ params }) {
  const { state } = await params;
  const name = STATE_NAMES[state];
  if (!name) return {};
  const closingCosts = STATE_REFI_CLOSING_COSTS[state];
  return {
    title: `Refinance Calculator for ${name} (${new Date().getFullYear()}) — Break-Even Analysis`,
    description: `Should you refinance your mortgage in ${name}? Calculate monthly savings, break-even period, and total interest savings. Average closing costs in ${name}: ${fmt(closingCosts)}.`,
    alternates: { canonical: `/refinance-calculator/${state}` },
    openGraph: {
      title: `${name} Mortgage Refinance Calculator — ${new Date().getFullYear()}`,
      description: `Calculate refinance break-even, monthly savings, and total interest impact in ${name}.`,
      url: `https://www.pulsafi.com/refinance-calculator/${state}`,
    },
  };
}

export default async function RefinanceCalculatorPage({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const closingCosts = STATE_REFI_CLOSING_COSTS[state];
  const propertyTaxRate = STATE_PROPERTY_TAX_RATES[state];
  const stateNote = STATE_REFI_NOTES[state];
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const currentRate30 = MORTGAGE_RATES["30yr_fixed"];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much does it cost to refinance a mortgage in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Average refinance closing costs in ${stateName} are approximately ${fmt(closingCosts)}, including lender fees, title insurance, appraisal, and recording fees. ${stateNote || ""}`.trim(),
        },
      },
      {
        "@type": "Question",
        "name": `When does it make sense to refinance in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Refinancing makes sense when the monthly savings recoup your closing costs (the "break-even point") before you plan to sell or move. With ${stateName} closing costs of ~${fmt(closingCosts)}, you'd typically need to save $100-200/month to break even within 2-4 years.`,
        },
      },
      {
        "@type": "Question",
        "name": `What's the average mortgage rate in ${stateName} right now?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `As of ${updated}, the average 30-year fixed mortgage rate is approximately ${currentRate30.toFixed(3)}%. Refinance rates are typically 0.125-0.25% higher than purchase rates from the same lender.`,
        },
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      <section style={{ padding: "60px 24px 32px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Updated {updated}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          {stateName} Refinance Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Should you refinance your {stateName} mortgage? Calculate monthly savings, break-even period, and lifetime interest savings — accounting for {stateName}'s ~{fmt(closingCosts)} average closing costs.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category="refinance" placement={`refi-calc-${state}-top`} variant="card" />

        {/* Interactive calculator */}
        <RefiClient
          stateSlug={state}
          stateName={stateName}
          stateClosingCosts={closingCosts}
          newRateDefault={currentRate30}
        />

        {/* State-specific cost breakdown */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            Refinance Closing Costs in {stateName}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
            Typical out-of-pocket costs to refinance in {stateName}. Some lenders offer no-closing-cost refis in exchange for a higher rate.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
            {[
              { label: "Avg Total Closing Costs", value: fmt(closingCosts), accent: true },
              { label: "Property Tax Rate", value: `${propertyTaxRate.toFixed(2)}%` },
              { label: "Current 30-Year Rate", value: `${currentRate30.toFixed(3)}%` },
            ].map((row, i) => (
              <div key={i} style={{
                background: row.accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
                border: row.accent ? "none" : "1px solid var(--border-input)",
                borderRadius: 12, padding: "16px 18px",
              }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: row.accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: row.accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{row.value}</div>
              </div>
            ))}
          </div>
          {stateNote && (
            <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderLeft: "3px solid var(--accent)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>{stateName}-specific:</strong> {stateNote}
            </div>
          )}
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="refinance" placement={`refi-calc-${state}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Should You Refinance Your {stateName} Mortgage?
          </h2>
          <p style={{ marginBottom: 16 }}>
            The classic rule of thumb is to refinance when you can lower your rate by at least 0.75-1.0 percentage points, but the real test is the break-even period: how long it takes for monthly savings to recoup the closing costs. In {stateName}, with average closing costs of {fmt(closingCosts)}, you'll typically need to save $100-200/month to break even within 2-4 years.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>The break-even formula</h3>
          <p style={{ marginBottom: 16 }}>
            Break-even months = Closing costs ÷ Monthly savings. If your refi saves you $250/month and costs {fmt(closingCosts)}, that's {Math.round(closingCosts / 250)} months ({(closingCosts / 250 / 12).toFixed(1)} years) to break even. If you'll be in the home longer than that, the refi is worth it.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Cash-out vs rate-and-term refi</h3>
          <p style={{ marginBottom: 16 }}>
            A rate-and-term refi just changes your interest rate and/or loan length. A cash-out refi gives you a check from your equity but typically carries a higher rate (0.25-0.5% premium). For {stateName} homeowners with significant equity, a cash-out refi can fund renovations or pay off high-interest debt — but only do it if the math beats other borrowing options.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>When to skip refinancing</h3>
          <p style={{ marginBottom: 16 }}>
            Don't refi if you plan to sell or move within your break-even window, if your credit has dropped since the original loan, or if you'd be resetting a 30-year clock when you're already 15+ years in (you'd pay more total interest). Also skip if your rate savings are under 0.5% — closing costs eat the benefit.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Compare lenders for the best {stateName} refi rate</h3>
          <p style={{ marginBottom: 16 }}>
            Refinance rate quotes can vary by 0.25-0.5 percentage points between lenders for the same borrower profile. Get at least 3 quotes — online marketplaces let you compare prequalified offers without affecting your credit score.
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`refinance-calculator/${state}`}
            headline={`Track ${stateName} refi rates`}
            subhead="Weekly rate updates, lender comparisons, and refinance break-even tools delivered to your inbox."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>More mortgage tools for {stateName}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href={`/best-mortgage-rates/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              {stateName} Mortgage Rates →
            </a>
            <a href={`/mortgage/${state}-400000`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              {stateName} $400k Mortgage →
            </a>
            <a href="/tools/mortgage-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Full Mortgage Calculator →
            </a>
            <a href="/tools/rent-vs-buy-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Rent vs Buy →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

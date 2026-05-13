import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffiliateOffer from "../../components/AffiliateOffer";
import EmailCapture from "../../components/EmailCapture";
import { STATE_FTHB_PROGRAMS } from "../../data/firstTimeHomebuyerData";
import { STATE_PROPERTY_TAX_RATES, MORTGAGE_RATES } from "../../data/mortgageData";

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
  const program = STATE_FTHB_PROGRAMS[state];
  if (!name || !program) return {};
  return {
    title: `First-Time Homebuyer Programs in ${name} (${new Date().getFullYear()}) — Down Payment Assistance`,
    description: `Complete guide to ${name} first-time homebuyer programs: ${program.program} via ${program.agency}, up to ${program.dpaPct}% down payment assistance, income limits up to ${fmt(program.incomeLimit)}.`,
    alternates: { canonical: `/first-time-homebuyer/${state}` },
    openGraph: {
      title: `${name} First-Time Homebuyer Programs ${new Date().getFullYear()}`,
      description: `${program.agency} first-time buyer programs, down payment assistance, and income limits in ${name}.`,
      url: `https://www.pulsafi.com/first-time-homebuyer/${state}`,
    },
  };
}

export default async function FirstTimeHomebuyerPage({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  const program = STATE_FTHB_PROGRAMS[state];
  if (!stateName || !program) notFound();

  const propertyTax = STATE_PROPERTY_TAX_RATES[state];
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const samplePrice = 350000;
  const sampleDpa = samplePrice * 0.2 * (program.dpaPct / 100); // % of down payment, assuming 20% down conventionally
  const minDownPaymentExample = samplePrice * 0.035; // FHA 3.5%
  const dpaCovers = (samplePrice * (program.dpaPct / 100));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Who qualifies as a first-time homebuyer in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `In ${stateName}, most ${program.agency} programs define a first-time homebuyer as someone who has not owned a primary residence in the past 3 years. Veterans and buyers in targeted areas may be exempt from this requirement.`,
        },
      },
      {
        "@type": "Question",
        "name": `What is the income limit for first-time homebuyer programs in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${stateName}'s primary first-time homebuyer program has a household income limit around ${fmt(program.incomeLimit)}, varying by county and household size. Higher-cost counties typically have higher limits.`,
        },
      },
      {
        "@type": "Question",
        "name": `How much down payment assistance can I get in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${program.program} offers up to ${program.dpaPct}% of the purchase price as ${program.dpaForm}. On a ${fmt(samplePrice)} home, that's roughly ${fmt(dpaCovers)} in assistance.`,
        },
      },
      {
        "@type": "Question",
        "name": `Can I combine ${stateName} DPA with FHA, VA, or USDA loans?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Yes — most ${program.agency} programs work alongside FHA (3.5% down), VA (0% down for veterans), USDA (0% down for rural areas), and Conventional 97 loans. Pairing DPA with FHA is the most common combo.`,
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
          First-Time Homebuyer Programs in {stateName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          {stateName}'s primary program is {program.program} via {program.agency}, offering up to {program.dpaPct}% in down payment assistance. Here's how it works, who qualifies, and how to apply.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category="mortgage" placement={`fthb-${state}-top`} variant="card" />

        {/* Program summary */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "26px 28px" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 8, fontWeight: 600 }}>
            {stateName} Program Overview
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, margin: "0 0 6px" }}>
            {program.program}
          </h2>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
            Administered by {program.agency} · Visit{" "}
            <a href={`https://${program.sitedUrl}`} target="_blank" rel="nofollow noopener" style={{ color: "var(--accent)", textDecoration: "none" }}>
              {program.sitedUrl}
            </a>{" "}
            for current terms
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
            {[
              { label: "Max DPA", value: `${program.dpaPct}%`, sub: "of purchase price", accent: true },
              { label: "Income Limit", value: fmt(program.incomeLimit), sub: "varies by county" },
              { label: "DPA Form", value: program.dpaForm.split(" ")[0], sub: program.dpaForm.split(" ").slice(1).join(" ") || "—" },
              { label: "Property Tax", value: `${propertyTax.toFixed(2)}%`, sub: `${stateName} avg` },
            ].map((row, i) => (
              <div key={i} style={{
                background: row.accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
                border: row.accent ? "none" : "1px solid var(--border-input)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: row.accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: row.accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{row.value}</div>
                <div style={{ fontSize: 11, color: row.accent ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 3 }}>{row.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Sample math */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>
            What This Looks Like for a {fmt(samplePrice)} Home in {stateName}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 14 }}>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Without {stateName} DPA</div>
              <div style={{ marginBottom: 6 }}>FHA minimum down: <strong>{fmt(minDownPaymentExample)}</strong> (3.5%)</div>
              <div style={{ marginBottom: 6 }}>Closing costs: <strong>~{fmt(samplePrice * 0.03)}</strong></div>
              <div>Cash needed: <strong style={{ color: "#e74c3c" }}>{fmt(minDownPaymentExample + samplePrice * 0.03)}</strong></div>
            </div>
            <div style={{ background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))", border: "1px solid var(--accent-border)", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>With {program.program} DPA</div>
              <div style={{ marginBottom: 6 }}>FHA minimum down: <strong>{fmt(minDownPaymentExample)}</strong> (3.5%)</div>
              <div style={{ marginBottom: 6 }}>DPA covers: <strong style={{ color: "var(--accent)" }}>−{fmt(Math.min(dpaCovers, minDownPaymentExample + samplePrice * 0.03))}</strong></div>
              <div>Cash needed: <strong style={{ color: "var(--accent)" }}>{fmt(Math.max(0, minDownPaymentExample + samplePrice * 0.03 - dpaCovers))}</strong></div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 12, lineHeight: 1.55 }}>
            Estimates only. Actual DPA amount depends on income, purchase price, county, and program tier. Verify current terms with {program.agency}.
          </div>
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="mortgage" placement={`fthb-${state}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            How {stateName}'s First-Time Homebuyer Programs Work
          </h2>
          <p style={{ marginBottom: 16 }}>
            {program.agency} offers {program.program} to qualifying first-time buyers in {stateName}. Most {stateName} buyers pair this with an FHA, VA, USDA, or Conventional 97 loan, using the DPA to cover the down payment, closing costs, or both. The DPA is structured as {program.dpaForm}.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Eligibility requirements</h3>
          <p style={{ marginBottom: 16 }}>
            Most {stateName} HFA programs require: (1) you haven't owned a primary residence in the last 3 years, (2) household income under ~{fmt(program.incomeLimit)} (county-dependent), (3) minimum FICO score of 640-680, (4) the home is your primary residence, (5) you complete a HUD-approved homebuyer education course (typically online, ~6-8 hours).
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>How to apply for {program.program}</h3>
          <p style={{ marginBottom: 16 }}>
            You don't apply directly through {program.agency} — you apply through one of their participating lenders. The agency lists approved lenders on their website. Get pre-approved with at least 2-3 of them: rates and fees vary, even within the same DPA program.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Combining {stateName} DPA with federal loans</h3>
          <p style={{ marginBottom: 16 }}>
            Pair {program.program} with FHA (3.5% down, 580+ FICO) for the easiest qualifying. Veterans should use VA loans (0% down) — DPA still helps with closing costs. Rural buyers should check USDA (0% down). Buyers with 3-5% down and good credit can use Conventional 97 or HFA Preferred for lower mortgage insurance.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Other {stateName} buyer benefits</h3>
          <p style={{ marginBottom: 16 }}>
            Beyond DPA, ask your lender about: Mortgage Credit Certificates (MCC) for federal tax credits up to $2,000/year, employer-assisted housing programs (some {stateName} employers offer additional grants), and city/county DPA stacking (cities like the largest metros in {stateName} often add their own programs on top of state DPA).
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`first-time-homebuyer/${state}`}
            headline={`${stateName} homebuyer program updates`}
            subhead="Income limit changes, new DPA programs, and rate movements — delivered to your inbox monthly."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>More {stateName} buyer tools</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href={`/best-mortgage-rates/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              {stateName} Mortgage Rates →
            </a>
            <a href={`/refinance-calculator/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Refi Calculator →
            </a>
            <a href={`/mortgage/${state}-${samplePrice}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              {fmt(samplePrice)} Mortgage Math →
            </a>
            <a href="/tools/mortgage-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Mortgage Calculator →
            </a>
            <a href="/learn/how-much-house-can-you-afford" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              How Much Can You Afford →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

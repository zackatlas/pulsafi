import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffiliateOffer from "../../components/AffiliateOffer";
import EmailCapture from "../../components/EmailCapture";

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

// Top state-level marginal income tax rates applied to interest income.
// Interest from savings/HYSAs is taxed as ordinary income at federal + state level.
// 0 = state has no income tax on earned/interest income.
const STATE_INTEREST_TAX_RATES = {
  "alabama": 5.0, "alaska": 0, "arizona": 2.5, "arkansas": 3.9, "california": 13.3,
  "colorado": 4.4, "connecticut": 6.99, "delaware": 6.6, "district-of-columbia": 10.75,
  "florida": 0, "georgia": 5.49, "hawaii": 11, "idaho": 5.8, "illinois": 4.95,
  "indiana": 3.05, "iowa": 5.7, "kansas": 5.7, "kentucky": 4.0, "louisiana": 4.25,
  "maine": 7.15, "maryland": 5.75, "massachusetts": 5.0, "michigan": 4.25, "minnesota": 9.85,
  "mississippi": 5.0, "missouri": 4.8, "montana": 6.75, "nebraska": 5.84, "nevada": 0,
  "new-hampshire": 0, "new-jersey": 10.75, "new-mexico": 5.9, "new-york": 10.9,
  "north-carolina": 4.5, "north-dakota": 2.5, "ohio": 3.5, "oklahoma": 4.75,
  "oregon": 9.9, "pennsylvania": 3.07, "rhode-island": 5.99, "south-carolina": 6.4,
  "south-dakota": 0, "tennessee": 0, "texas": 0, "utah": 4.65, "vermont": 8.75,
  "virginia": 5.75, "washington": 0, "west-virginia": 5.12, "wisconsin": 7.65, "wyoming": 0,
};

// Current top-tier HYSA APY estimates (national avg of leading providers).
// Rates change frequently; numbers below are typical and refreshed in copy.
const HYSA_APY = 4.50;
const NATIONAL_AVG_APY = 0.42;
const FEDERAL_TOP_BRACKET = 24; // assumes typical $100k+ saver

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(STATE_NAMES).map(state => ({ state }));
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export async function generateMetadata({ params }) {
  const { state } = await params;
  const name = STATE_NAMES[state];
  if (!name) return {};
  return {
    title: `Best High-Yield Savings Accounts in ${name} (${new Date().getFullYear()}) — APYs Up to ${HYSA_APY}% | Pulsafi`,
    description: `Compare the best high-yield savings accounts for ${name} residents. Top APYs around ${HYSA_APY}%, ${(HYSA_APY / NATIONAL_AVG_APY).toFixed(0)}× the national average. See state tax impact on interest earnings.`,
    alternates: { canonical: `/best-savings-account/${state}` },
    openGraph: {
      title: `Best HYSA in ${name} — ${HYSA_APY}% APY`,
      description: `Top high-yield savings accounts for ${name} residents and after-tax yield analysis.`,
      url: `https://www.pulsafi.com/best-savings-account/${state}`,
    },
  };
}

export default async function BestSavingsAccountPage({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const stateRate = STATE_INTEREST_TAX_RATES[state];
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const sampleBalance = 25000;
  const grossInterest = sampleBalance * (HYSA_APY / 100);
  const federalTax = grossInterest * (FEDERAL_TOP_BRACKET / 100);
  const stateTaxOnInterest = grossInterest * (stateRate / 100);
  const afterTaxInterest = grossInterest - federalTax - stateTaxOnInterest;
  const afterTaxYield = (afterTaxInterest / sampleBalance) * 100;
  const noTaxState = stateRate === 0;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is the best savings account APY for ${stateName} residents?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Top high-yield savings accounts for ${stateName} residents currently pay around ${HYSA_APY}% APY — about ${(HYSA_APY / NATIONAL_AVG_APY).toFixed(0)} times the national average of ${NATIONAL_AVG_APY}%. ${noTaxState ? `Since ${stateName} has no state income tax, interest earnings keep more of their value than in high-tax states.` : `${stateName} taxes interest income at up to ${stateRate}% state, on top of federal income tax.`}`,
        },
      },
      {
        "@type": "Question",
        "name": `Is interest from a savings account taxed in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": noTaxState
            ? `${stateName} has no state income tax, so interest from savings accounts is taxed only at the federal level (10-37% depending on your bracket). This makes ${stateName} one of the most favorable states for keeping cash in HYSAs and CDs.`
            : `Yes — ${stateName} taxes savings account interest as ordinary income at up to ${stateRate}%. Combined with federal taxes, your effective tax on interest income can range from ${(10 + stateRate).toFixed(1)}% to ${(37 + stateRate).toFixed(1)}%.`,
        },
      },
      {
        "@type": "Question",
        "name": `How much would I earn on ${fmt(sampleBalance)} in a HYSA in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `On a ${fmt(sampleBalance)} balance at ${HYSA_APY}% APY, you'd earn approximately ${fmtD(grossInterest)}/year before taxes. After estimated federal (${FEDERAL_TOP_BRACKET}% bracket) ${noTaxState ? "" : `and ${stateName} state taxes`}, that's roughly ${fmtD(afterTaxInterest)}/year — an after-tax yield of ${afterTaxYield.toFixed(2)}%.`,
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
          Best High-Yield Savings Accounts in {stateName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Top APYs around {HYSA_APY}% for {stateName} residents — {(HYSA_APY / NATIONAL_AVG_APY).toFixed(0)}× the national average of {NATIONAL_AVG_APY}%. {noTaxState ? `${stateName} has no state income tax, so you keep more of every interest dollar.` : `Account for ${stateName}'s ${stateRate}% state tax to see your real after-tax yield.`}
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category="savings" placement={`hysa-${state}-top`} variant="card" />

        {/* Rate snapshot */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            HYSA APY Snapshot — {stateName}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
            Top-tier online banks offer the same APYs nationwide. The state difference is what you keep after taxes.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
            {[
              { label: "Top HYSA APY", value: `${HYSA_APY}%`, accent: true },
              { label: "National Avg", value: `${NATIONAL_AVG_APY}%`, sub: "FDIC-insured" },
              { label: `${stateName} Tax on Interest`, value: noTaxState ? "0%" : `${stateRate.toFixed(2)}%`, sub: noTaxState ? "no state income tax" : "marginal" },
              { label: "After-Tax Yield", value: `${afterTaxYield.toFixed(2)}%`, sub: `at 24% federal` },
            ].map((row, i) => (
              <div key={i} style={{
                background: row.accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
                border: row.accent ? "none" : "1px solid var(--border-input)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: row.accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", marginBottom: 4 }}>{row.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: row.accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{row.value}</div>
                {row.sub && <div style={{ fontSize: 11, color: row.accent ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 3 }}>{row.sub}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Sample math */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>
            What {fmt(sampleBalance)} Earns in {stateName}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Gross Interest</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Inter', monospace" }}>{fmtD(grossInterest)}/yr</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>at {HYSA_APY}% APY</div>
            </div>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Tax Owed</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Inter', monospace", color: "#e74c3c" }}>−{fmtD(federalTax + stateTaxOnInterest)}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{noTaxState ? "federal only" : `federal + ${stateRate.toFixed(1)}% state`}</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))", border: "1px solid var(--accent-border)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>You Keep</div>
              <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--accent)" }}>{fmtD(afterTaxInterest)}/yr</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>~{afterTaxYield.toFixed(2)}% after-tax</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 14, lineHeight: 1.55 }}>
            Math assumes 24% federal bracket (~$100k+ household income){noTaxState ? "." : `, ${stateRate.toFixed(2)}% ${stateName} marginal rate.`} Lower brackets keep more.
          </div>
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="savings" placement={`hysa-${state}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            How to Pick the Best Savings Account in {stateName}
          </h2>
          <p style={{ marginBottom: 16 }}>
            Online banks consistently beat brick-and-mortar APYs because they have lower overhead. The top high-yield savings accounts available to {stateName} residents pay around {HYSA_APY}% APY — roughly {(HYSA_APY / NATIONAL_AVG_APY).toFixed(0)}× what your local bank pays on its standard savings account. {noTaxState ? `Because ${stateName} has no state income tax, interest income is only hit at the federal level — making HYSAs especially attractive vs. high-tax states like California or New York.` : `Don't forget: ${stateName} taxes interest as ordinary income at up to ${stateRate}%, so your real after-tax return is lower than the headline APY.`}
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>What to look for</h3>
          <p style={{ marginBottom: 16 }}>
            Compare APY (the longer-term benchmark, not promotional rates), monthly fees (avoid them), minimum balance requirements (avoid those too — top HYSAs have $0 minimums), and whether the account is FDIC-insured up to at least $250,000. Some online banks offer extended insurance through sweep accounts.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>HYSA vs CD vs Money Market</h3>
          <p style={{ marginBottom: 16 }}>
            For {stateName} residents, HYSAs are the most liquid option — money is accessible within 1-3 business days. CDs lock your money for 3 months to 5 years in exchange for slightly higher rates. Money market accounts blend the two but typically pay slightly less than top HYSAs. For an emergency fund, HYSAs win.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Treasury bills as a state-tax-free alternative</h3>
          <p style={{ marginBottom: 16 }}>
            {noTaxState
              ? `Since ${stateName} has no state income tax, the state-tax exemption on Treasury bills doesn't help you here. Stick with whichever option has the higher pre-tax yield.`
              : `For ${stateName} residents in higher tax brackets, Treasury bills (T-bills) offer a unique advantage: their interest is exempt from ${stateName} state income tax. At ${stateRate}% state, that's worth roughly ${(stateRate * 0.6).toFixed(1)}% in extra effective yield vs. an HYSA paying the same headline rate. Worth comparing if you have $10k+ to allocate.`
            }
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`best-savings-account/${state}`}
            headline={`Track ${stateName} HYSA rates`}
            subhead="Weekly APY updates, top account moves, and after-tax yield analysis for your state."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>More for {stateName} savers</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href="/tools/emergency-fund-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Emergency Fund Calculator →
            </a>
            <a href="/tools/compound-interest-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Compound Interest →
            </a>
            <a href="/resources/best-savings-accounts" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Best HYSAs Guide →
            </a>
            <a href="/learn/best-high-yield-savings-accounts-2026" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              HYSA Article →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

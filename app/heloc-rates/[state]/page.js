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

// Average state-level home equity (rough, based on ATTOM/CoreLogic 2024 estimates).
// Used for sample math and "how much can you borrow" framing.
const STATE_AVG_HOME_EQUITY = {
  "alabama": 95000, "alaska": 130000, "arizona": 165000, "arkansas": 85000, "california": 320000,
  "colorado": 215000, "connecticut": 175000, "delaware": 145000, "district-of-columbia": 280000,
  "florida": 180000, "georgia": 130000, "hawaii": 380000, "idaho": 175000, "illinois": 120000,
  "indiana": 95000, "iowa": 105000, "kansas": 100000, "kentucky": 95000, "louisiana": 90000,
  "maine": 145000, "maryland": 180000, "massachusetts": 250000, "michigan": 115000, "minnesota": 145000,
  "mississippi": 75000, "missouri": 105000, "montana": 165000, "nebraska": 110000, "nevada": 175000,
  "new-hampshire": 175000, "new-jersey": 185000, "new-mexico": 130000, "new-york": 220000,
  "north-carolina": 130000, "north-dakota": 105000, "ohio": 110000, "oklahoma": 90000,
  "oregon": 215000, "pennsylvania": 130000, "rhode-island": 165000, "south-carolina": 130000,
  "south-dakota": 130000, "tennessee": 145000, "texas": 130000, "utah": 195000, "vermont": 155000,
  "virginia": 165000, "washington": 240000, "west-virginia": 80000, "wisconsin": 130000, "wyoming": 150000,
};

// Texas has unique HELOC rules (50(a)(6) — once a HELOC, always a HELOC).
const STATE_HELOC_NOTES = {
  "texas": "Texas applies unique 50(a)(6) home equity rules: combined LTV is capped at 80%, you can only have one home equity loan at a time, and there's a 12-day cooling-off period after closing.",
  "vermont": "Vermont requires lenders to offer a 3-day right of rescission on most HELOCs.",
};

const HELOC_PRIME_RATE = 8.50;
const HELOC_AVG_MARGIN = 0.50;
const HELOC_AVG_RATE = HELOC_PRIME_RATE + HELOC_AVG_MARGIN;
const HOME_EQUITY_LOAN_FIXED = 8.95;

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
    title: `HELOC Rates in ${name} (${new Date().getFullYear()}) — Compare Lenders | Pulsafi`,
    description: `Today's average HELOC rates in ${name}: ${HELOC_AVG_RATE.toFixed(2)}% variable, ${HOME_EQUITY_LOAN_FIXED.toFixed(2)}% fixed home equity loan. Compare lenders, see qualifying terms, and use sample payment math.`,
    alternates: { canonical: `/heloc-rates/${state}` },
    openGraph: {
      title: `${name} HELOC Rates — ${new Date().getFullYear()}`,
      description: `Compare ${name} HELOC and home equity loan rates with payment math.`,
      url: `https://www.pulsafi.com/heloc-rates/${state}`,
    },
  };
}

export default async function HelocRatesPage({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const avgEquity = STATE_AVG_HOME_EQUITY[state];
  const stateNote = STATE_HELOC_NOTES[state];
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const sampleDraw = Math.round(avgEquity * 0.5 / 1000) * 1000; // 50% of avg equity, rounded
  const monthlyInterestOnly = sampleDraw * (HELOC_AVG_RATE / 100) / 12;
  const isTexas = state === "texas";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are average HELOC rates in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `As of ${updated}, the average HELOC rate in ${stateName} is approximately ${HELOC_AVG_RATE.toFixed(2)}% variable (Prime + ${HELOC_AVG_MARGIN}%), based on a ${HELOC_PRIME_RATE.toFixed(2)}% Prime rate. Fixed-rate home equity loans average around ${HOME_EQUITY_LOAN_FIXED.toFixed(2)}%. Your actual rate depends on credit, LTV, and lender.`,
        },
      },
      {
        "@type": "Question",
        "name": `How much can I borrow with a HELOC in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most ${stateName} lenders allow combined loan-to-value (CLTV) up to 85-90%, meaning you can borrow against the difference between 85-90% of your home's value and your existing mortgage balance. ${isTexas ? "Texas caps CLTV at 80% by state law." : `${stateName}'s average home equity is around ${fmt(avgEquity)}, allowing a typical HELOC line of ${fmt(avgEquity * 0.85)} or so.`}`,
        },
      },
      {
        "@type": "Question",
        "name": `HELOC vs home equity loan in ${stateName} — which is better?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A HELOC is a revolving line of credit with a variable rate (~${HELOC_AVG_RATE.toFixed(2)}% in ${stateName}). A home equity loan is a fixed-rate, fixed-term loan (~${HOME_EQUITY_LOAN_FIXED.toFixed(2)}%). Use a HELOC for ongoing expenses (renovations across multiple years). Use a home equity loan for one-time, predictable expenses (debt consolidation, single project).`,
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
          HELOC Rates in {stateName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Compare current home equity line of credit and fixed-rate home equity loan offers in {stateName}. See qualifying terms, sample monthly payments, and {stateName}-specific rules{isTexas ? " (including Texas 50(a)(6))" : ""}.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category="mortgage" placement={`heloc-${state}-top`} variant="card" />

        {/* Rate snapshot */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            Today's HELOC Rates — {stateName}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
            National averages applicable to {stateName} borrowers. Lender competition can produce rates 0.5-1.0% below or above these averages.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
            {[
              { label: "Avg HELOC (variable)", value: `${HELOC_AVG_RATE.toFixed(2)}%`, sub: `Prime + ${HELOC_AVG_MARGIN}%`, accent: true },
              { label: "Avg Home Equity Loan", value: `${HOME_EQUITY_LOAN_FIXED.toFixed(2)}%`, sub: "fixed rate" },
              { label: "Prime Rate", value: `${HELOC_PRIME_RATE.toFixed(2)}%`, sub: "WSJ Prime" },
              { label: `${stateName} Avg Equity`, value: fmt(avgEquity), sub: "tappable" },
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
          {stateNote && (
            <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderLeft: "3px solid var(--accent)", borderRadius: 8, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
              <strong style={{ color: "var(--text-primary)" }}>{stateName}-specific:</strong> {stateNote}
            </div>
          )}
        </section>

        {/* Sample math */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 14px" }}>
            Sample HELOC Payment for {stateName}
          </h2>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>
            Drawing {fmt(sampleDraw)} from your line at {HELOC_AVG_RATE.toFixed(2)}% variable, interest-only payment phase (typical first 10 years).
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={{ background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))", border: "1px solid var(--accent-border)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Monthly Interest-Only</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Inter', monospace" }}>{fmtD(monthlyInterestOnly)}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>during draw period</div>
            </div>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Annual Interest</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Inter', monospace" }}>{fmt(monthlyInterestOnly * 12)}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>at current rate</div>
            </div>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>If Prime +1%</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Inter', monospace", color: "#e74c3c" }}>{fmtD(sampleDraw * (HELOC_AVG_RATE + 1) / 100 / 12)}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>monthly payment</div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 14, lineHeight: 1.55 }}>
            HELOC rates are variable and adjust monthly with the Prime rate. After the draw period (usually 10 years), you enter repayment with principal+interest, often doubling the monthly payment.
          </div>
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="mortgage" placement={`heloc-${state}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Should You Get a HELOC in {stateName}?
          </h2>
          <p style={{ marginBottom: 16 }}>
            HELOCs make sense in {stateName} when: (1) you have at least 15-20% equity in your home, (2) you need flexible access to cash for renovations, education, or business expenses, (3) you can stomach a variable rate that adjusts with Prime, and (4) you don't want to refinance your low-rate first mortgage. {isTexas ? "Texas borrowers face additional restrictions under 50(a)(6) — the 80% combined LTV cap and 12-day cooling-off period make HELOCs less flexible than in other states." : ""}
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>HELOC vs cash-out refinance</h3>
          <p style={{ marginBottom: 16 }}>
            If your existing mortgage rate is below current market rates (typical for anyone who locked before 2022), a HELOC almost always beats a cash-out refi. You preserve your low first-mortgage rate and only pay HELOC rates on the borrowed portion. If your existing rate is at or above current rates, run the math both ways.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Qualifying for a HELOC in {stateName}</h3>
          <p style={{ marginBottom: 16 }}>
            Most {stateName} lenders require: FICO score 680+ (720+ for the best rates), debt-to-income ratio under 43%, combined loan-to-value under 85% ({isTexas ? "or 80% in Texas" : ""}), proof of income (W-2 or tax returns), and a current home appraisal. The full process takes 2-6 weeks.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Tax deductibility</h3>
          <p style={{ marginBottom: 16 }}>
            Under current IRS rules (2017 TCJA, in effect through 2025), HELOC interest is only tax-deductible if the borrowed funds are used to "buy, build, or substantially improve" the home securing the loan. Using HELOC funds for debt consolidation, vacations, or business expenses makes the interest non-deductible.
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`heloc-rates/${state}`}
            headline={`Track ${stateName} HELOC rates`}
            subhead="Weekly Prime rate moves, lender comparisons, and home equity tools — straight to your inbox."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>More for {stateName} homeowners</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href={`/best-mortgage-rates/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              {stateName} Mortgage Rates →
            </a>
            <a href={`/refinance-calculator/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Refi Calculator →
            </a>
            <a href={`/first-time-homebuyer/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              First-Time Buyer Programs →
            </a>
            <a href="/tools/mortgage-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Mortgage Calculator →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

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

// Top-tier CD APYs by term (national online bank averages).
const CD_RATES = {
  "3-month": 4.85,
  "6-month": 4.95,
  "1-year": 4.65,
  "18-month": 4.40,
  "2-year": 4.25,
  "3-year": 4.10,
  "5-year": 4.00,
};

const TBILL_4WEEK = 4.85;
const TBILL_1YEAR = 4.45;
const FEDERAL_BRACKET = 24;

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
  const topRate = Math.max(...Object.values(CD_RATES));
  return {
    title: `Best CD Rates in ${name} (${new Date().getFullYear()}) — Up to ${topRate}% APY`,
    description: `Compare today's best CD rates for ${name} residents. Top APYs around ${topRate}% on 3-12 month CDs. See after-tax yield with ${name}'s state interest tax of ${STATE_INTEREST_TAX_RATES[state]}%.`,
    alternates: { canonical: `/cd-rates/${state}` },
    openGraph: {
      title: `${name} CD Rates — ${new Date().getFullYear()}`,
      description: `Today's best CD rates for ${name} residents and after-tax yield analysis.`,
      url: `https://www.pulsafi.com/cd-rates/${state}`,
    },
  };
}

export default async function CdRatesPage({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const stateRate = STATE_INTEREST_TAX_RATES[state];
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const sampleBalance = 25000;
  const noTaxState = stateRate === 0;

  // Sample math on a 1-year CD
  const cd1y = CD_RATES["1-year"];
  const cd1yGross = sampleBalance * (cd1y / 100);
  const cd1yFedTax = cd1yGross * (FEDERAL_BRACKET / 100);
  const cd1yStateTax = cd1yGross * (stateRate / 100);
  const cd1yAfter = cd1yGross - cd1yFedTax - cd1yStateTax;
  const cd1yAfterYield = (cd1yAfter / sampleBalance) * 100;

  // T-bill comparison (state-tax-exempt)
  const tbillGross = sampleBalance * (TBILL_1YEAR / 100);
  const tbillAfter = tbillGross - tbillGross * (FEDERAL_BRACKET / 100); // no state tax
  const tbillAfterYield = (tbillAfter / sampleBalance) * 100;
  const tbillsBetter = tbillAfterYield > cd1yAfterYield;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the best CD rates in ${stateName} right now?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `As of ${updated}, top CD rates available to ${stateName} residents are around ${CD_RATES["6-month"]}% APY on 6-month CDs and ${CD_RATES["1-year"]}% on 1-year CDs. Online banks typically offer the highest rates — your local bank in ${stateName} probably pays under 1%.`,
        },
      },
      {
        "@type": "Question",
        "name": `Is CD interest taxed in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": noTaxState
            ? `${stateName} has no state income tax, so CD interest is taxed only at the federal level. This makes CDs more attractive in ${stateName} than in high-tax states.`
            : `Yes — ${stateName} taxes CD interest as ordinary income at up to ${stateRate}%. Combined with federal taxes, your effective tax on CD interest can reach ${(37 + stateRate).toFixed(1)}% in the top brackets.`,
        },
      },
      {
        "@type": "Question",
        "name": `CD vs HYSA vs Treasury bills — which is best for ${stateName} residents?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": noTaxState
            ? `For ${stateName} residents, the choice is mostly about liquidity. CDs lock in a rate (good when rates are dropping) but penalize early withdrawal. HYSAs are fully liquid but rates can change. T-bills offer similar yields with no state tax — though that doesn't matter in ${stateName}.`
            : `For ${stateName} residents in higher tax brackets, T-bills often beat CDs on after-tax yield because T-bill interest is exempt from ${stateName} state income tax. At ${stateRate}%, that's worth roughly ${(stateRate * 0.6).toFixed(1)}% in extra after-tax yield. Compare T-bills, CDs, and HYSAs side-by-side before locking in.`,
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
          Best CD Rates in {stateName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Top APYs around {CD_RATES["6-month"]}% on short-term CDs available to {stateName} residents. {noTaxState ? `${stateName} has no state income tax — CD interest is taxed only federally.` : `Account for ${stateName}'s ${stateRate}% interest tax to see your real after-tax yield.`}
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category="savings" placement={`cd-${state}-top`} variant="card" />

        {/* Rate ladder */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            CD Rate Ladder — {stateName}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
            Top-tier online bank averages by term. Local bank rates in {stateName} typically pay 1-2 percentage points less.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {Object.entries(CD_RATES).map(([term, rate], i) => {
              const isTopRate = rate === Math.max(...Object.values(CD_RATES));
              return (
                <div key={term} style={{
                  background: isTopRate ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
                  border: isTopRate ? "none" : "1px solid var(--border-input)",
                  borderRadius: 12, padding: "14px 16px",
                }}>
                  <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: isTopRate ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", marginBottom: 4 }}>{term.replace(/-/g, " ")}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: isTopRate ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{rate.toFixed(2)}%</div>
                  <div style={{ fontSize: 10, color: isTopRate ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 3 }}>APY</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CD vs T-bill comparison */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 6px" }}>
            1-Year CD vs T-Bill: After-Tax Yield in {stateName}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 16 }}>
            On a {fmt(sampleBalance)} balance, comparing what you actually keep at the 24% federal bracket{noTaxState ? "" : ` and ${stateRate}% ${stateName} rate`}.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{
              background: tbillsBetter ? "var(--bg-input)" : "linear-gradient(135deg, var(--accent-bg), var(--bg-card))",
              border: tbillsBetter ? "1px solid var(--border-input)" : "1px solid var(--accent-border)",
              borderRadius: 12, padding: "16px 18px",
            }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: tbillsBetter ? "var(--text-secondary)" : "var(--accent)", marginBottom: 6, fontWeight: 600 }}>1-Year CD ({cd1y}% APY)</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace", marginBottom: 4 }}>{fmtD(cd1yAfter)}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>after tax · {cd1yAfterYield.toFixed(2)}% effective</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 6 }}>fed: −{fmtD(cd1yFedTax)}{noTaxState ? "" : ` · state: −${fmtD(cd1yStateTax)}`}</div>
            </div>
            <div style={{
              background: tbillsBetter ? "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" : "var(--bg-input)",
              border: tbillsBetter ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
              borderRadius: 12, padding: "16px 18px",
            }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: tbillsBetter ? "var(--accent)" : "var(--text-secondary)", marginBottom: 6, fontWeight: 600 }}>1-Year T-Bill ({TBILL_1YEAR}%)</div>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace", marginBottom: 4 }}>{fmtD(tbillAfter)}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>after tax · {tbillAfterYield.toFixed(2)}% effective</div>
              <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 6 }}>fed: −{fmtD(tbillGross * (FEDERAL_BRACKET / 100))} · state: $0 (exempt)</div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: tbillsBetter ? "var(--accent)" : "var(--text-secondary)", marginTop: 14, padding: "10px 14px", background: "var(--bg-input)", borderRadius: 8, lineHeight: 1.5 }}>
            <strong>Verdict for {stateName}: </strong>
            {tbillsBetter
              ? `T-bills beat CDs after taxes — the state-tax exemption is worth more than the CD's APY premium. Buy T-bills directly through TreasuryDirect or a brokerage.`
              : noTaxState
                ? `CDs win — ${stateName} has no state income tax, so the T-bill exemption gives no advantage.`
                : `CDs slightly beat T-bills after taxes. The CD's higher headline APY beats the T-bill's state-tax exemption at ${stateRate}%.`
            }
          </div>
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="savings" placement={`cd-${state}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Should You Open a CD in {stateName}?
          </h2>
          <p style={{ marginBottom: 16 }}>
            CDs make sense in {stateName} when: (1) you don't need the money before the maturity date, (2) you think interest rates will fall during your CD term (locking in protects you), (3) you want a guaranteed yield without market risk, and (4) you've already maxed out tax-advantaged accounts (401(k), Roth IRA, HSA).
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>CD ladder strategy</h3>
          <p style={{ marginBottom: 16 }}>
            Instead of putting all your cash into one CD term, build a CD ladder: split your savings across 3-month, 6-month, 12-month, and 18-month CDs. Every 3 months, one CD matures — you can spend it or roll it into a new long-term CD. This balances liquidity with locked-in rates.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Early withdrawal penalties</h3>
          <p style={{ marginBottom: 16 }}>
            Most CDs charge 3-12 months of interest as a penalty for early withdrawal. On a 5-year CD, that's typically 12 months of interest — substantial. Some banks offer "no-penalty" CDs at slightly lower APYs. For emergency fund money, stick with a HYSA (no penalty, fully liquid).
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Where to find the best {stateName} CD rates</h3>
          <p style={{ marginBottom: 16 }}>
            Online banks (Marcus by Goldman Sachs, Ally, Capital One 360, Synchrony) consistently offer the highest CD APYs nationwide and are FDIC-insured up to $250,000 per depositor per bank. {stateName} credit unions sometimes offer "specials" with promo APYs higher than online banks — check NCUA-insured options if you qualify for membership.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Brokered CDs vs bank CDs</h3>
          <p style={{ marginBottom: 16 }}>
            Brokered CDs (sold through Fidelity, Schwab, Vanguard) often pay slightly higher rates than direct bank CDs because they cut through aggregator pricing. They're still FDIC-insured up to $250k per issuer, and you can hold them in your IRA. The downside: secondary-market trading is needed for early withdrawal, which can result in capital losses.
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`cd-rates/${state}`}
            headline={`${stateName} CD rate updates`}
            subhead="Weekly rate moves, top CD specials, and after-tax yield analysis for your state."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>More for {stateName} savers</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href={`/best-savings-account/${state}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Best HYSA in {stateName} →
            </a>
            <a href="/tools/emergency-fund-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Emergency Fund Calculator →
            </a>
            <a href="/tools/compound-interest-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Compound Interest Calculator →
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

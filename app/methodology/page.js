import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Methodology & Data Sources",
  description: "How Pulsafi sources, calculates, and updates personal finance data — primary government sources, leading financial institutions, and our review cadence.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Pulsafi Methodology & Data Sources",
    description: "Primary sources and update cadence behind every Pulsafi number.",
    url: "https://www.pulsafi.com/methodology",
  },
};

const SOURCES = [
  {
    name: "U.S. Bureau of Labor Statistics (BLS)",
    url: "https://www.bls.gov",
    desc: "Occupational Employment and Wage Statistics (OEWS) for salary data by job and metro; Consumer Price Index for inflation; Quarterly Census of Employment and Wages (QCEW).",
    used: "Salary pages (city × job), tax-bracket pages, inflation stats",
  },
  {
    name: "U.S. Census Bureau",
    url: "https://www.census.gov",
    desc: "American Community Survey (ACS) for household income; Housing Vacancy Survey for homeownership rates; Demographic and Economic Statistics.",
    used: "Income stats, housing stats, cost-of-living comparisons",
  },
  {
    name: "Internal Revenue Service (IRS)",
    url: "https://www.irs.gov",
    desc: "Annual Revenue Procedures for federal tax brackets, contribution limits, and deduction amounts; Statistics of Income (SOI) for effective tax rate data.",
    used: "Tax-bracket pages, contribution limit stats, effective tax rate data",
  },
  {
    name: "Federal Reserve",
    url: "https://www.federalreserve.gov",
    desc: "Survey of Consumer Finances (SCF) for household net worth and asset breakdowns; H.15 statistical release for interest rates; Federal Funds Rate.",
    used: "Net worth stats, interest rate references, savings rate benchmarks",
  },
  {
    name: "Social Security Administration (SSA)",
    url: "https://www.ssa.gov",
    desc: "Annual COLA fact sheets, Trustees Reports, and benefit statistics for monthly benefits, full retirement age, and maximum benefit calculations.",
    used: "Social Security stats, retirement planning content",
  },
  {
    name: "Federal Deposit Insurance Corporation (FDIC)",
    url: "https://www.fdic.gov",
    desc: "National Rates and Rate Caps for savings, money market, and CD APYs; bank deposit data.",
    used: "Savings rate benchmarks, CD rate snapshots",
  },
  {
    name: "Vanguard 'How America Saves'",
    url: "https://institutional.vanguard.com/",
    desc: "Annual report on 401(k) participation, balances, and contribution patterns across millions of plan participants.",
    used: "Average and median 401(k) balance stats by age",
  },
  {
    name: "National Association of Realtors (NAR)",
    url: "https://www.nar.realtor",
    desc: "Existing Home Sales report, Median Home Price reports, Profile of Home Buyers and Sellers (down payment data).",
    used: "Home price stats, down payment averages",
  },
  {
    name: "ClosingCorp / CoreLogic",
    url: "https://www.corelogic.com",
    desc: "Annual closing-cost reports by state, used for refinance and purchase fee estimates.",
    used: "Refinance calculator state defaults, mortgage cost analysis",
  },
];

const PRINCIPLES = [
  { title: "Primary sources first", body: "Every statistic on Pulsafi traces back to a primary source: BLS, Census, IRS, Federal Reserve, SSA, FDIC, or a peer-reviewed industry report. We do not source numbers from secondary aggregators when a primary source exists." },
  { title: "Dated and timestamped", body: "Every stat displays the period it covers (e.g., '2026-Q1' or '2025 tax year'). When source data updates, we mark the page with a new dateModified timestamp in our schema. Old numbers don't quietly persist." },
  { title: "Transparent calculations", body: "Calculator math is fully shown — formulas, assumptions, and inputs. We use standard amortization for mortgages, the 4% rule for retirement (citing Trinity Study), and current IRS tables for taxes." },
  { title: "No fabricated data", body: "We do not invent numbers, project beyond what's defensible, or smooth uncomfortable data. When a stat is unavailable for a specific cut, we say so rather than estimate." },
  { title: "Update cadence", body: "Tax brackets, contribution limits, and IRS thresholds: annually within 30 days of IRS release. Mortgage rates and APYs: weekly. BLS salary data: annually within 60 days of OEWS release. Census/Federal Reserve: annually." },
];

export default function Methodology() {
  // AboutPage schema for the methodology
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Pulsafi Methodology & Data Sources",
    "description": "How Pulsafi sources, calculates, and updates personal finance data.",
    "url": "https://www.pulsafi.com/methodology",
    "publisher": {
      "@type": "Organization",
      "name": "Pulsafi",
      "url": "https://www.pulsafi.com",
    },
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "60px 24px 60px" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Methodology & Data Sources
        </div>
        <h1 style={{
          fontSize: "clamp(32px, 5vw, 48px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          margin: "0 0 18px",
          lineHeight: 1.1, letterSpacing: "-0.02em",
        }}>
          How Pulsafi sources its numbers
        </h1>
        <p style={{ fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 36 }}>
          Personal finance content is only as trustworthy as the sources behind it. Every Pulsafi statistic, calculator, and rate quote is grounded in primary data — government agencies, the Federal Reserve, and major financial institutions. We never fabricate numbers, and we mark every page with the period the data covers.
        </p>

        {/* Principles */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", marginBottom: 18, letterSpacing: "-0.01em" }}>
            Editorial principles
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ padding: "18px 22px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12 }}>
                <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                  Principle {i + 1}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", marginBottom: 18, letterSpacing: "-0.01em" }}>
            Primary data sources
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SOURCES.map((s, i) => (
              <div key={i} style={{ padding: "18px 22px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12 }}>
                <a href={s.url} target="_blank" rel="noopener" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 16, fontWeight: 700, display: "inline-block", marginBottom: 6 }}>
                  {s.name} ↗
                </a>
                <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 8px" }}>{s.desc}</p>
                <p style={{ fontSize: 12, color: "var(--text-faint)", lineHeight: 1.5, margin: 0 }}>
                  <strong style={{ color: "var(--text-muted)" }}>Used in:</strong> {s.used}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculator transparency */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14, letterSpacing: "-0.01em" }}>
            Calculator math
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 12 }}>
            Mortgage payments use the standard amortization formula: P × [r(1 + r)<sup>n</sup>] ÷ [(1 + r)<sup>n</sup> − 1], where r is the monthly rate and n is total months. Property taxes and insurance use state averages from the sources above. Retirement projections use the 4% safe withdrawal rate (Trinity Study, 1998) unless otherwise stated.
          </p>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 12 }}>
            Tax calculations use current-year IRS Revenue Procedures for federal brackets and standard deductions. State tax uses the top marginal rate per state — actual liability is lower because of progressive state brackets, but the difference is typically under 1% of total tax owed for most household incomes.
          </p>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            Cost-of-living calculations use composite indices from the Council for Community and Economic Research (C2ER) and ACS data. The national baseline is set at 100; values above 100 represent costs above national average.
          </p>
        </section>

        <div style={{ padding: "16px 22px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, fontSize: 13, color: "var(--text-muted)" }}>
          Pulsafi is editorially independent. Some pages contain affiliate links to financial products; these are clearly labeled as sponsored. Affiliate relationships do not influence which products or rates we display, or our editorial calculations.
        </div>
      </main>
      <Footer />
    </div>
  );
}

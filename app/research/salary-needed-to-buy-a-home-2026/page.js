import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffordabilityTable from "./AffordabilityTable";
import { HOME_AFFORDABILITY as H } from "../../data/homeAffordability";
import { STATE_FTHB_PROGRAMS } from "../../data/firstTimeHomebuyerData";

const URL = "https://www.pulsafi.com/research/salary-needed-to-buy-a-home-2026";
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const pct = (n) => `${n > 0 ? "+" : ""}${n.toFixed(1)}%`;
const monthLabel = new Date(H.zhviMonth + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const rateDateLabel = new Date(H.rateDate + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function monthlyPI(loan, ratePct) { const r = ratePct / 100 / 12, n = 360; return loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); }

export const metadata = {
  title: `Salary Needed to Buy a Home in 100 US Metros (${monthLabel.slice(-4)})`,
  description: `You need about ${fmt(H.national.down20.incomeNeeded)} a year to afford the median US home at ${H.rate30}%. See the income required in the 100 largest metros and every state, and how it compares with what households actually earn.`,
  alternates: { canonical: "/research/salary-needed-to-buy-a-home-2026" },
  openGraph: {
    type: "article",
    title: `The Salary You Need to Buy a Home in Every Major US Metro (${monthLabel})`,
    description: `Median US home: ${fmt(H.national.medianHomeValue)}. Income needed at ${H.rate30}%: ${fmt(H.national.down20.incomeNeeded)}. Full table for 100 metros + 50 states, free CSV.`,
    url: URL,
    images: [{ url: `/api/og?title=${encodeURIComponent("The salary you need to buy a home")}&subtitle=${encodeURIComponent(`100 metros · 50 states · ${monthLabel}`)}&type=article`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function SalaryNeededToBuyAHome() {
  const metros = H.metros;
  const byIncome = [...metros].sort((a, b) => b.down20.incomeNeeded - a.down20.incomeNeeded);
  const withGap = metros.filter(m => m.incomeGapRatio != null);
  const byGap = [...withGap].sort((a, b) => b.incomeGapRatio - a.incomeGapRatio);
  const affordable = withGap.filter(m => m.incomeGapRatio <= 1);
  const states = [...H.states].sort((a, b) => b.down20.incomeNeeded - a.down20.incomeNeeded);
  const fastest = [...metros].sort((a, b) => b.yoyChangePct - a.yoyChangePct);
  const median = (arr) => { const s = [...arr].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
  const medianGap = median(withGap.map(m => m.incomeGapRatio));
  // Sensitivity: what one percentage point on the rate does to the national number.
  const natLoan = H.national.medianHomeValue * 0.8;
  const natOther = H.national.down20.monthlyTax + H.national.down20.monthlyInsurance;
  const incomeAt = (r) => Math.round((monthlyPI(natLoan, r) + natOther) * 12 / 0.28 / 100) * 100;
  const rateDrop = incomeAt(H.rate30) - incomeAt(H.rate30 - 1);

  const findings = [
    `A household needs about ${fmt(H.national.down20.incomeNeeded)} a year to afford the median US home (${fmt(H.national.medianHomeValue)}) with 20% down at ${H.rate30}%. With 10% down it's ${fmt(incomeAt10(H))}.`,
    `${byIncome[0].metro} is the hardest major metro to buy into: ${fmt(byIncome[0].down20.incomeNeeded)} needed against a ${fmt(byIncome[0].medianHouseholdIncome)} median household income in ${byIncome[0].principalCity}, a ${byIncome[0].incomeGapRatio}× gap.`,
    affordable.length === 0
      ? `In none of the ${withGap.length} metros with income data does the median household in the principal city earn enough to buy the metro's median home with 20% down. The typical metro requires ${medianGap.toFixed(2)}× its median household income; the closest to affordable is ${byGap[byGap.length - 1].metro} at ${byGap[byGap.length - 1].incomeGapRatio}×.`
      : `In only ${affordable.length} of the ${withGap.length} metros with income data does the median household earn enough to buy the median home. The typical metro requires ${medianGap.toFixed(2)}× its median household income.`,
    `The most affordable large metro is ${byIncome[byIncome.length - 1].metro}: ${fmt(byIncome[byIncome.length - 1].down20.incomeNeeded)} needed on a ${fmt(byIncome[byIncome.length - 1].medianHomeValue)} median home.`,
    `Across states, ${states[0].state} requires the most (${fmt(states[0].down20.incomeNeeded)}) and ${states[states.length - 1].state} the least (${fmt(states[states.length - 1].down20.incomeNeeded)}).`,
    `Rates matter almost as much as prices: a one-point drop in the 30-year rate would cut the national income requirement by about ${fmt(rateDrop)} a year.`,
    `Prices are still rising in ${metros.filter(m => m.yoyChangePct > 0).length} of ${metros.length} metros; ${fastest[0].metro} leads at ${pct(fastest[0].yoyChangePct)} over the past year, while ${fastest[fastest.length - 1].metro} fell ${pct(fastest[fastest.length - 1].yoyChangePct)}.`,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": `The Salary You Need to Buy a Home in Every Major US Metro (${monthLabel})`,
        "description": metadata.description,
        "url": URL,
        "datePublished": "2026-09-19",
        "dateModified": H.generatedAt,
        "author": { "@type": "Organization", "name": "Pulsafi Research", "url": "https://www.pulsafi.com" },
        "publisher": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": { "@type": "ImageObject", "url": "https://www.pulsafi.com/logo.png" } },
      },
      {
        "@type": "Dataset",
        "name": "Salary Needed to Buy a Median Home, 100 US Metros and 50 States",
        "description": "Income required to afford the median home by metro and state, derived from Zillow ZHVI, the Freddie Mac 30-year rate, state property tax and insurance averages, and ACS median household income.",
        "url": URL,
        "isAccessibleForFree": true,
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "creator": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com" },
        "temporalCoverage": H.zhviMonth.slice(0, 7),
        "spatialCoverage": "United States",
        "dateModified": H.generatedAt,
        "distribution": [{ "@type": "DataDownload", "encodingFormat": "text/csv", "contentUrl": `${URL}/data.csv` }],
        "variableMeasured": ["Median home value", "Monthly housing payment", "Income needed", "Median household income", "Income gap ratio"],
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <section style={{ padding: "56px 24px 28px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--accent)", fontWeight: 700, marginBottom: 14 }}>
          Pulsafi Research · {monthLabel} data · updated monthly
        </div>
        <h1 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 auto 16px", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: 860 }}>
          The Salary You Need to Buy a Home in Every Major US Metro
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 17, maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
          We priced the median home in the 100 largest metros and all 50 states at today&apos;s mortgage rate, then compared the income it takes with what households there actually earn.
        </p>
      </section>

      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 32 }}>
          {[
            { label: "Median US home", value: fmt(H.national.medianHomeValue), sub: `Zillow ZHVI, ${monthLabel} · ${pct(H.national.yoyChangePct)} YoY` },
            { label: "30-year fixed rate", value: `${H.rate30.toFixed(2)}%`, sub: `Freddie Mac, ${rateDateLabel}` },
            { label: "Monthly payment", value: fmt(H.national.down20.monthlyPITI), sub: "20% down, incl. tax & insurance" },
            { label: "Income needed", value: fmt(H.national.down20.incomeNeeded), sub: "Payment ≤ 28% of gross income", accent: true },
          ].map(k => (
            <div key={k.label} style={{ background: "var(--bg-card)", border: `1px solid ${k.accent ? "var(--accent-border)" : "var(--border-card)"}`, borderRadius: 14, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 30, fontWeight: 700, fontFamily: "'Inter', monospace", letterSpacing: "-0.03em", color: k.accent ? "var(--accent)" : "var(--text-primary)" }}>{k.value}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 14 }}>Key findings</h2>
          <ol style={{ margin: 0, paddingLeft: 22, color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.75 }}>
            {findings.map((f, i) => <li key={i} style={{ marginBottom: 8 }}>{f}</li>)}
          </ol>
        </section>

        <section style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, margin: 0 }}>100 largest metros</h2>
            <a href="/research/salary-needed-to-buy-a-home-2026/data.csv" style={{ padding: "9px 16px", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#0d0f13", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Download CSV (free, attribution)</a>
          </div>
          <AffordabilityTable metros={metros.map(m => ({ rank: m.rank, metro: m.metro, slug: m.slug, medianHomeValue: m.medianHomeValue, yoyChangePct: m.yoyChangePct, down20: { monthlyPITI: m.down20.monthlyPITI, incomeNeeded: m.down20.incomeNeeded }, down10: { incomeNeeded: m.down10.incomeNeeded }, medianHouseholdIncome: m.medianHouseholdIncome, incomeGapRatio: m.incomeGapRatio }))} />
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 10, lineHeight: 1.6 }}>
            *Median household income is for the metro&apos;s principal city (US Census ACS), not the whole metro, so suburbs-heavy metros will show a larger gap than a metro-wide figure would. Gap = income needed at 20% down ÷ median household income.
          </p>
        </section>

        <section style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Every state, ranked</h2>
          <div style={{ overflowX: "auto", border: "1px solid var(--border-card)", borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 760 }}>
              <thead>
                <tr style={{ background: "var(--bg-input)" }}>
                  {["#", "State", "Median home value", "12-mo change", "Property tax", "Monthly payment (20% down)", "Income needed", "First-time buyer help"].map((h, i) => (
                    <th key={h} scope="col" style={{ padding: "10px 12px", textAlign: i >= 2 && i <= 6 ? "right" : "left", color: "var(--text-secondary)", fontWeight: 600, whiteSpace: "nowrap", borderBottom: "1px solid var(--border-card)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {states.map((s, i) => {
                  const f = STATE_FTHB_PROGRAMS[s.slug];
                  return (
                    <tr key={s.slug} style={{ borderBottom: "1px solid var(--border-card)" }}>
                      <td style={{ padding: "9px 12px", fontFamily: "'Inter', monospace" }}>{i + 1}</td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap" }}><a href={`/best-mortgage-rates/${s.slug}`} style={{ color: "var(--text-primary)", textDecoration: "none", fontWeight: 600 }}>{s.state}</a></td>
                      <td style={{ padding: "9px 12px", textAlign: "right", fontFamily: "'Inter', monospace" }}>{fmt(s.medianHomeValue)}</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", fontFamily: "'Inter', monospace", color: s.yoyChangePct >= 0 ? "var(--text-primary)" : "#e74c3c" }}>{pct(s.yoyChangePct)}</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", fontFamily: "'Inter', monospace" }}>{s.propertyTaxRate.toFixed(2)}%</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", fontFamily: "'Inter', monospace" }}>{fmt(s.down20.monthlyPITI)}</td>
                      <td style={{ padding: "9px 12px", textAlign: "right", fontFamily: "'Inter', monospace", fontWeight: 700, color: "var(--accent)" }}>{fmt(s.down20.incomeNeeded)}</td>
                      <td style={{ padding: "9px 12px", whiteSpace: "nowrap" }}>{f ? <a href={`/first-time-homebuyer/${s.slug}`} style={{ color: "var(--accent)", textDecoration: "none" }}>up to {f.dpaPct}% DPA</a> : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginBottom: 36, color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Methodology</h2>
          <p><strong style={{ color: "var(--text-primary)" }}>Home values</strong> are the Zillow Home Value Index (ZHVI) for the mid-tier of homes (35th to 65th percentile), smoothed and seasonally adjusted, for {monthLabel}. Metros are Zillow&apos;s 100 largest metropolitan statistical areas by size rank.</p>
          <p><strong style={{ color: "var(--text-primary)" }}>Mortgage rate</strong> is the Freddie Mac Primary Mortgage Market Survey 30-year fixed average for the week of {rateDateLabel} ({H.rate30}%), taken from FRED series MORTGAGE30US.</p>
          <p><strong style={{ color: "var(--text-primary)" }}>Monthly payment</strong> = principal and interest on a 30-year loan for 80% of the home value (or 90% for the 10%-down scenario, plus private mortgage insurance at 0.6% of the loan per year), plus the state&apos;s effective property tax rate applied to the home value, plus the state&apos;s average homeowners insurance premium. HOA dues and utilities are excluded.</p>
          <p><strong style={{ color: "var(--text-primary)" }}>Income needed</strong> assumes the housing payment is 28% of gross income, the classic front-end ratio used by conventional lenders, rounded to the nearest $100.</p>
          <p><strong style={{ color: "var(--text-primary)" }}>Median household income</strong> is from the US Census American Community Survey for the metro&apos;s principal city, as compiled in Pulsafi&apos;s <a href="/research/city-cost-of-living-index" style={{ color: "var(--accent)" }}>City Cost of Living Index</a>. Two metros (Washington, DC and St. Louis) lack a matching city record and are shown without a gap ratio.</p>
          <p>State property tax rates and insurance premiums are the same figures used across Pulsafi&apos;s <a href="/best-mortgage-rates/texas" style={{ color: "var(--accent)" }}>state mortgage pages</a>. The dataset was generated on {H.generatedAt} and is rebuilt when Zillow publishes new monthly data.</p>
        </section>

        <section style={{ marginBottom: 36, padding: "20px 22px", background: "var(--bg-card)", border: "1px solid var(--accent-border)", borderRadius: 12 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 10 }}>Use this data</div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 10px" }}>
            Journalists, researchers, and other sites may reuse any figure or the full CSV with a link back to this page. Suggested citation:
          </p>
          <div style={{ padding: "12px 16px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, fontFamily: "'Inter', monospace", fontSize: 13, lineHeight: 1.6, color: "var(--text-primary)" }}>
            Pulsafi Research, &ldquo;The Salary You Need to Buy a Home in Every Major US Metro&rdquo; ({monthLabel}). {URL}
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 10 }}>
            Questions or custom cuts of the data: <a href="/contact" style={{ color: "var(--accent)" }}>contact us</a>.
          </p>
        </section>

        <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Run your own numbers</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[
              ["/tools/mortgage-calculator", "Mortgage calculator"],
              ["/afford/100000-in-texas", "How much house can I afford?"],
              ["/first-time-homebuyer/california", "First-time buyer programs by state"],
              ["/best-mortgage-rates/florida", "Mortgage rates by state"],
              ["/rent-vs-buy/rent-2000-vs-buy-400000", "Rent vs. buy"],
            ].map(([href, label]) => (
              <a key={href} href={href} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "9px 14px", fontSize: 13, color: "var(--text-primary)", textDecoration: "none" }}>{label} →</a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// National 10%-down scenario computed the same way the builder does it (PMI at 0.6%/yr).
function incomeAt10(H) {
  const price = H.national.medianHomeValue;
  const loan = price * 0.9;
  const pmi = loan * 0.006 / 12;
  const piti = monthlyPI(loan, H.rate30) + H.national.down20.monthlyTax + H.national.down20.monthlyInsurance + pmi;
  return Math.round(piti * 12 / 0.28 / 100) * 100;
}

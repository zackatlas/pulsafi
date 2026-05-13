import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmailCapture from "../../components/EmailCapture";
import cityData from "../../data/cityData";

// Curated list of high-search "moving from X to Y" pairs.
// We pre-render these; any other valid pair still renders via ISR.
export const TOP_PAIRS = [
  // SF / NY / LA outflow magnets
  ["san-francisco-ca", "austin-tx"], ["san-francisco-ca", "miami-fl"],
  ["san-francisco-ca", "denver-co"], ["san-francisco-ca", "seattle-wa"],
  ["san-francisco-ca", "phoenix-az"], ["san-francisco-ca", "los-angeles-ca"],
  ["new-york-ny", "miami-fl"], ["new-york-ny", "austin-tx"],
  ["new-york-ny", "tampa-fl"], ["new-york-ny", "denver-co"],
  ["new-york-ny", "nashville-tn"], ["new-york-ny", "atlanta-ga"],
  ["los-angeles-ca", "austin-tx"], ["los-angeles-ca", "phoenix-az"],
  ["los-angeles-ca", "las-vegas-nv"], ["los-angeles-ca", "san-diego-ca"],
  ["los-angeles-ca", "miami-fl"], ["los-angeles-ca", "nashville-tn"],

  // Texas internal + outflow
  ["austin-tx", "dallas-tx"], ["austin-tx", "houston-tx"],
  ["austin-tx", "denver-co"], ["austin-tx", "nashville-tn"],
  ["dallas-tx", "houston-tx"], ["dallas-tx", "austin-tx"],
  ["dallas-tx", "phoenix-az"], ["dallas-tx", "atlanta-ga"],

  // Pacific NW + Mountain
  ["seattle-wa", "portland-or"], ["seattle-wa", "denver-co"],
  ["seattle-wa", "boise-id"], ["seattle-wa", "austin-tx"],
  ["denver-co", "phoenix-az"], ["denver-co", "salt-lake-city-ut"],
  ["portland-or", "seattle-wa"], ["portland-or", "boise-id"],

  // Southeast + Florida
  ["miami-fl", "tampa-fl"], ["miami-fl", "orlando-fl"],
  ["miami-fl", "jacksonville-fl"], ["tampa-fl", "orlando-fl"],
  ["atlanta-ga", "nashville-tn"], ["atlanta-ga", "charlotte-nc"],
  ["charlotte-nc", "raleigh-nc"], ["charlotte-nc", "atlanta-ga"],

  // Midwest + Boston
  ["chicago-il", "indianapolis-in"], ["chicago-il", "milwaukee-wi"],
  ["chicago-il", "minneapolis-mn"], ["chicago-il", "austin-tx"],
  ["boston-ma", "new-york-ny"], ["boston-ma", "providence-ri"],

  // High COL pair-ups (premium markets)
  ["san-jose-ca", "san-francisco-ca"], ["san-jose-ca", "austin-tx"],
  ["new-york-ny", "san-francisco-ca"], ["new-york-ny", "los-angeles-ca"],
  ["new-york-ny", "boston-ma"], ["new-york-ny", "chicago-il"],
];

export const dynamicParams = false;

export function generateStaticParams() {
  // Only emit pairs where both cities exist in cityData
  return TOP_PAIRS
    .filter(([a, b]) => cityData[a] && cityData[b])
    .map(([a, b]) => ({ slug: `${a}-vs-${b}` }));
}

function parseSlug(slug) {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  const [, a, b] = match;
  if (!cityData[a] || !cityData[b]) return null;
  if (a === b) return null;
  return { a, b, ca: cityData[a], cb: cityData[b] };
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { ca, cb } = parsed;
  return {
    title: `${ca.city}, ${ca.state} vs ${cb.city}, ${cb.state} — Cost of Living Comparison ${new Date().getFullYear()}`,
    description: `Compare the cost of living, rent, and salaries between ${ca.city} and ${cb.city}. ${ca.city} has a COL index of ${ca.index} vs ${cb.city}'s ${cb.index}. See the difference in 1-bedroom rent, median income, and what salary you'd need to maintain your lifestyle.`,
    alternates: { canonical: `/cost-of-living-vs/${slug}` },
    openGraph: {
      title: `${ca.city} vs ${cb.city} — Cost of Living Comparison`,
      description: `Side-by-side cost of living, rent, and salary comparison.`,
      url: `https://www.pulsafi.com/cost-of-living-vs/${slug}`,
    },
  };
}

export default async function CostOfLivingVsPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { a, b, ca, cb } = parsed;

  // Difference math
  const indexDiff = ((cb.index - ca.index) / ca.index) * 100;
  const rent1Diff = cb.rent1br - ca.rent1br;
  const rent2Diff = cb.rent2br - ca.rent2br;
  const incomeDiff = cb.medianIncome - ca.medianIncome;

  // "$X salary in A → $Y salary needed in B"
  const sampleSalaries = [60000, 80000, 100000, 150000];

  const cheaper = ca.index <= cb.index ? ca : cb;
  const pricier = ca.index <= cb.index ? cb : ca;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is ${ca.city} or ${cb.city} more expensive?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${pricier.city} is more expensive than ${cheaper.city}. ${pricier.city}'s cost of living index is ${pricier.index} vs ${cheaper.city}'s ${cheaper.index} — roughly ${Math.abs(indexDiff).toFixed(1)}% higher overall.`,
        },
      },
      {
        "@type": "Question",
        "name": `What salary do I need in ${cb.city} to match my ${ca.city} lifestyle?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `If you earn ${fmt(80000)} in ${ca.city}, you'd need approximately ${fmt(Math.round(80000 * (cb.index / ca.index)))} in ${cb.city} to maintain the same purchasing power, based on cost-of-living indices.`,
        },
      },
      {
        "@type": "Question",
        "name": `How does rent compare between ${ca.city} and ${cb.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A 1-bedroom apartment in ${ca.city} averages ${fmt(ca.rent1br)}/month vs ${fmt(cb.rent1br)}/month in ${cb.city}. 2-bedrooms run ${fmt(ca.rent2br)} vs ${fmt(cb.rent2br)}.`,
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
          Cost of living · Side-by-side
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          {ca.city}, {ca.state} <span style={{ color: "var(--accent)" }}>vs</span> {cb.city}, {cb.state}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          {pricier.city} is approximately <strong style={{ color: "var(--text-primary)" }}>{Math.abs(indexDiff).toFixed(1)}% more expensive</strong> than {cheaper.city}, but the differences are sharper in some categories than others.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Side-by-side metric grid */}
        <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>
            The numbers, side by side
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", color: "var(--text-secondary)", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em" }}>Metric</th>
                <th style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontWeight: 700 }}>{ca.city}</th>
                <th style={{ padding: "10px 12px", textAlign: "right", color: "var(--text-primary)", fontWeight: 700 }}>{cb.city}</th>
                <th style={{ padding: "10px 12px", textAlign: "right", color: "var(--accent)", fontWeight: 700 }}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Cost-of-living index", a: ca.index, b: cb.index, fmt: (v) => v, diff: cb.index - ca.index },
                { label: "1-bed rent (avg)", a: ca.rent1br, b: cb.rent1br, fmt: (v) => fmt(v), diff: rent1Diff, fmtDiff: true },
                { label: "2-bed rent (avg)", a: ca.rent2br, b: cb.rent2br, fmt: (v) => fmt(v), diff: rent2Diff, fmtDiff: true },
                { label: "Median household income", a: ca.medianIncome, b: cb.medianIncome, fmt: (v) => fmt(v), diff: incomeDiff, fmtDiff: true },
                { label: "Population", a: ca.population, b: cb.population, fmt: (v) => v.toLocaleString(), diff: cb.population - ca.population, fmtDiff: false, popDiff: true },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: i < 4 ? "1px solid var(--border-card)" : "none" }}>
                  <td style={{ padding: "12px", color: "var(--text-secondary)" }}>{row.label}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{row.fmt(row.a)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{row.fmt(row.b)}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: row.diff > 0 ? "#dc6f6f" : row.diff < 0 ? "#2ea66f" : "var(--text-faint)", fontFamily: "'Inter', monospace", fontWeight: 600 }}>
                    {row.diff > 0 ? "+" : ""}{row.fmtDiff ? fmt(row.diff) : row.popDiff ? row.diff.toLocaleString() : row.diff}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Salary equivalence calculator */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>
            What salary you'd need in {cb.city}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20, lineHeight: 1.6 }}>
            To maintain your {ca.city} purchasing power, here's what you'd need to earn in {cb.city}.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {sampleSalaries.map((salary) => {
              const equivalent = Math.round(salary * (cb.index / ca.index));
              const delta = equivalent - salary;
              return (
                <div key={salary} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "16px 18px" }}>
                  <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    {fmt(salary)} in {ca.city}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>
                    {fmt(equivalent)}
                  </div>
                  <div style={{ fontSize: 12, color: delta > 0 ? "#dc6f6f" : "#2ea66f", marginTop: 6, fontFamily: "'Inter', monospace" }}>
                    {delta > 0 ? "+" : ""}{fmt(delta)} {delta > 0 ? "more needed" : "less needed"}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            {ca.city} vs {cb.city}: which makes more sense for you?
          </h2>
          <p style={{ marginBottom: 16 }}>
            On paper, {pricier.city}'s cost-of-living index of {pricier.index} runs roughly {Math.abs(indexDiff).toFixed(1)}% higher than {cheaper.city}'s {cheaper.index}. But that headline number papers over real differences in how that cost is distributed — rent might be far more expensive while groceries and transit costs run closer to even.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>The rent gap</h3>
          <p style={{ marginBottom: 16 }}>
            A 1-bedroom apartment in {ca.city} averages {fmt(ca.rent1br)}/month, vs {fmt(cb.rent1br)}/month in {cb.city} — a {rent1Diff >= 0 ? "+" : ""}{fmt(rent1Diff)} difference. For 2-bedrooms, the gap widens to {rent2Diff >= 0 ? "+" : ""}{fmt(rent2Diff)}/month. Over a year, the rent difference alone is {fmt(Math.abs(rent1Diff * 12))} on a 1-bed.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Income context</h3>
          <p style={{ marginBottom: 16 }}>
            Median household income in {ca.city} is {fmt(ca.medianIncome)}, while {cb.city} runs {fmt(cb.medianIncome)} ({incomeDiff >= 0 ? "+" : ""}{fmt(incomeDiff)} difference). That matters for how the cost-of-living gap actually feels day-to-day — if local salaries are also higher, the cost difference washes out partly. If local salaries lag the cost-of-living gap, your paycheck buys noticeably less.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>State tax differences</h3>
          <p style={{ marginBottom: 16 }}>
            {ca.state === cb.state
              ? `Both cities are in the same state, so state income tax is identical. The cost difference is purely local — rent, transit, groceries, and lifestyle.`
              : `${ca.city} is in ${ca.stateFullName} and ${cb.city} is in ${cb.stateFullName}, so you'll also pick up a state-tax difference. Tax-free states like Texas, Florida, Tennessee, Washington, and Nevada deliver real take-home upside even when nominal salaries are similar.`}
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`cost-of-living-vs/${slug}`}
            headline="Track cost-of-living changes in The Pulse"
            subhead="Monthly insights on relocation, salary equivalence, and city-by-city affordability."
          />
        </div>

        {/* Other comparisons */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Compare more cities</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TOP_PAIRS.filter(([x, y]) => (x !== a || y !== b) && cityData[x] && cityData[y]).slice(0, 8).map(([x, y]) => (
              <a key={`${x}-${y}`} href={`/cost-of-living-vs/${x}-vs-${y}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
                {cityData[x].city} vs {cityData[y].city} →
              </a>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

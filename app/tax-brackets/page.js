import Header from "../components/Header";
import Footer from "../components/Footer";

const STATES = [
  ["alabama", "Alabama"], ["alaska", "Alaska"], ["arizona", "Arizona"], ["arkansas", "Arkansas"], ["california", "California"],
  ["colorado", "Colorado"], ["connecticut", "Connecticut"], ["delaware", "Delaware"], ["florida", "Florida"], ["georgia", "Georgia"],
  ["hawaii", "Hawaii"], ["idaho", "Idaho"], ["illinois", "Illinois"], ["indiana", "Indiana"], ["iowa", "Iowa"],
  ["kansas", "Kansas"], ["kentucky", "Kentucky"], ["louisiana", "Louisiana"], ["maine", "Maine"], ["maryland", "Maryland"],
  ["massachusetts", "Massachusetts"], ["michigan", "Michigan"], ["minnesota", "Minnesota"], ["mississippi", "Mississippi"], ["missouri", "Missouri"],
  ["montana", "Montana"], ["nebraska", "Nebraska"], ["nevada", "Nevada"], ["new-hampshire", "New Hampshire"], ["new-jersey", "New Jersey"],
  ["new-mexico", "New Mexico"], ["new-york", "New York"], ["north-carolina", "North Carolina"], ["north-dakota", "North Dakota"], ["ohio", "Ohio"],
  ["oklahoma", "Oklahoma"], ["oregon", "Oregon"], ["pennsylvania", "Pennsylvania"], ["rhode-island", "Rhode Island"], ["south-carolina", "South Carolina"],
  ["south-dakota", "South Dakota"], ["tennessee", "Tennessee"], ["texas", "Texas"], ["utah", "Utah"], ["vermont", "Vermont"],
  ["virginia", "Virginia"], ["washington", "Washington"], ["west-virginia", "West Virginia"], ["wisconsin", "Wisconsin"], ["wyoming", "Wyoming"],
  ["district-of-columbia", "District of Columbia"],
];

const POPULAR_INCOMES = [50000, 75000, 100000, 150000, 200000];
const POPULAR_STATES = ["california", "texas", "florida", "new-york", "illinois", "washington", "georgia", "north-carolina"];

function fmtIncome(n) {
  return `$${(n / 1000).toFixed(0)}K`;
}

export const metadata = {
  title: "Tax Brackets by State & Income (2026)",
  description: "Federal and state tax bracket breakdowns for every popular income across all 50 states. See your effective rate, marginal bracket, FICA, and take-home pay.",
  alternates: { canonical: "https://www.pulsafi.com/tax-brackets" },
  openGraph: {
    title: "Tax Brackets by State & Income (2026)",
    description: "2026 federal and state tax bracket breakdowns by income, with effective rate and take-home estimates.",
    url: "https://www.pulsafi.com/tax-brackets",
    type: "website",
  },
};

export default function TaxBracketsHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Tax Brackets by State and Income",
    "itemListElement": POPULAR_STATES.flatMap((state, si) =>
      POPULAR_INCOMES.map((income, ii) => {
        const stateName = STATES.find(([s]) => s === state)[1];
        return {
          "@type": "ListItem",
          "position": si * POPULAR_INCOMES.length + ii + 1,
          "name": `${fmtIncome(income)} income in ${stateName}`,
          "url": `https://www.pulsafi.com/tax-brackets/${state}-${income}`,
        };
      })
    ),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Tax Brackets</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What Will I Owe in Taxes?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Pick your state and income. We'll show your federal bracket, state bracket, FICA, effective rate, and estimated take-home — for the 2026 tax year.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Most-Searched States × Incomes</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Each cell shows the full federal + state breakdown, plus take-home pay after standard deduction.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 40 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--bg-card)" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>State</th>
                {POPULAR_INCOMES.map(i => (
                  <th key={i} style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>{fmtIncome(i)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POPULAR_STATES.map(state => {
                const stateName = STATES.find(([s]) => s === state)[1];
                return (
                  <tr key={state} style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>{stateName}</td>
                    {POPULAR_INCOMES.map(income => (
                      <td key={income} style={{ padding: "12px 14px", textAlign: "right" }}>
                        <a href={`/tax-brackets/${state}-${income}`} style={{ color: "#2563eb", textDecoration: "none" }}>View →</a>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>All 50 States + DC</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Each link goes to the $100K bracket breakdown for that state — links to other income levels are on each page.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 40 }}>
          {STATES.map(([slug, name]) => (
            <a key={slug} href={`/tax-brackets/${slug}-100000`} style={{
              padding: "10px 14px", background: "var(--bg-card)", border: "1px solid var(--border-card)",
              borderRadius: 10, textDecoration: "none", color: "var(--text-primary)", fontSize: 14,
            }}>{name}</a>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px", color: "white" }}>
          <div style={{ fontSize: 12, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Custom Income</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Salary Breakdown Calculator</h3>
          <p style={{ fontSize: 14, opacity: 0.95, margin: "0 0 16px", lineHeight: 1.6 }}>Different income or filing status? See your full take-home pay with federal, state, FICA, and 401(k) modeled out.</p>
          <a href="/tools/salary-breakdown-calculator" style={{ display: "inline-block", background: "white", color: "#2563eb", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open Calculator →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

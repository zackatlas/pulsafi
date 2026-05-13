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

const POPULAR_PRICES = [300000, 400000, 500000, 750000, 1000000];
const POPULAR_STATES = ["california", "texas", "florida", "new-york", "arizona", "north-carolina", "georgia", "washington"];

function fmtPrice(p) {
  if (p >= 1000000) return `$${(p / 1000000).toFixed(0)}M`;
  return `$${(p / 1000).toFixed(0)}K`;
}

export const metadata = {
  title: "Mortgage Affordability by State & Home Price",
  description: "Can I afford a $300K, $400K, $500K, or $1M home? See monthly mortgage payment, property taxes, insurance, and the salary you need — for every state.",
  alternates: { canonical: "https://www.pulsafi.com/mortgage" },
  openGraph: {
    title: "Mortgage Affordability by State & Home Price",
    description: "Real mortgage costs and salary requirements for every popular home price across all 50 states.",
    url: "https://www.pulsafi.com/mortgage",
    type: "website",
  },
};

export default function MortgageHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Mortgage Affordability by State and Home Price",
    "itemListElement": POPULAR_STATES.flatMap((state, si) =>
      POPULAR_PRICES.map((price, pi) => {
        const stateName = STATES.find(([s]) => s === state)[1];
        return {
          "@type": "ListItem",
          "position": si * POPULAR_PRICES.length + pi + 1,
          "name": `${fmtPrice(price)} home in ${stateName}`,
          "url": `https://www.pulsafi.com/mortgage/${state}-${price}`,
        };
      })
    ),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Mortgage Affordability</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Can I Afford This Home?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Pick a home price and a state. We'll show monthly payment, property taxes, insurance, and the income you'd need — using current rates and state-specific tax data.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>Popular Home Prices in High-Demand States</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Each cell links to a full mortgage breakdown for that price in that state — including PMI thresholds, down-payment scenarios, and the salary you'd need to qualify.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 40 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--bg-card)" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>State</th>
                {POPULAR_PRICES.map(p => (
                  <th key={p} style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>{fmtPrice(p)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {POPULAR_STATES.map(state => {
                const stateName = STATES.find(([s]) => s === state)[1];
                return (
                  <tr key={state} style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 600 }}>{stateName}</td>
                    {POPULAR_PRICES.map(price => (
                      <td key={price} style={{ padding: "12px 14px", textAlign: "right" }}>
                        <a href={`/mortgage/${state}-${price}`} style={{ color: "#2563eb", textDecoration: "none" }}>View →</a>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16, color: "var(--text-primary)" }}>All 50 States + DC</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Pick any state to see mortgage breakdowns at a $400K home — the most common price point in 2026 — and links to other prices from there.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 40 }}>
          {STATES.map(([slug, name]) => (
            <a key={slug} href={`/mortgage/${slug}-400000`} style={{
              padding: "10px 14px", background: "var(--bg-card)", border: "1px solid var(--border-card)",
              borderRadius: 10, textDecoration: "none", color: "var(--text-primary)", fontSize: 14, transition: "border-color 0.2s",
            }}>{name}</a>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px", color: "white", marginBottom: 24 }}>
          <div style={{ fontSize: 12, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Run Your Own Numbers</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Mortgage Calculator</h3>
          <p style={{ fontSize: 14, opacity: 0.95, margin: "0 0 16px", lineHeight: 1.6 }}>Customize the price, down payment, rate, and term to model any scenario.</p>
          <a href="/tools/mortgage-calculator" style={{ display: "inline-block", background: "white", color: "#2563eb", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open Calculator →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import cityData from "../data/cityData";

export const metadata = {
  title: "Cost of Living by City — 2026 Data",
  description: "Cost of living index, average rent, and median income for cities across the U.S. Compare any city to the national average with up-to-date 2026 data.",
  alternates: { canonical: "https://www.pulsafi.com/cost-of-living" },
  openGraph: {
    title: "Cost of Living by City — 2026 Data",
    description: "Browse cost of living data for major U.S. cities, including index, rent, and median income.",
    url: "https://www.pulsafi.com/cost-of-living",
    type: "website",
  },
};

export default function CostOfLivingHubPage() {
  const allCities = Object.entries(cityData)
    .map(([slug, c]) => ({ slug, ...c }))
    .sort((a, b) => b.population - a.population);

  const topCities = allCities.slice(0, 60);
  const byState = {};
  for (const c of allCities.slice(0, 200)) {
    (byState[c.stateFullName || c.state] ||= []).push(c);
  }
  const sortedStates = Object.keys(byState).sort();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Cost of Living by City",
    "itemListElement": topCities.slice(0, 30).map((c, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": `Cost of living in ${c.city}, ${c.state}`,
      "url": `https://www.pulsafi.com/cost-of-living/${c.slug}`,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Cost of Living</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What Does It Cost to Live There?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Cost of living index, 1BR and 2BR rent, median income, and population for cities across the U.S. — updated for 2026.
        </p>
      </section>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Top 60 Cities by Population</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Cost-of-living index where 100 = national average. Higher means more expensive.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 40 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--bg-card)" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>City</th>
                <th style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>COL Index</th>
                <th style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>1BR Rent</th>
                <th style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>Median Income</th>
              </tr>
            </thead>
            <tbody>
              {topCities.map(c => (
                <tr key={c.slug} style={{ borderBottom: "1px solid var(--border-card)" }}>
                  <td style={{ padding: "12px 14px" }}>
                    <a href={`/cost-of-living/${c.slug}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: 600 }}>
                      {c.city}, {c.state}
                    </a>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "right" }}>{c.index}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right" }}>${c.rent1br.toLocaleString()}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right" }}>${c.medianIncome.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Browse by State</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          The 200 largest U.S. cities, grouped by state.
        </p>
        {sortedStates.map(state => (
          <div key={state} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: "var(--text-secondary)" }}>{state}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {byState[state].map(c => (
                <a key={c.slug} href={`/cost-of-living/${c.slug}`} style={{
                  padding: "8px 12px", background: "var(--bg-card)", border: "1px solid var(--border-card)",
                  borderRadius: 8, textDecoration: "none", color: "var(--text-primary)", fontSize: 13,
                }}>{c.city}</a>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px", color: "white", marginTop: 32 }}>
          <div style={{ fontSize: 12, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Compare Two Cities</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>City vs City Comparisons</h3>
          <p style={{ fontSize: 14, opacity: 0.95, margin: "0 0 16px", lineHeight: 1.6 }}>Side-by-side cost-of-living comparisons for any pair of cities — see what your salary would be worth if you moved.</p>
          <a href="/cost-of-living-vs/san-francisco-ca-vs-austin-tx" style={{ display: "inline-block", background: "white", color: "#2563eb", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>See Example →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

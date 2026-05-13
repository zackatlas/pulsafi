import Header from "../components/Header";
import Footer from "../components/Footer";

const RENTS = [1500, 1800, 2000, 2500, 3000, 3500, 4000];
const PRICES = [250000, 300000, 400000, 500000, 700000, 1000000];

function fmtPrice(p) {
  if (p >= 1000000) return `$${(p / 1000000).toFixed(0)}M`;
  return `$${(p / 1000).toFixed(0)}K`;
}

export const metadata = {
  title: "Rent vs Buy: Side-by-Side Comparisons",
  description: "Should you rent or buy? Compare every popular rent vs home-price combination — total cost, equity, opportunity cost — over 5 to 30 years.",
  alternates: { canonical: "https://www.pulsafi.com/rent-vs-buy" },
  openGraph: {
    title: "Rent vs Buy: Side-by-Side Comparisons",
    description: "Real cost comparisons of renting vs buying at every price and rent point, with break-even analysis.",
    url: "https://www.pulsafi.com/rent-vs-buy",
    type: "website",
  },
};

export default function RentVsBuyHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Rent vs Buy Comparisons",
    "itemListElement": RENTS.flatMap((rent, ri) =>
      PRICES.map((price, pi) => ({
        "@type": "ListItem",
        "position": ri * PRICES.length + pi + 1,
        "name": `Rent $${rent}/mo vs Buy ${fmtPrice(price)}`,
        "url": `https://www.pulsafi.com/rent-vs-buy/rent-${rent}-vs-buy-${price}`,
      }))
    ),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Rent vs Buy</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Is Renting or Buying Cheaper?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Pick your current rent and the price of a home you're considering. We'll show the true 5-to-30-year cost of each path — including equity, appreciation, and the opportunity cost of your down payment.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Compare Any Rent vs Home Price</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Each cell is a full breakdown — monthly cost, equity build-up at each year, and when buying breaks even with renting.
        </p>

        <div style={{ overflowX: "auto", marginBottom: 40 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr style={{ background: "var(--bg-card)" }}>
                <th style={{ padding: "12px 14px", textAlign: "left", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>Your Rent</th>
                {PRICES.map(p => (
                  <th key={p} style={{ padding: "12px 14px", textAlign: "right", fontWeight: 600, borderBottom: "2px solid var(--border-card)" }}>vs {fmtPrice(p)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RENTS.map(rent => (
                <tr key={rent} style={{ borderBottom: "1px solid var(--border-card)" }}>
                  <td style={{ padding: "12px 14px", fontWeight: 600 }}>${rent.toLocaleString()}/mo</td>
                  {PRICES.map(price => (
                    <td key={price} style={{ padding: "12px 14px", textAlign: "right" }}>
                      <a href={`/rent-vs-buy/rent-${rent}-vs-buy-${price}`} style={{ color: "#2563eb", textDecoration: "none" }}>Compare →</a>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px", color: "white" }}>
          <div style={{ fontSize: 12, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Custom Comparison</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>Rent vs Buy Calculator</h3>
          <p style={{ fontSize: 14, opacity: 0.95, margin: "0 0 16px", lineHeight: 1.6 }}>Different rent or price than the table? Use the full calculator to model your exact numbers — including HOA, property tax rate, and your timeline.</p>
          <a href="/tools/rent-vs-buy-calculator" style={{ display: "inline-block", background: "white", color: "#2563eb", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open Calculator →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";
import EmailCapture from "../components/EmailCapture";
import { STATS, STATS_BY_CATEGORY, STAT_CATEGORY_LABELS } from "../data/stats";

export const metadata = {
  title: `Pulsafi Stats — ${STATS.length}+ Personal Finance Benchmarks for ${new Date().getFullYear()}`,
  description: `Authoritative personal finance statistics for ${new Date().getFullYear()}: median income, average 401(k) balance by age, mortgage rates, tax brackets, credit card debt. Each stat sourced and updated.`,
  alternates: { canonical: "/stats" },
  openGraph: {
    title: "Pulsafi Stats — Personal Finance Benchmarks",
    description: `${STATS.length}+ data-backed personal finance stats updated for the current year.`,
    url: "https://www.pulsafi.com/stats",
  },
};

const CATEGORY_ORDER = ["retirement", "income", "wealth", "housing", "debt", "credit", "tax", "investing", "savings"];

export default function StatsHub() {
  // ItemList schema — Google may render this as a rich list
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": STATS.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.pulsafi.com/stats/${s.slug}`,
      name: s.title,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Pulsafi Stats
        </div>
        <h1 style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          margin: "0 0 14px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>
          The personal finance benchmarks
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          {STATS.length}+ atomic stats — median balances, average rates, top tax brackets, and key thresholds. Every stat is sourced, dated, and current to {new Date().getFullYear()}.
        </p>
      </section>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 24px 60px" }}>
        {CATEGORY_ORDER.filter(c => STATS_BY_CATEGORY[c]?.length).map(category => {
          const items = STATS_BY_CATEGORY[category] || [];
          return (
            <section key={category} style={{ marginBottom: 52 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, margin: 0, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
                  {STAT_CATEGORY_LABELS[category] || category}
                </h2>
                <div style={{ fontSize: 12, color: "var(--text-faint)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {items.length} {items.length === 1 ? "stat" : "stats"}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
                {items.map(s => (
                  <a key={s.slug} href={`/stats/${s.slug}`} style={{
                    padding: "20px 22px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: 12,
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    minHeight: 130,
                  }}>
                    <div>
                      <div style={{ fontSize: 26, fontWeight: 600, color: "var(--accent)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em", marginBottom: 6 }}>
                        {s.headline}
                      </div>
                      <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500, lineHeight: 1.4 }}>
                        {s.title.replace(/\s*\(\d{4}\)\s*$/, "")}
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 12, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      {s.source?.name || "Pulsafi"}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        <div style={{ marginTop: 32, padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>
          All Pulsafi stats are sourced from primary government data (BLS, Census, IRS, Federal Reserve, SSA) and major financial institutions (Vanguard, FDIC, NAR). Read the full <a href="/methodology" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>methodology and data-sources page</a> for sourcing standards and update cadence.
        </div>

        <div style={{ marginTop: 28 }}>
          <EmailCapture source="stats-index" headline="The Pulse — Weekly stats and benchmarks" subhead="New personal finance data drops weekly. Be first to see it." />
        </div>
      </main>
      <Footer />
    </div>
  );
}

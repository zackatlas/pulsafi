import Header from "../components/Header";
import Footer from "../components/Footer";
import EmailCapture from "../components/EmailCapture";
import { DAILY_ENTRIES } from "../data/dailyPulse";

export const metadata = {
  title: "Daily Pulse Archive — Personal Finance Brief, Every Market Day | Pulsafi",
  description: "Pulsafi's daily personal finance brief: today's mortgage rates, savings APYs, Treasury yields, and market summary. Updated every market day.",
  alternates: { canonical: "/daily" },
  openGraph: {
    title: "Daily Pulse — Pulsafi",
    description: "Personal finance summary every market day.",
    url: "https://www.pulsafi.com/daily",
  },
};

export default function DailyArchive() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": DAILY_ENTRIES.slice(0, 30).map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.pulsafi.com/daily/${e.slug}`,
      name: `${e.displayDate} — ${e.headline}`,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Daily Pulse Archive
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontFamily: "'Playfair Display', serif", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          The market every weekday
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          Mortgage rates, savings APYs, Treasury yields, and market summaries — captured every market day. {DAILY_ENTRIES.length} briefings in the archive so far.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DAILY_ENTRIES.map(e => (
            <a key={e.slug} href={`/daily/${e.slug}`} style={{
              padding: "18px 22px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: 12,
              textDecoration: "none",
              color: "inherit",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              gap: 16,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", fontWeight: 700, marginBottom: 6 }}>
                  {e.displayDate}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.4, marginBottom: 4 }}>
                  {e.headline}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'Inter', monospace" }}>
                  30yr {e.rates.mortgage30}% · HYSA {e.rates.hysa}% · S&P {e.markets.sp500.toLocaleString()}
                </div>
              </div>
              <div style={{ color: "var(--accent)", fontSize: 14, flexShrink: 0 }}>→</div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 40 }}>
          <EmailCapture source="daily-archive" headline="Get the daily pulse delivered" subhead="One short brief every Friday with the week's most important rate moves." />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmailCapture from "../../components/EmailCapture";
import { DAILY_ENTRIES, DAILY_BY_SLUG } from "../../data/dailyPulse";

export const dynamicParams = false;

export function generateStaticParams() {
  return DAILY_ENTRIES.map(e => ({ date: e.slug }));
}

export async function generateMetadata({ params }) {
  const { date } = await params;
  const e = DAILY_BY_SLUG[date];
  if (!e) return {};
  return {
    title: `${e.displayDate} Money Brief — ${e.headline}`,
    description: e.summary,
    alternates: { canonical: `/daily/${e.slug}` },
    openGraph: {
      title: `${e.displayDate} — ${e.headline}`,
      description: e.summary,
      url: `https://www.pulsafi.com/daily/${e.slug}`,
      type: "article",
      publishedTime: e.date,
    },
    twitter: {
      card: "summary_large_image",
      title: `${e.displayDate} Money Brief`,
      description: e.summary,
    },
  };
}

export default async function DailyPulse({ params }) {
  const { date } = await params;
  const e = DAILY_BY_SLUG[date];
  if (!e) notFound();

  // Find prev/next entries for navigation
  const idx = DAILY_ENTRIES.findIndex(x => x.slug === e.slug);
  const prev = DAILY_ENTRIES[idx + 1]; // archive sorted newest-first, so next index is older
  const next = DAILY_ENTRIES[idx - 1];

  // NewsArticle schema — AI engines treat this as a news source, prioritizing freshness
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": `${e.displayDate} Money Brief — ${e.headline}`,
    "datePublished": e.date,
    "dateModified": e.date,
    "description": e.summary,
    "url": `https://www.pulsafi.com/daily/${e.slug}`,
    "publisher": {
      "@type": "Organization",
      "name": "Pulsafi",
      "url": "https://www.pulsafi.com",
    },
    "author": {
      "@type": "Organization",
      "name": "Pulsafi Editorial",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.pulsafi.com/daily/${e.slug}`,
    },
  };

  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".daily-headline", ".daily-summary"],
    },
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <Header />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>
        <nav style={{ marginBottom: 24, fontSize: 13, color: "var(--text-muted)", display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a href="/daily" style={{ color: "var(--accent)", textDecoration: "none" }}>Daily Pulse</a>
          <span style={{ color: "var(--text-faint)" }}>›</span>
          <span>{e.displayDate}</span>
        </nav>

        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--accent)", fontWeight: 700, marginBottom: 14 }}>
          {e.displayDate}
        </div>
        <h1 className="daily-headline" style={{
          fontSize: "clamp(28px, 4.5vw, 40px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          margin: "0 0 22px",
          lineHeight: 1.15, letterSpacing: "-0.02em",
        }}>
          {e.headline}
        </h1>

        <p className="daily-summary" style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 32 }}>
          {e.summary}
        </p>

        {/* Rates section */}
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
            Today's rates
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
            {[
              { label: "30yr fixed", value: `${e.rates.mortgage30}%` },
              { label: "15yr fixed", value: `${e.rates.mortgage15}%` },
              { label: "5/1 ARM", value: `${e.rates.arm5}%` },
              { label: "Top HYSA", value: `${e.rates.hysa}%` },
              { label: "1yr T-Bill", value: `${e.rates.tbill1y}%` },
              { label: "10yr Treasury", value: `${e.rates.tbill10y}%` },
              { label: "Fed Funds", value: `${e.rates.fedFunds}%` },
            ].map((r, i) => (
              <div key={i} style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: 10,
                padding: "12px 14px",
              }}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-faint)", marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontSize: 18, fontFamily: "'Inter', monospace", fontWeight: 600, color: "var(--text-primary)" }}>{r.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Markets */}
        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
            Markets
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              { label: "S&P 500", value: e.markets.sp500.toLocaleString(), change: e.markets.sp500Change },
              { label: "Bitcoin", value: `$${e.markets.btc.toLocaleString()}`, change: e.markets.btcChange },
            ].map((m, i) => (
              <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 10, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 22, fontFamily: "'Inter', monospace", fontWeight: 600, color: "var(--text-primary)" }}>{m.value}</div>
                <div style={{ fontSize: 12, fontFamily: "'Inter', monospace", color: m.change >= 0 ? "#2ea66f" : "#dc6f6f", fontWeight: 600, marginTop: 4 }}>
                  {m.change >= 0 ? "↑" : "↓"} {Math.abs(m.change).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prev / next nav */}
        <section style={{ marginTop: 32, padding: "20px 0", borderTop: "1px solid var(--border-card)", borderBottom: "1px solid var(--border-card)", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            {prev && (
              <a href={`/daily/${prev.slug}`} style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                ← {prev.displayDate}
              </a>
            )}
          </div>
          <div>
            {next && (
              <a href={`/daily/${next.slug}`} style={{ color: "var(--accent)", textDecoration: "none", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                {next.displayDate} →
              </a>
            )}
          </div>
        </section>

        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`daily/${e.slug}`}
            headline="Get The Pulse weekly"
            subhead="A short Friday brief with the week's biggest rate moves and tools — directly from this archive."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmailCapture from "../../components/EmailCapture";
import { STATS, STAT_BY_SLUG, STATS_BY_CATEGORY, STAT_CATEGORY_LABELS } from "../../data/stats";

export const dynamicParams = false;

export function generateStaticParams() {
  return STATS.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = STAT_BY_SLUG[slug];
  if (!s) return {};
  return {
    title: `${s.title} | Pulsafi`,
    description: s.summary,
    alternates: { canonical: `/stats/${slug}` },
    openGraph: {
      title: s.title,
      description: s.summary,
      url: `https://www.pulsafi.com/stats/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.summary,
    },
    other: {
      // Hint to AI crawlers that this page is current and citable
      "article:published_time": s.asOf,
      "article:modified_time": new Date().toISOString(),
    },
  };
}

export default async function StatPage({ params }) {
  const { slug } = await params;
  const s = STAT_BY_SLUG[slug];
  if (!s) notFound();

  const moreInCategory = (STATS_BY_CATEGORY[s.category] || [])
    .filter(x => x.slug !== s.slug)
    .slice(0, 6);

  const related = (s.related || [])
    .map(r => STAT_BY_SLUG[r])
    .filter(Boolean);

  // Schema.org Dataset — gold for AI engines, especially Google Dataset Search
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": s.title,
    "description": s.summary,
    "url": `https://www.pulsafi.com/stats/${slug}`,
    "creator": {
      "@type": "Organization",
      "name": "Pulsafi",
      "url": "https://www.pulsafi.com",
    },
    "isAccessibleForFree": true,
    "license": "https://www.pulsafi.com/terms",
    "dateModified": new Date().toISOString(),
    "datePublished": s.asOf,
    "citation": s.source ? {
      "@type": "CreativeWork",
      "name": s.source.name,
      "url": s.source.url,
    } : undefined,
    "variableMeasured": s.headlineLabel,
  };

  // QAPage schema — many AI engines index single-stat pages as Q&A
  const qaJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": s.title,
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": s.summary,
      },
    },
  };

  // Speakable — flags content for voice/AI assistants
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".stat-headline", ".stat-summary"],
    },
  };

  // Breadcrumb
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pulsafi.com" },
      { "@type": "ListItem", position: 2, name: "Stats", item: "https://www.pulsafi.com/stats" },
      { "@type": "ListItem", position: 3, name: STAT_CATEGORY_LABELS[s.category] || s.category, item: `https://www.pulsafi.com/stats?category=${s.category}` },
      { "@type": "ListItem", position: 4, name: s.title, item: `https://www.pulsafi.com/stats/${slug}` },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 28, fontSize: 13, color: "var(--text-muted)", display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a href="/stats" style={{ color: "var(--accent)", textDecoration: "none" }}>Stats</a>
          <span style={{ color: "var(--text-faint)" }}>›</span>
          <a href={`/stats?category=${s.category}`} style={{ color: "var(--accent)", textDecoration: "none" }}>{STAT_CATEGORY_LABELS[s.category] || s.category}</a>
        </nav>

        {/* Title */}
        <h1 style={{
          fontSize: "clamp(28px, 4.5vw, 38px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          margin: "0 0 28px",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}>
          {s.title}
        </h1>

        {/* Headline number — citation target */}
        <div className="stat-headline" style={{
          padding: "32px 30px 28px",
          background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))",
          border: "1px solid var(--accent-border)",
          borderRadius: 16,
          marginBottom: 24,
          textAlign: "center",
        }}>
          <div style={{
            fontSize: "clamp(56px, 9vw, 88px)",
            fontFamily: "'Inter', monospace",
            fontWeight: 200,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(180deg, var(--accent), var(--accent-dark))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 14,
          }}>
            {s.headline}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", letterSpacing: "0.02em", maxWidth: 540, margin: "0 auto", lineHeight: 1.5 }}>
            {s.headlineLabel}
          </div>
        </div>

        {/* Summary — featured snippet bait */}
        <div className="stat-summary" style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          borderLeft: "4px solid var(--accent)",
          borderRadius: 12,
          padding: "22px 26px",
          marginBottom: 28,
        }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>
            Summary
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--text-primary)", margin: 0 }}>
            {s.summary}
          </p>
        </div>

        {/* Breakdown table — atomic facts AI engines love */}
        {s.breakdown && s.breakdown.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
              Breakdown
            </h2>
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <tbody>
                  {s.breakdown.map((row, i) => (
                    <tr key={i} style={{ borderBottom: i < s.breakdown.length - 1 ? "1px solid var(--border-card)" : "none" }}>
                      <td style={{ padding: "14px 22px", color: "var(--text-secondary)" }}>{row.label}</td>
                      <td style={{ padding: "14px 22px", textAlign: "right", fontFamily: "'Inter', monospace", fontWeight: 600, color: "var(--text-primary)" }}>{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Source attribution — E-E-A-T signal */}
        {s.source && (
          <section style={{ marginBottom: 28, background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "16px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--accent)" }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
              </svg>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontWeight: 700 }}>
                Source
              </div>
            </div>
            <div style={{ fontSize: 14, color: "var(--text-primary)" }}>
              <a href={s.source.url} target="_blank" rel="noopener" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
                {s.source.name}
              </a>
              <span style={{ color: "var(--text-muted)", marginLeft: 10 }}>· As of {s.asOf}</span>
            </div>
          </section>
        )}

        {/* Related stats */}
        {related.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
              Related stats
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {related.map(r => (
                <a key={r.slug} href={`/stats/${r.slug}`} style={{
                  padding: "10px 16px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  borderRadius: 8,
                  color: "var(--text-primary)",
                  fontSize: 13,
                  textDecoration: "none",
                }}>
                  {r.title.replace(/\s*\(\d{4}\)\s*$/, "")} →
                </a>
              ))}
            </div>
          </section>
        )}

        {/* More in category */}
        {moreInCategory.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
              More {STAT_CATEGORY_LABELS[s.category]?.toLowerCase() || s.category} stats
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {moreInCategory.map(x => (
                <a key={x.slug} href={`/stats/${x.slug}`} style={{
                  padding: "8px 14px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: 8,
                  color: "var(--text-secondary)",
                  fontSize: 12,
                  textDecoration: "none",
                }}>
                  {x.title.replace(/\s*\(\d{4}\)\s*$/, "")}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Methodology link */}
        <div style={{ marginBottom: 24, padding: "14px 18px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 10, fontSize: 13, color: "var(--text-muted)" }}>
          All Pulsafi stats are sourced from primary government data and major financial institutions. Read the full <a href="/methodology" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>methodology and data-sources page</a>.
        </div>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`stats/${slug}`}
            headline="Get the new stats every week"
            subhead="The Pulse newsletter — fresh personal finance benchmarks delivered weekly."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

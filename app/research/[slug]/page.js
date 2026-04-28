import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmailCapture from "../../components/EmailCapture";
import { DATASETS, DATASET_BY_SLUG } from "../../data/researchDatasets";

export const dynamicParams = false;

export function generateStaticParams() {
  return DATASETS.map(d => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const d = DATASET_BY_SLUG[slug];
  if (!d) return {};
  return {
    title: `${d.name} — Pulsafi Research`,
    description: d.summary,
    alternates: { canonical: `/research/${slug}` },
    openGraph: {
      title: d.name,
      description: d.summary,
      url: `https://www.pulsafi.com/research/${slug}`,
    },
  };
}

export default async function DatasetPage({ params }) {
  const { slug } = await params;
  const d = DATASET_BY_SLUG[slug];
  if (!d) notFound();

  // Schema.org Dataset — gold for AI engines + Google Dataset Search
  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": d.name,
    "description": d.summary,
    "url": `https://www.pulsafi.com/research/${slug}`,
    "creator": {
      "@type": "Organization",
      "name": "Pulsafi",
      "url": "https://www.pulsafi.com",
    },
    "isAccessibleForFree": true,
    "license": "https://www.pulsafi.com/terms",
    "datePublished": "2026-01-01",
    "dateModified": new Date().toISOString(),
    "citation": d.sourceLink ? {
      "@type": "CreativeWork",
      "name": d.sourceLink.name,
      "url": d.sourceLink.url,
    } : undefined,
    "variableMeasured": d.fields,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />
      <Header />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>
        <nav style={{ marginBottom: 24, fontSize: 13, color: "var(--text-muted)", display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a href="/research" style={{ color: "var(--accent)", textDecoration: "none" }}>Research</a>
          <span style={{ color: "var(--text-faint)" }}>›</span>
          <span>{d.name}</span>
        </nav>

        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--accent)", fontWeight: 700, marginBottom: 14 }}>
          Pulsafi Research · Dataset
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 4.5vw, 40px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          margin: "0 0 22px",
          lineHeight: 1.15, letterSpacing: "-0.02em",
        }}>
          {d.name}
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 28 }}>
          {d.summary}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 6 }}>Coverage</div>
            <div style={{ fontSize: 18, fontFamily: "'Inter', monospace", fontWeight: 600, color: "var(--text-primary)" }}>{d.coverage}</div>
          </div>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", marginBottom: 6 }}>Best for</div>
            <div style={{ fontSize: 13, color: "var(--text-primary)", lineHeight: 1.5 }}>{d.bestFor}</div>
          </div>
        </div>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
            Methodology
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
            {d.method}
          </p>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
            Fields included
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {d.fields.map((f, i) => (
              <span key={i} style={{
                padding: "8px 14px", background: "var(--bg-input)",
                border: "1px solid var(--border-input)", borderRadius: 8,
                color: "var(--text-secondary)", fontSize: 13, fontFamily: "'Inter', monospace",
              }}>{f}</span>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28, padding: "20px 22px", background: "var(--bg-card)", border: "1px solid var(--accent-border)", borderRadius: 12 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 10 }}>
            Access the data
          </div>
          <a href={d.accessLink.href} style={{
            display: "inline-block",
            padding: "11px 20px",
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            color: "#0d0f13",
            borderRadius: 8,
            fontWeight: 700, fontSize: 14,
            textDecoration: "none",
          }}>
            {d.accessLink.label} →
          </a>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
            Citation
          </h2>
          <div style={{
            padding: "16px 20px",
            background: "var(--bg-input)",
            border: "1px solid var(--border-input)",
            borderRadius: 10,
            fontFamily: "'Inter', monospace",
            fontSize: 13,
            lineHeight: 1.6,
            color: "var(--text-secondary)",
          }}>
            {d.citationFormat}
          </div>
        </section>

        <section style={{ marginBottom: 28, padding: "16px 22px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)", fontWeight: 700, marginBottom: 6 }}>Primary source</div>
          <div style={{ fontSize: 14 }}>
            <a href={d.sourceLink.url} target="_blank" rel="noopener" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              {d.sourceLink.name} ↗
            </a>
          </div>
        </section>

        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`research/${slug}`}
            headline="Get new Pulsafi research"
            subhead="The Pulse — fresh data drops and methodology updates delivered weekly."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

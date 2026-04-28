import Header from "../components/Header";
import Footer from "../components/Footer";
import EmailCapture from "../components/EmailCapture";
import { DATASETS } from "../data/researchDatasets";

export const metadata = {
  title: "Pulsafi Research — Original Personal Finance Datasets",
  description: "Pulsafi's primary-source datasets: US metro-level salary data, state property taxes, city cost-of-living index, first-time homebuyer programs, and 401(k) rollover provider matrix.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Pulsafi Research",
    description: "Original personal finance datasets, free to access and cite.",
    url: "https://www.pulsafi.com/research",
  },
};

export default function ResearchHub() {
  const datasetCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "DataCatalog",
    "name": "Pulsafi Research",
    "description": "Open personal finance datasets from Pulsafi.",
    "url": "https://www.pulsafi.com/research",
    "publisher": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com" },
    "dataset": DATASETS.map(d => ({
      "@type": "Dataset",
      "name": d.name,
      "description": d.summary,
      "url": `https://www.pulsafi.com/research/${d.slug}`,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetCollectionJsonLd) }} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Pulsafi Research
        </div>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontFamily: "'Playfair Display', serif", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Original personal finance datasets
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          Free, citable datasets compiled from primary sources. Use them in your research, link back when you cite, and tell us if you want a cut you don't see here.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {DATASETS.map(d => (
            <a key={d.slug} href={`/research/${d.slug}`} style={{
              padding: "24px 26px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: 14,
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>
                Dataset · {d.coverage}
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                {d.name}
              </h2>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, margin: "0 0 12px" }}>
                {d.summary}
              </p>
              <div style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Open dataset →
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: "20px 24px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.65 }}>
          All Pulsafi datasets are free to access and cite. Citation format on each dataset page. For collaboration or custom data extracts, contact <a href="mailto:research@pulsafi.com" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>research@pulsafi.com</a>. Read our full <a href="/methodology" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>methodology</a>.
        </div>

        <div style={{ marginTop: 28 }}>
          <EmailCapture source="research-hub" headline="New datasets land monthly" subhead="The Pulse — fresh data drops, methodology updates, and research alerts." />
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import glossaryData from "../glossaryData";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(glossaryData).map((term) => ({ term }));
}

export async function generateMetadata({ params }) {
  const { term } = await params;
  const t = glossaryData[term];
  if (!t) return {};
  // Use the definition (truncated) as the meta description for snippet bait
  const desc = t.definition.length > 158 ? t.definition.slice(0, 155) + "…" : t.definition;
  return {
    title: `${t.name} — Definition, Why It Matters, Example`,
    description: desc,
    alternates: { canonical: `/glossary/${term}` },
    openGraph: {
      title: `${t.name} — Pulsafi Glossary`,
      description: desc,
      url: `https://www.pulsafi.com/glossary/${term}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t.name,
      description: desc,
    },
  };
}

export default async function TermPage({ params }) {
  const { term } = await params;
  const termData = glossaryData[term];
  if (!termData) notFound();

  // ──────────────────────────────────────────────────────────────────
  // Schema: DefinedTerm + QAPage + Speakable + Breadcrumb.
  // This combination is what AI engines (ChatGPT, Perplexity, Google AI
  // Overviews) cite from when answering definition queries.
  // ──────────────────────────────────────────────────────────────────
  const definedTermJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": termData.name,
    "description": termData.definition,
    "url": `https://www.pulsafi.com/glossary/${term}`,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "Pulsafi Personal Finance Glossary",
      "url": "https://www.pulsafi.com/glossary",
    },
  };

  const qaJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": `What is ${termData.name}?`,
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": termData.definition,
      },
    },
  };

  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".term-name", ".term-definition"],
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pulsafi.com" },
      { "@type": "ListItem", position: 2, name: "Glossary", item: "https://www.pulsafi.com/glossary" },
      { "@type": "ListItem", position: 3, name: termData.name, item: `https://www.pulsafi.com/glossary/${term}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px 0" }}>
        {/* Breadcrumb */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 14, color: "var(--text-muted)", marginBottom: 40,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <Link href="/" style={{ color: "var(--accent)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <Link href="/glossary" style={{ color: "var(--accent)", textDecoration: "none" }}>Glossary</Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{termData.name}</span>
        </div>

        {/* Term Title — speakable */}
        <h1 className="term-name" style={{
          fontSize: 48, fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 32, color: "var(--text-primary)",
        }}>
          {termData.name}
        </h1>

        {/* Definition — speakable */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 16, fontWeight: 600, color: "var(--accent)",
            marginBottom: 12, fontFamily: "'Inter', monospace",
            textTransform: "uppercase", letterSpacing: 1,
          }}>
            Definition
          </h2>
          <p className="term-definition" style={{
            fontSize: 18, lineHeight: 1.7, color: "var(--text-primary)",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {termData.definition}
          </p>
        </section>

        {/* Why It Matters */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{
            fontSize: 16, fontWeight: 600, color: "var(--accent)",
            marginBottom: 12, fontFamily: "'Inter', monospace",
            textTransform: "uppercase", letterSpacing: 1,
          }}>
            Why It Matters
          </h2>
          <p style={{
            fontSize: 16, lineHeight: 1.7, color: "var(--text-secondary)",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {termData.whyItMatters}
          </p>
        </section>

        {/* Example */}
        {termData.example && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 16, fontWeight: 600, color: "var(--accent)",
              marginBottom: 12, fontFamily: "'Inter', monospace",
              textTransform: "uppercase", letterSpacing: 1,
            }}>
              Example
            </h2>
            <div style={{
              padding: 20, backgroundColor: "var(--bg-card)",
              borderRadius: 8, border: "1px solid var(--border-card)",
              fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
              color: "var(--text-secondary)",
            }}>
              {termData.example}
            </div>
          </section>
        )}

        {/* Related Tools */}
        {termData.relatedTools && termData.relatedTools.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 16, fontWeight: 600, color: "var(--accent)",
              marginBottom: 16, fontFamily: "'Inter', monospace",
              textTransform: "uppercase", letterSpacing: 1,
            }}>
              Related Tools
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}>
              {termData.relatedTools.map((tool, idx) => (
                <Link key={idx} href={tool.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    padding: 16, backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--accent-border)", borderRadius: 6,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                    fontWeight: 500, color: "var(--accent)",
                  }}>
                    {tool.name} →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Terms */}
        {termData.relatedTerms && termData.relatedTerms.length > 0 && (
          <section style={{ marginBottom: 60 }}>
            <h2 style={{
              fontSize: 16, fontWeight: 600, color: "var(--accent)",
              marginBottom: 16, fontFamily: "'Inter', monospace",
              textTransform: "uppercase", letterSpacing: 1,
            }}>
              Related Terms
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {termData.relatedTerms.map((relatedSlug, idx) => {
                const relatedTerm = glossaryData[relatedSlug];
                if (!relatedTerm) return null;
                return (
                  <Link key={idx} href={`/glossary/${relatedSlug}`} style={{ textDecoration: "none" }}>
                    <span style={{
                      padding: "8px 12px",
                      backgroundColor: "var(--accent-bg)",
                      border: "1px solid var(--accent-border)",
                      borderRadius: 4, color: "var(--accent)",
                      fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                    }}>
                      {relatedTerm.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Methodology nudge for E-E-A-T */}
        <div style={{
          marginBottom: 24, padding: "14px 18px",
          background: "var(--bg-input)", border: "1px solid var(--border-input)",
          borderRadius: 10, fontSize: 13, color: "var(--text-muted)",
        }}>
          Pulsafi definitions are sourced from primary regulatory and industry references.
          See our <Link href="/methodology" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>methodology and data sources</Link>.
        </div>

        <div style={{ padding: "40px 0", borderTop: "1px solid var(--border-card)" }}>
          <Link href="/glossary" style={{
            color: "var(--accent)", textDecoration: "none",
            fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
          }}>
            ← Back to Glossary
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

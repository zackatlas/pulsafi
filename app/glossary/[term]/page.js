"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import glossaryData from "../glossaryData";

export default function TermPage({ params }) {
  const { term } = params;
  const termData = glossaryData[term];

  if (!termData) {
    notFound();
  }

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "40px 16px 0" }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            color: "var(--text-muted)",
            marginBottom: 40,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <Link href="/" style={{ color: "var(--accent)", textDecoration: "none" }}>
            Home
          </Link>
          <span>/</span>
          <Link
            href="/glossary"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            Glossary
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-secondary)" }}>{termData.name}</span>
        </div>

        {/* Term Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            marginBottom: 32,
            color: "var(--text-primary)",
          }}
        >
          {termData.name}
        </h1>

        {/* Definition */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--accent)",
              marginBottom: 12,
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Definition
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.7,
              color: "var(--text-primary)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {termData.definition}
          </p>
        </section>

        {/* Why It Matters */}
        <section style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--accent)",
              marginBottom: 12,
              fontFamily: "'DM Mono', monospace",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Why It Matters
          </h2>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {termData.whyItMatters}
          </p>
        </section>

        {/* Example */}
        {termData.example && (
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 12,
                fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Example
            </h2>
            <div
              style={{
                padding: 20,
                backgroundColor: "var(--bg-card)",
                borderRadius: 8,
                border: "1px solid var(--border-card)",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.6,
                color: "var(--text-secondary)",
              }}
            >
              {termData.example}
            </div>
          </section>
        )}

        {/* Related Tools */}
        {termData.relatedTools && termData.relatedTools.length > 0 && (
          <section style={{ marginBottom: 48 }}>
            <h2
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 16,
                fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Related Tools
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 12,
              }}
            >
              {termData.relatedTools.map((tool, idx) => (
                <Link
                  key={idx}
                  href={tool.href}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      padding: 16,
                      backgroundColor: "var(--bg-card)",
                      border: "1px solid var(--accent-border)",
                      borderRadius: 6,
                      cursor: "pointer",
                      transition: "all 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "var(--accent)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--accent-bg)";
                      e.currentTarget.style.borderColor = "var(--accent)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "var(--bg-card)";
                      e.currentTarget.style.borderColor =
                        "var(--accent-border)";
                    }}
                  >
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
            <h2
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--accent)",
                marginBottom: 16,
                fontFamily: "'DM Mono', monospace",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Related Terms
            </h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {termData.relatedTerms.map((relatedSlug, idx) => {
                const relatedTerm = glossaryData[relatedSlug];
                if (!relatedTerm) return null;
                return (
                  <Link
                    key={idx}
                    href={`/glossary/${relatedSlug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <span
                      style={{
                        padding: "8px 12px",
                        backgroundColor: "var(--accent-bg)",
                        border: "1px solid var(--accent-border)",
                        borderRadius: 4,
                        color: "var(--accent)",
                        fontSize: 13,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--accent)";
                        e.currentTarget.style.color = "var(--bg-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--accent-bg)";
                        e.currentTarget.style.color = "var(--accent)";
                      }}
                    >
                      {relatedTerm.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Back to Glossary */}
        <div
          style={{
            padding: "40px 0",
            borderTop: "1px solid var(--border-card)",
          }}
        >
          <Link
            href="/glossary"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              fontSize: 14,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
            }}
          >
            ← Back to Glossary
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

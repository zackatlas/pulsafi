"use client";
import { useState } from "react";

// Extracted from Pulsafi.js so the FAQ + its matching FAQPage JSON-LD live
// in one file. The schema markup must match the visible Q&A exactly — this
// structure keeps them colocated so divergence is less likely.

const FAQ_ITEMS = [
  {
    question: "Are Pulsafi's calculators really free?",
    answer:
      "Yes, 100% free. No hidden paywalls, no premium tiers, no data collection. We believe financial education should be accessible to everyone.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No signup required. All calculators work immediately without logging in. Your data stays in your browser — we never store it.",
  },
  {
    question: "How accurate are the calculations?",
    answer:
      "Our calculators use standard financial formulas and are regularly tested. They're designed for estimation and planning, not financial advice. Always consult a financial advisor for major decisions.",
  },
  {
    question: "Which calculator should I use first?",
    answer:
      "Start with our Compound Interest or Salary Breakdown calculator to understand your money flow, then explore tools matching your financial goals (mortgages, investing, retirement, debt payoff).",
  },
  {
    question: "Can I embed a calculator on my website?",
    answer:
      "Yes! Check our embed section for shareable widgets and APIs. We support custom integrations for blogs, financial sites, and educational platforms.",
  },
];

function FAQAccordion({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "16px 20px",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          color: "var(--text-primary)",
          fontSize: 15,
          fontWeight: 600,
          fontFamily: "'DM Sans', sans-serif",
          transition: "background 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-bg)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <span>{question}</span>
        <span
          style={{
            fontSize: 18,
            color: "var(--accent)",
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 20px 16px",
            fontSize: 14,
            color: "var(--text-muted)",
            lineHeight: 1.7,
          }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}

export default function HomeFAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <section style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22,
            color: "var(--text-primary)",
            fontWeight: 700,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Frequently Asked Questions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQ_ITEMS.map((faq, i) => (
            <FAQAccordion key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

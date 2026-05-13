import Header from "../components/Header";
import Footer from "../components/Footer";
import EmailCapture from "../components/EmailCapture";
import { ANSWERS, ANSWERS_BY_CATEGORY, CATEGORY_LABELS } from "../data/answers";

export const metadata = {
  title: "Money Answers — Quick, Data-Backed Personal Finance Q&A",
  description: `${ANSWERS.length}+ short answers to common money questions. Mortgage affordability, retirement planning, salary benchmarks, tax brackets, and more — each backed by real data.`,
  alternates: { canonical: "/answers" },
  openGraph: {
    title: "Money Answers — Pulsafi",
    description: `${ANSWERS.length}+ data-backed answers to the personal finance questions people actually ask.`,
    url: "https://www.pulsafi.com/answers",
  },
};

const CATEGORY_ORDER = [
  "affordability", "mortgage", "salary", "retirement", "investing",
  "tax", "credit", "savings", "auto", "real-estate", "insurance", "budgeting",
  "lifestyle", "general",
];

export default function AnswersIndex() {
  // ItemList schema for the index — Google may render rich list results
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": ANSWERS.slice(0, 30).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.pulsafi.com/answers/${a.slug}`,
      name: a.question,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <Header />

      {/* Hero */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Money Answers
        </div>
        <h1 style={{
          fontSize: "clamp(36px, 5vw, 56px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          margin: "0 0 14px",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}>
          The questions you'd ask a finance friend
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          {ANSWERS.length}+ short, data-backed answers to common personal finance questions. Each answer is short enough to share, deep enough to act on.
        </p>
      </section>

      <main style={{ maxWidth: 1080, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Category sections */}
        {CATEGORY_ORDER.filter(c => ANSWERS_BY_CATEGORY[c]?.length).map(category => {
          const categoryAnswers = ANSWERS_BY_CATEGORY[category] || [];
          return (
            <section key={category} style={{ marginBottom: 52 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 8 }}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26, fontWeight: 700, margin: 0,
                  color: "var(--text-primary)", letterSpacing: "-0.01em",
                }}>
                  {CATEGORY_LABELS[category] || category}
                </h2>
                <div style={{ fontSize: 12, color: "var(--text-faint)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  {categoryAnswers.length} {categoryAnswers.length === 1 ? "question" : "questions"}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
                {categoryAnswers.map(q => (
                  <a key={q.slug} href={`/answers/${q.slug}`} style={{
                    padding: "16px 18px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: 10,
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    minHeight: 90,
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.4, marginBottom: 8 }}>
                      {q.question}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                      Read answer →
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {/* Email capture */}
        <div style={{ marginTop: 40 }}>
          <EmailCapture
            source="answers-index"
            headline="One short money answer per week"
            subhead="The Pulse newsletter — direct, data-backed answers to common money questions, delivered weekly."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

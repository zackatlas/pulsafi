import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmailCapture from "../../components/EmailCapture";
import AffiliateOffer from "../../components/AffiliateOffer";
import { ANSWERS, ANSWER_BY_SLUG, ANSWERS_BY_CATEGORY, CATEGORY_LABELS } from "../../data/answers";

export const dynamicParams = false;

export function generateStaticParams() {
  return ANSWERS.map(a => ({ slug: a.slug }));
}

// Pick the right affiliate category based on Q&A topic
function affiliateCategoryFor(category) {
  switch (category) {
    case "mortgage":
    case "affordability":
    case "real-estate":
      return "mortgage";
    case "retirement":
    case "investing":
      return "brokerage";
    case "credit":
      return "debt";
    case "savings":
      return "savings";
    case "tax":
      return "credit-cards";
    default:
      return "savings";
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = ANSWER_BY_SLUG[slug];
  if (!a) return {};
  return {
    title: `${a.question} | Pulsafi`,
    description: a.short,
    alternates: { canonical: `/answers/${slug}` },
    openGraph: {
      title: a.question,
      description: a.short,
      url: `https://www.pulsafi.com/answers/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: a.question,
      description: a.short,
    },
  };
}

export default async function AnswerPage({ params }) {
  const { slug } = await params;
  const a = ANSWER_BY_SLUG[slug];
  if (!a) notFound();

  const related = (a.related || [])
    .map(s => ANSWER_BY_SLUG[s])
    .filter(Boolean);

  const moreInCategory = (ANSWERS_BY_CATEGORY[a.category] || [])
    .filter(q => q.slug !== a.slug)
    .slice(0, 6);

  // Schema.org Q&A — pure featured-snippet bait, well-formed
  const qaJsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    "mainEntity": {
      "@type": "Question",
      "name": a.question,
      "answerCount": 1,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": a.short,
      },
    },
  };

  // Speakable schema — flags content as voice/AI-assistant ready
  const speakableJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".answer-question", ".answer-short"],
    },
  };

  // Breadcrumb schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.pulsafi.com" },
      { "@type": "ListItem", position: 2, name: "Money Answers", item: "https://www.pulsafi.com/answers" },
      { "@type": "ListItem", position: 3, name: CATEGORY_LABELS[a.category] || a.category, item: `https://www.pulsafi.com/answers?category=${a.category}` },
      { "@type": "ListItem", position: 4, name: a.question, item: `https://www.pulsafi.com/answers/${slug}` },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(qaJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "40px 24px 60px" }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: 28, fontSize: 13, color: "var(--text-muted)", display: "flex", flexWrap: "wrap", gap: 8 }}>
          <a href="/answers" style={{ color: "var(--accent)", textDecoration: "none" }}>Money Answers</a>
          <span style={{ color: "var(--text-faint)" }}>›</span>
          <a href={`/answers?category=${a.category}`} style={{ color: "var(--accent)", textDecoration: "none" }}>{CATEGORY_LABELS[a.category] || a.category}</a>
        </nav>

        {/* Question as H1 — speakable */}
        <h1 className="answer-question" style={{
          fontSize: "clamp(28px, 4.5vw, 40px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          margin: "0 0 24px",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}>
          {a.question}
        </h1>

        {/* The featured-snippet answer block — most important element on page */}
        <div style={{
          background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))",
          border: "1px solid var(--accent-border)",
          borderLeft: "4px solid var(--accent)",
          borderRadius: 12,
          padding: "22px 26px",
          marginBottom: 32,
        }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>
            Quick answer
          </div>
          <p className="answer-short" style={{
            fontSize: 17, lineHeight: 1.65, color: "var(--text-primary)",
            margin: 0, fontWeight: 400,
          }}>
            {a.short}
          </p>
        </div>

        {/* Affiliate placement — relevant offer based on category */}
        <div style={{ marginBottom: 32 }}>
          <AffiliateOffer category={affiliateCategoryFor(a.category)} placement={`answer-${slug}`} variant="card" />
        </div>

        {/* Body — for now we use the short answer + linkout to relevant tools.
            Body content can be expanded per-question later if it lifts engagement. */}
        <section style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.85, marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14, marginTop: 0 }}>
            More context
          </h2>
          <p style={{ marginBottom: 18 }}>
            {a.short} The exact answer depends on your specific situation — the numbers above are a strong starting point, but the right next step is to plug in your actual figures.
          </p>
          <p style={{ marginBottom: 18 }}>
            For a deeper analysis, use one of the related tools below — they take your specific income, debt, location, and goals as inputs and produce a tailored answer.
          </p>
        </section>

        {/* Tool callout — drive traffic to calculators */}
        <section style={{ marginBottom: 32, padding: "20px 22px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>
            Run your own numbers
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {(() => {
              const map = {
                "mortgage": ["/tools/mortgage-calculator", "Mortgage Calculator"],
                "affordability": ["/tools/mortgage-calculator", "Mortgage Calculator"],
                "real-estate": ["/tools/rent-vs-buy-calculator", "Rent vs Buy Calculator"],
                "retirement": ["/tools/fire-calculator", "FIRE Calculator"],
                "investing": ["/tools/compound-interest-calculator", "Compound Interest Calculator"],
                "tax": ["/tools/salary-breakdown-calculator", "Salary Breakdown Calculator"],
                "credit": ["/tools/debt-payoff-calculator", "Debt Payoff Calculator"],
                "savings": ["/tools/emergency-fund-calculator", "Emergency Fund Calculator"],
                "auto": ["/tools/student-loan-calculator", "Loan Calculator"],
                "salary": ["/tools/salary-breakdown-calculator", "Salary Breakdown Calculator"],
                "lifestyle": ["/tools", "All Tools"],
                "insurance": ["/tools", "All Tools"],
                "budgeting": ["/tools/budget-calculator", "Budget Calculator"],
                "general": ["/tools/net-worth-calculator", "Net Worth Calculator"],
              };
              const [href, label] = map[a.category] || ["/tools", "All Tools"];
              return (
                <a href={href} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: "#0d0f13", borderRadius: 8, fontWeight: 700, fontSize: 14,
                  textDecoration: "none",
                }}>
                  {label} →
                </a>
              );
            })()}
          </div>
        </section>

        {/* Related questions */}
        {related.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
              Related questions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {related.map(q => (
                <a key={q.slug} href={`/answers/${q.slug}`} style={{
                  padding: "14px 18px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-card)",
                  borderRadius: 10,
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <span style={{ color: "var(--text-primary)", fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>
                    {q.question}
                  </span>
                  <span style={{ color: "var(--accent)", fontSize: 14, flexShrink: 0 }}>→</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* More in category */}
        {moreInCategory.length > 0 && (
          <section style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 14 }}>
              More about {CATEGORY_LABELS[a.category] || a.category}
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {moreInCategory.map(q => (
                <a key={q.slug} href={`/answers/${q.slug}`} style={{
                  padding: "8px 14px",
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  borderRadius: 8,
                  color: "var(--text-secondary)",
                  fontSize: 13,
                  textDecoration: "none",
                }}>
                  {q.question}
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`answers/${slug}`}
            headline="One short money answer per week"
            subhead="The Pulse newsletter — direct, data-backed answers to common money questions, delivered weekly."
          />
        </div>

      </main>
      <Footer />
    </div>
  );
}

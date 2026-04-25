import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffiliateOffer from "../../components/AffiliateOffer";
import EmailCapture from "../../components/EmailCapture";
import { CREDIT_CARD_CATEGORIES } from "../../data/creditCardCategories";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CREDIT_CARD_CATEGORIES).map(category => ({ category }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = CREDIT_CARD_CATEGORIES[category];
  if (!cat) return {};
  return {
    title: `${cat.title} (${new Date().getFullYear()}) — Compare Top Picks | Pulsafi`,
    description: `Best ${cat.name.toLowerCase()} credit cards in ${new Date().getFullYear()}. Compare ${cat.sampleCards.length} top picks for ${cat.audience}. Typical APR ${cat.typicalApr}, annual fees ${cat.typicalAnnualFee}.`,
    alternates: { canonical: `/best-credit-cards/${category}` },
    openGraph: {
      title: `Best ${cat.name} Credit Cards ${new Date().getFullYear()}`,
      description: `Top ${cat.name.toLowerCase()} credit cards for ${cat.audience}.`,
      url: `https://www.pulsafi.com/best-credit-cards/${category}`,
    },
  };
}

export default async function BestCreditCardsPage({ params }) {
  const { category } = await params;
  const cat = CREDIT_CARD_CATEGORIES[category];
  if (!cat) notFound();

  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const otherCategories = Object.entries(CREDIT_CARD_CATEGORIES).filter(([k]) => k !== category);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What credit score do I need for the best ${cat.name.toLowerCase()} credit cards?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Most ${cat.name.toLowerCase()} cards require a FICO score of ${cat.minCreditScore}+ for approval. ${cat.minCreditScore >= 700 ? "Premium cards in this category often want 720+." : cat.minCreditScore === 0 ? "These cards are designed for limited or no credit history." : "Some issuers will approve with FICO 650-680, but the best offers go to 720+."}`,
        },
      },
      {
        "@type": "Question",
        "name": `Are ${cat.name.toLowerCase()} credit cards worth it?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${cat.name} cards are best for ${cat.bestFor}. Skip them if ${cat.skipIf}.`,
        },
      },
      {
        "@type": "Question",
        "name": `What APR should I expect on a ${cat.name.toLowerCase()} card?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Typical APRs in this category run ${cat.typicalApr}. If you carry a balance, the APR matters far more than rewards — a 25% APR wipes out 2% cash back in less than two months.`,
        },
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      <section style={{ padding: "60px 24px 32px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Updated {updated}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          {cat.title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          For {cat.audience}. Typical APR {cat.typicalApr} · Annual fees {cat.typicalAnnualFee}{cat.minCreditScore > 0 ? ` · FICO ${cat.minCreditScore}+ recommended` : ""}.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category="credit-cards" placement={`best-cc-${category}-top`} variant="card" />

        {/* Quick verdict */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))", border: "1px solid var(--accent-border)", borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>Get this card if</div>
              <div style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.55 }}>{cat.bestFor}</div>
            </div>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 12, padding: "18px 20px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#e74c3c", fontWeight: 600, marginBottom: 6 }}>Skip if</div>
              <div style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.55 }}>{cat.skipIf}</div>
            </div>
          </div>
        </section>

        {/* What to look for */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 14px" }}>
            What to Compare in {cat.name} Cards
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {cat.keyMetrics.map((metric, i) => (
              <div key={i} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace", minWidth: 22 }}>{i + 1}.</div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.55 }}>{metric}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Top features */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 14px" }}>
            Top Features in {cat.name} Cards
          </h2>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {cat.topFeatures.map((feature, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < cat.topFeatures.length - 1 ? "1px solid var(--border-input)" : "none" }}>
                <div style={{ flexShrink: 0, color: "var(--accent)", fontSize: 16 }}>✓</div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{feature}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* Sample cards in market */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 6px" }}>
            Cards Worth Comparing
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
            Leading cards in this category. Specific rewards rates and welcome bonuses change frequently — verify with each issuer before applying.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
            {cat.sampleCards.map((card, i) => (
              <div key={i} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{card}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="credit-cards" placement={`best-cc-${category}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            How to Pick the Best {cat.name} Card
          </h2>
          <p style={{ marginBottom: 16 }}>
            {cat.name} cards are designed for {cat.audience}. The right card depends on your spending pattern, credit score, and whether you'll pay your balance in full each month. Carrying a balance on a {cat.name.toLowerCase()} card with a {cat.typicalApr.split("-")[1]} APR cancels out almost any rewards you'd earn.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Match the card to your spending</h3>
          <p style={{ marginBottom: 16 }}>
            The best {cat.name.toLowerCase()} card on paper is rarely the best card for you. Track your last 3 months of spending in this category before applying. If your annual spending in the bonus category is under $3,000, a no-annual-fee card almost always beats a premium one — the math doesn't work otherwise.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Watch the welcome bonus</h3>
          <p style={{ marginBottom: 16 }}>
            Welcome bonuses for {cat.name.toLowerCase()} cards typically range from $200-$1,500 in value, often requiring $3,000-$8,000 of spending in the first 3 months. Don't manufacture spending you wouldn't otherwise do — interest charges from carrying a balance to hit a bonus erase the bonus value within months.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Application strategy</h3>
          <p style={{ marginBottom: 16 }}>
            Use Experian CardMatch or Credit Karma to see pre-qualified offers (soft pull, no credit hit) before formally applying. Most issuers run a hard pull on application, which dings your FICO ~5 points for a few months. Apply for cards 3-6 months apart to avoid Chase 5/24 and similar restrictions.
          </p>

          {cat.minCreditScore < 670 && (
            <>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Building credit responsibly</h3>
              <p style={{ marginBottom: 16 }}>
                If your goal is to build credit, prioritize: (1) on-time payments — most important factor, 35% of FICO, (2) credit utilization under 30% (under 10% is even better), (3) keeping the card open long-term to grow your average account age. Don't close the card after a year — that erases the credit history you're building.
              </p>
            </>
          )}
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`best-credit-cards/${category}`}
            headline={`${cat.name} card updates from The Pulse`}
            subhead="Welcome bonus changes, rate updates, and new card launches — sent monthly."
          />
        </div>

        {/* Other categories */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Compare other card categories</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {otherCategories.map(([slug, c]) => (
              <a key={slug} href={`/best-credit-cards/${slug}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
                {c.name} →
              </a>
            ))}
          </div>
        </section>

        {/* Internal links */}
        <section style={{ marginTop: 16, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Related tools</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href="/tools/debt-payoff-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Debt Payoff Calculator →
            </a>
            <a href="/learn/credit-score-explained-how-to-improve" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Credit Score Guide →
            </a>
            <a href="/learn/what-is-a-good-credit-score" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              What's a Good Credit Score →
            </a>
            <a href="/learn/best-credit-cards-for-beginners-2026" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Beginner's Card Guide →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

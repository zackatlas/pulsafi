"use client";
import { useAuth } from "../AuthProvider";
import { getRecommendedArticles } from "@/lib/personalization";

// ─── Homepage article grid ───
//
// For anonymous / un-onboarded visitors: the curated "Popular Articles" list
// we've always shown (good for SEO — same 9 articles surface in every SSR
// render, which keeps the internal link graph stable).
//
// For logged-in onboarded users: personalized recommendations based on their
// goal + experience. The ranking is deterministic per user, so repeat visits
// show the same articles until the user's onboarding data changes.
//
// The static fallback list below is what Googlebot always sees — we only
// swap in personalized picks after hydration when useAuth reveals onboarding.

const STATIC_POPULAR = [
  { slug: "how-to-build-wealth-in-your-20s", title: "How to Build Wealth in Your 20s" },
  { slug: "average-net-worth-by-age-2026", title: "Average Net Worth by Age" },
  { slug: "how-to-pay-off-student-loans-fast", title: "Pay Off Student Loans Fast" },
  { slug: "best-high-yield-savings-accounts-2026", title: "Best High-Yield Savings 2026" },
  { slug: "how-to-start-investing-with-500", title: "Start Investing with $500" },
  { slug: "compound-interest-power-starting-early", title: "The Power of Compound Interest" },
  { slug: "fire-movement-2026", title: "The FIRE Movement Explained" },
  { slug: "roth-ira-vs-401k-2026", title: "Roth IRA vs 401(k) in 2026" },
  { slug: "understanding-tax-brackets-2026", title: "Tax Brackets Explained 2026" },
];

export default function HomePopularArticles() {
  const { profile } = useAuth();
  const onboarding = profile?.onboarding;

  // Only swap in personalized picks when we have a real goal signal. Limit 9
  // so the grid layout stays visually consistent with the static version.
  const personalized = onboarding?.primaryGoal
    ? getRecommendedArticles(onboarding, 9).map((a) => ({ slug: a.slug, title: a.title }))
    : null;

  const articles = personalized ?? STATIC_POPULAR;
  const heading = personalized
    ? "Articles Picked for Your Goal"
    : "Learn & Master Personal Finance";

  return (
    <section style={{ marginTop: 48, maxWidth: 900, width: "100%" }}>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22,
          color: "var(--text-primary)",
          fontWeight: 700,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {heading}
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 12,
        }}
      >
        {articles.map((article, i) => (
          <a
            key={`${article.slug}-${i}`}
            href={`/learn/${article.slug}`}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: 16,
              borderRadius: 12,
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              textDecoration: "none",
              transition: "all 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.background = "var(--accent-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-card)";
              e.currentTarget.style.background = "var(--bg-card)";
            }}
          >
            <span style={{ fontSize: 20, marginBottom: 8 }}>📚</span>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {article.title}
            </h4>
            <span
              style={{
                fontSize: 11,
                color: "var(--accent)",
                marginTop: 10,
                fontWeight: 500,
              }}
            >
              Read →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

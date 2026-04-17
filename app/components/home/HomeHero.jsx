// ─── Generic homepage hero (logged-out / pre-onboarding view) ───
// Static marketing copy. Rendered during SSR so Googlebot sees the headline
// and description in the initial HTML. For logged-in onboarded users,
// PersonalizedHero replaces this.
export default function HomeHero() {
  return (
    <section
      className="pulsafi-hero"
      style={{
        padding: "60px 24px 40px",
        textAlign: "center",
        background: "var(--hero-gradient)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--accent)",
          marginBottom: 14,
          fontWeight: 600,
        }}
      >
        Free Financial Calculators for Everyone
      </div>
      <h1
        style={{
          fontSize: "clamp(28px, 5vw, 52px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: 680,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Financial Planning Made
        <br />
        <span style={{ color: "var(--accent)" }}>Simple & Free</span>
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "clamp(14px, 2.5vw, 16px)",
          margin: "12px auto 8px",
          maxWidth: 560,
          lineHeight: 1.6,
          padding: "0 8px",
        }}
      >
        Powerful, free financial tools for mortgages, retirement, investing, and debt. No login, no ads, no hidden fees — just instant, professional-grade calculations.
      </p>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "clamp(12px, 2vw, 14px)",
          margin: "0 auto",
          maxWidth: 560,
          lineHeight: 1.5,
          opacity: 0.75,
          padding: "0 8px",
        }}
      >
        Used by thousands to make confident financial decisions. Start calculating in seconds.
      </p>
    </section>
  );
}

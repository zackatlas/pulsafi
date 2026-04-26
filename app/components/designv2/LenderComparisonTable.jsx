"use client";

// #1 — Lender comparison table.
// Replaces single affiliate banner with a stacked 3-row comparison view.
// Used on commercial-intent pages (best-mortgage-rates, refinance, heloc, etc).

const sampleLenders = [
  {
    id: "lendingtree",
    name: "LendingTree",
    rate: "6.875%",
    rateLabel: "from",
    highlight: "Compare 5 lenders in 3 minutes",
    badge: "Editor's Pick",
    aprNote: "APR varies by credit",
  },
  {
    id: "credible",
    name: "Credible",
    rate: "6.913%",
    rateLabel: "as low as",
    highlight: "Soft credit pull, no score impact",
    badge: null,
    aprNote: "Prequalified rates",
  },
  {
    id: "rocket",
    name: "Rocket Mortgage",
    rate: "6.999%",
    rateLabel: "starting at",
    highlight: "Apply online in 8 minutes",
    badge: null,
    aprNote: "Subject to approval",
  },
];

export default function LenderComparisonTable({ lenders = sampleLenders, title = "Compare Today's Mortgage Rates" }) {
  return (
    <section style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-card)",
      borderRadius: 18,
      overflow: "hidden",
      boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
    }}>
      {/* Header */}
      <div style={{
        padding: "20px 24px 16px",
        borderBottom: "1px solid var(--border-card)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>
            Sponsored · Updated daily
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
            {title}
          </h3>
        </div>
        <div style={{ fontSize: 11, color: "var(--text-faint)" }}>Advertiser disclosure ↗</div>
      </div>

      {/* Rows */}
      {lenders.map((lender, i) => (
        <a
          key={lender.id}
          href="#"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 100px 1fr 120px",
            alignItems: "center",
            gap: 16,
            padding: "20px 24px",
            borderBottom: i < lenders.length - 1 ? "1px solid var(--border-card)" : "none",
            textDecoration: "none",
            color: "inherit",
            transition: "background 0.15s ease",
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "var(--accent-glow)"}
          onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
        >
          {/* Lender name + badge */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, color: "#0d0f13", fontSize: 14, fontFamily: "'Inter', sans-serif",
              }}>
                {lender.name[0]}
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{lender.name}</div>
            </div>
            {lender.badge && (
              <div style={{
                display: "inline-block",
                fontSize: 10,
                padding: "3px 8px",
                background: "var(--accent-bg)",
                color: "var(--accent)",
                borderRadius: 4,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}>{lender.badge}</div>
            )}
          </div>

          {/* Rate */}
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {lender.rateLabel}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              {lender.rate}
            </div>
            <div style={{ fontSize: 10, color: "var(--text-faint)" }}>{lender.aprNote}</div>
          </div>

          {/* Highlight */}
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45 }}>
            {lender.highlight}
          </div>

          {/* CTA */}
          <div style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            color: "#0d0f13",
            padding: "11px 18px",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: 13,
            textAlign: "center",
            justifySelf: "end",
            whiteSpace: "nowrap",
          }}>
            Apply →
          </div>
        </a>
      ))}
    </section>
  );
}

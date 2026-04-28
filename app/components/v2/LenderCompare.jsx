"use client";

// LenderCompare — the v2 affiliate placement. Three competing offers as
// rows. Heavily restrained styling so the rows feel editorial, not adlike.

const SAMPLE_LENDERS = [
  { id: "lendingtree", name: "LendingTree", rate: "6.875%", aprNote: "as low as · 30yr fixed", highlight: "Compare 5 lenders · soft pull", badge: "Top match", ctaText: "See offers", href: "#" },
  { id: "credible",    name: "Credible",    rate: "6.913%", aprNote: "starting · prequalified", highlight: "Soft credit pull · no impact", badge: null, ctaText: "Compare", href: "#" },
  { id: "rocket",      name: "Rocket",      rate: "6.999%", aprNote: "starting · 30yr fixed",   highlight: "Apply online in 8 minutes", badge: null, ctaText: "Apply", href: "#" },
];

export default function LenderCompare({ lenders = SAMPLE_LENDERS, title = "Compare today's mortgage rates" }) {
  return (
    <section style={{
      border: "1px solid rgba(212,168,41,0.12)",
      borderRadius: 14,
      overflow: "hidden",
      background: "rgba(8,9,12,0.6)",
    }}>
      <div style={{
        padding: "18px 24px 14px",
        borderBottom: "1px solid rgba(212,168,41,0.08)",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10,
      }}>
        <div>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 5, fontFamily: "'DM Sans', sans-serif" }}>
            Sponsored · updated daily
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, margin: 0, color: "#e8e8eb", letterSpacing: "-0.01em" }}>
            {title}
          </h3>
        </div>
        <div style={{ fontSize: 10, color: "rgba(232,232,235,0.35)", letterSpacing: "0.04em" }}>Advertiser disclosure</div>
      </div>

      {lenders.map((l, i) => (
        <a key={l.id} href={l.href} style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1.5fr 110px",
          gap: 18, alignItems: "center",
          padding: "20px 24px",
          textDecoration: "none", color: "inherit",
          borderBottom: i < lenders.length - 1 ? "1px solid rgba(212,168,41,0.06)" : "none",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: l.badge ? 6 : 0 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: "linear-gradient(135deg, #f0c14a, #d4a829)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 800, color: "#050608", fontSize: 13, fontFamily: "'Inter', sans-serif",
                flexShrink: 0,
              }}>{l.name[0]}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#e8e8eb", fontFamily: "'DM Sans', sans-serif" }}>{l.name}</div>
            </div>
            {l.badge && (
              <div style={{
                display: "inline-block", fontSize: 9, padding: "3px 7px",
                background: "rgba(212,168,41,0.1)", color: "#f0c14a",
                borderRadius: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
                marginTop: 2,
              }}>{l.badge}</div>
            )}
          </div>

          <div>
            <div style={{ fontSize: 9, color: "rgba(232,232,235,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
              Rate
            </div>
            <div style={{ fontSize: 20, fontFamily: "'Inter', monospace", fontWeight: 500, color: "#e8e8eb", letterSpacing: "-0.02em" }}>
              {l.rate}
            </div>
            <div style={{ fontSize: 10, color: "rgba(232,232,235,0.4)", marginTop: 2 }}>{l.aprNote}</div>
          </div>

          <div style={{ fontSize: 13, color: "rgba(232,232,235,0.7)", lineHeight: 1.5 }}>
            {l.highlight}
          </div>

          <div style={{ justifySelf: "end" }}>
            <span style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #f0c14a, #d4a829)",
              color: "#050608", padding: "10px 18px", borderRadius: 8,
              fontWeight: 700, fontSize: 12, letterSpacing: "0.02em", whiteSpace: "nowrap",
            }}>
              {l.ctaText} →
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}

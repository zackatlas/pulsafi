"use client";

// #2 — Hero number for calculator results.
// One huge primary metric with secondary metrics below.
// Replaces the equal-sized 3-card row pattern on tool pages.

export default function HeroNumber({
  primary = "$2,847",
  primarySubtext = "Estimated monthly mortgage payment",
  primaryHelper = "Principal + Interest",
  secondary = [
    { label: "Down Payment", value: "$80,000" },
    { label: "Loan Amount", value: "$320,000" },
    { label: "Total Interest", value: "$345,000" },
  ],
  trend = null,
}) {
  return (
    <section style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border-card)",
      borderRadius: 20,
      padding: "32px 32px 24px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle gold radial glow behind the hero number */}
      <div style={{
        position: "absolute",
        top: -100, left: "50%", transform: "translateX(-50%)",
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)",
        pointerEvents: "none",
      }} />

      {/* Primary number */}
      <div style={{ position: "relative", textAlign: "center", paddingBottom: 24, borderBottom: "1px solid var(--border-card)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)", fontWeight: 600, marginBottom: 12 }}>
          {primarySubtext}
        </div>
        <div style={{
          fontSize: "clamp(48px, 9vw, 84px)",
          fontWeight: 800,
          fontFamily: "'Inter', monospace",
          letterSpacing: "-0.03em",
          lineHeight: 1.0,
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {primary}
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
          <span>{primaryHelper}</span>
          {trend && (
            <>
              <span style={{ color: "var(--text-faint)" }}>•</span>
              <span style={{ color: trend.direction === "down" ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
                {trend.direction === "down" ? "↓" : "↑"} {trend.value}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Secondary metrics */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${secondary.length}, 1fr)`,
        gap: 0,
        marginTop: 20,
      }}>
        {secondary.map((m, i) => (
          <div key={i} style={{
            padding: "8px 16px",
            borderRight: i < secondary.length - 1 ? "1px solid var(--border-card)" : "none",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-faint)", marginBottom: 4 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

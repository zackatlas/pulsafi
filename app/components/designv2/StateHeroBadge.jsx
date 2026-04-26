"use client";

// #4 — State hero badge.
// Replaces the generic gradient hero on state-specific pages with:
//   - The state's two-letter abbreviation as a huge watermark in Playfair
//   - A compact stat tile showing today's rate vs national average
// Conveys "this page is alive and state-aware" instantly.

export default function StateHeroBadge({
  stateCode = "CA",
  stateName = "California",
  title = "Best Mortgage Rates",
  metric = { label: "30yr fixed", value: "6.875%" },
  trend = { vsAvg: "−0.12%", direction: "down", since: "this week" },
  updated = "March 14, 2026",
}) {
  const trendColor = trend.direction === "down" ? "#16a34a" : "#dc2626";

  return (
    <section style={{
      position: "relative",
      padding: "72px 24px 56px",
      textAlign: "center",
      background: "var(--hero-gradient)",
      borderBottom: "1px solid var(--border)",
      overflow: "hidden",
    }}>
      {/* State abbreviation watermark — sits behind everything */}
      <div aria-hidden="true" style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "clamp(180px, 32vw, 360px)",
        fontFamily: "'Playfair Display', serif",
        fontWeight: 900,
        color: "var(--accent)",
        opacity: 0.045,
        letterSpacing: "-0.04em",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>
        {stateCode}
      </div>

      {/* Foreground */}
      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--accent)", fontWeight: 700, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
          {stateName} · Updated {updated}
        </div>

        <h1 style={{
          fontSize: "clamp(32px, 5vw, 52px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          margin: "0 0 20px",
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
        }}>
          {title}<br />in {stateName}
        </h1>

        {/* Live stat pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          borderRadius: 999,
          padding: "10px 18px 10px 14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          {/* Live dot */}
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            boxShadow: "0 0 0 0 rgba(201,162,39,0.5)",
            animation: "live-pulse 1.8s ease-in-out infinite",
            flexShrink: 0,
          }} />
          <style>{`
            @keyframes live-pulse {
              0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.5); }
              50% { box-shadow: 0 0 0 6px rgba(201,162,39,0); }
            }
          `}</style>

          <div style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
            {metric.label}
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "'Inter', monospace", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            {metric.value}
          </div>
          <div style={{
            fontSize: 11,
            fontWeight: 700,
            fontFamily: "'Inter', monospace",
            color: trendColor,
            background: trend.direction === "down" ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.1)",
            padding: "3px 8px",
            borderRadius: 6,
          }}>
            {trend.direction === "down" ? "↓" : "↑"} {trend.vsAvg}
          </div>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 540, margin: "20px auto 0", lineHeight: 1.7 }}>
          {stateName} {metric.label.toLowerCase()} rates are tracking <strong style={{ color: trendColor }}>{trend.vsAvg} {trend.direction === "down" ? "below" : "above"}</strong> the national average {trend.since}. Compare lenders below to see your personalized rate.
        </p>
      </div>
    </section>
  );
}

"use client";

// HeroNumber — the primary metric display for v2.
// Big gold-gradient number, eyebrow above, helper below. Sits on its own;
// no background image behind it, just the void.

export default function HeroNumber({
  eyebrow,
  primary,
  helper,
  trend,
  trendDirection = "down",
  size = "default",
}) {
  const fontSize = size === "xl" ? "clamp(64px, 11vw, 128px)"
    : size === "lg" ? "clamp(56px, 9vw, 104px)"
    : "clamp(44px, 7vw, 80px)";

  const trendColor = trendDirection === "down" ? "#7dd3a1" : "#f4a4a4";

  return (
    <div style={{ textAlign: "center" }}>
      {eyebrow && (
        <div style={{
          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em",
          color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 18,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {eyebrow}
        </div>
      )}
      <div style={{
        fontSize,
        fontFamily: "'Inter', monospace",
        fontWeight: 200,
        letterSpacing: "-0.04em",
        lineHeight: 0.95,
        background: "linear-gradient(180deg, #f7d278 0%, #d4a829 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        // No filter/shadow — text must read clearly against void
      }}>
        {primary}
      </div>
      {(helper || trend) && (
        <div style={{
          fontSize: 12, color: "rgba(232,232,235,0.5)",
          marginTop: 14,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.04em",
          display: "flex", justifyContent: "center", alignItems: "center", gap: 14,
          flexWrap: "wrap",
        }}>
          {helper && <span>{helper}</span>}
          {helper && trend && <span style={{ color: "rgba(232,232,235,0.25)" }}>·</span>}
          {trend && (
            <span style={{ color: trendColor, fontFamily: "'Inter', monospace", fontWeight: 600 }}>
              {trendDirection === "down" ? "↓" : "↑"} {trend}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

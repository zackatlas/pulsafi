// ─── "Trust signals" row (static) ───
// Four quick stats about the product. Extracted from Pulsafi.js so the
// homepage orchestrator stays lean. Pure static markup, SSR-safe.
export default function HomeTrustSignals() {
  const stats = [
    { num: "7", label: "Free Tools", icon: "🛠️" },
    { num: "0", label: "Paywalls", icon: "🔓" },
    { num: "5K+", label: "Active Users", icon: "👥" },
    { num: "100%", label: "Free Forever", icon: "♾️" },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
        border: "1px solid var(--border-card)",
        borderRadius: 16,
        padding: "32px 24px",
        marginTop: 40,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
        gap: 20,
      }}
    >
      {stats.map((s, i) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "var(--accent)",
              fontFamily: "'Inter', monospace",
            }}
          >
            {s.num}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginTop: 6,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

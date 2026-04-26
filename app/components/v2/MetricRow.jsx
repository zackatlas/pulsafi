// MetricRow — secondary metrics laid out horizontally with thin dividers.
// Replaces stacked cards. Solid void background, no overlays.

export default function MetricRow({ items = [] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      gap: 0,
      paddingTop: 28,
      borderTop: "1px solid rgba(212,168,41,0.08)",
    }}>
      {items.map((item, i) => (
        <div key={i} style={{
          padding: "0 24px",
          borderRight: i < items.length - 1 ? "1px solid rgba(212,168,41,0.08)" : "none",
          textAlign: "center",
        }}>
          <div style={{
            fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em",
            color: "rgba(232,232,235,0.4)", fontFamily: "'DM Sans', sans-serif",
            marginBottom: 8, fontWeight: 600,
          }}>
            {item.label}
          </div>
          <div style={{
            fontSize: 22, fontFamily: "'Inter', monospace", fontWeight: 500,
            color: item.accent ? "#f0c14a" : "#e8e8eb",
            letterSpacing: "-0.02em", lineHeight: 1.1,
          }}>
            {item.value}
          </div>
          {item.sub && (
            <div style={{
              fontSize: 11, color: "rgba(232,232,235,0.4)", marginTop: 4,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {item.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

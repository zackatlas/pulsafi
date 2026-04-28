// Consistent section heading for v2. Eyebrow + Playfair light heading.
// Always centered. Always restrained.

export default function SectionHeading({ eyebrow, title, subtitle, align = "center", maxWidth = 640 }) {
  return (
    <div style={{ textAlign: align, marginBottom: 36, maxWidth, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0 }}>
      {eyebrow && (
        <div style={{
          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em",
          color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 14,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(24px, 3.5vw, 38px)",
        fontWeight: 300, lineHeight: 1.15, letterSpacing: "-0.02em",
        margin: 0, color: "#e8e8eb",
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: 14, color: "rgba(232,232,235,0.55)",
          marginTop: 14, lineHeight: 1.65,
          fontFamily: "'DM Sans', sans-serif",
          maxWidth: 520, marginLeft: align === "center" ? "auto" : 0, marginRight: align === "center" ? "auto" : 0,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

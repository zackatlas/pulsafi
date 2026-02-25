"use client";

export default function Footer() {
  return (
    <footer style={{
      maxWidth: 900, margin: "0 auto", padding: "0 24px 60px",
    }}>
      <div style={{
        marginTop: 60, paddingTop: 32, borderTop: "1px solid #1a1d24",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#e8e9eb" }}>Pulsa<span style={{ color: "#c9a227" }}>fi</span></div>
          </a>
          <div style={{ fontSize: 11, color: "#4a4f58", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>© 2026 Pulsafi. Free financial tools for everyone.</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Advertise", href: "#" },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ color: "#6a6f78", textDecoration: "none", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

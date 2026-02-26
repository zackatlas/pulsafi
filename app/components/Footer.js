"use client";

export default function Footer() {
  return (
    <footer style={{
      maxWidth: 900, margin: "0 auto", padding: "0 24px 60px",
    }}>
      <div style={{
        marginTop: 60, paddingTop: 32, borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        transition: "border-color 0.3s",
      }}>
        <div>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>Pulsa<span style={{ color: "var(--accent)" }}>fi</span></div>
          </a>
          <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>© 2026 Pulsafi. Free financial tools for everyone.</div>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
            { label: "Advertise", href: "/advertise" },
            { label: "Embed", href: "/embed" },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{link.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

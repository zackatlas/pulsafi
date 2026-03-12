"use client";
export default function Footer() {
  return (
    <footer style={{
      maxWidth: 900, margin: "0 auto", padding: "0 16px 60px",
    }}>
      <div className="pulsafi-footer-inner" style={{
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
        <div className="pulsafi-footer-links" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Contact", href: "/contact" },
            { label: "Advertise", href: "/advertise" },
            { label: "Embed", href: "/embed" },
            { label: "Glossary", href: "/glossary" },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{link.label}</a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 480px) {
          .pulsafi-footer-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
          }
          .pulsafi-footer-links {
            gap: 14px !important;
          }
        }
      `}</style>
    </footer>
  );
}

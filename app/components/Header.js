"use client";

export default function Header() {
  const navItems = [
    { label: "Tools", href: "/" },
    { label: "Learn", href: "/learn" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "About", href: "/about" },
  ];

  return (
    <header style={{
      borderBottom: "1px solid #1a1d24", padding: "16px 24px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "sticky", top: 0, background: "rgba(13,15,19,0.92)", backdropFilter: "blur(12px)", zIndex: 100,
    }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #c9a227, #a37e1b)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 900, color: "#0d0f13", fontFamily: "'Playfair Display', serif",
        }}>P</div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', serif", color: "#e8e9eb" }}>
          Pulsa<span style={{ color: "#c9a227" }}>fi</span>
        </span>
      </a>
      <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
        {navItems.map(item => (
          <a key={item.label} href={item.href} style={{ color: "#8a8f98", textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.01em" }}
            onMouseOver={e => e.target.style.color = "#c9a227"}
            onMouseOut={e => e.target.style.color = "#8a8f98"}
          >{item.label}</a>
        ))}
      </nav>
    </header>
  );
}

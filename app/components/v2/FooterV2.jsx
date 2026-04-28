// Minimal footer for v2 — refined, low-density. No decoration; just nav.

export default function FooterV2() {
  const cols = [
    {
      title: "Tools",
      links: [
        { label: "Mortgage Calculator", href: "/v2/tools/mortgage-calculator" },
        { label: "FIRE Calculator", href: "/tools/fire-calculator" },
        { label: "Tax Brackets", href: "/tax-brackets" },
        { label: "All tools", href: "/tools" },
      ],
    },
    {
      title: "Mortgage",
      links: [
        { label: "Best Rates by State", href: "/best-mortgage-rates/california" },
        { label: "Refinance Calculator", href: "/refinance-calculator/california" },
        { label: "First-Time Homebuyer", href: "/first-time-homebuyer/california" },
        { label: "HELOC Rates", href: "/heloc-rates/california" },
      ],
    },
    {
      title: "Savings",
      links: [
        { label: "Best HYSA", href: "/best-savings-account/california" },
        { label: "CD Rates", href: "/cd-rates/california" },
        { label: "Emergency Fund", href: "/tools/emergency-fund-calculator" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "FIRE Guide", href: "/learn/fire-movement-2026" },
        { label: "Investing 101", href: "/learn/index-funds-vs-etfs-2026" },
        { label: "All articles", href: "/learn" },
      ],
    },
  ];

  return (
    <footer style={{
      borderTop: "1px solid rgba(212,168,41,0.08)",
      padding: "60px 32px 32px",
      marginTop: 80,
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(4, 1fr)", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: "linear-gradient(135deg, #f0c14a, #d4a829)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#050608", fontSize: 15,
              }}>P</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 700, letterSpacing: "-0.02em", color: "#e8e8eb" }}>Pulsafi</div>
            </div>
            <p style={{ fontSize: 13, color: "rgba(232,232,235,0.5)", lineHeight: 1.65, maxWidth: 280, margin: 0 }}>
              The pulse of personal finance. Live rates, intentional tools, and clarity for every decision.
            </p>
          </div>

          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 14 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((link, j) => (
                  <a key={j} href={link.href} style={{ fontSize: 13, color: "rgba(232,232,235,0.7)", textDecoration: "none" }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          paddingTop: 24,
          borderTop: "1px solid rgba(212,168,41,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        }}>
          <div style={{ fontSize: 11, color: "rgba(232,232,235,0.35)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Pulsafi · Not a financial advisor.
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <a href="/privacy" style={{ fontSize: 11, color: "rgba(232,232,235,0.45)", textDecoration: "none", letterSpacing: "0.05em" }}>Privacy</a>
            <a href="/terms" style={{ fontSize: 11, color: "rgba(232,232,235,0.45)", textDecoration: "none", letterSpacing: "0.05em" }}>Terms</a>
            <a href="/contact" style={{ fontSize: 11, color: "rgba(232,232,235,0.45)", textDecoration: "none", letterSpacing: "0.05em" }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

// Section hubs, linked from every page so each programmatic page has a
// crawlable path from the homepage (hub → page), not just a sitemap entry.
const EXPLORE_LINKS = [
  { label: "Salary After Taxes", href: "/salary" },
  { label: "Salaries by Job", href: "/job-salary" },
  { label: "Salaries by City", href: "/city-job-salary" },
  { label: "Hourly to Salary", href: "/hourly-to-salary" },
  { label: "Salary Needed by City", href: "/salary-needed" },
  { label: "Tax Brackets", href: "/tax-brackets" },
  { label: "Mortgage Payments", href: "/mortgage" },
  { label: "Cost of Living", href: "/cost-of-living" },
  { label: "Rent vs. Buy", href: "/rent-vs-buy" },
  { label: "Retirement by Age", href: "/retirement" },
  { label: "Emergency Fund", href: "/emergency-fund" },
  { label: "401(k) Rollovers", href: "/401k-rollover" },
  { label: "Money Stats", href: "/stats" },
  { label: "Money Answers", href: "/answers" },
];

export default function Footer() {
  return (
    <footer role="contentinfo" style={{
      maxWidth: 900, margin: "0 auto", padding: "0 16px 60px",
    }}>
      <nav aria-label="Explore Pulsafi" style={{ marginTop: 60, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-faint)", fontWeight: 600, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>Explore</div>
        <div className="pulsafi-footer-explore" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "2px 16px" }}>
          {EXPLORE_LINKS.map(link => (
            <a key={link.href} href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 13, fontFamily: "'DM Sans', sans-serif", minHeight: "36px", display: "flex", alignItems: "center" }}>{link.label}</a>
          ))}
        </div>
      </nav>

      <div className="pulsafi-footer-inner" style={{
        marginTop: 24, paddingTop: 24, borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
        transition: "border-color 0.3s",
      }}>
        <div>
          <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>Pulsa<span style={{ color: "var(--accent)" }}>fi</span></div>
          </a>
          <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>© 2026 Pulsafi. Free financial tools for everyone.</div>
        </div>
        <nav className="pulsafi-footer-links" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Contact Us", href: "/contact" },
            { label: "Advertise with Us", href: "/advertise" },
            { label: "Embed Tools", href: "/embed" },
            { label: "Financial Glossary", href: "/glossary" },
          ].map(link => (
            <a key={link.label} href={link.href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: 12, fontFamily: "'DM Sans', sans-serif", minHeight: "44px", display: "flex", alignItems: "center" }} title={link.label}>{link.label}</a>
          ))}
        </nav>
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
            flex-direction: column !important;
          }
        }
        .pulsafi-footer-links a:focus-visible,
        .pulsafi-footer-explore a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
          border-radius: 4px;
          padding: 2px 4px;
        }
      `}</style>
    </footer>
  );
}

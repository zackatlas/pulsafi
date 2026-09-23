"use client";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

// Lean site header: logo, primary nav, theme toggle, mobile menu.
// The account / login / gamification menu that used to live here was removed
// in September 2026 — it shipped a Supabase client on every page for a feature
// almost nobody used. The games and dashboard still exist but are unlisted.

const NAV_ITEMS = [
  { label: "Learn", href: "/learn" },
  { label: "Tools", href: "/tools" },
  { label: "Salaries", href: "/city-job-salary" },
  { label: "Rates", href: "/market-today" },
  { label: "Research", href: "/research" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const isDark = theme === "dark";

  return (
    <>
      <header style={{
        borderBottom: "1px solid var(--border)", padding: "14px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, background: "var(--bg-header)", backdropFilter: "blur(12px)", zIndex: 100,
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, fontWeight: 900, color: isDark ? "#0d0f13" : "#ffffff", fontFamily: "'Playfair Display', serif",
          }}>P</div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
            Pulsa<span style={{ color: "var(--accent)" }}>fi</span>
          </span>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <nav className="pulsafi-desktop-nav" aria-label="Primary" style={{ display: "flex", gap: 22, alignItems: "center" }}>
            {NAV_ITEMS.map(item => (
              <a key={item.label} href={item.href} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.01em", transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = "var(--accent)"}
                onMouseOut={e => e.target.style.color = "var(--text-secondary)"}
              >{item.label}</a>
            ))}
          </nav>

          <button onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Light mode" : "Dark mode"}
            style={{
              width: 40, height: 40, minWidth: 40, borderRadius: "50%",
              border: "1px solid var(--border-card)", background: "var(--bg-input)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--text-secondary)", transition: "all 0.2s",
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </button>

          <button className="pulsafi-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu" aria-expanded={mobileMenuOpen} aria-controls="pulsafi-mobile-nav"
            style={{
              display: "none", background: "none", border: "none", cursor: "pointer",
              padding: 6, color: "var(--text-primary)",
              position: "relative", width: 44, height: 44, minWidth: 44, minHeight: 44,
              alignItems: "center", justifyContent: "center",
            }}>
            <div style={{ width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1, transition: "all 0.3s ease", transform: mobileMenuOpen ? "rotate(45deg) translate(1px, 1px)" : "none", position: "absolute", top: mobileMenuOpen ? "50%" : "calc(50% - 6px)" }} />
            <div style={{ width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1, transition: "all 0.2s ease", opacity: mobileMenuOpen ? 0 : 1, position: "absolute", top: "50%" }} />
            <div style={{ width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1, transition: "all 0.3s ease", transform: mobileMenuOpen ? "rotate(-45deg) translate(1px, -1px)" : "none", position: "absolute", top: mobileMenuOpen ? "50%" : "calc(50% + 6px)" }} />
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", zIndex: 98, animation: "fadeIn 0.2s ease-out",
        }} />
      )}
      <nav className="pulsafi-mobile-menu" id="pulsafi-mobile-nav" aria-label="Mobile" style={{
        position: "fixed", top: 61, right: 0, bottom: 0, width: "280px",
        background: "var(--bg-card)", borderLeft: "1px solid var(--border)",
        zIndex: 99, padding: "20px 0",
        transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowY: "auto", display: "none",
      }}>
        {NAV_ITEMS.map(item => (
          <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{
            display: "block", padding: "14px 24px",
            color: "var(--text-primary)", textDecoration: "none",
            fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
            borderBottom: "1px solid var(--border)", transition: "background 0.15s",
          }}>{item.label}</a>
        ))}
      </nav>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @media (max-width: 768px) {
          .pulsafi-desktop-nav { display: none !important; }
          .pulsafi-hamburger { display: flex !important; }
          .pulsafi-mobile-menu { display: block !important; }
        }
        .pulsafi-mobile-menu a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
      `}</style>
    </>
  );
}

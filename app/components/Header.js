"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { label: "Learn", href: "/learn" },
    { label: "Tools", href: "/tools" },
    { label: "Play", href: "/play" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={{
      borderBottom: "1px solid var(--border)", padding: "16px 24px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      position: "sticky", top: 0, background: "var(--bg-header)", backdropFilter: "blur(12px)", zIndex: 100,
      transition: "background 0.3s, border-color 0.3s",
    }}>
      <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 900, color: theme === "dark" ? "#0d0f13" : "#ffffff", fontFamily: "'Playfair Display', serif",
        }}>P</div>
        <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", fontFamily: "'Playfair Display', serif", color: "var(--text-primary)" }}>
          Pulsa<span style={{ color: "var(--accent)" }}>fi</span>
        </span>
      </a>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {navItems.map(item => (
            <a key={item.label} href={item.href} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.01em", transition: "color 0.2s" }}
              onMouseOver={e => e.target.style.color = "var(--accent)"}
              onMouseOut={e => e.target.style.color = "var(--text-secondary)"}
            >{item.label}</a>
          ))}
        </nav>

        {/* Settings Icon */}
        <div ref={dropdownRef} style={{ position: "relative" }}>
          <button onClick={() => setSettingsOpen(!settingsOpen)} style={{
            width: 36, height: 36, borderRadius: "50%", border: "1px solid var(--border-card)",
            background: "var(--bg-card)", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.2s", color: "var(--text-secondary)",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>

          {/* Settings Dropdown */}
          {settingsOpen && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0, width: 260,
              background: "var(--bg-card)", border: "1px solid var(--border-card)",
              borderRadius: 14, padding: "8px 0",
              boxShadow: theme === "dark" ? "0 12px 40px rgba(0,0,0,0.5)" : "0 12px 40px rgba(0,0,0,0.12)",
              zIndex: 200, transition: "background 0.3s",
            }}>
              <div style={{ padding: "12px 16px 8px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif" }}>
                Settings
              </div>

              {/* Theme Toggle */}
              <button onClick={toggleTheme} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer",
                color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                transition: "background 0.15s",
              }}
                onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>{theme === "dark" ? "🌙" : "☀️"}</span>
                  <span>Appearance</span>
                </div>
                <div style={{
                  width: 44, height: 24, borderRadius: 12, padding: 2,
                  background: theme === "dark" ? "var(--accent)" : "var(--border-input)",
                  transition: "background 0.3s", display: "flex", alignItems: "center",
                  justifyContent: theme === "dark" ? "flex-end" : "flex-start",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: theme === "dark" ? "#0d0f13" : "#ffffff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "all 0.3s",
                  }} />
                </div>
              </button>

              <div style={{ height: 1, background: "var(--border)", margin: "4px 12px" }} />

              {/* Currency Setting */}
              <button style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer",
                color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                transition: "background 0.15s",
              }}
                onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>💲</span>
                  <span>Currency</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>USD</span>
              </button>

              {/* Notifications */}
              <button style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer",
                color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                transition: "background 0.15s",
              }}
                onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>🔔</span>
                  <span>Notifications</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>On</span>
              </button>

              <div style={{ height: 1, background: "var(--border)", margin: "4px 12px" }} />

              {/* Newsletter Link */}
              <a href="/resources" style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 16px", textDecoration: "none",
                color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
                transition: "background 0.15s",
              }}
                onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <span style={{ fontSize: 16 }}>📬</span>
                <span>Subscribe to Newsletter</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

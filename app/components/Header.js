"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({ name: "", initials: "" });
  const [nameInput, setNameInput] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { label: "My Finances", href: "/dashboard" },
    { label: "Learn", href: "/learn" },
    { label: "Tools", href: "/tools" },
    { label: "Play", href: "/play" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ];

  // Load profile from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pulsafi_profile");
      if (saved) setProfile(JSON.parse(saved));
    } catch {}
  }, []);

  // Compute stats from localStorage
  const [stats, setStats] = useState({ level: 1, xp: 0, streak: 0, stars: 0, gamesPlayed: 0 });
  useEffect(() => {
    if (!profileOpen) return;
    try {
      const lp = JSON.parse(localStorage.getItem("pulsafi_learn_progress") || "{}");
      const xp = lp.xp || 0;
      const streak = lp.streak || 0;
      const stars = Object.values(lp.stars || {}).reduce((a, b) => a + b, 0);
      const levels = [0, 50, 120, 220, 350, 520, 740, 1020, 1380, 1840, 2440, 3200, 4200];
      let level = 1;
      for (let i = 1; i < levels.length; i++) { if (xp >= levels[i]) level = i + 1; }
      const dp = JSON.parse(localStorage.getItem("pulsafi_daily_pulse") || "{}");
      const gamesPlayed = dp.history ? dp.history.length : 0;
      setStats({ level, xp, streak, stars, gamesPlayed });
    } catch {}
  }, [profileOpen]);

  const saveProfile = (p) => {
    setProfile(p);
    try { localStorage.setItem("pulsafi_profile", JSON.stringify(p)); } catch {}
  };

  const handleNameSave = () => {
    const name = nameInput.trim();
    if (!name) return;
    const parts = name.split(" ").filter(Boolean);
    const initials = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
    saveProfile({ name, initials });
    setEditing(false);
  };

  const handleResetProgress = () => {
    if (confirm("Reset all learning progress, game history, and stats? This cannot be undone.")) {
      localStorage.removeItem("pulsafi_learn_progress");
      localStorage.removeItem("pulsafi_daily_pulse");
      localStorage.removeItem("pulsafi_leaderboard");
      localStorage.removeItem("pulsafi_health_score");
      localStorage.removeItem("pulsafi_net_worth");
      setStats({ level: 1, xp: 0, streak: 0, stars: 0, gamesPlayed: 0 });
    }
  };

  // Close dropdown and mobile menu on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
        setEditing(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const hasProfile = !!profile.name;
  const avatarBg = hasProfile
    ? "linear-gradient(135deg, var(--accent), var(--accent-dark))"
    : "var(--bg-input)";
  const avatarColor = hasProfile
    ? (theme === "dark" ? "#0d0f13" : "#ffffff")
    : "var(--text-muted)";

  const Row = ({ icon, label, right, onClick, href, danger }) => {
    const Tag = href ? "a" : "button";
    return (
      <Tag onClick={onClick} href={href} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer",
        color: danger ? "#e74c3c" : "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", fontSize: 14,
        transition: "background 0.15s", textDecoration: "none",
      }}
        onMouseOver={e => e.currentTarget.style.background = danger ? "rgba(231,76,60,0.06)" : "var(--accent-bg)"}
        onMouseOut={e => e.currentTarget.style.background = "transparent"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{icon}</span>
          <span>{label}</span>
        </div>
        {right !== undefined && (
          <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>{right}</span>
        )}
        {!right && right !== 0 && !onClick && href && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
        )}
      </Tag>
    );
  };

  return (
    <>
      <header style={{
        borderBottom: "1px solid var(--border)", padding: "14px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, background: "var(--bg-header)", backdropFilter: "blur(12px)", zIndex: 100,
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {/* Logo */}
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

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Desktop Nav — hidden on mobile via CSS */}
          <nav className="pulsafi-desktop-nav" style={{ display: "flex", gap: 22, alignItems: "center" }}>
            {navItems.map(item => (
              <a key={item.label} href={item.href} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: 13, fontWeight: 500, letterSpacing: "0.01em", transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = "var(--accent)"}
                onMouseOut={e => e.target.style.color = "var(--text-secondary)"}
              >{item.label}</a>
            ))}
          </nav>

          {/* ═══ PROFILE AVATAR ═══ */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button onClick={() => { setProfileOpen(!profileOpen); setEditing(false); }} style={{
              width: 38, height: 38, borderRadius: "50%",
              border: profileOpen ? "2px solid var(--accent)" : "2px solid var(--border-card)",
              background: avatarBg,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.2s",
              color: avatarColor, fontSize: 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
              boxShadow: profileOpen ? "0 0 0 3px var(--accent-bg)" : "none",
              position: "relative",
            }}
              onMouseOver={e => { if (!profileOpen) e.currentTarget.style.borderColor = "var(--accent)"; }}
              onMouseOut={e => { if (!profileOpen) e.currentTarget.style.borderColor = "var(--border-card)"; }}
            >
              {hasProfile ? profile.initials : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
              {stats.streak > 0 && hasProfile && (
                <div style={{
                  position: "absolute", top: -4, right: -4,
                  width: 18, height: 18, borderRadius: "50%",
                  background: "#e67e22", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#fff",
                  border: "2px solid var(--bg-header)",
                }}>🔥</div>
              )}
            </button>

            {/* ═══ PROFILE DROPDOWN ═══ */}
            {profileOpen && (
              <div className="pulsafi-profile-dropdown" style={{
                position: "absolute", top: "calc(100% + 10px)", right: 0, width: 300,
                background: "var(--bg-card)", border: "1px solid var(--border-card)",
                borderRadius: 16, overflow: "hidden",
                boxShadow: theme === "dark" ? "0 16px 48px rgba(0,0,0,0.6)" : "0 16px 48px rgba(0,0,0,0.14)",
                zIndex: 200, animation: "profileSlide 0.15s ease-out",
                maxHeight: "calc(100vh - 80px)", overflowY: "auto",
              }}>

                {/* ─── Profile Card ─── */}
                <div style={{
                  padding: "20px 16px 16px",
                  background: "linear-gradient(135deg, var(--accent-bg), transparent)",
                  borderBottom: "1px solid var(--border)",
                }}>
                  {!editing ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: avatarBg, display: "flex", alignItems: "center", justifyContent: "center",
                        color: avatarColor, fontSize: 17, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                        border: "2px solid var(--border-card)", flexShrink: 0,
                      }}>
                        {hasProfile ? profile.initials : (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                          </svg>
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                          {hasProfile ? profile.name : "Set up your profile"}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                          {hasProfile ? `Level ${stats.level} · ${stats.xp} XP` : "Tap Edit to add your name"}
                        </div>
                      </div>
                      <button onClick={() => { setEditing(true); setNameInput(profile.name || ""); }} style={{
                        background: "none", border: "none", cursor: "pointer", color: "var(--accent)",
                        fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", padding: "4px 10px",
                        borderRadius: 6, transition: "background 0.15s",
                      }}
                        onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                        onMouseOut={e => e.currentTarget.style.background = "none"}
                      >
                        {hasProfile ? "Edit" : "Set up"}
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                        {hasProfile ? "Edit your name" : "What should we call you?"}
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <input autoFocus value={nameInput} onChange={e => setNameInput(e.target.value)}
                          onKeyDown={e => e.key === "Enter" && handleNameSave()}
                          placeholder="Your name" style={{
                            flex: 1, padding: "9px 12px", borderRadius: 10,
                            border: "1px solid var(--border-input)", background: "var(--bg-input)",
                            color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                          }} />
                        <button onClick={handleNameSave} style={{
                          padding: "9px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                          color: theme === "dark" ? "#0d0f13" : "#fff", fontWeight: 700, fontSize: 13,
                          fontFamily: "'DM Sans', sans-serif",
                        }}>Save</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── Stats Grid ─── */}
                {hasProfile && (
                  <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 1, background: "var(--border)", borderBottom: "1px solid var(--border)",
                  }}>
                    {[
                      { label: "Streak", value: `${stats.streak}`, icon: "🔥", color: "#e67e22" },
                      { label: "Stars", value: `${stats.stars}`, icon: "⭐", color: "var(--accent)" },
                      { label: "Games", value: `${stats.gamesPlayed}`, icon: "🎮", color: "#9b59b6" },
                    ].map((s, i) => (
                      <div key={i} style={{ background: "var(--bg-card)", padding: "12px 8px", textAlign: "center" }}>
                        <div style={{ fontSize: 17, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace" }}>
                          {s.value} <span style={{ fontSize: 12 }}>{s.icon}</span>
                        </div>
                        <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ─── Quick Links ─── */}
                <div style={{ padding: "4px 0" }}>
                  <div style={{ padding: "10px 16px 6px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                    Quick Links
                  </div>
                  <Row icon="💰" label="My Finances" href="/dashboard" />
                  <Row icon="🏆" label="Achievements" href="/achievements" />
                  <Row icon="📚" label="Continue Learning" href="/learn" />
                  <Row icon="🎯" label="Daily Pulse" href="/play" />
                  <Row icon="💰" label="Net Worth Calculator" href="/tools/net-worth-calculator" />
                  <Row icon="📊" label="Financial Health Score" href="/tools/financial-health-score" />
                </div>

                <div style={{ height: 1, background: "var(--border)", margin: "0 12px" }} />

                {/* ─── Settings ─── */}
                <div style={{ padding: "4px 0" }}>
                  <div style={{ padding: "10px 16px 6px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>
                    Settings
                  </div>

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
                      <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{theme === "dark" ? "🌙" : "☀️"}</span>
                      <span>Dark Mode</span>
                    </div>
                    <div style={{
                      width: 40, height: 22, borderRadius: 11, padding: 2,
                      background: theme === "dark" ? "var(--accent)" : "var(--border-input)",
                      transition: "background 0.3s", display: "flex", alignItems: "center",
                      justifyContent: theme === "dark" ? "flex-end" : "flex-start",
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        background: theme === "dark" ? "#0d0f13" : "#ffffff",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)", transition: "all 0.3s",
                      }} />
                    </div>
                  </button>

                  <Row icon="💲" label="Currency" right="USD" />
                  <Row icon="🔔" label="Notifications" right="On" />
                  <Row icon="📬" label="Subscribe to Newsletter" href="/resources" />
                </div>

                <div style={{ height: 1, background: "var(--border)", margin: "0 12px" }} />

                {/* ─── Danger Zone ─── */}
                <div style={{ padding: "4px 0 8px" }}>
                  <Row icon="🗑️" label="Reset All Progress" onClick={handleResetProgress} danger />
                </div>
              </div>
            )}
          </div>

          {/* ═══ HAMBURGER BUTTON — visible on mobile only ═══ */}
          <button
            className="pulsafi-hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none", /* shown via media query */
              background: "none", border: "none", cursor: "pointer",
              padding: 6, color: "var(--text-primary)",
              position: "relative", width: 36, height: 36,
              alignItems: "center", justifyContent: "center",
            }}
          >
            <div style={{
              width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1,
              transition: "all 0.3s ease",
              transform: mobileMenuOpen ? "rotate(45deg) translate(1px, 1px)" : "none",
              position: "absolute",
              top: mobileMenuOpen ? "50%" : "calc(50% - 5px)",
            }} />
            <div style={{
              width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1,
              transition: "all 0.2s ease",
              opacity: mobileMenuOpen ? 0 : 1,
              position: "absolute", top: "50%",
            }} />
            <div style={{
              width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1,
              transition: "all 0.3s ease",
              transform: mobileMenuOpen ? "rotate(-45deg) translate(1px, -1px)" : "none",
              position: "absolute",
              top: mobileMenuOpen ? "50%" : "calc(50% + 5px)",
            }} />
          </button>
        </div>
      </header>

      {/* ═══ MOBILE MENU OVERLAY ═══ */}
      {mobileMenuOpen && (
        <div
          className="pulsafi-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)", zIndex: 98,
            animation: "fadeIn 0.2s ease-out",
          }}
        />
      )}
      <nav
        className="pulsafi-mobile-menu"
        style={{
          position: "fixed", top: 61, right: 0, bottom: 0, width: "280px",
          background: "var(--bg-card)", borderLeft: "1px solid var(--border)",
          zIndex: 99, padding: "20px 0",
          transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          display: "none", /* shown via media query */
        }}
      >
        {navItems.map(item => (
          <a
            key={item.label} href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              display: "block", padding: "14px 24px",
              color: "var(--text-primary)", textDecoration: "none",
              fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
              borderBottom: "1px solid var(--border)",
              transition: "background 0.15s",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <style jsx global>{`
        @keyframes profileSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ═══ MOBILE RESPONSIVE ═══ */
        @media (max-width: 768px) {
          .pulsafi-desktop-nav {
            display: none !important;
          }
          .pulsafi-hamburger {
            display: flex !important;
          }
          .pulsafi-mobile-menu {
            display: block !important;
          }
          .pulsafi-profile-dropdown {
            width: 280px !important;
            right: -40px !important;
          }
        }
        @media (max-width: 360px) {
          .pulsafi-profile-dropdown {
            width: 260px !important;
            right: -50px !important;
          }
        }
      `}</style>
    </>
  );
}

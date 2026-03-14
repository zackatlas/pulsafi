"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "./AuthProvider";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const {
    user, profile, loading,
    signUp, signIn, signInWithGoogle, signOut,
    updateProfile, updateData, refreshProfile,
  } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // null | "login" | "signup" | "editName"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navItems = [
    { label: "Learn", href: "/learn" },
    { label: "Tools", href: "/tools" },
    { label: "Salaries", href: "/city-job-salary" },
    { label: "Play", href: "/play" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ];

  const isLoggedIn = !!user;
  const displayName = profile?.name || (user?.email?.split("@")[0]) || "";
  const displayInitials = profile?.initials || displayName.slice(0, 2).toUpperCase() || "";
  const hasName = !!profile?.name;

  // ─── Compute stats from profile data (Supabase) ───
  const stats = (() => {
    if (!profile) return { level: 1, xp: 0, streak: 0, stars: 0, gamesPlayed: 0 };
    const lp = profile.learn_progress || {};
    const xp = lp.xp || 0;
    const streak = lp.streak || 0;
    const stars = Object.values(lp.stars || {}).reduce((a, b) => a + b, 0);
    const levels = [0, 50, 120, 220, 350, 520, 740, 1020, 1380, 1840, 2440, 3200, 4200];
    let level = 1;
    for (let i = 1; i < levels.length; i++) { if (xp >= levels[i]) level = i + 1; }
    const dp = profile.daily_pulse || {};
    const gamesPlayed = dp.history ? dp.history.length : 0;
    return { level, xp, streak, stars, gamesPlayed };
  })();

  // ─── Auth handlers ───
  const handleEmailAuth = async (mode) => {
    setAuthError("");
    setAuthSuccess("");
    setAuthLoading(true);

    if (!email.trim() || !password.trim()) {
      setAuthError("Please enter both email and password.");
      setAuthLoading(false);
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      setAuthLoading(false);
      return;
    }

    const { error } = mode === "signup"
      ? await signUp(email.trim(), password)
      : await signIn(email.trim(), password);

    if (error) {
      setAuthError(error.message);
    } else if (mode === "signup") {
      setAuthSuccess("Check your email for a confirmation link!");
    } else {
      setAuthMode(null);
      setEmail("");
      setPassword("");
    }
    setAuthLoading(false);
  };

  const handleGoogleLogin = async () => {
    setAuthError("");
    const { error } = await signInWithGoogle();
    if (error) setAuthError(error.message);
  };

  const handleNameSave = async () => {
    const name = nameInput.trim();
    if (!name) return;
    const parts = name.split(" ").filter(Boolean);
    const initials = parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : name.slice(0, 2).toUpperCase();
    await updateProfile({ name, initials });
    setAuthMode(null);
  };

  const handleSignOut = async () => {
    await signOut();
    setProfileOpen(false);
    setAuthMode(null);
  };

  const handleResetProgress = async () => {
    if (confirm("Reset all learning progress, game history, and stats? This cannot be undone.")) {
      await updateData("learn_progress", {});
      await updateData("daily_pulse", {});
      await updateData("health_score", {});
      await updateData("net_worth", {});
    }
  };

  // ─── Close handlers ───
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
        setAuthMode(null);
        setAuthError("");
        setAuthSuccess("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // ─── Styling helpers ───
  const avatarBg = isLoggedIn
    ? "linear-gradient(135deg, var(--accent), var(--accent-dark))"
    : "var(--bg-input)";
  const avatarColor = isLoggedIn
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

  const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  const PersonIcon = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

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
          {/* Desktop Nav */}
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
            <button onClick={() => { setProfileOpen(!profileOpen); setAuthMode(null); setAuthError(""); setAuthSuccess(""); }} style={{
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
              {isLoggedIn && displayInitials ? displayInitials : <PersonIcon />}
              {stats.streak > 0 && isLoggedIn && (
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
                position: "absolute", top: "calc(100% + 10px)", right: 0, width: 320,
                background: "var(--bg-card)", border: "1px solid var(--border-card)",
                borderRadius: 16, overflow: "hidden",
                boxShadow: theme === "dark" ? "0 16px 48px rgba(0,0,0,0.6)" : "0 16px 48px rgba(0,0,0,0.14)",
                zIndex: 200, animation: "profileSlide 0.15s ease-out",
                maxHeight: "calc(100vh - 80px)", overflowY: "auto",
              }}>

                {/* ═══════════════════════════════════════ */}
                {/* NOT LOGGED IN — Landing view            */}
                {/* ═══════════════════════════════════════ */}
                {!isLoggedIn && !authMode && (
                  <div style={{ padding: "24px 16px 20px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "var(--bg-input)", display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--text-muted)", border: "2px solid var(--border-card)", flexShrink: 0,
                      }}>
                        <PersonIcon size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                          Welcome to Pulsafi
                        </div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                          Sign in to track progress across devices
                        </div>
                      </div>
                    </div>

                    <button onClick={handleGoogleLogin} style={{
                      width: "100%", padding: "11px 16px", borderRadius: 10,
                      border: "1px solid var(--border-input)", background: "var(--bg-input)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      cursor: "pointer", fontSize: 14, fontWeight: 600, color: "var(--text-primary)",
                      fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s",
                    }}
                      onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                      onMouseOut={e => e.currentTarget.style.background = "var(--bg-input)"}
                    >
                      <GoogleIcon /> Continue with Google
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0" }}>
                      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                      <span style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>or</span>
                      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccess(""); }} style={{
                        flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                        background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                        border: "none", color: theme === "dark" ? "#0d0f13" : "#fff",
                        fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                      }}>Log In</button>
                      <button onClick={() => { setAuthMode("signup"); setAuthError(""); setAuthSuccess(""); }} style={{
                        flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                        background: "var(--bg-input)", border: "1px solid var(--border-input)",
                        color: "var(--text-primary)", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                      }}>Sign Up</button>
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════ */}
                {/* NOT LOGGED IN — Email form               */}
                {/* ═══════════════════════════════════════ */}
                {!isLoggedIn && (authMode === "login" || authMode === "signup") && (
                  <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <button onClick={() => { setAuthMode(null); setAuthError(""); setAuthSuccess(""); }} style={{
                        background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4, display: "flex",
                      }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
                      </button>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                        {authMode === "login" ? "Log In" : "Create Account"}
                      </span>
                    </div>

                    <button onClick={handleGoogleLogin} style={{
                      width: "100%", padding: "10px 16px", borderRadius: 10, marginBottom: 12,
                      border: "1px solid var(--border-input)", background: "var(--bg-input)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--text-primary)",
                      fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s",
                    }}
                      onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                      onMouseOut={e => e.currentTarget.style.background = "var(--bg-input)"}
                    >
                      <GoogleIcon /> Continue with Google
                    </button>

                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 12px" }}>
                      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                      <span style={{ fontSize: 11, color: "var(--text-faint)" }}>or</span>
                      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <input type="email" placeholder="Email address" value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                          padding: "10px 14px", borderRadius: 10,
                          border: "1px solid var(--border-input)", background: "var(--bg-input)",
                          color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                        }} />
                      <input type="password" placeholder="Password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleEmailAuth(authMode)}
                        style={{
                          padding: "10px 14px", borderRadius: 10,
                          border: "1px solid var(--border-input)", background: "var(--bg-input)",
                          color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                        }} />
                    </div>

                    {authError && (
                      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: "rgba(231,76,60,0.08)", border: "1px solid rgba(231,76,60,0.2)", fontSize: 12, color: "#e74c3c" }}>
                        {authError}
                      </div>
                    )}
                    {authSuccess && (
                      <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: "rgba(46,204,113,0.08)", border: "1px solid rgba(46,204,113,0.2)", fontSize: 12, color: "#2ecc71" }}>
                        {authSuccess}
                      </div>
                    )}

                    <button onClick={() => handleEmailAuth(authMode)} disabled={authLoading} style={{
                      width: "100%", marginTop: 10, padding: "11px 16px", borderRadius: 10, border: "none",
                      cursor: authLoading ? "default" : "pointer",
                      background: authLoading ? "var(--bg-input)" : "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      color: authLoading ? "var(--text-muted)" : (theme === "dark" ? "#0d0f13" : "#fff"),
                      fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {authLoading ? "Please wait..." : authMode === "login" ? "Log In" : "Create Account"}
                    </button>

                    <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "var(--text-muted)" }}>
                      {authMode === "login" ? (
                        <>Don&apos;t have an account?{" "}
                          <button onClick={() => { setAuthMode("signup"); setAuthError(""); setAuthSuccess(""); }}
                            style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 600, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                            Sign Up
                          </button>
                        </>
                      ) : (
                        <>Already have an account?{" "}
                          <button onClick={() => { setAuthMode("login"); setAuthError(""); setAuthSuccess(""); }}
                            style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 600, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                            Log In
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* ═══════════════════════════════════════ */}
                {/* LOGGED IN — Profile card                */}
                {/* ═══════════════════════════════════════ */}
                {isLoggedIn && (
                  <div style={{
                    padding: "20px 16px 16px",
                    background: "linear-gradient(135deg, var(--accent-bg), transparent)",
                    borderBottom: "1px solid var(--border)",
                  }}>
                    {authMode !== "editName" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: "50%",
                          background: avatarBg, display: "flex", alignItems: "center", justifyContent: "center",
                          color: avatarColor, fontSize: 17, fontWeight: 700, fontFamily: "'DM Sans', sans-serif",
                          border: "2px solid var(--border-card)", flexShrink: 0,
                        }}>
                          {displayInitials || <PersonIcon size={22} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>
                            {displayName || "Set your name"}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                            Level {stats.level} · {stats.xp} XP
                          </div>
                          <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.email}
                          </div>
                        </div>
                        <button onClick={() => { setAuthMode("editName"); setNameInput(profile?.name || ""); }} style={{
                          background: "none", border: "none", cursor: "pointer", color: "var(--accent)",
                          fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", padding: "4px 10px",
                          borderRadius: 6, transition: "background 0.15s", flexShrink: 0,
                        }}
                          onMouseOver={e => e.currentTarget.style.background = "var(--accent-bg)"}
                          onMouseOut={e => e.currentTarget.style.background = "none"}
                        >Edit</button>
                      </div>
                    ) : (
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>
                          {hasName ? "Edit your display name" : "What should we call you?"}
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

                    <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#2ecc71" }} />
                      <span style={{ fontSize: 11, color: "var(--text-faint)" }}>Synced across devices</span>
                    </div>
                  </div>
                )}

                {/* ─── Stats Grid (logged in only) ─── */}
                {isLoggedIn && (
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
                  <Row icon="✉️" label="The Pulse Newsletter" href="/newsletter" />
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
                </div>

                <div style={{ height: 1, background: "var(--border)", margin: "0 12px" }} />

                {/* ─── Account actions ─── */}
                <div style={{ padding: "4px 0 8px" }}>
                  {isLoggedIn && (
                    <>
                      <Row icon="🗑️" label="Reset All Progress" onClick={handleResetProgress} danger />
                      <Row icon="🚪" label="Sign Out" onClick={handleSignOut} />
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ═══ HAMBURGER ═══ */}
          <button className="pulsafi-hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              display: "none", background: "none", border: "none", cursor: "pointer",
              padding: 6, color: "var(--text-primary)",
              position: "relative", width: 36, height: 36,
              alignItems: "center", justifyContent: "center",
            }}>
            <div style={{ width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1, transition: "all 0.3s ease", transform: mobileMenuOpen ? "rotate(45deg) translate(1px, 1px)" : "none", position: "absolute", top: mobileMenuOpen ? "50%" : "calc(50% - 5px)" }} />
            <div style={{ width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1, transition: "all 0.2s ease", opacity: mobileMenuOpen ? 0 : 1, position: "absolute", top: "50%" }} />
            <div style={{ width: 20, height: 2, background: "var(--text-primary)", borderRadius: 1, transition: "all 0.3s ease", transform: mobileMenuOpen ? "rotate(-45deg) translate(1px, -1px)" : "none", position: "absolute", top: mobileMenuOpen ? "50%" : "calc(50% + 5px)" }} />
          </button>
        </div>
      </header>

      {/* Mobile overlay + menu */}
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", zIndex: 98, animation: "fadeIn 0.2s ease-out",
        }} />
      )}
      <nav className="pulsafi-mobile-menu" style={{
        position: "fixed", top: 61, right: 0, bottom: 0, width: "280px",
        background: "var(--bg-card)", borderLeft: "1px solid var(--border)",
        zIndex: 99, padding: "20px 0",
        transform: mobileMenuOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowY: "auto", display: "none",
      }}>
        {navItems.map(item => (
          <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} style={{
            display: "block", padding: "14px 24px",
            color: "var(--text-primary)", textDecoration: "none",
            fontSize: 16, fontWeight: 500, fontFamily: "'DM Sans', sans-serif",
            borderBottom: "1px solid var(--border)", transition: "background 0.15s",
          }}>{item.label}</a>
        ))}
        {!isLoggedIn && (
          <div style={{ padding: "16px 24px" }}>
            <button onClick={() => { setMobileMenuOpen(false); setProfileOpen(true); }} style={{
              width: "100%", padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              color: theme === "dark" ? "#0d0f13" : "#fff",
              fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif",
            }}>Sign In</button>
          </div>
        )}
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
        @media (max-width: 768px) {
          .pulsafi-desktop-nav { display: none !important; }
          .pulsafi-hamburger { display: flex !important; }
          .pulsafi-mobile-menu { display: block !important; }
          .pulsafi-profile-dropdown {
            width: 300px !important;
            right: -40px !important;
          }
        }
        @media (max-width: 360px) {
          .pulsafi-profile-dropdown {
            width: 270px !important;
            right: -50px !important;
          }
        }
      `}</style>
    </>
  );
}

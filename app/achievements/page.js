"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ═══ BADGE DEFINITIONS ═══
const BADGES = [
  // ── GETTING STARTED ──
  { id: "first_steps", name: "First Steps", desc: "Complete your first lesson", icon: "🐣", rarity: "common", category: "learning", check: (d) => d.lessonsCompleted >= 1 },
  { id: "curious_mind", name: "Curious Mind", desc: "Complete 5 lessons", icon: "🧠", rarity: "common", category: "learning", check: (d) => d.lessonsCompleted >= 5 },
  { id: "scholar", name: "Scholar", desc: "Complete all 14 lessons", icon: "🎓", rarity: "epic", category: "learning", check: (d) => d.lessonsCompleted >= 14 },
  { id: "perfect_lesson", name: "Perfectionist", desc: "Get 3 stars on any lesson", icon: "⭐", rarity: "common", category: "learning", check: (d) => d.perfectLessons >= 1 },
  { id: "all_stars", name: "Gold Standard", desc: "Get 3 stars on every lesson", icon: "🌟", rarity: "legendary", category: "learning", check: (d) => d.perfectLessons >= 14 },
  { id: "level_5", name: "Rising Star", desc: "Reach Level 5", icon: "📈", rarity: "rare", category: "learning", check: (d) => d.level >= 5 },
  { id: "level_10", name: "Finance Guru", desc: "Reach Level 10", icon: "🧙", rarity: "epic", category: "learning", check: (d) => d.level >= 10 },

  // ── STREAKS ──
  { id: "streak_3", name: "On a Roll", desc: "3-day learning streak", icon: "🔥", rarity: "common", category: "streaks", check: (d) => d.streak >= 3 },
  { id: "streak_7", name: "Week Warrior", desc: "7-day learning streak", icon: "💪", rarity: "rare", category: "streaks", check: (d) => d.streak >= 7 },
  { id: "streak_14", name: "Unstoppable", desc: "14-day learning streak", icon: "⚡", rarity: "epic", category: "streaks", check: (d) => d.streak >= 14 },
  { id: "streak_30", name: "Iron Will", desc: "30-day learning streak", icon: "🏆", rarity: "legendary", category: "streaks", check: (d) => d.streak >= 30 },

  // ── GAMES ──
  { id: "first_game", name: "Player One", desc: "Play your first Daily Pulse", icon: "🎮", rarity: "common", category: "games", check: (d) => d.gamesPlayed >= 1 },
  { id: "game_10", name: "Regular", desc: "Play 10 Daily Pulse games", icon: "🎯", rarity: "rare", category: "games", check: (d) => d.gamesPlayed >= 10 },
  { id: "game_50", name: "Addicted", desc: "Play 50 Daily Pulse games", icon: "🕹️", rarity: "epic", category: "games", check: (d) => d.gamesPlayed >= 50 },
  { id: "perfect_game", name: "Flawless", desc: "Score 1000/1000 on Daily Pulse", icon: "💯", rarity: "legendary", category: "games", check: (d) => d.perfectGames >= 1 },
  { id: "high_scorer", name: "High Scorer", desc: "Score 800+ on Daily Pulse", icon: "🏅", rarity: "rare", category: "games", check: (d) => d.highScore >= 800 },

  // ── TOOLS ──
  { id: "first_calc", name: "Number Cruncher", desc: "Use any calculator", icon: "🧮", rarity: "common", category: "tools", check: (d) => d.calcsUsed >= 1 },
  { id: "tool_explorer", name: "Tool Explorer", desc: "Use 5 different tools", icon: "🔧", rarity: "rare", category: "tools", check: (d) => d.calcsUsed >= 5 },
  { id: "health_check", name: "Health Check", desc: "Complete Financial Health Score", icon: "🩺", rarity: "common", category: "tools", check: (d) => d.healthScoreDone },
  { id: "net_worth_calc", name: "Know Your Worth", desc: "Calculate your net worth", icon: "💎", rarity: "common", category: "tools", check: (d) => d.netWorthDone },
  { id: "quiz_done", name: "Self-Aware", desc: "Complete the Money Personality Quiz", icon: "🪞", rarity: "common", category: "tools", check: (d) => d.quizDone },
  { id: "budget_builder", name: "Budget Builder", desc: "Set up a budget in My Finances", icon: "📋", rarity: "rare", category: "tools", check: (d) => d.budgetSet },

  // ── WEALTH MILESTONES ──
  { id: "nw_1k", name: "First Thousand", desc: "Net worth reaches $1,000", icon: "💵", rarity: "common", category: "wealth", check: (d) => d.netWorth >= 1000 },
  { id: "nw_10k", name: "Five Figures", desc: "Net worth reaches $10,000", icon: "💰", rarity: "rare", category: "wealth", check: (d) => d.netWorth >= 10000 },
  { id: "nw_100k", name: "Six Figures", desc: "Net worth reaches $100,000", icon: "🏦", rarity: "epic", category: "wealth", check: (d) => d.netWorth >= 100000 },
  { id: "nw_1m", name: "Millionaire", desc: "Net worth reaches $1,000,000", icon: "👑", rarity: "legendary", category: "wealth", check: (d) => d.netWorth >= 1000000 },
  { id: "saver_20", name: "Super Saver", desc: "20%+ savings rate", icon: "🐷", rarity: "rare", category: "wealth", check: (d) => d.savingsRate >= 20 },
  { id: "saver_50", name: "FIRE Starter", desc: "50%+ savings rate", icon: "🔥", rarity: "epic", category: "wealth", check: (d) => d.savingsRate >= 50 },
  { id: "debt_free", name: "Debt Free", desc: "$0 in liabilities", icon: "🕊️", rarity: "epic", category: "wealth", check: (d) => d.debtFree },
  { id: "snapshot_3", name: "Tracker", desc: "Save 3 monthly snapshots", icon: "📸", rarity: "rare", category: "wealth", check: (d) => d.snapshots >= 3 },
  { id: "snapshot_12", name: "Historian", desc: "Save 12 monthly snapshots", icon: "📚", rarity: "legendary", category: "wealth", check: (d) => d.snapshots >= 12 },

  // ── SECRET / FUN ──
  { id: "night_owl", name: "Night Owl", desc: "Use Pulsafi after midnight", icon: "🦉", rarity: "rare", category: "secret", check: (d) => d.nightOwl },
  { id: "early_bird", name: "Early Bird", desc: "Use Pulsafi before 6 AM", icon: "🐦", rarity: "rare", category: "secret", check: (d) => d.earlyBird },
  { id: "completionist", name: "Completionist", desc: "Unlock 25 badges", icon: "🏅", rarity: "legendary", category: "secret", check: (d) => d.totalUnlocked >= 25 },
];

const RARITY_CONFIG = {
  common: { label: "Common", color: "#95a5a6", bg: "rgba(149,165,166,0.08)", border: "rgba(149,165,166,0.2)", glow: "none" },
  rare: { label: "Rare", color: "#3498db", bg: "rgba(52,152,219,0.08)", border: "rgba(52,152,219,0.25)", glow: "0 0 16px rgba(52,152,219,0.15)" },
  epic: { label: "Epic", color: "#9b59b6", bg: "rgba(155,89,182,0.08)", border: "rgba(155,89,182,0.25)", glow: "0 0 20px rgba(155,89,182,0.2)" },
  legendary: { label: "Legendary", color: "#f0c040", bg: "rgba(240,192,64,0.1)", border: "rgba(240,192,64,0.3)", glow: "0 0 24px rgba(240,192,64,0.25)" },
};

const CATEGORIES = [
  { id: "all", label: "All Badges", icon: "🏆" },
  { id: "learning", label: "Learning", icon: "📚" },
  { id: "streaks", label: "Streaks", icon: "🔥" },
  { id: "games", label: "Games", icon: "🎮" },
  { id: "tools", label: "Tools", icon: "🔧" },
  { id: "wealth", label: "Wealth", icon: "💰" },
  { id: "secret", label: "Secret", icon: "🔮" },
];

// Gather all data from localStorage
function gatherStats() {
  const d = {
    lessonsCompleted: 0, perfectLessons: 0, level: 1, streak: 0,
    gamesPlayed: 0, perfectGames: 0, highScore: 0,
    calcsUsed: 0, healthScoreDone: false, netWorthDone: false, quizDone: false, budgetSet: false,
    netWorth: 0, savingsRate: 0, debtFree: false, snapshots: 0,
    nightOwl: false, earlyBird: false, totalUnlocked: 0,
  };

  try {
    // Learning progress
    const lp = JSON.parse(localStorage.getItem("pulsafi_learn_progress") || "{}");
    const stars = lp.stars || {};
    d.lessonsCompleted = Object.keys(stars).filter(k => stars[k] > 0).length;
    d.perfectLessons = Object.values(stars).filter(v => v >= 3).length;
    d.streak = lp.streak || 0;
    const xp = lp.xp || 0;
    const levels = [0, 50, 120, 220, 350, 520, 740, 1020, 1380, 1840, 2440, 3200, 4200];
    d.level = 1;
    for (let i = 1; i < levels.length; i++) { if (xp >= levels[i]) d.level = i + 1; }

    // Daily Pulse
    const dp = JSON.parse(localStorage.getItem("pulsafi_daily_pulse") || "{}");
    const hist = dp.history || [];
    d.gamesPlayed = hist.length;
    d.perfectGames = hist.filter(h => h.score >= 1000).length;
    d.highScore = hist.reduce((max, h) => Math.max(max, h.score || 0), 0);

    // Tools usage tracking
    const tools = JSON.parse(localStorage.getItem("pulsafi_tools_used") || "[]");
    d.calcsUsed = tools.length;

    // Health score
    d.healthScoreDone = !!localStorage.getItem("pulsafi_health_score");

    // Net worth
    d.netWorthDone = !!localStorage.getItem("pulsafi_net_worth");

    // Quiz
    d.quizDone = !!localStorage.getItem("pulsafi_quiz_result");

    // Dashboard / Budget
    const dash = JSON.parse(localStorage.getItem("pulsafi_dashboard") || "{}");
    const budget = dash.budget || {};
    d.budgetSet = Object.values(budget).some(v => v > 0);

    const assets = dash.assets || {};
    const liabilities = dash.liabilities || {};
    const totalAssets = Object.values(assets).reduce((s, v) => s + v, 0);
    const totalLiabilities = Object.values(liabilities).reduce((s, v) => s + v, 0);
    d.netWorth = totalAssets - totalLiabilities;
    d.debtFree = totalLiabilities === 0 && totalAssets > 0;

    const income = dash.income || {};
    const actual = dash.actual || {};
    const totalIncome = Object.values(income).reduce((s, v) => s + v, 0);
    const totalActual = Object.values(actual).reduce((s, v) => s + v, 0);
    d.savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalActual) / totalIncome) * 100) : 0;

    // History snapshots
    const history = JSON.parse(localStorage.getItem("pulsafi_dashboard_history") || "[]");
    d.snapshots = history.length;

    // Time-based
    const hour = new Date().getHours();
    d.nightOwl = hour >= 0 && hour < 5;
    d.earlyBird = hour >= 4 && hour < 6;

    // Record time-based achievements permanently
    const achieved = JSON.parse(localStorage.getItem("pulsafi_achievements") || "{}");
    if (d.nightOwl && !achieved.night_owl) { achieved.night_owl = Date.now(); localStorage.setItem("pulsafi_achievements", JSON.stringify(achieved)); }
    if (d.earlyBird && !achieved.early_bird) { achieved.early_bird = Date.now(); localStorage.setItem("pulsafi_achievements", JSON.stringify(achieved)); }
    // Check permanent time-based unlocks
    if (achieved.night_owl) d.nightOwl = true;
    if (achieved.early_bird) d.earlyBird = true;
  } catch {}

  return d;
}

export default function AchievementsPage() {
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("all");
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [shareAnim, setShareAnim] = useState(false);

  useEffect(() => {
    const d = gatherStats();
    // Count total unlocked for the completionist badge
    let unlocked = 0;
    BADGES.forEach(b => { if (b.id !== "completionist" && b.check(d)) unlocked++; });
    d.totalUnlocked = unlocked;
    setStats(d);
  }, []);

  if (!stats) return null;

  const unlockedBadges = BADGES.filter(b => b.check(stats));
  const lockedBadges = BADGES.filter(b => !b.check(stats));
  const totalPct = Math.round((unlockedBadges.length / BADGES.length) * 100);

  const filtered = filter === "all" ? BADGES : BADGES.filter(b => b.category === filter);

  // Share card as text
  const shareProgress = () => {
    const lines = [
      `🏆 My Pulsafi Achievements`,
      ``,
      `${unlockedBadges.length}/${BADGES.length} badges unlocked (${totalPct}%)`,
      ``,
      ...unlockedBadges.slice(0, 8).map(b => `${b.icon} ${b.name}`),
      unlockedBadges.length > 8 ? `...and ${unlockedBadges.length - 8} more!` : "",
      ``,
      `Track your finances → pulsafi.com`,
    ].filter(Boolean).join("\n");
    navigator.clipboard?.writeText(lines);
    setShareAnim(true);
    setTimeout(() => setShareAnim(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 780, margin: "0 auto", padding: "32px 16px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Achievements
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px" }}>
            Earn badges by exploring Pulsafi. {unlockedBadges.length} of {BADGES.length} unlocked.
          </p>

          {/* Progress ring */}
          <div style={{ display: "inline-block", position: "relative", marginBottom: 16 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--bg-input)" strokeWidth="8" />
              <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(totalPct / 100) * 2 * Math.PI * 52} ${2 * Math.PI * 52}`}
                style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dasharray 0.8s ease" }}
              />
              <text x="60" y="55" textAnchor="middle" fill="var(--text-primary)" fontSize="26" fontWeight="700" fontFamily="'DM Mono', monospace">{totalPct}%</text>
              <text x="60" y="72" textAnchor="middle" fill="var(--text-muted)" fontSize="10">complete</text>
            </svg>
          </div>

          {/* Rarity summary */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            {["common", "rare", "epic", "legendary"].map(r => {
              const total = BADGES.filter(b => b.rarity === r).length;
              const got = unlockedBadges.filter(b => b.rarity === r).length;
              const cfg = RARITY_CONFIG[r];
              return (
                <div key={r} style={{
                  padding: "6px 14px", borderRadius: 10,
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  fontSize: 12, fontWeight: 600, color: cfg.color,
                }}>
                  {cfg.label}: {got}/{total}
                </div>
              );
            })}
          </div>

          {/* Share button */}
          <button onClick={shareProgress} style={{
            marginTop: 16, padding: "8px 20px", borderRadius: 10, border: "1px solid var(--border-card)",
            background: shareAnim ? "rgba(46,204,113,0.1)" : "var(--bg-card)",
            cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
            color: shareAnim ? "#2ecc71" : "var(--text-secondary)", transition: "all 0.2s",
          }}>
            {shareAnim ? "✓ Copied to clipboard!" : "📋 Share My Badges"}
          </button>
        </div>

        {/* Category Filter */}
        <div style={{
          display: "flex", gap: 4, padding: 4, background: "var(--bg-input)",
          borderRadius: 14, marginBottom: 24, border: "1px solid var(--border)",
          overflowX: "auto", WebkitOverflowScrolling: "touch",
        }}>
          {CATEGORIES.map(c => {
            const count = c.id === "all" ? unlockedBadges.length : unlockedBadges.filter(b => b.category === c.id).length;
            return (
              <button key={c.id} onClick={() => setFilter(c.id)} style={{
                flex: "0 0 auto", padding: "8px 14px", borderRadius: 10, border: "none", cursor: "pointer",
                background: filter === c.id ? "var(--bg-card)" : "transparent",
                color: filter === c.id ? "var(--text-primary)" : "var(--text-muted)",
                fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600,
                boxShadow: filter === c.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>
                {c.icon} {c.label} <span style={{ opacity: 0.5 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Badge Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 12,
        }}>
          {filtered.sort((a, b) => {
            const aUnlocked = a.check(stats);
            const bUnlocked = b.check(stats);
            if (aUnlocked && !bUnlocked) return -1;
            if (!aUnlocked && bUnlocked) return 1;
            const rarityOrder = { legendary: 0, epic: 1, rare: 2, common: 3 };
            return rarityOrder[a.rarity] - rarityOrder[b.rarity];
          }).map(badge => {
            const unlocked = badge.check(stats);
            const cfg = RARITY_CONFIG[badge.rarity];
            return (
              <button key={badge.id} onClick={() => setSelectedBadge(badge)}
                style={{
                  padding: "16px 14px", borderRadius: 14, cursor: "pointer",
                  background: unlocked ? cfg.bg : "var(--bg-card)",
                  border: `1.5px solid ${unlocked ? cfg.border : "var(--border-card)"}`,
                  boxShadow: unlocked ? cfg.glow : "none",
                  opacity: unlocked ? 1 : 0.45,
                  textAlign: "center", transition: "all 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                  position: "relative", overflow: "hidden",
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = unlocked ? cfg.glow.replace(")", ", 0 6px 20px rgba(0,0,0,0.15))").replace("0 0", "0 0") : "0 4px 16px rgba(0,0,0,0.1)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = unlocked ? cfg.glow : "none"; }}
              >
                {/* Shimmer for legendary */}
                {unlocked && badge.rarity === "legendary" && (
                  <div style={{
                    position: "absolute", top: 0, left: "-100%", width: "200%", height: "100%",
                    background: "linear-gradient(90deg, transparent 0%, rgba(240,192,64,0.08) 50%, transparent 100%)",
                    animation: "shimmer 3s ease-in-out infinite",
                    pointerEvents: "none",
                  }} />
                )}

                <div style={{ fontSize: 32, marginBottom: 6, position: "relative" }}>
                  {unlocked ? badge.icon : "🔒"}
                </div>
                <div style={{
                  fontSize: 13, fontWeight: 700,
                  color: unlocked ? "var(--text-primary)" : "var(--text-muted)",
                  marginBottom: 3, position: "relative",
                }}>
                  {unlocked ? badge.name : "???"}
                </div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", position: "relative", lineHeight: 1.3 }}>
                  {badge.desc}
                </div>
                {/* Rarity tag */}
                <div style={{
                  marginTop: 8, display: "inline-block", padding: "2px 8px", borderRadius: 6,
                  fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em",
                  color: unlocked ? cfg.color : "var(--text-muted)",
                  background: unlocked ? `${cfg.color}15` : "var(--bg-input)",
                  position: "relative",
                }}>
                  {cfg.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Badge Detail Modal */}
        {selectedBadge && (() => {
          const unlocked = selectedBadge.check(stats);
          const cfg = RARITY_CONFIG[selectedBadge.rarity];
          return (
            <div onClick={() => setSelectedBadge(null)} style={{
              position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 1000, animation: "fadeInModal 0.2s ease",
            }}>
              <div onClick={e => e.stopPropagation()} style={{
                width: 340, background: "var(--bg-card)", borderRadius: 20,
                border: `2px solid ${unlocked ? cfg.border : "var(--border-card)"}`,
                boxShadow: unlocked ? `${cfg.glow}, 0 24px 48px rgba(0,0,0,0.3)` : "0 24px 48px rgba(0,0,0,0.3)",
                padding: "32px 24px", textAlign: "center", position: "relative",
                overflow: "hidden",
              }}>
                {/* Background glow */}
                {unlocked && (
                  <div style={{
                    position: "absolute", top: -40, left: "50%", transform: "translateX(-50%)",
                    width: 200, height: 200, borderRadius: "50%",
                    background: `radial-gradient(circle, ${cfg.color}15 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />
                )}

                <div style={{ fontSize: 56, marginBottom: 12, position: "relative" }}>
                  {unlocked ? selectedBadge.icon : "🔒"}
                </div>

                <div style={{
                  display: "inline-block", padding: "3px 12px", borderRadius: 8, marginBottom: 10,
                  fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                  color: cfg.color, background: `${cfg.color}18`,
                }}>
                  {cfg.label}
                </div>

                <h3 style={{
                  fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700,
                  margin: "0 0 6px", color: "var(--text-primary)",
                  position: "relative",
                }}>
                  {unlocked ? selectedBadge.name : "Locked Badge"}
                </h3>

                <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px", lineHeight: 1.5, position: "relative" }}>
                  {selectedBadge.desc}
                </p>

                <div style={{
                  padding: "12px 16px", borderRadius: 12,
                  background: unlocked ? "rgba(46,204,113,0.08)" : "var(--bg-input)",
                  border: `1px solid ${unlocked ? "rgba(46,204,113,0.2)" : "var(--border)"}`,
                  fontSize: 13, fontWeight: 600,
                  color: unlocked ? "#2ecc71" : "var(--text-muted)",
                }}>
                  {unlocked ? "✓ Unlocked!" : "Keep going — you'll get there!"}
                </div>

                <button onClick={() => setSelectedBadge(null)} style={{
                  marginTop: 16, padding: "8px 24px", borderRadius: 10,
                  border: "1px solid var(--border-card)", background: "var(--bg-card)",
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif",
                }}>Close</button>
              </div>
            </div>
          );
        })()}

        {/* Tip */}
        <div style={{
          marginTop: 28, padding: "16px 20px", borderRadius: 14,
          background: "var(--bg-card)", border: "1px solid var(--border-card)",
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ fontSize: 28 }}>💡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>
              How to unlock more badges
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>
              Complete lessons in the <a href="/learn" style={{ color: "var(--accent)", textDecoration: "none" }}>Academy</a>,
              play <a href="/play" style={{ color: "var(--accent)", textDecoration: "none" }}>Daily Pulse</a>,
              explore <a href="/tools" style={{ color: "var(--accent)", textDecoration: "none" }}>calculators</a>,
              and build your budget in <a href="/dashboard" style={{ color: "var(--accent)", textDecoration: "none" }}>My Finances</a>.
              Some badges are secret — keep exploring!
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-50%); }
          50% { transform: translateX(50%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <Footer />
    </div>
  );
}

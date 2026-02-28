"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function getDayNumber() {
  const start = new Date("2026-02-25");
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

function calculateELO(currentELO, score, gamesPlayed) {
  const K = Math.max(16, 40 - gamesPlayed);
  const actual = score / 1000;
  return Math.round(currentELO + K * (actual - 0.5) * 10);
}

function getRankTier(elo) {
  if (elo >= 1800) return { name: "Grandmaster", color: "#e74c3c", icon: "👑", next: null, threshold: 1800 };
  if (elo >= 1600) return { name: "Master", color: "#f0c040", icon: "⭐", next: "Grandmaster", threshold: 1600 };
  if (elo >= 1400) return { name: "Diamond", color: "#3498db", icon: "💎", next: "Master", threshold: 1400 };
  if (elo >= 1200) return { name: "Platinum", color: "#9b59b6", icon: "🔮", next: "Diamond", threshold: 1200 };
  if (elo >= 1000) return { name: "Gold", color: "#f39c12", icon: "🥇", next: "Platinum", threshold: 1000 };
  if (elo >= 800) return { name: "Silver", color: "#95a5a6", icon: "🥈", next: "Gold", threshold: 800 };
  return { name: "Bronze", color: "#cd7f32", icon: "🥉", next: "Silver", threshold: 600 };
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [friendInput, setFriendInput] = useState("");
  const [dailyScores, setDailyScores] = useState(null);
  const [allTimeRankings, setAllTimeRankings] = useState(null);
  const [friendData, setFriendData] = useState({});
  const [loadingDaily, setLoadingDaily] = useState(false);
  const [loadingAllTime, setLoadingAllTime] = useState(false);
  const dayNum = getDayNumber();

  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem("pulse-stats") || "null");
      if (saved) {
        setStats(saved);
      } else {
        const initial = { username: "", elo: 1000, gamesPlayed: 0, totalScore: 0, bestScore: 0, currentStreak: 0, longestStreak: 0, history: [], friends: [], joinedDay: dayNum };
        setStats(initial);
        localStorage.setItem("pulse-stats", JSON.stringify(initial));
      }
      const todayScores = JSON.parse(localStorage.getItem("pulse-scores") || "[]");
      const todayDay = localStorage.getItem("pulse-day");
      if (todayDay && todayScores.length === 5) {
        const todayTotal = todayScores.reduce((a, b) => a + b, 0);
        const currentStats = JSON.parse(localStorage.getItem("pulse-stats") || "null");
        if (currentStats) {
          const alreadyRecorded = currentStats.history.some(h => h.day === parseInt(todayDay));
          if (!alreadyRecorded) {
            const newELO = calculateELO(currentStats.elo, todayTotal, currentStats.gamesPlayed);
            const yesterday = currentStats.history.length > 0 ? currentStats.history[currentStats.history.length - 1] : null;
            const isConsecutive = yesterday && parseInt(todayDay) - yesterday.day === 1;
            const newStreak = isConsecutive ? currentStats.currentStreak + 1 : 1;
            const updated = { ...currentStats, elo: newELO, gamesPlayed: currentStats.gamesPlayed + 1, totalScore: currentStats.totalScore + todayTotal, bestScore: Math.max(currentStats.bestScore, todayTotal), currentStreak: newStreak, longestStreak: Math.max(currentStats.longestStreak, newStreak), history: [...currentStats.history, { day: parseInt(todayDay), score: todayTotal, elo: newELO }].slice(-90) };
            localStorage.setItem("pulse-stats", JSON.stringify(updated));
            setStats(updated);
          }
        }
      }
      const savedName = localStorage.getItem("pulse-player-name");
      if (savedName) {
        const cs = JSON.parse(localStorage.getItem("pulse-stats") || "null");
        if (cs && !cs.username) { cs.username = savedName; localStorage.setItem("pulse-stats", JSON.stringify(cs)); setStats(prev => prev ? { ...prev, username: savedName } : prev); }
      }
    } catch (e) { console.error("Stats load error:", e); }
  }, [dayNum]);

  const fetchDaily = async () => { if (dailyScores) return; setLoadingDaily(true); try { const r = await fetch("/api/leaderboard?type=daily"); const d = await r.json(); if (d.scores) setDailyScores(d.scores); } catch {} setLoadingDaily(false); };
  const fetchAllTime = async () => { if (allTimeRankings) return; setLoadingAllTime(true); try { const r = await fetch("/api/leaderboard?type=alltime&limit=50"); const d = await r.json(); if (d.rankings) setAllTimeRankings(d.rankings); } catch {} setLoadingAllTime(false); };
  const fetchFriend = async (name) => { try { const r = await fetch(`/api/leaderboard?type=player&name=${encodeURIComponent(name)}`); const d = await r.json(); if (d.history) setFriendData(prev => ({ ...prev, [name]: d.history })); } catch {} };

  useEffect(() => {
    if (tab === "daily") fetchDaily();
    if (tab === "alltime") fetchAllTime();
    if (tab === "friends" && stats?.friends) stats.friends.forEach(f => { if (!friendData[f]) fetchFriend(f); });
  }, [tab]);

  const saveUsername = (name) => { if (!stats) return; const u = { ...stats, username: name.trim().slice(0, 20) }; setStats(u); localStorage.setItem("pulse-stats", JSON.stringify(u)); localStorage.setItem("pulse-player-name", name.trim().slice(0, 20)); };
  const addFriend = () => { if (!stats || !friendInput.trim()) return; const name = friendInput.trim().slice(0, 20); if (stats.friends.includes(name)) return; const u = { ...stats, friends: [...stats.friends, name] }; setStats(u); localStorage.setItem("pulse-stats", JSON.stringify(u)); setFriendInput(""); fetchFriend(name); };
  const removeFriend = (name) => { if (!stats) return; const u = { ...stats, friends: stats.friends.filter(f => f !== name) }; setStats(u); localStorage.setItem("pulse-stats", JSON.stringify(u)); };

  if (!mounted || !stats) return (<div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}><Header /><div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>Loading...</div></div>);

  const rank = getRankTier(stats.elo);
  const avgScore = stats.gamesPlayed > 0 ? Math.round(stats.totalScore / stats.gamesPlayed) : 0;
  const todayScore = stats.history.find(h => h.day === dayNum)?.score || null;
  const chartData = stats.history.slice(-30);
  const maxELO = chartData.length > 0 ? Math.max(...chartData.map(d => d.elo)) : 1200;
  const minELO = chartData.length > 0 ? Math.min(...chartData.map(d => d.elo)) : 800;
  const eloRange = Math.max(maxELO - minELO, 100);

  const RankRow = ({ rank: i, name, value, valueColor, isYou, sub, emoji }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: isYou ? "var(--accent-bg)" : "transparent", borderRadius: 10, border: isYou ? "1px solid var(--accent-border)" : "1px solid transparent", marginBottom: 2 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: i < 3 ? 16 : 12, fontWeight: 700, background: i === 0 ? "#f0c040" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "var(--bg-input)", color: i < 3 ? "#0d0f13" : "var(--text-muted)", fontFamily: "'DM Mono', monospace" }}>
        {i < 3 ? ["🥇","🥈","🥉"][i] : i + 1}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: isYou ? 700 : 500, color: isYou ? "var(--accent)" : "var(--text-primary)" }}>{name} {isYou && <span style={{ fontSize: 11, opacity: 0.7 }}>(you)</span>}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{sub}</div>}
      </div>
      {emoji && <div style={{ fontSize: 14, letterSpacing: 2 }}>{emoji}</div>}
      <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: valueColor || "var(--text-primary)", minWidth: 50, textAlign: "right" }}>{value}</div>
    </div>
  );

  const EmptyState = ({ icon, title, sub }) => (
    <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)" }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 12, color: "var(--text-faint)", marginTop: 4 }}>{sub}</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />
      <main style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* Player Card */}
        <div style={{ background: "var(--bg-card)", borderRadius: 24, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${rank.color}20, transparent 70%)` }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  {stats.username ? (
                    <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{stats.username}</h2>
                  ) : (
                    <input type="text" placeholder="Set your display name" maxLength={20} onKeyDown={e => { if (e.key === "Enter") saveUsername(e.target.value); }} onBlur={e => { if (e.target.value.trim()) saveUsername(e.target.value); }} style={{ background: "var(--bg-input)", border: "1px solid var(--accent-border)", borderRadius: 8, padding: "8px 14px", color: "var(--text-primary)", fontSize: 16, fontFamily: "'DM Sans', sans-serif", outline: "none", width: 200 }} />
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 700, color: rank.color, background: `${rank.color}18`, padding: "3px 10px", borderRadius: 6 }}>{rank.icon} {rank.name}</span>
                  {stats.currentStreak > 0 && <span style={{ fontSize: 12, color: "#e67e22", fontWeight: 600 }}>🔥 {stats.currentStreak} day streak</span>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 36, fontWeight: 900, fontFamily: "'DM Mono', monospace", color: rank.color, letterSpacing: "-0.03em" }}>{stats.elo}</div>
                <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em" }}>ELO Rating</div>
              </div>
            </div>
            {rank.next && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>
                  <span>{rank.icon} {rank.name}</span>
                  <span>{getRankTier(rank.threshold + 200).icon} {rank.next} ({rank.threshold + 200})</span>
                </div>
                <div style={{ height: 8, background: "var(--bg-input)", borderRadius: 4, overflow: "hidden", border: "1px solid var(--border-input)" }}>
                  <div style={{ height: "100%", borderRadius: 4, width: `${Math.min(100, Math.max(0, ((stats.elo - rank.threshold) / 200) * 100))}%`, background: `linear-gradient(90deg, ${rank.color}, ${rank.color}88)`, transition: "width 0.6s" }} />
                </div>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {[{ label: "Games", value: stats.gamesPlayed, color: "var(--text-primary)" }, { label: "Avg Score", value: avgScore, color: "var(--accent)" }, { label: "Best", value: stats.bestScore, color: "#2ecc71" }, { label: "Streak", value: stats.currentStreak > 0 ? `🔥 ${stats.currentStreak}` : "—", color: "#e67e22" }].map((s, i) => (
                <div key={i} style={{ background: "var(--bg-input)", borderRadius: 12, padding: "14px 12px", textAlign: "center", border: "1px solid var(--border-input)" }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "var(--bg-card)", borderRadius: 12, padding: 4, border: "1px solid var(--border-card)" }}>
          {[{ id: "overview", label: "📈 Performance" }, { id: "daily", label: "📊 Today" }, { id: "alltime", label: "🏆 All-Time" }, { id: "friends", label: "👥 Friends" }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, padding: "10px 8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, background: tab === t.id ? "var(--accent-bg)" : "transparent", border: tab === t.id ? "1px solid var(--accent-border)" : "1px solid transparent", color: tab === t.id ? "var(--accent)" : "var(--text-muted)", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>{t.label}</button>
          ))}
        </div>

        {/* ── PERFORMANCE TAB ── */}
        {tab === "overview" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)", padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>ELO Rating Over Time</div>
              {chartData.length > 1 ? (
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "absolute", left: 0, top: 0, bottom: 20, width: 40 }}>
                    <div style={{ fontSize: 10, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>{maxELO}</div>
                    <div style={{ fontSize: 10, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>{minELO}</div>
                  </div>
                  <div style={{ marginLeft: 48 }}>
                    <svg viewBox={`0 0 ${chartData.length * 24} 120`} style={{ width: "100%", height: 120 }}>
                      <line x1="0" y1="0" x2={chartData.length * 24} y2="0" stroke="var(--border-input)" strokeWidth="0.5" />
                      <line x1="0" y1="60" x2={chartData.length * 24} y2="60" stroke="var(--border-input)" strokeWidth="0.5" strokeDasharray="4" />
                      <line x1="0" y1="120" x2={chartData.length * 24} y2="120" stroke="var(--border-input)" strokeWidth="0.5" />
                      <polyline points={chartData.map((d, i) => `${i * 24 + 12},${120 - ((d.elo - minELO) / eloRange) * 110}`).join(" ")} fill="none" stroke={rank.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      <polygon points={`0,120 ${chartData.map((d, i) => `${i * 24 + 12},${120 - ((d.elo - minELO) / eloRange) * 110}`).join(" ")} ${(chartData.length - 1) * 24 + 12},120`} fill={`${rank.color}15`} />
                      {chartData.map((d, i) => (<circle key={i} cx={i * 24 + 12} cy={120 - ((d.elo - minELO) / eloRange) * 110} r="3.5" fill={rank.color} />))}
                    </svg>
                  </div>
                </div>
              ) : (<div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: 14 }}>Play more games to see your ELO chart</div>)}
            </div>
            <div style={{ background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)", padding: "24px", marginBottom: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Recent Games</div>
              {chartData.length > 0 ? [...chartData].reverse().slice(0, 10).map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < Math.min(chartData.length, 10) - 1 ? "1px solid var(--border-input)" : "none" }}>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Day #{h.day}</div>
                  <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: h.score >= 700 ? "#2ecc71" : h.score >= 500 ? "var(--accent)" : "var(--text-secondary)" }}>{h.score}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", minWidth: 60, textAlign: "right" }}>ELO {h.elo}</span>
                  </div>
                </div>
              )) : (<div style={{ textAlign: "center", padding: "20px 0", color: "var(--text-muted)", fontSize: 13 }}>No games played yet</div>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "20px", textAlign: "center" }}><div style={{ fontSize: 28, marginBottom: 4 }}>🔥</div><div style={{ fontSize: 24, fontWeight: 700, color: "#e67e22", fontFamily: "'DM Mono', monospace" }}>{stats.currentStreak}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>Current Streak</div></div>
              <div style={{ background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "20px", textAlign: "center" }}><div style={{ fontSize: 28, marginBottom: 4 }}>⚡</div><div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{stats.longestStreak}</div><div style={{ fontSize: 11, color: "var(--text-muted)" }}>Longest Streak</div></div>
            </div>
          </div>
        )}

        {/* ── TODAY TAB (REAL DATA) ── */}
        {tab === "daily" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)", padding: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Today's Leaderboard</div>
                <div style={{ fontSize: 11, color: "var(--text-faint)" }}>Pulse #{dayNum}</div>
              </div>
              {todayScore === null && (
                <div style={{ background: "var(--accent-bg)", borderRadius: 12, padding: "16px", border: "1px solid var(--accent-border)", textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>You haven't played today yet</div>
                  <a href="/pulse" style={{ display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", borderRadius: 8, padding: "10px 24px", color: "#0d0f13", fontWeight: 700, fontSize: 13, textDecoration: "none" }}>Play Now →</a>
                </div>
              )}
              {loadingDaily && <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: 14 }}>Loading scores...</div>}
              {dailyScores && dailyScores.length === 0 && <EmptyState icon="📊" title="No scores yet today" sub="Be the first — play today's Pulse and submit your score!" />}
              {dailyScores && dailyScores.length > 0 && dailyScores.map((p, i) => (
                <RankRow key={i} rank={i} name={p.display_name} value={p.score} valueColor={p.score >= 800 ? "#2ecc71" : p.score >= 600 ? "var(--accent)" : "var(--text-secondary)"} isYou={stats.username && p.display_name === stats.username} emoji={p.emoji_grid} />
              ))}
              {dailyScores && !loadingDaily && (
                <button onClick={() => { setDailyScores(null); setTimeout(fetchDaily, 50); }} style={{ display: "block", margin: "16px auto 0", padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border-input)", background: "transparent", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>↻ Refresh</button>
              )}
            </div>
          </div>
        )}

        {/* ── ALL-TIME TAB (REAL DATA) ── */}
        {tab === "alltime" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)", padding: "24px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Global ELO Rankings</div>
              {loadingAllTime && <div style={{ textAlign: "center", padding: "30px 0", color: "var(--text-muted)", fontSize: 14 }}>Loading rankings...</div>}
              {allTimeRankings && allTimeRankings.length === 0 && <EmptyState icon="🏆" title="No rankings yet" sub="Play Daily Pulse and submit your score to appear here!" />}
              {allTimeRankings && allTimeRankings.length > 0 && allTimeRankings.map((p, i) => {
                const pRank = getRankTier(p.elo_rating);
                return <RankRow key={i} rank={i} name={`${pRank.icon} ${p.display_name}`} value={p.elo_rating} valueColor={pRank.color} isYou={stats.username && p.display_name === stats.username} />;
              })}
              {allTimeRankings && !loadingAllTime && (
                <button onClick={() => { setAllTimeRankings(null); setTimeout(fetchAllTime, 50); }} style={{ display: "block", margin: "16px auto 0", padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border-input)", background: "transparent", color: "var(--text-muted)", fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>↻ Refresh</button>
              )}
            </div>
          </div>
        )}

        {/* ── FRIENDS TAB (REAL DATA) ── */}
        {tab === "friends" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)", padding: "24px" }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Friends</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                <input type="text" placeholder="Enter a friend's display name" maxLength={20} value={friendInput} onChange={e => setFriendInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") addFriend(); }} style={{ flex: 1, background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10, padding: "10px 14px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                <button onClick={addFriend} style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#0d0f13", fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>Add</button>
              </div>
              <div style={{ background: "var(--bg-input)", borderRadius: 12, padding: "16px", border: "1px solid var(--border-input)", marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Share your display name with friends</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{stats.username || "Set your name above ↑"}</div>
                {stats.username && <button onClick={() => { navigator.clipboard?.writeText(`Add me on Pulsafi's Daily Pulse! My name: ${stats.username} — pulsafi.com/pulse`); }} style={{ marginTop: 8, padding: "6px 14px", borderRadius: 6, border: "1px solid var(--accent-border)", background: "var(--accent-bg)", color: "var(--accent)", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Copy Invite</button>}
              </div>
              {stats.friends.length > 0 ? stats.friends.map((friend, i) => {
                const fHistory = friendData[friend]; const latest = fHistory?.[0]; const fElo = latest?.elo_rating; const fRank = fElo ? getRankTier(fElo) : null;
                const today = new Date().toISOString().split("T")[0]; const fTodayScore = latest?.played_date === today ? latest.score : null;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px", background: "var(--bg-input)", borderRadius: 12, border: "1px solid var(--border-input)", marginBottom: 8 }}>
                    <div style={{ fontSize: 24 }}>{fRank ? fRank.icon : "👤"}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{friend}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{fRank ? `${fRank.name} • ${fHistory.length} game${fHistory.length !== 1 ? "s" : ""}` : fHistory ? "No games yet" : "Loading..."}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      {fElo && <div style={{ fontSize: 18, fontWeight: 700, color: fRank.color, fontFamily: "'DM Mono', monospace" }}>{fElo}</div>}
                      {fTodayScore && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Today: {fTodayScore}</div>}
                    </div>
                    <button onClick={() => removeFriend(friend)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-faint)", fontSize: 16, padding: "4px" }}>×</button>
                  </div>
                );
              }) : <EmptyState icon="👥" title="No friends added yet" sub="Share the game link and add friends by their display name" />}
            </div>
          </div>
        )}

        {!todayScore && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <a href="/pulse" style={{ display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", borderRadius: 12, padding: "14px 32px", color: "#0d0f13", fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(240,192,64,0.3)" }}>Play Today's Pulse →</a>
          </div>
        )}
      </main>
      <style jsx global>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      <Footer />
    </div>
  );
}

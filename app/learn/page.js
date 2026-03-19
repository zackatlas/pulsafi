"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import COURSES from "./courses";

// ─── MASCOT SVG — "Pulsi" the friendly finance buddy ───
function Mascot({ mood = "happy", size = 80, style: s = {} }) {
  const bodyColor = "#f0c040";
  const cheekColor = "#FFB6C1";
  // Eye states
  const happyEyes = true;
  const isWow = mood === "wow";
  const isWrong = mood === "wrong";
  const isThinking = mood === "thinking";

  return (
    <div style={{ width: size, height: size, position: "relative", ...s }}>
      <svg viewBox="0 0 120 120" width={size} height={size}>
        {/* Shadow */}
        <ellipse cx="60" cy="112" rx="30" ry="5" fill="rgba(0,0,0,0.1)" />

        {/* Body - round and friendly */}
        <circle cx="60" cy="58" r="46" fill={bodyColor} />
        <circle cx="60" cy="58" r="43" fill="#F5CF52" />

        {/* Ears - little round ears */}
        <circle cx="28" cy="26" r="12" fill={bodyColor} />
        <circle cx="28" cy="26" r="8" fill="#F5CF52" />
        <circle cx="92" cy="26" r="12" fill={bodyColor} />
        <circle cx="92" cy="26" r="8" fill="#F5CF52" />

        {/* Belly highlight */}
        <ellipse cx="60" cy="68" rx="28" ry="24" fill="#FBE08A" opacity="0.6" />

        {/* Cheeks */}
        <circle cx="34" cy="66" r="8" fill={cheekColor} opacity="0.4" />
        <circle cx="86" cy="66" r="8" fill={cheekColor} opacity="0.4" />

        {/* Eyes */}
        {isWrong ? (
          <>
            <line x1="42" y1="46" x2="52" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="46" x2="42" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="46" x2="78" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="46" x2="68" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : isThinking ? (
          <>
            {/* Thinking - looking up */}
            <circle cx="47" cy="48" r="9" fill="white" />
            <circle cx="73" cy="48" r="9" fill="white" />
            <circle cx="49" cy="45" r="5" fill="#3D2E1C" />
            <circle cx="75" cy="45" r="5" fill="#3D2E1C" />
            <circle cx="50.5" cy="43.5" r="1.8" fill="white" />
            <circle cx="76.5" cy="43.5" r="1.8" fill="white" />
          </>
        ) : (
          <>
            {/* Happy / Wow - big sparkly eyes */}
            <circle cx="47" cy="50" r={isWow ? 11 : 9} fill="white" />
            <circle cx="73" cy="50" r={isWow ? 11 : 9} fill="white" />
            <circle cx="47" cy={isWow ? 49 : 51} r={isWow ? 7 : 5} fill="#3D2E1C" />
            <circle cx="73" cy={isWow ? 49 : 51} r={isWow ? 7 : 5} fill="#3D2E1C" />
            {/* Eye shine */}
            <circle cx="49.5" cy={isWow ? 46 : 48} r="2" fill="white" />
            <circle cx="75.5" cy={isWow ? 46 : 48} r="2" fill="white" />
            {isWow && <>
              <circle cx="44" cy="52" r="1.2" fill="white" />
              <circle cx="70" cy="52" r="1.2" fill="white" />
            </>}
          </>
        )}

        {/* Eyebrows */}
        {isThinking && (
          <>
            <line x1="40" y1="36" x2="54" y2="34" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="66" y1="34" x2="80" y2="36" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        {isWrong && (
          <>
            <line x1="38" y1="38" x2="54" y2="42" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="66" y1="42" x2="82" y2="38" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Nose - tiny dot */}
        <circle cx="60" cy="62" r="2" fill="#D4A017" />

        {/* Mouth */}
        {isWow ? (
          <circle cx="60" cy="72" r="6" fill="#3D2E1C" />
        ) : isWrong ? (
          <path d="M 50 76 Q 60 70 70 76" fill="none" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <path d="M 50 72 Q 60 82 70 72" fill="none" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Arms - little stubby arms */}
        <ellipse cx="18" cy="68" rx="8" ry="5" fill={bodyColor} transform="rotate(-20 18 68)" />
        <ellipse cx="102" cy="68" rx="8" ry="5" fill={bodyColor} transform="rotate(20 102 68)" />
        {isWow && (
          <>
            <ellipse cx="15" cy="58" rx="8" ry="5" fill={bodyColor} transform="rotate(-50 15 58)" />
            <ellipse cx="105" cy="58" rx="8" ry="5" fill={bodyColor} transform="rotate(50 105 58)" />
          </>
        )}

        {/* Feet */}
        <ellipse cx="45" cy="100" rx="10" ry="6" fill={bodyColor} />
        <ellipse cx="75" cy="100" rx="10" ry="6" fill={bodyColor} />

        {/* Small $ on belly */}
        <text x="60" y="78" textAnchor="middle" fontSize="14" fill="#D4A017" fontWeight="bold" fontFamily="monospace" opacity="0.35">$</text>
      </svg>
      {isWow && (
        <>
          <div style={{ position: "absolute", top: 0, right: 2, fontSize: size * 0.2, animation: "popIn 0.3s ease" }}>✨</div>
          <div style={{ position: "absolute", top: 8, left: 0, fontSize: size * 0.15, animation: "popIn 0.4s ease" }}>⭐</div>
        </>
      )}
    </div>
  );
}

// ─── PROGRESS HELPERS ───
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsafi-learn") || "null") || {
      stars: {}, // { "budgeting-0": 3, "budgeting-1": 2 }
      streak: 0,
      longestStreak: 0,
      lastPlayDate: null,
      totalLessonsCompleted: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      xp: 0,
      level: 1,
    };
  } catch { return { stars: {}, streak: 0, longestStreak: 0, lastPlayDate: null, totalLessonsCompleted: 0, totalCorrect: 0, totalAnswered: 0, xp: 0, level: 1 }; }
}

function saveProgress(p) {
  try { localStorage.setItem("pulsafi-learn", JSON.stringify(p)); } catch {}
}

function getLevel(xp) {
  const levels = [0, 100, 250, 500, 800, 1200, 1800, 2500, 3500, 5000, 7000, 10000, 14000, 19000, 25000];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) return { level: i + 1, current: xp - levels[i], needed: (levels[i + 1] || levels[i] + 3000) - levels[i] };
  }
  return { level: 1, current: 0, needed: 100 };
}

// ─── MAIN COMPONENT ───
export default function LearnPathPage() {
  const [progress, setProgress] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // { courseId, lessonIdx }
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [fillInput, setFillInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [lessonCorrect, setLessonCorrect] = useState(0);
  const [lessonTotal, setLessonTotal] = useState(0);
  const [mascotMood, setMascotMood] = useState("happy");
  const [showComplete, setShowComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = loadProgress();
    // Check streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (p.lastPlayDate && p.lastPlayDate !== today && p.lastPlayDate !== yesterday) {
      p.streak = 0; // Streak broken
    }
    setProgress(p);
  }, []);

  const updateProgress = useCallback((updates) => {
    setProgress(prev => {
      const next = { ...prev, ...updates };
      saveProgress(next);
      return next;
    });
  }, []);

  if (!mounted || !progress) return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)" }}>
      <Header /><div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>
    </div>
  );

  const levelInfo = getLevel(progress.xp);

  // ── Lesson logic ──
  const startLesson = (courseId, lessonIdx) => {
    setActiveLesson({ courseId, lessonIdx });
    setQIdx(0);
    setSelected(null);
    setFillInput("");
    setAnswered(false);
    setLessonCorrect(0);
    setLessonTotal(0);
    setMascotMood("happy");
    setShowComplete(false);
  };

  const getCourse = () => COURSES.find(c => c.id === activeLesson?.courseId);
  const getLesson = () => getCourse()?.lessons[activeLesson?.lessonIdx];
  const getQuestion = () => getLesson()?.questions[qIdx];

  const checkAnswer = () => {
    const q = getQuestion();
    if (!q) return;
    let isCorrect = false;
    if (q.type === "choice") isCorrect = selected === q.answer;
    else if (q.type === "tf") isCorrect = selected === q.answer;
    else if (q.type === "fill") isCorrect = q.accept.some(a => fillInput.trim().toLowerCase() === a.toLowerCase());

    setCorrect(isCorrect);
    setAnswered(true);
    setLessonTotal(lessonTotal + 1);
    if (isCorrect) {
      setLessonCorrect(lessonCorrect + 1);
      setMascotMood("wow");
    } else {
      setMascotMood("wrong");
    }
  };

  const nextQuestion = () => {
    const lesson = getLesson();
    if (qIdx + 1 >= lesson.questions.length) {
      // Lesson complete
      const pct = (lessonCorrect + (correct ? 0 : 0)) / lesson.questions.length;
      const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
      const key = `${activeLesson.courseId}-${activeLesson.lessonIdx}`;
      const prevStars = progress.stars[key] || 0;
      const xpGained = stars * 20 + (correct ? 10 : 0);
      const today = new Date().toDateString();
      const isNewDay = progress.lastPlayDate !== today;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const streakContinues = progress.lastPlayDate === yesterday || progress.lastPlayDate === today;
      const newStreak = isNewDay ? (streakContinues ? progress.streak + 1 : 1) : progress.streak;

      updateProgress({
        stars: { ...progress.stars, [key]: Math.max(prevStars, stars) },
        totalLessonsCompleted: progress.totalLessonsCompleted + 1,
        totalCorrect: progress.totalCorrect + lessonCorrect + (correct ? 1 : 0),
        totalAnswered: progress.totalAnswered + lesson.questions.length,
        xp: progress.xp + xpGained,
        streak: newStreak,
        longestStreak: Math.max(progress.longestStreak, newStreak),
        lastPlayDate: today,
      });
      setMascotMood("happy");
      setShowComplete({ stars, xp: xpGained, correct: lessonCorrect + (correct ? 1 : 0), total: lesson.questions.length });
    } else {
      setQIdx(qIdx + 1);
      setSelected(null);
      setFillInput("");
      setAnswered(false);
      setMascotMood("thinking");
    }
  };

  const exitLesson = () => {
    setActiveLesson(null);
    setShowComplete(false);
  };

  // ── Check if lesson is unlocked ──
  const isLessonUnlocked = (courseIdx, lessonIdx) => {
    if (courseIdx === 0 && lessonIdx === 0) return true;
    // Previous lesson in same course
    if (lessonIdx > 0) {
      const key = `${COURSES[courseIdx].id}-${lessonIdx - 1}`;
      return (progress.stars[key] || 0) > 0;
    }
    // First lesson of new course — need at least 1 star on last lesson of previous course
    const prevCourse = COURSES[courseIdx - 1];
    const key = `${prevCourse.id}-${prevCourse.lessons.length - 1}`;
    return (progress.stars[key] || 0) > 0;
  };

  // ═══════════════════════════════
  // LESSON VIEW
  // ═══════════════════════════════
  if (activeLesson && !showComplete) {
    const lesson = getLesson();
    const q = getQuestion();
    if (!lesson || !q) return null;

    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>

        <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 24px 80px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <button onClick={exitLesson} style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>✕</button>
            <div style={{ flex: 1, height: 10, background: "var(--bg-input)", borderRadius: 5, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 5, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                width: `${((qIdx + (answered ? 1 : 0)) / lesson.questions.length) * 100}%`,
                background: `linear-gradient(90deg, ${getCourse().color}, ${getCourse().color}aa)`,
              }} />
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'Inter', monospace", minWidth: 40 }}>
              {qIdx + 1}/{lesson.questions.length}
            </div>
          </div>

          {/* Mascot */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Mascot mood={mascotMood} size={70} />
          </div>

          {/* Question */}
          <div style={{
            background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
            padding: "28px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>
            <h2 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.4, margin: "0 0 20px", textAlign: "center" }}>{q.q}</h2>

            {/* Choice questions */}
            {q.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, i) => {
                  let bg = "var(--bg-input)", border = "var(--border-input)", color = "var(--text-primary)";
                  if (answered) {
                    if (i === q.answer) { bg = "rgba(46,204,113,0.15)"; border = "#2ecc71"; color = "#2ecc71"; }
                    else if (i === selected && i !== q.answer) { bg = "rgba(231,76,60,0.15)"; border = "#e74c3c"; color = "#e74c3c"; }
                  } else if (i === selected) { bg = "var(--accent-bg)"; border = "var(--accent)"; }
                  return (
                    <button key={i} onClick={() => !answered && setSelected(i)} disabled={answered} style={{
                      width: "100%", textAlign: "left", padding: "14px 18px", background: bg,
                      border: `2px solid ${border}`, borderRadius: 12, cursor: answered ? "default" : "pointer",
                      color, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: selected === i || (answered && i === q.answer) ? 600 : 400,
                      transition: "all 0.2s",
                    }}>{opt}</button>
                  );
                })}
              </div>
            )}

            {/* True/False */}
            {q.type === "tf" && (
              <div style={{ display: "flex", gap: 12 }}>
                {[true, false].map(val => {
                  let bg = "var(--bg-input)", border = "var(--border-input)", color = "var(--text-primary)";
                  if (answered) {
                    if (val === q.answer) { bg = "rgba(46,204,113,0.15)"; border = "#2ecc71"; color = "#2ecc71"; }
                    else if (val === selected && val !== q.answer) { bg = "rgba(231,76,60,0.15)"; border = "#e74c3c"; color = "#e74c3c"; }
                  } else if (val === selected) { bg = "var(--accent-bg)"; border = "var(--accent)"; }
                  return (
                    <button key={String(val)} onClick={() => !answered && setSelected(val)} disabled={answered} style={{
                      flex: 1, padding: "16px", textAlign: "center", background: bg,
                      border: `2px solid ${border}`, borderRadius: 12, cursor: answered ? "default" : "pointer",
                      color, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                    }}>{val ? "✓ True" : "✗ False"}</button>
                  );
                })}
              </div>
            )}

            {/* Fill in blank */}
            {q.type === "fill" && (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", background: answered ? (correct ? "rgba(46,204,113,0.1)" : "rgba(231,76,60,0.1)") : "var(--bg-input)",
                  borderRadius: 12, border: `2px solid ${answered ? (correct ? "#2ecc71" : "#e74c3c") : "var(--accent-border)"}`,
                  padding: "12px 20px", minWidth: 240,
                }}>
                  <input
                    type="text" value={fillInput} onChange={e => !answered && setFillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && fillInput.trim() && !answered) checkAnswer(); }}
                    placeholder="Type your answer..."
                    disabled={answered}
                    style={{
                      background: "transparent", border: "none", outline: "none", textAlign: "center",
                      color: answered ? (correct ? "#2ecc71" : "#e74c3c") : "var(--text-primary)",
                      fontSize: 18, fontWeight: 600, fontFamily: "'Inter', monospace", width: "100%",
                    }}
                  />
                </div>
                {answered && !correct && (
                  <div style={{ marginTop: 8, fontSize: 14, color: "#2ecc71", fontWeight: 600 }}>
                    Answer: {q.accept[0]}
                  </div>
                )}
              </div>
            )}

            {/* Explanation */}
            {answered && (
              <div style={{
                marginTop: 16, padding: "14px 16px", borderRadius: 12,
                background: correct ? "rgba(46,204,113,0.08)" : "rgba(231,76,60,0.08)",
                border: `1px solid ${correct ? "#2ecc7133" : "#e74c3c33"}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: correct ? "#2ecc71" : "#e74c3c", marginBottom: 4 }}>
                  {correct ? "✓ Correct!" : "✗ Not quite"}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{q.explain}</div>
              </div>
            )}

            {/* Action Button */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              {!answered ? (
                <button onClick={checkAnswer} disabled={selected === null && !fillInput.trim()} style={{
                  background: (selected !== null || fillInput.trim()) ? "linear-gradient(135deg, var(--accent), var(--accent-dark))" : "var(--bg-input)",
                  border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                  color: (selected !== null || fillInput.trim()) ? "#0d0f13" : "var(--text-faint)",
                  cursor: (selected !== null || fillInput.trim()) ? "pointer" : "default",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                }}>Check</button>
              ) : (
                <button onClick={nextQuestion} style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                  color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>{qIdx + 1 >= getLesson().questions.length ? "Finish" : "Continue"}</button>
              )}
            </div>
          </div>
        </div>
        <style jsx global>{`@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
      </div>
    );
  }

  // ═══════════════════════════════
  // LESSON COMPLETE
  // ═══════════════════════════════
  if (showComplete) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px 80px", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
          <Mascot mood="wow" size={100} style={{ margin: "0 auto 24px" }} />
          <h2 style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px" }}>Lesson Complete!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>{getLesson()?.title} — {getCourse()?.title}</p>

          {/* Stars */}
          <div style={{ fontSize: 48, letterSpacing: 8, marginBottom: 20 }}>
            {[1, 2, 3].map(s => (
              <span key={s} style={{ opacity: s <= showComplete.stars ? 1 : 0.2, transition: "opacity 0.3s", transitionDelay: `${s * 0.2}s` }}>⭐</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28 }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px 24px", border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#2ecc71", fontFamily: "'Inter', monospace" }}>{showComplete.correct}/{showComplete.total}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Correct</div>
            </div>
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px 24px", border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>+{showComplete.xp}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>XP Earned</div>
            </div>
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px 24px", border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#e67e22", fontFamily: "'Inter', monospace" }}>🔥 {progress.streak}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Streak</div>
            </div>
          </div>

          <button onClick={exitLesson} style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            border: "none", borderRadius: 14, padding: "16px 48px", fontSize: 16, fontWeight: 700,
            color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 24px rgba(240,192,64,0.3)",
          }}>Continue Learning →</button>
        </div>
        <style jsx global>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }


  // ═══════════════════════════════
  // COURSE PATH VIEW
  // ═══════════════════════════════
  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
  const maxStars = COURSES.reduce((s, c) => s + c.lessons.length * 3, 0);

  // Find current active node
  let activeKey = null;
  for (let ci = 0; ci < COURSES.length; ci++) {
    for (let li = 0; li < COURSES[ci].lessons.length; li++) {
      const key = `${COURSES[ci].id}-${li}`;
      if (isLessonUnlocked(ci, li) && !(progress.stars[key] > 0)) {
        activeKey = key;
        break;
      }
    }
    if (activeKey) break;
  }

  const pulsiMsg = totalStars === 0 ? "Let's start your journey! 🚀" :
    totalStars <= 12 ? "Great progress! Keep going! 🌟" :
    totalStars <= 36 ? "You're on fire! 🔥" :
    totalStars <= 72 ? "Halfway to mastery! 💪" :
    totalStars < maxStars ? "Almost a finance expert! ✨" : "Finance master! 🏆";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <main style={{ maxWidth: 560, margin: "0 auto", padding: "24px 16px 80px" }}>

        {/* ═══ HERO STATS BAR ═══ */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
          background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)",
          marginBottom: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <Mascot mood={totalStars > 0 ? "wow" : "happy"} size={52} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>Lv.{levelInfo.level}</span>
              <div style={{ flex: 1, height: 8, background: "var(--bg-input)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(levelInfo.current / levelInfo.needed) * 100}%`, background: "linear-gradient(90deg, var(--accent-dark), var(--accent))", borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'Inter', monospace" }}>{levelInfo.current}/{levelInfo.needed} XP</span>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
              <span style={{ color: "#e67e22", fontWeight: 600 }}>🔥 {progress.streak}</span>
              <span style={{ color: "var(--text-muted)" }}>⭐ {totalStars}/{maxStars}</span>
            </div>
          </div>
        </div>

        {/* ═══ PULSI MESSAGE ═══ */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-block", padding: "8px 20px", borderRadius: 20,
            background: "var(--bg-card)", border: "1px solid var(--border-card)",
            fontSize: 14, fontWeight: 600, color: "var(--text-primary)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}>
            {pulsiMsg}
          </div>
        </div>

        {/* ═══ FEATURED ARTICLES ═══ */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, marginBottom: 6 }}>Featured Articles</h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0 }}>Deep dives into the concepts behind the courses. Read at your own pace.</p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <a href="/learn/how-to-build-wealth-in-your-20s" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>How to Build Wealth in Your 20s</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>Start building real wealth in your 20s with a clear, actionable roadmap focused on income, spending, and compound interest.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 12 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/compound-interest-power-starting-early" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>The Power of Compound Interest: Why Starting Early Matters</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>See the exact numbers on how time beats money. The math behind why your 20s are your most valuable financial asset.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 9 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/fire-movement-2026" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>FIRE Movement 2026: What's Changed and What Still Works</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>The Financial Independence playbook needs updating in 2026. Here's the modern approach with higher rates and expensive housing.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 10 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/rent-vs-buy-2026" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>Rent vs Buy in 2026: The Math Behind the Biggest Decision</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>Real math comparing renting vs buying. Calculate the 5-year rule and see which option actually makes sense for you.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 10 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/best-budgeting-method-2026" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>The Best Budgeting Method in 2026</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>Compare zero-based, 50/30/20, envelope, and other systems. Find the method that actually sticks for your life.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 11 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/401k-roth-ira-taxable-brokerage" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>401(k) vs. Roth IRA vs. Taxable Brokerage: Where to Invest First</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>The priority order that maximizes your wealth. Get the optimal sequence of where to put your money for tax efficiency.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 8 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/how-to-start-investing-with-500" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>How to Start Investing with $500</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>A practical guide to starting your investment journey with a modest amount. Learn how to get started and maximize your first investments.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 8 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/how-to-save-for-a-house-2026" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>How to Save for a House in 2026</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>Navigate today's real estate market. A step-by-step plan to build your down payment and prepare for homeownership in 2026.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 10 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/how-to-pay-off-student-loans-fast" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>How to Pay Off Student Loans Fast</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>7 proven strategies to eliminate student debt years faster. Extra payments, refinancing, employer programs, and the real math behind each approach.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 14 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/average-net-worth-by-age-2026" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>Average Net Worth by Age in 2026</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>See where you stand compared to your peers. Average and median net worth benchmarks by decade, plus a realistic catch-up plan.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 12 min read</div>
                </div>
              </div>
            </a>
            <a href="/learn/understanding-tax-brackets-2026" style={{ display: "block", padding: "20px 24px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, textDecoration: "none", color: "inherit", transition: "border-color 0.2s", cursor: "pointer" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>Understanding Tax Brackets in 2026</h3>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 8px", lineHeight: 1.5 }}>How marginal tax rates actually work, the biggest misconception about "moving up a bracket," and strategies to reduce your tax bill.</p>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>📖 11 min read</div>
                </div>
              </div>
            </a>
          </div>

          {/* ─── MORE ARTICLES ─── */}
          <details style={{ marginTop: 16 }}>
            <summary style={{ cursor: "pointer", fontSize: 14, fontWeight: 600, color: "var(--accent)", padding: "12px 0", userSelect: "none" }}>
              View all articles ({'>'}30 deep dives) →
            </summary>
            <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
              {[
                { slug: "best-side-hustles-to-make-money-2026", title: "Best Side Hustles to Make Money in 2026", desc: "Realistic income tiers from $20/hr to $200/hr. Side hustle tax strategy and how to direct earnings toward financial goals.", time: "13 min" },
                { slug: "how-does-the-stock-market-work", title: "How Does the Stock Market Work?", desc: "A complete beginner's guide. Stocks, exchanges, index funds, historical returns, and how to actually buy your first shares.", time: "15 min" },
                { slug: "social-security-benefits-guide-2026", title: "Social Security Benefits Guide 2026", desc: "When to claim, how much you'll get, and the break-even math behind early vs delayed claiming.", time: "12 min" },
                { slug: "how-to-protect-money-from-inflation-2026", title: "How to Protect Your Money from Inflation", desc: "Asset classes ranked by inflation protection. TIPS, I-Bonds, stocks, and portfolio strategies for 2026.", time: "11 min" },
                { slug: "first-time-homebuyer-guide-2026", title: "First-Time Homebuyer Guide 2026", desc: "Step-by-step from pre-approval to closing. FHA, VA, and down payment assistance programs compared.", time: "14 min" },
                { slug: "debt-avalanche-vs-snowball", title: "Debt Avalanche vs Snowball Method", desc: "Which debt payoff strategy saves you more money? The math behind both approaches.", time: "9 min" },
                { slug: "investing-vs-paying-off-debt", title: "Investing vs Paying Off Debt", desc: "When to invest and when to pay off debt first. The break-even interest rate analysis.", time: "10 min" },
                { slug: "how-to-save-for-a-house", title: "How to Save for a House", desc: "Building your down payment fund with the right accounts, timeline, and savings strategies.", time: "10 min" },
                { slug: "what-is-a-good-credit-score", title: "What Is a Good Credit Score?", desc: "Credit score ranges, what lenders look for, and how your score affects loan rates.", time: "8 min" },
                { slug: "real-cost-of-waiting", title: "The Real Cost of Waiting to Invest", desc: "How delaying investing by just 5 years can cost you hundreds of thousands of dollars.", time: "8 min" },
                { slug: "how-to-start-investing-with-100", title: "How to Start Investing with $100", desc: "Fractional shares, micro-investing apps, and building your first portfolio on a small budget.", time: "8 min" },
                { slug: "index-funds-vs-etfs-2026", title: "Index Funds vs ETFs in 2026", desc: "The key differences, tax implications, and which one is right for your situation.", time: "9 min" },
                { slug: "credit-score-explained-how-to-improve", title: "Credit Score Explained: How to Improve It", desc: "The 5 factors that determine your score and actionable steps to raise it fast.", time: "10 min" },
                { slug: "emergency-fund-paycheck-to-paycheck", title: "Building an Emergency Fund Living Paycheck to Paycheck", desc: "How to start saving when there's nothing left. Micro-saving strategies that actually work.", time: "9 min" },
              ].map((article, i) => (
                <a key={i} href={`/learn/${article.slug}`} style={{ display: "block", padding: "16px 20px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, textDecoration: "none", color: "inherit", transition: "border-color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
                >
                  <h3 style={{ fontSize: 14, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 4px", color: "var(--text-primary)" }}>{article.title}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 4px", lineHeight: 1.5 }}>{article.desc}</p>
                  <span style={{ fontSize: 11, color: "var(--text-muted)" }}>📖 {article.time} read</span>
                </a>
              ))}
            </div>
          </details>
        </div>

        {/* ═══ COURSE PATH ═══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {COURSES.map((course, ci) => {
            const courseStars = course.lessons.reduce((s, _, li) => s + (progress.stars[`${course.id}-${li}`] || 0), 0);
            const courseMaxStars = course.lessons.length * 3;
            const courseComplete = courseStars === courseMaxStars;
            const coursePct = Math.round((courseStars / courseMaxStars) * 100);
            const firstLessonUnlocked = isLessonUnlocked(ci, 0);

            // Pulsi motivation data for between courses
            const pulsiTips = [
              { msg: "Great start! Budgeting is the foundation 💪", mood: "happy" },
              { msg: "Saving even a little adds up fast! 🌱", mood: "happy" },
              { msg: "Safety nets = peace of mind 🛡️", mood: "wow" },
              { msg: "Crushing debt is a superpower ⚡", mood: "wow" },
              { msg: "Good credit opens doors 🔑", mood: "happy" },
              { msg: "Make your money work for YOU 📈", mood: "wow" },
              { msg: "Future you will be grateful 🏖️", mood: "happy" },
              { msg: "Tax knowledge saves thousands 🤓", mood: "thinking" },
              { msg: "Knowledge is power — rent or buy 🏠", mood: "happy" },
              { msg: "Protect what you've built 🔒", mood: "thinking" },
              { msg: "More income = more freedom 🚀", mood: "wow" },
            ];
            const isLeft = ci % 2 === 0;
            const tip = ci > 0 ? pulsiTips[(ci - 1) % pulsiTips.length] : null;

            return (
              <div key={course.id} style={{ position: "relative" }}>

                {/* ═══ PULSI MOTIVATION BUBBLE (between courses) ═══ */}
                {ci > 0 && (
                  <div style={{ padding: "12px 0" }}>
                    {/* Connecting line top */}
                    <div style={{
                      width: 3, height: 16, margin: "0 auto",
                      background: firstLessonUnlocked
                        ? `linear-gradient(180deg, ${COURSES[ci - 1].color}55, ${COURSES[ci - 1].color}22)`
                        : "var(--border)",
                      borderRadius: 2,
                    }} />

                    {/* Pulsi + Speech Bubble */}
                    <div style={{
                      display: "flex", alignItems: "center", gap: 10,
                      justifyContent: isLeft ? "flex-start" : "flex-end",
                      padding: "8px 8px",
                      opacity: firstLessonUnlocked ? 1 : 0.35,
                      transition: "opacity 0.3s",
                    }}>
                      {isLeft && <Mascot mood={tip?.mood || "happy"} size={44} />}
                      <div style={{
                        position: "relative",
                        background: "var(--bg-card)", border: "1px solid var(--border-card)",
                        borderRadius: 16, padding: "10px 16px",
                        maxWidth: 220,
                        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                      }}>
                        {/* Speech bubble arrow */}
                        <div style={{
                          position: "absolute", top: "50%", transform: "translateY(-50%)",
                          [isLeft ? "left" : "right"]: -7,
                          width: 0, height: 0,
                          borderTop: "7px solid transparent",
                          borderBottom: "7px solid transparent",
                          [isLeft ? "borderRight" : "borderLeft"]: "7px solid var(--bg-card)",
                        }} />
                        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                          {tip?.msg || "Keep learning!"}
                        </div>
                      </div>
                      {!isLeft && <Mascot mood={tip?.mood || "happy"} size={44} />}
                    </div>

                    {/* Connecting line bottom */}
                    <div style={{
                      width: 3, height: 16, margin: "0 auto",
                      background: firstLessonUnlocked
                        ? `linear-gradient(180deg, ${course.color}22, ${course.color}55)`
                        : "var(--border)",
                      borderRadius: 2,
                    }} />
                  </div>
                )}

                {/* ═══ COURSE HEADER ═══ */}
                <div style={{
                  background: "var(--bg-card)",
                  borderRadius: 20, border: `2px solid ${courseComplete ? course.color + "66" : "var(--border-card)"}`,
                  overflow: "hidden",
                  boxShadow: courseComplete ? `0 4px 24px ${course.color}15` : "0 2px 12px rgba(0,0,0,0.04)",
                  opacity: firstLessonUnlocked ? 1 : 0.5,
                  transition: "all 0.3s",
                }}>

                  {/* Course title bar */}
                  <div style={{
                    padding: "18px 22px 14px",
                    background: `linear-gradient(135deg, ${course.color}10, transparent)`,
                    borderBottom: "1px solid var(--border-card)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 12,
                          background: `linear-gradient(135deg, ${course.color}22, ${course.color}08)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20, border: `1.5px solid ${course.color}33`,
                        }}>
                          {course.icon}
                        </div>
                        <div>
                          <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, fontFamily: "'Playfair Display', serif" }}>{course.title}</h3>
                          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{course.desc}</div>
                        </div>
                      </div>
                      {courseComplete && (
                        <div style={{ fontSize: 11, fontWeight: 700, color: course.color, background: `${course.color}15`, padding: "4px 10px", borderRadius: 8 }}>
                          ✓ Complete
                        </div>
                      )}
                    </div>

                    {/* Course progress bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1, height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{
                          height: "100%", borderRadius: 3, transition: "width 0.5s ease",
                          width: `${coursePct}%`,
                          background: `linear-gradient(90deg, ${course.color}, ${course.color}bb)`,
                        }} />
                      </div>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: "'Inter', monospace", minWidth: 32 }}>
                        {coursePct}%
                      </span>
                    </div>
                  </div>

                  {/* ═══ LESSON NODES ═══ */}
                  <div style={{ padding: "8px 10px 12px" }}>
                    {course.lessons.map((lesson, li) => {
                      const key = `${course.id}-${li}`;
                      const stars = progress.stars[key] || 0;
                      const unlocked = isLessonUnlocked(ci, li);
                      const completed = stars > 0;
                      const isActive = key === activeKey;

                      return (
                        <div key={key}>
                          {/* Connecting stem */}
                          {li > 0 && (
                            <div style={{ display: "flex", justifyContent: "center" }}>
                              <div style={{
                                width: 2, height: 16,
                                background: completed ? course.color + "55" : unlocked ? "var(--border-card)" : "var(--bg-input)",
                                borderRadius: 1,
                              }} />
                            </div>
                          )}

                          {/* Lesson row */}
                          <button
                            onClick={() => unlocked && startLesson(course.id, li)}
                            disabled={!unlocked}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", gap: 14,
                              padding: "12px 14px", borderRadius: 14,
                              background: isActive ? `${course.color}0a` : "transparent",
                              border: isActive ? `2px solid ${course.color}44` : "2px solid transparent",
                              cursor: unlocked ? "pointer" : "default",
                              fontFamily: "'DM Sans', sans-serif", textAlign: "left",
                              transition: "all 0.2s",
                              opacity: unlocked ? 1 : 0.4,
                            }}
                            onMouseOver={e => { if (unlocked) { e.currentTarget.style.background = `${course.color}08`; e.currentTarget.style.borderColor = `${course.color}33`; } }}
                            onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; } else { e.currentTarget.style.background = `${course.color}0a`; e.currentTarget.style.borderColor = `${course.color}44`; } }}
                          >
                            {/* Node circle */}
                            <div style={{
                              width: 48, height: 48, borderRadius: "50%", flexShrink: 0,
                              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                              background: completed
                                ? `linear-gradient(135deg, ${course.color}, ${course.color}cc)`
                                : unlocked ? "var(--bg-input)" : "var(--bg-input)",
                              border: completed ? `3px solid ${course.color}` : isActive ? `3px solid ${course.color}88` : "3px solid var(--border)",
                              boxShadow: isActive ? `0 0 0 4px ${course.color}18, 0 4px 16px ${course.color}20` : completed ? `0 2px 10px ${course.color}25` : "none",
                              transition: "all 0.3s",
                              position: "relative",
                            }}>
                              {isActive && (
                                <div style={{
                                  position: "absolute", inset: -6, borderRadius: "50%",
                                  border: `2px solid ${course.color}44`,
                                  animation: "pulseNode 2s ease-in-out infinite",
                                }} />
                              )}
                              {!unlocked && <span style={{ fontSize: 18, filter: "grayscale(1)" }}>🔒</span>}
                              {unlocked && !completed && <span style={{ fontSize: 18 }}>{course.icon}</span>}
                              {completed && <span style={{ fontSize: 16, color: "#fff" }}>✓</span>}
                            </div>

                            {/* Lesson info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{
                                fontSize: 14, fontWeight: 600,
                                color: unlocked ? "var(--text-primary)" : "var(--text-muted)",
                                marginBottom: 3,
                              }}>
                                {lesson.title}
                              </div>
                              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                {lesson.questions.length} questions
                              </div>
                            </div>

                            {/* Stars / Status */}
                            <div style={{ flexShrink: 0, textAlign: "right" }}>
                              {completed ? (
                                <div style={{ display: "flex", gap: 2 }}>
                                  {[1, 2, 3].map(s => (
                                    <span key={s} style={{ fontSize: 14, opacity: s <= stars ? 1 : 0.2 }}>⭐</span>
                                  ))}
                                </div>
                              ) : isActive ? (
                                <div style={{
                                  fontSize: 11, fontWeight: 700, color: course.color,
                                  background: `${course.color}15`, padding: "4px 10px", borderRadius: 8,
                                }}>
                                  Start →
                                </div>
                              ) : unlocked ? (
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Ready</div>
                              ) : (
                                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Locked</div>
                              )}
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ═══ FINISH LINE ═══ */}
          <div style={{ width: 3, height: 32, margin: "0 auto", background: "var(--border)", borderRadius: 2 }} />
          <div style={{
            textAlign: "center", padding: "28px 24px",
            background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
            opacity: totalStars >= maxStars ? 1 : 0.4,
            boxShadow: totalStars >= maxStars ? "0 0 40px rgba(240,192,64,0.15)" : "none",
            transition: "all 0.3s",
          }}>
            <div style={{ fontSize: 44, marginBottom: 8 }}>🏆</div>
            <div style={{
              fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 4,
              color: totalStars >= maxStars ? "var(--accent)" : "var(--text-muted)",
            }}>
              {totalStars >= maxStars ? "Master of Finance!" : "Complete all courses"}
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              {totalStars >= maxStars
                ? `All ${maxStars} stars earned — you're a financial literacy expert!`
                : `${totalStars}/${maxStars} stars — keep learning to unlock the trophy`}
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes pulseNode {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
      <Footer />
    </div>
  );
}

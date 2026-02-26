"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── QUESTION BANK (60+ questions, rotated daily) ───
const QUESTIONS = [
  // Prices & Costs
  { q: "What is the median home price in the US?", answer: 417000, unit: "$", hint: "Think six figures", category: "Housing" },
  { q: "How much does the average American spend on groceries per month?", answer: 475, unit: "$", hint: "Per person", category: "Spending" },
  { q: "What's the average monthly car payment in the US?", answer: 726, unit: "$", hint: "New car", category: "Auto" },
  { q: "How much does the average wedding cost in the US?", answer: 35000, unit: "$", hint: "It's a lot", category: "Spending" },
  { q: "What's the average annual cost of daycare in the US?", answer: 14760, unit: "$", hint: "Per child", category: "Family" },
  { q: "How much does the average American spend on coffee per year?", answer: 1100, unit: "$", hint: "Daily habit adds up", category: "Spending" },
  { q: "What's the average monthly rent for a 1-bedroom apartment in the US?", answer: 1530, unit: "$", hint: "National average", category: "Housing" },
  { q: "How much does the average American household pay in electricity per month?", answer: 147, unit: "$", hint: "Monthly utility", category: "Spending" },

  // Incomes & Savings
  { q: "What is the median US household income?", answer: 80610, unit: "$", hint: "Before taxes", category: "Income" },
  { q: "What's the average starting salary for a software engineer?", answer: 85000, unit: "$", hint: "Entry level, nationwide", category: "Income" },
  { q: "How much does the average American have in their savings account?", answer: 8000, unit: "$", hint: "Median, not mean", category: "Savings" },
  { q: "What's the average 401(k) balance for Americans aged 30-39?", answer: 50400, unit: "$", hint: "Not enough for most", category: "Retirement" },
  { q: "What's the average Social Security monthly benefit?", answer: 1907, unit: "$", hint: "For retirees", category: "Retirement" },
  { q: "How much does the average American tip at restaurants?", answer: 20, unit: "%", hint: "Post-pandemic norm", category: "Spending" },
  { q: "What percentage of Americans live paycheck to paycheck?", answer: 62, unit: "%", hint: "More than half", category: "Savings" },
  { q: "What's the average annual raise in the US?", answer: 4.5, unit: "%", hint: "Across all industries", category: "Income" },

  // Markets & Rates
  { q: "What's the current average 30-year fixed mortgage rate?", answer: 6.8, unit: "%", hint: "As of early 2026", category: "Rates" },
  { q: "What's the average credit card APR in the US?", answer: 24.7, unit: "%", hint: "It's high", category: "Rates" },
  { q: "What's the current federal funds rate (upper bound)?", answer: 4.5, unit: "%", hint: "Set by the Fed", category: "Rates" },
  { q: "What was the S&P 500's average annual return since 1926?", answer: 10.5, unit: "%", hint: "Including dividends", category: "Markets" },
  { q: "What percentage of actively managed funds underperform the S&P 500 over 15 years?", answer: 92, unit: "%", hint: "Almost all of them", category: "Markets" },
  { q: "What's the historical average annual inflation rate in the US?", answer: 3.3, unit: "%", hint: "Long-term average", category: "Economy" },
  { q: "What was the highest the S&P 500 dropped in a single year?", answer: 38, unit: "%", hint: "Think 2008", category: "Markets" },
  { q: "What's the average annual return of gold over the last 50 years?", answer: 7.8, unit: "%", hint: "Store of value", category: "Markets" },

  // Economy & Stats
  { q: "How much is the US national debt (in trillions)?", answer: 36, unit: "T$", hint: "It's astronomical", category: "Economy" },
  { q: "What's the current US unemployment rate?", answer: 4.1, unit: "%", hint: "Relatively low", category: "Economy" },
  { q: "What percentage of Americans own stocks (directly or via retirement)?", answer: 58, unit: "%", hint: "More than half", category: "Markets" },
  { q: "What's the average American's credit score?", answer: 715, unit: "", hint: "FICO scale", category: "Credit" },
  { q: "How much total student loan debt exists in the US (in trillions)?", answer: 1.77, unit: "T$", hint: "Massive number", category: "Debt" },
  { q: "What's the average student loan balance per borrower?", answer: 37850, unit: "$", hint: "Per person with loans", category: "Debt" },
  { q: "What percentage of millionaires inherited their wealth?", answer: 21, unit: "%", hint: "Most are self-made", category: "Wealth" },
  { q: "What percentage of Americans have less than $1,000 in savings?", answer: 56, unit: "%", hint: "Majority struggle", category: "Savings" },

  // Retirement & Wealth
  { q: "How much does the average American need to retire comfortably?", answer: 1460000, unit: "$", hint: "Depends on lifestyle", category: "Retirement" },
  { q: "At what age does the average American retire?", answer: 62, unit: "", hint: "Before full Social Security", category: "Retirement" },
  { q: "What's the maximum 401(k) contribution for workers under 50?", answer: 23500, unit: "$", hint: "2025 limit", category: "Retirement" },
  { q: "What's the maximum annual Roth IRA contribution (under 50)?", answer: 7000, unit: "$", hint: "2025 limit", category: "Retirement" },
  { q: "What's the average net worth of a 30-year-old American?", answer: 49388, unit: "$", hint: "Median, not mean", category: "Wealth" },
  { q: "What's the median net worth of US households aged 55-64?", answer: 364270, unit: "$", hint: "Peak earning years", category: "Wealth" },
  { q: "What percentage of Americans have a written financial plan?", answer: 28, unit: "%", hint: "Surprisingly low", category: "Savings" },
  { q: "How many years would $1M last in retirement withdrawing $40K/year (4% rule)?", answer: 30, unit: "yrs", hint: "The Trinity Study", category: "Retirement" },

  // Taxes
  { q: "What's the top marginal federal income tax rate?", answer: 37, unit: "%", hint: "For high earners", category: "Taxes" },
  { q: "At what income does the 22% federal tax bracket start (single)?", answer: 47150, unit: "$", hint: "2025 brackets", category: "Taxes" },
  { q: "What percentage of income does the average American pay in total taxes?", answer: 28, unit: "%", hint: "Federal + state + FICA", category: "Taxes" },
  { q: "What's the Social Security tax rate (employee portion)?", answer: 6.2, unit: "%", hint: "Up to the wage base", category: "Taxes" },
  { q: "What's the standard deduction for single filers (2025)?", answer: 15000, unit: "$", hint: "Approximate", category: "Taxes" },

  // Crypto & Tech
  { q: "What year was Bitcoin created?", answer: 2009, unit: "", hint: "By Satoshi Nakamoto", category: "Crypto" },
  { q: "What was Bitcoin's all-time percentage drop from peak during the 2022 bear?", answer: 77, unit: "%", hint: "Brutal drawdown", category: "Crypto" },
  { q: "How many Bitcoin can ever exist (in millions)?", answer: 21, unit: "M", hint: "Hard cap", category: "Crypto" },
  { q: "What percentage of Americans own cryptocurrency?", answer: 21, unit: "%", hint: "Growing rapidly", category: "Crypto" },

  // Business & Entrepreneurship
  { q: "What percentage of small businesses fail within 5 years?", answer: 50, unit: "%", hint: "About half", category: "Business" },
  { q: "What's the average revenue of a sole proprietorship in the US?", answer: 58000, unit: "$", hint: "Most are small", category: "Business" },
  { q: "How much does the average franchise cost to open?", answer: 250000, unit: "$", hint: "Initial investment", category: "Business" },

  // Global
  { q: "What's the median household income globally?", answer: 12700, unit: "$", hint: "Much lower than US", category: "Global" },
  { q: "What percentage of the world's population is unbanked?", answer: 24, unit: "%", hint: "Nearly a quarter", category: "Global" },
  { q: "How much money is in circulation worldwide (in trillions)?", answer: 83, unit: "T$", hint: "Broad money supply", category: "Global" },

  // Insurance & Healthcare
  { q: "What's the average monthly health insurance premium for an individual?", answer: 477, unit: "$", hint: "Employer-sponsored", category: "Insurance" },
  { q: "How much does the average American spend on healthcare per year?", answer: 6700, unit: "$", hint: "Out of pocket + premiums", category: "Healthcare" },
  { q: "What's the average cost of a hospital stay per day in the US?", answer: 2883, unit: "$", hint: "Without insurance", category: "Healthcare" },
];

// ─── SCORING ───
function scoreGuess(guess, answer) {
  if (answer === 0) return guess === 0 ? 200 : 0;
  const pctOff = Math.abs(guess - answer) / Math.abs(answer);
  if (pctOff <= 0.05) return 200;  // Within 5% = perfect
  if (pctOff <= 0.10) return 170;
  if (pctOff <= 0.15) return 140;
  if (pctOff <= 0.25) return 100;
  if (pctOff <= 0.40) return 60;
  if (pctOff <= 0.60) return 30;
  return 10;
}

function scoreEmoji(score) {
  if (score >= 170) return "🟩";
  if (score >= 100) return "🟨";
  if (score >= 60) return "🟧";
  return "🟥";
}

function getAccuracyLabel(score) {
  if (score >= 170) return "Nailed it!";
  if (score >= 100) return "Close!";
  if (score >= 60) return "Decent";
  return "Way off";
}

// ─── DAILY SEED ───
function getDayNumber() {
  const start = new Date("2026-02-25");
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

function seededShuffle(arr, seed) {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getDailyQuestions() {
  const day = getDayNumber();
  const shuffled = seededShuffle(QUESTIONS, day * 7919 + 42);
  return shuffled.slice(0, 5);
}

function formatAnswer(val, unit) {
  if (unit === "$") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: val >= 1000 ? 0 : 2 }).format(val);
  if (unit === "T$") return `$${val}T`;
  if (unit === "M") return `${val}M`;
  if (unit === "%") return `${val}%`;
  if (unit === "yrs") return `${val} years`;
  return `${val.toLocaleString()}`;
}

export default function PulsePage() {
  const [questions] = useState(getDailyQuestions);
  const [currentQ, setCurrentQ] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [scores, setScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const inputRef = useRef(null);
  const dayNum = getDayNumber();

  // Check if already played today
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pulse-day");
      if (saved === String(dayNum)) {
        const savedScores = JSON.parse(localStorage.getItem("pulse-scores") || "[]");
        const savedGuesses = JSON.parse(localStorage.getItem("pulse-guesses") || "[]");
        if (savedScores.length === 5) {
          setScores(savedScores);
          setGuesses(savedGuesses);
          setCurrentQ(5);
          setShowResult(true);
          setHasPlayed(true);
        }
      }
    } catch (e) {}
  }, [dayNum]);

  useEffect(() => { if (inputRef.current && !showResult) inputRef.current.focus(); }, [currentQ, showResult]);

  const submitGuess = () => {
    const num = parseFloat(inputVal);
    if (isNaN(num)) return;

    const q = questions[currentQ];
    const s = scoreGuess(num, q.answer);
    const newScores = [...scores, s];
    const newGuesses = [...guesses, num];
    setScores(newScores);
    setGuesses(newGuesses);
    setRevealed(true);

    if (currentQ === 4) {
      // Save to localStorage
      try {
        localStorage.setItem("pulse-day", String(dayNum));
        localStorage.setItem("pulse-scores", JSON.stringify(newScores));
        localStorage.setItem("pulse-guesses", JSON.stringify(newGuesses));
      } catch (e) {}
    }
  };

  const nextQuestion = () => {
    if (currentQ >= 4) {
      setShowResult(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
    setInputVal("");
    setRevealed(false);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const emojiGrid = scores.map(s => scoreEmoji(s)).join("");
  const shareText = `📊 Daily Pulse #${dayNum}: ${totalScore}/1,000\n${emojiGrid}\npulsafi.com/pulse`;

  const handleShare = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const q = questions[currentQ] || questions[4];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 8, fontWeight: 600 }}>
            Daily Game • Pulse #{dayNum}
          </div>
          <h1 style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            The Daily Pulse
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Guess 5 financial numbers. Closer = more points. Can you beat 800?
          </p>
        </div>

        {/* Progress Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              width: 40, height: 6, borderRadius: 3,
              background: i < scores.length ? scoreEmoji(scores[i]) === "🟩" ? "#2ecc71" : scoreEmoji(scores[i]) === "🟨" ? "#f0c040" : scoreEmoji(scores[i]) === "🟧" ? "#e67e22" : "#e74c3c"
                : i === currentQ && !showResult ? "var(--accent)" : "var(--bg-input)",
              border: i === currentQ && !showResult ? "none" : "1px solid var(--border-input)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>

        {/* ── GAME SCREEN ── */}
        {!showResult && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{
              background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
              padding: "32px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", textAlign: "center",
            }}>
              {/* Category Tag */}
              <div style={{
                display: "inline-block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em",
                fontWeight: 600, color: "var(--accent)", background: "var(--accent-bg)", padding: "4px 10px",
                borderRadius: 6, marginBottom: 16,
              }}>{q.category}</div>

              {/* Question */}
              <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.4, margin: "0 0 6px" }}>
                {q.q}
              </h2>
              <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 24 }}>💡 {q.hint}</div>

              {!revealed ? (
                <>
                  {/* Input */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "var(--bg-input)", borderRadius: 14, border: "2px solid var(--accent-border)",
                    padding: "14px 20px", maxWidth: 280, margin: "0 auto 20px",
                  }}>
                    {(q.unit === "$" || q.unit === "T$") && <span style={{ color: "var(--accent)", fontSize: 20, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>$</span>}
                    <input
                      ref={inputRef}
                      type="text"
                      inputMode="decimal"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") submitGuess(); }}
                      placeholder="Your guess"
                      style={{
                        background: "transparent", border: "none", outline: "none",
                        color: "var(--text-primary)", fontSize: 28, fontFamily: "'DM Mono', monospace",
                        fontWeight: 700, textAlign: "center", width: "100%",
                      }}
                    />
                    {q.unit === "%" && <span style={{ color: "var(--text-muted)", fontSize: 20, fontWeight: 700 }}>%</span>}
                    {q.unit === "T$" && <span style={{ color: "var(--text-muted)", fontSize: 16 }}>T</span>}
                    {q.unit === "M" && <span style={{ color: "var(--text-muted)", fontSize: 16 }}>M</span>}
                    {q.unit === "yrs" && <span style={{ color: "var(--text-muted)", fontSize: 14 }}>yrs</span>}
                  </div>

                  <button onClick={submitGuess} style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                    color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s", boxShadow: "0 4px 16px rgba(240,192,64,0.3)",
                  }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >Lock In</button>
                </>
              ) : (
                /* Revealed Answer */
                <div style={{ animation: "fadeIn 0.4s ease" }}>
                  <div style={{
                    display: "flex", justifyContent: "center", gap: 24, alignItems: "center",
                    marginBottom: 20, flexWrap: "wrap",
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Your Guess</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text-secondary)", fontFamily: "'DM Mono', monospace" }}>
                        {formatAnswer(parseFloat(inputVal), q.unit)}
                      </div>
                    </div>
                    <div style={{ fontSize: 20, color: "var(--text-faint)" }}>→</div>
                    <div>
                      <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Answer</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>
                        {formatAnswer(q.answer, q.unit)}
                      </div>
                    </div>
                  </div>

                  {/* Score Bubble */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: scores[scores.length - 1] >= 170 ? "rgba(46,204,113,0.15)" : scores[scores.length - 1] >= 100 ? "rgba(240,192,64,0.15)" : "rgba(231,76,60,0.15)",
                    borderRadius: 12, padding: "10px 20px", marginBottom: 20,
                  }}>
                    <span style={{ fontSize: 24 }}>{scoreEmoji(scores[scores.length - 1])}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: "var(--text-primary)" }}>
                        +{scores[scores.length - 1]} pts
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{getAccuracyLabel(scores[scores.length - 1])}</div>
                    </div>
                  </div>

                  <br />
                  <button onClick={nextQuestion} style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                    color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s",
                  }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >{currentQ >= 4 ? "See Results →" : "Next Question →"}</button>
                </div>
              )}

              {/* Question Counter */}
              <div style={{ marginTop: 20, fontSize: 12, color: "var(--text-faint)" }}>
                Question {currentQ + 1} of 5
                {scores.length > 0 && <span style={{ marginLeft: 12 }}>Score: {scores.reduce((a, b) => a + b, 0)}/1,000</span>}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS SCREEN ── */}
        {showResult && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{
              background: "var(--bg-card)", borderRadius: 24, border: "1px solid var(--border-card)",
              padding: "36px 28px", boxShadow: "0 12px 48px rgba(0,0,0,0.25)", textAlign: "center",
            }}>
              {/* Big Score */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>
                  {totalScore >= 900 ? "🏆" : totalScore >= 700 ? "🔥" : totalScore >= 500 ? "📊" : "📉"}
                </div>
                <div style={{ fontSize: 56, fontWeight: 900, fontFamily: "'DM Mono', monospace", color: "var(--accent)", letterSpacing: "-0.03em" }}>
                  {totalScore}
                </div>
                <div style={{ fontSize: 16, color: "var(--text-muted)" }}>out of 1,000</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 8 }}>
                  {totalScore >= 900 ? "Financial Genius! 🧠" : totalScore >= 700 ? "Really Impressive!" : totalScore >= 500 ? "Solid Knowledge!" : totalScore >= 300 ? "Getting There!" : "Keep Learning!"}
                </div>
              </div>

              {/* Emoji Grid */}
              <div style={{ fontSize: 36, letterSpacing: 8, marginBottom: 24 }}>
                {emojiGrid}
              </div>

              {/* Question Breakdown */}
              <div style={{ textAlign: "left", marginBottom: 24 }}>
                {questions.map((qq, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                    borderBottom: i < 4 ? "1px solid var(--border-input)" : "none",
                  }}>
                    <div style={{ fontSize: 20 }}>{scoreEmoji(scores[i])}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.4 }}>{qq.q}</div>
                      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>You: <strong style={{ color: "var(--text-primary)" }}>{formatAnswer(guesses[i], qq.unit)}</strong></span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Answer: <strong style={{ color: "var(--accent)" }}>{formatAnswer(qq.answer, qq.unit)}</strong></span>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Mono', monospace" }}>+{scores[i]}</div>
                  </div>
                ))}
              </div>

              {/* Share Buttons */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
                <button onClick={handleShare} style={{
                  padding: "14px 28px", borderRadius: 12, border: "1px solid var(--border-card)",
                  background: "var(--bg-input)", cursor: "pointer", fontSize: 14, fontWeight: 600,
                  color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
                }}>
                  {copied ? "✓ Copied!" : "📋 Copy Score"}
                </button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener" style={{
                  display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: 12, textDecoration: "none",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  fontSize: 14, fontWeight: 700, color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
                }}>Share on X →</a>
              </div>

              {/* Challenge CTA */}
              <div style={{
                background: "var(--bg-input)", borderRadius: 14, padding: "20px", border: "1px solid var(--border-input)",
                marginBottom: 16,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Challenge a friend</div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px" }}>Everyone gets the same 5 questions today. Send them the link and compare scores.</p>
                <button onClick={() => { navigator.clipboard?.writeText("https://pulsafi.com/pulse"); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{
                  padding: "10px 20px", borderRadius: 8, border: "1px solid var(--accent-border)",
                  background: "var(--accent-bg)", cursor: "pointer", fontSize: 12, fontWeight: 600,
                  color: "var(--accent)", fontFamily: "'DM Sans', sans-serif",
                }}>Copy Game Link</button>
              </div>

              {/* Come Back Tomorrow */}
              <div style={{ fontSize: 13, color: "var(--text-faint)", marginTop: 16 }}>
                New questions drop every day at midnight ⏰
              </div>
            </div>

            {/* Plug Tools */}
            <div style={{ marginTop: 24, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Want to improve your score?</div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 14px", lineHeight: 1.6 }}>The best way to know financial numbers is to use them. Try our free tools:</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
                  { name: "Salary Breakdown", href: "/tools/salary-breakdown-calculator", icon: "💰" },
                  { name: "Opportunity Cost", href: "/tools/opportunity-cost-calculator", icon: "⏳" },
                  { name: "Money Personality Quiz", href: "/quiz", icon: "🧠" },
                ].map((t, i) => (
                  <a key={i} href={t.href} style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                    background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)",
                    textDecoration: "none", color: "var(--text-secondary)", fontSize: 12, transition: "border-color 0.2s",
                  }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-input)"}
                  >{t.icon} {t.name}</a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Footer />
    </div>
  );
}

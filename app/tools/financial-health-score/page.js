"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const QUESTIONS = [
  {
    q: "Do you have an emergency fund?",
    options: [
      { text: "6+ months of expenses saved", points: 100 },
      { text: "3-6 months saved", points: 75 },
      { text: "1-3 months saved", points: 40 },
      { text: "Less than 1 month or none", points: 5 },
    ],
    category: "savings",
  },
  {
    q: "What percentage of your income do you save/invest each month?",
    options: [
      { text: "20% or more", points: 100 },
      { text: "10-20%", points: 70 },
      { text: "5-10%", points: 35 },
      { text: "Less than 5% or nothing", points: 5 },
    ],
    category: "savings",
  },
  {
    q: "Do you have any high-interest debt (credit cards, payday loans)?",
    options: [
      { text: "No high-interest debt at all", points: 100 },
      { text: "Some, but I'm actively paying it down", points: 55 },
      { text: "Yes, paying minimums only", points: 20 },
      { text: "Yes, and it's growing", points: 0 },
    ],
    category: "debt",
  },
  {
    q: "Are you contributing to a retirement account (401k, IRA, etc)?",
    options: [
      { text: "Yes, maxing out contributions", points: 100 },
      { text: "Yes, with employer match at minimum", points: 70 },
      { text: "Yes, but less than match", points: 35 },
      { text: "Not contributing at all", points: 5 },
    ],
    category: "retirement",
  },
  {
    q: "Do you have a monthly budget you follow?",
    options: [
      { text: "Yes, I track every dollar", points: 100 },
      { text: "Rough budget, mostly stick to it", points: 65 },
      { text: "I have a vague idea of my spending", points: 25 },
      { text: "No budget at all", points: 5 },
    ],
    category: "planning",
  },
  {
    q: "How's your housing cost relative to your income?",
    options: [
      { text: "Under 25% of take-home pay", points: 100 },
      { text: "25-30% of take-home pay", points: 70 },
      { text: "30-40% of take-home pay", points: 35 },
      { text: "Over 40% of take-home pay", points: 5 },
    ],
    category: "spending",
  },
  {
    q: "Do you have adequate insurance coverage?",
    options: [
      { text: "Health, auto, renters/home, and life/disability", points: 100 },
      { text: "Health and auto covered", points: 60 },
      { text: "Only basic health insurance", points: 25 },
      { text: "Minimal or no insurance", points: 5 },
    ],
    category: "protection",
  },
  {
    q: "How diversified are your investments?",
    options: [
      { text: "Diversified across stocks, bonds, and other assets", points: 100 },
      { text: "Mostly index funds / target-date fund", points: 80 },
      { text: "All in one stock or crypto", points: 25 },
      { text: "I don't invest", points: 5 },
    ],
    category: "investing",
  },
  {
    q: "Do you know your net worth (assets minus debts)?",
    options: [
      { text: "Yes, I track it regularly and it's growing", points: 100 },
      { text: "I have a rough idea", points: 55 },
      { text: "I've calculated it once or twice", points: 25 },
      { text: "No idea", points: 5 },
    ],
    category: "planning",
  },
  {
    q: "How confident do you feel about your financial future?",
    options: [
      { text: "Very confident — I have a clear plan", points: 100 },
      { text: "Somewhat confident — working on it", points: 60 },
      { text: "Uncertain — I know I should do more", points: 25 },
      { text: "Stressed — I avoid thinking about it", points: 5 },
    ],
    category: "planning",
  },
];

function getGrade(score) {
  if (score >= 900) return { grade: "A+", color: "#2ecc71", label: "Exceptional", desc: "You're in the top tier of financial health. Keep doing what you're doing." };
  if (score >= 800) return { grade: "A", color: "#2ecc71", label: "Excellent", desc: "Your finances are in great shape. A few tweaks could make them even stronger." };
  if (score >= 700) return { grade: "B+", color: "#27ae60", label: "Very Good", desc: "You're ahead of most Americans. Focus on the areas below to level up." };
  if (score >= 600) return { grade: "B", color: "#f0c040", label: "Good", desc: "Solid foundation with room to grow. The recommendations below will help most." };
  if (score >= 500) return { grade: "C+", color: "#f39c12", label: "Fair", desc: "You're on the right track but have some gaps. Start with the top priority below." };
  if (score >= 400) return { grade: "C", color: "#e67e22", label: "Needs Work", desc: "There are some important areas to address. The good news: small changes make a big difference." };
  if (score >= 300) return { grade: "D", color: "#e74c3c", label: "At Risk", desc: "Your financial health needs attention. Focus on the basics: emergency fund, debt reduction, and budgeting." };
  return { grade: "F", color: "#c0392b", label: "Critical", desc: "It's time to take action. Start with one thing — build a $1,000 emergency fund — and go from there." };
}

function getRecommendations(answers) {
  const recs = [];
  const cats = {};
  answers.forEach((a, i) => {
    const cat = QUESTIONS[i].category;
    if (!cats[cat]) cats[cat] = [];
    cats[cat].push(a.points);
  });

  const avgCat = {};
  Object.entries(cats).forEach(([k, v]) => { avgCat[k] = v.reduce((a, b) => a + b, 0) / v.length; });

  if (avgCat.savings < 60) recs.push({ icon: "🏦", title: "Build Your Emergency Fund", desc: "Aim for 3-6 months of expenses in a high-yield savings account earning 4%+ APY.", link: "/resources/best-savings-accounts", linkText: "Best Savings Accounts →", priority: 1 });
  if (avgCat.debt < 60) recs.push({ icon: "💳", title: "Tackle High-Interest Debt", desc: "Focus extra payments on your highest-APR debt first (avalanche method) to minimize interest.", link: "/tools/debt-payoff-calculator", linkText: "Debt Payoff Calculator →", priority: 1 });
  if (avgCat.retirement < 60) recs.push({ icon: "🔥", title: "Start Retirement Contributions", desc: "At minimum, contribute enough to get your employer's 401(k) match — it's free money.", link: "/tools/fire-calculator", linkText: "FIRE Calculator →", priority: 2 });
  if (avgCat.investing < 60) recs.push({ icon: "📊", title: "Diversify Your Investments", desc: "A simple 3-fund portfolio (US stocks, international, bonds) beats most active strategies.", link: "/resources/best-brokerages", linkText: "Best Brokerages →", priority: 2 });
  if (avgCat.spending < 60) recs.push({ icon: "🏠", title: "Reduce Housing Costs", desc: "Housing over 30% of income squeezes everything else. Consider refinancing or downsizing.", link: "/tools/mortgage-calculator", linkText: "Mortgage Calculator →", priority: 2 });
  if (avgCat.planning < 50) recs.push({ icon: "📋", title: "Create a Financial Plan", desc: "Know your net worth, set clear goals, and track your progress monthly.", link: "/tools/salary-breakdown-calculator", linkText: "Salary Breakdown →", priority: 3 });
  if (avgCat.protection < 50) recs.push({ icon: "🛡️", title: "Review Your Insurance", desc: "Adequate insurance protects everything you've built. Don't skip renters, life, or disability.", link: "/learn", linkText: "Read Our Guides →", priority: 3 });

  // Always add compound interest if score is decent
  if (recs.length < 3) recs.push({ icon: "📈", title: "Keep Compounding", desc: "You're doing well. See how your current savings grow over time and stay motivated.", link: "/tools/compound-interest-calculator", linkText: "Compound Interest Calculator →", priority: 4 });

  return recs.sort((a, b) => a.priority - b.priority).slice(0, 4);
}

export default function FinancialHealthPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [animating, setAnimating] = useState(false);

  const handleAnswer = (option) => {
    setAnimating(true);
    setTimeout(() => {
      setAnswers([...answers, option]);
      setStep(step + 1);
      setAnimating(false);
    }, 300);
  };

  const score = answers.reduce((s, a) => s + a.points, 0);
  const maxScore = QUESTIONS.length * 100;
  const normalizedScore = Math.round((score / maxScore) * 1000);
  const gradeInfo = getGrade(normalizedScore);
  const recs = answers.length === QUESTIONS.length ? getRecommendations(answers) : [];

  const shareText = `My Financial Health Score: ${normalizedScore}/1,000 (${gradeInfo.grade}) 💰 Check yours free at pulsafi.com/tools/financial-health-score`;

  const restart = () => { setStep(0); setAnswers([]); };

  // Category scores for radar-style breakdown
  const catScores = {};
  if (answers.length === QUESTIONS.length) {
    answers.forEach((a, i) => {
      const cat = QUESTIONS[i].category;
      if (!catScores[cat]) catScores[cat] = { total: 0, count: 0 };
      catScores[cat].total += a.points;
      catScores[cat].count++;
    });
  }
  const catLabels = { savings: "Savings", debt: "Debt", retirement: "Retirement", investing: "Investing", spending: "Spending", protection: "Protection", planning: "Planning" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* ── INTRO ── */}
        {step === 0 && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🩺</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Assessment • 2 Minutes</div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              Financial Health Score
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Answer 10 questions about your savings, debt, investments, and planning. Get a score out of 1,000 with a letter grade and personalized recommendations.
            </p>
            <button onClick={() => setStep(1)} style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700,
              color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 24px rgba(240,192,64,0.3)",
            }}>Check My Score →</button>
            <div style={{ marginTop: 20, fontSize: 12, color: "var(--text-faint)" }}>No signup required • 100% private • Nothing stored</div>
          </div>
        )}

        {/* ── QUESTIONS ── */}
        {step >= 1 && step <= QUESTIONS.length && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Question {step} of {QUESTIONS.length}</span>
                <span style={{ fontSize: 12, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{Math.round((step / QUESTIONS.length) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(step / QUESTIONS.length) * 100}%`, background: "linear-gradient(90deg, var(--accent-dark), var(--accent))", borderRadius: 3, transition: "width 0.5s" }} />
              </div>
            </div>

            <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, lineHeight: 1.35 }}>
              {QUESTIONS[step - 1].q}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {QUESTIONS[step - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={animating} style={{
                  width: "100%", textAlign: "left", padding: "16px 20px",
                  background: "var(--bg-card)", border: "1px solid var(--border-card)",
                  borderRadius: 12, cursor: animating ? "default" : "pointer",
                  color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s", opacity: animating ? 0.6 : 1,
                }}
                  onMouseOver={e => { if (!animating) e.currentTarget.style.borderColor = "var(--accent-border)"; }}
                  onMouseOut={e => { if (!animating) e.currentTarget.style.borderColor = "var(--border-card)"; }}
                >{opt.text}</button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step > QUESTIONS.length && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{
              background: "var(--bg-card)", borderRadius: 24, border: "1px solid var(--border-card)",
              padding: "36px 28px", textAlign: "center", boxShadow: "0 12px 48px rgba(0,0,0,0.25)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${gradeInfo.color}22, transparent 70%)` }} />

              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-faint)", marginBottom: 12 }}>Your Financial Health Score</div>

                {/* Score Circle */}
                <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto 20px" }}>
                  <svg viewBox="0 0 180 180" style={{ width: 180, height: 180, transform: "rotate(-90deg)" }}>
                    <circle cx="90" cy="90" r="78" fill="none" stroke="var(--bg-input)" strokeWidth="12" />
                    <circle cx="90" cy="90" r="78" fill="none" stroke={gradeInfo.color} strokeWidth="12"
                      strokeDasharray={`${(normalizedScore / 1000) * 490} 490`}
                      strokeLinecap="round" style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)" }}
                    />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 44, fontWeight: 900, fontFamily: "'DM Mono', monospace", color: gradeInfo.color, letterSpacing: "-0.03em" }}>{normalizedScore}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>out of 1,000</div>
                  </div>
                </div>

                {/* Grade Badge */}
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `${gradeInfo.color}18`, borderRadius: 12, padding: "8px 20px", marginBottom: 16 }}>
                  <span style={{ fontSize: 28, fontWeight: 900, color: gradeInfo.color, fontFamily: "'DM Mono', monospace" }}>{gradeInfo.grade}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: gradeInfo.color }}>{gradeInfo.label}</span>
                </div>

                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 400, marginLeft: "auto", marginRight: "auto" }}>{gradeInfo.desc}</p>

                {/* Category Breakdown */}
                <div style={{ textAlign: "left", marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Category Breakdown</div>
                  {Object.entries(catScores).map(([cat, data], i) => {
                    const avg = Math.round(data.total / data.count);
                    const barColor = avg >= 70 ? "#2ecc71" : avg >= 40 ? "#f0c040" : "#e74c3c";
                    return (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                          <span style={{ color: "var(--text-secondary)" }}>{catLabels[cat] || cat}</span>
                          <span style={{ color: barColor, fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{avg}/100</span>
                        </div>
                        <div style={{ height: 8, background: "var(--bg-input)", borderRadius: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${avg}%`, background: barColor, borderRadius: 4, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Recommendations */}
                {recs.length > 0 && (
                  <div style={{ textAlign: "left", marginBottom: 24 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>
                      {normalizedScore >= 700 ? "Keep Going" : "Top Priorities"}
                    </div>
                    {recs.map((r, i) => (
                      <div key={i} style={{
                        background: "var(--bg-input)", borderRadius: 14, padding: "16px 18px",
                        border: i === 0 ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                        marginBottom: 8,
                      }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 24 }}>{r.icon}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{r.title}</div>
                            <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 8 }}>{r.desc}</div>
                            <a href={r.link} style={{ color: "var(--accent)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{r.linkText}</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Share */}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 16 }}>
                  <button onClick={() => navigator.clipboard?.writeText(shareText)} style={{
                    padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border-card)",
                    background: "var(--bg-input)", cursor: "pointer", fontSize: 13, fontWeight: 600,
                    color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
                  }}>📋 Copy Score</button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener" style={{
                    display: "inline-flex", alignItems: "center", padding: "12px 24px", borderRadius: 10, textDecoration: "none",
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    fontSize: 13, fontWeight: 700, color: "#0d0f13",
                  }}>Share on X →</a>
                </div>

                <button onClick={restart} style={{
                  padding: "8px 16px", borderRadius: 8, background: "transparent",
                  border: "1px solid var(--border-input)", cursor: "pointer", fontSize: 12,
                  color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
                }}>Retake Assessment</button>
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

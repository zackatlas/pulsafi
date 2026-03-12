"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const QUESTIONS = [
  {
    q: "You find $1,000 on the ground. What do you do?",
    options: [
      { text: "Invest it immediately", type: "builder" },
      { text: "Add it to my emergency fund", type: "guardian" },
      { text: "Treat myself — I deserve it", type: "explorer" },
      { text: "Research the best possible use", type: "strategist" },
    ],
  },
  {
    q: "How do you feel when you check your bank balance?",
    options: [
      { text: "Excited — watching it grow is addictive", type: "builder" },
      { text: "Relieved if it's stable, anxious if it's low", type: "guardian" },
      { text: "I try not to look too often honestly", type: "explorer" },
      { text: "I track every transaction in a spreadsheet", type: "strategist" },
    ],
  },
  {
    q: "Your friend pitches you a business idea. Your reaction?",
    options: [
      { text: "I'm in — what's the minimum to get started?", type: "builder" },
      { text: "Sounds risky. I'd rather stick to index funds.", type: "guardian" },
      { text: "If it sounds fun, I'm interested", type: "explorer" },
      { text: "Send me the business plan and financials", type: "strategist" },
    ],
  },
  {
    q: "What's your biggest financial fear?",
    options: [
      { text: "Missing the next big opportunity", type: "builder" },
      { text: "Running out of money unexpectedly", type: "guardian" },
      { text: "Living a boring life because I was too frugal", type: "explorer" },
      { text: "Making a decision I'll regret in 10 years", type: "strategist" },
    ],
  },
  {
    q: "You get a 15% raise. What happens to the money?",
    options: [
      { text: "Max out retirement contributions + invest the rest", type: "builder" },
      { text: "Bulk up my savings buffer before anything else", type: "guardian" },
      { text: "Upgrade my lifestyle a bit — I earned it", type: "explorer" },
      { text: "Run the numbers on the optimal allocation", type: "strategist" },
    ],
  },
  {
    q: "How do you make big purchases?",
    options: [
      { text: "Fast — if the ROI makes sense, I pull the trigger", type: "builder" },
      { text: "Slowly — I save up and pay cash", type: "guardian" },
      { text: "Impulsively if it feels right, regret later sometimes", type: "explorer" },
      { text: "I compare at least 5 options with a pros/cons list", type: "strategist" },
    ],
  },
  {
    q: "What would financial freedom look like for you?",
    options: [
      { text: "Passive income exceeding my expenses by 3x", type: "builder" },
      { text: "Never worrying about an unexpected bill again", type: "guardian" },
      { text: "Traveling whenever I want without guilt", type: "explorer" },
      { text: "Having a perfect, optimized system that runs itself", type: "strategist" },
    ],
  },
];

const RESULTS = {
  builder: {
    title: "The Builder",
    emoji: "🏗️",
    color: "#f0c040",
    tagline: "You see money as a tool to create wealth",
    desc: "You're wired for growth. While others save, you invest. While others plan, you execute. Your strength is action and compound thinking — you understand that a dollar today is worth more than a dollar tomorrow. Your risk? Moving too fast without a safety net, or chasing returns over stability.",
    strengths: ["Growth mindset", "Action-oriented", "Compound thinker", "Opportunity spotter"],
    watchOuts: ["May underestimate risk", "Can neglect emergency savings", "FOMO on investments"],
    tools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator", icon: "📈" },
      { name: "Investment Comparison", href: "/tools/investment-comparison", icon: "📊" },
      { name: "Crypto Planner", href: "/tools/crypto-planner", icon: "₿" },
    ],
  },
  guardian: {
    title: "The Guardian",
    emoji: "🛡️",
    color: "#4a9eff",
    tagline: "You see money as security and peace of mind",
    desc: "You're the foundation every financial plan needs. While others chase returns, you build a fortress. Your emergency fund is funded, your insurance is current, and you sleep well at night. Your strength is discipline and risk management. Your risk? Being so cautious that inflation quietly erodes your purchasing power.",
    strengths: ["Disciplined saver", "Risk-aware", "Financially stable", "Consistent habits"],
    watchOuts: ["May be too conservative", "Could miss growth opportunities", "Inflation risk from too much cash"],
    tools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
      { name: "Best Savings Accounts", href: "/resources/best-savings-accounts", icon: "🏦" },
    ],
  },
  explorer: {
    title: "The Explorer",
    emoji: "🧭",
    color: "#2ecc71",
    tagline: "You see money as a way to live fully",
    desc: "You understand something most financial advice ignores: money is a means, not an end. You'd rather have amazing experiences than a perfect spreadsheet. Your strength is living intentionally and avoiding the trap of working forever for a number. Your risk? Not building enough structure to sustain the life you love long-term.",
    strengths: ["Values-driven spending", "Present-focused", "Life-first philosophy", "Low material attachment"],
    watchOuts: ["May neglect long-term planning", "Impulse spending spikes", "Needs more structure"],
    tools: [
      { name: "Salary Breakdown", href: "/tools/salary-breakdown-calculator", icon: "💰" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator", icon: "💳" },
      { name: "Opportunity Cost Calculator", href: "/tools/opportunity-cost-calculator", icon: "⏳" },
    ],
  },
  strategist: {
    title: "The Strategist",
    emoji: "♟️",
    color: "#9b59b6",
    tagline: "You see money as a system to optimize",
    desc: "You're the chess player of personal finance. Every dollar has a purpose, every decision is calculated, and you probably have a spreadsheet that would make a CFO jealous. Your strength is optimization and long-term thinking. Your risk? Analysis paralysis — sometimes the best move is the one you actually make.",
    strengths: ["Analytical thinker", "Long-term planner", "Detail-oriented", "Data-driven decisions"],
    watchOuts: ["Analysis paralysis", "May over-optimize small decisions", "Can miss the forest for the trees"],
    tools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator", icon: "🔥" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator", icon: "📈" },
      { name: "Best Brokerages", href: "/resources/best-brokerages", icon: "📊" },
    ],
  },
};

export default function QuizPage() {
  const [step, setStep] = useState(0); // 0 = intro, 1-7 = questions, 8 = results
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, option.type];
      setAnswers(newAnswers);
      if (step >= QUESTIONS.length) {
        // Calculate result
        const counts = { builder: 0, guardian: 0, explorer: 0, strategist: 0 };
        newAnswers.forEach(a => counts[a]++);
        const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        setResult(RESULTS[winner]);
      }
      setStep(step + 1);
      setSelectedOption(null);
      setAnimating(false);
    }, 400);
  };

  const restart = () => { setStep(0); setAnswers([]); setResult(null); setSelectedOption(null); };

  const shareText = result ? `I'm "${result.title}" — ${result.tagline}. Take the free Money Personality Quiz at pulsafi.com/quiz` : "";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "40px 24px 80px", minHeight: "80vh" }}>

        {/* ── INTRO ── */}
        {step === 0 && (
          <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
            <div style={{ fontSize: 64, marginBottom: 20 }}>💰</div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Quiz • 2 Minutes</div>
            <h1 style={{ fontSize: "clamp(30px, 5vw, 48px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
              What's Your Money Personality?
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
              Are you a Builder, Guardian, Explorer, or Strategist? Answer 7 quick questions to discover your financial personality type — plus get personalized tool recommendations.
            </p>
            <button onClick={() => setStep(1)} style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              border: "none", borderRadius: 14, padding: "16px 40px", fontSize: 16, fontWeight: 700,
              color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 4px 24px rgba(240,192,64,0.3)", transition: "transform 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Take the Quiz →
            </button>
            <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 24 }}>
              {Object.values(RESULTS).map((r, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28 }}>{r.emoji}</div>
                  <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 4 }}>{r.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── QUESTIONS ── */}
        {step >= 1 && step <= QUESTIONS.length && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {/* Progress */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Question {step} of {QUESTIONS.length}</span>
                <span style={{ fontSize: 12, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{Math.round((step / QUESTIONS.length) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${(step / QUESTIONS.length) * 100}%`,
                  background: "linear-gradient(90deg, var(--accent-dark), var(--accent))",
                  borderRadius: 3, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                }} />
              </div>
            </div>

            <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 24, lineHeight: 1.35 }}>
              {QUESTIONS[step - 1].q}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {QUESTIONS[step - 1].options.map((opt, i) => (
                <button key={i} onClick={() => handleAnswer(opt)} disabled={animating} style={{
                  width: "100%", textAlign: "left", padding: "18px 22px",
                  background: selectedOption === opt ? "var(--accent-bg)" : "var(--bg-card)",
                  border: selectedOption === opt ? "2px solid var(--accent)" : "1px solid var(--border-card)",
                  borderRadius: 14, cursor: animating ? "default" : "pointer",
                  color: "var(--text-primary)", fontSize: 15, fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s", transform: selectedOption === opt ? "scale(0.98)" : "scale(1)",
                  opacity: animating && selectedOption !== opt ? 0.5 : 1,
                }}
                  onMouseOver={e => { if (!animating) e.currentTarget.style.borderColor = "var(--accent-border)"; }}
                  onMouseOut={e => { if (!animating && selectedOption !== opt) e.currentTarget.style.borderColor = "var(--border-card)"; }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 8, background: "var(--bg-input)", marginRight: 14, fontSize: 13, fontWeight: 600, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {step > QUESTIONS.length && result && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            {/* Result Card */}
            <div style={{
              background: "var(--bg-card)", borderRadius: 24, border: "1px solid var(--border-card)",
              padding: "36px 32px", textAlign: "center", boxShadow: "0 12px 48px rgba(0,0,0,0.25)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Subtle glow */}
              <div style={{
                position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
                width: 300, height: 300, borderRadius: "50%",
                background: `radial-gradient(circle, ${result.color}22 0%, transparent 70%)`,
              }} />

              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 72, marginBottom: 12 }}>{result.emoji}</div>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: result.color, marginBottom: 8, fontWeight: 600 }}>Your Money Personality</div>
                <h2 style={{ fontSize: 36, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>{result.title}</h2>
                <p style={{ fontSize: 16, color: result.color, fontWeight: 500, marginBottom: 20 }}>{result.tagline}</p>
                <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.75, marginBottom: 24, textAlign: "left" }}>{result.desc}</p>

                {/* Strengths & Watch Outs */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24, textAlign: "left" }}>
                  <div style={{ background: "var(--bg-input)", borderRadius: 14, padding: "18px", border: "1px solid var(--border-input)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#2ecc71", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Strengths</div>
                    {result.strengths.map((s, i) => (
                      <div key={i} style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 5, display: "flex", gap: 8 }}>
                        <span style={{ color: "#2ecc71" }}>✓</span> {s}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--bg-input)", borderRadius: 14, padding: "18px", border: "1px solid var(--border-input)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#e67e22", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Watch Out For</div>
                    {result.watchOuts.map((w, i) => (
                      <div key={i} style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 5, display: "flex", gap: 8 }}>
                        <span style={{ color: "#e67e22" }}>!</span> {w}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Tools */}
                <div style={{ textAlign: "left", marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Recommended For You</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {result.tools.map((t, i) => (
                      <a key={i} href={t.href} style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "10px 16px",
                        background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)",
                        textDecoration: "none", color: "var(--text-secondary)", fontSize: 13, fontWeight: 500,
                        transition: "border-color 0.2s",
                      }}
                        onMouseOver={e => e.currentTarget.style.borderColor = result.color}
                        onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-input)"}
                      >{t.icon} {t.name}</a>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
                  <button onClick={() => navigator.clipboard?.writeText(shareText)} style={{
                    padding: "12px 24px", borderRadius: 10, border: "1px solid var(--border-card)",
                    background: "var(--bg-input)", cursor: "pointer", fontSize: 13, fontWeight: 600,
                    color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
                  }}>📋 Copy Result</button>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener" style={{
                    padding: "12px 24px", borderRadius: 10, textDecoration: "none",
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    fontSize: 13, fontWeight: 700, color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
                  }}>Share on X →</a>
                </div>

                {/* Challenge CTA */}
                <div style={{
                  background: `linear-gradient(135deg, ${result.color}15, ${result.color}08)`,
                  borderRadius: 14, padding: "20px", border: `1px solid ${result.color}30`,
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Challenge your friends</div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 12px", lineHeight: 1.5 }}>
                    Send them the quiz and compare personalities. Are you a Builder surrounded by Guardians? Find out.
                  </p>
                  <button onClick={() => navigator.clipboard?.writeText("https://pulsafi.com/quiz")} style={{
                    padding: "10px 20px", borderRadius: 8, border: "none",
                    background: result.color, cursor: "pointer", fontSize: 12, fontWeight: 700,
                    color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
                  }}>Copy Quiz Link</button>
                </div>

                <button onClick={restart} style={{
                  marginTop: 20, padding: "10px 20px", borderRadius: 8, background: "transparent",
                  border: "1px solid var(--border-input)", cursor: "pointer", fontSize: 12,
                  color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
                }}>Take Quiz Again</button>
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

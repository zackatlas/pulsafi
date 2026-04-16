"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TOOLS = [
  { id: "mortgage-calculator", name: "Mortgage Calculator", icon: "🏠", desc: "Calculate monthly mortgage payments including principal, interest, taxes, insurance, and HOA. See amortization schedules and total cost of ownership.", category: "Real Estate", ready: true },
  { id: "compound-interest-calculator", name: "Compound Interest Calculator", icon: "📈", desc: "See how your money grows over time with compound interest. Adjust starting amount, monthly contributions, return rate, and time horizon.", category: "Investing", ready: true },
  { id: "fire-calculator", name: "FIRE Calculator", icon: "🔥", desc: "Find out when you can achieve financial independence and retire early. Factors in current savings, monthly contributions, expenses, and expected returns.", category: "Retirement", ready: true },
  { id: "debt-payoff-calculator", name: "Debt Payoff Calculator", icon: "💳", desc: "Calculate how long it'll take to pay off debt and how much interest you'll pay. Compare avalanche vs snowball strategies.", category: "Debt", ready: true },
  { id: "salary-breakdown-calculator", name: "Salary Breakdown Calculator", icon: "💰", desc: "See your real take-home pay after federal tax, state tax, FICA, 401(k) contributions, and deductions.", category: "Income", ready: true },
  { id: "investment-comparison", name: "Investment Comparison Tool", icon: "📊", desc: "Compare returns across savings accounts, bonds, S&P 500, and growth stocks over any time horizon.", category: "Investing", ready: true },
  { id: "crypto-planner", name: "Crypto Investment Planner", icon: "₿", desc: "Model crypto investment outcomes across conservative, moderate, aggressive, and bear case scenarios with DCA support.", category: "Crypto", ready: true },
  { id: "opportunity-cost-calculator", name: "Opportunity Cost Calculator", icon: "⏳", desc: "See what any purchase would be worth if you invested the money instead. Presets for daily coffee, luxury items, car payments, and more.", category: "Budgeting", ready: true },
  { id: "net-worth-calculator", name: "Net Worth Calculator", icon: "🏦", desc: "Track your total assets minus liabilities to see your true financial picture. Includes categories for investments, property, cash, and debt.", category: "Wealth", ready: true },
  { id: "financial-health-score", name: "Financial Health Score", icon: "❤️", desc: "Get a personalized financial health score based on your savings rate, debt-to-income ratio, emergency fund, and investing habits.", category: "Health", ready: true },
  { id: "rent-vs-buy-calculator", name: "Rent vs Buy Calculator", icon: "🏡", desc: "Compare the true cost of renting vs buying a home. Accounts for appreciation, opportunity cost of your down payment, taxes, maintenance, and more.", category: "Real Estate", ready: true },
  { id: "student-loan-calculator", name: "Student Loan Payoff Calculator", icon: "🎓", desc: "Calculate your student loan payoff timeline. See how extra payments save you thousands in interest. Compare federal vs private loan strategies.", category: "Debt", ready: true },
  { id: "emergency-fund-calculator", name: "Emergency Fund Calculator", icon: "🛟", desc: "Find out exactly how much you need in your emergency fund based on your expenses, job stability, and dependents. Track your progress.", category: "Savings", ready: true },
  { id: "budget-calculator", name: "Budget Calculator", icon: "📋", desc: "Build a personalized budget using 50/30/20, 70/20/10, 80/20, or custom ratios. See where your money goes with visual breakdowns.", category: "Budgeting", ready: true },
];

export default function ToolsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <section style={{ padding: "80px 24px 60px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Financial Tools</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Every Calculator You Need
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Professional-grade financial calculators — free forever, no signup required. From mortgages to retirement to crypto.
        </p>
      </section>

      <script type="application/ld+json">{`{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": [
          ${TOOLS.map((tool, i) => `{
            "@type": "Thing",
            "position": ${i + 1},
            "name": "${tool.name}",
            "description": "${tool.desc}",
            "url": "https://www.pulsafi.com/tools/${tool.id}",
            "category": "${tool.category}"
          }`).join(', ')}
        ]
      }`}</script>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ marginBottom: 32, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--text-secondary)", margin: 0 }}>
            Whether you're buying a home, planning retirement, or managing debt, our suite of financial calculators helps you understand the real numbers behind your decisions. All tools are completely free, require no signup, and work entirely in your browser.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {TOOLS.map((tool, i) => {
            const isPopular = ["mortgage-calculator", "compound-interest-calculator", "fire-calculator"].includes(tool.id);
            return (
              <a key={i} href={tool.ready ? `/tools/${tool.id}` : "/"} style={{
                display: "flex", gap: 20, alignItems: "flex-start",
                background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
                padding: "28px 24px", textDecoration: "none", color: "inherit", transition: "border-color 0.2s",
                position: "relative",
              }}
                onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
              >
                {isPopular && (
                  <span style={{
                    position: "absolute", top: -12, right: 20,
                    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700,
                    color: "#fff", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    padding: "4px 12px", borderRadius: 12,
                  }}>⭐ Popular</span>
                )}
                <div style={{ fontSize: 36, lineHeight: 1 }}>{tool.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <h2 style={{ fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>{tool.name}</h2>
                    <span style={{
                      fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600,
                      color: "var(--accent)", background: "var(--accent-bg)", padding: "3px 8px", borderRadius: 6,
                    }}>{tool.category}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{tool.desc}</p>
                </div>
                <div style={{ color: "var(--accent)", fontSize: 18, alignSelf: "center" }}>→</div>
              </a>
            );
          })}
        </div>

        {/* Embed CTA */}
        <div style={{
          marginTop: 40, background: "linear-gradient(135deg, var(--bg-input) 0%, var(--bg-card) 100%)",
          border: "1px solid var(--border-input)", borderRadius: 18, padding: "32px", textAlign: "center",
        }}>
          <h3 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 8 }}>Want these tools on your website?</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>Embed any Pulsafi calculator with one line of code. Free for everyone.</p>
          <a href="/embed" style={{
            display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", borderRadius: 10,
            padding: "12px 28px", color: "#0d0f13", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, textDecoration: "none",
          }}>Get Embed Code →</a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

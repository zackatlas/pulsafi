// ─── Content tagging for personalization ───
// Each entry tags a piece of content with the onboarding signals it serves.
// Goals map directly to the choices a user makes during onboarding, so content
// surfaces for users whose primary goal matches. Level gates content behind
// beliveable experience tiers (new/some/seasoned).
//
// Stages is optional. It lets us bias content to a life stage when useful
// (e.g. "social-security" matters most for 55+). Empty = always relevant.
//
// If you add a new article or tool, add an entry here so personalization
// doesn't silently skip it.

export const GOALS = {
  "pay-off-debt": { label: "Pay off debt", emoji: "💳" },
  "save-for-house": { label: "Save for a house", emoji: "🏠" },
  "retire-early": { label: "Retire early", emoji: "🔥" },
  "build-wealth": { label: "Build wealth", emoji: "📈" },
  "just-learning": { label: "Just learning", emoji: "📚" },
};

export const LEVELS = {
  new: { label: "New to money stuff", rank: 1 },
  some: { label: "Some experience", rank: 2 },
  seasoned: { label: "Pretty seasoned", rank: 3 },
};

// Article tags — keyed by slug under /learn/
export const ARTICLE_TAGS = {
  "401k-roth-ira-taxable-brokerage": { goals: ["retire-early", "build-wealth"], level: "intermediate" },
  "50-30-20-budget-rule-wrong": { goals: ["pay-off-debt", "just-learning"], level: "beginner" },
  "529-plan-college-savings-guide-2026": { goals: ["build-wealth"], level: "intermediate", stages: ["30-44"] },
  "average-net-worth-by-age-2026": { goals: ["build-wealth", "just-learning"], level: "beginner" },
  "best-budgeting-method-2026": { goals: ["pay-off-debt", "just-learning"], level: "beginner" },
  "best-credit-cards-for-beginners-2026": { goals: ["just-learning"], level: "beginner" },
  "best-high-yield-savings-accounts-2026": { goals: ["save-for-house", "just-learning"], level: "beginner" },
  "best-side-hustles-to-make-money-2026": { goals: ["pay-off-debt", "save-for-house", "build-wealth"], level: "beginner" },
  "compound-interest-power-starting-early": { goals: ["retire-early", "build-wealth", "just-learning"], level: "beginner" },
  "credit-score-explained-how-to-improve": { goals: ["pay-off-debt", "save-for-house", "just-learning"], level: "beginner" },
  "debt-avalanche-vs-snowball": { goals: ["pay-off-debt"], level: "beginner" },
  "emergency-fund-paycheck-to-paycheck": { goals: ["pay-off-debt", "just-learning"], level: "beginner" },
  "fire-movement-2026": { goals: ["retire-early"], level: "intermediate" },
  "first-time-homebuyer-guide-2026": { goals: ["save-for-house"], level: "intermediate" },
  "how-does-the-stock-market-work": { goals: ["build-wealth", "just-learning"], level: "beginner" },
  "how-much-house-can-you-afford": { goals: ["save-for-house"], level: "beginner" },
  "how-much-to-save-for-retirement-by-age": { goals: ["retire-early", "build-wealth"], level: "intermediate" },
  "how-to-build-an-emergency-fund-2026": { goals: ["pay-off-debt", "just-learning"], level: "beginner" },
  "how-to-build-wealth-in-your-20s": { goals: ["build-wealth", "retire-early"], level: "beginner", stages: ["18-29"] },
  "how-to-create-a-financial-plan-2026": { goals: ["build-wealth", "retire-early", "just-learning"], level: "intermediate" },
  "how-to-negotiate-salary-2026": { goals: ["build-wealth", "pay-off-debt"], level: "intermediate" },
  "how-to-pay-off-student-loans-fast": { goals: ["pay-off-debt"], level: "intermediate" },
  "how-to-protect-money-from-inflation-2026": { goals: ["build-wealth", "retire-early"], level: "intermediate" },
  "how-to-save-for-a-house": { goals: ["save-for-house"], level: "beginner" },
  "how-to-save-for-a-house-2026": { goals: ["save-for-house"], level: "beginner" },
  "how-to-start-investing-with-100": { goals: ["build-wealth", "just-learning"], level: "beginner" },
  "how-to-start-investing-with-500": { goals: ["build-wealth", "just-learning"], level: "beginner" },
  "hsa-triple-tax-advantage-guide-2026": { goals: ["retire-early", "build-wealth"], level: "advanced" },
  "index-fund-investing-guide-2026": { goals: ["build-wealth", "retire-early", "just-learning"], level: "beginner" },
  "index-funds-vs-etfs-2026": { goals: ["build-wealth", "just-learning"], level: "intermediate" },
  "investing-vs-paying-off-debt": { goals: ["pay-off-debt", "build-wealth"], level: "intermediate" },
  "passive-income-ideas-2026": { goals: ["retire-early", "build-wealth"], level: "intermediate" },
  "real-cost-of-waiting": { goals: ["retire-early", "build-wealth", "just-learning"], level: "beginner" },
  "rent-vs-buy-2026": { goals: ["save-for-house"], level: "beginner" },
  "roth-conversion-ladder-strategy-2026": { goals: ["retire-early"], level: "advanced" },
  "roth-ira-vs-401k-2026": { goals: ["retire-early", "build-wealth"], level: "intermediate" },
  "social-security-benefits-guide-2026": { goals: ["retire-early"], level: "intermediate", stages: ["45-plus"] },
  "understanding-tax-brackets-2026": { goals: ["build-wealth", "just-learning"], level: "intermediate" },
  "what-is-a-good-credit-score": { goals: ["pay-off-debt", "save-for-house", "just-learning"], level: "beginner" },
};

// Tool tags — keyed by slug under /tools/
export const TOOL_TAGS = {
  "budget-calculator": { goals: ["pay-off-debt", "just-learning"], level: "beginner" },
  "compound-interest-calculator": { goals: ["retire-early", "build-wealth", "just-learning"], level: "beginner" },
  "crypto-planner": { goals: ["build-wealth"], level: "intermediate" },
  "debt-payoff-calculator": { goals: ["pay-off-debt"], level: "beginner" },
  "emergency-fund-calculator": { goals: ["pay-off-debt", "just-learning"], level: "beginner" },
  "financial-health-score": { goals: ["just-learning", "build-wealth"], level: "beginner" },
  "fire-calculator": { goals: ["retire-early"], level: "intermediate" },
  "investment-comparison": { goals: ["build-wealth", "retire-early"], level: "intermediate" },
  "mortgage-calculator": { goals: ["save-for-house"], level: "beginner" },
  "net-worth-calculator": { goals: ["build-wealth", "just-learning"], level: "beginner" },
  "opportunity-cost-calculator": { goals: ["build-wealth", "just-learning"], level: "intermediate" },
  "rent-vs-buy-calculator": { goals: ["save-for-house"], level: "beginner" },
  "salary-breakdown-calculator": { goals: ["just-learning", "build-wealth"], level: "beginner" },
  "student-loan-calculator": { goals: ["pay-off-debt"], level: "beginner" },
  "wage-gap": { goals: ["just-learning"], level: "beginner" },
};

// Human-readable article metadata so the Recommended module can render a card
// without each caller needing to import the article pages themselves.
export const ARTICLE_META = {
  "401k-roth-ira-taxable-brokerage": { title: "401(k) vs Roth IRA vs Taxable Brokerage", summary: "Which account to max out first — and in what order." },
  "50-30-20-budget-rule-wrong": { title: "The 50/30/20 Budget Rule Is Wrong for Most People", summary: "Why the classic budget doesn't work in high cost-of-living cities." },
  "529-plan-college-savings-guide-2026": { title: "529 Plan College Savings Guide", summary: "Tax-advantaged college savings, state by state." },
  "average-net-worth-by-age-2026": { title: "Average Net Worth by Age in 2026", summary: "Where you stand against the median and average." },
  "best-budgeting-method-2026": { title: "The Best Budgeting Method for 2026", summary: "We tested 5 methods. Here's what actually works." },
  "best-credit-cards-for-beginners-2026": { title: "Best Credit Cards for Beginners", summary: "Start your credit journey without fees or traps." },
  "best-high-yield-savings-accounts-2026": { title: "Best High-Yield Savings Accounts", summary: "Where to park emergency cash and earn 4%+ APY." },
  "best-side-hustles-to-make-money-2026": { title: "Best Side Hustles to Make Money in 2026", summary: "Real ways to earn $500-$5,000/month on the side." },
  "compound-interest-power-starting-early": { title: "The Power of Starting Early: Compound Interest", summary: "Why your 20s are worth more than your 40s, mathematically." },
  "credit-score-explained-how-to-improve": { title: "Credit Score Explained (And How to Improve Yours)", summary: "What affects your score and 5 fast ways to lift it." },
  "debt-avalanche-vs-snowball": { title: "Debt Avalanche vs Snowball: Which Wins?", summary: "Math vs psychology. Here's what the data actually says." },
  "emergency-fund-paycheck-to-paycheck": { title: "Building an Emergency Fund When You're Paycheck to Paycheck", summary: "Start with $500. Here's how." },
  "fire-movement-2026": { title: "The FIRE Movement in 2026", summary: "Financial independence, retire early — is it still realistic?" },
  "first-time-homebuyer-guide-2026": { title: "First-Time Homebuyer Guide 2026", summary: "Everything from down payment to closing day." },
  "how-does-the-stock-market-work": { title: "How Does the Stock Market Work?", summary: "Plain-English explainer for people new to investing." },
  "how-much-house-can-you-afford": { title: "How Much House Can You Actually Afford?", summary: "The rule banks use vs. the rule you should use." },
  "how-much-to-save-for-retirement-by-age": { title: "How Much to Save for Retirement by Age", summary: "Benchmarks for 30, 40, 50, and 60." },
  "how-to-build-an-emergency-fund-2026": { title: "How to Build an Emergency Fund in 2026", summary: "3 months, 6 months, or 12? The honest answer." },
  "how-to-build-wealth-in-your-20s": { title: "How to Build Wealth in Your 20s", summary: "The 7 moves that matter most early in your career." },
  "how-to-create-a-financial-plan-2026": { title: "How to Create a Financial Plan", summary: "A step-by-step template you can actually follow." },
  "how-to-negotiate-salary-2026": { title: "How to Negotiate Your Salary", summary: "Scripts and data to get paid what you're worth." },
  "how-to-pay-off-student-loans-fast": { title: "How to Pay Off Student Loans Fast", summary: "7 strategies to crush debt faster than minimums." },
  "how-to-protect-money-from-inflation-2026": { title: "How to Protect Your Money from Inflation", summary: "What actually works when your dollar buys less." },
  "how-to-save-for-a-house": { title: "How to Save for a House", summary: "Down payment strategies that don't take a decade." },
  "how-to-save-for-a-house-2026": { title: "How to Save for a House in 2026", summary: "Updated for current rates, prices, and incentives." },
  "how-to-start-investing-with-100": { title: "How to Start Investing with $100", summary: "Your first investment doesn't need to be big." },
  "how-to-start-investing-with-500": { title: "How to Start Investing with $500", summary: "Where $500 goes furthest — and what to avoid." },
  "hsa-triple-tax-advantage-guide-2026": { title: "The HSA Triple Tax Advantage", summary: "The most underrated retirement account, explained." },
  "index-fund-investing-guide-2026": { title: "The Index Fund Investing Guide", summary: "Why boring funds beat 92% of active managers." },
  "index-funds-vs-etfs-2026": { title: "Index Funds vs ETFs: What's the Difference?", summary: "Same thing? Not quite. Here's when each wins." },
  "investing-vs-paying-off-debt": { title: "Investing vs Paying Off Debt", summary: "The break-even math for high-interest vs low-interest debt." },
  "passive-income-ideas-2026": { title: "Passive Income Ideas That Actually Work", summary: "Real numbers on what pays and what doesn't." },
  "real-cost-of-waiting": { title: "The Real Cost of Waiting to Invest", summary: "One year of delay is worth more than you think." },
  "rent-vs-buy-2026": { title: "Rent vs Buy in 2026", summary: "When buying beats renting — and when it doesn't." },
  "roth-conversion-ladder-strategy-2026": { title: "Roth Conversion Ladder Strategy", summary: "The technique early retirees use to access 401(k)s early." },
  "roth-ira-vs-401k-2026": { title: "Roth IRA vs 401(k): Which Wins?", summary: "Tax-now vs tax-later, depending on your tax bracket." },
  "social-security-benefits-guide-2026": { title: "Social Security Benefits Guide", summary: "When to claim, how much you'll get, what to know." },
  "understanding-tax-brackets-2026": { title: "Understanding Tax Brackets in 2026", summary: "Marginal vs effective rates, explained simply." },
  "what-is-a-good-credit-score": { title: "What Is a Good Credit Score?", summary: "The number lenders actually care about — by score range." },
};

export const TOOL_META = {
  "budget-calculator": { title: "Budget Calculator", summary: "Build a personalized monthly budget." },
  "compound-interest-calculator": { title: "Compound Interest Calculator", summary: "See how small investments grow over decades." },
  "crypto-planner": { title: "Crypto Investment Planner", summary: "Model a crypto strategy with historical returns." },
  "debt-payoff-calculator": { title: "Debt Payoff Calculator", summary: "Compare avalanche vs snowball for your debts." },
  "emergency-fund-calculator": { title: "Emergency Fund Calculator", summary: "How much to save based on your situation." },
  "financial-health-score": { title: "Financial Health Score", summary: "See your overall financial fitness in one number." },
  "fire-calculator": { title: "FIRE Calculator", summary: "When could you retire? Run the numbers." },
  "investment-comparison": { title: "Investment Comparison", summary: "Stocks vs bonds vs savings — compared side by side." },
  "mortgage-calculator": { title: "Mortgage Calculator", summary: "Monthly payment, total interest, and amortization." },
  "net-worth-calculator": { title: "Net Worth Calculator", summary: "Track your assets minus liabilities over time." },
  "opportunity-cost-calculator": { title: "Opportunity Cost Calculator", summary: "What your daily spending is really costing you." },
  "rent-vs-buy-calculator": { title: "Rent vs Buy Calculator", summary: "Full cost comparison with equity and returns." },
  "salary-breakdown-calculator": { title: "Salary Breakdown", summary: "Exactly how much you take home after taxes." },
  "student-loan-calculator": { title: "Student Loan Calculator", summary: "Payoff strategies for your loan balance." },
  "wage-gap": { title: "Living Wage Gap Tool", summary: "See if your state's minimum wage meets living costs." },
};

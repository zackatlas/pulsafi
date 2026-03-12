export default function sitemap() {
  const baseUrl = "https://pulsafi.com";

  const staticPages = [
    // Core pages
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // Tools (high SEO value — these are the money pages)
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools/mortgage-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/compound-interest-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/fire-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/debt-payoff-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/salary-breakdown-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/investment-comparison`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/crypto-planner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/opportunity-cost-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/net-worth-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/financial-health-score`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/rent-vs-buy-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/student-loan-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/emergency-fund-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/tools/budget-calculator`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },

    // Games & Interactive (engagement + shareability)
    { url: `${baseUrl}/play`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/pulse`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/leaderboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/achievements`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },

    // Learn & Resources
    { url: `${baseUrl}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resources`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/resources/best-brokerages`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/resources/best-savings-accounts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Dashboard & User
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/newsletter`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },

    // Glossary (long-tail SEO)
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Info pages
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/embed`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/advertise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Article slugs that actually exist in /learn/ and /resources/
  const articleSlugs = [
    "compound-interest-power-starting-early",
    "how-much-house-can-you-afford",
    "fire-movement-2026",
    "debt-avalanche-vs-snowball",
    "emergency-fund-paycheck-to-paycheck",
    "50-30-20-budget-rule-wrong",
    "401k-roth-ira-taxable-brokerage",
    "index-funds-vs-etfs-2026",
    "real-cost-of-waiting",
    "how-to-start-investing-with-100",
    "how-much-to-save-for-retirement-by-age",
    "best-budgeting-method-2026",
    "credit-score-explained-how-to-improve",
    "investing-vs-paying-off-debt",
    "what-is-a-good-credit-score",
    "how-to-save-for-a-house",
    "rent-vs-buy-2026",
  ];

  // Use /learn/ as canonical for articles
  const articlePages = articleSlugs.map(slug => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Glossary term slugs
  const glossaryTerms = [
    "compound-interest", "apr", "apy", "401k", "roth-ira", "etf", "index-fund",
    "fire", "net-worth", "debt-to-income-ratio", "emergency-fund", "dollar-cost-averaging",
    "amortization", "capital-gains", "diversification", "inflation", "liquidity",
    "mortgage", "principal", "interest-rate", "credit-score", "asset-allocation",
    "bond", "dividend", "expense-ratio", "fico-score", "hsa", "tax-bracket", "yield", "sinking-fund",
    "risk-tolerance", "volatility", "mutual-fund", "bear-market", "bull-market",
    "tax-loss-harvesting", "compound-annual-growth-rate", "down-payment", "refinance",
    "529-plan", "cost-of-living", "passive-income", "dollar-weighted-return",
    "p-e-ratio", "real-estate-investment-trust", "tax-deferred", "w-2",
    "high-yield-savings", "rule-of-72", "budget",
    "backdoor-roth", "basis-point", "blue-chip-stock", "capital-preservation", "cd",
    "closing-costs", "collateral", "consumer-price-index", "cost-basis", "credit-utilization",
    "debt-consolidation", "depreciation", "disability-insurance", "dividend-reinvestment", "earned-income",
    "escrow", "estate-planning", "fdic-insurance", "fiduciary", "fixed-income",
    "flexible-spending-account", "foreclosure", "front-load-back-load", "grace-period", "gross-income",
    "growth-stock", "home-equity", "income-tax", "individual-retirement-account", "interest-only-loan",
    "large-cap-small-cap", "leverage", "life-insurance", "margin", "market-capitalization",
    "minimum-payment", "money-market", "net-income", "overdraft", "pmi",
    "power-of-attorney", "pre-approval", "qualified-dividend", "required-minimum-distribution", "revolving-credit",
    "roth-conversion", "simple-interest", "stock-split", "tax-credit-vs-deduction", "umbrella-insurance",
  ];

  const glossaryPages = glossaryTerms.map(term => ({
    url: `${baseUrl}/glossary/${term}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...articlePages, ...glossaryPages];
}

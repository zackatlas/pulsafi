const stateTaxData = require("./data/stateTaxData");
const cityData = require("./data/cityData");
const { jobSalaryData, stateMultipliers, topCities } = require("./data/jobSalaryData");

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

  // Programmatic salary pages (51 states × 27 salary levels = 1,377 pages)
  const salaryLevels = [25000,30000,35000,40000,45000,50000,55000,60000,65000,70000,75000,80000,85000,90000,95000,100000,110000,120000,130000,140000,150000,175000,200000,250000,300000,400000,500000];
  const states = Object.keys(stateTaxData);
  const salaryPages = [];
  for (const state of states) {
    for (const salary of salaryLevels) {
      salaryPages.push({
        url: `${baseUrl}/salary/${salary}-salary-in-${state}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Programmatic cost-of-living pages (216 cities)
  const citySlugs = Object.keys(cityData);
  const colPages = citySlugs.map(slug => ({
    url: `${baseUrl}/cost-of-living/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Programmatic home affordability pages (51 states × 19 salary levels = 969 pages)
  const affordSalaries = [40000,45000,50000,55000,60000,65000,70000,75000,80000,90000,100000,120000,150000,175000,200000,250000,300000,400000,500000];
  const affordPages = [];
  for (const state of states) {
    for (const salary of affordSalaries) {
      affordPages.push({
        url: `${baseUrl}/afford/${salary}-in-${state}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Programmatic net worth by age pages (ages 22-70 = 49 pages)
  const netWorthPages = [];
  for (let age = 22; age <= 70; age++) {
    netWorthPages.push({
      url: `${baseUrl}/net-worth-by-age/${age}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Programmatic job salary by state pages (157 jobs x 51 states = 8,007 pages)
  const jobSlugs = Object.keys(jobSalaryData);
  const jobSalaryByStatePages = [];
  for (const jobSlug of jobSlugs) {
    for (const stateKey of Object.keys(stateMultipliers)) {
      jobSalaryByStatePages.push({
        url: `${baseUrl}/job-salary/${jobSlug}-salary-in-${stateKey}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Programmatic job salary by city pages (157 jobs x 51 top cities = 8,007 pages)
  const jobSalaryByCityPages = [];
  for (const jobSlug of jobSlugs) {
    for (const citySlug of topCities) {
      jobSalaryByCityPages.push({
        url: `${baseUrl}/city-job-salary/${jobSlug}-salary-in-${citySlug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Programmatic hourly to salary pages (~190 pages)
  const hourlyWhole = [7.25, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200];
  const hourlyHalf = [7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5, 17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5, 24.5, 25.5, 27.5, 30.5, 32.5, 35.5, 37.5, 40.5, 42.5, 45.5, 47.5, 50.5, 55.5, 60.5];
  const allHourlyRates = [...hourlyWhole, ...hourlyHalf];
  const hourlyPages = allHourlyRates.map(rate => {
    const slug = Number.isInteger(rate) ? `${rate}-dollars-an-hour` : `${String(rate).replace('.', '-')}-dollars-an-hour`;
    return {
      url: `${baseUrl}/hourly-to-salary/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticPages, ...articlePages, ...glossaryPages, ...salaryPages, ...colPages, ...affordPages, ...netWorthPages, ...jobSalaryByStatePages, ...jobSalaryByCityPages, ...hourlyPages];
}

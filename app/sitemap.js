const stateTaxData = require("./data/stateTaxData");
const cityData = require("./data/cityData");
const { jobSalaryData, stateMultipliers, topCities } = require("./data/jobSalaryData");

const baseUrl = "https://pulsafi.com";
const URLS_PER_SITEMAP = 40000;

// Pre-compute all city-job-salary URLs count for sitemap splitting
const allJobSlugs = Object.keys(jobSalaryData);
const totalCityJobPages = allJobSlugs.length * topCities.length;
const cityJobSitemapCount = Math.ceil(totalCityJobPages / URLS_PER_SITEMAP);

// Sitemap 0 = everything except city-job-salary
// Sitemaps 1 through N = city-job-salary pages split into chunks
const TOTAL_SITEMAPS = 1 + cityJobSitemapCount;

export async function generateSitemaps() {
  return Array.from({ length: TOTAL_SITEMAPS }, (_, i) => ({ id: i }));
}

export default function sitemap({ id }) {
  // Sitemap 0: all non-city-job-salary pages
  if (id === 0) {
    return getNonCityJobPages();
  }

  // Sitemaps 1+: city-job-salary pages in chunks
  const chunkIndex = id - 1;
  return getCityJobChunk(chunkIndex);
}

function getCityJobChunk(chunkIndex) {
  const allPairs = [];
  for (const jobSlug of allJobSlugs) {
    for (const citySlug of topCities) {
      allPairs.push({ jobSlug, citySlug });
    }
  }

  const start = chunkIndex * URLS_PER_SITEMAP;
  const end = Math.min(start + URLS_PER_SITEMAP, allPairs.length);
  const chunk = allPairs.slice(start, end);

  return chunk.map(({ jobSlug, citySlug }) => ({
    url: `${baseUrl}/city-job-salary/${jobSlug}-salary-in-${citySlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
}

function getNonCityJobPages() {
  const staticPages = [
    // Core pages
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },

    // Salary Explorer
    { url: `${baseUrl}/city-job-salary`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },

    // Tools (high SEO value)
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

    // Games & Interactive
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

    // DTI Hub
    { url: `${baseUrl}/debt-to-income`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Investment Growth Hub
    { url: `${baseUrl}/invest`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },

    // Glossary
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },

    // Info pages
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/embed`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/advertise`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Article slugs
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
    "how-to-build-wealth-in-your-20s",
    "roth-ira-vs-401k-2026",
    "how-to-start-investing-with-500",
    "how-to-save-for-a-house-2026",
    "best-high-yield-savings-accounts-2026",
    "how-to-pay-off-student-loans-fast",
    "average-net-worth-by-age-2026",
    "understanding-tax-brackets-2026",
    "best-side-hustles-to-make-money-2026",
    "how-does-the-stock-market-work",
    "social-security-benefits-guide-2026",
    "how-to-protect-money-from-inflation-2026",
    "first-time-homebuyer-guide-2026",
    "529-plan-college-savings-guide-2026",
    "roth-conversion-ladder-strategy-2026",
    "hsa-triple-tax-advantage-guide-2026",
    "how-to-build-an-emergency-fund-2026",
    "how-to-negotiate-salary-2026",
    "index-fund-investing-guide-2026",
    "best-credit-cards-for-beginners-2026",
    "how-to-create-a-financial-plan-2026",
    "passive-income-ideas-2026",
  ];

  const articlePages = articleSlugs.map(slug => ({
    url: `${baseUrl}/learn/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Glossary terms
  const glossaryTerms = [
    "compound-interest", "apr", "apy", "401k", "roth-ira", "etf", "index-fund",
    "fire", "net-worth", "debt-to-income-ratio", "emergency-fund",
    "dollar-cost-averaging", "amortization", "capital-gains", "diversification",
    "inflation", "liquidity", "mortgage", "principal", "interest-rate",
    "credit-score", "asset-allocation", "bond", "dividend", "expense-ratio",
    "fico-score", "hsa", "tax-bracket", "yield", "sinking-fund",
    "risk-tolerance", "volatility", "mutual-fund", "bear-market", "bull-market",
    "tax-loss-harvesting", "compound-annual-growth-rate", "down-payment",
    "refinance", "529-plan", "cost-of-living", "passive-income",
    "dollar-weighted-return", "p-e-ratio", "real-estate-investment-trust",
    "tax-deferred", "w-2", "high-yield-savings", "rule-of-72", "budget",
    "backdoor-roth", "basis-point", "blue-chip-stock", "capital-preservation",
    "cd", "closing-costs", "collateral", "consumer-price-index", "cost-basis",
    "credit-utilization", "debt-consolidation", "depreciation",
    "disability-insurance", "dividend-reinvestment", "earned-income", "escrow",
    "estate-planning", "fdic-insurance", "fiduciary", "fixed-income",
    "flexible-spending-account", "foreclosure", "front-load-back-load",
    "grace-period", "gross-income", "growth-stock", "home-equity", "income-tax",
    "individual-retirement-account", "interest-only-loan", "large-cap-small-cap",
    "leverage", "life-insurance", "margin", "market-capitalization",
    "minimum-payment", "money-market", "net-income", "overdraft", "pmi",
    "power-of-attorney", "pre-approval", "qualified-dividend",
    "required-minimum-distribution", "revolving-credit", "roth-conversion",
    "simple-interest", "stock-split", "tax-credit-vs-deduction",
    "umbrella-insurance",
  ];

  const glossaryPages = glossaryTerms.map(term => ({
    url: `${baseUrl}/glossary/${term}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  // Salary pages
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

  // Cost-of-living pages
  const citySlugs = Object.keys(cityData);
  const colPages = citySlugs.map(slug => ({
    url: `${baseUrl}/cost-of-living/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Affordability pages
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

  // Net worth by age pages
  const netWorthPages = [];
  for (let age = 22; age <= 70; age++) {
    netWorthPages.push({
      url: `${baseUrl}/net-worth-by-age/${age}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Hourly to Salary pages
  const hourlyRates = [7.25];
  for (let r = 7.50; r <= 100; r += 0.50) { hourlyRates.push(r); }
  const hourlyToSalaryPages = hourlyRates.map(rate => ({
    url: `${baseUrl}/hourly-to-salary/${rate.toFixed(2)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Mortgage pages
  const allStates = [
    "alabama", "alaska", "arizona", "arkansas", "california",
    "colorado", "connecticut", "delaware", "florida", "georgia",
    "hawaii", "idaho", "illinois", "indiana", "iowa",
    "kansas", "kentucky", "louisiana", "maine", "maryland",
    "massachusetts", "michigan", "minnesota", "mississippi", "missouri",
    "montana", "nebraska", "nevada", "new-hampshire", "new-jersey",
    "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio",
    "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina",
    "south-dakota", "tennessee", "texas", "utah", "vermont",
    "virginia", "washington", "west-virginia", "wisconsin", "wyoming",
    "district-of-columbia"
  ];
  const homePrices = [
    100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
    550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000,
    1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000
  ];
  const mortgagePages = [];
  for (const state of allStates) {
    for (const price of homePrices) {
      mortgagePages.push({
        url: `${baseUrl}/mortgage/${state}-${price}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Job Salary by State pages
  const stateKeys = Object.keys(stateMultipliers);
  const jobSalaryPages = [];
  for (const jobSlug of allJobSlugs) {
    for (const stateKey of stateKeys) {
      jobSalaryPages.push({
        url: `${baseUrl}/job-salary/${jobSlug}-salary-in-${stateKey}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Retirement pages
  const retAges = Array.from({ length: 49 }, (_, i) => i + 22);
  const retSalaries = [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const retirementPages = [];
  for (const age of retAges) {
    retirementPages.push({
      url: `${baseUrl}/retirement/age-${age}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const salary of retSalaries) {
      retirementPages.push({
        url: `${baseUrl}/retirement/age-${age}-salary-${salary}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Investment Growth pages
  const invAmounts = [1000, 2500, 5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 500000, 1000000];
  const invPeriods = [1, 3, 5, 10, 15, 20, 25, 30];
  const investPages = [];
  for (const amount of invAmounts) {
    for (const period of invPeriods) {
      investPages.push({
        url: `${baseUrl}/invest/${amount}-over-${period}-years`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Tax Brackets pages
  const taxIncomes = [
    25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
    80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
    175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000
  ];
  const taxBracketsPages = [];
  for (const state of allStates) {
    for (const income of taxIncomes) {
      taxBracketsPages.push({
        url: `${baseUrl}/tax-brackets/${state}-${income}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Emergency Fund pages
  const efExpenses = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 12000, 15000];
  const efSituations = ["single-renter", "single-homeowner", "family-dual-income", "family-single-income", "self-employed", "freelancer"];
  const emergencyFundPages = [];
  for (const expense of efExpenses) {
    emergencyFundPages.push({
      url: `${baseUrl}/emergency-fund/${expense}-per-month`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
    for (const situation of efSituations) {
      emergencyFundPages.push({
        url: `${baseUrl}/emergency-fund/${expense}-${situation}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Emergency Fund by Salary pages
  const efSalaries = [30000, 40000, 50000, 60000, 75000, 80000, 100000, 120000, 150000];
  const efFamilyTypes = ["single", "couple", "family-of-3", "family-of-4", "family-of-5"];
  const emergencyFundSalaryPages = [];
  for (const salary of efSalaries) {
    for (const family of efFamilyTypes) {
      emergencyFundSalaryPages.push({
        url: `${baseUrl}/emergency-fund/${salary}-salary-${family}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Rent vs Buy pages
  const rvbRents = [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000];
  const rvbPrices = [150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 800000, 1000000];
  const rentVsBuyPages = [];
  for (const rent of rvbRents) {
    for (const price of rvbPrices) {
      rentVsBuyPages.push({
        url: `${baseUrl}/rent-vs-buy/rent-${rent}-vs-buy-${price}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Debt-to-Income Ratio pages
  const dtiIncomes = [30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000];
  const dtiDebts = [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
  const dtiPages = [];
  for (const income of dtiIncomes) {
    for (const debt of dtiDebts) {
      dtiPages.push({
        url: `${baseUrl}/debt-to-income/${income}-income-${debt}-debt`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [
    ...staticPages,
    ...articlePages,
    ...glossaryPages,
    ...salaryPages,
    ...colPages,
    ...affordPages,
    ...netWorthPages,
    ...hourlyToSalaryPages,
    ...mortgagePages,
    ...jobSalaryPages,
    ...retirementPages,
    ...investPages,
    ...taxBracketsPages,
    ...emergencyFundPages,
    ...emergencyFundSalaryPages,
    ...rentVsBuyPages,
    ...dtiPages,
  ];
}

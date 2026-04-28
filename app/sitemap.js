const stateTaxData = require("./data/stateTaxData");
const cityData = require("./data/cityData");
const { jobSalaryData, stateMultipliers, topCities } = require("./data/jobSalaryData");
const { blsMetroSalaries } = require("./data/blsSalaryData");
const { ROLLOVER_PAIRS } = require("./data/rolloverProviders");
const { CREDIT_CARD_CATEGORIES } = require("./data/creditCardCategories");
const { ANSWERS } = require("./data/answers");
const { STATS } = require("./data/stats");
const { DAILY_ENTRIES } = require("./data/dailyPulse");
const { DATASETS } = require("./data/researchDatasets");

// Canonical host is www.pulsafi.com — the apex domain 307-redirects to www.
// Using the apex in sitemap URLs caused every entry to show up as a redirect
// in Google Search Console.
const baseUrl = "https://www.pulsafi.com";
const URLS_PER_SITEMAP = 40000;

// Only emit city-job-salary URLs that have real BLS metro data backing them.
// Formula-only pages (multiplier × COL index) collapse into ~150 distinct
// salary buckets across 1,478 cities — Google flags those as soft 404s.
const allJobSlugs = Object.keys(jobSalaryData);
const blsCityJobPairs = [];
for (const citySlug of Object.keys(blsMetroSalaries)) {
  for (const jobSlug of Object.keys(blsMetroSalaries[citySlug] || {})) {
    if (jobSalaryData[jobSlug]) blsCityJobPairs.push({ jobSlug, citySlug });
  }
}
const cityJobSitemapCount = Math.max(1, Math.ceil(blsCityJobPairs.length / URLS_PER_SITEMAP));

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
  const start = chunkIndex * URLS_PER_SITEMAP;
  const end = Math.min(start + URLS_PER_SITEMAP, blsCityJobPairs.length);
  const chunk = blsCityJobPairs.slice(start, end);

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

    // Market Today — server-rendered daily freshness signal
    { url: `${baseUrl}/market-today`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },

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

  // Tax Brackets pages — single (canonical), plus MFJ / MFS / HOH variants
  const taxIncomes = [
    25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
    80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
    175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000
  ];
  const filingSuffixes = ["", "-mfj", "-mfs", "-hoh"];
  const taxBracketsPages = [];
  for (const state of allStates) {
    for (const income of taxIncomes) {
      for (const suffix of filingSuffixes) {
        taxBracketsPages.push({
          url: `${baseUrl}/tax-brackets/${state}-${income}${suffix}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: suffix === "" ? 0.7 : 0.6,
        });
      }
    }
  }

  // Emergency Fund by Salary pages
  // NOTE: We previously also emitted `${expense}-per-month` and
  // `${expense}-${situation}` slug patterns, but app/emergency-fund/[slug]
  // only parses the `${salary}-salary-${family}` pattern. Those extra URLs
  // returned soft 404s and wasted crawl budget, so they've been removed.
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

  // Best Mortgage Rates by State — high-CPC commercial-intent inventory
  const bestMortgageRatesPages = allStates.map(state => ({
    url: `${baseUrl}/best-mortgage-rates/${state}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Refinance Calculator by State — break-even tool, high-CPC commercial-intent
  const refinanceCalcPages = allStates.map(state => ({
    url: `${baseUrl}/refinance-calculator/${state}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // First-Time Homebuyer programs by state — DPA, income limits, HFA programs
  const firstTimeHomebuyerPages = allStates.map(state => ({
    url: `${baseUrl}/first-time-homebuyer/${state}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Best HYSA by state — pairs with savings affiliate, state-tax-on-interest framing
  const bestSavingsPages = allStates.map(state => ({
    url: `${baseUrl}/best-savings-account/${state}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // HELOC rates by state — high-CPC home equity inventory
  const helocRatesPages = allStates.map(state => ({
    url: `${baseUrl}/heloc-rates/${state}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 401k rollover provider pairs — highest-payout affiliate inventory
  const rolloverPages = ROLLOVER_PAIRS.map(([from, to]) => ({
    url: `${baseUrl}/401k-rollover/${from}-to-${to}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Best credit cards by category — highest CPC affiliate inventory
  const creditCardPages = Object.keys(CREDIT_CARD_CATEGORIES).map(category => ({
    url: `${baseUrl}/best-credit-cards/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // CD rates by state — pairs with savings affiliate, T-bill comparison framing
  const cdRatesPages = allStates.map(state => ({
    url: `${baseUrl}/cd-rates/${state}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // City × city cost-of-living comparisons — moving / relocation queries
  const COL_VS_PAIRS = [
    ["san-francisco-ca","austin-tx"],["san-francisco-ca","miami-fl"],
    ["san-francisco-ca","denver-co"],["san-francisco-ca","seattle-wa"],
    ["san-francisco-ca","phoenix-az"],["san-francisco-ca","los-angeles-ca"],
    ["new-york-ny","miami-fl"],["new-york-ny","austin-tx"],
    ["new-york-ny","tampa-fl"],["new-york-ny","denver-co"],
    ["new-york-ny","nashville-tn"],["new-york-ny","atlanta-ga"],
    ["los-angeles-ca","austin-tx"],["los-angeles-ca","phoenix-az"],
    ["los-angeles-ca","las-vegas-nv"],["los-angeles-ca","san-diego-ca"],
    ["los-angeles-ca","miami-fl"],["los-angeles-ca","nashville-tn"],
    ["austin-tx","dallas-tx"],["austin-tx","houston-tx"],
    ["austin-tx","denver-co"],["austin-tx","nashville-tn"],
    ["dallas-tx","houston-tx"],["dallas-tx","phoenix-az"],
    ["dallas-tx","atlanta-ga"],
    ["seattle-wa","portland-or"],["seattle-wa","denver-co"],
    ["seattle-wa","boise-id"],["seattle-wa","austin-tx"],
    ["denver-co","phoenix-az"],["denver-co","salt-lake-city-ut"],
    ["portland-or","seattle-wa"],["portland-or","boise-id"],
    ["miami-fl","tampa-fl"],["miami-fl","orlando-fl"],
    ["miami-fl","jacksonville-fl"],["tampa-fl","orlando-fl"],
    ["atlanta-ga","nashville-tn"],["atlanta-ga","charlotte-nc"],
    ["charlotte-nc","raleigh-nc"],["charlotte-nc","atlanta-ga"],
    ["chicago-il","indianapolis-in"],["chicago-il","milwaukee-wi"],
    ["chicago-il","minneapolis-mn"],["chicago-il","austin-tx"],
    ["boston-ma","new-york-ny"],["boston-ma","providence-ri"],
    ["san-jose-ca","san-francisco-ca"],["san-jose-ca","austin-tx"],
    ["new-york-ny","san-francisco-ca"],["new-york-ny","los-angeles-ca"],
    ["new-york-ny","boston-ma"],["new-york-ny","chicago-il"],
  ];
  const colVsPages = COL_VS_PAIRS
    .filter(([a,b]) => cityData[a] && cityData[b])
    .map(([a,b]) => ({
      url: `${baseUrl}/cost-of-living-vs/${a}-vs-${b}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  // Stats hub — single-fact AEO pages
  const statsPages = [
    { url: `${baseUrl}/stats`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    ...STATS.map(s => ({
      url: `${baseUrl}/stats/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];

  // Daily Pulse — news-style daily briefs (high freshness signal)
  const dailyPages = [
    { url: `${baseUrl}/daily`, lastModified: new Date(), changeFrequency: "daily", priority: 0.85 },
    ...DAILY_ENTRIES.map(e => ({
      url: `${baseUrl}/daily/${e.slug}`,
      lastModified: new Date(e.date),
      changeFrequency: "yearly",
      priority: 0.7,
    })),
  ];

  // Research datasets — original-data citation magnets
  const researchPages = [
    { url: `${baseUrl}/research`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    ...DATASETS.map(d => ({
      url: `${baseUrl}/research/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];

  // Methodology page — E-E-A-T trust signal
  const methodologyPage = [
    { url: `${baseUrl}/methodology`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Money Q&A pages — featured-snippet-targeted personal finance answers
  const answersPages = [
    {
      url: `${baseUrl}/answers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...ANSWERS.map(a => ({
      url: `${baseUrl}/answers/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    })),
  ];

  // Salary needed × city pages — top cities × lifestyle tiers
  const SALARY_NEEDED_TIERS = ["50k","75k","100k","150k","200k","300k","comfortable","family","single","couple"];
  const topCitiesForSalary = Object.keys(cityData).slice(0, 200);
  const salaryNeededPages = [];
  for (const tier of SALARY_NEEDED_TIERS) {
    for (const cityKey of topCitiesForSalary) {
      salaryNeededPages.push({
        url: `${baseUrl}/salary-needed/${tier}-in-${cityKey}`,
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
    ...emergencyFundSalaryPages,
    ...rentVsBuyPages,
    ...dtiPages,
    ...bestMortgageRatesPages,
    ...refinanceCalcPages,
    ...firstTimeHomebuyerPages,
    ...bestSavingsPages,
    ...helocRatesPages,
    ...rolloverPages,
    ...creditCardPages,
    ...cdRatesPages,
    ...colVsPages,
    ...salaryNeededPages,
    ...answersPages,
    ...statsPages,
    ...dailyPages,
    ...researchPages,
    ...methodologyPage,
  ];
}

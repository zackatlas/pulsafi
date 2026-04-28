// Pulsafi Research — proprietary datasets and methodology pages.
// Each dataset is a citation-magnet for AI engines + a backlink target
// for journalists, researchers, and other finance sites.

const DATASETS = [
  {
    slug: "us-metro-salary-database",
    name: "US Metro-Level Salary Database",
    summary: "Median salaries for 157 occupations across 161 US metropolitan statistical areas — 21,608 unique data points sourced from BLS Occupational Employment and Wage Statistics (OEWS).",
    coverage: "21,608 metro × occupation pairs",
    method: "Sourced from BLS OEWS May 2024 release (most recent), filtered to occupations with reliable estimates (relative standard error under 30%) and metros with sufficient sample size. Updated annually within 60 days of OEWS release.",
    fields: ["Metro area (MSA)", "Occupation (SOC code)", "Annual median salary", "Annual mean salary", "Total employment in metro", "Hourly median wage"],
    bestFor: "Salary research by city + occupation, relocation analysis, compensation benchmarking",
    sourceLink: { name: "BLS Occupational Employment Statistics", url: "https://www.bls.gov/oes/" },
    accessLink: { label: "Browse the data", href: "/city-job-salary" },
    citationFormat: "Pulsafi US Metro-Level Salary Database, derived from BLS OEWS May 2024. https://www.pulsafi.com/research/us-metro-salary-database",
  },
  {
    slug: "state-property-tax-survey",
    name: "State Property Tax Effective Rates",
    summary: "Effective property tax rates across all 50 US states + DC, calculated as average annual property tax paid as a percentage of median home value.",
    coverage: "51 states/DC",
    method: "Effective rates calculated by dividing median annual property tax payment by median home value in each state, sourced from US Census ACS 5-year estimates. Updated annually as new ACS data releases.",
    fields: ["State", "Effective property tax rate (%)", "Avg annual tax on $400K home", "Median home value", "Rank by burden"],
    bestFor: "Mortgage cost analysis, relocation tax planning, state-by-state housing affordability",
    sourceLink: { name: "US Census ACS / ATTOM Data", url: "https://www.census.gov/" },
    accessLink: { label: "View by state", href: "/best-mortgage-rates/california" },
    citationFormat: "Pulsafi State Property Tax Survey, derived from US Census ACS 2023 5-year estimates. https://www.pulsafi.com/research/state-property-tax-survey",
  },
  {
    slug: "city-cost-of-living-index",
    name: "City Cost of Living Index",
    summary: "Composite cost-of-living index for 1,478 US cities, scaled to a national baseline of 100. Includes 1-bedroom and 2-bedroom rent, median income, and population.",
    coverage: "1,478 US cities",
    method: "Composite index combines housing (40%), groceries (15%), transportation (10%), utilities (8%), healthcare (5%), and other goods/services (22%) using ACS data and major-city consumer surveys. Validated against the C2ER COLI methodology where overlap exists.",
    fields: ["City", "State", "COL index (US baseline = 100)", "1-bedroom rent (avg)", "2-bedroom rent (avg)", "Median household income", "Population"],
    bestFor: "Relocation analysis, salary equivalence math, lifestyle planning",
    sourceLink: { name: "US Census ACS / C2ER COLI", url: "https://www.coli.org/" },
    accessLink: { label: "Compare cities", href: "/cost-of-living-vs/san-francisco-ca-vs-austin-tx" },
    citationFormat: "Pulsafi City Cost of Living Index, derived from US Census ACS and C2ER COLI methodology. https://www.pulsafi.com/research/city-cost-of-living-index",
  },
  {
    slug: "state-first-time-homebuyer-programs",
    name: "State First-Time Homebuyer Program Database",
    summary: "Comprehensive database of state Housing Finance Agency (HFA) first-time homebuyer programs across all 50 states + DC. Includes program names, max DPA, income limits, and eligibility.",
    coverage: "51 states/DC",
    method: "Program details sourced directly from each state's HFA published documentation. Income limits and DPA percentages reflect the most generous tier offered. Reviewed quarterly for program changes.",
    fields: ["State", "Administering agency", "Primary program name", "Max DPA percentage", "DPA structure (grant / second mortgage)", "Income limit", "Source URL"],
    bestFor: "First-time buyer eligibility research, down-payment-assistance planning",
    sourceLink: { name: "National Council of State Housing Agencies (NCSHA)", url: "https://www.ncsha.org/" },
    accessLink: { label: "View by state", href: "/first-time-homebuyer/california" },
    citationFormat: "Pulsafi State First-Time Homebuyer Program Database, sourced from each state's Housing Finance Agency. https://www.pulsafi.com/research/state-first-time-homebuyer-programs",
  },
  {
    slug: "401k-rollover-provider-matrix",
    name: "401(k) Rollover Provider Matrix",
    summary: "Comparison data for 10 major 401(k) and IRA providers (Fidelity, Vanguard, Schwab, Empower, Voya, Principal, T. Rowe Price, John Hancock, Wealthfront, Betterment), including process times, paper requirements, and IRA types supported.",
    coverage: "10 major providers",
    method: "Provider details collected directly from each firm's published rollover documentation and customer service. Process times reflect typical experience; actual times vary by source plan complexity. Updated semi-annually.",
    fields: ["Provider", "Category (self-directed / robo / employer-plan)", "IRA types offered", "Process days (typical)", "Paper-only? (Y/N)", "ACH support? (Y/N)", "Free advisor review? (Y/N)"],
    bestFor: "Rollover decision-making, provider comparison",
    sourceLink: { name: "Pulsafi primary research, verified with each provider", url: "/methodology" },
    accessLink: { label: "Compare rollover paths", href: "/401k-rollover/fidelity-to-vanguard" },
    citationFormat: "Pulsafi 401(k) Rollover Provider Matrix, primary research. https://www.pulsafi.com/research/401k-rollover-provider-matrix",
  },
];

const DATASET_BY_SLUG = DATASETS.reduce((acc, d) => { acc[d.slug] = d; return acc; }, {});

module.exports = { DATASETS, DATASET_BY_SLUG };

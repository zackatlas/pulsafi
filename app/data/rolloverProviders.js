// 401(k) rollover provider matrix.
// Source/destination provider data for /401k-rollover/[from]-to-[to] pages.

const PROVIDERS = {
  "fidelity": { name: "Fidelity Investments", category: "self-directed", iraType: "Traditional, Roth, SEP, SIMPLE, Rollover IRA", phone: "1-800-343-3548", processDays: "5-10", paperOption: true, ach: true, freeAdvisorReview: true, notes: "No fees to roll IN. Self-directed; choose your own funds. Strong fund lineup with zero-expense-ratio Fidelity ZERO funds." },
  "vanguard": { name: "Vanguard", category: "self-directed", iraType: "Traditional, Roth, SEP, SIMPLE, Rollover IRA", phone: "1-800-523-1188", processDays: "7-14", paperOption: true, ach: true, freeAdvisorReview: true, notes: "Pioneer of low-cost index funds. Best for buy-and-hold investors who want Vanguard mutual funds and ETFs at the source." },
  "schwab": { name: "Charles Schwab", category: "self-directed", iraType: "Traditional, Roth, SEP, SIMPLE, Rollover IRA", phone: "1-800-435-4000", processDays: "5-10", paperOption: true, ach: true, freeAdvisorReview: true, notes: "Strong customer service, $0 commissions, broad ETF lineup. Best for active and passive investors alike." },
  "betterment": { name: "Betterment", category: "robo-advisor", iraType: "Traditional, Roth, SEP, Rollover IRA", phone: "1-718-400-6898", processDays: "7-21", paperOption: false, ach: true, freeAdvisorReview: true, notes: "Automated investing with tax-loss harvesting. 0.25% management fee. Hands-off solution for rollovers if you don't want to pick funds." },
  "wealthfront": { name: "Wealthfront", category: "robo-advisor", iraType: "Traditional, Roth, SEP, Rollover IRA", phone: "1-877-910-4232", processDays: "7-21", paperOption: false, ach: true, freeAdvisorReview: false, notes: "Automated tax-loss harvesting and direct indexing at $100k+. 0.25% management fee. Excellent if you want a fully automated retirement portfolio." },
  "empower": { name: "Empower (formerly Personal Capital)", category: "self-directed", iraType: "Traditional, Roth, Rollover IRA", phone: "1-800-338-4015", processDays: "10-15", paperOption: true, ach: true, freeAdvisorReview: true, notes: "Major retirement plan administrator. Free retirement planner tools. Higher fees on advised accounts (~0.89%)." },
  "principal": { name: "Principal Financial Group", category: "employer-plan", iraType: "Rollover IRA available, but most users roll OUT to a self-directed broker", phone: "1-800-247-8000", processDays: "10-21", paperOption: true, ach: false, freeAdvisorReview: false, notes: "Common employer 401(k) plan administrator. Many users roll out to Fidelity/Vanguard/Schwab for lower fees." },
  "voya": { name: "Voya Financial", category: "employer-plan", iraType: "Rollover IRA available, but most users roll OUT", phone: "1-800-784-6386", processDays: "10-21", paperOption: true, ach: false, freeAdvisorReview: false, notes: "Common 401(k) record-keeper. Limited fund options vs. self-directed brokers — many users roll out for better fund choice and lower fees." },
  "trowe": { name: "T. Rowe Price", category: "self-directed", iraType: "Traditional, Roth, SEP, Rollover IRA", phone: "1-800-225-5132", processDays: "7-14", paperOption: true, ach: true, freeAdvisorReview: true, notes: "Active mutual fund manager with strong target-date funds. Higher expense ratios than passive index alternatives." },
  "johnhancock": { name: "John Hancock", category: "employer-plan", iraType: "Rollover IRA available; many users roll OUT", phone: "1-800-225-5291", processDays: "10-21", paperOption: true, ach: false, freeAdvisorReview: false, notes: "Common 401(k) administrator. Often higher fees and more limited fund choice than self-directed alternatives." },
};

// 30 most-searched provider pairs (from + to).
// Excludes same-provider pairs (fidelity-to-fidelity etc).
const ROLLOVER_PAIRS = [
  ["fidelity", "vanguard"], ["vanguard", "fidelity"],
  ["fidelity", "schwab"], ["schwab", "fidelity"],
  ["vanguard", "schwab"], ["schwab", "vanguard"],
  ["principal", "fidelity"], ["principal", "vanguard"], ["principal", "schwab"],
  ["voya", "fidelity"], ["voya", "vanguard"], ["voya", "schwab"],
  ["empower", "fidelity"], ["empower", "vanguard"], ["empower", "schwab"],
  ["trowe", "fidelity"], ["trowe", "vanguard"],
  ["johnhancock", "fidelity"], ["johnhancock", "vanguard"],
  ["fidelity", "betterment"], ["fidelity", "wealthfront"],
  ["vanguard", "betterment"], ["vanguard", "wealthfront"],
  ["schwab", "betterment"], ["schwab", "wealthfront"],
  ["principal", "betterment"], ["voya", "betterment"],
  ["empower", "betterment"], ["trowe", "betterment"],
  ["johnhancock", "betterment"],
];

module.exports = { PROVIDERS, ROLLOVER_PAIRS };

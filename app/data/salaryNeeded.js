// Lifestyle tiers and cities for /salary-needed/[tier]-in-[city].
// Shared by the page, the /salary-needed hub and the sitemap so the three
// can't drift apart.
const cityData = require("./cityData");

const LIFESTYLE_TIERS = {
  // Income-anchored tiers
  "50k": { label: "$50K Lifestyle", target: 50000, type: "income", description: "Single, modest one-bedroom, no car, careful with discretionary spending." },
  "75k": { label: "$75K Lifestyle", target: 75000, type: "income", description: "Single or couple, moderate one-bedroom, used car, occasional dining out and travel." },
  "100k": { label: "$100K Lifestyle", target: 100000, type: "income", description: "Comfortable single life or DINK couple, nicer apartment, retirement contributions." },
  "150k": { label: "$150K Lifestyle", target: 150000, type: "income", description: "Upper-middle: home down-payment savings, two cars, regular dining out and travel." },
  "200k": { label: "$200K Lifestyle", target: 200000, type: "income", description: "Affluent: mortgage on a starter home, max retirement contributions, kids' education savings." },
  "300k": { label: "$300K Lifestyle", target: 300000, type: "income", description: "High earner: family home, private school option, aggressive savings, vacations." },

  // Lifestyle-anchored tiers (more search-natural)
  "comfortable":   { label: "Comfortable Single Lifestyle", multiplier: 0.85, type: "lifestyle", description: "Apartment of your own, transportation, dining out 2-3x/week, retirement on track." },
  "family":        { label: "Family of 4 Lifestyle", multiplier: 1.65, type: "lifestyle", description: "3-bedroom home, two cars, kids' activities, family vacations, college savings." },
  "single":        { label: "Single Person Modest", multiplier: 0.65, type: "lifestyle", description: "Roommate or studio, used car, careful budget, basic retirement contributions." },
  "couple":        { label: "Couple, No Kids", multiplier: 1.10, type: "lifestyle", description: "One-bedroom together, two incomes, room for travel and savings." },
};

// The page sets dynamicParams = false, so only these cities have pages.
const SALARY_NEEDED_CITIES = Object.keys(cityData).slice(0, 200);

module.exports = { LIFESTYLE_TIERS, SALARY_NEEDED_CITIES };

// ─── Cross-template internal link builder ───
//
// All programmatic pages link into related programmatic pages to build the
// link graph Google uses to distinguish "real site" from "thin pages." Each
// template's needs are slightly different, so we centralize the tier tables
// + slug snapping here and expose a `buildCrossLinks` helper that accepts a
// scenario object and returns a validated list of { href, title, desc }.
//
// Every URL returned is guaranteed to correspond to a slug pattern the
// sitemap actually emits — see app/sitemap.js. If this file drifts from the
// sitemap, the broken-link sweep (in fix/broken-links-and-perf history) is
// the canonical reconciliation tool.

export const TIERS = {
  afford: [40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 90000, 100000, 120000, 150000, 175000, 200000, 250000, 300000, 400000, 500000],
  salary: [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000],
  tax: [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000],
  retirement: [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000],
  emergency: [30000, 40000, 50000, 60000, 75000, 80000, 100000, 120000, 150000],
  dti: [30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000],
  mortgage: [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000],
  rvbRent: [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000],
  rvbPrice: [150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 800000, 1000000],
  investAmount: [1000, 2500, 5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 500000, 1000000],
  investYears: [1, 3, 5, 10, 15, 20, 25, 30],
  retirementAge: Array.from({ length: 49 }, (_, i) => i + 22),
};

export function nearestTier(value, tiers) {
  if (value == null || Number.isNaN(value)) return tiers[Math.floor(tiers.length / 2)];
  return tiers.reduce(
    (best, t) => (Math.abs(t - value) < Math.abs(best - value) ? t : best),
    tiers[0],
  );
}

// Given a state display name (e.g. "New York"), return the hyphenated form
// used by /mortgage and /tax-brackets (e.g. "new-york") and the concatenated
// form used by /salary and /afford (e.g. "newyork", or "dc" for DC).
export function normalizeStateSlugs(stateName) {
  if (!stateName) return { hyphenated: null, concat: null };
  const hyphenated = stateName.toLowerCase().replace(/\s+/g, '-');
  const concat = hyphenated === 'district-of-columbia' ? 'dc' : hyphenated.replace(/-/g, '');
  return { hyphenated, concat };
}

function fmt(n) {
  if (n == null || Number.isNaN(n)) return '';
  return `$${n.toLocaleString()}`;
}

// ─── Scenario builders ─────────────────────────────────────────────────────
//
// Each builder takes a "scenario" (what the current page is about) and
// returns a list of cross-template links that would be useful alongside it.
// Callers pass the scenario they have; the helper picks the relevant links.
//
// Scenario fields (all optional, builders use whatever is present):
//   - income, salary: annual income in USD
//   - age: integer
//   - homePrice: integer
//   - monthlyRent: integer
//   - stateName: "New York", "Texas", etc. (display form)

export function buildCrossLinks(scenario, { exclude = [], limit = 6 } = {}) {
  const { income, salary, age, homePrice, monthlyRent, stateName } = scenario;
  const { hyphenated, concat } = normalizeStateSlugs(stateName);
  const incomeVal = income ?? salary ?? null;
  const stateSuffix = stateName ? ` in ${stateName}` : '';

  const links = [];

  // Take-home pay — anchor link for any page with a salary.
  if (incomeVal && concat) {
    const tier = nearestTier(incomeVal, TIERS.salary);
    links.push({
      key: 'salary',
      href: `/salary/${tier}-salary-in-${concat}`,
      title: `Take-home pay on ${fmt(tier)}${stateSuffix}`,
      desc: `Federal tax, state tax, Social Security, and Medicare breakdown.`,
    });
  }

  // Affordability — house-buying power at this income.
  if (incomeVal && concat) {
    const tier = nearestTier(incomeVal, TIERS.afford);
    links.push({
      key: 'afford',
      href: `/afford/${tier}-in-${concat}`,
      title: `What you can afford on ${fmt(tier)}${stateSuffix}`,
      desc: `Home price, rent, and monthly spending guidelines.`,
    });
  }

  // Tax brackets — show exactly which brackets the user crosses.
  if (incomeVal && hyphenated) {
    const tier = nearestTier(incomeVal, TIERS.tax);
    links.push({
      key: 'tax',
      href: `/tax-brackets/${hyphenated}-${tier}`,
      title: `Tax brackets on ${fmt(tier)}${stateSuffix}`,
      desc: `See exactly which federal and state brackets your income crosses.`,
    });
  }

  // Mortgage — either direct (if we have a homePrice) or derived (~4x income).
  const derivedPrice = homePrice ?? (incomeVal ? incomeVal * 4 : null);
  if (derivedPrice && hyphenated) {
    const tier = nearestTier(derivedPrice, TIERS.mortgage);
    links.push({
      key: 'mortgage',
      href: `/mortgage/${hyphenated}-${tier}`,
      title: `${fmt(tier)} mortgage${stateSuffix}`,
      desc: `Monthly payment, property tax, and total interest at typical rates.`,
    });
  }

  // Retirement — always relevant. Pick a realistic age if none given.
  if (incomeVal) {
    const tier = nearestTier(incomeVal, TIERS.retirement);
    const retirementAge = age && TIERS.retirementAge.includes(age) ? age : 30;
    links.push({
      key: 'retirement',
      href: `/retirement/age-${retirementAge}-salary-${tier}`,
      title: `Retirement at ${retirementAge} earning ${fmt(tier)}`,
      desc: `Benchmarks, projections, and catch-up strategies.`,
    });
  }

  // Emergency fund target — single-filer default.
  if (incomeVal) {
    const tier = nearestTier(incomeVal, TIERS.emergency);
    links.push({
      key: 'emergency',
      href: `/emergency-fund/${tier}-salary-single`,
      title: `Emergency fund target for ${fmt(tier)}`,
      desc: `3, 6, 9, and 12-month targets at your income level.`,
    });
  }

  // Debt-to-income — fixed $2K/mo debt as a concrete example.
  if (incomeVal) {
    const tier = nearestTier(incomeVal, TIERS.dti);
    links.push({
      key: 'dti',
      href: `/debt-to-income/${tier}-income-2000-debt`,
      title: `DTI ratio on ${fmt(tier)} with $2K/mo debt`,
      desc: `See how monthly debt obligations affect your borrowing power.`,
    });
  }

  // Rent vs Buy — triggers when we have either a rent or a price.
  if (monthlyRent || homePrice) {
    const rent = nearestTier(monthlyRent ?? 2000, TIERS.rvbRent);
    const price = nearestTier(homePrice ?? (monthlyRent ? monthlyRent * 200 : 400000), TIERS.rvbPrice);
    links.push({
      key: 'rent-vs-buy',
      href: `/rent-vs-buy/rent-${rent}-vs-buy-${price}`,
      title: `Rent ${fmt(rent)}/mo vs buy ${fmt(price)}`,
      desc: `Compare total costs, equity, and break-even timeline.`,
    });
  }

  // Net worth by age — only if we have an age.
  if (age && age >= 22 && age <= 70) {
    links.push({
      key: 'net-worth',
      href: `/net-worth-by-age/${age}`,
      title: `Net worth benchmarks at age ${age}`,
      desc: `Where you stand vs median and average for your age.`,
    });
  }

  // Investment growth — fixed amount for illustration.
  if (incomeVal || age) {
    const amount = nearestTier(incomeVal ? Math.round(incomeVal * 0.1) : 10000, TIERS.investAmount);
    const years = age ? nearestTier(Math.max(5, 65 - age), TIERS.investYears) : 30;
    links.push({
      key: 'invest',
      href: `/invest/${amount}-over-${years}-years`,
      title: `${fmt(amount)} invested over ${years} years`,
      desc: `Growth projections across savings, bonds, and stocks.`,
    });
  }

  // Filter out excluded keys (the current page shouldn't link to itself) and
  // cap the list so the section doesn't dominate the page.
  return links.filter((l) => !exclude.includes(l.key)).slice(0, limit);
}

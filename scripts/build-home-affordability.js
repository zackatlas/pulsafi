#!/usr/bin/env node
/**
 * Builds app/data/homeAffordability.js — the dataset behind
 * /research/salary-needed-to-buy-a-home-2026 and the per-state snapshots on
 * the state rate pages.
 *
 * Sources (all public, no API keys):
 *   - Zillow Home Value Index (ZHVI), metro + state, mid-tier, smoothed & seasonally adjusted
 *     https://www.zillow.com/research/data/
 *   - Freddie Mac 30-year fixed rate via FRED (MORTGAGE30US)
 *   - Property tax / insurance by state: app/data/mortgageData.js
 *   - Principal-city median household income: app/data/cityData.js (ACS)
 *
 * Usage: node scripts/build-home-affordability.js
 * Re-run monthly (Zillow publishes ZHVI around the 16th).
 */
const fs = require("fs");
const path = require("path");
const os = require("os");

const ROOT = path.join(__dirname, "..");
const CACHE = process.env.AFFORDABILITY_CACHE_DIR || path.join(os.tmpdir(), "pulsafi-affordability");
fs.mkdirSync(CACHE, { recursive: true });

const ZHVI_BASE = "https://files.zillowstatic.com/research/public_csvs/zhvi/";
const METRO_FILE = "Metro_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv";
const STATE_FILE = "State_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv";
const FRED_30YR = "https://fred.stlouisfed.org/graph/fredgraph.csv?id=MORTGAGE30US&cosd=2025-01-01";

const { STATE_PROPERTY_TAX_RATES, STATE_INSURANCE_RATES } = require(path.join(ROOT, "app/data/mortgageData.js"));
const cityData = require(path.join(ROOT, "app/data/cityData.js"));
const cities = cityData.default || cityData;

const METRO_COUNT = 100;      // top metros by Zillow size rank
const DOWN_PAYMENT_PCT = 20;  // headline scenario
const ALT_DOWN_PCT = 10;      // secondary scenario
const FRONT_END_RATIO = 0.28; // housing payment / gross income
const TERM_YEARS = 30;

const STATE_ABBR_TO_SLUG = {
  AL: "alabama", AK: "alaska", AZ: "arizona", AR: "arkansas", CA: "california", CO: "colorado",
  CT: "connecticut", DE: "delaware", DC: "district-of-columbia", FL: "florida", GA: "georgia",
  HI: "hawaii", ID: "idaho", IL: "illinois", IN: "indiana", IA: "iowa", KS: "kansas", KY: "kentucky",
  LA: "louisiana", ME: "maine", MD: "maryland", MA: "massachusetts", MI: "michigan", MN: "minnesota",
  MS: "mississippi", MO: "missouri", MT: "montana", NE: "nebraska", NV: "nevada", NH: "new-hampshire",
  NJ: "new-jersey", NM: "new-mexico", NY: "new-york", NC: "north-carolina", ND: "north-dakota",
  OH: "ohio", OK: "oklahoma", OR: "oregon", PA: "pennsylvania", RI: "rhode-island", SC: "south-carolina",
  SD: "south-dakota", TN: "tennessee", TX: "texas", UT: "utah", VT: "vermont", VA: "virginia",
  WA: "washington", WV: "west-virginia", WI: "wisconsin", WY: "wyoming",
};
// Site-wide state slugs are hyphenated ("new-york"); stateTaxData.js keys are not, so derive from the name.
const STATE_NAME_TO_SLUG = {};
for (const v of Object.values(require(path.join(ROOT, "app/data/stateTaxData.js")))) {
  STATE_NAME_TO_SLUG[v.name] = v.name === "District of Columbia" ? "district-of-columbia" : v.name.toLowerCase().replace(/\s+/g, "-");
}

async function download(url, file) {
  const dest = path.join(CACHE, file);
  if (fs.existsSync(dest) && Date.now() - fs.statSync(dest).mtimeMs < 6 * 3600 * 1000) return fs.readFileSync(dest, "utf8");
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Pulsafi research build)" } });
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  const text = await res.text();
  fs.writeFileSync(dest, text);
  return text;
}

// Minimal CSV parser that handles quoted fields (Zillow quotes "City, ST").
function parseCsv(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line) continue;
    const out = []; let cur = ""; let q = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') { q = !q; continue; }
      if (c === "," && !q) { out.push(cur); cur = ""; continue; }
      cur += c;
    }
    out.push(cur); rows.push(out);
  }
  return rows;
}

function monthlyPI(loan, ratePct, years) {
  const r = ratePct / 100 / 12, n = years * 12;
  return loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function scenario(price, stateSlug, ratePct, downPct) {
  const taxRate = STATE_PROPERTY_TAX_RATES[stateSlug] ?? 1.0;
  const insurance = STATE_INSURANCE_RATES[stateSlug] ?? 2000;
  const loan = price * (1 - downPct / 100);
  const pi = monthlyPI(loan, ratePct, TERM_YEARS);
  const tax = price * taxRate / 100 / 12;
  const ins = insurance / 12;
  const pmi = downPct < 20 ? loan * 0.006 / 12 : 0; // ~0.6%/yr typical PMI
  const piti = pi + tax + ins + pmi;
  return {
    downPayment: Math.round(price * downPct / 100),
    loan: Math.round(loan),
    monthlyPI: Math.round(pi),
    monthlyTax: Math.round(tax),
    monthlyInsurance: Math.round(ins),
    monthlyPMI: Math.round(pmi),
    monthlyPITI: Math.round(piti),
    incomeNeeded: Math.round(piti * 12 / FRONT_END_RATIO / 100) * 100,
  };
}

(async () => {
  const [metroCsv, stateCsv, fredCsv] = await Promise.all([
    download(ZHVI_BASE + METRO_FILE, METRO_FILE),
    download(ZHVI_BASE + STATE_FILE, STATE_FILE),
    download(FRED_30YR, "MORTGAGE30US.csv"),
  ]);

  const fredRows = parseCsv(fredCsv).filter(r => r[1] && r[1] !== "." && r[0] !== "observation_date" && r[0] !== "DATE");
  const [rateDate, rateStr] = fredRows[fredRows.length - 1];
  const rate = parseFloat(rateStr);

  const metro = parseCsv(metroCsv);
  const header = metro[0];
  const lastIdx = header.length - 1;
  const yoyIdx = lastIdx - 12;
  const zhviMonth = header[lastIdx];

  const nationalRow = metro.find(r => r[3] === "country");
  const nationalPrice = Math.round(parseFloat(nationalRow[lastIdx]));
  const nationalYoy = (parseFloat(nationalRow[lastIdx]) / parseFloat(nationalRow[yoyIdx]) - 1) * 100;

  const metros = [];
  for (const r of metro.slice(1)) {
    if (r[3] !== "msa") continue;
    const sizeRank = parseInt(r[1], 10);
    if (sizeRank > METRO_COUNT) continue;
    const price = parseFloat(r[lastIdx]);
    if (!price) continue;
    const regionName = r[2];                       // "Dallas, TX"
    const stateAbbr = r[4];
    const stateSlug = STATE_ABBR_TO_SLUG[stateAbbr];
    if (!stateSlug) continue;
    const principalCity = regionName.split(",")[0].split("-")[0].split("/")[0].trim();
    // Zillow names a few metros differently from the ACS principal city.
    const CITY_ALIASES = { "Urban Honolulu": "Honolulu", "Boise City": "Boise", "Winston": "Winston-Salem", "St. Louis": "St Louis" };
    const citySlug = slugify(`${CITY_ALIASES[principalCity] || principalCity} ${stateAbbr}`);
    const city = cities[citySlug];
    const yoy = (price / parseFloat(r[yoyIdx]) - 1) * 100;
    const s20 = scenario(price, stateSlug, rate, DOWN_PAYMENT_PCT);
    const s10 = scenario(price, stateSlug, rate, ALT_DOWN_PCT);
    metros.push({
      rank: sizeRank,
      metro: regionName,
      slug: slugify(regionName),
      principalCity,
      citySlug: city ? citySlug : null,
      stateAbbr,
      stateSlug,
      medianHomeValue: Math.round(price),
      yoyChangePct: +yoy.toFixed(1),
      propertyTaxRate: STATE_PROPERTY_TAX_RATES[stateSlug],
      annualInsurance: STATE_INSURANCE_RATES[stateSlug],
      down20: s20,
      down10: s10,
      medianHouseholdIncome: city ? city.medianIncome : null,
      // Ratio > 1 means the principal city's median household can't afford the metro's median home at 20% down.
      incomeGapRatio: city ? +(s20.incomeNeeded / city.medianIncome).toFixed(2) : null,
    });
  }
  metros.sort((a, b) => a.rank - b.rank);

  const stateRows = parseCsv(stateCsv);
  const sHeader = stateRows[0]; const sLast = sHeader.length - 1; const sYoy = sLast - 12;
  const states = [];
  for (const r of stateRows.slice(1)) {
    if (r[3] !== "state") continue;
    const slug = STATE_NAME_TO_SLUG[r[2]];
    if (!slug) continue;
    const price = parseFloat(r[sLast]);
    if (!price) continue;
    states.push({
      state: r[2],
      slug,
      medianHomeValue: Math.round(price),
      yoyChangePct: +((price / parseFloat(r[sYoy]) - 1) * 100).toFixed(1),
      propertyTaxRate: STATE_PROPERTY_TAX_RATES[slug],
      annualInsurance: STATE_INSURANCE_RATES[slug],
      down20: scenario(price, slug, rate, DOWN_PAYMENT_PCT),
      down10: scenario(price, slug, rate, ALT_DOWN_PCT),
      topMetros: metros.filter(m => m.stateSlug === slug).slice(0, 4).map(m => ({ metro: m.metro, slug: m.slug, medianHomeValue: m.medianHomeValue, incomeNeeded: m.down20.incomeNeeded, citySlug: m.citySlug })),
    });
  }
  states.sort((a, b) => a.state.localeCompare(b.state));

  const nationalScenario = scenario(nationalPrice, "__national__", rate, DOWN_PAYMENT_PCT);
  const out = {
    generatedAt: new Date().toISOString().slice(0, 10),
    zhviMonth,
    rate30: rate,
    rateDate,
    assumptions: {
      downPaymentPct: DOWN_PAYMENT_PCT, altDownPaymentPct: ALT_DOWN_PCT,
      frontEndRatio: FRONT_END_RATIO, termYears: TERM_YEARS, pmiAnnualPct: 0.6,
      nationalPropertyTaxRate: 1.0, nationalInsurance: 2000,
    },
    national: { medianHomeValue: nationalPrice, yoyChangePct: +nationalYoy.toFixed(1), down20: nationalScenario },
    metros,
    states,
  };

  const file = path.join(ROOT, "app/data/homeAffordability.js");
  fs.writeFileSync(file,
`// GENERATED by scripts/build-home-affordability.js on ${out.generatedAt} — do not edit by hand.
// Zillow ZHVI (mid-tier, smoothed, seasonally adjusted) for ${zhviMonth}; Freddie Mac 30-yr fixed ${rate}% (${rateDate}).
const HOME_AFFORDABILITY = ${JSON.stringify(out, null, 1)};
module.exports = { HOME_AFFORDABILITY };
`);
  const matched = metros.filter(m => m.citySlug).length;
  console.log(`wrote ${file}: ${metros.length} metros (${matched} with ACS income), ${states.length} states, ZHVI ${zhviMonth}, rate ${rate}% (${rateDate})`);
  const unmatched = metros.filter(m => !m.citySlug).map(m => m.metro);
  if (unmatched.length) console.log("no city income match:", unmatched.join(" | "));
})().catch(e => { console.error(e); process.exit(1); });

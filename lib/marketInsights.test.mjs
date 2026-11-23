// Wording checks for /market-today, built on real days the page got wrong.
// Run: npm test   (node --test, no dependencies)

import { test } from "node:test";
import assert from "node:assert/strict";
import { SECTORS, summarizeSeries } from "./marketData.js";
import { sectorRead, streakSignal, yieldSignal, typicality, mortgageOutlook, buildInsights } from "./marketInsights.js";

// ---------- fixtures ----------

// Sector moves at 11:00 AM ET on Thu Nov 19, 2026 (S&P 500 −0.26%).
const NOV19 = { XLK: 0.89, XLC: -0.27, XLE: -0.30, XLI: -0.83, XLF: -0.94, XLY: -0.96, XLU: -1.18, XLRE: -1.24, XLB: -1.35, XLP: -1.80, XLV: -2.05 };
const sectorsFrom = (moves) => SECTORS.map((s) => ({ ...s, move: moves[s.key] }));
const negate = (moves) => Object.fromEntries(Object.entries(moves).map(([k, v]) => [k, -v]));

// A Yahoo chart response: one bar per [dateKey, close], stamped mid-morning ET.
const at = (key, hourUtc) => { const [y, m, d] = key.split("-").map(Number); return Date.UTC(y, m - 1, d, hourUtc) / 1000; };
function chart(bars, { open }) {
  const lastKey = bars[bars.length - 1][0];
  return {
    meta: {
      // Nov 19 is EST: the regular session is 14:30–21:00 UTC.
      currentTradingPeriod: { regular: { start: at(lastKey, 14.5), end: at(lastKey, 21) } },
      regularMarketTime: open ? at(lastKey, 16) : at(lastKey, 21),
    },
    timestamp: bars.map(([d]) => at(d, 15)),
    indicators: { quote: [{ close: bars.map(([, c]) => c) }] },
  };
}

// Weekdays from start until (not including) end.
function weekdays(start, end) {
  const out = [];
  for (let t = Date.parse(`${start}T12:00:00Z`); t < Date.parse(`${end}T12:00:00Z`); t += 86400e3) {
    const d = new Date(t);
    if (d.getUTCDay() % 6) out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

// S&P 500 closes: a choppy autumn, then the Nov 12–18 losing run from AP's closes.
function spxBars(nov19) {
  const filler = weekdays("2026-08-03", "2026-11-10").map((d, i) => [d, 7500 + (i % 2 ? 60 : -60) + i]);
  return [...filler, ["2026-11-10", 7600], ["2026-11-11", 7619.38], ["2026-11-12", 7592.40], ["2026-11-13", 7561.67],
    ["2026-11-16", 7416.59], ["2026-11-17", 7340.53], ["2026-11-18", 7323.63], ["2026-11-19", nov19]];
}
const spxDef = { symbol: "^GSPC", label: "S&P 500", kind: "index" };
const spxAt = (nov19, open) => summarizeSeries("spx", spxDef, chart(spxBars(nov19), { open }));

// 10-year yield: FRED DGS10 for the PMMS week of Nov 5–11 (no Nov 11 print,
// Veterans Day), then ~5.1% since the Nov 12 release.
function t10Bars(nov19) {
  const filler = weekdays("2026-08-03", "2026-11-05").map((d, i) => [d, 4.8 + (i % 2 ? 0.03 : -0.03)]);
  return [...filler, ["2026-11-05", 4.84], ["2026-11-06", 4.86], ["2026-11-09", 4.88], ["2026-11-10", 4.98],
    ["2026-11-12", 5.10], ["2026-11-13", 5.08], ["2026-11-16", 5.09], ["2026-11-17", 5.06], ["2026-11-18", 5.08], ["2026-11-19", nov19]];
}
const t10Def = { symbol: "^TNX", label: "10-year Treasury", kind: "yield" };
const t10At = (nov19, open = true) => summarizeSeries("t10y", t10Def, chart(t10Bars(nov19), { open }));
const PMMS_NOV12 = { value: 6.2, date: "2026-11-12" };

// ---------- 1. sector themes ----------

test("Nov 19: no 'Risk-on' or 'confidence' when 10 of 11 sectors fell", () => {
  const r = sectorRead(sectorsFrom(NOV19), { move: -0.26 });
  assert.equal(r.theme, "Defensive sectors lagged");
  assert.equal(r.themeBody, "Growth and economically sensitive sectors held up better than defensive ones (−0.54% vs. −1.68% on average), while only technology (+0.89%) rose.");
  assert.deepEqual(r.themeLeaders.map((s) => s.key), ["XLK"]);
  assert.doesNotMatch(r.themeBody, /confidence|communication services/);
});

test("Nov 19 with more risers: names only the ones that rose, without 'only'", () => {
  const r = sectorRead(sectorsFrom({ ...NOV19, XLC: 0.10, XLE: 0.20 }), { move: -0.15 });
  assert.equal(r.theme, "Defensive sectors lagged");
  assert.match(r.themeBody, /, while technology \(\+0\.89%\) and energy \(\+0\.20%\) rose\.$/);
  assert.ok(r.themeLeaders.every((s) => s.move > 0));
});

test("up-day mirror of Nov 19: no 'played defense … caution' when 10 of 11 sectors rose", () => {
  const r = sectorRead(sectorsFrom(negate(NOV19)), { move: 0.26 });
  assert.equal(r.theme, "Defensive sectors led");
  assert.equal(r.themeBody, "Defensive sectors rose more than growth and economically sensitive ones (+1.68% vs. +0.54% on average), led by health care (+2.05%) and consumer staples (+1.80%).");
  assert.doesNotMatch(r.themeBody, /caution/);
});

test("down day where defense fell least: relative wording, no 'caution'", () => {
  const moves = { XLK: -1.8, XLC: -1.5, XLY: -1.6, XLF: -1.2, XLI: -1.1, XLB: -1.0, XLE: -0.9, XLRE: -0.5, XLU: 0.2, XLP: 0.1, XLV: -0.4 };
  const r = sectorRead(sectorsFrom(moves), { move: -1.0 });
  assert.equal(r.theme, "Investors played defense");
  assert.equal(r.themeBody, "Defensive sectors held up better than growth and economically sensitive ones (−0.03% vs. −1.30% on average), while only utilities (+0.20%) and consumer staples (+0.10%) rose.");
});

test("genuine rotation into defense keeps the original read", () => {
  const moves = { XLK: -1.4, XLC: -1.0, XLY: -1.2, XLF: -0.8, XLI: -0.7, XLB: -0.9, XLE: -0.6, XLRE: 0.1, XLU: 0.8, XLP: 0.6, XLV: 0.5 };
  const r = sectorRead(sectorsFrom(moves), { move: -0.4 });
  assert.equal(r.theme, "Investors played defense");
  assert.equal(r.themeBody, "Defensive sectors beat growth and economically sensitive ones by 1.6 points on average, led by utilities (+0.80%) and consumer staples (+0.60%). Money moving toward steadier businesses usually signals caution.");
});

test("classic risk-on up day keeps the original read", () => {
  const moves = { XLK: 1.8, XLC: 1.2, XLY: 1.5, XLF: 0.9, XLI: 0.8, XLB: 0.7, XLE: 0.4, XLRE: 0.2, XLU: -0.3, XLP: -0.1, XLV: 0.1 };
  const r = sectorRead(sectorsFrom(moves), { move: 1.1 });
  assert.equal(r.theme, "Risk-on");
  assert.equal(r.themeBody, "Growth and economically sensitive sectors beat defensive ones by 1.1 points on average, led by technology (+1.80%) and consumer discretionary (+1.50%). That usually reflects confidence about the economy.");
});

test("near-flat S&P with 10 of 11 sectors down and no tilt is a broad selloff", () => {
  const moves = Object.fromEntries(SECTORS.map((s) => [s.key, s.key === "XLK" ? 0.2 : -0.8]));
  assert.equal(sectorRead(sectorsFrom(moves), { move: -0.15 }).theme, "A broad selloff");
  assert.equal(sectorRead(sectorsFrom(negate(moves)), { move: 0.15 }).theme, "A broad rally");
  // A tiny typical move isn't "broad".
  const tiny = Object.fromEntries(SECTORS.map((s) => [s.key, s.key === "XLK" ? 0.2 : -0.1]));
  assert.equal(sectorRead(sectorsFrom(tiny), { move: -0.05 }).theme, "No clear theme");
});

test("Nov 19 page: sector card and headline credit technology, the only riser", () => {
  const ins = buildInsights({ series: { spx: spxAt(7304.59, true) }, sectors: sectorsFrom(NOV19), fetchedAt: "2026-11-19T16:00:00Z" }, null);
  assert.equal(ins.sectors.theme, "Defensive sectors lagged");
  assert.match(ins.headline, / as technology leads$/);
});

// ---------- 2. streaks while the market is open ----------

test("Nov 19 at 11 AM: five closed losses plus an unfinished sixth", () => {
  const spx = spxAt(7304.59, true);
  assert.equal(spx.sessionOpen, true);
  assert.equal(spx.streak, -6);
  const card = streakSignal(spx, "S&P 500", "spx-streak");
  assert.equal(card.title, "S&P 500 on track for a sixth straight loss");
  assert.match(card.body, /^It fell 5 sessions in a row through Nov 18 \(−3\.9%\) and is down another 0\.26% so far today\. /);
});

test("after the close the sixth day counts", () => {
  const card = streakSignal(spxAt(7304.59, false), "S&P 500", "spx-streak");
  assert.equal(card.title, "S&P 500 down 6 days in a row");
  assert.match(card.body, /^That's −4\.1% over the run\. /);
});

test("flat so far today: report only the closed run", () => {
  const card = streakSignal(spxAt(7323.6, true), "S&P 500", "spx-streak");
  assert.equal(card.title, "S&P 500 down 5 days in a row");
  assert.match(card.body, /and is flat so far today\./);
});

test("10-year streak note doesn't count an unfinished session", () => {
  const t10 = { last: 5.2, move: 4, z: 1.6, chg1m: 10, sessionOpen: true, streak: 5 };
  assert.match(yieldSignal(t10, 6.2).body, / It rose 4 sessions in a row before today and is higher again so far\./);
  assert.match(yieldSignal({ ...t10, sessionOpen: false }, 6.2).body, / It has risen 5 sessions in a row\./);
});

// ---------- 3. "past year", not "this year" ----------

test("typicality describes the trailing year", () => {
  assert.equal(typicality({ movePercentile: 0.27 }), "a quieter day than 73% of sessions in the past year");
  assert.equal(typicality({ movePercentile: 0.9 }), "a bigger move than 90% of days in the past year");
  assert.equal(typicality({ movePercentile: 0.97 }), "one of the biggest moves of the past year");
});

// ---------- 4. mortgage outlook ----------

test("Nov 19 before noon: compare with the survey week's 10-year, point to today's noon reading", () => {
  const out = mortgageOutlook(t10At(5.07), PMMS_NOV12, "2026-11-19T16:00:00Z");
  // (4.84 + 4.86 + 4.88 + 4.98) / 4 = 4.89, so 5.07 is +18 bp. The old check
  // used the Nov 12 close (5.10) and said the yield had "barely moved".
  assert.equal(out, "The 10-year yield is up 18 bp from its average during the week that survey covered, which usually shows up as higher mortgage rates in today's noon reading.");
});

test("after Thursday noon or earlier in the week: 'the next weekly reading'", () => {
  assert.match(mortgageOutlook(t10At(5.07), PMMS_NOV12, "2026-11-19T18:00:00Z"), /in the next weekly reading\.$/);
  assert.match(mortgageOutlook(t10At(5.07), PMMS_NOV12, "2026-11-17T16:00:00Z"), /in the next weekly reading\.$/);
});

test("10-year near its survey-week average: 'likely to be similar'", () => {
  assert.equal(mortgageOutlook(t10At(4.91), PMMS_NOV12, "2026-11-19T16:00:00Z"), "The 10-year yield is close to its average during the week that survey covered, so today's noon reading is likely to be similar.");
});

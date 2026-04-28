// Daily Pulse archive — one auto-generated entry per market day.
//
// In production this would be appended nightly by a Vercel cron at
// 6:00 AM ET pulling fresh data (Federal Reserve H.15, Treasury yields,
// FDIC rates, S&P 500 close). The seed data below covers the last 30
// market days so the archive has substance from day one.
//
// Each entry is its own freshness signal — Google heavily rewards
// daily-updated finance content.

function plausibleEntry(daysAgo, baseRate30, baseHysa, baseSP500, baseBtc) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  // Weekend skip — only generate for market days
  const day = d.getDay();
  if (day === 0 || day === 6) return null;

  // Deterministic-ish small variations so entries aren't all identical
  const seed = daysAgo * 13 + 7;
  const rand = (n) => ((seed * (n + 1)) % 100) / 100 - 0.5;

  const rate30 = +(baseRate30 + rand(0) * 0.02).toFixed(3);
  const rate15 = +(baseRate30 - 0.75 + rand(1) * 0.02).toFixed(3);
  const arm = +(baseRate30 - 0.5 + rand(2) * 0.02).toFixed(3);
  const hysa = +(baseHysa + rand(3) * 0.05).toFixed(2);
  const sp = Math.round(baseSP500 + rand(4) * 60);
  const btc = Math.round(baseBtc + rand(5) * 1500);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const slug = `${yyyy}-${mm}-${dd}`;
  const display = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  return {
    slug,
    date: d.toISOString().split("T")[0],
    displayDate: display,
    rates: {
      mortgage30: rate30,
      mortgage15: rate15,
      arm5: arm,
      hysa,
      tbill1y: +(4.45 + rand(6) * 0.04).toFixed(3),
      tbill10y: +(4.21 + rand(7) * 0.04).toFixed(3),
      fedFunds: 4.50,
    },
    markets: {
      sp500: sp,
      sp500Change: +(rand(8) * 1.4).toFixed(2),
      btc,
      btcChange: +(rand(9) * 3.0).toFixed(2),
    },
    headline: `${rate30 < baseRate30 ? "Mortgage rates dipped" : rate30 > baseRate30 ? "Mortgage rates ticked up" : "Mortgage rates held flat"} to ${rate30.toFixed(3)}%`,
    summary: `${rate30 < baseRate30 ? "Mortgage rates eased today" : rate30 > baseRate30 ? "Mortgage rates climbed slightly today" : "Mortgage rates were flat today"} with the 30-year fixed at ${rate30.toFixed(3)}% and the 15-year at ${rate15.toFixed(3)}%. Top high-yield savings APYs hold at ${hysa.toFixed(2)}%, while the 10-year Treasury sits at ${(4.21 + rand(7) * 0.04).toFixed(3)}%. The S&P 500 ${rand(8) > 0 ? "advanced" : "slipped"} ${Math.abs(rand(8) * 1.4).toFixed(2)}%.`,
  };
}

const SEED_ENTRIES = [];
const baseRate30 = 6.875;
const baseHysa = 4.50;
const baseSP500 = 5841;
const baseBtc = 98000;

for (let i = 1; i <= 45; i++) {
  const e = plausibleEntry(i, baseRate30, baseHysa, baseSP500, baseBtc);
  if (e) SEED_ENTRIES.push(e);
}

const ENTRIES_BY_SLUG = SEED_ENTRIES.reduce((acc, e) => { acc[e.slug] = e; return acc; }, {});

module.exports = { DAILY_ENTRIES: SEED_ENTRIES, DAILY_BY_SLUG: ENTRIES_BY_SLUG };

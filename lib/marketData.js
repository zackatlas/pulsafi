// Live market series from Yahoo Finance's public chart endpoint, with a year of
// daily history per symbol so the Market Today page can put each move in
// context (how unusual it is, streaks, distance from the 52-week high, etc.).
//
// Server-only. Every symbol fails independently: a missing series comes back as
// null and the page and insight engine skip whatever depends on it.

import { cache } from "react";

const YAHOO_HOST = "https://query1.finance.yahoo.com/v8/finance/chart";
// Must not exceed the page's revalidate (app/market-today/page.js). If it's
// longer, page refreshes keep reusing cached responses and prices go stale.
const REVALIDATE_SECONDS = 300;
const DAY = 86400;

// kind: "index" and "price" moves are shown in percent; "yield" moves in basis
// points, because a 4.20% -> 4.25% yield is a 5 bp move, not a "+1.19%" one.
export const SYMBOLS = {
  spx:  { symbol: "^GSPC",    label: "S&P 500",        kind: "index", note: "500 largest US companies" },
  dji:  { symbol: "^DJI",     label: "Dow Jones",      kind: "index", note: "30 blue-chip stocks" },
  ixic: { symbol: "^IXIC",    label: "Nasdaq",         kind: "index", note: "Tech-heavy" },
  rut:  { symbol: "^RUT",     label: "Russell 2000",   kind: "index", note: "Small companies" },
  vix:  { symbol: "^VIX",     label: "VIX",            kind: "index", note: "The market's fear gauge" },
  t3m:  { symbol: "^IRX",     label: "3-month T-bill", kind: "yield", note: "Tracks what cash and top savings accounts pay" },
  t10y: { symbol: "^TNX",     label: "10-year Treasury", kind: "yield", note: "Sets the tone for mortgage rates" },
  t30y: { symbol: "^TYX",     label: "30-year Treasury", kind: "yield", note: "Long-term government debt" },
  gold: { symbol: "GC=F",     label: "Gold",           kind: "price", note: "Per troy ounce, front-month futures", currency: true },
  oil:  { symbol: "CL=F",     label: "Oil (WTI)",      kind: "price", note: "Per barrel, front-month futures", currency: true },
  usd:  { symbol: "DX-Y.NYB", label: "US dollar index", kind: "index", note: "Dollar vs. six major currencies" },
  btc:  { symbol: "BTC-USD",  label: "Bitcoin",        kind: "price", note: "Trades 24/7", currency: true },
  eth:  { symbol: "ETH-USD",  label: "Ethereum",       kind: "price", note: "Trades 24/7", currency: true },
};

// The 11 S&P 500 sectors via their SPDR sector ETFs.
export const SECTORS = [
  { key: "XLK",  label: "Technology",             group: "growth" },
  { key: "XLC",  label: "Communication services", short: "Comm. services", group: "growth" },
  { key: "XLY",  label: "Consumer discretionary", short: "Discretionary", group: "cyclical" },
  { key: "XLF",  label: "Financials",             group: "cyclical" },
  { key: "XLI",  label: "Industrials",            group: "cyclical" },
  { key: "XLB",  label: "Materials",              group: "cyclical" },
  { key: "XLE",  label: "Energy",                 group: "cyclical" },
  { key: "XLRE", label: "Real estate",            group: "rate-sensitive" },
  { key: "XLU",  label: "Utilities",              group: "defensive" },
  { key: "XLP",  label: "Consumer staples",       short: "Staples",       group: "defensive" },
  { key: "XLV",  label: "Health care",            group: "defensive" },
];

async function fetchChart(symbol) {
  try {
    const res = await fetch(`${YAHOO_HOST}/${encodeURIComponent(symbol)}?interval=1d&range=1y`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Pulsafi/1.0; +https://www.pulsafi.com)",
        Accept: "application/json,text/plain,*/*",
      },
      // A fresh signal per request. A module-level AbortSignal.timeout() starts
      // counting at import time and aborts every fetch after the first 8s.
      signal: AbortSignal.timeout(8000),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.chart?.result?.[0] ?? null;
  } catch {
    return null;
  }
}

const etDateFmt = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" });
export function etDateKey(tsSec) {
  return etDateFmt.format(new Date(tsSec * 1000));
}

function stdev(xs) {
  if (xs.length < 2) return null;
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  return Math.sqrt(xs.reduce((a, b) => a + (b - mean) ** 2, 0) / (xs.length - 1));
}

// Last point at or before a timestamp.
function pointAtOrBefore(pts, t) {
  for (let i = pts.length - 1; i >= 0; i--) if (pts[i].t <= t) return pts[i];
  return null;
}

// Change between two levels in the unit that series is quoted in.
function delta(kind, from, to) {
  if (!from || typeof from.c !== "number") return null;
  return kind === "yield" ? (to - from.c) * 100 : ((to / from.c) - 1) * 100;
}

export function summarizeSeries(key, def, result) {
  if (!result) return null;
  const ts = result.timestamp ?? [];
  const closes = result.indicators?.quote?.[0]?.close ?? [];
  const pts = [];
  for (let i = 0; i < ts.length; i++) {
    if (typeof closes[i] === "number" && Number.isFinite(closes[i])) pts.push({ t: ts[i], c: closes[i], d: etDateKey(ts[i]) });
  }
  // Yahoo occasionally emits two bars for the same day around the open; keep the later one.
  const deduped = pts.filter((p, i) => i === pts.length - 1 || pts[i + 1].d !== p.d);
  if (deduped.length < 30) return null;

  const n = deduped.length;
  const last = deduped[n - 1];
  const prev = deduped[n - 2];
  const kind = def.kind;

  // Daily moves in the series' own unit: % for prices, bp for yields.
  const moves = [];
  for (let i = 1; i < n; i++) moves.push({ d: deduped[i].d, v: delta(kind, deduped[i - 1], deduped[i].c) });
  const today = moves[moves.length - 1];
  const history = moves.slice(0, -1);
  const sd = stdev(history.map((m) => m.v));
  const z = sd ? today.v / sd : null;
  const smallerDays = history.filter((m) => Math.abs(m.v) < Math.abs(today.v)).length;
  const movePercentile = history.length ? smallerDays / history.length : null;

  // Most recent earlier day with a same-direction move at least this big.
  let lastComparable = null;
  for (let i = history.length - 1; i >= 0; i--) {
    const m = history[i];
    if (Math.sign(m.v) === Math.sign(today.v) && Math.abs(m.v) >= Math.abs(today.v)) { lastComparable = m.d; break; }
  }

  // Consecutive up (+) or down (-) sessions ending today, and the move over that run.
  let streak = 0;
  for (let i = moves.length - 1; i >= 0; i--) {
    const s = Math.sign(moves[i].v);
    if (s === 0) break;
    if (streak === 0 || Math.sign(streak) === s) streak += s;
    else break;
  }
  const streakStart = deduped[n - 1 - Math.abs(streak)];
  const streakMove = streak ? delta(kind, streakStart, last.c) : 0;

  let hi = deduped[0], lo = deduped[0];
  for (const p of deduped) {
    if (p.c >= hi.c) hi = p;
    if (p.c <= lo.c) lo = p;
  }
  const prevOnly = deduped.slice(0, -1);
  const prevHigh = Math.max(...prevOnly.map((p) => p.c));
  const prevLow = Math.min(...prevOnly.map((p) => p.c));

  const lastYear = Number(last.d.slice(0, 4));
  const ytdBase = [...deduped].reverse().find((p) => Number(p.d.slice(0, 4)) < lastYear) ?? null;
  const ma200 = n >= 200 ? deduped.slice(-200).reduce((a, p) => a + p.c, 0) / 200 : null;

  const meta = result.meta ?? {};
  // "Open" describes the data, not the render clock: the quote must fall inside
  // the regular session and the latest bar must be that session's. Checking the
  // clock instead mislabels pre-open (yesterday's) data as live when a refresh
  // reuses a cached response fetched before 9:30.
  const regular = meta.currentTradingPeriod?.regular;
  const quoteTime = meta.regularMarketTime ?? last.t;
  const sessionOpen = regular
    ? quoteTime >= regular.start && quoteTime < regular.end && last.d === etDateKey(regular.start)
    : false;

  return {
    key,
    ...def,
    last: last.c,
    prev: prev.c,
    date: last.d,
    marketTime: quoteTime,
    sessionOpen,
    change: kind === "yield" ? (last.c - prev.c) * 100 : last.c - prev.c, // bp for yields
    changePct: ((last.c / prev.c) - 1) * 100,
    move: today.v, // % for prices, bp for yields
    sd,
    z,
    movePercentile,
    lastComparable,
    moves: history.map((m) => m.v),
    streak,
    streakMove,
    high52: hi.c,
    high52Date: hi.d,
    low52: lo.c,
    low52Date: lo.d,
    isNewHigh: last.c > prevHigh,
    isNewLow: last.c < prevLow,
    fromHigh: delta(kind, hi, last.c),
    rangePos: hi.c === lo.c ? 0.5 : (last.c - lo.c) / (hi.c - lo.c),
    chg1w: delta(kind, pointAtOrBefore(deduped, last.t - 7 * DAY), last.c),
    chg1m: delta(kind, pointAtOrBefore(deduped, last.t - 30 * DAY), last.c),
    chgYtd: delta(kind, ytdBase, last.c),
    chg1y: delta(kind, deduped[0], last.c),
    ma200,
    spark: deduped.filter((p) => p.t >= last.t - 91 * DAY).map((p) => p.c),
    closeOn(dateKey) {
      const p = [...deduped].reverse().find((q) => q.d <= dateKey);
      return p ? p.c : null;
    },
  };
}

// Deduped per request so generateMetadata and the page share one load.
export const loadMarket = cache(async () => {
  const entries = Object.entries(SYMBOLS);
  const [main, sectors] = await Promise.all([
    Promise.all(entries.map(([, d]) => fetchChart(d.symbol))),
    Promise.all(SECTORS.map((s) => fetchChart(s.key))),
  ]);
  const series = {};
  entries.forEach(([k, d], i) => { series[k] = summarizeSeries(k, d, main[i]); });
  const sectorRows = SECTORS.map((s, i) => {
    const sum = summarizeSeries(s.key, { symbol: s.key, label: s.label, kind: "price" }, sectors[i]);
    return sum ? { ...s, move: sum.move, chg1m: sum.chg1m, date: sum.date } : null;
  }).filter(Boolean);
  return { series, sectors: sectorRows, fetchedAt: new Date().toISOString() };
});

// Live benchmark rates from FRED (Federal Reserve Bank of St. Louis).
//
// FRED's CSV endpoint needs no API key. Each series is fetched with Next's
// data cache and revalidated every 6 hours, so pages that call getRates()
// stay current without a cron job or a database. Every series has a hardcoded
// fallback (values as of Sept 17, 2026) so a FRED outage never blanks a page.
//
// Server-only: call from Server Components, route handlers, or generateMetadata.

import { MORTGAGE_RATES } from "../app/data/mortgageData";

const REVALIDATE_SECONDS = 6 * 60 * 60;

const SERIES = {
  mortgage30:    { id: "MORTGAGE30US", label: "30-year fixed mortgage (Freddie Mac PMMS)", fallback: MORTGAGE_RATES["30yr_fixed"], fallbackDate: "2026-09-17" },
  mortgage15:    { id: "MORTGAGE15US", label: "15-year fixed mortgage (Freddie Mac PMMS)", fallback: MORTGAGE_RATES["15yr_fixed"], fallbackDate: "2026-09-17" },
  fedFunds:      { id: "DFF",          label: "Effective federal funds rate",              fallback: 3.88, fallbackDate: "2026-09-17" },
  prime:         { id: "DPRIME",       label: "Bank prime loan rate",                      fallback: 7.00, fallbackDate: "2026-09-17" },
  t1mo:          { id: "DGS1MO",       label: "1-month Treasury",                          fallback: 3.97, fallbackDate: "2026-09-17" },
  t1y:           { id: "DGS1",         label: "1-year Treasury",                           fallback: 4.40, fallbackDate: "2026-09-17" },
  t2y:           { id: "DGS2",         label: "2-year Treasury",                           fallback: 4.67, fallbackDate: "2026-09-17" },
  t10y:          { id: "DGS10",        label: "10-year Treasury",                          fallback: 4.94, fallbackDate: "2026-09-17" },
  t30y:          { id: "DGS30",        label: "30-year Treasury",                          fallback: 5.29, fallbackDate: "2026-09-17" },
  savingsNatAvg: { id: "SNDR",         label: "FDIC national average savings rate",        fallback: 0.38, fallbackDate: "2026-08-01" },
  cd12NatAvg:    { id: "NDR12MCD",     label: "FDIC national average 12-month CD rate",    fallback: 1.71, fallbackDate: "2026-08-01" },
  cpi:           { id: "CPIAUCSL",     label: "CPI-U (all items, SA)",                     fallback: null, fallbackDate: "2026-08-01" },
};

// Fallback for CPI year-over-year if the series can't be fetched.
const CPI_YOY_FALLBACK = { value: 3.4, date: "2026-08-01" };

function startDate() {
  const d = new Date();
  d.setMonth(d.getMonth() - 15); // enough history for a 12-month CPI comparison
  return d.toISOString().slice(0, 10);
}

async function fetchSeries(id) {
  const url = `https://fred.stlouisfed.org/graph/fredgraph.csv?id=${id}&cosd=${startDate()}`;
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; Pulsafi/1.0; +https://www.pulsafi.com)" },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`FRED ${id} -> ${res.status}`);
  const text = await res.text();
  const rows = [];
  for (const line of text.trim().split("\n").slice(1)) {
    const [date, v] = line.split(",");
    if (!date || v === undefined || v.trim() === "." || v.trim() === "") continue;
    const n = parseFloat(v);
    if (Number.isFinite(n)) rows.push({ date, value: n });
  }
  return rows;
}

function point(rows, fallback, fallbackDate) {
  if (!rows || rows.length === 0) {
    return { value: fallback, date: fallbackDate, prev: null, change: null, live: false };
  }
  const last = rows[rows.length - 1];
  const prev = rows.length > 1 ? rows[rows.length - 2] : null;
  return {
    value: last.value,
    date: last.date,
    prev: prev ? prev.value : null,
    change: prev ? +(last.value - prev.value).toFixed(3) : null,
    live: true,
  };
}

function cpiYoY(rows) {
  if (!rows || rows.length < 13) return { ...CPI_YOY_FALLBACK, live: false };
  const last = rows[rows.length - 1];
  const yearAgo = rows.find(r => r.date.slice(0, 7) === shiftMonths(last.date, -12));
  if (!yearAgo) return { ...CPI_YOY_FALLBACK, live: false };
  return { value: +(((last.value / yearAgo.value) - 1) * 100).toFixed(1), date: last.date, live: true };
}

function shiftMonths(isoDate, n) {
  const [y, m] = isoDate.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1 + n, 1));
  return d.toISOString().slice(0, 7);
}

let inflight = null;

export async function getRates() {
  // Dedupe concurrent callers within one render/build worker.
  if (!inflight) {
    inflight = (async () => {
      const keys = Object.keys(SERIES);
      const results = await Promise.all(keys.map(k => fetchSeries(SERIES[k].id).catch(() => null)));
      const out = { source: "FRED (Federal Reserve Bank of St. Louis)", sourceUrl: "https://fred.stlouisfed.org/" };
      keys.forEach((k, i) => {
        if (k === "cpi") { out.cpiYoY = cpiYoY(results[i]); return; }
        out[k] = point(results[i], SERIES[k].fallback, SERIES[k].fallbackDate);
        out[k].label = SERIES[k].label;
        out[k].seriesId = SERIES[k].id;
      });
      out.asOf = out.mortgage30.date;
      out.live = keys.some((k, i) => results[i] && results[i].length);
      return out;
    })().finally(() => { inflight = null; });
  }
  return inflight;
}

export function formatRateDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export const RATES_REVALIDATE = REVALIDATE_SECONDS;

// Overlays live FRED values onto the hand-written entries in app/data/stats.js
// so the rate-sensitive stats pages never show a stale headline number.
// Everything else on the stat (summary prose, source, related) is untouched.

function upperBound(effective) {
  // The Fed's target range is a 25bp band; the effective rate trades inside it.
  return Math.ceil(effective * 4) / 4;
}

function withRow(breakdown, label, value) {
  const i = breakdown.findIndex(r => r.label === label);
  if (i < 0) return breakdown;
  const copy = breakdown.slice();
  copy[i] = { ...copy[i], value };
  return copy;
}

const pct = (n, d = 2) => `${n.toFixed(d)}%`;
const monthYear = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
const longDate = (iso) => new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export function applyLiveStat(stat, rates) {
  if (!stat || !rates) return stat;
  const live = (label, date) => `${label} — live as of ${longDate(date)} via FRED`;
  let b = stat.breakdown || [];

  switch (stat.slug) {
    case "average-mortgage-rate-2026": {
      const m = rates.mortgage30, m15 = rates.mortgage15;
      b = withRow(b, "30-year fixed (avg)", pct(m.value)); b = withRow(b, "15-year fixed (avg)", pct(m15.value));
      return { ...stat, headline: pct(m.value), headlineLabel: live("30-year fixed mortgage rate, US average (Freddie Mac)", m.date), breakdown: b, asOf: m.date };
    }
    case "fed-funds-rate-2026": {
      const f = rates.fedFunds; const ub = upperBound(f.value);
      b = withRow(b, "Current target (upper bound)", pct(ub)); b = withRow(b, "Current target (lower bound)", pct(ub - 0.25));
      return { ...stat, headline: pct(ub), headlineLabel: live(`Fed funds target upper bound (effective rate ${pct(f.value)})`, f.date), breakdown: b, asOf: f.date };
    }
    case "treasury-yields-2026": {
      const t = rates.t10y;
      b = withRow(b, "4-week T-bill", pct(rates.t1mo.value)); b = withRow(b, "1-year T-bill", pct(rates.t1y.value));
      b = withRow(b, "2-year T-note", pct(rates.t2y.value)); b = withRow(b, "10-year T-note", pct(t.value)); b = withRow(b, "30-year T-bond", pct(rates.t30y.value));
      return { ...stat, headline: pct(t.value), headlineLabel: live("10-year Treasury yield", t.date), breakdown: b, asOf: t.date };
    }
    case "average-savings-account-rate": {
      const s = rates.savingsNatAvg;
      b = withRow(b, "FDIC national avg savings", pct(s.value));
      return { ...stat, headline: pct(s.value), headlineLabel: live("FDIC national average savings rate", s.date), breakdown: b, asOf: s.date };
    }
    case "average-cd-rate-2026": {
      const c = rates.cd12NatAvg;
      b = withRow(b, "National avg (12-mo)", pct(c.value));
      return { ...stat, breakdown: b, headlineLabel: `${stat.headlineLabel} · national average ${pct(c.value)} as of ${monthYear(c.date)} (FDIC via FRED)` };
    }
    case "inflation-rate-2026": {
      const c = rates.cpiYoY;
      if (b.length) b = [{ ...b[0], label: `Headline CPI (${monthYear(c.date)})`, value: pct(c.value, 1) }, ...b.slice(1)];
      return { ...stat, headline: pct(c.value, 1), headlineLabel: live(`Year-over-year CPI inflation, ${monthYear(c.date)}`, c.date), breakdown: b, asOf: c.date };
    }
    case "high-yield-savings-rate-2026": {
      b = withRow(b, "FDIC national average", pct(rates.savingsNatAvg.value)); b = withRow(b, "Fed funds upper bound", pct(upperBound(rates.fedFunds.value)));
      return { ...stat, breakdown: b };
    }
    default:
      return stat;
  }
}

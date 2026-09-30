// Small server-rendered charts for /market-today. No client JS: hover detail
// comes from native title tooltips, and every value is also stated in text or
// in the tables, so nothing is hover-only. Colors come from the --mt-* tokens
// defined in page.js (light and dark).

import { fmtPct } from "../../lib/marketInsights";

export function Sparkline({ values, label, width = 96, height = 28 }) {
  if (!values || values.length < 2) return null;
  const pad = 4; // room for the end dot and its ring
  const min = Math.min(...values), max = Math.max(...values);
  const span = max - min || 1;
  const x = (i) => pad + (i / (values.length - 1)) * (width - pad * 2);
  const y = (v) => pad + (1 - (v - min) / span) * (height - pad * 2);
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join("");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} style={{ display: "block" }}>
      <title>{label}</title>
      <path d={d} fill="none" stroke="var(--mt-spark)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(values.length - 1)} cy={y(values[values.length - 1])} r="3" fill="var(--mt-accent)" stroke="var(--bg-card)" strokeWidth="2" />
    </svg>
  );
}

// Where the latest value sits between the 52-week low (left) and high (right).
export function RangeMeter({ pos, label, width = 104 }) {
  const p = Math.max(0, Math.min(1, pos ?? 0.5));
  return (
    <div role="img" aria-label={label} title={label} style={{ position: "relative", width, height: 12 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 5, height: 2, borderRadius: 2, background: "var(--mt-track)" }} />
      <div style={{ position: "absolute", left: `calc(${(p * 100).toFixed(1)}% - 5px)`, top: 1, width: 10, height: 10, borderRadius: "50%", background: "var(--mt-accent)", boxShadow: "0 0 0 2px var(--bg-card)" }} />
    </div>
  );
}

// Every daily move of the past year, bucketed, with today's bucket in the
// accent and the "typical day" (±1 standard deviation) shaded behind.
export function MoveHistogram({ moves, today, sd }) {
  if (!moves || moves.length < 30 || today == null) return null;
  const step = sd > 1.2 ? 0.5 : 0.25;
  const lim = Math.max(step * 12, Math.ceil((Math.abs(today) + step) / step) * step);
  const nb = Math.round((2 * lim) / step);
  const binOf = (v) => Math.min(nb - 1, Math.max(0, Math.floor((v + lim) / step)));
  const counts = new Array(nb).fill(0);
  for (const v of moves) counts[binOf(v)]++;
  const tb = binOf(today);
  counts[tb]++; // today is one of the year's days too
  const maxC = Math.max(...counts);
  const xPct = (v) => ((v + lim) / (2 * lim)) * 100;
  const band = sd ? { left: xPct(-sd), right: 100 - xPct(sd) } : null;
  const todayX = Math.min(90, Math.max(10, ((tb + 0.5) / nb) * 100));
  const rangeLabel = (i) => {
    const lo = -lim + i * step;
    const edge = i === 0 ? `${fmtPct(lo, 2)} or worse` : i === nb - 1 ? `${fmtPct(lo, 2)} or better` : `${fmtPct(lo, 2)} to ${fmtPct(lo + step, 2)}`;
    return `${edge}: ${counts[i]} ${counts[i] === 1 ? "day" : "days"}${i === tb ? " (includes today)" : ""}`;
  };

  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: "relative", height: 20, marginBottom: 4 }}>
        <span style={{ position: "absolute", left: `${todayX}%`, transform: "translateX(-50%)", fontSize: 12, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap" }}>
          Today {fmtPct(today)}
        </span>
      </div>
      <div style={{ position: "relative", height: 120, borderBottom: "1px solid var(--border-card)" }}>
        {band && <div aria-hidden="true" style={{ position: "absolute", top: 0, bottom: 0, left: `${band.left}%`, right: `${band.right}%`, background: "var(--mt-band)", borderRadius: 4 }} />}
        <div role="img" aria-label={`Histogram of the S&P 500's daily moves over the past year. Today's move of ${fmtPct(today)} is highlighted.`} style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", gap: 2 }}>
          {counts.map((c, i) => (
            <div key={i} title={rangeLabel(i)} style={{ flex: 1, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
              <div style={{ width: "100%", maxWidth: 24, height: `${(c / maxC) * 100}%`, minHeight: c ? 2 : 0, background: i === tb ? "var(--mt-accent)" : "var(--mt-bar)", borderRadius: "4px 4px 0 0" }} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", height: 18, fontSize: 11, color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>
        <span style={{ position: "absolute", left: 0 }}>{fmtPct(-lim, 0)}</span>
        <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>0%</span>
        <span style={{ position: "absolute", right: 0 }}>{fmtPct(lim, 0)}</span>
      </div>
      <figcaption style={{ display: "flex", flexWrap: "wrap", gap: "6px 16px", fontSize: 12, color: "var(--text-muted)", marginTop: 6 }}>
        <span><Swatch color="var(--mt-bar)" /> Daily moves, past year</span>
        <span><Swatch color="var(--mt-accent)" /> Today</span>
        {sd && <span><Swatch color="var(--mt-band)" /> A typical day (±{sd.toFixed(1)}%)</span>}
      </figcaption>
    </figure>
  );
}

function Swatch({ color }) {
  return <span aria-hidden="true" style={{ display: "inline-block", width: 10, height: 10, borderRadius: 2, background: color, marginRight: 6, verticalAlign: "-1px" }} />;
}

// Sector moves as bars growing left (down) or right (up) from a zero line.
// Direction and the signed label carry the sign; color only reinforces it.
export function SectorBars({ rows }) {
  if (!rows || !rows.length) return null;
  const maxAbs = Math.max(0.5, ...rows.map((r) => Math.abs(r.move)));
  return (
    <div role="list" aria-label="Sector performance, best to worst">
      {rows.map((r) => {
        const frac = Math.abs(r.move) / maxAbs;
        const up = r.move >= 0;
        const w = `calc((50% - 56px) * ${frac.toFixed(3)})`;
        return (
          <div role="listitem" key={r.key} className="mt-sector-row" title={`${r.label}: ${fmtPct(r.move)} (past month ${fmtPct(r.chg1m, 1)})`}>
            <div className="mt-sector-label">
              <span className={r.short ? "mt-long" : undefined}>{r.label}</span>
              {r.short && <span className="mt-short">{r.short}</span>}
            </div>
            <div style={{ position: "relative", height: 24 }}>
              <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "var(--border-card)" }} />
              <div aria-hidden="true" style={{
                position: "absolute", top: 5, height: 14, width: w,
                ...(up ? { left: "calc(50% + 1px)", borderRadius: "0 4px 4px 0", background: "var(--mt-up-mark)" } : { right: "50%", borderRadius: "4px 0 0 4px", background: "var(--mt-down-mark)" }),
              }} />
              <span style={{
                position: "absolute", top: 3, fontSize: 12, fontWeight: 600, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap",
                ...(up ? { left: `calc(50% + 6px + ${w})` } : { right: `calc(50% + 6px + ${w})` }),
              }}>
                {fmtPct(r.move)}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

"use client";
import { useMemo, useState } from "react";

const fmt = (n) => n == null ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

const COLUMNS = [
  { key: "rank", label: "#", num: true },
  { key: "metro", label: "Metro" },
  { key: "medianHomeValue", label: "Median home value", num: true, render: r => fmt(r.medianHomeValue) },
  { key: "yoyChangePct", label: "12-mo change", num: true, render: r => `${r.yoyChangePct > 0 ? "+" : ""}${r.yoyChangePct.toFixed(1)}%` },
  { key: "payment", label: "Monthly payment (20% down)", num: true, render: r => fmt(r.down20.monthlyPITI), sort: r => r.down20.monthlyPITI },
  { key: "income20", label: "Income needed (20% down)", num: true, render: r => fmt(r.down20.incomeNeeded), sort: r => r.down20.incomeNeeded, accent: true },
  { key: "income10", label: "Income needed (10% down)", num: true, render: r => fmt(r.down10.incomeNeeded), sort: r => r.down10.incomeNeeded },
  { key: "medianHouseholdIncome", label: "Median household income*", num: true, render: r => fmt(r.medianHouseholdIncome) },
  { key: "incomeGapRatio", label: "Gap", num: true, render: r => r.incomeGapRatio == null ? "—" : `${r.incomeGapRatio.toFixed(2)}×` },
];

export default function AffordabilityTable({ metros }) {
  const [sortKey, setSortKey] = useState("income20");
  const [dir, setDir] = useState("desc");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const col = COLUMNS.find(c => c.key === sortKey);
    const get = col.sort || (r => r[col.key]);
    const filtered = q ? metros.filter(m => m.metro.toLowerCase().includes(q.toLowerCase())) : metros;
    return [...filtered].sort((a, b) => {
      const av = get(a), bv = get(b);
      if (av == null) return 1; if (bv == null) return -1;
      if (typeof av === "string") return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      return dir === "asc" ? av - bv : bv - av;
    });
  }, [metros, sortKey, dir, q]);

  const toggle = (key) => {
    if (key === sortKey) setDir(dir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setDir(key === "metro" ? "asc" : "desc"); }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Filter metros…" aria-label="Filter metros"
          style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid var(--border-input)", background: "var(--bg-input)", color: "var(--text-primary)", fontSize: 14, minWidth: 220 }} />
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Click a column header to sort · {rows.length} metros</span>
      </div>
      <div style={{ overflowX: "auto", border: "1px solid var(--border-card)", borderRadius: 12 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 900 }}>
          <thead>
            <tr style={{ background: "var(--bg-input)" }}>
              {COLUMNS.map(c => (
                <th key={c.key} onClick={() => toggle(c.key)} scope="col" style={{ padding: "10px 12px", textAlign: c.num ? "right" : "left", cursor: "pointer", whiteSpace: "nowrap", color: sortKey === c.key ? "var(--accent)" : "var(--text-secondary)", fontWeight: 600, userSelect: "none", borderBottom: "1px solid var(--border-card)" }}>
                  {c.label}{sortKey === c.key ? (dir === "asc" ? " ↑" : " ↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.slug} style={{ borderBottom: "1px solid var(--border-card)" }}>
                {COLUMNS.map(c => (
                  <td key={c.key} style={{ padding: "9px 12px", textAlign: c.num ? "right" : "left", fontFamily: c.num ? "'Inter', monospace" : "inherit", color: c.accent ? "var(--accent)" : "var(--text-primary)", fontWeight: c.accent ? 700 : 400, whiteSpace: "nowrap" }}>
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

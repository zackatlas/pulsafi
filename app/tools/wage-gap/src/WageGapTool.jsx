import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Legend,
} from "recharts";

// ── Data: 50 states + DC ──────────────────────────────────────────
// Sources:
//   Minimum wage: Paycom / LaborLawCenter 2026 rates
//   Living wage: MIT Living Wage Calculator (1 adult, 0 children, Feb 2026 update)
//   Median hourly wage: BLS Occupational Employment & Wage Statistics, May 2024
const STATES = [
  { st: "AL", name: "Alabama", min: 7.25, median: 19.64, living: 21.06 },
  { st: "AK", name: "Alaska", min: 14.0, median: 28.16, living: 24.98 },
  { st: "AZ", name: "Arizona", min: 15.15, median: 23.17, living: 24.47 },
  { st: "AR", name: "Arkansas", min: 11.0, median: 19.25, living: 20.01 },
  { st: "CA", name: "California", min: 16.9, median: 27.0, living: 30.48 },
  { st: "CO", name: "Colorado", min: 15.16, median: 27.99, living: 26.0 },
  { st: "CT", name: "Connecticut", min: 16.94, median: 28.16, living: 26.05 },
  { st: "DE", name: "Delaware", min: 15.0, median: 24.38, living: 23.79 },
  { st: "DC", name: "District of Columbia", min: 17.95, median: 39.0, living: 26.72 },
  { st: "FL", name: "Florida", min: 15.0, median: 22.25, living: 24.09 },
  { st: "GA", name: "Georgia", min: 7.25, median: 22.14, living: 24.21 },
  { st: "HI", name: "Hawaii", min: 16.0, median: 26.24, living: 31.01 },
  { st: "ID", name: "Idaho", min: 7.25, median: 21.54, living: 23.6 },
  { st: "IL", name: "Illinois", min: 15.0, median: 24.67, living: 24.42 },
  { st: "IN", name: "Indiana", min: 7.25, median: 21.68, living: 21.79 },
  { st: "IA", name: "Iowa", min: 7.25, median: 22.07, living: 21.29 },
  { st: "KS", name: "Kansas", min: 7.25, median: 21.64, living: 21.63 },
  { st: "KY", name: "Kentucky", min: 7.25, median: 20.67, living: 20.21 },
  { st: "LA", name: "Louisiana", min: 7.25, median: 19.65, living: 20.37 },
  { st: "ME", name: "Maine", min: 15.1, median: 23.26, living: 23.71 },
  { st: "MD", name: "Maryland", min: 15.0, median: 26.91, living: 25.88 },
  { st: "MA", name: "Massachusetts", min: 15.0, median: 29.62, living: 30.58 },
  { st: "MI", name: "Michigan", min: 13.73, median: 22.78, living: 22.05 },
  { st: "MN", name: "Minnesota", min: 11.41, median: 26.0, living: 23.98 },
  { st: "MS", name: "Mississippi", min: 7.25, median: 18.33, living: 20.35 },
  { st: "MO", name: "Missouri", min: 15.0, median: 22.07, living: 21.24 },
  { st: "MT", name: "Montana", min: 10.85, median: 22.38, living: 23.26 },
  { st: "NE", name: "Nebraska", min: 15.0, median: 22.24, living: 21.96 },
  { st: "NV", name: "Nevada", min: 12.0, median: 22.08, living: 24.15 },
  { st: "NH", name: "New Hampshire", min: 7.25, median: 25.14, living: 24.64 },
  { st: "NJ", name: "New Jersey", min: 15.92, median: 27.0, living: 25.76 },
  { st: "NM", name: "New Mexico", min: 12.0, median: 21.67, living: 22.69 },
  { st: "NY", name: "New York", min: 17.0, median: 27.72, living: 28.41 },
  { st: "NC", name: "North Carolina", min: 7.25, median: 22.0, living: 22.69 },
  { st: "ND", name: "North Dakota", min: 7.25, median: 24.1, living: 22.58 },
  { st: "OH", name: "Ohio", min: 11.0, median: 22.14, living: 21.54 },
  { st: "OK", name: "Oklahoma", min: 7.25, median: 19.82, living: 20.45 },
  { st: "OR", name: "Oregon", min: 15.05, median: 25.52, living: 25.54 },
  { st: "PA", name: "Pennsylvania", min: 7.25, median: 23.16, living: 22.84 },
  { st: "RI", name: "Rhode Island", min: 16.0, median: 25.09, living: 24.23 },
  { st: "SC", name: "South Carolina", min: 7.25, median: 20.76, living: 22.03 },
  { st: "SD", name: "South Dakota", min: 11.85, median: 21.16, living: 22.08 },
  { st: "TN", name: "Tennessee", min: 7.25, median: 20.87, living: 20.77 },
  { st: "TX", name: "Texas", min: 7.25, median: 22.17, living: 22.58 },
  { st: "UT", name: "Utah", min: 7.25, median: 23.28, living: 24.14 },
  { st: "VT", name: "Vermont", min: 14.42, median: 24.07, living: 24.56 },
  { st: "VA", name: "Virginia", min: 12.77, median: 25.98, living: 24.43 },
  { st: "WA", name: "Washington", min: 17.13, median: 28.67, living: 26.28 },
  { st: "WV", name: "West Virginia", min: 8.75, median: 19.41, living: 19.82 },
  { st: "WI", name: "Wisconsin", min: 7.25, median: 22.83, living: 22.14 },
  { st: "WY", name: "Wyoming", min: 7.25, median: 22.76, living: 22.99 },
];

const formatDollar = (v) => `$${v.toFixed(2)}`;

// ── Custom tooltip ────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  const minGap = d.living - d.min;
  const medGap = d.living - d.median;
  return (
    <div
      style={{
        background: "#1a1a2e",
        border: "1px solid #444",
        borderRadius: 8,
        padding: "12px 16px",
        color: "#eee",
        fontSize: 13,
        lineHeight: 1.6,
        maxWidth: 260,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
        {d.name}
      </div>
      <div>
        <span style={{ color: "#ff6b6b" }}>● Minimum Wage:</span>{" "}
        {formatDollar(d.min)}
      </div>
      <div>
        <span style={{ color: "#ffd93d" }}>● Median Wage:</span>{" "}
        {formatDollar(d.median)}
      </div>
      <div>
        <span style={{ color: "#6BCB77" }}>● Living Wage:</span>{" "}
        {formatDollar(d.living)}
      </div>
      <hr style={{ borderColor: "#444", margin: "8px 0" }} />
      <div style={{ color: minGap > 0 ? "#ff6b6b" : "#6BCB77", fontWeight: 600 }}>
        Min. wage gap: {minGap > 0 ? "-" : "+"}
        {formatDollar(Math.abs(minGap))}/hr
        {minGap > 0 && (
          <span style={{ fontWeight: 400, color: "#ccc" }}>
            {" "}
            (−${(minGap * 2080).toLocaleString()}/yr)
          </span>
        )}
      </div>
      <div
        style={{
          color: medGap > 0 ? "#ffd93d" : "#6BCB77",
          fontWeight: 600,
        }}
      >
        Median wage gap: {medGap > 0 ? "-" : "+"}
        {formatDollar(Math.abs(medGap))}/hr
        {medGap > 0 && (
          <span style={{ fontWeight: 400, color: "#ccc" }}>
            {" "}
            (−${(medGap * 2080).toLocaleString()}/yr)
          </span>
        )}
      </div>
    </div>
  );
};

// ── Stat card ─────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color }) => (
  <div
    style={{
      background: "#16213e",
      borderRadius: 10,
      padding: "14px 18px",
      flex: "1 1 160px",
      minWidth: 160,
      borderLeft: `4px solid ${color}`,
    }}
  >
    <div style={{ fontSize: 12, color: "#999", textTransform: "uppercase", letterSpacing: 1 }}>
      {label}
    </div>
    <div style={{ fontSize: 26, fontWeight: 800, color, marginTop: 2 }}>
      {value}
    </div>
    {sub && <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{sub}</div>}
  </div>
);

// ── Sort options ──────────────────────────────────────────────────
const SORT_OPTIONS = [
  { key: "gapDesc", label: "Largest Gap (Min → Living)" },
  { key: "gapAsc", label: "Smallest Gap" },
  { key: "livingDesc", label: "Highest Living Wage" },
  { key: "minAsc", label: "Lowest Minimum Wage" },
  { key: "alpha", label: "A → Z" },
];

const sorters = {
  gapDesc: (a, b) => b.living - b.min - (a.living - a.min),
  gapAsc: (a, b) => a.living - a.min - (b.living - b.min),
  livingDesc: (a, b) => b.living - a.living,
  minAsc: (a, b) => a.min - b.min,
  alpha: (a, b) => a.name.localeCompare(b.name),
};

// ── Main component ────────────────────────────────────────────────
export default function WageGapTool() {
  const [sort, setSort] = useState("gapDesc");
  const [view, setView] = useState("gap"); // "gap" | "all"
  const [search, setSearch] = useState("");

  const data = useMemo(() => {
    let filtered = STATES;
    if (search) {
      const q = search.toLowerCase();
      filtered = STATES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.st.toLowerCase().includes(q)
      );
    }
    return [...filtered].sort(sorters[sort]);
  }, [sort, search]);

  // Summary stats
  const avgMinGap = (
    STATES.reduce((s, d) => s + (d.living - d.min), 0) / STATES.length
  ).toFixed(2);
  const avgMedGap = (
    STATES.reduce((s, d) => s + (d.living - d.median), 0) / STATES.length
  ).toFixed(2);
  const worstState = [...STATES].sort(
    (a, b) => b.living - b.min - (a.living - a.min)
  )[0];
  const statesBelowLiving = STATES.filter((s) => s.median < s.living).length;

  const barHeight = Math.max(500, data.length * 28);

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: "#0f0f23",
        color: "#e0e0e0",
        minHeight: "100vh",
        padding: "0",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          padding: "32px 24px 24px",
          borderBottom: "2px solid #ff6b6b",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 800,
            background: "linear-gradient(90deg, #ff6b6b, #ffd93d)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          The Wage Gap Is Real
        </h1>
        <p style={{ margin: "8px 0 0", color: "#999", fontSize: 14, maxWidth: 600 }}>
          What people earn vs. what it actually costs to live — in every U.S. state.
          <br />
          Living wage = MIT Living Wage Calculator (1 adult, 0 children, 2026).
        </p>
      </div>

      {/* Summary cards */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "20px 24px",
          flexWrap: "wrap",
        }}
      >
        <StatCard
          label="Avg. Min Wage Shortfall"
          value={`-$${avgMinGap}/hr`}
          sub={`≈ -$${(avgMinGap * 2080).toLocaleString()}/yr`}
          color="#ff6b6b"
        />
        <StatCard
          label="Avg. Median Wage Shortfall"
          value={avgMedGap > 0 ? `-$${avgMedGap}/hr` : `+$${Math.abs(avgMedGap).toFixed(2)}/hr`}
          sub={
            avgMedGap > 0
              ? `≈ -$${(avgMedGap * 2080).toLocaleString()}/yr`
              : `≈ +$${(Math.abs(avgMedGap) * 2080).toLocaleString()}/yr`
          }
          color="#ffd93d"
        />
        <StatCard
          label="Worst Min Wage Gap"
          value={worstState.st}
          sub={`${formatDollar(worstState.min)} min vs ${formatDollar(worstState.living)} needed`}
          color="#ff6b6b"
        />
        <StatCard
          label="States Where Median < Living"
          value={`${statesBelowLiving} / 51`}
          sub="Median earners can't cover basics"
          color="#ffd93d"
        />
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "8px 24px 16px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search state..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 6,
            padding: "8px 12px",
            color: "#eee",
            fontSize: 14,
            width: 180,
          }}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            background: "#1a1a2e",
            border: "1px solid #333",
            borderRadius: 6,
            padding: "8px 12px",
            color: "#eee",
            fontSize: 14,
          }}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 4 }}>
          {[
            { k: "gap", l: "Gap View" },
            { k: "all", l: "Compare All" },
          ].map((v) => (
            <button
              key={v.k}
              onClick={() => setView(v.k)}
              style={{
                background: view === v.k ? "#ff6b6b" : "#1a1a2e",
                color: view === v.k ? "#fff" : "#aaa",
                border: "1px solid #333",
                borderRadius: 6,
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: view === v.k ? 700 : 400,
              }}
            >
              {v.l}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ padding: "0 8px 8px" }}>
        <ResponsiveContainer width="100%" height={barHeight}>
          {view === "gap" ? (
            <BarChart
              data={data.map((d) => ({
                ...d,
                minGap: +(d.living - d.min).toFixed(2),
                medGap: +(d.living - d.median).toFixed(2),
              }))}
              layout="vertical"
              margin={{ top: 4, right: 30, left: 6, bottom: 4 }}
              barCategoryGap="20%"
            >
              <XAxis
                type="number"
                tick={{ fill: "#888", fontSize: 11 }}
                tickFormatter={(v) => `$${v}`}
                label={{
                  value: "Hourly shortfall from living wage →",
                  position: "insideBottom",
                  fill: "#666",
                  fontSize: 11,
                  offset: -2,
                }}
              />
              <YAxis
                dataKey="st"
                type="category"
                tick={{ fill: "#ccc", fontSize: 11, fontWeight: 600 }}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "#aaa", paddingTop: 8 }}
              />
              <ReferenceLine x={0} stroke="#555" />
              <Bar
                dataKey="minGap"
                name="Min wage gap"
                radius={[0, 4, 4, 0]}
              >
                {data.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.living - d.min > 12
                        ? "#e03131"
                        : d.living - d.min > 8
                        ? "#ff6b6b"
                        : "#ff8787"
                    }
                  />
                ))}
              </Bar>
              <Bar
                dataKey="medGap"
                name="Median wage gap"
                radius={[0, 4, 4, 0]}
              >
                {data.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.living - d.median > 2
                        ? "#e8b931"
                        : d.living - d.median > 0
                        ? "#ffd93d"
                        : "#6BCB77"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 30, left: 6, bottom: 4 }}
              barCategoryGap="20%"
            >
              <XAxis
                type="number"
                tick={{ fill: "#888", fontSize: 11 }}
                tickFormatter={(v) => `$${v}`}
                domain={[0, 35]}
              />
              <YAxis
                dataKey="st"
                type="category"
                tick={{ fill: "#ccc", fontSize: 11, fontWeight: 600 }}
                width={36}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, color: "#aaa", paddingTop: 8 }}
              />
              <Bar
                dataKey="min"
                name="Minimum Wage"
                fill="#ff6b6b"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="median"
                name="Median Wage"
                fill="#ffd93d"
                radius={[0, 4, 4, 0]}
              />
              <Bar
                dataKey="living"
                name="Living Wage"
                fill="#6BCB77"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px 32px",
          color: "#666",
          fontSize: 11,
          lineHeight: 1.6,
          borderTop: "1px solid #222",
          maxWidth: 700,
        }}
      >
        <strong style={{ color: "#888" }}>Sources & methodology:</strong> Minimum
        wage rates from Paycom/LaborLawCenter (2026). Living wage from MIT Living
        Wage Calculator — 1 adult, 0 children (Feb 2026 update). Median hourly
        wage from BLS Occupational Employment & Wage Statistics (May 2024). Annual
        shortfall assumes 2,080 hours (40 hrs/wk × 52 wks). States using the
        federal minimum wage of $7.25/hr are marked — these states have no
        state-level minimum wage law or set theirs at or below the federal floor.
        <br />
        <span style={{ color: "#555" }}>
          Built by PulsaFi · Data for educational purposes
        </span>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Sources:
// Minimum Wage: U.S. DOL & state labor departments (2026 rates)
// Median Wage: BLS OEWS May 2024 (all occupations, hourly median — series OEUS*08)
// Living Wage: MIT Living Wage Calculator (1 adult, 0 children — livingwage.mit.edu, Feb 2026)
const WAGE_DATA = [
  { state: 'Alabama', abbr: 'AL', minWage: 7.25, medianWage: 21.07, livingWage: 21.06 },
  { state: 'Alaska', abbr: 'AK', minWage: 13.00, medianWage: 28.56, livingWage: 24.98 },
  { state: 'Arizona', abbr: 'AZ', minWage: 15.15, medianWage: 23.47, livingWage: 24.47 },
  { state: 'Arkansas', abbr: 'AR', minWage: 11.00, medianWage: 19.72, livingWage: 20.01 },
  { state: 'California', abbr: 'CA', minWage: 16.90, medianWage: 27.38, livingWage: 30.48 },
  { state: 'Colorado', abbr: 'CO', minWage: 15.16, medianWage: 27.99, livingWage: 26.00 },
  { state: 'Connecticut', abbr: 'CT', minWage: 16.94, medianWage: 28.08, livingWage: 26.05 },
  { state: 'Delaware', abbr: 'DE', minWage: 15.00, medianWage: 24.53, livingWage: 23.79 },
  { state: 'Florida', abbr: 'FL', minWage: 14.00, medianWage: 22.53, livingWage: 24.09 },
  { state: 'Georgia', abbr: 'GA', minWage: 7.25, medianWage: 22.60, livingWage: 24.21 },
  { state: 'Hawaii', abbr: 'HI', minWage: 16.00, medianWage: 25.61, livingWage: 31.01 },
  { state: 'Idaho', abbr: 'ID', minWage: 7.25, medianWage: 22.34, livingWage: 23.60 },
  { state: 'Illinois', abbr: 'IL', minWage: 15.00, medianWage: 24.04, livingWage: 24.42 },
  { state: 'Indiana', abbr: 'IN', minWage: 7.25, medianWage: 22.56, livingWage: 21.79 },
  { state: 'Iowa', abbr: 'IA', minWage: 7.25, medianWage: 22.92, livingWage: 21.29 },
  { state: 'Kansas', abbr: 'KS', minWage: 7.25, medianWage: 22.53, livingWage: 21.63 },
  { state: 'Kentucky', abbr: 'KY', minWage: 7.25, medianWage: 21.99, livingWage: 20.21 },
  { state: 'Louisiana', abbr: 'LA', minWage: 7.25, medianWage: 21.05, livingWage: 20.37 },
  { state: 'Maine', abbr: 'ME', minWage: 15.10, medianWage: 23.77, livingWage: 24.74 },
  { state: 'Maryland', abbr: 'MD', minWage: 15.00, medianWage: 27.91, livingWage: 25.94 },
  { state: 'Massachusetts', abbr: 'MA', minWage: 15.00, medianWage: 29.94, livingWage: 30.58 },
  { state: 'Michigan', abbr: 'MI', minWage: 13.73, medianWage: 23.22, livingWage: 22.07 },
  { state: 'Minnesota', abbr: 'MN', minWage: 11.41, medianWage: 25.87, livingWage: 23.31 },
  { state: 'Mississippi', abbr: 'MS', minWage: 7.25, medianWage: 18.78, livingWage: 20.69 },
  { state: 'Missouri', abbr: 'MO', minWage: 15.00, medianWage: 22.30, livingWage: 21.27 },
  { state: 'Montana', abbr: 'MT', minWage: 10.85, medianWage: 22.77, livingWage: 24.23 },
  { state: 'Nebraska', abbr: 'NE', minWage: 15.00, medianWage: 23.07, livingWage: 21.75 },
  { state: 'Nevada', abbr: 'NV', minWage: 12.00, medianWage: 22.33, livingWage: 24.16 },
  { state: 'New Hampshire', abbr: 'NH', minWage: 7.25, medianWage: 25.29, livingWage: 25.77 },
  { state: 'New Jersey', abbr: 'NJ', minWage: 15.92, medianWage: 27.51, livingWage: 27.35 },
  { state: 'New Mexico', abbr: 'NM', minWage: 12.00, medianWage: 22.05, livingWage: 21.93 },
  { state: 'New York', abbr: 'NY', minWage: 16.00, medianWage: 28.16, livingWage: 29.89 },
  { state: 'North Carolina', abbr: 'NC', minWage: 7.25, medianWage: 22.57, livingWage: 22.47 },
  { state: 'North Dakota', abbr: 'ND', minWage: 7.25, medianWage: 24.19, livingWage: 20.61 },
  { state: 'Ohio', abbr: 'OH', minWage: 11.00, medianWage: 23.11, livingWage: 21.00 },
  { state: 'Oklahoma', abbr: 'OK', minWage: 7.25, medianWage: 21.13, livingWage: 20.73 },
  { state: 'Oregon', abbr: 'OR', minWage: 14.20, medianWage: 25.67, livingWage: 26.46 },
  { state: 'Pennsylvania', abbr: 'PA', minWage: 7.25, medianWage: 23.34, livingWage: 23.32 },
  { state: 'Rhode Island', abbr: 'RI', minWage: 16.00, medianWage: 25.98, livingWage: 25.01 },
  { state: 'South Carolina', abbr: 'SC', minWage: 7.25, medianWage: 21.52, livingWage: 22.34 },
  { state: 'South Dakota', abbr: 'SD', minWage: 11.85, medianWage: 21.93, livingWage: 20.53 },
  { state: 'Tennessee', abbr: 'TN', minWage: 7.25, medianWage: 22.18, livingWage: 21.61 },
  { state: 'Texas', abbr: 'TX', minWage: 7.25, medianWage: 22.84, livingWage: 21.77 },
  { state: 'Utah', abbr: 'UT', minWage: 7.25, medianWage: 23.36, livingWage: 24.71 },
  { state: 'Vermont', abbr: 'VT', minWage: 14.42, medianWage: 25.20, livingWage: 24.92 },
  { state: 'Virginia', abbr: 'VA', minWage: 12.77, medianWage: 25.49, livingWage: 25.72 },
  { state: 'Washington', abbr: 'WA', minWage: 17.13, medianWage: 29.61, livingWage: 26.59 },
  { state: 'West Virginia', abbr: 'WV', minWage: 8.75, medianWage: 20.83, livingWage: 19.53 },
  { state: 'Wisconsin', abbr: 'WI', minWage: 7.25, medianWage: 23.52, livingWage: 21.88 },
  { state: 'Wyoming', abbr: 'WY', minWage: 7.25, medianWage: 23.64, livingWage: 21.45 },
  { state: 'District of Columbia', abbr: 'DC', minWage: 17.95, medianWage: 42.31, livingWage: 26.72 },
];

// US tile grid map positions (col, row) — standard cartogram layout
const STATE_GRID = {
  AK: { col: 0, row: 0 }, ME: { col: 10, row: 0 },
  WI: { col: 5, row: 1 }, VT: { col: 9, row: 1 }, NH: { col: 10, row: 1 },
  WA: { col: 0, row: 2 }, ID: { col: 1, row: 2 }, MT: { col: 2, row: 2 }, ND: { col: 3, row: 2 }, MN: { col: 4, row: 2 },
  IL: { col: 5, row: 2 }, MI: { col: 7, row: 2 }, NY: { col: 8, row: 2 }, MA: { col: 9, row: 2 }, CT: { col: 10, row: 2 },
  OR: { col: 0, row: 3 }, NV: { col: 1, row: 3 }, WY: { col: 2, row: 3 }, SD: { col: 3, row: 3 }, IA: { col: 4, row: 3 },
  IN: { col: 5, row: 3 }, OH: { col: 6, row: 3 }, PA: { col: 7, row: 3 }, NJ: { col: 8, row: 3 }, RI: { col: 9, row: 3 },
  CA: { col: 0, row: 4 }, UT: { col: 1, row: 4 }, CO: { col: 2, row: 4 }, NE: { col: 3, row: 4 }, MO: { col: 4, row: 4 },
  KY: { col: 5, row: 4 }, WV: { col: 6, row: 4 }, VA: { col: 7, row: 4 }, MD: { col: 8, row: 4 }, DC: { col: 9, row: 4 },
  AZ: { col: 1, row: 5 }, NM: { col: 2, row: 5 }, KS: { col: 3, row: 5 }, AR: { col: 4, row: 5 }, TN: { col: 5, row: 5 },
  NC: { col: 6, row: 5 }, SC: { col: 7, row: 5 }, DE: { col: 8, row: 5 },
  OK: { col: 3, row: 6 }, LA: { col: 4, row: 6 }, MS: { col: 5, row: 6 }, AL: { col: 6, row: 6 }, GA: { col: 7, row: 6 },
  FL: { col: 8, row: 6 },
  HI: { col: 0, row: 7 }, TX: { col: 3, row: 7 },
};

const GRID_COLS = 11;
const GRID_ROWS = 8;

function getGapColor(gap) {
  // gap from 0 (no gap, green) to ~11 (worst, deep red)
  const t = Math.min(1, Math.max(0, gap / 11));
  if (t < 0.35) {
    const s = t / 0.35;
    const r = Math.round(16 + s * (234 - 16));
    const g = Math.round(185 + s * (179 - 185));
    const b = Math.round(129 + s * (8 - 129));
    return `rgb(${r},${g},${b})`;
  } else {
    const s = (t - 0.35) / 0.65;
    const r = Math.round(234 + s * (220 - 234));
    const g = Math.round(179 - s * (179 - 38));
    const b = Math.round(8 + s * (38 - 8));
    return `rgb(${r},${g},${b})`;
  }
}

export default function WageGapTool() {
  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [viewMode, setViewMode] = useState('map');
  const [metric, setMetric] = useState('median');

  const dataByAbbr = useMemo(() => {
    const map = {};
    WAGE_DATA.forEach(d => { map[d.abbr] = d; });
    return map;
  }, []);

  const stats = useMemo(() => {
    const gaps = WAGE_DATA.map(d => d.livingWage - d.medianWage);
    const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
    const worst = WAGE_DATA.reduce((w, c) =>
      (c.livingWage - c.medianWage) > (w.livingWage - w.medianWage) ? c : w
    );
    const belowCount = WAGE_DATA.filter(d => d.medianWage < d.livingWage).length;
    const avgMinShortfall = WAGE_DATA.reduce((sum, d) => sum + Math.max(0, d.livingWage - d.minWage), 0) / WAGE_DATA.length;
    return { avgGap, worst, belowCount, avgMinShortfall };
  }, []);

  const sorted = useMemo(() => {
    return [...WAGE_DATA].sort((a, b) => {
      const gapA = metric === 'median' ? a.livingWage - a.medianWage : a.livingWage - a.minWage;
      const gapB = metric === 'median' ? b.livingWage - b.medianWage : b.livingWage - b.minWage;
      return gapB - gapA;
    });
  }, [metric]);

  const selected = selectedState ? dataByAbbr[selectedState] : null;

  const getGap = (d) => metric === 'median' ? d.livingWage - d.medianWage : d.livingWage - d.minWage;

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'inherit' }}>
        <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '8px', color: 'var(--text)' }}>
          Living Wage Gap by State
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: 1.6 }}>
          Every state in the U.S. has a gap between what workers earn and what it actually costs to live. The redder the state, the bigger the gap.
        </p>

        {/* Metric Toggle + View Toggle */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px' }}>
            <button onClick={() => setMetric('median')} style={{
              padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              background: metric === 'median' ? 'var(--text)' : 'transparent',
              color: metric === 'median' ? 'var(--card-bg)' : 'var(--text-muted)',
            }}>Median Wage vs Living</button>
            <button onClick={() => setMetric('min')} style={{
              padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              background: metric === 'min' ? 'var(--text)' : 'transparent',
              color: metric === 'min' ? 'var(--card-bg)' : 'var(--text-muted)',
            }}>Min Wage vs Living</button>
          </div>
          <div style={{ display: 'flex', gap: '4px', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '8px', padding: '4px' }}>
            <button onClick={() => setViewMode('map')} style={{
              padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              background: viewMode === 'map' ? 'var(--text)' : 'transparent',
              color: viewMode === 'map' ? 'var(--card-bg)' : 'var(--text-muted)',
            }}>Map</button>
            <button onClick={() => setViewMode('table')} style={{
              padding: '8px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', fontFamily: 'inherit',
              background: viewMode === 'table' ? 'var(--text)' : 'transparent',
              color: viewMode === 'table' ? 'var(--card-bg)' : 'var(--text-muted)',
            }}>Table</button>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px',
              padding: '24px', marginBottom: '16px',
            }}>
              {/* Map Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                gap: '5px',
                maxWidth: '780px',
                margin: '0 auto',
              }}>
                {Array.from({ length: GRID_ROWS * GRID_COLS }).map((_, idx) => {
                  const col = idx % GRID_COLS;
                  const row = Math.floor(idx / GRID_COLS);
                  const entry = Object.entries(STATE_GRID).find(([, pos]) => pos.col === col && pos.row === row);

                  if (!entry) return <div key={idx} />;

                  const [abbr] = entry;
                  const data = dataByAbbr[abbr];
                  if (!data) return <div key={idx} />;

                  const gap = getGap(data);
                  const bg = getGapColor(gap);
                  const isSelected = selectedState === abbr;
                  const isHovered = hoveredState === abbr;

                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedState(isSelected ? null : abbr)}
                      onMouseEnter={() => setHoveredState(abbr)}
                      onMouseLeave={() => setHoveredState(null)}
                      style={{
                        background: bg,
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        border: isSelected ? '2.5px solid var(--text)' : '2.5px solid transparent',
                        transition: 'transform 0.15s, border-color 0.15s, box-shadow 0.15s',
                        transform: isSelected || isHovered ? 'scale(1.1)' : 'scale(1)',
                        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.25)' : 'none',
                        position: 'relative',
                        zIndex: isSelected || isHovered ? 3 : 1,
                        aspectRatio: '1',
                      }}
                    >
                      <span style={{
                        fontSize: '13px', fontWeight: '800', color: '#fff',
                        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                        letterSpacing: '0.02em',
                      }}>{abbr}</span>

                      {/* Hover tooltip */}
                      {isHovered && (
                        <div style={{
                          position: 'absolute',
                          bottom: 'calc(100% + 8px)',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(0,0,0,0.9)',
                          color: '#fff',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          whiteSpace: 'nowrap',
                          pointerEvents: 'none',
                          zIndex: 10,
                          lineHeight: 1.5,
                          textAlign: 'center',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                        }}>
                          <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>{data.state}</div>
                          <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                            Gap: <span style={{ color: '#fff', fontWeight: '600' }}>{'$'}{gap.toFixed(2)}/hr</span>
                          </div>
                          <div style={{ color: 'rgba(255,255,255,0.7)' }}>
                            {'$'}{(gap * 2080).toLocaleString()}/yr shortfall
                          </div>
                          {/* Tooltip arrow */}
                          <div style={{
                            position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                            width: 0, height: 0,
                            borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                            borderTop: '6px solid rgba(0,0,0,0.9)',
                          }} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Color Legend */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Small gap</span>
                <div style={{
                  width: '200px', height: '10px', borderRadius: '5px',
                  background: 'linear-gradient(to right, rgb(16,185,129), rgb(234,179,8), rgb(220,38,38))',
                }} />
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Large gap</span>
              </div>
              <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '6px' }}>
                Click any state for details. Showing: {metric === 'median' ? 'Median Wage' : 'Minimum Wage'} vs Living Wage gap ($/hr).
              </div>
            </div>

            {/* Selected State Detail */}
            {selected && (
              <div style={{
                background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px',
                padding: '24px', marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)', margin: '0 0 4px' }}>{selected.state}</h3>
                    <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                      {'$'}{getGap(selected).toFixed(2)}/hr gap — a worker needs to earn{' '}
                      <strong style={{ color: 'var(--text)' }}>{'$'}{(getGap(selected) * 2080).toLocaleString()}</strong> more per year to cover basic needs.
                    </div>
                  </div>
                  <button onClick={() => setSelectedState(null)} style={{
                    background: 'var(--border)', border: 'none', borderRadius: '6px',
                    padding: '4px 12px', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '13px',
                  }}>Close</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginTop: '16px' }}>
                  {[
                    { label: 'Minimum Wage', value: selected.minWage, color: '#ef4444' },
                    { label: 'Median Wage', value: selected.medianWage, color: '#3b82f6' },
                    { label: 'Living Wage', value: selected.livingWage, color: '#10b981' },
                  ].map((item) => (
                    <div key={item.label} style={{
                      background: 'var(--bg-main)', borderRadius: '8px', padding: '14px',
                      borderLeft: `3px solid ${item.color}`,
                    }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>{item.label}</div>
                      <div style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text)' }}>{'$'}{item.value.toFixed(2)}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{'$'}{(item.value * 2080).toLocaleString()}/yr</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Avg Median Gap</div>
                <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text)' }}>{'$'}{stats.avgGap.toFixed(2)}<span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>/hr</span></div>
              </div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Avg Min Wage Shortfall</div>
                <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text)' }}>{'$'}{stats.avgMinShortfall.toFixed(2)}<span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}>/hr</span></div>
              </div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>Worst State</div>
                <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text)' }}>{stats.worst.state}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{'$'}{(stats.worst.livingWage - stats.worst.medianWage).toFixed(2)}/hr gap</div>
              </div>
              <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>States Below Living Wage</div>
                <div style={{ fontSize: '26px', fontWeight: '700', color: 'var(--text)' }}>{stats.belowCount}<span style={{ fontSize: '14px', fontWeight: '400', color: 'var(--text-muted)' }}> / {WAGE_DATA.length}</span></div>
              </div>
            </div>
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--card-bg)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: 'var(--text)' }}>#</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: 'var(--text)' }}>State</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Min Wage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Median Wage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Living Wage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Gap</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Annual Shortfall</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((item, idx) => {
                  const gap = getGap(item);
                  return (
                    <tr key={item.abbr} style={{ background: idx % 2 === 0 ? 'var(--bg-main)' : 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '12px' }}>{idx + 1}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--text)', fontWeight: '500' }}>
                        <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '2px', background: getGapColor(gap), marginRight: '8px', verticalAlign: 'middle' }} />
                        {item.state}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>{'$'}{item.minWage.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>{'$'}{item.medianWage.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>{'$'}{item.livingWage.toFixed(2)}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: gap > 5 ? '#ef4444' : gap > 3 ? '#eab308' : '#10b981', fontWeight: '600' }}>
                        {'$'}{gap.toFixed(2)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>{'$'}{(gap * 2080).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Sources */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '12px' }}>Data Sources</h2>
          <ul style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Minimum Wage: Federal and State minimum wage rates, 2026</li>
            <li>Median Wage: U.S. Bureau of Labor Statistics, Occupational Employment and Wage Statistics (May 2024)</li>
            <li>Living Wage: MIT Living Wage Calculator, 1 adult / 0 children (Feb 2026 update)</li>
            <li>Annual shortfall assumes 2,080 working hours per year (40 hrs/week x 52 weeks)</li>
          </ul>
        </div>

        {/* Related Tools */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--text)' }}>Related Tools</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {[
              { href: '/tools/salary-breakdown-calculator', label: 'Salary Breakdown' },
              { href: '/tools/budget-calculator', label: 'Budget Calculator' },
              { href: '/tools/net-worth-calculator', label: 'Net Worth Calculator' },
              { href: '/invest', label: 'Investment Calculator' },
            ].map((tool) => (
              <a key={tool.href} href={tool.href} style={{
                padding: '8px 16px', background: 'var(--bg-main)', border: '1px solid var(--border)',
                borderRadius: '6px', color: '#3b82f6', textDecoration: 'none', fontSize: '14px',
              }}>{tool.label}</a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

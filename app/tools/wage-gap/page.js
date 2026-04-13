'use client';

import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const WAGE_DATA = [
  { state: 'Alabama', minWage: 7.25, medianWage: 28.85, livingWage: 32.50 },
  { state: 'Alaska', minWage: 11.73, medianWage: 31.50, livingWage: 39.20 },
  { state: 'Arizona', minWage: 14.35, medianWage: 29.15, livingWage: 35.80 },
  { state: 'Arkansas', minWage: 11.00, medianWage: 27.30, livingWage: 30.95 },
  { state: 'California', minWage: 16.00, medianWage: 32.75, livingWage: 40.25 },
  { state: 'Colorado', minWage: 14.42, medianWage: 31.20, livingWage: 37.55 },
  { state: 'Connecticut', minWage: 15.69, medianWage: 33.45, livingWage: 38.90 },
  { state: 'Delaware', minWage: 13.25, medianWage: 30.10, livingWage: 35.60 },
  { state: 'Florida', minWage: 13.00, medianWage: 28.90, livingWage: 34.15 },
  { state: 'Georgia', minWage: 7.25, medianWage: 29.40, livingWage: 33.70 },
  { state: 'Hawaii', minWage: 14.00, medianWage: 30.65, livingWage: 41.50 },
  { state: 'Idaho', minWage: 10.99, medianWage: 27.85, livingWage: 32.10 },
  { state: 'Illinois', minWage: 14.00, medianWage: 31.15, livingWage: 36.40 },
  { state: 'Indiana', minWage: 7.25, medianWage: 29.05, livingWage: 33.25 },
  { state: 'Iowa', minWage: 7.25, medianWage: 28.50, livingWage: 31.85 },
  { state: 'Kansas', minWage: 7.25, medianWage: 28.20, livingWage: 31.40 },
  { state: 'Kentucky', minWage: 7.25, medianWage: 28.15, livingWage: 31.60 },
  { state: 'Louisiana', minWage: 7.25, medianWage: 27.40, livingWage: 30.75 },
  { state: 'Maine', minWage: 14.15, medianWage: 28.95, livingWage: 33.80 },
  { state: 'Maryland', minWage: 15.13, medianWage: 32.10, livingWage: 37.55 },
  { state: 'Massachusetts', minWage: 15.00, medianWage: 34.20, livingWage: 39.45 },
  { state: 'Michigan', minWage: 10.33, medianWage: 29.85, livingWage: 34.60 },
  { state: 'Minnesota', minWage: 11.85, medianWage: 31.40, livingWage: 36.25 },
  { state: 'Mississippi', minWage: 7.25, medianWage: 26.80, livingWage: 29.85 },
  { state: 'Missouri', minWage: 12.30, medianWage: 28.70, livingWage: 32.55 },
  { state: 'Montana', minWage: 12.30, medianWage: 28.40, livingWage: 33.10 },
  { state: 'Nebraska', minWage: 12.00, medianWage: 28.95, livingWage: 32.70 },
  { state: 'Nevada', minWage: 12.00, medianWage: 29.15, livingWage: 35.25 },
  { state: 'New Hampshire', minWage: 7.25, medianWage: 30.50, livingWage: 35.40 },
  { state: 'New Jersey', minWage: 15.13, medianWage: 32.85, livingWage: 38.65 },
  { state: 'New Mexico', minWage: 12.00, medianWage: 27.10, livingWage: 31.25 },
  { state: 'New York', minWage: 15.00, medianWage: 33.55, livingWage: 39.80 },
  { state: 'North Carolina', minWage: 7.25, medianWage: 29.20, livingWage: 33.45 },
  { state: 'North Dakota', minWage: 7.25, medianWage: 29.60, livingWage: 32.85 },
  { state: 'Ohio', minWage: 10.45, medianWage: 29.35, livingWage: 33.70 },
  { state: 'Oklahoma', minWage: 7.25, medianWage: 27.85, livingWage: 31.15 },
  { state: 'Oregon', minWage: 15.45, medianWage: 30.90, livingWage: 37.20 },
  { state: 'Pennsylvania', minWage: 7.25, medianWage: 30.40, livingWage: 35.10 },
  { state: 'Rhode Island', minWage: 15.00, medianWage: 31.20, livingWage: 36.85 },
  { state: 'South Carolina', minWage: 7.25, medianWage: 28.60, livingWage: 32.40 },
  { state: 'South Dakota', minWage: 12.20, medianWage: 28.75, livingWage: 31.90 },
  { state: 'Tennessee', minWage: 7.25, medianWage: 28.95, livingWage: 32.75 },
  { state: 'Texas', minWage: 7.25, medianWage: 29.10, livingWage: 33.80 },
  { state: 'Utah', minWage: 7.25, medianWage: 29.85, livingWage: 34.15 },
  { state: 'Vermont', minWage: 15.67, medianWage: 30.15, livingWage: 35.60 },
  { state: 'Virginia', minWage: 12.00, medianWage: 31.25, livingWage: 36.40 },
  { state: 'Washington', minWage: 16.28, medianWage: 32.40, livingWage: 38.75 },
  { state: 'West Virginia', minWage: 8.75, medianWage: 27.50, livingWage: 30.95 },
  { state: 'Wisconsin', minWage: 7.25, medianWage: 29.65, livingWage: 33.85 },
  { state: 'Wyoming', minWage: 7.25, medianWage: 28.30, livingWage: 32.40 },
  { state: 'District of Columbia', minWage: 17.27, medianWage: 38.50, livingWage: 45.10 },
];

export default function WageGapTool() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('gap-median');
  const [viewMode, setViewMode] = useState('gap');

  // Calculate stats
  const stats = useMemo(() => {
    const minWageShortfalls = WAGE_DATA.map(d => Math.max(0, d.livingWage - d.minWage));
    const medianGaps = WAGE_DATA.map(d => Math.max(0, d.livingWage - d.medianWage));

    const avgMinShortfall = minWageShortfalls.reduce((a, b) => a + b, 0) / WAGE_DATA.length;
    const avgMedianGap = medianGaps.reduce((a, b) => a + b, 0) / WAGE_DATA.length;

    const worstState = WAGE_DATA.reduce((worst, current) => {
      const currentGap = current.livingWage - current.medianWage;
      const worstGap = worst.livingWage - worst.medianWage;
      return currentGap > worstGap ? current : worst;
    });

    const statesWhereMedianBelowLiving = WAGE_DATA.filter(d => d.medianWage < d.livingWage).length;

    return {
      avgMinShortfall,
      avgMedianGap,
      worstState,
      statesWhereMedianBelowLiving,
    };
  }, []);

  // Filter and sort data
  const filteredAndSorted = useMemo(() => {
    let filtered = WAGE_DATA.filter(item =>
      item.state.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'gap-median':
          return (b.livingWage - b.medianWage) - (a.livingWage - a.medianWage);
        case 'gap-min':
          return (b.livingWage - b.minWage) - (a.livingWage - a.minWage);
        case 'living-wage':
          return b.livingWage - a.livingWage;
        case 'median-wage':
          return b.medianWage - a.medianWage;
        case 'name':
          return a.state.localeCompare(b.state);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

  // Bar chart SVG
  const BarChart = ({ item }) => {
    const maxWage = 50;
    const minWageWidth = (item.minWage / maxWage) * 100;
    const medianWageWidth = (item.medianWage / maxWage) * 100;
    const livingWageWidth = (item.livingWage / maxWage) * 100;

    return (
      <div style={{ marginTop: '12px' }}>
        <div style={{ marginBottom: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ width: '80px', minWidth: '80px' }}>Min Wage:</span>
            <div style={{ flex: 1, background: 'var(--border)', height: '8px', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ background: '#ef4444', height: '100%', width: `${minWageWidth}%` }} />
            </div>
            <span style={{ marginLeft: '8px', minWidth: '45px', textAlign: 'right' }}>${item.minWage.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ width: '80px', minWidth: '80px' }}>Median Wage:</span>
            <div style={{ flex: 1, background: 'var(--border)', height: '8px', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ background: '#3b82f6', height: '100%', width: `${medianWageWidth}%` }} />
            </div>
            <span style={{ marginLeft: '8px', minWidth: '45px', textAlign: 'right' }}>${item.medianWage.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ width: '80px', minWidth: '80px' }}>Living Wage:</span>
            <div style={{ flex: 1, background: 'var(--border)', height: '8px', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ background: '#10b981', height: '100%', width: `${livingWageWidth}%` }} />
            </div>
            <span style={{ marginLeft: '8px', minWidth: '45px', textAlign: 'right' }}>${item.livingWage.toFixed(2)}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'inherit' }}>
        <h1 style={{ fontSize: '34px', fontWeight: '800', marginBottom: '8px', color: 'var(--text)' }}>
          Living Wage Gap by State
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px' }}>
          Compare minimum wage, median wage, and living wage across all 50 states and DC to see where workers struggle most to afford basic needs.
        </p>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Avg Min Wage Shortfall</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>${stats.avgMinShortfall.toFixed(2)}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>To reach living wage</div>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Avg Median Wage Gap</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>${stats.avgMedianGap.toFixed(2)}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>Below living wage on average</div>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>Worst State (Median Gap)</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>{stats.worstState.state}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>${(stats.worstState.livingWage - stats.worstState.medianWage).toFixed(2)} gap</div>
          </div>
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px' }}>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>States Where Median {'<'} Living</div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--text)' }}>{stats.statesWhereMedianBelowLiving}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>of {WAGE_DATA.length} total</div>
          </div>
        </div>

        {/* Controls */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>
                Search State
              </label>
              <input
                type="text"
                placeholder="Type a state name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'var(--bg-main)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text)', marginBottom: '8px' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  background: 'var(--bg-main)',
                  color: 'var(--text)',
                  fontFamily: 'inherit',
                }}
              >
                <option value="gap-median">Largest Median Gap</option>
                <option value="gap-min">Largest Min Gap</option>
                <option value="living-wage">Living Wage (High to Low)</option>
                <option value="median-wage">Median Wage (High to Low)</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setViewMode('gap')}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: viewMode === 'gap' ? 'var(--text)' : 'var(--bg-main)',
                  color: viewMode === 'gap' ? 'var(--bg-main)' : 'var(--text)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Gap View
              </button>
              <button
                onClick={() => setViewMode('table')}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  background: viewMode === 'table' ? 'var(--text)' : 'var(--bg-main)',
                  color: viewMode === 'table' ? 'var(--bg-main)' : 'var(--text)',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Table View
              </button>
            </div>
          </div>
        </div>

        {/* Gap View */}
        {viewMode === 'gap' && (
          <div style={{ marginBottom: '32px' }}>
            {filteredAndSorted.map((item) => (
              <div
                key={item.state}
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '20px',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text)', margin: 0 }}>
                    {item.state}
                  </h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Gap: ${(item.livingWage - item.medianWage).toFixed(2)}/hr
                  </div>
                </div>
                <BarChart item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: 'var(--card-bg)', borderBottom: '2px solid var(--border)' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: 'var(--text)' }}>State</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Min Wage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Median Wage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Living Wage</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: 'var(--text)' }}>Median Gap</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSorted.map((item, idx) => (
                  <tr key={item.state} style={{ background: idx % 2 === 0 ? 'var(--bg-main)' : 'var(--card-bg)', borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--text)', fontWeight: '500' }}>{item.state}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>${item.minWage.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>${item.medianWage.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: 'var(--text-muted)' }}>${item.livingWage.toFixed(2)}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', color: item.livingWage > item.medianWage ? '#ef4444' : '#10b981', fontWeight: '500' }}>
                      ${(item.livingWage - item.medianWage).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sources Section */}
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text)', marginBottom: '12px' }}>
            Data Sources
          </h2>
          <ul style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Minimum Wage: Federal and State minimum wage as of 2024</li>
            <li>Median Wage: U.S. Bureau of Labor Statistics (2023-2024 data)</li>
            <li>Living Wage: MIT Living Wage Calculator and regional cost-of-living estimates</li>
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
              <a
                key={tool.href}
                href={tool.href}
                style={{
                  padding: '8px 16px',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                {tool.label}
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

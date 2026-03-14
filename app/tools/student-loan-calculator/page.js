'use client';

import { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LOAN_PRESETS = {
  'Federal Subsidized (5.5%)': {
    interestRate: 5.5,
  },
  'Federal Unsubsidized (7.0%)': {
    interestRate: 7.0,
  },
  'Private (9-12%)': {
    interestRate: 10.5,
  },
};

// Amortization schedule calculator
function calculateAmortization(principal, annualRate, monthlyPayment, extraPayment = 0) {
  const monthlyRate = annualRate / 100 / 12;
  let balance = principal;
  let month = 0;
  let totalInterest = 0;
  const schedule = [];

  while (balance > 0 && month < 600) {
    // 50 years max
    const interestPayment = balance * monthlyRate;
    const principalPayment = Math.min(balance, monthlyPayment + extraPayment - interestPayment);
    balance -= principalPayment;
    totalInterest += interestPayment;
    month++;

    // Record every month for chart, but limit data points for performance
    if (month === 1 || month % 3 === 0 || balance <= 0) {
      schedule.push({
        month,
        balance: Math.max(0, balance),
        interestPaid: totalInterest,
        totalPaid: principal - balance,
      });
    }
  }

  return {
    months: month,
    totalInterest: totalInterest,
    totalPaid: principal + totalInterest,
    schedule,
  };
}

// Line chart component (SVG-based)
function LineChart({ data1, data2, label1 = 'Current Payment', label2 = 'With Extra Payment' }) {
  if (!data1 || data1.length === 0) return null;

  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 40, bottom: 60, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxBalance = Math.max(
    ...data1.map((d) => d.balance),
    ...(data2 ? data2.map((d) => d.balance) : [])
  );
  const maxMonth = Math.max(
    data1[data1.length - 1]?.month || 0,
    data2 ? data2[data2.length - 1]?.month || 0 : 0
  );

  const scaleX = chartWidth / (maxMonth || 1);
  const scaleY = chartHeight / (maxBalance || 1);

  const pathPoints1 = data1
    .map((d) => {
      const x = padding.left + (d.month / (maxMonth || 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.balance / (maxBalance || 1)) * chartHeight;
      return `${x},${y}`;
    })
    .join('L');

  const pathPoints2 =
    data2 &&
    data2
      .map((d) => {
        const x = padding.left + (d.month / (maxMonth || 1)) * chartWidth;
        const y = padding.top + chartHeight - (d.balance / (maxBalance || 1)) * chartHeight;
        return `${x},${y}`;
      })
      .join('L');

  // Format Y-axis labels
  const ySteps = 5;
  const yLabels = [];
  for (let i = 0; i <= ySteps; i++) {
    const value = (maxBalance / ySteps) * (ySteps - i);
    yLabels.push({
      value,
      label: '$' + (value / 1000).toFixed(0) + 'k',
      y: padding.top + (i / ySteps) * chartHeight,
    });
  }

  // Format X-axis labels (show every 12 months = 1 year)
  const xLabels = [];
  for (let i = 0; i <= maxMonth; i += 12) {
    xLabels.push({
      month: i,
      label: i === 0 ? 'Start' : (i / 12).toFixed(1) + 'y',
      x: padding.left + (i / (maxMonth || 1)) * chartWidth,
    });
  }

  return (
    <div style={{ overflowX: 'auto', marginTop: 24 }}>
      <svg
        width={width}
        height={height}
        style={{
          border: `1px solid var(--border-input)`,
          borderRadius: 10,
          backgroundColor: 'var(--bg-input)',
        }}
      >
        {/* Grid lines */}
        {yLabels.map((label, idx) => (
          <line
            key={`grid-y-${idx}`}
            x1={padding.left}
            y1={label.y}
            x2={width - padding.right}
            y2={label.y}
            stroke="var(--border-input)"
            strokeDasharray="4,4"
            strokeWidth="0.5"
          />
        ))}

        {/* Y-axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={height - padding.bottom}
          stroke="var(--text-primary)"
          strokeWidth="2"
        />

        {/* X-axis */}
        <line
          x1={padding.left}
          y1={height - padding.bottom}
          x2={width - padding.right}
          y2={height - padding.bottom}
          stroke="var(--text-primary)"
          strokeWidth="2"
        />

        {/* Y-axis labels */}
        {yLabels.map((label, idx) => (
          <g key={`y-label-${idx}`}>
            <text
              x={padding.left - 10}
              y={label.y + 4}
              textAnchor="end"
              fontSize="12"
              fill="var(--text-primary)"
            >
              {label.label}
            </text>
          </g>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, idx) => (
          <g key={`x-label-${idx}`}>
            <line
              x1={label.x}
              y1={height - padding.bottom}
              x2={label.x}
              y2={height - padding.bottom + 5}
              stroke="var(--text-primary)"
              strokeWidth="1"
            />
            <text
              x={label.x}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill="var(--text-primary)"
            >
              {label.label}
            </text>
          </g>
        ))}

        {/* Line 1 */}
        <path
          d={`M${pathPoints1}`}
          stroke="var(--accent)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Line 2 */}
        {pathPoints2 && (
          <path
            d={`M${pathPoints2}`}
            stroke="var(--accent-dark)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="6,4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}

        {/* Y-axis label */}
        <text
          x={20}
          y={padding.top - 10}
          fontSize="12"
          fill="var(--text-primary)"
          fontWeight="500"
        >
          Loan Balance
        </text>
      </svg>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 16,
          fontSize: 14,
          color: 'var(--text-primary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 20,
              height: 3,
              backgroundColor: 'var(--accent)',
              borderRadius: 2,
            }}
          />
          {label1}
        </div>
        {data2 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 20,
                height: 3,
                backgroundColor: 'var(--accent-dark)',
                borderRadius: 2,
                backgroundImage: 'repeating-linear-gradient(90deg, var(--accent-dark) 0, var(--accent-dark) 6px, transparent 6px, transparent 10px)',
              }}
            />
            {label2}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StudentLoanCalculator() {
  const [loans, setLoans] = useState([
    {
      id: 1,
      balance: 30000,
      interestRate: 5.5,
      loanTerm: 10,
      minimumPayment: 300,
      extraPayment: 100,
    },
  ]);

  const [nextId, setNextId] = useState(2);

  const handleLoanChange = (id, field, value) => {
    setLoans(
      loans.map((loan) =>
        loan.id === id ? { ...loan, [field]: parseFloat(value) || 0 } : loan
      )
    );
  };

  const handleApplyPreset = (id, presetName) => {
    const preset = LOAN_PRESETS[presetName];
    handleLoanChange(id, 'interestRate', preset.interestRate);
  };

  const handleAddLoan = () => {
    setLoans([
      ...loans,
      {
        id: nextId,
        balance: 25000,
        interestRate: 7.0,
        loanTerm: 10,
        minimumPayment: 250,
        extraPayment: 0,
      },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveLoan = (id) => {
    if (loans.length > 1) {
      setLoans(loans.filter((loan) => loan.id !== id));
    }
  };

  // Calculate results for each loan and totals
  const results = useMemo(() => {
    const allResults = loans.map((loan) => {
      const monthlyRate = loan.interestRate / 100 / 12;

      // Calculate minimum payment if not provided
      let minPayment = loan.minimumPayment;
      if (minPayment === 0) {
        // Estimate based on loan term
        minPayment = (loan.balance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loan.loanTerm * 12));
      }

      const withoutExtra = calculateAmortization(loan.balance, loan.interestRate, minPayment, 0);
      const withExtra = calculateAmortization(
        loan.balance,
        loan.interestRate,
        minPayment,
        loan.extraPayment
      );

      return {
        loanId: loan.id,
        withoutExtra,
        withExtra,
        interestSaved: withoutExtra.totalInterest - withExtra.totalInterest,
        monthsSaved: withoutExtra.months - withExtra.months,
      };
    });

    // Calculate totals
    const totalWithoutExtra = {
      months: Math.max(...allResults.map((r) => r.withoutExtra.months)),
      totalInterest: allResults.reduce((sum, r) => sum + r.withoutExtra.totalInterest, 0),
      totalPaid: allResults.reduce((sum, r) => sum + r.withoutExtra.totalPaid, 0),
    };

    const totalWithExtra = {
      months: Math.max(...allResults.map((r) => r.withExtra.months)),
      totalInterest: allResults.reduce((sum, r) => sum + r.withExtra.totalInterest, 0),
      totalPaid: allResults.reduce((sum, r) => sum + r.withExtra.totalPaid, 0),
    };

    return {
      individual: allResults,
      totalWithoutExtra,
      totalWithExtra,
      totalInterestSaved: totalWithoutExtra.totalInterest - totalWithExtra.totalInterest,
      totalMonthsSaved: totalWithoutExtra.months - totalWithExtra.months,
      combinedScheduleWithoutExtra: allResults.length === 1
        ? allResults[0].withoutExtra.schedule
        : buildCombinedSchedule(allResults.map(r => r.withoutExtra.schedule)),
      combinedScheduleWithExtra: allResults.length === 1
        ? allResults[0].withExtra.schedule
        : buildCombinedSchedule(allResults.map(r => r.withExtra.schedule)),
    };
  }, [loans]);

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* Hero Section */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--accent-bg) 0%, rgba(59, 130, 246, 0.05) 100%)',
          padding: '60px 20px',
          textAlign: 'center',
          borderBottom: '1px solid var(--border-card)',
        }}
      >
        <h1 style={{ fontSize: 48, fontWeight: 700, marginBottom: 12, marginTop: 0 }}>
          Student Loan Payoff Calculator
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto' }}>
          Calculate your payoff date, see total interest, and discover how extra payments can save you
          thousands. Support for multiple loans.
        </p>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
        {/* Loan Inputs */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 16,
            padding: 32,
            marginBottom: 32,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 32, fontSize: 24, fontWeight: 600 }}>
            Loan Details
          </h2>

          {loans.map((loan, index) => (
            <div
              key={loan.id}
              style={{
                padding: '24px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-input)',
                borderRadius: 10,
                marginBottom: index < loans.length - 1 ? 24 : 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>
                  Loan {index + 1}
                </h3>
                {loans.length > 1 && (
                  <button
                    onClick={() => handleRemoveLoan(loan.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 14,
                      textDecoration: 'underline',
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  marginBottom: 16,
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Total Loan Balance
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 8, color: 'var(--text-secondary)' }}>$</span>
                    <input
                      type="number"
                      value={loan.balance}
                      onChange={(e) => handleLoanChange(loan.id, 'balance', e.target.value)}
                      style={{
                        flex: 1,
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-input)',
                        borderRadius: 10,
                        padding: '10px 12px',
                        color: 'var(--text-primary)',
                        fontFamily: "'Inter', monospace",
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Interest Rate (%)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="number"
                      step="0.1"
                      value={loan.interestRate}
                      onChange={(e) => handleLoanChange(loan.id, 'interestRate', e.target.value)}
                      style={{
                        flex: 1,
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-input)',
                        borderRadius: 10,
                        padding: '10px 12px',
                        color: 'var(--text-primary)',
                        fontFamily: "'Inter', monospace",
                        fontSize: 14,
                      }}
                    />
                    <span style={{ marginLeft: 8, color: 'var(--text-secondary)' }}>%</span>
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    value={loan.loanTerm}
                    onChange={(e) => handleLoanChange(loan.id, 'loanTerm', e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-input)',
                      border: '1px solid var(--border-input)',
                      borderRadius: 10,
                      padding: '10px 12px',
                      color: 'var(--text-primary)',
                      fontFamily: "'Inter', monospace",
                      fontSize: 14,
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Minimum Monthly Payment
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 8, color: 'var(--text-secondary)' }}>$</span>
                    <input
                      type="number"
                      value={loan.minimumPayment}
                      onChange={(e) => handleLoanChange(loan.id, 'minimumPayment', e.target.value)}
                      style={{
                        flex: 1,
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-input)',
                        borderRadius: 10,
                        padding: '10px 12px',
                        color: 'var(--text-primary)',
                        fontFamily: "'Inter', monospace",
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 6,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Extra Monthly Payment
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: 8, color: 'var(--text-secondary)' }}>$</span>
                    <input
                      type="number"
                      value={loan.extraPayment}
                      onChange={(e) => handleLoanChange(loan.id, 'extraPayment', e.target.value)}
                      style={{
                        flex: 1,
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-input)',
                        borderRadius: 10,
                        padding: '10px 12px',
                        color: 'var(--text-primary)',
                        fontFamily: "'Inter', monospace",
                        fontSize: 14,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Preset Buttons */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
                {Object.keys(LOAN_PRESETS).map((presetName) => (
                  <button
                    key={presetName}
                    onClick={() => handleApplyPreset(loan.id, presetName)}
                    style={{
                      padding: '8px 12px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-input)',
                      borderRadius: 8,
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontSize: 12,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--accent-bg)';
                      e.target.style.color = 'var(--accent)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--bg-main)';
                      e.target.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {presetName}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={handleAddLoan}
            style={{
              width: '100%',
              padding: '12px 16px',
              marginTop: 24,
              background: 'var(--accent-bg)',
              border: '1px solid var(--accent)',
              borderRadius: 10,
              color: 'var(--accent)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 14,
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--accent)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--accent-bg)';
              e.target.style.color = 'var(--accent)';
            }}
          >
            + Add Another Loan
          </button>
        </div>

        {/* Results Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Payoff Date (With Current Payment)
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>
              {results.totalWithoutExtra.months} months
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>
              {(results.totalWithoutExtra.months / 12).toFixed(1)} years
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Payoff Date (With Extra Payments)
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent-dark)' }}>
              {results.totalWithExtra.months} months
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>
              {(results.totalWithExtra.months / 12).toFixed(1)} years
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Time Saved
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>
              {results.totalMonthsSaved} months
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>
              {(results.totalMonthsSaved / 12).toFixed(1)} years faster
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Total Interest (Current Payment)
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>
              ${results.totalWithoutExtra.totalInterest.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Total Interest (With Extra Payments)
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent-dark)' }}>
              ${results.totalWithExtra.totalInterest.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
              gridColumn: 'span 1',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Interest Saved
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#10b981' }}>
              ${results.totalInterestSaved.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Total Amount Paid (Current)
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent)' }}>
              ${results.totalWithoutExtra.totalPaid.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>

          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: 8,
                textTransform: 'uppercase',
              }}
            >
              Total Amount Paid (With Extra)
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--accent-dark)' }}>
              ${results.totalWithExtra.totalPaid.toLocaleString('en-US', {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
        </div>

        {/* Chart */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 16,
            padding: 32,
            marginBottom: 32,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
            Payoff Schedule
          </h2>
          <LineChart
            data1={results.combinedScheduleWithoutExtra}
            data2={results.combinedScheduleWithExtra}
            label1="Current Payment"
            label2="With Extra Payments"
          />
        </div>

        {/* Individual Loan Results */}
        {loans.length > 1 && (
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
              Individual Loan Breakdown
            </h2>

            {results.individual.map((result, idx) => {
              const loan = loans.find((l) => l.id === result.loanId);
              return (
                <div
                  key={result.loanId}
                  style={{
                    padding: '20px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-input)',
                    borderRadius: 10,
                    marginBottom: idx < results.individual.length - 1 ? 16 : 0,
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 600 }}>
                    Loan {idx + 1} ({loan.interestRate}% - ${loan.balance.toLocaleString()})
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: 16,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          marginBottom: 4,
                        }}
                      >
                        Payoff (Current)
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>
                        {result.withoutExtra.months} months
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          marginBottom: 4,
                        }}
                      >
                        Payoff (Extra)
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>
                        {result.withExtra.months} months
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          marginBottom: 4,
                        }}
                      >
                        Interest Saved
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#10b981' }}>
                        ${result.interestSaved.toLocaleString('en-US', {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          color: 'var(--text-secondary)',
                          marginBottom: 4,
                        }}
                      >
                        Total Interest (Current)
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>
                        ${result.withoutExtra.totalInterest.toLocaleString('en-US', {
                          maximumFractionDigits: 0,
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAQ Section */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 16,
            padding: 32,
          }}
        >
          <h2 style={{ marginTop: 0, marginBottom: 24, fontSize: 24, fontWeight: 600 }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: 24 }}>
            <div>
              <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
                How accurate are these calculations?
              </h3>
              <p style={{ marginTop: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Our calculator uses standard amortization formulas to compute precise payoff dates
                and interest amounts. Results assume consistent monthly payments and interest rates.
                Actual payoff dates may vary based on payment timing, variable interest rates, and
                loan servicer processing delays.
              </p>
            </div>

            <div>
              <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
                Does extra payment really make a difference?
              </h3>
              <p style={{ marginTop: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Yes! Extra payments directly reduce your principal balance, which means less interest
                accrues over time. Even small extra payments can save thousands in interest and shorten
                your payoff timeline significantly. The earlier you make extra payments, the greater
                your savings due to compound interest.
              </p>
            </div>

            <div>
              <h3 style={{ marginTop: 0, marginBottom: 12, fontSize: 16, fontWeight: 600 }}>
                What's the difference between federal and private student loans?
              </h3>
              <p style={{ marginTop: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Federal loans typically have fixed interest rates set by Congress (currently 5.5-7.0%)
                and offer income-driven repayment options. Private loans vary by lender (9-12%+) and
                are not eligible for federal forgiveness programs. This calculator works with both
                types to show your personalized payoff strategy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// Helper function to combine schedules from multiple loans
function buildCombinedSchedule(schedules) {
  if (schedules.length === 0) return [];

  const maxMonths = Math.max(...schedules.map((s) => s[s.length - 1]?.month || 0));
  const combined = [];

  for (let month = 0; month <= maxMonths; month += Math.ceil(maxMonths / 50)) {
    let totalBalance = 0;
    let totalInterest = 0;

    schedules.forEach((schedule) => {
      const point = schedule.find((s) => s.month >= month) || schedule[schedule.length - 1];
      if (point) {
        totalBalance += point.balance;
        totalInterest += point.interestPaid;
      }
    });

    combined.push({
      month: Math.round(month),
      balance: totalBalance,
      interestPaid: totalInterest,
    });
  }

  return combined;
}

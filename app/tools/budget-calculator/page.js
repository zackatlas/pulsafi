'use client';

import React, { useState, useMemo } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BUDGET_METHODS = {
  '50-30-20': { label: '50/30/20', categories: [{ name: 'Needs', percentage: 50 }, { name: 'Wants', percentage: 30 }, { name: 'Savings', percentage: 20 }] },
  '70-20-10': { label: '70/20/10', categories: [{ name: 'Living', percentage: 70 }, { name: 'Savings', percentage: 20 }, { name: 'Giving', percentage: 10 }] },
  '80-20': { label: '80/20', categories: [{ name: 'Spending', percentage: 80 }, { name: 'Saving', percentage: 20 }] },
  custom: { label: 'Custom', categories: [] }
};

const PRESET_INCOMES = [3000, 4000, 5000, 6000, 8000, 10000];

const COLORS = {
  'Needs': '#10B981',
  'Wants': '#F59E0B',
  'Savings': '#3B82F6',
  'Living': '#10B981',
  'Giving': '#8B5CF6',
  'Spending': '#F59E0B',
  'Saving': '#3B82F6',
};

const PieChart = ({ income, categories, spending }) => {
  const segments = categories.map((cat) => {
    const amount = (income * cat.percentage) / 100;
    const spent = spending[cat.name] || 0;
    return {
      name: cat.name,
      percentage: cat.percentage,
      amount,
      spent,
      color: COLORS[cat.name] || '#6B7280',
    };
  });

  let currentAngle = 0;
  const paths = segments.map((segment) => {
    const sliceAngle = (segment.percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle = endAngle;

    const radius = 40;
    const centerX = 50;
    const centerY = 50;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return (
      <path key={segment.name} d={pathData} fill={segment.color} stroke="var(--bg-main)" strokeWidth="2" />
    );
  });

  return (
    <svg viewBox="0 0 100 100" style={{ width: '200px', height: '200px' }}>
      {paths}
      <text x="50" y="50" textAnchor="middle" dy="0.3em" fontSize="14" fontWeight="bold" fill="var(--text-primary)">
        {income.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
      </text>
    </svg>
  );
};

export default function BudgetCalculator() {
  const [income, setIncome] = useState(5000);
  const [method, setMethod] = useState('50-30-20');
  const [customCategories, setCustomCategories] = useState([
    { name: 'Category 1', percentage: 50 },
    { name: 'Category 2', percentage: 30 },
    { name: 'Category 3', percentage: 20 },
  ]);
  const [spending, setSpending] = useState({});

  const currentMethod = BUDGET_METHODS[method];
  const displayCategories = method === 'custom' ? customCategories : currentMethod.categories;

  const budgetBreakdown = useMemo(() => {
    return displayCategories.map((cat) => {
      const recommended = (income * cat.percentage) / 100;
      const actual = spending[cat.name] || 0;
      const difference = recommended - actual;
      return {
        name: cat.name,
        percentage: cat.percentage,
        recommended,
        actual,
        difference,
        status: difference >= 0 ? 'under' : 'over',
        color: COLORS[cat.name] || '#6B7280',
      };
    });
  }, [income, displayCategories, spending]);

  const totalRecommended = budgetBreakdown.reduce((sum, cat) => sum + cat.recommended, 0);
  const totalActual = budgetBreakdown.reduce((sum, cat) => sum + cat.actual, 0);
  const surplus = income - totalActual;

  const handleSpendingChange = (categoryName, value) => {
    const numValue = parseFloat(value) || 0;
    setSpending((prev) => ({
      ...prev,
      [categoryName]: Math.max(0, numValue),
    }));
  };

  const handleCustomCategoryChange = (index, field, value) => {
    const updated = [...customCategories];
    if (field === 'name') {
      updated[index].name = value;
    } else if (field === 'percentage') {
      updated[index].percentage = Math.max(0, Math.min(100, parseFloat(value) || 0));
    }
    setCustomCategories(updated);
  };

  const handleAddCategory = () => {
    const remaining = 100 - customCategories.reduce((sum, cat) => sum + cat.percentage, 0);
    setCustomCategories([
      ...customCategories,
      { name: `Category ${customCategories.length + 1}`, percentage: Math.max(0, remaining) },
    ]);
  };

  const getSuggestions = () => {
    const suggestions = [];
    budgetBreakdown.forEach((cat) => {
      if (cat.status === 'over') {
        suggestions.push(`"${cat.name}" is over budget by $${Math.abs(cat.difference).toFixed(2)}. Consider reducing spending in this area.`);
      }
    });
    if (surplus > 0) {
      suggestions.push(`You have a surplus of $${surplus.toFixed(2)}. Consider allocating this to savings or investments.`);
    } else if (surplus < 0) {
      suggestions.push(`You have a deficit of $${Math.abs(surplus).toFixed(2)}. Review your spending to stay within your income.`);
    }
    return suggestions.length > 0 ? suggestions : ['Your budget is well-balanced. Keep monitoring your spending!'];
  };

  return (
    <>
      <Header />
      <main style={{ background: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', padding: '40px 20px' }}>
        {/* Hero Section */}
        <section style={{ maxWidth: '1200px', margin: '0 auto 60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Budget Calculator
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '0' }}>
            Master your finances with proven budgeting methods. Track income, allocate spending, and build your financial future.
          </p>
        </section>

        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Income Input */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Your Monthly Income
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                  After-Tax Monthly Income
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Math.max(0, parseFloat(e.target.value) || 0))}
                  style={{
                    width: '100%',
                    background: 'var(--bg-input)',
                    border: '1px solid var(--border-input)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    color: 'var(--text-primary)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: '16px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Quick Presets
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {PRESET_INCOMES.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setIncome(preset)}
                    style={{
                      padding: '10px 16px',
                      background: income === preset ? 'var(--accent)' : 'var(--bg-main)',
                      border: `1px solid ${income === preset ? 'var(--accent)' : 'var(--border-card)'}`,
                      color: income === preset ? 'white' : 'var(--text-primary)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                    }}
                  >
                    ${preset.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Budget Method Selector */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Choose Budgeting Method
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {Object.entries(BUDGET_METHODS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setMethod(key)}
                  style={{
                    padding: '16px',
                    background: method === key ? 'var(--accent-bg)' : 'var(--bg-main)',
                    border: `2px solid ${method === key ? 'var(--accent)' : 'var(--border-card)'}`,
                    color: method === key ? 'var(--accent)' : 'var(--text-primary)',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                  }}
                >
                  {value.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Categories */}
          {method === 'custom' && (
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
                Custom Categories
              </h2>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                {customCategories.map((cat, index) => (
                  <div key={index} style={{ display: 'grid', gridTemplateColumns: '1fr 150px', gap: '16px', alignItems: 'flex-end' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={cat.name}
                        onChange={(e) => handleCustomCategoryChange(index, 'name', e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-input)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                        %
                      </label>
                      <input
                        type="number"
                        value={cat.percentage}
                        onChange={(e) => handleCustomCategoryChange(index, 'percentage', e.target.value)}
                        min="0"
                        max="100"
                        style={{
                          width: '100%',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-input)',
                          borderRadius: '10px',
                          padding: '12px 16px',
                          color: 'var(--text-primary)',
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddCategory}
                style={{
                  padding: '12px 24px',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}
              >
                + Add Category
              </button>
            </div>
          )}

          {/* Budget Breakdown */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            {/* Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <PieChart income={income} categories={displayCategories} spending={spending} />
              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Income
                </p>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--accent)' }}>
                  {income.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Categories Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {budgetBreakdown.map((cat) => (
                <div key={cat.name} style={{ background: 'var(--bg-main)', border: '1px solid var(--border-card)', borderRadius: '12px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.color }} />
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', margin: '0' }}>
                          {cat.name}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
                          {cat.percentage}% of income
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Recommended
                      </label>
                      <p style={{ fontSize: '16px', fontWeight: '700', color: cat.color, margin: '0' }}>
                        {cat.recommended.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                        Actual Spending
                      </label>
                      <input
                        type="number"
                        value={cat.actual || ''}
                        onChange={(e) => handleSpendingChange(cat.name, e.target.value)}
                        placeholder="0"
                        style={{
                          width: '100%',
                          background: 'var(--bg-input)',
                          border: '1px solid var(--border-input)',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          color: 'var(--text-primary)',
                          fontFamily: "'DM Mono', monospace",
                          fontSize: '14px',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: cat.status === 'under' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: cat.status === 'under' ? '#10B981' : '#F59E0B' }}>
                      {cat.status === 'under' ? 'Under Budget' : 'Over Budget'}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: cat.status === 'under' ? '#10B981' : '#F59E0B' }}>
                      {cat.difference >= 0 ? '+' : ''}{cat.difference.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary & Suggestions */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Budget Summary
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              <div style={{ background: 'var(--bg-main)', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-card)' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Income
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: 'var(--accent)', margin: '0' }}>
                  {income.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', borderRadius: '12px', padding: '20px', border: '1px solid var(--border-card)' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Spending
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#F59E0B', margin: '0' }}>
                  {totalActual.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </p>
              </div>

              <div style={{ background: 'var(--bg-main)', borderRadius: '12px', padding: '20px', border: `2px solid ${surplus >= 0 ? '#10B981' : '#EF4444'}` }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {surplus >= 0 ? 'Surplus' : 'Deficit'}
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: surplus >= 0 ? '#10B981' : '#EF4444', margin: '0' }}>
                  {surplus.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            <div style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent)', borderRadius: '12px', padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent)', marginBottom: '16px', margin: '0 0 16px 0' }}>
                Actionable Suggestions
              </h3>
              <ul style={{ margin: '0', padding: '0', listStyle: 'none' }}>
                {getSuggestions().map((suggestion, index) => (
                  <li key={index} style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: index < getSuggestions().length - 1 ? '12px' : '0', paddingLeft: '24px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '0', color: 'var(--accent)', fontWeight: '600' }}>•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-card)', borderRadius: '16px', padding: '32px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: 'var(--text-primary)' }}>
              Learn More
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <a
                href="/articles/50-30-20-budgeting-explained"
                style={{
                  padding: '20px',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.borderColor = 'var(--border-card)')}
              >
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  50/30/20 Budgeting Explained
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>
                  Master the most popular budgeting method and learn how to allocate your income effectively.
                </p>
              </a>

              <a
                href="/glossary/budget-allocation"
                style={{
                  padding: '20px',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.borderColor = 'var(--border-card)')}
              >
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  Budget Allocation Glossary
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>
                  Understand key budgeting terms and concepts to improve your financial literacy.
                </p>
              </a>

              <a
                href="/articles/emergency-fund-guide"
                style={{
                  padding: '20px',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.target.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.target.style.borderColor = 'var(--border-card)')}
              >
                <p style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  Emergency Fund Guide
                </p>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0' }}>
                  Learn why you need an emergency fund and how to build one that works for you.
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

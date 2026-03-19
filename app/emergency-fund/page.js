'use client';

import { useState, useMemo } from 'react';

const SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 100000, 120000, 150000];
const FAMILY_TYPES = [
  { id: 'single', label: 'Single', expensePercent: 0.5 },
  { id: 'couple', label: 'Couple', expensePercent: 0.6 },
  { id: 'family-of-3', label: 'Family of 3', expensePercent: 0.65 },
  { id: 'family-of-4', label: 'Family of 4', expensePercent: 0.7 },
  { id: 'family-of-5', label: 'Family of 5', expensePercent: 0.75 }
];

function calculateEmergencyFund(salary, familyType) {
  const monthlyGross = salary / 12;
  const expensePercent = FAMILY_TYPES.find(f => f.id === familyType)?.expensePercent || 0.5;
  const monthlyExpenses = monthlyGross * expensePercent;

  return {
    monthlyGross: Math.round(monthlyExpenses),
    fund6Months: Math.round(monthlyExpenses * 6)
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function getColorIntensity(value, minVal, maxVal) {
  if (value <= minVal) return { bg: '#d4f4d4', text: '#1a6b1a' };
  if (value <= (minVal + maxVal) / 2) return { bg: '#fff4d4', text: '#8b6a00' };
  return { bg: '#ffd4d4', text: '#8b1a1a' };
}

export default function Page() {
  const [sortBy, setSortBy] = useState('salary');

  const gridData = useMemo(() => {
    return SALARIES.map(salary => {
      const row = FAMILY_TYPES.map(familyType => {
        const fund = calculateEmergencyFund(salary, familyType);
        return {
          salary,
          familyType: familyType.id,
          familyLabel: familyType.label,
          fund6Months: fund.fund6Months
        };
      });
      return row;
    });
  }, []);

  const allValues = gridData.flat().map(item => item.fund6Months);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an emergency fund and why is it important?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An emergency fund is money set aside for unexpected expenses like job loss, medical emergencies, or urgent home repairs. Financial experts recommend having 3 to 12 months of living expenses saved. This prevents you from going into debt when emergencies happen.'
        }
      },
      {
        '@type': 'Question',
        name: 'How much emergency fund should I have based on my salary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your emergency fund should cover 3 to 12 months of your actual living expenses, not your gross income. This varies by family size, job stability, and dependents. Use our calculator to find your personalized target based on your salary and family situation.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where should I keep my emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keep your emergency fund in a high-yield savings account (HYSA), money market account, or Treasury bills. These are safe, liquid, and earn interest. Avoid putting emergency funds in investments like stocks that can lose value.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(faqJson)}</script>

      <main style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh' }}>
        {/* Hero Section */}
        <section style={{
          background: 'var(--hero-gradient)',
          padding: '4rem 2rem',
          textAlign: 'center',
          color: '#fff',
          borderBottom: '1px solid var(--border-card)'
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '3rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            Emergency Fund Calculator
          </h1>
          <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.95, maxWidth: '700px', margin: '0 auto 2rem' }}>
            Find your personalized emergency fund target based on your salary and family size. Interactive calculator for all income levels.
          </p>
        </section>

        {/* Educational Content */}
        <section style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            How Much Do You Really Need?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
          }}>
            {[
              {
                title: 'The 3-Month Baseline',
                description: 'A quick safety net for those just starting. Covers most immediate emergencies without requiring years of saving.',
                emoji: '🏗️'
              },
              {
                title: 'The 6-Month Target',
                description: 'The recommended amount for most households. Protects you during job transitions and covers major unexpected costs.',
                emoji: '🎯'
              },
              {
                title: 'The 12-Month Reserve',
                description: 'Best for freelancers, single earners, or those with dependents. Provides peace of mind in uncertain economies.',
                emoji: '🛡️'
              }
            ].map((item) => (
              <div key={item.title} style={{
                backgroundColor: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid var(--border-card)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.emoji}</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.2rem',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            marginBottom: '2rem',
            backgroundColor: 'var(--accent-bg)',
            padding: '1.5rem',
            borderRadius: '8px',
            borderLeft: '4px solid var(--accent)'
          }}>
            Your emergency fund should cover your monthly living expenses, not your gross income. This calculator estimates your monthly expenses based on typical household spending patterns (50-75% of gross income, depending on family size) and shows you target amounts for 6 months of protection.
          </p>
        </section>

        {/* Interactive Grid */}
        <section style={{
          maxWidth: '1400px',
          margin: '4rem auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            Emergency Fund Amounts by Salary & Family Type (6-Month Target)
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '1rem'
          }}>
            Click any amount to see detailed savings plans, account recommendations, and personalized guidance for your situation.
          </p>

          <div style={{
            overflowX: 'auto',
            backgroundColor: 'var(--bg-card)',
            borderRadius: '12px',
            border: '1px solid var(--border-card)',
            padding: '1.5rem'
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontFamily: "'Inter', monospace"
            }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-card)' }}>
                  <th style={{
                    textAlign: 'left',
                    padding: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    backgroundColor: 'var(--bg-input)'
                  }}>
                    Annual Salary
                  </th>
                  {FAMILY_TYPES.map(family => (
                    <th key={family.id} style={{
                      textAlign: 'center',
                      padding: '1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      backgroundColor: 'var(--bg-input)',
                      fontSize: '0.9rem'
                    }}>
                      {family.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gridData.map((row, rowIdx) => (
                  <tr key={rowIdx} style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{
                      padding: '1rem',
                      fontWeight: 600,
                      backgroundColor: 'var(--bg-input)',
                      color: 'var(--accent)'
                    }}>
                      {formatCurrency(row[0].salary)}
                    </td>
                    {row.map((item) => {
                      const colors = getColorIntensity(item.fund6Months, minValue, maxValue);
                      return (
                        <td key={item.familyType} style={{
                          padding: '1rem',
                          textAlign: 'center',
                          backgroundColor: colors.bg,
                          color: colors.text,
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }} onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = '0.8';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }} onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}>
                          <a href={`/emergency-fund/${item.salary}-salary-${item.familyType}`} style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            display: 'block'
                          }}>
                            {formatCurrency(item.fund6Months)}
                          </a>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#d4f4d4',
                borderRadius: '4px'
              }} />
              <span>Lower amounts (fewer dependents)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#fff4d4',
                borderRadius: '4px'
              }} />
              <span>Mid-range amounts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#ffd4d4',
                borderRadius: '4px'
              }} />
              <span>Higher amounts (larger families)</span>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            Emergency Fund Principles
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: 'Separate Account',
                description: 'Keep it in its own account, separate from your checking and regular savings. Out of sight helps prevent temptation.'
              },
              {
                title: 'Highly Liquid',
                description: 'Your funds should be accessible within 1-2 business days. HYSA and money market accounts are ideal.'
              },
              {
                title: 'Low Risk',
                description: 'Prioritize safety over returns. FDIC insurance and government backing protect your capital.'
              },
              {
                title: 'Specific Purpose',
                description: 'Use only for true emergencies: job loss, medical costs, major repairs. Not for vacations or upgrades.'
              },
              {
                title: 'Regular Replenishment',
                description: 'After using your fund, rebuild it as quickly as possible. Treat it as a top financial priority.'
              },
              {
                title: 'Annual Review',
                description: 'Review your fund annually. Adjust targets based on life changes, new dependents, or income changes.'
              }
            ].map((principle) => (
              <div key={principle.title} style={{
                backgroundColor: 'var(--bg-card)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-card)'
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.05rem',
                  marginBottom: '0.75rem',
                  color: 'var(--text-primary)'
                }}>
                  {principle.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '0 2rem',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                q: 'What is an emergency fund and why is it important?',
                a: 'An emergency fund is money set aside for unexpected expenses like job loss, medical emergencies, or urgent home repairs. Financial experts recommend having 3 to 12 months of living expenses saved. This prevents you from going into debt when emergencies happen and provides psychological peace of mind.'
              },
              {
                q: 'How much emergency fund should I have based on my salary?',
                a: 'Your emergency fund should cover 3 to 12 months of your actual living expenses, not your gross income. This varies by family size, job stability, and dependents. Use our calculator to find your personalized target. Start with 3 months and gradually build to 6-12 months.'
              },
              {
                q: 'Where should I keep my emergency fund?',
                a: 'Keep your emergency fund in a high-yield savings account (HYSA), money market account, or Treasury bills. These are safe (FDIC insured), liquid (quick access), and earn interest (4-5.5% APY). Avoid stocks, crypto, or illiquid investments for emergency funds.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-card)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-card)'
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)'
                }}>
                  {item.q}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7
                }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use This Calculator */}
        <section style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '2rem',
          backgroundColor: 'var(--accent-bg)',
          borderRadius: '12px',
          border: '2px solid var(--accent-border)',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            color: 'var(--text-primary)'
          }}>
            How to Use This Calculator
          </h2>
          <ol style={{ listStyle: 'decimal', paddingLeft: '1.5rem', lineHeight: 1.8 }}>
            <li style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <strong>Find your annual salary</strong> in the left column of the interactive grid.
            </li>
            <li style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <strong>Choose your family type</strong> across the top row (single, couple, family of 3, etc.).
            </li>
            <li style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <strong>Click the amount</strong> in the cell where your row and column intersect.
            </li>
            <li style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
              <strong>Get personalized insights</strong> including monthly expenses, savings plans, and account recommendations.
            </li>
            <li style={{ color: 'var(--text-primary)' }}>
              <strong>Track your progress</strong> with our milestone tracker showing 3, 6, 9, and 12-month targets.
            </li>
          </ol>
        </section>

        {/* Related Tools */}
        <section style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '0 2rem',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            marginBottom: '2rem',
            color: 'var(--text-primary)'
          }}>
            Complementary Financial Tools
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              {
                title: 'Salary Breakdown Calculator',
                description: 'Understand your take-home pay after taxes, benefits, and deductions.',
                href: '/salary-breakdown-calculator'
              },
              {
                title: 'Debt-to-Income Ratio Calculator',
                description: 'Check your financial health and see how much debt you can safely take on.',
                href: '/debt-to-income-calculator'
              },
              {
                title: 'Monthly Budget Calculator',
                description: 'Create a detailed budget and identify where you can save money.',
                href: '/budget-calculator'
              }
            ].map((tool) => (
              <a key={tool.title} href={tool.href} style={{
                display: 'block',
                backgroundColor: 'var(--bg-card)',
                padding: '1.5rem',
                borderRadius: '12px',
                border: '1px solid var(--border-card)',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.1rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)'
                }}>
                  {tool.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6
                }}>
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{
          maxWidth: '1200px',
          margin: '4rem auto',
          padding: '3rem 2rem',
          textAlign: 'center',
          backgroundColor: 'var(--accent-bg)',
          borderRadius: '12px',
          border: '2px solid var(--accent-border)',
          marginBottom: '4rem'
        }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2rem',
            marginBottom: '1rem',
            color: 'var(--text-primary)'
          }}>
            Start Building Your Safety Net Today
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            An emergency fund is the foundation of financial security. Explore your personalized targets and savings plans using the calculator above.
          </p>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            PulsaFi helps you take control of your financial future with data-driven tools and expert guidance.
          </p>
        </section>
      </main>
    </>
  );
}

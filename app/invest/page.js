'use client';

const AMOUNTS = [1000, 2500, 5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 500000, 1000000];
const PERIODS = [1, 3, 5, 10, 15, 20, 25, 30];

function formatAmount(amount) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(0)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

function compoundGrowth(principal, annualRate, years) {
  return principal * Math.pow(1 + annualRate / 100, years);
}


export default function InvestHub() {
  // Popular scenarios to display
  const popularScenarios = [
    { amount: 1000, period: 10 },
    { amount: 5000, period: 10 },
    { amount: 10000, period: 20 },
    { amount: 25000, period: 10 },
    { amount: 50000, period: 20 },
    { amount: 100000, period: 30 },
  ];

  const scenarios = popularScenarios.map(({ amount, period }) => {
    const sp500 = compoundGrowth(amount, 10, period);
    const savings = compoundGrowth(amount, 4.5, period);
    return {
      amount,
      period,
      sp500,
      savings,
      slug: `${amount}-over-${period}-years`,
    };
  });

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"},
              {"@type": "ListItem", "position": 2, "name": "Investment Growth Calculator", "item": "https://www.pulsafi.com/invest"}
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is compound interest?",
                "acceptedAnswer": {"@type": "Answer", "text": "Compound interest is interest earned on interest. When you invest money, you earn returns, and those returns earn returns too. This exponential growth is one of the most powerful forces in wealth building. The longer your money compounds, the more dramatic the effect."}
              },
              {
                "@type": "Question",
                "name": "How long should I invest my money?",
                "acceptedAnswer": {"@type": "Answer", "text": "The longer you can leave your money invested, the better. For stock market investments, financial advisors typically recommend 5+ years to weather market volatility. For emergency funds or money you might need soon, keep it in savings accounts. For retirement funds, 20-40 years of compounding can turn modest investments into substantial wealth."}
              },
              {
                "@type": "Question",
                "name": "What is the difference between savings and stock market investing?",
                "acceptedAnswer": {"@type": "Answer", "text": "Savings accounts (like high-yield savings accounts) offer guaranteed, fixed returns around 4-5% with zero risk. Stock market investments like index funds average 9-10% annually but with short-term volatility. For long time horizons, stock market returns significantly outpace savings. Choose based on your timeline and risk tolerance."}
              },
              {
                "@type": "Question",
                "name": "Can I lose money investing in index funds?",
                "acceptedAnswer": {"@type": "Answer", "text": "In the short term, yes. Stock prices fluctuate daily. However, historically the S&P 500 has never had a negative return over any 20-year period. For long-term investing, the risk of not investing (missing compounding) exceeds the risk of market volatility. Dollar-cost averaging (investing regularly) further reduces timing risk."}
              }
            ]
          }),
        }}
      />

      {/* Hero Section */}
      <section style={{ marginBottom: 80, textAlign: 'center' }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 16,
          color: 'var(--text-primary)',
        }}>
          Investment Growth Calculator
        </h1>
        <p style={{
          fontSize: 18,
          color: 'var(--text-secondary)',
          marginBottom: 24,
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          See how your money compounds over time. Explore the power of long-term investing across different amounts and time horizons. Understand how compound interest builds wealth.
        </p>
        <p style={{
          fontSize: 16,
          color: 'var(--text-muted)',
          fontStyle: 'italic',
        }}>
          Calculate investment scenarios in seconds. Compare savings accounts vs. stock market returns.
        </p>
      </section>

      {/* Popular Scenarios Grid */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 32,
          color: 'var(--text-primary)',
        }}>
          Popular Investment Scenarios
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {scenarios.map((scenario) => (
            <a
              key={scenario.slug}
              href={`/invest/${scenario.slug}`}
              style={{
                display: 'block',
                padding: 24,
                background: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 12,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-card)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ marginBottom: 16 }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}>
                  Scenario
                </div>
                <div style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}>
                  {formatAmount(scenario.amount)}
                </div>
                <div style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  marginTop: 4,
                }}>
                  Invested for {scenario.period} years
                </div>
              </div>

              <div style={{
                background: 'var(--accent-bg)',
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}>
                <div style={{
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  marginBottom: 4,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  S&amp;P 500 (10% annual)
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}>
                  ${scenario.sp500.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </div>
                <div style={{
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  marginTop: 4,
                }}>
                  +${(scenario.sp500 - scenario.amount).toLocaleString('en-US', { maximumFractionDigits: 0 })} gain
                </div>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-card)',
                paddingTop: 12,
                fontSize: 12,
                color: 'var(--text-secondary)',
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>Savings Account (4.5%):</strong> ${scenario.savings.toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </div>

              <div style={{
                marginTop: 16,
                fontSize: 13,
                color: 'var(--accent)',
                fontWeight: 600,
              }}>
                Explore scenario →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Amount & Period Grid - All Combinations */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 16,
          color: 'var(--text-primary)',
        }}>
          All Investment Amounts &amp; Time Periods
        </h2>
        <p style={{
          fontSize: 14,
          color: 'var(--text-muted)',
          marginBottom: 24,
        }}>
          Select any starting amount and time period to calculate growth. All data is based on historical average returns (S&amp;P 500 at 10% annual average).
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
          }}>
            <thead>
              <tr style={{
                background: 'var(--bg-card)',
                borderBottom: '2px solid var(--border-card)',
              }}>
                <th style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  Starting Amount
                </th>
                {PERIODS.map((period) => (
                  <th key={period} style={{
                    padding: '12px 8px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    fontSize: 12,
                  }}>
                    {period} year{period > 1 ? 's' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AMOUNTS.map((amount, idx) => (
                <tr key={amount} style={{
                  borderBottom: '1px solid var(--border-card)',
                  background: idx % 2 === 0 ? 'transparent' : 'var(--bg-card)',
                }}>
                  <td style={{
                    padding: '12px 16px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                  }}>
                    {formatAmount(amount)}
                  </td>
                  {PERIODS.map((period) => {
                    const slug = `${amount}-over-${period}-years`;
                    const finalValue = compoundGrowth(amount, 10, period);
                    return (
                      <td key={`${amount}-${period}`} style={{
                        padding: '12px 8px',
                        textAlign: 'center',
                      }}>
                        <a href={`/invest/${slug}`} style={{
                          display: 'inline-block',
                          padding: '6px 10px',
                          background: 'var(--accent-bg)',
                          color: 'var(--accent)',
                          borderRadius: 6,
                          textDecoration: 'none',
                          fontWeight: 500,
                          fontSize: 12,
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--accent)';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--accent-bg)';
                          e.currentTarget.style.color = 'var(--accent)';
                        }}
                        >
                          ${(finalValue / 1000).toFixed(0)}K
                        </a>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Compound Interest Explained */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 24,
          color: 'var(--text-primary)',
        }}>
          Understanding Compound Interest
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          marginBottom: 40,
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 24,
          }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}>
              What Is Compound Interest?
            </h3>
            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              Compound interest is &ldquo;interest on interest.&rdquo; Your initial investment earns returns, and those returns earn returns too. This exponential growth accelerates over time, making long-term investing extraordinarily powerful.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 24,
          }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}>
              Why Time Matters Most
            </h3>
            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              Doubling your investment time can more than triple your final wealth. The last dollar invested earns just as much as the first, but only if you give it time to compound. Starting early is worth more than starting with more money.
            </p>
          </div>

          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 24,
          }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}>
              The Power of Consistency
            </h3>
            <p style={{
              fontSize: 14,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              Regular monthly deposits dramatically increase compound interest effects. Adding $200/month for 20 years can double your final wealth compared to a single upfront investment. Small, consistent contributions are wealth-building superpowers.
            </p>
          </div>
        </div>

        <div style={{
          background: 'var(--accent-bg)',
          border: '2px solid var(--accent)',
          borderRadius: 12,
          padding: 24,
        }}>
          <h3 style={{
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--accent)',
            marginBottom: 16,
          }}>
            The Magic of Long Time Horizons
          </h3>
          <p style={{
            fontSize: 14,
            color: 'var(--text-primary)',
            lineHeight: 1.7,
            marginBottom: 16,
          }}>
            Consider $10,000 invested at 10% annual return (S&amp;P 500 historical average):
          </p>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}>
            <li style={{ fontSize: 14, color: 'var(--text-primary)' }}>
              <strong>After 5 years:</strong> $16,105 (+$6,105)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-primary)' }}>
              <strong>After 10 years:</strong> $25,937 (+$15,937)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-primary)' }}>
              <strong>After 20 years:</strong> $67,275 (+$57,275)
            </li>
            <li style={{ fontSize: 14, color: 'var(--text-primary)' }}>
              <strong>After 30 years:</strong> $174,494 (+$164,494)
            </li>
          </ul>
          <p style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            marginTop: 16,
            fontStyle: 'italic',
          }}>
            Notice how growth accelerates: each 10-year period yields larger gains. This is the essence of exponential growth.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 32,
          color: 'var(--text-primary)',
        }}>
          Frequently Asked Questions
        </h2>

        <div style={{
          display: 'grid',
          gap: 20,
        }}>
          <details style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 0,
            cursor: 'pointer',
          }}>
            <summary style={{
              padding: 20,
              fontWeight: 600,
              color: 'var(--text-primary)',
              userSelect: 'none',
              listStyle: 'none',
            }}>
              What is compound interest?
            </summary>
            <div style={{
              padding: '0 20px 20px 20px',
              borderTop: '1px solid var(--border-card)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              <p>
                Compound interest is interest earned on interest. When you invest money, you earn returns, and those returns earn returns too. This exponential growth is one of the most powerful forces in wealth building. The longer your money compounds, the more dramatic the effect. Albert Einstein allegedly called compound interest the 8th wonder of the world.
              </p>
            </div>
          </details>

          <details style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 0,
            cursor: 'pointer',
          }}>
            <summary style={{
              padding: 20,
              fontWeight: 600,
              color: 'var(--text-primary)',
              userSelect: 'none',
              listStyle: 'none',
            }}>
              How long should I invest my money?
            </summary>
            <div style={{
              padding: '0 20px 20px 20px',
              borderTop: '1px solid var(--border-card)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              <p>
                The longer you can leave your money invested, the better. For stock market investments, financial advisors typically recommend 5+ years minimum to weather market volatility. For emergency funds or money you might need soon, keep it in savings accounts. For retirement funds, 20&ndash;40 years of compounding can turn modest investments into substantial wealth. The S&amp;P 500 has never had a negative return over any 20-year period in history.
              </p>
            </div>
          </details>

          <details style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 0,
            cursor: 'pointer',
          }}>
            <summary style={{
              padding: 20,
              fontWeight: 600,
              color: 'var(--text-primary)',
              userSelect: 'none',
              listStyle: 'none',
            }}>
              What is the difference between savings and stock market investing?
            </summary>
            <div style={{
              padding: '0 20px 20px 20px',
              borderTop: '1px solid var(--border-card)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              <p>
                Savings accounts (like high-yield savings accounts) offer guaranteed, fixed returns around 4&ndash;5% APY with zero risk. Stock market investments like index funds average 9&ndash;10% annually but with short-term volatility. For long time horizons (5+ years), stock market returns significantly outpace savings. Choose based on your timeline and risk tolerance. For emergency funds, use savings. For retirement, use stocks.
              </p>
            </div>
          </details>

          <details style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            padding: 0,
            cursor: 'pointer',
          }}>
            <summary style={{
              padding: 20,
              fontWeight: 600,
              color: 'var(--text-primary)',
              userSelect: 'none',
              listStyle: 'none',
            }}>
              Can I lose money investing in index funds?
            </summary>
            <div style={{
              padding: '0 20px 20px 20px',
              borderTop: '1px solid var(--border-card)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}>
              <p>
                In the short term, yes. Stock prices fluctuate daily. However, historically the S&amp;P 500 has never had a negative return over any 20-year period. For long-term investing, the risk of not investing (missing compounding) often exceeds the risk of market volatility. Dollar-cost averaging (investing regularly over time) further reduces timing risk. If your investment timeline is 5+ years, the math strongly favors staying invested through volatility.
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Tools & Articles */}
      <section style={{ marginBottom: 80 }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          marginBottom: 32,
          color: 'var(--text-primary)',
        }}>
          Related Tools &amp; Articles
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
        }}>
          <a href="/tools/compound-interest-calculator" style={{
            display: 'block',
            padding: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>Compound Interest Calculator</strong>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Add monthly deposits and watch compound interest work in real-time</span>
          </a>

          <a href="/tools/roi-calculator" style={{
            display: 'block',
            padding: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>ROI Calculator</strong>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Calculate your return on investment for any investment scenario</span>
          </a>

          <a href="/tools/retirement-calculator" style={{
            display: 'block',
            padding: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>Retirement Savings Calculator</strong>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Plan how much you need to retire comfortably</span>
          </a>

          <a href="/learn/how-does-the-stock-market-work" style={{
            display: 'block',
            padding: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>How the Stock Market Works</strong>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Understand the basics of stock investing and market mechanics</span>
          </a>

          <a href="/learn/index-fund-investing-guide-2026" style={{
            display: 'block',
            padding: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>Index Fund Investing Guide</strong>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Start investing with low-cost, diversified index funds</span>
          </a>

          <a href="/learn/passive-income-ideas-2026" style={{
            display: 'block',
            padding: 20,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 12,
            textDecoration: 'none',
            color: 'inherit',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-card)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <strong style={{ color: 'var(--text-primary)', fontSize: 15 }}>Passive Income Ideas for 2026</strong>
            <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Build wealth through passive income streams and investments</span>
          </a>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{
        background: 'var(--accent-bg)',
        border: '2px solid var(--accent)',
        borderRadius: 12,
        padding: 40,
        textAlign: 'center',
      }}>
        <h2 style={{
          fontSize: 28,
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          color: 'var(--text-primary)',
          marginBottom: 16,
        }}>
          Start Your Investment Journey
        </h2>
        <p style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          marginBottom: 24,
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Choose an investment amount and time horizon above to see how your money can grow. The best time to start investing was 10 years ago. The second best time is today.
        </p>
        <a href="/invest/10000-over-10-years" style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: 'var(--accent)',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 14,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
        >
          Explore Investment Scenarios
        </a>
      </section>
    </main>
  );
}

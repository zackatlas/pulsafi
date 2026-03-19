import Footer from '../components/Footer';

export const metadata = {
  title: 'Debt-to-Income Ratio Calculator & Guide | Pulsafi',
  description: 'Calculate your debt-to-income ratio and understand what it means for mortgage approval, loan eligibility, and financial health. Free DTI calculator with personalized recommendations.',
  keywords: ['debt-to-income ratio', 'DTI calculator', 'mortgage qualification', 'debt ratio', 'loan eligibility', 'financial health'],
  alternates: { canonical: 'https://pulsafi.com/debt-to-income' },
  openGraph: {
    title: 'Debt-to-Income Ratio Calculator & Guide',
    description: 'Calculate your DTI ratio and see what it means for mortgage approval and financial health.',
    url: 'https://pulsafi.com/debt-to-income',
    type: 'website',
  },
};

const incomes = [30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000];
const debts = [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];

function formatCurrency(val) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);
}

function formatNumber(val) {
  return new Intl.NumberFormat('en-US').format(val);
}

function getDTIColor(dti) {
  if (dti <= 20) return '#22c55e';
  if (dti <= 36) return '#84cc16';
  if (dti <= 43) return '#eab308';
  if (dti <= 50) return '#f97316';
  return '#ef4444';
}

export default function DTIHubPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pulsafi.com' },
          { '@type': 'ListItem', position: 2, name: 'Debt-to-Income Ratio', item: 'https://pulsafi.com/debt-to-income' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is a good debt-to-income ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A DTI below 36% is considered good by most lenders. Below 20% is excellent. Most conventional mortgages require a DTI of 43% or less, while FHA loans may accept up to 50%.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I calculate my debt-to-income ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Divide your total monthly debt payments by your gross monthly income, then multiply by 100. For example, if you pay $2,000/month in debts and earn $6,000/month gross, your DTI is 33.3%.',
            },
          },
          {
            '@type': 'Question',
            name: 'What debts are included in DTI?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'DTI includes mortgage/rent, car payments, student loans, minimum credit card payments, personal loans, child support, and any other recurring debt obligations. It does not include utilities, groceries, insurance, or subscriptions.',
            },
          },
        ],
      },
    ],
  };

  const cardStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: 8,
    padding: 24,
    marginBottom: 40,
  };

  const headingStyle = {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif",
    margin: '0 0 20px 0',
    color: 'var(--text-primary)',
  };

  const textStyle = {
    fontSize: 14,
    color: 'var(--text-secondary)',
    fontFamily: "'DM Sans', sans-serif",
    lineHeight: 1.6,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
        <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '40px 16px', width: '100%' }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
              {' / '}
              <span>Debt-to-Income Ratio</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '16px 0 12px', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Debt-to-Income Ratio Calculator
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0, maxWidth: 700 }}>
              Your debt-to-income ratio (DTI) is one of the most important numbers lenders look at when deciding whether to approve your mortgage, auto loan, or credit application. Select your income and debt level below to see your personalized DTI analysis.
            </p>
          </div>

          {/* Quick Reference */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>DTI Rating Scale</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
              {[
                { range: '0-20%', label: 'Excellent', color: '#22c55e', desc: 'Best loan terms' },
                { range: '20-36%', label: 'Good', color: '#84cc16', desc: 'Most loans approved' },
                { range: '36-43%', label: 'Fair', color: '#eab308', desc: 'Conventional limit' },
                { range: '43-50%', label: 'High', color: '#f97316', desc: 'FHA may work' },
                { range: '50%+', label: 'Very High', color: '#ef4444', desc: 'Reduce debt first' },
              ].map((tier, i) => (
                <div key={i} style={{
                  padding: 16,
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderLeft: `4px solid ${tier.color}`,
                  borderRadius: 6,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: tier.color, fontFamily: "'Inter', monospace" }}>{tier.range}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 4 }}>{tier.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{tier.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DTI Grid */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Browse DTI Scenarios by Income</h2>
            <p style={{ ...textStyle, margin: '0 0 20px 0' }}>
              Click any cell to see a detailed DTI analysis with mortgage eligibility, improvement plans, and lender guidelines.
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif", minWidth: 700 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-card)' }}>
                    <th style={{ textAlign: 'left', padding: '10px 8px', fontSize: 12, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      Income ↓ / Debt →
                    </th>
                    {debts.map(d => (
                      <th key={d} style={{ textAlign: 'center', padding: '10px 4px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>
                        {formatCurrency(d)}/mo
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {incomes.map(inc => (
                    <tr key={inc} style={{ borderBottom: '1px solid var(--border-card)' }}>
                      <td style={{ padding: '10px 8px', fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                        ${formatNumber(inc)}/yr
                      </td>
                      {debts.map(d => {
                        const dti = (d / (inc / 12)) * 100;
                        const color = getDTIColor(dti);
                        return (
                          <td key={d} style={{ textAlign: 'center', padding: '6px 4px' }}>
                            <a
                              href={`/debt-to-income/${inc}-income-${d}-debt`}
                              style={{
                                display: 'inline-block',
                                padding: '6px 8px',
                                borderRadius: 4,
                                fontSize: 12,
                                fontWeight: 600,
                                fontFamily: "'Inter', monospace",
                                color: color,
                                backgroundColor: `${color}15`,
                                textDecoration: 'none',
                                transition: 'all 0.2s',
                                minWidth: 50,
                              }}
                            >
                              {dti.toFixed(0)}%
                            </a>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How DTI is Calculated */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>How to Calculate Your DTI</h2>
            <div style={{
              backgroundColor: 'var(--accent-bg)',
              border: '1px solid var(--accent-border)',
              borderRadius: 8,
              padding: 20,
              textAlign: 'center',
              marginBottom: 20,
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>THE FORMULA</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                DTI = (Monthly Debt Payments / Gross Monthly Income) × 100
              </div>
            </div>
            <p style={{ ...textStyle, margin: '0 0 12px 0' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Include in monthly debt:</strong> mortgage/rent, car loans, student loans, minimum credit card payments, personal loans, child support, and alimony.
            </p>
            <p style={{ ...textStyle, margin: 0 }}>
              <strong style={{ color: 'var(--text-primary)' }}>Do NOT include:</strong> utilities, groceries, insurance premiums, phone bills, subscriptions, or gas. These are expenses, not debt obligations.
            </p>
          </div>

          {/* Popular Scenarios */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Popular DTI Scenarios</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
              {[
                { inc: 50000, debt: 1000, label: 'Entry-level salary, modest debt' },
                { inc: 75000, debt: 1500, label: 'Mid-career, car + student loans' },
                { inc: 75000, debt: 2500, label: 'Mid-career, heavier debt load' },
                { inc: 100000, debt: 2000, label: '$100K earner, moderate debt' },
                { inc: 100000, debt: 3000, label: '$100K earner, mortgage + debts' },
                { inc: 150000, debt: 4000, label: 'High earner, premium lifestyle' },
              ].map((s, i) => {
                const dti = (s.debt / (s.inc / 12)) * 100;
                return (
                  <a
                    key={i}
                    href={`/debt-to-income/${s.inc}-income-${s.debt}-debt`}
                    style={{
                      padding: 16,
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 8,
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>
                        ${formatNumber(s.inc)}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "'Inter', monospace", color: getDTIColor(dti) }}>
                        {dti.toFixed(0)}%
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{formatCurrency(s.debt)}/mo debt</div>
                    <div style={{ fontSize: 11, color: 'var(--text-faint)', marginTop: 4 }}>{s.label}</div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Related Tools */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Related Tools & Articles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { href: '/tools/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/tools/debt-payoff-calculator', label: 'Debt Payoff Calculator' },
                { href: '/tools/salary-breakdown-calculator', label: 'Salary Calculator' },
                { href: '/tools/budget-calculator', label: 'Budget Calculator' },
                { href: '/learn/debt-avalanche-vs-snowball', label: 'Debt Avalanche vs Snowball' },
                { href: '/learn/first-time-homebuyer-guide-2026', label: 'First-Time Homebuyer Guide' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    padding: '14px 16px',
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 6,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    transition: 'all 0.2s',
                    display: 'block',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  q: 'What is a good debt-to-income ratio?',
                  a: 'Below 36% is considered good by most lenders. Below 20% is excellent and gives you access to the best loan terms. Most conventional mortgages cap at 43%, while FHA loans may go up to 50%.',
                },
                {
                  q: 'How do I calculate my debt-to-income ratio?',
                  a: 'Add up all your monthly debt payments (mortgage/rent, car payment, student loans, credit card minimums, etc.) and divide by your gross monthly income. Multiply by 100 to get your percentage.',
                },
                {
                  q: 'Does rent count in DTI?',
                  a: 'Yes, rent counts in your DTI calculation. When applying for a mortgage, lenders replace your rent payment with the projected mortgage payment to calculate your new DTI.',
                },
                {
                  q: 'How can I lower my DTI quickly?',
                  a: 'Pay off small debts entirely (credit cards, personal loans), consolidate high-interest debt, increase your income through raises or side income, and avoid taking on new debt. Even paying off one credit card can make a meaningful difference.',
                },
              ].map((faq, i) => (
                <div key={i} style={{ paddingBottom: i < 3 ? 20 : 0, marginBottom: i < 3 ? 20 : 0, borderBottom: i < 3 ? '1px solid var(--border-card)' : 'none' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
                    {faq.q}
                  </h3>
                  <p style={{ ...textStyle, margin: 0 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

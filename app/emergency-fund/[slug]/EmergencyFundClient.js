'use client';

import { useState, useMemo } from 'react';

const FAMILY_TYPES = [
  { id: 'single', label: 'Single', expensePercent: 0.5 },
  { id: 'couple', label: 'Couple', expensePercent: 0.6 },
  { id: 'family-of-3', label: 'Family of 3', expensePercent: 0.65 },
  { id: 'family-of-4', label: 'Family of 4', expensePercent: 0.7 },
  { id: 'family-of-5', label: 'Family of 5', expensePercent: 0.75 }
];

function getFamilyLabel(familyType) {
  return FAMILY_TYPES.find(f => f.id === familyType)?.label || '';
}

function getExpensePercent(familyType) {
  return FAMILY_TYPES.find(f => f.id === familyType)?.expensePercent || 0.5;
}

function calculateEmergencyFund(salary, familyType) {
  const monthlyGross = salary / 12;
  const expensePercent = getExpensePercent(familyType);
  const monthlyExpenses = monthlyGross * expensePercent;

  return {
    monthlyGross: Math.round(monthlyExpenses),
    fund3Months: Math.round(monthlyExpenses * 3),
    fund6Months: Math.round(monthlyExpenses * 6),
    fund9Months: Math.round(monthlyExpenses * 9),
    fund12Months: Math.round(monthlyExpenses * 12)
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

export default function EmergencyFundClient({ salary, familyType, slug }) {
  const familyLabel = getFamilyLabel(familyType);
  const funds = calculateEmergencyFund(salary, familyType);
  const [selectedRate, setSelectedRate] = useState(15);

  const savingsPlan = useMemo(() => {
    const monthlyGross = salary / 12;
    const rates = [10, 15, 20, 25];
    return rates.map(rate => {
      const monthlyContribution = Math.round(monthlyGross * (rate / 100));
      return {
        rate,
        monthlyContribution,
        months3: Math.ceil(funds.fund3Months / monthlyContribution),
        months6: Math.ceil(funds.fund6Months / monthlyContribution),
        months9: Math.ceil(funds.fund9Months / monthlyContribution),
        months12: Math.ceil(funds.fund12Months / monthlyContribution)
      };
    });
  }, [salary, funds]);

  const breadcrumbJson = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pulsafi.com' },
      { '@type': 'ListItem', position: 2, name: 'Emergency Fund', item: 'https://www.pulsafi.com/emergency-fund' },
      { '@type': 'ListItem', position: 3, name: `${formatCurrency(salary)} - ${familyLabel}`, item: `https://www.pulsafi.com/emergency-fund/${slug}` }
    ]
  };

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the recommended emergency fund size for a ${familyLabel} with a ${formatCurrency(salary)} salary?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `For a ${familyLabel} earning ${formatCurrency(salary)} annually, we recommend building an emergency fund of ${formatCurrency(funds.fund6Months)} to ${formatCurrency(funds.fund12Months)}, covering 6 to 12 months of essential expenses.`
        }
      },
      {
        '@type': 'Question',
        name: 'How quickly can I build this emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `By saving 15% of your gross income monthly (${formatCurrency(Math.round(salary / 12 * 0.15))}), you could reach a 6-month fund in approximately ${savingsPlan[1].months6} months. Saving 20% would achieve this in roughly ${savingsPlan[2].months6} months.`
        }
      },
      {
        '@type': 'Question',
        name: 'Where should I keep my emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keep your emergency fund in a high-yield savings account (3.5-5% APY), money market account, or short-term Treasury bills. These offer safety, liquidity, and better returns than traditional savings accounts.'
        }
      },
      {
        '@type': 'Question',
        name: 'What counts as an emergency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'True emergencies include job loss, medical expenses, major home or car repairs, and temporary disability. Do not use your emergency fund for vacations, new gadgets, or planned purchases.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumbJson)}</script>
      <script type="application/ld+json">{JSON.stringify(faqJson)}</script>

      <main style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)', fontFamily: "'DM Sans', sans-serif" }}>
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
            fontSize: '2.5rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            Emergency Fund Calculator
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.95 }}>
            {familyLabel} Earning {formatCurrency(salary)} Annually
          </p>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { label: 'Monthly Expenses', value: funds.monthlyGross },
              { label: '3-Month Fund', value: funds.fund3Months },
              { label: '6-Month Fund', value: funds.fund6Months },
              { label: '12-Month Fund', value: funds.fund12Months }
            ].map((card) => (
              <div key={card.label} style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '1.5rem',
                borderRadius: '12px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>{card.label}</p>
                <p style={{ fontFamily: "'Inter', monospace", fontSize: '1.8rem', fontWeight: 700 }}>
                  {formatCurrency(card.value)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Savings Progress Bar */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Emergency Fund Milestones
          </h2>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-card)', marginBottom: '2rem' }}>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
              Track your progress toward these key emergency fund targets:
            </p>
            {[3, 6, 9, 12].map((months) => {
              const fundValue = funds[`fund${months}Months`];
              const percentage = (months / 12) * 100;
              return (
                <div key={months} style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                    <span>{months}-Month Fund</span>
                    <span style={{ fontFamily: "'Inter', monospace", fontWeight: 600 }}>{formatCurrency(fundValue)}</span>
                  </div>
                  <div style={{ width: '100%', height: '24px', backgroundColor: 'var(--bg-input)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-input)' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), var(--accent-dark))', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Monthly Savings Plan */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            How Long to Build Your Emergency Fund?
          </h2>
          <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            See how many months it takes to reach each emergency fund milestone based on different monthly savings rates:
          </p>
          <div style={{ overflowX: 'auto', backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-card)', padding: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', monospace" }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-card)' }}>
                  <th style={{ textAlign: 'left', padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Savings Rate</th>
                  <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Amount</th>
                  <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>To 3 Months</th>
                  <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>To 6 Months</th>
                  <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>To 9 Months</th>
                  <th style={{ textAlign: 'center', padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>To 12 Months</th>
                </tr>
              </thead>
              <tbody>
                {savingsPlan.map((plan) => (
                  <tr key={plan.rate} style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{plan.rate}% of income</td>
                    <td style={{ padding: '1rem', textAlign: 'center', color: 'var(--accent)' }}>{formatCurrency(plan.monthlyContribution)}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{plan.months3} months</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{plan.months6} months</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{plan.months9} months</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{plan.months12} months</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Pro tip: Most financial experts recommend allocating 10-25% of gross income to emergency fund savings until you reach your target. Automate your transfers for consistency.
          </p>
        </section>

        {/* Where to Keep Your Fund */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Where to Keep Your Emergency Fund
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {[
              { title: 'High-Yield Savings Account (HYSA)', apy: '4.0\u20135.0%', pros: 'FDIC insured, immediate access, competitive rates, no fees', cons: 'Lower returns than investments, rates fluctuate', best: 'Best for most people' },
              { title: 'Money Market Account', apy: '4.5\u20135.2%', pros: 'Check-writing privileges, FDIC insured, competitive rates', cons: 'May require higher minimum balance, limited transactions', best: 'Best for larger funds' },
              { title: 'Treasury Bills (T-Bills)', apy: '5.0\u20135.4%', pros: 'US government backed, no default risk, short-term options', cons: 'Slower to access, requires purchasing process, tax reporting', best: 'Best for disciplined savers' },
              { title: 'Money Market Fund', apy: '5.2\u20135.5%', pros: 'Very liquid, competitive rates, diversified', cons: 'Not FDIC insured, slight risk, small fees', best: 'Best for risk-tolerant savers' }
            ].map((account) => (
              <div key={account.title} style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{account.title}</h3>
                <p style={{ fontFamily: "'Inter', monospace", fontSize: '1.3rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '1rem' }}>{account.apy} APY</p>
                <div style={{ flex: 1 }}>
                  <p style={{ marginBottom: '0.8rem', fontSize: '0.95rem' }}><strong>Pros:</strong> {account.pros}</p>
                  <p style={{ marginBottom: '0.8rem', fontSize: '0.95rem' }}><strong>Cons:</strong> {account.cons}</p>
                </div>
                <p style={{ backgroundColor: 'var(--accent-bg)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, color: 'var(--accent)', marginTop: 'auto' }}>{account.best}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Fund by Life Stage */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Emergency Fund Targets by Life Stage
          </h2>
          <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {[
                { stage: 'Starting Out (Age 20\u201330)', target: '3 months of expenses', reasoning: 'You likely have fewer dependents and lower fixed expenses. A 3-month fund provides a safety net without requiring massive savings.' },
                { stage: 'Building Stability (Age 30\u201345)', target: '6 months of expenses', reasoning: 'You may have family, mortgage, or higher responsibilities. A 6-month fund covers longer job searches and major repairs.' },
                { stage: 'Pre-Retirement (Age 45\u201360)', target: '9\u201312 months of expenses', reasoning: 'Job transitions take longer at this age. A larger fund provides peace of mind as you approach retirement.' },
                { stage: 'Retired (Age 60+)', target: '12+ months of expenses', reasoning: 'No regular income means emergencies must come from savings. Prioritize liquidity and preserve capital.' }
              ].map((item) => (
                <div key={item.stage} style={{ padding: '1.5rem', backgroundColor: 'var(--bg-input)', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.stage}</h4>
                  <p style={{ fontFamily: "'Inter', monospace", fontSize: '1.05rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.5rem' }}>Target: {item.target}</p>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.reasoning}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Signs You Need Adjustment */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Signs You Need a Bigger (or Smaller) Emergency Fund
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Increase Your Target</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Freelance or variable income', 'Multiple dependents or aging parents', 'Recent health issues', 'Old home or car', 'Job market challenges in your field', 'High debt-to-income ratio'].map((item) => (
                  <li key={item} style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>You Can Stay Smaller</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Dual stable income household', 'Strong professional network', 'Good health insurance', 'New home and car', 'Family support available', 'Low overall expenses'].map((item) => (
                  <li key={item} style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              { q: `What is the recommended emergency fund size for a ${familyLabel} with a ${formatCurrency(salary)} salary?`, a: `For a ${familyLabel} earning ${formatCurrency(salary)} annually, we recommend building an emergency fund of ${formatCurrency(funds.fund6Months)} to ${formatCurrency(funds.fund12Months)}, covering 6 to 12 months of essential living expenses. Start with 3 months (${formatCurrency(funds.fund3Months)}) and build up from there.` },
              { q: 'How quickly can I build this emergency fund?', a: `By saving 15% of your gross income monthly (${formatCurrency(Math.round(salary / 12 * 0.15))}), you could reach a 6-month fund in approximately ${savingsPlan[1].months6} months. Saving 20% would achieve this in roughly ${savingsPlan[2].months6} months. Set up automatic transfers to stay on track.` },
              { q: 'Where should I keep my emergency fund?', a: 'Keep your emergency fund in a high-yield savings account (3.5\u20135% APY), money market account, or short-term Treasury bills. These options provide safety (FDIC insurance), liquidity (quick access), and better returns than traditional savings accounts. Avoid investing emergency funds in stocks.' },
              { q: 'What counts as a true emergency?', a: 'True emergencies include job loss, unexpected medical expenses, major home or car repairs, sudden family crises, or temporary disability. Do not use your emergency fund for vacations, new gadgets, lifestyle upgrades, or planned purchases\u2014these should come from your regular budget.' }
            ].map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{item.q}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
            Related Financial Tools
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: 'Salary Breakdown Calculator', description: 'See exactly how your income breaks down after taxes and deductions.', href: '/salary-breakdown-calculator' },
              { title: 'Debt-to-Income Ratio Calculator', description: 'Check your financial health and assess if you can handle more debt.', href: '/debt-to-income-calculator' },
              { title: 'Monthly Budget Calculator', description: 'Create a detailed budget to identify savings opportunities.', href: '/budget-calculator' }
            ].map((tool) => (
              <a key={tool.title} href={tool.href} style={{ display: 'block', backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-card)', textDecoration: 'none', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-card)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{tool.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{tool.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Key Takeaways */}
        <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '2rem', backgroundColor: 'var(--accent-bg)', borderRadius: '12px', border: '2px solid var(--accent-border)', marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Key Takeaways
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              `For a ${familyLabel} earning ${formatCurrency(salary)}, aim for an emergency fund of ${formatCurrency(funds.fund6Months)} to ${formatCurrency(funds.fund12Months)}`,
              `Monthly savings of ${formatCurrency(Math.round(salary / 12 * 0.15))} (15% of gross income) gets you to 6 months in roughly ${savingsPlan[1].months6} months`,
              'Store your fund in a high-yield savings account or money market account for safety and liquidity',
              'Rebuild your emergency fund immediately after using it\u2014treat replenishing it as a top financial priority',
              'Adjust your target based on job stability, dependents, and life stage'
            ].map((item, idx) => (
              <li key={idx} style={{ padding: '0.75rem 0', paddingLeft: '1.5rem', position: 'relative', color: 'var(--text-primary)', lineHeight: 1.7 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', fontWeight: 700 }}>{'\u2713'}</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import CrossTemplateLinks from '../../components/CrossTemplateLinks';
import { buildCrossLinks } from '@/lib/crossLinks';

// DTI thresholds used by lenders
const DTI_THRESHOLDS = {
  excellent: { max: 20, label: 'Excellent', color: '#22c55e', desc: 'Very low debt load. You qualify for the best loan terms and interest rates.' },
  good: { max: 36, label: 'Good', color: '#84cc16', desc: 'Manageable debt level. Most conventional lenders consider this acceptable.' },
  fair: { max: 43, label: 'Fair', color: '#eab308', desc: 'Approaching limits. FHA loans may still be available, but options narrow.' },
  high: { max: 50, label: 'High', color: '#f97316', desc: 'Most lenders will decline conventional loans. Debt reduction is critical.' },
  veryHigh: { max: Infinity, label: 'Very High', color: '#ef4444', desc: 'Severe debt burden. Focus on aggressive debt payoff before new borrowing.' },
};

function getDTIRating(dti) {
  if (dti <= DTI_THRESHOLDS.excellent.max) return DTI_THRESHOLDS.excellent;
  if (dti <= DTI_THRESHOLDS.good.max) return DTI_THRESHOLDS.good;
  if (dti <= DTI_THRESHOLDS.fair.max) return DTI_THRESHOLDS.fair;
  if (dti <= DTI_THRESHOLDS.high.max) return DTI_THRESHOLDS.high;
  return DTI_THRESHOLDS.veryHigh;
}

// Common monthly debt breakdown by income level
function getTypicalDebts(monthlyIncome) {
  return {
    housing: Math.round(monthlyIncome * 0.28),
    carPayment: Math.round(Math.min(monthlyIncome * 0.08, 700)),
    studentLoans: Math.round(Math.min(monthlyIncome * 0.06, 500)),
    creditCards: Math.round(Math.min(monthlyIncome * 0.03, 300)),
    personalLoans: Math.round(Math.min(monthlyIncome * 0.02, 200)),
  };
}

function parseSlug(slug) {
  const match = slug.match(/^(\d+)-income-(\d+)-debt$/);
  if (!match) return null;

  const income = parseInt(match[1]);
  const debt = parseInt(match[2]);

  if (!income || income < 10000 || income > 1000000) return null;
  if (debt < 0 || debt > 100000) return null;

  return { income, debt };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: 'Debt-to-Income Ratio Calculator | Pulsafi',
      description: 'Calculate your debt-to-income ratio and understand what it means for mortgage approval and financial health.',
    };
  }

  const { income, debt } = parsed;
  const monthlyIncome = income / 12;
  const dti = ((debt / monthlyIncome) * 100).toFixed(1);
  const incomeFormatted = formatNumber(income);
  const debtFormatted = formatCurrency(debt);

  return {
    title: `${dti}% DTI Ratio: ${debtFormatted}/mo Debt on ${incomeFormatted} Income | Pulsafi`,
    description: `Your debt-to-income ratio is ${dti}% with ${debtFormatted} monthly debt on a $${incomeFormatted} annual income. See what this means for mortgage approval, loan eligibility, and financial health.`,
    keywords: [
      'debt-to-income ratio',
      'DTI ratio',
      'mortgage qualification',
      `${incomeFormatted} salary DTI`,
      'debt ratio calculator',
      'loan eligibility',
    ],
    alternates: {
      canonical: `/debt-to-income/${slug}`,
    },
    openGraph: {
      title: `${dti}% DTI Ratio: ${debtFormatted}/mo on $${incomeFormatted} Income`,
      description: `Your debt-to-income ratio is ${dti}%. See what this means for mortgage approval and financial health.`,
      type: 'website',
      url: `https://www.pulsafi.com/debt-to-income/${slug}`,
      images: [{ url: `/api/og?title=${dti}%25%20DTI%20Ratio&subtitle=$${incomeFormatted}%20Income&type=calculator`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${dti}% DTI Ratio on $${incomeFormatted} Income`,
      description: `${debtFormatted}/mo debt on $${incomeFormatted} income = ${dti}% DTI. See mortgage eligibility and tips.`,
      images: [`/api/og?title=${dti}%25%20DTI%20Ratio&subtitle=$${incomeFormatted}%20Income&type=calculator`],
    },
  };
}

export function generateStaticParams() {
  const incomes = [30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000];
  const debts = [500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
  const params = [];

  for (const income of incomes) {
    for (const debt of debts) {
      params.push({ slug: `${income}-income-${debt}-debt` });
    }
  }

  return params;
}

export default async function DTIPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { income, debt } = parsed;
  const monthlyIncome = income / 12;
  const dti = (debt / monthlyIncome) * 100;
  const rating = getDTIRating(dti);
  const typicalDebts = getTypicalDebts(monthlyIncome);

  const incomeFormatted = formatNumber(income);
  const monthlyIncomeFormatted = formatCurrency(monthlyIncome);
  const debtFormatted = formatCurrency(debt);

  // Calculate max mortgage payment at different DTI targets
  const maxMortgage28 = Math.round(monthlyIncome * 0.28 - (debt - typicalDebts.housing));
  const maxMortgage36 = Math.round(monthlyIncome * 0.36 - debt);
  const maxMortgage43 = Math.round(monthlyIncome * 0.43 - debt);

  // How much debt to cut to reach target DTIs
  const debtFor36 = Math.max(0, debt - (monthlyIncome * 0.36));
  const debtFor28 = Math.max(0, debt - (monthlyIncome * 0.28));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pulsafi.com' },
          { '@type': 'ListItem', position: 2, name: 'Financial Tools', item: 'https://www.pulsafi.com/tools' },
          { '@type': 'ListItem', position: 3, name: `${dti.toFixed(1)}% DTI Ratio`, item: `https://www.pulsafi.com/debt-to-income/${slug}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What does a ${dti.toFixed(1)}% debt-to-income ratio mean?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `A ${dti.toFixed(1)}% DTI means ${dti.toFixed(1)} cents of every dollar you earn goes to debt payments. This is rated "${rating.label}" by most lenders. ${rating.desc}`,
            },
          },
          {
            '@type': 'Question',
            name: `Can I get a mortgage with a ${dti.toFixed(1)}% DTI?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dti <= 43
                ? `Yes, most lenders accept a DTI of ${dti.toFixed(1)}%. Conventional loans typically require 43% or less, and FHA loans may go up to 50%. With your income of $${incomeFormatted}, you may qualify for a mortgage payment of up to ${formatCurrency(Math.max(0, maxMortgage43))}/month.`
                : `A ${dti.toFixed(1)}% DTI exceeds most conventional loan limits (43%). You would need to reduce monthly debt by ${formatCurrency(Math.ceil(debtFor36))}/month to reach the preferred 36% threshold. Consider FHA loans or debt consolidation strategies.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What is a good debt-to-income ratio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most lenders prefer a DTI below 36%, with 28% or less being ideal for housing costs alone (the "front-end ratio"). The maximum for most conventional mortgages is 43%, though FHA loans may accept up to 50% in some cases.',
            },
          },
          {
            '@type': 'Question',
            name: `How can I lower my DTI from ${dti.toFixed(1)}%?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `You can lower your DTI by increasing income or reducing monthly debt payments. To reach 36%, you need to reduce debt by ${formatCurrency(Math.ceil(debtFor36))}/month or increase annual income. Strategies include debt consolidation, refinancing high-interest loans, and the debt avalanche method.`,
            },
          },
        ],
      },
    ],
  };

  // Comparison DTI scenarios
  const scenarios = [
    { label: 'No debt', debt: 0 },
    { label: '$500/mo', debt: 500 },
    { label: '$1,000/mo', debt: 1000 },
    { label: '$1,500/mo', debt: 1500 },
    { label: '$2,000/mo', debt: 2000 },
    { label: '$2,500/mo', debt: 2500 },
    { label: '$3,000/mo', debt: 3000 },
    { label: '$4,000/mo', debt: 4000 },
    { label: '$5,000/mo', debt: 5000 },
  ];

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

  const thStyle = {
    textAlign: 'left',
    padding: '12px 8px',
    fontSize: 13,
    color: 'var(--text-muted)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const tdStyle = {
    padding: '14px 8px',
    color: 'var(--text-primary)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
        <main style={{ flex: 1, maxWidth: 900, margin: '0 auto', padding: '40px 16px', width: '100%' }}>
          {/* Breadcrumb */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              <a href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</a>
              {' / '}
              <a href="/tools" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Tools</a>
              {' / '}
              <span>DTI Ratio</span>
            </div>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '16px 0', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Debt-to-Income Ratio: {dti.toFixed(1)}%
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              {debtFormatted} monthly debt payments on a ${incomeFormatted} annual income ({monthlyIncomeFormatted}/month)
            </p>
          </div>

          {/* Score Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
            <div style={{
              ...cardStyle,
              marginBottom: 0,
              textAlign: 'center',
              borderLeft: `4px solid ${rating.color}`,
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Your DTI Ratio
              </div>
              <div style={{ fontSize: 42, fontWeight: 700, fontFamily: "'Inter', monospace", color: rating.color }}>
                {dti.toFixed(1)}%
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: rating.color, marginTop: 4 }}>
                {rating.label}
              </div>
            </div>

            <div style={{ ...cardStyle, marginBottom: 0, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Monthly Income
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {monthlyIncomeFormatted}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                ${incomeFormatted}/year gross
              </div>
            </div>

            <div style={{ ...cardStyle, marginBottom: 0, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Monthly Debt
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>
                {debtFormatted}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                {formatCurrency(debt * 12)}/year total
              </div>
            </div>
          </div>

          {/* DTI Visual Bar */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>DTI Scale</h2>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <div style={{ display: 'flex', height: 40, borderRadius: 6, overflow: 'hidden', gap: 2 }}>
                <div style={{ flex: 20, backgroundColor: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>
                  0-20%
                </div>
                <div style={{ flex: 16, backgroundColor: '#84cc16', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>
                  20-36%
                </div>
                <div style={{ flex: 7, backgroundColor: '#eab308', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>
                  36-43%
                </div>
                <div style={{ flex: 7, backgroundColor: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>
                  43-50%
                </div>
                <div style={{ flex: 10, backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 700 }}>
                  50%+
                </div>
              </div>
              <div style={{
                position: 'absolute',
                left: `${Math.min(dti, 60) / 60 * 100}%`,
                top: -8,
                transform: 'translateX(-50%)',
                fontSize: 18,
              }}>
                ▼
              </div>
            </div>
            <p style={{ ...textStyle, margin: 0 }}>{rating.desc}</p>
          </div>

          {/* What This Means */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>What a {dti.toFixed(1)}% DTI Means for You</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>🏠</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Mortgage Eligibility</div>
                  <p style={{ ...textStyle, margin: 0 }}>
                    {dti <= 43
                      ? `With a ${dti.toFixed(1)}% DTI, you likely qualify for conventional mortgages. After accounting for your current debt, you could add up to ${formatCurrency(Math.max(0, maxMortgage43))}/month in housing costs and still stay under 43%.`
                      : `At ${dti.toFixed(1)}%, your DTI exceeds the 43% conventional mortgage limit. You'll need to reduce monthly debt by ${formatCurrency(Math.ceil(debt - monthlyIncome * 0.43))}/month before most lenders will approve a mortgage.`
                    }
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>💳</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Credit & Loans</div>
                  <p style={{ ...textStyle, margin: 0 }}>
                    {dti <= 36
                      ? `A ${dti.toFixed(1)}% DTI is favorable for most credit applications. Personal loans, auto loans, and credit cards should be accessible at competitive rates assuming good credit history.`
                      : `At ${dti.toFixed(1)}%, some lenders may offer higher interest rates or require additional documentation. Consider reducing your DTI to 36% or below for better loan terms.`
                    }
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>📊</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Financial Flexibility</div>
                  <p style={{ ...textStyle, margin: 0 }}>
                    After debt payments of {debtFormatted}/month, you have {formatCurrency(monthlyIncome - debt)} remaining for taxes, savings, groceries, utilities, transportation, and discretionary spending. Financial advisors recommend keeping at least 50% of gross income available for non-debt expenses.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Improvement Plan */}
          {dti > 20 && (
            <div style={cardStyle}>
              <h2 style={headingStyle}>How to Lower Your DTI</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                      <th style={thStyle}>Target DTI</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Reduce Debt By</th>
                      <th style={{ ...thStyle, textAlign: 'right' }}>Or Increase Income To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { target: 36, label: '36% (Good)' },
                      { target: 28, label: '28% (Excellent)' },
                      { target: 20, label: '20% (Ideal)' },
                    ].filter(t => dti > t.target).map((t, i) => {
                      const debtReduction = Math.max(0, debt - (monthlyIncome * t.target / 100));
                      const incomeNeeded = Math.ceil((debt / (t.target / 100)) * 12);
                      return (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-card)' }}>
                          <td style={tdStyle}>{t.label}</td>
                          <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace" }}>
                            {formatCurrency(Math.ceil(debtReduction))}/mo
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace" }}>
                            ${formatNumber(incomeNeeded)}/yr
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div style={{ marginTop: 20 }}>
                <p style={{ ...textStyle, margin: '0 0 12px 0', fontWeight: 600, color: 'var(--text-primary)' }}>Strategies to reduce your DTI:</p>
                <p style={{ ...textStyle, margin: 0 }}>
                  Use the <a href="/learn/debt-avalanche-vs-snowball" style={{ color: 'var(--accent)', textDecoration: 'none' }}>debt avalanche method</a> to eliminate high-interest debt first.
                  Consider <a href="/learn/how-to-pay-off-student-loans-fast" style={{ color: 'var(--accent)', textDecoration: 'none' }}>student loan repayment strategies</a> if applicable.
                  Boost income through <a href="/learn/best-side-hustles-to-make-money-2026" style={{ color: 'var(--accent)', textDecoration: 'none' }}>side hustles</a> or salary negotiation.
                  Refinance high-interest debt to lower monthly payments.
                </p>
              </div>
            </div>
          )}

          {/* DTI Comparison Table */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>DTI at Different Debt Levels (${incomeFormatted} Income)</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <th style={thStyle}>Monthly Debt</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>DTI Ratio</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Rating</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Remaining Income</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((s, i) => {
                    const scenarioDTI = (s.debt / monthlyIncome) * 100;
                    const scenarioRating = getDTIRating(scenarioDTI);
                    const isCurrentRow = s.debt === debt;
                    return (
                      <tr key={i} style={{
                        borderBottom: '1px solid var(--border-card)',
                        backgroundColor: isCurrentRow ? 'var(--accent-bg)' : 'transparent',
                      }}>
                        <td style={tdStyle}>
                          {isCurrentRow ? (
                            <span style={{ fontWeight: 700 }}>{formatCurrency(s.debt)} ← You</span>
                          ) : (
                            <a href={`/debt-to-income/${income}-income-${s.debt}-debt`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                              {s.label}
                            </a>
                          )}
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace", fontWeight: isCurrentRow ? 700 : 400 }}>
                          {scenarioDTI.toFixed(1)}%
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'right' }}>
                          <span style={{ color: scenarioRating.color, fontWeight: 600, fontSize: 13 }}>
                            {scenarioRating.label}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace" }}>
                          {formatCurrency(monthlyIncome - s.debt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compare at Different Incomes */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Compare at Different Income Levels</h2>
            <p style={{ ...textStyle, margin: '0 0 16px 0' }}>
              See how a {debtFormatted}/month debt load affects DTI at various income levels:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
              {[30000, 50000, 75000, 100000, 150000, 200000].map(inc => {
                const scenarioDTI = (debt / (inc / 12)) * 100;
                const scenarioRating = getDTIRating(scenarioDTI);
                const isCurrentIncome = inc === income;
                return (
                  <a
                    key={inc}
                    href={`/debt-to-income/${inc}-income-${debt}-debt`}
                    style={{
                      padding: '12px',
                      backgroundColor: isCurrentIncome ? 'var(--accent)' : 'var(--bg-main)',
                      border: `1px solid ${isCurrentIncome ? 'var(--accent)' : 'var(--border-card)'}`,
                      borderRadius: 6,
                      color: isCurrentIncome ? '#000' : 'var(--text-primary)',
                      textDecoration: 'none',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600, fontFamily: "'Inter', monospace" }}>
                      ${formatNumber(inc)}
                    </div>
                    <div style={{ fontSize: 11, marginTop: 4, color: isCurrentIncome ? '#000' : scenarioRating.color, fontWeight: 600 }}>
                      {scenarioDTI.toFixed(1)}%
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Typical Debt Breakdown */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Typical Monthly Debt Breakdown</h2>
            <p style={{ ...textStyle, margin: '0 0 16px 0' }}>
              Common monthly debt obligations for someone earning ${incomeFormatted}/year:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <th style={thStyle}>Expense</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Typical Amount</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>% of Income</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Housing (Mortgage/Rent)', amount: typicalDebts.housing },
                    { label: 'Car Payment', amount: typicalDebts.carPayment },
                    { label: 'Student Loans', amount: typicalDebts.studentLoans },
                    { label: 'Credit Cards (Min)', amount: typicalDebts.creditCards },
                    { label: 'Personal Loans', amount: typicalDebts.personalLoans },
                  ].map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--border-card)' }}>
                      <td style={tdStyle}>{item.label}</td>
                      <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace" }}>{formatCurrency(item.amount)}</td>
                      <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace" }}>{((item.amount / monthlyIncome) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr style={{ backgroundColor: 'var(--accent-bg)' }}>
                    <td style={{ ...tdStyle, fontWeight: 600 }}>Total Typical Debt</td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace", fontWeight: 600, color: 'var(--accent)' }}>
                      {formatCurrency(Object.values(typicalDebts).reduce((a, b) => a + b, 0))}
                    </td>
                    <td style={{ ...tdStyle, textAlign: 'right', fontFamily: "'Inter', monospace", fontWeight: 600, color: 'var(--accent)' }}>
                      {((Object.values(typicalDebts).reduce((a, b) => a + b, 0) / monthlyIncome) * 100).toFixed(1)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Lender Guidelines */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Lender DTI Guidelines</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <th style={thStyle}>Loan Type</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Max Front-End</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Max Back-End</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>Your Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Conventional', front: 28, back: 36 },
                    { type: 'Conventional (flexible)', front: 31, back: 43 },
                    { type: 'FHA', front: 31, back: 43 },
                    { type: 'FHA (compensating)', front: 40, back: 50 },
                    { type: 'VA', front: 'N/A', back: 41 },
                    { type: 'USDA', front: 29, back: 41 },
                  ].map((loan, i) => {
                    const eligible = typeof loan.back === 'number' ? dti <= loan.back : true;
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-card)' }}>
                        <td style={tdStyle}>{loan.type}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>{typeof loan.front === 'number' ? `${loan.front}%` : loan.front}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>{typeof loan.back === 'number' ? `${loan.back}%` : loan.back}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: 12,
                            fontSize: 12,
                            fontWeight: 600,
                            backgroundColor: eligible ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                            color: eligible ? '#22c55e' : '#ef4444',
                          }}>
                            {eligible ? 'Eligible' : 'Over Limit'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div style={cardStyle}>
            <h2 style={headingStyle}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border-card)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
                  What does a {dti.toFixed(1)}% debt-to-income ratio mean?
                </h3>
                <p style={{ ...textStyle, margin: 0 }}>
                  A {dti.toFixed(1)}% DTI means {dti.toFixed(1)} cents of every dollar you earn before taxes goes toward debt payments. With your ${incomeFormatted} annual income ({monthlyIncomeFormatted}/month), your {debtFormatted} in monthly debt payments results in this ratio. Lenders rate this as "{rating.label}."
                </p>
              </div>
              <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border-card)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
                  What is a good debt-to-income ratio?
                </h3>
                <p style={{ ...textStyle, margin: 0 }}>
                  Below 20% is considered excellent, 20-36% is good, 36-43% is fair, and above 43% is high. Most conventional mortgage lenders require a DTI of 43% or less. For the best interest rates and loan terms, aim for 36% or below.
                </p>
              </div>
              <div style={{ paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border-card)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
                  How is DTI calculated?
                </h3>
                <p style={{ ...textStyle, margin: 0 }}>
                  DTI = (Total Monthly Debt Payments / Gross Monthly Income) x 100. For your situation: ({debtFormatted} / {monthlyIncomeFormatted}) x 100 = {dti.toFixed(1)}%. This includes all recurring debt obligations like mortgage/rent, car loans, student loans, and minimum credit card payments.
                </p>
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
                  What is front-end vs back-end DTI?
                </h3>
                <p style={{ ...textStyle, margin: 0 }}>
                  Front-end DTI (also called the housing ratio) only includes housing costs like mortgage, property tax, and insurance. Back-end DTI includes all monthly debt obligations. Your {dti.toFixed(1)}% is your back-end DTI. Lenders typically want front-end DTI below 28% and back-end below 36-43%.
                </p>
              </div>
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
                { href: '/learn/debt-avalanche-vs-snowball', label: 'Debt Avalanche vs Snowball' },
                { href: '/learn/how-to-pay-off-student-loans-fast', label: 'Pay Off Student Loans Fast' },
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
          <CrossTemplateLinks
            title={`Related Data at ${formatCurrency(income)} Income`}
            description={`Explore take-home pay, affordability, mortgage capacity, and retirement planning at this income level.`}
            links={buildCrossLinks({ income }, { exclude: ['dti'], limit: 6 })}
          />
        </main>

        <Footer />
      </div>
    </>
  );
}

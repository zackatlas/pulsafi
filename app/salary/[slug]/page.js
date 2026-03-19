import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import stateTaxData from '../../data/stateTaxData';

const FEDERAL_BRACKETS = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION = 15000;
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

function calculateFederalTax(grossIncome) {
  const taxableIncome = Math.max(0, grossIncome - STANDARD_DEDUCTION);
  let tax = 0;

  for (const bracket of FEDERAL_BRACKETS) {
    if (taxableIncome <= bracket.min) break;
    const income = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += income * bracket.rate;
  }

  return tax;
}

function calculateFICA(grossIncome) {
  const socialSecurityWages = Math.min(grossIncome, SOCIAL_SECURITY_WAGE_BASE);
  const socialSecurityTax = socialSecurityWages * SOCIAL_SECURITY_RATE;

  const medicareTax = grossIncome * MEDICARE_RATE;
  const additionalMedicareTax = grossIncome > ADDITIONAL_MEDICARE_THRESHOLD
    ? (grossIncome - ADDITIONAL_MEDICARE_THRESHOLD) * ADDITIONAL_MEDICARE_RATE
    : 0;

  return {
    socialSecurity: socialSecurityTax,
    medicare: medicareTax,
    additionalMedicare: additionalMedicareTax,
    total: socialSecurityTax + medicareTax + additionalMedicareTax,
  };
}

function parseSlug(slug) {
  const match = slug.match(/^(\d+)-salary-in-(.+)$/);
  if (!match) return null;

  const salary = parseInt(match[1]);
  const stateKey = match[2].toLowerCase();

  if (!salary || salary < 1000 || salary > 10000000) return null;
  if (!stateTaxData[stateKey]) return null;

  return { salary, stateKey, state: stateTaxData[stateKey] };
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
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: 'Salary After Taxes | Pulsafi',
      description: 'Calculate take-home pay after federal and state taxes.',
    };
  }

  const { salary, state } = parsed;
  const salaryFormatted = new Intl.NumberFormat('en-US').format(salary);

  return {
    title: `${salaryFormatted} Salary After Taxes in ${state.name} — Take-Home Pay | Pulsafi`,
    description: `Calculate your take-home pay on a ${salaryFormatted} salary in ${state.name}. See federal tax, state income tax, Social Security, and Medicare deductions. Updated for 2025/2026.`,
    keywords: [
      `${salaryFormatted} salary`,
      `salary in ${state.name}`,
      `take-home pay`,
      `after tax income`,
      `salary calculator`,
      `${state.abbr} income tax`,
    ],
    openGraph: {
      title: `${salaryFormatted} Salary After Taxes in ${state.name}`,
      description: `Calculate your take-home pay on a ${salaryFormatted} salary in ${state.name}. See federal tax, state income tax, Social Security, and Medicare deductions.`,
      type: 'website',
      url: `https://pulsafi.com/salary/${slug}`,
      images: [{ url: `/api/og?title=${salaryFormatted}%20Salary&subtitle=After%20Taxes%20in%20${state.name}&type=salary`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${salaryFormatted} Salary After Taxes in ${state.name}`,
      description: `Calculate take-home pay: federal tax, state tax, Social Security, Medicare on a ${salaryFormatted} salary.`,
      images: [`/api/og?title=${salaryFormatted}%20Salary&subtitle=After%20Taxes%20in%20${state.name}&type=salary`],
    },
  };
}

export function generateStaticParams() {
  // Pre-render only the most popular salary points to avoid timeouts
  // This reduces from ~1,350 (51 states × 27 salaries) to ~255 (51 states × 5 salaries)
  // Rest will be generated on-demand via ISR
  const salaries = [50000, 75000, 100000, 150000, 200000];
  const states = Object.keys(stateTaxData);
  const params = [];

  for (const state of states) {
    for (const salary of salaries) {
      params.push({ slug: `${salary}-salary-in-${state}` });
    }
  }

  return params;
}

export default async function SalaryPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { salary, state } = parsed;

  const federalTax = calculateFederalTax(salary);
  const fica = calculateFICA(salary);
  const stateTax = (salary * state.rate) / 100;
  const totalTaxes = federalTax + fica.total + stateTax;
  const takeHome = salary - totalTaxes;

  const salaryFormatted = new Intl.NumberFormat('en-US').format(salary);
  const effectiveTaxRate = ((totalTaxes / salary) * 100).toFixed(2);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://pulsafi.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Salary Calculator',
            item: 'https://pulsafi.com/tools/salary-breakdown-calculator',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${salaryFormatted} Salary in ${state.name}`,
            item: `https://pulsafi.com/salary/${slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `How much do I take home on a ${salaryFormatted} salary in ${state.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Your annual take-home pay on a ${salaryFormatted} salary in ${state.name} is ${formatCurrency(takeHome)} after federal tax (${formatCurrency(federalTax)}), state tax (${formatCurrency(stateTax)}), Social Security (${formatCurrency(fica.socialSecurity)}), and Medicare (${formatCurrency(fica.medicare + fica.additionalMedicare)}).`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the effective tax rate on a ${salaryFormatted} salary in ${state.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The effective tax rate is ${effectiveTaxRate}%, meaning you pay ${formatCurrency(totalTaxes)} in total taxes.`,
            },
          },
          {
            '@type': 'Question',
            name: `How does ${state.name} income tax affect my take-home pay?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${state.name} charges a ${state.rate}% state income tax rate (using the top marginal rate). This results in ${formatCurrency(stateTax)} in state taxes on a ${salaryFormatted} salary.`,
            },
          },
        ],
      },
    ],
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
              <a href="/tools/salary-breakdown-calculator" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Salary Calculator</a>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '16px 0', color: 'var(--text-primary)' }}>
              {salaryFormatted} Salary After Taxes in {state.name}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              Calculate your exact take-home pay with federal, state, Social Security, and Medicare taxes (2025/2026 rates).
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 40 }}>
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 8,
              padding: 20,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Annual Take-Home
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {formatCurrency(takeHome)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                <div>Monthly: {formatCurrency(takeHome / 12)}</div>
                <div>Biweekly: {formatCurrency(takeHome / 26)}</div>
                <div>Weekly: {formatCurrency(takeHome / 52)}</div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 8,
              padding: 20,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Total Taxes
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {formatCurrency(totalTaxes)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                <div>Monthly: {formatCurrency(totalTaxes / 12)}</div>
                <div>Biweekly: {formatCurrency(totalTaxes / 26)}</div>
              </div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 8,
              padding: 20,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Effective Tax Rate
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {effectiveTaxRate}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                Combined federal, state & FICA
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 20px 0', color: 'var(--text-primary)' }}>
              Tax Breakdown
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Tax Type</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Amount</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>% of Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Federal Income Tax</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(federalTax)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', color: 'var(--text-secondary)', fontFamily: "'Inter', monospace" }}>{formatNumber((federalTax / salary) * 100)}%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>State Income Tax ({state.abbr})</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(stateTax)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', color: 'var(--text-secondary)', fontFamily: "'Inter', monospace" }}>{state.rate.toFixed(2)}%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Social Security (6.2%)</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(fica.socialSecurity)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', color: 'var(--text-secondary)', fontFamily: "'Inter', monospace" }}>{formatNumber((fica.socialSecurity / salary) * 100)}%</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Medicare (1.45%)</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(fica.medicare)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', color: 'var(--text-secondary)', fontFamily: "'Inter', monospace" }}>{formatNumber((fica.medicare / salary) * 100)}%</td>
                  </tr>
                  {fica.additionalMedicare > 0 && (
                    <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                      <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Additional Medicare (0.9%)</td>
                      <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(fica.additionalMedicare)}</td>
                      <td style={{ textAlign: 'right', padding: '16px 0', color: 'var(--text-secondary)', fontFamily: "'Inter', monospace" }}>{formatNumber((fica.additionalMedicare / salary) * 100)}%</td>
                    </tr>
                  )}
                  <tr style={{ backgroundColor: 'var(--accent-bg)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)', fontWeight: 600 }}>Total Taxes</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--accent)', fontWeight: 600 }}>{formatCurrency(totalTaxes)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', color: 'var(--accent)', fontFamily: "'Inter', monospace", fontWeight: 600 }}>{effectiveTaxRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 20px 0', color: 'var(--text-primary)' }}>
              Tax Visualization
            </h2>
            <div style={{ display: 'flex', height: 40, gap: 1, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                flex: takeHome / salary,
                backgroundColor: 'var(--accent)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#000',
                fontWeight: 700,
                fontFamily: "'Inter', monospace",
                minWidth: '40px',
              }}>
                {((takeHome / salary) * 100).toFixed(0)}%
              </div>
              <div style={{
                flex: federalTax / salary,
                backgroundColor: 'rgba(201, 162, 39, 0.6)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: '#fff',
                fontWeight: 600,
              }}>
                {((federalTax / salary) * 100).toFixed(0)}%
              </div>
              <div style={{
                flex: stateTax / salary,
                backgroundColor: 'rgba(201, 162, 39, 0.4)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: '#fff',
                fontWeight: 600,
              }}>
                {((stateTax / salary) * 100).toFixed(0)}%
              </div>
              <div style={{
                flex: fica.total / salary,
                backgroundColor: 'rgba(201, 162, 39, 0.25)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                color: '#fff',
                fontWeight: 600,
              }}>
                {((fica.total / salary) * 100).toFixed(0)}%
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap', fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: 'var(--accent)', borderRadius: 2 }}></div>
                <span>Take-Home ({((takeHome / salary) * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: 'rgba(201, 162, 39, 0.6)', borderRadius: 2 }}></div>
                <span>Federal Tax ({((federalTax / salary) * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: 'rgba(201, 162, 39, 0.4)', borderRadius: 2 }}></div>
                <span>State Tax ({((stateTax / salary) * 100).toFixed(1)}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, backgroundColor: 'rgba(201, 162, 39, 0.25)', borderRadius: 2 }}></div>
                <span>FICA ({((fica.total / salary) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              About Tax in {state.name}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: '0 0 12px 0' }}>
              {state.name} has a {state.type === 'none' ? 'no state income tax' : `state income tax with a top marginal rate of ${state.rate}%`}. This calculation uses 2025/2026 tax brackets and rates.
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: '0 0 12px 0' }}>
              Your federal tax is calculated using single filer 2025 tax brackets after the standard deduction of ${formatCurrency(STANDARD_DEDUCTION)}. FICA taxes include Social Security (6.2% up to ${formatCurrency(SOCIAL_SECURITY_WAGE_BASE)}) and Medicare (1.45% + additional 0.9% over ${formatCurrency(ADDITIONAL_MEDICARE_THRESHOLD)}).
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: 0 }}>
              This is an estimate. Your actual take-home may vary based on filing status, deductions, credits, and other factors. Use this calculator for planning purposes.
            </p>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              Compare Salaries
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: '0 0 16px 0' }}>
              See how different salaries compare in {state.name}:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
              {[50000, 75000, 100000, 150000].map(s => (
                <a
                  key={s}
                  href={`/salary/${s}-salary-in-${state.name.toLowerCase().replace(/\s+/g, '')}`}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: s === salary ? 'var(--accent)' : 'var(--bg-main)',
                    border: `1px solid ${s === salary ? 'var(--accent)' : 'var(--border-card)'}`,
                    borderRadius: 6,
                    color: s === salary ? '#000' : 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Inter', monospace",
                    textAlign: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  {new Intl.NumberFormat('en-US').format(s)}
                </a>
              ))}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              Compare States
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: '0 0 16px 0' }}>
              See how {state.name} compares to other states at this salary level:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8 }}>
              {['texas', 'florida', 'california', 'newyork', 'colorado'].map(stateKey => {
                const s = stateTaxData[stateKey];
                return (
                  <a
                    key={stateKey}
                    href={`/salary/${salary}-salary-in-${stateKey}`}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: stateKey === Object.keys(stateTaxData).find(k => stateTaxData[k].name === state.name) ? 'var(--accent)' : 'var(--bg-main)',
                      border: `1px solid ${stateKey === Object.keys(stateTaxData).find(k => stateTaxData[k].name === state.name) ? 'var(--accent)' : 'var(--border-card)'}`,
                      borderRadius: 6,
                      color: stateKey === Object.keys(stateTaxData).find(k => stateTaxData[k].name === state.name) ? '#000' : 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    {s.abbr}
                  </a>
                );
              })}
            </div>
          </div>

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 16px 0', color: 'var(--text-primary)' }}>
              Related Tools
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <a
                href="/tools/salary-breakdown-calculator"
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
              >
                Salary Calculator
              </a>
              <a
                href="/tools/net-worth-calculator"
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
              >
                Net Worth Calculator
              </a>
              <a
                href="/tools/mortgage-calculator"
                style={{
                  padding: '12px 16px',
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 6,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.2s',
                }}
              >
                Mortgage Calculator
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

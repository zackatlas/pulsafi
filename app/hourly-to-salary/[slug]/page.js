'use server';

import Footer from '../../../components/Footer';

// Parse slug like "15-dollars-an-hour" or "22-50-dollars-an-hour"
function parseSlug(slug) {
  const match = slug.match(/^([\d-]+)-dollars-an-hour$/);
  if (!match) {
    throw new Error('Invalid slug format');
  }

  const amountStr = match[1].replace(/-([^-]*)$/, '.$1').replace(/^-/, '');
  const amount = parseFloat(amountStr);

  if (isNaN(amount) || amount < 7 || amount > 200) {
    throw new Error('Invalid hourly rate');
  }

  return amount;
}

// Format slug for display: "22-50" -> "$22.50"
function formatAmountFromSlug(slugAmount) {
  const parts = slugAmount.split('-');
  if (parts.length === 2 && parts[1].length <= 2) {
    return `$${parts[0]}.${parts[1]}`;
  }
  return `$${slugAmount}`;
}

// Calculate all salary metrics
function calculateSalary(hourlyRate) {
  const annual = hourlyRate * 40 * 52;
  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = hourlyRate * 40;
  const daily = hourlyRate * 8;

  const taxRate = 0.22;
  const annualAfterTax = annual * (1 - taxRate);
  const monthlyAfterTax = monthly * (1 - taxRate);
  const weeklyAfterTax = weekly * (1 - taxRate);

  // Overtime (time-and-a-half)
  const overtimeRate = hourlyRate * 1.5;
  const annual5hrOvertime = (hourlyRate * 40 * 52) + (overtimeRate * 5 * 52);
  const annual10hrOvertime = (hourlyRate * 40 * 52) + (overtimeRate * 10 * 52);

  // Part-time
  const annual20hr = hourlyRate * 20 * 52;
  const annual30hr = hourlyRate * 30 * 52;

  return {
    hourly: hourlyRate,
    annual,
    monthly,
    biweekly,
    weekly,
    daily,
    annualAfterTax,
    monthlyAfterTax,
    weeklyAfterTax,
    overtimeRate,
    annual5hrOvertime,
    annual10hrOvertime,
    annual20hr,
    annual30hr,
  };
}

// Generate static params for all pre-rendered pages
export async function generateStaticParams() {
  const wholeDollars = [7.25, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 42, 45, 48, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120, 130, 140, 150, 175, 200];

  const halfDollars = [7.5, 8.5, 9.5, 10.5, 11.5, 12.5, 13.5, 14.5, 15.5, 16.5, 17.5, 18.5, 19.5, 20.5, 21.5, 22.5, 23.5, 24.5, 25.5, 27.5, 30.5, 32.5, 35.5, 37.5, 40.5, 42.5, 45.5, 47.5, 50.5, 55.5, 60.5];

  const allRates = [...wholeDollars, ...halfDollars].sort((a, b) => a - b);

  return allRates.map((rate) => {
    const slugAmount = rate.toString().includes('.')
      ? rate.toString().replace('.', '-')
      : rate.toString();
    return { slug: `${slugAmount}-dollars-an-hour` };
  });
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hourlyRate = parseSlug(slug);
  const displayAmount = formatAmountFromSlug(slug.replace('-dollars-an-hour', ''));

  const title = `${displayAmount} an Hour is How Much a Year? | Salary Calculator | Pulsafi`;
  const description = `Discover exactly how much ${displayAmount}/hour equals annually, monthly, and weekly. Includes after-tax estimates and overtime calculations.`;
  const keywords = `${displayAmount} an hour, hourly to salary, salary calculator, annual salary`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  };
}

export default async function HourlyToSalaryPage({ params }) {
  const { slug } = await params;
  const hourlyRate = parseSlug(slug);
  const displayAmount = formatAmountFromSlug(slug.replace('-dollars-an-hour', ''));
  const salary = calculateSalary(hourlyRate);

  // Federal minimum wage comparison
  const federalMinimum = 7.25;
  const medianWage = 30;
  const aboveMinimum = ((hourlyRate - federalMinimum) / federalMinimum * 100).toFixed(1);
  const vsMedian = hourlyRate >= medianWage
    ? `${((hourlyRate - medianWage) / medianWage * 100).toFixed(1)}% above`
    : `${((medianWage - hourlyRate) / medianWage * 100).toFixed(1)}% below`;

  // Generate nearby rates for comparison
  const nearbyRates = [];
  const current = hourlyRate;
  const rates = [-3, -2, -1, 1, 2, 3];
  rates.forEach(offset => {
    const nearby = current + offset;
    if (nearby >= 7 && nearby <= 200) {
      const nearbySlug = nearby.toString().includes('.')
        ? nearby.toString().replace('.', '-')
        : nearby.toString();
      nearbyRates.push({
        rate: nearby,
        display: nearby.toString().includes('.') ? nearby : `${nearby}.00`,
        slug: `${nearbySlug}-dollars-an-hour`,
      });
    }
  });

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://pulsafi.com',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Hourly to Salary',
            'item': 'https://pulsafi.com/hourly-to-salary',
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': `${displayAmount}/hour`,
            'item': `https://pulsafi.com/hourly-to-salary/${slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': `How much is ${displayAmount} an hour annually?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `${displayAmount} an hour equals $${salary.annual.toLocaleString('en-US', { maximumFractionDigits: 2 })} per year, based on 40 hours per week for 52 weeks.`,
            },
          },
          {
            '@type': 'Question',
            'name': `What is ${displayAmount} an hour after taxes?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `With an estimated 22% effective tax rate, ${displayAmount}/hour results in approximately $${salary.annualAfterTax.toLocaleString('en-US', { maximumFractionDigits: 2 })} annually after taxes.`,
            },
          },
          {
            '@type': 'Question',
            'name': `Is ${displayAmount} an hour a good salary?`,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': `${displayAmount}/hour equals ${aboveMinimum}% above the federal minimum wage. Whether this is a "good" salary depends on your location, cost of living, and personal circumstances.`,
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={styles.container}>
        {/* Breadcrumb */}
        <div style={styles.breadcrumb}>
          <a href="/" style={styles.breadcrumbLink}>Home</a>
          <span style={styles.breadcrumbSeparator}>/</span>
          <a href="/hourly-to-salary" style={styles.breadcrumbLink}>Hourly to Salary</a>
          <span style={styles.breadcrumbSeparator}>/</span>
          <span style={styles.breadcrumbCurrent}>{displayAmount}/hour</span>
        </div>

        {/* Hero Section */}
        <div style={styles.heroSection}>
          <h1 style={styles.h1}>{displayAmount} an Hour is How Much a Year?</h1>
          <p style={styles.subtitle}>
            Find out exactly how much {displayAmount}/hour equals annually, monthly, and weekly — plus after-tax estimates and overtime calculations.
          </p>
        </div>

        {/* Key Metric Cards */}
        <div style={styles.metricGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Annual Salary</div>
            <div style={styles.metricValue}>${salary.annual.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
            <div style={styles.metricNote}>before taxes</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Monthly Income</div>
            <div style={styles.metricValue}>${salary.monthly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
            <div style={styles.metricNote}>average per month</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Weekly Pay</div>
            <div style={styles.metricValue}>${salary.weekly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
            <div style={styles.metricNote}>40 hours per week</div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricLabel}>Estimated Take-Home</div>
            <div style={styles.metricValue}>${salary.annualAfterTax.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
            <div style={styles.metricNote}>after ~22% taxes</div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Detailed Income Breakdown</h2>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Time Period</th>
                  <th style={styles.tableHeader}>Gross</th>
                  <th style={styles.tableHeader}>After Tax (est.)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Daily (8 hrs)</td>
                  <td style={styles.tableCell}>${salary.daily.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>${(salary.daily * 0.78).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Weekly (40 hrs)</td>
                  <td style={styles.tableCell}>${salary.weekly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>${salary.weeklyAfterTax.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Biweekly</td>
                  <td style={styles.tableCell}>${salary.biweekly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>${(salary.biweekly * 0.78).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Monthly</td>
                  <td style={styles.tableCell}>${salary.monthly.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>${salary.monthlyAfterTax.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Annual</td>
                  <td style={styles.tableCell}>${salary.annual.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>${salary.annualAfterTax.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Overtime Earnings */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Overtime Earnings (Time-and-a-Half)</h2>
          <p style={styles.sectionDescription}>
            Overtime rate at time-and-a-half: <span style={styles.highlightValue}>${salary.overtimeRate.toLocaleString('en-US', { maximumFractionDigits: 2 })}/hour</span>
          </p>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.tableHeader}>Scenario</th>
                  <th style={styles.tableHeader}>Annual Earnings</th>
                  <th style={styles.tableHeader}>vs. Regular 40 hrs</th>
                </tr>
              </thead>
              <tbody>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>Regular 40 hrs/week</td>
                  <td style={styles.tableCell}>${salary.annual.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>—</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>5 hrs overtime/week</td>
                  <td style={styles.tableCell}>${salary.annual5hrOvertime.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>+${(salary.annual5hrOvertime - salary.annual).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>10 hrs overtime/week</td>
                  <td style={styles.tableCell}>${salary.annual10hrOvertime.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                  <td style={styles.tableCell}>+${(salary.annual10hrOvertime - salary.annual).toLocaleString('en-US', { maximumFractionDigits: 2 })}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Part-Time Scenarios */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Part-Time Scenarios</h2>
          <p style={styles.sectionDescription}>
            Working part-time at {displayAmount}/hour:
          </p>
          <div style={styles.metricGrid}>
            <div style={styles.metricCard}>
              <div style={styles.metricLabel}>20 hrs/week</div>
              <div style={styles.metricValue}>${salary.annual20hr.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <div style={styles.metricNote}>annual</div>
            </div>

            <div style={styles.metricCard}>
              <div style={styles.metricLabel}>30 hrs/week</div>
              <div style={styles.metricValue}>${salary.annual30hr.toLocaleString('en-US', { maximumFractionDigits: 2 })}</div>
              <div style={styles.metricNote}>annual</div>
            </div>
          </div>
        </div>

        {/* How It Compares */}
        <div style={styles.section}>
          <h2 style={styles.h2}>How It Compares</h2>
          <div style={styles.comparisonCard}>
            <div style={styles.comparisonItem}>
              <div style={styles.comparisonLabel}>vs. Federal Minimum Wage ($7.25/hr)</div>
              <div style={styles.comparisonValue}>{aboveMinimum}% above</div>
            </div>
            <div style={styles.comparisonItem}>
              <div style={styles.comparisonLabel}>vs. Median US Hourly Wage (~$30/hr)</div>
              <div style={styles.comparisonValue}>{vsMedian}</div>
            </div>
          </div>
          <p style={styles.sectionDescription}>
            These comparisons help provide context for how your hourly rate stacks up against national benchmarks. Whether {displayAmount}/hour is a good salary depends on your location, industry, and cost of living.
          </p>
        </div>

        {/* Compare Nearby Rates */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Compare Nearby Hourly Rates</h2>
          <p style={styles.sectionDescription}>
            See how different hourly rates compare:
          </p>
          <div style={styles.linkGrid}>
            {nearbyRates.sort((a, b) => a.rate - b.rate).map((nearby) => (
              <a
                key={nearby.slug}
                href={`/hourly-to-salary/${nearby.slug}`}
                style={{
                  ...styles.comparisonLink,
                  ...(nearby.rate === hourlyRate ? styles.comparisonLinkActive : {}),
                }}
              >
                ${nearby.display}/hr
              </a>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div style={styles.section}>
          <h2 style={styles.h2}>Related Tools</h2>
          <div style={styles.linkGrid}>
            <a href="/salary-calculator" style={styles.toolLink}>
              Salary Calculator
            </a>
            <a href="/budget-calculator" style={styles.toolLink}>
              Budget Calculator
            </a>
            <a href="/tax-calculator" style={styles.toolLink}>
              Tax Calculator
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Inline styles matching design system
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 16px',
    color: 'var(--text-primary)',
  },
  breadcrumb: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginBottom: '32px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  breadcrumbLink: {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    color: 'var(--text-muted)',
  },
  breadcrumbCurrent: {
    color: 'var(--text-primary)',
    fontWeight: '500',
  },
  heroSection: {
    marginBottom: '48px',
    textAlign: 'center',
  },
  h1: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '48px',
    fontWeight: '700',
    lineHeight: '1.2',
    marginBottom: '16px',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    maxWidth: '700px',
    margin: '0 auto',
  },
  metricGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '48px',
  },
  metricCard: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: '8px',
    padding: '24px',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '500',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '12px',
  },
  metricValue: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '32px',
    fontWeight: '600',
    color: 'var(--accent)',
    marginBottom: '8px',
  },
  metricNote: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: '48px',
  },
  h2: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '32px',
    fontWeight: '700',
    marginBottom: '24px',
    color: 'var(--text-primary)',
  },
  sectionDescription: {
    fontSize: '16px',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
    marginBottom: '24px',
  },
  highlightValue: {
    fontFamily: 'DM Mono, monospace',
    fontWeight: '600',
    color: 'var(--accent)',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '8px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: 'DM Sans, sans-serif',
  },
  tableHeaderRow: {
    backgroundColor: 'var(--accent-bg)',
    borderBottom: '2px solid var(--border-card)',
  },
  tableHeader: {
    padding: '16px',
    textAlign: 'left',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--text-primary)',
  },
  tableRow: {
    borderBottom: '1px solid var(--border-card)',
  },
  tableCell: {
    padding: '16px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    fontFamily: 'DM Mono, monospace',
  },
  comparisonCard: {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  comparisonItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  comparisonLabel: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontWeight: '500',
    marginBottom: '8px',
  },
  comparisonValue: {
    fontFamily: 'DM Mono, monospace',
    fontSize: '24px',
    fontWeight: '600',
    color: 'var(--accent)',
  },
  linkGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
  },
  comparisonLink: {
    display: 'block',
    padding: '12px 16px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: '6px',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'var(--accent)',
    fontWeight: '500',
    fontSize: '14px',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'all 0.2s ease',
  },
  comparisonLinkActive: {
    backgroundColor: 'var(--accent-bg)',
    borderColor: 'var(--accent)',
    color: 'var(--accent)',
    fontWeight: '600',
  },
  toolLink: {
    display: 'block',
    padding: '16px',
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border-card)',
    borderRadius: '8px',
    textAlign: 'center',
    textDecoration: 'none',
    color: 'var(--accent)',
    fontWeight: '500',
    fontSize: '16px',
    fontFamily: 'DM Sans, sans-serif',
    transition: 'all 0.2s ease',
  },
};

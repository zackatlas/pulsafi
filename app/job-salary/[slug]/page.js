import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import { jobSalaryData, stateMultipliers } from '../../data/jobSalaryData';
import stateTaxData from '../../data/stateTaxData';
import cityData from '../../data/cityData';

function parseSlug(slug) {
  const match = slug.match(/^(.+)-salary-in-(.+)$/);
  if (!match) return null;

  const jobSlug = match[1].toLowerCase();
  const stateKey = match[2].toLowerCase();

  if (!jobSalaryData[jobSlug]) return null;
  if (!stateTaxData[stateKey]) return null;
  if (!stateMultipliers[stateKey]) return null;

  return {
    jobSlug,
    stateKey,
    job: jobSalaryData[jobSlug],
    state: stateTaxData[stateKey],
    multiplier: stateMultipliers[stateKey],
  };
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

function getRelatedJobs(jobSlug, category) {
  const jobsInCategory = Object.entries(jobSalaryData)
    .filter(([_, job]) => job.category === category && jobSlug !== _)
    .slice(0, 4)
    .map(([slug, job]) => ({ slug, title: job.title }));
  return jobsInCategory;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    return {
      title: 'Job Salary by State | Pulsafi',
      description: 'Explore job salaries by state with median, entry-level, and senior compensation data.',
    };
  }

  const { job, state } = parsed;

  return {
    title: `${job.title} Salary in ${state.name} — Median Pay & Career Data | Pulsafi`,
    description: `Explore ${job.title.toLowerCase()} salaries in ${state.name} including median pay, entry-level and senior compensation, and how it compares to the national average.`,
    keywords: [
      `${job.title.toLowerCase()} salary`,
      `${job.title.toLowerCase()} salary in ${state.name}`,
      `${job.title.toLowerCase()} pay`,
      `${state.name} ${job.title.toLowerCase()}`,
      `median ${job.title.toLowerCase()} salary`,
      `job salary calculator`,
    ],
    alternates: {
      canonical: `/job-salary/${slug}`,
    },
    openGraph: {
      title: `${job.title} Salary in ${state.name}`,
      description: `Explore ${job.title.toLowerCase()} salaries in ${state.name} including median pay, entry-level and senior compensation.`,
      type: 'website',
      url: `https://www.pulsafi.com/job-salary/${slug}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(job.title)}%20Salary&subtitle=in%20${encodeURIComponent(state.name)}&type=job`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} Salary in ${state.name}`,
      description: `Median pay, entry-level and senior compensation for ${job.title.toLowerCase()} in ${state.name}.`,
      images: [
        `/api/og?title=${encodeURIComponent(job.title)}%20Salary&subtitle=in%20${encodeURIComponent(state.name)}&type=job`,
      ],
    },
  };
}

export function generateStaticParams() {
  const params = [];

  // Pre-render only top 15 most popular job-state combinations to avoid timeouts
  // Rest will be generated on-demand via ISR
  const topJobs = Object.keys(jobSalaryData).slice(0, 15);
  const topStates = Object.keys(stateMultipliers).slice(0, 15);

  for (const jobSlug of topJobs) {
    for (const stateKey of topStates) {
      params.push({ slug: `${jobSlug}-salary-in-${stateKey}` });
    }
  }

  return params;
}

export default async function JobSalaryPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const { jobSlug, stateKey, job, state, multiplier } = parsed;

  const medianSalary = Math.round(job.medianSalary * multiplier);
  const entryLevelSalary = Math.round(job.entryLevelSalary * multiplier);
  const seniorSalary = Math.round(job.seniorSalary * multiplier);
  const nationalMedianSalary = job.medianSalary;

  const relatedJobs = getRelatedJobs(jobSlug, job.category);

  // ── Cross-template internal links ──
  // stateKey here is the concatenated stateTaxData form ("newyork").
  // /mortgage and /tax-brackets need the hyphenated form ("new-york").
  const stateSlugHyphenated = state.name.toLowerCase().replace(/\s+/g, "-");
  const SALARY_TIERS = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const AFFORD_TIERS = [40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 90000, 100000, 120000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const TAX_TIERS = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000];
  const RETIREMENT_SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const MORTGAGE_PRICES = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000];
  const nearest = (v, t) => t.reduce((best, x) => (Math.abs(x - v) < Math.abs(best - v) ? x : best), t[0]);

  const salaryForTake = nearest(medianSalary, SALARY_TIERS);
  const salaryForAfford = nearest(medianSalary, AFFORD_TIERS);
  const salaryForTax = nearest(medianSalary, TAX_TIERS);
  const salaryForRet = nearest(medianSalary, RETIREMENT_SALARIES);
  const homePriceForMortgage = nearest(Math.round(medianSalary * 4), MORTGAGE_PRICES);
  const medianFmt = `$${medianSalary.toLocaleString()}`;

  // Pick a top city in this state to deep-link to (if we have one).
  const topCityInState = Object.entries(cityData || {}).find(
    ([, c]) => c && c.state && stateTaxData[stateKey] && c.state === stateTaxData[stateKey].abbr,
  );
  const topCitySlug = topCityInState?.[0] ?? null;
  const topCityName = topCityInState?.[1]?.city ?? null;

  const crossTemplateLinks = [
    {
      href: `/salary/${salaryForTake}-salary-in-${stateKey}`,
      title: `Take-home pay on ${medianFmt} in ${state.name}`,
      desc: `Federal, state, Social Security, and Medicare — what you keep after taxes.`,
    },
    {
      href: `/afford/${salaryForAfford}-in-${stateKey}`,
      title: `What you can afford on ${medianFmt} in ${state.name}`,
      desc: `Home price, rent, and monthly spending guidelines for this income.`,
    },
    {
      href: `/tax-brackets/${stateSlugHyphenated}-${salaryForTax}`,
      title: `Tax brackets on ${medianFmt} in ${state.name}`,
      desc: `Exactly which federal and state brackets your salary crosses.`,
    },
    {
      href: `/mortgage/${stateSlugHyphenated}-${homePriceForMortgage}`,
      title: `$${homePriceForMortgage.toLocaleString()} mortgage in ${state.name}`,
      desc: `Monthly payment, property tax, and total interest at typical rates.`,
    },
    {
      href: `/retirement/age-30-salary-${salaryForRet}`,
      title: `Retirement at 30 earning $${salaryForRet.toLocaleString()}`,
      desc: `Savings benchmarks and projections for your income level.`,
    },
    topCitySlug && topCityName && {
      href: `/city-job-salary/${jobSlug}-salary-in-${topCitySlug}`,
      title: `${job.title} salary in ${topCityName}`,
      desc: `Drill down to city-level salary data for ${topCityName}, ${state.name}.`,
    },
  ].filter(Boolean);

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
            item: 'https://www.pulsafi.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Job Salaries',
            item: 'https://www.pulsafi.com/city-job-salary',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${job.title} Salary in ${state.name}`,
            item: `https://www.pulsafi.com/job-salary/${slug}`,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the median ${job.title.toLowerCase()} salary in ${state.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The median ${job.title.toLowerCase()} salary in ${state.name} is ${formatCurrency(medianSalary)}, compared to a national median of ${formatCurrency(nationalMedianSalary)}.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the entry-level ${job.title.toLowerCase()} salary in ${state.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Entry-level ${job.title.toLowerCase()} positions in ${state.name} typically pay around ${formatCurrency(entryLevelSalary)} annually.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the senior ${job.title.toLowerCase()} salary in ${state.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Senior ${job.title.toLowerCase()} professionals in ${state.name} earn around ${formatCurrency(seniorSalary)} annually.`,
            },
          },
          {
            '@type': 'Question',
            name: `What is the job growth outlook for ${job.title.toLowerCase()}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The projected 10-year job growth outlook for ${job.title.toLowerCase()} positions is ${job.growthRate}%, which indicates strong demand in this field.`,
            },
          },
          {
            '@type': 'Question',
            name: `What education is needed to become a ${job.title.toLowerCase()}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${job.education}`,
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
              <a href="/city-job-salary" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Job Salaries</a>
              {' / '}
              <span>{job.title} Salary in {state.name}</span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '16px 0', color: 'var(--text-primary)' }}>
              {job.title} Salary in {state.name}
            </h1>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              Explore {job.title.toLowerCase()} salaries in {state.name} including median pay, entry-level and senior compensation, and how it compares to the national average.
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
                Median Salary in {state.abbr}
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {formatCurrency(medianSalary)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                <div>Monthly: {formatCurrency(medianSalary / 12)}</div>
                <div>Biweekly: {formatCurrency(medianSalary / 26)}</div>
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
                Entry Level
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {formatCurrency(entryLevelSalary)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                <div>Monthly: {formatCurrency(entryLevelSalary / 12)}</div>
                <div>Biweekly: {formatCurrency(entryLevelSalary / 26)}</div>
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
                Senior Level
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {formatCurrency(seniorSalary)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                <div>Monthly: {formatCurrency(seniorSalary / 12)}</div>
                <div>Biweekly: {formatCurrency(seniorSalary / 26)}</div>
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
                Job Growth
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)' }}>
                {job.growthRate}%
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-faint)', marginTop: 8, fontFamily: "'DM Sans', sans-serif" }}>
                Projected 10-year growth
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
              Salary Breakdown
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pay Period</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Entry Level</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Median</th>
                    <th style={{ textAlign: 'right', padding: '12px 0', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Senior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Annual</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(entryLevelSalary)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(medianSalary)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(seniorSalary)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Monthly</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(entryLevelSalary / 12)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(medianSalary / 12)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(seniorSalary / 12)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Biweekly</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(entryLevelSalary / 26)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(medianSalary / 26)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(seniorSalary / 26)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)' }}>Weekly</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(entryLevelSalary / 52)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(medianSalary / 52)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--text-primary)' }}>{formatCurrency(seniorSalary / 52)}</td>
                  </tr>
                  <tr style={{ backgroundColor: 'var(--accent-bg)' }}>
                    <td style={{ padding: '16px 0', color: 'var(--text-primary)', fontWeight: 600 }}>Hourly</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--accent)', fontWeight: 600 }}>{formatCurrency(entryLevelSalary / 2080)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--accent)', fontWeight: 600 }}>{formatCurrency(medianSalary / 2080)}</td>
                    <td style={{ textAlign: 'right', padding: '16px 0', fontFamily: "'Inter', monospace", color: 'var(--accent)', fontWeight: 600 }}>{formatCurrency(seniorSalary / 2080)}</td>
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
              {state.abbr} vs National Comparison
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  National Median
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--text-primary)', marginBottom: 8 }}>
                  {formatCurrency(nationalMedianSalary)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {state.abbr} Median
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--accent)', marginBottom: 8 }}>
                  {formatCurrency(medianSalary)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Difference
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Inter', monospace", color: medianSalary > nationalMedianSalary ? 'var(--accent)' : 'var(--text-secondary)', marginBottom: 8 }}>
                  {medianSalary > nationalMedianSalary ? '+' : ''}{formatCurrency(medianSalary - nationalMedianSalary)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Multiplier
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "'Inter', monospace", color: 'var(--text-primary)', marginBottom: 8 }}>
                  {multiplier.toFixed(2)}x
                </div>
              </div>
            </div>
            <div style={{ height: 40, backgroundColor: 'var(--bg-main)', borderRadius: 4, marginTop: 16, overflow: 'hidden', display: 'flex' }}>
              <div style={{
                flex: 1,
                backgroundColor: 'rgba(201, 162, 39, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: 'var(--text-muted)',
                fontWeight: 600,
                fontFamily: "'Inter', monospace",
              }}>
                National
              </div>
              <div style={{
                flex: multiplier,
                backgroundColor: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#000',
                fontWeight: 700,
                fontFamily: "'Inter', monospace",
              }}>
                {state.abbr}
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
              About This Career
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, margin: '0 0 16px 0' }}>
              {job.description}
            </p>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                Education
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
                {job.education}
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>
                Key Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 4,
                      padding: '6px 12px',
                      fontSize: 12,
                      color: 'var(--text-secondary)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {skill}
                  </span>
                ))}
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
              Compare States
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: '0 0 16px 0' }}>
              See how {state.name} compares to other states for {job.title.toLowerCase()} salaries:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: 8 }}>
              {['texas', 'california', 'newyork', 'florida', 'colorado'].map(compareStateKey => {
                const compareState = stateTaxData[compareStateKey];
                if (!compareState) return null;
                return (
                  <a
                    key={compareStateKey}
                    href={`/job-salary/${jobSlug}-salary-in-${compareStateKey}`}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: compareStateKey === stateKey ? 'var(--accent)' : 'var(--bg-main)',
                      border: `1px solid ${compareStateKey === stateKey ? 'var(--accent)' : 'var(--border-card)'}`,
                      borderRadius: 6,
                      color: compareStateKey === stateKey ? '#000' : 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 600,
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    {compareState.abbr}
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
              Compare Jobs
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: '0 0 16px 0' }}>
              Compare salaries for other {job.category.toLowerCase()} jobs in {state.name}:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
              {relatedJobs.map(relatedJob => (
                <a
                  key={relatedJob.slug}
                  href={`/job-salary/${relatedJob.slug}-salary-in-${stateKey}`}
                  style={{
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 6,
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    textAlign: 'center',
                    transition: 'all 0.2s',
                  }}
                >
                  {relatedJob.title}
                </a>
              ))}
            </div>
          </div>

          {/* Cross-template internal linking */}
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
              Explore Related Data for a {job.title} in {state.name}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: '0 0 20px 0', lineHeight: 1.6 }}>
              Dig into every angle of a {job.title.toLowerCase()} salary ({medianFmt} median) in {state.name} — take-home pay, affordability, taxes, mortgage, retirement, and city-level data.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {crossTemplateLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    backgroundColor: 'var(--bg-main)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 8,
                    padding: 16,
                    display: 'block',
                  }}
                >
                  <h4 style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: 'var(--accent)', margin: '0 0 4px 0' }}>{link.title}</h4>
                  <p style={{ fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{link.desc}</p>
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

          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 8,
            padding: 24,
            marginBottom: 40,
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: '0 0 20px 0', color: 'var(--text-primary)' }}>
              Frequently Asked Questions
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  What is the median {job.title.toLowerCase()} salary in {state.name}?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
                  The median {job.title.toLowerCase()} salary in {state.name} is {formatCurrency(medianSalary)}, compared to a national median of {formatCurrency(nationalMedianSalary)}.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  What is the entry-level {job.title.toLowerCase()} salary in {state.name}?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
                  Entry-level {job.title.toLowerCase()} positions in {state.name} typically pay around {formatCurrency(entryLevelSalary)} annually.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  What is the senior {job.title.toLowerCase()} salary in {state.name}?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
                  Senior {job.title.toLowerCase()} professionals in {state.name} earn around {formatCurrency(seniorSalary)} annually.
                </p>
              </div>

              <div style={{ borderBottom: '1px solid var(--border-card)', paddingBottom: 16 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  What is the job growth outlook for {job.title.toLowerCase()}?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
                  The projected 10-year job growth outlook for {job.title.toLowerCase()} positions is {job.growthRate}%, which indicates strong demand in this field.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                  What education is needed to become a {job.title.toLowerCase()}?
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', fontFamily: "'DM Sans', sans-serif", margin: 0, lineHeight: 1.5 }}>
                  {job.education}
                </p>
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
              Related Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
              <a
                href="/learn/how-to-build-wealth-in-your-20s"
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
                How to Build Wealth in Your 20s
              </a>
              <a
                href="/learn/roth-ira-vs-401k-2026"
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
                Roth IRA vs 401(k) in 2026
              </a>
              <a
                href="/learn/fire-movement-2026"
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
                FIRE Movement 2026
              </a>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

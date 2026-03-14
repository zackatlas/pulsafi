import { notFound } from 'next/navigation';
import Footer from '../../components/Footer';
import { jobSalaryData, stateMultipliers } from '../../data/jobSalaryData';
import stateTaxData from '../../data/stateTaxData';

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
    openGraph: {
      title: `${job.title} Salary in ${state.name}`,
      description: `Explore ${job.title.toLowerCase()} salaries in ${state.name} including median pay, entry-level and senior compensation.`,
      type: 'website',
      url: `https://pulsafi.com/job-salary/${slug}`,
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

  for (const jobSlug of Object.keys(jobSalaryData)) {
    for (const stateKey of Object.keys(stateMultipliers)) {
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
            name: 'Job Salaries',
            item: 'https://pulsafi.com/job-salaries',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `${job.title} Salary in ${state.name}`,
            item: `https://pulsafi.com/job-salary/${slug}`,
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
              <a href="/job-salaries" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Job Salaries</a>
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

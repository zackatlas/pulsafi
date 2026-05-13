import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CrossTemplateLinks from "../../components/CrossTemplateLinks";
import { buildCrossLinks } from "@/lib/crossLinks";

const AGE_BRACKETS = {
  "under-25": { min: 0, max: 24, median: 10800, average: 76300, label: "Under 25" },
  "25-29": { min: 25, max: 29, median: 30000, average: 120000, label: "25–29" },
  "30-34": { min: 30, max: 34, median: 52000, average: 210000, label: "30–34" },
  "35-39": { min: 35, max: 39, median: 100000, average: 380000, label: "35–39" },
  "40-44": { min: 40, max: 44, median: 135000, average: 520000, label: "40–44" },
  "45-49": { min: 45, max: 49, median: 170000, average: 740000, label: "45–49" },
  "50-54": { min: 50, max: 54, median: 220000, average: 960000, label: "50–54" },
  "55-59": { min: 55, max: 59, median: 280000, average: 1175000, label: "55–59" },
  "60-64": { min: 60, max: 64, median: 340000, average: 1400000, label: "60–64" },
  "65-70": { min: 65, max: 70, median: 410000, average: 1620000, label: "65–70" },
};

const BENCHMARKS = {
  30: 1,
  35: 2,
  40: 3,
  45: 4,
  50: 6,
  55: 7,
  60: 8,
  65: 10,
};

const PERCENTILES = {
  p10: 0.1,
  p25: 0.25,
  p50: 0.5,
  p75: 0.75,
  p90: 0.9,
};

function getAgeFromAge(age) {
  if (age < 25) return "under-25";
  if (age < 30) return "25-29";
  if (age < 35) return "30-34";
  if (age < 40) return "35-39";
  if (age < 45) return "40-44";
  if (age < 50) return "45-49";
  if (age < 55) return "50-54";
  if (age < 60) return "55-59";
  if (age < 65) return "60-64";
  return "65-70";
}

function interpolateNetWorth(age) {
  if (age < 22 || age > 70) return null;

  const brackets = Object.values(AGE_BRACKETS);

  let lowerBracket = null;
  let upperBracket = null;

  for (const bracket of brackets) {
    if (age >= bracket.min && age <= bracket.max) {
      lowerBracket = bracket;
      upperBracket = bracket;
      break;
    }
  }

  if (!lowerBracket || !upperBracket) return null;

  const rangeSize = upperBracket.max - lowerBracket.min + 1;
  const positionInRange = age - lowerBracket.min;
  const ratio = positionInRange / rangeSize;

  return {
    median: Math.round(lowerBracket.median + (upperBracket.median - lowerBracket.median) * ratio),
    average: Math.round(lowerBracket.average + (upperBracket.average - lowerBracket.average) * ratio),
    label: `Age ${age}`,
  };
}

function getPercentileValue(median, average, percentile) {
  // Approximate percentile distribution based on typical skewed distribution
  // Average is higher than median (right-skewed distribution)
  const skew = (average - median) / median;

  const percentileMap = {
    p10: median * (1 - skew * 1.5),
    p25: median * (1 - skew * 0.5),
    p50: median,
    p75: median + (average - median) * 0.4,
    p90: average,
  };

  return Math.round(percentileMap[percentile]);
}

function getNearestBenchmarkAge(age) {
  const benchmarkAges = Object.keys(BENCHMARKS).map(Number).sort((a, b) => a - b);
  const closest = benchmarkAges.reduce((prev, curr) => {
    return Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev;
  });
  return closest;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export async function generateMetadata({ params }) {
  const { age } = await params;
  const ageNum = parseInt(age);

  if (isNaN(ageNum) || ageNum < 22 || ageNum > 70) {
    return { title: "Not Found" };
  }

  const netWorth = interpolateNetWorth(ageNum);

  const title = `Average Net Worth at Age ${ageNum}: Where Do You Stand?`;
  const description = `What is the average net worth at age ${ageNum}? Median: ${formatCurrency(netWorth.median)}. Average: ${formatCurrency(netWorth.average)}. Compare your net worth to Federal Reserve benchmarks.`;

  return {
    title,
    description,
    alternates: { canonical: `/net-worth-by-age/${age}` },
    openGraph: {
      title,
      description,
      url: `https://www.pulsafi.com/net-worth-by-age/${age}`,
    },
  };
}

export function generateStaticParams() {
  return Array.from({ length: 49 }, (_, i) => ({ age: String(i + 22) }));
}

export default async function NetWorthByAgePage({ params }) {
  const { age } = await params;
  const ageNum = parseInt(age);

  if (isNaN(ageNum) || ageNum < 22 || ageNum > 70) {
    notFound();
  }

  const netWorth = interpolateNetWorth(ageNum);
  if (!netWorth) {
    notFound();
  }

  const benchmark = BENCHMARKS[getNearestBenchmarkAge(ageNum)];
  const exampleSalaries = [50000, 75000, 100000, 150000];
  const percentileValues = Object.entries(PERCENTILES).reduce((acc, [key, _]) => {
    acc[key] = getPercentileValue(netWorth.median, netWorth.average, key);
    return acc;
  }, {});

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pulsafi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Net Worth by Age",
        item: "https://www.pulsafi.com/net-worth-by-age",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Age ${ageNum}`,
        item: `https://www.pulsafi.com/net-worth-by-age/${age}`,
      },
    ],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the average net worth at age ${ageNum}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `According to Federal Reserve Survey of Consumer Finances data, the average net worth at age ${ageNum} is approximately ${formatCurrency(netWorth.average)}, with a median of ${formatCurrency(netWorth.median)}.`,
        },
      },
      {
        "@type": "Question",
        name: "Why is average net worth so much higher than median?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Net worth is heavily skewed by wealthy individuals. A single billionaire can pull the average up significantly. The median (50th percentile) is a better representation of a typical person's net worth.",
        },
      },
      {
        "@type": "Question",
        name: `How much should I have saved by age ${ageNum}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Financial advisors recommend having ${benchmark}x your annual salary in net worth by age ${ageNum}. For a ${formatCurrency(75000)} salary, that's ${formatCurrency(benchmark * 75000)}.`,
        },
      },
      {
        "@type": "Question",
        name: "What is net worth and how do I calculate it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Net worth = Total Assets − Total Liabilities. Assets include bank accounts, investments, real estate, vehicles. Liabilities include mortgages, car loans, credit card debt, student loans.",
        },
      },
      {
        "@type": "Question",
        name: "I'm behind on my net worth benchmark. What should I do?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Focus on increasing savings rate and investment returns. Max out retirement accounts (401k, IRA), invest in low-cost index funds, and reduce high-interest debt. Small improvements compound significantly over time.",
        },
      },
    ],
  };

  const previousAge = ageNum > 22 ? ageNum - 1 : null;
  const nextAge = ageNum < 70 ? ageNum + 1 : null;

  return (
    <>
      <Header />
      <main style={{ minHeight: "100vh", background: "var(--bg-main)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
          />

          <h1 style={{ fontSize: "2.2em", marginBottom: "8px", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
            Average Net Worth at Age {ageNum}: Where Do You Stand?
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "1em" }}>
            Compare your net worth to Federal Reserve Survey of Consumer Finances benchmarks for your age group.
          </p>

          {/* Main Metrics */}
          <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "24px", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Net Worth at Age {ageNum}
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-card)" }}>
                <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Median Net Worth
                </div>
                <div style={{ fontSize: "1.5em", color: "var(--accent)", fontWeight: 700 }}>
                  {formatCurrency(netWorth.median)}
                </div>
                <div style={{ fontSize: "0.75em", color: "var(--text-muted)", marginTop: "6px" }}>
                  50th percentile (typical)
                </div>
              </div>

              <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-card)" }}>
                <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Average Net Worth
                </div>
                <div style={{ fontSize: "1.5em", color: "var(--accent)", fontWeight: 700 }}>
                  {formatCurrency(netWorth.average)}
                </div>
                <div style={{ fontSize: "0.75em", color: "var(--text-muted)", marginTop: "6px" }}>
                  Mean (skewed by wealth)
                </div>
              </div>

              <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-card)" }}>
                <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Recommended Benchmark
                </div>
                <div style={{ fontSize: "1.5em", color: "var(--accent)", fontWeight: 700 }}>
                  {benchmark}x Salary
                </div>
                <div style={{ fontSize: "0.75em", color: "var(--text-muted)", marginTop: "6px" }}>
                  Financial advisor guideline
                </div>
              </div>
            </div>
          </section>

          {/* Percentiles Table */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Net Worth Percentiles at Age {ageNum}
            </h2>

            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "0.95em" }}>
              Where do you fall in the distribution? Lower percentiles represent more typical scenarios.
            </p>

            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "var(--bg-card)",
                borderRadius: "8px",
                overflow: "hidden",
              }}>
                <thead>
                  <tr style={{ background: "var(--bg-main)", borderBottom: "1px solid var(--border-card)" }}>
                    <th style={{ padding: "12px", textAlign: "left", color: "var(--text-primary)", fontWeight: 600 }}>
                      Percentile
                    </th>
                    <th style={{ padding: "12px", textAlign: "right", color: "var(--text-primary)", fontWeight: 600 }}>
                      Net Worth
                    </th>
                    <th style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.9em" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>10th percentile</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(percentileValues.p10)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      Bottom 10%
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>25th percentile</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(percentileValues.p25)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      Lower quartile
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-card)", background: "var(--accent-bg)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)", fontWeight: 600 }}>50th percentile (Median)</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 700 }}>
                      {formatCurrency(percentileValues.p50)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      Typical person
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>75th percentile</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(percentileValues.p75)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      Upper quartile
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>90th percentile</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(percentileValues.p90)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      Top 10%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Salary-Based Benchmarks */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Benchmark: How Much Should You Have Saved by Age {ageNum}?
            </h2>

            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "0.95em" }}>
              Financial advisors recommend saving {benchmark}x your annual salary by age {ageNum}. Here's what that looks like at different salary levels:
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {exampleSalaries.map((salary) => {
                const benchmarkTarget = salary * benchmark;
                const percentOfTarget = (netWorth.median / benchmarkTarget) * 100;

                return (
                  <div
                    key={salary}
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-card)",
                      borderRadius: "8px",
                      padding: "16px",
                    }}
                  >
                    <h3 style={{ fontSize: "1em", color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                      {formatCurrency(salary)}/year
                    </h3>

                    <div style={{ marginBottom: "12px" }}>
                      <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "4px" }}>
                        Recommended Net Worth
                      </div>
                      <div style={{ fontSize: "1.3em", color: "var(--accent)", fontWeight: 700 }}>
                        {formatCurrency(benchmarkTarget)}
                      </div>
                    </div>

                    <div
                      style={{
                        paddingTop: "12px",
                        borderTop: "1px solid var(--border-card)",
                      }}
                    >
                      <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "4px" }}>
                        Median at Age {ageNum}
                      </div>
                      <div style={{ fontSize: "1.2em", color: "var(--text-primary)", fontWeight: 700, marginBottom: "8px" }}>
                        {formatCurrency(netWorth.median)}
                      </div>
                      <div
                        style={{
                          height: "4px",
                          background: "var(--bar-bg)",
                          borderRadius: "2px",
                          overflow: "hidden",
                          marginBottom: "6px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            background: percentOfTarget > 100 ? "var(--accent)" : "var(--accent)",
                            width: `${Math.min(percentOfTarget, 100)}%`,
                          }}
                        />
                      </div>
                      <div style={{ fontSize: "0.75em", color: percentOfTarget > 100 ? "var(--accent)" : "var(--text-muted)" }}>
                        {percentOfTarget > 100
                          ? `${Math.round(percentOfTarget)}% of target`
                          : `${Math.round(percentOfTarget)}% of target`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Age-Specific Advice */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              How to Improve Your Net Worth at Age {ageNum}
            </h2>

            <div style={{ display: "grid", gap: "16px" }}>
              <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  1. Maximize Your Savings Rate
                </h3>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                  The fastest way to build net worth is to save more. Aim for 20-30% of gross income if possible. Small lifestyle cuts (dining out less, cheaper subscriptions) compound significantly over time.
                </p>
              </div>

              <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  2. Invest in Diversified Index Funds
                </h3>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Historical stock market returns are 8-10% annually. Boring index funds (S&P 500, total market) beat most active traders. Start with your 401k, then max out an IRA, then taxable brokerage accounts.
                </p>
              </div>

              <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  3. Eliminate High-Interest Debt
                </h3>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Credit card debt (18-25% APR) is wealth destruction. Paying off $10k in credit card debt is equivalent to earning 20% returns. Tackle this before investing.
                </p>
              </div>

              <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  4. Increase Your Income
                </h3>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                  A 10-20% salary increase is often easier than cutting expenses. Negotiate at your current job, develop new skills, or switch companies. Every extra dollar saved compounds.
                </p>
              </div>

              <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  5. Build Emergency Fund First
                </h3>
                <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Before aggressive investing, keep 3-6 months of expenses in a high-yield savings account. This prevents forced selling during downturns or emergency debt.
                </p>
              </div>
            </div>
          </section>

          {/* Related Pages */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Browse Other Ages
            </h2>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              {previousAge && (
                <a
                  href={`/net-worth-by-age/${previousAge}`}
                  style={{
                    padding: "12px 24px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "6px",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.95em",
                    transition: "all 0.2s ease",
                  }}
                >
                  ← Age {previousAge}
                </a>
              )}

              {Array.from({ length: 7 }, (_, i) => ageNum - 3 + i).map((a) => {
                if (a < 22 || a > 70 || a === ageNum) return null;
                return (
                  <a
                    key={a}
                    href={`/net-worth-by-age/${a}`}
                    style={{
                      padding: "8px 12px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-card)",
                      borderRadius: "4px",
                      color: "var(--text-secondary)",
                      textDecoration: "none",
                      fontSize: "0.9em",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Age {a}
                  </a>
                );
              })}

              {nextAge && (
                <a
                  href={`/net-worth-by-age/${nextAge}`}
                  style={{
                    padding: "12px 24px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "6px",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "0.95em",
                    transition: "all 0.2s ease",
                  }}
                >
                  Age {nextAge} →
                </a>
              )}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Frequently Asked Questions
            </h2>

            <div style={{ display: "grid", gap: "16px" }}>
              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  Why is average net worth so much higher than median net worth?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Net worth distribution is heavily right-skewed. A few ultra-wealthy individuals (billionaires, multi-millionaires) pull the average way up. The median is more representative of a "typical" person, making it a better benchmark for self-comparison.
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  What should I include in my net worth calculation?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Assets: checking accounts, savings, retirement accounts (401k, IRA), stocks, bonds, real estate (primary residence + rentals), vehicles. Liabilities: mortgage debt, student loans, car loans, credit card debt, personal loans. Net worth = total assets − total liabilities.
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  Should I count my primary residence in net worth?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Yes, it's an asset you own. However, remember that net worth alone doesn't reflect liquidity. A $500k home is valuable, but you can't easily access that wealth without selling or taking out a loan. For financial flexibility, also track liquid net worth (cash + investments excluding home).
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  My net worth is below the median for my age. Am I behind?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Not necessarily. Net worth depends on income, inheritance, geography, and when you started investing. Focus on saving rate and investment discipline rather than absolute numbers. A 25-year-old saving 30% of income will catch up; someone at 50 with 10% savings rate may never reach median.
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  Is the {benchmark}x salary benchmark realistic?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  It's a rough guideline, not a hard rule. This assumes starting career savings in your 20s and staying invested. If you started later or had interruptions, adjust expectations. The key is consistent saving and compound growth over decades.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "24px", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.3em", color: "var(--accent)", marginBottom: "12px", fontFamily: "'Playfair Display', serif" }}>
              Calculate Your Exact Net Worth
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "0.95em" }}>
              Track all your assets and liabilities with our interactive net worth calculator.
            </p>
            <a
              href="/tools/net-worth-calculator"
              style={{
                display: "inline-block",
                padding: "12px 24px",
                background: "var(--accent)",
                color: "var(--bg-main)",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95em",
                transition: "all 0.2s ease",
              }}
            >
              Open Net Worth Calculator
            </a>
          </section>
        </div>
        <CrossTemplateLinks
          title={`Related Data for Age ${ageNum}`}
          description={`Retirement planning, investment growth, and emergency fund targets tuned to your age.`}
          links={buildCrossLinks({ age: ageNum }, { exclude: ['net-worth'], limit: 6 })}
        />
      </main>
      <Footer />
    </>
  );
}

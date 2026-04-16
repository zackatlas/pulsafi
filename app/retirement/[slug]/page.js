import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Ages 22-70, combined with salary levels
const AGES = Array.from({ length: 49 }, (_, i) => i + 22);
const SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
const RETIREMENT_AGE = 67;
const RETURN_RATE = 0.07;
const INFLATION_RATE = 0.03;
const REAL_RETURN = RETURN_RATE - INFLATION_RATE;

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function futureValue(monthlyContribution, annualRate, years) {
  const monthlyRate = annualRate / 12;
  const months = years * 12;
  if (monthlyRate === 0) return monthlyContribution * months;
  return monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
}

function getRecommendedSavingsMultiple(age) {
  if (age <= 30) return 1;
  if (age <= 35) return 2;
  if (age <= 40) return 3;
  if (age <= 45) return 4;
  if (age <= 50) return 6;
  if (age <= 55) return 7;
  if (age <= 60) return 8;
  return 10;
}

export async function generateStaticParams() {
  const params = [];
  for (const age of AGES) {
    for (const salary of SALARIES) {
      params.push({ slug: `age-${age}-salary-${salary}` });
    }
  }
  // Also generate age-only pages
  for (const age of AGES) {
    params.push({ slug: `age-${age}` });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ageMatch = slug.match(/^age-(\d+)(?:-salary-(\d+))?$/);
  if (!ageMatch) return {};
  const age = parseInt(ageMatch[1]);
  const salary = ageMatch[2] ? parseInt(ageMatch[2]) : null;
  if (!AGES.includes(age)) return {};
  if (salary && !SALARIES.includes(salary)) return {};

  const title = salary
    ? `Retirement Savings at ${age} Earning ${formatCurrency(salary)}/Year | Pulsafi`
    : `How Much Should You Have Saved for Retirement at ${age}? | Pulsafi`;
  const desc = salary
    ? `At age ${age} earning ${formatCurrency(salary)}, see how much you should have saved, your retirement projections, and savings strategies.`
    : `Retirement savings benchmarks and projections for age ${age}. See recommended targets, catch-up strategies, and how to stay on track.`;

  return {
    title,
    description: desc,
    alternates: { canonical: `/retirement/${slug}` },
    openGraph: { title, description: desc, url: `https://pulsafi.com/retirement/${slug}` },
  };
}

export default async function RetirementPage({ params }) {
  const { slug } = await params;
  const ageMatch = slug.match(/^age-(\d+)(?:-salary-(\d+))?$/);
  if (!ageMatch) notFound();
  const age = parseInt(ageMatch[1]);
  const salary = ageMatch[2] ? parseInt(ageMatch[2]) : 75000;
  if (!AGES.includes(age)) notFound();
  if (ageMatch[2] && !SALARIES.includes(parseInt(ageMatch[2]))) notFound();

  const yearsToRetirement = Math.max(0, RETIREMENT_AGE - age);
  const recommendedMultiple = getRecommendedSavingsMultiple(age);
  const recommendedSaved = salary * recommendedMultiple;

  // Savings projections at different contribution rates
  const contributionRates = [10, 15, 20, 25];
  const projections = contributionRates.map(rate => {
    const monthlyContrib = (salary * rate / 100) / 12;
    const projectedAtRetirement = futureValue(monthlyContrib, REAL_RETURN, yearsToRetirement);
    const monthlyRetirementIncome = projectedAtRetirement * 0.04 / 12; // 4% rule
    return { rate, monthlyContrib, projectedAtRetirement, monthlyRetirementIncome };
  });

  // Milestone years
  const milestones = [100000, 250000, 500000, 1000000, 2000000].map(target => {
    const monthlyContrib = (salary * 0.15) / 12;
    if (monthlyContrib <= 0) return { target, yearsNeeded: null };
    const monthlyRate = REAL_RETURN / 12;
    const months = Math.log((target * monthlyRate / monthlyContrib) + 1) / Math.log(1 + monthlyRate);
    return { target, yearsNeeded: Math.ceil(months / 12), ageReached: age + Math.ceil(months / 12) };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much should I have saved for retirement at ${age}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `At age ${age} with a salary of ${formatCurrency(salary)}, financial advisors recommend having about ${recommendedMultiple}Ã your annual salary saved â approximately ${formatCurrency(recommendedSaved)}. This is based on a retirement age of ${RETIREMENT_AGE}.`
        }
      },
      {
        "@type": "Question",
        "name": `How much should I save per month at age ${age}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Earning ${formatCurrency(salary)}/year at age ${age}, saving 15% of your income means contributing ${formatCurrency(salary * 0.15 / 12)}/month. At a 7% average return, this could grow to approximately ${formatCurrency(projections[1].projectedAtRetirement)} by age ${RETIREMENT_AGE}.`
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

        <nav style={{ marginBottom: "20px", fontSize: "14px", color: "#6b7280" }}>
          <a href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</a>
          {" âº "}
          <a href="/tools" style={{ color: "#2563eb", textDecoration: "none" }}>Tools</a>
          {" âº "}
          <a href="/retirement" style={{ color: "#2563eb", textDecoration: "none" }}>Retirement</a>
          {" âº "}
          <span>Age {age}{ageMatch[2] ? ` at ${formatCurrency(salary)}` : ""}</span>
        </nav>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          Retirement Savings at Age {age}{ageMatch[2] ? ` Earning ${formatCurrency(salary)}/Year` : ""}
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          How much you should have saved, your projected retirement nest egg, and monthly income estimates using the 4% withdrawal rule.
        </p>

        {/* Quick Stats */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "4px" }}>Recommended Savings Target</div>
              <div style={{ fontSize: "36px", fontWeight: "800" }}>{formatCurrency(recommendedSaved)}</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>{recommendedMultiple}Ã your {formatCurrency(salary)} salary</div>
            </div>
            <div>
              <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "4px" }}>Years to Retirement (Age {RETIREMENT_AGE})</div>
              <div style={{ fontSize: "36px", fontWeight: "800" }}>{yearsToRetirement}</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>years of compounding left</div>
            </div>
          </div>
        </div>

        {/* Projections Table */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Projected Savings by Contribution Rate
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Saving Rate</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Monthly</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>At Age {RETIREMENT_AGE}</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Monthly Income*</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((p, i) => (
                <tr key={p.rate} style={{ background: p.rate === 15 ? "#eff6ff" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{p.rate}%</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(p.monthlyContrib)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: "600" }}>{formatCurrency(p.projectedAtRetirement)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#059669" }}>{formatCurrency(p.monthlyRetirementIncome)}/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "8px" }}>
            * Monthly income based on 4% withdrawal rule. Assumes {(REAL_RETURN * 100).toFixed(0)}% real return (7% nominal â 3% inflation). Starting from $0 today.
          </p>
        </div>

        {/* Milestones */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Savings Milestones (at 15% savings rate)
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "32px" }}>
          {milestones.filter(m => m.ageReached && m.ageReached <= 80).map((m) => (
            <div key={m.target} style={{ background: m.ageReached <= RETIREMENT_AGE ? "#f0fdf4" : "#fef3c7", borderRadius: "12px", padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>{formatCurrency(m.target)}</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: m.ageReached <= RETIREMENT_AGE ? "#16a34a" : "#d97706" }}>Age {m.ageReached}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>{m.yearsNeeded} years</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Retirement Planning at Age {age}
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            {age <= 30 ? (
              `At age ${age}, time is your greatest asset. With ${yearsToRetirement} years until retirement age ${RETIREMENT_AGE}, even modest contributions benefit enormously from compound growth. Saving 15% of your ${formatCurrency(salary)} salary (${formatCurrency(salary * 0.15 / 12)}/month) could grow to ${formatCurrency(projections[1].projectedAtRetirement)} by retirement.`
            ) : age <= 40 ? (
              `At age ${age}, you're in the prime wealth-building years. Financial advisors recommend having ${recommendedMultiple}Ã your salary (${formatCurrency(recommendedSaved)}) saved by now. With ${yearsToRetirement} years remaining, increasing your savings rate can still dramatically impact your retirement outcome.`
            ) : age <= 50 ? (
              `At ${age}, you should have roughly ${recommendedMultiple}Ã your salary (${formatCurrency(recommendedSaved)}) saved for retirement. If you're behind, consider maximizing catch-up contributions to 401(k)s ($7,500 extra/year for those 50+) and IRAs ($1,000 extra/year). You still have ${yearsToRetirement} years of growth ahead.`
            ) : age <= 60 ? (
              `At age ${age} with ${yearsToRetirement} years to retirement, your savings target is ${recommendedMultiple}Ã your salary â about ${formatCurrency(recommendedSaved)}. Now is the time to maximize every tax-advantaged account, take advantage of catch-up contributions, and begin planning your withdrawal strategy.`
            ) : (
              `At age ${age}, you're approaching or at retirement age. The recommended target is ${recommendedMultiple}Ã your salary (${formatCurrency(recommendedSaved)}). Focus on optimizing Social Security timing, planning tax-efficient withdrawals, and ensuring your portfolio allocation matches your risk tolerance for the distribution phase.`
            )}
          </p>
          <p>
            Use our{" "}
            <a href="/tools/fire-calculator" style={{ color: "#2563eb", textDecoration: "underline" }}>FIRE calculator</a>{" "}
            for early retirement scenarios, or check our{" "}
            <a href={`/net-worth-by-age/${age}`} style={{ color: "#2563eb", textDecoration: "underline" }}>net worth benchmarks at age {age}</a>.
          </p>
        </div>

        {/* Other salary levels */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Retirement at Age {age} â Other Income Levels
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {SALARIES.filter(s => s !== salary).slice(0, 10).map((s) => (
            <a key={s} href={`/retirement/age-${age}-salary-${s}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {formatCurrency(s)}/yr
            </a>
          ))}
        </div>

        {/* Other ages */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Retirement Savings by Age
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {[25, 30, 35, 40, 45, 50, 55, 60, 65].filter(a => a !== age).map((a) => (
            <a key={a} href={`/retirement/age-${a}-salary-${salary}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              Age {a}
            </a>
          ))}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/fire-calculator", label: "FIRE Calculator" },
              { href: "/tools/compound-interest-calculator", label: "Compound Interest" },
              { href: "/tools/investment-comparison", label: "Investment Comparison" },
              { href: "/tools/net-worth-calculator", label: "Net Worth Calculator" },
            ].map((tool) => (
              <a key={tool.href} href={tool.href} style={{ padding: "8px 16px", background: "white", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
                {tool.label}
              </a>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}


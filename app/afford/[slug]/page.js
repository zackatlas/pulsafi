import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import stateTaxData from "../../data/stateTaxData";

const SALARIES = [40000, 50000, 60000, 70000, 75000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];

const FEDERAL_RATES = {
  10000: 0.10,
  41000: 0.12,
  89075: 0.22,
  170050: 0.24,
  215950: 0.32,
  539900: 0.35,
  Infinity: 0.37
};

function calculateFederalTax(income) {
  let tax = 0;
  let previousLimit = 0;

  for (const [limit, rate] of Object.entries(FEDERAL_RATES).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    const numLimit = Number(limit);
    if (income <= previousLimit) break;

    const taxableInThisBracket = Math.min(income, numLimit) - previousLimit;
    tax += taxableInThisBracket * rate;
    previousLimit = numLimit;
  }

  return tax;
}

function calculateTakeHome(salary, stateRate) {
  const federalTax = calculateFederalTax(salary);
  const standardDeduction = 14600;
  const taxableIncome = Math.max(0, salary - standardDeduction);
  const adjustedFederalTax = calculateFederalTax(taxableIncome);

  const stateTax = salary * (stateRate / 100);
  const ficaTax = salary * 0.0765;

  const totalTax = adjustedFederalTax + stateTax + ficaTax;
  return salary - totalTax;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }

  return (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
}

function calculateAffordability(salary, stateRate) {
  const monthlyGross = salary / 12;
  const annualTakeHome = calculateTakeHome(salary, stateRate);
  const monthlyTakeHome = annualTakeHome / 12;

  const mortgageRate = 6.8;
  const loanTerm = 30;

  const scenarios = {
    conservative: 0.25,
    recommended: 0.28,
    aggressive: 0.33,
  };

  const results = {};

  for (const [scenario, dtiRatio] of Object.entries(scenarios)) {
    const maxMonthlyPayment = monthlyTakeHome * dtiRatio;

    // Estimate home price: work backwards from payment
    // Using approximation: for 30-year mortgage at 6.8%, P&I Ã¢ÂÂ principal * 0.0066
    // So principal Ã¢ÂÂ (maxMonthlyPayment - taxes - insurance - pmi) / 0.0066

    let homePrice = maxMonthlyPayment * 150; // Initial guess

    // Iterate to find the right home price
    for (let i = 0; i < 10; i++) {
      const propertyTaxMonthly = (homePrice * 0.011) / 12;
      const insuranceMonthly = 1200 / 12;
      const principalAndInterest = maxMonthlyPayment - propertyTaxMonthly - insuranceMonthly;

      const loanAmount = calculateLoanFromPayment(principalAndInterest, mortgageRate, loanTerm);
      homePrice = loanAmount * 1.25; // Rough conversion back
    }

    // Final calculation with actual home price
    const downPayment20 = homePrice * 0.20;
    const loanAmount = homePrice - downPayment20;
    const principalAndInterest = calculateMonthlyPayment(loanAmount, mortgageRate, loanTerm);
    const propertyTax = (homePrice * 0.011) / 12;
    const insurance = 1200 / 12;
    const totalPayment = principalAndInterest + propertyTax + insurance;

    results[scenario] = {
      homePrice: Math.round(homePrice),
      downPayment20: Math.round(downPayment20),
      loanAmount: Math.round(loanAmount),
      principalAndInterest: Math.round(principalAndInterest),
      propertyTax: Math.round(propertyTax),
      insurance: Math.round(insurance),
      totalPayment: Math.round(totalPayment),
      dtiRatio: dtiRatio,
      actualDti: totalPayment / monthlyTakeHome,
    };
  }

  return {
    salary,
    monthlyGross,
    monthlyTakeHome,
    results,
  };
}

function calculateLoanFromPayment(monthlyPayment, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (monthlyRate === 0) {
    return monthlyPayment * numberOfPayments;
  }

  return (monthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments));
}

function calculateDownPaymentScenarios(salary, stateRate, homePrice) {
  const scenarios = [
    { down: 0.03, label: "3%" },
    { down: 0.05, label: "5%" },
    { down: 0.10, label: "10%" },
    { down: 0.20, label: "20%" },
  ];

  const mortgageRate = 6.8;
  const loanTerm = 30;

  return scenarios.map(({ down, label }) => {
    const downPaymentAmount = homePrice * down;
    const loanAmount = homePrice - downPaymentAmount;

    let pmi = 0;
    if (down < 0.20) {
      pmi = (loanAmount * 0.0055) / 12;
    }

    const principalAndInterest = calculateMonthlyPayment(loanAmount, mortgageRate, loanTerm);
    const propertyTax = (homePrice * 0.011) / 12;
    const insurance = 1200 / 12;
    const totalPayment = principalAndInterest + propertyTax + insurance + pmi;

    return {
      label,
      downPaymentAmount: Math.round(downPaymentAmount),
      loanAmount: Math.round(loanAmount),
      principalAndInterest: Math.round(principalAndInterest),
      propertyTax: Math.round(propertyTax),
      insurance: Math.round(insurance),
      pmi: Math.round(pmi),
      totalPayment: Math.round(totalPayment),
    };
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [salaryStr, , state] = slug.split("-");
  const salary = parseInt(salaryStr);

  if (!state || !stateTaxData[state] || !SALARIES.includes(salary)) {
    return { title: "Not Found" };
  }

  const stateName = stateTaxData[state].name;
  const title = `How Much House Can You Afford on $${salary.toLocaleString()} in ${stateName}?`;
  const description = `Calculate your affordable home price, monthly payment breakdown, and down payment scenarios for a $${salary.toLocaleString()} salary in ${stateName}. Based on realistic DTI ratios and take-home pay.`;

  return {
    title,
    description,
    keywords: [
      `afford house ${stateName}`,
      `how much house can I afford`,
      `${salary.toLocaleString()} salary home`,
      `home affordability ${stateName}`,
      `mortgage affordability calculator`,
    ],
    alternates: {
      canonical: `https://pulsafi.com/afford/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://pulsafi.com/afford/${slug}`,
      type: 'website',
      images: [{ url: `/api/og?title=Afford+on+%24${salary.toLocaleString()}+in+${encodeURIComponent(stateName)}&subtitle=Home+Affordability&type=tool`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`/api/og?title=Afford+on+%24${salary.toLocaleString()}+in+${encodeURIComponent(stateName)}&subtitle=Home+Affordability&type=tool`],
    },
  };
}

export function generateStaticParams() {
  // Pre-render only the most popular salary levels to avoid build timeouts
  // Reduces from 969 (51 states x 19 salaries) to 255 (51 x 5)
  // Rest generated on-demand via ISR
  const topSalaries = [60000, 80000, 100000, 150000, 200000];
  const states = Object.keys(stateTaxData);
  const params = [];

  for (const state of states) {
    for (const salary of topSalaries) {
      params.push({ slug: `${salary}-in-${state}` });
    }
  }

  return params;
}

export default async function AffordPage({ params }) {
  const { slug } = await params;
  const [salaryStr, , stateKey] = slug.split("-");
  const salary = parseInt(salaryStr);

  if (!stateKey || !stateTaxData[stateKey] || !SALARIES.includes(salary)) {
    notFound();
  }

  const stateData = stateTaxData[stateKey];
  const affordability = calculateAffordability(salary, stateData.rate);
  const recommendedHomePrice = affordability.results.recommended.homePrice;
  const downPaymentScenarios = calculateDownPaymentScenarios(salary, stateData.rate, recommendedHomePrice);

  const relatedSalaries = SALARIES.filter((s) => s !== salary).slice(0, 5);
  const relatedStates = Object.keys(stateTaxData)
    .filter((s) => s !== stateKey)
    .slice(0, 5);

  // ── Cross-template internal links ──
  // Snap to tiers the sitemap actually emits. stateKey is the concatenated
  // stateTaxData format ("newyork"); /mortgage and /tax-brackets want the
  // hyphenated form ("new-york") — derive that from the display name.
  const TAX_TIERS = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000];
  const SALARY_TIERS = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const RETIREMENT_SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const EMERGENCY_SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 100000, 120000, 150000];
  const DTI_INCOMES = [30000, 40000, 50000, 60000, 75000, 100000, 125000, 150000, 200000];
  const MORTGAGE_PRICES = [100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000, 1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000];

  const nearest = (value, tiers) =>
    tiers.reduce((best, t) => (Math.abs(t - value) < Math.abs(best - value) ? t : best), tiers[0]);

  const stateSlugHyphenated = stateData.name.toLowerCase().replace(/\s+/g, "-");
  const salaryFormatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(salary);
  const approxHomePrice = nearest(Math.round(salary * 4), MORTGAGE_PRICES);
  const salaryForTake = nearest(salary, SALARY_TIERS);
  const salaryForTax = nearest(salary, TAX_TIERS);
  const salaryForRet = nearest(salary, RETIREMENT_SALARIES);
  const salaryForEf = nearest(salary, EMERGENCY_SALARIES);
  const incomeForDti = nearest(salary, DTI_INCOMES);

  const crossTemplateLinks = [
    {
      href: `/salary/${salaryForTake}-salary-in-${stateKey}`,
      title: `Take-home pay on ${salaryFormatted} in ${stateData.name}`,
      desc: `Federal tax, state tax, Social Security, and Medicare breakdown.`,
    },
    {
      href: `/tax-brackets/${stateSlugHyphenated}-${salaryForTax}`,
      title: `Tax brackets on ${salaryFormatted} in ${stateData.name}`,
      desc: `Exactly which brackets your income crosses and the effective rate.`,
    },
    {
      href: `/mortgage/${stateSlugHyphenated}-${approxHomePrice}`,
      title: `$${approxHomePrice.toLocaleString()} mortgage in ${stateData.name}`,
      desc: `Monthly payment, property tax, and total interest at typical rates.`,
    },
    {
      href: `/retirement/age-30-salary-${salaryForRet}`,
      title: `Retirement at 30 earning $${salaryForRet.toLocaleString()}`,
      desc: `Savings benchmarks and projections for someone at your income.`,
    },
    {
      href: `/emergency-fund/${salaryForEf}-salary-single`,
      title: `Emergency fund target for $${salaryForEf.toLocaleString()}`,
      desc: `3, 6, 9, and 12-month targets for someone single at this income.`,
    },
    {
      href: `/debt-to-income/${incomeForDti}-income-2000-debt`,
      title: `DTI ratio on $${incomeForDti.toLocaleString()} with $2K/mo debt`,
      desc: `See how monthly debt obligations affect your borrowing power.`,
    },
  ];

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pulsafi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Affordability Calculator",
        item: "https://pulsafi.com/afford",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${salary.toLocaleString()} in ${stateData.name}`,
        item: `https://pulsafi.com/afford/${slug}`,
      },
    ],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much house can I afford on a $${salary.toLocaleString()} salary in ${stateData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Based on the 28% DTI rule and realistic take-home pay calculations, a $${salary.toLocaleString()} salary in ${stateData.name} typically supports a home price around $${affordability.results.recommended.homePrice.toLocaleString()}.`,
        },
      },
      {
        "@type": "Question",
        name: "What does DTI (Debt-to-Income) ratio mean?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DTI is the percentage of your gross monthly income that goes toward debt payments. Lenders typically cap housing at 28% DTI, but using take-home income (net DTI) is more realistic for actual affordability.",
        },
      },
      {
        "@type": "Question",
        name: "Should I put down 20% or less?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "20% down eliminates PMI (mortgage insurance) and reduces total borrowing. However, putting down 3-5% can be smart if you can earn higher returns investing the difference. Consider your risk tolerance and opportunity cost.",
        },
      },
      {
        "@type": "Question",
        name: "What costs are included in my monthly housing payment?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Housing payment includes: principal & interest (mortgage), property taxes (~1.1% of home value annually), homeowner's insurance (~$100-150/month), PMI if down payment < 20%, and HOA fees if applicable.",
        },
      },
      {
        "@type": "Question",
        name: `Why is ${stateData.name} different from other states?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${stateData.name} has a ${stateData.rate}% state income tax rate (top rate). Combined with federal taxes and FICA, this affects your take-home pay and thus how much you can afford.`,
        },
      },
    ],
  };

  return (
    <>
      <style>{`
        .afford-card:hover { background: var(--accent-bg) !important; }
        .afford-cta:hover { background: var(--accent-dark) !important; transform: translateY(-2px); }
      `}</style>
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
            How Much House Can You Afford on ${salary.toLocaleString()} in {stateData.name}?
          </h1>
          <p style={{ color: "var(--text-secondary)", marginBottom: "32px", fontSize: "1em" }}>
            Based on realistic take-home calculations and DTI ratios Ã¢ÂÂ not just what banks say you can borrow.
          </p>

          {/* Summary Section */}
          <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "24px", marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Your Affordability Summary
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "20px" }}>
              <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-card)" }}>
                <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "6px" }}>Monthly Gross Income</div>
                <div style={{ fontSize: "1.4em", color: "var(--accent)", fontWeight: 600 }}>
                  {formatCurrency(affordability.monthlyGross)}
                </div>
              </div>

              <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-card)" }}>
                <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "6px" }}>Monthly Take-Home (Actual)</div>
                <div style={{ fontSize: "1.4em", color: "var(--accent)", fontWeight: 600 }}>
                  {formatCurrency(affordability.monthlyTakeHome)}
                </div>
              </div>

              <div style={{ background: "var(--bg-main)", padding: "16px", borderRadius: "6px", border: "1px solid var(--border-card)" }}>
                <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "6px" }}>State Income Tax Rate</div>
                <div style={{ fontSize: "1.4em", color: "var(--accent)", fontWeight: 600 }}>
                  {stateData.rate}%
                </div>
              </div>
            </div>
          </section>

          {/* Affordability by DTI Scenario */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Affordable Home Price by DTI Scenario
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
              <div style={{ background: "var(--bg-card)", border: "2px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  Conservative (25% DTI)
                </h3>
                <p style={{ fontSize: "0.9em", color: "var(--text-secondary)", marginBottom: "12px" }}>
                  Recommended for most people
                </p>
                <div style={{ fontSize: "1.8em", color: "var(--accent)", fontWeight: 700, marginBottom: "8px" }}>
                  {formatCurrency(affordability.results.conservative.homePrice)}
                </div>
                <div style={{ fontSize: "0.85em", color: "var(--text-muted)" }}>
                  Monthly Payment: {formatCurrency(affordability.results.conservative.totalPayment)}
                </div>
              </div>

              <div style={{ background: "var(--bg-card)", border: "2px solid var(--accent-border)", borderRadius: "8px", padding: "20px", boxShadow: "0 0 20px var(--accent-glow)" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  Recommended (28% DTI)
                </h3>
                <p style={{ fontSize: "0.9em", color: "var(--text-secondary)", marginBottom: "12px" }}>
                  Bank standard
                </p>
                <div style={{ fontSize: "1.8em", color: "var(--accent)", fontWeight: 700, marginBottom: "8px" }}>
                  {formatCurrency(affordability.results.recommended.homePrice)}
                </div>
                <div style={{ fontSize: "0.85em", color: "var(--text-muted)" }}>
                  Monthly Payment: {formatCurrency(affordability.results.recommended.totalPayment)}
                </div>
              </div>

              <div style={{ background: "var(--bg-card)", border: "2px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
                <h3 style={{ fontSize: "1.1em", color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                  Aggressive (33% DTI)
                </h3>
                <p style={{ fontSize: "0.9em", color: "var(--text-secondary)", marginBottom: "12px" }}>
                  Maximum stretch
                </p>
                <div style={{ fontSize: "1.8em", color: "var(--accent)", fontWeight: 700, marginBottom: "8px" }}>
                  {formatCurrency(affordability.results.aggressive.homePrice)}
                </div>
                <div style={{ fontSize: "0.85em", color: "var(--text-muted)" }}>
                  Monthly Payment: {formatCurrency(affordability.results.aggressive.totalPayment)}
                </div>
              </div>
            </div>
          </section>

          {/* Monthly Payment Breakdown */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Monthly Payment Breakdown (Recommended Scenario)
            </h2>

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
                      Component
                    </th>
                    <th style={{ padding: "12px", textAlign: "right", color: "var(--text-primary)", fontWeight: 600 }}>
                      Monthly Amount
                    </th>
                    <th style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.9em" }}>
                      % of Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>Principal & Interest</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(affordability.results.recommended.principalAndInterest)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      {Math.round((affordability.results.recommended.principalAndInterest / affordability.results.recommended.totalPayment) * 100)}%
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>Property Tax</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(affordability.results.recommended.propertyTax)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      {Math.round((affordability.results.recommended.propertyTax / affordability.results.recommended.totalPayment) * 100)}%
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid var(--border-card)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)" }}>Homeowner's Insurance</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      {formatCurrency(affordability.results.recommended.insurance)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--text-secondary)", fontSize: "0.9em" }}>
                      {Math.round((affordability.results.recommended.insurance / affordability.results.recommended.totalPayment) * 100)}%
                    </td>
                  </tr>
                  <tr style={{ background: "var(--bg-main)" }}>
                    <td style={{ padding: "12px", color: "var(--text-primary)", fontWeight: 600 }}>Total Monthly Payment</td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 700, fontSize: "1.1em" }}>
                      {formatCurrency(affordability.results.recommended.totalPayment)}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "var(--accent)", fontWeight: 600 }}>
                      100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Down Payment Scenarios */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Down Payment Scenarios
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.95em" }}>
              How different down payments affect your cash needed upfront and monthly payment for a {formatCurrency(recommendedHomePrice)} home.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              {downPaymentScenarios.map((scenario) => (
                <div
                  key={scenario.label}
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <h3 style={{ fontSize: "1em", color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                    {scenario.label} Down
                  </h3>
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "4px" }}>
                      Cash Needed
                    </div>
                    <div style={{ fontSize: "1.3em", color: "var(--accent)", fontWeight: 700 }}>
                      {formatCurrency(scenario.downPaymentAmount)}
                    </div>
                  </div>
                  <div style={{ marginBottom: "12px", paddingTop: "12px", borderTop: "1px solid var(--border-card)" }}>
                    <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "4px" }}>
                      Loan Amount
                    </div>
                    <div style={{ fontSize: "0.95em", color: "var(--text-primary)" }}>
                      {formatCurrency(scenario.loanAmount)}
                    </div>
                  </div>
                  <div style={{ paddingTop: "12px", borderTop: "1px solid var(--border-card)" }}>
                    <div style={{ fontSize: "0.85em", color: "var(--text-secondary)", marginBottom: "4px" }}>
                      Monthly Payment
                    </div>
                    <div style={{ fontSize: "1.2em", color: "var(--accent)", fontWeight: 700 }}>
                      {formatCurrency(scenario.totalPayment)}
                    </div>
                    {scenario.pmi > 0 && (
                      <div style={{ fontSize: "0.75em", color: "var(--text-muted)", marginTop: "6px" }}>
                        (includes {formatCurrency(scenario.pmi)} PMI)
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Insights */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Key Insights for {stateData.name}
            </h2>

            <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
              <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                Tax Impact
              </h3>
              <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                {stateData.name} has a {stateData.rate}% state income tax rate ({stateData.type} structure). This means roughly {Math.round(stateData.rate)} cents of every dollar goes to state taxes, which reduces your take-home pay compared to zero-tax states like Texas or Florida.
              </p>
            </div>

            <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px", marginBottom: "16px" }}>
              <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                DTI vs. Take-Home Reality
              </h3>
              <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                The "28% of gross income" rule banks use translates to roughly {Math.round((affordability.results.recommended.totalPayment / affordability.monthlyGross) * 100)}% of your gross income here. But in terms of actual take-home pay, it's {Math.round((affordability.results.recommended.totalPayment / affordability.monthlyTakeHome) * 100)}% Ã¢ÂÂ a much more realistic measure of affordability.
              </p>
            </div>

            <div style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "20px" }}>
              <h3 style={{ color: "var(--accent)", marginBottom: "12px", fontWeight: 600 }}>
                Hidden Housing Costs
              </h3>
              <p style={{ color: "var(--text-primary)", fontSize: "0.95em", lineHeight: 1.6 }}>
                Your monthly payment is just the start. Budget an additional 1-2% of the home's value annually for maintenance, 1.1% for property taxes, and HOA fees if applicable. These often add 30-50% to your mortgage payment alone.
              </p>
            </div>
          </section>

          {/* Related Pages */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "20px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Related Affordability Pages
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "20px" }}>
              {relatedSalaries.map((relSalary) => (
                <a
                  key={relSalary}
                  className="afford-card" href={`/afford/${relSalary}-in-${stateKey}`}
                  style={{
                    padding: "12px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "6px",
                    color: "var(--accent)",
                    textDecoration: "none",
                    fontSize: "0.95em",
                    transition: "all 0.2s ease",
                  }}
                >
                  ${relSalary.toLocaleString()} in {stateData.name}
                </a>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
              {relatedStates.map((relState) => {
                const relStateData = stateTaxData[relState];
                return (
                  <a
                    key={relState}
                    className="afford-card" href={`/afford/${salary}-in-${relState}`}
                    style={{
                      padding: "12px",
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-card)",
                      borderRadius: "6px",
                      color: "var(--accent)",
                      textDecoration: "none",
                      fontSize: "0.95em",
                      transition: "all 0.2s ease",
                    }}
                  >
                    ${salary.toLocaleString()} in {relStateData.name}
                  </a>
                );
              })}
            </div>
          </section>

          {/* Cross-template internal linking */}
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "1.4em", marginBottom: "8px", color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
              Explore Related Data for {salaryFormatted} in {stateData.name}
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px", fontSize: "0.95em", lineHeight: 1.6 }}>
              Dig into every angle of a {salaryFormatted} salary in {stateData.name} — take-home pay, taxes, mortgage, retirement, emergency fund, and debt-to-income ratio.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
              {crossTemplateLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    backgroundColor: "var(--bg-main)",
                    border: "1px solid var(--border-card)",
                    borderRadius: "8px",
                    padding: "16px",
                    display: "block",
                  }}
                >
                  <h4 style={{ fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "var(--accent)", margin: "0 0 4px 0" }}>{link.title}</h4>
                  <p style={{ fontSize: "13px", fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", margin: 0, lineHeight: 1.5 }}>{link.desc}</p>
                </a>
              ))}
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
                  Why is the recommended DTI different from the bank's 28% rule?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  Banks use 28% of your gross income, but that's before taxes. After federal, state, and FICA taxes, your actual take-home is much less. The 28% DTI can easily become 40%+ of your take-home pay, leaving little room for savings, retirement, or emergencies.
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  Should I aim for the conservative or recommended scenario?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  The conservative 25% DTI is ideal if you have student loans, other debt, or want to aggressively save for retirement. The recommended 28% works if housing is your only major expense. The aggressive 33% should only be considered if you have very stable income and minimal other debt.
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  What about property taxes and HOA fees?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  This calculator includes a standard property tax estimate of 1.1% of home value annually. However, some areas are much higher or lower. HOA fees vary widely and should be researched for your specific neighborhood. Both significantly impact your total housing cost.
                </p>
              </details>

              <details style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", cursor: "pointer" }}>
                <summary style={{ color: "var(--accent)", fontWeight: 600, cursor: "pointer" }}>
                  Is PMI worth it to put down less than 20%?
                </summary>
                <p style={{ color: "var(--text-secondary)", marginTop: "12px", fontSize: "0.95em", lineHeight: 1.6 }}>
                  PMI (mortgage insurance) costs 0.55% of your loan annually and drops off at 20% equity. If you could earn 8-10% investing the difference, a 5% down payment might be smarter than waiting for 20%. But consider your comfort level with leverage and interest rate environment.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: "var(--accent-bg)", border: "1px solid var(--accent-border)", borderRadius: "8px", padding: "24px", textAlign: "center" }}>
            <h2 style={{ fontSize: "1.3em", color: "var(--accent)", marginBottom: "12px", fontFamily: "'Playfair Display', serif" }}>
              Want to explore more scenarios?
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "16px", fontSize: "0.95em" }}>
              Use the interactive mortgage calculator to model different interest rates, loan terms, and down payments.
            </p>
            <a
              className="afford-cta" href="/tools/mortgage-calculator"
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
              Open Mortgage Calculator
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HOME_PRICES = [
  100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000,
  1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000
];

const MORTGAGE_RATE = 6.875;

const STATE_PROPERTY_TAX_RATES = {
  "alabama": 0.40, "alaska": 1.04, "arizona": 0.62, "arkansas": 0.62, "california": 0.71,
  "colorado": 0.49, "connecticut": 2.15, "delaware": 0.53, "florida": 0.89, "georgia": 0.83,
  "hawaii": 0.32, "idaho": 0.63, "illinois": 2.07, "indiana": 0.81, "iowa": 1.57,
  "kansas": 1.41, "kentucky": 0.83, "louisiana": 0.56, "maine": 1.24, "maryland": 1.05,
  "massachusetts": 1.15, "michigan": 1.38, "minnesota": 1.11, "mississippi": 0.65, "missouri": 0.91,
  "montana": 0.74, "nebraska": 1.73, "nevada": 0.53, "new-hampshire": 1.86, "new-jersey": 2.47,
  "new-mexico": 0.67, "new-york": 1.62, "north-carolina": 0.77, "north-dakota": 0.98, "ohio": 1.53,
  "oklahoma": 0.90, "oregon": 0.87, "pennsylvania": 1.49, "rhode-island": 1.40, "south-carolina": 0.56,
  "south-dakota": 1.22, "tennessee": 0.56, "texas": 1.60, "utah": 0.58, "vermont": 1.90,
  "virginia": 0.80, "washington": 0.84, "west-virginia": 0.57, "wisconsin": 1.61, "wyoming": 0.55,
  "district-of-columbia": 0.57
};

const STATE_INSURANCE_RATES = {
  "alabama": 2400, "alaska": 1300, "arizona": 1700, "arkansas": 2600, "california": 1600,
  "colorado": 2200, "connecticut": 1800, "delaware": 1200, "florida": 4200, "georgia": 2000,
  "hawaii": 1200, "idaho": 1200, "illinois": 1800, "indiana": 1600, "iowa": 1700,
  "kansas": 2800, "kentucky": 2000, "louisiana": 3600, "maine": 1300, "maryland": 1500,
  "massachusetts": 1700, "michigan": 1800, "minnesota": 1700, "mississippi": 2600, "missouri": 2200,
  "montana": 1800, "nebraska": 2600, "nevada": 1300, "new-hampshire": 1300, "new-jersey": 1500,
  "new-mexico": 1600, "new-york": 1800, "north-carolina": 1800, "north-dakota": 1900, "ohio": 1400,
  "oklahoma": 3200, "oregon": 1200, "pennsylvania": 1400, "rhode-island": 1900, "south-carolina": 2200,
  "south-dakota": 2000, "tennessee": 2100, "texas": 3400, "utah": 1200, "vermont": 1100,
  "virginia": 1500, "washington": 1300, "west-virginia": 1500, "wisconsin": 1200, "wyoming": 1400,
  "district-of-columbia": 1400
};

const STATE_NAMES = {
  "alabama": "Alabama", "alaska": "Alaska", "arizona": "Arizona", "arkansas": "Arkansas", "california": "California",
  "colorado": "Colorado", "connecticut": "Connecticut", "delaware": "Delaware", "florida": "Florida", "georgia": "Georgia",
  "hawaii": "Hawaii", "idaho": "Idaho", "illinois": "Illinois", "indiana": "Indiana", "iowa": "Iowa",
  "kansas": "Kansas", "kentucky": "Kentucky", "louisiana": "Louisiana", "maine": "Maine", "maryland": "Maryland",
  "massachusetts": "Massachusetts", "michigan": "Michigan", "minnesota": "Minnesota", "mississippi": "Mississippi", "missouri": "Missouri",
  "montana": "Montana", "nebraska": "Nebraska", "nevada": "Nevada", "new-hampshire": "New Hampshire", "new-jersey": "New Jersey",
  "new-mexico": "New Mexico", "new-york": "New York", "north-carolina": "North Carolina", "north-dakota": "North Dakota", "ohio": "Ohio",
  "oklahoma": "Oklahoma", "oregon": "Oregon", "pennsylvania": "Pennsylvania", "rhode-island": "Rhode Island", "south-carolina": "South Carolina",
  "south-dakota": "South Dakota", "tennessee": "Tennessee", "texas": "Texas", "utah": "Utah", "vermont": "Vermont",
  "virginia": "Virginia", "washington": "Washington", "west-virginia": "West Virginia", "wisconsin": "Wisconsin", "wyoming": "Wyoming",
  "district-of-columbia": "District of Columbia"
};

const STATES = Object.keys(STATE_NAMES);
const DOWN_PAYMENTS = [3, 5, 10, 20];

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatPrice(price) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
  return `$${(price / 1000).toFixed(0)}K`;
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const n = years * 12;
  if (monthlyRate === 0) return principal / n;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

export async function generateStaticParams() {
  const params = [];
  // Pre-render only 12 most popular home prices for all states to avoid timeouts
  // This reduces from 1,275 (51 states × 25 prices) to ~612 (51 states × 12 prices)
  // Rest will be generated on-demand via ISR
  const topPrices = [300000, 400000, 500000, 750000, 1000000];

  for (const state of STATES) {
    for (const price of topPrices) {
      params.push({ slug: `${state}-${price}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lastDash = slug.lastIndexOf("-");
  const stateSlug = slug.substring(0, lastDash);
  const price = parseInt(slug.substring(lastDash + 1));
  const stateName = STATE_NAMES[stateSlug];
  if (!stateName || !HOME_PRICES.includes(price)) return {};

  return {
    title: `Can I Afford a ${formatPrice(price)} Home in ${stateName}? Mortgage Breakdown | Pulsafi`,
    description: `See if you can afford a ${formatPrice(price)} house in ${stateName}. Monthly mortgage payment, property taxes, insurance costs, and salary needed \u2014 all calculated for ${stateName}.`,
    keywords: [
      `${formatPrice(price)} home ${stateName}`,
      `mortgage ${stateName}`,
      `can I afford ${formatPrice(price)} house`,
      `property tax ${stateName}`,
      `home affordability`,
    ],
    alternates: {
      canonical: `https://www.pulsafi.com/mortgage/${slug}`,
    },
    openGraph: {
      title: `${formatPrice(price)} Home in ${stateName} \u2014 Mortgage & Affordability`,
      description: `Complete mortgage breakdown for a ${formatPrice(price)} home in ${stateName} with property taxes, insurance, and income requirements.`,
      url: `https://www.pulsafi.com/mortgage/${slug}`,
      type: 'website',
      images: [{ url: `/api/og?title=${encodeURIComponent(formatPrice(price))}+Home+in+${encodeURIComponent(stateName)}&subtitle=Mortgage+Breakdown&type=tool`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formatPrice(price)} Home in ${stateName} \u2014 Mortgage Breakdown`,
      description: `Monthly payment, property taxes, insurance, and salary needed for a ${formatPrice(price)} home in ${stateName}.`,
      images: [`/api/og?title=${encodeURIComponent(formatPrice(price))}+Home+in+${encodeURIComponent(stateName)}&subtitle=Mortgage+Breakdown&type=tool`],
    },
  };
}

export default async function MortgagePage({ params }) {
  const { slug } = await params;
  const lastDash = slug.lastIndexOf("-");
  const stateSlug = slug.substring(0, lastDash);
  const price = parseInt(slug.substring(lastDash + 1));
  const stateName = STATE_NAMES[stateSlug];

  if (!stateName || !HOME_PRICES.includes(price)) {
    notFound();
  }

  const propertyTaxRate = STATE_PROPERTY_TAX_RATES[stateSlug];
  const annualInsurance = STATE_INSURANCE_RATES[stateSlug];
  const monthlyPropertyTax = (price * propertyTaxRate / 100) / 12;
  const monthlyInsurance = annualInsurance / 12;

  // Calculate for each down payment percentage
  const scenarios = DOWN_PAYMENTS.map((dpPercent) => {
    const downPayment = price * dpPercent / 100;
    const loanAmount = price - downPayment;
    const monthlyPI = calculateMonthlyPayment(loanAmount, MORTGAGE_RATE, 30);
    const pmi = dpPercent < 20 ? (loanAmount * 0.005) / 12 : 0;
    const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyInsurance + pmi;
    const totalInterest = (monthlyPI * 360) - loanAmount;
    const salaryNeeded = totalMonthly * 12 / 0.28;
    return { dpPercent, downPayment, loanAmount, monthlyPI, pmi, totalMonthly, totalInterest, salaryNeeded };
  });

  const primary = scenarios.find(s => s.dpPercent === 20) || scenarios[scenarios.length - 1];

  // Prices for navigation
  const priceIdx = HOME_PRICES.indexOf(price);
  const prevPrice = priceIdx > 0 ? HOME_PRICES[priceIdx - 1] : null;
  const nextPrice = priceIdx < HOME_PRICES.length - 1 ? HOME_PRICES[priceIdx + 1] : null;

  // Nearby states for internal linking
  const stateIdx = STATES.indexOf(stateSlug);
  const nearbyStates = STATES.filter((_, i) => Math.abs(i - stateIdx) <= 3 && i !== stateIdx).slice(0, 5);

  // ── Cross-template internal links ──
  // This page's stateSlug is hyphenated ("new-york"). /salary and /afford use
  // concatenated stateTaxData keys ("newyork", with DC as the one exception).
  const stateSlugConcat = stateSlug === "district-of-columbia" ? "dc" : stateSlug.replace(/-/g, "");
  const AFFORD_TIERS = [40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 90000, 100000, 120000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const SALARY_TIERS = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const TAX_TIERS = [25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000, 175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000];
  const RETIREMENT_SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 90000, 100000, 120000, 140000, 150000, 175000, 200000, 250000, 300000, 400000, 500000];
  const RVB_RENTS = [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000];
  const RVB_PRICES = [150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 800000, 1000000];
  const nearest = (v, t) => t.reduce((best, x) => (Math.abs(x - v) < Math.abs(best - v) ? x : best), t[0]);

  // A typical mortgage is ~4x annual salary. Back-compute a plausible salary.
  const plausibleSalary = Math.round(price / 4);
  const affordSalary = nearest(plausibleSalary, AFFORD_TIERS);
  const takeHomeSalary = nearest(plausibleSalary, SALARY_TIERS);
  const taxSalary = nearest(plausibleSalary, TAX_TIERS);
  const retSalary = nearest(plausibleSalary, RETIREMENT_SALARIES);
  // Rent-vs-buy: pick a plausible monthly rent for a house at this price.
  const estimatedMonthlyRent = nearest(Math.round(price * 0.004), RVB_RENTS);
  const rvbBuyPrice = nearest(price, RVB_PRICES);
  const priceLabel = price >= 1000000
    ? `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`
    : `$${(price / 1000).toFixed(0)}K`;

  const crossTemplateLinks = [
    {
      href: `/afford/${affordSalary}-in-${stateSlugConcat}`,
      title: `What salary you need to afford ${priceLabel} in ${stateName}`,
      desc: `Affordability analysis — ${affordSalary.toLocaleString()}/yr gets you to this price range.`,
    },
    {
      href: `/salary/${takeHomeSalary}-salary-in-${stateSlugConcat}`,
      title: `Take-home pay on $${takeHomeSalary.toLocaleString()} in ${stateName}`,
      desc: `Federal tax, state tax, Social Security, and Medicare breakdown.`,
    },
    {
      href: `/tax-brackets/${stateSlug}-${taxSalary}`,
      title: `Tax brackets on $${taxSalary.toLocaleString()} in ${stateName}`,
      desc: `See exactly which brackets your income crosses.`,
    },
    {
      href: `/rent-vs-buy/rent-${estimatedMonthlyRent}-vs-buy-${rvbBuyPrice}`,
      title: `Rent $${estimatedMonthlyRent.toLocaleString()}/mo vs buy $${rvbBuyPrice.toLocaleString()}`,
      desc: `Compare total costs, equity, and break-even timeline.`,
    },
    {
      href: `/retirement/age-30-salary-${retSalary}`,
      title: `Retirement at 30 earning $${retSalary.toLocaleString()}`,
      desc: `Savings benchmarks and projections for someone at this income.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com" },
          { "@type": "ListItem", "position": 2, "name": "Mortgage", "item": "https://www.pulsafi.com/mortgage" },
          { "@type": "ListItem", "position": 3, "name": `${formatPrice(price)} in ${stateName}`, "item": `https://www.pulsafi.com/mortgage/${slug}` }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How much is a mortgage on a ${formatPrice(price)} home in ${stateName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `With 20% down on a ${formatPrice(price)} home in ${stateName}, your estimated monthly payment is ${formatCurrency(primary.totalMonthly)} including principal, interest (${MORTGAGE_RATE}%), property taxes (${propertyTaxRate}%), and homeowners insurance.`
            }
          },
          {
            "@type": "Question",
            "name": `What salary do you need for a ${formatPrice(price)} house in ${stateName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `To afford a ${formatPrice(price)} home in ${stateName} with 20% down, you'd need a household income of approximately ${formatCurrency(primary.salaryNeeded)} per year, using the 28% rule (housing costs should not exceed 28% of gross income).`
            }
          },
          {
            "@type": "Question",
            "name": `How much are property taxes on a ${formatPrice(price)} home in ${stateName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Property taxes on a ${formatPrice(price)} home in ${stateName} are approximately ${formatCurrency(price * propertyTaxRate / 100)} per year (${formatCurrency(monthlyPropertyTax)}/month), based on the average effective property tax rate of ${propertyTaxRate}%.`
            }
          },
          {
            "@type": "Question",
            "name": `What is the total cost of a ${formatPrice(price)} home in ${stateName} over 30 years?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `The total cost of a ${formatPrice(price)} home in ${stateName} over 30 years includes the down payment of ${formatCurrency(primary.downPayment)} plus ${formatCurrency(primary.totalMonthly)} monthly for 360 months. This totals approximately ${formatCurrency(primary.downPayment + (primary.totalMonthly * 360))}, including all property taxes, insurance, and interest.`
            }
          },
          {
            "@type": "Question",
            "name": `Is PMI required on a ${formatPrice(price)} home in ${stateName}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `${primary.dpPercent < 20 ? `Yes, PMI (Private Mortgage Insurance) is required if you put down less than 20%. PMI typically costs around 0.5% of the loan amount annually, adding approximately ${formatCurrency((primary.loanAmount * 0.005) / 12)}/month to your payment.` : `No, PMI is not required because you're putting down 20% or more. However, if you put down less than 20%, PMI typically adds ~0.5% of the loan amount annually to your monthly payment.`}`
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

        <nav style={{ marginBottom: "20px", fontSize: "14px", color: "var(--text-secondary)" }}>
          <a href="/" style={{ color: "var(--accent)", textDecoration: "none" }}>Home</a>
          {" âº "}
          <a href="/tools" style={{ color: "var(--accent)", textDecoration: "none" }}>Tools</a>
          {" âº "}
          <a href="/mortgage" style={{ color: "var(--accent)", textDecoration: "none" }}>Mortgage</a>
          {" âº "}
          <span>{formatPrice(price)} in {stateName}</span>
        </nav>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "var(--text-primary)" }}>
          Can I Afford a {formatPrice(price)} Home in {stateName}?
        </h1>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)", marginBottom: "32px" }}>
          Complete mortgage breakdown for a {formatCurrency(price)} home in {stateName}, including monthly payments, property taxes, insurance, and the salary you need to qualify.
        </p>

        {/* Quick Answer Card */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", opacity: 0.8, marginBottom: "8px" }}>Estimated Monthly Payment (20% down)</div>
          <div style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>{formatCurrency(primary.totalMonthly)}/mo</div>
          <div style={{ fontSize: "16px", opacity: 0.9 }}>
            P&I: {formatCurrency(primary.monthlyPI)} + Tax: {formatCurrency(monthlyPropertyTax)} + Insurance: {formatCurrency(monthlyInsurance)}
          </div>
        </div>

        {/* Down Payment Scenarios */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>
          Monthly Payment by Down Payment
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "var(--bg-card)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid var(--border-card)" }}>Down Payment</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid var(--border-card)" }}>Amount</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid var(--border-card)" }}>Monthly</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid var(--border-card)" }}>Income Needed</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s, i) => (
                <tr key={s.dpPercent} style={{ background: s.dpPercent === 20 ? "#eff6ff" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--border-card)", fontWeight: "500" }}>{s.dpPercent}%</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid var(--border-card)" }}>{formatCurrency(s.downPayment)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid var(--border-card)", fontWeight: "600" }}>{formatCurrency(s.totalMonthly)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid var(--border-card)", color: "var(--accent)" }}>{formatCurrency(s.salaryNeeded)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cost Breakdown */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>
          Monthly Cost Breakdown ({stateName})
        </h2>
        <div style={{ background: "var(--bg-card)", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>Principal & Interest</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#1e3a5f" }}>{formatCurrency(primary.monthlyPI)}/mo</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>Property Tax ({propertyTaxRate}%)</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-secondary)" }}>{formatCurrency(monthlyPropertyTax)}/mo</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>Homeowners Insurance</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-secondary)" }}>{formatCurrency(monthlyInsurance)}/mo</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "4px" }}>Total Interest (30-yr)</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "var(--text-secondary)" }}>{formatCurrency(primary.totalInterest)}</div>
            </div>
          </div>
        </div>

        {/* Affordability Guide */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>
          Affordability Rules of Thumb
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "var(--accent-bg, rgba(201,162,39,0.1))", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "4px" }}>28% Rule (Housing)</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "var(--accent)" }}>{formatCurrency(primary.salaryNeeded)}/yr</div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Minimum gross income</div>
          </div>
          <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "4px" }}>36% Rule (All Debt)</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "var(--accent)" }}>{formatCurrency(primary.totalMonthly * 12 / 0.36)}/yr</div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>If no other debt</div>
          </div>
          <div style={{ background: "#fdf4ff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "var(--accent)", marginBottom: "4px" }}>3Ã Income Rule</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "var(--accent)" }}>{formatCurrency(price / 3)}/yr</div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>Conservative target</div>
          </div>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>
          Buying a {formatPrice(price)} Home in {stateName}
        </h2>
        <div style={{ color: "var(--text-secondary)", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            {price <= 250000 ? (
              `A ${formatCurrency(price)} home in ${stateName} is at or below the national median home price. With a 20% down payment of ${formatCurrency(primary.downPayment)}, your estimated monthly payment of ${formatCurrency(primary.totalMonthly)} is achievable on a salary of ${formatCurrency(primary.salaryNeeded)} or more. ${stateName}'s property tax rate of ${propertyTaxRate}% ${propertyTaxRate < 0.7 ? "is relatively low, helping keep costs down" : propertyTaxRate > 1.5 ? "is above average, which adds significantly to monthly costs" : "is near the national average"}.`
            ) : price <= 500000 ? (
              `A ${formatCurrency(price)} home in ${stateName} falls in the mid-range of the housing market. At ${formatCurrency(primary.totalMonthly)}/month with 20% down, you'll need a household income of about ${formatCurrency(primary.salaryNeeded)} to comfortably afford this home under the 28% rule. Property taxes in ${stateName} (${propertyTaxRate}%) add ${formatCurrency(monthlyPropertyTax)} monthly to your costs.`
            ) : price <= 1000000 ? (
              `A ${formatCurrency(price)} home in ${stateName} is in the upper range of the market. With a ${formatCurrency(primary.downPayment)} down payment, your monthly costs of ${formatCurrency(primary.totalMonthly)} require a substantial household income of ${formatCurrency(primary.salaryNeeded)}. Over 30 years, you'll pay ${formatCurrency(primary.totalInterest)} in interest alone.`
            ) : (
              `A ${formatCurrency(price)} home in ${stateName} represents a significant investment. The ${formatCurrency(primary.downPayment)} down payment and ${formatCurrency(primary.totalMonthly)}/month payments require a household income of at least ${formatCurrency(primary.salaryNeeded)}. Consider whether a 15-year mortgage could save you on total interest paid over the life of the loan.`
            )}
          </p>
          <p>
            These estimates assume a {MORTGAGE_RATE}% 30-year fixed mortgage rate. Use our{" "}
            <a href="/tools/mortgage-calculator" style={{ color: "var(--accent)", textDecoration: "underline" }}>mortgage calculator</a>{" "}
            for custom scenarios, or check what{" "}
            <a href={`/afford/${nearest(primary.salaryNeeded, AFFORD_TIERS)}-in-${stateSlugConcat}`} style={{ color: "var(--accent)", textDecoration: "underline" }}>
              salary you can afford in {stateName}
            </a>.
          </p>
        </div>

        {/* Other prices in this state */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>
          Other Home Prices in {stateName}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {HOME_PRICES.filter(p => p !== price).slice(0, 12).map((p) => (
            <a key={p} href={`/mortgage/${stateSlug}-${p}`} style={{ padding: "8px 16px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", color: "var(--accent)", textDecoration: "none", fontSize: "14px" }}>
              {formatPrice(p)}
            </a>
          ))}
        </div>

        {/* Same price, other states */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "var(--text-primary)" }}>
          {formatPrice(price)} Homes in Other States
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {nearbyStates.map((s) => (
            <a key={s} href={`/mortgage/${s}-${price}`} style={{ padding: "8px 16px", background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "8px", color: "var(--accent)", textDecoration: "none", fontSize: "14px" }}>
              {STATE_NAMES[s]}
            </a>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid #e5e7eb", marginBottom: "32px" }}>
          {prevPrice ? (
            <a href={`/mortgage/${stateSlug}-${prevPrice}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
              â {formatPrice(prevPrice)} in {stateName}
            </a>
          ) : <span />}
          {nextPrice ? (
            <a href={`/mortgage/${stateSlug}-${nextPrice}`} style={{ color: "var(--accent)", textDecoration: "none" }}>
              {formatPrice(nextPrice)} in {stateName} â
            </a>
          ) : <span />}
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: "12px", padding: "24px", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "4px", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
            Explore Related Data for a {priceLabel} Home in {stateName}
          </h3>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0 0 16px 0", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
            Dig into every angle of a {priceLabel} home purchase in {stateName} — affordability, take-home pay, taxes, rent vs buy, and retirement.
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
        </div>

        <div style={{ background: "var(--bg-card)", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "var(--text-primary)" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/mortgage-calculator", label: "Mortgage Calculator" },
              { href: "/tools/compound-interest-calculator", label: "Compound Interest" },
              { href: "/tools/fire-calculator", label: "FIRE Calculator" },
              { href: `/afford/${affordSalary}-in-${stateSlugConcat}`, label: `Affordability in ${stateName}` },
            ].map((tool) => (
              <a key={tool.href} href={tool.href} style={{ padding: "8px 16px", background: "var(--bg-main)", border: "1px solid var(--border-card)", borderRadius: "8px", color: "var(--accent)", textDecoration: "none", fontSize: "14px" }}>
                {tool.label}
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div style={{ marginTop: "40px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "24px", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "grid", gap: "16px" }}>
            {[
              {
                q: `How much is a mortgage on a ${formatPrice(price)} home in ${stateName}?`,
                a: `With 20% down on a ${formatPrice(price)} home in ${stateName}, your estimated monthly payment is ${formatCurrency(primary.totalMonthly)} including principal, interest (${MORTGAGE_RATE}%), property taxes (${propertyTaxRate}%), and homeowners insurance.`
              },
              {
                q: `What salary do you need for a ${formatPrice(price)} house in ${stateName}?`,
                a: `To afford a ${formatPrice(price)} home in ${stateName} with 20% down, you'd need a household income of approximately ${formatCurrency(primary.salaryNeeded)} per year, using the 28% rule (housing costs should not exceed 28% of gross income).`
              },
              {
                q: `How much are property taxes on a ${formatPrice(price)} home in ${stateName}?`,
                a: `Property taxes on a ${formatPrice(price)} home in ${stateName} are approximately ${formatCurrency(price * propertyTaxRate / 100)} per year (${formatCurrency(monthlyPropertyTax)}/month), based on the average effective property tax rate of ${propertyTaxRate}%.`
              },
              {
                q: `What is the total cost of a ${formatPrice(price)} home in ${stateName} over 30 years?`,
                a: `The total cost of a ${formatPrice(price)} home in ${stateName} over 30 years includes the down payment of ${formatCurrency(primary.downPayment)} plus ${formatCurrency(primary.totalMonthly)} monthly for 360 months. This totals approximately ${formatCurrency(primary.downPayment + (primary.totalMonthly * 360))}, including all property taxes, insurance, and interest.`
              },
              {
                q: `Is PMI required on a ${formatPrice(price)} home in ${stateName}?`,
                a: `${primary.dpPercent < 20 ? `Yes, PMI (Private Mortgage Insurance) is required if you put down less than 20%. PMI typically costs around 0.5% of the loan amount annually, adding approximately ${formatCurrency((primary.loanAmount * 0.005) / 12)}/month to your payment.` : `No, PMI is not required because you're putting down 20% or more. However, if you put down less than 20%, PMI typically adds ~0.5% of the loan amount annually to your monthly payment.`}`
              }
            ].map((item, idx) => (
              <details key={idx} style={{ border: "1px solid var(--border-card)", borderRadius: "8px", padding: "16px", background: "var(--bg-card)" }}>
                <summary style={{ cursor: "pointer", fontWeight: "600", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
                  {item.q}
                </summary>
                <p style={{ marginTop: "12px", color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", lineHeight: "1.6" }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Related Articles Section */}
        <div style={{ background: "var(--bg-card)", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "var(--text-primary)", fontFamily: "'Playfair Display', serif" }}>Related Articles</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/learn/how-much-house-can-you-afford", label: "How Much House Can You Afford?" },
              { href: "/learn/rent-vs-buy-2026", label: "Rent vs Buy in 2026" },
              { href: "/learn/how-to-save-for-a-house", label: "How to Save for a House" },
            ].map((article) => (
              <a key={article.href} href={article.href} style={{ padding: "8px 16px", background: "var(--bg-main)", border: "1px solid var(--border-card)", borderRadius: "8px", color: "var(--accent)", textDecoration: "none", fontSize: "14px" }}>
                {article.label}
              </a>
            ))}
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}


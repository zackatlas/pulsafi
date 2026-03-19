import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const INCOMES = [
  25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000, 70000, 75000,
  80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000, 140000, 150000,
  175000, 200000, 250000, 300000, 350000, 400000, 500000, 750000, 1000000
];

const STATE_INCOME_TAX_RATES = {
  "alabama": 4.0, "alaska": 0, "arizona": 2.5, "arkansas": 3.9, "california": 9.3,
  "colorado": 4.4, "connecticut": 5.0, "delaware": 5.5, "florida": 0, "georgia": 5.39,
  "hawaii": 7.2, "idaho": 5.8, "illinois": 4.95, "indiana": 3.05, "iowa": 5.7,
  "kansas": 5.25, "kentucky": 4.0, "louisiana": 3.0, "maine": 6.75, "maryland": 4.75,
  "massachusetts": 5.0, "michigan": 4.25, "minnesota": 7.85, "mississippi": 4.7, "missouri": 4.8,
  "montana": 5.9, "nebraska": 5.84, "nevada": 0, "new-hampshire": 0, "new-jersey": 5.525,
  "new-mexico": 4.9, "new-york": 6.33, "north-carolina": 4.5, "north-dakota": 1.95, "ohio": 3.5,
  "oklahoma": 4.75, "oregon": 8.75, "pennsylvania": 3.07, "rhode-island": 4.75, "south-carolina": 6.2,
  "south-dakota": 0, "tennessee": 0, "texas": 0, "utah": 4.65, "vermont": 6.6,
  "virginia": 5.75, "washington": 0, "west-virginia": 5.12, "wisconsin": 5.3, "wyoming": 0,
  "district-of-columbia": 6.5
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

const FEDERAL_BRACKETS_SINGLE = [
  { min: 0, max: 11600, rate: 10 },
  { min: 11600, max: 47150, rate: 12 },
  { min: 47150, max: 100525, rate: 22 },
  { min: 100525, max: 191950, rate: 24 },
  { min: 191950, max: 243725, rate: 32 },
  { min: 243725, max: 609350, rate: 35 },
  { min: 609350, max: Infinity, rate: 37 },
];

const STANDARD_DEDUCTION = 14600;

function calculateFederalTax(income) {
  const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION);
  let tax = 0;
  for (const bracket of FEDERAL_BRACKETS_SINGLE) {
    if (taxableIncome <= bracket.min) break;
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxable * bracket.rate / 100;
  }
  return tax;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatIncome(income) {
  if (income >= 1000000) return `$${(income / 1000000).toFixed(0)}M`;
  return `$${(income / 1000).toFixed(0)}K`;
}

export async function generateStaticParams() {
  // Pre-render only the most popular income levels to avoid build timeouts
  // Reduces from 1,530 (51 states x 30 incomes) to 255 (51 x 5)
  // Rest generated on-demand via ISR
  const topIncomes = [50000, 75000, 100000, 150000, 200000];
  const params = [];
  for (const state of STATES) {
    for (const income of topIncomes) {
      params.push({ slug: `${state}-${income}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const lastDash = slug.lastIndexOf("-");
  const stateSlug = slug.substring(0, lastDash);
  const income = parseInt(slug.substring(lastDash + 1));
  const stateName = STATE_NAMES[stateSlug];
  if (!stateName || !INCOMES.includes(income)) return {};

  const federalTax = calculateFederalTax(income);
  const stateTaxRate = STATE_INCOME_TAX_RATES[stateSlug];
  const stateTax = income * stateTaxRate / 100;
  const totalTax = federalTax + stateTax + (income * 0.0765);

  return {
    title: `${formatIncome(income)} Tax Bracket in ${stateName} \u2014 Federal + State Taxes | Pulsafi`,
    description: `Earning ${formatIncome(income)} in ${stateName}? Your estimated total tax is ${formatCurrency(totalTax)} (federal + ${stateTaxRate}% state + FICA). See your bracket, effective rate, and take-home pay.`,
    keywords: [
      `${formatIncome(income)} tax bracket`,
      `tax bracket ${stateName}`,
      `income tax ${stateName}`,
      `${formatIncome(income)} salary tax`,
      `federal tax ${formatIncome(income)}`,
    ],
    alternates: {
      canonical: `https://pulsafi.com/tax-brackets/${slug}`,
    },
    openGraph: {
      title: `${formatIncome(income)} Income Tax in ${stateName}`,
      description: `Tax breakdown for ${formatIncome(income)} income in ${stateName}.`,
      url: `https://pulsafi.com/tax-brackets/${slug}`,
      type: 'website',
      images: [{ url: `/api/og?title=${encodeURIComponent(formatIncome(income))}+Tax+Bracket&subtitle=in+${encodeURIComponent(stateName)}&type=tool`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${formatIncome(income)} Tax Bracket in ${stateName}`,
      description: `Federal + state tax breakdown for ${formatIncome(income)} income in ${stateName}.`,
      images: [`/api/og?title=${encodeURIComponent(formatIncome(income))}+Tax+Bracket&subtitle=in+${encodeURIComponent(stateName)}&type=tool`],
    },
  };
}

export default async function TaxBracketsPage({ params }) {
  const { slug } = await params;
  const lastDash = slug.lastIndexOf("-");
  const stateSlug = slug.substring(0, lastDash);
  const income = parseInt(slug.substring(lastDash + 1));
  const stateName = STATE_NAMES[stateSlug];

  if (!stateName || !INCOMES.includes(income)) notFound();

  const federalTax = calculateFederalTax(income);
  const stateTaxRate = STATE_INCOME_TAX_RATES[stateSlug];
  const stateTax = income * stateTaxRate / 100;
  const socialSecurity = Math.min(income, 168600) * 0.062;
  const medicare = income * 0.0145 + (income > 200000 ? (income - 200000) * 0.009 : 0);
  const fica = socialSecurity + medicare;
  const totalTax = federalTax + stateTax + fica;
  const afterTax = income - totalTax;
  const effectiveRate = (totalTax / income) * 100;
  const federalEffective = (federalTax / income) * 100;

  // Find marginal bracket
  const taxableIncome = Math.max(0, income - STANDARD_DEDUCTION);
  const marginalBracket = FEDERAL_BRACKETS_SINGLE.find(b => taxableIncome >= b.min && taxableIncome < b.max) || FEDERAL_BRACKETS_SINGLE[FEDERAL_BRACKETS_SINGLE.length - 1];

  // Bracket breakdown
  const bracketBreakdown = FEDERAL_BRACKETS_SINGLE.filter(b => taxableIncome > b.min).map(b => {
    const taxable = Math.min(taxableIncome, b.max) - b.min;
    const tax = taxable * b.rate / 100;
    return { ...b, taxable, tax };
  });

  // No-income-tax states
  const noTaxStates = STATES.filter(s => STATE_INCOME_TAX_RATES[s] === 0);
  const lowestTaxStates = [...STATES].sort((a, b) => STATE_INCOME_TAX_RATES[a] - STATE_INCOME_TAX_RATES[b]).slice(0, 10);

  const incomeIdx = INCOMES.indexOf(income);
  const prevIncome = incomeIdx > 0 ? INCOMES[incomeIdx - 1] : null;
  const nextIncome = incomeIdx < INCOMES.length - 1 ? INCOMES[incomeIdx + 1] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What tax bracket is ${formatIncome(income)} in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `At ${formatIncome(income)} income in ${stateName}, your federal marginal tax bracket is ${marginalBracket.rate}%. Your effective federal rate is ${federalEffective.toFixed(1)}%. Combined with ${stateName}'s ${stateTaxRate}% state tax and FICA, your total effective tax rate is ${effectiveRate.toFixed(1)}%.`
        }
      },
      {
        "@type": "Question",
        "name": `How much tax do you pay on ${formatIncome(income)} in ${stateName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `On ${formatCurrency(income)} income in ${stateName}, you'd pay approximately ${formatCurrency(totalTax)} in total taxes: ${formatCurrency(federalTax)} federal, ${formatCurrency(stateTax)} state, and ${formatCurrency(fica)} in FICA. Your take-home pay is about ${formatCurrency(afterTax)} (${formatCurrency(afterTax / 12)}/month).`
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
          <a href="/tax-brackets" style={{ color: "#2563eb", textDecoration: "none" }}>Tax Brackets</a>
          {" âº "}
          <span>{formatIncome(income)} in {stateName}</span>
        </nav>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          {formatIncome(income)} Tax Bracket in {stateName}
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          Federal and {stateName} state tax breakdown for {formatCurrency(income)} income, including your marginal bracket, effective rate, FICA, and estimated take-home pay.
        </p>

        {/* Quick Stats */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div>
              <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "4px" }}>Take-Home Pay</div>
              <div style={{ fontSize: "36px", fontWeight: "800" }}>{formatCurrency(afterTax)}/yr</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>{formatCurrency(afterTax / 12)}/month</div>
            </div>
            <div>
              <div style={{ fontSize: "14px", opacity: 0.8, marginBottom: "4px" }}>Total Tax</div>
              <div style={{ fontSize: "36px", fontWeight: "800" }}>{formatCurrency(totalTax)}</div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>{effectiveRate.toFixed(1)}% effective rate</div>
            </div>
          </div>
        </div>

        {/* Tax Summary */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Tax Breakdown
        </h2>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Federal Income Tax</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(federalTax)}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>Marginal: {marginalBracket.rate}% | Effective: {federalEffective.toFixed(1)}%</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>{stateName} State Tax</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: stateTaxRate === 0 ? "#059669" : "#dc2626" }}>
                {stateTaxRate === 0 ? "$0 (No state tax)" : formatCurrency(stateTax)}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>{stateTaxRate === 0 ? "One of 7 no-tax states" : `${stateTaxRate}% rate`}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>FICA (SS + Medicare)</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(fica)}</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>SS: {formatCurrency(socialSecurity)} + Med: {formatCurrency(medicare)}</div>
            </div>
          </div>
        </div>

        {/* Federal Bracket Breakdown */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Federal Tax Brackets Applied
        </h2>
        <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "12px" }}>
          Taxable income: {formatCurrency(taxableIncome)} (after ${formatCurrency(STANDARD_DEDUCTION)} standard deduction)
        </p>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Bracket</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Taxable Amount</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Tax</th>
              </tr>
            </thead>
            <tbody>
              {bracketBreakdown.map((b, i) => (
                <tr key={b.rate} style={{ background: b === bracketBreakdown[bracketBreakdown.length - 1] ? "#fef3c7" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{b.rate}%</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(b.taxable)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#dc2626" }}>{formatCurrency(b.tax)}</td>
                </tr>
              ))}
              <tr style={{ background: "#f3f4f6", fontWeight: "600" }}>
                <td style={{ padding: "12px 16px", borderBottom: "2px solid #e5e7eb" }}>Total Federal</td>
                <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "2px solid #e5e7eb" }}>{formatCurrency(taxableIncome)}</td>
                <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "2px solid #e5e7eb", color: "#dc2626" }}>{formatCurrency(federalTax)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Understanding Your Tax Burden
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            At {formatCurrency(income)} gross income in {stateName}, your marginal federal tax bracket is {marginalBracket.rate}% â but your effective federal rate is only {federalEffective.toFixed(1)}% because the progressive tax system taxes different portions of your income at different rates.
            {stateTaxRate === 0 ? ` As a no-income-tax state, ${stateName} saves you significantly compared to high-tax states.` : ` ${stateName}'s ${stateTaxRate}% state income tax adds ${formatCurrency(stateTax)} to your annual tax bill.`}
          </p>
          <p>
            Your total effective tax rate of {effectiveRate.toFixed(1)}% means you keep {formatCurrency(afterTax)} out of every {formatCurrency(income)} earned ({(100 - effectiveRate).toFixed(1)}%). For strategies to reduce your tax burden, consider maximizing 401(k) contributions ({formatCurrency(23500)}/year for 2025), HSA contributions, and itemizing deductions if they exceed {formatCurrency(STANDARD_DEDUCTION)}.
          </p>
        </div>

        {/* Lowest-tax states */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          {formatIncome(income)} â Compare Taxes by State
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>State</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>State Tax Rate</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>State Tax</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Total Tax</th>
              </tr>
            </thead>
            <tbody>
              {lowestTaxStates.map((s, i) => (
                <tr key={s} style={{ background: s === stateSlug ? "#eff6ff" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>
                    <a href={`/tax-brackets/${s}-${income}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: s === stateSlug ? "700" : "400" }}>
                      {STATE_NAMES[s]} {s === stateSlug ? "â" : ""}
                    </a>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>
                    {STATE_INCOME_TAX_RATES[s] === 0 ? "None" : `${STATE_INCOME_TAX_RATES[s]}%`}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>
                    {formatCurrency(income * STATE_INCOME_TAX_RATES[s] / 100)}
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>
                    {formatCurrency(federalTax + (income * STATE_INCOME_TAX_RATES[s] / 100) + fica)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Other incomes */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Other Income Levels in {stateName}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {INCOMES.filter(i => i !== income).slice(0, 12).map((i) => (
            <a key={i} href={`/tax-brackets/${stateSlug}-${i}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {formatIncome(i)}
            </a>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid #e5e7eb", marginBottom: "32px" }}>
          {prevIncome ? (
            <a href={`/tax-brackets/${stateSlug}-${prevIncome}`} style={{ color: "#2563eb", textDecoration: "none" }}>
              â {formatIncome(prevIncome)}
            </a>
          ) : <span />}
          {nextIncome ? (
            <a href={`/tax-brackets/${stateSlug}-${nextIncome}`} style={{ color: "#2563eb", textDecoration: "none" }}>
              {formatIncome(nextIncome)} â
            </a>
          ) : <span />}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/salary-breakdown-calculator", label: "Salary Calculator" },
              { href: `/salary/${stateSlug}`, label: `${stateName} Salary After Tax` },
              { href: "/tools/fire-calculator", label: "FIRE Calculator" },
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

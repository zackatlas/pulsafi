import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Generate rates from $7.25 to $100 in $0.50 increments
function generateRates() {
  const rates = [7.25]; // Federal minimum wage
  for (let r = 7.50; r <= 100; r += 0.50) {
    rates.push(r);
  }
  return rates;
}

const RATES = generateRates();

const FEDERAL_TAX_BRACKETS = {
  10000: 0.10, 41000: 0.12, 89075: 0.22, 170050: 0.24, 215950: 0.32, 539900: 0.35, Infinity: 0.37
};

function calculateFederalTax(income) {
  let tax = 0;
  let previousLimit = 0;
  for (const [limit, rate] of Object.entries(FEDERAL_TAX_BRACKETS).sort((a, b) => Number(a[0]) - Number(b[0]))) {
    const bracketLimit = Number(limit) === Infinity ? Infinity : Number(limit);
    if (income <= previousLimit) break;
    const taxableInThisBracket = Math.min(income, bracketLimit) - previousLimit;
    tax += taxableInThisBracket * rate;
    previousLimit = bracketLimit;
  }
  return tax;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatRate(rate) {
  return rate % 1 === 0 ? rate.toFixed(0) : rate.toFixed(2);
}

export async function generateStaticParams() {
  return RATES.map((rate) => ({
    rate: rate.toFixed(2),
  }));
}

export async function generateMetadata({ params }) {
  const { rate } = await params;
  const hourlyRate = parseFloat(rate);
  if (isNaN(hourlyRate) || !RATES.includes(hourlyRate)) return {};
  const annual = hourlyRate * 2080;
  return {
    title: `$${formatRate(hourlyRate)}/Hour to Annual Salary â ${formatCurrency(annual)}/Year | Pulsafi`,
    description: `$${formatRate(hourlyRate)} per hour equals ${formatCurrency(annual)} per year before taxes. See monthly, biweekly, and weekly breakdowns plus estimated take-home pay after federal taxes.`,
    alternates: { canonical: `/hourly-to-salary/${rate}` },
    openGraph: {
      title: `$${formatRate(hourlyRate)}/Hour = ${formatCurrency(annual)}/Year`,
      description: `Convert $${formatRate(hourlyRate)} hourly wage to annual, monthly, biweekly, and weekly salary with tax estimates.`,
      url: `https://pulsafi.com/hourly-to-salary/${rate}`,
    },
  };
}

export default async function HourlyToSalaryPage({ params }) {
  const { rate } = await params;
  const hourlyRate = parseFloat(rate);

  if (isNaN(hourlyRate) || !RATES.includes(hourlyRate)) {
    notFound();
  }

  const annual = hourlyRate * 2080;
  const monthly = annual / 12;
  const biweekly = annual / 26;
  const weekly = hourlyRate * 40;
  const daily = hourlyRate * 8;

  const federalTax = calculateFederalTax(annual);
  const ficaTax = annual * 0.0765;
  const totalTax = federalTax + ficaTax;
  const afterTax = annual - totalTax;
  const effectiveRate = (totalTax / annual) * 100;

  // Overtime calculations
  const annualWithOT5 = annual + (hourlyRate * 1.5 * 5 * 52);
  const annualWithOT10 = annual + (hourlyRate * 1.5 * 10 * 52);

  // Find nearby rates
  const rateIndex = RATES.indexOf(hourlyRate);
  const prevRate = rateIndex > 0 ? RATES[rateIndex - 1] : null;
  const nextRate = rateIndex < RATES.length - 1 ? RATES[rateIndex + 1] : null;

  // Comparison rates
  const comparisonRates = [7.25, 10, 15, 20, 25, 30, 40, 50, 75, 100].filter(r => r !== hourlyRate);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much is $${formatRate(hourlyRate)} an hour annually?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `$${formatRate(hourlyRate)} per hour equals ${formatCurrency(annual)} per year, based on a standard 40-hour work week (2,080 hours per year).`
        }
      },
      {
        "@type": "Question",
        "name": `What is $${formatRate(hourlyRate)} an hour after taxes?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `After estimated federal income tax and FICA, $${formatRate(hourlyRate)}/hour (${formatCurrency(annual)}/year) yields approximately ${formatCurrency(afterTax)} per year in take-home pay. Actual amounts vary by state and filing status.`
        }
      },
      {
        "@type": "Question",
        "name": `How much is $${formatRate(hourlyRate)} an hour per month?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `$${formatRate(hourlyRate)}/hour equals approximately ${formatCurrency(monthly)} per month before taxes (${formatCurrency(annual)} Ã· 12 months).`
        }
      }
    ]
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 20px", fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: "20px", fontSize: "14px", color: "#6b7280" }}>
          <a href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</a>
          {" âº "}
          <a href="/tools" style={{ color: "#2563eb", textDecoration: "none" }}>Tools</a>
          {" âº "}
          <span>${formatRate(hourlyRate)}/Hour to Salary</span>
        </nav>

        <h1 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          ${formatRate(hourlyRate)} an Hour is How Much a Year?
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          A detailed breakdown of what ${formatRate(hourlyRate)}/hour equals annually, monthly, biweekly, and weekly â plus estimated take-home pay after taxes.
        </p>

        {/* Quick Answer Card */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", opacity: 0.8, marginBottom: "8px" }}>Quick Answer</div>
          <div style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>{formatCurrency(annual)}/year</div>
          <div style={{ fontSize: "16px", opacity: 0.9 }}>
            ${formatRate(hourlyRate)}/hour Ã 40 hrs/week Ã 52 weeks = {formatCurrency(annual)} per year before taxes
          </div>
        </div>

        {/* Breakdown Table */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Complete Salary Breakdown
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Time Period</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Gross Pay</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Est. After Tax</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Hourly", hourlyRate, hourlyRate * (1 - totalTax / annual)],
                ["Daily (8 hrs)", daily, daily * (1 - totalTax / annual)],
                ["Weekly", weekly, weekly * (1 - totalTax / annual)],
                ["Biweekly", biweekly, biweekly * (1 - totalTax / annual)],
                ["Monthly", monthly, monthly * (1 - totalTax / annual)],
                ["Annual", annual, afterTax],
              ].map(([label, gross, net], i) => (
                <tr key={label} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{label}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(gross)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#059669" }}>{formatCurrency(net)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Breakdown */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Estimated Tax Breakdown
        </h2>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Federal Income Tax</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(federalTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>FICA (Social Security + Medicare)</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(ficaTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Total Estimated Tax</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{formatCurrency(totalTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Effective Tax Rate</div>
              <div style={{ fontSize: "20px", fontWeight: "700", color: "#dc2626" }}>{effectiveRate.toFixed(1)}%</div>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "16px" }}>
            * Estimates based on single filer, standard deduction. Does not include state income tax. Actual taxes may vary.
          </p>
        </div>

        {/* Overtime Section */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          With Overtime
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "16px" }}>
          Overtime pay is typically 1.5Ã your regular hourly rate (${formatRate(hourlyRate * 1.5)}/hr for overtime hours).
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#fef3c7", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "#92400e", marginBottom: "4px" }}>With 5 hrs OT/week</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#92400e" }}>{formatCurrency(annualWithOT5)}/yr</div>
            <div style={{ fontSize: "13px", color: "#92400e" }}>+{formatCurrency(annualWithOT5 - annual)} from overtime</div>
          </div>
          <div style={{ background: "#fef3c7", borderRadius: "12px", padding: "20px" }}>
            <div style={{ fontSize: "13px", color: "#92400e", marginBottom: "4px" }}>With 10 hrs OT/week</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#92400e" }}>{formatCurrency(annualWithOT10)}/yr</div>
            <div style={{ fontSize: "13px", color: "#92400e" }}>+{formatCurrency(annualWithOT10 - annual)} from overtime</div>
          </div>
        </div>

        {/* Budget Guide */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Budget Guide on {formatCurrency(annual)}/Year
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "16px" }}>
          Using the 50/30/20 rule with your estimated take-home pay of {formatCurrency(afterTax)}/year ({formatCurrency(afterTax / 12)}/month):
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#eff6ff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "#1d4ed8", marginBottom: "4px" }}>Needs (50%)</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#1d4ed8" }}>{formatCurrency(afterTax * 0.5 / 12)}/mo</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Rent, food, utilities, insurance</div>
          </div>
          <div style={{ background: "#f0fdf4", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "#16a34a", marginBottom: "4px" }}>Wants (30%)</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#16a34a" }}>{formatCurrency(afterTax * 0.3 / 12)}/mo</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Entertainment, dining, hobbies</div>
          </div>
          <div style={{ background: "#fdf4ff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "13px", color: "#9333ea", marginBottom: "4px" }}>Savings (20%)</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#9333ea" }}>{formatCurrency(afterTax * 0.2 / 12)}/mo</div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>Emergency fund, investments, debt</div>
          </div>
        </div>

        {/* Content Section */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Is ${formatRate(hourlyRate)} an Hour a Good Wage?
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            {hourlyRate < 15 ? (
              `At $${formatRate(hourlyRate)}/hour (${formatCurrency(annual)}/year), this wage is ${hourlyRate <= 7.25 ? "at" : "near"} the federal minimum wage. While it provides ${formatCurrency(afterTax)} after estimated federal taxes, it falls below the living wage in most US metropolitan areas. Workers earning this rate may benefit from exploring career advancement opportunities or additional certifications.`
            ) : hourlyRate < 25 ? (
              `At $${formatRate(hourlyRate)}/hour (${formatCurrency(annual)}/year), this is ${hourlyRate >= 20 ? "a moderate" : "an entry-level to moderate"} wage in the United States. Your estimated take-home pay of ${formatCurrency(afterTax)} per year (${formatCurrency(afterTax / 12)}/month) can cover basic expenses in many areas, though housing costs vary significantly by location.`
            ) : hourlyRate < 40 ? (
              `Earning $${formatRate(hourlyRate)}/hour puts your annual income at ${formatCurrency(annual)} â above the US median household income of ~$75,000. With estimated take-home pay of ${formatCurrency(afterTax)}, this wage provides a comfortable living standard in most parts of the country and allows for meaningful saving and investing.`
            ) : hourlyRate < 60 ? (
              `At $${formatRate(hourlyRate)}/hour (${formatCurrency(annual)}/year), you're earning well above the national median. Your estimated take-home of ${formatCurrency(afterTax)} provides significant financial flexibility for saving, investing, and building wealth in virtually any US market.`
            ) : (
              `$${formatRate(hourlyRate)}/hour translates to ${formatCurrency(annual)}/year, placing you well into the top income brackets nationally. With estimated take-home pay of ${formatCurrency(afterTax)}, this income level offers substantial opportunity for wealth building, early retirement planning, and financial independence.`
            )}
          </p>
          <p>
            Keep in mind these estimates use federal tax rates only â your actual take-home pay depends on your state, filing status, deductions, and benefits. Use our{" "}
            <a href="/tools/salary-breakdown-calculator" style={{ color: "#2563eb", textDecoration: "underline" }}>salary breakdown calculator</a>{" "}
            for a more detailed estimate, or check your specific{" "}
            <a href="/salary" style={{ color: "#2563eb", textDecoration: "underline" }}>salary after tax by state</a>.
          </p>
        </div>

        {/* Comparison Table */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Hourly Wage Comparison
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Hourly Rate</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Annual Salary</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Monthly</th>
                <th style={{ padding: "10px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Weekly</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRates.slice(0, 8).map((r, i) => (
                <tr key={r} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "10px 12px", borderBottom: "1px solid #e5e7eb" }}>
                    <a href={`/hourly-to-salary/${r.toFixed(2)}`} style={{ color: "#2563eb", textDecoration: "none", fontWeight: "500" }}>
                      ${formatRate(r)}/hr
                    </a>
                  </td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(r * 2080)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(r * 2080 / 12)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(r * 40)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 0", borderTop: "1px solid #e5e7eb", marginBottom: "32px" }}>
          {prevRate ? (
            <a href={`/hourly-to-salary/${prevRate.toFixed(2)}`} style={{ color: "#2563eb", textDecoration: "none" }}>
              â ${formatRate(prevRate)}/hr
            </a>
          ) : <span />}
          {nextRate ? (
            <a href={`/hourly-to-salary/${nextRate.toFixed(2)}`} style={{ color: "#2563eb", textDecoration: "none" }}>
              ${formatRate(nextRate)}/hr â
            </a>
          ) : <span />}
        </div>

        {/* Related Tools */}
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/salary-breakdown-calculator", label: "Salary Calculator" },
              { href: "/tools/budget-calculator", label: "Budget Calculator" },
              { href: "/tools/net-worth-calculator", label: "Net Worth Calculator" },
              { href: "/tools/compound-interest-calculator", label: "Compound Interest" },
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


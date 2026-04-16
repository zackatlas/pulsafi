import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RENTS = [800, 1000, 1200, 1500, 1800, 2000, 2500, 3000, 3500, 4000, 5000];
const HOME_PRICES = [150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000, 600000, 700000, 800000, 1000000];
const YEARS = [5, 7, 10, 15, 20, 30];

// Assumptions
const MORTGAGE_RATE = 6.875;
const DOWN_PAYMENT_PCT = 20;
const PROPERTY_TAX_RATE = 1.1;
const INSURANCE_RATE = 0.35;
const MAINTENANCE_RATE = 1.0;
const HOME_APPRECIATION = 3.5;
const INVESTMENT_RETURN = 8.0;
const RENT_INCREASE = 3.0;

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatPrice(price) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(0)}M`;
  return `$${(price / 1000).toFixed(0)}K`;
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12;
  const n = years * 12;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
}

export async function generateStaticParams() {
  const params = [];
  for (const rent of RENTS) {
    for (const price of HOME_PRICES) {
      params.push({ slug: `rent-${rent}-vs-buy-${price}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const match = slug.match(/^rent-(\d+)-vs-buy-(\d+)$/);
  if (!match) return {};
  const rent = parseInt(match[1]);
  const price = parseInt(match[2]);
  if (!RENTS.includes(rent) || !HOME_PRICES.includes(price)) return {};

  return {
    title: `Rent ${formatCurrency(rent)}/mo vs Buy a ${formatPrice(price)} Home â Which Is Better? | Pulsafi`,
    description: `Should you rent at ${formatCurrency(rent)}/month or buy a ${formatPrice(price)} home? Compare total costs over 5â30 years with equity building, investment returns, and break-even analysis.`,
    openGraph: {
      title: `Rent ${formatCurrency(rent)}/mo vs Buy ${formatPrice(price)}`,
      description: `Complete rent vs buy analysis comparing ${formatCurrency(rent)}/month rent against buying a ${formatPrice(price)} home.`,
      url: `https://www.pulsafi.com/rent-vs-buy/${slug}`,
    },
    alternates: { canonical: `/rent-vs-buy/${slug}` },
  };
}

export default async function RentVsBuyPage({ params }) {
  const { slug } = await params;
  const match = slug.match(/^rent-(\d+)-vs-buy-(\d+)$/);
  if (!match) notFound();
  const rent = parseInt(match[1]);
  const price = parseInt(match[2]);
  if (!RENTS.includes(rent) || !HOME_PRICES.includes(price)) notFound();

  const downPayment = price * DOWN_PAYMENT_PCT / 100;
  const loanAmount = price - downPayment;
  const monthlyPI = calculateMonthlyPayment(loanAmount, MORTGAGE_RATE, 30);
  const monthlyPropertyTax = (price * PROPERTY_TAX_RATE / 100) / 12;
  const monthlyInsurance = (price * INSURANCE_RATE / 100) / 12;
  const monthlyMaintenance = (price * MAINTENANCE_RATE / 100) / 12;
  const totalMonthlyOwning = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance;

  // Year-by-year comparison
  const yearComparison = YEARS.map(year => {
    // Renting: total rent paid + opportunity cost of down payment invested
    let totalRent = 0;
    let currentRent = rent;
    for (let y = 0; y < year; y++) {
      totalRent += currentRent * 12;
      currentRent *= (1 + RENT_INCREASE / 100);
    }
    const downPaymentInvested = downPayment * Math.pow(1 + INVESTMENT_RETURN / 100, year);
    const rentWealth = downPaymentInvested;
    const totalRentCost = totalRent;

    // Buying: total ownership cost + equity
    let totalOwnCost = 0;
    const homeValue = price * Math.pow(1 + HOME_APPRECIATION / 100, year);
    // Simplified: total payments over the years
    totalOwnCost = totalMonthlyOwning * 12 * year;
    // Equity = home value - remaining balance (simplified)
    const monthlyRate = MORTGAGE_RATE / 100 / 12;
    const totalPayments = 360;
    const paymentsMade = Math.min(year * 12, totalPayments);
    const remainingBalance = paymentsMade >= totalPayments ? 0 :
      loanAmount * (Math.pow(1 + monthlyRate, totalPayments) - Math.pow(1 + monthlyRate, paymentsMade)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    const equity = homeValue - remainingBalance;
    const buyWealth = equity;

    const advantage = buyWealth - rentWealth;
    const winner = advantage > 0 ? "buy" : "rent";
    const savings = Math.abs(advantage);

    return { year, totalRent: totalRentCost, totalOwnCost, rentWealth, buyWealth, equity, homeValue, advantage, winner, savings };
  });

  const breakEven = yearComparison.find(y => y.winner === "buy");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Should I rent at ${formatCurrency(rent)}/month or buy a ${formatPrice(price)} home?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": breakEven
            ? `Buying a ${formatPrice(price)} home becomes financially advantageous compared to renting at ${formatCurrency(rent)}/month after approximately ${breakEven.year} years, when home equity and appreciation outweigh the invested down payment returns.`
            : `Based on these numbers, renting at ${formatCurrency(rent)}/month may be more financially advantageous than buying a ${formatPrice(price)} home for the foreseeable future, considering the opportunity cost of the down payment.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does it cost monthly to own a ${formatPrice(price)} home?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A ${formatPrice(price)} home with 20% down costs approximately ${formatCurrency(totalMonthlyOwning)}/month including mortgage (${formatCurrency(monthlyPI)}), property tax (${formatCurrency(monthlyPropertyTax)}), insurance (${formatCurrency(monthlyInsurance)}), and maintenance (${formatCurrency(monthlyMaintenance)}).`
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
          <a href="/rent-vs-buy" style={{ color: "#2563eb", textDecoration: "none" }}>Rent vs Buy</a>
          {" âº "}
          <span>{formatCurrency(rent)}/mo vs {formatPrice(price)}</span>
        </nav>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          Rent {formatCurrency(rent)}/mo vs Buy a {formatPrice(price)} Home
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          A side-by-side financial comparison of renting at {formatCurrency(rent)}/month vs buying a {formatCurrency(price)} home with {DOWN_PAYMENT_PCT}% down over 5 to 30 years.
        </p>

        {/* Monthly Comparison */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#eff6ff", borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "14px", color: "#1d4ed8", marginBottom: "4px" }}>Monthly Rent</div>
            <div style={{ fontSize: "36px", fontWeight: "800", color: "#1d4ed8" }}>{formatCurrency(rent)}</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px" }}>+ {RENT_INCREASE}%/yr increases</div>
          </div>
          <div style={{ background: "#f0fdf4", borderRadius: "16px", padding: "24px" }}>
            <div style={{ fontSize: "14px", color: "#16a34a", marginBottom: "4px" }}>Monthly Ownership</div>
            <div style={{ fontSize: "36px", fontWeight: "800", color: "#16a34a" }}>{formatCurrency(totalMonthlyOwning)}</div>
            <div style={{ fontSize: "13px", color: "#6b7280", marginTop: "8px" }}>P&I + tax + ins + maint</div>
          </div>
        </div>

        {/* Ownership Cost Breakdown */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Monthly Ownership Breakdown
        </h2>
        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px", marginBottom: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Principal & Interest</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>{formatCurrency(monthlyPI)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Property Tax ({PROPERTY_TAX_RATE}%)</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>{formatCurrency(monthlyPropertyTax)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Insurance</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>{formatCurrency(monthlyInsurance)}</div>
            </div>
            <div>
              <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Maintenance (1%)</div>
              <div style={{ fontSize: "18px", fontWeight: "700" }}>{formatCurrency(monthlyMaintenance)}</div>
            </div>
          </div>
          <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: "13px", color: "#6b7280", marginBottom: "4px" }}>Down Payment Required ({DOWN_PAYMENT_PCT}%)</div>
            <div style={{ fontSize: "18px", fontWeight: "700" }}>{formatCurrency(downPayment)}</div>
          </div>
        </div>

        {/* Year-by-Year Comparison */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Wealth Comparison Over Time
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Year</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Renter Wealth*</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Home Equity</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Winner</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Difference</th>
              </tr>
            </thead>
            <tbody>
              {yearComparison.map((y, i) => (
                <tr key={y.year} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>Year {y.year}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(y.rentWealth)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{formatCurrency(y.buyWealth)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center", borderBottom: "1px solid #e5e7eb", color: y.winner === "buy" ? "#16a34a" : "#2563eb", fontWeight: "600" }}>
                    {y.winner === "buy" ? "Buy" : "Rent"}
                  </td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: y.winner === "buy" ? "#16a34a" : "#2563eb" }}>
                    {formatCurrency(y.savings)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "8px" }}>
            * Renter wealth = down payment invested at {INVESTMENT_RETURN}% return. Home equity = home value ({HOME_APPRECIATION}% appreciation) minus remaining mortgage.
          </p>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Analysis: Renting at {formatCurrency(rent)} vs Buying at {formatPrice(price)}
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            {totalMonthlyOwning > rent * 1.5 ? (
              `At ${formatCurrency(totalMonthlyOwning)}/month, owning this ${formatPrice(price)} home costs significantly more than your ${formatCurrency(rent)}/month rent. However, a portion of each mortgage payment builds equity, and the home is expected to appreciate at ${HOME_APPRECIATION}%/year.`
            ) : totalMonthlyOwning > rent ? (
              `Owning this ${formatPrice(price)} home costs ${formatCurrency(totalMonthlyOwning)}/month â ${formatCurrency(totalMonthlyOwning - rent)} more than renting. The key question is whether equity building and home appreciation make up for the higher monthly costs over your expected holding period.`
            ) : (
              `At ${formatCurrency(totalMonthlyOwning)}/month, owning this ${formatPrice(price)} home is actually cheaper than your ${formatCurrency(rent)}/month rent while also building equity. This is a strong case for buying if you plan to stay for at least 5 years.`
            )}
          </p>
          <p>
            {breakEven ? (
              `Based on these assumptions, buying becomes the better financial move after about ${breakEven.year} years. If you plan to stay shorter than that, renting is more cost-effective. For a personalized analysis, use our mortgage calculator or explore other price points below.`
            ) : (
              `Under these assumptions, renting appears more financially advantageous over the full analysis period. This can change with different home prices, rent levels, or market assumptions.`
            )}
          </p>
        </div>

        {/* Other prices */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Compare Other Home Prices (at {formatCurrency(rent)}/mo rent)
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {HOME_PRICES.filter(p => p !== price).slice(0, 8).map((p) => (
            <a key={p} href={`/rent-vs-buy/rent-${rent}-vs-buy-${p}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              vs {formatPrice(p)}
            </a>
          ))}
        </div>

        {/* Other rents */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Compare Other Rent Levels (vs {formatPrice(price)} home)
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {RENTS.filter(r => r !== rent).slice(0, 8).map((r) => (
            <a key={r} href={`/rent-vs-buy/rent-${r}-vs-buy-${price}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {formatCurrency(r)}/mo
            </a>
          ))}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/mortgage-calculator", label: "Mortgage Calculator" },
              { href: "/tools/compound-interest-calculator", label: "Compound Interest" },
              { href: "/tools/fire-calculator", label: "FIRE Calculator" },
              { href: "/tools/investment-comparison", label: "Investment Comparison" },
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

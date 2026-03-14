import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AMOUNTS = [1000, 2500, 5000, 10000, 15000, 20000, 25000, 50000, 75000, 100000, 150000, 200000, 250000, 500000, 1000000];
const PERIODS = [1, 3, 5, 10, 15, 20, 25, 30];

const STRATEGIES = {
  "high-yield-savings": { name: "High-Yield Savings", rate: 4.5, risk: "None", description: "FDIC-insured savings accounts with competitive APY." },
  "bonds": { name: "US Treasury Bonds", rate: 4.25, risk: "Very Low", description: "Government-backed fixed-income securities." },
  "sp500": { name: "S&P 500 Index", rate: 10.0, risk: "Moderate", description: "Diversified index of 500 large US companies. Historical avg ~10%/year." },
  "total-market": { name: "Total Stock Market", rate: 9.5, risk: "Moderate", description: "Broad market index covering large, mid, and small-cap stocks." },
  "balanced": { name: "60/40 Portfolio", rate: 7.5, risk: "Low-Moderate", description: "Classic 60% stocks / 40% bonds allocation." },
  "aggressive": { name: "Aggressive Growth", rate: 11.0, risk: "High", description: "Growth-focused portfolio with small-caps and emerging markets." },
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatAmount(amount) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  return `$${amount}`;
}

function compoundGrowth(principal, annualRate, years) {
  return principal * Math.pow(1 + annualRate / 100, years);
}

export async function generateStaticParams() {
  const params = [];
  for (const amount of AMOUNTS) {
    for (const period of PERIODS) {
      params.push({ slug: `${amount}-over-${period}-years` });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const match = slug.match(/^(\d+)-over-(\d+)-years$/);
  if (!match) return {};
  const amount = parseInt(match[1]);
  const years = parseInt(match[2]);
  if (!AMOUNTS.includes(amount) || !PERIODS.includes(years)) return {};

  const sp500Result = compoundGrowth(amount, 10, years);
  return {
    title: `Invest ${formatAmount(amount)} for ${years} Years â Growth Projections | Pulsafi`,
    description: `See how ${formatAmount(amount)} grows over ${years} years across different strategies. In the S&P 500: ${formatCurrency(sp500Result)}. Compare savings, bonds, and stock market returns.`,
    openGraph: {
      title: `${formatAmount(amount)} Invested for ${years} Years`,
      description: `Investment growth projections for ${formatAmount(amount)} over ${years} years.`,
      url: `https://pulsafi.com/invest/${slug}`,
    },
  };
}

export default async function InvestPage({ params }) {
  const { slug } = await params;
  const match = slug.match(/^(\d+)-over-(\d+)-years$/);
  if (!match) notFound();
  const amount = parseInt(match[1]);
  const years = parseInt(match[2]);
  if (!AMOUNTS.includes(amount) || !PERIODS.includes(years)) notFound();

  const results = Object.entries(STRATEGIES).map(([key, strategy]) => {
    const finalValue = compoundGrowth(amount, strategy.rate, years);
    const totalReturn = finalValue - amount;
    const percentReturn = ((finalValue / amount) - 1) * 100;
    return { key, ...strategy, finalValue, totalReturn, percentReturn };
  }).sort((a, b) => b.finalValue - a.finalValue);

  // Year-by-year for S&P 500
  const yearlyGrowth = [];
  for (let y = 1; y <= years; y++) {
    yearlyGrowth.push({ year: y, value: compoundGrowth(amount, 10, y) });
  }

  const sp500 = results.find(r => r.key === "sp500");
  const savings = results.find(r => r.key === "high-yield-savings");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much will ${formatAmount(amount)} be worth in ${years} years?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${formatAmount(amount)} invested in the S&P 500 (avg 10%/year) would grow to approximately ${formatCurrency(sp500.finalValue)} in ${years} years â a gain of ${formatCurrency(sp500.totalReturn)}. In a high-yield savings account at 4.5%, it would be ${formatCurrency(savings.finalValue)}.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the best way to invest ${formatAmount(amount)}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The best investment for ${formatAmount(amount)} depends on your risk tolerance and timeline. For ${years} years, a diversified S&P 500 index fund historically returns ~10% annually. For lower risk, a 60/40 portfolio averages ~7.5%. For guaranteed returns, high-yield savings offer ~4.5%.`
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
          <a href="/invest" style={{ color: "#2563eb", textDecoration: "none" }}>Investment Growth</a>
          {" âº "}
          <span>{formatAmount(amount)} / {years} Years</span>
        </nav>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          How Much Will {formatAmount(amount)} Grow in {years} Years?
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          Investment growth projections for {formatCurrency(amount)} across savings accounts, bonds, index funds, and aggressive strategies over a {years}-year horizon.
        </p>

        {/* Quick Answer */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", opacity: 0.8, marginBottom: "8px" }}>S&P 500 Projection ({years} years at ~10%/yr)</div>
          <div style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>{formatCurrency(sp500.finalValue)}</div>
          <div style={{ fontSize: "16px", opacity: 0.9 }}>
            Starting: {formatCurrency(amount)} â Gain: {formatCurrency(sp500.totalReturn)} ({sp500.percentReturn.toFixed(0)}% total return)
          </div>
        </div>

        {/* Comparison Table */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Growth by Investment Strategy
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Strategy</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Avg Return</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Final Value</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Total Gain</th>
                <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Risk</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.key} style={{ background: r.key === "sp500" ? "#eff6ff" : i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{r.name}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{r.rate}%</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: "600" }}>{formatCurrency(r.finalValue)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#059669" }}>+{formatCurrency(r.totalReturn)}</td>
                  <td style={{ padding: "12px 16px", textAlign: "center", borderBottom: "1px solid #e5e7eb", fontSize: "13px" }}>{r.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Year by year (if not too many years) */}
        {years <= 30 && (
          <>
            <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
              Year-by-Year Growth (S&P 500)
            </h2>
            <div style={{ overflowX: "auto", marginBottom: "32px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Year</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Value</th>
                    <th style={{ padding: "8px 12px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Gain</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyGrowth.filter((_, i) => years <= 10 || i % Math.ceil(years / 10) === 0 || i === yearlyGrowth.length - 1).map((g, i) => (
                    <tr key={g.year} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                      <td style={{ padding: "8px 12px", borderBottom: "1px solid #e5e7eb" }}>Year {g.year}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{formatCurrency(g.value)}</td>
                      <td style={{ padding: "8px 12px", textAlign: "right", borderBottom: "1px solid #e5e7eb", color: "#059669" }}>+{formatCurrency(g.value - amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Understanding {formatAmount(amount)} Over {years} Years
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            The difference between investment strategies becomes dramatic over {years} years. While a high-yield savings account would grow your {formatCurrency(amount)} to {formatCurrency(savings.finalValue)} (a {formatCurrency(savings.totalReturn)} gain), the S&P 500 historically would turn it into {formatCurrency(sp500.finalValue)} â a difference of {formatCurrency(sp500.finalValue - savings.finalValue)}.
          </p>
          <p style={{ marginBottom: "16px" }}>
            This is the power of compound growth. The S&P 500{`'`}s higher average return of ~10% per year compounds exponentially, especially over longer time horizons. However, stocks come with short-term volatility â in any given year, returns can range from -30% to +30%.
          </p>
          <p>
            Use our{" "}
            <a href="/tools/compound-interest-calculator" style={{ color: "#2563eb", textDecoration: "underline" }}>compound interest calculator</a>{" "}
            for custom scenarios with monthly contributions, or our{" "}
            <a href="/tools/investment-comparison" style={{ color: "#2563eb", textDecoration: "underline" }}>investment comparison tool</a>{" "}
            to compare specific portfolios side by side.
          </p>
        </div>

        {/* Other amounts */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Other Investment Amounts ({years} Years)
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {AMOUNTS.filter(a => a !== amount).slice(0, 10).map((a) => (
            <a key={a} href={`/invest/${a}-over-${years}-years`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {formatAmount(a)}
            </a>
          ))}
        </div>

        {/* Other time periods */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          {formatAmount(amount)} â Other Time Periods
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {PERIODS.filter(p => p !== years).map((p) => (
            <a key={p} href={`/invest/${amount}-over-${p}-years`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {p} years
            </a>
          ))}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/compound-interest-calculator", label: "Compound Interest" },
              { href: "/tools/investment-comparison", label: "Investment Comparison" },
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

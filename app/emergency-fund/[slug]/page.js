import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MONTHLY_EXPENSES = [
  1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 12000, 15000
];
const MONTHS_COVERAGE = [3, 6, 9, 12];

const SITUATIONS = {
  "single-renter": { label: "Single Renter", recommended: 6, description: "Single person renting, moderate job stability" },
  "single-homeowner": { label: "Single Homeowner", recommended: 6, description: "Single person with a mortgage and home maintenance costs" },
  "family-dual-income": { label: "Family (Dual Income)", recommended: 3, description: "Two-income household, lower risk of total income loss" },
  "family-single-income": { label: "Family (Single Income)", recommended: 9, description: "One earner supporting family, higher income risk" },
  "self-employed": { label: "Self-Employed", recommended: 12, description: "Variable income, need larger cash buffer" },
  "freelancer": { label: "Freelancer/Contractor", recommended: 9, description: "Project-based income with gaps between contracts" },
};

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export async function generateStaticParams() {
  const params = [];
  for (const expense of MONTHLY_EXPENSES) {
    params.push({ slug: `${expense}-per-month` });
    for (const [situation] of Object.entries(SITUATIONS)) {
      params.push({ slug: `${expense}-${situation}` });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const monthMatch = slug.match(/^(\d+)-per-month$/);
  const situationMatch = slug.match(/^(\d+)-(.+)$/);

  let expense, situation;
  if (monthMatch) {
    expense = parseInt(monthMatch[1]);
    if (!MONTHLY_EXPENSES.includes(expense)) return {};
  } else if (situationMatch) {
    expense = parseInt(situationMatch[1]);
    const sitKey = situationMatch[2];
    if (!MONTHLY_EXPENSES.includes(expense) || !SITUATIONS[sitKey]) return {};
    situation = SITUATIONS[sitKey];
  } else {
    return {};
  }

  const target6mo = expense * 6;
  const title = situation
    ? `Emergency Fund for ${situation.label} (${formatCurrency(expense)}/mo expenses) | Pulsafi`
    : `Emergency Fund on ${formatCurrency(expense)}/Month Expenses â How Much Do You Need? | Pulsafi`;
  const desc = situation
    ? `As a ${situation.label.toLowerCase()} spending ${formatCurrency(expense)}/month, you need ${formatCurrency(expense * situation.recommended)} in emergency savings (${situation.recommended} months). See your savings plan.`
    : `Spending ${formatCurrency(expense)}/month? You need ${formatCurrency(expense * 3)}â${formatCurrency(expense * 12)} in emergency savings. See how long it takes to build at different savings rates.`;

  return { title, description: desc, openGraph: { title, description: desc, url: `https://pulsafi.com/emergency-fund/${slug}` } };
}

export default async function EmergencyFundPage({ params }) {
  const { slug } = await params;

  const monthMatch = slug.match(/^(\d+)-per-month$/);
  const situationMatch = slug.match(/^(\d+)-(.+)$/);

  let expense, sitKey = null, situation = null;
  if (monthMatch) {
    expense = parseInt(monthMatch[1]);
  } else if (situationMatch) {
    expense = parseInt(situationMatch[1]);
    sitKey = situationMatch[2];
    if (sitKey === "per-month") { sitKey = null; }
    else { situation = SITUATIONS[sitKey]; }
  }

  if (!expense || !MONTHLY_EXPENSES.includes(expense)) notFound();
  if (sitKey && !situation) notFound();

  const recommended = situation ? situation.recommended : 6;
  const targetAmount = expense * recommended;

  // How long to build at different saving rates
  const savingsRates = [200, 500, 750, 1000, 1500, 2000, 3000];
  const buildTimelines = savingsRates.map(monthly => ({
    monthly,
    months3: Math.ceil((expense * 3) / monthly),
    months6: Math.ceil((expense * 6) / monthly),
    months9: Math.ceil((expense * 9) / monthly),
    months12: Math.ceil((expense * 12) / monthly),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much emergency fund do I need with ${formatCurrency(expense)}/month expenses?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `With monthly expenses of ${formatCurrency(expense)}, financial experts recommend ${recommended} months of expenses â about ${formatCurrency(targetAmount)} â as your emergency fund target. The exact amount depends on your job stability, income sources, and family situation.`
        }
      },
      {
        "@type": "Question",
        "name": `How long does it take to save a ${formatCurrency(targetAmount)} emergency fund?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Saving $500/month, it would take about ${Math.ceil(targetAmount / 500)} months (${(targetAmount / 500 / 12).toFixed(1)} years). Saving $1,000/month, it takes ${Math.ceil(targetAmount / 1000)} months. Putting savings in a high-yield account can slightly accelerate this.`
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
          <a href="/emergency-fund" style={{ color: "#2563eb", textDecoration: "none" }}>Emergency Fund</a>
          {" âº "}
          <span>{formatCurrency(expense)}/mo{situation ? ` â ${situation.label}` : ""}</span>
        </nav>

        <h1 style={{ fontSize: "34px", fontWeight: "800", marginBottom: "8px", color: "#111827" }}>
          Emergency Fund{situation ? ` for ${situation.label}` : ""}: {formatCurrency(expense)}/Month Expenses
        </h1>
        <p style={{ fontSize: "18px", color: "#6b7280", marginBottom: "32px" }}>
          {situation ? situation.description + ". " : ""}How much you need in emergency savings and how long it takes to build, based on {formatCurrency(expense)}/month in essential expenses.
        </p>

        {/* Quick Answer */}
        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: "16px", padding: "32px", color: "white", marginBottom: "32px" }}>
          <div style={{ fontSize: "16px", opacity: 0.8, marginBottom: "8px" }}>Recommended Emergency Fund ({recommended} months)</div>
          <div style={{ fontSize: "42px", fontWeight: "800", marginBottom: "8px" }}>{formatCurrency(targetAmount)}</div>
          <div style={{ fontSize: "16px", opacity: 0.9 }}>
            {formatCurrency(expense)}/mo Ã {recommended} months = {formatCurrency(targetAmount)}
          </div>
        </div>

        {/* Coverage Levels */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Emergency Fund by Coverage Level
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {MONTHS_COVERAGE.map((m) => (
            <div key={m} style={{ background: m === recommended ? "#eff6ff" : "#f9fafb", borderRadius: "12px", padding: "16px", textAlign: "center", border: m === recommended ? "2px solid #2563eb" : "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "13px", color: m === recommended ? "#1d4ed8" : "#6b7280", marginBottom: "4px" }}>{m} Months</div>
              <div style={{ fontSize: "22px", fontWeight: "700", color: m === recommended ? "#1d4ed8" : "#111827" }}>{formatCurrency(expense * m)}</div>
              {m === recommended && <div style={{ fontSize: "11px", color: "#1d4ed8", marginTop: "4px" }}>Recommended</div>}
            </div>
          ))}
        </div>

        {/* Build Timeline */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          How Long to Build Your Emergency Fund
        </h2>
        <div style={{ overflowX: "auto", marginBottom: "32px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "15px" }}>
            <thead>
              <tr style={{ background: "#f3f4f6" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>Saving/Month</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>3 Months</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>6 Months</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>9 Months</th>
                <th style={{ padding: "12px 16px", textAlign: "right", fontWeight: "600", borderBottom: "2px solid #e5e7eb" }}>12 Months</th>
              </tr>
            </thead>
            <tbody>
              {buildTimelines.filter(t => t.monthly <= expense).map((t, i) => (
                <tr key={t.monthly} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", fontWeight: "500" }}>{formatCurrency(t.monthly)}/mo</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{t.months3} mo</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{t.months6} mo</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{t.months9} mo</td>
                  <td style={{ padding: "12px 16px", textAlign: "right", borderBottom: "1px solid #e5e7eb" }}>{t.months12} mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Content */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Why You Need {formatCurrency(targetAmount)} in Emergency Savings
        </h2>
        <div style={{ color: "#4b5563", lineHeight: "1.8", marginBottom: "32px" }}>
          <p style={{ marginBottom: "16px" }}>
            With {formatCurrency(expense)} in monthly expenses, {recommended} months of coverage gives you {formatCurrency(targetAmount)} â enough to handle job loss, medical emergencies, major car or home repairs, or unexpected family needs without relying on high-interest debt.
          </p>
          <p style={{ marginBottom: "16px" }}>
            Keep your emergency fund in a high-yield savings account (currently ~4.5% APY) for easy access while earning interest. At that rate, {formatCurrency(targetAmount)} earns about {formatCurrency(Math.round(targetAmount * 0.045 / 12))}/month in interest alone.
          </p>
          <p>
            Once your emergency fund is fully funded, redirect that savings toward investing. See our{" "}
            <a href="/tools/fire-calculator" style={{ color: "#2563eb", textDecoration: "underline" }}>FIRE calculator</a>{" "}
            or{" "}
            <a href="/tools/compound-interest-calculator" style={{ color: "#2563eb", textDecoration: "underline" }}>compound interest calculator</a>{" "}
            to plan your next steps.
          </p>
        </div>

        {/* Situations */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Personalize by Situation
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {Object.entries(SITUATIONS).filter(([k]) => k !== sitKey).map(([key, sit]) => (
            <a key={key} href={`/emergency-fund/${expense}-${key}`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {sit.label} ({sit.recommended} mo)
            </a>
          ))}
        </div>

        {/* Other expense levels */}
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px", color: "#111827" }}>
          Other Monthly Expense Levels
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
          {MONTHLY_EXPENSES.filter(e => e !== expense).slice(0, 10).map((e) => (
            <a key={e} href={`/emergency-fund/${e}-per-month`} style={{ padding: "8px 16px", background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "8px", color: "#2563eb", textDecoration: "none", fontSize: "14px" }}>
              {formatCurrency(e)}/mo
            </a>
          ))}
        </div>

        <div style={{ background: "#f9fafb", borderRadius: "12px", padding: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111827" }}>Related Tools</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {[
              { href: "/tools/salary-breakdown-calculator", label: "Salary Calculator" },
              { href: "/tools/fire-calculator", label: "FIRE Calculator" },
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

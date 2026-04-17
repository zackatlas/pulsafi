"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// ─── Formatters ───
const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
const pct = (n) => `${n.toFixed(1)}%`;

function Input({ label, value, onChange, prefix, suffix, sublabel }) {
  const [display, setDisplay] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const shown = focused ? display : String(value);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
        {sublabel && <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.6, marginLeft: 6, fontSize: 11 }}>{sublabel}</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)", padding: "10px 14px", gap: 6 }}>
        {prefix && <span style={{ color: "var(--accent)", fontFamily: "'Inter', monospace", fontSize: 15, fontWeight: 500 }}>{prefix}</span>}
        <input type="text" inputMode="decimal" value={shown}
          onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
          onChange={(e) => { const raw = e.target.value; if (raw === "" || raw === "-" || raw === ".") { setDisplay(raw); onChange(0); return; } const num = Number(raw); if (!isNaN(num)) { setDisplay(raw); onChange(num); } }}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 16, fontFamily: "'Inter', monospace", fontWeight: 500, width: "100%" }}
        />
        {suffix && <span style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{suffix}</span>}
      </div>
    </div>
  );
}

function ResultCard({ label, value, accent, sub }) {
  return (
    <div style={{
      background: accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
      borderRadius: 14, padding: "20px 22px", flex: 1, minWidth: 160,
      border: accent ? "none" : "1px solid var(--border-input)",
    }}>
      <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace", letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: accent ? "rgba(0,0,0,0.45)" : "var(--text-muted)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>}
    </div>
  );
}

export default function RentVsBuyPage() {
  // Rent inputs
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [rentIncrease, setRentIncrease] = useState(3);

  // Buy inputs
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1);
  const [homeInsurance, setHomeInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);
  const [maintenanceRate, setMaintenanceRate] = useState(1);
  const [homeAppreciation, setHomeAppreciation] = useState(3.5);
  const [investmentReturn, setInvestmentReturn] = useState(8);
  const [timeHorizon, setTimeHorizon] = useState(7);

  // ─── Calculations ───
  const downPayment = homePrice * (downPaymentPct / 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = mortgageRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPI = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = homeInsurance / 12;
  const monthlyMaintenance = (homePrice * (maintenanceRate / 100)) / 12;

  // Build year-by-year comparison
  const yearsArray = Array.from({ length: timeHorizon }, (_, i) => i + 1);
  const yearlyData = yearsArray.map(year => {
    // RENTING COSTS
    let rentCost = 0;
    for (let y = 1; y <= year; y++) {
      const yearlyRent = monthlyRent * 12 * Math.pow(1 + rentIncrease / 100, y - 1);
      rentCost += yearlyRent;
    }

    // BUYING COSTS & GAINS
    // Calculate remaining mortgage balance after X years
    let mortgageBalance = loanAmount;
    for (let m = 0; m < year * 12; m++) {
      const interestPayment = mortgageBalance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      mortgageBalance -= principalPayment;
    }
    mortgageBalance = Math.max(0, mortgageBalance);

    // Total principal paid down (equity gained from mortgage paydown)
    const equityFromPaydown = loanAmount - mortgageBalance;

    // Home appreciation
    const appreciatedValue = homePrice * Math.pow(1 + homeAppreciation / 100, year);
    const equityFromAppreciation = appreciatedValue - homePrice;

    // Total buying costs (cumulative)
    const monthlyPI_Plus = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + hoa;
    let buyingCost = 0;
    for (let m = 1; m <= year * 12; m++) {
      buyingCost += monthlyPI_Plus;
    }

    // Opportunity cost of down payment (what it would have earned if invested)
    const opportunityCost = downPayment * (Math.pow(1 + investmentReturn / 100, year) - 1);

    // Total net cost of buying = money spent - equity gained
    const totalBuyingOut = downPayment + buyingCost + opportunityCost;
    const totalEquityGained = equityFromPaydown + equityFromAppreciation;
    const netBuyingCost = totalBuyingOut - totalEquityGained;

    return {
      year,
      rentCost,
      totalBuyingOut,
      totalEquityGained,
      netBuyingCost,
      appreciatedValue,
      mortgageBalance,
    };
  });

  const finalYear = yearlyData[yearlyData.length - 1];
  const rentCost10Y = finalYear.rentCost;
  const netBuyingCost10Y = finalYear.netBuyingCost;
  const difference = rentCost10Y - netBuyingCost10Y; // positive = buying is cheaper

  // Find breakeven year
  let breakevenYear = null;
  for (const data of yearlyData) {
    if (netBuyingCost10Y < rentCost10Y) {
      breakevenYear = data.year;
      break;
    }
  }

  // Verdict
  const verdict = difference > 0
    ? `Buying is cheaper by ${fmt(Math.abs(difference))}`
    : `Renting is cheaper by ${fmt(Math.abs(difference))}`;

  // ─── Render ───
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Pulsafi Rent vs Buy Calculator",
        "url": "https://www.pulsafi.com/tools/rent-vs-buy-calculator",
        "description": "Compare the true cost of renting vs buying a home with detailed financial analysis.",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />

      <Header />

      {/* Hero */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Rent vs Buy Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Compare the true cost of renting vs buying a home over time. Accounts for appreciation, opportunity cost, taxes, maintenance, and more.
        </p>
      </section>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "28px 24px 60px" }}>

        {/* Calculator Card */}
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px 28px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

          {/* Renting Section */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 4, height: 20, background: "#3498db", borderRadius: 2 }} />
              Renting Assumptions
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Monthly Rent" value={monthlyRent} onChange={setMonthlyRent} prefix="$" />
              <Input label="Annual Rent Increase" value={rentIncrease} onChange={setRentIncrease} suffix="%" />
            </div>
          </div>

          {/* Buying Section */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 4, height: 20, background: "#2ecc71", borderRadius: 2 }} />
              Buying Assumptions
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Input label="Home Purchase Price" value={homePrice} onChange={setHomePrice} prefix="$" />
              <Input label="Down Payment" value={downPaymentPct} onChange={setDownPaymentPct} suffix="%" />
              <Input label="Mortgage Interest Rate" value={mortgageRate} onChange={setMortgageRate} suffix="%" />
              <Input label="Loan Term" value={loanTerm} onChange={setLoanTerm} suffix="years" />
              <Input label="Annual Property Tax Rate" value={propertyTaxRate} onChange={setPropertyTaxRate} suffix="%" />
              <Input label="Annual Home Insurance" value={homeInsurance} onChange={setHomeInsurance} prefix="$" />
              <Input label="Monthly HOA Fees" value={hoa} onChange={setHoa} prefix="$" />
              <Input label="Annual Maintenance Rate" value={maintenanceRate} onChange={setMaintenanceRate} suffix="%" sublabel="of home value" />
              <Input label="Annual Home Appreciation" value={homeAppreciation} onChange={setHomeAppreciation} suffix="%" />
              <Input label="Investment Return Rate" value={investmentReturn} onChange={setInvestmentReturn} suffix="%" sublabel="opportunity cost" />
            </div>
          </div>

          {/* Time Horizon */}
          <div style={{ marginBottom: 28, paddingBottom: 28, borderBottom: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Time Horizon</div>
            <Input label="Years to Compare" value={timeHorizon} onChange={setTimeHorizon} suffix="years" />
          </div>

          {/* Results */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <ResultCard label="Total Cost: Renting" value={fmt(rentCost10Y)} />
            <ResultCard label="Net Cost: Buying" value={fmt(netBuyingCost10Y)} />
            <ResultCard label="Verdict" value={difference > 0 ? "Buy" : "Rent"} accent={difference > 0} sub={verdict} />
          </div>

          {/* Additional metrics */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 12 }}>
            <ResultCard label="Home Appreciation" value={fmt(finalYear.appreciatedValue - homePrice)} sub={`to ${fmt(finalYear.appreciatedValue)}`} />
            <ResultCard label="Mortgage Balance Remaining" value={fmt(finalYear.mortgageBalance)} sub={`after ${timeHorizon} years`} />
            <ResultCard label="Total Equity Gained" value={fmt(finalYear.totalEquityGained)} sub="through paydown + appreciation" />
          </div>

          {/* Chart: Year-by-year comparison */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 16 }}>Cumulative Cost Comparison</div>
            <div style={{ overflowX: "auto" }}>
              <div style={{ display: "flex", gap: 8, minWidth: "100%", alignItems: "flex-end", height: 180 }}>
                {yearlyData.map((data, i) => {
                  const maxCost = Math.max(...yearlyData.map(d => Math.max(d.rentCost, d.netBuyingCost)));
                  const rentHeight = (data.rentCost / maxCost) * 100;
                  const buyHeight = (data.netBuyingCost / maxCost) * 100;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
                      {/* Rent bar */}
                      <div style={{ width: "100%", display: "flex", flexDirection: "column-reverse", height: 160, justifyContent: "flex-end" }}>
                        <div style={{
                          width: "48%",
                          height: `${rentHeight}%`,
                          background: "#3498db",
                          borderRadius: "2px 2px 0 0",
                          minHeight: 2,
                          marginLeft: "2%",
                        }} />
                        <div style={{
                          width: "48%",
                          height: `${buyHeight}%`,
                          background: "#2ecc71",
                          borderRadius: "2px 2px 0 0",
                          minHeight: 2,
                          marginLeft: "2%",
                          marginTop: 2,
                        }} />
                      </div>
                      <div style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 600, marginTop: 4 }}>Y{data.year}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 16, fontSize: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, background: "#3498db", borderRadius: 2 }} />
                <span>Renting Cost</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 12, height: 12, background: "#2ecc71", borderRadius: 2 }} />
                <span>Buying Cost (Net)</span>
              </div>
            </div>
          </div>

          {/* Monthly Breakdown for Buying */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Monthly Costs: Buying</div>
            {[
              { label: "Principal & Interest", value: monthlyPI, color: "#2ecc71" },
              { label: "Property Tax", value: monthlyPropertyTax, color: "#3498db" },
              { label: "Insurance", value: monthlyInsurance, color: "#e67e22" },
              { label: "Maintenance", value: monthlyMaintenance, color: "#9b59b6" },
              ...(hoa > 0 ? [{ label: "HOA Fees", value: hoa, color: "#f39c12" }] : []),
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{fmtD(item.value)}</div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border-card)" }}>
              <div style={{ fontWeight: 600, flex: 1, fontSize: 13, color: "var(--text-primary)" }}>Total Monthly (Buying)</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{fmtD(monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyMaintenance + hoa)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
              <div style={{ fontWeight: 600, flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>Monthly Rent (Year 1)</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{fmtD(monthlyRent)}</div>
            </div>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
            Rent vs Buy: The Complete Financial Analysis
          </h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>
              The decision to rent or buy is one of the biggest financial choices you'll make. This calculator helps you compare the true cost of each option by accounting for factors that simple online calculators often miss: home appreciation, the opportunity cost of your down payment, maintenance expenses, and how rents increase over time.
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>What makes this calculator different?</h3>
            <p style={{ marginBottom: 16 }}>
              Most rent vs buy comparisons only look at your monthly payment. This calculator includes the wealth-building side of buying: equity gained through mortgage paydown, home appreciation, and the opportunity cost of having your down payment tied up in real estate instead of invested in the stock market. It also accounts for maintenance costs, property taxes, and annual rent increases.
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>When does buying become cheaper than renting?</h3>
            <p style={{ marginBottom: 16 }}>
              In many markets, you need to stay in a home for 5-7 years before buying becomes financially superior to renting. Before that point, the transaction costs (down payment, closing costs, and maintenance) outweigh the savings. However, if you're planning to stay long-term and home prices are appreciating, buying can be significantly cheaper and builds equity instead of paying a landlord.
            </p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Should I include opportunity cost?</h3>
            <p style={{ marginBottom: 16 }}>
              Yes. Your down payment is money that could be invested in the stock market or bonds. By including a realistic investment return rate (historically 8-10% for stocks), you see the true financial cost of locking that capital into real estate. This is why a larger down payment sometimes looks worse in a rent vs buy analysis—but it can reduce your monthly payment.
            </p>
          </div>

          {/* Related Tools */}
          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related Calculators</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
                { name: "Net Worth", href: "/", icon: "💰" },
                { name: "Investment Return", href: "/", icon: "📈" },
                { name: "Debt Payoff", href: "/", icon: "💳" },
              ].map((tool, i) => (
                <a key={i} href={tool.href} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                  background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)",
                  textDecoration: "none", color: "var(--text-secondary)", fontSize: 13, transition: "border-color 0.2s",
                }}
                  onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                  onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-input)"}
                >
                  <span>{tool.icon}</span> {tool.name}
                </a>
              ))}
            </div>
          </div>

          {/* Read More */}
          <div style={{ marginTop: 20, padding: "20px 24px", background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>📚 Related Reading</div>
            <a href="/learn/rent-vs-buy-2026" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
              The Complete Rent vs Buy Financial Analysis →
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}

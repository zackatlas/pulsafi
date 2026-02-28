import ArticleLayout from "../ArticleLayout";
export default function Article() {
  return (
    <ArticleLayout title="How Much House Can You Actually Afford?" category="Real Estate" date="Feb 7, 2026" readTime="9 min">
      <h2>What the Bank Says vs. Reality</h2>
      <p>Mortgage lenders will approve you for far more than you should spend. A bank might say you qualify for a $500K mortgage. That doesn't mean buying a $500K house is smart. <strong>Lenders care about getting repaid. They don't care if you eat ramen for 30 years.</strong></p>
      <h2>The 28/36 Rule</h2>
      <p>The traditional guideline: spend no more than <strong>28% of gross income on housing costs</strong> (mortgage, taxes, insurance) and no more than <strong>36% on total debt</strong> (housing + car + student loans + credit cards).</p>
      <div className="data-point"><div className="number">28%</div><div className="label">Max housing cost as % of gross income</div></div>
      <p>On a $100K household income, that's roughly $2,333/month for your total housing payment — including property taxes, homeowner's insurance, and PMI if applicable.</p>
      <h2>The Real Costs People Forget</h2>
      <p><strong>PITI is just the start.</strong> Your mortgage payment includes Principal, Interest, Taxes, and Insurance. But homeownership also means: maintenance (budget 1-2% of home value annually), repairs, HOA fees, utilities that are higher than your apartment, furniture, landscaping, and the opportunity cost of your down payment.</p>
      <div className="callout"><strong>Hidden cost:</strong> A $400K home costs roughly $8,000/year in maintenance and repairs on average. That's $667/month on top of your mortgage payment.</div>
      <h2>Rent vs. Buy: The Honest Math</h2>
      <p>Buying isn't always better than renting. In high-cost cities, renting and investing the difference often wins. The key factors: how long you'll stay (less than 5 years usually favors renting), local rent-to-price ratios, and your opportunity cost of the down payment.</p>
      <a href="/tools/mortgage-calculator" className="tool-link">🏠 Try Our Mortgage Calculator →</a>
    </ArticleLayout>
  );
}

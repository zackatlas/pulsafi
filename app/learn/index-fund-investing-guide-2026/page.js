import ArticleLayout from '../ArticleLayout';

export default function IndexFundInvestingPage() {
  return (
    <ArticleLayout
      title="Index Fund Investing Guide 2026: Beginners Guide to Index Funds"
      date="March 19, 2026"
      readTime="13 min read"
    >
      <section style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Index fund investing is one of the most powerful and proven wealth-building strategies available. Despite its simplicity, most people overcomplicate investing: picking individual stocks, chasing hot sectors, or paying expensive financial advisors who underperform the market.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Warren Buffett, one of the world&rsquo;s greatest investors, recommends that the average person invest in low-cost index funds. This guide shows you exactly how to do it, starting with as little as $100 and building serious wealth through compound growth.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          You&rsquo;ll learn what index funds are, how they work, which ones to choose, and a step-by-step plan to start investing today.
        </p>
      </section>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        What Are Index Funds?
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        An index fund is a simple concept: instead of paying someone to pick individual stocks, you own a collection of stocks that track a market index. The fund aims to replicate the performance of that index as closely as possible.
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Simple Example: S&P 500 Index Fund
        </h3>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          The S&P 500 tracks 500 large American companies: Apple, Microsoft, Amazon, Tesla, etc. When you buy an S&P 500 index fund, you own a tiny piece of all 500 companies.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          If Apple is 7% of the index, your fund holds 7% in Apple. If Microsoft is 6%, you hold 6% in Microsoft. The index fund rebalances automatically to match these weightings.
        </p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Why Index Funds Are Brilliant
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--accent-bg)', borderBottom: '2px solid var(--border-card)' }}>
            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Advantage</th>
            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Why It Matters</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Low fees (0.03-0.20% annually)</td>
            <td style={{ padding: '1rem' }}>Expensive active funds (1-2% annually) cost thousands over decades compared to index funds</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Instant diversification</td>
            <td style={{ padding: '1rem' }}>One fund = exposure to 500-3,500 companies. One bad stock doesn&rsquo;t crush you</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Simple and passive</td>
            <td style={{ padding: '1rem' }}>You can&rsquo;t beat the market, so just own the market. No timing. No emotion</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Historically strong returns</td>
            <td style={{ padding: '1rem' }}>S&P 500 averages ~10% annual returns over 70+ years, even through recessions</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem' }}>Tax efficient</td>
            <td style={{ padding: '1rem' }}>Passive funds generate fewer taxable events than active trading. Save money on taxes</td>
          </tr>
        </tbody>
      </table>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        How Index Funds Work
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        The mechanics are straightforward but powerful. When you invest in an index fund, several things happen:
      </p>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 1: You Buy Shares
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          You purchase shares of the index fund (not individual stocks). If you buy 100 shares of an S&P 500 index fund, you own a claim on the fund&rsquo;s holdings.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 2: Fund Manager Buys Stocks
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          The fund uses your money (plus money from thousands of other investors) to buy all 500 S&P companies in the exact weightings of the index.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 3: You Own the Results
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          When companies in the index grow, pay dividends, or expand, your fund&rsquo;s value grows. You benefit from all the growth without picking individual stocks.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 4: Index Rebalances Automatically
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Quarterly, the fund adjusts holdings to match the index. Apple grows too large? It gets trimmed. New companies enter the index? They get added. This happens automatically without your involvement.
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Types of Index Funds
      </h2>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        S&P 500 Index Funds
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        The most popular choice. Tracks 500 large American companies. Average 10% annual returns historically. Low risk because exposure is diversified across large, established companies. Good for beginners because it&rsquo;s simple and proven.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Popular S&P 500 funds: Vanguard VOO (0.03% expense ratio), Fidelity FXAIX (0.015% expense ratio), Schwab SWPPX (0.02% expense ratio).
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Total Stock Market Index Funds
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Broader than S&P 500. Includes ~3,500 American companies: large, mid-cap, and small-cap. More diversification. Slightly more volatile but also potential for higher returns. Many experts prefer this for long-term growth.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Popular total market funds: Vanguard VTI (0.03% expense ratio), Fidelity FSKAX (0.015% expense ratio), Schwab SWTSX (0.03% expense ratio).
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        International Index Funds
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Tracks companies outside the USA: Europe, Asia, emerging markets. Adds geographic diversification. Some portfolios use 70% US + 30% international. Currency risk is a consideration.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Popular international funds: Vanguard VXUS (0.08% expense ratio), Fidelity FSKAX (0.015% expense ratio).
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Target Date Funds
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Automatically adjusts your asset allocation as you age. Young? More stocks. Approaching retirement? Shifts toward bonds. All in one fund. Convenient but slightly higher fees. Good for hands-off investors.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Understanding Expense Ratios
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Expense ratio is the annual fee charged to own the fund. It matters more than you think because of compound effects over decades.
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          How Expense Ratio Costs Compound
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          <tr style={{ borderBottom: '1px solid var(--accent-dark)' }}>
            <td style={{ padding: '0.75rem' }}>Investment amount</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>$100,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--accent-dark)' }}>
            <td style={{ padding: '0.75rem' }}>Time period</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>30 years</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--accent-dark)' }}>
            <td style={{ padding: '0.75rem' }}>Annual returns</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>10% (before fees)</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Final value with 0.03% fee (index fund)</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>$1,750,000</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Final value with 1.0% fee (typical active fund)</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>$1,340,000</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', color: 'var(--accent)', fontWeight: 'bold' }}>Difference (cost of fees)</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--accent)', fontWeight: 'bold' }}>$410,000</td>
          </tr>
        </table>
      </div>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        That&rsquo;s $410,000 difference from a 0.97% difference in expense ratio. Over 30 years, fees are the single biggest drag on investment returns.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Best Expense Ratios (2026)
      </h3>
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Excellent:</strong> Under 0.10% (Vanguard, Fidelity, Schwab index funds)
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Good:</strong> 0.10% - 0.25%
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Acceptable:</strong> 0.25% - 0.50%
        </li>
        <li>
          <strong>Avoid:</strong> Over 0.50% for plain index funds (you can find cheaper alternatives)
        </li>
      </ul>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Focus on expense ratio when choosing between index funds. A difference of 0.05% seems tiny but costs thousands over decades.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Dollar Cost Averaging
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Dollar cost averaging (DCA) is a powerful strategy: invest the same amount at regular intervals (monthly, weekly, or bi-weekly) regardless of market price. This removes timing risk and emotion from investing.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Why Dollar Cost Averaging Works
      </h3>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <strong>You buy more shares when price is low, fewer when price is high.</strong> This automatically locks in lower average costs.
        </p>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <strong>You remove timing pressure.</strong> You don&rsquo;t have to perfectly time the market. You just keep investing regularly.
        </p>
        <p style={{ marginBottom: '0', color: 'var(--text-secondary)' }}>
          <strong>You avoid emotional decisions.</strong> Watching a $5,000 investment drop to $4,000 is painful. DCA means you don&rsquo;t notice day-to-day volatility.
        </p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Example: Starting with $100/Month
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--accent-bg)', borderBottom: '2px solid var(--border-card)' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Month</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Investment</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Share Price</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Shares Bought</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Total Shares</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '0.75rem' }}>Month 1</td>
            <td style={{ padding: '0.75rem' }}>$100</td>
            <td style={{ padding: '0.75rem' }}>$50</td>
            <td style={{ padding: '0.75rem' }}>2.0</td>
            <td style={{ padding: '0.75rem' }}>2.0</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '0.75rem' }}>Month 2</td>
            <td style={{ padding: '0.75rem' }}>$100</td>
            <td style={{ padding: '0.75rem' }}>$45</td>
            <td style={{ padding: '0.75rem' }}>2.22</td>
            <td style={{ padding: '0.75rem' }}>4.22</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '0.75rem' }}>Month 3</td>
            <td style={{ padding: '0.75rem' }}>$100</td>
            <td style={{ padding: '0.75rem' }}>$55</td>
            <td style={{ padding: '0.75rem' }}>1.82</td>
            <td style={{ padding: '0.75rem' }}>6.04</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>Average cost per share</td>
            <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>-</td>
            <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>(300 / 6.04 shares = $49.67)</td>
            <td style={{ padding: '0.75rem' }}></td>
            <td style={{ padding: '0.75rem' }}></td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Notice: Your average cost is $49.67, lower than any individual month. You bought more shares when cheap (month 2) and fewer when expensive (month 3). This is the power of DCA.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Tax-Advantaged Accounts for Index Investing
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Investing in index funds inside tax-advantaged accounts amplifies returns. You pay less in taxes, which compounds dramatically over time.
      </p>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          401(k) or 403(b) (Employer Plans)
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Priority: Highest.</strong> If your employer offers a 401(k) with matching, contribute enough to get the match. That&rsquo;s free money (typically 3-6% of salary). Max contribution: $24,500 in 2026 ($30,500 if 50+).
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Inside the plan:</strong> Look for index fund options (S&P 500, total market, target date). Avoid high-expense funds or frequent trading.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Roth IRA
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Priority: Very High.</strong> Contribute $7,500 in 2026 ($8,500 if 50+). You pay taxes now, but all growth is tax-free forever. Incredible for long-term wealth building.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Inside the account:</strong> Invest entirely in index funds. You have full control and can choose lowest-cost options like Vanguard or Fidelity.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Traditional IRA
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Priority: High.</strong> Same $7,500 contribution limit. You get a tax deduction now (if you qualify), but pay taxes on withdrawals in retirement.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Roth vs. Traditional:</strong> Roth if you expect higher taxes in retirement. Traditional if you expect lower taxes.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Taxable Brokerage Account
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Priority: After tax-advantaged accounts are maxed.</strong> No contribution limits. You pay taxes on dividends and capital gains, but still index funds make sense due to low turnover and fees.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Advantage:</strong> No withdrawal restrictions. Money is always available if you need it.
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Common Index Fund Mistakes to Avoid
      </h2>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Mistake 1: Timing the Market
        </h3>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Waiting for a &ldquo;crash&rdquo; to invest is one of the biggest mistakes. Missing the best 10 days in the market over 20 years cuts your returns nearly in half. Dollar cost averaging eliminates this problem. Invest consistently regardless of market price.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Mistake 2: Overtrading or Checking Too Frequently
        </h3>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Check your portfolio once or twice a year maximum. Checking daily or weekly tempts you to panic-sell during downturns. Index investing is boring. Boring is good. Boring compounds into wealth.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Mistake 3: Chasing Hot Sectors or Individual Stocks
        </h3>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          After a strong tech run, everyone buys tech funds. After a real estate boom, everyone buys REITs. You&rsquo;re buying high. Index funds automatically keep diversification balanced and rebalance when sectors get expensive. Trust the process.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Mistake 4: Using High-Expense Funds
        </h3>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Some index funds charge 0.5% - 1.5%. There&rsquo;s no reason to pay this. Vanguard, Fidelity, and Schwab offer index funds under 0.10%. Switch if you find yourself in high-cost funds.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.2rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Mistake 5: Panic Selling During Market Downturns
        </h3>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Market crashes happen every 7-10 years. Your portfolio will drop 20-40% temporarily. If you panic sell, you lock in losses. The S&P 500 has recovered from every crash. Stay the course.
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        How to Start Investing with $100
      </h2>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Step 1: Choose Your Brokerage
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Open an account with a reputable broker offering low-cost index funds:
      </p>
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Vanguard:</strong> Industry leader, legendary low costs, excellent index fund selection
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Fidelity:</strong> Excellent service, lowest expense ratios on many index funds, great customer support
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Schwab:</strong> Easy interface, very low costs, modern platform, great for beginners
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>M1 Finance:</strong> Robo-advisor that builds portfolios of index funds, very beginner-friendly
        </li>
      </ul>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', margintop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Step 2: Fund Your Account
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Link your bank account and deposit $100. Takes 5 minutes. Most brokers accept transfers immediately or within 1 business day.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Step 3: Choose Your Index Fund
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        For beginners, I recommend one of these simple portfolios:
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Super Simple (All-In-One)
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Buy 100% total stock market index fund (VTI, FSKAX, or SWTSX). Done. Let it grow for 30 years. This is the Warren Buffett recommendation.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Slightly More Diversified
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          70% US Total Market (FSKAX) + 30% International (FSKAX). Adds geographic diversification. Still simple, two funds.
        </p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Step 4: Buy Shares
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Click &ldquo;Buy,&rdquo; enter $100, select your fund, and click confirm. You&rsquo;ve just bought index funds. Congratulations, you&rsquo;re an investor.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Step 5: Set Up Automatic Investing
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        This is key. Set up automatic transfers: $100/month, $200/month, whatever you can afford. This dollar cost averaging is the secret weapon. You automate wealth building.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Step 6: Ignore the Market
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Seriously. Don&rsquo;t check daily. Don&rsquo;t panic when it drops 10%. You&rsquo;re investing for 30+ years. Short-term volatility is noise. Check once or twice a year to make sure automatic investing is working.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Projecting Your Wealth
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Here&rsquo;s the power of index fund investing over time. Assuming 10% annual returns (historical S&P 500 average):
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--accent-bg)', borderBottom: '2px solid var(--border-card)' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>Monthly Investment</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>10 Years</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>20 Years</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-primary)' }}>30 Years</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '0.75rem' }}>$100/month</td>
            <td style={{ padding: '0.75rem' }}>$20,500</td>
            <td style={{ padding: '0.75rem' }}>$63,900</td>
            <td style={{ padding: '0.75rem' }}>$227,930</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '0.75rem' }}>$500/month</td>
            <td style={{ padding: '0.75rem' }}>$102,500</td>
            <td style={{ padding: '0.75rem' }}>$319,500</td>
            <td style={{ padding: '0.75rem' }}>$1,139,650</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '0.75rem' }}>$1,000/month</td>
            <td style={{ padding: '0.75rem' }}>$205,000</td>
            <td style={{ padding: '0.75rem' }}>$639,000</td>
            <td style={{ padding: '0.75rem' }}>$2,279,300</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem' }}>$2,000/month</td>
            <td style={{ padding: '0.75rem' }}>$410,000</td>
            <td style={{ padding: '0.75rem' }}>$1,278,000</td>
            <td style={{ padding: '0.75rem' }}>$4,558,600</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Notice the growth acceleration. Year 10 looks modest. Year 20 is impressive. Year 30 is life-changing. This is compound interest. Small amounts invested early grow into serious wealth because you have decades of compound growth working for you.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: '&ldquo;Playfair Display&rdquo;, serif', marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        The Bottom Line
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Index fund investing is the most proven way to build wealth for regular people. It requires zero stock-picking skill, minimal effort, and historically delivers 10% annual returns through market cycles.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Start with $100. Set up automatic investing. Choose a simple index fund. Ignore the market noise. Let compound interest do the heavy lifting for 30 years.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        The best time to start investing in index funds was 30 years ago. The second best time is today. Stop researching and start investing.
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <p style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
          Related Articles
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: 0, color: 'var(--accent)' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/learn/how-does-the-stock-market-work" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              How Does the Stock Market Work
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/learn/roth-conversion-ladder-strategy-2026" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Roth Conversion Ladder Strategy 2026
            </a>
          </li>
          <li>
            <a href="/learn/compound-interest-explained" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Compound Interest Explained
            </a>
          </li>
        </ul>
      </div>
    </ArticleLayout>
  );
}

import ArticleLayout from "../ArticleLayout";

export default function Article() {
  return (
    <ArticleLayout
      title="First-Time Homebuyer Guide 2026: Programs, Tips, and Step-by-Step Process"
      category="Real Estate"
      readTime="14 min read"
      date="Mar 19, 2026"
    >
      <div style={{ width: '100%', maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Introduction</h2>
          <p>
            Buying your first home is one of the most significant financial decisions you'll make. This comprehensive guide walks you through every step of the process, from determining how much house you can afford to closing day. Whether you're exploring down payment assistance, understanding loan types, or learning about first-time buyer programs, we've covered everything you need to know.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>The 12-Month First-Time Homebuyer Timeline</h2>
          <p>
            Following a structured timeline helps you stay organized and prepared. Here's a month-by-month breakdown:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', margin: '2rem 0' }}>
            <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>Months 12-10: Preparation</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Check your credit score and address any issues</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Save for down payment and closing costs</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Pay down existing debt to improve debt-to-income ratio</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Review your finances and create a budget</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Research first-time buyer programs in your area</li>
              </ul>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>Months 9-7: Getting Ready</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Get pre-approved for a mortgage</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Interview and select a real estate agent</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Identify neighborhoods and price ranges</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Start reviewing available properties</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Gather required financial documents</li>
              </ul>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>Months 6-4: Active Search</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Tour homes in your target areas</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Get pre-approval finalized</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Shop with multiple lenders for best rates</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Identify your first choice property</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Review comparable sales in the area</li>
              </ul>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>Months 3-2: Making an Offer</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Submit purchase offer on selected property</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Negotiate terms and price with seller</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Schedule home inspection</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Attend inspection and review findings</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Order property appraisal</li>
              </ul>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>Month 1: Closing Preparation</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Complete title search and purchase title insurance</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Finalize mortgage terms and lock interest rate</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Conduct final walk-through inspection</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Review Closing Disclosure document</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Arrange final funds transfer</li>
              </ul>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', borderLeft: '4px solid var(--accent-primary)', padding: '1.5rem', borderRadius: '4px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>Closing Day</h3>
              <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Sign all final closing documents</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Pay closing costs and down payment</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Receive keys to your new home</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Record deed and finalize ownership</li>
                <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Set up utilities and homeowner's insurance</li>
              </ul>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>How Much House Can You Afford?</h2>
          <p>
            Determining your budget requires understanding both your financial capacity and lender requirements. Use the 28/36 rule as your primary guide:
          </p>

          <div style={{ backgroundColor: 'var(--accent-bg)', border: '1px solid var(--accent-primary)', borderRadius: '6px', padding: '1.5rem', margin: '1.5rem 0' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: 0, marginBottom: '1rem', color: 'var(--accent-primary)' }}>The 28/36 Rule</h3>
            <ul style={{ marginLeft: '1.5rem', marginBottom: 0 }}>
              <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>28% Rule:</strong> Your housing costs (mortgage, property taxes, insurance, HOA) should not exceed 28% of your gross monthly income</li>
              <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>36% Rule:</strong> Your total debt payments (housing + car loans, credit cards, student loans) should not exceed 36% of gross monthly income</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Example Calculation</h3>
          <p>
            If your gross monthly income is $5,000:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Maximum housing payment (28%): $1,400/month</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Maximum total debt (36%): $1,800/month</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>This translates to a home price of approximately $280,000-$350,000 (depending on rates and loan type)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Debt-to-Income Ratio (DTI)</h3>
          <p>
            Lenders examine your DTI closely. A lower DTI ratio strengthens your application:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Excellent DTI: Below 20%</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Good DTI: 20-28%</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Acceptable DTI: 28-36% (upper limit for most conventional loans)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>High DTI: Above 36% (may require compensating factors)</li>
          </ul>

          <p>
            Use our <a href="/tools/mortgage-calculator">mortgage calculator</a> to calculate exactly what you can afford based on your specific income, debts, and interest rate assumptions.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Down Payment Options for First-Time Buyers</h2>
          <p>
            You have more options than you might think. Compare the down payment requirements across different loan types:
          </p>

          <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-primary)' }}>
              <thead style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Loan Type</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Down Payment</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Best For</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Key Consideration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Conventional</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>3-20%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Good credit and stable income</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>PMI required below 20% down</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>FHA Loan</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>3.5%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Lower credit scores, minimal savings</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Mortgage insurance (MIP) always required</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>VA Loan</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>0%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Military members and veterans</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>VA funding fee applies</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>USDA Loan</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>0%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Rural properties, moderate income</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Property location restrictions apply</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Conventional Loans (3-20% Down)</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Most flexible and widely available</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Lower mortgage insurance costs than FHA</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Can be removed once you reach 20% equity</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Requires better credit (usually 620+ minimum, 740+ preferred)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>FHA Loans (3.5% Down)</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Federally-insured loans for first-time buyers</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Flexible credit requirements (580+ acceptable)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Mortgage Insurance Premium (MIP) is permanent on loans with less than 10% down</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>MIP terminates after 11 years if you put down 10% or more</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>VA Loans (0% Down)</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Available to active-duty, veterans, and eligible spouses</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>No down payment or PMI required</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Generally lower interest rates than conventional</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>VA funding fee (0.5-2.3%) required upfront</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>USDA Loans (0% Down)</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>For properties in designated rural areas</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Income limits apply (typically 115% of area median income)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Includes USDA guarantee fee (1% annually)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Flexible credit and employment requirements</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>First-Time Homebuyer Programs & Assistance</h2>
          <p>
            Federal, state, and local programs exist to help first-time buyers. Explore these options in your area:
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>FHA Loans</h3>
          <p>
            The Federal Housing Administration insures mortgages, allowing lenders to offer favorable terms. FHA loans require only 3.5% down and accept credit scores as low as 580. However, they mandate mortgage insurance premiums (MIP) throughout the loan term (if down payment is less than 10%).
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>State & Local Down Payment Assistance</h3>
          <p>
            Most states and many municipalities offer down payment assistance programs. These may be:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Grants (no repayment needed)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Deferred loans (repaid when you sell)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Forgivable loans (forgiven after specified timeframe)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Low-interest second mortgages</li>
          </ul>
          <p>
            Check with your state housing finance agency and local government for available programs. Many have income limits and target underserved communities.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Good Neighbor Next Door</h3>
          <p>
            This HUD program provides 50% discounts on foreclosed homes to federal employees, teachers, law enforcement, and firefighters in revitalization areas. Participants agree to live in the home for 36 months and complete repairs.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Fannie Mae HomeReady & Freddie Mac HomePossible</h3>
          <p>
            These affordable lending programs offer:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Down payments as low as 3%</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Flexible credit requirements (620+ score)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Lower PMI costs than FHA</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Consideration of non-traditional credit (rent, utility payments)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Support for compensating factors (larger down payment, reserves)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Federal Employee Health Benefits (FEHB) & Other Employer Programs</h3>
          <p>
            Some employers offer down payment assistance, matched savings programs, or preferential lending terms. Check with your HR department.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Non-Profit & Community-Based Programs</h3>
          <p>
            Local non-profits often provide:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Down payment assistance grants</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Homebuying education and counseling</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Credit repair and financial coaching</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Connection to below-market-rate properties</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Loan Types Comparison</h2>
          <p>
            Here's a detailed comparison of the primary loan types available to first-time buyers:
          </p>

          <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-primary)' }}>
              <thead style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Feature</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Conventional</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>FHA</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>VA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Down Payment</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>3-20%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>3.5%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>0%</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Min. Credit Score</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>620+ (740+ preferred)</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>580+</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>620+</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Interest Rate</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Market rate (varies)</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Typically 0.25-0.50% higher</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Often 0.25-0.50% lower</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>PMI/Insurance</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>PMI (removable at 20% equity)</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>MIP (permanent if {'<'}10% down)</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>VA funding fee upfront</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Typical PMI Cost</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>0.55-1.86% annually</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>0.45-0.80% annually (MIP)</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>0.5-2.3% (one-time fee)</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Max. DTI</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>36-43%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>43-50%</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>41-50%</td>
                </tr>
                <tr>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Property Restrictions</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>None</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Must be primary residence</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Must be primary residence</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Appraisal Required</strong></td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Yes</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Yes (stricter standards)</td>
                  <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Yes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>When to Choose Each Loan Type</h3>

          <p><strong>Conventional:</strong> Choose this if you have good credit (740+), stable income, can afford a higher down payment (10%+), and want to minimize long-term insurance costs.</p>

          <p><strong>FHA:</strong> Best if you have limited savings, moderate credit (580-620), or want maximum flexibility in debt-to-income ratios. Accept paying mortgage insurance throughout the loan.</p>

          <p><strong>VA:</strong> The superior choice for veterans and active-duty military. Zero down payment and favorable rates often outweigh the upfront VA funding fee.</p>

          <p><strong>USDA:</strong> Excellent for rural properties if you qualify by income and property location. Zero down payment makes this attractive for qualifying borrowers.</p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>The True Cost of Buying: Beyond the Down Payment</h2>
          <p>
            First-time buyers often underestimate total out-of-pocket costs. Beyond your down payment, budget for:
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Closing Costs (2-5% of Purchase Price)</h3>
          <p>
            For a $300,000 home, closing costs typically range from $6,000 to $15,000:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Origination fee: 0.5-1.5% of loan amount</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Title search and title insurance: $500-$1,500</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Property survey: $200-$600</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Attorney fees: $500-$2,000 (varies by state)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Recording and transfer fees: $100-$500</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Homeowner's insurance (first year, prepaid): $800-$2,000</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Property taxes (prepaid, varies): $500-$2,000</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>HOA transfer fees (if applicable): $0-$500</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Pre-Purchase Costs</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Home inspection: $300-$500</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Appraisal: $400-$600</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Credit report: $15-$50</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Property survey: $200-$600 (not always required)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Move-In Costs</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Moving services: $1,500-$5,000+ depending on distance</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Furniture and home improvements: variable</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Utility setup and deposits: $200-$800</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Immediate Post-Purchase Costs</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Necessary repairs and inspections: $1,000-$10,000+</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Maintenance fund (set aside 1% of home value annually): variable</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Property taxes (annual): varies by location</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Homeowner's insurance (annual): $800-$3,000</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>HOA fees (monthly, if applicable): $100-$1,000+</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Budget Example: $300,000 Home Purchase</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'var(--bg-primary)' }}>
            <thead style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}>
              <tr>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Cost Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, border: '1px solid var(--border-card)' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Down Payment (10%)</td>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>$30,000</td>
              </tr>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Closing Costs (3.5%)</td>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>$10,500</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Inspection & Appraisal</td>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>$1,000</td>
              </tr>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Moving</td>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>$3,000</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>Immediate Repairs</td>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}>$3,000</td>
              </tr>
              <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>Total Upfront Cash</strong></td>
                <td style={{ padding: '1rem', border: '1px solid var(--border-card)', color: 'var(--text-primary)' }}><strong>$47,500</strong></td>
              </tr>
            </tbody>
          </table>

          <p style={{ marginTop: '1rem' }}>
            Beyond these upfront costs, budget monthly for property taxes, insurance, HOA fees, and maintenance reserves.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Pre-Approval vs. Pre-Qualification</h2>
          <p>
            Understanding the difference between these two terms is critical to your homebuying success:
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Pre-Qualification</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Process:</strong> Informal assessment based on self-reported information</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Time Required:</strong> 5-10 minutes, often completed online or over the phone</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Documents Needed:</strong> None</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Verification:</strong> Your word; no document verification</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Weight with Sellers:</strong> None. Sellers don't take pre-qualifications seriously</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> Free</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Accuracy:</strong> Often optimistic; may overstate your borrowing capacity</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Pre-Approval</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Process:</strong> Formal underwriting based on verified financial documents</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Time Required:</strong> 2-3 business days to 1 week</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Documents Needed:</strong> Pay stubs, tax returns, bank statements, employment verification, credit authorization</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Verification:</strong> Lender verifies all information directly with your employer and financial institutions</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Weight with Sellers:</strong> Significant. Shows you're a serious, financially qualified buyer</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> Free (though some lenders charge $200-$500 for appraisals)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Accuracy:</strong> Realistic assessment of your borrowing capacity and approved loan amount</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Timeline Recommendation</h3>
          <p>
            Start with pre-qualification to explore your options (takes minutes). Once you're ready to search seriously, get pre-approved (takes 1 week). Only start touring homes after pre-approval is in hand. When you find a home and want to make an offer, you'll have documentation to show sellers you're a qualified buyer.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Common First-Time Buyer Mistakes to Avoid</h2>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>1. Skipping the Home Inspection</h3>
          <p>
            Never skip a professional home inspection to save $300-$500. Inspections reveal foundation cracks, roof issues, plumbing problems, electrical hazards, and other major defects. Hidden problems can cost $5,000-$50,000+ to repair. A thorough inspection gives you leverage to negotiate repairs or a lower purchase price.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>2. Waiving Contingencies</h3>
          <p>
            In competitive markets, buyers sometimes waive inspection or appraisal contingencies to make offers more attractive. This is risky. Always maintain:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Inspection contingency (allows renegotiation if major issues found)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Appraisal contingency (protects your down payment if value doesn't support loan amount)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Financing contingency (safeguards if mortgage approval falls through)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>3. Not Shopping Multiple Lenders</h3>
          <p>
            Different lenders offer different rates, fees, and terms. Comparing at least 3-5 lenders could save you $5,000-$15,000+ over the life of your loan. Use <a href="#">rate shopping tools</a> to compare APR (Annual Percentage Rate, which includes fees and interest) from multiple lenders.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>4. Emotional Bidding Wars</h3>
          <p>
            It's easy to fall in love with a home and overbid. Stay disciplined:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Set a maximum offer price before viewing homes</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Don't exceed your pre-approved loan amount</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Remember: there will be other homes</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Consider value, not just emotional appeal</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>5. Making Large Purchases or Opening Credit Before Closing</h3>
          <p>
            Lenders review your credit and finances again days before closing. Major purchases (cars, furniture) or opening new credit cards can:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Lower your credit score</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Increase your debt-to-income ratio</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Trigger loan withdrawal or re-approval</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Put your deal at risk</li>
          </ul>
          <p>
            Avoid any major financial transactions between pre-approval and closing day.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>6. Ignoring the Final Walk-Through</h3>
          <p>
            Days before closing, conduct a final walk-through to verify:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>All agreed-upon repairs were completed</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Promised appliances/fixtures are included</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Property condition hasn't deteriorated</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>No unauthorized changes have been made</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>7. Failing to Review Your Closing Disclosure</h3>
          <p>
            Your Closing Disclosure shows all final loan terms, rates, and fees. Review it carefully 3+ days before closing:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Verify interest rate matches locked rate</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Check all fees for accuracy and surprise charges</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Confirm loan amount and terms</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Question anything that doesn't match your pre-approval</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>8. Inadequate Emergency Fund</h3>
          <p>
            Homeownership requires unexpected expenses. After closing, maintain:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>3-6 months of mortgage payments in reserve</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Additional funds for major home repairs (roof, HVAC, foundation)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Avoid spending all savings on down payment and closing costs</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Building Your Homebuying Team</h2>
          <p>
            Successful home purchases require a skilled team supporting you. Here's who you need and what to expect:
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Real Estate Agent</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Guides home search, writes offers, negotiates terms, coordinates closing</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Ask friends/family for referrals, interview 2-3 agents, verify experience with first-time buyers</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> How many first-time buyers have you helped? Will you explain every step? Are you available for my schedule?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> Free (paid by seller through commission, typically 5-6% of sale price)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Mortgage Lender/Loan Officer</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Pre-approves your loan, locks interest rate, guides closing process</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Compare rates on multiple lending websites, ask your bank, check credit unions</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> What's your APR? What fees are included? Can you lock the rate? How long does pre-approval take?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> Varies; origination fees (0.5-1.5%) and discount points typical</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Home Inspector</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Thoroughly examines home for defects, structural issues, system failures</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Ask your real estate agent for referrals, check reviews on professional sites</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> What's your experience? Will you walk me through findings? Can I ask questions during inspection?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> $300-$500 (typically paid before inspection)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Real Estate Attorney (State-Dependent)</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Reviews contracts, handles title issues, coordinates closing in many states</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Ask your real estate agent or lender for referrals, check state bar association</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> What's included in your closing fee? Will you review the purchase agreement? Are there any add-on costs?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> Varies; $500-$2,000 (required in some states, optional in others)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Title Company/Closing Agent</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Conducts title search, manages closing documents, records deed</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Typically ordered by your lender or attorney</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> What's included in your title insurance? Are there any title issues?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> $500-$1,500 (often split between buyer and seller)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Home Appraiser</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Determines home value to ensure loan doesn't exceed property worth</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Ordered by your lender</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> When will the appraisal be completed? What if it comes in low?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> $400-$600 (usually required by lender, buyer pays)</li>
          </ul>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>Insurance Agent</h3>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Role:</strong> Secures homeowner's insurance required by lender</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>How to Find:</strong> Get quotes from multiple insurers, compare coverage and premiums</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Key Questions:</strong> What's covered? What are deductibles? Can I lower premiums?</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Cost:</strong> $800-$3,000 annually (varies by home value, location, coverage)</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Understanding PMI (Private Mortgage Insurance)</h2>
          <p>
            Private Mortgage Insurance protects the lender if you default on your loan. It's one of the largest costs first-time buyers face.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>When is PMI Required?</h3>
          <p>
            PMI is required on conventional loans when you put down less than 20%. It's not required on FHA, VA, or USDA loans (which have their own mortgage insurance).
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>How Much Does PMI Cost?</h3>
          <p>
            PMI typically costs 0.55% to 1.86% annually of your loan amount, depending on:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Your down payment percentage</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Your credit score</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Your loan-to-value (LTV) ratio</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Lender and specific loan program</li>
          </ul>

          <p>
            Example: On a $270,000 loan with 3% down, PMI might cost $2,000-$4,000 annually ($167-$333 monthly).
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>How to Remove PMI</h3>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem' }}>Option 1: Automatic Removal (78% LTV)</h4>
          <p>
            Federal law requires PMI removal when your loan balance reaches 78% of the original home value. This happens through regular monthly payments over time.
          </p>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem' }}>Option 2: Request Removal (80% LTV)</h4>
          <p>
            Once you've built 20% equity (80% LTV), you can request PMI removal if:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>You've made on-time payments for at least 2 years</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Your loan is not in default</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Property has not declined in value</li>
          </ul>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem' }}>Option 3: Refinance</h4>
          <p>
            If your home appreciates or you pay down principal, you might be able to refinance when LTV drops below 80%, eliminating PMI. Compare refinance closing costs against PMI savings.
          </p>

          <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem' }}>Option 4: Pay Down the Principal</h4>
          <p>
            Accelerate equity build through extra principal payments. This helps you reach 20% equity faster and removes PMI sooner.
          </p>

          <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginTop: '1.8rem', marginBottom: '1rem', color: 'var(--heading-secondary)' }}>PMI on FHA Loans</h3>
          <p>
            FHA loans carry Mortgage Insurance Premium (MIP) instead of PMI:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Upfront MIP: 1.75% of loan amount (usually rolled into loan)</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Annual MIP: 0.45% to 0.80% of loan amount</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}>Duration: Annual MIP is permanent on loans with {'<'}10% down; terminates after 11 years with 10%+ down</li>
          </ul>

          <p>
            FHA insurance is more expensive long-term than conventional PMI, particularly if you plan to own the home 10+ years. However, FHA's lower down payment requirement (3.5%) and more flexible credit requirements make it attractive for some buyers.
          </p>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Key Takeaways</h2>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Plan Ahead:</strong> Follow a 12-month timeline to stay organized and prepared</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Know Your Budget:</strong> Use the 28/36 rule and calculate your DTI to determine affordability</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Explore Programs:</strong> Research FHA loans, down payment assistance, and first-time buyer programs in your area</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Shop Lenders:</strong> Compare at least 3-5 lenders to secure the best rate and terms</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Get Pre-Approved:</strong> Obtain formal pre-approval before seriously shopping for homes</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Don't Skip Inspections:</strong> Invest in professional inspection to identify major defects</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Understand All Costs:</strong> Budget for closing costs, inspections, appraisals, and move-in expenses</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Build Your Team:</strong> Assemble a qualified agent, lender, inspector, and attorney</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Avoid Common Mistakes:</strong> Skip the emotional decisions and stay disciplined throughout the process</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><strong>Manage PMI:</strong> Understand insurance costs and plan to remove it when possible</li>
          </ul>
        </section>

        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--heading-primary)', borderBottom: '3px solid var(--accent-primary)', paddingBottom: '0.5rem' }}>Related Resources</h2>
          <p>
            Continue your homebuying education with these additional Pulsafi resources:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><a href="/tools/mortgage-calculator">mortgage calculator</a> - Calculate monthly payments and total interest</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><a href="/tools/rent-vs-buy-calculator">rent-vs-buy-calculator</a> - Compare renting vs. buying for your situation</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><a href="/learn/how-to-save-for-a-house-2026">how-to-save-for-a-house-2026</a> - Strategic down payment savings plans</li>
            <li style={{ marginBottom: '0.6rem', lineHeight: 1.6 }}><a href="/learn/how-much-house-can-you-afford">how-much-house-can-you-afford</a> - Detailed affordability analysis</li>
          </ul>
        </section>
      </div>
    </ArticleLayout>
  );
}

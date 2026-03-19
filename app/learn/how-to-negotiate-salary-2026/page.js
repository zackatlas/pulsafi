import ArticleLayout from '../ArticleLayout';

export default function SalaryNegotiationPage() {
  return (
    <ArticleLayout
      title="How to Negotiate Salary in 2026: Complete Guide"
      date="March 19, 2026"
      readTime="14 min read"
    >
      <section style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Your salary is the single largest financial decision in your career. The difference between negotiating effectively and accepting the first offer can mean $300,000 to $1,000,000 over your lifetime. Yet most people never negotiate, leaving substantial money on the table.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Salary negotiation isn&rsquo;t confrontational. It&rsquo;s a professional conversation where both parties discuss value. Companies expect it. In 2026, with competition for talent fierce and living costs rising, negotiating your salary is non-negotiable.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          This guide walks you through everything: research, timing, conversation scripts, counter-offers, and advanced tactics that get results.
        </p>
      </section>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Phase 1: Research Your Market Value
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        You can&rsquo;t negotiate effectively without data. Spend time understanding what your position actually pays in your market. This is your foundation.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Use These Resources to Research Salaries
      </h3>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Glassdoor
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Shows salary ranges for specific job titles at specific companies. Filter by location, company size, and experience level. Read reviews to understand culture and pay practices.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Levels.fyi
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Specifically for tech roles. Shows salary, bonus, and equity for thousands of companies. Gold standard for software engineer compensation.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Payscale
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Covers most industries. Shows salary ranges and median pay. Filter by location, company, and years of experience for accuracy.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Bureau of Labor Statistics
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Official government data on average wages by job, location, and education. Less specific but authoritative baseline data.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Blind / TeamBlind
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Anonymous salary discussions from employees. Unfiltered data but verify with multiple sources since posts can be biased.
        </p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Calculate Your Target Salary
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        After researching, create a range:
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <strong>Floor (Minimum):</strong> The lowest you&rsquo;d accept. Usually 10-15% above your current salary or the market 25th percentile.
        </p>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <strong>Target (Your Ask):</strong> Where you actually want to land. Usually market median or 75th percentile. Start high here because you&rsquo;ll negotiate down.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Ceiling (Stretch):</strong> The reach goal. Market 90th percentile or higher. You probably won&rsquo;t get this, but it anchors the negotiation higher.
        </p>
      </div>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        <strong>Example:</strong> Software engineer in San Francisco researching market. Glassdoor shows $140k-$180k range. Levels.fyi shows $160k-$200k for similar experience. Your ask: $180k. Your floor: $160k. Your ceiling: $210k.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Phase 2: Timing Your Negotiation
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Timing dramatically affects outcomes. Negotiate when you have leverage.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Best Times to Negotiate
      </h3>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          During Job Offer (Best Time)
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          This is when you have maximum leverage. The company wants you, they&rsquo;ve invested time and recruiting costs. A slightly higher offer is cheap compared to replacing you.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Action:</strong> Don&rsquo;t accept immediately. Always negotiate job offers, even small amounts.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          During Annual Review
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Your company is already thinking about compensation. Prepare in advance: document accomplishments, show impact, provide market data.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Action:</strong> Schedule the conversation ahead of time. Come prepared with a 1-2 page summary of your contributions.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          After Completing Major Projects
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          You just delivered measurable value. Your manager sees impact. Strike while it&rsquo;s visible.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Action:</strong> Ask for a brief meeting a few days after wrapping the project.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          After Getting Promoted
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Moving to a higher level means market-based salary adjustment. Don&rsquo;t assume the company&rsquo;s initial offer matches your new market value.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          <strong>Action:</strong> Research the new role&rsquo;s market range. Present data showing you should earn more.
        </p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Bad Times to Negotiate
      </h3>
      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>During company layoffs:</strong> Wait for stability
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>During your probation period:</strong> Prove yourself first
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>When company is struggling financially:</strong> Wait for recovery
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Right before or after your boss left:</strong> Wait for new manager stability
        </li>
        <li>
          <strong>During your first month:</strong> Build relationships first
        </li>
      </ul>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Phase 3: The Negotiation Conversation
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Most people fail at negotiation because they don&rsquo;t know what to say. Here&rsquo;s a script that works.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        The Setup (Before the Conversation)
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Schedule the conversation intentionally. Don&rsquo;t ambush your manager or HR. Send an email:
      </p>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)', fontFamily: "'Courier New', monospace", fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
        <p style={{ marginTop: 0, marginBottom: '1rem' }}>
          Hi [Manager],
        </p>
        <p style={{ marginBottom: '1rem' }}>
          I&rsquo;d like to schedule a brief meeting to discuss compensation. I&rsquo;ve really enjoyed contributing to the team and want to align my salary with my market value and contributions. Would you have 20 minutes this week?
        </p>
        <p style={{ marginBottom: 0 }}>
          Thanks,
          <br />
          [Your Name]
        </p>
      </div>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        This email shows professionalism and gives your manager time to prepare mentally. Never blindside them.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        The Conversation Script
      </h3>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 1: Express Enthusiasm
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          &ldquo;I&rsquo;ve really enjoyed the past [timeframe] working with the team. I&rsquo;ve learned a lot and contributed to [specific projects]. I&rsquo;d love to continue growing here.&rdquo;
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 2: Explain Your Ask
        </h4>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          &ldquo;I&rsquo;ve researched market rates for my position in [location] with my experience level. Based on [Glassdoor/Levels.fyi/data], the range is [low-high]. I believe my contributions merit a salary of $[your ask].&rdquo;
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Key: Use data. &ldquo;I deserve more&rdquo; doesn&rsquo;t work. &ldquo;Market data shows...&rdquo; works.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Step 3: Stop Talking
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          This is critical. After you make your request, STOP. Don&rsquo;t ramble, don&rsquo;t negotiate with yourself, don&rsquo;t lower your ask out of nervousness. Wait for their response. Silence is powerful.
        </p>
      </div>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        How They&rsquo;ll Likely Respond
      </h3>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Response: &ldquo;That&rsquo;s more than we budgeted&rdquo;
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Your response:</strong> &ldquo;I understand budget constraints. What is the highest you&rsquo;re able to offer given the budget? And can we schedule a follow-up review in 6 months if I continue performing at this level?&rdquo;
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          This softens rejection while securing a future negotiation date.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Response: &ldquo;Let me think about it&rdquo;
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Your response:</strong> &ldquo;Great. When would be a good time to follow up? I&rsquo;m flexible and want to find a solution that works for both of us.&rdquo;
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Get a specific timeline. Don&rsquo;t let it drag indefinitely.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Response: &ldquo;We can do $X&rdquo; (Lower than your ask)
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Your response:</strong> &ldquo;I appreciate the offer. That&rsquo;s closer, but given the market data, would you be able to move to $[counter with $5k less than original ask]?&rdquo;
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Counter one more time. Most negotiations require 2-3 rounds.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Response: &ldquo;Yes&rdquo;
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          <strong>Your response:</strong> &ldquo;Thank you. That&rsquo;s great. I&rsquo;m excited to continue. Can you send the updated offer in writing?&rdquo;
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Always get it in writing. Verbal agreements disappear when HR gets involved.
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Counter-Offer Strategies
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        When your first ask gets rejected, you have options beyond accepting less money.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        If Salary Won&rsquo;t Move: Negotiate Other Elements
      </h3>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        <thead>
          <tr style={{ backgroundColor: 'var(--accent-bg)', borderBottom: '2px solid var(--border-card)' }}>
            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Negotiation Option</th>
            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Annual Monetary Value</th>
            <th style={{ padding: '1rem', textAlign: 'left', color: 'var(--text-primary)' }}>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Extra vacation days</td>
            <td style={{ padding: '1rem' }}>$3,000-$8,000</td>
            <td style={{ padding: '1rem' }}>+5 days (1 week extra)</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Remote work flexibility</td>
            <td style={{ padding: '1rem' }}>$3,000-$7,000</td>
            <td style={{ padding: '1rem' }}>3 days remote, office 2 days</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Professional development budget</td>
            <td style={{ padding: '1rem' }}>$1,500-$5,000</td>
            <td style={{ padding: '1rem' }}>$3,000/year for courses, conferences</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Sign-on bonus</td>
            <td style={{ padding: '1rem' }}>$5,000-$25,000</td>
            <td style={{ padding: '1rem' }}>$10,000 upfront in your first check</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Earlier salary review</td>
            <td style={{ padding: '1rem' }}>Potential $5,000-$15,000</td>
            <td style={{ padding: '1rem' }}>6-month review instead of 12-month</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-card)' }}>
            <td style={{ padding: '1rem' }}>Flexible hours</td>
            <td style={{ padding: '1rem' }}>$2,000-$5,000</td>
            <td style={{ padding: '1rem' }}>Core hours 10am-3pm, you choose rest</td>
          </tr>
          <tr>
            <td style={{ padding: '1rem' }}>Parking/commute allowance</td>
            <td style={{ padding: '1rem' }}>$2,000-$4,000</td>
            <td style={{ padding: '1rem' }}>$200/month parking reimbursement</td>
          </tr>
        </tbody>
      </table>

      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        These aren&rsquo;t consolation prizes. They have real financial value. A $5,000 professional development budget equals a raise if you invest in skills that increase your market value.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Negotiating Benefits and Equity
      </h2>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Bonus Structure
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        If the company offers 10% annual bonus, negotiate it. Ask: &ldquo;Is the 10% based on individual or company performance? What would I need to do to earn a higher bonus?&rdquo; Request 15% if you performed well historically. Some companies will move here easily.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Stock Options and Equity
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        For startup/scale-up jobs, equity is substantial. Calculate its value:
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <strong>Equity Math:</strong> (Number of shares × Current valuation per share) = Current value
        </p>
        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
          <strong>Example:</strong> 0.5% of a company valued at $50M = $250,000 potential equity. But 4-year vesting means actual annual benefit: $62,500/year if company succeeds.
        </p>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Negotiate percentage, not just shares. &ldquo;I want 0.5% of the company&rdquo; is clearer than &ldquo;50,000 shares.&rdquo;
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Remote Work and Flexible Negotiation
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        In 2026, remote work flexibility is a major compensation component. Don&rsquo;t let it slide:
      </p>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Get It in Writing
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          Don&rsquo;t accept &ldquo;we&rsquo;ll work something out.&rdquo; Specify: full-time remote, hybrid (days on-site), or permanent WFH with quarterly in-person meetings.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Equipment and Setup
        </h4>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)' }}>
          Negotiate company-provided equipment: laptop, monitor, keyboard, chair. Also: home office stipend ($500-$2,000) and internet reimbursement ($50-$100/month).
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid var(--border-card)' }}>
        <h4 style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Travel and In-Person Days
        </h4>
        <p style={{ marginBottom: 0, color: 'var(--text-secondary)' }}>
          If office days required, clarify: how many per month, company-paid travel costs, and flexibility for unexpected conflicts.
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Advanced Negotiation Tactics
      </h2>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Tactic 1: The Anchoring Effect
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Always propose your number first. The first number mentioned becomes the anchor that influences all subsequent negotiation. If you say $180k, even if you negotiate down to $165k, the company thinks they won. If the company says $140k first, you&rsquo;re negotiating up from there.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Tactic 2: Never Disclose Your Current Salary
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Your current salary shouldn&rsquo;t determine your new salary. Market value does. When asked about your current salary:
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        &ldquo;I&rsquo;d prefer to focus on market value for this role rather than my previous salary. Based on the role, location, and my experience, I&rsquo;m looking for $X.&rdquo;
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Tactic 3: The Leverage Conversation
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        If your company won&rsquo;t move on salary, mention external opportunities subtly: &ldquo;I&rsquo;ve had other offers that are higher, but I prefer working here. Can we find a way to match the market?&rdquo; This shows you have options without being confrontational.
      </p>

      <h3 style={{ fontSize: '1.3rem', fontFamily: "'Playfair Display', serif", marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Tactic 4: The Deadline
      </h3>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        When negotiating with multiple offers, use deadlines: &ldquo;The other company needs an answer by Friday. When can we finalize this discussion?&rdquo; This accelerates slow-moving companies.
      </p>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        When to Walk Away
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Sometimes the answer is no. Walk away if:
      </p>

      <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>They won&rsquo;t move from an insulting offer</strong> after negotiation. This signals how they value you.
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>They punish negotiation.</strong> If they withdraw an offer because you negotiated, you dodged a bullet. That&rsquo;s a red flag employer.
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>The salary is significantly below market</strong> and they won&rsquo;t adjust. You&rsquo;ll be frustrated and underpaid.
        </li>
        <li style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          <strong>Ongoing issues surface during negotiation</strong> (hostility, unwillingness to communicate, vague about role). Trust your gut.
        </li>
        <li>
          <strong>You get a better offer elsewhere.</strong> There&rsquo;s no prize for loyalty at negotiation. Take the better deal.
        </li>
      </ul>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent)' }}>
        <p style={{ marginTop: 0, marginBottom: 0, color: 'var(--text-secondary)' }}>
          Remember: You have more power than you think. Companies invest time and money recruiting. They&rsquo;ve chosen you. Use that leverage professionally.
        </p>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        Your Action Plan
      </h2>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '2rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--accent)' }}>
        <ol style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', marginBottom: 0 }}>
          <li style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
            <strong>Research your market value:</strong> Spend 30 minutes on Glassdoor, Levels.fyi, and Payscale
          </li>
          <li style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
            <strong>Set your range:</strong> Define floor, target, and ceiling salary
          </li>
          <li style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
            <strong>Schedule the conversation:</strong> Email your manager requesting a 20-minute meeting
          </li>
          <li style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
            <strong>Practice your script:</strong> Rehearse the conversation out loud until it feels natural
          </li>
          <li style={{ marginBottom: '0rem', lineHeight: '1.8' }}>
            <strong>Execute and document:</strong> Have the conversation, then email confirming discussed terms
          </li>
        </ol>
      </div>

      <h2 style={{ fontSize: '2rem', fontFamily: "'Playfair Display', serif", marginTop: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
        The Bottom Line
      </h2>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        Salary negotiation is one conversation that can add hundreds of thousands of dollars to your lifetime earnings. The cost of NOT negotiating is enormous. The risk of negotiating is minimal&mdash;most companies respect the ask and engage professionally.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
        In 2026, with competitive job markets and rising living costs, every percentage point of salary matters. Negotiate every offer. Use data. Stay professional. And always get offers in writing.
      </p>
      <p style={{ fontSize: '1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        Your salary is not a gift. It&rsquo;s a business transaction. Negotiate accordingly.
      </p>

      <div style={{ backgroundColor: 'var(--accent-bg)', padding: '1.5rem', borderRadius: '0.5rem', marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <p style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>
          Related Articles
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: 0, color: 'var(--accent)' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/salary-breakdown-calculator" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Salary Breakdown Calculator
            </a>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <a href="/learn/best-side-hustles-to-make-money" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Best Side Hustles to Make Money in 2026
            </a>
          </li>
          <li>
            <a href="/debt-to-income" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Debt-to-Income Ratio Calculator
            </a>
          </li>
        </ul>
      </div>
    </ArticleLayout>
  );
}

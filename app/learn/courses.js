// ═══════════════════════════════════════════════════════
// PULSAFI ACADEMY — COURSE DATA
// 15 courses · 45 lessons · 225 questions
// ═══════════════════════════════════════════════════════

const COURSES = [

  // ─────────────────────────────────
  // 1. BUDGETING & SPENDING
  // ─────────────────────────────────
  {
    id: "budgeting",
    title: "Budgeting & Spending",
    icon: "🎯",
    color: "#2ecc71",
    desc: "Master your money flow",
    lessons: [
      {
        title: "The 50/30/20 Rule",
        questions: [
          { q: "The 50/30/20 rule says ___% of your income should go to needs.", type: "fill", answer: "50", accept: ["50", "50%", "fifty"], explain: "50% for needs (rent, food, insurance), 30% for wants, 20% for savings/debt payoff." },
          { q: "Which of these is a 'need' vs a 'want'?", type: "choice", options: ["Netflix subscription", "Grocery bill", "Concert tickets", "New sneakers"], answer: 1, explain: "Groceries are a need. Netflix, concerts, and sneakers are wants — even if they feel like needs!" },
          { q: "True or False: The 50/30/20 rule works perfectly for everyone regardless of income.", type: "tf", answer: false, explain: "It's a starting point, not gospel. In high-cost cities, needs might take 60-70%. Adjust to your reality." },
          { q: "Under the 50/30/20 rule, someone earning $5,000/month should save at least:", type: "choice", options: ["$500", "$750", "$1,000", "$1,500"], answer: 2, explain: "$5,000 × 20% = $1,000 toward savings and debt repayment each month." },
          { q: "True or False: Minimum debt payments count as 'needs' in the 50/30/20 rule.", type: "tf", answer: true, explain: "Minimum payments are needs (you must pay them). Extra payments above the minimum go into the 20% savings/debt category." },
        ],
      },
      {
        title: "Tracking Your Spending",
        questions: [
          { q: "The average American underestimates their monthly spending by about:", type: "choice", options: ["5%", "10%", "20-30%", "50%"], answer: 2, explain: "Studies show people underestimate spending by 20-30%. Small purchases — coffee, subscriptions, takeout — add up invisibly." },
          { q: "True or False: You should track every single purchase for at least one month to understand your spending.", type: "tf", answer: true, explain: "One month of complete tracking reveals your real spending patterns. Many people are shocked by what they find." },
          { q: "A 'spending leak' is:", type: "choice", options: ["A bank error", "Small recurring costs you forget about", "A budget surplus", "A tax refund"], answer: 1, explain: "Spending leaks are forgotten subscriptions, daily habits, and small charges that silently drain your money." },
          { q: "If you spend $6 on coffee every workday, that's roughly $___ per year.", type: "choice", options: ["$720", "$1,080", "$1,560", "$2,160"], answer: 2, explain: "$6 × 5 days × 52 weeks = $1,560/year. That's not a reason to never buy coffee — just know the real cost." },
          { q: "The most important category to track first is usually:", type: "choice", options: ["Entertainment", "Food and dining", "Clothing", "Gifts"], answer: 1, explain: "Food/dining is the #1 category where people overspend vs expectations. It's also the easiest to adjust." },
        ],
      },
      {
        title: "Building a Monthly Budget",
        questions: [
          { q: "Zero-based budgeting means every dollar has a ___.", type: "fill", answer: "job", accept: ["job", "purpose", "plan", "assignment"], explain: "Income minus all expenses (including savings) equals zero. Every dollar gets assigned before the month starts." },
          { q: "True or False: Your budget should be the same every single month.", type: "tf", answer: false, explain: "Life changes month to month. Holiday spending, annual insurance, car registration — adjust your budget for what's coming." },
          { q: "The 'envelope method' of budgeting uses:", type: "choice", options: ["Digital spreadsheets only", "Cash in physical envelopes per category", "Credit cards for tracking", "Bank statements"], answer: 1, explain: "Each category gets cash in an envelope. When it's empty, you stop spending in that category. Forces discipline." },
          { q: "What should you budget for FIRST before anything else?", type: "choice", options: ["Entertainment", "Savings", "Housing and essentials", "Subscriptions"], answer: 2, explain: "Pay your Four Walls first: food, shelter, utilities, transportation. Then savings. Then everything else." },
          { q: "True or False: Having a budget means you can't spend money on fun things.", type: "tf", answer: false, explain: "A budget INCLUDES fun money. The point is intentional spending — saying yes to what matters and no to what doesn't." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 2. SAVING MONEY
  // ─────────────────────────────────
  {
    id: "saving",
    title: "Saving Money",
    icon: "💰",
    color: "#27ae60",
    desc: "Build your financial foundation",
    lessons: [
      {
        title: "The Power of Saving",
        questions: [
          { q: "Financial experts generally recommend saving at least ___% of your income.", type: "choice", options: ["5%", "10%", "15-20%", "30%"], answer: 2, explain: "15-20% is the standard recommendation. Start wherever you can — even 5% — and increase over time." },
          { q: "True or False: Saving $200/month from age 25 to 65 at 7% growth gives you over $500,000.", type: "tf", answer: true, explain: "$200/month × 40 years at 7% = roughly $525,000. That's only $96,000 of your own money — the rest is compound growth." },
          { q: "The concept 'pay yourself first' means:", type: "choice", options: ["Treat yourself before paying bills", "Save before spending on anything else", "Only buy things you want", "Pay off debt first"], answer: 1, explain: "Automate savings the day you get paid. What's left is what you spend. This flips the script from saving leftovers." },
          { q: "If you save $50/week, how much do you have after one year?", type: "choice", options: ["$1,800", "$2,600", "$3,100", "$4,200"], answer: 1, explain: "$50 × 52 weeks = $2,600. Not counting any interest. Small consistent amounts add up faster than you'd think." },
          { q: "True or False: You should wait until you earn more money before starting to save.", type: "tf", answer: false, explain: "The habit matters more than the amount. People who save $20/month develop the muscle to save $2,000/month later." },
        ],
      },
      {
        title: "High-Yield Savings",
        questions: [
          { q: "A high-yield savings account (HYSA) typically offers ___ more interest than a regular savings account.", type: "choice", options: ["2x", "5-10x", "10-25x", "100x"], answer: 2, explain: "Regular banks: 0.01-0.1%. HYSAs: 4-5% (as of 2025). That's 40-500x more on the same money, FDIC insured." },
          { q: "True or False: High-yield savings accounts are riskier than regular savings accounts.", type: "tf", answer: false, explain: "Both are FDIC insured up to $250,000. HYSAs just pass along more of the interest they earn. Same safety." },
          { q: "FDIC insurance covers up to $___ per depositor per bank.", type: "fill", answer: "250000", accept: ["250000", "250,000", "$250,000", "$250000", "250k"], explain: "Federal Deposit Insurance Corporation covers $250,000 per person per bank. Your money is safe even if the bank fails." },
          { q: "If you keep $10,000 in a HYSA earning 4.5%, you'll earn roughly $___ in interest per year.", type: "choice", options: ["$45", "$150", "$450", "$1,000"], answer: 2, explain: "$10,000 × 4.5% = $450/year, about $37/month. Compare that to ~$1/year at a traditional bank at 0.01%." },
          { q: "The main downside of high-yield savings accounts is:", type: "choice", options: ["Higher fees", "Less FDIC insurance", "Transfer times of 1-2 business days", "Lower interest than checking"], answer: 2, explain: "Most HYSAs are online-only with 1-2 day transfer times. Not ideal for instant-access needs, but fine for savings." },
        ],
      },
      {
        title: "Automating Your Savings",
        questions: [
          { q: "Automatic transfers are effective because they remove the need for ___.", type: "fill", answer: "willpower", accept: ["willpower", "discipline", "decision", "decisions", "self-control", "motivation"], explain: "Automation removes decision fatigue. You can't spend what you never see in your checking account." },
          { q: "When should automatic savings transfers ideally happen?", type: "choice", options: ["End of the month", "Middle of the month", "Payday or day after", "Random days"], answer: 2, explain: "Transfer on payday or the day after. The money moves before you have a chance to spend it." },
          { q: "True or False: Having separate savings accounts for different goals helps you save more.", type: "tf", answer: true, explain: "Mental accounting works. A 'vacation fund' account feels different from generic savings — you're less likely to dip into it." },
          { q: "The 'save your raise' strategy means:", type: "choice", options: ["Only saving when you get a raise", "Saving the entire amount of any raise you receive", "Asking for raises to save more", "Investing your savings"], answer: 1, explain: "Get a 5% raise? Put most or all of it into savings before lifestyle inflation kicks in. You were living on less before." },
          { q: "True or False: You should have at least 3 months of expenses saved before investing.", type: "tf", answer: true, explain: "Emergency fund first (3-6 months of expenses), then invest. Without a safety net, you'll be forced to sell investments at the worst time." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 3. EMERGENCY FUND
  // ─────────────────────────────────
  {
    id: "emergency",
    title: "Emergency Fund",
    icon: "🛡️",
    color: "#3498db",
    desc: "Your financial safety net",
    lessons: [
      {
        title: "Building Your Safety Net",
        questions: [
          { q: "An emergency fund should cover ___ to ___ months of essential expenses.", type: "choice", options: ["1-2 months", "3-6 months", "6-12 months", "12-24 months"], answer: 1, explain: "3-6 months is standard. Freelancers or single-income households should aim for 6+." },
          { q: "True or False: Using a credit card counts as an emergency fund.", type: "tf", answer: false, explain: "Credit cards are debt, not savings. High interest makes emergencies worse. Cash savings are the real safety net." },
          { q: "Which is NOT a true financial emergency?", type: "choice", options: ["Job loss", "Medical bill", "Black Friday sale", "Car repair"], answer: 2, explain: "A sale isn't an emergency — it's a want. True emergencies are unexpected, necessary, and urgent." },
          { q: "If your monthly essentials are $3,000, a solid emergency fund is at least:", type: "choice", options: ["$3,000", "$6,000", "$9,000", "$18,000"], answer: 2, explain: "$3,000 × 3 months = $9,000 minimum. Ideally $18,000 (6 months). This buys you time and peace of mind." },
          { q: "True or False: You should fully fund your emergency fund before paying off any debt.", type: "tf", answer: false, explain: "Start with a $1,000-2,000 starter emergency fund, then attack high-interest debt, then build the full 3-6 month fund." },
        ],
      },
      {
        title: "Where to Keep Your Fund",
        questions: [
          { q: "The best place for an emergency fund is:", type: "choice", options: ["Under your mattress", "In the stock market", "High-yield savings account", "Certificate of deposit (CD)"], answer: 2, explain: "HYSAs: liquid (1-2 day access), FDIC insured, earning 4-5% interest. Perfect balance of access and growth." },
          { q: "True or False: You should keep your emergency fund in a separate account from your spending money.", type: "tf", answer: true, explain: "Separate accounts create a psychological barrier. Out of sight, out of wallet. Makes it harder to 'borrow' from yourself." },
          { q: "Why is the stock market a bad place for emergency savings?", type: "choice", options: ["Stocks always lose money", "You might need the money when stocks are down", "It takes too long to sell stocks", "Banks pay more than stocks"], answer: 1, explain: "Markets can drop 30-40% in a crash — exactly when job losses spike. You'd sell at the worst possible time." },
          { q: "A money market account is:", type: "choice", options: ["A stock market account", "A type of savings account with check-writing ability", "A retirement account", "A cryptocurrency wallet"], answer: 1, explain: "Money market accounts blend savings (earns interest) with checking (limited check writing/debit). Good for larger emergency funds." },
          { q: "True or False: Once your emergency fund is fully funded, you never need to add to it again.", type: "tf", answer: false, explain: "Replenish after any withdrawal. Also review annually — if expenses rise, your fund target rises too." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 4. CONQUERING DEBT
  // ─────────────────────────────────
  {
    id: "debt",
    title: "Conquering Debt",
    icon: "⚔️",
    color: "#e74c3c",
    desc: "Strategies to become debt-free",
    lessons: [
      {
        title: "Understanding Debt",
        questions: [
          { q: "The average American household carries about $___ in credit card debt.", type: "choice", options: ["$2,000", "$4,000", "$8,000", "$12,000"], answer: 2, explain: "As of 2025, average credit card debt per household is around $8,000-10,000 at 20%+ interest. Costly to carry." },
          { q: "A credit card with 24% APR means if you carry a $1,000 balance, you'll pay roughly $___ in interest per year.", type: "fill", answer: "240", accept: ["240", "$240", "240 dollars"], explain: "$1,000 × 24% = $240/year in interest alone. That's why minimum payments trap people — most goes to interest." },
          { q: "'Good debt' typically includes:", type: "choice", options: ["Credit card balances", "Payday loans", "A mortgage or student loan", "Buy-now-pay-later purchases"], answer: 2, explain: "Good debt: low interest, builds assets/income (mortgage, education). Bad debt: high interest, depreciating items." },
          { q: "True or False: Paying only the minimum on a $5,000 credit card balance can take over 15 years to pay off.", type: "tf", answer: true, explain: "At 20% APR with minimum payments, $5,000 takes 15-20 years and costs $8,000+ in total interest." },
          { q: "Your debt-to-income ratio is:", type: "choice", options: ["Total debt ÷ total assets", "Monthly debt payments ÷ monthly gross income", "Credit limit ÷ income", "Interest paid ÷ principal"], answer: 1, explain: "DTI = monthly debt payments ÷ gross monthly income. Under 36% is healthy. Lenders use this to approve loans." },
        ],
      },
      {
        title: "Payoff Strategies",
        questions: [
          { q: "The debt snowball method pays off debts in order of:", type: "choice", options: ["Highest interest rate first", "Smallest balance first", "Largest balance first", "Oldest debt first"], answer: 1, explain: "Snowball = smallest balance first for quick wins and motivation. Mathematically the avalanche (highest rate) saves more, but snowball has better completion rates." },
          { q: "The debt avalanche method saves the most money because it targets the highest ___.", type: "fill", answer: "interest rate", accept: ["interest rate", "interest", "rate", "apr", "interest rates"], explain: "Avalanche = pay highest interest rate first. Saves the most in total interest, but takes longer to see progress." },
          { q: "True or False: Debt consolidation always saves you money.", type: "tf", answer: false, explain: "Only if the new rate is lower AND you don't rack up new debt on the now-empty credit cards. The behavior matters more than the math." },
          { q: "A balance transfer card typically offers 0% APR for:", type: "choice", options: ["3 months", "6 months", "12-21 months", "Permanently"], answer: 2, explain: "Intro 0% APR lasts 12-21 months (usually with a 3-5% transfer fee). Great tool IF you pay it off before the period ends." },
          { q: "True or False: Taking a personal loan to pay off credit cards is always a bad idea.", type: "tf", answer: false, explain: "If the personal loan rate is significantly lower (8% vs 24%), it can save thousands. Key: don't use the freed-up cards again." },
        ],
      },
      {
        title: "Staying Debt-Free",
        questions: [
          { q: "The #1 reason people fall back into debt after paying it off is:", type: "choice", options: ["Medical emergencies", "Not having a budget or emergency fund", "Student loans", "Inflation"], answer: 1, explain: "Without a budget and emergency fund, the next unexpected expense goes right back on credit cards. Systems prevent relapse." },
          { q: "True or False: Closing old credit cards after paying them off always helps your credit score.", type: "tf", answer: false, explain: "Closing cards reduces your total credit limit, increasing utilization ratio and potentially lowering your score. Usually better to keep them open." },
          { q: "A 'sinking fund' is:", type: "choice", options: ["Money you're losing to fees", "Savings set aside for a planned future expense", "An emergency fund", "A type of investment"], answer: 1, explain: "Sinking funds: save monthly for known future expenses (holidays, car insurance, vacation). Prevents debt from predictable costs." },
          { q: "The 24-hour rule for spending means:", type: "choice", options: ["Return items within 24 hours", "Wait 24 hours before any non-essential purchase", "Only shop for 24 hours per month", "Check prices for 24 hours"], answer: 1, explain: "Wait 24 hours before buying anything non-essential. Most impulse desires fade. If you still want it tomorrow, it might be worth it." },
          { q: "True or False: Using cash or debit instead of credit cards typically reduces spending by 12-18%.", type: "tf", answer: true, explain: "Studies show we spend 12-18% more with cards vs cash. The pain of paying is real — physical money makes spending feel tangible." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 5. CREDIT & LOANS
  // ─────────────────────────────────
  {
    id: "credit",
    title: "Credit & Loans",
    icon: "📊",
    color: "#9b59b6",
    desc: "Understand and build your credit",
    lessons: [
      {
        title: "Credit Score Basics",
        questions: [
          { q: "FICO scores range from ___ to 850.", type: "fill", answer: "300", accept: ["300"], explain: "FICO scores range from 300 (worst) to 850 (best). Most lenders use this scale." },
          { q: "What is the BIGGEST factor in your credit score?", type: "choice", options: ["Credit utilization", "Payment history", "Length of credit history", "Number of accounts"], answer: 1, explain: "Payment history is 35% of your FICO score. One late payment can drop your score 100+ points." },
          { q: "Credit utilization should ideally stay below ___.", type: "choice", options: ["50%", "30%", "80%", "100%"], answer: 1, explain: "Keep credit utilization under 30%, ideally under 10%, for the best score impact." },
          { q: "True or False: Checking your own credit score lowers it.", type: "tf", answer: false, explain: "Checking your own score is a 'soft inquiry' — it has zero impact. Only 'hard inquiries' from lenders affect it." },
          { q: "A 'good' credit score is generally considered:", type: "choice", options: ["500-600", "600-670", "670-739", "740+"], answer: 2, explain: "670-739 is 'good,' 740-799 is 'very good,' and 800+ is 'exceptional' by FICO standards." },
        ],
      },
      {
        title: "Building Good Credit",
        questions: [
          { q: "True or False: You need to carry a balance on your credit card to build credit.", type: "tf", answer: false, explain: "Total myth! Pay your balance in full every month. Usage is reported to bureaus regardless of whether you carry a balance." },
          { q: "An authorized user is someone who:", type: "choice", options: ["Owns the credit card", "Is added to someone else's card and benefits from their history", "Shares a joint account", "Has a secured card"], answer: 1, explain: "Being added as an authorized user on a parent's or spouse's old card can instantly boost your credit history length." },
          { q: "A secured credit card requires:", type: "choice", options: ["Good credit score", "A co-signer", "A cash deposit as collateral", "A minimum income"], answer: 2, explain: "You deposit $200-500 which becomes your credit limit. Use it responsibly for 6-12 months, then graduate to an unsecured card." },
          { q: "How long does a late payment stay on your credit report?", type: "choice", options: ["1 year", "3 years", "7 years", "10 years"], answer: 2, explain: "Late payments stay for 7 years but their impact fades over time. A late payment from 6 years ago hurts much less than one from 6 months ago." },
          { q: "True or False: Having multiple credit cards hurts your score.", type: "tf", answer: false, explain: "Multiple cards can actually help — they increase total available credit (lowering utilization) and show diverse credit management." },
        ],
      },
      {
        title: "Understanding Loans",
        questions: [
          { q: "APR stands for Annual Percentage ___.", type: "fill", answer: "Rate", accept: ["rate", "Rate"], explain: "APR = Annual Percentage Rate. It includes the interest rate plus fees, giving you the true yearly cost of borrowing." },
          { q: "A fixed-rate loan means:", type: "choice", options: ["The rate changes monthly", "The rate stays the same for the entire loan", "You can choose your rate", "The rate decreases over time"], answer: 1, explain: "Fixed = predictable payments forever. Variable rates start lower but can increase. Fixed is usually safer for long-term loans." },
          { q: "True or False: Pre-approval for a loan guarantees you'll get that loan.", type: "tf", answer: false, explain: "Pre-approval means you likely qualify based on preliminary info. Final approval requires full documentation and can still be denied." },
          { q: "Refinancing a loan means:", type: "choice", options: ["Paying it off early", "Replacing it with a new loan at different terms", "Adding more debt", "Defaulting on the loan"], answer: 1, explain: "Refinancing replaces your current loan with a new one — ideally at a lower rate, saving you money over time." },
          { q: "A co-signer on a loan is equally responsible for ___.", type: "fill", answer: "repayment", accept: ["repayment", "paying", "paying it back", "the debt", "the loan", "payment", "payments"], explain: "Co-signers are 100% on the hook if you don't pay. It affects their credit too. Don't co-sign unless you can afford to pay the full amount." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 6. INVESTING 101
  // ─────────────────────────────────
  {
    id: "investing",
    title: "Investing 101",
    icon: "📈",
    color: "#f0c040",
    desc: "Grow your wealth in the markets",
    lessons: [
      {
        title: "Getting Started",
        questions: [
          { q: "What is a stock?", type: "choice", options: ["A loan to a company", "A share of ownership in a company", "A government bond", "A type of savings account"], answer: 1, explain: "When you buy stock, you own a tiny piece of that company and share in its profits and losses." },
          { q: "An index fund tracks a ___.", type: "choice", options: ["Single company", "Group of stocks (market index)", "Bank interest rate", "Government policy"], answer: 1, explain: "Index funds track baskets like the S&P 500 (500 largest US companies), giving instant diversification." },
          { q: "True or False: You need thousands of dollars to start investing.", type: "tf", answer: false, explain: "Many brokerages allow $0 minimums. You can start with $1 through fractional shares." },
          { q: "The S&P 500 has historically returned about ___% per year on average.", type: "choice", options: ["3%", "5%", "10%", "20%"], answer: 2, explain: "The S&P 500 has averaged roughly 10% annual returns since 1926, including dividends." },
          { q: "Dollar-cost averaging means investing a fixed amount at ___.", type: "fill", answer: "regular intervals", accept: ["regular intervals", "regular interval", "fixed intervals", "set intervals", "the same time", "regular times", "consistent intervals"], explain: "DCA: invest the same amount on a schedule regardless of price. Reduces timing risk." },
        ],
      },
      {
        title: "Key Concepts",
        questions: [
          { q: "Diversification means:", type: "choice", options: ["Putting all money in one stock", "Spreading investments across many assets", "Only investing in bonds", "Timing the market"], answer: 1, explain: "Don't put all eggs in one basket. Diversification reduces risk without necessarily reducing returns." },
          { q: "True or False: Historically, time in the market beats timing the market.", type: "tf", answer: true, explain: "Missing just the 10 best days in 20 years cuts your returns in half. Stay invested." },
          { q: "An expense ratio is:", type: "choice", options: ["A tax rate on investments", "The annual fee a fund charges", "Your debt-to-income ratio", "A measure of stock volatility"], answer: 1, explain: "Expense ratios are annual fees. Index funds charge 0.03-0.20%. Actively managed funds charge 0.5-1.5%+." },
          { q: "Compound interest means you earn interest on your ___.", type: "fill", answer: "interest", accept: ["interest", "previous interest", "earned interest"], explain: "Compound interest: your gains generate their own gains. This is why starting early matters so much." },
          { q: "Which investment has historically had the highest long-term returns?", type: "choice", options: ["Savings accounts", "Government bonds", "US stock market", "Gold"], answer: 2, explain: "US stocks: ~10%/yr. Bonds: ~5%. Gold: ~7%. Savings: ~3%. Over decades, stocks win decisively." },
        ],
      },
      {
        title: "Portfolio Building",
        questions: [
          { q: "A common rule of thumb for stock allocation is: 110 minus your ___.", type: "fill", answer: "age", accept: ["age"], explain: "110 (or 120) minus your age = % in stocks. Age 30 → 80% stocks, 20% bonds. Adjusts risk as you age." },
          { q: "A target-date fund automatically:", type: "choice", options: ["Picks individual stocks for you", "Shifts from stocks to bonds as you approach retirement", "Guarantees returns", "Avoids all risk"], answer: 1, explain: "Target-date funds start aggressive and get conservative as the target year approaches. Set it and forget it." },
          { q: "True or False: A portfolio of 100% stocks is appropriate for most 25-year-olds saving for retirement.", type: "tf", answer: true, explain: "At 25 with 40 years until retirement, you can handle short-term drops. Time heals stock market wounds." },
          { q: "Rebalancing your portfolio means:", type: "choice", options: ["Buying more of your winners", "Selling everything and starting over", "Returning to your target asset allocation", "Moving all money to cash"], answer: 2, explain: "If stocks surge and your 80/20 mix becomes 90/10, rebalancing sells some stocks and buys bonds to return to 80/20." },
          { q: "True or False: International stocks provide diversification benefits even though they've underperformed US stocks recently.", type: "tf", answer: true, explain: "Leadership rotates. International stocks outperformed US stocks in the 2000s. Diversifying globally reduces country-specific risk." },
        ],
      },
      {
        title: "Common Mistakes",
        questions: [
          { q: "The biggest enemy of investment returns is usually:", type: "choice", options: ["Market crashes", "High fees over time", "Inflation", "Taxes"], answer: 1, explain: "A 1% fee difference over 30 years can cost you 25% of your total returns. Low-cost index funds win." },
          { q: "True or False: Past performance of a mutual fund reliably predicts future performance.", type: "tf", answer: false, explain: "Studies show past winners rarely repeat. That's why low-cost index funds beat 90% of active managers over 15 years." },
          { q: "Panic selling during a market crash is harmful because:", type: "choice", options: ["It triggers extra fees", "You lock in losses and miss the recovery", "It's illegal", "You have to wait to re-invest"], answer: 1, explain: "Markets have recovered from every crash in history. Selling low and buying back high is the exact opposite of winning." },
          { q: "FOMO investing (chasing hot stocks/crypto) is risky because:", type: "choice", options: ["It's illegal", "By the time something is hot, it's often overpriced", "You need special licenses", "Hot stocks always crash"], answer: 1, explain: "When your taxi driver is giving stock tips, the smart money already bought and is looking to sell. Don't chase hype." },
          { q: "True or False: Checking your portfolio daily leads to better returns.", type: "tf", answer: false, explain: "Daily checking increases anxiety and tempts you to make emotional trades. Check quarterly at most. Automate and ignore the noise." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 7. RETIREMENT PLANNING
  // ─────────────────────────────────
  {
    id: "retirement",
    title: "Retirement Planning",
    icon: "🏖️",
    color: "#e67e22",
    desc: "Secure your future self",
    lessons: [
      {
        title: "Retirement Accounts",
        questions: [
          { q: "A 401(k) is offered through your ___.", type: "fill", answer: "employer", accept: ["employer", "job", "company", "work"], explain: "401(k) plans are employer-sponsored retirement accounts with tax advantages." },
          { q: "An employer 401(k) 'match' is essentially:", type: "choice", options: ["A loan", "Free money", "A tax penalty", "A type of insurance"], answer: 1, explain: "If your employer matches 50% up to 6%, that's a guaranteed 50% return. Always get the full match." },
          { q: "True or False: A Roth IRA is funded with after-tax dollars but grows tax-free.", type: "tf", answer: true, explain: "Roth: pay taxes now, withdraw tax-free in retirement. Traditional: deduct now, pay taxes on withdrawals." },
          { q: "The 4% rule suggests you can safely withdraw ___% of your retirement savings per year.", type: "fill", answer: "4", accept: ["4", "4%", "four"], explain: "The 4% rule: withdraw 4% in year one, adjust for inflation. Historically lasts 30+ years." },
          { q: "To retire on $50,000/year using the 4% rule, you need:", type: "choice", options: ["$500,000", "$750,000", "$1,000,000", "$1,250,000"], answer: 3, explain: "$50,000 ÷ 0.04 = $1,250,000. Your FIRE number is annual expenses ÷ withdrawal rate." },
        ],
      },
      {
        title: "How Much Do You Need?",
        questions: [
          { q: "True or False: Most financial advisors recommend replacing 80% of your pre-retirement income.", type: "tf", answer: true, explain: "80% is the common target because some expenses drop in retirement (commuting, work clothes) while others may rise (healthcare)." },
          { q: "If you start saving $500/month at age 25 with 8% returns, by 65 you'll have roughly:", type: "choice", options: ["$240,000", "$500,000", "$1,000,000", "$1,750,000"], answer: 3, explain: "$500/month for 40 years at 8% ≈ $1.75 million. Starting at 35 with the same amounts? Only ~$750K. The decade matters enormously." },
          { q: "Every year you delay saving for retirement costs you roughly ___ in lost growth.", type: "choice", options: ["5%", "10%", "25%", "It varies but is significant"], answer: 3, explain: "Due to compound growth, each year of delay can cost 20-25% in final balance. A 25-year-old's dollar is worth 5× a 45-year-old's." },
          { q: "True or False: Social Security alone is enough for a comfortable retirement for most people.", type: "tf", answer: false, explain: "Average Social Security benefit is ~$1,900/month. It replaces about 40% of pre-retirement income. You need personal savings too." },
          { q: "The biggest expense in retirement for most Americans is:", type: "choice", options: ["Travel", "Housing", "Healthcare", "Food"], answer: 2, explain: "Housing (including maintenance, property tax) remains #1 even in retirement. Healthcare is #2 and rising fast." },
        ],
      },
      {
        title: "Social Security & Medicare",
        questions: [
          { q: "You can start collecting Social Security at age ___, but get more if you wait.", type: "fill", answer: "62", accept: ["62"], explain: "Earliest: 62 (reduced benefit). Full: 66-67. Maximum: 70 (about 76% more than at 62). Each year of delay = ~8% more." },
          { q: "True or False: Your Social Security benefit is based on your highest 35 years of earnings.", type: "tf", answer: true, explain: "SSA averages your 35 highest-earning years (adjusted for inflation). Years with zero earnings pull down the average." },
          { q: "Medicare eligibility begins at age:", type: "choice", options: ["60", "62", "65", "67"], answer: 2, explain: "Medicare starts at 65 regardless of when you take Social Security. Part A (hospital) is premium-free if you paid payroll taxes for 10+ years." },
          { q: "True or False: Social Security will likely be completely gone by the time younger workers retire.", type: "tf", answer: false, explain: "Even worst-case projections show 75-80% of benefits still payable through 2090+. It may be reduced, but it won't disappear." },
          { q: "The 'full retirement age' for Social Security for people born after 1960 is:", type: "choice", options: ["62", "65", "67", "70"], answer: 2, explain: "Full retirement age is 67 for anyone born after 1960. Taking benefits before 67 permanently reduces your monthly check." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 8. TAX ESSENTIALS
  // ─────────────────────────────────
  {
    id: "taxes",
    title: "Tax Essentials",
    icon: "🏛️",
    color: "#1abc9c",
    desc: "Keep more of what you earn",
    lessons: [
      {
        title: "Tax Basics",
        questions: [
          { q: "The US uses a ___ tax system, meaning different portions of income are taxed at different rates.", type: "fill", answer: "progressive", accept: ["progressive", "marginal", "graduated"], explain: "Progressive/marginal: you don't pay 22% on ALL income — only on income within that bracket." },
          { q: "True or False: Being in the '22% tax bracket' means all your income is taxed at 22%.", type: "tf", answer: false, explain: "Only income ABOVE the bracket threshold is taxed at 22%. Lower portions are taxed at 10% and 12%." },
          { q: "The standard deduction reduces your:", type: "choice", options: ["Tax rate", "Taxable income", "Gross income", "Net worth"], answer: 1, explain: "Standard deduction subtracts from income before tax is calculated. For 2025: ~$15,000 single, ~$30,000 married." },
          { q: "FICA taxes fund Social Security and ___.", type: "fill", answer: "Medicare", accept: ["medicare"], explain: "FICA = Social Security (6.2%) + Medicare (1.45%) = 7.65% from every paycheck." },
          { q: "Which reduces your tax bill more: a $1,000 deduction or a $1,000 credit?", type: "choice", options: ["Deduction", "Credit", "They're the same", "Neither affects taxes"], answer: 1, explain: "A credit reduces your tax bill dollar-for-dollar ($1,000 less tax). A deduction reduces taxable income ($1,000 × your rate = $220 saved at 22%)." },
        ],
      },
      {
        title: "Deductions & Credits",
        questions: [
          { q: "True or False: Most Americans benefit more from the standard deduction than itemizing.", type: "tf", answer: true, explain: "After the 2017 tax reform, about 90% of taxpayers use the standard deduction. You need significant mortgage interest, charitable giving, or state taxes to benefit from itemizing." },
          { q: "The Earned Income Tax Credit (EITC) is designed to help:", type: "choice", options: ["High-income earners", "Low to moderate-income workers", "Business owners only", "Retirees"], answer: 1, explain: "EITC can be worth up to $7,430 for qualifying families. It's refundable — you get money even if you owe no tax." },
          { q: "True or False: Student loan interest is tax deductible even if you take the standard deduction.", type: "tf", answer: true, explain: "Student loan interest (up to $2,500/year) is an 'above-the-line' deduction — you get it regardless of whether you itemize." },
          { q: "The Child Tax Credit is worth up to $___ per qualifying child.", type: "choice", options: ["$500", "$1,000", "$2,000", "$3,600"], answer: 2, explain: "The Child Tax Credit is $2,000 per child under 17 (as of 2025), with $1,700 potentially refundable." },
          { q: "A 401(k) contribution reduces your taxable income by:", type: "choice", options: ["Nothing — it's taxed normally", "The full contribution amount", "Half the contribution", "Only employer matches"], answer: 1, explain: "Traditional 401(k) contributions come out pre-tax. Contributing $10,000 means $10,000 less in taxable income this year." },
        ],
      },
      {
        title: "Tax-Advantaged Accounts",
        questions: [
          { q: "HSA stands for Health Savings ___.", type: "fill", answer: "Account", accept: ["account", "Account"], explain: "HSAs offer triple tax benefits: tax-deductible contributions, tax-free growth, and tax-free withdrawals for medical expenses." },
          { q: "True or False: An HSA is often called the 'best retirement account' because of its triple tax benefit.", type: "tf", answer: true, explain: "HSA is the only account with all three tax benefits. After 65, you can withdraw for any purpose (paying regular income tax, like a traditional IRA)." },
          { q: "The 529 plan is a tax-advantaged account for:", type: "choice", options: ["Retirement", "Education expenses", "Healthcare", "Home buying"], answer: 1, explain: "529 plans: money grows tax-free and withdrawals for qualified education expenses (tuition, books, room) are tax-free." },
          { q: "True or False: You should max out your employer 401(k) match before contributing to an IRA.", type: "tf", answer: true, explain: "Priority order: 1) Get full employer match (free money), 2) Max out Roth IRA, 3) Go back and max 401(k), 4) Taxable brokerage." },
          { q: "Capital gains tax on investments held over 1 year is ___ than on investments held under 1 year.", type: "choice", options: ["Higher", "Lower", "The same", "Not applicable"], answer: 1, explain: "Long-term capital gains (held 1+ years): 0%, 15%, or 20%. Short-term (under 1 year): taxed as ordinary income (up to 37%)." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 9. REAL ESTATE & RENTING
  // ─────────────────────────────────
  {
    id: "realestate",
    title: "Real Estate & Renting",
    icon: "🏠",
    color: "#8e44ad",
    desc: "Navigate housing like a pro",
    lessons: [
      {
        title: "Rent vs Buy",
        questions: [
          { q: "A standard down payment to avoid PMI (private mortgage insurance) is:", type: "choice", options: ["5%", "10%", "20%", "50%"], answer: 2, explain: "20% down eliminates PMI, which can cost $100-300/month. But lower down payments exist (3.5% FHA)." },
          { q: "True or False: Buying a home is always better than renting.", type: "tf", answer: false, explain: "It depends on location, how long you'll stay, prices vs rents, and opportunity cost of the down payment." },
          { q: "What does PITI stand for in mortgage payments?", type: "fill", answer: "principal interest taxes insurance", accept: ["principal interest taxes insurance", "principal, interest, taxes, insurance", "principal interest taxes and insurance"], explain: "PITI: Principal + Interest + Taxes + Insurance = your total monthly housing payment." },
          { q: "The 'rule of thumb' says housing should cost no more than ___% of gross income.", type: "choice", options: ["15%", "20%", "28%", "40%"], answer: 2, explain: "The 28/36 rule: housing ≤28% of gross income, total debt payments ≤36%." },
          { q: "True or False: A 15-year mortgage has higher monthly payments but saves significantly on total interest vs 30-year.", type: "tf", answer: true, explain: "15-year rates are lower AND you pay for half the time. Total interest savings can be $100K+." },
        ],
      },
      {
        title: "The Home Buying Process",
        questions: [
          { q: "The FIRST step when buying a home should be:", type: "choice", options: ["Find a house you love", "Get pre-approved for a mortgage", "Hire a real estate agent", "Start house hunting online"], answer: 1, explain: "Pre-approval tells you what you can actually afford and shows sellers you're serious. Everything else comes after." },
          { q: "Closing costs when buying a home typically range from:", type: "choice", options: ["0-1% of price", "2-5% of price", "5-10% of price", "10-15% of price"], answer: 1, explain: "Closing costs include lender fees, title insurance, appraisal, and prepaid items. Budget 2-5% beyond your down payment." },
          { q: "True or False: A home inspection is optional but highly recommended before buying.", type: "tf", answer: true, explain: "Inspections cost $300-500 but can reveal $10,000+ problems. Never skip it — even on new construction. You can negotiate repairs based on findings." },
          { q: "An escrow account holds money for:", type: "choice", options: ["Your down payment only", "Property taxes and insurance paid monthly through your mortgage", "Real estate agent fees", "Home improvement projects"], answer: 1, explain: "Lenders collect 1/12 of your annual tax and insurance each month, held in escrow, and pay the bills when due." },
          { q: "True or False: The listing price of a home is always negotiable.", type: "tf", answer: true, explain: "Almost everything is negotiable — price, closing costs, repairs, appliances, closing date. In a buyer's market, you have more leverage." },
        ],
      },
      {
        title: "Being a Smart Renter",
        questions: [
          { q: "True or False: Renting is 'throwing money away.'", type: "tf", answer: false, explain: "Renting buys flexibility, zero maintenance costs, and frees up capital to invest elsewhere. The money you DON'T spend on ownership costs can outperform home appreciation." },
          { q: "A renter's insurance policy typically costs:", type: "choice", options: ["$100-200/year", "$500-1,000/year", "$1,000-2,000/year", "$2,000+/year"], answer: 0, explain: "$10-20/month covers your belongings (theft, fire, water damage) and liability. Arguably the best value in insurance." },
          { q: "When negotiating rent, the BEST leverage you have is:", type: "choice", options: ["Threatening to leave", "Being a reliable long-term tenant", "Offering to pay less", "Complaining about the unit"], answer: 1, explain: "Landlords hate vacancy. Turnover costs them 1-2 months rent. Offering to sign a longer lease or showing you're reliable gives real negotiating power." },
          { q: "True or False: Your landlord can raise rent any amount at any time.", type: "tf", answer: false, explain: "During a lease, rent is locked. After lease expiration, rules vary — some areas have rent control. Always know your local tenant rights." },
          { q: "The rent-to-income ratio financial experts recommend is:", type: "choice", options: ["20% of gross", "30% of gross", "40% of gross", "50% of gross"], answer: 1, explain: "30% of gross income max on rent. Some say 25% of net (take-home) is more realistic. In expensive cities, this can be challenging." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 10. INSURANCE & PROTECTION
  // ─────────────────────────────────
  {
    id: "insurance",
    title: "Insurance & Protection",
    icon: "🔒",
    color: "#34495e",
    desc: "Protect what you've built",
    lessons: [
      {
        title: "Insurance Basics",
        questions: [
          { q: "A deductible is the amount you pay ___ your insurance kicks in.", type: "fill", answer: "before", accept: ["before", "before your", "out of pocket before"], explain: "Higher deductible = lower premium (monthly cost). Choose based on what you can afford out-of-pocket in an emergency." },
          { q: "True or False: The cheapest insurance policy is always the best choice.", type: "tf", answer: false, explain: "Cheap premiums often mean high deductibles, limited coverage, or excluded conditions. The best policy balances cost with adequate protection." },
          { q: "A premium is:", type: "choice", options: ["Your out-of-pocket maximum", "The amount you pay for insurance coverage", "The deductible amount", "Your co-pay"], answer: 1, explain: "Premium = your regular payment to maintain coverage. Like a subscription — pay it to keep the safety net active." },
          { q: "True or False: If you're young and healthy, you don't need health insurance.", type: "tf", answer: false, explain: "One accident or illness can cost $50,000-$500,000+. Insurance protects against catastrophic financial ruin, not routine care." },
          { q: "An umbrella policy provides:", type: "choice", options: ["Flood protection", "Extra liability coverage beyond other policies", "Life insurance", "Car insurance discounts"], answer: 1, explain: "Umbrella policies add $1M+ of liability protection for $200-400/year. Essential if you have assets worth protecting." },
        ],
      },
      {
        title: "Health & Life Insurance",
        questions: [
          { q: "An HSA-eligible health plan is also called a:", type: "choice", options: ["PPO plan", "HMO plan", "High-deductible health plan (HDHP)", "Catastrophic plan"], answer: 2, explain: "HDHPs have higher deductibles but lower premiums and qualify you for an HSA — the most tax-advantaged account type." },
          { q: "True or False: Term life insurance is usually cheaper and more straightforward than whole life.", type: "tf", answer: true, explain: "Term life: pure protection for a set period (20-30 years). Whole life mixes insurance with investing and costs 5-15x more. Most people only need term." },
          { q: "A common rule of thumb for life insurance is ___ times your annual income.", type: "choice", options: ["2-3x", "5-7x", "10-12x", "20x"], answer: 2, explain: "10-12x income ensures your family can replace your earnings. A better method: calculate actual needs (mortgage, childcare, education, living expenses)." },
          { q: "True or False: Life insurance is unnecessary if you have no dependents.", type: "tf", answer: true, explain: "If nobody depends on your income, you generally don't need life insurance. It becomes important when you have a spouse, kids, or shared debts." },
          { q: "An out-of-pocket maximum means:", type: "choice", options: ["The most you'll pay per doctor visit", "The total maximum you'll spend in a year before insurance covers 100%", "Your deductible limit", "Your monthly premium cap"], answer: 1, explain: "Once you hit the out-of-pocket max, insurance pays 100% for the rest of the year. This is your worst-case scenario number." },
        ],
      },
      {
        title: "Protecting Your Assets",
        questions: [
          { q: "True or False: Homeowners insurance automatically covers flood damage.", type: "tf", answer: false, explain: "Standard homeowners policies exclude flood damage. You need separate flood insurance, especially in flood-prone areas." },
          { q: "The most important type of insurance for most working adults is:", type: "choice", options: ["Pet insurance", "Disability insurance", "Travel insurance", "Jewelry insurance"], answer: 1, explain: "Your ability to earn income is your biggest asset. You're more likely to become disabled than die before 65. Disability insurance replaces 60-70% of income." },
          { q: "An emergency fund and insurance work together because:", type: "choice", options: ["They're the same thing", "The fund covers deductibles; insurance covers catastrophes", "Insurance replaces emergency funds", "You only need one or the other"], answer: 1, explain: "Emergency fund handles the deductible and small surprises. Insurance handles the $50K+ events that would bankrupt you." },
          { q: "True or False: You should review all insurance policies at least once a year.", type: "tf", answer: true, explain: "Life changes: marriage, kids, new home, salary increases, paid-off mortgage. Your coverage needs change too. Annual review prevents gaps." },
          { q: "Identity theft protection primarily helps with:", type: "choice", options: ["Preventing all identity theft", "Monitoring for fraudulent activity and helping you recover", "Guaranteeing your money back", "Encrypting your data"], answer: 1, explain: "No service prevents all theft. Good services monitor credit, alert you to suspicious activity, and help with the recovery process (which can take 100+ hours alone)." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 11. SIDE HUSTLES & INCOME
  // ─────────────────────────────────
  {
    id: "income",
    title: "Growing Your Income",
    icon: "💡",
    color: "#d35400",
    desc: "Earn more, build more",
    lessons: [
      {
        title: "Increasing Your Salary",
        questions: [
          { q: "True or False: Most employers expect you to negotiate your starting salary.", type: "tf", answer: true, explain: "70% of employers expect negotiation. Not negotiating your first offer can cost $500K-$1M over a career due to compounding raises." },
          { q: "The best time to ask for a raise is:", type: "choice", options: ["When you need money", "After a major accomplishment or performance review", "On your first day", "When a colleague gets one"], answer: 1, explain: "Timing matters. Come with documented achievements, market rate data, and ask after a win — not when desperate." },
          { q: "Switching jobs typically increases salary by:", type: "choice", options: ["2-3%", "5-8%", "10-20%", "50%+"], answer: 2, explain: "Internal raises: 3-5%. Job hopping: 10-20% average increase. Staying loyal is sometimes penalized financially." },
          { q: "True or False: The highest-paying job is always the best financial decision.", type: "tf", answer: false, explain: "Consider total compensation: benefits, retirement match, PTO, flexibility, commute costs, stress, and growth potential. A $90K job with great benefits can beat $110K without." },
          { q: "The single best investment for increasing your earning potential is:", type: "choice", options: ["Real estate", "Stocks", "Skills and education", "Cryptocurrency"], answer: 2, explain: "Investing in high-demand skills (coding, sales, leadership) can increase lifetime earnings by hundreds of thousands. Your human capital is your biggest asset." },
        ],
      },
      {
        title: "Side Hustles & Freelancing",
        questions: [
          { q: "True or False: Side hustle income is tax-free as long as it's under $600.", type: "tf", answer: false, explain: "All income is taxable regardless of amount. The $600 threshold only determines whether the payer sends a 1099 — you still owe taxes either way." },
          { q: "Self-employment tax rate is approximately:", type: "choice", options: ["7.65%", "15.3%", "22%", "30%"], answer: 1, explain: "Self-employed people pay both halves of FICA: 12.4% Social Security + 2.9% Medicare = 15.3%. Employees only pay half." },
          { q: "The most scalable side hustles are ones where income isn't directly tied to:", type: "fill", answer: "time", accept: ["time", "your time", "hours", "hours worked"], explain: "Trading time for money has limits (24 hours/day). Digital products, content, and businesses can earn while you sleep." },
          { q: "True or False: You should set aside 25-30% of freelance income for taxes.", type: "tf", answer: true, explain: "No employer withholds taxes for you. Save 25-30% in a separate account for quarterly estimated tax payments. Getting hit with a surprise tax bill is painful." },
          { q: "Before starting a side hustle, the most important thing to check is:", type: "choice", options: ["If your friends think it's cool", "Your employment contract for non-compete clauses", "If it will make you rich", "Social media trends"], answer: 1, explain: "Some employers prohibit side work, especially in competing industries. Check your contract first to avoid legal issues." },
        ],
      },
      {
        title: "Passive Income Streams",
        questions: [
          { q: "True or False: 'Passive income' requires zero work to set up and maintain.", type: "tf", answer: false, explain: "There's no truly passive income. Rental properties need maintenance, investments need monitoring, digital products need marketing. It's 'less active,' not effortless." },
          { q: "Dividend investing provides income from:", type: "choice", options: ["Stock price increases only", "Regular cash payments from companies to shareholders", "Government bonds only", "Selling shares"], answer: 1, explain: "Dividends are profit-sharing. Some companies pay 2-5% annually in dividends. Reinvesting them turbocharges compound growth." },
          { q: "The average net rental yield on investment property is about:", type: "choice", options: ["1-3%", "4-8%", "15-20%", "25%+"], answer: 1, explain: "After mortgage, taxes, insurance, maintenance, and vacancy, net yields are typically 4-8%. Better than savings, but far from risk-free." },
          { q: "True or False: You need a lot of money to start earning passive income.", type: "tf", answer: false, explain: "Start with $100 in dividend ETFs, create digital products for free, or monetize existing skills. Scale up as income grows." },
          { q: "The most realistic passive income for beginners is:", type: "choice", options: ["Buying a rental empire", "Dividend investing through index funds", "Starting a franchise", "Day trading"], answer: 1, explain: "Dividend-focused index funds (like SCHD or VYM) require no special knowledge, start with any amount, and pay you quarterly. Simple and proven." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 12. MONEY PSYCHOLOGY
  // ─────────────────────────────────
  {
    id: "psychology",
    title: "Money Psychology",
    icon: "🧠",
    color: "#16a085",
    desc: "Master your financial mindset",
    lessons: [
      {
        title: "Money Mindset",
        questions: [
          { q: "The 'latte factor' illustrates that small daily expenses:", type: "choice", options: ["Don't matter at all", "Compound into significant amounts over years", "Should always be eliminated", "Only matter for rich people"], answer: 1, explain: "It's not about the latte itself — it's about awareness. $5/day = $1,825/year = $91,250 in 20 years invested at 8%." },
          { q: "True or False: Your relationship with money is primarily shaped by your childhood experiences.", type: "tf", answer: true, explain: "Money scripts (beliefs about money) form in childhood by watching parents. Identifying yours helps you change unhelpful patterns." },
          { q: "Lifestyle inflation means:", type: "choice", options: ["Prices going up due to inflation", "Spending more as you earn more", "Living beyond your means", "Getting a raise"], answer: 1, explain: "Earn $50K, spend $48K. Get a raise to $70K, spend $68K. Income doubled but savings barely moved. The hedonic treadmill is real." },
          { q: "The 'keeping up with the Joneses' effect is an example of:", type: "choice", options: ["Smart financial planning", "Social comparison spending", "Frugal living", "Investment strategy"], answer: 1, explain: "Comparing your lifestyle to neighbors/social media leads to overspending. Remember: the Joneses are probably in debt." },
          { q: "True or False: Rich people typically spend lavishly on visible status symbols.", type: "tf", answer: false, explain: "Research shows most millionaires are frugal. The flashy spenders often have high income but low net worth. Wealth is what you DON'T see." },
        ],
      },
      {
        title: "Behavioral Finance",
        questions: [
          { q: "Loss aversion means people feel losses roughly ___ as intensely as equivalent gains.", type: "choice", options: ["Equally", "1.5 times", "2-2.5 times", "5 times"], answer: 2, explain: "Losing $100 hurts about 2-2.5× more than gaining $100 feels good. This is why market drops feel devastating and cause panic selling." },
          { q: "True or False: Anchoring bias can cause you to overpay for things.", type: "tf", answer: true, explain: "If a jacket is 'originally' $200, now $99, it feels like a deal — even if it's worth $60. The $200 anchor distorts your judgment." },
          { q: "The sunk cost fallacy is when you:", type: "choice", options: ["Save money you've already spent", "Continue investing in something because of what you've already put in, not its future value", "Cut your losses quickly", "Diversify investments"], answer: 1, explain: "Holding a losing stock because you've 'already lost so much,' or finishing a bad meal because you paid for it. Past costs shouldn't drive future decisions." },
          { q: "Present bias makes us prefer:", type: "choice", options: ["Long-term rewards", "Immediate rewards over larger future ones", "Saving over spending", "Index funds"], answer: 1, explain: "We'd rather have $50 now than $100 in a year. This is why automatic savings work — they remove the choice between present and future self." },
          { q: "True or False: People who visualize their future selves save significantly more for retirement.", type: "tf", answer: true, explain: "Stanford research shows that seeing an aged photo of yourself increases retirement savings. Making your future self feel real motivates present sacrifice." },
        ],
      },
      {
        title: "Long-Term Wealth Building",
        questions: [
          { q: "The three pillars of wealth building are: earn, save, and ___.", type: "fill", answer: "invest", accept: ["invest", "investing", "grow"], explain: "Earning gives you income. Saving preserves it. Investing multiplies it. All three work together — you can't build wealth with just one or two." },
          { q: "True or False: Net worth is a better measure of financial health than income.", type: "tf", answer: true, explain: "A doctor earning $300K with $400K in debt has negative net worth. A teacher earning $55K with $200K saved is actually wealthier. Assets minus liabilities = what matters." },
          { q: "The Rule of 72 says to find how long money takes to double, divide 72 by:", type: "fill", answer: "interest rate", accept: ["interest rate", "the interest rate", "return rate", "rate", "rate of return", "the rate"], explain: "72 ÷ 8% return = 9 years to double. 72 ÷ 4% = 18 years. This shows why a few percentage points in returns matter enormously." },
          { q: "True or False: Most millionaires inherited their wealth.", type: "tf", answer: false, explain: "Studies show 80%+ of millionaires are first-generation — they built it through income, saving, and investing. Inheritance is the minority." },
          { q: "The most important financial habit, according to research, is:", type: "choice", options: ["Picking the right stocks", "Spending less than you earn — consistently", "Having a high income", "Reading financial news daily"], answer: 1, explain: "The gap between earning and spending determines everything. High earners who spend it all build nothing. Modest earners who save consistently build wealth." },
        ],
      },
    ],
  },
  // ─────────────────────────────────
  // 13. SIDE HUSTLES & EXTRA INCOME
  // ─────────────────────────────────
  {
    id: "sidehustles",
    title: "Side Hustles & Extra Income",
    icon: "🚀",
    color: "#e91e63",
    desc: "Earn more, build faster",
    lessons: [
      {
        title: "The Extra Income Mindset",
        questions: [
          { q: "True or False: Cutting expenses has unlimited potential to improve your finances.", type: "tf", answer: false, explain: "You can only cut expenses to zero. But there's no ceiling on earning. Side income can grow indefinitely while spending cuts have a floor." },
          { q: "The average side hustler in 2026 earns approximately $___ per month.", type: "choice", options: ["$200-$400", "$500-$800", "$800-$1,200", "$2,000+"], answer: 2, explain: "The average side hustler earns $800-$1,200/month. Some earn much more — it depends on your skills, time investment, and chosen hustle." },
          { q: "True or False: You need a lot of money to start a side hustle.", type: "tf", answer: false, explain: "Many profitable side hustles — freelancing, tutoring, consulting, content creation — require zero startup capital. Just your skills and time." },
          { q: "The best side hustle for maximizing hourly income is usually:", type: "choice", options: ["Food delivery", "Freelancing your professional skills", "Retail work", "Survey sites"], answer: 1, explain: "Freelancing your existing professional skills typically pays $50-200/hr, far exceeding delivery ($15-25/hr) or survey sites ($2-5/hr)." },
          { q: "True or False: Side hustle income should be treated like regular income for budgeting.", type: "tf", answer: false, explain: "Side income is best treated as 'bonus' money directed entirely toward financial goals — debt payoff, investing, or emergency fund. Don't absorb it into regular spending." },
        ],
      },
      {
        title: "Side Hustle Taxes",
        questions: [
          { q: "Self-employment tax rate on side hustle income is approximately:", type: "choice", options: ["7.65%", "10%", "15.3%", "22%"], answer: 2, explain: "Self-employment tax is 15.3% (12.4% Social Security + 2.9% Medicare). As an employee, your employer pays half — as a side hustler, you pay both halves." },
          { q: "True or False: You must pay estimated quarterly taxes if you expect to owe $1,000+ in taxes from side income.", type: "tf", answer: true, explain: "The IRS requires quarterly estimated payments (April, June, September, January) if you'll owe $1,000 or more. Skipping them means penalties." },
          { q: "Which of these is a legitimate tax deduction for side hustlers?", type: "choice", options: ["All food you eat while working", "Home office space used exclusively for work", "Your entire internet bill", "Commute to your day job"], answer: 1, explain: "A dedicated home office space is deductible. The key word is 'exclusively' — it must be used only for business. You can also deduct a portion of internet/phone." },
          { q: "True or False: You should set aside 25-30% of side hustle income for taxes.", type: "tf", answer: true, explain: "A good rule of thumb is saving 25-30% of side income for taxes. This covers self-employment tax + income tax. The exact amount depends on your total income and bracket." },
          { q: "The form freelancers receive from clients who pay them $600+ is called a:", type: "fill", answer: "1099", accept: ["1099", "1099-NEC", "1099-nec", "1099 NEC"], explain: "A 1099-NEC reports non-employee compensation. Clients who pay you $600+ in a year must send one. But you owe taxes on ALL income, even if no 1099 is issued." },
        ],
      },
      {
        title: "Scaling Your Side Income",
        questions: [
          { q: "The difference between active and passive income is:", type: "choice", options: ["Active income is illegal", "Active requires your time; passive generates money while you sleep", "Passive income doesn't exist", "They're the same thing"], answer: 1, explain: "Active income trades time for money (freelancing, tutoring). Passive income generates revenue without your constant involvement (digital products, investments, royalties)." },
          { q: "True or False: Most 'passive income' requires significant upfront work or capital.", type: "tf", answer: true, explain: "True passive income is rare. Most 'passive' streams — courses, books, rental properties — require huge upfront effort or capital. The income becomes passive after the initial investment." },
          { q: "The best indicator that a side hustle is worth scaling into a full business is:", type: "choice", options: ["Your friends think it's cool", "Consistent demand and growing revenue over 6+ months", "It went viral on social media once", "You enjoy it more than your day job"], answer: 1, explain: "Consistent demand + growing revenue = market validation. Virality is temporary, enjoyment alone doesn't pay bills, and friends' opinions aren't market data." },
          { q: "When should you consider quitting your day job for a side hustle?", type: "choice", options: ["As soon as the side hustle makes any money", "When side income matches 75-100% of day job income for 6+ months", "Never — always keep your day job", "When you're bored at work"], answer: 1, explain: "The safe threshold is 75-100% of your day job income, sustained for 6+ months, plus 6 months of expenses saved. Don't leap without a financial safety net." },
          { q: "True or False: Diversifying your side income across multiple streams reduces financial risk.", type: "tf", answer: true, explain: "Just like investing, diversification protects you. If one income stream dries up, others keep flowing. Aim for 2-3 complementary income sources." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 14. FINANCIAL PLANNING BY LIFE STAGE
  // ─────────────────────────────────
  {
    id: "lifestages",
    title: "Financial Planning by Life Stage",
    icon: "🗺️",
    color: "#00bcd4",
    desc: "Right moves at the right time",
    lessons: [
      {
        title: "Your 20s: Foundation Building",
        questions: [
          { q: "The single most valuable financial asset in your 20s is:", type: "choice", options: ["A high salary", "A nice car", "Time (for compound interest)", "A stock portfolio"], answer: 2, explain: "Time is your superpower. $5,000 invested at 25 becomes $108,000 by 65 at 8% returns. The same $5,000 invested at 35 becomes only $50,000. Time doubles your money." },
          { q: "True or False: You should wait until you earn a high salary to start investing.", type: "tf", answer: false, explain: "Starting small beats waiting for perfect. $100/month from age 22 beats $500/month starting at 35. The habit and time matter more than the amount." },
          { q: "In your 20s, the recommended priority order for your money is:", type: "choice", options: ["Max investments → Pay rent → Buy nice things", "Emergency fund → Employer match → High-interest debt → Roth IRA", "Pay off all debt → Then save → Then invest → Then enjoy life", "Enjoy life now → Save later when you earn more"], answer: 1, explain: "Build a $1,000 starter emergency fund, capture your employer 401(k) match (free money), attack high-interest debt, then fund a Roth IRA. Balance is key." },
          { q: "True or False: It's better to rent in your 20s than to rush into buying a home.", type: "tf", answer: true, explain: "Usually yes. Renting preserves flexibility for career moves, avoids maintenance costs, and lets you invest the difference. Buying makes sense only if you'll stay 5+ years." },
          { q: "The biggest financial mistake people make in their 20s is:", type: "choice", options: ["Not buying a house", "Lifestyle inflation — spending every raise", "Not having the newest phone", "Not day trading"], answer: 1, explain: "Lifestyle inflation is the silent wealth killer. Each raise is an opportunity to save more, not spend more. Keep your lifestyle flat and invest the raises." },
        ],
      },
      {
        title: "Your 30s-40s: Acceleration",
        questions: [
          { q: "By age 35, you should ideally have saved ___ times your annual salary.", type: "fill", answer: "2", accept: ["2", "two", "2x"], explain: "Fidelity's guideline: 1x salary by 30, 2x by 35, 3x by 40. If you earn $70,000, aim for $140,000 saved by 35. Behind? Increase contributions aggressively." },
          { q: "True or False: Your 30s and 40s are typically your highest-earning decades.", type: "tf", answer: true, explain: "Peak earning years are usually 35-55. This is when promotions, career moves, and experience translate to the highest salaries. Maximize saving during this window." },
          { q: "The 'sandwich generation' refers to adults who are:", type: "choice", options: ["Working two jobs", "Supporting both aging parents and children simultaneously", "Eating lunch at their desk", "Between Gen X and Millennials"], answer: 1, explain: "Many 30-40-somethings are financially supporting children AND aging parents. This dual responsibility requires careful planning and boundary-setting." },
          { q: "True or False: You should have life insurance if anyone depends on your income.", type: "tf", answer: true, explain: "If your spouse, kids, or aging parents depend on your income, term life insurance is essential. A 30-year, $500K policy might cost just $20-30/month for a healthy person in their 30s." },
          { q: "The most common financial regret of people in their 40s is:", type: "choice", options: ["Not buying bitcoin", "Not saving enough in their 20s and 30s", "Buying too small a house", "Not getting an MBA"], answer: 1, explain: "Survey after survey shows the #1 financial regret is not saving/investing earlier. The good news: your 40s still give you 20+ years of compounding before retirement." },
        ],
      },
      {
        title: "Your 50s-60s: Pre-Retirement",
        questions: [
          { q: "At age 50, you become eligible for catch-up contributions. The 401(k) catch-up amount in 2026 is:", type: "choice", options: ["$3,000", "$5,000", "$7,500", "$10,000"], answer: 2, explain: "$7,500 extra per year on top of the standard $23,500 limit = $31,000 total. This is a powerful tool for turbocharging retirement savings in your final working years." },
          { q: "True or False: You should shift your entire portfolio to bonds in your 50s.", type: "tf", answer: false, explain: "Shifting to 100% bonds is too conservative. At 55, you may have 30+ years of life left. A common guideline: subtract your age from 110 to get your stock percentage (110-55 = 55% stocks)." },
          { q: "Medicare eligibility begins at age:", type: "fill", answer: "65", accept: ["65", "sixty-five", "sixty five"], explain: "Medicare starts at 65. If you retire before 65, you need to bridge healthcare coverage — which can cost $500-1,500/month. Factor this into early retirement plans." },
          { q: "True or False: Social Security benefits increase about 8% per year for each year you delay claiming past full retirement age (up to 70).", type: "tf", answer: true, explain: "Delayed retirement credits add ~8% per year from your full retirement age (66-67) to age 70. That's a guaranteed 24-32% boost — hard to beat that return anywhere." },
          { q: "The most important pre-retirement step most people skip is:", type: "choice", options: ["Buying a vacation home", "Doing a detailed spending analysis to estimate retirement expenses", "Converting everything to cash", "Paying off their mortgage early"], answer: 1, explain: "Most people guess what retirement costs. A detailed spending analysis reveals the real number. Common surprise: healthcare and travel cost more than expected; commuting and work clothes cost nothing." },
        ],
      },
    ],
  },

  // ─────────────────────────────────
  // 15. ECONOMIC LITERACY
  // ─────────────────────────────────
  {
    id: "economics",
    title: "Economic Literacy",
    icon: "🌍",
    color: "#795548",
    desc: "Understand the big picture",
    lessons: [
      {
        title: "Inflation & Your Money",
        questions: [
          { q: "Inflation is the rate at which the general level of prices for goods and services is:", type: "choice", options: ["Falling", "Rising", "Staying the same", "Becoming more volatile"], answer: 1, explain: "Inflation means prices rise over time. 3% inflation means something costing $100 today will cost $103 next year. Your money buys less each year." },
          { q: "If inflation is 4% and your savings account pays 2%, your real return is:", type: "fill", answer: "-2%", accept: ["-2%", "-2", "negative 2%", "negative 2", "minus 2"], explain: "Real return = nominal return minus inflation. 2% - 4% = -2%. You're losing purchasing power even though your balance grows. This is why investing matters." },
          { q: "True or False: Moderate inflation (2-3%) is generally considered healthy for an economy.", type: "tf", answer: true, explain: "The Fed targets ~2% inflation. It encourages spending and investment (money loses value sitting idle), supports employment, and allows for wage growth. Deflation is actually more dangerous." },
          { q: "The best long-term hedge against inflation has historically been:", type: "choice", options: ["Gold", "Cash savings", "Stocks (equities)", "Cryptocurrency"], answer: 2, explain: "Stocks have returned ~10%/year (7% real after inflation) over the long term. Companies can raise prices with inflation, so their earnings and stock values tend to keep pace." },
          { q: "True or False: The Federal Reserve fights inflation primarily by raising interest rates.", type: "tf", answer: true, explain: "Higher rates make borrowing expensive, which slows spending and investment, reducing demand and easing price pressures. This is the Fed's main tool against inflation." },
        ],
      },
      {
        title: "Interest Rates & The Fed",
        questions: [
          { q: "The Federal Reserve's main tool for controlling the economy is the:", type: "fill", answer: "federal funds rate", accept: ["federal funds rate", "fed funds rate", "interest rate", "fed rate"], explain: "The federal funds rate is the rate banks charge each other overnight. When the Fed changes it, all other rates (mortgages, savings, loans) follow." },
          { q: "When the Fed RAISES interest rates, which typically happens?", type: "choice", options: ["Mortgage rates go down", "Savings account yields go up", "Stock prices always go up", "Inflation increases"], answer: 1, explain: "Higher fed rates mean banks pay more on deposits (savings yields rise) and charge more on loans (mortgages rise). This slows borrowing and spending." },
          { q: "True or False: The Fed's dual mandate is to promote maximum employment and stable prices.", type: "tf", answer: true, explain: "Congress gave the Fed two goals: keep unemployment low AND inflation stable (~2%). These goals sometimes conflict — fighting inflation can slow job growth." },
          { q: "An 'inverted yield curve' (short-term rates higher than long-term) often signals:", type: "choice", options: ["A booming economy", "A potential recession", "That stocks will double", "Nothing meaningful"], answer: 1, explain: "An inverted yield curve has preceded every US recession since the 1950s. It means investors expect the economy to weaken, driving long-term rates below short-term rates." },
          { q: "True or False: When savings account yields are high, it's always better to save rather than invest.", type: "tf", answer: false, explain: "Even at 5% savings yield, stocks historically return 10%/year. For long-term goals (5+ years), investing in diversified stock funds typically outperforms savings accounts." },
        ],
      },
      {
        title: "Recessions & Market Cycles",
        questions: [
          { q: "A recession is technically defined as:", type: "choice", options: ["Any stock market decline", "Two consecutive quarters of GDP decline", "Unemployment above 5%", "The president declares one"], answer: 1, explain: "The common rule: two consecutive quarters of negative GDP growth. The official call is made by the NBER, which considers employment, production, and other factors." },
          { q: "True or False: The stock market always drops during a recession.", type: "tf", answer: false, explain: "Markets are forward-looking. They often drop BEFORE a recession is declared and recover before it ends. The market crashed 34% in March 2020 but recovered within 5 months." },
          { q: "The best investment strategy during a market downturn is usually:", type: "choice", options: ["Sell everything and wait it out", "Keep investing regularly (dollar-cost averaging)", "Put all your money in gold", "Stop looking at your portfolio and panic"], answer: 1, explain: "Continuing to invest during downturns means buying stocks 'on sale.' Those who invested through the 2008 crash saw their portfolios double within 4 years of the bottom." },
          { q: "True or False: The average recession in the US lasts about 10 months.", type: "tf", answer: true, explain: "Since WWII, the average US recession has lasted about 10 months. The average expansion lasts about 5 years. Recessions are painful but relatively short." },
          { q: "The concept of 'buying the dip' means:", type: "choice", options: ["Purchasing discounted food items", "Investing more when stock prices drop significantly", "Buying cryptocurrency at any price", "Timing the exact market bottom"], answer: 1, explain: "Buying the dip means increasing investments when prices fall — you get more shares per dollar. It works because markets historically recover. But don't try to time the exact bottom." },
        ],
      },
    ],
  },
];

export default COURSES;

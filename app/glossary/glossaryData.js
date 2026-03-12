const glossaryData = {
  "compound-interest": {
    name: "Compound Interest",
    definition:
      "Interest that's calculated not just on your original money, but on the interest you've already earned. It's 'interest on interest' — like a snowball rolling downhill, getting bigger as it goes. After a few years, compound interest can turn a modest investment into something substantial.",
    whyItMatters:
      "This is the closest thing to free money in finance. Starting early matters enormously because time is your biggest advantage. Even small amounts compound into significant wealth if you give them decades to grow.",
    example:
      "Invest $10,000 at 7% annual return: After 10 years you'd have ~$19,672. After 20 years: ~$38,697. After 30 years: ~$76,123. That extra $66,123 is pure compound interest doing the work.",
    relatedTools: [
      {
        name: "Compound Interest Calculator",
        href: "/tools/compound-interest-calculator",
      },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: [
      "interest-rate",
      "principal",
      "apy",
      "apr",
      "investment-comparison",
    ],
  },
  apr: {
    name: "APR (Annual Percentage Rate)",
    definition:
      "The yearly cost of a loan or credit line, expressed as a percentage. APR includes the interest rate plus fees and other costs, so it's more complete than just the interest rate alone. When a credit card says 18% APR, you're paying about 1.5% per month.",
    whyItMatters:
      "APR is crucial for comparing loans and credit products. Two loans might have similar interest rates but different APRs because one has higher fees. Always compare APRs, not just rates, when shopping for mortgages, credit cards, or personal loans.",
    example:
      "A credit card charges 18% APR on a $1,000 balance. If you pay minimum payments (usually 2-3% of the balance), it'll take you ~5 years to pay off and you'll pay ~$500 in interest.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      {
        name: "Mortgage Calculator",
        href: "/tools/mortgage-calculator",
      },
    ],
    relatedTerms: ["apy", "interest-rate", "principal"],
  },
  apy: {
    name: "APY (Annual Percentage Yield)",
    definition:
      "The actual percentage return you'll earn on savings or investments in a year, accounting for compound interest. Unlike APR (which is a cost), APY is a benefit. If a savings account offers 4.5% APY, you're earning that rate plus compound interest on your earnings.",
    whyItMatters:
      "APY is what matters for your savings accounts and investments. It shows the real return you're getting. The difference between 4% and 5% APY might seem small, but over years it compounds into real money.",
    example:
      "A high-yield savings account at 4.5% APY on $10,000 earns about $450 in year one. But because of compounding, year two you earn ~$468. After 10 years, you'd have ~$14,794 without adding anything else.",
    relatedTools: [
      {
        name: "Compound Interest Calculator",
        href: "/tools/compound-interest-calculator",
      },
    ],
    relatedTerms: ["apr", "compound-interest", "interest-rate", "yield"],
  },
  "401k": {
    name: "401(k)",
    definition:
      "An employer-sponsored retirement plan where you can invest a portion of your paycheck before taxes are taken out. Your employer might match part of your contribution (free money). The money grows tax-free until you withdraw it in retirement, ideally at a lower tax rate.",
    whyItMatters:
      "A 401(k) with employer match is one of the easiest ways to build wealth. If your employer matches, you're leaving free money on the table if you don't contribute at least enough to get the full match. Plus, the tax savings are substantial.",
    example:
      "You contribute $6,000 to your 401(k) and your employer matches 50% up to 6% of salary. That's an immediate $3,600 match. If you earn 7% annually on $200,000 total after 30 years, you'd have over $1.5 million.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      {
        name: "Salary Breakdown Calculator",
        href: "/tools/salary-breakdown-calculator",
      },
    ],
    relatedTerms: ["roth-ira", "tax-bracket", "compound-interest"],
  },
  "roth-ira": {
    name: "Roth IRA",
    definition:
      "A retirement account where you contribute after-tax money (so you don't get an immediate tax deduction), but all the growth and withdrawals in retirement are completely tax-free. It's the opposite of a 401(k). You can withdraw your contributions anytime penalty-free.",
    whyItMatters:
      "If you think you'll be in a higher tax bracket in retirement than you are now, a Roth is powerful. Young people often benefit most because they have decades for tax-free growth. Plus, the flexibility to withdraw contributions makes it a pseudo-emergency fund.",
    example:
      "Contribute $7,000 at age 25, earn 7% annually. By 65, that grows to ~$1.4 million — all tax-free in retirement. Compare that to a traditional IRA where you'd owe taxes on the entire amount.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["401k", "tax-bracket", "compound-interest"],
  },
  etf: {
    name: "ETF (Exchange-Traded Fund)",
    definition:
      "A basket of stocks, bonds, or other assets bundled together and traded like a single stock. You buy one share of an ETF instead of buying 50 individual stocks. It's instant diversification at a low cost. ETFs trade throughout the day, unlike mutual funds which trade once daily.",
    whyItMatters:
      "ETFs are one of the easiest ways to own diversified investments. A single ETF tracking the S&P 500 gives you exposure to 500 companies. Low fees (often 0.03-0.20% annually) mean more of your money grows instead of going to fund managers.",
    example:
      "Buy one share of VOO (Vanguard S&P 500 ETF) for ~$400-500 and you own a piece of Apple, Microsoft, Google, and 497 other companies. If the market returns 7% that year, your investment does too.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: [
      "index-fund",
      "diversification",
      "expense-ratio",
      "dividend",
    ],
  },
  "index-fund": {
    name: "Index Fund",
    definition:
      "A fund that holds all (or most) of the stocks in a specific market index, like the S&P 500 or total stock market. The goal isn't to beat the market — it's to match it. Lower fees than actively managed funds because there's minimal trading and no manager trying to pick winners.",
    whyItMatters:
      "Most professional investors can't beat the market consistently. Index funds are the proven way to participate in market growth without overpaying for management. Studies show 80-90% of actively managed funds underperform index funds over 15+ years.",
    example:
      "A total stock market index fund holds thousands of companies weighted by size. You're betting on the overall economy growing, which historically averages 10% annually before inflation.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["etf", "diversification", "expense-ratio"],
  },
  fire: {
    name: "FIRE (Financial Independence, Retire Early)",
    definition:
      "A movement focused on saving and investing aggressively to reach financial independence as early as possible — potentially in your 30s or 40s. The idea is to build enough wealth that you can live off investment returns without working. It requires discipline but is mathematically possible.",
    whyItMatters:
      "FIRE reframes your relationship with money and work. Even if you don't aim to retire at 35, the framework helps you think about your financial independence number and what it takes to reach it. It's less about not working and more about having the choice.",
    example:
      "If you spend $40,000 yearly and invest enough to generate 4% annual returns, you need ~$1 million ($40,000 ÷ 0.04). Earn $80k, spend $40k, save $40k for 20 years at 7% returns and you'd reach it.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      {
        name: "Net Worth Calculator",
        href: "/tools/net-worth-calculator",
      },
    ],
    relatedTerms: [
      "compound-interest",
      "diversification",
      "asset-allocation",
      "net-worth",
    ],
  },
  "net-worth": {
    name: "Net Worth",
    definition:
      "Everything you own (assets) minus everything you owe (liabilities). Includes your home value, investments, savings, car value, minus your mortgage, loans, and credit card debt. It's a snapshot of your financial position at one point in time.",
    whyItMatters:
      "Net worth is the big-picture number that matters for long-term financial health. You can have high income but low net worth (high spender), or lower income but high net worth (good saver). Track it quarterly or annually to see if you're on the right trajectory.",
    example:
      "You own a house worth $400k (owe $300k mortgage), have $100k invested, $20k in savings, but owe $5k on a car. Net worth: ($400k + $100k + $20k + $15k) - ($300k + $5k) = $230,000.",
    relatedTools: [
      {
        name: "Net Worth Calculator",
        href: "/tools/net-worth-calculator",
      },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["asset-allocation", "liquidity", "debt-to-income-ratio"],
  },
  "debt-to-income-ratio": {
    name: "Debt-to-Income Ratio (DTI)",
    definition:
      "Your monthly debt payments divided by your gross monthly income. If you earn $5,000 monthly and pay $1,000 toward debts, your DTI is 20%. Lenders use this to decide if they'll loan you money — lower is better. Most want to see under 36-43% DTI.",
    whyItMatters:
      "Your DTI directly impacts whether you can get approved for loans and what rates you'll get. Before applying for a mortgage, know your DTI. If it's too high, paying down debt or increasing income can improve your borrowing power.",
    example:
      "You earn $6,000/month gross. You pay: $1,200 mortgage, $300 car loan, $100 student loans, $150 credit card minimum = $1,750 total. DTI: $1,750 ÷ $6,000 = 29%. This is good — most lenders want under 36-43%.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    ],
    relatedTerms: ["credit-score", "mortgage", "principal"],
  },
  "emergency-fund": {
    name: "Emergency Fund",
    definition:
      "Money set aside in a savings account for unexpected expenses — car repairs, medical bills, job loss, etc. Typically 3-6 months of living expenses. It's not an investment; it's insurance against life's surprises. Keep it liquid and accessible, not in the stock market.",
    whyItMatters:
      "An emergency fund prevents you from going into debt when something unexpected happens. Without one, a $2,000 car repair forces you to use a credit card at 18% APR. With one, you handle it calmly.",
    example:
      "If your monthly expenses are $3,000, an emergency fund is $9,000-18,000. Keep it in a high-yield savings account earning 4%+ APY. After a year, you've earned ~$360 interest while keeping it safe.",
    relatedTools: [
      {
        name: "Salary Breakdown Calculator",
        href: "/tools/salary-breakdown-calculator",
      },
    ],
    relatedTerms: ["liquidity", "sinking-fund", "apy"],
  },
  "dollar-cost-averaging": {
    name: "Dollar-Cost Averaging",
    definition:
      "Investing the same amount of money at regular intervals (weekly, monthly, etc.) regardless of the price. When the market is high, you buy fewer shares. When it's low, you buy more. Over time, this smooths out price volatility and removes the stress of timing the market.",
    whyItMatters:
      "Nobody can consistently predict market tops and bottoms. Dollar-cost averaging automates investing so you don't have to worry. It's especially powerful in retirement accounts like 401(k)s, which take fixed amounts from each paycheck.",
    example:
      "Invest $1,000 monthly in an index fund. Month 1: price is $100, you buy 10 shares. Month 2: price is $90, you buy 11.11 shares. Month 3: price is $110, you buy 9.09 shares. You've reduced the impact of price swings.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["diversification", "compound-interest", "volatility"],
  },
  amortization: {
    name: "Amortization",
    definition:
      "The process of paying off a loan over time with regular payments. Each payment covers part of the principal (original amount borrowed) and part of the interest. As you pay down principal, interest decreases because there's less to charge interest on.",
    whyItMatters:
      "Understanding amortization helps you see how much of your mortgage payment goes to principal vs. interest. Early in the loan, most goes to interest. This is why paying extra principal can save you years of payments and tens of thousands in interest.",
    example:
      "A $300,000 mortgage at 6% for 30 years has a ~$1,799 monthly payment. In month 1: $1,500 is interest, $299 is principal. In month 360: nearly all $1,799 is principal. Paying an extra $200/month cuts years off the loan.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
    ],
    relatedTerms: [
      "mortgage",
      "principal",
      "interest-rate",
      "apr",
    ],
  },
  "capital-gains": {
    name: "Capital Gains",
    definition:
      "The profit you make when you sell an investment for more than you paid. If you bought a stock for $100 and sold it for $150, your capital gain is $50. The tax rate depends on how long you held it — less than a year is short-term (taxed like income), more than a year is long-term (lower tax rate).",
    whyItMatters:
      "Long-term capital gains get preferential tax treatment. Tax brackets are 0%, 15%, or 20% versus your ordinary income tax rate (up to 37%). Holding investments longer than a year can save you thousands in taxes. This is another reason time horizon matters in investing.",
    example:
      "Buy a stock for $10,000, sell it after 18 months for $15,000. Gain: $5,000. If you're in the 24% income tax bracket, long-term capital gains tax is 15%, so you owe only $750. Short-term would owe $1,200.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["dividend", "tax-bracket", "asset-allocation"],
  },
  diversification: {
    name: "Diversification",
    definition:
      "Spreading your money across different types of investments so one bad investment doesn't tank your whole portfolio. Own stocks, bonds, and maybe real estate. Within stocks, own different industries and geographies. The goal is to reduce risk without giving up too much return.",
    whyItMatters:
      "Diversification is risk management. A diversified portfolio of 100 mediocre investments usually outperforms betting everything on one brilliant investment (which rarely works). It lets you sleep at night during market volatility.",
    example:
      "Portfolio A: $100,000 all in Tesla. Tesla drops 50% in a year, you lose $50,000. Portfolio B: $80,000 in index funds, $15,000 in bonds, $5,000 in real estate. Index fund drops 20%, bonds up 4%, you're down ~$13,000 or 13% instead of 50%.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: [
      "asset-allocation",
      "bond",
      "etf",
      "index-fund",
    ],
  },
  inflation: {
    name: "Inflation",
    definition:
      "The rate at which the general price level of goods and services increases over time. If inflation is 3%, something that costs $100 today will cost $103 next year. It reduces the purchasing power of your money — a dollar buys less stuff.",
    whyItMatters:
      "Inflation erodes savings that sit in low-yield accounts. Money in a 1% savings account during 3% inflation is actually losing 2% in purchasing power annually. You need investments growing faster than inflation to build real wealth.",
    example:
      "Today a coffee costs $5. With 3% annual inflation, in 10 years it costs ~$6.72. If your salary doesn't keep up with inflation, you're getting a pay cut. Your $50,000 salary needs to be $67,200 in 10 years to have the same purchasing power.",
    relatedTools: [
      {
        name: "Compound Interest Calculator",
        href: "/tools/compound-interest-calculator",
      },
    ],
    relatedTerms: [
      "compound-interest",
      "asset-allocation",
      "interest-rate",
    ],
  },
  liquidity: {
    name: "Liquidity",
    definition:
      "How quickly and easily you can convert an asset into cash without losing value. Cash is 100% liquid. Savings accounts are liquid. Stocks are liquid (sell in minutes). Real estate is not liquid (takes months to sell). Bonds are somewhere in between depending on the bond.",
    whyItMatters:
      "Liquidity matters for flexibility and emergencies. You need liquid emergency funds, not investments tied up in illiquid assets. But some illiquidity is fine for long-term goals because you're not tempted to panic-sell during downturns.",
    example:
      "You need $5,000 urgently. If it's in a savings account, you have it today (liquid). If it's in a rental property worth $500,000, you might wait 3-6 months to sell and lose 5-10% in transaction costs. That's illiquid.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
    ],
    relatedTerms: ["emergency-fund", "asset-allocation", "bond"],
  },
  mortgage: {
    name: "Mortgage",
    definition:
      "A loan to buy real estate, typically a house. You put down a percentage (20% is standard) and borrow the rest. Over 15-30 years, you make monthly payments that cover principal, interest, property taxes, insurance, and possibly mortgage insurance if your down payment is under 20%.",
    whyItMatters:
      "A mortgage is often the largest loan you'll take, so the terms matter enormously. A 1% difference in interest rate on a $300,000 mortgage costs ~$75,000+ over 30 years. Shopping for rates and understanding your DTI impact is critical.",
    example:
      "Buy a $400,000 house with 20% down ($80,000). Borrow $320,000 at 6% for 30 years. Monthly payment: ~$1,920. Over 30 years, you'll pay ~$691,200 total, of which ~$371,200 is interest.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    ],
    relatedTerms: [
      "principal",
      "amortization",
      "apr",
      "debt-to-income-ratio",
    ],
  },
  principal: {
    name: "Principal",
    definition:
      "The original amount of money borrowed or invested. If you take a $200,000 mortgage, $200,000 is the principal. Interest is what lenders charge to let you borrow it. As you pay down a loan, principal decreases; interest charges decrease with it.",
    whyItMatters:
      "Principal and interest are different. Paying extra principal directly reduces the total interest you'll pay. A $1,000 extra principal payment in year 1 of a 30-year mortgage might save $2,000+ in interest over the life of the loan.",
    example:
      "Borrow $100,000 at 5% APR. Month 1 interest: $100,000 × 5% ÷ 12 = $417. After you pay down principal to $90,000, month 2 interest is only $375. Less principal = less interest each month.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    ],
    relatedTerms: ["amortization", "apr", "interest-rate"],
  },
  "interest-rate": {
    name: "Interest Rate",
    definition:
      "The percentage you pay (on a loan) or earn (on savings) annually. If you borrow $1,000 at 5% interest rate, you pay $50 in interest per year. On savings, if a rate is 4%, you earn $40 yearly on a $1,000 balance. Expressed as APR or APY.",
    whyItMatters:
      "Small interest rate differences compound into huge money over time. A 0.5% difference in mortgage rates costs tens of thousands over 30 years. A 1% higher savings rate can double your emergency fund earnings in a decade.",
    example:
      "Borrow $10,000 at 3% vs. 6% for 5 years. At 3%: you pay ~$796 interest. At 6%: you pay ~$1,637. That $3% difference costs you $841 on this one loan. Multiply across a mortgage and the difference is staggering.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
    ],
    relatedTerms: ["apr", "apy", "principal", "compound-interest"],
  },
  "credit-score": {
    name: "Credit Score",
    definition:
      "A three-digit number (typically 300-850) that summarizes your creditworthiness. Based on your payment history, debt levels, credit age, credit mix, and recent applications. The higher the score, the better loan terms you'll get. Scores above 750 are considered excellent.",
    whyItMatters:
      "Your credit score directly impacts interest rates you're offered. A 100-point difference can mean hundreds of thousands in extra interest on a mortgage over 30 years. Excellent credit gets 2-3% rates; poor credit gets 7-8%.",
    example:
      "A $300,000 mortgage at 3% costs $1,265/month. At 6% it costs $1,799/month. Same house, $534/month more ($191,700 more over 30 years) because of credit score differences. Build and maintain good credit.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    ],
    relatedTerms: ["fico-score", "debt-to-income-ratio", "apr"],
  },
  "asset-allocation": {
    name: "Asset Allocation",
    definition:
      "How you divide your investments across stocks, bonds, cash, and other asset classes. A common allocation is 70% stocks / 20% bonds / 10% cash, or 80/20, or 60/40 depending on your age and risk tolerance. It's the single biggest driver of your investment returns and risk.",
    whyItMatters:
      "Asset allocation matters more than picking individual stocks. A well-allocated boring portfolio typically beats trying to pick winning stocks. Your age, goals, and how much risk you can stomach should determine allocation.",
    example:
      "At 25, try 80% stocks / 20% bonds. At 45, shift to 70/30. At 65, shift to 50/50 or 40/60. Young? You can handle volatility because you have decades to recover. Near retirement? You need stability because you're starting withdrawals.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: [
      "diversification",
      "bond",
      "etf",
      "risk-tolerance",
    ],
  },
  bond: {
    name: "Bond",
    definition:
      "A loan you make to a government or company. You lend money, they promise to repay it with interest on specific dates. Bonds are more stable than stocks but have lower potential returns. Think of it as the 'boring but safe' part of a portfolio.",
    whyItMatters:
      "Bonds reduce portfolio volatility. When stocks tank 20%, bonds might be flat or up slightly. They provide steady income and capital preservation, which is crucial as you near retirement. They're also less correlated to stocks, so they truly diversify.",
    example:
      "Buy a $10,000 government bond paying 4% annually for 10 years. You receive $400/year guaranteed and $10,000 back in 10 years. It's boring but predictable. Compare that to a stock that might return 10% or -20% yearly.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: [
      "diversification",
      "asset-allocation",
      "yield",
      "interest-rate",
    ],
  },
  dividend: {
    name: "Dividend",
    definition:
      "A payment a company makes to shareholders (you) from its profits, typically quarterly. Some stocks pay dividends, some don't. You can reinvest dividends to buy more shares (compounding) or take them as cash. Dividend-paying stocks tend to be more stable, slower-growing companies.",
    whyItMatters:
      "Dividends provide steady income from investments. A $100,000 portfolio with 2-3% dividend yield generates $2,000-3,000 yearly. Reinvesting dividends supercharges long-term returns through compound interest. Over decades, dividends often represent 30-50% of total stock returns.",
    example:
      "Own 100 shares of a company at $50/share ($5,000 total). Company pays $1 annual dividend per share. You receive $100/year. If you reinvest it, you buy 2 more shares and next year earn $102.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["capital-gains", "etf", "compound-interest", "yield"],
  },
  "expense-ratio": {
    name: "Expense Ratio",
    definition:
      "The annual cost of owning a mutual fund or ETF, expressed as a percentage of your investment. A 0.05% ratio on a $100,000 investment costs $50/year. A 1% ratio costs $1,000/year. Over decades, expense ratios compound into serious money.",
    whyItMatters:
      "Low-cost index funds (0.03-0.20% expense ratios) outperform high-cost actively managed funds (0.5-2% expense ratios) most of the time. After expenses, most active managers underperform. The difference is: let someone else keep 1-2% of your returns annually or keep that compounding.",
    example:
      "Invest $50,000 at 8% annual returns. At 0.1% expense ratio: you pay $50/year, keep $4,000 in gains. At 1% expense ratio: you pay $500/year, keep $3,500. Over 30 years: 0.1% = $768,000. 1% = $505,000. The difference: $263,000.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["etf", "index-fund", "compound-interest"],
  },
  "fico-score": {
    name: "FICO Score",
    definition:
      "The most common credit score used by lenders, created by Fair Isaac Corporation. Ranges from 300-850. Based on payment history (35%), amounts owed (30%), length of credit history (15%), credit mix (10%), and new credit (10%). Essentially a numerical measure of how trustworthy you are with borrowed money.",
    whyItMatters:
      "Your FICO score determines if you get approved for loans and what interest rates you'll pay. It impacts more than just loans — insurance companies, employers, and landlords sometimes check it. A 100-point improvement can save thousands on a mortgage.",
    example:
      "FICO of 800+: qualify for best rates (3% mortgage). FICO of 700-749: good but not best (4.5% mortgage). FICO below 620: likely rejected or offered 8%+ rates. Building credit takes time but the payoff is massive.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    ],
    relatedTerms: ["credit-score", "debt-to-income-ratio", "apr"],
  },
  hsa: {
    name: "HSA (Health Savings Account)",
    definition:
      "A tax-advantaged savings account linked to a high-deductible health insurance plan. You contribute pre-tax money, it grows tax-free, and withdrawals for qualified medical expenses are tax-free. After 65, unused money can be withdrawn like a retirement account (with taxes on non-medical expenses).",
    whyItMatters:
      "HSAs are one of the most tax-efficient savings vehicles available. Triple tax advantage: tax-deductible contribution, tax-free growth, tax-free withdrawals (for medical). Some people max their HSA and invest it rather than spending immediately, using it as a retirement account.",
    example:
      "Contribute $4,150 annually to an HSA (2024 limit for individual). It grows at 7% for 30 years. You need $500 in medical expenses. Withdraw $500 tax-free. The $4,150 compounds to $400,000 — all tax-free. That's powerful.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["tax-bracket", "compound-interest", "asset-allocation"],
  },
  "tax-bracket": {
    name: "Tax Bracket",
    definition:
      "The percentage of income you owe in federal taxes, based on how much you earn. The U.S. uses marginal tax brackets — you don't pay the same rate on all income. Earn $0-$11,000 in 2024 → 10% tax rate. $11,000-$44,725 → 12%. And so on up to 37%. Only income in each bracket is taxed at that rate.",
    whyItMatters:
      "Understanding your bracket helps with decisions like traditional vs. Roth IRA, timing bonuses, and charitable donations. A $10,000 bonus might be taxed at your marginal rate (up to 37%) not your effective rate (lower). Strategies like bunching donations or deferring income can save taxes.",
    example:
      "Earn $80,000 as a single filer in 2024. You're in the 22% bracket. But you don't pay 22% on all $80,000. You pay 10% on the first $11,000, 12% on the next $33,725, 22% on the remaining $35,275. Your effective rate: ~16%.",
    relatedTools: [
      {
        name: "Salary Breakdown Calculator",
        href: "/tools/salary-breakdown-calculator",
      },
    ],
    relatedTerms: ["capital-gains", "roth-ira", "401k"],
  },
  yield: {
    name: "Yield",
    definition:
      "The income an investment generates annually, expressed as a percentage. A bond yielding 4% generates $40 yearly per $1,000 invested. Yield focuses on income (interest, dividends) not price appreciation. Bonds and dividend stocks have yields; growth stocks typically don't.",
    whyItMatters:
      "Yield matters if you need income from your investments (like in retirement). A 3% yield on $500,000 provides $15,000 annually without selling anything. It's less exciting than growth but more reliable and less dependent on market prices.",
    example:
      "Own $100,000 in bonds yielding 4%. You earn $4,000/year. Own $100,000 in dividend stocks yielding 2%. You earn $2,000/year. Own $100,000 in growth stocks with 0% yield. You earn $0/year but hope for price appreciation.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: [
      "dividend",
      "bond",
      "apy",
      "interest-rate",
      "capital-gains",
    ],
  },
  "sinking-fund": {
    name: "Sinking Fund",
    definition:
      "Money set aside in a savings account for a specific future expense you know is coming. Car insurance due in 3 months? Sinking fund. New roof needed in 2 years? Sinking fund. It's not an emergency (you know when it's coming), but it prevents having to use credit when the bill arrives.",
    whyItMatters:
      "Sinking funds prevent unnecessary debt. Instead of charging a $3,000 car repair on a credit card (pay 18% interest), you have $3,000 set aside. Combine many sinking funds (car, home maintenance, gifts, vacation) and you reduce financial stress substantially.",
    example:
      "Your car insurance is $1,500 for the year. Set aside $125/month in a sinking fund. After 12 months, you have $1,500 ready when the bill hits. No stress, no credit card, no interest. Do the same for 5-6 categories and you're barely stressed about predictable expenses.",
    relatedTools: [
      {
        name: "Salary Breakdown Calculator",
        href: "/tools/salary-breakdown-calculator",
      },
    ],
    relatedTerms: ["emergency-fund", "liquidity"],
  },
};

export default glossaryData;

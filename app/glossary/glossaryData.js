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
      "rule-of-72",
      "compound-annual-growth-rate",
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
    relatedTerms: ["apr", "compound-interest", "interest-rate", "yield", "high-yield-savings"],
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
    relatedTerms: ["roth-ira", "tax-bracket", "compound-interest", "tax-deferred", "w-2"],
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
    relatedTerms: ["401k", "tax-bracket", "compound-interest", "tax-deferred"],
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
      "mutual-fund",
      "real-estate-investment-trust",
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
    relatedTerms: ["etf", "diversification", "expense-ratio", "mutual-fund", "p-e-ratio"],
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
      "passive-income",
      "rule-of-72",
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
    relatedTerms: ["asset-allocation", "liquidity", "debt-to-income-ratio", "passive-income", "cost-of-living"],
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
    relatedTerms: ["credit-score", "mortgage", "principal", "down-payment", "refinance"],
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
    relatedTerms: ["liquidity", "sinking-fund", "apy", "high-yield-savings", "budget"],
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
    relatedTerms: ["diversification", "compound-interest", "volatility", "bear-market", "bull-market"],
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
      "refinance",
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
    relatedTerms: ["dividend", "tax-bracket", "asset-allocation", "tax-loss-harvesting"],
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
      "mutual-fund",
      "real-estate-investment-trust",
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
      "cost-of-living",
      "rule-of-72",
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
    relatedTerms: ["emergency-fund", "asset-allocation", "bond", "high-yield-savings"],
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
      "down-payment",
      "refinance",
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
    relatedTerms: ["amortization", "apr", "interest-rate", "refinance", "down-payment"],
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
    relatedTerms: ["apr", "apy", "principal", "compound-interest", "refinance"],
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
    relatedTerms: ["fico-score", "debt-to-income-ratio", "apr", "down-payment"],
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
      "volatility",
      "mutual-fund",
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
      "volatility",
      "mutual-fund",
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
    relatedTerms: ["capital-gains", "etf", "compound-interest", "yield", "passive-income", "real-estate-investment-trust"],
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
    relatedTerms: ["etf", "index-fund", "compound-interest", "mutual-fund"],
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
    relatedTerms: ["credit-score", "debt-to-income-ratio", "apr", "refinance"],
  },
  hsa: {
    name: "HSA (Health Savings Account)",
    definition:
      "A tax-advantaged savings account linked to a high-deductible health insurance plan. You contribute pre-tax money, it grows tax-free, and withdrawals for qualified medical expenses are tax-free. After 65, unused money can be withdrawn like a retirement account (with taxes on non-medical expenses).",
    whyItMatters:
      "HSAs are one of the most tax-efficient savings vehicles available. Triple tax advantage: tax-deductible contribution, tax-free growth, tax-free withdrawals (for medical). Some people max their HSA and invest it rather than spending immediately, using it as a retirement account.",
    example:
      "Contribute $4,300 annually to an HSA (2025 limit for individual). It grows at 7% for 30 years. You need $500 in medical expenses. Withdraw $500 tax-free. The $4,300 compounds to $400,000 — all tax-free. That's powerful.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["tax-bracket", "compound-interest", "asset-allocation", "tax-deferred"],
  },
  "tax-bracket": {
    name: "Tax Bracket",
    definition:
      "The percentage of income you owe in federal taxes, based on how much you earn. The U.S. uses marginal tax brackets — you don't pay the same rate on all income. Earn $0-$11,925 in 2025 → 10% tax rate. $11,925-$48,475 → 12%. And so on up to 37%. Only income in each bracket is taxed at that rate.",
    whyItMatters:
      "Understanding your bracket helps with decisions like traditional vs. Roth IRA, timing bonuses, and charitable donations. A $10,000 bonus might be taxed at your marginal rate (up to 37%) not your effective rate (lower). Strategies like bunching donations or deferring income can save taxes.",
    example:
      "Earn $80,000 as a single filer in 2025. You're in the 22% bracket. But you don't pay 22% on all $80,000. You pay 10% on the first $11,925, 12% on the next $36,550, 22% on the remaining $31,525. Your effective rate: ~15%.",
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
      "passive-income",
      "real-estate-investment-trust",
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
    relatedTerms: ["emergency-fund", "liquidity", "budget"],
  },
  "risk-tolerance": {
    name: "Risk Tolerance",
    definition:
      "Your ability and willingness to lose some or all of your original investment in exchange for greater potential returns. It depends on your financial situation, timeline, and personality. High risk tolerance means you can stomach big swings; low risk tolerance means you prefer stability even if returns are lower.",
    whyItMatters:
      "Your risk tolerance should drive your investment decisions. If a 30% market drop would cause you to panic-sell, you need a more conservative portfolio. Investing beyond your risk tolerance leads to emotional decisions that destroy returns.",
    example:
      "Aggressive investor (high risk tolerance): 90% stocks, 10% bonds. Moderate: 60% stocks, 40% bonds. Conservative (low risk tolerance): 30% stocks, 70% bonds. A 25-year-old might handle aggressive; someone retiring next year probably can't.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["asset-allocation", "diversification", "bond", "volatility", "dollar-cost-averaging"],
  },
  volatility: {
    name: "Volatility",
    definition:
      "How much an investment's price swings up and down over time. High volatility means big price swings (crypto, growth stocks). Low volatility means steadier prices (bonds, blue-chip stocks). Measured by standard deviation — bigger number means wilder rides.",
    whyItMatters:
      "Volatility is not the same as risk, but they're related. Young investors can handle volatility because they have time to recover. Retirees need lower volatility because they're withdrawing money and can't wait for a recovery.",
    example:
      "The S&P 500 has averaged ~10% annual returns, but individual years range from -37% (2008) to +32% (2013). Bitcoin has seen 80%+ drops. A high-yield savings account barely moves. Same concept, wildly different volatility.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["risk-tolerance", "diversification", "asset-allocation", "bond", "bear-market", "bull-market"],
  },
  "mutual-fund": {
    name: "Mutual Fund",
    definition:
      "A pool of money from many investors, managed by a professional fund manager who picks stocks, bonds, or other assets. Unlike ETFs, mutual funds trade once per day after the market closes. They come in actively managed (someone picks investments) and passively managed (tracks an index) varieties.",
    whyItMatters:
      "Mutual funds were the go-to investment vehicle before ETFs. Many 401(k) plans still offer mostly mutual funds. The key is watching expense ratios — actively managed funds charge 0.5-2% annually while index mutual funds charge 0.03-0.20%.",
    example:
      "Vanguard Total Stock Market Index Fund (VTSAX) is a mutual fund with a 0.04% expense ratio that holds 4,000+ stocks. Minimum investment: $3,000. Compare that to an actively managed fund charging 1.2% that may not even beat the index.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["etf", "index-fund", "expense-ratio", "diversification", "compound-annual-growth-rate", "capital-gains"],
  },
  "bear-market": {
    name: "Bear Market",
    definition:
      "A prolonged period where stock prices fall 20% or more from recent highs. Bear markets are driven by economic downturns, fear, and pessimism. They typically last 9-16 months on average. The opposite of a bull market.",
    whyItMatters:
      "Bear markets are scary but normal — they happen every 3-5 years on average. Historically, every bear market has been followed by a recovery. Investors who stay invested and keep buying during bear markets often see the biggest long-term gains.",
    example:
      "The COVID crash of March 2020 was one of the fastest bear markets ever — the S&P 500 dropped 34% in 23 days. But within 5 months it fully recovered. Those who panic-sold locked in losses; those who held (or bought more) came out ahead.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["bull-market", "volatility", "dollar-cost-averaging", "diversification", "risk-tolerance"],
  },
  "bull-market": {
    name: "Bull Market",
    definition:
      "A prolonged period where stock prices rise 20% or more from recent lows. Bull markets are driven by economic growth, optimism, and confidence. They typically last much longer than bear markets — the average bull market lasts about 4-5 years.",
    whyItMatters:
      "Bull markets are where most wealth is built. The longest bull market in history ran from 2009 to 2020 (11 years), turning $10,000 into ~$50,000. Missing even the 10 best days in a bull market drastically reduces your returns.",
    example:
      "From March 2009 to February 2020, the S&P 500 rose over 400%. An investor who put $50,000 in an index fund at the start would have had roughly $250,000 by the end — just by staying invested through the entire bull run.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["bear-market", "compound-interest", "dollar-cost-averaging", "volatility", "compound-annual-growth-rate"],
  },
  "tax-loss-harvesting": {
    name: "Tax-Loss Harvesting",
    definition:
      "Selling investments at a loss to offset capital gains taxes on your winners. If you made $5,000 on one stock and lost $3,000 on another, selling the loser means you only owe taxes on $2,000 net gain. You can even deduct up to $3,000 in net losses against ordinary income.",
    whyItMatters:
      "Tax-loss harvesting can save hundreds or thousands annually. It's essentially turning lemons into lemonade — your losing investments reduce your tax bill. Many robo-advisors do this automatically. Just watch the wash-sale rule (can't rebuy the same investment within 30 days).",
    example:
      "You have $10,000 in gains from selling Fund A. You also hold Fund B, which is down $4,000. Sell Fund B: you now owe taxes on only $6,000. Buy a similar (but not identical) fund to stay invested. You saved taxes without changing your strategy.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["capital-gains", "tax-bracket", "asset-allocation", "tax-deferred", "dividend"],
  },
  "compound-annual-growth-rate": {
    name: "CAGR (Compound Annual Growth Rate)",
    definition:
      "The average annual growth rate of an investment over a specified period, assuming profits are reinvested. It smooths out year-to-year volatility to show you the consistent rate that would have produced the same result. It's the standard way to compare investment performance.",
    whyItMatters:
      "CAGR cuts through noise. An investment that returns 30% one year and -10% the next sounds volatile, but its CAGR tells you the steady equivalent. It's the best apples-to-apples comparison between different investments over different time periods.",
    example:
      "You invested $10,000 and after 5 years have $16,105. The CAGR is 10%. That doesn't mean you earned 10% every year — one year might have been 25%, another -5%. But 10% annually would have produced the same $16,105.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["compound-interest", "apy", "volatility", "dollar-weighted-return", "capital-gains"],
  },
  "down-payment": {
    name: "Down Payment",
    definition:
      "The upfront cash you pay when buying a home, expressed as a percentage of the purchase price. The standard is 20%, but many programs allow 3-5% down. A larger down payment means a smaller mortgage, lower monthly payments, and no private mortgage insurance (PMI).",
    whyItMatters:
      "Your down payment size affects everything — monthly payment, interest rate, whether you need PMI, and your equity position from day one. Putting less than 20% down usually means paying PMI ($100-300/month extra) until you reach 20% equity.",
    example:
      "Buying a $350,000 home: 20% down = $70,000 cash, $280,000 mortgage. 5% down = $17,500 cash, $332,500 mortgage. The smaller down payment saves $52,500 upfront but adds ~$250/month in PMI plus higher monthly payments.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
    ],
    relatedTerms: ["mortgage", "principal", "amortization", "debt-to-income-ratio", "cost-of-living"],
  },
  refinance: {
    name: "Refinance",
    definition:
      "Replacing your existing loan with a new one, usually to get a lower interest rate, change loan terms, or access home equity. You essentially pay off your old mortgage with a new mortgage. It costs 2-5% of the loan amount in closing costs.",
    whyItMatters:
      "Refinancing at even 1% lower rate can save tens of thousands over the life of a loan. The rule of thumb: if you can lower your rate by 0.75-1% or more and plan to stay in the home long enough to recoup closing costs, refinancing makes sense.",
    example:
      "You have a $300,000 mortgage at 7%. Refinance to 5.5%. Monthly payment drops from $1,996 to $1,703 — saving $293/month ($3,516/year). Closing costs of $8,000 are recouped in ~27 months. After that, it's pure savings.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Opportunity Cost Calculator", href: "/tools/opportunity-cost-calculator" },
    ],
    relatedTerms: ["mortgage", "interest-rate", "apr", "amortization", "principal"],
  },
  "529-plan": {
    name: "529 Plan",
    definition:
      "A tax-advantaged savings plan designed for education expenses. Money grows tax-free and withdrawals for qualified education costs (tuition, room, board, books) are also tax-free. Each state offers at least one plan, and you can use any state's plan regardless of where you live.",
    whyItMatters:
      "College costs keep rising — the tax-free growth in a 529 makes a huge difference. Many states also offer a state tax deduction for contributions. Starting when a child is born gives you 18 years of compound growth before the first tuition bill.",
    example:
      "Contribute $200/month to a 529 from birth. At 7% annual returns, you'd have ~$86,000 by age 18. Total contributed: $43,200. Tax-free growth: ~$42,800. That covers a significant portion of college costs without ever paying taxes on the gains.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["compound-interest", "tax-bracket", "apy", "tax-deferred", "rule-of-72"],
  },
  "cost-of-living": {
    name: "Cost of Living",
    definition:
      "The amount of money needed to cover basic expenses (housing, food, transportation, healthcare, taxes) in a specific location. It varies dramatically between cities — $60,000 in rural Texas provides a very different lifestyle than $60,000 in San Francisco.",
    whyItMatters:
      "Cost of living should factor into every major financial decision — job offers, relocations, retirement planning, and salary negotiations. A $20,000 raise means nothing if you move somewhere that costs $25,000 more annually.",
    example:
      "A $100,000 salary in Austin, TX has roughly the same purchasing power as $180,000 in San Francisco. Housing is the biggest driver — a median home in SF costs ~$1.3M vs. ~$450K in Austin. Always compare salaries adjusted for cost of living.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
    ],
    relatedTerms: ["inflation", "net-worth", "emergency-fund", "budget", "down-payment"],
  },
  "passive-income": {
    name: "Passive Income",
    definition:
      "Money earned with minimal ongoing effort after the initial setup. Common sources include rental property income, dividend stocks, interest from savings, royalties, and online businesses. It's not truly 'passive' — most require upfront work or capital — but the ongoing effort is much less than a job.",
    whyItMatters:
      "Passive income is the foundation of financial independence. When your passive income exceeds your expenses, work becomes optional. Building multiple passive income streams also reduces dependence on any single employer or income source.",
    example:
      "Own a rental property generating $1,500/month after expenses. Hold $200,000 in dividend stocks yielding 3% ($6,000/year or $500/month). High-yield savings of $50,000 at 4.5% ($2,250/year or $188/month). Total passive: ~$2,188/month.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
    ],
    relatedTerms: ["fire", "dividend", "yield", "compound-interest", "real-estate-investment-trust", "high-yield-savings"],
  },
  "dollar-weighted-return": {
    name: "Dollar-Weighted Return",
    definition:
      "The actual return you earned based on when you added or withdrew money from an investment. It accounts for the timing and size of your cash flows. If you added money right before a big gain, your dollar-weighted return is higher than the fund's stated return.",
    whyItMatters:
      "A fund might return 10% for the year, but if you invested most of your money right before a dip, your actual return could be 3%. Dollar-weighted return shows what YOU actually earned, not what the investment earned. It highlights the cost of bad timing.",
    example:
      "A fund returns 20% in January and -10% in July. If you invested $10,000 in January, you'd end the year with ~$10,800. But if you added $90,000 in June, your $100,000 total is now ~$98,000. The fund is up overall, but you lost money.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Opportunity Cost Calculator", href: "/tools/opportunity-cost-calculator" },
    ],
    relatedTerms: ["compound-annual-growth-rate", "dollar-cost-averaging", "volatility", "capital-gains"],
  },
  "p-e-ratio": {
    name: "P/E Ratio (Price-to-Earnings)",
    definition:
      "A stock's current price divided by its earnings per share. If a stock costs $100 and earns $5 per share annually, its P/E is 20. It tells you how much investors are willing to pay for each dollar of earnings. Higher P/E = investors expect more growth. Lower P/E = cheaper but potentially less growth.",
    whyItMatters:
      "P/E ratio helps you gauge whether a stock is expensive or cheap relative to its earnings. The S&P 500 historically averages a P/E around 15-20. A P/E of 50+ means investors have sky-high expectations. A P/E below 10 might signal a bargain or a company in trouble.",
    example:
      "Apple at a P/E of 30 means investors pay $30 for every $1 of Apple's earnings. A utility company at P/E of 12 means you pay $12 per dollar of earnings. Apple's higher P/E reflects expectations of faster growth.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["etf", "capital-gains", "dividend", "index-fund", "volatility", "bull-market"],
  },
  "real-estate-investment-trust": {
    name: "REIT (Real Estate Investment Trust)",
    definition:
      "A company that owns, operates, or finances income-producing real estate. REITs trade like stocks but give you exposure to real estate without buying property. By law, they must pay out at least 90% of taxable income as dividends, making them popular income investments.",
    whyItMatters:
      "REITs let you invest in real estate with as little as the price of one share — no down payment, no tenants, no maintenance. They provide diversification beyond stocks and bonds, plus typically higher dividend yields (3-6% is common).",
    example:
      "Buy $10,000 of a diversified REIT ETF yielding 4%. You own a slice of hundreds of properties — offices, apartments, malls, data centers. You receive $400/year in dividends plus potential price appreciation, all without ever dealing with a leaky roof.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["diversification", "dividend", "yield", "passive-income", "etf", "asset-allocation"],
  },
  "tax-deferred": {
    name: "Tax-Deferred",
    definition:
      "An account or investment where you don't pay taxes on earnings until you withdraw the money, usually in retirement. Traditional 401(k)s and IRAs are tax-deferred — you get a tax break now but pay taxes later. The idea is that your tax rate in retirement will be lower than today.",
    whyItMatters:
      "Tax-deferred accounts let your money compound without being reduced by annual taxes. In a taxable account, paying 15-20% on gains each year significantly reduces your ending balance. Deferring taxes gives you more capital working for you.",
    example:
      "Invest $10,000 in a tax-deferred account at 8% for 30 years: it grows to ~$100,627. In a taxable account paying 15% capital gains annually: ~$76,123. Same investment, same returns, but tax deferral gave you $24,000+ more.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["401k", "roth-ira", "tax-bracket", "compound-interest", "529-plan", "tax-loss-harvesting"],
  },
  "w-2": {
    name: "W-2",
    definition:
      "The tax form your employer sends you each January showing how much you earned and how much was withheld for taxes during the previous year. It includes your gross pay, federal and state taxes withheld, Social Security and Medicare taxes, and retirement contributions. You need it to file your tax return.",
    whyItMatters:
      "Your W-2 is the foundation of your tax return. If your withholding was too low, you'll owe taxes. Too high, you'll get a refund. Adjusting your W-4 (the form that tells your employer how much to withhold) can prevent surprises at tax time.",
    example:
      "Your W-2 shows $75,000 gross income, $12,000 federal tax withheld, $4,650 Social Security tax, and $1,088 Medicare tax. When you file, if you actually owe $11,000 in federal tax, you get a $1,000 refund. If you owe $13,000, you pay $1,000 more.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Crypto Planner", href: "/tools/crypto-planner" },
    ],
    relatedTerms: ["tax-bracket", "401k", "hsa", "cost-of-living", "budget"],
  },
  "high-yield-savings": {
    name: "High-Yield Savings Account",
    definition:
      "A savings account that pays significantly more interest than a traditional bank savings account. While traditional banks offer 0.01-0.1% APY, high-yield accounts (usually at online banks) offer 4-5%+ APY. Your money is FDIC insured up to $250,000, just like a regular savings account.",
    whyItMatters:
      "The difference between 0.01% and 4.5% APY is enormous. On $20,000: a traditional account earns $2/year. A high-yield account earns $900/year. Same safety, same FDIC insurance, wildly different returns. There's almost no reason to keep savings in a low-yield account.",
    example:
      "Park your $15,000 emergency fund in a high-yield savings account at 4.5% APY. You earn ~$675/year in interest — enough to cover a couple months of your phone bill. At a traditional bank's 0.01%, you'd earn $1.50. Same money, 450x more interest.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
    ],
    relatedTerms: ["apy", "emergency-fund", "compound-interest", "liquidity", "passive-income", "rule-of-72"],
  },
  "rule-of-72": {
    name: "Rule of 72",
    definition:
      "A quick mental math shortcut to estimate how long it takes for an investment to double. Divide 72 by your annual return rate. At 8% returns, your money doubles in about 9 years (72 ÷ 8 = 9). At 6%, it takes 12 years. At 12%, just 6 years.",
    whyItMatters:
      "The Rule of 72 makes compound growth intuitive. It helps you quickly evaluate investments, understand the cost of fees, and set realistic expectations. It also works in reverse — divide 72 by inflation rate to see how fast your money loses purchasing power.",
    example:
      "At 7% annual returns: money doubles every ~10.3 years. Start with $50,000 at age 25. By 35: $100,000. By 45: $200,000. By 55: $400,000. By 65: $800,000. Four doublings turned $50,000 into $800,000 with zero additional contributions.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["compound-interest", "compound-annual-growth-rate", "inflation", "passive-income", "fire"],
  },
  "budget": {
    name: "Budget",
    definition:
      "A plan for how you'll spend and save your money each month. Popular methods include the 50/30/20 rule (50% needs, 30% wants, 20% savings), zero-based budgeting (every dollar gets a job), and envelope budgeting (cash in physical or virtual envelopes for each category).",
    whyItMatters:
      "A budget is the foundation of financial health. Without one, money disappears on things that don't matter to you. Budgeting isn't about restriction — it's about intentionally directing money toward what you actually value while ensuring you save enough for future goals.",
    example:
      "Earn $5,000/month after taxes. 50/30/20 budget: $2,500 for needs (rent, food, insurance), $1,500 for wants (dining out, entertainment, shopping), $1,000 for savings/debt payoff. Adjust percentages based on your goals and situation.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["emergency-fund", "sinking-fund", "net-worth", "fire", "cost-of-living", "passive-income"],
  },
  "backdoor-roth": {
    name: "Backdoor Roth IRA",
    definition: "A strategy for high earners to contribute to a Roth IRA even if they exceed income limits. You contribute to a traditional IRA (non-deductible) then immediately convert it to a Roth. It's legal but has tax implications if you have other pretax IRA accounts.",
    whyItMatters: "If you earn too much to contribute directly to a Roth, a backdoor Roth lets you bypass income limits and get tax-free growth. It's become essential for high earners who want Roth benefits.",
    example: "Earn $180,000 and can't contribute to a Roth directly. Contribute $7,000 to a traditional IRA, convert to Roth. Now $7,000 grows tax-free forever. Your future $700,000 gain is tax-free.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["roth-ira", "401k", "tax-bracket", "roth-conversion", "tax-deferred"],
  },
  "basis-point": {
    name: "Basis Point",
    definition: "One hundredth of a percent (0.01%). Used to describe small changes in interest rates or fees. If rates rise from 2.5% to 2.75%, that's a 25 basis point increase. In mutual funds, 0.10% fee equals 10 basis points.",
    whyItMatters: "Basis points matter because small fee differences compound hugely. A 1% fee vs 0.1% fee is a 90 basis point difference. Over 30 years, that 0.9% costs you tens of thousands in returns.",
    example: "Two index funds: one with 0.03% fee (3 basis points), one with 0.20% fee (20 basis points). On $500,000 over 30 years at 7% returns, you lose about $80,000 in returns to the higher-fee fund. Same investment, just fees.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["expense-ratio", "fee", "etf", "mutual-fund", "compound-interest"],
  },
  "blue-chip-stock": {
    name: "Blue-Chip Stock",
    definition: "A large, well-established, financially sound company with a long history of reliable performance. Think Apple, Microsoft, Coca-Cola, Procter & Gamble. These are the most stable stocks, typically paying dividends and showing steady growth.",
    whyItMatters: "Blue-chip stocks are the foundation of most diversified portfolios. They're less volatile than growth stocks, often pay dividends, and are least likely to go bankrupt. Good for conservative investors and retirees.",
    example: "Johnson & Johnson is a blue-chip stock. Less exciting than a hot tech startup, but it's paid increasing dividends for 60+ years. While tech stocks surge and crash, J&J chugs along earning you stable 2-3% dividend yields.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["dividend", "stock-split", "growth-stock", "bull-market", "volatility"],
  },
  "capital-preservation": {
    name: "Capital Preservation",
    definition: "An investment strategy focused on keeping your money safe rather than growing it aggressively. Prioritizes not losing money over maximizing returns. Common in bonds, cash, and conservative portfolios for people near or in retirement.",
    whyItMatters: "After you've built wealth, preserving it becomes more important than growing it. Losing half your wealth to recover it again means doubling it, which takes years. Capital preservation lets you sleep at night.",
    example: "A 65-year-old has $1 million. A 7% gain equals $70,000. But a 20% loss equals $200,000 gone. To recover, they need 25% returns (much harder). Instead, they shift to capital preservation: safer 3-4% returns with minimal loss risk.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["risk-tolerance", "bond", "diversification", "asset-allocation", "inflation"],
  },
  "cd": {
    name: "Certificate of Deposit (CD)",
    definition: "A savings product where you agree to lend money to a bank for a fixed period (3 months to 5 years) at a set interest rate. You can't withdraw early without a penalty. CDs are FDIC insured and very safe.",
    whyItMatters: "CDs offer higher interest rates than savings accounts because banks know they'll have your money. They're perfect for money you won't need soon. Rates are typically 4-5% APY now, significantly better than regular savings.",
    example: "Put $10,000 in a 1-year CD at 4.8% APY. At the end of year, you have $10,480. You locked in the rate for the year. If rates drop to 2%, you're glad you locked in higher. If rates rise to 6%, you'll be disappointed.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "Emergency Fund Calculator", href: "/tools/emergency-fund-calculator" },
    ],
    relatedTerms: ["high-yield-savings", "money-market", "apy", "liquidity", "emergency-fund"],
  },
  "closing-costs": {
    name: "Closing Costs",
    definition: "The fees and expenses paid to finalize a real estate transaction beyond the down payment. Typically 2-5% of the home price. Includes title insurance, appraisal, inspection, attorney fees, and lender fees. The seller might pay some or all of these.",
    whyItMatters: "Closing costs are often overlooked when budgeting for a home. A $300,000 home could have $9,000 in closing costs. Understanding what's negotiable (inspection, appraisal) vs fixed (title insurance) helps you budget properly.",
    example: "Buying a $400,000 home with 3% closing costs equals $12,000 due at closing. Seller pays half equals you pay $6,000. Bank charges 1% origination fee equals $4,000. Getting quotes from multiple lenders can save $2,000+ easily.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Rent vs Buy Calculator", href: "/tools/rent-vs-buy-calculator" },
    ],
    relatedTerms: ["down-payment", "pmi", "escrow", "mortgage", "home-equity"],
  },
  "collateral": {
    name: "Collateral",
    definition: "An asset you pledge to a lender as security for a loan. If you fail to repay, the lender can seize it. Your house is collateral for a mortgage. Your car is collateral for an auto loan. Collateral usually gets you a lower interest rate.",
    whyItMatters: "Collateral makes lenders comfortable lending to you. A car loan is cheaper than a personal loan because the lender can repossess the car. Understanding collateral helps you get better rates and understand the risks.",
    example: "Borrow $25,000 for a car. You pledge the car as collateral. If you default, the lender repossesses it and sells it to recover their money. Because of the collateral, the lender offers 4% interest instead of 8% for an unsecured loan.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
    ],
    relatedTerms: ["leverage", "mortgage", "default", "interest-rate", "debt-to-income-ratio"],
  },
  "consumer-price-index": {
    name: "Consumer Price Index (CPI)",
    definition: "A measure of inflation that tracks price changes for a basket of goods and services bought by typical consumers. If CPI is 3%, prices rose 3% on average. The Fed uses CPI to set interest rate policy.",
    whyItMatters: "CPI tells you if your purchasing power is growing or shrinking. If your salary rises 2% but CPI is 3%, you got a pay cut. If your investments return 5% and CPI is 2%, your real return is 3%.",
    example: "CPI rises 3% in a year. A $4 coffee costs $4.12. Your $50,000 salary should rise to $51,500 to maintain the same purchasing power. If it doesn't, inflation eroded your salary's value.",
    relatedTools: [
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["inflation", "cost-of-living", "purchasing-power", "interest-rate", "real-return"],
  },
  "cost-basis": {
    name: "Cost Basis",
    definition: "The original price you paid for an investment, including commissions and fees. If you buy 100 shares at $50 per share plus $10 commission, your cost basis is $5,010 total or $50.10 per share. Used to calculate capital gains when you sell.",
    whyItMatters: "Cost basis determines your taxes when you sell. If you buy at $50 and sell at $100, your capital gain is $50 per share. But if you forget what you paid (averaging down), you might overpay taxes. Good record-keeping saves money.",
    example: "Buy 100 shares of Apple at $150 equals $15,000 cost basis. Sell 10 years later at $300 equals $30,000 proceeds. Capital gain equals $15,000. At 15% long-term capital gains rate: $2,250 in taxes. Selling at $160 equals only $1,000 gain, $150 taxes.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["capital-gains", "tax-loss-harvesting", "dividend", "stock", "holding-period"],
  },
  "credit-utilization": {
    name: "Credit Utilization Ratio",
    definition: "The percentage of your available credit you're using. If you have a $10,000 credit limit and $3,000 balance, your utilization is 30%. The lower your utilization, the better for your credit score. Keeping it under 30% is ideal.",
    whyItMatters: "Credit utilization is 30% of your credit score. Paying down balances even if you pay in full helps your score. Using 90% of your limit signals financial stress to lenders, even if you pay on time.",
    example: "Two people with perfect payment history. One has $5,000 on a $20,000 limit (25% utilization), another has $16,000 on a $20,000 limit (80% utilization). The first has a higher credit score because utilization is lower.",
    relatedTools: [
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
    ],
    relatedTerms: ["credit-score", "fico-score", "credit-card", "revolving-credit", "minimum-payment"],
  },
  "debt-consolidation": {
    name: "Debt Consolidation",
    definition: "Combining multiple debts (credit cards, personal loans) into a single new loan, often at a lower interest rate. You get one payment instead of many. Doesn't reduce what you owe, just simplifies and potentially saves on interest.",
    whyItMatters: "Multiple high-interest debts are harder to pay off mentally and financially. A consolidation loan at lower interest accelerates your payoff and saves thousands. But only if you don't go back into debt.",
    example: "Owe $8,000 across three credit cards at 18-22% APR. Consolidate into a personal loan at 10% APR. Monthly payment drops from $400 to $300. You save $3,000+ in interest and pay off faster.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["credit-score", "interest-rate", "personal-loan", "apy", "apr"],
  },
  "depreciation": {
    name: "Depreciation",
    definition: "The decline in an asset's value over time. A new car depreciates 20% in year one. Real estate usually appreciates, but improvements depreciate. For tax purposes, depreciation reduces your taxable income if you own rental property.",
    whyItMatters: "Understanding depreciation helps you make better buying decisions. Cars are terrible investments because they depreciate so fast. Real estate often appreciates. Knowing this shapes your wealth-building strategy.",
    example: "Buy a car for $30,000. In year one, it's worth $24,000. By year 5, $12,000. But the $10,000 in real estate improvements (new roof, solar) can depreciate, reducing your rental property taxes by $200-400 annually.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["asset", "real-estate", "capital-gains", "market-value", "rental-property"],
  },
  "disability-insurance": {
    name: "Disability Insurance",
    definition: "Insurance that replaces part of your income if you become unable to work due to injury or illness. Short-term covers months, long-term covers years. Typically replaces 50-70% of your income, tax-free.",
    whyItMatters: "Most people don't plan for the real risk: not being able to work. A serious illness or injury could derail your finances for years. Disability insurance is cheaper than you think and protects your income.",
    example: "Earn $60,000 per year. Long-term disability insurance costs $60-120 per month but replaces $3,000 per month (60%) if you become disabled. A bad back could cost you decades of lost income. For $1,000-1,500 per year, that's excellent insurance.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["life-insurance", "emergency-fund", "health-insurance", "income", "workers-compensation"],
  },
  "dividend-reinvestment": {
    name: "Dividend Reinvestment (DRIP)",
    definition: "Automatically using dividend payments to buy more shares instead of taking cash. If a fund pays a $100 dividend, that $100 buys more shares at current price. Over decades, this compounds powerfully because you're buying more shares regularly.",
    whyItMatters: "Dividend reinvestment is a secret weapon for long-term wealth. You're automatically dollar-cost-averaging into your investments. Without thinking about it, your share count grows and compound growth accelerates.",
    example: "Own 100 shares of a dividend fund yielding 3% annually. $300 dividend buys 3 more shares. Next year you own 103 shares earning $309 in dividends, buying 3+ more shares. After 30 years, automatic reinvestment turned 100 shares into 240+ shares.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["dividend", "compound-interest", "passive-income", "dollar-cost-averaging", "etf"],
  },
  "earned-income": {
    name: "Earned Income",
    definition: "Money you make from work — salary, wages, or self-employment income. Specifically, income from your labor, not investments. Your W-2 shows earned income. Investment income (dividends, capital gains) is not earned income.",
    whyItMatters: "Certain tax rules only apply to earned income. You can only contribute to an IRA up to your earned income amount. HSAs require earned income. Understanding the distinction helps you maximize tax breaks.",
    example: "You earn $80,000 salary (earned income) and $20,000 in dividend income (unearned). Your earned income is $80,000. You can contribute max $7,000 to a Roth IRA and max $8,300 to an HSA based on earned income of $80,000.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["w-2", "passive-income", "self-employment-income", "tax-bracket", "gross-income"],
  },
  "escrow": {
    name: "Escrow",
    definition: "A neutral third party holding money or documents during a transaction. In real estate, escrow holds your down payment until closing, protecting both buyer and seller. During a mortgage, escrow holds funds for taxes and insurance, paying them annually.",
    whyItMatters: "Escrow protects you in big transactions. If something goes wrong in a real estate deal, escrow prevents fraud. During a mortgage, escrow simplifies taxes and insurance by bundling them into your payment.",
    example: "Buying a home, put $30,000 down. Goes to escrow, not the seller. If the inspection finds $100,000 in termites, you can walk away and get your money back. After closing, escrow pays your property taxes and insurance from monthly deposits.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Rent vs Buy Calculator", href: "/tools/rent-vs-buy-calculator" },
    ],
    relatedTerms: ["down-payment", "closing-costs", "mortgage", "property-tax", "homeowners-insurance"],
  },
  "estate-planning": {
    name: "Estate Planning",
    definition: "Creating documents (will, trust, power of attorney) that specify what happens to your assets and who makes medical and financial decisions if you die or become incapacitated. Includes minimizing estate taxes and specifying guardians for minor children.",
    whyItMatters: "Without a plan, the state decides how to distribute your assets (usually to spouse and children but not always), and your family faces costly probate. A simple will costs $300-1000 but saves your family thousands and heartache.",
    example: "Create a will designating your sibling as guardian for your kids and naming your spouse as executor. Create a durable power of attorney so your spouse can manage finances if you're in a coma. Without these, courts decide instead.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["will", "trust", "power-of-attorney", "beneficiary", "probate"],
  },
  "fdic-insurance": {
    name: "FDIC Insurance",
    definition: "Federal insurance protecting bank deposits up to $250,000 per account at each FDIC-insured bank. If the bank fails, the FDIC pays you back. Covers checking, savings, and money market accounts. Does NOT cover investments like stocks or bonds.",
    whyItMatters: "FDIC insurance is a safety net for your emergency fund. Even if the bank collapses, your $100,000 is protected. Don't let low rates at unsafe non-FDIC banks tempt you — the risk isn't worth it.",
    example: "Deposit $250,000 in a high-yield savings account at Bank A and $250,000 at Bank B. Both are FDIC insured for the full $500,000. If Bank A fails, FDIC pays you $250,000. Your full $500,000 is safe across both banks.",
    relatedTools: [
      { name: "Emergency Fund Calculator", href: "/tools/emergency-fund-calculator" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["savings-account", "emergency-fund", "money-market", "bank", "cd"],
  },
  "fiduciary": {
    name: "Fiduciary",
    definition: "Someone legally required to act in your best interest, not their own. A fiduciary financial advisor must prioritize your needs. A non-fiduciary advisor can recommend products that benefit them (higher commissions) instead of you.",
    whyItMatters: "Not all financial advisors are fiduciaries. A non-fiduciary might recommend a high-fee mutual fund because they earn a fat commission. A fiduciary must recommend what's best for you. Always ask: 'Are you a fiduciary 100% of the time?'",
    example: "Non-fiduciary advisor recommends a 1.2% expense ratio fund earning them 0.5% commission. Fiduciary advisor recommends a 0.04% index fund with no kickback. Same investment result, but fiduciary saves you $10,000+ in fees over 20 years.",
    relatedTools: [
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["advisor", "expense-ratio", "fee", "commission", "investment"],
  },
  "fixed-income": {
    name: "Fixed Income",
    definition: "Investments with fixed payments, typically bonds. You lend money to a government or company, they pay you a set interest rate (coupon) for years. When the bond matures, you get your principal back. Less risky than stocks but lower returns.",
    whyItMatters: "Fixed income provides stability and regular cash flow, valuable for retirees and risk-averse investors. Bonds typically fall when stocks rise, making them good diversification. But inflation can erode their real value.",
    example: "Buy a $10,000 10-year bond at 4% coupon. You receive $400 per year for 10 years, then get your $10,000 back at maturity. Guaranteed as long as the issuer doesn't default. Stocks might return 8% but fluctuate. Bonds give predictable income.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
    ],
    relatedTerms: ["bond", "asset-allocation", "diversification", "risk-tolerance", "yield"],
  },
  "flexible-spending-account": {
    name: "Flexible Spending Account (FSA)",
    definition: "An employer-sponsored account where you contribute pre-tax money for medical or dependent care expenses. You save taxes (typically 15-40% depending on your bracket), but must spend the money by year-end or lose it. Different from HSA — limited annual amount.",
    whyItMatters: "FSAs can save serious money if you know your medical expenses. Spending $2,000 in FSA contributions saves $600-800 in taxes if you're in a 30-40% bracket. But the 'use it or lose it' rule means careful planning.",
    example: "Expect $2,000 in medical costs (co-pays, contact lenses, therapy). Contribute $2,000 to FSA pre-tax. You save $600 in taxes (30% bracket). You spend that $600 on the same expenses you'd pay for anyway, so FSA provided a pure win.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["health-insurance", "pre-tax", "medical-expenses", "employer-benefits", "hsa"],
  },
  "foreclosure": {
    name: "Foreclosure",
    definition: "When a lender takes back a property because the borrower stopped paying the mortgage. The lender sells the property to recover their loan. Catastrophic for your credit (drops 100+ points) and takes 7+ years to recover from.",
    whyItMatters: "Foreclosure is one of the worst financial disasters possible. It destroys your credit, makes it hard to borrow for years, and can trigger tax consequences. Understanding the foreclosure timeline helps you avoid it or know your options.",
    example: "Miss 3 mortgage payments. Lender starts foreclosure process. After 6-12 months, they can auction your home. You lose the house and your down payment. Credit score drops from 750 to 580. Future borrowing costs thousands more.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
    ],
    relatedTerms: ["default", "mortgage", "home-equity", "credit-score", "bankruptcy"],
  },
  "front-load-back-load": {
    name: "Front-Load / Back-Load Fees",
    definition: "Mutual fund sales fees charged differently. Front-load equals paid when you buy (8% upfront equals $10,000 investment only buys $9,200 of fund). Back-load equals paid when you sell (declining 5% year one to 0% year 6). No-load funds have neither.",
    whyItMatters: "Front-load and back-load fees are terrible. They reduce returns, especially harmful to small investors. A $10,000 investment with 5% front-load starts behind $500 immediately. Use no-load or low-cost index funds instead.",
    example: "Invest $10,000 in a 5% front-load fund. Only $9,500 is invested. Invest same $10,000 in a no-load index fund. All $10,000 invested. Over 30 years at 7% returns, you lose $15,000+ to that initial fee.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["expense-ratio", "mutual-fund", "basis-point", "etf", "fee"],
  },
  "grace-period": {
    name: "Grace Period",
    definition: "A period after a payment is due during which you can still pay without penalty. Credit cards offer 21-25 day grace periods from statement closing to payment due date. Loans might have grace periods before first payment due.",
    whyItMatters: "Understanding grace periods helps you avoid unnecessary interest charges. Paying within the grace period on a credit card means no interest. Paying after means interest on the full balance. Same with loan grace periods.",
    example: "Credit card statement closes on the 15th. You have a 25-day grace period until the 10th of next month to pay without interest. If you pay on the 8th: no interest. If you pay on the 15th: interest charged from statement close.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["credit-card", "interest-rate", "payment", "apr", "minimum-payment"],
  },
  "gross-income": {
    name: "Gross Income",
    definition: "Your total income before any deductions — taxes, benefits, 401(k), health insurance. Your W-2 shows gross income at the top. Your take-home (net income) is what arrives in your bank account after deductions.",
    whyItMatters: "Lenders use gross income to qualify you for loans. Budgeting requires net income. Understanding the difference prevents confusion when you see different numbers on offers vs paychecks.",
    example: "Gross salary: $75,000 per year. Minus: $12,000 federal tax, $4,500 Social Security and Medicare, $5,000 health insurance, $4,000 401(k). Net pay: ~$49,500. Your gross is $75,000 but you see ~$4,125 per month in take-home.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["net-income", "w-2", "tax-bracket", "earned-income", "take-home-pay"],
  },
  "growth-stock": {
    name: "Growth Stock",
    definition: "A company with earnings growing faster than the overall market, with reinvestment of profits rather than dividend payments. Think Tesla, Amazon, Netflix. Higher volatility but higher potential returns. Opposite of value stocks.",
    whyItMatters: "Growth stocks power long-term wealth building. While they're riskier and more volatile than value stocks, decades of 10%+ annual returns outpace dividend-paying stocks. Most early-career investors should overweight growth.",
    example: "Growth stock (Tesla): Fluctuates wildly, no dividend, returns 20%+ annually when markets are good, -30% when bad. Value stock (Coca-Cola): Steady 8% returns with 2% dividend, less exciting but reliable. Over 30 years, Tesla massively outperforms if you can handle volatility.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["dividend", "blue-chip-stock", "volatility", "capital-gains", "bull-market"],
  },
  "home-equity": {
    name: "Home Equity",
    definition: "The portion of your home you own outright. Home value minus mortgage balance equals equity. If your $500,000 home has a $300,000 mortgage, you have $200,000 equity. You can borrow against it via HELOC or home equity loan.",
    whyItMatters: "Home equity is locked-up wealth, but you can access it cheaply via a HELOC (home equity line of credit). For home improvements or paying off high-rate debt, a HELOC at 6% is cheaper than credit cards at 18%.",
    example: "Own $500,000 home with $300,000 mortgage. You have $200,000 equity. Establish a HELOC and borrow $50,000 at 6% to renovate. Renovations increase home value to $550,000. Now you have $250,000 equity and improved home.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Rent vs Buy Calculator", href: "/tools/rent-vs-buy-calculator" },
    ],
    relatedTerms: ["mortgage", "down-payment", "refinance", "real-estate", "heloc"],
  },
  "income-tax": {
    name: "Income Tax",
    definition: "Tax the government charges on your earnings. Federal, state (if applicable), and local taxes. Progressive tax system: higher earners pay higher percentages. Standard deduction reduces taxable income for most people.",
    whyItMatters: "Income tax is your largest expense for most people. Understanding how brackets work (marginal vs effective rates) helps you optimize taxes. A small business owner might save $5,000-20,000 annually with basic tax planning.",
    example: "Earn $100,000. Federal tax brackets: 10% on first $11,000, 12% on next $44,000, 22% on remaining $45,000. Total tax approximately $12,100. Your effective tax rate is 12.1% even though marginal is 22%.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["tax-bracket", "deduction", "tax-credit-vs-deduction", "w-2", "earned-income"],
  },
  "individual-retirement-account": {
    name: "Individual Retirement Account (IRA)",
    definition: "A personal retirement account for saving and investing. Traditional IRAs offer pre-tax contributions and tax-deferred growth. Roth IRAs offer after-tax contributions and tax-free growth. Contribution limits are lower than 401(k)s but more flexible.",
    whyItMatters: "IRAs are essential for retirement savings, especially if your employer doesn't offer a 401(k). Tax-deferred or tax-free growth is powerful. You control investments (not limited to employer's menu). Contribution limits reset annually.",
    example: "Contribute $7,000 to a Roth IRA at age 25, earning 8% returns. By 65, it grows to $2.2 million — all tax-free. Same contribution to a taxable account: you'd owe 15-20% capital gains taxes, leaving you $1.8 million.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["roth-ira", "401k", "tax-deferred", "backdoor-roth", "roth-conversion"],
  },
  "interest-only-loan": {
    name: "Interest-Only Loan",
    definition: "A loan where you pay only interest for a set period (interest-only period), then principal plus interest after. Common in adjustable mortgages. Keeps payments low initially but you don't build equity during interest-only period.",
    whyItMatters: "Interest-only loans can be dangerous if you can't afford principal repayment after the initial period. Many people assumed they could refinance, then rates rose and they were trapped. Understand the full payment after interest-only ends.",
    example: "Get an interest-only mortgage on $400,000 at 4% for 5 years. Payments: $1,333 per month (interest only). No principal paid. After 5 years, if rates are 6%, new payment becomes $2,400+ per month for 25 years. Many people couldn't afford it.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
    ],
    relatedTerms: ["mortgage", "interest-rate", "amortization", "refinance", "arm"],
  },
  "large-cap-small-cap": {
    name: "Large-Cap / Small-Cap",
    definition: "Market capitalization categories. Large-cap: $10+ billion (Apple, Microsoft). Mid-cap: $2-10 billion. Small-cap: $300M-2B. Mega-cap: $200B+ (Apple, Saudi Aramco). Cap determines size and typically correlates with risk and volatility.",
    whyItMatters: "Cap size affects risk and returns. Large-caps are stable, small-caps more volatile but faster growing. A diversified portfolio mixes sizes. Young investors can handle small-cap volatility. Retirees typically prefer large-cap stability.",
    example: "Large-cap stock (Apple) $3T market cap: stable, 8-10% typical returns, 10% bad years. Small-cap biotech $500M cap: might return 30% or lose 40%. Over 30 years, small-cap volatility is worth the higher growth. Over 5 years, it's too risky.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
    ],
    relatedTerms: ["market-capitalization", "growth-stock", "volatility", "diversification", "index-fund"],
  },
  "leverage": {
    name: "Leverage",
    definition: "Using borrowed money to invest or purchase. Leverage amplifies returns but also losses. A mortgage is leverage (borrow to buy house). Margin trading is leverage (borrow to buy stocks). Leverage is powerful but dangerous.",
    whyItMatters: "Leverage can turn a 20% investment loss into 40% or more. 2008 financial crisis showed leverage danger — people lost homes using 2:1 or worse leverage. A mortgage at 4:1 leverage is reasonable. 10:1 margin trading is reckless.",
    example: "Buy $100k house with $20k down (5:1 leverage). House appreciates 10% equals $110k. Your equity gained 50% (gain of $10k on $20k equity). But if house depreciates 10% equals $90k. You've lost 50% of equity. Leverage cuts both ways.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
    ],
    relatedTerms: ["margin", "debt", "mortgage", "collateral", "interest-rate"],
  },
  "life-insurance": {
    name: "Life Insurance",
    definition: "Insurance paying a death benefit to your beneficiaries if you die. Term life (20-30 years, cheap) versus whole life (lifetime, expensive, includes cash value). Most people need term. If you're dependent-free, you might not need any.",
    whyItMatters: "If people depend on your income, life insurance is critical and cheap. Term life for $1M costs $30-50 per month for healthy 30-year-old. If you die, family doesn't lose the house. If you're single with no dependents, skip it.",
    example: "Have two kids and a $500k mortgage. Get $1M term life policy at $40 per month. If you die, family gets $1M tax-free, pays off mortgage, and has money to live on. If you live to 60, insurance was cheap and you protected your family.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["estate-planning", "disability-insurance", "beneficiary", "will", "dependent"],
  },
  "margin": {
    name: "Margin / Margin Trading",
    definition: "Borrowing money from your broker to buy stocks, amplifying gains and losses. Buy $100k of stocks with $50k of your money and $50k borrowed at 6% interest. A 10% gain equals 20% return on your cash. A 10% loss equals 20% loss on your cash.",
    whyItMatters: "Margin is dangerous for most investors. You can lose more than you invested. A 50% crash wipes you out and you still owe the broker. Margin calls force you to sell at the worst times. Only experienced investors should use margin.",
    example: "Have $50,000. Borrow $50,000 on margin (2:1), buy $100,000 of stock. Stock rises 20% equals $120,000. Profit equals $20,000 (40% return on your $50k). Stock falls 20% equals $80,000. Loss equals $20,000 (40% loss). Now you owe broker $50k plus interest.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["leverage", "collateral", "brokerage", "volatility", "risk"],
  },
  "market-capitalization": {
    name: "Market Capitalization",
    definition: "A company's total market value: stock price multiplied by shares outstanding. Apple at $200 per share with 15 billion shares equals $3 trillion market cap. Used to categorize companies (large-cap, small-cap, etc.) and gauge relative size.",
    whyItMatters: "Market cap helps you understand company size and risk. Smaller caps grow faster but are riskier. Larger caps are more stable. An index fund tracking market cap weights means you own more of the biggest companies (Apple, Microsoft).",
    example: "Company A: $50 stock × 100M shares equals $5B market cap. Company B: $100 stock × 50M shares equals $5B market cap. Same value, different share structure. Both are small-cap. Index fund weights them equally by value.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["large-cap-small-cap", "stock-split", "etf", "index-fund", "dividend"],
  },
  "minimum-payment": {
    name: "Minimum Payment",
    definition: "The smallest amount you can pay on a credit card and stay current. Usually 1-2% of balance or $25, whichever is higher. Paying minimum means you'll carry balance for years, paying tons of interest.",
    whyItMatters: "Minimum payments keep you in debt. A $10,000 balance at 18% APR with $250 minimum payment takes 5+ years to pay off and costs $4,000+ in interest. Pay significantly more to escape the trap.",
    example: "$10,000 credit card balance at 18% APR. Minimum $200 per month payment: takes 73 months ($14,600 paid). Pay $400 per month: takes 30 months ($12,000 paid). Doubling payment saves $2,600 and 43 months of payments.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["credit-card", "apr", "interest-rate", "grace-period", "credit-utilization"],
  },
  "money-market": {
    name: "Money Market Account",
    definition: "A savings account hybrid offering higher interest than regular savings but lower than CDs. Interest rates fluctuate. Often comes with a checkbook and debit card. FDIC insured up to $250k, making it very safe.",
    whyItMatters: "Money market accounts bridge savings accounts and CDs. Better rates than savings but more liquid than CDs (you can withdraw anytime). Good for emergency funds where you want higher rates than regular savings.",
    example: "Regular savings: 0.01% APY ($1 on $100k annually). Money market account: 4.5% APY ($4,500 on $100k). CD: 5% APY ($5,000) but locked for 12 months. Money market gives you nearly as much with full flexibility.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "Emergency Fund Calculator", href: "/tools/emergency-fund-calculator" },
    ],
    relatedTerms: ["savings-account", "apy", "cd", "liquidity", "emergency-fund"],
  },
  "net-income": {
    name: "Net Income",
    definition: "Your take-home income after all deductions: taxes, benefits, retirement contributions, health insurance. On a paycheck stub, it's what goes to your bank account. Gross income minus deductions equals net income.",
    whyItMatters: "Net income (not gross) is what you actually budget. A $100k gross salary might be $65k net. Budgeting with gross numbers leads to overspending. Lenders look at gross, but you live on net.",
    example: "Gross salary: $120,000. Minus: $18,000 federal tax, $9,180 FICA, $6,000 health insurance, $12,000 401k. Net income: ~$74,820 per year or ~$6,235 per month. You can spend/save the ~$6,235, not the gross $10,000 per month.",
    relatedTools: [
      { name: "Salary Breakdown Calculator", href: "/tools/salary-breakdown-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["gross-income", "w-2", "tax-bracket", "earned-income", "take-home-pay"],
  },
  "overdraft": {
    name: "Overdraft",
    definition: "Drawing more money from your account than you have, going negative. Banks allow overdrafts (for a fee, typically $25-35 per overdraft). Overdraft protection links to savings or credit line to prevent going negative.",
    whyItMatters: "Overdraft fees are expensive and avoidable. A single overdraft ($26 fee) is worse than a year of FDIC insured savings interest. Overdraft protection costs nothing. Check boxes to enable it.",
    example: "Account has $200. Write check for $250. You're overdrawn by $50. Bank charges $35 overdraft fee, leaving you at -$85 (owe bank $85). Next transaction incurs another fee. Overdraft fees cascade quickly.",
    relatedTools: [
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["bank-account", "fee", "credit-line", "emergency-fund", "balance"],
  },
  "pmi": {
    name: "PMI / Private Mortgage Insurance",
    definition: "Insurance protecting the lender if you default. Required if you put down less than 20%. Costs 0.5-1.5% of loan amount annually. You pay it as part of mortgage payment until equity reaches 20-22%.",
    whyItMatters: "PMI adds hundreds per month to your mortgage unnecessarily. A $350,000 mortgage with PMI costs $1,750-5,250 per year. You can avoid it by putting 20% down or getting it removed after 20% equity through appreciation.",
    example: "Buy $400k home with 10% down ($40k). Borrow $360k. PMI costs ~$360-540 per month. After 10 years of appreciation and payments, home is worth $500k and you've paid down to $280k (70% LTV). PMI is removed. Saved 5+ years of PMI by appreciation.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Rent vs Buy Calculator", href: "/tools/rent-vs-buy-calculator" },
    ],
    relatedTerms: ["down-payment", "mortgage", "home-equity", "closing-costs", "refinance"],
  },
  "power-of-attorney": {
    name: "Power of Attorney",
    definition: "A legal document allowing someone (agent/attorney-in-fact) to make financial, medical, or legal decisions for you. Durable power of attorney survives your incapacity. Healthcare power of attorney is for medical decisions.",
    whyItMatters: "Without POA, if you're incapacitated, your family needs a court order to access your finances (expensive and slow). With POA, your agent handles things immediately. Essential estate planning document.",
    example: "Create a durable power of attorney naming your spouse as agent. If you have a stroke and can't communicate, your spouse can pay bills, access bank accounts, and handle investments without going to court. POA costs $300-500.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["estate-planning", "will", "trust", "beneficiary", "healthcare-proxy"],
  },
  "pre-approval": {
    name: "Pre-Approval",
    definition: "A lender's conditional commitment to lend you a certain amount after verifying credit, income, and assets. For mortgages, pre-approval gets you a specific max amount. For credit cards, pre-approval means you're likely to get approved.",
    whyItMatters: "Mortgage pre-approval proves you're a serious buyer in real estate negotiations. Sellers are more likely to accept offers from pre-approved buyers. Shopping for pre-approvals (rate quotes) is free and doesn't hurt credit.",
    example: "Want to buy a house. Get pre-approved for $500k mortgage. You can confidently make offers on homes under $500k. Without pre-approval, sellers don't take your offer seriously.",
    relatedTools: [
      { name: "Mortgage Calculator", href: "/tools/mortgage-calculator" },
      { name: "Rent vs Buy Calculator", href: "/tools/rent-vs-buy-calculator" },
    ],
    relatedTerms: ["mortgage", "credit-score", "down-payment", "closing-costs", "debt-to-income-ratio"],
  },
  "qualified-dividend": {
    name: "Qualified Dividend",
    definition: "Dividend income taxed at lower capital gains rates (0%, 15%, or 20%) instead of ordinary income rates (up to 37%). Must hold stock for 60+ days around ex-dividend date. Most dividends from US corporations are qualified.",
    whyItMatters: "Qualified dividend treatment is huge. Earning $5,000 in qualified dividends costs ~$750 in taxes (15% rate) instead of $1,700 in ordinary income (37% bracket). Long-term dividend investing is tax-efficient.",
    example: "Hold Microsoft paying 3% dividend equals $3,000 on $100k. Qualified dividend rate: 15% equals $450 tax. If same income from a 1099 job: $3,000 at 37% equals $1,110 tax. Dividend qualified status saves $660 annually.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["dividend", "capital-gains", "long-term-capital-gains", "etf", "passive-income"],
  },
  "required-minimum-distribution": {
    name: "Required Minimum Distribution (RMD)",
    definition: "The minimum amount you must withdraw yearly from retirement accounts (traditional IRAs, 401k) after age 73. Calculated based on age and account balance. Failure to withdraw incurs a 25% penalty on the shortfall.",
    whyItMatters: "RMDs force you to withdraw and pay taxes on retirement savings even if you don't need the money. Planning is crucial. Roth IRAs have no RMDs, making them valuable for leaving legacy wealth.",
    example: "Age 75, have $1M traditional IRA. RMD tables require withdrawal of ~5% equals $50,000. You must withdraw and pay income tax. Roth IRA: no RMD. You can leave $2M to heirs tax-free.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["roth-ira", "traditional-ira", "401k", "tax-deferred", "estate-planning"],
  },
  "revolving-credit": {
    name: "Revolving Credit",
    definition: "Credit you can use repeatedly as you pay it off. Credit cards are revolving — you can charge, pay, then charge again using the same credit line. Opposite of installment credit (car loans, mortgages) that you pay down to zero.",
    whyItMatters: "Revolving credit is useful for flexibility but dangerous for overspending. It's easy to keep a balance and pay high interest. Credit utilization (how much you're using) heavily impacts credit scores.",
    example: "Credit card $10,000 limit. Month 1: charge $3,000, pay $2,000, owe $1,000. Month 2: charge $2,000, owe $3,000. Month 3: charge $4,000, owe $7,000. You can keep revolving as long as you don't exceed $10,000 limit.",
    relatedTools: [
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
    ],
    relatedTerms: ["credit-card", "credit-utilization", "credit-score", "grace-period", "minimum-payment"],
  },
  "roth-conversion": {
    name: "Roth Conversion",
    definition: "Converting pre-tax money from a traditional IRA or 401k into a Roth IRA. You pay taxes in the conversion year, but then everything grows tax-free. Useful for high-income earners and early retirees in low-income years.",
    whyItMatters: "Roth conversions let you access tax-free growth even if you've maxed out Roth contributions. During career breaks or low-income years, converting is powerful. At age 59.5+, you can access converted funds without penalty.",
    example: "Take a sabbatical, earn $30k, normally in 22% bracket. Convert $100k from IRA to Roth. Conversion income pushes you to $130k, about 24% bracket equals $24k tax. But that $100k grows tax-free forever. If it becomes $500k, you avoided $80k+ in future taxes.",
    relatedTools: [
      { name: "FIRE Calculator", href: "/tools/fire-calculator" },
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
    ],
    relatedTerms: ["roth-ira", "traditional-ira", "backdoor-roth", "tax-bracket", "tax-deferred"],
  },
  "simple-interest": {
    name: "Simple Interest",
    definition: "Interest calculated only on the principal, not on accumulated interest. Simple interest equals Principal × Rate × Time. A $1,000 loan at 5% simple interest for 3 years equals $1,000 × 0.05 × 3 equals $150 interest. Opposite of compound interest.",
    whyItMatters: "Simple interest is rare in modern finance. Most loans and investments use compound interest. But understanding simple interest teaches how interest works before compounding complicates it.",
    example: "$10,000 at 5% simple interest for 10 years: $10,000 × 0.05 × 10 equals $5,000 interest equals $15,000 total. Same amount with 5% compound annually: $16,289. Compounding beats simple interest.",
    relatedTools: [
      { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator" },
      { name: "Debt Payoff Calculator", href: "/tools/debt-payoff-calculator" },
    ],
    relatedTerms: ["compound-interest", "apy", "apr", "interest-rate", "yield"],
  },
  "stock-split": {
    name: "Stock Split",
    definition: "When a company divides its shares into more shares at proportionally lower prices. 2:1 split means each share becomes 2 shares at half price. Your ownership percentage doesn't change, just the number of shares. Reverse splits consolidate shares.",
    whyItMatters: "Splits don't change your ownership or value, just share count. Company might split to lower share price (looks cheaper) or attract retail investors. A reverse split (1:10) usually signals trouble (stock too cheap).",
    example: "Own 100 shares at $500 per share equals $50,000. Company does 2:1 split. Now you own 200 shares at $250 per share equals $50,000. Nothing changed except share count. Your $50,000 investment still equals $50,000.",
    relatedTools: [
      { name: "Investment Comparison Tool", href: "/tools/investment-comparison" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["stock", "dividend", "market-capitalization", "volatility", "capital-gains"],
  },
  "tax-credit-vs-deduction": {
    name: "Tax Credit vs Tax Deduction",
    definition: "Deduction reduces taxable income (if you're in 24% bracket, $1k deduction saves $240). Credit directly reduces tax owed ($1 credit equals $1 less tax). Credits are more valuable. Earned Income Tax Credit (EITC) is common credit.",
    whyItMatters: "Not understanding the difference costs money. A $1,000 tax credit is worth $240-370 depending on bracket. A $1,000 deduction is worth $240-370. Credits are always better. Some are refundable (you get money back).",
    example: "Owe $5,000 in taxes. $1,000 deduction in 24% bracket reduces it to $4,760. $1,000 credit reduces it directly to $4,000. Credit saves $240 more. If credit is refundable, you get the full $1,000.",
    relatedTools: [
      { name: "Budget Calculator", href: "/tools/budget-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["income-tax", "tax-bracket", "standard-deduction", "earned-income", "w-2"],
  },
  "umbrella-insurance": {
    name: "Umbrella Insurance",
    definition: "Additional liability insurance covering lawsuits exceeding your home and auto insurance limits. Provides $1M+ protection for ~$100-200 per year. Protects assets if someone sues you for a serious injury on your property.",
    whyItMatters: "If you own assets (home, investments, high income), umbrella insurance is cheap protection. A $5M lawsuit could wipe out your net worth without it. Most people overlook it but it's essential.",
    example: "Someone gets injured at your house, sues for $1M. Home insurance covers $300k. Umbrella insurance covers the remaining $700k. Without umbrella, you pay $700k from your pocket.",
    relatedTools: [
      { name: "Net Worth Calculator", href: "/tools/net-worth-calculator" },
      { name: "Financial Health Score", href: "/tools/financial-health-score" },
    ],
    relatedTerms: ["homeowners-insurance", "auto-insurance", "liability", "asset-protection", "estate-planning"],
  },
};

export default glossaryData;
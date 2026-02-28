"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── MASCOT SVG — "Pulsi" the friendly finance buddy ───
function Mascot({ mood = "happy", size = 80, style: s = {} }) {
  const bodyColor = "#f0c040";
  const cheekColor = "#FFB6C1";
  // Eye states
  const happyEyes = true;
  const isWow = mood === "wow";
  const isWrong = mood === "wrong";
  const isThinking = mood === "thinking";

  return (
    <div style={{ width: size, height: size, position: "relative", ...s }}>
      <svg viewBox="0 0 120 120" width={size} height={size}>
        {/* Shadow */}
        <ellipse cx="60" cy="112" rx="30" ry="5" fill="rgba(0,0,0,0.1)" />

        {/* Body - round and friendly */}
        <circle cx="60" cy="58" r="46" fill={bodyColor} />
        <circle cx="60" cy="58" r="43" fill="#F5CF52" />

        {/* Ears - little round ears */}
        <circle cx="28" cy="26" r="12" fill={bodyColor} />
        <circle cx="28" cy="26" r="8" fill="#F5CF52" />
        <circle cx="92" cy="26" r="12" fill={bodyColor} />
        <circle cx="92" cy="26" r="8" fill="#F5CF52" />

        {/* Belly highlight */}
        <ellipse cx="60" cy="68" rx="28" ry="24" fill="#FBE08A" opacity="0.6" />

        {/* Cheeks */}
        <circle cx="34" cy="66" r="8" fill={cheekColor} opacity="0.4" />
        <circle cx="86" cy="66" r="8" fill={cheekColor} opacity="0.4" />

        {/* Eyes */}
        {isWrong ? (
          <>
            <line x1="42" y1="46" x2="52" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
            <line x1="52" y1="46" x2="42" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
            <line x1="68" y1="46" x2="78" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="46" x2="68" y2="56" stroke="#5D4E37" strokeWidth="3" strokeLinecap="round" />
          </>
        ) : isThinking ? (
          <>
            {/* Thinking - looking up */}
            <circle cx="47" cy="48" r="9" fill="white" />
            <circle cx="73" cy="48" r="9" fill="white" />
            <circle cx="49" cy="45" r="5" fill="#3D2E1C" />
            <circle cx="75" cy="45" r="5" fill="#3D2E1C" />
            <circle cx="50.5" cy="43.5" r="1.8" fill="white" />
            <circle cx="76.5" cy="43.5" r="1.8" fill="white" />
          </>
        ) : (
          <>
            {/* Happy / Wow - big sparkly eyes */}
            <circle cx="47" cy="50" r={isWow ? 11 : 9} fill="white" />
            <circle cx="73" cy="50" r={isWow ? 11 : 9} fill="white" />
            <circle cx="47" cy={isWow ? 49 : 51} r={isWow ? 7 : 5} fill="#3D2E1C" />
            <circle cx="73" cy={isWow ? 49 : 51} r={isWow ? 7 : 5} fill="#3D2E1C" />
            {/* Eye shine */}
            <circle cx="49.5" cy={isWow ? 46 : 48} r="2" fill="white" />
            <circle cx="75.5" cy={isWow ? 46 : 48} r="2" fill="white" />
            {isWow && <>
              <circle cx="44" cy="52" r="1.2" fill="white" />
              <circle cx="70" cy="52" r="1.2" fill="white" />
            </>}
          </>
        )}

        {/* Eyebrows */}
        {isThinking && (
          <>
            <line x1="40" y1="36" x2="54" y2="34" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="66" y1="34" x2="80" y2="36" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
        {isWrong && (
          <>
            <line x1="38" y1="38" x2="54" y2="42" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="66" y1="42" x2="82" y2="38" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {/* Nose - tiny dot */}
        <circle cx="60" cy="62" r="2" fill="#D4A017" />

        {/* Mouth */}
        {isWow ? (
          <circle cx="60" cy="72" r="6" fill="#3D2E1C" />
        ) : isWrong ? (
          <path d="M 50 76 Q 60 70 70 76" fill="none" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
        ) : (
          <path d="M 50 72 Q 60 82 70 72" fill="none" stroke="#5D4E37" strokeWidth="2.5" strokeLinecap="round" />
        )}

        {/* Arms - little stubby arms */}
        <ellipse cx="18" cy="68" rx="8" ry="5" fill={bodyColor} transform="rotate(-20 18 68)" />
        <ellipse cx="102" cy="68" rx="8" ry="5" fill={bodyColor} transform="rotate(20 102 68)" />
        {isWow && (
          <>
            <ellipse cx="15" cy="58" rx="8" ry="5" fill={bodyColor} transform="rotate(-50 15 58)" />
            <ellipse cx="105" cy="58" rx="8" ry="5" fill={bodyColor} transform="rotate(50 105 58)" />
          </>
        )}

        {/* Feet */}
        <ellipse cx="45" cy="100" rx="10" ry="6" fill={bodyColor} />
        <ellipse cx="75" cy="100" rx="10" ry="6" fill={bodyColor} />

        {/* Small $ on belly */}
        <text x="60" y="78" textAnchor="middle" fontSize="14" fill="#D4A017" fontWeight="bold" fontFamily="monospace" opacity="0.35">$</text>
      </svg>
      {isWow && (
        <>
          <div style={{ position: "absolute", top: 0, right: 2, fontSize: size * 0.2, animation: "popIn 0.3s ease" }}>✨</div>
          <div style={{ position: "absolute", top: 8, left: 0, fontSize: size * 0.15, animation: "popIn 0.4s ease" }}>⭐</div>
        </>
      )}
    </div>
  );
}

// ─── QUESTION BANK ───
const COURSES = [
  {
    id: "budgeting",
    title: "Budgeting Basics",
    icon: "📋",
    color: "#2ecc71",
    desc: "Master the foundation of all financial health",
    lessons: [
      {
        title: "Why Budget?",
        questions: [
          { q: "What is a budget?", type: "choice", options: ["A plan for how you'll spend your money", "A list of things you can't buy", "A government tax document", "A type of savings account"], answer: 0, explain: "A budget is simply a plan that allocates your income toward expenses, savings, and goals." },
          { q: "The 50/30/20 rule suggests spending 50% on needs, 30% on wants, and 20% on ___.", type: "fill", answer: "savings", accept: ["savings", "saving", "savings/investments", "saving and investing"], explain: "The 50/30/20 rule allocates 20% of after-tax income to savings and debt repayment." },
          { q: "True or False: You need a high income to benefit from budgeting.", type: "tf", answer: false, explain: "Budgeting helps at every income level. In fact, it's most impactful when money is tight." },
          { q: "Which is NOT a benefit of budgeting?", type: "choice", options: ["Reduces financial stress", "Helps reach savings goals", "Guarantees higher income", "Prevents overspending"], answer: 2, explain: "Budgeting helps manage money better but doesn't directly increase your income." },
          { q: "What should you do FIRST when creating a budget?", type: "choice", options: ["Set investment goals", "Track your current spending", "Open a savings account", "Cut all subscriptions"], answer: 1, explain: "Before you can plan, you need to know where your money actually goes. Track spending first." },
        ],
      },
      {
        title: "Tracking Spending",
        questions: [
          { q: "Which expense category typically takes the biggest share of a budget?", type: "choice", options: ["Entertainment", "Housing", "Food", "Transportation"], answer: 1, explain: "Housing (rent or mortgage) is typically the largest expense at 25-35% of income." },
          { q: "A 'fixed expense' is one that ___.", type: "choice", options: ["Changes every month", "Stays the same each month", "Is optional", "Is tax deductible"], answer: 1, explain: "Fixed expenses like rent and car payments stay consistent. Variable expenses like groceries fluctuate." },
          { q: "True or False: Small daily purchases can significantly impact your budget over a year.", type: "tf", answer: true, explain: "$5/day = $1,825/year. Small leaks sink big ships." },
          { q: "What is 'lifestyle creep'?", type: "choice", options: ["Moving to a cheaper apartment", "Gradually spending more as income rises", "A type of credit card fee", "Reducing expenses over time"], answer: 1, explain: "Lifestyle creep happens when raises lead to higher spending instead of higher saving." },
          { q: "True or False: You should review and adjust your budget at least once a month.", type: "tf", answer: true, explain: "A budget isn't set-and-forget. Monthly reviews help you stay on track and adapt to changes." },
        ],
      },
      {
        title: "Budgeting Methods",
        questions: [
          { q: "In zero-based budgeting, every dollar is assigned a ___.", type: "fill", answer: "job", accept: ["job", "purpose", "category", "task"], explain: "Zero-based budgeting means income minus expenses equals zero — every dollar has a purpose." },
          { q: "The 'envelope method' involves:", type: "choice", options: ["Mailing payments to creditors", "Putting cash in category envelopes", "Saving all receipts in envelopes", "Using digital banking only"], answer: 1, explain: "The envelope method uses physical cash divided into spending categories to prevent overspending." },
          { q: "Which budgeting approach is best for beginners?", type: "choice", options: ["Zero-based (track every dollar)", "50/30/20 (simple percentages)", "Reverse budgeting (save first)", "All can work — pick one you'll stick with"], answer: 3, explain: "The best budget is one you'll actually follow. Any method works if you're consistent." },
          { q: "True or False: 'Pay yourself first' means saving before paying bills.", type: "tf", answer: true, explain: "Pay yourself first means automating savings transfers on payday before discretionary spending." },
          { q: "'Reverse budgeting' prioritizes ___ over tracking every expense.", type: "fill", answer: "saving", accept: ["saving", "savings", "saving first", "paying yourself first"], explain: "Reverse budgeting: save your target amount first, then spend the rest guilt-free." },
        ],
      },
    ],
  },
  {
    id: "emergency",
    title: "Emergency Fund",
    icon: "🛡️",
    color: "#3498db",
    desc: "Build your financial safety net",
    lessons: [
      {
        title: "Why You Need One",
        questions: [
          { q: "How many months of expenses should an emergency fund cover?", type: "choice", options: ["1 month", "3-6 months", "12 months", "24 months"], answer: 1, explain: "3-6 months is the standard recommendation. More if self-employed or single income." },
          { q: "True or False: An emergency fund should be invested in stocks for growth.", type: "tf", answer: false, explain: "Emergency funds need to be liquid and safe — a high-yield savings account is ideal, not stocks." },
          { q: "Which is a TRUE emergency?", type: "choice", options: ["A sale on a new TV", "Car breakdown needed for work", "A vacation deal expiring soon", "New phone model released"], answer: 1, explain: "Emergencies are unexpected, necessary expenses — not wants or planned purchases." },
          { q: "A high-yield savings account typically pays ___ times more than a traditional savings account.", type: "choice", options: ["2x", "5x", "10x or more", "The same"], answer: 2, explain: "Traditional savings: ~0.01-0.05%. High-yield savings: 4-5%. That's 80-500x more." },
          { q: "What's the first milestone to aim for when building an emergency fund?", type: "choice", options: ["$100", "$1,000", "$10,000", "6 months expenses"], answer: 1, explain: "$1,000 covers most minor emergencies and gives you breathing room to build more." },
        ],
      },
      {
        title: "Building Your Fund",
        questions: [
          { q: "What's the best way to build an emergency fund?", type: "choice", options: ["Wait for a windfall", "Automate regular transfers", "Only save what's left over", "Borrow when emergencies happen"], answer: 1, explain: "Automating transfers on payday makes saving consistent and removes the temptation to skip." },
          { q: "True or False: You should fully pay off all debt before starting an emergency fund.", type: "tf", answer: false, explain: "Start with a small emergency fund ($1,000) first, then attack debt. Without it, emergencies become new debt." },
          { q: "Where should you keep your emergency fund?", type: "choice", options: ["Under your mattress", "Checking account", "High-yield savings account", "Cryptocurrency"], answer: 2, explain: "HYSA: earns 4%+, FDIC insured, accessible within 1-2 days. Perfect balance of safety and returns." },
          { q: "If you use your emergency fund, what should you do next?", type: "choice", options: ["Celebrate spending it wisely", "Replenish it as soon as possible", "Switch to a credit card instead", "Don't worry about refilling it"], answer: 1, explain: "The fund did its job! Now rebuild it so you're protected for the next emergency." },
          { q: "True or False: Your emergency fund amount should increase as your expenses increase.", type: "tf", answer: true, explain: "If your monthly expenses go from $3K to $5K, your 3-month fund goes from $9K to $15K." },
        ],
      },
    ],
  },
  {
    id: "debt",
    title: "Conquering Debt",
    icon: "💳",
    color: "#e74c3c",
    desc: "Strategies to eliminate debt faster",
    lessons: [
      {
        title: "Good vs Bad Debt",
        questions: [
          { q: "Which is generally considered 'good debt'?", type: "choice", options: ["Credit card debt", "Payday loans", "A reasonable mortgage", "Store financing at 29% APR"], answer: 2, explain: "Good debt finances appreciating assets (home, education) at reasonable rates. Bad debt funds consumption at high rates." },
          { q: "True or False: All debt is bad and should be avoided completely.", type: "tf", answer: false, explain: "Strategic, low-interest debt (mortgage, student loans) can build wealth. High-interest consumer debt is destructive." },
          { q: "What does APR stand for?", type: "fill", answer: "annual percentage rate", accept: ["annual percentage rate", "annual percent rate"], explain: "APR is the yearly interest rate charged on borrowed money, including fees." },
          { q: "A credit card with 24% APR means you pay roughly ___% per month on your balance.", type: "choice", options: ["0.5%", "1%", "2%", "24%"], answer: 2, explain: "24% APR ÷ 12 months = 2% per month. On a $5,000 balance, that's $100/month in interest alone." },
          { q: "True or False: Making only minimum payments is a good strategy for credit card debt.", type: "tf", answer: false, explain: "Minimum payments are designed to maximize interest. An $8K balance at 22% takes 30+ years with minimums." },
        ],
      },
      {
        title: "Payoff Strategies",
        questions: [
          { q: "The 'avalanche method' targets debt with the highest ___.", type: "fill", answer: "interest rate", accept: ["interest rate", "interest", "apr", "rate"], explain: "Avalanche = highest interest first. Saves the most money mathematically." },
          { q: "The 'snowball method' targets debt with the smallest ___.", type: "fill", answer: "balance", accept: ["balance", "amount", "debt"], explain: "Snowball = smallest balance first. Gives quick wins that build motivation." },
          { q: "Which method saves more money in total interest?", type: "choice", options: ["Snowball", "Avalanche", "They're exactly the same", "Neither — just pay minimums"], answer: 1, explain: "Avalanche always saves more in interest. Snowball wins on psychology. Both beat minimums." },
          { q: "True or False: Balance transfer cards can help pay off debt faster.", type: "tf", answer: true, explain: "A 0% APR balance transfer stops interest, letting 100% of payments go to principal. But watch the transfer fee." },
          { q: "Debt consolidation combines multiple debts into:", type: "choice", options: ["More debts", "One payment at ideally a lower rate", "A government program", "A charity donation"], answer: 1, explain: "Consolidation simplifies payments and can lower your rate, making payoff faster and cheaper." },
        ],
      },
    ],
  },
  {
    id: "credit",
    title: "Credit Scores",
    icon: "📊",
    color: "#9b59b6",
    desc: "Understand and improve your credit",
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
    ],
  },
  {
    id: "investing",
    title: "Investing 101",
    icon: "📈",
    color: "#f0c040",
    desc: "Grow your wealth in the stock market",
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
    ],
  },
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
    ],
  },
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
    ],
  },
  {
    id: "realestate",
    title: "Real Estate",
    icon: "🏠",
    color: "#8e44ad",
    desc: "Navigate buying, renting, and property",
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
    ],
  },
];

// ─── PROGRESS HELPERS ───
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem("pulsafi-learn") || "null") || {
      stars: {}, // { "budgeting-0": 3, "budgeting-1": 2 }
      streak: 0,
      longestStreak: 0,
      lastPlayDate: null,
      totalLessonsCompleted: 0,
      totalCorrect: 0,
      totalAnswered: 0,
      xp: 0,
      level: 1,
    };
  } catch { return { stars: {}, streak: 0, longestStreak: 0, lastPlayDate: null, totalLessonsCompleted: 0, totalCorrect: 0, totalAnswered: 0, xp: 0, level: 1 }; }
}

function saveProgress(p) {
  try { localStorage.setItem("pulsafi-learn", JSON.stringify(p)); } catch {}
}

function getLevel(xp) {
  const levels = [0, 100, 250, 500, 800, 1200, 1800, 2500, 3500, 5000, 7000, 10000];
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i]) return { level: i + 1, current: xp - levels[i], needed: (levels[i + 1] || levels[i] + 3000) - levels[i] };
  }
  return { level: 1, current: 0, needed: 100 };
}

// ─── MAIN COMPONENT ───
export default function LearnPathPage() {
  const [progress, setProgress] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null); // { courseId, lessonIdx }
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [fillInput, setFillInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [lessonCorrect, setLessonCorrect] = useState(0);
  const [lessonTotal, setLessonTotal] = useState(0);
  const [mascotMood, setMascotMood] = useState("happy");
  const [showComplete, setShowComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const p = loadProgress();
    // Check streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (p.lastPlayDate && p.lastPlayDate !== today && p.lastPlayDate !== yesterday) {
      p.streak = 0; // Streak broken
    }
    setProgress(p);
  }, []);

  const updateProgress = useCallback((updates) => {
    setProgress(prev => {
      const next = { ...prev, ...updates };
      saveProgress(next);
      return next;
    });
  }, []);

  if (!mounted || !progress) return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)" }}>
      <Header /><div style={{ padding: 80, textAlign: "center", color: "var(--text-muted)" }}>Loading...</div>
    </div>
  );

  const levelInfo = getLevel(progress.xp);

  // ── Lesson logic ──
  const startLesson = (courseId, lessonIdx) => {
    setActiveLesson({ courseId, lessonIdx });
    setQIdx(0);
    setSelected(null);
    setFillInput("");
    setAnswered(false);
    setLessonCorrect(0);
    setLessonTotal(0);
    setMascotMood("happy");
    setShowComplete(false);
  };

  const getCourse = () => COURSES.find(c => c.id === activeLesson?.courseId);
  const getLesson = () => getCourse()?.lessons[activeLesson?.lessonIdx];
  const getQuestion = () => getLesson()?.questions[qIdx];

  const checkAnswer = () => {
    const q = getQuestion();
    if (!q) return;
    let isCorrect = false;
    if (q.type === "choice") isCorrect = selected === q.answer;
    else if (q.type === "tf") isCorrect = selected === q.answer;
    else if (q.type === "fill") isCorrect = q.accept.some(a => fillInput.trim().toLowerCase() === a.toLowerCase());

    setCorrect(isCorrect);
    setAnswered(true);
    setLessonTotal(lessonTotal + 1);
    if (isCorrect) {
      setLessonCorrect(lessonCorrect + 1);
      setMascotMood("wow");
    } else {
      setMascotMood("wrong");
    }
  };

  const nextQuestion = () => {
    const lesson = getLesson();
    if (qIdx + 1 >= lesson.questions.length) {
      // Lesson complete
      const pct = (lessonCorrect + (correct ? 0 : 0)) / lesson.questions.length;
      const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : 1;
      const key = `${activeLesson.courseId}-${activeLesson.lessonIdx}`;
      const prevStars = progress.stars[key] || 0;
      const xpGained = stars * 20 + (correct ? 10 : 0);
      const today = new Date().toDateString();
      const isNewDay = progress.lastPlayDate !== today;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const streakContinues = progress.lastPlayDate === yesterday || progress.lastPlayDate === today;
      const newStreak = isNewDay ? (streakContinues ? progress.streak + 1 : 1) : progress.streak;

      updateProgress({
        stars: { ...progress.stars, [key]: Math.max(prevStars, stars) },
        totalLessonsCompleted: progress.totalLessonsCompleted + 1,
        totalCorrect: progress.totalCorrect + lessonCorrect + (correct ? 1 : 0),
        totalAnswered: progress.totalAnswered + lesson.questions.length,
        xp: progress.xp + xpGained,
        streak: newStreak,
        longestStreak: Math.max(progress.longestStreak, newStreak),
        lastPlayDate: today,
      });
      setMascotMood("happy");
      setShowComplete({ stars, xp: xpGained, correct: lessonCorrect + (correct ? 1 : 0), total: lesson.questions.length });
    } else {
      setQIdx(qIdx + 1);
      setSelected(null);
      setFillInput("");
      setAnswered(false);
      setMascotMood("thinking");
    }
  };

  const exitLesson = () => {
    setActiveLesson(null);
    setShowComplete(false);
  };

  // ── Check if lesson is unlocked ──
  const isLessonUnlocked = (courseIdx, lessonIdx) => {
    if (courseIdx === 0 && lessonIdx === 0) return true;
    // Previous lesson in same course
    if (lessonIdx > 0) {
      const key = `${COURSES[courseIdx].id}-${lessonIdx - 1}`;
      return (progress.stars[key] || 0) > 0;
    }
    // First lesson of new course — need at least 1 star on last lesson of previous course
    const prevCourse = COURSES[courseIdx - 1];
    const key = `${prevCourse.id}-${prevCourse.lessons.length - 1}`;
    return (progress.stars[key] || 0) > 0;
  };

  // ═══════════════════════════════
  // LESSON VIEW
  // ═══════════════════════════════
  if (activeLesson && !showComplete) {
    const lesson = getLesson();
    const q = getQuestion();
    if (!lesson || !q) return null;

    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

        <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 24px 80px" }}>
          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <button onClick={exitLesson} style={{ background: "transparent", border: "none", fontSize: 22, cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>✕</button>
            <div style={{ flex: 1, height: 10, background: "var(--bg-input)", borderRadius: 5, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 5, transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                width: `${((qIdx + (answered ? 1 : 0)) / lesson.questions.length) * 100}%`,
                background: `linear-gradient(90deg, ${getCourse().color}, ${getCourse().color}aa)`,
              }} />
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "'DM Mono', monospace", minWidth: 40 }}>
              {qIdx + 1}/{lesson.questions.length}
            </div>
          </div>

          {/* Mascot */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <Mascot mood={mascotMood} size={70} />
          </div>

          {/* Question */}
          <div style={{
            background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
            padding: "28px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>
            <h2 style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.4, margin: "0 0 20px", textAlign: "center" }}>{q.q}</h2>

            {/* Choice questions */}
            {q.type === "choice" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {q.options.map((opt, i) => {
                  let bg = "var(--bg-input)", border = "var(--border-input)", color = "var(--text-primary)";
                  if (answered) {
                    if (i === q.answer) { bg = "rgba(46,204,113,0.15)"; border = "#2ecc71"; color = "#2ecc71"; }
                    else if (i === selected && i !== q.answer) { bg = "rgba(231,76,60,0.15)"; border = "#e74c3c"; color = "#e74c3c"; }
                  } else if (i === selected) { bg = "var(--accent-bg)"; border = "var(--accent)"; }
                  return (
                    <button key={i} onClick={() => !answered && setSelected(i)} disabled={answered} style={{
                      width: "100%", textAlign: "left", padding: "14px 18px", background: bg,
                      border: `2px solid ${border}`, borderRadius: 12, cursor: answered ? "default" : "pointer",
                      color, fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: selected === i || (answered && i === q.answer) ? 600 : 400,
                      transition: "all 0.2s",
                    }}>{opt}</button>
                  );
                })}
              </div>
            )}

            {/* True/False */}
            {q.type === "tf" && (
              <div style={{ display: "flex", gap: 12 }}>
                {[true, false].map(val => {
                  let bg = "var(--bg-input)", border = "var(--border-input)", color = "var(--text-primary)";
                  if (answered) {
                    if (val === q.answer) { bg = "rgba(46,204,113,0.15)"; border = "#2ecc71"; color = "#2ecc71"; }
                    else if (val === selected && val !== q.answer) { bg = "rgba(231,76,60,0.15)"; border = "#e74c3c"; color = "#e74c3c"; }
                  } else if (val === selected) { bg = "var(--accent-bg)"; border = "var(--accent)"; }
                  return (
                    <button key={String(val)} onClick={() => !answered && setSelected(val)} disabled={answered} style={{
                      flex: 1, padding: "16px", textAlign: "center", background: bg,
                      border: `2px solid ${border}`, borderRadius: 12, cursor: answered ? "default" : "pointer",
                      color, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                    }}>{val ? "✓ True" : "✗ False"}</button>
                  );
                })}
              </div>
            )}

            {/* Fill in blank */}
            {q.type === "fill" && (
              <div style={{ textAlign: "center" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", background: answered ? (correct ? "rgba(46,204,113,0.1)" : "rgba(231,76,60,0.1)") : "var(--bg-input)",
                  borderRadius: 12, border: `2px solid ${answered ? (correct ? "#2ecc71" : "#e74c3c") : "var(--accent-border)"}`,
                  padding: "12px 20px", minWidth: 240,
                }}>
                  <input
                    type="text" value={fillInput} onChange={e => !answered && setFillInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && fillInput.trim() && !answered) checkAnswer(); }}
                    placeholder="Type your answer..."
                    disabled={answered}
                    style={{
                      background: "transparent", border: "none", outline: "none", textAlign: "center",
                      color: answered ? (correct ? "#2ecc71" : "#e74c3c") : "var(--text-primary)",
                      fontSize: 18, fontWeight: 600, fontFamily: "'DM Mono', monospace", width: "100%",
                    }}
                  />
                </div>
                {answered && !correct && (
                  <div style={{ marginTop: 8, fontSize: 14, color: "#2ecc71", fontWeight: 600 }}>
                    Answer: {q.accept[0]}
                  </div>
                )}
              </div>
            )}

            {/* Explanation */}
            {answered && (
              <div style={{
                marginTop: 16, padding: "14px 16px", borderRadius: 12,
                background: correct ? "rgba(46,204,113,0.08)" : "rgba(231,76,60,0.08)",
                border: `1px solid ${correct ? "#2ecc7133" : "#e74c3c33"}`,
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: correct ? "#2ecc71" : "#e74c3c", marginBottom: 4 }}>
                  {correct ? "✓ Correct!" : "✗ Not quite"}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{q.explain}</div>
              </div>
            )}

            {/* Action Button */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              {!answered ? (
                <button onClick={checkAnswer} disabled={selected === null && !fillInput.trim()} style={{
                  background: (selected !== null || fillInput.trim()) ? "linear-gradient(135deg, var(--accent), var(--accent-dark))" : "var(--bg-input)",
                  border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                  color: (selected !== null || fillInput.trim()) ? "#0d0f13" : "var(--text-faint)",
                  cursor: (selected !== null || fillInput.trim()) ? "pointer" : "default",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                }}>Check</button>
              ) : (
                <button onClick={nextQuestion} style={{
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                  color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                }}>{qIdx + 1 >= getLesson().questions.length ? "Finish" : "Continue"}</button>
              )}
            </div>
          </div>
        </div>
        <style jsx global>{`@keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }`}</style>
      </div>
    );
  }

  // ═══════════════════════════════
  // LESSON COMPLETE
  // ═══════════════════════════════
  if (showComplete) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "60px 24px 80px", textAlign: "center", animation: "fadeIn 0.5s ease" }}>
          <Mascot mood="wow" size={100} style={{ margin: "0 auto 24px" }} />
          <h2 style={{ fontSize: 28, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px" }}>Lesson Complete!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>{getLesson()?.title} — {getCourse()?.title}</p>

          {/* Stars */}
          <div style={{ fontSize: 48, letterSpacing: 8, marginBottom: 20 }}>
            {[1, 2, 3].map(s => (
              <span key={s} style={{ opacity: s <= showComplete.stars ? 1 : 0.2, transition: "opacity 0.3s", transitionDelay: `${s * 0.2}s` }}>⭐</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28 }}>
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px 24px", border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#2ecc71", fontFamily: "'DM Mono', monospace" }}>{showComplete.correct}/{showComplete.total}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Correct</div>
            </div>
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px 24px", border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>+{showComplete.xp}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>XP Earned</div>
            </div>
            <div style={{ background: "var(--bg-card)", borderRadius: 14, padding: "16px 24px", border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#e67e22", fontFamily: "'DM Mono', monospace" }}>🔥 {progress.streak}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Streak</div>
            </div>
          </div>

          <button onClick={exitLesson} style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            border: "none", borderRadius: 14, padding: "16px 48px", fontSize: 16, fontWeight: 700,
            color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            boxShadow: "0 4px 24px rgba(240,192,64,0.3)",
          }}>Continue Learning →</button>
        </div>
        <style jsx global>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    );
  }


  // ═══════════════════════════════
  // RIVER RAPIDS MAP VIEW
  // ═══════════════════════════════
  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
  const maxStars = COURSES.reduce((s, c) => s + c.lessons.length * 3, 0);

  const allNodes = [];
  let globalIdx = 0;
  COURSES.forEach((course, ci) => {
    course.lessons.forEach((lesson, li) => {
      const key = `${course.id}-${li}`;
      const stars = progress.stars[key] || 0;
      const unlocked = isLessonUnlocked(ci, li);
      const completed = stars > 0;
      const isFirstInCourse = li === 0;
      allNodes.push({ course, ci, lesson, li, key, stars, unlocked, completed, isFirstInCourse, globalIdx: globalIdx++ });
    });
  });

  const activeNodeIdx = allNodes.findIndex(n => n.unlocked && !n.completed);

  const RW = 460;
  const GAP = 155;
  const stops = allNodes.map((_, i) => {
    const cycle = i % 4;
    const xPct = cycle === 0 ? 0.3 : cycle === 1 ? 0.7 : cycle === 2 ? 0.62 : 0.38;
    return { x: xPct * RW, y: 90 + i * GAP };
  });
  const totalH = stops.length > 0 ? stops[stops.length - 1].y + 220 : 500;

  // River center path
  let riverPath = `M ${RW / 2} 0`;
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const pY = i === 0 ? 0 : stops[i - 1].y;
    const pX = i === 0 ? RW / 2 : stops[i - 1].x;
    const cpY = (pY + s.y) / 2;
    riverPath += ` C ${pX} ${cpY}, ${s.x} ${cpY}, ${s.x} ${s.y}`;
  }
  const last = stops[stops.length - 1];
  riverPath += ` C ${last.x} ${totalH - 100}, ${RW / 2} ${totalH - 50}, ${RW / 2} ${totalH}`;

  // Completed path
  let completedPath = "";
  if (activeNodeIdx > 0) {
    completedPath = `M ${RW / 2} 0`;
    for (let i = 0; i <= Math.min(activeNodeIdx, stops.length - 1); i++) {
      const s = stops[i];
      const pY = i === 0 ? 0 : stops[i - 1].y;
      const pX = i === 0 ? RW / 2 : stops[i - 1].x;
      const cpY = (pY + s.y) / 2;
      completedPath += ` C ${pX} ${cpY}, ${s.x} ${cpY}, ${s.x} ${s.y}`;
    }
  }

  const raftIdx = activeNodeIdx >= 0 ? activeNodeIdx : 0;
  const raft = stops[raftIdx] || { x: RW / 2, y: 90 };
  const pulsiMsg = activeNodeIdx <= 0 ? "Let's ride! 🏄" :
    activeNodeIdx <= 3 ? "Smooth sailing! 🌊" :
    activeNodeIdx <= 7 ? "Rapids ahead! 💪" :
    activeNodeIdx <= 11 ? "Almost there! 🎯" : "Finance pro! 🏆";

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #06101c 0%, #0a1a30 50%, #06101c 100%)", color: "#fff", fontFamily: "'DM Sans', sans-serif", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 820, margin: "0 auto", padding: "24px 12px 80px" }}>

        {/* Stats Bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
          background: "rgba(10,26,48,0.9)", backdropFilter: "blur(12px)",
          borderRadius: 16, border: "1px solid rgba(66,165,245,0.2)",
          marginBottom: 28, boxShadow: "0 4px 24px rgba(0,80,180,0.12)", zIndex: 20, position: "relative",
        }}>
          <Mascot mood="happy" size={48} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>Lv.{levelInfo.level}</span>
              <div style={{ flex: 1, height: 7, background: "rgba(255,255,255,0.08)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(levelInfo.current / levelInfo.needed) * 100}%`, background: "linear-gradient(90deg, var(--accent-dark), var(--accent))", borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "'DM Mono', monospace" }}>{levelInfo.current}/{levelInfo.needed} XP</span>
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
              <span style={{ color: "#e67e22", fontWeight: 600 }}>🔥 {progress.streak} day{progress.streak !== 1 ? "s" : ""}</span>
              <span style={{ color: "rgba(255,255,255,0.4)" }}>⭐ {totalStars}/{maxStars}</span>
            </div>
          </div>
        </div>

        {/* ═══ THE RIVER ═══ */}
        <div style={{ position: "relative", width: RW, maxWidth: "100%", height: totalH, margin: "0 auto", overflow: "visible" }}>

          <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            viewBox={`0 0 ${RW} ${totalH}`} preserveAspectRatio="xMidYMin meet">

            {/* Riverbank — dark green edges */}
            <path d={riverPath} fill="none" stroke="#0d2818" strokeWidth="105" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />

            {/* River deep */}
            <path d={riverPath} fill="none" stroke="#0a2244" strokeWidth="82" strokeLinecap="round" strokeLinejoin="round" />

            {/* River mid */}
            <path d={riverPath} fill="none" stroke="#0d3060" strokeWidth="68" strokeLinecap="round" strokeLinejoin="round" />

            {/* River surface */}
            <path d={riverPath} fill="none" stroke="#1565C0" strokeWidth="54" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" />

            {/* Bright center current */}
            <path d={riverPath} fill="none" stroke="#1E88E5" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
            <path d={riverPath} fill="none" stroke="#42A5F5" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />

            {/* Completed glow */}
            {completedPath && <path d={completedPath} fill="none" stroke="#f0c040" strokeWidth="54" strokeLinecap="round" opacity="0.05" />}

            {/* ── White water / foam between each stop ── */}
            {stops.map((s, i) => {
              const prev = i === 0 ? { x: RW / 2, y: 0 } : stops[i - 1];
              const mx = (prev.x + s.x) / 2;
              const my = (prev.y + s.y) / 2;
              const seed = i * 4391;
              return (
                <g key={`ww-${i}`}>
                  {[0, 1, 2, 3, 4].map(f => {
                    const fx = mx - 16 + f * 8 + (seed + f * 31) % 7;
                    const fy = my - 12 + f * 6 + (seed + f * 13) % 5;
                    return (
                      <ellipse key={f} cx={fx} cy={fy} rx={5 + f % 4} ry="1.3" fill="white" opacity="0.06">
                        <animate attributeName="opacity" values="0.03;0.1;0.03" dur={`${1.4 + f * 0.3}s`} repeatCount="indefinite" />
                      </ellipse>
                    );
                  })}
                  {/* Splash dots */}
                  {[0, 1, 2].map(d => (
                    <circle key={`dot-${d}`} cx={mx - 10 + d * 10 + seed % 5} cy={my + 8 + d * 2} r={1 + d % 2} fill="white" opacity="0.04">
                      <animate attributeName="opacity" values="0.02;0.08;0.02" dur={`${1.6 + d * 0.4}s`} repeatCount="indefinite" />
                    </circle>
                  ))}
                </g>
              );
            })}

            {/* ── River rocks ── */}
            {stops.map((s, i) => {
              const prev = i === 0 ? { x: RW / 2, y: 0 } : stops[i - 1];
              const my = (prev.y + s.y) / 2;
              const mx = (prev.x + s.x) / 2;
              const seed = i * 2917;
              return (
                <g key={`rk-${i}`}>
                  <ellipse cx={mx + 20 + seed % 8} cy={my - 6} rx={4 + seed % 3} ry={2.5} fill="#263238" opacity="0.4" />
                  <ellipse cx={mx + 20 + seed % 8} cy={my - 7} rx={3 + seed % 2} ry={2} fill="#37474F" opacity="0.3" />
                  <ellipse cx={mx - 16 - seed % 10} cy={my + 10} rx={3 + seed % 4} ry={2} fill="#263238" opacity="0.35" />
                  {/* Foam around rock */}
                  <ellipse cx={mx + 20 + seed % 8} cy={my - 3} rx={6} ry="1.5" fill="white" opacity="0.04" />
                </g>
              );
            })}

            {/* ── Bank trees — along the shores ── */}
            {Array.from({ length: Math.ceil(totalH / 55) }, (_, i) => {
              const seed = i * 3917 + 23;
              const y = i * 55 + seed % 25;
              const closest = stops.reduce((b, s) => Math.abs(s.y - y) < Math.abs(b.y - y) ? s : b, stops[0]);
              const rx = closest.x;
              return (
                <g key={`bt-${i}`}>
                  {/* Left bank */}
                  {rx > RW * 0.3 && (
                    <g opacity={0.35 + (seed % 3) * 0.05}>
                      <rect x={rx - 58 - seed % 18} y={y} width="3" height={10 + seed % 7} rx="1.5" fill="#4E342E" />
                      <circle cx={rx - 58 - seed % 18} cy={y - 5 - seed % 4} r={7 + seed % 5} fill={`hsl(${128 + seed % 20}, 40%, ${16 + seed % 7}%)`} />
                      <circle cx={rx - 55 - seed % 18} cy={y - 2} r={5 + seed % 3} fill={`hsl(${132 + seed % 15}, 38%, ${19 + seed % 6}%)`} />
                    </g>
                  )}
                  {/* Right bank */}
                  {rx < RW * 0.7 && (
                    <g opacity={0.35 + (seed % 4) * 0.04}>
                      <rect x={rx + 52 + seed % 20} y={y + 3} width="3" height={9 + seed % 8} rx="1.5" fill="#3E2723" />
                      <circle cx={rx + 52 + seed % 20} cy={y - 3 - seed % 4} r={6 + seed % 5} fill={`hsl(${126 + seed % 18}, 38%, ${17 + seed % 6}%)`} />
                      <circle cx={rx + 55 + seed % 20} cy={y} r={4 + seed % 4} fill={`hsl(${130 + seed % 14}, 36%, ${20 + seed % 5}%)`} />
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── Distant mountain silhouettes ── */}
            <path d="M 0 50 Q 50 -5 100 40 Q 150 5 200 45 Q 250 10 300 50 L 0 80 Z" fill="#0a1a10" opacity="0.35" />
            <path d={`M ${RW - 180} 55 Q ${RW - 130} 10 ${RW - 80} 45 Q ${RW - 40} 5 ${RW} 40 L ${RW} 80 L ${RW - 180} 80 Z`} fill="#0a1a10" opacity="0.3" />

          </svg>

          {/* ═══ PULSI ON A RAFT ═══ */}
          <div style={{
            position: "absolute",
            left: `${(raft.x / RW) * 100}%`,
            top: raft.y - 28,
            transform: "translate(-50%, -100%)",
            zIndex: 15, display: "flex", flexDirection: "column", alignItems: "center",
            animation: "raftBob 3s ease-in-out infinite",
          }}>
            {/* Speech bubble */}
            <div style={{
              background: "rgba(10,26,48,0.92)", backdropFilter: "blur(8px)",
              borderRadius: 14, padding: "6px 14px",
              border: "1px solid rgba(66,165,245,0.3)",
              fontSize: 11, fontWeight: 600, color: "#fff",
              whiteSpace: "nowrap", marginBottom: 6,
              boxShadow: "0 4px 20px rgba(0,40,120,0.3)",
              position: "relative",
            }}>
              {pulsiMsg}
              <div style={{
                position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%)",
                width: 0, height: 0,
                borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                borderTop: "5px solid rgba(66,165,245,0.3)",
              }} />
            </div>
            <Mascot mood={activeNodeIdx <= 3 ? "happy" : "wow"} size={50} />
            {/* Raft */}
            <svg width="68" height="20" viewBox="0 0 68 20" style={{ marginTop: -6 }}>
              <ellipse cx="34" cy="15" rx="33" ry="4.5" fill="#6D4C41" />
              <ellipse cx="34" cy="13" rx="31" ry="4" fill="#8D6E63" />
              {[0, 1, 2, 3, 4].map(l => (
                <rect key={l} x={5 + l * 13} y="9" width="10" height="5" rx="2" fill={l % 2 === 0 ? "#795548" : "#6D4C41"} stroke="#5D4037" strokeWidth="0.5" />
              ))}
              <ellipse cx="10" cy="17" rx="5" ry="1.5" fill="white" opacity="0.12" />
              <ellipse cx="58" cy="16" rx="4" ry="1.2" fill="white" opacity="0.1" />
            </svg>
          </div>

          {/* ═══ DOCK STOPS ═══ */}
          {allNodes.map((node, i) => {
            const s = stops[i];
            const isActive = i === activeNodeIdx;
            const xPct = s.x / RW;
            const labelSide = xPct > 0.5 ? "left" : "right";

            return (
              <div key={node.key} style={{
                position: "absolute",
                left: `${(s.x / RW) * 100}%`,
                top: s.y,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 10 : 3,
              }}>

                {/* Course signpost */}
                {node.isFirstInCourse && (
                  <div style={{
                    position: "absolute",
                    [labelSide === "right" ? "left" : "right"]: 80,
                    top: "50%", transform: "translateY(-50%)",
                    zIndex: 8,
                  }}>
                    <div style={{
                      background: "linear-gradient(135deg, #1a3320, #2d5a3a)",
                      borderRadius: 12, padding: "10px 16px",
                      border: "1.5px solid rgba(76,175,80,0.3)",
                      whiteSpace: "nowrap",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                      minWidth: 110,
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                        <span>{node.course.icon}</span> {node.course.title}
                      </div>
                      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{node.course.desc}</div>
                    </div>
                  </div>
                )}

                {/* Lesson label */}
                {!node.isFirstInCourse && (
                  <div style={{
                    position: "absolute",
                    [labelSide === "right" ? "left" : "right"]: 72,
                    top: "50%", transform: "translateY(-50%)",
                    background: "linear-gradient(135deg, #1a3320, #2d5a3a)",
                    padding: "5px 14px", borderRadius: 10,
                    border: "1.5px solid rgba(76,175,80,0.2)",
                    boxShadow: "0 3px 12px rgba(0,0,0,0.35)",
                    whiteSpace: "nowrap", fontSize: 12, fontWeight: 600,
                    color: node.unlocked ? "#fff" : "rgba(255,255,255,0.3)",
                    zIndex: 8,
                  }}>
                    {node.lesson.title}
                  </div>
                )}

                {/* Active ring */}
                {isActive && (
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 82, height: 82, borderRadius: "50%",
                    border: `3px solid ${node.course.color}`,
                    animation: "pulse-ring 2s ease-in-out infinite",
                    pointerEvents: "none",
                  }} />
                )}

                {/* Dock node */}
                <button
                  onClick={() => node.unlocked && startLesson(node.course.id, node.li)}
                  disabled={!node.unlocked}
                  style={{
                    width: 62, height: 62, borderRadius: "50%", cursor: node.unlocked ? "pointer" : "default",
                    border: node.completed ? `4px solid ${node.course.color}` : node.unlocked ? `3px solid rgba(255,255,255,0.4)` : "3px solid rgba(255,255,255,0.08)",
                    background: node.completed
                      ? `linear-gradient(135deg, ${node.course.color}, ${node.course.color}cc)`
                      : node.unlocked ? "rgba(10,26,48,0.85)" : "rgba(10,26,48,0.4)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    boxShadow: isActive ? `0 0 28px ${node.course.color}55, 0 4px 16px rgba(0,0,0,0.4)`
                      : node.completed ? `0 4px 16px ${node.course.color}44` : "0 4px 12px rgba(0,0,0,0.3)",
                    transition: "all 0.3s", position: "relative",
                    opacity: node.unlocked ? 1 : 0.35,
                    fontFamily: "'DM Sans', sans-serif",
                    backdropFilter: "blur(4px)",
                  }}
                  onMouseOver={e => { if (node.unlocked) e.currentTarget.style.transform = "scale(1.1)"; }}
                  onMouseOut={e => { if (node.unlocked) e.currentTarget.style.transform = "scale(1)"; }}
                >
                  {!node.unlocked && <span style={{ fontSize: 20 }}>🔒</span>}
                  {node.unlocked && !node.completed && <span style={{ fontSize: 20 }}>{node.course.icon}</span>}
                  {node.completed && (
                    <>
                      <span style={{ fontSize: 15, color: "#0d0f13" }}>✓</span>
                      <div style={{ display: "flex", gap: 1, marginTop: 2 }}>
                        {[1, 2, 3].map(st => (
                          <span key={st} style={{ fontSize: 8, opacity: st <= node.stars ? 1 : 0.25 }}>⭐</span>
                        ))}
                      </div>
                    </>
                  )}
                </button>
              </div>
            );
          })}

          {/* ═══ TREASURE CHEST FINISH ═══ */}
          <div style={{
            position: "absolute", left: "50%", top: totalH - 110,
            transform: "translateX(-50%)", textAlign: "center", zIndex: 3,
          }}>
            <div style={{
              width: 74, height: 74, borderRadius: "50%",
              background: totalStars >= maxStars ? "linear-gradient(135deg, #f0c040, #e67e22)" : "rgba(10,26,48,0.5)",
              border: `3px solid ${totalStars >= maxStars ? "#f0c040" : "rgba(255,255,255,0.08)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: totalStars >= maxStars ? "0 0 40px rgba(240,192,64,0.4)" : "none",
              margin: "0 auto 8px", fontSize: 32,
              opacity: totalStars >= maxStars ? 1 : 0.3,
            }}>🏆</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
              {totalStars >= maxStars ? "Master of the Rapids!" : "Ride the rapids to the treasure"}
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes pulse-ring {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes raftBob {
          0%, 100% { transform: translate(-50%, -100%) rotate(-1deg); }
          25% { transform: translate(-50%, -100%) translateY(3px) rotate(1.5deg); }
          50% { transform: translate(-50%, -100%) translateY(-2px) rotate(-0.5deg); }
          75% { transform: translate(-50%, -100%) translateY(2px) rotate(0.8deg); }
        }
      `}</style>
      <Footer />
    </div>
  );
}

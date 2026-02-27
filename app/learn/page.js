"use client";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ─── MASCOT SVG ───
function Mascot({ mood = "happy", size = 80, style: s = {} }) {
  const eyes = mood === "happy" ? "◡" : mood === "wrong" ? "╥" : mood === "wow" ? "◉" : mood === "thinking" ? "◔" : "◡";
  const mouth = mood === "happy" ? "‿" : mood === "wrong" ? "︵" : mood === "wow" ? "○" : mood === "thinking" ? "~" : "‿";
  const glow = mood === "happy" ? "#f0c040" : mood === "wrong" ? "#e74c3c" : mood === "wow" ? "#2ecc71" : "#f0c040";
  return (
    <div style={{ width: size, height: size, position: "relative", ...s }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* Glow */}
        <circle cx="50" cy="50" r="48" fill={`${glow}15`} />
        {/* Body - coin shape */}
        <circle cx="50" cy="50" r="40" fill={glow} stroke={`${glow}88`} strokeWidth="3" />
        <circle cx="50" cy="50" r="34" fill="none" stroke={`${glow}44`} strokeWidth="1.5" />
        {/* Pulse lines inside */}
        <path d="M 20 50 L 32 50 L 36 38 L 42 62 L 48 44 L 52 56 L 56 50 L 68 50 L 80 50" fill="none" stroke="#0d0f13" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
        {/* Eyes */}
        <text x="37" y="48" fontSize="14" fill="#0d0f13" textAnchor="middle" fontFamily="sans-serif">{eyes}</text>
        <text x="63" y="48" fontSize="14" fill="#0d0f13" textAnchor="middle" fontFamily="sans-serif">{eyes}</text>
        {/* Mouth */}
        <text x="50" y="65" fontSize="16" fill="#0d0f13" textAnchor="middle" fontFamily="sans-serif">{mouth}</text>
        {/* Dollar sign on forehead */}
        <text x="50" y="33" fontSize="11" fill="#0d0f1355" textAnchor="middle" fontWeight="bold" fontFamily="monospace">$</text>
      </svg>
      {mood === "wow" && (
        <div style={{ position: "absolute", top: -4, right: -4, fontSize: 16, animation: "popIn 0.3s ease" }}>✨</div>
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
  // LEARNING PATH (MAP VIEW)
  // ═══════════════════════════════
  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);
  const maxStars = COURSES.reduce((s, c) => s + c.lessons.length * 3, 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 24px 80px" }}>

        {/* Stats Bar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, padding: "14px 20px",
          background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
          marginBottom: 24,
        }}>
          <Mascot mood="happy" size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)" }}>Lv.{levelInfo.level}</span>
              <div style={{ flex: 1, height: 6, background: "var(--bg-input)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${(levelInfo.current / levelInfo.needed) * 100}%`,
                  background: "linear-gradient(90deg, var(--accent-dark), var(--accent))",
                  borderRadius: 3, transition: "width 0.4s",
                }} />
              </div>
              <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Mono', monospace" }}>{levelInfo.current}/{levelInfo.needed} XP</span>
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 12 }}>
              <span style={{ color: "#e67e22", fontWeight: 600 }}>🔥 {progress.streak} day{progress.streak !== 1 ? "s" : ""}</span>
              <span style={{ color: "var(--text-muted)" }}>⭐ {totalStars}/{maxStars}</span>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div style={{ position: "relative" }}>
          {COURSES.map((course, ci) => (
            <div key={course.id}>
              {/* Course Header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12, marginBottom: 12,
                padding: "12px 16px", background: "var(--bg-card)", borderRadius: 12,
                border: "1px solid var(--border-card)",
              }}>
                <span style={{ fontSize: 28 }}>{course.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>{course.title}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{course.desc}</div>
                </div>
              </div>

              {/* Lessons */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
                {course.lessons.map((lesson, li) => {
                  const key = `${course.id}-${li}`;
                  const stars = progress.stars[key] || 0;
                  const unlocked = isLessonUnlocked(ci, li);
                  const completed = stars > 0;

                  return (
                    <div key={li} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      {/* Connecting line */}
                      {li > 0 && (
                        <div style={{
                          width: 4, height: 28,
                          background: completed || (unlocked && stars === 0) ? course.color : "var(--border-input)",
                          borderRadius: 2,
                          animation: unlocked && !completed ? "pulse-line 2s ease-in-out infinite" : "none",
                        }} />
                      )}

                      {/* Hexagon Node */}
                      <button
                        onClick={() => unlocked && startLesson(course.id, li)}
                        disabled={!unlocked}
                        style={{
                          position: "relative", width: 72, height: 72, cursor: unlocked ? "pointer" : "default",
                          background: "transparent", border: "none", padding: 0,
                        }}
                      >
                        <svg viewBox="0 0 80 80" width={72} height={72}>
                          {/* Hex shape */}
                          <polygon
                            points="40,4 72,22 72,58 40,76 8,58 8,22"
                            fill={completed ? course.color : unlocked ? "var(--bg-card)" : "var(--bg-input)"}
                            stroke={completed ? course.color : unlocked ? course.color : "var(--border-input)"}
                            strokeWidth={unlocked && !completed ? 2.5 : 2}
                            opacity={unlocked ? 1 : 0.4}
                          />
                          {/* Pulsing ring for active */}
                          {unlocked && !completed && (
                            <polygon
                              points="40,4 72,22 72,58 40,76 8,58 8,22"
                              fill="none" stroke={course.color} strokeWidth="2"
                              opacity="0.5"
                              style={{ animation: "pulse-hex 2s ease-in-out infinite" }}
                            />
                          )}
                          {/* Icon or lock */}
                          {!unlocked && <text x="40" y="46" textAnchor="middle" fontSize="22" fill="var(--text-faint)">🔒</text>}
                          {unlocked && !completed && <text x="40" y="46" textAnchor="middle" fontSize="20">{course.icon}</text>}
                          {completed && <text x="40" y="46" textAnchor="middle" fontSize="18" fill="#0d0f13" fontWeight="bold">✓</text>}
                        </svg>

                        {/* Stars below hex */}
                        {completed && (
                          <div style={{ display: "flex", justifyContent: "center", gap: 2, marginTop: -4 }}>
                            {[1, 2, 3].map(s => (
                              <span key={s} style={{ fontSize: 12, opacity: s <= stars ? 1 : 0.2 }}>⭐</span>
                            ))}
                          </div>
                        )}
                      </button>

                      {/* Lesson title */}
                      <div style={{
                        fontSize: 11, color: unlocked ? "var(--text-secondary)" : "var(--text-faint)",
                        marginTop: 2, marginBottom: 4, textAlign: "center", maxWidth: 120,
                      }}>
                        {lesson.title}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Line between courses */}
              {ci < COURSES.length - 1 && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <div style={{
                    width: 4, height: 32, borderRadius: 2,
                    background: isLessonUnlocked(ci + 1, 0) ? COURSES[ci + 1].color : "var(--border-input)",
                    animation: isLessonUnlocked(ci + 1, 0) ? "pulse-line 2s ease-in-out infinite" : "none",
                  }} />
                </div>
              )}
            </div>
          ))}

          {/* End trophy */}
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 48, opacity: totalStars >= maxStars ? 1 : 0.2 }}>🏆</div>
            <div style={{ fontSize: 12, color: "var(--text-faint)" }}>
              {totalStars >= maxStars ? "You've mastered everything!" : "Complete all lessons to earn the trophy"}
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }
        @keyframes pulse-line {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes pulse-hex {
          0%, 100% { opacity: 0.2; stroke-width: 2; }
          50% { opacity: 0.7; stroke-width: 3.5; }
        }
      `}</style>
      <Footer />
    </div>
  );
}

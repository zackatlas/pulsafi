"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../components/AuthProvider";

// ─── QUESTION BANK (60+ questions, rotated daily) ───
const QUESTIONS = [
  // Prices & Costs
  { q: "What is the median home price in the US?", answer: 417000, unit: "$", hint: "Think six figures", category: "Housing" },
  { q: "How much does the average American spend on groceries per month?", answer: 475, unit: "$", hint: "Per person", category: "Spending" },
  { q: "What's the average monthly car payment in the US?", answer: 726, unit: "$", hint: "New car", category: "Auto" },
  { q: "How much does the average wedding cost in the US?", answer: 35000, unit: "$", hint: "It's a lot", category: "Spending" },
  { q: "What's the average annual cost of daycare in the US?", answer: 14760, unit: "$", hint: "Per child", category: "Family" },
  { q: "How much does the average American spend on coffee per year?", answer: 1100, unit: "$", hint: "Daily habit adds up", category: "Spending" },
  { q: "What's the average monthly rent for a 1-bedroom apartment in the US?", answer: 1530, unit: "$", hint: "National average", category: "Housing" },
  { q: "How much does the average American household pay in electricity per month?", answer: 147, unit: "$", hint: "Monthly utility", category: "Spending" },

  // Incomes & Savings
  { q: "What is the median US household income?", answer: 80610, unit: "$", hint: "Before taxes", category: "Income" },
  { q: "What's the average starting salary for a software engineer?", answer: 85000, unit: "$", hint: "Entry level, nationwide", category: "Income" },
  { q: "How much does the average American have in their savings account?", answer: 8000, unit: "$", hint: "Median, not mean", category: "Savings" },
  { q: "What's the average 401(k) balance for Americans aged 30-39?", answer: 50400, unit: "$", hint: "Not enough for most", category: "Retirement" },
  { q: "What's the average Social Security monthly benefit?", answer: 1907, unit: "$", hint: "For retirees", category: "Retirement" },
  { q: "How much does the average American tip at restaurants?", answer: 20, unit: "%", hint: "Post-pandemic norm", category: "Spending" },
  { q: "What percentage of Americans live paycheck to paycheck?", answer: 62, unit: "%", hint: "More than half", category: "Savings" },
  { q: "What's the average annual raise in the US?", answer: 4.5, unit: "%", hint: "Across all industries", category: "Income" },

  // Markets & Rates
  { q: "What's the current average 30-year fixed mortgage rate?", answer: 6.8, unit: "%", hint: "As of early 2026", category: "Rates" },
  { q: "What's the average credit card APR in the US?", answer: 24.7, unit: "%", hint: "It's high", category: "Rates" },
  { q: "What's the current federal funds rate (upper bound)?", answer: 4.5, unit: "%", hint: "Set by the Fed", category: "Rates" },
  { q: "What was the S&P 500's average annual return since 1926?", answer: 10.5, unit: "%", hint: "Including dividends", category: "Markets" },
  { q: "What percentage of actively managed funds underperform the S&P 500 over 15 years?", answer: 92, unit: "%", hint: "Almost all of them", category: "Markets" },
  { q: "What's the historical average annual inflation rate in the US?", answer: 3.3, unit: "%", hint: "Long-term average", category: "Economy" },
  { q: "What was the highest the S&P 500 dropped in a single year?", answer: 38, unit: "%", hint: "Think 2008", category: "Markets" },
  { q: "What's the average annual return of gold over the last 50 years?", answer: 7.8, unit: "%", hint: "Store of value", category: "Markets" },

  // Economy & Stats
  { q: "How much is the US national debt (in trillions)?", answer: 36, unit: "T$", hint: "It's astronomical", category: "Economy" },
  { q: "What's the current US unemployment rate?", answer: 4.1, unit: "%", hint: "Relatively low", category: "Economy" },
  { q: "What percentage of Americans own stocks (directly or via retirement)?", answer: 58, unit: "%", hint: "More than half", category: "Markets" },
  { q: "What's the average American's credit score?", answer: 715, unit: "", hint: "FICO scale", category: "Credit" },
  { q: "How much total student loan debt exists in the US (in trillions)?", answer: 1.77, unit: "T$", hint: "Massive number", category: "Debt" },
  { q: "What's the average student loan balance per borrower?", answer: 37850, unit: "$", hint: "Per person with loans", category: "Debt" },
  { q: "What percentage of millionaires inherited their wealth?", answer: 21, unit: "%", hint: "Most are self-made", category: "Wealth" },
  { q: "What percentage of Americans have less than $1,000 in savings?", answer: 56, unit: "%", hint: "Majority struggle", category: "Savings" },

  // Retirement & Wealth
  { q: "How much does the average American need to retire comfortably?", answer: 1460000, unit: "$", hint: "Depends on lifestyle", category: "Retirement" },
  { q: "At what age does the average American retire?", answer: 62, unit: "", hint: "Before full Social Security", category: "Retirement" },
  { q: "What's the maximum 401(k) contribution for workers under 50?", answer: 23500, unit: "$", hint: "2025 limit", category: "Retirement" },
  { q: "What's the maximum annual Roth IRA contribution (under 50)?", answer: 7000, unit: "$", hint: "2025 limit", category: "Retirement" },
  { q: "What's the average net worth of a 30-year-old American?", answer: 49388, unit: "$", hint: "Median, not mean", category: "Wealth" },
  { q: "What's the median net worth of US households aged 55-64?", answer: 364270, unit: "$", hint: "Peak earning years", category: "Wealth" },
  { q: "What percentage of Americans have a written financial plan?", answer: 28, unit: "%", hint: "Surprisingly low", category: "Savings" },
  { q: "How many years would $1M last in retirement withdrawing $40K/year (4% rule)?", answer: 30, unit: "yrs", hint: "The Trinity Study", category: "Retirement" },

  // Taxes
  { q: "What's the top marginal federal income tax rate?", answer: 37, unit: "%", hint: "For high earners", category: "Taxes" },
  { q: "At what income does the 22% federal tax bracket start (single)?", answer: 47150, unit: "$", hint: "2025 brackets", category: "Taxes" },
  { q: "What percentage of income does the average American pay in total taxes?", answer: 28, unit: "%", hint: "Federal + state + FICA", category: "Taxes" },
  { q: "What's the Social Security tax rate (employee portion)?", answer: 6.2, unit: "%", hint: "Up to the wage base", category: "Taxes" },
  { q: "What's the standard deduction for single filers (2025)?", answer: 15000, unit: "$", hint: "Approximate", category: "Taxes" },

  // Crypto & Tech
  { q: "What year was Bitcoin created?", answer: 2009, unit: "", hint: "By Satoshi Nakamoto", category: "Crypto" },
  { q: "What was Bitcoin's all-time percentage drop from peak during the 2022 bear?", answer: 77, unit: "%", hint: "Brutal drawdown", category: "Crypto" },
  { q: "How many Bitcoin can ever exist (in millions)?", answer: 21, unit: "M", hint: "Hard cap", category: "Crypto" },
  { q: "What percentage of Americans own cryptocurrency?", answer: 21, unit: "%", hint: "Growing rapidly", category: "Crypto" },

  // Business & Entrepreneurship
  { q: "What percentage of small businesses fail within 5 years?", answer: 50, unit: "%", hint: "About half", category: "Business" },
  { q: "What's the average revenue of a sole proprietorship in the US?", answer: 58000, unit: "$", hint: "Most are small", category: "Business" },
  { q: "How much does the average franchise cost to open?", answer: 250000, unit: "$", hint: "Initial investment", category: "Business" },

  // Global
  { q: "What's the median household income globally?", answer: 12700, unit: "$", hint: "Much lower than US", category: "Global" },
  { q: "What percentage of the world's population is unbanked?", answer: 24, unit: "%", hint: "Nearly a quarter", category: "Global" },
  { q: "How much money is in circulation worldwide (in trillions)?", answer: 83, unit: "T$", hint: "Broad money supply", category: "Global" },

  // Insurance & Healthcare
  { q: "What's the average monthly health insurance premium for an individual?", answer: 477, unit: "$", hint: "Employer-sponsored", category: "Insurance" },
  { q: "How much does the average American spend on healthcare per year?", answer: 6700, unit: "$", hint: "Out of pocket + premiums", category: "Healthcare" },
  { q: "What's the average cost of a hospital stay per day in the US?", answer: 2883, unit: "$", hint: "Without insurance", category: "Healthcare" },

  // ─── EXPANDED QUESTION BANK (140+ new questions) ───

  // Housing & Real Estate (deeper)
  { q: "What's the average down payment percentage for first-time homebuyers?", answer: 8, unit: "%", hint: "Less than you think", category: "Housing" },
  { q: "How much does the average home appraisal cost?", answer: 350, unit: "$", hint: "Required by lenders", category: "Housing" },
  { q: "What's the average annual property tax rate in the US?", answer: 1.1, unit: "%", hint: "Of home value", category: "Housing" },
  { q: "What percentage of Americans own their home?", answer: 66, unit: "%", hint: "About two-thirds", category: "Housing" },
  { q: "What's the average home insurance premium per year?", answer: 2230, unit: "$", hint: "Varies wildly by state", category: "Housing" },
  { q: "How much does the average kitchen remodel cost?", answer: 26000, unit: "$", hint: "Mid-range", category: "Housing" },
  { q: "What's the median home price in San Francisco?", answer: 1350000, unit: "$", hint: "One of the priciest", category: "Housing" },
  { q: "What's the average closing cost as a percentage of home price?", answer: 3.5, unit: "%", hint: "Fees add up fast", category: "Housing" },
  { q: "How many months of inventory is considered a balanced housing market?", answer: 6, unit: "", hint: "Supply vs demand", category: "Housing" },
  { q: "What percentage of homes are bought with cash (no mortgage)?", answer: 32, unit: "%", hint: "Higher than expected", category: "Housing" },

  // Auto & Transportation
  { q: "What's the average cost to own a car per year (total)?", answer: 12182, unit: "$", hint: "Gas, insurance, maintenance, payment", category: "Auto" },
  { q: "How much does the average American spend on gas per month?", answer: 200, unit: "$", hint: "Depends on commute", category: "Auto" },
  { q: "What's the average annual cost of car insurance?", answer: 2314, unit: "$", hint: "Full coverage", category: "Auto" },
  { q: "What's the average price of a new car in the US?", answer: 48760, unit: "$", hint: "Keeps climbing", category: "Auto" },
  { q: "What's the average price of a used car in the US?", answer: 26510, unit: "$", hint: "Post-pandemic prices", category: "Auto" },
  { q: "How much does car depreciation cost in the first year?", answer: 20, unit: "%", hint: "Drive it off the lot", category: "Auto" },
  { q: "What's the average monthly lease payment for a new car?", answer: 540, unit: "$", hint: "Less than buying", category: "Auto" },
  { q: "What percentage of new cars sold in the US are electric?", answer: 9, unit: "%", hint: "Growing fast", category: "Auto" },

  // College & Education
  { q: "What's the average annual tuition at a public university (in-state)?", answer: 11260, unit: "$", hint: "Before room & board", category: "Education" },
  { q: "What's the average annual tuition at a private university?", answer: 42160, unit: "$", hint: "Before financial aid", category: "Education" },
  { q: "How much does the average college graduate earn more than a high school graduate per year?", answer: 22000, unit: "$", hint: "The degree premium", category: "Education" },
  { q: "What's the average monthly student loan payment?", answer: 393, unit: "$", hint: "For those repaying", category: "Education" },
  { q: "How many years does the average borrower take to repay student loans?", answer: 20, unit: "yrs", hint: "Longer than expected", category: "Education" },
  { q: "What percentage of student loan borrowers are in default?", answer: 7, unit: "%", hint: "Lower than peak", category: "Education" },
  { q: "What's the average annual cost of room and board at a 4-year college?", answer: 12800, unit: "$", hint: "On campus", category: "Education" },
  { q: "What percentage of Americans aged 25+ have a bachelor's degree?", answer: 37, unit: "%", hint: "About a third", category: "Education" },

  // Income (deeper)
  { q: "What's the average starting salary for a registered nurse?", answer: 63000, unit: "$", hint: "High demand field", category: "Income" },
  { q: "What's the average salary for a teacher in the US?", answer: 69000, unit: "$", hint: "Varies hugely by state", category: "Income" },
  { q: "What's the median income for a US household headed by someone under 25?", answer: 38600, unit: "$", hint: "Just starting out", category: "Income" },
  { q: "What's the gender pay gap in the US (women earn this many cents per man's dollar)?", answer: 84, unit: "", hint: "Cents on the dollar", category: "Income" },
  { q: "What's the federal minimum wage per hour?", answer: 7.25, unit: "$", hint: "Hasn't changed since 2009", category: "Income" },
  { q: "What income puts you in the top 10% of US earners?", answer: 174000, unit: "$", hint: "Household income", category: "Income" },
  { q: "What income puts you in the top 1% of US earners?", answer: 650000, unit: "$", hint: "Household income", category: "Income" },
  { q: "What's the average annual bonus in the US as a percentage of salary?", answer: 11, unit: "%", hint: "Across all industries", category: "Income" },

  // Spending & Budgeting
  { q: "How much does the average American spend on subscription services per month?", answer: 219, unit: "$", hint: "Streaming, apps, gym, etc.", category: "Spending" },
  { q: "What's the average American cell phone bill per month?", answer: 144, unit: "$", hint: "Per line for family plan", category: "Spending" },
  { q: "How much does the average American spend on dining out per month?", answer: 310, unit: "$", hint: "Restaurants and takeout", category: "Spending" },
  { q: "What's the average monthly internet bill in the US?", answer: 75, unit: "$", hint: "Broadband", category: "Spending" },
  { q: "How much does the average American spend on clothing per year?", answer: 1945, unit: "$", hint: "Per person", category: "Spending" },
  { q: "What's the average cost of raising a child from birth to age 17?", answer: 310605, unit: "$", hint: "Excluding college", category: "Family" },
  { q: "How much does the average American spend on pets per year?", answer: 1533, unit: "$", hint: "Food, vet, supplies", category: "Spending" },
  { q: "What's the average cost of a funeral in the US?", answer: 7848, unit: "$", hint: "Traditional burial", category: "Spending" },
  { q: "How much does the average American household spend on food per month (total)?", answer: 1055, unit: "$", hint: "Groceries + dining", category: "Spending" },
  { q: "What's the average annual vacation spending per household?", answer: 2800, unit: "$", hint: "Domestic trips", category: "Spending" },

  // Savings & Emergency
  { q: "What percentage of Americans have an emergency fund that covers 3+ months of expenses?", answer: 44, unit: "%", hint: "Less than half", category: "Savings" },
  { q: "What's the average high-yield savings account APY?", answer: 4.5, unit: "%", hint: "As of early 2026", category: "Savings" },
  { q: "How much do financial experts recommend saving as an emergency fund (months of expenses)?", answer: 6, unit: "", hint: "A common rule of thumb", category: "Savings" },
  { q: "What percentage of Americans have no retirement savings?", answer: 28, unit: "%", hint: "More than a quarter", category: "Savings" },
  { q: "What's the average savings rate in the US (% of disposable income)?", answer: 4.6, unit: "%", hint: "Historically low", category: "Savings" },

  // Credit & Debt
  { q: "What's the average American household credit card debt?", answer: 7951, unit: "$", hint: "Among those with debt", category: "Credit" },
  { q: "How many credit cards does the average American have?", answer: 4, unit: "", hint: "More than most think", category: "Credit" },
  { q: "What credit score do you need for the best mortgage rates?", answer: 760, unit: "", hint: "Excellent tier", category: "Credit" },
  { q: "What percentage of Americans have a credit score above 800?", answer: 21, unit: "%", hint: "Exceptional credit", category: "Credit" },
  { q: "How much total credit card debt exists in the US (in trillions)?", answer: 1.14, unit: "T$", hint: "Record highs", category: "Credit" },
  { q: "What's the average late payment fee on a credit card?", answer: 32, unit: "$", hint: "First offense", category: "Credit" },
  { q: "What percentage of Americans carry a credit card balance month to month?", answer: 47, unit: "%", hint: "Nearly half", category: "Credit" },
  { q: "What's the average personal loan interest rate?", answer: 12.3, unit: "%", hint: "Unsecured", category: "Debt" },

  // Retirement (deeper)
  { q: "What's the average 401(k) employer match percentage?", answer: 4.7, unit: "%", hint: "Free money", category: "Retirement" },
  { q: "What percentage of private-sector workers have access to a 401(k)?", answer: 72, unit: "%", hint: "Not everyone", category: "Retirement" },
  { q: "At what age can you withdraw from a 401(k) without penalty?", answer: 59.5, unit: "", hint: "Half-year matters", category: "Retirement" },
  { q: "What's the full Social Security retirement age for those born after 1960?", answer: 67, unit: "", hint: "It went up", category: "Retirement" },
  { q: "What percentage of retirees say they retired earlier than planned?", answer: 46, unit: "%", hint: "Health, layoffs, caregiving", category: "Retirement" },
  { q: "What's the maximum Social Security benefit per month at age 70?", answer: 5108, unit: "$", hint: "For top earners (2025)", category: "Retirement" },
  { q: "What's the average 401(k) balance for Americans aged 60-69?", answer: 182100, unit: "$", hint: "Close to retirement", category: "Retirement" },
  { q: "What's the catch-up contribution limit for 401(k) for those 50+?", answer: 7500, unit: "$", hint: "Extra allowed", category: "Retirement" },

  // Taxes (deeper)
  { q: "What's the long-term capital gains tax rate for the middle bracket?", answer: 15, unit: "%", hint: "Most investors pay this", category: "Taxes" },
  { q: "At what income does the 32% federal tax bracket start (single)?", answer: 191950, unit: "$", hint: "Upper middle class", category: "Taxes" },
  { q: "What's the estate tax exemption amount per person (2025)?", answer: 13610000, unit: "$", hint: "Very high threshold", category: "Taxes" },
  { q: "What percentage of Americans use the standard deduction vs. itemizing?", answer: 87, unit: "%", hint: "Vast majority take standard", category: "Taxes" },
  { q: "What's the Medicare tax rate (employee portion)?", answer: 1.45, unit: "%", hint: "No wage base limit", category: "Taxes" },
  { q: "What's the Social Security wage base limit (2025)?", answer: 176100, unit: "$", hint: "Maximum taxable earnings", category: "Taxes" },
  { q: "How much is the child tax credit per qualifying child (2025)?", answer: 2000, unit: "$", hint: "Per child", category: "Taxes" },
  { q: "What percentage of federal revenue comes from individual income taxes?", answer: 49, unit: "%", hint: "The biggest slice", category: "Taxes" },

  // Investing (deeper)
  { q: "What's the average expense ratio for an index fund?", answer: 0.06, unit: "%", hint: "Very cheap", category: "Investing" },
  { q: "How long does the average bear market last (in months)?", answer: 9.6, unit: "", hint: "Shorter than you think", category: "Investing" },
  { q: "How long does the average bull market last (in years)?", answer: 5.5, unit: "yrs", hint: "Much longer than bears", category: "Investing" },
  { q: "What's the average dividend yield of the S&P 500?", answer: 1.4, unit: "%", hint: "Currently low", category: "Investing" },
  { q: "How much money is invested in index funds globally (in trillions)?", answer: 16, unit: "T$", hint: "Massive and growing", category: "Investing" },
  { q: "What percentage of day traders lose money?", answer: 90, unit: "%", hint: "Almost everyone", category: "Investing" },
  { q: "What's the average annual return of REITs over the last 20 years?", answer: 9.5, unit: "%", hint: "Real estate investment trusts", category: "Investing" },
  { q: "What percentage of Americans invest in individual stocks?", answer: 21, unit: "%", hint: "Outside retirement accounts", category: "Investing" },
  { q: "What's the historical average P/E ratio of the S&P 500?", answer: 17, unit: "", hint: "Price to earnings", category: "Investing" },
  { q: "How many stocks are in the S&P 500?", answer: 503, unit: "", hint: "Not exactly 500", category: "Investing" },

  // Crypto & Digital Assets (deeper)
  { q: "What percentage of Bitcoin has already been mined?", answer: 93, unit: "%", hint: "Most of it", category: "Crypto" },
  { q: "How many different cryptocurrencies exist?", answer: 10000, unit: "", hint: "Approximate, many are dead", category: "Crypto" },
  { q: "What percentage of crypto investors reported losses in the 2022 crash?", answer: 38, unit: "%", hint: "Of those who sold", category: "Crypto" },
  { q: "What's the average transaction fee on the Bitcoin network (in dollars)?", answer: 2.5, unit: "$", hint: "Varies with congestion", category: "Crypto" },
  { q: "What year did Ethereum launch?", answer: 2015, unit: "", hint: "After Bitcoin", category: "Crypto" },
  { q: "What's the total market cap of all cryptocurrencies (in trillions)?", answer: 3.2, unit: "T$", hint: "As of early 2026", category: "Crypto" },

  // Business & Entrepreneurship (deeper)
  { q: "What percentage of small businesses survive past 10 years?", answer: 34, unit: "%", hint: "About a third", category: "Business" },
  { q: "What's the average time to profitability for a startup?", answer: 3, unit: "yrs", hint: "Patience required", category: "Business" },
  { q: "How much does the average small business loan amount to?", answer: 663000, unit: "$", hint: "SBA average", category: "Business" },
  { q: "What percentage of businesses are sole proprietorships?", answer: 73, unit: "%", hint: "Most common structure", category: "Business" },
  { q: "What's the average profit margin for a small business?", answer: 7, unit: "%", hint: "Across all industries", category: "Business" },
  { q: "How much does the average food truck cost to start?", answer: 75000, unit: "$", hint: "All-in to get rolling", category: "Business" },
  { q: "What's the average revenue of an Etsy shop per year?", answer: 5900, unit: "$", hint: "Most are side hustles", category: "Business" },

  // Insurance (deeper)
  { q: "What's the average annual life insurance premium for a 30-year-old ($500K policy)?", answer: 350, unit: "$", hint: "Term life, healthy", category: "Insurance" },
  { q: "What percentage of Americans have life insurance?", answer: 52, unit: "%", hint: "About half", category: "Insurance" },
  { q: "What's the average annual renter's insurance cost?", answer: 180, unit: "$", hint: "Very affordable", category: "Insurance" },
  { q: "How much does disability insurance typically cost per month?", answer: 50, unit: "$", hint: "Short-term policy", category: "Insurance" },
  { q: "What percentage of bankruptcies are caused by medical bills?", answer: 66, unit: "%", hint: "Leading cause", category: "Healthcare" },

  // Global Finance
  { q: "What's the GDP of the United States (in trillions)?", answer: 28.8, unit: "T$", hint: "Largest economy", category: "Global" },
  { q: "What country has the highest household savings rate?", answer: 35, unit: "%", hint: "Think China", category: "Global" },
  { q: "What's the average annual income in India (in USD)?", answer: 2390, unit: "$", hint: "Per capita", category: "Global" },
  { q: "How much foreign debt does the US owe (in trillions)?", answer: 8.1, unit: "T$", hint: "Portion held by foreign governments", category: "Global" },
  { q: "What percentage of global wealth is held by the top 1%?", answer: 46, unit: "%", hint: "Extremely concentrated", category: "Global" },
  { q: "What's the average cost of a Big Mac in Switzerland (in USD)?", answer: 8.2, unit: "$", hint: "Big Mac Index", category: "Global" },
  { q: "What percentage of the world lives on less than $6.85 per day?", answer: 44, unit: "%", hint: "Nearly half", category: "Global" },

  // Side Hustles & Gig Economy
  { q: "What percentage of Americans have a side hustle?", answer: 39, unit: "%", hint: "Growing trend", category: "Income" },
  { q: "How much does the average Uber driver earn per hour (before expenses)?", answer: 19, unit: "$", hint: "Before gas and car costs", category: "Income" },
  { q: "What's the average freelancer's hourly rate in the US?", answer: 45, unit: "$", hint: "Across all skills", category: "Income" },
  { q: "How much does the average side hustle earn per month?", answer: 810, unit: "$", hint: "Extra income", category: "Income" },
  { q: "What percentage of the US workforce is freelance?", answer: 36, unit: "%", hint: "Full or part-time", category: "Income" },

  // Financial Literacy & Behavior
  { q: "What percentage of Americans can pass a basic financial literacy quiz?", answer: 57, unit: "%", hint: "Room for improvement", category: "Savings" },
  { q: "What percentage of Americans use a budget?", answer: 74, unit: "%", hint: "Higher than it used to be", category: "Savings" },
  { q: "How much does the average impulse purchase cost?", answer: 151, unit: "$", hint: "Per purchase", category: "Spending" },
  { q: "How many impulse purchases does the average American make per month?", answer: 12, unit: "", hint: "About 3 per week", category: "Spending" },
  { q: "What percentage of Americans regret a major financial decision?", answer: 57, unit: "%", hint: "More than half", category: "Savings" },

  // Wealth Milestones
  { q: "What's the average net worth of a 40-year-old American?", answer: 134730, unit: "$", hint: "Median, not mean", category: "Wealth" },
  { q: "How many millionaires are there in the US (in millions)?", answer: 24.5, unit: "M", hint: "More than you think", category: "Wealth" },
  { q: "What net worth puts you in the top 10% of Americans?", answer: 1900000, unit: "$", hint: "Household net worth", category: "Wealth" },
  { q: "What's the average inheritance amount in the US?", answer: 46200, unit: "$", hint: "Median inheritance", category: "Wealth" },
  { q: "At what net worth are you considered 'ultra-high-net-worth'?", answer: 30000000, unit: "$", hint: "Very exclusive club", category: "Wealth" },
  { q: "What percentage of American households have a net worth over $1 million?", answer: 13, unit: "%", hint: "About 1 in 8", category: "Wealth" },

  // Economy (deeper)
  { q: "What's the US GDP growth rate (2025)?", answer: 2.5, unit: "%", hint: "Real GDP", category: "Economy" },
  { q: "How many jobs does the US economy add per month on average?", answer: 180000, unit: "", hint: "Non-farm payrolls", category: "Economy" },
  { q: "What's the current US labor force participation rate?", answer: 62.5, unit: "%", hint: "Working-age adults", category: "Economy" },
  { q: "What percentage of the US economy is consumer spending?", answer: 68, unit: "%", hint: "The big driver", category: "Economy" },
  { q: "What's the average price of a gallon of gas in the US?", answer: 3.3, unit: "$", hint: "National average", category: "Economy" },
  { q: "What's the average price of a dozen eggs?", answer: 4.95, unit: "$", hint: "Still elevated", category: "Economy" },

  // Tech & Fintech
  { q: "What percentage of Americans use mobile banking?", answer: 78, unit: "%", hint: "On their phones", category: "Spending" },
  { q: "How much money is moved through Venmo per year (in billions)?", answer: 245, unit: "", hint: "Peer-to-peer payments", category: "Spending" },
  { q: "What percentage of transactions are cashless in the US?", answer: 84, unit: "%", hint: "Cards and digital", category: "Spending" },
  { q: "How much do Americans lose to financial scams per year (in billions)?", answer: 10, unit: "", hint: "FTC reported losses", category: "Spending" },

  // Fun Financial Facts
  { q: "How much would $1 invested in the S&P 500 in 1970 be worth today?", answer: 310, unit: "$", hint: "With dividends reinvested", category: "Investing" },
  { q: "What's the most expensive zip code's median home price (in millions)?", answer: 7.6, unit: "M", hint: "Atherton, CA", category: "Housing" },
  { q: "How much did the average Super Bowl ad cost for 30 seconds (in millions)?", answer: 7, unit: "M", hint: "Recent pricing", category: "Business" },
  { q: "What's the average cost of a cup of coffee at Starbucks?", answer: 5.9, unit: "$", hint: "Grande latte", category: "Spending" },
  { q: "How much does the average American spend on lottery tickets per year?", answer: 370, unit: "$", hint: "Hope springs eternal", category: "Spending" },
  { q: "What percentage of lottery winners go broke within 5 years?", answer: 70, unit: "%", hint: "Easy come, easy go", category: "Wealth" },
  { q: "What's the average tip percentage for food delivery?", answer: 17, unit: "%", hint: "Less than dining in", category: "Spending" },
  { q: "How much does the average American spend on holiday gifts per year?", answer: 920, unit: "$", hint: "December spending spree", category: "Spending" },

  // Real Estate Investing
  { q: "What's a typical cap rate for residential rental properties?", answer: 5.5, unit: "%", hint: "Net operating income", category: "Investing" },
  { q: "What's the average vacancy rate for rental properties in the US?", answer: 7.2, unit: "%", hint: "Unrented units", category: "Housing" },
  { q: "What's the average annual rental yield on a home?", answer: 4.2, unit: "%", hint: "Rental income %", category: "Housing" },
  { q: "What percentage of real estate investors use leverage?", answer: 82, unit: "%", hint: "With mortgages", category: "Investing" },
  { q: "What's the average cash-on-cash return for rental properties?", answer: 8, unit: "%", hint: "First year typical", category: "Investing" },
  { q: "How much down payment do most first-time landlords put down?", answer: 25, unit: "%", hint: "On purchase price", category: "Housing" },

  // Tech Salaries by Role
  { q: "What's the average base salary for a product manager in tech?", answer: 175000, unit: "$", hint: "San Francisco area", category: "Income" },
  { q: "What's the average salary for a data scientist at a big tech company?", answer: 188000, unit: "$", hint: "Base only", category: "Income" },
  { q: "What's the average base salary for a UX designer in tech?", answer: 145000, unit: "$", hint: "Senior designer", category: "Income" },
  { q: "What's the average software engineer salary in Silicon Valley?", answer: 220000, unit: "$", hint: "With bonus and stock", category: "Income" },
  { q: "What percentage of tech salaries come from stock options?", answer: 35, unit: "%", hint: "On average", category: "Income" },
  { q: "What's the average total comp for a senior engineer?", answer: 350000, unit: "$", hint: "Including equity", category: "Income" },

  // Subscription Economy
  { q: "How many subscription services does the average US household have?", answer: 12.2, unit: "", hint: "Streaming, apps, etc", category: "Spending" },
  { q: "How much does the average American spend on subscriptions per year?", answer: 684, unit: "$", hint: "All services combined", category: "Spending" },
  { q: "What percentage of subscriptions are forgotten/unused?", answer: 44, unit: "%", hint: "People forget to cancel", category: "Spending" },
  { q: "What's the average monthly cost of a streaming service?", answer: 14.5, unit: "$", hint: "Ad-free tier", category: "Spending" },
  { q: "How much would streaming all major services cost per month?", answer: 89, unit: "$", hint: "Netflix, Disney+, etc", category: "Spending" },

  // Climate & Green Finance
  { q: "What percentage of global investment goes to ESG funds?", answer: 36, unit: "%", hint: "Environmental, Social...", category: "Investing" },
  { q: "How much does an average US household spend on energy per year?", answer: 1950, unit: "$", hint: "Electricity and heat", category: "Spending" },
  { q: "What's the average cost to install solar panels on a home?", answer: 30000, unit: "$", hint: "Before incentives", category: "Housing" },
  { q: "How much does the average solar installation save per year?", answer: 1200, unit: "$", hint: "In electricity costs", category: "Housing" },
  { q: "What percentage of new cars sold are electric vehicles?", answer: 12.5, unit: "%", hint: "As of 2025", category: "Auto" },

  // Social Security Details
  { q: "What's the average Social Security benefit per month?", answer: 1907, unit: "$", hint: "Full retirement age", category: "Retirement" },
  { q: "What age can you claim reduced Social Security benefits?", answer: 62, unit: "yrs", hint: "Earliest claiming age", category: "Retirement" },
  { q: "How much more do you get if you wait until age 70 vs 62?", answer: 124, unit: "%", hint: "Benefit increase", category: "Retirement" },
  { q: "What percentage of retirees rely on Social Security for income?", answer: 87, unit: "%", hint: "Their main source", category: "Retirement" },
  { q: "In what year will Social Security funds be depleted?", answer: 2033, unit: "", hint: "Current projection", category: "Retirement" },

  // Estate Planning
  { q: "What percentage of Americans have a will?", answer: 34, unit: "%", hint: "Less than half", category: "Wealth" },
  { q: "How much does it cost to create a basic will?", answer: 300, unit: "$", hint: "Attorney fees", category: "Wealth" },
  { q: "What percentage of estates go to probate?", answer: 45, unit: "%", hint: "Without planning", category: "Wealth" },
  { q: "How long does probate typically take?", answer: 1, unit: "yrs", hint: "On average", category: "Wealth" },
  { q: "What's the federal estate tax exemption for 2026?", answer: 13610000, unit: "$", hint: "Per person", category: "Taxes" },

  // Financial Scam Statistics
  { q: "What percentage of scam victims are over 60?", answer: 38, unit: "%", hint: "Age group targeted", category: "Credit" },
  { q: "How much does the average phishing victim lose?", answer: 2500, unit: "$", hint: "Email scams", category: "Credit" },
  { q: "What's the most common type of financial fraud?", answer: 34, unit: "", hint: "Identity theft ranking", category: "Credit" },
  { q: "How many Americans become fraud victims annually?", answer: 21, unit: "M", hint: "In millions", category: "Credit" },
  { q: "What percentage of credit card fraud is from data breaches?", answer: 29, unit: "%", hint: "Not due to theft", category: "Credit" },

  // Gig Economy Deeper Stats
  { q: "How much does the average Uber/Lyft driver earn per hour?", answer: 22, unit: "$", hint: "After expenses", category: "Income" },
  { q: "What percentage of gig workers have a second job?", answer: 41, unit: "%", hint: "Multiple income sources", category: "Income" },
  { q: "How much does the average DoorDash driver earn per delivery?", answer: 8.5, unit: "$", hint: "Before expenses", category: "Income" },
  { q: "What percentage of gig workers lack health insurance?", answer: 42, unit: "%", hint: "Self-employed challenge", category: "Healthcare" },
  { q: "What's the average annual income from freelance work?", answer: 78000, unit: "$", hint: "Full-time freelancers", category: "Income" },

  // Cost Comparisons (US Cities)
  { q: "What's the median home price in San Francisco?", answer: 1400000, unit: "$", hint: "Bay Area expensive", category: "Housing" },
  { q: "What's the median home price in Austin, Texas?", answer: 520000, unit: "$", hint: "Tech hub", category: "Housing" },
  { q: "How much more expensive is NYC rent vs national average?", answer: 150, unit: "%", hint: "Percentage markup", category: "Housing" },
  { q: "What's the median home price in Miami?", answer: 680000, unit: "$", hint: "Florida market", category: "Housing" },
  { q: "What's the average rent in Los Angeles for a 1-bedroom?", answer: 2200, unit: "$", hint: "Monthly", category: "Housing" },

  // Cost Comparisons (Countries)
  { q: "How much does a Big Mac cost in Denmark compared to the US?", answer: 5.15, unit: "$", hint: "International pricing", category: "Economy" },
  { q: "What's the average doctor visit cost in Switzerland vs the US?", answer: 2, unit: "x", hint: "Cost multiple", category: "Healthcare" },
  { q: "How much more expensive is college in the US vs Germany?", answer: 10, unit: "x", hint: "Cost multiple", category: "Education" },
  { q: "What's the ratio of Copenhagen rent to San Francisco rent?", answer: 0.6, unit: "", hint: "Cost comparison", category: "Housing" },

  // Inflation Impact Examples
  { q: "What cost $100 in 2000 costs how much today?", answer: 198, unit: "$", hint: "Cumulative inflation", category: "Economy" },
  { q: "How much has the cost of college increased since 2000?", answer: 169, unit: "%", hint: "Inflation rate", category: "Education" },
  { q: "How much have healthcare costs increased since 2000?", answer: 187, unit: "%", hint: "Outpaced general inflation", category: "Healthcare" },
  { q: "What percentage has the price of eggs increased since 2020?", answer: 42, unit: "%", hint: "Food inflation impact", category: "Economy" },

  // Historical Financial Events
  { q: "In what year did the dotcom bubble burst?", answer: 2000, unit: "", hint: "Tech bubble", category: "Markets" },
  { q: "What was the highest unemployment rate in the 2008 crisis?", answer: 10, unit: "%", hint: "Great Recession peak", category: "Economy" },
  { q: "What year did Bitcoin reach its first major peak?", answer: 2017, unit: "", hint: "Before the crash", category: "Crypto" },
  { q: "How much did the S&P 500 drop in March 2020?", answer: 34, unit: "%", hint: "COVID market crash", category: "Markets" },
  { q: "In what year did the stock market return over 25%?", answer: 2023, unit: "", hint: "Recent bull market", category: "Markets" },

  // Personal Finance Milestones by Age
  { q: "What's the recommended retirement savings by age 30?", answer: 47000, unit: "$", hint: "1x annual salary", category: "Retirement" },
  { q: "What's the recommended retirement savings by age 40?", answer: 188000, unit: "$", hint: "3x annual salary", category: "Retirement" },
  { q: "What should your emergency fund cover?", answer: 6, unit: "M", hint: "Months of expenses", category: "Savings" },
  { q: "What's the recommended debt-to-income ratio?", answer: 43, unit: "%", hint: "Maximum for lending", category: "Debt" },
  { q: "At what net worth can you retire early?", answer: 750000, unit: "$", hint: "4% rule guideline", category: "Retirement" },

  // Wedding & Life Event Costs
  { q: "What's the average cost of a wedding in the US?", answer: 35000, unit: "$", hint: "2025 estimate", category: "Spending" },
  { q: "What's the average cost to have a child in the US?", answer: 18000, unit: "$", hint: "Delivery and hospital", category: "Family" },
  { q: "How much does it cost to raise a child to age 18?", answer: 233000, unit: "$", hint: "Middle-income family", category: "Family" },
  { q: "What's the average cost of a honeymoon?", answer: 6000, unit: "$", hint: "Popular destination", category: "Spending" },
  { q: "How much does the average funeral cost?", answer: 7848, unit: "$", hint: "Traditional service", category: "Spending" },

  // College ROI Stats
  { q: "What's the average student loan debt upon graduation?", answer: 28950, unit: "$", hint: "Bachelor's degree", category: "Education" },
  { q: "What's the lifetime earnings premium for a college grad?", answer: 900000, unit: "$", hint: "vs high school grad", category: "Education" },
  { q: "What percentage of students graduate with debt?", answer: 62, unit: "%", hint: "Student loans", category: "Education" },
  { q: "What's the average cost of a year at a private college?", answer: 82000, unit: "$", hint: "Tuition and fees", category: "Education" },
  { q: "What's the payback period for a college degree?", answer: 7, unit: "yrs", hint: "Break-even years", category: "Education" },

  // Healthcare Cost Breakdowns
  { q: "What's the average cost of emergency room visit?", answer: 1233, unit: "$", hint: "Without insurance", category: "Healthcare" },
  { q: "What's the average cost of a broken bone treatment?", answer: 7500, unit: "$", hint: "Emergency room care", category: "Healthcare" },
  { q: "What's the average cost of a night in the hospital?", answer: 3200, unit: "$", hint: "Room charges", category: "Healthcare" },
  { q: "How much does an average MRI scan cost?", answer: 2500, unit: "$", hint: "Without insurance", category: "Healthcare" },
  { q: "What percentage of US bankruptcies are medical-related?", answer: 67, unit: "%", hint: "Healthcare debt factor", category: "Healthcare" },
  { q: "What's the average monthly cost of prescription medications?", answer: 245, unit: "$", hint: "Full price, not insured", category: "Healthcare" },

  // Additional Fresh Topics
  { q: "What percentage of Americans have side hustles?", answer: 26, unit: "%", hint: "Secondary income", category: "Income" },
  { q: "How much money is sitting in US savings accounts?", answer: 30, unit: "T$", hint: "In trillions", category: "Savings" },
  { q: "What's the average credit card interest rate?", answer: 21.5, unit: "%", hint: "APR 2025", category: "Credit" },
  { q: "How many Americans are in debt?", answer: 80, unit: "%", hint: "Of adult population", category: "Debt" },
  { q: "What's the average home appreciation per year?", answer: 3.2, unit: "%", hint: "Long-term average", category: "Housing" },

  // ─── FINAL EXPANSION (80+ questions to reach 365+) ───

  // Banking & Financial Products
  { q: "How many checking accounts does the average American have?", answer: 2, unit: "", hint: "Personal + joint", category: "Savings" },
  { q: "What's the average overdraft fee?", answer: 35, unit: "$", hint: "Per transaction", category: "Credit" },
  { q: "How many Americans are unbanked (no bank account)?", answer: 6, unit: "%", hint: "Millions of people", category: "Savings" },
  { q: "What's the average CD rate for a 1-year term?", answer: 4.3, unit: "%", hint: "Certificate of deposit", category: "Savings" },
  { q: "What percentage of Americans use a financial advisor?", answer: 35, unit: "%", hint: "Professional help", category: "Wealth" },
  { q: "What's the average fee for a financial advisor?", answer: 1, unit: "%", hint: "Of assets managed", category: "Wealth" },
  { q: "How many Americans use buy-now-pay-later services?", answer: 43, unit: "%", hint: "Klarna, Affirm, etc.", category: "Spending" },
  { q: "What's the average number of bank fees paid per year?", answer: 224, unit: "$", hint: "Various charges", category: "Spending" },

  // Real Estate Market
  { q: "What percentage of homes sell above asking price?", answer: 29, unit: "%", hint: "Competitive markets", category: "Housing" },
  { q: "What's the average time to sell a home in days?", answer: 55, unit: "", hint: "Days on market", category: "Housing" },
  { q: "How much does staging a home cost on average?", answer: 1800, unit: "$", hint: "Before listing", category: "Housing" },
  { q: "What's the average real estate agent commission?", answer: 5.5, unit: "%", hint: "Split between agents", category: "Housing" },
  { q: "What percentage of homebuyers regret their purchase?", answer: 72, unit: "%", hint: "For various reasons", category: "Housing" },
  { q: "How much does a home inspection cost?", answer: 340, unit: "$", hint: "Before buying", category: "Housing" },
  { q: "What's the average size of a new home in square feet?", answer: 2430, unit: "", hint: "New construction", category: "Housing" },

  // Retirement Deep Dive
  { q: "What percentage of retirees work part-time?", answer: 27, unit: "%", hint: "For income or purpose", category: "Retirement" },
  { q: "What's the average monthly spending in retirement?", answer: 4345, unit: "$", hint: "Per household", category: "Retirement" },
  { q: "How much does the average retiree spend on healthcare per year?", answer: 7060, unit: "$", hint: "Out of pocket", category: "Healthcare" },
  { q: "What percentage of 401(k) participants take a loan?", answer: 13, unit: "%", hint: "Borrowing from yourself", category: "Retirement" },
  { q: "What's the average pension payment per month?", answer: 1669, unit: "$", hint: "For those who have one", category: "Retirement" },
  { q: "What percentage of Americans have a pension?", answer: 15, unit: "%", hint: "Private sector", category: "Retirement" },

  // Taxes Extended
  { q: "How much does the average American pay in state income tax?", answer: 3800, unit: "$", hint: "Varies widely", category: "Taxes" },
  { q: "What percentage of tax filers use a professional preparer?", answer: 53, unit: "%", hint: "CPA or tax service", category: "Taxes" },
  { q: "What's the average tax refund amount?", answer: 3170, unit: "$", hint: "Federal refund", category: "Taxes" },
  { q: "How many states have no income tax?", answer: 9, unit: "", hint: "Florida, Texas, etc.", category: "Taxes" },
  { q: "What percentage of Americans owe money at tax time?", answer: 25, unit: "%", hint: "Instead of a refund", category: "Taxes" },
  { q: "What's the average cost to have taxes prepared professionally?", answer: 220, unit: "$", hint: "Simple return", category: "Taxes" },

  // Investing Extended
  { q: "What percentage of Americans have a brokerage account?", answer: 26, unit: "%", hint: "Outside retirement", category: "Investing" },
  { q: "What's the average return of a balanced 60/40 portfolio?", answer: 8.2, unit: "%", hint: "Stocks and bonds mix", category: "Investing" },
  { q: "How much does the average investor lose to fees over a lifetime?", answer: 170000, unit: "$", hint: "Hidden drag", category: "Investing" },
  { q: "What's the average holding period for a stock?", answer: 5.5, unit: "", hint: "Months, not years", category: "Investing" },
  { q: "What percentage of Americans panic-sold during COVID?", answer: 18, unit: "%", hint: "March 2020", category: "Investing" },
  { q: "What's the average mutual fund expense ratio?", answer: 0.44, unit: "%", hint: "Actively managed", category: "Investing" },
  { q: "How long has the average bull market lasted since 1932?", answer: 6.6, unit: "yrs", hint: "Longer than bears", category: "Markets" },
  { q: "What's the average return of international stocks over 20 years?", answer: 6.8, unit: "%", hint: "Developed markets", category: "Markets" },

  // Insurance Extended
  { q: "What's the average annual cost of umbrella insurance?", answer: 200, unit: "$", hint: "Extra liability protection", category: "Insurance" },
  { q: "What percentage of Americans are underinsured?", answer: 42, unit: "%", hint: "Not enough coverage", category: "Insurance" },
  { q: "What's the average deductible on a health insurance plan?", answer: 1735, unit: "$", hint: "Individual plan", category: "Healthcare" },
  { q: "How much does long-term care insurance cost per month at age 55?", answer: 175, unit: "$", hint: "Single policy", category: "Insurance" },
  { q: "What percentage of disability claims are approved on first try?", answer: 21, unit: "%", hint: "Social Security disability", category: "Insurance" },

  // Credit & Debt Extended
  { q: "How long does a bankruptcy stay on your credit report?", answer: 10, unit: "yrs", hint: "Chapter 7", category: "Credit" },
  { q: "What's the average balance transfer fee?", answer: 3, unit: "%", hint: "Of transferred amount", category: "Credit" },
  { q: "How much does the average American owe in total debt?", answer: 104215, unit: "$", hint: "All types combined", category: "Debt" },
  { q: "What percentage of Americans have medical debt?", answer: 41, unit: "%", hint: "Outstanding bills", category: "Healthcare" },
  { q: "What's the minimum credit score for an FHA loan?", answer: 580, unit: "", hint: "With 3.5% down", category: "Credit" },
  { q: "How long does a late payment stay on your credit report?", answer: 7, unit: "yrs", hint: "Negative mark", category: "Credit" },
  { q: "What percentage of credit reports contain errors?", answer: 34, unit: "%", hint: "Check yours", category: "Credit" },

  // Family Finance
  { q: "How much does the average family spend on back-to-school shopping?", answer: 890, unit: "$", hint: "K-12 per household", category: "Family" },
  { q: "What's the average cost of braces for a child?", answer: 5000, unit: "$", hint: "Orthodontic treatment", category: "Family" },
  { q: "How much does the average family spend on extracurricular activities per year?", answer: 1170, unit: "$", hint: "Sports, music, etc.", category: "Family" },
  { q: "What's the average cost of a baby's first year?", answer: 15000, unit: "$", hint: "Diapers to daycare", category: "Family" },
  { q: "How much does a stay-at-home parent's work equate to in salary?", answer: 184820, unit: "$", hint: "If you paid for it all", category: "Family" },

  // Money Psychology
  { q: "What percentage of couples argue about money?", answer: 48, unit: "%", hint: "Top relationship stress", category: "Savings" },
  { q: "How much does financial stress cost employers per employee per year?", answer: 3400, unit: "$", hint: "Lost productivity", category: "Economy" },
  { q: "What percentage of people would struggle with a $400 emergency?", answer: 37, unit: "%", hint: "Federal Reserve study", category: "Savings" },
  { q: "How many hours per week does the average American think about money?", answer: 7, unit: "", hint: "An hour a day", category: "Savings" },
  { q: "What percentage of New Year's financial resolutions are kept?", answer: 8, unit: "%", hint: "Almost none", category: "Savings" },

  // Career & Workplace
  { q: "What's the average cost of replacing an employee?", answer: 21, unit: "%", hint: "Of annual salary", category: "Business" },
  { q: "How much does the average American commute cost per year?", answer: 8466, unit: "$", hint: "Gas, transit, wear", category: "Spending" },
  { q: "What percentage of workers negotiate their salary?", answer: 37, unit: "%", hint: "Most don't", category: "Income" },
  { q: "How much more do salary negotiators earn over a career?", answer: 750000, unit: "$", hint: "Compounding effect", category: "Income" },
  { q: "What's the average cost of a professional certification?", answer: 2500, unit: "$", hint: "Including study materials", category: "Education" },
  { q: "What percentage of remote workers have higher savings?", answer: 34, unit: "%", hint: "Vs office workers", category: "Savings" },

  // Economic Indicators
  { q: "What's the current price of gold per ounce?", answer: 2950, unit: "$", hint: "As of early 2026", category: "Markets" },
  { q: "What's the US trade deficit in billions?", answer: 773, unit: "", hint: "Annual deficit", category: "Economy" },
  { q: "What percentage of US GDP is government spending?", answer: 37, unit: "%", hint: "Federal + state + local", category: "Economy" },
  { q: "What's the total US mortgage debt in trillions?", answer: 12.8, unit: "T$", hint: "Outstanding balance", category: "Economy" },
  { q: "What percentage of the US dollar's value has been lost since 1970?", answer: 87, unit: "%", hint: "Purchasing power", category: "Economy" },

  // Generational Wealth
  { q: "What's the average net worth of a millennial household?", answer: 127000, unit: "$", hint: "Ages 28-43", category: "Wealth" },
  { q: "What percentage of Gen Z has started investing?", answer: 54, unit: "%", hint: "Younger generation", category: "Investing" },
  { q: "How much more wealth do boomers hold than millennials at the same age?", answer: 3, unit: "x", hint: "Adjusted for inflation", category: "Wealth" },
  { q: "What's the median inheritance expected by millennials?", answer: 55000, unit: "$", hint: "From parents", category: "Wealth" },
  { q: "What percentage of wealth transfers fail by the second generation?", answer: 70, unit: "%", hint: "Shirtsleeves to shirtsleeves", category: "Wealth" },

  // Miscellaneous Financial Facts
  { q: "How much does the average American spend on their morning routine per year?", answer: 2100, unit: "$", hint: "Coffee, breakfast, etc.", category: "Spending" },
  { q: "What's the average tip for a haircut?", answer: 22, unit: "%", hint: "Salon services", category: "Spending" },
  { q: "How much cash does the average American carry in their wallet?", answer: 67, unit: "$", hint: "Physical cash", category: "Spending" },
  { q: "What's the most expensive city to live in the US?", answer: 118000, unit: "$", hint: "NYC cost of living", category: "Economy" },
  { q: "What percentage of Americans have never traveled abroad?", answer: 40, unit: "%", hint: "No passport used", category: "Spending" },
  { q: "How much does the average American donate to charity per year?", answer: 1700, unit: "$", hint: "Among those who donate", category: "Spending" },
  { q: "What percentage of lottery spending goes to education?", answer: 24, unit: "%", hint: "Varies by state", category: "Economy" },
  { q: "How much does the average American spend on their pets over a lifetime?", answer: 55000, unit: "$", hint: "Dogs and cats", category: "Spending" },
];

// ─── SCORING ───
function scoreGuess(guess, answer) {
  if (answer === 0) return guess === 0 ? 200 : 0;
  const pctOff = Math.abs(guess - answer) / Math.abs(answer);
  if (pctOff <= 0.05) return 200;
  if (pctOff <= 0.10) return 170;
  if (pctOff <= 0.15) return 140;
  if (pctOff <= 0.25) return 100;
  if (pctOff <= 0.40) return 60;
  if (pctOff <= 0.60) return 30;
  return 10;
}

function scoreEmoji(score) {
  if (score >= 170) return "🟩";
  if (score >= 100) return "🟨";
  if (score >= 60) return "🟧";
  return "🟥";
}

function getAccuracyLabel(score) {
  if (score >= 170) return "Nailed it!";
  if (score >= 100) return "Close!";
  if (score >= 60) return "Decent";
  return "Way off";
}

// ─── TODAY IN FINANCIAL HISTORY ───
const FINANCIAL_HISTORY = [
  // January
  { month: 1, day: 1, year: "1863", fact: "The Emancipation Proclamation took effect, fundamentally reshaping the U.S. labor economy and agricultural markets." },
  { month: 1, day: 3, year: "2009", fact: "Bitcoin's genesis block was mined by Satoshi Nakamoto, launching the first decentralized cryptocurrency." },
  { month: 1, day: 11, year: "1964", fact: "The U.S. Surgeon General's report on smoking was released, eventually leading to a $200B+ tobacco settlement." },
  { month: 1, day: 17, year: "1706", fact: "Benjamin Franklin was born — he would later write 'A penny saved is a penny earned.'" },
  { month: 1, day: 24, year: "1848", fact: "James Marshall discovered gold at Sutter's Mill, sparking the California Gold Rush." },
  { month: 1, day: 30, year: "1933", fact: "FDR was inaugurated and would soon sign the Banking Act, creating the FDIC to insure bank deposits." },
  // February
  { month: 2, day: 3, year: "1690", fact: "The first paper money in America was issued by the Massachusetts Bay Colony to pay soldiers." },
  { month: 2, day: 7, year: "1964", fact: "The Beatles arrived in America, eventually becoming worth over $1 billion collectively." },
  { month: 2, day: 13, year: "2000", fact: "The last original Peanuts comic strip ran. Charles Schulz's estate still earns $30-40M/year in licensing." },
  { month: 2, day: 14, year: "2005", fact: "YouTube was founded. Google would buy it 20 months later for $1.65 billion." },
  { month: 2, day: 19, year: "1878", fact: "Thomas Edison patented the phonograph, launching the recorded music industry worth $26B today." },
  { month: 2, day: 25, year: "1913", fact: "The 16th Amendment was ratified, establishing the federal income tax." },
  // March
  { month: 3, day: 4, year: "1789", fact: "The U.S. Constitution took effect. Article I, Section 8 gave Congress the power to collect taxes." },
  { month: 3, day: 6, year: "1899", fact: "Bayer patented aspirin, launching what would become a pharmaceutical empire." },
  { month: 3, day: 9, year: "2009", fact: "The S&P 500 hit its Great Recession bottom at 676. It would rise over 700% in the next 15 years." },
  { month: 3, day: 11, year: "2020", fact: "The WHO declared COVID-19 a pandemic. The S&P 500 dropped 34% in just 23 trading days." },
  { month: 3, day: 14, year: "1794", fact: "Eli Whitney patented the cotton gin, revolutionizing Southern agriculture and the global cotton trade." },
  { month: 3, day: 23, year: "1983", fact: "President Reagan proposed the Strategic Defense Initiative. Defense stocks surged." },
  { month: 3, day: 29, year: "1999", fact: "The Dow Jones closed above 10,000 for the first time during the dot-com boom." },
  // April
  { month: 4, day: 3, year: "1860", fact: "The Pony Express began mail delivery, connecting the economy from Missouri to California in just 10 days." },
  { month: 4, day: 10, year: "1866", fact: "The ASPCA was founded. Americans now spend over $136B on pets annually." },
  { month: 4, day: 15, year: "1955", fact: "Ray Kroc opened the first franchised McDonald's. The company is now worth over $200B." },
  { month: 4, day: 15, year: "2026", fact: "Tax Day. The IRS processes roughly 150 million individual returns every year." },
  { month: 4, day: 23, year: "2005", fact: "The first YouTube video was uploaded. The platform now generates over $30B in annual ad revenue." },
  { month: 4, day: 28, year: "2003", fact: "Apple launched the iTunes Store, transforming how the world pays for music." },
  // May
  { month: 5, day: 1, year: "1884", fact: "Construction began on the first skyscraper (Home Insurance Building, Chicago), transforming urban real estate." },
  { month: 5, day: 6, year: "2010", fact: "The Flash Crash wiped out $1 trillion in market value in minutes, then mostly recovered the same day." },
  { month: 5, day: 11, year: "1997", fact: "IBM's Deep Blue defeated chess champion Garry Kasparov, foreshadowing AI's impact on financial markets." },
  { month: 5, day: 15, year: "1911", fact: "The Supreme Court broke up Standard Oil, establishing major antitrust precedent for U.S. business regulation." },
  { month: 5, day: 19, year: "1928", fact: "The Dow Jones Industrial Average first published with 30 stocks, the same number it includes today." },
  { month: 5, day: 26, year: "1896", fact: "The Dow Jones Industrial Average was first published by Charles Dow, tracking 12 industrial stocks." },
  // June
  { month: 6, day: 4, year: "1896", fact: "Henry Ford completed his first automobile, the Quadricycle, launching the car industry." },
  { month: 6, day: 8, year: "1978", fact: "The first spam email was sent to 400 ARPANET users. Today, email marketing is a $10B industry." },
  { month: 6, day: 16, year: "1903", fact: "Ford Motor Company was incorporated with $28,000 in capital. It's now worth over $40B." },
  { month: 6, day: 22, year: "1944", fact: "The GI Bill was signed, providing education benefits that created a massive middle class expansion." },
  { month: 6, day: 29, year: "2007", fact: "The first iPhone was released at $499. Apple would become the first $3 trillion company." },
  // July
  { month: 7, day: 2, year: "1962", fact: "Walmart opened its first store in Rogers, Arkansas. It's now the world's largest company by revenue." },
  { month: 7, day: 5, year: "1994", fact: "Jeff Bezos incorporated Amazon.com. His initial investment was $10,000 from his parents." },
  { month: 7, day: 16, year: "1935", fact: "The first parking meter was installed in Oklahoma City. Today, cities earn billions from parking." },
  { month: 7, day: 20, year: "1969", fact: "Apollo 11 landed on the moon. The entire program cost $25.4B (about $200B in today's dollars)." },
  { month: 7, day: 29, year: "1958", fact: "NASA was established with a budget of $100M. Its budget today is about $25B per year." },
  // August
  { month: 8, day: 5, year: "1861", fact: "The U.S. imposed its first federal income tax (3% on incomes over $800) to fund the Civil War." },
  { month: 8, day: 6, year: "2014", fact: "Russia banned food imports from the West, demonstrating how geopolitics can shock commodity markets." },
  { month: 8, day: 12, year: "1981", fact: "IBM released the first personal computer (PC), launching a revolution that would create trillions in wealth." },
  { month: 8, day: 15, year: "1971", fact: "Nixon ended the gold standard, allowing the U.S. dollar to float freely against other currencies." },
  { month: 8, day: 24, year: "2011", fact: "Steve Jobs resigned as Apple CEO. The stock was at $54 (split-adjusted). It would reach over $230." },
  // September
  { month: 9, day: 3, year: "1929", fact: "The Dow peaked at 381.17 before the Great Crash. It wouldn't recover to that level until 1954 — 25 years later." },
  { month: 9, day: 7, year: "1998", fact: "Google was founded in a Menlo Park garage. It's now worth over $2 trillion." },
  { month: 9, day: 15, year: "2008", fact: "Lehman Brothers filed for bankruptcy, triggering the worst financial crisis since the Great Depression." },
  { month: 9, day: 17, year: "2011", fact: "Occupy Wall Street protests began. The top 1% then held about 40% of U.S. wealth (now 32%)." },
  { month: 9, day: 21, year: "1897", fact: "The New York Sun published 'Yes, Virginia, there is a Santa Claus.' Holiday spending now exceeds $950B annually." },
  // October
  { month: 10, day: 1, year: "1908", fact: "Ford introduced the Model T at $825. Mass production eventually dropped the price to $260." },
  { month: 10, day: 13, year: "2006", fact: "Goldman Sachs analyst secretly called mortgage-backed securities 'junk' — two years before the crash proved him right." },
  { month: 10, day: 19, year: "1987", fact: "Black Monday: The Dow dropped 22.6% in a single day — still the largest one-day percentage decline in history." },
  { month: 10, day: 24, year: "1929", fact: "Black Thursday: The stock market crash began with a 12.9% drop, ushering in the Great Depression." },
  { month: 10, day: 29, year: "1929", fact: "Black Tuesday: 16.4 million shares were traded as the market crashed, wiping out millions of investors." },
  // November
  { month: 11, day: 1, year: "1993", fact: "The European Union officially came into existence, creating the world's largest single market." },
  { month: 11, day: 10, year: "2017", fact: "Bitcoin broke $7,000 for the first time. It would hit $20,000 just 39 days later." },
  { month: 11, day: 12, year: "2001", fact: "American Airlines Flight 587 crashed, worsening airline industry losses after 9/11 — the sector lost $7.7B that year." },
  { month: 11, day: 22, year: "1963", fact: "President Kennedy was assassinated. The NYSE closed immediately and dropped 2.9% before recovering." },
  { month: 11, day: 28, year: "1929", fact: "The Dow hit its post-crash low of 198.69, having fallen 48% from its September peak." },
  // December
  { month: 12, day: 1, year: "1913", fact: "The Federal Reserve Act was passed, creating the U.S. central bank that controls monetary policy today." },
  { month: 12, day: 5, year: "1933", fact: "Prohibition ended. The alcohol industry is now worth over $280B in the U.S. alone." },
  { month: 12, day: 9, year: "2020", fact: "Airbnb went public at $68/share, closing at $144.71 — a 113% first-day gain during the pandemic." },
  { month: 12, day: 17, year: "2017", fact: "Bitcoin hit its then all-time high of $19,783. It would crash 84% before recovering years later." },
  { month: 12, day: 24, year: "2018", fact: "The S&P 500 was down nearly 20% from its peak, making it the worst December for stocks since 1931." },
  { month: 12, day: 31, year: "1999", fact: "The Dow closed at 11,497 on the last day before Y2K. The feared computer bug turned out to be mostly harmless." },
];

function getDailyHistoryFact() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // Try exact match first
  const exact = FINANCIAL_HISTORY.find(f => f.month === month && f.day === day);
  if (exact) return exact;
  // Fallback: find closest date in same month
  const sameMonth = FINANCIAL_HISTORY.filter(f => f.month === month);
  if (sameMonth.length > 0) {
    sameMonth.sort((a, b) => Math.abs(a.day - day) - Math.abs(b.day - day));
    return sameMonth[0];
  }
  // Final fallback: seeded pick
  const dayNum = Math.floor((now - new Date("2026-01-01")) / (1000 * 60 * 60 * 24));
  return FINANCIAL_HISTORY[dayNum % FINANCIAL_HISTORY.length];
}

// ─── DAILY SEED ───
function getDayNumber() {
  const start = new Date("2026-02-25");
  const now = new Date();
  return Math.floor((now - start) / (1000 * 60 * 60 * 24));
}

function seededShuffle(arr, seed) {
  const shuffled = [...arr];
  let s = seed;
  for (let i = shuffled.length - 1; i > 0; i--) {
    s = (s * 16807 + 0) % 2147483647;
    const j = s % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getDailyQuestions() {
  const day = getDayNumber();
  const shuffled = seededShuffle(QUESTIONS, day * 7919 + 42);
  return shuffled.slice(0, 5);
}

function formatAnswer(val, unit) {
  if (unit === "$") return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: val >= 1000 ? 0 : 2 }).format(val);
  if (unit === "T$") return `$${val}T`;
  if (unit === "M") return `${val}M`;
  if (unit === "%") return `${val}%`;
  if (unit === "yrs") return `${val} years`;
  return `${val.toLocaleString()}`;
}

export default function PulsePage() {
  const { user, profile } = useAuth();
  const [questions] = useState(getDailyQuestions);
  const [currentQ, setCurrentQ] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [scores, setScores] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [lbStatus, setLbStatus] = useState(null); // null | "loading" | { success, elo, elo_change } | { error }
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const inputRef = useRef(null);
  const dayNum = getDayNumber();

  // Derive display name from auth profile
  const displayName = profile?.name || user?.email?.split("@")[0] || "";
  const isLoggedIn = !!user;

  // Check if already played today
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pulse-day");
      if (saved === String(dayNum)) {
        const savedScores = JSON.parse(localStorage.getItem("pulse-scores") || "[]");
        const savedGuesses = JSON.parse(localStorage.getItem("pulse-guesses") || "[]");
        if (savedScores.length === 5) {
          setScores(savedScores);
          setGuesses(savedGuesses);
          setCurrentQ(5);
          setShowResult(true);
          setHasPlayed(true);
        }
      }
      const submittedDay = localStorage.getItem("pulse-submitted-day");
      if (submittedDay === String(dayNum)) {
        setLbStatus({ success: true, already: true });
      }
    } catch (e) {}
  }, [dayNum]);

  useEffect(() => { if (inputRef.current && !showResult) inputRef.current.focus(); }, [currentQ, showResult]);

  // Auto-submit to leaderboard when results show and user is logged in
  useEffect(() => {
    if (
      showResult &&
      isLoggedIn &&
      displayName &&
      scores.length === 5 &&
      !autoSubmitted &&
      !lbStatus?.success
    ) {
      setAutoSubmitted(true);
      submitToLeaderboard(displayName);
    }
  }, [showResult, isLoggedIn, displayName, scores, autoSubmitted, lbStatus]);

  const submitGuess = () => {
    const num = parseFloat(inputVal);
    if (isNaN(num)) return;

    const q = questions[currentQ];
    const s = scoreGuess(num, q.answer);
    const newScores = [...scores, s];
    const newGuesses = [...guesses, num];
    setScores(newScores);
    setGuesses(newGuesses);
    setRevealed(true);

    if (currentQ === 4) {
      try {
        localStorage.setItem("pulse-day", String(dayNum));
        localStorage.setItem("pulse-scores", JSON.stringify(newScores));
        localStorage.setItem("pulse-guesses", JSON.stringify(newGuesses));
      } catch (e) {}
    }
  };

  const nextQuestion = () => {
    if (currentQ >= 4) {
      setShowResult(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
    setInputVal("");
    setRevealed(false);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const emojiGrid = scores.map(s => scoreEmoji(s)).join("");
  const shareUrl = `https://www.pulsafi.com/api/pulse-card?score=${totalScore}&day=${dayNum}&grid=${encodeURIComponent(emojiGrid)}`;
  const shareText = `📊 Daily Pulse #${dayNum}: ${totalScore}/1,000\n${emojiGrid}\npulsafi.com/pulse`;

  const handleShare = () => {
    navigator.clipboard?.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitToLeaderboard = async (name) => {
    if (!name || name.length > 30) return;
    setLbStatus("loading");
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: name.trim(),
          score: totalScore,
          emoji_grid: emojiGrid,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setLbStatus({ success: true, elo: data.elo, elo_change: data.elo_change });
        try { localStorage.setItem("pulse-submitted-day", String(dayNum)); } catch {}
      } else {
        setLbStatus({ error: data.error || "Failed to submit" });
      }
    } catch {
      setLbStatus({ error: "Network error — try again" });
    }
  };

  const q = questions[currentQ] || questions[4];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 8, fontWeight: 600 }}>
            Daily Game • Pulse #{dayNum}
          </div>
          <h1 style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            The Daily Pulse
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
            Guess 5 financial numbers. Closer = more points. Can you beat 800?
          </p>
        </div>

        {/* Progress Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {[0, 1, 2, 3, 4].map(i => (
            <div key={i} style={{
              width: 40, height: 6, borderRadius: 3,
              background: i < scores.length ? scoreEmoji(scores[i]) === "🟩" ? "#2ecc71" : scoreEmoji(scores[i]) === "🟨" ? "#f0c040" : scoreEmoji(scores[i]) === "🟧" ? "#e67e22" : "#e74c3c"
                : i === currentQ && !showResult ? "var(--accent)" : "var(--bg-input)",
              border: i === currentQ && !showResult ? "none" : "1px solid var(--border-input)",
              transition: "all 0.3s",
            }} />
          ))}
        </div>

        {/* ── GAME SCREEN ── */}
        {!showResult && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            <div style={{
              background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)",
              padding: "32px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", textAlign: "center",
            }}>
              {/* Category Tag */}
              <div style={{
                display: "inline-block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em",
                fontWeight: 600, color: "var(--accent)", background: "var(--accent-bg)", padding: "4px 10px",
                borderRadius: 6, marginBottom: 16,
              }}>{q.category}</div>

              {/* Question */}
              <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, lineHeight: 1.4, margin: "0 0 6px" }}>
                {q.q}
              </h2>
              <div style={{ fontSize: 12, color: "var(--text-faint)", marginBottom: 24 }}>💡 {q.hint}</div>

              {!revealed ? (
                <>
                  {/* Input */}
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "var(--bg-input)", borderRadius: 14, border: "2px solid var(--accent-border)",
                    padding: "14px 20px", maxWidth: 280, margin: "0 auto 20px",
                  }}>
                    {(q.unit === "$" || q.unit === "T$") && <span style={{ color: "var(--accent)", fontSize: 20, fontWeight: 700, fontFamily: "'Inter', monospace" }}>$</span>}
                    <input
                      ref={inputRef}
                      type="text"
                      inputMode="decimal"
                      value={inputVal}
                      onChange={e => setInputVal(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter") submitGuess(); }}
                      placeholder="Your guess"
                      style={{
                        background: "transparent", border: "none", outline: "none",
                        color: "var(--text-primary)", fontSize: 28, fontFamily: "'Inter', monospace",
                        fontWeight: 700, textAlign: "center", width: "100%",
                      }}
                    />
                    {q.unit === "%" && <span style={{ color: "var(--text-muted)", fontSize: 20, fontWeight: 700 }}>%</span>}
                    {q.unit === "T$" && <span style={{ color: "var(--text-muted)", fontSize: 16 }}>T</span>}
                    {q.unit === "M" && <span style={{ color: "var(--text-muted)", fontSize: 16 }}>M</span>}
                    {q.unit === "yrs" && <span style={{ color: "var(--text-muted)", fontSize: 14 }}>yrs</span>}
                  </div>

                  <button onClick={submitGuess} style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                    color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s", boxShadow: "0 4px 16px rgba(240,192,64,0.3)",
                  }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >Lock In</button>
                </>
              ) : (
                /* Revealed Answer */
                <div style={{ animation: "fadeIn 0.4s ease" }}>
                  <div style={{
                    display: "flex", justifyContent: "center", gap: 24, alignItems: "center",
                    marginBottom: 20, flexWrap: "wrap",
                  }}>
                    <div>
                      <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Your Guess</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "var(--text-secondary)", fontFamily: "'Inter', monospace" }}>
                        {formatAnswer(parseFloat(inputVal), q.unit)}
                      </div>
                    </div>
                    <div style={{ fontSize: 20, color: "var(--text-faint)" }}>→</div>
                    <div>
                      <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Answer</div>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)", fontFamily: "'Inter', monospace" }}>
                        {formatAnswer(q.answer, q.unit)}
                      </div>
                    </div>
                  </div>

                  {/* Score Bubble */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    background: scores[scores.length - 1] >= 170 ? "rgba(46,204,113,0.15)" : scores[scores.length - 1] >= 100 ? "rgba(240,192,64,0.15)" : "rgba(231,76,60,0.15)",
                    borderRadius: 12, padding: "10px 20px", marginBottom: 20,
                  }}>
                    <span style={{ fontSize: 24 }}>{scoreEmoji(scores[scores.length - 1])}</span>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--text-primary)" }}>
                        +{scores[scores.length - 1]} pts
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{getAccuracyLabel(scores[scores.length - 1])}</div>
                    </div>
                  </div>

                  <br />
                  <button onClick={nextQuestion} style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    border: "none", borderRadius: 12, padding: "14px 40px", fontSize: 15, fontWeight: 700,
                    color: "#0d0f13", cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
                    transition: "transform 0.2s",
                  }}
                    onMouseOver={e => e.currentTarget.style.transform = "translateY(-1px)"}
                    onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
                  >{currentQ >= 4 ? "See Results →" : "Next Question →"}</button>
                </div>
              )}

              {/* Question Counter */}
              <div style={{ marginTop: 20, fontSize: 12, color: "var(--text-faint)" }}>
                Question {currentQ + 1} of 5
                {scores.length > 0 && <span style={{ marginLeft: 12 }}>Score: {scores.reduce((a, b) => a + b, 0)}/1,000</span>}
              </div>
            </div>
          </div>
        )}

        {/* ── RESULTS SCREEN ── */}
        {showResult && (
          <div style={{ animation: "fadeIn 0.5s ease" }}>
            <div style={{
              background: "var(--bg-card)", borderRadius: 24, border: "1px solid var(--border-card)",
              padding: "36px 28px", boxShadow: "0 12px 48px rgba(0,0,0,0.25)", textAlign: "center",
            }}>
              {/* Big Score */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 64, marginBottom: 8 }}>
                  {totalScore >= 900 ? "🏆" : totalScore >= 700 ? "🔥" : totalScore >= 500 ? "📊" : "📉"}
                </div>
                <div style={{ fontSize: 56, fontWeight: 900, fontFamily: "'Inter', monospace", color: "var(--accent)", letterSpacing: "-0.03em" }}>
                  {totalScore}
                </div>
                <div style={{ fontSize: 16, color: "var(--text-muted)" }}>out of 1,000</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginTop: 8 }}>
                  {totalScore >= 900 ? "Financial Genius! 🧠" : totalScore >= 700 ? "Really Impressive!" : totalScore >= 500 ? "Solid Knowledge!" : totalScore >= 300 ? "Getting There!" : "Keep Learning!"}
                </div>
              </div>

              {/* Emoji Grid */}
              <div style={{ fontSize: 36, letterSpacing: 8, marginBottom: 24 }}>
                {emojiGrid}
              </div>

              {/* Question Breakdown */}
              <div style={{ textAlign: "left", marginBottom: 24 }}>
                {questions.map((qq, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "12px 0",
                    borderBottom: i < 4 ? "1px solid var(--border-input)" : "none",
                  }}>
                    <div style={{ fontSize: 20 }}>{scoreEmoji(scores[i])}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.4 }}>{qq.q}</div>
                      <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>You: <strong style={{ color: "var(--text-primary)" }}>{formatAnswer(guesses[i], qq.unit)}</strong></span>
                        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Answer: <strong style={{ color: "var(--accent)" }}>{formatAnswer(qq.answer, qq.unit)}</strong></span>
                      </div>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'Inter', monospace" }}>+{scores[i]}</div>
                  </div>
                ))}
              </div>

              {/* Share Buttons */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
                <button onClick={handleShare} style={{
                  padding: "14px 28px", borderRadius: 12, border: "1px solid var(--border-card)",
                  background: "var(--bg-input)", cursor: "pointer", fontSize: 14, fontWeight: 600,
                  color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
                }}>
                  {copied ? "✓ Copied!" : "📋 Copy Score"}
                </button>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(`https://www.pulsafi.com/pulse`)}`} target="_blank" rel="noopener" style={{
                  display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: 12, textDecoration: "none",
                  background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  fontSize: 14, fontWeight: 700, color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
                }}>Share on X →</a>
              </div>

              {/* ═══ LEADERBOARD SECTION ═══ */}
              <div style={{
                background: "var(--bg-input)", borderRadius: 14, padding: "20px", border: "1px solid var(--border-input)",
                marginBottom: 16,
              }}>
                {lbStatus?.success ? (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#2ecc71", marginBottom: 4 }}>
                      ✓ Submitted to Leaderboard{isLoggedIn && displayName ? ` as ${displayName}` : ""}
                    </div>
                    {lbStatus.elo && (
                      <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
                        ELO: <strong style={{ color: "var(--text-primary)" }}>{lbStatus.elo}</strong>
                        {lbStatus.elo_change !== undefined && (
                          <span style={{ color: lbStatus.elo_change >= 0 ? "#2ecc71" : "#e74c3c", fontWeight: 600, marginLeft: 6 }}>
                            {lbStatus.elo_change >= 0 ? "+" : ""}{lbStatus.elo_change}
                          </span>
                        )}
                      </div>
                    )}
                  </>
                ) : !isLoggedIn ? (
                  /* Not logged in — prompt to sign in */
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>🏆 Submit to Leaderboard</div>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 12px", lineHeight: 1.5 }}>
                      Sign in to automatically submit your score and track your ELO rating.
                    </p>
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      // Trigger the profile dropdown to open (click the avatar)
                      const avatar = document.querySelector('[aria-label="Toggle menu"]')?.previousElementSibling || document.querySelector('header button');
                      if (avatar) avatar.click();
                    }} style={{
                      display: "inline-block", padding: "10px 24px", borderRadius: 10, textDecoration: "none",
                      background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      fontSize: 13, fontWeight: 700, color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
                      cursor: "pointer",
                    }}>Sign In to Submit →</a>
                  </>
                ) : lbStatus === "loading" ? (
                  <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Submitting your score...</div>
                ) : lbStatus?.error ? (
                  <>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#e74c3c", marginBottom: 8 }}>{lbStatus.error}</div>
                    <button onClick={() => submitToLeaderboard(displayName)} style={{
                      padding: "10px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                      background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                      color: "#0d0f13", fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                    }}>Try Again</button>
                  </>
                ) : (
                  <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Preparing submission...</div>
                )}
              </div>

              {/* Challenge CTA */}
              <div style={{
                background: "var(--bg-input)", borderRadius: 14, padding: "20px", border: "1px solid var(--border-input)",
                marginBottom: 16,
              }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>Challenge a friend</div>
                <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "0 0 12px" }}>Everyone gets the same 5 questions today. Send them the link and compare scores.</p>
                <button onClick={() => { navigator.clipboard?.writeText("https://www.pulsafi.com/pulse"); setCopied(true); setTimeout(() => setCopied(false), 2000); }} style={{
                  padding: "10px 20px", borderRadius: 8, border: "1px solid var(--accent-border)",
                  background: "var(--accent-bg)", cursor: "pointer", fontSize: 12, fontWeight: 600,
                  color: "var(--accent)", fontFamily: "'DM Sans', sans-serif",
                }}>Copy Game Link</button>
              </div>

              {/* Come Back Tomorrow */}
              <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16 }}>
                <a href="/leaderboard" style={{
                  padding: "12px 24px", borderRadius: 10, textDecoration: "none",
                  background: "var(--bg-input)", border: "1px solid var(--border-card)",
                  fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
                }}>🏆 View Leaderboard</a>
              </div>
              <div style={{ fontSize: 13, color: "var(--text-faint)", marginTop: 12 }}>
                New questions drop every day at midnight ⏰
              </div>
            </div>

            {/* Today in Financial History */}
            {(() => {
              const fact = getDailyHistoryFact();
              return fact ? (
                <div style={{ marginTop: 24, padding: "24px", background: "linear-gradient(135deg, rgba(201,162,39,0.06), rgba(201,162,39,0.02))", borderRadius: 16, border: "1px solid rgba(201,162,39,0.18)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 18 }}>📜</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Today in Financial History</div>
                  </div>
                  <div style={{ fontSize: 15, color: "var(--text-primary)", fontWeight: 600, lineHeight: 1.5, marginBottom: 8 }}>
                    {fact.year}: {fact.fact}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                    {new Date(2026, fact.month - 1, fact.day).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Plug Tools */}
            <div style={{ marginTop: 24, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Want to improve your score?</div>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 14px", lineHeight: 1.6 }}>The best way to know financial numbers is to use them. Try our free tools:</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { name: "Mortgage Calculator", href: "/tools/mortgage-calculator", icon: "🏠" },
                  { name: "Salary Breakdown", href: "/tools/salary-breakdown-calculator", icon: "💰" },
                  { name: "Opportunity Cost", href: "/tools/opportunity-cost-calculator", icon: "⏳" },
                  { name: "Money Personality Quiz", href: "/quiz", icon: "🧠" },
                ].map((t, i) => (
                  <a key={i} href={t.href} style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                    background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)",
                    textDecoration: "none", color: "var(--text-secondary)", fontSize: 12, transition: "border-color 0.2s",
                  }}
                    onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
                    onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-input)"}
                  >{t.icon} {t.name}</a>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <Footer />
    </div>
  );
}

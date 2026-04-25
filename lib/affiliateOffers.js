// Affiliate offer registry — the single source of truth for monetized placements.
//
// Each offer is rendered by <AffiliateOffer category="..." placement="..." />.
// The component picks one offer at random (weighted) from the matching category.
//
// To activate an offer:
//   1. Sign up with the partner's affiliate program (Impact, Partnerize, Commission Junction, FlexOffers).
//   2. Replace the `url` PLACEHOLDER with your tracking link.
//   3. Set `enabled: true`.
//
// Click events POST to /api/track-click with { offerId, category, placement, path }.

export const affiliateOffers = {
  mortgage: [
    {
      id: "lendingtree-purchase",
      partner: "LendingTree",
      headline: "Compare Today's Mortgage Rates",
      subhead: "Get personalized quotes from up to 5 lenders in 3 minutes. No SSN required to start.",
      cta: "See My Rates",
      url: "PLACEHOLDER_LENDINGTREE_PURCHASE_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
    {
      id: "credible-purchase",
      partner: "Credible",
      headline: "Find Your Best Mortgage Rate",
      subhead: "Compare prequalified rates from multiple lenders without affecting your credit score.",
      cta: "Compare Rates",
      url: "PLACEHOLDER_CREDIBLE_PURCHASE_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
    {
      id: "rocket-mortgage",
      partner: "Rocket Mortgage",
      headline: "Get Approved in Minutes",
      subhead: "America's largest mortgage lender. See what you qualify for online — no commitment.",
      cta: "Start Approval",
      url: "PLACEHOLDER_ROCKET_MORTGAGE_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
  ],

  refinance: [
    {
      id: "lendingtree-refi",
      partner: "LendingTree",
      headline: "Refinance and Cut Your Monthly Payment",
      subhead: "Compare refi offers from top lenders. See how much you could save in 3 minutes.",
      cta: "Compare Refi Rates",
      url: "PLACEHOLDER_LENDINGTREE_REFI_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
  ],

  brokerage: [
    {
      id: "sofi-invest",
      partner: "SoFi Invest",
      headline: "Active Investing With $0 Commissions",
      subhead: "Trade stocks, ETFs, and fractional shares. New members can earn up to $1,000 in stock.",
      cta: "Open Account",
      url: "https://www.sofi.com/invite/invest?gcp=ca9d7694-009a-4f16-8c75-bf668a985eef&isAliasGcp=false",
      disclosure: "Referral link. Investing involves risk. Bonuses subject to SoFi terms.",
      weight: 2,
      enabled: true,
    },
    {
      id: "robinhood",
      partner: "Robinhood",
      headline: "Start Investing With $0 Commissions",
      subhead: "Get a free stock when you sign up and fund your account. No minimums.",
      cta: "Get Free Stock",
      url: "PLACEHOLDER_ROBINHOOD_URL",
      disclosure: "Advertiser disclosure. Investing involves risk.",
      weight: 1,
      enabled: false,
    },
    {
      id: "m1-finance",
      partner: "M1 Finance",
      headline: "Build a Custom Portfolio, Free",
      subhead: "Automated investing with fractional shares. Up to $250 bonus for new accounts.",
      cta: "Open Account",
      url: "PLACEHOLDER_M1_URL",
      disclosure: "Advertiser disclosure. Investing involves risk.",
      weight: 1,
      enabled: false,
    },
    {
      id: "public",
      partner: "Public",
      headline: "Invest in Stocks, Bonds, and More",
      subhead: "Get up to $10,000 when you transfer your portfolio. Earn 5%+ on uninvested cash.",
      cta: "Get Started",
      url: "PLACEHOLDER_PUBLIC_URL",
      disclosure: "Advertiser disclosure. Investing involves risk.",
      weight: 1,
      enabled: false,
    },
  ],

  crypto: [
    {
      id: "sofi-crypto",
      partner: "SoFi Crypto",
      headline: "Buy and Trade Crypto on SoFi",
      subhead: "Trade Bitcoin, Ethereum, and more with as little as $10. Bonuses for new members.",
      cta: "Get Started",
      url: "https://www.sofi.com/invite/crypto?gcp=edbe21b8-dd60-4d68-9b59-07bcbc1d015a&isAliasGcp=false",
      disclosure: "Referral link. Crypto is highly volatile and unregulated. Not FDIC-insured.",
      weight: 1,
      enabled: true,
    },
  ],

  debt: [
    {
      id: "sofi-personal-loan",
      partner: "SoFi",
      headline: "Consolidate Debt With a Fixed-Rate Loan",
      subhead: "Pay off credit cards faster. Check your rate in 2 minutes — soft credit pull, no impact to score.",
      cta: "Check My Rate",
      url: "https://www.sofi.com/invite/personal-loans?gcp=d1988245-377d-4ba4-b29a-6d301bec21c0&isAliasGcp=false",
      disclosure: "Referral link. Loan terms and rates subject to credit approval.",
      weight: 2,
      enabled: true,
    },
    {
      id: "credible-debt",
      partner: "Credible",
      headline: "Compare Debt Consolidation Loans",
      subhead: "See prequalified rates from multiple lenders in 2 minutes — soft credit pull only.",
      cta: "Compare Loans",
      url: "PLACEHOLDER_CREDIBLE_LOAN_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
  ],

  "student-loans": [
    {
      id: "sofi-student-refi",
      partner: "SoFi",
      headline: "Refinance Your Student Loans",
      subhead: "Lower your rate and pay off student debt faster. No fees, fixed or variable rates.",
      cta: "Check My Rate",
      url: "https://www.sofi.com/invite/student-loans?gcp=f24d1410-22b1-4bd4-b1cf-c3a23d0e9161&isAliasGcp=false",
      disclosure: "Referral link. Refinancing federal loans removes federal protections (forgiveness, IDR).",
      weight: 3,
      enabled: true,
    },
    {
      id: "sofi-private-student",
      partner: "SoFi",
      headline: "Private Student Loans",
      subhead: "Cover tuition with a private student loan. No fees and competitive rates.",
      cta: "Apply Now",
      url: "https://www.sofi.com/invite/private-student-loans?gcp=95b8fa8d-0965-468b-a63d-8cf4efa65588&isAliasGcp=false",
      disclosure: "Referral link. Subject to credit approval.",
      weight: 1,
      enabled: true,
    },
    {
      id: "sofi-medical-student",
      partner: "SoFi",
      headline: "Refi for Doctors & Dentists",
      subhead: "Specialty refinancing for medical and dental school graduates. Lower rates, residency-friendly terms.",
      cta: "Check My Rate",
      url: "https://www.sofi.com/invite/medical-student-loans?gcp=1a9d80ff-fbda-4590-848c-a6de5c42c62f&isAliasGcp=false",
      disclosure: "Referral link. Refinancing federal loans removes federal protections.",
      weight: 1,
      enabled: true,
    },
  ],

  retirement: [
    {
      id: "wealthfront",
      partner: "Wealthfront",
      headline: "Automated Retirement Investing",
      subhead: "Tax-loss harvesting, low fees, and IRA / Roth IRA accounts. $5,000 managed free.",
      cta: "Open IRA",
      url: "PLACEHOLDER_WEALTHFRONT_URL",
      disclosure: "Advertiser disclosure. Investing involves risk.",
      weight: 1,
      enabled: false,
    },
    {
      id: "betterment",
      partner: "Betterment",
      headline: "Smart, Hands-Off Retirement Saving",
      subhead: "IRA, Roth IRA, and SEP IRA accounts with automatic rebalancing.",
      cta: "Get Started",
      url: "PLACEHOLDER_BETTERMENT_URL",
      disclosure: "Advertiser disclosure. Investing involves risk.",
      weight: 1,
      enabled: false,
    },
  ],

  savings: [
    {
      id: "sofi-money",
      partner: "SoFi Checking & Savings",
      headline: "High-Yield Savings + Checking, No Fees",
      subhead: "Earn up to 3.80% APY on savings, 0.50% on checking. FDIC insured up to $3M. Bonuses for direct deposit.",
      cta: "Open Account",
      url: "https://www.sofi.com/invite/money?gcp=48b52576-c8e4-442f-a82b-2b0c8853ed80&isAliasGcp=false",
      disclosure: "Referral link. APYs subject to change. Bonuses require direct deposit.",
      weight: 1,
      enabled: true,
    },
  ],

  jobs: [
    {
      id: "ziprecruiter",
      partner: "ZipRecruiter",
      headline: "Get Discovered by Top Employers",
      subhead: "Post your resume and let employers come to you. Free to apply.",
      cta: "Find Jobs",
      url: "PLACEHOLDER_ZIPRECRUITER_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
  ],

  "credit-cards": [
    {
      id: "bankrate-cards",
      partner: "Bankrate",
      headline: "Compare Today's Top Credit Cards",
      subhead: "Side-by-side rates, rewards, and signup bonuses from leading issuers — updated daily.",
      cta: "Compare Cards",
      url: "PLACEHOLDER_BANKRATE_CARDS_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
    {
      id: "credit-karma-cards",
      partner: "Credit Karma",
      headline: "See Cards Matched to Your Credit Profile",
      subhead: "Get personalized card recommendations with approval odds before you apply.",
      cta: "See Matches",
      url: "PLACEHOLDER_CREDIT_KARMA_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
    {
      id: "experian-cardmatch",
      partner: "Experian CardMatch",
      headline: "Pre-Qualified Card Offers (Soft Pull)",
      subhead: "See offers you're likely approved for without affecting your credit score.",
      cta: "Find Offers",
      url: "PLACEHOLDER_EXPERIAN_CARDMATCH_URL",
      disclosure: "Advertiser disclosure",
      weight: 1,
      enabled: false,
    },
  ],
};

export function pickOffer(category) {
  const pool = (affiliateOffers[category] || []).filter(o => o.enabled);
  if (pool.length === 0) return null;
  const totalWeight = pool.reduce((sum, o) => sum + (o.weight || 1), 0);
  let roll = Math.random() * totalWeight;
  for (const offer of pool) {
    roll -= (offer.weight || 1);
    if (roll <= 0) return offer;
  }
  return pool[0];
}

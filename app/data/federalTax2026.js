// Federal tax parameters for tax year 2026.
//
// Source: IRS Rev. Proc. 2025-32 (inflation adjustments for 2026), as amended
// by the One Big Beautiful Bill Act for the standard deduction; Social Security
// wage base from the SSA 2026 fact sheet.
//
// Every page that computes federal income tax or FICA should import from here
// so the whole site moves together when the IRS publishes next year's numbers.
// Bracket `max` values are the top of each bracket in *taxable* income
// (after the standard deduction). Rates are integer percents.

const TAX_YEAR = 2026;

const FEDERAL_BRACKETS = {
  single: [
    { min: 0, max: 12400, rate: 10 },
    { min: 12400, max: 50400, rate: 12 },
    { min: 50400, max: 105700, rate: 22 },
    { min: 105700, max: 201775, rate: 24 },
    { min: 201775, max: 256225, rate: 32 },
    { min: 256225, max: 640600, rate: 35 },
    { min: 640600, max: Infinity, rate: 37 },
  ],
  mfj: [
    { min: 0, max: 24800, rate: 10 },
    { min: 24800, max: 100800, rate: 12 },
    { min: 100800, max: 211400, rate: 22 },
    { min: 211400, max: 403550, rate: 24 },
    { min: 403550, max: 512450, rate: 32 },
    { min: 512450, max: 768700, rate: 35 },
    { min: 768700, max: Infinity, rate: 37 },
  ],
  mfs: [
    { min: 0, max: 12400, rate: 10 },
    { min: 12400, max: 50400, rate: 12 },
    { min: 50400, max: 105700, rate: 22 },
    { min: 105700, max: 201775, rate: 24 },
    { min: 201775, max: 256225, rate: 32 },
    { min: 256225, max: 384350, rate: 35 },
    { min: 384350, max: Infinity, rate: 37 },
  ],
  hoh: [
    { min: 0, max: 17700, rate: 10 },
    { min: 17700, max: 67450, rate: 12 },
    { min: 67450, max: 105700, rate: 22 },
    { min: 105700, max: 201775, rate: 24 },
    { min: 201775, max: 256200, rate: 32 },
    { min: 256200, max: 640600, rate: 35 },
    { min: 640600, max: Infinity, rate: 37 },
  ],
};

const STANDARD_DEDUCTIONS = {
  single: 16100,
  mfj: 32200,
  mfs: 16100,
  hoh: 24150,
};

// FICA
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 184500;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_THRESHOLD = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009;

// Retirement / savings account limits for 2026 (IRS IR-2025-111 and Rev. Proc. 2025-19)
const CONTRIBUTION_LIMITS = {
  k401: 24500,
  k401CatchUp50: 8000,
  k401CatchUp60to63: 11250,
  k401Total415c: 72000,
  ira: 7500,
  iraCatchUp50: 1100,
  hsaSelf: 4400,
  hsaFamily: 8750,
  hsaCatchUp55: 1000,
};

// Federal income tax on `taxableIncome` (already net of deductions).
function calcFederalTax(taxableIncome, filing = "single") {
  const brackets = FEDERAL_BRACKETS[filing] || FEDERAL_BRACKETS.single;
  let tax = 0;
  for (const b of brackets) {
    if (taxableIncome <= b.min) break;
    tax += (Math.min(taxableIncome, b.max) - b.min) * (b.rate / 100);
  }
  return tax;
}

module.exports = {
  TAX_YEAR,
  FEDERAL_BRACKETS,
  STANDARD_DEDUCTIONS,
  SOCIAL_SECURITY_RATE,
  SOCIAL_SECURITY_WAGE_BASE,
  MEDICARE_RATE,
  ADDITIONAL_MEDICARE_THRESHOLD,
  ADDITIONAL_MEDICARE_RATE,
  CONTRIBUTION_LIMITS,
  calcFederalTax,
};

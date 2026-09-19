import { HOME_AFFORDABILITY as H } from "../../../data/homeAffordability";

export const dynamic = "force-static";

// Downloadable dataset behind /research/salary-needed-to-buy-a-home-2026.
export async function GET() {
  const cols = ["rank", "metro", "state", "zhvi_month", "median_home_value", "yoy_change_pct", "mortgage_rate_30yr", "rate_date", "property_tax_rate_pct", "annual_insurance", "down_payment_20pct", "monthly_payment_20pct_down", "income_needed_20pct_down", "monthly_payment_10pct_down", "income_needed_10pct_down", "principal_city_median_household_income", "income_gap_ratio"];
  const lines = [cols.join(",")];
  for (const m of H.metros) {
    lines.push([
      m.rank, `"${m.metro}"`, m.stateAbbr, H.zhviMonth, m.medianHomeValue, m.yoyChangePct, H.rate30, H.rateDate,
      m.propertyTaxRate, m.annualInsurance, m.down20.downPayment, m.down20.monthlyPITI, m.down20.incomeNeeded,
      m.down10.monthlyPITI, m.down10.incomeNeeded, m.medianHouseholdIncome ?? "", m.incomeGapRatio ?? "",
    ].join(","));
  }
  lines.push("");
  lines.push("state_rank,state,,zhvi_month,median_home_value,yoy_change_pct,mortgage_rate_30yr,rate_date,property_tax_rate_pct,annual_insurance,down_payment_20pct,monthly_payment_20pct_down,income_needed_20pct_down,monthly_payment_10pct_down,income_needed_10pct_down");
  const states = [...H.states].sort((a, b) => b.down20.incomeNeeded - a.down20.incomeNeeded);
  states.forEach((s, i) => {
    lines.push([i + 1, `"${s.state}"`, "", H.zhviMonth, s.medianHomeValue, s.yoyChangePct, H.rate30, H.rateDate, s.propertyTaxRate, s.annualInsurance, s.down20.downPayment, s.down20.monthlyPITI, s.down20.incomeNeeded, s.down10.monthlyPITI, s.down10.incomeNeeded].join(","));
  });
  lines.push("");
  lines.push(`"Source: Pulsafi Research, https://www.pulsafi.com/research/salary-needed-to-buy-a-home-2026. Home values: Zillow ZHVI (mid-tier, smoothed, seasonally adjusted). Rate: Freddie Mac PMMS via FRED. Income: US Census ACS (principal city). Free to use with attribution."`);
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="pulsafi-salary-needed-to-buy-a-home-${H.generatedAt}.csv"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}

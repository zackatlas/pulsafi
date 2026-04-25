// State-level refinance closing-cost estimates.
// Source: ClosingCorp / CoreLogic average closing costs for refinance transactions
// (taxes excluded except where state has transfer/recording taxes that apply on refi).
// Numbers are rough averages; actual costs vary by lender, loan size, and county.

const STATE_REFI_CLOSING_COSTS = {
  "alabama": 2400, "alaska": 3200, "arizona": 3000, "arkansas": 2300, "california": 5500,
  "colorado": 3400, "connecticut": 5000, "delaware": 4800, "florida": 4400, "georgia": 3300,
  "hawaii": 7500, "idaho": 2800, "illinois": 4200, "indiana": 2200, "iowa": 2400,
  "kansas": 2600, "kentucky": 2400, "louisiana": 3300, "maine": 3100, "maryland": 4800,
  "massachusetts": 4500, "michigan": 2800, "minnesota": 3000, "mississippi": 2400, "missouri": 2300,
  "montana": 2900, "nebraska": 2700, "nevada": 4100, "new-hampshire": 3000, "new-jersey": 5800,
  "new-mexico": 3000, "new-york": 7000, "north-carolina": 2800, "north-dakota": 2500, "ohio": 2900,
  "oklahoma": 2500, "oregon": 3300, "pennsylvania": 4400, "rhode-island": 4000, "south-carolina": 2900,
  "south-dakota": 2400, "tennessee": 2300, "texas": 3300, "utah": 2900, "vermont": 3200,
  "virginia": 3000, "washington": 4200, "west-virginia": 2700, "wisconsin": 2700, "wyoming": 2600,
  "district-of-columbia": 6000,
};

// States that levy a mortgage recording or transfer tax that materially impacts refi cost.
// Used in copy ("In [state], you'll pay an additional ~X% in transfer taxes...")
const STATE_REFI_NOTES = {
  "new-york": "New York charges a mortgage recording tax (1.8-2.8% of loan amount) on refinances unless using a CEMA agreement.",
  "florida": "Florida levies a 0.35% intangible tax on the loan amount and 0.20% documentary stamp tax.",
  "minnesota": "Minnesota charges a 0.23% mortgage registration tax on the loan amount.",
  "georgia": "Georgia levies an intangibles tax of $1.50 per $500 of loan amount.",
  "tennessee": "Tennessee charges a $0.115 per $100 indebtedness tax on new mortgages.",
  "alabama": "Alabama collects a 0.15% mortgage tax on the recorded loan amount.",
};

module.exports = { STATE_REFI_CLOSING_COSTS, STATE_REFI_NOTES };

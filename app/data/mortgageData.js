// Home prices for mortgage affordability pages
const HOME_PRICES = [
  100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000,
  550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000, 950000,
  1000000, 1100000, 1200000, 1300000, 1400000, 1500000, 2000000
];

// Average mortgage rate assumptions (2024-2025 range)
const MORTGAGE_RATES = {
  "30yr_fixed": 6.875,
  "15yr_fixed": 6.125,
  "5yr_arm": 6.375
};

// State-level property tax rates (annual, as percentage of home value)
const STATE_PROPERTY_TAX_RATES = {
  "alabama": 0.40, "alaska": 1.04, "arizona": 0.62, "arkansas": 0.62, "california": 0.71,
  "colorado": 0.49, "connecticut": 2.15, "delaware": 0.53, "florida": 0.89, "georgia": 0.83,
  "hawaii": 0.32, "idaho": 0.63, "illinois": 2.07, "indiana": 0.81, "iowa": 1.57,
  "kansas": 1.41, "kentucky": 0.83, "louisiana": 0.56, "maine": 1.24, "maryland": 1.05,
  "massachusetts": 1.15, "michigan": 1.38, "minnesota": 1.11, "mississippi": 0.65, "missouri": 0.91,
  "montana": 0.74, "nebraska": 1.73, "nevada": 0.53, "new-hampshire": 1.86, "new-jersey": 2.47,
  "new-mexico": 0.67, "new-york": 1.62, "north-carolina": 0.77, "north-dakota": 0.98, "ohio": 1.53,
  "oklahoma": 0.90, "oregon": 0.87, "pennsylvania": 1.49, "rhode-island": 1.40, "south-carolina": 0.56,
  "south-dakota": 1.22, "tennessee": 0.56, "texas": 1.60, "utah": 0.58, "vermont": 1.90,
  "virginia": 0.80, "washington": 0.84, "west-virginia": 0.57, "wisconsin": 1.61, "wyoming": 0.55,
  "district-of-columbia": 0.57
};

// Average homeowners insurance by state (annual)
const STATE_INSURANCE_RATES = {
  "alabama": 2400, "alaska": 1300, "arizona": 1700, "arkansas": 2600, "california": 1600,
  "colorado": 2200, "connecticut": 1800, "delaware": 1200, "florida": 4200, "georgia": 2000,
  "hawaii": 1200, "idaho": 1200, "illinois": 1800, "indiana": 1600, "iowa": 1700,
  "kansas": 2800, "kentucky": 2000, "louisiana": 3600, "maine": 1300, "maryland": 1500,
  "massachusetts": 1700, "michigan": 1800, "minnesota": 1700, "mississippi": 2600, "missouri": 2200,
  "montana": 1800, "nebraska": 2600, "nevada": 1300, "new-hampshire": 1300, "new-jersey": 1500,
  "new-mexico": 1600, "new-york": 1800, "north-carolina": 1800, "north-dakota": 1900, "ohio": 1400,
  "oklahoma": 3200, "oregon": 1200, "pennsylvania": 1400, "rhode-island": 1900, "south-carolina": 2200,
  "south-dakota": 2000, "tennessee": 2100, "texas": 3400, "utah": 1200, "vermont": 1100,
  "virginia": 1500, "washington": 1300, "west-virginia": 1500, "wisconsin": 1200, "wyoming": 1400,
  "district-of-columbia": 1400
};

module.exports = { HOME_PRICES, MORTGAGE_RATES, STATE_PROPERTY_TAX_RATES, STATE_INSURANCE_RATES };

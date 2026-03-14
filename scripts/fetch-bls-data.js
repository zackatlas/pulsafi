#!/usr/bin/env node
/**
 * BLS OEWS Data Integration Script
 *
 * Reads the BLS "all_data_M_2024.xlsx" file (downloaded from bls.gov/oes/tables.htm)
 * and maps it to our job titles and cities.
 *
 * Prerequisites:
 *   1. Download "All data" from https://www.bls.gov/oes/tables.htm
 *   2. Place all_data_M_2024.xlsx in the pulsafi root folder
 *   3. Run: npm install xlsx (if not already installed)
 *
 * Usage: node scripts/fetch-bls-data.js
 */

const fs = require("fs");
const path = require("path");

// ─── SOC Code to Job Slug mapping ───
const SOC_TO_SLUG = {
  // Technology
  "15-1252": "software-engineer",
  "15-2051": "data-scientist",
  "15-1212": "cybersecurity-analyst",
  "15-1244": "devops-engineer",
  "15-1255": "web-developer",
  "15-1242": "database-administrator",
  "11-3021": "it-manager",
  "15-1211": "systems-analyst",
  "15-1241": "network-engineer",
  "15-1253": "qa-engineer",
  "27-3042": "technical-writer",
  "15-1256": "mobile-developer",
  "15-1243": "data-engineer",
  "15-1232": "it-support-specialist",
  "15-1299": "solutions-architect",
  "15-1221": "scrum-master",
  "15-1254": "frontend-developer",
  "15-1251": "backend-developer",

  // Healthcare
  "29-1141": "registered-nurse",
  "29-1228": "physician",
  "29-1021": "dentist",
  "29-1051": "pharmacist",
  "29-1123": "physical-therapist",
  "29-1171": "nurse-practitioner",
  "31-9092": "medical-assistant",
  "29-1292": "dental-hygienist",
  "29-2034": "radiologic-technologist",
  "29-1122": "occupational-therapist",
  "29-1127": "speech-pathologist",
  "29-1248": "surgeon",
  "29-1211": "anesthesiologist",
  "29-1223": "psychiatrist",
  "29-1041": "optometrist",
  "29-1131": "veterinarian",
  "29-2042": "emt-paramedic",
  "29-2012": "medical-lab-technician",
  "29-1126": "respiratory-therapist",
  "29-1031": "dietitian",
  "29-9021": "health-information-technician",
  "31-1120": "home-health-aide",
  "29-2055": "surgical-technologist",
  "31-9097": "phlebotomist",
  "29-2072": "medical-records-specialist",

  // Business & Finance
  "13-2011": "accountant",
  "13-2051": "financial-analyst",
  "11-2021": "marketing-manager",
  "11-3121": "human-resources-manager",
  "13-1111": "management-consultant",
  "11-9199": "project-manager",
  "11-1021": "operations-manager",
  "11-2022": "sales-manager",
  "13-2052": "financial-advisor",
  "15-2011": "actuary",
  "19-3011": "economist",
  "13-2031": "budget-analyst",
  "13-2072": "loan-officer",
  "13-2053": "insurance-underwriter",
  "41-9022": "real-estate-agent",
  "43-4131": "personal-banker",
  "13-2082": "tax-preparer",
  "13-1041": "compliance-officer",
  "13-2054": "risk-analyst",
  "11-3061": "purchasing-manager",
  "13-1161": "market-research-analyst",
  "11-1011": "chief-financial-officer",

  // Education
  "25-2021": "elementary-teacher",
  "25-2031": "high-school-teacher",
  "25-2059": "special-education-teacher",
  "21-1012": "school-counselor",
  "11-9032": "principal",
  "25-1099": "college-professor",
  "25-9045": "teaching-assistant",
  "25-4022": "librarian",
  "25-9031": "instructional-designer",
  "11-9039": "education-administrator",
  "25-3011": "esl-teacher",
  "25-2011": "preschool-teacher",
  "19-3034": "school-psychologist",
  "25-9099": "tutoring-coordinator",

  // Engineering
  "17-2141": "mechanical-engineer",
  "17-2071": "electrical-engineer",
  "17-2051": "civil-engineer",
  "17-2041": "chemical-engineer",
  "17-2011": "aerospace-engineer",
  "17-2112": "industrial-engineer",
  "17-2081": "environmental-engineer",
  "17-2031": "biomedical-engineer",
  "17-2171": "petroleum-engineer",
  "17-2131": "materials-engineer",
  "17-2161": "nuclear-engineer",
  "17-2021": "agricultural-engineer",
  "17-2121": "marine-engineer",
  "17-2151": "mining-engineer",
  "17-2199": "robotics-engineer",
  "17-2111": "fire-protection-engineer",

  // Trades
  "47-2111": "electrician",
  "47-2152": "plumber",
  "49-9021": "hvac-technician",
  "47-2031": "carpenter",
  "51-4121": "welder",
  "47-2073": "heavy-equipment-operator",
  "11-9021": "construction-manager",
  "49-3023": "auto-mechanic",
  "49-3031": "diesel-mechanic",
  "47-4021": "elevator-installer",
  "47-2171": "ironworker",
  "47-2021": "mason",
  "47-2141": "painter",
  "47-2181": "roofer",
  "47-2211": "sheet-metal-worker",

  // Legal
  "23-1011": "lawyer",
  "23-2011": "paralegal",
  "43-6012": "legal-secretary",
  "23-1023": "judge",
  "23-1022": "mediator",
  "23-2099": "legal-analyst",

  // Creative & Media
  "27-1024": "graphic-designer",
  "27-4032": "video-editor",
  "27-3043": "content-writer",
  "27-4021": "photographer",
  "27-1011": "art-director",
  "27-1014": "animator",
  "27-3031": "public-relations-specialist",
  "27-3023": "journalist",
  "27-2012": "film-director",
  "27-2041": "music-producer",

  // Government & Public Service
  "33-3051": "police-officer",
  "33-2011": "firefighter",
  "21-1021": "social-worker",
  "19-3051": "urban-planner",
  "33-3021": "federal-agent",
  "19-2041": "environmental-scientist",
  "21-1091": "public-health-advisor",
};

// Additional slug mappings for jobs that share SOC codes
const EXTRA_SLUG_MAPPINGS = {
  "full-stack-developer": "15-1252",    // Same as software-engineer
  "game-developer": "15-1255",          // Same as web-developer
  "blockchain-developer": "15-1299",    // Same as solutions-architect
  "ai-engineer": "15-2051",             // Same as data-scientist
  "business-analyst": "13-1111",        // Same as management-consultant
  "auditor": "13-2011",                 // Same as accountant
  "investment-banker": "13-2051",       // Same as financial-analyst
  "compliance-specialist": "13-1041",   // Same as compliance-officer
  "corporate-counsel": "23-1011",       // Same as lawyer
  "patent-attorney": "23-1011",         // Same as lawyer
  "public-defender": "23-1011",         // Same as lawyer
  "social-media-manager": "27-3031",    // Same as PR specialist
  "copywriter": "27-3043",             // Same as content-writer
  "structural-engineer": "17-2051",     // Same as civil-engineer
  "automotive-engineer": "17-2141",     // Same as mechanical-engineer
  "manufacturing-engineer": "17-2112",  // Same as industrial-engineer
  "geological-engineer": "17-2151",     // Same as mining-engineer
  "curriculum-developer": "25-9031",    // Same as instructional-designer
  "intelligence-analyst": "33-3021",    // Same as federal-agent
  "customs-officer": "33-3051",         // Same as police-officer
  "city-manager": "11-1011",            // Same as chief-financial-officer (Chief Executives)
};

// Build reverse lookup: slug -> SOC
const SLUG_TO_SOC = {};
for (const [soc, slug] of Object.entries(SOC_TO_SLUG)) {
  if (!SLUG_TO_SOC[slug]) SLUG_TO_SOC[slug] = soc;
}
for (const [slug, soc] of Object.entries(EXTRA_SLUG_MAPPINGS)) {
  if (!SLUG_TO_SOC[slug]) SLUG_TO_SOC[slug] = soc;
}

// ─── Metro area CBSA codes to city slug mapping ───
const METRO_TO_CITIES = {
  "35620": ["new-york-ny", "newark-nj", "jersey-city-nj"],
  "31080": ["los-angeles-ca", "long-beach-ca", "anaheim-ca", "glendale-ca", "pasadena-ca", "torrance-ca", "inglewood-ca", "west-covina-ca", "norwalk-ca", "el-monte-ca", "burbank-ca", "compton-ca"],
  "16980": ["chicago-il", "naperville-il", "elgin-il", "evanston-il", "cicero-il", "arlington-heights-il", "schaumburg-il"],
  "19100": ["dallas-tx", "fort-worth-tx", "arlington-tx", "plano-tx", "irving-tx", "garland-tx", "frisco-tx", "mckinney-tx", "denton-tx", "richardson-tx", "lewisville-tx", "allen-tx"],
  "26420": ["houston-tx", "sugar-land-tx", "baytown-tx", "pasadena-tx", "pearland-tx", "league-city-tx", "missouri-city-tx", "conroe-tx"],
  "47900": ["washington-dc", "arlington-va", "alexandria-va"],
  "33100": ["miami-fl", "fort-lauderdale-fl", "pompano-beach-fl", "hialeah-fl", "hollywood-fl", "coral-springs-fl", "pembroke-pines-fl", "miramar-fl", "davie-fl", "plantation-fl", "sunrise-fl", "boca-raton-fl", "deerfield-beach-fl", "boynton-beach-fl", "delray-beach-fl"],
  "37980": ["philadelphia-pa", "camden-nj"],
  "12060": ["atlanta-ga", "sandy-springs-ga", "roswell-ga", "johns-creek-ga", "alpharetta-ga", "marietta-ga", "smyrna-ga"],
  "14460": ["boston-ma", "cambridge-ma", "quincy-ma"],
  "38060": ["phoenix-az", "mesa-az", "chandler-az", "scottsdale-az", "tempe-az", "gilbert-az", "glendale-az", "peoria-az", "surprise-az", "goodyear-az"],
  "40140": ["riverside-ca", "san-bernardino-ca", "ontario-ca", "fontana-ca", "moreno-valley-ca", "rancho-cucamonga-ca", "corona-ca", "murrieta-ca", "temecula-ca"],
  "19740": ["denver-co", "aurora-co", "lakewood-co", "thornton-co", "arvada-co", "westminster-co", "centennial-co"],
  "41740": ["san-diego-ca", "chula-vista-ca", "carlsbad-ca", "oceanside-ca", "escondido-ca", "el-cajon-ca", "vista-ca", "san-marcos-ca"],
  "38900": ["portland-or", "beaverton-or", "hillsboro-or", "gresham-or"],
  "42660": ["seattle-wa", "tacoma-wa", "bellevue-wa", "kent-wa", "renton-wa", "federal-way-wa", "kirkland-wa", "auburn-wa", "redmond-wa"],
  "33460": ["minneapolis-mn", "st-paul-mn", "bloomington-mn", "brooklyn-park-mn", "plymouth-mn", "eagan-mn", "woodbury-mn"],
  "45300": ["tampa-fl", "st-petersburg-fl", "clearwater-fl", "brandon-fl"],
  "41180": ["st-louis-mo"],
  "12580": ["baltimore-md"],
  "36740": ["orlando-fl", "kissimmee-fl"],
  "16740": ["charlotte-nc", "concord-nc", "gastonia-nc"],
  "41700": ["san-antonio-tx"],
  "39300": ["providence-ri", "warwick-ri", "cranston-ri"],
  "34980": ["nashville-tn", "murfreesboro-tn", "franklin-tn"],
  "27260": ["jacksonville-fl"],
  "31140": ["louisville-ky"],
  "36420": ["oklahoma-city-ok", "edmond-ok", "norman-ok"],
  "40060": ["richmond-va"],
  "35380": ["new-orleans-la", "metairie-la"],
  "39580": ["raleigh-nc", "cary-nc"],
  "32820": ["memphis-tn"],
  "41620": ["salt-lake-city-ut", "west-jordan-ut", "provo-ut", "west-valley-city-ut", "sandy-ut", "orem-ut", "ogden-ut"],
  "13820": ["birmingham-al"],
  "26900": ["indianapolis-in", "carmel-in", "fishers-in"],
  "28140": ["kansas-city-mo", "kansas-city-ks", "overland-park-ks", "olathe-ks"],
  "17460": ["cleveland-oh"],
  "18140": ["columbus-oh"],
  "12420": ["austin-tx", "round-rock-tx", "georgetown-tx", "cedar-park-tx", "pflugerville-tx"],
  "40900": ["sacramento-ca", "roseville-ca", "elk-grove-ca", "folsom-ca"],
  "17140": ["cincinnati-oh"],
  "29820": ["las-vegas-nv", "henderson-nv", "north-las-vegas-nv"],
  "38300": ["pittsburgh-pa"],
  "26620": ["des-moines-ia", "west-des-moines-ia"],
  "33340": ["milwaukee-wi"],
  "36540": ["omaha-ne"],
  "24340": ["grand-rapids-mi"],
  "46060": ["tucson-az"],
  "21340": ["el-paso-tx"],
  "15380": ["buffalo-ny"],
  "40380": ["rochester-ny"],
  "10740": ["albuquerque-nm"],
  "12940": ["baton-rouge-la"],
  "44060": ["spokane-wa"],
  "14260": ["boise-id"],
  "19820": ["detroit-mi", "warren-mi", "dearborn-mi", "livonia-mi", "troy-mi", "westland-mi", "farmington-hills-mi", "southfield-mi", "st-clair-shores-mi", "rochester-hills-mi"],
  "24860": ["greenville-sc"],
  "16700": ["charleston-sc", "north-charleston-sc"],
  "25540": ["hartford-ct"],
  "35300": ["new-haven-ct"],
  "10900": ["allentown-pa", "bethlehem-pa"],
  "46140": ["tulsa-ok"],
  "47260": ["virginia-beach-va", "norfolk-va", "newport-news-va", "hampton-va"],
  "24660": ["greensboro-nc", "high-point-nc"],
  "27140": ["jackson-ms"],
  "30460": ["lexington-ky"],
  "10420": ["akron-oh"],
  "19380": ["dayton-oh"],
  "16860": ["chattanooga-tn"],
  "25060": ["harrisburg-pa"],
  "30780": ["little-rock-ar"],
  "20500": ["durham-nc"],
  "44700": ["stockton-ca"],
  "42540": ["scranton-pa"],
  "49340": ["worcester-ma"],
  "15980": ["cape-coral-fl", "fort-myers-fl"],
  "29460": ["lakeland-fl"],
  "48620": ["wichita-ks"],
  "10580": ["albany-ny"],
  "15540": ["burlington-vt"],
  "11700": ["asheville-nc"],
  "22020": ["fargo-nd"],
  "28940": ["knoxville-tn"],
  "17820": ["colorado-springs-co"],
  "26180": ["honolulu-hi"],
  "11260": ["anchorage-ak"],
  "43580": ["sioux-falls-sd"],
  "37100": ["oxnard-ca", "thousand-oaks-ca", "ventura-ca"],
  "41940": ["san-jose-ca", "sunnyvale-ca", "santa-clara-ca", "milpitas-ca", "cupertino-ca", "mountain-view-ca", "palo-alto-ca"],
  "41884": ["san-francisco-ca", "oakland-ca", "berkeley-ca", "fremont-ca", "hayward-ca", "richmond-ca", "san-mateo-ca", "daly-city-ca", "redwood-city-ca", "south-san-francisco-ca"],
  "35084": ["newark-nj"],
  "47894": ["arlington-va", "alexandria-va"],
  "33124": ["fort-lauderdale-fl"],
  "48864": ["wilmington-de"],
  "35614": ["new-york-ny"],
  "20764": ["edison-nj"],
  "15764": ["cambridge-ma"],
};

async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  BLS OEWS Data Integration Script");
  console.log("═══════════════════════════════════════════════\n");

  // Check for xlsx package
  let XLSX;
  try {
    XLSX = require("xlsx");
  } catch {
    console.log("xlsx package not found. Installing...");
    const { execSync } = require("child_process");
    execSync("npm install xlsx", { stdio: "inherit" });
    XLSX = require("xlsx");
  }

  // Find the Excel file
  const xlsxPath = path.join(__dirname, "..", "all_data_M_2024.xlsx");
  if (!fs.existsSync(xlsxPath)) {
    console.error(`\nError: File not found: ${xlsxPath}`);
    console.error("Please download 'All data' from https://www.bls.gov/oes/tables.htm");
    console.error("and place all_data_M_2024.xlsx in the pulsafi root folder.\n");
    process.exit(1);
  }

  console.log("Step 1: Reading Excel file (this may take a minute)...");
  const workbook = XLSX.readFile(xlsxPath);
  const sheetName = workbook.SheetNames[0];
  const allData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  console.log(`  ✓ Loaded ${allData.length.toLocaleString()} rows from ${sheetName}`);

  // Inspect column names
  if (allData.length > 0) {
    const cols = Object.keys(allData[0]);
    console.log(`  Columns: ${cols.join(", ")}`);
  }

  // Step 2: Extract national-level data (AREA_TYPE = 1 means national)
  console.log("\nStep 2: Extracting national salary data...");
  const nationalSalaries = {};
  let nationalRows = 0;

  for (const row of allData) {
    const areaType = String(row["AREA_TYPE"] || row["area_type"] || row["AREATYPE"] || "").trim();
    const area = String(row["AREA"] || row["area"] || row["AREA_CODE"] || "").trim();

    // National data: area_type=1 or area=99 or area code starting with 99
    const isNational = areaType === "1" || area === "99" || area === "990000" || area.startsWith("99");

    if (!isNational) continue;

    const soc = String(row["OCC_CODE"] || row["occ_code"] || "").trim();
    const medianRaw = row["A_MEDIAN"] || row["a_median"] || row["ANNUAL_MEDIAN"] || row["annual_median"];

    if (!soc || !medianRaw) continue;
    const medianStr = String(medianRaw).replace(/,/g, "").replace(/\$/g, "");
    if (medianStr === "*" || medianStr === "#" || medianStr === "N/A") continue;

    const salary = parseInt(medianStr, 10);
    if (isNaN(salary) || salary <= 0) continue;

    nationalSalaries[soc] = salary;
    nationalRows++;
  }
  console.log(`  ✓ Found national salaries for ${Object.keys(nationalSalaries).length} occupations (${nationalRows} rows)`);

  // Step 3: Extract metro area data
  console.log("\nStep 3: Extracting metro area salary data...");
  const metroSalaries = {}; // areaCode -> socCode -> salary
  let metroRows = 0;

  for (const row of allData) {
    const areaType = String(row["AREA_TYPE"] || row["area_type"] || row["AREATYPE"] || "").trim();
    const area = String(row["AREA"] || row["area"] || row["AREA_CODE"] || "").trim();

    // Metro data: area_type=2 or 4, or area codes that are 5 digits (MSA codes)
    const isMetro = areaType === "2" || areaType === "4" ||
      (area.length === 5 && !area.startsWith("99") && /^\d+$/.test(area));

    // Also try: some files use area codes like "0010420" (7 digits with leading zeros)
    const normalizedArea = area.replace(/^0+/, "");
    const isMetro7 = area.length === 7 && /^\d+$/.test(area);

    if (!isMetro && !isMetro7) continue;

    const areaCode = isMetro7 ? normalizedArea : area;
    const soc = String(row["OCC_CODE"] || row["occ_code"] || "").trim();
    const medianRaw = row["A_MEDIAN"] || row["a_median"] || row["ANNUAL_MEDIAN"] || row["annual_median"];

    if (!soc || !medianRaw) continue;
    const medianStr = String(medianRaw).replace(/,/g, "").replace(/\$/g, "");
    if (medianStr === "*" || medianStr === "#" || medianStr === "N/A") continue;

    const salary = parseInt(medianStr, 10);
    if (isNaN(salary) || salary <= 0) continue;

    if (!metroSalaries[areaCode]) metroSalaries[areaCode] = {};
    metroSalaries[areaCode][soc] = salary;
    metroRows++;
  }

  const metroAreaCount = Object.keys(metroSalaries).length;
  console.log(`  ✓ Found salary data for ${metroAreaCount} areas (${metroRows.toLocaleString()} data points)`);

  // Show sample area codes for debugging
  const sampleAreas = Object.keys(metroSalaries).slice(0, 10);
  console.log(`  Sample area codes: ${sampleAreas.join(", ")}`);

  // Step 4: Load our existing data
  console.log("\nStep 4: Loading Pulsafi job data...");
  const { jobSalaryData, topCities } = require(path.join(__dirname, "..", "app", "data", "jobSalaryData"));
  const cityData = require(path.join(__dirname, "..", "app", "data", "cityData"));
  console.log(`  ✓ ${Object.keys(jobSalaryData).length} jobs, ${topCities.length} cities`);

  // Step 5: Map BLS national data to our jobs
  console.log("\nStep 5: Mapping national BLS data to our jobs...");
  const jobUpdates = {};
  let matchedJobs = 0;
  let unmatchedJobs = [];

  for (const [slug, job] of Object.entries(jobSalaryData)) {
    const soc = SLUG_TO_SOC[slug];
    if (soc && nationalSalaries[soc]) {
      const blsMedian = nationalSalaries[soc];
      jobUpdates[slug] = {
        title: job.title,
        soc,
        blsMedian,
        oldMedian: job.medianSalary,
        pctDiff: ((Math.abs(blsMedian - job.medianSalary) / job.medianSalary) * 100).toFixed(1),
      };
      matchedJobs++;
    } else {
      unmatchedJobs.push(`${slug} (${job.title})${soc ? " — SOC " + soc + " not in data" : " — no SOC mapping"}`);
    }
  }

  console.log(`  ✓ Matched ${matchedJobs}/${Object.keys(jobSalaryData).length} jobs to BLS data`);
  if (unmatchedJobs.length > 0) {
    console.log(`  ⚠ Unmatched jobs (${unmatchedJobs.length}):`);
    unmatchedJobs.forEach(j => console.log(`    - ${j}`));
  }

  // Step 6: Build metro-level salary overrides
  console.log("\nStep 6: Building metro-level salary overrides...");
  const metroOverrides = {};
  let overrideCount = 0;
  let citiesWithData = 0;

  for (const [areaCode, citySlugs] of Object.entries(METRO_TO_CITIES)) {
    // Try multiple area code formats
    const areaData = metroSalaries[areaCode] ||
      metroSalaries["00" + areaCode] ||
      metroSalaries["0" + areaCode] ||
      metroSalaries[areaCode.padStart(7, "0")];

    if (!areaData) continue;

    for (const citySlug of citySlugs) {
      if (!cityData[citySlug]) continue;
      if (!metroOverrides[citySlug]) {
        metroOverrides[citySlug] = {};
        citiesWithData++;
      }

      for (const [slug] of Object.entries(jobSalaryData)) {
        const soc = SLUG_TO_SOC[slug];
        if (soc && areaData[soc]) {
          metroOverrides[citySlug][slug] = areaData[soc];
          overrideCount++;
        }
      }
    }
  }

  console.log(`  ✓ Generated ${overrideCount.toLocaleString()} metro-level salary overrides`);
  console.log(`  ✓ ${citiesWithData} cities have BLS metro-level data (out of ${topCities.length})`);

  // Step 7: Write output file
  console.log("\nStep 7: Writing blsSalaryData.js...");
  const outputPath = path.join(__dirname, "..", "app", "data", "blsSalaryData.js");

  const output = `/**
 * BLS Salary Data — Generated ${new Date().toISOString().split("T")[0]}
 *
 * Source: Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS)
 * May 2024 estimates (released April 2025)
 * https://www.bls.gov/oes/
 *
 * National median salaries: Updated from BLS data for ${matchedJobs}/${Object.keys(jobSalaryData).length} occupations
 * Metro-level overrides: ${overrideCount.toLocaleString()} salary data points across ${citiesWithData} cities
 *
 * DO NOT EDIT MANUALLY — regenerate with: node scripts/fetch-bls-data.js
 */

// Metro-level median salary overrides (citySlug -> jobSlug -> annual median salary)
// When available, these override the formula-calculated salary
const blsMetroSalaries = ${JSON.stringify(metroOverrides, null, 2)};

// Updated national median salaries from BLS
// Maps job slug -> { median, soc }
const blsNationalMedians = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(jobUpdates).map(([slug, data]) => [
        slug,
        { median: data.blsMedian, soc: data.soc },
      ])
    ),
    null,
    2
  )};

module.exports = { blsMetroSalaries, blsNationalMedians };
`;

  fs.writeFileSync(outputPath, output);
  console.log(`  ✓ Written to app/data/blsSalaryData.js`);

  // Step 8: Summary
  console.log("\n═══════════════════════════════════════════════");
  console.log("  Summary");
  console.log("═══════════════════════════════════════════════");
  console.log(`  Jobs with BLS national data:  ${matchedJobs}/${Object.keys(jobSalaryData).length}`);
  console.log(`  Metro-level overrides:        ${overrideCount.toLocaleString()}`);
  console.log(`  Cities with metro data:       ${citiesWithData}/${topCities.length}`);
  console.log("");
  console.log("  Top salary differences (BLS vs current):");

  const sortedDiffs = Object.entries(jobUpdates)
    .sort((a, b) => parseFloat(b[1].pctDiff) - parseFloat(a[1].pctDiff))
    .slice(0, 15);

  for (const [slug, data] of sortedDiffs) {
    const arrow = data.blsMedian > data.oldMedian ? "↑" : "↓";
    console.log(`    ${arrow} ${data.title}: $${data.oldMedian.toLocaleString()} → $${data.blsMedian.toLocaleString()} (${data.pctDiff}%)`);
  }

  console.log("\n  Next steps:");
  console.log("  1. Run: node scripts/update-page-for-bls.js");
  console.log("  2. Commit and push\n");
}

main().catch(err => {
  console.error("Error:", err.message);
  console.error(err.stack);
  process.exit(1);
});

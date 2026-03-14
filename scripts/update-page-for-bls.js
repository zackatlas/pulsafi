#!/usr/bin/env node
/**
 * Updates jobSalaryData.js with real BLS national median salaries
 * and updates the page template to use metro-level overrides when available.
 *
 * Run AFTER fetch-bls-data.js has generated blsSalaryData.js
 *
 * Usage: node scripts/update-page-for-bls.js
 */

const fs = require("fs");
const path = require("path");

const blsDataPath = path.join(__dirname, "..", "app", "data", "blsSalaryData.js");
const jobDataPath = path.join(__dirname, "..", "app", "data", "jobSalaryData.js");

if (!fs.existsSync(blsDataPath)) {
  console.error("Error: blsSalaryData.js not found. Run fetch-bls-data.js first.");
  process.exit(1);
}

const { blsNationalMedians } = require(blsDataPath);
const { jobSalaryData } = require(jobDataPath);

console.log("Updating jobSalaryData.js with BLS national medians...\n");

let content = fs.readFileSync(jobDataPath, "utf-8");
let updateCount = 0;

for (const [slug, blsData] of Object.entries(blsNationalMedians)) {
  const job = jobSalaryData[slug];
  if (!job) continue;

  const oldMedian = job.medianSalary;
  const newMedian = blsData.median;

  if (oldMedian === newMedian) continue;

  // Calculate proportional entry/senior salaries
  const entryRatio = job.entryLevelSalary / job.medianSalary;
  const seniorRatio = job.seniorSalary / job.medianSalary;
  const newEntry = Math.round(newMedian * entryRatio);
  const newSenior = Math.round(newMedian * seniorRatio);

  // Replace medianSalary for this job in the file
  // Find the job block and replace salary values
  const jobPattern = new RegExp(
    `("${slug}":\\s*\\{[^}]*?medianSalary:\\s*)${oldMedian}`,
    "g"
  );
  const entryPattern = new RegExp(
    `("${slug}":\\s*\\{[^}]*?entryLevelSalary:\\s*)${job.entryLevelSalary}`,
    "g"
  );
  const seniorPattern = new RegExp(
    `("${slug}":\\s*\\{[^}]*?seniorSalary:\\s*)${job.seniorSalary}`,
    "g"
  );

  // Simpler approach: replace exact value sequences within the job block
  const blockStart = content.indexOf(`"${slug}"`);
  if (blockStart === -1) continue;

  // Find the closing brace of this job entry
  let braceCount = 0;
  let blockEnd = -1;
  for (let i = content.indexOf("{", blockStart); i < content.length; i++) {
    if (content[i] === "{") braceCount++;
    if (content[i] === "}") {
      braceCount--;
      if (braceCount === 0) {
        blockEnd = i + 1;
        break;
      }
    }
  }

  if (blockEnd === -1) continue;

  let block = content.slice(blockStart, blockEnd);

  // Replace salary values in the block
  block = block.replace(
    new RegExp(`medianSalary:\\s*${oldMedian}`),
    `medianSalary: ${newMedian}`
  );
  block = block.replace(
    new RegExp(`entryLevelSalary:\\s*${job.entryLevelSalary}`),
    `entryLevelSalary: ${newEntry}`
  );
  block = block.replace(
    new RegExp(`seniorSalary:\\s*${job.seniorSalary}`),
    `seniorSalary: ${newSenior}`
  );

  content = content.slice(0, blockStart) + block + content.slice(blockEnd);

  const arrow = newMedian > oldMedian ? "↑" : "↓";
  console.log(`  ${arrow} ${job.title}: $${oldMedian.toLocaleString()} → $${newMedian.toLocaleString()} (entry: $${newEntry.toLocaleString()}, senior: $${newSenior.toLocaleString()})`);
  updateCount++;
}

fs.writeFileSync(jobDataPath, content);
console.log(`\n✓ Updated ${updateCount} jobs in jobSalaryData.js`);
console.log("\nDon't forget to commit and push!");

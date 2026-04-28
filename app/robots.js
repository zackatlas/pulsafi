const { jobSalaryData } = require("./data/jobSalaryData");
const { blsMetroSalaries } = require("./data/blsSalaryData");

// Match sitemap.js — each generated sitemap holds up to this many URLs.
const URLS_PER_SITEMAP = 40000;

// Match sitemap.js's BLS-trimmed city-job pair count so the robots.txt
// sitemap list stays in sync. Next.js does NOT emit a sitemap-index file at
// /sitemap.xml when using generateSitemaps(), so we list each sub-sitemap.
const blsCityJobPairCount = Object.keys(blsMetroSalaries).reduce((sum, citySlug) => {
  const cityJobs = blsMetroSalaries[citySlug] || {};
  for (const jobSlug of Object.keys(cityJobs)) {
    if (jobSalaryData[jobSlug]) sum++;
  }
  return sum;
}, 0);
const cityJobSitemapCount = Math.max(1, Math.ceil(blsCityJobPairCount / URLS_PER_SITEMAP));
const TOTAL_SITEMAPS = 1 + cityJobSitemapCount;

// Use the canonical www host — the apex domain 307-redirects to www, which
// causes GSC to mark the sitemap as unreadable.
const sitemapUrls = Array.from(
  { length: TOTAL_SITEMAPS },
  (_, i) => `https://www.pulsafi.com/sitemap/${i}.xml`,
);

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/widget", "/api/", "/dashboard"],
      },
    ],
    sitemap: sitemapUrls,
    // Discovery hints for AI crawlers — non-standard but ignored gracefully
    // by classic robots.txt parsers, picked up by some AI engines.
    host: "https://www.pulsafi.com",
  };
}

const { jobSalaryData, topCities } = require("./data/jobSalaryData");

// Match sitemap.js — each generated sitemap holds up to this many URLs.
const URLS_PER_SITEMAP = 40000;

// Compute the same total sitemap count that sitemap.js produces so robots.txt
// stays in sync automatically as job/city data grows. Next.js does NOT emit a
// sitemap-index file at /sitemap.xml when using generateSitemaps(), so we have
// to list each sub-sitemap URL explicitly.
const allJobSlugs = Object.keys(jobSalaryData);
const totalCityJobPages = allJobSlugs.length * topCities.length;
const cityJobSitemapCount = Math.ceil(totalCityJobPages / URLS_PER_SITEMAP);
const TOTAL_SITEMAPS = 1 + cityJobSitemapCount;

const sitemapUrls = Array.from(
  { length: TOTAL_SITEMAPS },
  (_, i) => `https://pulsafi.com/sitemap/${i}.xml`,
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
  };
}

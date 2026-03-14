import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import { jobSalaryData, stateMultipliers, topCities } from "../../data/jobSalaryData";
import cityData from "../../data/cityData";
import stateTaxData from "../../data/stateTaxData";
// Helper: Map state abbreviation to stateMultipliers key (same keys as stateTaxData)
function getStateMultiplierKey(stateAbbr) {
  const entry = Object.entries(stateTaxData).find(([k, v]) => v.abbr === stateAbbr);
  return entry ? entry[0] : null;
}

// Parse slug: "{job-slug}-salary-in-{city-slug}"
function parseSlug(slug) {
  const parts = slug.split("-salary-in-");
  if (parts.length !== 2) return null;

  const jobSlug = parts[0];
  const citySlug = parts[1];

  // Validate both exist
  if (!jobSalaryData[jobSlug] || !cityData[citySlug]) {
    return null;
  }

  return { jobSlug, citySlug };
}

// Calculate city-adjusted salary
function calculateCityAdjustedSalary(baseSalary, city) {
  const stateMultiplierKey = getStateMultiplierKey(city.state);
  if (!stateMultiplierKey || !stateMultipliers[stateMultiplierKey]) {
    return baseSalary;
  }

  const multiplier = stateMultipliers[stateMultiplierKey];
  const costOfLivingAdjustment = city.index / 100;
  return Math.round(baseSalary * multiplier * costOfLivingAdjustment);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) return {};

  const { jobSlug, citySlug } = parsed;
  const job = jobSalaryData[jobSlug];
  const city = cityData[citySlug];

  const medianAdjusted = calculateCityAdjustedSalary(job.medianSalary, city);

  return {
    title: `${job.title} Salary in ${city.city}, ${city.state} — 2026 Data | Pulsafi`,
    description: `${job.title} salary in ${city.city}, ${city.state}: median $${medianAdjusted.toLocaleString()}/year, entry-level $${calculateCityAdjustedSalary(job.entryLevelSalary, city).toLocaleString()}, senior $${calculateCityAdjustedSalary(job.seniorSalary, city).toLocaleString()}. Adjusted for cost of living.`,
    keywords: [
      `${job.title.toLowerCase()} salary ${city.city}`,
      `${city.city} ${job.title.toLowerCase()} pay`,
      `how much does a ${job.title.toLowerCase()} make in ${city.city}`,
      `${job.title.toLowerCase()} salary ${city.state}`,
    ],
    openGraph: {
      title: `${job.title} Salary in ${city.city}, ${city.state}`,
      description: `Real salary data for ${job.title} in ${city.city}, ${city.state}. Adjusted for cost of living.`,
      type: "website",
      url: `https://pulsafi.com/city-job-salary/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} Salary in ${city.city}, ${city.state}`,
      description: `Median: $${medianAdjusted.toLocaleString()} | Entry-level: $${calculateCityAdjustedSalary(job.entryLevelSalary, city).toLocaleString()} | Senior: $${calculateCityAdjustedSalary(job.seniorSalary, city).toLocaleString()}`,
    },
  };
}

export function generateStaticParams() {
  const params = [];

  // Only generate params for top 50 cities to keep build time reasonable
  const topCitiesSet = topCities.slice(0, 50);

  for (const jobSlug in jobSalaryData) {
    for (const citySlug of topCitiesSet) {
      params.push({
        slug: `${jobSlug}-salary-in-${citySlug}`,
      });
    }
  }

  return params;
}

export default async function CityJobSalaryPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) notFound();

  const { jobSlug, citySlug } = parsed;
  const job = jobSalaryData[jobSlug];
  const city = cityData[citySlug];

  // Calculate adjusted salaries
  const medianAdjusted = calculateCityAdjustedSalary(job.medianSalary, city);
  const entryAdjusted = calculateCityAdjustedSalary(job.entryLevelSalary, city);
  const seniorAdjusted = calculateCityAdjustedSalary(job.seniorSalary, city);

  // Calculate hourly rates (assuming 2080 work hours per year)
  const hoursPerYear = 2080;
  const hourlyMedian = Math.round(medianAdjusted / hoursPerYear);
  const hourlyEntry = Math.round(entryAdjusted / hoursPerYear);
  const hourlySenior = Math.round(seniorAdjusted / hoursPerYear);

  // Get comparison cities (same job in 5 other top cities)
  const getComparisonCities = () => {
    const otherCities = topCities
      .slice(0, 50)
      .filter((c) => c !== citySlug)
      .slice(0, 5);

    return otherCities.map((slug) => ({
      slug,
      ...cityData[slug],
      salary: calculateCityAdjustedSalary(job.medianSalary, cityData[slug]),
    }));
  };

  const comparisonCities = getComparisonCities();

  // Create JSON-LD structured data
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Pulsafi",
          item: "https://pulsafi.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "City Job Salaries",
          item: "https://pulsafi.com/city-job-salary",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${job.title} in ${city.city}`,
          item: `https://pulsafi.com/city-job-salary/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `How much does a ${job.title} make in ${city.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `The median salary for a ${job.title} in ${city.city}, ${city.state} is $${medianAdjusted.toLocaleString()} per year, adjusted for the local cost of living index of ${city.index}.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the entry-level salary for a ${job.title} in ${city.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Entry-level ${job.title} professionals in ${city.city} earn approximately $${entryAdjusted.toLocaleString()} per year.`,
          },
        },
        {
          "@type": "Question",
          name: `What is the senior-level salary for a ${job.title} in ${city.city}?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `Senior-level ${job.title} professionals in ${city.city} earn approximately $${seniorAdjusted.toLocaleString()} per year.`,
          },
        },
      ],
    },
  ];

  return (
    <>
      <main className={styles.container}>
        {/* Breadcrumb */}
        <div className={styles.breadcrumb}>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/city-job-salary">City Job Salaries</a>
          <span>/</span>
          <span>
            {job.title} in {city.city}
          </span>
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          {job.title} Salary in {city.city}, {city.state}
        </h1>

        {/* Subtitle */}
        <div className={styles.subtitle}>
          <p>
            How much does a {job.title.toLowerCase()} make in {city.city}?
            Explore median, entry-level, and senior salaries adjusted for{" "}
            {city.city}'s cost of living.
          </p>
        </div>

        {/* Key Metric Cards */}
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3>Median Salary</h3>
            <div className={styles.cardValue}>
              ${medianAdjusted.toLocaleString()}
              <span className={styles.cardLabel}>/year</span>
            </div>
            <p className={styles.cardDesc}>
              Typical salary for a {job.title.toLowerCase()} in {city.city}
            </p>
          </div>

          <div className={styles.card}>
            <h3>Entry Level</h3>
            <div className={styles.cardValue}>
              ${entryAdjusted.toLocaleString()}
              <span className={styles.cardLabel}>/year</span>
            </div>
            <p className={styles.cardDesc}>
              Starting salary with minimal experience
            </p>
          </div>

          <div className={styles.card}>
            <h3>Senior Level</h3>
            <div className={styles.cardValue}>
              ${seniorAdjusted.toLocaleString()}
              <span className={styles.cardLabel}>/year</span>
            </div>
            <p className={styles.cardDesc}>
              Salary for experienced professionals
            </p>
          </div>

          <div className={styles.card}>
            <h3>Cost of Living Index</h3>
            <div className={styles.cardValue}>
              {city.index}
              <span className={styles.cardLabel}>National avg: 100</span>
            </div>
            <p className={styles.cardDesc}>
              {city.index > 100
                ? `${city.index - 100}% higher than national average`
                : `${100 - city.index}% lower than national average`}
            </p>
          </div>
        </div>

        {/* Salary Breakdown Table */}
        <section className={styles.breakdownSection}>
          <h2>Salary Breakdown by Experience Level</h2>
          <p className={styles.sectionDesc}>
            See how {job.title.toLowerCase()} salaries break down across
            different pay periods.
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Entry Level</th>
                  <th>Median</th>
                  <th>Senior Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Annual</td>
                  <td>${entryAdjusted.toLocaleString()}</td>
                  <td>${medianAdjusted.toLocaleString()}</td>
                  <td>${seniorAdjusted.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Monthly</td>
                  <td>${Math.round(entryAdjusted / 12).toLocaleString()}</td>
                  <td>${Math.round(medianAdjusted / 12).toLocaleString()}</td>
                  <td>${Math.round(seniorAdjusted / 12).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Biweekly</td>
                  <td>${Math.round(entryAdjusted / 26).toLocaleString()}</td>
                  <td>${Math.round(medianAdjusted / 26).toLocaleString()}</td>
                  <td>${Math.round(seniorAdjusted / 26).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Weekly</td>
                  <td>${Math.round(entryAdjusted / 52).toLocaleString()}</td>
                  <td>${Math.round(medianAdjusted / 52).toLocaleString()}</td>
                  <td>${Math.round(seniorAdjusted / 52).toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Hourly</td>
                  <td>${hourlyEntry}</td>
                  <td>${hourlyMedian}</td>
                  <td>${hourlySenior}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* City vs National Comparison */}
        <section className={styles.comparisonSection}>
          <h2>{city.city} vs National Average</h2>
          <p className={styles.sectionDesc}>
            How {city.city}'s {job.title.toLowerCase()} salaries compare to
            national figures, accounting for cost of living differences.
          </p>

          <div className={styles.comparisonGrid}>
            <div className={styles.comparisonCard}>
              <h3>{city.city} Salary</h3>
              <div className={styles.comparisonValue}>
                ${medianAdjusted.toLocaleString()}
              </div>
              <p className={styles.comparisonLabel}>
                Cost of Living: {city.index}
              </p>
            </div>

            <div className={styles.comparisonCard}>
              <h3>National Average</h3>
              <div className={styles.comparisonValue}>
                ${job.medianSalary.toLocaleString()}
              </div>
              <p className={styles.comparisonLabel}>Cost of Living: 100</p>
            </div>

            <div className={styles.comparisonCard}>
              <h3>Difference</h3>
              <div
                className={`${styles.comparisonValue} ${medianAdjusted > job.medianSalary ? styles.positive : styles.negative}`}
              >
                {medianAdjusted > job.medianSalary ? "+" : ""}
                ${Math.abs(medianAdjusted - job.medianSalary).toLocaleString()}
              </div>
              <p className={styles.comparisonLabel}>
                {medianAdjusted > job.medianSalary
                  ? "Higher in " + city.city
                  : "Lower in " + city.city}
              </p>
            </div>
          </div>
        </section>

        {/* Cost of Living Context */}
        <section className={styles.contextSection}>
          <h2>Cost of Living Context for {city.city}</h2>
          <p className={styles.sectionDesc}>
            Understanding the cost of living helps put salary figures into
            perspective.
          </p>

          <div className={styles.contextGrid}>
            <div className={styles.contextCard}>
              <h3>1-Bedroom Rent</h3>
              <div className={styles.contextValue}>
                ${city.rent1br.toLocaleString()}
              </div>
              <p>/month</p>
            </div>

            <div className={styles.contextCard}>
              <h3>Median Income</h3>
              <div className={styles.contextValue}>
                ${city.medianIncome.toLocaleString()}
              </div>
              <p>/year</p>
            </div>

            <div className={styles.contextCard}>
              <h3>Population</h3>
              <div className={styles.contextValue}>
                {city.population.toLocaleString()}
              </div>
              <p>residents</p>
            </div>

            <div className={styles.contextCard}>
              <h3>Rent as % of Income</h3>
              <div className={styles.contextValue}>
                {((city.rent1br * 12) / city.medianIncome * 100).toFixed(1)}%
              </div>
              <p>median household</p>
            </div>
          </div>

          <div className={styles.contextNote}>
            <p>
              <strong>Cost of Living Index: {city.index}</strong> — A score of
              100 represents the U.S. average. Salaries in {city.city} have
              been adjusted to account for local cost differences.
            </p>
          </div>
        </section>

        {/* About This Career */}
        <section className={styles.careerSection}>
          <h2>About {job.title}</h2>

          <div className={styles.careerContent}>
            <div className={styles.careerCard}>
              <h3>Overview</h3>
              <p>{job.description}</p>
            </div>

            <div className={styles.careerCard}>
              <h3>Required Education</h3>
              <p>{job.education}</p>
            </div>

            <div className={styles.careerCard}>
              <h3>Key Skills</h3>
              <ul className={styles.skillsList}>
                {job.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className={styles.careerCard}>
              <h3>Growth Rate</h3>
              <p>
                Expected job growth: <strong>+{job.growthRate}%</strong> over
                the next decade
              </p>
            </div>
          </div>
        </section>

        {/* Compare Cities */}
        <section className={styles.citiesSection}>
          <h2>Compare Cities: {job.title} Salary</h2>
          <p className={styles.sectionDesc}>
            See {job.title} salaries in other top cities.
          </p>

          <div className={styles.citiesGrid}>
            {comparisonCities.map((compareCity) => (
              <a
                key={compareCity.slug}
                href={`/city-job-salary/${jobSlug}-salary-in-${compareCity.slug}`}
                className={styles.cityCard}
              >
                <h4>
                  {compareCity.city}, {compareCity.state}
                </h4>
                <div className={styles.citySalary}>
                  ${compareCity.salary.toLocaleString()}
                </div>
                <div className={styles.cityDiff}>
                  {compareCity.salary > medianAdjusted ? "+" : ""}
                  {compareCity.salary > medianAdjusted
                    ? Math.round(
                        ((compareCity.salary - medianAdjusted) /
                          medianAdjusted) *
                          100
                      )
                    : Math.round(
                        ((compareCity.salary - medianAdjusted) /
                          medianAdjusted) *
                          100
                      )}
                  %
                </div>
                <div className={styles.cityArrow}>→</div>
              </a>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className={styles.toolsSection}>
          <h2>Financial Tools to Explore</h2>
          <p className={styles.sectionDesc}>
            Use these Pulsafi calculators to understand your finances based on
            a {job.title.toLowerCase()} salary in {city.city}.
          </p>

          <div className={styles.toolsGrid}>
            <a href="/tools/salary-breakdown-calculator" className={styles.toolLink}>
              <h4>Salary Breakdown Calculator</h4>
              <p>See exactly how your salary breaks down into taxes and take-home pay.</p>
            </a>
            <a href="/tools/cost-of-living-calculator" className={styles.toolLink}>
              <h4>Cost of Living Calculator</h4>
              <p>Understand your expenses and purchasing power in {city.city}.</p>
            </a>
            <a href="/tools/budget-calculator" className={styles.toolLink}>
              <h4>Budget Calculator</h4>
              <p>Create a personalized budget based on your income and expenses.</p>
            </a>
            <a href="/tools/rent-vs-buy-calculator" className={styles.toolLink}>
              <h4>Rent vs Buy Calculator</h4>
              <p>Compare the true costs of renting versus buying in {city.city}.</p>
            </a>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className={styles.seoSection}>
          <h2>{job.title} Salary in {city.city}, {city.state} — Complete Guide</h2>

          <h3>Median Salary Overview</h3>
          <p>
            The median salary for a {job.title.toLowerCase()} in {city.city},{" "}
            {city.state} is ${medianAdjusted.toLocaleString()} per year,
            adjusted for the local cost of living index of {city.index}. This
            figure reflects typical earnings for experienced professionals in
            this role, considering {city.city}'s unique economic conditions.
          </p>

          <h3>Salary Range and Experience Levels</h3>
          <p>
            Entry-level {job.title.toLowerCase()} professionals in {city.city}{" "}
            can expect to earn around ${entryAdjusted.toLocaleString()} annually.
            As professionals gain experience, salaries typically increase, with
            senior-level {job.title.toLowerCase()}s earning approximately $
            {seniorAdjusted.toLocaleString()} per year. This represents a{" "}
            {Math.round(((seniorAdjusted - entryAdjusted) / entryAdjusted) * 100)}
            % increase from entry to senior level.
          </p>

          <h3>Cost of Living Adjustment</h3>
          <p>
            {city.city}'s cost of living index of {city.index} significantly
            impacts salary comparisons. {city.index > 100 ? "As a higher cost-of-living city," : "As a lower cost-of-living city,"} salaries in{" "}
            {city.city} are adjusted accordingly. This means that while the
            nominal salary may appear higher or lower than the national average
            of ${job.medianSalary.toLocaleString()}, the actual purchasing power
            must be considered in context.
          </p>

          <h3>Housing and Affordability</h3>
          <p>
            A significant portion of a {job.title.toLowerCase()}'s salary in{" "}
            {city.city} typically goes toward housing. With a 1-bedroom apartment
            averaging ${city.rent1br.toLocaleString()} per month, housing
            represents about{" "}
            {((city.rent1br * 12) / medianAdjusted * 100).toFixed(1)}% of median
            salary. Financial experts generally recommend keeping housing
            expenses below 30% of gross income.
          </p>

          <h3>Career Growth and Opportunities</h3>
          <p>
            {job.title}s are in growing demand across the United States, with an
            expected job growth of {job.growthRate}% over the next decade. In{" "}
            {city.city}, this translates to increasing opportunities and
            potential for salary growth as demand for experienced professionals
            continues to rise.
          </p>

          <h3>Factors Affecting Salary in {city.city}</h3>
          <p>
            Several factors influence {job.title.toLowerCase()} salaries in{" "}
            {city.city}. These include years of experience, specific skill set,
            company size, industry specialization, and individual performance.
            Professionals with specialized certifications or advanced education
            often earn higher salaries, as do those in specialized industries or
            larger corporations.
          </p>

          <h3>Moving to {city.city}</h3>
          <p>
            If you're considering relocating to {city.city} as a{" "}
            {job.title.toLowerCase()}, understanding the cost of living and
            salary implications is crucial for financial planning. Beyond salary,
            consider other factors such as job market competitiveness, quality of
            life, proximity to family and friends, and overall career
            opportunities in your specific domain.
          </p>
        </section>
      </main>

      <Footer />

      {/* JSON-LD Structured Data */}
      {jsonLd.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import cityData from "../../data/cityData";
import styles from "./page.module.css";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const city = cityData[slug];

  if (!city) return {};

  const indexDiff = city.index - 100;
  const indexText = indexDiff > 0 ? `${indexDiff}% more expensive` : `${Math.abs(indexDiff)}% less expensive`;

  return {
    title: `Cost of Living in ${city.city}, ${city.state} — 2026 Data | Pulsafi`,
    description: `Cost of living index (${city.index}), average rent, median income, and comparison to national average for ${city.city}, ${city.state}. ${indexText} than the US average. Updated 2026.`,
    keywords: [
      `cost of living ${city.city}`,
      `${city.city} cost of living`,
      `rent in ${city.city}`,
      `${city.city} median income`,
      `living expenses ${city.city}`,
    ],
    openGraph: {
      title: `Cost of Living in ${city.city}, ${city.state} — 2026 Data`,
      description: `Real cost of living data for ${city.city}, ${city.state}: COL index, rent prices, median income, and more.`,
      type: "website",
      url: `https://pulsafi.com/cost-of-living/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Cost of Living in ${city.city}, ${city.state}`,
      description: `COL index: ${city.index} | 1BR rent: $${city.rent1br.toLocaleString()} | Median income: $${city.medianIncome.toLocaleString()}`,
    },
  };
}

export function generateStaticParams() {
  // Pre-render only top 30 cities at build time to avoid timeouts
  // Rest will be generated on-demand via ISR
  const cityKeys = Object.keys(cityData);
  const topCities = cityKeys.slice(0, 30);
  return topCities.map(slug => ({ slug }));
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  const city = cityData[slug];

  if (!city) notFound();

  const indexDiff = city.index - 100;
  const indexPercentage = indexDiff > 0 ? `+${indexDiff}%` : `${indexDiff}%`;
  const isExpensive = city.index > 100;

  // Get 5-8 similar/nearby cities for comparison
  const getCitiesByProximity = () => {
    const allCities = Object.entries(cityData)
      .filter(([key]) => key !== slug)
      .sort((a, b) => {
        // Sort by state first, then by index similarity
        const stateMatch = (a[1].state === city.state ? -1 : 1);
        const indexDiff = Math.abs(a[1].index - city.index) - Math.abs(b[1].index - city.index);
        return stateMatch || indexDiff;
      });

    return allCities.slice(0, 7).map(([key, val]) => ({ slug: key, ...val }));
  };

  const comparisonCities = getCitiesByProximity();

  // Salary buying power calculation
  const salaryEquivalence = (salary) => {
    return Math.round(salary * 100 / city.index);
  };

  // Generate FAQ dynamically based on city data
  const faqItems = [
    {
      question: `How does the cost of living in ${city.city} compare to the national average?`,
      answer: `${city.city} has a cost of living index of ${city.index}, which means it's ${isExpensive ? `${indexDiff}% more expensive` : `${Math.abs(indexDiff)}% less expensive`} than the US average of 100. This affects everything from housing to groceries and utilities.`,
    },
    {
      question: `Is a $${salaryEquivalence(75000).toLocaleString()} salary good for ${city.city}?`,
      answer: `A salary in ${city.city} has different purchasing power than elsewhere. A $${salaryEquivalence(75000).toLocaleString()} salary in ${city.city} provides the same purchasing power as $75,000 nationally. Compare your salary to the median income of $${city.medianIncome.toLocaleString()} to gauge your earning potential.`,
    },
    {
      question: `Can you afford to rent in ${city.city}?`,
      answer: `With a median household income of $${city.medianIncome.toLocaleString()}, a one-bedroom apartment averaging $${city.rent1br.toLocaleString()} per month consumes ${(((city.rent1br * 12) / city.medianIncome) * 100).toFixed(1)}% of income. Financial experts recommend keeping rent under 30% of gross income—this is ${(((city.rent1br * 12) / city.medianIncome) * 100) > 30 ? 'above that threshold' : 'within that threshold'}.`,
    },
  ];

  const jsonLd = {
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
        name: "Cost of Living",
        item: "https://pulsafi.com/cost-of-living",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${city.city}, ${city.state}`,
        item: `https://pulsafi.com/cost-of-living/${slug}`,
      },
    ],
  };

  // FAQPage JSON-LD schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.breadcrumb}>
          <a href="/">Home</a>
          <span>/</span>
          <a href="/cost-of-living">Cost of Living</a>
          <span>/</span>
          <span>{city.city}, {city.state}</span>
        </div>

        <h1 className={styles.title}>
          Cost of Living in {city.city}, {city.state}
        </h1>

        <div className={styles.subtitle}>
          <p>2026 data for {city.city}, {city.state} • Population: {city.population.toLocaleString()}</p>
        </div>

        {/* Index Card */}
        <div className={styles.indexCard}>
          <div className={styles.indexValue}>
            <span className={styles.number}>{city.index}</span>
            <span className={styles.label}>Cost of Living Index</span>
          </div>
          <div className={styles.indexComparison}>
            <div className={`${styles.badge} ${isExpensive ? styles.expensive : styles.affordable}`}>
              {isExpensive ? '📈 More Expensive' : '📉 More Affordable'}
            </div>
            <p className={styles.comparisonText}>
              {isExpensive
                ? `${indexPercentage} more expensive than the US average (100)`
                : `${Math.abs(indexDiff)}% less expensive than the US average (100)`
              }
            </p>
          </div>
        </div>

        {/* Cost Cards Grid */}
        <div className={styles.cardsGrid}>
          <div className={styles.card}>
            <h3>1-Bedroom Rent</h3>
            <div className={styles.cardValue}>
              ${city.rent1br.toLocaleString()}
              <span className={styles.cardLabel}>/month</span>
            </div>
            <p className={styles.cardDesc}>
              Average monthly rent for a one-bedroom apartment
            </p>
          </div>

          <div className={styles.card}>
            <h3>2-Bedroom Rent</h3>
            <div className={styles.cardValue}>
              ${city.rent2br.toLocaleString()}
              <span className={styles.cardLabel}>/month</span>
            </div>
            <p className={styles.cardDesc}>
              Average monthly rent for a two-bedroom apartment
            </p>
          </div>

          <div className={styles.card}>
            <h3>Median Income</h3>
            <div className={styles.cardValue}>
              ${city.medianIncome.toLocaleString()}
              <span className={styles.cardLabel}>/year</span>
            </div>
            <p className={styles.cardDesc}>
              Median household income in {city.city}
            </p>
          </div>

          <div className={styles.card}>
            <h3>Population</h3>
            <div className={styles.cardValue}>
              {city.population.toLocaleString()}
              <span className={styles.cardLabel}>residents</span>
            </div>
            <p className={styles.cardDesc}>
              Estimated population of {city.city}
            </p>
          </div>
        </div>

        {/* Salary Buying Power Section */}
        <section className={styles.salarySection}>
          <h2>How Far Does Your Salary Go?</h2>
          <p className={styles.sectionDesc}>
            A salary in {city.city} has different purchasing power than the national average. Use the equivalence below to understand what your salary is worth compared to the US average.
          </p>

          <div className={styles.salaryGrid}>
            {[50000, 75000, 100000, 150000].map((salary) => {
              const equivalent = salaryEquivalence(salary);
              const difference = equivalent - salary;
              const diffPercent = ((difference / salary) * 100).toFixed(1);

              return (
                <div key={salary} className={styles.salaryCard}>
                  <div className={styles.salaryLabel}>Earning in {city.city}</div>
                  <div className={styles.salarySalary}>${salary.toLocaleString()}</div>
                  <div className={styles.salaryArrow}>⟺</div>
                  <div className={styles.salaryEquiv}>
                    <span className={styles.equivLabel}>Worth nationwide</span>
                    <span className={styles.equivAmount}>${equivalent.toLocaleString()}</span>
                  </div>
                  <div className={`${styles.salaryDiff} ${difference > 0 ? styles.positive : styles.negative}`}>
                    {difference > 0 ? '↑' : '↓'} {Math.abs(diffPercent)}%
                  </div>
                </div>
              );
            })}
          </div>

          <p className={styles.salaryFormula}>
            <strong>Formula:</strong> Your salary in {city.city} ÷ COL index × 100 = equivalent national salary.
            A ${salaryEquivalence(50000).toLocaleString()} national salary gives you the same purchasing power as $50,000 in {city.city}.
          </p>
        </section>

        {/* Housing Affordability */}
        <section className={styles.affordabilitySection}>
          <h2>Housing Affordability Analysis</h2>
          <div className={styles.affordabilityCards}>
            <div className={styles.affordCard}>
              <h3>Rent as % of Income</h3>
              <div className={styles.affordValue}>
                {(((city.rent1br * 12) / city.medianIncome) * 100).toFixed(1)}%
              </div>
              <p>
                For a 1-bedroom apartment at median income. Experts suggest under 30% is affordable.
              </p>
            </div>

            <div className={styles.affordCard}>
              <h3>Monthly Rent to Income</h3>
              <div className={styles.affordValue}>
                1 : {(city.medianIncome / (city.rent1br * 12)).toFixed(1)}
              </div>
              <p>
                Ratio of monthly income to monthly 1-bedroom rent.
              </p>
            </div>
          </div>
        </section>

        {/* Cost of Living Explained */}
        <section className={styles.explainSection}>
          <h2>What is a Cost of Living Index?</h2>
          <p>
            A cost of living index measures the relative cost of goods and services in a city compared to a national baseline (set at 100).
            An index of 150 means the city is 50% more expensive than average. An index of 80 means it's 20% cheaper than average.
          </p>
          <p>
            The index typically includes housing, groceries, utilities, transportation, and healthcare—the major expense categories for households.
          </p>
        </section>

        {/* Compare with Other Cities */}
        <section className={styles.compareSection}>
          <h2>Compare with Other Cities</h2>
          <p className={styles.sectionDesc}>
            See how {city.city}'s cost of living stacks up against nearby and similar cities.
          </p>
          <div className={styles.compareGrid}>
            {comparisonCities.map((compareCity) => {
              const diff = compareCity.index - city.index;
              const label = diff > 0 ? 'Higher' : diff < 0 ? 'Lower' : 'Same';

              return (
                <a
                  key={compareCity.slug}
                  href={`/cost-of-living/${compareCity.slug}`}
                  className={styles.compareCard}
                >
                  <h4>{compareCity.city}, {compareCity.state}</h4>
                  <div className={styles.compareIndex}>
                    Index: {compareCity.index}
                  </div>
                  <div className={`${styles.compareDiff} ${diff > 0 ? styles.higher : diff < 0 ? styles.lower : ''}`}>
                    {label} {diff !== 0 ? `by ${Math.abs(diff)}` : ''}
                  </div>
                  <div className={styles.compareArrow}>→</div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Related Tools */}
        <section className={styles.toolsSection}>
          <h2>Financial Tools to Explore</h2>
          <p className={styles.sectionDesc}>
            Use these Pulsafi calculators to plan your finances based on {city.city}'s cost of living.
          </p>
          <div className={styles.toolsGrid}>
            <a href="/tools/salary-breakdown-calculator" className={styles.toolLink}>
              <h4>Salary Breakdown Calculator</h4>
              <p>See exactly how your salary breaks down into taxes and take-home pay.</p>
            </a>
            <a href="/tools/rent-vs-buy-calculator" className={styles.toolLink}>
              <h4>Rent vs Buy Calculator</h4>
              <p>Compare the true costs of renting vs buying in your city.</p>
            </a>
            <a href="/tools/budget-calculator" className={styles.toolLink}>
              <h4>Budget Calculator</h4>
              <p>Create a personalized budget based on your income and city.</p>
            </a>
            <a href="/tools/mortgage-calculator" className={styles.toolLink}>
              <h4>Mortgage Calculator</h4>
              <p>Calculate monthly mortgage payments and total interest.</p>
            </a>
          </div>
        </section>

        {/* SEO Content */}
        <section className={styles.seoSection}>
          <h2>Cost of Living Guide for {city.city}, {city.state}</h2>

          <h3>Overview</h3>
          <p>
            {city.city} has a cost of living index of {city.index}, making it {
              isExpensive
                ? `${indexDiff}% more expensive than the national average`
                : `${Math.abs(indexDiff)}% less expensive than the national average`
            }. With a population of {city.population.toLocaleString()} and a median household income of ${city.medianIncome.toLocaleString()},
            understanding the true cost of living here is essential for financial planning.
          </p>

          <h3>Housing Market</h3>
          <p>
            The housing market in {city.city} reflects its cost of living index. A one-bedroom apartment averages ${city.rent1br.toLocaleString()} per month,
            while a two-bedroom apartment costs approximately ${city.rent2br.toLocaleString()} per month. For renters, this typically consumes {
              ((city.rent1br * 12) / city.medianIncome * 100).toFixed(1)
            }% of the median household income—{
              ((city.rent1br * 12) / city.medianIncome * 100) > 30
                ? 'above the recommended 30% threshold'
                : 'within the recommended 30% threshold'
            }.
          </p>

          <h3>Income and Affordability</h3>
          <p>
            With a median household income of ${city.medianIncome.toLocaleString()}, {city.city} residents earn slightly {
              city.medianIncome > 60000 ? 'above' : 'below'
            } the national median. When factoring in the local cost of living, a salary of ${salaryEquivalence(75000).toLocaleString()}
            in {city.city} provides the same purchasing power as $75,000 nationally.
          </p>

          <h3>Moving to {city.city}</h3>
          <p>
            Whether you're relocating for work or considering a move, understanding the cost of living in {city.city} is crucial.
            Use our calculators to determine if your salary can support your desired lifestyle here. Consider not just rent,
            but also food, utilities, transportation, and healthcare when budgeting.
          </p>

          <h3>Saving and Investing</h3>
          <p>
            Once you understand your cost of living in {city.city}, you can better plan your savings and investment strategy.
            Our financial tools help you determine how much you can realistically save each month and optimize your financial goals.
          </p>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2>Frequently Asked Questions About Cost of Living in {city.city}</h2>
          <div className={styles.faqContainer}>
            {faqItems.map((item, index) => (
              <details key={index} className={styles.faqItem}>
                <summary className={styles.faqQuestion}>{item.question}</summary>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}

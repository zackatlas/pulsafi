import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EmailCapture from "../../components/EmailCapture";
import AffiliateOffer from "../../components/AffiliateOffer";
import cityData from "../../data/cityData";

// Slug pattern: /salary-needed/[lifestyle-tier]-in-[city-slug]
// e.g. /salary-needed/100k-in-austin-tx
//      /salary-needed/comfortable-in-seattle-wa
//      /salary-needed/family-in-san-francisco-ca

const LIFESTYLE_TIERS = {
  // Income-anchored tiers
  "50k": { label: "$50K Lifestyle", target: 50000, type: "income", description: "Single, modest one-bedroom, no car, careful with discretionary spending." },
  "75k": { label: "$75K Lifestyle", target: 75000, type: "income", description: "Single or couple, moderate one-bedroom, used car, occasional dining out and travel." },
  "100k": { label: "$100K Lifestyle", target: 100000, type: "income", description: "Comfortable single life or DINK couple, nicer apartment, retirement contributions." },
  "150k": { label: "$150K Lifestyle", target: 150000, type: "income", description: "Upper-middle: home down-payment savings, two cars, regular dining out and travel." },
  "200k": { label: "$200K Lifestyle", target: 200000, type: "income", description: "Affluent: mortgage on a starter home, max retirement contributions, kids' education savings." },
  "300k": { label: "$300K Lifestyle", target: 300000, type: "income", description: "High earner: family home, private school option, aggressive savings, vacations." },

  // Lifestyle-anchored tiers (more search-natural)
  "comfortable":   { label: "Comfortable Single Lifestyle", multiplier: 0.85, type: "lifestyle", description: "Apartment of your own, transportation, dining out 2-3x/week, retirement on track." },
  "family":        { label: "Family of 4 Lifestyle", multiplier: 1.65, type: "lifestyle", description: "3-bedroom home, two cars, kids' activities, family vacations, college savings." },
  "single":        { label: "Single Person Modest", multiplier: 0.65, type: "lifestyle", description: "Roommate or studio, used car, careful budget, basic retirement contributions." },
  "couple":        { label: "Couple, No Kids", multiplier: 1.10, type: "lifestyle", description: "One-bedroom together, two incomes, room for travel and savings." },
};

// Baseline for lifestyle tiers (median COL = 100). Each city scales from this.
const LIFESTYLE_BASELINE = {
  comfortable: 75000,
  family: 110000,
  single: 50000,
  couple: 95000,
};

const SAMPLE_CITIES = Object.keys(cityData).slice(0, 200); // pre-render top 200 cities

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const cityKey of SAMPLE_CITIES) {
    for (const tier of Object.keys(LIFESTYLE_TIERS)) {
      params.push({ slug: `${tier}-in-${cityKey}` });
    }
  }
  return params;
}

function parseSlug(slug) {
  const match = slug.match(/^([a-z0-9]+)-in-(.+)$/);
  if (!match) return null;
  const [, tierKey, cityKey] = match;
  if (!LIFESTYLE_TIERS[tierKey] || !cityData[cityKey]) return null;
  return { tierKey, cityKey, tier: LIFESTYLE_TIERS[tierKey], city: cityData[cityKey] };
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function calcRequiredSalary(tier, city) {
  const colFactor = city.index / 100;
  if (tier.type === "income") {
    return Math.round(tier.target * colFactor);
  }
  // lifestyle type
  const baseline = LIFESTYLE_BASELINE[Object.keys(LIFESTYLE_TIERS).find(k => LIFESTYLE_TIERS[k] === tier)] || 75000;
  return Math.round(baseline * colFactor);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { tier, city } = parsed;
  const required = calcRequiredSalary(tier, city);

  return {
    title: `Salary Needed for a ${tier.label} in ${city.city}, ${city.state} | Pulsafi`,
    description: `Living a ${tier.label.toLowerCase()} in ${city.city}, ${city.state} requires approximately ${fmt(required)}/year. See the full cost breakdown — rent, taxes, take-home pay, and what your money actually buys.`,
    alternates: { canonical: `/salary-needed/${slug}` },
    openGraph: {
      title: `${tier.label} in ${city.city} — ${fmt(required)}/year`,
      description: `What you actually need to earn for a ${tier.label.toLowerCase()} in ${city.city}.`,
      url: `https://www.pulsafi.com/salary-needed/${slug}`,
    },
  };
}

export default async function SalaryNeededPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { tierKey, cityKey, tier, city } = parsed;

  const required = calcRequiredSalary(tier, city);
  const monthlyGross = required / 12;
  const monthlyNet = Math.round(monthlyGross * 0.72); // rough net after federal+FICA+state
  const housingMax = Math.round(monthlyNet * 0.30); // 30% rule
  const isAffordable = housingMax >= city.rent1br;

  // National avg comparison
  const nationalAvg = tier.type === "income" ? tier.target : (LIFESTYLE_BASELINE[tierKey] || 75000);
  const vsNational = ((required - nationalAvg) / nationalAvg) * 100;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How much salary do you need for a ${tier.label.toLowerCase()} in ${city.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `To live a ${tier.label.toLowerCase()} in ${city.city}, ${city.state}, you need approximately ${fmt(required)} gross income per year (${fmt(monthlyGross)}/month). After federal and state taxes, your take-home pay is approximately ${fmt(monthlyNet)}/month.`,
        },
      },
      {
        "@type": "Question",
        "name": `Can you live in ${city.city} on ${fmt(nationalAvg)}/year?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${city.city}'s cost-of-living index is ${city.index} (national avg = 100), meaning costs run ${vsNational > 0 ? "+" : ""}${vsNational.toFixed(1)}% vs the national baseline. ${vsNational > 5 ? `${fmt(nationalAvg)} would feel ${Math.abs(vsNational).toFixed(0)}% tighter in ${city.city} than the same amount in an average-cost city.` : vsNational < -5 ? `${fmt(nationalAvg)} stretches ~${Math.abs(vsNational).toFixed(0)}% further in ${city.city} than in an average-cost city.` : `${fmt(nationalAvg)} buys roughly the national average lifestyle in ${city.city}.`}`,
        },
      },
      {
        "@type": "Question",
        "name": `What is the median income in ${city.city}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The median household income in ${city.city} is ${fmt(city.medianIncome)}.`,
        },
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      <section style={{ padding: "60px 24px 32px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Salary Needed · {city.city}, {city.state}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          {tier.label} in {city.city}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
          {tier.description}
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        {/* Hero number — required salary */}
        <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "32px 32px 28px", textAlign: "center" }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--text-muted)", fontWeight: 600, marginBottom: 12 }}>
            Required Annual Salary
          </div>
          <div style={{
            fontSize: "clamp(56px, 9vw, 96px)",
            fontFamily: "'Inter', monospace",
            fontWeight: 200,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(180deg, var(--accent), var(--accent-dark))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {fmt(required)}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 10 }}>
            ~{fmt(monthlyGross)} / month gross · ~{fmt(monthlyNet)} / month after taxes
          </div>
        </section>

        {/* Affiliate slot */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category="jobs" placement={`salary-needed-${slug}`} variant="banner" />
        </div>

        {/* Cost breakdown */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>
            What that salary actually buys in {city.city}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {[
              { label: "Cost-of-living index", value: city.index, sub: "national avg = 100" },
              { label: "1-bed rent", value: fmt(city.rent1br) + "/mo" },
              { label: "2-bed rent", value: fmt(city.rent2br) + "/mo" },
              { label: "Median income", value: fmt(city.medianIncome), sub: `${city.medianIncome > required ? "above" : "below"} required` },
              { label: "Housing affordable?", value: isAffordable ? "Yes" : "Tight", sub: `${fmt(housingMax)} max @ 30%`, accent: isAffordable },
            ].map((m, i) => (
              <div key={i} style={{
                background: m.accent ? "linear-gradient(135deg, var(--accent-bg), var(--bg-card))" : "var(--bg-input)",
                border: m.accent ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                borderRadius: 10, padding: "14px 16px",
              }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: m.accent ? "var(--accent)" : "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{m.value}</div>
                {m.sub && <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{m.sub}</div>}
              </div>
            ))}
          </div>
        </section>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Why a {tier.label.toLowerCase()} in {city.city} costs {fmt(required)}
          </h2>
          <p style={{ marginBottom: 16 }}>
            {city.city}'s cost-of-living index of {city.index} means everyday costs run roughly {vsNational > 0 ? `${vsNational.toFixed(0)}% above` : `${Math.abs(vsNational).toFixed(0)}% below`} the national average. To maintain a {tier.label.toLowerCase()}, the standard national-average baseline of {fmt(nationalAvg)} adjusts to {fmt(required)} here.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>The biggest line item: rent</h3>
          <p style={{ marginBottom: 16 }}>
            A 1-bedroom in {city.city} averages {fmt(city.rent1br)}/month — that's {fmt(city.rent1br * 12)}/year, or about {((city.rent1br * 12 / required) * 100).toFixed(0)}% of the salary required for this lifestyle. Most financial planning rules suggest keeping housing under 30% of take-home pay; on this salary, your housing cap would be {fmt(housingMax)}/month, which {isAffordable ? `comfortably covers a 1-bedroom in ${city.city}` : `is tight against the typical ${city.city} 1-bedroom of ${fmt(city.rent1br)}/month`}.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Take-home reality</h3>
          <p style={{ marginBottom: 16 }}>
            Your gross is {fmt(required)}, but federal taxes, FICA, and {city.stateFullName} state taxes typically eat 25-30%. After-tax income lands around {fmt(monthlyNet)}/month — that's the number that has to cover housing, transportation, food, and savings. If that feels tight for the lifestyle you have in mind, scale up your salary target.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Comparison: {city.city}'s median income</h3>
          <p style={{ marginBottom: 16 }}>
            {city.city}'s median household income is {fmt(city.medianIncome)}, which is {city.medianIncome > required ? "above" : "below"} the required salary for this tier. {city.medianIncome > required ? `That means more than half of households in ${city.city} could plausibly afford this lifestyle.` : `That means most households in ${city.city} earn below this threshold and may be making tradeoffs to maintain a ${tier.label.toLowerCase()}.`}
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`salary-needed/${slug}`}
            headline={`Track ${city.city} salary trends`}
            subhead="Monthly insights on local cost of living, salary trends, and lifestyle math."
          />
        </div>

        {/* Other tiers in same city */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Other lifestyles in {city.city}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {Object.entries(LIFESTYLE_TIERS).filter(([k]) => k !== tierKey).slice(0, 8).map(([k, t]) => (
              <a key={k} href={`/salary-needed/${k}-in-${cityKey}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
                {t.label} →
              </a>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

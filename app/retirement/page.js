import Header from "../components/Header";
import Footer from "../components/Footer";

const AGE_GROUPS = [
  { label: "Your 20s", ages: [22, 25, 27, 28, 29] },
  { label: "Your 30s", ages: [30, 32, 35, 37, 39] },
  { label: "Your 40s", ages: [40, 42, 45, 47, 49] },
  { label: "Your 50s", ages: [50, 52, 55, 57, 59] },
  { label: "60+", ages: [60, 62, 65, 67, 70] },
];

const POPULAR_SALARIES = [50000, 75000, 100000, 150000, 200000];
const FEATURED_AGES = [30, 40, 50, 60];

export const metadata = {
  title: "Retirement Savings Benchmarks by Age | Pulsafi",
  description: "How much should you have saved for retirement at 30, 40, 50, or 60? See age-based targets, projected nest egg, and monthly retirement income estimates.",
  alternates: { canonical: "https://www.pulsafi.com/retirement" },
  openGraph: {
    title: "Retirement Savings Benchmarks by Age",
    description: "Age-based retirement savings targets, projections, and monthly income estimates using the 4% rule.",
    url: "https://www.pulsafi.com/retirement",
    type: "website",
  },
};

export default function RetirementHubPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Retirement Savings by Age",
    "itemListElement": AGE_GROUPS.flatMap(g => g.ages).map((age, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": `Retirement savings at age ${age}`,
      "url": `https://www.pulsafi.com/retirement/age-${age}`,
    })),
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Retirement</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          How Much Should I Have Saved by Now?
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
          Pick your age. We'll show the recommended savings multiple, where you'd land at retirement at different contribution rates, and the monthly income that nest egg supports.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Featured Ages</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 40 }}>
          {FEATURED_AGES.map(age => (
            <a key={age} href={`/retirement/age-${age}`} style={{
              padding: "24px", background: "var(--bg-card)", border: "1px solid var(--border-card)",
              borderRadius: 14, textDecoration: "none", color: "var(--text-primary)", textAlign: "center",
            }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "#2563eb" }}>{age}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 4 }}>Savings target & projection</div>
            </a>
          ))}
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 16 }}>Every Age, 22 to 70</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          Each page shows the recommended savings multiple for that age, projected nest egg at 10/15/20/25% contribution rates, and monthly retirement income using the 4% rule.
        </p>
        {AGE_GROUPS.map(group => (
          <div key={group.label} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "var(--text-secondary)" }}>{group.label}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 8 }}>
              {group.ages.map(age => (
                <a key={age} href={`/retirement/age-${age}`} style={{
                  padding: "10px 14px", background: "var(--bg-card)", border: "1px solid var(--border-card)",
                  borderRadius: 10, textDecoration: "none", color: "var(--text-primary)", fontSize: 14, textAlign: "center",
                }}>Age {age}</a>
              ))}
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>Age 35, By Salary</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
          Salary changes the picture — these pages factor in your specific income for both the savings target and projected outcome.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8, marginBottom: 40 }}>
          {POPULAR_SALARIES.map(salary => (
            <a key={salary} href={`/retirement/age-35-salary-${salary}`} style={{
              padding: "10px 14px", background: "var(--bg-card)", border: "1px solid var(--border-card)",
              borderRadius: 10, textDecoration: "none", color: "var(--text-primary)", fontSize: 14, textAlign: "center",
            }}>${(salary / 1000).toFixed(0)}K salary</a>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px", color: "white" }}>
          <div style={{ fontSize: 12, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Custom Plan</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>FIRE Calculator</h3>
          <p style={{ fontSize: 14, opacity: 0.95, margin: "0 0 16px", lineHeight: 1.6 }}>Model your own retirement timeline with custom contribution rates, expected returns, and target retirement age.</p>
          <a href="/tools/fire-calculator" style={{ display: "inline-block", background: "white", color: "#2563eb", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>Open Calculator →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

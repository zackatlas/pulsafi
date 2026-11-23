import SectionHub, { HubHeading, HubGroup, HubChip, HubCallout } from "../components/SectionHub";
import cityData from "../data/cityData";
import { LIFESTYLE_TIERS, SALARY_NEEDED_CITIES } from "../data/salaryNeeded";

// Every city with /salary-needed pages. Each city links to its "comfortable"
// page, which links to the other nine lifestyle tiers for that city.
const CITIES_BY_STATE = SALARY_NEEDED_CITIES.reduce((groups, key) => {
  const city = cityData[key];
  (groups[city.stateFullName] ||= []).push({ key, ...city });
  return groups;
}, {});
const STATE_NAMES = Object.keys(CITIES_BY_STATE).sort();

export const metadata = {
  title: "Salary Needed to Live Comfortably by City (2026)",
  description: `How much you need to earn to live comfortably, support a family, or live on a modest budget in ${SALARY_NEEDED_CITIES.length} US cities, adjusted for local cost of living.`,
  alternates: { canonical: "https://www.pulsafi.com/salary-needed" },
  openGraph: {
    title: "Salary Needed to Live Comfortably by City (2026)",
    description: `Cost-of-living-adjusted salary targets for ${SALARY_NEEDED_CITIES.length} US cities.`,
    url: "https://www.pulsafi.com/salary-needed",
    type: "website",
  },
};

export default function SalaryNeededHubPage() {
  return (
    <SectionHub
      eyebrow="Salary Needed"
      title="How Much Do I Need to Earn Here?"
      intro="The same lifestyle costs very different amounts in different cities. Pick a city to see the salary you'd need for each lifestyle, scaled to its cost of living."
    >
      <HubHeading note="Every city page covers all ten of these lifestyles.">
        Lifestyles We Price Out
      </HubHeading>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10, marginBottom: 36 }}>
        {Object.entries(LIFESTYLE_TIERS).map(([key, tier]) => (
          <div key={key} style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{tier.label}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{tier.description}</div>
          </div>
        ))}
      </div>

      <HubHeading note="The cost index compares each city to the US average of 100.">
        {SALARY_NEEDED_CITIES.length} Cities by State
      </HubHeading>
      {STATE_NAMES.map(stateName => (
        <HubGroup key={stateName} title={stateName}>
          {CITIES_BY_STATE[stateName].map(city => (
            <HubChip key={city.key} href={`/salary-needed/comfortable-in-${city.key}`} title={`Salary needed to live comfortably in ${city.city}, ${city.state}`}>
              {city.city} <span style={{ color: "var(--text-muted)" }}>· {city.index}</span>
            </HubChip>
          ))}
        </HubGroup>
      ))}

      <HubCallout
        eyebrow="Compare Costs"
        title="Cost of Living by City"
        body="See rent, the cost index, and median income for more than 1,400 cities."
        href="/cost-of-living"
        cta="Browse Cities →"
      />
    </SectionHub>
  );
}

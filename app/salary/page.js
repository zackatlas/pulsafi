import SectionHub, { HubHeading, HubGroup, HubChip, HubCallout } from "../components/SectionHub";
import stateTaxData from "../data/stateTaxData";
import { TIERS } from "@/lib/crossLinks";

// Every /salary/[salary]-salary-in-[state] page the sitemap emits, grouped by
// state, so each one is two clicks from any page via the footer.
const STATES = Object.entries(stateTaxData).sort(([, a], [, b]) => a.name.localeCompare(b.name));

function fmtK(n) {
  return `$${n / 1000}K`;
}

function stateTaxNote(state) {
  if (state.type === "none") return "No state income tax";
  if (state.type === "flat") return `${state.rate}% flat state tax`;
  return `State tax up to ${state.rate}%`;
}

export const metadata = {
  title: "Salary After Taxes by State (2026)",
  description: "Take-home pay for salaries from $25K to $500K in all 50 states and DC, after federal income tax, state income tax, Social Security, and Medicare.",
  alternates: { canonical: "https://www.pulsafi.com/salary" },
  openGraph: {
    title: "Salary After Taxes by State (2026)",
    description: "Take-home pay for every common salary in all 50 states and DC.",
    url: "https://www.pulsafi.com/salary",
    type: "website",
  },
};

export default function SalaryHubPage() {
  return (
    <SectionHub
      eyebrow="Salary After Taxes"
      title="What's My Take-Home Pay?"
      intro="Pick your state and salary. Each page breaks down federal income tax, state income tax, Social Security, and Medicare, and shows what lands in your paycheck."
    >
      <HubHeading note={`${TIERS.salary.length} salary levels from ${fmtK(TIERS.salary[0])} to ${fmtK(TIERS.salary[TIERS.salary.length - 1])} for every state. States without an income tax keep noticeably more of the same salary.`}>
        All 50 States + DC
      </HubHeading>

      {STATES.map(([key, state]) => (
        <HubGroup key={key} title={state.name} meta={stateTaxNote(state)}>
          {TIERS.salary.map(salary => (
            <HubChip key={salary} href={`/salary/${salary}-salary-in-${key}`} title={`${fmtK(salary)} salary after taxes in ${state.name}`}>
              {fmtK(salary)}
            </HubChip>
          ))}
        </HubGroup>
      ))}

      <HubCallout
        eyebrow="Custom Salary"
        title="Salary Breakdown Calculator"
        body="Different salary, filing status, or 401(k) contribution? Model your exact take-home pay."
        href="/tools/salary-breakdown-calculator"
        cta="Open Calculator →"
      />
    </SectionHub>
  );
}

import SectionHub, { HubHeading, HubGroup, HubChip, HubCallout } from "../components/SectionHub";
import { PROVIDERS, ROLLOVER_PAIRS } from "../data/rolloverProviders";

// Every /401k-rollover/[from]-to-[to] guide, grouped by the provider you're
// leaving.
const PAIRS_BY_FROM = ROLLOVER_PAIRS.reduce((groups, [from, to]) => {
  (groups[from] ||= []).push(to);
  return groups;
}, {});

export const metadata = {
  title: "401(k) Rollover Guides by Provider (2026)",
  description: `Step-by-step guides for ${ROLLOVER_PAIRS.length} 401(k) rollovers between Fidelity, Vanguard, Schwab, Empower, Voya, Principal, and more: direct vs. indirect rollovers, paperwork, and timelines.`,
  alternates: { canonical: "https://www.pulsafi.com/401k-rollover" },
  openGraph: {
    title: "401(k) Rollover Guides by Provider (2026)",
    description: "How to move a 401(k) from one provider to another, step by step.",
    url: "https://www.pulsafi.com/401k-rollover",
    type: "website",
  },
};

export default function RolloverHubPage() {
  return (
    <SectionHub
      eyebrow="401(k) Rollovers"
      title="Moving Your 401(k)?"
      intro="Pick where your old 401(k) is and where you want it to go. Each guide covers direct vs. indirect rollovers, the paperwork both providers need, and how long the move usually takes."
    >
      <HubHeading note="Grouped by the provider you're rolling over from. Times are typical processing windows in business days.">
        {ROLLOVER_PAIRS.length} Rollover Guides
      </HubHeading>

      {Object.entries(PAIRS_BY_FROM).map(([from, targets]) => (
        <HubGroup key={from} title={`From ${PROVIDERS[from].name}`} meta={`Usually ${PROVIDERS[from].processDays} business days`}>
          {targets.map(to => (
            <HubChip key={to} href={`/401k-rollover/${from}-to-${to}`} title={`How to roll over a 401(k) from ${PROVIDERS[from].name} to ${PROVIDERS[to].name}`}>
              To {PROVIDERS[to].name}
            </HubChip>
          ))}
        </HubGroup>
      ))}

      <HubCallout
        eyebrow="Before You Move It"
        title="401(k) vs. Roth IRA vs. Taxable Brokerage"
        body="Not sure a rollover IRA is the right home for the money? Compare the main account types side by side."
        href="/learn/401k-roth-ira-taxable-brokerage"
        cta="Read the Guide →"
      />
    </SectionHub>
  );
}

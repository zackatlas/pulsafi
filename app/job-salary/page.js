import SectionHub, { HubHeading, HubChip, HubCallout } from "../components/SectionHub";
import { jobSalaryData } from "../data/jobSalaryData";

// Entry points into /job-salary/[job]-salary-in-[state]. Linking all ~8,000
// job × state pages from one page isn't practical, so each job links to the
// five most populous states; those pages link on to related jobs and states.
const FEATURED_STATES = [
  ["california", "California", "CA"],
  ["texas", "Texas", "TX"],
  ["florida", "Florida", "FL"],
  ["newyork", "New York", "NY"],
  ["pennsylvania", "Pennsylvania", "PA"],
];

const JOBS_BY_CATEGORY = Object.entries(jobSalaryData).reduce((groups, [slug, job]) => {
  (groups[job.category] ||= []).push({ slug, ...job });
  return groups;
}, {});

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const metadata = {
  title: "Salaries by Job and State (2026)",
  description: `Median, entry-level, and senior pay for ${Object.keys(jobSalaryData).length} jobs across technology, healthcare, finance, the trades, and more, adjusted for each state.`,
  alternates: { canonical: "https://www.pulsafi.com/job-salary" },
  openGraph: {
    title: "Salaries by Job and State (2026)",
    description: "Median pay by job, adjusted for every state.",
    url: "https://www.pulsafi.com/job-salary",
    type: "website",
  },
};

export default function JobSalaryHubPage() {
  return (
    <SectionHub
      eyebrow="Salaries by Job"
      title="What Does This Job Pay Where I Live?"
      intro="National median pay for each job, with state-adjusted pages for median, entry-level, and senior salaries. Pick a job, then a state."
    >
      <HubHeading note="Each state page links to the same job in other states and to related jobs nearby.">
        {Object.keys(jobSalaryData).length} Jobs in {Object.keys(JOBS_BY_CATEGORY).length} Fields
      </HubHeading>

      {Object.entries(JOBS_BY_CATEGORY).map(([category, jobs]) => (
        <section key={category} style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 10px" }}>{category}</h3>
          <div style={{ border: "1px solid var(--border-card)", borderRadius: 12, overflow: "hidden" }}>
            {jobs.map((job, i) => (
              <div key={job.slug} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap",
                padding: "10px 14px", background: i % 2 ? "var(--bg-main)" : "var(--bg-card)",
              }}>
                <div style={{ minWidth: 180 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{job.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>US median {fmt(job.medianSalary)}</div>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {FEATURED_STATES.map(([stateKey, stateName, abbr]) => (
                    <HubChip key={stateKey} href={`/job-salary/${job.slug}-salary-in-${stateKey}`} title={`${job.title} salary in ${stateName}`}>
                      {abbr}
                    </HubChip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <HubCallout
        eyebrow="City-Level Data"
        title="Salaries by Job and City"
        body="Want metro-level pay from the Bureau of Labor Statistics instead of a state estimate? Browse salaries by job and city."
        href="/city-job-salary"
        cta="Browse by City →"
      />
    </SectionHub>
  );
}

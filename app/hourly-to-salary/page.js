import SectionHub, { HubHeading, HubGroup, HubChip, HubCallout } from "../components/SectionHub";
import { TIERS } from "@/lib/crossLinks";

// Every /hourly-to-salary/[rate] page, grouped into pay bands.
const HOURS_PER_YEAR = 2080; // 40 hours × 52 weeks, same as the rate pages

const BANDS = [
  { title: "$7.25 – $15 an hour", min: 0, max: 15 },
  { title: "$15.50 – $25 an hour", min: 15.5, max: 25 },
  { title: "$25.50 – $40 an hour", min: 25.5, max: 40 },
  { title: "$40.50 – $60 an hour", min: 40.5, max: 60 },
  { title: "$60.50 – $100 an hour", min: 60.5, max: 100 },
];

function fmtRate(rate) {
  return rate % 1 === 0 ? rate.toFixed(0) : rate.toFixed(2);
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const metadata = {
  title: "Hourly Wage to Annual Salary Chart",
  description: "Convert any hourly wage from $7.25 to $100 into an annual salary, with monthly, biweekly, and weekly pay and estimated take-home after federal taxes.",
  alternates: { canonical: "https://www.pulsafi.com/hourly-to-salary" },
  openGraph: {
    title: "Hourly Wage to Annual Salary Chart",
    description: "Every hourly wage from $7.25 to $100, converted to annual salary.",
    url: "https://www.pulsafi.com/hourly-to-salary",
    type: "website",
  },
};

export default function HourlyToSalaryHubPage() {
  return (
    <SectionHub
      eyebrow="Hourly to Salary"
      title="What's My Hourly Wage Per Year?"
      intro={`A full-time job is about ${HOURS_PER_YEAR.toLocaleString()} hours a year (40 hours × 52 weeks), so multiply your hourly wage by ${HOURS_PER_YEAR.toLocaleString()} for a pre-tax annual salary. Pick a rate for the monthly, biweekly, and weekly breakdown and estimated take-home pay after federal taxes.`}
    >
      <HubHeading note="Each figure is the pre-tax annual salary for a full-time, 40-hour week with no unpaid time off.">
        Every Rate from $7.25 to $100
      </HubHeading>

      {BANDS.map(band => {
        const rates = TIERS.hourly.filter(r => r >= band.min && r <= band.max);
        return (
          <HubGroup key={band.title} title={band.title} meta={`${fmt(rates[0] * HOURS_PER_YEAR)} – ${fmt(rates[rates.length - 1] * HOURS_PER_YEAR)} a year`}>
            {rates.map(rate => (
              <HubChip key={rate} href={`/hourly-to-salary/${rate.toFixed(2)}`} title={`$${fmtRate(rate)} an hour is ${fmt(rate * HOURS_PER_YEAR)} a year`}>
                ${fmtRate(rate)}/hr · {fmt(rate * HOURS_PER_YEAR)}
              </HubChip>
            ))}
          </HubGroup>
        );
      })}

      <HubCallout
        eyebrow="Next Step"
        title="Salary After Taxes"
        body="Know your annual salary? See your take-home pay in your state after federal tax, state tax, Social Security, and Medicare."
        href="/salary"
        cta="See Take-Home Pay →"
      />
    </SectionHub>
  );
}

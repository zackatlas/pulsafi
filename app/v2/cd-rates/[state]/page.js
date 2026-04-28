import { notFound } from "next/navigation";
import PageShell from "../../../components/v2/PageShell";
import HeaderV2 from "../../../components/v2/HeaderV2";
import FooterV2 from "../../../components/v2/FooterV2";
import HeroNumber from "../../../components/v2/HeroNumber";
import DataPulse from "../../../components/v2/DataPulse";
import SectionHeading from "../../../components/v2/SectionHeading";
import { trailFromHistory, SAMPLE_HYSA_30D } from "../../../../lib/pulseSignatures";

const STATE_NAMES = {
  "california": "California", "texas": "Texas", "new-york": "New York",
  "florida": "Florida", "washington": "Washington",
};

const STATE_TAX = {
  "california": 13.3, "texas": 0, "new-york": 10.9, "florida": 0, "washington": 0,
};

const CD_TERMS = [
  { term: "3-month",  rate: 4.85 },
  { term: "6-month",  rate: 4.95 },
  { term: "1-year",   rate: 4.65 },
  { term: "18-month", rate: 4.40 },
  { term: "2-year",   rate: 4.25 },
  { term: "5-year",   rate: 4.00 },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(STATE_NAMES).map(state => ({ state }));
}

export async function generateMetadata({ params }) {
  const { state } = await params;
  const name = STATE_NAMES[state];
  if (!name) return {};
  return {
    title: `${name} CD rates — Pulsafi`,
    description: `Today's best CD rates for ${name} residents, with after-tax yield analysis.`,
    robots: { index: false, follow: false },
    alternates: { canonical: `/v2/cd-rates/${state}` },
  };
}

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
const fmtD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export default async function CdRatesV2({ params }) {
  const { state } = await params;
  const stateName = STATE_NAMES[state];
  if (!stateName) notFound();

  const stateRate = STATE_TAX[state];
  const noTax = stateRate === 0;
  const top = Math.max(...CD_TERMS.map(t => t.rate));

  const sample = 25000;
  const cd1y = CD_TERMS.find(t => t.term === "1-year").rate;
  const cd1yGross = sample * cd1y / 100;
  const cd1yAfter = cd1yGross - cd1yGross * 0.24 - cd1yGross * (stateRate / 100);
  const cd1yAfterYield = cd1yAfter / sample * 100;

  const headerSig = trailFromHistory(SAMPLE_HYSA_30D, { points: 60 });

  return (
    <PageShell>
      <HeaderV2
        signature={headerSig}
        liveLabel={`${stateName} HYSA`}
        liveValue={`${top.toFixed(2)}%`}
        liveTrend="−0.05% / 30d"
        trendDirection="down"
      />

      {/* Hero */}
      <section style={{ padding: "80px 32px 32px", textAlign: "center", maxWidth: 920, margin: "0 auto" }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 22, fontFamily: "'DM Sans', sans-serif" }}>
          {stateName} · CD rates today
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(38px, 6vw, 60px)",
          fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.03em",
          margin: "0 0 36px", color: "#e8e8eb",
        }}>
          Lock in {stateName}'s<br />
          <em style={{ fontStyle: "italic", color: "#f0c14a", fontWeight: 300 }}>highest yields</em>
        </h1>

        <HeroNumber
          eyebrow={`Top APY · 6-month CD`}
          primary={`${top.toFixed(2)}%`}
          helper={noTax ? `${stateName} has no state income tax — keep more of every dollar` : `${stateName} taxes interest at ${stateRate}% — verify after-tax yield`}
          size="lg"
        />
      </section>

      {/* Rate ladder */}
      <section style={{ maxWidth: 980, margin: "0 auto", padding: "60px 32px 0" }}>
        <SectionHeading
          eyebrow="The ladder"
          title="Six terms, six APYs"
          subtitle="Compare every term length side by side. Top APY highlighted in gold."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
          {CD_TERMS.map((row, i) => {
            const isTop = row.rate === top;
            return (
              <div key={i} style={{
                padding: "18px 16px",
                background: isTop ? "rgba(240,193,74,0.08)" : "rgba(8,9,12,0.5)",
                border: isTop ? "1px solid rgba(240,193,74,0.4)" : "1px solid rgba(212,168,41,0.1)",
                borderRadius: 10,
                textAlign: "left",
              }}>
                <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: isTop ? "#f0c14a" : "rgba(232,232,235,0.5)", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                  {row.term}
                </div>
                <div style={{ fontSize: 26, fontFamily: "'Inter', monospace", fontWeight: 300, color: "#e8e8eb", letterSpacing: "-0.02em" }}>
                  {row.rate.toFixed(2)}%
                </div>
                <div style={{ fontSize: 10, color: "rgba(232,232,235,0.4)", marginTop: 2, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em" }}>
                  APY
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* After-tax math */}
      <section style={{ maxWidth: 880, margin: "0 auto", padding: "60px 32px" }}>
        <SectionHeading
          eyebrow="What you actually keep"
          title={`${fmt(sample)} in a 1-year CD, after taxes`}
          subtitle={noTax ? `${stateName} has no state income tax — only federal applies.` : `Federal (24% bracket) + ${stateName} state tax (${stateRate}%) on interest income.`}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { label: "Gross interest", value: fmtD(cd1yGross), sub: `at ${cd1y}% APY` },
            { label: "Tax owed", value: `−${fmtD(cd1yGross - cd1yAfter)}`, sub: noTax ? "federal only" : `fed + ${stateRate}% state`, danger: true },
            { label: "You keep", value: fmtD(cd1yAfter), sub: `${cd1yAfterYield.toFixed(2)}% effective`, accent: true },
          ].map((m, i) => (
            <div key={i} style={{
              padding: "22px 22px",
              background: m.accent ? "rgba(240,193,74,0.08)" : "rgba(8,9,12,0.5)",
              border: m.accent ? "1px solid rgba(240,193,74,0.35)" : "1px solid rgba(212,168,41,0.1)",
              borderRadius: 12,
            }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em", color: m.accent ? "#f0c14a" : "rgba(232,232,235,0.5)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                {m.label}
              </div>
              <div style={{ fontSize: 26, fontFamily: "'Inter', monospace", fontWeight: 300, color: m.accent ? "#f0c14a" : m.danger ? "#f4a4a4" : "#e8e8eb", letterSpacing: "-0.02em" }}>
                {m.value}
              </div>
              <div style={{ fontSize: 11, color: "rgba(232,232,235,0.45)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article */}
      <section style={{ padding: "40px 32px", maxWidth: 720, margin: "0 auto" }}>
        <SectionHeading
          eyebrow="The context"
          title={noTax ? `Why ${stateName} is great for CDs` : `${stateName}'s tax cost on CD interest`}
          align="left"
        />
        <div style={{ fontSize: 16, color: "rgba(232,232,235,0.78)", lineHeight: 1.85 }}>
          <p style={{ margin: "0 0 18px" }}>
            {noTax
              ? `Because ${stateName} has no state income tax on earned or interest income, every dollar of CD interest you earn is only taxed at the federal level. That makes ${stateName} one of the most tax-efficient states for cash savings.`
              : `${stateName} taxes interest as ordinary income at up to ${stateRate}%. On a 1-year CD paying ${cd1y}%, that brings your real after-tax yield down to ${cd1yAfterYield.toFixed(2)}% — close to but slightly below comparable T-bills, which are exempt from state income tax.`
            }
          </p>
          <p style={{ margin: "0 0 18px" }}>
            Top CD rates come from online banks (Marcus by Goldman Sachs, Ally, Capital One 360, Synchrony) and the major brokerages (Fidelity, Schwab, Vanguard) selling brokered CDs. Your local {stateName} bank likely pays under 1% — that's why comparison shopping matters even for "boring" cash products.
          </p>
          <p style={{ margin: 0 }}>
            For an emergency fund, prefer a HYSA (fully liquid) over a CD. CDs are best for money you've already earmarked for a known future date — a down payment, a planned tax payment, or a rolling ladder.
          </p>
        </div>
      </section>

      <FooterV2 />
    </PageShell>
  );
}

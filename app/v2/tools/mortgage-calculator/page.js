import PageShell from "../../../components/v2/PageShell";
import HeaderV2 from "../../../components/v2/HeaderV2";
import FooterV2 from "../../../components/v2/FooterV2";
import SectionHeading from "../../../components/v2/SectionHeading";
import LenderCompare from "../../../components/v2/LenderCompare";
import MortgageCalcClient from "./MortgageCalcClient";
import { trailFromHistory, SAMPLE_30YR_RATE_30D } from "../../../../lib/pulseSignatures";

export const metadata = {
  title: "Mortgage Calculator — Pulsafi",
  description: "Mortgage payment calculator with live pulse and intentional UI.",
  robots: { index: false, follow: false },
};

export default function MortgageCalcV2() {
  const headerSig = trailFromHistory(SAMPLE_30YR_RATE_30D, { points: 60 });
  return (
    <PageShell>
      <HeaderV2
        signature={headerSig}
        liveLabel="30yr fixed"
        liveValue="6.875%"
        liveTrend="−0.12% / 30d"
        trendDirection="down"
      />

      <section style={{ padding: "70px 32px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 18, fontFamily: "'DM Sans', sans-serif" }}>
          Mortgage calculator
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px, 6vw, 60px)",
          fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.03em",
          margin: 0, color: "#e8e8eb",
        }}>
          What will your<br />
          <em style={{ fontStyle: "italic", color: "#f0c14a", fontWeight: 300 }}>monthly payment</em> be?
        </h1>
      </section>

      <MortgageCalcClient />

      <section style={{ padding: "40px 32px", maxWidth: 980, margin: "0 auto" }}>
        <SectionHeading
          eyebrow="Compare lenders"
          title="Lock in your rate before it moves"
          subtitle="Three lenders, soft-pull only. The lowest rate above will shape what you actually pay every month for the next 30 years."
        />
        <LenderCompare />
      </section>

      <section style={{ padding: "60px 32px", maxWidth: 720, margin: "0 auto" }}>
        <SectionHeading
          eyebrow="How to use this calculator"
          title="Three things move the answer"
          align="left"
        />
        <div style={{ fontSize: 15, color: "rgba(232,232,235,0.78)", lineHeight: 1.85 }}>
          <p style={{ margin: "0 0 18px" }}>
            <strong style={{ color: "#f0c14a" }}>Down payment.</strong> Every percentage point of down payment reduces your loan balance directly. 20% down typically eliminates PMI and qualifies you for the best advertised rates.
          </p>
          <p style={{ margin: "0 0 18px" }}>
            <strong style={{ color: "#f0c14a" }}>Interest rate.</strong> A 0.5% rate change on a $400,000 loan moves the monthly payment by roughly $130 and the lifetime interest by over $40,000. Comparing 3+ lenders is the highest-leverage thing you can do.
          </p>
          <p style={{ margin: 0 }}>
            <strong style={{ color: "#f0c14a" }}>Loan term.</strong> 15-year mortgages save dramatically on interest but raise the monthly burden. Stretch to 30 if cash flow matters more than total cost.
          </p>
        </div>
      </section>

      <FooterV2 />
    </PageShell>
  );
}

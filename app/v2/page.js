import PageShell from "../components/v2/PageShell";
import HeaderV2 from "../components/v2/HeaderV2";
import FooterV2 from "../components/v2/FooterV2";
import DataPulse from "../components/v2/DataPulse";
import SectionHeading from "../components/v2/SectionHeading";
import ImmersiveHero from "../components/v2/ImmersiveHero";
import ScenarioMorph from "../components/v2/ScenarioMorph";
import { trailFromHistory, ambientFromMetric, SAMPLE_30YR_RATE_30D, SAMPLE_HYSA_30D } from "../../lib/pulseSignatures";

export const metadata = {
  title: "Pulsafi — The pulse of personal finance",
  description: "Live rates, intentional tools, and clarity for every money decision.",
  robots: { index: false, follow: false },
};

const SECTION = { padding: "0 32px", maxWidth: 1100, margin: "0 auto" };

export default function HomeV2() {
  const headerSig = trailFromHistory(SAMPLE_30YR_RATE_30D, { points: 60 });

  return (
    <PageShell>
      <HeaderV2
        signature={headerSig}
        liveLabel="30yr fixed mortgage"
        liveValue="6.875%"
        liveTrend="−0.12% / 30d"
        trendDirection="down"
      />

      {/* Immersive viewport-filling hero — the page IS the number */}
      <ImmersiveHero />

      {/* Scroll-driven scenarios — the number morphs as you scroll */}
      <ScenarioMorph />

      {/* Today's pulse cards */}
      <section style={{ ...SECTION, padding: "100px 32px" }}>
        <SectionHeading
          eyebrow="Today's pulse"
          title="Three rates, three rhythms"
          subtitle="Each metric draws its own pulse signature from the last 30 days of movement."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { eyebrow: "Mortgage · 30yr fixed", value: "6.875%", trend: "−0.12% / 30d", trendDirection: "down", sig: trailFromHistory(SAMPLE_30YR_RATE_30D, { points: 50 }) },
            { eyebrow: "HYSA · top APY", value: "4.50%", trend: "−0.05% / 30d", trendDirection: "down", sig: trailFromHistory(SAMPLE_HYSA_30D, { points: 50 }) },
            { eyebrow: "1yr T-Bill", value: "4.45%", trend: "+0.04% / 30d", trendDirection: "up", sig: ambientFromMetric({ history: SAMPLE_HYSA_30D, magnitude: 0.55 }) },
          ].map((r, i) => (
            <div key={i} style={{ padding: "26px 24px", border: "1px solid rgba(212,168,41,0.1)", borderRadius: 12, background: "rgba(8,9,12,0.4)" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 10, fontFamily: "'DM Sans', sans-serif" }}>
                {r.eyebrow}
              </div>
              <div style={{ fontSize: 42, fontFamily: "'Inter', monospace", fontWeight: 200, color: "#e8e8eb", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {r.value}
              </div>
              <div style={{ fontSize: 11, fontFamily: "'Inter', monospace", color: r.trendDirection === "up" ? "#f4a4a4" : "#7dd3a1", marginTop: 6, fontWeight: 600 }}>
                {r.trendDirection === "up" ? "↑" : "↓"} {r.trend}
              </div>
              <div style={{ marginTop: 18, marginLeft: -24, marginRight: -24 }}>
                <DataPulse signature={r.sig} variant="trail" height={70} glow={false} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Toolkit */}
      <section style={{ ...SECTION, padding: "60px 32px 80px" }}>
        <SectionHeading
          eyebrow="The toolkit"
          title="Everything that orbits your money decisions"
          subtitle="Each tool draws its own data, its own pulse — and connects to the others."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {[
            { title: "Mortgage Calculator", body: "Inputs slide along a pulse. Result lives on the peak.", href: "/v2/tools/mortgage-calculator" },
            { title: "Best Mortgage Rates", body: "Live state-by-state rates, dual-pulse comparison.", href: "/v2/best-mortgage-rates/california" },
            { title: "HYSA + CD Rates", body: "Today's APYs with state-aware after-tax math.", href: "/v2/cd-rates/california" },
            { title: "FIRE Calculator", body: "Your timeline as one continuous pulse from now to FI.", href: "/tools/fire-calculator" },
            { title: "Refinance Break-Even", body: "Two payments. Two pulses. The crossover is the answer.", href: "/refinance-calculator/california" },
            { title: "First-Time Homebuyer", body: "State HFA programs and DPA assistance, side-by-side.", href: "/first-time-homebuyer/california" },
          ].map((t, i) => (
            <a key={i} href={t.href} style={{
              padding: "24px 22px",
              border: "1px solid rgba(212,168,41,0.1)",
              borderRadius: 12,
              background: "rgba(8,9,12,0.4)",
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 500, color: "#e8e8eb", marginBottom: 8, letterSpacing: "-0.01em" }}>
                {t.title}
              </div>
              <div style={{ fontSize: 13, color: "rgba(232,232,235,0.55)", lineHeight: 1.55 }}>
                {t.body}
              </div>
              <div style={{ fontSize: 10, color: "#f0c14a", marginTop: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase" }}>
                Open →
              </div>
            </a>
          ))}
        </div>
      </section>

      <FooterV2 />
    </PageShell>
  );
}

import { notFound } from "next/navigation";
import PageShell from "../../../components/v2/PageShell";
import HeaderV2 from "../../../components/v2/HeaderV2";
import FooterV2 from "../../../components/v2/FooterV2";
import DataPulse from "../../../components/v2/DataPulse";
import { trailFromHistory, SAMPLE_30YR_RATE_30D } from "../../../../lib/pulseSignatures";

// Sample article body — in production this would be MDX or markdown.
const ARTICLES = {
  "fire-movement-2026": {
    title: "The FIRE movement, in plain English",
    eyebrow: "Investing · 9 min read",
    deck: "How early retirement actually works in 2026 — the math, the lifestyle, and why it isn't only for software engineers earning $400k.",
    body: [
      { type: "p", text: "FIRE — Financial Independence, Retire Early — sounds extreme until you do the math. The premise: save aggressively (50%+ of income) for 10–15 years, invest in low-cost index funds, and reach a portfolio that produces enough passive income to cover your annual expenses indefinitely." },
      { type: "h", text: "The 4% rule" },
      { type: "p", text: "The original FIRE math comes from the Trinity Study: a portfolio of 60% stocks, 40% bonds can sustain a 4% annual withdrawal (adjusted for inflation) with high probability of lasting 30+ years. Multiply your annual expenses by 25 — that's your FIRE number. Spend $40k/year? You need $1M invested." },
      { type: "h", text: "Why savings rate matters more than income" },
      { type: "p", text: "Two people earning the same can hit FIRE decades apart based purely on what they save. Save 10% of your income → 51 years to FIRE. Save 50% → 17 years. Save 70% → 8 years. Income matters because it sets a ceiling, but savings rate determines speed. Cutting expenses helps twice: you save more, and your FIRE number drops." },
      { type: "pull", text: "Save 10% → 51 years. Save 50% → 17 years. Save 70% → 8 years." },
      { type: "h", text: "The flavors of FIRE" },
      { type: "p", text: "Lean FIRE retires on $30–40k/year. Fat FIRE assumes $100k+. Coast FIRE means you've saved enough that compound growth alone gets you to traditional retirement — so you only need to cover current expenses. Barista FIRE blends part-time work for benefits with portfolio income." },
      { type: "h", text: "What goes wrong" },
      { type: "p", text: "Sequence-of-returns risk is the killer: a market crash early in retirement disproportionately damages a portfolio that's actively withdrawing. Mitigations include keeping 1–3 years of cash, holding more bonds in early retirement, and being willing to throttle spending in down years. None are theoretical: every FIRE'd retiree before 1995 had to deal with the dot-com crash early on." },
    ],
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(ARTICLES).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = ARTICLES[slug];
  if (!a) return {};
  return {
    title: `${a.title} — Pulsafi`,
    description: a.deck,
    robots: { index: false, follow: false },
    alternates: { canonical: `/v2/learn/${slug}` },
  };
}

export default async function LearnArticleV2({ params }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const headerSig = trailFromHistory(SAMPLE_30YR_RATE_30D, { points: 60 });

  return (
    <PageShell>
      <HeaderV2 signature={headerSig} liveLabel="Markets" liveValue="Pulsing" />

      <article style={{ padding: "70px 32px 60px" }}>
        {/* Title block */}
        <header style={{ maxWidth: 720, margin: "0 auto 48px", textAlign: "center" }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 22, fontFamily: "'DM Sans', sans-serif" }}>
            {article.eyebrow}
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 6vw, 64px)",
            fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.03em",
            margin: "0 0 28px", color: "#e8e8eb",
          }}>
            {article.title}
          </h1>
          <p style={{
            fontSize: 19, lineHeight: 1.55, fontFamily: "'Playfair Display', serif",
            fontStyle: "italic", color: "rgba(232,232,235,0.7)", margin: 0,
          }}>
            {article.deck}
          </p>
        </header>

        {/* Body — single column, generous line-height, no overlays */}
        <div style={{ maxWidth: 680, margin: "0 auto", fontSize: 17, lineHeight: 1.85, color: "rgba(232,232,235,0.82)" }}>
          {article.body.map((block, i) => {
            if (block.type === "h") {
              return (
                <h2 key={i} style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26, fontWeight: 500, color: "#f0c14a",
                  marginTop: 44, marginBottom: 18, letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                }}>
                  {block.text}
                </h2>
              );
            }
            if (block.type === "pull") {
              return (
                <blockquote key={i} style={{
                  margin: "44px 0",
                  paddingLeft: 24,
                  borderLeft: "2px solid #f0c14a",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26, lineHeight: 1.35, fontStyle: "italic",
                  color: "#e8e8eb", letterSpacing: "-0.015em",
                }}>
                  "{block.text}"
                </blockquote>
              );
            }
            return (
              <p key={i} style={{ margin: "0 0 22px" }}>
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      <FooterV2 />
    </PageShell>
  );
}

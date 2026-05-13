import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AffiliateOffer from "../../components/AffiliateOffer";
import EmailCapture from "../../components/EmailCapture";
import { PROVIDERS, ROLLOVER_PAIRS } from "../../data/rolloverProviders";

export const dynamicParams = false;

export function generateStaticParams() {
  return ROLLOVER_PAIRS.map(([from, to]) => ({ slug: `${from}-to-${to}` }));
}

function parseSlug(slug) {
  const match = slug.match(/^(.+)-to-(.+)$/);
  if (!match) return null;
  const [, from, to] = match;
  if (!PROVIDERS[from] || !PROVIDERS[to]) return null;
  return { from, to };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const { from, to } = parsed;
  const fromP = PROVIDERS[from];
  const toP = PROVIDERS[to];
  return {
    title: `How to Roll Over a 401(k) From ${fromP.name} to ${toP.name} (${new Date().getFullYear()})`,
    description: `Step-by-step guide to rolling over your 401(k) from ${fromP.name} to ${toP.name}. Direct vs indirect rollover, paperwork, timeline (${toP.processDays} business days typical), and tax implications.`,
    alternates: { canonical: `/401k-rollover/${slug}` },
    openGraph: {
      title: `${fromP.name} to ${toP.name} 401(k) Rollover Guide`,
      description: `Complete walkthrough for rolling over a 401(k) from ${fromP.name} to ${toP.name}.`,
      url: `https://www.pulsafi.com/401k-rollover/${slug}`,
    },
  };
}

export default async function RolloverPage({ params }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  const { from, to } = parsed;
  const fromP = PROVIDERS[from];
  const toP = PROVIDERS[to];
  const updated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Pick a sensible affiliate category. If destination is a robo-advisor or self-directed broker,
  // it's a brokerage-category placement. If it's another retirement provider, use retirement.
  const affiliateCategory = (toP.category === "robo-advisor" || toP.category === "self-directed")
    ? "brokerage"
    : "retirement";

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How long does a 401(k) rollover from ${fromP.name} to ${toP.name} take?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `A direct rollover from ${fromP.name} to ${toP.name} typically takes ${toP.processDays} business days from the day ${fromP.name} releases your funds. ${fromP.ach ? "" : `Since ${fromP.name} usually issues paper checks rather than ACH, expect closer to the longer end of that range.`}`,
        },
      },
      {
        "@type": "Question",
        "name": `Will I owe taxes on a rollover from ${fromP.name} to ${toP.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `No taxes are owed on a direct rollover from ${fromP.name} to a Traditional IRA at ${toP.name}. If you convert pre-tax 401(k) funds to a Roth IRA, the converted amount is taxable as ordinary income in the year of conversion.`,
        },
      },
      {
        "@type": "Question",
        "name": `Is rolling over from ${fromP.name} to ${toP.name} worth it?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${toP.notes} For most ${fromP.name} 401(k) holders, ${toP.name} offers ${toP.category === "self-directed" ? "lower fees, broader fund choice, and more control" : toP.category === "robo-advisor" ? "automated investing with tax-loss harvesting" : "comparable retirement features"}.`,
        },
      },
      {
        "@type": "Question",
        "name": `Does ${fromP.name} charge a fee to roll out?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${fromP.name} typically does not charge a fee to release a rollover. Some plans charge a $25-50 distribution fee — check your plan's fee disclosure (Form 404a-5). Receiving providers like ${toP.name} do not charge to accept rollover funds.`,
        },
      },
    ],
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />

      <section style={{ padding: "60px 24px 32px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Updated {updated}
        </div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Roll Over Your 401(k) From {fromP.name} to {toP.name}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
          Step-by-step guide to moving your retirement savings from {fromP.name} to {toP.name}. Typical timeline: {toP.processDays} business days. No taxes owed on a direct rollover.
        </p>
      </section>

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px 60px" }}>

        <AffiliateOffer category={affiliateCategory} placement={`rollover-${slug}-top`} variant="card" />

        {/* Provider comparison */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>
            {fromP.name} vs {toP.name}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", marginBottom: 6 }}>From</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{fromP.name}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 8 }}>{fromP.notes}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>📞 {fromP.phone}</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))", border: "1px solid var(--accent-border)", borderRadius: 12, padding: "16px 18px" }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", marginBottom: 6 }}>To</div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{toP.name}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 8 }}>{toP.notes}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>📞 {toP.phone}</div>
            </div>
          </div>
        </section>

        {/* Step-by-step */}
        <section style={{ marginTop: 24, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 16, padding: "24px 26px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 18px" }}>
            Step-by-Step: {fromP.name} to {toP.name}
          </h2>

          {[
            {
              step: 1,
              title: `Open a Rollover IRA at ${toP.name}`,
              body: `Go to the ${toP.name} website (or call ${toP.phone}) and open a Rollover IRA. ${toP.name} offers: ${toP.iraType}. This usually takes 10-15 minutes online and requires basic identity verification.`,
            },
            {
              step: 2,
              title: `Initiate the rollover from ${fromP.name}`,
              body: `Call ${fromP.name} at ${fromP.phone} and request a "direct rollover" to your new Rollover IRA at ${toP.name}. ${fromP.paperOption ? "They'll typically mail a paper distribution form to fill out, or you can request electronic processing." : "They typically allow electronic-only processing."} You'll need ${toP.name}'s account number, ABA routing number, and full name on the destination IRA.`,
            },
            {
              step: 3,
              title: `Choose direct rollover (not 60-day rollover)`,
              body: `Insist on a direct rollover where ${fromP.name} sends funds straight to ${toP.name} (or mails a check made payable to "${toP.name} FBO [Your Name]"). Avoid the 60-day indirect rollover — ${fromP.name} would withhold 20% for federal taxes that you'd have to make up out of pocket within 60 days or face a 10% early withdrawal penalty.`,
            },
            {
              step: 4,
              title: `Wait for funds to arrive at ${toP.name}`,
              body: `Allow ${toP.processDays} business days. ${toP.ach ? `${toP.name} accepts ACH and check rollovers — ACH is faster.` : `${toP.name} primarily processes via check, so you may see the longer end of that timeline.`} Track progress through both the ${fromP.name} portal (showing distribution) and the ${toP.name} portal (showing pending deposit).`,
            },
            {
              step: 5,
              title: `Invest the funds`,
              body: `Once the cash lands in your ${toP.name} Rollover IRA, it sits as cash earning the default money market rate. ${toP.category === "robo-advisor" ? `${toP.name} will automatically invest based on your risk profile after you complete onboarding.` : toP.category === "self-directed" ? `You need to choose your investments — index funds (VTI, VXUS, BND), target-date funds, or individual stocks. ${toP.freeAdvisorReview ? `${toP.name} offers free phone consultations with their representatives if you want guidance.` : ""}` : "Choose your investment allocation based on your retirement timeline."}`,
            },
            {
              step: 6,
              title: `Confirm with both providers`,
              body: `After 30 days, verify with ${fromP.name} that your old 401(k) shows a $0 balance and that they've issued a 1099-R for the rollover (this should show a Code G in Box 7, indicating a non-taxable direct rollover). At ${toP.name}, confirm the funds arrived and that they're invested per your instructions.`,
            },
          ].map((step) => (
            <div key={step.step} style={{ display: "flex", gap: 16, marginBottom: 20 }}>
              <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 16, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", color: "#0d0f13", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, fontFamily: "'Inter', monospace" }}>
                {step.step}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65 }}>{step.body}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Mid-page affiliate */}
        <div style={{ marginTop: 24 }}>
          <AffiliateOffer category={affiliateCategory} placement={`rollover-${slug}-mid`} variant="banner" />
        </div>

        {/* Article body */}
        <section style={{ marginTop: 32, color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Should You Roll Over Your {fromP.name} 401(k) to {toP.name}?
          </h2>
          <p style={{ marginBottom: 16 }}>
            Rolling over a 401(k) from {fromP.name} to {toP.name} usually makes sense when: (1) you've left the employer, (2) the {fromP.name} plan has high fees or limited fund choice, (3) you want to consolidate retirement accounts, or (4) you want better customer service or tools at {toP.name}. {fromP.category === "employer-plan" ? `Plans administered by ${fromP.name} commonly have higher expense ratios and more limited fund menus than self-directed brokerages — rolling out is one of the most common moves people make after leaving a job.` : ""}
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Reasons to keep your money at {fromP.name}</h3>
          <p style={{ marginBottom: 16 }}>
            Don't roll over if: (1) you have $5,000+ in {fromP.name} and the plan offers institutional-class share funds you can't access elsewhere, (2) you're 55+ and might use the "rule of 55" to take penalty-free 401(k) withdrawals after leaving the employer (this only works with the employer plan, not an IRA), or (3) you're worried about creditor protection — 401(k)s have stronger ERISA protection than IRAs in some states.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Tax implications</h3>
          <p style={{ marginBottom: 16 }}>
            A direct rollover from a Traditional 401(k) at {fromP.name} to a Traditional IRA at {toP.name} is non-taxable. Roth 401(k) money rolls into a Roth IRA, also non-taxable. If you convert pre-tax 401(k) funds to a Roth IRA at {toP.name}, the entire converted amount is taxable as ordinary income in that tax year — useful for backdoor Roth strategies but plan for the tax bill.
          </p>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: "20px 0 10px" }}>Common pitfalls</h3>
          <p style={{ marginBottom: 16 }}>
            The biggest mistake is taking a 60-day indirect rollover instead of a direct rollover. {fromP.name} would withhold 20% for federal taxes; you'd have to come up with that 20% from another source within 60 days or face taxes plus a 10% early withdrawal penalty. Always ask for a "direct rollover" or "trustee-to-trustee transfer" — never have the check made payable to you personally.
          </p>
        </section>

        {/* Email capture */}
        <div style={{ marginTop: 28 }}>
          <EmailCapture
            source={`401k-rollover/${slug}`}
            headline="Retirement planning insights in The Pulse"
            subhead="Weekly tips on 401(k)s, IRAs, rollovers, and tax-efficient retirement strategies."
          />
        </div>

        {/* Internal links */}
        <section style={{ marginTop: 28, background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Other rollover guides</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ROLLOVER_PAIRS.filter(([f, t]) => f !== from || t !== to).slice(0, 8).map(([f, t]) => (
              <a key={`${f}-to-${t}`} href={`/401k-rollover/${f}-to-${t}`} style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
                {PROVIDERS[f].name.split(" ")[0]} → {PROVIDERS[t].name.split(" ")[0]}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            <a href="/tools/fire-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              FIRE Calculator →
            </a>
            <a href="/tools/compound-interest-calculator" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Compound Interest →
            </a>
            <a href="/learn/roth-ira-vs-401k-2026" style={{ background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, padding: "8px 14px", color: "var(--text-secondary)", textDecoration: "none", fontSize: 13 }}>
              Roth IRA vs 401(k) →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

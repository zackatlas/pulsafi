import Header from "../components/Header";
import Footer from "../components/Footer";
import LenderComparisonTable from "../components/designv2/LenderComparisonTable";
import HeroNumber from "../components/designv2/HeroNumber";
import StickyMobileCTA from "../components/designv2/StickyMobileCTA";
import StateHeroBadge from "../components/designv2/StateHeroBadge";
import DataSourceByline from "../components/designv2/DataSourceByline";
import PulseDivider from "../components/designv2/PulseDivider";

export const metadata = {
  title: "Design v2 Preview — Pulsafi",
  description: "Internal preview of proposed visual changes.",
  robots: { index: false, follow: false },
};

const sectionStyle = {
  background: "var(--bg-card)",
  border: "1px solid var(--border-card)",
  borderRadius: 16,
  padding: "28px 28px 32px",
  marginBottom: 32,
};

const labelStyle = {
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: "0.12em",
  fontWeight: 700,
  marginBottom: 6,
  fontFamily: "'DM Sans', sans-serif",
};

function SectionHeader({ num, title, why }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          color: "#0d0f13", display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontFamily: "'Inter', monospace", fontSize: 14,
        }}>{num}</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: "-0.01em" }}>
          {title}
        </h2>
      </div>
      <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.65, margin: "0 0 0 44px", maxWidth: 700 }}>
        {why}
      </p>
    </div>
  );
}

function CurrentVsProposed({ current, proposed }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 8 }}>
      <div>
        <div style={{ ...labelStyle, color: "var(--text-faint)" }}>Current</div>
        <div style={{
          background: "var(--bg-input)",
          border: "1px dashed var(--border-input)",
          borderRadius: 12,
          padding: 16,
          minHeight: 140,
        }}>{current}</div>
      </div>
      <div>
        <div style={{ ...labelStyle, color: "var(--accent)" }}>Proposed</div>
        <div style={{
          background: "var(--bg-input)",
          border: "1px solid var(--accent-border)",
          borderRadius: 12,
          padding: 16,
          minHeight: 140,
          boxShadow: "0 0 24px var(--accent-glow)",
        }}>{proposed}</div>
      </div>
    </div>
  );
}

// Mock of current single-banner affiliate offer for visual comparison
function CurrentSingleBanner() {
  return (
    <a href="#" style={{ display: "block", textDecoration: "none",
      background: "linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 100%)",
      border: "1px solid var(--accent-border)", borderRadius: 12, padding: "14px 16px",
    }}>
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>
        Sponsored · LendingTree
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>Compare Today's Mortgage Rates</div>
      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 3 }}>Get personalized quotes from up to 5 lenders in 3 minutes.</div>
      <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          color: "#0d0f13", padding: "7px 14px", borderRadius: 6, fontWeight: 700, fontSize: 11,
        }}>See My Rates →</span>
        <span style={{ fontSize: 9, color: "var(--text-faint)" }}>Advertiser disclosure</span>
      </div>
    </a>
  );
}

// Mock of current 3-equal-cards calculator result row
function CurrentResultCards() {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {[
        { label: "Monthly Payment", value: "$2,847.32", accent: true },
        { label: "Loan Amount", value: "$320,000" },
        { label: "Total Interest", value: "$345,000" },
      ].map((c, i) => (
        <div key={i} style={{
          background: c.accent ? "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)" : "var(--bg-input)",
          borderRadius: 10, padding: "12px 14px", flex: 1, minWidth: 100,
          border: c.accent ? "none" : "1px solid var(--border-input)",
        }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", color: c.accent ? "rgba(0,0,0,0.55)" : "var(--text-secondary)", marginBottom: 2 }}>{c.label}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: c.accent ? "#0d0f13" : "var(--text-primary)", fontFamily: "'Inter', monospace" }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}

// Mock of current generic gradient state hero
function CurrentStateHero() {
  return (
    <div style={{ padding: "32px 16px", background: "var(--hero-gradient)", borderRadius: 10, textAlign: "center" }}>
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 8 }}>Updated March 14, 2026</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, margin: "0 0 8px", lineHeight: 1.1 }}>
        Best Mortgage Rates in California
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: 12, margin: 0, lineHeight: 1.5 }}>Compare current 30-year, 15-year, and ARM mortgage rates in California.</p>
    </div>
  );
}

// Mock of current "no source" subtle reference
function CurrentNoSource() {
  return (
    <div style={{ padding: 14, fontSize: 11, color: "var(--text-faint)", fontStyle: "italic", textAlign: "center" }}>
      (Currently no visible data sources or editorial review byline)
    </div>
  );
}

// Mock of current generic divider
function CurrentDivider() {
  return (
    <div style={{ padding: "24px 0", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "60%", height: 1, background: "var(--border)" }} />
    </div>
  );
}

// Mock of "no sticky bar" current state
function CurrentNoSticky() {
  return (
    <div style={{ padding: "24px 14px", textAlign: "center", color: "var(--text-faint)", fontSize: 12, fontStyle: "italic" }}>
      (No sticky CTA — affiliate offer scrolls out of view on mobile)
    </div>
  );
}

export default function DesignPreviewPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* Page hero */}
      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--accent)", marginBottom: 16, fontWeight: 700 }}>
          Internal · Design v2 Preview
        </div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, margin: "0 0 14px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          Six proposed visual upgrades
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 620, margin: "0 auto", lineHeight: 1.7 }}>
          Each card shows the current pattern (left, dashed) vs proposed (right, glow). Components live in <code style={{ background: "var(--bg-input)", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>app/components/designv2/</code>.
        </p>
      </section>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* #1 — Lender comparison table */}
        <div style={sectionStyle}>
          <SectionHeader
            num="1"
            title="Lender comparison table (replaces single banner)"
            why="A 3-row stacked comparison reads as editorial content rather than an ad. NerdWallet and Bankrate moved to this format because it converts 2-3× better. Highest revenue impact of the six."
          />
          <CurrentVsProposed
            current={<CurrentSingleBanner />}
            proposed={<LenderComparisonTable />}
          />
        </div>

        {/* #2 — Hero number */}
        <div style={sectionStyle}>
          <SectionHeader
            num="2"
            title="Hero number for calculator results"
            why="One huge primary metric (gold gradient text) with secondary metrics underneath. Replaces the 3-equal-cards row. The big number is screenshot-worthy and gets shared, which spreads the calculator."
          />
          <CurrentVsProposed
            current={<CurrentResultCards />}
            proposed={
              <HeroNumber
                primary="$2,847"
                primarySubtext="Estimated monthly mortgage payment"
                primaryHelper="Principal + Interest"
                trend={{ direction: "down", value: "$32 vs national avg" }}
                secondary={[
                  { label: "Down Payment", value: "$80,000" },
                  { label: "Loan Amount", value: "$320,000" },
                  { label: "Total Interest", value: "$345,000" },
                ]}
              />
            }
          />
        </div>

        {/* #3 — Sticky mobile CTA */}
        <div style={sectionStyle}>
          <SectionHeader
            num="3"
            title="Sticky mobile CTA bar"
            why="Persistent bottom bar that stays visible as users scroll. Standard pattern across finance sites because it lifts mobile affiliate clicks 30-50%. Dismissable so it doesn't annoy."
          />
          <CurrentVsProposed
            current={<CurrentNoSticky />}
            proposed={
              <div style={{ position: "relative", height: 100, overflow: "hidden", borderRadius: 8, background: "var(--bg-main)" }}>
                <div style={{ padding: 12, fontSize: 11, color: "var(--text-faint)", fontStyle: "italic" }}>↓ Pinned to viewport bottom on real pages</div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "var(--bg-card)", borderTop: "1px solid var(--border-card)",
                  boxShadow: "0 -4px 20px rgba(0,0,0,0.12)",
                  padding: "12px 14px", display: "flex", alignItems: "center", gap: 10,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>Compare 5 lenders</div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Sponsored · No credit impact</div>
                  </div>
                  <span style={{ background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                    color: "#0d0f13", padding: "8px 14px", borderRadius: 6, fontWeight: 700, fontSize: 12 }}>See My Rate →</span>
                  <span style={{ color: "var(--text-faint)", fontSize: 16, padding: "0 4px" }}>×</span>
                </div>
              </div>
            }
          />
          <div style={{ marginTop: 14, padding: "10px 14px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 8, fontSize: 12, color: "var(--text-secondary)" }}>
            ↓ Live version pinned to bottom of <em>this</em> page — scroll down to see it appear after 600px.
          </div>
        </div>

        {/* #4 — State hero badge */}
        <div style={sectionStyle}>
          <SectionHeader
            num="4"
            title="State hero with abbreviation watermark + live stat tile"
            why="Replaces the generic gold gradient on state pages. Two-letter state code in massive Playfair behind the headline + a 'live' rate pill comparing today's rate to the 30-day national average. Makes pages feel state-aware, not templated."
          />
          <CurrentVsProposed
            current={<CurrentStateHero />}
            proposed={
              <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--border)" }}>
                <StateHeroBadge
                  stateCode="CA"
                  stateName="California"
                  title="Best Mortgage Rates"
                  metric={{ label: "30yr fixed", value: "6.875%" }}
                  trend={{ vsAvg: "−0.12%", direction: "down", since: "this week" }}
                  updated="March 14, 2026"
                />
              </div>
            }
          />
        </div>

        {/* #5 — Data source byline */}
        <div style={sectionStyle}>
          <SectionHeader
            num="5"
            title="Data source byline + methodology"
            why="Visible attribution of primary sources (Federal Reserve H.15, BLS OEWS, ClosingCorp, IRS Rev. Proc.) at the foot of every commercial page. Google's helpful content guidelines explicitly reward visible primary-source citation. 30-min build, lifts E-E-A-T sitewide."
          />
          <CurrentVsProposed
            current={<CurrentNoSource />}
            proposed={
              <DataSourceByline
                sources={["fred", "bls", "closingcorp"]}
                methodology="National 30-year fixed mortgage rate is sourced from the Federal Reserve's H.15 statistical release. State-level closing cost averages reflect ClosingCorp's 2024 nationwide refinance survey. State property tax rates derived from the most recent state Department of Revenue filings."
                lastReviewed="March 14, 2026"
              />
            }
          />
        </div>

        {/* #6 — Pulse divider */}
        <div style={sectionStyle}>
          <SectionHeader
            num="6"
            title="Pulse-line section divider (brand identity)"
            why="Animated SVG heartbeat in brand gold as section dividers. Pulsafi → Pulse. Hard to copy, easy to remember, shows up in shared screenshots. Tiny detail that makes the site feel like a product, not content."
          />
          <CurrentVsProposed
            current={<CurrentDivider />}
            proposed={<PulseDivider />}
          />
          <div style={{ marginTop: 16, padding: "16px 18px", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600, marginBottom: 8 }}>In context — between sections</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", padding: "12px 0" }}>Section A: <em>Sample monthly payment in California</em></div>
            <PulseDivider />
            <div style={{ fontSize: 13, color: "var(--text-secondary)", padding: "12px 0" }}>Section B: <em>15-year vs 30-year comparison</em></div>
          </div>
        </div>

        {/* Summary */}
        <div style={{ ...sectionStyle, background: "linear-gradient(135deg, var(--accent-bg), var(--bg-card))", border: "1px solid var(--accent-border)" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 12px" }}>
            Recommended rollout order
          </h2>
          <ol style={{ margin: 0, paddingLeft: 20, color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.85 }}>
            <li><strong style={{ color: "var(--text-primary)" }}>#1 Lender comparison table</strong> — biggest revenue lever. Drop into best-mortgage-rates, refinance, heloc, first-time-homebuyer pages.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>#3 Sticky mobile CTA</strong> — fastest mobile conversion lift, smallest scope.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>#2 Hero number</strong> — drop into all 16 calculator tools and state pages with primary metrics.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>#5 Data source byline</strong> — sitewide E-E-A-T win, low-risk, helps with the next Google update.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>#4 State hero badge</strong> — applies to ~250 state-specific pages.</li>
            <li><strong style={{ color: "var(--text-primary)" }}>#6 Pulse divider</strong> — brand identity polish; nice-to-have, ship when others are stable.</li>
          </ol>
        </div>

      </main>

      {/* Live sticky CTA demo */}
      <StickyMobileCTA
        label="Compare 5 mortgage lenders"
        cta="See My Rate"
      />

      <Footer />
    </div>
  );
}

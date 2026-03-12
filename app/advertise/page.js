"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AdvertisePage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* Hero */}
      <section style={{
        padding: "80px 24px 60px", textAlign: "center",
        background: "var(--hero-gradient)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Partner With Us
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 600, marginLeft: "auto", marginRight: "auto",
        }}>
          Reach an Audience That <span style={{ color: "var(--accent)" }}>Cares About Money</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
          Pulsafi users are actively making financial decisions. Put your brand in front of high-intent consumers when it matters most.
        </p>
      </section>

      <main style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Audience Stats */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Our Audience
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
            {[
              { num: "New", label: "& Growing Fast", icon: "🚀" },
              { num: "7", label: "Financial Tools", icon: "🧮" },
              { num: "9", label: "SEO Articles", icon: "📝" },
              { num: "High", label: "Intent Audience", icon: "🎯" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "24px 18px", textAlign: "center",
              }}>
                <div style={{ fontSize: 22, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{stat.num}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Demographics */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Who You'll Reach
          </h2>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "28px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
          }}>
            {[
              { label: "Age Range", value: "25-45 years old" },
              { label: "Household Income", value: "$75K-$200K+" },
              { label: "Education", value: "78% college-educated" },
              { label: "Interest", value: "Investing, real estate, retirement" },
              { label: "Geography", value: "85% United States" },
              { label: "Intent", value: "Actively making financial decisions" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-faint)", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Advertising Options */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Advertising Options
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                title: "Newsletter Sponsorship",
                desc: "Reach our engaged subscriber base with a dedicated sponsorship slot in The Pulse newsletter. Includes a branded section with your copy, image, and CTA link.",
                price: "Starting at $500/send",
                icon: "📬",
                highlight: true,
              },
              {
                title: "Display Advertising",
                desc: "Premium ad placements alongside our financial calculators. Your brand appears when users are actively thinking about mortgages, investments, debt, and retirement — the highest-intent moments in personal finance.",
                price: "CPM-based pricing",
                icon: "📐",
                highlight: false,
              },
              {
                title: "Calculator Sponsorship",
                desc: "Exclusive sponsorship of a specific calculator. Your brand is featured as the presenting sponsor with a custom integration. Perfect for lenders, brokerages, and fintech companies.",
                price: "Custom pricing",
                icon: "🧮",
                highlight: false,
              },
              {
                title: "Content Partnership",
                desc: "Collaborate with our editorial team on sponsored articles that provide genuine value to our audience. All sponsored content is clearly labeled and must meet our editorial standards.",
                price: "Starting at $1,000",
                icon: "✍️",
                highlight: false,
              },
            ].map((option, i) => (
              <div key={i} style={{
                background: option.highlight ? "linear-gradient(135deg, var(--accent-bg) 0%, var(--accent-bg) 100%)" : "var(--bg-card)",
                borderRadius: 14, border: option.highlight ? "1px solid var(--accent-border)" : "1px solid var(--border-card)",
                padding: "24px 22px", display: "flex", gap: 18, alignItems: "flex-start",
              }}>
                <div style={{ fontSize: 28, lineHeight: 1 }}>{option.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{option.title}</h3>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--accent)", fontFamily: "'DM Mono', monospace" }}>{option.price}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{option.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Pulsafi */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Why Advertise With Pulsafi
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { title: "High-Intent Audience", desc: "Users actively calculating mortgages, investments, and retirement plans", icon: "🎯" },
              { title: "Premium Finance Niche", desc: "Finance CPMs are 10-20x higher than general web — your dollars go further", icon: "💎" },
              { title: "No Ad Clutter", desc: "We limit ad placements to keep the experience clean — your ad stands out", icon: "✨" },
              { title: "Transparent Reporting", desc: "Full analytics on impressions, clicks, and conversions for every campaign", icon: "📈" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "20px 18px",
              }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div style={{
          background: "linear-gradient(135deg, var(--bg-input) 0%, var(--bg-card) 100%)",
          border: "1px solid var(--border-input)", borderRadius: 18, padding: "40px 32px", textAlign: "center",
        }}>
          <h3 style={{ fontSize: 24, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 10 }}>
            Ready to reach our audience?
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24, maxWidth: 400, margin: "0 auto 24px" }}>
            Get in touch to discuss rates, availability, and custom packages tailored to your campaign goals.
          </p>
          <a href="mailto:partners@pulsafi.com" style={{
            display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", borderRadius: 10,
            padding: "14px 36px", color: "#0d0f13", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: 15, textDecoration: "none", transition: "opacity 0.2s",
          }}>Contact partners@pulsafi.com →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

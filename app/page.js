"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Header />

      {/* Hero */}
      <section style={{
        padding: "80px 24px 60px", textAlign: "center",
        background: "var(--hero-gradient)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          About Pulsafi
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 600, marginLeft: "auto", marginRight: "auto",
        }}>
          Financial Clarity for <span style={{ color: "var(--accent)" }}>Everyone</span>
        </h1>
      </section>

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* Mission */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85 }}>
            <p style={{ marginBottom: 20 }}>
              Most financial tools are built for financial advisors. Pulsafi is built for everyone else.
            </p>
            <p style={{ marginBottom: 20 }}>
              We started Pulsafi because we were tired of two things: financial calculators that looked like they were built in 2005, and financial advice that felt like it was written for people who already had money. We wanted to build something different — tools that are beautiful, fast, and genuinely useful for people making real financial decisions.
            </p>
            <p style={{ marginBottom: 20 }}>
              Whether you're figuring out how much house you can afford, wondering when you can retire, or trying to dig out of debt, Pulsafi gives you the numbers that matter — without the jargon, the sales pitch, or the paywall.
            </p>
          </div>
        </section>

        {/* Values */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 24, letterSpacing: "-0.01em" }}>
            What We Believe
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              {
                title: "Free means free",
                desc: "Every calculator, every article, every newsletter — completely free. We make money through advertising and affiliate partnerships, never by charging you.",
                icon: "🔓",
              },
              {
                title: "Accuracy over hype",
                desc: "We don't promise you'll be a millionaire by next Tuesday. Our calculators use real math and our content is grounded in evidence, not get-rich-quick fantasies.",
                icon: "🎯",
              },
              {
                title: "Clarity over complexity",
                desc: "Finance is already confusing enough. We strip away the jargon and give you clear, actionable information you can actually use.",
                icon: "💡",
              },
              {
                title: "Your data is yours",
                desc: "Our calculators run entirely in your browser. We don't store your financial inputs, sell your data, or track your calculations.",
                icon: "🔒",
              },
            ].map((value, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "24px 22px",
                display: "flex", gap: 18, alignItems: "flex-start",
              }}>
                <div style={{ fontSize: 24, lineHeight: 1 }}>{value.icon}</div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>{value.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Numbers */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 24, letterSpacing: "-0.01em" }}>
            Pulsafi by the Numbers
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            {[
              { num: "50K+", label: "Monthly Users", color: "var(--accent)" },
              { num: "6", label: "Free Calculators", color: "#3498db" },
              { num: "12K+", label: "Newsletter Subscribers", color: "#2ecc71" },
              { num: "1M+", label: "Calculations Run", color: "#e67e22" },
            ].map((stat, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "24px 18px", textAlign: "center",
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: stat.color, fontFamily: "'DM Mono', monospace" }}>{stat.num}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 6 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* How We Make Money - Transparency */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
            How We Make Money
          </h2>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "24px 22px",
            fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75,
          }}>
            <p style={{ marginBottom: 14 }}>
              Transparency matters. Here's exactly how Pulsafi stays free:
            </p>
            <p style={{ marginBottom: 14 }}>
              <strong style={{ color: "var(--text-primary)" }}>Advertising.</strong> We display tasteful, relevant ads from financial services companies. We never show pop-ups, auto-play video ads, or anything that disrupts your experience.
            </p>
            <p style={{ marginBottom: 14 }}>
              <strong style={{ color: "var(--text-primary)" }}>Affiliate partnerships.</strong> When we recommend a financial product (like a brokerage or lender), we may earn a commission if you sign up. We only recommend products we'd actually use ourselves, and our calculators are never influenced by these partnerships.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--text-primary)" }}>Newsletter sponsorships.</strong> Brands occasionally sponsor our weekly newsletter. Sponsored content is always clearly labeled.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
            Get in Touch
          </h2>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)", padding: "24px 22px",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { label: "General inquiries", value: "hello@pulsafi.com", icon: "✉️" },
                { label: "Advertising & partnerships", value: "partners@pulsafi.com", icon: "🤝" },
                { label: "Press", value: "press@pulsafi.com", icon: "📰" },
                { label: "Bug reports & feedback", value: "support@pulsafi.com", icon: "🐛" },
              ].map((contact, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 18 }}>{contact.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 2 }}>{contact.label}</div>
                    <div style={{ fontSize: 14, color: "var(--accent)", fontWeight: 500 }}>{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <h3 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 12 }}>
            Ready to take control of your finances?
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>Start with our free calculators — no signup required.</p>
          <a href="/" style={{
            display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", borderRadius: 10,
            padding: "14px 36px", color: "var(--bg-main)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: 15, textDecoration: "none",
          }}>Explore Tools →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

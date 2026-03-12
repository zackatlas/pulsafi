"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 12, fontWeight: 600 }}>Legal</div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          Privacy Policy
        </h1>
        <p style={{ color: "var(--text-faint)", fontSize: 13, marginBottom: 40 }}>Last updated: February 25, 2026</p>

        <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85 }}>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Overview</h2>
          <p style={{ marginBottom: 20 }}>
            Pulsafi is committed to protecting your privacy. This policy explains what information we collect, how we use it, and what choices you have. The short version: we collect very little, we never sell your data, and your financial calculations stay in your browser.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Information We Collect</h2>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "24px 0 8px" }}>Calculator Data</h3>
          <p style={{ marginBottom: 20 }}>
            All calculations run entirely in your browser. We do not transmit, store, or have access to any numbers you enter into our calculators. Your mortgage amount, salary, debt balances, and other financial inputs never leave your device.
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "24px 0 8px" }}>Analytics Data</h3>
          <p style={{ marginBottom: 20 }}>
            We use privacy-focused analytics to understand how visitors use our site. This includes aggregate data like page views, general geographic region, device type, and referral source. We do not track individual users across sessions or build personal profiles.
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", margin: "24px 0 8px" }}>Email Addresses</h3>
          <p style={{ marginBottom: 20 }}>
            If you subscribe to The Pulse newsletter, we collect your email address. Your email is stored securely with our newsletter provider (Beehiiv) and is used solely to deliver our newsletter. You can unsubscribe at any time with one click.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>How We Use Your Information</h2>
          <p style={{ marginBottom: 20 }}>
            We use analytics data to improve our tools, understand which calculators are most useful, and make content decisions. We use email addresses to send our weekly newsletter. That's it. We do not sell, rent, or share your personal information with third parties for their marketing purposes.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Cookies and Tracking</h2>
          <p style={{ marginBottom: 20 }}>
            We use essential cookies to remember your preferences (like dark/light mode). If we display advertising, our ad partners may use cookies to serve relevant ads. You can control cookie preferences in your browser settings.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Third-Party Services</h2>
          <p style={{ marginBottom: 20 }}>
            We use the following third-party services that may process data on our behalf: Vercel (hosting), Beehiiv (newsletter delivery), and Google Analytics (site analytics). Each of these services has their own privacy policy governing their use of data.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Affiliate Links</h2>
          <p style={{ marginBottom: 20 }}>
            Some links on Pulsafi are affiliate links. When you click an affiliate link and make a purchase or sign up for a service, we may earn a commission. Affiliate partners may use cookies to track referrals. This does not affect the price you pay or the recommendations we make.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Your Rights</h2>
          <p style={{ marginBottom: 20 }}>
            You have the right to access, correct, or delete any personal information we hold about you. For newsletter subscribers, you can unsubscribe at any time. For any privacy-related requests, contact us at hello@pulsafi.com.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Changes to This Policy</h2>
          <p style={{ marginBottom: 20 }}>
            We may update this privacy policy from time to time. We'll notify newsletter subscribers of any significant changes. The latest version will always be available on this page.
          </p>

          <div style={{
            marginTop: 40, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "20px 22px", fontSize: 14,
          }}>
            <strong style={{ color: "var(--text-primary)" }}>Questions?</strong>
            <span style={{ color: "var(--text-muted)" }}> Reach out at </span>
            <span style={{ color: "var(--accent)" }}>hello@pulsafi.com</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

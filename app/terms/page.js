"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 12, fontWeight: 600 }}>Legal</div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          Terms of Service
        </h1>
        <p style={{ color: "var(--text-faint)", fontSize: 13, marginBottom: 40 }}>Last updated: February 25, 2026</p>

        <div style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.85 }}>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Acceptance of Terms</h2>
          <p style={{ marginBottom: 20 }}>
            By accessing and using Pulsafi ("the Site"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our site.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Description of Service</h2>
          <p style={{ marginBottom: 20 }}>
            Pulsafi provides free financial calculators, educational articles, and a newsletter. Our tools are designed to help you make informed financial decisions. All calculators and content are provided free of charge.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Not Financial Advice</h2>
          <div style={{
            background: "var(--bg-card)", borderLeft: "3px solid var(--accent)", borderRadius: "0 12px 12px 0",
            padding: "20px 24px", margin: "20px 0 28px", fontSize: 14,
          }}>
            <strong style={{ color: "var(--accent)" }}>Important:</strong>
            <span style={{ color: "var(--text-secondary)" }}> Pulsafi is an educational resource, not a financial advisor. Our calculators provide estimates based on the inputs you provide and standard financial formulas. Results should not be considered financial, tax, legal, or investment advice. Always consult with a qualified financial professional before making major financial decisions.</span>
          </div>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Calculator Accuracy</h2>
          <p style={{ marginBottom: 20 }}>
            Our calculators use standard financial formulas and are designed to provide reasonable estimates. However, actual financial outcomes depend on many variables that our calculators may not account for, including tax law changes, market fluctuations, fees, and individual circumstances. We make no guarantees about the accuracy or completeness of calculator results.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Affiliate Relationships</h2>
          <p style={{ marginBottom: 20 }}>
            Pulsafi participates in affiliate programs. Some links on our site are affiliate links, meaning we may earn a commission if you click through and make a purchase or sign up for a service. This does not affect the price you pay. Our editorial content and calculator results are never influenced by affiliate relationships.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Intellectual Property</h2>
          <p style={{ marginBottom: 20 }}>
            All content on Pulsafi — including articles, calculator designs, graphics, and code — is the property of Pulsafi and is protected by copyright law. You may share links to our content but may not reproduce, distribute, or create derivative works without written permission.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>User Conduct</h2>
          <p style={{ marginBottom: 20 }}>
            You agree not to misuse our services. This includes attempting to interfere with the site's functionality, scraping content without permission, or using our tools for any unlawful purpose.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Limitation of Liability</h2>
          <p style={{ marginBottom: 20 }}>
            Pulsafi is provided "as is" without warranties of any kind, either express or implied. We are not liable for any damages arising from your use of our calculators, reliance on our content, or inability to access our services. Your use of Pulsafi is at your own risk.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Newsletter Terms</h2>
          <p style={{ marginBottom: 20 }}>
            By subscribing to The Pulse newsletter, you agree to receive periodic emails from Pulsafi. You can unsubscribe at any time by clicking the unsubscribe link in any email. We will never share your email address with third parties for their marketing purposes.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Changes to Terms</h2>
          <p style={{ marginBottom: 20 }}>
            We reserve the right to modify these terms at any time. Continued use of Pulsafi after changes constitutes acceptance of the updated terms. We encourage you to review this page periodically.
          </p>

          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-primary)", margin: "36px 0 12px" }}>Governing Law</h2>
          <p style={{ marginBottom: 20 }}>
            These terms are governed by the laws of the State of California, United States. Any disputes arising from these terms or your use of Pulsafi shall be resolved in the courts of California.
          </p>

          <div style={{
            marginTop: 40, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "20px 22px", fontSize: 14,
          }}>
            <strong style={{ color: "var(--text-primary)" }}>Questions about these terms?</strong>
            <span style={{ color: "var(--text-muted)" }}> Contact us at </span>
            <span style={{ color: "var(--accent)" }}>hello@pulsafi.com</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

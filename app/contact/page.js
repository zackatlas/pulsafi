"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "general", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    { value: "general", label: "General Inquiry" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
    { value: "partnership", label: "Partnership Inquiry" },
    { value: "press", label: "Press / Media" },
  ];

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      const mailtoSubject = encodeURIComponent(`[Pulsafi ${subjects.find(s => s.value === formData.subject)?.label}] from ${formData.name}`);
      const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${subjects.find(s => s.value === formData.subject)?.label}\n\n${formData.message}`);
      window.open(`mailto:hello@pulsafi.com?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
      setSubmitted(true);
    }
  };

  const inputStyle = {
    width: "100%", background: "var(--bg-input)", border: "1px solid var(--border-input)", borderRadius: 10,
    padding: "12px 16px", color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
    outline: "none", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <main style={{ maxWidth: 680, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", marginBottom: 12, fontWeight: 600 }}>Get in Touch</div>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
          Contact Us
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, marginBottom: 40, lineHeight: 1.7 }}>
          Have a question, found a bug, or want to work together? We'd love to hear from you.
        </p>

        {/* Direct Email Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 40 }}>
          {[
            { icon: "✉️", label: "General", email: "hello@pulsafi.com" },
            { icon: "🤝", label: "Partnerships", email: "partners@pulsafi.com" },
            { icon: "📰", label: "Press", email: "press@pulsafi.com" },
            { icon: "🐛", label: "Support", email: "support@pulsafi.com" },
          ].map((item, i) => (
            <a key={i} href={`mailto:${item.email}`} style={{
              background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
              padding: "20px 18px", textDecoration: "none", textAlign: "center", transition: "border-color 0.2s",
            }}
              onMouseOver={e => e.currentTarget.style.borderColor = "var(--accent-border)"}
              onMouseOut={e => e.currentTarget.style.borderColor = "var(--border-card)"}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: "var(--accent)" }}>{item.email}</div>
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div style={{
          background: "var(--bg-card)", borderRadius: 18, border: "1px solid var(--border-card)",
          padding: "32px 28px",
        }}>
          <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 24 }}>
            Send a Message
          </h2>

          {!submitted ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Name</label>
                  <input
                    type="text" placeholder="Your name" value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Email</label>
                  <input
                    type="email" placeholder="you@email.com" value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Subject</label>
                <select
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  style={{ ...inputStyle, cursor: "pointer", appearance: "auto" }}
                >
                  {subjects.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6, display: "block" }}>Message</label>
                <textarea
                  placeholder="Tell us what's on your mind..." value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                />
              </div>

              <button onClick={handleSubmit} style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                border: "none", borderRadius: 10, padding: "14px 32px", color: "#0d0f13",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15,
                cursor: "pointer", alignSelf: "flex-start", transition: "opacity 0.2s",
              }}
                onMouseOver={e => e.currentTarget.style.opacity = "0.9"}
                onMouseOut={e => e.currentTarget.style.opacity = "1"}
              >
                Send Message →
              </button>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✉️</div>
              <h3 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14 }}>Your email client should have opened with the message. We'll get back to you soon.</p>
              <button onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "general", message: "" }); }} style={{
                marginTop: 20, background: "transparent", border: "1px solid var(--border-input)",
                borderRadius: 8, padding: "10px 20px", color: "var(--text-secondary)",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer",
              }}>Send Another Message</button>
            </div>
          )}
        </div>

        {/* Response Time */}
        <div style={{
          marginTop: 24, background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
          padding: "20px 22px", display: "flex", alignItems: "center", gap: 14,
        }}>
          <span style={{ fontSize: 20 }}>⚡</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>Typical response time: 24-48 hours</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>We read every message and respond to all partnership and press inquiries.</div>
          </div>
        </div>

        {/* Helpful Links */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: 16, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, color: "var(--text-primary)" }}>
            Other Ways We Can Help
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
            <a href="/" style={{
              background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
              padding: "20px 18px", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>🧮</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Calculators</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Try our free financial tools</div>
            </a>

            <a href="/embed" style={{
              background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
              padding: "20px 18px", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>📌</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Embed Widgets</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Add calculators to your site</div>
            </a>

            <a href="/resources" style={{
              background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
              padding: "20px 18px", textDecoration: "none", transition: "all 0.2s",
            }}
              onMouseOver={e => { e.currentTarget.style.borderColor = "var(--accent-border)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = "var(--border-card)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 20, marginBottom: 8 }}>📚</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Resources</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Articles & newsletter</div>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

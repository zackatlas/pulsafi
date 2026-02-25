"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ArticleLayout({ title, category, date, readTime, children }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0d0f13", color: "#e8e9eb", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Header />

      <article style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px 60px" }}>

        {/* Article Header */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{
              fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em",
              color: "#c9a227", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              background: "rgba(201,162,39,0.1)", padding: "4px 10px", borderRadius: 6,
            }}>{category}</span>
            <span style={{ fontSize: 12, color: "#4a4f58" }}>{readTime}</span>
            <span style={{ fontSize: 12, color: "#4a4f58" }}>·</span>
            <span style={{ fontSize: 12, color: "#4a4f58" }}>{date}</span>
          </div>
          <h1 style={{
            fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "'Playfair Display', serif",
            fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.02em", margin: 0,
          }}>{title}</h1>
        </div>

        {/* Article Body */}
        <div style={{
          fontSize: 16, lineHeight: 1.85, color: "#b8bcc4",
        }}>
          <style>{`
            .article-body h2 {
              font-family: 'Playfair Display', serif;
              font-size: 24px;
              font-weight: 700;
              color: #e8e9eb;
              margin: 40px 0 16px;
              letter-spacing: -0.01em;
            }
            .article-body h3 {
              font-family: 'DM Sans', sans-serif;
              font-size: 18px;
              font-weight: 700;
              color: #e8e9eb;
              margin: 32px 0 12px;
            }
            .article-body p {
              margin: 0 0 20px;
            }
            .article-body strong {
              color: #e8e9eb;
              font-weight: 600;
            }
            .article-body .callout {
              background: #14161c;
              border-left: 3px solid #c9a227;
              border-radius: 0 12px 12px 0;
              padding: 20px 24px;
              margin: 28px 0;
              font-size: 15px;
            }
            .article-body .callout strong {
              color: #c9a227;
            }
            .article-body .data-point {
              background: linear-gradient(135deg, rgba(201,162,39,0.08), rgba(201,162,39,0.03));
              border: 1px solid rgba(201,162,39,0.2);
              border-radius: 14px;
              padding: 24px;
              margin: 28px 0;
              text-align: center;
            }
            .article-body .data-point .number {
              font-family: 'DM Mono', monospace;
              font-size: 36px;
              font-weight: 700;
              color: #c9a227;
              margin-bottom: 6px;
            }
            .article-body .data-point .label {
              font-size: 13px;
              color: #8a8f98;
            }
            .article-body .tool-link {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              background: rgba(201,162,39,0.1);
              border: 1px solid rgba(201,162,39,0.25);
              border-radius: 8px;
              padding: 8px 14px;
              color: #c9a227;
              text-decoration: none;
              font-size: 14px;
              font-weight: 600;
              margin: 8px 0;
              transition: background 0.2s;
            }
            .article-body .tool-link:hover {
              background: rgba(201,162,39,0.18);
            }
          `}</style>
          <div className="article-body">
            {children}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div style={{
          marginTop: 48, background: "linear-gradient(135deg, #1a1d24 0%, #14161c 100%)",
          border: "1px solid #2a2d35", borderRadius: 18, padding: "32px 28px", textAlign: "center",
        }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#c9a227", marginBottom: 8 }}>The Pulse Newsletter</div>
          <h3 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 8px", color: "#e8e9eb" }}>
            Enjoyed this article?
          </h3>
          <p style={{ color: "#6a6f78", fontSize: 14, margin: "0 0 20px" }}>Get articles like this delivered every Sunday. Free forever.</p>
          {!submitted ? (
            <div style={{ display: "flex", gap: 10, maxWidth: 400, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email" placeholder="your@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: 1, minWidth: 200, background: "#0d0f13", border: "1px solid #2a2d35", borderRadius: 10,
                  padding: "12px 16px", color: "#e8e9eb", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none",
                }}
              />
              <button onClick={() => { if (email) { window.open(`https://magic.beehiiv.com/v1/af6bb24a-372c-43f4-af26-f7968d10bc1e?email=${encodeURIComponent(email)}`, '_blank'); setSubmitted(true); }}} style={{
                background: "linear-gradient(135deg, #c9a227, #a37e1b)", border: "none", borderRadius: 10,
                padding: "12px 28px", color: "#0d0f13", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
                fontSize: 14, cursor: "pointer",
              }}>Subscribe</button>
            </div>
          ) : (
            <div style={{ color: "#c9a227", fontSize: 16, fontWeight: 600 }}>✓ You're in! Check your inbox.</div>
          )}
        </div>

        {/* Back to Learn */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a href="/learn" style={{ color: "#8a8f98", textDecoration: "none", fontSize: 14 }}>← Back to all articles</a>
        </div>
      </article>

      <Footer />
    </div>
  );
}

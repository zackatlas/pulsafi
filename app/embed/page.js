"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TOOLS = [
  { id: "compound", name: "Compound Interest", icon: "📈" },
  { id: "mortgage", name: "Mortgage Calculator", icon: "🏠" },
  { id: "fire", name: "FIRE Calculator", icon: "🔥" },
  { id: "debt", name: "Debt Payoff", icon: "💳" },
  { id: "salary", name: "Salary Breakdown", icon: "💰" },
  { id: "invest", name: "Investment Comparison", icon: "📊" },
  { id: "crypto", name: "Crypto Planner", icon: "₿" },
];

export default function EmbedPage() {
  const [selectedTool, setSelectedTool] = useState("mortgage");
  const [theme, setTheme] = useState("dark");
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="https://pulsafi.com/widget?tool=${selectedTool}&theme=${theme}" width="100%" height="520" frameborder="0" style="border:none;border-radius:16px;max-width:600px;" title="Pulsafi ${TOOLS.find(t => t.id === selectedTool)?.name}"></iframe>
<script>window.addEventListener("message",function(e){if(e.data&&e.data.type==="pulsafi-resize"){var f=document.querySelector('iframe[src*="pulsafi.com/widget"]');if(f)f.style.height=e.data.height+"px";}});</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      {/* Hero */}
      <section style={{
        padding: "80px 24px 60px", textAlign: "center",
        background: "var(--hero-gradient)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          Free Embeddable Widgets
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: 650, marginLeft: "auto", marginRight: "auto",
        }}>
          Add Financial Tools to <span style={{ color: "var(--accent)" }}>Your Website</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Embed professional financial calculators on your site with one line of code. Free for everyone — banks, blogs, businesses, and developers.
        </p>
      </section>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* How It Works */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {[
              { step: "1", title: "Choose a calculator", desc: "Pick from 7 professional financial tools", icon: "🧮" },
              { step: "2", title: "Copy the embed code", desc: "One snippet — works on any website", icon: "📋" },
              { step: "3", title: "Paste and publish", desc: "Your visitors get a world-class tool", icon: "🚀" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "24px 20px", textAlign: "center",
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: 600, marginBottom: 6 }}>Step {item.step}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Widget Builder */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Widget Builder
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20 }}>
            {/* Controls */}
            <div>
              {/* Tool Selector */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 10 }}>Select Calculator</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {TOOLS.map(tool => (
                    <button key={tool.id} onClick={() => setSelectedTool(tool.id)} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                      background: selectedTool === tool.id ? "var(--accent-bg)" : "var(--bg-card)",
                      border: selectedTool === tool.id ? "1px solid var(--accent-border)" : "1px solid var(--border-card)",
                      borderRadius: 10, cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      <span style={{ fontSize: 18 }}>{tool.icon}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: selectedTool === tool.id ? "var(--accent)" : "var(--text-primary)" }}>{tool.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 10 }}>Theme</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[
                    { id: "dark", label: "Dark", icon: "🌙" },
                    { id: "light", label: "Light", icon: "☀️" },
                  ].map(t => (
                    <button key={t.id} onClick={() => setTheme(t.id)} style={{
                      flex: 1, padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                      background: theme === t.id ? "var(--accent-bg)" : "var(--bg-card)",
                      border: theme === t.id ? "1px solid var(--accent-border)" : "1px solid var(--border-card)",
                      color: theme === t.id ? "var(--accent)" : "var(--text-secondary)",
                      fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, textAlign: "center",
                    }}>{t.icon} {t.label}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)", marginBottom: 10 }}>Live Preview</div>
              <div style={{
                background: theme === "dark" ? "#0d0f13" : "#f7f6f3",
                borderRadius: 16, border: "1px solid var(--border-card)", overflow: "hidden", minHeight: 400,
              }}>
                <iframe
                  key={`${selectedTool}-${theme}`}
                  src={`/widget?tool=${selectedTool}&theme=${theme}`}
                  style={{ width: "100%", height: 520, border: "none" }}
                  title="Widget Preview"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Embed Code */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
            Your Embed Code
          </h2>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "20px 22px", position: "relative",
          }}>
            <pre style={{
              fontSize: 12, color: "var(--text-secondary)", fontFamily: "'Inter', monospace",
              whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6, margin: 0,
            }}>{embedCode}</pre>
            <button onClick={handleCopy} style={{
              position: "absolute", top: 16, right: 16,
              background: copied ? "#2ecc71" : "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              border: "none", borderRadius: 8, padding: "8px 18px",
              color: copied ? "#fff" : "#0d0f13", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: 12, cursor: "pointer", transition: "all 0.2s",
            }}>{copied ? "✓ Copied!" : "Copy Code"}</button>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 12, lineHeight: 1.6 }}>
            Paste this code anywhere in your HTML. The widget auto-resizes to fit its content. Works with WordPress, Squarespace, Wix, Webflow, and any other platform that supports custom HTML.
          </p>
        </section>

        {/* Backlink Attribution */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 16, letterSpacing: "-0.01em" }}>
            Backlink Attribution
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.6 }}>
            When embedding, please include a link back to Pulsafi:
          </p>
          <div style={{
            background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
            padding: "20px 22px", position: "relative",
          }}>
            <pre style={{
              fontSize: 12, color: "var(--text-secondary)", fontFamily: "'Inter', monospace",
              whiteSpace: "pre-wrap", wordBreak: "break-all", lineHeight: 1.6, margin: 0,
            }}>{'<p style="font-size:12px;text-align:center;margin-top:8px;">Powered by <a href="https://pulsafi.com" target="_blank" rel="noopener">Pulsafi</a> — Free Financial Tools</p>'}</pre>
            <button onClick={() => {
              navigator.clipboard.writeText('<p style="font-size:12px;text-align:center;margin-top:8px;">Powered by <a href="https://pulsafi.com" target="_blank" rel="noopener">Pulsafi</a> — Free Financial Tools</p>');
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }} style={{
              position: "absolute", top: 16, right: 16,
              background: copied ? "#2ecc71" : "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              border: "none", borderRadius: 8, padding: "8px 18px",
              color: copied ? "#fff" : "#0d0f13", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
              fontSize: 12, cursor: "pointer", transition: "all 0.2s",
            }}>{copied ? "✓ Copied!" : "Copy Attribution"}</button>
          </div>
        </section>

        {/* Pricing Tiers */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Plans
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {/* Free Tier */}
            <div style={{
              background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
              padding: "28px 24px",
            }}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: 6 }}>Free</div>
              <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--text-primary)", marginBottom: 4 }}>$0</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>forever</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "All 7 financial calculators",
                  "Dark & light themes",
                  "Auto-resizing iframe",
                  "Mobile responsive",
                  "\"Powered by Pulsafi\" badge",
                  "Unlimited page views",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--text-secondary)" }}>
                    <span style={{ color: "#2ecc71" }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button onClick={handleCopy} style={{
                width: "100%", marginTop: 24, background: "var(--bg-input)", border: "1px solid var(--border-input)",
                borderRadius: 10, padding: "12px", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: 14, cursor: "pointer",
              }}>Copy Embed Code</button>
            </div>

            {/* Premium Tier */}
            <div style={{
              background: "linear-gradient(135deg, var(--accent-bg) 0%, var(--accent-bg) 100%)",
              borderRadius: 16, border: "1px solid var(--accent-border)", padding: "28px 24px", position: "relative",
            }}>
              <div style={{
                position: "absolute", top: -10, right: 16, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                borderRadius: 20, padding: "4px 12px", fontSize: 10, fontWeight: 700, color: "#0d0f13",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>Coming Soon</div>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", marginBottom: 6 }}>Premium</div>
              <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'Inter', monospace", color: "var(--text-primary)", marginBottom: 4 }}>Custom</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>pricing based on usage</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Everything in Free",
                  "Remove Pulsafi branding",
                  "Custom colors & styling",
                  "Your logo on the widget",
                  "Priority support",
                  "Analytics dashboard",
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--text-secondary)" }}>
                    <span style={{ color: "var(--accent)" }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <a href="mailto:partners@pulsafi.com" style={{
                display: "block", width: "100%", marginTop: 24, background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                border: "none", borderRadius: 10, padding: "12px", color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", textDecoration: "none",
                boxSizing: "border-box",
              }}>Contact Us →</a>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Who Uses Pulsafi Widgets?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { title: "Community Banks & Credit Unions", desc: "Give your customers modern financial tools without building them from scratch. Mortgage and savings calculators drive engagement.", icon: "🏦" },
              { title: "Finance Bloggers", desc: "Embed interactive calculators in your articles. Readers engage longer and come back more often.", icon: "✍️" },
              { title: "Real Estate Agents", desc: "Add mortgage calculators to your listings. Help buyers understand what they can afford.", icon: "🏡" },
              { title: "Financial Advisors", desc: "Offer self-service tools on your website. Prospects can explore scenarios before booking a consultation.", icon: "📋" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "20px 18px",
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontFamily: "'Playfair Display', serif", fontWeight: 700, marginBottom: 20, letterSpacing: "-0.01em" }}>
            Common Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { q: "Is it really free?", a: "Yes. The free plan includes all 7 calculators with no usage limits. We show a small \"Powered by Pulsafi\" badge which links back to our site. That's how we grow." },
              { q: "Will it slow down my website?", a: "No. The widget loads in an iframe, which means it doesn't affect your page's load time or performance. It loads asynchronously after your page is ready." },
              { q: "Does it work on mobile?", a: "Absolutely. All widgets are fully responsive and work on phones, tablets, and desktops." },
              { q: "Can I customize the colors?", a: "The free plan includes dark and light themes. Custom branding and colors will be available in the Premium plan (coming soon)." },
              { q: "Do I need a developer?", a: "No. If you can paste text into your website editor, you can add a Pulsafi widget. It works with WordPress, Squarespace, Wix, Webflow, and any platform that supports custom HTML." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "var(--bg-card)", borderRadius: 14, border: "1px solid var(--border-card)",
                padding: "20px 22px",
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>{item.q}</h3>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

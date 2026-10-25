// ─── Shared shell for section hub pages ───
// Hubs (/salary, /job-salary, /hourly-to-salary, /salary-needed,
// /401k-rollover) give every programmatic page in a section a crawlable link
// path from the site footer, instead of being reachable only via the sitemap.
// Server-rendered static HTML, no client JS. Visual style matches the
// /tax-brackets hub.
import Header from "./Header";
import Footer from "./Footer";

export default function SectionHub({ eyebrow, title, intro, children }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>{eyebrow}</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          {title}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          {intro}
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px 60px" }}>
        {children}
      </main>

      <Footer />
    </div>
  );
}

export function HubHeading({ children, note }) {
  return (
    <>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 12px" }}>{children}</h2>
      {note && (
        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>{note}</p>
      )}
    </>
  );
}

// A titled card holding a wrap of chip links, e.g. one state's salary levels.
export function HubGroup({ title, meta, children }) {
  return (
    <section style={{ background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, padding: "16px 18px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 10 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>{title}</h3>
        {meta && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{meta}</span>}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{children}</div>
    </section>
  );
}

export function HubChip({ href, title, children }) {
  return (
    <a href={href} title={title} style={{
      display: "inline-block", padding: "6px 10px", background: "var(--bg-main)", border: "1px solid var(--border-card)",
      borderRadius: 8, fontSize: 13, color: "var(--text-primary)", textDecoration: "none", lineHeight: 1.3,
    }}>{children}</a>
  );
}

export function HubCallout({ eyebrow, title, body, href, cta }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px", color: "white", marginTop: 32 }}>
      <div style={{ fontSize: 12, opacity: 0.85, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{eyebrow}</div>
      <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ fontSize: 14, opacity: 0.95, margin: "0 0 16px", lineHeight: 1.6 }}>{body}</p>
      <a href={href} style={{ display: "inline-block", background: "white", color: "#2563eb", padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>{cta}</a>
    </div>
  );
}

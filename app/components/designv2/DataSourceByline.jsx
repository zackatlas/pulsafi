"use client";

// #5 — Data source byline.
// Visible attribution of primary sources at the foot of commercial pages.
// Boosts E-E-A-T signals (Google's helpful content guidelines explicitly
// reward visible primary-source citation).

const SOURCE_LIBRARY = {
  fred: { name: "Federal Reserve H.15", url: "https://fred.stlouisfed.org/categories/22", desc: "Selected interest rates, weekly" },
  bls: { name: "U.S. Bureau of Labor Statistics", url: "https://www.bls.gov/oes/", desc: "Occupational Employment Statistics" },
  irs: { name: "IRS Revenue Procedure 2023-34", url: "https://www.irs.gov/pub/irs-drop/rp-23-34.pdf", desc: "2024 federal tax brackets" },
  closingcorp: { name: "ClosingCorp 2024 Closing Cost Report", url: "https://www.corelogic.com/", desc: "State-level mortgage closing costs" },
  fdic: { name: "FDIC National Rates", url: "https://www.fdic.gov/resources/bankers/national-rates/", desc: "National average savings/CD APYs" },
  attom: { name: "ATTOM Home Equity Report", url: "https://www.attomdata.com/", desc: "State-level home equity averages" },
  hfa: { name: "State HFA Program Documentation", url: "https://www.ncsha.org/housing-help/", desc: "First-time homebuyer assistance terms" },
};

export default function DataSourceByline({
  sources = ["fred", "bls"],
  methodology = null,
  lastReviewed = null,
}) {
  const resolved = sources.map(s => typeof s === "string" ? SOURCE_LIBRARY[s] : s).filter(Boolean);

  return (
    <aside style={{
      marginTop: 32,
      padding: "20px 22px",
      background: "var(--bg-input)",
      border: "1px solid var(--border-input)",
      borderRadius: 12,
      fontSize: 12,
      color: "var(--text-secondary)",
      lineHeight: 1.65,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, color: "var(--text-primary)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
        </svg>
        Data sources & methodology
      </div>

      <div style={{ marginBottom: methodology || lastReviewed ? 10 : 0 }}>
        {resolved.map((src, i) => (
          <span key={i}>
            <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
              {src.name}
            </a>
            <span style={{ color: "var(--text-muted)" }}> — {src.desc}</span>
            {i < resolved.length - 1 && <span style={{ color: "var(--text-faint)" }}> · </span>}
          </span>
        ))}
      </div>

      {methodology && (
        <div style={{ paddingTop: 10, borderTop: "1px solid var(--border-input)", color: "var(--text-muted)", fontSize: 12 }}>
          <strong style={{ color: "var(--text-secondary)" }}>Methodology: </strong>{methodology}
        </div>
      )}

      {lastReviewed && (
        <div style={{ marginTop: 8, color: "var(--text-faint)", fontSize: 11 }}>
          Last reviewed by editorial: {lastReviewed}
        </div>
      )}
    </aside>
  );
}

"use client";
import { useEffect, useMemo, useState } from "react";
import { pickOffer } from "../../lib/affiliateOffers";

export default function AffiliateOffer({ category, placement = "inline", variant = "card" }) {
  const [mounted, setMounted] = useState(false);
  const offer = useMemo(() => pickOffer(category), [category]);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !offer) return null;

  const handleClick = () => {
    try {
      navigator.sendBeacon?.(
        "/api/track-click",
        new Blob([JSON.stringify({
          offerId: offer.id,
          partner: offer.partner,
          category,
          placement,
          path: typeof window !== "undefined" ? window.location.pathname : "",
        })], { type: "application/json" }),
      );
    } catch {}
  };

  if (variant === "banner") {
    return (
      <a href={offer.url} target="_blank" rel="sponsored noopener" onClick={handleClick} style={{
        display: "block", textDecoration: "none",
        background: "linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 100%)",
        border: "1px solid var(--accent-border)", borderRadius: 12,
        padding: "16px 20px", marginBottom: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: 600, marginBottom: 4 }}>
              Sponsored · {offer.partner}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{offer.headline}</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.5 }}>{offer.subhead}</div>
          </div>
          <span style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
            color: "#0d0f13", padding: "10px 22px", borderRadius: 8, fontWeight: 700, fontSize: 14, whiteSpace: "nowrap",
          }}>{offer.cta} →</span>
        </div>
        <div style={{ fontSize: 10, color: "var(--text-faint)", marginTop: 10 }}>{offer.disclosure}</div>
      </a>
    );
  }

  return (
    <a href={offer.url} target="_blank" rel="sponsored noopener" onClick={handleClick} style={{
      display: "block", textDecoration: "none",
      background: "var(--bg-card)", border: "1px solid var(--accent-border)", borderRadius: 14,
      padding: "22px 24px", marginTop: 20,
    }}>
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent)", fontWeight: 600, marginBottom: 8 }}>
        Sponsored · {offer.partner}
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3, marginBottom: 6 }}>{offer.headline}</div>
      <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 16 }}>{offer.subhead}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <span style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          color: "#0d0f13", padding: "11px 24px", borderRadius: 9, fontWeight: 700, fontSize: 14,
        }}>{offer.cta} →</span>
        <span style={{ fontSize: 10, color: "var(--text-faint)" }}>{offer.disclosure}</span>
      </div>
    </a>
  );
}

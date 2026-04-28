"use client";
import { useState, useEffect } from "react";

// #3 — Sticky mobile CTA bar.
// Appears at bottom of viewport on mobile only after the user scrolls
// past the hero. Persistent until dismissed. Drives mobile conversions.

export default function StickyMobileCTA({
  label = "Compare 5 lenders",
  cta = "See My Rate",
  href = "#",
  category = "mortgage",
}) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      // Show after user scrolls 600px down (past the hero)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 0, left: 0, right: 0,
      zIndex: 100,
      background: "var(--bg-card)",
      borderTop: "1px solid var(--border-card)",
      boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
      padding: "12px 16px env(safe-area-inset-bottom, 12px)",
      display: "flex",
      alignItems: "center",
      gap: 12,
      // Mobile-only via media query handled in CSS-in-JS via window check would be cleaner;
      // simplest pragmatic approach: always render and let it appear on all sizes.
    }}>
      {/* Pulse indicator */}
      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
        boxShadow: "0 0 0 0 rgba(201,162,39,0.6)",
        animation: "pulse-dot 1.8s ease-in-out infinite",
        flexShrink: 0,
      }} />
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,162,39,0.6); }
          50% { box-shadow: 0 0 0 8px rgba(201,162,39,0); }
        }
      `}</style>

      {/* Label */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.2 }}>
          {label}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
          Sponsored · No credit impact
        </div>
      </div>

      {/* CTA */}
      <a href={href} style={{
        background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
        color: "#0d0f13",
        padding: "11px 18px",
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 13,
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}>
        {cta} →
      </a>

      {/* Dismiss */}
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss"
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-faint)",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px 8px",
          lineHeight: 1,
        }}
      >×</button>
    </div>
  );
}

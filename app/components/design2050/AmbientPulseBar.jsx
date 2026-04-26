"use client";
import { useEffect, useRef } from "react";

// Live pulse that runs across every page header.
// The pulse signature is data-derived: the rhythm reflects the page's metric
// (mortgage rate volatility, market move, etc). Always animating, never a
// static background.

export default function AmbientPulseBar({
  signature = [0, 0, 0, 0, 0.1, -0.1, 0.05, 0, 0.8, -0.6, 0.4, -0.2, 0, 0, 0.1, 0, 0, 0, 0, 0],
  label = "Live · 30yr fixed mortgage",
  value = "6.875%",
  trend = "−0.12% / week",
  trendDirection = "down",
}) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    let raf;
    let phase = 0;
    const animate = () => {
      phase += 0.008;
      // Generate a path that walks across the SVG, modulated by signature
      const points = signature.map((amp, i) => {
        const x = (i / (signature.length - 1)) * 1200;
        const wave = Math.sin(phase * 4 + i * 0.5) * 1.5;
        const y = 40 - amp * 32 + wave;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      });
      pathRef.current.setAttribute("d", points.join(" "));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [signature]);

  const trendColor = trendDirection === "down" ? "#7dd3a1" : "#f4a4a4";

  return (
    <div style={{
      position: "relative",
      width: "100%",
      background: "linear-gradient(180deg, rgba(8,9,12,0) 0%, rgba(8,9,12,0.6) 50%, rgba(8,9,12,0) 100%)",
      borderTop: "1px solid rgba(212,168,41,0.08)",
      borderBottom: "1px solid rgba(212,168,41,0.08)",
      overflow: "hidden",
    }}>
      <svg width="100%" height="80" viewBox="0 0 1200 80" preserveAspectRatio="none" style={{ display: "block" }}>
        {/* Faint baseline */}
        <line x1="0" y1="40" x2="1200" y2="40" stroke="rgba(212,168,41,0.08)" strokeWidth="1" strokeDasharray="2,4" />
        {/* Live pulse */}
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#pulse-gradient-bar)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(212,168,41,0.6))" }}
        />
        <defs>
          <linearGradient id="pulse-gradient-bar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4a829" stopOpacity="0" />
            <stop offset="20%" stopColor="#d4a829" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#f0c14a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f0c14a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Live label overlay */}
      <div style={{
        position: "absolute", top: "50%", right: 28, transform: "translateY(-50%)",
        display: "flex", alignItems: "center", gap: 14,
        fontFamily: "'DM Sans', sans-serif", fontSize: 11,
        background: "rgba(8,9,12,0.7)", backdropFilter: "blur(8px)",
        padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(212,168,41,0.15)",
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%", background: "#f0c14a",
          boxShadow: "0 0 0 0 rgba(240,193,74,0.6)",
          animation: "ambient-live 2s ease-in-out infinite",
        }} />
        <style>{`@keyframes ambient-live { 0%,100%{box-shadow:0 0 0 0 rgba(240,193,74,0.6);} 50%{box-shadow:0 0 0 6px rgba(240,193,74,0);} }`}</style>
        <span style={{ color: "rgba(232,232,235,0.6)", letterSpacing: "0.06em", textTransform: "uppercase", fontSize: 10 }}>{label}</span>
        <span style={{ color: "#f0c14a", fontFamily: "'Inter', monospace", fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em" }}>{value}</span>
        <span style={{ color: trendColor, fontFamily: "'Inter', monospace", fontSize: 11, fontWeight: 600 }}>
          {trendDirection === "down" ? "↓" : "↑"} {trend}
        </span>
      </div>
    </div>
  );
}

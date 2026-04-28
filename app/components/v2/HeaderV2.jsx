"use client";
import { useEffect, useRef } from "react";

// Header for v2. Top row = brand + nav. Strip below = data-driven pulse bar.
// The pulse takes a `signature` prop (number[] in -1..1 range). The shape
// of the pulse encodes the page's primary metric. No background image —
// the pulse is in its own discrete strip, never behind body text.

export default function HeaderV2({
  signature = [],
  liveLabel = "Live",
  liveValue = "",
  liveTrend = null,
  trendDirection = "down",
}) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current || signature.length === 0) return;
    let raf;
    let phase = 0;
    const animate = () => {
      phase += 0.008;
      const len = signature.length;
      const points = signature.map((amp, i) => {
        const x = (i / (len - 1)) * 1200;
        // Subtle ambient breath, smaller where the spike is taller.
        const dampen = 1 - Math.min(1, Math.abs(amp));
        const wave = Math.sin(phase * 4 + i * 0.5) * 0.8 * dampen;
        const y = 30 - amp * 22 + wave;
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
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "rgba(5,6,8,0.85)", backdropFilter: "blur(20px)" }}>
      {/* Top row */}
      <div style={{
        padding: "20px 32px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 24,
      }}>
        <a href="/v2" style={{
          display: "flex", alignItems: "center", gap: 12,
          textDecoration: "none", color: "inherit",
        }}>
          <div style={{
            width: 30, height: 30, borderRadius: 7,
            background: "linear-gradient(135deg, #f0c14a, #d4a829)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Playfair Display', serif", fontWeight: 900, color: "#050608", fontSize: 17,
          }}>P</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, letterSpacing: "-0.02em", fontWeight: 700, color: "#e8e8eb" }}>
            Pulsafi
          </div>
        </a>

        <nav style={{ display: "flex", gap: 26, fontSize: 11, flexWrap: "wrap" }}>
          {[
            { label: "Learn", href: "/v2/learn/fire-movement-2026" },
            { label: "Tools", href: "/v2/tools/mortgage-calculator" },
            { label: "Salaries", href: "/city-job-salary" },
            { label: "Markets", href: "/market-today" },
            { label: "Play", href: "/play" },
            { label: "Resources", href: "/resources" },
            { label: "About", href: "/about" },
          ].map(item => (
            <a key={item.label} href={item.href} style={{
              color: "rgba(232,232,235,0.65)", textDecoration: "none",
              textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 500,
            }}>{item.label}</a>
          ))}
        </nav>
      </div>

      {/* Data-driven pulse strip — discrete row, no top border so it flows from the nav */}
      <div style={{
        position: "relative",
        borderBottom: "1px solid rgba(212,168,41,0.08)",
        background: "rgba(5,6,8,0.4)",
        height: 60,
        overflow: "hidden",
      }}>
        <svg width="100%" height="60" viewBox="0 0 1200 60" preserveAspectRatio="none" style={{ display: "block" }}>
          <line x1="0" y1="30" x2="1200" y2="30" stroke="rgba(212,168,41,0.06)" strokeWidth="1" strokeDasharray="2,5" />
          {signature.length > 0 && (
            <path
              ref={pathRef}
              fill="none"
              stroke="url(#header-pulse)"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 4px rgba(212,168,41,0.55))" }}
            />
          )}
          <defs>
            <linearGradient id="header-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a829" stopOpacity="0" />
              <stop offset="20%" stopColor="#d4a829" stopOpacity="0.7" />
              <stop offset="80%" stopColor="#f0c14a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f0c14a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {liveValue && (
          <div style={{
            position: "absolute", top: "50%", right: 24, transform: "translateY(-50%)",
            display: "flex", alignItems: "center", gap: 12,
            background: "rgba(8,9,12,0.75)", backdropFilter: "blur(8px)",
            padding: "6px 12px", borderRadius: 999, border: "1px solid rgba(212,168,41,0.18)",
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: "50%", background: "#f0c14a",
              boxShadow: "0 0 0 0 rgba(240,193,74,0.6)",
              animation: "v2-live 2s ease-in-out infinite",
            }} />
            <style>{`@keyframes v2-live { 0%,100%{box-shadow:0 0 0 0 rgba(240,193,74,0.6);} 50%{box-shadow:0 0 0 6px rgba(240,193,74,0);} }`}</style>
            <span style={{ color: "rgba(232,232,235,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: 9, fontFamily: "'DM Sans', sans-serif" }}>{liveLabel}</span>
            <span style={{ color: "#f0c14a", fontFamily: "'Inter', monospace", fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em" }}>{liveValue}</span>
            {liveTrend && (
              <span style={{ color: trendColor, fontFamily: "'Inter', monospace", fontSize: 10, fontWeight: 600 }}>
                {trendDirection === "down" ? "↓" : "↑"} {liveTrend}
              </span>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

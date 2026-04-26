"use client";
import { useEffect, useRef } from "react";

// Two states' rate signatures overlaid as competing pulses.
// Conveys "your state vs national" (or any A/B comparison) as physical
// difference, not numbers in a table.

export default function DualPulseCompare({
  leftLabel = "California",
  leftValue = "6.875%",
  rightLabel = "National Avg",
  rightValue = "6.997%",
  divergence = "−0.122%",
}) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    let raf;
    let phase = 0;
    const animate = () => {
      phase += 0.01;
      // California — slightly tighter, more gold
      if (leftRef.current) {
        const points = Array.from({ length: 80 }, (_, i) => {
          const x = (i / 79) * 1000;
          const breath = Math.sin(phase * 2 + i * 0.3) * 4;
          const spike = i === 24 ? -28 : i === 25 ? 18 : i === 26 ? -10 : 0;
          const y = 130 + breath + spike;
          return `${i === 0 ? "M" : "L"}${x},${y}`;
        });
        leftRef.current.setAttribute("d", points.join(" "));
      }
      // National — slightly higher baseline, paler
      if (rightRef.current) {
        const points = Array.from({ length: 80 }, (_, i) => {
          const x = (i / 79) * 1000;
          const breath = Math.sin(phase * 2.2 + i * 0.32 + 1) * 3.5;
          const spike = i === 50 ? -20 : i === 51 ? 14 : i === 52 ? -6 : 0;
          const y = 110 + breath + spike;
          return `${i === 0 ? "M" : "L"}${x},${y}`;
        });
        rightRef.current.setAttribute("d", points.join(" "));
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{ padding: "80px 32px", borderTop: "1px solid rgba(212,168,41,0.08)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 16 }}>
            Dual Pulse · Rate Comparison
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 200, color: "#e8e8eb", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
          }}>
            See where your rate <em style={{ fontStyle: "italic", color: "#f0c14a" }}>diverges</em>
            <br /> from the national pulse
          </h2>
        </div>

        {/* The dual pulse */}
        <div style={{ position: "relative", height: 240, padding: "20px 0" }}>
          <svg width="100%" height="240" viewBox="0 0 1000 240" preserveAspectRatio="none">
            {/* Faint gridlines */}
            {[60, 120, 180].map(y => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(232,232,235,0.04)" strokeWidth="1" />
            ))}
            {/* National (pale) */}
            <path
              ref={rightRef}
              fill="none"
              stroke="rgba(232,232,235,0.4)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* State (gold, prominent) */}
            <path
              ref={leftRef}
              fill="none"
              stroke="url(#dual-gold)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 8px rgba(240,193,74,0.5))" }}
            />
            <defs>
              <linearGradient id="dual-gold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a829" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#f0c14a" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4a829" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Legend / divergence summary */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 32, alignItems: "center",
          marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(212,168,41,0.08)",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ width: 24, height: 2, background: "linear-gradient(90deg, #d4a829, #f0c14a)", borderRadius: 1, boxShadow: "0 0 6px rgba(240,193,74,0.5)" }} />
              <span style={{ fontSize: 11, color: "rgba(232,232,235,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{leftLabel}</span>
            </div>
            <div style={{ fontSize: 32, fontFamily: "'Inter', monospace", fontWeight: 200, color: "#f0c14a", letterSpacing: "-0.03em" }}>
              {leftValue}
            </div>
          </div>

          <div style={{
            textAlign: "center", padding: "12px 18px",
            background: "rgba(125,211,161,0.08)", border: "1px solid rgba(125,211,161,0.2)",
            borderRadius: 999,
            fontFamily: "'Inter', monospace", color: "#7dd3a1", fontSize: 14, fontWeight: 600,
          }}>
            ↓ {divergence}<br />
            <span style={{ fontSize: 9, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500 }}>divergence</span>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: "rgba(232,232,235,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{rightLabel}</span>
              <div style={{ width: 24, height: 1, background: "rgba(232,232,235,0.4)" }} />
            </div>
            <div style={{ fontSize: 32, fontFamily: "'Inter', monospace", fontWeight: 200, color: "rgba(232,232,235,0.6)", letterSpacing: "-0.03em" }}>
              {rightValue}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";

// Theme-aware pulse strip rendered just below the header. Uses var(--accent)
// so it auto-adapts to light + dark. Subtle — much smaller than the v2
// version because here we want a futuristic accent on top of the existing
// site, not a takeover.

export default function HeaderPulseStrip({ signature = [], height = 36 }) {
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
        const dampen = 1 - Math.min(1, Math.abs(amp));
        const wave = Math.sin(phase * 4 + i * 0.5) * 0.6 * dampen;
        const y = height / 2 - amp * (height * 0.34) + wave;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      });
      pathRef.current.setAttribute("d", points.join(" "));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [signature, height]);

  if (signature.length === 0) return null;

  const id = `v3-pulse-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div style={{
      width: "100%",
      height,
      position: "relative",
      borderBottom: "1px solid var(--border)",
      background: "var(--bg-input)",
    }} aria-hidden="true">
      <svg width="100%" height={height} viewBox={`0 0 1200 ${height}`} preserveAspectRatio="none" style={{ display: "block" }}>
        <line x1="0" y1={height / 2} x2="1200" y2={height / 2}
          stroke="var(--border-input)" strokeWidth="1" strokeDasharray="2,4" />
        <path
          ref={pathRef}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="20%" stopColor="var(--accent)" stopOpacity="0.5" />
            <stop offset="80%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

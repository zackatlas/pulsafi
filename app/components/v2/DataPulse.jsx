"use client";
import { useEffect, useRef } from "react";

// The intentional pulse. Takes a `signature` array (-1..1 normalized) and
// renders it as an animated waveform. Always kept in its own visual lane —
// never overlaid behind text or content.
//
// Variants:
//   - "ribbon" — full-width subtle pulse for use as a section divider
//   - "feature" — taller, more dramatic, for hero/centerpiece moments
//   - "trail"   — flat baseline that traces the actual data history shape

export default function DataPulse({
  signature = [],
  variant = "feature",
  height,
  speed = 0.01,
  glow = true,
  color = "#f0c14a",
}) {
  const pathRef = useRef(null);
  const finalHeight = height ?? (variant === "ribbon" ? 32 : variant === "trail" ? 100 : 160);

  useEffect(() => {
    if (!pathRef.current || signature.length === 0) return;
    let raf;
    let phase = 0;
    const len = signature.length;
    const baseY = finalHeight / 2;
    const amp = variant === "ribbon" ? finalHeight * 0.35 : variant === "trail" ? finalHeight * 0.42 : finalHeight * 0.42;

    const animate = () => {
      phase += speed;
      const points = signature.map((value, i) => {
        const x = (i / (len - 1)) * 1200;
        // Ambient breath — subtle modulation that varies with the local amplitude.
        // Larger spikes get less breath (so they don't shimmer); flat regions breathe more.
        const stillness = 1 - Math.min(1, Math.abs(value));
        const wave = Math.sin(phase * 4 + i * 0.45) * (variant === "ribbon" ? 0.8 : 1.4) * stillness;
        const y = baseY - value * amp + wave;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      });
      pathRef.current.setAttribute("d", points.join(" "));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [signature, finalHeight, variant, speed]);

  if (signature.length === 0) {
    return <div style={{ height: finalHeight }} />;
  }

  const id = `pulse-grad-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <div style={{ width: "100%", height: finalHeight, position: "relative" }} aria-hidden="true">
      <svg width="100%" height={finalHeight} viewBox={`0 0 1200 ${finalHeight}`} preserveAspectRatio="none" style={{ display: "block" }}>
        <line x1="0" y1={finalHeight / 2} x2="1200" y2={finalHeight / 2}
          stroke="rgba(212,168,41,0.05)" strokeWidth="1" strokeDasharray="2,5" />
        <path
          ref={pathRef}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={variant === "ribbon" ? 1.2 : 1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={glow ? { filter: `drop-shadow(0 0 ${variant === "feature" ? 8 : 4}px ${color}88)` } : undefined}
        />
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="20%" stopColor={color} stopOpacity="0.7" />
            <stop offset="80%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

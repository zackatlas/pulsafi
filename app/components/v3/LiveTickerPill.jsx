"use client";
import { useEffect, useState } from "react";

// Theme-aware live ticker pill. Uses --bg-card and --accent so it adapts to
// both light and dark themes. Shows a label, a live value, and a tiny
// pulsing dot to signal "this is real-time."

function pad(n) { return String(n).padStart(2, "0"); }

export default function LiveTickerPill({
  label = "Live",
  value,
  trend,
  trendDirection = "down",
  showTime = false,
  size = "default",
}) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (!showTime) return;
    const tick = () => {
      const d = new Date();
      setTime(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [showTime]);

  const trendColor = trendDirection === "down"
    ? "var(--accent)"  // matches the up/down semantics of the existing site
    : "#dc6f6f";

  const padding = size === "small" ? "5px 10px" : "7px 13px";
  const fontSize = size === "small" ? 10 : 11;
  const dotSize = size === "small" ? 5 : 6;

  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "var(--bg-card)",
      border: "1px solid var(--accent-border)",
      padding,
      borderRadius: 999,
      fontFamily: "'Inter', monospace", fontSize,
      color: "var(--text-secondary)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    }}>
      <span style={{
        width: dotSize, height: dotSize, borderRadius: "50%",
        background: "var(--accent)",
        boxShadow: "0 0 0 0 var(--accent-glow)",
        animation: "v3-live-pulse 1.8s ease-in-out infinite",
        flexShrink: 0,
      }} />
      <style>{`
        @keyframes v3-live-pulse {
          0%, 100% { box-shadow: 0 0 0 0 var(--accent-bg); opacity: 1; }
          50% { box-shadow: 0 0 0 5px transparent; opacity: 0.65; }
        }
      `}</style>
      <span style={{
        color: "var(--text-muted)",
        textTransform: "uppercase", letterSpacing: "0.1em",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: fontSize - 1,
      }}>{label}</span>
      {value && (
        <span style={{ color: "var(--accent)", fontWeight: 700, letterSpacing: "-0.01em", fontSize: fontSize + 1 }}>
          {value}
        </span>
      )}
      {trend && (
        <span style={{ color: trendColor, fontWeight: 600, fontSize: fontSize - 1 }}>
          {trendDirection === "down" ? "↓" : "↑"} {trend}
        </span>
      )}
      {showTime && time && (
        <span style={{ color: "var(--text-faint)", fontVariantNumeric: "tabular-nums" }}>
          · {time}
        </span>
      )}
    </div>
  );
}

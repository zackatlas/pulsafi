"use client";

// #6 — Pulse-line section divider.
// Animated SVG heartbeat/EKG line in the brand gold.
// Used between major sections — gives the site a distinctive identity.

export default function PulseDivider({ width = "100%", height = 48, animate = true }) {
  return (
    <div style={{
      width,
      height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      margin: "8px 0",
    }} aria-hidden="true">
      <svg
        width="100%"
        height={height}
        viewBox="0 0 800 48"
        preserveAspectRatio="none"
        style={{ display: "block" }}
      >
        {/* Faint horizontal baseline */}
        <line x1="0" y1="24" x2="800" y2="24" stroke="var(--border)" strokeWidth="1" />

        {/* The pulse path — flat, then a quick spike, then flat */}
        <path
          d="M0,24 L300,24 L320,24 L330,8 L340,40 L350,12 L360,32 L370,24 L500,24 L800,24"
          fill="none"
          stroke="url(#pulseGradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={animate ? {
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            animation: "pulse-draw 4s ease-in-out infinite",
          } : {}}
        />

        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {animate && (
        <style>{`
          @keyframes pulse-draw {
            0% { stroke-dashoffset: 1000; opacity: 0; }
            10% { opacity: 1; }
            70% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: 0; opacity: 0.3; }
          }
        `}</style>
      )}
    </div>
  );
}

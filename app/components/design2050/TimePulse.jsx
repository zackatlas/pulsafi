"use client";
import { useState } from "react";

// Your financial life as one continuous pulse from age 22 to retirement.
// Major milestones (first home, debt-free, FI) are spikes. Hover any age
// to see the projected snapshot. Replaces a static net-worth chart.

const MILESTONES = [
  { age: 24, label: "First job", value: "$58k salary", spike: 0.3 },
  { age: 27, label: "Emergency fund", value: "$15k saved", spike: 0.4 },
  { age: 30, label: "First home", value: "$420k purchase", spike: 0.95, primary: true },
  { age: 35, label: "Net worth $250k", value: "Track ahead", spike: 0.7 },
  { age: 42, label: "Mortgage halfway", value: "$160k principal left", spike: 0.55 },
  { age: 50, label: "Debt-free", value: "All consumer debt gone", spike: 0.85 },
  { age: 58, label: "FI number hit", value: "$1.6M portfolio", spike: 1.0, primary: true },
  { age: 65, label: "Retire", value: "$2.1M projected", spike: 0.9 },
];

export default function TimePulse() {
  const [hoveredAge, setHoveredAge] = useState(null);

  // Generate the pulse path
  const pathPoints = [];
  for (let age = 22; age <= 70; age++) {
    const x = ((age - 22) / 48) * 1000;
    const milestone = MILESTONES.find(m => m.age === age);
    const baseY = 100 + Math.sin(age * 0.4) * 4;
    if (milestone) {
      // Spike up at the age before, peak at age, descend after
      pathPoints.push(`${age === 22 ? "M" : "L"}${x - 8},${baseY + 2}`);
      pathPoints.push(`L${x - 4},${baseY - milestone.spike * 60 - 6}`);
      pathPoints.push(`L${x},${baseY - milestone.spike * 70}`);
      pathPoints.push(`L${x + 4},${baseY - milestone.spike * 60 + 8}`);
      pathPoints.push(`L${x + 8},${baseY + 4}`);
    } else {
      pathPoints.push(`${age === 22 ? "M" : "L"}${x},${baseY}`);
    }
  }

  return (
    <section style={{ padding: "80px 32px 60px", borderTop: "1px solid rgba(212,168,41,0.08)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 16 }}>
            Time Pulse · Your Financial Life
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 200, color: "#e8e8eb", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
          }}>
            Every milestone, <em style={{ fontStyle: "italic", color: "#f0c14a" }}>one pulse</em>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(232,232,235,0.5)", marginTop: 16, maxWidth: 520, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Your projected financial life from age 22 to 70. Each spike is a milestone. Hover to see the snapshot.
          </p>
        </div>

        {/* Time pulse + milestone tooltips */}
        <div style={{ position: "relative", height: 280 }}>
          <svg width="100%" height="240" viewBox="0 0 1000 180" preserveAspectRatio="none" style={{ display: "block" }}>
            {/* Decade gridlines */}
            {[30, 40, 50, 60].map(age => {
              const x = ((age - 22) / 48) * 1000;
              return (
                <g key={age}>
                  <line x1={x} y1="0" x2={x} y2="160" stroke="rgba(232,232,235,0.04)" strokeWidth="1" strokeDasharray="2,4" />
                  <text x={x} y="175" textAnchor="middle" fill="rgba(232,232,235,0.3)" fontSize="9" fontFamily="'DM Sans', sans-serif" letterSpacing="0.1em">{age}</text>
                </g>
              );
            })}

            {/* The pulse */}
            <path
              d={pathPoints.join(" ")}
              fill="none"
              stroke="url(#time-pulse-gradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 6px rgba(240,193,74,0.4))" }}
            />
            <defs>
              <linearGradient id="time-pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a829" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#f0c14a" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4a829" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Milestone markers as positioned overlays */}
          {MILESTONES.map((m, i) => {
            const xPct = ((m.age - 22) / 48) * 100;
            const isHovered = hoveredAge === m.age;
            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredAge(m.age)}
                onMouseLeave={() => setHoveredAge(null)}
                style={{
                  position: "absolute",
                  left: `${xPct}%`,
                  top: `${(100 - m.spike * 70) / 240 * 100}%`,
                  transform: "translate(-50%, -50%)",
                  width: m.primary ? 16 : 10,
                  height: m.primary ? 16 : 10,
                  borderRadius: "50%",
                  background: m.primary
                    ? "radial-gradient(circle, #f0c14a 0%, #d4a829 70%)"
                    : "radial-gradient(circle, rgba(240,193,74,0.7) 0%, rgba(212,168,41,0.3) 70%)",
                  cursor: "pointer",
                  zIndex: isHovered ? 3 : 2,
                  boxShadow: isHovered
                    ? "0 0 24px rgba(240,193,74,0.9)"
                    : m.primary ? "0 0 12px rgba(240,193,74,0.6)" : "0 0 6px rgba(212,168,41,0.4)",
                  transition: "box-shadow 0.2s, transform 0.2s",
                }}>
                {/* Tooltip */}
                {isHovered && (
                  <div style={{
                    position: "absolute",
                    bottom: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
                    background: "rgba(8,9,12,0.95)", border: "1px solid rgba(240,193,74,0.4)",
                    borderRadius: 8, padding: "10px 14px",
                    minWidth: 160, textAlign: "center",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                  }}>
                    <div style={{ fontSize: 9, color: "rgba(212,168,41,0.8)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 4 }}>Age {m.age}</div>
                    <div style={{ fontSize: 13, color: "#e8e8eb", fontWeight: 600, fontFamily: "'DM Sans', sans-serif", marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: "#f0c14a", fontFamily: "'Inter', monospace" }}>{m.value}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

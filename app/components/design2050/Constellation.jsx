"use client";
import { useState } from "react";

// Tools and pages laid out as a constellation around the user's current
// page, connected by faint pulse-arcs. Hover to draw a stronger arc.
// Replaces the conventional grid of cards.

const NODES = [
  { id: "calc", label: "Mortgage Calc", x: 50, y: 50, primary: true, value: "Your tool" },
  { id: "rates", label: "Best Rates", x: 18, y: 28, value: "6.875%" },
  { id: "refi", label: "Refinance", x: 80, y: 25, value: "Break-even" },
  { id: "fthb", label: "First-Time Buyer", x: 12, y: 70, value: "DPA programs" },
  { id: "heloc", label: "HELOC", x: 85, y: 72, value: "8.50% Prime" },
  { id: "afford", label: "Affordability", x: 50, y: 12, value: "28/36 rule" },
  { id: "rvb", label: "Rent vs Buy", x: 50, y: 88, value: "5-yr crossover" },
];

export default function Constellation() {
  const [hovered, setHovered] = useState(null);
  const center = NODES.find(n => n.primary);

  return (
    <section style={{ padding: "80px 32px", borderTop: "1px solid rgba(212,168,41,0.08)" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 16 }}>
            Constellation · Related Tools
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 200, color: "#e8e8eb", letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
          }}>
            Everything that <em style={{ fontStyle: "italic", color: "#f0c14a" }}>orbits</em> your decision
          </h2>
          <p style={{ fontSize: 13, color: "rgba(232,232,235,0.5)", marginTop: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>
            Hover any tool to see how it relates. Click to navigate.
          </p>
        </div>

        <div style={{ position: "relative", width: "100%", paddingBottom: "65%", marginTop: 24 }}>
          <svg
            viewBox="0 0 100 65"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* Connecting arcs from center to each satellite */}
            {NODES.filter(n => !n.primary).map(node => {
              const isActive = hovered === node.id;
              return (
                <g key={`arc-${node.id}`}>
                  <line
                    x1={center.x} y1={center.y * 0.65}
                    x2={node.x} y2={node.y * 0.65}
                    stroke={isActive ? "#f0c14a" : "rgba(212,168,41,0.15)"}
                    strokeWidth={isActive ? "0.18" : "0.1"}
                    strokeDasharray={isActive ? "none" : "0.4,0.4"}
                    style={{ transition: "stroke 0.2s, stroke-width 0.2s", filter: isActive ? "drop-shadow(0 0 1.2px rgba(240,193,74,0.7))" : "none" }}
                  />
                </g>
              );
            })}

            {/* Pulse "ring" around the center */}
            <circle
              cx={center.x} cy={center.y * 0.65} r="3.6"
              fill="none" stroke="rgba(212,168,41,0.3)" strokeWidth="0.08"
            />
            <circle
              cx={center.x} cy={center.y * 0.65} r="2.4"
              fill="rgba(240,193,74,0.08)" stroke="rgba(240,193,74,0.5)" strokeWidth="0.12"
            />
          </svg>

          {/* Nodes as positioned divs */}
          {NODES.map(node => {
            const isHovered = hovered === node.id;
            const isPrimary = node.primary;
            return (
              <a
                key={node.id} href="#"
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  position: "absolute",
                  left: `${node.x}%`,
                  top: `${node.y * 0.65 / 65 * 100}%`,
                  transform: "translate(-50%, -50%)",
                  textDecoration: "none",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  padding: "10px 16px",
                  background: isPrimary ? "rgba(240,193,74,0.1)" : isHovered ? "rgba(240,193,74,0.06)" : "rgba(8,9,12,0.6)",
                  border: isPrimary ? "1px solid rgba(240,193,74,0.5)" : isHovered ? "1px solid rgba(240,193,74,0.4)" : "1px solid rgba(212,168,41,0.15)",
                  borderRadius: 10,
                  backdropFilter: "blur(8px)",
                  transition: "all 0.2s",
                  zIndex: isHovered ? 2 : 1,
                  boxShadow: isPrimary ? "0 0 32px rgba(240,193,74,0.18)" : isHovered ? "0 0 18px rgba(240,193,74,0.25)" : "none",
                  cursor: "pointer",
                  minWidth: 100,
                  textAlign: "center",
                }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em",
                  color: isPrimary ? "#f0c14a" : isHovered ? "#f0c14a" : "#e8e8eb",
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: "nowrap",
                }}>{node.label}</div>
                <div style={{
                  fontSize: 10, fontFamily: "'Inter', monospace",
                  color: "rgba(232,232,235,0.5)",
                  whiteSpace: "nowrap",
                }}>{node.value}</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

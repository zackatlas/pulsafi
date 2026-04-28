"use client";
import { useEffect, useRef, useState } from "react";
import LivingNumber from "./LivingNumber";

// Scroll-driven storytelling. As the user scrolls, the headline number
// morphs through scenarios — different rates, different homes, different
// terms — with the pulse spike re-shaping at each step. Demonstrates that
// the page is reactive to your gesture, not a static doc.

const SCENES = [
  { eyebrow: "AT 6.875%, A $400K HOME", value: 2628, title: "monthly", helper: "20% down · 30-year fixed", color: "#f0c14a" },
  { eyebrow: "BUMP THE RATE 1%, AND",   value: 2868, title: "monthly", helper: "every 1% adds ~$240/mo · permanently", color: "#f4a4a4" },
  { eyebrow: "GO 15-YEAR INSTEAD",       value: 3550, title: "monthly", helper: "more per month · $200k less interest over time", color: "#7dd3a1" },
  { eyebrow: "DROP TO 5% DOWN",         value: 3268, title: "monthly", helper: "PMI kicks in · adds ~$200/mo until 20% equity", color: "#f0c14a" },
];

export default function ScenarioMorph() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      // Map scroll progress through the section to a scene index
      const start = winH * 0.6;
      const end = -rect.height + winH * 0.4;
      const range = start - end;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / range));
      const idx = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length));
      setActive(idx);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scene = SCENES[active];

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        height: `${SCENES.length * 90}vh`,
      }}
    >
      <div style={{
        position: "sticky",
        top: 0, height: "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "60px 24px",
        textAlign: "center",
      }}>
        {/* Scene counter */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36 }}>
          {SCENES.map((_, i) => (
            <div key={i} style={{
              width: i === active ? 28 : 8,
              height: 2, borderRadius: 1,
              background: i === active ? "#f0c14a" : "rgba(212,168,41,0.2)",
              transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }} />
          ))}
        </div>

        <div style={{
          fontSize: 11, textTransform: "uppercase", letterSpacing: "0.32em",
          color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 30,
          fontFamily: "'DM Sans', sans-serif",
          transition: "opacity 0.3s",
        }} key={`eyebrow-${active}`}>
          {scene.eyebrow}
        </div>

        <div style={{
          fontSize: "clamp(80px, 16vw, 220px)",
          fontFamily: "'Inter', monospace",
          fontWeight: 100,
          letterSpacing: "-0.06em",
          lineHeight: 0.95,
          color: scene.color,
          filter: `drop-shadow(0 0 32px ${scene.color}33)`,
          transition: "color 0.4s ease, filter 0.4s ease",
        }}
          key={`number-${active}`}
        >
          $<LivingNumber value={scene.value} format={(n) => Math.round(n).toLocaleString()} duration={800} />
        </div>

        <div style={{
          marginTop: 18,
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(16px, 2vw, 22px)",
          fontStyle: "italic", fontWeight: 300,
          color: "rgba(232,232,235,0.7)",
          letterSpacing: "-0.01em",
          maxWidth: 560,
        }}>
          {scene.title}
        </div>
        <div style={{
          marginTop: 8,
          fontSize: 13,
          color: "rgba(232,232,235,0.45)",
          letterSpacing: "0.02em",
        }}>
          {scene.helper}
        </div>
      </div>
    </section>
  );
}

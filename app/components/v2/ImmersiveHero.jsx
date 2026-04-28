"use client";
import { useEffect, useRef, useState } from "react";
import LivingNumber from "./LivingNumber";
import LiveClock from "./LiveClock";
import AmbientParticles from "./AmbientParticles";

// The immersive hero — fills the viewport. Massive number is the page.
// Cursor-reactive pulse warps where the user hovers. Particles drift
// behind. A secondary scroll cue invites the user to explore further.

export default function ImmersiveHero() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const cursorRef = useRef({ x: 0.5, y: 0.5, has: false });

  // Animate the pulse, warped by cursor position
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    let raf;
    let phase = 0;
    const POINTS = 120;

    const animate = () => {
      phase += 0.008;
      const c = cursorRef.current;
      const points = [];
      for (let i = 0; i < POINTS; i++) {
        const t = i / (POINTS - 1);
        const x = t * 1600;
        // Distance from cursor in normalized x; lower = more affected
        const dxNorm = c.has ? Math.abs(t - c.x) : 1;
        // Cursor proximity creates a tall spike that follows the mouse
        const proximity = c.has ? Math.max(0, 1 - dxNorm * 7) : 0;
        const proxBoost = Math.pow(proximity, 2.2) * (c.has ? 56 : 0);

        // Always-on subtle sine wave so the line never stops moving
        const baseWave = Math.sin(phase * 3 + i * 0.36) * 4;

        // A "heart-spike" that walks across the line — gives the pulse a meta-rhythm
        const heartPhase = (phase * 0.5 + t * 4) % 1;
        const heart = heartPhase < 0.05
          ? -Math.sin(heartPhase * Math.PI / 0.05) * 14
          : heartPhase < 0.1
          ? Math.sin((heartPhase - 0.05) * Math.PI / 0.05) * 8
          : 0;

        const y = 100 + baseWave + heart - proxBoost;
        points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      path.setAttribute("d", points.join(" "));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Cursor tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cursorRef.current = { x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)), has: true };
    };
    const onLeave = () => { cursorRef.current.has = false; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        cursor: "crosshair",
      }}
    >
      {/* Ambient particle field */}
      <AmbientParticles count={70} />

      {/* Pulse occupies the middle band of the viewport */}
      <div style={{
        position: "absolute",
        top: "50%", left: 0, right: 0,
        transform: "translateY(-50%)",
        height: 200,
        zIndex: 1,
      }} aria-hidden="true">
        <svg width="100%" height="200" viewBox="0 0 1600 200" preserveAspectRatio="none" style={{ display: "block" }}>
          <defs>
            <linearGradient id="hero-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a829" stopOpacity="0" />
              <stop offset="20%" stopColor="#d4a829" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f0c14a" stopOpacity="1" />
              <stop offset="80%" stopColor="#f0c14a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d4a829" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <line x1="0" y1="100" x2="1600" y2="100" stroke="rgba(212,168,41,0.05)" strokeWidth="1" strokeDasharray="2,8" />
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#hero-pulse-grad)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#hero-glow)"
          />
        </svg>
      </div>

      {/* Top ribbon — eyebrow + clock */}
      <div style={{ position: "relative", zIndex: 3, padding: "32px 32px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.32em", color: "rgba(212,168,41,0.7)", fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>
          California · 30-year fixed mortgage · Today
        </div>
        <LiveClock />
      </div>

      {/* The number — text always foreground, never overlaid */}
      <div style={{
        position: "relative", zIndex: 2,
        flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 24px",
      }}>
        <LivingNumber
          value={6.875}
          flutterAmount={0.003}
          format={(n) => `${n.toFixed(3)}%`}
          style={{
            display: "inline-block",
            fontSize: "clamp(120px, 22vw, 320px)",
            fontFamily: "'Inter', monospace",
            fontWeight: 100,
            lineHeight: 0.9,
            letterSpacing: "-0.06em",
            background: "linear-gradient(180deg, #fbe5a4 0%, #f0c14a 50%, #b48a18 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            // Soft glow underneath to give the gold weight against the void
            filter: "drop-shadow(0 0 40px rgba(240,193,74,0.18))",
          }}
        />
        <div style={{
          marginTop: 24, textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(20px, 2.4vw, 30px)",
          fontStyle: "italic", fontWeight: 300,
          color: "rgba(232,232,235,0.85)",
          letterSpacing: "-0.01em",
        }}>
          The pulse of California's mortgage market <em style={{ color: "#7dd3a1", fontStyle: "normal", fontFamily: "'Inter', monospace", fontSize: "0.7em" }}>↓ −0.122%</em> today
        </div>
      </div>

      {/* Bottom — secondary live data ticks + scroll cue */}
      <div style={{ position: "relative", zIndex: 3, padding: "0 32px 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 24,
          padding: "0 0 28px",
          borderBottom: "1px solid rgba(212,168,41,0.08)",
        }}>
          {[
            { label: "S&P 500", value: 5841.27, fmt: (n) => n.toFixed(2), trend: "+0.42%", flutter: 0.4 },
            { label: "10yr Treasury", value: 4.214, fmt: (n) => `${n.toFixed(3)}%`, trend: "−0.018%", flutter: 0.003 },
            { label: "BTC", value: 98142, fmt: (n) => `$${Math.round(n).toLocaleString()}`, trend: "+1.84%", flutter: 12 },
            { label: "Fed Funds", value: 4.50, fmt: (n) => `${n.toFixed(2)}%`, trend: "stable", flutter: 0 },
          ].map((tick, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(232,232,235,0.4)", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                {tick.label}
              </div>
              <LivingNumber
                value={tick.value}
                format={tick.fmt}
                flutterAmount={tick.flutter}
                style={{
                  fontSize: 18, fontFamily: "'Inter', monospace", fontWeight: 400,
                  color: "#e8e8eb", letterSpacing: "-0.01em",
                  display: "inline-block",
                }}
              />
              <div style={{
                fontSize: 10, fontFamily: "'Inter', monospace", marginTop: 4,
                color: tick.trend.startsWith("+") ? "#7dd3a1" : tick.trend.startsWith("−") ? "#f4a4a4" : "rgba(232,232,235,0.4)",
              }}>
                {tick.trend}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", paddingTop: 22, color: "rgba(232,232,235,0.4)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
          Scroll
          <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 1, height: 32,
              background: "linear-gradient(180deg, rgba(240,193,74,0.6), transparent)",
              animation: "scroll-cue 2s ease-in-out infinite",
            }} />
            <style>{`@keyframes scroll-cue { 0%,100%{opacity:0.3;transform:translateY(-6px);} 50%{opacity:1;transform:translateY(0);} }`}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

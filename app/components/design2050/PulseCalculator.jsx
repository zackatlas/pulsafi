"use client";
import { useState, useMemo, useEffect, useRef } from "react";

// Calculator built around the pulse. Inputs are sliders along a horizontal
// axis; the result is a giant living number that pulses with each adjustment.
// No card, no form fields — just one continuous interactive surface.

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function PulseSlider({ label, min, max, value, onChange, format, accent = false }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ flex: 1, minWidth: 200 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(232,232,235,0.5)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
          {label}
        </span>
        <span style={{
          fontSize: 17, fontFamily: "'Inter', monospace", fontWeight: 700,
          color: accent ? "#f0c14a" : "#e8e8eb", letterSpacing: "-0.02em",
        }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: "relative", height: 4, background: "rgba(212,168,41,0.08)", borderRadius: 2 }}>
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: `${pct}%`, height: "100%",
          background: "linear-gradient(90deg, rgba(212,168,41,0) 0%, #d4a829 30%, #f0c14a 100%)",
          borderRadius: 2,
          boxShadow: "0 0 12px rgba(240,193,74,0.4)",
        }} />
        {/* Pulse spike at current position */}
        <div style={{
          position: "absolute",
          left: `calc(${pct}% - 6px)`,
          top: -7,
          width: 12, height: 18,
        }}>
          <svg width="12" height="18" viewBox="0 0 12 18">
            <path d="M0,9 L4,9 L5,3 L7,15 L8,9 L12,9" fill="none" stroke="#f0c14a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <input
          type="range" min={min} max={max} step={(max - min) / 200}
          value={value} onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute", inset: -10,
            width: "100%", height: 24,
            opacity: 0, cursor: "grab",
          }}
        />
      </div>
    </div>
  );
}

export default function PulseCalculator() {
  const [price, setPrice] = useState(420000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.875);
  const [term, setTerm] = useState(30);

  const result = useMemo(() => {
    const loan = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalInterest = monthly * n - loan;
    return { monthly, loan, totalInterest };
  }, [price, down, rate, term]);

  // Pulse spike when result changes
  const [pulseFlash, setPulseFlash] = useState(0);
  useEffect(() => { setPulseFlash(p => p + 1); }, [result.monthly]);

  const pathRef = useRef(null);
  useEffect(() => {
    if (!pathRef.current) return;
    let raf;
    let phase = 0;
    const animate = () => {
      phase += 0.012;
      // Tall central spike representing the result, tapered outward
      const points = Array.from({ length: 60 }, (_, i) => {
        const x = (i / 59) * 800;
        const dist = Math.abs(i - 30) / 30;
        const peak = (1 - dist) * (1 - dist);
        const wave = Math.sin(phase * 3 + i * 0.4) * 1.2 * (1 - peak * 0.5);
        const y = 90 - peak * 60 - wave;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      });
      pathRef.current.setAttribute("d", points.join(" "));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={{
      position: "relative",
      padding: "80px 32px 60px",
      background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,41,0.05) 0%, transparent 60%)",
    }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 24, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>
          Mortgage · California · Today
        </div>

        {/* The pulse + result composition */}
        <div style={{ position: "relative", height: 200, marginBottom: 12 }}>
          <svg width="100%" height="180" viewBox="0 0 800 180" preserveAspectRatio="none" style={{ display: "block" }}>
            {/* Faint grid lines for reading */}
            {[30, 60, 120, 150].map(y => (
              <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="rgba(212,168,41,0.04)" strokeWidth="1" strokeDasharray="1,6" />
            ))}
            {/* Pulse */}
            <path
              ref={pathRef}
              fill="none"
              stroke="url(#calc-pulse)"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ filter: "drop-shadow(0 0 12px rgba(240,193,74,0.5))" }}
            />
            <defs>
              <linearGradient id="calc-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a829" stopOpacity="0" />
                <stop offset="50%" stopColor="#f0c14a" stopOpacity="1" />
                <stop offset="100%" stopColor="#d4a829" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* The hero number, sitting on the peak of the pulse */}
          <div
            key={pulseFlash}
            style={{
              position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
              textAlign: "center",
              animation: "result-flash 0.6s ease-out",
            }}>
            <style>{`@keyframes result-flash { 0% { transform: translateX(-50%) scale(1.04); filter: drop-shadow(0 0 24px rgba(240,193,74,0.8)); } 100% { transform: translateX(-50%) scale(1); filter: drop-shadow(0 0 8px rgba(240,193,74,0.3)); } }`}</style>
            <div style={{
              fontSize: "clamp(56px, 9vw, 96px)",
              fontFamily: "'Inter', monospace",
              fontWeight: 200,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              background: "linear-gradient(180deg, #f7d278 0%, #d4a829 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 8px rgba(240,193,74,0.3))",
            }}>
              {fmt(Math.round(result.monthly))}
            </div>
            <div style={{
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.2em",
              color: "rgba(232,232,235,0.5)", fontFamily: "'DM Sans', sans-serif",
              marginTop: 6,
            }}>
              per month · principal &amp; interest
            </div>
          </div>
        </div>

        {/* Inputs as pulse sliders */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginTop: 48 }}>
          <PulseSlider label="Home price" min={100000} max={2000000} value={price} onChange={setPrice} format={fmt} accent />
          <PulseSlider label="Down payment" min={0} max={50} value={down} onChange={setDown} format={(n) => `${n.toFixed(0)}%`} />
          <PulseSlider label="Interest rate" min={3} max={10} value={rate} onChange={setRate} format={(n) => `${n.toFixed(3)}%`} />
          <PulseSlider label="Loan term" min={10} max={30} value={term} onChange={setTerm} format={(n) => `${n.toFixed(0)} yr`} />
        </div>

        {/* Secondary metrics in a horizontal flow */}
        <div style={{
          marginTop: 48, paddingTop: 28,
          borderTop: "1px solid rgba(212,168,41,0.08)",
          display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 20,
        }}>
          {[
            { label: "Loan amount", value: fmt(result.loan) },
            { label: "Total interest", value: fmt(result.totalInterest) },
            { label: "Down payment", value: fmt(price * down / 100) },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(232,232,235,0.4)", marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "'Inter', monospace", color: "#e8e8eb", letterSpacing: "-0.02em" }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

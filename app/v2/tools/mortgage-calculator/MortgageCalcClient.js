"use client";
import { useState, useMemo, useEffect, useRef } from "react";

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

// Pulse-driven slider input. The pulse spike marker moves with the slider.
function PulseSlider({ label, min, max, value, onChange, format, step }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
        <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(232,232,235,0.55)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
          {label}
        </span>
        <span style={{ fontSize: 18, fontFamily: "'Inter', monospace", fontWeight: 500, color: "#e8e8eb", letterSpacing: "-0.02em" }}>
          {format(value)}
        </span>
      </div>
      <div style={{ position: "relative", height: 4, background: "rgba(212,168,41,0.08)", borderRadius: 2 }}>
        <div style={{
          position: "absolute", left: 0, top: 0,
          width: `${pct}%`, height: "100%",
          background: "linear-gradient(90deg, rgba(212,168,41,0.2) 0%, #d4a829 50%, #f0c14a 100%)",
          borderRadius: 2,
          boxShadow: "0 0 10px rgba(240,193,74,0.4)",
        }} />
        <div style={{ position: "absolute", left: `calc(${pct}% - 6px)`, top: -7, width: 12, height: 18, pointerEvents: "none" }}>
          <svg width="12" height="18" viewBox="0 0 12 18">
            <path d="M0,9 L4,9 L5,3 L7,15 L8,9 L12,9" fill="none" stroke="#f0c14a" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <input
          type="range"
          min={min} max={max} step={step ?? (max - min) / 200}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ position: "absolute", inset: -12, width: "100%", height: 28, opacity: 0, cursor: "grab" }}
        />
      </div>
    </div>
  );
}

export default function MortgageCalcClient() {
  const [price, setPrice] = useState(420000);
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(6.875);
  const [term, setTerm] = useState(30);

  const result = useMemo(() => {
    const loan = price * (1 - down / 100);
    const r = rate / 100 / 12;
    const n = term * 12;
    const monthly = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return {
      loan,
      monthly,
      totalInterest: monthly * n - loan,
      downAmount: price * down / 100,
    };
  }, [price, down, rate, term]);

  // Result-driven pulse — the spike's height scales with the monthly payment relative to a baseline
  const baseline = 2500;
  const ratio = Math.min(1.4, Math.max(0.4, result.monthly / baseline));
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current) return;
    let raf;
    let phase = 0;
    const animate = () => {
      phase += 0.012;
      const points = Array.from({ length: 80 }, (_, i) => {
        const x = (i / 79) * 1000;
        const dist = Math.abs(i - 40) / 40;
        const peak = Math.pow(1 - dist, 2);
        const wave = Math.sin(phase * 3 + i * 0.4) * 1.4 * (1 - peak * 0.6);
        const y = 110 - peak * 78 * ratio - wave;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      });
      pathRef.current.setAttribute("d", points.join(" "));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [ratio]);

  return (
    <section style={{ maxWidth: 920, margin: "0 auto", padding: "32px 32px 60px" }}>
      {/* Result + intentional pulse */}
      <div style={{ position: "relative", height: 220, marginBottom: 12 }}>
        <svg width="100%" height="180" viewBox="0 0 1000 180" preserveAspectRatio="none">
          <line x1="0" y1="110" x2="1000" y2="110" stroke="rgba(212,168,41,0.06)" strokeWidth="1" strokeDasharray="2,5" />
          <path
            ref={pathRef}
            fill="none"
            stroke="url(#calc-grad)"
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 10px rgba(240,193,74,0.55))" }}
          />
          <defs>
            <linearGradient id="calc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a829" stopOpacity="0" />
              <stop offset="50%" stopColor="#f0c14a" stopOpacity="1" />
              <stop offset="100%" stopColor="#d4a829" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* The result above the pulse — text always foreground, no overlay */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center" }}>
          <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.22em", color: "rgba(212,168,41,0.7)", fontWeight: 700, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>
            Monthly payment
          </div>
          <div style={{
            fontSize: "clamp(56px, 9vw, 96px)",
            fontFamily: "'Inter', monospace",
            fontWeight: 200,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            background: "linear-gradient(180deg, #f7d278 0%, #d4a829 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            {fmt(Math.round(result.monthly))}
          </div>
          <div style={{ fontSize: 11, color: "rgba(232,232,235,0.5)", marginTop: 10, letterSpacing: "0.06em" }}>
            principal &amp; interest · {term}-year fixed
          </div>
        </div>
      </div>

      {/* Sliders */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, marginTop: 36 }}>
        <PulseSlider label="Home price" min={100000} max={2000000} step={5000} value={price} onChange={setPrice} format={fmt} />
        <PulseSlider label="Down payment" min={0} max={50} step={1} value={down} onChange={setDown} format={(n) => `${n.toFixed(0)}%`} />
        <PulseSlider label="Interest rate" min={3} max={10} step={0.005} value={rate} onChange={setRate} format={(n) => `${n.toFixed(3)}%`} />
        <PulseSlider label="Term" min={10} max={30} step={1} value={term} onChange={setTerm} format={(n) => `${n.toFixed(0)} yr`} />
      </div>

      {/* Secondary metrics */}
      <div style={{
        marginTop: 48, paddingTop: 28,
        borderTop: "1px solid rgba(212,168,41,0.08)",
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
      }}>
        {[
          { label: "Loan amount", value: fmt(result.loan) },
          { label: "Down payment", value: fmt(result.downAmount) },
          { label: "Total interest", value: fmt(result.totalInterest) },
        ].map((m, i) => (
          <div key={i} style={{ textAlign: "center", borderRight: i < 2 ? "1px solid rgba(212,168,41,0.06)" : "none", padding: "0 20px" }}>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(232,232,235,0.4)", marginBottom: 6, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontFamily: "'Inter', monospace", fontWeight: 500, color: "#e8e8eb", letterSpacing: "-0.02em" }}>{m.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

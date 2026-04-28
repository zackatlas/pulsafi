"use client";
import { useEffect, useState } from "react";

// Theme-agnostic living number. Renders whatever color the parent sets via
// `style` or `className`. Ramps from 0 on mount, then optionally micro-flutters.
//
// `format` is a string identifier — passing a function from a Server
// Component would error at the RSC boundary, so we use named formatters
// instead.
//   "percent3"  — "6.875%"
//   "percent2"  — "6.88%"
//   "currency0" — "$1,234"
//   "currency2" — "$1,234.56"
//   "int"       — "1,234"
//   "raw"       — "6.875"

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

const FORMATTERS = {
  percent3: (n) => `${n.toFixed(3)}%`,
  percent2: (n) => `${n.toFixed(2)}%`,
  currency0: (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n),
  currency2: (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n),
  int: (n) => Math.round(n).toLocaleString(),
  raw: (n) => String(n.toFixed(3)),
};

export default function LivingValue({
  value,
  format = "raw",
  duration = 1200,
  flutterAmount = 0,
  flutterInterval = 1800,
  className,
  style,
}) {
  const formatter = typeof format === "function" ? format : (FORMATTERS[format] || FORMATTERS.raw);
  const [display, setDisplay] = useState(0);
  const [arrived, setArrived] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setDisplay(value * easeOutExpo(t));
      if (t < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
        setArrived(true);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  useEffect(() => {
    if (!arrived || flutterAmount <= 0) return;
    let raf;
    let last = performance.now();
    let from = value, to = value, segStart = performance.now(), segDur = 600;
    const animate = (now) => {
      if (now - last >= flutterInterval) {
        from = to;
        to = value + (Math.random() - 0.5) * flutterAmount * 2;
        segStart = now;
        segDur = 400 + Math.random() * 600;
        last = now;
      }
      const t = Math.min(1, (now - segStart) / segDur);
      const eased = 0.5 - Math.cos(t * Math.PI) / 2;
      setDisplay(from + (to - from) * eased);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [arrived, value, flutterAmount, flutterInterval]);

  return <span className={className} style={style}>{formatter(display)}</span>;
}

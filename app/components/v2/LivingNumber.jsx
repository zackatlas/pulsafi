"use client";
import { useEffect, useState } from "react";

// A number that's alive. On mount it counts up from 0 to the target value
// (with the pulse implicit in the easing). Once arrived, it micro-flutters
// — tiny ±0.001 ticks so the page never feels frozen, like a real-time feed.

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export default function LivingNumber({
  value,                          // target numeric value
  format = (n) => n.toFixed(0),    // formatter for display
  duration = 1400,                 // ramp-up duration in ms
  flutterAmount = 0,               // ± value range for ongoing micro-flutter
  flutterInterval = 1800,          // ms between flutters
  className,
  style,
}) {
  const [display, setDisplay] = useState(0);
  const [arrived, setArrived] = useState(false);

  // Initial ramp animation
  useEffect(() => {
    let raf;
    const start = performance.now();
    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutExpo(t);
      setDisplay(value * eased);
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

  // Ongoing micro-flutter once arrived
  useEffect(() => {
    if (!arrived || flutterAmount <= 0) return;
    let raf;
    let lastFlutterAt = performance.now();
    let from = value;
    let to = value;
    let segStart = performance.now();
    let segDur = 600;

    const animate = (now) => {
      if (now - lastFlutterAt >= flutterInterval) {
        from = to;
        to = value + (Math.random() - 0.5) * flutterAmount * 2;
        segStart = now;
        segDur = 400 + Math.random() * 600;
        lastFlutterAt = now;
      }
      const t = Math.min(1, (now - segStart) / segDur);
      const eased = 0.5 - Math.cos(t * Math.PI) / 2;
      setDisplay(from + (to - from) * eased);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [arrived, value, flutterAmount, flutterInterval]);

  return <span className={className} style={style}>{format(display)}</span>;
}

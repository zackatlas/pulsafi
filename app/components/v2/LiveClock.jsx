"use client";
import { useEffect, useState } from "react";

// A live ticking timestamp. Updates every second so the page never feels
// like a static document. Format: "Markets pulsing · 14:23:45 EDT".

function pad(n) { return String(n).padStart(2, "0"); }

export default function LiveClock({ label = "Markets pulsing" }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const hh = pad(d.getHours());
      const mm = pad(d.getMinutes());
      const ss = pad(d.getSeconds());
      // Get user's timezone abbreviation
      const tz = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" })
        .formatToParts(d).find(p => p.type === "timeZoneName")?.value || "";
      setTime(`${hh}:${mm}:${ss} ${tz}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 12,
      background: "rgba(8,9,12,0.5)", backdropFilter: "blur(8px)",
      padding: "8px 14px", borderRadius: 999,
      border: "1px solid rgba(212,168,41,0.18)",
      fontFamily: "'Inter', monospace", fontSize: 11,
      color: "rgba(232,232,235,0.7)", letterSpacing: "0.04em",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: "#f0c14a",
        boxShadow: "0 0 0 0 rgba(240,193,74,0.6)",
        animation: "live-clock 1s ease-in-out infinite",
      }} />
      <style>{`@keyframes live-clock { 0%,100%{box-shadow:0 0 0 0 rgba(240,193,74,0.6);} 50%{box-shadow:0 0 0 5px rgba(240,193,74,0);} }`}</style>
      <span style={{ color: "rgba(232,232,235,0.55)", textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "'DM Sans', sans-serif", fontSize: 10 }}>{label}</span>
      <span style={{ color: "#f0c14a", fontWeight: 600 }}>{time}</span>
    </div>
  );
}

"use client";
import { useState } from "react";

export default function EmailCapture({
  source,
  headline = "Get The Pulse — Weekly money insights",
  subhead = "Markets, rate moves, and the tools we publish. No spam, unsubscribe anytime.",
  cta = "Subscribe",
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("Something went wrong — try again");
    }
  };

  if (status === "success") {
    return (
      <div style={{
        background: "linear-gradient(135deg, var(--accent-bg) 0%, var(--bg-card) 100%)",
        border: "1px solid var(--accent-border)", borderRadius: 14, padding: "22px 24px", textAlign: "center",
      }}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>✓</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>You're in</div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>Check your inbox to confirm.</div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{
      background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 14,
      padding: "22px 24px",
    }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>{headline}</div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 14 }}>{subhead}</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email" inputMode="email" autoComplete="email" placeholder="you@example.com"
          value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
          style={{
            flex: 1, minWidth: 200, background: "var(--bg-input)", border: "1px solid var(--border-input)",
            borderRadius: 9, padding: "11px 14px", color: "var(--text-primary)", fontSize: 14,
            fontFamily: "'Inter', monospace", outline: "none",
          }}
        />
        <button type="submit" disabled={status === "loading"} style={{
          background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
          color: "#0d0f13", border: "none", padding: "11px 22px", borderRadius: 9,
          fontWeight: 700, fontSize: 14, cursor: status === "loading" ? "wait" : "pointer",
          opacity: status === "loading" ? 0.6 : 1,
        }}>
          {status === "loading" ? "..." : cta}
        </button>
      </div>
      {error && <div style={{ fontSize: 12, color: "#e74c3c", marginTop: 8 }}>{error}</div>}
    </form>
  );
}

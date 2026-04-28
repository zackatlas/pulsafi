"use client";
import { useState, useEffect, useRef } from "react";

// Drop-in share button for calculator results.
// The calculator passes a `params` object — keys/values that fully encode
// the current state. ShareResult turns those into a URL search string
// against the current pathname and exposes copy / native-share / social
// shortcuts. The whole point: every share is a permalink that pre-fills
// the same scenario for whoever clicks it.

export default function ShareResult({
  params = {},                       // { p: 400000, d: 20, r: 6.875, t: 30 }
  shareTitle = "Check out my Pulsafi result",
  shareText = "I just ran the numbers on Pulsafi.",
  ogTitleOverride,                   // optional: what to encode in OG image URL
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const dialogRef = useRef(null);

  // Build the shareable URL from current pathname + params.
  // We also push the params into the browser URL on mount so refreshing
  // the page keeps the same scenario.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const search = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") search.set(k, String(v));
    });
    const full = `${window.location.origin}${window.location.pathname}${search.toString() ? "?" + search.toString() : ""}`;
    setUrl(full);

    // Update browser URL silently so refresh / copy-from-address-bar both work.
    if (search.toString()) {
      const newPath = `${window.location.pathname}?${search.toString()}`;
      window.history.replaceState(null, "", newPath);
    }
  }, [params]);

  // Close on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    const onClick = (e) => { if (dialogRef.current && !dialogRef.current.contains(e.target)) setOpen(false); };
    window.addEventListener("keydown", onKey);
    setTimeout(() => window.addEventListener("click", onClick), 0);
    return () => { window.removeEventListener("keydown", onKey); window.removeEventListener("click", onClick); };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById("pulsafi-share-input");
      if (el) { el.select(); document.execCommand("copy"); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: shareTitle, text: shareText, url }); } catch {}
    } else {
      copy();
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
  const redditUrl = `https://reddit.com/submit?title=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "var(--bg-card)",
          border: "1px solid var(--accent-border)",
          color: "var(--accent)",
          padding: "10px 16px",
          borderRadius: 9,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600, fontSize: 13,
          cursor: "pointer",
          transition: "background 0.15s ease, border-color 0.15s ease",
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = "var(--accent-bg)"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = "var(--bg-card)"; }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Share my result
      </button>

      {open && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "rgba(13,15,19,0.55)",
            backdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 16,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div
            ref={dialogRef}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: 16,
              padding: "28px 28px 22px",
              maxWidth: 460, width: "100%",
              boxShadow: "0 24px 64px rgba(0,0,0,0.32)",
              position: "relative",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "transparent", border: "none",
                color: "var(--text-faint)", fontSize: 20, lineHeight: 1,
                cursor: "pointer", padding: 4,
              }}
            >×</button>

            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 6 }}>
              Permalink
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, margin: "0 0 8px", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Share your result
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 18px", lineHeight: 1.6 }}>
              Anyone who clicks this link sees the exact same scenario you&rsquo;re looking at, with the values pre-filled.
            </p>

            <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
              <input
                id="pulsafi-share-input"
                readOnly value={url}
                onFocus={(e) => e.target.select()}
                style={{
                  flex: 1,
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  color: "var(--text-primary)",
                  fontFamily: "'Inter', monospace",
                  fontSize: 13,
                  outline: "none",
                }}
              />
              <button
                onClick={copy}
                style={{
                  background: copied
                    ? "linear-gradient(135deg, #2ecc71, #27ae60)"
                    : "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: copied ? "#fff" : "#0d0f13",
                  border: "none", padding: "10px 18px", borderRadius: 8,
                  fontWeight: 700, fontSize: 13, cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              <button
                onClick={nativeShare}
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  color: "var(--text-primary)",
                  padding: "11px 14px",
                  borderRadius: 8,
                  fontWeight: 600, fontSize: 13,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                📲 Share
              </button>
              <a
                href={twitterUrl} target="_blank" rel="noopener"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  color: "var(--text-primary)",
                  padding: "11px 14px",
                  borderRadius: 8,
                  fontWeight: 600, fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                𝕏 Tweet
              </a>
              <a
                href={redditUrl} target="_blank" rel="noopener"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  color: "var(--text-primary)",
                  padding: "11px 14px",
                  borderRadius: 8,
                  fontWeight: 600, fontSize: 13,
                  textDecoration: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Reddit
              </a>
              <a
                href={facebookUrl} target="_blank" rel="noopener"
                style={{
                  background: "var(--bg-input)",
                  border: "1px solid var(--border-input)",
                  color: "var(--text-primary)",
                  padding: "11px 14px",
                  borderRadius: 8,
                  fontWeight: 600, fontSize: 13,
                  textDecoration: "none",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
              >
                Facebook
              </a>
            </div>

            <div style={{ fontSize: 11, color: "var(--text-faint)", textAlign: "center", lineHeight: 1.5 }}>
              The link contains your scenario values, not personal info.
            </div>
          </div>
        </div>
      )}
    </>
  );
}

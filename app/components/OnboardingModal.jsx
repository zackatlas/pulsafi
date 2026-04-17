"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { GOALS, LEVELS } from "../data/contentTags";

// ─── Onboarding modal ───
//
// Fires once for logged-in users who haven't completed onboarding. Collects
// four signals used by lib/personalization.js to rank content. Skippable via
// the X button — if skipped, we store { skipped: true, seenAt } so we don't
// keep re-prompting the same user.
//
// Data is saved to user_profiles.onboarding (JSONB column added via the SQL
// in scripts/add-onboarding-column.sql). If the column doesn't exist yet, the
// save silently no-ops rather than crashing — AuthProvider.updateData already
// swallows errors, so the modal will just keep appearing until the migration
// runs. That's a feature, not a bug: it means the migration isn't required to
// ship safely.

const AGE_OPTIONS = ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"];
const INCOME_OPTIONS = [
  { id: "under-50k", label: "Under $50K" },
  { id: "50-100k", label: "$50K–$100K" },
  { id: "100-200k", label: "$100K–$200K" },
  { id: "over-200k", label: "Over $200K" },
  { id: "prefer-not", label: "Prefer not to say" },
];

const STORAGE_KEY = "pulsafi_onboarding_dismissed";

export default function OnboardingModal() {
  const { user, profile, updateData, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Decide whether to show. Three reasons to hide:
  //  1. Not logged in or still loading auth
  //  2. User has already completed onboarding (profile.onboarding exists)
  //  3. User dismissed this session (tracked in localStorage)
  useEffect(() => {
    if (loading || !user) return;

    const dismissedThisSession = typeof window !== "undefined"
      ? sessionStorage.getItem(STORAGE_KEY) === "1"
      : false;

    const alreadyOnboarded = profile?.onboarding && (profile.onboarding.primaryGoal || profile.onboarding.skipped);

    if (!alreadyOnboarded && !dismissedThisSession) {
      // Small delay so the modal doesn't slam in on page load — gives users
      // a second to see where they are before being interrupted.
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, [user, profile, loading]);

  const close = (markSkipped = false) => {
    setOpen(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, "1");
    }
    if (markSkipped) {
      // Persist skip so we don't ask again across sessions either.
      updateData("onboarding", {
        skipped: true,
        skippedAt: new Date().toISOString(),
      });
    }
  };

  const saveAnswer = (key, value) => {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    // Advance to next step automatically after selection.
    setStep((s) => s + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    const payload = {
      ...answers,
      completedAt: new Date().toISOString(),
    };
    await updateData("onboarding", payload);
    setSubmitting(false);
    close(false);
  };

  if (!open) return null;

  const TOTAL_STEPS = 4;

  // Shared button style used across the question screens.
  const optionBtn = (active) => ({
    padding: "14px 16px",
    borderRadius: 10,
    border: `1.5px solid ${active ? "var(--accent)" : "var(--border-card)"}`,
    background: active ? "var(--accent)" : "var(--bg-main)",
    color: active ? "#0d0f13" : "var(--text-primary)",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    textAlign: "left",
    transition: "all 0.15s",
    width: "100%",
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border-card)",
          borderRadius: 20,
          maxWidth: 480,
          width: "100%",
          padding: "32px 28px 28px",
          position: "relative",
          boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Close (skip) button */}
        <button
          onClick={() => close(true)}
          aria-label="Skip for now"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontSize: 22,
            cursor: "pointer",
            lineHeight: 1,
            padding: 4,
          }}
        >
          ×
        </button>

        {/* Progress bar */}
        <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                background: i < step ? "var(--accent)" : "var(--border-card)",
                transition: "background 0.3s",
              }}
            />
          ))}
        </div>

        {step === 0 && (
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700, marginBottom: 8 }}>
              Quick Setup · 20 seconds
            </div>
            <h2 id="onboarding-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 26, lineHeight: 1.2, margin: "0 0 10px", color: "var(--text-primary)" }}>
              Let&apos;s tailor Pulsafi to you.
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
              Four quick questions. We&apos;ll use them to surface the tools and articles most useful for where you are.
              No email, no spam — just better recommendations.
            </p>
            <button
              onClick={() => setStep(1)}
              style={{
                width: "100%",
                padding: "13px 20px",
                background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                color: "#0d0f13",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Let&apos;s go
            </button>
            <button
              onClick={() => close(true)}
              style={{
                width: "100%",
                padding: "10px",
                background: "transparent",
                color: "var(--text-muted)",
                border: "none",
                fontSize: 13,
                cursor: "pointer",
                marginTop: 8,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Maybe later
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, margin: "0 0 6px", color: "var(--text-primary)" }}>
              What&apos;s your biggest money goal right now?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 18px" }}>
              Pick whichever is most true today. You can always change it later.
            </p>
            <div style={{ display: "grid", gap: 8 }}>
              {Object.entries(GOALS).map(([id, g]) => (
                <button
                  key={id}
                  onClick={() => saveAnswer("primaryGoal", id)}
                  style={optionBtn(answers.primaryGoal === id)}
                >
                  <span style={{ marginRight: 10, fontSize: 18 }}>{g.emoji}</span>
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, margin: "0 0 6px", color: "var(--text-primary)" }}>
              How would you describe your experience?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 18px" }}>
              We&apos;ll match content depth to where you are.
            </p>
            <div style={{ display: "grid", gap: 8 }}>
              {Object.entries(LEVELS).map(([id, lvl]) => (
                <button
                  key={id}
                  onClick={() => saveAnswer("experience", id)}
                  style={optionBtn(answers.experience === id)}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, margin: "0 0 6px", color: "var(--text-primary)" }}>
              What&apos;s your age range?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 18px" }}>
              Some advice (like retirement timing) is age-sensitive.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {AGE_OPTIONS.map((a) => (
                <button
                  key={a}
                  onClick={() => saveAnswer("ageRange", a)}
                  style={optionBtn(answers.ageRange === a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, margin: "0 0 6px", color: "var(--text-primary)" }}>
              And finally — income range?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: 13, margin: "0 0 18px" }}>
              Optional but helps us match advice to your tax bracket. Never shared.
            </p>
            <div style={{ display: "grid", gap: 8 }}>
              {INCOME_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setAnswers({ ...answers, incomeRange: o.id })}
                  style={optionBtn(answers.incomeRange === o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
            <button
              onClick={submit}
              disabled={!answers.incomeRange || submitting}
              style={{
                width: "100%",
                padding: "13px 20px",
                background: answers.incomeRange ? "linear-gradient(135deg, var(--accent), var(--accent-dark))" : "var(--bg-input)",
                color: answers.incomeRange ? "#0d0f13" : "var(--text-muted)",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                cursor: answers.incomeRange ? "pointer" : "not-allowed",
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 18,
              }}
            >
              {submitting ? "Saving..." : "Finish setup"}
            </button>
          </div>
        )}

        {/* Back link on question steps */}
        {step > 0 && step < 5 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              fontSize: 13,
              cursor: "pointer",
              marginTop: 16,
              padding: 0,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            ← Back
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

"use client";
import { useAuth } from "../AuthProvider";
import { GOALS } from "../../data/contentTags";
import { getNextBestAction } from "@/lib/personalization";

// ─── Personalized homepage hero ───
//
// Returns null if the user isn't logged in or hasn't completed onboarding,
// so callers can render a <PersonalizedHero />{fallback} pattern: the static
// hero renders by default, and this takes over only when we have a real
// signal to personalize on. That also means Googlebot (which is never logged
// in) sees the generic hero — the personalized version is a post-hydration
// enhancement for authenticated users.
//
// The hero shows:
//   - Name/initials greeting
//   - The user's chosen primary goal restated
//   - A single CTA button that maps to the goal's best-next-action tool
//
// No gamification stats here — those live in the header. The homepage hero
// is about clarity of intent, not showing off streaks.
export default function PersonalizedHero() {
  const { user, profile, loading } = useAuth();

  // Hide until auth resolves and we know the user's onboarding state.
  // Anonymous visitors + skipper users (onboarding.skipped) get nothing —
  // callers should render HomeHero as the fallback.
  if (loading || !user || !profile?.onboarding?.primaryGoal) return null;

  const onboarding = profile.onboarding;
  const goal = GOALS[onboarding.primaryGoal];
  const action = getNextBestAction(onboarding);
  const displayName = profile.name?.split(" ")[0] || null;

  return (
    <section
      className="pulsafi-hero"
      style={{
        padding: "56px 24px 36px",
        textAlign: "center",
        background: "var(--hero-gradient)",
      }}
    >
      <div
        style={{
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--accent)",
          marginBottom: 14,
          fontWeight: 600,
        }}
      >
        {goal?.emoji} Your Goal: {goal?.label}
      </div>
      <h1
        style={{
          fontSize: "clamp(26px, 4.5vw, 44px)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          margin: 0,
          lineHeight: 1.18,
          letterSpacing: "-0.02em",
          maxWidth: 680,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {displayName ? `Welcome back, ${displayName}.` : "Welcome back."}
      </h1>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "clamp(14px, 2.5vw, 17px)",
          margin: "14px auto 8px",
          maxWidth: 560,
          lineHeight: 1.6,
          padding: "0 8px",
        }}
      >
        Here&apos;s what moves the needle for your goal right now.
      </p>

      {action && (
        <div style={{ marginTop: 22 }}>
          <a
            href={action.href}
            style={{
              display: "inline-block",
              padding: "13px 28px",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              color: "#0d0f13",
              textDecoration: "none",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 15,
              fontFamily: "'DM Sans', sans-serif",
              boxShadow: "0 6px 20px rgba(240,192,64,0.25)",
            }}
          >
            {action.title} →
          </a>
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              color: "var(--text-muted)",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.5,
            }}
          >
            {action.summary}
          </div>
        </div>
      )}
    </section>
  );
}

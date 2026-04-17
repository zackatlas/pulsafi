"use client";
import { useAuth } from "./AuthProvider";
import { GOALS } from "../data/contentTags";
import {
  getRecommendedArticles,
  getRecommendedTools,
  getNextBestAction,
} from "@/lib/personalization";

// ─── Recommended For You ───
//
// Renders a personalized content block. Expects the user to be logged in and
// to have completed onboarding — otherwise returns null so callers don't
// have to branch on it.
//
// Three sections:
//   1. "Next best action" — one big CTA tied to the user's primary goal
//   2. Two recommended tools
//   3. Four recommended articles
//
// Scoring is deterministic (see lib/personalization.js), so the same user
// sees the same ranking every time unless their onboarding data changes.

export default function RecommendedForYou({ compact = false }) {
  const { profile } = useAuth();
  const onboarding = profile?.onboarding;

  // Show nothing until the user has completed onboarding with a real goal.
  // Skippers (onboarding.skipped === true) also get nothing — no signal, no
  // point pretending we have one.
  if (!onboarding?.primaryGoal) return null;

  const goal = GOALS[onboarding.primaryGoal];
  const nextAction = getNextBestAction(onboarding);
  const tools = getRecommendedTools(onboarding, compact ? 2 : 3);
  const articles = getRecommendedArticles(onboarding, compact ? 3 : 4);

  return (
    <section
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-card)",
        borderRadius: 16,
        padding: "20px 20px 24px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 18 }}>{goal?.emoji}</span>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontWeight: 700 }}>
          Recommended for You
        </div>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, margin: "0 0 18px", color: "var(--text-primary)" }}>
        Based on your goal: {goal?.label?.toLowerCase()}
      </h2>

      {/* Next best action — the single highest-leverage CTA */}
      {nextAction && (
        <a
          href={nextAction.href}
          style={{
            display: "block",
            textDecoration: "none",
            color: "inherit",
            background: "linear-gradient(135deg, rgba(240,192,64,0.12), rgba(240,192,64,0.04))",
            border: "1px solid var(--accent)",
            borderRadius: 12,
            padding: "16px 18px",
            marginBottom: 16,
          }}
        >
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent)", fontWeight: 700, marginBottom: 4 }}>
            Start here →
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
            {nextAction.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {nextAction.summary}
          </div>
        </a>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontWeight: 600, margin: "18px 0 10px" }}>
            Tools for you
          </div>
          <div style={{ display: "grid", gridTemplateColumns: compact ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: 8, marginBottom: 4 }}>
            {tools.map((t) => (
              <a
                key={t.slug}
                href={t.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-card)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "block",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                  {t.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  {t.summary}
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontWeight: 600, margin: "18px 0 10px" }}>
            Articles to read next
          </div>
          <div style={{ display: "grid", gap: 8 }}>
            {articles.map((a) => (
              <a
                key={a.slug}
                href={a.href}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-card)",
                  borderRadius: 10,
                  padding: "12px 14px",
                  display: "block",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 2 }}>
                  {a.title}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.4 }}>
                  {a.summary}
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

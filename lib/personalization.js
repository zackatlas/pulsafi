import {
  ARTICLE_TAGS,
  ARTICLE_META,
  TOOL_TAGS,
  TOOL_META,
} from "@/app/data/contentTags";

// ─── Personalization helpers ───
//
// Scoring approach: simple additive. Each content item starts at 0 and earns
// points for matching the user's onboarding signals. The higher the score,
// the earlier it surfaces. We intentionally keep this dumb — no ML, no
// weights learned from behavior — so the logic is predictable and debuggable.
//
// Callers pass in the `onboarding` object as stored on user_profiles. If it's
// missing or partial, scoring falls back gracefully (items tied to the user's
// one known signal still win; unmatched items are still returned, just lower).

function stageFromAge(ageRange) {
  if (!ageRange) return null;
  if (ageRange === "18-24") return "18-29";
  if (ageRange === "25-34") return "18-29";
  if (ageRange === "35-44") return "30-44";
  if (ageRange === "45-54") return "45-plus";
  if (ageRange === "55-64") return "45-plus";
  if (ageRange === "65+") return "45-plus";
  return null;
}

function levelRank(level) {
  // Map content difficulty to a numeric rank so we can compare against the
  // user's self-reported experience. "new" users get a penalty when we try to
  // show them "advanced" content, and vice versa.
  if (level === "beginner") return 1;
  if (level === "intermediate") return 2;
  if (level === "advanced") return 3;
  return 2;
}

function userLevelRank(experience) {
  if (experience === "new") return 1;
  if (experience === "some") return 2;
  if (experience === "seasoned") return 3;
  return 2;
}

function scoreItem(tags, onboarding) {
  if (!tags) return 0;
  let score = 0;

  if (onboarding?.primaryGoal && tags.goals?.includes(onboarding.primaryGoal)) {
    score += 100;
  }

  const stage = stageFromAge(onboarding?.ageRange);
  if (stage && tags.stages?.includes(stage)) {
    score += 20;
  } else if (tags.stages && stage && !tags.stages.includes(stage)) {
    // Item is age-targeted at a different stage — downrank it.
    score -= 30;
  }

  if (onboarding?.experience) {
    const uRank = userLevelRank(onboarding.experience);
    const cRank = levelRank(tags.level);
    const gap = Math.abs(uRank - cRank);
    // Matching levels win +10, off-by-one is neutral, off-by-two is -15.
    if (gap === 0) score += 10;
    else if (gap >= 2) score -= 15;
  }

  return score;
}

function rankItems(entries, onboarding) {
  const scored = entries.map(([slug, tags]) => ({
    slug,
    tags,
    score: scoreItem(tags, onboarding),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored;
}

export function getRecommendedArticles(onboarding, limit = 4) {
  const ranked = rankItems(Object.entries(ARTICLE_TAGS), onboarding);
  return ranked.slice(0, limit).map(({ slug, score }) => ({
    slug,
    href: `/learn/${slug}`,
    score,
    ...ARTICLE_META[slug],
  }));
}

export function getRecommendedTools(onboarding, limit = 3) {
  const ranked = rankItems(Object.entries(TOOL_TAGS), onboarding);
  return ranked.slice(0, limit).map(({ slug, score }) => ({
    slug,
    href: `/tools/${slug}`,
    score,
    ...TOOL_META[slug],
  }));
}

// Pick a single "Next best action" — prefer tools when a clear goal is set,
// since tools drive real engagement better than reading does.
export function getNextBestAction(onboarding) {
  if (!onboarding?.primaryGoal) return null;

  const goal = onboarding.primaryGoal;
  const preset = {
    "pay-off-debt": {
      href: "/tools/debt-payoff-calculator",
      title: "Run your debt payoff plan",
      summary: "See how fast you can be debt-free with avalanche vs snowball.",
    },
    "save-for-house": {
      href: "/tools/mortgage-calculator",
      title: "Plan your future mortgage",
      summary: "See what payment you'd have at today's rates on your target price.",
    },
    "retire-early": {
      href: "/tools/fire-calculator",
      title: "Find your FIRE number",
      summary: "See exactly when you could retire at your current savings rate.",
    },
    "build-wealth": {
      href: "/tools/compound-interest-calculator",
      title: "See your money compound",
      summary: "Model your growth at different savings rates and returns.",
    },
    "just-learning": {
      href: "/tools/financial-health-score",
      title: "Get your financial health score",
      summary: "One number to see where you stand — plus where to focus first.",
    },
  };

  return preset[goal] ?? null;
}

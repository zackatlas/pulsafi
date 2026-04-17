-- Adds the `onboarding` JSONB column to user_profiles so the OnboardingModal
-- can persist user goal/experience/age/income answers. Idempotent — safe to
-- run multiple times.
--
-- How to apply:
--   1. Open your Supabase project → SQL Editor
--   2. Paste everything in this file
--   3. Click "Run"
--
-- Until this runs, the modal will keep asking users because the client-side
-- save silently no-ops when the column doesn't exist. Run it once and the
-- modal starts working.

alter table public.user_profiles
  add column if not exists onboarding jsonb;

-- Optional: comment for future humans reading the schema.
comment on column public.user_profiles.onboarding is
  'Onboarding answers: { primaryGoal, experience, ageRange, incomeRange, completedAt } or { skipped: true, skippedAt }. Used by lib/personalization.js to rank content.';

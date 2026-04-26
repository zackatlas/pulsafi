// Pulse signature generator — turns data into an intentional pulse waveform.
//
// Every Pulsafi v2 page passes its own data into one of these functions; the
// resulting signature is what the <DataPulse> component animates. The shape
// of the pulse IS the data. Different pages render visibly different rhythms.

// Normalize an array of numbers to a signed range [-1, 1].
// Used so a 30-year rate history (in %) maps to the same visual scale as
// a salary trend (in $) or a debt balance (in $).
function normalize(values, opts = {}) {
  if (!values || values.length === 0) return [];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  if (range === 0) return values.map(() => 0);
  const center = (min + max) / 2;
  const half = range / 2;
  return values.map(v => (v - center) / half);
}

// Build a 60-point signature for the AmbientPulseBar header strip.
// `signal` is the dominant feature (one big spike + small ambient ripples).
// `magnitude` is how dramatic the spike is (0 to 1).
export function ambientFromMetric({ history = [], magnitude = 0.7, position = 0.5 }) {
  const pts = [];
  const len = 60;
  const spikeIdx = Math.round(position * len);
  // Use last few history points to set ambient ripple amplitude
  const recent = history.slice(-12);
  const recentVar = recent.length > 1
    ? Math.max(...recent) - Math.min(...recent)
    : 0;
  const rippleAmp = Math.min(0.18, recentVar * 8);

  for (let i = 0; i < len; i++) {
    const dist = Math.abs(i - spikeIdx);
    const spike = dist === 0 ? -magnitude
      : dist === 1 ? magnitude * 0.7
      : dist === 2 ? -magnitude * 0.3
      : 0;
    const ripple = Math.sin((i / len) * Math.PI * 4) * rippleAmp;
    pts.push(spike + ripple);
  }
  return pts;
}

// Build a "data trail" signature — the pulse traces the actual data history.
// Used in dual-pulse comparisons and time pulses.
export function trailFromHistory(values, { points = 80 } = {}) {
  if (values.length === 0) return new Array(points).fill(0);
  const normalized = normalize(values);
  // Resample to `points` length using linear interpolation
  const out = [];
  for (let i = 0; i < points; i++) {
    const t = (i / (points - 1)) * (normalized.length - 1);
    const lo = Math.floor(t);
    const hi = Math.min(lo + 1, normalized.length - 1);
    const frac = t - lo;
    out.push(normalized[lo] * (1 - frac) + normalized[hi] * frac);
  }
  return out;
}

// Calculator-result signature — peak in the middle, magnitude scales with
// how far the result is from a baseline.
export function resultPulse({ value, baseline, max }) {
  const len = 60;
  const ratio = baseline > 0 ? Math.min(1.2, (value - baseline) / baseline) : 0;
  const magnitude = Math.min(1, 0.4 + Math.abs(ratio) * 0.6);
  return ambientFromMetric({ magnitude, position: 0.5 });
}

// Milestone pulse — for life-timeline pulses with multiple spikes.
export function milestonePulse({ milestones = [], totalSpan = 48, points = 240 }) {
  const out = new Array(points).fill(0);
  for (const m of milestones) {
    const center = Math.round((m.position / totalSpan) * points);
    const height = Math.min(1, m.magnitude || 0.6);
    if (center >= 0 && center < points) {
      out[center] = -height;
      if (center > 0) out[center - 1] = height * 0.55;
      if (center < points - 1) out[center + 1] = -height * 0.3;
    }
  }
  return out;
}

// Sample data exports — used by archetype pages so they aren't all the same.

// 30-day mortgage rate history (sample, near-realistic for 2026)
export const SAMPLE_30YR_RATE_30D = [
  6.998, 6.985, 6.972, 6.965, 6.958, 6.961, 6.954, 6.948, 6.940, 6.932,
  6.925, 6.918, 6.910, 6.902, 6.898, 6.901, 6.895, 6.890, 6.882, 6.879,
  6.871, 6.875, 6.868, 6.862, 6.870, 6.876, 6.880, 6.872, 6.875, 6.875,
];

// California 30-day rate history (slightly below national)
export const SAMPLE_CA_30YR_30D = [
  6.876, 6.864, 6.852, 6.845, 6.838, 6.841, 6.834, 6.828, 6.820, 6.812,
  6.805, 6.798, 6.790, 6.782, 6.778, 6.781, 6.775, 6.770, 6.762, 6.759,
  6.751, 6.755, 6.748, 6.742, 6.750, 6.756, 6.760, 6.752, 6.755, 6.755,
];

// 30-day HYSA rate history (slow drift)
export const SAMPLE_HYSA_30D = [
  4.55, 4.55, 4.54, 4.53, 4.52, 4.52, 4.51, 4.50, 4.50, 4.50,
  4.49, 4.48, 4.48, 4.48, 4.48, 4.49, 4.49, 4.49, 4.49, 4.50,
  4.50, 4.50, 4.50, 4.50, 4.50, 4.50, 4.50, 4.50, 4.50, 4.50,
];

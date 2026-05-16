export const metadata = {
  // Title template needed here so child /tools/[tool] layouts inherit the
  // "| Pulsafi" suffix (root template doesn't propagate across nested layouts).
  title: {
    default: 'Free Financial Calculators & Tools',
    template: '%s | Pulsafi',
  },
  description: 'Professional-grade financial calculators — free forever, no signup. Mortgage, compound interest, FIRE, debt payoff, budget, net worth, and more.',
  keywords: ['financial calculator', 'mortgage calculator', 'compound interest calculator', 'FIRE calculator', 'debt payoff calculator', 'budget calculator', 'net worth calculator', 'retirement calculator', 'free financial tools'],
  alternates: {
    canonical: 'https://www.pulsafi.com/tools',
  },
  openGraph: {
    title: 'Free Financial Calculators & Tools',
    description: 'Professional-grade financial calculators — free forever, no signup. Mortgage, compound interest, FIRE, debt payoff, budget, net worth, and more.',
    url: 'https://www.pulsafi.com/tools',
    type: 'website',
    images: [{ url: 'https://www.pulsafi.com/api/og?title=Free%20Financial%20Tools&subtitle=14%20Professional-Grade%20Calculators&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Financial Calculators & Tools',
    description: 'Professional-grade financial calculators — free forever, no signup.',
    images: ['https://www.pulsafi.com/api/og?title=Free%20Financial%20Tools&subtitle=14%20Professional-Grade%20Calculators&type=tool'],
  },
};

export default function Layout({ children }) { return children; }

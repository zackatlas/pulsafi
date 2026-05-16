export const metadata = {
  // Define our own template so it propagates to child route segments
  // (e.g. /learn/[article]). Without this, deeply nested layout titles
  // bypass the root template and render without the "| Pulsafi" suffix.
  title: {
    default: 'Learn Finance — Free Interactive Lessons',
    template: '%s | Pulsafi',
  },
  description: 'Master personal finance with interactive lessons and in-depth articles. Budgeting, investing, debt, taxes, retirement, and more. Earn XP, build streaks, and track your progress. 100% free.',
  keywords: ['learn finance', 'financial literacy', 'personal finance course', 'investing for beginners', 'budgeting guide', 'debt payoff strategies', 'retirement planning', 'free financial education'],
  alternates: {
    canonical: 'https://www.pulsafi.com/learn',
  },
  openGraph: {
    title: 'Learn Finance — Free Interactive Lessons',
    description: 'Duolingo-style financial literacy. Interactive lessons, in-depth articles, streaks, and XP. Free.',
    url: 'https://www.pulsafi.com/learn',
    type: 'website',
    images: [{ url: 'https://www.pulsafi.com/api/og?title=Learn%20Finance&subtitle=Free%20Interactive%20Lessons%20%26%20Articles&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learn Finance — Free Interactive Lessons',
    description: 'Duolingo-style financial literacy. Interactive lessons, articles, and XP. Free.',
    images: ['https://www.pulsafi.com/api/og?title=Learn%20Finance&subtitle=Free%20Interactive%20Lessons%20%26%20Articles&type=article'],
  },
};
export default function Layout({ children }) { return children; }

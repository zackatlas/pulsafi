export const metadata = {
  title: 'Money Personality Quiz — What Type Are You?',
  description: 'Discover your financial personality in 2 minutes. Are you a Builder, Guardian, Explorer, or Strategist? Take the free quiz and get personalized tool recommendations.',
  openGraph: {
    title: "What's Your Money Personality? — Pulsafi Quiz",
    description: 'Are you a Builder, Guardian, Explorer, or Strategist? 7 questions, 2 minutes, free.',
    url: 'https://pulsafi.com/quiz',
    images: [{ url: '/api/og?title=Money+Personality+Quiz&subtitle=Discover+Your+Financial+Type&type=game', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Money+Personality+Quiz&subtitle=Discover+Your+Financial+Type&type=game'],
  },
}
export default function Layout({ children }) { return children; }

export const metadata = {
  title: 'Play — Financial Games & Quizzes',
  description: 'Play daily financial games and quizzes. The Daily Pulse guessing game, Money Personality Quiz, and more. Free, shareable, and surprisingly addictive.',
  openGraph: {
    title: 'Financial Games & Quizzes — Pulsafi',
    description: 'Daily games that make you smarter about money. Play, share, challenge friends.',
    url: 'https://pulsafi.com/play',
    images: [{ url: '/api/og?title=Play&subtitle=Financial+Games+%26+Quizzes&type=game', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Play&subtitle=Financial+Games+%26+Quizzes&type=game'],
  },
}
export default function Layout({ children }) { return children; }

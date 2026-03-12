export const metadata = {
  title: 'Leaderboard — ELO Rankings & Stats',
  description: 'Track your Daily Pulse ELO rating, streaks, percentile ranking, and compete against players worldwide. Chess.com-style rating system for financial knowledge.',
  openGraph: {
    title: 'Daily Pulse Leaderboard — Pulsafi',
    description: 'Global ELO rankings for the Daily Pulse financial guessing game. Track your stats and compete.',
    url: 'https://pulsafi.com/leaderboard',
    images: [{ url: '/api/og?title=Leaderboard&subtitle=ELO+Rankings+%26+Stats&type=game', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Leaderboard&subtitle=ELO+Rankings+%26+Stats&type=game'],
  },
}
export default function Layout({ children }) { return children; }

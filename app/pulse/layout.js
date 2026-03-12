export const metadata = {
  title: 'The Daily Pulse — Daily Financial Guessing Game',
  description: 'Guess 5 financial numbers daily. How well do you know prices, rates, salaries, and stats? Score out of 1,000 and challenge your friends. New questions every day.',
  openGraph: {
    title: 'The Daily Pulse — Can You Beat 800?',
    description: 'Daily financial guessing game. 5 questions, shareable scores. Like Wordle for money nerds.',
    url: 'https://pulsafi.com/pulse',
    images: [{ url: '/api/og?title=The+Daily+Pulse&subtitle=Daily+Financial+Guessing+Game&type=game', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=The+Daily+Pulse&subtitle=Daily+Financial+Guessing+Game&type=game'],
  },
}
export default function Layout({ children }) { return children; }

export const metadata = {
  title: 'The Daily Pulse — Daily Financial Guessing Game',
  description: 'Guess 5 financial numbers daily. How well do you know prices, rates, salaries, and stats? Score out of 1,000 and challenge your friends. New questions every day.',
  openGraph: {
    title: 'The Daily Pulse — Can You Beat 800?',
    description: 'Daily financial guessing game. 5 questions, shareable scores. Like Wordle for money nerds.',
    url: 'https://www.pulsafi.com/pulse',
    images: [{ url: '/api/pulse-card?score=0&day=1&grid=', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/pulse-card?score=0&day=1&grid='],
  },
}
export default function Layout({ children }) { return children; }

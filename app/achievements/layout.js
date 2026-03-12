export const metadata = {
  title: "Achievements — Collect Badges | Pulsafi",
  description: "Earn badges by learning financial literacy, playing games, using calculators, and building wealth. 33 collectible achievements across 6 categories.",
  openGraph: {
    title: "Achievements — Collect Badges | Pulsafi",
    description: "Earn badges by mastering your finances. 33 collectible achievements from Common to Legendary.",
    url: "https://pulsafi.com/achievements",
    images: [{ url: '/api/og?title=Achievements&subtitle=Collect+Badges&type=game', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Achievements&subtitle=Collect+Badges&type=game'],
  },
};

export default function AchievementsLayout({ children }) {
  return children;
}

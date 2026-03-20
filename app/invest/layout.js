export const metadata = {
  title: 'Investment Growth Calculator & Compound Interest Tool | Pulsafi',
  description: 'Calculate how your investments will grow over time with our interactive investment calculator. See compound interest effects across different time horizons and strategies.',
  alternates: {
    canonical: 'https://pulsafi.com/invest',
  },
  openGraph: {
    title: 'Investment Growth Calculator & Compound Interest Tool',
    description: 'Calculate investment growth and compound interest over time. Explore how your money grows across different investment strategies and time periods.',
    url: 'https://pulsafi.com/invest',
    type: 'website',
    images: [{ url: '/api/og?title=Investment+Growth+Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Growth Calculator & Compound Interest Tool',
    description: 'Calculate how your investments grow. Explore compound interest effects across different time horizons.',
    images: ['/api/og?title=Investment+Growth+Calculator&type=tool'],
  },
};

export default function InvestLayout({ children }) {
  return children;
}

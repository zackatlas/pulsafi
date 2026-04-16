export const metadata = {
  title: 'About Pulsafi | Free Financial Tools & Literacy',
  description: 'Pulsafi builds free, professional-grade financial calculators and education for everyone. 14+ calculators, 18+ articles, 12 courses. No signup, no paywall, no data selling.',
  keywords: ['financial tools', 'financial calculators', 'financial literacy', 'free financial education', 'personal finance', 'retirement calculator', 'debt calculator'],
  canonical: 'https://www.pulsafi.com/about',
  openGraph: {
    title: 'About Pulsafi | Free Financial Tools for Everyone',
    description: 'Learn about our mission to make financial tools free and accessible to everyone. 14+ calculators, 18+ articles, and 12 courses on personal finance.',
    url: 'https://www.pulsafi.com/about',
    type: 'website',
    images: [{ url: '/api/og?title=About+Pulsafi&subtitle=Free+Financial+Tools+for+Everyone&type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Pulsafi',
    description: 'Free financial tools and education for everyone.',
    images: ['/api/og?title=About+Pulsafi&subtitle=Free+Financial+Tools+for+Everyone&type=default'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}
export default function Layout({ children }) { return children; }

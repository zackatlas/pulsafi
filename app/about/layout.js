export const metadata = {
  title: 'About Pulsafi',
  description: 'Pulsafi builds free, professional-grade financial tools for everyone. Learn about our mission, values, and how we make money.',
  openGraph: {
    title: 'About Pulsafi',
    description: 'Learn about our mission to make financial tools free for everyone.',
    url: 'https://pulsafi.com/about',
    images: [{ url: '/api/og?title=About+Pulsafi&subtitle=Free+Financial+Tools+for+Everyone&type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=About+Pulsafi&subtitle=Free+Financial+Tools+for+Everyone&type=default'],
  },
}
export default function Layout({ children }) { return children; }

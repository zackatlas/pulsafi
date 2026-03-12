export const metadata = {
  title: 'The Real Cost of Waiting to Invest',
  description: 'Every year you wait to invest costs you more than you think. See the exact dollar impact of delaying, with real compound growth examples.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/real-cost-of-waiting',
  },
  openGraph: {
    title: 'The Real Cost of Waiting to Invest',
    description: 'Every year you wait to invest costs you more than you think. See the exact dollar impact of delaying, with real compound growth examples.',
    url: 'https://pulsafi.com/learn/real-cost-of-waiting',
    type: 'article',
    images: [{ url: '/api/og?title=The+Real+Cost+of+Waiting+to+Invest&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Real Cost of Waiting to Invest',
    description: 'Every year you wait to invest costs you more than you think. See the exact dollar impact of delaying, with real compound growth examples.',
    images: ['/api/og?title=The+Real+Cost+of+Waiting+to+Invest&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pulsafi.com' },
              { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://pulsafi.com/learn' },
              { '@type': 'ListItem', position: 3, name: 'The Real Cost of Waiting to Invest', item: 'https://pulsafi.com/learn/real-cost-of-waiting' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

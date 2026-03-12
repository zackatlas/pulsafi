export const metadata = {
  title: 'Debt Avalanche vs Snowball: Which Payoff Method Saves More?',
  description: 'Compare the debt avalanche and snowball methods with real numbers. See which strategy saves more interest and which keeps you motivated.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball',
  },
  openGraph: {
    title: 'Debt Avalanche vs Snowball: Which Payoff Method Saves More?',
    description: 'Compare the debt avalanche and snowball methods with real numbers. See which strategy saves more interest and which keeps you motivated.',
    url: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball',
    type: 'article',
    images: [{ url: '/api/og?title=Debt+Avalanche+vs+Snowball&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Avalanche vs Snowball: Which Payoff Method Saves More?',
    description: 'Compare the debt avalanche and snowball methods with real numbers. See which strategy saves more interest and which keeps you motivated.',
    images: ['/api/og?title=Debt+Avalanche+vs+Snowball&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'Debt Avalanche vs Snowball: Which Payoff Method Saves More?', item: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

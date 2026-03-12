export const metadata = {
  title: 'Index Funds vs ETFs in 2026: Which Should You Pick?',
  description: 'The real differences between index funds and ETFs in 2026. Tax efficiency, costs, minimum investments, and which is better for your portfolio.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026',
  },
  openGraph: {
    title: 'Index Funds vs ETFs in 2026: Which Should You Pick?',
    description: 'The real differences between index funds and ETFs in 2026. Tax efficiency, costs, minimum investments, and which is better for your portfolio.',
    url: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Index+Funds+vs+ETFs+in+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Index Funds vs ETFs in 2026: Which Should You Pick?',
    description: 'The real differences between index funds and ETFs in 2026. Tax efficiency, costs, minimum investments, and which is better for your portfolio.',
    images: ['/api/og?title=Index+Funds+vs+ETFs+in+2026&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'Index Funds vs ETFs in 2026: Which Should You Pick?', item: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

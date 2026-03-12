export const metadata = {
  title: 'The FIRE Movement in 2026: Is Early Retirement Still Realistic?',
  description: 'A practical guide to Financial Independence, Retire Early in 2026. FIRE number calculations, savings rates, and whether the math still works.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/fire-movement-2026',
  },
  openGraph: {
    title: 'The FIRE Movement in 2026: Is Early Retirement Still Realistic?',
    description: 'A practical guide to Financial Independence, Retire Early in 2026. FIRE number calculations, savings rates, and whether the math still works.',
    url: 'https://pulsafi.com/learn/fire-movement-2026',
    type: 'article',
    images: [{ url: '/api/og?title=The+FIRE+Movement+in+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The FIRE Movement in 2026: Is Early Retirement Still Realistic?',
    description: 'A practical guide to Financial Independence, Retire Early in 2026. FIRE number calculations, savings rates, and whether the math still works.',
    images: ['/api/og?title=The+FIRE+Movement+in+2026&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'The FIRE Movement in 2026: Is Early Retirement Still Realistic?', item: 'https://pulsafi.com/learn/fire-movement-2026' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

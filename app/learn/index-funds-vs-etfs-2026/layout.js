export const metadata = {
  title: 'Index Funds vs ETFs: Which Should You Buy in 2026?',
  description: 'What\'s the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026',
  },
  openGraph: {
    title: 'Index Funds vs ETFs: Which Should You Buy in 2026?',
    description: 'What\'s the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.',
    url: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Index+Funds+vs+ETFs:+Which+Should+You+Buy+in+2026?&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Index Funds vs ETFs: Which Should You Buy in 2026?',
    description: 'What\'s the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.',
    images: ['/api/og?title=Index+Funds+vs+ETFs:+Which+Should+You+Buy+in+2026?&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Index Funds vs ETFs: Which Should You Buy in 2026?", "item": "https://pulsafi.com/learn/index-funds-vs-etfs-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Index Funds vs ETFs: Which Should You Buy in 2026?", "description": "What's the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/index-funds-vs-etfs-2026"}}),
        }}
      />
      {children}
    </>
  )
}

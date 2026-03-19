export const metadata = {
  title: 'FIRE Movement 2026: What\'s Changed and Why It Matters',
  description: 'The FIRE movement is evolving. We\'re breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/fire-movement-2026',
  },
  openGraph: {
    title: 'FIRE Movement 2026: What\'s Changed and Why It Matters',
    description: 'The FIRE movement is evolving. We\'re breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.',
    url: 'https://pulsafi.com/learn/fire-movement-2026',
    type: 'article',
    images: [{ url: '/api/og?title=FIRE+Movement+2026:+What's+Changed+and+Why+It+Matters&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE Movement 2026: What\'s Changed and Why It Matters',
    description: 'The FIRE movement is evolving. We\'re breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.',
    images: ['/api/og?title=FIRE+Movement+2026:+What's+Changed+and+Why+It+Matters&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "FIRE Movement 2026: What's Changed and Why It Matters", "item": "https://pulsafi.com/learn/fire-movement-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "FIRE Movement 2026: What's Changed and Why It Matters", "description": "The FIRE movement is evolving. We're breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/fire-movement-2026"}}),
        }}
      />
      {children}
    </>
  )
}

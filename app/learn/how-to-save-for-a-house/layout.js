export const metadata = {
  title: 'How to Save for a House Down Payment Faster',
  description: 'A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-to-save-for-a-house',
  },
  openGraph: {
    title: 'How to Save for a House Down Payment Faster',
    description: 'A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.',
    url: 'https://pulsafi.com/learn/how-to-save-for-a-house',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Save+for+a+House+Down+Payment+Faster&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Save for a House Down Payment Faster',
    description: 'A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.',
    images: ['/api/og?title=How+to+Save+for+a+House+Down+Payment+Faster&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Save for a House Down Payment Faster", "item": "https://pulsafi.com/learn/how-to-save-for-a-house"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Save for a House Down Payment Faster", "description": "A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/how-to-save-for-a-house"}}),
        }}
      />
      {children}
    </>
  )
}

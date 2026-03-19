export const metadata = {
  title: 'How to Save for a House in 2026: A Step-by-Step Down Payment Guide',
  description: 'Learn how to save for a house down payment in 2026. Covers savings goals by home price, high-yield accounts, first-time buyer programs, and a month-by-month savings plan.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-to-save-for-a-house-2026',
  },
  openGraph: {
    title: 'How to Save for a House in 2026: A Step-by-Step Down Payment Guide',
    description: 'Learn how to save for a house down payment in 2026. Covers savings goals by home price, high-yield accounts, first-time buyer programs, and a month-by-month savings plan.',
    url: 'https://pulsafi.com/learn/how-to-save-for-a-house-2026',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Save+for+a+House+in+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Save for a House in 2026: A Step-by-Step Down Payment Guide',
    description: 'Learn how to save for a house down payment in 2026. Covers savings goals by home price, high-yield accounts, first-time buyer programs, and a month-by-month savings plan.',
    images: ['/api/og?title=How+to+Save+for+a+House+in+2026&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Save for a House in 2026", "item": "https://pulsafi.com/learn/how-to-save-for-a-house-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Save for a House in 2026: A Step-by-Step Down Payment Guide", "description": "Learn how to save for a house down payment in 2026. Covers savings goals by home price, high-yield accounts, first-time buyer programs, and a month-by-month savings plan.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/how-to-save-for-a-house-2026"}}),
        }}
      />
      {children}
    </>
  )
}

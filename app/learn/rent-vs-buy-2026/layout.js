export const metadata = {
  title: 'Rent vs Buy in 2026: The True Financial Comparison',
  description: 'Is buying better than renting? The answer depends. Here\'s how to run the numbers in today\'s market.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/rent-vs-buy-2026',
  },
  openGraph: {
    title: 'Rent vs Buy in 2026: The True Financial Comparison',
    description: 'Is buying better than renting? The answer depends. Here\'s how to run the numbers in today\'s market.',
    url: 'https://pulsafi.com/learn/rent-vs-buy-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Rent+vs+Buy+in+2026:+The+True+Financial+Comparison&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy in 2026: The True Financial Comparison',
    description: 'Is buying better than renting? The answer depends. Here\'s how to run the numbers in today\'s market.',
    images: ['/api/og?title=Rent+vs+Buy+in+2026:+The+True+Financial+Comparison&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Rent vs Buy in 2026: The True Financial Comparison", "item": "https://pulsafi.com/learn/rent-vs-buy-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Rent vs Buy in 2026: The True Financial Comparison", "description": "Is buying better than renting? The answer depends. Here's how to run the numbers in today's market.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/rent-vs-buy-2026"}}),
        }}
      />
      {children}
    </>
  )
}

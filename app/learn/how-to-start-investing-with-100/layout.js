export const metadata = {
  title: 'How to Start Investing With Just $100',
  description: 'You don\'t need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-to-start-investing-with-100',
  },
  openGraph: {
    title: 'How to Start Investing With Just $100',
    description: 'You don\'t need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.',
    url: 'https://pulsafi.com/learn/how-to-start-investing-with-100',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Start+Investing+With+Just+$100&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start Investing With Just $100',
    description: 'You don\'t need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.',
    images: ['/api/og?title=How+to+Start+Investing+With+Just+$100&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Start Investing With Just $100", "item": "https://pulsafi.com/learn/how-to-start-investing-with-100"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Start Investing With Just $100", "description": "You don't need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/how-to-start-investing-with-100"}}),
        }}
      />
      {children}
    </>
  )
}

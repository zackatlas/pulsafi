export const metadata = {
  title: 'How to Start Investing with $500 in 2026: A Complete Beginner\'s Guide',
  description: 'Learn exactly how to invest your first $500 in 2026. We cover the best platforms, investment options, and strategies for beginners who want to start building wealth today.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-to-start-investing-with-500',
  },
  openGraph: {
    title: 'How to Start Investing with $500 in 2026: A Complete Beginner\'s Guide',
    description: 'Learn exactly how to invest your first $500 in 2026. We cover the best platforms, investment options, and strategies for beginners who want to start building wealth today.',
    url: 'https://pulsafi.com/learn/how-to-start-investing-with-500',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Start+Investing+with+%24500+in+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start Investing with $500 in 2026: A Complete Beginner\'s Guide',
    description: 'Learn exactly how to invest your first $500 in 2026. We cover the best platforms, investment options, and strategies for beginners who want to start building wealth today.',
    images: ['/api/og?title=How+to+Start+Investing+with+%24500+in+2026&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Start Investing with $500 in 2026", "item": "https://pulsafi.com/learn/how-to-start-investing-with-500"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Start Investing with $500 in 2026: A Complete Beginner's Guide", "description": "Learn exactly how to invest your first $500 in 2026. We cover the best platforms, investment options, and strategies for beginners who want to start building wealth today.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/how-to-start-investing-with-500"}}),
        }}
      />
      {children}
    </>
  )
}

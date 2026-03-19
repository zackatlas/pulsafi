export const metadata = {
  title: 'Credit Scores Explained: How to Check and Improve Yours',
  description: 'Everything you need to know about credit scores in 2026. How they\'re calculated, what\'s a good score, and proven strategies to raise yours fast.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/credit-score-explained-how-to-improve',
  },
  openGraph: {
    title: 'Credit Scores Explained: How to Check and Improve Yours',
    description: 'Everything you need to know about credit scores in 2026. How they\'re calculated, what\'s a good score, and proven strategies to raise yours fast.',
    url: 'https://pulsafi.com/learn/credit-score-explained-how-to-improve',
    type: 'article',
    images: [{ url: '/api/og?title=Credit+Scores+Explained:+How+to+Check+and+Improve+Yours&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Scores Explained: How to Check and Improve Yours',
    description: 'Everything you need to know about credit scores in 2026. How they\'re calculated, what\'s a good score, and proven strategies to raise yours fast.',
    images: ['/api/og?title=Credit+Scores+Explained:+How+to+Check+and+Improve+Yours&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Credit Scores Explained: How to Check and Improve Yours", "item": "https://pulsafi.com/learn/credit-score-explained-how-to-improve"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Credit Scores Explained: How to Check and Improve Yours", "description": "Everything you need to know about credit scores in 2026. How they're calculated, what's a good score, and proven strategies to raise yours fast.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/credit-score-explained-how-to-improve"}}),
        }}
      />
      {children}
    </>
  )
}

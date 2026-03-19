export const metadata = {
  title: 'The Real Cost of Waiting to Save and Invest',
  description: 'How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/real-cost-of-waiting',
  },
  openGraph: {
    title: 'The Real Cost of Waiting to Save and Invest',
    description: 'How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.',
    url: 'https://pulsafi.com/learn/real-cost-of-waiting',
    type: 'article',
    images: [{ url: '/api/og?title=The+Real+Cost+of+Waiting+to+Save+and+Invest&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Real Cost of Waiting to Save and Invest',
    description: 'How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.',
    images: ['/api/og?title=The+Real+Cost+of+Waiting+to+Save+and+Invest&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "The Real Cost of Waiting to Save and Invest", "item": "https://pulsafi.com/learn/real-cost-of-waiting"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "The Real Cost of Waiting to Save and Invest", "description": "How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/real-cost-of-waiting"}}),
        }}
      />
      {children}
    </>
  )
}

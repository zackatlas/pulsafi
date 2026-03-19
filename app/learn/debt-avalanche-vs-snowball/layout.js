export const metadata = {
  title: 'Debt Snowball vs Debt Avalanche: Which Method Wins?',
  description: 'Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball',
  },
  openGraph: {
    title: 'Debt Snowball vs Debt Avalanche: Which Method Wins?',
    description: 'Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.',
    url: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball',
    type: 'article',
    images: [{ url: '/api/og?title=Debt+Snowball+vs+Debt+Avalanche:+Which+Method+Wins?&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Snowball vs Debt Avalanche: Which Method Wins?',
    description: 'Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.',
    images: ['/api/og?title=Debt+Snowball+vs+Debt+Avalanche:+Which+Method+Wins?&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Debt Snowball vs Debt Avalanche: Which Method Wins?", "item": "https://pulsafi.com/learn/debt-avalanche-vs-snowball"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Debt Snowball vs Debt Avalanche: Which Method Wins?", "description": "Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/debt-avalanche-vs-snowball"}}),
        }}
      />
      {children}
    </>
  )
}

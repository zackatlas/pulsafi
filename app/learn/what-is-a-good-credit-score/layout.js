export const metadata = {
  title: 'What Is a Good Credit Score and How to Improve It',
  description: 'Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/what-is-a-good-credit-score',
  },
  openGraph: {
    title: 'What Is a Good Credit Score and How to Improve It',
    description: 'Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.',
    url: 'https://pulsafi.com/learn/what-is-a-good-credit-score',
    type: 'article',
    images: [{ url: '/api/og?title=What+Is+a+Good+Credit+Score+and+How+to+Improve+It&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Good Credit Score and How to Improve It',
    description: 'Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.',
    images: ['/api/og?title=What+Is+a+Good+Credit+Score+and+How+to+Improve+It&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "What Is a Good Credit Score and How to Improve It", "item": "https://pulsafi.com/learn/what-is-a-good-credit-score"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "What Is a Good Credit Score and How to Improve It", "description": "Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/what-is-a-good-credit-score"}}),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'The Real Cost of Waiting to Save and Invest',
  description: 'How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/real-cost-of-waiting',
  },
  openGraph: {
    title: 'The Real Cost of Waiting to Save and Invest',
    description: 'How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.',
    url: 'https://www.pulsafi.com/learn/real-cost-of-waiting',
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
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "The Real Cost of Waiting to Save and Invest", "item": "https://www.pulsafi.com/learn/real-cost-of-waiting"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "The Real Cost of Waiting to Save and Invest", "description": "How much does waiting 5 years cost you? See the math on how compound interest makes early action critical.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/real-cost-of-waiting"}}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does waiting 5 years to invest cost you?",
                "acceptedAnswer": { "@type": "Answer", "text": "Waiting 5 years can cost tens of thousands in missed compound growth. For example, investing $500 monthly at 10% returns grows to $38,265 in 5 years vs. $0 if you wait." }
              },
              {
                "@type": "Question",
                "name": "What is the cost of waiting 10 years to start investing?",
                "acceptedAnswer": { "@type": "Answer", "text": "Waiting 10 years is extremely costly. That same $500 monthly investment grows to $77,640 in 10 years, but if you waited 5 years first, you'd miss $38,265 in growth." }
              },
              {
                "@type": "Question",
                "name": "Is time or money more important in investing?",
                "acceptedAnswer": { "@type": "Answer", "text": "Time is the most powerful factor. Even investing small amounts early beats investing large amounts later due to compound interest working over decades." }
              },
              {
                "@type": "Question",
                "name": "Is it too late to start investing at age 40 or 50?",
                "acceptedAnswer": { "@type": "Answer", "text": "It's never too late. While waiting costs money, starting at any age is better than never starting. You still have earning years and can catch up with higher contributions." }
              },
              {
                "@type": "Question",
                "name": "Should I invest a lump sum or use dollar-cost averaging (DCA)?",
                "acceptedAnswer": { "@type": "Answer", "text": "Lump sum investing typically wins long-term, but DCA reduces emotional stress. For beginners, DCA (regular monthly investing) often feels more manageable and encourages consistency." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

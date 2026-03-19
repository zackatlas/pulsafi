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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does it take to save for a house down payment?",
                "acceptedAnswer": { "@type": "Answer", "text": "Timeline varies: saving $60,000 for 20% down on a $300,000 home takes roughly 3-5 years saving $1,000-$1,500 monthly. Adjust based on your income and savings rate." }
              },
              {
                "@type": "Question",
                "name": "What first-time homebuyer programs are available in 2026?",
                "acceptedAnswer": { "@type": "Answer", "text": "Popular programs include FHA loans (3.5% down), first-time buyer grants, down payment assistance, and state-specific programs. Check your local housing authority for eligibility." }
              },
              {
                "@type": "Question",
                "name": "Should I wait for house prices to drop before buying?",
                "acceptedAnswer": { "@type": "Answer", "text": "Don't try to time the market. Focus on when you're financially ready and have stable income. Even if prices drop, higher interest rates may offset the savings." }
              },
              {
                "@type": "Question",
                "name": "How can I avoid paying PMI when saving for a down payment?",
                "acceptedAnswer": { "@type": "Answer", "text": "Save for at least 20% down to avoid PMI. Alternatively, use first-time buyer programs or find lender-paid PMI options that roll costs into your mortgage." }
              },
              {
                "@type": "Question",
                "name": "What should I do with my down payment savings while I wait?",
                "acceptedAnswer": { "@type": "Answer", "text": "Keep it in a high-yield savings account earning 4-5% APY. Don't invest in stocks—you need this money to be safe and accessible when you're ready to buy." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

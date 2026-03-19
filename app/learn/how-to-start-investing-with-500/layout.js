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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What are the best investments for a $500 starting amount?",
                "acceptedAnswer": { "@type": "Answer", "text": "Start with low-cost index funds or ETFs that track the S&P 500 (VOO, SPY, IVV). These offer instant diversification with minimal fees." }
              },
              {
                "@type": "Question",
                "name": "Should I invest in individual stocks or index funds with $500?",
                "acceptedAnswer": { "@type": "Answer", "text": "Index funds are better for beginners. They provide diversification, require less research, and historically outperform most individual stock pickers over time." }
              },
              {
                "@type": "Question",
                "name": "How much should I invest monthly after my initial $500?",
                "acceptedAnswer": { "@type": "Answer", "text": "Invest as much as you can consistently—even $50-$100 monthly helps. Consistency matters more than amount. Automate contributions to stay disciplined." }
              },
              {
                "@type": "Question",
                "name": "When should I start investing if I only have $500?",
                "acceptedAnswer": { "@type": "Answer", "text": "Start now if you have an emergency fund (3-6 months of expenses). If not, build savings first, then invest. Time in the market beats timing the market." }
              },
              {
                "@type": "Question",
                "name": "Can I invest $500 and forget about it for years?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, if you're using an index fund or ETF. Let compound interest work. Avoid checking constantly—this prevents emotional selling during market downturns." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'How to Start Investing With Just $100',
  description: 'You don\'t need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/how-to-start-investing-with-100',
  },
  openGraph: {
    title: 'How to Start Investing With Just $100',
    description: 'You don\'t need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.',
    url: 'https://www.pulsafi.com/learn/how-to-start-investing-with-100',
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
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Start Investing With Just $100", "item": "https://www.pulsafi.com/learn/how-to-start-investing-with-100"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Start Investing With Just $100", "description": "You don't need $10,000 to start. Learn how to begin investing with $100, where to open an account, and what to invest in.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/how-to-start-investing-with-100"}}),
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
                "name": "Can you actually invest with just $100?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can invest $100 through fractional shares, ETFs, index funds, or robo-advisors. Many platforms have $0 minimums or accept small amounts." }
              },
              {
                "@type": "Question",
                "name": "What are fractional shares and how do they help small investors?",
                "acceptedAnswer": { "@type": "Answer", "text": "Fractional shares let you own portions of expensive stocks. Instead of buying a $500 stock, you can buy $100 worth. This opens investing to people with limited capital." }
              },
              {
                "@type": "Question",
                "name": "What is the best app for investing with $100?",
                "acceptedAnswer": { "@type": "Answer", "text": "Popular options include M1 Finance, Fidelity, Schwab, and Vanguard—all offer fractional shares, low fees, and user-friendly interfaces for small amounts." }
              },
              {
                "@type": "Question",
                "name": "Is micro-investing with $100 actually worth it?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Starting with $100 builds the investing habit, teaches you the process, and compounds over time. The key is consistency—invest regularly, even if small." }
              },
              {
                "@type": "Question",
                "name": "Should I invest $100 or put it in savings first?",
                "acceptedAnswer": { "@type": "Answer", "text": "If you have an emergency fund, invest. If not, build $1,000-$1,500 in savings first, then start investing. Investing without a safety net is risky." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

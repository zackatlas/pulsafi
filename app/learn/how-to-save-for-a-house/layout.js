export const metadata = {
  title: 'How to Save for a House Down Payment Faster',
  description: 'A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/how-to-save-for-a-house',
  },
  openGraph: {
    title: 'How to Save for a House Down Payment Faster',
    description: 'A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.',
    url: 'https://www.pulsafi.com/learn/how-to-save-for-a-house',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Save+for+a+House+Down+Payment+Faster&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Save for a House Down Payment Faster',
    description: 'A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.',
    images: ['/api/og?title=How+to+Save+for+a+House+Down+Payment+Faster&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Save for a House Down Payment Faster", "item": "https://www.pulsafi.com/learn/how-to-save-for-a-house"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Save for a House Down Payment Faster", "description": "A practical roadmap to save for a home down payment without sacrificing your lifestyle. Real timelines and strategies that work.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/how-to-save-for-a-house"}}),
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
                "name": "How much should I save for a down payment on a house?",
                "acceptedAnswer": { "@type": "Answer", "text": "Conventional loans typically require 20% down to avoid mortgage insurance. However, FHA loans allow as little as 3.5% down. For a $300,000 home, 20% is $60,000, but you could put down $10,500 with FHA, paying insurance instead." }
              },
              {
                "@type": "Question",
                "name": "How long does it take to save for a house down payment?",
                "acceptedAnswer": { "@type": "Answer", "text": "Timeline depends on your savings rate and target amount. If you save $500/month for 20% down on a $300,000 home ($60,000), it takes 10 years. Saving $1,000/month cuts this to 5 years. Consider accelerating through side income or bonus allocation." }
              },
              {
                "@type": "Question",
                "name": "What is the FHA minimum down payment?",
                "acceptedAnswer": { "@type": "Answer", "text": "FHA loans allow down payments as low as 3.5% of the purchase price, making homeownership more accessible. However, you'll pay mortgage insurance (PMI) monthly. The tradeoff: lower upfront cost but higher total interest over time." }
              },
              {
                "@type": "Question",
                "name": "Should I wait to save 20% down before buying a house?",
                "acceptedAnswer": { "@type": "Answer", "text": "It depends on your market and timeline. Waiting builds equity faster and avoids PMI, but rising prices may offset savings. If you're ready otherwise, a 10-15% down payment with PMI may be better than waiting years for prices to increase further." }
              },
              {
                "@type": "Question",
                "name": "What are closing costs and how much should I budget?",
                "acceptedAnswer": { "@type": "Answer", "text": "Closing costs (2-5% of home price) cover title insurance, appraisals, inspections, and lender fees. For a $300,000 home, budget $6,000-$15,000. Some lenders offer closing cost assistance if you can't cover them from savings." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

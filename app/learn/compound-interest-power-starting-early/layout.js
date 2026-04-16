export const metadata = {
  title: 'The Power of Compound Interest: Why Starting Early Matters',
  description: 'Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/compound-interest-power-starting-early',
  },
  openGraph: {
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    description: 'Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.',
    url: 'https://www.pulsafi.com/learn/compound-interest-power-starting-early',
    type: 'article',
    images: [{ url: '/api/og?title=The+Power+of+Compound+Interest:+Why+Starting+Early+Matters&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    description: 'Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.',
    images: ['/api/og?title=The+Power+of+Compound+Interest:+Why+Starting+Early+Matters&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "The Power of Compound Interest: Why Starting Early Matters", "item": "https://www.pulsafi.com/learn/compound-interest-power-starting-early"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "The Power of Compound Interest: Why Starting Early Matters", "description": "Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/compound-interest-power-starting-early"}}),
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
                "name": "What exactly is compound interest?",
                "acceptedAnswer": { "@type": "Answer", "text": "Compound interest is 'interest on interest'—when your investment earnings generate their own earnings. Over time, this creates exponential growth. The longer your money stays invested, the more powerful the compounding effect becomes." }
              },
              {
                "@type": "Question",
                "name": "How much difference does starting 5 years early actually make?",
                "acceptedAnswer": { "@type": "Answer", "text": "Starting 5 years earlier with a 7% annual return roughly doubles your final balance compared to someone who starts later with the same contributions. For example, starting at 20 vs 25 with $200/month could mean $300,000+ more at retirement." }
              },
              {
                "@type": "Question",
                "name": "What are the best accounts for compound interest growth?",
                "acceptedAnswer": { "@type": "Answer", "text": "Tax-advantaged accounts like 401(k)s and Roth IRAs maximize compound growth by avoiding tax drag. Index funds inside these accounts offer low fees and broad diversification, making them ideal vehicles for long-term compounding." }
              },
              {
                "@type": "Question",
                "name": "What is the rule of 72 and how do I use it?",
                "acceptedAnswer": { "@type": "Answer", "text": "The rule of 72 estimates how long your money takes to double: divide 72 by your annual return rate. At 7% returns, your money doubles roughly every 10 years. This quick mental math shows how starting early creates multiple doubling periods." }
              },
              {
                "@type": "Question",
                "name": "Does compound interest work with regular contributions?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Adding regular contributions while compound interest works is even more powerful. Monthly contributions of $200-500 starting young can create six-figure portfolios by retirement through combined contributions and compounding." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

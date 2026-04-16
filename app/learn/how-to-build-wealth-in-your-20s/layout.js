export const metadata = {
  title: 'How to Build Wealth in Your 20s: A Step-by-Step Guide | Pulsafi',
  description: 'Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/how-to-build-wealth-in-your-20s',
  },
  openGraph: {
    title: 'How to Build Wealth in Your 20s: A Step-by-Step Guide',
    description: 'Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.',
    url: 'https://www.pulsafi.com/learn/how-to-build-wealth-in-your-20s',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Build+Wealth+in+Your+20s&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build Wealth in Your 20s: A Step-by-Step Guide',
    description: 'Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.',
    images: ['/api/og?title=How+to+Build+Wealth+in+Your+20s&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Build Wealth in Your 20s: A Step-by-Step Guide", "item": "https://www.pulsafi.com/learn/how-to-build-wealth-in-your-20s"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Build Wealth in Your 20s: A Step-by-Step Guide", "description": "Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/how-to-build-wealth-in-your-20s"}}),
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
                "name": "How much money should I save in my 20s?",
                "acceptedAnswer": { "@type": "Answer", "text": "Financial experts generally recommend saving 10-20% of your gross income in your 20s. Even starting with 5-10% is valuable due to compound interest—the goal is to build the habit early and increase savings as your income grows." }
              },
              {
                "@type": "Question",
                "name": "What are the best investments for beginners in their 20s?",
                "acceptedAnswer": { "@type": "Answer", "text": "Low-cost index funds, target-date funds, and employer 401(k) plans are ideal for beginners. These offer diversification, automation, and low fees. If your employer offers a 401(k) match, always contribute enough to capture it—it's free money." }
              },
              {
                "@type": "Question",
                "name": "Why is an emergency fund important at a young age?",
                "acceptedAnswer": { "@type": "Answer", "text": "An emergency fund (3-6 months of expenses) prevents you from going into debt when unexpected costs arise. Having this cushion in your 20s lets you invest additional money confidently without risking financial stability." }
              },
              {
                "@type": "Question",
                "name": "How does salary negotiation impact long-term wealth?",
                "acceptedAnswer": { "@type": "Answer", "text": "A $5,000 salary increase in your 20s can grow to $500,000+ by retirement through compound interest. Negotiating early and regularly—even for raises of 3-5%—has enormous long-term wealth-building impact." }
              },
              {
                "@type": "Question",
                "name": "Should I invest before paying off student loans?",
                "acceptedAnswer": { "@type": "Answer", "text": "If you have employer 401(k) matching, prioritize that first since it's free money. For other debts, compare interest rates: if your loan rate is below expected investment returns (7%+), investing may outpace paying down the debt." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

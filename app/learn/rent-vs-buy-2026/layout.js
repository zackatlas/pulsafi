export const metadata = {
  title: 'Rent vs Buy in 2026: The True Financial Comparison',
  description: 'Is buying better than renting? The answer depends. Here\'s how to run the numbers in today\'s market.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/rent-vs-buy-2026',
  },
  openGraph: {
    title: 'Rent vs Buy in 2026: The True Financial Comparison',
    description: 'Is buying better than renting? The answer depends. Here\'s how to run the numbers in today\'s market.',
    url: 'https://pulsafi.com/learn/rent-vs-buy-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Rent+vs+Buy+in+2026:+The+True+Financial+Comparison&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy in 2026: The True Financial Comparison',
    description: 'Is buying better than renting? The answer depends. Here\'s how to run the numbers in today\'s market.',
    images: ['/api/og?title=Rent+vs+Buy+in+2026:+The+True+Financial+Comparison&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Rent vs Buy in 2026: The True Financial Comparison", "item": "https://pulsafi.com/learn/rent-vs-buy-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Rent vs Buy in 2026: The True Financial Comparison", "description": "Is buying better than renting? The answer depends. Here's how to run the numbers in today's market.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/rent-vs-buy-2026"}}),
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
                "name": "Is it better to rent or buy a home?",
                "acceptedAnswer": { "@type": "Answer", "text": "The answer depends on your timeline, location, and finances. Buying makes sense if you'll stay 5+ years and can afford 20% down. Renting offers flexibility and predictable costs. Compare total rent vs mortgage plus taxes, insurance, maintenance, and HOA fees." }
              },
              {
                "@type": "Question",
                "name": "What is the 5-year rule for renting vs buying?",
                "acceptedAnswer": { "@type": "Answer", "text": "The 5-year rule suggests buying only if you plan to stay 5+ years to recoup closing costs and down payment. Shorter timelines favor renting. This rule helps account for transaction costs and gives home appreciation time to outpace rent." }
              },
              {
                "@type": "Question",
                "name": "How much should I save for a down payment?",
                "acceptedAnswer": { "@type": "Answer", "text": "Conventional loans require 20% down to avoid PMI (mortgage insurance). FHA loans allow 3.5% down but charge PMI. A larger down payment (25-30%) offers better loan terms. Aim for 15-20% to balance homeownership goals with emergency savings." }
              },
              {
                "@type": "Question",
                "name": "What are hidden costs of homeownership?",
                "acceptedAnswer": { "@type": "Answer", "text": "Beyond mortgage and property tax, budget for: home insurance (0.5-1.2% of home value annually), maintenance (1-2% annually), HOA fees, utilities, and major repairs. Homeowners should reserve 1-2% of home value yearly for unexpected issues." }
              },
              {
                "@type": "Question",
                "name": "Does buying a home build wealth compared to renting?",
                "acceptedAnswer": { "@type": "Answer", "text": "Buying builds equity through mortgage payments and potential appreciation, while renting builds flexibility and optionality. Over 30 years, buying typically builds more wealth, but renting lets you invest the difference in stocks—both paths can be wealth-building." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

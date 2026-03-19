export const metadata = {
  title: 'How Much House Can You Actually Afford?',
  description: 'The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-much-house-can-you-afford',
  },
  openGraph: {
    title: 'How Much House Can You Actually Afford?',
    description: 'The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.',
    url: 'https://pulsafi.com/learn/how-much-house-can-you-afford',
    type: 'article',
    images: [{ url: '/api/og?title=How+Much+House+Can+You+Actually+Afford?&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much House Can You Actually Afford?',
    description: 'The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.',
    images: ['/api/og?title=How+Much+House+Can+You+Actually+Afford?&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How Much House Can You Actually Afford?", "item": "https://pulsafi.com/learn/how-much-house-can-you-afford"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How Much House Can You Actually Afford?", "description": "The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/how-much-house-can-you-afford"}}),
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
                "name": "What is the 28/36 rule for home affordability?",
                "acceptedAnswer": { "@type": "Answer", "text": "The 28/36 rule states that your housing costs should be no more than 28% of gross income, and total debt payments no more than 36% of gross income." }
              },
              {
                "@type": "Question",
                "name": "What income do I need to afford a $300,000 house?",
                "acceptedAnswer": { "@type": "Answer", "text": "Using the 28/36 rule with a 7% mortgage rate, you'll need roughly $75,000+ annual income for a $300,000 house with 20% down. Actual income needed varies by down payment, interest rate, and debts." }
              },
              {
                "@type": "Question",
                "name": "What is the minimum down payment for a home?",
                "acceptedAnswer": { "@type": "Answer", "text": "Conventional loans require 3-5% down, FHA loans require 3.5% down, and VA/USDA loans may require 0% down. Lower down payments result in PMI (private mortgage insurance)." }
              },
              {
                "@type": "Question",
                "name": "How much are closing costs on a home purchase?",
                "acceptedAnswer": { "@type": "Answer", "text": "Closing costs typically range from 2-5% of the home's purchase price. For a $300,000 home, expect $6,000-$15,000 in closing costs." }
              },
              {
                "@type": "Question",
                "name": "Should I stretch my budget to buy a bigger house?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. Staying within the 28/36 rule ensures you can cover your mortgage even during financial hardship. Stretching your budget risks default and foreclosure." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'Debt Snowball vs Debt Avalanche: Which Method Wins?',
  description: 'Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball',
  },
  openGraph: {
    title: 'Debt Snowball vs Debt Avalanche: Which Method Wins?',
    description: 'Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.',
    url: 'https://pulsafi.com/learn/debt-avalanche-vs-snowball',
    type: 'article',
    images: [{ url: '/api/og?title=Debt+Snowball+vs+Debt+Avalanche:+Which+Method+Wins?&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Snowball vs Debt Avalanche: Which Method Wins?',
    description: 'Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.',
    images: ['/api/og?title=Debt+Snowball+vs+Debt+Avalanche:+Which+Method+Wins?&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Debt Snowball vs Debt Avalanche: Which Method Wins?", "item": "https://pulsafi.com/learn/debt-avalanche-vs-snowball"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Debt Snowball vs Debt Avalanche: Which Method Wins?", "description": "Compare the two most popular debt payoff methods. See the math, psychology, and how to pick the best strategy for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/debt-avalanche-vs-snowball"}}),
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
                "name": "What is the difference between debt avalanche and debt snowball?",
                "acceptedAnswer": { "@type": "Answer", "text": "Debt avalanche focuses on paying the highest interest rate debt first to minimize interest, while debt snowball targets the smallest balance first for psychological wins and momentum." }
              },
              {
                "@type": "Question",
                "name": "Which debt payoff method saves more money?",
                "acceptedAnswer": { "@type": "Answer", "text": "The debt avalanche method typically saves more money in interest because you pay down high-interest debt faster, though the difference depends on your specific interest rates and balances." }
              },
              {
                "@type": "Question",
                "name": "Which debt payoff method is faster?",
                "acceptedAnswer": { "@type": "Answer", "text": "The debt avalanche is generally faster mathematically, but the debt snowball can feel faster psychologically due to quick wins from eliminating smaller debts first." }
              },
              {
                "@type": "Question",
                "name": "When should I use the debt snowball method?",
                "acceptedAnswer": { "@type": "Answer", "text": "Use the debt snowball if you need psychological motivation and quick wins, or if your interest rates are similar across debts. It's also better if you struggle with commitment and need early success to stay motivated." }
              },
              {
                "@type": "Question",
                "name": "Do minimum payments change my debt payoff strategy?",
                "acceptedAnswer": { "@type": "Answer", "text": "You must always make minimum payments on all debts to avoid penalties and credit damage. Both avalanche and snowball methods work with minimum payments on all debts while targeting one specific debt for extra payments." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

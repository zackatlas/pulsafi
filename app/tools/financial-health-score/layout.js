export const metadata = {
  title: 'Financial Health Score — Free Assessment',
  description: 'Get your Financial Health Score out of 1,000. Answer 10 questions about savings, debt, investments, and planning. Personalized recommendations included.',
  openGraph: {
    title: 'What\'s Your Financial Health Score? — Pulsafi',
    description: 'Free 2-minute financial health assessment. Score 0-1,000 with personalized recommendations.',
    url: 'https://pulsafi.com/tools/financial-health-score',
    images: [{ url: '/api/og?title=Financial+Health+Score&subtitle=Free+Assessment&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Financial+Health+Score&subtitle=Free+Assessment&type=tool'],
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a financial health score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A financial health score is a comprehensive assessment of your overall financial wellbeing, considering factors like savings rate, debt levels, emergency fund adequacy, investment progress, and insurance coverage. It provides a single number to track your financial progress."
        }
      },
      {
        "@type": "Question",
        "name": "How can I improve my financial health?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start with an emergency fund covering 3-6 months of expenses, pay down high-interest debt, save at least 15% of income for retirement, maintain adequate insurance coverage, and create a monthly budget. Small consistent improvements compound over time."
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pulsafi.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://pulsafi.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Financial Health Score', item: 'https://pulsafi.com/tools/financial-health-score' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

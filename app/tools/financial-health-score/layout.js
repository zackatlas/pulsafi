export const metadata = {
  title: 'Financial Health Score | Pulsafi',
  description: 'Get a personalized financial health score based on your savings rate, debt-to-income ratio, emergency fund, and investment habits. Free instant assessment.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/financial-health-score',
  },
  openGraph: {
    title: 'Financial Health Score — Free Online Calculator | Pulsafi',
    description: 'Get a personalized financial health score based on your savings rate, debt-to-income ratio, emergency fund, and investment habits. Free instant assessment.',
    url: 'https://www.pulsafi.com/tools/financial-health-score',
    type: 'website',
    images: [{ url: '/api/og?title=Financial%20Health%20Score&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Financial Health Score — Free Online Calculator | Pulsafi',
    description: 'Get a personalized financial health score based on your savings rate, debt-to-income ratio, emergency fund, and investment habits. Free instant assessment.',
    images: ['/api/og?title=Financial%20Health%20Score&type=tool'],
  },
}

export default function Layout({ children }) {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pulsafi Financial Health Score",
    "url": "https://www.pulsafi.com/tools/financial-health-score",
    "description": "Get a personalized financial health score based on your savings rate, debt-to-income ratio, emergency fund, and investment habits. Free instant assessment.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.pulsafi.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.pulsafi.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Financial Health Score', item: 'https://www.pulsafi.com/tools/financial-health-score' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
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

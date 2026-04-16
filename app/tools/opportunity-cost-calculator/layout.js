export const metadata = {
  title: 'Opportunity Cost Calculator | Pulsafi',
  description: 'Calculate the true cost of your spending decisions. See how much your purchases could grow if invested instead, with compound interest projections over time.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/opportunity-cost-calculator',
  },
  openGraph: {
    title: 'Opportunity Cost Calculator — Free Online Calculator | Pulsafi',
    description: 'Calculate the true cost of your spending decisions. See how much your purchases could grow if invested instead, with compound interest projections over time.',
    url: 'https://www.pulsafi.com/tools/opportunity-cost-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Opportunity%20Cost%20Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opportunity Cost Calculator — Free Online Calculator | Pulsafi',
    description: 'Calculate the true cost of your spending decisions. See how much your purchases could grow if invested instead, with compound interest projections over time.',
    images: ['/api/og?title=Opportunity%20Cost%20Calculator&type=tool'],
  },
}

export default function Layout({ children }) {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pulsafi Opportunity Cost Calculator",
    "url": "https://www.pulsafi.com/tools/opportunity-cost-calculator",
    "description": "Calculate the true cost of your spending decisions. See how much your purchases could grow if invested instead, with compound interest projections over time.",
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
        "name": "What is opportunity cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Opportunity cost is the value of the next best alternative you give up when making a decision. In personal finance, it often refers to the potential investment returns you sacrifice when you spend money instead of investing it."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a daily coffee habit really cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A $5 daily coffee costs $1,825 per year. If that money were invested instead at an average 10% annual return, it would grow to approximately $31,000 in 10 years, $115,000 in 20 years, and $340,000 in 30 years."
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
      { '@type': 'ListItem', position: 3, name: 'Opportunity Cost Calculator', item: 'https://www.pulsafi.com/tools/opportunity-cost-calculator' },
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

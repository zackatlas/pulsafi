export const metadata = {
  title: 'Net Worth Calculator | Pulsafi',
  description: 'Calculate your net worth by listing your assets and liabilities. Track your financial progress and see where you stand compared to age-based benchmarks.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/net-worth-calculator',
  },
  openGraph: {
    title: 'Net Worth Calculator — Free Online Calculator | Pulsafi',
    description: 'Calculate your net worth by listing your assets and liabilities. Track your financial progress and see where you stand compared to age-based benchmarks.',
    url: 'https://www.pulsafi.com/tools/net-worth-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Net%20Worth%20Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator — Free Online Calculator | Pulsafi',
    description: 'Calculate your net worth by listing your assets and liabilities. Track your financial progress and see where you stand compared to age-based benchmarks.',
    images: ['/api/og?title=Net%20Worth%20Calculator&type=tool'],
  },
}

export default function Layout({ children }) {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pulsafi Net Worth Calculator",
    "url": "https://www.pulsafi.com/tools/net-worth-calculator",
    "description": "Calculate your net worth by listing your assets and liabilities. Track your financial progress and see where you stand compared to age-based benchmarks.",
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
        "name": "What is a good net worth by age 30?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The median net worth for Americans under 35 is approximately $39,000-$49,000. Financial advisors often suggest having a net worth equal to your annual salary by age 30. If you are above the median, you are ahead of most peers."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate my net worth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Net worth equals total assets minus total liabilities. Assets include cash, investments, retirement accounts, home equity, and vehicles. Liabilities include mortgages, student loans, credit card debt, car loans, and any other debts."
        }
      },
      {
        "@type": "Question",
        "name": "What net worth makes you rich in America?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The top 10% of American households by net worth have approximately $1.9 million or more. The top 1% have roughly $11.1 million or more. However, feeling rich is relative — financial independence is often more meaningful than a specific number."
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
      { '@type': 'ListItem', position: 3, name: 'Net Worth Calculator', item: 'https://www.pulsafi.com/tools/net-worth-calculator' },
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

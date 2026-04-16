export const metadata = {
  title: 'Rent vs Buy Calculator | Pulsafi',
  description: 'Compare the total cost of renting versus buying a home. Factor in mortgage payments, property taxes, maintenance, opportunity cost, and home appreciation.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/rent-vs-buy-calculator',
  },
  openGraph: {
    title: 'Rent vs Buy Calculator — Free Online Calculator | Pulsafi',
    description: 'Compare the total cost of renting versus buying a home. Factor in mortgage payments, property taxes, maintenance, opportunity cost, and home appreciation.',
    url: 'https://www.pulsafi.com/tools/rent-vs-buy-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Rent%20vs%20Buy%20Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent vs Buy Calculator — Free Online Calculator | Pulsafi',
    description: 'Compare the total cost of renting versus buying a home. Factor in mortgage payments, property taxes, maintenance, opportunity cost, and home appreciation.',
    images: ['/api/og?title=Rent%20vs%20Buy%20Calculator&type=tool'],
  },
}

export default function Layout({ children }) {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pulsafi Rent vs Buy Calculator",
    "url": "https://www.pulsafi.com/tools/rent-vs-buy-calculator",
    "description": "Compare the total cost of renting versus buying a home. Factor in mortgage payments, property taxes, maintenance, opportunity cost, and home appreciation.",
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
        "name": "When does buying become cheaper than renting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In most markets, buying becomes financially better than renting after 5-7 years of ownership. This is when the equity you've built through mortgage paydown and home appreciation exceeds the transaction costs and maintenance expenses. However, this varies significantly based on local home prices, appreciation rates, and rental costs."
        }
      },
      {
        "@type": "Question",
        "name": "What is opportunity cost and why does it matter in rent vs buy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Opportunity cost is what your down payment would have earned if invested in the stock market instead of tied up in real estate. For example, a $80,000 down payment could grow at 8-10% annually in an index fund. By including this in your calculation, you see the true financial cost of choosing to buy versus rent and invest elsewhere."
        }
      },
      {
        "@type": "Question",
        "name": "Should I use this calculator if I'm only renting for 3 years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If you know you're moving in 3 years, use this calculator with a 3-year time horizon. In most cases, renting is cheaper over short periods because closing costs, transaction fees, and home maintenance haven't been offset by appreciation and equity buildup. This calculator will clearly show that buying doesn't make financial sense for short-term situations."
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
      { '@type': 'ListItem', position: 3, name: 'Rent vs Buy Calculator', item: 'https://www.pulsafi.com/tools/rent-vs-buy-calculator' },
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

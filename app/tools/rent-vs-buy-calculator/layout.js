export const metadata = {
  title: 'Rent vs Buy Calculator — Should You Buy or Keep Renting? | Pulsafi',
  description: 'Compare the true cost of renting vs buying a home. Accounts for appreciation, opportunity cost, taxes, maintenance, and more.',
  openGraph: {
    title: 'Rent vs Buy Calculator — Pulsafi',
    description: 'Compare the true cost of renting vs buying. See which option saves you more money over time.',
    url: 'https://pulsafi.com/tools/rent-vs-buy-calculator',
    images: [{ url: '/api/og?title=Rent+vs+Buy+Calculator&subtitle=Should+You+Buy+or+Keep+Renting%3F&type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Rent+vs+Buy+Calculator&subtitle=Should+You+Buy+or+Keep+Renting%3F&type=default'],
  },
}

export default function Layout({ children }) {
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
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pulsafi.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://pulsafi.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Rent vs Buy Calculator', item: 'https://pulsafi.com/tools/rent-vs-buy-calculator' },
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

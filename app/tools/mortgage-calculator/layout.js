export const metadata = {
  title: 'Free Mortgage Calculator — Estimate Monthly Payments',
  description: 'Calculate your monthly mortgage payment including principal, interest, property taxes, insurance, and HOA. See amortization schedule and total cost. Free, no signup.',
  openGraph: {
    title: 'Free Mortgage Calculator — Pulsafi',
    description: 'Calculate monthly mortgage payments with taxes, insurance & HOA. See your full amortization schedule.',
    url: 'https://pulsafi.com/tools/mortgage-calculator',
    images: [{ url: '/api/og?title=Mortgage+Calculator&subtitle=Calculate+Monthly+Payments&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Mortgage+Calculator&subtitle=Calculate+Monthly+Payments&type=tool'],
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much house can I afford on a $75,000 salary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On a $75,000 salary, you can typically afford a home priced between $225,000 and $300,000, depending on your debts, down payment, and local tax rates. Most lenders use the 28/36 rule: your housing costs should not exceed 28% of gross income."
        }
      },
      {
        "@type": "Question",
        "name": "What is included in a monthly mortgage payment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A monthly mortgage payment typically includes principal, interest, property taxes, homeowners insurance, and sometimes PMI (private mortgage insurance) and HOA fees. This is often called PITI."
        }
      },
      {
        "@type": "Question",
        "name": "How much does 1% interest rate change affect my mortgage payment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For every 1% increase in interest rate on a $300,000 30-year mortgage, your monthly payment increases by roughly $170-$190. Over the life of the loan, that adds up to over $60,000 in additional interest."
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
      { '@type': 'ListItem', position: 3, name: 'Mortgage Calculator', item: 'https://pulsafi.com/tools/mortgage-calculator' },
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

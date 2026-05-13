export const metadata = {
  title: 'Emergency Fund Calculator',
  description: 'Calculate how much emergency fund you need based on your monthly expenses, income stability, and family situation. Get a personalized savings target.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/emergency-fund-calculator',
  },
  openGraph: {
    title: 'Emergency Fund Calculator — Free Online Calculator',
    description: 'Calculate how much emergency fund you need based on your monthly expenses, income stability, and family situation. Get a personalized savings target.',
    url: 'https://www.pulsafi.com/tools/emergency-fund-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Emergency%20Fund%20Calculator&type=tool',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Emergency Fund Calculator — Free Online Calculator',
    description: 'Calculate how much emergency fund you need based on your monthly expenses, income stability, and family situation. Get a personalized savings target.',
    images: ['/api/og?title=Emergency%20Fund%20Calculator&type=tool'],
  },
};

export default function Layout({ children }) {
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pulsafi Emergency Fund Calculator",
    "url": "https://www.pulsafi.com/tools/emergency-fund-calculator",
    "description": "Calculate how much emergency fund you need based on your monthly expenses, income stability, and family situation. Get a personalized savings target.",
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
        "name": "How much emergency fund do I need?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most financial experts recommend 3-6 months of living expenses in an emergency fund. However, freelancers, self-employed individuals, or those with unstable income should aim for 9-12 months. Single parents and those with health concerns should lean toward the higher end. Your emergency fund should cover rent, utilities, groceries, insurance, transportation, and other essential monthly expenses."
        }
      },
      {
        "@type": "Question",
        "name": "Where should I keep my emergency fund?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your emergency fund should be in a liquid, accessible account separate from your regular checking account. High-yield savings accounts (HYSA) are ideal because they offer 4-5% APY while keeping your money accessible within 1-2 business days. Money market accounts and short-term CDs are also good options. Avoid investing emergency funds in stocks or other volatile investments."
        }
      },
      {
        "@type": "Question",
        "name": "What counts as a true emergency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "True emergencies include job loss or income reduction, unexpected medical expenses, major home repairs (roof, foundation, plumbing), major car repairs, and unexpected family emergencies. Your emergency fund should NOT be used for vacations, holiday shopping, car down payments, or other planned expenses. It's meant for situations where you need cash quickly and have no other options."
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pulsafi.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://www.pulsafi.com/tools'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Emergency Fund Calculator',
        item: 'https://www.pulsafi.com/tools/emergency-fund-calculator'
      }
    ]
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

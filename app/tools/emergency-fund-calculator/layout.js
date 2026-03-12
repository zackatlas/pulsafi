export const metadata = {
  title: 'Free Emergency Fund Calculator — How Much Do You Need?',
  description: 'Calculate how much emergency savings you need based on your monthly expenses. See your progress toward your goal. Get personalized recommendations based on your job stability.',
  openGraph: {
    title: 'Free Emergency Fund Calculator — Pulsafi',
    url: 'https://pulsafi.com/tools/emergency-fund-calculator',
    images: [
      {
        url: '/api/og?title=Emergency+Fund+Calculator&subtitle=How+Much+Do+You+Need%3F&type=tool',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Emergency+Fund+Calculator&subtitle=How+Much+Do+You+Need%3F&type=tool'],
  },
};

export default function Layout({ children }) {
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
        item: 'https://pulsafi.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://pulsafi.com/tools'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Emergency Fund Calculator',
        item: 'https://pulsafi.com/tools/emergency-fund-calculator'
      }
    ]
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

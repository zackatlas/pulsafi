export const metadata = {
  title: 'How to Build an Emergency Fund in 2026: Complete Guide',
  description: 'Learn how to build a 3-6 month emergency fund, where to keep it, and a step-by-step plan to protect your finances. Expert strategies for 2026.',
  keywords: 'emergency fund, emergency savings, financial emergency, build emergency fund, how much emergency fund, high yield savings',
  openGraph: {
    title: 'How to Build an Emergency Fund in 2026: Complete Guide',
    description: 'Learn how to build a 3-6 month emergency fund, where to keep it, and a step-by-step plan to protect your finances.',
    type: 'article',
    url: 'https://pulsafi.com/learn/how-to-build-an-emergency-fund-2026',
    image: 'https://pulsafi.com/images/emergency-fund-guide.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build an Emergency Fund in 2026: Complete Guide',
    description: 'Learn how to build a 3-6 month emergency fund, where to keep it, and a step-by-step plan to protect your finances.',
    image: 'https://pulsafi.com/images/emergency-fund-guide.jpg',
  },
};

export default function Layout({ children }) {
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://pulsafi.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learn',
        item: 'https://pulsafi.com/learn',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Emergency Fund',
        item: 'https://pulsafi.com/learn/how-to-build-an-emergency-fund-2026',
      },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Build an Emergency Fund in 2026: Complete Guide',
    description: 'Learn how to build a 3-6 month emergency fund, where to keep it, and a step-by-step plan to protect your finances.',
    image: 'https://pulsafi.com/images/emergency-fund-guide.jpg',
    datePublished: '2026-03-19',
    dateModified: '2026-03-19',
    author: {
      '@type': 'Organization',
      name: 'PulsaFi',
      url: 'https://pulsafi.com',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much money should I have in an emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most financial experts recommend keeping 3-6 months of essential expenses in your emergency fund. This covers most unexpected situations without leaving you overexposed to risk.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where should I keep my emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Keep your emergency fund in a high-yield savings account that offers FDIC insurance, easy access, and competitive interest rates. Avoid stocks and investments that can lose value when you need the money most.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to build an emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The timeline depends on your income and expenses. Starting with $1,000 for true emergencies is achievable in 1-3 months for most people. Building a full 3-6 month fund typically takes 6-18 months.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I invest my emergency fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Emergency funds should remain in safe, liquid accounts like high-yield savings. The goal is safety and access, not growth. Separate your emergency fund from investment accounts.',
        },
      },
      {
        '@type': 'Question',
        name: 'What counts as an emergency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'True emergencies include job loss, medical expenses, car repairs, home repairs, and unexpected family situations. Non-emergencies include vacations, holidays, and planned purchases you can save for separately.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      {children}
    </>
  );
}

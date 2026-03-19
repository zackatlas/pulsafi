import Head from 'next/head';

export const metadata = {
  title: 'First-Time Homebuyer Guide 2026: Programs, Tips, and Step-by-Step Process',
  description: 'Complete guide to first-time homebuyer programs, down payment assistance, loan types, and practical tips for buying your first home in 2026.',
  keywords: 'first-time homebuyer, down payment assistance, FHA loans, first time buyer programs, how to buy a house',
  authors: [{ name: 'Pulsafi' }],
  robots: 'index, follow',
  canonical: 'https://pulsafi.com/learn/first-time-homebuyer-guide-2026',
  openGraph: {
    title: 'First-Time Homebuyer Guide 2026: Programs, Tips, and Step-by-Step Process',
    description: 'Complete guide to first-time homebuyer programs, down payment assistance, loan types, and practical tips for buying your first home in 2026.',
    url: 'https://pulsafi.com/learn/first-time-homebuyer-guide-2026',
    type: 'article',
    article: {
      publishedTime: '2026-03-19T00:00:00Z',
      modifiedTime: '2026-03-19T00:00:00Z',
      authors: ['Pulsafi'],
      tags: ['real-estate', 'homebuying', 'first-time-buyer', 'down-payment'],
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'First-Time Homebuyer Guide 2026: Programs, Tips, and Step-by-Step Process',
    description: 'Complete guide to first-time homebuyer programs, down payment assistance, loan types, and practical tips for buying your first home in 2026.',
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
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
          name: 'First-Time Homebuyer Guide 2026',
          item: 'https://pulsafi.com/learn/first-time-homebuyer-guide-2026',
        },
      ],
    },
    {
      '@type': 'Article',
      headline: 'First-Time Homebuyer Guide 2026: Programs, Tips, and Step-by-Step Process',
      description: 'Complete guide to first-time homebuyer programs, down payment assistance, loan types, and practical tips for buying your first home in 2026.',
      url: 'https://pulsafi.com/learn/first-time-homebuyer-guide-2026',
      datePublished: '2026-03-19T00:00:00Z',
      dateModified: '2026-03-19T00:00:00Z',
      author: {
        '@type': 'Organization',
        name: 'Pulsafi',
        url: 'https://pulsafi.com',
      },
      image: 'https://pulsafi.com/images/first-time-homebuyer-guide.jpg',
      articleBody: 'Complete guide covering homebuying timeline, affordability calculations, down payment options, loan types, buyer programs, and practical tips for first-time homebuyers.',
      keywords: 'first-time homebuyer, down payment assistance, FHA loans, first time buyer programs',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What are the best first-time homebuyer programs available?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The best first-time homebuyer programs include FHA loans (3.5% down), state and local down payment assistance programs, VA loans for veterans (0% down), USDA loans for rural properties (0% down), Good Neighbor Next Door for federal employees, and Fannie Mae HomeReady/Freddie Mac HomePossible programs.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much house can I afford as a first-time buyer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use the 28/36 rule as a guide: housing costs should not exceed 28% of gross monthly income, and total debt payments (including housing) should not exceed 36%. Your lender will consider your debt-to-income ratio, credit score, and savings when determining your loan amount.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between pre-approval and pre-qualification?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Pre-qualification is an informal estimate based on self-reported information and carries no weight with sellers. Pre-approval involves a thorough review of your finances, credit, and income, providing a verified letter showing how much you can borrow. Pre-approval is much stronger in the home buying process.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the true costs of buying a home beyond the down payment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Beyond your down payment, budget for closing costs (2-5% of purchase price), home inspection ($300-500), appraisal ($400-600), title search and insurance, homeowners insurance, property taxes, HOA fees (if applicable), moving costs, and immediate repairs or renovations.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I remove PMI from my mortgage?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can remove PMI through: reaching 20% equity (through payments or home appreciation), refinancing when your loan-to-value ratio improves, automatically at 78% of original loan value (some loans), or requesting removal once you have 20% equity and meet other criteria like making on-time payments.',
          },
        },
      ],
    },
  ],
};

export default function Layout({ children }) {
  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://pulsafi.com/learn/first-time-homebuyer-guide-2026" />
      </head>
      {children}
    </>
  );
}

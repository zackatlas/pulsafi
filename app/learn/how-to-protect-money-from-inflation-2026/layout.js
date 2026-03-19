const siteUrl = 'https://pulsafi.com';
const articleUrl = `${siteUrl}/learn/how-to-protect-money-from-inflation-2026`;

export const metadata = {
  title: 'How to Protect Your Money from Inflation in 2026',
  description: 'Learn proven strategies to protect your money from inflation. Discover asset classes, investment vehicles, and portfolio allocations that defend purchasing power.',
  canonical: articleUrl,
  openGraph: {
    title: 'How to Protect Your Money from Inflation in 2026',
    description: 'Learn proven strategies to protect your money from inflation. Discover asset classes, investment vehicles, and portfolio allocations that defend purchasing power.',
    url: articleUrl,
    type: 'article',
    publishedTime: '2026-03-19T00:00:00Z',
    modifiedTime: '2026-03-19T00:00:00Z',
    authors: ['Pulsafi'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Protect Your Money from Inflation in 2026',
    description: 'Learn proven strategies to protect your money from inflation.',
  },
  keywords: [
    'inflation protection',
    'purchasing power',
    'inflation hedging',
    'investment strategy',
    'TIPS bonds',
    'I-Bonds',
    'inflation-resistant assets',
    'portfolio allocation',
    'real returns',
    '2026',
  ],
};

export default function RootLayout({ children }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Pulsafi',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learn',
        item: `${siteUrl}/learn`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'How to Protect Your Money from Inflation in 2026',
        item: articleUrl,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': articleUrl,
    headline: 'How to Protect Your Money from Inflation in 2026',
    description: 'Learn proven strategies to protect your money from inflation. Discover asset classes, investment vehicles, and portfolio allocations that defend purchasing power.',
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/inflation-protection-2026.jpg`,
      width: 1200,
      height: 630,
    },
    datePublished: '2026-03-19T00:00:00Z',
    dateModified: '2026-03-19T00:00:00Z',
    author: {
      '@type': 'Organization',
      name: 'Pulsafi',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Pulsafi',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 250,
        height: 60,
      },
    },
    articleSection: 'Investing',
    articleBody: 'Comprehensive guide to protecting your money from inflation through various asset classes and investment strategies.',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does inflation affect my savings?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Inflation erodes the purchasing power of your money over time. Even in a savings account earning interest, if the interest rate is lower than inflation, your money is losing real value. For example, at 3% inflation with a 1% savings account rate, you lose 2% in purchasing power annually.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the best assets to protect against inflation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best inflation-protecting assets include: stocks (S&P 500 averages ~7% real returns), real estate, TIPS bonds (Treasury Inflation-Protected Securities), I-Bonds, commodities, and precious metals like gold. Each has different risk profiles and benefits.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are I-Bonds and how do they work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'I-Bonds (Series I Savings Bonds) are U.S. Treasury bonds that protect against inflation by adjusting interest rates every 6 months based on CPI data. The rate consists of a fixed rate plus an inflation component, ensuring your returns keep pace with inflation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I move all my money into stocks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. While stocks offer strong long-term inflation protection, they come with volatility risk. A balanced portfolio typically includes stocks, bonds, real estate, and alternative assets tailored to your risk tolerance, time horizon, and financial goals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is hoarding gold or cryptocurrency a good inflation hedge?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Gold can be part of an inflation hedge strategy but should be limited to 5-10% of a portfolio due to lack of cash flow. Cryptocurrency remains highly volatile and speculative, making it unsuitable as a reliable inflation protection strategy for most investors.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}

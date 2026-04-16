export const metadata = {
  title: 'Index Fund Investing Guide 2026: Beginners Guide to Index Funds',
  description: 'Complete beginner guide to index fund investing in 2026. Learn how index funds work, S&P 500 vs total market, expense ratios, dollar cost averaging, and how to start with $100.',
  keywords: 'index funds, index fund investing, S&P 500 index fund, total stock market index, best index funds, how to invest in index funds',
  openGraph: {
    title: 'Index Fund Investing Guide 2026: Beginners Guide to Index Funds',
    description: 'Complete beginner guide to index fund investing in 2026. Learn how index funds work, S&P 500 vs total market, expense ratios, and how to start.',
    type: 'article',
    url: 'https://www.pulsafi.com/learn/index-fund-investing-guide-2026',
    image: 'https://www.pulsafi.com/images/index-fund-guide.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Index Fund Investing Guide 2026: Beginners Guide to Index Funds',
    description: 'Complete beginner guide to index fund investing in 2026. Learn how index funds work, S&P 500 vs total market, and how to start.',
    image: 'https://www.pulsafi.com/images/index-fund-guide.jpg',
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
        item: 'https://www.pulsafi.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Learn',
        item: 'https://www.pulsafi.com/learn',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Index Fund Investing',
        item: 'https://www.pulsafi.com/learn/index-fund-investing-guide-2026',
      },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Index Fund Investing Guide 2026: Beginners Guide to Index Funds',
    description: 'Complete beginner guide to index fund investing in 2026.',
    image: 'https://www.pulsafi.com/images/index-fund-guide.jpg',
    datePublished: '2026-03-19',
    dateModified: '2026-03-19',
    author: {
      '@type': 'Organization',
      name: 'PulsaFi',
      url: 'https://www.pulsafi.com',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is an index fund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An index fund is a mutual fund or ETF designed to track the performance of a specific market index like the S&P 500. Instead of paying a manager to pick stocks, index funds hold all stocks in the index, providing instant diversification and low fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I invest in S&P 500 or total stock market index?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both are excellent. S&P 500 includes 500 large-cap companies. Total stock market includes ~3,500 companies (large, mid, and small-cap). Total market is more diversified. For simplicity, either works; many people choose total market.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is expense ratio and why does it matter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Expense ratio is the annual fee charged by the fund, expressed as a percentage. A 0.03% expense ratio on $10,000 costs $3/year. Low expense ratios compound dramatically over decades, adding thousands in extra returns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I start investing with just $100?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Most brokers allow investing with $1-100. Set up automatic monthly contributions. With dollar cost averaging, starting small works perfectly. Time in market matters more than amount at any single time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is dollar cost averaging or lump sum better?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Statistically, lump sum investing beats dollar cost averaging slightly. However, emotionally, dollar cost averaging (investing monthly) feels safer and removes timing risk. Either approach beats not investing.',
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

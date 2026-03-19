export const metadata = {
  title: 'How Much Should You Have Saved for Retirement by Age?',
  description: 'Retirement savings benchmarks by age from 25 to 65. See if you\'re on track and what to do if you\'re behind.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-much-to-save-for-retirement-by-age',
  },
  openGraph: {
    title: 'How Much Should You Have Saved for Retirement by Age?',
    description: 'Retirement savings benchmarks by age from 25 to 65. See if you\'re on track and what to do if you\'re behind.',
    url: 'https://pulsafi.com/learn/how-much-to-save-for-retirement-by-age',
    type: 'article',
    images: [{ url: '/api/og?title=Retirement+Savings+by+Age&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much Should You Have Saved for Retirement by Age?',
    description: 'Retirement savings benchmarks by age from 25 to 65. See if you\'re on track and what to do if you\'re behind.',
    images: ['/api/og?title=Retirement+Savings+by+Age&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pulsafi.com' },
              { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://pulsafi.com/learn' },
              { '@type': 'ListItem', position: 3, name: 'How Much Should You Have Saved for Retirement by Age?', item: 'https://pulsafi.com/learn/how-much-to-save-for-retirement-by-age' },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How Much Should You Have Saved for Retirement by Age?',
            description: 'Retirement savings benchmarks by age from 25 to 65. See if you\'re on track and what to do if you\'re behind.',
            author: {
              '@type': 'Organization',
              name: 'Pulsafi',
              url: 'https://pulsafi.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Pulsafi',
              url: 'https://pulsafi.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://pulsafi.com/icon.png',
              },
            },
            datePublished: '2025-03-01',
            dateModified: '2026-03-18',
            mainEntityOfPage: {
              '@id': 'https://pulsafi.com/learn/how-much-to-save-for-retirement-by-age',
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much should I have saved for retirement by age 30?",
                "acceptedAnswer": { "@type": "Answer", "text": "A common benchmark is having 1x your annual salary saved by age 30. If you earn $60,000, aim for $60,000 in retirement savings. This assumes consistent savings and investment throughout your career." }
              },
              {
                "@type": "Question",
                "name": "How much should I have saved for retirement by age 40?",
                "acceptedAnswer": { "@type": "Answer", "text": "By age 40, most advisors recommend having 3x your annual salary saved. This gives you more time to recover from market downturns and compound growth before retirement at 65." }
              },
              {
                "@type": "Question",
                "name": "How much should I have saved for retirement by age 50?",
                "acceptedAnswer": { "@type": "Answer", "text": "By age 50, aim for 6x your annual salary saved. At this point, you can also use catch-up contributions to IRAs and 401(k)s if you're behind, allowing you to save an additional $7,500-$10,000 per year." }
              },
              {
                "@type": "Question",
                "name": "What if I'm behind on retirement savings?",
                "acceptedAnswer": { "@type": "Answer", "text": "If you're behind, increase your savings rate, use catch-up contributions at age 50+, delay retirement by a few years, or plan to work part-time in early retirement. Small changes now can significantly impact your retirement timeline." }
              },
              {
                "@type": "Question",
                "name": "Is Social Security enough to retire on?",
                "acceptedAnswer": { "@type": "Answer", "text": "Social Security replaces about 40% of pre-retirement income for average earners, but most experts recommend having 70-80% replacement rate. Social Security should supplement retirement savings, not be your only source of income." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

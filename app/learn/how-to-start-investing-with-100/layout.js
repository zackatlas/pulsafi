export const metadata = {
  title: 'How to Start Investing with Just $100',
  description: 'A complete beginner\'s guide to investing with $100 or less. Best platforms, what to buy, and how to grow your first investment.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-to-start-investing-with-100',
  },
  openGraph: {
    title: 'How to Start Investing with Just $100',
    description: 'A complete beginner\'s guide to investing with $100 or less. Best platforms, what to buy, and how to grow your first investment.',
    url: 'https://pulsafi.com/learn/how-to-start-investing-with-100',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Start+Investing+with+Just+100&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start Investing with Just $100',
    description: 'A complete beginner\'s guide to investing with $100 or less. Best platforms, what to buy, and how to grow your first investment.',
    images: ['/api/og?title=How+to+Start+Investing+with+Just+100&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'How to Start Investing with Just $100', item: 'https://pulsafi.com/learn/how-to-start-investing-with-100' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

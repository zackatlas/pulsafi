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
      {children}
    </>
  )
}

export const metadata = {
  title: 'Should You Invest or Pay Off Debt First?',
  description: 'The math and psychology behind the invest vs pay off debt decision. A clear framework to decide what\'s right for your financial situation.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/investing-vs-paying-off-debt',
  },
  openGraph: {
    title: 'Should You Invest or Pay Off Debt First?',
    description: 'The math and psychology behind the invest vs pay off debt decision. A clear framework to decide what\'s right for your financial situation.',
    url: 'https://pulsafi.com/learn/investing-vs-paying-off-debt',
    type: 'article',
    images: [{ url: '/api/og?title=Should+You+Invest+or+Pay+Off+Debt+First&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Should You Invest or Pay Off Debt First?',
    description: 'The math and psychology behind the invest vs pay off debt decision. A clear framework to decide what\'s right for your financial situation.',
    images: ['/api/og?title=Should+You+Invest+or+Pay+Off+Debt+First&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'Should You Invest or Pay Off Debt First?', item: 'https://pulsafi.com/learn/investing-vs-paying-off-debt' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

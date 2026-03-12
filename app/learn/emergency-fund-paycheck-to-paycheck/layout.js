export const metadata = {
  title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck',
  description: 'Realistic strategies to build your first emergency fund starting from zero. No "just skip lattes" advice — real steps that work.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/emergency-fund-paycheck-to-paycheck',
  },
  openGraph: {
    title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck',
    description: 'Realistic strategies to build your first emergency fund starting from zero. No "just skip lattes" advice — real steps that work.',
    url: 'https://pulsafi.com/learn/emergency-fund-paycheck-to-paycheck',
    type: 'article',
    images: [{ url: '/api/og?title=Emergency+Fund+When+Living+Paycheck+to+Paycheck&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck',
    description: 'Realistic strategies to build your first emergency fund starting from zero. No "just skip lattes" advice — real steps that work.',
    images: ['/api/og?title=Emergency+Fund+When+Living+Paycheck+to+Paycheck&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck', item: 'https://pulsafi.com/learn/emergency-fund-paycheck-to-paycheck' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

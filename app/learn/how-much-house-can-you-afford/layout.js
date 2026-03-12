export const metadata = {
  title: 'How Much House Can You Actually Afford?',
  description: 'The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-much-house-can-you-afford',
  },
  openGraph: {
    title: 'How Much House Can You Actually Afford?',
    description: 'The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.',
    url: 'https://pulsafi.com/learn/how-much-house-can-you-afford',
    type: 'article',
    images: [{ url: '/api/og?title=How+Much+House+Can+You+Afford&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Much House Can You Actually Afford?',
    description: 'The 28/36 rule, DTI ratios, and real-world examples to figure out your actual home buying budget. Includes a free mortgage calculator.',
    images: ['/api/og?title=How+Much+House+Can+You+Afford&type=article'],
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
              { '@type': 'ListItem', position: 3, name: 'How Much House Can You Actually Afford?', item: 'https://pulsafi.com/learn/how-much-house-can-you-afford' },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'Investing vs Paying Off Debt: The Math on What Comes First',
  description: 'Stuck between investing and paying off debt? The answer depends on your interest rates, risk tolerance, and timeline. Here\'s the math.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/investing-vs-paying-off-debt',
  },
  openGraph: {
    title: 'Investing vs Paying Off Debt: The Math on What Comes First',
    description: 'Stuck between investing and paying off debt? The answer depends on your interest rates, risk tolerance, and timeline. Here\'s the math.',
    url: 'https://pulsafi.com/learn/investing-vs-paying-off-debt',
    type: 'article',
    images: [{ url: '/api/og?title=Investing+vs+Paying+Off+Debt:+The+Math+on+What+Comes+First&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investing vs Paying Off Debt: The Math on What Comes First',
    description: 'Stuck between investing and paying off debt? The answer depends on your interest rates, risk tolerance, and timeline. Here\'s the math.',
    images: ['/api/og?title=Investing+vs+Paying+Off+Debt:+The+Math+on+What+Comes+First&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Investing vs Paying Off Debt: The Math on What Comes First", "item": "https://pulsafi.com/learn/investing-vs-paying-off-debt"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Investing vs Paying Off Debt: The Math on What Comes First", "description": "Stuck between investing and paying off debt? The answer depends on your interest rates, risk tolerance, and timeline. Here's the math.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/investing-vs-paying-off-debt"}}),
        }}
      />
      {children}
    </>
  )
}

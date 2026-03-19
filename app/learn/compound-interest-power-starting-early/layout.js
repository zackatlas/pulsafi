export const metadata = {
  title: 'The Power of Compound Interest: Why Starting Early Matters',
  description: 'Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/compound-interest-power-starting-early',
  },
  openGraph: {
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    description: 'Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.',
    url: 'https://pulsafi.com/learn/compound-interest-power-starting-early',
    type: 'article',
    images: [{ url: '/api/og?title=The+Power+of+Compound+Interest:+Why+Starting+Early+Matters&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Power of Compound Interest: Why Starting Early Matters',
    description: 'Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.',
    images: ['/api/og?title=The+Power+of+Compound+Interest:+Why+Starting+Early+Matters&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "The Power of Compound Interest: Why Starting Early Matters", "item": "https://pulsafi.com/learn/compound-interest-power-starting-early"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "The Power of Compound Interest: Why Starting Early Matters", "description": "Learn how starting to invest even 5 years earlier can mean hundreds of thousands more at retirement. Interactive examples and real math inside.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/compound-interest-power-starting-early"}}),
        }}
      />
      {children}
    </>
  )
}

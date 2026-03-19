export const metadata = {
  title: 'How to Build Wealth in Your 20s: A Step-by-Step Guide | Pulsafi',
  description: 'Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/how-to-build-wealth-in-your-20s',
  },
  openGraph: {
    title: 'How to Build Wealth in Your 20s: A Step-by-Step Guide',
    description: 'Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.',
    url: 'https://pulsafi.com/learn/how-to-build-wealth-in-your-20s',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Build+Wealth+in+Your+20s&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build Wealth in Your 20s: A Step-by-Step Guide',
    description: 'Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.',
    images: ['/api/og?title=How+to+Build+Wealth+in+Your+20s&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Build Wealth in Your 20s: A Step-by-Step Guide", "item": "https://pulsafi.com/learn/how-to-build-wealth-in-your-20s"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Build Wealth in Your 20s: A Step-by-Step Guide", "description": "Start building real wealth in your 20s with a clear, actionable roadmap. Master income, investing, and compound interest when you have the most time on your side.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/how-to-build-wealth-in-your-20s"}}),
        }}
      />
      {children}
    </>
  )
}

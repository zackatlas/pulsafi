export const metadata = {
  title: 'Best High-Yield Savings Accounts in 2026: Where to Park Your Cash',
  description: 'Compare the best high-yield savings accounts in 2026. We break down APYs, minimum balances, fees, and features to help you earn more on your savings.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/best-high-yield-savings-accounts-2026',
  },
  openGraph: {
    title: 'Best High-Yield Savings Accounts in 2026: Where to Park Your Cash',
    description: 'Compare the best high-yield savings accounts in 2026. We break down APYs, minimum balances, fees, and features to help you earn more on your savings.',
    url: 'https://pulsafi.com/learn/best-high-yield-savings-accounts-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Best+High-Yield+Savings+Accounts+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best High-Yield Savings Accounts in 2026: Where to Park Your Cash',
    description: 'Compare the best high-yield savings accounts in 2026. We break down APYs, minimum balances, fees, and features to help you earn more on your savings.',
    images: ['/api/og?title=Best+High-Yield+Savings+Accounts+2026&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Best High-Yield Savings Accounts in 2026", "item": "https://pulsafi.com/learn/best-high-yield-savings-accounts-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Best High-Yield Savings Accounts in 2026: Where to Park Your Cash", "description": "Compare the best high-yield savings accounts in 2026. We break down APYs, minimum balances, fees, and features to help you earn more on your savings.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/best-high-yield-savings-accounts-2026"}}),
        }}
      />
      {children}
    </>
  )
}

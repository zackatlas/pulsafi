export const metadata = {
  title: '401(k) vs Roth IRA vs Taxable Brokerage: Where to Invest First',
  description: 'A clear decision framework for choosing between 401(k), Roth IRA, and taxable brokerage accounts. Tax implications and optimal order explained.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/401k-roth-ira-taxable-brokerage',
  },
  openGraph: {
    title: '401(k) vs Roth IRA vs Taxable Brokerage: Where to Invest First',
    description: 'A clear decision framework for choosing between 401(k), Roth IRA, and taxable brokerage accounts. Tax implications and optimal order explained.',
    url: 'https://pulsafi.com/learn/401k-roth-ira-taxable-brokerage',
    type: 'article',
    images: [{ url: '/api/og?title=401(k)+vs+Roth+IRA+vs+Taxable+Brokerage:+Where+to+Invest+First&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '401(k) vs Roth IRA vs Taxable Brokerage: Where to Invest First',
    description: 'A clear decision framework for choosing between 401(k), Roth IRA, and taxable brokerage accounts. Tax implications and optimal order explained.',
    images: ['/api/og?title=401(k)+vs+Roth+IRA+vs+Taxable+Brokerage:+Where+to+Invest+First&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "401(k) vs Roth IRA vs Taxable Brokerage: Where to Invest First", "item": "https://pulsafi.com/learn/401k-roth-ira-taxable-brokerage"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "401(k) vs Roth IRA vs Taxable Brokerage: Where to Invest First", "description": "A clear decision framework for choosing between 401(k), Roth IRA, and taxable brokerage accounts. Tax implications and optimal order explained.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/401k-roth-ira-taxable-brokerage"}}),
        }}
      />
      {children}
    </>
  )
}

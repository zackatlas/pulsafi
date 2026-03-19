export const metadata = {
  title: 'Roth IRA vs 401(k): Which Should You Max Out First in 2026?',
  description: '2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins for your situation.',
  keywords: 'Roth IRA vs 401k, 401k contribution limits 2026, Roth IRA limits, backdoor Roth, tax-advantaged accounts, retirement accounts',
  alternates: {
    canonical: 'https://pulsafi.com/learn/roth-ira-vs-401k-2026',
  },
  openGraph: {
    title: 'Roth IRA vs 401(k): Which Should You Max Out First in 2026?',
    description: '2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins.',
    url: 'https://pulsafi.com/learn/roth-ira-vs-401k-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Roth+IRA+vs+401%28k%29:+Which+Should+You+Max+Out+First+in+2026?&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roth IRA vs 401(k): Which Should You Max Out First in 2026?',
    description: '2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins.',
    images: ['/api/og?title=Roth+IRA+vs+401%28k%29:+Which+Should+You+Max+Out+First+in+2026?&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Roth IRA vs 401(k): Which Should You Max Out First in 2026?", "item": "https://pulsafi.com/learn/roth-ira-vs-401k-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Roth IRA vs 401(k): Which Should You Max Out First in 2026?", "description": "2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/roth-ira-vs-401k-2026"}}),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'Roth IRA vs 401(k): Which Should You Max Out First in 2026?',
  description: '2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins for your situation.',
  keywords: 'Roth IRA vs 401k, 401k contribution limits 2026, Roth IRA limits, backdoor Roth, tax-advantaged accounts, retirement accounts',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/roth-ira-vs-401k-2026',
  },
  openGraph: {
    title: 'Roth IRA vs 401(k): Which Should You Max Out First in 2026?',
    description: '2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins.',
    url: 'https://www.pulsafi.com/learn/roth-ira-vs-401k-2026',
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
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Roth IRA vs 401(k): Which Should You Max Out First in 2026?", "item": "https://www.pulsafi.com/learn/roth-ira-vs-401k-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Roth IRA vs 401(k): Which Should You Max Out First in 2026?", "description": "2026 contribution limits, tax implications, and the exact priority order for maxing Roth IRA vs 401(k). Real dollar examples show which account wins for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2026-03-19", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/roth-ira-vs-401k-2026"}}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the difference between a Roth IRA and a 401(k)?",
                "acceptedAnswer": { "@type": "Answer", "text": "A 401(k) is employer-sponsored with tax-deductible contributions and employer matching. A Roth IRA is individual with post-tax contributions but tax-free growth and withdrawals. 401(k)s have higher limits ($23,500 in 2024 vs $7,000 for Roth IRAs)." }
              },
              {
                "@type": "Question",
                "name": "Which should I max out first, Roth IRA or 401(k)?",
                "acceptedAnswer": { "@type": "Answer", "text": "Prioritize a 401(k) up to your employer match first (it's free money), then max a Roth IRA, then contribute remaining income to your 401(k). This order captures matching while leveraging Roth tax-free growth for long-term wealth." }
              },
              {
                "@type": "Question",
                "name": "Can I have both a Roth IRA and a 401(k)?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can have both simultaneously. You can contribute to both in the same year, but Roth IRA contributions are limited by income. This combination is ideal: you get employer matching from 401(k) and tax-free growth from Roth." }
              },
              {
                "@type": "Question",
                "name": "What are the 2026 contribution limits for Roth IRA and 401(k)?",
                "acceptedAnswer": { "@type": "Answer", "text": "2026 limits are $7,000 for Roth IRA (age under 50) and $23,500 for 401(k). Those 50+ can add catch-up contributions: $1,000 extra for Roth, $7,500 extra for 401(k). These limits adjust annually for inflation." }
              },
              {
                "@type": "Question",
                "name": "What is a backdoor Roth and should I do one?",
                "acceptedAnswer": { "@type": "Answer", "text": "A backdoor Roth lets high earners contribute to a traditional IRA, then convert to Roth to bypass income limits. Consult a tax advisor because pro-rata rules apply if you have existing traditional IRAs. It's valuable but requires careful execution." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

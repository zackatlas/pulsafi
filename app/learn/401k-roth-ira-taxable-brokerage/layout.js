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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which account should I fund first: 401(k), Roth IRA, or taxable brokerage?",
                "acceptedAnswer": { "@type": "Answer", "text": "Start with your 401(k) up to your employer's match, then max a Roth IRA ($7,000 in 2024), then return to 401(k), and finally use a taxable brokerage for additional savings." }
              },
              {
                "@type": "Question",
                "name": "Should I maximize my 401(k) before opening a Roth IRA?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. It's generally better to get your full employer match in the 401(k) first, then maximize a Roth IRA for tax-free growth, then return to max your 401(k)." }
              },
              {
                "@type": "Question",
                "name": "What are the tax benefits of investing in a taxable brokerage account?",
                "acceptedAnswer": { "@type": "Answer", "text": "Taxable brokerage accounts allow unlimited contributions and withdrawals, but you'll pay capital gains tax on profits. They're useful after maxing tax-advantaged accounts." }
              },
              {
                "@type": "Question",
                "name": "How important is employer 401(k) match in the funding priority?",
                "acceptedAnswer": { "@type": "Answer", "text": "Employer match is crucial—it's free money. Always contribute enough to capture the full match before prioritizing other accounts." }
              },
              {
                "@type": "Question",
                "name": "Can I contribute to both a 401(k) and Roth IRA in the same year?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, you can contribute to both simultaneously. You can max a 401(k) ($23,500 in 2024) and a Roth IRA ($7,000 in 2024) in the same year." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'HSA Triple Tax Advantage Guide 2026: The Stealth Wealth-Building Account',
  description: 'Discover how Health Savings Accounts offer triple tax advantages and can become your most powerful wealth-building tool. 2026 limits, investment strategies, and the HSA mega backdoor explained.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/hsa-triple-tax-advantage-guide-2026',
  },
  openGraph: {
    title: 'HSA Triple Tax Advantage Guide 2026: The Stealth Wealth-Building Account',
    description: 'Discover how Health Savings Accounts offer triple tax advantages and can become your most powerful wealth-building tool. 2026 limits, investment strategies, and the HSA mega backdoor explained.',
    url: 'https://www.pulsafi.com/learn/hsa-triple-tax-advantage-guide-2026',
    type: 'article',
    images: [{ url: '/api/og?title=HSA+Triple+Tax+Advantage+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HSA Triple Tax Advantage Guide 2026: The Stealth Wealth-Building Account',
    description: 'Discover how Health Savings Accounts offer triple tax advantages and can become your most powerful wealth-building tool. 2026 limits, investment strategies, and the HSA mega backdoor explained.',
    images: ['/api/og?title=HSA+Triple+Tax+Advantage+2026&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "HSA Triple Tax Advantage Guide 2026", "item": "https://www.pulsafi.com/learn/hsa-triple-tax-advantage-guide-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "HSA Triple Tax Advantage Guide 2026: The Stealth Wealth-Building Account", "description": "Discover how Health Savings Accounts offer triple tax advantages and can become your most powerful wealth-building tool. 2026 limits, investment strategies, and the HSA mega backdoor explained.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-05-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/hsa-triple-tax-advantage-guide-2026"}}),
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
                "name": "What is the triple tax advantage of an HSA?",
                "acceptedAnswer": { "@type": "Answer", "text": "HSAs offer three tax benefits: contributions are tax-deductible (reduce taxable income), growth is tax-free (no taxes on investment gains), and qualified withdrawals are tax-free (no taxes when you spend the money on medical expenses). No other account offers all three." }
              },
              {
                "@type": "Question",
                "name": "What are the 2026 HSA contribution limits?",
                "acceptedAnswer": { "@type": "Answer", "text": "For 2026, individuals can contribute $4,300 annually, while families can contribute $8,550. Those 55 and older can add an additional $1,000 catch-up contribution. You must be enrolled in a high-deductible health plan (HDHP) to contribute." }
              },
              {
                "@type": "Question",
                "name": "Can I use my HSA as a retirement account?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. After age 65, you can withdraw money from your HSA for any reason without penalties (though non-medical withdrawals are taxed as ordinary income). This makes HSAs excellent stealth retirement accounts if you invest the funds for decades." }
              },
              {
                "@type": "Question",
                "name": "What expenses qualify for tax-free HSA withdrawals?",
                "acceptedAnswer": { "@type": "Answer", "text": "Qualified medical expenses include doctor visits, prescriptions, dental work, vision care, mental health services, hospital stays, and over-the-counter medications. Cosmetic procedures, gym memberships, and vitamins (unless prescribed) don't qualify." }
              },
              {
                "@type": "Question",
                "name": "What is the HSA mega backdoor strategy?",
                "acceptedAnswer": { "@type": "Answer", "text": "The HSA mega backdoor involves contributing the maximum to your HSA, then immediately paying qualified medical expenses out-of-pocket and letting the HSA funds grow invested. You essentially use the HSA as a tax-advantaged investment account while maintaining the ability to reimburse yourself for old medical expenses decades later." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

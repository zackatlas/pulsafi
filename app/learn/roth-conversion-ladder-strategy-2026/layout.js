export const metadata = {
  title: 'Roth Conversion Ladder Strategy 2026: The Early Retirement Tax Hack',
  description: 'Master the Roth conversion ladder strategy for early retirement. Learn the 5-year rule, 2026 tax optimization, pro-rata rules, and step-by-step examples to access retirement funds before 59.5.',
  keywords: 'Roth conversion ladder, Roth conversion strategy, early retirement, pro-rata rule, Roth IRA conversion, 5-year rule, tax-free retirement income',
  alternates: {
    canonical: 'https://pulsafi.com/learn/roth-conversion-ladder-strategy-2026',
  },
  openGraph: {
    title: 'Roth Conversion Ladder Strategy 2026: The Early Retirement Tax Hack',
    description: 'Master the Roth conversion ladder strategy for early retirement. Learn the 5-year rule, 2026 tax optimization, pro-rata rules, and step-by-step examples.',
    url: 'https://pulsafi.com/learn/roth-conversion-ladder-strategy-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Roth+Conversion+Ladder+Strategy+2026:+The+Early+Retirement+Tax+Hack&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roth Conversion Ladder Strategy 2026: The Early Retirement Tax Hack',
    description: 'Master the Roth conversion ladder strategy for early retirement. Learn the 5-year rule, 2026 tax optimization, pro-rata rules, and step-by-step examples.',
    images: ['/api/og?title=Roth+Conversion+Ladder+Strategy+2026:+The+Early+Retirement+Tax+Hack&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Roth Conversion Ladder Strategy 2026", "item": "https://pulsafi.com/learn/roth-conversion-ladder-strategy-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Roth Conversion Ladder Strategy 2026: The Early Retirement Tax Hack", "description": "Master the Roth conversion ladder strategy for early retirement. Learn the 5-year rule, 2026 tax optimization, pro-rata rules, and step-by-step examples to access retirement funds before 59.5.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-04-01", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/roth-conversion-ladder-strategy-2026"}}),
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
                "name": "What is a Roth conversion ladder and how does it work?",
                "acceptedAnswer": { "@type": "Answer", "text": "A Roth conversion ladder is a strategy where you convert traditional IRA funds to a Roth IRA in a series of planned annual conversions. You can then withdraw your contributions after 5 years, providing tax-free income before retirement age (59.5). This is particularly valuable for early retirees who need accessible funds." }
              },
              {
                "@type": "Question",
                "name": "What is the 5-year rule for Roth conversions?",
                "acceptedAnswer": { "@type": "Answer", "text": "The 5-year rule states that converted amounts must remain in the Roth IRA for 5 tax years before you can withdraw them penalty-free (for conversions, not contributions). For each conversion you make, a new 5-year period begins. The first conversion's 5-year clock doesn't affect subsequent conversions." }
              },
              {
                "@type": "Question",
                "name": "What is the pro-rata rule and why does it matter?",
                "acceptedAnswer": { "@type": "Answer", "text": "The pro-rata rule states that when you convert a traditional IRA to a Roth, the IRS treats ALL your traditional, SEP, and SIMPLE IRA balances as a single pool. If you have pre-tax IRA funds, a portion of your conversion is treated as taxable income. Having $100K in pre-tax IRAs means roughly 50% of any conversion is taxable, even if you only convert one specific account." }
              },
              {
                "@type": "Question",
                "name": "What's the best time to do a Roth conversion?",
                "acceptedAnswer": { "@type": "Answer", "text": "The best times are during low-income years: early retirement gap years before Social Security, years with large losses or deductions, or when market dips let you convert more shares at lower valuations. 2026 offers specific tax bracket opportunities for some filers. Running tax projections to find your optimal conversion amount is essential." }
              },
              {
                "@type": "Question",
                "name": "Can a Roth conversion ladder trigger other tax consequences?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Conversions increase your Modified Adjusted Gross Income (MAGI), which can trigger Medicare premium increases (IRMAA) in retirement, make you subject to the Net Investment Income Tax, or disqualify you from other deductions like Roth IRA direct contributions. State taxes also apply to conversions in some states. Planning is critical." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

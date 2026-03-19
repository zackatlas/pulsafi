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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Should I invest or pay off debt first?",
                "acceptedAnswer": { "@type": "Answer", "text": "Compare your debt interest rate to your expected investment return. If your debt interest is higher than your expected investment return, prioritize debt payoff. Consider also claiming any employer 401(k) match before aggressive debt repayment." }
              },
              {
                "@type": "Question",
                "name": "What interest rate is the breakpoint between investing and paying off debt?",
                "acceptedAnswer": { "@type": "Answer", "text": "Historically, the stock market averages around 10% annual returns, but individual results vary. If your debt interest rate is above 6-7%, paying it off usually wins. Below 3-4%, investing may be better. For rates in between, consider your risk tolerance." }
              },
              {
                "@type": "Question",
                "name": "Should I get my 401(k) match while paying off debt?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, always contribute enough to capture your full employer 401(k) match. It's a guaranteed immediate return (usually 50-100%) that outweighs nearly any debt payoff strategy. Do this before aggressive debt payments." }
              },
              {
                "@type": "Question",
                "name": "Is a guaranteed debt payoff better than market returns?",
                "acceptedAnswer": { "@type": "Answer", "text": "Paying off high-interest debt provides a guaranteed 'return' equal to that interest rate. This is valuable, but lower-interest debt may lose to market returns historically. The right choice depends on your specific interest rate, risk tolerance, and timeline." }
              },
              {
                "@type": "Question",
                "name": "Can I invest and pay off debt at the same time?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, most people benefit from a balanced approach. Secure your employer match, build a small emergency fund, then split remaining money between debt payoff and investing until high-interest debt is eliminated." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

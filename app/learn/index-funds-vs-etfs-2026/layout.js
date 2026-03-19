export const metadata = {
  title: 'Index Funds vs ETFs: Which Should You Buy in 2026?',
  description: 'What\'s the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026',
  },
  openGraph: {
    title: 'Index Funds vs ETFs: Which Should You Buy in 2026?',
    description: 'What\'s the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.',
    url: 'https://pulsafi.com/learn/index-funds-vs-etfs-2026',
    type: 'article',
    images: [{ url: '/api/og?title=Index+Funds+vs+ETFs:+Which+Should+You+Buy+in+2026?&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Index Funds vs ETFs: Which Should You Buy in 2026?',
    description: 'What\'s the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.',
    images: ['/api/og?title=Index+Funds+vs+ETFs:+Which+Should+You+Buy+in+2026?&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Index Funds vs ETFs: Which Should You Buy in 2026?", "item": "https://pulsafi.com/learn/index-funds-vs-etfs-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Index Funds vs ETFs: Which Should You Buy in 2026?", "description": "What's the real difference between index funds and ETFs? Tax efficiency, fees, and which is better for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/index-funds-vs-etfs-2026"}}),
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
                "name": "What is the difference between index funds and ETFs?",
                "acceptedAnswer": { "@type": "Answer", "text": "Both track market indexes, but index funds are mutual funds you buy at end-of-day NAV, while ETFs are traded on exchanges like stocks throughout the day. ETFs typically have lower expense ratios and better tax efficiency." }
              },
              {
                "@type": "Question",
                "name": "Which is better for beginners, index funds or ETFs?",
                "acceptedAnswer": { "@type": "Answer", "text": "ETFs are often better for beginners because they trade like stocks (easier to understand), have lower expense ratios, and are more tax-efficient. Index mutual funds work too if you prefer set-it-and-forget-it investing." }
              },
              {
                "@type": "Question",
                "name": "Are ETFs more tax efficient than index funds?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, ETFs are generally more tax-efficient due to their structure and creation/redemption mechanism. Index mutual funds can generate capital gains distributions that trigger taxes; ETFs rarely do, especially in tax-advantaged accounts." }
              },
              {
                "@type": "Question",
                "name": "Do index funds and ETFs have different expense ratios?",
                "acceptedAnswer": { "@type": "Answer", "text": "ETFs typically have lower expense ratios (often 0.03-0.20%) compared to mutual fund index funds (0.05-0.30%). However, some excellent low-cost index mutual funds exist. Compare specific funds, not just fund types." }
              },
              {
                "@type": "Question",
                "name": "Can I buy both index funds and ETFs?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, many investors own both. You might use index mutual funds in retirement accounts and ETFs in taxable accounts, or mix them based on your account type, brokerage, and personal preference." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

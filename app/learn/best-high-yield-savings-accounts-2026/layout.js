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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are high-yield savings accounts (HYSAs) safe?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, HYSAs are safe if FDIC-insured. Your deposits up to $250,000 per bank are protected, making them one of the safest savings options available." }
              },
              {
                "@type": "Question",
                "name": "What is the best APY for high-yield savings accounts in 2026?",
                "acceptedAnswer": { "@type": "Answer", "text": "APYs for HYSAs in 2026 typically range from 4.25% to 5.35%, depending on market conditions and the bank. Compare rates across multiple providers to find the best option." }
              },
              {
                "@type": "Question",
                "name": "How often do HYSA interest rates change?",
                "acceptedAnswer": { "@type": "Answer", "text": "HYSA rates can change weekly or even daily based on federal interest rate decisions and bank policies. Most online banks adjust rates frequently to stay competitive." }
              },
              {
                "@type": "Question",
                "name": "Is there a minimum balance required for high-yield savings accounts?",
                "acceptedAnswer": { "@type": "Answer", "text": "Many HYSAs have no minimum balance requirement, though some may. Check your specific bank's terms, as most major online banks allow you to open an account with $0 to $1." }
              },
              {
                "@type": "Question",
                "name": "Can I lose money in a high-yield savings account?",
                "acceptedAnswer": { "@type": "Answer", "text": "No, you cannot lose principal in an FDIC-insured HYSA. Your balance will only grow with interest or remain the same if no interest accrues." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'What Is a Good Credit Score and How to Improve It',
  description: 'Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/what-is-a-good-credit-score',
  },
  openGraph: {
    title: 'What Is a Good Credit Score and How to Improve It',
    description: 'Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.',
    url: 'https://www.pulsafi.com/learn/what-is-a-good-credit-score',
    type: 'article',
    images: [{ url: '/api/og?title=What+Is+a+Good+Credit+Score+and+How+to+Improve+It&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is a Good Credit Score and How to Improve It',
    description: 'Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.',
    images: ['/api/og?title=What+Is+a+Good+Credit+Score+and+How+to+Improve+It&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "What Is a Good Credit Score and How to Improve It", "item": "https://www.pulsafi.com/learn/what-is-a-good-credit-score"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "What Is a Good Credit Score and How to Improve It", "description": "Credit scores range from 300 to 850. Learn what score you need for loans, how scores are calculated, and how to improve yours.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/what-is-a-good-credit-score"}}),
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
                "name": "What is a good credit score?",
                "acceptedAnswer": { "@type": "Answer", "text": "Scores range from 300-850. Good credit is 670-739, very good is 740-799, and excellent is 800+. Anything above 670 qualifies for better loan rates." }
              },
              {
                "@type": "Question",
                "name": "What is considered an excellent credit score?",
                "acceptedAnswer": { "@type": "Answer", "text": "An excellent credit score is 800 or higher. This qualifies you for the best interest rates on mortgages, auto loans, and credit cards." }
              },
              {
                "@type": "Question",
                "name": "How can I check my credit score for free?",
                "acceptedAnswer": { "@type": "Answer", "text": "Get free scores from AnnualCreditReport.com (official, once per year per bureau), Credit Karma, NerdWallet, or your bank/credit card issuer. Many offer free monitoring." }
              },
              {
                "@type": "Question",
                "name": "Does checking your credit score hurt it?",
                "acceptedAnswer": { "@type": "Answer", "text": "No. Checking your own score (soft inquiry) doesn't hurt it. Only hard inquiries from lenders applying for credit impact your score." }
              },
              {
                "@type": "Question",
                "name": "How long does it take to build credit from scratch?",
                "acceptedAnswer": { "@type": "Answer", "text": "Building good credit (670+) typically takes 6-12 months. Excellent credit (800+) takes 2-3 years of consistent on-time payments and low credit utilization." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

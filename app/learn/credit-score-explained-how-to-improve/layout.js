export const metadata = {
  title: 'Credit Scores Explained: How to Check and Improve Yours',
  description: 'Everything you need to know about credit scores in 2026. How they\'re calculated, what\'s a good score, and proven strategies to raise yours fast.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/credit-score-explained-how-to-improve',
  },
  openGraph: {
    title: 'Credit Scores Explained: How to Check and Improve Yours',
    description: 'Everything you need to know about credit scores in 2026. How they\'re calculated, what\'s a good score, and proven strategies to raise yours fast.',
    url: 'https://pulsafi.com/learn/credit-score-explained-how-to-improve',
    type: 'article',
    images: [{ url: '/api/og?title=Credit+Scores+Explained:+How+to+Check+and+Improve+Yours&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Credit Scores Explained: How to Check and Improve Yours',
    description: 'Everything you need to know about credit scores in 2026. How they\'re calculated, what\'s a good score, and proven strategies to raise yours fast.',
    images: ['/api/og?title=Credit+Scores+Explained:+How+to+Check+and+Improve+Yours&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Credit Scores Explained: How to Check and Improve Yours", "item": "https://pulsafi.com/learn/credit-score-explained-how-to-improve"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Credit Scores Explained: How to Check and Improve Yours", "description": "Everything you need to know about credit scores in 2026. How they're calculated, what's a good score, and proven strategies to raise yours fast.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/credit-score-explained-how-to-improve"}}),
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
                "acceptedAnswer": { "@type": "Answer", "text": "FICO scores range from 300-850. A score of 670+ is considered good, 740+ is very good, and 800+ is excellent. Lenders use 740+ to qualify for best rates. In 2026, the average U.S. score is around 714." }
              },
              {
                "@type": "Question",
                "name": "How can I improve my credit score fast?",
                "acceptedAnswer": { "@type": "Answer", "text": "Quick wins: pay bills on time, reduce credit utilization below 30%, dispute errors on credit reports, and add yourself as an authorized user on good accounts. These can improve scores by 50-100 points within 2-3 months." }
              },
              {
                "@type": "Question",
                "name": "What factors affect my credit score the most?",
                "acceptedAnswer": { "@type": "Answer", "text": "Payment history (35%) is most important, followed by credit utilization (30%), length of credit history (15%), credit mix (10%), and new credit (10%). Consistent on-time payments and low utilization drive the biggest score improvements." }
              },
              {
                "@type": "Question",
                "name": "How long does it take to build a good credit score from zero?",
                "acceptedAnswer": { "@type": "Answer", "text": "Building credit from scratch takes 6 months to 2 years depending on strategy. A secured credit card or becoming an authorized user starts building history quickly. Within 12 months of perfect payments, you can reach 650+." }
              },
              {
                "@type": "Question",
                "name": "Does checking my credit score hurt it?",
                "acceptedAnswer": { "@type": "Answer", "text": "Soft inquiries (checking your own score, employer checks, and pre-approved offers) don't hurt your score. Hard inquiries (applying for credit) cause small, temporary drops. You can check your score free annually via AnnualCreditReport.com." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

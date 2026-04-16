export const metadata = {
  title: 'How to Pay Off Student Loans Fast: 7 Strategies That Actually Work | Pulsafi',
  description: 'Learn proven strategies to pay off student loans faster in 2026. Refinancing, income-driven repayment, employer programs, and the math behind extra payments.',
  keywords: ['pay off student loans fast', 'student loan payoff strategies', 'student loan refinancing', 'income-driven repayment', 'student loan forgiveness 2026', 'extra payments student loans', 'debt free'],
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/how-to-pay-off-student-loans-fast',
  },
  openGraph: {
    title: 'How to Pay Off Student Loans Fast: 7 Strategies That Actually Work',
    description: 'Learn proven strategies to pay off student loans faster in 2026. Refinancing, income-driven repayment, employer programs, and the math behind extra payments.',
    url: 'https://www.pulsafi.com/learn/how-to-pay-off-student-loans-fast',
    type: 'article',
    images: [{ url: 'https://www.pulsafi.com/api/og?title=Pay+Off+Student+Loans+Fast&subtitle=7+Strategies+That+Actually+Work&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Pay Off Student Loans Fast: 7 Strategies That Actually Work',
    description: 'Proven strategies to pay off student loans faster in 2026. The math behind extra payments, refinancing, and more.',
    images: ['https://www.pulsafi.com/api/og?title=Pay+Off+Student+Loans+Fast&subtitle=7+Strategies+That+Actually+Work&type=article'],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com" },
              { "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn" },
              { "@type": "ListItem", "position": 3, "name": "How to Pay Off Student Loans Fast", "item": "https://www.pulsafi.com/learn/how-to-pay-off-student-loans-fast" }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Pay Off Student Loans Fast: 7 Strategies That Actually Work",
            "description": "Learn proven strategies to pay off student loans faster in 2026. Refinancing, income-driven repayment, employer programs, and the math behind extra payments.",
            "author": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com" },
            "publisher": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": { "@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png" } },
            "datePublished": "2026-03-19",
            "dateModified": "2026-03-19",
            "mainEntityOfPage": { "@id": "https://www.pulsafi.com/learn/how-to-pay-off-student-loans-fast" }
          }),
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
                "name": "How fast can I pay off $30,000 in student loans?",
                "acceptedAnswer": { "@type": "Answer", "text": "With the standard 10-year plan at 6.5% interest, you'd pay about $341/month. By adding just $200/month extra, you could pay it off in about 6 years and save over $5,000 in interest." }
              },
              {
                "@type": "Question",
                "name": "Should I refinance my student loans in 2026?",
                "acceptedAnswer": { "@type": "Answer", "text": "If you have private loans or don't need federal protections like income-driven repayment or PSLF, refinancing can save thousands if you qualify for a lower rate. Compare rates from at least 3 lenders." }
              },
              {
                "@type": "Question",
                "name": "Is it better to pay off student loans or invest?",
                "acceptedAnswer": { "@type": "Answer", "text": "If your loan interest rate is above 6-7%, paying off debt first is generally the better guaranteed return. Below that, investing while making minimum payments may come out ahead historically, but it depends on your risk tolerance." }
              },
              {
                "@type": "Question",
                "name": "What is the avalanche method for student loans?",
                "acceptedAnswer": { "@type": "Answer", "text": "The avalanche method means paying minimums on all loans, then putting every extra dollar toward the loan with the highest interest rate. This mathematically saves you the most money in interest over time." }
              },
              {
                "@type": "Question",
                "name": "Can employer student loan repayment help me pay off loans faster?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes. Since 2020, employers can contribute up to $5,250/year tax-free toward employee student loans. As of 2026, about 17% of employers offer this benefit. That's an extra $437/month you're not paying yourself." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  );
}

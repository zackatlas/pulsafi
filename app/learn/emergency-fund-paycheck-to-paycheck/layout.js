export const metadata = {
  title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck',
  description: 'Realistic strategies to build your first emergency fund starting from zero. No "just skip lattes" advice — real steps that work.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/emergency-fund-paycheck-to-paycheck',
  },
  openGraph: {
    title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck',
    description: 'Realistic strategies to build your first emergency fund starting from zero. No "just skip lattes" advice — real steps that work.',
    url: 'https://www.pulsafi.com/learn/emergency-fund-paycheck-to-paycheck',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Build+an+Emergency+Fund+When+You+Live+Paycheck+to+Paycheck&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Build an Emergency Fund When You Live Paycheck to Paycheck',
    description: 'Realistic strategies to build your first emergency fund starting from zero. No "just skip lattes" advice — real steps that work.',
    images: ['/api/og?title=How+to+Build+an+Emergency+Fund+When+You+Live+Paycheck+to+Paycheck&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Build an Emergency Fund When You Live Paycheck to Paycheck", "item": "https://www.pulsafi.com/learn/emergency-fund-paycheck-to-paycheck"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Build an Emergency Fund When You Live Paycheck to Paycheck", "description": "Realistic strategies to build your first emergency fund starting from zero. No \"just skip lattes\" advice \u2014 real steps that work.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/emergency-fund-paycheck-to-paycheck"}}),
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
                "name": "How much should I save in an emergency fund?",
                "acceptedAnswer": { "@type": "Answer", "text": "Aim for 3-6 months of living expenses. If that's overwhelming, start with $1,000, then build to one month of expenses, then aim for 3-6 months." }
              },
              {
                "@type": "Question",
                "name": "Where should I keep my emergency fund?",
                "acceptedAnswer": { "@type": "Answer", "text": "Keep it in a high-yield savings account that's separate from your checking account. This earns interest while remaining accessible and not tempting to spend." }
              },
              {
                "@type": "Question",
                "name": "How do I start building an emergency fund when living paycheck to paycheck?",
                "acceptedAnswer": { "@type": "Answer", "text": "Start tiny: save $5-25 per paycheck, use windfalls (tax refunds, bonuses), cut one expense, or pick up a side gig. Small, consistent progress counts." }
              },
              {
                "@type": "Question",
                "name": "Is a 3-month or 6-month emergency fund better?",
                "acceptedAnswer": { "@type": "Answer", "text": "Start with 3 months of expenses. If you have a stable job, 3 months is usually sufficient. Choose 6 months if you have an unstable income or dependents." }
              },
              {
                "@type": "Question",
                "name": "What counts as a legitimate emergency?",
                "acceptedAnswer": { "@type": "Answer", "text": "True emergencies include job loss, major medical expenses, car repairs, and home repairs. Non-emergencies are vacations, new phones, or non-urgent upgrades." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

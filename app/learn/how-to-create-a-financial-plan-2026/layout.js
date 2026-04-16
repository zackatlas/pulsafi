export const metadata = {
  title: 'How to Create a Financial Plan in 2026: Complete Step-by-Step Guide',
  description: 'Build a comprehensive financial plan in 2026. Master net worth, SMART goals, budgeting, debt strategy, insurance, and investments. Free templates and tools included.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/how-to-create-a-financial-plan-2026',
  },
  openGraph: {
    title: 'How to Create a Financial Plan in 2026: Complete Step-by-Step Guide',
    description: 'Build a comprehensive financial plan. Master goal-setting, budgeting, debt management, and investing. Expert guidance and templates included.',
    url: 'https://www.pulsafi.com/learn/how-to-create-a-financial-plan-2026',
    type: 'article',
    images: [{ url: '/api/og?title=How+to+Create+a+Financial+Plan&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Create a Financial Plan in 2026',
    description: 'Build a comprehensive financial plan. Master goal-setting, budgeting, debt management, and investing.',
    images: ['/api/og?title=How+to+Create+a+Financial+Plan&type=article'],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "How to Create a Financial Plan in 2026", "item": "https://www.pulsafi.com/learn/how-to-create-a-financial-plan-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "How to Create a Financial Plan in 2026: Complete Step-by-Step Guide", "description": "Build a comprehensive financial plan in 2026. Master net worth, SMART goals, budgeting, debt strategy, insurance, and investments.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-01-20", "dateModified": "2026-03-19", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/how-to-create-a-financial-plan-2026"}}),
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
                "name": "What should a financial plan include?",
                "acceptedAnswer": {"@type": "Answer", "text": "A complete financial plan should include: (1) Current net worth assessment, (2) SMART financial goals with timelines, (3) A monthly budget, (4) Debt repayment strategy, (5) Insurance coverage needs, (6) Investment plan and asset allocation, (7) Retirement strategy, (8) Estate planning basics, and (9) An annual review checklist to track progress."}
              },
              {
                "@type": "Question",
                "name": "How often should I review my financial plan?",
                "acceptedAnswer": {"@type": "Answer", "text": "Review your financial plan at least annually, typically at the beginning of the calendar year or your birthday. However, update it immediately if major life changes occur: job changes, marriage, kids, inheritance, significant raises, or market crashes. Most people benefit from quarterly check-ins to ensure they&rsquo;re on track with goals."}
              },
              {
                "@type": "Question",
                "name": "What is net worth and why does it matter?",
                "acceptedAnswer": {"@type": "Answer", "text": "Net worth is the difference between your assets (what you own) and your liabilities (what you owe). Mathematically: Net Worth = Assets - Liabilities. It&rsquo;s the single most important number in your financial plan because it measures your actual wealth. Track it monthly or quarterly to see if you&rsquo;re building wealth or going backwards."}
              },
              {
                "@type": "Question",
                "name": "What is the 50/30/20 budgeting rule?",
                "acceptedAnswer": {"@type": "Answer", "text": "The 50/30/20 rule is a simple budgeting framework: Allocate 50% of after-tax income to needs (food, shelter, utilities), 30% to wants (entertainment, dining out, hobbies), and 20% to savings and debt payoff. This ratio creates balance between enjoying life today and building wealth for tomorrow. Adjust the percentages based on your personal priorities."}
              },
              {
                "@type": "Question",
                "name": "How much should I save for emergency fund?",
                "acceptedAnswer": {"@type": "Answer", "text": "Aim for 3&ndash;6 months of living expenses in a liquid, accessible savings account (high-yield savings). For example, if your monthly expenses are $3,000, save $9,000&ndash;$18,000. Start with 1 month (minimum) and build from there. Keep emergency funds in savings, not stocks, so you can access them without market risk."}
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

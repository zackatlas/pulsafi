export const metadata = {
  title: 'Budget Calculator | 50/30/20 Budgeting Tool | Pulsafi',
  description: 'Master your finances with our interactive budget calculator. Choose from 50/30/20, 70/20/10, 80/20, or create a custom budget. Track income and spending in real-time.',
  openGraph: {
    title: 'Budget Calculator | 50/30/20 and More',
    description: 'Master your finances with our interactive budget calculator. Choose from 50/30/20, 70/20/10, 80/20, or create a custom budget.',
    url: 'https://pulsafi.com/tools/budget-calculator',
    images: [{ url: '/api/og?title=Budget+Calculator&subtitle=50%2F30%2F20+and+More&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Budget+Calculator&subtitle=50%2F30%2F20+and+More&type=tool'],
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the 50/30/20 budgeting method?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 50/30/20 rule is a simple budgeting method where you allocate 50% of your after-tax income to needs (rent, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. It provides a balanced approach to personal finance management."
        }
      },
      {
        "@type": "Question",
        "name": "How do I know if my budget is balanced?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A balanced budget means your total spending equals or is less than your income. Use our Budget Calculator to track your actual spending against recommended allocations for each category. The tool shows you over/under budget indicators and provides suggestions for adjustments."
        }
      },
      {
        "@type": "Question",
        "name": "What should I do if I am spending more than I earn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you are spending more than you earn, start by identifying categories where you are overspending and look for areas to cut back. Prioritize reducing discretionary spending before adjusting needs, and consider increasing your income if possible."
        }
      }
    ]
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://pulsafi.com' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://pulsafi.com/tools' },
      { '@type': 'ListItem', position: 3, name: 'Budget Calculator', item: 'https://pulsafi.com/tools/budget-calculator' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}

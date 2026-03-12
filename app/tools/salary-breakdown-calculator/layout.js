export const metadata = {
  title: 'Free Salary Calculator — See Your Real Take-Home Pay',
  description: 'Calculate your take-home pay after federal tax, state tax, FICA, 401(k), and deductions. See per-paycheck amounts and tax bracket breakdown. Free.',
  openGraph: { title: 'Free Salary Breakdown Calculator — Pulsafi', url: 'https://pulsafi.com/tools/salary-breakdown-calculator', images: [{ url: '/api/og?title=Salary+Calculator&subtitle=See+Your+Take-Home+Pay&type=tool', width: 1200, height: 630 }] },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Salary+Calculator&subtitle=See+Your+Take-Home+Pay&type=tool'],
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much of my salary goes to taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The average American pays about 28% of their income in total taxes, including federal income tax, state income tax, Social Security (6.2%), and Medicare (1.45%). Your effective rate depends on your income level, state, deductions, and filing status."
        }
      },
      {
        "@type": "Question",
        "name": "What is take-home pay vs gross salary?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gross salary is your total pay before any deductions. Take-home pay (net pay) is what you actually receive after federal and state taxes, Social Security, Medicare, and any pre-tax deductions like 401(k) contributions and health insurance premiums."
        }
      },
      {
        "@type": "Question",
        "name": "How much is a $100,000 salary after taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A $100,000 salary in a state with no income tax results in approximately $75,000-$78,000 in take-home pay. In a high-tax state like California or New York, take-home drops to roughly $68,000-$72,000."
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
      { '@type': 'ListItem', position: 3, name: 'Salary Breakdown Calculator', item: 'https://pulsafi.com/tools/salary-breakdown-calculator' },
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

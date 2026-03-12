export const metadata = {
  title: 'Free Compound Interest Calculator — See Your Money Grow',
  description: 'Calculate compound interest with monthly contributions. Adjust compounding frequency, see milestones, and view year-by-year breakdown. Free, no signup.',
  openGraph: {
    title: 'Free Compound Interest Calculator — Pulsafi',
    description: 'See how your money grows with compound interest. Milestones, year-by-year table, and growth chart included.',
    url: 'https://pulsafi.com/tools/compound-interest-calculator',
    images: [{ url: '/api/og?title=Compound+Interest+Calculator&subtitle=See+Your+Money+Grow&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=Compound+Interest+Calculator&subtitle=See+Your+Money+Grow&type=tool'],
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does compound interest work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compound interest means you earn interest on both your original investment and on previously earned interest. Over time, this creates exponential growth. For example, $10,000 at 8% compounded annually becomes $21,589 in 10 years and $46,610 in 20 years."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Rule of 72?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Rule of 72 is a quick way to estimate how long it takes to double your money. Divide 72 by your annual return rate. At 8% returns, your money doubles in approximately 9 years (72 ÷ 8 = 9)."
        }
      },
      {
        "@type": "Question",
        "name": "How much will $500 a month grow in 30 years?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Investing $500 per month at an average 10% annual return for 30 years would grow to approximately $1,130,000. Your total contributions would be $180,000, meaning over $950,000 comes from compound growth."
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
      { '@type': 'ListItem', position: 3, name: 'Compound Interest Calculator', item: 'https://pulsafi.com/tools/compound-interest-calculator' },
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

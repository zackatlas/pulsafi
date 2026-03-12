export const metadata = {
  title: 'Free Debt Payoff Calculator — Avalanche vs Snowball',
  description: 'Calculate your debt payoff timeline. Compare avalanche vs snowball strategies, add multiple debts, and see how extra payments save you thousands. Free.',
  openGraph: { title: 'Free Debt Payoff Calculator — Pulsafi', url: 'https://pulsafi.com/tools/debt-payoff-calculator' },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the debt avalanche method?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The debt avalanche method focuses on paying off debts with the highest interest rates first while making minimum payments on all other debts. This saves the most money on interest over time."
        }
      },
      {
        "@type": "Question",
        "name": "What is the debt snowball method?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The debt snowball method pays off the smallest balance first regardless of interest rate, creating quick psychological wins. Once the smallest debt is cleared, you roll that payment into the next smallest debt."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to pay off $10,000 in credit card debt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "At the average credit card APR of 24.7% with $300 monthly payments, it takes about 4 years and 8 months to pay off $10,000, and you will pay roughly $6,800 in interest. Increasing payments to $500/month cuts the timeline to 2 years and saves over $3,500 in interest."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}

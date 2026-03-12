export const metadata = {
  title: 'Free Investment Comparison Tool — Compare Returns',
  description: 'Compare investment returns across savings accounts, bonds, S&P 500, and growth stocks over any time horizon. Visualize the power of different return rates.',
  openGraph: { title: 'Free Investment Comparison Tool — Pulsafi', url: 'https://pulsafi.com/tools/investment-comparison' },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the average stock market return per year?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The S&P 500 has returned an average of about 10.5% annually since 1926, including dividends. Adjusted for inflation, the real return is approximately 7%. However, individual years vary dramatically — from a 38% loss to a 52% gain."
        }
      },
      {
        "@type": "Question",
        "name": "Are index funds better than individual stocks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most investors, yes. Over a 15-year period, approximately 92% of actively managed funds underperform the S&P 500 index. Index funds offer broad diversification, extremely low fees (often 0.03-0.10%), and consistently strong long-term performance."
        }
      },
      {
        "@type": "Question",
        "name": "How much should I invest per month?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A common guideline is to invest at least 15-20% of your gross income for retirement. If you are starting late, aim higher. Even $200-$500 per month invested consistently in low-cost index funds can grow to significant wealth over 20-30 years."
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

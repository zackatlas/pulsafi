export const metadata = {
  title: 'Free Crypto Investment Planner — Model DCA Outcomes',
  description: 'Model crypto investment outcomes with dollar-cost averaging. Compare conservative, moderate, aggressive, and bear case scenarios. Free calculator.',
  openGraph: { title: 'Free Crypto Investment Planner — Pulsafi', url: 'https://pulsafi.com/tools/crypto-planner' },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is dollar-cost averaging good for crypto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dollar-cost averaging (DCA) reduces the impact of crypto volatility by investing a fixed amount at regular intervals. Studies show DCA tends to outperform lump-sum investing in highly volatile assets like crypto because it avoids the risk of buying at a peak."
        }
      },
      {
        "@type": "Question",
        "name": "What percentage of my portfolio should be crypto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most financial advisors suggest limiting crypto to 1-5% of your total investment portfolio due to its extreme volatility. Younger investors with higher risk tolerance may allocate up to 10%, but never invest more than you can afford to lose entirely."
        }
      },
      {
        "@type": "Question",
        "name": "What is the safest way to invest in crypto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The safest approaches include dollar-cost averaging into established coins (Bitcoin, Ethereum), using regulated exchanges, enabling two-factor authentication, and considering a hardware wallet for large holdings. Never invest based on social media hype."
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

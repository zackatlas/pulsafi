export const metadata = {
  title: 'Opportunity Cost Calculator — What Purchases Really Cost',
  description: 'See what any purchase would be worth if invested instead. That $500 purse could be $1,296 in 10 years. Calculate the true cost of spending vs investing.',
  openGraph: {
    title: 'Opportunity Cost Calculator — Pulsafi',
    description: 'See the true cost of every purchase in future dollars.',
    url: 'https://pulsafi.com/tools/opportunity-cost-calculator',
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is opportunity cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Opportunity cost is the value of the next best alternative you give up when making a decision. In personal finance, it often refers to the potential investment returns you sacrifice when you spend money instead of investing it."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a daily coffee habit really cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A $5 daily coffee costs $1,825 per year. If that money were invested instead at an average 10% annual return, it would grow to approximately $31,000 in 10 years, $115,000 in 20 years, and $340,000 in 30 years."
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

export const metadata = {
  title: 'Free FIRE Calculator — When Can You Retire Early?',
  description: 'Calculate your FIRE number, years to financial independence, Coast FIRE number, and post-retirement runway. See how savings rate affects your timeline. Free.',
  openGraph: {
    title: 'Free FIRE Calculator — Pulsafi',
    description: 'Find out when you can retire early. FIRE number, Coast FIRE, savings rate impact, and retirement runway.',
    url: 'https://pulsafi.com/tools/fire-calculator',
  },
}

export default function Layout({ children }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the FIRE movement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FIRE stands for Financial Independence, Retire Early. It is a movement focused on aggressive saving and investing — typically 50-70% of income — to build enough wealth to retire decades before the traditional age of 65."
        }
      },
      {
        "@type": "Question",
        "name": "How much money do I need to retire early?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard FIRE formula is to save 25 times your annual expenses. If you spend $40,000 per year, your FIRE number is $1,000,000. This is based on the 4% safe withdrawal rate from the Trinity Study."
        }
      },
      {
        "@type": "Question",
        "name": "What is Coast FIRE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Coast FIRE is when you have saved enough that compound growth alone will fund your retirement by a traditional age (65), even if you never invest another dollar. It means you only need to earn enough to cover current expenses."
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

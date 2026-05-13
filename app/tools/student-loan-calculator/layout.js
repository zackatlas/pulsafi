export const metadata = {
  title: 'Student Loan Calculator',
  description: 'Calculate student loan payments under standard, graduated, and income-driven repayment plans. See total interest, payoff dates, and refinancing savings.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/student-loan-calculator',
  },
  openGraph: {
    title: 'Student Loan Calculator — Free Online Calculator',
    description: 'Calculate student loan payments under standard, graduated, and income-driven repayment plans. See total interest, payoff dates, and refinancing savings.',
    url: 'https://www.pulsafi.com/tools/student-loan-calculator',
    type: 'website',
    images: [
      {
        url: '/api/og?title=Student%20Loan%20Calculator&type=tool',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Student Loan Calculator — Free Online Calculator',
    description: 'Calculate student loan payments under standard, graduated, and income-driven repayment plans. See total interest, payoff dates, and refinancing savings.',
    images: ['/api/og?title=Student%20Loan%20Calculator&type=tool'],
  },
};

export default function Layout({ children }) {
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Pulsafi Student Loan Calculator',
    'url': 'https://www.pulsafi.com/tools/student-loan-calculator',
    'description': 'Calculate student loan payments under standard, graduated, and income-driven repayment plans. See total interest, payoff dates, and refinancing savings.',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Web',
    'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much will I save by paying extra on my student loans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The amount you save depends on your loan balance, interest rate, and the size of your extra payment. Even small additional monthly payments can save thousands in interest over the life of the loan. Use our calculator to input your specific loan details and see your exact savings.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between federal subsidized and unsubsidized loans?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Federal subsidized loans do not accrue interest while you are in school, during grace periods, or during deferment. Federal unsubsidized loans accrue interest from the moment they are issued. Our calculator lets you model both types with their typical interest rates.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate my student loan payoff date?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your payoff date is calculated based on your loan balance, interest rate, and monthly payment using an amortization schedule. This calculator determines exactly when you will be debt-free based on your minimum payment plus any extra payments you want to make.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pulsafi.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://www.pulsafi.com/tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Student Loan Calculator',
        item: 'https://www.pulsafi.com/tools/student-loan-calculator',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
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

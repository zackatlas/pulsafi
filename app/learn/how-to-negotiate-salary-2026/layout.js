export const metadata = {
  title: 'How to Negotiate Salary in 2026: Complete Guide',
  description: 'Master salary negotiation with scripts, counter-offer strategies, and tactics for 2026. Increase your salary by $10k-30k+. Expert negotiation strategies included.',
  keywords: 'salary negotiation, negotiate salary, salary increase, counteroffers, salary negotiation script, salary negotiation tips',
  openGraph: {
    title: 'How to Negotiate Salary in 2026: Complete Guide',
    description: 'Master salary negotiation with scripts, counter-offer strategies, and tactics for 2026. Increase your salary by $10k-30k+.',
    type: 'article',
    url: 'https://www.pulsafi.com/learn/how-to-negotiate-salary-2026',
    image: 'https://www.pulsafi.com/images/salary-negotiation-guide.jpg',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Negotiate Salary in 2026: Complete Guide',
    description: 'Master salary negotiation with scripts, counter-offer strategies, and tactics for 2026. Increase your salary by $10k-30k+.',
    image: 'https://www.pulsafi.com/images/salary-negotiation-guide.jpg',
  },
};

export default function Layout({ children }) {
  const breadcrumbs = {
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
        name: 'Learn',
        item: 'https://www.pulsafi.com/learn',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Salary Negotiation',
        item: 'https://www.pulsafi.com/learn/how-to-negotiate-salary-2026',
      },
    ],
  };

  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Negotiate Salary in 2026: Complete Guide',
    description: 'Master salary negotiation with scripts, counter-offer strategies, and tactics for 2026.',
    image: 'https://www.pulsafi.com/images/salary-negotiation-guide.jpg',
    datePublished: '2026-03-19',
    dateModified: '2026-03-19',
    author: {
      '@type': 'Organization',
      name: 'PulsaFi',
      url: 'https://www.pulsafi.com',
    },
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much should I ask for in salary negotiation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Research your market value using Glassdoor, Levels.fyi, and Payscale. Ask for 10-20% more than your current salary or market baseline. Start high; you&rsquo;ll likely negotiate down.',
        },
      },
      {
        '@type': 'Question',
        name: 'When is the best time to negotiate salary?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The best times are: after receiving a job offer, during annual reviews, after a promotion or major project, or when market rates have increased. Avoid negotiating during layoffs or company downturns.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I ever negotiate salary in writing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start conversations verbally, but get your final offer in writing. Email creates a paper trail and prevents miscommunication. Send a thank-you email confirming discussed terms.',
        },
      },
      {
        '@type': 'Question',
        name: 'What do I do if the company says no to my salary request?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ask about alternatives: more vacation days, remote work flexibility, signing bonus, professional development budget, or a review timeline (6 months instead of 12) for additional increases.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I negotiate salary for internal promotions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Internal promotions require negotiation too. Research market rates for the new position, document your contributions, and make a business case for your salary request.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      {children}
    </>
  );
}

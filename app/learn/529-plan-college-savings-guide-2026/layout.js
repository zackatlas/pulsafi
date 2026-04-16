export const metadata = {
  title: "529 Plan College Savings Guide 2026 - Pulsafi",
  description: "Complete guide to 529 college savings plans in 2026. Learn tax benefits, contribution limits, investment strategies, and new Roth IRA rollover rules.",
  alternates: {
    canonical: "https://www.pulsafi.com/learn/529-plan-college-savings-guide-2026",
  },
  openGraph: {
    title: "529 Plan College Savings Guide 2026",
    description: "Complete guide to 529 college savings plans in 2026. Learn tax benefits, contribution limits, investment strategies, and new Roth IRA rollover rules.",
    url: "https://www.pulsafi.com/learn/529-plan-college-savings-guide-2026",
    type: "article",
    images: [
      {
        url: "https://www.pulsafi.com/og-529-guide.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "529 Plan College Savings Guide 2026",
    description: "Complete guide to 529 college savings plans in 2026. Learn tax benefits, contribution limits, investment strategies, and new Roth IRA rollover rules.",
    image: "https://www.pulsafi.com/og-529-guide.jpg",
  },
};

export default function Layout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pulsafi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Learn",
        item: "https://www.pulsafi.com/learn",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "529 Plan College Savings Guide 2026",
        item: "https://www.pulsafi.com/learn/529-plan-college-savings-guide-2026",
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "529 Plan College Savings Guide 2026: Tax Benefits, Strategy & Updates",
    description:
      "Complete guide to 529 college savings plans in 2026. Learn tax benefits, contribution limits, investment strategies, and new Roth IRA rollover rules.",
    image: "https://www.pulsafi.com/og-529-guide.jpg",
    datePublished: "2025-06-15",
    dateModified: "2026-03-19",
    author: {
      "@type": "Organization",
      name: "Pulsafi",
      url: "https://www.pulsafi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Pulsafi",
      url: "https://www.pulsafi.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pulsafi.com/logo.png",
        width: 250,
        height: 60,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What are the 2026 529 plan contribution limits?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For 2026, you can contribute up to $18,000 per year per beneficiary without gift tax consequences. Additionally, 529 plans allow superfunding—contributing five years of gifts at once ($90,000) in a single year without gift tax if you file Form 709. The total value limits vary by state, typically ranging from $235,000 to $550,000 per beneficiary across all plans.",
        },
      },
      {
        "@type": "Question",
        name: "What are the main tax advantages of 529 plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "529 plans offer three major tax benefits: (1) State income tax deduction on contributions (varies by state, up to $235,000+ annually in some states), (2) Tax-free growth on investments, and (3) Tax-free withdrawals for qualified education expenses. Some states offer additional benefits like matching grants or matching contributions.",
        },
      },
      {
        "@type": "Question",
        name: "What happens to a 529 plan if my child doesn't go to college?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under SECURE 2.0 Act rules effective 2024, you can roll over up to $35,000 from a 529 plan to a beneficiary's Roth IRA without tax penalties, provided the plan has been open for 15+ years. Otherwise, non-qualified withdrawals are subject to income tax and a 10% penalty on earnings. You can also change the beneficiary to another family member.",
        },
      },
      {
        "@type": "Question",
        name: "What investment options are available in 529 plans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most 529 plans offer age-based portfolios (automatically becoming more conservative as college approaches), individual investment funds (stocks, bonds, money market), prepaid tuition plans (guaranteed tuition credits), and principal protection options. Investment choices vary by plan; you can typically select from 15-50+ investment options depending on the plan.",
        },
      },
      {
        "@type": "Question",
        name: "Can I use 529 plans for K-12 education?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Under current law, up to $35,000 annually can be withdrawn from a 529 plan for K-12 private school tuition without penalty. Additionally, up to $35,000 lifetime can be rolled over to a Roth IRA. However, these withdrawals may reduce state tax benefits, so you should review your specific state's rules.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}

export const metadata = {
  title: "Social Security Benefits in 2026: When to Claim and How Much You'll Get",
  description: "Complete guide to Social Security benefits in 2026. Learn about full retirement age, early vs delayed claiming strategies, break-even analysis, and spousal benefits.",
  canonical: "https://www.pulsafi.com/learn/social-security-benefits-guide-2026",
  openGraph: {
    title: "Social Security Benefits in 2026: When to Claim and How Much You'll Get",
    description: "Complete guide to Social Security benefits in 2026. Learn about full retirement age, early vs delayed claiming strategies, break-even analysis, and spousal benefits.",
    url: "https://www.pulsafi.com/learn/social-security-benefits-guide-2026",
    type: "article",
  },
};

export default function Layout({ children }) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Pulsafi",
        "item": "https://www.pulsafi.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Learn",
        "item": "https://www.pulsafi.com/learn"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Social Security Benefits in 2026: When to Claim and How Much You'll Get",
        "item": "https://www.pulsafi.com/learn/social-security-benefits-guide-2026"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Social Security Benefits in 2026: When to Claim and How Much You'll Get",
    "description": "Complete guide to Social Security benefits in 2026. Learn about full retirement age, early vs delayed claiming strategies, break-even analysis, and spousal benefits.",
    "image": "https://www.pulsafi.com/og-social-security.png",
    "datePublished": "2026-03-19",
    "dateModified": "2026-03-19",
    "author": {
      "@type": "Organization",
      "name": "Pulsafi"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pulsafi",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.pulsafi.com/logo.png"
      }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the full retirement age for Social Security benefits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Full retirement age (FRA) depends on your birth year. For those born in 1954-1959, FRA is 66 years old. For those born in 1960 or later, FRA is 67 years old. Some people may have slightly different ages if born between these ranges."
        }
      },
      {
        "@type": "Question",
        "name": "How much will I get if I claim Social Security at 62 vs 67 vs 70?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Your benefit amount increases the later you claim. At age 62 you receive roughly 70% of your full retirement age benefit. At your full retirement age (67), you receive 100% of your benefit. At age 70, you receive about 124% of your full retirement age benefit due to delayed retirement credits."
        }
      },
      {
        "@type": "Question",
        "name": "Can I work while collecting Social Security benefits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can work while collecting Social Security, but your benefits may be temporarily reduced if you earn above certain thresholds before reaching full retirement age. Once you reach your full retirement age, there is no earnings limit and you can earn as much as you want without affecting your benefits."
        }
      },
      {
        "@type": "Question",
        "name": "What are spousal and survivor benefits?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spousal benefits allow a spouse who has not worked enough to receive up to 50% of the worker's full retirement age benefit. Survivor benefits provide payments to family members of a deceased worker, including spouses, children, and dependent parents."
        }
      },
      {
        "@type": "Question",
        "name": "Is Social Security going bankrupt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Social Security Trust Fund is projected to be depleted around 2033 if no legislative changes are made. However, this does not mean Social Security will disappear. Even after depletion, incoming payroll taxes would still fund roughly 80% of scheduled benefits. Policy changes are likely to address the shortfall before 2033."
        }
      }
    ]
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

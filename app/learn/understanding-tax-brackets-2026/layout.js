export const metadata = {
  title: "Understanding Tax Brackets in 2026: How They Actually Work",
  description:
    "Learn how marginal tax rates work, understand 2026 federal tax brackets, and discover common misconceptions about moving into a higher tax bracket. Includes practical strategies to reduce your taxable income.",
  keywords: [
    "tax brackets 2026",
    "marginal tax rate",
    "federal tax brackets",
    "how tax brackets work",
    "progressive tax system",
    "effective tax rate",
    "tax reduction strategies",
    "income tax planning",
  ],
  canonical: "https://www.pulsafi.com/learn/understanding-tax-brackets-2026",
  openGraph: {
    title: "Understanding Tax Brackets in 2026: How They Actually Work",
    description:
      "Learn how marginal tax rates work and discover strategies to reduce your tax bill in 2026.",
    url: "https://www.pulsafi.com/learn/understanding-tax-brackets-2026",
    type: "article",
    publishedTime: "2026-03-19T00:00:00Z",
    authors: ["Pulsafi"],
    images: [
      {
        url: "https://www.pulsafi.com/og-tax-brackets-2026.jpg",
        width: 1200,
        height: 630,
        alt: "Tax Brackets 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Understanding Tax Brackets in 2026: How They Actually Work",
    description:
      "Learn how marginal tax rates work and discover strategies to reduce your tax bill in 2026.",
    images: ["https://www.pulsafi.com/og-tax-brackets-2026.jpg"],
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
        name: "Understanding Tax Brackets in 2026",
        item: "https://www.pulsafi.com/learn/understanding-tax-brackets-2026",
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Understanding Tax Brackets in 2026: How They Actually Work",
    description:
      "Learn how marginal tax rates work, understand 2026 federal tax brackets, and discover common misconceptions about moving into a higher tax bracket.",
    image: "https://www.pulsafi.com/og-tax-brackets-2026.jpg",
    datePublished: "2026-03-19",
    dateModified: "2026-09-19",
    author: {
      "@type": "Organization",
      name: "Pulsafi",
      url: "https://www.pulsafi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Pulsafi",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pulsafi.com/logo.png",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a marginal tax rate and how does it differ from my effective tax rate?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your marginal tax rate is the tax rate you pay on your last dollar of income. Your effective tax rate is your total tax divided by your total income. They are different because the U.S. uses a progressive tax system where different portions of your income are taxed at different rates.",
        },
      },
      {
        "@type": "Question",
        name: "If I earn more money and move into a higher tax bracket, will I owe more taxes on all my income?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, this is a common misconception. Moving into a higher bracket only means the income in that bracket is taxed at the higher rate. Your income in lower brackets continues to be taxed at the lower rates. For example, earning $1 more to reach a 24% bracket doesn't make all your previous income taxed at 24%.",
        },
      },
      {
        "@type": "Question",
        name: "What are the 2026 federal tax brackets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The 2026 federal tax brackets for single filers are: 10% ($0-$12,400), 12% ($12,401-$50,400), 22% ($50,401-$105,700), 24% ($105,701-$201,775), 32% ($201,776-$256,225), 35% ($256,226-$640,600), and 37% (over $640,600). The 2026 standard deduction is $16,100 for single filers and $32,200 for married filing jointly. For married filing jointly, the ranges are approximately double. These brackets are adjusted annually for inflation.",
        },
      },
      {
        "@type": "Question",
        name: "What are the best ways to reduce my taxable income?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can reduce taxable income through pre-tax contributions to 401(k)s, traditional IRAs, HSAs, and by maximizing the standard deduction. Itemizing deductions (mortgage interest, charitable contributions, state taxes) may be beneficial depending on your situation. Consider timing income and deductions strategically at year-end.",
        },
      },
      {
        "@type": "Question",
        name: "Do all states use the same tax brackets as the federal government?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Some states have no income tax (Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, Wyoming). States with income taxes use their own bracket structures, which may be flat rates or progressive systems similar to federal brackets. State tax rates typically range from 2% to 13% depending on the state.",
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

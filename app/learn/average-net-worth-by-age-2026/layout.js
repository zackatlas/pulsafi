export const metadata = {
  title: 'Average Net Worth by Age in 2026: Where Do You Stand? | Pulsafi',
  description: 'See the average and median net worth by age group in 2026. From your 20s to retirement, find out where you stand and how to build wealth faster.',
  keywords: ['average net worth by age', 'median net worth', 'net worth by age 2026', 'net worth percentile', 'how much should I have saved', 'net worth benchmarks'],
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/average-net-worth-by-age-2026',
  },
  openGraph: {
    title: 'Average Net Worth by Age in 2026: Where Do You Stand?',
    description: 'See the average and median net worth by age group in 2026. Find out where you stand and how to build wealth faster.',
    url: 'https://www.pulsafi.com/learn/average-net-worth-by-age-2026',
    type: 'article',
    images: [{ url: 'https://www.pulsafi.com/api/og?title=Average+Net+Worth+by+Age&subtitle=2026+Benchmarks+%26+Percentiles&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Average Net Worth by Age in 2026: Where Do You Stand?',
    description: 'Average and median net worth by age group in 2026. Find out where you rank.',
    images: ['https://www.pulsafi.com/api/og?title=Average+Net+Worth+by+Age&subtitle=2026+Benchmarks+%26+Percentiles&type=article'],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com" },
              { "@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn" },
              { "@type": "ListItem", "position": 3, "name": "Average Net Worth by Age 2026", "item": "https://www.pulsafi.com/learn/average-net-worth-by-age-2026" }
            ]
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Average Net Worth by Age in 2026: Where Do You Stand?",
            "description": "See the average and median net worth by age group in 2026. From your 20s to retirement, find out where you stand and how to build wealth faster.",
            "author": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com" },
            "publisher": { "@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": { "@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png" } },
            "datePublished": "2026-03-19",
            "dateModified": "2026-03-19",
            "mainEntityOfPage": { "@id": "https://www.pulsafi.com/learn/average-net-worth-by-age-2026" }
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the average net worth by age 30?",
                "acceptedAnswer": { "@type": "Answer", "text": "The average net worth for Americans under 35 is approximately $183,500, while the median is about $39,000. The large gap between average and median is due to high earners pulling the average up significantly." }
              },
              {
                "@type": "Question",
                "name": "What should my net worth be at 40?",
                "acceptedAnswer": { "@type": "Answer", "text": "The average net worth for Americans aged 35-44 is about $549,600, with a median of around $135,600. A common benchmark is to have 1-2x your annual salary saved by age 40." }
              },
              {
                "@type": "Question",
                "name": "Why is average net worth so much higher than median?",
                "acceptedAnswer": { "@type": "Answer", "text": "The average is skewed upward by very wealthy individuals. If 9 people have $50,000 and 1 person has $5,000,000, the average is $545,000 but the median is $50,000. The median is a better indicator of what a typical person has." }
              },
              {
                "@type": "Question",
                "name": "How do I calculate my net worth?",
                "acceptedAnswer": { "@type": "Answer", "text": "Net worth = total assets minus total liabilities. Add up everything you own (savings, investments, home equity, retirement accounts, vehicles) and subtract everything you owe (mortgage, student loans, credit card debt, auto loans). The result is your net worth." }
              },
              {
                "@type": "Question",
                "name": "Is it normal to have a negative net worth in your 20s?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, it's very common, especially for those with student loans. About 20% of households under 35 have zero or negative net worth. The key is to have a plan to grow it — even moving from -$30,000 to $0 is significant progress." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  );
}

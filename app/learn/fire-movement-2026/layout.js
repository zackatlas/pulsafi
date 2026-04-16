export const metadata = {
  title: 'FIRE Movement 2026: What\'s Changed and Why It Matters',
  description: 'The FIRE movement is evolving. We\'re breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.',
  alternates: {
    canonical: 'https://www.pulsafi.com/learn/fire-movement-2026',
  },
  openGraph: {
    title: 'FIRE Movement 2026: What\'s Changed and Why It Matters',
    description: 'The FIRE movement is evolving. We\'re breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.',
    url: 'https://www.pulsafi.com/learn/fire-movement-2026',
    type: 'article',
    images: [{ url: '/api/og?title=FIRE+Movement+2026%3A+Whats+Changed+and+Why+It+Matters&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE Movement 2026: What\'s Changed and Why It Matters',
    description: 'The FIRE movement is evolving. We\'re breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.',
    images: ['/api/og?title=FIRE+Movement+2026%3A+Whats+Changed+and+Why+It+Matters&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://www.pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "FIRE Movement 2026: What's Changed and Why It Matters", "item": "https://www.pulsafi.com/learn/fire-movement-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "FIRE Movement 2026: What's Changed and Why It Matters", "description": "The FIRE movement is evolving. We're breaking down updated strategies for 2026, realistic timelines, and if early retirement is actually achievable.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://www.pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://www.pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://www.pulsafi.com/learn/fire-movement-2026"}}),
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
                "name": "What does FIRE mean?",
                "acceptedAnswer": { "@type": "Answer", "text": "FIRE stands for 'Financial Independence, Retire Early.' It's a lifestyle movement focused on saving a large percentage of income (often 50%+) and investing it to reach financial independence years or decades before traditional retirement age." }
              },
              {
                "@type": "Question",
                "name": "How much money do you need to retire early with FIRE?",
                "acceptedAnswer": { "@type": "Answer", "text": "Most FIRE calculations use 25x your annual expenses as a target (using the 4% withdrawal rule). For example, if you spend $40,000/year, you'd aim for $1 million. This varies based on location, lifestyle, and health costs." }
              },
              {
                "@type": "Question",
                "name": "What is the 4% rule in FIRE?",
                "acceptedAnswer": { "@type": "Answer", "text": "The 4% rule suggests you can withdraw 4% of your portfolio annually without running out of money over a 30-year retirement. A $1 million portfolio would provide $40,000/year. This assumes 60/40 stock/bond allocation and reasonable market returns." }
              },
              {
                "@type": "Question",
                "name": "Is FIRE still possible in 2026 with inflation and market changes?",
                "acceptedAnswer": { "@type": "Answer", "text": "Yes, but FIRE timelines have lengthened due to inflation and higher stock valuations. Higher savings rates, geographic flexibility, and realistic expense planning remain key. Many FIRE followers are adjusting targets to 30x expenses for safety margins." }
              },
              {
                "@type": "Question",
                "name": "What are common FIRE mistakes to avoid?",
                "acceptedAnswer": { "@type": "Answer", "text": "Common mistakes include underestimating healthcare costs, lifestyle inflation after quitting work, overly aggressive asset allocation, and not accounting for inflation. Flexibility in spending and having backup income sources increases FIRE success rates." }
              }
            ]
          }),
        }}
      />
      {children}
    </>
  )
}

export const metadata = {
  title: 'Why the 50/30/20 Budget Rule Might Be Wrong for You',
  description: 'The 50/30/20 rule doesn\'t work for everyone. Learn when to use it, when to skip it, and better budgeting alternatives for your situation.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/50-30-20-budget-rule-wrong',
  },
  openGraph: {
    title: 'Why the 50/30/20 Budget Rule Might Be Wrong for You',
    description: 'The 50/30/20 rule doesn\'t work for everyone. Learn when to use it, when to skip it, and better budgeting alternatives for your situation.',
    url: 'https://pulsafi.com/learn/50-30-20-budget-rule-wrong',
    type: 'article',
    images: [{ url: '/api/og?title=Why+the+50/30/20+Budget+Rule+Might+Be+Wrong+for+You&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why the 50/30/20 Budget Rule Might Be Wrong for You',
    description: 'The 50/30/20 rule doesn\'t work for everyone. Learn when to use it, when to skip it, and better budgeting alternatives for your situation.',
    images: ['/api/og?title=Why+the+50/30/20+Budget+Rule+Might+Be+Wrong+for+You&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "Why the 50/30/20 Budget Rule Might Be Wrong for You", "item": "https://pulsafi.com/learn/50-30-20-budget-rule-wrong"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "Why the 50/30/20 Budget Rule Might Be Wrong for You", "description": "The 50/30/20 rule doesn't work for everyone. Learn when to use it, when to skip it, and better budgeting alternatives for your situation.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/50-30-20-budget-rule-wrong"}}),
        }}
      />
      {children}
    </>
  )
}

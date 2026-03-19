export const metadata = {
  title: 'The Best Budgeting Method for 2026',
  description: 'Compare zero-based, envelope, 50/30/20, pay-yourself-first, and anti-budget methods. Find the budgeting system that actually sticks.',
  alternates: {
    canonical: 'https://pulsafi.com/learn/best-budgeting-method-2026',
  },
  openGraph: {
    title: 'The Best Budgeting Method for 2026',
    description: 'Compare zero-based, envelope, 50/30/20, pay-yourself-first, and anti-budget methods. Find the budgeting system that actually sticks.',
    url: 'https://pulsafi.com/learn/best-budgeting-method-2026',
    type: 'article',
    images: [{ url: '/api/og?title=The+Best+Budgeting+Method+for+2026&type=article', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Best Budgeting Method for 2026',
    description: 'Compare zero-based, envelope, 50/30/20, pay-yourself-first, and anti-budget methods. Find the budgeting system that actually sticks.',
    images: ['/api/og?title=The+Best+Budgeting+Method+for+2026&type=article'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://pulsafi.com"}, {"@type": "ListItem", "position": 2, "name": "Learn", "item": "https://pulsafi.com/learn"}, {"@type": "ListItem", "position": 3, "name": "The Best Budgeting Method for 2026", "item": "https://pulsafi.com/learn/best-budgeting-method-2026"}]}),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context": "https://schema.org", "@type": "Article", "headline": "The Best Budgeting Method for 2026", "description": "Compare zero-based, envelope, 50/30/20, pay-yourself-first, and anti-budget methods. Find the budgeting system that actually sticks.", "author": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com"}, "publisher": {"@type": "Organization", "name": "Pulsafi", "url": "https://pulsafi.com", "logo": {"@type": "ImageObject", "url": "https://pulsafi.com/icon.png"}}, "datePublished": "2025-03-01", "dateModified": "2026-03-18", "mainEntityOfPage": {"@id": "https://pulsafi.com/learn/best-budgeting-method-2026"}}),
        }}
      />
      {children}
    </>
  )
}

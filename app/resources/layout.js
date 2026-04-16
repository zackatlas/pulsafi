export const metadata = {
  title: 'Financial Resources — Articles, Guides & Newsletter',
  description: 'In-depth personal finance articles, comparison guides for savings accounts and brokerages, and a free weekly newsletter from Pulsafi. Learn investing, budgeting, retirement planning, debt management, and real estate strategies.',
  openGraph: {
    title: 'Financial Resources — Pulsafi',
    description: 'Articles, guides, and a free weekly newsletter to help you build real wealth.',
    url: 'https://www.pulsafi.com/resources',
  },
}

export default function Layout({ children }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "mainEntity": {
              "@type": "NewsMediaOrganization",
              "name": "Pulsafi Resources",
              "description": "Free financial articles, guides, and weekly newsletter",
              "url": "https://www.pulsafi.com/resources",
              "topics": [
                "Personal Finance",
                "Investing",
                "Budgeting",
                "Retirement Planning",
                "Debt Management",
                "Real Estate",
                "Financial Independence"
              ]
            }
          })
        }}
      />
    </>
  );
}

export const metadata = {
  title: 'Budget Calculator | Pulsafi',
  description: 'Create a personalized budget using the 50/30/20 rule. Allocate your income to needs, wants, and savings with our free budget planning calculator.',
  alternates: {
    canonical: 'https://pulsafi.com/tools/budget-calculator',
  },
  openGraph: {
    title: 'Budget Calculator — 50/30/20 Budget Planner | Pulsafi',
    description: 'Create a personalized budget using the 50/30/20 rule. Allocate your income to needs, wants, and savings with our free budget planning calculator.',
    url: 'https://pulsafi.com/tools/budget-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Budget+Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator — 50/30/20 Budget Planner | Pulsafi',
    description: 'Create a personalized budget using the 50/30/20 rule. Allocate your income to needs, wants, and savings with our free budget planning calculator.',
    images: ['/api/og?title=Budget+Calculator&type=tool'],
  },
}

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Pulsafi Budget Calculator",
            "url": "https://pulsafi.com/tools/budget-calculator",
            "description": "Create a personalized budget using the 50/30/20 rule. Allocate your income to needs, wants, and savings with our free budget planning calculator.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          }),
        }}
      />
      {children}
    </>
  )
}

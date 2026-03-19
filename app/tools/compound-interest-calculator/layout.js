export const metadata = {
  title: 'Compound Interest Calculator | Pulsafi',
  description: 'Calculate how your investments grow over time with compound interest. See the power of compounding with monthly contributions, variable rates, and detailed growth charts.',
  alternates: {
    canonical: 'https://pulsafi.com/tools/compound-interest-calculator',
  },
  openGraph: {
    title: 'Free Compound Interest Calculator — Free Online Calculator | Pulsafi',
    description: 'Calculate how your investments grow over time with compound interest. See the power of compounding with monthly contributions, variable rates, and detailed growth charts.',
    url: 'https://pulsafi.com/tools/compound-interest-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Compound+Interest+Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Compound Interest Calculator — Free Online Calculator | Pulsafi',
    description: 'Calculate how your investments grow over time with compound interest. See the power of compounding with monthly contributions, variable rates, and detailed growth charts.',
    images: ['/api/og?title=Compound+Interest+Calculator&type=tool'],
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
            "name": "Pulsafi Compound Interest Calculator",
            "url": "https://pulsafi.com/tools/compound-interest-calculator",
            "description": "Calculate how your investments grow over time with compound interest. See the power of compounding with monthly contributions, variable rates, and detailed growth charts.",
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

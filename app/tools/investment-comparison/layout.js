export const metadata = {
  title: 'Investment Comparison Tool | Pulsafi',
  description: 'Compare different investment options side by side. See projected returns, risk levels, and growth charts for stocks, bonds, real estate, and more.',
  alternates: {
    canonical: 'https://pulsafi.com/tools/investment-comparison',
  },
  openGraph: {
    title: 'Investment Comparison Tool — Compare Returns Side by Side | Pulsafi',
    description: 'Compare different investment options side by side. See projected returns, risk levels, and growth charts for stocks, bonds, real estate, and more.',
    url: 'https://pulsafi.com/tools/investment-comparison',
    type: 'website',
    images: [{ url: '/api/og?title=Investment+Comparison+Tool&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Investment Comparison Tool — Compare Returns Side by Side | Pulsafi',
    description: 'Compare different investment options side by side. See projected returns, risk levels, and growth charts for stocks, bonds, real estate, and more.',
    images: ['/api/og?title=Investment+Comparison+Tool&type=tool'],
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
            "name": "Pulsafi Investment Comparison Tool",
            "url": "https://pulsafi.com/tools/investment-comparison",
            "description": "Compare different investment options side by side. See projected returns, risk levels, and growth charts for stocks, bonds, real estate, and more.",
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

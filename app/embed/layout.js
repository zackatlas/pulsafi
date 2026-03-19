export const metadata = {
  title: 'Embed Free Financial Calculators — Pulsafi',
  description: 'Add professional-grade financial calculators to your website for free. Mortgage, compound interest, FIRE, debt payoff, salary breakdown, investment comparison, and crypto planner. Copy the embed code and paste into your site.',
  openGraph: {
    title: 'Embed Free Financial Calculators — Pulsafi',
    description: 'Add free financial calculators to your site. Just copy and paste.',
    url: 'https://pulsafi.com/embed',
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
            "@type": "SoftwareApplication",
            "name": "Pulsafi Embeddable Widgets",
            "description": "Free embeddable financial calculators for websites",
            "url": "https://pulsafi.com/embed",
            "applicationCategory": "FinanceApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "availableLanguage": "en-US",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1200"
            }
          })
        }}
      />
    </>
  );
}

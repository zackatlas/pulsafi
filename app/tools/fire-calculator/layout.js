export const metadata = {
  title: 'FIRE Calculator',
  description: 'Calculate your path to financial independence and early retirement. See your FIRE number, savings rate, and projected retirement date based on your income and expenses.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/fire-calculator',
  },
  openGraph: {
    title: 'FIRE Calculator — Financial Independence Retire Early',
    description: 'Calculate your path to financial independence and early retirement. See your FIRE number, savings rate, and projected retirement date based on your income and expenses.',
    url: 'https://www.pulsafi.com/tools/fire-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=FIRE+Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FIRE Calculator — Financial Independence Retire Early',
    description: 'Calculate your path to financial independence and early retirement. See your FIRE number, savings rate, and projected retirement date based on your income and expenses.',
    images: ['/api/og?title=FIRE+Calculator&type=tool'],
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
            "name": "Pulsafi FIRE Calculator",
            "url": "https://www.pulsafi.com/tools/fire-calculator",
            "description": "Calculate your path to financial independence and early retirement. See your FIRE number, savings rate, and projected retirement date based on your income and expenses.",
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

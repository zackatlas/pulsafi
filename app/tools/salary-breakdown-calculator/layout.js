export const metadata = {
  title: 'Salary Breakdown Calculator',
  description: 'Calculate your take-home pay after federal and state taxes, Social Security, and Medicare. See your salary broken down by month, biweekly, and hourly rates.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/salary-breakdown-calculator',
  },
  openGraph: {
    title: 'Salary Breakdown Calculator — Take-Home Pay After Taxes',
    description: 'Calculate your take-home pay after federal and state taxes, Social Security, and Medicare. See your salary broken down by month, biweekly, and hourly rates.',
    url: 'https://www.pulsafi.com/tools/salary-breakdown-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Salary+Breakdown+Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salary Breakdown Calculator — Take-Home Pay After Taxes',
    description: 'Calculate your take-home pay after federal and state taxes, Social Security, and Medicare. See your salary broken down by month, biweekly, and hourly rates.',
    images: ['/api/og?title=Salary+Breakdown+Calculator&type=tool'],
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
            "name": "Pulsafi Salary Breakdown Calculator",
            "url": "https://www.pulsafi.com/tools/salary-breakdown-calculator",
            "description": "Calculate your take-home pay after federal and state taxes, Social Security, and Medicare. See your salary broken down by month, biweekly, and hourly rates.",
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

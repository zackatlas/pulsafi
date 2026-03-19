export const metadata = {
  title: 'Debt Payoff Calculator | Pulsafi',
  description: 'Create a debt payoff plan using avalanche or snowball methods. See your payoff date, total interest, and monthly payment schedule for credit cards and loans.',
  alternates: {
    canonical: 'https://pulsafi.com/tools/debt-payoff-calculator',
  },
  openGraph: {
    title: 'Debt Payoff Calculator — Free Debt Elimination Planner | Pulsafi',
    description: 'Create a debt payoff plan using avalanche or snowball methods. See your payoff date, total interest, and monthly payment schedule for credit cards and loans.',
    url: 'https://pulsafi.com/tools/debt-payoff-calculator',
    type: 'website',
    images: [{ url: '/api/og?title=Debt+Payoff+Calculator&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator — Free Debt Elimination Planner | Pulsafi',
    description: 'Create a debt payoff plan using avalanche or snowball methods. See your payoff date, total interest, and monthly payment schedule for credit cards and loans.',
    images: ['/api/og?title=Debt+Payoff+Calculator&type=tool'],
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
            "name": "Pulsafi Debt Payoff Calculator",
            "url": "https://pulsafi.com/tools/debt-payoff-calculator",
            "description": "Create a debt payoff plan using avalanche or snowball methods. See your payoff date, total interest, and monthly payment schedule for credit cards and loans.",
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

export const metadata = {
  title: 'Crypto Investment Planner',
  description: 'Plan your cryptocurrency investments with our free planner. Explore portfolio allocations, risk scenarios, and projected returns for Bitcoin, Ethereum, and other assets.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/crypto-planner',
  },
  openGraph: {
    title: 'Crypto Investment Planner — Portfolio Planning Tool',
    description: 'Plan your cryptocurrency investments with our free planner. Explore portfolio allocations, risk scenarios, and projected returns for Bitcoin, Ethereum, and other assets.',
    url: 'https://www.pulsafi.com/tools/crypto-planner',
    type: 'website',
    images: [{ url: '/api/og?title=Crypto+Investment+Planner&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Investment Planner — Portfolio Planning Tool',
    description: 'Plan your cryptocurrency investments with our free planner. Explore portfolio allocations, risk scenarios, and projected returns for Bitcoin, Ethereum, and other assets.',
    images: ['/api/og?title=Crypto+Investment+Planner&type=tool'],
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
            "name": "Pulsafi Crypto Investment Planner",
            "url": "https://www.pulsafi.com/tools/crypto-planner",
            "description": "Plan your cryptocurrency investments with our free planner. Explore portfolio allocations, risk scenarios, and projected returns for Bitcoin, Ethereum, and other assets.",
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

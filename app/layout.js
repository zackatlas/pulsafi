import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import AuthProvider from './components/AuthProvider'

export const metadata = {
  metadataBase: new URL('https://pulsafi.com'),
  title: {
    default: 'Pulsafi — Free Financial Calculators & Tools',
    template: '%s | Pulsafi',
  },
  description: 'Free professional-grade financial calculators for mortgages, compound interest, FIRE retirement, debt payoff, salary breakdown, investment comparison, and crypto planning. No signup required.',
  keywords: ['financial calculator', 'mortgage calculator', 'compound interest calculator', 'FIRE calculator', 'retirement calculator', 'debt payoff calculator', 'salary calculator', 'investment calculator', 'crypto calculator', 'free financial tools'],
  authors: [{ name: 'Pulsafi' }],
  creator: 'Pulsafi',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pulsafi.com',
    siteName: 'Pulsafi',
    title: 'Pulsafi — Free Financial Calculators & Tools',
    description: 'Professional-grade financial calculators. Mortgages, compound interest, FIRE retirement, debt payoff, and more. 100% free, no signup.',
    images: [{ url: '/api/og?title=Pulsafi&subtitle=Free+Financial+Calculators+%26+Tools&type=default', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulsafi — Free Financial Calculators & Tools',
    description: 'Professional-grade financial calculators. 100% free, no signup.',
    images: ['/api/og?title=Pulsafi&subtitle=Free+Financial+Calculators+%26+Tools&type=default'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  verification: {
        google: 'nlpIdzKndjIl4JleJkhEY3lwFASMqvJTleR7QfnHSIM',
  },
}

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Pulsafi",
        "url": "https://pulsafi.com",
        "description": "Free professional-grade financial calculators, tools, and interactive learning for everyone.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://pulsafi.com/tools?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "Pulsafi",
        "url": "https://pulsafi.com",
        "logo": "https://pulsafi.com/logo.png",
        "sameAs": []
      },
      {
        "@type": "ItemList",
        "name": "Free Financial Calculators",
        "description": "Professional-grade financial calculators — free forever, no signup required.",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Mortgage Calculator", "url": "https://pulsafi.com/tools/mortgage-calculator" },
          { "@type": "ListItem", "position": 2, "name": "Compound Interest Calculator", "url": "https://pulsafi.com/tools/compound-interest-calculator" },
          { "@type": "ListItem", "position": 3, "name": "FIRE Calculator", "url": "https://pulsafi.com/tools/fire-calculator" },
          { "@type": "ListItem", "position": 4, "name": "Debt Payoff Calculator", "url": "https://pulsafi.com/tools/debt-payoff-calculator" },
          { "@type": "ListItem", "position": 5, "name": "Salary Breakdown Calculator", "url": "https://pulsafi.com/tools/salary-breakdown-calculator" },
          { "@type": "ListItem", "position": 6, "name": "Investment Comparison Tool", "url": "https://pulsafi.com/tools/investment-comparison" },
          { "@type": "ListItem", "position": 7, "name": "Crypto Investment Planner", "url": "https://pulsafi.com/tools/crypto-planner" },
          { "@type": "ListItem", "position": 8, "name": "Opportunity Cost Calculator", "url": "https://pulsafi.com/tools/opportunity-cost-calculator" },
          { "@type": "ListItem", "position": 9, "name": "Net Worth Calculator", "url": "https://pulsafi.com/tools/net-worth-calculator" },
          { "@type": "ListItem", "position": 10, "name": "Financial Health Score", "url": "https://pulsafi.com/tools/financial-health-score" }
        ]
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('pulsafi-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

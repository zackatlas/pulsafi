import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import dynamic from 'next/dynamic'
import { ThemeProvider } from './components/ThemeProvider'
import AuthProvider from './components/AuthProvider'

// OnboardingModal only matters for logged-in, un-onboarded users and only
// renders after a 1.2s delay anyway. Dynamic import keeps its code + the
// contentTags data out of the initial JS chunk, so anonymous visitors (and
// Googlebot) don't download it.
const OnboardingModal = dynamic(() => import('./components/OnboardingModal'), {
  ssr: false,
});

// Build the Google Fonts URL once so we can reference it consistently in the
// preload link, the inline loader script, and the noscript fallback.
const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap';
export const metadata = {
  metadataBase: new URL('https://www.pulsafi.com'),
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
    url: 'https://www.pulsafi.com',
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
        "url": "https://www.pulsafi.com",
        "description": "Free professional-grade financial calculators, tools, and interactive learning for everyone.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.pulsafi.com/tools?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "name": "Pulsafi",
        "url": "https://www.pulsafi.com",
        "logo": "https://www.pulsafi.com/logo.png",
        "sameAs": []
      },
      {
        "@type": "ItemList",
        "name": "Free Financial Calculators",
        "description": "Professional-grade financial calculators — free forever, no signup required.",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Mortgage Calculator", "url": "https://www.pulsafi.com/tools/mortgage-calculator" },
          { "@type": "ListItem", "position": 2, "name": "Compound Interest Calculator", "url": "https://www.pulsafi.com/tools/compound-interest-calculator" },
          { "@type": "ListItem", "position": 3, "name": "FIRE Calculator", "url": "https://www.pulsafi.com/tools/fire-calculator" },
          { "@type": "ListItem", "position": 4, "name": "Debt Payoff Calculator", "url": "https://www.pulsafi.com/tools/debt-payoff-calculator" },
          { "@type": "ListItem", "position": 5, "name": "Salary Breakdown Calculator", "url": "https://www.pulsafi.com/tools/salary-breakdown-calculator" },
          { "@type": "ListItem", "position": 6, "name": "Investment Comparison Tool", "url": "https://www.pulsafi.com/tools/investment-comparison" },
          { "@type": "ListItem", "position": 7, "name": "Crypto Investment Planner", "url": "https://www.pulsafi.com/tools/crypto-planner" },
          { "@type": "ListItem", "position": 8, "name": "Opportunity Cost Calculator", "url": "https://www.pulsafi.com/tools/opportunity-cost-calculator" },
          { "@type": "ListItem", "position": 9, "name": "Net Worth Calculator", "url": "https://www.pulsafi.com/tools/net-worth-calculator" },
          { "@type": "ListItem", "position": 10, "name": "Financial Health Score", "url": "https://www.pulsafi.com/tools/financial-health-score" }
        ]
      }
    ]
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Non-blocking font load.
            The `<link rel="preload" as="style">` kicks off the download
            immediately without blocking render. The inline script then injects
            a normal stylesheet tag once the head is parsed — text paints in
            the system fallback first, then the webfont swaps in (font-display
            swap in the URL keeps the swap flash-free). The `<noscript>` tag
            covers the < 1% of visitors without JS. Saves ~300-800ms LCP on
            3G/4G and ~50-150ms on fiber. */}
        <link rel="preload" as="style" href={FONTS_URL} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(FONTS_URL)};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link href={FONTS_URL} rel="stylesheet" />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('pulsafi-theme') || 'light';
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
            {/* Fires once per user on their first logged-in visit; renders
                null for anyone not signed in. Kept at the root so it shows
                on whichever page the user lands on after auth. */}
            <OnboardingModal />
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

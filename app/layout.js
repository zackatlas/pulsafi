import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { Analytics } from '@vercel/analytics/next'

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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulsafi — Free Financial Calculators & Tools',
    description: 'Professional-grade financial calculators. 100% free, no signup.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

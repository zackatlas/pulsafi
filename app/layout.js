import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'

export const metadata = {
  title: 'Pulsafi — Free Financial Calculators & Tools',
  description: 'Professional-grade financial calculators for mortgages, compound interest, FIRE retirement, debt payoff, salary breakdown, and investment comparisons. 100% free.',
  keywords: 'financial calculator, mortgage calculator, compound interest calculator, FIRE calculator, debt payoff calculator, salary calculator, investment calculator',
  openGraph: {
    title: 'Pulsafi — Free Financial Calculators & Tools',
    description: 'Professional-grade financial calculators. Mortgage, compound interest, FIRE, debt payoff, and more. 100% free.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('pulsafi-theme');
            if (t) document.documentElement.setAttribute('data-theme', t);
          } catch(e) {}
        `}} />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

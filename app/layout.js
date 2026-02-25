import './globals.css'

export const metadata = {
  title: 'Pulsafi — Free Financial Calculators & Tools',
  description: 'Professional-grade financial calculators for mortgages, compound interest, FIRE retirement, debt payoff, salary breakdown, and investment comparisons. 100% free.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

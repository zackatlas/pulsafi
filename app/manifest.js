export default function manifest() {
  return {
    name: 'Pulsafi — Free Financial Calculators & Tools',
    short_name: 'Pulsafi',
    description: 'Free professional-grade financial calculators, salary data, and market rates. No signup required.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f6f3',
    theme_color: '#a37e1b',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}

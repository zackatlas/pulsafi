export const metadata = {
  title: 'Financial Glossary — 50+ Terms Explained Simply',
  description: 'Plain-English definitions of financial terms from APR to yield curve. No jargon, no fluff — just clear explanations with links to free calculators.',
  openGraph: {
    title: 'Financial Glossary — Pulsafi',
    description: 'Plain-English definitions of 50+ financial terms. Compound interest, ETFs, FIRE, and more.',
    url: 'https://www.pulsafi.com/glossary',
    images: [{ url: '/api/og?title=Financial+Glossary&subtitle=50%2B+Terms+Explained+Simply&type=default', width: 1200, height: 630 }],
  },
};

export default function Layout({ children }) {
  return children;
}

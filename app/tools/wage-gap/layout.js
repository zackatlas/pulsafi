export const metadata = {
  title: 'Living Wage Gap by State | Pulsafi',
  description: 'Explore the gap between minimum wage, median wage, and living wage across all 50 states and DC. See where workers struggle most to afford basic needs.',
  alternates: {
    canonical: 'https://www.pulsafi.com/tools/wage-gap',
  },
  openGraph: {
    title: 'Living Wage Gap by State | Pulsafi',
    description: 'Explore the gap between minimum wage, median wage, and living wage across all 50 states and DC. See where workers struggle most to afford basic needs.',
    url: 'https://www.pulsafi.com/tools/wage-gap',
    type: 'website',
    images: [{ url: '/api/og?title=Wage+Gap+by+State&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Living Wage Gap by State | Pulsafi',
    description: 'Explore the gap between minimum wage, median wage, and living wage across all 50 states and DC.',
    images: ['/api/og?title=Wage+Gap+by+State&type=tool'],
  },
};

export default function WageGapLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Pulsafi Wage Gap Tool",
            "url": "https://www.pulsafi.com/tools/wage-gap",
            "description": "Explore the gap between minimum wage, median wage, and living wage across all 50 states and DC.",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
          }),
        }}
      />
      {children}
    </>
  );
}

export const metadata = {
  title: "Rent vs Buy in 2026: The Math Behind the Biggest Financial Decision",
  description: "Real math comparing renting vs buying in 2026. Calculate hidden homeownership costs, opportunity costs, and the 5-year rule to make the right choice.",
  alternates: { canonical: "https://pulsafi.com/learn/rent-vs-buy-2026" },
  openGraph: {
    title: "Rent vs Buy in 2026: The Math Behind the Biggest Financial Decision",
    description: "Real math comparing renting vs buying in 2026. Calculate hidden homeownership costs, opportunity costs, and the 5-year rule to make the right choice.",
    url: "https://pulsafi.com/learn/rent-vs-buy-2026",
    type: "article",
    images: [{ url: "/api/og?title=Rent%20vs%20Buy%20in%202026&type=article", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rent vs Buy in 2026: The Math Behind the Biggest Financial Decision",
    description: "Real math comparing renting vs buying in 2026. Calculate hidden homeownership costs, opportunity costs, and the 5-year rule to make the right choice.",
    images: ["/api/og?title=Rent%20vs%20Buy%20in%202026&type=article"],
  },
};

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://pulsafi.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Learn",
                item: "https://pulsafi.com/learn",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Rent vs Buy in 2026",
                item: "https://pulsafi.com/learn/rent-vs-buy-2026",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

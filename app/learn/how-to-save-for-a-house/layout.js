export const metadata = {
  title: "How to Save for a House: A Step-by-Step Guide for 2026",
  description: "Complete guide to saving for a home in 2026. Learn down payment amounts, closing costs, emergency reserves, and proven strategies to reach your goal faster.",
  alternates: { canonical: "https://pulsafi.com/learn/how-to-save-for-a-house" },
  openGraph: {
    title: "How to Save for a House: A Step-by-Step Guide for 2026",
    description: "Complete guide to saving for a home in 2026. Learn down payment amounts, closing costs, emergency reserves, and proven strategies to reach your goal faster.",
    url: "https://pulsafi.com/learn/how-to-save-for-a-house",
    type: "article",
    images: [{ url: "/api/og?title=How%20to%20Save%20for%20a%20House&type=article", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Save for a House: A Step-by-Step Guide for 2026",
    description: "Complete guide to saving for a home in 2026. Learn down payment amounts, closing costs, emergency reserves, and proven strategies to reach your goal faster.",
    images: ["/api/og?title=How%20to%20Save%20for%20a%20House&type=article"],
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
                name: "How to Save for a House",
                item: "https://pulsafi.com/learn/how-to-save-for-a-house",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

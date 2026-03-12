export const metadata = {
  title: "What Is a Good Credit Score? Ranges, Tips & How to Improve Yours",
  description: "Learn FICO score ranges, what's considered excellent, and actionable strategies to improve your credit score from 300-850. Debunk common myths today.",
  alternates: { canonical: "https://pulsafi.com/learn/what-is-a-good-credit-score" },
  openGraph: {
    title: "What Is a Good Credit Score? Ranges, Tips & How to Improve Yours",
    description: "Learn FICO score ranges, what's considered excellent, and actionable strategies to improve your credit score from 300-850. Debunk common myths today.",
    url: "https://pulsafi.com/learn/what-is-a-good-credit-score",
    type: "article",
    images: [{ url: "/api/og?title=What%20Is%20a%20Good%20Credit%20Score%3F&type=article", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is a Good Credit Score? Ranges, Tips & How to Improve Yours",
    description: "Learn FICO score ranges, what's considered excellent, and actionable strategies to improve your credit score from 300-850. Debunk common myths today.",
    images: ["/api/og?title=What%20Is%20a%20Good%20Credit%20Score%3F&type=article"],
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
                name: "What Is a Good Credit Score?",
                item: "https://pulsafi.com/learn/what-is-a-good-credit-score",
              },
            ],
          }),
        }}
      />
      {children}
    </>
  );
}

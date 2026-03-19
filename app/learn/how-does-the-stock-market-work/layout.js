export const metadata = {
  title: "How Does the Stock Market Work? A Beginner's Complete Guide",
  description:
    "Learn how the stock market works from the ground up. Discover stocks, exchanges, pricing, and how to start investing as a beginner.",
  canonicalUrl: "https://pulsafi.com/learn/how-does-the-stock-market-work",
  openGraph: {
    title: "How Does the Stock Market Work? A Beginner's Complete Guide",
    description:
      "Learn how the stock market works from the ground up. Discover stocks, exchanges, pricing, and how to start investing as a beginner.",
    url: "https://pulsafi.com/learn/how-does-the-stock-market-work",
    type: "article",
  },
  article: {
    authors: ["Pulsafi"],
    publishedTime: "2026-03-19",
    modifiedTime: "2026-03-19",
    section: "Investing",
    tags: ["stock market", "investing", "beginner", "how to invest"],
  },
};

const jsonLd = [
  {
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
        name: "How Does the Stock Market Work?",
        item: "https://pulsafi.com/learn/how-does-the-stock-market-work",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Does the Stock Market Work? A Beginner's Complete Guide",
    description:
      "Learn how the stock market works from the ground up. Discover stocks, exchanges, pricing, and how to start investing as a beginner.",
    image: "https://pulsafi.com/images/stock-market-guide.jpg",
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    author: {
      "@type": "Organization",
      name: "Pulsafi",
      url: "https://pulsafi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Pulsafi",
      logo: {
        "@type": "ImageObject",
        url: "https://pulsafi.com/logo.png",
        width: 250,
        height: 60,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://pulsafi.com/learn/how-does-the-stock-market-work",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a stock and why would I want to own one?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A stock represents fractional ownership in a company. When you buy a stock, you own a small piece of that business and have the right to share in its profits through dividends or capital appreciation.",
        },
      },
      {
        "@type": "Question",
        name: "How do stock exchanges like NYSE and NASDAQ work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stock exchanges are marketplaces where buyers and sellers trade shares. Market makers facilitate transactions by maintaining inventory and quoting bid/ask prices, ensuring liquidity in the market.",
        },
      },
      {
        "@type": "Question",
        name: "What causes stock prices to change?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Stock prices move based on supply and demand, company earnings reports, investor sentiment, macroeconomic conditions, interest rates, and market news. When more people want to buy than sell, prices rise.",
        },
      },
      {
        "@type": "Question",
        name: "How can I actually buy stocks?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can buy stocks through a brokerage account (online or traditional). You place an order using different order types: market orders execute immediately at current price, limit orders execute at a specific price, and stop orders trigger at a certain level.",
        },
      },
      {
        "@type": "Question",
        name: "Is it better to pick individual stocks or invest in index funds?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For most beginners, index funds are recommended because they provide instant diversification, lower fees, and historically match market returns. Individual stock picking requires more research and carries higher risk.",
        },
      },
    ],
  },
];

export default function RootLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

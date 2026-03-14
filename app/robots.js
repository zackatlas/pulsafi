export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/widget", "/api/", "/dashboard"],
      },
    ],
    sitemap: [
      "https://pulsafi.com/sitemap/0.xml",
      "https://pulsafi.com/sitemap/1.xml",
      "https://pulsafi.com/sitemap/2.xml",
      "https://pulsafi.com/sitemap/3.xml",
      "https://pulsafi.com/sitemap/4.xml",
      "https://pulsafi.com/sitemap/5.xml",
      "https://pulsafi.com/sitemap/6.xml",
    ],
  };
}

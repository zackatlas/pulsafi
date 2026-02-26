export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/widget"],
      },
    ],
    sitemap: "https://pulsafi.com/sitemap.xml",
  };
}

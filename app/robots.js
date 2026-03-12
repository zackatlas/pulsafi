export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/widget", "/api/", "/dashboard"],
      },
    ],
    sitemap: "https://pulsafi.com/sitemap.xml",
  };
}

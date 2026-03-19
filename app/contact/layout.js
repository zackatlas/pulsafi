export const metadata = {
  title: 'Contact Pulsafi — Get in Touch',
  description: 'Have a question about our financial calculators? Contact our team. We typically respond within 24-48 hours. Reach out for support, partnerships, or press inquiries.',
  openGraph: {
    title: 'Contact Pulsafi',
    description: 'Contact our team for support, partnerships, or press inquiries. Response time: 24-48 hours.',
    url: 'https://pulsafi.com/contact',
  },
}

export default function Layout({ children }) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "Organization",
              "name": "Pulsafi",
              "url": "https://pulsafi.com",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "contactType": "General Support",
                  "email": "hello@pulsafi.com",
                  "responseTime": "PT24H"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "Partnership Inquiry",
                  "email": "partners@pulsafi.com",
                  "responseTime": "PT48H"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "Press",
                  "email": "press@pulsafi.com",
                  "responseTime": "PT48H"
                },
                {
                  "@type": "ContactPoint",
                  "contactType": "Support",
                  "email": "support@pulsafi.com",
                  "responseTime": "PT48H"
                }
              ]
            }
          })
        }}
      />
    </>
  );
}

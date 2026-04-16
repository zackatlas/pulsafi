import glossaryData from "../glossaryData";

export async function generateMetadata({ params }) {
  const { term } = params;
  const termData = glossaryData[term];

  if (!termData) {
    return {
      title: "Term Not Found — Pulsafi",
      description: "This glossary term does not exist.",
    };
  }

  return {
    title: `${termData.name} — Financial Glossary | Pulsafi`,
    description: termData.definition,
    openGraph: {
      title: `${termData.name} — Pulsafi Financial Glossary`,
      description: termData.definition.substring(0, 155),
      url: `https://www.pulsafi.com/glossary/${term}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            termData.name
          )}&subtitle=Financial+Term+Explained&type=default`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default function Layout({ children, params }) {
  const { term } = params;
  const termData = glossaryData[term];

  if (!termData) {
    return children;
  }

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: termData.name,
    description: termData.definition,
    url: `https://www.pulsafi.com/glossary/${term}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Pulsafi Financial Glossary",
      url: "https://www.pulsafi.com/glossary",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.pulsafi.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Glossary",
        item: "https://www.pulsafi.com/glossary",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: termData.name,
        item: `https://www.pulsafi.com/glossary/${term}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {children}
    </>
  );
}

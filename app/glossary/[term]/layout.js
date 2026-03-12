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
      url: `https://pulsafi.com/glossary/${term}`,
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

export default function Layout({ children }) {
  return children;
}

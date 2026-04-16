import { notFound } from 'next/navigation';
import EmergencyFundClient from './EmergencyFundClient';

const SALARIES = [30000, 40000, 50000, 60000, 75000, 80000, 100000, 120000, 150000];
const FAMILY_TYPES = [
  { id: 'single', label: 'Single', expensePercent: 0.5 },
  { id: 'couple', label: 'Couple', expensePercent: 0.6 },
  { id: 'family-of-3', label: 'Family of 3', expensePercent: 0.65 },
  { id: 'family-of-4', label: 'Family of 4', expensePercent: 0.7 },
  { id: 'family-of-5', label: 'Family of 5', expensePercent: 0.75 }
];

function parseSlug(slug) {
  const parts = slug.split('-');
  const salary = parseInt(parts[0], 10);
  const familyType = parts.slice(2).join('-');

  if (!SALARIES.includes(salary) || !FAMILY_TYPES.find(f => f.id === familyType)) {
    return null;
  }

  return { salary, familyType };
}

function getFamilyLabel(familyType) {
  return FAMILY_TYPES.find(f => f.id === familyType)?.label || '';
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

export async function generateStaticParams() {
  const params = [];
  for (const salary of SALARIES) {
    for (const familyType of FAMILY_TYPES) {
      params.push({
        slug: `${salary}-salary-${familyType.id}`
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const parsed = parseSlug(params.slug);
  if (!parsed) return { title: 'Not Found' };

  const familyLabel = getFamilyLabel(parsed.familyType);
  const salaryFormatted = formatCurrency(parsed.salary);

  return {
    title: `Emergency Fund Calculator for ${salaryFormatted} Salary (${familyLabel}) | PulsaFi`,
    description: `Calculate your ideal emergency fund based on a ${salaryFormatted} annual salary for ${familyLabel}. See 3, 6, 9, and 12-month fund targets.`,
    alternates: {
      canonical: `/emergency-fund/${params.slug}`,
    },
    openGraph: {
      title: `Emergency Fund Calculator for ${salaryFormatted} (${familyLabel})`,
      description: `Build your emergency fund with our salary-based calculator. Personalized targets for ${familyLabel}.`
    }
  };
}

export default function Page({ params }) {
  const parsed = parseSlug(params.slug);

  // Return a real 404 (via notFound) rather than rendering a 200 page with
  // "Page not found" text. Google treats soft 404s as indexable, which
  // pollutes the index with dead URLs.
  if (!parsed) {
    notFound();
  }

  return (
    <EmergencyFundClient
      salary={parsed.salary}
      familyType={parsed.familyType}
      slug={params.slug}
    />
  );
}

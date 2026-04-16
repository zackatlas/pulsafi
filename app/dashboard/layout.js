export const metadata = {
  title: "My Finances — Budget, Net Worth & Spending | Pulsafi",
  description: "Free personal finance dashboard. Build your budget, track net worth, import bank statements, and visualize your money — all private, all on your device.",
  openGraph: {
    title: "My Finances — Budget, Net Worth & Spending | Pulsafi",
    description: "Free personal finance dashboard. Build your budget, track net worth, and import bank statements. 100% private.",
    url: "https://www.pulsafi.com/dashboard",
    images: [{ url: '/api/og?title=My+Finances&subtitle=Budget%2C+Net+Worth+%26+Spending&type=tool', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/api/og?title=My+Finances&subtitle=Budget%2C+Net+Worth+%26+Spending&type=tool'],
  },
};

export default function DashboardLayout({ children }) {
  return children;
}

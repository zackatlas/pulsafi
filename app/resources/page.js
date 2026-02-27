"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CATEGORIES = ["All", "Investing", "Budgeting", "Retirement", "Debt", "Real Estate"];

const ARTICLES = [
  {
    id: 1,
    title: "The Power of Compound Interest: Why Starting Early Changes Everything",
    excerpt: "A 25-year-old investing $300/month will have more at 65 than a 35-year-old investing $600/month. Here's why the math is so ruthless — and how to use it in your favor.",
    category: "Investing",
    readTime: "6 min read",
    date: "Feb 20, 2026",
    featured: true,
    slug: "compound-interest-power-starting-early",
  },
  {
    id: 2,
    title: "The 50/30/20 Budget Rule Is Wrong — Here's What Actually Works",
    excerpt: "The most popular budgeting rule oversimplifies your finances. We break down a framework that adapts to your income level, debt load, and goals.",
    category: "Budgeting",
    readTime: "8 min read",
    date: "Feb 17, 2026",
    featured: true,
    slug: "50-30-20-budget-rule-wrong",
  },
  {
    id: 3,
    title: "FIRE Movement 2026: What's Changed and What Still Works",
    excerpt: "With higher interest rates and shifting markets, the Financial Independence Retire Early playbook needs an update. Here's the modern approach.",
    category: "Retirement",
    readTime: "10 min read",
    date: "Feb 14, 2026",
    featured: false,
    slug: "fire-movement-2026",
  },
  {
    id: 4,
    title: "Debt Avalanche vs. Debt Snowball: Which Strategy Saves More Money?",
    excerpt: "We ran the numbers on both strategies across 50 different debt scenarios. The winner isn't always what you'd expect.",
    category: "Debt",
    readTime: "7 min read",
    date: "Feb 10, 2026",
    featured: false,
    slug: "debt-avalanche-vs-snowball",
  },
  {
    id: 5,
    title: "How Much House Can You Actually Afford? (Not What the Bank Says)",
    excerpt: "Lenders will approve you for far more than you should spend. Here's a realistic framework based on your full financial picture, not just your income.",
    category: "Real Estate",
    readTime: "9 min read",
    date: "Feb 7, 2026",
    featured: false,
    slug: "how-much-house-can-you-afford",
  },
  {
    id: 6,
    title: "Index Funds vs. ETFs in 2026: The Differences That Actually Matter",
    excerpt: "Tax efficiency, expense ratios, and trading flexibility — we cut through the noise and tell you which one fits your situation.",
    category: "Investing",
    readTime: "5 min read",
    date: "Feb 3, 2026",
    featured: false,
    slug: "index-funds-vs-etfs-2026",
  },
  {
    id: 7,
    title: "The Real Cost of Waiting: How One Year Delay Costs You $100K+",
    excerpt: "Procrastination is the most expensive habit in personal finance. We show you exactly how much each year of delay costs across investing, home buying, and retirement.",
    category: "Investing",
    readTime: "6 min read",
    date: "Jan 30, 2026",
    featured: false,
    slug: "real-cost-of-waiting",
  },
  {
    id: 8,
    title: "How to Build an Emergency Fund When You're Living Paycheck to Paycheck",
    excerpt: "Saving feels impossible when every dollar is spoken for. Here are 7 concrete strategies that real people have used to break the cycle.",
    category: "Budgeting",
    readTime: "7 min read",
    date: "Jan 27, 2026",
    featured: false,
    slug: "emergency-fund-paycheck-to-paycheck",
  },
  {
    id: 9,
    title: "401(k) vs. Roth IRA vs. Taxable Brokerage: Where Should Your Money Go?",
    excerpt: "The order you fund your accounts matters more than which stocks you pick. Here's the optimal sequence for most income levels.",
    category: "Retirement",
    readTime: "8 min read",
    date: "Jan 23, 2026",
    featured: false,
    slug: "401k-roth-ira-taxable-brokerage",
  },
];

function ArticleCard({ article, large }) {
  return (
    <a href={`/resources/${article.slug}`} style={{
      display: "block", textDecoration: "none", color: "inherit",
      background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)",
      padding: large ? "36px 32px" : "24px 22px",
      transition: "all 0.3s ease", cursor: "pointer",
    }}
      onMouseOver={e => {
        e.currentTarget.style.borderColor = "rgba(201,162,39,0.3)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.borderColor = "var(--border-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{
          fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em",
          color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
          background: "var(--accent-bg)", padding: "4px 10px", borderRadius: 6,
        }}>{article.category}</span>
        <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif" }}>{article.readTime}</span>
      </div>
      <h3 style={{
        fontSize: large ? 24 : 18, fontFamily: "'Playfair Display', serif", fontWeight: 700,
        color: "var(--text-primary)", margin: 0, lineHeight: 1.3, letterSpacing: "-0.01em",
      }}>{article.title}</h3>
      <p style={{
        fontSize: 14, color: "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
        marginTop: 10, lineHeight: 1.6, margin: "10px 0 0",
      }}>{article.excerpt}</p>
      <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, color: "var(--text-faint)", fontFamily: "'DM Sans', sans-serif" }}>{article.date}</span>
        <span style={{ fontSize: 13, color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Read article →</span>
      </div>
    </a>
  );
}

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? ARTICLES : ARTICLES.filter(a => a.category === activeCategory);
  const featured = ARTICLES.filter(a => a.featured);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      <Header />

      {/* Hero */}
      <section style={{
        padding: "60px 24px 40px", textAlign: "center",
        background: "var(--hero-gradient)",
      }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>
          The Pulsafi Blog
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900,
          margin: 0, lineHeight: 1.15, letterSpacing: "-0.02em",
        }}>
          Learn to Build <span style={{ color: "var(--accent)" }}>Real Wealth</span>
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 16, margin: "16px auto 0", maxWidth: 500, lineHeight: 1.6 }}>
          Actionable guides, deep dives, and no-BS financial education. Updated weekly.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 60px" }}>

        {/* Featured Articles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16, marginBottom: 40 }}>
          {featured.map(article => (
            <ArticleCard key={article.id} article={article} large />
          ))}
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              background: activeCategory === cat ? "var(--accent-bg)" : "var(--bg-card)",
              border: activeCategory === cat ? "1px solid var(--accent-border)" : "1px solid var(--border-card)",
              borderRadius: 8, padding: "8px 16px", cursor: "pointer",
              color: activeCategory === cat ? "var(--accent)" : "var(--text-secondary)",
              fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
              transition: "all 0.2s ease",
            }}>{cat}</button>
          ))}
        </div>

        {/* Article Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Newsletter CTA */}
        <div style={{
          marginTop: 48, background: "linear-gradient(135deg, var(--bg-input) 0%, var(--bg-card) 100%)",
          border: "1px solid var(--border-input)", borderRadius: 18, padding: "36px 32px", textAlign: "center",
        }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent)", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>Never Miss a Post</div>
          <h3 style={{ fontSize: 22, color: "var(--text-primary)", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0 }}>
            Get new articles delivered to your inbox
          </h3>
          <p style={{ color: "var(--text-muted)", fontSize: 14, margin: "10px 0 20px", lineHeight: 1.6 }}>
            Subscribe for free. No spam, ever.
          </p>
          <a href="/newsletter" style={{
            display: "inline-block", background: "linear-gradient(135deg, var(--accent), var(--accent-dark))", borderRadius: 10,
            padding: "12px 32px", color: "var(--bg-main)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
            fontSize: 14, textDecoration: "none",
          }}>Subscribe Now →</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

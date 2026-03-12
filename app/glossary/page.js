"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const glossaryTerms = [
  { name: "Compound Interest", slug: "compound-interest" },
  { name: "APR (Annual Percentage Rate)", slug: "apr" },
  { name: "APY (Annual Percentage Yield)", slug: "apy" },
  { name: "401(k)", slug: "401k" },
  { name: "Roth IRA", slug: "roth-ira" },
  { name: "ETF (Exchange-Traded Fund)", slug: "etf" },
  { name: "Index Fund", slug: "index-fund" },
  { name: "FIRE (Financial Independence, Retire Early)", slug: "fire" },
  { name: "Net Worth", slug: "net-worth" },
  { name: "Debt-to-Income Ratio (DTI)", slug: "debt-to-income-ratio" },
  { name: "Emergency Fund", slug: "emergency-fund" },
  { name: "Dollar-Cost Averaging", slug: "dollar-cost-averaging" },
  { name: "Amortization", slug: "amortization" },
  { name: "Capital Gains", slug: "capital-gains" },
  { name: "Diversification", slug: "diversification" },
  { name: "Inflation", slug: "inflation" },
  { name: "Liquidity", slug: "liquidity" },
  { name: "Mortgage", slug: "mortgage" },
  { name: "Principal", slug: "principal" },
  { name: "Interest Rate", slug: "interest-rate" },
  { name: "Credit Score", slug: "credit-score" },
  { name: "Asset Allocation", slug: "asset-allocation" },
  { name: "Bond", slug: "bond" },
  { name: "Dividend", slug: "dividend" },
  { name: "Expense Ratio", slug: "expense-ratio" },
  { name: "FICO Score", slug: "fico-score" },
  { name: "HSA (Health Savings Account)", slug: "hsa" },
  { name: "Tax Bracket", slug: "tax-bracket" },
  { name: "Yield", slug: "yield" },
  { name: "Sinking Fund", slug: "sinking-fund" },
  { name: "Risk Tolerance", slug: "risk-tolerance" },
  { name: "Volatility", slug: "volatility" },
  { name: "Mutual Fund", slug: "mutual-fund" },
  { name: "Bear Market", slug: "bear-market" },
  { name: "Bull Market", slug: "bull-market" },
  { name: "Tax-Loss Harvesting", slug: "tax-loss-harvesting" },
  { name: "CAGR (Compound Annual Growth Rate)", slug: "compound-annual-growth-rate" },
  { name: "Down Payment", slug: "down-payment" },
  { name: "Refinance", slug: "refinance" },
  { name: "529 Plan", slug: "529-plan" },
  { name: "Cost of Living", slug: "cost-of-living" },
  { name: "Passive Income", slug: "passive-income" },
  { name: "Dollar-Weighted Return", slug: "dollar-weighted-return" },
  { name: "P/E Ratio (Price-to-Earnings)", slug: "p-e-ratio" },
  { name: "REIT (Real Estate Investment Trust)", slug: "real-estate-investment-trust" },
  { name: "Tax-Deferred", slug: "tax-deferred" },
  { name: "W-2", slug: "w-2" },
  { name: "High-Yield Savings Account", slug: "high-yield-savings" },
  { name: "Rule of 72", slug: "rule-of-72" },
  { name: "Budget", slug: "budget" },
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((term) =>
      term.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const groupedTerms = useMemo(() => {
    const groups = {};
    filteredTerms.forEach((term) => {
      const firstLetter = term.name[0].toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(term);
    });
    return groups;
  }, [filteredTerms]);

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <>
      <Header />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "60px 16px 0" }}>
        {/* Hero Section */}
        <section style={{ marginBottom: 60 }}>
          <h1
            style={{
              fontSize: 48,
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              marginBottom: 16,
              color: "var(--text-primary)",
            }}
          >
            Financial Glossary
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "var(--text-secondary)",
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Clear, jargon-free definitions of 50+ financial terms. Built to help you understand investing, retirement, debt, and everything in between.
          </p>

          {/* Search Input */}
          <div
            style={{
              position: "relative",
              marginBottom: 40,
            }}
          >
            <input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: 16,
                fontFamily: "'DM Sans', sans-serif",
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: 8,
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border-card)";
              }}
            />
          </div>
        </section>

        {/* Terms List */}
        {filteredTerms.length === 0 ? (
          <div
            style={{
              padding: "60px 16px",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <p style={{ fontSize: 16 }}>
              No terms found. Try a different search.
            </p>
          </div>
        ) : (
          sortedLetters.map((letter) => (
            <section key={letter} style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "var(--accent)",
                  marginBottom: 20,
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {letter}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: 16,
                }}
              >
                {groupedTerms[letter].map((term) => (
                  <Link
                    key={term.slug}
                    href={`/glossary/${term.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        padding: 20,
                        backgroundColor: "var(--bg-card)",
                        border: "1px solid var(--border-card)",
                        borderRadius: 8,
                        cursor: "pointer",
                        transition:
                          "all 0.2s, border-color 0.2s, background-color 0.2s",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(201, 162, 39, 0.08)";
                        e.currentTarget.style.borderColor = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--bg-card)";
                        e.currentTarget.style.borderColor = "var(--border-card)";
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          marginBottom: 8,
                        }}
                      >
                        {term.name}
                      </h3>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-muted)",
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        Learn more →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}

"use client";
import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

function Input({ label, value, onChange, prefix, suffix, sublabel }) {
  const [display, setDisplay] = useState(String(value));
  const [focused, setFocused] = useState(false);
  const shown = focused ? display : String(value);
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}{sublabel && <span style={{ textTransform: "none", letterSpacing: 0, opacity: 0.6, marginLeft: 6, fontSize: 11 }}>{sublabel}</span>}
      </label>
      <div style={{ display: "flex", alignItems: "center", background: "var(--bg-input)", borderRadius: 10, border: "1px solid var(--border-input)", padding: "10px 14px", gap: 6 }}>
        {prefix && <span style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: 15, fontWeight: 500 }}>{prefix}</span>}
        <input type="text" inputMode="decimal" value={shown}
          onFocus={() => { setFocused(true); setDisplay(value === 0 ? "" : String(value)); }}
          onChange={(e) => { const raw = e.target.value; if (raw === "" || raw === "-" || raw === ".") { setDisplay(raw); onChange(0); return; } const num = Number(raw); if (!isNaN(num)) { setDisplay(raw); onChange(num); } }}
          onBlur={() => setFocused(false)}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--text-primary)", fontSize: 16, fontFamily: "'DM Mono', monospace", fontWeight: 500, width: "100%" }}
        />
        {suffix && <span style={{ color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>{suffix}</span>}
      </div>
    </div>
  );
}

const PRESETS = [
  { label: "Daily Coffee", cost: 6, frequency: "daily", emoji: "☕" },
  { label: "Streaming Services", cost: 55, frequency: "monthly", emoji: "📺" },
  { label: "Luxury Purse", cost: 500, frequency: "once", emoji: "👜" },
  { label: "New iPhone", cost: 1200, frequency: "once", emoji: "📱" },
  { label: "Eating Out Weekly", cost: 60, frequency: "weekly", emoji: "🍽️" },
  { label: "New Car Payment", cost: 600, frequency: "monthly", emoji: "🚗" },
  { label: "Designer Shoes", cost: 350, frequency: "once", emoji: "👟" },
  { label: "Gym Membership", cost: 50, frequency: "monthly", emoji: "💪" },
];

export default function OpportunityCostPage() {
  const [cost, setCost] = useState(500);
  const [frequency, setFrequency] = useState("once");
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(10);
  const [itemName, setItemName] = useState("That Purchase");

  // Calculate annual cost based on frequency
  const annualCost = frequency === "once" ? cost :
    frequency === "daily" ? cost * 365 :
    frequency === "weekly" ? cost * 52 :
    cost * 12; // monthly

  const r = rate / 100;

  // One-time opportunity cost
  const oneTimeFV = cost * Math.pow(1 + r, years);

  // Recurring opportunity cost (annual contributions invested)
  const recurringFV = frequency === "once" ? oneTimeFV :
    annualCost * ((Math.pow(1 + r, years) - 1) / r);

  const totalSpent = frequency === "once" ? cost : annualCost * years;
  const opportunityCost = recurringFV - totalSpent;
  const multiplier = recurringFV / totalSpent;

  // Timeline data
  const timeline = [];
  for (let y = 0; y <= years; y++) {
    const spent = frequency === "once" ? cost : annualCost * y;
    const invested = frequency === "once" ? cost * Math.pow(1 + r, y) :
      annualCost * ((Math.pow(1 + r, y) - 1) / r);
    timeline.push({ year: y, spent, invested: Math.max(0, invested) });
  }

  // Fun comparisons
  const comparisons = [
    { emoji: "🌮", label: "tacos", unitCost: 3, count: Math.floor(recurringFV / 3) },
    { emoji: "✈️", label: "flights to Europe", unitCost: 800, count: Math.floor(recurringFV / 800) },
    { emoji: "📱", label: "iPhones", unitCost: 1200, count: Math.floor(recurringFV / 1200) },
    { emoji: "🏠", label: "% of a home down payment", unitCost: 60000, count: Math.floor((recurringFV / 60000) * 100) },
  ];

  const applyPreset = (p) => {
    setCost(p.cost);
    setFrequency(p.frequency);
    setItemName(p.label);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Pulsafi Opportunity Cost Calculator",
        "url": "https://pulsafi.com/tools/opportunity-cost-calculator",
        "description": "See what your purchases really cost. Calculate the future value of any expense if invested instead.",
        "applicationCategory": "FinanceApplication", "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      })}} />
      <Header />

      <section style={{ padding: "60px 24px 40px", textAlign: "center", background: "var(--hero-gradient)" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: 14, fontWeight: 600 }}>Free Tool</div>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Opportunity Cost Calculator
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: 15, maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          What would that $500 purse be worth in 10 years if you invested it instead? See the true cost of every purchase in future dollars.
        </p>
      </section>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px 60px" }}>
        <div style={{ background: "var(--bg-card)", borderRadius: 20, border: "1px solid var(--border-card)", padding: "28px", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" }}>

          {/* Quick Presets */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.04em" }}>Quick Examples</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PRESETS.map((p, i) => (
                <button key={i} onClick={() => applyPreset(p)} style={{
                  padding: "8px 14px", borderRadius: 10, cursor: "pointer", fontSize: 12, fontWeight: 500,
                  background: itemName === p.label ? "var(--accent-bg)" : "var(--bg-input)",
                  border: itemName === p.label ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                  color: itemName === p.label ? "var(--accent)" : "var(--text-secondary)",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", whiteSpace: "nowrap",
                }}>
                  {p.emoji} {p.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Input label="Cost" value={cost} onChange={setCost} prefix="$" />
            <div>
              <label style={{ display: "block", fontSize: 12, color: "var(--text-secondary)", marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>Frequency</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[
                  { id: "once", label: "One-time" },
                  { id: "daily", label: "Daily" },
                  { id: "weekly", label: "Weekly" },
                  { id: "monthly", label: "Monthly" },
                ].map(f => (
                  <button key={f.id} onClick={() => setFrequency(f.id)} style={{
                    flex: 1, padding: "10px 6px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600, textAlign: "center",
                    background: frequency === f.id ? "var(--accent-bg)" : "var(--bg-input)",
                    border: frequency === f.id ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
                    color: frequency === f.id ? "var(--accent)" : "var(--text-muted)", fontFamily: "'DM Sans', sans-serif",
                  }}>{f.label}</button>
                ))}
              </div>
            </div>
            <Input label="Time Horizon" value={years} onChange={setYears} suffix="years" />
            <Input label="Expected Return" value={rate} onChange={setRate} suffix="%" sublabel="S&P 500 avg ≈ 10%" />
          </div>

          {/* Big Result */}
          <div style={{
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)",
            borderRadius: 18, padding: "32px", textAlign: "center", marginTop: 20,
          }}>
            <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(0,0,0,0.5)", marginBottom: 8 }}>
              {itemName} → Invested for {years} years
            </div>
            <div style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 900, color: "#0d0f13", fontFamily: "'DM Mono', monospace", letterSpacing: "-0.03em" }}>
              {fmt(recurringFV)}
            </div>
            <div style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", marginTop: 8 }}>
              You spend {fmt(totalSpent)} → it could have been worth <strong style={{ color: "#0d0f13" }}>{multiplier.toFixed(1)}x</strong> more
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 140, background: "var(--bg-input)", borderRadius: 14, padding: "18px", border: "1px solid var(--border-input)", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Spent</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#e74c3c", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>{fmt(totalSpent)}</div>
            </div>
            <div style={{ flex: 1, minWidth: 140, background: "var(--bg-input)", borderRadius: 14, padding: "18px", border: "1px solid var(--border-input)", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Opportunity Cost</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>{fmt(opportunityCost)}</div>
            </div>
            <div style={{ flex: 1, minWidth: 140, background: "var(--bg-input)", borderRadius: 14, padding: "18px", border: "1px solid var(--border-input)", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.04em" }}>Growth Multiple</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text-primary)", fontFamily: "'DM Mono', monospace", marginTop: 4 }}>{multiplier.toFixed(1)}x</div>
            </div>
          </div>

          {/* "What that money could buy" */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>What {fmt(recurringFV)} Could Buy Instead</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
              {comparisons.filter(c => c.count > 0).map((c, i) => (
                <div key={i} style={{
                  background: "var(--bg-input)", borderRadius: 12, padding: "16px 12px",
                  border: "1px solid var(--border-input)", textAlign: "center",
                }}>
                  <div style={{ fontSize: 28 }}>{c.emoji}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)", fontFamily: "'DM Mono', monospace", margin: "6px 0" }}>
                    {c.count.toLocaleString()}{c.label.includes("%") ? "%" : ""}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Timeline */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12 }}>Growth Over Time</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
              {timeline.filter((_, i) => i % Math.max(1, Math.ceil(timeline.length / 20)) === 0 || i === timeline.length - 1).map((d, i) => {
                const maxV = recurringFV;
                const spentH = (d.spent / maxV) * 100;
                const gainH = Math.max(0, ((d.invested - d.spent) / maxV) * 100);
                return (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <div style={{ width: "100%", maxWidth: 22, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 100 }}>
                      <div style={{ height: `${gainH}%`, background: "var(--accent)", borderRadius: "3px 3px 0 0", minHeight: gainH > 0 ? 1 : 0 }} />
                      <div style={{ height: `${spentH}%`, background: "#e74c3c", opacity: 0.4, minHeight: d.spent > 0 ? 1 : 0 }} />
                    </div>
                    <div style={{ fontSize: 8, color: "var(--text-faint)" }}>Y{d.year}</div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8, justifyContent: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "#e74c3c", opacity: 0.4 }} /> Amount Spent
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--text-muted)" }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent)" }} /> Investment Growth
              </div>
            </div>
          </div>

          {/* Share / Social */}
          <div style={{
            marginTop: 24, textAlign: "center", background: "var(--bg-input)", borderRadius: 14,
            padding: "20px", border: "1px solid var(--border-input)",
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>Mind blown? Share it.</div>
            <button onClick={() => {
              const text = `That ${itemName} (${fmt(cost)}${frequency !== "once" ? "/" + frequency.slice(0, -2) : ""}) would be worth ${fmt(recurringFV)} in ${years} years if invested. 🤯 Check your own: pulsafi.com/tools/opportunity-cost-calculator`;
              navigator.clipboard?.writeText(text);
            }} style={{
              padding: "10px 20px", borderRadius: 10, border: "1px solid var(--border-card)",
              background: "var(--bg-card)", cursor: "pointer", fontSize: 13, fontWeight: 600,
              color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif", marginRight: 10,
            }}>📋 Copy</button>
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`That ${itemName} (${fmt(cost)}) would be worth ${fmt(recurringFV)} in ${years} years if invested. 🤯 Check yours: pulsafi.com/tools/opportunity-cost-calculator`)}`}
              target="_blank" rel="noopener" style={{
              padding: "10px 20px", borderRadius: 10, textDecoration: "none",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              fontSize: 13, fontWeight: 700, color: "#0d0f13", fontFamily: "'DM Sans', sans-serif",
            }}>Share on X →</a>
          </div>
        </div>

        {/* SEO Content */}
        <div style={{ marginTop: 48, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, marginBottom: 16 }}>What Is Opportunity Cost?</h2>
          <div style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.85 }}>
            <p style={{ marginBottom: 16 }}>Opportunity cost is the value of what you give up when you choose one thing over another. When you spend $500 on a purchase, the opportunity cost isn't just $500 — it's the $500 plus all the growth that money could have generated if invested instead. Over time, this difference is enormous.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>The latte factor is real (but also overblown)</h3>
            <p style={{ marginBottom: 16 }}>A $6 daily coffee habit costs $2,190 per year. Invested at 10% for 20 years, that's over $137,000. That's real money. But here's the nuance: if that coffee brings you genuine joy and you're already saving 20%+ of your income, it might be worth it. The point isn't to never spend — it's to spend intentionally by understanding the true cost.</p>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: "28px 0 10px" }}>Big purchases vs recurring expenses</h3>
            <p style={{ marginBottom: 16 }}>One-time purchases get all the guilt, but recurring expenses are where the real money hides. A $600/month car payment over 5 years costs $36,000 — but the opportunity cost is closer to $46,000 when you factor in lost investment returns. That extra $10,000 is invisible but very real.</p>
          </div>
          <div style={{ marginTop: 40, padding: "24px", background: "var(--bg-card)", borderRadius: 16, border: "1px solid var(--border-card)" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 14 }}>Related</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { name: "Compound Interest Calculator", href: "/tools/compound-interest-calculator", icon: "📈" },
                { name: "Investment Comparison", href: "/tools/investment-comparison", icon: "📊" },
                { name: "Money Personality Quiz", href: "/quiz", icon: "💰" },
              ].map((t, i) => (
                <a key={i} href={t.href} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "var(--bg-input)", borderRadius: 8, border: "1px solid var(--border-input)", textDecoration: "none", color: "var(--text-secondary)", fontSize: 13 }}>{t.icon} {t.name}</a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

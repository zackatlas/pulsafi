import Header from "../components/Header";
import Footer from "../components/Footer";
import { getRates, formatRateDate } from "../../lib/fredRates";
import { loadMarket } from "../../lib/marketData";
import { buildInsights, fmtPct, fmtBp, fmtMove, fmtLevel, fmtNum, fmtUsd, fmtSignedUsd, shortDate } from "../../lib/marketInsights";
import { Sparkline, RangeMeter, MoveHistogram, SectorBars } from "./charts";

// Revalidate every 5 minutes. Next.js serves the cached HTML until the window
// closes, then the next request triggers a background refresh, so a market-hours
// visitor never sees prices much more than 5 minutes old. Refreshes only happen
// on traffic, which keeps us well within rate limits on the upstream APIs.
// Keep in sync with REVALIDATE_SECONDS in lib/marketData.js (this must be a literal).
export const revalidate = 300;

const URL = "https://www.pulsafi.com/market-today";

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/New_York" });
}

function longDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZoneName: "short", timeZone: "America/New_York" });
}

async function loadPage() {
  const [market, rates] = await Promise.all([loadMarket(), getRates()]);
  return { market, rates, insights: buildInsights(market, rates) };
}

export async function generateMetadata() {
  const today = todayLabel();
  let description = `What moved in markets on ${today}, how unusual it was, and what it means for your money. S&P 500, Treasury yields, mortgage rates, sectors and crypto, updated every 5 minutes.`;
  try {
    const { market, insights } = await loadPage();
    const { spx, t10y } = market.series;
    const bits = [spx && `S&P 500 ${fmtPct(spx.move)}`, t10y && `10-year yield ${fmtNum(t10y.last, 2)}%`].filter(Boolean).join(", ");
    if (spx) description = `${insights.headline}. ${bits}. What moved, how unusual it was, and what it means for your money. Updated every 5 minutes.`;
  } catch {
    // Metadata never blocks the page; the generic description is fine.
  }

  return {
    title: `Today's Market Pulse — ${today}`,
    description,
    keywords: [
      "market today",
      "stock market today",
      "why is the stock market down today",
      "treasury yields today",
      "bitcoin price today",
      "S&P 500 today",
      "mortgage rates today",
    ],
    alternates: { canonical: "/market-today" },
    openGraph: {
      title: `Today's Market Pulse — ${today}`,
      description,
      type: "website",
      url: URL,
      images: [
        {
          url: `/api/og?title=Today%27s+Market+Pulse&subtitle=${encodeURIComponent(today)}&type=default`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Today's Market Pulse — ${today}`,
      description,
    },
  };
}

// Story sentences mark key numbers with **bold**.
function Rich({ text }) {
  return text.split("**").map((part, i) => (i % 2 ? <strong key={i} style={{ color: "#fff" }}>{part}</strong> : part));
}

// Day-change cell. Prices get green/red; yields and the VIX stay neutral
// because "up" isn't simply good or bad there. The arrow and sign always carry direction.
function Change({ s, v, colored = true, strong = false }) {
  if (v == null || !Number.isFinite(v)) return <span style={{ color: "var(--text-faint)" }}>—</span>;
  const tint = colored && s.kind !== "yield" && s.key !== "vix";
  const rounded = s.kind === "yield" ? Math.round(v) : Number(v.toFixed(2));
  const color = !tint || rounded === 0 ? "var(--text-secondary)" : rounded > 0 ? "var(--mt-up)" : "var(--mt-down)";
  const arrow = rounded > 0 ? "▲" : rounded < 0 ? "▼" : "";
  return (
    <span style={{ color, fontWeight: strong ? 600 : 500, whiteSpace: "nowrap" }}>
      {arrow && <span aria-hidden="true" style={{ fontSize: "0.75em", marginRight: 3 }}>{arrow}</span>}
      {fmtMove(s, v)}
    </span>
  );
}

const card = { background: "var(--bg-card)", border: "1px solid var(--border-card)", borderRadius: 12, padding: 20 };
const h2 = { fontSize: 22, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 6px", color: "var(--text-primary)" };
const lede = { fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, margin: "0 0 16px" };
const kicker = { fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mt-accent)", marginBottom: 6 };
const link = { color: "var(--mt-accent)", fontWeight: 600, textDecoration: "none" };

const TABLE_GROUPS = [
  { title: "Stocks", keys: ["spx", "dji", "ixic", "rut", "vix"] },
  { title: "Treasury yields", keys: ["t3m", "t10y", "t30y"] },
  { title: "Commodities & dollar", keys: ["gold", "oil", "usd"] },
  { title: "Crypto", keys: ["btc", "eth"] },
];

export default async function MarketTodayPage() {
  const { market, rates, insights } = await loadPage();
  const { series } = market;
  const { spx, ixic, dji, t10y, btc } = series;
  const hasMarket = Object.values(series).some(Boolean);
  const open = spx?.sessionOpen ?? false;
  const sessionLine = spx
    ? open
      ? `Intraday · ${longDate(spx.date)} · prices as of ${formatTime(new Date(spx.marketTime * 1000).toISOString())}`
      : `Latest close · ${longDate(spx.date)}`
    : null;
  const lastUpdated = formatTime(market.fetchedAt);
  const { money } = insights;

  const glance = [
    spx && { s: spx, label: "S&P 500" },
    ixic && { s: ixic, label: "Nasdaq" },
    dji && { s: dji, label: "Dow" },
    t10y && { s: t10y, label: "10-yr yield" },
    btc && { s: btc, label: "Bitcoin" },
  ].filter(Boolean);

  const rateRows = [
    { label: "30-year fixed mortgage", r: rates.mortgage30, use: "Home purchase loans" },
    { label: "15-year fixed mortgage", r: rates.mortgage15, use: "Shorter home loans and refinances" },
    { label: "Fed funds (effective)", r: rates.fedFunds, use: "The Fed's policy rate; drives savings APYs" },
    { label: "Prime rate", r: rates.prime, use: "Base for HELOCs and credit cards" },
    { label: "1-year Treasury", r: rates.t1y, use: "Benchmark for CDs" },
    { label: "Avg. savings account (FDIC)", r: rates.savingsNatAvg, use: "What the typical bank pays" },
    { label: "Avg. 12-month CD (FDIC)", r: rates.cd12NatAvg, use: "National average, not the best available" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Today's Market Pulse — ${todayLabel()}`,
        headline: insights.headline,
        description: insights.story[0]?.replace(/\*\*/g, "") ?? "Daily snapshot of US stocks, Treasury yields, rates and crypto.",
        url: URL,
        datePublished: market.fetchedAt,
        dateModified: market.fetchedAt,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Pulsafi", item: "https://www.pulsafi.com" },
          { "@type": "ListItem", position: 2, name: "Market Today", item: URL },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <style>{`
        .mt { --mt-accent: #2563eb; --mt-up: #15803d; --mt-down: #dc2626; --mt-up-mark: #16a34a; --mt-down-mark: #dc2626;
              --mt-bar: #d4d2cc; --mt-spark: #9a9fa8; --mt-track: rgba(37,99,235,0.18); --mt-band: rgba(37,99,235,0.08); }
        [data-theme="dark"] .mt { --mt-accent: #3b82f6; --mt-up: #4ade80; --mt-down: #f87171; --mt-up-mark: #16a34a; --mt-down-mark: #ef4444;
              --mt-bar: #353842; --mt-spark: #6a6f78; --mt-track: rgba(59,130,246,0.28); --mt-band: rgba(59,130,246,0.12); }
        .mt a:hover { text-decoration: underline !important; }
        .mt-grid2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        .mt-grid3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        .mt-glance { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
        .mt-sector-row { display: grid; grid-template-columns: 170px minmax(0, 1fr); align-items: center; gap: 12px; }
        .mt-sector-label { font-size: 13px; color: var(--text-secondary); text-align: right; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mt-short { display: none; }
        .mt-table { width: 100%; border-collapse: collapse; font-size: 14px; }
        .mt-table th, .mt-table td { padding: 10px 8px; border-bottom: 1px solid var(--border-card); text-align: right; vertical-align: middle; }
        .mt-table th:first-child, .mt-table td:first-child { text-align: left; padding-left: 0; }
        .mt-table thead th { font-size: 11px; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
        .mt-table td { font-variant-numeric: tabular-nums; }
        .mt-table .mt-group th { text-align: left; font-size: 12px; font-weight: 700; color: var(--text-primary); padding-top: 18px; text-transform: none; letter-spacing: 0; }
        @media (max-width: 820px) {
          .mt-grid3 { grid-template-columns: minmax(0, 1fr); }
          .mt-glance { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .mt-hide-md { display: none; }
        }
        @media (max-width: 640px) {
          .mt-grid2 { grid-template-columns: minmax(0, 1fr); }
          .mt-glance { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .mt-sector-row { grid-template-columns: 112px minmax(0, 1fr); gap: 8px; }
          .mt-hide-sm { display: none; }
          .mt-long { display: none; }
          .mt-short { display: inline; }
          .mt-hero-h { font-size: 26px !important; }
        }
      `}</style>
      <div className="mt" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
        <Header />
        <main style={{ flex: 1, maxWidth: 960, margin: "0 auto", padding: "40px 16px", width: "100%", boxSizing: "border-box" }}>
          {/* Title */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
              <a href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</a>
              {" / "}
              <span>Market Today</span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "12px 0 6px" }}>
              Today&apos;s Market Pulse
            </h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", margin: 0 }}>
              {sessionLine ? <strong style={{ color: "var(--text-primary)" }}>{sessionLine}</strong> : <strong>{todayLabel()}</strong>}
              {" · "}Updated {lastUpdated}. What moved, how unusual it was, and what it means for your money.
            </p>
          </div>

          {/* The story */}
          <section aria-labelledby="mt-story" style={{ background: "linear-gradient(135deg, #1e3a5f, #2563eb)", borderRadius: 16, padding: "28px 28px 24px", color: "#fff", marginBottom: 32 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8 }}>The story today</span>
              {insights.mood && (
                <span title="Based on the VIX, which tracks expected stock market volatility over the next 30 days" style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)" }}>
                  Market mood: {insights.mood.label} · VIX {fmtNum(insights.mood.vix, 1)}
                </span>
              )}
            </div>
            <h2 id="mt-story" className="mt-hero-h" style={{ fontSize: 32, lineHeight: 1.2, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "0 0 14px", color: "#fff" }}>
              {insights.headline}
            </h2>
            {hasMarket ? (
              <div style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.88)", maxWidth: 760 }}>
                {insights.story.map((t, i) => <p key={i} style={{ margin: "0 0 8px" }}><Rich text={t} /></p>)}
              </div>
            ) : (
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "rgba(255,255,255,0.88)", margin: 0 }}>
                Live market quotes are temporarily unavailable. Benchmark borrowing and savings rates below are current.
              </p>
            )}
            {glance.length > 0 && (
              <div className="mt-glance" style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.18)" }}>
                {glance.map(({ s, label }) => {
                  const v = s.move;
                  const r = s.kind === "yield" ? Math.round(v) : Number(v.toFixed(2));
                  return (
                    <div key={s.key}>
                      <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{fmtLevel(s)}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.92 }}>
                        <span aria-hidden="true" style={{ fontSize: "0.75em", marginRight: 3 }}>{r > 0 ? "▲" : r < 0 ? "▼" : ""}</span>
                        {fmtMove(s, v)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* What stands out */}
          {insights.standouts.length > 0 && (
            <section aria-labelledby="mt-standouts" style={{ marginBottom: 36 }}>
              <h2 id="mt-standouts" style={h2}>What stands out</h2>
              <p style={lede}>The most unusual moves across markets right now, ranked by how far they are from normal.</p>
              <div className="mt-grid2">
                {insights.standouts.map((s) => (
                  <article key={s.id} style={{ ...card, display: "flex", flexDirection: "column" }}>
                    <div style={kicker}>{s.kicker}</div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, margin: "0 0 8px", lineHeight: 1.35, color: "var(--text-primary)" }}>{s.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0, flex: 1 }}>{s.body}</p>
                    {s.link && <a href={s.link.href} style={{ ...link, fontSize: 13, marginTop: 12 }}>{s.link.text} →</a>}
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* How today compares + sectors */}
          {(spx || insights.sectors) && (
            <div className="mt-grid2" style={{ marginBottom: 36, alignItems: "start" }}>
              {spx && (
                <section aria-labelledby="mt-normal" style={card}>
                  <h2 id="mt-normal" style={{ ...h2, fontSize: 19 }}>Is today&apos;s move normal?</h2>
                  <p style={lede}>
                    The S&amp;P 500&apos;s {fmtPct(spx.move)} move was {spx.movePercentile >= 0.5 ? "bigger" : "smaller"} than on{" "}
                    <strong style={{ color: "var(--text-primary)" }}>{Math.round((spx.movePercentile >= 0.5 ? spx.movePercentile : 1 - spx.movePercentile) * 100)}%</strong>{" "}
                    of trading days in the past year. A typical day moves it about ±{fmtNum(spx.sd, 1)}%.
                  </p>
                  <MoveHistogram moves={spx.moves} today={spx.move} sd={spx.sd} />
                </section>
              )}
              {insights.sectors && (
                <section aria-labelledby="mt-sectors" style={card}>
                  <h2 id="mt-sectors" style={{ ...h2, fontSize: 19 }}>Sectors: {insights.sectors.theme.toLowerCase()}</h2>
                  <p style={lede}>{insights.sectors.themeBody}</p>
                  <SectorBars rows={insights.sectors.sorted} />
                </section>
              )}
            </div>
          )}

          {/* Your money */}
          <section aria-labelledby="mt-money" style={{ marginBottom: 36 }}>
            <h2 id="mt-money" style={h2}>What it means for your money</h2>
            <p style={lede}>Today&apos;s numbers translated into dollars, using round example amounts.</p>
            <div className="mt-grid3">
              {money.invest && (
                <div style={card}>
                  <div style={kicker}>Investing</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.35 }}>{fmtUsd(money.invest.balance)} in an S&amp;P 500 index fund</h3>
                  <dl style={{ margin: 0, fontSize: 14 }}>
                    {money.invest.rows.map((r) => (
                      <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-card)" }}>
                        <dt style={{ color: "var(--text-secondary)" }}>{r.label}</dt>
                        <dd style={{ margin: 0, fontWeight: 600, fontVariantNumeric: "tabular-nums", color: r.v == null ? "var(--text-faint)" : r.v >= 0 ? "var(--mt-up)" : "var(--mt-down)" }}>{fmtSignedUsd(r.v)}</dd>
                      </div>
                    ))}
                  </dl>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)", margin: "12px 0 0" }}>
                    A typical day moves it by about ±{fmtUsd(money.invest.typicalDay)}. Price change only; dividends add a bit more.{" "}
                    <a href="/tools/compound-interest-calculator" style={link}>See the long-term view →</a>
                  </p>
                </div>
              )}
              {money.mortgage && (
                <div style={card}>
                  <div style={kicker}>Borrowing</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 4px", lineHeight: 1.35 }}>30-year mortgage: {fmtNum(money.mortgage.rate, 2)}%</h3>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>Freddie Mac weekly average, {formatRateDate(money.mortgage.date)}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", margin: 0 }}>
                    On a {fmtUsd(money.mortgage.loan)} loan that&apos;s <strong style={{ color: "var(--text-primary)" }}>{fmtUsd(money.mortgage.payment)}/mo</strong> in principal and interest
                    {money.mortgage.yearAgoDiff != null && (
                      <>, <strong style={{ color: "var(--text-primary)" }}>{fmtSignedUsd(money.mortgage.yearAgoDiff)}/mo</strong> vs. a year ago at {fmtNum(money.mortgage.yearAgoRate, 2)}%</>
                    )}.
                    {money.mortgage.outlook && <> {money.mortgage.outlook}</>}
                  </p>
                  <p style={{ fontSize: 13, margin: "12px 0 0" }}>
                    <a href="/tools/mortgage-calculator" style={link}>Mortgage calculator →</a>
                  </p>
                </div>
              )}
              {money.savings && (
                <div style={card}>
                  <div style={kicker}>Saving</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.35 }}>{fmtUsd(money.savings.balance)} in savings, for a year</h3>
                  <dl style={{ margin: 0, fontSize: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-card)" }}>
                      <dt style={{ color: "var(--text-secondary)" }}>Average bank ({fmtNum(money.savings.avgRate, 2)}%)</dt>
                      <dd style={{ margin: 0, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{fmtUsd(money.savings.avgEarns)}</dd>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid var(--border-card)" }}>
                      <dt style={{ color: "var(--text-secondary)" }}>Near T-bill rate ({fmtNum(money.savings.cashRate, 2)}%)</dt>
                      <dd style={{ margin: 0, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{fmtUsd(money.savings.cashEarns)}</dd>
                    </div>
                  </dl>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--text-secondary)", margin: "12px 0 0" }}>
                    {money.savings.realLossAvg != null && money.savings.realLossAvg > 0 && (
                      <>With inflation at {fmtNum(money.savings.cpi, 1)}%, the average account loses about {fmtUsd(money.savings.realLossAvg)} of buying power a year. </>
                    )}
                    Top high-yield accounts and money market funds usually pay close to the T-bill rate.{" "}
                    <a href="/best-savings-account/texas" style={link}>High-yield savings by state →</a>
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* The numbers */}
          {hasMarket && (
            <section aria-labelledby="mt-numbers" style={{ ...card, marginBottom: 24 }}>
              <h2 id="mt-numbers" style={h2}>All the numbers</h2>
              <p style={{ ...lede, marginBottom: 4 }}>
                Stock and commodity moves are in percent. Treasury yield moves are in basis points (1 bp = 0.01 percentage point). The range bar shows where each sits between its 52-week low and high.
              </p>
              <table className="mt-table">
                <caption style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Market indices, yields, commodities and crypto with daily, one-month and year-to-date changes</caption>
                <thead>
                  <tr>
                    <th scope="col">Market</th>
                    <th scope="col">Last</th>
                    <th scope="col">Day</th>
                    <th scope="col" className="mt-hide-sm">1 month</th>
                    <th scope="col" className="mt-hide-md">This year</th>
                    <th scope="col" className="mt-hide-md">52-week range</th>
                    <th scope="col" className="mt-hide-sm">3 months</th>
                  </tr>
                </thead>
                {TABLE_GROUPS.map((g) => {
                  const rows = g.keys.map((k) => series[k]).filter(Boolean);
                  if (!rows.length) return null;
                  return (
                    <tbody key={g.title}>
                      <tr className="mt-group"><th scope="rowgroup" colSpan={7}>{g.title}</th></tr>
                      {rows.map((s) => (
                        <tr key={s.key}>
                          <th scope="row" style={{ fontWeight: 400, textAlign: "left", paddingLeft: 0 }}>
                            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.label}</div>
                            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.note}</div>
                          </th>
                          <td style={{ fontWeight: 600 }}>{fmtLevel(s)}</td>
                          <td><Change s={s} v={s.move} strong /></td>
                          <td className="mt-hide-sm"><Change s={s} v={s.chg1m} colored={false} /></td>
                          <td className="mt-hide-md"><Change s={s} v={s.chgYtd} colored={false} /></td>
                          <td className="mt-hide-md">
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <RangeMeter pos={s.rangePos} label={`52-week range for ${s.label}: low ${s.kind === "yield" ? fmtNum(s.low52, 2) + "%" : fmtNum(s.low52, 2)} on ${shortDate(s.low52Date, s.date)}, high ${s.kind === "yield" ? fmtNum(s.high52, 2) + "%" : fmtNum(s.high52, 2)} on ${shortDate(s.high52Date, s.date)}`} />
                            </div>
                          </td>
                          <td className="mt-hide-sm">
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                              <Sparkline values={s.spark} label={`${s.label}, past 3 months: ${fmtMove(s, s.kind === "yield" ? (s.spark[s.spark.length - 1] - s.spark[0]) * 100 : ((s.spark[s.spark.length - 1] / s.spark[0]) - 1) * 100)}`} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  );
                })}
              </table>
            </section>
          )}

          {/* Borrowing & savings benchmarks */}
          <section aria-labelledby="mt-rates" style={{ ...card, marginBottom: 32 }}>
            <h2 id="mt-rates" style={h2}>Borrowing &amp; savings benchmarks</h2>
            <p style={{ ...lede, marginBottom: 4 }}>
              Official rates from the Federal Reserve Bank of St. Louis (FRED). Mortgages are Freddie Mac&apos;s weekly survey; the others update daily or monthly.
              CPI inflation is running {fmtNum(rates.cpiYoY.value, 1)}% year over year.
            </p>
            <table className="mt-table">
              <thead>
                <tr>
                  <th scope="col">Rate</th>
                  <th scope="col">Latest</th>
                  <th scope="col">Change</th>
                  <th scope="col" className="mt-hide-sm">Year ago</th>
                  <th scope="col" className="mt-hide-md" style={{ textAlign: "left" }}>What it affects</th>
                </tr>
              </thead>
              <tbody>
                {rateRows.map(({ label, r, use }) => {
                  const ch = r.change != null ? Math.round(r.change * 100) : null;
                  return (
                    <tr key={label}>
                      <th scope="row" style={{ fontWeight: 400, textAlign: "left", paddingLeft: 0 }}>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{label}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{formatRateDate(r.date)}</div>
                      </th>
                      <td style={{ fontWeight: 600 }}>{fmtNum(r.value, 2)}%</td>
                      <td style={{ color: "var(--text-secondary)" }}>
                        {ch == null ? "—" : <>{ch !== 0 && <span aria-hidden="true" style={{ fontSize: "0.75em", marginRight: 3 }}>{ch > 0 ? "▲" : "▼"}</span>}{fmtBp(ch)}</>}
                      </td>
                      <td className="mt-hide-sm" style={{ color: "var(--text-secondary)" }}>{r.yearAgo ? `${fmtNum(r.yearAgo.value, 2)}%` : "—"}</td>
                      <td className="mt-hide-md" style={{ textAlign: "left", color: "var(--text-secondary)", fontSize: 13 }}>{use}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "12px 0 0" }}>
              Want the best rates rather than averages? See <a href="/best-mortgage-rates/california" style={link}>mortgage rates by state</a>, <a href="/best-savings-account/texas" style={link}>high-yield savings by state</a>, and <a href="/cd-rates/florida" style={link}>CD rates by state</a>.
            </p>
          </section>

          {/* Keep exploring */}
          <section aria-labelledby="mt-more" style={{ marginBottom: 32 }}>
            <h2 id="mt-more" style={{ ...h2, fontSize: 19 }}>Keep exploring</h2>
            <div className="mt-grid2">
              {[
                { href: "/learn/how-does-the-stock-market-work", t: "How the stock market works", d: "What an index is, why prices move, and what it means for your 401(k)." },
                { href: "/tools/fire-calculator", t: "FIRE calculator", d: "Market swings matter less the longer your horizon. Find your number." },
                { href: "/tools/compound-interest-calculator", t: "Compound interest calculator", d: "See what steady investing adds up to over decades." },
                { href: "/pulse", t: "The Daily Pulse", d: "Guess five financial numbers and see how you stack up on the leaderboard." },
              ].map((x) => (
                <a key={x.href} href={x.href} style={{ ...card, padding: 16, textDecoration: "none", display: "block" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--mt-accent)", marginBottom: 4 }}>{x.t} →</div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{x.d}</div>
                </a>
              ))}
            </div>
          </section>

          {/* Sources & method */}
          <div style={{ ...card, padding: "16px 20px", fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--text-secondary)" }}>How this page works:</strong> The story and takeaways are written automatically from the numbers on this page using fixed rules.
            They describe what moved and how unusual it was compared with the past year; they don&apos;t guess at news-driven causes.{" "}
            <strong style={{ color: "var(--text-secondary)" }}>Sources:</strong> Stocks, sector ETFs, Treasury yields, commodities, the dollar and crypto from Yahoo Finance (quotes may be delayed 15–20 minutes).
            Mortgage, Fed funds, prime, savings, CD and CPI data from{" "}
            <a href={rates.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--mt-accent)" }}>FRED</a>. Sectors are the 11 S&amp;P 500 sector SPDR ETFs.
            Page refreshed at <strong>{lastUpdated}</strong>. Informational only, not financial advice. See our{" "}
            <a href="/terms" style={{ color: "var(--mt-accent)" }}>terms</a>.
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

import Header from "../components/Header";
import Footer from "../components/Footer";

// Revalidate every hour. Next.js serves the cached HTML until the window closes,
// at which point the next request triggers a background refresh. Googlebot gets
// up-to-date content on every crawl, users get fresh prices, and we stay well
// within free-tier rate limits on the upstream APIs.
export const revalidate = 3600;

const YAHOO_HOST = "https://query1.finance.yahoo.com/v8/finance/chart";
const COINGECKO = "https://api.coingecko.com/api/v3/simple/price";

// Yahoo sometimes rejects requests without a browser-like User-Agent. We send a
// conservative one and fail silently if the endpoint is down.
const FETCH_INIT = {
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; Pulsafi/1.0; +https://www.pulsafi.com)",
    Accept: "application/json,text/plain,*/*",
  },
  // This runs at build/revalidate time on the server, not per-request, so the
  // default Next.js cache behavior is fine. We still set a timeout via AbortSignal.
  signal: AbortSignal.timeout(8000),
  next: { revalidate: 3600 },
};

async function fetchYahooQuote(symbol) {
  try {
    const res = await fetch(`${YAHOO_HOST}/${encodeURIComponent(symbol)}?interval=1d&range=5d`, FETCH_INIT);
    if (!res.ok) return null;
    const data = await res.json();
    const result = data?.chart?.result?.[0];
    if (!result) return null;
    const meta = result.meta;
    const price = meta?.regularMarketPrice;
    const prevClose = meta?.chartPreviousClose ?? meta?.previousClose;
    if (typeof price !== "number") return null;
    const change = typeof prevClose === "number" ? price - prevClose : null;
    const changePct = change !== null && prevClose ? (change / prevClose) * 100 : null;
    return {
      symbol,
      price,
      prevClose: prevClose ?? null,
      change,
      changePct,
      currency: meta?.currency ?? "USD",
    };
  } catch {
    return null;
  }
}

async function fetchCryptoPrices() {
  try {
    const res = await fetch(
      `${COINGECKO}?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`,
      FETCH_INIT,
    );
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function loadMarketSnapshot() {
  // Kick off all the fetches in parallel so the whole page renders in one round
  // trip. Each helper already swallows errors and returns null on failure, so
  // Promise.all is safe (no single failure kills the page).
  const [sp500, dow, nasdaq, tenYear, twoYear, thirtyYear, crypto] = await Promise.all([
    fetchYahooQuote("^GSPC"),
    fetchYahooQuote("^DJI"),
    fetchYahooQuote("^IXIC"),
    fetchYahooQuote("^TNX"),
    fetchYahooQuote("^FVX"),
    fetchYahooQuote("^TYX"),
    fetchCryptoPrices(),
  ]);

  return {
    indices: [
      { label: "S&P 500", data: sp500, context: "500 largest US public companies" },
      { label: "Dow Jones", data: dow, context: "30 blue-chip US stocks" },
      { label: "Nasdaq", data: nasdaq, context: "Tech-heavy US index" },
    ],
    yields: [
      { label: "10-Year Treasury", data: tenYear, context: "Benchmark for mortgage rates" },
      { label: "5-Year Treasury", data: twoYear, context: "Mid-term government debt" },
      { label: "30-Year Treasury", data: thirtyYear, context: "Long-term government debt" },
    ],
    crypto: crypto
      ? [
          {
            label: "Bitcoin",
            ticker: "BTC",
            price: crypto.bitcoin?.usd ?? null,
            changePct: crypto.bitcoin?.usd_24h_change ?? null,
          },
          {
            label: "Ethereum",
            ticker: "ETH",
            price: crypto.ethereum?.usd ?? null,
            changePct: crypto.ethereum?.usd_24h_change ?? null,
          },
        ]
      : null,
    fetchedAt: new Date().toISOString(),
  };
}

function formatCurrency(value, opts = {}) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: opts.decimals ?? (value >= 1000 ? 0 : 2),
    minimumFractionDigits: opts.decimals ?? 0,
  }).format(value);
}

function formatNumber(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(value);
}

function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

function formatLongDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/New_York",
  });
}

export async function generateMetadata() {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });

  return {
    title: `Today's Market Pulse — ${today} | Pulsafi`,
    description: `Live snapshot of US market indices, Treasury yields, and crypto prices for ${today}. Updated hourly with S&P 500, Dow Jones, Nasdaq, 10-year Treasury, Bitcoin, and Ethereum.`,
    keywords: [
      "market today",
      "stock market today",
      "treasury yields today",
      "bitcoin price today",
      "S&P 500 today",
      "mortgage rate benchmark",
      "financial snapshot",
    ],
    alternates: {
      canonical: "/market-today",
    },
    openGraph: {
      title: `Today's Market Pulse — ${today}`,
      description: "Daily snapshot of US stocks, Treasury yields, and crypto. Updated hourly.",
      type: "website",
      url: "https://www.pulsafi.com/market-today",
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
      description: "Live US stocks, Treasury yields, and crypto. Updated hourly.",
    },
  };
}

function Quote({ row }) {
  const { label, data, context } = row;
  const price = data?.price ?? null;
  const changePct = data?.changePct ?? null;
  const isYield = label.includes("Treasury");
  const positive = typeof changePct === "number" && changePct >= 0;

  const priceDisplay = price === null
    ? "—"
    : isYield
      ? `${formatNumber(price, 2)}%`
      : formatNumber(price, price < 100 ? 2 : 2);

  return (
    <div style={cardStyle}>
      <div style={labelStyle}>{label}</div>
      <div style={valueStyle}>{priceDisplay}</div>
      <div
        style={{
          ...subStyle,
          color:
            changePct === null
              ? "var(--text-faint)"
              : positive
                ? "#22c55e"
                : "#ef4444",
          fontWeight: 600,
        }}
      >
        {changePct === null ? "Market data unavailable" : formatPercent(changePct)}
      </div>
      <div style={{ ...subStyle, color: "var(--text-faint)", marginTop: 6 }}>{context}</div>
    </div>
  );
}

function CryptoRow({ coin }) {
  const changePct = coin.changePct;
  const positive = typeof changePct === "number" && changePct >= 0;

  return (
    <div style={cardStyle}>
      <div style={labelStyle}>
        {coin.label} <span style={{ opacity: 0.6 }}>({coin.ticker})</span>
      </div>
      <div style={valueStyle}>{formatCurrency(coin.price, { decimals: coin.price < 10 ? 2 : 0 })}</div>
      <div
        style={{
          ...subStyle,
          color:
            changePct === null || changePct === undefined
              ? "var(--text-faint)"
              : positive
                ? "#22c55e"
                : "#ef4444",
          fontWeight: 600,
        }}
      >
        {changePct === null || changePct === undefined ? "24h change unavailable" : `${formatPercent(changePct)} (24h)`}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-card)",
  borderRadius: 8,
  padding: 20,
  textAlign: "center",
};

const labelStyle = {
  fontSize: 13,
  color: "var(--accent)",
  marginBottom: 8,
  fontFamily: "'DM Sans', sans-serif",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const valueStyle = {
  fontSize: 28,
  fontWeight: 700,
  fontFamily: "'Inter', monospace",
  color: "var(--text-primary)",
};

const subStyle = {
  fontSize: 12,
  color: "var(--text-muted)",
  marginTop: 8,
  fontFamily: "'DM Sans', sans-serif",
};

const sectionStyle = {
  backgroundColor: "var(--bg-card)",
  border: "1px solid var(--border-card)",
  borderRadius: 8,
  padding: 24,
  marginBottom: 40,
};

const sectionTitleStyle = {
  fontSize: 18,
  fontWeight: 700,
  fontFamily: "'Playfair Display', serif",
  margin: "0 0 8px 0",
  color: "var(--text-primary)",
};

const sectionDescStyle = {
  fontSize: 14,
  color: "var(--text-secondary)",
  fontFamily: "'DM Sans', sans-serif",
  margin: "0 0 20px 0",
  lineHeight: 1.6,
};

export default async function MarketTodayPage() {
  const snapshot = await loadMarketSnapshot();
  const todayLong = formatLongDate(snapshot.fetchedAt);
  const todayShort = new Date(snapshot.fetchedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/New_York",
  });
  const lastUpdated = formatTime(snapshot.fetchedAt);

  // Pick the 10-year yield as a narrative anchor — it's the single most useful
  // number on the page for normal people because it drives mortgage rates.
  const tenYear = snapshot.yields[0]?.data?.price ?? null;
  const sp500 = snapshot.indices[0]?.data;
  const sp500Change = sp500?.changePct;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `Today's Market Pulse — ${todayShort}`,
        description: "Live snapshot of US market indices, Treasury yields, and crypto prices. Updated hourly.",
        url: "https://www.pulsafi.com/market-today",
        datePublished: snapshot.fetchedAt,
        dateModified: snapshot.fetchedAt,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Pulsafi", item: "https://www.pulsafi.com" },
          { "@type": "ListItem", position: 2, name: "Market Today", item: "https://www.pulsafi.com/market-today" },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)", color: "var(--text-primary)" }}>
        <Header />
        <main style={{ flex: 1, maxWidth: 900, margin: "0 auto", padding: "40px 16px", width: "100%" }}>
          {/* Hero */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
              <a href="/" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Home</a>
              {" / "}
              <span>Market Today</span>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 700, fontFamily: "'Playfair Display', serif", margin: "16px 0 8px 0", color: "var(--text-primary)" }}>
              Today&apos;s Market Pulse
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-secondary)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>
              <strong>{todayLong}</strong> — a daily snapshot of US stocks, Treasury yields, and crypto prices.
              Updated hourly. No signup, no ads, no noise.
            </p>
          </div>

          {/* Headline summary */}
          {(typeof sp500Change === "number" || typeof tenYear === "number") && (
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-card)",
                borderRadius: 8,
                padding: 20,
                marginBottom: 32,
                fontSize: 15,
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
              }}
            >
              <strong style={{ color: "var(--text-primary)" }}>Today at a glance: </strong>
              {typeof sp500Change === "number" && (
                <>
                  The S&amp;P 500 is{" "}
                  <strong style={{ color: sp500Change >= 0 ? "#22c55e" : "#ef4444" }}>
                    {sp500Change >= 0 ? "up" : "down"} {Math.abs(sp500Change).toFixed(2)}%
                  </strong>
                  {sp500?.price ? ` at ${formatNumber(sp500.price, 2)}` : ""}.{" "}
                </>
              )}
              {typeof tenYear === "number" && (
                <>
                  The 10-year Treasury yield is{" "}
                  <strong style={{ color: "var(--text-primary)" }}>{tenYear.toFixed(2)}%</strong> — this is the
                  single most important number for mortgage rates and long-term loans.
                </>
              )}
            </div>
          )}

          {/* Major Indices */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>US Stock Market Indices</h2>
            <p style={sectionDescStyle}>
              The three headline US stock indices. Most broad-market index funds track one of these.
              When people say &ldquo;the stock market is up,&rdquo; they usually mean the S&amp;P 500.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {snapshot.indices.map((row) => (
                <Quote key={row.label} row={row} />
              ))}
            </div>
          </div>

          {/* Treasury Yields */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>US Treasury Yields</h2>
            <p style={sectionDescStyle}>
              Interest rates the US government pays to borrow. The 10-year yield is the benchmark
              that drives mortgage rates — when it rises, mortgages get more expensive. Use our{" "}
              <a href="/tools/mortgage-calculator" style={{ color: "var(--accent)" }}>mortgage calculator</a>{" "}
              to see how today&apos;s rates affect your payment.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {snapshot.yields.map((row) => (
                <Quote key={row.label} row={row} />
              ))}
            </div>
          </div>

          {/* Crypto */}
          {snapshot.crypto && (
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Top Cryptocurrencies</h2>
              <p style={sectionDescStyle}>
                The two largest cryptocurrencies by market cap. Crypto is volatile — a 10% day in
                either direction isn&apos;t unusual. Size your position accordingly.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
                {snapshot.crypto.map((coin) => (
                  <CryptoRow key={coin.ticker} coin={coin} />
                ))}
              </div>
            </div>
          )}

          {/* What this means for you */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>What Today&apos;s Numbers Mean for You</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
              <div style={{ padding: 16, backgroundColor: "var(--bg-main)", borderRadius: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Thinking about a mortgage?
                </h3>
                <p style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  Mortgage rates track the 10-year Treasury plus a spread (usually 1.5–2%). Run the numbers in our{" "}
                  <a href="/tools/mortgage-calculator" style={{ color: "var(--accent)" }}>mortgage calculator</a>.
                </p>
              </div>
              <div style={{ padding: 16, backgroundColor: "var(--bg-main)", borderRadius: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Investing for the long term?
                </h3>
                <p style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  Daily moves are noise. See what consistent investing looks like over decades with our{" "}
                  <a href="/tools/compound-interest-calculator" style={{ color: "var(--accent)" }}>compound interest calculator</a>.
                </p>
              </div>
              <div style={{ padding: 16, backgroundColor: "var(--bg-main)", borderRadius: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Worried about retirement?
                </h3>
                <p style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  Market swings matter less the longer your horizon. Check your FIRE number with our{" "}
                  <a href="/tools/fire-calculator" style={{ color: "var(--accent)" }}>FIRE calculator</a>.
                </p>
              </div>
              <div style={{ padding: 16, backgroundColor: "var(--bg-main)", borderRadius: 8 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)", margin: "0 0 8px 0", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Want to test your knowledge?
                </h3>
                <p style={{ fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  Play <a href="/pulse" style={{ color: "var(--accent)" }}>The Daily Pulse</a> — guess 5
                  financial numbers and see how you stack up on the leaderboard.
                </p>
              </div>
            </div>
          </div>

          {/* Data source */}
          <div
            style={{
              marginTop: 8,
              padding: "16px 20px",
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-card)",
              borderRadius: 8,
              fontSize: 12,
              fontFamily: "'DM Sans', sans-serif",
              color: "var(--text-muted)",
              lineHeight: 1.7,
            }}
          >
            <strong style={{ color: "var(--text-secondary)" }}>Data sources:</strong> Stock indices and Treasury
            yields from Yahoo Finance. Cryptocurrency prices from{" "}
            <a href="https://www.coingecko.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "underline" }}>
              CoinGecko
            </a>
            . Quotes may be delayed 15&ndash;20 minutes. Page last refreshed at{" "}
            <strong>{lastUpdated}</strong>. This page is informational — it does not constitute financial
            advice. See our{" "}
            <a href="/terms" style={{ color: "var(--accent)", textDecoration: "underline" }}>terms</a>{" "}
            for details.
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

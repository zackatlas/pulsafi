// Turns the day's market data into plain-English takeaways for /market-today.
//
// Everything here is rules over the numbers: how big a move was relative to a
// normal day, streaks, distance from the 52-week high, which sectors led, what
// it means in dollars. It describes what happened and how unusual it was. It
// never guesses at why (that would need a news source), so nothing here can
// invent a cause.
//
// Pure functions, no fetching. Inputs are the shapes from lib/marketData.js
// and lib/fredRates.js; any missing series just drops the takeaways that need it.

const ORDINAL = ["", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
const EXAMPLE_LOAN = 400000;
const EXAMPLE_BALANCE = 10000;

// ---------- formatting ----------

export function fmtNum(v, d = 2) {
  if (v == null || !Number.isFinite(v)) return "—";
  return new Intl.NumberFormat("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v).replace(/^-/, "−");
}

export function fmtUsd(v, d = 0) {
  if (v == null || !Number.isFinite(v)) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
}

export function fmtSignedUsd(v) {
  if (v == null || !Number.isFinite(v)) return "—";
  const r = Math.round(v);
  return `${r > 0 ? "+" : r < 0 ? "−" : ""}${fmtUsd(Math.abs(r))}`;
}

export function fmtPct(v, d = 2) {
  if (v == null || !Number.isFinite(v)) return "—";
  const r = Number(v.toFixed(d));
  return `${r > 0 ? "+" : r < 0 ? "−" : ""}${Math.abs(r).toFixed(d)}%`;
}

// Unsigned, for use after a verb ("fell 0.17%").
export function fmtPctAbs(v, d = 2) {
  if (v == null || !Number.isFinite(v)) return "—";
  return `${Math.abs(v).toFixed(d)}%`;
}

export function fmtBp(v) {
  if (v == null || !Number.isFinite(v)) return "—";
  const r = Math.round(v);
  return `${r > 0 ? "+" : r < 0 ? "−" : ""}${Math.abs(r)} bp`;
}

// A series' move in its own unit: % for prices, basis points for yields.
export function fmtMove(s, v) {
  return s.kind === "yield" ? fmtBp(v) : fmtPct(v);
}

export function fmtLevel(s) {
  if (s.kind === "yield") return `${fmtNum(s.last, 2)}%`;
  if (s.currency) return fmtUsd(s.last, s.last < 100 ? 2 : 0);
  return fmtNum(s.last, 2);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function shortDate(key, refKey) {
  const [y, m, d] = key.split("-").map(Number);
  const sameYear = refKey && refKey.slice(0, 4) === key.slice(0, 4);
  return `${MONTHS[m - 1]} ${d}${sameYear ? "" : `, ${y}`}`;
}

function monthlyPayment(principal, ratePct, years = 30) {
  const r = ratePct / 100 / 12, n = years * 12;
  return principal * (r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

const abs = Math.abs;
const countOf = (n, total) => (n === total ? `All ${total}` : `${n} of ${total}`);
const upDown = (v, d = 1) => `${v >= 0 ? "up" : "down"} ${abs(v).toFixed(d)}%`;

// ---------- building blocks ----------

// How the S&P's day compares with every other day in the past year.
function typicality(s) {
  const p = s.movePercentile;
  if (p == null) return "";
  if (p < 0.35) return `a quieter day than ${Math.round((1 - p) * 100)}% of sessions this year`;
  if (p < 0.8) return "a fairly typical move";
  if (p < 0.95) return `a bigger move than ${Math.round(p * 100)}% of days this year`;
  return "one of the biggest moves of the year";
}

function sizeOf(z) {
  const a = abs(z ?? 0);
  if (a < 0.35) return 0;
  if (a < 1) return 1;
  if (a < 2) return 2;
  if (a < 3) return 3;
  return 4;
}

function stocksPhrase(spx) {
  const size = sizeOf(spx.z);
  const up = spx.move >= 0;
  const verbs = up ? ["hold steady", "edge higher", "rise", "rally", "surge"] : ["hold steady", "edge lower", "fall", "slide", "plunge"];
  let phrase = `Stocks ${verbs[size]}`;
  if (size > 0 && abs(spx.streak) >= 3 && abs(spx.streak) <= 10) phrase += ` for a ${ORDINAL[abs(spx.streak)]} straight day`;
  return phrase;
}

const isFlat = (v) => Math.round(v * 100) === 0;

// "fell 0.42%", or just "was flat" when the move rounds to 0.00%.
function moveWords(v, open, bold = false) {
  const words = verb(v, open);
  if (isFlat(v)) return words;
  return bold ? `${words} **${fmtPctAbs(v)}**` : `${words} ${fmtPctAbs(v)}`;
}

function verb(v, open, { up = "rose", down = "fell", flat = "was flat", upNow = "is up", downNow = "is down", flatNow = "is flat" } = {}) {
  if (isFlat(v)) return open ? flatNow : flat;
  if (open) return v > 0 ? upNow : downNow;
  return v > 0 ? up : down;
}

// ---------- signal generators ----------
// Each returns null or { id, score, kicker, title, body, clause?, connector?, link? }.
// score ~ how notable it is today; the top few become "What stands out".

function spxMoveSignal(spx) {
  if (!spx || spx.z == null) return null;
  const az = abs(spx.z);
  if (az < 1.5 && !(spx.movePercentile >= 0.9)) return null;
  const kind = spx.move < 0 ? "drop" : "gain";
  const since = spx.lastComparable ? `since ${shortDate(spx.lastComparable, spx.date)}` : "in the past year";
  return {
    id: "spx-move",
    score: 20 + az * 20,
    kicker: "Stocks",
    title: `The S&P 500's biggest one-day ${kind} ${since}`,
    body: `A ${fmtPct(spx.move)} day is about ${az.toFixed(1)}× the typical daily swing of ±${fmtNum(spx.sd, 1)}%. Big days tend to cluster, so volatility often stays elevated for a while — but single days rarely change the long-term picture.`,
    headlineTail: `, the biggest ${kind} ${since}`,
  };
}

function highLowSignal(s, name, id) {
  if (!s || s.fromHigh == null) return null;
  const hiDate = shortDate(s.high52Date, s.date);
  if (s.isNewHigh) {
    return {
      id, type: "high", score: 55, kicker: "Stocks",
      title: `${name} sets a new 52-week high`,
      body: `It's ${upDown(s.chgYtd)} this year and ${upDown(s.chg1y)} over the past 12 months. Highs tend to cluster in rising markets, so a new high on its own isn't a warning sign.`,
      clause: `the ${name} hits a 52-week high`, connector: "as",
    };
  }
  const dd = s.fromHigh;
  if (dd <= -20) {
    return {
      id, type: "bear", score: 80, kicker: "Stocks",
      title: `${name} is in a bear market`,
      body: `It's ${abs(dd).toFixed(1)}% below its ${hiDate} high. A 20%+ decline is the usual definition of a bear market. Historically they've been painful but temporary for diversified, long-term investors.`,
      clause: `the ${name} in bear-market territory`, connector: "with",
      link: { href: "/tools/compound-interest-calculator", text: "See what staying invested looks like" },
    };
  }
  if (dd <= -10) {
    return {
      id, type: "correction", score: 65, kicker: "Stocks",
      title: `${name} is in correction territory`,
      body: `It's ${abs(dd).toFixed(1)}% below its ${hiDate} high. A drop of 10% or more is called a correction. They've historically come along about once every year or two.`,
      clause: `the ${name} in correction territory`, connector: "with",
    };
  }
  if (dd <= -5) {
    return {
      id, type: "pullback", score: 28, kicker: "Stocks",
      title: `${name} is ${abs(dd).toFixed(1)}% below its high`,
      body: `The high was on ${hiDate}. Pullbacks of 5–10% are common and happen a few times in a typical year.`,
    };
  }
  if (dd > -1) {
    return {
      id, type: "near-high", score: 22, kicker: "Stocks",
      title: `${name} is within 1% of its 52-week high`,
      body: `It's ${abs(dd).toFixed(2)}% below the ${hiDate} high and ${upDown(s.chgYtd)} this year.`,
    };
  }
  return null;
}

function streakSignal(s, name, id) {
  if (!s || abs(s.streak) < 3) return null;
  const n = abs(s.streak);
  const dir = s.streak > 0 ? "up" : "down";
  return {
    id, score: 10 * n - 5, kicker: "Stocks",
    title: `${name} ${dir} ${n} days in a row`,
    body: `That's ${fmtPct(s.streakMove, 1)} over the run. Streaks feel meaningful, but they have little power to predict the next day's move.`,
  };
}

function yieldSignal(t10, mortgageRate) {
  if (!t10) return null;
  const candidates = [];
  if (t10.isNewHigh) candidates.push({ score: 60, title: "10-year Treasury yield hits a 52-week high", clause: "the 10-year yield hits a one-year high" });
  if (t10.isNewLow) candidates.push({ score: 55, title: "10-year Treasury yield falls to a 52-week low", clause: "the 10-year yield falls to a one-year low" });
  if (t10.z != null && abs(t10.z) >= 1.5) {
    candidates.push({
      score: 20 + abs(t10.z) * 15,
      title: `Treasury yields ${t10.move > 0 ? "jump" : "drop"} ${abs(Math.round(t10.move))} basis points`,
      clause: `Treasury yields ${t10.move > 0 ? "jump" : "drop"}`,
    });
  }
  if (t10.chg1m != null && abs(t10.chg1m) >= 25) {
    candidates.push({
      score: 30 + (abs(t10.chg1m) - 25) * 0.8,
      title: `10-year yield ${t10.chg1m > 0 ? "up" : "down"} ${abs(Math.round(t10.chg1m))} basis points in a month`,
      clause: `bond yields keep ${t10.chg1m > 0 ? "climbing" : "falling"}`,
    });
  }
  if (!candidates.length) return null;
  const best = candidates.sort((a, b) => b.score - a.score)[0];
  const step = mortgageRate ? monthlyPayment(EXAMPLE_LOAN, mortgageRate + 0.25) - monthlyPayment(EXAMPLE_LOAN, mortgageRate) : null;
  const monthCtx = t10.chg1m != null && !best.title.includes("month") ? ` It's ${t10.chg1m >= 0 ? "up" : "down"} ${abs(Math.round(t10.chg1m))} bp over the past month.` : "";
  const streakCtx = abs(t10.streak) >= 4 ? ` It has ${t10.streak > 0 ? "risen" : "fallen"} ${abs(t10.streak)} sessions in a row.` : "";
  return {
    id: "t10", kicker: "Rates", ...best,
    connector: "as",
    body: `The 10-year is at ${fmtNum(t10.last, 2)}%.${monthCtx}${streakCtx} Mortgage rates tend to follow it${step ? `: on a ${fmtUsd(EXAMPLE_LOAN)} 30-year loan, each 0.25-point move in the rate changes the payment by about ${fmtUsd(step)} a month` : ""}.`,
    link: { href: "/tools/mortgage-calculator", text: "Run your mortgage numbers" },
  };
}

function vixSignal(vix) {
  if (!vix) return null;
  const lvl = vix.last;
  const jump = vix.changePct;
  const explain = "The VIX tracks how much turbulence options traders expect over the next 30 days. Its long-run average is around 19–20.";
  if (lvl >= 30) return { id: "vix", score: 75, kicker: "Sentiment", title: `Fear gauge above 30 (${fmtNum(lvl, 1)})`, body: `${explain} Readings above 30 have historically lined up with sharp, fast-moving markets.`, clause: "the fear gauge tops 30", connector: "as" };
  if (jump >= 15 && lvl >= 18) return { id: "vix", score: 45, kicker: "Sentiment", title: `Fear gauge jumps ${Math.round(jump)}% to ${fmtNum(lvl, 1)}`, body: `${explain} A sudden jump means investors are paying up for protection.`, clause: "the fear gauge jumps", connector: "as" };
  if (lvl >= 22) return { id: "vix", score: 40, kicker: "Sentiment", title: `Fear gauge elevated at ${fmtNum(lvl, 1)}`, body: `${explain} Above the low 20s, investors are bracing for bigger swings than usual.` };
  if (jump <= -15 && lvl < 22) return { id: "vix", score: 25, kicker: "Sentiment", title: `Fear gauge drops ${Math.round(abs(jump))}%`, body: `${explain} At ${fmtNum(lvl, 1)}, traders expect a calmer stretch.` };
  if (lvl <= 13) return { id: "vix", score: 20, kicker: "Sentiment", title: `Markets unusually calm (VIX ${fmtNum(lvl, 1)})`, body: `${explain} Very low readings mean investors expect smooth sailing, which can make surprises land harder.` };
  return null;
}

export function sectorRead(sectors, spx) {
  if (!sectors || sectors.length < 8) return null;
  const sorted = [...sectors].sort((a, b) => b.move - a.move);
  const up = sectors.filter((s) => s.move > 0).length;
  const avg = (g) => {
    const xs = sectors.filter((s) => g.includes(s.group)).map((s) => s.move);
    return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
  };
  const tilt = avg(["growth", "cyclical"]) - avg(["defensive"]);
  const leader = sorted[0], laggard = sorted[sorted.length - 1];
  let theme, themeBody;
  if (up >= sectors.length - 1 && spx && spx.move > 0.3) {
    theme = "A broad rally"; themeBody = `${countOf(up, sectors.length)} sectors rose. When nearly everything moves together, it's usually about the overall market mood rather than any one industry.`;
  } else if (up <= 1 && spx && spx.move < -0.3) {
    theme = "A broad selloff"; themeBody = `${countOf(sectors.length - up, sectors.length)} sectors fell. When nearly everything drops together, it's usually about the overall market mood rather than any one industry.`;
  } else if (tilt <= -0.6) {
    theme = "Investors played defense"; themeBody = `Utilities, consumer staples and health care beat growth and economically sensitive sectors by ${abs(tilt).toFixed(1)} points on average. Money moving toward steadier businesses usually signals caution.`;
  } else if (tilt >= 0.6) {
    theme = "Risk-on"; themeBody = `Growth and economically sensitive sectors beat the defensive ones (utilities, staples, health care) by ${tilt.toFixed(1)} points on average. That usually reflects confidence about the economy.`;
  } else {
    theme = "No clear theme"; themeBody = `${up} of ${sectors.length} sectors rose and there was no strong tilt toward either growth or defensive sectors.`;
  }
  return { sorted, up, total: sectors.length, leader, laggard, tilt, spread: leader.move - laggard.move, theme, themeBody };
}

function sectorSignal(read) {
  if (!read) return null;
  let score = 0;
  if (read.theme === "A broad rally" || read.theme === "A broad selloff") score = 35;
  else if (abs(read.tilt) >= 1) score = 40;
  else if (abs(read.tilt) >= 0.6) score = 26;
  if (read.spread >= 2.5) score = Math.max(score, 22 + (read.spread - 2.5) * 6);
  if (!score) return null;
  const lead = read.leader.label.toLowerCase();
  return {
    id: "sectors", score, kicker: "Sectors",
    title: read.theme === "No clear theme" ? `${read.leader.label} led, ${read.laggard.label.toLowerCase()} lagged` : read.theme,
    body: `${read.themeBody} Best: ${read.leader.label.toLowerCase()} (${fmtPct(read.leader.move)}). Worst: ${read.laggard.label.toLowerCase()} (${fmtPct(read.laggard.move)}).`,
    clause: read.theme === "Investors played defense" ? "investors play defense"
      : read.theme === "Risk-on" ? "growth sectors lead"
      : read.theme === "No clear theme" && read.leader.move > 0 ? `${lead} ${lead.endsWith("s") ? "lead" : "leads"}`
      : null,
    connector: "as",
  };
}

function smallCapSignal(rut, spx) {
  if (!rut || !spx) return null;
  const dayGap = rut.move - spx.move;
  const monthGap = rut.chg1m != null && spx.chg1m != null ? rut.chg1m - spx.chg1m : 0;
  const why = "Small companies lean more on borrowing and the US economy, so they're more sensitive to interest rates and growth worries.";
  if (abs(dayGap) >= 1) {
    const better = dayGap > 0;
    return {
      id: "smallcaps", score: 22 + abs(dayGap) * 8, kicker: "Stocks",
      title: `Small caps ${better ? "outpaced" : "lagged"} big companies`,
      body: `The Russell 2000 ${rut.sessionOpen ? "is" : "was"} ${fmtPct(rut.move)} vs. ${fmtPct(spx.move)} for the S&P 500. ${why}`,
      clause: `small caps ${better ? "outperform" : "lag"}`, connector: "as",
    };
  }
  if (abs(monthGap) >= 5) {
    return {
      id: "smallcaps", score: 26, kicker: "Stocks",
      title: `Small caps ${monthGap > 0 ? "ahead of" : "behind"} the S&P by ${abs(monthGap).toFixed(1)} points this month`,
      body: `Russell 2000 ${fmtPct(rut.chg1m, 1)} vs. S&P 500 ${fmtPct(spx.chg1m, 1)} over the past month. ${why}`,
    };
  }
  return null;
}

function goldSignal(g) {
  if (!g) return null;
  if (g.isNewHigh) return { id: "gold", score: 42, kicker: "Commodities", title: `Gold at a 52-week high (${fmtLevel(g)})`, body: `Gold is ${upDown(g.chg1y)} over the past year. It tends to draw money when investors worry about inflation, the dollar or instability.`, clause: "gold hits a one-year high", connector: "while" };
  if (g.fromHigh != null && g.fromHigh <= -15 && !(g.z != null && abs(g.z) >= 2)) return { id: "gold", score: 21, kicker: "Commodities", title: `Gold ${abs(g.fromHigh).toFixed(0)}% below its 52-week high`, body: `It peaked at ${fmtUsd(g.high52)} on ${shortDate(g.high52Date, g.date)} and now trades at ${fmtLevel(g)}. For a metal many people treat as a safe haven, that's a steep drop.` };
  if (g.z != null && abs(g.z) >= 2) return { id: "gold", score: 20 + abs(g.z) * 10, kicker: "Commodities", title: `Gold ${g.move > 0 ? "jumps" : "drops"} ${fmtPct(abs(g.move), 1)}`, body: `That's ${abs(g.z).toFixed(1)}× a typical day for gold, which now trades at ${fmtLevel(g)}.`, clause: `gold ${g.move > 0 ? "jumps" : "slides"}`, connector: "while" };
  return null;
}

function oilSignal(o) {
  if (!o) return null;
  // Rule of thumb: $1/barrel of crude ≈ 2.4¢/gallon of gasoline (42 gallons per barrel).
  const gasNote = (usd) => `A ${fmtUsd(abs(usd), 2)} move per barrel works out to roughly ${Math.round(abs(usd) * 2.4)}¢ a gallon at the pump, usually with a lag of a week or two.`;
  const gasSince = (usd) => `That's roughly ${Math.round(abs(usd) * 2.4)}¢ a gallon ${usd > 0 ? "more" : "less"} at the pump, all else equal.`;
  if (o.chg1m != null && abs(o.chg1m) >= 15) {
    const usd = o.last - o.last / (1 + o.chg1m / 100);
    return { id: "oil", score: 40, kicker: "Commodities", title: `Oil ${o.chg1m > 0 ? "up" : "down"} ${abs(o.chg1m).toFixed(0)}% in a month`, body: `WTI crude is at ${fmtLevel(o)}. ${gasNote(usd)}`, clause: `oil ${o.chg1m > 0 ? "keeps climbing" : "keeps sliding"}`, connector: "while" };
  }
  if (o.z == null || abs(o.z) < 2) {
    if (o.chgYtd != null && abs(o.chgYtd) >= 30) {
      const start = o.last / (1 + o.chgYtd / 100);
      return { id: "oil", score: 24, kicker: "Commodities", title: `Oil ${o.chgYtd > 0 ? "up" : "down"} ${abs(o.chgYtd).toFixed(0)}% this year`, body: `WTI crude has gone from about ${fmtUsd(start)} to ${fmtLevel(o)} a barrel since January. ${gasSince(o.last - start)}` };
    }
    return null;
  }
  {
    return { id: "oil", score: 22 + abs(o.z) * 8, kicker: "Commodities", title: `Oil ${o.move > 0 ? "jumps" : "tumbles"} ${fmtPct(abs(o.move), 1)}`, body: `WTI crude is at ${fmtLevel(o)}. ${gasNote(o.last - o.prev)}`, clause: `oil ${o.move > 0 ? "jumps" : "tumbles"}`, connector: "while" };
  }
  return null;
}

function dollarSignal(u) {
  if (!u || u.z == null || abs(u.z) < 2) return null;
  return {
    id: "usd", score: 20 + abs(u.z) * 6, kicker: "Currency",
    title: `Dollar ${u.move > 0 ? "strengthens" : "weakens"} sharply`,
    body: `The dollar index moved ${fmtPct(u.move)}. A stronger dollar makes imports and travel abroad cheaper for Americans but weighs on US companies that sell overseas. A weaker one does the reverse.`,
  };
}

function cryptoSignal(b) {
  if (!b) return null;
  if (b.isNewHigh) return { id: "btc", score: 42, kicker: "Crypto", title: `Bitcoin at a 52-week high (${fmtLevel(b)})`, body: `It's ${upDown(b.chg1y, 0)} over the past year. Crypto swings far harder than stocks, in both directions.`, clause: "bitcoin hits a one-year high", connector: "while" };
  if (b.z != null && abs(b.z) >= 2) return { id: "btc", score: 20 + abs(b.z) * 8, kicker: "Crypto", title: `Bitcoin ${b.move > 0 ? "jumps" : "drops"} ${fmtPct(abs(b.move), 1)}`, body: `Even by crypto standards that's big: about ${abs(b.z).toFixed(1)}× a typical day (±${fmtNum(b.sd, 1)}%). Bitcoin is now ${fmtLevel(b)}.`, clause: `bitcoin ${b.move > 0 ? "jumps" : "drops"}`, connector: "while" };
  if (b.fromHigh != null && b.fromHigh <= -25) return { id: "btc", score: 24, kicker: "Crypto", title: `Bitcoin ${abs(b.fromHigh).toFixed(0)}% below its 52-week high`, body: `It peaked at ${fmtUsd(b.high52)} on ${shortDate(b.high52Date, b.date)} and now trades at ${fmtLevel(b)}. Drawdowns this deep are routine for crypto.` };
  return null;
}

function curveSignal(t10, t3m) {
  if (!t10 || !t3m) return null;
  const spread = t10.last - t3m.last;
  const explain = "Long-term rates are normally higher than short-term ones. When the 10-year dips below the 3-month bill (an \"inverted\" curve), it has preceded most US recessions, though with long and uneven lags.";
  if (spread < 0) return { id: "curve", score: 40, kicker: "Rates", title: `Yield curve inverted (${fmtNum(spread, 2)} pts)`, body: explain };
  if (spread < 0.25) return { id: "curve", score: 20, kicker: "Rates", title: "Yield curve nearly flat", body: `The 10-year pays just ${fmtNum(spread, 2)} points more than the 3-month bill. ${explain}` };
  return { id: "curve", score: 8, kicker: "Rates", title: `Yield curve is positive (+${fmtNum(spread, 2)} pts)`, body: `The 10-year pays more than the 3-month bill, which is the normal shape. ${explain}` };
}

function bigPictureSignal(spx) {
  if (!spx || spx.chgYtd == null) return null;
  const hi = shortDate(spx.high52Date, spx.date);
  const trend = spx.ma200 ? ` It's ${spx.last >= spx.ma200 ? "above" : "below"} its 200-day average, a common gauge of the longer-term trend.` : "";
  return {
    id: "big-picture", score: 10, kicker: "Big picture",
    title: `S&P 500 ${spx.chgYtd >= 0 ? "up" : "down"} ${abs(spx.chgYtd).toFixed(1)}% this year`,
    body: `${spx.isNewHigh ? "It's at its 52-week high." : `It's ${abs(spx.fromHigh).toFixed(1)}% below its ${hi} high.`}${trend}`,
  };
}

// ---------- the day's read ----------

export function moodFromVix(vix) {
  if (!vix) return null;
  const v = vix.last;
  const label = v < 13 ? "Very calm" : v < 17 ? "Calm" : v < 22 ? "Normal" : v < 30 ? "Nervous" : "Fearful";
  return { label, vix: v };
}

function regimeSentence(spx, t10, gold) {
  if (!spx || !t10 || spx.z == null) return null;
  if (abs(spx.z) < 0.5 || abs(t10.move) < 3) return null;
  const stocksUp = spx.move > 0, yieldsUp = t10.move > 0;
  if (!stocksUp && yieldsUp) return "Stocks falling while yields rise often means investors are worried about interest rates staying high.";
  if (!stocksUp && !yieldsUp) return gold && gold.move > 0.5
    ? "Stocks down, yields down and gold up is a classic flight to safety: money leaving risky assets for bonds and gold."
    : "Stocks and yields falling together usually means investors are moving toward safer bonds.";
  if (stocksUp && yieldsUp) return "Stocks and yields rising together usually reflects optimism about economic growth.";
  return "Rising stocks and falling yields often go together, since lower borrowing costs make stocks more attractive.";
}

export function buildInsights({ series, sectors }, rates) {
  const { spx, dji, ixic, rut, vix, t3m, t10y, gold, oil, usd, btc } = series;
  const open = spx?.sessionOpen ?? false;
  const mortgageRate = rates?.mortgage30?.value ?? null;
  const read = sectorRead(sectors, spx);

  const signals = [
    spxMoveSignal(spx),
    highLowSignal(spx, "S&P 500", "spx-level"),
    !spx || abs(spx.streak) < 3 ? streakSignal(ixic, "Nasdaq", "ixic-streak") : streakSignal(spx, "S&P 500", "spx-streak"),
    highLowSignal(ixic, "Nasdaq", "ixic-level"),
    yieldSignal(t10y, mortgageRate),
    vixSignal(vix),
    sectorSignal(read),
    smallCapSignal(rut, spx),
    goldSignal(gold),
    oilSignal(oil),
    dollarSignal(usd),
    cryptoSignal(btc),
    curveSignal(t10y, t3m),
    bigPictureSignal(spx),
  ].filter(Boolean).sort((a, b) => b.score - a.score);

  // The Nasdaq only earns its own card when it tells a different story than the S&P.
  const spxLevel = signals.find((s) => s.id === "spx-level");
  const deduped = signals.filter((s) => !(s.id === "ixic-level" && spxLevel && spxLevel.type === s.type));

  const perKicker = {};
  const varied = deduped.filter((s) => (perKicker[s.kicker] = (perKicker[s.kicker] ?? 0) + 1) <= 2);
  const notable = varied.filter((s) => s.score >= 20).slice(0, 4);
  const standouts = notable.length >= 3 ? notable : [...notable, ...varied.filter((s) => s.score < 20)].slice(0, 3);

  // Headline: the stock market's day, plus the most notable thing elsewhere.
  let headline = "Today's market snapshot";
  if (spx) {
    const moveSig = deduped.find((s) => s.id === "spx-move");
    const lead = spx.isNewHigh ? "S&P 500 hits a 52-week high" : stocksPhrase(spx);
    const second = deduped.find((s) => s.clause && s.score >= 25 && (!s.id.startsWith("spx") || (s.id === "spx-level" && !spx.isNewHigh)));
    if (second) headline = `${lead} ${second.connector} ${second.clause}`;
    else if (moveSig) headline = `${lead}${moveSig.headlineTail}`;
    else headline = lead;
  }

  // The story: 3–6 sentences, each only if its data is present.
  const story = [];
  if (spx) {
    const flat = isFlat(spx.move);
    story.push(`The S&P 500 ${moveWords(spx.move, open, true)} ${open || flat ? "at" : "to"} ${fmtNum(spx.last, 2)}, ${typicality(spx)}.`);
    const others = [ixic && `the Nasdaq ${moveWords(ixic.move, open)}`, dji && `the Dow ${moveWords(dji.move, open)}`].filter(Boolean);
    if (others.length) story[story.length - 1] += ` Elsewhere, ${others.join(" and ")}.`;
  }
  if (read) {
    const lead = `${read.leader.label} (${fmtPct(read.leader.move)})`, lag = `${read.laggard.label.toLowerCase()} (${fmtPct(read.laggard.move)})`;
    if (read.up === 0) story.push(`All ${read.total} sectors ${open ? "are down" : "fell"}. ${lead} held up best and ${lag} ${open ? "is down" : "fell"} the most.`);
    else if (read.up === read.total) story.push(`All ${read.total} sectors ${open ? "are up" : "rose"}. ${lead} led and ${lag} gained the least.`);
    else {
      const be = open ? (read.up === 1 ? "is" : "are") : (read.up === 1 ? "was" : "were");
      story.push(`${read.up} of ${read.total} sectors ${be} higher. ${lead} led and ${lag} lagged.`);
    }
  }
  if (t10y) {
    const bp = Math.round(t10y.move);
    let s = bp === 0
      ? `The 10-year Treasury yield ${open ? "is" : "was"} unchanged at **${fmtNum(t10y.last, 2)}%**`
      : `The 10-year Treasury yield ${verb(bp, open)} ${abs(bp)} basis ${abs(bp) === 1 ? "point" : "points"} to **${fmtNum(t10y.last, 2)}%**`;
    // Mid-session the day hasn't closed yet, so it's a "level", not a "close".
    if (t10y.isNewHigh) s += `, its highest ${open ? "level" : "close"} in a year`;
    else if (t10y.isNewLow) s += `, its lowest ${open ? "level" : "close"} in a year`;
    else if (t10y.chg1m != null && abs(t10y.chg1m) >= 20) s += `, ${t10y.chg1m > 0 ? "up" : "down"} ${abs(Math.round(t10y.chg1m))} bp over the past month`;
    story.push(`${s}.`);
  }
  const regime = regimeSentence(spx, t10y, gold);
  if (regime) story.push(regime);
  if (spx && spx.chgYtd != null) {
    story.push(spx.isNewHigh
      ? `Zooming out, the S&P 500 is ${upDown(spx.chgYtd)} this year and sitting at its 52-week high.`
      : `Zooming out, the S&P 500 is ${upDown(spx.chgYtd)} this year and ${abs(spx.fromHigh).toFixed(1)}% below its ${shortDate(spx.high52Date, spx.date)} high.`);
  }

  return { headline, story, standouts, sectors: read, mood: moodFromVix(vix), money: moneyImpact(series, rates) };
}

// ---------- what it means for your money ----------

function moneyImpact({ spx, t10y, t3m }, rates) {
  const out = {};
  if (spx) {
    const at = (pct) => (pct == null ? null : EXAMPLE_BALANCE * pct / 100);
    out.invest = {
      balance: EXAMPLE_BALANCE,
      rows: [
        { label: spx.sessionOpen ? "Today so far" : "Latest session", v: at(spx.move) },
        { label: "Past month", v: at(spx.chg1m) },
        { label: "This year", v: at(spx.chgYtd) },
        { label: "Past 12 months", v: at(spx.chg1y) },
      ],
      typicalDay: at(spx.sd),
    };
  }

  const m = rates?.mortgage30;
  if (m?.value) {
    const pay = monthlyPayment(EXAMPLE_LOAN, m.value);
    const payYearAgo = m.yearAgo ? monthlyPayment(EXAMPLE_LOAN, m.yearAgo.value) : null;
    // Freddie Mac's weekly survey lags the bond market; compare the 10-year now vs. survey day.
    let outlook = null;
    if (t10y) {
      const then = t10y.closeOn(m.date);
      const moved = then != null ? (t10y.last - then) * 100 : null;
      if (moved != null && abs(moved) >= 5) {
        outlook = `The 10-year yield is ${moved > 0 ? "up" : "down"} ${abs(Math.round(moved))} bp since that survey, which usually shows up as ${moved > 0 ? "higher" : "lower"} mortgage rates in the next weekly reading.`;
      } else if (moved != null) {
        outlook = "The 10-year yield has barely moved since that survey, so next week's reading is likely to be similar.";
      }
    }
    out.mortgage = {
      rate: m.value, date: m.date, loan: EXAMPLE_LOAN, payment: pay,
      yearAgoRate: m.yearAgo?.value ?? null,
      yearAgoDiff: payYearAgo != null ? pay - payYearAgo : null,
      outlook,
    };
  }

  const avg = rates?.savingsNatAvg?.value;
  const cpi = rates?.cpiYoY?.value;
  const cash = t3m?.last ?? rates?.t1mo?.value ?? null;
  if (avg != null && cash != null) {
    out.savings = {
      balance: EXAMPLE_BALANCE,
      avgRate: avg, cashRate: cash, cpi,
      avgEarns: EXAMPLE_BALANCE * avg / 100,
      cashEarns: EXAMPLE_BALANCE * cash / 100,
      realLossAvg: cpi != null ? EXAMPLE_BALANCE * (cpi - avg) / 100 : null,
    };
  }
  return out;
}

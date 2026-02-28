"use client";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// ═══ DEFAULT CATEGORIES ═══
const INCOME_CATS = [
  { id: "salary", label: "Salary", icon: "💼", color: "#2ecc71" },
  { id: "freelance", label: "Freelance / Side", icon: "💻", color: "#3498db" },
  { id: "investments", label: "Investments", icon: "📈", color: "#f0c040" },
  { id: "rental", label: "Rental Income", icon: "🏠", color: "#e67e22" },
  { id: "other_inc", label: "Other Income", icon: "💰", color: "#9b59b6" },
];

const EXPENSE_CATS = [
  { id: "housing", label: "Housing", icon: "🏠", color: "#e74c3c" },
  { id: "food", label: "Food & Groceries", icon: "🍔", color: "#e67e22" },
  { id: "transport", label: "Transportation", icon: "🚗", color: "#3498db" },
  { id: "utilities", label: "Utilities", icon: "⚡", color: "#f39c12" },
  { id: "insurance", label: "Insurance", icon: "🛡️", color: "#1abc9c" },
  { id: "health", label: "Health & Medical", icon: "🏥", color: "#e74c3c" },
  { id: "entertainment", label: "Entertainment", icon: "🎬", color: "#9b59b6" },
  { id: "shopping", label: "Shopping", icon: "🛍️", color: "#e91e63" },
  { id: "subscriptions", label: "Subscriptions", icon: "📱", color: "#00bcd4" },
  { id: "dining", label: "Dining Out", icon: "🍽️", color: "#ff7043" },
  { id: "personal", label: "Personal Care", icon: "💄", color: "#ec407a" },
  { id: "education", label: "Education", icon: "📚", color: "#5c6bc0" },
  { id: "savings", label: "Savings / Investing", icon: "🏦", color: "#2ecc71" },
  { id: "debt", label: "Debt Payments", icon: "💳", color: "#795548" },
  { id: "pets", label: "Pets", icon: "🐾", color: "#8d6e63" },
  { id: "gifts", label: "Gifts & Donations", icon: "🎁", color: "#ab47bc" },
  { id: "other_exp", label: "Other", icon: "📦", color: "#78909c" },
];

const ASSET_CATS = [
  { id: "checking", label: "Checking Accounts", icon: "🏦" },
  { id: "savings_acct", label: "Savings Accounts", icon: "💰" },
  { id: "brokerage", label: "Brokerage / Stocks", icon: "📈" },
  { id: "retirement", label: "401(k) / IRA", icon: "🏖️" },
  { id: "crypto", label: "Crypto", icon: "₿" },
  { id: "real_estate", label: "Real Estate", icon: "🏠" },
  { id: "vehicles", label: "Vehicles", icon: "🚗" },
  { id: "other_asset", label: "Other Assets", icon: "💎" },
];

const LIABILITY_CATS = [
  { id: "mortgage", label: "Mortgage", icon: "🏠" },
  { id: "student_loans", label: "Student Loans", icon: "🎓" },
  { id: "auto_loan", label: "Auto Loan", icon: "🚗" },
  { id: "credit_cards", label: "Credit Cards", icon: "💳" },
  { id: "personal_loan", label: "Personal Loans", icon: "📝" },
  { id: "medical_debt", label: "Medical Debt", icon: "🏥" },
  { id: "other_debt", label: "Other Debt", icon: "📦" },
];

const STORAGE_KEY = "pulsafi_dashboard";

const fmt = (n) => {
  if (n === undefined || n === null || isNaN(n)) return "$0";
  const abs = Math.abs(n);
  const formatted = abs >= 1000
    ? abs.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    : abs.toFixed(abs % 1 === 0 ? 0 : 2);
  return n < 0 ? `-$${formatted}` : `$${formatted}`;
};

const pct = (val, total) => total > 0 ? Math.round((val / total) * 100) : 0;

// ═══ SVG DONUT CHART ═══
function DonutChart({ slices, size = 180, thickness = 28, center }) {
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const total = slices.reduce((s, sl) => s + sl.value, 0);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background ring */}
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--bg-input)" strokeWidth={thickness} />
      {/* Slices */}
      {total > 0 && slices.filter(s => s.value > 0).map((sl, i) => {
        const pctVal = sl.value / total;
        const dashLen = pctVal * circumference;
        const el = (
          <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={sl.color} strokeWidth={thickness}
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={-offset}
            strokeLinecap="butt"
            style={{ transition: "stroke-dasharray 0.5s, stroke-dashoffset 0.5s", transform: "rotate(-90deg)", transformOrigin: "center" }}
          />
        );
        offset += dashLen;
        return el;
      })}
      {/* Center text */}
      {center && (
        <text x={size / 2} y={size / 2 - 6} textAnchor="middle" fill="var(--text-primary)" fontSize="22" fontWeight="700" fontFamily="'DM Mono', monospace">
          {center.value}
        </text>
      )}
      {center && center.label && (
        <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontWeight="500" fontFamily="'DM Sans', sans-serif">
          {center.label}
        </text>
      )}
    </svg>
  );
}

// ═══ MINI BAR ═══
function MiniBar({ value, max, color }) {
  const pctVal = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const over = value > max && max > 0;
  return (
    <div style={{ flex: 1, height: 8, background: "var(--bg-input)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
      <div style={{
        height: "100%", width: `${pctVal}%`, borderRadius: 4,
        background: over ? "#e74c3c" : color || "var(--accent)",
        transition: "width 0.4s",
      }} />
    </div>
  );
}

// ═══ AMOUNT INPUT ═══
function AmountInput({ value, onChange, placeholder }) {
  const [raw, setRaw] = useState(value ? String(value) : "");
  const [focused, setFocused] = useState(false);
  // Sync from parent only when NOT focused
  useEffect(() => {
    if (!focused) setRaw(value ? String(value) : "");
  }, [value, focused]);
  return (
    <input
      type="text" inputMode="decimal" placeholder={placeholder || "0"}
      value={raw}
      onFocus={(e) => { setFocused(true); e.target.select(); }}
      onBlur={() => {
        setFocused(false);
        const n = parseFloat(raw);
        if (isNaN(n) || n === 0) { setRaw(""); onChange(0); }
        else { setRaw(String(n)); onChange(n); }
      }}
      onKeyDown={e => {
        if (e.key === "Enter") {
          const n = parseFloat(raw);
          onChange(isNaN(n) ? 0 : n);
          e.target.blur();
        }
      }}
      onChange={e => {
        const v = e.target.value.replace(/[^0-9.]/g, "");
        setRaw(v);
        // Do NOT call parent onChange here — wait for blur
      }}
      style={{
        width: 100, padding: "7px 10px", borderRadius: 8,
        border: focused ? "1px solid var(--accent-border)" : "1px solid var(--border-input)",
        background: "var(--bg-input)",
        color: "var(--text-primary)", fontSize: 14, fontFamily: "'DM Mono', monospace",
        textAlign: "right", outline: "none", transition: "border-color 0.2s",
      }}
    />
  );
}

// ═══ LINE CHART ═══
function LineChart({ data: points, lines, height = 200, yPrefix = "$" }) {
  if (!points || points.length === 0) return null;
  const W = 100; // viewBox percentage width
  const H = height;
  const PAD = { top: 20, right: 10, bottom: 32, left: 55 };
  const cw = W; // We'll use percentages
  const plotW = 800 - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  // Find global min/max across all lines
  let allVals = [];
  lines.forEach(l => points.forEach(p => { if (p[l.key] !== undefined) allVals.push(p[l.key]); }));
  if (allVals.length === 0) return null;
  let minV = Math.min(...allVals);
  let maxV = Math.max(...allVals);
  if (minV === maxV) { minV -= 100; maxV += 100; }
  const range = maxV - minV;
  const niceMin = Math.floor(minV / 1000) * 1000;
  const niceMax = Math.ceil(maxV / 1000) * 1000;
  const niceRange = niceMax - niceMin || 1000;

  const xStep = points.length > 1 ? plotW / (points.length - 1) : plotW;
  const getX = (i) => PAD.left + i * xStep;
  const getY = (v) => PAD.top + plotH - ((v - niceMin) / niceRange) * plotH;

  // Grid lines
  const gridCount = 4;
  const gridLines = Array.from({ length: gridCount + 1 }, (_, i) => {
    const val = niceMin + (niceRange / gridCount) * i;
    return { val, y: getY(val) };
  });

  const fmtShort = (n) => {
    const abs = Math.abs(n);
    if (abs >= 1000000) return `${yPrefix}${(n / 1000000).toFixed(1)}M`;
    if (abs >= 1000) return `${yPrefix}${(n / 1000).toFixed(0)}K`;
    return `${yPrefix}${n}`;
  };

  return (
    <svg width="100%" height={H} viewBox={`0 0 800 ${H}`} preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}>
      {/* Grid */}
      {gridLines.map((g, i) => (
        <g key={i}>
          <line x1={PAD.left} y1={g.y} x2={800 - PAD.right} y2={g.y}
            stroke="var(--border)" strokeWidth="1" strokeDasharray={i === 0 ? "0" : "4 4"} />
          <text x={PAD.left - 8} y={g.y + 4} textAnchor="end" fill="var(--text-muted)"
            fontSize="11" fontFamily="'DM Mono', monospace">{fmtShort(g.val)}</text>
        </g>
      ))}

      {/* X axis labels */}
      {points.map((p, i) => (
        <text key={i} x={getX(i)} y={H - 6} textAnchor="middle" fill="var(--text-muted)"
          fontSize="10" fontFamily="'DM Sans', sans-serif">{p.label}</text>
      ))}

      {/* Lines */}
      {lines.map(line => {
        const pts = points.map((p, i) => ({ x: getX(i), y: getY(p[line.key] || 0) }));
        const pathD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
        // Area fill
        const areaD = pathD + ` L ${pts[pts.length - 1].x} ${PAD.top + plotH} L ${pts[0].x} ${PAD.top + plotH} Z`;
        return (
          <g key={line.key}>
            <path d={areaD} fill={line.color} opacity="0.06" />
            <path d={pathD} fill="none" stroke={line.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Dots */}
            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="4" fill="var(--bg-card)" stroke={line.color} strokeWidth="2.5" />
                {/* Tooltip on hover area */}
                <title>{`${line.label}: ${fmtShort(points[i][line.key] || 0)}`}</title>
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
const HISTORY_KEY = "pulsafi_dashboard_history";

export default function DashboardPage() {
  const [tab, setTab] = useState("overview");
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [chartMetric, setChartMetric] = useState("all");
  const [uploadResult, setUploadResult] = useState(null);
  const [snapshotSaved, setSnapshotSaved] = useState(false);
  const fileRef = useRef(null);

  // Load data + history
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) { setData(JSON.parse(saved)); }
      else {
        setData({
          income: INCOME_CATS.reduce((o, c) => ({ ...o, [c.id]: 0 }), {}),
          budget: EXPENSE_CATS.reduce((o, c) => ({ ...o, [c.id]: 0 }), {}),
          actual: EXPENSE_CATS.reduce((o, c) => ({ ...o, [c.id]: 0 }), {}),
          assets: ASSET_CATS.reduce((o, c) => ({ ...o, [c.id]: 0 }), {}),
          liabilities: LIABILITY_CATS.reduce((o, c) => ({ ...o, [c.id]: 0 }), {}),
          month: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        });
      }
    } catch {}
    try {
      const h = localStorage.getItem(HISTORY_KEY);
      if (h) setHistory(JSON.parse(h));
    } catch {}
  }, []);

  // Save data
  useEffect(() => {
    if (data) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
    }
  }, [data]);

  // Save history
  useEffect(() => {
    if (history.length > 0) {
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch {}
    }
  }, [history]);

  // Save a monthly snapshot
  const saveSnapshot = () => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const label = now.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    const tIncome = Object.values(data.income).reduce((s, v) => s + v, 0);
    const tActual = Object.values(data.actual).reduce((s, v) => s + v, 0);
    const tAssets = Object.values(data.assets).reduce((s, v) => s + v, 0);
    const tLiabilities = Object.values(data.liabilities).reduce((s, v) => s + v, 0);
    const snap = {
      key: monthKey, label,
      income: tIncome, spending: tActual,
      savings: tIncome - tActual,
      netWorth: tAssets - tLiabilities,
      assets: tAssets, liabilities: tLiabilities,
      date: now.toISOString(),
    };
    setHistory(prev => {
      const idx = prev.findIndex(h => h.key === monthKey);
      let next;
      if (idx >= 0) { next = [...prev]; next[idx] = snap; }
      else { next = [...prev, snap]; }
      next.sort((a, b) => a.key.localeCompare(b.key));
      return next.slice(-24);
    });
    setSnapshotSaved(true);
    setTimeout(() => setSnapshotSaved(false), 2500);
  };

  const deleteSnapshot = (key) => {
    setHistory(prev => {
      const next = prev.filter(h => h.key !== key);
      try { localStorage.setItem(HISTORY_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  if (!data) return null;

  const update = (section, id, val) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [id]: val } }));
  };

  // Computed
  const totalIncome = Object.values(data.income).reduce((s, v) => s + v, 0);
  const totalBudget = Object.values(data.budget).reduce((s, v) => s + v, 0);
  const totalActual = Object.values(data.actual).reduce((s, v) => s + v, 0);
  const totalAssets = Object.values(data.assets).reduce((s, v) => s + v, 0);
  const totalLiabilities = Object.values(data.liabilities).reduce((s, v) => s + v, 0);
  const netWorth = totalAssets - totalLiabilities;
  const netSavings = totalIncome - totalActual;
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  // Expense donut slices
  const expenseSlices = EXPENSE_CATS
    .filter(c => (data.actual[c.id] || 0) > 0)
    .map(c => ({ value: data.actual[c.id], color: c.color, label: c.label }));

  // Net worth donut
  const assetSlices = ASSET_CATS
    .filter(c => (data.assets[c.id] || 0) > 0)
    .map(c => ({ value: data.assets[c.id], color: "#2ecc71", label: c.label }));
  const liabilitySlices = LIABILITY_CATS
    .filter(c => (data.liabilities[c.id] || 0) > 0)
    .map(c => ({ value: data.liabilities[c.id], color: "#e74c3c", label: c.label }));

  // CSV Upload handler
  // ── Shared categorizer ──
  const catMap = [
    { keys: ["rent", "mortgage", "hoa", "property"], cat: "housing" },
    { keys: ["grocery", "trader joe", "whole foods", "costco", "kroger", "safeway", "walmart", "target", "aldi", "publix", "wegmans", "heb"], cat: "food" },
    { keys: ["uber", "lyft", "gas", "shell", "chevron", "parking", "transit", "metro", "exxon", "bp", "sunoco", "wawa"], cat: "transport" },
    { keys: ["electric", "water", "internet", "comcast", "att", "verizon", "pg&e", "utility", "xfinity", "spectrum", "t-mobile"], cat: "utilities" },
    { keys: ["insurance", "geico", "state farm", "allstate", "progressive", "usaa", "liberty mutual"], cat: "insurance" },
    { keys: ["doctor", "pharmacy", "cvs", "walgreens", "hospital", "medical", "dental", "optum", "labcorp", "quest"], cat: "health" },
    { keys: ["netflix", "spotify", "hulu", "disney", "hbo", "apple tv", "youtube", "peacock", "paramount", "audible"], cat: "subscriptions" },
    { keys: ["restaurant", "doordash", "grubhub", "ubereats", "chipotle", "starbucks", "coffee", "mcdonald", "chick-fil", "panera", "subway", "wendy", "taco bell", "dunkin"], cat: "dining" },
    { keys: ["amazon", "ebay", "etsy", "bestbuy", "nordstrom", "zara", "nike", "apple.com", "shein", "temu"], cat: "shopping" },
    { keys: ["gym", "salon", "barber", "spa", "beauty", "planet fitness", "equinox", "peloton"], cat: "personal" },
    { keys: ["tuition", "student", "course", "udemy", "book", "coursera", "chegg"], cat: "education" },
    { keys: ["transfer", "venmo", "zelle", "paypal", "cash app", "wire"], cat: "other_exp" },
  ];
  const categorize = (desc) => {
    const d = (desc || "").toLowerCase();
    for (const m of catMap) {
      if (m.keys.some(k => d.includes(k))) return m.cat;
    }
    return "other_exp";
  };

  // Apply categorized transactions to actual spending
  const applyTransactions = (txns) => {
    const catTotals = {};
    txns.forEach(t => { catTotals[t.cat] = (catTotals[t.cat] || 0) + t.amt; });
    const newActual = { ...data.actual };
    for (const [cat, total] of Object.entries(catTotals)) {
      newActual[cat] = Math.round(total * 100) / 100;
    }
    setData(prev => ({ ...prev, actual: newActual }));
    setUploadResult({ success: true, count: txns.length, categories: Object.keys(catTotals).length, format: txns._format || "csv" });
  };

  // ── CSV Upload ──
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadResult({ loading: true, format: "csv" });
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        const lines = text.split("\n").map(l => l.split(",").map(c => c.trim().replace(/^"|"$/g, "")));
        if (lines.length < 2) { setUploadResult({ error: "File appears empty" }); return; }
        const header = lines[0].map(h => h.toLowerCase());
        const amtIdx = header.findIndex(h => h.includes("amount") || h.includes("debit") || h.includes("withdrawal"));
        const descIdx = header.findIndex(h => h.includes("desc") || h.includes("memo") || h.includes("name") || h.includes("payee") || h.includes("merchant"));
        const dateIdx = header.findIndex(h => h.includes("date") || h.includes("posted"));
        if (amtIdx === -1) { setUploadResult({ error: "Could not find an 'Amount' column. Make sure your CSV has headers." }); return; }
        const txns = [];
        for (let i = 1; i < lines.length; i++) {
          const row = lines[i];
          if (row.length <= amtIdx) continue;
          let amt = parseFloat(row[amtIdx].replace(/[$,()]/g, ""));
          if (isNaN(amt) || amt === 0) continue;
          if (amt > 0) continue;
          amt = Math.abs(amt);
          const desc = descIdx >= 0 ? row[descIdx] : "";
          const cat = categorize(desc);
          txns.push({ desc, amt, cat });
        }
        txns._format = "csv";
        applyTransactions(txns);
      } catch (err) {
        setUploadResult({ error: "Could not parse CSV. Make sure the file has headers and is comma-separated." });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // ── PDF Upload ──
  const pdfFileRef = useRef(null);

  const handlePDFUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadResult({ loading: true, format: "pdf" });
    e.target.value = "";

    try {
      // Load pdf.js from CDN if not already loaded
      if (!window.pdfjsLib) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
          script.onload = () => {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
            resolve();
          };
          script.onerror = () => reject(new Error("Failed to load PDF library"));
          document.head.appendChild(script);
        });
      }

      // Read file as ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let allText = "";
      for (let p = 1; p <= pdf.numPages; p++) {
        const page = await pdf.getPage(p);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(" ");
        allText += pageText + "\n";
      }

      if (!allText.trim()) {
        setUploadResult({ error: "Could not extract text from PDF. The file might be scanned/image-based. Try a CSV export instead." });
        return;
      }

      // Parse transactions from extracted text
      const txns = parsePDFTransactions(allText);

      if (txns.length === 0) {
        setUploadResult({
          error: "Found text but couldn't identify transactions. This PDF format may not be supported yet. Try exporting as CSV from your bank.",
          pdfPreview: allText.substring(0, 500),
        });
        return;
      }

      txns._format = "pdf";
      applyTransactions(txns);
    } catch (err) {
      setUploadResult({ error: `PDF processing failed: ${err.message || "Unknown error"}. Try a CSV export instead.` });
    }
  };

  // Parse transaction lines from raw PDF text
  const parsePDFTransactions = (text) => {
    const txns = [];
    const lines = text.split("\n");

    // Common patterns in bank statements:
    // Pattern 1: "MM/DD/YYYY Description Amount" or "MM/DD Description $Amount"
    // Pattern 2: "Date Description Debit Credit"
    // Pattern 3: Lines with dollar amounts
    const datePattern = /(\d{1,2}[\/\-]\d{1,2}(?:[\/\-]\d{2,4})?)/;
    const amountPattern = /[\-]?\$?\d{1,3}(?:,\d{3})*\.\d{2}/g;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.length < 5) continue;

      // Find amounts in the line
      const amounts = trimmed.match(amountPattern);
      if (!amounts || amounts.length === 0) continue;

      // Check if line has a date (likely a transaction)
      const hasDate = datePattern.test(trimmed);
      if (!hasDate) continue;

      // Extract the description (text between date and first amount)
      const dateMatch = trimmed.match(datePattern);
      const firstAmtIdx = trimmed.indexOf(amounts[0]);
      let desc = "";
      if (dateMatch && firstAmtIdx > 0) {
        const dateEnd = trimmed.indexOf(dateMatch[0]) + dateMatch[0].length;
        desc = trimmed.substring(dateEnd, firstAmtIdx).trim();
      }

      // Use the last amount (often the running total is last, but debit is usually first or second)
      // For simplicity, use the first amount found
      for (const amtStr of amounts) {
        let amt = parseFloat(amtStr.replace(/[$,]/g, ""));
        if (isNaN(amt) || amt === 0) continue;

        // Negative = spending, or if it's in a "Debit" context
        const isDebit = amt < 0 || trimmed.toLowerCase().includes("debit") || trimmed.toLowerCase().includes("withdrawal") || trimmed.toLowerCase().includes("purchase");

        if (amt > 0 && !isDebit) continue; // Skip credits/deposits
        amt = Math.abs(amt);
        if (amt > 50000) continue; // Skip unreasonable amounts (likely account totals)

        const cat = categorize(desc);
        txns.push({ desc: desc || "Unknown", amt, cat });
        break; // Only take one amount per line
      }
    }

    // Deduplicate: if we got too many txns from one line being parsed multiple ways, take unique
    return txns;
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "budget", label: "Budget", icon: "📋" },
    { id: "networth", label: "Net Worth", icon: "💎" },
    { id: "upload", label: "Import", icon: "📤" },
  ];

  const SectionLabel = ({ children }) => (
    <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", fontWeight: 600, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </div>
  );

  const Card = ({ children, style }) => (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border-card)",
      borderRadius: 16, padding: "20px", ...style,
    }}>
      {children}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-main)", color: "var(--text-primary)", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Header />

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px 80px" }}>

        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontFamily: "'Playfair Display', serif", fontWeight: 900, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
            My Finances
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0 }}>
            {data.month} · Everything in one place
          </p>
        </div>

        {/* Tab Bar */}
        <div style={{
          display: "flex", gap: 4, padding: 4, background: "var(--bg-input)",
          borderRadius: 14, marginBottom: 24, border: "1px solid var(--border)",
        }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "10px 8px", borderRadius: 10, border: "none", cursor: "pointer",
              background: tab === t.id ? "var(--bg-card)" : "transparent",
              color: tab === t.id ? "var(--text-primary)" : "var(--text-muted)",
              fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600,
              boxShadow: tab === t.id ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}>
              <span style={{ fontSize: 14 }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════ OVERVIEW TAB ═══════════════════ */}
        {tab === "overview" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Hero Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {[
                { label: "Monthly Income", value: fmt(totalIncome), color: "#2ecc71", sub: "after tax" },
                { label: "Total Spending", value: fmt(totalActual), color: totalActual > totalIncome ? "#e74c3c" : "#e67e22", sub: `${pct(totalActual, totalIncome)}% of income` },
                { label: "Net Savings", value: fmt(netSavings), color: netSavings >= 0 ? "#2ecc71" : "#e74c3c", sub: `${savingsRate}% savings rate` },
                { label: "Net Worth", value: fmt(netWorth), color: netWorth >= 0 ? "var(--accent)" : "#e74c3c", sub: `${fmt(totalAssets)} - ${fmt(totalLiabilities)}` },
              ].map((s, i) => (
                <Card key={i} style={{ textAlign: "center", padding: "18px 12px" }}>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: s.color, fontFamily: "'DM Mono', monospace", lineHeight: 1.2 }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>{s.sub}</div>
                </Card>
              ))}
            </div>

            {/* ═══ TREND CHART ═══ */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
                <SectionLabel>Monthly Trends</SectionLabel>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {/* Metric toggle pills */}
                  {[
                    { id: "all", label: "All" },
                    { id: "netWorth", label: "Net Worth" },
                    { id: "income_spending", label: "Income vs Spending" },
                    { id: "savings", label: "Savings" },
                  ].map(m => (
                    <button key={m.id} onClick={() => setChartMetric(m.id)} style={{
                      padding: "4px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                      background: chartMetric === m.id ? "var(--accent-bg)" : "transparent",
                      color: chartMetric === m.id ? "var(--accent)" : "var(--text-muted)",
                      fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                      transition: "all 0.15s",
                    }}>{m.label}</button>
                  ))}
                </div>
              </div>

              {history.length >= 2 ? (
                <>
                  <LineChart
                    data={history}
                    lines={
                      chartMetric === "netWorth" ? [
                        { key: "netWorth", color: "var(--accent)", label: "Net Worth" },
                      ] :
                      chartMetric === "income_spending" ? [
                        { key: "income", color: "#2ecc71", label: "Income" },
                        { key: "spending", color: "#e74c3c", label: "Spending" },
                      ] :
                      chartMetric === "savings" ? [
                        { key: "savings", color: "#3498db", label: "Savings" },
                      ] :
                      [
                        { key: "netWorth", color: "var(--accent)", label: "Net Worth" },
                        { key: "income", color: "#2ecc71", label: "Income" },
                        { key: "spending", color: "#e74c3c", label: "Spending" },
                      ]
                    }
                    height={220}
                  />
                  {/* Legend */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 12 }}>
                    {(chartMetric === "all" ? [
                      { color: "var(--accent)", label: "Net Worth" },
                      { color: "#2ecc71", label: "Income" },
                      { color: "#e74c3c", label: "Spending" },
                    ] : chartMetric === "netWorth" ? [
                      { color: "var(--accent)", label: "Net Worth" },
                    ] : chartMetric === "income_spending" ? [
                      { color: "#2ecc71", label: "Income" },
                      { color: "#e74c3c", label: "Spending" },
                    ] : [
                      { color: "#3498db", label: "Savings" },
                    ]).map((l, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                        <div style={{ width: 10, height: 3, borderRadius: 2, background: l.color }} />
                        <span style={{ color: "var(--text-muted)" }}>{l.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: "center", padding: "24px 16px" }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 4 }}>
                    {history.length === 1 ? "One snapshot saved — save one more to see trends!" : "No data yet — save your first monthly snapshot"}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    Save a snapshot at the end of each month to track your progress over time.
                  </div>
                </div>
              )}

              {/* Save Snapshot Button */}
              <div style={{ marginTop: 16, display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  {history.length > 0
                    ? `${history.length} snapshot${history.length !== 1 ? "s" : ""} saved · Last: ${history[history.length - 1].label}`
                    : "Save a snapshot to start tracking trends"}
                </div>
                <button onClick={saveSnapshot} style={{
                  padding: "8px 18px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: snapshotSaved ? "rgba(46,204,113,0.15)" : "linear-gradient(135deg, var(--accent), var(--accent-dark))",
                  color: snapshotSaved ? "#2ecc71" : "var(--bg-main)",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13,
                  transition: "all 0.2s",
                }}>
                  {snapshotSaved ? "✓ Saved!" : "📸 Save This Month"}
                </button>
              </div>
            </Card>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

              {/* Spending Breakdown */}
              <Card>
                <SectionLabel>Spending Breakdown</SectionLabel>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <DonutChart
                    slices={expenseSlices.length > 0 ? expenseSlices : [{ value: 1, color: "var(--bg-input)" }]}
                    size={150} thickness={24}
                    center={{ value: fmt(totalActual), label: "spent" }}
                  />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                    {expenseSlices.slice(0, 6).map((sl, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: sl.color, flexShrink: 0 }} />
                        <span style={{ flex: 1, color: "var(--text-secondary)" }}>{sl.label}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", color: "var(--text-primary)", fontWeight: 600 }}>{fmt(sl.value)}</span>
                      </div>
                    ))}
                    {expenseSlices.length === 0 && (
                      <div style={{ fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>Add spending in the Budget tab</div>
                    )}
                  </div>
                </div>
              </Card>

              {/* Budget vs Actual */}
              <Card>
                <SectionLabel>Budget vs. Actual</SectionLabel>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <DonutChart
                    slices={[
                      { value: Math.min(totalActual, totalBudget), color: totalActual <= totalBudget ? "#2ecc71" : "#e67e22" },
                      { value: Math.max(0, totalBudget - totalActual), color: "var(--bg-input)" },
                    ]}
                    size={150} thickness={24}
                    center={{
                      value: totalBudget > 0 ? `${pct(totalActual, totalBudget)}%` : "—",
                      label: totalActual > totalBudget && totalBudget > 0 ? "over budget!" : "of budget"
                    }}
                  />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Budgeted</div>
                      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{fmt(totalBudget)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Spent</div>
                      <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: totalActual > totalBudget ? "#e74c3c" : "#2ecc71" }}>{fmt(totalActual)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>Remaining</div>
                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "'DM Mono', monospace", color: totalBudget - totalActual >= 0 ? "#2ecc71" : "#e74c3c" }}>
                        {fmt(totalBudget - totalActual)}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Category Bars */}
            <Card>
              <SectionLabel>Category Breakdown</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {EXPENSE_CATS.filter(c => (data.budget[c.id] || 0) > 0 || (data.actual[c.id] || 0) > 0).map(c => {
                  const budgeted = data.budget[c.id] || 0;
                  const actual = data.actual[c.id] || 0;
                  const over = actual > budgeted && budgeted > 0;
                  return (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 16, width: 24, textAlign: "center" }}>{c.icon}</span>
                      <span style={{ fontSize: 13, color: "var(--text-secondary)", width: 120, flexShrink: 0 }}>{c.label}</span>
                      <MiniBar value={actual} max={budgeted || actual} color={over ? "#e74c3c" : c.color} />
                      <span style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: over ? "#e74c3c" : "var(--text-primary)", width: 65, textAlign: "right", fontWeight: 600 }}>
                        {fmt(actual)}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--text-muted)", width: 55, textAlign: "right" }}>
                        / {budgeted > 0 ? fmt(budgeted) : "—"}
                      </span>
                    </div>
                  );
                })}
                {EXPENSE_CATS.every(c => !data.budget[c.id] && !data.actual[c.id]) && (
                  <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: 20 }}>
                    Head to the <button onClick={() => setTab("budget")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" }}>Budget tab</button> to start building your budget
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* ═══════════════════ BUDGET TAB ═══════════════════ */}
        {tab === "budget" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Income Section */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <SectionLabel>Monthly Income</SectionLabel>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#2ecc71", fontFamily: "'DM Mono', monospace" }}>{fmt(totalIncome)}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {INCOME_CATS.map(c => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16, width: 28, textAlign: "center" }}>{c.icon}</span>
                    <span style={{ flex: 1, fontSize: 14, color: "var(--text-secondary)" }}>{c.label}</span>
                    <AmountInput value={data.income[c.id]} onChange={v => update("income", c.id, v)} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Budget + Actual Side by Side */}
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <SectionLabel>Monthly Expenses — Budget vs. Actual</SectionLabel>
                <div style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Budget: <strong style={{ color: "var(--text-primary)" }}>{fmt(totalBudget)}</strong></span>
                  <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Actual: <strong style={{ color: totalActual > totalBudget ? "#e74c3c" : "#2ecc71" }}>{fmt(totalActual)}</strong></span>
                </div>
              </div>

              {/* Column Headers */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, padding: "0 0 8px", borderBottom: "1px solid var(--border)" }}>
                <span style={{ width: 28 }}></span>
                <span style={{ flex: 1, fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Category</span>
                <span style={{ width: 100, fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "right" }}>Budget</span>
                <span style={{ width: 100, fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "right" }}>Actual</span>
                <span style={{ width: 60, fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "right" }}>Status</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {EXPENSE_CATS.map(c => {
                  const b = data.budget[c.id] || 0;
                  const a = data.actual[c.id] || 0;
                  const diff = b - a;
                  return (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 16, width: 28, textAlign: "center" }}>{c.icon}</span>
                      <span style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{c.label}</span>
                      <AmountInput value={data.budget[c.id]} onChange={v => update("budget", c.id, v)} />
                      <AmountInput value={data.actual[c.id]} onChange={v => update("actual", c.id, v)} />
                      <span style={{
                        width: 60, textAlign: "right", fontSize: 12, fontWeight: 600,
                        fontFamily: "'DM Mono', monospace",
                        color: b === 0 && a === 0 ? "var(--text-muted)" : diff >= 0 ? "#2ecc71" : "#e74c3c",
                      }}>
                        {b === 0 && a === 0 ? "—" : diff >= 0 ? `+${fmt(diff)}` : fmt(diff)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Totals Row */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12, paddingTop: 12, borderTop: "2px solid var(--border)" }}>
                <span style={{ width: 28 }}></span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Total</span>
                <span style={{ width: 100, textAlign: "right", fontSize: 15, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{fmt(totalBudget)}</span>
                <span style={{ width: 100, textAlign: "right", fontSize: 15, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: totalActual > totalBudget ? "#e74c3c" : "#2ecc71" }}>{fmt(totalActual)}</span>
                <span style={{
                  width: 60, textAlign: "right", fontSize: 13, fontWeight: 700,
                  fontFamily: "'DM Mono', monospace",
                  color: totalBudget - totalActual >= 0 ? "#2ecc71" : "#e74c3c",
                }}>
                  {totalBudget - totalActual >= 0 ? "+" : ""}{fmt(totalBudget - totalActual)}
                </span>
              </div>
            </Card>

            {/* Savings Rate Callout */}
            {totalIncome > 0 && (
              <Card style={{
                background: savingsRate >= 20 ? "linear-gradient(135deg, rgba(46,204,113,0.08), rgba(46,204,113,0.02))" : savingsRate >= 0 ? "var(--bg-card)" : "linear-gradient(135deg, rgba(231,76,60,0.08), rgba(231,76,60,0.02))",
                border: savingsRate >= 20 ? "1px solid rgba(46,204,113,0.25)" : savingsRate < 0 ? "1px solid rgba(231,76,60,0.25)" : "1px solid var(--border-card)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: 36, fontWeight: 700, fontFamily: "'DM Mono', monospace", color: savingsRate >= 20 ? "#2ecc71" : savingsRate >= 0 ? "var(--accent)" : "#e74c3c" }}>
                  {savingsRate}%
                </div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                  {savingsRate >= 50 ? "🔥 Incredible savings rate — FIRE territory!" :
                   savingsRate >= 20 ? "💪 Strong savings rate — you're building wealth" :
                   savingsRate >= 10 ? "👍 Decent start — aim for 20%+ to accelerate growth" :
                   savingsRate >= 0 ? "⚠️ Low savings rate — find expenses to cut" :
                   "🚨 Spending more than you earn — time to reassess"}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ═══════════════════ NET WORTH TAB ═══════════════════ */}
        {tab === "networth" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Net Worth Hero */}
            <Card style={{ textAlign: "center", padding: "28px 20px" }}>
              <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Your Net Worth</div>
              <div style={{
                fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 700,
                fontFamily: "'DM Mono', monospace",
                color: netWorth >= 0 ? "var(--accent)" : "#e74c3c",
                letterSpacing: "-0.02em",
              }}>
                {fmt(netWorth)}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Assets</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#2ecc71", fontFamily: "'DM Mono', monospace" }}>{fmt(totalAssets)}</div>
                </div>
                <div style={{ width: 1, background: "var(--border)" }} />
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Liabilities</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#e74c3c", fontFamily: "'DM Mono', monospace" }}>{fmt(totalLiabilities)}</div>
                </div>
              </div>
            </Card>

            {/* Assets + Liabilities */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <SectionLabel>Assets (what you own)</SectionLabel>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#2ecc71", fontFamily: "'DM Mono', monospace" }}>{fmt(totalAssets)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {ASSET_CATS.map(c => (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 15, width: 24, textAlign: "center" }}>{c.icon}</span>
                      <span style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{c.label}</span>
                      <AmountInput value={data.assets[c.id]} onChange={v => update("assets", c.id, v)} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <SectionLabel>Liabilities (what you owe)</SectionLabel>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#e74c3c", fontFamily: "'DM Mono', monospace" }}>{fmt(totalLiabilities)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {LIABILITY_CATS.map(c => (
                    <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 15, width: 24, textAlign: "center" }}>{c.icon}</span>
                      <span style={{ flex: 1, fontSize: 13, color: "var(--text-secondary)" }}>{c.label}</span>
                      <AmountInput value={data.liabilities[c.id]} onChange={v => update("liabilities", c.id, v)} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Net Worth Visual */}
            {totalAssets > 0 && (
              <Card>
                <SectionLabel>Asset Allocation</SectionLabel>
                <div style={{ display: "flex", height: 32, borderRadius: 8, overflow: "hidden", gap: 2 }}>
                  {ASSET_CATS.filter(c => (data.assets[c.id] || 0) > 0).map(c => {
                    const val = data.assets[c.id];
                    const pctVal = (val / totalAssets) * 100;
                    const colors = ["#2ecc71", "#3498db", "#f0c040", "#e67e22", "#9b59b6", "#1abc9c", "#e74c3c", "#00bcd4"];
                    const ci = ASSET_CATS.indexOf(c);
                    return (
                      <div key={c.id} title={`${c.label}: ${fmt(val)} (${Math.round(pctVal)}%)`}
                        style={{
                          width: `${pctVal}%`, background: colors[ci % colors.length],
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, color: "#fff", fontWeight: 600, minWidth: pctVal > 8 ? "auto" : 0,
                          cursor: "default", transition: "width 0.4s",
                        }}>
                        {pctVal > 12 && `${c.icon} ${Math.round(pctVal)}%`}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
                  {ASSET_CATS.filter(c => (data.assets[c.id] || 0) > 0).map(c => {
                    const colors = ["#2ecc71", "#3498db", "#f0c040", "#e67e22", "#9b59b6", "#1abc9c", "#e74c3c", "#00bcd4"];
                    const ci = ASSET_CATS.indexOf(c);
                    return (
                      <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: colors[ci % colors.length] }} />
                        <span style={{ color: "var(--text-secondary)" }}>{c.label}</span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{fmt(data.assets[c.id])}</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ═══════════════════ UPLOAD TAB ═══════════════════ */}
        {tab === "upload" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Upload Area */}
            <Card style={{ padding: "32px 24px" }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📄</div>
                <h2 style={{ fontSize: 20, fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: "0 0 6px" }}>
                  Import Bank Statement
                </h2>
                <p style={{ fontSize: 14, color: "var(--text-muted)", margin: 0, maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
                  Upload a CSV or PDF statement. We'll extract transactions and auto-categorize your spending.
                </p>
              </div>

              {/* Two upload options side by side */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 480, margin: "0 auto 20px" }}>

                {/* CSV Upload */}
                <div>
                  <input ref={fileRef} type="file" accept=".csv,.tsv" onChange={handleCSVUpload} style={{ display: "none" }} />
                  <button onClick={() => fileRef.current?.click()} style={{
                    width: "100%", padding: "20px 16px", borderRadius: 14,
                    border: "2px dashed var(--accent-border)",
                    background: "var(--accent-bg)", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = "rgba(201,162,39,0.15)"; e.currentTarget.style.borderStyle = "solid"; }}
                    onMouseOut={e => { e.currentTarget.style.background = "var(--accent-bg)"; e.currentTarget.style.borderStyle = "dashed"; }}
                  >
                    <span style={{ fontSize: 28 }}>📊</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)" }}>CSV File</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Best accuracy</span>
                  </button>
                </div>

                {/* PDF Upload */}
                <div>
                  <input ref={pdfFileRef} type="file" accept=".pdf" onChange={handlePDFUpload} style={{ display: "none" }} />
                  <button onClick={() => pdfFileRef.current?.click()} style={{
                    width: "100%", padding: "20px 16px", borderRadius: 14,
                    border: "2px dashed rgba(52,152,219,0.4)",
                    background: "rgba(52,152,219,0.06)", cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                  }}
                    onMouseOver={e => { e.currentTarget.style.background = "rgba(52,152,219,0.12)"; e.currentTarget.style.borderStyle = "solid"; }}
                    onMouseOut={e => { e.currentTarget.style.background = "rgba(52,152,219,0.06)"; e.currentTarget.style.borderStyle = "dashed"; }}
                  >
                    <span style={{ fontSize: 28 }}>📑</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "#3498db" }}>PDF Statement</span>
                    <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Auto-converted</span>
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {uploadResult && uploadResult.loading && (
                <div style={{ textAlign: "center", padding: 16 }}>
                  <div style={{ fontSize: 24, marginBottom: 8, animation: "pulse-ring 1s ease-in-out infinite" }}>
                    {uploadResult.format === "pdf" ? "📑" : "📊"}
                  </div>
                  <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
                    {uploadResult.format === "pdf" ? "Extracting text from PDF..." : "Processing CSV..."}
                  </div>
                </div>
              )}

              {uploadResult && uploadResult.success && (
                <div style={{ padding: 16, background: "rgba(46,204,113,0.08)", borderRadius: 12, border: "1px solid rgba(46,204,113,0.2)" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#2ecc71", marginBottom: 4 }}>
                    ✓ Import Successful! {uploadResult.format === "pdf" && <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>(from PDF)</span>}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    Processed <strong>{uploadResult.count}</strong> transactions across <strong>{uploadResult.categories}</strong> categories.
                    Check the <button onClick={() => setTab("budget")} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 600, fontSize: 13, fontFamily: "'DM Sans', sans-serif", textDecoration: "underline" }}>Budget tab</button> to see your actual spending.
                  </div>
                </div>
              )}

              {uploadResult && uploadResult.error && (
                <div style={{ padding: 16, background: "rgba(231,76,60,0.08)", borderRadius: 12, border: "1px solid rgba(231,76,60,0.2)" }}>
                  <div style={{ fontSize: 14, color: "#e74c3c", marginBottom: uploadResult.pdfPreview ? 10 : 0 }}>❌ {uploadResult.error}</div>
                  {uploadResult.pdfPreview && (
                    <details style={{ marginTop: 8 }}>
                      <summary style={{ fontSize: 12, color: "var(--text-muted)", cursor: "pointer" }}>Show extracted text preview</summary>
                      <pre style={{
                        marginTop: 8, padding: 12, background: "var(--bg-input)", borderRadius: 8,
                        fontSize: 10, color: "var(--text-muted)", whiteSpace: "pre-wrap", wordBreak: "break-all",
                        maxHeight: 200, overflow: "auto", fontFamily: "'DM Mono', monospace",
                      }}>
                        {uploadResult.pdfPreview}
                      </pre>
                    </details>
                  )}
                </div>
              )}
            </Card>

            {/* Format Comparison */}
            <Card>
              <SectionLabel>CSV vs PDF — Which Should I Use?</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
                    📊 CSV <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "rgba(46,204,113,0.15)", color: "#2ecc71", fontWeight: 600 }}>Recommended</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    Structured data with clear columns. Most accurate import. Available from most bank websites under "Export" or "Download Transactions."
                  </div>
                </div>
                <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(52,152,219,0.05)", border: "1px solid rgba(52,152,219,0.15)" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#3498db", marginBottom: 8 }}>
                    📑 PDF
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                    We extract text and find transaction patterns automatically. Works with most digital bank statements. Scanned/image PDFs are not supported.
                  </div>
                </div>
              </div>
            </Card>

            {/* How it works */}
            <Card>
              <SectionLabel>How It Works</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { step: "1", title: "Export from your bank", desc: "Download transactions as CSV (most accurate) or grab your PDF statement. Look for \"Export,\" \"Download,\" or \"Statements\" in your online banking." },
                  { step: "2", title: "Upload the file", desc: "Choose CSV or PDF above. PDFs are automatically converted — text is extracted and transactions are identified by pattern matching." },
                  { step: "3", title: "Auto-categorized", desc: "We match merchant names to 17 categories (Housing, Food, Transport, etc.) using 80+ keyword patterns. Adjust any amounts manually in the Budget tab." },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", gap: 14 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                      background: "var(--accent-bg)", display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--accent)", fontWeight: 700, fontSize: 14, fontFamily: "'DM Mono', monospace",
                    }}>{s.step}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{s.title}</div>
                      <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Supported Banks */}
            <Card>
              <SectionLabel>Works With Most Banks</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {["Chase", "Bank of America", "Wells Fargo", "Citi", "Capital One", "US Bank", "PNC", "TD Bank", "Ally", "Discover", "American Express", "USAA", "Navy Federal", "Charles Schwab", "Fidelity", "Marcus", "Chime", "SoFi"].map(bank => (
                  <span key={bank} style={{
                    padding: "5px 12px", borderRadius: 8, fontSize: 12,
                    background: "var(--bg-input)", border: "1px solid var(--border)",
                    color: "var(--text-secondary)", fontWeight: 500,
                  }}>{bank}</span>
                ))}
              </div>
            </Card>

            {/* Privacy note */}
            <Card style={{
              background: "linear-gradient(135deg, rgba(201,162,39,0.05), transparent)",
              border: "1px solid rgba(201,162,39,0.15)", textAlign: "center", padding: "20px 24px",
            }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🔒</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>100% Private — Processed Locally</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", maxWidth: 400, margin: "0 auto" }}>
                Your bank statements are parsed entirely in your browser. No data is uploaded to any server. PDF text extraction happens on-device using an open-source library. Your financial data never leaves your computer.
              </div>
            </Card>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}

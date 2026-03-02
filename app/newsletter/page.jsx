'use client';

// app/newsletter/page.jsx
// The Pulse — Pulsafi weekly newsletter subscribe page
// Route: pulsafi.com/newsletter

import { useState } from 'react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Something went wrong.');
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
        setFirstName('');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main style={styles.page}>

      {/* Background grid */}
      <div style={styles.grid} aria-hidden="true" />
      <div style={styles.glowOrb} aria-hidden="true" />

      {/* Ticker */}
      <div style={styles.tickerWrap}>
        <div style={styles.tickerInner}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={styles.tickerItem}>
              {item.label}&nbsp;<span style={styles.tickerGreen}>{item.tag}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={styles.wrapper}>

        {/* Topbar */}
        <div style={styles.topbar}>
          <a href="https://pulsafi.com" style={styles.logo}>PULSAFI.COM</a>
          <span style={styles.badge}>FREE · EVERY SUNDAY</span>
        </div>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Hero */}
        <div style={styles.hero}>
          <span style={styles.tagLine}>Weekly Finance Newsletter</span>
          <h1 style={styles.h1}>
            The <span style={styles.green}>Pulse</span>
          </h1>
          <p style={styles.subtitle}>
            Smart money moves, market analysis, and actionable wealth-building strategies —
            delivered every Sunday. Free forever, no spam.
          </p>
        </div>

        {/* Stats */}
        <div style={styles.statsRow}>
          {STATS.map((s) => (
            <div key={s.label} style={styles.stat}>
              <span style={styles.statNum}>{s.num}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Feature cards */}
        <div style={styles.features}>
          {FEATURES.map((f) => (
            <div key={f.title} style={styles.featureCard}>
              <span style={styles.featureIcon}>{f.icon}</span>
              <div>
                <strong style={styles.featureTitle}>{f.title}</strong>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe form */}
        <div style={styles.formBlock}>
          <span style={styles.formLabel}>Subscribe — It&apos;s Free</span>

          {status === 'success' ? (
            <div style={styles.successMsg}>
              ✓ &nbsp;You&apos;re in! Check your inbox this Sunday.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputRow}>
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  style={{
                    ...styles.btn,
                    opacity: status === 'loading' ? 0.7 : 1,
                    cursor: status === 'loading' ? 'wait' : 'pointer',
                  }}
                >
                  {status === 'loading' ? '...' : 'Subscribe →'}
                </button>
              </div>
              {status === 'error' && (
                <p style={styles.errorMsg}>{errorMsg}</p>
              )}
            </form>
          )}

          <p style={styles.privacyNote}>🔒 No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>

        {/* Links */}
        <div style={styles.linksSection}>
          <div style={styles.linksTitle}>Explore Pulsafi</div>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={styles.linkPill}>
              <span>{l.icon}&nbsp; {l.label}</span>
              <span style={styles.linkArrow}>→</span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p>
            © 2026 Pulsafi ·{' '}
            <a href="/privacy" style={styles.footerLink}>Privacy</a> ·{' '}
            <a href="/terms" style={styles.footerLink}>Terms</a> ·{' '}
            <a href="/contact" style={styles.footerLink}>Contact</a>
          </p>
        </footer>

      </div>

      {/* Ticker animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Sora:wght@300;400;600;700;800&display=swap');
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pulse-main * { box-sizing: border-box; }
        .feature-card:hover { border-color: rgba(0,230,118,0.3) !important; }
        .link-pill:hover { border-color: rgba(0,230,118,0.3) !important; background: #141a1d !important; }
        input:focus { border-color: #00e676 !important; box-shadow: 0 0 0 3px rgba(0,230,118,0.12) !important; outline: none !important; }
      `}</style>

    </main>
  );
}

// ── Data ───────────────────────────────────────────────

const TICKER_ITEMS = [
  { label: 'COMPOUND INTEREST CALCULATOR', tag: '↑ FREE' },
  { label: 'FIRE CALCULATOR', tag: '↑ TRY NOW' },
  { label: 'MORTGAGE PLANNER', tag: '↑ NO SIGNUP' },
  { label: 'DEBT SNOWBALL', tag: '↑ TOOL' },
  { label: 'INVESTMENT RETURNS', tag: '↑ MODEL IT' },
  { label: 'CRYPTO PLANNER', tag: '↑ PULSAFI' },
];

const STATS = [
  { num: '100%', label: 'Free Forever' },
  { num: '1×', label: 'Per Week' },
  { num: '0', label: 'Paywalls' },
  { num: '0', label: 'Data Sold' },
];

const FEATURES = [
  { icon: '📈', title: 'Market Insights', desc: 'Curated breakdowns of what\'s moving markets and what it means for your money.' },
  { icon: '🛠️', title: 'Tool Spotlights', desc: 'Deep dives on Pulsafi\'s free calculators — compound interest, FIRE, mortgage, and more.' },
  { icon: '💡', title: 'Actionable Strategies', desc: 'Practical steps you can take this week to improve your financial position.' },
];

const LINKS = [
  { href: '/tools', icon: '🧮', label: 'Free Financial Calculators' },
  { href: '/learn', icon: '📚', label: 'Learn Personal Finance' },
  { href: '/play', icon: '🎮', label: 'Finance Games & Simulations' },
  { href: '/resources', icon: '📂', label: 'Resources & Guides' },
];

// ── Styles ─────────────────────────────────────────────

const styles = {
  page: {
    background: '#0a0d0f',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Sora', 'Helvetica Neue', sans-serif",
    color: '#e8edf0',
    position: 'relative',
    overflow: 'hidden',
  },
  grid: {
    position: 'fixed',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(0,230,118,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,230,118,0.03) 1px,transparent 1px)',
    backgroundSize: '48px 48px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  glowOrb: {
    position: 'fixed',
    top: '-200px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '700px',
    height: '500px',
    background: 'radial-gradient(ellipse,rgba(0,230,118,0.08) 0%,transparent 70%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  tickerWrap: {
    overflow: 'hidden',
    borderTop: '1px solid #1e2529',
    borderBottom: '1px solid #1e2529',
    padding: '10px 0',
    background: '#111518',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  tickerInner: {
    display: 'flex',
    gap: '48px',
    animation: 'ticker 22s linear infinite',
    width: 'max-content',
    paddingLeft: '48px',
  },
  tickerItem: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#4a5f6b',
    whiteSpace: 'nowrap',
  },
  tickerGreen: { color: '#00e676' },
  wrapper: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '560px',
    padding: '48px 24px 80px',
    display: 'flex',
    flexDirection: 'column',
    gap: '36px',
    animation: 'fadeIn 0.5s ease both',
  },
  topbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '13px',
    fontWeight: 700,
    color: '#00e676',
    letterSpacing: '0.08em',
    textDecoration: 'none',
  },
  badge: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#4a5f6b',
    border: '1px solid #1e2529',
    padding: '4px 10px',
    borderRadius: '999px',
  },
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg,#00e676,transparent)',
    marginTop: '-16px',
  },
  hero: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  tagLine: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#00e676',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  h1: {
    fontSize: 'clamp(2.2rem, 8vw, 3.2rem)',
    fontWeight: 800,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    margin: 0,
  },
  green: { color: '#00e676' },
  subtitle: {
    fontSize: '1rem',
    fontWeight: 300,
    color: '#6b7c88',
    lineHeight: 1.7,
    margin: 0,
  },
  statsRow: {
    display: 'flex',
    border: '1px solid #1e2529',
    borderRadius: '12px',
    overflow: 'hidden',
    background: '#111518',
  },
  stat: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderRight: '1px solid #1e2529',
  },
  statNum: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#00e676',
  },
  statLabel: {
    fontSize: '0.65rem',
    color: '#4a5f6b',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  featureCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    padding: '16px',
    background: '#111518',
    border: '1px solid #1e2529',
    borderRadius: '10px',
    transition: 'border-color 0.2s',
  },
  featureIcon: { fontSize: '1.2rem', flexShrink: 0, marginTop: '1px' },
  featureTitle: { fontSize: '0.88rem', fontWeight: 600, display: 'block', marginBottom: '3px' },
  featureDesc: { fontSize: '0.8rem', color: '#6b7c88', lineHeight: 1.5, margin: 0 },
  formBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  formLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.75rem',
    color: '#4a5f6b',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '8px' },
  inputRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: '140px',
    background: '#111518',
    border: '1px solid #1e2529',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#e8edf0',
    fontFamily: "'Sora', sans-serif",
    fontSize: '0.85rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  btn: {
    background: '#00e676',
    color: '#060d09',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 20px',
    fontFamily: "'Sora', sans-serif",
    fontSize: '0.88rem',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    transition: 'background 0.2s',
  },
  successMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 18px',
    background: 'rgba(0,230,118,0.08)',
    border: '1px solid rgba(0,230,118,0.25)',
    borderRadius: '8px',
    fontSize: '0.88rem',
    color: '#00e676',
  },
  errorMsg: {
    fontSize: '0.8rem',
    color: '#ff4d6d',
    margin: 0,
  },
  privacyNote: {
    fontSize: '0.72rem',
    color: '#4a5f6b',
    margin: 0,
  },
  linksSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  linksTitle: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    color: '#4a5f6b',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '4px',
  },
  linkPill: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '13px 16px',
    background: '#111518',
    border: '1px solid #1e2529',
    borderRadius: '8px',
    textDecoration: 'none',
    color: '#e8edf0',
    fontSize: '0.85rem',
    transition: 'border-color 0.2s, background 0.2s',
  },
  linkArrow: {
    fontFamily: "'DM Mono', monospace",
    color: '#00e676',
    fontSize: '0.75rem',
  },
  footer: {
    textAlign: 'center',
    fontFamily: "'DM Mono', monospace",
    fontSize: '0.72rem',
    color: '#2e3e47',
    borderTop: '1px solid #1e2529',
    paddingTop: '24px',
  },
  footerLink: {
    color: '#2e3e47',
    textDecoration: 'none',
  },
};

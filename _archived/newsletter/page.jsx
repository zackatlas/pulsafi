'use client';

// app/newsletter/page.jsx
// The Pulse — Pulsafi weekly newsletter subscribe page
// Route: pulsafi.com/newsletter
// Subscribe links point to Kit (ConvertKit) — update KIT_SUBSCRIBE_URL below

const KIT_SUBSCRIBE_URL = 'https://the-pulse-5.kit.com/37d1c84aa2';

export default function NewsletterPage() {
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

        {/* Topbar / Nav */}
        <nav style={styles.topbar}>
          <a href="https://pulsafi.com" style={styles.logo}>PULSAFI.COM</a>
          <div style={styles.navLinks}>
            <a href="/tools" style={styles.navLink}>Tools</a>
            <a href="/learn" style={styles.navLink}>Learn</a>
            <a href="/newsletter" style={styles.navLinkActive}>Newsletter</a>
            <a href="/resources" style={styles.navLink}>Resources</a>
            <a
              href={KIT_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.navSubscribeBtn}
            >
              Subscribe
            </a>
          </div>
        </nav>

        {/* Mobile nav row */}
        <div style={styles.mobileNav}>
          <a href="/tools" style={styles.mobileNavLink}>Tools</a>
          <a href="/learn" style={styles.mobileNavLink}>Learn</a>
          <a href="/newsletter" style={styles.mobileNavLinkActive}>Newsletter</a>
          <a href="/resources" style={styles.mobileNavLink}>Resources</a>
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
          <a
            href={KIT_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.heroCta}
          >
            Subscribe Free →
          </a>
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
            <div key={f.title} style={styles.featureCard} className="feature-card">
              <span style={styles.featureIcon}>{f.icon}</span>
              <div>
                <strong style={styles.featureTitle}>{f.title}</strong>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe CTA (replaces form — links to Kit) */}
        <div style={styles.formBlock}>
          <span style={styles.formLabel}>Join The Pulse — It&apos;s Free</span>
          <a
            href={KIT_SUBSCRIBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.subscribeBlock}
          >
            <div style={styles.subscribeBlockInner}>
              <div>
                <span style={styles.subscribeBlockTitle}>Subscribe on Kit</span>
                <span style={styles.subscribeBlockDesc}>
                  Enter your email on our Kit page and you&apos;re in. Takes 10 seconds.
                </span>
              </div>
              <span style={styles.subscribeBlockArrow}>→</span>
            </div>
          </a>
          <p style={styles.privacyNote}>🔒 No spam. Unsubscribe anytime. We respect your privacy.</p>
        </div>

        {/* Links */}
        <div style={styles.linksSection}>
          <div style={styles.linksTitle}>Explore Pulsafi</div>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              style={styles.linkPill}
              className="link-pill"
            >
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

      {/* Animations & responsive */}
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
        @media (max-width: 640px) {
          nav[style] > div:last-child:not([class]) {
            display: none !important;
          }
        }
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
  { href: '/tools', icon: '🧮', label: 'Free Financial Calculators', external: false },
  { href: '/learn', icon: '📚', label: 'Learn Personal Finance', external: false },
  { href: '/play', icon: '🎮', label: 'Finance Games & Simulations', external: false },
  { href: '/resources', icon: '📂', label: 'Resources & Guides', external: false },
  { href: KIT_SUBSCRIBE_URL, icon: '✉️', label: 'Subscribe to The Pulse', external: true },
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

  /* ── Nav ─── */
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
    flexShrink: 0,
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  navLink: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#4a5f6b',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#00e676',
    textDecoration: 'none',
    letterSpacing: '0.04em',
  },
  navSubscribeBtn: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    fontWeight: 500,
    color: '#060d09',
    background: '#00e676',
    padding: '5px 12px',
    borderRadius: '6px',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s',
  },
  mobileNav: {
    display: 'none', // hidden on desktop; you can toggle via media query or JS
    gap: '12px',
    justifyContent: 'center',
    marginTop: '-24px',
  },
  mobileNavLink: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#4a5f6b',
    textDecoration: 'none',
  },
  mobileNavLinkActive: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '11px',
    color: '#00e676',
    textDecoration: 'none',
  },

  /* ── Divider ─── */
  divider: {
    height: '1px',
    background: 'linear-gradient(90deg,#00e676,transparent)',
    marginTop: '-16px',
  },

  /* ── Hero ─── */
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
  heroCta: {
    display: 'inline-flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    background: '#00e676',
    color: '#060d09',
    border: 'none',
    borderRadius: '8px',
    padding: '13px 24px',
    fontFamily: "'Sora', sans-serif",
    fontSize: '0.9rem',
    fontWeight: 700,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'background 0.2s',
    marginTop: '4px',
  },

  /* ── Stats ─── */
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

  /* ── Features ─── */
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

  /* ── Subscribe CTA (Kit link) ─── */
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
  subscribeBlock: {
    textDecoration: 'none',
    color: 'inherit',
  },
  subscribeBlockInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    padding: '20px',
    background: 'rgba(0,230,118,0.06)',
    border: '1px solid rgba(0,230,118,0.2)',
    borderRadius: '10px',
    transition: 'border-color 0.2s, background 0.2s',
  },
  subscribeBlockTitle: {
    display: 'block',
    fontSize: '0.95rem',
    fontWeight: 700,
    color: '#00e676',
    marginBottom: '4px',
  },
  subscribeBlockDesc: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#6b7c88',
    lineHeight: 1.5,
  },
  subscribeBlockArrow: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '1.2rem',
    color: '#00e676',
    flexShrink: 0,
  },
  privacyNote: {
    fontSize: '0.72rem',
    color: '#4a5f6b',
    margin: 0,
  },

  /* ── Links ─── */
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

  /* ── Footer ─── */
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

'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px',
      background: 'var(--bg-main)',
      color: 'var(--text-primary)',
    }}>
      <style>{`
        .not-found-container {
          text-align: center;
          max-width: 600px;
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .not-found-code {
          font-size: 96px;
          font-weight: 900;
          font-family: 'Playfair Display', serif;
          background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
          line-height: 1;
        }

        .not-found-title {
          font-size: 32px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          margin: 16px 0 12px 0;
          color: var(--text-primary);
        }

        .not-found-description {
          font-size: 16px;
          color: var(--text-secondary);
          margin: 0 0 32px 0;
          line-height: 1.6;
          font-family: 'DM Sans', sans-serif;
        }

        .not-found-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin: 32px 0 0 0;
        }

        .not-found-link {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 44px;
          cursor: pointer;
          border: none;
        }

        .not-found-link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        .not-found-link-primary {
          background: var(--accent);
          color: var(--bg-main);
        }

        .not-found-link-primary:hover {
          background: var(--accent-dark);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(163, 126, 27, 0.2);
        }

        .not-found-link-secondary {
          background: var(--bg-card);
          color: var(--text-primary);
          border: 1px solid var(--border-card);
        }

        .not-found-link-secondary:hover {
          background: var(--bg-input);
          border-color: var(--accent);
        }

        .not-found-decoration {
          margin-top: 48px;
          padding-top: 32px;
          border-top: 1px solid var(--border);
          font-size: 12px;
          color: var(--text-faint);
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 640px) {
          .not-found-code {
            font-size: 64px;
          }

          .not-found-title {
            font-size: 24px;
          }

          .not-found-description {
            font-size: 14px;
          }

          .not-found-actions {
            flex-direction: column;
            gap: 10px;
          }

          .not-found-link {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="not-found-container">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-description">
          Sorry, the page you're looking for doesn't exist. It might have been moved, renamed, or was never here to begin with.
        </p>

        <div className="not-found-actions">
          <Link href="/" className="not-found-link not-found-link-primary">
            Return to Home
          </Link>
          <Link href="/tools" className="not-found-link not-found-link-secondary">
            Browse Tools
          </Link>
        </div>

        <div className="not-found-decoration">
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: 8 }}>
              Pulsa<span style={{ color: 'var(--accent)' }}>fi</span>
            </div>
          </Link>
          <div>Free financial tools and calculators for everyone.</div>
        </div>
      </div>
    </div>
  )
}

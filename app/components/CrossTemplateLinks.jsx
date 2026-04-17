// ─── Server-rendered cross-template link section ───
// Renders a styled block listing related programmatic pages. No client JS,
// just static HTML, so it adds zero to the bundle. Used by the 8 smaller
// programmatic templates (retirement, cost-of-living, rent-vs-buy, etc.) to
// avoid 8 copies of the same render logic. The 6 highest-volume templates
// have bespoke render blocks for visual consistency with their layouts.

export default function CrossTemplateLinks({ title, description, links }) {
  if (!links || links.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 8,
        padding: 24,
        marginBottom: 40,
      }}
    >
      <h2
        style={{
          fontSize: 18,
          fontWeight: 700,
          fontFamily: "'Playfair Display', serif",
          margin: '0 0 8px 0',
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            fontSize: 14,
            color: 'var(--text-secondary)',
            fontFamily: "'DM Sans', sans-serif",
            margin: '0 0 20px 0',
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 12,
        }}
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              backgroundColor: 'var(--bg-main)',
              border: '1px solid var(--border-card)',
              borderRadius: 8,
              padding: 16,
              display: 'block',
            }}
          >
            <h4
              style={{
                fontSize: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                color: 'var(--accent)',
                margin: '0 0 4px 0',
              }}
            >
              {link.title}
            </h4>
            <p
              style={{
                fontSize: 13,
                fontFamily: "'DM Sans', sans-serif",
                color: 'var(--text-secondary)',
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {link.desc}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

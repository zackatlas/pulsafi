import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Pulsafi';
  const subtitle = searchParams.get('subtitle') || 'Free Financial Tools';
  const type = searchParams.get('type') || 'default';

  const getBadgeContent = () => {
    switch (type) {
      case 'tool':
        return { emoji: '🧮', label: 'FREE CALCULATOR' };
      case 'article':
        return { emoji: '📖', label: 'LEARN' };
      case 'game':
        return { emoji: '🎮', label: 'PLAY DAILY' };
      default:
        return { emoji: null, label: null };
    }
  };

  const badgeContent = getBadgeContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0d0f13',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Header with Pulsafi branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '80px',
          }}
        >
          <div
            style={{
              fontSize: '28px',
              fontWeight: '900',
              letterSpacing: '-1px',
              background: 'linear-gradient(135deg, #c9a227 0%, #e6c854 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            PULSAFI
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center',
            maxWidth: '900px',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: '800',
              margin: '0 0 30px 0',
              lineHeight: '1.1',
              color: '#ffffff',
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '32px',
              fontWeight: '400',
              margin: '0 0 50px 0',
              color: '#a0a0a0',
              lineHeight: '1.3',
            }}
          >
            {subtitle}
          </p>

          {/* Badge with type-specific styling */}
          {badgeContent.emoji && badgeContent.label && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: 'rgba(201, 162, 39, 0.15)',
                border: '2px solid #c9a227',
                borderRadius: '8px',
                padding: '12px 24px',
                width: 'fit-content',
              }}
            >
              <span style={{ fontSize: '24px' }}>{badgeContent.emoji}</span>
              <span
                style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  color: '#c9a227',
                }}
              >
                {badgeContent.label}
              </span>
            </div>
          )}
        </div>

        {/* Footer accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #c9a227 0%, #e6c854 50%, transparent 100%)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

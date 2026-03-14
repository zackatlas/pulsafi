import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Fetch Google Fonts
async function fetchFont(name, weight) {
  const url = `https://fonts.googleapis.com/css2?family=${name}:wght@${weight}&display=swap`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+?)\) format\('(.*?)'\)/);
  if (!resource) throw new Error('Font not found');
  const response = await fetch(resource[1]);
  if (!response.ok) throw new Error('Failed to fetch font');
  return await response.arrayBuffer();
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const score = parseInt(searchParams.get('score') || '0');
    const day = parseInt(searchParams.get('day') || '1');
    const grid = searchParams.get('grid') || '🟩🟨🟩🟧🟩';

    // Load fonts
    const dmSans = await fetchFont('DM+Sans', 400);
    const dmSansBold = await fetchFont('DM+Sans', 700);
    const dmMono = await fetchFont('DM+Mono', 400);

    // Format score with comma separator
    const formattedScore = score.toLocaleString();

    return new ImageResponse(
      (
        <div
          style={{
            background: '#0d0f13',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'DM Sans',
            color: '#ffffff',
            padding: '60px',
            gap: '40px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              fontSize: '24px',
              fontWeight: 400,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#c9a227',
            }}
          >
            <span>DAILY PULSE</span>
          </div>

          {/* Day indicator */}
          <div
            style={{
              fontSize: '18px',
              color: '#c9a227',
              fontFamily: 'Inter',
              fontWeight: 400,
            }}
          >
            #{day}
          </div>

          {/* Score */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontSize: '88px',
                fontWeight: 700,
                color: '#ffffff',
                fontFamily: 'DM Sans',
                lineHeight: 1,
                letterSpacing: '-2px',
              }}
            >
              {formattedScore}
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#999999',
                fontFamily: 'DM Sans',
                fontWeight: 400,
              }}
            >
              / 1,000
            </div>
          </div>

          {/* Emoji Grid */}
          <div
            style={{
              fontSize: '48px',
              letterSpacing: '8px',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {grid}
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: '18px',
              color: '#666666',
              fontFamily: 'DM Sans',
              fontWeight: 400,
              marginTop: '40px',
            }}
          >
            pulsafi.com/pulse
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'DM Sans',
            data: dmSans,
            weight: 400,
          },
          {
            name: 'DM Sans',
            data: dmSansBold,
            weight: 700,
          },
          {
            name: 'Inter',
            data: dmMono,
            weight: 400,
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

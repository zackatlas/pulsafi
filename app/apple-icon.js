import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#0d0f13', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="150" height="150" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
          <polyline points="8,38 18,38 23,26 29,46 35,18 41,40 46,32 56,32" fill="none" stroke="#c9a227" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    { ...size }
  )
}

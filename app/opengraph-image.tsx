import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dr. Aqeel Jafar — Physician, AI Pioneer & Venture Architect'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#080808',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          position: 'relative',
        }}
      >
        {/* Gold top line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(200,169,110,0.6) 30%, rgba(200,169,110,0.6) 70%, transparent)',
          }}
        />

        {/* Dr. */}
        <div style={{ fontSize: 42, fontStyle: 'italic', color: '#C8A96E', marginBottom: 8 }}>
          Dr.
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#FFFFFF',
            letterSpacing: '0.1em',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          AQEEL JAFAR
        </div>

        {/* Divider */}
        <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 24 }} />

        {/* Roles */}
        <div style={{ fontSize: 15, color: '#6B6B6B', letterSpacing: '0.3em', marginBottom: 32 }}>
          PHYSICIAN  /  AI PIONEER  /  VENTURE ARCHITECT  /  MENTOR
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 28, fontStyle: 'italic', color: '#C8A96E' }}>
          Where medicine, AI &amp; entrepreneurship converge.
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 100,
            fontSize: 15,
            color: '#3A3A3A',
            letterSpacing: '0.25em',
          }}
        >
          AQEELJAFAR.COM
        </div>
      </div>
    ),
    { ...size }
  )
}

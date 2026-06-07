import { EVENT } from '../../config/event'

export default function Footer() {
  return (
    <footer style={{
      background: 'transparent',
      borderTop: '1px solid rgba(212,164,75,0.12)',
      padding: '64px 24px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Image for Footer */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(/assets/Footer_image.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Dark overlay to ensure text contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to top, rgba(6,7,10,0.95) 0%, rgba(6,7,10,0.8) 100%)',
      }} />

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Ornament */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '28px',
          color: 'var(--color-gold)',
          marginBottom: '16px',
          opacity: 0.6,
          letterSpacing: '0.1em',
        }}>
          ✦
        </p>

        {/* Event name */}
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(26px, 3.5vw, 36px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--color-text)',
          letterSpacing: '0.03em',
          marginBottom: '8px',
        }}>
          {EVENT.name} · {EVENT.byline}
        </p>

        {/* Date */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '24px',
        }}>
          {EVENT.dateDisplay} · {EVENT.location}
        </p>

        {/* Divider */}
        <div style={{
          width: '40px',
          height: '1px',
          background: 'rgba(212,164,75,0.3)',
          margin: '0 auto 20px',
        }} />

        {/* Copyright */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px', /* Increased from 14px */
          fontWeight: 500,  /* Increased from 300 (bolder) */
          color: 'var(--color-text-dim)',
          letterSpacing: '0.04em',
        }}>
          © {new Date().getFullYear()} {EVENT.fullTitle}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

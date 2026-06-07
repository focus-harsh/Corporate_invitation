import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import PetalCanvas from '../shared/PetalCanvas'
import CountdownTimer from '../shared/CountdownTimer'
import GuestName from '../shared/GuestName'

interface HeroProps {
  visible: boolean   // becomes true after popup closes
}

export default function Hero({ visible }: HeroProps) {
  const heroRef    = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Stagger text reveal after popup closes
  useGSAP(() => {
    if (!visible || !contentRef.current) return
    const els = contentRef.current.querySelectorAll('.hero-anim')
    gsap.fromTo(els,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.14, ease: 'power3.out', delay: 0.1 }
    )
  }, { dependencies: [visible], scope: heroRef })

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        height: '100dvh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',

        /* ── Transparent to show global navy background ── */
        background: 'transparent',
      }}
    >
      {/* Cinematic Storytelling Desk Background */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(/assets/header_image.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Soft overlay to blend into the global dark background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(180deg, rgba(5,4,3,0.2) 0%, rgba(12,9,7,0.6) 80%, #080605 100%)',
      }} />

      {/* Bottom vignette — fades into next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '200px',
        background: 'linear-gradient(0deg, #06070A 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Petal rain — sits above background, below text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <PetalCanvas />
      </div>

      {/* Hero content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '40px 24px',
          maxWidth: '900px',
          width: '100%',
          /* Heavy radial gradient to hide the baked-in text on the background image */
          background: 'radial-gradient(ellipse at center, rgba(5,4,3,0.98) 15%, rgba(5,4,3,0.85) 45%, transparent 75%)',
        }}
      >
        {/* Ornament label */}
        <p className="hero-anim" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '20px',
          opacity: 0,
        }}>
          ✦ &nbsp; A Bespoke Invitation &nbsp; ✦
        </p>

        {/* Dear [NAME] */}
        <p className="hero-anim" style={{
          fontFamily: 'var(--font-script)',
          fontSize: 'clamp(22px, 3.5vw, 36px)',
          color: 'rgba(245, 239, 230, 0.85)',
          marginBottom: '8px',
          opacity: 0,
        }}>
          Dear <GuestName />,
        </p>

        {/* Main title */}
        <h1 className="hero-anim" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(48px, 9vw, 96px)',
          fontWeight: 400,
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: '#fff',
          marginBottom: '8px',
          opacity: 0,
          textShadow: '0 4px 40px rgba(0,0,0,0.4)',
        }}>
          The Art of<br />
          <span className="text-gradient-gold">Story Telling</span>
        </h1>

        {/* Byline */}
        <p className="hero-anim" style={{
          fontFamily: 'var(--font-display)', /* Matching main title */
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 400,
          color: '#fff',
          marginBottom: '28px',
          opacity: 0,
        }}>
          By Harsh Shah
        </p>

        {/* Invitation line */}
        <p className="hero-anim" style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(18px, 3vw, 24px)', /* Increased font size */
          fontWeight: 300,
          color: 'rgba(245,239,230,0.85)',
          maxWidth: '680px',
          margin: '0 auto 48px',
          lineHeight: 1.8,
          opacity: 0,
        }}>
          you are cordially invited to an experience where<br />
          <em style={{ color: 'var(--color-gold-light)' }}>Stories Connect. Influence. Inspire.</em>
        </p>

        {/* Event info pill */}
        <div className="hero-anim" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'clamp(16px, 3vw, 32px)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          background: 'rgba(15,12,8,0.75)',
          border: '1px solid rgba(212,164,75,0.25)',
          borderRadius: '60px',
          padding: 'clamp(12px, 2vw, 16px) clamp(20px, 4vw, 40px)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          marginBottom: '48px',
          opacity: 0,
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        }}>
          {[
            { icon: '📅', text: '12 June 2026' },
            { icon: '🕙', text: '10:00 AM – 5:00 PM' },
            { icon: '📍', text: 'Ahmedabad, Gujarat' },
          ].map(({ icon, text }) => (
            <span key={text} style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 1.5vw, 14px)',
              fontWeight: 400,
              color: 'var(--color-text)',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              whiteSpace: 'nowrap',
            }}>
              <span>{icon}</span> {text}
            </span>
          ))}
        </div>

        {/* Countdown */}
        <div className="hero-anim" style={{ opacity: 0, display: 'flex', justifyContent: 'center' }}>
          <CountdownTimer />
        </div>
      </div>

      {/* Scroll prompt */}
      <div style={{
        position: 'absolute',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 1s ease 1.5s',
      }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
        }}>
          Scroll to explore
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(180deg, rgba(212,164,75,0.7), transparent)',
          animation: 'breathe 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}

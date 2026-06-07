import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { EVENT } from '../../config/event'
import GuestName from '../shared/GuestName'

gsap.registerPlugin(ScrollTrigger)

const VENUE_PHOTOS = [
  '/assets/slider_1.png',
  '/assets/slider_2.png',
  '/assets/slider_3.png',
]

const VENUE_PHOTOS_ALT = [
  'The Grand Bhagwati event venue',
  'Welcome and registration area',
  'Networking break area',
  'Event closing session',
]

export default function VenueSection() {
  const [photoIndex, setPhotoIndex] = useState(0)
  const [fading, setFading]         = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Auto-rotate venue photos every 4s
  useEffect(() => {
    const id = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPhotoIndex(i => (i + 1) % VENUE_PHOTOS.length)
        setFading(false)
      }, 600)
    }, 4000)
    return () => clearInterval(id)
  }, [])

  useGSAP(() => {
    // Animate heading
    const heading = sectionRef.current?.querySelector('.section-heading')
    if (heading) {
      gsap.fromTo(heading,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: heading, start: 'top 85%' } }
      )
    }

    // Animate columns
    const cols = sectionRef.current?.querySelectorAll('.venue-col')
    cols?.forEach((col, i) => {
      gsap.fromTo(col,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15,
          scrollTrigger: { trigger: col, start: 'top 85%' },
        }
      )
    })
  }, { scope: sectionRef, dependencies: [] })

  return (
    <section ref={sectionRef} id="venue" className="section" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Image for Venue Section */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(/assets/The_stage.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Dark overlay to ensure text contrast and preserve stage lighting */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(180deg, rgba(6,7,10,0.9) 0%, rgba(6,7,10,0.65) 50%, rgba(6,7,10,0.95) 100%)',
      }} />

      {/* Ambient background glow (Stage Spotlight) */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        width: '600px',
        height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(212,164,75,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>The Stage</p>
          <h2 className="section-heading">
            The Stage is Set,{' '}
            <span className="text-gradient-gold"><GuestName /></span>
          </h2>
          <p className="section-subheading" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Join us at a venue crafted for meaningful conversations and lasting connections.
          </p>
        </div>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '28px',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}>

          {/* Column 1 — Venue details */}
          <div className="venue-col glass-card" style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px', /* Increased from 11px */
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                marginBottom: '12px',
              }}>Venue</p>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(32px, 4vw, 42px)', /* Increased from 28px max */
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}>
                {EVENT.venue.name}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '18px', /* Increased from 15px */
                fontWeight: 300,
                color: 'var(--color-text-muted)',
                lineHeight: 1.6,
              }}>
                {EVENT.venue.address}
              </p>
            </div>

            {/* Venue pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Smart Casual Dress', 'Premium Venue', 'Parking Available'].map(pill => (
                <span key={pill} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px', /* Increased from 11px */
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: 'var(--color-gold)',
                  background: 'rgba(212,164,75,0.08)',
                  border: '1px solid rgba(212,164,75,0.2)',
                  borderRadius: '24px',
                  padding: '8px 18px', /* Increased padding */
                }}>
                  {pill}
                </span>
              ))}
            </div>

            {/* Direction button */}
            <a
              href={EVENT.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ marginTop: 'auto', textAlign: 'center' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" fill="currentColor"/>
              </svg>
              Get Directions
            </a>
          </div>

          {/* Column 2 — Google Maps */}
          <div className="venue-col glass-card" style={{
            padding: '8px',
            borderRadius: '16px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(212,164,75,0.06)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ flex: 1, width: '100%', minHeight: '400px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.854199653199!2d72.498425!3d23.0289052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b278df82e6d%3A0xc3af84fa2d89f1f0!2sThe%20Grand%20Bhagwati!5e0!3m2!1sen!2sin!4v1707000000000!5m2!1sen!2sin"
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  border: 0,
                  filter: 'invert(90%) hue-rotate(180deg) contrast(110%) opacity(0.8)',
                  pointerEvents: 'none', /* Prevents scroll-jacking */
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location Map"
              />
            </div>
          </div>

          {/* Column 3 — Venue photo carousel */}
          <div className="venue-col glass-card" style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(212,164,75,0.06)',
            padding: '8px',
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '10px', overflow: 'hidden' }}>
              {VENUE_PHOTOS.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={VENUE_PHOTOS_ALT[i] || 'Event Venue'}
                  loading="lazy"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    opacity: i === photoIndex ? 1 : 0,
                    transform: `scale(${i === photoIndex ? 1.05 : 1})`,
                    transition: fading ? 'opacity 0.6s ease' : 'opacity 0.6s ease, transform 4s linear',
                    zIndex: i === photoIndex ? 2 : 1,
                  }}
                />
              ))}
            </div>

            {/* Dots indicator */}
            <div style={{
              position: 'absolute',
              bottom: '24px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '7px',
              zIndex: 2,
            }}>
              {VENUE_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIndex(i)}
                  aria-label={`View photo ${i + 1}`}
                  style={{
                    width: i === photoIndex ? '20px' : '7px',
                    height: '7px',
                    borderRadius: '4px',
                    background: i === photoIndex ? 'var(--color-gold)' : 'rgba(255,255,255,0.4)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s var(--ease-luxury)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

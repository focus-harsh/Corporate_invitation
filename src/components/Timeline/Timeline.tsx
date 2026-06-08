import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { EVENT } from '../../config/event'

gsap.registerPlugin(ScrollTrigger)

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Heading reveal
    gsap.fromTo('.timeline-heading-wrap',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.timeline-heading-wrap', start: 'top 85%' },
      }
    )

    // Animate timeline line fill
    gsap.fromTo('.timeline-line-fill',
      { scaleY: 0 },
      {
        scaleY: 1, duration: 1.5, ease: 'none', transformOrigin: 'top center',
        scrollTrigger: {
          trigger: '.timeline-track',
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: true,
        },
      }
    )

    // Each entry slides in from its side
    sectionRef.current?.querySelectorAll('.tl-entry').forEach((el) => {
      const isLeft = el.classList.contains('tl-left')
      gsap.fromTo(el,
        { opacity: 0, x: isLeft ? -60 : 60 },
        {
          opacity: 1, x: 0, duration: 0.75, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    })

    // Nodes glow on scroll
    sectionRef.current?.querySelectorAll('.tl-node').forEach((el) => {
      gsap.fromTo(el,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="timeline" className="section" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Fixed Parallax Background Image - full brightness as requested */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(/assets/the_journey.png?v=${Date.now()})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 1, /* Restored to full brightness */
      }} />

      {/* Soft overlay to ensure text contrast without hiding the beautiful background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'rgba(5, 4, 3, 0.35)', /* Very light darkening instead of heavy gradient */
      }} />

      {/* Ambient background glow */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(212,164,75,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* PHASE 3: Floating Story Elements */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Floating Sparkle 1 */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: '4px', height: '4px', background: 'var(--color-gold-bright)',
          borderRadius: '50%', boxShadow: '0 0 15px 2px var(--color-gold)',
          animation: 'float 6s infinite ease-in-out, breathe 4s infinite ease-in-out',
        }} />
        {/* Floating Sparkle 2 */}
        <div style={{
          position: 'absolute', top: '45%', right: '8%',
          width: '3px', height: '3px', background: '#fff',
          borderRadius: '50%', boxShadow: '0 0 20px 3px var(--color-gold)',
          animation: 'float 8s infinite ease-in-out reverse, breathe 5s infinite ease-in-out',
        }} />
        {/* Floating Sparkle 3 */}
        <div style={{
          position: 'absolute', top: '75%', left: '15%',
          width: '5px', height: '5px', background: 'var(--color-gold)',
          borderRadius: '50%', boxShadow: '0 0 12px 1px var(--color-gold)',
          animation: 'float 7s infinite ease-in-out, breathe 6s infinite ease-in-out',
        }} />
        {/* Floating Symbol (Feather/Ink) */}
        <svg style={{
          position: 'absolute', top: '30%', right: '15%',
          width: '40px', height: '40px', opacity: 0.1, fill: 'var(--color-gold)',
          animation: 'float 12s infinite ease-in-out',
          transform: 'rotate(15deg)',
        }} viewBox="0 0 24 24">
          <path d="M20.7,3.3C20.7,3.3 19.3,3 17.2,3.6C14.1,4.5 10.7,7.2 8.3,10.6C7.5,11.8 7,13.1 6.8,14.4C6.5,16.4 7.2,18.4 8.6,19.8C10.1,21.3 12.1,22 14.1,21.8C15.4,21.6 16.7,21 17.9,20.2C21.3,17.8 24,14.4 24.9,11.3C25.5,9.2 25.2,7.8 25.2,7.8L20.7,3.3Z" />
        </svg>
      </div>

      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>

        {/* Heading */}
        <div className="timeline-heading-wrap" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <p className="section-label" style={{ justifyContent: 'center', color: '#2A2015', fontWeight: 700, fontSize: '16px' }}>
            The Journey
          </p>
          <h2 className="section-heading" style={{ color: '#1A140F' }}>
            A Day of <span style={{ color: '#3A2C1E' }}>Stories & Growth</span>
          </h2>
          <p className="section-subheading" style={{ maxWidth: '600px', margin: '0 auto', color: '#4A3C2F', fontWeight: 500, fontSize: '18px' }}>
            Every moment of {EVENT.dateDisplay} is crafted to take you deeper into the art of storytelling.
          </p>
        </div>

        {/* Timeline track */}
        <div
          className="timeline-track"
          style={{
            position: 'relative',
            maxWidth: '1100px',
            margin: '0 auto',
            zIndex: 1,
          }}
        >
          {/* Center vertical line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '1px',
            background: 'rgba(212,164,75,0.15)',
            transform: 'translateX(-50%)',
            zIndex: 0,
          }}>
            <div
              className="timeline-line-fill"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, var(--color-gold) 0%, var(--color-gold-muted) 100%)',
                transformOrigin: 'top center',
              }}
            />
          </div>

          {/* Entries */}
          {EVENT.agenda.map((item, i) => {
            const isLeft = i % 2 === 0   // even → content left, image right

            return (
              <div
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 48px 1fr',
                  gap: '0 0',
                  marginBottom: '56px',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Left slot */}
                <div
                  className={`tl-entry ${isLeft ? 'tl-left' : 'tl-right'}`}
                  style={{
                    paddingRight: '32px',
                    textAlign: isLeft ? 'right' : 'left',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isLeft ? 'flex-end' : 'flex-start',
                  }}
                >
                  {isLeft ? <EntryContent item={item} /> : item.image && <EntryImage item={item} />}
                </div>

                {/* Node */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <div
                    className="tl-node"
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      background: 'var(--color-gold)',
                      border: '2px solid var(--color-bg)',
                      boxShadow: '0 0 12px rgba(212,164,75,0.6)',
                      flexShrink: 0,
                      animation: 'nodePulse 2s infinite', /* Phase 3: Pulsating milestones */
                    }}
                  />
                </div>

                {/* Right slot */}
                <div
                  className={`tl-entry ${isLeft ? 'tl-right' : 'tl-left'}`}
                  style={{
                    paddingLeft: '32px',
                    textAlign: isLeft ? 'left' : 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isLeft ? 'flex-start' : 'flex-end',
                  }}
                >
                  {isLeft ? item.image && <EntryImage item={item} /> : <EntryContent item={item} />}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile styles */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-track > div {
            grid-template-columns: 16px 1fr !important;
            grid-template-rows: auto auto !important;
            gap: 0 12px !important;
          }
          .timeline-track > div > div:first-child { display: none !important; }
          .timeline-track > div > div:last-child {
            padding-left: 0 !important;
            text-align: left !important;
            align-items: flex-start !important;
          }
          .tl-node { width: 10px !important; height: 10px !important; }
        }
      `}</style>
    </section>
  )
}

function EntryContent({ item }: { item: (typeof EVENT.agenda)[number] }) {
  return (
    <div className="glass-card" style={{ padding: '24px 28px', maxWidth: '320px' }}>
      {/* Label badge */}
      {'label' in item && item.label && (
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-body)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          background: 'rgba(212,164,75,0.1)',
          border: '1px solid rgba(212,164,75,0.2)',
          borderRadius: '20px',
          padding: '3px 12px',
          marginBottom: '10px',
        }}>
          {item.label as string}
        </span>
      )}
      {/* Time */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.1em',
        color: 'var(--color-gold-muted)',
        marginBottom: '6px',
      }}>
        {item.time}
      </p>
      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(17px, 2vw, 20px)',
        fontWeight: 600,
        color: 'var(--color-text)',
        marginBottom: '8px',
        lineHeight: 1.25,
      }}>
        {item.title}
      </h3>
      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        fontWeight: 300,
        color: 'var(--color-text-muted)',
        lineHeight: 1.65,
      }}>
        {item.description}
      </p>
    </div>
  )
}

function EntryImage({ item }: { item: (typeof EVENT.agenda)[number] }) {
  if (!item.image) return null
  return (
    <div style={{
      width: '100%',
      /* 16:9 matches the actual landscape event photos — zero left/right crop */
      aspectRatio: '16 / 9',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      border: '1px solid rgba(212,164,75,0.15)',
      background: '#000',
    }}>
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          /* contain = no crop whatsoever; dark bg shows if ratio differs slightly */
          objectFit: 'contain',
          display: 'block',
          transition: 'transform 0.6s var(--ease-luxury)',
        }}
        onMouseEnter={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.04)' }}
        onMouseLeave={e => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
      />
    </div>
  )
}

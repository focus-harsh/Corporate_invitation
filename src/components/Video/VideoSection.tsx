import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { EVENT } from '../../config/event'
import GuestName from '../shared/GuestName'

gsap.registerPlugin(ScrollTrigger)

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.fromTo('.video-text-col',
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.video-text-col', start: 'top 82%' },
      }
    )
    gsap.fromTo('.video-player-col',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1, scale: 1, duration: 0.85, ease: 'power2.out',
        scrollTrigger: { trigger: '.video-player-col', start: 'top 82%' },
      }
    )
  }, { scope: sectionRef })

  const thumbnailUrl = `https://img.youtube.com/vi/${EVENT.youtubeVideoId}/maxresdefault.jpg`
  const embedUrl     = `https://www.youtube.com/embed/${EVENT.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <section ref={sectionRef} id="video" className="section" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Image for Video Section */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(/assets/watch_the_story.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Dark overlay to ensure text contrast */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(90deg, rgba(8,6,5,0.95) 0%, rgba(8,6,5,0.85) 40%, rgba(8,6,5,0.3) 100%)',
      }} />

      {/* Ambient background glow (Spotlight effect) */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(212,164,75,0.055) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }}>

          {/* Text column */}
          <div className="video-text-col">
            <p className="section-label">Watch the Story</p>
            <h2 className="section-heading">
              A Glimpse of What Awaits,{' '}
              <span className="text-gradient-gold"><GuestName /></span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '19px', /* Increased from 16px */
              fontWeight: 300,
              color: '#fff', /* Brighter for readability */
              lineHeight: 1.8,
              marginBottom: '28px',
            }}>
              Get a glimpse of <em>The Art of Story Telling by Harsh Shah</em>.
              Stories have the power to connect, influence, and inspire — and this is just a preview.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Connect deeply with every audience', 'Influence through authentic narrative', 'Inspire action with your story'].map(point => (
                <li key={point} style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '18px', /* Increased from 15px */
                  fontWeight: 300,
                  color: '#fff', /* Brighter */
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}>
                  <span style={{ color: 'var(--color-gold)', fontSize: '18px', flexShrink: 0 }}>✦</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Video player column */}
          <div className="video-player-col">
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(212,164,75,0.2)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 40px rgba(212,164,75,0.06)',
              aspectRatio: '16/9',
              background: '#000',
            }}>
              {playing ? (
                <iframe
                  src={embedUrl}
                  title="The Art of Story Telling by Harsh Shah"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              ) : (
                <>
                  {/* Thumbnail */}
                  <img
                    src={thumbnailUrl}
                    alt="Watch: The Art of Story Telling by Harsh Shah"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => {
                      // Fallback to hq thumbnail if maxres unavailable
                      ;(e.target as HTMLImageElement).src =
                        `https://img.youtube.com/vi/${EVENT.youtubeVideoId}/hqdefault.jpg`
                    }}
                  />
                  {/* Dark overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'rgba(0,0,0,0.35)',
                  }} />
                  {/* Play button */}
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label="Play video"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 32px rgba(212,164,75,0.5)',
                      transition: 'transform 0.3s var(--ease-luxury), box-shadow 0.3s',
                      animation: 'glowPulse 2.5s ease-in-out infinite',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget
                      el.style.transform = 'translate(-50%, -50%) scale(1.1)'
                      el.style.boxShadow = '0 12px 48px rgba(212,164,75,0.7)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.transform = 'translate(-50%, -50%) scale(1)'
                      el.style.boxShadow = '0 8px 32px rgba(212,164,75,0.5)'
                    }}
                  >
                    {/* Triangle play icon */}
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M8 5.14v14l11-7-11-7z" fill="#111" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 300,
              color: 'var(--color-text-dim)',
              textAlign: 'center',
              marginTop: '16px',
              letterSpacing: '0.04em',
            }}>
              A preview of memories from our last edition
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

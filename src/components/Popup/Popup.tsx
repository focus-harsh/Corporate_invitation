import { useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { usePersonalization } from '../../context/PersonalizationContext'
import ParticleCanvas from './ParticleCanvas'

gsap.registerPlugin()

interface PopupProps {
  onComplete: () => void
}

// Validation
function isValidName(name: string): boolean {
  return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name.trim())
}

export default function Popup({ onComplete }: PopupProps) {
  const { setName, isPersonalized } = usePersonalization()
  const overlayRef  = useRef<HTMLDivElement>(null)
  const cardRef     = useRef<HTMLDivElement>(null)
  const inputRef    = useRef<HTMLInputElement>(null)
  const errorRef    = useRef<HTMLParagraphElement>(null)

  // Entrance animation on mount
  useGSAP(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    )
    gsap.fromTo(cardRef.current,
      { opacity: 0, scale: 0.92, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Focus trap
  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 800)
    return () => clearTimeout(timer)
  }, [])

  // ESC closes to default "Guest"
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  const handleClose = useCallback(() => {
    // If no name set, default to 'Guest'
    if (!isPersonalized) setName('Guest')
    animateOut()
  }, [isPersonalized])

  function showError(msg: string) {
    if (!errorRef.current) return
    errorRef.current.textContent = msg
    gsap.fromTo(errorRef.current,
      { opacity: 0, y: -4 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    )
  }

  function animateOut() {
    gsap.to(cardRef.current, {
      opacity: 0, scale: 0.9, y: -10,
      duration: 0.45, ease: 'power2.in',
    })
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.7, ease: 'power2.in', delay: 0.2,
      onComplete,
    })
  }

  function handleSubmit() {
    const val = inputRef.current?.value ?? ''
    if (!isValidName(val)) {
      showError('Please enter your real name (at least 2 letters, no numbers).')
      gsap.fromTo(inputRef.current,
        { x: -6 }, { x: 6, duration: 0.06, repeat: 5, yoyo: true, ease: 'none',
          onComplete: () => gsap.set(inputRef.current, { x: 0 }) }
      )
      return
    }
    setName(val.trim())
    animateOut()
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(0,0,0,0.80)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Popup card */}
      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '560px',
          background: 'rgba(12, 10, 8, 0.92)',
          border: '1px solid rgba(212,164,75,0.28)',
          borderRadius: 'var(--radius-popup)',
          padding: 'clamp(32px, 5vw, 52px)',
          boxShadow: '0 20px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,164,75,0.06)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          textAlign: 'center',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '18px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)',
            fontSize: '20px',
            lineHeight: 1,
            padding: '6px',
            borderRadius: '50%',
            transition: 'color 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget
            el.style.color = 'var(--color-gold)'
            el.style.transform = 'rotate(90deg) scale(1.1)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget
            el.style.color = 'rgba(255,255,255,0.5)'
            el.style.transform = 'rotate(0) scale(1)'
          }}
        >
          ✕
        </button>

        {/* Floating quill icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '24px',
          animation: 'float 3s ease-in-out infinite',
        }}>
          <svg
            width="52" height="52" viewBox="0 0 52 52" fill="none"
            aria-hidden="true"
            style={{ filter: 'drop-shadow(0 0 16px rgba(212,164,75,0.5))' }}
          >
            <path
              d="M40 4C40 4 44 12 36 20C28 28 12 32 8 44C8 44 16 38 22 36C22 36 18 42 16 48C16 48 26 40 32 32C32 32 30 38 28 42C28 42 38 30 40 18C42 8 40 4 40 4Z"
              fill="url(#quillGrad)"
              stroke="rgba(212,164,75,0.4)" strokeWidth="0.5"
            />
            <path
              d="M8 44 L20 36"
              stroke="rgba(212,164,75,0.6)" strokeWidth="1.5" strokeLinecap="round"
            />
            <defs>
              <linearGradient id="quillGrad" x1="8" y1="48" x2="44" y2="4" gradientUnits="userSpaceOnUse">
                <stop offset="0%"   stopColor="#8B7355"/>
                <stop offset="50%"  stopColor="#D4A44B"/>
                <stop offset="100%" stopColor="#F1D08A"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Event name small label */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginBottom: '14px',
          opacity: 0.85,
        }}>
          The Art of Story Telling · By Harsh Shah
        </p>

        {/* Title */}
        <h1
          id="popup-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.2,
            color: '#fff',
            marginBottom: '12px',
          }}
        >
          Please let us know<br />your name
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '16px',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.6)',
          marginBottom: '36px',
          letterSpacing: '0.02em',
        }}>
          Let's begin your storytelling journey.
        </p>

        {/* Input */}
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="guest-name" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden' }}>
            Your name
          </label>
          <input
            ref={inputRef}
            id="guest-name"
            type="text"
            placeholder="Enter your name"
            maxLength={60}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%',
              height: '60px',
              padding: '0 20px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(212,164,75,0.25)',
              borderRadius: '14px',
              color: '#fff',
              fontSize: '17px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'var(--color-gold)'
              e.target.style.boxShadow = '0 0 0 3px rgba(212,164,75,0.15)'
              e.target.style.transform = 'scale(1.01)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(212,164,75,0.25)'
              e.target.style.boxShadow = 'none'
              e.target.style.transform = 'scale(1)'
            }}
          />
        </div>

        {/* Error message */}
        <p
          ref={errorRef}
          role="alert"
          style={{
            fontSize: '13px',
            color: 'var(--color-error)',
            marginBottom: '24px',
            minHeight: '20px',
            opacity: 0,
            fontFamily: 'var(--font-body)',
          }}
        />

        {/* Submit button */}
        <button
          id="popup-submit"
          onClick={handleSubmit}
          className="btn-gold"
          style={{ width: '100%', height: '60px', fontSize: '13px', borderRadius: '14px' }}
        >
          ✦ &nbsp; BEGIN THE JOURNEY
        </button>

        {/* Decorative bottom line */}
        <div style={{
          marginTop: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          justifyContent: 'center',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '11px',
          letterSpacing: '0.15em',
        }}>
          <span style={{ flex: 1, height: 1, background: 'rgba(212,164,75,0.15)' }} />
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}>12 · AUG · 2026</span>
          <span style={{ flex: 1, height: 1, background: 'rgba(212,164,75,0.15)' }} />
        </div>
      </div>
    </div>
  )
}

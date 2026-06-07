import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMouseMove = (e: MouseEvent) => {
      // Main dot follows instantly
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0,
        })
      }
      
      // Glow trails slightly
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: 'power3.out',
        })
      }
    }

    // Interactive elements hover state
    const onMouseEnter = () => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { scale: 1.5, opacity: 0.8, duration: 0.3 })
      }
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0.5, duration: 0.3 })
      }
    }

    const onMouseLeave = () => {
      if (glowRef.current) {
        gsap.to(glowRef.current, { scale: 1, opacity: 0.4, duration: 0.3 })
      }
      if (cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3 })
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    // Add listeners to all clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, select')
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  // Do not render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Outer Glow / Trail */}
      <div 
        ref={glowRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px', height: '40px',
          marginLeft: '-20px', marginTop: '-20px', // center
          borderRadius: '50%',
          backgroundColor: 'rgba(212,164,75,0.1)',
          border: '1px solid rgba(212,164,75,0.2)',
          pointerEvents: 'none',
          zIndex: 9998,
          boxShadow: '0 0 20px rgba(212,164,75,0.3)',
        }}
      />
      {/* Inner precise dot */}
      <div 
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '6px', height: '6px',
          marginLeft: '-3px', marginTop: '-3px', // center
          borderRadius: '50%',
          backgroundColor: '#D4A44B',
          pointerEvents: 'none',
          zIndex: 9999,
          boxShadow: '0 0 8px #D4A44B',
        }}
      />
    </>
  )
}

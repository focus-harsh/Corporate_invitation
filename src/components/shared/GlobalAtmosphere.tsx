import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function GlobalAtmosphere() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Particle generation
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const isGold = Math.random() > 0.5
    const isAmber = Math.random() > 0.8
    const size = Math.random() * 3 + 1
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      color: isAmber ? '#b4782d' : isGold ? '#D4A44B' : '#F5ECD7',
      duration: Math.random() * 20 + 20, // 20-40s
      delay: Math.random() * -20, // start at different points
    }
  })

  useGSAP(() => {
    if (!containerRef.current) return

    // Animate glow movement slowly
    gsap.to('.story-glow-1', {
      xPercent: 10,
      yPercent: 15,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to('.story-glow-2', {
      xPercent: -15,
      yPercent: 10,
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to('.story-glow-3', {
      xPercent: 10,
      yPercent: -10,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    // Particles slow drift
    const particleElements = containerRef.current.querySelectorAll('.global-particle')
    particleElements.forEach((el) => {
      gsap.to(el, {
        y: '-=100', // Drift upward
        x: `+=${(Math.random() - 0.5) * 50}`, // slight sway
        rotation: Math.random() * 360,
        duration: 25 + Math.random() * 15,
        repeat: -1,
        ease: 'none',
      })
    })
  }, { scope: containerRef })

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        pointerEvents: 'none', 
        zIndex: 0, 
        overflow: 'hidden',
        /* Very warm dark cinematic background matching the image */
        background: 'linear-gradient(180deg, #080605 0%, #120E0A 25%, #18120C 50%, #0D0A07 75%, #050403 100%)'
      }}
    >
      {/* Background Texture Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url(/assets/noise.png)', // fallback if doesn't exist, will just be invisible
        opacity: 0.03,
        mixBlendMode: 'overlay',
      }} />

      {/* Story Lighting (Radial Gradients) - Opacity slightly boosted to be visible against dark bg */}
      <div className="story-glow-1" style={{
        position: 'absolute',
        top: '-10%', left: '-10%',
        width: '70vw', height: '70vh',
        background: 'radial-gradient(circle at center, rgba(212,164,75,0.12), transparent 60%)',
      }} />

      <div className="story-glow-2" style={{
        position: 'absolute',
        top: '30%', right: '-20%',
        width: '80vw', height: '80vh',
        background: 'radial-gradient(circle at center, rgba(212,164,75,0.08), transparent 60%)',
      }} />

      <div className="story-glow-3" style={{
        position: 'absolute',
        bottom: '-20%', left: '20%',
        width: '90vw', height: '60vh',
        background: 'radial-gradient(circle at center, rgba(212,164,75,0.06), transparent 60%)',
      }} />

      {/* Cinematic Particles */}
      {particles.map(p => (
        <div 
          key={p.id}
          className="global-particle"
          style={{
            position: 'absolute',
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: '50%',
            opacity: 0.15 + (Math.random() * 0.2), // Very subtle 15-35%
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  )
}

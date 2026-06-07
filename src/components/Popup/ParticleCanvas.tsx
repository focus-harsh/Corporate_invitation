import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  opacityDir: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []

    function resize() {
      canvas!.width  = window.innerWidth
      canvas!.height = window.innerHeight
    }

    function initParticles() {
      particles = Array.from({ length: 50 }, () => ({
        x:          Math.random() * canvas!.width,
        y:          Math.random() * canvas!.height,
        vx:         (Math.random() - 0.5) * 0.3,
        vy:         -Math.random() * 0.4 - 0.1,
        radius:     Math.random() * 2 + 0.5,
        opacity:    Math.random() * 0.5 + 0.1,
        opacityDir: Math.random() > 0.5 ? 1 : -1,
      }))
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.opacity += p.opacityDir * 0.003

        if (p.opacity >= 0.6) p.opacityDir = -1
        if (p.opacity <= 0.05) p.opacityDir = 1

        // Wrap around
        if (p.y < -5)               p.y = canvas!.height + 5
        if (p.x < -5)               p.x = canvas!.width  + 5
        if (p.x > canvas!.width + 5) p.x = -5

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(212, 175, 80, ${p.opacity})`
        ctx!.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()

    window.addEventListener('resize', () => { resize(); initParticles() })

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  )
}

import { useEffect, useRef } from 'react'

interface Petal {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotSpeed: number
  size: number
  opacity: number
  colorIdx: number
}

const PETAL_COLORS = [
  'rgba(232, 196, 184, ',   // petal rose
  'rgba(245, 236, 215, ',   // petal ivory
  'rgba(212, 164, 75,  ',   // gold
]

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save()
  ctx.translate(p.x, p.y)
  ctx.rotate(p.rotation)
  ctx.globalAlpha = p.opacity

  const color = PETAL_COLORS[p.colorIdx] + p.opacity + ')'
  ctx.fillStyle = color

  ctx.beginPath()
  ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function makePetal(canvasW: number, fromTop = false): Petal {
  return {
    x:        Math.random() * canvasW,
    y:        fromTop ? -20 : Math.random() * window.innerHeight,
    vx:       (Math.random() - 0.5) * 0.8,
    vy:       Math.random() * 0.8 + 0.4,
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.03,
    size:     Math.random() * 10 + 6,
    opacity:  Math.random() * 0.5 + 0.3,
    colorIdx: Math.floor(Math.random() * PETAL_COLORS.length),
  }
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let petals: Petal[] = []

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }

    function init() {
      petals = Array.from({ length: 24 }, () => makePetal(canvas!.width, false))
    }

    function loop() {
      if (document.visibilityState === 'hidden') {
        animId = requestAnimationFrame(loop)
        return
      }

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      for (const p of petals) {
        p.x  += p.vx
        p.y  += p.vy
        p.rotation += p.rotSpeed

        // Reset to top when falls off bottom
        if (p.y > canvas!.height + 20) {
          Object.assign(p, makePetal(canvas!.width, true))
        }
      }

      petals.forEach(p => drawPetal(ctx!, p))
      animId = requestAnimationFrame(loop)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    init()
    loop()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  )
}

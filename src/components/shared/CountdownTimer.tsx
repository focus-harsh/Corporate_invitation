import { useState, useEffect, useRef } from 'react'
import { EVENT } from '../../config/event'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  expired: boolean
}

function getTimeLeft(): TimeLeft {
  const now = Date.now()
  const target = EVENT.date.getTime()
  const diff = target - now

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true }
  }

  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  }
}

interface DigitBlockProps {
  value: number
  label: string
}

function DigitBlock({ value, label }: DigitBlockProps) {
  const [animKey, setAnimKey] = useState(0)
  const prevValue = useRef(value)

  useEffect(() => {
    if (prevValue.current !== value) {
      setAnimKey(k => k + 1)
      prevValue.current = value
    }
  }, [value])

  return (
    <div style={{ textAlign: 'center', minWidth: '64px' }}>
      <div
        key={animKey}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 300,
          lineHeight: 1,
          color: 'var(--color-text)',
          animation: 'digitFlip 0.15s ease-out',
          letterSpacing: '-0.02em',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
          marginTop: '8px',
        }}
      >
        {label}
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div style={{
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(28px, 4vw, 48px)',
      fontWeight: 300,
      color: 'var(--color-gold)',
      opacity: 0.6,
      alignSelf: 'flex-start',
      paddingTop: '4px',
      animation: 'breathe 2s ease-in-out infinite',
    }}>
      ·
    </div>
  )
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  if (timeLeft.expired) {
    return (
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(18px, 2.5vw, 24px)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: 'var(--color-text-muted)',
        letterSpacing: '0.02em',
      }}>
        Thank you for being part of the journey ✦
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 2vw, 24px)' }}>
      <DigitBlock value={timeLeft.days}    label="Days"    />
      <Separator />
      <DigitBlock value={timeLeft.hours}   label="Hours"   />
      <Separator />
      <DigitBlock value={timeLeft.minutes} label="Minutes" />
      <Separator />
      <DigitBlock value={timeLeft.seconds} label="Seconds" />
    </div>
  )
}

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { EVENT } from '../../config/event'
import { usePersonalization } from '../../context/PersonalizationContext'
import GuestName from '../shared/GuestName'

gsap.registerPlugin(ScrollTrigger)

type Attending = 'yes' | 'no' | null
type Status = 'idle' | 'submitting' | 'confirmed_attend' | 'confirmed_decline'

interface FormState {
  attending: Attending
  firstTime: boolean
  message: string
}

export default function RSVPSection() {
  const { firstName } = usePersonalization()
  const sectionRef = useRef<HTMLElement>(null)
  const formRef    = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormState>({ attending: null, firstTime: false, message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  useGSAP(() => {
    gsap.fromTo('.rsvp-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.rsvp-card', start: 'top 85%' },
      }
    )
  }, { scope: sectionRef })

  function validate(): boolean {
    const errs: Record<string, string> = {}
    if (!form.attending) errs.attending = 'Please select your attendance.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setStatus('submitting')

    // Google Form Configuration
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdbHIyf-ntcrGxHsM16LG6ny2Us15MDwZrnEeQHF5i32nfUcA/formResponse'
    const ENTRY_NAME = 'entry.2018866782'
    const ENTRY_ATTENDING = 'entry.1898644087'
    const ENTRY_FIRST_TIME = 'entry.1037922086'
    const ENTRY_MESSAGE = 'entry.335981076'

    const formData = new URLSearchParams()
    formData.append(ENTRY_NAME, firstName || 'Guest')
    formData.append(ENTRY_ATTENDING, form.attending === 'yes' ? 'I will be joining you' : "I won't be able to attend")
    formData.append(ENTRY_FIRST_TIME, form.firstTime ? 'Yes' : 'No')
    formData.append(ENTRY_MESSAGE, form.message)

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Forms to bypass CORS
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData.toString()
      })
    } catch (error) {
      console.error('RSVP submission error (can be ignored if URL is a placeholder):', error)
    }

    // Give a small delay for a smooth UI transition
    setTimeout(() => {
      setStatus(form.attending === 'yes' ? 'confirmed_attend' : 'confirmed_decline')

      // Confetti for attending
      if (form.attending === 'yes') launchConfetti()
    }, 600)
  }

  function launchConfetti() {
    const colors = ['#D4A44B', '#E2BE6C', '#F1D08A', '#E8C4B8', '#F5ECD7']
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div')
      el.style.cssText = `
        position:fixed; top:-10px; z-index:9999; pointer-events:none;
        width:${6 + Math.random() * 8}px; height:${6 + Math.random() * 8}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        left:${10 + Math.random() * 80}%;
      `
      document.body.appendChild(el)
      gsap.to(el, {
        y: window.innerHeight + 50,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 1.5 + Math.random() * 1.5,
        ease: 'power1.in',
        delay: Math.random() * 0.6,
        onComplete: () => el.remove(),
      })
    }
  }

  const isSubmitting = status === 'submitting'
  const isDone = status === 'confirmed_attend' || status === 'confirmed_decline'

  return (
    <section ref={sectionRef} id="rsvp" className="section" style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Image for RSVP Section */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        backgroundImage: `url(/assets/RSVP_background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Dark overlay to ensure text contrast and luxurious depth */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(6,7,10,1) 0%, rgba(6,7,10,0.6) 30%, rgba(6,7,10,0.85) 100%)',
      }} />

      {/* Ambient glow — centred warm bloom under the card */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(212,164,75,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      <div className="section-inner" style={{ position: 'relative', zIndex: 2 }}>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p className="section-label" style={{ justifyContent: 'center' }}>RSVP</p>
          <h2 className="section-heading">
            Will We See You There,{' '}
            <span className="text-gradient-gold"><GuestName />?</span>
          </h2>
          <p className="section-subheading" style={{ maxWidth: '440px', margin: '0 auto' }}>
            Your presence, <GuestName />, would mean the world.
          </p>
        </div>

        {/* Card */}
        <div
          ref={formRef}
          className="rsvp-card glass-card"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: 'clamp(32px, 5vw, 52px)',
          }}
        >

          {isDone ? (
            /* ── Confirmation state ── */
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                animation: 'float 3s ease-in-out infinite',
              }}>
                {status === 'confirmed_attend' ? '✨' : '🙏'}
              </div>

              {status === 'confirmed_attend' ? (
                <>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    marginBottom: '14px',
                    lineHeight: 1.3,
                  }}>
                    Wonderful, <GuestName />!
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.8,
                    maxWidth: '420px',
                    margin: '0 auto 28px',
                  }}>
                    We're thrilled to have you join us. Harsh looks forward to seeing you on{' '}
                    <span style={{ color: 'var(--color-gold)' }}>{EVENT.dateDisplay}</span>.
                    We'll be in touch with further details.
                  </p>
                </>
              ) : (
                <>
                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(22px, 3vw, 28px)',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    marginBottom: '14px',
                    lineHeight: 1.3,
                  }}>
                    We understand, <GuestName />.
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '16px',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.8,
                    maxWidth: '420px',
                    margin: '0 auto 28px',
                  }}>
                    You'll be truly missed. We hope to see you at the next edition —
                    Harsh will save a story just for you. 🤍
                  </p>
                </>
              )}

              {/* Divider */}
              <div className="divider-gold" />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
              }}>
                {EVENT.fullTitle}
              </p>
            </div>

          ) : (
            /* ── Form state ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

              {/* Pre-filled Name */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text)',
                    marginBottom: '10px',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  readOnly
                  value={firstName || 'Guest'}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(212,164,75,0.1)',
                    borderRadius: 'var(--radius-input)',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 300,
                    outline: 'none',
                    cursor: 'not-allowed',
                  }}
                />
              </div>

              {/* Attending toggle */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  color: 'var(--color-text)',
                  marginBottom: '14px',
                }}>
                  Will you be attending? <span style={{ color: 'var(--color-error)' }}>*</span>
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {([
                    { val: 'yes', label: "✓  I will be joining you" },
                    { val: 'no',  label: "✗  I won't be able to attend" },
                  ] as const).map(({ val, label }) => (
                    <button
                      key={val}
                      onClick={() => setForm(f => ({ ...f, attending: val }))}
                      style={{
                        flex: 1,
                        minWidth: '160px',
                        padding: '14px 20px',
                        borderRadius: 'var(--radius-input)',
                        border: `1px solid ${form.attending === val ? 'var(--color-gold)' : 'rgba(212,164,75,0.2)'}`,
                        background: form.attending === val ? 'rgba(212,164,75,0.12)' : 'rgba(255,255,255,0.03)',
                        color: form.attending === val ? 'var(--color-gold)' : 'var(--color-text-muted)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        fontWeight: 400,
                        cursor: 'pointer',
                        transition: 'all 0.25s var(--ease-luxury)',
                        boxShadow: form.attending === val ? '0 0 20px rgba(212,164,75,0.15)' : 'none',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {errors.attending && (
                  <p style={{ color: 'var(--color-error)', fontSize: '13px', marginTop: '8px', fontFamily: 'var(--font-body)' }}>
                    {errors.attending}
                  </p>
                )}
              </div>

              {/* First time checkbox — only if attending */}
              {form.attending === 'yes' && (
                <div>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      fontWeight: 300,
                      color: 'var(--color-text)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={form.firstTime}
                      onChange={e => setForm(f => ({ ...f, firstTime: e.target.checked }))}
                      style={{
                        width: '20px',
                        height: '20px',
                        accentColor: 'var(--color-gold)',
                        cursor: 'pointer',
                      }}
                    />
                    First time are you attending Art of Story telling Event By Harh Shah?
                  </label>
                </div>
              )}

              {/* Optional message */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    color: 'var(--color-text)',
                    marginBottom: '10px',
                  }}
                >
                  A note for Harsh… <span style={{ color: 'var(--color-text-muted)', fontWeight: 300 }}>(optional)</span>
                </label>
                <textarea
                  id="rsvp-message"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value.slice(0, 300) }))}
                  placeholder="Share a thought, question, or expectation..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(212,164,75,0.2)',
                    borderRadius: 'var(--radius-input)',
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    fontWeight: 300,
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'var(--color-gold)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(212,164,75,0.12)'
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(212,164,75,0.2)'
                    e.target.style.boxShadow = 'none'
                  }}
                />
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  color: 'var(--color-text-dim)',
                  marginTop: '6px',
                  textAlign: 'right',
                }}>
                  {form.message.length}/300
                </p>
              </div>

              {/* Submit */}
              <button
                id="rsvp-submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-gold"
                style={{
                  width: '100%',
                  height: '58px',
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'wait' : 'pointer',
                }}
              >
                {isSubmitting
                  ? '⟳  Sending...'
                  : form.attending === 'no'
                    ? '✉  Send My Regrets'
                    : '✦  Confirm My Attendance'}
              </button>

            </div>
          )}
        </div>
      </div>
    </section>
  )
}

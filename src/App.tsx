import { useState, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

import { PersonalizationProvider, usePersonalization } from './context/PersonalizationContext'
import Popup from './components/Popup/Popup'
import Hero from './components/Hero/Hero'
import Timeline from './components/Timeline/Timeline'
import VideoSection from './components/Video/VideoSection'
import VenueSection from './components/Venue/VenueSection'
import RSVPSection from './components/RSVP/RSVPSection'
import Footer from './components/Footer/Footer'
import GlobalAtmosphere from './components/shared/GlobalAtmosphere'
import CustomCursor from './components/shared/CustomCursor'

import './index.css'

gsap.registerPlugin(ScrollTrigger)

// Inner app — needs access to personalization context
function AppContent() {
  const { isPersonalized } = usePersonalization()
  const [showPopup, setShowPopup]     = useState(!isPersonalized)
  const [heroVisible, setHeroVisible] = useState(isPersonalized)

  // Lenis smooth scroll — init once popup is closed
  useEffect(() => {
    if (!heroVisible) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
    })

    // Sync Lenis with GSAP ticker
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Feed scroll events to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [heroVisible])

  function handlePopupComplete() {
    setShowPopup(false)
    setHeroVisible(true)
    // Scroll to top
    window.scrollTo({ top: 0 })
  }

  return (
    <div style={{ background: 'transparent', minHeight: '100dvh', position: 'relative' }}>
      
      {/* Cinematic Custom Cursor */}
      <CustomCursor />

      {/* Global Cinematic Environment (Navy gradient, lighting, particles) */}
      <GlobalAtmosphere />

      {/* Popup gate */}
      {showPopup && <Popup onComplete={handlePopupComplete} />}

      {/* Main page — always in DOM so bg is visible behind popup */}
      <main style={{ 
        position: 'relative', 
        zIndex: 1,
        ...(showPopup ? { height: '100vh', overflow: 'hidden' } : {}) 
      }}>
        <Hero visible={heroVisible} />
        <Timeline />
        <VideoSection />
        <VenueSection />
        <RSVPSection />
        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <PersonalizationProvider>
      <AppContent />
    </PersonalizationProvider>
  )
}

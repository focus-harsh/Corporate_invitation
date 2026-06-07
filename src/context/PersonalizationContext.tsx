import React, { createContext, useContext, useState, useCallback } from 'react'

interface PersonalizationState {
  name: string
  displayName: string   // Full capitalised name: "Harsh Shah"
  firstName: string     // First word: "Harsh"
  isPersonalized: boolean
}

interface PersonalizationContextType extends PersonalizationState {
  setName: (raw: string) => void
}

const PersonalizationContext = createContext<PersonalizationContextType | null>(null)

// Capitalise each word
function toTitleCase(str: string): string {
  return str
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

export function PersonalizationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersonalizationState>(() => {
    // Restore from localStorage on mount
    const saved = localStorage.getItem('visitorName')
    if (saved) {
      const display = toTitleCase(saved)
      return {
        name: saved,
        displayName: display,
        firstName: display.split(' ')[0],
        isPersonalized: true,
      }
    }
    return { name: '', displayName: '', firstName: '', isPersonalized: false }
  })

  const setName = useCallback((raw: string) => {
    const display = toTitleCase(raw)
    const first = display.split(' ')[0]
    localStorage.setItem('visitorName', raw)
    setState({ name: raw, displayName: display, firstName: first, isPersonalized: true })
  }, [])

  return (
    <PersonalizationContext.Provider value={{ ...state, setName }}>
      {children}
    </PersonalizationContext.Provider>
  )
}

export function usePersonalization() {
  const ctx = useContext(PersonalizationContext)
  if (!ctx) throw new Error('usePersonalization must be used within PersonalizationProvider')
  return ctx
}

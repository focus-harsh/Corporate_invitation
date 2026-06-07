import { usePersonalization } from '../../context/PersonalizationContext'

interface GuestNameProps {
  full?: boolean       // true = "Harsh Shah", false (default) = "Harsh"
  fallback?: string    // shown before name is entered
  className?: string
}

export default function GuestName({ full = false, fallback = 'Friend', className }: GuestNameProps) {
  const { displayName, firstName, isPersonalized } = usePersonalization()

  if (!isPersonalized) return <span className={className}>{fallback}</span>

  return (
    <span className={className}>
      {full ? displayName : firstName}
    </span>
  )
}

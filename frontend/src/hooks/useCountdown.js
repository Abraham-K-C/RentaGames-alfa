import { useState, useEffect } from 'react'

export function useCountdown(expiresAt) {
  const [remaining, setRemaining] = useState(() => Math.max(0, expiresAt - Date.now()))

  useEffect(() => {
    if (remaining <= 0) return
    const interval = setInterval(() => {
      const left = Math.max(0, expiresAt - Date.now())
      setRemaining(left)
    }, 1000)
    return () => clearInterval(interval)
  }, [expiresAt])

  const expired = remaining <= 0
  const hours = Math.floor(remaining / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  const formatted = hours > 0
    ? `${String(hours).padStart(2,'0')}h ${String(minutes).padStart(2,'0')}m ${String(seconds).padStart(2,'0')}s`
    : `${String(minutes).padStart(2,'0')}m ${String(seconds).padStart(2,'0')}s`

  return { expired, formatted, remaining }
}

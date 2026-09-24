import { useEffect } from 'react'

// 7am–7pm (visitor's local device clock) = light, everything else = dark.
function applyTheme() {
  const hour = new Date().getHours()
  const isLight = hour >= 7 && hour < 19
  document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark')
}

export default function ThemeManager() {
  useEffect(() => {
    applyTheme()
    // Re-check periodically so a long-open tab crosses the 7am/7pm boundary correctly
    const interval = setInterval(applyTheme, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  return null
}

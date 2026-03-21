import * as React from 'react'
import { useTheme } from 'signal'
import { SunIcon, MoonIcon } from 'lucide-react'

export function Header() {
  const { theme, setTheme, density, setDensity } = useTheme()
  const [time, setTime] = React.useState(() => new Date().toUTCString().slice(17, 25))

  React.useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toUTCString().slice(17, 25))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="trading-header">
      {/* Logo */}
      <div className="trading-header-logo">
        <div className="trading-header-logo-mark">FX</div>
        <span>Signal FX</span>
      </div>

      <div className="trading-header-vsep" />

      {/* Market status */}
      <div className="trading-header-market-status">
        <div className="trading-header-market-status-dot" />
        <span>Markets Open</span>
      </div>

      <div className="trading-header-clock">{time} UTC</div>

      <div className="trading-header-spacer" />

      <div className="trading-header-controls">
        {/* Density segmented control */}
        <span className="trading-header-controls-label">Density</span>
        <div className="seg-control" role="group" aria-label="Select density">
          <button
            className="seg-btn"
            data-active={density === 'high' ? 'true' : undefined}
            onClick={() => setDensity('high')}
          >
            High
          </button>
          <button
            className="seg-btn"
            data-active={density === 'super-high' ? 'true' : undefined}
            onClick={() => setDensity('super-high')}
          >
            Super High
          </button>
        </div>

        <div className="trading-header-vsep" />

        {/* Theme segmented control */}
        <span className="trading-header-controls-label">Theme</span>
        <div className="seg-control" role="group" aria-label="Select theme">
          <button
            className="seg-btn"
            data-active={theme === 'light' ? 'true' : undefined}
            onClick={() => setTheme('light')}
          >
            <SunIcon size={11} />
            Light
          </button>
          <button
            className="seg-btn"
            data-active={theme === 'dark' ? 'true' : undefined}
            onClick={() => setTheme('dark')}
          >
            <MoonIcon size={11} />
            Dark
          </button>
        </div>
      </div>
    </header>
  )
}

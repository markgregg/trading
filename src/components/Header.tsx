import * as React from 'react'
import { Box, Button, ButtonGroup, Stack, useTheme } from 'signal'
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
    <Box component="header" className="trading-header">
      {/* Logo */}
      <Stack direction="row" alignItems="center" spacing={1} className="trading-header-logo">
        <div className="trading-header-logo-mark">FX</div>
        <span>Signal FX</span>
      </Stack>

      <Box className="trading-header-vsep" />

      {/* Market status */}
      <Stack
        direction="row"
        alignItems="center"
        spacing="0.375rem"
        className="trading-header-market-status"
      >
        <div className="trading-header-market-status-dot" />
        <span>Markets Open</span>
      </Stack>

      <div className="trading-header-clock">{time} UTC</div>

      <Box className="trading-header-spacer" />

      <Stack direction="row" alignItems="center" spacing={1} className="trading-header-controls">
        {/* Density segmented control */}
        <span className="trading-header-controls-label">Density</span>
        <ButtonGroup aria-label="Select density">
          <Button
            variant={density === 'high' ? 'default' : 'outline'}
            size="sm"
            aria-pressed={density === 'high'}
            onClick={() => setDensity('high')}
          >
            High
          </Button>
          <Button
            variant={density === 'super-high' ? 'default' : 'outline'}
            size="sm"
            aria-pressed={density === 'super-high'}
            onClick={() => setDensity('super-high')}
          >
            Super High
          </Button>
        </ButtonGroup>

        <Box className="trading-header-vsep" />

        {/* Theme segmented control */}
        <span className="trading-header-controls-label">Theme</span>
        <ButtonGroup aria-label="Select theme">
          <Button
            variant={theme === 'light' ? 'default' : 'outline'}
            size="sm"
            aria-pressed={theme === 'light'}
            onClick={() => setTheme('light')}
          >
            <SunIcon size={11} />
            Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'default' : 'outline'}
            size="sm"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme('dark')}
          >
            <MoonIcon size={11} />
            Dark
          </Button>
        </ButtonGroup>
      </Stack>
    </Box>
  )
}
